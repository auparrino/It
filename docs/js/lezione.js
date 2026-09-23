/*
 * Lezione giocabile: la teoria di ogni settimana diventa una sequenza di
 * schermate brevi, e dopo ogni blocco con esempi o tabella arriva una
 * domanda lampo costruita con il materiale del blocco stesso.  Leggere e
 * subito recuperare (retrieval practice) fissa più che rileggere.
 */
(function (root) {
  "use strict";

  function strip(s) {
    return String(s == null ? "" : s).replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1").trim();
  }

  function shuffle(a, rnd) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(rnd() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function uniq(list) {
    var seen = {};
    return list.filter(function (x) { var k = x.toLowerCase(); if (!x || seen[k]) return false; seen[k] = 1; return true; });
  }

  function usable(s) { return s && s.length <= 60 && s.indexOf(" / ") < 0 && !/^[-—–…]*$/.test(s); }

  // All examples of the lesson, as distractor material.
  function allEx(lesson) {
    var out = [];
    lesson.blocks.forEach(function (b) { (b.ex || []).forEach(function (p) { out.push([strip(p[0]), strip(p[1])]); }); });
    return out.filter(function (p) { return usable(p[0]) && usable(p[1]); });
  }

  /* Trap versions of a right sentence: the errors a Spanish speaker makes
     (auxiliary, agreement, article, contraction, double consonants). */
  var AUX = { "sono": "ho", "sei": "hai", "è": "ha", "siamo": "abbiamo", "siete": "avete", "ero": "avevo", "era": "aveva",
              "ho": "sono", "hai": "sei", "ha": "è", "abbiamo": "siamo", "avete": "siete", "hanno": "sono" };
  var ART = { "il": "lo", "lo": "il", "la": "le", "le": "la", "gli": "i", "i": "gli", "un": "uno", "uno": "un" };
  var SPLIT = { "al": "a il", "del": "di il", "nel": "in il", "dal": "da il", "sul": "su il", "alla": "a la",
                "della": "di la", "nella": "in la", "ai": "a i", "dei": "di i", "nei": "in i", "alle": "a le", "delle": "di le" };
  var ENDS = [["ata", "ato"], ["ato", "ata"], ["ati", "ate"], ["ate", "ati"], ["uto", "uta"], ["ito", "ita"],
              ["ano", "a"], ["iamo", "ano"], ["ete", "ono"], ["ebbe", "ebbero"], ["essi", "esse"],
              ["oso", "osa"], ["osi", "ose"], ["ivo", "iva"], ["ico", "ica"], ["ale", "ali"], ["ente", "enti"]];
  function traps(sentence, rnd) {
    var toks = sentence.split(" ");
    var cands = [];
    toks.forEach(function (t, i) {
      var m = t.match(/^([«"(]*)([A-Za-zÀ-ÿ']+)([.,;:!?»")]*)$/);
      if (!m) return;
      var w = m[2], low = w.toLowerCase();
      var put = function (nw) {
        if (w[0] !== low[0]) nw = nw.charAt(0).toUpperCase() + nw.slice(1);
        var c = toks.slice(); c[i] = m[1] + nw + m[3]; cands.push(c.join(" "));
      };
      var next = (toks[i + 1] || "").toLowerCase();
      if (AUX[low] && /(at|ut|it|ss|tt|rt|st|nt|ls|lt)[oaie]\b/.test(next)) put(AUX[low]);
      if (ART[low] && toks[i + 1]) put(ART[low]);
      if (SPLIT[low]) put(SPLIT[low]);
      if (/([bcdfglmnprstvz])\1/.test(low) && low.length > 4) put(low.replace(/([bcdfglmnprstvz])\1/, "$1"));
      if (low.length > 4) for (var k = 0; k < ENDS.length; k++) {
        if (low.slice(-ENDS[k][0].length) === ENDS[k][0]) { put(low.slice(0, -ENDS[k][0].length) + ENDS[k][1]); break; }
      }
    });
    return uniq(shuffle(cands, rnd)).filter(function (c) { return c !== sentence; });
  }

  // «¿Cómo se dice…?» from one of the block's examples.
  function exQuestion(lesson, b, rnd) {
    var pool = allEx(lesson);
    var mine = (b.ex || []).map(function (p) { return [strip(p[0]), strip(p[1])]; })
      .filter(function (p) { return usable(p[0]) && usable(p[1]); });
    if (!mine.length) return null;
    var pick = mine[Math.floor(rnd() * mine.length)];
    var known = {}; pool.forEach(function (p) { known[p[0].toLowerCase()] = 1; });
    var tr = traps(pick[0], rnd).filter(function (t) { return !known[t.toLowerCase()]; }).slice(0, 2);
    if (tr.length === 2) {
      return { kind: "trap", prompt: "¿Cuál está bien? «" + pick[1] + "»", stem: "", answer: pick[0],
               options: shuffle([pick[0]].concat(tr), rnd) };
    }
    // The most similar sentences are the useful distractors: same words,
    // another form (capiamo / capisco), not something obviously unrelated.
    var words = function (x) { return x.toLowerCase().replace(/[^a-zàèéìòù' ]/g, "").split(/\s+/); };
    var mw = words(pick[0]);
    var sim = function (x) {
      var w = words(x), n = 0;
      w.forEach(function (t) { if (mw.indexOf(t) >= 0) n += 2; else if (mw.some(function (m) { return m.slice(0, 4) === t.slice(0, 4) && t.length > 3; })) n += 1; });
      return n - Math.abs(w.length - mw.length) * 0.3 + rnd() * 0.5;
    };
    var others = uniq(shuffle(pool, rnd).map(function (p) { return p[0]; })
      .filter(function (x) { return x.toLowerCase() !== pick[0].toLowerCase(); })
      .sort(function (a, b) { return sim(b) - sim(a); })).slice(0, 2);
    if (others.length < 2) return null;
    return { kind: "ex", prompt: "¿Cómo se dice en italiano?", stem: pick[1], answer: pick[0],
             options: shuffle([pick[0]].concat(others), rnd) };
  }

  // «Completá la tabla» from one cell of the block's table.
  function tableQuestion(b, rnd) {
    var t = b.table;
    if (!t || !t.rows || t.rows.length < 3 || t.rows[0].length < 2) return null;
    var tries = [];
    t.rows.forEach(function (r, ri) {
      for (var c = 1; c < r.length; c++) {
        var cell = strip(r[c]);
        if (!usable(cell) || cell.length > 32) continue;
        var col = uniq(t.rows.map(function (x) { return strip(x[c]); }).filter(function (x) {
          return usable(x) && x.length <= 32 && x.toLowerCase() !== cell.toLowerCase();
        }));
        if (col.length >= 2 && strip(r[0])) tries.push({ ri: ri, c: c, cell: cell, col: col });
      }
    });
    if (!tries.length) return null;
    var p = tries[Math.floor(rnd() * tries.length)];
    var head = t.head || [];
    var rowLabel = strip(t.rows[p.ri][0]);
    var colLabel = strip(head[p.c] || "");
    return { kind: "table", prompt: "Completá la tabla",
             stem: (strip(head[0]) ? strip(head[0]) + ": " : "") + rowLabel + (colLabel ? " → " + colLabel : ""),
             answer: p.cell, options: shuffle([p.cell].concat(shuffle(p.col, rnd).slice(0, 2)), rnd) };
  }

  // The playable sequence: intro, then each block followed by its check.
  function steps(lesson, rnd) {
    rnd = rnd || Math.random;
    var out = [{ kind: "intro" }];
    lesson.blocks.forEach(function (b, i) {
      // Tabla y ejemplos juntos no entran en una pantalla: dos pasos.
      if (b.table && b.ex && b.ex.length) {
        out.push({ kind: "block", i: i, part: "a" });
        out.push({ kind: "block", i: i, part: "b" });
      } else out.push({ kind: "block", i: i });
      var q = (b.table && tableQuestion(b, rnd)) || (b.ex && exQuestion(lesson, b, rnd));
      if (q) { q.block = i; out.push({ kind: "quiz", q: q }); }
    });
    return out;
  }

  var api = { steps: steps, traps: traps, strip: strip, exQuestion: exQuestion, tableQuestion: tableQuestion };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Lezione = api;
})(this);
