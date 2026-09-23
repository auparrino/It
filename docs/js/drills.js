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
  var Lez = root.Lezione ||
    (typeof require === "function" ? require("./lezione.js") : null);

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

  /* Verbs marked aux "both" (mancare, guarire, servire, salire...) take
     essere when intransitive: the essere forms are right too. */
  function otherAux(verb, tense) {
    var info = Conj.info(verb);
    if (info.aux !== "both" || info.refl || Conj.SIMPLE_TENSES.indexOf(tense) >= 0) return null;
    return Conj.conjugate(verb, tense, { aux: "essere" });
  }

  /* known: the tenses already taught (week.known).  Distractors come only
     from those, so a week-6 learner never sees a congiuntivo as an option. */
  // persons: which persons make sense (piacere: only lui/lei and loro).
  function pickPerson(persons) {
    return persons && persons.length ? persons[Math.floor(Math.random() * persons.length)]
                                     : Math.floor(Math.random() * 6);
  }

  function conjugationDrill(verb, tense, known, persons) {
    var forms = Conj.conjugate(verb, tense);
    var alt = otherAux(verb, tense);
    var p = pickPerson(persons);
    var answer = forms[p];

    // Distractors: the same verb in other persons, then the same person in
    // other tenses — the mistakes a learner actually makes.  Several persons
    // often share a form (parli/parli/parli), so the pool must be deduped or
    // the same option shows up twice.
    var pool = [];
    function add(f) {
      if (f && f !== answer && pool.indexOf(f) < 0 &&
          !(alt && alt.indexOf(f) >= 0)) pool.push(f);
    }
    forms.forEach(add);
    var tenses = known && known.length ? known : Conj.ALL_TENSES;
    shuffle(tenses).forEach(function (t) {
      if (t === tense || pool.length >= 8) return;
      try { add(Conj.conjugate(verb, t)[p]); } catch (e) { /* non coniugabile */ }
    });
    // Last resort: other persons of other tenses, so we always reach 4 options.
    shuffle(tenses).forEach(function (t) {
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
      accept: alt ? [answer, alt[p]] : [answer],
      note: verb + " · " + Conj.TENSE_LABELS[tense] + ": " + forms.join(", ") +
            (alt ? " (o con essere: " + alt.join(", ") + ")" : "")
    };
  }

  function conjugationTyped(verb, tense, persons) {
    var forms = Conj.conjugate(verb, tense);
    var alt = otherAux(verb, tense);
    var p = pickPerson(persons);
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
      accept: alt ? [forms[p], alt[p]] : [forms[p]],
      note: verb + " · " + Conj.TENSE_LABELS[tense] + ": " + forms.join(", ") +
            (alt ? " (o con essere: " + alt.join(", ") + ")" : "")
    };
  }

  /* ------------------------------------------ riconoscere prima di produrre */

  /* The first time an exercise shows up, you recognise the answer among
     options; from the second time on, you write it (recognition before
     production: Nation 2013, and the project guide).  The options are the
     errors a Spanish speaker makes (accent, double consonant, ending,
     article: Lezione.traps) or answers of the same week that look alike.
     The id stays the same, so the SRS card is the one of the exercise. */
  var TYPED = { cloze: 1, translate: 1, conjugate: 1, plural: 1, numbers: 1, qa: 1, typed: 1 };

  function norm(x) {
    return String(x).toLowerCase().replace(/[’]/g, "'").replace(/[.,!?¿¡;:«»"]/g, "").replace(/\s+/g, " ").trim();
  }

  function recognitionOf(it, pool, week) {
    if (!it || !TYPED[it.type] || /\|/.test(it.answer || "") || !it.answer) return null;
    var answer = String(it.answer);
    if (answer.length > 90) return null;
    var accepted = {};
    (it.accept || [answer]).forEach(function (a) { accepted[norm(a)] = 1; });
    var opts = [];
    function add(o) {
      if (o && !accepted[norm(o)] && opts.every(function (x) { return norm(x) !== norm(o); })) opts.push(o);
    }
    // 1. conjugation: the same verb in other persons
    if (it.src === "coniugatore" && Conj) {
      var m = /^conjw?:([^:]+):([^:]+):(\d)$/.exec(it.id);
      if (m) {
        try { shuffle(Conj.conjugate(m[1], m[2])).forEach(add); } catch (e) { /* no */ }
      }
    }
    // 2. the typical errors on the answer itself
    if (opts.length < 3 && Lez) {
      Lez.traps(answer, Math.random, week || 52).slice(0, 3).forEach(add);
    }
    // 3. answers of the same kind from the same week, of similar length
    if (opts.length < 2 && pool) {
      var len = answer.length;
      shuffle(pool.filter(function (x) {
        return x && x.id !== it.id && x.type === it.type && x.answer && !/\|/.test(x.answer) &&
               Math.abs(String(x.answer).length - len) <= Math.max(4, len / 2);
      })).slice(0, 6).forEach(function (x) { add(String(x.answer)); });
    }
    if (opts.length < 2) return null;
    var copy = {};
    Object.keys(it).forEach(function (k) { copy[k] = it[k]; });
    copy.type = "choice";
    copy.recog = true;
    copy.options = shuffle(opts.slice(0, 3).concat([answer]));
    copy.prompt = it.type === "translate" ? "¿Cuál es la traducción en italiano?" : it.prompt;
    copy.note = "La próxima vez esta la vas a escribir." + (it.note ? " " + it.note : "");
    return copy;
  }

  // First sighting (no SRS card yet): recognition; otherwise as it is.
  function firstRecognize(list, state, week, pool) {
    var cards = (state && state.cards) || {};
    return list.map(function (it) {
      // phrases have their own ladder (tiles → memory): left alone
      if (!it || cards[it.id] || it.src === "frasi" || it.src === "lab" || it.src === "lettura") return it;
      return recognitionOf(it, pool || list, week) || it;
    });
  }

  /* -------------------------------------------------------- costruire round */

  function itemsById(course) {
    var map = {};
    course.items.forEach(function (it) { map[it.id] = it; });
    indexVocab(course);
    return map;
  }

  /* ---------------------------------------------------- palabras de la semana */

  /* Each week lists its new words (build_course.py: week.vocab, [italian,
     spanish, example]).  First you recognise the meaning among options, then
     you produce the word from the Spanish; the SRS card «v:<word>» brings it
     back in the ripasso like any other exercise. */
  var VOC = null;           // word → { v, week }

  function indexVocab(course) {
    VOC = {};
    (course.weeks || []).forEach(function (w) {
      (w.vocab || []).forEach(function (v) { VOC[v[0]] = { v: v, week: w.week }; });
    });
  }

  function vocabItem(word, state) {
    var e = VOC && VOC[word];
    if (!e) return null;
    var v = e.v, id = "v:" + v[0], card = state && state.cards && state.cards[id];
    if (!card) {
      // distractors: meanings of nearby weeks, never the same Spanish word
      var near = Object.keys(VOC).map(function (k) { return VOC[k]; }).filter(function (x) {
        return x.v[0] !== v[0] && x.v[1] !== v[1] && Math.abs(x.week - e.week) <= 3;
      });
      // same kind of word: a verb among nouns gives itself away
      var isVerb = function (it) { return /(are|ere|ire|rre|rsi)$/.test(it); };
      var same = shuffle(near.filter(function (x) { return isVerb(x.v[0]) === isVerb(v[0]); }));
      var opts = [v[1]];
      same.concat(shuffle(near)).forEach(function (x) { if (opts.length < 4 && opts.indexOf(x.v[1]) < 0) opts.push(x.v[1]); });
      return { id: id, src: "vocab", type: "choice", topic: "vocabolario",
               prompt: "¿Qué significa?", stem: v[0], options: shuffle(opts), answer: v[1],
               accept: [v[1]], note: v[2] ? "Ejemplo: *" + v[2] + "*" : "", say: v[0] };
    }
    return { id: id, src: "vocab", type: "cloze", topic: "vocabolario",
             prompt: "¿Cómo se dice en italiano?", stem: "«" + v[1] + "» → ___", answer: v[0],
             accept: [v[0]], note: v[2] ? "Ejemplo: *" + v[2] + "*" : "", say: v[0] };
  }

  // The week's words, new ones first, plus a few of earlier weeks that are due.
  function vocabSession(course, week, state, size) {
    if (!VOC) indexVocab(course);
    var cards = (state && state.cards) || {}, now = Date.now();
    var own = (week.vocab || []).map(function (v) { return v[0]; });
    var fresh = own.filter(function (w) { return !cards["v:" + w]; });
    var known = own.filter(function (w) { return cards["v:" + w]; });
    var due = Object.keys(VOC).filter(function (w) {
      var c = cards["v:" + w];
      return VOC[w].week < week.week && c && c.due <= now;
    });
    return fresh.concat(shuffle(known), shuffle(due).slice(0, 4)).slice(0, size || 14)
      .map(function (w) { return vocabItem(w, state); }).filter(Boolean);
  }

  /* Un round mescola tre sorgenti in modo che nessuna sessione sia uguale:
     item dei manuali, banco d'autore e ginnastica di coniugazione. */
  function buildRound(course, week, opts) {
    opts = opts || {};
    var size = opts.size || 12;
    var map = opts.map || itemsById(course);
    var out = [];

    // The week's own items (book, authored and graded sfide), all of them
    // already within reach: build_course.py moves what needs later theory.
    // Listening needs sound: in silent mode (the office) it waits.
    var audible = function (it) { return it && !(opts.silent && it.type === "listen"); };
    var bookItems = (week.items || [])
      .map(function (id) { return map[id]; })
      .filter(audible);
    // Review moved here from earlier weeks (a nouns exercise in passato
    // prossimo lands in week 17): a few per round, interleaved.
    var extra = (week.extra || [])
      .map(function (id) { return map[id]; })
      .filter(audible);

    // The gym weighs more when the week brings a new tense (gymShare, from
    // build_course.py); in review weeks it would only repeat «voi siete».
    var wantConj = Math.min(
      week.verbs && week.verbs.length ? Math.ceil(size * (week.gymShare || 0.35)) : 0,
      size
    );
    var wantBook = size - wantConj;
    var wantExtra = Math.min(extra.length, Math.round(wantBook / 4));

    pickFresh(bookItems, wantBook - wantExtra, opts.state).forEach(function (it) { out.push(it); });
    pickFresh(extra, wantExtra, opts.state).forEach(function (it) { out.push(it); });

    for (var i = 0; i < wantConj; i++) {
      var verb = week.verbs[Math.floor(Math.random() * week.verbs.length)];
      var tense = week.tenses[Math.floor(Math.random() * week.tenses.length)];
      try {
        out.push(i % 2 === 0 ? conjugationDrill(verb, tense, week.known, week.persons)
                             : conjugationTyped(verb, tense, week.persons));
      } catch (e) { /* salta i verbi non coniugabili in quel tempo */ }
    }

    // Short: top up with other items of the week, then from the big bank,
    // never with a repeat.
    if (out.length < size) {
      var inRound = {}; out.forEach(function (it) { inRound[it.id] = 1; });
      pickFresh(bookItems.concat(extra).filter(function (it) { return !inRound[it.id]; }), size - out.length, opts.state)
        .forEach(function (it) { out.push(it); });
    }
    if (out.length < size) bankFill(opts.state, size - out.length).forEach(function (it) { out.push(it); });
    // two words of the week, interleaved with the grammar
    if (week.vocab && week.vocab.length) {
      var vs = vocabSession(course, week, opts.state || {}, 2);
      out = out.slice(0, size - vs.length).concat(vs);
    }
    return firstRecognize(shuffle(out).slice(0, size), opts.state, week.week, bookItems);
  }

  /* Il boss pesca da tutte le settimane già sbloccate, non solo dall'ultima. */
  function buildBoss(course, week, state, opts) {
    opts = opts || {};
    var size = opts.size || (week.week === 52 ? 40 : 25);
    var map = itemsById(course);
    var pool = [];
    course.weeks.forEach(function (w) {
      if (w.week <= week.week) {
        (w.items || []).concat(w.extra || []).forEach(function (id) {
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
    if (id.indexOf("v:") === 0) return vocabItem(id.slice(2), opts && opts.state);
    if (Frasi && Frasi.BY_ID[id]) return Frasi.pickItem(Frasi.BY_ID[id], opts);
    if (Lab && Lab.BY_ID[id]) return Lab.item(id);
    if (Banca && id.indexOf("b:") === 0) return Banca.item(id);
    return null;
  }

  function knownId(map, id) {
    return !!(map[id] || (id.indexOf("v:") === 0 && VOC && VOC[id.slice(2)]) || (Frasi && Frasi.BY_ID[id]) || (Lab && Lab.BY_ID[id]) ||
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
      return reviewItem(map, d.id, Object.assign({ state: state }, opts));
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
  /* Il percorso è l'asse del corso: ogni scena di frasi ha la sua settimana,
     così le frasi arrivano quando la grammatica che usano è già stata vista
     (le opinioni con congiuntivo dopo la settimana 26, non il primo giorno). */
  var SCENE_WEEK = { ciao: 1, salva: 2, bar: 3, tavola: 4, giro: 5, casa: 6, lavoro: 7, negozi: 8,
                     reazioni: 9, ponti: 10, trappole: 12, chiacchiere: 14, cuore: 15, tempo: 19,
                     opinioni: 27, idee: 30, citazioni: 40 };
  function sceneWeek(id) { return SCENE_WEEK[id] || 52; }
  function scenesOfWeek(week) {
    if (!Frasi) return [];
    return Frasi.SCENES.filter(function (s) { return sceneWeek(s.id) === week; });
  }

  /* La scena del momento: la prima incompleta fra quelle già raggiunte nel
     percorso.  Se sono tutte complete, l'ultima raggiunta (ripasso), mai una
     di una settimana futura. */
  function nextScene(state) {
    if (!Frasi) return null;
    var unlocked = Math.min((state && state.unlocked) || 1, 52);
    var cards = (state && state.cards) || {};
    var ordered = Frasi.SCENES.slice().sort(function (a, b) { return sceneWeek(a.id) - sceneWeek(b.id); });
    var reached = ordered.filter(function (s) { return sceneWeek(s.id) <= unlocked; });
    if (!reached.length) reached = ordered.slice(0, 1);
    for (var i = 0; i < reached.length; i++) {
      var p = Frasi.progress(reached[i].id, cards);
      if (p.seen < p.total) return reached[i];
    }
    return reached[reached.length - 1];
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
    // week: the last week whose lesson the learner has read.  Before the
    // first lesson there is no grammar to practise: only phrases and words.
    if (Lab) filler.push(Lab.randomItem(state.cards, week ? week.week : 1));

    // Del libro solo domande a scelta: in pausa si va veloci.
    var bookChoice = ((week && week.items) || []).map(function (id) { return map[id]; })
      .filter(function (it) { return it && it.type === "choice" && !seenIds[it.id]; });
    var fresh = pickFresh(bookChoice, 2, state).filter(function (it) {
      var c = state.cards[it.id];
      return !c || !c.due || c.due <= Date.now();   // already known and not due: leave it
    });
    fresh.forEach(function (it) { filler.push(it); });
    if (week) bankFill(state, 2 - fresh.length).forEach(function (it) { filler.push(it); });
    if (week && week.verbs && week.verbs.length) {
      try {
        filler.push(conjugationDrill(
          week.verbs[Math.floor(Math.random() * week.verbs.length)],
          week.tenses[Math.floor(Math.random() * week.tenses.length)], week.known, week.persons));
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
    return firstRecognize(out.slice(0, 11), state, week ? week.week : 1);
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
    sceneWeek: sceneWeek,
    scenesOfWeek: scenesOfWeek,
    firstRecognize: firstRecognize,
    vocabSession: vocabSession,
    vocabItem: vocabItem,
    recognitionOf: recognitionOf,
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
