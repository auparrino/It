/*
 * El arranque: una app, dos idiomas.
 *
 * El núcleo (docs/js/: motor, interfaz, generador de ejercicios) es uno
 * solo; cada idioma es un paquete en docs/lang/<código>/ (lang.js con su
 * configuración e interfaz, rules.js con sus reglas, el conjugador, el
 * diagnóstico, la escritura, los datos y su tema).  boot.js decide el
 * idioma y carga los scripts en ORDER, alternando paquete y núcleo en el
 * orden en que se necesitan.
 *
 * El idioma sale de: ?lang=it|pt en la URL, lo último elegido
 * (localStorage «c1.lang»), o —para quien ya estudiaba— el guardado de La
 * Via C1 o de Rumo C1.  Si no hay nada, se muestra el selector.
 *
 * Bajo Node exporta ORDER y LANGS para los tests (tools/lib/pack.js); en el
 * service worker (importScripts) solo expone Boot, para saber qué archivos
 * guardar de cada idioma.
 */
(function (root) {
  "use strict";

  var LANGS = {
    it: { name: "Italiano", flag: "🇮🇹", brand: "La Via C1", storage: "laviac1",
          blurb: "De cero a C1 en un año, con la Italia de las plazas y el espresso.",
          themeColor: { light: "#7dbdf0", dark: "#12356a" }, bg: "#fbf8f1",
          fonts: ["fonts/bodoni-normal.woff2", "fonts/bodoni-italic.woff2"] },
    pt: { name: "Português", flag: "🇧🇷", brand: "Rumo C1", storage: "rumoc1",
          blurb: "Portugués de Brasil hasta C1, con el calçadão de Copacabana de fondo.",
          themeColor: { light: "#9fdcea", dark: "#071a26" }, bg: "#fbf4e6",
          fonts: ["fonts/fraunces-normal.woff2", "fonts/fraunces-italic.woff2"] }
  };

  // {lang: archivo} vive en docs/lang/<código>/; {core: archivo} en docs/js/.
  var ORDER = [
    { lang: "lang.js" }, { lang: "rules.js" }, { lang: "conjugator.js" },
    { core: "engine.js" },
    { lang: "frasi_data.js" }, { core: "frasi.js" },
    { lang: "lab_data.js" }, { core: "lab.js" },
    { lang: "letture_settimana.js" }, { lang: "letture_data.js" }, { core: "letture.js" },
    { core: "lezione.js" },
    { lang: "diagnosi.js" }, { lang: "scrivi.js" },
    { core: "banca.js" }, { core: "frequenza.js" },
    { lang: "ascolto_data.js" }, { lang: "dictogloss_data.js" }, { lang: "esame_data.js" }, { lang: "voci_cv_data.js" },
    { core: "suoni.js" },
    { lang: "duelli_data.js" }, { core: "duelli.js" },
    { core: "voci.js" }, { core: "drills.js" }, { core: "app.js" }
  ];

  // What app.js fetches from the package (lang/<código>/data/).
  var DATA = ["course.json", "bank.json", "glossario.json", "frequenza.json"];

  var KEY = "c1.lang";

  function src(entry, code) {
    return entry.lang ? "lang/" + code + "/" + entry.lang : "js/" + entry.core;
  }

  /* Every file of the core (docs/js/) and of one package, relative to
     docs/: what the service worker keeps for offline use. */
  function coreFiles() {
    return ORDER.filter(function (e) { return e.core; }).map(function (e) { return src(e); });
  }
  function langFiles(code) {
    var base = "lang/" + code + "/";
    return ORDER.filter(function (e) { return e.lang; }).map(function (e) { return src(e, code); })
      .concat([base + "theme.css"])
      .concat(LANGS[code].fonts.map(function (f) { return base + f; }))
      .concat(DATA.map(function (f) { return base + "data/" + f; }));
  }

  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* sin almacenamiento */ } }

  function chosen() {
    var m = /[?&]lang=(\w+)/.exec(location.search);
    if (m && LANGS[m[1]]) { set(KEY, m[1]); return m[1]; }
    var saved = get(KEY);
    if (saved && LANGS[saved]) return saved;
    // Quien ya estudiaba sigue en su idioma, sin preguntar (italiano primero:
    // esta es la dirección de La Via C1).
    for (var c in LANGS) {
      if (get(LANGS[c].storage + ".save.v1")) { set(KEY, c); return c; }
    }
    return null;
  }

  // The colors of the browser bar, the title and the fonts of the language,
  // before anything is drawn.
  function dress(code) {
    var L = LANGS[code], doc = document;
    doc.documentElement.setAttribute("data-lang", code);
    doc.title = L.brand + " — " + L.name.toLowerCase();
    Array.prototype.forEach.call(doc.querySelectorAll('meta[name="theme-color"]'), function (m) {
      m.content = /dark/.test(m.media || "") ? L.themeColor.dark : L.themeColor.light;
    });
    var at = doc.querySelector('meta[name="apple-mobile-web-app-title"]');
    if (at) at.content = L.name;
    var pre = doc.createElement("link");
    pre.rel = "preload"; pre.as = "font"; pre.type = "font/woff2"; pre.crossOrigin = "anonymous";
    pre.href = "lang/" + code + "/" + L.fonts[0];
    doc.head.appendChild(pre);
    var css = doc.createElement("link");
    css.rel = "stylesheet";
    css.href = "lang/" + code + "/theme.css";
    doc.head.appendChild(css);
  }

  function load(code) {
    dress(code);
    var i = 0;
    (function next() {
      if (i >= ORDER.length) return;
      var s = document.createElement("script");
      s.src = src(ORDER[i++], code);
      s.onload = next;
      s.onerror = function () {
        var app = document.getElementById("app");
        if (app) app.innerHTML = '<div class="card"><p>No se pudo cargar ' + s.src + ". Revisá la conexión y volvé a abrir.</p></div>";
      };
      document.body.appendChild(s);
    })();
  }

  /* El selector: una tarjeta por idioma, cada una con su mundo (el cielo
     de una plaza italiana y su placa de travertino; el mar de Ipanema, las
     ondas del calçadão y la placa azul de Río). */
  var PLATE = { it: ["via", "C1"], pt: ["rua", "Rumo C1"] };
  function picker() {
    var app = document.getElementById("app");
    document.documentElement.setAttribute("data-lang", "pick");
    app.innerHTML = '<div class="pick"><img class="pick-logo" src="icons/icon.svg" alt="">' +
      "<h1>¿Qué idioma estudiás?</h1>" +
      "<p>Podés cambiarlo cuando quieras desde tu perfil. Cada idioma guarda su propio progreso.</p>" +
      Object.keys(LANGS).map(function (c) {
        var L = LANGS[c], pl = PLATE[c] || ["", L.brand];
        return '<button class="pick-lang ' + c + '" data-lang="' + c + '">' +
          '<span class="plate"><small>' + pl[0] + "</small><b>" + pl[1] + "</b></span>" +
          '<span class="name">' + L.brand + " · " + L.name + '</span><span class="flag" aria-hidden="true">' + L.flag + "</span>" +
          '<span class="blurb">' + L.blurb + "</span></button>";
      }).join("") +
      '<p class="pick-foot">Hecha para hispanohablantes rioplatenses. Anda sin internet.</p></div>';
    Array.prototype.forEach.call(app.querySelectorAll(".pick-lang"), function (b) {
      b.addEventListener("click", function () {
        var code = b.getAttribute("data-lang");
        set(KEY, code);
        app.innerHTML = '<div class="card"><p class="muted">Cargando…</p></div>';
        load(code);
      });
    });
  }

  /* Cambiar de idioma desde la app (Io / Eu). */
  function switchTo(code) {
    if (!LANGS[code]) return;
    set(KEY, code);
    location.href = location.pathname;
  }

  var api = { LANGS: LANGS, ORDER: ORDER, DATA: DATA, KEY: KEY, src: src, switchTo: switchTo,
              coreFiles: coreFiles, langFiles: langFiles, installPrompt: null };

  if (typeof module === "object" && module.exports) { module.exports = api; return; }
  root.Boot = api;
  if (typeof document === "undefined") return;          // the service worker
  // The install prompt can come while the scripts are loading: app.js takes it.
  root.addEventListener("beforeinstallprompt", function (e) { e.preventDefault(); api.installPrompt = e; });
  var code = chosen();
  if (code) load(code); else picker();
})(typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : globalThis);
