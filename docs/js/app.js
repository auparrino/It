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
    var goal = state.goal || 200;
    var pct = Math.min(100, Math.round(todayXp / goal * 100));
    $("#hdr").innerHTML =
      '<div class="bar">' +
        '<button class="brand" id="home">La Via C1' +
          '<small>liv. ' + lv.level + ' · ' + esc(Engine.rankFor(lv.level)) +
          '</small></button>' +
        '<div class="stats">' +
          '<div class="stat' + (state.streak > 0 ? " hot" : "") + '"><b>' + state.streak + "<i>🔥</i></b><span>racha</span></div>" +
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
    var goal = state.goal || 200;
    var todayXp = Engine.todayXp(state);
    var reached = todayXp >= goal;
    var chestOpen = state.chest === Engine.dayKey();
    var due = Drills.dueCount(course, state, itemMap);
    var sc = Drills.nextScene(state);
    var sp = Frasi.progress(sc.id, state.cards);
    var w = course.weeks[Math.min(state.unlocked, 52) - 1];
    var f = Frasi.ofTheDay();
    var known = Frasi.ALL.filter(function (x) { return state.cards[x.id]; }).length;
    var hour = new Date().getHours();
    var hello = hour < 13 ? "Buongiorno" : hour < 19 ? "Buon pomeriggio" : "Buonasera";

    var html = '<h1>' + hello + '! 👋</h1>' +
      '<p class="lead">' + (state.streak > 1
        ? "Llevás <b>" + dias(state.streak) + "</b> seguidos. No cortes la racha."
        : "Tres minutos alcanzan. Arrancá con una pausa caffè.") + "</p>";

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

    // Azioni principali
    html += '<div class="big">' +
      '<button class="bigbtn pausa" id="pausa"><span class="e">☕</span>' +
        "<b>Pausa caffè</b><small>3 minutos, entre dos correos</small></button>" +
      '<button class="bigbtn lampo" id="lampo"' + (known < 12 ? " disabled" : "") +
        '><span class="e">⚡</span>' +
        "<b>Lampo 60″</b><small>" + (known < 12
          ? "se abre con 12 frases vistas (llevás " + known + ")"
          : "récord: " + ((state.best || {}).lampo || 0)) + "</small></button>" +
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

    // La clinica: gli errori che si ripetono
    var weakO = Banca.loaded() ? Banca.weakest(state, 2) : [];
    if (weakO.length) {
      html += '<button class="card weekcard clin" data-bank="clinica">' +
        '<span class="muted">🩺 Clínica de tus errores</span>' +
        "<b>Practicá " + weakO.map(function (w) { return esc((Diagnosi.LABEL[w.cat] || w.cat).toLowerCase()); }).join(" y ") + "</b>" +
        '<span class="muted">12 ejercicios armados con lo que más te cuesta.</span></button>';
    }

    // La storia di Martín: la prossima puntata
    var ep = Letture.next(state.letture);
    if (ep) {
      html += '<button class="card weekcard" data-ep="' + ep.id + '">' +
        '<span class="muted">Lectura · Martín a Bologna · episodio ' + ep.n + " · " +
          esc(ep.level) + "</span>" +
        "<b>" + ep.emoji + " " + esc(ep.title) + "</b></button>";
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
    return html;
  }

  function isStandalone() {
    return (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
      window.navigator.standalone === true;
  }

  /* ----------------------------------------------------------------- frasi */

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
          '<button class="lab" data-bank="b-tr"><span class="e">✍️</span><b>Traduci</b>' +
            '<span class="muted">Oraciones del español al italiano, con corrección que te explica el error.</span></button>' +
          '<button class="lab" data-bank="b-gap"><span class="e">🔧</span><b>Coniuga in contesto</b>' +
            '<span class="muted">El verbo justo dentro de una oración real.</span></button>' +
          '<button class="lab" data-bank="b-err"><span class="e">🔍</span><b>Trova l\'errore</b>' +
            '<span class="muted">Encontrá y corregí el error típico de un hispanohablante.</span></button>' +
          '<button class="lab" data-bank="b-forme"><span class="e">🧩</span><b>Forme</b>' +
            '<span class="muted">Artículos, plurales, preposiciones con artículo y concordancia.</span></button>' +
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
        var d = done[ep.id], open = Letture.isOpen(ep, done);
        html += '<button class="ep' + (d ? " done" : "") + '" data-ep="' + ep.id + '"' +
          (open ? "" : " disabled") + ">" +
          '<span class="e">' + (open ? ep.emoji : "🔒") + "</span>" +
          "<span><b>" + esc(ep.title) + "</b>" +
          '<span class="muted">' + (ep.area ? esc(ep.area) + " · " : "episodio " + ep.n + " · ") +
            esc(ep.level) + " · " + esc(ep.grammar) + "</span></span>" +
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
    return '<button class="btn ghost" id="lback">← a Leggi</button>' +
      "<h1>" + ep.emoji + " " + esc(ep.title) + "</h1>" +
      '<p class="lead">' + (ep.area ? esc(ep.area) + " · " : "Martín a Bologna · episodio " + ep.n + " · ") +
        esc(ep.level) + "</p>" +
      '<div class="card">' + renderText(ep, "read") +
        '<div class="row"><button class="tab" id="readall">🔊 escuchar todo</button>' +
        '<button class="tab" id="readslow">🐢 lento</button></div></div>' +
      '<button class="btn wide" id="lquiz">Lo leí → preguntas y caza de formas</button>';
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

  function renderPercorso() {
    var total = 0, got = 0;
    course.weeks.forEach(function (w) { total += 3; got += weekStars(w); });
    var html = '<h1>Il percorso</h1>' +
      '<p class="lead">De base a C1 en 52 misiones. Cada una tiene <b>3 estrellas</b>: ' +
      'jugar la lección, superar la semana y dominarla. Los <b>boss</b> cierran cada tramo.</p>' +
      '<div class="card pathsum"><b>' + got + ' / ' + total + ' ★</b>' +
      '<span class="goalbar"><i style="width:' + Math.round(got / total * 100) + '%"></i></span></div>';

    course.seasons.forEach(function (s) {
      html += '<div class="season"><div class="banner"><span class="lvl">' + esc(s.level) + "</span>" +
        "<h2>" + esc(s.name) + "</h2><p>" + esc(s.blurb) + '</p></div><div class="path">';
      course.weeks.filter(function (w) { return w.season === s.n; }).forEach(function (w, k) {
        var open = w.week <= state.unlocked;
        var stars = weekStars(w);
        var current = w.week === Math.min(state.unlocked, 52) && stars < 3;
        var x = Math.round(Math.sin(k * 0.9) * 32);
        html += '<div class="node' + (w.boss ? " boss" : "") + (open ? "" : " locked") +
            (current ? " current" : "") + (stars === 3 ? " full" : "") + '" style="--x:' + x + '%">' +
          (current ? '<span class="bubble">' + (weekStat(w.week).attempts || lessonRead(w.week) ? "SEGUÍ" : "EMPEZÁ") + "</span>" : "") +
          '<button class="dot" data-week="' + w.week + '"' + (open ? "" : " disabled") + ">" +
            (w.boss ? "⚔️" : open ? w.week : "🔒") + "</button>" +
          '<span class="nt">' + esc(w.title) + "</span>" + starsHtml(stars) +
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

  /* Tre stelle per settimana: la lezione giocata, la settimana superata
     (20 giuste), la padronanza (85% su almeno 30).  Il boss: superato = 3. */
  function weekStars(w) {
    var st = weekStat(w.week);
    if (w.boss) return st.bossPassed ? 3 : 0;
    return (lessonRead(w.week) || !w.lesson ? 1 : 0) + (st.right >= 20 ? 1 : 0) +
      (st.attempts >= 30 && st.right / st.attempts >= 0.85 ? 1 : 0);
  }
  function starsHtml(n, of) {
    var h = ""; for (var i = 0; i < (of || 3); i++) h += '<i class="' + (i < n ? "on" : "") + '">★</i>';
    return '<span class="stars">' + h + "</span>";
  }

  var sayIndex = {};

  function renderBlock(b, i) {
    var html = '<section class="blk">';
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

  function startLezione() {
    var w = course.weeks[view.week - 1];
    les = { w: w, steps: Lezione.steps(w.lesson), i: 0, right: 0, asked: 0, answered: false };
    view.screen = "lezione";
    render();
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
      return '<div class="card lesdone center"><div class="bigstar">★</div>' +
        "<h1>¡Lección completa!</h1>" +
        '<p class="lead">Semana ' + w.week + " · " + esc(w.title) + "</p>" +
        '<div class="scorebig"><b>' + les.right + "/" + les.asked + '</b><span>+' + les.xp + " xp</span></div>" +
        '<p class="muted">' + (pct === 100 ? "Perfecta: ni un error en los chequeos." :
          pct >= 70 ? "Bien. Lo que fallaste vuelve en el entrenamiento." : "Repasala cuando quieras: se puede jugar de nuevo.") + "</p>" +
        '<div class="row centerrow" style="margin-top:14px"><button class="btn" id="lesplay">🎯 A entrenar</button>' +
        '<button class="btn ghost" id="lesback">Volver a la semana</button></div></div>';
    }
    if (st.kind === "intro") {
      return hudH + '<div class="card lescard"><div class="badge-new">📘 Lección · semana ' + w.week + "</div>" +
        "<h1>" + esc(w.title) + "</h1><p class=\"intro\">" + mk(w.lesson.intro) + "</p>" +
        '<button class="btn wide" id="lesnext">Empezar →</button></div>';
    }
    if (st.kind === "block") {
      return hudH + '<div class="card lescard lesson">' + renderBlock(w.lesson.blocks[st.i], st.i) +
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
      '<div class="row" style="margin-top:10px"><button class="btn" id="lesnext2">Seguir →</button></div></div>';
    on("#lesnext2", lesNext);
  }

  function lesNext() {
    les.i++;
    les.answered = false;
    if (les.i >= les.steps.length) {
      var w = les.w;
      var first = !lessonRead(w.week);
      if (!state.read) state.read = {};
      if (!state.lessonScore) state.lessonScore = {};
      var pct = les.asked ? Math.round(les.right / les.asked * 100) : 100;
      les.xp = (first ? Engine.XP.lesson : 5) + les.right * 2;
      if (first) state.read[w.week] = Date.now();
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

  function missions(w, st, nChal) {
    var pct = st.attempts ? Math.round(st.right / st.attempts * 100) : 0;
    var m = function (id, done, ico, title, sub, cls) {
      return '<button class="mission' + (done ? " done" : "") + (cls ? " " + cls : "") + '" id="' + id + '">' +
        '<span class="mi">' + (done ? "★" : ico) + "</span><span><b>" + title + "</b><small>" + sub + "</small></span>" +
        '<span class="go">›</span></button>';
    };
    var html = '<div class="card"><h2>Misiones ' + starsHtml(weekStars(w)) + "</h2><div class=\"missions\">";
    if (w.boss) {
      html += m("play", st.bossPassed, "⚔️", "Vencé al boss", "85% con 3 vidas. Superarlo te da las 3 estrellas.", "boss");
    } else {
      if (w.lesson) html += m("lez", lessonRead(w.week), "📘", "Jugá la lección",
        lessonRead(w.week) ? "Hecha" + (state.lessonScore && state.lessonScore[w.week] != null ? " · " + state.lessonScore[w.week] + "% en los chequeos" : "") : "Teoría en pasos cortos, con preguntas.");
      html += m("play", st.right >= 20, "🎯", "Superá la semana", Math.min(st.right, 20) + " / 20 respuestas correctas" +
        (st.right >= 20 ? " · semana siguiente abierta" : ""));
      html += m("play2", st.attempts >= 30 && pct >= 85, "🏆", "Dominala", "85% de acierto en al menos 30 respuestas (vas " +
        (st.attempts ? pct + "% en " + st.attempts : "0") + ")");
    }
    html += "</div>";
    html += '<div class="row" style="margin-top:12px">' +
      (w.lesson ? '<button class="tab" id="teo">📄 Ver la teoría entera</button>' : "") +
      (w.boss ? "" : '<button class="tab" id="gym">🏋️ Gimnasio de verbos</button>') +
      (nChal ? '<button class="tab" id="chal">📖 Sfide del Maestro (' + nChal + ")</button>" : "") +
      "</div></div>";
    return html;
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
      '<h1>Settimana ' + w.week + " · " + esc(w.title) + '</h1>' +
      '<p class="lead">' + esc(w.focus) + '</p>' +
      missions(w, st, nChal) +
      '<div class="card"><h2>Lo que se juega esta semana</h2>' +
        '<ul class="keys">' +
          w.keys.map(function (k) { return "<li>" + esc(k) + "</li>"; }).join("") +
        '</ul>' +
        '<h3>Lectura de apoyo</h3><p class="refs">' + refs.join(" · ") + "</p>" +
      '</div>';
  }

  /* ------------------------------------------------------------ allenamento */

  // Only graded grammar rounds cost lives; phrase sessions are for flow.
  var WITH_LIVES = { round: 1, boss: 1, gym: 1 };
  // Only these rounds count towards unlocking the next grammar week.
  var WEEK_KINDS = { round: 1, gym: 1, pausa: 1 };
  // Rounds whose answers count as the week's progress (review mixes weeks).
  var COUNT_KINDS = { round: 1, gym: 1, pausa: 1, boss: 1 };

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
      if (Banca.loaded()) {
        var bi = Banca.pausaItem(state);
        if (bi) items.splice(Math.min(5, items.length), 0, bi);
      }
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
    } else if (kind === "ponte") items = Lab.ponteSession(state.cards, arg);
    else if (kind === "falsi") items = Lab.falsiSession(state.cards);
    else if (kind === "capire") items = Lab.capireSession(state.cards, arg);
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
    }
    else items = Drills.buildRound(course, w, { map: itemMap, state: state });

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
      again: {},
      tried: false,
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
    // Several blanks: numbered, answered in order («a / b»).
    var gaps = (String(it.stem || "").match(/_{3,}/g) || []).length;
    var multi = gaps > 1 && /\|/.test(it.answer || "");
    var gi = 0;
    var body = "", stem = /^\s*_+\s*$/.test(it.stem || "") ? ""
      : esc(it.stem).replace(/_{3,}/g, function () {
        return multi ? '<span class="gap n">' + (++gi) + "</span>" : '<span class="gap">&nbsp;</span>';
      });
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
        '<button class="tab" id="peek">👀 ver texto</button></div>' +
        '<div class="peek" id="peektxt" hidden>' + esc(it.stem) + "</div></div>" +
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

  // Multiple choice: say why *that* option is wrong (Shute 2008).
  function answer(given) {
    if (round.answered) return;
    var it = currentItem();
    var verdict = Engine.grade(given, it);
    if (verdict === Engine.VERDICT.RIGHT || !window.Diagnosi) { settle(verdict, given); return; }
    var cd = it.choiceDiag || { before: "", after: "" };
    var d = Diagnosi.explainChoice(cd.before + given + cd.after, cd.before + it.answer + cd.after);
    // Only when the options are Italian: diagnosing a Spanish gloss as if it
    // were Italian would be nonsense.
    var italianOptions = it.choiceDiag || it.src === "coniugatore" ||
      (it.src !== "banca" && it.src !== "lab" && it.src !== "lettura" && it.src !== "frasi") ||
      (it.src === "frasi" && it.type === "choice");
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
    var d = window.Diagnosi ? Diagnosi.diagnose(given, accept, {}) : { verdict: "sbagliato" };
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
               { label: "¡Eso es!" });
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
      (d.others ? '<div class="muted">+ ' + d.others + (d.others === 1 ? " detalle más" : " detalles más") + "</div>" : "") +
      "</div>";
  }

  function showPrompt(d) {
    fx.close();
    $("#fb").innerHTML = '<div class="feedback prompt">' +
      '<div class="verdict">🔎 Casi. Revisalo:</div>' +
      (d.given && d.given.length <= 24 ? '<div class="diff">' + tokHtml(d.given, "bad") + "</div>" : "") +
      "<p>" + mk(d.hint) + "</p>" +
      '<div class="row"><button class="tab" id="giveup">Ver la respuesta</button></div></div>';
    on("#giveup", function () { settle("sbagliato", "", diagHtml(d, true)); });
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
    round.xp += gained;
    round.log.push({ id: it.id, verdict: verdict, given: given, answer: it.answer,
                     es: it.frase ? it.frase.es : "" });

    // SRS only tracks the fixed bank and the phrases; generated conjugation
    // drills are endless by design, so they are not scheduled as cards.
    if (it.src !== "coniugatore" && it.src !== "lettura") {
      state.cards[it.id] = Engine.schedule(state.cards[it.id], q);
    }

    /* Successive relearning (Rawson & Dunlosky 2011): what you miss comes
       back later in the same session, until you get it (at most twice). */
    var relearn = "";
    if (q < 2 && round.kind !== "boss" && it.src !== "lettura" &&
        (round.again[it.id] || 0) < 2) {
      round.again[it.id] = (round.again[it.id] || 0) + 1;
      var copy = it.frase ? Frasi.pickItem(it.frase, { silent: state.silent }) : it;
      // Same question, new order: remember the answer, not its position.
      if (copy === it && it.options) {
        copy = Object.assign({}, it, { options: Drills.shuffle(it.options) });
      }
      var at = Math.min(round.items.length, round.i + 3);
      round.items.splice(at, 0, copy);
      relearn = '<div class="note">🔁 Te la vuelvo a preguntar en un rato.</div>';
    }

    state.totals.attempts++;
    if (q === 2) state.totals.right++;
    else if (q === 1) state.totals.close++;
    else state.totals.wrong++;

    // Only the week's own grammar counts towards unlocking the next week.
    if (!it.frase && it.src !== "lab" && it.src !== "lettura" && it.src !== "banca" &&
        COUNT_KINDS[round.kind]) {
      var ws = state.weekStats[view.week] ||
        (state.weekStats[view.week] = { attempts: 0, right: 0, bossPassed: false });
      ws.attempts++;
      if (q === 2) ws.right++;
    }

    gain(gained);
    persist();
    renderHeader();
    if (gained) xpFly(gained);

    var label = opts.label || { giusto: pick(["¡Perfetto!", "¡Bravo!", "¡Esatto!", "¡Grande!", "¡Benissimo!"]),
                  quasi: "Quasi…", sbagliato: "No, era así:" }[verdict];
    var sol = it.type === "listen" ? it.frase.it + " — " + it.answer
            : it.frase ? it.frase.it : it.answer;
    var fb = '<div class="feedback ' + verdict + '">' +
      '<div class="verdict">' + label +
        (gained ? ' <span class="xpgain">+' + gained + " xp</span>" : "") + "</div>" +
      (extra || "") +
      (it.type === "hunt" ? "" : '<div class="sol">' + esc(sol) + "</div>") +
      (it.frase && it.type !== "listen" ? '<div class="note">' + esc(it.frase.es) + "</div>" : "") +
      (it.note ? '<div class="note">' + mk(it.note) + "</div>" : "") +
      (it.hint && it.src === "dummies"
        ? '<div class="note">Consigna original: ' + esc(it.hint) + "</div>" : "") +
      relearn +
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
    ["#tcheck", "#tclear", "#wsend", "#wans", "#easier", "#reveal", "#hcheck", "#send", "#fxsend", "#fxdel", "#fxin"].forEach(function (s) {
      var b = $(s); if (b) b.disabled = true;
    });
    if (it.type === "tiles") drawTiles();

    var spoken = it.frase ? it.frase.it : it.src === "lettura" ? "" : it.answer;
    // False friends and structured input: read the Italian prompt aloud.
    if (it.lab === "falsi" || it.lab === "capire") spoken = it.stem;
    $("#next").onclick = nextItem;
    $("#say2").onclick = function () { speak(spoken, true); };
    if (q === 2 || it.frase) speak(spoken);
    $("#fb").scrollIntoView({ behavior: "smooth", block: "nearest" });
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
        "aunque le erres (efecto de la prueba previa).</div>" +
      '<div class="row" style="margin-top:10px"><button class="btn" id="next">Continuar →</button></div></div>';
    document.querySelectorAll(".opt").forEach(function (o) {
      o.disabled = true;
      if (o.textContent === it.answer) o.classList.add("right");
      else if (o.textContent === given) o.classList.add("wrong");
    });
    $("#next").onclick = nextItem;
  }

  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }

  function nextItem() {
    round.i++;
    round.answered = false;
    round.tried = false;
    round.lastGiven = null;
    round.firstCat = null;
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
    } else if (WEEK_KINDS[round.kind] &&
               (round.right >= 20 || weekStat(view.week).right >= 20)) {
      if (view.week >= state.unlocked && !w.boss) {
        state.unlocked = Math.min(52, view.week + 1);
      }
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
    var goal = state.goal || 200, tx = Engine.todayXp(state);

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
        "<tr><td>Casi</td><td>" + round.close + "</td></tr>" +
        "<tr><td>Incorrectas</td><td>" + round.wrong + "</td></tr>" +
        "<tr><td>Racha</td><td>" + dias(state.streak) + " 🔥</td></tr>" +
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
          [[100, "Relajada · 100 xp (1 pausa)"], [200, "Normal · 200 xp (2 pausas)"],
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

  function errorsCard() {
    var errs = state.errs || {};
    var cats = Object.keys(errs).sort(function (a, b) { return errs[b].n - errs[a].n; });
    if (!cats.length) return "";
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
      "</div>";
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
        state = Engine.sanitize(s);
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

    var gb = $("#glossbox");
    if (gb) gb.classList.remove("on");
    guardUntil = Date.now() + 300;
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
  var guardUntil = 0;
  document.addEventListener("click", function (e) {
    if (Date.now() < guardUntil && !(window.__test && window.__test.fast) && app().contains(e.target)) {
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
    on("#lez", startLezione);
    on("#play2", function () { startRound("round"); });
    on("#lesnext", lesNext);
    on("#lesquit", function () { view.screen = "briefing"; render(); });
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
      if (round.kind === "lettura") go("leggi");
      else if (["ponte", "falsi", "capire", "scene", "b-voc", "b-forme", "b-tr", "b-gap", "b-err", "clinica"].indexOf(round.kind) >= 0) go("frasi");
      else if (round.kind === "pausa" || round.kind === "review") go("oggi");
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
        view.tab = "leggi";
        view.screen = "lettura";
        render();
        window.scrollTo(0, 0);
      };
    });
    on("#lback", function () { go("leggi"); });
    on("#lquiz", function () { startRound("lettura", view.ep); });
    on("#readall", function () { speak(Letture.byId(view.ep).text, true); });
    on("#readslow", function () { speak(Letture.byId(view.ep).text, true, 0.7); });
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
      send.onclick = function () { produce(input.value); };
      input.onkeydown = function (e) {
        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); produce(input.value); }
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
        var right = it.good === "" ? val === "" : window.Diagnosi &&
          Diagnosi.diagnose(val, [it.good]).verdict === "giusto";
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

  // Test hook (only with ?test in the URL): lets the automated playthrough
  // read the current question so it can answer right or wrong on purpose.
  if (/[?&]test\b/.test(location.search)) {
    window.__test = {
      item: function () { return round && view.screen === "gioco" ? round.items[round.i] : null; },
      state: function () { return state; }
    };
  }

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
