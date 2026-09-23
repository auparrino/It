# -*- coding: utf-8 -*-
"""Stagione 2 — Il Passato (settimane 14-26, A2 → B1)."""

LESSONS = {

14: {
"intro": "Demostrativos, posesivos e indefinidos: las piezas chicas que arman "
         "cualquier frase larga. Casi todo calca el castellano; esta semana fijás "
         "los pocos puntos donde no.",
"blocks": [
 {"h": "Demostrativos: solo dos grados",
  "r": "Dos grados, no tres: *questo* (cerca de quien habla) y *quello* (todo lo "
       "demás). *quello* ante sustantivo cambia como el artículo: *quel*, "
       "*quello*, *quell'*.",
  "table": {"head": ["", "m.sg", "f.sg", "m.pl", "f.pl"],
            "rows": [["questo", "questo", "questa", "questi", "queste"],
                     ["quello (ante sust.)", "quel / quello / quell'", "quella / quell'",
                      "quei / quegli", "quelle"],
                     ["quello (pronombre)", "quello", "quella", "quelli", "quelle"]]},
  "ex": [["Questo caffè è buono.", "Este café está rico."],
         ["Quel ragazzo è Marco.", "Ese chico es Marco."],
         ["Quali libri? Quelli.", "¿Qué libros? Esos."]],
  "tip": "Como pronombre suelto, el masculino plural es *quelli*, nunca *quei*.",
  "more": ["*codesto* (ese, cerca de quien escucha) existe, pero es toscano o "
           "burocrático: no lo vas a necesitar."]},

 {"h": "Posesivos: siempre con artículo",
  "r": "El posesivo lleva **artículo** y concuerda con la cosa poseída, no con el "
       "dueño: *Marco e la sua macchina*. *loro* no cambia, pero lleva artículo igual.",
  "table": {"head": ["", "m.sg", "f.sg", "m.pl", "f.pl"],
            "rows": [["mio", "il mio", "la mia", "i miei", "le mie"],
                     ["tuo", "il tuo", "la tua", "i tuoi", "le tue"],
                     ["suo", "il suo", "la sua", "i suoi", "le sue"],
                     ["nostro", "il nostro", "la nostra", "i nostri", "le nostre"],
                     ["vostro", "il vostro", "la vostra", "i vostri", "le vostre"],
                     ["loro", "il loro", "la loro", "i loro", "le loro"]]},
  "ex": [["Anna e il suo cane.", "Ana y su perro."],
         ["Marco e la sua macchina.", "Marco y su auto."],
         ["È la loro casa.", "Es la casa de ellos."]]},

 {"h": "Familia: sin artículo",
  "r": "Parentesco en **singular y sin adjetivo**: el posesivo va sin artículo. "
       "*mio padre*, *tua sorella*, *suo figlio*.",
  "ex": [["mio padre, tua sorella", "singular: sin artículo"],
         ["i miei fratelli", "plural: con artículo"],
         ["il mio caro fratello", "con adjetivo: con artículo"],
         ["la mia mamma", "forma afectiva: con artículo"],
         ["il loro padre", "con loro: siempre con artículo"]],
  "warn": "«il mio padre» es error de principiante. Y con *loro* el artículo no "
          "se cae nunca."},

 {"h": "Indefinidos que hay que saber",
  "r": "Casi todos funcionan como en castellano. Fijá tres: *qualche* + "
       "**singular**, *ogni* invariable, y *nessuno / niente* detrás del verbo "
       "con *non*.",
  "table": {"head": ["Forma", "Sentido", "Nota"],
            "rows": [["qualche + singular", "algunos", "¡siempre singular! qualche libro"],
                     ["alcuni / alcune + plural", "algunos", "alcuni libri"],
                     ["ogni + singular", "cada / todos los", "invariable: ogni giorno"],
                     ["tutto/a/i/e + artículo", "todo", "tutti i giorni, tutta la notte"],
                     ["qualcuno / qualcosa", "alguien / algo", "invariables"],
                     ["nessuno / niente", "nadie / nada", "detrás del verbo piden non"],
                     ["altro/a/i/e", "otro", "un altro libro (con «un», a diferencia de «otro libro»)"],
                     ["poco, molto, troppo, tanto", "poco, mucho...",
                      "concuerdan como adjetivos"]]},
  "warn": "*qualche amico* = algunos amigos: «qualche amici» es error seguro. Y "
          "*ogni giorno*, nunca «ogni giorni»."},

 {"h": "molto: adjetivo o adverbio",
  "r": "Con sustantivo **concuerda** (*molti libri*, *molta gente*). Con adjetivo, "
       "adverbio o verbo **no cambia** (*molto stanchi*). Igual *poco, tanto, troppo*.",
  "ex": [["Ho molti amici.", "Tengo muchos amigos."],
         ["Sono molto contenta.", "Estoy muy contenta."],
         ["Lavorano troppo.", "Trabajan demasiado."]]},
]},

15: {
"intro": "Los conectivos convierten una lista de oraciones en un texto: son la "
         "diferencia visible entre un A2 y un B1. Esta semana aprendés a sumar, "
         "oponer, explicar causas y ordenar.",
"blocks": [
 {"h": "Sumar, oponer, corregir",
  "r": "*e* suma, *ma* opone, *invece* contrasta dos sujetos. Ante vocal, sobre "
       "todo ante *e*, *e* se vuelve *ed*: *Anna ed Elena*.",
  "table": {"head": ["Conector", "Sentido", "Ejemplo"],
            "rows": [["e / ed", "y (ed ante vocal, sobre todo ante e)", "Anna ed Elena"],
                     ["anche", "también", "Viene anche lui."],
                     ["inoltre", "además", "Inoltre, costa poco."],
                     ["ma", "pero", "Mi piace, ma costa troppo."],
                     ["però", "sin embargo", "Non posso, però ci provo."],
                     ["invece", "en cambio", "Io resto, lui invece parte."],
                     ["anzi", "es más / al contrario", "Non è brutto, anzi!"],
                     ["mentre", "mientras / en cambio", "Mentre tu dormi, io lavoro."],
                     ["tuttavia", "no obstante", "registro formal"]]},
  "warn": "*anzi* corrige hacia arriba lo que acabás de decir: *Non mi dispiace, "
          "anzi mi piace molto.* No tiene calco castellano; usado bien, suena nativo."},

 {"h": "Causa y consecuencia",
  "r": "*perché* = porque. *siccome* (como) va **siempre al principio**. *quindi, "
       "dunque, perciò* = por lo tanto.",
  "table": {"head": ["Conector", "Sentido", "Nota"],
            "rows": [["perché", "porque", "el más común"],
                     ["poiché / siccome", "como / puesto que",
                      "siccome va siempre al principio"],
                     ["dato che / visto che", "dado que", "coloquial y frecuente"],
                     ["quindi / dunque / perciò", "por lo tanto", ""],
                     ["allora", "entonces", "también muletilla oral"],
                     ["così", "así que", "Piove, così resto a casa."]]},
  "ex": [["Siccome piove, restiamo a casa.",
          "Como llueve, nos quedamos en casa."],
         ["Non viene, quindi cominciamo senza di lui.",
          "No viene, así que empezamos sin él."]]},

 {"h": "Antes, después, apenas",
  "r": "*prima di* + infinitivo, *dopo* + infinitivo **compuesto**, *appena* "
       "(apenas), *finché* (hasta que), *poi* (después), *alla fine* (al final).",
  "ex": [["Prima di uscire, chiudi la finestra.", "Antes de salir, cerrá la ventana."],
         ["Dopo aver mangiato, esco.", "Después de comer, salgo."],
         ["Appena arrivo, ti chiamo.", "Apenas llegue, te llamo."]],
  "warn": "*dopo* pide infinitivo compuesto: *dopo aver mangiato*, *dopo essere "
          "arrivati*. «dopo mangiare» está mal."},

 {"h": "Ordenar un argumento",
  "r": "Para ordenar ideas: *innanzitutto* (ante todo), *in primo luogo*, *poi*, "
       "*d'altra parte* (por otro lado), *intanto* (mientras tanto), *infine*, "
       "*in conclusione*.",
  "ex": [["Innanzitutto, grazie a tutti.", "Ante todo, gracias a todos."],
         ["D'altra parte, costa poco.", "Por otro lado, cuesta poco."]]},

 {"h": "Adelanto: los que piden congiuntivo",
  "r": "Solo para reconocerlos: se practican en la semana 27. *benché, sebbene* "
       "(aunque), *affinché* (para que), *purché* (con tal de que), *prima che* "
       "(antes de que).",
  "ex": [["Benché sia stanco, esco lo stesso.", "Aunque estoy cansado, salgo igual."],
         ["Te lo dico perché tu capisca.", "Te lo digo para que entiendas."]],
  "more": ["La lista completa: *benché*, *sebbene*, *nonostante*, *malgrado* "
           "(aunque); *affinché* y *perché* con valor de finalidad (para que); "
           "*a meno che non* (a menos que), *purché*, *a patto che* (con tal de "
           "que); *prima che* (antes de que). Los vas a leer antes de estudiarlos."]},
]},

16: {
"intro": "Los adverbios italianos se forman casi igual que en castellano. Esta "
         "semana practicás cómo se forman y, sobre todo, dónde van dentro de la frase.",
"blocks": [
 {"h": "Formación en -mente",
  "r": "Femenino singular del adjetivo + *-mente*: *lento → lentamente*. Los "
       "terminados en *-e* lo agregan directo: *veloce → velocemente*.",
  "ex": [["vero → veramente", "verdaderamente"],
         ["raro → raramente", "raramente"],
         ["semplice → semplicemente", "simplemente"]],
  "warn": "Tras vocal, *-le* y *-re* pierden la *e*: *facile → facilmente*, "
          "*normale → normalmente*, *regolare → regolarmente*. «facilemente» es "
          "falta segura."},

 {"h": "Los que no llevan -mente",
  "r": "Los más usados son formas propias: *bene, male, presto, tardi, spesso, "
       "sempre, subito, insieme, volentieri*.",
  "ex": [["Arrivo subito.", "Llego enseguida."],
         ["Vengo volentieri.", "Voy con gusto."],
         ["Parla piano!", "¡Hablá despacio!"]],
  "more": ["Otros de la misma familia: *meglio*, *peggio*, *mai*, *già*, "
           "*ancora*, *piano* (despacio, bajito), *forte* (fuerte, rápido)."]},

 {"h": "Adjetivo o adverbio",
  "r": "El adjetivo acompaña al sustantivo (*un buon libro*); el adverbio, al "
       "verbo (*scrive bene*). Se dice *sto bene*, nunca «sto buono».",
  "ex": [["È un buon libro.", "Es un buen libro."],
         ["Scrive bene.", "Escribe bien."],
         ["È cattivo. / Canta male.", "Es malo. / Canta mal."]],
  "warn": "El castellano distingue igual «bueno / bien», pero hablando rápido se "
          "mezcla. En italiano el error se nota enseguida."},

 {"h": "Dónde se coloca",
  "r": "Después del verbo: *parla lentamente*. Con negación, *mai*, *più* y "
       "*ancora* cierran el *non* que va delante del verbo.",
  "ex": [["Parla lentamente.", "Habla despacio."],
         ["Mangio sempre qui.", "Siempre como acá."],
         ["Non mangio mai carne.", "Nunca como carne."],
         ["Non sono ancora pronto.", "Todavía no estoy listo."]],
  "tip": "En la semana 17 vas a ver que en el passato prossimo los adverbios "
         "cortos van entre auxiliar y participio. Por ahora, después del verbo."},

 {"h": "Adverbios con dos sentidos",
  "r": "Cuidado con *ancora* (todavía / otra vez), *mai* (nunca / alguna vez) y "
       "*più* (más / ya no). El contexto y el *non* deciden.",
  "table": {"head": ["Italiano", "Castellano", "Ojo con"],
            "rows": [["ancora", "todavía / otra vez", "non ancora = todavía no"],
                     ["già", "ya", "en preguntas: ¿ya?"],
                     ["mai", "nunca / alguna vez",
                      "Vai mai a teatro? = ¿vas alguna vez?"],
                     ["più", "más / ya no", "non... più = ya no"],
                     ["qui / qua", "acá", "prácticamente iguales"],
                     ["lì / là", "allá", "íd."],
                     ["magari", "ojalá / quizás", "no tiene traducción única"],
                     ["addirittura", "incluso / nada menos que", "muy frecuente"]]}},
]},

17: {
"intro": "El passato prossimo cubre el «comí» y el «he comido» castellanos: "
         "*ieri ho mangiato* = ayer comí. La forma es fácil; lo que se entrena es "
         "elegir el auxiliar.",
"blocks": [
 {"h": "La forma",
  "r": "Presente de *avere* o *essere* + participio. Participios regulares: "
       "*-are → -ato*, *-ere → -uto*, *-ire → -ito*.",
  "table": {"head": ["con avere", "", "con essere", ""],
            "rows": [["ho parlato", "abbiamo parlato", "sono andato/a", "siamo andati/e"],
                     ["hai parlato", "avete parlato", "sei andato/a", "siete andati/e"],
                     ["ha parlato", "hanno parlato", "è andato/a", "sono andati/e"]]},
  "ex": [["Ieri ho mangiato la pizza.", "Ayer comí pizza."],
         ["Ho venduto la macchina.", "Vendí el auto."],
         ["Abbiamo dormito bene.", "Dormimos bien."]]},

 {"h": "Cuál auxiliar",
  "r": "*avere* con los verbos que pueden llevar objeto directo. *essere* con "
       "movimiento, permanencia, cambio de estado, reflexivos e impersonales, y la "
       "familia de *piacere*.",
  "table": {"head": ["Grupo (con essere)", "Verbos"],
            "rows": [["movimiento", "andare, venire, arrivare, partire, uscire, "
                      "entrare, tornare, salire, scendere, cadere"],
                     ["permanencia", "restare, rimanere, stare"],
                     ["cambio de estado", "nascere, morire, diventare, crescere, "
                      "guarire, dimagrire"],
                     ["existencia", "essere, esserci"],
                     ["gustar y afines", "piacere, mancare, sembrare, costare, "
                      "servire, bastare, succedere"],
                     ["todos los reflexivos", "alzarsi, lavarsi, divertirsi..."]]},
  "ex": [["Ho letto il libro.", "Leí el libro."],
         ["Sono andato a Roma.", "Fui a Roma."],
         ["Ti è piaciuto il film?", "¿Te gustó la película?"]],
  "warn": "No todo movimiento va con *essere*: *camminare, viaggiare, nuotare* van "
          "con *avere*. Y *essere* usa *essere* (*sono stato*); *avere* usa *avere* "
          "(*ho avuto*)."},

 {"h": "Con essere, el participio concuerda",
  "r": "Con *essere*, el participio **concuerda con el sujeto** en género y "
       "número: *-o, -a, -i, -e*.",
  "ex": [["Marco è partito. / Anna è partita.", "Marco se fue. / Ana se fue."],
         ["Siamo arrivati tardi.", "Llegamos tarde."],
         ["Le ragazze sono uscite.", "Las chicas salieron."]]},

 {"h": "Verbos con los dos auxiliares",
  "r": "Algunos aceptan los dos, con sentido distinto: **con objeto directo, "
       "*avere***; sin objeto, *essere*.",
  "ex": [["Ho cambiato idea. / Sono cambiato molto.",
          "Cambié de idea. / Cambié mucho (yo)."],
         ["Ho finito il lavoro. / Il film è finito.",
          "Terminé el trabajo. / La película terminó."],
         ["Ho passato tre giorni lì. / Sono passato da casa tua.",
          "Pasé tres días ahí. / Pasé por tu casa."],
         ["Ho salito le scale. / Sono salito sul treno.",
          "Subí las escaleras. / Me subí al tren."]]},

 {"h": "Modales: manda el infinitivo",
  "r": "Con *potere, volere, dovere*, el auxiliar lo elige el infinitivo que "
       "sigue: *ho dovuto studiare*, pero *sono dovuto andare*.",
  "ex": [["Ho voluto vedere il film.", "Quise ver la película."],
         ["Sono dovuta partire presto.", "Tuve que irme temprano."]],
  "tip": "Al hablar, *avere* se impone cada vez más (*ho dovuto andare*). En el "
         "examen, usá la forma canónica."},

 {"h": "Participios irregulares imprescindibles",
  "r": "Muchos verbos frecuentes, sobre todo en *-ere*, tienen participio "
       "irregular. Aprendelos de memoria junto con el infinitivo.",
  "table": {"head": ["Verbo", "Participio", "Verbo", "Participio"],
            "rows": [["essere", "stato", "fare", "fatto"],
                     ["prendere", "preso", "dire", "detto"],
                     ["mettere", "messo", "scrivere", "scritto"],
                     ["leggere", "letto", "vedere", "visto"],
                     ["chiedere", "chiesto", "rispondere", "risposto"],
                     ["aprire", "aperto", "offrire", "offerto"],
                     ["venire", "venuto", "rimanere", "rimasto"],
                     ["scegliere", "scelto", "vivere", "vissuto"],
                     ["bere", "bevuto", "perdere", "perso"],
                     ["chiudere", "chiuso", "decidere", "deciso"],
                     ["nascere", "nato", "morire", "morto"],
                     ["succedere", "successo", "correre", "corso"]]}},

 {"h": "già, mai, ancora: en el medio",
  "r": "Los adverbios cortos (*già, mai, ancora, sempre, appena*) van **entre** el "
       "auxiliar y el participio.",
  "ex": [["Ho già mangiato.", "Ya comí."],
         ["Non ho ancora finito.", "Todavía no terminé."],
         ["Non ci sono mai stato.", "Nunca estuve ahí."],
         ["Ha sempre lavorato qui.", "Siempre trabajó acá."],
         ["Ho appena parlato con lui.", "Recién hablé con él."]],
  "tip": "Los largos en *-mente* van después: *ho parlato chiaramente*."},

 {"h": "Pronombre directo: el participio concuerda",
  "r": "Con *lo, la, li, le* delante, el participio **concuerda** aunque el "
       "auxiliar sea *avere*. Con *mi, ti, ci, vi*, es opcional.",
  "ex": [["Ho visto Anna → L'ho vista.", "La vi."],
         ["Ho comprato i libri → Li ho comprati.", "Los compré."],
         ["Ho letto le lettere → Le ho lette.", "Las leí."]],
  "warn": "*lo* y *la* se apostrofan ante *ho*: *l'ho visto*, *l'ho vista*. *li* y "
          "*le*, nunca: *li ho visti*."},
]},

18: {
"intro": "LA semana difícil del B1: passato prossimo o imperfetto. No se decide "
         "por «puntual o duradero», sino por lo que mira quien habla: los hechos o "
         "el decorado.",
"blocks": [
 {"h": "La forma del imperfetto",
  "r": "Raíz + *-a-*, *-e-* o *-i-* según la conjugación, y las mismas terminaciones "
       "para las tres: *parlavo, vendevo, dormivo*.",
  "table": {"head": ["", "parlare", "vendere", "dormire", "essere"],
            "rows": [["io", "parlavo", "vendevo", "dormivo", "ero"],
                     ["tu", "parlavi", "vendevi", "dormivi", "eri"],
                     ["lui/lei", "parlava", "vendeva", "dormiva", "era"],
                     ["noi", "parlavamo", "vendevamo", "dormivamo", "eravamo"],
                     ["voi", "parlavate", "vendevate", "dormivate", "eravate"],
                     ["loro", "parlavano", "vendevano", "dormivano", "erano"]]}},

 {"h": "Los pocos irregulares",
  "r": "Recuperan la raíz latina: *fare → facevo*, *dire → dicevo*, *bere → "
       "bevevo*. *essere* es propio: *ero, eri, era*.",
  "ex": [["Da bambino facevo sport.", "De chico hacía deporte."],
         ["Che cosa dicevi?", "¿Qué decías?"],
         ["Era tardi.", "Era tarde."]],
  "more": ["Siguen el mismo patrón *tradurre → traducevo* y *porre → ponevo*."]},

 {"h": "La pregunta correcta",
  "r": "Preguntate: **¿cuento qué pasó o describo cómo estaban las cosas?** El "
       "passato prossimo avanza la historia; el imperfetto pinta fondo, costumbre "
       "y estado.",
  "table": {"head": ["Imperfetto", "Passato prossimo"],
            "rows": [["descripción del fondo", "hecho que avanza el relato"],
                     ["costumbre repetida", "hecho ocurrido un número de veces"],
                     ["estado físico o mental", "cambio de estado"],
                     ["edad, hora, clima", "acontecimiento fechado"],
                     ["acción en curso interrumpida", "la interrupción"]]},
  "ex": [["Mentre dormivo, è suonato il telefono.",
          "Mientras dormía, sonó el teléfono."],
         ["Da bambino andavo al mare ogni estate.",
          "De chico iba al mar todos los veranos."],
         ["Ieri sono andato al mare.", "Ayer fui al mar."],
         ["Faceva freddo e non c'era nessuno.", "Hacía frío y no había nadie."]],
  "warn": "«¿Duró mucho?» no sirve: *ho abitato a Roma per dieci anni* dura diez "
          "años y va en passato prossimo, porque es un período cerrado."},

 {"h": "El mismo verbo, dos lecturas",
  "r": "Con *sapere, conoscere* y los modales, el imperfetto deja el resultado "
       "abierto; el passato prossimo lo cierra. Como «podía» y «pude».",
  "ex": [["Sapevo la verità. / Ho saputo la verità.",
          "Sabía la verdad. / Me enteré de la verdad."],
         ["Conoscevo Marco. / Ho conosciuto Marco.",
          "Conocía a Marco. / Conocí a Marco."],
         ["Potevo farlo. / Ho potuto farlo.",
          "Podía hacerlo. / Pude (y lo hice)."],
         ["Volevo uscire. / Ho voluto uscire.",
          "Quería salir. / Quise salir (y salí)."],
         ["Doveva partire. / È dovuto partire.",
          "Tenía que irse. / Tuvo que irse (y se fue)."]]},

 {"h": "Imperfetto de cortesía",
  "r": "Para pedir con suavidad: *Volevo un caffè* (quería un café) es más amable "
       "que *voglio*.",
  "ex": [["Volevo un caffè, per favore.", "Quería un café, por favor."],
         ["Cercavo il signor Rossi.", "Buscaba al señor Rossi."]]},

 {"h": "Adelanto: imperfetto en la hipótesis",
  "r": "Al hablar, el imperfetto reemplaza las formas cultas de la hipótesis "
       "irreal: *Se lo sapevo, non venivo*. Reconocelo; en el examen, escribí la "
       "forma culta.",
  "ex": [["Se lo sapevo, non venivo.", "Si lo sabía, no venía (coloquial)."],
         ["Se l'avessi saputo, non sarei venuto.",
          "Si lo hubiera sabido, no habría venido (forma culta)."]],
  "more": ["La forma culta usa congiuntivo trapassato y condizionale passato: "
           "llegan en las semanas 30 y 31, y la hipótesis completa en la 32."]},
]},

19: {
"intro": "Los reflexivos en pasado tienen una sola regla, absoluta, y el "
         "castellano empuja justo al revés. Esta semana la automatizás.",
"blocks": [
 {"h": "Todos con essere. Todos.",
  "r": "Reflexivos y pronominales van **siempre con *essere***, aunque sin "
       "pronombre el verbo lleve *avere*. El participio concuerda con el sujeto.",
  "table": {"head": ["", "lavarsi"],
            "rows": [["io", "mi sono lavato / lavata"],
                     ["tu", "ti sei lavato / lavata"],
                     ["lui / lei", "si è lavato / lavata"],
                     ["noi", "ci siamo lavati / lavate"],
                     ["voi", "vi siete lavati / lavate"],
                     ["loro", "si sono lavati / lavate"]]},
  "warn": "Castellano: «me he lavado», con HABER. Italiano: *mi sono lavato*, con "
          "SER. «mi ho lavato» es el error más penalizado del B1."},

 {"h": "El mismo verbo con y sin pronombre",
  "r": "Sin pronombre, el verbo sigue su regla: *ho lavato la macchina*. Con "
       "pronombre reflexivo, pasa a *essere*: *mi sono lavato*.",
  "ex": [["Ho lavato la macchina. / Mi sono lavato le mani.",
          "Lavé el auto. / Me lavé las manos."],
         ["Ho svegliato i bambini. / Mi sono svegliato tardi.",
          "Desperté a los chicos. / Me desperté tarde."],
         ["Ho fermato il taxi. / Mi sono fermato al semaforo.",
          "Paré el taxi. / Me detuve en el semáforo."]],
  "more": ["Con objeto directo detrás (*le mani*), el italiano cuidado hace "
           "concordar el participio con el sujeto: *mi sono lavato le mani*. La "
           "concordancia con el objeto (*mi sono lavate le mani*) se admite, pero "
           "es minoritaria."]},

 {"h": "Recíprocos y pronominales",
  "r": "Los recíprocos (el uno al otro) y los pronominales idiomáticos también van "
       "con *essere*: *ci siamo visti*, *si è accorto*, *ci siamo divertiti*.",
  "ex": [["Ci siamo conosciuti a Milano.", "Nos conocimos en Milán."],
         ["Si sono salutati alla stazione.", "Se despidieron en la estación."],
         ["Mi sono dimenticata le chiavi.", "Me olvidé las llaves."],
         ["Si è accorto dell'errore.", "Se dio cuenta del error."]]},

 {"h": "Con modales, dos opciones",
  "r": "Pronombre delante → *essere*. Pronombre pegado al infinitivo → *avere*. "
       "Las dos son correctas y significan lo mismo.",
  "ex": [["Mi sono dovuto alzare presto.", "Tuve que levantarme temprano."],
         ["Ho dovuto alzarmi presto.", "Tuve que levantarme temprano."]]},
]},

20: {
"intro": "El futuro italiano es muy regular. Además de hablar del porvenir, "
         "sirve para suponer sobre el presente: *sarà a casa* = estará en casa.",
"blocks": [
 {"h": "Futuro semplice",
  "r": "Infinitivo sin la *-e* final + *-ò, -ai, -à, -emo, -ete, -anno*. En *-are*, "
       "la *a* pasa a *e*: *parlare → parlerò*.",
  "table": {"head": ["", "parlare", "vendere", "dormire"],
            "rows": [["io", "parlerò", "venderò", "dormirò"],
                     ["tu", "parlerai", "venderai", "dormirai"],
                     ["lui/lei", "parlerà", "venderà", "dormirà"],
                     ["noi", "parleremo", "venderemo", "dormiremo"],
                     ["voi", "parlerete", "venderete", "dormirete"],
                     ["loro", "parleranno", "venderanno", "dormiranno"]]},
  "tip": "La ortografía de siempre: *cercare → cercherò*, *pagare → pagherò* (con "
         "h); *cominciare → comincerò*, *mangiare → mangerò* (sin i)."},

 {"h": "Raíces irregulares",
  "r": "Pocos verbos cambian la raíz; las terminaciones son las de siempre. La "
       "misma raíz sirve después para el condicional: la aprendés dos veces.",
  "table": {"head": ["Verbo", "Raíz", "Verbo", "Raíz"],
            "rows": [["essere", "sar-", "avere", "avr-"],
                     ["andare", "andr-", "dovere", "dovr-"],
                     ["potere", "potr-", "sapere", "sapr-"],
                     ["vedere", "vedr-", "vivere", "vivr-"],
                     ["venire", "verr-", "volere", "vorr-"],
                     ["rimanere", "rimarr-", "tenere", "terr-"],
                     ["bere", "berr-", "fare", "far-"],
                     ["dare", "dar-", "stare", "star-"]]},
  "ex": [["Domani andrò al mare.", "Mañana voy a ir al mar."],
         ["Sarò a casa alle otto.", "Voy a estar en casa a las ocho."]]},

 {"h": "Futuro anteriore",
  "r": "*avrò / sarò* + participio: lo que ya estará terminado antes de otro "
       "momento futuro. También sirve para suponer sobre el pasado.",
  "ex": [["Quando avrò finito, ti chiamerò.", "Cuando haya terminado, te llamo."],
         ["Saranno già partiti.", "Ya se habrán ido."]]},

 {"h": "Futuro para suponer",
  "r": "El futuro sirve para **suponer sobre el presente**: *Sarà a casa* = "
       "estará en casa. El castellano también lo hace, pero el italiano mucho más.",
  "ex": [["Che ora è? — Saranno le tre.", "¿Qué hora es? — Serán las tres."],
         ["Quanti anni ha? — Avrà quarant'anni.", "Tendrá unos cuarenta."],
         ["Dov'è Marco? — Sarà a casa.", "Estará en casa."],
         ["Sarà anche vero, ma non ci credo.", "Puede que sea cierto, pero no lo creo."]]},

 {"h": "Después de quando, futuro",
  "r": "Si el sentido es futuro, detrás de *quando* y *appena* va **futuro**: "
       "*Quando arriverai, ti darò le chiavi*.",
  "ex": [["Quando arriverai, ti darò le chiavi.", "Cuando llegues, te doy las llaves."],
         ["Appena potrò, ti chiamerò.", "Apenas pueda, te llamo."]],
  "warn": "El castellano pone subjuntivo («cuando llegues»): no lo calques. Al "
          "hablar se oye *quando arrivi*; en el examen, escribí el futuro."},
]},

21: {
"intro": "El condicional usa la raíz del futuro: si dominás la semana pasada, lo "
         "tenés casi hecho. Sirve para pedir con cortesía, aconsejar y dar "
         "noticias no confirmadas.",
"blocks": [
 {"h": "Las formas",
  "r": "Raíz de futuro + *-ei, -esti, -ebbe, -emmo, -este, -ebbero*. Las raíces "
       "irregulares son las mismas: *sarei, avrei, vorrei*.",
  "table": {"head": ["", "parlare", "essere", "avere", "volere"],
            "rows": [["io", "parlerei", "sarei", "avrei", "vorrei"],
                     ["tu", "parleresti", "saresti", "avresti", "vorresti"],
                     ["lui/lei", "parlerebbe", "sarebbe", "avrebbe", "vorrebbe"],
                     ["noi", "parleremmo", "saremmo", "avremmo", "vorremmo"],
                     ["voi", "parlereste", "sareste", "avreste", "vorreste"],
                     ["loro", "parlerebbero", "sarebbero", "avrebbero", "vorrebbero"]]},
  "warn": "*noi* lleva **dos emes**: *parleremmo* (hablaríamos). Con una sola, "
          "*parleremo*, es futuro (hablaremos)."},

 {"h": "Cortesía, deseo y consejo",
  "r": "Para pedir, desear o aconsejar sin imponer: *vorrei*, *potresti*, *mi "
       "piacerebbe*, *dovresti*.",
  "ex": [["Vorrei un caffè, per favore.", "Quisiera un café, por favor."],
         ["Potresti aiutarmi?", "¿Podrías ayudarme?"],
         ["Mi piacerebbe andare in Italia.", "Me gustaría ir a Italia."],
         ["Dovresti riposare.", "Deberías descansar."],
         ["Saprebbe dirmi dov'è la stazione?", "¿Sabría decirme dónde está la estación?"]],
  "tip": "*Vorrei* es la forma educada por defecto en un bar, un negocio o una "
         "oficina. *Voglio un caffè* suena a orden."},

 {"h": "La noticia no confirmada",
  "r": "Diarios y noticieros usan el condicional para datos **no verificados**. El "
       "castellano también, pero el italiano lo hace casi siempre.",
  "ex": [["Secondo fonti vicine al governo, il ministro si dimetterebbe.",
          "Según fuentes cercanas al gobierno, el ministro renunciaría."],
         ["Ci sarebbero venti feriti.", "Habría veinte heridos."]],
  "tip": "Aparece en todo examen de comprensión: leelo como «parece que»."},

 {"h": "Adelanto: nunca condicional tras se",
  "r": "Detrás de *se* hipotético **nunca** va condicional: *Se avessi tempo, "
       "verrei*, jamás «se avrei tempo». La estructura completa llega en la semana 32.",
  "ex": [["Se avessi tempo, verrei.", "Si tuviera tiempo, vendría."]],
  "warn": "En el italiano hablado regional se oye «se avrei»: no lo imites. En "
          "castellano correcto tampoco se dice «si tendría»."},
]},

22: {
"intro": "Comparar es fácil hasta que hay que elegir entre *di* y *che*: en "
         "castellano los dos son «que». Es pregunta fija de todos los exámenes.",
"blocks": [
 {"h": "di o che",
  "r": "*di* ante sustantivo, pronombre o número. *che* entre dos adjetivos, dos "
       "verbos, dos sustantivos con el mismo verbo, o ante preposición.",
  "table": {"head": ["Se usa", "Cuándo", "Ejemplo"],
            "rows": [["di", "ante sustantivo o pronombre solo",
                      "Marco è più alto di Luca."],
                     ["di", "ante número", "Ho più di venti libri."],
                     ["che", "entre dos adjetivos", "È più simpatico che bello."],
                     ["che", "entre dos verbos", "È più facile dire che fare."],
                     ["che", "ante preposición", "Vado più a Roma che a Milano."],
                     ["che", "entre dos sustantivos con el mismo verbo",
                      "Bevo più caffè che tè."]]},
  "ex": [["Anna è più giovane di me.", "Ana es más joven que yo."],
         ["Studiare è meno noioso che lavorare.", "Estudiar es menos aburrido que trabajar."]],
  "more": ["La idea de fondo: *di* compara dos elementos distintos respecto de UNA "
           "misma cualidad (Marco y Luca, respecto de la altura). *che* compara dos "
           "cualidades, dos acciones o dos cantidades del mismo elemento."]},

 {"h": "Igualdad",
  "r": "*come* o *quanto*: *Marco è alto come Luca*. El *così* o *tanto* de "
       "delante suele omitirse. Con sustantivos, *tanto... quanto* concuerda.",
  "ex": [["Marco è alto come Luca.", "Marco es tan alto como Luca."],
         ["Marco è tanto alto quanto Luca.", "Marco es tan alto como Luca."],
         ["Ho tanti libri quanti quaderni.", "Tengo tantos libros como cuadernos."]]},

 {"h": "Superlativo relativo",
  "r": "Artículo + *più / meno* + adjetivo + *di*: *il ragazzo più alto della "
       "classe*. Si el artículo ya está ante el sustantivo, **no se repite**.",
  "ex": [["È la città più bella d'Italia.", "Es la ciudad más linda de Italia."],
         ["È il ragazzo più alto della classe.", "Es el chico más alto de la clase."]],
  "warn": "Nada de «la città la più bella»: un solo artículo, igual que en "
          "castellano.",
  "more": ["Detrás de un superlativo relativo, el italiano culto pide congiuntivo "
           "(«la cosa más linda que haya visto»). Lo vas a ver a partir de la "
           "semana 27."]},

 {"h": "Superlativo absoluto",
  "r": "*-issimo* o *molto* + adjetivo: *bellissimo* = *molto bello*. Concuerda "
       "como cualquier adjetivo: *bellissima, bellissimi, bellissime*.",
  "ex": [["Sono stanchissimo.", "Estoy cansadísimo."],
         ["È bravissima.", "Es buenísima (en lo que hace)."],
         ["Le case sono molto belle.", "Las casas son muy lindas."]]},

 {"h": "Las formas irregulares",
  "r": "*buono, cattivo, grande, piccolo* tienen comparativo propio: *migliore, "
       "peggiore, maggiore, minore*. Los adverbios *bene* y *male* dan *meglio* y "
       "*peggio*.",
  "table": {"head": ["Adjetivo", "Comparativo", "Superlativo rel.", "Superl. abs."],
            "rows": [["buono", "migliore", "il migliore", "ottimo"],
                     ["cattivo", "peggiore", "il peggiore", "pessimo"],
                     ["grande", "maggiore", "il maggiore", "massimo"],
                     ["piccolo", "minore", "il minore", "minimo"],
                     ["bene (adv.)", "meglio", "—", "benissimo"],
                     ["male (adv.)", "peggio", "—", "malissimo"]]},
  "ex": [["È il migliore amico che ho.", "Es el mejor amigo que tengo."],
         ["Canta meglio di me.", "Canta mejor que yo."]],
  "warn": "*migliore* es adjetivo (*un libro migliore*); *meglio* es adverbio "
          "(*canta meglio*). Confundirlos es como decir «canta mejor libro»."},
]},

23: {
"intro": "En italiano la doble negación es obligatoria, igual que en castellano. "
         "Esta semana ordenás el inventario completo, las trampas y las "
         "exclamaciones de todos los días.",
"blocks": [
 {"h": "El esquema non ... X",
  "r": "Palabra negativa **después** del verbo → *non* delante. Palabra negativa "
       "**antes** del verbo → sin *non*. Igual que en castellano.",
  "ex": [["Non ho visto nessuno.", "No vi a nadie."],
         ["Nessuno mi ha visto.", "Nadie me vio."],
         ["Non vado mai al cinema.", "Nunca voy al cine."],
         ["Non lavoro più qui.", "Ya no trabajo acá."],
         ["Non ho né tempo né voglia.", "No tengo ni tiempo ni ganas."]]},

 {"h": "El inventario",
  "r": "Cada negación se arma con *non* + otra palabra, y casi todas calcan el "
       "castellano. La excepción es *non... che*, que significa «solo».",
  "table": {"head": ["Forma", "Sentido"],
            "rows": [["non... niente / nulla", "nada"],
                     ["non... nessuno", "nadie / ningún"],
                     ["non... mai", "nunca"],
                     ["non... più", "ya no"],
                     ["non... ancora", "todavía no"],
                     ["non... né... né", "ni... ni"],
                     ["non... affatto / mica", "en absoluto / para nada"],
                     ["non... neanche / nemmeno / neppure", "ni siquiera, tampoco"],
                     ["non... che", "solo (¡no es negación!)"]]},
  "ex": [["Non c'è niente da fare.", "No hay nada que hacer."],
         ["Non mi piace neanche un po'.", "No me gusta ni un poco."]],
  "warn": "*Non ho che dieci euro* = «solo tengo diez euros», no «no tengo diez "
          "euros». Trampa clásica de comprensión lectora."},

 {"h": "mica, la negación coloquial",
  "r": "*mica* refuerza la negación al hablar: *Non è mica facile!* = ¡no es nada "
       "fácil! Se dice mucho y se escribe poco.",
  "ex": [["Non è mica facile!", "¡No es nada fácil!"],
         ["Non avresti mica una penna?", "¿No tendrías por casualidad una lapicera?"]]},

 {"h": "Exclamaciones con che, come, quanto",
  "r": "*Che* + sustantivo o adjetivo, **sin artículo**: *Che bello!* *Come* o "
       "*quanto* + verbo: *Come sei elegante!*",
  "ex": [["Che peccato!", "¡Qué lástima!"],
         ["Che bella giornata!", "¡Qué lindo día!"],
         ["Come sei elegante!", "¡Qué elegante estás!"],
         ["Quanto mi manchi!", "¡Cuánto te extraño!"]],
  "warn": "Nunca «che una bella giornata»: igual que «¡qué lindo día!», sin "
          "artículo."},

 {"h": "Cinco exclamaciones de todos los días",
  "r": "Se oyen a cada rato y no se traducen palabra por palabra: aprendelas "
       "enteras, con su sentido.",
  "ex": [["Magari!", "¡Ojalá!"],
         ["Figurati!", "¡Para nada, no es molestia!"],
         ["Dai!", "¡Dale!"],
         ["Boh!", "Ni idea."],
         ["Beato te!", "¡Qué suerte la tuya!"]]},
]},

24: {
"intro": "Con un sufijo, el italiano agrega tamaño, cariño, desprecio o ironía "
         "sin sumar adjetivos. Quien no usa alterados suena traducido.",
"blocks": [
 {"h": "Los sufijos alterativos",
  "r": "*-ino, -etto, -ello* achican o dan cariño; *-one* agranda; *-accio* "
       "desprecia; *-uccio* es cariñoso.",
  "table": {"head": ["Sufijo", "Valor", "Ejemplos"],
            "rows": [["-ino / -ina", "pequeño, afectuoso",
                      "gattino, sorellina, un pochino"],
                     ["-etto / -etta", "pequeño, simpático",
                      "casetta, libretto, poveretto"],
                     ["-ello / -ella", "pequeño, a veces despectivo",
                      "alberello, cattivello"],
                     ["-one / -ona", "grande, aumentativo",
                      "librone, portone, pigrone"],
                     ["-accio / -accia", "feo, malo, despectivo",
                      "tempaccio, parolaccia, ragazzaccio"],
                     ["-uccio / -uccia", "cariñoso, un poco menor",
                      "caruccio, boccuccia"]]},
  "warn": "*-one* suele volver masculino un sustantivo femenino: *la porta → il "
          "portone*, *la donna → il donnone*."},

 {"h": "Los falsos alterados",
  "r": "No todo lo que termina en *-ino* u *-one* es alterado: *il tacchino* (el "
       "pavo) no es un *tacco* chico, ni *il mattone* (el ladrillo) un *matto* grande.",
  "ex": [["il bottone", "el botón"],
         ["il burrone", "el barranco"],
         ["il montone", "el carnero"],
         ["il postino", "el cartero"],
         ["la focaccia", "la focaccia (un pan)"]]},

 {"h": "Se aplica a casi todo",
  "r": "Los sufijos van con sustantivos, con adjetivos (*carino, piccolino*) y "
       "hasta con adverbios (*benino, pianino, prestino*).",
  "ex": [["un caffettino", "un cafecito"],
         ["fra un attimino", "en un segundito"],
         ["che freddino!", "¡qué fresquito!"],
         ["ha una macchinona", "tiene un autazo"],
         ["che giornataccia!", "¡qué día de porquería!"]]},

 {"h": "Prefijos que multiplican el vocabulario",
  "r": "*ri-* repite; *s-*, *in-* y *dis-* niegan; *stra-*, *super-* e *iper-* "
       "exageran; *mal-* = mal.",
  "table": {"head": ["Prefijo", "Sentido", "Ejemplo"],
            "rows": [["ri-", "de nuevo", "rifare, rivedere, ripetere"],
                     ["s-", "negación o intensificación",
                      "scontento, sfortuna, sbagliare"],
                     ["in- / im- / dis-", "negación",
                      "incapace, impossibile, disonesto"],
                     ["stra- / super- / iper-", "exceso",
                      "strapieno, superaffollato"],
                     ["mal-", "mal", "maleducato, malinteso"]]},
  "tip": "*ri-* va con casi cualquier verbo: *te lo rispiego* (te lo vuelvo a "
         "explicar), *ci risentiamo* (volvemos a hablar). Ahorra perífrasis."},
]},

25: {
"intro": "Cantidades, medidas y números: frases cortas y muy frecuentes que "
         "conviene memorizar en bloque. Acá se nota si manejás el idioma o lo "
         "traducís.",
"blocks": [
 {"h": "Cantidades aproximadas",
  "r": "*una decina, una ventina, un centinaio, un migliaio, un paio* + **di** + "
       "sustantivo: *una ventina di persone*.",
  "table": {"head": ["Forma", "Sentido", "Ejemplo"],
            "rows": [["una decina, una ventina", "unos diez, unos veinte",
                      "una ventina di persone"],
                     ["un centinaio / centinaia", "un centenar / centenares",
                      "centinaia di libri"],
                     ["un migliaio / migliaia", "un millar / miles",
                      "migliaia di euro"],
                     ["un paio", "un par", "un paio di scarpe"],
                     ["circa / all'incirca", "aproximadamente", "circa dieci"],
                     ["più o meno", "más o menos", ""]]},
  "warn": "No te olvides el *di*: *una decina di amici*. Y el plural es femenino "
          "en *-a*: *le centinaia*, *le migliaia*."},

 {"h": "Fracciones",
  "r": "*la metà* (la mitad), *un terzo*, *un quarto*, *tre quarti*, *due terzi*. "
       "Y *il doppio*, *il triplo*.",
  "ex": [["Ho letto metà del libro.", "Leí la mitad del libro."],
         ["Un quarto d'ora.", "Un cuarto de hora."],
         ["Costa il doppio.", "Cuesta el doble."]]},

 {"h": "Porcentajes",
  "r": "Llevan **artículo masculino**: *il 20% degli italiani*. El verbo suele "
       "concordar con el sustantivo que sigue.",
  "ex": [["Il 30% degli studenti sono stranieri.",
          "El 30% de los estudiantes son extranjeros."],
         ["Il 20% degli italiani vive qui.", "El 20% de los italianos vive acá."]]},

 {"h": "Pesos, medidas y compra",
  "r": "En el mostrador se pide por *etto* (100 g): *due etti*. El precio por "
       "unidad va con *a* + artículo: *al chilo*, *al litro*.",
  "ex": [["Un chilo di mele, per favore.", "Un kilo de manzanas."],
         ["Due etti di prosciutto.", "Doscientos gramos de jamón."],
         ["Mezzo litro di latte.", "Medio litro de leche."],
         ["Quanto viene? / Quant'è?", "¿Cuánto es?"],
         ["Costa dieci euro al chilo.", "Cuesta diez euros el kilo."]],
  "tip": "Nadie pide «200 grammi»: se piden *due etti*. Igual *al giorno*, "
         "*all'ora*: *a* + artículo donde el castellano dice «por» o «el»."},

 {"h": "Operaciones y números escritos",
  "r": "*più* (+), *meno* (−), *per* (×), *diviso* (÷), *fa* o *uguale* (=). "
       "Decimales con **coma**, miles con **punto**.",
  "ex": [["Due più due fa quattro.", "Dos más dos son cuatro."],
         ["3,5 = tre virgola cinque", "tres coma cinco"],
         ["1.000 euro", "mil euros"]]},
]},

26: {
"intro": "Cierre de la segunda temporada. Ordenás el sistema de pasados y "
         "futuros, sumás el trapassato prossimo y repasás las trampas que el "
         "examen va a atacar.",
"blocks": [
 {"h": "El mapa de los tiempos",
  "r": "Dos mecanismos: terminación sobre la raíz (presente, imperfetto, futuro, "
       "condizionale) o auxiliar + participio (los tiempos compuestos).",
  "table": {"head": ["Tiempo", "Se forma", "Sirve para"],
            "rows": [["presente", "raíz + terminación", "ahora, habitual, futuro cercano"],
                     ["passato prossimo", "avere/essere + participio",
                      "hecho pasado y terminado"],
                     ["imperfetto", "raíz + -avo/-evo/-ivo",
                      "fondo, costumbre, descripción"],
                     ["trapassato prossimo", "avevo/ero + participio",
                      "pasado anterior a otro pasado"],
                     ["futuro semplice", "raíz de futuro + -ò, -ai, -à",
                      "porvenir y suposición"],
                     ["futuro anteriore", "avrò/sarò + participio",
                      "terminado antes de un futuro"],
                     ["condizionale", "raíz de futuro + -ei, -esti, -ebbe",
                      "cortesía, deseo, noticia no confirmada"]]}},

 {"h": "El trapassato prossimo",
  "r": "Imperfetto de *avere* o *essere* + participio: lo que pasó **antes** de "
       "otro hecho pasado. El auxiliar se elige como en el passato prossimo.",
  "ex": [["Avevo già mangiato.", "Ya había comido."],
         ["Non avevo mai visto Roma.", "Nunca había visto Roma."],
         ["Quando sono arrivato, il film era già cominciato.",
          "Cuando llegué, la película ya había empezado."]]},

 {"h": "Auxiliar: la decisión de cada frase",
  "r": "*essere* con desplazamiento, cambio de estado, reflexivos, pronominales, "
       "impersonales y familia de *piacere*: el participio concuerda con el "
       "sujeto. *avere* con todo lo demás.",
  "warn": "Con *avere*, el participio solo concuerda si hay *lo, la, li, le* "
          "delante: *le ho viste*. Y *camminare, viaggiare* van con *avere*."},

 {"h": "Raíces de futuro y condicional",
  "r": "Una raíz, dos tiempos: la raíz irregular del futuro es la misma del "
       "condicional. *sarò / sarei*, *vorrò / vorrei*.",
  "table": {"head": ["Verbo", "Raíz", "Verbo", "Raíz"],
            "rows": [["essere", "sar-", "avere", "avr-"],
                     ["andare", "andr-", "potere", "potr-"],
                     ["volere", "vorr-", "venire", "verr-"],
                     ["dovere", "dovr-", "sapere", "sapr-"],
                     ["vedere", "vedr-", "rimanere", "rimarr-"],
                     ["tenere", "terr-", "bere", "berr-"],
                     ["fare", "far-", "", ""]]}},

 {"h": "Repaso: trampas de los verbos",
  "r": "1. *mi sono lavato*, jamás «mi ho lavato». 2. *parleremo* (futuro) ≠ "
       "*parleremmo* (condicional). 3. Detrás de *se* hipotético, nunca condicional."},

 {"h": "Repaso: trampas de la frase",
  "r": "4. *migliore* adjetivo, *meglio* adverbio. 5. *più alto di Luca*, pero "
       "*più simpatico che bello*. 6. *qualche* + singular. 7. *dopo aver "
       "mangiato*, no «dopo mangiare»."},
]},

}
