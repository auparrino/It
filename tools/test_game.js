/* Controlli sul corso costruito e sulla logica di gioco.
   Run: node tools/test_game.js  */
var fs = require("fs");
var path = require("path");

var ROOT = path.join(__dirname, "..");
var Conj = require(path.join(ROOT, "docs/js/conjugator.js"));
var Engine = require(path.join(ROOT, "docs/js/engine.js"));
var Drills = require(path.join(ROOT, "docs/js/drills.js"));

var course = JSON.parse(
  fs.readFileSync(path.join(ROOT, "docs/data/course.json"), "utf8"));

var fails = 0, checks = 0;
function ok(cond, what) {
  checks++;
  if (!cond) { fails++; console.log("FAIL " + what); }
}

/* ------------------------------------------------ integrità dei dati */

ok(course.weeks.length === 52, "52 settimane");
ok(course.seasons.length === 4, "4 stagioni");

var ids = {};
course.items.forEach(function (it) {
  ok(!ids[it.id], "id duplicato: " + it.id);
  ids[it.id] = it;
  ok(!!it.answer, "item senza risposta: " + it.id);
  ok(!!it.stem, "item senza enunciato: " + it.id);
  ok(!!it.prompt, "item senza consegna: " + it.id);
  if (it.type === "choice") {
    ok(it.options && it.options.length >= 2, "poche opzioni: " + it.id);
    ok(it.options.indexOf(it.answer) >= 0, "risposta fuori opzioni: " + it.id);
  }
});

course.weeks.forEach(function (w) {
  ok(w.items.length > 0 || (w.verbs && w.verbs.length),
     "settimana " + w.week + " senza contenuto giocabile");
  w.items.forEach(function (id) {
    ok(!!ids[id], "settimana " + w.week + " punta a un item inesistente: " + id);
  });
  ok(w.keys && w.keys.length >= 3, "settimana " + w.week + " senza briefing");
  (w.verbs || []).forEach(function (v) {
    ok(Conj.VERBS[v], "settimana " + w.week + ": verbo sconosciuto " + v);
  });
  (w.tenses || []).forEach(function (t) {
    ok(Conj.TENSE_LABELS[t], "settimana " + w.week + ": tempo sconosciuto " + t);
  });
});

var chalIds = {};
course.challenges.forEach(function (c) { chalIds[c.id] = true; });
course.weeks.forEach(function (w) {
  (w.challenges || []).forEach(function (id) {
    ok(chalIds[id], "sfida inesistente: " + id);
  });
});

/* --------------------------------------------------- generazione dei round */

course.weeks.forEach(function (w) {
  var r = Drills.buildRound(course, w, { size: 12 });
  ok(r.length > 0, "round vuoto alla settimana " + w.week);
  r.forEach(function (it) {
    ok(!!it && !!it.answer, "round settimana " + w.week + ": item malformato");
    if (it.type === "choice") {
      ok(it.options.indexOf(it.answer) >= 0,
         "distrattori senza risposta, settimana " + w.week + ", " + it.id);
      var uniq = {};
      it.options.forEach(function (o) { uniq[o] = true; });
      ok(Object.keys(uniq).length === it.options.length,
         "opzioni duplicate: " + it.id);
    }
  });
});

[13, 26, 39, 52].forEach(function (n) {
  var w = course.weeks[n - 1];
  ok(w.boss === true, "la settimana " + n + " deve essere un boss");
  var b = Drills.buildBoss(course, w, Engine.blankSave());
  ok(b.length >= 20, "boss " + n + " troppo corto: " + b.length);
});

/* ---------------------------------------------- il coniugatore nei drill */

var seen = {};
for (var i = 0; i < 4000; i++) {
  var verbs = Conj.list();
  var v = verbs[i % verbs.length];
  var t = Conj.ALL_TENSES[i % Conj.ALL_TENSES.length];
  var d = Drills.conjugationDrill(v, t);
  seen[d.type] = true;
  ok(d.options.indexOf(d.answer) >= 0, "drill senza risposta: " + v + "/" + t);
  ok(d.options.length === 4, "drill con " + d.options.length + " opzioni: " + v);
  var u = {};
  d.options.forEach(function (o) { u[o] = true; });
  ok(Object.keys(u).length === 4, "drill con opzioni ripetute: " + v + "/" + t);
}

/* ----------------------------------------------------- correzione e SRS */

ok(Engine.grade("parli", { answer: "parli", accept: ["parli"] }) === "giusto",
   "risposta esatta");
ok(Engine.grade("parla", { answer: "parli", accept: ["parli"] }) === "sbagliato",
   "desinenza sbagliata non perdonata");
ok(Engine.grade("parlero", { answer: "parlerò", accept: ["parlerò"] }) === "quasi",
   "accento mancante = quasi");
ok(Engine.grade("", { answer: "parli", accept: ["parli"] }) === "sbagliato",
   "risposta vuota");
ok(Engine.grade("grandi", { answer: "grandi, buone", accept: ["grandi, buone"] })
   === "giusto", "una delle risposte valide della banca lessicale");

var card = null;
for (var k = 0; k < 5; k++) card = Engine.schedule(card, 2);
ok(card.interval > 10, "l'intervallo cresce con i successi: " + card.interval);
card = Engine.schedule(card, 0);
ok(card.interval === 0 && card.reps === 0, "l'errore riazzera la scheda");

ok(Engine.levelFor(0).level === 1, "livello iniziale");
ok(Engine.levelFor(100).level === 2, "secondo livello a 100 xp");
ok(Engine.xpFor("giusto", 5) > Engine.xpFor("giusto", 0), "il combo paga di più");
ok(Engine.xpFor("sbagliato", 9) === 0, "nessuna xp per gli errori");

/* ------------------------------------- partita simulata di un anno intero */

var state = Engine.blankSave();
var weeksCleared = 0;
course.weeks.forEach(function (w) {
  var round = w.boss ? Drills.buildBoss(course, w, state)
                     : Drills.buildRound(course, w, { size: 25 });
  var right = 0;
  round.forEach(function (it) {
    // Un giocatore che risponde sempre giusto deve poter avanzare.
    var verdict = Engine.grade(it.answer, it);
    if (verdict === "giusto") right++;
    if (it.src !== "coniugatore") {
      state.cards[it.id] = Engine.schedule(state.cards[it.id], 2);
    }
    state.totals.attempts++;
    state.totals.right++;
    state.xp += Engine.xpFor(verdict, 0);
  });
  ok(right === round.length,
     "settimana " + w.week + ": la risposta del libro deve essere accettata (" +
     right + "/" + round.length + ")");
  var ws = state.weekStats[w.week] = { attempts: round.length, right: right,
                                       bossPassed: w.boss };
  if (ws.right >= 20) weeksCleared++;
});
ok(weeksCleared === 52, "tutte le settimane superabili: " + weeksCleared);
ok(state.xp > 5000, "xp accumulata in un anno: " + state.xp);

var badges = Engine.checkBadges(state);
ok(badges.length >= 4, "medaglie sbloccate a fine anno: " + badges.length);

/* --------------------------------------------------------------- ripasso */

var review = Drills.buildReview(course, state, 20);
ok(Array.isArray(review), "la coda di ripasso è una lista");
Object.keys(state.cards).slice(0, 30).forEach(function (id) {
  state.cards[id].due = Date.now() - 1000;
});
ok(Drills.dueCount(course, state) >= 30, "le schede scadute rientrano in coda");

console.log("\ncontrolli: " + checks + "   errori: " + fails);
process.exit(fails ? 1 : 0);
