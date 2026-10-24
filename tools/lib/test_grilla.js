/* La grilla a la vista antes de escribir (docs/js/grilla.js,
 * docs/lang/<código>/grilla_data.js), en italiano y portugués:
 * - desde la semana 14, cada semana con Scrivi muestra la grilla de 4 filas
 *   (con descriptores de nota alta y baja y una pregunta de autoevaluación),
 *   antes no;
 * - en portugués, cada consigna desde la 14 trae enunciador, interlocutor,
 *   propósito y género;
 * - el botón muestra un texto de nota alta y uno de nota baja, con 2 o 3
 *   anotaciones atadas a filas que existen, y el par cambia según el tramo;
 * - el texto de nota alta puntúa mejor que el de nota baja en la estimación
 *   local (conectores, repeticiones, errores del corrector del paquete);
 * - la autoevaluación se guarda en state.grilla (el guardado descarta una
 *   rota) y la devolución la pone al lado de la estimación;
 * - el núcleo no nombra ningún idioma; app.js lo llama en Scrivi.
 *   Run: node tools/lib/test_grilla.js */
"use strict";
var fs = require("fs"), path = require("path");
var pack = require("./pack.js");
var Boot = require(path.join(pack.DOCS, "js", "boot.js"));
var T = require("./testkit.js")("es"), ok = T.ok;

var SRC = fs.readFileSync(path.join(pack.DOCS, "js", "grilla.js"), "utf8");
ok(!/italian|portugu|brasil|deutsch|alem/i.test(SRC.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "")), "grilla.js no nombra ningún idioma");
ok(Boot.coreFiles().indexOf("js/grilla.js") >= 0, "el service worker guarda grilla.js");
["it", "pt"].forEach(function (c) { ok(Boot.langFiles(c).indexOf("lang/" + c + "/grilla_data.js") >= 0, c + ": el service worker guarda grilla_data.js"); });
ok(Boot.langFiles("de").indexOf("lang/de/grilla_data.js") < 0, "de: el alemán todavía no la tiene (missing)");
var ORD = Boot.ORDER.map(function (e) { return e.lang || e.core || e.shared; });
ok(ORD.indexOf("grilla_data.js") < ORD.indexOf("grilla.js") && ORD.indexOf("grilla.js") > ORD.indexOf("scrivi.js") &&
   ORD.indexOf("grilla.js") < ORD.indexOf("app.js"), "grilla.js se carga después de su paquete y de scrivi.js, antes de app.js");
var APP = fs.readFileSync(path.join(pack.DOCS, "js", "app.js"), "utf8");
ok(/Grilla\.active\(w\.week, task\)/.test(APP) && /Grilla\.gridHtml\(w\.week\)/.test(APP), "Scrivi muestra la grilla arriba");
ok(/Grilla\.selfHtml\(w\.week, state\)/.test(APP) && /Grilla\.selfSet\(state, w\.week/.test(APP), "la autoevaluación se muestra y se guarda");
ok(/Grilla\.samplesHtml\(w\.week\)/.test(APP), "el botón muestra los textos de muestra");
ok(/grOld = \$\("#sgrid"\);\s*if \(grOld\) grOld\.innerHTML = ""/.test(APP), "«Ver un modelo» borra la devolución vieja de la grilla");
ok(/Grilla\.resultHtml\(w\.week, state, text, r, hard\.length\)/.test(APP), "la devolución puntúa cada fila");

pack.LANGS.filter(function (c) { return c !== "de"; }).forEach(function (code) {
  var L = code + ": ";
  var ctx = pack(code);
  var G = ctx.Grilla, D = ctx.GRILLA_DATA, S = ctx.Scrivi, E = ctx.Engine;
  // the checker with the course's lexicon, as the app loads it (scriviLexicon)
  ctx.Banca.load(pack.data(code, "bank.json"));
  if (ctx.Freq) ctx.Freq.load(pack.data(code, "frequenza.json"));
  S.learnCourse({ items: pack.data(code, "course.json").items, bank: ctx.Banca.bank(), phrases: ctx.Frasi.ALL,
    readings: ctx.Letture.EPISODI, glossario: pack.data(code, "glossario.json"), extra: ctx.Tramo ? ctx.Tramo.lexTexts() : [] });
  // the high-grade samples are clean for the checker
  D.samples.forEach(function (s) {
    var h = S.check(s.hi.t, s.from).findings.filter(function (f) { return !f.soft; });
    ok(!h.length, L + "muestra alta desde la " + s.from + " sin errores marcados" + (h.length ? ": " + h.map(function (f) { return f.msg; }).join(" | ") : ""));
  });
  // the low-grade sample of the first block: the checker finds the planted errors (ho andato, gosto praia)
  var lo14 = S.check(D.samples[0].lo.t, D.samples[0].from);
  ok(lo14.hard >= 1 && G.score(D.samples[0].lo.t, lo14, lo14.hard).filter(function (x) { return x.level < 2; }).length >= 3,
     L + "la muestra baja de la 14: el corrector marca sus errores (" + lo14.hard + ") y tres filas o más salen bajas");
  ok(G && D, L + "el paquete trae la grilla");
  var weeks = S.weeks();
  ok(!G.active(13, S.TASKS[13] || {}) && !G.active(8, S.TASKS[8]), L + "antes de la 14, no");
  var on = weeks.filter(function (n) { return n >= 14; });
  ok(on.length >= 30 && on.every(function (n) { return G.active(n, S.TASKS[n]); }), L + "desde la 14, en cada semana con Scrivi (" + on.length + ")");
  ok(!G.active(39, null), L + "sin consigna, no");

  // the four rows
  var ids = D.rows.map(function (r) { return r.id; }), autos = D.rows.map(function (r) { return r.auto; }).sort().join();
  ok(D.rows.length === 4 && autos === "connectors,errors,task,variety", L + "4 filas, cada una con su estimación");
  D.rows.forEach(function (r) {
    ok(r.name && r.what && r.hi && r.lo && /^¿.+\?$/.test(r.self), L + r.id + ": nombre, descriptor, nota alta y baja y la pregunta");
  });
  var html = G.gridHtml(20);
  ok((html.match(/<li>/g) || []).length >= 4 && /grsamp/.test(html) && /Ver un texto de nota alta y uno de nota baja/.test(html), L + "la grilla, con el botón");

  // the context (pt): every task from 14
  if (code === "pt") {
    var miss = on.filter(function (n) { return !G.context(n); });
    ok(!miss.length, L + "enunciador, interlocutor, propósito y género en cada consigna desde la 14" + (miss.length ? " (faltan " + miss.join(", ") + ")" : ""));
    ok(/Quién escribe/.test(html) && /A quién/.test(html) && /Para qué/.test(html) && /género/.test(html), L + "la grilla los muestra");
  } else ok(!/gr-ctx/.test(html), L + "sin context, sin casillas de adecuación");

  // the samples
  ok(D.samples.length >= 2, L + "hay textos de muestra para más de un tramo");
  ok(G.sample(14).from === 14 && G.sample(51).from > G.sample(20).from, L + "el par cambia con el tramo");
  D.samples.forEach(function (s) {
    var tag = L + "muestra desde la " + s.from + ": ";
    ok(s.task && s.hi && s.lo && s.hi.t && s.lo.t, tag + "consigna y los dos textos");
    [s.hi, s.lo].forEach(function (x) {
      ok(x.notes.length >= 2 && x.notes.length <= 3 && x.notes.every(function (n) { return ids.indexOf(n[0]) >= 0 && n[1]; }),
         tag + "2 o 3 anotaciones atadas a filas que existen");
    });
    var hiChk = S.check(s.hi.t, s.from), loChk = S.check(s.lo.t, s.from);
    var hi = G.score(s.hi.t, hiChk, hiChk.hard), lo = G.score(s.lo.t, loChk, loChk.hard);
    var sum = function (a) { return a.reduce(function (t, x) { return t + x.level; }, 0); };
    ok(sum(hi) > sum(lo), tag + "la nota alta puntúa mejor que la baja (" + sum(hi) + " > " + sum(lo) + ")");
    ok(G.connectors(s.hi.t).length >= 2, tag + "la nota alta tiene conectores (" + G.connectors(s.hi.t).join(", ") + ")");
    ok(!G.repeats(s.hi.t).length, tag + "la nota alta no repite de más");
  });
  ok(D.samples.some(function (s) { return G.repeats(s.lo.t).length; }), L + "alguna nota baja repite de más, y la fila lo ve");
  if (code === "it") ok(G.repeats("molto bello, molto buono, molto caro; bello e caro e bello").length === 2, L + "repeticiones: las que llegan a tres");
  var sh = G.samplesHtml(30);
  ok(/Nota alta/.test(sh) && /Nota baja/.test(sh) && (sh.match(/<li>/g) || []).length >= 4, L + "el botón muestra los dos, anotados");

  // self-assessment and the save
  var st = E.fromRaw({ xp: 1, cards: {} });
  ok(G.selfGet(st, 20).join() === "false,false,false,false", L + "al principio, nada marcado");
  G.selfSet(st, 20, 1, true);
  ok(st.grilla[20].s[1] === true && G.selfGet(st, 20)[1], L + "una casilla se guarda");
  ok(/data-grself="1" checked/.test(G.selfHtml(20, st)), L + "y vuelve marcada");
  ok(!("grilla" in E.fromRaw({ xp: 1, cards: {}, grilla: "roto" })), L + "un state.grilla roto se descarta");
  ok(E.fromRaw({ xp: 1, cards: {}, grilla: { 20: { s: [true] } } }).grilla[20].s[0] === true, L + "uno bien formado se conserva");
  var st2 = E.fromRaw({ xp: 1, cards: {}, grilla: { 20: "x" } });
  ok(G.selfGet(st2, 20).join() === "false,false,false,false" && G.selfSet(st2, 20, 0, true)[0], L + "una semana rota se rehace");

  // the result
  var s0 = D.samples[0], chk = S.check(s0.lo.t, 20);
  G.selfSet(st, 20, 0, true); G.selfSet(st, 20, 2, true);
  var res = G.resultHtml(20, st, s0.lo.t, chk, chk.hard);
  ok((res.match(/<li>/g) || []).length === 4 && /vos: ✓/.test(res) && /vos: —/.test(res), L + "la devolución, fila por fila, con lo que marcaste");
  ok(/miralo de nuevo/.test(res), L + "si marcaste que sí y la fila sale baja, lo dice");
  ok(G.resultHtml(20, st, "   ", chk, 0) === "", L + "sin texto, sin devolución");
  ok(/No marcaste/.test(G.resultHtml(21, st, s0.hi.t, S.check(s0.hi.t, 21), 0)), L + "sin autoevaluación, lo recuerda");
});

T.done();
