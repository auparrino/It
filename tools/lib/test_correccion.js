/* La corrección después de una respuesta, en los dos idiomas:
   - la nota de la segunda vez («🔁 Segunda vez, más fácil») no delata la
     respuesta por eliminación (la tabla del verbo con la otra opción a la
     vista) ni muestra lo que había que escuchar (Devolucion.retryNote);
   - una respuesta en español nunca es «Casi»;
   - la versión de reconocimiento de una traducción separa las opciones que
     son la respuesta con una trampa (se diagnostican) de las que son otra
     respuesta de la semana (no: no hay regla que nombrar);
   - la hoja de la devolución: lo correcto antes que el porqué, aria-live,
     lo que se consulta plegado y el registro de errores con su porqué
     (chequeos sobre docs/js/app.js; la prueba en el navegador está en
     tools/lib/smoke_browser.js).
   Run: node tools/lib/test_correccion.js */
"use strict";
var fs = require("fs"), path = require("path");
var pack = require("./pack.js");
var n = 0, bad = 0;
function ok(c, m) { n++; if (!c) { bad++; console.log("FAIL " + m); } }

function fold(s) { return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
function hasWord(text, w) {
  var x = fold(w).replace(/^[¿¡"«(]+|[.,;:!?…"»)]+$/g, "");
  if (!x) return false;
  var re = new RegExp("(^|[^\\p{L}\\p{N}])" + x.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?=$|[^\\p{L}\\p{N}])", "u");
  return re.test(fold(text));
}

pack.LANGS.forEach(function (code) {
  var c = pack(code), DV = c.Devolucion, Drills = c.Drills, Conj = c.Conj;
  var course = pack.data(code, "course.json");

  /* (a) The retry note, item by item, as retryVersion builds it: the answer
     and one wrong option.  The wrong option never shows in the note. */
  var shown = 0, dropped = 0, leaks = 0, ex = "";
  course.items.forEach(function (it) {
    if (!it.note || !it.options || it.options.length < 3 || /\|/.test(it.answer || "")) return;
    it.options.forEach(function (o) {
      if (fold(o) === fold(it.answer)) return;
      var copy = Object.assign({}, it, { options: [it.answer, o], retry: true });
      var rn = DV.retryNote(copy);
      if (!rn) { dropped++; return; }
      shown++;
      if (String(o).length >= 3 && hasWord(rn, o)) { leaks++; if (!ex) ex = it.id + " «" + o + "»: " + rn; }
    });
  });
  ok(leaks === 0, code + ": la otra opción a la vista en la nota de la segunda vez: " + leaks + " " + ex);
  // it still helps: most notes stay (a rule with the answer covered)
  ok(shown > dropped, code + ": notas que quedan en la segunda vez: " + shown + " (sin nota: " + dropped + ")");

  /* (b) The conjugation gym: the note is the whole table, so the other
     option is always in it; the second time comes without it. */
  var verbs = Object.keys(Conj.VERBS).slice(0, 25), tenses = (Conj.SIMPLE_TENSES || Conj.ALL_TENSES).slice(0, 3);
  var gym = 0, gymLeak = 0, gex = "";
  verbs.forEach(function (v) {
    tenses.forEach(function (t) {
      var it;
      try { it = Drills.conjugationDrill(v, t, null, null); } catch (e) { return; }
      if (!it || !it.note || !it.options) return;
      var wrong = it.options.filter(function (o) { return fold(o) !== fold(it.answer); })[0];
      var rn = DV.retryNote(Object.assign({}, it, { options: [it.answer, wrong], retry: true }));
      gym++;
      if (rn && hasWord(rn, wrong)) { gymLeak++; if (!gex) gex = it.id + ": " + rn; }
    });
  });
  ok(gym > 20 && gymLeak === 0, code + ": gimnasio, la tabla delata la otra opción: " + gymLeak + "/" + gym + " " + gex);

  // hand-made cases
  var CASES = code === "it" ? {
    table: { answer: "piaceremmo", options: ["piacerebbero", "piaceremmo"],
             note: "piacere · condizionale presente: piacerei, piaceresti, piacerebbe, piaceremmo, piacereste, piacerebbero" },
    rule: { answer: "la", stem: "___ città", options: ["la", "il"], note: "Las palabras en -tà son femeninas: *la città*, *l'università*." },
    short: { answer: "la", stem: "___ notte", options: ["la", "il"], note: "No *il notte*: *la notte*." },
    listen: { type: "listen", answer: "Hola, ¿cómo estás?", frase: { it: "Ciao, come stai?" }, options: ["Hola, ¿cómo estás?", "Chau"],
              note: "*Come stai?* es «¿cómo estás?» con *tu*." }
  } : {
    table: { answer: "falávamos", options: ["falavam", "falávamos"],
             note: "falar · pretérito imperfeito: falava, falavas, falava, falávamos, falavam" },
    rule: { answer: "Bom", stem: "___ dia!", options: ["Bom", "Boa"], note: "Dia es masculino (*o dia*): *bom dia*." },
    short: { answer: "o", stem: "___ dia", options: ["o", "a"], note: "Nunca *a dia*: *o dia*." },
    listen: { type: "listen", answer: "Hola, ¿todo bien?", frase: { it: "Oi, tudo bem?" }, options: ["Hola, ¿todo bien?", "Un gusto"],
              note: "*Tudo bem?* es literalmente «¿todo bien?», sin verbo." }
  };
  ok(DV.retryNote(CASES.table) === "", code + ": la tabla del verbo no va en la segunda vez: " + DV.retryNote(CASES.table));
  var rr = DV.retryNote(CASES.rule);
  ok(rr && /___/.test(rr) && !hasWord(rr, CASES.rule.answer), code + ": la regla va, con la respuesta tapada: " + rr);
  ok(DV.retryNote(CASES.short) === "", code + ": una opción corta escrita en la nota: sin nota: " + DV.retryNote(CASES.short));
  var rl = DV.retryNote(CASES.listen);
  ok(!rl || !hasWord(rl, CASES.listen.frase.it.split(/[ ,?]+/)[1]), code + ": escuchar: la nota no escribe lo que se escucha: " + rl);
  ok(DV.retryNote({ answer: "x", options: ["x", "y"] }) === "", code + ": sin nota, nada");

  /* (c) An answer in Spanish is never «Casi». */
  var es = code === "it" ? ["Vení acá un momento.", "Vieni qui un momento."] : ["Ella está trabajando en un hotel.", "Ela está trabalhando num hotel."];
  var d = c.Diagnosi.diagnose(es[0], [es[1]], {});
  d.inSpanish = true;
  ok(!/Casi/.test(DV.promptVerdict(es[0], [es[1]], d)), code + ": respuesta en español: " + DV.promptVerdict(es[0], [es[1]], d));
  var typo = code === "it" ? ["grazei", "grazie"] : ["obrigdo", "obrigado"];
  ok(/Casi/.test(DV.promptVerdict(typo[0], [typo[1]], c.Diagnosi.diagnose(typo[0], [typo[1]], {}))), code + ": un tipeo sigue siendo «Casi»");

  /* (d) Recognition of a translation: which options are other answers. */
  var rec = 0, marked = 0, wrongMark = 0, wex = "";
  course.items.forEach(function (it) {
    if (it.type !== "translate") return;
    var r = Drills.recognitionOf(it, course.items, it.wk || 52);
    if (!r) return;
    rec++;
    ok(Array.isArray(r.otherAnswers), code + ": " + it.id + " sin otherAnswers");
    if (!Array.isArray(r.otherAnswers)) return;
    if (r.otherAnswers.length) marked++;
    r.otherAnswers.forEach(function (o) {
      // another answer of the week: in the options, never the answer
      if (r.options.indexOf(o) < 0 || fold(o) === fold(it.answer)) { wrongMark++; if (!wex) wex = it.id + " " + o; }
    });
  });
  ok(rec > 20 && wrongMark === 0, code + ": otras respuestas mal marcadas: " + wrongMark + "/" + rec + " " + wex);
});

/* (e) The sheet in app.js: the order and the attributes the browser test
   relies on, so a refactor does not lose them silently. */
var app = fs.readFileSync(path.join(pack.DOCS, "js", "app.js"), "utf8");
var fbStart = app.indexOf('var fb = \'<div class="feedback \' + verdict');
var fbBlock = app.slice(fbStart, app.indexOf("$(\"#fb\").innerHTML = fb;", fbStart));
ok(fbStart > 0 && fbBlock.indexOf('class="sol"') < fbBlock.indexOf("(extra || \"\")"), "app.js: la respuesta correcta va antes del porqué");
ok(fbBlock.indexOf("(extra || \"\")") < fbBlock.indexOf("desgloseHtml("), "app.js: el porqué va antes del desglose");
ok(/desgloseHtml\(targetText\(it\), \(verdict !== "giusto" && !explained\)/.test(fbBlock), "app.js: el desglose se pliega cuando ya hay porqué");
ok(/keywordBox\(vw, true\)/.test(fbBlock), "app.js: la imagen para recordar, plegada en la devolución");
ok((app.match(/id="fb" aria-live="polite"/g) || []).length >= 3, "app.js: las devoluciones con aria-live");
ok(/\$\("#next"\)\.focus\(\{ preventScroll: true \}\)/.test(app), "app.js: el foco va a «Siguiente»");
ok((app.match(/\$\("#next"\)\.onclick = nextAfterFeedback\(\)/g) || []).length === 2 && /e\.detail === 0 && Date\.now\(\) - at < 450/.test(app),
   "app.js: un Enter repetido no saltea la corrección");
ok(/verdict === Engine\.VERDICT\.CLOSE && it\.options\) verdict = Engine\.VERDICT\.WRONG/.test(app), "app.js: una opción equivocada no es «Casi»");
ok(/l: String\(d\.label/.test(app) && /x: String\(d\.explain/.test(app), "app.js: el registro de errores guarda el porqué");

console.log((bad ? bad + " fallas" : "ok") + " · " + n + " chequeos (la corrección)");
process.exit(bad ? 1 : 0);
