/* La grilla de Scrivi (docs/js/grilla.js): lo que depende del italiano.
 *
 * Las 4 filas siguen las grillas de producción escrita de CILS/CELI y Al
 * dente (adecuación a la consigna, coherencia y cohesión, léxico,
 * corrección), dichas en castellano y sin jerga.  auto: qué mira la
 * estimación local de esa fila.  connectors: los que cuenta la fila de
 * coherencia (sin «e», que no ordena nada).  ignore: palabras de cuatro
 * letras o más que vuelven siempre y no son repetición.  samples: un par de
 * textos de muestra (nota alta y nota baja) por tramo del curso, cada uno con
 * sus anotaciones [fila, nota].
 */
(function (root) {
  "use strict";
  var DATA = {
    from: 14,
    title: "La grilla",
    intro: "Así se califica un texto en el CILS o el CELI. Leela antes de escribir: es lo que vas a mirar al revisar.",
    rows: [
      { id: "consigna", auto: "task", name: "Consigna y tono",
        what: "Hacés todo lo que pide la consigna, para quien la pide y con el tono que va (*tu* o *Lei*).",
        hi: "Cubre cada punto; el saludo y la despedida van con el destinatario.",
        lo: "Falta un punto, o el tono no va (un *ciao* a una oficina).",
        self: "¿Cubriste todos los puntos de la consigna, con el tono que va?" },
      { id: "coerenza", auto: "connectors", name: "Orden y conectores",
        what: "Las ideas siguen un hilo y se unen con conectores.",
        hi: "Conectores variados: *inoltre*, *però*, *quindi*, *invece*.",
        lo: "Frases sueltas, o todo unido con *e*.",
        self: "¿Usaste al menos tres conectores distintos?" },
      { id: "lessico", auto: "variety", name: "Vocabulario",
        what: "Palabras precisas y variadas, sin castellano metido.",
        hi: "No repite; usa las palabras de la semana.",
        lo: "Repite *molto*, *bello*, *cosa*; mete palabras en castellano.",
        self: "¿Evitaste repetir las mismas palabras y meter castellano?" },
      { id: "correttezza", auto: "errors", name: "Gramática",
        what: "Las estructuras de la semana, bien usadas.",
        hi: "Pocos errores, y ninguno impide entender.",
        lo: "Los errores de siempre (*ho andato*, *il mio padre*).",
        self: "¿Releíste buscando tus errores de siempre?" }
    ],
    connectors: ["inoltre", "però", "ma", "quindi", "perciò", "invece", "infatti", "allora", "poi", "dopo", "prima",
      "perché", "anche se", "mentre", "comunque", "tuttavia", "dunque", "poiché", "siccome", "cioè", "infine",
      "da una parte", "dall'altra", "secondo me", "per esempio", "così", "purtroppo", "insomma", "oppure", "quando",
      "nel caso in cui", "sebbene", "benché", "eppure"],
    ignore: ["sono", "della", "delle", "dello", "degli", "nella", "nelle", "nello", "alla", "alle", "allo", "dalla",
      "dalle", "sulla", "sulle", "questo", "questa", "questi", "queste", "anche", "come", "quando", "dove", "perché",
      "hanno", "abbiamo", "siamo", "sempre", "ciao"],
    samples: [
      { from: 14, task: "Un mensaje a una amiga: contale tu fin de semana y proponele verse.",
        hi: { grade: "5 de 5",
              t: "Ciao Marta! Com'è andato il weekend? Il mio è stato bellissimo: sabato sono andata al mare con mia sorella e abbiamo mangiato il pesce in un ristorante sul porto. Domenica, invece, ha piovuto tutto il giorno, quindi sono rimasta a casa e ho letto un libro. E tu che cosa hai fatto? Ci vediamo giovedì per un caffè? Un abbraccio, Sofía",
              notes: [["consigna", "Cuenta el finde y propone un plan: hace las dos cosas que pide, con saludo y despedida de mensaje entre amigas."],
                      ["coerenza", "*invece*, *quindi* y la pregunta *E tu?* encadenan las partes."],
                      ["correttezza", "*sono andata*, *sono rimasta*: con essere y en femenino."]] },
        lo: { grade: "2 de 5",
              t: "Ciao. Il weekend è stato bene. Sabato ho andato al mare con la mia sorella e ho mangiato pescado. Ho mangiato molto. Domenica ho stato a casa. Ho stato a casa tutto il giorno. Ciao.",
              notes: [["consigna", "No propone nada ni le pregunta nada: falta la mitad de la consigna."],
                      ["correttezza", "*ho andato*, *ho stato* → *sono andato*, *sono stato* (con essere); *la mia sorella* → *mia sorella*; *è stato bene* → *è andato bene*."],
                      ["lessico", "*pescado* es castellano (→ *pesce*), y *ho mangiato* y *a casa* se repiten en frases sueltas."]] } },
      { from: 27, task: "¿Conviene aprender un idioma con una app o con un curso? Un párrafo con tu opinión.",
        hi: { grade: "5 de 5",
              t: "Secondo me, un'app è utile, ma non basta. Da una parte, si può studiare ogni giorno, anche in autobus, e si impara molto lessico. Dall'altra, però, nessuna app ti corregge quando parli. Credo che un corso sia necessario almeno per la conversazione: in classe si sbaglia, si ride e si impara dagli altri. Quindi la soluzione migliore, per me, è usarli tutti e due.",
              notes: [["consigna", "Toma posición en la primera frase y la retoma al final."],
                      ["coerenza", "Ordena con *da una parte… dall'altra*, *però*, *quindi*."],
                      ["correttezza", "*Credo che… sia*: congiuntivo después de un verbo de opinión."]] },
        lo: { grade: "2 de 5",
              t: "Io penso che l'app è molto buona. L'app è molto buona perché è molto facile. Anche il corso è buono. Il corso è buono perché c'è il professore. Io uso l'app tutti i giorni e mi piace molto l'app.",
              notes: [["consigna", "Dice que las dos son buenas y no elige: no hay una opinión que defender."],
                      ["lessico", "*molto*, *buono* y *l'app* se repiten; ni un matiz (*utile*, *comodo*, *non basta*)."],
                      ["correttezza", "*penso che l'app è* → *penso che l'app sia*."]] } },
      { from: 40, task: "Un mail formal a la municipalidad para quejarte del ruido de una obra en tu calle.",
        hi: { grade: "5 de 5",
              t: "Gentile responsabile dell'Ufficio Tecnico,\nmi chiamo Sofía Pérez e abito in via Saragozza 15. Le scrivo per segnalare che da tre settimane il cantiere davanti a casa mia comincia a lavorare alle sei del mattino, anche il sabato. Poiché nel palazzo vivono due bambini piccoli e una persona anziana, Le chiedo di verificare se l'orario è rispettato. Inoltre, Le sarei grata se potesse indicarmi a chi rivolgermi nel caso in cui il problema continuasse.\nIn attesa di un Suo cortese riscontro, porgo distinti saluti.\nSofía Pérez",
              notes: [["consigna", "Se presenta, cuenta el problema con datos (desde cuándo, a qué hora) y pide algo concreto."],
                      ["coerenza", "*Poiché*, *Inoltre*, *nel caso in cui*: conectores del registro formal."],
                      ["correttezza", "*Le scrivo*, *potesse*, *Suo*: el *Lei* sostenido de principio a fin, y *nel caso in cui* con congiuntivo."]] },
        lo: { grade: "2 de 5",
              t: "Ciao! Sono Sofía e ti scrivo perché il cantiere fa molto rumore. Il rumore è molto forte e non posso dormire. Per favore fai qualcosa. Grazie mille e un bacio!",
              notes: [["consigna", "Tutea a una oficina pública y cierra con *un bacio*; no dice dónde vive ni desde cuándo: así no pueden hacer nada."],
                      ["lessico", "*rumore* y *molto* dos veces; *fai qualcosa* es vago (→ *verificare*, *segnalare*)."],
                      ["coerenza", "Tres frases sin conectores: falta el *poiché* que explica y el *inoltre* que suma."]] } }
    ]
  };
  if (typeof module === "object" && module.exports) module.exports = DATA;
  root.GRILLA_DATA = DATA;
})(typeof window !== "undefined" ? window : globalThis);
