/*
 * Las devoluciones del portugués (docs/js/devolucion.js).
 *
 * keep:  categorías del diagnóstico que valen aunque la respuesta no se
 *        parezca a la correcta (todo escrito en español).
 * terms: [expresión, semana, en criollo]: el nombre de un tiempo o modo y
 *        la semana en que el curso lo enseña (course.json, weeks[].tenses;
 *        «indicativo» aparece en la teoría en la semana 23).  Antes de esa
 *        semana las devoluciones dicen lo de la derecha.  Los más largos
 *        primero.
 */
(function (root) {
  "use strict";
  var DATA = {
    keep: ["espanol"],
    terms: [
      ["\\b(pretérito )?mais-que-perfeito do subjuntivo\\b", 30, "subjuntivo pluscuamperfecto (como «hubiera hecho»)"],
      ["\\bpretérito perfeito do subjuntivo\\b", 30, "subjuntivo compuesto (como «haya hecho»)"],
      ["\\b(pretérito )?imperfeito do subjuntivo\\b", 28, "subjuntivo pasado (como «hiciera»)"],
      ["\\bfuturo composto do subjuntivo\\b", 30, "subjuntivo futuro compuesto (como «cuando haya hecho»)"],
      ["\\bfuturo do subjuntivo\\b", 27, "subjuntivo futuro (como «cuando haga», con quando o se)"],
      ["\\bpresente do subjuntivo\\b", 23, "subjuntivo (como «que haga»)"],
      ["\\binfinitivo pessoal\\b", 29, "infinitivo que se conjuga (con persona)"],
      ["\\b(pretérito )?mais-que-perfeito composto\\b", 21, "pluscuamperfecto (como «había hecho»)"],
      ["\\b(pretérito )?mais-que-perfeito( simples)?\\b", 41, "pluscuamperfecto simple, de la escritura (como «había hecho»)"],
      ["\\b(pretérito )?perfeito composto\\b", 21, "pasado compuesto (como «vengo haciendo»)"],
      ["\\bpretérito perfeito\\b", 11, "pasado (como «hice»)"],
      ["(?<=\\b(el|del|al|en|con) )perfeito\\b", 11, "pasado (como «hice»)"],
      ["\\b(pretérito )?imperfeito\\b", 15, "pasado de las descripciones (como «hacía»)"],
      ["\\bfuturo do pretérito composto\\b", 30, "condicional compuesto (como «habría hecho»)"],
      ["\\bfuturo do pretérito( \\(condicional\\))?", 18, "condicional (como «haría»)"],
      ["\\bfuturo do presente composto\\b", 30, "futuro compuesto (como «habré hecho»)"],
      ["\\bfuturo do presente\\b", 17, "futuro (como «haré»)"],
      ["\\bpresente do indicativo\\b", 23, "presente"],
      ["\\s*\\(?do indicativo\\)?", 23, ""],
      ["\\bindicativo\\b", 23, "la forma común del verbo"]
    ]
  };
  if (typeof module === "object" && module.exports) module.exports = DATA;
  root.DEVOLUCION_DATA = DATA;
})(typeof window !== "undefined" ? window : globalThis);
