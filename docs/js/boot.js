/*
 * El arranque: una app, dos idiomas.
 *
 * El núcleo (docs/js/: motor, interfaz, generador de ejercicios) es uno
 * solo; cada idioma es un paquete en docs/lang/<código>/ (lang.js con su
 * configuración e interfaz, rules.js con sus reglas, el conjugador, el
 * diagnóstico, la escritura y los datos).  boot.js decide el idioma y carga
 * los scripts en ORDER, alternando paquete y núcleo en el orden en que se
 * necesitan.
 *
 * El idioma sale de: ?lang=it|pt en la URL, lo último elegido
 * (localStorage «c1.lang»), o —para quien ya estudiaba italiano— el
 * guardado de La Via C1.  Si no hay nada, se muestra el selector.
 *
 * Bajo Node exporta ORDER y LANGS para los tests (tools/lib/pack.js).
 */
(function (root) {
  "use strict";

  var LANGS = {
    it: { name: "Italiano", flag: "🇮🇹", brand: "La Via C1", blurb: "De cero a C1 en un año, con la Italia de las plazas y el espresso." },
    pt: { name: "Português", flag: "🇧🇷", brand: "Rumo C1", blurb: "Portugués de Brasil hasta C1, con el calçadão de Copacabana de fondo." }
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

  var KEY = "c1.lang";

  function src(entry, code) {
    return entry.lang ? "lang/" + code + "/" + entry.lang : "js/" + entry.core;
  }

  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* sin almacenamiento */ } }

  function chosen() {
    var m = /[?&]lang=(\w+)/.exec(location.search);
    if (m && LANGS[m[1]]) { set(KEY, m[1]); return m[1]; }
    var saved = get(KEY);
    if (saved && LANGS[saved]) return saved;
    // Quien ya estudiaba italiano sigue en italiano, sin preguntar.
    if (get("laviac1.save.v1")) { set(KEY, "it"); return "it"; }
    return null;
  }

  function load(code) {
    document.documentElement.setAttribute("data-lang", code);
    var css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "lang/" + code + "/theme.css";
    document.head.appendChild(css);
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

  function picker() {
    var app = document.getElementById("app");
    document.documentElement.setAttribute("data-lang", "pick");
    app.innerHTML = '<div class="pick"><h1>¿Qué idioma estudiás?</h1>' +
      '<p class="muted">Podés cambiarlo cuando quieras desde tu perfil. Cada idioma guarda su propio progreso.</p>' +
      Object.keys(LANGS).map(function (c) {
        var L = LANGS[c];
        return '<button class="pick-lang" data-lang="' + c + '"><span class="flag">' + L.flag + "</span>" +
          "<b>" + L.brand + "</b><span>" + L.name + "</span><small>" + L.blurb + "</small></button>";
      }).join("") + "</div>";
    Array.prototype.forEach.call(app.querySelectorAll(".pick-lang"), function (b) {
      b.addEventListener("click", function () { set(KEY, b.getAttribute("data-lang")); location.reload(); });
    });
  }

  /* Cambiar de idioma desde la app (Io / Eu). */
  function switchTo(code) {
    if (!LANGS[code]) return;
    set(KEY, code);
    location.href = location.pathname;
  }

  var api = { LANGS: LANGS, ORDER: ORDER, KEY: KEY, src: src, switchTo: switchTo };

  if (typeof module === "object" && module.exports) { module.exports = api; return; }
  root.Boot = api;
  var code = chosen();
  if (code) load(code); else picker();
})(typeof window !== "undefined" ? window : globalThis);
