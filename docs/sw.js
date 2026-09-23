/*
 * Service worker: tutta l'app resta nel telefono e funziona senza rete.
 * Strategia: rispondi subito dalla cache, aggiorna in background.
 * Cambiare VERSION a ogni rilascio per buttare la cache vecchia.
 */
var VERSION = "laviac1-v6";
var FILES = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "css/app.css",
  "fonts/fraunces-normal.woff2",
  "fonts/fraunces-italic.woff2",
  "fonts/nunito-normal.woff2",
  "js/conjugator.js",
  "js/engine.js",
  "js/frasi.js",
  "js/lab.js",
  "js/letture.js",
  "js/diagnosi.js",
  "js/banca.js",
  "js/drills.js",
  "js/app.js",
  "data/course.json",
  "data/bank.json",
  "icons/icon.svg",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/apple-touch-icon.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(FILES); })
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
