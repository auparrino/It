/*
 * «¿Qué notás?» de Weg C1: antes de «La regla», unos ejemplos con la
 * forma marcada y una pregunta sobre la regla misma.  Solo los datos: la
 * lógica está en docs/js/lezione.js (Lezione.notice) y la pantalla en
 * app.js.
 *
 * Es el «Grammatik entdecken» de Netzwerk y Schritte: el alumno mira,
 * formula una hipótesis y la regla la confirma («¡Eso!») o le marca la
 * diferencia.
 *
 * NOTAR_DATA[semana][título del bloque] = {
 *   ex: [[forma marcada con *…*, castellano], …]   (4 o 5; si falta, los del bloque)
 *   q: la pregunta, answer: la respuesta (una de options),
 *   options: 3 opciones, no: la diferencia, si elegiste otra (con *…*).
 * }
 * El título tiene que ser el «h» exacto del bloque en
 * docs/lang/de/data/course.json (lo verifica tools/lib/test_notar.js).
 */
(function (root) {
  "use strict";

  root.NOTAR_DATA = {
    2: {
      "El verbo, en segundo lugar": {
        ex: [["Ich *wohne* in Berlin.", "Vivo en Berlín."],
             ["In Berlin *wohne* ich.", "En Berlín vivo yo."],
             ["Woher *kommst* du?", "¿De dónde sos?"],
             ["In Köln *wohnt* Paul.", "En Colonia vive Paul."]],
        q: "¿Dónde va el verbo conjugado (wohne, kommst)?",
        answer: "Siempre en el segundo lugar",
        options: ["Siempre en el segundo lugar", "Siempre después del sujeto", "Al final de la oración"],
        no: "Si el primer lugar lo ocupa otra cosa (*In Berlin*, *Woher*), el verbo igual va segundo y el sujeto pasa detrás: *In Berlin wohne ich*."
      }
    },
    4: {
      "El acusativo: solo cambia el masculino": {
        ex: [["*Der* Hund ist hier. → Ich habe *einen* Hund.", "El perro está acá. → Tengo un perro."],
             ["*Die* Katze ist hier. → Ich habe *eine* Katze.", "La gata está acá. → Tengo una gata."],
             ["*Das* Auto ist neu. → Ich brauche *ein* Auto.", "El auto es nuevo. → Necesito un auto."],
             ["*Der* Schlüssel ist hier. → Ich brauche *den* Schlüssel.", "La llave está acá. → Necesito la llave."]],
        q: "Como objeto (lo que tengo, lo que necesito), ¿qué artículo cambia?",
        answer: "Solo el masculino: der → den, ein → einen",
        options: ["Solo el masculino: der → den, ein → einen", "Todos: der, die y das pasan a den", "Solo el femenino: die → den, eine → einen"],
        no: "*eine Katze* y *ein Auto* quedan igual; solo el masculino toma *-n*: *den*, *einen*, *keinen*."
      }
    },
    7: {
      "El corchete verbal": {
        ex: [["Ich *kann* Gitarre *spielen*.", "Sé tocar la guitarra."],
             ["Wir *müssen* am Montag *arbeiten*.", "El lunes tenemos que trabajar."],
             ["Sie *will* Deutsch *lernen*.", "Ella quiere aprender alemán."],
             ["*Kannst* du heute *kommen*?", "¿Podés venir hoy?"]],
        q: "Con kann, muss, will, ¿dónde va el otro verbo?",
        answer: "En infinitivo, al final de la oración",
        options: ["En infinitivo, al final de la oración", "Pegado al modal, como en castellano", "Primero, antes del modal"],
        no: "El modal va segundo y el infinitivo cierra la oración; lo demás queda en el medio: *Ich kann Gitarre spielen*, no «Ich kann spielen Gitarre»."
      }
    },
    8: {
      "El prefijo se va al final": {
        ex: [["aufstehen → Ich *stehe* früh *auf*.", "levantarse → Me levanto temprano."],
             ["einkaufen → Am Montag *kaufe* ich *ein*.", "hacer las compras → El lunes hago las compras."],
             ["anrufen → Wann *rufst* du Anna *an*?", "llamar → ¿Cuándo la llamás a Anna?"],
             ["fernsehen → Am Abend *sehen* wir *fern*.", "mirar tele → A la noche miramos tele."]],
        q: "¿Qué pasa con el prefijo (auf-, ein-, an-) en presente?",
        answer: "Se separa y va al final de la oración",
        options: ["Se separa y va al final de la oración", "Queda pegado al verbo: ich aufstehe", "Va al principio de la oración"],
        no: "*aufstehen* se parte: *ich stehe … auf*. El verbo va segundo y el prefijo cierra la oración, como el infinitivo con un modal."
      }
    },
    11: {
      "haben + participio: el corchete otra vez": {
        ex: [["Ich *habe* am Samstag Fußball *gespielt*.", "El sábado jugué al fútbol."],
             ["Wir *haben* gestern Pizza *gegessen*.", "Ayer comimos pizza."],
             ["Gestern *hat* Anna lange *gearbeitet*.", "Ayer Anna trabajó mucho."],
             ["*Hast* du schon *gefrühstückt*?", "¿Ya desayunaste?"]],
        q: "En el Perfekt, ¿dónde va el participio (gespielt, gegessen)?",
        answer: "Al final; haben va en el segundo lugar",
        options: ["Al final; haben va en el segundo lugar", "Pegado a haben, como «he comido»", "Primero, antes de haben"],
        no: "Es el mismo corchete que con los modales: *habe* segundo, *gegessen* al final, y todo lo demás en el medio."
      }
    },
    12: {
      "¿haben o sein?": {
        ex: [["Ich *bin* nach Rom *gefahren*.", "Fui a Roma."],
             ["Ich *habe* Pizza *gegessen*.", "Comí pizza."],
             ["Er *ist* nach Hause *gegangen*.", "Se fue a casa."],
             ["Wir *haben* Deutsch *gelernt*.", "Aprendimos alemán."],
             ["Ich *bin* um sieben *aufgestanden*.", "Me levanté a las siete."]],
        q: "¿Cuándo el Perfekt va con sein y no con haben?",
        answer: "Con ir de un lugar a otro o cambiar de estado",
        options: ["Con ir de un lugar a otro o cambiar de estado",
                  "Con los verbos irregulares, como gefahren", "Con los verbos separables, como aufstehen"],
        no: "*gegessen* es irregular y va con *haben*; *einkaufen* es separable y también. Decide el sentido: moverse de un lugar a otro o cambiar de estado (*aufstehen*), *sein*."
      }
    },
    13: {
      "Los artículos en dativo": {
        ex: [["Ich helfe *dem* Mann.", "Ayudo al hombre."],
             ["Ich helfe *der* Frau.", "Ayudo a la mujer."],
             ["Er spielt mit *dem* Kind.", "Juega con el nene."],
             ["Das Auto gehört *meiner* Schwester.", "El auto es de mi hermana."],
             ["Ich helfe *einem* Freund.", "Ayudo a un amigo."]],
        q: "En dativo, ¿en qué terminan los artículos?",
        answer: "Masculino y neutro en -m (dem); femenino en -r (der)",
        options: ["Masculino y neutro en -m (dem); femenino en -r (der)", "Todos en -n, como en el acusativo: den, einen", "Igual que en nominativo: der, die, das"],
        no: "*dem Mann*, *dem Kind*, *einem Freund*: *-m*. *der Frau*, *meiner Schwester*: *-r*. El *den* es del plural."
      },
      "El plural en dativo: -n": {
        ex: [["die Kinder → mit *den Kindern*", "los chicos → con los chicos"],
             ["die Freunde → mit *den Freunden*", "los amigos → con los amigos"],
             ["die Eltern → mit *den Eltern*", "los padres → con los padres"],
             ["die Autos → mit *den Autos*", "los autos → con los autos"]],
        q: "¿Qué le pasa al sustantivo en el dativo plural?",
        answer: "Suma -n, salvo que ya termine en -n o en -s",
        options: ["Suma -n, salvo que ya termine en -n o en -s", "Nada: solo cambia el artículo, die → den", "Suma -s, como el plural en castellano"],
        no: "*Kinder → Kindern*, *Freunde → Freunden*. *Eltern* ya tiene *-n* y *Autos* termina en *-s*: quedan igual."
      }
    },
    14: {
      "¿Dónde o adónde?": {
        ex: [["Die Katze ist *in der* Küche.", "La gata está en la cocina."],
             ["Die Katze läuft *in die* Küche.", "La gata corre a la cocina."],
             ["Wir sind *im* Park.", "Estamos en el parque."],
             ["Wir gehen *in den* Park.", "Vamos al parque."]],
        q: "in der o in die, im o in den: ¿qué decide el caso?",
        answer: "Si está en un lugar (dativo) o va hacia él (acusativo)",
        options: ["Si está en un lugar (dativo) o va hacia él (acusativo)", "El género del sustantivo: der Park, die Küche", "Si la oración es una pregunta (Wo?) o no"],
        no: "Mismo sustantivo, otro caso: *ist in der Küche* (Wo?) frente a *läuft in die Küche* (Wohin?)."
      }
    },
    18: {
      "weil: el verbo al final": {
        ex: [["Ich komme nicht, weil ich keine Zeit *habe*.", "No vengo porque no tengo tiempo."],
             ["Sie bleibt zu Hause, weil sie krank *ist*.", "Se queda en casa porque está enferma."],
             ["Wir gehen nicht spazieren, weil es *regnet*.", "No salimos a caminar porque llueve."],
             ["Er lernt Deutsch, weil er in Berlin *arbeitet*.", "Aprende alemán porque trabaja en Berlín."]],
        q: "Después de weil, ¿dónde va el verbo conjugado?",
        answer: "Al final de la oración",
        options: ["Al final de la oración", "En el segundo lugar, como siempre", "Pegado a weil"],
        no: "*weil* abre una subordinada, y en la subordinada el verbo conjugado se va al final: *weil ich keine Zeit habe*."
      },
      "denn: el «porque» que no mueve nada": {
        ex: [["Wir nehmen ein Taxi, *weil* es schon spät *ist*.", "Tomamos un taxi porque ya es tarde."],
             ["Wir nehmen ein Taxi, *denn* es *ist* schon spät.", "Tomamos un taxi, porque ya es tarde."],
             ["Ich bleibe hier, *weil* ich krank *bin*.", "Me quedo porque estoy enfermo."],
             ["Ich bleibe hier, *denn* ich *bin* krank.", "Me quedo, porque estoy enfermo."]],
        q: "¿Qué cambia entre weil y denn?",
        answer: "Con denn el verbo queda segundo; con weil, va al final",
        options: ["Con denn el verbo queda segundo; con weil, va al final", "Nada: son iguales, se usan donde quieras", "denn manda el verbo al principio, como una pregunta"],
        no: "Los dos son «porque», pero *denn* no cuenta como posición: después viene el orden normal (*es ist*). *weil* manda el verbo al final."
      }
    },
    21: {
      "als: una vez en el pasado": {
        ex: [["*Als* ich klein *war*, wohnten wir in Mar del Plata.", "Cuando era chico, vivíamos en Mar del Plata."],
             ["*Als* wir in Berlin *ankamen*, regnete es.", "Cuando llegamos a Berlín, llovía."],
             ["*Wenn* es *regnete*, blieben wir zu Hause.", "Cuando (cada vez que) llovía, nos quedábamos en casa."],
             ["*Wenn* ich Zeit *habe*, lese ich.", "Cuando tengo tiempo, leo."]],
        q: "Las dos son «cuando». ¿Cuándo va als y no wenn?",
        answer: "Para una sola vez o una etapa del pasado",
        options: ["Para una sola vez o una etapa del pasado", "Para cualquier cosa del pasado, una vez o muchas", "Para el presente y el futuro, como «cuando»"],
        no: "*als* = una vez en el pasado (o una etapa, como la infancia). Lo que se repetía, aunque sea pasado, va con *wenn*: *wenn es regnete*, cada vez que llovía."
      }
    },
    24: {
      "den, die, das: el relativo objeto": {
        ex: [["Der Mann, *der* mich *kennt*, …", "El hombre que me conoce…"],
             ["Der Mann, *den* ich *kenne*, …", "El hombre al que conozco…"],
             ["Der Pullover, *den* du *trägst*, ist schön.", "El pulóver que tenés puesto es lindo."],
             ["Die Wohnung, *die* wir *suchen*, muss hell sein.", "El departamento que buscamos tiene que ser luminoso."]],
        q: "der Mann, der… o der Mann, den…: ¿qué decide der o den?",
        answer: "El papel del pronombre dentro de la relativa: sujeto u objeto",
        options: ["El papel del pronombre dentro de la relativa: sujeto u objeto", "Si se habla de una persona o de una cosa", "El caso de Mann en la oración principal (sujeto u objeto)"],
        no: "*der mich kennt*: él conoce (sujeto). *den ich kenne*: yo lo conozco (objeto). Mirá la relativa, no la principal."
      }
    },
    27: {
      "werden + participio": {
        ex: [["Der Müll *wird* jeden Montag *abgeholt*.", "La basura se retira todos los lunes."],
             ["Hier *wird* Papier *recycelt*.", "Acá se recicla papel."],
             ["Ich *werde* morgen *arbeiten*.", "Mañana voy a trabajar."],
             ["Die Flaschen *werden* zuerst *gewaschen*.", "Primero se lavan las botellas."]],
        q: "werden + participio (abgeholt, gewaschen): ¿qué es?",
        answer: "La pasiva: lo que se hace, sin decir quién",
        options: ["La pasiva: lo que se hace, sin decir quién", "El futuro, como werden + infinitivo", "El Perfekt, como haben + participio"],
        no: "Con infinitivo, *werden* es futuro (*ich werde arbeiten*); con participio, es pasiva (*der Müll wird abgeholt*)."
      }
    }
  };
})(this);
