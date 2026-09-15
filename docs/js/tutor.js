/*
 * Il Maestro: il tutor che vive in un modello locale (Ollama).
 *
 * Tre mestieri: correggere le sfide aperte del Soluzioni, correggere la
 * scrittura libera, e fare da compagno di conversazione.  Parla con Ollama
 * attraverso il proxy di tools/serve.py (stessa origine, niente CORS) oppure
 * direttamente a http://127.0.0.1:11434 se il gioco è servito da un altro
 * server statico.  Nessuna dipendenza.
 */
(function (root) {
  "use strict";

  var KEY = "laviac1.tutor.v1";
  var DIRECT = "http://127.0.0.1:11434";

  var config = { base: "", model: "", temperature: 0.2 };
  var status = { ok: false, via: null, models: [], error: null, checked: false };

  var fetchFn = function () {
    return root.fetch.apply(root, arguments);
  };

  function loadConfig() {
    try {
      var raw = root.localStorage && root.localStorage.getItem(KEY);
      if (raw) {
        var c = JSON.parse(raw);
        Object.keys(config).forEach(function (k) {
          if (c[k] !== undefined) config[k] = c[k];
        });
      }
    } catch (e) { /* senza storage si parte dai default */ }
    return config;
  }

  function saveConfig(patch) {
    Object.keys(patch || {}).forEach(function (k) { config[k] = patch[k]; });
    try { root.localStorage.setItem(KEY, JSON.stringify(config)); } catch (e) { /* ok */ }
    return config;
  }

  /* ----------------------------------------------------------- connessione */

  // Candidate base URLs, in order: the one the learner set, the same-origin
  // proxy, and Ollama's own port (it accepts localhost origins by default).
  function candidates() {
    var list = [];
    if (config.base) list.push(config.base.replace(/\/+$/, ""));
    list.push("/ollama");
    list.push(DIRECT);
    return list;
  }

  function tags(base) {
    return fetchFn(base + "/api/tags").then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    }).then(function (j) {
      return (j.models || []).map(function (m) { return m.name; });
    });
  }

  // Try each candidate until one answers; remember which one worked.
  function detect() {
    var list = candidates(), i = 0;
    status.checked = true;
    function next(lastErr) {
      if (i >= list.length) {
        status.ok = false; status.via = null; status.models = [];
        status.error = lastErr ? String(lastErr.message || lastErr) : "sin conexión";
        return Promise.resolve(status);
      }
      var base = list[i++];
      return tags(base).then(function (models) {
        status.ok = true; status.via = base; status.models = models; status.error = null;
        if (!config.model || models.indexOf(config.model) < 0) {
          config.model = pickModel(models);
        }
        return status;
      }, next);
    }
    return next(null);
  }

  // Prefer a general-purpose instruct model of decent size when the learner
  // has not chosen one; anything is better than nothing.
  function pickModel(models) {
    var prefs = [/qwen.*(14|32)b/i, /gemma.*(12|27)b/i, /qwen/i, /gemma/i, /llama3/i,
                 /mistral/i, /./];
    for (var p = 0; p < prefs.length; p++) {
      for (var m = 0; m < models.length; m++) {
        if (prefs[p].test(models[m]) && !/embed/i.test(models[m])) return models[m];
      }
    }
    return "";
  }

  /* --------------------------------------------------------------- chat */

  function chat(messages, opts) {
    opts = opts || {};
    if (!status.via) return Promise.reject(new Error("Il Maestro no está conectado."));
    if (!config.model) return Promise.reject(new Error("Elegí un modelo en la pestaña Maestro."));
    var body = {
      model: config.model,
      messages: messages,
      stream: false,
      options: { temperature: opts.temperature != null ? opts.temperature : config.temperature }
    };
    if (opts.schema) body.format = opts.schema;
    else if (opts.json) body.format = "json";
    return fetchFn(status.via + "/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }).then(function (r) {
      return r.text().then(function (t) {
        if (!r.ok) {
          var msg = "HTTP " + r.status;
          try { msg = JSON.parse(t).error || msg; } catch (e) { /* testo grezzo */ }
          throw new Error(msg);
        }
        var j = JSON.parse(t);
        return (j.message && j.message.content) || "";
      });
    });
  }

  // Local models sometimes wrap JSON in prose or code fences: dig it out.
  function parseJSON(text) {
    if (typeof text !== "string") return text;
    var t = text.trim();
    try { return JSON.parse(t); } catch (e) { /* prova a scavare */ }
    var fence = t.match(/```(?:json)?\s*([\s\S]*?)```/i);
    if (fence) {
      try { return JSON.parse(fence[1].trim()); } catch (e) { /* continua */ }
    }
    var a = t.indexOf("{"), b = t.lastIndexOf("}");
    if (a >= 0 && b > a) {
      try { return JSON.parse(t.slice(a, b + 1)); } catch (e) { /* niente */ }
    }
    throw new Error("El modelo no devolvió JSON válido.");
  }

  /* ----------------------------------------------------------- contesto */

  // What the tutor needs to know about the week: title, focus, keys, and the
  // "trampa"/"atajo" callouts of the lesson, which are the most valuable
  // lines for a Spanish speaker.  Kept short so small models stay focused.
  function weekContext(week) {
    if (!week) return "";
    var lines = ["Semana " + week.week + " (" + week.level + "): " + week.title,
                 "Foco: " + week.focus];
    (week.keys || []).forEach(function (k) { lines.push("- " + k); });
    var L = week.lesson;
    if (L && L.blocks) {
      L.blocks.forEach(function (b) {
        if (b.warn) lines.push("Trampa (" + (b.h || "") + "): " + strip(b.warn));
        if (b.tip) lines.push("Atajo (" + (b.h || "") + "): " + strip(b.tip));
      });
    }
    return lines.join("\n").slice(0, 2400);
  }

  function strip(s) { return String(s || "").replace(/\*+/g, ""); }

  var PERSONA =
    "Sos Il Maestro, un profesor de italiano para hispanohablantes rioplatenses. " +
    "Explicás en español, tuteando con «vos», breve y concreto. Cuando corregís, " +
    "señalás la interferencia del castellano si la hay. Nunca inventás reglas: si " +
    "no estás seguro, lo decís.";

  var VERDICTS = ["giusto", "quasi", "sbagliato"];

  function toQ(verdict) {
    return verdict === "giusto" ? 2 : verdict === "quasi" ? 1 : 0;
  }

  /* ------------------------------------------------- correzione delle sfide */

  var GRADE_SCHEMA = {
    type: "object",
    properties: {
      items: {
        type: "array",
        items: {
          type: "object",
          properties: {
            label: { type: "string" },
            verdict: { type: "string", enum: VERDICTS },
            corrected: { type: "string" },
            why: { type: "string" }
          },
          required: ["label", "verdict", "corrected", "why"]
        }
      },
      overall: { type: "integer", minimum: 0, maximum: 2 },
      summary: { type: "string" }
    },
    required: ["items", "overall", "summary"]
  };

  function gradeChallenge(challenge, answerText, week) {
    var ex = challenge.items.map(function (i) {
      return i.label + ") " + i.text;
    }).join("\n");
    var msgs = [
      { role: "system", content: PERSONA + "\n\nContexto de la semana:\n" + weekContext(week) },
      { role: "user", content:
        "Ejercicio del manual Soluzioni (cap. " + challenge.chapter + ", " +
        challenge.chapterTitle + ").\nConsigna: " + challenge.instruction + "\n\n" +
        "Ítems:\n" + ex + "\n\n" +
        "Respuesta del estudiante (puede escribir los ítems por letra o en orden):\n" +
        answerText + "\n\n" +
        "Corregí ítem por ítem. verdict: «giusto» si es correcto, «quasi» si hay un " +
        "error menor (acento, ortografía, concordancia) pero la idea gramatical está, " +
        "«sbagliato» si falla la regla. corrected: la versión correcta en italiano. " +
        "why: una frase en español. Si el estudiante no respondió un ítem, es " +
        "«sbagliato» con why «sin respuesta». overall: 2 si casi todo giusto, 1 si " +
        "mezcla, 0 si mayormente sbagliato. summary: dos frases en español con la " +
        "regla que más falló. Respondé solo JSON." }
    ];
    return chat(msgs, { schema: GRADE_SCHEMA }).then(parseJSON).then(function (j) {
      j.items = (j.items || []).map(function (it) {
        if (VERDICTS.indexOf(it.verdict) < 0) it.verdict = "sbagliato";
        return it;
      });
      if (typeof j.overall !== "number") j.overall = overallFrom(j.items);
      j.overall = Math.max(0, Math.min(2, Math.round(j.overall)));
      j.q = j.overall;
      return j;
    });
  }

  function overallFrom(items) {
    if (!items.length) return 0;
    var sum = 0;
    items.forEach(function (i) { sum += toQ(i.verdict); });
    var avg = sum / items.length;
    return avg >= 1.5 ? 2 : avg >= 0.75 ? 1 : 0;
  }

  /* ---------------------------------------------------- scrittura libera */

  var WRITING_SCHEMA = {
    type: "object",
    properties: {
      corrected: { type: "string" },
      errors: {
        type: "array",
        items: {
          type: "object",
          properties: {
            wrong: { type: "string" },
            right: { type: "string" },
            why: { type: "string" }
          },
          required: ["wrong", "right", "why"]
        }
      },
      score: { type: "integer", minimum: 0, maximum: 10 },
      praise: { type: "string" },
      next: { type: "string" }
    },
    required: ["corrected", "errors", "score", "praise", "next"]
  };

  // A writing prompt built from the week's own keys, so the learner has to
  // use the grammar of the week; no model call needed for this part.
  function writingPrompt(week) {
    var keys = (week.keys || []).slice(0, 3);
    return "Escribí entre 5 y 8 frases en italiano sobre un tema cotidiano " +
      "(tu día, un viaje, una comida, tu trabajo). Tenés que usar lo de esta " +
      "semana: " + keys.join(" · ");
  }

  function correctWriting(text, week) {
    var msgs = [
      { role: "system", content: PERSONA + "\n\nContexto de la semana:\n" + weekContext(week) },
      { role: "user", content:
        "Texto del estudiante en italiano:\n\"\"\"\n" + text + "\n\"\"\"\n\n" +
        "Devolvé: corrected (el texto entero corregido, en italiano, cambiando lo " +
        "mínimo), errors (cada error: fragmento wrong, versión right, why en " +
        "español, una frase; máximo 8, los más importantes primero), score de 0 a " +
        "10 por corrección gramatical, praise (una frase honesta sobre lo que hizo " +
        "bien), next (una cosa concreta para practicar). Ignorá errores de estilo " +
        "si la gramática es correcta. Respondé solo JSON." }
    ];
    return chat(msgs, { schema: WRITING_SCHEMA }).then(parseJSON).then(function (j) {
      j.errors = j.errors || [];
      j.score = Math.max(0, Math.min(10, Math.round(+j.score || 0)));
      j.q = j.score >= 8 ? 2 : j.score >= 5 ? 1 : 0;
      return j;
    });
  }

  /* --------------------------------------------------- compagno di chat */

  function companionSystem(week) {
    var lvl = week ? week.level : "A2";
    return "Sei un amico italiano che chiacchiera con uno studente ispanofono di " +
      "livello " + lvl + ". Parli SOLO in italiano, con frasi corte e naturali, " +
      "adatte al livello. Fai una domanda alla volta per tenere viva la " +
      "conversazione. NON correggere gli errori durante la chat: la correzione " +
      "arriva alla fine. Se possibile, porta la conversazione verso la grammatica " +
      "della settimana senza dirlo.\n\nGrammatica della settimana:\n" +
      weekContext(week);
  }

  function companionOpen(week) {
    var topics = ["Ciao! Come va oggi? Cosa hai fatto di bello?",
                  "Ciao! Raccontami: com'è una tua giornata tipica?",
                  "Ehi, ciao! Che tempo fa da te oggi? Ti piace?",
                  "Ciao! Se potessi partire domani, dove andresti?",
                  "Ciao! Qual è l'ultima cosa buona che hai mangiato?"];
    var i = week ? week.week % topics.length : 0;
    return topics[i];
  }

  function companionReply(history, week) {
    var msgs = [{ role: "system", content: companionSystem(week) }].concat(history);
    return chat(msgs, { temperature: 0.7 }).then(function (t) { return t.trim(); });
  }

  var REPORT_SCHEMA = {
    type: "object",
    properties: {
      errors: {
        type: "array",
        items: {
          type: "object",
          properties: {
            said: { type: "string" },
            better: { type: "string" },
            why: { type: "string" }
          },
          required: ["said", "better", "why"]
        }
      },
      good: { type: "string" },
      summary: { type: "string" }
    },
    required: ["errors", "good", "summary"]
  };

  function companionReport(history, week) {
    var transcript = history.map(function (m) {
      return (m.role === "user" ? "Estudiante: " : "Amico: ") + m.content;
    }).join("\n");
    var msgs = [
      { role: "system", content: PERSONA + "\n\nContexto de la semana:\n" + weekContext(week) },
      { role: "user", content:
        "Esta es una conversación en italiano. Analizá SOLO los turnos del " +
        "estudiante.\n\n" + transcript + "\n\n" +
        "Devolvé: errors (hasta 5, los más útiles: said = lo que escribió, better = " +
        "cómo lo diría un italiano, why = una frase en español), good (una frase " +
        "sobre lo que ya hace bien), summary (dos frases en español: la regla que " +
        "más conviene repasar y una frase para animarlo). Respondé solo JSON." }
    ];
    return chat(msgs, { schema: REPORT_SCHEMA }).then(parseJSON).then(function (j) {
      j.errors = j.errors || [];
      return j;
    });
  }

  /* ------------------------------------------------------------------ api */

  loadConfig();

  var api = {
    config: config,
    status: status,
    loadConfig: loadConfig,
    saveConfig: saveConfig,
    detect: detect,
    candidates: candidates,
    pickModel: pickModel,
    chat: chat,
    parseJSON: parseJSON,
    weekContext: weekContext,
    toQ: toQ,
    overallFrom: overallFrom,
    gradeChallenge: gradeChallenge,
    writingPrompt: writingPrompt,
    correctWriting: correctWriting,
    companionSystem: companionSystem,
    companionOpen: companionOpen,
    companionReply: companionReply,
    companionReport: companionReport,
    _setFetch: function (fn) { fetchFn = fn; },
    _schemas: { grade: GRADE_SCHEMA, writing: WRITING_SCHEMA, report: REPORT_SCHEMA }
  };

  if (typeof module === "object" && module.exports) module.exports = api;
  else root.Tutor = api;
})(typeof window !== "undefined" ? window : globalThis);
