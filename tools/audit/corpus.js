/* Corpus dell'audit: ogni contenuto che lo studente vede, in unità numerate
   con la fonte da correggere.  Run: node tools/audit/corpus.js
   Scrive tools/audit/out/corpus.jsonl (una unità per riga). */
var fs = require("fs");
var path = require("path");
var ROOT = path.join(__dirname, "..", "..");
var R = function (p) { return require(path.join(ROOT, p)); };
var Conj = R("docs/js/conjugator.js");
var course = R("docs/data/course.json");
var bank = R("docs/data/bank.json");
var Frasi = R("docs/js/frasi.js");
var Letture = R("docs/js/letture.js");
var Lab = R("docs/js/lab.js");

var units = [];
function add(id, src, kind, data) { units.push({ id: id, src: src, kind: kind, data: data }); }
function chunk(list, n) { var out = []; for (var i = 0; i < list.length; i += n) out.push(list.slice(i, i + n)); return out; }

// Corso: item
var authoredSrc = function (id) {
  return /^a2-/.test(id) ? "tools/authored/a2_base.py" : /^b2-/.test(id) ? "tools/authored/b2_lessico.py"
    : "tools/authored/c1_*.py";
};
course.items.forEach(function (it) {
  if (it.src === "sfida") return;
  var d = {}; ["type", "prompt", "stem", "options", "answer", "accept", "example", "hint", "note"].forEach(function (k) {
    if (it[k] != null && it[k] !== "") d[k] = it[k];
  });
  add("item:" + it.id, it.src === "dummies" ? "docs/data/bank_dummies.json" : authoredSrc(it.id), "esercizio", d);
});
// Corso: settimane e lezioni
var lessonSrc = function (w) { return "tools/lessons/s" + Math.ceil(w / 13) + ".py"; };
course.weeks.forEach(function (w) {
  add("week:" + w.week, "tools/build_course.py (WEEKS)", "settimana", { title: w.title, level: w.level, focus: w.focus, keys: w.keys });
  if (w.lesson) {
    add("lesson:" + w.week + ":intro", lessonSrc(w.week), "lezione", { intro: w.lesson.intro });
    w.lesson.blocks.forEach(function (b, i) { add("lesson:" + w.week + ":" + i, lessonSrc(w.week), "lezione", b); });
  }
});
var byId = {}; course.items.forEach(function (it) { byId[it.id] = it; });
course.challenges.forEach(function (c) {
  if (c.play) {
    add("chal:" + c.id, "tools/audit/patches/sfide/*.json", "sfida", { consigna: c.consigna,
      play: c.play.map(function (id) { var it = byId[id]; var o = { label: id.split(":").pop(), type: it.type, stem: it.stem, answer: it.answer, accept: it.accept }; if (it.options) o.options = it.options; if (it.note) o.note = it.note; return o; }) });
  } else {
    add("chal:" + c.id, c.consigna ? "tools/audit/patches/sfide/*.json" : "docs/data/bank_routledge.json", "sfida",
      { consigna: c.consigna || c.instruction, items: c.items });
  }
});
// Banca
bank.sentences.forEach(function (s, i) { add("frase:" + i, "tools/bank/frasi_banca.py", "frase", s); });
bank.errors.forEach(function (e, i) { add("errore:" + i, "tools/bank/errori_banca.py", "trova_errore", e); });
chunk(bank.nouns, 40).forEach(function (c, i) { add("nomi:" + i, "tools/bank/parole_nomi.py", "nomi [it, genere, plurale, es, tema, livello, nota]", c); });
chunk(bank.verbs, 40).forEach(function (c, i) { add("verbi:" + i, "tools/bank/parole_verbi_agg.py", "verbi [inf, es, aux, isc, irregolare]", c); });
chunk(bank.adjectives, 40).forEach(function (c, i) { add("agg:" + i, "tools/bank/parole_verbi_agg.py", "aggettivi [m, f, mpl, fpl, es, livello, nota]", c); });
chunk(bank.words, 40).forEach(function (c, i) { add("parole:" + i, "tools/bank/parole_verbi_agg.py", "parole [it, es, ...]", c); });
chunk(Object.keys(bank.esIt).map(function (k) { return [k].concat(bank.esIt[k]); }), 50).forEach(function (c, i) {
  add("esit:" + i, "tools/bank/trasferimento.py", "spagnolo→italiano [es, it, nota]", c);
});
chunk(Object.keys(bank.falsi).map(function (k) { return [k].concat(bank.falsi[k]); }), 25).forEach(function (c, i) {
  add("falsi:" + i, "tools/bank/trasferimento.py", "falsi amici", c);
});
add("grafie:0", "tools/bank/trasferimento.py", "grafie es→it", bank.spelling);
// Frasi, letture, lab
Frasi.SCENES.forEach(function (s) {
  add("scena:" + s.id, "docs/js/frasi.js", "scena", { name: s.name, desc: s.desc,
    frasi: Frasi.ALL.filter(function (f) { return f.scene === s.id; }).map(function (f) { return [f.it, f.es, f.note || ""]; }) });
});
Letture.EPISODI.forEach(function (e) {
  add("lettura:" + e.id, "docs/js/letture.js", "lettura", { title: e.title, level: e.level, grammar: e.grammar, text: e.text,
    gloss: e.gloss, questions: e.questions, hunt: e.hunt });
});
Lab.RULES.forEach(function (r) { add("ponte:" + r.id, "docs/js/lab.js", "regola ponte es→it", r); });
chunk(Lab.FALSI, 14).forEach(function (c, i) { add("labfalsi:" + i, "docs/js/lab.js", "falsi amici [it, falso es, vero es, nota]", c); });
Lab.CAPIRE.forEach(function (c) { add("capire:" + c.id, "docs/js/lab.js", "input strutturato", c); });
// Coniugazioni generate: i verbi del motore
Conj.list().forEach(function (v) {
  var t = {};
  Conj.ALL_TENSES.forEach(function (tn) { try { t[tn] = Conj.conjugate(v, tn); } catch (e) { t[tn] = "ERR " + e.message; } });
  try { t.imperativo = Conj.imperative(v); } catch (e) { /* */ }
  t.participio = Conj.participle(v); t.gerundio = Conj.gerund(v); t.ausiliare = Conj.auxiliary(v);
  add("coniuga:" + v, "docs/js/conjugator.js", "coniugazione completa", t);
});
// Verbi della banca (registrati, coniugati dalle regole): forme chiave
var engineVerbs = {}; Conj.list().forEach(function (v) { engineVerbs[v] = 1; });
var bv = bank.verbs.filter(function (v) { return !engineVerbs[v[0]] && !v[4]; });
bv.forEach(function (v) { Conj.register(v[0], { es: v[1], aux: v[2], isc: v[3] }); });
chunk(bv, 12).forEach(function (c, i) {
  add("formebanca:" + i, "tools/bank/parole_verbi_agg.py (flag aux/isc/irregolare)", "forme generate dei verbi della banca",
    c.map(function (v) {
      var f = function (tn) { try { return Conj.conjugate(v[0], tn).join(", "); } catch (e) { return "ERR"; } };
      return { inf: v[0], es: v[1], presente: f("presente"), passato_prossimo: f("passatoProssimo"), futuro: f("futuro"),
        congiuntivo: f("congiuntivo"), passato_remoto: f("passatoRemoto"), participio: Conj.participle(v[0]) };
    }));
});
// Testi dell'interfaccia e spiegazioni del correttore (stringhe letterali)
["docs/js/diagnosi.js", "docs/js/app.js", "docs/js/banca.js", "docs/js/drills.js", "docs/js/engine.js"].forEach(function (f) {
  var src = fs.readFileSync(path.join(ROOT, f), "utf8");
  var strs = [];
  var re = /"((?:[^"\\\n]|\\.)*)"/g, m;
  while ((m = re.exec(src))) {
    var s = m[1];
    if (s.length >= 14 && /[a-záéíóúñà-ù]{3,}\s+[a-záéíóúñà-ù]{2,}/i.test(s) && !/^[\w.#\[\]="-]+$/.test(s) && strs.indexOf(s) < 0) strs.push(s);
  }
  chunk(strs, 60).forEach(function (c, i) { add("testi:" + path.basename(f) + ":" + i, f, "testi visibili (frammenti di stringhe)", c); });
});

fs.mkdirSync(path.join(__dirname, "out"), { recursive: true });
fs.writeFileSync(path.join(__dirname, "out", "corpus.jsonl"), units.map(function (u) { return JSON.stringify(u); }).join("\n") + "\n");
var bytes = units.reduce(function (a, u) { return a + JSON.stringify(u).length; }, 0);
console.log("unità: " + units.length + "   " + Math.round(bytes / 1024) + " KB");
