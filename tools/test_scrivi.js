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

// La llamada a Groq, con fetch simulado: elige el mejor modelo de la
// lista que devuelve la clave; saturado → otro modelo; un modelo que no
// acepta el modo JSON → el mismo sin él; clave mala → error claro; lee el
// JSON aunque venga con <think> o ```.
var GEM = [];
function gem(name, plan, check) { GEM.push([name, plan, check]); }
function runGem() {
  if (!GEM.length) return console.log("\ncontrolli: " + checks + "   errori: " + fails);
  var g = GEM.shift(), calls = [], mem = {};
  global.localStorage = { getItem: function (k) { return mem[k] || null; }, setItem: function (k, v) { mem[k] = v; } };
  global.fetch = function (url, opt) {
    if (/\/models$/.test(url)) {
      return Promise.resolve({ ok: true, status: 200, json: function () { return Promise.resolve({ data: [
        { id: "llama-3.1-8b-instant" }, { id: "openai/gpt-oss-120b" }, { id: "moonshotai/kimi-k2-instruct" },
        { id: "llama-3.3-70b-versatile" }, { id: "whisper-large-v3" }, { id: "viejo-70b", active: false }] }); } });
    }
    var body = JSON.parse(opt.body);
    calls.push(body.model + (body.response_format ? "~" : ""));
    var a = g[1](calls.length, body);
    return Promise.resolve({ ok: a.status === 200, status: a.status, json: function () { return Promise.resolve(a.body); },
                             text: function () { return Promise.resolve(JSON.stringify(a.body || {})); } });
  };
  S.explain({ prompt: "p", stem: "s", given: "a", answer: "b" }, "K", function (err, data) {
    ok(g[2](err, data, calls), "groq " + g[0] + ": " + (err ? err.message : "ok") + " · " + calls.join(" → "));
    runGem();
  });
}
function reply(txt) { return { choices: [{ message: { content: txt } }] }; }
var GOOD = reply('{"tambien_correcta":false,"explicacion":"x"}');
gem("mejor modelo primero", function () { return { status: 200, body: GOOD }; },
    function (e, d, c) { return !e && d.explicacion === "x" && c[0] === "moonshotai/kimi-k2-instruct~" && !c.some(function (m) { return /whisper|viejo/.test(m); }); });
gem("saturado", function (n) { return n === 1 ? { status: 503, body: {} } : { status: 200, body: GOOD }; },
    function (e, d, c) { return !e && c.length === 2 && c[1] === "openai/gpt-oss-120b~"; });
gem("sin modo JSON", function (n, b) { return b.response_format ? { status: 400, body: { message: "response_format not supported" } } : { status: 200, body: GOOD }; },
    function (e, d, c) { return !e && c.length === 2 && c[0] === c[1] + "~"; });
gem("clave mala", function () { return { status: 401, body: { message: "Wrong API Key" } }; },
    function (e) { return e && /clave/.test(e.message); });
gem("JSON con <think> y ```", function () { return { status: 200, body: reply('<think>mmm</think>```json\n{"tambien_correcta":true,"explicacion":"y"}\n```') }; },
    function (e, d) { return !e && d.tambien_correcta === true && d.explicacion === "y"; });
gem("pagos (402) hasta llegar al gratuito", function (n, b) { return /8b-instant/.test(b.model) ? { status: 200, body: GOOD } : { status: 402, body: { message: "payment required" } }; },
    function (e, d, c) { return !e && c.length === 4 && /llama-3\.1-8b-instant/.test(c[3]); });
gem("todo pago", function () { return { status: 402, body: {} }; },
    function (e, d, c) { return e && /plan pago/.test(e.message) && c.length === 4; });
gem("todo saturado", function () { return { status: 503, body: {} }; },
    function (e, d, c) { return e && /saturado/.test(e.message) && c.length === 4; });
runGem();
