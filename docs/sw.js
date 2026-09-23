/*
 * Service worker: tutta l'app resta nel telefono e funziona senza rete.
 * Strategia: rispondi subito dalla cache, aggiorna in background.
 * Cambiare VERSION a ogni rilascio per buttare la cache vecchia (e APP_VERSION
 * in js/app.js, che si vede in Oggi e Io: test_game.js controlla che coincidano).
 */
var VERSION = "laviac1-v28";
var FILES = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "css/app.css",
  "fonts/bodoni-normal.woff2",
  "fonts/bodoni-italic.woff2",
  "fonts/atkinson-400-normal.woff2",
  "fonts/atkinson-400-italic.woff2",
  "fonts/atkinson-700-normal.woff2",
  "fonts/atkinson-700-italic.woff2",
  "fonts/atkinson-800-normal.woff2",
  "js/conjugator.js",
  "js/engine.js",
  "js/frasi.js",
  "js/lab.js",
  "js/letture.js",
  "js/lezione.js",
  "js/diagnosi.js",
  "js/scrivi.js",
  "js/banca.js",
  "js/drills.js",
  "js/app.js",
  "data/course.json",
  "data/bank.json",
  "data/glossario.json",
  "icons/icon.svg",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/apple-touch-icon.png"
];

self.addEventListener("install", function (e) {
  // cache: "reload" skips the browser's HTTP cache (GitHub Pages keeps files
  // 10 minutes): otherwise a new version could be filled with old files.
  e.waitUntil(caches.open(VERSION).then(function (c) {
    return c.addAll(FILES.map(function (f) { return new Request(f, { cache: "reload" }); }));
  })
    .then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION; })
      .map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  var url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  e.respondWith(caches.open(VERSION).then(function (cache) {
    return cache.match(e.request, { ignoreSearch: true }).then(function (hit) {
      var net = fetch(e.request).then(function (res) {
        if (res && res.ok) cache.put(e.request, res.clone());
        return res;
      }).catch(function () { return hit; });
      return hit || net;
    });
  }));
});
