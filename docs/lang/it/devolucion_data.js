/*
 * Las devoluciones del italiano (docs/js/devolucion.js).
 *
 * keep:  categorías del diagnóstico que valen aunque la respuesta no se
 *        parezca a la correcta (todo escrito en español).
 * terms: [expresión, semana, en criollo]: el nombre de un tiempo o modo y
 *        la semana en que el curso lo enseña (course.json, weeks[].tenses).
 *        Antes de esa semana las devoluciones dicen lo de la derecha.  Los
 *        más largos primero.
 */
(function (root) {
  "use strict";
  var DATA = {
    keep: ["parola_spagnola"],
    terms: [
      ["\\bcongiuntivo trapassato\\b", 30, "subjuntivo pluscuamperfecto (como «hubiera hecho»)"],
      ["\\bcongiuntivo passato\\b", 29, "subjuntivo compuesto (como «haya hecho»)"],
      ["\\bcongiuntivo imperfetto\\b", 30, "subjuntivo pasado (como «hiciera»)"],
      ["\\bcongiuntivo presente\\b", 24, "subjuntivo (como «que haga»)"],
      ["\\bcongiuntivo\\b", 24, "subjuntivo"],
      ["\\bcondizionale (passato|composto)\\b", 31, "condicional compuesto (como «habría hecho»)"],
      ["\\bcondizionale (presente|semplice)\\b", 20, "condicional (como «haría»)"],
      ["\\bcondizionale\\b", 20, "condicional"],
      ["\\bfuturo anteriore\\b", 19, "futuro compuesto (como «habré hecho»)"],
      ["\\bfuturo semplice\\b", 19, "futuro (como «haré»)"],
      ["\\btrapassato prossimo\\b", 38, "pluscuamperfecto (como «había hecho»)"],
      ["\\btrapassato remoto\\b", 37, "pasado anterior (como «hube hecho»)"],
      ["\\bpassato remoto\\b", 37, "pasado de los relatos (como «hizo», en una narración)"],
      ["\\bpassato prossimo\\b", 11, "pasado compuesto (auxiliar + participio)"],
      ["\\bimperfetto\\b", 15, "pasado de las descripciones (como «hacía»)"],
      ["\\s*\\(indicativo\\)", 24, ""],
      ["\\bindicativo\\b", 24, "la forma común del verbo"]
    ]
  };
  if (typeof module === "object" && module.exports) module.exports = DATA;
  root.DEVOLUCION_DATA = DATA;
})(typeof window !== "undefined" ? window : globalThis);
