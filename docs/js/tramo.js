/*
 * Tramo C1: de la semana 27 a la 51 (la 39 es el jefe), cada semana suma
 * tres piezas que crecen en largo hasta el nivel del examen:
 *
 *   📰 Lectura larga (de ~350 a ~900 palabras) con preguntas en la lengua
 *      meta: la sirve letture.js como la serie «lunga», con el mismo lector,
 *      las glosas, el karaoke y la caza de formas.
 *   🎧 Escucha larga (de ~250 a ~600 palabras): un guion a dos voces
 *      (entrevista, podcast, debate) leído por las voces del teléfono, dos
 *      escuchas con las preguntas a la vista, después la transcripción.
 *   ✍️ Tarea integrada: un texto de un género (carta formal, reseña, síntesis,
 *      carta de lector, artículo…) que parte de lo leído o escuchado, de 120
 *      a 250 palabras mínimo, como la producción escrita del CILS / CELI y la
 *      tarea integrada del Celpe-Bras.
 *
 * Sin clave de IA, la tarea se revisa con criterios que no se engañan con
 * relleno: extensión, variedad léxica, puntos de la consigna cubiertos,
 * estructura del género, conectores y errores marcados por el corrector de
 * la semana.  Con clave, la IA la califica además con la rúbrica C1.
 * Nada oral: todo se lee, se escucha y se escribe.
 *
 * Los datos son del paquete (lang/<código>/tramo_data.js → window.TRAMO_DATA:
 * GENRES, SETTIMANE).  Lo que guarda, en state.tramo: asc {semana: {pct, ok,
 * n, at}}, scr {semana: {ok, n, punti, of, hard, at, ai}}, draft {semana:
 * texto}.
 */
(function (root) {
  "use strict";

  var H = null;           // the host (app.js)
  var cur = null;         // the open listening or task
  var saveTimer = null;
  var playing = 0;        // token of the listening in course (0: none)

  function D() { return root.TRAMO_DATA || { GENRES: {}, SETTIMANE: [] }; }
  function esc(s) { return H ? H.esc(s) : String(s); }
  function LG() { return root.LANG || {}; }
  function langAttr() { return ' lang="' + (LG().tts || LG().code || "") + '"'; }
  function VF() {
    var v = (root.LETTURE_DATA || {}).vf || {};
    return { prompt: v.prompt || "¿Verdadero, falso o no se dice?", options: v.options || ["verdadero", "falso", "no se dice"] };
  }

  function week(n) {
    var list = D().SETTIMANE || [];
    for (var i = 0; i < list.length; i++) if (list[i].week === n) return list[i];
    return null;
  }
  function weeks() { return (D().SETTIMANE || []).map(function (s) { return s.week; }); }

  function store(state) {
    var s = state || (H && H.state());
    if (!s.tramo || typeof s.tramo !== "object" || Array.isArray(s.tramo)) s.tramo = {};
    var t = s.tramo;
    ["asc", "scr", "draft"].forEach(function (k) { if (!t[k] || typeof t[k] !== "object" || Array.isArray(t[k])) t[k] = {}; });
    return t;
  }

  /* ------------------------------------------------------------ texto */

  function words(s) { return String(s || "").split(/\s+/).filter(function (x) { return /[A-Za-zÀ-ÿ]/.test(x); }).length; }
  function plain(s) { return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
  function tokens(s) { return plain(s).replace(/[^a-z'\s-]/g, " ").split(/[\s']+/).filter(Boolean); }
  function paragraphs(s) { return String(s || "").split(/\n\s*\n|\n/).map(function (p) { return p.trim(); }).filter(Boolean); }
  function scriptWords(a) { return words(a.turns.map(function (t) { return t[1]; }).join(" ")); }

  /* ------------------------------------------------- la revisión local */

  // Variety over the first 150 words (a type/token ratio needs a fixed
  // length to mean something): real texts of this level sit around 0,6;
  // a word repeated to fill the length falls far below.
  function variety(text) {
    var tk = tokens(text).slice(0, 150);
    if (tk.length < 40) return { ttr: 0, top: "", share: 0 };
    var seen = {}, count = {}, top = "", max = 0;
    tk.forEach(function (w) {
      seen[w] = 1;
      if (w.length < 4) return;
      count[w] = (count[w] || 0) + 1;
      if (count[w] > max) { max = count[w]; top = w; }
    });
    return { ttr: Object.keys(seen).length / tk.length, top: top, share: max / tk.length };
  }

  function connectors(text) {
    // The connectors of the language (escritos_data.js) and the ones of a
    // higher register (tramo_data.js); time words don't count as cohesion.
    var list = ((root.ESCRITOS_DATA || {}).conn || []).concat(D().CONNETTIVI || []);
    var t = " " + tokens(text).join(" ") + " ", found = {};
    list.forEach(function (c) {
      var k = plain(c);
      if (k.length < 3) return;   // «e», «o», «ma»: too common to show cohesion
      if (t.indexOf(" " + k + " ") >= 0) found[k] = 1;
    });
    return Object.keys(found);
  }

  // Share of the text copied from the week's reading or listening: runs of
  // five words that are also in the source.  A task built on a text asks
  // for its ideas in your own words.
  function copied(text, s) {
    var src = tokens(s.lettura.text + " " + s.ascolto.turns.map(function (t) { return t[1]; }).join(" ")), seen = {}, i;
    for (i = 0; i + 5 <= src.length; i++) seen[src.slice(i, i + 5).join(" ")] = 1;
    var tk = tokens(text), n = 0, hit = 0;
    for (i = 0; i + 5 <= tk.length; i++) { n++; if (seen[tk.slice(i, i + 5).join(" ")]) hit++; }
    return n ? hit / n : 0;
  }

  function rx(list) {
    return (list || []).map(function (s) { try { return new RegExp(s, "i"); } catch (e) { return null; } }).filter(Boolean);
  }

  // opts.noCheck: skip the week's checker (the slowest part; the tests use it
  // for the texts that must fail anyway).
  function evaluate(task, text, weekN, src, opts) {
    var g = (D().GENRES || {})[task.genre] || {};
    var n = words(text), pars = paragraphs(text), v = variety(text), plainText = plain(text);
    var punti = (task.punti || []).map(function (p) {
      return { label: p[0], ok: p[1].some(function (k) { return plainText.indexOf(plain(k)) >= 0; }) };
    });
    var puntiOk = punti.filter(function (p) { return p.ok; }).length;
    var puntiNeed = Math.ceil(punti.length * 0.6);
    var head = pars.slice(0, 2).join(" "), tail = pars.slice(-2).join(" ");
    var opens = rx(g.open), closes = rx(g.close);
    var conns = connectors(text);
    var chk = root.Scrivi && root.Scrivi.check && !(opts && opts.noCheck) ? root.Scrivi.check(text, weekN) : { findings: [], hard: 0 };
    var maxHard = Math.max(2, Math.floor(n / 50));
    var crit = [];
    crit.push({ id: "len", need: true, ok: n >= task.min,
      label: "Extensión: " + n + " palabras (" + task.min + "–" + task.max + ")" + (n > task.max ? " · te pasaste: en el examen, recortar también cuenta" : "") });
    crit.push({ id: "var", need: true, ok: n >= 40 && v.ttr >= 0.45 && v.share <= 0.08,
      label: n < 40 ? "Variedad léxica: todavía no hay texto suficiente para medirla"
        : v.ttr < 0.45 ? "Variedad léxica baja: se repiten mucho las mismas palabras"
        : v.share > 0.08 ? "«" + v.top + "» aparece demasiadas veces: buscá sinónimos o reformulá"
        : "Variedad léxica de este nivel" });
    var cp = src ? copied(text, src) : 0;
    if (src) crit.push({ id: "own", need: true, ok: cp <= 0.2,
      label: cp <= 0.2 ? "Con tus palabras: no copia frases del texto ni del audio"
        : Math.round(cp * 100) + " % del texto repite frases de la fuente: reformulá con tus palabras (citar una frase corta está bien)" });
    crit.push({ id: "punti", need: true, ok: puntiOk >= puntiNeed,
      label: "Consigna: " + puntiOk + " de " + punti.length + " puntos cubiertos" });
    if (opens.length) crit.push({ id: "open", ok: opens.some(function (r) { return r.test(head); }),
      label: "Apertura propia del género" + (g.openHint ? " (" + g.openHint + ")" : "") });
    if (closes.length) crit.push({ id: "close", ok: closes.some(function (r) { return r.test(tail); }),
      label: "Cierre propio del género" + (g.closeHint ? " (" + g.closeHint + ")" : "") });
    if (g.title) crit.push({ id: "title", ok: pars.length > 1 && words(pars[0]) <= 14 && !/[.:;]$/.test(pars[0]),
      label: "Un título en la primera línea" });
    crit.push({ id: "pars", ok: pars.length >= (g.paragraphs || 3),
      label: "Párrafos: " + pars.length + " (al menos " + (g.paragraphs || 3) + ", una idea cada uno)" });
    crit.push({ id: "conn", ok: conns.length >= 4,
      label: "Conectores distintos: " + conns.length + (conns.length ? " (" + conns.slice(0, 6).join(", ") + (conns.length > 6 ? "…" : "") + ")" : "") + " · al menos 4" });
    crit.push({ id: "err", ok: chk.hard <= maxHard,
      label: chk.hard ? chk.hard + " cosas marcadas por el corrector: revisalas abajo (a veces se equivoca con palabras citadas o poco comunes)" : "El corrector de la semana no marcó errores" });
    var ok = crit.filter(function (c) { return c.need; }).every(function (c) { return c.ok; });
    return { ok: ok, n: n, crit: crit, punti: punti, puntiOk: puntiOk, check: chk,
             score: crit.filter(function (c) { return c.ok; }).length, of: crit.length };
  }

  /* --------------------------------------------------------- misiones */

  function missions(w, state) {
    if (!w || w.boss) return [];
    var s = week(w.week);
    if (!s) return [];
    var t = store(state), out = [], a = t.asc[w.week], r = t.scr[w.week], g = (D().GENRES || {})[s.compito.genre] || {};
    out.push({ kind: "tr-asc", arg: String(w.week), done: !!a, ico: "🎧", title: "Escucha larga: " + s.ascolto.title,
      sub: a ? "Hecha · " + a.pct + " %" : esc(s.ascolto.genre) + " · unas " + scriptWords(s.ascolto) + " palabras · dos escuchas, preguntas en " + H.langName() });
    out.push({ kind: "tr-scr", arg: String(w.week), done: !!(r && r.ok), ico: "🖋️", title: "Tarea: " + (g.name || s.compito.genre),
      sub: r && r.ok ? "Entregada · " + r.n + " palabras · " + r.score + " / " + r.of + " criterios" + (r.ai ? " · IA " + r.ai.tot + " / 20" : "")
        : (r ? "Te falta: " + (r.miss || "revisar") + " · " : "") + s.compito.min + "–" + s.compito.max + " palabras a partir de " +
          (s.compito.fonte === "ascolto" ? "la escucha" : s.compito.fonte === "entrambi" ? "la lectura y la escucha" : "la lectura") });
    return out;
  }
  function handles(kind) { return kind === "tr-asc" || kind === "tr-scr"; }
  function owns(screen) { return screen === "tramo-asc" || screen === "tramo-scr"; }
  function go(kind, arg, from) { open(kind === "tr-asc" ? "asc" : "scr", +arg, from || "briefing"); }

  function open(kind, weekN, from) {
    var s = week(weekN);
    if (!s) return;
    stop();
    cur = { kind: kind, week: weekN, s: s, from: from || "briefing", plays: 0, done: null, check: null, ai: null };
    H.show(kind === "asc" ? "tramo-asc" : "tramo-scr");
  }
  function back() {
    stop();
    var from = cur ? cur.from : "briefing";
    cur = null;
    if (from === "leggi") H.go("leggi"); else H.toWeek();
  }

  /* ---------------------------------------------------------- escucha */

  function stop() {
    playing = 0;
    if (root.speechSynthesis) try { root.speechSynthesis.cancel(); } catch (e) { /* */ }
  }

  function questionsHtml(a, locked) {
    var vf = VF(), html = '<ol class="equestions">';
    a.questions.forEach(function (q, i) {
      html += "<li><b" + langAttr() + ">" + esc(q[0]) + "</b>" + cur.order[i].map(function (o) {
        return '<label class="eopt"' + langAttr() + '><input type="radio" name="tq' + i + '" value="' + esc(o) + '"' + (locked ? " disabled" : "") + "> " + esc(o) + "</label>";
      }).join("") + "</li>";
    });
    html += "</ol><h3" + langAttr() + ">" + esc(vf.prompt) + '</h3><ol class="equestions">';
    a.vf.forEach(function (v, i) {
      html += "<li><span" + langAttr() + ">" + esc(v[0]) + "</span>" + vf.options.map(function (o) {
        return '<label class="eopt"' + langAttr() + '><input type="radio" name="tv' + i + '" value="' + esc(o) + '"' + (locked ? " disabled" : "") + "> " + esc(o) + "</label>";
      }).join("") + "</li>";
    });
    return html + "</ol>";
  }

  function renderAsc() {
    var s = cur.s, a = s.ascolto, head = '<button class="btn ghost" id="trback">← ' + (cur.from === "leggi" ? "a " + esc(H.ui().read) : "a la semana") + "</button>" +
      "<h1>🎧 <span" + langAttr() + ">" + esc(a.title) + "</span></h1>" +
      '<p class="lead"><span' + langAttr() + ">" + esc(a.genre) + "</span> · " + esc(s.level) + " · unas " + scriptWords(a) + " palabras</p>";
    if (!cur.order) cur.order = a.questions.map(function (q) { return H.shuffle(q[1]); });
    var tts = !!root.speechSynthesis;
    if (cur.done) {
      var r = cur.done;
      return head + '<div class="card"><div class="scorebig"><b>' + r.pct + " %</b><span>" + r.ok + " / " + r.n + "</span></div>" +
        '<table class="res">' + r.detail.map(function (d) {
          return "<tr><td" + langAttr() + ">" + esc(d[0]) + "</td><td>" + (d[1] ? "✓" : "✗ <span" + langAttr() + ">" + esc(d[2]) + "</span>") + "</td></tr>";
        }).join("") + "</table></div>" +
        '<div class="card"><h3>Transcripción</h3>' + transcript(a) +
        (tts ? '<div class="row" style="margin-top:10px"><button class="btn" id="trplay">🔊 Escuchar de nuevo con el texto</button><button class="tab" id="trstop">⏹</button></div>' : "") +
        glossHtml(a.gloss) + "</div>" +
        '<div class="row" style="margin-top:12px"><button class="btn" id="trdone">Listo</button>' +
        '<button class="tab" id="trwrite">🖋️ Ir a la tarea</button></div>';
    }
    return head + '<div class="card"><p>' + esc(a.es) + "</p>" +
      '<p class="muted small">Hablan <b>' + esc(a.speakers[0]) + "</b> y <b>" + esc(a.speakers[1]) + "</b>, con dos voces distintas. " +
      "Leé las preguntas antes, escuchá <b>dos veces</b> y respondé. La transcripción aparece después.</p>" +
      (tts ? '<div class="center"><button class="bigplay" id="trplay">🔊</button><p class="muted" id="trstate">' + playState() + "</p>" +
        '<div class="row" style="justify-content:center"><span class="seg">' + [[0.9, "0,9×"], [1, "1×"]].map(function (x) {
          return '<button class="tab' + ((cur.rate || 1) === x[0] ? " on" : "") + '" data-trrate="' + x[0] + '">' + x[1] + "</button>";
        }).join("") + '</span><button class="tab" id="trstop">⏹</button></div></div>'
        : '<p class="note">Este navegador no tiene voces: leé la transcripción en su lugar.</p>' + transcript(a)) +
      questionsHtml(a, false) +
      '<button class="btn wide" id="trdeliver">Entregar</button></div>';
  }
  function playState() {
    return cur.plays >= 2 ? "Dos escuchas hechas: ya podés responder (y volver a escuchar si hace falta)" : "Escucha " + (cur.plays + 1) + " de 2";
  }
  function transcript(a) {
    return '<p class="model"' + langAttr() + ">" + a.turns.map(function (t) {
      return "<b>" + esc(a.speakers[t[0] === "A" ? 0 : 1]) + ":</b> " + esc(t[1]);
    }).join("<br>") + "</p>";
  }
  function glossHtml(g) {
    var k = Object.keys(g || {});
    if (!k.length) return "";
    return '<details class="trgloss"><summary>Palabras del audio</summary><ul>' + k.map(function (w) {
      return "<li><b" + langAttr() + ">" + esc(w) + "</b> — " + esc(g[w]) + "</li>";
    }).join("") + "</ul></details>";
  }

  function play() {
    var a = cur.s.ascolto, b = document.getElementById("trplay");
    if (playing) return;
    var token = playing = Date.now(), i = 0, rate = cur.rate || 1, t0 = Date.now();
    if (b) b.disabled = true;
    (function next() {
      if (playing !== token) return;
      if (i >= a.turns.length) {
        playing = 0;
        cur.plays++;
        H.listened(Math.min((Date.now() - t0) / 1000, scriptWords(a) / (2.2 * rate)));
        var st = document.getElementById("trstate"), bb = document.getElementById("trplay");
        if (st) st.textContent = playState();
        if (bb) bb.disabled = false;
        return;
      }
      var t = a.turns[i++], moved = false;
      // onend, or onerror, or (a voice that never answers) a generous timer
      var step = function () { if (moved) return; moved = true; clearTimeout(guard); next(); };
      var guard = setTimeout(step, (words(t[1]) / (1.6 * rate) + 4) * 1000);
      H.speak(t[1], true, 0.95 * rate, { keep: true, pitch: t[0] === "A" ? 0.92 : 1.1, vi: t[0] === "A" ? 0 : 1, onend: step, onerror: step });
    })();
  }

  function deliverAsc() {
    var a = cur.s.ascolto, vf = VF(), ok = 0, detail = [];
    a.questions.forEach(function (q, i) {
      var sel = document.querySelector('input[name="tq' + i + '"]:checked'), right = !!sel && sel.value === q[2];
      if (right) ok++;
      detail.push([q[0], right, q[2]]);
    });
    a.vf.forEach(function (v, i) {
      var sel = document.querySelector('input[name="tv' + i + '"]:checked'), right = !!sel && sel.value === v[1];
      if (right) ok++;
      detail.push([v[0], right, v[1]]);
    });
    var n = a.questions.length + a.vf.length, pct = Math.round(ok / n * 100);
    stop();
    cur.done = { ok: ok, n: n, pct: pct, detail: detail };
    var t = store(), prev = t.asc[cur.week];
    if (!prev || pct >= prev.pct) t.asc[cur.week] = { pct: pct, ok: ok, n: n, at: Date.now() };
    H.gain(ok * 3, "input");
    H.persist();
    H.render();
    root.scrollTo(0, 0);
  }

  /* ------------------------------------------------------------ tarea */

  function renderScr() {
    if (H.lexicon) H.lexicon();   // the checker knows every word of the course (readings included)
    var s = cur.s, c = s.compito, g = (D().GENRES || {})[c.genre] || {}, t = store(), rec = t.scr[cur.week];
    var draft = t.draft[cur.week] != null ? t.draft[cur.week] : (rec && rec.t) || "";
    var fonte = c.fonte === "ascolto" ? ["asc", "🎧 Volver a escuchar"] : ["read", "📰 Releer el texto"];
    var html = '<button class="btn ghost" id="trback">← ' + (cur.from === "leggi" ? "a " + esc(H.ui().read) : "a la semana") + "</button>" +
      "<h1>🖋️ <span" + langAttr() + ">" + esc(c.title) + "</span></h1>" +
      '<p class="lead">Tarea · ' + esc(g.name || c.genre) + " · " + esc(s.level) + " · semana " + cur.week + "</p>" +
      '<div class="card"><p' + langAttr() + ">" + esc(c.t) + "</p>" +
      '<p class="muted small">' + esc(c.es) + "</p>" +
      '<div class="row"><button class="tab" id="trsrc" data-src="' + fonte[0] + '">' + fonte[1] + "</button>" +
      (c.fonte === "entrambi" ? '<button class="tab" id="trsrc2">🎧 Volver a escuchar</button>' : "") + "</div>" +
      (g.hint ? '<p class="muted small">📐 ' + esc(g.hint) + "</p>" : "") + "</div>" +
      '<textarea id="trtext" class="grow scrivi" rows="12" spellcheck="false" autocapitalize="sentences"' + langAttr() + ">" + esc(draft) + "</textarea>" +
      '<p class="muted small" id="trcount">' + countLine(draft) + "</p>" +
      '<div class="row" style="margin-top:10px"><button class="btn" id="trcheck">🔎 Revisar y entregar</button>' +
      '<button class="tab" id="trmodel">👀 Modelo</button></div>' +
      '<div id="trout">' + (cur.check ? checkHtml(cur.check, draft) : "") + "</div>";
    return html;
  }
  function countLine(text) {
    var c = cur.s.compito, n = words(text);
    return n + " palabras · pedido: " + c.min + "–" + c.max + (n < c.min ? " · faltan " + (c.min - n) : n > c.max ? " · sobran " + (n - c.max) : " ✓");
  }

  function checkHtml(r, text) {
    var html = '<div class="card"><h3>' + (r.ok ? "✅ Entregada" : "Todavía no") + " · " + r.score + " / " + r.of + " criterios</h3>" +
      '<ul class="reqs">' + r.crit.map(function (c) {
        return '<li class="' + (c.ok ? "ok" : "") + '">' + (c.ok ? "✓" : c.need ? "✗" : "○") + " " + esc(c.label) + (c.need && !c.ok ? " <small class=\"muted\">(obligatorio)</small>" : "") + "</li>";
      }).join("") + "</ul>" +
      "<h3>Puntos de la consigna</h3><ul class=\"reqs\">" + r.punti.map(function (p) {
        return '<li class="' + (p.ok ? "ok" : "") + '">' + (p.ok ? "✓" : "○") + " " + esc(p.label) + "</li>";
      }).join("") + "</ul>" +
      '<p class="muted small">Es una revisión automática: mide lo que se puede medir (extensión, variedad, consigna, estructura, conectores, errores típicos), no la calidad del texto. ' +
      (H.aiKey() ? "La IA la califica con la rúbrica C1." : "Con una clave de IA (en " + esc(H.ui().me) + "), además se califica con la rúbrica C1.") + "</p>";
    if (r.check && r.check.findings && r.check.findings.length && root.Scrivi && root.Scrivi.markup) {
      html += "<h3>Lo que marcó el corrector</h3><p class=\"model\"" + langAttr() + ">" + root.Scrivi.markup(text, r.check.findings, esc) + "</p>" +
        '<ul class="small">' + r.check.findings.slice(0, 10).map(function (f) { return "<li>" + H.mk(f.msg) + "</li>"; }).join("") + "</ul>";
    }
    if (H.aiKey()) html += cur.ai === "…" ? '<p class="muted">🤖 La IA está leyendo tu texto…</p>'
      : cur.ai && cur.ai.err ? '<p class="muted">🤖 La IA no respondió (' + esc(cur.ai.err) + "). Probá de nuevo más tarde.</p>"
      : cur.ai ? aiHtml(cur.ai) : '<button class="btn" id="trai">🤖 Calificar con la rúbrica C1</button>';
    return html + "</div>";
  }
  function aiHtml(a) {
    var rub = ((LG().exam || {}).rubric) || [];
    return "<h3>🤖 Rúbrica C1: " + a.tot + " / 20</h3><p>" + rub.map(function (x) { return a.p[x[0]] != null ? esc(x[1]) + " " + a.p[x[0]] + "/5" : ""; }).filter(Boolean).join(" · ") + "</p>" +
      (a.comment ? "<p>" + esc(a.comment) + "</p>" : "") +
      (a.errors.length ? '<table class="res">' + a.errors.map(function (e) { return "<tr><td" + langAttr() + ">" + esc(e[0]) + "</td><td" + langAttr() + ">" + esc(e[1]) + "</td></tr>"; }).join("") + "</table>" : "");
  }
  // The AI's answer, only in the shape expected (anything else is dropped).
  function readAI(data) {
    var p = data && typeof data.punteggi === "object" && data.punteggi ? data.punteggi : {}, out = {}, tot = 0;
    Object.keys(p).forEach(function (k) { var v = +p[k]; if (isFinite(v)) { v = Math.max(0, Math.min(5, Math.round(v))); out[k] = v; tot += v; } });
    var errs = Array.isArray(data && data.errori) ? data.errori.filter(function (e) { return Array.isArray(e) && e.length >= 2; })
      .slice(0, 8).map(function (e) { return [String(e[0]), String(e[1])]; }) : [];
    var comment = data && typeof data.commento === "string" ? data.commento : "";
    return Object.keys(out).length ? { p: out, tot: Math.min(20, tot), comment: comment, errors: errs } : null;
  }

  function saveDraft(text) {
    var t = store();
    t.draft[cur.week] = String(text).slice(0, 6000);
    H.persist();
  }

  function deliverScr() {
    var box = document.getElementById("trtext");
    if (!box) return;
    var text = box.value, c = cur.s.compito;
    clearTimeout(saveTimer);
    saveDraft(text);
    var r = evaluate(c, text, cur.week, cur.s);
    cur.check = r;
    cur.ai = null;
    var t = store(), prev = t.scr[cur.week];
    var miss = r.crit.filter(function (x) { return x.need && !x.ok; }).map(function (x) {
      return x.id === "len" ? "extensión" : x.id === "var" ? "variedad léxica" : x.id === "own" ? "reformular con tus palabras" : "puntos de la consigna";
    }).join(", ");
    var rec = { ok: r.ok, n: r.n, score: r.score, of: r.of, punti: r.puntiOk, hard: r.check.hard, miss: miss, t: text.slice(0, 6000), at: Date.now(),
                ai: prev && prev.t === text ? prev.ai : null };
    if (!prev || !prev.ok || r.ok) t.scr[cur.week] = rec;
    if (r.ok && !(prev && prev.ok)) { H.gain(20 + Math.round(r.n / 10), "output"); H.toast("🖋️ Tarea entregada · " + r.n + " palabras"); }
    H.persist();
    var out = document.getElementById("trout");
    if (out) out.innerHTML = checkHtml(r, text);
    wireOut();
    if (out) out.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  function runAI() {
    var box = document.getElementById("trtext");
    if (!box || !root.Scrivi || !root.Scrivi.esame) return;
    var text = box.value, c = cur.s.compito, mine = cur, week0 = cur.week;
    cur.ai = "…";
    refreshOut(text);
    root.Scrivi.esame({ t: c.t, words: c.min + "-" + c.max }, text, H.aiKeys(), function (err, data) {
      if (cur !== mine) return;   // the learner left: nothing to show
      var a = err ? null : readAI(data);
      cur.ai = a || { err: err ? String(err.message || err) : "respuesta sin la forma esperada" };
      if (a) {
        var t = store(), rec = t.scr[week0];
        if (rec && rec.t === text) { rec.ai = { tot: a.tot }; H.persist(); }
      }
      if (H.screen() === "tramo-scr") refreshOut(text);
    });
  }
  function refreshOut(text) {
    var out = document.getElementById("trout");
    if (out && cur.check) { out.innerHTML = checkHtml(cur.check, text); wireOut(); }
  }
  function wireOut() {
    var b = document.getElementById("trai");
    if (b) b.onclick = runAI;
  }

  /* ----------------------------------------------------- en «Leggi» */

  function leggiHtml(state) {
    var list = D().SETTIMANE || [];
    if (!list.length) return "";
    var t = store(state), unlocked = Math.min(state.unlocked || 1, 52);
    var html = "<h2>🎧 " + esc(D().names && D().names.ascolto || "Escuchas largas") + "</h2>" +
      '<p class="muted">De la semana 27 en adelante, una escucha larga a dos voces por semana, con preguntas en ' + H.langName() + '. Se abren con su semana.</p><div class="eps">';
    list.forEach(function (s) {
      var open = s.week <= unlocked, d = t.asc[s.week];
      html += '<button class="ep' + (d ? " done" : "") + '" data-trasc="' + s.week + '"' + (open ? "" : " disabled") + ">" +
        '<span class="e">' + (open ? "🎧" : "🔒") + "</span><span><b" + langAttr() + ">" + esc(s.ascolto.title) + "</b>" +
        '<span class="muted">semana ' + s.week + " · " + esc(s.level) + " · " + (open ? "<span" + langAttr() + ">" + esc(s.ascolto.genre) + "</span>" : "se abre en la semana " + s.week) + "</span></span>" +
        (d ? '<span class="score">' + d.pct + "%</span>" : "") + "</button>";
    });
    return html + "</div>";
  }

  /* ------------------------------------------------------------- wire */

  function on(id, fn) { var b = document.getElementById(id); if (b) b.onclick = fn; }

  function wire(screen) {
    document.querySelectorAll("[data-trasc]").forEach(function (b) {
      b.onclick = function () { open("asc", +b.dataset.trasc, "leggi"); };
    });
    if (!owns(screen) && playing) stop();   // left the listening: silence it
    if (!owns(screen) || !cur) return;
    on("trback", back);
    on("trdone", back);
    if (screen === "tramo-asc") {
      on("trplay", play);
      on("trstop", function () { stop(); var b = document.getElementById("trplay"); if (b) b.disabled = false; });
      on("trdeliver", deliverAsc);
      on("trwrite", function () { open("scr", cur.week, cur.from); });
      document.querySelectorAll("[data-trrate]").forEach(function (b) {
        b.onclick = function () { cur.rate = +b.dataset.trrate; stop(); H.render(); };
      });
      return;
    }
    var box = document.getElementById("trtext"), cnt = document.getElementById("trcount");
    if (box) {
      box.addEventListener("input", function () {
        if (cnt) cnt.textContent = countLine(box.value);
        clearTimeout(saveTimer);
        var text = box.value;
        saveTimer = setTimeout(function () { saveDraft(text); }, 400);
      });
      box.addEventListener("blur", function () { clearTimeout(saveTimer); saveDraft(box.value); });
    }
    on("trcheck", deliverScr);
    wireOut();
    on("trmodel", function () {
      var out = document.getElementById("trout");
      if (!out) return;
      out.insertAdjacentHTML("afterbegin", '<div class="card"><h3>Un modelo</h3><p class="model"' + langAttr() + ">" +
        esc(cur.s.compito.model).replace(/\n\s*\n/g, "<br><br>") + '</p><p class="muted small">Es un texto posible, no el único: mirá cómo abre, cómo organiza los párrafos y cómo usa lo leído o escuchado.</p></div>');
      var b = document.getElementById("trmodel");
      if (b) b.disabled = true;
    });
    var src = function (kind) {
      if (box) { clearTimeout(saveTimer); saveDraft(box.value); }
      var from = cur.from, wk = cur.week;
      if (kind === "asc") open("asc", wk, from);
      else H.openReading("l-" + wk);
    };
    var s1 = document.getElementById("trsrc");
    if (s1) s1.onclick = function () { src(s1.dataset.src); };
    on("trsrc2", function () { src("asc"); });
  }

  function render(screen) {
    if (!cur) return '<button class="btn ghost" id="trback">← a la semana</button>';
    return screen === "tramo-asc" ? renderAsc() : renderScr();
  }

  // The long readings, as episodes of the «lunga» series (letture.js).
  function episodes() {
    return (D().SETTIMANE || []).map(function (s) {
      var l = s.lettura, e = {};
      Object.keys(l).forEach(function (k) { e[k] = l[k]; });
      e.id = "l-" + s.week; e.week = s.week; e.level = s.level; e.area = null;
      return e;
    });
  }

  function attach(host) { H = host; }

  var api = { attach: attach, missions: missions, handles: handles, owns: owns, go: go, open: open, render: render, wire: wire,
              leggiHtml: leggiHtml, episodes: episodes, evaluate: evaluate, variety: variety, connectors: connectors,
              week: week, weeks: weeks, words: words, copied: copied, readAI: readAI, stop: stop, busy: function () { return !!cur; } };
  if (typeof module === "object" && module.exports) module.exports = api;
  root.Tramo = api;
})(typeof window !== "undefined" ? window : globalThis);
