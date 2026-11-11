/* La lectura guiada (docs/js/libro.js) y el role-play del alemán
 * (docs/lang/de/scrivi.js).
 *
 *   node tools/lib/test_libro.js
 *
 * - el paquete se valida (sin app, sin tramos, sin oraciones: error);
 * - los ids de un tramo salen en orden y saltean los títulos;
 * - las pantallas se dibujan en node con un paquete de prueba y la
 *   oración actual queda marcada; el núcleo no nombra un idioma;
 * - el alemán tiene role-play: Scrivi.parlaStart y los prompts piden los
 *   campos que lee app.js, sin tareas de escritura (TASKS vacío). */
"use strict";
var fs = require("fs"), path = require("path");
var T = require("./testkit.js")("lib"), ok = T.ok;
var ROOT = path.join(__dirname, "..", "..");
var L = require(path.join(ROOT, "docs/js/libro.js"));

var SRC = fs.readFileSync(path.join(ROOT, "docs/js/libro.js"), "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
ok(!/italian|portugu|alem[aá]n|deutsch|La Via|Rumo C1|Weg C1/i.test(SRC), "libro.js no nombra ningún idioma");

var pack = { app: "c1-libro", v: 1, id: "prueba", lang: "xx", title: "Prueba", author: "Nadie",
  parts: [{ t: "Primera parte", tr: [0] }],
  tramos: [{ id: "c001", part: "Primera parte", p: [{ h: "Capítulo 1" }, ["s1", "s2"], ["s3"]],
             resumen: "Pasa algo.", contexto: "", vocab: [["Tor (das)", "portón"]],
             gramatica: [{ t: "Verbo al final", x: "Así *va*.", ej: ["s2"] }], preguntas: [{ q: "¿Qué pasa?", a: "Algo." }] }],
  s: { s1: { t: "Eins.", es: "Uno." }, s2: { t: "Zwei <b>.", es: "Dos.", g: [["zwei", "dos"]], n: "Nota *x*." }, s3: { t: "Drei.", es: "Tres.", std: "Drei." } } };
ok(L.validate(pack) === "", "un paquete bueno pasa");
ok(L.validate({}) !== "" && L.validate(Object.assign({}, pack, { tramos: [] })) !== "" && L.validate(Object.assign({}, pack, { s: null })) !== "", "uno roto no pasa");
ok(L.ids(pack.tramos[0]).join() === "s1,s2,s3", "los ids del tramo, en orden y sin títulos");
var st = {};
ok(L.progress(st, "prueba").t === 0 && st.libros.prueba && L.doneCount(st, pack) === 0, "el avance arranca en el tramo 1");

// las pantallas, con un host mínimo (sin DOM)
global.LANG = { code: "xx", tts: "xx-XX" };
var view = { screen: "guiada-tramo", tab: "io" };
L.init({ state: function () { return st; }, view: function () { return view; }, persist: function () {}, render: function () {},
         go: function () {}, show: function () {}, toast: function () {}, speak: function () {}, gain: function () {},
         ui: function () { return { me: "Ich" }; },
         esc: function (s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); } });
ok(L.owns("guiada") && L.owns("guiada-tramo") && !L.owns("io"), "owns: sus pantallas y ninguna otra");
ok(/Abriendo/.test(L.render("guiada")), "sin el paquete en memoria, espera");
ok(/Cargar|\.json/.test(L.render("guiada-shelf")), "el estante pide el archivo");
var sb = L.render("guiada-shelf");
ok(sb.indexOf('type="file"') > 0, "el estante tiene el selector de archivo");

// la lectura del día: cada oración cuenta una vez, la meta se avisa una vez, y el desafío sale de lo leído
(function () {
  var S = {}, big = { app: "c1-libro", v: 1, id: "largo", lang: "xx", title: "Largo", tramos: [{ id: "t1", part: "", p: [[]] }, { id: "t2", part: "", p: [[]] }], s: {} };
  var forms = ["monaco", "abbazia", "biblioteca", "manoscritto", "labirinto", "veleno", "campana", "novizio", "abate", "torre", "notte", "segreto", "libro", "pietra"];
  for (var k = 0; k < 14; k++) {
    var id = "x" + k;
    big.tramos[0].p[0].push(id);
    big.s[id] = { t: "Nella grande storia il " + forms[k] + " resta in silenzio per sempre.", es: "En la gran historia el " + k + " queda en silencio.", g: [[forms[k], "glosa " + k]] };
  }
  big.tramos[1].p[0].push("y0"); big.s.y0 = { t: "Fine.", es: "Fin." };
  var pr = L.progress(S, "largo"), NOW = Date.parse("2026-11-11T12:00:00");
  ok(L.META >= 8 && L.META <= 15, "la meta del día es un rato corto (" + L.META + " oraciones)");
  var hit = false;
  for (var i = 0; i < L.META - 1; i++) { hit = L.noteRead(pr, big, i, i + 1, NOW) || hit; pr.i = i + 1; }
  ok(!hit && pr.day.n === L.META - 1, "antes de la meta no avisa");
  ok(L.noteRead(pr, big, L.META - 1, L.META, NOW) === true, "al llegar a la meta, avisa");
  pr.i = L.META;
  ok(L.noteRead(pr, big, L.META, L.META + 1, NOW) === false && pr.day.n === L.META + 1, "y no vuelve a avisar ese día");
  var n0 = pr.day.n;
  L.noteRead(pr, big, 3, 4, NOW);
  ok(pr.day.n === n0, "volver atrás y pasar de nuevo no cuenta dos veces");
  var S2 = {}, pr2 = L.progress(S2, "largo");
  L.noteRead(pr2, big, 0, 12, NOW);
  ok(!pr2.day || pr2.day.n === 0, "saltar lejos tocando una oración no cuenta como leer lo del medio");
  ok(pr.day.w > 0 && pr.total === pr.day.n, "cuenta palabras y el total leído");
  pr.i = L.META + 1;
  ok(L.noteRead(pr, big, pr.i, pr.i + 1, NOW + 86400000) === false && pr.day.n === 1, "al otro día la cuenta empieza de nuevo");
  pr.t = 1; pr.i = 0;
  ok(L.bookPct(big, pr) === 93, "el avance en el libro, por oraciones (14 de 15)");
  pr.t = 0; pr.day = { d: "x", n: 10, w: 90, ids: big.tramos[0].p[0].slice(0, 10) };
  var seq = 7, rnd = function () { seq = (seq * 9301 + 49297) % 233280; return seq / 233280; };
  var items = L.reto(big, pr, rnd);
  ok(items.length === 5, "el desafío: cinco preguntas con lo leído hoy (" + items.length + ")");
  ok(items.every(function (x) { return x.src === "lettura" && x.nocard && x.options.length === 4 && x.options.indexOf(x.answer) >= 0; }), "con cuatro opciones, la buena entre ellas, y sin crear fichas de repaso");
  ok(items.every(function (x) { return /___/.test(x.stem) && x.stem.toLowerCase().indexOf(x.answer.toLowerCase()) < 0 && /En castellano: «/.test(x.prompt); }), "la oración va en pantalla con el hueco y su traducción: se contesta entendiendo, no de memoria");
  ok(new Set(items.map(function (x) { return x.id; })).size === 5, "una pregunta por oración");
  pr.day.ids = ["x0", "x1"];
  ok(L.reto(big, pr, rnd).length === 0, "con muy poco leído no hay desafío (faltarían opciones)");
})();

// la pantalla de lectura: directo al texto, sin pestañas arriba, botones con nombre
ok(/ui\.step = 1;\s*\/\/ straight to the text/.test(fs.readFileSync(path.join(ROOT, "docs/js/libro.js"), "utf8")), "abrir un tramo lleva directo al texto");
ok(/🔊 Escuchar/.test(SRC) && /Tapar ayuda/.test(SRC) && /Ver ayuda/.test(SRC), "los botones de la explicación dicen qué hacen");
ok(/function placeSheet/.test(SRC) && /insertBefore\(sh, cur\.nextSibling\)/.test(SRC), "en el celular la explicación va debajo de su oración, no encima del texto");
ok(!/classList\.toggle\("lb-sheet-open"/.test(SRC), "y ya no se reserva media pantalla para una hoja fija");

// el role-play del alemán
var S = require(path.join(ROOT, "docs/lang/de/scrivi.js"));
ok(typeof S.parlaStart === "function" && typeof S.parlaTurn === "function" && typeof S.parlaReview === "function" && typeof S.parlaGoals === "function",
   "de: el role-play tiene parlaStart, parlaTurn, parlaReview y parlaGoals");
ok(S.TASKS && !Object.keys(S.TASKS).length && !S.check, "de: sin tareas de escritura ni corrector de reglas (todavía)");
var ctx = { level: "A2", week: 12, fare: "Contar el fin de semana", tema: "Perfekt", tenses: "", maxWords: 14, words: ["Wochenende"] };
var sp = S.parlaScenarioPrompt(ctx);
ok(/"titolo"/.test(sp) && /"obiettivi"/.test(sp) && /"apertura"/.test(sp) && /alem[aá]n/.test(sp) && /Perfekt/.test(sp), "de: el prompt de la escena pide los campos de app.js y los tiempos del nivel");
var scen = { ruolo_ia: "Bäcker", situazione_es: "Comprás pan.", obiettivi: ["pedir", "preguntar", "pagar"] };
var ch = S.parlaTurnChat(scen, [["ia", "Guten Tag!"]], "Ich möchte Brot.", ctx, [1]);
ok(ch.system && /"risposta"/.test(ch.system) && ch.messages[ch.messages.length - 1].content.indexOf("Ich möchte Brot.") >= 0, "de: el turno va como chat con el formato de respuesta");
ok(/"frasi"/.test(S.parlaReviewPrompt(scen, [["ia", "Hallo"], ["me", "Ich habe gegeht."]])), "de: la revisión final pide frasi");

// el núcleo carga libro.js antes de app.js; el alemán carga su scrivi.js
var Boot = require(path.join(ROOT, "docs/js/boot.js"));
var ord = Boot.ORDER.map(function (e) { return e.core || e.lang; });
ok(ord.indexOf("libro.js") >= 0 && ord.indexOf("libro.js") < ord.indexOf("app.js"), "ORDER: libro.js antes de app.js");
ok(Boot.langFiles("de").indexOf("lang/de/scrivi.js") >= 0, "de: scrivi.js está en el paquete");

T.done("lectura guiada y role-play del alemán   ");
