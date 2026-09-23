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
      // Only a list of single words is a list of alternatives; a sentence
      // with commas is one answer and its pieces are not right on their own.
      if (a.indexOf(",") >= 0 && a.split(",").every(function (p) { return p.trim().split(/\s+/).length <= 2; })) {
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

  function schedule(card, quality, opts) {
    // quality: 0 sbagliato, 1 quasi, 2 giusto
    // opts.light: right at first sight in the training, so it comes back in
    // two weeks, not tomorrow (20-30 new cards a day at most, no backlog).
    if (!card && quality === 2 && opts && opts.light) {
      card = { ease: 2.5, interval: 14, reps: 2, light: true };
      card.due = Date.now() + 14 * DAY;
      card.last = Date.now();
      card.seen = 1;
      return card;
    }
    card = card || { ease: 2.5, interval: 0, reps: 0 };
    // A light card that comes back right is learnt: it retires at once.
    if (card.light && quality === 2) {
      card.light = false; card.reps += 1; card.interval = 90;
      card.due = Date.now() + 90 * DAY; card.last = Date.now(); card.seen = (card.seen || 0) + 1;
      return card;
    }
    if (card.light) card.light = false;
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
    card.last = Date.now();
    card.seen = (card.seen || 0) + 1;
    return card;
  }

  function isDue(card, now) {
    return !card || !card.due || card.due <= (now || Date.now());
  }
  // Twenty days of interval (four successes in a row: 1, 3, 8, 22 days):
  // learnt.  It leaves the review queue for good, so the queue never
  // becomes a debt (the year's simulation drains it at 20 reviews a day).
  function retired(card) { return !!card && (card.interval || 0) >= 20; }

  /* Fin de semana liviano (la guía): la meta baja a la mitad el sábado y el
     domingo, para no cortar la racha ni pedir las tres horas. */
  function goalFor(state, now) {
    var d = now || new Date(), goal = state.goal || 200;
    var wd = d.getDay();
    return wd === 0 || wd === 6 ? Math.max(50, Math.round(goal / 2 / 50) * 50) : goal;
  }

  /* Las cuatro destrezas de Nation: input, output, forma y fluidez, xp por
     día, para mostrar el equilibrio de la semana. */
  var STRANDS = ["input", "output", "forma", "fluidez"];
  function addStrand(state, strand, n, now) {
    if (!n || STRANDS.indexOf(strand) < 0) return;
    var k = dayKey(now);
    if (!state.strands) state.strands = {};
    var d = state.strands[k] || (state.strands[k] = {});
    d[strand] = (d[strand] || 0) + n;
    // Only the last 14 days are kept.
    Object.keys(state.strands).forEach(function (kk) { if (daysBetween(kk, k) > 14) delete state.strands[kk]; });
    if (STRANDS.every(function (x) { return d[x] > 0; })) state.balancedDay = true;
  }
  function strandsLast(state, days, now) {
    var out = { input: 0, output: 0, forma: 0, fluidez: 0 }, k = dayKey(now);
    Object.keys(state.strands || {}).forEach(function (kk) {
      if (daysBetween(kk, k) < (days || 7)) STRANDS.forEach(function (x) { out[x] += (state.strands[kk][x] || 0); });
    });
    return out;
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
      lessonScore: {},    // week -> miglior % nei controlli della lezione giocata
      weekStats: {},      // week -> { attempts, right, bossPassed }
      challengeLog: {},   // challengeId -> autovalutazione
      badges: [],
      totals: { attempts: 0, right: 0, close: 0, wrong: 0 },
      days: {},           // "aaaa-m-g" -> xp guadagnata quel giorno
      goal: 200,          // obiettivo di xp al giorno (~2 pause caffè)
      goalV: 2,           // versione della scala dell'obiettivo
      syllabusV: 2,       // versione dell'ordine delle settimane (v. migrateSyllabus)
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

  /* A save can come back damaged (an old version, a half-written copy, a
     hand-edited backup).  Every field is checked against the blank save:
     wrong types go back to their default, numbers are clamped, broken
     entries dropped.  What is valid is kept. */
  function isObj(v) { return !!v && typeof v === "object" && !Array.isArray(v); }
  function num(v, def, min, max) {
    v = +v;
    if (!isFinite(v)) return def;
    if (min !== undefined && v < min) v = min;
    if (max !== undefined && v > max) v = max;
    return v;
  }

  function sanitize(s) {
    var base = blankSave();
    if (!isObj(s)) return base;
    Object.keys(base).forEach(function (k) {
      var b = base[k], v = s[k];
      if (v === undefined) { s[k] = b; return; }
      if (typeof b === "number") s[k] = num(v, b);
      else if (typeof b === "boolean") s[k] = !!v;
      else if (Array.isArray(b)) { if (!Array.isArray(v)) s[k] = b; }
      else if (isObj(b) || (b && typeof b === "object")) { if (!isObj(v)) s[k] = b; }
      else if (b === null) { if (v !== null && typeof v !== "string") s[k] = null; }
    });
    s.xp = num(s.xp, 0, 0);
    s.coins = num(s.coins, 0, 0);
    s.unlocked = Math.round(num(s.unlocked, 1, 1, 52));
    s.week = Math.round(num(s.week, 1, 1, 52));
    s.streak = Math.round(num(s.streak, 0, 0));
    s.shields = Math.round(num(s.shields, 1, 0, 3));
    s.spoken = num(s.spoken, 0, 0);
    s.written = num(s.written, 0, 0);
    if ([100, 200, 350, 500].indexOf(s.goal) < 0) s.goal = 200;
    ["attempts", "right", "close", "wrong"].forEach(function (k) {
      s.totals[k] = num(s.totals[k], 0, 0);
    });
    s.badges = s.badges.filter(function (b) { return typeof b === "string"; });
    Object.keys(s.cards).forEach(function (id) {
      var c = s.cards[id];
      if (!isObj(c)) { delete s.cards[id]; return; }
      c.ease = num(c.ease, 2.5, 1.3, 2.8);
      c.interval = num(c.interval, 0, 0);
      c.reps = num(c.reps, 0, 0);
      c.due = num(c.due, 0, 0);
    });
    Object.keys(s.days).forEach(function (k) {
      if (!isFinite(+s.days[k])) delete s.days[k]; else s.days[k] = +s.days[k];
    });
    Object.keys(s.errs).forEach(function (k) {
      var e = s.errs[k];
      if (!isObj(e) || !isFinite(+e.n)) { delete s.errs[k]; return; }
      e.n = num(e.n, 0, 0); e.fixed = num(e.fixed, 0, 0); e.last = num(e.last, 0, 0);
    });
    s.errLog = s.errLog.filter(isObj).slice(0, 60);
    Object.keys(s.weekStats).forEach(function (k) {
      var w = s.weekStats[k];
      if (!isObj(w)) { delete s.weekStats[k]; return; }
      w.attempts = num(w.attempts, 0, 0); w.right = num(w.right, 0, 0);
    });
    Object.keys(s.letture).forEach(function (k) {
      if (!isObj(s.letture[k])) delete s.letture[k];
      else s.letture[k].pct = num(s.letture[k].pct, 0, 0, 100);
    });
    return s;
  }

  /* Il programma è stato riordinato secondo la guida (passato prossimo nel
     primo trimestre; ci/ne, pronomi combinati e congiuntivo nel secondo).
     Chi aveva già giocato ha le settimane numerate col vecchio ordine: le
     rinumeriamo, e la settimana sbloccata diventa la prima del nuovo ordine
     che non aveva ancora fatto (niente salti di teoria). */
  var OLD_TO_NEW = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 7, 6: 5, 7: 6, 8: 10, 9: 12, 10: 14, 11: 8, 12: 9, 13: 13,
    14: 17, 15: 28, 16: 27, 17: 11, 18: 15, 19: 16, 20: 19, 21: 20, 22: 23, 23: 18, 24: 46, 25: 47, 26: 26,
    27: 24, 28: 25, 29: 29, 30: 30, 31: 32, 32: 33, 33: 31, 34: 35, 35: 36, 36: 22, 37: 21, 38: 34, 39: 39,
    40: 40, 41: 41, 42: 42, 43: 43, 44: 44, 45: 37, 46: 45, 47: 38, 48: 48, 49: 49, 50: 50, 51: 51, 52: 52 };

  function migrateSyllabus(s) {
    if (!isObj(s) || s.syllabusV === 2) return s;
    ["read", "lessonScore", "weekStats"].forEach(function (k) {
      if (!isObj(s[k])) return;
      var out = {};
      Object.keys(s[k]).forEach(function (w) { if (OLD_TO_NEW[w]) out[OLD_TO_NEW[w]] = s[k][w]; });
      s[k] = out;
    });
    var done = {};
    for (var w = 1; w < (+s.unlocked || 1); w++) done[OLD_TO_NEW[w]] = true;
    var u = 1;
    while (u < 52 && done[u]) u++;
    s.unlocked = u;
    s.week = OLD_TO_NEW[s.week] || 1;
    s.syllabusV = 2;
    return s;
  }

  function load() {
    var raw = null;
    try {
      raw = root.localStorage && root.localStorage.getItem(KEY);
      if (!raw) return blankSave();
      var s = migrateSyllabus(JSON.parse(raw));
      if (isObj(s) && s.goalV !== 2) {
        // The first goal scale (20-150) was reached with a single session.
        s.goal = { 20: 100, 50: 200, 100: 350, 150: 500 }[s.goal] || 200;
        s.goalV = 2;
      }
      return sanitize(s);
    } catch (e) {
      // Unreadable: keep a copy aside before a new save overwrites it.
      try { if (raw) root.localStorage.setItem(KEY + ".damaged", raw); } catch (e2) { /* */ }
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
    // The phone's clock went back (manual change, travel): keep the streak.
    if (gap < 0) return state.streak;
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
    var goal = goalFor(state, now);
    return before < goal && state.days[k] >= goal;
  }

  function todayXp(state, now) {
    return (state.days || {})[dayKey(now)] || 0;
  }

  // The last n days as [{key, xp}] from oldest to today.
  function lastDays(state, n, now) {
    var out = [], base = now || new Date();
    for (var i = n - 1; i >= 0; i--) {
      // Calendar arithmetic, not 24 h steps: DST days have 23 or 25 hours.
      var k = dayKey(new Date(base.getFullYear(), base.getMonth(), base.getDate() - i, 12));
      out.push({ key: k, xp: (state.days || {})[k] || 0 });
    }
    return out;
  }

  /* Il forziere: una volta al giorno, raggiunto l'obiettivo, una ricompensa
     a sorpresa.  La varietà è ciò che fa tornare. */
  function openChest(state, rnd, now) {
    var k = dayKey(now);
    if (state.chest === k) return null;
    if (todayXp(state, now) < goalFor(state, now)) return null;
    state.chest = k;
    var r = (rnd || Math.random)();
    var prize;
    if (r < 0.15 && (state.shields || 0) < 3) {
      state.shields = (state.shields || 0) + 1;
      prize = { kind: "shield", label: "🛡️ ¡Un escudo de racha!" };
    } else if (r < 0.35) {
      prize = { kind: "xp", xp: 50, label: "💎 ¡Premio gordo: +50 xp!" };
    } else if (r < 0.6) {
      state.boost = (state.boost || 0) + 1;
      prize = { kind: "boost", label: "🎟️ ¡Doble xp en tu próxima ronda!" };
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
    // Calibrati su una carriera intera: chi gioca tutto il corso arriva al
    // livello 40 (tools/sim_carriera.js).  Madrelingua è la fine del corso.
    [1, "Turista"], [3, "Viaggiatore"], [6, "Studente Erasmus"],
    [10, "Pendolare"], [14, "Cittadino"], [18, "Chiacchierone"],
    [23, "Oratore"], [28, "Poeta"], [34, "Dantesco"], [40, "Madrelingua"]
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
    { id: "a2", name: "Livello A2", desc: "Vencé al jefe de la semana 13.",
      test: function (s) { return !!(s.weekStats[13] || {}).bossPassed; } },
    { id: "b1", name: "Livello B1", desc: "Vencé al jefe de la semana 26.",
      test: function (s) { return !!(s.weekStats[26] || {}).bossPassed; } },
    { id: "b2", name: "Livello B2", desc: "Vencé al jefe de la semana 39.",
      test: function (s) { return !!(s.weekStats[39] || {}).bossPassed; } },
    { id: "c1", name: "Livello C1", desc: "Superá el examen final.",
      test: function (s) { return !!(s.weekStats[52] || {}).bossPassed; } },
    { id: "congiuntivo", name: "Maestro del congiuntivo",
      desc: "Vencé al jefe de la semana 39 sin perder vidas.",
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
      test: function (s) { return !!(s.letture || {}).ep13; } },
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
    { id: "perfetta", name: "Settimana perfetta", desc: "Completá todas las misiones de una semana.",
      test: function (s) { return Object.keys(s.perfectWeeks || {}).length >= 1; } },
    { id: "dieci-perfette", name: "Dieci perfette", desc: "Diez semanas con todas las misiones.",
      test: function (s) { return Object.keys(s.perfectWeeks || {}).length >= 10; } },
    { id: "equilibrio", name: "Quattro corde", desc: "Un día con las cuatro destrezas: input, output, forma y fluidez.",
      test: function (s) { return !!s.balancedDay; } },
    { id: "cinquecento", name: "Cinquecento parole", desc: "500 palabras practicadas.",
      test: function (s) {
        return Object.keys(s.cards).filter(function (k) { return k.indexOf("v:") === 0 || k.indexOf("b:voc:") === 0; }).length >= 500;
      } },
    { id: "giornaliera", name: "Sfidante del giorno", desc: "Diez sfide del giorno ganadas.",
      test: function (s) { return (s.dailyWon || 0) >= 10; } },
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
    retired: retired,
    goalFor: goalFor,
    STRANDS: STRANDS,
    addStrand: addStrand,
    strandsLast: strandsLast,
    levelFor: levelFor,
    xpFor: xpFor,
    blankSave: blankSave,
    load: load,
    sanitize: sanitize,
    migrateSyllabus: migrateSyllabus,
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
