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
      totals: { attempts: 0, right: 0, close: 0, wrong: 0 },
      days: {},           // "aaaa-m-g" -> xp guadagnata quel giorno
      goal: 200,          // obiettivo di xp al giorno (~2 pause caffè)
      goalV: 2,           // versione della scala dell'obiettivo
      shields: 1,         // scudi che salvano la serie se salti un giorno
      chest: null,        // giorno in cui hai aperto il forziere
      best: {},           // record personali: lampo, combo
      silent: false,      // modalità ufficio: niente audio automatico
      written: 0,         // frasi scritte a memoria senza errori
      letture: {},        // puntata -> { pct, at } delle letture fatte
      errs: {},           // categoria d'errore -> { n, fixed, last }
      errLog: []          // ultimi errori: { cat, g, e, at }
    };
  }

  function load() {
    try {
      var raw = root.localStorage && root.localStorage.getItem(KEY);
      if (!raw) return blankSave();
      var s = JSON.parse(raw);
      var base = blankSave();
      // The first goal scale (20-150) was reached with a single session; map
      // old choices onto the new one before filling the missing fields.
      if (s.goalV !== 2) {
        s.goal = { 20: 100, 50: 200, 100: 350, 150: 500 }[s.goal] || 200;
        s.goalV = 2;
      }
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

  function dayKey(d) {
    d = d || new Date();
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  }

  function today() { return dayKey(); }

  // Whole calendar days between two day keys (b - a).
  function daysBetween(a, b) {
    function parse(k) {
      var p = k.split("-");
      return Date.UTC(+p[0], +p[1] - 1, +p[2]);
    }
    return Math.round((parse(b) - parse(a)) / DAY);
  }

  /* The streak counts consecutive calendar days, not sessions.  A shield
     covers each missed day, so one bad day at work doesn't wipe a month. */
  function touchStreak(state, now) {
    var t = dayKey(now);
    if (state.lastPlayed === t) return state.streak;
    var gap = state.lastPlayed ? daysBetween(state.lastPlayed, t) : 99;
    var missed = gap - 1;
    if (gap === 1) state.streak += 1;
    else if (missed > 0 && missed <= (state.shields || 0) && state.streak > 0) {
      state.shields -= missed;
      state.shieldUsed = t;
      state.streak += 1;
    } else state.streak = 1;
    // Every 7 days of streak earns a shield (max 3 in the pocket).
    if (state.streak % 7 === 0) state.shields = Math.min(3, (state.shields || 0) + 1);
    state.lastPlayed = t;
    return state.streak;
  }

  // XP earned today, and whether today's goal has just been reached.
  function addXp(state, n, now) {
    var k = dayKey(now);
    if (!state.days) state.days = {};
    var before = state.days[k] || 0;
    state.days[k] = before + n;
    state.xp += n;
    var goal = state.goal || 200;
    return before < goal && state.days[k] >= goal;
  }

  function todayXp(state, now) {
    return (state.days || {})[dayKey(now)] || 0;
  }

  // The last n days as [{key, xp}] from oldest to today.
  function lastDays(state, n, now) {
    var out = [], base = now ? now.getTime() : Date.now();
    for (var i = n - 1; i >= 0; i--) {
      var k = dayKey(new Date(base - i * DAY));
      out.push({ key: k, xp: (state.days || {})[k] || 0 });
    }
    return out;
  }

  /* Il forziere: una volta al giorno, raggiunto l'obiettivo, una ricompensa
     a sorpresa.  La varietà è ciò che fa tornare. */
  function openChest(state, rnd, now) {
    var k = dayKey(now);
    if (state.chest === k) return null;
    if (todayXp(state, now) < (state.goal || 200)) return null;
    state.chest = k;
    var r = (rnd || Math.random)();
    var prize;
    if (r < 0.15 && (state.shields || 0) < 3) {
      state.shields = (state.shields || 0) + 1;
      prize = { kind: "shield", label: "🛡️ ¡Un escudo de racha!" };
    } else if (r < 0.35) {
      prize = { kind: "xp", xp: 50, label: "💎 ¡Premio gordo: +50 xp!" };
    } else {
      var n = 10 + Math.floor((rnd || Math.random)() * 4) * 5;
      prize = { kind: "xp", xp: n, label: "✨ +" + n + " xp" };
    }
    if (prize.xp) state.xp += prize.xp;
    state.coins = (state.coins || 0) + 1;
    return prize;
  }

  /* I gradi: un titolo per ogni tappa, da turista a madrelingua. */
  var RANKS = [
    [1, "Turista"], [3, "Viaggiatore"], [6, "Studente Erasmus"],
    [10, "Pendolare"], [15, "Cittadino"], [21, "Chiacchierone"],
    [28, "Oratore"], [36, "Poeta"], [45, "Dantesco"], [55, "Madrelingua"]
  ];
  function rankFor(level) {
    var r = RANKS[0][1];
    RANKS.forEach(function (x) { if (level >= x[0]) r = x[1]; });
    return r;
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
      test: function (s) { return Object.keys(s.read || {}).length >= 52; } },
    { id: "penna", name: "Prima penna", desc: "Escribí de memoria tu primera frase.",
      test: function (s) { return (s.written || 0) >= 1; } },
    { id: "scrittore", name: "Scrittore", desc: "100 frases escritas de memoria.",
      test: function (s) { return (s.written || 0) >= 100; } },
    { id: "fulmine", name: "Fulmine", desc: "20 aciertos en un Lampo de 60 segundos.",
      test: function (s) { return ((s.best || {}).lampo || 0) >= 20; } },
    { id: "frasario", name: "Frasario", desc: "100 frases de conversación aprendidas.",
      test: function (s) {
        return Object.keys(s.cards).filter(function (k) {
          return k.indexOf("frase:") === 0;
        }).length >= 100;
      } },
    { id: "lettore", name: "Lettore", desc: "Terminá 5 lecturas.",
      test: function (s) { return Object.keys(s.letture || {}).length >= 5; } },
    { id: "bologna", name: "Bolognese", desc: "Terminá la historia de Martín.",
      test: function (s) { return !!(s.letture || {}).ep10; } },
    { id: "umanista", name: "Umanista", desc: "Leé las 10 lecturas de cultura.",
      test: function (s) {
        return Object.keys(s.letture || {}).filter(function (k) {
          return k.indexOf("c-") === 0;
        }).length >= 10;
      } },
    { id: "ponte", name: "Pontiere", desc: "50 cognados pasados al italiano.",
      test: function (s) {
        return Object.keys(s.cards).filter(function (k) {
          return k.indexOf("ponte:") === 0;
        }).length >= 50;
      } },
    { id: "costante", name: "Costante", desc: "Cumplí la meta diaria 5 días.",
      test: function (s) {
        var g = s.goal || 200;
        return Object.keys(s.days || {}).filter(function (k) {
          return s.days[k] >= g;
        }).length >= 5;
      } }
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
    dayKey: dayKey,
    daysBetween: daysBetween,
    addXp: addXp,
    todayXp: todayXp,
    lastDays: lastDays,
    openChest: openChest,
    rankFor: rankFor,
    RANKS: RANKS,
    checkBadges: checkBadges,
    STORAGE_KEY: KEY
  };

  if (typeof module === "object" && module.exports) module.exports = api;
  else root.Engine = api;
})(typeof window !== "undefined" ? window : globalThis);
