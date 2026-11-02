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
