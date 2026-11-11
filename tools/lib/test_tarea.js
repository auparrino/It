/* «📬 Te llegó un mensaje» (docs/js/tarea.js): lo que la IA devuelve se
   valida antes de mostrarse; lo que no sirve se descarta.
     node tools/lib/test_tarea.js */
"use strict";
var T = require("./testkit.js")("lib"), ok = T.ok, eq = T.eq;
var Tarea = require("../../docs/js/tarea.js");

var ctx = { lang: "italiano", level: "A2", week: 7, day: "2026-11-11", n: 0, why: "trabajo", temas: ["Numeri, date e ora"], tiempos: ["presente"] };
var p = Tarea.prompt(ctx);
ok(/italiano/.test(p) && /A2/.test(p) && /SOLO estos\): presente/.test(p) && /"preguntas"/.test(p) && /"pedido"/.test(p), "el pedido lleva el idioma, el nivel, los tiempos ya enseñados y el formato");
eq(Tarea.tema("2026-11-11:0", "trabajo"), Tarea.tema("2026-11-11:0", "trabajo"), "el tema del día es estable");
ok(Tarea.TEMAS.some(function (t) { return t[0] === Tarea.tema("2026-11-12:1", ""); }), "y sale de la lista");

var texto = "Ciao Marco, domani ho una riunione con un cliente alle dieci e non posso venire alla nostra riunione. Possiamo spostarla a giovedì alle tre? Dimmi se per te va bene e in quale sala ci vediamo. Grazie, Laura";
var good = { tipo: "Mail", de: "Laura", asunto: "Riunione di domani", texto: texto, glosas: [["spostarla", "moverla"], ["inventata", "no está"]],
  preguntas: [{ q: "¿Por qué no puede ir?", opciones: ["Tiene otra reunión", "Está enferma", "Viaja"], correcta: 0 }, { q: "¿Qué día propone?", opciones: ["Lunes", "Martes", "Jueves"], correcta: 2 }],
  pedido: "Contestale si podés el jueves a las tres y decile en qué sala." };
var t = Tarea.valid(good);
ok(!!t && t.tipo === "mail" && t.preguntas.length === 2, "un mensaje completo se acepta");
eq(t.glosas, [["spostarla", "moverla"]], "las glosas de palabras que no están en el mensaje se descartan");
eq(Tarea.valid(Object.assign({}, good, { texto: "Ciao." })), null, "un mensaje demasiado corto: no");
eq(Tarea.valid(Object.assign({}, good, { preguntas: good.preguntas.slice(0, 1) })), null, "con una sola pregunta: no");
eq(Tarea.valid(Object.assign({}, good, { preguntas: [good.preguntas[0], { q: "x", opciones: ["a", "b"], correcta: 0 }] })), null, "una pregunta con dos opciones: no");
eq(Tarea.valid(Object.assign({}, good, { preguntas: [good.preguntas[0], { q: "x", opciones: ["a", "b", "c"], correcta: 5 }] })), null, "una correcta fuera de rango: no");
eq(Tarea.valid(Object.assign({}, good, { pedido: "" })), null, "sin pedido: no");
eq(Tarea.valid(null), null, "sin respuesta: no");

var reply = "Ciao Laura, giovedì alle tre per me va bene. Ci vediamo in la sala grande al secondo piano. A presto, Marco";
ok(Tarea.enough(reply) && !Tarea.enough("Ciao Laura, va bene."), "doce palabras o más para enviar");
var ev = Tarea.validEval({ respuesta: "Perfetto, a giovedì!", logrado: true, falta: "", version: "…",
  correcciones: [{ mal: "in la sala", bien: "nella sala", porque: "in + la = nella" }, { mal: "non scritto", bien: "x", porque: "" }, { mal: "va bene", bien: "va bene", porque: "igual" }] }, reply);
ok(!!ev && ev.logrado === true && ev.respuesta === "Perfetto, a giovedì!", "la corrección se acepta");
eq(ev.correcciones.map(function (c) { return c.mal; }), ["in la sala"], "solo quedan las correcciones de algo que el alumno escribió de verdad y que cambian algo");
eq(Tarea.validEval({ logrado: true }, reply), null, "sin la respuesta del personaje: no");
var ep = Tarea.evalPrompt(t, reply, ctx);
ok(ep.indexOf(texto) >= 0 && ep.indexOf(reply) >= 0 && /copiado tal cual/.test(ep), "el pedido de corrección lleva el mensaje, la respuesta y pide citas literales");

var Boot = require("../../docs/js/boot.js"), k = Boot.ORDER.map(function (e) { return e.core; });
ok(k.indexOf("tarea.js") >= 0 && k.indexOf("tarea.js") < k.indexOf("app.js"), "tarea.js está en ORDER, antes de app.js");
var app = require("fs").readFileSync(require("path").join(__dirname, "../../docs/js/app.js"), "utf8");
ok(/Tarea\.valid\(data\)/.test(app) && /Tarea\.validEval\(data, tarea\.reply\)/.test(app), "la app valida el mensaje y la corrección antes de mostrarlos");
ok(/Mensaje escrito por la IA/.test(app) && /Corrección de la IA: puede equivocarse/.test(app), "y los rotula como generados");

T.done();
