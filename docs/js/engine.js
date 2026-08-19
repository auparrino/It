/*
 * Il motore del gioco: correzione delle risposte, ripetizione dilazionata,
 * punti esperienza e salvataggio.  Nessuna dipendenza esterna.
 */
(function (root) {
  "use strict";

  /* ------------------------------------------------------------ correzione */

  // Accents are meaningful in Italian (parlerò ≠ parlero), so they are kept.
  // Everything else that only reflects typing habits is normalised away.
  function normalise(s) {
    return String(s == null ? "" : s)
      .toLowerCase()
      .replace(/[’‘`´]/g, "'")
      .replace(/[“”]/g, '"')
      .replace(/\s+/g, " ")
      .replace(/^[\s.,;:!?]+|[\s.,;:!?]+$/g, "")
      .trim();
  }

  function deaccent(s) {
    return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  // Distance capped at 2 — enough to forgive a slip, not enough to accept a
  // different verb form.
  function editDistance(a, b) {
    if (Math.abs(a.length - b.length) > 2) return 99;
    var prev = [], cur = [], i, j;
    for (j = 0; j <= b.length; j++) prev[j] = j;
    for (i = 1; i <= a.length; i++) {
      cur[0] = i;
      for (j = 1; j <= b.length; j++) {
        cur[j] = Math.min(
          prev[j] + 1,
          cur[j - 1] + 1,
          prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
        );
      }
      prev = cur.slice();
    }
    return prev[b.length];
  }

  var VERDICT = { RIGHT: "giusto", CLOSE: "quasi", WRONG: "sbagliato" };

  function grade(given, item) {
    var g = normalise(given);
    if (!g) return VERDICT.WRONG;

    var accepted = (item.accept && item.accept.length ? item.accept : [item.answer])
      .map(normalise)
      .filter(Boolean);

    // Some book answers are a list of equally valid words ("grandi, buone").
    var expanded = accepted.slice();
    accepted.forEach(function (a) {
      if (a.indexOf(",") >= 0) {
        a.split(",").forEach(function (p) {
          p = normalise(p);
          if (p) expanded.push(p);
        });
      }
      if (a.indexOf("|") >= 0) {
        // Multi-gap items: the learner may type the gaps separated by | or space.
        expanded.push(a.replace(/\s*\|\s*/g, " "));
      }
    });

    if (expanded.indexOf(g) >= 0) return VERDICT.RIGHT;

    // Right word, missing accent (parlero for parlerò): worth partial credit
    // and an explicit correction, never a silent pass.
    for (var k = 0; k < expanded.length; k++) {
      if (deaccent(g) === deaccent(expanded[k])) return VERDICT.CLOSE;
    }

    // Typo tolerance scales with length.  On a single word a one-letter
    // difference is usually the grammatical ending the drill is testing
    // (parla vs parli), so short answers must match exactly.
    for (var i = 0; i < expanded.length; i++) {
      var want = expanded[i];
      var budget = want.length > 20 ? 2 : want.length > 8 ? 1 : 0;
      if (budget && editDistance(g, want) <= budget) return VERDICT.CLOSE;
    }
    return VERDICT.WRONG;
  }

  /* ------------------------------------------------- ripetizione dilazionata */

  /* SM-2 semplificato.  Ogni scheda tiene: ease, interval (giorni), due (ms). */
  var DAY = 86400000;

  function schedule(card, quality) {
    // quality: 0 sbagliato, 1 quasi, 2 giusto
    card = card || { ease: 2.5, interval: 0, reps: 0 };
    if (quality === 0) {
      card.reps = 0;
      card.interval = 0;
      card.ease = Math.max(1.3, card.ease - 0.2);
    } else {
      card.reps += 1;
      if (quality === 1) {
        card.ease = Math.max(1.3, card.ease - 0.15);
        card.interval = card.reps === 1 ? 1 : Math.max(1, Math.round(card.interval * 1.2));
      } else {
        card.ease = Math.min(2.8, card.ease + 0.1);
        card.interval = card.reps === 1 ? 1
          : card.reps === 2 ? 3
          : Math.round(card.interval * card.ease);
      }
    }
    card.due = Date.now() + Math.max(card.interval, 0) * DAY;
    card.seen = (card.seen || 0) + 1;
    return card;
  }

  function isDue(card, now) {
    return !card || !card.due || card.due <= (now || Date.now());
  }

  /* --------------------------------------------------------------- progressi */

  // Level curve: each level costs a bit more than the last.
  function levelFor(xp) {
    var lvl = 1, need = 100, total = 0;
    while (xp >= total + need) {
      total += need;
      lvl += 1;
      need = Math.round(need * 1.15);
    }
    return { level: lvl, into: xp - total, need: need };
  }

  var XP = { right: 10, close: 4, bonusCombo: 2, boss: 150, challenge: 6,
           lesson: 15 };

  function xpFor(verdict, combo) {
    if (verdict === VERDICT.RIGHT) {
      return XP.right + Math.min(combo, 10) * XP.bonusCombo;
    }
    if (verdict === VERDICT.CLOSE) return XP.close;
    return 0;
  }

  /* --------------------------------------------------------------- salvataggio */

  var KEY = "laviac1.save.v1";

  function blankSave() {
    return {
      xp: 0,
      coins: 0,
      week: 1,
      unlocked: 1,
      streak: 0,
      lastPlayed: null,
      cards: {},          // itemId -> scheda SRS
      read: {},           // week -> timestamp della lezione letta
      weekStats: {},      // week -> { attempts, right, bossPassed }
      challengeLog: {},   // challengeId -> autovalutazione
      badges: [],
      totals: { attempts: 0, right: 0, close: 0, wrong: 0 }
    };
  }

  function load() {
    try {
      var raw = root.localStorage && root.localStorage.getItem(KEY);
      if (!raw) return blankSave();
      var s = JSON.parse(raw);
      var base = blankSave();
      Object.keys(base).forEach(function (k) {
        if (s[k] === undefined) s[k] = base[k];
      });
      return s;
    } catch (e) {
      return blankSave();
    }
  }

  function save(state) {
    try {
      root.localStorage.setItem(KEY, JSON.stringify(state));
      return true;
    } catch (e) {
      return false;
    }
  }

  function today() {
    var d = new Date();
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  }

  // The streak counts consecutive calendar days, not sessions.
  function touchStreak(state) {
    var t = today();
    if (state.lastPlayed === t) return state.streak;
    var y = new Date(Date.now() - DAY);
    var yesterday = y.getFullYear() + "-" + (y.getMonth() + 1) + "-" + y.getDate();
    state.streak = state.lastPlayed === yesterday ? state.streak + 1 : 1;
    state.lastPlayed = t;
    return state.streak;
  }

  /* ----------------------------------------------------------------- badge */

  var BADGES = [
    { id: "primo-passo", name: "Primo passo", desc: "Contestá tu primera pregunta.",
      test: function (s) { return s.totals.attempts >= 1; } },
    { id: "centurione", name: "Centurione", desc: "100 respuestas correctas.",
      test: function (s) { return s.totals.right >= 100; } },
    { id: "mille", name: "Mille", desc: "1000 respuestas correctas.",
      test: function (s) { return s.totals.right >= 1000; } },
    { id: "settimana", name: "Sette giorni", desc: "Racha de 7 días.",
      test: function (s) { return s.streak >= 7; } },
    { id: "mese", name: "Trenta giorni", desc: "Racha de 30 días.",
      test: function (s) { return s.streak >= 30; } },
    { id: "a2", name: "Livello A2", desc: "Superá el boss de la semana 13.",
      test: function (s) { return !!(s.weekStats[13] || {}).bossPassed; } },
    { id: "b1", name: "Livello B1", desc: "Superá el boss de la semana 26.",
      test: function (s) { return !!(s.weekStats[26] || {}).bossPassed; } },
    { id: "b2", name: "Livello B2", desc: "Superá el boss de la semana 39.",
      test: function (s) { return !!(s.weekStats[39] || {}).bossPassed; } },
    { id: "c1", name: "Livello C1", desc: "Superá el examen final.",
      test: function (s) { return !!(s.weekStats[52] || {}).bossPassed; } },
    { id: "congiuntivo", name: "Maestro del congiuntivo",
      desc: "Superá el boss de la semana 39 sin perder vidas.",
      test: function (s) { return (s.weekStats[39] || {}).perfect === true; } },
    { id: "sfidante", name: "Sfidante", desc: "50 desafíos del Soluzioni resueltos.",
      test: function (s) { return Object.keys(s.challengeLog).length >= 50; } },
    { id: "studioso", name: "Studioso", desc: "Leé la teoría de 10 semanas.",
      test: function (s) { return Object.keys(s.read || {}).length >= 10; } },
    { id: "erudito", name: "Erudito", desc: "Leé la teoría de las 52 semanas.",
      test: function (s) { return Object.keys(s.read || {}).length >= 52; } }
  ];

  function checkBadges(state) {
    var won = [];
    BADGES.forEach(function (b) {
      if (state.badges.indexOf(b.id) < 0 && b.test(state)) {
        state.badges.push(b.id);
        won.push(b);
      }
    });
    return won;
  }

  var api = {
    VERDICT: VERDICT,
    XP: XP,
    BADGES: BADGES,
    normalise: normalise,
    deaccent: deaccent,
    editDistance: editDistance,
    grade: grade,
    schedule: schedule,
    isDue: isDue,
    levelFor: levelFor,
    xpFor: xpFor,
    blankSave: blankSave,
    load: load,
    save: save,
    touchStreak: touchStreak,
    checkBadges: checkBadges,
    STORAGE_KEY: KEY
  };

  if (typeof module === "object" && module.exports) module.exports = api;
  else root.Engine = api;
})(typeof window !== "undefined" ? window : globalThis);
