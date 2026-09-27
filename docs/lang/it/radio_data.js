/* Serie «Radio»: generado por tools/lib/build_radio.js a partir de tools/it/radio/.
   No editar a mano: editá los JSON de cada semana y corré npm run build. */
(function (root) {
  "use strict";
  root.RADIO_DATA = {
 "name": "Radio Portici",
 "label": "Radio",
 "blurb": "La radio del barrio en Bologna, de la semana 6 a la 25: un programa corto por semana, a dos voces, con la gramática y las palabras de la semana. Sara y Dario conducen «Buongiorno Portici»; llaman Martín (el argentino de las lecturas), la signora Franca y Leo, el corresponsal en bicicleta. Dos escuchas con las preguntas a la vista y la transcripción al final.",
 "metaFrom": 14,
 "criterion": 60,
 "personaggi": {
  "Sara": "conduce «Buongiorno Portici»; boloñesa, ordenada, corre en los Giardini Margherita",
  "Dario": "co-conductor; napolitano, vive en Bologna hace poco, siempre con hambre y siempre tarde",
  "Martín": "el argentino de las lecturas (via Zamboni); llama cuando tiene una duda o una novedad",
  "Franca": "la signora Franca, 78 años, vecina de via del Pratello; llama casi todas las semanas",
  "Leo": "estudiante de 20 años, corresponsal en bicicleta"
 },
 "EPISODI": [
  {
   "week": 6,
   "level": "A1",
   "title": "Che cosa fate stasera?",
   "genre": "programma del mattino",
   "es": "Es viernes a la mañana en Radio Portici, la radio del barrio en Bologna. Sara, la conductora, le pregunta a Dario, su compañero, qué planes tiene para el fin de semana.",
   "speakers": [
    "Sara",
    "Dario"
   ],
   "turns": [
    [
     "A",
     "Buongiorno a tutti, qui è Radio Portici e io sono Sara. Oggi è venerdì e con me c'è Dario. Dario, che cosa fai stasera?"
    ],
    [
     "B",
     "Buongiorno, Sara! Stasera esco con due amici. Andiamo in piazza Maggiore: c'è un concerto gratis."
    ],
    [
     "A",
     "Che bello! E dopo, dove andate?"
    ],
    [
     "B",
     "Non lo so. Forse andiamo a mangiare una pizza. Vuoi venire con noi?"
    ],
    [
     "A",
     "Grazie, ma non posso. Stasera devo stare a casa: domani mattina vado al mercato con la mamma."
    ],
    [
     "B",
     "Al mercato il sabato? C'è tanta gente!"
    ],
    [
     "A",
     "Sì, ma lì trovo sempre il pane buono e incontro gli amici del quartiere. E tu, domani che cosa fai?"
    ],
    [
     "B",
     "Domani dormo! E domenica torno a Napoli: la nonna fa il ragù."
    ],
    [
     "A",
     "Allora buon viaggio! E voi, cari ascoltatori, che cosa fate questo fine settimana? Scrivete a Radio Portici: vogliamo sapere tutto!"
    ]
   ],
   "gloss": {
    "stasera": "esta noche",
    "gratis": "gratis",
    "quartiere": "barrio",
    "ragù": "salsa de carne que se cocina muchas horas",
    "ascoltatori": "oyentes",
    "fine settimana": "fin de semana"
   },
   "questions": [
    [
     "¿Adónde va Dario esta noche?",
     [
      "A un concierto gratis en piazza Maggiore",
      "Al mercado del barrio con su mamá",
      "A Nápoles, a comer con su abuela",
      "A la radio, a trabajar con Sara"
     ],
     "A un concierto gratis en piazza Maggiore"
    ],
    [
     "¿Por qué Sara no sale esta noche?",
     [
      "Porque tiene que trabajar en la radio",
      "Porque mañana temprano va al mercado",
      "Porque no le gustan los conciertos",
      "Porque no tiene plata para la pizza"
     ],
     "Porque mañana temprano va al mercado"
    ],
    [
     "¿Qué hace Dario el domingo?",
     [
      "Duerme todo el día",
      "Va al mercado con Sara",
      "Vuelve a Nápoles",
      "Escucha la radio"
     ],
     "Vuelve a Nápoles"
    ]
   ],
   "info": [
    [
     "Sara va al mercado el sábado a la mañana.",
     true
    ],
    [
     "El concierto de piazza Maggiore es caro.",
     false
    ],
    [
     "Dario vive con su abuela en Bologna.",
     false
    ]
   ],
   "grammatica": {
    "label": "presente de los irregulares: andare, fare, uscire, volere, potere, dovere",
    "forme": [
     "fai",
     "esco",
     "andiamo",
     "andate",
     "vuoi",
     "posso",
     "devo",
     "vado",
     "fa",
     "fate",
     "vogliamo"
    ]
   },
   "parole": [
    [
     "esco",
     "uscire"
    ],
    [
     "andiamo",
     "andare"
    ],
    [
     "venire",
     "venire"
    ],
    [
     "vuoi",
     "volere"
    ],
    [
     "posso",
     "potere"
    ],
    [
     "devo",
     "dovere"
    ],
    [
     "stare",
     "stare"
    ],
    [
     "trovo",
     "trovare"
    ],
    [
     "incontro",
     "incontrare"
    ],
    [
     "torno",
     "tornare"
    ],
    [
     "fai",
     "fare"
    ],
    [
     "sapere",
     "sapere"
    ]
   ],
   "qlang": "es",
   "infoPrompt": "¿Lo dice o no lo dice?",
   "infoYes": "Lo dice",
   "infoNo": "No lo dice"
  },
  {
   "week": 7,
   "level": "A2",
   "title": "Che ore sono a Rosario?",
   "genre": "telefonata in diretta",
   "es": "Temprano a la mañana llama a la radio Martín, el argentino que vive en via Zamboni. Tiene una pregunta sobre la hora: hoy es un día especial para su familia.",
   "speakers": [
    "Sara",
    "Martín"
   ],
   "turns": [
    [
     "A",
     "Sono le sette e mezza e siete su Radio Portici. Abbiamo una telefonata. Pronto?"
    ],
    [
     "B",
     "Pronto, Sara? Sono Martín, lo studente argentino di via Zamboni."
    ],
    [
     "A",
     "Ciao, Martín! Come stai?"
    ],
    [
     "B",
     "Bene, grazie. Ho una domanda. Mia madre abita a Rosario e oggi è il suo compleanno: compie sessant'anni. Qui è mattina, ma lì che ore sono?"
    ],
    [
     "A",
     "Allora: in estate la differenza è di cinque ore, in inverno di quattro. Oggi è il ventotto febbraio, quindi a Rosario sono le tre e mezza di notte."
    ],
    [
     "B",
     "Di notte? Allora adesso non telefono!"
    ],
    [
     "A",
     "No, meglio di no. Telefona a mezzogiorno: da noi è mezzogiorno, da voi sono le otto di mattina."
    ],
    [
     "B",
     "Perfetto. E stasera, alle nove, facciamo una videochiamata con tutta la famiglia."
    ],
    [
     "A",
     "Tanti auguri alla mamma, Martín! E voi, ascoltatori: alle otto e un quarto c'è il meteo e alle nove le notizie della giornata."
    ]
   ],
   "gloss": {
    "compleanno": "cumpleaños",
    "compie": "cumple (años)",
    "differenza": "diferencia",
    "videochiamata": "videollamada",
    "tanti auguri": "¡feliz cumpleaños!, ¡muchas felicidades!",
    "meteo": "el pronóstico del tiempo",
    "ascoltatori": "oyentes",
    "giornata": "(el) día, la jornada"
   },
   "questions": [
    [
     "¿Por qué llama Martín a la radio?",
     [
      "Quiere saber qué hora es en Rosario",
      "Quiere mandarle saludos a su mamá",
      "Quiere saber el pronóstico del tiempo",
      "Quiere escuchar una canción argentina"
     ],
     "Quiere saber qué hora es en Rosario"
    ],
    [
     "¿Cuántas horas de diferencia hay hoy entre Bologna y Rosario?",
     [
      "Tres horas",
      "Cuatro horas",
      "Cinco horas",
      "Seis horas"
     ],
     "Cuatro horas"
    ],
    [
     "¿Cuándo va a llamar Martín a su mamá?",
     [
      "Ahora, a las siete y media",
      "A las tres y media de la noche",
      "Al mediodía, hora de Italia",
      "Mañana a la mañana"
     ],
     "Al mediodía, hora de Italia"
    ]
   ],
   "info": [
    [
     "La mamá de Martín cumple sesenta años.",
     true
    ],
    [
     "Martín cumple años el 28 de febrero.",
     false
    ],
    [
     "A las ocho y cuarto dan el pronóstico del tiempo.",
     true
    ]
   ],
   "grammatica": {
    "label": "la hora, las fechas y los números",
    "forme": [
     "sono le sette e mezza",
     "le tre e mezza",
     "mezzogiorno",
     "le otto",
     "alle nove",
     "alle otto e un quarto",
     "il ventotto febbraio",
     "sessant'anni"
    ]
   },
   "parole": [
    [
     "mattina",
     "mattina"
    ],
    [
     "ore",
     "ora"
    ],
    [
     "estate",
     "estate"
    ],
    [
     "notte",
     "notte"
    ],
    [
     "mezzogiorno",
     "mezzogiorno"
    ],
    [
     "mezza",
     "mezzo"
    ],
    [
     "quarto",
     "quarto"
    ]
   ],
   "qlang": "es",
   "infoPrompt": "¿Lo dice o no lo dice?",
   "infoYes": "Lo dice",
   "infoNo": "No lo dice"
  },
  {
   "week": 8,
   "level": "A2",
   "title": "Il gioco «Dove sono?»",
   "genre": "gioco radiofonico",
   "es": "Todos los lunes Radio Portici juega a «¿Dónde estoy?»: Leo, el corresponsal en bicicleta, recorre la ciudad y cuenta el camino; Sara hace preguntas hasta adivinar el lugar.",
   "speakers": [
    "Sara",
    "Leo"
   ],
   "turns": [
    [
     "A",
     "Buongiorno! È lunedì e, come ogni lunedì, c'è il gioco «Dove sono?». Leo è in bicicletta da qualche parte in città. Leo, mi senti?"
    ],
    [
     "B",
     "Ti sento benissimo, Sara!"
    ],
    [
     "A",
     "Allora, dove sei? In quale strada?"
    ],
    [
     "B",
     "Eh, questo è il gioco! Sono in una via lunga, con i portici. Vado dritto e a destra c'è una porta antica della città."
    ],
    [
     "A",
     "Una porta... Ma quante porte ci sono a Bologna? Tante! E adesso che cosa fai?"
    ],
    [
     "B",
     "All'incrocio giro a sinistra. Poi attraverso la strada e comincio a salire. Qui c'è poca gente: qualche turista e tanti bolognesi in tuta."
    ],
    [
     "A",
     "Perché salgono? Che cosa cercano?"
    ],
    [
     "B",
     "Cercano una chiesa. È in alto, sopra la città, e da lì c'è una vista bellissima."
    ],
    [
     "A",
     "Ho un dubbio... Sei sotto il portico di San Luca?"
    ],
    [
     "B",
     "Esatto! Brava, Sara!"
    ],
    [
     "A",
     "E voi, cari ascoltatori: quanti archi ha questo portico? Chi sa la risposta scrive a Radio Portici."
    ]
   ],
   "gloss": {
    "da qualche parte": "en algún lugar",
    "benissimo": "muy bien, perfecto",
    "antica": "antigua",
    "salire": "subir",
    "salgono": "suben",
    "tuta": "ropa deportiva, jogging",
    "vista": "vista, panorama",
    "archi": "arcos",
    "ascoltatori": "oyentes"
   },
   "questions": [
    [
     "¿Cómo se mueve Leo por la ciudad?",
     [
      "En bicicleta",
      "En colectivo",
      "A pie",
      "En tren"
     ],
     "En bicicleta"
    ],
    [
     "¿Qué hace Leo en el cruce?",
     [
      "Dobla a la derecha",
      "Dobla a la izquierda",
      "Sigue derecho",
      "Se para un rato a descansar"
     ],
     "Dobla a la izquierda"
    ],
    [
     "¿Qué buscan las personas que suben?",
     [
      "Una puerta antigua",
      "Un bar con vista",
      "Una iglesia en lo alto",
      "La bicicleta de Leo"
     ],
     "Una iglesia en lo alto"
    ]
   ],
   "info": [
    [
     "El juego «Dove sono?» es todos los lunes.",
     true
    ],
    [
     "En la subida hay mucha gente.",
     false
    ],
    [
     "Sara adivina el lugar.",
     true
    ]
   ],
   "grammatica": {
    "label": "las preguntas: dove, quale, quante, che cosa, perché, chi",
    "forme": [
     "dove sei",
     "in quale strada",
     "quante porte",
     "che cosa fai",
     "perché salgono",
     "che cosa cercano",
     "quanti archi",
     "chi sa"
    ]
   },
   "parole": [
    [
     "dritto",
     "dritto"
    ],
    [
     "destra",
     "destra"
    ],
    [
     "incrocio",
     "incrocio"
    ],
    [
     "giro",
     "girare"
    ],
    [
     "sinistra",
     "sinistra"
    ],
    [
     "attraverso",
     "attraversare"
    ],
    [
     "cercano",
     "cercare"
    ],
    [
     "dubbio",
     "dubbio"
    ],
    [
     "strada",
     "strada"
    ],
    [
     "via",
     "via"
    ]
   ],
   "qlang": "es",
   "infoPrompt": "¿Lo dice o no lo dice?",
   "infoYes": "Lo dice",
   "infoNo": "No lo dice"
  },
  {
   "week": 9,
   "level": "A2",
   "title": "Dario è in viaggio",
   "genre": "collegamento dalla stazione",
   "es": "Lunes a la mañana: Dario todavía no llegó a la radio. Sara lo llama por teléfono y él cuenta, en directo, dónde está, de dónde viene y cómo va a llegar.",
   "speakers": [
    "Sara",
    "Dario"
   ],
   "turns": [
    [
     "A",
     "Buongiorno da Radio Portici! Oggi sono sola in studio: Dario non c'è. Telefoniamo... Dario, dove sei?"
    ],
    [
     "B",
     "Ciao, Sara! Sono alla stazione, sul binario tre. Arrivo da Napoli, in treno."
    ],
    [
     "A",
     "Da Napoli? Ma il treno non arriva alle sette?"
    ],
    [
     "B",
     "Di solito sì, ma oggi è in ritardo di un'ora. Aspetto un amico: porta la valigia, perché io ho già uno zaino piccolo e una borsa di mozzarelle."
    ],
    [
     "A",
     "Mozzarelle per la radio? Bravo! E come vieni qui? In autobus?"
    ],
    [
     "B",
     "No, l'autobus per il centro è pieno. Vengo a piedi: la stazione non è lontana dallo studio, sono venti minuti."
    ],
    [
     "A",
     "E perché non prendi la bicicletta? Qui fuori ci sono le bici del Comune."
    ],
    [
     "B",
     "Con la borsa delle mozzarelle? Impossibile! Esco dalla stazione, vado in via dell'Indipendenza, sotto i portici, e arrivo in piazza."
    ],
    [
     "A",
     "Va bene. Io resto qui con gli ascoltatori e metto un po' di musica. Ma prima, bevi un caffè al bar dello studio: offro io!"
    ],
    [
     "B",
     "Grazie, Sara! Arrivo tra venti minuti. Con le mozzarelle!"
    ]
   ],
   "gloss": {
    "in ritardo": "atrasado, con demora",
    "valigia": "valija",
    "zaino": "mochila",
    "mozzarelle": "mozzarelas",
    "bici del Comune": "bicicletas públicas de la ciudad",
    "offro io": "invito yo",
    "ascoltatori": "oyentes"
   },
   "questions": [
    [
     "¿Dónde está Dario cuando Sara lo llama?",
     [
      "En el andén tres de la estación",
      "En el colectivo, cerca del centro",
      "En el bar de la radio, tomando un café",
      "En Nápoles, en la casa de su familia"
     ],
     "En el andén tres de la estación"
    ],
    [
     "¿Por qué Dario no toma el colectivo?",
     [
      "Porque tiene que esperar a un amigo",
      "Porque el colectivo al centro está lleno",
      "Porque no tiene boleto",
      "Porque prefiere la bicicleta"
     ],
     "Porque el colectivo al centro está lleno"
    ],
    [
     "¿Qué trae Dario para la radio?",
     [
      "Una valija con ropa de invierno",
      "Una bicicleta",
      "Mozzarellas de Nápoles",
      "Un café"
     ],
     "Mozzarellas de Nápoles"
    ]
   ],
   "info": [
    [
     "El tren de Dario llega una hora tarde.",
     true
    ],
    [
     "Dario va a la radio en bicicleta.",
     false
    ],
    [
     "Sara invita el café.",
     true
    ]
   ],
   "grammatica": {
    "label": "las preposiciones de base: a, da, in, su, per, con",
    "forme": [
     "alla stazione",
     "sul binario",
     "da Napoli",
     "in treno",
     "in autobus",
     "a piedi",
     "per il centro",
     "dallo studio",
     "dalla stazione",
     "con gli ascoltatori",
     "tra venti minuti"
    ]
   },
   "parole": [
    [
     "binario",
     "binario"
    ],
    [
     "aspetto",
     "aspettare"
    ],
    [
     "porta",
     "portare"
    ],
    [
     "piccolo",
     "piccolo"
    ],
    [
     "autobus",
     "autobus"
    ],
    [
     "piedi",
     "piede"
    ],
    [
     "resto",
     "restare"
    ],
    [
     "bevi",
     "bere"
    ]
   ],
   "qlang": "es",
   "infoPrompt": "¿Lo dice o no lo dice?",
   "infoYes": "Lo dice",
   "infoNo": "No lo dice"
  },
  {
   "week": 10,
   "level": "A2",
   "title": "Un regalo per Tommaso",
   "genre": "telefonata in diretta",
   "es": "Llama la signora Franca, una vecina del barrio que escucha la radio todas las mañanas. Su nieto cumple años y ella no sabe qué regalarle: le pide ayuda a Sara.",
   "speakers": [
    "Sara",
    "Franca"
   ],
   "turns": [
    [
     "A",
     "Abbiamo un'altra telefonata. Pronto, chi parla?"
    ],
    [
     "B",
     "Buongiorno, sono la signora Franca, di via del Pratello. Vi ascolto ogni mattina!"
    ],
    [
     "A",
     "Buongiorno, signora Franca! Grazie. Come la possiamo aiutare?"
    ],
    [
     "B",
     "Ecco, sabato è il compleanno di mio nipote Tommaso: compie sedici anni. Voglio fargli un regalo, ma non so che cosa. Mi date un'idea?"
    ],
    [
     "A",
     "Certo! Gli piacciono i libri? Può regalargli un bel romanzo."
    ],
    [
     "B",
     "No, no. I libri non li legge: li guarda e basta. Lui ascolta la musica tutto il giorno."
    ],
    [
     "A",
     "Allora gli regala dei biglietti per un concerto! Così passa una bella sera con gli amici, e lei lo fa felice."
    ],
    [
     "B",
     "Che bella idea! Ma io i biglietti non li so comprare su internet."
    ],
    [
     "A",
     "Non è un problema: li compra al teatro Duse, in via Cartoleria. Oppure chiede aiuto a sua figlia."
    ],
    [
     "B",
     "Ha ragione. Adesso la chiamo subito. Grazie, Sara, siete gentilissimi!"
    ],
    [
     "A",
     "Grazie a lei, signora Franca! E tanti auguri a Tommaso. Lo abbracciamo tutti da Radio Portici!"
    ]
   ],
   "gloss": {
    "nipote": "nieto",
    "compie": "cumple (años)",
    "romanzo": "novela",
    "e basta": "y nada más",
    "gentilissimi": "muy amables"
   },
   "questions": [
    [
     "¿Qué quiere hacer la signora Franca?",
     [
      "Comprar entradas para ella",
      "Hacerle un regalo a su nieto",
      "Invitar a Sara a un concierto",
      "Aprender a comprar por internet"
     ],
     "Hacerle un regalo a su nieto"
    ],
    [
     "¿Por qué un libro no es un buen regalo para Tommaso?",
     [
      "Porque ya tiene muchos",
      "Porque no lee libros",
      "Porque son caros",
      "Porque su abuela los lee"
     ],
     "Porque no lee libros"
    ],
    [
     "¿Qué le aconseja Sara para comprar las entradas?",
     [
      "Comprarlas en el teatro o pedirle ayuda a la hija",
      "Comprarlas por internet con Tommaso",
      "Pedirle las entradas a la radio",
      "Esperar el cumpleaños de Tommaso"
     ],
     "Comprarlas en el teatro o pedirle ayuda a la hija"
    ]
   ],
   "info": [
    [
     "Tommaso cumple dieciséis años el sábado.",
     true
    ],
    [
     "A Tommaso le gusta la música.",
     true
    ],
    [
     "La signora Franca compra las entradas por internet.",
     false
    ]
   ],
   "grammatica": {
    "label": "los pronombres de objeto directo e indirecto",
    "forme": [
     "la possiamo aiutare",
     "fargli",
     "mi date",
     "gli piacciono",
     "regalargli",
     "li legge",
     "li guarda",
     "gli regala",
     "lo fa felice",
     "li compra",
     "la chiamo",
     "lo abbracciamo"
    ]
   },
   "parole": [
    [
     "ascolto",
     "ascoltare"
    ],
    [
     "aiutare",
     "aiutare"
    ],
    [
     "ecco",
     "ecco"
    ],
    [
     "pronto",
     "pronto"
    ],
    [
     "chiamo",
     "chiamare"
    ],
    [
     "abbracciamo",
     "abbracciare"
    ],
    [
     "signora",
     "signore"
    ],
    [
     "ascolta",
     "ascoltare"
    ]
   ],
   "qlang": "es",
   "infoPrompt": "¿Lo dice o no lo dice?",
   "infoYes": "Lo dice",
   "infoNo": "No lo dice"
  },
  {
   "week": 11,
   "level": "A2",
   "title": "Com'è andato il fine settimana?",
   "genre": "chiacchierata del lunedì",
   "es": "Lunes en Radio Portici: Sara y Dario se cuentan qué hicieron el fin de semana. Uno se fue de paseo y el otro se quedó en Bologna.",
   "speakers": [
    "Sara",
    "Dario"
   ],
   "turns": [
    [
     "A",
     "Buon lunedì a tutti! Dario, com'è andato il fine settimana? Hai la faccia un po' stanca..."
    ],
    [
     "B",
     "Ciao, Sara! Sabato sono andato in gita al mare con due amici. Abbiamo preso il treno delle sette e siamo arrivati a Rimini alle nove."
    ],
    [
     "A",
     "Al mare a marzo? E che cosa avete fatto?"
    ],
    [
     "B",
     "Abbiamo camminato sulla spiaggia, abbiamo mangiato il pesce e ho assaggiato la piadina con lo squacquerone. Buonissima! Ma è successa una cosa..."
    ],
    [
     "A",
     "Che cosa è successo?"
    ],
    [
     "B",
     "Domenica la mia squadra ha giocato contro il Bologna e ha perso tre a zero. Ho visto la partita in un bar pieno di bolognesi!"
    ],
    [
     "A",
     "Povero Dario! Io invece sono rimasta in città. Sabato ho ricevuto la visita di mia sorella e abbiamo scelto un ristorante nuovo in via del Pratello."
    ],
    [
     "B",
     "E com'è?"
    ],
    [
     "A",
     "Bello, ma domenica ha chiuso per il ponte: siamo arrivate e abbiamo trovato la porta chiusa! Allora abbiamo cucinato a casa."
    ],
    [
     "B",
     "E il Bologna ha vinto. Per te è stato un buon fine settimana!"
    ],
    [
     "A",
     "Sì, ma non ho viaggiato come te. E voi, ascoltatori, che cosa avete fatto lo scorso fine settimana? Scrivete a Radio Portici!"
    ]
   ],
   "gloss": {
    "faccia": "cara",
    "piadina": "pan chato de la Romaña, relleno",
    "squacquerone": "queso fresco, blando, de la Romaña",
    "povero": "pobre",
    "ponte": "fin de semana largo (el «puente»)",
    "ascoltatori": "oyentes"
   },
   "questions": [
    [
     "¿Adónde fue Dario el sábado?",
     [
      "A la playa de Rimini, con dos amigos",
      "A Nápoles, a ver a su familia",
      "A un restaurante de via del Pratello",
      "A la cancha, a ver al Bologna"
     ],
     "A la playa de Rimini, con dos amigos"
    ],
    [
     "¿Qué le pasó a Dario el domingo?",
     [
      "Perdió el tren de vuelta a Bologna",
      "Su equipo perdió tres a cero",
      "Comió pescado en mal estado",
      "No encontró un bar abierto"
     ],
     "Su equipo perdió tres a cero"
    ],
    [
     "¿Por qué Sara y su hermana cocinaron en casa?",
     [
      "Porque el restaurante estaba cerrado",
      "Porque no tenían plata",
      "Porque llovía mucho",
      "Porque la hermana cocina muy bien"
     ],
     "Porque el restaurante estaba cerrado"
    ]
   ],
   "info": [
    [
     "Dario llegó a Rimini a las nueve.",
     true
    ],
    [
     "Dario vio el partido en el estadio.",
     false
    ],
    [
     "El domingo Sara fue al mar.",
     false
    ]
   ],
   "grammatica": {
    "label": "el passato prossimo con avere y con essere",
    "forme": [
     "sono andato",
     "abbiamo preso",
     "siamo arrivati",
     "avete fatto",
     "ho assaggiato",
     "è successa",
     "ha perso",
     "sono rimasta",
     "ho ricevuto",
     "abbiamo scelto",
     "ha chiuso",
     "ha vinto",
     "ho viaggiato"
    ]
   },
   "parole": [
    [
     "gita",
     "gita"
    ],
    [
     "spiaggia",
     "spiaggia"
    ],
    [
     "assaggiato",
     "assaggiare"
    ],
    [
     "successo",
     "succedere"
    ],
    [
     "perso",
     "perdere"
    ],
    [
     "rimasta",
     "rimanere"
    ],
    [
     "ricevuto",
     "ricevere"
    ],
    [
     "scelto",
     "scegliere"
    ],
    [
     "ponte",
     "ponte"
    ],
    [
     "chiuso",
     "chiudere"
    ],
    [
     "vinto",
     "vincere"
    ],
    [
     "viaggiato",
     "viaggiare"
    ],
    [
     "scorso",
     "scorso"
    ]
   ],
   "qlang": "es",
   "infoPrompt": "¿Lo dice o no lo dice?",
   "infoYes": "Lo dice",
   "infoNo": "No lo dice"
  },
  {
   "week": 12,
   "level": "A2",
   "title": "Dario, riposati!",
   "genre": "rubrica «Stare bene»",
   "es": "Dario llega a la radio con la voz rara. Sara le pregunta cómo se siente, cómo es su día normal y le da unos cuantos consejos.",
   "speakers": [
    "Sara",
    "Dario"
   ],
   "turns": [
    [
     "A",
     "Buongiorno e benvenuti alla rubrica «Stare bene». Oggi il paziente è in studio con me: Dario, come ti senti?"
    ],
    [
     "B",
     "Male, Sara. Mi fa male la gola e anche la testa. Stamattina ho quasi perso la voce."
    ],
    [
     "A",
     "Si sente! Ma dimmi: com'è la tua giornata di solito?"
    ],
    [
     "B",
     "Di solito mi sveglio alle sei, mi alzo subito e vengo qui in bicicletta. La sera esco con gli amici e mi addormento tardi, all'una o alle due."
    ],
    [
     "A",
     "Ecco il problema! Allora, ascolta i consigli della dottoressa Sara. Prima: stasera non uscire. Resta a casa e vai a letto presto."
    ],
    [
     "B",
     "Presto? Alle dieci?"
    ],
    [
     "A",
     "Alle dieci, sì. Secondo: bevi molta acqua e un tè caldo con il miele. Terzo: dopo la trasmissione scendi in farmacia e chiedi uno sciroppo per la gola."
    ],
    [
     "B",
     "E domani? Devo venire in radio?"
    ],
    [
     "A",
     "No. Domani fermati un giorno e stai a letto. Domenica, se ti senti meglio, facciamo una passeggiata ai Giardini Margherita."
    ],
    [
     "B",
     "Va bene, dottoressa. Ma non ti arrabbiare se domani mi sveglio alle sei per abitudine!"
    ],
    [
     "A",
     "Non mi arrabbio. Ma tieni il telefono spento e dormi! E voi, ascoltatori, che cosa fate quando avete mal di gola?"
    ]
   ],
   "gloss": {
    "rubrica": "sección (de un programa)",
    "paziente": "paciente",
    "mi fa male": "me duele",
    "si sente": "se nota, se escucha",
    "dimmi": "decime",
    "miele": "miel",
    "trasmissione": "programa, transmisión",
    "sciroppo": "jarabe",
    "per abitudine": "por costumbre",
    "spento": "apagado",
    "ascoltatori": "oyentes"
   },
   "questions": [
    [
     "¿Qué le duele a Dario?",
     [
      "La garganta y la cabeza",
      "La espalda y las piernas",
      "Los ojos y los oídos",
      "El estómago"
     ],
     "La garganta y la cabeza"
    ],
    [
     "¿Qué hace Dario de noche, normalmente?",
     [
      "Trabaja en la radio hasta tarde",
      "Sale con amigos y se duerme tarde",
      "Se acuesta a las diez",
      "Va en bicicleta al parque"
     ],
     "Sale con amigos y se duerme tarde"
    ],
    [
     "¿Qué tiene que pedir Dario en la farmacia?",
     [
      "Un té con miel",
      "Un jarabe para la garganta",
      "Algo para dormir toda la noche",
      "Una receta del médico"
     ],
     "Un jarabe para la garganta"
    ]
   ],
   "info": [
    [
     "Dario se despierta a las seis.",
     true
    ],
    [
     "Sara le dice que mañana vaya a la radio.",
     false
    ],
    [
     "Sara y Dario van a correr el domingo.",
     false
    ]
   ],
   "grammatica": {
    "label": "los reflexivos en presente y el imperativo de tú",
    "forme": [
     "ti senti",
     "mi sveglio",
     "mi alzo",
     "mi addormento",
     "ascolta",
     "non uscire",
     "resta",
     "vai a letto",
     "bevi",
     "scendi",
     "chiedi",
     "fermati",
     "non ti arrabbiare",
     "tieni",
     "dormi"
    ]
   },
   "parole": [
    [
     "gola",
     "gola"
    ],
    [
     "testa",
     "testa"
    ],
    [
     "solito",
     "solito"
    ],
    [
     "sveglio",
     "svegliarsi"
    ],
    [
     "alzo",
     "alzarsi"
    ],
    [
     "addormento",
     "addormentarsi"
    ],
    [
     "scendi",
     "scendere"
    ],
    [
     "fermati",
     "fermarsi"
    ],
    [
     "arrabbiare",
     "arrabbiarsi"
    ],
    [
     "tieni",
     "tenere"
    ],
    [
     "senti",
     "sentirsi"
    ],
    [
     "domenica",
     "domenica"
    ]
   ],
   "qlang": "es",
   "infoPrompt": "¿Lo dice o no lo dice?",
   "infoYes": "Lo dice",
   "infoNo": "No lo dice"
  },
  {
   "week": 14,
   "level": "A2",
   "title": "Che cosa ti piace di Bologna?",
   "genre": "sondaggio in diretta",
   "es": "Radio Portici hace una encuesta: ¿qué les gusta y qué no de la ciudad? Llama otra vez Martín, que ya lleva unos meses en Bologna, y termina recibiendo una invitación.",
   "speakers": [
    "Sara",
    "Martín"
   ],
   "turns": [
    [
     "A",
     "Oggi facciamo un sondaggio: che cosa vi piace di Bologna e che cosa no? In linea c'è un amico della radio: Martín!"
    ],
    [
     "B",
     "Ciao, Sara! Che bello sentirti."
    ],
    [
     "A",
     "Allora, Martín, tu sei qui da qualche mese. Che cosa ti piace di questa città?"
    ],
    [
     "B",
     "Mi piacciono i portici, perché quando piove non serve l'ombrello. E mi piace tantissimo il cibo: i tortellini, la mortadella, il gelato di via Castiglione..."
    ],
    [
     "A",
     "E che cosa non ti piace?"
    ],
    [
     "B",
     "Non mi piace la nebbia d'inverno. E poi mi manca il mare, e mi mancano gli amici e le grigliate della domenica."
    ],
    [
     "A",
     "Ti capisco. E lo sport? Ti piace il calcio italiano?"
    ],
    [
     "B",
     "Sì, ma non ho ancora una squadra. Sabato ho visto una partita del Bologna allo stadio: mi è sembrata lenta, ma i tifosi sono simpaticissimi!"
    ],
    [
     "A",
     "E la sera che cosa fai? Ti piace ballare?"
    ],
    [
     "B",
     "Mi piace suonare la chitarra, ma ballare... no, cioè, ballo solo il tango, e male!"
    ],
    [
     "A",
     "Allora ti faccio un invito: venerdì la radio organizza una festa in piazza Santo Stefano, con musica dal vivo. Ti va di venire a suonare una canzone argentina?"
    ],
    [
     "B",
     "Mi dispiace, venerdì non posso: ho lezione fino alle nove. Ma sabato sono libero!"
    ],
    [
     "A",
     "Peccato! Allora sabato facciamo una passeggiata e ti porto a mangiare il pesce in un posto buonissimo. D'accordo?"
    ],
    [
     "B",
     "D'accordo! A sabato, Sara!"
    ]
   ],
   "gloss": {
    "sondaggio": "encuesta",
    "in linea": "en línea, al teléfono",
    "nebbia": "niebla",
    "grigliate": "asados, parrilladas",
    "tifosi": "hinchas",
    "chitarra": "guitarra",
    "dal vivo": "en vivo",
    "Ti va di": "¿tenés ganas de…?"
   },
   "questions": [
    [
     "Perché a Martín piacciono i portici?",
     [
      "Perché sono antichi e famosi in tutto il mondo",
      "Perché con la pioggia non serve l'ombrello",
      "Perché ci sono tanti bar e negozi",
      "Perché sono vicini alla sua casa"
     ],
     "Perché con la pioggia non serve l'ombrello"
    ],
    [
     "Che cosa manca a Martín?",
     [
      "Il mare, gli amici e le grigliate",
      "La nebbia e il freddo",
      "Una squadra di calcio da tifare allo stadio",
      "Una chitarra per suonare"
     ],
     "Il mare, gli amici e le grigliate"
    ],
    [
     "Perché Martín non va alla festa di venerdì?",
     [
      "Perché non gli piace ballare",
      "Perché ha lezione fino alle nove",
      "Perché non sa suonare",
      "Perché va allo stadio"
     ],
     "Perché ha lezione fino alle nove"
    ]
   ],
   "info": [
    [
     "A Martín piace il gelato di via Castiglione.",
     true
    ],
    [
     "Martín ha già una squadra del cuore.",
     false
    ],
    [
     "Sara e Martín si vedono sabato.",
     true
    ]
   ],
   "grammatica": {
    "label": "piacere, mancare, sembrare y dispiacere con el pronombre indirecto",
    "forme": [
     "ti piace",
     "mi piacciono",
     "mi piace",
     "non mi piace",
     "mi manca",
     "mi mancano",
     "mi è sembrata",
     "mi dispiace",
     "che cosa vi piace"
    ]
   },
   "parole": [
    [
     "cibo",
     "cibo"
    ],
    [
     "gelato",
     "gelato"
    ],
    [
     "manca",
     "mancare"
    ],
    [
     "squadra",
     "squadra"
    ],
    [
     "partita",
     "partita"
    ],
    [
     "sembrata",
     "sembrare"
    ],
    [
     "ballare",
     "ballare"
    ],
    [
     "suonare",
     "suonare"
    ],
    [
     "cioè",
     "cioè"
    ],
    [
     "canzone",
     "canzone"
    ],
    [
     "dispiace",
     "dispiacere"
    ],
    [
     "passeggiata",
     "passeggiata"
    ],
    [
     "pesce",
     "pesce"
    ]
   ],
   "qlang": "it",
   "infoPrompt": "Lo dice o non lo dice?",
   "infoYes": "Lo dice",
   "infoNo": "Non lo dice"
  }
 ]
};
  if (typeof module === "object" && module.exports) module.exports = root.RADIO_DATA;
})(typeof window !== "undefined" ? window : globalThis);
