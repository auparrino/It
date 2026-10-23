/* «Trampas del castellano» (docs/js/trampas.js, en Consultar):
   - las listas salen de lo que el paquete ya trae (banco, Lab, Suoni, curso,
     LANG.rules.gender.traps) y una lista vacía no se muestra: italiano y
     portugués tienen las cinco; alemán, género y falsos amigos;
   - cada lista se filtra por lo ya visto (semana o nivel): los falsos amigos
     del Lab no aparecen antes de FALSI_WEEK, y el examen no se adelanta;
   - «N de M dominadas» cuenta las tarjetas con dos aciertos seguidos;
   - la ronda de 10: ejercicios jugables (la respuesta entre las opciones),
     sin repetir, primero lo que no se sabe, y los ids nuevos («trampa:…»)
     vuelven en el repaso (Drills.reviewItem);
   - la pantalla (Trampas.page) y la entrada en Consultar.
     node tools/lib/test_trampas.js */
"use strict";
var pack = require("./pack.js");
var T = require("./testkit.js")("es"), ok = T.ok, eq = T.eq;

function load(code) {
  var c = pack(code);
  try { c.Banca.load(pack.data(code, "bank.json")); } catch (e) { /* de: sin banco */ }
  var course = pack.data(code, "course.json");
  var map = {};
  course.items.forEach(function (it) { map[it.id] = it; });
  return { c: c, Tr: c.Trampas, course: course, map: map };
}
function st(week, cards) { return { unlocked: week, cards: cards || {}, read: {} }; }

pack.ALL.forEach(function (code) {
  var x = load(code), Tr = x.Tr, course = x.course;
  ok(!!Tr, code + ": Trampas cargado");
  var ctx = { course: course, state: st(52) };
  var ids = Tr.lists(ctx).map(function (l) { return l.id; });
  if (code === "de") eq(ids, ["genero", "falsos"], "de: solo las listas con datos");
  else eq(ids, ["genero", "acento", "falsos", "prep", "cuela"], code + ": las cinco listas");
  ok(Tr.available(ctx), code + ": la sección aparece");

  Tr.lists(ctx).forEach(function (l) {
    var s1 = Tr.summary(l, st(1)), s52 = Tr.summary(l, st(52));
    ok(s52.seen.length === l.entries.length, code + " " + l.id + ": en la semana 52 se ve todo (" + s52.seen.length + "/" + l.entries.length + ")");
    ok(s1.seen.length < s52.seen.length && s1.ahead > 0, code + " " + l.id + ": en la semana 1 se ve menos (" + s1.seen.length + ")");
    ok(l.entries.length >= (code === "de" ? 5 : 10), code + " " + l.id + ": tiene entradas (" + l.entries.length + ")");
    var keys = {};
    l.entries.forEach(function (e) {
      ok(!keys[e.key], code + " " + l.id + ": sin repetidas " + e.key);
      keys[e.key] = 1;
      ok(e.t && e.ids.length && typeof e.make === "function", code + " " + l.id + ": entrada completa " + e.key);
      ok(!/_{3,}/.test(e.t), code + " " + l.id + ": la forma se muestra sin hueco: " + e.t);
    });
    // nothing of the exam ahead of time
    ok(!l.entries.some(function (e) { var it = x.map[e.ids[0]]; return it && (it.prova || it.topic === "esame"); }),
       code + " " + l.id + ": sin ítems del examen");

    // the round of 10
    var r = Tr.round(l.id, st(52), { course: course, map: x.map });
    eq(r.length, Math.min(10, l.entries.length), code + " " + l.id + ": la ronda tiene " + Math.min(10, l.entries.length));
    var seenIds = {};
    r.forEach(function (it) {
      ok(!seenIds[it.id], code + " " + l.id + ": la ronda no repite " + it.id);
      seenIds[it.id] = 1;
      ok(it.type && it.answer != null && it.answer !== "", code + " " + l.id + ": ejercicio con respuesta " + it.id);
      if (it.type === "choice" && it.options) ok(it.options.indexOf(it.answer) >= 0, code + " " + l.id + ": la respuesta está entre las opciones " + it.id);
      ok(x.c.Drills.knownId(x.map, it.id, st(52)), code + " " + l.id + ": el repaso sabe traer " + it.id);
    });
  });

  // dominated: two right in a row; the round leaves them last
  var l0 = Tr.lists(ctx)[0], cards = {};
  var all = Tr.summary(l0, st(52)).seen;
  var held = all.slice(0, Math.max(0, all.length - 3));
  held.forEach(function (e) { cards[e.ids[0]] = { reps: 2, ok: 2, s: 5, d: 5, state: "rev", due: Date.now() + 9e8 }; });
  var s = Tr.summary(l0, st(52, cards));
  eq(s.dom, held.length, code + " " + l0.id + ": cuenta las dominadas");
  ok(Tr.listHtml(l0, st(52, cards)).indexOf("<b>" + held.length + " de " + all.length + "</b> dominadas") >= 0, code + ": el contador «N de M dominadas»");
  var r2 = Tr.round(l0.id, st(52, cards), { course: course, map: x.map });
  var fresh = all.length - held.length;
  ok(r2.slice(0, fresh).every(function (it) {
    return !held.some(function (e) { return e.ids[0] === it.id; });
  }), code + ": primero lo que no domina");
  eq(Tr.status(held[0], st(52, cards)), "dominada", code + ": estado dominada");
  eq(Tr.status(held[0], st(52, {})), "vista", code + ": estado vista");
  ok(!Tr.dominated({ reps: 1, state: "learn" }), code + ": un acierto no domina");

  // the screen
  var html = Tr.page(ctx);
  ok(/Trampas del castellano/.test(html) && (html.match(/data-trround="/g) || []).length === ids.length, code + ": la pantalla con un botón de ronda por lista");
  ok(/Ronda de 10/.test(html), code + ": «Ronda de 10»");
  ok(/¿En qué se diferencia del castellano\?/.test(html), code + ": la nota de un toque");
  ok(/data-csub="trampas"/.test(Tr.entryButton(ctx)), code + ": la entrada en Consultar");
});

// Italian: the accent of the round does not give the answer away
(function () {
  var x = load("it"), Tr = x.Tr;
  var r = Tr.round("acento", st(52), { course: x.course, map: x.map, size: 50 });
  ok(r.length >= 8, "it: acento, ronda (" + r.length + ")");
  r.forEach(function (it) {
    ok(/^trampa:acc:/.test(it.id), "it: acento con id propio " + it.id);
    ok(!/[àèéìòù]/.test(it.stem.split("  (")[0]), "it: el enunciado no trae el acento: " + it.stem);
  });
  var tel = Tr.reviewItem("trampa:acc:telefono");
  ok(tel && tel.answer === "telèfono", "it: el repaso rearma telèfono");
  var due = st(52, { "trampa:acc:telefono": { reps: 1, s: 1, d: 5, state: "learn", due: Date.now() - 1000 } });
  ok(x.c.Drills.buildReview(x.course, due, 5, { map: x.map }).some(function (i) { return i.id === "trampa:acc:telefono"; }),
     "it: el repaso trae trampa:acc:telefono vencida");
  // the gender list: il latte style entries from the bank, with their article
  var gen = Tr.list("genero", { course: x.course }).entries.map(function (e) { return e.t; });
  ok(gen.indexOf("il letto") >= 0, "it: género, il letto");
  // knowing what the word means is not knowing its gender: the meaning card
  // says it was seen, only the article's card makes it held
  var letto = Tr.list("genero", { course: x.course }).entries.filter(function (e) { return e.t === "il letto"; })[0];
  var voc = {}; voc["b:voc:letto"] = { reps: 5, s: 30, d: 5, state: "rev", due: Date.now() + 9e8 };
  eq(Tr.status(letto, st(52, voc)), "vista", "it: la tarjeta del significado no domina el género");
  ok(Tr.isSeen(letto, st(1, voc)), "it: pero dice que ya se vio");
  var vocMaint = {}; vocMaint[letto.ids[0]] = { reps: 0, s: 90, d: 5, state: "maint", due: Date.now() + 9e8 };
  eq(Tr.status(letto, st(52, vocMaint)), "dominada", "it: el artículo en mantenimiento, dominada");
  // the Lab's false friends wait for FALSI_WEEK
  var fl = Tr.list("falsos", { course: x.course });
  var lab = fl.entries.filter(function (e) { return /^falso:/.test(e.key); });
  ok(lab.length === x.c.Lab.FALSI.length, "it: todos los falsos amigos del Lab");
  ok(!Tr.isSeen(lab[0], st(x.c.Lab.FALSI_WEEK - 1)) && Tr.isSeen(lab[0], st(x.c.Lab.FALSI_WEEK)), "it: el Lab entra en FALSI_WEEK");
  ok(Tr.isSeen(lab[0], st(1, { "falso:0": { reps: 1 } })), "it: uno ya jugado se ve antes");
})();

// Portuguese: the heterotonics of Suoni and of the bank, without repeats
(function () {
  var x = load("pt"), Tr = x.Tr;
  var acc = Tr.list("acento", { course: x.course }).entries.map(function (e) { return e.t; });
  ok(acc.indexOf("polícia") >= 0 && acc.indexOf("álcool") >= 0, "pt: polícia (Suoni) y álcool");
  eq(acc.filter(function (w) { return w === "cérebro"; }).length, 1, "pt: cérebro una sola vez");
  ok(Tr.list("genero", { course: x.course }).entries.some(function (e) { return e.t === "a garagem"; }), "pt: a garagem");
  ok(Tr.list("prep", { course: x.course }).entries.some(function (e) { return /Preciso de um táxi/.test(e.t); }), "pt: precisar de");
})();

// German: the genders computed from the words of the week
(function () {
  var x = load("de"), Tr = x.Tr;
  var g = Tr.list("genero", { course: x.course }).entries;
  var t = g.map(function (e) { return e.t; });
  ok(t.indexOf("der Tisch") >= 0 && t.indexOf("die Hose") >= 0, "de: der Tisch (la mesa), die Hose (el pantalón)");
  ok(t.indexOf("die Uhr") < 0, "de: die Uhr (el reloj; la hora) queda afuera");
  ok(!t.some(function (w) { return /^das /.test(w); }), "de: el neutro no es trampa");
  var tisch = g.filter(function (e) { return e.t === "der Tisch"; })[0];
  eq(tisch.week, 3, "de: der Tisch, semana 3");
  var it = Tr.reviewItem("trampa:gen:Tisch");
  ok(it && it.answer === "der" && it.options.length === 3, "de: el repaso rearma der Tisch");
  var due = st(52, { "trampa:gen:Tisch": { reps: 1, s: 1, d: 5, state: "learn", due: Date.now() - 1000 } });
  ok(x.c.Drills.buildReview(x.course, due, 5, { map: x.map }).some(function (i) { return i.id === "trampa:gen:Tisch"; }),
     "de: el repaso trae trampa:gen:Tisch vencida");
  ok(Tr.list("falsos", { course: x.course }).entries.some(function (e) { return e.t === "der Rat"; }), "de: der Rat");
})();

// A package with nothing: the section hides
(function () {
  var x = load("de"), Tr = x.Tr;
  Tr._reset();
  ok(!Tr.available({ course: { weeks: [], items: [] }, state: st(52) }), "sin datos, la sección no aparece");
  eq(Tr.entryButton({ course: { weeks: [], items: [] } }), "", "sin datos, sin entrada en Consultar");
  Tr._reset();
})();

T.done();
