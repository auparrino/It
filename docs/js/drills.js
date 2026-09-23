/*
 * La fabbrica delle domande.  Trasforma il corso (item dei due manuali +
 * banco d'autore) e il coniugatore in round giocabili.
 */
(function (root) {
  "use strict";

  // In the browser conjugator.js has already put Conj on window; under Node
  // it is a plain module, so fall back to require().
  var Conj = root.Conj ||
    (typeof require === "function" ? require("./conjugator.js") : null);
  var Frasi = root.Frasi ||
    (typeof require === "function" ? require("./frasi.js") : null);
  var Lab = root.Lab ||
    (typeof require === "function" ? require("./lab.js") : null);
  var Banca = root.Banca ||
    (typeof require === "function" ? require("./banca.js") : null);

  function shuffle(a, rnd) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor((rnd ? rnd() : Math.random()) * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function sample(a, n) { return shuffle(a).slice(0, n); }

  /* Variety: never-seen items first, then the ones due, then those seen
     longest ago.  What was answered well in the last two days only comes
     back if there is nothing else. */
  function pickFresh(pool, n, state) {
    var cards = (state && state.cards) || {};
    var now = Date.now(), DAY = 86400000;
    var rank = function (it) {
      var c = cards[it.id];
      if (!c) return 0 + Math.random();
      if (!c.due || c.due <= now) return 1 + Math.random();
      var last = c.last || (c.due - (c.interval || 0) * DAY);
      return now - last < 2 * DAY ? 4 + Math.random() : 2 + Math.random() + (c.due - now) / (365 * DAY);
    };
    var seen = {};
    return pool.filter(function (it) { if (!it || seen[it.id]) return false; seen[it.id] = 1; return true; })
      .map(function (it) { return { it: it, r: rank(it) }; })
      .sort(function (a, b) { return a.r - b.r; })
      .slice(0, n).map(function (x) { return x.it; });
  }

  // Bank items near the week's level, to top up a short week without repeating.
  function bankFill(state, n) {
    var out = [];
    if (!Banca || !Banca.loaded()) return out;
    for (var i = 0; i < n * 3 && out.length < n; i++) {
      var it = Banca.pausaItem(state);
      if (it && !out.some(function (o) { return o.id === it.id; })) out.push(it);
    }
    return out;
  }

  /* ------------------------------------------------ domande di coniugazione */

  var PERSON_LABEL = ["io", "tu", "lui/lei", "noi", "voi", "loro"];

  function conjugationDrill(verb, tense) {
    var forms = Conj.conjugate(verb, tense);
    var p = Math.floor(Math.random() * 6);
    var answer = forms[p];

    // Distractors: the same verb in other persons, then the same person in
    // other tenses — the mistakes a learner actually makes.  Several persons
    // often share a form (parli/parli/parli), so the pool must be deduped or
    // the same option shows up twice.
    var pool = [];
    function add(f) {
      if (f && f !== answer && pool.indexOf(f) < 0) pool.push(f);
    }
    forms.forEach(add);
    shuffle(Conj.ALL_TENSES).forEach(function (t) {
      if (t === tense || pool.length >= 8) return;
      try { add(Conj.conjugate(verb, t)[p]); } catch (e) { /* non coniugabile */ }
    });
    // Last resort: other persons of other tenses, so we always reach 4 options.
    shuffle(Conj.ALL_TENSES).forEach(function (t) {
      if (pool.length >= 3) return;
      try {
        Conj.conjugate(verb, t).forEach(add);
      } catch (e) { /* non coniugabile */ }
    });

    var options = shuffle(sample(pool, 3).concat([answer]));
    var info = Conj.info(verb);
    return {
      id: "conj:" + verb + ":" + tense + ":" + p,
      src: "coniugatore",
      type: "choice",
      topic: "coniugazione",
      prompt: "Conjugá «" + verb + "» (" + info.es + ") — " +
              Conj.TENSE_LABELS[tense],
      stem: PERSON_LABEL[p] + " ___",
      options: options,
      answer: answer,
      accept: [answer],
      note: verb + " · " + Conj.TENSE_LABELS[tense] + ": " + forms.join(", ")
    };
  }

  function conjugationTyped(verb, tense) {
    var forms = Conj.conjugate(verb, tense);
    var p = Math.floor(Math.random() * 6);
    var info = Conj.info(verb);
    return {
      id: "conjw:" + verb + ":" + tense + ":" + p,
      src: "coniugatore",
      type: "cloze",
      topic: "coniugazione",
      prompt: "Escribí la forma de «" + verb + "» (" + info.es + ") — " +
              Conj.TENSE_LABELS[tense],
      stem: PERSON_LABEL[p] + " ___ (" + verb + ")",
      answer: forms[p],
      accept: [forms[p]],
      note: verb + " · " + Conj.TENSE_LABELS[tense] + ": " + forms.join(", ")
    };
  }

  /* -------------------------------------------------------- costruire round */

  function itemsById(course) {
    var map = {};
    course.items.forEach(function (it) { map[it.id] = it; });
    return map;
  }

  /* Un round mescola tre sorgenti in modo che nessuna sessione sia uguale:
     item dei manuali, banco d'autore e ginnastica di coniugazione. */
  function buildRound(course, week, opts) {
    opts = opts || {};
    var size = opts.size || 12;
    var map = opts.map || itemsById(course);
    var out = [];

    // The week's own items plus its challenges (now graded): more variety.
    var chIds = {}; (week.challenges || []).forEach(function (id) { chIds[id] = 1; });
    var sfida = [];
    (course.challenges || []).forEach(function (c) {
      if (chIds[c.id] && c.play) sfida = sfida.concat(c.play);
    });
    var bookItems = (week.items || []).concat(sfida)
      .map(function (id) { return map[id]; })
      .filter(Boolean);

    var wantConj = Math.min(
      week.verbs && week.verbs.length ? Math.ceil(size * 0.35) : 0,
      size
    );
    var wantBook = size - wantConj;

    pickFresh(bookItems, wantBook, opts.state).forEach(function (it) { out.push(it); });

    for (var i = 0; i < wantConj; i++) {
      var verb = week.verbs[Math.floor(Math.random() * week.verbs.length)];
      var tense = week.tenses[Math.floor(Math.random() * week.tenses.length)];
      try {
        out.push(i % 2 === 0 ? conjugationDrill(verb, tense)
                             : conjugationTyped(verb, tense));
      } catch (e) { /* salta i verbi non coniugabili in quel tempo */ }
    }

    // Short: top up with other items of the week, then from the big bank,
    // never with a repeat.
    if (out.length < size) {
      var inRound = {}; out.forEach(function (it) { inRound[it.id] = 1; });
      pickFresh(bookItems.filter(function (it) { return !inRound[it.id]; }), size - out.length, opts.state)
        .forEach(function (it) { out.push(it); });
    }
    if (out.length < size) bankFill(opts.state, size - out.length).forEach(function (it) { out.push(it); });
    return shuffle(out).slice(0, size);
  }

  /* Il boss pesca da tutte le settimane già sbloccate, non solo dall'ultima. */
  function buildBoss(course, week, state, opts) {
    opts = opts || {};
    var size = opts.size || (week.week === 52 ? 40 : 25);
    var map = itemsById(course);
    var pool = [];
    course.weeks.forEach(function (w) {
      if (w.week <= week.week) {
        (w.items || []).forEach(function (id) {
          if (map[id]) pool.push(map[id]);
        });
      }
    });
    var out = sample(pool, Math.ceil(size * 0.7));
    var verbs = week.verbs || [], tenses = week.tenses || ["presente"];
    while (out.length < size && verbs.length) {
      var v = verbs[Math.floor(Math.random() * verbs.length)];
      var t = tenses[Math.floor(Math.random() * tenses.length)];
      try { out.push(conjugationTyped(v, t)); } catch (e) { break; }
    }
    return shuffle(out).slice(0, size);
  }

  /* Le frasi di conversazione vivono fuori dal corso: ogni ripasso ne
     rigenera l'esercizio, così la stessa frase torna in forma diversa. */
  function reviewItem(map, id, opts) {
    if (map[id]) return map[id];
    if (Frasi && Frasi.BY_ID[id]) return Frasi.pickItem(Frasi.BY_ID[id], opts);
    if (Lab && Lab.BY_ID[id]) return Lab.item(id);
    if (Banca && id.indexOf("b:") === 0) return Banca.item(id);
    return null;
  }

  function knownId(map, id) {
    return !!(map[id] || (Frasi && Frasi.BY_ID[id]) || (Lab && Lab.BY_ID[id]) ||
              (Banca && Banca.loaded() && id.indexOf("b:") === 0 && Banca.item(id)));
  }

  /* La coda del ripasso: schede scadute, le più in ritardo per prime. */
  function buildReview(course, state, size, opts) {
    var map = (opts && opts.map) || itemsById(course);
    var now = Date.now();
    var due = [];
    Object.keys(state.cards).forEach(function (id) {
      var card = state.cards[id];
      if (knownId(map, id) && card.due && card.due <= now) {
        due.push({ id: id, due: card.due });
      }
    });
    due.sort(function (a, b) { return a.due - b.due; });
    return due.slice(0, size || 20).map(function (d) {
      return reviewItem(map, d.id, opts);
    }).filter(Boolean);
  }

  function dueCount(course, state, map) {
    map = map || itemsById(course);
    var now = Date.now(), n = 0;
    Object.keys(state.cards).forEach(function (id) {
      var c = state.cards[id];
      if (knownId(map, id) && c.due && c.due <= now) n++;
    });
    return n;
  }

  /* La scena consigliata: la prima non ancora completata. */
  function nextScene(state) {
    if (!Frasi) return null;
    for (var i = 0; i < Frasi.SCENES.length; i++) {
      var p = Frasi.progress(Frasi.SCENES[i].id, state.cards);
      if (p.seen < p.total) return Frasi.SCENES[i];
    }
    return Frasi.SCENES[Math.floor(Math.random() * Frasi.SCENES.length)];
  }

  /* Pausa caffè: tre minuti.  Un po' di ripasso, due frasi nuove, qualche
     frase nota, una domanda del laboratorio e una della settimana.  Ogni frase
     nuova si presenta presto e si richiede dopo qualche domanda di mezzo:
     subito dopo la si ricorda "a vista", senza sforzo, e non serve
     (spacing dentro la sessione: Cepeda et al. 2006). */
  function buildPausa(course, state, week, opts) {
    opts = opts || {};
    var map = opts.map || itemsById(course);
    var review = buildReview(course, state, 3, { map: map, silent: opts.silent });
    var seenIds = {};
    review.forEach(function (it) { seenIds[it.id] = true; });

    var intros = [], drills = [], filler = review.slice();
    if (Frasi) {
      var sc = nextScene(state);
      Frasi.ofScene(sc.id).filter(function (f) {
        return !state.cards[f.id] && !seenIds[f.id];
      }).slice(0, 2).forEach(function (f) {
        intros.push({ id: f.id, frase: f, src: "frasi", type: "intro",
                      prompt: "Frase nueva", stem: f.it, answer: f.it, note: f.note });
        drills.push(Frasi.pickItem(f, { silent: opts.silent, fresh: true }));
        seenIds[f.id] = true;
      });
      shuffle(Frasi.ALL.filter(function (f) {
        return state.cards[f.id] && !seenIds[f.id];
      })).slice(0, 2).forEach(function (f) { filler.push(Frasi.pickItem(f, opts)); });
    }

    // Interleaving (Rohrer & Taylor 2007): una domanda del laboratorio.
    if (Lab) filler.push(Lab.randomItem(state.cards));

    // Del libro solo domande a scelta: in pausa si va veloci.
    var bookChoice = (week.items || []).map(function (id) { return map[id]; })
      .filter(function (it) { return it && it.type === "choice" && !seenIds[it.id]; });
    var fresh = pickFresh(bookChoice, 2, state).filter(function (it) {
      var c = state.cards[it.id];
      return !c || !c.due || c.due <= Date.now();   // already known and not due: leave it
    });
    fresh.forEach(function (it) { filler.push(it); });
    bankFill(state, 2 - fresh.length).forEach(function (it) { filler.push(it); });
    if (week.verbs && week.verbs.length) {
      try {
        filler.push(conjugationDrill(
          week.verbs[Math.floor(Math.random() * week.verbs.length)],
          week.tenses[Math.floor(Math.random() * week.tenses.length)]));
      } catch (e) { /* salta */ }
    }
    filler = shuffle(filler);

    // intro A, 2 filler, intro B, 2 filler, drill A, 2 filler, drill B, rest.
    var out = [];
    function take(n) { for (var i = 0; i < n && filler.length; i++) out.push(filler.shift()); }
    if (intros[0]) out.push(intros[0]);
    take(2);
    if (intros[1]) out.push(intros[1]);
    take(2);
    if (drills[0]) out.push(drills[0]);
    take(2);
    if (drills[1]) out.push(drills[1]);
    take(filler.length);
    return out.slice(0, 11);
  }

  /* Lampo: 60 secondi di scelte rapide castellano → italiano. */
  function lampoItem(state) {
    var pool = Frasi.ALL.filter(function (f) { return state.cards[f.id]; });
    if (pool.length < 8) pool = Frasi.ALL.slice(0, 40);
    var f = pool[Math.floor(Math.random() * pool.length)];
    var others = shuffle(Frasi.ALL.filter(function (g) {
      return g.id !== f.id && g.it !== f.it;
    }));
    var near = others.filter(function (g) { return g.scene === f.scene; }).slice(0, 2);
    var far = others.filter(function (g) { return g.scene !== f.scene; }).slice(0, 1);
    return {
      id: f.id, frase: f, src: "frasi", type: "choice",
      prompt: "¿Cómo se dice?",
      stem: f.es,
      options: shuffle([f.it].concat(near.concat(far).map(function (g) { return g.it; }))),
      answer: f.it, accept: [f.it], note: f.note
    };
  }

  var api = {
    shuffle: shuffle,
    sample: sample,
    itemsById: itemsById,
    conjugationDrill: conjugationDrill,
    conjugationTyped: conjugationTyped,
    buildRound: buildRound,
    pickFresh: pickFresh,
    buildBoss: buildBoss,
    buildReview: buildReview,
    dueCount: dueCount,
    nextScene: nextScene,
    buildPausa: buildPausa,
    lampoItem: lampoItem
  };

  if (typeof module === "object" && module.exports) module.exports = api;
  else root.Drills = api;
})(typeof window !== "undefined" ? window : globalThis);
