/*
 * «Lo esencial de la semana»: la página de resumen con que los manuales
 * cierran cada unidad (Nuovo Espresso, Dieci, Oi Brasil!, Schritte), hecha
 * tarjeta (auditorias/PLAN-2026-10-propuestas.md, Tanda 3).  Diez líneas
 * como mucho, armadas solas con lo que la semana ya trae:
 *   - 💬 para comunicar: un ejemplo de cada bloque de la lección (b.ex),
 *     repartidos, con el hueco en la forma que el bloque marca (*…*);
 *   - 📐 formas y reglas: las líneas de «Lo que se juega esta semana»
 *     (w.keys), con el hueco en una forma de la lengua que la lección enseña;
 *   - 🔑 palabras clave: de «Palabras de la semana» (w.vocab).
 * Primero se juega tapada («completá»: tocás un hueco y una ficha, con dos
 * fichas de más) y después queda como hoja de repaso, con el enlace de cada
 * línea a su bloque de teoría (Mi gramática, referencia.js).  Se ofrece al
 * terminar la lección, en la semana y en la Estación (las tres semanas que
 * repasa).
 *
 *   Esencial.card(w)                  → { week, lines: [{ kind, pre, answer, post, hint, block }] } o null
 *   Esencial.check(card, given)       → { ok, n, right: [bool] }   given: las respuestas, en orden
 *   Esencial.save(state, week, r)     guarda el resultado (state.esencial)
 *   Esencial.record(state, week)      { at, ok, n, best, plays } o null
 *   Esencial.bank(card, rnd)          las fichas: las respuestas y dos formas más de la lección
 *   Esencial.offerHtml(state, w, where)    el botón para abrirla (semana, lección hecha)
 *   Esencial.stationHtml(state, course, end)   las tres de la Estación
 *   Esencial.open(week, from) · owns · render · wire · attach   la pantalla «esencial»
 *
 * Guarda en state.esencial = { <semana>: { at, ok, n, best, plays } }.
 * Test: tools/lib/test_esencial.js.
 */
(function (root) {
  "use strict";

  var MAX = 10, MIN = 4;
  var WANT = { formula: 4, regla: 3, palabra: 3 };
  var KINDS = [["formula", "💬 Para comunicar"], ["regla", "📐 Formas y reglas"], ["palabra", "🔑 Palabras clave"]];
  var GAP = "___";
  // the letters of the languages of the course (with the accented ones and ß)
  var L = "A-Za-zÀ-ÖØ-öø-ɏ";
  var WORD = new RegExp("^[" + L + "][" + L + "' ]*$");

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function strip(s) { return String(s == null ? "" : s).replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1").trim(); }
  function low(s) { return String(s).toLowerCase(); }
  function shuffle(a, rnd) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor((rnd || Math.random)() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  // the *single-star* spans of a text (never the **bold** of the Spanish)
  function spans(t) {
    var out = [], re = /(^|[^*])\*([^*]+)\*(?!\*)/g, m;
    t = String(t || "");
    while ((m = re.exec(t))) out.push(m[2]);
    return out;
  }
  // a gap glued to letters («Dorm*iamo*»: an ending) asks for a piece of a word
  var GLUED_PRE = new RegExp("[" + L + "]$"), GLUED_POST = new RegExp("^[" + L + "]");
  function glued(pre, post) { return GLUED_PRE.test(pre) || GLUED_POST.test(post); }
  function balanced(s) { return (String(s).split("*").length - 1) % 2 === 0; }
  // a form fit for a gap: words of the language, one to three of them
  function fit(f) {
    f = String(f || "").trim();
    return f.length >= 2 && f.length <= 28 && WORD.test(f) && f.split(/\s+/).length <= 3;
  }
  function spread(list, n) {
    if (list.length <= n) return list.slice();
    var out = [];
    for (var k = 0; k < n; k++) out.push(list[Math.round(k * (list.length - 1) / Math.max(1, n - 1))]);
    return out;
  }

  /* What the lesson teaches (the forms it marks, block by block) and the
     Spanish it is explained in (the words outside the marks and the
     translations): a word of the key that is also Spanish is no gap. */
  // the columns of a table that are Spanish («Castellano», «Significa»…;
  // not «Para lo español, decí», which gives the forms of the language)
  var ES_COL = /espa|castell|signif|quiere decir/i, NOT_ES_COL = /decí/i;
  function lessonForms(lesson) {
    var forms = lesson.blocks.map(function (b) {
      var fs = [];
      [b.r, b.warn, b.tip].concat(b.p || [], (b.ex || []).map(function (e) { return e[0]; })).forEach(function (t) {
        spans(t).forEach(function (x) { fs.push(strip(x)); });
      });
      if (root.Lezione && root.Lezione.forms) try { fs = fs.concat(root.Lezione.forms(b)); } catch (e) { /* */ }
      return fs.filter(fit);
    });
    var es = {};
    lesson.blocks.forEach(function (b) {
      var t = [b.h, b.r, b.warn, b.tip].concat(b.p || []).join(" ").replace(/\*[^*]+\*/g, " ");
      (b.ex || []).forEach(function (e) { t += " " + e[1]; });
      // the Spanish of the tables: Lezione.forms takes their cells too
      var tb = b.table;
      if (tb && tb.head) tb.head.forEach(function (h, j) {
        if (j > 0 && ES_COL.test(h) && !NOT_ES_COL.test(h)) (tb.rows || []).forEach(function (r) { t += " " + strip(r[j]); });
      });
      low(t).split(new RegExp("[^" + L + "']+")).forEach(function (w) { if (w) es[w] = 1; });
    });
    // the forms marked in the examples: sure to be of the language, as written
    var marks = lesson.blocks.map(function (b) {
      var fs = [];
      (b.ex || []).forEach(function (e) {
        var raw = String(e[0] || "");
        spans(raw).forEach(function (x) {
          var i = raw.indexOf("*" + x + "*");   // a whole word, not an ending («Dorm*iamo*»)
          if (i >= 0 && !glued(raw.slice(0, i), raw.slice(i + x.length + 2))) fs.push(strip(x));
        });
      });
      return fs.filter(fit);
    });
    // byBlock: lowercased, to look up; marks and forms: as written, for the bank
    return { byBlock: forms.map(function (fs) { return fs.map(low); }), marks: marks, forms: forms, es: es };
  }
  function blockOf(LF, f) {
    f = low(f);
    for (var i = 0; i < LF.byBlock.length; i++) if (LF.byBlock[i].indexOf(f) >= 0) return i;
    return null;
  }
  function spanish(LF, f) {
    return low(f).split(/\s+/).every(function (w) { return LF.es[w]; });
  }

  // A line of w.keys with its gap, or null.
  function keyLine(key, LF, used) {
    var raw = String(key || ""), cands = [];
    var marked = spans(raw);
    if (marked.length) {
      marked.forEach(function (x) {
        var i = raw.indexOf("*" + x + "*");
        if (fit(x) && i >= 0) cands.push({ a: x, at: i, len: x.length + 2 });
      });
    } else {
      // no marks: a form the lesson marks, as a whole word of the key
      var seen = {};
      LF.byBlock.forEach(function (fs) {
        fs.forEach(function (f) {
          if (seen[f] || f.length < 3) return;
          seen[f] = 1;
          var m = new RegExp("(^|[^" + L + "'])(" + f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")(?![" + L + "'])", "i").exec(raw);
          if (m && !spanish(LF, f)) cands.push({ a: m[2], at: m.index + m[1].length, len: m[2].length });
        });
      });
    }
    var colon = raw.indexOf(":");
    cands = cands.filter(function (c) {
      return !used[low(c.a)] && balanced(raw.slice(0, c.at)) && !glued(raw.slice(0, c.at), raw.slice(c.at + c.len)) &&
        (marked.length || !spanish(LF, c.a));
    }).sort(function (a, b) {
      // a form the lesson teaches, after the label («Imperfetto: …»), the longest
      return ((blockOf(LF, b.a) != null) - (blockOf(LF, a.a) != null)) ||
        ((b.at > colon) - (a.at > colon)) || (b.a.length - a.a.length) || (a.at - b.at);
    });
    var c = cands[0];
    if (!c) return null;
    var pre = raw.slice(0, c.at), post = raw.slice(c.at + c.len);
    if (!strip(pre + post).replace(/[\s.,;:!?()«»–-]/g, "")) return null;      // nothing around the gap
    return { kind: "regla", pre: pre, answer: c.a, post: post, hint: "", block: blockOf(LF, c.a) };
  }

  // A line from the examples of a block: the sentence, its marked form as the gap.
  function exLine(b, i, used) {
    var ex = b.ex || [];
    for (var k = 0; k < ex.length; k++) {
      var raw = String(ex[k][0] || ""), es = strip(ex[k][1] || "");
      // one sentence, not a list of variants («Scusi! / Senta!»)
      if (strip(raw).length > 60 || !es || es.length > 70 || / \/ /.test(raw)) continue;
      var ms = spans(raw).filter(function (x) {
        var i = raw.indexOf("*" + x + "*");
        return fit(x) && !used[low(x)] && i >= 0 && !glued(raw.slice(0, i), raw.slice(i + x.length + 2));
      }).sort(function (a, b2) { return b2.length - a.length; });
      if (!ms.length) continue;
      var at = raw.indexOf("*" + ms[0] + "*"), pre = raw.slice(0, at), post = raw.slice(at + ms[0].length + 2);
      if (!strip(pre + post).replace(/[\s.,;:!?()«»–-]/g, "") || !balanced(pre)) continue;
      return { kind: "formula", pre: pre, answer: ms[0], post: post, hint: es, block: i };
    }
    return null;
  }

  var cache = {};
  function card(w) {
    if (!w || !w.lesson || !w.lesson.blocks || !w.lesson.blocks.length) return null;
    var ck = w.week + "|" + w.lesson.blocks.length + "|" + (w.keys || []).length;
    if (cache[ck]) return cache[ck];
    var LF = lessonForms(w.lesson), used = {};
    var take = function (l) { if (l) used[low(l.answer)] = 1; return l; };
    var formulas = [], rules = [], words = [];
    // a pool per kind, then the share of each (4 · 3 · 3), the rest filled
    var fpool = [];
    w.lesson.blocks.forEach(function (b, i) { var l = exLine(b, i, {}); if (l) fpool.push(l); });
    var kpool = (w.keys || []).slice();
    var vpool = (w.vocab || []).filter(function (v) { return v && fit(v[0]) && v[1]; });
    var addF = function (n) {
      spread(fpool.filter(function (l) { return formulas.indexOf(l) < 0; }), fpool.length).forEach(function (l) {
        if (formulas.length < n && !used[low(l.answer)]) formulas.push(take(l));
      });
    };
    var addR = function (n) {
      kpool.forEach(function (k, j) {
        if (rules.length >= n || rules.some(function (r) { return r.j === j; })) return;
        var l = keyLine(k, LF, used);
        if (l) { l.j = j; rules.push(take(l)); }
      });
    };
    var addW = function (n) {
      spread(vpool, vpool.length).forEach(function (v) {
        if (words.length >= n || used[low(v[0])]) return;
        words.push(take({ kind: "palabra", pre: "", answer: v[0], post: "", hint: strip(v[1]), block: blockOf(LF, v[0]) }));
      });
    };
    // spread over the lesson first; the other examples, to fill up
    var first = spread(fpool, Math.min(fpool.length, 6));
    fpool = first.concat(fpool.filter(function (l) { return first.indexOf(l) < 0; }));
    addF(WANT.formula); addR(WANT.regla); addW(WANT.palabra);
    var total = function () { return formulas.length + rules.length + words.length; };
    if (total() < MAX) addR(rules.length + MAX - total());
    if (total() < MAX) addF(formulas.length + MAX - total());
    if (total() < MAX) addW(words.length + MAX - total());
    var lines = formulas.concat(rules, words).slice(0, MAX).map(function (l) {
      return { kind: l.kind, pre: l.pre, answer: l.answer, post: l.post, hint: l.hint, block: l.block };
    });
    var out = lines.length >= MIN ? { week: w.week, title: w.title, lines: lines } : null;
    cache[ck] = out;
    return out;
  }

  /* The bank: the answers and two more forms of the lesson, near in size. */
  function bank(c, rnd, w) {
    var ans = c.lines.map(function (l) { return l.answer; }), have = {};
    ans.forEach(function (a) { have[low(a)] = 1; });
    var extra = [];
    if (w && w.lesson) {
      // the forms marked in the examples first: the cells of the tables
      // (Lezione.forms) lose their capitals and can be Spanish
      var LF = lessonForms(w.lesson);
      var pick = function (list) {
        var all = [];
        list.forEach(function (fs) {
          fs.forEach(function (f) { if (!have[low(f)] && f.length >= 3 && !spanish(LF, f)) { have[low(f)] = 1; all.push(f); } });
        });
        return shuffle(all, rnd);
      };
      extra = pick(LF.marks).slice(0, 2);
      if (extra.length < 2) extra = extra.concat(pick(LF.forms).slice(0, 2 - extra.length));
    }
    return shuffle(ans.concat(extra), rnd);
  }

  function same(a, b) { return low(strip(a)).replace(/\s+/g, " ").trim() === low(strip(b)).replace(/\s+/g, " ").trim(); }
  function check(c, given) {
    var right = c.lines.map(function (l, k) { return given[k] != null && same(given[k], l.answer); });
    var ok = right.filter(Boolean).length;
    return { ok: ok, n: c.lines.length, right: right };
  }

  function store(state) {
    if (!state.esencial || typeof state.esencial !== "object" || Array.isArray(state.esencial)) state.esencial = {};
    return state.esencial;
  }
  // an old or half-written record (no best, no n) still reads as numbers
  function record(state, week) {
    var r = state && state.esencial && state.esencial[week];
    if (!r || typeof r !== "object" || !(+r.n > 0)) return null;
    r.ok = +r.ok || 0;
    r.best = Math.max(+r.best || 0, r.ok);
    r.plays = +r.plays || 1;
    return r;
  }
  function save(state, week, r) {
    var s = store(state), prev = record(state, week) || {};
    s[week] = { at: Date.now(), ok: r.ok, n: r.n, best: Math.max(r.ok, prev.best || 0), plays: (prev.plays || 0) + 1,
                miss: r.right.map(function (x, k) { return x ? -1 : k; }).filter(function (k) { return k >= 0; }) };
    return { first: !prev.plays, rec: s[week] };
  }

  /* -------------------------------------------------------- los botones */

  function readWeek(state, week) { return !!(state && state.read && state.read[week]); }
  // The button to open the card: once the lesson is complete.
  function offerHtml(state, w, where) {
    if (!w || !readWeek(state, w.week) || !card(w)) return "";
    var r = record(state, w.week), c = card(w);
    var label = r ? "📝 Lo esencial de la semana · hoja de repaso (" + r.best + "/" + r.n + ")"
                  : "📝 Lo esencial de la semana: completá las " + c.lines.length;
    if (where === "lesson") {
      return '<p class="note esoffer">' + (r ? "Tu resumen de la semana queda como hoja de repaso." :
        "Antes de entrenar: el resumen de la semana en " + c.lines.length + " líneas, tapado. Completalo de memoria y te queda como hoja de repaso.") +
        ' <button class="btn ghost" data-esencial="' + w.week + '" data-esfrom="lesson">' + (r ? "📝 Ver" : "📝 Completar") + "</button></p>";
    }
    return '<div class="row esoffer"><button class="btn ghost" data-esencial="' + w.week + '">' + esc(label) + "</button></div>";
  }
  // The station: the three weeks it reviews, before and after the round.
  function stationHtml(state, course, end) {
    end = +end;
    if (!course || !course.weeks) return "";
    var E = root.Estacion, er = E && E.record ? E.record(state, end) : null, weak = {};
    ((er && er.rows) || []).forEach(function (x) { if (x && typeof x.k === "string" && x.k.charAt(0) === "w" && E.light && E.light(x) !== "verde") weak[+x.k.slice(2)] = 1; });
    var bs = [end - 2, end - 1, end].map(function (n) { return course.weeks[n - 1]; }).filter(function (w) {
      return w && readWeek(state, w.week) && card(w);
    });
    if (!bs.length) return "";
    return '<div class="esstation"><h3>📝 Lo esencial de las semanas ' + (end - 2) + "-" + end + "</h3>" +
      '<p class="muted small">El resumen de cada semana: si una salió floja, completalo otra vez tapado.</p><div class="row">' +
      bs.map(function (w) {
        var r = record(state, w.week);
        return '<button class="btn ghost" data-esencial="' + w.week + '" data-esfrom="estacion">' + (weak[w.week] ? "🟡 " : "") +
          "Semana " + w.week + (r ? " · " + r.best + "/" + r.n : "") + "</button>";
      }).join("") + "</div></div>";
  }

  /* ----------------------------------------------------------- pantalla */

  var H = null, cur = null;   // { week, from, mode: "play" | "sheet", bank, fill, sel, res }

  function attach(host) { H = host; }
  function owns(screen) { return screen === "esencial"; }
  function weekObj(week) { var co = H && H.course ? H.course() : null; return co && co.weeks ? co.weeks[week - 1] : null; }

  function open(week, from, mode) {
    var w = weekObj(+week), c = card(w);
    if (!c || !H) return false;
    var st = H.state();
    cur = { week: +week, from: from || "briefing", mode: mode || (record(st, +week) ? "sheet" : "play"), res: null };
    if (cur.mode === "play") startPlay(c, w);
    H.show("esencial");
    return true;
  }
  function startPlay(c, w) {
    cur.mode = "play";
    cur.bank = bank(c, Math.random, w).map(function (t) { return { t: t, at: -1 }; });
    cur.fill = c.lines.map(function () { return -1; });
    cur.sel = 0;
    cur.res = null;
  }
  function back() {
    var from = cur ? cur.from : "briefing";
    cur = null;
    if (H.back) H.back(from);
  }

  function langAttr() { var l = H && H.lang ? H.lang() : ""; return l ? ' lang="' + esc(l) + '"' : ""; }
  function mk(s) { return H && H.mk ? H.mk(s) : esc(strip(s)); }

  function lineHtml(l, k, play) {
    var gap;
    if (play) {
      var bi = cur.fill[k], res = cur.res, cls = "esgap" + (bi >= 0 ? " filled" : "") + (!res && cur.sel === k ? " sel" : "");
      if (res) cls += res.right[k] ? " right" : " wrong";
      gap = '<button class="' + cls + '" data-esg="' + k + '"' + (res ? " disabled" : "") + langAttr() + ">" +
        (bi >= 0 ? esc(cur.bank[bi].t) : GAP) + "</button>" +
        (res && !res.right[k] ? ' <b class="essol"' + langAttr() + ">→ " + esc(l.answer) + "</b>" : "");
    } else {
      gap = '<b class="esans"' + langAttr() + ">" + esc(l.answer) + "</b>";
    }
    var body = l.kind === "palabra"
      ? gap + ' <span class="muted">= ' + esc(l.hint) + "</span>"
      : "<span" + (l.kind === "formula" ? langAttr() : "") + ">" + mk(l.pre) + "</span>" + gap + "<span" + (l.kind === "formula" ? langAttr() : "") + ">" + mk(l.post) + "</span>" +
        (l.hint ? '<br><span class="muted small">' + esc(l.hint) + "</span>" : "");
    var tools = "";
    if (!play) {
      if (l.kind !== "regla") tools += ' <button class="tab" data-essay="' + k + '" aria-label="Escuchar">🔊</button>';
      if (l.block != null && root.Referencia) tools += ' <button class="tab" data-ref-gram="w' + cur.week + "b" + l.block + '">teoría →</button>';
    }
    return '<li class="esl">' + body + tools + "</li>";
  }
  function listHtml(c, play) {
    var k0 = 0, html = "";
    KINDS.forEach(function (kd) {
      var ls = [];
      c.lines.forEach(function (l, k) { if (l.kind === kd[0]) ls.push(lineHtml(l, k, play)); });
      if (ls.length) html += "<h3>" + kd[1] + '</h3><ol class="eslist" start="' + (k0 + 1) + '">' + ls.join("") + "</ol>";
      k0 += ls.length;
    });
    return html;
  }

  function render() {
    var w = cur && weekObj(cur.week), c = card(w);
    if (!c) return '<button class="btn ghost" id="esback">← volver</button>';
    var st = H.state(), r = record(st, cur.week);
    var head = '<button class="btn ghost" id="esback">← volver</button>' +
      "<h1>📝 Lo esencial · semana " + c.week + '</h1><p class="lead">' + esc(c.title || "") + "</p>";
    if (cur.mode === "play") {
      var res = cur.res, full = cur.fill.every(function (x) { return x >= 0; });
      return head +
        (res ? '<div class="card center"><div class="scorebig"><b>' + res.ok + "/" + res.n + "</b>" + (cur.xp ? "<span>+" + cur.xp + " xp</span>" : "") + "</div>" +
            '<p class="muted">' + (res.ok === res.n ? "Perfecta: la semana entera, de memoria." :
              "Lo que se te escapó está marcado. En la hoja de repaso cada línea lleva a su teoría.") + "</p>" +
            '<div class="row centerrow"><button class="btn" id="essheet">📄 Ver la hoja de repaso</button>' +
            '<button class="btn ghost" id="esagain">🔁 Otra vez</button></div></div>'
          : '<p class="muted">Completá las ' + c.lines.length + " líneas de memoria: tocá un hueco y después la ficha que va. " +
            "Sobran dos fichas. Tocá un hueco lleno para vaciarlo.</p>") +
        '<div class="card esen">' + listHtml(c, true) + "</div>" +
        (res ? "" : '<div class="card esbank"><div class="chips">' + cur.bank.map(function (b, i) {
            return '<button class="chip' + (b.at >= 0 ? " used" : "") + '" data-esb="' + i + '"' + (b.at >= 0 ? " disabled" : "") + langAttr() + ">" + esc(b.t) + "</button>";
          }).join("") + "</div>" +
          '<div class="row"><button class="btn" id="escheck"' + (full ? "" : " disabled") + ">Comprobar</button></div></div>");
    }
    return head +
      '<p class="muted">Tu hoja de repaso' + (r ? " · la última vez: " + r.ok + "/" + r.n + (r.best > r.ok ? " (tu mejor: " + r.best + ")" : "") : "") +
      ". Cada línea lleva a su bloque de teoría.</p>" +
      '<div class="card esen sheet">' + listHtml(c, false) + "</div>" +
      '<div class="row"><button class="btn" id="esagain">🔁 Completala otra vez, tapada</button></div>';
  }

  function place(bi) {
    var k = cur.sel;
    if (k == null || k < 0 || cur.fill[k] >= 0) k = cur.fill.indexOf(-1);
    if (k < 0) return;
    cur.fill[k] = bi;
    cur.bank[bi].at = k;
    // the next empty gap after this one (or the first)
    var nx = -1;
    for (var j = 1; j <= cur.fill.length; j++) { var t = (k + j) % cur.fill.length; if (cur.fill[t] < 0) { nx = t; break; } }
    cur.sel = nx;
  }
  function unplace(k) {
    var bi = cur.fill[k];
    if (bi >= 0) { cur.bank[bi].at = -1; cur.fill[k] = -1; }
    cur.sel = k;
  }
  function doCheck() {
    var w = weekObj(cur.week), c = card(w), st = H.state();
    var r = check(c, cur.fill.map(function (bi) { return bi >= 0 ? cur.bank[bi].t : null; }));
    var sv = save(st, cur.week, r);
    cur.res = r;
    cur.xp = sv.first ? 5 + r.ok : 0;
    if (cur.xp && H.gain) H.gain(cur.xp);
    if (H.persist) H.persist();
    H.render();
  }

  function wire(screen) {
    if (typeof document === "undefined") return;
    document.querySelectorAll("[data-esencial]").forEach(function (b) {
      b.onclick = function () { open(+b.getAttribute("data-esencial"), b.getAttribute("data-esfrom") || (screen === "gioco" ? "estacion" : "briefing")); };
    });
    if (!owns(screen) || !cur) return;
    var on = function (id, fn) { var b = document.getElementById(id); if (b) b.onclick = fn; };
    var w = weekObj(cur.week), c = card(w);
    on("esback", back);
    on("escheck", doCheck);
    on("essheet", function () { cur.mode = "sheet"; H.render(); });
    on("esagain", function () { startPlay(c, w); H.render(); });
    document.querySelectorAll("[data-esb]").forEach(function (b) {
      b.onclick = function () { place(+b.getAttribute("data-esb")); H.render(); };
    });
    document.querySelectorAll("[data-esg]").forEach(function (b) {
      b.onclick = function () { unplace(+b.getAttribute("data-esg")); H.render(); };
    });
    document.querySelectorAll("[data-essay]").forEach(function (b) {
      b.onclick = function () {
        var l = c.lines[+b.getAttribute("data-essay")];
        if (l && H.speak) H.speak(strip(l.pre + l.answer + l.post), true);
      };
    });
  }

  var api = { MAX: MAX, MIN: MIN, card: card, bank: bank, check: check, save: save, record: record,
              offerHtml: offerHtml, stationHtml: stationHtml, open: open, owns: owns, render: render, wire: wire,
              attach: attach, current: function () { return cur; } };
  if (typeof module === "object" && module.exports) module.exports = api;
  root.Esencial = api;
})(typeof window !== "undefined" ? window : globalThis);
