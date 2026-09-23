# -*- coding: utf-8 -*-
"""Stagione 2 — Il Passato (settimane 14-26, A2 → B1)."""

LESSONS = {

14: {
"intro": "Demostrativos, posesivos e indefinidos son la fontanería del "
         "italiano: no lucen, pero sin ellos no se arma una frase larga. Casi "
         "todo se parece al castellano; los tres o cuatro puntos donde no se "
         "parece son los que hay que fijar.",
"blocks": [
 {"h": "Demostrativos: solo dos grados",
  "p": ["El italiano no tiene el sistema de tres grados del castellano "
        "(este / ese / aquel). Tiene dos: *questo* (cerca de quien habla) y "
        "*quello* (todo lo demás). *Codesto* existe pero es toscano antiguo y "
        "burocrático."],
  "table": {"head": ["", "m.sg", "f.sg", "m.pl", "f.pl"],
            "rows": [["questo", "questo", "questa", "questi", "queste"],
                     ["quello (ante sust.)", "quel / quello / quell'", "quella / quell'",
                      "quei / quegli", "quelle"],
                     ["quello (pronombre)", "quello", "quella", "quelli", "quelle"]]},
  "tip": "Como pronombre suelto, el masculino plural es *quelli*, no *quei*: "
         "*Quali libri? Quelli.*"},

 {"h": "Posesivos: siempre con artículo",
  "table": {"head": ["", "m.sg", "f.sg", "m.pl", "f.pl"],
            "rows": [["mio", "il mio", "la mia", "i miei", "le mie"],
                     ["tuo", "il tuo", "la tua", "i tuoi", "le tue"],
                     ["suo", "il suo", "la sua", "i suoi", "le sue"],
                     ["nostro", "il nostro", "la nostra", "i nostri", "le nostre"],
                     ["vostro", "il vostro", "la vostra", "i vostri", "le vostre"],
                     ["loro", "il loro", "la loro", "i loro", "le loro"]]},
  "p": ["El posesivo concuerda con la cosa poseída, no con el dueño: *Marco e "
        "la sua macchina*, *Anna e il suo cane*. *Loro* es invariable pero "
        "lleva artículo igual."],
  "warn": "La única excepción a lo del artículo: parentesco en singular y sin "
          "adjetivo. *mio padre*, *tua sorella*, *suo figlio*. Pero *i miei "
          "fratelli* (plural), *il mio caro fratello* (con adjetivo), "
          "*la mia mamma* (forma afectiva) y *il loro padre* (siempre con "
          "*loro*)."},

 {"h": "Indefinidos que hay que saber",
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
  "warn": "*qualche* va con sustantivo SINGULAR aunque el sentido sea plural: "
          "*qualche amico* = algunos amigos. Decir «qualche amici» es error "
          "seguro. Y *ogni* es invariable: *ogni giorno*, nunca «ogni giorni»."},

 {"h": "molto: adjetivo o adverbio",
  "p": ["Cuando acompaña a un sustantivo concuerda (*molti libri*, *molta "
        "gente*). Cuando modifica a un adjetivo, a un adverbio o a un verbo, es "
        "invariable (*sono molto stanchi*, *mangia molto*). Lo mismo vale para "
        "*poco*, *tanto*, *troppo*."],
  "ex": [["Ho molti amici.", "Tengo muchos amigos."],
         ["Sono molto contenta.", "Estoy muy contenta."],
         ["Lavorano troppo.", "Trabajan demasiado."]]},
]},

15: {
"intro": "Hasta acá venías armando frases sueltas. Los conectivos son lo que "
         "convierte una lista de oraciones en un texto, y son la diferencia "
         "visible entre un A2 y un B1. No son vocabulario decorativo: cada uno "
         "impone su propia sintaxis.",
"blocks": [
 {"h": "Sumar, oponer, corregir",
  "table": {"head": ["Conector", "Sentido", "Ejemplo"],
            "rows": [["e / ed", "y (ed ante vocal, sobre todo ante e)", "Anna ed Elena"],
                     ["anche", "también", "Viene anche lui."],
                     ["inoltre", "además", "Inoltre, costa poco."],
                     ["ma", "pero", "Vorrei, ma non posso."],
                     ["però", "sin embargo", "Non posso, però ci provo."],
                     ["invece", "en cambio", "Io resto, lui invece parte."],
                     ["anzi", "es más / al contrario", "Non è brutto, anzi!"],
                     ["mentre", "mientras / en cambio", "Mentre tu dormi, io lavoro."],
                     ["tuttavia", "no obstante", "registro formal"]]},
  "warn": "*anzi* no tiene equivalente exacto: sirve para corregir hacia arriba "
          "lo que se acaba de decir. *Non mi dispiace, anzi mi piace molto.* "
          "Usarlo bien suena inmediatamente nativo."},

 {"h": "Causa y consecuencia",
  "table": {"head": ["Conector", "Sentido", "Nota"],
            "rows": [["perché", "porque", "el más común"],
                     ["poiché / siccome", "como / puesto que",
                      "siccome va siempre al principio"],
                     ["dato che / visto che", "dado que", "coloquial y frecuente"],
                     ["quindi / dunque / perciò", "por lo tanto", ""],
                     ["allora", "entonces", "también muletilla oral"],
                     ["così", "así que", "Pioveva, così sono rimasto a casa."]]},
  "ex": [["Siccome pioveva, siamo rimasti a casa.",
          "Como llovía, nos quedamos en casa."],
         ["Non è venuto, quindi abbiamo cominciato senza di lui.",
          "No vino, así que empezamos sin él."]]},

 {"h": "Tiempo y orden del discurso",
  "p": ["*prima di* + infinitivo, *dopo* + infinitivo compuesto, *quando*, "
        "*appena* (apenas), *finché* (mientras / hasta que), *intanto*, "
        "*poi*, *infine*, *alla fine*. Para ordenar una argumentación: "
        "*innanzitutto*, *in primo luogo*, *d'altra parte*, *in conclusione*."],
  "ex": [["Prima di uscire, chiudi la finestra.", "Antes de salir, cerrá la ventana."],
         ["Dopo aver mangiato, siamo usciti.", "Después de comer, salimos."],
         ["Appena arrivo, ti chiamo.", "Apenas llegue, te llamo."]],
  "warn": "*Dopo* + infinitivo exige el infinitivo COMPUESTO: *dopo aver "
          "mangiato*, *dopo essere arrivati*. No se dice «dopo mangiare»."},

 {"h": "Los que ya piden congiuntivo",
  "p": ["Anotalos ahora aunque el congiuntivo llegue en la temporada 3, porque "
        "vas a leerlos antes de estudiarlos: *benché*, *sebbene*, *nonostante*, "
        "*malgrado* (aunque); *affinché*, *perché* con valor de finalidad (para "
        "que); *a meno che non*, *purché*, *a patto che* (a menos que, con tal "
        "de que); *prima che* (antes de que)."],
  "ex": [["Benché sia stanco, esco lo stesso.", "Aunque estoy cansado, salgo igual."],
         ["Te lo dico perché tu capisca.", "Te lo digo para que entiendas."]]},
]},

16: {
"intro": "Los adverbios italianos se forman casi igual que en castellano, así "
         "que la semana es corta en teoría nueva. Lo que sí hay que trabajar es "
         "el orden: dónde se meten dentro de la frase, sobre todo con tiempos "
         "compuestos.",
"blocks": [
 {"h": "Formación en -mente",
  "p": ["Se toma la forma femenina singular del adjetivo y se agrega *-mente*: "
        "*lento → lenta → lentamente*, *vero → veramente*, *raro → raramente*. "
        "Los adjetivos en *-e* la agregan directamente: *veloce → velocemente*, "
        "*semplice → semplicemente*."],
  "warn": "Los adjetivos terminados en vocal + *-le* / *-re* pierden la *e* final: "
          "*facile → facilmente*, *difficile → difficilmente*, "
          "*normale → normalmente*, *particolare → particolarmente*, "
          "*regolare → regolarmente*. Escribir «facilemente» es falta segura."},

 {"h": "Los que no se forman con -mente",
  "p": ["Los más usados son formas propias: *bene*, *male*, *meglio*, *peggio*, "
        "*presto*, *tardi*, *spesso*, *sempre*, *mai*, *già*, *ancora*, "
        "*subito*, *piano*, *forte*, *insieme*, *volentieri*."],
  "warn": "No confundas el adjetivo con el adverbio: *un buon libro* / *scrive "
          "bene*; *è cattivo* / *canta male*. El castellano usa «bueno/bien» "
          "con la misma distinción, pero al hablar rápido se mezcla: *sto "
          "bene*, nunca «sto buono»."},

 {"h": "Dónde se coloca",
  "p": ["El adverbio normalmente va después del verbo: *parla lentamente*, "
        "*lavora molto*. Con tiempos compuestos, los adverbios cortos y "
        "frecuentes se meten ENTRE el auxiliar y el participio."],
  "ex": [["Ho già mangiato.", "Ya comí."],
         ["Non ho ancora finito.", "Todavía no terminé."],
         ["Non ci sono mai stato.", "Nunca estuve ahí."],
         ["Ha sempre lavorato qui.", "Siempre trabajó acá."],
         ["Ho appena parlato con lui.", "Recién hablé con él."]],
  "tip": "Los largos en *-mente* van fuera: *Ho parlato chiaramente*, no «ho "
         "chiaramente parlato» (posible pero enfático y raro)."},

 {"h": "Adverbios de tiempo y lugar que se confunden",
  "table": {"head": ["Italiano", "Castellano", "Ojo con"],
            "rows": [["ancora", "todavía / otra vez", "non ancora = todavía no"],
                     ["già", "ya", "en preguntas: ¿ya?"],
                     ["mai", "nunca / alguna vez",
                      "Sei mai stato a Roma? = ¿alguna vez?"],
                     ["più", "más / ya no", "non... più = ya no"],
                     ["qui / qua", "acá", "prácticamente iguales"],
                     ["lì / là", "allá", "íd."],
                     ["magari", "ojalá / quizás", "no tiene traducción única"],
                     ["addirittura", "incluso / nada menos que", "muy frecuente"]]}},
]},

17: {
"intro": "El passato prossimo es el pasado que más vas a usar: en italiano "
         "moderno hace el trabajo del pretérito perfecto y del indefinido "
         "castellanos juntos. *Ieri ho mangiato* es «ayer comí», no «ayer he "
         "comido». La dificultad real no es la forma: es elegir el auxiliar.",
"blocks": [
 {"h": "La forma",
  "p": ["Auxiliar *avere* o *essere* en presente + participio pasado. "
        "Participios regulares: *-are → -ato*, *-ere → -uto*, *-ire → -ito*."],
  "table": {"head": ["con avere", "", "con essere", ""],
            "rows": [["ho parlato", "abbiamo parlato", "sono andato/a", "siamo andati/e"],
                     ["hai parlato", "avete parlato", "sei andato/a", "siete andati/e"],
                     ["ha parlato", "hanno parlato", "è andato/a", "sono andati/e"]]}},

 {"h": "Cuál auxiliar",
  "p": ["*avere* con los verbos transitivos, es decir los que pueden llevar "
        "objeto directo: *ho letto il libro*, *ho mangiato*, *ho visto*. "
        "*essere* con muchos intransitivos de movimiento (no todos: *camminare*, "
        "*viaggiare*, *nuotare* van con *avere*) y de cambio de estado, "
        "con los reflexivos y con los impersonales. Con *essere* el participio "
        "CONCUERDA con el sujeto."],
  "table": {"head": ["Grupo", "Verbos"],
            "rows": [["movimiento", "andare, venire, arrivare, partire, uscire, "
                      "entrare, tornare, salire, scendere, cadere"],
                     ["permanencia", "restare, rimanere, stare"],
                     ["cambio de estado", "nascere, morire, diventare, crescere, "
                      "guarire, dimagrire"],
                     ["existencia", "essere, esserci"],
                     ["gustar y afines", "piacere, mancare, sembrare, costare, "
                      "servire, bastare, succedere"],
                     ["todos los reflexivos", "alzarsi, lavarsi, divertirsi..."]]},
  "warn": "*essere* mismo va con *essere*: *sono stato a Roma*. Y *avere* va "
          "con *avere*: *ho avuto fortuna*."},

 {"h": "Los verbos que cambian de auxiliar",
  "p": ["Algunos aceptan los dos, con sentido distinto: si llevan objeto "
        "directo van con *avere*, si no, con *essere*."],
  "ex": [["Ho cambiato idea. / Sono cambiato molto.",
          "Cambié de idea. / Cambié mucho (yo)."],
         ["Ho finito il lavoro. / Il film è finito.",
          "Terminé el trabajo. / La película terminó."],
         ["Ho passato tre giorni lì. / Sono passato da casa tua.",
          "Pasé tres días ahí. / Pasé por tu casa."],
         ["Ho salito le scale. / Sono salito sul treno.",
          "Subí las escaleras. / Me subí al tren."]],
  "tip": "Con los modales (*potere, volere, dovere*) el auxiliar lo decide el "
         "infinitivo que sigue: *ho dovuto studiare* pero *sono dovuto "
         "andare*. En el italiano hablado *avere* se impone cada vez más, pero "
         "en el examen conviene la forma canónica."},

 {"h": "Participios irregulares imprescindibles",
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
]},

18: {
"intro": "Esta es LA semana difícil del B1. El contraste entre passato "
         "prossimo e imperfetto no se resuelve con la regla escolar de «acción "
         "puntual contra acción duradera», que es falsa la mitad de las veces. "
         "Se resuelve preguntándose qué está mirando el que habla.",
"blocks": [
 {"h": "La forma del imperfetto: casi sin excepciones",
  "table": {"head": ["", "parlare", "vendere", "dormire", "essere"],
            "rows": [["io", "parlavo", "vendevo", "dormivo", "ero"],
                     ["tu", "parlavi", "vendevi", "dormivi", "eri"],
                     ["lui/lei", "parlava", "vendeva", "dormiva", "era"],
                     ["noi", "parlavamo", "vendevamo", "dormivamo", "eravamo"],
                     ["voi", "parlavate", "vendevate", "dormivate", "eravate"],
                     ["loro", "parlavano", "vendevano", "dormivano", "erano"]]},
  "p": ["Solo unos pocos verbos son irregulares, y siempre por la misma razón "
        "(recuperan la raíz latina): *essere* → *ero*; *fare* → *facevo*; "
        "*dire* → *dicevo*; *bere* → *bevevo*. También *tradurre* → *traducevo* "
        "y *porre* → *ponevo*."]},

 {"h": "La pregunta correcta",
  "p": ["No preguntes «¿duró mucho?». Preguntá: **¿estoy contando qué pasó, o "
        "estoy describiendo cómo estaban las cosas?** El passato prossimo hace "
        "avanzar la historia; el imperfetto pinta el decorado, la costumbre y "
        "el estado."],
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
         ["Faceva freddo e non c'era nessuno.", "Hacía frío y no había nadie."],
         ["Avevo vent'anni quando mi sono trasferito.",
          "Tenía veinte años cuando me mudé."]]},

 {"h": "El mismo verbo, dos lecturas",
  "ex": [["Sapevo la verità. / Ho saputo la verità.",
          "Sabía la verdad. / Me enteré de la verdad."],
         ["Conoscevo Marco. / Ho conosciuto Marco.",
          "Conocía a Marco. / Conocí a Marco."],
         ["Potevo farlo. / Ho potuto farlo.",
          "Podía hacerlo. / Pude (y lo hice)."],
         ["Volevo uscire. / Ho voluto uscire.",
          "Quería salir. / Quise salir (y salí)."],
         ["Doveva partire. / È dovuto partire.",
          "Tenía que salir. / Tuvo que salir (y salió)."]],
  "tip": "Con los modales, el imperfetto deja el resultado abierto y el passato "
         "prossimo lo cierra. Es exactamente el mismo juego que en castellano "
         "entre «podía» y «pude»."},

 {"h": "Otros usos del imperfetto",
  "p": ["Cortesía: *Volevo un caffè* (quería un café, más suave que *voglio*). "
        "Petición: *Cercavo il signor Rossi*. Y en el italiano coloquial, el "
        "imperfetto sustituye al congiuntivo trapassato y al condicional compuesto en las hipótesis: "
        "*Se lo sapevo, non venivo* por *se l'avessi saputo, non sarei venuto*. "
        "Reconocelo, pero en el examen escribí la forma culta."]},
]},

19: {
"intro": "Los reflexivos en pasado tienen una sola regla, pero es absoluta y "
         "el castellano empuja justo en la dirección contraria. Vale la pena "
         "una semana entera para automatizarla.",
"blocks": [
 {"h": "Todos con essere. Todos.",
  "p": ["No importa si el verbo, sin el pronombre, iría con *avere*. En cuanto "
        "es reflexivo o pronominal, el auxiliar es *essere* y el participio "
        "concuerda con el sujeto."],
  "table": {"head": ["", "lavarsi"],
            "rows": [["io", "mi sono lavato / lavata"],
                     ["tu", "ti sei lavato / lavata"],
                     ["lui / lei", "si è lavato / lavata"],
                     ["noi", "ci siamo lavati / lavate"],
                     ["voi", "vi siete lavati / lavate"],
                     ["loro", "si sono lavati / lavate"]]},
  "warn": "El castellano dice «me he lavado», con HABER. El italiano dice "
          "*mi sono lavato*, con SER. Escribir «mi ho lavato» es el error más "
          "penalizado del nivel B1 porque delata que no se interiorizó la regla."},

 {"h": "El mismo verbo con y sin pronombre",
  "ex": [["Ho lavato la macchina. / Mi sono lavato le mani.",
          "Lavé el auto. / Me lavé las manos."],
         ["Ho svegliato i bambini. / Mi sono svegliato tardi.",
          "Desperté a los chicos. / Me desperté tarde."],
         ["Ho fermato il taxi. / Mi sono fermato al semaforo.",
          "Paré el taxi. / Me detuve en el semáforo."]],
  "p": ["Fijate en el segundo caso de la primera línea: cuando el reflexivo "
        "lleva un objeto directo detrás (*le mani*), el participio en el "
        "italiano cuidado concuerda igual con el sujeto: *mi sono lavato le "
        "mani*. La concordancia con el objeto (*lavate*) también se admite, "
        "pero es minoritaria."]},

 {"h": "Recíprocos y pronominales",
  "p": ["Los recíprocos («el uno al otro») funcionan igual: *ci siamo visti*, "
        "*si sono incontrati*, *vi siete salutati*. Y los verbos pronominales "
        "idiomáticos también: *me ne sono andato* (me fui), *ci siamo divertiti* "
        "(nos divertimos), *si è accorto* (se dio cuenta), *mi sono dimenticato* "
        "(me olvidé)."],
  "ex": [["Ci siamo conosciuti a Milano.", "Nos conocimos en Milán."],
         ["Se ne sono andati presto.", "Se fueron temprano."],
         ["Mi sono dimenticata le chiavi.", "Me olvidé las llaves."]]},

 {"h": "Con modales, dos opciones",
  "p": ["Si el pronombre va delante, el auxiliar es *essere*; si va pegado al "
        "infinitivo, es *avere*. Las dos son correctas y significan lo mismo."],
  "ex": [["Mi sono dovuto alzare presto.", "Tuve que levantarme temprano."],
         ["Ho dovuto alzarmi presto.", "Tuve que levantarme temprano."]]},
]},

20: {
"intro": "El futuro italiano se forma con una regularidad envidiable y, además "
         "de hablar del porvenir, tiene un uso que el castellano comparte pero "
         "usa menos: la suposición sobre el presente.",
"blocks": [
 {"h": "Futuro semplice",
  "p": ["Se toma el infinitivo, se le saca la *-e* final y se agregan las "
        "terminaciones. Los verbos en *-are* cambian esa *a* por *e*: "
        "*parlare → parler-*."],
  "table": {"head": ["", "parlare", "vendere", "dormire"],
            "rows": [["io", "parlerò", "venderò", "dormirò"],
                     ["tu", "parlerai", "venderai", "dormirai"],
                     ["lui/lei", "parlerà", "venderà", "dormirà"],
                     ["noi", "parleremo", "venderemo", "dormiremo"],
                     ["voi", "parlerete", "venderete", "dormirete"],
                     ["loro", "parleranno", "venderanno", "dormiranno"]]},
  "tip": "Las mismas reglas de ortografía de siempre: *cercare → cercherò*, "
         "*pagare → pagherò* (con h), *cominciare → comincerò*, "
         "*mangiare → mangerò* (sin i)."},

 {"h": "Raíces irregulares",
  "p": ["Son pocas y sirven también para el condicional, así que aprenderlas "
        "ahora es aprenderlas dos veces."],
  "table": {"head": ["Verbo", "Raíz", "Verbo", "Raíz"],
            "rows": [["essere", "sar-", "avere", "avr-"],
                     ["andare", "andr-", "dovere", "dovr-"],
                     ["potere", "potr-", "sapere", "sapr-"],
                     ["vedere", "vedr-", "vivere", "vivr-"],
                     ["venire", "verr-", "volere", "vorr-"],
                     ["rimanere", "rimarr-", "tenere", "terr-"],
                     ["bere", "berr-", "fare", "far-"],
                     ["dare", "dar-", "stare", "star-"]]}},

 {"h": "Futuro anteriore",
  "p": ["*avrò / sarò* + participio. Expresa lo que estará terminado antes de "
        "otro momento futuro, y también la suposición sobre el pasado."],
  "ex": [["Quando avrò finito, ti chiamerò.", "Cuando haya terminado, te llamo."],
         ["Saranno già partiti.", "Ya habrán salido."]]},

 {"h": "El uso más italiano: la suposición",
  "p": ["El futuro sirve para conjeturar sobre el presente. El castellano "
        "también lo hace («serán las tres»), pero el italiano lo usa mucho más "
        "y en más contextos."],
  "ex": [["Che ora è? — Saranno le tre.", "¿Qué hora es? — Serán las tres."],
         ["Quanti anni ha? — Avrà quarant'anni.", "Tendrá unos cuarenta."],
         ["Dov'è Marco? — Sarà a casa.", "Estará en casa."],
         ["Sarà anche vero, ma non ci credo.", "Puede que sea cierto, pero no lo creo."]],
  "warn": "Detrás de *quando* y *appena* el italiano culto pide futuro "
          "cuando el sentido es futuro: *Quando arriverai, ti darò le chiavi*. "
          "El castellano usa presente o subjuntivo ahí («cuando llegues»), así "
          "que la traducción literal falla. En el habla cotidiana el italiano "
          "también acepta presente (*quando arrivi*), pero en el examen "
          "escribí el futuro."},
]},

21: {
"intro": "El condicional italiano se construye sobre la misma raíz que el "
         "futuro, así que si hiciste bien la semana pasada, esta es media "
         "semana de trabajo. A cambio, tiene un uso periodístico que el castellano "
         "también conoce pero usa mucho menos, y que aparece en todo examen de comprensión.",
"blocks": [
 {"h": "Las formas",
  "table": {"head": ["", "parlare", "essere", "avere", "volere"],
            "rows": [["io", "parlerei", "sarei", "avrei", "vorrei"],
                     ["tu", "parleresti", "saresti", "avresti", "vorresti"],
                     ["lui/lei", "parlerebbe", "sarebbe", "avrebbe", "vorrebbe"],
                     ["noi", "parleremmo", "saremmo", "avremmo", "vorremmo"],
                     ["voi", "parlereste", "sareste", "avreste", "vorreste"],
                     ["loro", "parlerebbero", "sarebbero", "avrebbero", "vorrebbero"]]},
  "warn": "Ojo con las dobles: *noi* lleva *-emmo* con dos emes "
          "(*parleremmo*), frente al futuro *parleremo* con una. Un solo "
          "carácter separa «hablaríamos» de «hablaremos»."},

 {"h": "Cortesía y deseo",
  "ex": [["Vorrei un caffè, per favore.", "Quisiera un café, por favor."],
         ["Potresti aiutarmi?", "¿Podrías ayudarme?"],
         ["Mi piacerebbe andare in Italia.", "Me gustaría ir a Italia."],
         ["Dovresti riposare.", "Deberías descansar."],
         ["Saprebbe dirmi dov'è la stazione?", "¿Sabría decirme dónde está la estación?"]],
  "tip": "*Vorrei* es la forma educada por defecto para pedir cualquier cosa en "
         "un bar, un negocio o una oficina. *Voglio un caffè* suena a orden."},

 {"h": "La noticia no confirmada",
  "p": ["Los diarios y los noticieros italianos usan el condicional para "
        "informaciones no verificadas. El castellano hace lo mismo, pero el "
        "italiano lo aplica de forma casi sistemática."],
  "ex": [["Secondo fonti vicine al governo, il ministro si dimetterebbe.",
          "Según fuentes cercanas al gobierno, el ministro renunciaría."],
         ["Ci sarebbero venti feriti.", "Habría veinte heridos."]]},

 {"h": "La regla de oro que llega ahora",
  "warn": "Detrás de *se* hipotético NUNCA va condicional. Ni en italiano ni en "
          "castellano correcto. *Se avessi tempo, verrei* — nunca «se "
          "avrei tempo». La estructura completa se trabaja en la semana 32, "
          "pero conviene grabarla desde ya, porque en el italiano hablado "
          "regional se oye el error y contagia."},
]},

22: {
"intro": "Comparar es fácil hasta que aparece la elección entre *di* y *che*, "
         "que no tiene equivalente en castellano —nosotros decimos casi siempre "
         "«que»— y que es una pregunta fija de todos los exámenes.",
"blocks": [
 {"h": "di o che",
  "p": ["*di* cuando se comparan dos elementos distintos respecto de UNA misma "
        "cualidad: sustantivo contra sustantivo, pronombre contra pronombre. "
        "*che* cuando se comparan dos cualidades, dos verbos, dos "
        "cantidades, o cuando el segundo término lleva preposición."],
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
         ["Studiare è meno noioso che lavorare.", "Estudiar es menos aburrido que trabajar."]]},

 {"h": "Igualdad",
  "p": ["*(così)... come* o *(tanto)... quanto*, y las dos primeras palabras "
        "suelen omitirse: *Marco è alto come Luca* = *Marco è tanto alto quanto "
        "Luca*. Con sustantivos, *tanto... quanto* concuerda: *Ho tanti libri "
        "quanti quaderni*."]},

 {"h": "Superlativo relativo y absoluto",
  "p": ["Relativo: artículo + *più/meno* + adjetivo + *di*. *Il ragazzo più "
        "alto della classe*. Fijate que el italiano NO repite el artículo "
        "delante de *più* si ya está delante del sustantivo. "
        "Absoluto: *-issimo* o *molto* + adjetivo. *bellissimo*, *molto bello*."],
  "ex": [["È la città più bella d'Italia.", "Es la ciudad más linda de Italia."],
         ["Sono stanchissimo.", "Estoy cansadísimo."],
         ["È il migliore amico che ho.", "Es el mejor amigo que tengo."]],
  "tip": "Detrás de un superlativo relativo, el italiano culto pide "
         "congiuntivo: *è la cosa più bella che io abbia mai visto*. Lo vas a "
         "ver en la temporada 3."},

 {"h": "Las formas irregulares",
  "table": {"head": ["Adjetivo", "Comparativo", "Superlativo rel.", "Superl. abs."],
            "rows": [["buono", "migliore", "il migliore", "ottimo"],
                     ["cattivo", "peggiore", "il peggiore", "pessimo"],
                     ["grande", "maggiore", "il maggiore", "massimo"],
                     ["piccolo", "minore", "il minore", "minimo"],
                     ["bene (adv.)", "meglio", "—", "benissimo"],
                     ["male (adv.)", "peggio", "—", "malissimo"]]},
  "warn": "*migliore* es adjetivo («mejor libro» = *libro migliore*), *meglio* "
          "es adverbio («canta mejor» = *canta meglio*). Confundirlos es el "
          "equivalente de decir «canta mejor libro»."},
]},

23: {
"intro": "En italiano la doble negación no solo es correcta: es obligatoria. "
         "El castellano funciona igual, así que esta parte es regalada; lo que "
         "sí conviene ordenar es el inventario completo y la posición.",
"blocks": [
 {"h": "El esquema non ... X",
  "p": ["Si la palabra negativa va DESPUÉS del verbo, hace falta *non* delante. "
        "Si va ANTES del verbo, *non* desaparece. Idéntico al castellano."],
  "ex": [["Non ho visto nessuno.", "No vi a nadie."],
         ["Nessuno mi ha visto.", "Nadie me vio."],
         ["Non c'è niente da fare.", "No hay nada que hacer."],
         ["Non vado mai al cinema.", "Nunca voy al cine."],
         ["Non lavoro più qui.", "Ya no trabajo acá."],
         ["Non ho ancora finito.", "Todavía no terminé."],
         ["Non ho né tempo né voglia.", "No tengo ni tiempo ni ganas."],
         ["Non mi piace neanche un po'.", "No me gusta ni un poco."]]},

 {"h": "El inventario",
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
  "warn": "*Non ho che dieci euro* significa «solo tengo diez euros», no «no "
          "tengo diez euros». Es una construcción culta muy frecuente en textos "
          "y una trampa clásica de comprensión lectora."},

 {"h": "mica, la negación coloquial",
  "p": ["Refuerza la negación en el habla cotidiana: *Non è mica facile!* "
        "(¡No es nada fácil!). También aparece en preguntas: *Non avresti "
        "mica una penna?* (¿No tendrías por casualidad una lapicera?). Se "
        "entiende siempre, se escribe casi nunca."]},

 {"h": "Exclamaciones",
  "p": ["*Che* + sustantivo o adjetivo: *Che bello!*, *Che peccato!*, "
        "*Che sciocchezza!*. *Come* + verbo: *Come sei elegante!*. "
        "*Quanto* + verbo: *Quanto mi manchi!*. Y las que hay que saber sí o "
        "sí: *Magari!* (¡ojalá!), *Figurati!* (¡para nada, no es molestia!), "
        "*Dai!* (¡dale!), *Boh!* (ni idea), *Beato te!* (¡dichoso vos!)."],
  "tip": "*Che bello!* no lleva artículo, igual que «¡qué lindo!». Y con "
         "sustantivo tampoco: *Che bella giornata!* (¡qué lindo día!). Nunca "
         "«che una bella giornata»."},
]},

24: {
"intro": "La alteración es un recurso que el italiano usa muchísimo más que el "
         "castellano: no es solo hacer las cosas más chicas, es cargar la "
         "palabra de afecto, de desprecio o de ironía sin añadir un adjetivo. "
         "Un hablante que no altera suena traducido.",
"blocks": [
 {"h": "Los cuatro grupos",
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
  "warn": "*-one* suele convertir en masculino un sustantivo femenino: "
          "*la porta → il portone*, *la donna → il donnone*. Y no todo lo que "
          "termina así es alterado: *il tacchino* (el pavo) no es un *tacco* "
          "pequeño, ni *il mattone* (el ladrillo) un *matto* grande. Estos son "
          "los llamados falsos alterados: *burrone*, *bottone*, *montone*, "
          "*focaccia*, *postino*."},

 {"h": "Se aplica a casi todo",
  "ex": [["un caffettino", "un cafecito"],
         ["due paroline", "dos palabritas"],
         ["fra un attimino", "en un segundito"],
         ["che freddino!", "¡qué fresquito!"],
         ["ha una macchinona", "tiene un autazo"],
         ["che giornataccia!", "¡qué día de porquería!"]],
  "p": ["También funciona con adjetivos (*carino*, *bellino*, *piccolino*) y "
        "hasta con adverbios (*benino*, *pianino*, *presto → prestino*)."]},

 {"h": "Prefijos que multiplican el vocabulario",
  "table": {"head": ["Prefijo", "Sentido", "Ejemplo"],
            "rows": [["ri-", "de nuevo", "rifare, rivedere, ripetere"],
                     ["s-", "negación o intensificación",
                      "scontento, sfortuna, sbagliare"],
                     ["in- / im- / dis-", "negación",
                      "incapace, impossibile, disonesto"],
                     ["stra- / super- / iper-", "exceso",
                      "strapieno, superaffollato"],
                     ["mal-", "mal", "maleducato, malinteso"]]},
  "tip": "*ri-* es productivísimo: casi cualquier verbo lo admite. *Te lo "
         "rispiego* (te lo vuelvo a explicar), *ci risentiamo* (nos volvemos a "
         "hablar). Usarlo ahorra perífrasis y suena natural."},
]},

25: {
"intro": "Cantidades, medidas y precisión numérica: el terreno donde se nota si "
         "manejás el idioma o lo estás traduciendo. Son estructuras cortas y "
         "muy frecuentes, ideales para memorizar en bloque.",
"blocks": [
 {"h": "Cantidades aproximadas",
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
  "warn": "Todas piden *di* delante del sustantivo: *una decina DI amici*, "
          "*migliaia DI persone*. Y *centinaio/migliaio* tienen plural "
          "femenino irregular en *-a*: *le centinaia*, *le migliaia*."},

 {"h": "Fracciones y porcentajes",
  "p": ["*la metà* (la mitad), *un terzo*, *un quarto*, *tre quarti*, "
        "*due terzi*. El porcentaje lleva artículo masculino: *il 20% degli "
        "italiani*. Y el verbo suele concordar con el sustantivo que sigue: "
        "*il 30% degli studenti sono stranieri*."],
  "ex": [["Ho letto metà del libro.", "Leí la mitad del libro."],
         ["Un quarto d'ora.", "Un cuarto de hora."],
         ["Il doppio / il triplo.", "El doble / el triple."]]},

 {"h": "Pesos, medidas y compra",
  "ex": [["Un chilo di mele, per favore.", "Un kilo de manzanas."],
         ["Due etti di prosciutto.", "Doscientos gramos de jamón."],
         ["Mezzo litro di latte.", "Medio litro de leche."],
         ["Una bottiglia d'acqua.", "Una botella de agua."],
         ["Quanto viene? / Quant'è?", "¿Cuánto es?"],
         ["Costa dieci euro al chilo.", "Cuesta diez euros el kilo."]],
  "tip": "*L'etto* (100 g) es la unidad de mostrador en Italia: nadie pide "
         "«200 gramos», se piden *due etti*. Y *al chilo*, *al litro*, "
         "*al giorno*, *all'ora* usan *a* + artículo donde el castellano dice "
         "«por» o «el»."},

 {"h": "Operaciones y expresiones numéricas",
  "p": ["*più* (+), *meno* (−), *per* (×), *diviso* (÷), *fa* o *uguale* (=). "
        "*Due più due fa quattro.* Los decimales van con COMA: *3,5* se lee "
        "*tre virgola cinque*. Los miles van con punto: *1.000*."]},
]},

26: {
"intro": "Jefe de la segunda estación. No hay teoría nueva: esta es la hoja "
         "que resume todo el sistema de pasados y futuros, que es lo que el "
         "examen va a atacar.",
"blocks": [
 {"h": "El mapa de los tiempos que ya tenés",
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

 {"h": "Auxiliar: la decisión de cada frase",
  "p": ["*essere* si el verbo es de movimiento, de cambio de estado, "
        "reflexivo, pronominal, impersonal, o pertenece a la familia de "
        "*piacere*. Con *essere*, el participio concuerda con el sujeto. "
        "*avere* en todo lo demás, y ahí el participio solo concuerda si hay un "
        "pronombre directo de tercera persona delante."]},

 {"h": "Las raíces irregulares de futuro y condicional",
  "p": ["*sar-* (essere), *avr-* (avere), *andr-* (andare), *potr-* (potere), "
        "*vorr-* (volere), *verr-* (venire), *dovr-* (dovere), *sapr-* "
        "(sapere), *vedr-* (vedere), *rimarr-* (rimanere), *terr-* (tenere), "
        "*berr-* (bere), *far-* (fare). Una raíz, dos tiempos."]},

 {"h": "Repaso de las trampas acumuladas",
  "warn": "1. *mi sono lavato*, jamás «mi ho lavato». "
          "2. *parleremo* (futuro) contra *parleremmo* (condicional). "
          "3. *migliore* adjetivo, *meglio* adverbio. "
          "4. *più alto DI Luca*, pero *più simpatico CHE bello*. "
          "5. *qualche* + singular. "
          "6. *Dopo AVER mangiato*, no «dopo mangiare». "
          "7. Detrás de *se* hipotético nunca va condicional."},
]},

}
