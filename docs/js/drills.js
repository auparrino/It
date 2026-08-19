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

  function shuffle(a, rnd) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor((rnd ? rnd() : Math.random()) * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function sample(a, n) { return shuffle(a).slice(0, n); }

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

    var bookItems = (week.items || [])
      .map(function (id) { return map[id]; })
      .filter(Boolean);

    var wantConj = Math.min(
      week.verbs && week.verbs.length ? Math.ceil(size * 0.35) : 0,
      size
    );
    var wantBook = size - wantConj;

    sample(bookItems, wantBook).forEach(function (it) { out.push(it); });

    for (var i = 0; i < wantConj; i++) {
      var verb = week.verbs[Math.floor(Math.random() * week.verbs.length)];
      var tense = week.tenses[Math.floor(Math.random() * week.tenses.length)];
      try {
        out.push(i % 2 === 0 ? conjugationDrill(verb, tense)
                             : conjugationTyped(verb, tense));
      } catch (e) { /* salta i verbi non coniugabili in quel tempo */ }
    }

    // Top up from the book bank if the conjugation gym came up short.
    while (out.length < size && bookItems.length) {
      out.push(bookItems[Math.floor(Math.random() * bookItems.length)]);
    }
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

  /* La coda del ripasso: schede scadute, le più in ritardo per prime. */
  function buildReview(course, state, size) {
    var map = itemsById(course);
    var now = Date.now();
    var due = [];
    Object.keys(state.cards).forEach(function (id) {
      var card = state.cards[id];
      if (map[id] && card.due && card.due <= now) {
        due.push({ item: map[id], due: card.due });
      }
    });
    due.sort(function (a, b) { return a.due - b.due; });
    return due.slice(0, size || 20).map(function (d) { return d.item; });
  }

  function dueCount(course, state) {
    var map = itemsById(course), now = Date.now(), n = 0;
    Object.keys(state.cards).forEach(function (id) {
      var c = state.cards[id];
      if (map[id] && c.due && c.due <= now) n++;
    });
    return n;
  }

  var api = {
    shuffle: shuffle,
    sample: sample,
    itemsById: itemsById,
    conjugationDrill: conjugationDrill,
    conjugationTyped: conjugationTyped,
    buildRound: buildRound,
    buildBoss: buildBoss,
    buildReview: buildReview,
    dueCount: dueCount
  };

  if (typeof module === "object" && module.exports) module.exports = api;
  else root.Drills = api;
})(typeof window !== "undefined" ? window : globalThis);
