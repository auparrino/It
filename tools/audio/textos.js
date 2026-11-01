/*
 * Los textos que la app lee en voz alta en el curso de un idioma, para que
 * tools/audio/grabar.py los grabe con Piper (una frase suelta: sin lugar).
 *
 *   node tools/audio/textos.js de      → JSON: ["Ich heiße Anna.", …]
 *
 * Sigue lo que hace app.js:
 *   - después de responder (showFeedback, «spoken»): la frase con los huecos
 *     completos, la respuesta, o la consigna cuando la respuesta es
 *     castellano; nunca un texto en castellano (spanishText);
 *   - los ejemplos de la lección (b.ex, «¿Qué notás?», la columna «ejemplo»
 *     de las tablas: sayIndex), con «A → B» leído como «A, B»;
 *   - las palabras de la semana y su ejemplo (la frase del día, el repaso).
 * Si app.js cambia lo que lee, cambiar esto también: lo que no esté grabado
 * suena con la voz del teléfono, así que un desfase no rompe nada.
 */
"use strict";
var pack = require("../lib/pack.js");

var code = process.argv[2] || "de";
var ctx = pack(code, { upTo: "app.js" });
var LG = ctx.LANG, SP = LG.spanish || {}, strip = ctx.Lezione.strip;
var course = pack.data(code, "course.json");
var glossario = null;
try { glossario = pack.data(code, "glossario.json"); } catch (e) { /* el alemán todavía no tiene */ }

// ---- spanishText / asksMeaning / filledStem: los de app.js
function wordSet(s) { var o = {}; String(s || "").split(" ").forEach(function (w) { if (w) o[w] = 1; }); return o; }
var ES = wordSet(SP.es), TG = wordSet(SP.target), BOTH = wordSet(SP.both), esGloss = null;
function spanishText(text) {
  text = String(text || "");
  if (SP.sure && SP.sure.test(text)) return true;
  if (SP.notEs && SP.notEs.test(text)) return false;
  if (!esGloss && glossario) {
    esGloss = {};
    Object.keys(glossario).forEach(function (k) {
      String(glossario[k][1] || "").toLowerCase().split(/[^a-zñáéíóúü]+/).forEach(function (w) { if (w) esGloss[w] = 1; });
    });
  }
  var es = 0, tg = 0;
  (text.toLowerCase().match(SP.word || /[a-zà-ÿ]+/g) || []).forEach(function (w) {
    if (BOTH[w]) return;
    var isTg = TG[w] || (glossario && glossario[w]), isEs = ES[w] || (esGloss && esGloss[w]);
    if (ES[w] || (isEs && !isTg)) es++;
    else if (isTg && !isEs) tg++;
    else if (!isTg && !isEs && SP.unknownEs && SP.unknownEs.test(w)) es++;
  });
  return es > tg;
}
function asksMeaning(it) {
  return /¿\s*qu[ée] (significa|es|son|expresa|quiere decir)\b/i.test(it.prompt || "") &&
    !(SP.askTarget && SP.askTarget.test(it.prompt || ""));
}
function filledStem(it) {
  var stem = String(it.stem || "");
  if (!/_{3,}/.test(stem)) return null;
  if (stem.indexOf("→") >= 0) stem = stem.slice(stem.lastIndexOf("→") + 1);
  var answers = String(it.answer || "").split(/\s*\|\s*/).map(function (a) {
    return /^\(.*\)$/.test(a.trim()) ? "" : a.trim();
  });
  var k = 0;
  var out = stem.replace(/\([^)]*\)/g, " ").replace(/_{3,}/g, function () {
    var a = answers[k++] || "";
    var gl = LG.glue ? LG.glue(a) : null;
    return gl === "next" ? a + "\u0000" : gl === "prev" ? "\u0001" + a : a;
  });
  return out.replace(/\u0000\s*/g, "").replace(/\s*\u0001/g, "").replace(/\s+([,.;:!?])/g, "$1").replace(/\s+/g, " ").trim();
}
var SAY_TYPES = { coppia: 1, conta: 1, scegli: 1, intonazione: 1, accento: 1, forma: 1 };
function spoken(it) {
  var s = it.dir === "it-es" || it.type === "scopri" ? it.stem : filledStem(it) || it.answer;
  if (SAY_TYPES[it.type] || it.dettato) s = it.say;
  if (it.lab === "falsi" || it.lab === "capire") s = it.stem;
  if (spanishText(s) || (s === it.answer && asksMeaning(it))) s = it.stem && !/_{3,}/.test(it.stem) && !spanishText(it.stem) ? it.stem : "";
  return s;
}

var out = [], seen = {};
function add(t) {
  t = String(t == null ? "" : t).replace(/_+/g, " ").replace(/\s+/g, " ").trim();
  // «vasa», «ich (yo)»: pistas de pronunciación o glosas, no frases del idioma
  if (!t || seen[t] || !/[A-Za-zÀ-ÿß0-9]/.test(t) || /[«»()]/.test(t) || spanishText(t)) return;
  seen[t] = 1;
  out.push(t);
}

(course.items || []).forEach(function (it) {
  if (it.type === "listen" || it.type === "dictation") return;      // grabar.py ya los junta
  add(spoken(it));
});
(course.weeks || []).forEach(function (w) {
  (w.vocab || []).forEach(function (v) { add(v[0]); add(v[2]); });
  var les = w.lesson || {};
  (les.blocks || []).forEach(function (b) {
    (b.ex || []).forEach(function (p) { add(strip(p[0]).replace(/\s*→\s*/g, ", ")); add(strip(p[0])); });
    var t = b.table, col = -1;
    if (t) {
      (t.head || []).forEach(function (h, k) { if (col < 0 && /ejemplo/i.test(strip(h))) col = k; });
      if (col >= 0) (t.rows || []).forEach(function (r) { if (r[col]) add(strip(r[col])); });
    }
  });
});
process.stdout.write(JSON.stringify(out));
