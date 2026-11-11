/*
 * «📬 Te llegó un mensaje»: una tarea para algo.
 *
 * El alumno dijo que le aburre ejercitar y que lo trae de vuelta usar la
 * lengua para algo real.  La tarea: llega un mensaje como los de la vida
 * (un mail del trabajo, un aviso del edificio, un WhatsApp de un colega),
 * escrito a su nivel; lo lee, contesta dos preguntas para ver si lo
 * entendió y lo responde por escrito.  Del otro lado contesta el personaje,
 * y la app dice si la respuesta logró lo que se pedía y qué corregir.
 *
 * El mensaje y la corrección los escribe la IA con la clave del alumno
 * (ia.js): es texto generado, no revisado, y la pantalla lo dice.  Lo que la
 * IA devuelve se valida acá antes de mostrarse (campos, dos preguntas con
 * tres opciones, correcciones que estén de verdad en lo que el alumno
 * escribió).  Sin DOM: se prueba en node (tools/lib/test_tarea.js).
 */
(function (root) {
  "use strict";

  // [tema, para quién va mejor]
  var TEMAS = [
    ["un mail de un compañero de trabajo que pide mover una reunión", "trabajo"],
    ["un aviso del administrador del edificio sobre un corte de agua", ""],
    ["un mensaje de un cliente que pregunta por el estado de un pedido", "trabajo"],
    ["un mensaje de un amigo que propone un plan para el fin de semana", ""],
    ["un mail de tu jefa que pide un informe corto para el jueves", "trabajo"],
    ["un aviso de una biblioteca o un curso con un cambio de horario", ""],
    ["un mensaje del dueño del departamento que alquilás, por una reparación", ""],
    ["un mail de un proveedor que avisa que una entrega se demora", "trabajo"],
    ["una invitación a una cena con día, hora y algo para llevar", ""],
    ["un mensaje de un hotel o un alojamiento que confirma una reserva y pregunta la hora de llegada", "viaje"],
    ["un mail de recursos humanos sobre unos días de vacaciones", "trabajo"],
    ["un mensaje de un vecino que pide un favor", ""]
  ];
  function tema(day, why) {
    var pool = TEMAS.filter(function (t) { return !why || !t[1] || t[1] === why; });
    if (pool.length < 4) pool = TEMAS;
    var n = 0, k = String(day || "");
    for (var i = 0; i < k.length; i++) n = (n * 31 + k.charCodeAt(i)) % 9973;
    return pool[n % pool.length][0];
  }

  /* ctx: { lang: «italiano», level: «A2», week, temas: [títulos de lo ya
     visto], tiempos: [tiempos ya enseñados], why, day, n (cuántas van hoy) } */
  function prompt(ctx) {
    ctx = ctx || {};
    return "Sos un autor de material para estudiantes de " + (ctx.lang || "idiomas") + " (hispanohablantes rioplatenses). " +
      "Escribí un mensaje realista que le llega al estudiante: " + tema((ctx.day || "") + ":" + (ctx.n || 0), ctx.why) + ".\n" +
      "Nivel del estudiante: " + (ctx.level || "A2") + " (semana " + (ctx.week || 1) + " de 52). " +
      (ctx.tiempos && ctx.tiempos.length ? "Tiempos verbales que ya conoce (usá SOLO estos): " + ctx.tiempos.join(", ") + ". " : "") +
      (ctx.temas && ctx.temas.length ? "Temas de gramática ya vistos: " + ctx.temas.join("; ") + ". " : "") +
      "El mensaje va en " + (ctx.lang || "la lengua meta") + " natural y correcto, de 45 a 80 palabras, con datos concretos (un día, una hora, un nombre, un lugar) " +
      "y tiene que pedir algo que obligue a contestar. Nada de traducción dentro del mensaje.\n" +
      'Respondé SOLO con JSON: {"tipo":"mail|mensaje|aviso","de":"quién lo manda","asunto":"asunto corto en la lengua meta","texto":"el mensaje",' +
      '"glosas":[["palabra del mensaje","significado en castellano"]],' +
      '"preguntas":[{"q":"pregunta de comprensión en castellano","opciones":["…","…","…"],"correcta":0},{"q":"…","opciones":["…","…","…"],"correcta":2}],' +
      '"pedido":"en castellano: qué tiene que contestar el estudiante y las dos cosas que su respuesta tiene que incluir"}\n' +
      "Las glosas: hasta 6 palabras del mensaje que probablemente no conozca. Las dos preguntas se contestan leyendo el mensaje (un dato cada una), " +
      "con una sola opción correcta y las opciones en castellano.";
  }
  function str(v, max) { return String(v == null ? "" : v).trim().slice(0, max || 600); }
  // What the model sent, checked: null when it cannot be used.
  function valid(d) {
    if (!d || typeof d !== "object") return null;
    var texto = str(d.texto, 900), pedido = str(d.pedido, 400);
    var words = texto.split(/\s+/).filter(Boolean).length;
    if (words < 20 || words > 140 || !pedido) return null;
    var qs = (Array.isArray(d.preguntas) ? d.preguntas : []).map(function (q) {
      var ops = (q && Array.isArray(q.opciones) ? q.opciones : []).map(function (o) { return str(o, 140); }).filter(Boolean);
      var c = +(q && q.correcta);
      return q && str(q.q) && ops.length === 3 && c >= 0 && c < 3 && c === Math.floor(c) ? { q: str(q.q, 240), opciones: ops, correcta: c } : null;
    }).filter(Boolean).slice(0, 2);
    if (qs.length < 2) return null;
    var low = texto.toLowerCase();
    var gl = (Array.isArray(d.glosas) ? d.glosas : []).filter(function (g) {
      return Array.isArray(g) && str(g[0]) && str(g[1]) && low.indexOf(str(g[0]).toLowerCase()) >= 0;
    }).map(function (g) { return [str(g[0], 40), str(g[1], 80)]; }).slice(0, 6);
    var tipo = str(d.tipo, 12).toLowerCase();
    return { tipo: ["mail", "mensaje", "aviso"].indexOf(tipo) >= 0 ? tipo : "mensaje", de: str(d.de, 60), asunto: str(d.asunto, 90),
             texto: texto, glosas: gl, preguntas: qs, pedido: pedido };
  }

  function evalPrompt(task, reply, ctx) {
    ctx = ctx || {};
    return "Sos " + (task.de || "quien mandó el mensaje") + " y también profesor de " + (ctx.lang || "idiomas") + " de un hispanohablante rioplatense de nivel " + (ctx.level || "A2") + ".\n" +
      "Le llegó este mensaje:\n«" + task.texto + "»\n" +
      "Tenía que: " + task.pedido + "\n" +
      "Contestó esto:\n«" + reply + "»\n\n" +
      "1) Como el personaje, contestale en " + (ctx.lang || "la lengua meta") + " en una o dos oraciones, reaccionando a lo que dijo. " +
      "2) Decí si su respuesta logró lo pedido (si incluyó las dos cosas); si no, qué faltó, en castellano. " +
      "3) Marcá hasta 4 errores REALES de lengua: «mal» tiene que ser un trozo copiado tal cual de su respuesta, «bien» la forma correcta y «porque» una razón corta en castellano. " +
      "Si algo es aceptable aunque poco elegante, no lo marques. Si no hay errores, lista vacía. " +
      "4) «version»: su respuesta entera, corregida, con sus mismas ideas.\n" +
      'Respondé SOLO con JSON: {"respuesta":"…","logrado":true,"falta":"","correcciones":[{"mal":"…","bien":"…","porque":"…"}],"version":"…"}';
  }
  function validEval(d, reply) {
    if (!d || typeof d !== "object" || !str(d.respuesta)) return null;
    var low = String(reply || "").toLowerCase();
    var cs = (Array.isArray(d.correcciones) ? d.correcciones : []).filter(function (c) {
      // only what the learner really wrote, and a real change
      return c && str(c.mal) && str(c.bien) && low.indexOf(str(c.mal).toLowerCase()) >= 0 && str(c.mal).toLowerCase() !== str(c.bien).toLowerCase();
    }).map(function (c) { return { mal: str(c.mal, 160), bien: str(c.bien, 160), porque: str(c.porque, 220) }; }).slice(0, 4);
    return { respuesta: str(d.respuesta, 400), logrado: d.logrado === true || d.logrado === "true", falta: str(d.falta, 300),
             correcciones: cs, version: str(d.version, 900) };
  }
  // enough was written to be worth sending (a greeting alone is not an answer)
  function enough(reply) { return String(reply || "").trim().split(/\s+/).filter(Boolean).length >= 12; }

  var api = { TEMAS: TEMAS, tema: tema, prompt: prompt, valid: valid, evalPrompt: evalPrompt, validEval: validEval, enough: enough, MIN: 12 };
  if (typeof module === "object" && module.exports) module.exports = api;
  root.Tarea = api;
})(typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : this);
