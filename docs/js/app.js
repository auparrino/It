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

  function persist() { Engine.save(state); }

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
    var html = '<h1>Il percorso</h1>' +
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
        '<button class="btn" id="play">' +
          (w.boss ? "⚔️ Entrar al boss" : "▶︎ Allenamento (12 preguntas)") + '</button>' +
        (w.boss ? "" : '<button class="btn ghost" id="gym">🏋️ Gimnasio de verbos</button>') +
        (nChal ? '<button class="btn ghost" id="chal">📖 Sfide del Maestro (' +
          nChal + ")</button>" : "") +
      '</div>' +
      '<p class="muted" style="margin-top:12px">' +
        (w.boss
          ? "Para aprobar necesitás 85% y te quedan 3 vidas."
          : "Superá 20 respuestas correctas para desbloquear la semana siguiente. " +
            "Llevás " + st.right + ".") +
      '</p></div>';
  }

  /* ------------------------------------------------------------ allenamento */

  function startRound(kind) {
    var w = course.weeks[view.week - 1];
    var items;
    if (kind === "boss") items = Drills.buildBoss(course, w, state);
    else if (kind === "review") items = Drills.buildReview(course, state, 20);
    else if (kind === "gym") {
      items = [];
      for (var i = 0; i < 15; i++) {
        var v = w.verbs[Math.floor(Math.random() * w.verbs.length)];
        var t = w.tenses[Math.floor(Math.random() * w.tenses.length)];
        try {
          items.push(i % 3 === 0 ? Drills.conjugationDrill(v, t)
                                 : Drills.conjugationTyped(v, t));
        } catch (e) { /* salta */ }
      }
    } else items = Drills.buildRound(course, w, { map: itemMap });

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

    var html = '<button class="btn ghost" id="back">← al percorso</button>' +
      "<h1>Sfide del Maestro</h1>" +
      '<p class="lead">Ejercicios abiertos tomados del <b>Soluzioni</b>. ' +
      "El libro digital no trae las soluciones, así que estos no se corrigen solos: " +
      "resolvelos por escrito, verificá contra el capítulo y puntuate vos. " +
      "Lo que marques alimenta igual tu racha y tu repaso.</p>";

    list.forEach(function (c) {
      var done = state.challengeLog[c.id];
      html += '<div class="card chal"><div class="inst">' +
        esc(c.instruction) + "</div><ol>" +
        c.items.map(function (i) { return "<li>" + esc(i.text) + "</li>"; }).join("") +
        "</ol>" +
        '<div class="muted">Soluzioni, cap. ' + c.chapter + " — " +
          esc(c.chapterTitle) + "</div>" +
        '<div class="selfscore">' +
          '<button class="btn ghost" data-self="' + c.id + '" data-q="2">Lo tuve bien</button>' +
          '<button class="btn ghost" data-self="' + c.id + '" data-q="1">A medias</button>' +
          '<button class="btn ghost" data-self="' + c.id + '" data-q="0">No me salió</button>' +
          (done ? '<span class="muted" style="align-self:center">✓ ' +
            ["no salió", "a medias", "bien"][done.q] + "</span>" : "") +
        "</div></div>";
    });
    return html;
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
                ["medaglie", "Medaglie"]];
    return '<div class="tabs">' + tabs.map(function (t) {
      return '<button class="tab' + (view.tab === t[0] ? " on" : "") +
        '" data-tab="' + t[0] + '">' + t[1] + "</button>";
    }).join("") + "</div>";
  }

  function render() {
    var html = "";
    var showTabs = ["percorso", "ripasso", "medaglie"].indexOf(view.screen) >= 0;
    if (showTabs) html += renderTabs();

    if (view.screen === "percorso") html += renderPercorso();
    else if (view.screen === "ripasso") html += renderRipasso();
    else if (view.screen === "medaglie") html += renderMedaglie();
    else if (view.screen === "briefing") html += renderBriefing(course.weeks[view.week - 1]);
    else if (view.screen === "sfide") html += renderSfide(course.weeks[view.week - 1]);
    else if (view.screen === "gioco") html += renderGioco();
    else if (view.screen === "risultato") html += renderRisultato();

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
        var id = b.dataset.self, q = +b.dataset.q;
        state.challengeLog[id] = { q: q, at: Date.now() };
        state.xp += q === 2 ? Engine.XP.challenge : q === 1 ? 3 : 1;
        Engine.touchStreak(state);
        Engine.checkBadges(state);
        persist();
        renderHeader();
        render();
        toast("Anotado.");
      };
    });

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

  fetch("data/course.json")
    .then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    })
    .then(function (data) {
      course = data;
      itemMap = Drills.itemsById(course);
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
