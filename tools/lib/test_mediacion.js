/* Mediación (docs/js/mediacion.js, lang/<código>/mediacion_data.js): «Tu
 * amiga no entendió: contale en castellano, en 2 frases, qué pasó», en los
 * idiomas con Radio:
 * - una tarea por episodio de la Radio y por cada lectura que la trae (que
 *   existe en letture_data.js), con lo que la amiga quiere saber, 3-5 claves
 *   con sus formas en castellano, un «need» posible y una versión modelo;
 * - la versión modelo pasa su propia corrección con todas las claves, en
 *   castellano, en tres frases o menos;
 * - la corrección sin IA: vacío, corto, copiado de la lengua meta (la
 *   transcripción) o sin los datos no pasa; con los datos, sí; las formas
 *   cortas solo valen como palabra entera («mar» no es «Martín»);
 * - la IA recibe la consigna, el texto original y lo escrito;
 * - lo que guarda: state.mediacion, que el guardado descarta si está roto;
 *   xp una sola vez;
 * - dónde aparece: el resultado de la Radio (tramo.js) y el de una lectura
 *   (app.js); boot.js lo carga (y el alemán todavía no lo tiene); el núcleo
 *   no nombra ningún idioma.
 *   Run: node tools/lib/test_mediacion.js */
"use strict";
var fs = require("fs"), path = require("path");
var pack = require("./pack.js");
var Boot = require(path.join(pack.DOCS, "js", "boot.js"));
var T = require("./testkit.js")("es"), ok = T.ok;

var SRC = fs.readFileSync(path.join(pack.DOCS, "js", "mediacion.js"), "utf8");
var code0 = SRC.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
ok(!/italian|portugu|brasil|\bLa Via\b|Rumo C1|Radio Portici|Calçadão/i.test(code0), "mediacion.js no nombra ningún idioma");
ok(Boot.coreFiles().indexOf("js/mediacion.js") >= 0, "el service worker guarda mediacion.js");
var names = Boot.ORDER.map(function (e) { return e.lang || e.core || e.shared; });
ok(names.indexOf("mediacion_data.js") > names.indexOf("radio.js") && names.indexOf("mediacion.js") < names.indexOf("app.js"),
  "boot.js carga los datos y el módulo después de radio.js y antes de app.js");
ok((Boot.LANGS.de.missing || []).indexOf("mediacion_data.js") >= 0, "el alemán todavía no tiene mediacion_data.js (sin Radio)");
var APP = fs.readFileSync(path.join(pack.DOCS, "js", "app.js"), "utf8");
var TRAMO = fs.readFileSync(path.join(pack.DOCS, "js", "tramo.js"), "utf8");
ok(/round\.kind === "lettura" && window\.Mediacion\) html \+= Mediacion\.html\(state, "lettura:" \+ round\.arg\)/.test(APP), "el resultado de una lectura trae la mediación");
ok(/Mediacion\.wire\(\)/.test(APP) && /Mediacion\.attach\(/.test(APP), "app.js la cablea y le pasa lo que necesita");
ok(/rad && root\.Mediacion \? root\.Mediacion\.html\(H\.state\(\), "radio:" \+ cur\.week\)/.test(TRAMO) && /root\.Mediacion\.wire\(\)/.test(TRAMO),
  "el resultado de la Radio trae la mediación");
var ENGINE = fs.readFileSync(path.join(pack.DOCS, "js", "engine.js"), "utf8");
ok(/"mediacion"/.test(ENGINE), "engine.js conoce state.mediacion");

["it", "pt"].forEach(function (code) {
  var L = code + " · ";
  ok(Boot.langFiles(code).indexOf("lang/" + code + "/mediacion_data.js") >= 0, L + "mediacion_data.js en los archivos del idioma");
  var ctx = pack(code, { upTo: "app.js" });
  var M = ctx.Mediacion, D = ctx.MEDIACION_DATA, R = ctx.Radio, Le = ctx.Letture;
  ok(M && D && R && Le, L + "mediacion.js, sus datos, radio.js y letture.js cargados");
  if (!M || !D) return;
  T.eq(Object.keys(D.radio).map(Number).sort(function (a, b) { return a - b; }), R.weeks(), L + "una tarea por episodio de la Radio");
  ok(Object.keys(D.letture).length >= 3, L + "algunas lecturas traen la tarea");
  ok(Array.isArray(D.notEs) && D.notEs.length >= 10 && D.notEs.every(function (w) { return M.plain(w) === w; }), L + "notEs: palabras ya normalizadas");

  var keys = Object.keys(D.radio).map(function (w) { return "radio:" + w; })
    .concat(Object.keys(D.letture).map(function (id) { return "lettura:" + id; }));
  keys.forEach(function (key) {
    var K = L + key + " · ", t = M.task(key);
    ok(t, K + "la tarea existe");
    if (!t) return;
    ok(M.source(key).length > 200, K + "el texto original está (para la IA)");
    ok(/^¿.+\?$/.test(t.pide), K + "lo que quiere saber es una pregunta: " + t.pide);
    ok(t.claves.length >= 3 && t.claves.length <= 5, K + "3-5 claves");
    ok(M.need(t) >= 2 && M.need(t) <= t.claves.length, K + "need posible");
    t.claves.forEach(function (c) {
      ok(Array.isArray(c) && c.length === 2 && c[0] && Array.isArray(c[1]) && c[1].length, K + "clave con nombre y formas: " + JSON.stringify(c));
      (c[1] || []).forEach(function (a) {
        ok(M.plain(a).length >= 2, K + "forma demasiado corta: «" + a + "»");
        ok(D.notEs.indexOf(M.plain(a)) < 0, K + "forma que la app toma como de la lengua meta: «" + a + "»");
      });
    });
    var r = M.evaluate(t, t.modelo);
    ok(r.ok && r.hit === t.claves.length, K + "el modelo pasa con todas las claves (" + r.hit + "/" + t.claves.length + ": " +
      r.claves.filter(function (c) { return !c.ok; }).map(function (c) { return c.label; }).join(", ") + ")");
    ok(r.foreign.length === 0, K + "el modelo no parece de la lengua meta: " + r.foreign.join(", "));
    var che = M.evaluate(t, "Che, ¿sabés qué? " + t.modelo);
    ok(che.ok && che.foreign.length === 0, K + "el «che» rioplatense no cuenta como lengua meta");
    ok(r.sentences <= 3 && r.words <= M.LONG_WORDS, K + "el modelo es corto (" + r.sentences + " frases, " + r.words + " palabras)");
    // what does not pass
    ok(!M.evaluate(t, "").ok, K + "vacío no pasa");
    var src = M.source(key);
    var copied = M.evaluate(t, src.slice(0, 600));
    ok(!copied.ok && copied.foreign.length >= M.FOREIGN, K + "el original copiado no pasa: está en la lengua meta");
    ok(!M.evaluate(t, "No sé, no entendí nada de lo que dijeron, perdón, la próxima te cuento bien.").ok, K + "sin los datos no pasa");
    var short = t.claves.map(function (c) { return c[1][0]; }).join(" ");
    ok(!M.evaluate(t, short).ok || short.split(" ").length >= M.MIN_WORDS, K + "solo las palabras clave, sueltas y cortas, no pasa");
  });

  // short forms: whole words only
  ok(M.has(M.plain("Fue al mar."), "mar") && !M.has(M.plain("Martín llamó."), "mar"), L + "«mar» es palabra entera, no «Martín»");
  ok(M.has(M.plain("Le dolía la garganta"), "garganta") && M.has(M.plain("los anteojos"), "anteojo"), L + "las formas largas son comienzos de palabra");
  ok(M.has(M.plain("Nápoles"), "napoles") && M.has(M.plain("PEQUEÑO"), "pequeno"), L + "sin tildes ni mayúsculas");

  // the AI's prompt
  var t1 = M.task(keys[0]);
  var p = M.aiPrompt(t1, "Texto del alumno.", M.source(keys[0]));
  ok(p.indexOf(t1.pide) >= 0 && p.indexOf("Texto del alumno.") >= 0 && p.indexOf(t1.claves[0][0]) >= 0 && /JSON/.test(p) && /vos/.test(p),
    L + "la IA recibe la consigna, lo esencial, el texto y lo escrito, y responde JSON en voseo");
  ok(p.indexOf(M.source(keys[0]).slice(0, 80)) >= 0, L + "la IA recibe el original");

  // what it keeps: the block and the check, with a fake DOM
  var state = { xp: 0 }, gained = [], toasts = [], persisted = 0;
  M.attach({ state: function () { return state; }, persist: function () { persisted++; }, toast: function (s) { toasts.push(s); },
             gain: function (n, s) { gained.push([n, s]); }, aiKey: function () { return ""; }, aiKeys: function () { return {}; } });
  M._reset();
  var h = M.html(state, keys[0]);
  ok(/id="medtext"/.test(h) && /lang="es"/.test(h) && /<details/.test(h) && h.indexOf(ctxEsc(t1.pide)) >= 0, L + "el bloque: plegado, con la pregunta y la caja en castellano");
  ok(M.html(state, "radio:99") === "" && M.html(state, "lettura:no-existe") === "", L + "sin tarea, nada");
  ok(!/medai/.test(h), L + "sin clave, sin botón de IA");
  var els = {};
  ctx.document = {
    getElementById: function (id) { return els[id] || null; }
  };
  function fake(id, extra) { var e = { id: id, value: "", innerHTML: "", textContent: "", onclick: null, attrs: {} };
    e.getAttribute = function (k) { return e.attrs[k]; }; e.addEventListener = function () {}; Object.keys(extra || {}).forEach(function (k) { e[k] = extra[k]; }); els[id] = e; return e; }
  global.document = ctx.document;
  var box = fake("medtext"), med = fake("med"); med.attrs["data-med"] = keys[0];
  fake("medout"); fake("medcount"); fake("medcheck"); fake("medstate");
  M._reset();
  M.wire();
  box.value = "No sé, no entendí nada.";
  M._check();
  ok(state.mediacion && state.mediacion[keys[0]] && !state.mediacion[keys[0]].ok && !gained.length, L + "no pasa: queda guardado, sin xp");
  box.value = t1.modelo;
  M._check();
  ok(state.mediacion[keys[0]].ok && gained.length === 1 && gained[0][0] > 0 && gained[0][1] === "input", L + "pasa: xp de input");
  ok(/hecho/.test(els.medstate.textContent), L + "el resumen pasa a «✓ hecho» sin volver a dibujar");
  ok(/✅/.test(els.medout.innerHTML) && /Una versión posible/.test(els.medout.innerHTML), L + "la devolución: se entiende, y la versión modelo");
  M._check();
  ok(gained.length === 1, L + "la xp, una sola vez");
  box.value = "No sé.";
  M._check();
  ok(state.mediacion[keys[0]].ok, L + "un intento peor no borra lo hecho");
  ok(persisted >= 3, L + "guarda");
  delete global.document;

  // the save drops a broken state.mediacion
  var E = ctx.Engine;
  if (E && E.fromRaw) {
    // fromRaw takes the parsed object (as Engine.load passes it), not the string
    var s2 = E.fromRaw({ unlocked: 3, cards: {}, mediacion: "roto" });
    ok(s2 && s2.mediacion === undefined, L + "el guardado descarta un state.mediacion roto");
    var s3 = E.fromRaw({ unlocked: 3, cards: {}, mediacion: { "radio:1": { ok: true, t: "x" } } });
    ok(s3 && s3.mediacion && s3.mediacion["radio:1"].ok === true, L + "el guardado conserva un state.mediacion sano");
    var s4 = E.fromRaw({ unlocked: 3, cards: {} });
    ok(s4 && M.html(s4, keys[0]).length > 0 && M.store(s4) === s4.mediacion, L + "un guardado viejo (sin mediacion) muestra el bloque");
  }
});

function ctxEsc(s) {
  return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; });
}

T.done();
