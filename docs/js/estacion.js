/*
 * «Estación»: un repaso cada tres semanas, entre el repaso diario y el jefe
 * (auditorias/PLAN-2026-10-propuestas.md, Tanda 3).  Los manuales lo hacen
 * cada dos o tres unidades (Facciamo il punto, Revisão, Station, Plattform):
 * nada nuevo, lo de las últimas semanas mezclado y un balance.
 *
 * Dónde: dentro de cada estación del curso (course.seasons, 1-13, 14-26…),
 * después de su tercera, sexta, novena y duodécima semana: 3, 6, 9, 12, 16,
 * 19, 22, 25, 29… (el jefe, al final de la estación, no cuenta como semana
 * de la tanda).  Es una misión opcional de la semana siguiente: cuenta para
 * «todas las misiones», nunca para abrir la semana.
 *
 * Qué: una ronda intercalada de 15 ítems de esas tres semanas, una semana
 * por vez (alternadas), con la producción escrita primero y lo que fallaste
 * antes que lo que ya sabés; si en esas semanas se abrió un duelo, dos o
 * tres oraciones suyas.  Al terminar, un balance por semana (y por duelo)
 * con semáforo: verde, seguí; amarillo, repasá esa semana; rojo, volvé a su
 * lección.
 *
 *   Estacion.ends(course)                 las semanas que cierran una tanda
 *   Estacion.forWeek(course, week)        la tanda que se repasa en esa semana (o null)
 *   Estacion.build(course, end, state, opts)   la ronda (opts.map, opts.size, opts.rnd)
 *   Estacion.roundDone(state, end, log, course)   guarda el balance → {pct, rows}
 *   Estacion.missions(w, state, course)   la misión opcional «🧭 Estación» de la semana
 *   Estacion.handles(kind)                «estacion»
 *   Estacion.balanceHtml(state, end, course)   el balance, para el resultado
 *
 * Guarda en state.estacion = { <semana final>: { pct, best, n, at,
 * rows: [{ k: "w:4" | "d:<duelo>", ok, n }] } }.
 * Test: tools/lib/test_estacion.js.
 */
(function (root) {
  "use strict";

  var SIZE = 15;          // the items of the round
  var DUELS = 3;          // at most, of the duels opened in those weeks
  var DONE = 60;          // the mission is done from here (first answers)
  var GREEN = 80, YELLOW = 60;
  // what is written (not chosen): what goes first
  var WRITTEN = { cloze: 1, translate: 1, conjugate: 1, plural: 1, numbers: 1, qa: 1, typed: 1, write: 1, fixerr: 1, garden: 1, combina: 1 };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function shuffle(a, rnd) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor((rnd || Math.random)() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }

  /* The seasons of the course (a package without them: blocks of 13). */
  function seasons(course) {
    var n = (course && course.weeks && course.weeks.length) || 52;
    var s = ((course && course.seasons) || []).map(function (x) { return x.weeks; })
      .filter(function (x) { return x && x.length === 2; });
    if (!s.length) for (var a = 1; a <= n; a += 13) s.push([a, Math.min(n, a + 12)]);
    return s;
  }
  function isBoss(course, wk) {
    var w = course && course.weeks && course.weeks[wk - 1];
    if (w && w.boss) return true;
    return seasons(course).some(function (s) { return s[1] === wk; });
  }
  /* The weeks that close a block of three: the 3rd, 6th, 9th and 12th of
     each season, never its last one (the boss). */
  function ends(course) {
    var out = [];
    seasons(course).forEach(function (s) {
      for (var e = s[0] + 2; e < s[1]; e += 3) if (!isBoss(course, e)) out.push(e);
    });
    return out;
  }
  /* The block reviewed in a week: the one that ended the week before. */
  function forWeek(course, week) {
    var e = +week - 1;
    if (e < 3 || ends(course).indexOf(e) < 0) return null;
    return { end: e, weeks: [e - 2, e - 1, e] };
  }

  function rec(state, end) { return state && state.estacion && state.estacion[end] || null; }

  /* How badly an item is known: failed (the card went back) first, then
     the hard ones, then the unseen, the ones known last. */
  function weakRank(state, id) {
    var c = state && state.cards && state.cards[id], E = root.Engine;
    if (!c) return 2;
    if (E && E.retired && E.retired(c)) return 0;
    if (c.reps === 0 && c.seen) return 4;
    if (c.d != null ? c.d >= 7 : (c.ease || 2.5) < 2.3) return 3;
    return 1;
  }

  /* The round: fifteen items of the three weeks, alternating weeks, the
     written ones first and the weak ones before the known; a few
     sentences of the duels that opened in those weeks, spread. */
  function build(course, end, state, opts) {
    opts = opts || {};
    end = +end;
    var size = opts.size || SIZE, rnd = opts.rnd;
    var map = opts.map || (root.Drills && root.Drills.itemsById ? root.Drills.itemsById(course) : {});
    var wks = [end - 2, end - 1, end].filter(function (n) { return n >= 1 && course.weeks[n - 1]; });
    // the duels of those weeks: up to three sentences, alternating sides
    var D = root.Duelli, duel = [];
    if (D && D.DUELLI) {
      var ds = D.DUELLI.filter(function (d) { return wks.indexOf(d.week) >= 0 && d.items && d.items.length; });
      var k = 0;
      while (duel.length < DUELS && ds.length && k < DUELS * 4) {
        var d = ds[k % ds.length];
        var cand = d.items.map(function (x, i) { return i; }).filter(function (i) {
          return !duel.some(function (it) { return it.id === "duel:" + d.id + ":" + i; });
        });
        cand = shuffle(cand, rnd).sort(function (a, b) { return weakRank(state, "duel:" + d.id + ":" + b) - weakRank(state, "duel:" + d.id + ":" + a); });
        if (cand.length) duel.push(D.item(d, cand[0]));
        k++;
      }
    }
    var want = size - duel.length;
    // per week: written first, then by weakness (random among equals)
    // (an item listed again in a later week belongs to the later one, as in the balance)
    var seen = {};
    var lists = wks.slice().reverse().map(function (n) {
      return shuffle((course.weeks[n - 1].items || []).map(function (id) { return map[id]; }), rnd)
        .filter(function (it) {
          if (!it || seen[it.id] || it.type === "listen" || it.type === "dictation") return false;
          seen[it.id] = 1;
          return true;
        })
        .map(function (it) { return { it: it, w: WRITTEN[it.type] && !it.options ? 1 : 0, k: weakRank(state, it.id) }; })
        .sort(function (a, b) { return (b.w - a.w) || (b.k - a.k); })
        .map(function (x) { return x.it; });
    }).reverse();
    // interleaved: one of each week in turn (Brunmair & Richter 2019)
    var out = [], i = 0, more = true;
    while (out.length < want && more) {
      more = false;
      lists.forEach(function (l) {
        if (out.length < want && l[i]) { out.push(l[i]); more = true; }
      });
      i++;
    }
    duel.forEach(function (it, j) { out.splice(Math.floor((j + 1) * (out.length + 1) / (duel.length + 1)), 0, it); });
    return out;
  }

  /* What block an answer belongs to: its duel, or the week of the block
     that lists it (an item can be listed again later: the latest). */
  function keyOf(id, course, end) {
    var m = /^duel:([^:]+):\d+$/.exec(id || "");
    if (m) return "d:" + m[1];
    for (var n = end; n >= end - 2; n--) {
      var w = course && course.weeks && course.weeks[n - 1];
      if (w && (w.items || []).indexOf(id) >= 0) return "w:" + n;
    }
    return null;
  }
  /* The end of the round: the first answers, by block, kept (the best
     score too).  → { pct, rows } */
  function roundDone(state, end, log, course) {
    end = +end;
    var RIGHT = root.Engine && root.Engine.VERDICT ? root.Engine.VERDICT.RIGHT : "giusto";
    // (the rules of a month ago, it.old, count here: they are what a station reviews)
    var firsts = (log || []).filter(function (l) { return !l.retry && !/:cue$/.test(l.id); });
    var by = {}, order = [], ok = 0;
    firsts.forEach(function (l) {
      var good = l.verdict === RIGHT || !!l.fixed, k = keyOf(l.id, course, end) || "w:" + end;
      if (good) ok++;
      if (!by[k]) { by[k] = { k: k, ok: 0, n: 0 }; order.push(k); }
      by[k].n++;
      if (good) by[k].ok++;
    });
    order.sort(function (a, b) {
      var da = a.charAt(0) === "d", db = b.charAt(0) === "d";
      if (da !== db) return da ? 1 : -1;
      return da ? (a < b ? -1 : 1) : +a.slice(2) - +b.slice(2);
    });
    var pct = firsts.length ? Math.round(ok / firsts.length * 100) : 0;
    if (!state.estacion || typeof state.estacion !== "object") state.estacion = {};
    var prev = state.estacion[end];
    state.estacion[end] = { pct: pct, best: Math.max(pct, prev && prev.best || 0), n: firsts.length, at: Date.now(),
                            rows: order.map(function (k) { return by[k]; }) };
    return { pct: pct, rows: state.estacion[end].rows };
  }

  function light(row) {
    var p = row.n ? row.ok / row.n * 100 : 0;
    return p >= GREEN ? "verde" : p >= YELLOW ? "amarillo" : "rojo";
  }
  var DOT = { verde: "🟢", amarillo: "🟡", rojo: "🔴" };
  function rowName(k, course) {
    if (k.charAt(0) === "d") {
      var d = root.Duelli && root.Duelli.byId ? root.Duelli.byId(k.slice(2)) : null;
      return "Duelo: " + (d ? d.title : k.slice(2));
    }
    var w = course && course.weeks && course.weeks[+k.slice(2) - 1];
    return "Semana " + k.slice(2) + (w && w.title ? " · " + w.title : "");
  }
  // «semana 2», «duelo: imperativo: tu o Lei»: only the first word lowercased
  // (a duel's title keeps its capitals: Lei, the German nouns)
  function shortName(k, course) {
    var n = rowName(k, course).split(" · ")[0];
    return n.charAt(0).toLowerCase() + n.slice(1);
  }
  function advice(k, l) {
    var duel = k.charAt(0) === "d";
    if (l === "verde") return "seguí así";
    if (l === "amarillo") return duel ? "jugá el duelo otra vez" : "repasala: su entrenamiento o Dominala";
    return duel ? "releé la regla del duelo y jugalo" : "volvé a su lección";
  }
  function weakRows(r) {
    return ((r && r.rows) || []).filter(function (x) { return x.n && light(x) !== "verde"; });
  }

  /* The balance, for the result of the round: one line per block. */
  function balanceHtml(state, end, course) {
    var r = rec(state, end);
    if (!r || !r.rows || !r.rows.length) return "";
    var weak = weakRows(r);
    return '<h3>🧭 Balance de la estación (semanas ' + (end - 2) + "-" + end + ')</h3><table class="res estbal">' +
      r.rows.map(function (x) {
        var l = light(x);
        return "<tr><td>" + DOT[l] + " " + esc(rowName(x.k, course)) + '<br><span class="muted small">' + advice(x.k, l) + "</span></td><td style=\"white-space:nowrap\">" +
          x.ok + "/" + x.n + "</td></tr>";
      }).join("") + "</table>" +
      '<p class="muted">' + (weak.length
        ? "Lo flojo: " + weak.map(function (x) { return esc(shortName(x.k, course)); }).join(", ") +
          ". Lo que fallaste vuelve solo en el repaso."
        : "Las tres semanas están firmes: seguí adelante.") + "</p>";
  }

  /* The optional mission of the week after the block. */
  function missions(w, state, course) {
    if (!w || !course) return [];
    var b = forWeek(course, w.week);
    if (!b) return [];
    var r = rec(state, b.end), ok = !!r && (r.best || 0) >= DONE;
    var sub;
    if (r) {
      var weak = weakRows(r);
      sub = (ok ? "Hecha · " : "Tu mejor: " + (r.best || 0) + " % · Te falta: " + DONE + " % · ") + "última: " + r.pct + " %" +
        (weak.length ? " · flojo: " + weak.map(function (x) { return shortName(x.k, course); }).join(", ")
                     : " · las tres semanas firmes");
    } else {
      sub = "Opcional · unos 15 minutos: " + SIZE + " ejercicios de las semanas " + b.weeks[0] + " a " + b.end +
        " mezclados, primero escribir, y un balance de lo que salió flojo";
    }
    return [{ kind: "estacion", arg: String(b.end), done: ok, half: !!r && !ok, opt: true, ico: "🧭",
              title: "Estación: repaso de las semanas " + b.weeks[0] + "-" + b.end, sub: sub }];
  }
  function handles(kind) { return kind === "estacion"; }

  var api = { SIZE: SIZE, DONE: DONE, ends: ends, forWeek: forWeek, build: build, roundDone: roundDone,
              light: light, balanceHtml: balanceHtml, missions: missions, handles: handles, record: rec };
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.Estacion = api;
})(typeof window !== "undefined" ? window : globalThis);
