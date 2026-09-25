/*
 * «¿Por qué?» y «¿Qué tenía de malo?» (docs/js/porque.js): lo que depende
 * del portugués de Brasil.
 *
 *   why    qué tiene de malo una opción, por categoría de diagnosi.js (una
 *          línea, en castellano, para elegir entre tres)
 *   near   las categorías que se confunden con cada una: de ahí sale la
 *          explicación falsa «cercana»; la otra sale de otra familia
 *   weeks  la semana que enseña cada etiqueta del banco o categoría de
 *          error: ahí se busca primero el bloque de teoría
 *   review las semanas de repaso (jefes): valen menos como explicación
 */
(function (root) {
  "use strict";

  var why = {
    contraccion: "No contrae la preposición con el artículo (*em + o = no*, *de + a = da*).",
    articulo: "El artículo no es el que corresponde.",
    genero: "Le cambia el género al sustantivo.",
    plural: "El plural está mal formado.",
    concordancia: "No concuerda en género o en número.",
    preposicion: "La preposición no es la que pide el portugués.",
    regencia: "El verbo pide otra preposición (*chegar a*, *precisar de*, *pensar em*).",
    muito: "*Muito* no se achica a «muy»: sirve para *muy* y para *mucho*.",
    gostar: "Con *gostar*, a quien le gusta es el sujeto (*eu gosto*) y lo que gusta va con *de*: *gosto de café*.",
    a_personal: "Le pone la «a» personal del castellano: en portugués el objeto de persona va sin *a*.",
    perfeito_composto: "Usa el perfeito composto (*tenho feito*) donde va el perfeito simple, o al revés.",
    subjuntivo: "Ahí la frase pide subjuntivo y la opción usa el indicativo (o al revés).",
    futuro_subj: "Ahí va el futuro do subjuntivo (*quando eu for*, *se você puder*).",
    inf_pessoal: "Falla el infinitivo personal (*para nós irmos*).",
    pronome: "El pronombre no es el que corresponde.",
    colocacao: "El pronombre está en el lugar equivocado.",
    crase: "Falla la crase: falta la *à* (a + a) o hay una que no va.",
    ortografia: "Está mal escrita: una letra cambiada.",
    tilde: "Le falta o le sobra la tilde.",
    espanol: "Es una palabra del castellano, no del portugués.",
    otra_lengua: "Es una palabra del italiano colada en el portugués.",
    falso_amigo: "Es un falso amigo: en portugués esa palabra quiere decir otra cosa.",
    tempo: "El verbo está en otro tiempo del que pide la frase.",
    persona: "El verbo está en otra persona: no concuerda con el sujeto.",
    participio: "El participio no es el que corresponde.",
    verbo_irregular: "Es un verbo irregular y esa forma no existe.",
    regularizacion: "Conjuga como regular un verbo que es irregular.",
    nasal: "Falla la nasal: *ã*, *õ* o la *-m* del final.",
    orden: "Las palabras están en otro orden."
  };

  var FORMA = ["ortografia", "tilde", "nasal", "espanol"];
  var NOME = ["articulo", "contraccion", "genero", "concordancia", "plural"];
  var VERBO = ["persona", "tempo", "verbo_irregular", "regularizacion", "participio", "subjuntivo", "perfeito_composto"];
  var SUBJ = ["subjuntivo", "futuro_subj", "inf_pessoal", "tempo"];
  var PRON = ["pronome", "colocacao", "a_personal"];
  var PREP = ["preposicion", "regencia", "contraccion", "crase", "gostar", "a_personal"];
  var LEX = ["espanol", "otra_lengua", "falso_amigo", "muito", "ortografia"];
  var near = {};
  [FORMA, NOME, VERBO, SUBJ, PRON, PREP, LEX].forEach(function (g) {
    g.forEach(function (k) {
      near[k] = (near[k] || []).concat(g.filter(function (x) { return x !== k && (near[k] || []).indexOf(x) < 0; }));
    });
  });
  near.orden = ["colocacao", "preposicion"];

  var weeks = {
    // etiquetas del banco
    ser_estar: 1, contracciones: 3, ter: 1, posesivos: 10, muito: 4, articulos: 3, genero: 2,
    concordancia: 4, plurales: 2, falsos_amigos: 45, preposiciones: 9, presente: 5, preguntas: 8,
    irregulares: 6, horas: 7, numeros: 7, gerundio: 8, ir_inf: 8, demostrativos: 10, gostar: 14,
    perfeito: 11, perfeito_composto: 21, reflexivos: 12, imperativo: 12, a_personal: 35,
    indefinidos: 20, regencia: 35, pronombres: 16, imperfeito: 15, perf_imperf: 15, colocacao: 33,
    futuro: 17, condicional: 18, comparativos: 19, mais_que_perfeito: 21, participio: 22, pasiva: 22,
    subjuntivo: 23, conjunciones: 24, relativos: 25, futuro_subj: 27, subj_imperfeito: 28,
    condicionales: 28, inf_pessoal: 29, compuestos: 30, discurso_indirecto: 31, se_pasiva: 32,
    conectores: 34, crase: 36, nominalizacion: 40, reducidas: 42, coloquial: 38, portugal: 46, variacion: 46,
    // los ejercicios de formas del banco (por el comienzo de su id);
    // [semana, bloque] cuando un solo bloque los explica
    "b:art": 3, "b:pl": 2, "b:agr": 4, "b:prep": 3,
    // categorías de error
    contraccion: 3, articulo: 3, plural: 2, preposicion: 9, pronome: 16, falso_amigo: 45,
    persona: 5, verbo_irregular: 6, nasal: 1
  };

  root.PORQUE_DATA = { why: why, near: near, weeks: weeks, review: [13, 26, 39, 51, 52] };
})(typeof window !== "undefined" ? window : globalThis);
