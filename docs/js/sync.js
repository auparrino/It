/*
 * Sincronizzazione del progresso con tools/serve.py.
 *
 * Il salvataggio vero resta in localStorage (funziona anche su GitHub Pages);
 * se il gioco è servito da serve.py, ogni salvataggio viene anche scritto in
 * progress.json, così gli agenti di fondo (custode, redattore) possono
 * leggerlo.  All'avvio, se il file del server è più recente, vince il file.
 */
(function (root) {
  "use strict";

  var URL_ = "/progress";
  var available = null;    // null = non ancora provato
  var timer = null;
  var pending = null;

  var fetchFn = function () { return root.fetch.apply(root, arguments); };

  function pull() {
    return fetchFn(URL_).then(function (r) {
      if (r.status === 404) { available = true; return null; }
      if (!r.ok) throw new Error("HTTP " + r.status);
      available = true;
      return r.json();
    }).catch(function () {
      available = false;
      return null;
    });
  }

  // Which copy wins: the one saved last.  A copy without a timestamp is
  // treated as older than any copy that has one.
  function newer(local, remote) {
    if (!remote) return local;
    if (!local) return remote;
    var a = local.savedAt || 0, b = remote.savedAt || 0;
    return b > a ? remote : local;
  }

  function pushNow(state) {
    if (available === false) return Promise.resolve(false);
    return fetchFn(URL_, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state)
    }).then(function (r) {
      available = r.ok || r.status === 404 ? r.ok : available;
      return r.ok;
    }).catch(function () {
      available = false;
      return false;
    });
  }

  // Saves come in bursts (one per answer); one write per second is plenty.
  function push(state, delay) {
    pending = state;
    if (timer) return;
    timer = setTimeout(function () {
      timer = null;
      var s = pending; pending = null;
      pushNow(s);
    }, delay == null ? 800 : delay);
  }

  var api = {
    pull: pull,
    push: push,
    pushNow: pushNow,
    newer: newer,
    isAvailable: function () { return available; },
    _setFetch: function (fn) { fetchFn = fn; },
    _reset: function () { available = null; timer = null; pending = null; }
  };

  if (typeof module === "object" && module.exports) module.exports = api;
  else root.Sync = api;
})(typeof window !== "undefined" ? window : globalThis);
