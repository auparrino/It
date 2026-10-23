/*
 * «💡 Estrategia de la semana»: una táctica corta, dicha justo antes de la
 * misión donde sirve (Radio, Scrivi, la lectura, Dominala, las palabras…),
 * con un «¿Te sirvió? 👍 / 👎» que se guarda para el cierre semanal.
 *
 * Los manuales enseñan estrategias explícitas (Lerntipp, dicas, «strategie»);
 * la app ya las aplicaba (dos escuchas, leer las preguntas antes) sin
 * decirlas.  Enseñar la estrategia en el momento en que se usa, y pedir
 * después si sirvió, es lo que hace que se transfiera (instrucción
 * estratégica explícita con reflexión: Plonsky 2011, d = 0,49; Oxford 2017).
 *
 * Un set rotativo por tipo de misión, no 52 fichas sueltas: cada grupo
 * (escucha, lectura, escritura, palabras…) tiene varias estrategias, cada
 * una con las semanas en que tiene sentido (from / to); la semana N muestra,
 * de las que valen para N, la que hace más que no sale (una rueda).  Así cada misión
 * tiene la suya todas las semanas y la misma no se repite seguido.
 *
 * Aparece la primera vez que se toca una misión del grupo esa semana, en
 * el percorso (o «Seguir» en Oggi), en una hoja sobre la pantalla; «Empezar»
 * abre la misión.  Si no recibió 👍/👎, vuelve una sola vez más con «¿Te
 * sirvió?».  Si la misión ya está hecha, o el alumno las apagó, no aparece.
 *
 *   Estrategia.groupOf(kind)              el grupo de una misión (o null)
 *   Estrategia.pick(semana, kind)         { id, t, group, label, ico } | null
 *   Estrategia.shouldShow(state, semana, kind)
 *   Estrategia.seen / vote(state, semana, kind, ±1) / setOff(state, bool)
 *   Estrategia.weekVotes(state, weekKey)  { up, down, best } de esa semana
 *   Estrategia.reflectLine(state, weekKey)   la línea del cierre semanal
 *   Estrategia.init(hooks); Estrategia.open(semana, kind, seguir)   (navegador)
 *
 * Datos: lang/<código>/estrategia_data.js (window.ESTRATEGIA_DATA = { GROUPS:
 * { grupo: [{ id, t, from?, to? }] } }); el texto en castellano, con lo de
 * la lengua meta en *cursiva*.  El núcleo no nombra ningún idioma.
 * Guarda en state.strat = { seen: {"semana:grupo": veces}, votes: {id: {v, w,
 * at}}, off }.  Test: tools/lib/test_estrategia.js.
 */
(function (root) {
  "use strict";

  var H = null;   // the host (app.js)

  // The mission kinds (app.js weekPlan and the modules) by group.
  var GROUP = {
    radio: "escucha", "tr-asc": "escucha", "tr-brv": "escucha", dictogloss: "escucha",
    suoni: "oido",
    ep: "lectura",
    scrivi: "escritura", "tr-scr": "escritura",
    vocab: "palabras",
    scene: "frases",
    play: "practica",
    play2: "dominala",
    lez: "leccion",
    capire: "capire",
    parla: "parla",
    falsi: "falsos"
  };
  var LABEL = {
    escucha: ["🎧", "antes de escuchar"], oido: ["👂", "para el oído"], lectura: ["📖", "antes de leer"],
    escritura: ["✍️", "antes de escribir"], palabras: ["📚", "para las palabras"], frases: ["💬", "para las frases"],
    practica: ["🎯", "para practicar"], dominala: ["🏆", "antes de Dominala"], leccion: ["📘", "para la lección"],
    capire: ["🔎", "para mirar la forma"], parla: ["🗣️", "antes de hablar"], falsos: ["🪤", "para los falsos amigos"]
  };

  function D() { return root.ESTRATEGIA_DATA || { GROUPS: {} }; }
  function LG() { return root.LANG || {}; }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  // *x*: the language, in italics and with its lang (for the voice and the hyphenation)
  function mk(s) {
    var lang = LG().tts || LG().code || "";
    return esc(s).replace(/\*([^*]+)\*/g, '<i lang="' + esc(lang) + '">$1</i>');
  }

  function groupOf(kind) {
    var g = GROUP[kind];
    return g && (D().GROUPS || {})[g] && D().GROUPS[g].length ? g : null;
  }
  // The ones that make sense in a week (from / to), in the order of the data.
  function eligible(group, week) {
    return ((D().GROUPS || {})[group] || []).filter(function (s) {
      return (s.from || 1) <= week && week <= (s.to || 52);
    });
  }
  /* The wheel of a group, week by week: each week, of the eligible ones,
     the one shown longest ago (never shown first, in the order of the
     data).  So two weeks in a row never give the same one when there are
     two or more, and one that starts later enters the wheel at once. */
  var WHEEL = {}, WHEEL_OF = null;
  function wheel(group) {
    if (WHEEL_OF !== D()) { WHEEL = {}; WHEEL_OF = D(); }
    if (WHEEL[group]) return WHEEL[group];
    var last = {}, out = [null];
    for (var w = 1; w <= 52; w++) {
      var best = null;
      eligible(group, w).forEach(function (s) {
        var l = last[s.id] == null ? -1 : last[s.id];
        if (!best || l < best.l) best = { s: s, l: l };
      });
      if (best) last[best.s.id] = w;
      out.push(best ? best.s : null);
    }
    WHEEL[group] = out;
    return out;
  }
  // The strategy of the week for a mission (or null).
  function pick(week, kind) {
    var g = groupOf(kind);
    if (!g) return null;
    var s = wheel(g)[Math.max(1, Math.min(52, Math.round(+week) || 1))];
    if (!s) return null;
    var lb = LABEL[g] || ["💡", ""];
    return { id: s.id, t: s.t, group: g, label: lb[1], ico: lb[0] };
  }

  function ensure(state) {
    var s = state.strat;
    if (!s || typeof s !== "object" || Array.isArray(s)) s = state.strat = {};
    if (!s.seen || typeof s.seen !== "object") s.seen = {};
    if (!s.votes || typeof s.votes !== "object") s.votes = {};
    return s;
  }
  function key(week, kind) { return +week + ":" + (groupOf(kind) || kind); }

  // How many times the strategy of that week and group was shown.
  function times(state, week, kind) {
    var s = state && state.strat;
    return s && s.seen ? +s.seen[key(week, kind)] || 0 : 0;
  }
  function voted(state, week, kind) {
    var p = pick(week, kind), s = state && state.strat;
    return !!(p && s && s.votes && s.votes[p.id] && s.votes[p.id].w === +week);
  }
  /* Before a mission not done yet, unless turned off: the first time that
     week for its group; and once more, «¿Te sirvió?», if it got no 👍/👎
     the first time (the learner has tried it by then). */
  function shouldShow(state, week, kind, done) {
    if (!state || done || !pick(week, kind)) return false;
    if (state.strat && state.strat.off) return false;
    var n = times(state, week, kind);
    return n === 0 || (n === 1 && !voted(state, week, kind));
  }
  function seen(state, week, kind) {
    var s = ensure(state), k = key(week, kind);
    s.seen[k] = (+s.seen[k] || 0) + 1;
  }
  // 👍 (+1) / 👎 (-1): one vote per strategy, the last one counts.
  function vote(state, week, kind, v) {
    var p = pick(week, kind);
    if (!p) return null;
    var s = ensure(state);
    if (!s.seen[key(week, kind)]) s.seen[key(week, kind)] = 1;
    s.votes[p.id] = { v: v > 0 ? 1 : -1, w: +week, at: Date.now() };
    return s.votes[p.id];
  }
  function setOff(state, off) { ensure(state).off = !!off; }

  function textOf(id) {
    var g = D().GROUPS || {}, out = null;
    Object.keys(g).forEach(function (k) { g[k].forEach(function (s) { if (s.id === id) out = s.t; }); });
    return out;
  }
  // The votes given in a calendar week (Engine.weekKey: the Monday).
  function weekVotes(state, wk) {
    var votes = (state && state.strat && state.strat.votes) || {}, E = root.Engine;
    var r = { up: 0, down: 0, best: null, worst: null };
    Object.keys(votes).forEach(function (id) {
      var x = votes[id];
      if (!x || !E || E.weekKey(new Date(x.at || 0)) !== wk) return;
      if (x.v > 0) { r.up++; if (!r.best || x.at > r.best.at) r.best = { id: id, at: x.at, t: textOf(id) }; }
      else { r.down++; if (!r.worst || x.at > r.worst.at) r.worst = { id: id, at: x.at, t: textOf(id) }; }
    });
    return r;
  }
  // The line of the weekly close: what was tried and what helped.
  function reflectLine(state, wk) {
    var r = weekVotes(state, wk);
    if (!r.up && !r.down) return "";
    return '<span class="muted small strat-rf">💡 Estrategias que probaste: ' +
      (r.up ? "👍 " + r.up : "") + (r.up && r.down ? " · " : "") + (r.down ? "👎 " + r.down : "") +
      (r.best && r.best.t ? ". Te sirvió: «" + mk(r.best.t) + "» — seguí usándola." : r.up ? "." : ". Ninguna te sirvió: la semana que viene, otras.") + "</span>";
  }

  /* --------------------------------------------------------- la hoja */

  function init(hooks) { H = hooks || {}; }

  function open(week, kind, go) {
    var p = pick(week, kind), state = H && H.state ? H.state() : null;
    if (!p || !state || typeof document === "undefined") { if (go) go(); return; }
    close();
    var again = times(state, week, kind) > 0;
    seen(state, week, kind);
    if (H.persist) H.persist();
    var prev = (state.strat.votes || {})[p.id];
    var wrap = document.createElement("div");
    wrap.id = "stratsheet";
    wrap.className = "porque-back";
    wrap.innerHTML = '<div class="lesson porque-sheet strat-sheet" role="dialog" aria-modal="true" aria-label="Estrategia de la semana">' +
      '<div class="ps-top"><span class="ps-where">💡 Estrategia de la semana · ' + esc(p.ico + " " + p.label) + "</span>" +
        '<button class="btn ghost ps-close" type="button" aria-label="cerrar">✕</button></div>' +
      '<p class="strat-t">' + mk(p.t) + "</p>" +
      '<div class="strat-vote"><span class="muted small">' + (again ? "<b>¿Te sirvió?</b> Va al cierre de la semana." : "¿Te sirve? Si no sabés todavía, la próxima vez que entres te lo vuelvo a preguntar.") + "</span>" +
        '<span class="row"><button class="tab' + (prev && prev.v > 0 ? " on" : "") + '" type="button" data-sv="1" aria-label="me sirve">👍</button>' +
        '<button class="tab' + (prev && prev.v < 0 ? " on" : "") + '" type="button" data-sv="-1" aria-label="no me sirve">👎</button></span></div>' +
      '<button class="btn wide" type="button" id="stratgo">Empezar ›</button>' +
      '<button class="tab strat-off" type="button" id="stratoff">No mostrarme más estrategias</button></div>';
    document.body.appendChild(wrap);
    document.body.classList.add("porque-open");
    var start = function () { close(); if (go) go(); };
    wrap.onclick = function (e) { if (e.target === wrap) close(); };
    wrap.querySelector(".ps-close").onclick = close;
    wrap.querySelector("#stratgo").onclick = start;
    wrap.querySelector("#stratoff").onclick = function () {
      setOff(state, true);
      if (H.persist) H.persist();
      if (H.toast) H.toast("Listo: no aparecen más. Las volvés a prender en Ajustes.", 3000);
      start();
    };
    Array.prototype.forEach.call(wrap.querySelectorAll("[data-sv]"), function (b) {
      b.onclick = function () {
        vote(state, week, kind, +b.dataset.sv);
        if (H.persist) H.persist();
        Array.prototype.forEach.call(wrap.querySelectorAll("[data-sv]"), function (x) { x.classList.toggle("on", x === b); });
        if (H.toast) H.toast(+b.dataset.sv > 0 ? "👍 Anotado para el cierre de la semana." : "👎 Anotado: la semana que viene, otra.", 2200);
      };
    });
    wrap._key = function (e) { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", wrap._key);
    var g = wrap.querySelector("#stratgo");
    if (g) g.focus();
  }
  function close() {
    var w = typeof document !== "undefined" && document.getElementById("stratsheet");
    if (!w) return;
    if (w._key) document.removeEventListener("keydown", w._key);
    w.parentNode.removeChild(w);
    document.body.classList.remove("porque-open");
  }

  /* Before a mission: the sheet if it is its first time this week, or the
     mission straight away. */
  function before(week, kind, done, go) {
    var state = H && H.state ? H.state() : null;
    if (shouldShow(state, week, kind, done)) open(week, kind, go);
    else go();
  }

  var api = {
    GROUP: GROUP, groupOf: groupOf, eligible: eligible, pick: pick, shouldShow: shouldShow, seen: seen, vote: vote,
    setOff: setOff, weekVotes: weekVotes, reflectLine: reflectLine, init: init, open: open, close: close, before: before
  };
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.Estrategia = api;
})(typeof window !== "undefined" ? window : globalThis);
