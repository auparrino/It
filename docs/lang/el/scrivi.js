/* Scrivi del griego: por ahora, solo el role-play con la IA.
 *
 * El griego todavía no tiene la escritura semanal ni su corrector de reglas
 * (TASKS está vacío y no hay check): este archivo trae lo que el role-play
 * de app.js pide (parlaStart, parlaTurn, parlaGoals, parlaRewrite,
 * parlaReview), con los mismos campos JSON que el italiano y el portugués
 * (titolo, ruolo_ia, obiettivi, risposta, recast…: los lee app.js), y los
 * tipos de error que la revisión final puede asignar (AI_TYPES).
 * Sin este archivo, el botón «Empezar» del role-play rompería en griego.
 */
(function (root) {
  "use strict";
  var IA = root.IA || (typeof require === "function" ? (function () { try { return require("../../js/ia.js"); } catch (e) { return null; } })() : null);

  // Sin tareas de escritura todavía (app.js, escritura_plus.js y reglas.js miran TASKS[semana]).
  var TASKS = {};

  var AI_TYPES = {
    genero: "género del sustantivo (ο, η, το)", articulo: "artículo (forma, falta o sobra)",
    caso: "caso (nominativo, acusativo, genitivo)", concordancia: "concordancia del adjetivo",
    plural: "plural del sustantivo", orden: "orden de las palabras",
    preposicion: "preposición (σε, από, με, για)", pronombre: "pronombre (με, σε, τον; μου, σου, του)",
    conjugacion: "conjugación (persona o número)", tiempo: "tiempo verbal (presente, aoristo, futuro)",
    aspecto: "aspecto (tema del presente o del aoristo después de να y θα)",
    negacion: "negación (δεν / μην)", tilde: "acento escrito (τόνος)", ortografia: "ortografía (η/ι/υ/ει/οι, ο/ω, αι/ε)",
    espanol: "palabra o construcción del castellano", falso_amigo: "falso amigo", lexico: "palabra equivocada",
    registro: "registro (εσύ / εσείς)", faltante: "falta una palabra", sobrante: "sobra una palabra",
    estilo: "correcto pero poco natural (sugerencia, no error)"
  };

  // The tenses the learner knows, by level (the Greek course has no conjugator yet).
  function tensesOf(ctx) {
    if (ctx && ctx.tenses) return ctx.tenses;
    var lv = (ctx && ctx.level) || "A1";
    return lv === "A1" ? "presente y, si hace falta, θα o να con verbos muy frecuentes" :
           lv === "A2" ? "presente, aoristo, futuro con θα y να + subjuntivo" :
           lv === "B1" ? "presente, aoristo, imperfecto, futuro, να + subjuntivo e imperativo" :
           "todos los tiempos y la voz medio-pasiva";
  }
  function wordsOf(ctx) {
    var w = (ctx && ctx.words) || [];
    return w.length ? " El alumno conoce, entre otras, estas palabras: " + w.slice(0, 100).join(", ") + "." : "";
  }

  // Greek first: the vocabulary list is a preference, never a reason to write broken Greek.
  var DEUTSCH_ZUERST = "Tu griego tiene que ser SIEMPRE correcto y natural, griego moderno estándar (dimotikí), en alfabeto griego y con sistema monotónico: " +
    "cada palabra de dos o más sílabas con su acento, género, caso y concordancia bien, «εσείς» si la situación es formal y «εσύ» si es entre amigos, " +
    "y el signo de pregunta griego (;). Nunca escribas griego con letras latinas. " +
    "Preferí palabras simples y frecuentes y oraciones cortas, pero nunca sacrifiques la gramática ni el sentido.";

  /* ------------------------------------------------------------ el role-play
     Role-play with a goal (Wang et al. 2025; Dugan et al. 2026): hard,
     measurable rules instead of a persona; one recast and at most one note
     per turn. */
  function parlaScenarioPrompt(ctx) {
    return "Diseñá un role-play breve en griego para un hispanohablante rioplatense de nivel " + ctx.level + " (semana " + ctx.week +
      " de 52). Función de la semana: «" + ctx.fare + "». Tema: «" + ctx.tema + "». La situación pasa en Grecia " +
      "(un kafeneío, el puerto, el ferry a una isla, una taberna, el mercado, el períptero, una casa de familia…).\n" +
      "Reglas: el alumno tiene que conseguir TRES objetivos comunicativos concretos y verificables hablando con vos. " +
      "Vos hacés un personaje con un rol claro (mozo de la taberna, vecina, dueño del hotel, empleada del puerto…), no un profesor. Frases de máximo " + ctx.maxWords + " palabras. " +
      "Usá solo estos tiempos verbales: " + tensesOf(ctx) + ". " + DEUTSCH_ZUERST + wordsOf(ctx) + "\n" +
      "Respondé SOLO con JSON, con estos nombres de campo tal cual (sin traducirlos ni envolverlos en otro objeto): {\"titolo\": \"título corto en griego\", \"ruolo_ia\": \"quién sos, en griego\", " +
      "\"situazione_es\": \"la situación explicada al alumno en castellano, 2 oraciones\", " +
      "\"obiettivi\": [\"objetivo 1 en castellano\", \"objetivo 2\", \"objetivo 3\"], " +
      "\"apertura\": \"tu primera frase en griego, en personaje\", \"parole_utili\": [\"6 palabras o expresiones griegas útiles, los sustantivos con artículo\"]}";
  }
  function parlaTurnPrompt(scen, history, userText, ctx, done) {
    var pending = scen.obiettivi.map(function (o, i) { return (done || []).indexOf(i + 1) < 0 ? (i + 1) + ") " + o : null; }).filter(Boolean);
    return "Seguís un role-play en griego con un alumno hispanohablante de nivel " + ctx.level + ". Tu personaje: " + scen.ruolo_ia +
      ". Situación: " + String(scen.situazione_es || "").replace(/\.\s*$/, "") + ". Objetivos del alumno: " + scen.obiettivi.map(function (o, i) { return (i + 1) + ") " + o; }).join(" ") +
      (pending.length ? ". Todavía le faltan: " + pending.join(" ") : "") + "\n" +
      "Cómo conversar: respondé primero a lo que el alumno acaba de decir o preguntar (si te pregunta algo, contestalo en personaje, con un dato concreto); " +
      "no repitas lo que ya dijiste antes; mantené el hilo de la situación; terminá con UNA pregunta simple que lo acerque a un objetivo pendiente. " +
      "Si el alumno escribe algo raro, en castellano o fuera de tema, reaccioná con naturalidad en griego y volvé a la situación.\n" +
      "Reglas: en personaje, en griego, máximo " + ctx.maxWords + " palabras, solo estos tiempos: " + tensesOf(ctx) + ". " + DEUTSCH_ZUERST + wordsOf(ctx) + "\n" +
      "No corrijas dentro del diálogo. En \"recast\" dá la frase del alumno corregida con el cambio mínimo (o \"\" si estaba bien): fijate en el género y el artículo, " +
      "el caso (nominativo o acusativo), la terminación del verbo, los acentos y las palabras del castellano. Si el alumno escribió con letras latinas, pasalo a alfabeto griego. " +
      "En \"nota_es\", UNA observación breve en castellano sobre el error más importante (o vacío); no inventes reglas.\n" +
      "Objetivos: un objetivo está cumplido si el alumno lo logró de forma comprensible, aunque sea con errores.\n" +
      "Conversación hasta ahora:\n" + history.map(function (h) { return (h[0] === "ia" ? "Personaje: " : "Alumno: ") + h[1]; }).join("\n") +
      "\nAlumno: " + userText + "\n\n" +
      "Respondé SOLO con JSON: {\"risposta\": \"tu turno en griego\", \"recast\": \"la frase del alumno corregida, o \\\"\\\" si estaba bien\", " +
      "\"nota_es\": \"una observación o vacío\", \"obiettivi_raggiunti\": [números de TODOS los objetivos cumplidos por el alumno hasta ahora], \"fine\": true si los tres objetivos están cumplidos}";
  }
  // Only the hard words, by simpler synonyms: the sentence stays Greek.
  function parlaRewritePrompt(reply, miss) {
    return "Ξαναγράψε αυτή την πρόταση σε απλά ελληνικά και αντικατάστησε μόνο αυτές τις δύσκολες λέξεις με πιο συχνά συνώνυμα: " + miss.join(", ") +
      ". Ίδιο νόημα, ολόκληρη και γραμματικά σωστή πρόταση (γένος, πτώση, τόνοι), το πολύ 25 λέξεις. " +
      "Πρόταση: «" + reply + "». Απάντησε ΜΟΝΟ με JSON: {\"risposta\": \"...\"}";
  }
  function parlaReviewPrompt(scen, history) {
    var mine = history.map(function (h, i) { return h[0] === "me" ? i : -1; }).filter(function (i) { return i >= 0; });
    return "Sos profesor de griego. Un alumno hispanohablante escribió estas frases en un role-play (situación: " + scen.situazione_es + ").\n" +
      "Conversación:\n" + history.map(function (h, i) { return (h[0] === "ia" ? "Personaje: " : "Alumno [" + i + "]: ") + h[1]; }).join("\n") + "\n\n" +
      "Revisá cada frase del alumno. Corrección mínima: cambiá solo lo que está mal, no reescribas lo que ya es correcto. Mirá el género y el artículo, " +
      "el caso, las terminaciones del verbo, el aspecto después de να y θα, los acentos " +
      "y el castellano metido. Lo coloquial correcto (μιλάω / μιλώ, τι κάνεις;) no es error. Un acento que falta es error de tipo «tilde». Si la frase está bien, \"ok\": true. No inventes reglas.\n" +
      "Respondé SOLO con JSON: {\"frasi\": [{\"i\": número de la frase, \"ok\": true o false, \"corretta\": \"la frase corregida\", " +
      "\"nota\": \"una observación breve en castellano rioplatense, o vacío\", \"tipo\": \"el tipo del error principal, uno de: " + Object.keys(AI_TYPES).join(", ") + "\"}]} con una entrada para cada una de estas frases: " + mine.join(", ");
  }
  /* The turn as a chat: the rules in the system message, the conversation as
     real turns, and the format with the learner's message. */
  function parlaTurnChat(scen, history, userText, ctx, done) {
    var full = parlaTurnPrompt(scen, [], "", ctx, done);
    var cut = full.indexOf("Conversación hasta ahora:"), at = full.indexOf("Respondé SOLO con JSON");
    var rules = cut > 0 ? full.slice(0, cut).trim() : full, fmt = at > 0 ? full.slice(at) : "";
    var msgs = [{ role: "user", content: "(Empieza el role-play.)" }];
    history.forEach(function (h) {
      var text = String(h[1] || "");
      if (h[0] === "ia" && /^\(/.test(text)) return;                 // avisos de la app, no del personaje
      var role = h[0] === "ia" ? "assistant" : "user", last = msgs[msgs.length - 1];
      if (last.role === role) last.content += "\n" + text; else msgs.push({ role: role, content: text });
    });
    if (msgs[msgs.length - 1].role === "user") msgs[msgs.length - 1].content += "\n" + userText; else msgs.push({ role: "user", content: userText });
    fmt = fmt.replace('{\"risposta\"', '{\"capito\": \"en castellano y en pocas palabras, qué dijo, pidió o preguntó el alumno en su ÚLTIMO mensaje\", \"risposta\"');
    return { system: rules + "\nCada mensaje del alumno llega como un turno. Tu \"risposta\" responde a ESE mensaje: si pregunta, contestá con un dato concreto; si pide algo, dáselo o negocialo en personaje; si cuenta algo, reaccioná a eso. Nunca sigas un guion propio ignorando lo que escribió.\n" + fmt, messages: msgs };
  }
  function parlaGoalsPrompt(scen, history) {
    return "Sos profesor de griego. Un alumno hispanohablante hace un role-play escrito. Situación: " + String(scen.situazione_es || "") + "\n" +
      "Sus objetivos:\n" + scen.obiettivi.map(function (o, i) { return (i + 1) + ") " + o; }).join("\n") + "\n\n" +
      "Conversación:\n" + history.map(function (h) { return (h[0] === "ia" ? "Personaje: " : "Alumno: ") + h[1]; }).join("\n") + "\n\n" +
      "¿Qué objetivos ya cumplió el alumno con lo que ÉL escribió? Un objetivo está cumplido si lo intentó de forma comprensible, aunque tenga errores de " +
      "gramática o use palabras del castellano; no hace falta que use palabras exactas. No cuenta lo que dijo el personaje.\n" +
      "Respondé SOLO con JSON: {\"cumplidos\": [números], \"motivo\": \"una frase en castellano\"}";
  }

  // Every request goes through the core client (js/ia.js).
  function llm(prompt, keys, done, opts) {
    var C = root.IA || IA;
    if (!C) return done(new Error("sin cliente de IA"));
    return C.llm(prompt, keys, done, opts);
  }
  function parlaGoals(scen, history, keys, done) { llm(parlaGoalsPrompt(scen, history), keys, done, { max: 200 }); }
  function parlaStart(ctx, keys, done) { llm(parlaScenarioPrompt(ctx), keys, done, { max: 900 }); }
  // opts.stream: the character's line as it is being written (the app shows it live).
  function parlaTurn(scen, history, userText, ctx, keys, done, reached, opts) {
    opts = opts || {};
    llm(parlaTurnChat(scen, history, userText, ctx, reached), keys, done, { stream: opts.stream, max: 600, hedge: opts.hedge || 8000, temperature: 0.5 });
  }
  function parlaRewrite(reply, miss, keys, done) { llm(parlaRewritePrompt(reply, miss), keys, done, { max: 300 }); }
  function parlaReview(scen, history, keys, done) { llm(parlaReviewPrompt(scen, history), keys, done, { think: "low" }); }

  var api = { TASKS: TASKS, AI_TYPES: AI_TYPES, llm: llm,
              parlaStart: parlaStart, parlaTurn: parlaTurn, parlaRewrite: parlaRewrite, parlaReview: parlaReview, parlaGoals: parlaGoals,
              parlaScenarioPrompt: parlaScenarioPrompt, parlaTurnPrompt: parlaTurnPrompt, parlaTurnChat: parlaTurnChat,
              parlaRewritePrompt: parlaRewritePrompt, parlaReviewPrompt: parlaReviewPrompt, parlaGoalsPrompt: parlaGoalsPrompt };
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.Scrivi = api;
})(typeof window !== "undefined" ? window : globalThis);
