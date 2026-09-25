/*
 * Tres lenguas: la lengua que se estudia, la otra que enseña la app y el
 * español.  Quien estudia las dos las mezcla (Ringbom: la L3 toma prestado
 * sobre todo de la L2 más parecida, no de la materna), así que el modo hace
 * tres cosas:
 *
 *  1. Contrastes por tema (gramática, léxico y falsos amigos, ortografía):
 *     la misma idea en las tres lenguas, con una nota y un ejemplo.
 *  2. El duelo «¿de qué lengua es?»: una frase o una palabra; decir de qué
 *     lengua es, encontrar la palabra que se coló de la otra y corregirla.
 *     Se abre si hay progreso guardado en los dos idiomas o si el alumno lo
 *     activa a mano.
 *  3. En el diagnóstico, una palabra de la otra lengua es un error propio
 *     (categoría «otra_lengua»): «¡Eso es …!», con la forma correcta.
 *
 * El núcleo no nombra ningún idioma: los nombres, las palabras y los
 * prefijos de guardado vienen de docs/lang/tres_lenguas_data.js
 * (window.TRES_LENGUAS_DATA); la lengua en uso, de LANG.code.
 *
 * API (window.TresLenguas, module.exports):
 *   intruders(given, expected)   las palabras de la otra lengua en una respuesta
 *   amend(d, given, expected)    agrega el hallazgo a un diagnóstico
 *   available(state) / enable(on)
 *   contrasts(topic) / duelSession(rnd, n)
 *   card(state), render(state), wire(el, opts)   la interfaz (app.js)
 */
(function (root) {
  "use strict";

  var DATA = root.TRES_LENGUAS_DATA || { LANGS: {}, TOPICS: [], CONTRASTS: {}, PAIRS: [], SIGNS: {}, DUEL: [] };
  var LG = root.LANG || {};
  var CODES = Object.keys(DATA.LANGS).filter(function (c) { return c !== "es"; });
  var HOME = LG.code && DATA.LANGS[LG.code] ? LG.code : CODES[0];
  var OTHER = CODES.filter(function (c) { return c !== HOME; })[0];
  var IDX = { it: 2, pt: 3, es: 4 };        // columns of a contrast
  var PIDX = { it: 0, pt: 1, es: 2 };       // columns of a pair
  var CAT = "otra_lengua";
  var KEY = "c1.tres.v1";

  function name(c) { return (DATA.LANGS[c] || {}).name || c; }
  function Name(c) { return (DATA.LANGS[c] || {}).Name || c; }
  function flag(c) { return (DATA.LANGS[c] || {}).flag || ""; }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }
  function deaccent(s) { return String(s).normalize("NFD").replace(/[̀-ͯ]/g, ""); }
  function degeminate(s) { return String(s).replace(/([bcdfglmnpqrstvz])\1/g, "$1"); }
  function norm(s) { return deaccent(String(s).toLowerCase()); }
  function shuffle(a, rnd) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor((rnd || Math.random)() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function toks(s) {
    var D = root.Diagnosi;
    if (D && D.tokens) return D.tokens(s);
    return String(s || "").toLowerCase().replace(/[«»"“”.,;:!?¿¡()…—–]+/g, " ").split(/\s+/).filter(Boolean);
  }

  /* ------------------------------------------------------------ contrastes */

  function contrasts(topic) {
    var list = DATA.CONTRASTS[topic] || [];
    return list.map(function (c) {
      return { id: topic + ":" + c[0], topic: topic, title: c[1], it: c[IDX.it], pt: c[IDX.pt], es: c[IDX.es],
               note: c[5], ex: c[6] ? { it: c[6][0], pt: c[6][1], es: c[6][2] } : null };
    });
  }
  function allContrasts() {
    var out = [];
    DATA.TOPICS.forEach(function (t) { out = out.concat(contrasts(t.id)); });
    return out;
  }

  /* ----------------------------------------------- la palabra que se coló */

  // Words of the other language → the form in the language being studied.
  // Several words of the other language together (ho fatto → fiz).
  var MARK = null, MULTI = [];
  function marks() {
    if (MARK) return MARK;
    MARK = Object.create(null);
    DATA.PAIRS.forEach(function (p) {
      var o = p[PIDX[OTHER]], h = p[PIDX[HOME]], es = p[PIDX.es];
      if (!o || !h) return;
      if (norm(o) === norm(h)) return;                           // shared
      // Spanish: the same word, or the same without the accent a Spanish
      // speaker would not write anyway (dia / día yes, família / familia no)
      if (o === es || (norm(o) === norm(es) && o === deaccent(o))) return;
      // nono / nonno, otimo / ottimo: a missing double, not the other language
      if (degeminate(norm(h)) === norm(o)) return;
      if (/ /.test(o)) { MULTI.push({ o: o.split(" "), fix: h, es: es }); return; }
      if (!MARK[o]) MARK[o] = { fix: h, es: es };
    });
    return MARK;
  }
  function signOf(w) {
    var list = DATA.SIGNS[OTHER] || [];
    for (var i = 0; i < list.length; i++) {
      if (new RegExp(list[i].re).test(w)) return list[i];
    }
    return null;
  }
  function util() { return (root.Diagnosi && root.Diagnosi.util) || {}; }
  function isHome(w) {
    var u = util();
    try { return !!(u.isItalian && u.isItalian(w)); } catch (e) { return false; }
  }
  function isSpanish(w) {
    var u = util();
    try { return !!(u.spanishWord && u.spanishWord(w)); } catch (e) { return false; }
  }

  /* The words of the other language in an answer: [{w, fix, why}].  A word
     counts only when it is not a word of the language being studied, is not
     in any expected answer and is not simply Spanish. */
  function intruders(given, expected) {
    var list = (Array.isArray(expected) ? expected : [expected]).filter(Boolean);
    var exp = Object.create(null);
    list.forEach(function (x) { toks(x).forEach(function (t) { exp[t] = 1; exp[norm(t)] = 1; }); });
    var M = marks(), out = [], seen = Object.create(null), gt = toks(given);
    MULTI.forEach(function (m) {
      for (var i = 0; i + m.o.length <= gt.length; i++) {
        if (m.o.every(function (w, k) { return gt[i + k] === w; }) &&
            !m.o.every(function (w) { return exp[w]; }) && !m.o.every(isHome)) {
          m.o.forEach(function (w) { seen[w] = 1; });
          out.push({ w: m.o.join(" "), words: m.o, fix: m.fix, es: m.es, why: null });
          return;
        }
      }
    });
    gt.forEach(function (t) {
      if (seen[t] || exp[t] || exp[norm(t)] || t.length < 2 || /\d/.test(t)) return;
      var m = M[t], sign = m ? null : signOf(t);
      if (!m && !sign) return;
      if (isHome(t) || isSpanish(t)) return;
      if (sign && sign.double) {
        // «muitto» is a typo of muito, «fatto» is Italian
        if (t.length < 4 || isHome(degeminate(t)) || exp[degeminate(t)]) return;
      }
      seen[t] = 1;
      out.push({ w: t, fix: m ? m.fix : null, es: m ? m.es : null, why: sign ? sign.why : null });
    });
    return out;
  }

  // The contrast that explains a word of the other language, if any.
  function contrastFor(w) {
    var re = new RegExp("(^|[^a-zà-ÿ])" + w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "($|[^a-zà-ÿ])", "i");
    var all = allContrasts();
    for (var i = 0; i < all.length; i++) if (re.test(all[i][OTHER])) return all[i];
    return null;
  }

  // The word of the expected answer in the place of the intruder.
  function alignedFix(w, given, target) {
    var D = root.Diagnosi;
    if (!D || !D.align || !target) return null;
    var g = toks(given), e = toks(target), ops;
    try { ops = D.align(g, e); } catch (err) { return null; }
    for (var i = 0; i < ops.length; i++) {
      if (ops[i].op === "sub" && ops[i].g === w && g.indexOf(ops[i].e) < 0) return ops[i].e;
    }
    return null;
  }

  function it(w) { return "*" + w + "*"; }

  /* A diagnosis that missed the other language gets it as its main finding. */
  function amend(d, given, expected) {
    if (!d || d.verdict === "giusto" || d.cat === "vuoto") return d;
    var list = (Array.isArray(expected) ? expected : [expected]).filter(Boolean);
    var hits = intruders(given, list);
    if (!hits.length) return d;
    var target = d.target || list[0];
    // The pair's form when the answer has it (ho fatto); otherwise the word
    // of the answer in that place (tem → c'è or hai, by the sentence).
    var tt = " " + toks(target).join(" ") + " ";
    hits.forEach(function (h) {
      if (h.fix && tt.indexOf(" " + toks(h.fix).join(" ") + " ") >= 0) return;
      h.fix = (!h.words && alignedFix(h.w, given, target)) || h.fix;
    });
    var h = hits[0];
    var fixes = hits.filter(function (x) { return x.fix; }).map(function (x) { return it(x.w) + " → " + it(x.fix); });
    var c = contrastFor(h.w);
    d.cat = CAT;
    d.label = LABEL_TXT;
    d.slip = false;
    d.verdict = "sbagliato";
    d.hint = "¡Eso es " + name(OTHER) + "! " + it(h.w) + " se te coló del " + name(OTHER) +
      ". ¿Cómo se dice en " + name(HOME) + "?";
    d.explain = "¡Eso es " + name(OTHER) + "! " + hits.map(function (x) { return it(x.w); }).join(", ") +
      (hits.length > 1 ? " son palabras del " : " es ") + name(OTHER) + "." +
      (fixes.length ? " En " + name(HOME) + ": " + fixes.join(", ") + "." : " En " + name(HOME) + ": " + it(target) + ".") +
      (h.why ? " " + h.why : "") +
      (c ? " (" + c.title + ": " + c[HOME] + " / " + c[OTHER] + " / " + c.es + ".)" : "");
    var rest = (d.all || []).filter(function (x) { return x !== CAT; });
    d.all = [CAT].concat(rest);
    d.others = rest.length;
    (d.given || []).forEach(function (t) {
      if (hits.some(function (x) { return x.w === t.w || (x.words && x.words.indexOf(t.w) >= 0); })) t.bad = true;
    });
    d.otherLang = { code: OTHER, words: hits };
    return d;
  }

  var LABEL_TXT = Name(OTHER) + " colado";

  // Into the diagnosis of the language: a new category, and every
  // diagnosis (written answers, choices) looks for the other language.
  function install() {
    var D = root.Diagnosi;
    if (!D || D.__tres) return;
    D.__tres = true;
    if (D.LABEL) D.LABEL[CAT] = LABEL_TXT;
    if (D.SEVERITY) D.SEVERITY[CAT] = 6;
    var diagnose = D.diagnose, explainChoice = D.explainChoice;
    if (diagnose) D.diagnose = function (given, expected, ctx) {
      return amend(diagnose.call(D, given, expected, ctx), given, expected);
    };
    if (explainChoice) D.explainChoice = function (chosen, answer, ctx) {
      var d = explainChoice.call(D, chosen, answer, ctx);
      return d ? amend(d, chosen, [answer]) : d;
    };
    // The interlanguage notebook of the package lists it too.
    var IL = LG.interlang;
    if (IL && Array.isArray(IL.list) && !IL.list.some(function (x) { return x[0] === CAT; })) {
      IL.list.push([CAT, "el " + name(OTHER) + " que se cuela: " + marksSample()]);
    }
  }
  function marksSample() {
    var M = marks(), ks = Object.keys(M).filter(function (k) { return /^(muito|molto|também|anche|hoje|oggi)$/.test(k); });
    if (!ks.length) ks = Object.keys(M).slice(0, 3);
    return ks.slice(0, 3).map(function (k) { return k + " → " + M[k].fix; }).join(", ");
  }

  /* ------------------------------------------------ abierto o no, guardado */

  function ls() { try { return root.localStorage || null; } catch (e) { return null; } }
  function readJSON(k) {
    var s = ls();
    if (!s) return null;
    try { var v = s.getItem(k); return v ? JSON.parse(v) : null; } catch (e) { return null; }
  }
  function store() { return readJSON(KEY) || {}; }
  function save(o) {
    var s = ls();
    if (!s) return;
    try { s.setItem(KEY, JSON.stringify(o)); } catch (e) { /* sin almacenamiento */ }
  }
  function saveHasProgress(sv) {
    return !!(sv && ((+sv.xp || 0) > 0 || Object.keys(sv.cards || {}).length > 0));
  }
  // Progress in each language: its own save (laviac1.save.v1, rumoc1.save.v1).
  function progress(state) {
    var out = {};
    CODES.forEach(function (c) {
      var st = (DATA.LANGS[c] || {}).storage;
      out[c] = c === HOME && saveHasProgress(state) ? true : saveHasProgress(st ? readJSON(st + ".save.v1") : null);
    });
    return out;
  }
  function manual() { return !!store().on; }
  function available(state) {
    if (manual()) return true;
    var p = progress(state);
    return CODES.every(function (c) { return p[c]; });
  }
  function enable(on) { var o = store(); o.on = !!on; save(o); }

  /* ------------------------------------------------------------- el duelo */

  function duelItem(x) {
    var words = x[0].split(/\s+/);
    return { t: x[0], l: x[1], bad: x[2] || null, fix: x[3] || null, es: x[4] || null, single: words.length === 1 };
  }
  // A round: n items, a third with a word of the other language, the rest
  // half in each language; words and sentences mixed.
  function duelSession(rnd, n) {
    n = n || 10;
    var all = DATA.DUEL.map(duelItem);
    var mixed = shuffle(all.filter(function (x) { return x.bad; }), rnd);
    var pure = { };
    CODES.forEach(function (c) { pure[c] = shuffle(all.filter(function (x) { return !x.bad && x.l === c; }), rnd); });
    var nMix = Math.round(n * 0.4), out = [];
    // the mixed ones: as many from each side
    CODES.forEach(function (c, k) {
      var want = Math.floor(nMix / CODES.length) + (k < nMix % CODES.length ? 1 : 0);
      out = out.concat(mixed.filter(function (x) { return x.l === c; }).slice(0, want));
    });
    var rest = n - out.length;
    CODES.forEach(function (c, k) {
      var want = Math.floor(rest / CODES.length) + (k < rest % CODES.length ? 1 : 0);
      out = out.concat(pure[c].slice(0, want));
    });
    return shuffle(out, rnd);
  }
  function pairOf(w) {
    var l = norm(w);
    for (var i = 0; i < DATA.PAIRS.length; i++) {
      var p = DATA.PAIRS[i];
      if (norm(p[0]) === l || norm(p[1]) === l) return p;
    }
    return null;
  }
  function clean(w) { return String(w).toLowerCase().replace(/^[«"¿¡(]+|[»".,;:!?)]+$/g, ""); }

  /* ------------------------------------------------------------ interfaz */

  var ui = { screen: "menu", topic: null, duel: null };
  var hooks = {};

  function show() { if (hooks.show) hooks.show(); }

  function card(state) {
    var open = available(state), p = progress(state);
    var html = "<h2>🔀 Tres lenguas</h2>" +
      '<p class="muted">' + Name(HOME) + ", " + name(OTHER) + " y español: dónde se parecen, dónde se pisan y cómo no mezclarlos.</p>" +
      '<div class="labs tl-labs">';
    if (open) {
      var best = (store().best || {}).duel;
      html += '<button class="lab" data-tres="menu"><span class="e">🔀</span><b>Contrastes</b>' +
          '<span class="muted">' + allContrasts().length + " puntos donde las tres lenguas se cruzan: gramática, falsos amigos, ortografía.</span></button>" +
        '<button class="lab" data-tres="duel"><span class="e">🎯</span><b>¿' + Name(HOME) + " o " + name(OTHER) + "?</b>" +
          '<span class="muted">Decí de qué lengua es y cazá la palabra que se coló.</span>' +
          (best ? '<span class="meta">mejor: ' + best + " %</span>" : "") + "</button>";
    } else {
      var missing = CODES.filter(function (c) { return !p[c]; }).map(name);
      html += '<button class="lab" data-tres="on"><span class="e">🔒</span><b>Tres lenguas</b>' +
        '<span class="muted">Se abre cuando tengas progreso en los dos idiomas (te falta ' + esc(missing.join(" y ")) +
        "). Si ya estudiás los dos por tu cuenta, tocá para activarlo.</span></button>";
    }
    return html + "</div>";
  }

  function langChip(c, txt) {
    return '<div class="tl-cell tl-' + c + '"><span class="tl-flag" aria-hidden="true">' + flag(c) + "</span>" +
      '<span class="tl-l">' + esc(Name(c)) + "</span><b>" + esc(txt) + "</b></div>";
  }
  var ORDER3 = function () { return [HOME, OTHER, "es"]; };

  function renderMenu() {
    var html = '<button class="tab" data-tres="back">← Volver</button>' +
      "<h1>🔀 Tres lenguas</h1>" +
      '<p class="lead">' + Name(HOME) + " y " + name(OTHER) + " se parecen entre sí más que al español, y por eso se pisan: " +
      "un <i>muito</i> que se cuela en italiano, un <i>molto</i> en portugués. Acá están, lado a lado.</p>" +
      '<div class="labs">' + DATA.TOPICS.map(function (t) {
        return '<button class="lab" data-tres="topic" data-t="' + esc(t.id) + '"><span class="e">' + t.emoji + "</span><b>" + esc(t.title) + "</b>" +
          '<span class="muted">' + esc(t.sub) + '</span><span class="meta">' + (DATA.CONTRASTS[t.id] || []).length + " contrastes</span></button>";
      }).join("") +
      '<button class="lab" data-tres="duel"><span class="e">🎯</span><b>¿' + Name(HOME) + " o " + name(OTHER) + "?</b>" +
        '<span class="muted">El duelo: de qué lengua es y qué palabra se coló.</span></button></div>' +
      '<p class="muted science">🔬 En una tercera lengua la interferencia viene sobre todo de la segunda, la más parecida (Ringbom 2007; Hammarberg 2001): ' +
      "ver los contrastes juntos y practicar la discriminación ayuda a separarlas.</p>";
    if (manual()) html += '<p class="muted"><button class="tab" data-tres="off">Desactivar Tres lenguas</button></p>';
    return html;
  }

  function renderTopic() {
    var t = DATA.TOPICS.filter(function (x) { return x.id === ui.topic; })[0] || DATA.TOPICS[0];
    var order = ORDER3();
    return '<button class="tab" data-tres="menu">← Tres lenguas</button>' +
      "<h1>" + t.emoji + " " + esc(t.title) + "</h1>" +
      '<p class="muted">Tocá un contraste para ver la nota y el ejemplo.</p>' +
      '<div class="tl-list">' + contrasts(t.id).map(function (c) {
        return '<details class="card tl-c"><summary><span class="tl-t">' + esc(c.title) + "</span>" +
          '<div class="tl-row">' + order.map(function (k) { return langChip(k, c[k]); }).join("") + "</div></summary>" +
          '<p class="tl-note">' + esc(c.note) + "</p>" +
          (c.ex ? '<div class="tl-ex">' + order.map(function (k) {
            return '<div><span aria-hidden="true">' + flag(k) + "</span> " + esc(c.ex[k]) + "</div>";
          }).join("") + "</div>" : "") +
          "</details>";
      }).join("") + "</div>";
  }

  function duelStart() {
    ui.duel = { items: duelSession(), i: 0, step: "lang", pts: 0, max: 0, log: [] };
    ui.screen = "duel";
  }
  function cur() { return ui.duel && ui.duel.items[ui.duel.i]; }

  function renderDuel() {
    var d = ui.duel, x = cur();
    if (!x) return renderDuelEnd();
    var html = '<button class="tab" data-tres="menu">← Tres lenguas</button>' +
      '<div class="tl-hud muted">' + (d.i + 1) + " / " + d.items.length + " · " + d.pts + " puntos</div>" +
      '<div class="card tl-duel">';
    if (d.step === "lang") {
      html += '<p class="muted">¿En qué lengua está?</p>' +
        '<p class="stem tl-text">' + esc(x.t) + "</p>" +
        '<div class="options">' + CODES.map(function (c) {
          return '<button class="opt" data-tres="lang" data-l="' + c + '">' + flag(c) + " " + esc(Name(c)) + "</button>";
        }).join("") + "</div>";
    } else if (d.step === "check") {
      html += d.fb + '<p class="muted">¿Está todo en ' + esc(name(x.l)) + "? Si se coló una palabra del " + esc(name(x.l === HOME ? OTHER : HOME)) + ", tocala.</p>" +
        '<p class="tl-toks">' + x.t.split(/\s+/).map(function (w, k) {
          return '<button class="tab tl-tok" data-tres="tok" data-k="' + k + '">' + esc(w) + "</button>";
        }).join(" ") + "</p>" +
        '<div class="row"><button class="btn" data-tres="clean">✔ Está todo en ' + esc(name(x.l)) + "</button></div>";
    } else if (d.step === "fix") {
      var opts = shuffle([x.fix, x.bad, x.es].filter(function (o, k, a) { return o && a.indexOf(o) === k; }));
      d.opts = opts;
      html += d.fb + '<p class="muted">¿Cómo se dice <b>' + esc(x.bad) + "</b> en " + esc(name(x.l)) + "?</p>" +
        '<div class="options">' + opts.map(function (o, k) {
          return '<button class="opt" data-tres="fix" data-k="' + k + '">' + esc(o) + "</button>";
        }).join("") + "</div>";
    } else {
      html += d.fb + '<div class="row"><button class="btn" data-tres="next">' +
        (d.i + 1 < d.items.length ? "Siguiente →" : "Ver el resultado") + "</button></div>";
    }
    return html + "</div>";
  }

  function renderDuelEnd() {
    var d = ui.duel, pct = d.max ? Math.round(d.pts / d.max * 100) : 0;
    return '<button class="tab" data-tres="menu">← Tres lenguas</button>' +
      '<div class="card tl-duel center"><h1>' + (pct >= 80 ? "🏆" : pct >= 50 ? "👏" : "💪") + " " + pct + " %</h1>" +
      "<p>" + d.pts + " de " + d.max + " puntos. " + (pct >= 80 ? "Las tenés bien separadas." : "Mirá los contrastes y probá otra vez.") + "</p>" +
      (d.log.length ? '<div class="tl-ex left">' + d.log.map(function (l) { return "<div>" + l + "</div>"; }).join("") + "</div>" : "") +
      '<div class="row centerrow"><button class="btn" data-tres="duel">Otra ronda</button>' +
      '<button class="tab" data-tres="menu">Contrastes</button></div></div>';
  }

  function render() {
    if (ui.screen === "topic") return renderTopic();
    if (ui.screen === "duel") return renderDuel();
    return renderMenu();
  }

  function fb(ok, txt) {
    return '<div class="tl-fb ' + (ok ? "ok" : "ko") + '">' + (ok ? "✔ " : "✘ ") + txt + "</div>";
  }
  function equivalents(x) {
    if (!x.single) return "";
    var p = pairOf(x.t);
    if (!p) return "";
    return ' <span class="muted">(' + ORDER3().map(function (c) { return flag(c) + " " + esc(p[PIDX[c]]); }).join(" · ") + ")</span>";
  }

  function act(kind, btn) {
    var d = ui.duel, x = cur();
    if (kind === "lang" && x) {
      var l = btn.getAttribute("data-l"), ok = l === x.l;
      d.max++; if (ok) d.pts++;
      var txt = "Es " + esc(name(x.l)) + "." + (x.bad && !ok ? " Te confundió <b>" + esc(x.bad) + "</b>, que se coló del " + esc(name(l)) + "." : "") + equivalents(x);
      d.fb = (d.fb || "") + fb(ok, txt);
      if (!ok) d.log.push(flag(x.l) + " " + esc(x.t));
      d.step = x.single ? "done" : "check";
    } else if (kind === "clean" && x) {
      d.max++;
      if (!x.bad) { d.pts++; d.fb = (d.fb || "") + fb(true, "Todo en " + esc(name(x.l)) + "."); d.step = "done"; }
      else { d.fb = (d.fb || "") + fb(false, "Se coló <b>" + esc(x.bad) + "</b>, que es " + esc(name(x.l === HOME ? OTHER : HOME)) + "."); d.step = "fix"; d.log.push(esc(x.t)); }
    } else if (kind === "tok" && x) {
      var w = clean(btn.textContent);
      d.max++;
      if (x.bad && w === x.bad.toLowerCase()) { d.pts++; d.fb = (d.fb || "") + fb(true, "¡Eso! <b>" + esc(x.bad) + "</b> es " + esc(name(x.l === HOME ? OTHER : HOME)) + "."); d.step = "fix"; }
      else if (x.bad) { d.fb = (d.fb || "") + fb(false, "<b>" + esc(w) + "</b> está bien; la que se coló es <b>" + esc(x.bad) + "</b>."); d.step = "fix"; d.log.push(esc(x.t)); }
      else { d.fb = (d.fb || "") + fb(false, "<b>" + esc(w) + "</b> es " + esc(name(x.l)) + ": estaba todo bien."); d.step = "done"; d.log.push(esc(x.t)); }
    } else if (kind === "fix" && x) {
      var o = (d.opts || [])[+btn.getAttribute("data-k")];
      d.max++;
      var right = x.t.replace(x.bad, x.fix);
      if (o === x.fix) { d.pts++; d.fb = (d.fb || "") + fb(true, "<b>" + esc(right) + "</b>"); }
      else d.fb = (d.fb || "") + fb(false, "Era <b>" + esc(x.fix) + "</b>: " + esc(right) + (o === x.es ? " (" + esc(o) + " es español)" : ""));
      d.step = "done";
    } else if (kind === "next") {
      d.i++; d.step = "lang"; d.fb = "";
      if (d.i >= d.items.length) finishDuel();
    }
    show();
  }

  function finishDuel() {
    var d = ui.duel, pct = d.max ? Math.round(d.pts / d.max * 100) : 0;
    var o = store();
    o.best = o.best || {};
    if (!o.best.duel || pct > o.best.duel) o.best.duel = pct;
    o.rounds = (o.rounds || 0) + 1;
    save(o);
    if (hooks.gain) { try { hooks.gain(Math.max(1, Math.round(d.pts / 2))); } catch (e) { /* */ } }
  }

  /* opts: show() redraws this screen through app.js, back() returns to the
     training tab, gain(n) adds xp, toast(msg). */
  function wire(el, opts) {
    hooks = opts || hooks;
    if (!el || !el.querySelectorAll) return;
    Array.prototype.forEach.call(el.querySelectorAll("[data-tres]"), function (b) {
      b.onclick = function () {
        var k = b.getAttribute("data-tres");
        if (k === "on") { enable(true); ui.screen = "menu"; if (hooks.toast) hooks.toast("🔀 Tres lenguas activado."); show(); }
        else if (k === "off") { enable(false); if (hooks.back) hooks.back(); }
        else if (k === "menu") { ui.screen = "menu"; show(); }
        else if (k === "back") { if (hooks.back) hooks.back(); }
        else if (k === "topic") { ui.screen = "topic"; ui.topic = b.getAttribute("data-t"); show(); }
        else if (k === "duel") { duelStart(); show(); }
        else act(k, b);
      };
    });
  }

  install();

  var api = { CAT: CAT, HOME: HOME, OTHER: OTHER, KEY: KEY, DATA: DATA, intruders: intruders, amend: amend,
              contrasts: contrasts, allContrasts: allContrasts, progress: progress, available: available,
              enable: enable, duelSession: duelSession, card: card, render: render, wire: wire,
              _ui: ui, _act: act };
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.TresLenguas = api;
})(typeof window !== "undefined" ? window : globalThis);
