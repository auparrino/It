/*
 * IA: el cliente de las claves propias del alumno (Groq y Gemini).
 *
 * Los dos hablan la API al estilo OpenAI.  Qué modelos puede usar una clave
 * cambia con el tiempo, así que la app le pide la lista a cada proveedor y
 * usa el mejor disponible.  Las claves no salen del teléfono salvo hacia
 * ellos.  Vale para los dos idiomas: los prompts están en cada paquete
 * (lang/<código>/scrivi.js), el cliente acá.
 *
 *   IA.llm(prompt, keys, done, opts)
 *     prompt  un texto, o {system, messages: [{role, content}…]} para un chat
 *             (el prefijo estable va en system: Gemini lo reusa entre turnos)
 *     keys    {groq, gemini}, o la clave de Groq sola
 *     done    function (err, data, meta)  data = el JSON de la respuesta;
 *             meta = {provider, model, ms, first}
 *     opts    order: ["gemini", "groq"] el orden de los proveedores (si no,
 *                    el que eligió el alumno: IA.order())
 *             stream: function (raw) — la respuesta a medida que llega
 *                    (para mostrar el turno del personaje mientras se escribe)
 *             think: "off" (por defecto: sin razonamiento, rápido) o "low"
 *             max: tope de tokens de la respuesta (por defecto 4096)
 *             hedge: ms; si el primer proveedor no empezó a responder en ese
 *                    tiempo, se pregunta también al segundo y gana el primero
 *
 * Por qué era lento Gemini: los modelos nuevos rechazan
 * reasoning_effort: "none" y la app reintentaba sin ninguna opción, o sea
 * con el razonamiento al máximo.  Ahora se prueba una escalera
 * (none → minimal → low) y se recuerda por modelo el primer valor aceptado.
 */
(function (root) {
  "use strict";

  var PROVIDERS = [
    { id: "groq", name: "Groq", url: "https://api.groq.com/openai/v1", maxKey: "max_completion_tokens",
      prefer: [/kimi-k2/i, /gpt-oss-120b/i, /llama-3\.3-70b/i, /qwen3?-32b|qwen\//i, /llama-4-maverick/i, /llama-4-scout/i, /gpt-oss-20b/i, /llama-3\.1-8b/i],
      skip: /whisper|tts|guard|playai|orpheus|distil|compound|allam|embed/i,
      fallback: ["moonshotai/kimi-k2-instruct", "openai/gpt-oss-120b", "llama-3.3-70b-versatile", "qwen/qwen3-32b", "llama-3.1-8b-instant"],
      // valores de reasoning_effort a probar, del más rápido al más lento; null = no mandarlo
      ladder: function (m, think) {
        if (/gpt-oss/i.test(m)) return think === "low" ? ["low", null] : ["low", null];
        if (/qwen3/i.test(m)) return ["none", null];
        return [null];
      } },
    { id: "gemini", name: "Gemini", url: "https://generativelanguage.googleapis.com/v1beta/openai", maxKey: "max_tokens",
      prefer: [/^gemini-2\.5-flash$/, /^gemini-flash-latest$/, /^gemini-[3-9](\.\d+)?-flash(-preview)?$/, /^gemini-2\.0-flash$/,
               /^gemini-2\.5-flash-lite$/, /^gemini-flash-lite-latest$/, /^gemini-2\.0-flash-lite$/, /^gemini-2\.5-pro$/,
               /^gemini-[\d.]+-flash$/, /^gemini-.*flash/],
      skip: /embed|imagen|veo|tts|aqa|image|audio|live|native|learnlm|gemma|robotics|computer|thinking/i,
      fallback: ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-2.5-flash-lite"],
      ladder: function (m, think) {
        if (/pro/i.test(m)) return ["low", null];                 // un pro no se deja apagar
        if (/2\.0/.test(m)) return [null];                        // 2.0 no razona
        return think === "low" ? ["low", null] : ["none", "minimal", "low", null];
      } }
  ];
  function byId(id) { for (var i = 0; i < PROVIDERS.length; i++) if (PROVIDERS[i].id === id) return PROVIDERS[i]; return null; }

  function prefix() { return (root.LANG && root.LANG.storage) || "c1"; }
  function store(P, k) { return prefix() + "." + P.id + "." + k; }
  function readJSON(k, d) { try { var v = JSON.parse(root.localStorage.getItem(k) || "null"); return v == null ? d : v; } catch (e) { return d; } }
  function writeJSON(k, v) { try { root.localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* lleno o sin permiso */ } }
  function readStr(k) { try { return root.localStorage.getItem(k); } catch (e) { return null; } }
  function writeStr(k, v) { try { root.localStorage.setItem(k, v); } catch (e) { /* */ } }

  // El orden de los proveedores que eligió el alumno (Io): "gemini" o "groq" primero.
  function order() {
    var o = readStr(prefix() + ".ia.first");
    return o === "groq" ? ["groq", "gemini"] : ["gemini", "groq"];
  }
  function setOrder(first) { writeStr(prefix() + ".ia.first", first === "groq" ? "groq" : "gemini"); }

  // Modelos que respondieron 402 (pago) con esta clave: no se vuelven a pedir.
  function paid(P) { return readJSON(store(P, "paid"), {}) || {}; }
  function markPaid(P, model) { var p = paid(P); p[model] = Date.now(); writeJSON(store(P, "paid"), p); }
  // El escalón de razonamiento que aceptó cada modelo.
  function rung(P, model) { var r = readJSON(store(P, "rung"), {}) || {}; return r[model] || 0; }
  function setRung(P, model, i) { var r = readJSON(store(P, "rung"), {}) || {}; r[model] = i; writeJSON(store(P, "rung"), r); }

  // Cuánto tarda cada modelo: primer fragmento y total, promedio móvil.
  function noteLatency(P, model, first, total) {
    var s = readJSON(store(P, "lat"), {}) || {}, x = s[model] || { first: first, total: total, n: 0 };
    var a = x.n < 3 ? 0.5 : 0.25;
    x.first = Math.round(x.first + a * (first - x.first));
    x.total = Math.round(x.total + a * (total - x.total));
    x.n++;
    s[model] = x;
    writeJSON(store(P, "lat"), s);
  }
  function stats() {
    var out = {};
    PROVIDERS.forEach(function (P) {
      var s = readJSON(store(P, "lat"), {}) || {}, last = readStr(store(P, "model"));
      out[P.id] = { name: P.name, model: last, lat: last && s[last] ? s[last] : null, all: s };
    });
    return out;
  }

  function models(P, key, cb) {
    var c = readJSON(store(P, "models"), null);
    if (c && c.at > Date.now() - 86400000 && c.ids && c.ids.length) return cb(c.ids);
    var ctl = typeof AbortController === "function" ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctl) ctl.abort(); }, 8000);
    root.fetch(P.url + "/models", { headers: { Authorization: "Bearer " + key }, signal: ctl ? ctl.signal : undefined })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        clearTimeout(timer);
        var ids = ((j && j.data) || []).filter(function (m) { return m && m.id && m.active !== false; })
          .map(function (m) { return String(m.id).replace(/^models\//, ""); })
          .filter(function (id) { return !P.skip.test(id); });
        var ranked = [];
        P.prefer.forEach(function (rx) { ids.forEach(function (id) { if (rx.test(id) && ranked.indexOf(id) < 0) ranked.push(id); }); });
        if (P.id === "groq") ids.forEach(function (id) { if (ranked.indexOf(id) < 0) ranked.push(id); });
        if (ranked.length) writeJSON(store(P, "models"), { at: Date.now(), ids: ranked });
        cb(ranked.length ? ranked : P.fallback.slice());
      })
      .catch(function () { clearTimeout(timer); cb(P.fallback.slice()); });
  }

  // El JSON dentro de una respuesta (hay modelos que piensan en voz alta en
  // <think>…</think> o lo envuelven en ```).
  function jsonOf(txt) {
    txt = String(txt || "").replace(/<think>[\s\S]*?<\/think>/g, "").replace(/```(json)?/g, "").trim();
    var a = txt.indexOf("{"), b = txt.lastIndexOf("}");
    return JSON.parse(a >= 0 && b > a ? txt.slice(a, b + 1) : txt);
  }
  // El valor de un campo de texto de un JSON que todavía está llegando:
  // {text, closed}.  Sirve para mostrar el turno mientras se escribe.
  function partialField(raw, name) {
    raw = String(raw || "");
    var m = new RegExp('"' + name + '"\\s*:\\s*"').exec(raw);
    if (!m) return null;
    var i = m.index + m[0].length, out = "";
    while (i < raw.length) {
      var ch = raw[i];
      if (ch === '"') return { text: out, closed: true };
      if (ch === "\\") {
        var nx = raw[i + 1];
        if (nx == null) break;
        if (nx === "n") out += "\n";
        else if (nx === "t") out += " ";
        else if (nx === "u") {
          var hex = raw.substr(i + 2, 4);
          if (hex.length < 4) break;
          out += String.fromCharCode(parseInt(hex, 16));
          i += 6;
          continue;
        } else out += nx;
        i += 2;
        continue;
      }
      out += ch;
      i++;
    }
    return { text: out, closed: false };
  }

  function messagesOf(prompt) {
    if (prompt && typeof prompt === "object" && prompt.messages) {
      return [{ role: "system", content: (prompt.system ? prompt.system + "\n\n" : "") + "Respondés solo con JSON válido." }].concat(prompt.messages);
    }
    return [{ role: "system", content: "Respondés solo con JSON válido." }, { role: "user", content: String(prompt) }];
  }

  // Un pedido a un proveedor, modelo por modelo, el mejor primero: cada
  // intento espera como mucho 20 s, cada proveedor 40 s.
  function ask(P, prompt, key, opts, done, onStart, handle) {
    handle = handle || {};
    models(P, key, function (list) {
      var skip = paid(P), ord = list.filter(function (m) { return !skip[m]; }), deadline = Date.now() + (opts.stream ? 45000 : 40000);
      var lastErr = null, noJson = {}, n402 = 0, k = 0, over = false;
      if (!ord.length) ord = list.slice();
      // el modelo que respondió la última vez va primero, pero solo si está
      // entre los tres mejores (un modelo chico que respondió una vez durante
      // una caída no tiene que quedar fijo)
      var good = readStr(store(P, "model"));
      if (good && ord.indexOf(good) > 0 && ord.indexOf(good) < 3) { ord.splice(ord.indexOf(good), 1); ord.unshift(good); }
      function finish(err, data, meta) { if (over) return; over = true; done(err, data, meta); }
      function next(err) {
        if (over) return;
        if (handle.cancelled) return finish(new Error("cancelado"));
        if (err) lastErr = err;
        if (k >= ord.length || Date.now() > deadline) {
          var m = n402 && n402 === k ? P.name + " pide un plan pago para todos los modelos de tu cuenta (402)"
                : lastErr && /abort/i.test(String(lastErr.message || lastErr)) ? "la IA no respondió a tiempo" : String((lastErr && lastErr.message) || lastErr || "sin respuesta");
          return finish(new Error(m));
        }
        attempt(ord[k++], null);
      }
      function attempt(model, step) {
        var ladder = P.ladder(model, opts.think), i = step == null ? Math.min(rung(P, model), ladder.length - 1) : step;
        var ctl = typeof AbortController === "function" ? new AbortController() : null;
        handle.ctl = ctl;
        var t0 = Date.now(), firstAt = 0;
        // sin respuesta en 20 s (o sin el primer fragmento en 15 s, si llega de a poco): otro modelo
        var timer = setTimeout(function () { if (ctl) ctl.abort(); }, Math.min(opts.stream ? 15000 : 20000, Math.max(3000, deadline - Date.now())));
        var body = { model: model, temperature: opts.temperature != null ? opts.temperature : 0.2, messages: messagesOf(prompt) };
        body[P.maxKey] = opts.max || 4096;
        var re = ladder[i];
        if (re) body.reasoning_effort = re;
        // el modo JSON y la respuesta de a poco no siempre van juntos: al que
        // llega de a poco se le pide el JSON solo en el texto
        if (!opts.stream && !noJson[model]) body.response_format = { type: "json_object" };
        if (opts.stream) body.stream = true;
        root.fetch(P.url + "/chat/completions", {
          method: "POST", signal: ctl ? ctl.signal : undefined,
          headers: { "Content-Type": "application/json", Authorization: "Bearer " + key },
          body: JSON.stringify(body)
        }).then(function (r) {
          if (over) return null;
          if (r.ok) {
            if (opts.stream && r.body && typeof r.body.getReader === "function") return readStream(r);
            return r.json().then(function (j) { var msg = j && j.choices && j.choices[0] && j.choices[0].message; return (msg && msg.content) || ""; });
          }
          return r.text().then(function (b) {
            clearTimeout(timer);
            if ((r.status === 400 && /api.?key/i.test(b)) || r.status === 401 || r.status === 403) { finish(new Error("HTTP " + r.status + ", clave")); return null; }
            if (r.status === 400 && /reasoning|thinking|budget/i.test(b) && i + 1 < ladder.length) { attempt(model, i + 1); return null; }
            if (r.status === 400 && !noJson[model] && /response_format|json/i.test(b)) { noJson[model] = 1; attempt(model, i); return null; }
            if (r.status === 402) { n402++; markPaid(P, model); next(new Error("HTTP 402")); return null; }
            next(new Error(r.status === 429 ? "se terminó el cupo por ahora (429)" : r.status >= 500 ? P.name + " está saturado ahora (" + r.status + ")" : "HTTP " + r.status));
            return null;
          });
        }).then(function (txt) {
          if (txt == null || over) return;
          clearTimeout(timer);
          var data;
          try { data = jsonOf(txt); } catch (e) { return next(new Error("respuesta ilegible")); }
          writeStr(store(P, "model"), model);
          if (i !== rung(P, model)) setRung(P, model, i);
          var total = Date.now() - t0;
          noteLatency(P, model, firstAt ? firstAt - t0 : total, total);
          finish(null, data, { provider: P.name, id: P.id, model: model, ms: total, first: firstAt ? firstAt - t0 : total });
        }).catch(function (e) { clearTimeout(timer); if (!over) next(e); });

        // La respuesta de a poco (text/event-stream): cada «data: {…}» trae un pedazo.
        function readStream(r) {
          var reader = r.body.getReader(), dec = new TextDecoder(), buf = "", raw = "";
          return new Promise(function (resolve, reject) {
            (function pump() {
              reader.read().then(function (res) {
                if (over) { try { reader.cancel(); } catch (e) { /* */ } return resolve(null); }
                if (res.done) return resolve(raw);
                buf += dec.decode(res.value, { stream: true });
                var lines = buf.split("\n");
                buf = lines.pop();
                lines.forEach(function (ln) {
                  ln = ln.trim();
                  if (ln.indexOf("data:") !== 0) return;
                  var d = ln.slice(5).trim();
                  if (d === "[DONE]") return;
                  try {
                    var j = JSON.parse(d), c = j.choices && j.choices[0] && j.choices[0].delta && j.choices[0].delta.content;
                    if (c) {
                      if (!firstAt) {
                        firstAt = Date.now();
                        // ya empezó: el reloj del primer fragmento no corre más, el del total sí
                        clearTimeout(timer);
                        timer = setTimeout(function () { if (ctl) ctl.abort(); }, Math.max(5000, deadline - Date.now()));
                        if (onStart) onStart(P, ctl);
                      }
                      raw += c;
                      try { opts.stream(raw, P); } catch (e) { /* la pantalla no frena el pedido */ }
                    }
                  } catch (e) { /* un renglón partido: llega completo en el próximo */ }
                });
                pump();
              }, reject);
            })();
          });
        }
      }
      next();
    });
  }

  function llm(prompt, keys, done, opts) {
    opts = opts || {};
    if (typeof root.fetch !== "function") return done(new Error("sin fetch"));
    if (typeof keys === "string") keys = { groq: keys };
    keys = keys || {};
    var ids = (opts.order || order()).filter(function (id) { return keys[id] && byId(id); });
    PROVIDERS.forEach(function (P) { if (keys[P.id] && ids.indexOf(P.id) < 0) ids.push(P.id); });
    if (!ids.length) return done(new Error("sin clave"));
    var errs = [], over = false, running = 0, started = null, backup = null, hedgeTimer = null, handles = {};
    function finish(err, data, meta) {
      if (over) return;
      over = true;
      clearTimeout(hedgeTimer);
      Object.keys(handles).forEach(function (id) { var h = handles[id]; if (meta && meta.id === id) return; h.cancelled = true; if (h.ctl) try { h.ctl.abort(); } catch (e) { /* */ } });
      done(err, data, meta);
    }
    function launch() {
      var id = ids.shift();
      if (!id) {
        if (running) return;
        if (backup) return finish(null, backup[0], backup[1]);
        return finish(new Error(errs.length > 1 ? errs.join(" · ") : String(errs[0] || "sin respuesta").replace(/^\w+: /, "")));
      }
      var P = byId(id), o = opts, h = handles[id] = {};
      running++;
      if (opts.stream) {
        // con dos proveedores en carrera, la pantalla muestra solo el que empezó primero
        o = {}; Object.keys(opts).forEach(function (k2) { o[k2] = opts[k2]; });
        o.stream = function (raw) { if (!started || started === P.id) opts.stream(raw, P); };
      }
      ask(P, prompt, keys[P.id], o, function (err, data, meta) {
        running--;
        if (over || h.cancelled) return;
        if (!err) {
          if (!started || started === P.id) return finish(null, data, meta);
          backup = [data, meta];          // llegó entera pero después: queda de respaldo
          return;
        }
        errs.push(P.name + ": " + String(err.message || err));
        if (started === P.id) { started = null; if (backup) return finish(null, backup[0], backup[1]); }
        if (!running) launch();
      }, function (PP) {
        if (started) return;
        started = PP.id;
        clearTimeout(hedgeTimer);
        // el otro, si estaba en carrera, se cancela
        Object.keys(handles).forEach(function (oid) { if (oid !== PP.id) { handles[oid].cancelled = true; if (handles[oid].ctl) try { handles[oid].ctl.abort(); } catch (e) { /* */ } } });
      }, h);
    }
    launch();
    // si el primero no empieza a responder a tiempo, se suma el segundo
    if (opts.hedge && opts.stream && ids.length) {
      hedgeTimer = setTimeout(function () { if (!over && !started && ids.length) launch(); }, opts.hedge);
    }
  }

  var api = { PROVIDERS: PROVIDERS, llm: llm, jsonOf: jsonOf, partialField: partialField, order: order, setOrder: setOrder, stats: stats };
  if (typeof module === "object" && module.exports) module.exports = api;
  root.IA = api;
})(typeof window !== "undefined" ? window : globalThis);
