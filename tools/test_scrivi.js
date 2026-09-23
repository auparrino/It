/* Scrivi: cada texto modelo cumple su consigna y el corrector no le marca
   nada; los errores típicos escritos a mano sí se marcan, con su categoría.
   Run: node tools/test_scrivi.js  */
var fs = require("fs");
var path = require("path");
var ROOT = path.join(__dirname, "..");
global.Conj = require(path.join(ROOT, "docs/js/conjugator.js"));
global.Diagnosi = require(path.join(ROOT, "docs/js/diagnosi.js"));
var Banca = require(path.join(ROOT, "docs/js/banca.js"));
Banca.load(JSON.parse(fs.readFileSync(path.join(ROOT, "docs/data/bank.json"), "utf8")));
var S = require(path.join(ROOT, "docs/js/scrivi.js"));
var Frasi = require(path.join(ROOT, "docs/js/frasi.js"));
var Letture = require(path.join(ROOT, "docs/js/letture.js"));
S.learnCourse({ items: JSON.parse(fs.readFileSync(path.join(ROOT, "docs/data/course.json"), "utf8")).items,
  bank: Banca.bank(), phrases: Frasi.ALL, readings: Letture.EPISODI,
  glossario: JSON.parse(fs.readFileSync(path.join(ROOT, "docs/data/glossario.json"), "utf8")) });

var fails = 0, checks = 0, verbose = process.argv.indexOf("-v") >= 0;
function ok(c, what) { checks++; if (!c) { fails++; console.log("FAIL " + what); } }

S.weeks().forEach(function (w) {
  var t = S.TASKS[w], r = S.check(t.model, w);
  r.reqs.forEach(function (q) { ok(q.ok, "semana " + w + ": el modelo no cumple «" + q.label + "» (" + q.n + "/" + q.need + ")"); });
  var hard = r.findings.filter(function (f) { return !f.soft; });
  ok(!hard.length, "semana " + w + ": el modelo tiene errores marcados: " + hard.map(function (f) { return f.msg; }).join(" | "));
  if (verbose && r.findings.length) console.log("  sem " + w + " notas: " + r.findings.map(function (f) { return f.msg; }).join(" | "));
});

// [texto, semana, categoría esperada]
var ERR = [
  ["Ieri ho andato al cinema con Marco.", 11, "ausiliare"],
  ["Stamattina mi ho lavato in fretta.", 16, "ausiliare"],
  ["Ho conosciuto a Giulia in vacanza.", 11, "a_personale"],
  ["Il mio padre lavora in banca.", 17, "articolo_possessivo"],
  ["Mio libro è sul tavolo.", 17, "articolo_possessivo"],
  ["Vado a il cinema stasera.", 9, "preposizione_articolata"],
  ["Se avrei tempo, verrei con te.", 33, "periodo_ipotetico"],
  ["Penso che è troppo tardi.", 25, "congiuntivo"],
  ["Ho molto amici a Roma.", 17, "accordo"],
  ["C'è due gatti in giardino.", 9, "ci_ne"],
  ["Lui e alto e simpatico.", 4, "accento"],
  ["Sono trenta anni che vivo qui.", 5, null],
  ["Ho trenta anni e sono muy contento.", 5, "parola_spagnola"],
  ["Il studente è bravo.", 3, "articolo"],
  ["La problema è grande.", 3, "genere"],
  ["Mio nono è simpatico e la citta è bella.", 4, "accento"],
  ["Ho due fratelli y una sorella.", 2, "parola_spagnola"]
];
ERR.forEach(function (e) {
  var f = S.lint(e[0], e[1]).filter(function (x) { return !x.soft; });
  if (e[2]) ok(f.some(function (x) { return x.cat === e[2]; }), "«" + e[0] + "» debería marcar " + e[2] + " (marca: " + f.map(function (x) { return x.cat; }).join(", ") + ")");
});
// El texto de la captura del usuario: cinco errores, los cinco marcados.
(function () {
  var f = S.lint("Ciao. Mi chiami Augusto. Hanno 32 anne e siamo argentino. Sono felici a Buenos Aires. Ciao!", 1).filter(function (x) { return !x.soft; });
  var cats = f.map(function (x) { return x.cat; });
  ok(f.length >= 5 && cats.filter(function (c) { return c === "persona_verbale"; }).length >= 3 &&
     cats.indexOf("plurale") >= 0 && cats.indexOf("accordo") >= 0, "presentación con cinco errores: marca " + cats.join(", "));
})();
// Plural en castellano: la palabra italiana, ya en plural.
(function () {
  var m = S.lint("Ho 32 annos e due gatos. Mi piacciono los libros.", 1).map(function (x) { return x.msg; }).join(" | ");
  ok(/anni/.test(m) && /gatti/.test(m) && /libri/.test(m), "plurales en castellano con su traducción: " + m);
})();
// frases correctas que no se marcan
["Mi ha detto che viene domani.", "Ci abbiamo pensato a lungo.", "Mi chiedo se sarebbe d'accordo.", "La mia mamma è qui.",
 "Il loro padre è medico.", "Conosco Giulia da anni.", "Vado da Marco a piedi.", "Credo che sia vero.",
 "Questo libro è mio.", "Ho trent'anni.", "Lui è alto.", "Mi piacciono i film. Marco e Anna sono felici.",
 "Siamo in tre: io, Marco e Anna.", "Mi chiami domani? Io sono stanco.", "Arrivo il tredici maggio.",
 "Sono di Roma. Hai vent'anni? Mia sorella è simpatica e i miei genitori sono contenti."].forEach(function (t) {
  var f = S.lint(t, 52).filter(function (x) { return !x.soft; });
  ok(!f.length, "«" + t + "» no debería marcar nada: " + f.map(function (x) { return x.msg; }).join(" | "));
});

console.log("\ncontrolli: " + checks + "   errori: " + fails);
