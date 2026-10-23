/* «¿Qué notás?»: la pregunta de hipótesis antes de «La regla»
   (Lezione.notice, docs/lang/<código>/notar_data.js, la pantalla en app.js):
   - cada idioma trae entre 10 y 15, y cada una apunta a un bloque que existe
     (semana + título exacto, uno solo);
   - 4 o 5 ejemplos con la forma marcada (*…*) y su castellano, una pregunta,
     3 opciones distintas con la respuesta entre ellas y la diferencia («no»);
   - en la lección, el paso «notice» reemplaza a «Mirá» y va justo antes de
     «La regla» de su bloque (también en las lecciones partidas en sesiones);
   - no cambia los chequeos: con la misma semilla, los mismos que sin ella;
   - un «notice» escrito en el bloque mismo también anda, y uno mal armado
     (sin la respuesta entre las opciones) no aparece;
   - app.js pinta el paso, lo responde antes de seguir y abre la regla con
     «¡Eso!» o con la diferencia.
     node tools/lib/test_notar.js */
"use strict";
var fs = require("fs"), path = require("path");
var pack = require("./pack.js");
var T = require("./testkit.js")("es"), ok = T.ok, eq = T.eq;

function seeded(s) {
  var seed = s;
  return function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
}
var marked = function (t) { return /\*[^*]+\*/.test(t) && (String(t).match(/\*/g) || []).length % 2 === 0; };

pack.ALL.forEach(function (code) {
  var c = pack(code), L = c.Lezione, D = c.NOTAR_DATA;
  var course = pack.data(code, "course.json");
  ok(!!L && typeof L.notice === "function", code + ": Lezione.notice");
  ok(!!D, code + ": NOTAR_DATA cargado (notar_data.js en boot.js)");
  if (!D || !L) return;
  var n = 0;
  Object.keys(D).forEach(function (wk) {
    var w = course.weeks[+wk - 1];
    Object.keys(D[wk]).forEach(function (h) {
      n++;
      var x = D[wk][h], where = code + " s" + wk + " «" + h + "»";
      var hits = w && w.lesson ? w.lesson.blocks.filter(function (b) { return b.h === h; }) : [];
      ok(hits.length === 1, where + ": el bloque existe y es uno solo (" + hits.length + ")");
      ok(x.ex && x.ex.length >= 4 && x.ex.length <= 5, where + ": 4 o 5 ejemplos");
      (x.ex || []).forEach(function (e) {
        ok(Array.isArray(e) && marked(e[0]) && !!e[1], where + ": ejemplo con la forma marcada y su castellano: " + JSON.stringify(e));
      });
      ok(!!x.q && x.q.length > 10, where + ": la pregunta");
      ok(x.options && x.options.length === 3 && new Set(x.options).size === 3, where + ": 3 opciones distintas");
      ok((x.options || []).indexOf(x.answer) >= 0, where + ": la respuesta está entre las opciones");
      // the right one must not stand out by its length (test-wiseness: «the longest»)
      var longest = Math.max.apply(null, (x.options || []).filter(function (o) { return o !== x.answer; }).map(function (o) { return o.length; }));
      ok(!x.answer || x.answer.length <= longest * 1.25, where + ": la respuesta no se delata por larga (" + (x.answer || "").length + " frente a " + longest + ")");
      ok(!!x.no && (String(x.no).match(/\*/g) || []).length % 2 === 0, where + ": la diferencia, con los *…* cerrados");
      if (!hits.length) return;
      var b = hits[0], i = w.lesson.blocks.indexOf(b);
      var nt = L.notice(b, +wk);
      ok(!!nt && nt.options.indexOf(nt.answer) >= 0 && nt.options.length === 3, where + ": Lezione.notice lo arma");
      // the lesson: notice instead of «Mirá», right before the rule
      var st = L.steps(w.lesson, seeded(7 + +wk), +wk, null, null);
      var at = -1;
      st.forEach(function (s, k) { if (s.kind === "notice" && s.i === i) at = k; });
      ok(at >= 0, where + ": la lección tiene el paso «¿Qué notás?»");
      ok(at >= 0 && st[at + 1] && st[at + 1].kind === "rule" && st[at + 1].i === i, where + ": y enseguida «La regla»");
      ok(!st.some(function (s) { return s.kind === "look" && s.i === i; }), where + ": sin «Mirá» repetido");
      // a lesson in sessions: only the session with the block shows it
      st = L.steps(w.lesson, seeded(3), +wk, null, [i]);
      ok(st.some(function (s) { return s.kind === "notice" && s.i === i; }), where + ": también en una sesión suelta");
      // the order of the options is fixed by the question (the pending lesson keeps it)
      eq(L.notice(b, +wk).options, nt.options, where + ": mismo orden de opciones");
    });
  });
  ok(n >= 10 && n <= 15, code + ": entre 10 y 15 bloques con «¿Qué notás?» (" + n + ")");

  // the checks of the lesson stay the same with and without NOTAR_DATA
  var bare = pack(code), same = 0, weeks = 0;
  bare.NOTAR_DATA = {};
  Object.keys(D).forEach(function (wk) {
    var w = course.weeks[+wk - 1];
    var a = L.steps(w.lesson, seeded(11), +wk, null, null).filter(function (s) { return s.kind === "quiz"; });
    var b2 = bare.Lezione.steps(w.lesson, seeded(11), +wk, null, null).filter(function (s) { return s.kind === "quiz"; });
    var noNotice = bare.Lezione.steps(w.lesson, seeded(11), +wk, null, null).filter(function (s) { return s.kind === "notice"; }).length;
    weeks++;
    if (JSON.stringify(a) === JSON.stringify(b2) && noNotice === 0) same++;
  });
  ok(same === weeks, code + ": los chequeos no cambian por «¿Qué notás?» (" + same + "/" + weeks + " semanas)");
});

// a «notice» written in the block itself, and a broken one
(function () {
  var c = pack("it"), L = c.Lezione;
  var b = { h: "Prueba", r: "x", ex: [["*a*", "a"]],
            notice: { q: "¿Qué ves acá?", answer: "uno", options: ["uno", "dos", "tres"] } };
  var st = L.steps({ intro: "", blocks: [b] }, seeded(5), 99, null, null);
  eq(st.map(function (s) { return s.kind; }).slice(0, 3), ["intro", "notice", "rule"], "notice en el bloque: antes de la regla");
  ok(st[1].n.ex === b.ex && !st[1].n.own, "notice sin ejemplos propios: usa los del bloque");
  var bad = { h: "Prueba", r: "x", ex: [["*a*", "a"]], notice: { q: "¿Qué ves acá?", answer: "cuatro", options: ["uno", "dos", "tres"] } };
  st = L.steps({ intro: "", blocks: [bad] }, seeded(5), 99, null, null);
  eq(st.map(function (s) { return s.kind; }).slice(0, 3), ["intro", "look", "rule"], "notice mal armado: queda «Mirá»");
  var none = { h: "Prueba", r: "x", notice: { q: "¿Qué ves acá?", answer: "uno", options: ["uno", "dos"] } };
  ok(L.notice(none, 1) === null, "notice sin ejemplos (ni propios ni del bloque): no aparece");
})();

// app.js: the screen, the answer before going on, the rule that opens with it
(function () {
  var app = fs.readFileSync(path.join(pack.DOCS, "js", "app.js"), "utf8");
  ok(/st\.kind === "notice"/.test(app) && /function renderNotice/.test(app), "app.js pinta el paso «notice»");
  ok(/data-ln/.test(app) && /function noticeAnswer/.test(app), "app.js responde la hipótesis (data-ln)");
  ok(/st\.pick != null \? '<button class="btn wide" id="lesnext"/.test(app), "«Ver la regla» solo después de responder");
  ok(/¡Eso!/.test(app) && /function noticeHead/.test(app) && /noticeHead\(i\)/.test(app), "la regla arranca con «¡Eso!» o con la diferencia");
  ok(/ls\.kind === "notice"/.test(app), "el modo test (solve) responde «¿Qué notás?»");
  ok(/sayIndex\[key \+ "-" \+ k\] = Lezione\.strip\(pair\[0\]\)\.replace\(\/\\s\*\\u2192/.test(app), "el 🔊 de «A → B» lee una pausa, no la flecha");
  var Boot = require(path.join(pack.DOCS, "js", "boot.js"));
  var names = Boot.ORDER.map(function (e) { return e.lang || e.core || e.shared; });
  ok(names.indexOf("notar_data.js") >= 0 && names.indexOf("notar_data.js") < names.indexOf("lezione.js"), "boot.js carga notar_data.js antes de lezione.js");
  pack.ALL.forEach(function (code) {
    ok(Boot.langFiles(code).indexOf("lang/" + code + "/notar_data.js") >= 0, code + ": el service worker guarda notar_data.js");
  });
})();

T.done();
