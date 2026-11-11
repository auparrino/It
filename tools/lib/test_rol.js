/* «🧩 Qué es cada palabra» (docs/js/rol.js).
   1. La clase de cada palabra, en italiano y portugués, con los datos del
      curso: lo seguro se rotula, lo que puede ser dos cosas se dice («verbo o
      sustantivo») o se decide con lo que es seguro (después de un artículo o
      una preposición va un nombre), y lo que no se sabe queda sin rótulo.
      Los casos de abajo son justo los que una regla simple rotularía mal.
   2. La función que contesta la IA se valida: cada grupo tiene que estar en
      la oración, en orden, y la función en la lista cerrada.
     node tools/lib/test_rol.js */
"use strict";
var T = require("./testkit.js")("lib"), ok = T.ok, eq = T.eq;
var pack = require("./pack.js");

function setup(code) {
  var ctx = pack(code);
  ctx.Rol._reset();
  ctx.Rol.load(pack.data(code, "bank.json"));
  return function (text) {
    return ctx.Rol.clases(text).filter(function (p) { return !p.sep; })
      .map(function (p) { return p.t + ":" + (p.cls || (p.amb ? p.amb.join("/") : "?")); }).join(" ");
  };
}
var it = setup("it");
eq(it("Maria mangia la mela."), "Maria:? mangia:ver la:art mela:sus", "it: artículo delante de un nombre; un nombre propio, sin rótulo");
eq(it("Mi piace il caffè."), "Mi:pro piace:ver il:art caffè:sus", "it: pronombre átono, verbo, artículo, sustantivo");
eq(it("Domani andiamo al mare con gli amici."), "Domani:adv andiamo:ver al:contr mare:sus con:prep gli:art amici:sus", "it: la contracción no es además preposición; gli + nombre = artículo");
eq(it("Gli ho dato il libro ieri."), "Gli:pro ho:ver dato:ver/sus il:art libro:sus ieri:adv", "it: gli + verbo = pronombre; lo dudoso se dice");
eq(it("Il lavoro è difficile."), "Il:art lavoro:sus è:ver difficile:adj", "it: después de un artículo, «lavoro» es sustantivo");
eq(it("Lavoro in un ufficio grande."), "Lavoro:ver/sus in:prep un:art ufficio:sus grande:adj", "it: sin artículo delante, «lavoro» queda en duda");
eq(it("La porto a casa."), "La:art/pro porto:ver/sus a:prep casa:sus", "it: «la porto» no se adivina (ni artículo + nombre ni pronombre + verbo)");
eq(it("Vorrei un caffè, per favore."), "Vorrei:ver un:art caffè:sus per:prep favore:sus", "it: después de una preposición, un nombre");
eq(it("La ragazza che conosci è mia sorella."), "La:art ragazza:sus che:? conosci:ver è:ver mia:? sorella:sus", "it: «che» fuera de una pregunta, sin rótulo");
eq(it("Ti chiamo dopo cena."), "Ti:pro chiamo:ver dopo:? cena:ver/sus", "it: «dopo» delante de un nombre no se rotula como adverbio");
eq(it("Non lo so."), "Non:adv lo:pro so:ver", "it: lo + verbo = pronombre");
eq(it("Che fai?"), "Che:int fai:ver", "it: en una pregunta, interrogativo");
eq(it("Questo libro è mio."), "Questo:? libro:sus è:ver mio:pro", "it: «questo» delante de un nombre no es pronombre");

var pt = setup("pt");
eq(pt("A gente vai na praia amanhã."), "A:art gente:sus vai:ver na:contr praia:sus amanhã:adv", "pt: contracción y artículo");
eq(pt("Me dá dois pães, por favor?"), "Me:pro dá:ver dois:num pães:sus por:prep favor:sus", "pt: pronombre, numeral, preposición");
eq(pt("Eu gosto de café."), "Eu:pro gosto:ver/sus de:prep café:sus", "pt: «gosto» puede ser las dos cosas y se dice");

var ctx = pack("it"), Rol = ctx.Rol;
Rol._reset(); Rol.load(pack.data("it", "bank.json"));
ok(Rol.useful(Rol.clases("Mi piace il caffè.")), "con la mitad de las palabras rotuladas, se muestra");
ok(!Rol.useful(Rol.clases("Ciao!")), "una palabra sola no");
eq(Rol.clases("Xyz qwerty zzz.").filter(function (p) { return p.cls || p.amb; }).length, 0, "lo que no está en el banco no se rotula");
var de = pack("de");
de.Rol._reset(); de.Rol.load({});
ok(!de.Rol.useful(de.Rol.clases("Ich habe einen Hund.")), "alemán (sin banco todavía): no muestra clases inventadas");

// la función, de la IA: validada contra la oración
var good = { grupos: [{ texto: "Mi", funcion: "objeto indirecto", porque: "a quién le gusta" }, { texto: "piace", funcion: "Verbo", porque: "" },
  { texto: "il caffè", funcion: "sujeto", porque: "concuerda con el verbo" }], sujeto_tacito: "" };
var r = Rol.parse(good, "Mi piace il caffè.");
ok(!!r && r.grupos.length === 3, "una respuesta que cubre la oración, en orden, se acepta");
eq(r.grupos.map(function (g) { return g.funcion; }), ["objeto indirecto", "verbo", "sujeto"], "con las funciones de la lista (sin importar mayúsculas)");
eq(Rol.parse({ grupos: [{ texto: "il caffè", funcion: "sujeto" }, { texto: "Mi", funcion: "objeto indirecto" }, { texto: "piace", funcion: "verbo" }] }, "Mi piace il caffè."), null, "grupos fuera de orden: se rechaza");
eq(Rol.parse({ grupos: [{ texto: "Mi piace il tè", funcion: "sujeto" }] }, "Mi piace il caffè."), null, "un grupo que no está en la oración: se rechaza");
eq(Rol.parse({ grupos: [{ texto: "piace", funcion: "verbo" }] }, "Mi piace il caffè."), null, "si deja la mayor parte sin analizar: se rechaza");
eq(Rol.parse({ grupos: [{ texto: "Mi piace il caffè", funcion: "predicado raro" }] }, "Mi piace il caffè.").grupos[0].funcion, "otro", "una función fuera de la lista pasa a «otro»");
eq(Rol.parse(null, "x"), null, "sin respuesta: null");
ok(/EXACTAMENTE una de: sujeto, verbo, objeto directo/.test(Rol.prompt("Mi piace il caffè.", "italiano")) && /Mi piace il caffè\./.test(Rol.prompt("Mi piace il caffè.", "italiano")), "el pedido lleva la oración y la lista cerrada");
eq([Rol.familia("sujeto"), Rol.familia("objeto directo"), Rol.familia("complemento de lugar"), Rol.familia("nexo")], ["suj", "od", "comp", "otro"], "las familias de color");

var Boot = require("../../docs/js/boot.js"), k = Boot.ORDER.map(function (e) { return e.core; });
ok(k.indexOf("rol.js") > k.indexOf("desglose.js") && k.indexOf("rol.js") < k.indexOf("app.js"), "rol.js está en ORDER, después de desglose.js y antes de app.js");
var app = require("fs").readFileSync(require("path").join(__dirname, "../../docs/js/app.js"), "utf8");
ok(/function rolFnHtml[\s\S]{0,700}generado por la IA/.test(app), "lo que contesta la IA va rotulado como generado");
ok(/Rol\.parse\(data, text\)/.test(app), "y pasa por Rol.parse antes de mostrarse");

T.done();
