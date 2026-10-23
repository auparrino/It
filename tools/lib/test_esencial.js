/* «Lo esencial de la semana» (docs/js/esencial.js), en los tres idiomas:
 * - cada semana con lección arma su tarjeta: de 8 a 10 líneas (los jefes,
 *   sin palabras de la semana, al menos 4), cada una con un hueco que sale
 *   de su fuente (un ejemplo de la lección, una línea de w.keys o una
 *   palabra de la semana), respuestas distintas, marcas *…* parejas a los
 *   dos lados del hueco y el bloque de teoría, si tiene, dentro de la lección;
 * - la mayoría de los huecos de las fórmulas y las reglas apunta a su bloque;
 * - las fichas: todas las respuestas y dos de más; el control cuenta bien;
 * - el resultado se guarda (mejor, veces, lo fallado) y un state.esencial
 *   roto se descarta al cargar;
 * - el botón solo con la lección leída; la Estación ofrece sus tres semanas;
 * - el núcleo no nombra ningún idioma; boot.js lo carga y app.js lo llama
 *   en la lección, la semana, el resultado de la Estación y la pantalla.
 *   Run: node tools/lib/test_esencial.js */
"use strict";
var fs = require("fs"), path = require("path");
var pack = require("./pack.js");
var Boot = require(path.join(pack.DOCS, "js", "boot.js"));
var T = require("./testkit.js")("es"), ok = T.ok;

var SRC = fs.readFileSync(path.join(pack.DOCS, "js", "esencial.js"), "utf8");
ok(!/italian|portugu|brasil|alem[aá]n|german|deutsch|\bLa Via\b|Rumo C1|Weg C1/i.test(SRC.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "")), "esencial.js no nombra ningún idioma");
ok(Boot.coreFiles().indexOf("js/esencial.js") >= 0, "el service worker guarda esencial.js");
var ORD = Boot.ORDER.map(function (e) { return e.lang || e.core || e.shared; });
ok(ORD.indexOf("esencial.js") > ORD.indexOf("lezione.js") && ORD.indexOf("esencial.js") > ORD.indexOf("estacion.js") &&
   ORD.indexOf("esencial.js") < ORD.indexOf("app.js"), "esencial.js se carga después de lezione.js y estacion.js, antes de app.js");
var APP = fs.readFileSync(path.join(pack.DOCS, "js", "app.js"), "utf8");
ok(/Esencial\.offerHtml\(state, w, "lesson"\)/.test(APP), "la lección completa ofrece la tarjeta");
ok(/Esencial\.offerHtml\(state, w\)/.test(APP), "la semana ofrece la tarjeta");
ok(/Esencial\.stationHtml\(state, course, round\.arg\)/.test(APP) && /Esencial\.stationHtml\(state, course, fw\.end\)/.test(APP) && /return h \? '<div class="card">'/.test(APP),
   "la Estación ofrece las tarjetas de sus tres semanas (en la semana y en el resultado)");
ok(/Esencial\.owns\(s\)\) html = Esencial\.render\(s\)/.test(APP) && /Esencial\.wire\(view\.screen\)/.test(APP) && /Esencial\.attach\(/.test(APP),
   "la pantalla «esencial» se dibuja, se cablea y tiene su anfitrión");
ok(/"estacion", "esencial",/.test(fs.readFileSync(path.join(pack.DOCS, "js", "engine.js"), "utf8")), "state.esencial es un campo de módulo del guardado");

function strip(s) { return String(s == null ? "" : s).replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1").trim(); }
function stars(s) { return (String(s).split("*").length - 1) % 2 === 0; }

pack.ALL.forEach(function (code) {
  var L = code + " · ";
  var ctx = pack(code), E = ctx.Esencial, course = pack.data(code, "course.json");
  ok(E && typeof E.card === "function", L + "esencial.js cargado");
  if (!E) return;
  var withBlock = 0, gapped = 0, cards = 0;
  course.weeks.forEach(function (w) {
    if (!w.lesson || !w.lesson.blocks || !w.lesson.blocks.length) return;
    var S = L + "semana " + w.week + " · ", c = E.card(w);
    ok(!!c, S + "tiene tarjeta");
    if (!c) return;
    cards++;
    var n = c.lines.length, min = (w.vocab || []).length ? 8 : E.MIN;
    ok(n >= min && n <= E.MAX, S + "entre " + min + " y " + E.MAX + " líneas: " + n);
    ok(c.lines.some(function (l) { return l.kind === "formula"; }), S + "al menos una fórmula para comunicar");
    var seen = {};
    // the sources: the examples, the keys, the words
    var exs = [], keys = (w.keys || []).map(String), voc = (w.vocab || []).map(function (v) { return v[0]; });
    w.lesson.blocks.forEach(function (b) { (b.ex || []).forEach(function (e) { exs.push(String(e[0])); }); });
    c.lines.forEach(function (l, k) {
      var P = S + "línea " + (k + 1) + " · ";
      ok(l.answer && strip(l.answer) === l.answer && !seen[l.answer.toLowerCase()], P + "una respuesta limpia y que no se repite: " + l.answer);
      seen[String(l.answer).toLowerCase()] = 1;
      ok(stars(l.pre) && stars(l.post), P + "las marcas *…* quedan parejas a los dos lados del hueco");
      ok(!/[A-Za-z\u00C0-\u024F]$/.test(l.pre) && !/^[A-Za-z\u00C0-\u024F]/.test(l.post), P + "el hueco es una palabra entera, no una terminación");
      ok(l.block == null || (l.block >= 0 && l.block < w.lesson.blocks.length), P + "el bloque de teoría está en la lección");
      var whole = l.pre + l.answer + l.post, whole2 = l.pre + "*" + l.answer + "*" + l.post;
      if (l.kind === "formula") {
        ok(exs.indexOf(whole2) >= 0 || exs.indexOf(whole) >= 0, P + "la fórmula es un ejemplo de la lección: " + whole);
        ok(!!l.hint, P + "la fórmula lleva su castellano");
        ok(strip(l.pre + l.post).replace(/[\s.,;:!?()«»–-]/g, "").length > 0, P + "el hueco no es toda la oración");
      } else if (l.kind === "regla") {
        ok(keys.indexOf(whole2) >= 0 || keys.indexOf(whole) >= 0, P + "la regla es una línea de «Lo que se juega»: " + whole);
      } else {
        ok(l.kind === "palabra" && voc.indexOf(l.answer) >= 0 && l.hint, P + "la palabra clave es de la semana, con su castellano");
      }
      if (l.kind !== "palabra") { gapped++; if (l.block != null) withBlock++; }
    });
    // the bank, the check
    var bank = E.bank(c, function () { return 0.3; }, w);
    ok(c.lines.every(function (l) { return bank.indexOf(l.answer) >= 0; }) && bank.length >= n && bank.length <= n + 2,
       S + "las fichas: todas las respuestas y hasta dos de más");
    var all = E.check(c, c.lines.map(function (l) { return l.answer; }));
    ok(all.ok === n && all.n === n, S + "todo bien cuenta " + n);
    var one = E.check(c, c.lines.map(function (l, k) { return k === 0 ? "zzz" : l.answer; }));
    ok(one.ok === n - 1 && one.right[0] === false, S + "un hueco mal cuenta uno menos");
  });
  ok(cards >= 50, L + "una tarjeta en (casi) cada semana: " + cards);
  ok(withBlock / Math.max(1, gapped) >= 0.8, L + "las fórmulas y reglas llevan a su teoría: " + withBlock + " de " + gapped);

  /* el guardado */
  var Eng = ctx.Engine, st = Eng.fromRaw({ xp: 0, cards: {} });
  var w5 = course.weeks[4], c5 = E.card(w5);
  ok(E.offerHtml(st, w5) === "", L + "sin la lección leída no se ofrece");
  st.read = {}; st.read[5] = Date.now();
  ok(/data-esencial="5"/.test(E.offerHtml(st, w5)) && /completá las/.test(E.offerHtml(st, w5)), L + "con la lección leída: «completá»");
  ok(/data-esfrom="lesson"/.test(E.offerHtml(st, w5, "lesson")), L + "al terminar la lección, su nota");
  var r1 = E.check(c5, c5.lines.map(function (l, k) { return k < 2 ? null : l.answer; }));
  var s1 = E.save(st, 5, r1);
  ok(s1.first && st.esencial[5].ok === c5.lines.length - 2 && st.esencial[5].plays === 1 && st.esencial[5].miss.join() === "0,1",
     L + "se guarda el resultado y lo que faltó");
  var s2 = E.save(st, 5, E.check(c5, []));
  ok(!s2.first && st.esencial[5].ok === 0 && st.esencial[5].best === c5.lines.length - 2 && st.esencial[5].plays === 2, L + "la segunda vez: el mejor se conserva");
  ok(/hoja de repaso/.test(E.offerHtml(st, w5)), L + "jugada, queda como hoja de repaso");
  ok(!("esencial" in Eng.fromRaw({ xp: 1, cards: {}, esencial: "roto" })), L + "un state.esencial roto se descarta");
  var old = Eng.fromRaw({ xp: 1, cards: {}, esencial: { 5: { ok: 7, n: 10 }, 6: { ok: 3 }, 7: "x" } });
  ok(old.esencial[5].ok === 7, L + "uno bien formado se conserva");
  ok(E.record(old, 5).best === 7 && E.record(old, 5).plays === 1 && /\(7\/10\)/.test(E.offerHtml((old.read = { 5: 1 }, old), w5)),
     L + "un registro viejo sin «best» se lee con números (nada de «undefined/10»)");
  ok(E.record(old, 6) === null && E.record(old, 7) === null, L + "un registro sin n o que no es objeto no cuenta");
  ok(E.save(old, 7, E.check(c5, [])).first && old.esencial[7].plays === 1, L + "guardar sobre un registro roto empieza de cero");
  // banco: las fichas de más no son castellano ni pedazos de palabra
  var extra = E.bank(c5, Math.random, w5).filter(function (t) { return !c5.lines.some(function (l) { return l.answer === t; }); });
  ok(extra.every(function (t) { return !/^(la|el|los|las) /.test(t) && !/ñ/.test(t); }), L + "las fichas de más no son castellano: " + extra.join(" | "));

  /* la Estación: sus tres semanas */
  if (ctx.Estacion) {
    var end = ctx.Estacion.ends(course)[0];
    var st2 = Eng.fromRaw({ xp: 0, cards: {} });
    ok(E.stationHtml(st2, course, end) === "", L + "Estación sin lecciones leídas: nada");
    st2.read = {}; [end - 2, end - 1, end].forEach(function (n) { st2.read[n] = 1; });
    var h = E.stationHtml(st2, course, end);
    ok([end - 2, end - 1, end].every(function (n) { return h.indexOf('data-esencial="' + n + '"') >= 0; }), L + "la Estación ofrece las tres semanas que repasa");
    st2.estacion = {}; st2.estacion[end] = { pct: 50, rows: [{ k: "w:" + (end - 1), ok: 1, n: 4 }, { k: "w:" + end, ok: 4, n: 4 }, null, { k: 3 }] };
    h = E.stationHtml(st2, course, end);
    ok(/🟡 Semana (\d+)/.exec(h) && /🟡 Semana (\d+)/.exec(h)[1] === String(end - 1) && h.split("🟡").length === 2,
       L + "después de la ronda, 🟡 solo en la semana floja (y filas raras no rompen)");
  }
});

T.done();
