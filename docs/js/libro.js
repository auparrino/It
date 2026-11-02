/*
 * Lectura guiada: una novela entera en el original, oración por oración.
 *
 * El texto del libro NO está en la app (ni en el repositorio): el alumno
 * carga en su teléfono un «paquete de libro» (un .json que armó
 * tools/lib/libro_paquete.py a partir de su propio ePub), que queda en
 * IndexedDB, solo en ese teléfono.  Cada idioma ve los paquetes de su
 * lengua (pack.lang === LANG.code).
 *
 * El paquete:
 *   { app: "c1-libro", v: 1, id, lang, title, author, year, credit,
 *     parts: [{ t, tr: [índices de tramos] }],
 *     tramos: [{ id, part, p: [ {h, sub} | [sid, sid…] ], resumen, contexto,
 *                vocab: [[palabra, significado]], gramatica: [{t, x, ej}],
 *                preguntas: [{q, a}] }],
 *     s: { sid: { t: original, es, g: [[forma, significado]], n, std, lit } } }
 *
 * Un tramo es una lección (≈ 1500 palabras): 1) antes de leer (contexto y
 * vocabulario), 2) la lectura, una oración a la vez, con su explicación
 * (traducción, glosas, nota, alemán estándar si es dialecto, palabra por
 * palabra si la estructura cambia mucho) — tocar cualquier oración la
 * elige —, 3) la gramática del tramo con sus ejemplos y 4) las preguntas
 * de comprensión.  Terminar un tramo da xp y lo marca; el lector recuerda
 * dónde quedaste (state.libros[id] = {t, i, done}).
 *
 * La lógica sin DOM (validar el paquete, la posición, los ids de un tramo)
 * se prueba en node: tools/lib/test_libro.js.  La interfaz la llama app.js:
 * Libro.init(host), owns(pantalla), render(pantalla), wire(pantalla),
 * card() (la tarjeta de «Ich» / «Io» / «Eu»).
 */
(function (root) {
  "use strict";

  var DB = "c1-libros", STORE = "packs";
  var XP_TRAMO = 25;
  var H = null;                 // host (app.js)
  var packs = {};               // id → paquete cargado en memoria
  var list = null;              // [{id, lang, title, author, year, n}] de IndexedDB
  var ui = { book: null, step: 0, show: true, msg: "" };

  /* ------------------------------------------------------------ lógica */

  function validate(p) {
    if (!p || typeof p !== "object") return "no es un paquete de libro";
    if (p.app !== "c1-libro") return "no es un paquete de libro (falta «app: c1-libro»)";
    if (!p.id || !p.lang || !p.title) return "al paquete le falta id, idioma o título";
    if (!Array.isArray(p.tramos) || !p.tramos.length) return "el paquete no trae tramos";
    if (!p.s || typeof p.s !== "object") return "el paquete no trae oraciones";
    return "";
  }
  // The sentence ids of a tramo, in order.
  function ids(tr) {
    var out = [];
    (tr.p || []).forEach(function (x) { if (Array.isArray(x)) out.push.apply(out, x); });
    return out;
  }
  function progress(state, id) {
    if (!state.libros) state.libros = {};
    if (!state.libros[id]) state.libros[id] = { t: 0, i: 0, done: {} };
    return state.libros[id];
  }
  function doneCount(state, pack) {
    var pr = (state.libros || {})[pack.id];
    return pr ? Object.keys(pr.done || {}).length : 0;
  }
  function meta(p) {
    return { id: p.id, lang: p.lang, title: p.title, author: p.author || "", year: p.year || "",
             n: p.tramos.length, sents: Object.keys(p.s).length };
  }

  /* ------------------------------------------------------------ IndexedDB */

  function idb() {
    return new Promise(function (ok, ko) {
      if (!root.indexedDB) return ko(new Error("este navegador no guarda archivos grandes (sin IndexedDB)"));
      var rq = root.indexedDB.open(DB, 1);
      rq.onupgradeneeded = function () { rq.result.createObjectStore(STORE, { keyPath: "id" }); };
      rq.onsuccess = function () { ok(rq.result); };
      rq.onerror = function () { ko(rq.error || new Error("no se pudo abrir el almacenamiento")); };
    });
  }
  function tx(mode, fn) {
    return idb().then(function (db) {
      return new Promise(function (ok, ko) {
        var t = db.transaction(STORE, mode), st = t.objectStore(STORE), out = fn(st);
        t.oncomplete = function () { ok(out && out.result !== undefined ? out.result : out); };
        t.onerror = function () { ko(t.error); };
        t.onabort = function () { ko(t.error || new Error("se canceló")); };
      });
    });
  }
  function loadList() {
    return tx("readonly", function (st) { return st.getAll(); }).then(function (all) {
      list = (all || []).map(function (r) { return r.meta; });
      return list;
    });
  }
  function getPack(id) {
    if (packs[id]) return Promise.resolve(packs[id]);
    return tx("readonly", function (st) { return st.get(id); }).then(function (r) {
      if (!r) throw new Error("ese libro ya no está en el teléfono");
      packs[id] = r.pack;
      return r.pack;
    });
  }
  function savePack(p) {
    return tx("readwrite", function (st) { return st.put({ id: p.id, meta: meta(p), pack: p }); }).then(function () {
      packs[p.id] = p;
      return loadList();
    });
  }
  function dropPack(id) {
    delete packs[id];
    return tx("readwrite", function (st) { return st["delete"](id); }).then(loadList);
  }

  /* ------------------------------------------------------------ interfaz */

  function esc(s) { return H.esc(s); }
  // *forma* → <i>forma</i> (las notas marcan así las formas).
  function mk(s) { return esc(s).replace(/\*([^*]+)\*/g, "<i>$1</i>"); }
  function lang() { return (root.LANG && root.LANG.code) || ""; }
  function tts() { return (root.LANG && root.LANG.tts) || ""; }
  function mine() { return (list || []).filter(function (m) { return m.lang === lang(); }); }

  // The card in Ich / Io / Eu.
  function card() {
    if (list === null) { loadList().then(function () { if (H.view().screen === "io") H.render(); }).catch(function () { list = []; }); return ""; }
    var state = H.state();
    var books = mine().map(function (m) {
      var d = doneCount(state, m);
      return '<button class="lab" data-libro="' + esc(m.id) + '"><span class="e">📕</span><b>' + esc(m.title) + "</b>" +
        '<span class="muted">' + esc(m.author) + " · " + d + " / " + m.n + " tramos</span></button>";
    }).join("");
    return '<div class="card"><h2>📕 Lectura guiada</h2>' +
      '<p class="muted small">Una novela entera en el original, oración por oración: traducción, palabras, gramática y preguntas por tramo. ' +
      "El libro lo cargás vos (un archivo .json) y queda solo en este teléfono.</p>" +
      (books ? '<div class="labs">' + books + "</div>" : "") +
      '<button class="btn ghost" id="lbopen">📥 Cargar un libro</button></div>';
  }

  function renderShelf() {
    var rows = mine().map(function (m) {
      return '<div class="row lb-row"><span><b>' + esc(m.title) + '</b> <span class="muted small">' + esc(m.author) + " · " + m.sents + " oraciones</span></span>" +
        '<button class="tab" data-lbdel="' + esc(m.id) + '">🗑️ Borrar</button></div>';
    }).join("");
    return '<button class="btn ghost" id="lbback">← ' + esc(H.ui().me) + "</button><h1>📕 Lectura guiada</h1>" +
      '<div class="card"><p>Elegí el archivo <b>.json</b> del libro (el «paquete» que te pasaron). Se guarda en este teléfono; no se sube a ningún lado.</p>' +
      '<input type="file" id="lbfile" accept=".json,application/json">' +
      (ui.msg ? '<p class="small">' + esc(ui.msg) + "</p>" : "") + "</div>" +
      (rows ? '<div class="card"><h2>En este teléfono</h2>' + rows + "</div>" : "") +
      '<p class="muted small">Cada curso muestra los libros de su idioma.</p>';
  }

  function renderBook(p) {
    var state = H.state(), pr = progress(state, p.id);
    var cur = p.tramos[Math.min(pr.t, p.tramos.length - 1)];
    var html = '<button class="btn ghost" id="lbback">← ' + esc(H.ui().me) + "</button>" +
      "<h1>" + esc(p.title) + "</h1><p class=\"muted\">" + esc(p.author) + (p.year ? " · " + esc(p.year) : "") + "</p>" +
      '<div class="card"><p>' + doneCount(state, p) + " de " + p.tramos.length + " tramos terminados.</p>" +
      '<button class="btn wide" data-lbtr="' + pr.t + '">▶ Seguir: tramo ' + (pr.t + 1) + (cur ? " · " + esc(chapterOf(cur)) : "") + "</button></div>";
    (p.parts || [{ t: "", tr: p.tramos.map(function (x, i) { return i; }) }]).forEach(function (part) {
      html += '<div class="card"><h2>' + esc(part.t) + '</h2><div class="eps">' + part.tr.map(function (i) {
        var tr = p.tramos[i], d = pr.done[tr.id];
        return '<button class="ep' + (d ? " done" : "") + '" data-lbtr="' + i + '"><span class="e">' + (d ? "✓" : i === pr.t ? "▶" : "·") + "</span><span><b>Tramo " + (i + 1) +
          "</b><span class=\"muted\">" + esc(chapterOf(tr)) + " · " + ids(tr).length + " oraciones</span></span></button>";
      }).join("") + "</div></div>";
    });
    if (p.credit) html += '<p class="muted small">' + esc(p.credit) + "</p>";
    return html;
  }
  function chapterOf(tr) {
    var h = (tr.p || []).filter(function (x) { return !Array.isArray(x); }).map(function (x) { return x.h; });
    return h.length ? h.join(" · ") : (tr.ch || tr.part || "");
  }

  // The tramo: 0 before reading, 1 reading, 2 grammar, 3 questions.
  function renderTramo(p) {
    var state = H.state(), pr = progress(state, p.id), tr = p.tramos[pr.t], all = ids(tr);
    if (pr.i >= all.length) pr.i = 0;
    var steps = ["Antes de leer", "Lectura", "Gramática", "Preguntas"];
    var head = '<button class="btn ghost" id="lbbook">← ' + esc(p.title) + "</button>" +
      "<h1>Tramo " + (pr.t + 1) + ' <small class="muted">de ' + p.tramos.length + "</small></h1>" +
      '<p class="muted">' + esc(tr.part) + (chapterOf(tr) ? " · " + esc(chapterOf(tr)) : "") + "</p>" +
      '<div class="row lb-steps">' + steps.map(function (s, k) {
        return '<button class="tab' + (ui.step === k ? " on" : "") + '" data-lbstep="' + k + '" aria-pressed="' + (ui.step === k) + '">' + (k + 1) + ". " + s + "</button>";
      }).join("") + "</div>";
    var body = "";
    if (ui.step === 0) {
      body = '<div class="card">' + (tr.contexto ? "<h2>Contexto</h2><p>" + mk(tr.contexto) + "</p>" : "") +
        "<h2>Palabras para este tramo</h2><table class=\"res\">" + (tr.vocab || []).map(function (v) {
          return '<tr><td lang="' + tts() + '"><b>' + esc(v[0]) + "</b></td><td>" + mk(v[1] || "") + "</td></tr>";
        }).join("") + "</table>" +
        '<details class="lb-sum"><summary>Resumen del tramo (si querés leerlo antes)</summary><p>' + mk(tr.resumen || "") + "</p></details>" +
        '<button class="btn wide" data-lbstep="1">📖 Empezar a leer</button></div>';
    } else if (ui.step === 1) {
      body = renderReading(p, tr, all, pr);
    } else if (ui.step === 2) {
      body = '<div class="card"><h2>Gramática y estilo del tramo</h2>' + (tr.gramatica || []).map(function (g) {
        return '<div class="lb-gr"><h3>' + esc(g.t) + "</h3><p>" + mk(g.x) + "</p>" + (g.ej || []).map(function (id) {
          var s = p.s[id];
          return s ? '<p class="lb-ej"><span lang="' + tts() + '">' + esc(s.t) + '</span><br><small class="muted">' + esc(s.es) + "</small></p>" : "";
        }).join("") + "</div>";
      }).join("") + '<button class="btn wide" data-lbstep="3">Preguntas →</button></div>';
    } else {
      var d = pr.done[tr.id];
      body = '<div class="card"><h2>¿Entendiste?</h2><p class="muted small">Contestá en tu cabeza (o en voz alta) y después tocá para ver la respuesta.</p>' +
        (tr.preguntas || []).map(function (q) {
          return '<details class="lb-q"><summary>' + mk(q.q) + "</summary><p>" + mk(q.a) + "</p></details>";
        }).join("") +
        '<details class="lb-sum"><summary>Resumen del tramo</summary><p>' + mk(tr.resumen || "") + "</p></details>" +
        '<div class="row" style="margin-top:12px">' +
        (d ? '<p class="small">✓ Tramo terminado.</p>' : '<button class="btn" id="lbdone">✓ Terminé el tramo (+' + XP_TRAMO + " xp)</button>") +
        (pr.t + 1 < p.tramos.length ? '<button class="btn ghost" data-lbtr="' + (pr.t + 1) + '">Tramo ' + (pr.t + 2) + " →</button>" : "") +
        "</div></div>";
    }
    return head + body;
  }

  function renderReading(p, tr, all, pr) {
    var curId = all[pr.i], s = p.s[curId] || {};
    var text = (tr.p || []).map(function (x) {
      if (!Array.isArray(x)) return '<h3 class="lb-h">' + esc(x.h) + (x.sub ? ' <small class="muted">' + esc(x.sub) + "</small>" : "") + "</h3>";
      return '<p class="lb-p" lang="' + tts() + '">' + x.map(function (id) {
        var o = p.s[id] || {}, k = all.indexOf(id);
        return '<span class="lb-s' + (id === curId ? " cur" : k < pr.i ? " read" : "") + '" data-lbs="' + k + '">' + esc(o.t || "") + "</span>";
      }).join(" ") + "</p>";
    }).join("");
    var ex = '<div class="lb-ex" aria-live="polite">' +
      '<p class="lb-cur" lang="' + tts() + '"><b>' + esc(s.t || "") + "</b></p>" +
      (ui.show ? (
        '<p class="lb-es">' + esc(s.es || "") + "</p>" +
        (s.std ? '<p class="small"><span class="muted">Estándar:</span> <span lang="' + tts() + '">' + esc(s.std) + "</span></p>" : "") +
        (s.lit ? '<p class="small"><span class="muted">Palabra por palabra:</span> ' + esc(s.lit) + "</p>" : "") +
        ((s.g || []).length ? '<ul class="lb-g">' + s.g.map(function (g) {
          return '<li><b lang="' + tts() + '">' + esc(g[0]) + "</b> — " + mk(g[1] || "") + "</li>";
        }).join("") + "</ul>" : "") +
        (s.n ? '<p class="small lb-n">💡 ' + mk(s.n) + "</p>" : "")
      ) : '<p class="muted small">Tratá de entenderla sola. Tocá «Explicación» para verla.</p>') +
      '<div class="row lb-nav">' +
      '<button class="btn ghost" id="lbprev"' + (pr.i ? "" : " disabled") + ">←</button>" +
      '<button class="tab" id="lbsay">🔊</button>' +
      '<button class="tab" id="lbshow" aria-pressed="' + ui.show + '">' + (ui.show ? "🙈 Ocultar" : "💬 Explicación") + "</button>" +
      (pr.i + 1 < all.length ? '<button class="btn" id="lbnext">→</button>' : '<button class="btn" data-lbstep="2">Gramática →</button>') +
      "</div><p class=\"muted small\">Oración " + (pr.i + 1) + " de " + all.length + "</p></div>";
    return '<div class="card lb-read">' + ex + '<div class="lb-text">' + text + "</div></div>";
  }

  function owns(s) { return s === "guiada" || s === "guiada-shelf" || s === "guiada-tramo"; }
  function render(s) {
    if (s === "guiada-shelf") return renderShelf();
    var p = ui.book && packs[ui.book];
    if (!p) return '<button class="btn ghost" id="lbback">← ' + esc(H.ui().me) + '</button><div class="card"><p>⏳ Abriendo el libro…</p></div>';
    return s === "guiada-tramo" ? renderTramo(p) : renderBook(p);
  }

  function show(sc) { H.show(sc); }
  function openBook(id) {
    ui.book = id;
    show("guiada");
    getPack(id).then(function () { if (owns(H.view().screen)) H.render(); }).catch(function (e) { H.toast("⚠️ " + (e.message || e)); show("guiada-shelf"); });
  }
  function openTramo(i) {
    var p = packs[ui.book], pr = progress(H.state(), p.id);
    if (pr.t !== i) { pr.t = i; pr.i = 0; }
    ui.step = pr.i ? 1 : 0;
    H.persist();
    show("guiada-tramo");
  }
  function moveTo(k) {
    var p = packs[ui.book], pr = progress(H.state(), p.id), all = ids(p.tramos[pr.t]);
    pr.i = Math.max(0, Math.min(all.length - 1, k));
    H.persist();
    H.render();
    keepCurrent();
  }
  // The current sentence stays in view inside the text box (only the box scrolls, not the page).
  function keepCurrent() {
    var box = document.querySelector(".lb-text"), el = document.querySelector(".lb-s.cur");
    if (!box || !el) return;
    var top = el.offsetTop - box.offsetTop;
    if (top < box.scrollTop || top > box.scrollTop + box.clientHeight - 40) box.scrollTop = Math.max(0, top - 40);
  }

  // The card's buttons (in Ich), wherever the card is drawn.
  function wireCard() {
    var o = document.getElementById("lbopen");
    if (o) o.onclick = function () { ui.msg = ""; H.view().tab = "io"; show("guiada-shelf"); };
    document.querySelectorAll("[data-libro]").forEach(function (b) {
      b.onclick = function () { H.view().tab = "io"; openBook(b.dataset.libro); };
    });
  }
  function wire(s) {
    wireCard();
    if (!owns(s)) return;
    var on = function (sel, fn) { var el = document.querySelector(sel); if (el) el.onclick = fn; };
    on("#lbback", function () { H.go("io"); });
    on("#lbbook", function () { show("guiada"); });
    document.querySelectorAll("[data-lbtr]").forEach(function (b) { b.onclick = function () { openTramo(+b.dataset.lbtr); }; });
    document.querySelectorAll("[data-lbstep]").forEach(function (b) { b.onclick = function () { ui.step = +b.dataset.lbstep; H.render(); root.scrollTo(0, 0); }; });
    document.querySelectorAll("[data-lbdel]").forEach(function (b) {
      b.onclick = function () {
        if (!root.confirm("¿Borrar este libro del teléfono? Tu avance queda guardado.")) return;
        dropPack(b.dataset.lbdel).then(H.render);
      };
    });
    var f = document.getElementById("lbfile");
    if (f) f.onchange = function () {
      var file = f.files && f.files[0];
      if (!file) return;
      ui.msg = "⏳ Leyendo " + file.name + "…";
      H.render();
      var rd = new root.FileReader();
      rd.onload = function () {
        var p = null;
        try { p = JSON.parse(String(rd.result)); } catch (e) { ui.msg = "⚠️ El archivo no es un JSON válido."; H.render(); return; }
        var err = validate(p);
        if (err) { ui.msg = "⚠️ " + err + "."; H.render(); return; }
        savePack(p).then(function () {
          ui.msg = p.lang === lang() ? "✓ Listo: «" + p.title + "» quedó en el teléfono." :
            "✓ «" + p.title + "» quedó en el teléfono; se ve en el curso de su idioma (" + p.lang + ").";
          if (p.lang === lang()) openBook(p.id); else H.render();
        }).catch(function (e) { ui.msg = "⚠️ No se pudo guardar: " + (e.message || e); H.render(); });
      };
      rd.onerror = function () { ui.msg = "⚠️ No se pudo leer el archivo."; H.render(); };
      rd.readAsText(file);
    };
    if (s !== "guiada-tramo") return;
    var p = packs[ui.book];
    if (!p) return;
    var pr = progress(H.state(), p.id);
    keepCurrent();
    on("#lbprev", function () { moveTo(pr.i - 1); });
    on("#lbnext", function () { moveTo(pr.i + 1); });
    on("#lbshow", function () { ui.show = !ui.show; H.render(); });
    on("#lbsay", function () { var s0 = p.s[ids(p.tramos[pr.t])[pr.i]]; if (s0) H.speak(s0.t, true); });
    document.querySelectorAll("[data-lbs]").forEach(function (sp) { sp.onclick = function () { moveTo(+sp.dataset.lbs); }; });
    on("#lbdone", function () {
      var tr = p.tramos[pr.t];
      if (!pr.done[tr.id]) { pr.done[tr.id] = Date.now(); H.gain(XP_TRAMO); }
      if (pr.t + 1 < p.tramos.length) { pr.t++; pr.i = 0; }
      ui.step = 0;
      H.persist();
      H.toast("✓ Tramo terminado");
      show("guiada");
    });
  }

  function init(host) { H = host; }

  var api = { init: init, owns: owns, render: render, wire: wire, card: card,
              validate: validate, ids: ids, progress: progress, doneCount: doneCount, meta: meta };
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.Libro = api;
})(typeof window !== "undefined" ? window : globalThis);
