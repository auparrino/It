/*
 * El banco: miles de ejercicios generados a partir de data/bank.json
 * (palabras, oraciones, errores típicos del hispanohablante).  Cada ejercicio
 * lleva la regla que pone a prueba, así el diagnóstico puede explicar el
 * error en lugar de mostrar solo la respuesta correcta.
 *
 * Tipos: palabras (en las dos direcciones, con el artículo), artículos,
 * plurales, preposiciones articuladas o contracciones (di + il = del, em + o
 * = no), concordancia del adjetivo, traducción, verbo en contexto, encontrá
 * el error y la clínica de los errores personales.
 *
 * Lo que depende de la lengua lo trae el paquete (LANG.rules.banca): los
 * artículos, las contracciones, los plurales, los adjetivos de concordancia,
 * los niveles del recorrido y qué ejercicios curan qué error.  Esquema de
 * bank.json: el mismo en los dos idiomas (las oraciones guardan el idioma en
 * «it» y las interferencias en «esIt»).
 */
(function (root) {
  "use strict";

  var LANG = root.LANG || {};
  var R = LANG.rules || {};
  var BR = R.banca || {};
  var TX = R.text || {};

  // The language's diagnosis (docs/lang/<code>/diagnosi.js), loaded before.
  var Diagnosi = root.Diagnosi || null;

  var B = null;          // el banco cargado
  var IDX = {};          // índices derivados

  var LEVELS = ["A1", "A2", "B1", "B2", "C1"];

  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }

  function load(bank) {
    B = bank;
    if (Diagnosi) Diagnosi.init(bank);
    IDX = { noun: {}, sent: {}, err: {}, adj: {}, word: {}, verb: {} };
    B.nouns.forEach(function (n) { IDX.noun[n[0]] = n; });
    B.adjectives.forEach(function (a) { IDX.adj[a[0]] = a; });
    B.words.forEach(function (w) { IDX.word[w[0]] = w; });
    B.verbs.forEach(function (v) { IDX.verb[v[0]] = v; });
    return api;
  }

  function loaded() { return !!B; }

  /* El nivel del recorrido decide qué está al alcance (banca.levels: la
     última semana de A1, A2, B1 y B2 en el temario del idioma). */
  var LV = BR.levels || [8, 18, 30, 42];
  function levelOf(state) {
    var w = (state && state.unlocked) || 1;
    return w <= LV[0] ? "A1" : w <= LV[1] ? "A2" : w <= LV[2] ? "B1" : w <= LV[3] ? "B2" : "C1";
  }
  /* Y la semana del curso decide la gramática: cada oración y cada error
     traen en «w» (traducir, encontrar el error) y «wg» (completar) la
     primera semana en la que todo lo que usan ya se explicó. */
  function weekOf(state) { return (state && state.unlocked) || 1; }
  function taught(x, state, key) { return (x[key || "w"] || 1) <= weekOf(state); }
  function within(lvl, max) { return LEVELS.indexOf(lvl) <= LEVELS.indexOf(max); }
  function nearLevel(lvl, max) {
    var a = LEVELS.indexOf(lvl), b = LEVELS.indexOf(max);
    return a <= b && a >= b - 1;
  }

  /* -------------------------------------------------------- artículos */

  // The articles of the language (by the gender, and in some languages by
  // the initial sound: lo studente, l'amico).
  function defArt(word, g, plural) { return BR.defArt ? BR.defArt(word, g, plural) : ""; }
  function indefArt(word, g, plural) { return BR.indefArt ? BR.indefArt(word, g, plural) : ""; }

  // The gender in the plural (it can change: il braccio → le braccia).
  function pluralGender(n) { return BR.pluralGender ? BR.pluralGender(n) : n[1]; }

  // The article before the word (an elided one is glued: l'amico).
  function withArt(art, word) { return BR.withArt ? BR.withArt(art, word) : art + " " + word; }

  function nounWithArt(n) { return withArt(defArt(n[0], n[1], false), n[0]); }

  /* ---------------------------------------------------------- palabras */

  function vocabChoice(n, kind) {
    // Idioma → español, reconocer la palabra (las nuevas empiezan acá).
    var pool, stem, ans, id;
    if (kind === "n") {
      stem = nounWithArt(n); ans = n[3]; id = "b:voc:" + n[0];
      pool = B.nouns.filter(function (x) { return x[4] === n[4] && x[3] !== ans; });
      if (pool.length < 3) pool = B.nouns;
    } else if (kind === "v") {
      stem = n[0]; ans = n[1]; id = "b:voc:" + n[0];
      pool = B.verbs.filter(function (x) { return x[1] !== ans; });
    } else if (kind === "a") {
      stem = n[0]; ans = n[4]; id = "b:voc:" + n[0];
      pool = B.adjectives.filter(function (x) { return x[4] !== ans; }).map(function (x) { return [x[0], x[0], x[0], x[4]]; });
    } else {
      stem = n[0]; ans = n[1]; id = "b:voc:" + n[0];
      pool = B.words.filter(function (x) { return x[1] !== ans; });
    }
    var opts = [ans], used = {};
    used[ans] = true;
    shuffle(pool).forEach(function (x) {
      var o = kind === "n" ? x[3] : kind === "a" ? x[3] : x[1];
      if (opts.length < 4 && !used[o]) { used[o] = true; opts.push(o); }
    });
    return { id: id, src: "banca", bank: "voc", type: "choice",
             prompt: "¿Qué significa?", stem: stem, options: shuffle(opts),
             answer: ans, accept: [ans], note: kindNote(n, kind), say: stem };
  }

  function kindNote(n, kind) {
    if (kind === "n") {
      var extra = n[2] !== n[0] ? "Plural: " + withArt(defArt(n[2], pluralGender(n), true), n[2]) + "." : (BR.invariable || "No cambia en plural.");
      return (n[6] ? n[6] + " " : "") + extra;
    }
    if (kind === "v") return BR.verbNote ? BR.verbNote(n) : (n[6] || "");
    if (kind === "a") return n[6] || (n[0] + " · " + n[1] + " · " + n[2] + " · " + n[3]);
    return n[4] || "";
  }

  function vocabWrite(n, kind) {
    // Español → idioma, producirla (los sustantivos con su artículo: ahí
    // aparecen los errores de género, il latte, o leite).
    var ans, prompt, stem;
    if (kind === "n") {
      ans = nounWithArt(n);
      prompt = TX.nounWithArt || "Escribilo con el artículo";
      stem = n[3];
    } else if (kind === "v") { ans = n[0]; prompt = TX.verbInf || "Escribí el infinitivo"; stem = n[1]; }
    else if (kind === "a") { ans = n[0]; prompt = "Escribí el adjetivo (masculino singular)"; stem = n[4]; }
    else { ans = n[0]; prompt = TX.howSay || "¿Cómo se dice?"; stem = n[1]; }
    return { id: "b:voc:" + n[0], src: "banca", bank: "voc", type: "typed",
             prompt: prompt, stem: stem, answer: ans, accept: [ans],
             note: kindNote(n, kind), diag: true, say: ans };
  }

  // La capa de frecuencia (docs/js/frequenza.js), si la app la cargó.
  function Freq() { return root.Freq && root.Freq.loaded() ? root.Freq : null; }

  function vocabSession(state, size) {
    var lvl = levelOf(state), cards = state.cards || {};
    var pool = [];
    B.nouns.forEach(function (n) { if (within(n[5], lvl)) pool.push([n, "n"]); });
    B.verbs.forEach(function (v) { if (within(v[5], lvl)) pool.push([v, "v"]); });
    B.adjectives.forEach(function (a) { if (within(a[5], lvl)) pool.push([a, "a"]); });
    B.words.forEach(function (w) { if (within(w[3], lvl)) pool.push([w, "w"]); });
    var fresh = shuffle(pool.filter(function (x) { return !cards["b:voc:" + x[0][0]]; }));
    // Primero las palabras desconocidas más frecuentes (Nation 2006); el
    // orden al azar dentro de la misma franja mantiene las sesiones variadas.
    var F = Freq();
    if (F) fresh.sort(function (a, b) { return Math.round(F.zipf(b[0][0]) * 2) - Math.round(F.zipf(a[0][0]) * 2); });
    var seen = shuffle(pool.filter(function (x) { return cards["b:voc:" + x[0][0]]; }));
    var out = [];
    // Palabras nuevas: reconocer; conocidas: producir (dificultad deseable).
    fresh.slice(0, 6).forEach(function (x) { out.push(vocabChoice(x[0], x[1])); });
    seen.slice(0, (size || 12) - out.length).forEach(function (x) { out.push(vocabWrite(x[0], x[1])); });
    if (out.length < (size || 12)) {
      fresh.slice(6, 6 + (size || 12) - out.length).forEach(function (x) { out.push(vocabWrite(x[0], x[1])); });
    }
    return shuffle(out);
  }

  /* Una sesión sobre lemas dados (las palabras frecuentes que le faltan al
     alumno, del medidor de cobertura): las entradas del banco, primero para
     reconocer. */
  function vocabSessionFor(state, lemmas, size) {
    var cards = state.cards || {}, out = [];
    (lemmas || []).forEach(function (l) {
      var n = IDX.noun[l] ? [IDX.noun[l], "n"] : IDX.verb[l] ? [IDX.verb[l], "v"] : IDX.adj[l] ? [IDX.adj[l], "a"] : IDX.word[l] ? [IDX.word[l], "w"] : null;
      if (!n || out.length >= (size || 12)) return;
      out.push(cards["b:voc:" + n[0][0]] ? vocabWrite(n[0], n[1]) : vocabChoice(n[0], n[1]));
    });
    return out;
  }
  // ¿Está el lema en el banco (para que el medidor de cobertura lo ofrezca)?
  function hasWord(l) { return !!(IDX.noun[l] || IDX.verb[l] || IDX.adj[l] || IDX.word[l]); }

  /* ------------------------------------------------------------ formas */

  function articleItem(n, plural) {
    var word = plural ? n[2] : n[0];
    var g = plural ? pluralGender(n) : n[1];
    var ans = defArt(word, g, plural);
    return { id: "b:art:" + n[0] + (plural ? ":p" : ":s"), src: "banca", bank: "forme",
             type: "choice", prompt: "Elegí el artículo" + (plural ? " (plural)" : ""),
             stem: "___ " + word + "  (" + n[3] + ")", options: BR.artOptions ? BR.artOptions(plural, ans) : [ans], answer: ans, accept: [ans],
             choiceDiag: { before: "", after: " " + word },
             note: artNote(word, g, plural, n), say: withArt(ans, word) };
  }

  function artNote(word, g, plural, n) {
    var why = BR.artWhy ? BR.artWhy(word, g, n, plural) : "";
    return why + (n[6] ? " " + n[6] : "");
  }

  // Nouns that live in the singular (la fame, a fome, the months): their
  // plural is grammar trivia, not something to drill (banca.countable).
  function countable(n) { return BR.countable ? BR.countable(n) : true; }

  function pluralItem(n) {
    var g = pluralGender(n);
    var artP = defArt(n[2], g, true);
    return { id: "b:pl:" + n[0], src: "banca", bank: "forme", type: "typed",
             prompt: "Escribí el plural", stem: nounWithArt(n) + " → " + artP + " ___",
             answer: n[2], accept: [n[2]], note: pluralNote(n), diag: true,
             say: withArt(artP, n[2]) };
  }

  // Why this plural (banca.pluralNote: -ão → -ões…), with the bank's note.
  function pluralNote(n) { return BR.pluralNote ? BR.pluralNote(n) : (n[6] || ""); }

  /* Articulated prepositions or contractions (banca.contr: di + il = del,
     em + o = no), and in some languages with the indefinite article too
     (banca.indefPreps: em + um = num). */
  var PREPS = BR.preps || [];
  var CONTR = BR.contr || {};
  var CRASE_WEEK = BR.CRASE_WEEK;

  function prepItem(n, prep, plural, indef) {
    var word = plural ? n[2] : n[0], g = plural ? pluralGender(n) : n[1];
    if (!CONTR[prep]) return null;
    indef = !!(indef && (BR.indefPreps || {})[prep]);
    var art = indef ? indefArt(word, g, plural) : defArt(word, g, plural), ans = CONTR[prep][art];
    if (!ans) return null;
    var note = BR.prepNote ? BR.prepNote(prep, art, ans, indef) : "*" + prep + " + " + art + "* = *" + ans + "*.";
    return { id: "b:prep:" + prep + ":" + n[0] + (plural ? ":p" : indef ? ":u" : ""), src: "banca", bank: "forme",
             type: "typed", prompt: "Uní la preposición con el artículo",
             stem: "(" + prep + " + " + art + ") " + word + " → ___ " + word,
             answer: ans, accept: BR.prepAccept ? BR.prepAccept(prep, art, ans, indef) : [ans], diag: true,
             note: note, say: withArt(ans, word) };
  }

  // Adjectives that go with any concrete noun, and the topics of the bank
  // with concrete things (banca.genericAdj, banca.concrete).
  var GENERIC_ADJ = BR.genericAdj || [];
  var CONCRETE = BR.concrete || {};

  function agreeItem(n, adjKey, plural) {
    var a = IDX.adj[adjKey];
    if (!a) return null;
    var g = plural ? pluralGender(n) : n[1];
    var word = plural ? n[2] : n[0];
    var form = plural ? (g === "m" ? a[2] : a[3]) : (g === "m" ? a[0] : a[1]);
    var art = plural ? defArt(word, g, true) : indefArt(word, g, false);
    return { id: "b:agr:" + n[0] + ":" + adjKey + (plural ? ":p" : ""), src: "banca", bank: "forme",
             type: "typed", prompt: "Concordá el adjetivo «" + a[0] + "» (" + a[4] + ")",
             stem: withArt(art, word) + " ___", answer: form, accept: [form], diag: true,
             note: word + " es " + (g === "m" ? "masculino" : "femenino") + (plural ? " plural" : " singular") +
               ": " + a[0] + " → " + form + "." + (n[6] ? " " + n[6] : ""),
             say: withArt(art, word) + " " + form };
  }

  function formsSession(state, size, focus) {
    if ((state.unlocked || 1) < FORME_WEEK) return [];
    var lvl = levelOf(state), wk = state.unlocked || 1;
    var nouns = B.nouns.filter(function (n) { return within(n[5], lvl); });
    if (!nouns.length) return [];
    // Los que más enseñan (banca.special): el artículo por el sonido, los
    // plurales irregulares, los heterogenéricos (con nota).
    var special = nouns.filter(function (n) { return BR.special ? BR.special(n) : !!n[6]; });
    var out = [];
    var kinds = focus ? [focus] : (BR.kinds || ["art", "art", "pl", "prep", "agr"]);
    for (var i = 0; i < (size || 12) * 3 && out.length < (size || 12); i++) {
      var k = pick(kinds), n = pick(Math.random() < 0.6 && special.length ? special : nouns);
      var x = null;
      if (k === "art") x = articleItem(n, Math.random() < 0.4);
      else if (k === "pl") x = countable(n) && (n[2] !== n[0] || Math.random() < 0.3) ? pluralItem(n) : null;
      else if (k === "prep") {
        var pl = Math.random() < 0.3, prep = pick(PREPS), indef = false;
        var g = pl ? pluralGender(n) : n[1];
        // the language may change it (no crase before its week) or use the
        // indefinite article (em + um = num)
        if (BR.prepFor) { var pf = BR.prepFor(prep, g, pl, wk, pick); prep = pf[0]; indef = pf[1]; }
        x = prepItem(n, prep, pl, indef);
      }
      else x = CONCRETE[n[4]] ? agreeItem(n, pick(GENERIC_ADJ), Math.random() < 0.4) : null;
      if (x && !out.some(function (y) { return y.id === x.id; })) out.push(x);
    }
    return out;
  }

  /* ---------------------------------------------------------- oraciones */

  // With or without the subject pronoun (banca.subject): leaving it out is
  // not an error (except before the words of banca.subjectKeep, where the
  // sentence would change).
  function variants(s) {
    var out = s.it.slice();
    s.it.forEach(function (v) {
      var m = BR.subject ? v.match(BR.subject) : null;
      if (m && !(BR.subjectKeep && BR.subjectKeep.test(m[2]))) out.push(m[2].charAt(0).toUpperCase() + m[2].slice(1));
    });
    return out.filter(function (x, i) { return out.indexOf(x) === i; });
  }

  function translateItem(i) {
    var s = B.sentences[i];
    return { id: "b:tr:" + i, src: "banca", bank: "tr", type: "translate",
             prompt: TX.translateTo || "Traducí", stem: s.es, answer: s.it[0], accept: variants(s),
             note: s.note, tags: s.tags, lvl: s.lvl, diag: true, say: s.it[0] };
  }

  // Otras respuestas para el hueco, leídas de las demás variantes aceptadas.
  // Dónde está la forma como palabra entera (no dentro de otra: «è» dentro
  // de «caffè», «é» dentro de «café»).
  function wordAt(text, form) {
    var re = new RegExp("(^|[^A-Za-zÀ-ÿ])" + form.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?![A-Za-zÀ-ÿ])");
    var m = re.exec(text);
    return m ? m.index + m[1].length : -1;
  }

  function gapAccept(s) {
    var main = s.it[0], form = s.gap[0], at = wordAt(main, form), out = [form];
    var pre = main.slice(0, at), post = main.slice(at + form.length);
    var preL = pre.toLowerCase(), postL = post.toLowerCase();
    s.it.slice(1).forEach(function (v) {
      var vl = v.toLowerCase();
      if (post.length && v.length > pre.length + post.length &&
          vl.indexOf(preL) === 0 && vl.slice(-post.length) === postL) {
        var mid = v.slice(pre.length, v.length - post.length).trim();
        if (mid && out.indexOf(mid) < 0 && mid.split(" ").length <= 4) out.push(mid);
      }
    });
    return out;
  }

  function gapItem(i) {
    var s = B.sentences[i];
    if (!s.gap) return null;
    var main = s.it[0], at = wordAt(main, s.gap[0]);
    if (at < 0) return null;
    var stem = main.slice(0, at) + "___ (" + s.gap[1] + ")" + main.slice(at + s.gap[0].length);
    return { id: "b:gap:" + i, src: "banca", bank: "gap", type: "typed",
             prompt: "Completá: «" + s.es + "»", stem: stem, answer: s.gap[0], accept: gapAccept(s),
             note: s.note, tags: s.tags, lvl: s.lvl, diag: true, context: main, say: main };
  }

  function errorItem(i) {
    var e = B.errors[i];
    return { id: "b:err:" + i, src: "banca", bank: "err", type: "fixerr",
             prompt: TX.findError || "Encontrá el error: tocá la palabra que está mal", stem: e.wrong,
             answer: e.right, accept: [e.right], bad: e.bad, good: e.good, goodAlt: e.alt || [],
             cat: e.cat, note: e.why, lvl: e.lvl, say: e.right };
  }

  function sentencePool(state, pred, key) {
    var lvl = levelOf(state), out = [];
    B.sentences.forEach(function (s, i) {
      if (within(s.lvl, lvl) && taught(s, state, key) && (!pred || pred(s))) out.push(i);
    });
    return out;
  }

  function prefer(state, ids, prefix) {
    // Primero las vencidas, después las nuevas, después el resto.
    var cards = state.cards || {}, now = Date.now();
    var due = ids.filter(function (i) { var c = cards[prefix + i]; return c && c.due <= now; });
    var fresh = ids.filter(function (i) { return !cards[prefix + i]; });
    var rest = ids.filter(function (i) { var c = cards[prefix + i]; return c && c.due > now; });
    return shuffle(due).concat(shuffle(fresh), shuffle(rest));
  }

  /* Traducir necesita artículos y un verbo detrás; las formas, los
     artículos y las preposiciones articuladas o contracciones (semana 3).
     Antes, el banco es una pared de posesivos y plurales que nadie explicó. */
  var TR_WEEK = 5, GAP_WEEK = 5, FORME_WEEK = 3;

  function translateSession(state, size, tagFilter) {
    if ((state.unlocked || 1) < TR_WEEK) return [];
    var ids = sentencePool(state, tagFilter && function (s) {
      return s.tags.some(function (t) { return tagFilter.indexOf(t) >= 0; });
    });
    return prefer(state, ids, "b:tr:").slice(0, size || 8).map(translateItem);
  }

  function gapSession(state, size, tagFilter) {
    if ((state.unlocked || 1) < GAP_WEEK) return [];
    var ids = sentencePool(state, function (s) {
      return s.gap && (!tagFilter || s.tags.some(function (t) { return tagFilter.indexOf(t) >= 0; }));
    }, "wg");
    return prefer(state, ids, "b:gap:").slice(0, size || 10).map(gapItem).filter(Boolean);
  }

  /* Encontrar un error necesita una oración que ya se pueda leer: antes de
     la semana 5 (presente regular) no hay con qué compararla. */
  var ERR_WEEK = 5;

  function errorSession(state, size, cats) {
    if ((state.unlocked || 1) < ERR_WEEK) return [];
    var lvl = levelOf(state), ids = [];
    B.errors.forEach(function (e, i) {
      if (within(e.lvl, lvl) && taught(e, state) && (!cats || cats.indexOf(e.cat) >= 0)) ids.push(i);
    });
    if (!ids.length) B.errors.forEach(function (e, i) {
      if (taught(e, state) && (!cats || cats.indexOf(e.cat) >= 0)) ids.push(i);
    });
    return prefer(state, ids, "b:err:").slice(0, size || 8).map(errorItem);
  }

  /* ------------------------------------------------------------ clínica */

  // Qué ejercicios curan qué error (banca.cure: las claves son las
  // categorías de Diagnosi.LABEL; tags, las etiquetas de las oraciones;
  // forms, el ejercicio de formas que corresponde).
  var CURE = BR.cure || {};

  // Las áreas más flojas del alumno; los errores recientes pesan más.
  function weakest(state, n) {
    var errs = (state && state.errs) || {}, now = Date.now();
    return Object.keys(errs).map(function (k) {
      var e = errs[k], age = (now - (e.last || 0)) / 86400000;
      return { cat: k, score: (e.n - (e.fixed || 0) * 0.5) * Math.pow(0.9, age) };
    // Un patrón, no un error suelto: al menos un par de errores recientes.
    }).filter(function (x) { return x.score >= 1.8 && CURE[x.cat]; })
      .sort(function (a, b) { return b.score - a.score; })
      .slice(0, n || 3);
  }

  function clinicaSession(state, size) {
    var weak = weakest(state, 3), out = [];
    size = size || 12;
    if (!weak.length) return [];
    weak.forEach(function (w, k) {
      var c = CURE[w.cat], share = Math.max(2, Math.round(size * (k === 0 ? 0.5 : 0.25)));
      var parts = [];
      if (c.err) parts = parts.concat(errorSession(state, Math.ceil(share / 2), c.err));
      if (c.tags) parts = parts.concat(gapSession(state, 2, c.tags), translateSession(state, 2, c.tags));
      if (c.forms) parts = parts.concat(formsSession(state, 3, c.forms));
      if (c.vocab) parts = parts.concat(vocabSession(state, 3).filter(function (x) { return x.type === "typed"; }));
      shuffle(parts).slice(0, share).forEach(function (x) {
        x.clinic = w.cat;
        out.push(x);
      });
    });
    return shuffle(out).slice(0, size);
  }

  /* ------------------------------------------------------------ repaso */

  function item(id) {
    if (!B) return null;
    var p = id.split(":");
    if (p[0] !== "b") return null;
    if (p[1] === "voc") {
      var key = p.slice(2).join(":");
      if (IDX.noun[key]) return vocabWrite(IDX.noun[key], "n");
      if (IDX.verb[key]) return vocabWrite(IDX.verb[key], "v");
      if (IDX.adj[key]) return vocabWrite(IDX.adj[key], "a");
      if (IDX.word[key]) return vocabWrite(IDX.word[key], "w");
      return null;
    }
    if (p[1] === "art" && IDX.noun[p[2]]) return articleItem(IDX.noun[p[2]], p[3] === "p");
    if (p[1] === "pl" && IDX.noun[p[2]]) return pluralItem(IDX.noun[p[2]]);
    if (p[1] === "prep" && IDX.noun[p[3]]) return prepItem(IDX.noun[p[3]], p[2], p[4] === "p", p[4] === "u");
    if (p[1] === "agr" && IDX.noun[p[2]]) return agreeItem(IDX.noun[p[2]], p[3], p[4] === "p");
    if (p[1] === "tr" && B.sentences[+p[2]]) return translateItem(+p[2]);
    if (p[1] === "gap" && B.sentences[+p[2]]) return gapItem(+p[2]);
    if (p[1] === "err" && B.errors[+p[2]]) return errorItem(+p[2]);
    return null;
  }

  // Un ítem para la pausa del café: una oración al nivel del alumno.
  function pausaItem(state) {
    var r = Math.random();
    if (r < 0.4) return translateSession(state, 1)[0];
    if (r < 0.7 && (state.unlocked || 1) >= ERR_WEEK) return errorSession(state, 1)[0];
    return gapSession(state, 1)[0];
  }

  function stats() {
    if (!B) return null;
    return { nouns: B.nouns.length, verbs: B.verbs.length, adjectives: B.adjectives.length,
             words: B.words.length, sentences: B.sentences.length, errors: B.errors.length };
  }

  var api = {
    load: load,
    loaded: loaded,
    levelOf: levelOf,
    defArt: defArt,
    indefArt: indefArt,
    CONTR: CONTR,
    vocabChoice: vocabChoice,
    vocabWrite: vocabWrite,
    vocabSession: vocabSession,
    vocabSessionFor: vocabSessionFor,
    hasWord: hasWord,
    articleItem: articleItem,
    pluralItem: pluralItem,
    prepItem: prepItem,
    agreeItem: agreeItem,
    formsSession: formsSession,
    translateItem: translateItem,
    translateSession: translateSession,
    gapItem: gapItem,
    gapSession: gapSession,
    errorItem: errorItem,
    errorSession: errorSession,
    ERR_WEEK: ERR_WEEK,
    TR_WEEK: TR_WEEK, GAP_WEEK: GAP_WEEK, FORME_WEEK: FORME_WEEK, CRASE_WEEK: CRASE_WEEK,
    weakest: weakest,
    clinicaSession: clinicaSession,
    CURE: CURE,
    item: item,
    pausaItem: pausaItem,
    stats: stats,
    bank: function () { return B; }
  };

  if (typeof module === "object" && module.exports) module.exports = api;
  else root.Banca = api;
})(typeof window !== "undefined" ? window : globalThis);
