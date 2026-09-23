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

  var saveWarned = false;
  function persist() {
    if (!Engine.save(state) && !saveWarned) {
      saveWarned = true;
      toast("⚠️ No puedo guardar tu progreso: el teléfono no tiene espacio o bloquea el almacenamiento. " +
            "Liberá espacio o guardá una copia en Io.", 6000);
    }
  }

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
    for (var i = 0; i < 16; i++) {
      var s = document.createElement("span");
      s.textContent = bits[i % bits.length];
      s.style.left = Math.random() * 100 + "%";
      s.style.animationDelay = Math.random() * 0.5 + "s";
      s.style.fontSize = 14 + Math.random() * 18 + "px";
      box.appendChild(s);
    }
    document.body.appendChild(box);
    setTimeout(function () { box.remove(); }, 1900);
  }

  /* -------------------------------------------------------- xp e obiettivo */

  // «+10» rises from the answer towards the daily ring.
  function xpFly(n) {
    var ring = document.querySelector(".ring");
    var fb = $("#fb");
    var y = fb && fb.getBoundingClientRect().top ? Math.min(window.innerHeight * 0.55, fb.getBoundingClientRect().top) : window.innerHeight * 0.4;
    var el = document.createElement("div");
    el.className = "xpfloat";
    el.textContent = "+" + n;
    el.style.left = (window.innerWidth / 2 - 20) + "px";
    el.style.top = y + "px";
    document.body.appendChild(el);
    setTimeout(function () { el.remove(); if (ring) ring.classList.add("bump"); }, 900);
  }

  function dias(n) { return n + (n === 1 ? " día" : " días"); }

  function gain(n) {
    if (!n) return;
    var lvBefore = Engine.levelFor(state.xp).level;
    var hit = Engine.addXp(state, n);
    var lvAfter = Engine.levelFor(state.xp).level;
    if (lvAfter > lvBefore) {
      var rkB = Engine.rankFor(lvBefore), rkA = Engine.rankFor(lvAfter);
      setTimeout(function () {
        fx.goal();
        toast(rkA !== rkB ? "🎖️ ¡Nuevo rango: " + rkA + "! (nivel " + lvAfter + ")"
                          : "⬆️ ¡Nivel " + lvAfter + "!", 2600);
      }, hit ? 3400 : 300);
    }
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
    var goal = Engine.goalFor(state);
    var pct = Math.min(100, Math.round(todayXp / goal * 100));
    $("#hdr").innerHTML =
      '<div class="bar">' +
        // El logo es una placa de calle romana: «La Via» es el camino.
        '<button class="brand targa" id="home" title="' + esc(Engine.rankFor(lv.level)) +
          '"><span class="t-sup">livello ' + lv.level + '</span><span class="t-via">Via C1</span></button>' +
        '<div class="stats">' +
          '<div class="stat' + (state.streak > 0 ? " hot" : "") + '"><b>' + state.streak + "<i>🔥</i></b><span>racha</span></div>" +
          '<div class="stat"><b>' + (state.shields || 0) + '🛡️</b><span>escudos</span></div>' +
          '<div class="ring" style="--p:' + pct + '" title="meta diaria">' +
            '<b>' + (pct >= 100 ? "✓" : todayXp) + '</b></div>' +
          (state.streak >= 7 ? '<div class="stat boost" title="racha de 7: xp ×1,2"><b>×1,2</b><span>xp</span></div>' : "") +
          (state.boost > 0 ? '<div class="stat boost" title="doble xp en la próxima ronda"><b>🎟️' + state.boost + '</b><span>doble</span></div>' : "") +
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

  function stopLampo() {
    if (lampo && !lampo.done) { lampo.done = true; clearInterval(lampo.timer); }
  }

  function go(tab) {
    stopLampo();
    view.tab = view.screen = tab;
    render();
    window.scrollTo(0, 0);
  }

  /* ------------------------------------------------------------------ oggi */

  function renderOggi() {
    var goal = Engine.goalFor(state);
    var todayXp = Engine.todayXp(state);
    var reached = todayXp >= goal;
    var chestOpen = state.chest === Engine.dayKey();
    var due = Drills.dueCount(course, state, itemMap);
    var dueToday = Math.min(due, 20);
    var weekend = Engine.goalFor(state) < (state.goal || 200);
    var strands = Engine.strandsLast(state, 7);
    var dailyDone = state.dailyDone === Engine.dayKey();
    var w = course.weeks[Math.min(state.unlocked, 52) - 1];
    var f = Frasi.ofTheDay();
    var known = Frasi.ALL.filter(function (x) { return state.cards[x.id]; }).length;
    var hour = new Date().getHours();
    var hello = hour < 13 ? "Buongiorno" : hour < 19 ? "Buon pomeriggio" : "Buonasera";

    var plan = weekPlan(w), doneN = plan.filter(function (x) { return x.done; }).length;
    var nm = nextMission(w);
    // Words: the course brings 9-15 a week; the bank (Parole) adds 12 a session.
    var nWords = Object.keys(state.cards).filter(function (id) {
      return id.indexOf("v:") === 0 || id.indexOf("b:voc:") === 0;
    }).length;
    var wordGoal = state.unlocked <= 13 ? 800 : state.unlocked <= 26 ? 1800 : state.unlocked <= 39 ? 2800 : 3800;
    var html = '<h1>' + hello + '! 👋</h1>' +
      '<p class="lead">' + (weekend
        ? "Fin de semana: meta a la mitad (" + goal + " xp). Algo liviano alcanza: una lectura, una pausa." +
          (state.streak > 1 ? " Llevás <b>" + dias(state.streak) + "</b>." : "")
        : state.streak > 1
        ? "Llevás <b>" + dias(state.streak) + "</b> seguidos" + (state.streak >= 7 ? " y tu xp vale ×1,2" : "") + ". No cortes la racha."
        : !lessonRead(1) ? "Empezás de cero. Tu camino es el percorso: un paso por vez."
        : "Tu próximo paso está marcado. Si tenés tres minutos, una pausa caffè.") + "</p>";

    var pend = loadPending();
    if (pend) {
      html += '<div class="card weekcard first"><span class="muted">⏸️ Dejaste algo a medias</span>' +
        "<b>" + esc(pendingTitle(pend)) + "</b>" +
        '<span class="row" style="margin-top:10px"><button class="btn" id="resume">Seguir donde estaba</button>' +
        '<button class="tab" id="discard">Descartar</button></span></div>';
    }

    // Il percorso davanti a tutto: la settimana in corso e la prossima missione.
    html += '<div class="card weekcard first hero">' +
      '<span class="muted">🗺️ Il percorso · semana ' + w.week + " · " + esc(w.level) + " · " + doneN + " / " + plan.length + " misiones</span>" +
      "<b>" + esc(w.title) + "</b>" +
      '<span class="prog"><i style="width:' + Math.round(doneN / Math.max(1, plan.length) * 100) + '%"></i></span>' +
      (nm
        ? '<span class="muted">Siguiente: <b>' + nm.ico + " " + nm.title + "</b></span>" +
          '<span class="row" style="margin-top:10px"><button class="btn" id="heronext">▶︎ ' + esc(nm.title) + "</button>" +
          '<button class="tab" data-week="' + w.week + '">Ver la semana</button></span>'
        : '<span class="muted">Semana completa. ' + (state.unlocked > w.week ? "Seguí con la siguiente." : "Repasá o entrená para abrir la siguiente.") + "</span>" +
          '<span class="row" style="margin-top:10px"><button class="btn" data-week="' + w.week + '">Ver la semana</button>' +
          '<button class="tab" id="topercorso">Il percorso</button></span>') +
      "</div>";

    // Obiettivo del giorno + forziere
    html += '<div class="card goal">' +
      '<div class="goalrow"><div><b>Meta de hoy</b>' +
        '<span class="muted"> ' + (reached ? "✓ " + todayXp + " xp hoy" : todayXp + " / " + goal + " xp") +
        "</span></div>" +
        (reached && !chestOpen
          ? '<button class="btn gold pulse" id="chest">🎁 Abrir cofre</button>'
          : chestOpen ? '<span class="muted">🎁 cofre abierto · volvé mañana</span>'
          : '<span class="muted">🎁 al llegar a la meta</span>') +
      "</div>" +
      '<div class="goalbar"><i style="width:' +
        Math.min(100, Math.round(todayXp / goal * 100)) + '%"></i></div>' +
      "</div>";

    // Azioni rapide: la pausa (mescola la settimana in corso), il ripasso, il lampo.
    html += '<div class="big">' +
      '<button class="bigbtn pausa" id="pausa"><span class="e">☕</span>' +
        "<b>Pausa caffè</b><small>3 minutos con lo de tu semana</small></button>" +
      '<button class="bigbtn giorno" id="giorno"' + (dailyDone ? " disabled" : "") + '>' +
        '<span class="e">🎯</span><b>Sfida del giorno</b><small>' +
        (dailyDone ? "✓ hecha · mañana hay otra" : "6 preguntas · doble xp") + "</small></button>" +
      '<button class="bigbtn ripasso" id="rev"' + (due ? "" : " disabled") + '>' +
        '<span class="e">🔁</span><b>Ripasso</b><small>' +
        (due ? "hoy: " + dueToday + (due > 20 ? " (quedan " + due + ")" : " para repasar") : "nada pendiente") + "</small></button>" +
      (state.unlocked >= 2 && Banca.loaded() ? '<button class="bigbtn parole" data-bank="b-voc"><span class="e">📚</span><b>Parole</b><small>' +
        nWords.toLocaleString("es-AR") + " / " + wordGoal.toLocaleString("es-AR") + " palabras</small></button>" : "") +
      (known >= 12 ? '<button class="bigbtn lampo" id="lampo"><span class="e">⚡</span>' +
        "<b>Lampo 60″</b><small>récord: " + ((state.best || {}).lampo || 0) + "</small></button>" : "") +
      "</div>" +
      (known < 12 ? '<p class="muted" style="margin:-6px 0 12px">⚡ Lampo 60″ se abre con 12 frases vistas (llevás ' + known + ").</p>" : "");

    // Le quattro corde della settimana (Nation): dove manca, un suggerimento.
    var tot = strands.input + strands.output + strands.forma + strands.fluidez;
    if (tot > 0) {
      var NAMES = { input: "Input", output: "Output", forma: "Forma", fluidez: "Fluidez" };
      var TIP = { input: "leé un episodio o escuchá una escena", output: "escribí frases de memoria o traducí",
                  forma: "una ronda de la semana", fluidez: "un Lampo o repasá una escena" };
      var low = Engine.STRANDS.slice().sort(function (a, b) { return strands[a] - strands[b]; })[0];
      html += '<div class="card"><b>🎻 Tus cuatro cuerdas · últimos 7 días</b>' +
        '<div class="strands">' + Engine.STRANDS.map(function (k) {
          return '<i class="s-' + k + '" style="width:' + Math.round(strands[k] / tot * 100) + '%" title="' + NAMES[k] + '"></i>';
        }).join("") + "</div>" +
        '<p class="muted">' + Engine.STRANDS.map(function (k) { return NAMES[k] + " " + Math.round(strands[k] / tot * 100) + " %"; }).join(" · ") +
        ". Te falta <b>" + NAMES[low].toLowerCase() + "</b>: " + TIP[low] + ".</p></div>";
    }

    // La clinica: gli errori che si ripetono
    var weakO = Banca.loaded() ? Banca.weakest(state, 2) : [];
    if (weakO.length) {
      html += '<button class="card weekcard clin" data-bank="clinica">' +
        '<span class="muted">🩺 Clínica de tus errores</span>' +
        "<b>Practicá " + weakO.map(function (w) { return esc((Diagnosi.LABEL[w.cat] || w.cat).toLowerCase()); }).join(" y ") + "</b>" +
        '<span class="muted">12 ejercicios armados con lo que más te cuesta.</span></button>';
    }

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
    return html + versionLine();
  }

  /* The version, so a glance says whether the phone already loaded the
     latest one (it must match VERSION in sw.js: test_game checks it). */
  var APP_VERSION = "v28";
  function versionLine() {
    return '<p class="muted small version">La Via C1 · versión ' + APP_VERSION + "</p>";
  }

  function isStandalone() {
    return (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
      window.navigator.standalone === true;
  }

  /* ----------------------------------------------------------------- frasi */

  function bankBtn(id, emoji, name, desc, week) {
    var locked = (state.unlocked || 1) < week;
    return '<button class="lab" data-bank="' + id + '"' + (locked ? " disabled" : "") + '><span class="e">' + emoji + "</span><b>" + name + "</b>" +
      '<span class="muted">' + (locked ? "Se abre en la semana " + week + ", con la gramática que usa." : desc) + "</span></button>";
  }

  function renderFrasi() {
    var html = "<h1>Allena</h1>" +
      '<p class="lead">Bloques listos para hablar ya, sin armar gramática en la cabeza. ' +
      "Cada escena te presenta frases nuevas, te las hace armar con fichas y después " +
      "<b>escribirlas de memoria</b>. Cuanto más rápido te salen escritas, más rápido " +
      "te salen habladas.</p>";

    var pp = Lab.progress("ponte:", state.cards), pf = Lab.progress("falso:", state.cards),
        pc = Lab.progress("capire:", state.cards);
    html += "<h2>Laboratorio</h2>" +
      '<div class="labs">' +
        '<button class="lab" data-lab="ponte"><span class="e">🌉</span><b>Ponte</b>' +
          '<span class="muted">Del español al italiano con reglas: -ción → -zione, h- → f-…</span>' +
          '<span class="meta">' + pp.seen + "/" + pp.total + " palabras</span></button>" +
        '<button class="lab" data-lab="falsi"><span class="e">🪤</span><b>Falsi amici</b>' +
          '<span class="muted">Las palabras que parecen y no son.</span>' +
          '<span class="meta">' + pf.seen + "/" + pf.total + "</span></button>" +
        '<button class="lab" data-lab="capire"><span class="e">🎯</span><b>Capire</b>' +
          '<span class="muted">Leer la gramática: quién, cuándo, cuántos, seguro o no.</span>' +
          '<span class="meta">' + pc.seen + "/" + pc.total + "</span></button>" +
      "</div>" +
      '<p class="muted science">🔬 Ponte usa la transferencia desde tu lengua (Ringbom); ' +
      "Capire es input estructurado: primero interpretar la forma, después producirla (VanPatten).</p>";

    if (Banca.loaded()) {
      var st = Banca.stats(), weak = Banca.weakest(state, 2);
      html += "<h2>Banco</h2>" +
        '<p class="muted">' + st.nouns + " sustantivos, " + st.verbs + " verbos, " + st.adjectives +
        " adjetivos, " + st.sentences + " oraciones y " + st.errors + " errores típicos. " +
        "Cuando te equivocás, la app te dice qué tipo de error es y te deja corregirlo.</p>" +
        '<div class="labs">' +
          (weak.length ? '<button class="lab clin" data-bank="clinica"><span class="e">🩺</span><b>Clínica de tus errores</b>' +
            '<span class="muted">Práctica armada con lo que más te cuesta: ' +
            weak.map(function (w) { return esc(Diagnosi.LABEL[w.cat] || w.cat); }).join(", ") + ".</span></button>" : "") +
          '<button class="lab" data-bank="b-voc"><span class="e">📚</span><b>Parole</b>' +
            '<span class="muted">Vocabulario de tu nivel: primero reconocer, después escribir con el artículo.</span></button>' +
          bankBtn("b-tr", "✍️", "Traduci", "Oraciones del español al italiano, con corrección que te explica el error.", Banca.TR_WEEK) +
          bankBtn("b-gap", "🔧", "Coniuga in contesto", "El verbo justo dentro de una oración real.", Banca.GAP_WEEK) +
          '<button class="lab" data-bank="b-err"' + (state.unlocked < Banca.ERR_WEEK ? " disabled" : "") +
            '><span class="e">🔍</span><b>Trova l\'errore</b>' +
            '<span class="muted">' + (state.unlocked < Banca.ERR_WEEK
              ? "Se abre en la semana " + Banca.ERR_WEEK + ": primero tenés que poder leer la oración."
              : "Encontrá y corregí el error típico de un hispanohablante.") + "</span></button>" +
          bankBtn("b-forme", "🧩", "Forme", "Artículos, plurales, preposiciones con artículo y concordancia.", Banca.FORME_WEEK) +
        "</div>";
    }
    html += "<h2>Escenas</h2>";
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

  /* ----------------------------------------------------------------- leggi */

  function renderLeggi() {
    var done = state.letture || {};
    var html = "<h1>Leggi</h1>" +
      '<p class="lead">Leer mucho, entendiendo casi todo, es de lo que más hace crecer una lengua. ' +
      "Tocá las palabras subrayadas para ver qué significan.</p>";
    Letture.SERIES.forEach(function (sr) {
      html += "<h2>" + sr.emoji + " " + esc(sr.name) + "</h2>" +
        '<p class="muted">' + esc(sr.blurb) + '</p><div class="eps">';
      Letture.ofSeries(sr.id).forEach(function (ep) {
        var d = done[ep.id], open = Letture.isOpen(ep, done, state.unlocked);
        var wait = !open && ep.week > state.unlocked;
        html += '<button class="ep' + (d ? " done" : "") + '" data-ep="' + ep.id + '"' +
          (open ? "" : " disabled") + ">" +
          '<span class="e">' + (open ? ep.emoji : "🔒") + "</span>" +
          "<span><b>" + esc(ep.title) + "</b>" +
          '<span class="muted">' + (ep.area ? esc(ep.area) + " · " : "episodio " + ep.n + " · ") +
            esc(ep.level) + " · " + (wait ? "se abre en la semana " + ep.week : esc(ep.grammar)) +
            "</span></span>" +
          (d ? '<span class="score">' + d.pct + "%</span>" : "") +
          "</button>";
      });
      html += "</div>";
    });
    html += '<p class="muted science">🔬 Input comprensible (Krashen) con glosario para cubrir ' +
      "el ~98% del vocabulario (Hu y Nation); después, la caza de formas te hace notar la " +
      "gramática dentro de un texto que ya entendiste (Schmidt).</p>";
    return html;
  }

  var glossIndex = [];

  // Text of an episode as tappable words.  mode "read": glossed words open
  // their meaning; mode "hunt": every word can be selected.
  function renderText(ep, mode) {
    var k = 0;
    glossIndex = [];
    return '<div class="text' + (mode === "hunt" ? " hunt" : "") + '">' +
      Letture.paragraphs(ep).map(function (par) {
        return "<p>" + Letture.tokens(par).map(function (t) {
          var i = k++;
          if (mode === "hunt") {
            return '<span class="w" data-tok="' + i + '">' + esc(t) + "</span>";
          }
          var g = Letture.glossFor(ep, t);
          if (g) {
            glossIndex[i] = Letture.bare(t) + " — " + g;
            return '<span class="w gl" data-gl="' + i + '">' + esc(t) + "</span>";
          }
          return esc(t);
        }).join(" ") + "</p>";
      }).join("") + "</div>";
  }

  function renderLettura(ep) {
    return '<button class="btn ghost" id="lback">' + (view.epFrom === "briefing" ? "← a la semana" : "← a Leggi") + "</button>" +
      "<h1>" + ep.emoji + " " + esc(ep.title) + "</h1>" +
      '<p class="lead">' + (ep.area ? esc(ep.area) + " · " : "Martín a Bologna · episodio " + ep.n + " · ") +
        esc(ep.level) + "</p>" +
      '<div class="card">' + renderText(ep, "read") +
        '<div class="row"><button class="tab" id="readall">🔊 escuchar todo</button>' +
        '<button class="tab" id="readslow">🐢 lento</button></div></div>' +
      '<button class="btn wide" id="lquiz">Lo leí → preguntas y caza de formas</button>';
  }

  /* Toque en la palabra: cualquier palabra italiana de un ejercicio muestra
     qué significa (data/glossario.json, armado por build_course.py).  Las que
     todavía no viste en el curso van subrayadas.  No en los ejercicios que
     preguntan justamente el significado, ni en los enunciados en castellano. */
  var glossario = null;
  var stemGloss = [];

  function glossable(it) {
    if (!glossario || !it || it.type === "translate" || it.type === "listen" ||
        it.type === "dictation" || it.src === "frasi") return false;
    return !/signific|traduc|qué quiere decir|qué expresa|cómo suena|se pronuncia/i.test(it.prompt || "");
  }

  function glossify(it, raw) {
    raw = String(raw || "");
    if (!glossable(it)) return esc(raw);
    var week = Math.min(state.unlocked || 1, 52);
    return raw.split(/([A-Za-zÀ-ÿ]+)/).map(function (t, k) {
      if (k % 2 === 0) return esc(t);
      var g = glossario[t.toLowerCase()];
      if (!g) return esc(t);
      stemGloss.push(g[0] + " — " + g[1]);
      return '<span class="w gl' + (g[2] > week ? " new" : "") + '" data-sg="' +
        (stemGloss.length - 1) + '">' + esc(t) + "</span>";
    }).join("");
  }

  // Italian text that is not a stem (the solution in the feedback): every
  // word tappable, the ones not yet seen underlined.
  function glossifyAny(raw) {
    raw = String(raw || "");
    if (!glossario) return esc(raw);
    var week = Math.min(state.unlocked || 1, 52);
    return raw.split(/([A-Za-zÀ-ÿ]+)/).map(function (t, k) {
      if (k % 2 === 0) return esc(t);
      var g = glossario[t.toLowerCase()];
      if (!g) return esc(t);
      stemGloss.push(g[0] + " — " + g[1]);
      return '<span class="w gl' + (g[2] > week ? " new" : "") + '" data-sg="' +
        (stemGloss.length - 1) + '">' + esc(t) + "</span>";
    }).join("");
  }

  function showGloss(txt) {
    var box = $("#glossbox");
    if (!box) {
      box = document.createElement("div");
      box.id = "glossbox";
      box.className = "glossbox";
      document.body.appendChild(box);
    }
    box.textContent = txt;
    box.classList.add("on");
    clearTimeout(showGloss.t);
    showGloss.t = setTimeout(function () { box.classList.remove("on"); }, 3200);
  }

  /* -------------------------------------------------------------- percorso */

  function weekStat(n) {
    return state.weekStats[n] || { attempts: 0, right: 0, bossPassed: false };
  }

  // Settimana XVII: numeri romani sulle targhe.
  function romano(n) {
    var out = "", v = [[50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
    v.forEach(function (p) { while (n >= p[0]) { out += p[1]; n -= p[0]; } });
    return out;
  }

  function renderPercorso() {
    var total = 0, got = 0;
    course.weeks.forEach(function (w) { total += 3; got += weekStars(w); });
    var html = '<h1>Il percorso</h1>' +
      '<p class="lead">De base a C1 en 52 misiones. Cada una tiene <b>3 estrellas</b>: ' +
      'jugar la lección, superar la semana y dominarla. Los <b>jefes</b> cierran cada tramo.</p>' +
      '<div class="card pathsum"><b>' + got + ' / ' + total + ' ★</b>' +
      '<span class="goalbar"><i style="width:' + Math.round(got / total * 100) + '%"></i></span></div>';

    course.seasons.forEach(function (s) {
      html += '<div class="season"><div class="banner s' + s.n + '"><span class="lvl">' + esc(s.level) + "</span>" +
        "<h2>" + esc(s.name) + "</h2><p>" + esc(s.blurb) + '</p></div><div class="path">';
      course.weeks.filter(function (w) { return w.season === s.n; }).forEach(function (w, k) {
        // Una semana ya jugada sigue abierta aunque, tras el reordenamiento
        // del programa, quede después de la sbloccata.
        var open = w.week <= state.unlocked || !!state.weekStats[w.week] || lessonRead(w.week);
        var stars = weekStars(w);
        var current = w.week === Math.min(state.unlocked, 52) && stars < 3;
        var x = Math.round(Math.sin(k * 0.9) * 32);
        html += '<div class="node' + (w.boss ? " boss" : "") + (open ? "" : " locked") +
            (current ? " current" : "") + (stars === 3 ? " full" : "") + '" style="--x:' + x + '%">' +
          (current ? '<span class="bubble">' + (weekStat(w.week).attempts || lessonRead(w.week) ? "SEGUÍ" : "EMPEZÁ") + "</span>" : "") +
          '<button class="dot" data-week="' + w.week + '"' + (open ? "" : " disabled") + ">" +
            (w.boss ? "⚔️" : open ? w.week : "🔒") + "</button>" +
          '<span class="nt">' + esc(w.title) + "</span>" + starsHtml(stars) +
          (open && !w.boss ? (function () { var pl = weekPlan(w); return '<span class="nm">' +
            pl.filter(function (x) { return x.done; }).length + "/" + pl.length + " misiones</span>"; })() : "") +
          "</div>";
      });
      html += "</div></div>";
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
  /* A lesson in parts (week.parts): each part is read on its own and the
     training only asks what the parts already read cover. */
  function partsOf(w) { return w && w.parts && w.parts.length ? w.parts : null; }
  function partRead(week, k) { return !!((state.readParts || {})[week] || {})[k]; }
  function partsRead(w) {
    var ps = partsOf(w); if (!ps) return null;
    return ps.map(function (p, k) { return partRead(w.week, k) || lessonRead(w.week); });
  }
  // Item ids the learner may be asked, given the parts read (none read: the
  // first part, so that training before reading is not a wall).
  function partItems(w) {
    var ps = partsOf(w); if (!ps) return null;
    var read = partsRead(w), ids = {}, any = false;
    ps.forEach(function (p, k) { if (read[k]) { any = true; p.items.forEach(function (id) { ids[id] = 1; }); } });
    if (!any) ps[0].items.forEach(function (id) { ids[id] = 1; });
    return ids;
  }

  /* Tre stelle per settimana: la lezione giocata, la settimana superata
     (20 giuste), la padronanza (85% su almeno 30).  Il boss: superato = 3. */
  function weekStars(w) {
    var st = weekStat(w.week);
    if (w.boss) return st.bossPassed ? 3 : 0;
    return (lessonRead(w.week) || !w.lesson ? 1 : 0) + (st.right >= 20 ? 1 : 0) +
      (Drills.dominated(st, w, state) ? 1 : 0);
  }
  function starsHtml(n, of) {
    var h = ""; for (var i = 0; i < (of || 3); i++) h += '<i class="' + (i < n ? "on" : "") + '">★</i>';
    return '<span class="stars">' + h + "</span>";
  }

  var sayIndex = {};

  /* part: undefined = el bloque entero (teoría completa); "a" = título,
     regla y tabla; "b" = ejemplos, trampa, atajo y detalle (lección jugada). */
  function renderBlock(b, i, part) {
    var A = part !== "b", B = part !== "a";
    var html = '<section class="blk">';
    if (b.h) html += "<h2>" + mk(b.h) + (part === "b" ? ' <span class="muted">· ejemplos</span>' : "") + "</h2>";
    // La regla corta primero; el detalle, plegado.
    if (b.r && A) html += '<p class="rule">' + mk(b.r) + "</p>";
    if (A) (b.p || []).forEach(function (par) { html += "<p>" + mk(par) + "</p>"; });

    if (b.table && A) {
      html += '<div class="tw"><table class="gram">';
      if (b.table.head && b.table.head.join("")) {
        html += "<thead><tr>" + b.table.head.map(function (c) {
          return "<th>" + mk(c) + "</th>";
        }).join("") + "</tr></thead>";
      }
      var exCol = -1;
      (b.table.head || []).forEach(function (h, k) { if (exCol < 0 && /ejemplo/i.test(h)) exCol = k; });
      html += "<tbody>" + (b.table.rows || []).map(function (r, ri) {
        return "<tr>" + r.map(function (c, k) {
          var say = "";
          if (k === exCol && c) {
            sayIndex["t" + i + "-" + ri] = Lezione.strip(c);
            say = ' <button class="say" data-say="t' + i + "-" + ri + '" aria-label="escuchar">🔊</button>';
          }
          return "<td" + (k === 0 ? ' class="k"' : "") + ">" + mk(c) + say + "</td>";
        }).join("") + "</tr>";
      }).join("") + "</tbody></table></div>";
    }

    if (b.ex && B) {
      html += '<ul class="exs">' + b.ex.map(function (pair, k) {
        sayIndex[i + "-" + k] = pair[0];
        return '<li><span class="it">' + esc(pair[0]) + "</span>" +
          '<span class="es">' + esc(pair[1]) + "</span>" +
          '<button class="say" data-say="' + i + "-" + k + '" ' +
          'aria-label="escuchar">🔊</button></li>';
      }).join("") + "</ul>";
    }

    if (!B) return html + "</section>";
    if (b.warn) html += '<div class="call warn"><b>La trampa</b>' +
      "<p>" + mk(b.warn) + "</p></div>";
    if (b.tip) html += '<div class="call tip"><b>El atajo</b>' +
      "<p>" + mk(b.tip) + "</p></div>";
    if (b.more && b.more.length) {
      html += '<details class="more"><summary>¿Por qué? Más detalle</summary>' +
        b.more.map(function (par) { return "<p>" + mk(par) + "</p>"; }).join("") + "</details>";
    }
    return html + "</section>";
  }

  function renderTeoria(w) {
    var L = w.lesson;
    sayIndex = {};
    if (!L) return '<button class="btn ghost" id="back">← al percorso</button>' +
      '<p class="lead">Esta semana todavía no tiene teoría.</p>';

    var html = '<button class="btn ghost" id="tback">← alla settimana</button>' +
      '<h1>Teoria · settimana ' + w.week + '</h1>' +
      '<p class="lead">' + esc(w.title) + '</p>' +
      '<div class="lesson"><p class="intro">' + mk(L.intro) + '</p>';

    L.blocks.forEach(function (b, i) { html += renderBlock(b, i); });

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

  /* ------------------------------------------------------- lezione giocata */

  var les = null;

  function startLezione(part) {
    var w = course.weeks[view.week - 1];
    var isItalian = function (word) { return !!(glossario && glossario[String(word).toLowerCase()]); };
    var ps = partsOf(w);
    if (ps && (part == null || isNaN(part))) {
      // the first part not yet read (or the first one again)
      part = 0;
      for (var k = 0; k < ps.length; k++) { if (!partRead(w.week, k)) { part = k; break; } }
    }
    var only = ps ? ps[part].blocks : null;
    les = { w: w, part: ps ? part : null, steps: Lezione.steps(w.lesson, Math.random, w.week, isItalian, only),
            i: 0, right: 0, asked: 0, answered: false };
    view.screen = "lezione";
    render();
    savePending();
    window.scrollTo(0, 0);
  }

  function renderLezione() {
    var st = les.steps[les.i], w = les.w;
    var n = les.steps.length;
    var hudH = '<div class="hud"><span class="progressline"><i style="width:' +
      Math.round(Math.max(0, les.i - 1) / n * 100) + '%" data-to="' + Math.round(les.i / n * 100) + '"></i></span>' +
      '<span class="muted">' + (les.i + 1) + "/" + n + "</span>" +
      '<button class="btn ghost" id="lesquit">✕</button></div>';
    if (!st) {
      var pct = les.asked ? Math.round(les.right / les.asked * 100) : 100;
      var psd = partsOf(w), nextPart = null;
      if (psd) for (var kk = 0; kk < psd.length; kk++) { if (!partRead(w.week, kk)) { nextPart = kk; break; } }
      return '<div class="card lesdone center"><div class="bigstar">★</div>' +
        "<h1>" + (psd ? (nextPart == null ? "¡Lección completa!" : "¡Parte " + (les.part + 1) + " de " + psd.length + " lista!") : "¡Lección completa!") + "</h1>" +
        '<p class="lead">Semana ' + w.week + " · " + esc(psd ? psd[les.part].h : w.title) + "</p>" +
        '<div class="scorebig"><b>' + les.right + "/" + les.asked + '</b><span>+' + les.xp + " xp</span></div>" +
        (les.extras || []).map(function (x) { return '<p class="note selfrepair">' + esc(x) + "</p>"; }).join("") +
        '<p class="muted">' + (pct === 100 ? "Perfecta: ni un error en los chequeos." :
          pct >= 70 ? "Bien. Lo que fallaste vuelve en el entrenamiento." : "Repasala cuando quieras: se puede jugar de nuevo.") + "</p>" +
        '<div class="row centerrow" style="margin-top:14px"><button class="btn" id="lesplay">🎯 A entrenar' +
          (psd ? " esta parte" : "") + "</button>" +
        (psd && nextPart != null ? '<button class="btn ghost" id="lesnextpart" data-part="' + nextPart + '">📘 Parte ' + (nextPart + 1) + " →</button>" : "") +
        '<button class="btn ghost" id="lesback">Volver a la semana</button></div></div>';
    }
    var partLabel = les.part != null ? " · parte " + (les.part + 1) + " de " + partsOf(w).length : "";
    if (st.kind === "intro") {
      return hudH + '<div class="card lescard"><div class="badge-new">📘 Lección · semana ' + w.week + partLabel + "</div>" +
        "<h1>" + esc(w.title) + "</h1><p class=\"intro\">" + mk(w.lesson.intro) + "</p>" +
        '<button class="btn wide" id="lesnext">Empezar →</button></div>';
    }
    if (st.kind === "block") {
      return hudH + (partLabel && les.i === 0 ? '<div class="badge-new">📘 Lección · semana ' + w.week + partLabel + "</div>" : "") +
        '<div class="card lescard lesson">' + renderBlock(w.lesson.blocks[st.i], st.i, st.part) +
        '<button class="btn wide" id="lesnext">Seguir →</button></div>';
    }
    var q = st.q;
    return hudH + '<div class="card lescard quiz"><div class="badge-new">⚡ Chequeo rápido</div>' +
      '<div class="prompt">' + esc(q.prompt) + "</div>" +
      (q.stem ? '<div class="stem">' + esc(q.stem) + "</div>" : "") +
      '<div class="options">' + q.options.map(function (o, k) {
        return '<button class="opt" data-lq="' + k + '">' + esc(o) + "</button>";
      }).join("") + '</div><div id="lesfb"></div></div>';
  }

  function lesAnswer(btn) {
    if (les.answered) return;
    les.answered = true;
    var q = les.steps[les.i].q;
    var ok = btn.textContent === q.answer;
    les.asked++;
    if (ok) { les.right++; fx.right(); } else fx.wrong();
    document.querySelectorAll("[data-lq]").forEach(function (b) {
      b.disabled = true;
      if (b.textContent === q.answer) b.classList.add("right");
      else if (b === btn) b.classList.add("wrong");
    });
    $("#lesfb").innerHTML = '<div class="feedback ' + (ok ? "giusto" : "sbagliato") + '">' +
      '<div class="verdict">' + (ok ? pick(["¡Esatto!", "¡Bravo!", "¡Perfetto!"]) : "Era esta:") + "</div>" +
      '<div class="sol">' + esc(q.answer) + "</div>" +
      (ok ? "" : lesRule(q)) +
      '<div class="row" style="margin-top:10px"><button class="btn" id="lesnext2">Seguir →</button></div></div>';
    on("#lesnext2", lesNext);
  }

  // A wrong check shows the rule it tested, not just the answer.
  function lesRule(q) {
    var b = les.w.lesson.blocks[q.block];
    if (!b) return "";
    var r = b.r || b.warn || b.tip;
    return r ? '<div class="note">📐 ' + mk(r) + "</div>" : "";
  }

  function lesNext() {
    les.i++;
    les.answered = false;
    savePending();
    if (les.i >= les.steps.length) {
      clearPending();
      var w = les.w;
      var first = !lessonRead(w.week);
      if (!state.read) state.read = {};
      if (!state.lessonScore) state.lessonScore = {};
      var pct = les.asked ? Math.round(les.right / les.asked * 100) : 100;
      var planBefore = doneCount(w);
      if (les.part != null) {
        if (!state.readParts) state.readParts = {};
        var rp = state.readParts[w.week] || (state.readParts[w.week] = {});
        first = !rp[les.part];
        rp[les.part] = Date.now();
        var all = partsOf(w).every(function (p, k) { return !!rp[k]; });
        if (all && !state.read[w.week]) state.read[w.week] = Date.now();
      } else if (first) state.read[w.week] = Date.now();
      les.xp = (first ? Engine.XP.lesson : 5) + les.right * 2;
      les.extras = missionCheck(w.week, planBefore);
      state.lessonScore[w.week] = Math.max(pct, state.lessonScore[w.week] || 0);
      gain(les.xp);
      Engine.checkBadges(state);
      persist();
      renderHeader();
      fx.goal();
      confetti();
    }
    render();
    window.scrollTo(0, 0);
  }

  /* -------------------------------------------------------------- briefing */

  /* Il percorso è la diva: tutto quello che porta una settimana (lezione,
     parole, allenamento, frasi, lettura, laboratorio) è una missione della
     settimana, in ordine.  Le schede Allena e Leggi restano come scorciatoie
     libere, ma la strada ordinata è questa. */
  var PONTE_WEEK = { zione: 2, ta: 3, bile: 4, tt: 5, dittonghi: 6, effe: 7, pi: 8, aggio: 9, colte: 10 };
  var FALSI_WEEK = 11;

  // Martín's episodes open in order: an episode never lands before the one
  // that precedes it in the story.
  function readingWeek(ep) {
    if (ep.series !== "martin") return ep.week;
    var wk = 1;
    Letture.ofSeries("martin").forEach(function (e) { if (e.n <= ep.n) wk = Math.max(wk, e.week); });
    return wk;
  }

  function weekPlan(w) {
    var st = weekStat(w.week), out = [];
    var pct = st.attempts ? Math.round(st.right / st.attempts * 100) : 0;
    var m = function (o) { out.push(o); };
    if (w.boss) {
      // Before the boss: the season again, one theme at a time, and a round
      // with what you got wrong.  Optional: the boss is the gate.
      var psb = partsOf(w);
      if (w.lesson && psb) psb.forEach(function (p, k) {
        m({ kind: "lez", arg: String(k), done: partRead(w.week, k) || lessonRead(w.week), ico: "📘", opt: true,
            title: p.h, sub: (partRead(w.week, k) || lessonRead(w.week) ? "Hecho · " : "Opcional · ") +
              "la regla en pasos cortos y " + p.items.length + " ejercicios del tema" });
      });
      var weak = Drills.weakItems(course, w, state, itemMap).length;
      m({ kind: "debil", done: !!(state.weakDone || {})[w.week], ico: "🩹", opt: true, title: "Tus puntos débiles",
          sub: weak ? "Opcional · " + weak + " ejercicios de la estación que fallaste o casi no viste" : "Opcional · no fallaste nada todavía: repaso al azar" });
      m({ kind: "play", done: st.bossPassed, ico: "⚔️", title: "Vencé al jefe",
          sub: "85% de aciertos. Pregunta más de lo que más te costó. Superarlo te da las 3 estrellas.", cls: "boss" });
      return out;
    }
    var psw = partsOf(w);
    if (w.lesson && psw) psw.forEach(function (p, k) {
      m({ kind: "lez", arg: String(k), done: partRead(w.week, k) || lessonRead(w.week), ico: "📘",
          title: "Lección " + (k + 1) + "/" + psw.length + ": " + p.h,
          sub: (partRead(w.week, k) || lessonRead(w.week) ? "Hecha · " : "") + p.items.length + " ejercicios de esta parte entran al entrenamiento" });
    });
    else if (w.lesson) m({ kind: "lez", done: lessonRead(w.week), ico: "📘", title: "Jugá la lección",
      sub: lessonRead(w.week)
        ? "Hecha" + (state.lessonScore && state.lessonScore[w.week] != null ? " · " + state.lessonScore[w.week] + "% en los chequeos" : "")
        : "Teoría en pasos cortos, con preguntas." });
    if (w.vocab && w.vocab.length) {
      var seenV = w.vocab.filter(function (v) { return state.cards["v:" + v[0]]; }).length;
      m({ kind: "vocab", done: seenV >= w.vocab.length, ico: "📚", title: "Palabras de la semana",
          sub: seenV + " / " + w.vocab.length + " practicadas · primero reconocer, después escribir" });
    }
    m({ kind: "play", done: st.right >= 20, ico: "🎯", title: "Superá la semana",
        sub: Math.min(st.right, 20) + " / 20 respuestas correctas con los ejercicios de la semana" });
    if (window.Scrivi && Scrivi.TASKS[w.week]) {
      var sd = (state.scritti || {})[w.week], task = Scrivi.TASKS[w.week];
      m({ kind: "scrivi", done: !!sd, ico: "✍️", title: "Scrivi: tu texto de la semana",
          sub: sd ? "Entregado · " + sd.n + " palabras" + (sd.errs ? " · " + sd.errs + " cosas para revisar" : " · sin errores marcados")
                  : task.min + " palabras o más · " + task.use.map(function (u) { return u[2]; }).join(" · ") });
    }
    if (window.Drills && window.Frasi) Drills.scenesOfWeek(w.week).forEach(function (sc) {
      var p = Frasi.progress(sc.id, state.cards);
      m({ kind: "scene", arg: sc.id, done: p.seen >= p.total, ico: sc.emoji, title: "Frases: " + sc.name,
          sub: p.seen + " / " + p.total + " frases · " + sc.blurb });
    });
    if (window.Letture) Letture.SERIES.forEach(function (sr) {
      Letture.ofSeries(sr.id).forEach(function (ep) {
        if (readingWeek(ep) !== w.week) return;
        var d = (state.letture || {})[ep.id];
        m({ kind: "ep", arg: ep.id, done: !!d, ico: ep.emoji,
            title: (ep.series === "martin" ? "Lectura: " : "Cultura: ") + ep.title,
            sub: d ? "Leída · " + d.pct + "%" : esc(ep.level) + " · " + esc(ep.area || ep.grammar || "") +
                 (ep.series === "martin" ? "" : " · opcional") });
      });
    });
    if (window.Lab) {
      Lab.RULES.forEach(function (r) {
        if (PONTE_WEEK[r.id] !== w.week) return;
        var p = Lab.progress("ponte:" + r.id + ":", state.cards);
        m({ kind: "ponte", arg: r.id, done: p.seen >= p.total, ico: "🌉", title: "Ponte: " + r.h,
            sub: p.seen + " / " + p.total + " palabras que ya sabés del español" });
      });
      if (w.week === FALSI_WEEK) {
        var pf = Lab.progress("falso:", state.cards);
        m({ kind: "falsi", done: pf.seen >= pf.total, ico: "🪤", title: "Falsi amici",
            sub: pf.seen + " / " + pf.total + " palabras que parecen y no son" });
      }
      Lab.CAPIRE.forEach(function (c) {
        if (c.week !== w.week) return;
        var pc = Lab.progress("capire:" + c.id + ":", state.cards);
        m({ kind: "capire", arg: c.id, done: pc.seen >= pc.total, ico: "🎯", title: "Capire: " + c.h,
            sub: pc.seen + " / " + pc.total + " · leer la gramática antes de producirla" });
      });
    }
    if (window.Banca && Banca.loaded()) {
      var bankDone = function (rx) { return Object.keys(state.cards).filter(function (k) { return rx.test(k); }).length >= 8; };
      if (w.week === Banca.FORME_WEEK) m({ kind: "b-forme", done: bankDone(/^b:(art|pl|prep|agg|acc)/), ico: "🧩", title: "Banco: Forme",
        sub: "Artículos, plurales y preposiciones con artículo, generados del banco." });
      if (w.week === Banca.TR_WEEK) m({ kind: "b-tr", done: bankDone(/^b:tr:/), ico: "✍️", title: "Banco: Traduci",
        sub: "Oraciones del español al italiano, con corrección que explica el error." });
      if (w.week === Banca.GAP_WEEK) m({ kind: "b-gap", done: bankDone(/^b:gap:/), ico: "🔧", title: "Banco: Coniuga in contesto",
        sub: "El verbo justo dentro de una oración real." });
    }
    var domDone = Drills.dominated(st, w, state);
    m({ kind: "play2", done: domDone, ico: "🏆", title: "Dominala",
        sub: domDone ? "Dominada" + (st.domPct ? " · " + st.domPct + " %" : "")
          : "Una sola sesión de " + Drills.DOMINA_SIZE + " preguntas de toda la semana, sin vidas: con 85 % la ganás" +
            (st.domBest ? " · tu mejor intento: " + st.domBest + " %" : "") });
    return out;
  }

  function nextMission(w) {
    return weekPlan(w).filter(function (x) { return !x.done; })[0] || null;
  }

  /* The next week opens when every mission of this one is done, «Dominala»
     aside (that is the third star): the lesson, the words, the twenty right
     answers, the phrases, the reading, the lab and the bank of the week. */
  function pendingToAdvance(w) {
    if (w.boss) return weekStat(w.week).bossPassed ? [] : ["Vencé al jefe"];
    return weekPlan(w).filter(function (x) { return !x.done && x.kind !== "play2"; }).map(function (x) { return x.title; });
  }
  function tryAdvance(week) {
    var w = course.weeks[week - 1];
    if (!w || w.boss || week < state.unlocked || week >= 52) return false;
    if (pendingToAdvance(w).length) return false;
    state.unlocked = Math.min(52, week + 1);
    return true;
  }

  function goMission(kind, arg) {
    var w = course.weeks[view.week - 1];
    if (kind === "lez") startLezione(arg != null ? +arg : undefined);
    else if (kind === "vocab") startRound("vocab");
    else if (kind === "play") startRound(w.boss ? "boss" : "round");
    else if (kind === "play2") startRound("domina");
    else if (kind === "debil") startRound("debil");
    else if (kind === "scrivi") { view.screen = "scrivi"; render(); window.scrollTo(0, 0); }
    else if (kind === "scene" || kind === "ponte" || kind === "falsi" || kind === "capire" ||
             kind === "b-forme" || kind === "b-tr" || kind === "b-gap") startRound(kind, arg);
    else if (kind === "ep") { view.ep = arg; view.epFrom = "briefing"; view.screen = "lettura"; render(); window.scrollTo(0, 0); }
  }

  function missions(w, st, nChal) {
    var plan = weekPlan(w), doneN = plan.filter(function (x) { return x.done; }).length;
    var left = pendingToAdvance(w);
    var html = '<div class="card"><h2>Misiones ' + starsHtml(weekStars(w)) +
      ' <small class="muted">' + doneN + " / " + plan.length + "</small></h2>" +
      (w.boss ? (w.week < 52 ? '<p class="muted">⚔️ El jefe abre la semana ' + (w.week + 1) + ". Los repasos por tema y tus puntos débiles son opcionales: sirven para llegar preparado.</p>" : "")
        : w.week < 52 && state.unlocked <= w.week
        ? '<p class="muted">🔒 La semana ' + (w.week + 1) + " se abre al completar " + (left.length === 1 ? "esta misión" : "estas " + left.length + " misiones") +
          " (todas menos Dominala).</p>"
        : '<p class="muted">🔓 Semana ' + (w.week + 1) + " abierta.</p>") +
      "<div class=\"missions\">";
    plan.forEach(function (x, k) {
      html += '<button class="mission' + (x.done ? " done" : "") + (x.cls ? " " + x.cls : "") +
        '" data-m="' + x.kind + '"' + (x.arg ? ' data-arg="' + esc(x.arg) + '"' : "") + ">" +
        '<span class="mi">' + (x.done ? "★" : x.ico) + "</span><span><b>" + (k + 1) + ". " + x.title + "</b><small>" + x.sub + "</small></span>" +
        '<span class="go">›</span></button>';
    });
    html += "</div>";
    html += '<div class="row" style="margin-top:12px">' +
      (w.lesson ? '<button class="tab" id="teo">📄 Ver la teoría entera</button>' : "") +
      (w.boss ? "" : '<button class="tab" id="gym">🏋️ Gimnasio de verbos</button>') +
      (nChal ? '<button class="tab" id="chal">📖 Sfide del Maestro (' + nChal + ")</button>" : "") +
      "</div></div>";
    return html;
  }

  /* The week's words: listen to them, then a round that goes from
     recognising the meaning to writing the word. */
  function vocabCard(w) {
    if (!w.vocab || !w.vocab.length) return "";
    var seen = w.vocab.filter(function (v) { return state.cards["v:" + v[0]]; }).length;
    return '<div class="card"><h2>📚 Palabras de la semana <small class="muted">' + seen + " / " + w.vocab.length + "</small></h2>" +
      '<ul class="vocab">' + w.vocab.map(function (v) {
        return '<li><button class="say" data-say="' + esc(v[0]) + '" aria-label="Escuchar">🔊</button> <b>' + esc(v[0]) +
          "</b> <span>" + esc(v[1]) + "</span>" + (v[2] ? '<small><i>' + esc(v[2]) + "</i></small>" : "") + "</li>";
      }).join("") + "</ul>" +
      '<div class="row" style="margin-top:10px"><button class="btn" id="vocab">Practicar las palabras</button></div></div>';
  }

  function renderBriefing(w) {
    var st = weekStat(w.week);
    var refs = [];
    if (w.refs.dummies.length) {
      refs.push("<b>Italian Grammar For Dummies</b>, cap. " + w.refs.dummies.join(", "));
    }
    if (w.refs.routledge.length) {
      refs.push("<b>Soluzioni</b> (Routledge), cap. " + w.refs.routledge.join(", "));
    }

    var nChal = (w.challenges || []).length;

    return '<button class="btn ghost" id="back">← al percorso</button>' +
      '<h1 class="targa big"><span class="t-sup">Settimana ' + romano(w.week) + " · " + esc(w.level) +
        '</span><span class="t-via">' + esc(w.title) + "</span></h1>" +
      '<p class="lead">' + esc(w.focus) + '</p>' +
      (w.fare ? '<p class="fare">🎯 Al final de la semana: <b>' + esc(w.fare) + '</b>' +
        (w.tema ? ' <span class="muted">· ' + esc(w.tema) + '</span>' : '') + '</p>' : '') +
      missions(w, st, nChal) +
      vocabCard(w) +
      '<div class="card"><h2>Lo que se juega esta semana</h2>' +
        '<ul class="keys">' +
          w.keys.map(function (k) { return "<li>" + esc(k) + "</li>"; }).join("") +
        '</ul>' +
        (refs.length ? '<h3>Lectura de apoyo</h3><p class="refs">' + refs.join(" · ") + "</p>" : "") +
      '</div>';
  }

  /* ------------------------------------------------------------ allenamento */

  /* Lives are a gauge, not a wall: each error empties a heart so you see
     where the round went wrong, but you always play to the end (a round cut
     in half teaches nothing).  Phrase sessions have none: they are for flow. */
  var WITH_LIVES = { round: 1, boss: 1, gym: 1 };
  // Only these rounds count towards unlocking the next grammar week.
  var WEEK_KINDS = { round: 1, gym: 1, pausa: 1, vocab: 1, giorno: 1, debil: 1, domina: 1 };
  // Rounds whose answers count as the week's progress (review mixes weeks).
  var COUNT_KINDS = { round: 1, gym: 1, pausa: 1, boss: 1, vocab: 1, giorno: 1, debil: 1, domina: 1 };

  /* Le quattro corde di Nation (la guida): input, output, forma, fluidez. */
  function strandOf(it, kind) {
    if (kind === "lettura" || kind === "capire" || it.type === "listen" || it.type === "dictation") return "input";
    if (it.type === "write" || it.type === "translate" || it.type === "typed" || it.type === "fixerr" || kind === "b-tr") return "output";
    if (kind === "scene" || it.type === "flash") return "fluidez";
    return "forma";
  }
  function doneCount(w) { return weekPlan(w).filter(function (x) { return x.done; }).length; }

  function startRound(kind, arg) {
    var w = course.weeks[view.week - 1];
    var items;
    if (kind === "giorno") {
      w = course.weeks[Math.min(state.unlocked, 52) - 1];
      view.week = w.week;
      items = Drills.buildRound(course, w, { map: itemMap, state: state, silent: state.silent, size: 6, only: partItems(w) });
    }
    else if (kind === "boss") items = Drills.buildBoss(course, w, state, { map: itemMap });
    else if (kind === "debil") items = Drills.buildWeak(course, w, state, { map: itemMap, size: 15 });
    else if (kind === "domina") items = Drills.buildDomina(course, w, state, { map: itemMap, silent: state.silent });
    else if (kind === "review") items = Drills.buildReview(course, state, 20, drillOpts());
    else if (kind === "scene") items = Frasi.sceneSession(arg, state.cards, drillOpts());
    else if (kind === "pausa") {
      w = course.weeks[Math.min(state.unlocked, 52) - 1];
      view.week = w.week;
      // Grammar only from lessons already read: before lesson 1 the coffee
      // break is phrases and words, never «conjugá essere».
      var taught = null;
      for (var tw = Math.min(state.unlocked, 52); tw >= 1; tw--) {
        if (lessonRead(tw)) { taught = course.weeks[tw - 1]; break; }
      }
      items = Drills.buildPausa(course, state, taught, drillOpts());
      if (Banca.loaded() && taught && taught.week >= 2) {
        var bi = Banca.pausaItem(state);
        if (bi) items.splice(Math.min(5, items.length), 0, bi);
      }
    } else if (kind === "gym") {
      items = [];
      for (var i = 0; i < 15; i++) {
        var v = w.verbs[Math.floor(Math.random() * w.verbs.length)];
        var t = w.tenses[Math.floor(Math.random() * w.tenses.length)];
        try {
          items.push(i % 3 === 0 ? Drills.conjugationDrill(v, t, w.known, w.persons)
                                 : Drills.conjugationTyped(v, t, w.persons));
        } catch (e) { /* salta */ }
      }
      items = Drills.firstRecognize(items, state, w.week);
    } else if (kind === "vocab") items = Drills.withWordIntros(Drills.vocabSession(course, w, state, 14), state);
    else if (kind === "ponte") items = Lab.ponteSession(state.cards, arg);
    else if (kind === "falsi") items = Lab.falsiSession(state.cards);
    else if (kind === "capire") items = Lab.capireSession(state.cards, arg, state.unlocked);
    else if (kind === "lettura") items = Letture.session(Letture.byId(arg));
    else if (kind === "b-voc") items = Banca.vocabSession(state, 12);
    else if (kind === "b-forme") items = Banca.formsSession(state, 12);
    else if (kind === "b-tr") items = Banca.translateSession(state, 8);
    else if (kind === "b-gap") items = Banca.gapSession(state, 10);
    else if (kind === "b-err") items = Banca.errorSession(state, 8);
    else if (kind === "clinica") items = Banca.clinicaSession(state, 12);
    else if (kind === "sfida") {
      var ch = course.challenges.filter(function (c) { return c.id === arg; })[0];
      items = ch && ch.play ? ch.play.map(function (id) { return itemMap[id]; }).filter(Boolean) : [];
      items = Drills.firstRecognize(items, state, w.week);
    }
    else items = Drills.buildRound(course, w, { map: itemMap, state: state, silent: state.silent, only: partItems(w) });

    if (!items.length) { toast("No hay preguntas para este modo todavía."); return; }

    round = {
      kind: kind,
      arg: arg,
      // A round that starts from the week (its briefing, its sfide, its
      // lesson's «A entrenar», a reading opened from it) goes back to the week.
      from: view.screen === "briefing" || view.screen === "sfide" || view.screen === "lezione" ||
            (view.screen === "lettura" && view.epFrom === "briefing") ? "briefing" : null,
      items: items,
      i: 0,
      right: 0,
      close: 0,
      wrong: 0,
      combo: 0,
      bestCombo: 0,
      lives: kind === "boss" ? 3 : WITH_LIVES[kind] ? 5 : Infinity,
      maxLives: kind === "boss" ? 3 : 5,
      xp: 0,
      answered: false,
      picked: [],
      again: {},
      tried: false,
      log: [],
      fixed: 0,
      week: view.week,
      planDone: doneCount(course.weeks[view.week - 1]),
      // A chest ticket or the daily challenge: double xp for this round.
      boost: kind === "giorno" || (state.boost > 0 && kind !== "review" && kind !== "pausa")
    };
    if (round.boost && kind !== "giorno") { state.boost--; persist(); renderHeader(); }
    view.screen = "gioco";
    render();
    savePending();
  }

  function currentItem() { return round.items[round.i]; }

  function hud() {
    var hearts = "";
    if (round.lives !== Infinity) {
      for (var i = 0; i < round.maxLives; i++) hearts += i < round.lives ? "❤️" : "🤍";
      // Past zero you keep playing; the hearts just stay empty.
    }
    return '<div class="hud">' +
        (hearts ? '<span class="hearts">' + hearts + "</span>" : "") +
        // Drawn at the previous step and grown after paint, so it visibly advances.
        '<span class="progressline"><i style="width:' +
          Math.round(Math.max(0, round.i - 1) / round.items.length * 100) + '%" data-to="' +
          Math.round(round.i / round.items.length * 100) + '"></i></span>' +
        "<span class=\"muted\">" + (round.i + 1) + "/" + round.items.length + "</span>" +
        (round.combo > 1 ? '<span class="combo pop">🔥×' + round.combo + "</span>" : "") +
        '<button class="btn ghost" id="quit">✕</button>' +
      "</div>";
  }

  function renderGioco() {
    var it = currentItem();
    if (!it) return "";
    stemGloss = [];
    // Several blanks: numbered, answered in order («a / b»).
    var gaps = (String(it.stem || "").match(/_{3,}/g) || []).length;
    var multi = gaps > 1 && /\|/.test(it.answer || "");
    var gi = 0;
    var body = "", stem = /^\s*_+\s*$/.test(it.stem || "") ? ""
      : glossify(it, it.stem).replace(/_{3,}/g, function () {
        return multi ? '<span class="gap n">' + (++gi) + "</span>" : '<span class="gap">&nbsp;</span>';
      });
    var prompt = (it.retry ? '<div class="badge-new">🔁 Segunda vez, más fácil</div>' : "") +
      '<div class="prompt">' + esc(it.prompt || "") + "</div>" +
      (it.retry && it.note && !it.recog ? '<div class="note">📐 ' + mk(it.note) + "</div>" : "");

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

    if (it.type === "word") {
      var wv = it.word;
      return hud() + '<div class="card intro">' +
        '<div class="badge-new">📚 Palabra nueva</div>' +
        '<div class="fit big">' + esc(wv[0]) + "</div>" +
        '<div class="fes">' + esc(wv[1]) + "</div>" +
        (wv[2] ? '<div class="note">' + esc(wv[2]) + "</div>" : "") +
        '<div class="row" style="margin-top:14px"><button class="btn ghost" id="sayit">🔊 Escuchar</button></div>' +
        '<p class="muted">Decila en voz alta: en un rato te pregunto qué significa.</p>' +
        '<button class="btn wide" id="next">La tengo →</button>' +
        "</div>";
    }

    if (it.type === "card") {
      return hud() + '<div class="card intro">' +
        '<div class="badge-new">📐 ' + esc(it.prompt) + "</div>" +
        "<h2>" + mk(it.h) + "</h2><p>" + mk(it.body) + "</p>" +
        (it.ex && it.ex.length ? '<ul class="exs">' + it.ex.map(function (e) {
          return '<li><span class="es">' + esc(e[0]) + '</span><span class="it">→ ' +
            esc(e[1]) + "</span></li>";
        }).join("") + "</ul>" : "") +
        '<button class="btn wide" id="next">Entendido →</button></div>';
    }

    if (it.type === "fixerr") {
      return hud() + '<div class="card">' +
        '<div class="prompt">' + esc(it.prompt) + "</div>" +
        '<div class="text hunt fixerr">' + it.stem.split(/\s+/).map(function (t, k) {
          return '<span class="w" data-ft="' + k + '">' + esc(t) + "</span>";
        }).join(" ") + "</div>" +
        '<div id="fixbox"></div><div id="fb"></div></div>';
    }

    if (it.type === "hunt") {
      var ep = Letture.byId(it.ep);
      return hud() + '<div class="card">' +
        '<div class="prompt">' + esc(it.prompt) + "</div>" +
        '<div class="stem">' + esc(it.stem) + "</div>" +
        renderText(ep, "hunt") +
        '<div class="row"><button class="btn" id="hcheck">Controlla</button>' +
        '<span class="muted" id="hcount" style="align-self:center">0 marcadas</span></div>' +
        '<div id="fb"></div></div>';
    }

    if (it.type === "guess" || (it.type === "choice" && it.options)) {
      body = '<div class="options">' + it.options.map(function (o, k) {
        return '<button class="opt" data-opt="' + k + '">' + esc(o) + "</button>";
      }).join("") + "</div>";
      if (it.withText) {
        body = '<button class="tab" id="showtext">📄 ver el texto</button>' +
          '<div id="qtext" hidden>' + renderText(Letture.byId(it.ep), "read") + "</div>" + body;
      }
    } else if (it.type === "dictation") {
      body = '<div class="center"><button class="bigplay" id="play1">🔊</button>' +
        '<div><button class="tab" id="slow">🐢 más lento</button></div></div>' +
        '<div class="typed">' +
        '<textarea id="wans" class="grow" rows="1" autocomplete="off" autocapitalize="sentences" ' +
        'autocorrect="off" spellcheck="false" enterkeyhint="send" placeholder="lo que escuchás…"></textarea>' +
        '<button class="btn" id="wsend">Controlla</button></div>';
      stem = "";
    } else if (it.type === "tiles") {
      body = '<div class="tiles-answer" id="tans"></div>' +
        '<div class="tiles-bank" id="tbank"></div>' +
        '<div class="row" style="margin-top:12px">' +
          '<button class="btn" id="tcheck">Controlla</button>' +
          '<button class="btn ghost" id="tclear">Borrar</button></div>';
    } else if (it.type === "listen") {
      body = '<div class="center"><button class="bigplay" id="play1">🔊</button>' +
        '<div><button class="tab" id="slow">🐢 más lento</button>' +
        // listening to tell sounds apart: the text would give it away
        (it.nopeek ? "</div>" : '<button class="tab" id="peek">👀 ver texto</button></div>' +
        '<div class="peek" id="peektxt" hidden>' + esc(it.stem) + "</div>") + "</div>" +
        '<div class="options">' + it.options.map(function (o, k) {
          return '<button class="opt" data-opt="' + k + '">' + esc(o) + "</button>";
        }).join("") + "</div>";
      stem = "";
    } else if (it.type === "write") {
      body = '<div class="typed">' +
        '<textarea id="wans" class="grow" rows="1" autocomplete="off" autocapitalize="sentences" ' +
        'autocorrect="off" spellcheck="false" enterkeyhint="send" placeholder="in italiano…"></textarea>' +
        '<button class="btn" id="wsend">Controlla</button></div>' +
        '<div class="row" style="margin-top:8px">' +
          '<button class="tab" id="hint">💡 pista</button>' +
          '<button class="tab" id="easier">🧩 dame fichas</button></div>' +
        '<div class="peek" id="hinttxt" hidden></div>';
    } else if (it.type === "flash") {
      body = '<div id="flash"><button class="btn wide" id="reveal">Mostrar respuesta</button></div>';
    } else if (it.type === "choice" || it.type === "guess") {
      /* handled above */
    } else {
      body = '<div class="typed">' +
        '<textarea id="ans" class="grow" rows="1" autocomplete="off" autocapitalize="off" ' +
        'autocorrect="off" spellcheck="false" enterkeyhint="send" placeholder="' +
          (multi ? "las " + gaps + " respuestas en orden: 1 / 2" + (gaps > 2 ? " / 3" : "")
                 : it.type === "translate" ? "in italiano…" : "tu respuesta…") + '"></textarea>' +
        '<div class="accents">' +
          ["à", "è", "é", "ì", "ò", "ù", "'"].map(function (c) {
            return '<button data-ins="' + c + '">' + c + "</button>";
          }).join("") +
        "</div>" +
        '<button class="btn" id="send">Controlla</button></div>';
    }

    var sayBtn = it.src === "frasi" || it.src === "lettura" || it.src === "lab" ? "" :
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

  var GENERIC = { lessico: 1, parola_mancante: 1, parola_in_piu: 1, refuso: 1, vuoto: 1 };
  var LEXICAL = { lessico: 1, parola_spagnola: 1, falso_amico: 1, vuoto: 1 };

  // Multiple choice: say why *that* option is wrong (Shute 2008).
  function answer(given) {
    if (round.answered) return;
    var it = currentItem();
    var verdict = Engine.grade(given, it);
    if (verdict === Engine.VERDICT.RIGHT || !window.Diagnosi) { settle(verdict, given); return; }
    var cd = it.choiceDiag || { before: "", after: "" };
    var d = Diagnosi.explainChoice(cd.before + given + cd.after, cd.before + it.answer + cd.after,
                                   it.choiceDiag ? {} : { stem: it.stem, nominal: it.type === "plural" || /plural/i.test(it.prompt || "") });
    // Only when the options are Italian: diagnosing a Spanish gloss as if it
    // were Italian would be nonsense.
    // Spanish glosses (the week's words, the bank) are never diagnosed as
    // Italian, and picking another whole sentence is not a word-level error.
    var italianOptions = (it.choiceDiag || it.src === "coniugatore" ||
      (it.src !== "banca" && it.src !== "lab" && it.src !== "lettura" && it.src !== "frasi" && it.src !== "vocab") ||
      (it.src === "frasi" && it.type === "choice")) && !(it.recog && it.orig === "translate");
    var useful = italianOptions && d && d.cat && !GENERIC[d.cat];
    if (useful) recordError(d, given);
    settle(verdict, given, useful ? diagHtml(d, false) : "");
  }

  /* -------------------------------------------- produzione e correzione */

  /* Written answers get a diagnosis.  A rule error on the first attempt
     earns a prompt, not the answer: the learner corrects it (Lyster & Ranta
     1997; Lyster & Saito 2010).  Slips (accents, typos) are just flagged. */
  function produce(given) {
    if (round.answered) return;
    var it = currentItem();
    // Several blanks typed as «a / b» (or a | b): same as a b.
    if (/\|/.test(it.answer || "")) given = String(given).replace(/\s*[\/|]\s*/g, " ");
    if (!String(given || "").trim()) return;
    var accept = (it.accept && it.accept.length ? it.accept : [it.answer]).map(function (x) {
      return String(x).replace(/\s*\|\s*/g, " ");   // two blanks: typed one after the other
    });
    var diagCtx = { stem: it.stem, prompt: it.prompt, nominal: it.type === "plural" || /plural/i.test(it.prompt || "") };
    var d = window.Diagnosi ? Diagnosi.diagnose(given, accept, diagCtx) : { verdict: "sbagliato" };
    round.lastDiag = d;
    // The whole answer in Spanish: a hint about one word is useless.
    var esText = it.frase ? it.frase.es : it.type === "translate" ? it.stem : "";
    if (d.hint && esText) {
      var esW = Engine.normalise(esText).split(/\s+/), gW = Engine.normalise(given).split(/\s+/);
      var inEs = gW.filter(function (w) { return w.length > 1 && esW.indexOf(w) >= 0; }).length;
      if (gW.length >= 2 && inEs * 2 >= gW.length) {
        d.hint = "Eso está en español. Escribila en italiano; si todavía no la sabés, pedí las fichas 🧩.";
      }
    }
    // The old graders forgive a letter or two; the diagnosis knows whether
    // those letters were a typo or grammar (a il / al, la / il lunedì).
    // A rule error always wins over typo tolerance.
    var v1 = it.frase && (it.type === "write" || it.type === "dictation")
      ? Frasi.gradeWritten(given, it.answer).verdict : Engine.grade(given, it);
    var verdict = v1 === "giusto" || d.verdict === "giusto" ? "giusto"
                : d.verdict === "sbagliato" && d.cat ? "sbagliato"
                : v1 === "quasi" || d.verdict === "quasi" ? "quasi" : "sbagliato";
    // Phrase drills stay lenient on accents only.
    if (it.frase && verdict === "sbagliato" && d.all && d.all.every(function (c) { return c === "accento" || c === "refuso"; })) {
      verdict = "quasi";
    }
    if (verdict === "giusto") {
      if (round.tried) {
        markFixed(round.firstCat);
        settle("quasi", given, '<div class="note selfrepair">🎯 ¡Lo corregiste vos! Autocorregirse es lo que más fija.</div>',
               { label: "¡Eso es!", fixed: true });
      } else {
        if (it.frase && it.type === "write") state.written = (state.written || 0) + 1;
        settle("giusto", given);
      }
      return;
    }
    // The same text again within a moment is a double tap, not a second
    // attempt; sent again later, it is a deliberate "I think I'm right".
    if (round.tried && String(given).trim() === round.lastGiven && Date.now() - round.promptAt < 1500) {
      var inp0 = $("#ans") || $("#wans");
      if (inp0) { inp0.classList.remove("shake"); void inp0.offsetWidth; inp0.classList.add("shake"); inp0.focus(); }
      return;
    }
    if (verdict === "sbagliato" && !round.tried && round.kind !== "boss" && d.hint && d.cat !== "vuoto") {
      round.tried = true;
      round.lastGiven = String(given).trim();
      round.promptAt = Date.now();
      round.firstCat = d.cat;
      recordError(d, given);
      showPrompt(d);
      return;
    }
    if (!round.tried && d.cat) recordError(d, given);
    settle(verdict, given, d.cat ? diagHtml(d, true) : "");
  }

  function tokHtml(list, cls) {
    return list.map(function (t) {
      return t[cls] ? '<b class="' + cls + '">' + esc(t.w) + "</b>" : esc(t.w);
    }).join(" ");
  }

  function diagHtml(d, withDiff) {
    var diff = withDiff && d.given && d.given.length <= 24
      ? '<div class="diff"><span class="k">vos</span> ' + tokHtml(d.given, "bad") +
        '<br><span class="k">bien</span> ' + tokHtml(d.fixed, "fix") + "</div>" : "";
    return '<div class="diag"><span class="tag">' + esc(d.label || "") + "</span>" + diff +
      "<p>" + mk(d.explain || "") + "</p>" +
      (d.all && d.all.length > 1 ? (function () {
        var seen = {}, rest = d.all.slice(1).filter(function (c) { if (seen[c] || c === d.cat) return false; seen[c] = 1; return true; });
        return rest.length ? '<div class="muted">También: ' + rest.map(function (c) { return esc(Diagnosi.LABEL[c] || c); }).join(", ") + "</div>" : "";
      })() : "") +
      "</div>";
  }

  function showPrompt(d) {
    fx.close();
    // The word(s) to fix, with the first letter showing: c_me.
    var masked = (d.fixed || []).filter(function (t) { return t.fix; }).map(function (t) {
      return t.w.charAt(0) + t.w.slice(1).replace(/[^' ]/g, "_");
    }).join(" ");
    $("#fb").innerHTML = '<div class="feedback prompt">' +
      '<div class="verdict">🔎 Casi. Revisalo:</div>' +
      (d.given && d.given.length <= 24 ? '<div class="diff">' + tokHtml(d.given, "bad") + "</div>" : "") +
      "<p>" + mk(d.hint) + "</p>" +
      '<div class="row">' + (masked ? '<button class="tab" id="morehint">💡 más pista</button>' : "") +
      '<button class="tab" id="giveup">Ver la respuesta</button></div></div>';
    on("#giveup", function () { settle("sbagliato", "", diagHtml(d, true)); });
    on("#morehint", function () {
      var b = $("#morehint");
      if (b) b.outerHTML = '<span class="muted" style="align-self:center">' + esc(masked) + "</span>";
      var inp = $("#ans") || $("#wans");
      if (inp) inp.focus();
    });
    var input = $("#ans") || $("#wans");
    if (input) { input.focus(); input.select && input.select(); }
  }

  function recordError(d, given) {
    if (!d || !d.cat || { refuso: 1, soggetto: 1, vuoto: 1 }[d.cat]) return;
    if (!state.errs) state.errs = {};
    if (!state.errLog) state.errLog = [];
    var e = state.errs[d.cat] || (state.errs[d.cat] = { n: 0, fixed: 0, last: 0 });
    e.n++;
    e.last = Date.now();
    state.errLog.unshift({ cat: d.cat, g: String(given).slice(0, 80), e: String(d.target || "").slice(0, 80), at: Date.now() });
    state.errLog = state.errLog.slice(0, 60);
    persist();
  }

  function markFixed(cat) {
    if (!cat || !state.errs || !state.errs[cat]) return;
    state.errs[cat].fixed = (state.errs[cat].fixed || 0) + 1;
  }

  // Record a verdict: SRS, stats, xp, feedback panel.
  function settle(verdict, given, extra, opts) {
    if (round.answered) return;
    opts = opts || {};
    var it = currentItem();
    round.answered = true;
    if (opts.fixed) round.fixed = (round.fixed || 0) + 1;

    var q = verdict === Engine.VERDICT.RIGHT ? 2
          : verdict === Engine.VERDICT.CLOSE ? 1 : 0;

    // A guess before learning is never an error: it only primes the memory.
    if (it.type === "guess") return settleGuess(it, q, given);

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
    if (it.retry) gained = Math.ceil(gained / 2);     // the easier second pass pays half
    if (state.streak >= 7) gained = Math.round(gained * 1.2);   // a week of streak pays more
    if (round.boost) gained *= 2;
    round.xp += gained;
    Engine.addStrand(state, strandOf(it, round.kind), gained);
    round.log.push({ id: it.id, verdict: verdict, given: given, answer: it.answer, retry: !!it.retry,
                     es: it.frase ? it.frase.es : "", stem: it.stem || "", prompt: it.prompt || "" });

    // SRS only tracks the fixed bank and the phrases; generated conjugation
    // drills are endless by design, so they are not scheduled as cards.
    // Right at first sight in the training: a light card (back in two
    // weeks), so the review queue holds errors, phrases and words, not
    // every exercise ever seen.
    if (it.src !== "coniugatore" && it.src !== "lettura") {
      var light = !it.frase && it.src !== "vocab" && it.src !== "lab" && it.src !== "banca" && !it.retry &&
                  (round.kind === "round" || round.kind === "sfida" || round.kind === "giorno" || round.kind === "boss" || round.kind === "domina");
      // The diagnosis says what kind of mistake it was (a slip, a word, a rule).
      var dg = round.lastDiag; round.lastDiag = null;
      var ekind = q === 1 && (!dg || dg.slip) ? "slip"
        : q === 0 && dg && LEXICAL[dg.cat] ? "vocab" : q === 0 ? "rule" : null;
      state.cards[it.id] = Engine.schedule(state.cards[it.id], q, { light: light, kind: ekind });
    }

    /* Successive relearning (Rawson & Dunlosky 2011): what you miss comes
       back later in the same session, until you get it (at most twice). */
    var relearn = "";
    if (q < 2 && round.kind !== "boss" && it.src !== "lettura" && !it.retry && !(round.again[it.id])) {
      round.again[it.id] = 1;
      var at = Math.min(round.items.length, round.i + 3);
      round.items.splice(at, 0, retryVersion(it));
      relearn = '<div class="note">🔁 Te la vuelvo a preguntar en un rato, más fácil.</div>';
    }

    state.totals.attempts++;
    if (q === 2) state.totals.right++;
    else if (q === 1) state.totals.close++;
    else state.totals.wrong++;

    // Only the week's own exercises count towards its stars: not the gym,
    // not the words (that is how a week got «mastered» after seeing 7 items).
    if (!it.frase && it.src !== "lab" && it.src !== "lettura" && it.src !== "banca" &&
        it.src !== "coniugatore" && it.src !== "vocab" && COUNT_KINDS[round.kind]) {
      var ws = state.weekStats[view.week] ||
        (state.weekStats[view.week] = { attempts: 0, right: 0, bossPassed: false });
      ws.attempts++;
      if (q === 2) ws.right++;
      // What you fixed yourself counts as learnt here too (Metcalfe 2017).
      ws.last = (ws.last || []).concat([q === 2 || opts.fixed ? 1 : 0]).slice(-30);
    }

    gain(gained);
    persist();
    renderHeader();
    if (gained) xpFly(gained);

    var label = opts.label || { giusto: pick(["¡Perfetto!", "¡Bravo!", "¡Esatto!", "¡Grande!", "¡Benissimo!"]),
                  quasi: "Quasi…", sbagliato: "No, era así:" }[verdict];
    var sol = it.type === "listen" && it.frase ? it.frase.it + " — " + it.answer
            : it.frase ? it.frase.it : it.answer;
    var fb = '<div class="feedback ' + verdict + '">' +
      '<div class="verdict">' + label +
        (gained ? ' <span class="xpgain">+' + gained + " xp</span>" : "") + "</div>" +
      (extra || "") +
      (it.type === "hunt" ? "" : '<div class="sol">' + (it.frase || it.src === "lettura" ? esc(sol) : glossifyAny(sol)) + "</div>") +
      (it.frase && it.type !== "listen" ? '<div class="note">' + esc(it.frase.es) + "</div>" : "") +
      (it.note ? '<div class="note">' + mk(it.note) + "</div>" : "") +
      (q === 2 && it.recogNote ? '<div class="note">' + esc(it.recogNote) + "</div>" : "") +
      (it.hint && it.src === "dummies"
        ? '<div class="note">Consigna original: ' + esc(it.hint) + "</div>" : "") +
      relearn +
      '<div class="row" style="margin-top:10px">' +
        '<button class="btn" id="next">Continuar →</button>' +
        '<button class="tab" id="say2">🔊 escuchar</button>' +
        (q < 2 && aiKey() && window.Scrivi && it.type !== "hunt" ? '<button class="tab" id="aiexp">🤖 Explicame</button>' : "") +
      '</div><div id="aiexpout"></div></div>';

    $("#fb").innerHTML = fb;
    $("#fb").querySelectorAll("[data-sg]").forEach(function (b) {
      b.onclick = function (e) { e.stopPropagation(); showGloss(stemGloss[+b.dataset.sg]); };
    });
    // Reading: after a miss, the text opens so the answer can be found in it.
    var qt = $("#qtext");
    if (qt && q < 2) qt.hidden = false;

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
    ["#tcheck", "#tclear", "#wsend", "#wans", "#easier", "#reveal", "#hcheck", "#send", "#fxsend", "#fxdel", "#fxin"].forEach(function (s) {
      var b = $(s); if (b) b.disabled = true;
    });
    if (it.type === "tiles") drawTiles();

    var spoken = it.frase ? it.frase.it : it.src === "lettura" ? "" : it.answer;
    // False friends and structured input: read the Italian prompt aloud.
    if (it.lab === "falsi" || it.lab === "capire") spoken = it.stem;
    $("#next").onclick = nextItem;
    on("#aiexp", function () {
      var b = $("#aiexp"), outE = $("#aiexpout");
      if (b) b.disabled = true;
      if (outE) outE.innerHTML = '<p class="muted small">⏳ Preguntándole a la IA…</p>';
      var fbText = ($("#fb") || {}).innerText || "";
      var x = { prompt: it.prompt, stem: it.stem, options: it.options, given: given, answer: sol,
                accept: it.accept, feedback: fbText.split("Continuar")[0].replace(/\s+/g, " ").slice(0, 600) };
      Scrivi.explain(x, aiKey(), function (err, data) {
        var o = $("#aiexpout");
        if (!o) return;
        if (err) { o.innerHTML = '<p class="muted small">No pude usar la IA (' + esc(String(err.message || err)) + ").</p>"; if (b) b.disabled = false; return; }
        var dispute = data && (data.tambien_correcta || data.app_equivocada);
        if (dispute) {
          // Kept for review: the learner does not have to explain it to anyone.
          if (!state.aiNotes) state.aiNotes = [];
          state.aiNotes.unshift({ id: it.id, prompt: it.prompt, stem: it.stem, given: given, answer: sol,
                                  ai: String(data.explicacion || "").slice(0, 600), at: Date.now() });
          state.aiNotes = state.aiNotes.slice(0, 80);
          persist();
        }
        o.innerHTML = '<div class="aiout"><p>🤖 ' + mk(esc(String((data && data.explicacion) || ""))) + "</p>" +
          (dispute ? '<p class="muted small">La IA cree que ' + (data.tambien_correcta ? "tu respuesta también vale" : "la corrección de la app no es buena") +
             ". Quedó anotado en Io → «Correcciones para revisar».</p>" : "") + "</div>";
      });
    });
    $("#say2").onclick = function () { speak(spoken, true); };
    if (q === 2 || it.frase) speak(spoken);
    $("#fb").scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  /* The second time comes in another shape: two options with the rule in
     sight, or a recognition version of what had to be typed, or the phrase
     with tiles.  Never the same screen again (audit 2.1). */
  function retryVersion(it) {
    var copy;
    if (it.frase) copy = Frasi.pickItem(it.frase, { silent: state.silent, fresh: true });
    else if (it.options && it.options.length > 2) {
      var wrong = Drills.shuffle(it.options.filter(function (o) {
        return Engine.normalise(o) !== Engine.normalise(it.answer);
      }));
      copy = Object.assign({}, it, { options: Drills.shuffle([it.answer, wrong[0]]) });
    } else if (!it.options) {
      copy = Drills.recognitionOf(it, round.items, view.week) || Object.assign({}, it);
    } else copy = Object.assign({}, it, { options: Drills.shuffle(it.options) });
    copy.retry = true;
    return copy;
  }

  function settleGuess(it, q, given) {
    var gained = q === 2 ? 5 : 2;
    round.xp += gained;
    gain(gained);
    persist();
    renderHeader();
    if (q === 2) fx.right(); else fx.tap();
    $("#fb").innerHTML = '<div class="feedback ' + (q === 2 ? "giusto" : "quasi") + '">' +
      '<div class="verdict">' + (q === 2 ? "¡Buen olfato!" : "Era esta. Ahora ya la conocés.") +
        ' <span class="xpgain">+' + gained + " xp</span></div>" +
      '<div class="sol">' + esc(it.answer) + "</div>" +
      (it.note ? '<div class="note">' + mk(it.note) + "</div>" : "") +
      '<div class="note">🔬 Intentar adivinar antes de aprender ayuda a recordar, ' +
        "aunque te equivoques (efecto de la prueba previa).</div>" +
      '<div class="row" style="margin-top:10px"><button class="btn" id="next">Continuar →</button></div></div>';
    document.querySelectorAll(".opt").forEach(function (o) {
      o.disabled = true;
      if (o.textContent === it.answer) o.classList.add("right");
      else if (o.textContent === given) o.classList.add("wrong");
    });
    $("#next").onclick = nextItem;
  }

  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }

  /* A distracted learner closes the app mid-round: the round is kept in
     localStorage and Oggi offers to pick it up where it was. */
  var PENDING_KEY = "laviac1.pending.v1";
  function savePending() {
    try {
      var p = null;
      if (view.screen === "gioco" && round && round.i < round.items.length) {
        p = { type: "round", week: view.week, tab: view.tab, at: Date.now(),
              round: { kind: round.kind, arg: round.arg, from: round.from, items: round.items, i: round.i,
                       right: round.right, close: round.close, wrong: round.wrong, fixed: round.fixed || 0,
                       combo: round.combo, bestCombo: round.bestCombo,
                       lives: round.lives === Infinity ? null : round.lives, maxLives: round.maxLives,
                       xp: round.xp, again: round.again, log: round.log } };
      } else if (view.screen === "lezione" && les && les.i < les.steps.length) {
        p = { type: "lezione", week: les.w.week, part: les.part, at: Date.now(), steps: les.steps, i: les.i, right: les.right, asked: les.asked };
      }
      if (p) localStorage.setItem(PENDING_KEY, JSON.stringify(p));
      else localStorage.removeItem(PENDING_KEY);
    } catch (e) { /* niente */ }
  }
  function clearPending() { try { localStorage.removeItem(PENDING_KEY); } catch (e) { /* */ } }
  function loadPending() {
    try {
      var p = JSON.parse(localStorage.getItem(PENDING_KEY) || "null");
      if (!p || !p.at || Date.now() - p.at > 2 * 86400000) return null;
      if (p.type === "round" && !(p.round && p.round.items && p.round.items.length)) return null;
      if (p.type === "lezione" && !(p.steps && course.weeks[p.week - 1] && course.weeks[p.week - 1].lesson)) return null;
      return p;
    } catch (e) { return null; }
  }
  var KIND_NAME = { debil: "Puntos débiles", domina: "Dominala", round: "Entrenamiento", giorno: "Sfida del giorno", boss: "Jefe", gym: "Gimnasio de verbos", pausa: "Pausa caffè", review: "Ripasso",
                    scene: "Frases", vocab: "Palabras de la semana", lettura: "Lectura", sfida: "Sfida", ponte: "Ponte",
                    falsi: "Falsi amici", capire: "Capire", "b-voc": "Parole", "b-tr": "Traduci", "b-gap": "Coniuga in contesto",
                    "b-forme": "Forme", "b-err": "Trova l'errore", clinica: "Clínica" };
  function pendingTitle(p) {
    if (p.type === "lezione") return "Lección · semana " + p.week + " · " + (p.i + 1) + "/" + p.steps.length;
    return (KIND_NAME[p.round.kind] || "Ronda") + " · " + (p.round.i + 1) + "/" + p.round.items.length;
  }
  function resumePending() {
    var p = loadPending();
    if (!p) return;
    if (p.type === "round") {
      round = Object.assign({ answered: false, picked: [], tried: false, lastGiven: null, firstCat: null }, p.round);
      if (round.lives === null) round.lives = Infinity;
      view.week = p.week; view.tab = p.tab || "oggi"; view.screen = "gioco";
    } else {
      les = { w: course.weeks[p.week - 1], part: p.part == null ? null : p.part, steps: p.steps, i: p.i, right: p.right, asked: p.asked, answered: false };
      view.week = p.week; view.tab = "percorso"; view.screen = "lezione";
    }
    render();
    window.scrollTo(0, 0);
  }

  function nextItem() {
    round.i++;
    round.answered = false;
    round.tried = false;
    round.lastGiven = null;
    round.firstCat = null;
    round.picked = [];
    if (round.i >= round.items.length) {
      finishRound();
      return;
    }
    render();
    savePending();
    window.scrollTo(0, 0);
  }

  function finishRound() {
    var total = round.right + round.close + round.wrong;
    // What you fixed yourself counts as learnt (Metcalfe 2017).
    var pct = total ? Math.round((round.right + (round.fixed || 0)) / total * 100) : 0;
    var w = course.weeks[view.week - 1];

    clearPending();
    Engine.touchStreak(state);
    if (!state.best) state.best = {};
    state.best.combo = Math.max(state.best.combo || 0, round.bestCombo);

    var passed = false;
    if (round.kind === "boss") {
      passed = pct >= 85;
      var ws = state.weekStats[view.week] ||
        (state.weekStats[view.week] = { attempts: 0, right: 0, bossPassed: false });
      if (passed) {
        ws.bossPassed = true;
        if (round.wrong === 0) ws.perfect = true;
        gain(Engine.XP.boss);
        if (view.week >= state.unlocked) state.unlocked = Math.min(52, view.week + 1);
      }
    }
    // (the next week opens from missionCheck, once every mission is done)

    if (round.kind === "debil") { if (!state.weakDone) state.weakDone = {}; state.weakDone[view.week] = true; }

    // Dominala: the first answer to each question counts (the second, easier
    // pass after a miss is for learning, not for the score).
    var domExtra = null;
    if (round.kind === "domina") {
      var firsts = round.log.filter(function (x) { return !x.retry; });
      var okN = firsts.filter(function (x) { return x.verdict === Engine.VERDICT.RIGHT || x.verdict === Engine.VERDICT.CLOSE; }).length;
      var dp = firsts.length ? Math.round(okN / firsts.length * 100) : 0;
      var dws = state.weekStats[view.week] || (state.weekStats[view.week] = { attempts: 0, right: 0, bossPassed: false });
      dws.domBest = Math.max(dws.domBest || 0, dp);
      if (dp >= 85 && firsts.length >= Math.min(20, round.items.length)) {
        if (!dws.dominated) gain(60);
        dws.dominated = true; dws.domPct = Math.max(dws.domPct || 0, dp);
        domExtra = "🏆 ¡Semana dominada! " + dp + " % en " + firsts.length + " preguntas";
      } else domExtra = "🏆 Dominala: " + dp + " % (hace falta 85 %). Tu mejor intento: " + dws.domBest + " %.";
    }

    if (round.kind === "sfida") {
      var prevS = state.challengeLog[round.arg];
      state.challengeLog[round.arg] = { q: pct >= 80 ? 2 : pct >= 50 ? 1 : 0,
        pct: Math.max(pct, prevS && prevS.pct || 0), at: Date.now() };
      if (!prevS) gain(Engine.XP.challenge);
    }

    if (round.kind === "lettura") {
      if (!state.letture) state.letture = {};
      var prev = state.letture[round.arg];
      state.letture[round.arg] = { pct: Math.max(pct, prev ? prev.pct : 0), at: Date.now() };
      if (!prev) gain(20);
    }

    var extras = [];
    if (round.kind === "giorno") {
      state.dailyDone = Engine.dayKey();
      if (pct >= 80) { state.dailyWon = (state.dailyWon || 0) + 1; extras.push("🎯 Sfida del giorno ganada · " + state.dailyWon + " en total"); }
    }
    if (total >= 5 && state.firstRound !== Engine.dayKey()) {
      state.firstRound = Engine.dayKey();
      gain(25);
      extras.push("☀️ Primera ronda del día: +25 xp");
    }
    if (domExtra) extras.push(domExtra);
    extras = extras.concat(missionCheck(round.week, round.planDone));

    var won = Engine.checkBadges(state);
    persist();
    renderHeader();

    view.screen = "risultato";
    view.result = { pct: pct, passed: passed, won: won, extras: extras };
    if (pct >= 80 && total >= 5) setTimeout(confetti, 150);
    render();
  }

  /* A mission just closed, or the whole week: say so, loudly. */
  function missionCheck(week, before) {
    var w = course.weeks[week - 1];
    if (!w) return [];
    var plan = weekPlan(w), now = plan.filter(function (x) { return x.done; }).length, out = [];
    if (now > (before || 0)) {
      fx.goal();
      out.push("★ Misión completada · " + now + " / " + plan.length + " de la semana " + w.week);
    }
    var before2 = state.unlocked;
    if (tryAdvance(w.week) && state.unlocked > before2) {
      out.push("🔓 ¡Semana " + state.unlocked + " abierta!");
    } else if (w.week === state.unlocked && !w.boss) {
      var left = pendingToAdvance(w);
      if (left.length && now > (before || 0)) out.push("Para abrir la semana " + (w.week + 1) + ": " + left.join(", ") + ".");
    }
    if (now === plan.length && plan.length && !(state.perfectWeeks || {})[w.week]) {
      state.perfectWeeks = state.perfectWeeks || {};
      state.perfectWeeks[w.week] = Date.now();
      gain(100);
      setTimeout(confetti, 400);
      out.push("🏁 ¡Settimana perfetta! Todas las misiones de la semana " + w.week + ": +100 xp");
    }
    return out;
  }

  function renderRisultato() {
    var r = view.result;
    var title = round.kind === "boss"
      ? (r.passed ? "⚔️ Jefe vencido" : "Jefe no vencido")
      : r.pct >= 90 ? "🏆 ¡Fantastico!" : r.pct >= 70 ? "👏 ¡Molto bene!" : "💪 Sesión terminada";
    var goal = Engine.goalFor(state), tx = Engine.todayXp(state);

    var html = '<h1>' + title + "</h1>" +
      '<div class="card">' +
      '<div class="scorebig"><b>' + r.pct + '%</b><span>+' + round.xp + ' xp</span>' +
        (round.bestCombo > 2 ? '<span>🔥 combo ×' + round.bestCombo + "</span>" : "") + "</div>" +
      '<div class="goalbar" style="margin:12px 0 4px"><i style="width:' +
        Math.min(100, Math.round(tx / goal * 100)) + '%"></i></div>' +
      '<p class="muted" style="margin:0 0 10px">Meta de hoy: ' + (tx >= goal ? tx + " xp" : tx + " / " + goal + " xp") +
        (tx >= goal ? " ✓ cumplida" : " — te faltan " + (goal - tx)) + "</p>" +
      '<table class="res">' +
        "<tr><td>Correctas</td><td>" + round.right + "</td></tr>" +
        (round.fixed ? "<tr><td>Corregidas por vos</td><td>" + round.fixed + "</td></tr>" : "") +
        "<tr><td>Casi</td><td>" + (round.close - (round.fixed || 0)) + "</td></tr>" +
        "<tr><td>Incorrectas</td><td>" + round.wrong + "</td></tr>" +
        "<tr><td>Racha</td><td>" + dias(state.streak) + " 🔥</td></tr>" +
      "</table>";

    (r.extras || []).forEach(function (x) { html += '<p class="note selfrepair">' + esc(x) + "</p>"; });
    if (round.boost) html += '<p class="muted">🎟️ Ronda con doble xp.</p>';

    if (round.kind === "boss") {
      // Like the CILS: one mark per ability, each one has to pass.
      var AB = { ascolto: "Ascolto", lettura: "Lettura", strutture: "Strutture", produzione: "Produzione" };
      var ab = {};
      round.log.forEach(function (l) {
        var it = round.items.filter(function (x) { return x.id === l.id; })[0] || {};
        var k = it.type === "listen" || it.type === "dictation" ? "ascolto"
              : it.type === "translate" || it.type === "write" || it.type === "typed" ? "produzione"
              : it.type === "choice" && !it.recog ? "lettura" : "strutture";
        var a = ab[k] || (ab[k] = { n: 0, ok: 0 });
        a.n++; if (l.verdict === Engine.VERDICT.RIGHT) a.ok++;
      });
      html += '<h3>Por abilità</h3><table class="res">' + Object.keys(ab).map(function (k) {
        var a = ab[k], p = Math.round(a.ok / a.n * 100);
        return "<tr><td>" + AB[k] + "</td><td>" + a.ok + " / " + a.n + " · " + (p >= 55 ? "✓" : "✗ (mínimo 55 %)") + "</td></tr>";
      }).join("") + "</table>";
    }
    if (round.kind === "boss") {
      html += r.passed
        ? '<p style="margin-top:14px">Semana ' + Math.min(52, view.week + 1) +
          " desbloqueada. +" + Engine.XP.boss + " xp</p>"
        : '<p style="margin-top:14px">Hace falta <b>85%</b> de aciertos. ' +
          "Repasá el briefing y volvé a intentarlo.</p>";
    }

    if (r.won && r.won.length) {
      html += "<h3>Medallas nuevas</h3>" + r.won.map(function (b) {
        return "<p>🏅 <b>" + esc(b.name) + "</b> — " + esc(b.desc) + "</p>";
      }).join("");
    }

    // One line per item, the question on the left, the answer on the right.
    var seenW = {};
    var wrong = round.log.filter(function (l) {
      if (l.verdict === Engine.VERDICT.RIGHT || seenW[l.id]) return false;
      seenW[l.id] = 1;
      return true;
    });
    if (wrong.length) {
      html += "<h3>Lo que aprendiste hoy (vuelve en el ripasso)</h3><table class=\"res\">" +
        wrong.slice(0, 10).map(function (l) {
          var q = l.es || (l.stem && !/^\s*_+\s*$/.test(l.stem) ? l.stem : "") || l.prompt || "—";
          return "<tr><td>" + esc(String(q).replace(/_{3,}/g, "…")) + "</td><td>" +
            esc(l.answer) + "</td></tr>";
        }).join("") + "</table>" +
        (wrong.length > 10 ? '<p class="muted">y ' + (wrong.length - 10) + " más en el ripasso.</p>" : "");
    }
    if (!state.remind && state.totals.attempts <= 80) {
      html += '<p class="muted" style="margin-top:12px">📅 Tres minutos por día rinden más que una hora el domingo. ' +
        '<button class="tab" id="toremind">Elegir una hora</button></p>';
    }

    html += '<div class="row" style="margin-top:16px">' +
      (round.from === "briefing" ? '<button class="btn" id="backweek">← Seguir el percorso</button>' : "") +
      '<button class="btn' + (round.from === "briefing" ? " ghost" : "") + '" id="again">Otra ronda</button>' +
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
    Engine.addStrand(state, "fluidez", xp);
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
    var playable = list.filter(function (c) { return c.play && c.play.length; });
    var doneN = playable.filter(function (c) { return (state.challengeLog[c.id] || {}).q === 2; }).length;

    var html = '<button class="btn ghost" id="back2">← a la semana</button>' +
      "<h1>Sfide del Maestro</h1>" +
      '<p class="lead">Los desafíos del <b>Soluzioni</b>, ahora con corrección: cada uno es una ronda corta. ' +
      "Con 80% o más lo ganás ★.</p>" +
      (playable.length ? '<div class="card pathsum"><b>' + doneN + " / " + playable.length + ' ★</b>' +
        '<span class="goalbar"><i style="width:' + Math.round(doneN / playable.length * 100) + '%"></i></span></div>' : "") +
      '<div class="missions">';

    list.forEach(function (c) {
      var done = state.challengeLog[c.id];
      var title = esc(c.consigna || c.instruction);
      if (c.play && c.play.length) {
        html += '<button class="mission' + (done && done.q === 2 ? " done" : "") + '" data-sfida="' + c.id + '">' +
          '<span class="mi">' + (done && done.q === 2 ? "★" : "📖") + "</span>" +
          "<span><b>" + title + "</b><small>" + c.play.length + " preguntas · cap. " + c.chapter +
          (done && done.pct != null ? " · mejor: " + done.pct + "%" : "") + "</small></span>" +
          '<span class="go">›</span></button>';
      } else {
        html += '<div class="card chal"><div class="inst">' + title + "</div><ol>" +
          c.items.map(function (i) { return "<li>" + esc(i.text) + "</li>"; }).join("") + "</ol>" +
          '<p class="muted">Ejercicio libre: resolvelo por escrito y puntuate.</p>' +
          '<div class="selfscore">' +
            '<button class="btn ghost" data-self="' + c.id + '" data-q="2">Lo tuve bien</button>' +
            '<button class="btn ghost" data-self="' + c.id + '" data-q="1">A medias</button>' +
            '<button class="btn ghost" data-self="' + c.id + '" data-q="0">No me salió</button>' +
            (done ? '<span class="muted" style="align-self:center">✓ ' + ["no salió", "a medias", "bien"][done.q] + "</span>" : "") +
          "</div></div>";
      }
    });
    return html + "</div>";
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
          [[100, "Relajada · 100 xp (2 o 3 pausas; 50 el finde)"], [200, "Normal · 200 xp (4 o 5 pausas; 100 el finde)"],
           [350, "Seria · 350 xp"], [500, "Intensa · 500 xp"]].map(function (g) {
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

      errorsCard() +
      aiCard() +
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
      "</div></div>" + versionLine();
  }

  /* Il quaderno dell'itañol (la guida, Della Putta 2011): le interferenze
     che si fossilizzano, con lo stato di ognuna. */
  var ITANOL = [["a_personale", "«a» personal: conosco Jorge, no *a Jorge*"], ["doppie", "dobles: nonno / nono"],
                ["accento", "è / e, vocales abiertas y cerradas"], ["ausiliare", "essere / avere"],
                ["participio_accordo", "sono andata: el participio concuerda"], ["ci_ne", "ci y ne"],
                ["articolo", "il / lo, artículo donde el español no lo pone"], ["preposizione_articolata", "nel, sul, dalla"],
                ["congiuntivo", "congiuntivo: penso che sia"], ["falso_amico", "falsos amigos: caldo, burro, salire"],
                ["parola_spagnola", "palabras en español dentro del italiano"]];
  /* The AI corrector: the key, and the corrections it disputed (so the
     learner can pass them on in one go instead of explaining each). */
  function aiCard() {
    var notes = state.aiNotes || [];
    return '<div class="card"><h2>🤖 Corrector con IA</h2>' +
      '<p class="muted small">Con una clave gratuita de Gemini (Google), Scrivi corrige tu texto entero y en cualquier ejercicio aparece «🤖 Explicame». ' +
      'Sacala en <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">aistudio.google.com/apikey</a> → «Create API key». Queda solo en este teléfono.</p>' +
      '<div class="row"><input id="aikey" type="password" autocomplete="off" placeholder="Pegá tu clave (AIza…)" value="' + esc(aiKey()) + '">' +
      '<button class="tab" id="aisave">Guardar</button></div>' +
      (notes.length ? "<h3>Correcciones para revisar (" + notes.length + ")</h3>" +
        '<p class="muted small">La IA cree que en estos casos tu respuesta también valía o la corrección de la app no era buena. Copialas y pegámelas todas juntas.</p>' +
        '<ul class="ainotes">' + notes.slice(0, 8).map(function (n) {
          return "<li><b>" + esc(n.given || "—") + "</b> ≠ " + esc(n.answer || "") + ' <small class="muted">' + esc((n.stem || "").slice(0, 60)) + "</small></li>";
        }).join("") + "</ul>" +
        '<div class="row"><button class="tab" id="aicopy">📋 Copiar todas</button><button class="tab" id="aiclear">Borrar</button></div>' : "") +
      "</div>";
  }

  function itanolCard() {
    var errs = state.errs || {}, now = Date.now();
    return '<div class="card"><h2>📓 Cuaderno itañol</h2>' +
      '<p class="muted">Las interferencias del español que se fosilizan (Della Putta). Verde: catorce días sin ese error.</p>' +
      '<ul class="itanol">' + ITANOL.map(function (x) {
        var e = errs[x[0]], quiet = !e || now - (e.last || 0) > 14 * 86400000;
        return "<li><span>" + (quiet ? "🟢" : "🔴") + "</span><span>" + esc(x[1]) +
          (e ? ' <small class="muted">· ' + e.n + (e.fixed ? " · " + e.fixed + " corregidos" : "") + "</small>" : "") + "</span></li>";
      }).join("") + "</ul></div>";
  }

  function errorsCard() {
    var errs = state.errs || {};
    var cats = Object.keys(errs).sort(function (a, b) { return errs[b].n - errs[a].n; });
    if (!cats.length) return itanolCard();
    var max = errs[cats[0]].n;
    return '<div class="card"><h2>Tus errores</h2>' +
      '<p class="muted">Se registran solos cuando te equivocás. Los que corregís vos mismo cuentan como avance.</p>' +
      '<div class="errbars">' + cats.slice(0, 8).map(function (c) {
        var e = errs[c];
        return '<div class="eb"><span>' + esc(Diagnosi.LABEL[c] || c) + "</span>" +
          '<i style="width:' + Math.round(e.n / max * 100) + '%"></i>' +
          "<b>" + e.n + (e.fixed ? ' <small>· ' + e.fixed + (e.fixed === 1 ? " corregido" : " corregidos") + "</small>" : "") + "</b></div>";
      }).join("") + "</div>" +
      ((state.errLog || []).length ? '<h3>Últimos</h3><table class="res">' + state.errLog.slice(0, 6).map(function (l) {
        return "<tr><td>" + esc(l.g) + "</td><td>" + esc(l.e) + "</td></tr>";
      }).join("") + "</table>" : "") +
      (Banca.loaded() && Banca.weakest(state, 1).length
        ? '<div class="row" style="margin-top:12px"><button class="btn" data-bank="clinica">🩺 Ir a la clínica</button></div>' : "") +
      "</div>" + itanolCard();
  }

  function stamp() {
    var d = new Date();
    function p(n) { return (n < 10 ? "0" : "") + n; }
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate());
  }

  function exportSave() {
    var name = "italiano-copia-" + stamp() + ".json";
    var blob = new Blob([JSON.stringify(state)], { type: "application/json" });
    // On phones, the share sheet lets you drop the file in Drive, mail or chat.
    try {
      var file = new File([blob], name, { type: "application/json" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({ files: [file], title: "Copia de La Via C1" })
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
        state = Engine.sanitize(Engine.migrateSyllabus(s));
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

  var TABS = [["oggi", "🏠", "Oggi"], ["frasi", "🏋️", "Allena"], ["leggi", "📖", "Leggi"],
              ["percorso", "🗺️", "Percorso"], ["io", "👤", "Io"]];

  function renderNav() {
    var nav = $("#nav");
    if (!nav) return;
    var inGame = ["gioco", "lampo", "lezione"].indexOf(view.screen) >= 0;
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
    else if (s === "leggi") html = renderLeggi();
    else if (s === "lettura") html = renderLettura(Letture.byId(view.ep));
    else if (s === "lezione") html = renderLezione();
    else if (s === "scrivi") html = renderScrivi(course.weeks[view.week - 1]);

    var gb = $("#glossbox");
    if (gb) gb.classList.remove("on");
    guardUntil = Date.now() + 300;
    guardAt = lastTap;
    // Inside a game or a text, the phone's back button returns to the tab
    // instead of closing the app.
    if (TABS.every(function (t) { return t[0] !== s; }) && !subEntry && window.history && history.pushState) {
      try { history.pushState({ sub: 1 }, ""); subEntry = true; } catch (e) { /* */ }
    }
    app().innerHTML = html;
    document.body.classList.toggle("ingame", s === "gioco" || s === "lampo" || s === "lezione");
    var pl = document.querySelector(".progressline i[data-to]");
    if (pl) requestAnimationFrame(function () { requestAnimationFrame(function () { pl.style.width = pl.dataset.to + "%"; }); });
    renderNav();
    wire();
    growBoxes();
  }

  var subEntry = false;
  window.addEventListener("popstate", function () {
    subEntry = false;
    if (!course || TABS.some(function (t) { return t[0] === view.screen; })) return;
    if (view.screen === "gioco") toast("Ronda interrumpida. Lo que respondiste ya quedó guardado.");
    go(view.tab || "oggi");
  });

  /* Another tab (or the installed app next to the browser) saved: take its
     progress instead of overwriting it with ours on the next save. */
  window.addEventListener("storage", function (e) {
    if (e.key !== "laviac1.save.v1" || !e.newValue) return;
    state = Engine.load();
    if (!course) return;
    renderHeader();
    if (["gioco", "lampo", "lettura"].indexOf(view.screen) < 0) render();
  });

  /* Answer boxes are textareas: long answers wrap and stay visible.  Enter
     sends (as before); Shift+Enter is a new line; the box grows with the text. */
  function growBoxes() {
    document.querySelectorAll("textarea.grow").forEach(function (t) {
      var fit = function () { t.style.height = "auto"; t.style.height = Math.min(t.scrollHeight + 2, 220) + "px"; };
      t.addEventListener("input", fit);
      fit();
    });
  }

  function on(sel, fn) { var b = $(sel); if (b) b.onclick = fn; }

  /* A double tap on «Continuar» must not answer the next question: taps
     right after a screen change are swallowed. */
  /* Only a tap in the same spot as the one that changed the screen is a
     double tap; a quick tap somewhere else is the learner answering fast. */
  var guardUntil = 0, lastTap = null, guardAt = null;
  document.addEventListener("pointerdown", function (e) { lastTap = { x: e.clientX, y: e.clientY }; }, true);
  document.addEventListener("click", function (e) {
    var near = !guardAt || e.clientX == null ||
      (Math.abs(e.clientX - guardAt.x) < 48 && Math.abs(e.clientY - guardAt.y) < 48);
    if (Date.now() < guardUntil && near && !(window.__test && window.__test.fast) && app().contains(e.target)) {
      e.stopPropagation();
      e.preventDefault();
    }
  }, true);

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
    on("#giorno", function () { startRound("giorno"); });
    on("#lampo", startLampo);
    on("#scena", function () { startRound("scene", Drills.nextScene(state).id); });
    on("#rev", function () { startRound("review"); });
    on("#sayfdg", function () { speak(Frasi.ofTheDay().it, true); });
    on("#firstles", function () { view.week = 1; startLezione(); });
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
      b.onclick = function () { speak(sayIndex[b.dataset.say] || (/^\d+-\d+$/.test(b.dataset.say) ? "" : b.dataset.say), true); };
    });
    on("#play", function () {
      startRound(course.weeks[view.week - 1].boss ? "boss" : "round");
    });
    on("#gym", function () { startRound("gym"); });
    on("#vocab", function () { startRound("vocab"); });
    on("#lez", function () { startLezione(); });
    on("#lesnextpart", function () { var b = $("#lesnextpart"); startLezione(+b.dataset.part); });
    on("#play2", function () { startRound("round"); });
    document.querySelectorAll("[data-m]").forEach(function (b) {
      b.onclick = function () { goMission(b.dataset.m, b.dataset.arg); };
    });
    on("#heronext", function () {
      var w = course.weeks[Math.min(state.unlocked, 52) - 1];
      var nm = nextMission(w);
      if (!nm) return;
      view.week = w.week; view.tab = "percorso";
      goMission(nm.kind, nm.arg);
    });
    on("#topercorso", function () { go("percorso"); });
    on("#backweek", function () { view.tab = "percorso"; view.screen = "briefing"; render(); window.scrollTo(0, 0); });
    on("#lesnext", lesNext);
    on("#lesquit", function () { clearPending(); view.screen = "briefing"; render(); });
    on("#resume", resumePending);
    on("#discard", function () { clearPending(); render(); });
    on("#toremind", function () { go("io"); });
    on("#lesback", function () { view.screen = "briefing"; render(); });
    on("#lesplay", function () { startRound(course.weeks[view.week - 1].boss ? "boss" : "round"); });
    document.querySelectorAll("[data-lq]").forEach(function (b) { b.onclick = function () { lesAnswer(b); }; });
    on("#chal", function () { view.screen = "sfide"; render(); window.scrollTo(0, 0); });
    on("#back2", function () { view.screen = "briefing"; render(); });
    document.querySelectorAll("[data-sfida]").forEach(function (b) {
      b.onclick = function () { startRound("sfida", b.dataset.sfida); };
    });
    on("#again", function () { startRound(round.kind, round.arg); });
    on("#quit", function () {
      clearPending();
      if (round.from === "briefing") { view.tab = "percorso"; view.screen = "briefing"; render(); window.scrollTo(0, 0); }
      else if (round.kind === "lettura") go("leggi");
      else if (["ponte", "falsi", "capire", "scene", "b-voc", "b-forme", "b-tr", "b-gap", "b-err", "clinica"].indexOf(round.kind) >= 0) go("frasi");
      else if (round.kind === "pausa" || round.kind === "review" || round.kind === "giorno") go("oggi");
      else if (round.kind === "sfida") { view.screen = "sfide"; render(); }
      else { view.screen = "briefing"; render(); }
    });

    // leggi e laboratorio
    document.querySelectorAll("[data-bank]").forEach(function (b) {
      b.onclick = function () { startRound(b.dataset.bank); };
    });
    document.querySelectorAll("[data-lab]").forEach(function (b) {
      b.onclick = function () { startRound(b.dataset.lab); };
    });
    document.querySelectorAll("[data-ep]").forEach(function (b) {
      b.onclick = function () {
        view.ep = b.dataset.ep;
        view.epFrom = null;
        view.tab = "leggi";
        view.screen = "lettura";
        render();
        window.scrollTo(0, 0);
      };
    });
    on("#lback", function () {
      if (view.epFrom === "briefing") { view.epFrom = null; view.tab = "percorso"; view.screen = "briefing"; render(); window.scrollTo(0, 0); }
      else go("leggi");
    });
    on("#lquiz", function () { startRound("lettura", view.ep); });
    on("#readall", function () { speak(Letture.byId(view.ep).text, true); });
    on("#readslow", function () { speak(Letture.byId(view.ep).text, true, 0.7); });
    document.querySelectorAll("[data-sg]").forEach(function (b) {
      b.onclick = function () { showGloss(stemGloss[+b.dataset.sg]); };
    });
    document.querySelectorAll("[data-gl]").forEach(function (b) {
      b.onclick = function () {
        showGloss(glossIndex[+b.dataset.gl]);
        speak(Letture.bare(b.textContent), false);
      };
    });

    // lampo
    document.querySelectorAll("[data-lopt]").forEach(function (b) {
      b.onclick = function () { lampoAnswer(b); };
    });
    on("#lquit", function () { go("oggi"); });
    on("#lagain", startLampo);

    wireGioco();
    wireIo();
    wireScrivi();

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

  /* ---------------------------------------------------------------- scrivi */

  // Everything Italian the course shows, as the checker's dictionary.
  function scriviLexicon() {
    if (!window.Scrivi) return;
    Scrivi.learnCourse({ items: course.items, bank: Banca.loaded() ? Banca.bank() : null,
      phrases: window.Frasi ? Frasi.ALL : [], readings: window.Letture ? Letture.EPISODI : [], glossario: glossario || {} });
  }

  function reqsHtml(r) {
    return r.reqs.map(function (q) {
      return '<li class="' + (q.ok ? "ok" : "") + '">' + (q.ok ? "✓" : "○") + " " + esc(q.label) +
        ' <small class="muted">' + Math.min(q.n, 999) + " / " + q.need + "</small></li>";
    }).join("");
  }

  function renderScrivi(w) {
    var task = Scrivi.TASKS[w.week];
    if (!task) return '<button class="btn ghost" id="sback">← a la semana</button><p>Esta semana no tiene texto.</p>';
    scriviLexicon();
    var draft = ((state.scrittiDraft || {})[w.week]) || ((state.scritti || {})[w.week] || {}).t || "";
    var r = Scrivi.check(draft, w.week);
    return '<button class="btn ghost" id="sback">← a la semana</button>' +
      '<h1 class="targa"><span class="t-sup">Scrivi · Settimana ' + romano(w.week) + "</span>" +
      '<span class="t-via">' + esc(w.fare || w.title) + "</span></h1>" +
      '<div class="card"><p>' + mk(task.t) + '</p><ul class="reqs" id="sreqs">' + reqsHtml(r) + "</ul>" +
      '<p class="muted small">Escribí sin traductor: lo que te equivoques es lo que más vas a aprender. Podés dejarlo a medias y volver.</p></div>' +
      '<textarea id="stext" class="grow scrivi" rows="7" spellcheck="false" autocapitalize="sentences" placeholder="Scrivi qui, in italiano…">' + esc(draft) + "</textarea>" +
      '<div class="row" style="margin-top:10px"><button class="btn" id="scheck">🔎 Revisar</button>' +
      '<button class="tab" id="smodel">👀 Ver un modelo</button></div>' +
      '<label class="muted small ltopt"><input type="checkbox" id="slt"' + (state.ltOff ? "" : " checked") + "> " +
        "Pedir también la corrección de LanguageTool (gratis; el texto se envía a su servidor)</label>" +
      '<details class="aibox"' + (aiKey() ? "" : " open") + '><summary class="muted small">🤖 Corrector con IA ' + (aiKey() ? "(activado)" : "(opcional, gratis)") + "</summary>" +
        '<p class="muted small">Marca todo y explica en castellano. Usa Gemini, de Google, con tu propia clave gratuita: ' +
        'entrá a <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">aistudio.google.com/apikey</a>, tocá «Create API key», copiala y pegala acá. ' +
        "Queda solo en este teléfono y el texto se envía a Google.</p>" +
        '<div class="row"><input id="aikey" type="password" autocomplete="off" placeholder="Pegá tu clave (AIza…)" value="' + esc(aiKey()) + '">' +
        '<button class="tab" id="aisave">Guardar</button></div></details>' +
      '<div id="sout"></div>';
  }

  var scriviTimer = null;
  var AI_KEY = "laviac1.gemini.key";
  function aiKey() { try { return localStorage.getItem(AI_KEY) || ""; } catch (e) { return ""; } }
  function wireScrivi() {
    if (view.screen !== "scrivi") return;
    var w = course.weeks[view.week - 1], box = $("#stext");
    on("#sback", function () { view.screen = "briefing"; render(); window.scrollTo(0, 0); });
    if (!box) return;
    box.addEventListener("input", function () {
      clearTimeout(scriviTimer);
      scriviTimer = setTimeout(function () {
        var r = Scrivi.check(box.value, w.week), ul = $("#sreqs");
        if (ul) ul.innerHTML = reqsHtml(r);
        if (!state.scrittiDraft) state.scrittiDraft = {};
        state.scrittiDraft[w.week] = box.value.slice(0, 4000);
        persist();
      }, 400);
    });
    on("#smodel", function () {
      var out = $("#sout");
      if (out) out.innerHTML = '<div class="card"><h3>Un modelo</h3><p class="model it">' + esc(Scrivi.TASKS[w.week].model) +
        '</p><p class="muted small">No es la única forma: compará las estructuras, no las palabras.</p></div>';
    });
    var lt = $("#slt");
    if (lt) lt.onchange = function () { state.ltOff = !lt.checked; persist(); };
    on("#aisave", function () {
      var k = (($("#aikey") || {}).value || "").trim();
      try { if (k) localStorage.setItem(AI_KEY, k); else localStorage.removeItem(AI_KEY); } catch (e) { /* */ }
      if (box && state.scrittiDraft) { state.scrittiDraft[w.week] = box.value; persist(); }
      toast(k ? "Clave guardada: la próxima revisión usa la IA." : "Clave borrada.");
      render();
    });
    on("#scheck", function () {
      var text = box.value, r = Scrivi.check(text, w.week), out = $("#sout");
      var ai = aiKey();
      r.ai = ai && text.trim() ? "…" : null;
      showScrivi(w, text, r, state.ltOff ? null : "…");
      if (r.ai) Scrivi.aiCheck(text, w.week, ai, function (err, data) {
        if (view.screen !== "scrivi" || $("#stext") !== box || box.value !== text) return;
        if (err) { r.ai = "error"; r.aiErr = String(err.message || err); }
        else {
          r.ai = "ok"; r.aiData = data;
          // the AI's word goes before LanguageTool's on the same words
          // what the local checker or LanguageTool said inside a fragment the
          // AI marked is the same error: the AI's version stays
          var aiF = Scrivi.fromAI(text, data, []), aiTok = {};
          aiF.forEach(function (f) { for (var j = 0; j < f.n; j++) aiTok[f.i + j] = 1; });
          r.findings = r.findings.filter(function (f) {
            for (var j = 0; j < f.n; j++) if (!aiTok[f.i + j]) return true;
            return false;
          }).concat(aiF).sort(function (a, b) { return a.i - b.i; });
          r.hard = r.findings.filter(function (f) { return !f.soft; }).length;
        }
        showScrivi(w, text, r, r.lt || (state.ltOff ? null : "…"));
      });
      if (state.ltOff || !text.trim()) return;
      // The local check shows at once; LanguageTool's opinion joins it when it arrives.
      Scrivi.ltCheck(text, function (err, matches) {
        if (view.screen !== "scrivi" || $("#stext") !== box || box.value !== text) return;
        if (err) { r.lt = "error"; showScrivi(w, text, r, "error"); return; }
        var ltF = Scrivi.fromLT(text, matches, r.findings.filter(function (f) { return !f.ai; })), aiT = {};
        r.findings.forEach(function (f) { if (f.ai) for (var j = 0; j < f.n; j++) aiT[f.i + j] = 1; });
        r.findings = r.findings.concat(ltF.filter(function (f) { return !aiT[f.i]; })).sort(function (a, b) { return a.i - b.i; });
        r.hard = r.findings.filter(function (f) { return !f.soft; }).length;
        r.lt = "ok";
        showScrivi(w, text, r, "ok");
      });
    });
  }

  function showScrivi(w, text, r, ltState) {
      var out = $("#sout");
      if (!out) return;
      var hard = r.findings.filter(function (f) { return !f.soft; });
      var list = r.findings.map(function (f, k) {
        return '<li class="' + (f.soft ? "soft" : "bad") + '"><b>' + (k + 1) + ".</b> " + mk(f.msg) + "</li>";
      }).join("");
      var missing = r.reqs.filter(function (q) { return !q.ok; });
      out.innerHTML = '<div class="card">' +
        (r.findings.length ? '<p class="scrivi-marked it">' + Scrivi.markup(text, r.findings, esc) + "</p><ol class=\"findings\">" + list + "</ol>"
                           : '<p>✨ No encontré errores' + (ltState === "ok" ? ", y LanguageTool tampoco." : " de los que sé buscar.") + "</p>") +
        (ltState === "…" ? '<p class="muted small">⏳ Consultando LanguageTool…</p>'
          : ltState === "error" ? '<p class="muted small">No pude consultar LanguageTool (sin conexión o límite de uso): esta es solo la revisión local.</p>'
          : ltState === "ok" ? '<p class="muted small">✓ Revisado también por LanguageTool.</p>' : "") +
        (r.ai === "…" ? '<p class="muted small">⏳ La IA está leyendo tu texto…</p>'
          : r.ai === "error" ? '<p class="muted small">No pude usar la IA (' + esc(r.aiErr || "") + "). " +
              (/clave|400|403/.test(r.aiErr || "") ? "Revisá la clave." : "Probá de nuevo en un rato.") + "</p>"
          : r.ai === "ok" && r.aiData ? '<div class="aiout">' +
              (r.aiData.comentario ? "<p>🤖 " + esc(r.aiData.comentario) + "</p>" : "") +
              (r.aiData.corregido ? '<p class="muted small">Versión corregida:</p><p class="model it">' + esc(r.aiData.corregido) + "</p>" : "") +
            "</div>" : "") +
        (missing.length ? '<p class="muted">Todavía falta: ' + missing.map(function (q) { return esc(q.label) + " (" + q.n + " / " + q.need + ")"; }).join(" · ") + ".</p>"
                        : '<p>Cumple la consigna.' + (hard.length ? " Corregí lo marcado si querés, o entregalo así: los errores quedan anotados para la clínica." : "") + "</p>" +
                          '<button class="btn" id="sdone">✓ Entregar el texto</button>') +
        "</div>";
      on("#sdone", function () { deliverScrivi(w, text, r); });
      if (ltState !== "ok" && ltState !== "error") out.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function deliverScrivi(w, text, r) {
    var before = doneCount(w), first = !(state.scritti || {})[w.week];
    var hard = r.findings.filter(function (f) { return !f.soft; });
    if (!state.scritti) state.scritti = {};
    state.scritti[w.week] = { t: text.slice(0, 4000), at: Date.now(), n: r.words, errs: hard.length };
    if (state.scrittiDraft) delete state.scrittiDraft[w.week];
    // The mistakes go to the error profile, like any other answer.
    var toks = Scrivi.toks(text);
    hard.forEach(function (f) {
      var tk = toks[f.i] || {};
      recordError({ cat: f.cat, target: f.msg.replace(/\*/g, "").slice(0, 80) }, tk.o || "");
    });
    var xp = first ? 40 + Math.min(40, Math.floor(r.words / 5)) + (hard.length ? 0 : 20) : 10;
    gain(xp);
    Engine.addStrand(state, "output", xp);
    if (first) state.written = (state.written || 0) + 1;
    Engine.touchStreak(state);
    var extras = missionCheck(w.week, before);
    Engine.checkBadges(state);
    persist();
    renderHeader();
    view.screen = "briefing";
    render();
    window.scrollTo(0, 0);
    var news = extras.filter(function (x) { return /abierta|perfetta/.test(x); })[0] || extras[0];
    toast("✍️ Texto entregado · +" + xp + " xp" + (news ? " · " + news : ""), 3500);
  }

  function wireGioco() {
    if (view.screen !== "gioco" || !round) return;
    var it = currentItem();

    document.querySelectorAll("[data-opt]").forEach(function (b) {
      b.onclick = function () { answer(b.textContent); };
    });

    var send = $("#send"), input = $("#ans");
    // A beginner often copies the whole sentence into the blank: say what
    // the blank is instead of grading «Voi insegnanti?» as a vocabulary error.
    function wholeSentence(v) {
      if (!/_{3,}/.test(it.stem || "")) return false;
      var words = function (x) { return String(x).toLowerCase().match(/[a-zà-ÿ']+/g) || []; };
      var stemW = words(String(it.stem).replace(/\([^)]*\)/g, " ").replace(/_{3,}/g, " "));
      var ans = String(it.answer).toLowerCase();
      return words(v).filter(function (w) { return stemW.indexOf(w) >= 0 && ans.indexOf(w) < 0; }).length >= 2;
    }
    function send1() {
      if (!round.answered && wholeSentence(input.value)) {
        $("#fb").innerHTML = '<div class="feedback prompt"><div class="verdict">Solo el hueco</div>' +
          "<p>Escribí únicamente lo que va en la raya ___, no la frase entera.</p></div>";
        input.focus();
        return;
      }
      produce(input.value);
    }
    if (send && input) {
      send.onclick = send1;
      input.onkeydown = function (e) {
        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send1(); }
      };
      input.focus();
      document.querySelectorAll("[data-ins]").forEach(function (b) {
        b.onclick = function () {
          // Insert at the cursor, not at the end.
          var st = input.selectionStart == null ? input.value.length : input.selectionStart;
          var en = input.selectionEnd == null ? st : input.selectionEnd;
          input.value = input.value.slice(0, st) + b.dataset.ins + input.value.slice(en);
          input.focus();
          try { input.setSelectionRange(st + 1, st + 1); } catch (e) { /* */ }
        };
      });
    }

    on("#say", function () { speak(it.stem.replace(/___/g, "…"), true); });

    if (it.type === "card") on("#next", nextItem);
    if (it.type === "word") {
      on("#next", nextItem);
      on("#sayit", function () { speak(it.stem, true); });
      speak(it.stem);
    }

    if (it.type === "fixerr") wireFixerr(it);

    on("#showtext", function () { $("#qtext").hidden = !$("#qtext").hidden; });

    if (it.type === "hunt") {
      var sel = [];
      document.querySelectorAll("[data-tok]").forEach(function (w) {
        w.onclick = function () {
          if (round.answered) return;
          var k = +w.dataset.tok, at = sel.indexOf(k);
          if (at >= 0) sel.splice(at, 1); else sel.push(k);
          w.classList.toggle("on", at < 0);
          fx.tap();
          $("#hcount").textContent = sel.length + " marcadas";
        };
      });
      on("#hcheck", function () {
        var ep = Letture.byId(it.ep);
        var r = Letture.gradeHunt(ep, sel);
        document.querySelectorAll("[data-tok]").forEach(function (w) {
          var k = +w.dataset.tok, want = r.targets.indexOf(k) >= 0, got = sel.indexOf(k) >= 0;
          w.classList.remove("on");
          if (want && got) w.classList.add("hit");
          else if (want) w.classList.add("missed");
          else if (got) w.classList.add("bad");
        });
        settle(r.verdict, sel.join(","),
          '<div class="note">Encontraste ' + r.hit + " de " + r.total +
          (r.wrong ? " · " + r.wrong + " de más" : "") +
          ". En verde las que marcaste bien; subrayadas en naranja, las que faltaban.</div>");
      });
    }

    if (it.type === "dictation") {
      on("#play1", function () { speak(it.answer, true); });
      on("#slow", function () { speak(it.answer, true, 0.6); });
      setTimeout(function () { speak(it.answer); }, 250);
    }

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
        var extra = "";
        if (r.verdict !== Engine.VERDICT.RIGHT && window.Diagnosi) {
          var d = Diagnosi.diagnose(r.given, [it.answer], { stem: it.stem });
          // Tiles are all Italian words handed over: a wrong pick is order,
          // a tile too many or too few, or the wrong form; never a «false
          // friend» or a «Spanish word».
          var TILE_SKIP = { falso_amico: 1, parola_spagnola: 1, lessico: 1 };
          if (d.cat && !GENERIC[d.cat] && !TILE_SKIP[d.cat]) { recordError(d, r.given); extra = diagHtml(d, true); }
        }
        settle(r.verdict, r.given, extra);
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

    if (it.type === "write" || it.type === "dictation") {
      var w = $("#wans");
      var check = function () { produce(w.value); };
      on("#wsend", check);
      w.onkeydown = function (e) {
        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); check(); }
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

  /* Trova l'errore: prima trovare (notare), poi correggere (produrre). */
  function wireFixerr(it) {
    var toks = it.stem.split(/\s+/);
    var core = function (t) { return t.toLowerCase().replace(/^[^a-zàèéìòù']+|[^a-zàèéìòù']+$/g, ""); };
    var badT = it.bad.split(/\s+/).map(core), start = -1;
    for (var i = 0; i <= toks.length - badT.length && start < 0; i++) {
      var ok = true;
      for (var j = 0; j < badT.length; j++) if (core(toks[i + j]) !== badT[j]) ok = false;
      if (ok) start = i;
    }
    var misses = 0, found = false;
    var label = (window.Diagnosi && Diagnosi.LABEL[it.cat]) || it.cat;
    function markBad(cls) {
      for (var k = start; k < start + badT.length; k++) {
        var el = document.querySelector('[data-ft="' + k + '"]');
        if (el) el.classList.add(cls);
      }
    }
    function reveal() {
      markBad("missed");
      recordError({ cat: it.cat, target: it.answer }, it.stem);
      settle("sbagliato", "", '<div class="diag"><span class="tag">' + esc(label) + "</span>" +
        '<div class="diff"><span class="k">mal</span> ' + esc(it.bad) + ' <span class="k">→</span> ' +
        (it.good ? "<b class=\"fix\">" + esc(it.good) + "</b>" : "<i>(se borra)</i>") + "</div></div>");
    }
    function askFix() {
      $("#fixbox").innerHTML = '<p class="muted">¡Bien visto! Ahora corregila: escribí lo que va en su lugar' +
        ' o, si sobra, borrala.</p>' +
        '<div class="typed"><textarea id="fxin" class="grow" rows="1" autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="send">' +
        esc(it.bad) + '</textarea><button class="btn" id="fxsend">Controlla</button></div>' +
        '<div class="row" style="margin-top:8px"><button class="tab" id="fxdel">🗑️ sobra: borrarla</button></div>';
      var inp = $("#fxin");
      growBoxes();
      inp.focus(); inp.select();
      var tries = 0;
      function judge(val) {
        if (round.answered) return;
        val = String(val).trim();
        // Other corrections that are just as right (fra/tra, ora/adesso…).
        var goods = [it.good].concat(it.goodAlt || []).filter(Boolean);
        var right = it.good === "" ? val === "" : window.Diagnosi &&
          Diagnosi.diagnose(val, goods).verdict === "giusto";
        if (right) {
          if (tries) markFixed(it.cat);
          settle(tries ? "quasi" : "giusto", val, '<div class="diag"><span class="tag">' + esc(label) + "</span></div>",
                 tries ? { label: "¡Eso es!" } : {});
          return;
        }
        tries++;
        if (tries === 1) {
          recordError({ cat: it.cat, target: it.answer }, it.stem);
          var d = it.good && window.Diagnosi ? Diagnosi.diagnose(val || "—", [it.good]) : null;
          $("#fb").innerHTML = '<div class="feedback prompt"><div class="verdict">🔎 Casi.</div><p>' +
            (it.good === "" ? "Esa palabra no hay que cambiarla por otra: sobra." :
             d && d.hint && !GENERIC[d.cat] ? mk(d.hint) : "Pista: es un error de <b>" + esc(label) + "</b>.") +
            "</p></div>";
          inp.focus();
          return;
        }
        settle("sbagliato", val, '<div class="diag"><span class="tag">' + esc(label) + "</span>" +
          '<div class="diff"><span class="k">mal</span> ' + esc(it.bad) + ' <span class="k">→</span> ' +
          (it.good ? "<b class=\"fix\">" + esc(it.good) + "</b>" : "<i>(se borra)</i>") + "</div></div>");
      }
      on("#fxsend", function () { judge(inp.value); });
      inp.onkeydown = function (e) { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); judge(inp.value); } };
      on("#fxdel", function () { judge(""); });
    }
    document.querySelectorAll("[data-ft]").forEach(function (el) {
      el.onclick = function () {
        if (round.answered || found) return;
        var k = +el.dataset.ft;
        fx.tap();
        if (k >= start && k < start + badT.length) {
          found = true;
          markBad("on");
          askFix();
          return;
        }
        misses++;
        el.classList.add("bad");
        if (misses === 1) {
          $("#fb").innerHTML = '<div class="feedback prompt"><div class="verdict">🔎 Esa está bien.</div>' +
            "<p>Pista: el error es de <b>" + esc(label) + "</b>.</p></div>";
        } else reveal();
      };
    });
  }

  function wireIo() {
    if (view.screen !== "io") return;
    on("#aisave", function () {
      var k = (($("#aikey") || {}).value || "").trim();
      try { if (k) localStorage.setItem(AI_KEY, k); else localStorage.removeItem(AI_KEY); } catch (e) { /* */ }
      toast(k ? "Clave guardada." : "Clave borrada.");
      render();
    });
    on("#aicopy", function () {
      var txt = (state.aiNotes || []).map(function (n) {
        return "[" + n.id + "] " + (n.prompt || "") + " | " + (n.stem || "") + " | yo: " + (n.given || "") + " | app: " + (n.answer || "") + " | IA: " + (n.ai || "");
      }).join("\n");
      var done = function () { toast("Copiadas " + (state.aiNotes || []).length + " correcciones."); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, function () { prompt("Copiá:", txt); });
      else prompt("Copiá:", txt);
    });
    on("#aiclear", function () { state.aiNotes = []; persist(); render(); });
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
      navigator.serviceWorker.register("sw.js").then(function (reg) {
        reg.update().catch(function () { /* offline */ });
      }).catch(function () { /* offline no */ });
      // A new version took over: reload once so the screen runs it too
      // (outside a round, so no answer is lost).
      var hadController = !!navigator.serviceWorker.controller, reloading = false;
      navigator.serviceWorker.addEventListener("controllerchange", function () {
        if (!hadController || reloading) return;
        var go = function () {
          if (["gioco", "lampo", "lezione", "lettura"].indexOf(view.screen) >= 0) { setTimeout(go, 5000); return; }
          reloading = true;
          location.reload();
        };
        go();
      });
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

  // Test hook (only with ?test in the URL): lets the automated playthrough
  // read the current question so it can answer right or wrong on purpose.
  if (/[?&]test\b/.test(location.search)) {
    window.__test = {
      item: function () { return round && view.screen === "gioco" ? round.items[round.i] : null; },
      state: function () { return state; }
    };
  }

  // The glossary is optional too: without it words are just not tappable.
  fetch("data/glossario.json")
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (g) { glossario = g; })
    .catch(function () { /* senza glossario */ });

  // The bank is optional: without it the app still works, just smaller.
  var bankP = fetch("data/bank.json")
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (b) { if (b) Banca.load(b); })
    .catch(function () { /* senza banca */ });

  fetch("data/course.json")
    .then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    })
    .then(function (data) { return bankP.then(function () { return data; }); })
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
        "<p>La primera vez la app necesita internet para descargarse; después funciona sin conexión. " +
        "Revisá la conexión y probá de nuevo.</p>" +
        '<button class="btn" id="retry">Reintentar</button>' +
        (location.protocol === "file:" ? '<p class="muted">Abierta como archivo: serví la carpeta ' +
          "<code>docs/</code> con un servidor web (python3 -m http.server).</p>" : "") +
        '<p class="muted">' + esc(e.message) + "</p></div>";
      var rb = document.getElementById("retry");
      if (rb) rb.onclick = function () { location.reload(); };
    });
})();
