/*
 * «Ya puedo…»: lo que tenés que poder hacer al final de cada semana, y si
 * de verdad lo podés (auditorias/PLAN-2026-10-propuestas.md, Tanda 3).  Los
 * manuales abren cada unidad con tres o cuatro objetivos y la cierran con un
 * balance («Che cosa so fare?», «Agora já sei», «Ich kann jetzt…»); acá el
 * balance además se prueba.
 *
 * Datos: cada semana del curso trae `can: [{t, items}]` (tools/<código>/can.py,
 * copiado por tools/lib/puedo.py): tres o cuatro acciones, cada una atada a
 * uno o dos ítems de la semana.
 *
 * - Al abrir la semana: la lista «🎯 Al final de la semana vas a poder».
 * - Al terminar sus misiones (las que abren la semana siguiente; en la del
 *   jefe, vencerlo): la tarjeta «¿Ya podés…?», sí / más o menos / todavía no.
 * - «Sí»: la app lo prueba ahí mismo con sus ítems (una ronda corta).  Al
 *   terminar, la calibración: «dijiste que sí y te salió» o «dijiste que sí
 *   y fallaste».
 * - Lo que quedó en «más o menos», en «todavía no» o falló vuelve mañana en
 *   el repaso (Engine.enqueue) y, por eso, también entra en «Tus puntos
 *   débiles» y en la Estación (lo flojo va primero).
 * - El balance queda guardado por semana; la Estación lo muestra para sus
 *   tres semanas.
 *
 *   Puedo.list(w)                          los objetivos de la semana
 *   Puedo.introHtml(w, state)              la lista, al abrir la semana
 *   Puedo.cardHtml(w, state, ready)        la tarjeta «¿Ya podés…?» (ready: misiones hechas)
 *   Puedo.answer(state, course, week, k, a)   guarda la respuesta → { test: bool }
 *   Puedo.items(course, arg, map)          los ítems de la prueba (arg «semana:k»)
 *   Puedo.roundDone(state, arg, log, course)   guarda si salió → { ok }
 *   Puedo.resultHtml(state, course, arg)   la calibración, en el resultado
 *   Puedo.balance(state, course, weeks)    el balance de esas semanas
 *   Puedo.stationHtml(state, course, end)  el balance de las tres semanas de una estación
 *
 * Guarda en state.puedo = { <semana>: { <k>: { a: "si"|"medio"|"no", ok: true|false|null, at } } }.
 * El núcleo no nombra ningún idioma.  Test: tools/lib/test_puedo.js.
 */
(function (root) {
  "use strict";

  var ANS = { si: 1, medio: 1, no: 1 };
  var LABEL = { si: "Sí", medio: "Más o menos", no: "Todavía no" };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function list(w) {
    return (w && Array.isArray(w.can) ? w.can : []).filter(function (c) { return c && typeof c.t === "string" && c.t; });
  }
  function weekOf(course, n) { return course && course.weeks ? course.weeks[+n - 1] || null : null; }
  function store(state) {
    if (!state.puedo || typeof state.puedo !== "object" || Array.isArray(state.puedo)) state.puedo = {};
    return state.puedo;
  }
  function rec(state, week, k) {
    var p = state && state.puedo && state.puedo[week];
    var r = p && typeof p === "object" ? p[k] : null;
    return r && ANS[r.a] ? r : null;
  }
  function parseArg(arg) {
    var m = /^(\d+):(\d+)$/.exec(String(arg == null ? "" : arg));
    return m ? { week: +m[1], k: +m[2] } : null;
  }

  /* How a goal stands: the icon and the words. */
  function status(r) {
    if (!r) return null;
    if (r.a === "si") return r.ok === true ? { ico: "✅", txt: "Lo podés: lo probaste y te salió" }
      : r.ok === false ? { ico: "🔁", txt: "Dijiste que sí y fallaste: vuelve mañana en el repaso" }
      : { ico: "✅", txt: "Dijiste que sí" };
    if (r.a === "medio") return { ico: "🟡", txt: "Más o menos: vuelve mañana en el repaso" };
    return { ico: "⬜", txt: "Todavía no: vuelve mañana y en tus puntos débiles" };
  }

  /* When the week opens: what you will be able to do. */
  function introHtml(w, state) {
    var cs = list(w);
    if (!cs.length) return "";
    return '<div class="fare puedo-intro"><p>🎯 <b>Al final de la semana vas a poder:</b></p><ul class="puedo-list">' +
      cs.map(function (c, k) {
        var s = status(rec(state, w.week, k));
        return "<li>" + (s ? '<span aria-hidden="true">' + s.ico + "</span> " : "") + esc(c.t) + "</li>";
      }).join("") + "</ul>" +
      (w.tema ? '<p class="muted small">' + esc(w.tema) + "</p>" : "") + "</div>";
  }

  /* After the missions: «¿Ya podés…?», one row per goal. */
  function cardHtml(w, state, ready) {
    var cs = list(w);
    if (!cs.length || !ready) return "";
    var done = 0;
    var rows = cs.map(function (c, k) {
      var r = rec(state, w.week, k), s = status(r);
      if (r) done++;
      var n = (c.items || []).length;
      return '<div class="puedo-row">' +
        "<p><b>" + esc(c.t) + "</b></p>" +
        '<span class="chips" role="group" aria-label="' + esc(c.t) + '">' +
          ["si", "medio", "no"].map(function (a) {
            var on = r && r.a === a;
            return '<button class="chip' + (on ? " on" : "") + '" aria-pressed="' + (on ? "true" : "false") +
              '" data-puedo="' + w.week + ":" + k + ":" + a + '">' + LABEL[a] + "</button>";
          }).join("") +
        "</span>" +
        (s ? '<p class="muted small">' + s.ico + " " + s.txt + "</p>"
           : '<p class="muted small">' + (n ? "Si decís que sí, te lo pruebo con " + (n === 1 ? "un ejercicio" : n + " ejercicios") + " de la semana." : "") + "</p>") +
        "</div>";
    }).join("");
    return '<div class="card puedo"><h2>🎯 ¿Ya podés…?</h2>' +
      '<p class="muted">Terminaste las misiones. Contestá con honestidad: lo que todavía no sale vuelve mañana en el repaso, y queda en el balance de la Estación.</p>' +
      rows + (done === cs.length ? '<p class="muted small">' + summary(state, w) + "</p>" : "") + "</div>";
  }

  function count(state, w) {
    var o = { si: 0, medio: 0, no: 0, fail: 0, ok: 0, n: list(w).length };
    list(w).forEach(function (c, k) {
      var r = rec(state, w.week, k);
      if (!r) return;
      o[r.a]++;
      if (r.a === "si" && r.ok === false) o.fail++;
      if (r.a === "si" && r.ok === true) o.ok++;
    });
    return o;
  }
  function summary(state, w) {
    var c = count(state, w), parts = [];
    if (c.si) parts.push(c.si + " sí" + (c.fail ? " (" + c.fail + " no te salió en la prueba)" : ""));
    if (c.medio) parts.push(c.medio + " más o menos");
    if (c.no) parts.push(c.no + " todavía no");
    return "Tu balance de la semana: " + parts.join(" · ") + ".";
  }

  /* Puts the items of a goal in tomorrow's review. */
  function enqueueGoal(state, course, week, k) {
    var c = list(weekOf(course, week))[k], E = root.Engine;
    if (!c || !E || !E.enqueue) return;
    (c.items || []).forEach(function (id) { E.enqueue(state, id, null); });
  }

  /* The answer.  «Sí» with items: the app tests it (test: true). */
  function answer(state, course, week, k, a) {
    week = +week; k = +k;
    var c = list(weekOf(course, week))[k];
    if (!c || !ANS[a]) return { test: false };
    var p = store(state);
    if (!p[week] || typeof p[week] !== "object") p[week] = {};
    var prev = p[week][k];
    // a «sí» already tested keeps its result until it is tested again
    p[week][k] = { a: a, ok: a === "si" && prev && prev.a === "si" ? (prev.ok == null ? null : prev.ok) : null, at: Date.now() };
    if (a !== "si") enqueueGoal(state, course, week, k);
    return { test: a === "si" && (c.items || []).length > 0 };
  }

  function items(course, arg, map) {
    var q = parseArg(arg), c = q ? list(weekOf(course, q.week))[q.k] : null;
    if (!c) return [];
    map = map || {};
    return (c.items || []).map(function (id) { return map[id]; }).filter(Boolean);
  }

  /* The end of the test: right if every first answer was right. */
  function roundDone(state, arg, log, course) {
    var q = parseArg(arg);
    if (!q) return { ok: false };
    var V = root.Engine && root.Engine.VERDICT || { RIGHT: "giusto", CLOSE: "quasi" };
    // only the goal's own items count (the round can bring one more of the same rule)
    var c = course ? list(weekOf(course, q.week))[q.k] : null, own = {};
    (c && c.items || []).forEach(function (id) { own[id] = 1; });
    var firsts = (log || []).filter(function (l) { return l && !l.retry && (!c || own[l.id]); });
    // none of its own items got answered (silent mode swapped them): no verdict
    if (!firsts.length) return { ok: null };
    var ok = firsts.every(function (l) { return l.verdict === V.RIGHT || l.verdict === V.CLOSE; });
    var p = store(state);
    if (!p[q.week] || typeof p[q.week] !== "object") p[q.week] = {};
    var prev = p[q.week][q.k];
    p[q.week][q.k] = { a: prev && ANS[prev.a] ? prev.a : "si", ok: ok, at: Date.now() };
    if (!ok && course) enqueueGoal(state, course, q.week, q.k);
    return { ok: ok };
  }

  function resultHtml(state, course, arg) {
    var q = parseArg(arg), w = q ? weekOf(course, q.week) : null, c = w ? list(w)[q.k] : null;
    if (!c) return "";
    var r = rec(state, q.week, q.k);
    var good = r && r.ok === true;
    return '<div class="note puedo-cal"><b>🎯 ' + esc(c.t) + "</b><br>" +
      (!r || r.ok == null ? "Esta vez no salió ninguno de sus ejercicios: probalo de nuevo desde la semana."
      : good ? "Dijiste que sí y te salió: estás bien calibrado. Queda en tu balance."
            : "Dijiste que sí y fallaste: pasa seguido, es lo que más enseña. Lo fallado vuelve mañana en el repaso y en tus puntos débiles.") +
      "</div>";
  }

  /* The balance of some weeks: what you said and what the test said. */
  function balance(state, course, weeks) {
    return (weeks || []).map(function (n) {
      var w = weekOf(course, n);
      if (!w || !list(w).length) return null;
      var c = count(state, w);
      return { week: w.week, title: w.title || "", n: c.n, si: c.si, medio: c.medio, no: c.no, ok: c.ok, fail: c.fail,
               answered: c.si + c.medio + c.no };
    }).filter(Boolean);
  }

  function stationHtml(state, course, end) {
    end = +end;
    var rows = balance(state, course, [end - 2, end - 1, end]);
    if (!rows.length) return "";
    var any = rows.some(function (r) { return r.answered; });
    var weak = [];
    var body = rows.map(function (r) {
      if (r.no || r.medio || r.fail) weak.push(r.week);
      return "<tr><td>Semana " + r.week + (r.title ? " · " + esc(r.title) : "") + "</td><td style=\"white-space:nowrap\">" +
        (r.answered ? "✅ " + (r.si - r.fail) + " · 🟡 " + r.medio + " · ⬜ " + r.no + (r.fail ? " · 🔁 " + r.fail : "")
                    : '<span class="muted">sin contestar</span>') + "</td></tr>";
    }).join("");
    return '<h3>🎯 Lo que dijiste que podés</h3><table class="res puedobal">' + body + "</table>" +
      '<p class="muted small">' + (!any ? "Al terminar las misiones de cada semana, la tarjeta «¿Ya podés…?» arma este balance."
        : weak.length ? "Para repasar: semana " + weak.join(", ") + " (🔁 = dijiste que sí y la prueba falló)."
        : "Todo lo que dijiste que podés, lo podés.") + "</p>";
  }

  var api = {
    list: list, introHtml: introHtml, cardHtml: cardHtml, answer: answer, items: items,
    roundDone: roundDone, resultHtml: resultHtml, balance: balance, stationHtml: stationHtml,
    LABEL: LABEL
  };
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.Puedo = api;
})(typeof window !== "undefined" ? window : globalThis);
