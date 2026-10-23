/*
 * La grilla a la vista antes de escribir (auditorias/PLAN-2026-10-propuestas.md,
 * Tanda 3).  Los manuales y los exámenes (Al dente, CILS/CELI, Celpe-Bras,
 * Goethe) muestran los criterios y textos de muestra ya calificados antes de
 * producir; en la app la rúbrica aparecía recién después, en el tramo C1.
 *
 * Desde la semana `from` (14), la pantalla de Scrivi muestra arriba:
 * - la grilla: 4 filas con descriptores simples en castellano (qué se mira,
 *   cómo es una nota alta y una baja); si el paquete trae `context`, además
 *   el enunciador, el interlocutor, el propósito y el género de la consigna
 *   de esa semana (la adecuación del Celpe-Bras);
 * - el botón «Ver un texto de nota alta y uno de nota baja»: dos textos de
 *   muestra con 2 o 3 anotaciones cada uno, atadas a las filas;
 * - antes de revisar, la autoevaluación: 4 casillas, una por fila.
 * Al revisar, cada fila recibe una estimación local (largo y estructuras,
 * conectores, repeticiones, errores marcados por el corrector, que suma los
 * de la IA si hay clave) al lado de lo que marcó el alumno.
 *
 * Datos: docs/lang/<código>/grilla_data.js (GRILLA_DATA): from, rows
 * [{id, name, what, hi, lo, self, auto}], connectors, ignore, context
 * {<semana>: {e, i, p, g}}, samples [{from, task, hi, lo}].
 *
 *   Grilla.active(week, task)          ¿se muestra esta semana?
 *   Grilla.context(week)               {e, i, p, g} o null
 *   Grilla.sample(week)                el par de textos de muestra
 *   Grilla.connectors(text)            los conectores del texto
 *   Grilla.repeats(text)               las palabras repetidas de más
 *   Grilla.score(text, r, hard)        [{id, name, level 0-2, why}]
 *   Grilla.selfGet / selfSet(state, week[, k, v])
 *   Grilla.gridHtml(week)              la grilla (y el botón de los textos de muestra)
 *   Grilla.selfHtml(week, state)       las 4 casillas de la autoevaluación
 *   Grilla.samplesHtml(week)           los dos textos anotados
 *   Grilla.resultHtml(week, state, text, r, hard)   la devolución por fila
 *
 * Guarda en state.grilla = { <semana>: { s: [bool×4], at } }.
 * El núcleo no nombra ningún idioma.  Test: tools/lib/test_grilla.js.
 */
(function (root) {
  "use strict";

  var LEVEL = ["A trabajar", "Más o menos", "Bien"];
  var DOTS = ["●○○", "●●○", "●●●"];
  var LETTERS = "a-z\u00e0-\u00ff\u0100-\u024f";

  function D() { return root.GRILLA_DATA || null; }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  // *forma* → the form, in the language of the course
  function mk(s) {
    var L = root.LANG || {}, la = L.tts || L.code || "";
    return esc(s).replace(/\*([^*]+)\*/g, '<i' + (la ? ' lang="' + esc(la) + '"' : "") + ">$1</i>");
  }
  function rows() { var d = D(); return d && Array.isArray(d.rows) ? d.rows : []; }
  function from() { var d = D(); return d && d.from ? +d.from : 14; }

  function active(week, task) {
    return !!D() && rows().length === 4 && +week >= from() && !!task;
  }
  function context(week) {
    var d = D(), c = d && d.context ? d.context[+week] : null;
    return c && c.e && c.i && c.p && c.g ? c : null;
  }
  // The pair of the latest block that has started by this week.
  function sample(week) {
    var d = D(), best = null;
    ((d && d.samples) || []).forEach(function (s) {
      if (+s.from <= +week && (!best || +s.from > +best.from)) best = s;
    });
    return best;
  }

  function norm(text) { return " " + String(text || "").toLowerCase().replace(/[\u2019\u2018`\u00b4]/g, "'") + " "; }
  function words(text) {
    return String(text || "").toLowerCase().replace(/[\u2019\u2018`\u00b4]/g, "'")
      .split(new RegExp("[^" + LETTERS + "]+")).filter(Boolean);
  }
  function connectors(text) {
    var d = D(), t = norm(text), out = [];
    ((d && d.connectors) || []).forEach(function (c) {
      var k = String(c).toLowerCase();
      var re = new RegExp("[^" + LETTERS + "']" + k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/'/g, "'?") + "(?=[^" + LETTERS + "])");
      if (re.test(t) && out.indexOf(k) < 0) out.push(k);
    });
    return out;
  }
  // Words of four letters or more used more than the length allows (3 in a
  // short text; one more every 25 words), without the ones that always come back.
  function repeats(text) {
    var d = D(), ign = (d && d.ignore) || [], ws = words(text), n = {}, out = [];
    var max = Math.max(3, Math.ceil(ws.length / 25));
    ws.forEach(function (w) { if (w.length >= 4 && ign.indexOf(w) < 0) n[w] = (n[w] || 0) + 1; });
    Object.keys(n).forEach(function (w) { if (n[w] >= max) out.push([w, n[w]]); });
    return out.sort(function (a, b) { return b[1] - a[1]; });
  }

  /* One estimate per row (0-2), from what a program can see: never the
     whole grade (that the points are covered, the student sees it; with a
     key, the AI's errors come in the count). */
  function score(text, r, hard) {
    r = r || {};
    var nw = r.words || words(text).length, reqs = r.reqs || [];
    return rows().map(function (row) {
      var lv = 1, why = "";
      if (row.auto === "task") {
        var miss = reqs.filter(function (q) { return !q.ok; }), need = reqs.length ? reqs[0].need : 0;
        lv = !miss.length ? 2 : (miss.length <= reqs.length / 2 && nw >= need * 0.7) ? 1 : 0;
        why = !miss.length ? "Largo y estructuras pedidas: completos." : "Falta: " + miss.map(function (q) { return q.label; }).join(", ") + ".";
        why += " Si cubriste cada punto de la consigna, lo ves vos.";
      } else if (row.auto === "connectors") {
        var cs = connectors(text);
        lv = cs.length >= 3 ? 2 : cs.length ? 1 : 0;
        why = cs.length ? "Conectores: " + cs.map(function (c) { return "*" + c + "*"; }).join(", ") + " (" + cs.length + ")."
          : "No encontré conectores: ¿está todo unido con *e* o en frases sueltas?";
      } else if (row.auto === "variety") {
        var rp = repeats(text);
        lv = !rp.length ? 2 : rp.length === 1 ? 1 : 0;
        why = rp.length ? "Repetiste " + rp.slice(0, 3).map(function (x) { return "*" + x[0] + "* (" + x[1] + ")"; }).join(", ") + ": buscá otra forma de decirlo."
          : "Sin repeticiones llamativas.";
      } else if (row.auto === "errors") {
        var h = +hard || 0, rate = nw ? h * 100 / nw : 0;
        lv = !h ? 2 : rate <= 6 ? 1 : 0;
        why = h ? "El corrector marcó " + h + (h === 1 ? " error" : " errores") + " (los de arriba)." : "El corrector no marcó errores.";
      }
      return { id: row.id, name: row.name, level: lv, why: why };
    });
  }

  function store(state) {
    if (!state.grilla || typeof state.grilla !== "object" || Array.isArray(state.grilla)) state.grilla = {};
    return state.grilla;
  }
  function selfGet(state, week) {
    var g = state && state.grilla && state.grilla[week];
    var s = g && Array.isArray(g.s) ? g.s : [];
    return [0, 1, 2, 3].map(function (k) { return !!s[k]; });
  }
  function selfSet(state, week, k, v) {
    var g = store(state), s = selfGet(state, week);
    if (k >= 0 && k < 4) s[k] = !!v;
    g[week] = { s: s, at: Date.now() };
    return s;
  }

  function contextHtml(week) {
    var c = context(week);
    if (!c) return "";
    var d = D(), lab = (d && d.contextLabels) || { e: "Quién escribe", i: "A quién", p: "Para qué", g: "Género" };
    return '<ul class="gr-ctx">' + ["e", "i", "p", "g"].map(function (k) {
      return "<li><b>" + esc(lab[k]) + ":</b> " + mk(c[k]) + "</li>";
    }).join("") + "</ul>";
  }
  function gridHtml(week) {
    var d = D();
    return '<div class="card grilla" id="grilla"><h3>📏 ' + esc((d && d.title) || "La grilla") + "</h3>" +
      '<p class="muted small">' + esc((d && d.intro) || "Así se mira un texto en el examen. Leela antes de escribir.") + "</p>" +
      contextHtml(week) +
      '<ol class="gr-rows">' + rows().map(function (row) {
        return "<li><b>" + esc(row.name) + "</b> " + mk(row.what) +
          '<span class="gr-hl"><span>▲ ' + mk(row.hi) + "</span><span>▼ " + mk(row.lo) + "</span></span></li>";
      }).join("") + "</ol>" +
      '<button class="tab" id="grsamp">📊 Ver un texto de nota alta y uno de nota baja</button>' +
      '<div id="grsampout"></div></div>';
  }
  // The self-assessment, one box per row: before checking the text.
  function selfHtml(week, state) {
    var self = selfGet(state, week);
    return '<div class="card grself"><p><b>Antes de revisar:</b> marcá lo que ya cumplís.</p>' +
      rows().map(function (row, k) {
        return '<label class="gr-chk"><input type="checkbox" data-grself="' + k + '"' + (self[k] ? " checked" : "") + "> " + mk(row.self) + "</label>";
      }).join("") + "</div>";
  }
  function oneSample(x, kind) {
    if (!x) return "";
    var names = {};
    rows().forEach(function (r) { names[r.id] = r.name; });
    return '<div class="gr-sample ' + kind + '"><p><b>' + (kind === "hi" ? "▲ Nota alta" : "▼ Nota baja") +
      (x.grade ? " (" + esc(x.grade) + ")" : "") + "</b></p>" +
      '<p class="model gr-text"' + ((root.LANG || {}).tts ? ' lang="' + esc(root.LANG.tts) + '"' : "") + ">" + esc(x.t) + "</p>" +
      '<ul class="gr-notes">' + (x.notes || []).map(function (n) {
        return "<li>" + (names[n[0]] ? "<b>" + esc(names[n[0]]) + ":</b> " : "") + mk(n[1]) + "</li>";
      }).join("") + "</ul></div>";
  }
  function samplesHtml(week) {
    var s = sample(week);
    if (!s) return "";
    return '<p class="muted small">Consigna de los ejemplos: ' + mk(s.task) + "</p>" + oneSample(s.hi, "hi") + oneSample(s.lo, "lo") +
      '<p class="muted small">No son la única forma: fijate en qué los separa, fila por fila.</p>';
  }
  function resultHtml(week, state, text, r, hard) {
    if (!String(text || "").trim()) return "";
    var self = selfGet(state, week), sc = score(text, r, hard), any = self.some(Boolean);
    return '<div class="card grres"><h3>📏 Tu texto en la grilla</h3>' +
      '<ul class="gr-res">' + sc.map(function (x, k) {
        var warn = self[k] && x.level === 0;
        return "<li><b>" + esc(x.name) + '</b> <span class="gr-dots" title="' + LEVEL[x.level] + '">' + DOTS[x.level] + "</span> " +
          '<span class="muted small">' + LEVEL[x.level] + (any ? " · vos: " + (self[k] ? "✓" : "—") : "") + "</span><br>" +
          '<span class="small">' + mk(x.why) + (warn ? " Marcaste que sí: miralo de nuevo." : "") + "</span></li>";
      }).join("") + "</ul>" +
      (any ? "" : '<p class="muted small">No marcaste la autoevaluación: la próxima, marcala antes de revisar.</p>') +
      '<p class="muted small">Es una estimación de lo que un programa puede ver, no una nota.</p></div>';
  }

  var api = {
    active: active, context: context, sample: sample, rows: rows, connectors: connectors, repeats: repeats,
    score: score, selfGet: selfGet, selfSet: selfSet, gridHtml: gridHtml, selfHtml: selfHtml, samplesHtml: samplesHtml, resultHtml: resultHtml
  };
  if (typeof module === "object" && module.exports) module.exports = api;
  root.Grilla = api;
})(typeof window !== "undefined" ? window : globalThis);
