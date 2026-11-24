/* Δρόμος C1 — el curso de griego compilado (docs/lang/el/data/course.json, lo
   arma tools/el/build_course.py) y el núcleo jugándolo con el paquete
   griego (tools/lib/pack.js):
   - el formato de cada ejercicio, semana, lección y palabra;
   - cada respuesta se corrige como buena; el acento, la sigma final y «;»;
   - la escritura griega: sin letras latinas coladas, con su acento;
   - cómo suena una palabra (la ayuda de lectura) y el teclado;
   - las lecciones: un chequeo por bloque, con una sola opción correcta;
   - las rondas, la pausa y el repaso traen solo ejercicios del griego;
   - el guardado es propio (dromosc1.save.v1).
   Corre: node tools/el/test_curso.js */
"use strict";
var pack = require("../lib/pack.js");
var ctx = pack("el");
var Engine = ctx.Engine, Drills = ctx.Drills, Lez = ctx.Lezione, LANG = ctx.LANG;
var course = pack.data("el", "course.json");
var T = require("../lib/testkit.js")("el"), ok = T.ok;

var nfc = function (s) { return typeof s !== "string" || s === s.normalize("NFC"); };
// A Latin letter inside an answer in Greek: a slip of the author (the Latin
// «o» inside a Greek word cannot be seen and breaks the correction)
var SPANISH = /[A-Za-zñáéíóú¿¡]/;
var MIXED = /[A-Za-zÀ-ÿ][\u0370-\u03ff]|[\u0370-\u03ff][A-Za-zÀ-ÿ]/;
var GREEK = /[\u0370-\u03ff]/;

/* ------------------------------------------------ el paquete */
ok(LANG.code === "el" && LANG.storage === "dromosc1" && LANG.tts === "el-GR", "lang.js del griego");
ok(LANG.rules && LANG.rules.grade && LANG.rules.traps && LANG.rules.distract, "rules.js del griego");
ok(LANG.ui.kbRows && LANG.ui.kbRows[0] === "ςερτυθιοπ" && LANG.ui.kbQuestion === ";" && LANG.ui.kbAlways, "el teclado de la app es el griego, con «;» y también con mouse");

/* ------------------------------------------------ el curso */
ok(course.weeks.length >= 13, "la primera temporada: " + course.weeks.length + " semanas");
// the seasons follow one another with no gap and cover every week
ok(course.seasons.every(function (s, k) { return s.n === k + 1 && s.weeks[0] === (k ? course.seasons[k - 1].weeks[1] + 1 : 1); }) &&
   course.seasons[course.seasons.length - 1].weeks[1] === course.weeks.length, "las temporadas cubren las semanas");
ok(course.weeks.every(function (w) { var s = course.seasons[w.season - 1]; return s && w.week >= s.weeks[0] && w.week <= s.weeks[1]; }), "cada semana en su temporada");

var ids = {}, map = {};
course.items.forEach(function (it) {
  ok(!ids[it.id], "id repetido " + it.id); ids[it.id] = 1; map[it.id] = it;
  ok(["choice", "cloze", "translate", "listen", "typed", "fixerr", "dictation"].indexOf(it.type) >= 0, it.id + ": tipo " + it.type);
  if (it.type === "fixerr") ok(it.bad && it.stem.indexOf(it.bad) >= 0 && it.stem.split(it.bad).length === 2 && it.answer !== it.stem && it.cat, it.id + ": el error, una sola vez, y su categoría");
  if (it.type === "dictation") ok(it.nopeek && it.stem === it.answer, it.id + ": dictado");
  ok(it.prompt && it.stem && it.answer, it.id + ": prompt, stem y answer");
  ok(it.accept.indexOf(it.answer) >= 0, it.id + ": accept trae la respuesta");
  if (it.options) {
    ok(it.options.indexOf(it.answer) >= 0, it.id + ": la respuesta está entre las opciones");
    // the correction does not look at capitals: two options that only differ in them would both be right
    ok(new Set(it.options.map(function (o) { return o.toLowerCase(); })).size === it.options.length, it.id + ": opciones repetidas (sin mirar mayúsculas)");
  }
  if (it.type === "cloze") ok(/_{3,}/.test(it.stem), it.id + ": el hueco ___");
  if (it.type === "translate" || it.type === "typed" || it.type === "cloze")
    ok(it.accept.every(function (a) { return !SPANISH.test(a) && GREEK.test(a); }), it.id + ": las respuestas escritas son en griego, sin letras latinas");
  if (it.type === "listen") ok(!SPANISH.test(it.stem) && it.nopeek, it.id + ": escucha en griego");
  [it.prompt, it.stem, it.answer, it.note].concat(it.options || [], it.accept).forEach(function (s) { ok(!MIXED.test(String(s || "").replace(/\*/g, "")), it.id + ": letras latinas y griegas en una palabra «" + s + "»"); });
  [it.stem, it.answer, it.note].concat(it.options || [], it.accept).forEach(function (s) { ok(nfc(s), it.id + ": NFC «" + s + "»"); });
  ok(Engine.grade(it.answer, it) === "giusto", it.id + ": su respuesta se corrige como buena");
});

var words = {};
course.weeks.forEach(function (w, k) {
  var tag = "semana " + w.week;
  ok(w.week === k + 1, tag + ": en orden");
  ok(w.title && w.focus && w.keys.length >= 3, tag + ": título, foco y claves");
  ok(w.items.length >= 30, tag + ": ejercicios " + w.items.length);
  ok(w.items.every(function (id) { return map[id]; }), tag + ": ejercicios existentes");
  ok(w.vocab.length >= 8, tag + ": vocabulario " + w.vocab.length);
  w.vocab.forEach(function (v) {
    ok(v[0] && v[1] && !SPANISH.test(v[0]) && !SPANISH.test(v[2] || "") && !GREEK.test(v[1]), tag + ": palabra «" + v[0] + "»");
    ok(!words[v[0]], tag + ": «" + v[0] + "» ya estaba en la semana " + words[v[0]]); words[v[0]] = w.week;
  });
  var bl = w.lesson.blocks, seen = {};
  w.parts.forEach(function (p, pk) {
    ok(p.items.length > 0, tag + ": la parte " + (pk + 1) + " tiene ejercicios");
    p.blocks.forEach(function (i) { ok(bl[i] && !seen[i], tag + ": bloque " + i + " en una sola parte"); seen[i] = 1; });
  });
  ok(Object.keys(seen).length === bl.length, tag + ": todos los bloques en alguna parte");
  bl.forEach(function (b, i) {
    ok(b.h && b.r, tag + " bloque " + i + ": título y regla");
    ok((b.q || []).length >= 1, tag + " bloque " + i + ": chequeo a mano");
    (b.q || []).concat(b.qq || []).forEach(function (q) {
      ok(q.options.indexOf(q.answer) >= 0 && new Set(q.options).size === q.options.length, tag + " bloque " + i + ": chequeo «" + q.prompt + "»");
    });
  });
  // the lesson: every check has its answer among options that are all different
  for (var r = 0; r < 5; r++) {
    var st = Lez.steps(w.lesson, Math.random, w.week, null, null);
    var quiz = st.filter(function (x) { return x.kind === "quiz"; });
    ok(quiz.length >= bl.length, tag + ": la lección tiene un chequeo por bloque (" + quiz.length + ")");
    quiz.forEach(function (x) {
      var o = x.q.options.map(String);
      ok(o.indexOf(String(x.q.answer)) >= 0 && new Set(o).size === o.length, tag + ": chequeo «" + (x.q.stem || x.q.prompt) + "» → " + JSON.stringify(x.q.options));
    });
  }
  // a round of the week: items of this course, words of the week
  var state = Engine.load();
  var round = Drills.buildRound(course, w, { map: Drills.itemsById(course), state: state, size: 12 })
    .filter(function (it) { return it.type !== "word"; });      // the cards that present a new word
  ok(round.length >= 10, tag + ": ronda de " + round.length);
  ok(round.every(function (it) { return it.src === "vocab" || (/^el\d/.test(it.id) && it.wk <= w.week) || /^el\d/.test(it.orig || ""); }),
     tag + ": la ronda es del curso griego: " + round.map(function (it) { return it.id; }).join(","));
  var vs = Drills.vocabSession(course, w, state, 14);
  ok(vs.length >= 8 && vs.every(function (it) { return !it.options || it.options.indexOf(it.answer) >= 0; }), tag + ": palabras de la semana");
});

/* ------------------------------------------------ la pausa y el repaso */
var s1 = Engine.load();
s1.read = { 1: Date.now() };
var pausa = Drills.buildPausa(course, s1, course.weeks[0], { map: Drills.itemsById(course) });
ok(pausa.length >= 4 && pausa.every(function (it) { return it && (it.src === "vocab" || /^el\d/.test(it.id)); }),
   "la pausa trae solo griego: " + pausa.map(function (it) { return it && it.id; }).join(","));
var s2 = Engine.load(), now = Date.now();
s2.cards[course.items[0].id] = { due: now - 1000, s: 1, d: 5, reps: 1, lapses: 0, ok: 1, last: now - 86400000, state: 2 };
var rev = Drills.buildReview(course, s2, 10, { map: Drills.itemsById(course) });
ok(rev.length >= 1 && rev[0].id === course.items[0].id, "el repaso trae las fichas del griego");

/* ------------------------------------------------ la corrección */
var it1 = { answer: "Καλημέρα!", accept: ["Καλημέρα!"] };
ok(Engine.grade("καλημέρα", it1) === "giusto", "sin mayúsculas ni signo final");
ok(Engine.grade("καλημερα", it1) === "quasi", "sin acento: casi");
ok(Engine.grade("καλήμερα", it1) === "sbagliato", "el acento en otra sílaba: mal");
ok(Engine.grade("καλημέρα".normalize("NFD"), it1) === "giusto", "acento combinado (NFD)");
var it2 = { answer: "ο φίλος", accept: ["ο φίλος"] };
ok(Engine.grade("ο φίλοσ", it2) === "giusto", "σ por ς al final: vale");
ok(Engine.grade("η φίλος", it2) === "sbagliato", "otro artículo: mal");
ok(Engine.grade("ο φιλος", it2) === "quasi", "artículo bien, sin acento: casi");
var it3 = { answer: "Τι κάνεις;", accept: ["Τι κάνεις;"] };
ok(Engine.grade("τι κάνεις?", it3) === "giusto" && Engine.grade("Τι κάνεις", it3) === "giusto", "la pregunta con «?», con «;» o sin signo");
ok(Engine.grade("Τι κάνετε;", it3) !== "giusto", "otra persona del verbo: no es «bien»");
// a sentence with a comma is one answer: its pieces are not right on their own
var it4 = { answer: "Γεια σου, τι κάνεις;", accept: ["Γεια σου, τι κάνεις;"] };
ok(Engine.grade("Γεια σου", it4) === "sbagliato", "media oración no vale por la oración");
ok(Engine.grade("ποτέ", { answer: "πότε", accept: ["πότε"] }) === "sbagliato", "πότε / ποτέ: otra palabra");
ok(Engine.grade("kalimera", it1) === "sbagliato", "en letras latinas: mal");

/* ------------------------------------------------ cómo suena */
var snd = LANG.rules.sound.of;
[["καλημέρα", "kaliméra"], ["ευχαριστώ", "efjaristó"], ["γεια", "ya"], ["ναι", "ne"], ["όχι", "óji"], ["αυτός", "aftós"],
 ["μπαμπάς", "babás"], ["πέντε", "pénde"], ["τσάι", "tsái"], ["ούζο", "úzo"], ["παιδί", "pedí"], ["Τι κάνεις;", "ti kánis?"],
 ["γυναίκα", "yinéka"], ["θάλασσα", "thálasa"], ["Ευρώπη", "evrópi"], ["μαϊμού", "maimú"], ["συγγνώμη", "signómi"]]
  .forEach(function (x) { ok(snd(x[0]) === x[1], "«" + x[0] + "» suena «" + x[1] + "» (dio «" + snd(x[0]) + "»)"); });
ok(snd("hola, María") === "hola, María", "el castellano no se toca");

/* ------------------------------------------------ el teclado físico */
var M = LANG.ui.kbMap, D = LANG.ui.kbDead;
ok("abcdefghijklmnoprstuvwxyz".split("").every(function (c) { return M[c] && /[\u0370-\u03ff;]/.test(M[c]); }), "cada tecla latina escribe su letra griega");
var rows = LANG.ui.kbRows.join("");
ok("αβγδεζηθικλμνξοπρστυφχψως".split("").every(function (c) { return rows.indexOf(c) >= 0; }), "el teclado de la app tiene las 24 letras y la sigma final");
ok(Object.keys(M).filter(function (k) { return /^[a-z]$/.test(k) && k !== "q"; }).every(function (k) { return rows.indexOf(M[k]) >= 0; }), "las teclas físicas escriben letras del teclado de la app");
ok(["ά", "έ", "ή", "ί", "ό", "ύ", "ώ"].every(function (c) { return LANG.ui.keys.indexOf(c) >= 0 && Object.keys(D.to).some(function (k) { return D.to[k] === c; }); }), "las siete vocales con acento: en la fila de arriba y con la tecla del acento");

T.done();
