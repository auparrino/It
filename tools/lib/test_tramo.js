/* Tramo C1 (js/tramo.js, lang/<código>/tramo_data.js): cada semana de la 27
   a la 51 (sin la 39) tiene lectura larga, escucha larga y tarea con los
   largos que suben semana a semana; los datos generados están al día con
   tools/<código>/tramo/; la revisión local acepta los modelos y rechaza el
   relleno, el texto copiado de la fuente y lo que no llega al mínimo.
   Run: node tools/lib/test_tramo.js */
"use strict";
var fs = require("fs"), path = require("path");
var pack = require("./pack.js");
var LANG = null, bad = 0, checks = 0;
function err(f, m) { bad++; console.log("✗ " + f + ": " + m); }
function ok(cond, m) { checks++; if (!cond) err(LANG, m); }
const WEEKS = [27,28,29,30,31,32,33,34,35,36,37,38,40,41,42,43,44,45,46,47,48,49,50,51];
function idx(w) { return WEEKS.indexOf(w); }
function lerp(a, b, w) { return Math.round(a + (b - a) * idx(w) / (WEEKS.length - 1)); }
const TARGET = {
  read: (w) => lerp(350, 900, w),     // words of the long reading
  listen: (w) => lerp(250, 600, w),   // words of the listening script
  min: (w) => lerp(120, 250, w)       // minimum words of the task
};
const GENRES = {
  it: ["lettera_formale", "email_informale", "lettera_lettore", "articolo", "recensione", "saggio", "sintesi", "relazione"],
  pt: ["carta_formal", "email_informal", "carta_leitor", "artigo", "resenha", "texto_opiniao", "resumo", "relato"]
};
const VF = { it: ["vero", "falso", "non si dice"], pt: ["verdadeiro", "falso", "não se diz"] };
function words(s) { return String(s).split(/\s+/).filter((x) => /[A-Za-zÀ-ÿ]/.test(x)).length; }
function bare(t) { return t.toLowerCase().replace(/^[^a-zà-öø-ÿ]+/, "").replace(/[^a-zà-öø-ÿ']+$/, "").replace(/'$/, ""); }
function toks(s) { return String(s).split(/\s+/).map(bare).filter(Boolean); }
function hasTok(text, w) {
  const all = toks(text);
  return all.some((t) => t === w || t.slice(t.lastIndexOf("'") + 1) === w);
}

function checkQs(f, where, qs, n, vfs, nvf) {
  if (!Array.isArray(qs) || qs.length < n) err(f, where + ": hacen falta " + n + " preguntas");
  let longest = 0;
  (qs || []).forEach((q, i) => {
    if (!Array.isArray(q) || q.length !== 3 || !Array.isArray(q[1])) return err(f, where + " q" + i + ": forma [pregunta, [opciones], respuesta]");
    if (q[1].length !== 4) err(f, where + " q" + i + ": cuatro opciones");
    if (q[1].indexOf(q[2]) < 0) err(f, where + " q" + i + ": la respuesta no está entre las opciones");
    if (new Set(q[1]).size !== q[1].length) err(f, where + " q" + i + ": opciones repetidas");
    const L = q[1].map((o) => o.length), max = Math.max.apply(null, L);
    if (q[2].length === max && L.filter((x) => x === max).length === 1) longest++;
  });
  if (qs && qs.length && longest > Math.ceil(qs.length * 0.4)) err(f, where + ": la correcta es la opción más larga en " + longest + " de " + qs.length);
  if (!Array.isArray(vfs) || vfs.length < nvf) err(f, where + ": hacen falta " + nvf + " afirmaciones vf");
  const kinds = new Set();
  (vfs || []).forEach((v, i) => {
    if (VF[LANG].indexOf(v[1]) < 0) err(f, where + " vf" + i + ": la respuesta tiene que ser " + VF[LANG].join(" / "));
    kinds.add(v[1]);
  });
  if (vfs && kinds.size < 3) err(f, where + ": las vf tienen que usar las tres respuestas");
}
function validate(f, d) {
  const w = d.week;
  if (idx(w) < 0) return err(f, "semana fuera del tramo (27-51 sin la 39)");
  const L = d.lettura || {}, A = d.ascolto || {}, C = d.compito || {};
  ["title", "emoji", "genre", "grammar", "text"].forEach((k) => { if (!L[k]) err(f, "lettura." + k + " falta"); });
  const rw = words(L.text || ""), rt = TARGET.read(w);
  if (rw < rt * 0.9 || rw > rt * 1.2) err(f, "lettura: " + rw + " palabras; para la semana " + w + " van " + Math.round(rt * 0.9) + "-" + Math.round(rt * 1.2));
  if ((L.text || "").split(/\n+/).length < 4) err(f, "lettura: al menos 4 párrafos (separados por \\n\\n)");
  checkQs(f, "lettura", L.questions, 5, L.vf, 5);
  const g = L.gloss || {};
  if (Object.keys(g).length < 15) err(f, "lettura.gloss: al menos 15 palabras");
  Object.keys(g).forEach((k) => { if (k !== k.toLowerCase() || !hasTok(L.text || "", k)) err(f, "lettura.gloss «" + k + "» no está tal cual (minúscula) en el texto"); });
  if (!L.hunt || !L.hunt.label || !(L.hunt.targets || []).length) err(f, "lettura.hunt falta");
  else L.hunt.targets.forEach((t) => { if (t !== t.toLowerCase() || !hasTok(L.text, t)) err(f, "hunt «" + t + "» no está tal cual en el texto"); });
  ["title", "genre", "es"].forEach((k) => { if (!A[k]) err(f, "ascolto." + k + " falta"); });
  if (!Array.isArray(A.speakers) || A.speakers.length !== 2) err(f, "ascolto.speakers: dos nombres");
  if (!Array.isArray(A.turns) || A.turns.length < 6) err(f, "ascolto.turns: al menos 6 turnos");
  else A.turns.forEach((t, i) => { if (!Array.isArray(t) || (t[0] !== "A" && t[0] !== "B") || !t[1]) err(f, "ascolto.turns[" + i + "]: [\"A\"|\"B\", texto]"); });
  const aw = words((A.turns || []).map((t) => t[1]).join(" ")), at = TARGET.listen(w);
  if (aw < at * 0.9 || aw > at * 1.25) err(f, "ascolto: " + aw + " palabras; para la semana " + w + " van " + Math.round(at * 0.9) + "-" + Math.round(at * 1.25));
  checkQs(f, "ascolto", A.questions, 5, A.vf, 4);
  const at2 = (A.turns || []).map((t) => t[1]).join(" ");
  Object.keys(A.gloss || {}).forEach((k) => { if (!hasTok(at2, k)) err(f, "ascolto.gloss «" + k + "» no está en el audio"); });
  if (GENRES[LANG].indexOf(C.genre) < 0) err(f, "compito.genre: uno de " + GENRES[LANG].join(", "));
  ["title", "t", "es", "fonte", "model"].forEach((k) => { if (!C[k]) err(f, "compito." + k + " falta"); });
  if (["lettura", "ascolto", "entrambi"].indexOf(C.fonte) < 0) err(f, "compito.fonte: lettura | ascolto | entrambi");
  const mt = TARGET.min(w);
  if (C.min !== mt) err(f, "compito.min tiene que ser " + mt);
  if (C.max !== mt + 60) err(f, "compito.max tiene que ser " + (mt + 60));
  const mw = words(C.model || "");
  if (mw < mt || mw > mt + 60) err(f, "compito.model: " + mw + " palabras; tiene que estar entre min y max");
  if (!Array.isArray(C.punti) || C.punti.length < 3 || C.punti.length > 5) err(f, "compito.punti: de 3 a 5");
  (C.punti || []).forEach((p, i) => {
    if (!Array.isArray(p) || typeof p[0] !== "string" || !Array.isArray(p[1]) || !p[1].length) return err(f, "punti[" + i + "]: [descripción, [claves]]");
    const m = String(C.model).toLowerCase();
    if (!p[1].some((k) => m.indexOf(k.toLowerCase()) >= 0)) err(f, "punti[" + i + "]: el modelo no contiene ninguna de sus claves");
  });
  return { rw: rw, aw: aw, mw: mw };
}

["it", "pt"].forEach(function (code) {
  LANG = code;
  var dir = path.join(pack.ROOT, "tools", code, "tramo");
  var files = fs.readdirSync(dir).filter(function (f) { return /^w\d\d\.json$/.test(f); }).sort();
  var got = files.map(function (f) { var d = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")); validate(code + "/" + f, d); return d.week; });
  ok(JSON.stringify(got) === JSON.stringify(WEEKS), "hacen falta las 24 semanas 27-51 sin la 39; hay: " + got.join(", "));
  // the generated file is up to date
  var gen = fs.readFileSync(path.join(pack.DOCS, "lang", code, "tramo_data.js"), "utf8");
  var before = gen;
  require("child_process").execFileSync(process.execPath, [path.join(__dirname, "build_tramo.js"), code]);
  var after = fs.readFileSync(path.join(pack.DOCS, "lang", code, "tramo_data.js"), "utf8");
  ok(before === after, "docs/lang/" + code + "/tramo_data.js no está al día: corré npm run build");

  var ctx = pack(code), T = ctx.Tramo, L = ctx.Letture, S = ctx.Scrivi;
  ctx.Banca.load(pack.data(code, "bank.json"));
  S.learnCourse({ items: pack.data(code, "course.json").items, bank: ctx.Banca.bank(), phrases: ctx.Frasi.ALL,
                  readings: L.EPISODI, glossario: pack.data(code, "glossario.json") });
  T.attach({ esc: function (s) { return String(s); }, langName: function () { return code; }, state: function () { return {}; } });
  ok(L.SERIES.some(function (s) { return s.id === "lunga"; }), "la serie «lunga» no está en Letture.SERIES");
  var course = pack.data(code, "course.json");
  WEEKS.forEach(function (w) {
    var s = T.week(w);
    if (!s) return;
    var ep = L.byId("l-" + w);
    ok(ep && ep.series === "lunga" && ep.week === w, "semana " + w + ": falta la lectura larga en Letture");
    ok(L.session(ep).length === s.lettura.questions.length + s.lettura.vf.length + 1, "semana " + w + ": la sesión de lectura no trae todas las preguntas");
    var ms = T.missions(course.weeks[w - 1], {});
    ok(ms.length === 2 && ms.every(function (m) { return !m.done && !m.opt; }), "semana " + w + ": las misiones de escucha y tarea");
    var r = T.evaluate(s.compito, s.compito.model, w, s);
    ok(r.ok, "semana " + w + ": el modelo no pasa la revisión: " + r.crit.filter(function (c) { return !c.ok; }).map(function (c) { return c.label; }).join(" | "));
    var hard = r.check.findings.filter(function (f) { return !f.soft; });
    ok(hard.length <= 1, "semana " + w + ": el corrector marca " + hard.length + " errores en el modelo: " + hard.map(function (f) { return f.msg; }).join(" | "));
    var copy = s.lettura.text.split(/\s+/).slice(0, s.compito.min + 10).join(" ");
    ok(!T.evaluate(s.compito, copy, w, s).ok, "semana " + w + ": copiar la lectura pasa la revisión");
    var junk = Array(s.compito.min + 5).fill(s.compito.punti.map(function (p) { return p[1][0]; }).join(" ")).join(" ").split(" ").slice(0, s.compito.min + 5).join(" ");
    ok(!T.evaluate(s.compito, junk, w, s).ok, "semana " + w + ": una lista de palabras clave repetida pasa la revisión");
    ok(!T.evaluate(s.compito, s.compito.model.split(/\s+/).slice(0, Math.floor(s.compito.min * 0.7)).join(" "), w, s).ok,
       "semana " + w + ": un texto corto pasa la revisión");
  });
  // what the AI answers is taken only in the expected shape
  ok(T.readAI({ punteggi: { a: 4, b: "5", c: 9 }, errori: [["x", "y"], "z"], commento: 3 }).tot === 14, "readAI suma y recorta");
  ok(T.readAI({ punteggi: "bien" }) === null, "readAI descarta lo que no tiene forma");
});
console.log(bad ? "✗ test_tramo: " + bad + " problemas" : "✓ test_tramo: " + checks + " controles");
process.exit(bad ? 1 : 0);
