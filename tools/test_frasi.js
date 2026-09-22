/* Controlli sul banco di frasi e sulle meccaniche d'aggancio
   (obiettivo del giorno, scudi della serie, forziere, pausa, lampo).
   Run: node tools/test_frasi.js  */
var fs = require("fs");
var path = require("path");

var ROOT = path.join(__dirname, "..");
var Frasi = require(path.join(ROOT, "docs/js/frasi.js"));
var Engine = require(path.join(ROOT, "docs/js/engine.js"));
var Drills = require(path.join(ROOT, "docs/js/drills.js"));
var course = JSON.parse(
  fs.readFileSync(path.join(ROOT, "docs/data/course.json"), "utf8"));

var fails = 0, checks = 0;
function ok(cond, what) {
  checks++;
  if (!cond) { fails++; console.log("FAIL " + what); }
}
function uniq(a) {
  var m = {};
  a.forEach(function (x) { m[x] = true; });
  return Object.keys(m).length === a.length;
}

/* ---------------------------------------------------------- il banco */

ok(Frasi.SCENES.length >= 12, "almeno 12 scene");
ok(Frasi.ALL.length >= 200, "almeno 200 frasi: " + Frasi.ALL.length);
ok(uniq(Frasi.ALL.map(function (f) { return f.id; })), "id di frase unici");
ok(uniq(Frasi.ALL.map(function (f) { return f.it; })), "nessuna frase italiana ripetuta");
ok(uniq(Frasi.SCENES.map(function (s) { return s.id; })), "id di scena unici");
Frasi.ALL.forEach(function (f) {
  ok(f.it && f.es, "frase incompleta: " + f.id);
  ok(Frasi.words(f.it).length >= 1, "frase senza parole: " + f.id);
  ok(!/\s{2}/.test(f.it), "spazi doppi: " + f.id);
});
Frasi.SCENES.forEach(function (s) {
  ok(Frasi.ofScene(s.id).length >= 12, "scena corta: " + s.id);
});

/* ------------------------------------------------------ gli esercizi */

Frasi.ALL.forEach(function (f) {
  for (var r = 0; r < 3; r++) {
    var t = Frasi.tilesItem(f);
    // Le tessere giuste, nell'ordine giusto, danno la frase.
    var own = Frasi.tiles(f.it);
    var pool = t.tiles.slice();
    var allThere = own.every(function (w) {
      var k = pool.indexOf(w);
      if (k < 0) return false;
      pool.splice(k, 1);
      return true;
    });
    ok(allThere, "tessere mancanti: " + f.id);
    ok(Frasi.words(own.join(" ")).join(" ") === Frasi.words(f.it).join(" "),
       "le tessere ricompongono la frase: " + f.id);
    ok(t.tiles.length <= own.length + 3, "troppe tessere: " + f.id);

    var l = Frasi.listenItem(f);
    ok(l.options.indexOf(f.es) >= 0, "ascolto senza risposta: " + f.id);
    ok(uniq(l.options), "ascolto con opzioni doppie: " + f.id);
    ok(l.options.length === 4, "ascolto con " + l.options.length + " opzioni: " + f.id);
  }

  // Scrivere: la frase esatta, o scritta dal telefono senza accenti né
  // punteggiatura, è giusta.
  ok(Frasi.gradeWritten(f.it, f.it).verdict === "giusto", "frase esatta: " + f.id);
  var phone = f.it.normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[?!.,«»…]/g, "").toLowerCase();
  ok(Frasi.gradeWritten(phone, f.it).verdict === "giusto",
     "senza accenti né punti: " + f.id + " (" + phone + ")");
});

ok(Frasi.gradeWritten("Sono appena arivato", "Sono appena arrivato.").verdict === "sbagliato" ||
   Frasi.gradeWritten("Sono appena arivato", "Sono appena arrivato.").verdict === "quasi",
   "un refuso non è giusto");
ok(Frasi.gradeWritten("Vorrei un cappuccino e cornetto",
                      "Vorrei un cappuccino e un cornetto.").verdict === "quasi",
   "una parola mancante in una frase lunga = quasi");
ok(Frasi.gradeWritten("un cornetto e un cappuccino vorrei",
                      "Vorrei un cappuccino e un cornetto.").verdict !== "giusto",
   "l'ordine delle parole conta");
ok(Frasi.gradeWritten("", "Ciao!").verdict === "sbagliato", "risposta vuota");
ok(Frasi.gradeWritten("dove il bagno", "Dov'è il bagno?").verdict === "giusto",
   "l'elisione si scrive anche per esteso");

/* ------------------------------------------------ sessioni di scena */

var cards = {};
Frasi.SCENES.forEach(function (s) {
  var sess = Frasi.sceneSession(s.id, cards, {});
  var intros = sess.filter(function (it) { return it.type === "intro"; });
  ok(intros.length === 4, "4 frasi nuove per sessione: " + s.id);
  ok(sess.length >= 8, "sessione troppo corta: " + s.id);
  sess.forEach(function (it) {
    ok(it.answer && it.frase && Frasi.BY_ID[it.id], "item di scena malformato: " + s.id);
    if (it.type !== "intro") cards[it.id] = Engine.schedule(cards[it.id], 2);
  });
  var silent = Frasi.sceneSession(s.id, cards, { silent: true });
  ok(silent.every(function (it) { return it.type !== "listen"; }),
     "in modalità ufficio niente ascolto automatico: " + s.id);
});
var p = Frasi.progress("ciao", cards);
ok(p.seen === 4 && p.total === Frasi.ofScene("ciao").length, "progresso di scena");

/* ------------------------------------------------ ripasso con frasi */

var st = Engine.blankSave();
Frasi.ofScene("bar").forEach(function (f) {
  st.cards[f.id] = Engine.schedule(null, 2);
  st.cards[f.id].due = Date.now() - 1000;
});
ok(Drills.dueCount(course, st) === Frasi.ofScene("bar").length,
   "le frasi scadute contano nel ripasso");
var rev = Drills.buildReview(course, st, 50);
ok(rev.length === Frasi.ofScene("bar").length, "il ripasso rigenera le frasi");
rev.forEach(function (it) { ok(it.frase && it.type !== "intro", "ripasso di frase valido"); });

/* ---------------------------------------------------- pausa e lampo */

course.weeks.forEach(function (w) {
  var s = Engine.blankSave();
  var items = Drills.buildPausa(course, s, w, {});
  ok(items.length >= 5 && items.length <= 10, "pausa di lunghezza giusta, settimana " + w.week);
  items.forEach(function (it) {
    ok(it.type !== "cloze" && it.type !== "translate",
       "in pausa niente domande da scrivere del libro, settimana " + w.week);
    if (it.type === "choice") ok(it.options.indexOf(it.answer) >= 0, "pausa: scelta senza risposta");
  });
});

var ls = Engine.blankSave();
for (var i = 0; i < 300; i++) {
  var li = Drills.lampoItem(ls);
  ok(li.options.indexOf(li.answer) >= 0 && uniq(li.options) && li.options.length === 4,
     "lampo con opzioni valide");
}

/* ----------------------------------- serie, scudi, obiettivo, forziere */

function day(y, m, d, h) { return new Date(y, m - 1, d, h || 12); }

var s = Engine.blankSave();
Engine.touchStreak(s, day(2026, 3, 1));
Engine.touchStreak(s, day(2026, 3, 2));
Engine.touchStreak(s, day(2026, 3, 2, 20));
ok(s.streak === 2, "due giorni di fila: " + s.streak);
ok(s.shields === 1, "si parte con uno scudo");
Engine.touchStreak(s, day(2026, 3, 4));       // saltato il 3
ok(s.streak === 3 && s.shields === 0, "lo scudo salva la serie: " + s.streak + "/" + s.shields);
Engine.touchStreak(s, day(2026, 3, 7));       // saltati 5 e 6, niente scudi
ok(s.streak === 1, "senza scudi la serie riparte");
for (var d = 8; d <= 13; d++) Engine.touchStreak(s, day(2026, 3, d));
ok(s.streak === 7 && s.shields === 1, "7 giorni regalano uno scudo: " + s.shields);
Engine.touchStreak(s, day(2026, 3, 31));
Engine.touchStreak(s, day(2026, 4, 1));
ok(s.streak === 2, "la serie attraversa il cambio di mese");

var g = Engine.blankSave();
g.goal = 50;
var now = day(2026, 5, 10);
ok(Engine.addXp(g, 30, now) === false, "sotto l'obiettivo");
ok(Engine.openChest(g, null, now) === null, "forziere chiuso prima dell'obiettivo");
ok(Engine.addXp(g, 25, now) === true, "obiettivo raggiunto una volta");
ok(Engine.addXp(g, 25, now) === false, "e non si ripete nello stesso giorno");
ok(Engine.todayXp(g, now) === 80 && g.xp === 80, "xp del giorno e totale");
var before = g.xp;
var prize = Engine.openChest(g, function () { return 0.9; }, now);
ok(prize && prize.xp > 0 && g.xp === before + prize.xp, "il forziere paga");
ok(Engine.openChest(g, null, now) === null, "un forziere al giorno");
ok(Engine.lastDays(g, 28, now).length === 28, "calendario di 28 giorni");
ok(Engine.lastDays(g, 28, now)[27].xp === 80, "oggi è l'ultimo giorno del calendario");

ok(Engine.rankFor(1) === "Turista" && Engine.rankFor(60) === "Madrelingua", "gradi");

// A save from the old version loads with the new fields filled in.
var old = { xp: 10, cards: {}, badges: [], totals: { attempts: 1, right: 1, close: 0, wrong: 0 } };
global.localStorage = { getItem: function () { return JSON.stringify(old); } };
var loaded = Engine.load();
ok(loaded.goal === 50 && loaded.days && loaded.shields === 1, "salvataggio vecchio aggiornato");
delete global.localStorage;

var fdg = Frasi.ofTheDay(day(2026, 6, 1));
ok(fdg === Frasi.ofTheDay(day(2026, 6, 1, 23)), "la frase del giorno non cambia nel giorno");

console.log("\ncontrolli: " + checks + "   errori: " + fails);
process.exit(fails ? 1 : 0);
