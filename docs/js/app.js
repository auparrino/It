/*
 * La Via C1 — interfaccia del gioco.
 * Schermate: oggi, frasi, percorso, ripasso, io (profilo), briefing, teoria,
 * sfide, gioco, lampo, risultato.
 */
(function () {
  "use strict";

  var course = null;
  var state = Engine.load();
  var view = { screen: "oggi", week: 1, tab: "oggi" };
  var round = null;
  var lampo = null;
  var itemMap = {};
  var installPrompt = null;

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

  /* --------------------------------------------------- suoni e vibrazione */

  var audioCtx = null;
  function tone(freqs, dur, type) {
    if (state.silent) return;
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      audioCtx = audioCtx || new AC();
      var t0 = audioCtx.currentTime;
      freqs.forEach(function (f, i) {
        var o = audioCtx.createOscillator(), g = audioCtx.createGain();
        o.type = type || "sine";
        o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t0 + i * dur);
        g.gain.exponentialRampToValueAtTime(0.12, t0 + i * dur + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + (i + 1) * dur);
        o.connect(g); g.connect(audioCtx.destination);
        o.start(t0 + i * dur); o.stop(t0 + (i + 1) * dur + 0.02);
      });
    } catch (e) { /* niente audio */ }
  }

  function buzz(pattern) {
    try { if (navigator.vibrate) navigator.vibrate(pattern); } catch (e) { /* */ }
  }

  var fx = {
    right: function () { tone([660, 880], 0.07); buzz(18); },
    close: function () { tone([520], 0.1); buzz(18); },
    wrong: function () { tone([200, 160], 0.1, "triangle"); buzz([50, 40, 50]); },
    goal: function () { tone([523, 659, 784, 1046], 0.11); buzz([30, 30, 30, 30, 80]); },
    tap: function () { buzz(8); }
  };

  function confetti() {
    var bits = ["🇮🇹", "🍕", "✨", "🎉", "🍝", "⭐", "☕"];
    var box = document.createElement("div");
    box.className = "confetti";
    for (var i = 0; i < 26; i++) {
      var s = document.createElement("span");
      s.textContent = bits[i % bits.length];
      s.style.left = Math.random() * 100 + "%";
      s.style.animationDelay = Math.random() * 0.5 + "s";
      s.style.fontSize = 14 + Math.random() * 18 + "px";
      box.appendChild(s);
    }
    document.body.appendChild(box);
    setTimeout(function () { box.remove(); }, 2600);
  }

  /* -------------------------------------------------------- xp e obiettivo */

  function gain(n) {
    if (!n) return;
    var hit = Engine.addXp(state, n);
    Engine.touchStreak(state);
    if (hit) {
      setTimeout(function () {
        fx.goal();
        confetti();
        toast("🎯 ¡Meta del día cumplida! Abrí tu cofre en Oggi.", 3200);
      }, 350);
    }
  }

  /* ------------------------------------------------------------- pronuncia */

  var voice = null;
  // force: the learner tapped 🔊 explicitly, so play even in office mode
  // (they may have earphones on).
  function speak(text, force, rate) {
    if (!window.speechSynthesis) return;
    if (state.silent && !force) return;
    var u = new SpeechSynthesisUtterance(String(text).replace(/_+/g, " "));
    u.lang = "it-IT";
    if (voice) u.voice = voice;
    u.rate = rate || 0.95;
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

  function drillOpts() {
    return { silent: state.silent, map: itemMap };
  }

  /* --------------------------------------------------------------- header */

  function renderHeader() {
    var lv = Engine.levelFor(state.xp);
    var todayXp = Engine.todayXp(state);
    var goal = state.goal || 50;
    var pct = Math.min(100, Math.round(todayXp / goal * 100));
    $("#hdr").innerHTML =
      '<div class="bar">' +
        '<button class="brand" id="home">La Via C1' +
          '<small>liv. ' + lv.level + ' · ' + esc(Engine.rankFor(lv.level)) +
          '</small></button>' +
        '<div class="stats">' +
          '<div class="stat"><b>' + state.streak + '🔥</b><span>racha</span></div>' +
          '<div class="stat"><b>' + (state.shields || 0) + '🛡️</b><span>escudos</span></div>' +
          '<div class="ring" style="--p:' + pct + '" title="meta diaria">' +
            '<b>' + (pct >= 100 ? "✓" : todayXp) + '</b></div>' +
          '<button class="mode" id="mode" title="modo oficina">' +
            (state.silent ? "🤫" : "🔊") + '</button>' +
        '</div>' +
      '</div>' +
      '<div class="xpbar"><i style="width:' +
        Math.round(lv.into / lv.need * 100) + '%"></i></div>';
    $("#home").onclick = function () { go("oggi"); };
    $("#mode").onclick = function () {
      state.silent = !state.silent;
      persist();
      renderHeader();
      toast(state.silent
        ? "🤫 Modo oficina: nada suena solo. Todo con el pulgar."
        : "🔊 Modo normal: las frases se leen en voz alta.", 2800);
      if (view.screen !== "gioco") render();
    };
  }

  function go(tab) {
    view.tab = view.screen = tab;
    render();
    window.scrollTo(0, 0);
  }

  /* ------------------------------------------------------------------ oggi */

  function renderOggi() {
    var goal = state.goal || 50;
    var todayXp = Engine.todayXp(state);
    var reached = todayXp >= goal;
    var chestOpen = state.chest === Engine.dayKey();
    var due = Drills.dueCount(course, state, itemMap);
    var sc = Drills.nextScene(state);
    var sp = Frasi.progress(sc.id, state.cards);
    var w = course.weeks[Math.min(state.unlocked, 52) - 1];
    var f = Frasi.ofTheDay();
    var hour = new Date().getHours();
    var hello = hour < 13 ? "Buongiorno" : hour < 19 ? "Buon pomeriggio" : "Buonasera";

    var html = '<h1>' + hello + '! 👋</h1>' +
      '<p class="lead">' + (state.streak > 1
        ? "Llevás <b>" + state.streak + " días</b> seguidos. No cortes la racha."
        : "Tres minutos alcanzan. Arrancá con una pausa caffè.") + "</p>";

    // Obiettivo del giorno + forziere
    html += '<div class="card goal">' +
      '<div class="goalrow"><div><b>Meta de hoy</b>' +
        '<span class="muted"> ' + todayXp + " / " + goal + " xp</span></div>" +
        (reached && !chestOpen
          ? '<button class="btn gold pulse" id="chest">🎁 Abrir cofre</button>'
          : chestOpen ? '<span class="muted">🎁 cofre abierto · volvé mañana</span>'
          : '<span class="muted">🎁 al llegar a la meta</span>') +
      "</div>" +
      '<div class="goalbar"><i style="width:' +
        Math.min(100, Math.round(todayXp / goal * 100)) + '%"></i></div>' +
      "</div>";

    // Azioni principali
    html += '<div class="big">' +
      '<button class="bigbtn pausa" id="pausa"><span class="e">☕</span>' +
        "<b>Pausa caffè</b><small>3 minutos · todo con el pulgar</small></button>" +
      '<button class="bigbtn lampo" id="lampo"><span class="e">⚡</span>' +
        "<b>Lampo 60″</b><small>récord: " + ((state.best || {}).lampo || 0) +
        "</small></button>" +
      '<button class="bigbtn scena" id="scena"><span class="e">' + sc.emoji + "</span>" +
        "<b>" + esc(sc.name) + "</b><small>frases " + sp.seen + "/" + sp.total +
        "</small></button>" +
      '<button class="bigbtn ripasso" id="rev"' + (due ? "" : " disabled") + '>' +
        '<span class="e">🔁</span><b>Ripasso</b><small>' +
        (due ? due + " para repasar" : "nada pendiente") + "</small></button>" +
      "</div>";

    // Settimana del percorso
    html += '<button class="card weekcard" data-week="' + w.week + '">' +
      '<span class="muted">Gramática · semana ' + w.week + " · " + esc(w.level) + "</span>" +
      "<b>" + esc(w.title) + "</b>" +
      '<span class="prog"><i style="width:' +
        Math.min(100, Math.round((weekStat(w.week).right) / 20 * 100)) + '%"></i></span>' +
      "</button>";

    // Frase del giorno
    html += '<div class="card fdg"><span class="muted">Frase del giorno</span>' +
      '<div class="fit">' + esc(f.it) + "</div>" +
      '<div class="fes">' + esc(f.es) + "</div>" +
      (f.note ? '<div class="note">' + mk(f.note) + "</div>" : "") +
      '<button class="tab" id="sayfdg">🔊 escuchar</button></div>';

    // Calendario ultimi 28 giorni
    var days = Engine.lastDays(state, 28);
    html += '<div class="card"><h3 style="margin-top:0">Tus últimas 4 semanas</h3>' +
      '<div class="heat">' + days.map(function (d) {
        var lvl = d.xp <= 0 ? 0 : d.xp < goal / 2 ? 1 : d.xp < goal ? 2 : 3;
        return '<i class="h' + lvl + '" title="' + d.key + ": " + d.xp + ' xp"></i>';
      }).join("") + "</div>" +
      '<p class="muted" style="margin:8px 0 0">Cada cuadrado es un día. Verde fuerte = meta cumplida. ' +
      "Cada 7 días de racha ganás un 🛡️ escudo que la salva si un día no podés.</p></div>";

    // Installazione
    if (!isStandalone()) {
      html += '<div class="card install"><b>📲 Instalala en tu celu</b>' +
        '<p class="muted">Funciona sin internet y tu progreso queda guardado en el teléfono.</p>' +
        (installPrompt
          ? '<button class="btn" id="install">Instalar app</button>'
          : '<p class="muted">iPhone: <b>Compartir → Agregar a inicio</b>. ' +
            "Android: menú ⋮ → <b>Instalar app</b>.</p>") +
        "</div>";
    }
    return html;
  }

  function isStandalone() {
    return (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
      window.navigator.standalone === true;
  }

  /* ----------------------------------------------------------------- frasi */

  function renderFrasi() {
    var html = "<h1>Frasi</h1>" +
      '<p class="lead">Bloques listos para hablar ya, sin armar gramática en la cabeza. ' +
      "Cada escena te presenta frases nuevas, te las hace armar con fichas y después " +
      "<b>escribirlas de memoria</b>. Cuanto más rápido te salen escritas, más rápido " +
      "te salen habladas.</p>";
    html += '<div class="scenes">';
    Frasi.SCENES.forEach(function (s) {
      var p = Frasi.progress(s.id, state.cards);
      var pct = Math.round(p.seen / p.total * 100);
      html += '<button class="scene' + (p.seen === p.total ? " done" : "") +
        '" data-scene="' + s.id + '">' +
        '<span class="e">' + s.emoji + "</span>" +
        "<b>" + esc(s.name) + "</b>" +
        '<span class="muted">' + esc(s.blurb) + "</span>" +
        '<span class="meta">' + p.seen + "/" + p.total + " vistas · " +
          p.strong + " firmes</span>" +
        '<span class="prog"><i style="width:' + pct + '%"></i></span>' +
        "</button>";
    });
    return html + "</div>";
  }

  /* -------------------------------------------------------------- percorso */

  function weekStat(n) {
    return state.weekStats[n] || { attempts: 0, right: 0, bossPassed: false };
  }

  function renderPercorso() {
    var html = '<h1>Il percorso</h1>' +
      '<p class="lead">La gramática de base a C1: cuatro estaciones, 52 misiones semanales. ' +
      'Cada semana se desbloquea al superar la anterior; los <b>boss</b> son exámenes con nota mínima.</p>';

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
      '<p class="muted" style="margin-top:12px">' +
        (w.boss
          ? "Para aprobar necesitás 85% y te quedan 3 vidas."
          : "Superá 20 respuestas correctas para desbloquear la semana siguiente. " +
            "Llevás " + st.right + ".") +
      '</p></div>';
  }

  /* ------------------------------------------------------------ allenamento */

  // Only graded grammar rounds cost lives; phrase sessions are for flow.
  var WITH_LIVES = { round: 1, boss: 1, gym: 1 };

  function startRound(kind, arg) {
    var w = course.weeks[view.week - 1];
    var items;
    if (kind === "boss") items = Drills.buildBoss(course, w, state);
    else if (kind === "review") items = Drills.buildReview(course, state, 20, drillOpts());
    else if (kind === "scene") items = Frasi.sceneSession(arg, state.cards, drillOpts());
    else if (kind === "pausa") {
      w = course.weeks[Math.min(state.unlocked, 52) - 1];
      view.week = w.week;
      items = Drills.buildPausa(course, state, w, drillOpts());
    } else if (kind === "gym") {
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
      arg: arg,
      items: items,
      i: 0,
      right: 0,
      close: 0,
      wrong: 0,
      combo: 0,
      bestCombo: 0,
      lives: kind === "boss" ? 3 : WITH_LIVES[kind] ? 5 : Infinity,
      xp: 0,
      answered: false,
      picked: [],
      log: []
    };
    view.screen = "gioco";
    render();
  }

  function currentItem() { return round.items[round.i]; }

  function hud() {
    var hearts = "";
    if (round.lives !== Infinity) {
      for (var i = 0; i < 5; i++) hearts += i < round.lives ? "❤️" : "🤍";
    }
    return '<div class="hud">' +
        (hearts ? '<span class="hearts">' + hearts + "</span>" : "") +
        '<span class="progressline"><i style="width:' +
          Math.round(round.i / round.items.length * 100) + '%"></i></span>' +
        "<span class=\"muted\">" + (round.i + 1) + "/" + round.items.length + "</span>" +
        (round.combo > 1 ? '<span class="combo pop">🔥×' + round.combo + "</span>" : "") +
        '<button class="btn ghost" id="quit">✕</button>' +
      "</div>";
  }

  function renderGioco() {
    var it = currentItem();
    if (!it) return "";
    var body = "", stem = esc(it.stem).replace(/___/g, '<span class="gap">&nbsp;</span>');
    var prompt = '<div class="prompt">' + esc(it.prompt || "") + "</div>";

    if (it.type === "intro") {
      return hud() + '<div class="card intro">' +
        '<div class="badge-new">✨ ' + esc(it.prompt) + "</div>" +
        '<div class="fit big">' + esc(it.frase.it) + "</div>" +
        '<div class="fes">' + esc(it.frase.es) + "</div>" +
        (it.note ? '<div class="call tip"><b>Ojo</b><p>' + mk(it.note) + "</p></div>" : "") +
        '<div class="row" style="margin-top:14px">' +
          '<button class="btn ghost" id="sayit">🔊 Escuchar</button>' +
          '<button class="btn ghost" id="slow">🐢 Lento</button>' +
        "</div>" +
        '<p class="muted">Leela dos veces y tratá de imaginarte diciéndola: ' +
          "en un rato te la voy a pedir de memoria.</p>" +
        '<button class="btn wide" id="next">La tengo →</button>' +
        "</div>";
    }

    if (it.type === "tiles") {
      body = '<div class="tiles-answer" id="tans"></div>' +
        '<div class="tiles-bank" id="tbank"></div>' +
        '<div class="row" style="margin-top:12px">' +
          '<button class="btn" id="tcheck">Controlla</button>' +
          '<button class="btn ghost" id="tclear">Borrar</button></div>';
    } else if (it.type === "listen") {
      body = '<div class="center"><button class="bigplay" id="play1">🔊</button>' +
        '<div><button class="tab" id="slow">🐢 más lento</button>' +
        '<button class="tab" id="peek">👀 ver texto</button></div>' +
        '<div class="peek" id="peektxt" hidden>' + esc(it.stem) + "</div></div>" +
        '<div class="options">' + it.options.map(function (o, k) {
          return '<button class="opt" data-opt="' + k + '">' + esc(o) + "</button>";
        }).join("") + "</div>";
      stem = "";
    } else if (it.type === "write") {
      body = '<div class="typed">' +
        '<input id="wans" autocomplete="off" autocapitalize="sentences" ' +
        'autocorrect="off" spellcheck="false" enterkeyhint="done" placeholder="in italiano…">' +
        '<button class="btn" id="wsend">Controlla</button></div>' +
        '<div class="row" style="margin-top:8px">' +
          '<button class="tab" id="hint">💡 pista</button>' +
          '<button class="tab" id="easier">🧩 dame fichas</button></div>' +
        '<div class="peek" id="hinttxt" hidden></div>';
    } else if (it.type === "flash") {
      body = '<div id="flash"><button class="btn wide" id="reveal">Mostrar respuesta</button></div>';
    } else if (it.type === "choice" && it.options) {
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

    var sayBtn = it.src === "frasi" ? "" :
      ' <button class="tab" id="say" title="escuchar">🔊</button>';

    return hud() +
      '<div class="card">' +
        prompt.replace("</div>", sayBtn + "</div>") +
        (stem ? '<div class="stem">' + stem + "</div>" : "") +
        body +
        '<div id="fb"></div>' +
      "</div>";
  }

  /* Tessere: tocchi per costruire la frase. */
  function drawTiles() {
    var it = currentItem();
    var ans = $("#tans"), bank = $("#tbank");
    if (!ans || !bank) return;
    ans.innerHTML = round.picked.length
      ? round.picked.map(function (k, pos) {
          return '<button class="tile on" data-pos="' + pos + '">' + esc(it.tiles[k]) + "</button>";
        }).join("")
      : '<span class="muted">Tocá las palabras en orden…</span>';
    bank.innerHTML = it.tiles.map(function (t, k) {
      var used = round.picked.indexOf(k) >= 0;
      return '<button class="tile' + (used ? " used" : "") + '" data-tile="' + k + '"' +
        (used || round.answered ? " disabled" : "") + ">" + esc(t) + "</button>";
    }).join("");
    bank.querySelectorAll("[data-tile]").forEach(function (b) {
      b.onclick = function () {
        if (round.answered) return;
        fx.tap();
        round.picked.push(+b.dataset.tile);
        drawTiles();
      };
    });
    ans.querySelectorAll("[data-pos]").forEach(function (b) {
      b.onclick = function () {
        if (round.answered) return;
        round.picked.splice(+b.dataset.pos, 1);
        drawTiles();
      };
    });
  }

  function gradeTiles(it) {
    var built = round.picked.map(function (k) { return it.tiles[k]; }).join(" ");
    var ok = Frasi.words(built).join(" ") === Frasi.words(it.answer).join(" ");
    return { given: built, verdict: ok ? Engine.VERDICT.RIGHT : Engine.VERDICT.WRONG };
  }

  function answer(given) {
    if (round.answered) return;
    var it = currentItem();
    settle(Engine.grade(given, it), given);
  }

  // Record a verdict: SRS, stats, xp, feedback panel.
  function settle(verdict, given, extra) {
    if (round.answered) return;
    var it = currentItem();
    round.answered = true;

    var q = verdict === Engine.VERDICT.RIGHT ? 2
          : verdict === Engine.VERDICT.CLOSE ? 1 : 0;

    if (q === 2) {
      round.right++; round.combo++;
      round.bestCombo = Math.max(round.bestCombo, round.combo);
      fx.right();
    } else if (q === 1) { round.close++; round.combo = 0; fx.close(); }
    else {
      round.wrong++; round.combo = 0; fx.wrong();
      if (round.lives !== Infinity) round.lives--;
    }

    var gained = Engine.xpFor(verdict, round.combo);
    round.xp += gained;
    round.log.push({ id: it.id, verdict: verdict, given: given, answer: it.answer,
                     es: it.frase ? it.frase.es : "" });

    // SRS only tracks the fixed bank and the phrases; generated conjugation
    // drills are endless by design, so they are not scheduled as cards.
    if (it.src !== "coniugatore") {
      state.cards[it.id] = Engine.schedule(state.cards[it.id], q);
    }

    state.totals.attempts++;
    if (q === 2) state.totals.right++;
    else if (q === 1) state.totals.close++;
    else state.totals.wrong++;

    if (it.src !== "frasi") {
      var ws = state.weekStats[view.week] ||
        (state.weekStats[view.week] = { attempts: 0, right: 0, bossPassed: false });
      ws.attempts++;
      if (q === 2) ws.right++;
    }

    gain(gained);
    persist();
    renderHeader();

    var label = { giusto: pick(["¡Perfetto!", "¡Bravo!", "¡Esatto!", "¡Grande!", "¡Benissimo!"]),
                  quasi: "Quasi…", sbagliato: "No, era así:" }[verdict];
    var sol = it.type === "listen" ? it.frase.it + " — " + it.answer : it.answer;
    var fb = '<div class="feedback ' + verdict + '">' +
      '<div class="verdict">' + label +
        (gained ? ' <span class="xpgain">+' + gained + " xp</span>" : "") + "</div>" +
      (extra || "") +
      '<div class="sol">' + esc(sol) + "</div>" +
      (it.frase && it.type !== "listen" ? '<div class="note">' + esc(it.frase.es) + "</div>" : "") +
      (it.note ? '<div class="note">' + mk(it.note) + "</div>" : "") +
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
    ["#tcheck", "#tclear", "#wsend", "#wans", "#easier", "#reveal"].forEach(function (s) {
      var b = $(s); if (b) b.disabled = true;
    });
    if (it.type === "tiles") drawTiles();

    var spoken = it.frase ? it.frase.it : it.answer;
    $("#next").onclick = nextItem;
    $("#say2").onclick = function () { speak(spoken, true); };
    if (q === 2 || it.frase) speak(spoken);
    $("#fb").scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }

  function nextItem() {
    round.i++;
    round.answered = false;
    round.picked = [];
    if (round.lives <= 0 || round.i >= round.items.length) {
      finishRound();
      return;
    }
    render();
    window.scrollTo(0, 0);
  }

  function finishRound() {
    var total = round.right + round.close + round.wrong;
    var pct = total ? Math.round(round.right / total * 100) : 0;
    var w = course.weeks[view.week - 1];

    Engine.touchStreak(state);
    if (!state.best) state.best = {};
    state.best.combo = Math.max(state.best.combo || 0, round.bestCombo);

    var passed = false;
    if (round.kind === "boss") {
      passed = pct >= 85 && round.lives > 0;
      var ws = state.weekStats[view.week] ||
        (state.weekStats[view.week] = { attempts: 0, right: 0, bossPassed: false });
      if (passed) {
        ws.bossPassed = true;
        if (round.wrong === 0) ws.perfect = true;
        gain(Engine.XP.boss);
        if (view.week >= state.unlocked) state.unlocked = Math.min(52, view.week + 1);
      }
    } else if (round.kind !== "scene" &&
               (round.right >= 20 || weekStat(view.week).right >= 20)) {
      if (view.week >= state.unlocked && !w.boss) {
        state.unlocked = Math.min(52, view.week + 1);
      }
    }

    var won = Engine.checkBadges(state);
    persist();
    renderHeader();

    view.screen = "risultato";
    view.result = { pct: pct, passed: passed, won: won };
    if (pct >= 80 && total >= 5) setTimeout(confetti, 150);
    render();
  }

  function renderRisultato() {
    var r = view.result;
    var title = round.kind === "boss"
      ? (r.passed ? "⚔️ Boss superado" : "Boss no superado")
      : r.pct >= 90 ? "🏆 ¡Fantastico!" : r.pct >= 70 ? "👏 ¡Molto bene!" : "💪 Sesión terminada";
    var goal = state.goal || 50, tx = Engine.todayXp(state);

    var html = '<h1>' + title + "</h1>" +
      '<div class="card">' +
      '<div class="scorebig"><b>' + r.pct + '%</b><span>+' + round.xp + ' xp</span>' +
        (round.bestCombo > 2 ? '<span>🔥 combo ×' + round.bestCombo + "</span>" : "") + "</div>" +
      '<div class="goalbar" style="margin:12px 0 4px"><i style="width:' +
        Math.min(100, Math.round(tx / goal * 100)) + '%"></i></div>' +
      '<p class="muted" style="margin:0 0 10px">Meta de hoy: ' + tx + " / " + goal + " xp" +
        (tx >= goal ? " ✓" : " — te faltan " + (goal - tx)) + "</p>" +
      '<table class="res">' +
        "<tr><td>Correctas</td><td>" + round.right + "</td></tr>" +
        "<tr><td>Casi</td><td>" + round.close + "</td></tr>" +
        "<tr><td>Incorrectas</td><td>" + round.wrong + "</td></tr>" +
        "<tr><td>Racha</td><td>" + state.streak + " días 🔥</td></tr>" +
      "</table>";

    if (round.kind === "boss") {
      html += r.passed
        ? '<p style="margin-top:14px">Semana ' + Math.min(52, view.week + 1) +
          " desbloqueada. +" + Engine.XP.boss + " xp</p>"
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
      html += "<h3>Para repasar (vuelven en el ripasso)</h3><table class=\"res\">" +
        wrong.map(function (l) {
          return "<tr><td>" + esc(l.es || l.given || "—") + "</td><td>" +
            esc(l.answer) + "</td></tr>";
        }).join("") + "</table>";
    }

    html += '<div class="row" style="margin-top:16px">' +
      '<button class="btn" id="again">Otra ronda</button>' +
      '<button class="btn ghost" id="toggi">Inicio</button>' +
      "</div></div>";
    return html;
  }

  /* ----------------------------------------------------------------- lampo */

  var LAMPO_MS = 60000;

  function startLampo() {
    lampo = { end: Date.now() + LAMPO_MS, right: 0, wrong: 0, item: Drills.lampoItem(state),
              lock: false, timer: null, done: false };
    view.screen = "lampo";
    render();
    lampo.timer = setInterval(tickLampo, 100);
  }

  function tickLampo() {
    if (!lampo || lampo.done) return;
    var left = lampo.end - Date.now();
    var bar = $("#lbar"), sec = $("#lsec");
    if (bar) bar.style.width = Math.max(0, left / LAMPO_MS * 100) + "%";
    if (sec) sec.textContent = Math.max(0, Math.ceil(left / 1000)) + "″";
    if (left <= 0) finishLampo();
  }

  function renderLampo() {
    var it = lampo.item;
    return '<div class="hud"><span class="lsec" id="lsec">60″</span>' +
      '<span class="progressline lampobar"><i id="lbar" style="width:100%"></i></span>' +
      '<span class="combo">✓ ' + lampo.right + "</span>" +
      '<button class="btn ghost" id="lquit">✕</button></div>' +
      '<div class="card lampocard">' +
        '<div class="prompt">⚡ ¿Cómo se dice?</div>' +
        '<div class="stem">' + esc(it.stem) + "</div>" +
        '<div class="options">' + it.options.map(function (o, k) {
          return '<button class="opt" data-lopt="' + k + '">' + esc(o) + "</button>";
        }).join("") + "</div>" +
      "</div>" +
      '<p class="muted center">Error = −3 segundos. Récord: ' + ((state.best || {}).lampo || 0) + "</p>";
  }

  function lampoAnswer(btn) {
    if (lampo.lock || lampo.done) return;
    lampo.lock = true;
    var it = lampo.item;
    var ok = btn.textContent === it.answer;
    btn.classList.add(ok ? "right" : "wrong");
    if (ok) { lampo.right++; fx.right(); }
    else {
      lampo.wrong++; fx.wrong();
      lampo.end -= 3000;
      document.querySelectorAll("[data-lopt]").forEach(function (b) {
        if (b.textContent === it.answer) b.classList.add("right");
      });
    }
    setTimeout(function () {
      if (lampo.done) return;
      lampo.item = Drills.lampoItem(state);
      lampo.lock = false;
      render();
      tickLampo();
    }, ok ? 220 : 900);
  }

  function finishLampo() {
    if (!lampo || lampo.done) return;
    lampo.done = true;
    clearInterval(lampo.timer);
    if (!state.best) state.best = {};
    var record = lampo.right > (state.best.lampo || 0);
    if (record) state.best.lampo = lampo.right;
    var xp = lampo.right * 3;
    gain(xp);
    var won = Engine.checkBadges(state);
    persist();
    renderHeader();
    view.screen = "lampofine";
    view.result = { record: record, xp: xp, won: won };
    if (record && lampo.right > 0) { fx.goal(); confetti(); }
    render();
  }

  function renderLampoFine() {
    var r = view.result;
    return "<h1>" + (r.record ? "⚡ ¡Nuevo récord!" : "⚡ Tiempo") + "</h1>" +
      '<div class="card center"><div class="scorebig"><b>' + lampo.right +
      "</b><span>aciertos</span><span>+" + r.xp + " xp</span></div>" +
      '<p class="muted">Errores: ' + lampo.wrong + " · récord: " + state.best.lampo + "</p>" +
      ((r.won || []).map(function (b) {
        return "<p>🏅 <b>" + esc(b.name) + "</b> — " + esc(b.desc) + "</p>";
      }).join("")) +
      '<div class="row centerrow"><button class="btn" id="lagain">Otra vez</button>' +
      '<button class="btn ghost" id="toggi">Inicio</button></div></div>';
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

  /* ------------------------------------------------------------------- io */

  function renderIo() {
    var lv = Engine.levelFor(state.xp);
    var phrasesKnown = Object.keys(state.cards).filter(function (k) {
      return k.indexOf("frase:") === 0;
    }).length;
    var nextRank = null;
    Engine.RANKS.forEach(function (r) { if (!nextRank && r[0] > lv.level) nextRank = r; });

    return "<h1>Io</h1>" +
      '<div class="card rank"><div class="rk">' + esc(Engine.rankFor(lv.level)) + "</div>" +
        '<div class="muted">nivel ' + lv.level + " · " + state.xp + " xp totales" +
        (nextRank ? " · próximo rango: <b>" + esc(nextRank[1]) + "</b> en el nivel " +
          nextRank[0] : "") + "</div></div>" +

      '<div class="card"><h2>Ajustes</h2>' +
        '<label class="set"><span>Meta diaria</span><select id="goal">' +
          [[20, "Relajada · 20 xp"], [50, "Normal · 50 xp"], [100, "Seria · 100 xp"],
           [150, "Intensa · 150 xp"]].map(function (g) {
            return '<option value="' + g[0] + '"' + (state.goal === g[0] ? " selected" : "") +
              ">" + g[1] + "</option>";
          }).join("") + "</select></label>" +
        '<label class="set"><span>Modo oficina 🤫<small>nada suena solo; el 🔊 sigue andando si lo tocás</small></span>' +
          '<input type="checkbox" id="silent"' + (state.silent ? " checked" : "") + "></label>" +
        '<label class="set"><span>Recordatorio diario<small>se agrega a tu calendario</small></span>' +
          '<span class="row"><input type="time" id="remtime" value="' +
            esc(state.remind || "13:30") + '"><button class="btn ghost" id="remind">📅 Agregar</button></span></label>' +
      "</div>" +

      '<div class="card"><h2>Tu memoria</h2>' +
        '<p class="muted">Todo tu progreso vive <b>solo en este teléfono</b>, sin cuentas ni servidores. ' +
        "Si borrás los datos del navegador se pierde: guardá una copia de vez en cuando.</p>" +
        '<div class="row"><button class="btn" id="export">💾 Guardar copia</button>' +
        '<button class="btn ghost" id="import">📂 Restaurar copia</button>' +
        '<input type="file" id="importfile" accept="application/json,.json" hidden></div>' +
        '<p class="muted" id="persistmsg" style="margin-top:10px"></p>' +
      "</div>" +

      '<div class="card"><h2>Medallas</h2><div class="badges">' +
        Engine.BADGES.map(function (b) {
          var won = state.badges.indexOf(b.id) >= 0;
          return '<div class="badge' + (won ? " won" : "") + '">' +
            '<div class="ico">' + (won ? "🏅" : "🔒") + "</div>" +
            "<b>" + esc(b.name) + "</b><span>" + esc(b.desc) + "</span></div>";
        }).join("") +
      "</div></div>" +

      '<div class="card"><h2>Estadísticas</h2><table class="res">' +
        "<tr><td>Frases de conversación vistas</td><td>" + phrasesKnown + " / " +
          Frasi.ALL.length + "</td></tr>" +
        "<tr><td>Frases escritas de memoria</td><td>" + (state.written || 0) + "</td></tr>" +
        "<tr><td>Récord Lampo</td><td>" + ((state.best || {}).lampo || 0) + "</td></tr>" +
        "<tr><td>Mejor combo</td><td>" + ((state.best || {}).combo || 0) + "</td></tr>" +
        "<tr><td>Respuestas totales</td><td>" + state.totals.attempts + "</td></tr>" +
        "<tr><td>Correctas</td><td>" + state.totals.right + "</td></tr>" +
        "<tr><td>Fichas en repaso</td><td>" + Object.keys(state.cards).length + "</td></tr>" +
        "<tr><td>Semana desbloqueada</td><td>" + state.unlocked + "/52</td></tr>" +
      "</table>" +
      '<div class="row" style="margin-top:14px">' +
        '<button class="btn ghost" id="reset">Borrar mi progreso</button>' +
      "</div></div>";
  }

  function stamp() {
    var d = new Date();
    function p(n) { return (n < 10 ? "0" : "") + n; }
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate());
  }

  function exportSave() {
    var name = "italiano-backup-" + stamp() + ".json";
    var blob = new Blob([JSON.stringify(state)], { type: "application/json" });
    // On phones, the share sheet lets you drop the file in Drive, mail or chat.
    try {
      var file = new File([blob], name, { type: "application/json" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({ files: [file], title: "Backup La Via C1" })
          .catch(function () { download(blob, name); });
        return;
      }
    } catch (e) { /* niente share */ }
    download(blob, name);
  }

  function download(blob, name) {
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }

  function importSave(file) {
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var s = JSON.parse(reader.result);
        if (typeof s.xp !== "number" || !s.cards) throw new Error("formato");
        if (!confirm("Esto reemplaza tu progreso actual por la copia (" + s.xp +
                     " xp). ¿Seguir?")) return;
        var base = Engine.blankSave();
        Object.keys(base).forEach(function (k) { if (s[k] === undefined) s[k] = base[k]; });
        state = s;
        persist();
        renderHeader();
        render();
        toast("✓ Copia restaurada.");
      } catch (e) {
        toast("Ese archivo no es una copia válida.");
      }
    };
    reader.readAsText(file);
  }

  /* Un evento ricorrente .ics: il telefono lo aggiunge al calendario e ti
     avvisa ogni giorno, senza bisogno di server né notifiche push. */
  function reminderIcs(hhmm) {
    var p = hhmm.split(":");
    var d = new Date();
    d.setHours(+p[0], +p[1], 0, 0);
    function two(n) { return (n < 10 ? "0" : "") + n; }
    var local = d.getFullYear() + two(d.getMonth() + 1) + two(d.getDate()) + "T" +
      two(d.getHours()) + two(d.getMinutes()) + "00";
    var end = new Date(d.getTime() + 5 * 60000);
    var localEnd = end.getFullYear() + two(end.getMonth() + 1) + two(end.getDate()) + "T" +
      two(end.getHours()) + two(end.getMinutes()) + "00";
    var url = location.href.split("#")[0];
    return [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//La Via C1//IT",
      "BEGIN:VEVENT",
      "UID:laviac1-daily@" + location.host,
      "DTSTAMP:" + new Date().toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z",
      "DTSTART:" + local,
      "DTEND:" + localEnd,
      "RRULE:FREQ=DAILY",
      "SUMMARY:☕ Pausa caffè: 3 minutos de italiano",
      "DESCRIPTION:Racha en juego. Abrí La Via C1: " + url,
      "URL:" + url,
      "BEGIN:VALARM", "TRIGGER:PT0M", "ACTION:DISPLAY",
      "DESCRIPTION:Andiamo! 3 minutos de italiano", "END:VALARM",
      "END:VEVENT", "END:VCALENDAR"
    ].join("\r\n");
  }

  /* ---------------------------------------------------------------- router */

  var TABS = [["oggi", "🏠", "Oggi"], ["frasi", "🗣️", "Frasi"],
              ["percorso", "🗺️", "Percorso"], ["io", "👤", "Io"]];

  function renderNav() {
    var nav = $("#nav");
    if (!nav) return;
    var inGame = ["gioco", "lampo"].indexOf(view.screen) >= 0;
    nav.hidden = inGame;
    nav.innerHTML = TABS.map(function (t) {
      return '<button class="' + (view.tab === t[0] ? "on" : "") + '" data-tab="' + t[0] + '">' +
        '<span>' + t[1] + "</span>" + t[2] + "</button>";
    }).join("");
    nav.querySelectorAll("[data-tab]").forEach(function (b) {
      b.onclick = function () { go(b.dataset.tab); };
    });
  }

  function render() {
    var html = "";
    var s = view.screen;
    if (s === "oggi") html = renderOggi();
    else if (s === "frasi") html = renderFrasi();
    else if (s === "percorso") html = renderPercorso();
    else if (s === "io") html = renderIo();
    else if (s === "briefing") html = renderBriefing(course.weeks[view.week - 1]);
    else if (s === "teoria") html = renderTeoria(course.weeks[view.week - 1]);
    else if (s === "sfide") html = renderSfide(course.weeks[view.week - 1]);
    else if (s === "gioco") html = renderGioco();
    else if (s === "risultato") html = renderRisultato();
    else if (s === "lampo") html = renderLampo();
    else if (s === "lampofine") html = renderLampoFine();

    app().innerHTML = html;
    document.body.classList.toggle("ingame", s === "gioco" || s === "lampo");
    renderNav();
    wire();
  }

  function on(sel, fn) { var b = $(sel); if (b) b.onclick = fn; }

  function wire() {
    document.querySelectorAll("[data-week]").forEach(function (b) {
      b.onclick = function () {
        view.week = +b.dataset.week;
        view.screen = "briefing";
        view.tab = "percorso";
        render();
        window.scrollTo(0, 0);
      };
    });
    document.querySelectorAll("[data-scene]").forEach(function (b) {
      b.onclick = function () { startRound("scene", b.dataset.scene); };
    });

    on("#back", function () { go("percorso"); });
    on("#toggi", function () { go("oggi"); });

    // oggi
    on("#pausa", function () { startRound("pausa"); });
    on("#lampo", startLampo);
    on("#scena", function () { startRound("scene", Drills.nextScene(state).id); });
    on("#rev", function () { startRound("review"); });
    on("#sayfdg", function () { speak(Frasi.ofTheDay().it, true); });
    on("#install", function () {
      if (!installPrompt) return;
      installPrompt.prompt();
      installPrompt = null;
    });
    on("#chest", function () {
      var prize = Engine.openChest(state);
      if (!prize) return;
      persist();
      renderHeader();
      fx.goal();
      confetti();
      toast(prize.label, 3000);
      render();
    });

    // teoria e briefing
    on("#teo", function () { view.screen = "teoria"; render(); window.scrollTo(0, 0); });
    ["#tback", "#tback2"].forEach(function (sel) {
      on(sel, function () { view.screen = "briefing"; render(); });
    });
    on("#tdone", function () {
      var w = course.weeks[view.week - 1];
      if (!state.read) state.read = {};
      if (!state.read[w.week]) {
        state.read[w.week] = Date.now();
        gain(Engine.XP.lesson);
        var won = Engine.checkBadges(state);
        persist();
        renderHeader();
        toast(won.length ? "🏅 " + won[0].name : "+" + Engine.XP.lesson + " xp");
      }
      view.screen = "briefing";
      render();
    });
    on("#tplay", function () {
      startRound(course.weeks[view.week - 1].boss ? "boss" : "round");
    });
    document.querySelectorAll("[data-say]").forEach(function (b) {
      b.onclick = function () { speak(sayIndex[b.dataset.say] || "", true); };
    });
    on("#play", function () {
      startRound(course.weeks[view.week - 1].boss ? "boss" : "round");
    });
    on("#gym", function () { startRound("gym"); });
    on("#chal", function () { view.screen = "sfide"; render(); });
    on("#again", function () { startRound(round.kind, round.arg); });
    on("#quit", function () {
      if (round.kind === "scene" || round.kind === "pausa" || round.kind === "review") go("oggi");
      else { view.screen = "briefing"; render(); }
    });

    // lampo
    document.querySelectorAll("[data-lopt]").forEach(function (b) {
      b.onclick = function () { lampoAnswer(b); };
    });
    on("#lquit", function () { if (lampo) { lampo.done = true; clearInterval(lampo.timer); } go("oggi"); });
    on("#lagain", startLampo);

    wireGioco();
    wireIo();

    document.querySelectorAll("[data-self]").forEach(function (b) {
      b.onclick = function () {
        var id = b.dataset.self, q = +b.dataset.q;
        state.challengeLog[id] = { q: q, at: Date.now() };
        gain(q === 2 ? Engine.XP.challenge : q === 1 ? 3 : 1);
        Engine.checkBadges(state);
        persist();
        renderHeader();
        render();
        toast("Anotado.");
      };
    });
  }

  function wireGioco() {
    if (view.screen !== "gioco" || !round) return;
    var it = currentItem();

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

    on("#say", function () { speak(it.stem.replace(/___/g, "…"), true); });

    if (it.type === "intro") {
      on("#next", nextItem);
      on("#sayit", function () { speak(it.frase.it, true); });
      on("#slow", function () { speak(it.frase.it, true, 0.6); });
      speak(it.frase.it);
    }

    if (it.type === "tiles") {
      drawTiles();
      on("#tcheck", function () {
        if (!round.picked.length) return;
        var r = gradeTiles(it);
        settle(r.verdict, r.given);
      });
      on("#tclear", function () { round.picked = []; drawTiles(); });
    }

    if (it.type === "listen") {
      on("#play1", function () { speak(it.stem, true); });
      on("#slow", function () { speak(it.stem, true, 0.6); });
      on("#peek", function () { $("#peektxt").hidden = false; });
      setTimeout(function () { speak(it.stem); }, 250);
    }

    if (it.type === "flash") {
      on("#reveal", function () {
        $("#flash").innerHTML =
          '<div class="fit big">' + esc(it.answer) + "</div>" +
          '<p class="muted">¿Te salió?</p>' +
          '<div class="selfgrade">' +
            '<button class="btn ghost" data-fq="0">😬 No</button>' +
            '<button class="btn ghost" data-fq="1">🤏 Casi</button>' +
            '<button class="btn" data-fq="2">😎 ¡Sí!</button></div>';
        speak(it.answer);
        document.querySelectorAll("[data-fq]").forEach(function (b) {
          b.onclick = function () {
            var q = +b.dataset.fq;
            $("#flash").querySelectorAll("button").forEach(function (x) { x.disabled = true; });
            settle(["sbagliato", "quasi", "giusto"][q], "");
          };
        });
      });
    }

    if (it.type === "write") {
      var w = $("#wans");
      var check = function () {
        if (!w.value.trim()) return;
        var r = Frasi.gradeWritten(w.value, it.answer);
        var marks = '<div class="words">' + Frasi.tiles(it.answer).map(function (x, k) {
          return '<span class="' + (r.hits[k] ? "hit" : "miss") + '">' + esc(x) + "</span>";
        }).join(" ") + "</div>";
        if (r.verdict === "giusto") state.written = (state.written || 0) + 1;
        settle(r.verdict, w.value, r.verdict === "giusto" ? "" : marks);
      };
      on("#wsend", check);
      w.onkeydown = function (e) {
        if (e.key === "Enter") { e.preventDefault(); check(); }
      };
      w.focus();
      on("#hint", function () {
        var t = $("#hinttxt");
        var ws = Frasi.tiles(it.answer);
        t.textContent = ws.slice(0, Math.max(1, Math.ceil(ws.length / 3))).join(" ") + " …";
        t.hidden = false;
        w.focus();
      });
      // Too hard right now: fall back to tiles for this phrase.
      on("#easier", function () {
        round.items[round.i] = Frasi.tilesItem(it.frase);
        render();
      });
    }
  }

  function wireIo() {
    if (view.screen !== "io") return;
    var goal = $("#goal");
    if (goal) goal.onchange = function () {
      state.goal = +goal.value;
      persist();
      renderHeader();
      toast("Meta: " + state.goal + " xp por día");
    };
    var silent = $("#silent");
    if (silent) silent.onchange = function () {
      state.silent = silent.checked;
      persist();
      renderHeader();
    };
    on("#remind", function () {
      var t = $("#remtime").value || "13:30";
      state.remind = t;
      persist();
      download(new Blob([reminderIcs(t)], { type: "text/calendar" }), "italiano-diario.ics");
      toast("Abrí el archivo para agregarlo a tu calendario.", 3000);
    });
    on("#export", exportSave);
    on("#import", function () { $("#importfile").click(); });
    var file = $("#importfile");
    if (file) file.onchange = function () { if (file.files[0]) importSave(file.files[0]); };

    var pm = $("#persistmsg");
    if (pm && navigator.storage && navigator.storage.persisted) {
      navigator.storage.persisted().then(function (p) {
        pm.textContent = p
          ? "🔒 El navegador marcó tus datos como persistentes: no los borra solo."
          : "Instalá la app en la pantalla de inicio para que el teléfono no borre tus datos.";
      });
    }

    on("#reset", function () {
      if (!confirm("Esto borra tu progreso completo. ¿Seguro?")) return;
      state = Engine.blankSave();
      persist();
      go("oggi");
      renderHeader();
      toast("Progreso borrado.");
    });
  }

  /* ------------------------------------------------------------------ avvio */

  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault();
    installPrompt = e;
    if (view.screen === "oggi" && course) render();
  });

  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function () { /* offline no */ });
    });
  }
  // Ask the browser not to evict the save under storage pressure.
  if (navigator.storage && navigator.storage.persist) {
    navigator.storage.persist().catch(function () { /* */ });
  }

  // Coming back to the app after a while: refresh the header (new day, streak).
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden && course) {
      renderHeader();
      if (view.screen === "oggi") render();
    }
  });

  fetch("data/course.json")
    .then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    })
    .then(function (data) {
      course = data;
      itemMap = Drills.itemsById(course);
      view.week = Math.min(state.unlocked, 52);
      if (location.hash === "#pausa") { renderHeader(); startRound("pausa"); return; }
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
