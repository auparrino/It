/*
 * La Via C1 — interfaccia del gioco.
 * Schermate: percorso, briefing, allenamento, boss, ripasso, sfide, medaglie.
 */
(function () {
  "use strict";

  var course = null;
  var state = Engine.load();
  var view = { screen: "percorso", week: 1, tab: "percorso" };
  var round = null;
  var itemMap = {};
  var oggi = null;                 // piano del giorno scritto da custode.py
  var chat = null;                 // conversazione col Compagno
  var drafts = {};                 // testi scritti, sopravvivono ai re-render

  var $ = function (sel) { return document.querySelector(sel); };
  var app = function () { return $("#app"); };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function toast(msg, ms) {
    var t = document.createElement("div");
    t.className = "toast";
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, ms || 2200);
  }

  function persist() {
    state.savedAt = Date.now();
    Engine.save(state);
    Sync.push(state);
  }

  // A button that is waiting for the local model: disabled, with a hint.
  function busy(btn, on, label) {
    if (!btn) return;
    if (on) {
      btn.dataset.label = btn.textContent;
      btn.textContent = label || "Il Maestro piensa…";
      btn.disabled = true;
    } else {
      btn.textContent = btn.dataset.label || btn.textContent;
      btn.disabled = false;
    }
  }

  function tutorOn() { return Tutor.status.ok && !!Tutor.config.model; }

  function needTutor() {
    if (tutorOn()) return true;
    toast("Il Maestro no está conectado: mirá la pestaña Maestro.", 3200);
    return false;
  }

  function tutorLog() {
    if (!state.tutor) state.tutor = { graded: 0, writings: 0, chats: 0 };
    return state.tutor;
  }

  /* ------------------------------------------------------------------ oggi */

  function oggiFresh() { return !!(oggi && oggi.date === Engine.today()); }

  function oggiDone(kind) {
    var d = state.oggiDone;
    return !!(d && d.date === Engine.today() && d.kinds.indexOf(kind) >= 0);
  }

  function markOggi(kind) {
    if (!oggiFresh()) return;
    var d = state.oggiDone;
    if (!d || d.date !== Engine.today()) d = state.oggiDone = { date: Engine.today(), kinds: [] };
    if (d.kinds.indexOf(kind) < 0) d.kinds.push(kind);
  }

  var OGGI_ICON = { review: "🔁", round: "▶︎", gym: "🏋️", teoria: "📘", sfide: "📖",
                    scrittura: "✍️", compagno: "💬" };

  function renderOggi() {
    if (!oggiFresh()) return "";
    var plan = oggi.plan || [];
    var all = plan.length && plan.every(function (p) { return oggiDone(p.kind); });
    return '<div class="card oggi' + (all ? " done" : "") + '">' +
      '<h2>' + esc(oggi.title || "Oggi") + "</h2>" +
      '<p>' + esc(oggi.message || "") + "</p>" +
      '<div class="row">' + plan.map(function (p, i) {
        var done = oggiDone(p.kind);
        return '<button class="btn ' + (done ? "ghost" : "") + '" data-oggi="' + i + '">' +
          (done ? "✓ " : (OGGI_ICON[p.kind] || "") + " ") + esc(p.label) + "</button>";
      }).join("") + "</div>" +
      (all ? '<p class="muted" style="margin-top:10px">Plan del día completo. Basta.</p>' : "") +
      (oggi.weak && oggi.weak.length
        ? '<p class="muted" style="margin-top:10px">Flojo en: ' +
          oggi.weak.map(esc).join(" · ") + "</p>" : "") +
      "</div>";
  }

  function runOggi(p) {
    if (p.week) view.week = Math.max(1, Math.min(state.unlocked, +p.week));
    else view.week = Math.min(state.unlocked, 52);
    var w = course.weeks[view.week - 1];
    if (p.kind === "review") startRound("review", { size: p.size });
    else if (p.kind === "round") startRound(w.boss ? "boss" : "round", { size: p.size });
    else if (p.kind === "gym") startRound("gym", { size: p.size });
    else if (p.kind === "teoria") { view.screen = w.lesson ? "teoria" : "briefing"; render(); }
    else if (p.kind === "sfide") { view.screen = "sfide"; render(); }
    else if (p.kind === "scrittura") { view.screen = "scrittura"; render(); }
    else if (p.kind === "compagno") { startChat(); }
  }

  /* ------------------------------------------------------------- pronuncia */

  var voice = null;
  function speak(text) {
    if (!window.speechSynthesis) return;
    var u = new SpeechSynthesisUtterance(String(text).replace(/_+/g, " "));
    u.lang = "it-IT";
    if (voice) u.voice = voice;
    u.rate = 0.92;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }
  function pickVoice() {
    if (!window.speechSynthesis) return;
    var vs = window.speechSynthesis.getVoices();
    voice = vs.filter(function (v) { return /^it/i.test(v.lang); })[0] || null;
  }
  if (window.speechSynthesis) {
    pickVoice();
    window.speechSynthesis.onvoiceschanged = pickVoice;
  }

  /* --------------------------------------------------------------- header */

  function renderHeader() {
    var lv = Engine.levelFor(state.xp);
    var due = Drills.dueCount(course, state);
    $("#hdr").innerHTML =
      '<div class="bar">' +
        '<div class="brand">La Via C1' +
          '<small>italiano dalla base al C1 · 52 settimane</small></div>' +
        '<div class="stats">' +
          '<div class="stat"><b>' + lv.level + '</b><span>livello</span></div>' +
          '<div class="stat"><b>' + state.xp + '</b><span>xp</span></div>' +
          '<div class="stat"><b>' + state.streak + '🔥</b><span>racha</span></div>' +
          '<div class="stat"><b>' + due + '</b><span>ripasso</span></div>' +
        '</div>' +
      '</div>' +
      '<div class="xpbar"><i style="width:' +
        Math.round(lv.into / lv.need * 100) + '%"></i></div>';
  }

  /* -------------------------------------------------------------- percorso */

  function weekStat(n) {
    return state.weekStats[n] || { attempts: 0, right: 0, bossPassed: false };
  }

  function renderPercorso() {
    var html = renderOggi() +
      '<h1>Il percorso</h1>' +
      '<p class="lead">Cuatro estaciones, 52 misiones semanales. Cada semana se ' +
      'desbloquea al superar la anterior; los <b>boss</b> son exámenes con nota mínima.</p>';

    course.seasons.forEach(function (s) {
      html += '<div class="season"><h2>' + esc(s.name) +
        ' <span class="lvl">' + esc(s.level) + '</span></h2>' +
        '<p>' + esc(s.blurb) + '</p><div class="weeks">';
      course.weeks.filter(function (w) { return w.season === s.n; })
        .forEach(function (w) {
          var st = weekStat(w.week);
          var open = w.week <= state.unlocked;
          var pct = st.attempts ? Math.round(st.right / st.attempts * 100) : 0;
          var done = w.boss ? st.bossPassed : st.right >= 20;
          html += '<button class="week' + (done ? " done" : "") +
            (w.boss ? " bossweek" : "") + '" data-week="' + w.week + '"' +
            (open ? "" : " disabled") + '>' +
            '<span class="n">settimana ' + w.week + ' · ' + esc(w.level) + '</span>' +
            '<span class="t">' + esc(w.title) + '</span>' +
            '<span class="meta">' + (w.boss ? "⚔️ boss · " : "") +
              st.right + " aciertos" + (st.attempts ? " · " + pct + "%" : "") +
            '</span>' +
            '<span class="prog"><i style="width:' +
              Math.min(100, Math.round(st.right / (w.boss ? 21 : 20) * 100)) +
              '%"></i></span>' +
            '</button>';
        });
      html += '</div></div>';
    });
    return html;
  }

  /* ---------------------------------------------------------------- teoria */

  /* *parola* marca una forma italiana, **texto** una regla clave. */
  function mk(text) {
    return esc(text)
      .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
      .replace(/\*([^*]+)\*/g, '<i class="it">$1</i>');
  }

  function lessonRead(n) { return !!(state.read || {})[n]; }

  var sayIndex = {};

  function renderTeoria(w) {
    var L = w.lesson;
    sayIndex = {};
    if (!L) return '<button class="btn ghost" id="back">← al percorso</button>' +
      '<p class="lead">Esta semana todavía no tiene teoría.</p>';

    var html = '<button class="btn ghost" id="tback">← alla settimana</button>' +
      '<h1>Teoria · settimana ' + w.week + '</h1>' +
      '<p class="lead">' + esc(w.title) + '</p>' +
      '<div class="lesson"><p class="intro">' + mk(L.intro) + '</p>';

    L.blocks.forEach(function (b, i) {
      html += '<section class="blk">';
      if (b.h) html += "<h2>" + mk(b.h) + "</h2>";
      (b.p || []).forEach(function (par) { html += "<p>" + mk(par) + "</p>"; });

      if (b.table) {
        html += '<div class="tw"><table class="gram">';
        if (b.table.head && b.table.head.join("")) {
          html += "<thead><tr>" + b.table.head.map(function (c) {
            return "<th>" + mk(c) + "</th>";
          }).join("") + "</tr></thead>";
        }
        html += "<tbody>" + (b.table.rows || []).map(function (r) {
          return "<tr>" + r.map(function (c, k) {
            return "<td" + (k === 0 ? ' class="k"' : "") + ">" + mk(c) + "</td>";
          }).join("") + "</tr>";
        }).join("") + "</tbody></table></div>";
      }

      if (b.ex) {
        html += '<ul class="exs">' + b.ex.map(function (pair, k) {
          sayIndex[i + "-" + k] = pair[0];
          return '<li><span class="it">' + esc(pair[0]) + "</span>" +
            '<span class="es">' + esc(pair[1]) + "</span>" +
            '<button class="say" data-say="' + i + "-" + k + '" ' +
            'aria-label="escuchar">🔊</button></li>';
        }).join("") + "</ul>";
      }

      if (b.warn) html += '<div class="call warn"><b>La trampa</b>' +
        "<p>" + mk(b.warn) + "</p></div>";
      if (b.tip) html += '<div class="call tip"><b>El atajo</b>' +
        "<p>" + mk(b.tip) + "</p></div>";
      html += "</section>";
    });

    html += "</div>" +
      '<div class="card"><div class="row">' +
      (lessonRead(w.week)
        ? '<button class="btn" id="tplay">▶︎ A jugar</button>'
        : '<button class="btn" id="tdone">✓ Leído (+' + Engine.XP.lesson +
          " xp)</button>") +
      '<button class="btn ghost" id="tback2">Volver</button>' +
      "</div></div>";
    return html;
  }

  /* -------------------------------------------------------------- briefing */

  function renderBriefing(w) {
    var st = weekStat(w.week);
    var refs = [];
    if (w.refs.dummies.length) {
      refs.push("<b>Italian Grammar For Dummies</b>, cap. " + w.refs.dummies.join(", "));
    }
    if (w.refs.routledge.length) {
      refs.push("<b>Soluzioni</b> (Routledge), cap. " + w.refs.routledge.join(", "));
    }

    var sections = (w.refs.sections || []).slice(0, 12).map(function (s) {
      return '<span class="tag">' + esc(s.n + " " + s.title) + "</span>";
    }).join("");

    var nChal = (w.challenges || []).length;

    return '<button class="btn ghost" id="back">← al percorso</button>' +
      '<h1>Settimana ' + w.week + " · " + esc(w.title) + '</h1>' +
      '<p class="lead">' + esc(w.focus) + '</p>' +
      '<div class="card"><h2>Lo que se juega esta semana</h2>' +
        '<ul class="keys">' +
          w.keys.map(function (k) { return "<li>" + esc(k) + "</li>"; }).join("") +
        '</ul>' +
        '<h3>Lectura de apoyo</h3><p class="refs">' + refs.join(" · ") + "</p>" +
        (sections ? '<h3>Secciones del Soluzioni</h3>' + sections : "") +
      '</div>' +
      '<div class="card"><h2>Modos de juego</h2><div class="row">' +
        (w.lesson ? '<button class="btn ' + (lessonRead(w.week) ? "ghost" : "") +
          '" id="teo">📘 Teoria' + (lessonRead(w.week) ? " ✓" : "") + "</button>" : "") +
        '<button class="btn" id="play">' +
          (w.boss ? "⚔️ Entrar al boss" : "▶︎ Allenamento (12 preguntas)") + '</button>' +
        (w.boss ? "" : '<button class="btn ghost" id="gym">🏋️ Gimnasio de verbos</button>') +
        (nChal ? '<button class="btn ghost" id="chal">📖 Sfide del Maestro (' +
          nChal + ")</button>" : "") +
      '</div>' +
      '<h3>Con il Maestro' + (tutorOn() ? "" : " (desconectado)") + '</h3><div class="row">' +
        '<button class="btn ghost" id="wri">✍️ Scrittura</button>' +
        '<button class="btn ghost" id="cmp">💬 Compagno</button>' +
      '</div>' +
      '<p class="muted" style="margin-top:12px">' +
        (w.boss
          ? "Para aprobar necesitás 85% y te quedan 3 vidas."
          : "Superá 20 respuestas correctas para desbloquear la semana siguiente. " +
            "Llevás " + st.right + ".") +
      '</p></div>';
  }

  /* ------------------------------------------------------------ allenamento */

  function startRound(kind, opts) {
    opts = opts || {};
    var w = course.weeks[view.week - 1];
    var items;
    if (kind === "boss") items = Drills.buildBoss(course, w, state);
    else if (kind === "review") items = Drills.buildReview(course, state, opts.size || 20);
    else if (kind === "gym") {
      items = [];
      for (var i = 0; i < (opts.size || 15); i++) {
        var v = w.verbs[Math.floor(Math.random() * w.verbs.length)];
        var t = w.tenses[Math.floor(Math.random() * w.tenses.length)];
        try {
          items.push(i % 3 === 0 ? Drills.conjugationDrill(v, t)
                                 : Drills.conjugationTyped(v, t));
        } catch (e) { /* salta */ }
      }
    } else items = Drills.buildRound(course, w, { map: itemMap, size: opts.size });

    if (!items.length) { toast("No hay preguntas para este modo todavía."); return; }

    round = {
      kind: kind,
      items: items,
      i: 0,
      right: 0,
      close: 0,
      wrong: 0,
      combo: 0,
      lives: kind === "boss" ? 3 : 5,
      xp: 0,
      answered: false,
      log: []
    };
    view.screen = "gioco";
    render();
  }

  function currentItem() { return round.items[round.i]; }

  function renderGioco() {
    var it = currentItem();
    if (!it) return "";
    var hearts = "";
    for (var i = 0; i < 5; i++) {
      hearts += i < round.lives ? "❤️" : "🤍";
    }

    var body;
    if (it.type === "choice" && it.options) {
      body = '<div class="options">' + it.options.map(function (o, k) {
        return '<button class="opt" data-opt="' + k + '">' + esc(o) + "</button>";
      }).join("") + "</div>";
    } else {
      body = '<div class="typed">' +
        '<input id="ans" autocomplete="off" autocapitalize="off" ' +
        'autocorrect="off" spellcheck="false" placeholder="tu respuesta…">' +
        '<button class="btn" id="send">Controlla</button></div>' +
        '<div class="accents">' +
          ["à", "è", "é", "ì", "ò", "ù", "'"].map(function (c) {
            return '<button data-ins="' + c + '">' + c + "</button>";
          }).join("") +
        "</div>";
    }

    var stem = esc(it.stem).replace(/___/g, '<span class="gap">&nbsp;</span>');

    return '<div class="hud">' +
        '<span class="hearts">' + hearts + "</span>" +
        '<span class="progressline"><i style="width:' +
          Math.round(round.i / round.items.length * 100) + '%"></i></span>' +
        "<span class=\"muted\">" + (round.i + 1) + "/" + round.items.length + "</span>" +
        (round.combo > 1 ? '<span class="combo">×' + round.combo + "</span>" : "") +
        '<button class="btn ghost" id="quit">salir</button>' +
      "</div>" +
      '<div class="card">' +
        '<div class="prompt">' + esc(it.prompt || "") +
          ' <button class="tab" id="say" title="escuchar">🔊</button></div>' +
        '<div class="stem">' + stem + "</div>" +
        body +
        '<div id="fb"></div>' +
      "</div>";
  }

  function answer(given) {
    if (round.answered) return;
    var it = currentItem();
    var verdict = Engine.grade(given, it);
    round.answered = true;

    var q = verdict === Engine.VERDICT.RIGHT ? 2
          : verdict === Engine.VERDICT.CLOSE ? 1 : 0;

    if (q === 2) { round.right++; round.combo++; }
    else if (q === 1) { round.close++; round.combo = 0; }
    else { round.wrong++; round.combo = 0; round.lives--; }

    var gained = Engine.xpFor(verdict, round.combo);
    round.xp += gained;
    round.log.push({ id: it.id, verdict: verdict, given: given, answer: it.answer });

    // SRS only tracks the fixed bank; generated conjugation drills are endless
    // by design, so they are not scheduled as cards.
    if (it.src !== "coniugatore") {
      state.cards[it.id] = Engine.schedule(state.cards[it.id], q);
    }

    state.totals.attempts++;
    if (q === 2) state.totals.right++;
    else if (q === 1) state.totals.close++;
    else state.totals.wrong++;

    var ws = state.weekStats[view.week] ||
      (state.weekStats[view.week] = { attempts: 0, right: 0, bossPassed: false });
    ws.attempts++;
    if (q === 2) ws.right++;

    state.xp += gained;
    persist();
    renderHeader();

    var label = { giusto: "¡Correcto!", quasi: "Casi", sbagliato: "Incorrecto" }[verdict];
    var fb = '<div class="feedback ' + verdict + '">' +
      '<div class="verdict">' + label +
        (gained ? " +" + gained + " xp" : "") + "</div>" +
      '<div class="sol">' + esc(it.answer) + "</div>" +
      (it.note ? '<div class="note">' + esc(it.note) + "</div>" : "") +
      (it.hint && it.src === "dummies"
        ? '<div class="note">Consigna original: ' + esc(it.hint) + "</div>" : "") +
      (it.src === "maestro"
        ? '<div class="note">✍️ Ítem escrito por il Maestro contra tus errores. ' +
          "Si dudás de la respuesta, verificá con la teoría.</div>" : "") +
      '<div class="row" style="margin-top:10px">' +
        '<button class="btn" id="next">Continuar →</button>' +
        '<button class="tab" id="say2">🔊 escuchar</button>' +
      "</div></div>";

    $("#fb").innerHTML = fb;

    // Mark the chosen option so the learner sees what they picked.
    var opts = document.querySelectorAll(".opt");
    for (var i = 0; i < opts.length; i++) {
      opts[i].disabled = true;
      if (Engine.normalise(opts[i].textContent) === Engine.normalise(it.answer)) {
        opts[i].classList.add("right");
      } else if (Engine.normalise(opts[i].textContent) === Engine.normalise(given)) {
        opts[i].classList.add("wrong");
      }
    }
    var input = $("#ans");
    if (input) input.disabled = true;

    $("#next").onclick = nextItem;
    $("#say2").onclick = function () { speak(it.answer); };
    if (q === 2) speak(it.answer);
    $("#next").focus();
  }

  function nextItem() {
    round.i++;
    round.answered = false;
    if (round.lives <= 0 || round.i >= round.items.length) {
      finishRound();
      return;
    }
    render();
  }

  function finishRound() {
    var total = round.right + round.close + round.wrong;
    var pct = total ? Math.round(round.right / total * 100) : 0;
    var w = course.weeks[view.week - 1];

    Engine.touchStreak(state);
    markOggi(round.kind === "boss" ? "round" : round.kind);

    var passed = false;
    if (round.kind === "boss") {
      passed = pct >= 85 && round.lives > 0;
      var ws = state.weekStats[view.week] ||
        (state.weekStats[view.week] = { attempts: 0, right: 0, bossPassed: false });
      if (passed) {
        ws.bossPassed = true;
        if (round.wrong === 0) ws.perfect = true;
        state.xp += Engine.XP.boss;
        if (view.week >= state.unlocked) state.unlocked = Math.min(52, view.week + 1);
      }
    } else if (round.right >= 20 || weekStat(view.week).right >= 20) {
      if (view.week >= state.unlocked && !w.boss) {
        state.unlocked = Math.min(52, view.week + 1);
      }
    }

    var won = Engine.checkBadges(state);
    persist();
    renderHeader();

    view.screen = "risultato";
    view.result = { pct: pct, passed: passed, won: won };
    render();
  }

  function renderRisultato() {
    var r = view.result, w = course.weeks[view.week - 1];
    var title = round.kind === "boss"
      ? (r.passed ? "⚔️ Boss superado" : "Boss no superado")
      : "Sesión terminada";

    var html = '<h1>' + title + "</h1>" +
      '<div class="card"><table class="res">' +
        "<tr><td>Correctas</td><td>" + round.right + "</td></tr>" +
        "<tr><td>Casi (typo o acento)</td><td>" + round.close + "</td></tr>" +
        "<tr><td>Incorrectas</td><td>" + round.wrong + "</td></tr>" +
        "<tr><td>Precisión</td><td>" + r.pct + "%</td></tr>" +
        "<tr><td>XP ganada</td><td>" + round.xp +
          (r.passed ? " + " + Engine.XP.boss + " (boss)" : "") + "</td></tr>" +
        "<tr><td>Racha</td><td>" + state.streak + " días</td></tr>" +
      "</table>";

    if (round.kind === "boss") {
      html += r.passed
        ? '<p style="margin-top:14px">Semana ' + Math.min(52, view.week + 1) +
          " desbloqueada.</p>"
        : '<p style="margin-top:14px">Hace falta <b>85%</b> y terminar con vidas. ' +
          "Repasá el briefing y volvé a intentarlo.</p>";
    }

    if (r.won && r.won.length) {
      html += "<h3>Medallas nuevas</h3>" + r.won.map(function (b) {
        return "<p>🏅 <b>" + esc(b.name) + "</b> — " + esc(b.desc) + "</p>";
      }).join("");
    }

    var wrong = round.log.filter(function (l) {
      return l.verdict !== Engine.VERDICT.RIGHT;
    });
    if (wrong.length) {
      html += "<h3>Para repasar</h3><table class=\"res\">" +
        wrong.map(function (l) {
          return "<tr><td>" + esc(l.given || "—") + "</td><td>" +
            esc(l.answer) + "</td></tr>";
        }).join("") + "</table>";
    }

    html += '<div class="row" style="margin-top:16px">' +
      '<button class="btn" id="again">Otra ronda</button>' +
      '<button class="btn ghost" id="back">Al percorso</button>' +
      "</div></div>";
    return html;
  }

  /* ------------------------------------------------------------ sfide */

  function renderSfide(w) {
    var ids = {};
    (w.challenges || []).forEach(function (id) { ids[id] = true; });
    var list = course.challenges.filter(function (c) { return ids[c.id]; });

    var on = tutorOn();
    var html = '<button class="btn ghost" id="back">← al percorso</button>' +
      "<h1>Sfide del Maestro</h1>" +
      '<p class="lead">Ejercicios abiertos tomados del <b>Soluzioni</b>. ' +
      "El libro digital no trae las soluciones, así que " +
      (on
        ? "los corrige <b>il Maestro</b> (tu modelo local): escribí tus respuestas " +
          "y pedile la corrección. Si no estás de acuerdo, verificá contra el capítulo."
        : "estos no se corrigen solos: resolvelos por escrito, verificá contra el " +
          "capítulo y puntuate vos. Con Ollama conectado (pestaña Maestro) los " +
          "corrige il Maestro.") +
      " Lo que marques alimenta igual tu racha y tu repaso.</p>";

    list.forEach(function (c) {
      var done = state.challengeLog[c.id];
      html += '<div class="card chal"><div class="inst">' +
        esc(c.instruction) + "</div><ol>" +
        c.items.map(function (i) { return "<li>" + esc(i.text) + "</li>"; }).join("") +
        "</ol>" +
        '<div class="muted">Soluzioni, cap. ' + c.chapter + " — " +
          esc(c.chapterTitle) + "</div>" +
        (on
          ? '<div class="mgrade"><textarea data-mtext="' + c.id + '" rows="3" ' +
            'placeholder="a) … b) … c) …" spellcheck="false">' +
            esc(drafts[c.id] || "") + "</textarea>" +
            '<button class="btn" data-mgrade="' + c.id + '">🎓 Corregir con il Maestro</button>' +
            '<div class="mres" id="mres-' + c.id + '"></div></div>'
          : "") +
        '<div class="selfscore">' +
          '<button class="btn ghost" data-self="' + c.id + '" data-q="2">Lo tuve bien</button>' +
          '<button class="btn ghost" data-self="' + c.id + '" data-q="1">A medias</button>' +
          '<button class="btn ghost" data-self="' + c.id + '" data-q="0">No me salió</button>' +
          (done ? '<span class="muted" style="align-self:center" id="mdone-' + c.id + '">✓ ' +
            ["no salió", "a medias", "bien"][done.q] +
            (done.by === "maestro" ? " (Maestro)" : "") + "</span>" : "") +
        "</div></div>";
    });
    return html;
  }

  function recordChallenge(id, q, by) {
    state.challengeLog[id] = { q: q, at: Date.now(), by: by || "self" };
    state.xp += q === 2 ? Engine.XP.challenge : q === 1 ? 3 : 1;
    if (by === "maestro") tutorLog().graded++;
    Engine.touchStreak(state);
    markOggi("sfide");
    var won = Engine.checkBadges(state);
    persist();
    renderHeader();
    if (won.length) toast("🏅 " + won[0].name);
  }

  function gradeChallenge(id, btn) {
    if (!needTutor()) return;
    var ta = document.querySelector('[data-mtext="' + id + '"]');
    var text = ta ? ta.value.trim() : "";
    if (!text) { toast("Escribí tus respuestas primero."); return; }
    var c = course.challenges.filter(function (x) { return x.id === id; })[0];
    var w = course.weeks[view.week - 1];
    var box = $("#mres-" + id);
    busy(btn, true);
    box.innerHTML = '<p class="muted">Corrigiendo con ' + esc(Tutor.config.model) + "…</p>";
    Tutor.gradeChallenge(c, text, w).then(function (r) {
      busy(btn, false);
      box.innerHTML = '<table class="res mtab">' + r.items.map(function (it) {
        return '<tr class="' + esc(it.verdict) + '"><td><b>' + esc(it.label) + ")</b> " +
          esc(it.corrected) + '<div class="note">' + esc(it.why) + "</div></td>" +
          "<td>" + { giusto: "✓", quasi: "≈", sbagliato: "✗" }[it.verdict] + "</td></tr>";
      }).join("") + "</table>" +
        '<div class="feedback ' + ["sbagliato", "quasi", "giusto"][r.q] + '">' +
        '<div class="verdict">' + ["No salió", "A medias", "Bien"][r.q] + "</div>" +
        '<div class="note">' + esc(r.summary) + "</div></div>";
      recordChallenge(id, r.q, "maestro");
      var mark = $("#mdone-" + id);
      var label = "✓ " + ["no salió", "a medias", "bien"][r.q] + " (Maestro)";
      if (mark) mark.textContent = label;
      else box.insertAdjacentHTML("afterend",
        '<span class="muted" id="mdone-' + id + '">' + label + "</span>");
    }).catch(function (e) {
      busy(btn, false);
      box.innerHTML = '<p class="muted">Il Maestro falló: ' + esc(e.message) + "</p>";
    });
  }

  /* ------------------------------------------------------------ scrittura */

  function renderScrittura(w) {
    var on = tutorOn();
    return '<button class="btn ghost" id="back2">← alla settimana</button>' +
      "<h1>Scrittura · settimana " + w.week + "</h1>" +
      '<p class="lead">Producción escrita corregida por il Maestro. ' +
      "Escribí sin diccionario: los errores son el material.</p>" +
      '<div class="card"><div class="inst">' + esc(Tutor.writingPrompt(w)) + "</div>" +
      '<textarea id="wtext" rows="8" spellcheck="false" lang="it" ' +
      'placeholder="Scrivi qui in italiano…">' + esc(drafts["w" + w.week] || "") +
      "</textarea>" +
      '<div class="row" style="margin-top:10px">' +
        '<button class="btn" id="wsend"' + (on ? "" : " disabled") + ">🎓 Corregir</button>" +
        (on ? "" : '<span class="muted" style="align-self:center">Il Maestro desconectado ' +
          "(pestaña Maestro).</span>") +
      "</div>" +
      '<div id="wres"></div></div>';
  }

  function correctWriting(btn) {
    if (!needTutor()) return;
    var text = ($("#wtext") || {}).value || "";
    text = text.trim();
    if (text.split(/\s+/).length < 8) { toast("Escribí un poco más: al menos unas frases."); return; }
    var w = course.weeks[view.week - 1];
    var box = $("#wres");
    busy(btn, true);
    box.innerHTML = '<p class="muted">Leyendo tu texto…</p>';
    Tutor.correctWriting(text, w).then(function (r) {
      busy(btn, false);
      var gained = [5, 12, 25][r.q];
      state.xp += gained;
      tutorLog().writings++;
      Engine.touchStreak(state);
      markOggi("scrittura");
      var won = Engine.checkBadges(state);
      drafts["w" + w.week] = "";
      persist();
      renderHeader();
      box.innerHTML = '<div class="feedback ' + ["sbagliato", "quasi", "giusto"][r.q] + '">' +
        '<div class="verdict">' + r.score + "/10 · +" + gained + " xp</div>" +
        '<div class="note">' + esc(r.praise) + "</div></div>" +
        "<h3>Versión corregida</h3><p class=\"corr\" lang=\"it\">" + esc(r.corrected) + "</p>" +
        (r.errors.length ? "<h3>Errores</h3><table class=\"res mtab\">" +
          r.errors.map(function (e) {
            return "<tr><td><s>" + esc(e.wrong) + "</s> → <b>" + esc(e.right) + "</b>" +
              '<div class="note">' + esc(e.why) + "</div></td></tr>";
          }).join("") + "</table>" : "<p>Sin errores gramaticales. Bravo.</p>") +
        "<h3>Para la próxima</h3><p>" + esc(r.next) + "</p>" +
        (won.length ? "<p>🏅 <b>" + esc(won[0].name) + "</b></p>" : "") +
        '<div class="row" style="margin-top:12px">' +
          '<button class="btn" id="wagain">Otro texto</button>' +
          '<button class="btn ghost" id="wsay">🔊 escuchar</button></div>';
      $("#wagain").onclick = function () { render(); };
      $("#wsay").onclick = function () { speak(r.corrected); };
    }).catch(function (e) {
      busy(btn, false);
      box.innerHTML = '<p class="muted">Il Maestro falló: ' + esc(e.message) + "</p>";
    });
  }

  /* ------------------------------------------------------------- compagno */

  function startChat() {
    if (!needTutor()) return;
    var w = course.weeks[view.week - 1];
    chat = { week: w.week, history: [], busy: false, report: null };
    chat.history.push({ role: "assistant", content: Tutor.companionOpen(w) });
    view.screen = "compagno";
    render();
  }

  function userTurns() {
    return chat ? chat.history.filter(function (m) { return m.role === "user"; }).length : 0;
  }

  function renderCompagno() {
    if (!chat) return "";
    var w = course.weeks[chat.week - 1];
    var html = '<button class="btn ghost" id="back2">← alla settimana</button>' +
      "<h1>Il Compagno · settimana " + w.week + "</h1>" +
      '<p class="lead">Charlá en italiano. No te corrige mientras hablás: al terminar ' +
      "te devuelve tus errores más útiles. Hacen falta al menos 3 mensajes tuyos.</p>" +
      '<div class="card chatbox"><div class="chatlog" id="chatlog">' +
      chat.history.map(function (m, i) {
        return '<div class="msg ' + m.role + '">' + esc(m.content) +
          (m.role === "assistant"
            ? ' <button class="say" data-csay="' + i + '" aria-label="escuchar">🔊</button>' : "") +
          "</div>";
      }).join("") +
      (chat.busy ? '<div class="msg assistant muted">…</div>' : "") +
      "</div>";
    if (!chat.report) {
      html += '<div class="typed"><input id="cin" autocomplete="off" lang="it" ' +
        'placeholder="Scrivi in italiano…"' + (chat.busy ? " disabled" : "") + ">" +
        '<button class="btn" id="csend"' + (chat.busy ? " disabled" : "") + ">Invia</button></div>" +
        '<div class="accents">' + ["à", "è", "é", "ì", "ò", "ù", "'"].map(function (c) {
          return '<button data-ins="' + c + '">' + c + "</button>";
        }).join("") + "</div>" +
        '<div class="row" style="margin-top:12px"><button class="btn ghost" id="cend"' +
        (userTurns() >= 3 && !chat.busy ? "" : " disabled") +
        ">🎓 Terminar y pedir feedback</button></div>";
    } else {
      var r = chat.report;
      html += '<div class="feedback giusto"><div class="verdict">+' + r.gained + " xp</div>" +
        '<div class="note">' + esc(r.good) + "</div></div>" +
        (r.errors.length ? "<h3>Lo que un italiano diría</h3><table class=\"res mtab\">" +
          r.errors.map(function (e) {
            return "<tr><td><s>" + esc(e.said) + "</s> → <b>" + esc(e.better) + "</b>" +
              '<div class="note">' + esc(e.why) + "</div></td></tr>";
          }).join("") + "</table>" : "<p>Ningún error que valga la pena marcar.</p>") +
        "<p>" + esc(r.summary) + "</p>" +
        '<div class="row" style="margin-top:12px">' +
          '<button class="btn" id="cagain">Otra charla</button></div>';
    }
    return html + "</div>";
  }

  function sendChat(text) {
    text = String(text || "").trim();
    if (!text || chat.busy) return;
    var w = course.weeks[chat.week - 1];
    chat.history.push({ role: "user", content: text });
    chat.busy = true;
    render();
    Tutor.companionReply(chat.history, w).then(function (reply) {
      chat.busy = false;
      chat.history.push({ role: "assistant", content: reply });
      render();
      speak(reply);
    }).catch(function (e) {
      chat.busy = false;
      toast("Il Compagno falló: " + e.message, 3500);
      render();
    });
  }

  function endChat(btn) {
    var w = course.weeks[chat.week - 1];
    chat.busy = true;
    busy(btn, true, "Il Maestro revisa la charla…");
    Tutor.companionReport(chat.history, w).then(function (r) {
      chat.busy = false;
      r.gained = 15 + Math.min(15, userTurns() * 3);
      chat.report = r;
      state.xp += r.gained;
      tutorLog().chats++;
      Engine.touchStreak(state);
      markOggi("compagno");
      Engine.checkBadges(state);
      persist();
      renderHeader();
      render();
    }).catch(function (e) {
      chat.busy = false;
      busy(btn, false);
      toast("Il Maestro falló: " + e.message, 3500);
    });
  }

  /* -------------------------------------------------------------- maestro */

  function renderMaestro() {
    var st = Tutor.status, cfg = Tutor.config, w = course.weeks[view.week - 1];
    var tl = tutorLog();
    var html = "<h1>Il Maestro</h1>" +
      '<p class="lead">Un modelo local (Ollama) que corrige tus Sfide, tu escritura ' +
      "y charla con vos. Nada sale de tu PC.</p>" +
      '<div class="card"><h2>Conexión</h2>' +
      (st.ok
        ? '<p>🟢 Conectado vía <code>' + esc(st.via) + "</code>" +
          (Sync.isAvailable() ? " · progreso sincronizado con <code>progress.json</code>" : "") + "</p>"
        : '<p>🔴 Sin conexión' + (st.error ? ": " + esc(st.error) : "") + "</p>" +
          "<p class=\"muted\">Para encender il Maestro:</p>" +
          "<pre>ollama serve\nollama pull qwen2.5:14b   # o el modelo que prefieras\n" +
          "python3 tools/serve.py     # en vez de http.server</pre>") +
      '<div class="row" style="margin-top:10px">' +
        '<label class="fld">Modelo <select id="mmodel">' +
          (st.models.length ? st.models.map(function (m) {
            return '<option' + (m === cfg.model ? " selected" : "") + ">" + esc(m) + "</option>";
          }).join("") : '<option value="">(sin modelos)</option>') + "</select></label>" +
        '<label class="fld">URL de Ollama (opcional) <input id="mbase" value="' +
          esc(cfg.base) + '" placeholder="/ollama o http://127.0.0.1:11434"></label>' +
        '<button class="btn ghost" id="mtest">Probar conexión</button>' +
      "</div></div>" +
      '<div class="card"><h2>Practicar con la semana ' + w.week + "</h2>" +
      '<div class="row">' +
        '<button class="btn" id="cmp">💬 Compagno</button>' +
        '<button class="btn" id="wri">✍️ Scrittura</button>' +
        '<button class="btn ghost" id="chal">📖 Sfide</button>' +
      "</div>" +
      '<table class="res" style="margin-top:14px">' +
        "<tr><td>Sfide corregidas por il Maestro</td><td>" + tl.graded + "</td></tr>" +
        "<tr><td>Textos corregidos</td><td>" + tl.writings + "</td></tr>" +
        "<tr><td>Charlas terminadas</td><td>" + tl.chats + "</td></tr>" +
      "</table></div>" +
      '<div class="card"><h2>Agentes de fondo</h2>' +
      "<p>Dos scripts que corren solos en tu PC y leen <code>progress.json</code>:</p>" +
      "<ul class=\"keys\">" +
        "<li><b>Il Custode</b> (<code>tools/custode.py</code>) arma el plan del día según " +
        "cuánto hace que no jugás. Si faltaste, el plan es más chico, no más grande." +
        (oggiFresh() ? " <b>Hoy ya está.</b>" : " Hoy no hay plan todavía.") + "</li>" +
        "<li><b>Il Redattore</b> (<code>tools/redattore.py</code>) escribe de noche ítems " +
        "nuevos contra tus errores repetidos." +
        (course.maestroItems ? " <b>" + course.maestroItems + " ítems suyos en juego.</b>" : "") +
        "</li></ul>" +
      "<p class=\"muted\">Programalos con cron o el Programador de tareas; el README " +
      "explica cómo.</p></div>";
    return html;
  }

  function applyMaestroSettings() {
    var sel = $("#mmodel"), base = $("#mbase");
    Tutor.saveConfig({ model: sel ? sel.value : Tutor.config.model,
                       base: base ? base.value.trim() : Tutor.config.base });
  }

  /* ------------------------------------------------------------ medaglie */

  function renderMedaglie() {
    return "<h1>Medaglie</h1>" +
      '<div class="card"><div class="badges">' +
        Engine.BADGES.map(function (b) {
          var won = state.badges.indexOf(b.id) >= 0;
          return '<div class="badge' + (won ? " won" : "") + '">' +
            '<div class="ico">' + (won ? "🏅" : "🔒") + "</div>" +
            "<b>" + esc(b.name) + "</b><span>" + esc(b.desc) + "</span></div>";
        }).join("") +
      "</div></div>" +
      '<div class="card"><h2>Estadísticas</h2><table class="res">' +
        "<tr><td>Respuestas totales</td><td>" + state.totals.attempts + "</td></tr>" +
        "<tr><td>Correctas</td><td>" + state.totals.right + "</td></tr>" +
        "<tr><td>Casi</td><td>" + state.totals.close + "</td></tr>" +
        "<tr><td>Incorrectas</td><td>" + state.totals.wrong + "</td></tr>" +
        "<tr><td>Fichas en repaso</td><td>" +
          Object.keys(state.cards).length + "</td></tr>" +
        "<tr><td>Desafíos autoevaluados</td><td>" +
          Object.keys(state.challengeLog).length + "</td></tr>" +
        "<tr><td>Semana desbloqueada</td><td>" + state.unlocked + "/52</td></tr>" +
      "</table>" +
      '<div class="row" style="margin-top:14px">' +
        '<button class="btn ghost" id="reset">Borrar mi progreso</button>' +
      "</div></div>";
  }

  /* ------------------------------------------------------------- ripasso */

  function renderRipasso() {
    var due = Drills.dueCount(course, state);
    return "<h1>Ripasso</h1>" +
      '<p class="lead">Repetición espaciada sobre todo lo que ya jugaste. ' +
      "Las fichas vuelven cuando estás por olvidarlas.</p>" +
      '<div class="card center">' +
        "<p style=\"font-size:2.4rem;margin:6px 0\"><b>" + due + "</b></p>" +
        '<p class="muted">fichas listas para repasar</p>' +
        '<button class="btn wide" id="rev"' + (due ? "" : " disabled") + ">" +
          (due ? "Empezar el repaso" : "Nada pendiente por hoy") + "</button>" +
      "</div>";
  }

  /* ---------------------------------------------------------------- router */

  function renderTabs() {
    var tabs = [["percorso", "Percorso"], ["ripasso", "Ripasso"],
                ["maestro", "Maestro" + (tutorOn() ? " 🟢" : "")], ["medaglie", "Medaglie"]];
    return '<div class="tabs">' + tabs.map(function (t) {
      return '<button class="tab' + (view.tab === t[0] ? " on" : "") +
        '" data-tab="' + t[0] + '">' + t[1] + "</button>";
    }).join("") + "</div>";
  }

  function render() {
    var html = "";
    var showTabs = ["percorso", "ripasso", "maestro", "medaglie"].indexOf(view.screen) >= 0;
    if (showTabs) html += renderTabs();

    if (view.screen === "percorso") html += renderPercorso();
    else if (view.screen === "ripasso") html += renderRipasso();
    else if (view.screen === "medaglie") html += renderMedaglie();
    else if (view.screen === "briefing") html += renderBriefing(course.weeks[view.week - 1]);
    else if (view.screen === "teoria") html += renderTeoria(course.weeks[view.week - 1]);
    else if (view.screen === "sfide") html += renderSfide(course.weeks[view.week - 1]);
    else if (view.screen === "gioco") html += renderGioco();
    else if (view.screen === "risultato") html += renderRisultato();
    else if (view.screen === "maestro") html += renderMaestro();
    else if (view.screen === "scrittura") html += renderScrittura(course.weeks[view.week - 1]);
    else if (view.screen === "compagno") html += renderCompagno();

    app().innerHTML = html;
    wire();
  }

  function wire() {
    document.querySelectorAll("[data-tab]").forEach(function (b) {
      b.onclick = function () {
        view.tab = view.screen = b.dataset.tab;
        render();
      };
    });
    document.querySelectorAll("[data-week]").forEach(function (b) {
      b.onclick = function () {
        view.week = +b.dataset.week;
        view.screen = "briefing";
        render();
      };
    });

    var back = $("#back");
    if (back) back.onclick = function () {
      view.screen = view.tab = "percorso";
      render();
    };

    var teo = $("#teo");
    if (teo) teo.onclick = function () { view.screen = "teoria"; render(); };

    ["#tback", "#tback2"].forEach(function (sel) {
      var b = $(sel);
      if (b) b.onclick = function () { view.screen = "briefing"; render(); };
    });

    var tdone = $("#tdone");
    if (tdone) tdone.onclick = function () {
      var w = course.weeks[view.week - 1];
      if (!state.read) state.read = {};
      if (!state.read[w.week]) {
        state.read[w.week] = Date.now();
        state.xp += Engine.XP.lesson;
        Engine.touchStreak(state);
        var won = Engine.checkBadges(state);
        persist();
        renderHeader();
        toast(won.length ? "🏅 " + won[0].name : "+" + Engine.XP.lesson + " xp");
      }
      view.screen = "briefing";
      render();
    };

    var tplay = $("#tplay");
    if (tplay) tplay.onclick = function () {
      startRound(course.weeks[view.week - 1].boss ? "boss" : "round");
    };

    document.querySelectorAll("[data-say]").forEach(function (b) {
      b.onclick = function () { speak(sayIndex[b.dataset.say] || ""); };
    });

    var play = $("#play");
    if (play) play.onclick = function () {
      startRound(course.weeks[view.week - 1].boss ? "boss" : "round");
    };
    var gym = $("#gym");
    if (gym) gym.onclick = function () { startRound("gym"); };
    var chal = $("#chal");
    if (chal) chal.onclick = function () { view.screen = "sfide"; render(); };
    var rev = $("#rev");
    if (rev) rev.onclick = function () { startRound("review"); };
    var again = $("#again");
    if (again) again.onclick = function () { startRound(round.kind); };

    var quit = $("#quit");
    if (quit) quit.onclick = function () {
      view.screen = "briefing";
      render();
    };

    document.querySelectorAll("[data-opt]").forEach(function (b) {
      b.onclick = function () { answer(b.textContent); };
    });

    var send = $("#send"), input = $("#ans");
    if (send && input) {
      send.onclick = function () { answer(input.value); };
      input.onkeydown = function (e) {
        if (e.key === "Enter") { e.preventDefault(); answer(input.value); }
      };
      input.focus();
      document.querySelectorAll("[data-ins]").forEach(function (b) {
        b.onclick = function () {
          input.value += b.dataset.ins;
          input.focus();
        };
      });
    }

    var say = $("#say");
    if (say) say.onclick = function () {
      var it = currentItem();
      speak(it.stem.replace(/___/g, "…"));
    };

    document.querySelectorAll("[data-self]").forEach(function (b) {
      b.onclick = function () {
        recordChallenge(b.dataset.self, +b.dataset.q, "self");
        render();
        toast("Anotado.");
      };
    });

    /* --- il Maestro --- */
    document.querySelectorAll("[data-oggi]").forEach(function (b) {
      b.onclick = function () { runOggi(oggi.plan[+b.dataset.oggi]); };
    });
    var back2 = $("#back2");
    if (back2) back2.onclick = function () { view.screen = "briefing"; render(); };
    var wri = $("#wri");
    if (wri) wri.onclick = function () { view.screen = "scrittura"; render(); };
    var cmp = $("#cmp");
    if (cmp) cmp.onclick = startChat;

    document.querySelectorAll("[data-mtext]").forEach(function (ta) {
      ta.oninput = function () { drafts[ta.dataset.mtext] = ta.value; };
    });
    document.querySelectorAll("[data-mgrade]").forEach(function (b) {
      b.onclick = function () { gradeChallenge(b.dataset.mgrade, b); };
    });

    var wtext = $("#wtext");
    if (wtext) wtext.oninput = function () { drafts["w" + view.week] = wtext.value; };
    var wsend = $("#wsend");
    if (wsend) wsend.onclick = function () { correctWriting(wsend); };

    var cin = $("#cin"), csend = $("#csend");
    if (cin && csend) {
      csend.onclick = function () { sendChat(cin.value); };
      cin.onkeydown = function (e) {
        if (e.key === "Enter") { e.preventDefault(); sendChat(cin.value); }
      };
      cin.focus();
      document.querySelectorAll("[data-ins]").forEach(function (b) {
        b.onclick = function () { cin.value += b.dataset.ins; cin.focus(); };
      });
      var log = $("#chatlog");
      if (log) log.scrollTop = log.scrollHeight;
    }
    var cend = $("#cend");
    if (cend) cend.onclick = function () { endChat(cend); };
    var cagain = $("#cagain");
    if (cagain) cagain.onclick = startChat;
    document.querySelectorAll("[data-csay]").forEach(function (b) {
      b.onclick = function () { speak(chat.history[+b.dataset.csay].content); };
    });

    var mmodel = $("#mmodel"), mbase = $("#mbase"), mtest = $("#mtest");
    if (mmodel) mmodel.onchange = function () { applyMaestroSettings(); render(); };
    if (mtest) mtest.onclick = function () {
      applyMaestroSettings();
      busy(mtest, true, "Probando…");
      Tutor.detect().then(function (st) {
        toast(st.ok ? "Conectado: " + st.models.length + " modelos." : "Sin conexión.", 3000);
        renderHeader();
        render();
      });
    };
    if (mbase) mbase.onkeydown = function (e) { if (e.key === "Enter") mtest.click(); };

    var reset = $("#reset");
    if (reset) reset.onclick = function () {
      if (!confirm("Esto borra tu progreso completo. ¿Seguro?")) return;
      state = Engine.blankSave();
      persist();
      view.screen = view.tab = "percorso";
      renderHeader();
      render();
      toast("Progreso borrado.");
    };
  }

  /* ------------------------------------------------------------------ avvio */

  function optional(url) {
    return fetch(url).then(function (r) { return r.ok ? r.json() : null; })
      .catch(function () { return null; });
  }

  // Items written overnight by redattore.py join the week they were made for.
  function mergeMaestroBank(bank) {
    if (!bank || !bank.items) return;
    var n = 0;
    bank.items.forEach(function (it) {
      if (!it || !it.id || itemMap[it.id] || !it.answer || !it.stem) return;
      var w = course.weeks[(+it.week || 0) - 1];
      if (!w) return;
      it.src = "maestro";
      course.items.push(it);
      w.items.push(it.id);
      itemMap[it.id] = it;
      n++;
    });
    course.maestroItems = n;
  }

  fetch("data/course.json")
    .then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    })
    .then(function (data) {
      course = data;
      itemMap = Drills.itemsById(course);
      return Promise.all([
        optional("data/bank_maestro.json"),
        optional("data/oggi.json"),
        Sync.pull(),
        Tutor.detect()
      ]);
    })
    .then(function (extra) {
      mergeMaestroBank(extra[0]);
      oggi = extra[1];
      var remote = extra[2];
      if (remote && Sync.newer(state, remote) === remote) {
        state = Engine.load(remote);
      }
      view.week = Math.min(state.unlocked, 52);
      renderHeader();
      render();
    })
    .catch(function (e) {
      app().innerHTML = '<div class="card"><h2>No se pudo cargar el curso</h2>' +
        '<p class="muted">' + esc(e.message) + "</p>" +
        "<p>Serví la carpeta <code>docs/</code> con un servidor web " +
        "(<code>python3 -m http.server</code>): abrir el archivo directamente " +
        "bloquea la carga de datos por seguridad del navegador.</p></div>";
    });
})();
