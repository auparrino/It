/* Controlli sul tutor (Ollama) e sulla sincronizzazione, senza rete:
   fetch è finto.  Run: node tools/test_tutor.js  */
var path = require("path");
var ROOT = path.join(__dirname, "..");
var Tutor = require(path.join(ROOT, "docs/js/tutor.js"));
var Sync = require(path.join(ROOT, "docs/js/sync.js"));
var Engine = require(path.join(ROOT, "docs/js/engine.js"));

var fails = 0, checks = 0;
function ok(cond, what) { checks++; if (!cond) { fails++; console.log("FAIL " + what); } }

function resp(status, body) {
  var text = typeof body === "string" ? body : JSON.stringify(body);
  return Promise.resolve({
    ok: status >= 200 && status < 300, status: status,
    json: function () { return Promise.resolve(JSON.parse(text)); },
    text: function () { return Promise.resolve(text); }
  });
}

var week = { week: 21, level: "B1", title: "Condizionale presente",
  focus: "Cortesía, deseo y noticia no confirmada.",
  keys: ["Se forma sobre el futuro", "Vorrei, no voglio", "Cortesía"],
  lesson: { blocks: [{ h: "Formas", warn: "No confundir *-ebbe* con *-ebbero*.",
                       tip: "Pensá en el **futuro** y cambiá la desinencia." }] } };

/* ------------------------------------------------------ parseJSON */

ok(Tutor.parseJSON('{"a":1}').a === 1, "json diretto");
ok(Tutor.parseJSON('Ecco:\n```json\n{"a":2}\n```\nfine').a === 2, "json in fence");
ok(Tutor.parseJSON('bla bla {"a":3} bla').a === 3, "json in prosa");
var threw = false;
try { Tutor.parseJSON("niente"); } catch (e) { threw = true; }
ok(threw, "testo senza json lancia");

/* ------------------------------------------------------ contesto */

var ctx = Tutor.weekContext(week);
ok(ctx.indexOf("Semana 21") === 0, "contesto inizia con la settimana");
ok(ctx.indexOf("Trampa (Formas): No confundir -ebbe con -ebbero.") >= 0, "trampa senza asterischi");
ok(ctx.indexOf("Atajo") >= 0, "atajo presente");
ok(Tutor.weekContext(null) === "", "contesto vuoto senza settimana");
ok(Tutor.writingPrompt(week).indexOf("Vorrei, no voglio") >= 0, "consegna di scrittura usa le chiavi");

/* ------------------------------------------------------ pickModel */

ok(Tutor.pickModel(["nomic-embed-text", "llama3.1:8b", "qwen2.5:14b"]) === "qwen2.5:14b",
   "preferisce qwen 14b");
ok(Tutor.pickModel(["nomic-embed-text", "mistral:7b"]) === "mistral:7b", "salta gli embedding");
ok(Tutor.pickModel([]) === "", "nessun modello");
ok(Tutor.overallFrom([{ verdict: "giusto" }, { verdict: "giusto" }, { verdict: "quasi" }]) === 2,
   "overall da item");
ok(Tutor.overallFrom([{ verdict: "sbagliato" }, { verdict: "giusto" }]) === 1, "overall misto");
ok(Tutor.overallFrom([]) === 0, "overall vuoto");

/* ------------------------------------------------------ detect + chat */

var calls = [];
Tutor.saveConfig({ base: "", model: "" });

Tutor._setFetch(function (url, opts) {
  calls.push({ url: url, opts: opts });
  if (url === "/ollama/api/tags") return resp(502, { error: "no ollama" });
  if (url === "http://127.0.0.1:11434/api/tags") {
    return resp(200, { models: [{ name: "qwen2.5:14b" }, { name: "nomic-embed-text" }] });
  }
  if (/\/api\/chat$/.test(url)) {
    var body = JSON.parse(opts.body);
    calls.push({ chat: body });
    if (body.format && body.format.properties && body.format.properties.overall) {
      return resp(200, { message: { content: JSON.stringify({
        items: [{ label: "a", verdict: "giusto", corrected: "vorrei", why: "ok" },
                { label: "b", verdict: "boh", corrected: "sarebbe", why: "" }],
        overall: 7, summary: "bene" }) } });
    }
    if (body.format && body.format.properties && body.format.properties.score) {
      return resp(200, { message: { content:
        "```json\n" + JSON.stringify({ corrected: "Vorrei un caffè.", errors: [],
          score: 9, praise: "bravo", next: "ne" }) + "\n```" } });
    }
    if (body.format && body.format.properties && body.format.properties.good) {
      return resp(200, { message: { content: JSON.stringify({
        errors: [{ said: "io sono andato a mare", better: "sono andato al mare", why: "articolo" }],
        good: "fluido", summary: "ripassa gli articoli" }) } });
    }
    return resp(200, { message: { content: "  Ciao! Come stai?  " } });
  }
  return resp(404, {});
});

Tutor.detect().then(function (st) {
  ok(st.ok === true, "detect trova ollama");
  ok(st.via === "http://127.0.0.1:11434", "detect ripiega sulla porta diretta: " + st.via);
  ok(Tutor.config.model === "qwen2.5:14b", "modello scelto automaticamente");
  ok(st.models.length === 2, "lista modelli");
  return Tutor.gradeChallenge({ chapter: 21, chapterTitle: "Conditional",
    instruction: "Completa", items: [{ label: "a", text: "..." }, { label: "b", text: "..." }] },
    "a) vorrei b) sarebe", week);
}).then(function (r) {
  var sent = calls.filter(function (c) { return c.chat; }).pop().chat;
  ok(sent.model === "qwen2.5:14b", "chat usa il modello scelto");
  ok(sent.stream === false, "chat senza streaming");
  ok(JSON.stringify(sent.format) === JSON.stringify(Tutor._schemas.grade),
     "chat manda lo schema di correzione");
  ok(sent.messages[0].role === "system" && sent.messages[0].content.indexOf("Trampa") >= 0,
     "system prompt con il contesto della settimana");
  ok(sent.messages[1].content.indexOf("sarebe") >= 0, "risposta dello studente nel prompt");
  ok(r.items[1].verdict === "sbagliato", "verdetto sconosciuto diventa sbagliato");
  ok(r.overall === 2 && r.q === 2, "overall fuori scala viene limitato: " + r.overall);
  return Tutor.correctWriting("Io vorrei un caffe per favore grazie mille amico", week);
}).then(function (r) {
  ok(r.corrected === "Vorrei un caffè.", "scrittura: testo corretto dal fence");
  ok(r.q === 2 && r.score === 9, "scrittura: q da score");
  var hist = [{ role: "assistant", content: "Ciao!" }, { role: "user", content: "ciao come stai" }];
  return Tutor.companionReply(hist, week);
}).then(function (t) {
  ok(t === "Ciao! Come stai?", "compagno: risposta ripulita");
  var sent = calls.filter(function (c) { return c.chat; }).pop().chat;
  ok(sent.format === undefined, "compagno: chat libera senza schema");
  ok(sent.options.temperature === 0.7, "compagno: temperatura alta");
  ok(sent.messages[0].content.indexOf("SOLO in italiano") >= 0, "compagno: parla italiano");
  ok(sent.messages.length === 3, "compagno: storia completa");
  return Tutor.companionReport([{ role: "user", content: "io sono andato a mare" }], week);
}).then(function (r) {
  ok(r.errors.length === 1 && r.errors[0].better === "sono andato al mare", "report errori");
  ok(Tutor.companionOpen(week).indexOf("Ciao") === 0, "apertura del compagno");

  /* ------------------------------------------------------ errori HTTP */
  Tutor._setFetch(function (url) {
    if (/\/api\/chat$/.test(url)) return resp(404, { error: "model 'x' not found" });
    return resp(200, { models: [] });
  });
  return Tutor.chat([{ role: "user", content: "x" }]).then(function () {
    ok(false, "chat con 404 deve fallire");
  }, function (e) {
    ok(/not found/.test(e.message), "errore di ollama riportato: " + e.message);
  });
}).then(function () {
  /* ------------------------------------------------------ sync */
  var store = null;
  Sync._reset();
  Sync._setFetch(function (url, opts) {
    if (url !== "/progress") return resp(404, {});
    if (!opts) return store ? resp(200, store) : resp(404, { error: "no" });
    store = JSON.parse(opts.body);
    return resp(200, { ok: true });
  });
  ok(Sync.newer({ savedAt: 5 }, { savedAt: 9 }).savedAt === 9, "newer: vince il remoto recente");
  ok(Sync.newer({ savedAt: 9 }, { savedAt: 5 }).savedAt === 9, "newer: vince il locale recente");
  ok(Sync.newer({ xp: 1 }, null).xp === 1, "newer: senza remoto");
  ok(Sync.newer({}, { savedAt: 1, xp: 3 }).xp === 3, "newer: locale senza timestamp perde");
  return Sync.pull().then(function (r) {
    ok(r === null && Sync.isAvailable() === true, "pull su server vuoto: null ma disponibile");
    return Sync.pushNow({ xp: 42, savedAt: 1 });
  }).then(function (okd) {
    ok(okd === true && store.xp === 42, "pushNow scrive");
    return Sync.pull();
  }).then(function (r) {
    ok(r && r.xp === 42, "pull rilegge");
    Sync._reset();
    Sync._setFetch(function () { return Promise.reject(new Error("ECONNREFUSED")); });
    return Sync.pull();
  }).then(function (r) {
    ok(r === null && Sync.isAvailable() === false, "senza server: non disponibile");
    return Sync.pushNow({ xp: 1 });
  }).then(function (okd) {
    ok(okd === false, "push senza server non prova nemmeno");
  });
}).then(function () {
  /* ------------------------------------------------------ engine.load(given) */
  var s = Engine.load({ xp: 10, cards: {} });
  ok(s.xp === 10 && s.tutor && s.tutor.graded === 0 && s.oggiDone && s.totals,
     "load(given) completa i campi mancanti");
  var b = Engine.blankSave();
  b.tutor.writings = 5;
  var won = Engine.checkBadges(b).map(function (x) { return x.id; });
  ok(won.indexOf("scrittore") >= 0, "medaglia scrittore");
  ok(/^\d{4}-\d{1,2}-\d{1,2}$/.test(Engine.today()), "today esportato: " + Engine.today());
}).catch(function (e) {
  ok(false, "eccezione: " + (e.stack || e));
}).then(function () {
  console.log("\ncontrolli: " + checks + "   errori: " + fails);
  process.exit(fails ? 1 : 0);
});
