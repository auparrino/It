/*
 * Referencia: «¿Cómo se usa de verdad?» y «Mi gramática».
 *
 * Concordancias.  Al tocar una palabra (el glosario de tocar, el «Palabra
 * por palabra», las palabras de la semana) se ven de 5 a 8 oraciones reales
 * del curso —lecturas, frases, banco, ejemplos de las lecciones y de las
 * palabras— con la forma resaltada, solo de lo que el alumno ya puede leer
 * (semana ≤ la desbloqueada), y un mini ejercicio: de dos usos, cuál está
 * bien.  Aprendizaje basado en datos: mirar muchos usos reales de una forma
 * enseña su gramática y sus combinaciones mejor que una regla sola (Boulton
 * & Cobb 2017, metaanálisis: d ≈ 0,95).
 *
 * «Mi gramática».  El índice de todas las construcciones vistas hasta la
 * semana actual (los bloques de las lecciones: título, regla corta, tabla),
 * cada una con ejemplos de las lecturas, cuántas veces se acertó y se falló
 * (tarjetas de los ejercicios de esa semana que usan sus formas, el registro
 * de errores, el banco y los mini ejercicios de acá) y un estado: vista,
 * practicada o dominada.  Se puede buscar.
 *
 * Todo sale de lo que ya trae el paquete del idioma (course.json,
 * bank.json, glosario, Letture, Frasi, el conjugador, Lezione.traps): el
 * núcleo no nombra ningún idioma.  La lógica no necesita el DOM y se prueba
 * en node (tools/lib/test_referencia.js); la parte de pantalla se activa
 * cuando app.js llama a Referencia.attach(hooks).
 *
 *   Referencia.setData({ course, bank, gloss })
 *   Referencia.concordance("andato", { week: 12 })
 *     → { term, lemma, es, forms, hits: [{ t, es, w, src, label, marks }], total, later }
 *   Referencia.grammar(12)  → [{ id, week, h, r, table, forms, … }]
 *   Referencia.exercise({ forms, hits }, 12, rnd) → { right, wrong, why, good, bad }
 *   Referencia.blockStats(block, state) → { ok, ko, status }
 */
(function (root) {
  "use strict";

  var D = { course: null, bank: null, gloss: null };
  var CORPUS = null;          // [{ t, low, es, w, src, label, ref, toks: [[form, start, end]], seq: [form] }]
  var INDEX = null;           // form → [sentence index]
  var LEMMA = null;           // lemma → [forms from the glossary]
  var BLOCKS = null;          // every block of every lesson, with its forms
  var ITEMS_BY_WEEK = null;

  var L = "a-zà-öø-ÿ";
  var TOKEN_RE = new RegExp("[" + L + "]+(?:-[" + L + "]+)*'?", "gi");

  var SRC = {
    lettura: ["📖", "Lectura"], frase: ["💬", "Frase"], banco: ["🏦", "Banco"],
    leccion: ["📘", "Lección"], palabra: ["📚", "Palabra"]
  };
  var SRC_ORDER = ["lettura", "frase", "banco", "leccion", "palabra"];

  function lower(s) { return String(s == null ? "" : s).replace(/[’`]/g, "'").toLowerCase(); }
  function plain(s) { return lower(s).normalize("NFD").replace(/[̀-ͯ]/g, ""); }
  function strip(s) {
    return String(s == null ? "" : s).replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1").trim();
  }

  function setData(d) {
    d = d || {};
    // only what depends on what changed is rebuilt (the glossary arrives
    // after the course: the corpus stays)
    if (d.course !== undefined && d.course !== D.course) { D.course = d.course; CORPUS = INDEX = BLOCKS = ITEMS_BY_WEEK = null; }
    if (d.bank !== undefined && d.bank !== D.bank) { D.bank = d.bank; CORPUS = INDEX = BLOCKS = null; }
    if (d.gloss !== undefined && d.gloss !== D.gloss) { D.gloss = d.gloss; LEMMA = null; }
  }
  function bank() { return D.bank || (root.Banca && root.Banca.loaded && root.Banca.loaded() ? root.Banca.bank() : null); }

  /* ------------------------------------------------------------ el corpus */

  // Tokens of a text with where they are: a hyphenated word counts whole
  // and by parts (chamo-me → chamo-me, chamo, me).
  function tokenize(text) {
    var t = String(text).replace(/[’`]/g, "'"), out = [], seq = [], m;
    TOKEN_RE.lastIndex = 0;
    while ((m = TOKEN_RE.exec(t))) {
      var w = m[0].toLowerCase(), at = m.index;
      if (w.indexOf("-") > 0) {
        out.push([w, at, at + w.length]);
        var off = at;
        w.split("-").forEach(function (p) { out.push([p, off, off + p.length]); seq.push([p, off, off + p.length]); off += p.length + 1; });
      } else {
        var tok = [w, at, at + w.length];
        out.push(tok); seq.push(tok);
        // l'uomo → «l'» and also «l»: dell'anno is found as dell'
        if (/'$/.test(w)) out.push([w.slice(0, -1), at, at + w.length - 1]);
      }
    }
    return { toks: out, seq: seq };
  }

  function sentencesOf(par) {
    return (String(par).match(/[^.!?…]+(?:[.!?…]+[»"”)]*|$)/g) || [])
      .map(function (s) { return s.replace(/^[\s—–\-»"”]+/, "").trim(); })
      .filter(Boolean);
  }

  function add(list, seen, t, es, w, src, label, ref) {
    t = strip(t).replace(/\s+/g, " ");
    if (!t || /_{2,}| \/ /.test(t)) return;
    var key = lower(t).replace(/[^a-zà-öø-ÿ' ]/g, "").replace(/\s+/g, " ").trim();
    if (!key || seen[key]) return;
    var tk = tokenize(t);
    if (tk.seq.length < 3 || tk.seq.length > 30) return;
    seen[key] = 1;
    list.push({ t: t, es: es || "", w: +w || 1, src: src, label: label || "", ref: ref || "", toks: tk.toks, seq: tk.seq });
  }

  function corpus() {
    if (CORPUS) return CORPUS;
    var list = [], seen = {};
    // Readings: every sentence of every text (the story, culture, «La settimana»).
    var LT = root.Letture;
    ((LT && LT.EPISODI) || []).forEach(function (ep) {
      String(ep.text || "").split(/\n+/).forEach(function (par) {
        sentencesOf(par).forEach(function (s) { add(list, seen, s, "", ep.week, "lettura", ep.title, ep.id); });
      });
    });
    // Conversation phrases.
    var FR = root.Frasi;
    ((FR && FR.ALL) || []).forEach(function (f) {
      var sc = FR.scene ? FR.scene(f.scene) : null;
      add(list, seen, f.t || f.it, f.es, f.week || 1, "frase", sc ? sc.name : "", f.id);
    });
    // Sentences of the bank (the first accepted version).
    var B = bank();
    ((B && B.sentences) || []).forEach(function (s, i) {
      var t = s.it && s.it[0];
      if (t) add(list, seen, t, s.es, s.w || s.wg || 1, "banco", "", "b:" + i);
    });
    // The lessons' examples and the examples of the week's words.
    var C = D.course;
    ((C && C.weeks) || []).forEach(function (w) {
      ((w.lesson && w.lesson.blocks) || []).forEach(function (b, i) {
        (b.ex || []).forEach(function (p) {
          if (/\*[^*\s]+\*[a-zà-ÿ]|[a-zà-ÿ]\*[^*\s]+\*/i.test(p[0])) return;   // «*j*azz»: spelling, not usage
          add(list, seen, p[0], p[1], w.week, "leccion", b.h, blockId(w.week, i));
        });
      });
      (w.vocab || []).forEach(function (v) { if (v[2]) add(list, seen, v[2], "", w.week, "palabra", v[0], "v:" + v[0]); });
    });
    CORPUS = list;
    INDEX = {};
    list.forEach(function (s, k) {
      var mine = {};
      s.toks.forEach(function (t) { if (!mine[t[0]]) { mine[t[0]] = 1; (INDEX[t[0]] = INDEX[t[0]] || []).push(k); } });
    });
    return CORPUS;
  }

  /* -------------------------------------------------------- las formas */

  function lemmaIndex() {
    if (LEMMA) return LEMMA;
    LEMMA = {};
    var g = D.gloss || {};
    Object.keys(g).forEach(function (k) {
      var e = g[k];
      if (!e || !e[0] || / /.test(k)) return;
      (LEMMA[lower(e[0])] = LEMMA[lower(e[0])] || []).push(lower(k));
    });
    return LEMMA;
  }

  function articles() {
    var R = root.LANG && root.LANG.rules, d = R && R.distract, out = {};
    ((d && d.artSg) || []).concat((d && d.artPl) || []).forEach(function (a) { out[lower(a)] = 1; });
    return out;
  }

  // «a aliança» (the glossary brings nouns with their article) → «aliança».
  function bareTerm(t) {
    var ws = lower(t).trim().split(/\s+/), arts = articles();
    if (ws.length > 1 && arts[ws[0].replace(/'$/, "")]) ws = ws.slice(1);
    if (ws.length === 1 && /^[a-zà-öø-ÿ]+'[a-zà-öø-ÿ]/.test(ws[0])) ws = [ws[0].split("'")[1]];   // l'amico → amico
    return ws.join(" ");
  }

  function verbForms(inf) {
    var C = root.Conj, out = [];
    if (!C || !inf || / /.test(inf)) return out;
    var known = false;
    try { known = !!(C.info && C.info(inf)); } catch (e) { known = false; }
    if (!known) return out;
    (C.SIMPLE_TENSES || []).forEach(function (t) {
      var fs;
      try { fs = C.conjugate(inf, t, { partial: true }); } catch (e) { return; }
      (fs || []).forEach(function (f) { if (f) out.push(lower(String(f).split(" ").pop())); });
    });
    try { var pp = C.participle(inf); if (pp) out.push(lower(pp)); } catch (e) { /* sin participio */ }
    try { var ge = C.gerund && C.gerund(inf); if (ge) out.push(lower(ge)); } catch (e) { /* sin gerundio */ }
    return out;
  }

  /* The forms of a word: the word, its lemma, the other forms the glossary
     knows for the lemma and, for a verb, its conjugation. */
  function formsOf(term) {
    var t = bareTerm(term), g = D.gloss || {};
    var e = g[lower(term)] || g[t] || null;
    var lemma = e ? bareTerm(e[0]) : t;
    var out = [t];
    var push = function (f) { f = lower(f).trim(); if (f && out.indexOf(f) < 0) out.push(f); };
    push(lemma);
    (lemmaIndex()[lower(e ? e[0] : t)] || []).forEach(push);
    if (lemma !== lower(e ? e[0] : t)) (lemmaIndex()[lemma] || []).forEach(push);
    verbForms(lemma).forEach(push);
    return { term: t, lemma: lemma, es: e ? e[1] : "", forms: out };
  }

  /* ------------------------------------------------------- concordancias */

  // Where the form is in the sentence: [start, end] or null.
  function find(s, form) {
    var ws = form.split(/\s+/);
    if (ws.length === 1) {
      for (var i = 0; i < s.toks.length; i++) if (s.toks[i][0] === form) return [s.toks[i][1], s.toks[i][2]];
      return null;
    }
    for (var k = 0; k + ws.length <= s.seq.length; k++) {
      var ok = true;
      for (var j = 0; j < ws.length && ok; j++) if (s.seq[k + j][0] !== ws[j]) ok = false;
      if (ok) return [s.seq[k][1], s.seq[k + ws.length - 1][2]];
    }
    return null;
  }

  function candidates(forms) {
    corpus();
    var ids = {};
    forms.forEach(function (f) {
      var first = f.split(/\s+/)[0];
      (INDEX[first] || []).forEach(function (k) { ids[k] = 1; });
    });
    return Object.keys(ids).map(Number);
  }

  function marksIn(s, forms) {
    var marks = [];
    forms.forEach(function (f) {
      var m = find(s, f);
      if (m && !marks.some(function (x) { return m[0] < x[1] && x[0] < m[1]; })) marks.push(m);
    });
    return marks.sort(function (a, b) { return a[0] - b[0]; });
  }

  /* Up to opts.max sentences (8) with the forms, only from week ≤ opts.week:
     the exact form first, then the other forms; sources taken in turns so
     the page shows readings, phrases and the bank; short sentences first. */
  function pickHits(forms, opts) {
    opts = opts || {};
    var week = opts.week || 52, max = opts.max || 8, exact = opts.exact || [];
    var skip = opts.skip || null;
    var all = candidates(forms), later = 0, total = 0, buckets = {};
    all.forEach(function (k) {
      var s = CORPUS[k];
      if (skip && skip(s)) return;
      var marks = marksIn(s, forms);
      if (!marks.length) return;
      if (s.w > week) { if (!later || s.w < later) later = s.w; return; }
      total++;
      var isExact = exact.some(function (f) { return !!find(s, f); });
      var n = s.seq.length;
      var score = (isExact ? 100 : 0) - Math.abs(n - 9) - (n > 18 ? 10 : 0) + (s.es ? 2 : 0) + s.w / 52;
      (buckets[s.src] = buckets[s.src] || []).push({ s: s, marks: marks, score: score, exact: isExact });
    });
    Object.keys(buckets).forEach(function (b) { buckets[b].sort(function (x, y) { return y.score - x.score || x.s.t.length - y.s.t.length; }); });
    var out = [], round = 0, more = true;
    while (out.length < max && more) {
      more = false;
      // exact matches of every source before the other forms
      SRC_ORDER.forEach(function (src) {
        var b = buckets[src];
        if (!b || out.length >= max) return;
        if (b.length > round) { more = true; out.push(b[round]); }
      });
      round++;
    }
    out.sort(function (a, b) { return (b.exact ? 1 : 0) - (a.exact ? 1 : 0); });
    return {
      hits: out.map(function (h) {
        return { t: h.s.t, es: h.s.es, w: h.s.w, src: h.s.src, label: h.s.label, ref: h.s.ref, marks: h.marks, exact: h.exact };
      }),
      total: total, later: later
    };
  }

  function concordance(term, opts) {
    opts = opts || {};
    var f = formsOf(term);
    var r = pickHits(f.forms, { week: opts.week, max: opts.max, exact: [f.term] });
    return { kind: "word", term: f.term, lemma: f.lemma, es: f.es, forms: f.forms, hits: r.hits, total: r.total, later: r.later };
  }

  /* ------------------------------------------------------ las construcciones */

  function blockId(week, i) { return "w" + week + "b" + i; }

  /* The forms a block teaches: what its examples mark (*sono andato*), then
     what its rule marks; whole words only, up to four words each. */
  function blockForms(b) {
    var out = [];
    var take = function (text, fromEx) {
      var re = /\*([^*]+)\*/g, m, s = String(text || "");
      while ((m = re.exec(s))) {
        var before = s.charAt(m.index - 1), after = s.charAt(m.index + m[0].length);
        if (/[a-zà-öø-ÿ]/i.test(before) || /[a-zà-öø-ÿ]/i.test(after)) continue;   // part of a word
        m[1].split(/\s*(?:,|\/|;|…|\.\.\.)\s*/).forEach(function (f) {
          f = lower(f).replace(/[^a-zà-öø-ÿ' -]/g, " ").replace(/\s+/g, " ").trim();
          if (!f || /^-|-$/.test(f) || f.split(" ").length > 4 || f.length < 1) return;
          if (!fromEx && f.split(" ").length === 1 && f.length < 3) return;
          if (out.indexOf(f) < 0) out.push(f);
        });
      }
    };
    (b.ex || []).forEach(function (p) { take(p[0], true); });
    take(b.r, false);
    // Only forms of the language (the rule also marks Spanish: *puedo*,
    // *de salud*): every word must be in the course's sentences.
    corpus();
    out = out.filter(function (f) { return f.split(" ").every(function (w) { return INDEX[w]; }); });
    // Subject pronouns and the little words the lessons never highlight
    // (LANG.hlStop) are not the construction: they are in every sentence.
    var skip = {}, C = root.Conj, LG = root.LANG || {};
    ((C && C.PERSONS) || []).forEach(function (p) { String(p).split("/").forEach(function (x) { skip[lower(x).trim()] = 1; }); });
    Object.keys(LG.hlStop || {}).forEach(function (w) { skip[lower(w)] = 1; });
    var real = out.filter(function (f) { return !skip[f]; });
    if (real.length) out = real;
    // A block with real forms drops the tiny ones (e, a, o): they are everywhere.
    if (out.some(function (f) { return f.length >= 3 || / /.test(f); }))
      out = out.filter(function (f) { return f.length >= 3 || / /.test(f); });
    return out.slice(0, 14);
  }

  function blocks() {
    if (BLOCKS) return BLOCKS;
    BLOCKS = [];
    ((D.course && D.course.weeks) || []).forEach(function (w) {
      ((w.lesson && w.lesson.blocks) || []).forEach(function (b, i) {
        if (!b.h && !b.r) return;
        BLOCKS.push({ id: blockId(w.week, i), week: w.week, weekTitle: w.title, level: w.level, i: i,
                      h: b.h || "", r: b.r || "", table: b.table || null, ex: b.ex || [], warn: b.warn || "",
                      tip: b.tip || "", forms: blockForms(b) });
      });
    });
    return BLOCKS;
  }

  // The constructions seen up to the week.
  function grammar(week) {
    week = week || 52;
    return blocks().filter(function (b) { return b.week <= week; });
  }

  function blockById(id) {
    var bs = blocks();
    for (var i = 0; i < bs.length; i++) if (bs[i].id === id) return bs[i];
    return null;
  }

  function blockConcordance(b, opts) {
    opts = opts || {};
    var r = pickHits(b.forms, { week: opts.week, max: opts.max,
                                skip: function (s) { return s.ref === b.id; } });
    return { kind: "block", id: b.id, term: b.h, forms: b.forms, hits: r.hits, total: r.total, later: r.later };
  }

  function haystack(b) {
    var t = [b.h, b.r, b.warn, b.tip, b.weekTitle].concat(b.forms);
    if (b.table) t = t.concat(b.table.head || [], [].concat.apply([], b.table.rows || []));
    (b.ex || []).forEach(function (p) { t.push(p[0], p[1]); });
    return plain(strip(t.join(" ")));
  }

  // Search: every word of the query somewhere in the block (no accents needed).
  function search(list, q) {
    var ws = plain(q).split(/\s+/).filter(Boolean);
    if (!ws.length) return list;
    return list.filter(function (b) {
      var h = b._hay || (b._hay = haystack(b));
      return ws.every(function (w) { return h.indexOf(w) >= 0; });
    });
  }

  /* ---------------------------------------------------- aciertos y estado */

  function textHas(text, forms) {
    var s = { toks: tokenize(text).toks, seq: tokenize(text).seq };
    return forms.some(function (f) { return !!find(s, f); });
  }

  function itemsOfWeek(week) {
    if (!ITEMS_BY_WEEK) {
      ITEMS_BY_WEEK = {};
      ((D.course && D.course.items) || []).forEach(function (it) {
        var w = it.wk || it.w;
        if (w) (ITEMS_BY_WEEK[w] = ITEMS_BY_WEEK[w] || []).push(it);
      });
    }
    return ITEMS_BY_WEEK[week] || [];
  }

  /* How often the block was answered right and wrong: the review cards of
     that week's exercises (course and bank) that use its forms, the errors
     of the log that were about them, and the mini exercises of this page. */
  function blockStats(b, state) {
    state = state || {};
    var cards = state.cards || {}, ok = 0, ko = 0, seen = 0;
    var forms = b.forms;
    var count = function (id) {
      var c = cards[id];
      if (!c) return;
      seen++;
      ok += c.ok || 0;
      ko += c.lapses || 0;
    };
    if (forms.length) {
      itemsOfWeek(b.week).forEach(function (it) {
        if (cards[it.id] && textHas([it.stem, it.answer].join(" "), forms)) count(it.id);
      });
      var B = bank();
      ((B && B.sentences) || []).forEach(function (s, i) {
        if ((s.wg || s.w) !== b.week || !s.it) return;
        if (!cards["b:tr:" + i] && !cards["b:gap:" + i]) return;
        if (textHas(s.it[0], forms)) { count("b:tr:" + i); count("b:gap:" + i); }
      });
      ((B && B.errors) || []).forEach(function (e, i) {
        if (e.w === b.week && cards["b:err:" + i] && textHas(e.right, forms)) count("b:err:" + i);
      });
      // the error log: only forms long enough not to be everywhere
      var long = forms.filter(function (f) { return f.length >= 4 || / /.test(f); });
      if (long.length) (state.errLog || []).forEach(function (l) { if (l.e && textHas(l.e, long)) ko++; });
    }
    var mine = ((state.ref || {}).b || {})[b.id];
    if (mine) { ok += mine[0] || 0; ko += (mine[1] || 0) - (mine[0] || 0); }
    var n = ok + ko;
    var ws = (state.weekStats || {})[b.week] || {};
    var consolidated = !!(ws.prodDays && ws.prodDays.length >= 3) || !!ws.bossPassed;
    var status = "vista";
    if (n >= 3 || (mine && mine[1])) status = "practicada";
    if (n >= 6 && ok / n >= 0.85 && (consolidated || n >= 12)) status = "dominada";
    return { ok: ok, ko: ko, cards: seen, status: status };
  }

  /* -------------------------------------------------------- el ejercicio */

  function shuffle(a, rnd) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }

  // The first word that differs between two versions of a sentence.
  function diff(a, b) {
    var x = a.split(" "), y = b.split(" "), i = 0, j;
    while (i < x.length && i < y.length && x[i] === y[i]) i++;
    var ex = x.length - 1, ey = y.length - 1;
    while (ex > i && ey > i && x[ex] === y[ey]) { ex--; ey--; }
    j = { good: x.slice(i, ex + 1).join(" "), bad: y.slice(i, ey + 1).join(" ") };
    j.good = j.good.replace(/^[^a-zà-öø-ÿ']+|[^a-zà-öø-ÿ']+$/gi, "");
    j.bad = j.bad.replace(/^[^a-zà-öø-ÿ']+|[^a-zà-öø-ÿ']+$/gi, "");
    return j;
  }

  /* Two uses, one right: an error of the bank's clinic whose right sentence
     has the form (the typical error of a Spanish speaker, with its why), or
     one of the concordance sentences with a trap of the lessons
     (Lezione.traps, only the changes that are always wrong) on the form. */
  function exercise(q, week, rnd, opts) {
    rnd = rnd || Math.random;
    opts = opts || {};
    week = week || 52;
    var forms = q.forms || [], hits = q.hits || [];
    var B = bank(), errs = [];
    ((B && B.errors) || []).forEach(function (e) {
      if (!e || !e.right || !e.wrong || (e.w || 1) > week) return;
      if (!forms.length || !textHas(e.right, forms)) return;
      errs.push(e);
    });
    var own = opts.blockWeek ? errs.filter(function (e) { return e.w === opts.blockWeek; }) : [];
    var fromErr = function (list) {
      if (!list.length) return null;
      var e = shuffle(list, rnd)[0];
      return { right: e.right, wrong: e.wrong, why: e.why || "", good: e.good || "", bad: e.bad || "", src: "banco" };
    };
    var fromTraps = function (onForm) {
      var LZ = root.Lezione, g = D.gloss || {};
      if (!LZ || !LZ.traps) return null;
      var isWord = function (w) { return !!g[lower(w)]; };
      // the exact form the learner tapped first
      var hs = shuffle(hits, rnd).sort(function (a, b) { return (b.exact ? 1 : 0) - (a.exact ? 1 : 0); });
      for (var i = 0; i < hs.length; i++) {
        var t = hs[i].t, tr;
        try { tr = LZ.traps(t, rnd, week, isWord, true) || []; } catch (e) { tr = []; }
        for (var k = 0; k < tr.length; k++) {
          if (tr[k] === t) continue;
          var d = diff(t, tr[k]);
          if (!d.good || !d.bad || lower(d.good) === lower(d.bad)) continue;
          var g2 = " " + lower(d.good) + " ";
          var touches = forms.some(function (f) { return (" " + f + " ").indexOf(g2) >= 0 || g2.indexOf(" " + f + " ") >= 0; });
          if (onForm && !touches) continue;
          return { right: t, wrong: tr[k], why: "", good: d.good, bad: d.bad, src: hs[i].src };
        }
      }
      return null;
    };
    var r = fromErr(own) || fromTraps(true) || fromErr(errs) || fromTraps(false);
    return r && r.right !== r.wrong ? r : null;
  }

  /* ------------------------------------------------------------- guardado */

  // state.ref = { b: { blockId: [right, answered] }, w: { lemma: [right, answered] } }
  function record(state, kind, key, ok) {
    if (!state || !key) return;
    var R = state.ref || (state.ref = {});
    var bag = R[kind] || (R[kind] = {});
    var e = bag[key] || (bag[key] = [0, 0]);
    if (ok) e[0]++;
    e[1]++;
  }

  /* ================================================================ pantalla */

  var H = null;               // hooks from app.js
  var sheetQ = null;          // what the sheet shows
  var gramState = { q: "", filter: "" };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function mk(text) {
    return esc(text).replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>").replace(/\*([^*]+)\*/g, '<i class="it">$1</i>');
  }
  function st() { return (H && H.state && H.state()) || {}; }
  function curWeek() { return Math.min(Math.max(st().unlocked || 1, 1), 52); }
  function refresh() {
    if (!H) return;
    var g = H.glossary && H.glossary(), c = H.course && H.course();
    if ((g && g !== D.gloss) || (c && c !== D.course)) setData({ gloss: g || D.gloss, course: c || D.course });
  }

  function hlHtml(h) {
    var t = h.t, out = "", at = 0;
    h.marks.forEach(function (m) {
      out += esc(t.slice(at, m[0])) + '<mark class="ref-hl">' + esc(t.slice(m[0], m[1])) + "</mark>";
      at = m[1];
    });
    return out + esc(t.slice(at));
  }

  function hitsHtml(hits) {
    return '<ol class="ref-hits">' + hits.map(function (h) {
      var s = SRC[h.src] || ["•", ""];
      return '<li><span class="ref-t">' + hlHtml(h) + "</span>" +
        (h.es ? '<span class="ref-es">' + esc(h.es) + "</span>" : "") +
        '<small class="ref-src">' + s[0] + " " + s[1] + (h.label ? " · " + esc(h.label) : "") + " · sem. " + h.w + "</small></li>";
    }).join("") + "</ol>";
  }

  // Does the word have uses to show? (the glossary box offers the button)
  function has(term) {
    refresh();
    if (!term || !D.course) return false;
    try { refresh(); return concordance(term, { week: curWeek(), max: 1 }).total > 0; } catch (e) { return false; }
  }

  function exHtml(ex) {
    if (!ex) return '<p class="muted small">Todavía no hay un ejercicio para esto con lo que ya podés leer.</p>';
    var opts = [[ex.right, 1], [ex.wrong, 0]];
    if (Math.random() < 0.5) opts.reverse();
    return '<div class="ref-ex"><h3>¿Cuál está bien?</h3><div class="options ref-opts">' +
      opts.map(function (o) { return '<button class="opt" data-refans="' + o[1] + '">' + esc(o[0]) + "</button>"; }).join("") +
      '</div><div class="ref-why" hidden></div></div>';
  }

  function sheetHtml(q) {
    var head;
    if (q.kind === "block") {
      head = '<p class="muted small">¿Cómo se usa de verdad?</p><h2>' + mk(q.term) + "</h2>";
    } else {
      head = '<p class="muted small">¿Cómo se usa de verdad?</p><h2><i class="it">' + esc(q.term) + "</i>" +
        (q.lemma && q.lemma !== q.term ? ' <small class="muted">de <i class="it">' + esc(q.lemma) + "</i></small>" : "") + "</h2>" +
        (q.es ? '<p class="ref-gloss">' + esc(q.es) + "</p>" : "");
    }
    var body;
    if (q.hits.length) {
      var one = q.hits.length === 1 && q.total <= 1;
      body = '<p class="muted small">' + q.hits.length + (q.total > q.hits.length ? " de " + q.total : "") +
        (one ? " oración del curso que ya podés leer:" : " oraciones del curso que ya podés leer:") + "</p>" +
        hitsHtml(q.hits) + exHtml(q.ex);
    } else {
      body = '<p class="muted">Todavía no aparece en lo que ya podés leer.' +
        (q.later ? " La vas a ver en la semana " + q.later + "." : "") + "</p>";
    }
    return '<div class="ref-top"><button class="tab" id="refclose" aria-label="cerrar">✕ cerrar</button></div>' + head + body;
  }

  function openWord(term) {
    refresh();
    if (!D.course) return;
    var q = concordance(term, { week: curWeek() });
    q.ex = q.hits.length ? exercise(q, curWeek()) : null;
    showSheet(q);
  }
  function openBlock(id) {
    refresh();
    var b = blockById(id);
    if (!b) return;
    var q = blockConcordance(b, { week: curWeek() });
    q.ex = exercise(q, curWeek(), null, { blockWeek: b.week });
    showSheet(q);
  }

  function showSheet(q) {
    sheetQ = q;
    var box = document.getElementById("refsheet");
    if (!box) {
      box = document.createElement("div");
      box.id = "refsheet";
      box.className = "mcbox refsheet";
      box.setAttribute("role", "dialog");
      box.setAttribute("aria-label", "Cómo se usa");
      document.body.appendChild(box);
    }
    box.innerHTML = sheetHtml(q);
    box.scrollTop = 0;
    box.classList.add("on");
    document.body.classList.add("ref-open");
    var gb = document.getElementById("glossbox");
    if (gb) gb.classList.remove("on");
  }
  function closeSheet() {
    var box = document.getElementById("refsheet");
    if (box) box.classList.remove("on");
    document.body.classList.remove("ref-open");
    sheetQ = null;
  }

  function answer(btn) {
    var q = sheetQ, box = document.getElementById("refsheet");
    if (!q || !q.ex || !box) return;
    var ok = btn.getAttribute("data-refans") === "1";
    box.querySelectorAll("[data-refans]").forEach(function (b) {
      b.disabled = true;
      if (b.getAttribute("data-refans") === "1") b.classList.add("right");
      else if (b === btn) b.classList.add("wrong");
    });
    var ex = q.ex, why = box.querySelector(".ref-why");
    if (why) {
      why.hidden = false;
      why.innerHTML = (ok ? "<b>¡Bien!</b> " : "<b>Era la otra.</b> ") +
        (ex.good && ex.bad ? "Se dice <i class=\"it\">" + esc(ex.good) + "</i>, no <i class=\"it\">" + esc(ex.bad) + "</i>. " : "") +
        (ex.why ? esc(ex.why) : "") +
        ' <button class="tab" id="refagain">Otro ↻</button>';
      if (why.scrollIntoView) why.scrollIntoView({ block: "nearest" });
    }
    var s = st();
    if (q.kind === "block") record(s, "b", q.id, ok); else record(s, "w", q.lemma || q.term, ok);
    if (H && H.fx) try { H.fx(ok); } catch (e) { /* sin sonido */ }
    if (H && H.persist) H.persist();
  }

  function again() {
    var q = sheetQ;
    if (!q) return;
    var b = q.kind === "block" ? blockById(q.id) : null;
    q.ex = exercise(q, curWeek(), null, b ? { blockWeek: b.week } : null);
    showSheet(q);
  }

  /* The glossary box: «¿Cómo se usa?» under the meaning, when the word has
     uses in what the learner can already read.  txt is «palabra — significado». */
  function onGloss(box, txt) {
    if (!box) return false;
    box.classList.remove("has-ref");
    var term = String(txt || "").split(/\s+[—–-]\s+/)[0].trim();
    if (!term || !has(term)) return false;
    var b = document.createElement("button");
    b.className = "ref-go ref-gl";
    b.setAttribute("data-ref", term);
    b.textContent = "¿Cómo se usa? →";
    box.appendChild(document.createTextNode(" "));
    box.appendChild(b);
    box.classList.add("has-ref");
    return true;
  }

  // A small button next to a word (the week's words, the desglose).
  function button(term) {
    return '<button class="ref-go" data-ref="' + esc(term) + '" aria-label="Cómo se usa ' + esc(term) + '">usos</button>';
  }

  /* ------------------------------------------------------ Mi gramática */

  var STATUS = { vista: ["👁️", "vista"], practicada: ["✍️", "practicada"], dominada: ["⭐", "dominada"] };

  // The entry (Eu/Io and Treino): a card with the counts.
  function entry() {
    refresh();
    if (!D.course) return "";
    var week = curWeek(), list = grammar(week), s = st(), n = { vista: 0, practicada: 0, dominada: 0 };
    list.forEach(function (b) { n[blockStats(b, s).status]++; });
    return '<div class="card ref-entry"><h2>🧩 Mi gramática</h2>' +
      '<p class="muted">Las ' + list.length + " construcciones que viste hasta la semana " + week +
      ", con ejemplos de tus lecturas y cómo te va con cada una.</p>" +
      '<p class="ref-counts">' + ["vista", "practicada", "dominada"].map(function (k) {
        return '<span class="ref-st ' + k + '">' + STATUS[k][0] + " " + n[k] + " " + STATUS[k][1] + (n[k] === 1 ? "" : "s") + "</span>";
      }).join(" ") + "</p>" +
      '<div class="row"><button class="btn" data-ref-gram="1">Abrir mi gramática</button></div></div>';
  }

  function tableHtml(t) {
    if (!t || !t.rows || !t.rows.length) return "";
    var rows = t.rows.slice(0, 8);
    return '<div class="tw"><table class="gram">' +
      (t.head && t.head.join("") ? "<thead><tr>" + t.head.map(function (c) { return "<th>" + mk(c) + "</th>"; }).join("") + "</tr></thead>" : "") +
      "<tbody>" + rows.map(function (r) {
        return "<tr>" + r.map(function (c, k) { return "<td" + (k === 0 ? ' class="k"' : "") + ">" + mk(c) + "</td>"; }).join("") + "</tr>";
      }).join("") + "</tbody></table></div>" +
      (t.rows.length > rows.length ? '<p class="muted small">… y ' + (t.rows.length - rows.length) + " filas más en la lección.</p>" : "");
  }

  function itemHtml(b, s) {
    var x = blockStats(b, s), S = STATUS[x.status];
    return '<details class="ref-item" data-refblock="' + b.id + '"><summary>' +
      '<span class="ref-h">' + mk(b.h || strip(b.r).slice(0, 60)) + "</span>" +
      '<span class="ref-meta"><span class="ref-st ' + x.status + '" title="' + S[1] + '">' + S[0] + " " + S[1] + "</span>" +
      (x.ok + x.ko ? ' <span class="ref-score">✔ ' + x.ok + " · ✘ " + x.ko + "</span>" : "") + "</span></summary>" +
      '<div class="ref-body"></div></details>';
  }

  function bodyHtml(b) {
    var week = curWeek(), q = blockConcordance(b, { week: week, max: 3 });
    return (b.r ? '<p class="rule">' + mk(b.r) + "</p>" : "") + tableHtml(b.table) +
      (q.hits.length ? '<h3>En lo que leíste</h3>' + hitsHtml(q.hits)
        : '<p class="muted small">Todavía no aparece en tus lecturas.</p>') +
      '<div class="row"><button class="btn ghost" data-refblk="' + b.id + '">Ver usos y practicar →</button></div>';
  }

  function listHtml() {
    var week = curWeek(), s = st();
    var list = search(grammar(week), gramState.q);
    if (gramState.filter) list = list.filter(function (b) { return blockStats(b, s).status === gramState.filter; });
    if (!list.length) return '<p class="muted">Nada con eso. Probá con otra palabra (una forma, un tiempo, «artículo»…).</p>';
    var out = "", last = 0;
    list.slice().sort(function (a, b) { return b.week - a.week || a.i - b.i; }).forEach(function (b) {
      if (b.week !== last) {
        if (last) out += "</div>";
        out += '<h3 class="ref-wk">Semana ' + b.week + " · " + esc(b.weekTitle) + '</h3><div class="ref-group">';
        last = b.week;
      }
      out += itemHtml(b, s);
    });
    return out + "</div>";
  }

  function page() {
    refresh();
    var week = curWeek();
    return '<button class="btn ghost" id="refback">← Volver</button>' +
      "<h1>🧩 Mi gramática</h1>" +
      '<p class="lead">Todo lo que viste hasta la semana ' + week + ": la regla corta, la tabla y cómo aparece en " +
      "lo que ya leíste. Tocá una construcción para abrirla.</p>" +
      '<input type="search" id="refq" class="ref-q" placeholder="Buscar: una forma, un tiempo, «artículo»…" value="' + esc(gramState.q) + '" autocomplete="off">' +
      '<div class="chips ref-filters">' + [["", "Todas"], ["vista", "👁️ Vistas"], ["practicada", "✍️ Practicadas"], ["dominada", "⭐ Dominadas"]].map(function (f) {
        return '<button class="tab' + (gramState.filter === f[0] ? " on" : "") + '" data-reff="' + f[0] + '">' + f[1] + "</button>";
      }).join("") + "</div>" +
      '<div id="reflist">' + listHtml() + "</div>" +
      '<p class="muted science">🔬 Ver muchos usos reales de una forma y decidir cuál está bien enseña su gramática (aprendizaje basado en datos: Boulton y Cobb 2017).</p>';
  }

  function relist() {
    var l = document.getElementById("reflist");
    if (l) l.innerHTML = listHtml();
  }

  /* One listener for everything of this module (capture: before the
     screen's own handlers, so a «usos» inside a feedback panel does not also
     move the game on). */
  function onClick(e) {
    var t = e.target && e.target.closest ? e.target : null;
    if (!t) return;
    var el;
    if ((el = t.closest("[data-ref]"))) {
      e.preventDefault(); e.stopPropagation();
      openWord(el.getAttribute("data-ref"));
    } else if ((el = t.closest("[data-refblk]"))) {
      e.preventDefault(); e.stopPropagation();
      openBlock(el.getAttribute("data-refblk"));
    } else if ((el = t.closest("[data-ref-gram]"))) {
      e.preventDefault(); e.stopPropagation();
      if (H && H.open) H.open();
    } else if (t.closest("#refclose")) {
      e.preventDefault(); closeSheet();
    } else if ((el = t.closest("[data-refans]"))) {
      e.preventDefault(); e.stopPropagation();
      if (!el.disabled) answer(el);
    } else if (t.closest("#refagain")) {
      e.preventDefault(); e.stopPropagation(); again();
    } else if (t.closest("#refback")) {
      e.preventDefault();
      if (H && H.back) H.back();
    } else if ((el = t.closest("[data-reff]"))) {
      gramState.filter = el.getAttribute("data-reff");
      document.querySelectorAll("[data-reff]").forEach(function (b) { b.classList.toggle("on", b === el); });
      relist();
    } else {
      var box = document.getElementById("refsheet");
      if (box && box.classList.contains("on") && !box.contains(t)) closeSheet();
    }
  }

  function attach(hooks) {
    H = hooks || {};
    refresh();
    // the corpus is built while the learner looks at the first screen
    if (D.course && !CORPUS) setTimeout(function () { try { corpus(); blocks(); } catch (e) { /* más tarde */ } }, 1200);
    if (attach.done || typeof document === "undefined") return;
    attach.done = true;
    document.addEventListener("click", onClick, true);
    document.addEventListener("input", function (e) {
      if (e.target && e.target.id === "refq") { gramState.q = e.target.value; relist(); }
    });
    document.addEventListener("toggle", function (e) {
      var d = e.target;
      if (!d || !d.classList || !d.classList.contains("ref-item") || !d.open) return;
      var body = d.querySelector(".ref-body"), b = blockById(d.getAttribute("data-refblock"));
      if (body && b && !body.innerHTML) body.innerHTML = bodyHtml(b);
    }, true);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeSheet(); });
  }

  var api = {
    setData: setData, corpus: corpus, tokenize: tokenize, formsOf: formsOf, concordance: concordance,
    blocks: blocks, grammar: grammar, blockById: blockById, blockForms: blockForms, blockConcordance: blockConcordance,
    search: search, blockStats: blockStats, exercise: exercise, record: record, diff: diff,
    // pantalla
    attach: attach, onGloss: onGloss, button: button, entry: entry, page: page,
    openWord: openWord, openBlock: openBlock, close: closeSheet, has: has
  };
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.Referencia = api;
})(typeof window !== "undefined" ? window : globalThis);
