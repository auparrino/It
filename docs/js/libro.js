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
  var ui = { book: null, step: 0, show: true, msg: "", open: false, mode: "texto" };
  try { if (root.localStorage && root.localStorage.getItem("c1.libro.mode") === "frase") ui.mode = "frase"; } catch (e) { /* */ }

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

  // What one sentence says: translation, standard form, word by word, words, note.
  function explain(s, id) {
    if (!ui.show) return '<p class="muted small">Tratá de entenderla sola. Tocá «💬» para ver la explicación.</p>';
    return '<p class="lb-es">' + esc(s.es || "") + "</p>" +
      (s.std ? '<p class="small"><span class="muted">Estándar:</span> <span lang="' + tts() + '">' + esc(s.std) + "</span></p>" : "") +
      (s.lit ? '<p class="small"><span class="muted">Palabra por palabra:</span> ' + esc(s.lit) + "</p>" : "") +
      ((s.g || []).length ? '<ul class="lb-g">' + s.g.map(function (g) {
        return '<li><b lang="' + tts() + '">' + esc(g[0]) + "</b> — " + mk(g[1] || "") + "</li>";
      }).join("") + "</ul>" : "") +
      (s.n ? '<p class="small lb-n">💡 ' + mk(s.n) + "</p>" : "") + askBox(id);
  }

  /* ------------------------------------------------------- «No entiendo»
     The learner asks the AI (the Anthropic key of Ich / Io / Eu, the same
     as the role-play) about the sentence: what part, optional.  The AI gets
     the sentence, the one before and after, and what the app already
     explained, and answers in Rioplatense Spanish.  The answers stay on
     this phone (localStorage, c1.libro.ia.<book>), under the sentence. */
  var IA_KEY = "c1.libro.ia.";
  function asked(id) {
    try { return (JSON.parse(root.localStorage.getItem(IA_KEY + ui.book) || "{}") || {})[id] || []; } catch (e) { return []; }
  }
  function keep(id, q, a) {
    try {
      var all = JSON.parse(root.localStorage.getItem(IA_KEY + ui.book) || "{}") || {};
      (all[id] = all[id] || []).push([q, a]);
      root.localStorage.setItem(IA_KEY + ui.book, JSON.stringify(all));
    } catch (e) { /* sin almacenamiento: queda solo en pantalla */ }
  }
  function paras(text) {
    return String(text || "").split(/\n+/).filter(function (x) { return x.trim(); }).map(function (x) { return "<p>" + mk(x) + "</p>"; }).join("");
  }
  function askBox(id) {
    if (!id) return "";
    var prev = asked(id).map(function (x) {
      return '<div class="lb-ia-a">' + (x[0] ? '<p class="small muted">🤔 ' + esc(x[0]) + "</p>" : "") + paras(x[1]) + "</div>";
    }).join("");
    var body = ui.ask === id ?
      (ui.busy ? '<p class="muted small">⏳ Pensando una explicación mejor…</p>' :
        '<textarea id="lbiaq" class="grow" rows="2" placeholder="¿Qué parte no entendés? (opcional: una palabra, un pedazo, el orden…)"></textarea>' +
        '<div class="row"><button class="btn" id="lbiago">Explicámelo</button><button class="tab" id="lbiano">Cancelar</button></div>' +
        (ui.iaErr ? '<p class="small">⚠️ ' + esc(ui.iaErr) + "</p>" : "")) :
      '<button class="tab lb-ia-btn" id="lbiabtn">🤔 No entiendo' + (prev ? " otra cosa" : "") + "</button>";
    return '<div class="lb-ia">' + prev + body + "</div>";
  }
  function askPrompt(p, all, i, q) {
    var s = p.s[all[i]] || {}, prev = p.s[all[i - 1]], next = p.s[all[i + 1]];
    var lang = (H.ui() && H.ui().langEs) || "la lengua del libro";
    return "Sos profesor de " + lang + " para un hispanohablante rioplatense que está leyendo «" + p.title + "» de " + (p.author || "") +
      " en el original, oración por oración. No entiende bien una oración.\n" +
      (prev ? "Oración anterior: " + prev.t + "\n" : "") +
      "ORACIÓN: " + s.t + "\n" +
      (next ? "Oración siguiente: " + next.t + "\n" : "") +
      "Lo que la app ya le explicó — traducción: " + (s.es || "") +
      ((s.g || []).length ? "; palabras: " + s.g.map(function (g) { return g[0] + " = " + g[1]; }).join("; ") : "") +
      (s.n ? "; nota: " + s.n : "") + (s.std ? "; en estándar: " + s.std : "") + "\n" +
      (q ? "Lo que el alumno pregunta: «" + q + "»\n" : "El alumno no dijo qué parte: explicá lo que más cuesta de esta oración.\n") +
      "Explicá en castellano rioplatense, claro y sin tecnicismos de más: desarmá la oración en partes (quién hace qué, a qué se refiere cada pronombre, " +
      "dónde está el verbo y por qué está ahí), la palabra o construcción que traba, y si hay dialecto, ironía, una cita o una alusión, decilo. " +
      "No repitas la traducción entera si no hace falta. Formas del original entre *asteriscos*. Máximo 170 palabras, en 2 a 4 párrafos cortos.\n" +
      "Respondé SOLO con JSON: {\"explicacion\": \"…\"}";
  }
  function ask(p, pr, q) {
    var keys = H.aiKeys && H.aiKeys();
    if (!keys || !keys.claude) { ui.iaErr = "Hace falta tu clave de Anthropic: cargala en " + H.ui().me + "."; moveTo(pr.i); return; }
    if (!root.IA || !root.IA.llm) { ui.iaErr = "Sin cliente de IA."; moveTo(pr.i); return; }
    var all = ids(p.tramos[pr.t]), id = all[pr.i], at = pr.i;
    ui.busy = true; ui.iaErr = ""; ui.jump = true;
    moveTo(pr.i);
    root.IA.llm(askPrompt(p, all, at, q), keys, function (err, data) {
      ui.busy = false;
      var a = !err && data && (data.explicacion || data.explicación || data.explanation);
      ui.jump = true;
      if (a) { keep(id, q, String(a)); ui.ask = null; }
      else ui.iaErr = "La IA no respondió (" + String((err && err.message) || "respuesta rara") + "). Probá de nuevo.";
      var now = progress(H.state(), p.id);
      if (owns(H.view().screen) && now.t === pr.t && now.i === at) moveTo(at);
    }, { max: 900 });
  }
  function navRow(pr, all) {
    return '<div class="lb-nav">' +
      '<button class="btn ghost" id="lbprev" aria-label="Oración anterior"' + (pr.i ? "" : " disabled") + ">←</button>" +
      '<button class="tab" id="lbsay" aria-label="Escuchar">🔊</button>' +
      '<button class="tab" id="lbshow" aria-pressed="' + ui.show + '" aria-label="Explicación">' + (ui.show ? "🙈" : "💬") + "</button>" +
      '<span class="muted small lb-count">' + (pr.i + 1) + " / " + all.length + "</span>" +
      (pr.i + 1 < all.length ? '<button class="btn" id="lbnext" aria-label="Oración siguiente">→</button>' :
        '<button class="btn" data-lbstep="2">Gramática →</button>') + "</div>";
  }
  function sheet(p, pr, all) {
    var s = p.s[all[pr.i]] || {};
    return '<div class="lb-grip" aria-hidden="true"></div>' +
      '<button class="lb-close" id="lbclose" aria-label="Cerrar">✕</button>' +
      '<div class="lb-sheet-body"><p class="lb-cur" lang="' + tts() + '">' + esc(s.t || "") + "</p>" + explain(s, all[pr.i]) + "</div>" +
      navRow(pr, all);
  }
  function modeBar() {
    return '<div class="row lb-modes" role="group" aria-label="Cómo leer">' +
      '<button class="tab' + (ui.mode === "texto" ? " on" : "") + '" data-lbmode="texto" aria-pressed="' + (ui.mode === "texto") + '">📄 Texto</button>' +
      '<button class="tab' + (ui.mode === "frase" ? " on" : "") + '" data-lbmode="frase" aria-pressed="' + (ui.mode === "frase") + '">🔍 Frase a frase</button></div>';
  }

  /* Two ways to read.  «Texto»: the text fills the page (no box with its
     own scroll); a tap on a sentence opens a sheet from the bottom with its
     explanation, and the page moves so the sentence sits above the sheet.
     «Frase a frase»: one sentence big, the one before and after in grey,
     the explanation under it and the buttons docked at the bottom. */
  function renderReading(p, tr, all, pr) {
    if (ui.mode === "frase") {
      var s = p.s[all[pr.i]] || {}, prev = p.s[all[pr.i - 1]], next = p.s[all[pr.i + 1]], h = "";
      // the chapter title when its first sentence is the current one
      (tr.p || []).forEach(function (x, k) {
        if (!Array.isArray(x) && Array.isArray(tr.p[k + 1]) && tr.p[k + 1][0] === all[pr.i]) h = '<h3 class="lb-h">' + esc(x.h) + "</h3>";
      });
      return modeBar() + '<div class="card lb-frase" id="lbswipe">' + h +
        (prev ? '<p class="lb-ctx" lang="' + tts() + '">' + esc(prev.t) + "</p>" : "") +
        '<p class="lb-cur lb-big" lang="' + tts() + '">' + esc(s.t || "") + "</p>" +
        (next ? '<p class="lb-ctx" lang="' + tts() + '">' + esc(next.t) + "</p>" : "") +
        '<div class="lb-exp">' + explain(s, all[pr.i]) + "</div></div>" +
        '<div class="lb-dock">' + navRow(pr, all) + "</div>";
    }
    var curId = all[pr.i];
    var text = (tr.p || []).map(function (x) {
      if (!Array.isArray(x)) return '<h3 class="lb-h">' + esc(x.h) + (x.sub ? ' <small class="muted">' + esc(x.sub) + "</small>" : "") + "</h3>";
      return '<p class="lb-p" lang="' + tts() + '">' + x.map(function (id) {
        var o = p.s[id] || {}, k = all.indexOf(id);
        return '<span class="lb-s' + (ui.open && id === curId ? " cur" : "") + (k < pr.i ? " read" : "") + '" data-lbs="' + k + '">' + esc(o.t || "") + "</span>";
      }).join(" ") + "</p>";
    }).join("");
    return modeBar() + '<p class="muted small">Tocá una oración para ver su explicación.' +
      (pr.i ? ' <button class="tab" id="lbresume">▶ Seguir en la oración ' + (pr.i + 1) + "</button>" : "") + "</p>" +
      '<div class="card lb-texto">' + text + "</div>" +
      '<div class="lb-sheet" id="lbsheet" aria-live="polite"' + (ui.open ? "" : " hidden") + ">" + (ui.open ? sheet(p, pr, all) : "") + "</div>";
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
    ui.open = false;
    H.persist();
    show("guiada-tramo");
  }
  // Move to sentence k without drawing the screen again (the page keeps its place).
  function moveTo(k, open) {
    var p = packs[ui.book], pr = progress(H.state(), p.id), all = ids(p.tramos[pr.t]);
    var to = Math.max(0, Math.min(all.length - 1, k));
    if (to !== pr.i && !ui.busy) { ui.ask = null; ui.iaErr = ""; }
    pr.i = to;
    if (open) ui.open = true;
    H.persist();
    var sh = document.getElementById("lbsheet");
    if (ui.mode === "frase" || !sh) { H.render(); return; }
    document.querySelectorAll(".lb-s").forEach(function (el) {
      var n = +el.getAttribute("data-lbs");
      el.classList.toggle("cur", !!ui.open && n === pr.i);
      el.classList.toggle("read", n < pr.i);
    });
    sh.hidden = !ui.open;
    sh.innerHTML = ui.open ? sheet(p, pr, all) : "";
    document.body.classList.toggle("lb-sheet-open", !!ui.open);
    wireSheet(p, pr);
    keepCurrent();
    jumpToAsk();
  }
  // The question box or the AI's answer in sight (the sheet scrolls, not the page).
  function jumpToAsk() {
    if (!ui.jump) return;
    ui.jump = false;
    var box = document.querySelector(".lb-ia");
    if (!box) return;
    var sb = document.querySelector(".lb-sheet-body");
    if (sb && sb.contains(box)) sb.scrollTop = sb.scrollHeight;
    else if (box.scrollIntoView) box.scrollIntoView({ block: "center" });
  }
  // The current sentence above the sheet, in the upper part of what is left.
  function keepCurrent() {
    var el = document.querySelector(".lb-s.cur"), sh = document.getElementById("lbsheet");
    if (!el || !sh || sh.hidden) return;
    var r = el.getBoundingClientRect(), free = sh.getBoundingClientRect().top;
    if (r.top < 70 || r.bottom > free - 12) root.scrollTo(0, root.pageYOffset + r.top - Math.max(70, (free - r.height) / 3));
  }
  function wireSheet(p, pr) {
    var on = function (sel, fn) { var el = document.querySelector(sel); if (el) el.onclick = fn; };
    on("#lbprev", function () { moveTo(pr.i - 1, true); });
    on("#lbnext", function () { moveTo(pr.i + 1, true); });
    on("#lbshow", function () { ui.show = !ui.show; moveTo(pr.i); });
    on("#lbclose", function () { ui.open = false; moveTo(pr.i); });
    on("#lbsay", function () { var s0 = p.s[ids(p.tramos[pr.t])[pr.i]]; if (s0) H.speak(s0.t, true); });
    on("#lbiabtn", function () { ui.ask = ids(p.tramos[pr.t])[pr.i]; ui.iaErr = ""; ui.jump = true; moveTo(pr.i); var q = document.getElementById("lbiaq"); if (q) q.focus(); });
    on("#lbiano", function () { ui.ask = null; ui.iaErr = ""; moveTo(pr.i); });
    on("#lbiago", function () { var q = document.getElementById("lbiaq"); ask(p, pr, q ? q.value.trim() : ""); });
    document.querySelectorAll("[data-lbstep]").forEach(function (b) {
      b.onclick = function () { ui.open = false; document.body.classList.remove("lb-sheet-open", "lb-docked"); ui.step = +b.dataset.lbstep; H.render(); root.scrollTo(0, 0); };
    });
    swipe(document.getElementById(ui.mode === "frase" ? "lbswipe" : "lbsheet"), pr);
  }
  // A swipe to the left is the next sentence; to the right, the one before.
  function swipe(el, pr) {
    if (!el || el.dataset.sw) return;
    el.dataset.sw = "1";
    var x0 = null, y0 = 0;
    el.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    el.addEventListener("touchend", function (e) {
      if (x0 == null) return;
      var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
      x0 = null;
      if (Math.abs(dx) > 60 && Math.abs(dx) > 2 * Math.abs(dy)) moveTo(pr.i + (dx < 0 ? 1 : -1), true);
    });
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
    if (typeof document !== "undefined" && document.body && (s !== "guiada-tramo" || ui.step !== 1)) document.body.classList.remove("lb-sheet-open", "lb-docked");
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
    document.body.classList.toggle("lb-sheet-open", ui.step === 1 && ui.mode === "texto" && !!ui.open);
    document.body.classList.toggle("lb-docked", ui.step === 1 && ui.mode === "frase");
    if (ui.step === 1) wireSheet(p, pr);
    keepCurrent();
    jumpToAsk();
    document.querySelectorAll("[data-lbs]").forEach(function (sp) { sp.onclick = function () { moveTo(+sp.dataset.lbs, true); }; });
    on("#lbresume", function () { moveTo(pr.i, true); });
    document.querySelectorAll("[data-lbmode]").forEach(function (b) {
      b.onclick = function () {
        ui.mode = b.dataset.lbmode;
        try { localStorage.setItem("c1.libro.mode", ui.mode); } catch (e) { /* sin almacenamiento */ }
        H.render(); root.scrollTo(0, 0);
      };
    });
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
