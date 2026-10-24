/*
 * «Trampas del castellano»: las listas cerradas de lo que el castellano
 * hace decir mal, para consultar y para practicar en rondas de 10.
 *
 *   genero   Género que engaña: los sustantivos del banco con la nota
 *            «Género distinto», los ejercicios del curso que lo explican y,
 *            si el idioma lo sabe calcular, las palabras de la semana cuyo
 *            género no es el del castellano (LANG.rules.gender.traps).
 *   acento   Acento que engaña: los heterotónicos de Suoni (AscoltoData.ACCENTO
 *            con fake) y los del banco («Acento distinto: …»).
 *   falsos   Falsos amigos: los del Lab (LAB_DATA.FALSI, desde FALSI_WEEK),
 *            los ejercicios del curso que los nombran y los errores del banco
 *            de esa categoría.
 *   prep     Preposición o régimen distinto: los errores del banco de
 *            preposición, régimen, objeto con a, gustar/piacere.
 *   cuela    El castellano se cuela: los errores del banco hechos de una
 *            palabra castellana.
 *
 * Nada es contenido nuevo: todo sale de lo que el paquete ya trae, y una
 * lista sin entradas no se muestra (el alemán tiene género y falsos
 * amigos; si no tuviera nada, la sección no aparece en Consultar).  Cada
 * lista se filtra por lo ya visto (la semana o el nivel de cada entrada),
 * cuenta «N de M dominadas» (la tarjeta de la entrada con dos aciertos
 * seguidos o en mantenimiento) y arma una ronda de 10 con lo que menos se
 * sabe.  Las rondas reusan los ejercicios que ya existen (los ids del
 * banco, del Lab y del curso: el repaso los vuelve a traer); los que no
 * existían (el acento escrito, el género calculado) van con ids
 * «trampa:…» que el repaso pide a reviewItem.
 *
 * El núcleo no nombra un idioma.  La lógica sin DOM se prueba en node
 * (tools/lib/test_trampas.js); la pantalla la pone Consultar (capas.js) y
 * la ronda la arranca app.js (startRound("trampas", id)).
 */
(function (root) {
  "use strict";

  var H = null;               // the host (app.js): state, course, start
  var LEVELS = ["A1", "A2", "B1", "B2", "C1"];
  var ROUND = 10;

  var LISTS = [
    { id: "genero", e: "🚻", h: "Género que engaña",
      intro: "Sustantivos con otro género que en castellano: el artículo te lo va a pedir mal." },
    { id: "acento", e: "🔊", h: "Acento que engaña",
      intro: "Palabras casi iguales que se acentúan en otra sílaba." },
    { id: "falsos", e: "🎭", h: "Falsos amigos",
      intro: "Se parecen a una palabra castellana y quieren decir otra cosa." },
    { id: "prep", e: "🔗", h: "Preposición o régimen distinto",
      intro: "Verbos y giros que piden otra preposición (o ninguna) que en castellano." },
    { id: "cuela", e: "🧉", h: "El castellano se cuela",
      intro: "Palabras castellanas que se meten en la frase sin que te des cuenta." }
  ];

  // The categories of the bank's errors (bank.json errors[].cat), by list.
  var ERR_LIST = {
    falso_amico: "falsos", falso_amigo: "falsos",
    preposizione: "prep", preposicion: "prep", regencia: "prep", a_personale: "prep", a_personal: "prep",
    piacere: "prep", gostar: "prep",
    parola_spagnola: "cuela", espanol: "cuela"
  };
  var RE_GEN_BANK = /^Género distinto/i;
  var RE_ACC_BANK = /^Acento distinto:\s*([^\s(]+)\s*\(es\.\s*([^)]+)\)/i;
  var RE_FALSO = /falsos? amigos?/i;
  var RE_GEN_NOTE = /género distinto|(masculin|femenin|neutr)[oa]s? en castellano|en castellano (es|son) (masculin|femenin)/i;
  // exercises that need the ear stay out (Consultar is read, the round too)
  var SHOWN = { choice: 1, cloze: 1, typed: 1, fixerr: 1, translate: 1 };
  var EAR = { listen: 1, dictation: 1, coppia: 1, conta: 1, scegli: 1, intonazione: 1, accento: 1, forma: 1 };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function mk(s) { return esc(s).replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>").replace(/\*([^*]+)\*/g, '<i class="it">$1</i>'); }
  function strip(s) { return String(s == null ? "" : s).replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1").trim(); }
  function plain(s) { return String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(); }
  function within(lvl, max) { return LEVELS.indexOf(lvl || "A1") <= LEVELS.indexOf(max); }
  function shuffle(a, rnd) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor((rnd || Math.random)() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function bank() {
    var B = root.Banca;
    return B && B.loaded && B.loaded() ? B.bank() : null;
  }
  function courseOf(ctx) { return (ctx && ctx.course) || (H && H.course ? H.course() : null); }
  function stateOf(ctx) { return (ctx && ctx.state) || (H && H.state ? H.state() : null) || { unlocked: 1, cards: {} }; }

  /* ------------------------------------------------------ las entradas */

  /* An entry: { key, list, ids (its cards: the first is the round's),
     also (cards that only say it was seen),
     t (the right form), es, note, week or lvl (when it counts as seen),
     make() → the exercise }. */

  function fromCourse(course, add) {
    var items = (course && course.items) || [];
    if (!Array.isArray(items)) items = Object.keys(items).map(function (k) { return items[k]; });
    items.forEach(function (it) {
      // (the exam's items stay for the exam: nothing of it ahead of time)
      if (!it || !it.id || EAR[it.type] || it.dettato || it.audio || it.prova || it.topic === "esame") return;
      var txt = (it.note || "") + " " + (it.prompt || "");
      var list = RE_FALSO.test(txt) ? "falsos" : RE_GEN_NOTE.test(it.note || "") ? "genero" : null;
      if (!list) return;
      if (!SHOWN[it.type]) return;
      // what the list shows: the right sentence (fixerr, translate), the
      // gap filled (cloze, typed) or the word and what it means (choice)
      var stem = strip(it.stem), gap = /_{3,}/.test(stem), right, es;
      if (it.type === "fixerr") { right = it.answer; es = "✗ " + stem; }
      else if (it.type === "translate") { right = it.answer; es = stem; }
      else if (gap) { right = stem.replace(/_{3,}/, String(it.answer).split("|")[0].trim()); es = ""; }
      else { right = stem; es = it.type === "choice" ? strip(it.answer) : ""; }
      add({ key: "c:" + it.id, list: list, ids: [it.id], t: strip(right), week: +it.wk || +it.week || +it.w || 1, es: es,
            note: it.note || "",
            make: function (map) {
              var base = (map && map[it.id]) || it, out = {};
              Object.keys(base).forEach(function (k) { out[k] = base[k]; });
              return out;
            } });
    });
  }

  function fromBank(B, add) {
    var Bc = root.Banca;
    if (!B || !Bc) return;
    (B.nouns || []).forEach(function (n) {
      var note = n[6] || "";
      if (RE_GEN_BANK.test(note) && Bc.articleItem) {
        var art = Bc.articleItem(n, false);
        // (the meaning card says it was seen, not that the gender is held)
        add({ key: "g:" + n[0], list: "genero", ids: [art.id], also: ["b:voc:" + n[0]], t: art.say || n[0], es: n[3], note: note, lvl: n[5],
              make: function () { return Bc.articleItem(n, false); } });
      }
      var a = RE_ACC_BANK.exec(note);
      if (a) accent(add, { word: n[0], good: a[1], bad: a[2].trim(), es: n[3], note: note, lvl: n[5] });
    });
    (B.errors || []).forEach(function (e, i) {
      var list = ERR_LIST[e.cat];
      if (!list || !e.right || !e.wrong || e.right === e.wrong || !Bc.whichItem) return;
      add({ key: "e:" + i, list: list, ids: ["b:cual:" + i, "b:err:" + i], t: e.right, es: "✗ " + e.wrong, note: e.why || "",
            lvl: e.lvl, week: e.w || 1, make: function () { return Bc.whichItem(i); } });
    });
  }

  // An accent: the written choice (the word, where the stress falls).
  var ACC = {};
  function accentItem(x) {
    var opts = x.options, word = x.word;
    // the options differ only in the accent mark (tàvolo / tavòlo): the
    // stem goes without it, or it gives the answer away
    var same = opts.every(function (o) { return plain(o) === plain(word); });
    return { id: x.id, src: "trampas", type: "choice", prompt: "¿Dónde cae el acento?",
             stem: (same ? plain(word) : word) + (x.es && plain(x.es) !== plain(word) ? "  (" + x.es + ")" : ""),
             options: shuffle(opts), answer: x.good, accept: [x.good], note: x.note || "" };
  }
  function accent(add, x) {
    var id = "trampa:acc:" + plain(x.word);
    var it = { id: id, word: x.word, good: x.good, options: x.options || [x.good, x.bad], es: x.es, note: x.note };
    if (ACC[id]) return;
    ACC[id] = it;
    add({ key: id, list: "acento", ids: [id], t: x.word, es: x.es || "", note: x.note || "", week: x.week, lvl: x.lvl,
          make: function () { return accentItem(it); } });
  }

  function fromSounds(A, add) {
    ((A && A.ACCENTO) || []).forEach(function (x) {
      if (!x.fake || !x.options || x.options.length < 2) return;
      accent(add, { word: x.say, good: x.answer, options: x.options, es: x.es, note: x.note, week: x.week || 1 });
    });
  }

  function fromLab(L, add) {
    if (!L || !L.FALSI) return;
    var wk = L.FALSI_WEEK || 1;
    L.FALSI.forEach(function (f, i) {
      var id = "falso:" + i;
      add({ key: id, list: "falsos", ids: [id], t: f[0], es: f[1], note: (f[2] ? "Parece «" + f[2] + "». " : "") + (f[3] || ""),
            week: (L.falsoWeek && L.falsoWeek(id)) || wk, make: function () { return L.item ? L.item(id) : null; } });
    });
  }

  // The genders the language computes (LANG.rules.gender.traps).
  var GEN = {};
  function genItem(x) {
    var G = root.LANG && root.LANG.rules && root.LANG.rules.gender;
    var arts = (G && G.ARTS) || [x.art];
    return { id: x.id, src: "trampas", type: "choice", prompt: "Elegí el artículo",
             stem: "___ " + x.noun + "  (" + x.es + ")", options: arts.slice(), answer: x.art, accept: [x.art],
             choiceDiag: { before: "", after: " " + x.noun },
             note: x.note, say: x.art + " " + x.noun };
  }
  function fromGender(course, add) {
    var G = root.LANG && root.LANG.rules && root.LANG.rules.gender;
    if (!G || !G.traps || !course) return;
    G.traps(course).forEach(function (x) {
      var id = "trampa:gen:" + x.noun;
      var it = { id: id, art: x.art, noun: x.noun, es: x.es, note: x.note };
      GEN[id] = it;
      add({ key: id, list: "genero", ids: [id], t: x.art + " " + x.noun, es: x.es, note: x.note, week: x.week || 1,
            make: function () { return genItem(it); } });
    });
  }

  var CACHE = { course: null, bank: null, lists: null };
  function build(ctx) {
    // (without a course at hand, the last one: the review asks by id alone)
    var course = courseOf(ctx) || CACHE.course, B = (ctx && ctx.bank) || bank();
    if (CACHE.lists && CACHE.course === course && CACHE.bank === B) return CACHE.lists;
    ACC = {}; GEN = {};
    var by = {}, seen = {};
    LISTS.forEach(function (l) { by[l.id] = []; });
    var add = function (e) {
      if (seen[e.key] || !by[e.list]) return;
      seen[e.key] = 1;
      by[e.list].push(e);
    };
    fromSounds(root.AscoltoData, add);     // first: they carry the week
    fromLab(root.Lab, add);
    fromGender(course, add);
    fromBank(B, add);
    fromCourse(course, add);
    CACHE = { course: course, bank: B, lists: LISTS.map(function (l) {
      return { id: l.id, e: l.e, h: l.h, intro: l.intro, entries: by[l.id] };
    }) };
    return CACHE.lists;
  }

  function lists(ctx) { return build(ctx).filter(function (l) { return l.entries.length; }); }
  function list(id, ctx) { return build(ctx).filter(function (l) { return l.id === id; })[0] || null; }
  function available(ctx) { return lists(ctx).length > 0; }

  /* ------------------------------------------------ visto y dominado */

  function isSeen(e, state) {
    var cards = state.cards || {};
    if (e.ids.concat(e.also || []).some(function (id) { return cards[id]; })) return true;
    var B = root.Banca, w = state.unlocked || 1;
    if (e.lvl && !within(e.lvl, B && B.levelOf ? B.levelOf(state) : "C1")) return false;
    if (e.week && e.week > (e.lvl && B && B.weekOf ? B.weekOf(state) : w)) return false;
    return true;
  }
  // Two right in a row (an error sets reps back to 0) or in maintenance.
  function dominated(card) {
    var E = root.Engine;
    return !!card && ((card.reps || 0) >= 2 || (E && E.retired ? E.retired(card) : card.state === "maint"));
  }
  function entryStatus(e, state) {
    var cards = state.cards || {}, any = false;
    for (var i = 0; i < e.ids.length; i++) {
      var c = cards[e.ids[i]];
      if (dominated(c)) return "dominada";
      if (c) any = true;
    }
    return any ? "practicada" : "vista";
  }

  function summary(l, state) {
    state = state || stateOf();
    var seen = [], ahead = 0, dom = 0;
    l.entries.forEach(function (e) {
      if (!isSeen(e, state)) { ahead++; return; }
      seen.push(e);
      if (entryStatus(e, state) === "dominada") dom++;
    });
    return { seen: seen, ahead: ahead, total: l.entries.length, dom: dom };
  }

  /* ------------------------------------------------------------ la ronda */

  /* Ten of what was seen: the ones due or never asked first, then the
     practised but not held, the held ones last (they also need to come
     back, but after). */
  function round(id, state, opts) {
    opts = opts || {};
    state = state || stateOf(opts);
    var l = list(id, opts);
    if (!l) return [];
    var cards = state.cards || {}, now = opts.now || Date.now(), rnd = opts.rnd;
    var tiers = [[], [], []];
    summary(l, state).seen.forEach(function (e) {
      var c = cards[e.ids[0]], st = entryStatus(e, state);
      tiers[st === "dominada" ? 2 : !c || (c.due && c.due <= now) ? 0 : 1].push(e);
    });
    var order = shuffle(tiers[0], rnd).concat(shuffle(tiers[1], rnd), shuffle(tiers[2], rnd));
    var out = [], have = {};
    for (var i = 0; i < order.length && out.length < (opts.size || ROUND); i++) {
      var it = null;
      try { it = order[i].make(opts.map); } catch (err) { it = null; }
      if (it && it.id && !have[it.id]) { have[it.id] = 1; out.push(it); }
    }
    return out;
  }

  // The review asks for the exercises that only live here (trampa:…).
  function reviewItem(id) {
    if (String(id).indexOf("trampa:") !== 0) return null;
    build();
    if (ACC[id]) return accentItem(ACC[id]);
    if (GEN[id]) return genItem(GEN[id]);
    return null;
  }
  function known(id) { return !!reviewItem(id); }

  /* ----------------------------------------------------------- pantalla */

  var MARK = { dominada: "⭐", practicada: "✍️", vista: "·" };

  function entryHtml(e, state) {
    var s = entryStatus(e, state);
    return '<details class="tr-e ' + s + '"><summary><span class="tr-m" title="' + s + '">' + MARK[s] + "</span>" +
      '<b class="it">' + esc(strip(e.t)) + "</b>" + (e.es ? ' <span class="muted">' + esc(strip(e.es)) + "</span>" : "") + "</summary>" +
      (e.note ? '<p class="small tr-why">¿En qué se diferencia del castellano? ' + mk(e.note) + "</p>" : "") + "</details>";
  }

  function listHtml(l, state) {
    var x = summary(l, state), n = x.seen.length;
    var pct = n ? Math.round(x.dom / n * 100) : 0;
    return '<div class="card tr-list" data-trlist="' + l.id + '"><h2>' + l.e + " " + esc(l.h) + "</h2>" +
      '<p class="muted">' + esc(l.intro) + "</p>" +
      (n ? '<p class="tr-count"><b>' + x.dom + " de " + n + "</b> dominadas" +
          '</p><div class="tr-bar"><i style="width:' + pct + '%"></i></div>' +
          '<div class="row"><button class="btn" data-trround="' + l.id + '">Ronda de ' + Math.min(ROUND, n) + "</button></div>" +
          '<details class="tr-all"><summary>Ver la lista (' + n + ")</summary>" +
            x.seen.map(function (e) { return entryHtml(e, state); }).join("") + "</details>"
        : '<p class="note">🔒 Todavía no viste ninguna: aparecen a medida que avanzás.</p>') +
      (x.ahead ? '<p class="muted small">🔒 ' + x.ahead + (x.ahead === 1 ? " más llega" : " más llegan") + " con las semanas que vienen.</p>" : "") +
      "</div>";
  }

  function page(ctx) {
    var state = stateOf(ctx), ls = lists(ctx);
    return "<h1>🪤 Trampas del castellano</h1>" +
      '<p class="lead">Lo que el castellano te hace decir mal, en listas cerradas: solo lo que ya viste, ' +
      "con cuántas tenés dominadas y una ronda de 10 con las que menos sabés. Tocá una palabra para ver en qué se diferencia.</p>" +
      (ls.length ? ls.map(function (l) { return listHtml(l, state); }).join("")
        : '<p class="muted">Este idioma todavía no tiene listas de trampas.</p>') +
      '<p class="muted science">🔬 Señalar la diferencia con la lengua materna, en el momento justo, ayuda a dejar de transferirla ' +
      "(instrucción contrastiva: Spada y Lightbown 2008; Ringbom 2007).</p>";
  }

  function entryButton(ctx) {
    if (!available(ctx)) return "";
    return '<button class="lab" data-csub="trampas"><span class="e">🪤</span><b>Trampas del castellano</b>' +
      '<span class="muted">Género, acento, falsos amigos y preposiciones que engañan: listas y rondas de 10.</span></button>';
  }

  function onClick(e) {
    var t = e.target && e.target.closest ? e.target.closest("[data-trround]") : null;
    if (!t) return;
    e.preventDefault();
    if (H && H.start) H.start(t.getAttribute("data-trround"));
  }

  function attach(host) {
    H = host || {};
    if (attach.done || !root.document) return;
    attach.done = true;
    root.document.addEventListener("click", onClick);
  }

  var api = {
    LISTS: LISTS, ERR_LIST: ERR_LIST,
    lists: lists, list: list, available: available, summary: summary, round: round,
    isSeen: isSeen, status: entryStatus, dominated: dominated,
    reviewItem: reviewItem, known: known,
    attach: attach, page: page, entryButton: entryButton, listHtml: listHtml,
    _reset: function () { CACHE = { course: null, bank: null, lists: null }; }
  };
  if (typeof module === "object" && module.exports) module.exports = api;
  root.Trampas = api;
})(typeof window !== "undefined" ? window : globalThis);
