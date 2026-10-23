/*
 * Mediación: «Tu amiga no entendió: contale en castellano, en 2 frases, qué
 * pasó».  Una tarea opcional después de la escucha de la serie Radio (en la
 * pantalla del resultado del reproductor, js/tramo.js) y de algunas lecturas
 * (en el resultado de la ronda de la lectura, app.js).  Es la Sprachmittlung
 * del MCER 2020 (Begleitband): pasar a la propia lengua lo esencial de un
 * texto en la otra, para alguien que lo necesita.
 *
 * Sin IA se corrige con las claves de cada tarea: lo que tiene que estar
 * dicho (en castellano, con sinónimos y comienzos de palabra), más tres
 * controles que no se engañan con relleno: un mínimo de palabras, que esté
 * en castellano (no copiado de la lengua meta: MEDIACION_DATA.notEs) y,
 * como consejo, que sea corto (dos o tres frases).  Con clave, la IA lo lee
 * además como lo leería la amiga: si se entiende qué pasó.
 *
 *   Mediacion.task(key)              la tarea: "radio:12" o "lettura:ep4"
 *   Mediacion.evaluate(task, text)   {claves: [{label, ok}], hit, need, words,
 *                                     sentences, foreign: [...], ok, long}
 *   Mediacion.html(state, key)       el bloque plegado (vacío si no hay tarea)
 *   Mediacion.wire()                 los botones del bloque, si está en pantalla
 *   Mediacion.aiPrompt(task, text, source)
 *
 * Datos: lang/<código>/mediacion_data.js (window.MEDIACION_DATA), escrito a
 * mano.  Guarda en state.mediacion {key: {ok, hit, of, t, at, ai}}.
 * Test: tools/lib/test_mediacion.js.
 */
(function (root) {
  "use strict";

  var H = null;                       // the host (app.js)
  var MIN_WORDS = 8, LONG_WORDS = 70, LONG_SENT = 3, FOREIGN = 3, XP = 8;

  function D() { return root.MEDIACION_DATA || null; }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  // lower case, no accents, only letters and digits, single spaces
  function plain(s) {
    return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, " ").trim();
  }
  function words(s) { return plain(s).split(" ").filter(function (w) { return /[a-z]/.test(w); }); }
  function sentences(s) {
    return String(s || "").split(/[.!?…]+/).filter(function (x) { return /[A-Za-zÀ-ÿ]/.test(x); }).length;
  }
  // An expected form: the start of a word (or of a phrase's last word); the
  // short ones (3 letters or less: «mar», «tos») only as the whole word.
  function has(text, alt) {
    var a = plain(alt);
    if (!a) return false;
    return new RegExp("(^| )" + a + (a.length <= 3 ? "( |$)" : "")).test(text);
  }

  function task(key) {
    var d = D(), m = /^(radio|lettura):(.+)$/.exec(String(key || ""));
    if (!d || !m) return null;
    var t = m[1] === "radio" ? (d.radio || {})[m[2]] : (d.letture || {})[m[2]];
    return t && t.claves && t.claves.length ? t : null;
  }
  function need(t) { return t.need || Math.max(2, t.claves.length - 1); }

  function evaluate(t, text) {
    var p = plain(text), w = words(text);
    var claves = t.claves.map(function (c) { return { label: c[0], ok: c[1].some(function (a) { return has(p, a); }) }; });
    var hit = claves.filter(function (c) { return c.ok; }).length, notEs = (D() || {}).notEs || [];
    var foreign = w.filter(function (x) { return notEs.indexOf(x) >= 0; });
    var n = sentences(text);
    var r = { claves: claves, hit: hit, need: need(t), words: w.length, sentences: n, foreign: foreign,
              long: w.length > LONG_WORDS || n > LONG_SENT };
    r.ok = hit >= r.need && w.length >= MIN_WORDS && foreign.length < FOREIGN;
    return r;
  }

  function store(state) {
    var s = state || {};
    if (!s.mediacion || typeof s.mediacion !== "object" || Array.isArray(s.mediacion)) s.mediacion = {};
    return s.mediacion;
  }

  // The source text, for the AI: the episode's transcript or the reading.
  function source(key) {
    var m = /^(radio|lettura):(.+)$/.exec(String(key || ""));
    if (!m) return "";
    if (m[1] === "radio") {
      var R = root.Radio, e = R && R.episode(+m[2]);
      return e ? R.transcript(e) : "";
    }
    var L = root.Letture, ep = L && L.byId ? L.byId(m[2]) : null;
    return ep ? String(ep.text || "") : "";
  }

  /* ------------------------------------------------------------ pantalla */

  var cur = null;   // {key, text, r, ai}: what the open block shows

  function html(state, key) {
    var t = task(key);
    if (!t) return "";
    var rec = store(state)[key];
    if (!cur || cur.key !== key) cur = { key: key, text: rec ? rec.t || "" : "", r: null, ai: null };
    var d = D();
    return '<details class="card med" id="med" data-med="' + esc(key) + '"' + (cur.r ? " open" : "") + ">" +
      "<summary>🗣️ <b>" + esc(d.amiga || "Tu amiga") + " no entendió</b>: contale en castellano qué pasó" +
        ' <span class="muted small" id="medstate">' + (rec && rec.ok ? "· ✓ hecho" : "· opcional") + "</span></summary>" +
      '<p class="muted small">No escuchó (o no leyó) y no sabe el idioma. Contáselo en <b>2 frases</b>, con tus palabras, ' +
        "como se lo dirías por mensaje: lo importante, no todo.</p>" +
      '<p><b>Quiere saber:</b> ' + esc(t.pide) + "</p>" +
      '<textarea id="medtext" class="grow scrivi" rows="4" lang="es" data-es="1" spellcheck="true" autocapitalize="sentences" placeholder="Mirá, lo que pasó es que…">' + esc(cur.text) + "</textarea>" +
      '<p class="muted small" id="medcount">' + countLine(cur.text) + "</p>" +
      '<div class="row"><button class="btn" id="medcheck">Revisar</button></div>' +
      '<div id="medout">' + outHtml(t) + "</div></details>";
  }
  function countLine(text) {
    var n = words(text).length, s = sentences(text);
    return n ? n + " palabras · " + s + (s === 1 ? " frase" : " frases") : "Dos frases alcanzan.";
  }
  function outHtml(t) {
    if (!cur || !cur.r) return "";
    var r = cur.r, out = '<table class="res">' + r.claves.map(function (c) {
      return "<tr><td>" + esc(c.label) + "</td><td>" + (c.ok ? "✓" : "✗") + "</td></tr>";
    }).join("") + "</table>";
    var notes = [];
    if (r.words < MIN_WORDS) notes.push("Muy corto: con " + MIN_WORDS + " palabras o más se entiende qué pasó.");
    if (r.foreign.length >= FOREIGN) notes.push("Parece que quedó en el otro idioma (" + r.foreign.slice(0, 4).map(esc).join(", ") +
      "): tu amiga habla castellano.");
    if (r.long) notes.push("Está bien, pero es largo: la idea es lo esencial, en dos o tres frases.");
    out += r.ok
      ? '<p class="note">✅ Se entiende: ' + r.hit + " de " + r.claves.length + " cosas importantes." + (r.hit < r.claves.length ? " Lo que falta no es imprescindible." : "") + "</p>"
      : '<p class="note">' + (r.hit < r.need ? "Le faltan datos: tu amiga necesita al menos " + r.need + " de estas " + r.claves.length + " cosas (tienen ✗ las que no encontré). " : "") +
        "Volvé a mirar " + (/^radio:/.test(cur.key) ? "la transcripción" : "el texto") + " y probá de nuevo.</p>";
    notes.forEach(function (x) { out += '<p class="muted small">' + x + "</p>"; });
    out += '<details><summary>Una versión posible</summary><p lang="es">' + esc(t.modelo) + "</p>" +
      '<p class="muted small">Hay muchas formas de contarlo: esta es una. La corrección busca las ideas, no estas palabras.</p></details>';
    if (H && H.aiKey && H.aiKey()) {
      if (cur.ai === "…") out += '<p class="muted small">⏳ Se lo estoy mostrando a la IA…</p>';
      else if (cur.ai && cur.ai.err) out += '<p class="muted small">No pude usar la IA (' + esc(cur.ai.err) + ').</p><button class="tab" id="medai">🤖 Probar otra vez</button>';
      else if (cur.ai) out += '<div class="aiout"><p>🤖 ' + (cur.ai.ok ? "✅ " : "🟡 ") + esc(cur.ai.comentario) + "</p>" +
        (cur.ai.falta ? '<p class="muted small">Le faltó: ' + esc(cur.ai.falta) + "</p>" : "") + "</div>";
      else out += '<button class="tab" id="medai">🤖 ¿Lo entendería? Que lo lea la IA</button>';
    }
    return out;
  }

  function check() {
    var box = document.getElementById("medtext"), t = cur && task(cur.key);
    if (!box || !t) return;
    var text = box.value.trim();
    if (!text) { if (H && H.toast) H.toast("Escribí primero qué le contarías."); return; }
    cur.text = text;
    cur.r = evaluate(t, text);
    cur.ai = null;
    var state = H ? H.state() : null, s = store(state), prev = s[cur.key];
    var first = cur.r.ok && !(prev && prev.ok);
    if (!prev || !prev.ok || cur.r.ok) s[cur.key] = { ok: cur.r.ok, hit: cur.r.hit, of: cur.r.claves.length, t: text.slice(0, 1200), at: Date.now() };
    if (first && H && H.gain) { H.gain(XP, "input"); if (H.toast) H.toast("🗣️ Bien contado: +" + XP + " xp"); }
    if (H && H.persist) H.persist();
    var st = document.getElementById("medstate");
    if (st && s[cur.key] && s[cur.key].ok) st.textContent = "· ✓ hecho";
    refresh();
  }
  function refresh() {
    var out = document.getElementById("medout"), t = cur && task(cur.key);
    if (out && t) out.innerHTML = outHtml(t);
    var b = document.getElementById("medai");
    if (b) b.onclick = runAI;
  }

  /* ------------------------------------------------------------------ IA */

  function aiPrompt(t, text, src) {
    return "Un alumno hispanohablante (Argentina) que aprende " + ((root.LANG && root.LANG.ui && root.LANG.ui.langEs) || "otro idioma") +
      " escuchó o leyó el texto de abajo. La consigna: «Tu amiga no entendió: contale en castellano, en 2 frases, qué pasó». " +
      "La amiga no habla el idioma y quiere saber: " + t.pide +
      "\n\nTexto original:\n" + String(src || "").slice(0, 4000) +
      "\n\nLo esencial que tendría que estar (no hace falta todo, ni con estas palabras): " + t.claves.map(function (c) { return c[0]; }).join("; ") +
      "\n\nLo que escribió el alumno:\n" + String(text || "").slice(0, 1200) +
      "\n\nLeelo como lo leería la amiga. ¿Entendería qué pasó, sin errores de contenido? No corrijas la ortografía ni el estilo, salvo que cambien el sentido. " +
      "Si dice algo que el texto no dice, marcalo. Respondé en castellano rioplatense (vos), en 1 o 2 oraciones, sin comillas dobles ni HTML. " +
      "Respondé SOLO con JSON: {\"ok\": true o false, \"comentario\": \"...\", \"falta\": \"lo importante que falta o que está mal, o vacío\"}";
  }
  function runAI() {
    var t = cur && task(cur.key);
    if (!t || !cur.text || !root.IA || !H || !H.aiKeys) return;
    var mine = cur;
    cur.ai = "…";
    refresh();
    root.IA.llm(aiPrompt(t, cur.text, source(cur.key)), H.aiKeys(), function (err, data) {
      if (cur !== mine) return;
      if (err || !data || typeof data.comentario !== "string") {
        cur.ai = { err: err ? String(err.message || err) : "respuesta sin la forma esperada" };
      } else {
        cur.ai = { ok: !!data.ok, comentario: data.comentario.slice(0, 600), falta: String(data.falta || "").slice(0, 400) };
        var rec = store(H.state())[cur.key];
        if (rec && rec.t === cur.text.slice(0, 1200)) { rec.ai = cur.ai.ok; H.persist(); }
      }
      refresh();
    }, { max: 600 });
  }

  function wire() {
    if (typeof document === "undefined" || !document) return;
    var box = document.getElementById("medtext"), el = document.getElementById("med");
    if (!box || !el) return;
    if (!cur || cur.key !== el.getAttribute("data-med")) cur = { key: el.getAttribute("data-med"), text: box.value, r: null, ai: null };
    var cnt = document.getElementById("medcount");
    box.addEventListener("input", function () { cur.text = box.value; if (cnt) cnt.textContent = countLine(box.value); });
    var b = document.getElementById("medcheck");
    if (b) b.onclick = check;
    refresh();
  }

  function attach(host) { H = host; }

  var api = { attach: attach, task: task, evaluate: evaluate, need: need, plain: plain, has: has, html: html, wire: wire,
              store: store, source: source, aiPrompt: aiPrompt,
              MIN_WORDS: MIN_WORDS, LONG_WORDS: LONG_WORDS, FOREIGN: FOREIGN,
              _check: check, _reset: function () { cur = null; } };
  if (typeof module === "object" && module.exports) module.exports = api;
  root.Mediacion = api;
})(typeof window !== "undefined" ? window : globalThis);
