/*
 * Desglose: una frase, palabra por palabra.
 *
 * Una frase hecha que se aprende entera («Valeu, falou!», «Mi passi il
 * sale?») se recuerda mejor si se entiende cómo está armada: de qué verbo
 * viene cada forma y en qué tiempo y persona, qué contracción esconde un
 * «no» o un «al», qué significa cada pieza (Boers & Lindstromberg 2012:
 * analizar un bloque léxico en vez de memorizarlo opaco ayuda a
 * retenerlo).  Todo sale del paquete del idioma: el conjugador (formas →
 * verbo, tiempo, persona), el glosario (forma → lema, significado) y las
 * contracciones de LANG.rules.banca.contr.  Sin DOM: se prueba en node.
 *
 *   Desglose.of("Valeu, falou!", { gloss: glossario })
 *   → [{ w: "valeu", kind: "verb", lemma: "valer", tenses: ["perfeito"],
 *        persons: [2], es: "gracias, dale (coloquial)" }, …]
 */
(function (root) {
  "use strict";

  var FORMS = null;             // forma → [[infinitivo, tiempo, persona], …]

  function conj() { return root.Conj || null; }

  function index() {
    if (FORMS) return FORMS;
    FORMS = {};
    var C = conj();
    if (!C) return FORMS;
    C.list().forEach(function (inf) {
      (C.SIMPLE_TENSES || []).forEach(function (t) {
        var forms;
        try { forms = C.conjugate(inf, t, { partial: true }); } catch (e) { return; }
        (forms || []).forEach(function (f, p) {
          if (!f) return;
          var w = String(f).split(" ").pop().toLowerCase();
          (FORMS[w] = FORMS[w] || []).push([inf, t, p]);
        });
      });
      try {
        var pp = C.participle(inf);
        if (pp) (FORMS[pp.toLowerCase()] = FORMS[pp.toLowerCase()] || []).push([inf, "participio", -1]);
      } catch (e) { /* sin participio */ }
      try {
        var g = C.gerund && C.gerund(inf);
        if (g) (FORMS[g.toLowerCase()] = FORMS[g.toLowerCase()] || []).push([inf, "gerundio", -1]);
      } catch (e) { /* sin gerundio */ }
    });
    return FORMS;
  }

  // «no» → «em + o», «al» → «a + il», from LANG.rules.banca.contr.
  var CONTR = null;
  function contractions() {
    if (CONTR) return CONTR;
    CONTR = {};
    var L = root.LANG, c = L && L.rules && L.rules.banca && L.rules.banca.contr;
    Object.keys(c || {}).forEach(function (prep) {
      Object.keys(c[prep]).forEach(function (art) {
        var f = String(c[prep][art]).toLowerCase();
        if (f && f !== prep + " " + art) CONTR[f] = [prep, art];
      });
    });
    return CONTR;
  }

  function label(t) {
    var C = conj(), L = C && C.TENSE_LABELS;
    if (t === "participio") return "participio";
    if (t === "gerundio") return "gerundio";
    return (L && L[t]) || t;
  }

  function personLabel(p) {
    var C = conj();
    return p >= 0 && C && C.PERSONS ? C.PERSONS[p] : "";
  }

  // Articles and contractions: a word right after one is a noun (il sale).
  var ARTS = null;
  function articles() {
    if (ARTS) return ARTS;
    ARTS = {};
    var L = root.LANG, R = L && L.rules, c = R && R.banca && R.banca.contr, d = R && R.distract;
    Object.keys(c || {}).forEach(function (prep) {
      Object.keys(c[prep]).forEach(function (art) { ARTS[art.toLowerCase()] = 1; ARTS[String(c[prep][art]).toLowerCase()] = 1; });
    });
    ((d && d.artSg) || []).concat((d && d.artPl) || []).forEach(function (a) { ARTS[String(a).toLowerCase()] = 1; });
    return ARTS;
  }

  function plain(s) {
    return String(s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/ção$/, "cion").replace(/cao$/, "cion").replace(/nh/g, "n").replace(/lh/g, "ll").replace(/gn/g, "n")
      .replace(/(.)\1/g, "$1");
  }
  function dist(a, b) {
    var m = [], i, j;
    for (i = 0; i <= a.length; i++) m[i] = [i];
    for (j = 0; j <= b.length; j++) m[0][j] = j;
    for (i = 1; i <= a.length; i++) for (j = 1; j <= b.length; j++)
      m[i][j] = Math.min(m[i - 1][j] + 1, m[i][j - 1] + 1, m[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return m[a.length][b.length];
  }
  // «água — agua», «caminho — camino»: a Spanish speaker reads it alone.
  function transparent(w, es) {
    var a = plain(w);
    return String(es || "").split(/\s*[\/;,(]\s*/).some(function (x) {
      var b = plain(x.trim());
      return b && (a === b || (a.length >= 4 && dist(a, b) <= 1));
    });
  }

  /* A verb of the glossary the conjugator does not know yet (the bank's
     regular verbs): register it, then look its forms up. */
  function formsOf(inf) {
    var C = conj(), out = [];
    if (!C) return out;
    (C.SIMPLE_TENSES || []).forEach(function (t) {
      var forms;
      try { forms = C.conjugate(inf, t, { partial: true }); } catch (e) { return; }
      (forms || []).forEach(function (f, p) { if (f) out.push([String(f).split(" ").pop().toLowerCase(), t, p]); });
    });
    try { var pp = C.participle(inf); if (pp) out.push([pp.toLowerCase(), "participio", -1]); } catch (e) { /* no */ }
    return out;
  }

  /* Nouns, adjectives and other words of the bank (Banca, or opts.bank):
     they are read as what they are before being read as a verb form. */
  var NOMINAL = null, SUBJ = {}, EXPR = {};
  function nominalFrom(bank) {
    NOMINAL = {};
    (bank && bank.nouns || []).forEach(function (n) { NOMINAL[String(n[0]).toLowerCase()] = 1; NOMINAL[String(n[2]).toLowerCase()] = 1; });
    (bank && bank.adjectives || []).forEach(function (a) { for (var k = 0; k < 4; k++) NOMINAL[String(a[k]).toLowerCase()] = 1; });
    (bank && bank.words || []).forEach(function (x) {
      var w = String(x[0]).toLowerCase();
      // expressions (valeu, falou) are verb forms worth explaining
      if (/espress|express/i.test(String(x[2] || ""))) EXPR[w] = 1;
      else if (!/verb/i.test(String(x[2] || ""))) NOMINAL[w] = 1;
    });
    var C = conj();
    SUBJ = {};
    ((C && C.PERSONS) || []).forEach(function (p) { String(p).split("/").forEach(function (x) { SUBJ[x.trim().toLowerCase()] = 1; }); });
  }

  function tokens(text) {
    return (String(text || "").toLowerCase().match(/[a-zà-ÿ]+(?:[-'’][a-zà-ÿ]+)*/g) || []);
  }

  /* One entry per word worth explaining: a verb form (what verb, which
     tense and person), a contraction, or a word with a meaning in the
     glossary.  The infinitive itself and words spelled like their Spanish
     meaning are not explained. */
  function of(text, opts) {
    opts = opts || {};
    var gloss = opts.gloss || {}, out = [], seen = {};
    var idx = index(), contr = contractions();
    if (opts.bank && !NOMINAL) nominalFrom(opts.bank);
    else if (!NOMINAL && root.Banca && root.Banca.loaded && root.Banca.loaded()) nominalFrom(root.Banca.bank());
    var toks = tokens(text), arts = articles();
    toks.forEach(function (w, i) {
      if (seen[w]) return;
      seen[w] = 1;
      var g = gloss[w];
      if (contr[w]) {
        out.push({ w: w, kind: "contr", parts: contr[w] });
        return;
      }
      var C = conj();
      var hits = (idx[w] || []).filter(function (h) { return h[0] !== w; });
      // a verb of the glossary the conjugator does not have yet
      if (!hits.length && g && g[0] !== w && C && C.register && /(are|ere|ire|rre|ar|er|ir|or)$/.test(g[0])) {
        try { C.register(g[0], { es: g[1] }); } catch (e) { /* no */ }
        hits = formsOf(g[0]).filter(function (f) { return f[0] === w; }).map(function (f) { return [g[0], f[1], f[2]]; });
      }
      // after an article it is a noun: il sale, o canto
      var afterArt = i > 0 && arts[toks[i - 1]];
      // A noun or adjective of the bank reads as what it is (um mate, em
      // casa, o trabalho, como), unless it follows a subject pronoun.
      var nominal = NOMINAL && NOMINAL[w] && !(i > 0 && SUBJ[toks[i - 1]]);
      // after an article a verb reading is wrong (um mate, un giro); if the
      // glossary only knows the verb, better say nothing than say «matar»
      if (afterArt && hits.length && !nominal) {
        if (!g || hits.some(function (h) { return h[0] === g[0]; })) return;
        hits = [];
      }
      if (hits.length && !nominal && !(afterArt && (!g || hits.every(function (h) { return h[0] !== g[0]; })))) {
        var lemmas = [];
        if (g && hits.some(function (h) { return h[0] === g[0]; })) lemmas.push(g[0]);
        hits.forEach(function (h) { if (lemmas.indexOf(h[0]) < 0) lemmas.push(h[0]); });
        lemmas = lemmas.slice(0, 2);
        var mine = hits.filter(function (h) { return lemmas.indexOf(h[0]) >= 0; });
        var tenses = [], persons = [];
        mine.forEach(function (h) {
          if (tenses.indexOf(h[1]) < 0) tenses.push(h[1]);
          if (h[2] >= 0 && persons.indexOf(h[2]) < 0) persons.push(h[2]);
        });
        var lemma = lemmas[0], lg = gloss[lemma];
        var es = lemmas.map(function (l) { var x = gloss[l]; return x && x[1]; }).filter(Boolean).join(" / ") || "";
        if (!es && C && C.info) { try { es = (C.info(lemma) || {}).es || ""; } catch (e) { /* no */ } }
        // the gloss of the word itself, when it says more than the verb
        // (valeu: gracias, dale)
        if (!es && g && lemmas.indexOf(g[0]) >= 0) es = g[1] || "";
        var idiom = g && EXPR[w] && lemmas.indexOf(g[0]) < 0 && g[1] && g[1] !== es ? g[1] : "";
        out.push({ w: w, kind: "verb", lemma: lemma, lemmas: lemmas, tenses: tenses, persons: persons, es: es, idiom: idiom });
        return;
      }
      if (g && g[1] && g[0] && !transparent(w, g[1]) && !transparent(g[0], g[1])) {
        out.push({ w: w, kind: "word", lemma: g[0], es: g[1] });
      }
    });
    return out;
  }

  /* The same, as short lines of text with *marks* (the app renders them). */
  function lines(text, opts) {
    return of(text, opts).map(function (e) {
      if (e.kind === "contr") return "*" + e.w + "* = *" + e.parts[0] + "* + *" + e.parts[1] + "*";
      if (e.kind === "verb") {
        var ps = e.persons.slice(0, 2).map(personLabel).filter(Boolean);
        var t = e.tenses.slice(0, 2).map(label).join(" o ");
        return "*" + e.w + "*: de *" + (e.lemmas || [e.lemma]).join("* o *") + "* (" + t + (ps.length ? ", " + ps.join(" / ") : "") + ")" +
          (e.es ? " — «" + e.es + "»" : "") + (e.idiom ? "; en esta frase: «" + e.idiom + "»" : "");
      }
      return "*" + e.w + "*" + (e.lemma !== e.w ? " (de *" + e.lemma + "*)" : "") + " — «" + e.es + "»";
    });
  }

  var api = { of: of, lines: lines, _reset: function () { FORMS = null; CONTR = null; NOMINAL = null; } };
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.Desglose = api;
})(typeof window !== "undefined" ? window : globalThis);
