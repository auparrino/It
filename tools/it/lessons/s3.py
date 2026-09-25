# -*- coding: utf-8 -*-
"""Stagione 3 — La Corrente (settimane 27-39, B1 → B2)."""

LESSONS = {

27: {
"intro": "Los adverbios italianos se forman casi igual que en castellano. "
         "Esta semana practicás cómo se forman y, sobre todo, dónde van "
         "dentro de la frase.",
"blocks": [
 {"h": "Formación en -mente",
  "q": [{"prompt": "Formá el adverbio.", "stem": "facile → ___", "answer": "facilmente", "options": ["facilmente", "facilemente", "facilamente"]}, {"prompt": "Formá el adverbio.", "stem": "lento → ___", "answer": "lentamente", "options": ["lentamente", "lentomente", "lentemente"]}],
  "r": "Femenino singular del adjetivo + *-mente*: *lento → lentamente*. Si "
       "termina en *-e*, se agrega directo: *veloce → velocemente*.",
  "ex": [["Guida *lentamente*, per favore.", "Manejá despacio, por favor."],
         ["È un film *veramente* bello.", "Es una película realmente linda."],
         ["L'ho trovato *facilmente*.", "Lo encontré fácilmente."],
         ["Te lo spiego *semplicemente*.", "Te lo explico de forma simple."]],
  "warn": "Vocal + *-le* o *-re* pierde la *e*: *facile → facilmente*, "
          "*normale → normalmente*, *regolare → regolarmente*. «facilemente» "
          "es falta segura."},

 {"h": "Los que no llevan -mente",
  "q": [{"prompt": "¿Cuál está bien? «Lo hace bien.»", "answer": "Lo fa bene.", "options": ["Lo fa bene.", "Lo fa buonamente.", "Lo fa buono."]}, {"prompt": "¿Cuál está bien? «Voy con gusto.»", "answer": "Vengo volentieri.", "options": ["Vengo volentieri.", "Vengo volentieramente.", "Vengo volentiero."]}, {"prompt": "¿Cuál está bien? «Llega siempre tarde.»", "answer": "Arriva sempre tardi.", "options": ["Arriva sempre tardi.", "Arriva sempre tarde.", "Arriva sempre tardamente."]}],
  "r": "Los más usados son formas propias: *bene, male, presto, tardi, "
       "spesso, sempre, subito, insieme, volentieri*.",
  "ex": [["Arrivo *subito*.", "Llego enseguida."],
         ["Vengo *volentieri*.", "Voy con gusto."],
         ["Parla *piano*!", "¡Hablá despacio!"],
         ["Ci vediamo *presto*.", "Nos vemos pronto."]],
  "more": ["Otros de la misma familia: *meglio*, *peggio*, *mai*, *già*, "
           "*ancora*, *piano* (despacio, bajito), *forte* (fuerte, rápido)."]},

 {"h": "Adjetivo o adverbio",
  "r": "El adjetivo acompaña al sustantivo (*un buon libro*); el adverbio, "
       "al verbo (*scrive bene*). Se dice *sto bene*, nunca «sto buono».",
  "ex": [["Questo vino è *buono*.", "Este vino es bueno."],
         ["Oggi sto *bene*.", "Hoy estoy bien."],
         ["È un *buon* libro, scritto *bene*.", "Es un buen libro, bien escrito."],
         ["Il caffè è *cattivo*: l'hanno fatto *male*.", "El café está feo: lo hicieron mal."]],
  "warn": "El castellano distingue igual «bueno / bien», pero hablando "
          "rápido se mezcla. En italiano el error se nota enseguida."},

 {"h": "Dónde se coloca",
  "r": "Va después del verbo: *parla lentamente*. En la negación, *non* va "
       "delante y *mai*, *più* o *ancora*, detrás.",
  "ex": [["Parla *lentamente*.", "Habla despacio."],
         ["Mangio *sempre* qui.", "Siempre como acá."],
         ["*Non* mangio *mai* carne.", "Nunca como carne."],
         ["*Non* sono *ancora* pronto.", "Todavía no estoy listo."]],
  "tip": "En los tiempos compuestos, los cortos (*già, mai, ancora, sempre*) "
         "van entre auxiliar y participio: *ho già mangiato*; los largos, "
         "después: *ho parlato chiaramente*."},

 {"h": "Adverbios con dos sentidos",
  "r": "Ojo con *ancora* (todavía, otra vez), *mai* (nunca, alguna vez) y "
       "*più* (más, ya no): deciden el contexto y el *non*.",
  "ex": [["Non è *ancora* arrivato.", "Todavía no llegó."],
         ["Me lo ripeti *ancora*?", "¿Me lo repetís otra vez?"],
         ["Sei *mai* stato a Roma?", "¿Estuviste alguna vez en Roma?"],
         ["Non fumo *più*.", "Ya no fumo."]],
  "table": {"head": ["Italiano", "Castellano", "Ojo con"],
            "rows": [["ancora", "todavía / otra vez", "non ancora = todavía no"],
                     ["già", "ya", "en preguntas: ¿ya?"],
                     ["mai", "nunca / alguna vez", "Vai mai a teatro? = ¿vas alguna vez?"],
                     ["più", "más / ya no", "non... più = ya no"],
                     ["qui / qua", "acá", "prácticamente iguales"],
                     ["lì / là", "allá", "íd."],
                     ["magari", "ojalá / quizás", "no tiene traducción única"],
                     ["addirittura", "incluso / nada menos que", "muy frecuente"]]}},
]},

28: {
"intro": "Los conectivos convierten una lista de oraciones en un texto: son "
         "la diferencia visible entre un A2 y un B1. Esta semana aprendés a "
         "sumar, oponer, explicar causas y ordenar.",
"parts": [
 {"h": "Sumar, oponer, causa y tiempo", "blocks": [0, 1, 2],
  "match": r"^(?!.*(subordinante|condición|congiuntivo|concesivo|intrusa)).*(conjunción|conector|Contrastar|equivalente)"},
 {"h": "Ordenar un argumento; conectores con congiuntivo", "blocks": [3, 4],
  "match": r"subordinante|condición|concesivo|intrusa"},
],
"blocks": [
 {"h": "Sumar, oponer, corregir",
  "r": "*e* suma, *ma* opone, *invece* contrasta. Ante otra *e*, *e* se "
       "vuelve *ed*: *Anna ed Elena*.",
  "ex": [["Anna *ed* Elena arrivano domani.", "Anna y Elena llegan mañana."],
         ["Mi piace, *ma* costa troppo.", "Me gusta, pero sale demasiado."],
         ["Io resto, lui *invece* parte.", "Yo me quedo; él, en cambio, se va."],
         ["Non è brutto, *anzi*: è bellissimo!", "No es feo; al contrario: ¡es hermosísimo!"]],
  "table": {"head": ["Conector", "Sentido", "Ejemplo"],
            "rows": [["e / ed", "y (ed ante e)", "Anna ed Elena"],
                     ["anche", "también", "Viene anche lui."],
                     ["inoltre", "además", "Inoltre, costa poco."],
                     ["ma", "pero", "Mi piace, ma costa troppo."],
                     ["però", "sin embargo", "Non posso, però ci provo."],
                     ["invece", "en cambio", "Io resto, lui invece parte."],
                     ["anzi", "es más / al contrario", "Non è brutto, anzi!"],
                     ["mentre", "mientras / en cambio", "Mentre tu dormi, io lavoro."],
                     ["tuttavia", "no obstante (formal)", "Tuttavia, il risultato è buono."]]},
  "warn": "*anzi* corrige hacia arriba lo que acabás de decir: *Non mi "
          "dispiace, anzi mi piace molto.* No tiene calco castellano; usado "
          "bien, suena nativo."},

 {"h": "Causa y consecuencia",
  "r": "*perché* = porque. *siccome* (como) va **siempre al principio**. "
       "*quindi, dunque, perciò* = por lo tanto.",
  "table": {"head": ["Conector", "Sentido", "Nota"],
            "rows": [["perché", "porque", "el más común"],
                     ["poiché / siccome", "como / puesto que", "siccome va siempre al principio"],
                     ["dato che / visto che", "dado que", "coloquial y frecuente"],
                     ["quindi / dunque / perciò", "por lo tanto", "los tres equivalen"],
                     ["allora", "entonces", "también muletilla oral"],
                     ["così", "así que", "Piove, così resto a casa."]]},
  "ex": [["Resto a casa *perché* sono stanco.", "Me quedo en casa porque estoy cansado."],
         ["*Siccome* piove, restiamo a casa.", "Como llueve, nos quedamos en casa."],
         ["Non viene, *quindi* cominciamo senza di lui.", "No viene, así que empezamos sin él."]]},

 {"h": "Antes, después, apenas",
  "r": "*prima di* + infinitivo; *dopo* + infinitivo **compuesto**. Y "
       "también: *appena* (apenas), *finché* (hasta que), *poi*, *alla "
       "fine*.",
  "ex": [["*Prima di* uscire, chiudi la finestra.", "Antes de salir, cerrá la ventana."],
         ["*Dopo aver mangiato*, esco.", "Después de comer, salgo."],
         ["*Appena* arrivo, ti chiamo.", "Apenas llegue, te llamo."],
         ["Ti aspetto *finché* non arrivi.", "Te espero hasta que llegues."]],
  "warn": "*dopo* pide infinitivo compuesto: *dopo aver mangiato*, *dopo "
          "essere arrivati*. «dopo mangiare» está mal."},

 {"h": "Ordenar un argumento",
  "r": "Para ordenar ideas: *innanzitutto*, *in primo luogo*, *poi*, "
       "*d'altra parte*, *infine*, *in conclusione*.",
  "ex": [["*Innanzitutto*, grazie a tutti.", "Ante todo, gracias a todos."],
         ["*In primo luogo* è caro; *poi* è lontano.", "En primer lugar, es caro; además, queda lejos."],
         ["*D'altra parte*, costa poco.", "Por otro lado, cuesta poco."],
         ["*Infine*, parliamo dei tempi.", "Por último, hablemos de los plazos."]],
  "more": ["*innanzitutto* = ante todo; *d'altra parte* = por otro lado; "
           "*infine* = por último; *in conclusione* = en conclusión. Y "
           "*intanto* = mientras tanto."]},

 {"h": "Los que piden congiuntivo",
  "r": "*benché, sebbene* (aunque), *affinché* (para que), *purché* (con tal "
       "de que) y *prima che* piden **siempre** congiuntivo.",
  "ex": [["*Benché sia* stanco, esco lo stesso.", "Aunque estoy cansado, salgo igual."],
         ["Te lo dico *perché* tu *capisca*.", "Te lo digo para que entiendas."],
         ["Ti aspetto, *purché* tu *venga* presto.", "Te espero, con tal de que vengas temprano."],
         ["Torniamo *prima che piova*.", "Volvamos antes de que llueva."]],
  "more": ["La lista completa: *benché*, *sebbene*, *nonostante*, *malgrado* "
           "(aunque); *affinché* y *perché* con valor de finalidad (para "
           "que); *a meno che non* (a menos que), *purché*, *a patto che* "
           "(con tal de que); *prima che* (antes de que).",
           "*perché* con indicativo es causal (porque); con congiuntivo, "
           "final (para que)."]},
]},

29: {
"intro": "El congiuntivo passato sirve para opinar hoy sobre algo que ya "
         "pasó. Se aprende en un minuto: es el passato prossimo con el "
         "auxiliar en congiuntivo.",
"blocks": [
 {"h": "La forma",
  "r": "*abbia* o *sia* + participio. Mismo auxiliar que en el passato "
       "prossimo y, con *essere*, participio concordado.",
  "ex": [["Credo che *abbia* già *mangiato*.", "Creo que ya comió."],
         ["Penso che Anna *sia partita* ieri.", "Creo que Anna se fue ayer."],
         ["Spero che *siate arrivati* bene.", "Espero que hayan llegado bien."]],
  "table": {"head": ["", "con avere", "con essere"],
            "rows": [["io", "abbia parlato", "sia andato/a"],
                     ["tu", "abbia parlato", "sia andato/a"],
                     ["lui/lei", "abbia parlato", "sia andato/a"],
                     ["noi", "abbiamo parlato", "siamo andati/e"],
                     ["voi", "abbiate parlato", "siate andati/e"],
                     ["loro", "abbiano parlato", "siano andati/e"]]}},

 {"h": "Cuándo se usa",
  "r": "Principal en presente o futuro y subordinada que **pasó antes**. En "
       "castellano suele ser «haya + participio» o un pretérito.",
  "ex": [["Credo che *sia* già *partito*.", "Creo que ya salió."],
         ["Mi dispiace che tu non *sia venuto*.", "Lamento que no hayas venido."],
         ["Non penso che *abbiano capito*.", "No creo que hayan entendido."],
         ["È strano che non *abbia chiamato*.", "Es raro que no haya llamado."]]},

 {"h": "Presente o passato",
  "r": "Mismo momento o después → **congiuntivo presente**. Antes → "
       "**congiuntivo passato**. Nada más.",
  "ex": [["Credo che *venga* domani.", "Creo que viene mañana."],
         ["Credo che *sia venuto* ieri.", "Creo que vino ayer."],
         ["Spero che *stia* bene.", "Espero que esté bien."],
         ["Spero che *sia stato* bene.", "Espero que la haya pasado bien."]],
  "table": {"head": ["Frase", "Cuándo pasa la acción"],
            "rows": [["Credo che venga.", "ahora o después"],
                     ["Credo che sia venuto.", "antes"],
                     ["Spero che stia bene.", "ahora"],
                     ["Spero che sia stato bene.", "en aquel momento"]]}},

 {"h": "Con concesivas y superlativos",
  "r": "*benché*, *sebbene*, *nonostante* y los superlativos (*il più... "
       "che*) piden congiuntivo; si la acción es anterior, **passato**.",
  "ex": [["*Benché abbia studiato*, non si sente pronto.", "Aunque estudió, no se siente listo."],
         ["*Sebbene abbia dormito* dieci ore, è ancora stanco.", "Aunque durmió diez horas, sigue cansado."],
         ["È la cosa più bella che io *abbia* mai *visto*.", "Es lo más lindo que vi en mi vida."]],
  "warn": "*dopo che* no es concesiva: va con **indicativo**. *Dopo che è "
          "partito...*, nunca «dopo che sia partito»."},
]},

30: {
"intro": "Congiuntivo imperfetto y trapassato: los necesitás después de un "
         "verbo en pasado o en condicional, y para desear lo imposible. Son "
         "sorprendentemente regulares.",
"parts": [
 {"h": "Congiuntivo imperfetto: forma e irregulares", "blocks": [0, 1],
  "match": r"Completá con el imperfecto del subjuntivo|Completá con el congiuntivo imperfetto|formas irregulares"},
 {"h": "Trapassato, cuándo aparecen, «ojalá» y «como si»", "blocks": [2, 3, 4],
  "match": r"trapassato|pluscuamperfecto|si…|Ojalá|magari|come se|Traducí"},
],
"blocks": [
 {"h": "Imperfetto: la forma",
  "r": "Raíz del infinitivo + *-assi*, *-essi*, *-issi*. El único irregular "
       "de verdad es *essere → fossi*.",
  "ex": [["Volevo che tu *parlassi* con lei.", "Quería que hablaras con ella."],
         ["Pensavo che *dormisse*.", "Pensaba que dormía."],
         ["Credevo che *fosse* tardi.", "Creía que era tarde."]],
  "table": {"head": ["", "parlare", "vendere", "dormire", "essere"],
            "rows": [["io", "parlassi", "vendessi", "dormissi", "fossi"],
                     ["tu", "parlassi", "vendessi", "dormissi", "fossi"],
                     ["lui/lei", "parlasse", "vendesse", "dormisse", "fosse"],
                     ["noi", "parlassimo", "vendessimo", "dormissimo", "fossimo"],
                     ["voi", "parlaste", "vendeste", "dormiste", "foste"],
                     ["loro", "parlassero", "vendessero", "dormissero", "fossero"]]},
  "warn": "*noi* termina en *-ssimo* (*parlassimo*), parecido al "
          "superlativo. Y *io* y *tu* son iguales: poné el pronombre si hay "
          "dudas."},

 {"h": "Los pocos irregulares",
  "r": "*fare, dire, bere, tradurre* toman la raíz del imperfetto (*facevo → "
       "facessi*); *dare* y *stare* hacen *dessi*, *stessi*.",
  "ex": [["Volevo che mi *dicessi* la verità.", "Quería que me dijeras la verdad."],
         ["Vorrei che *facessimo* una pausa.", "Me gustaría que hiciéramos una pausa."],
         ["Pensavo che *stessi* male.", "Pensaba que estabas mal."],
         ["Speravo che mi *dessero* una mano.", "Esperaba que me dieran una mano."]],
  "table": {"head": ["Verbo", "io/tu", "lui/lei", "loro"],
            "rows": [["fare", "facessi", "facesse", "facessero"],
                     ["dire", "dicessi", "dicesse", "dicessero"],
                     ["bere", "bevessi", "bevesse", "bevessero"],
                     ["porre", "ponessi", "ponesse", "ponessero"],
                     ["tradurre", "traducessi", "traducesse", "traducessero"],
                     ["dare", "dessi", "desse", "dessero"],
                     ["stare", "stessi", "stesse", "stessero"]]}},

 {"h": "Trapassato del congiuntivo",
  "r": "*avessi* o *fossi* + participio: una acción **anterior** a un verbo "
       "en pasado.",
  "ex": [["Credevo che *fosse partito*.", "Creía que se había ido."],
         ["Pensavo che *aveste* già *mangiato*.", "Pensaba que ya habían comido."],
         ["Magari l'*avessi saputo* prima!", "¡Ojalá lo hubiera sabido antes!"]],
  "tip": "Es el trapassato prossimo pasado a congiuntivo: *avevo → avessi*, "
         "*ero → fossi*.",
  "more": ["También es la forma obligatoria en el *se* de la hipótesis "
           "imposible del pasado (*se l'avessi saputo...*). La frase "
           "completa, con su condicional, la armás en la semana 33."]},

 {"h": "Cuándo aparecen",
  "r": "Principal **en pasado o en condicional**: **imperfetto** si es "
       "simultáneo, **trapassato** si es anterior.",
  "ex": [["Credevo che *venisse*.", "Creía que venía."],
         ["Credevo che *fosse venuto*.", "Creía que había venido."],
         ["Vorrei che tu *venissi*.", "Me gustaría que vinieras."]],
  "table": {"head": ["Principal", "Subordinada", "Ejemplo"],
            "rows": [["presente", "congiuntivo presente", "Credo che venga."],
                     ["presente", "congiuntivo passato", "Credo che sia venuto."],
                     ["pasado", "congiuntivo imperfetto", "Credevo che venisse."],
                     ["pasado", "congiuntivo trapassato", "Credevo che fosse venuto."],
                     ["condicional", "congiuntivo imperfetto", "Vorrei che venisse."]]},
  "tip": "*Vorrei che tu venissi* = «querría que vinieras»: condicional "
         "arriba, imperfetto abajo, igual que en castellano. Este caso te "
         "sale gratis.",
  "more": ["Lo posterior también va en imperfetto después de un condicional "
           "o de un verbo de voluntad: *volevo che venisse* (quería que "
           "viniera). Con verbos de opinión, en cambio, lo posterior va en "
           "condizionale passato: lo ves en la semana 32."]},

 {"h": "Ojalá, como si",
  "r": "*Magari*, *se solo* y *come se* piden congiuntivo imperfetto (o "
       "trapassato), aunque no haya verbo principal.",
  "ex": [["*Magari fosse* vero!", "¡Ojalá fuera cierto!"],
         ["*Se solo avessi* più tempo...", "Si tan solo tuviera más tiempo..."],
         ["Parla *come se fosse* un esperto.", "Habla como si fuera un experto."],
         ["Fa *come se* non *fosse successo* niente.", "Hace como si no hubiera pasado nada."]],
  "warn": "*come se* va **siempre** con imperfetto o trapassato: *come se "
          "fosse*, *come se non fosse successo niente*. Nunca «come se è»."},
]},

31: {
"intro": "El condizionale passato ya apareció en la concordancia. Ahora, sus "
         "tres usos: lo que no pasó, el futuro visto desde el pasado y la "
         "noticia sin confirmar.",
"blocks": [
 {"h": "La forma",
  "r": "*avrei* o *sarei* + participio, con el auxiliar y la concordancia "
       "de siempre: *sarei andata*, *mi sarei alzato*.",
  "ex": [["*Avrei fatto* lo stesso.", "Habría hecho lo mismo."],
         ["Anna *sarebbe venuta* volentieri.", "Anna habría venido con gusto."],
         ["Con te *ci saremmo divertiti*.", "Con vos nos habríamos divertido."]],
  "table": {"head": ["", "con avere", "con essere"],
            "rows": [["io", "avrei fatto", "sarei andato/a"],
                     ["tu", "avresti fatto", "saresti andato/a"],
                     ["lui/lei", "avrebbe fatto", "sarebbe andato/a"],
                     ["noi", "avremmo fatto", "saremmo andati/e"],
                     ["voi", "avreste fatto", "sareste andati/e"],
                     ["loro", "avrebbero fatto", "sarebbero andati/e"]]}},

 {"h": "Uso 1: lo que no pasó",
  "r": "Expresa lo que **habría pasado y no pasó**: deseos frustrados, "
       "reproches, consejos tardíos.",
  "ex": [["*Avrei voluto* aiutarti.", "Habría querido ayudarte."],
         ["*Sarei venuto*, ma non ho potuto.", "Habría venido, pero no pude."],
         ["Al posto tuo, *avrei detto* di no.", "En tu lugar, habría dicho que no."],
         ["*Avresti dovuto* avvisarmi.", "Me tendrías que haber avisado."]],
  "tip": "*Avresti dovuto / potuto / voluto* + infinitivo es la fórmula del "
         "reproche y del arrepentimiento. Muy útil y muy frecuente."},

 {"h": "Uso 2: el futuro en el pasado",
  "r": "«Dijo que vendría» = *ha detto che sarebbe venuto*. Futuro visto "
       "desde el pasado: condicional **compuesto**, nunca simple.",
  "ex": [["Mi ha promesso che *sarebbe tornato*.", "Me prometió que volvería."],
         ["Non sapevo che *avrebbe portato* gli amici.", "No sabía que iba a traer a los amigos."],
         ["Era sicuro che *avremmo vinto*.", "Estaba seguro de que íbamos a ganar."],
         ["Pensavo che ti *sarebbe piaciuto*.", "Pensaba que te iba a gustar."]],
  "warn": "*ha detto che verrebbe* es el calco del castellano y está mal. El "
          "castellano usa el condicional simple; el italiano, el compuesto."},

 {"h": "Uso 3: la noticia sin confirmar",
  "r": "En la prensa, presenta un hecho pasado **no confirmado**, como el "
       "«habría» periodístico del castellano.",
  "ex": [["Il ladro *sarebbe fuggito* in auto.", "El ladrón habría huido en auto."],
         ["Secondo il giornale, *avrebbero* già *firmato*.", "Según el diario, ya habrían firmado."],
         ["Il ministro *si sarebbe dimesso* ieri sera.", "El ministro habría renunciado anoche."]]},
]},

32: {
"intro": "La concordancia de tiempos ordena todo lo anterior con dos "
         "preguntas: ¿en qué tiempo está el principal? ¿La subordinada pasa "
         "antes, a la vez o después?",
"blocks": [
 {"h": "El cuadro con congiuntivo",
  "q": [{"prompt": "Principal en pasado, acción anterior.", "stem": "Credevo che Marco ___ già partito.", "answer": "fosse", "options": ["fosse", "sia", "sarebbe"]}, {"prompt": "Principal en pasado, acción posterior.", "stem": "Credevo che Marco ___ il giorno dopo.", "answer": "sarebbe partito", "options": ["sarebbe partito", "partirà", "parta"]}],
  "r": "Elegí la forma según **el principal** (presente o pasado) y **el "
       "momento** de la subordinada (antes, a la vez, después).",
  "ex": [["Credo che *sia partito* ieri.", "Creo que se fue ayer."],
         ["Credo che *parta* domani.", "Creo que se va mañana."],
         ["Credevo che *fosse partito*.", "Creía que se había ido."],
         ["Credevo che *sarebbe partito* dopo.", "Creía que se iría después."]],
  "table": {"head": ["Principal", "Anterior", "Simultáneo", "Posterior"],
            "rows": [["presente / futuro", "congiuntivo passato", "congiuntivo presente", "congiuntivo presente"],
                     ["pasado", "congiuntivo trapassato", "congiuntivo imperfetto", "condizionale passato"]]}},

 {"h": "Lo posterior en el pasado",
  "r": "«Creía que vendría» = *credevo che sarebbe venuto*: el futuro visto "
       "desde el pasado va en condicional **compuesto**.",
  "ex": [["Ha detto che *sarebbe arrivato* alle otto.", "Dijo que llegaría a las ocho."],
         ["Sapevo che *avresti capito*.", "Sabía que ibas a entender."],
         ["Pensavo che *sarebbe stato* più facile.", "Pensaba que iba a ser más fácil."]],
  "warn": "El castellano usa el condicional simple («vendría»), así que la "
          "traducción literal falla: «credevo che verrebbe» está mal.",
  "more": ["Vale con congiuntivo o sin él. La forma es *avrei* / *sarei* + "
           "participio (*avrebbe capito*, *sarebbe arrivato*); la tabla "
           "completa y sus otros usos los viste en la semana 31."]},

 {"h": "Con indicativo, la misma lógica",
  "q": [{"prompt": "Principal en pasado, acción simultánea.", "stem": "Sapevo che Luca ___ a Milano.", "answer": "abitava", "options": ["abitava", "abita", "abiterà"]}, {"prompt": "Principal en presente, acción posterior.", "stem": "So che domani Luca ___.", "answer": "partirà", "options": ["partirà", "partiva", "sarebbe partito"]}],
  "r": "Sin congiuntivo, igual. Principal en presente: passato prossimo, "
       "presente, futuro. En pasado: trapassato, imperfetto, condizionale "
       "passato.",
  "ex": [["So che *è partito*.", "Sé que se fue."],
         ["So che *partirà* domani.", "Sé que se va mañana."],
         ["Sapevo che *era partito*.", "Sabía que se había ido."],
         ["Sapevo che *sarebbe partito*.", "Sabía que se iba a ir."]],
  "table": {"head": ["Principal", "Anterior", "Simultáneo", "Posterior"],
            "rows": [["presente", "passato prossimo", "presente", "futuro"],
                     ["pasado", "trapassato prossimo", "imperfetto", "condizionale passato"]]}},

 {"h": "Cómo entrenarlo",
  "r": "Antes de escribir el verbo, preguntate: ¿el principal es presente o "
       "pasado? ¿Esto pasa antes, durante o después?",
  "ex": [["Penso che ieri *abbia piovuto*.", "Creo que ayer llovió. (presente + antes)"],
         ["Pensavo che *piovesse*.", "Pensaba que llovía. (pasado + a la vez)"],
         ["Pensavo che *sarebbe piovuto*.", "Pensaba que iba a llover. (pasado + después)"]],
  "tip": "Con esas dos respuestas la forma sale sola. Hacelo en voz alta al "
         "principio: es más rápido que recordar la tabla."},
]},

33: {
"intro": "El período hipotético: tres tipos y una prohibición. Si lo tenés "
         "automatizado, tenés el B2.",
"parts": [
 {"h": "Realidad y posibilidad", "blocks": [0, 1],
  "match": r"indicativo|congiuntivo imperfetto|imperfecto del subjuntivo|irrealtà nel presente|\(realtà\)"},
 {"h": "Irrealidad en el pasado, mixtos y otras formas", "blocks": [2, 3, 4],
  "match": r"trapassato|pluscuamperfecto|misto"},
],
"blocks": [
 {"h": "Los tres tipos",
  "r": "**I** real: indicativo. **II** posible o irreal: congiuntivo "
       "imperfetto + condicional. **III** imposible: congiuntivo trapassato "
       "+ condizionale passato.",
  "ex": [["Se *ho* tempo, ti *chiamo*.", "Si tengo tiempo, te llamo."],
         ["Se *avessi* tempo, ti *chiamerei*.", "Si tuviera tiempo, te llamaría."],
         ["Se *avessi avuto* tempo, ti *avrei chiamato*.", "Si hubiera tenido tiempo, te habría llamado."]],
  "table": {"head": ["Tipo", "Con se...", "La otra parte", "Ejemplo"],
            "rows": [["I — real", "indicativo presente/futuro", "indicativo o imperativo", "Se ho tempo, ti chiamo."],
                     ["II — posible / irreal presente", "congiuntivo imperfetto", "condizionale presente", "Se avessi tempo, ti chiamerei."],
                     ["III — imposible (pasado)", "congiuntivo trapassato", "condizionale passato", "Se avessi avuto tempo, ti avrei chiamato."]]},
  "more": ["El tipo I habla de algo que puede pasar de verdad. El II, de "
           "algo improbable o contrario a los hechos de hoy. El III, de algo "
           "que ya no puede pasar porque el momento pasó."]},

 {"h": "Nunca condicional después de se",
  "r": "Detrás de *se* **nunca** va condicional: congiuntivo con el *se*, "
       "condicional en la otra parte.",
  "ex": [["Se *fossi* ricco, *comprerei* una casa al mare.", "Si fuera rico, me compraría una casa en la playa."],
         ["Se *potessi*, *verrei* subito.", "Si pudiera, iría enseguida."],
         ["Se *fosse venuto*, l'*avremmo visto*.", "Si hubiera venido, lo habríamos visto."]],
  "warn": "Nada de «se avrei», «se sarei» ni «se vorrei». El castellano "
          "correcto también dice «si tuviera», pero el «si tendría» que se "
          "oye por ahí se cuela."},

 {"h": "Los mixtos, los más reales",
  "r": "Se puede cruzar un pasado imposible con una consecuencia presente, o "
       "al revés. Son frecuentísimos en la conversación.",
  "ex": [["Se *avessi studiato*, ora *saresti* laureato.", "Si hubieras estudiado, ahora estarías recibido."],
         ["Se *fossi* più ordinato, non *avresti perso* le chiavi.", "Si fueras más ordenado, no habrías perdido las llaves."],
         ["Se non *fossi* così timido, le *avresti parlato*.", "Si no fueras tan tímido, le habrías hablado."]]},

 {"h": "Otras formas de hipótesis",
  "r": "También piden congiuntivo *a meno che non*, *purché*, *a patto che*, "
       "*nel caso in cui* y *qualora* (formal).",
  "ex": [["Vengo, *a meno che non piova*.", "Voy, a menos que llueva."],
         ["Ti presto la macchina *purché* tu *guidi* piano.", "Te presto el auto con tal de que manejes despacio."],
         ["*Qualora fosse* necessario, mi chiami.", "En caso de que fuera necesario, llámeme."],
         ["*Magari piovesse*!", "¡Ojalá lloviera!"]],
  "tip": "Y para desear, *magari* + congiuntivo imperfetto, como viste en la "
         "semana 30."},

 {"h": "El doble imperfetto coloquial",
  "r": "En el habla se oye *se lo sapevo, non venivo*. Vale en lo oral; por "
       "escrito, la forma completa.",
  "ex": [["Se lo *sapevo*, non *venivo*.", "Si lo sabía, no venía. (oral)"],
         ["Se me lo *dicevi*, ti *aiutavo*.", "Si me lo decías, te ayudaba. (oral)"],
         ["Se l'*avessi saputo*, non *sarei venuto*.", "Si lo hubiera sabido, no habría venido."]],
  "more": ["Son dos imperfetti de indicativo en lugar de trapassato + "
           "condizionale passato. En un examen o en un mail formal, siempre "
           "la versión completa."]},
]},

34: {
"intro": "Los relativos alargan la frase sin romperla. *che* sirve para casi "
         "todo, hasta que aparece una preposición.",
"parts": [
 {"h": "che, cui, il cui", "blocks": [0, 1, 2],
  "match": r"^(?!.*(\bquale\b|lo que|\bchi\b|quello che|il che|refrán|familia)).*\S"},
 {"h": "il quale, chi y «lo que»", "blocks": [3, 4, 5],
  "match": r"quale|lo que|\bchi\b"},
],
"blocks": [
 {"h": "che: sin preposición",
  "q": [{"prompt": "Elegí el relativo", "stem": "Il libro ___ ho letto è bellissimo.", "answer": "che", "options": ["che", "cui", "a che"]}, {"prompt": "Elegí el relativo", "stem": "La ragazza ___ parla è mia sorella.", "answer": "che", "options": ["che", "cui", "di che"]}],
  "r": "*che* es invariable: personas y cosas, sujeto u objeto directo. "
       "**Nunca** lleva preposición delante.",
  "ex": [["Il libro *che* ho letto è bellissimo.", "El libro que leí es hermoso."],
         ["La ragazza *che* parla è mia sorella.", "La chica que habla es mi hermana."],
         ["Il treno *che* prendo parte alle otto.", "El tren que tomo sale a las ocho."]],
  "warn": "El relativo **no se omite nunca**, igual que en castellano: *il "
          "libro che ho letto*, nunca «il libro ho letto»."},

 {"h": "cui: con preposición",
  "r": "Detrás de una preposición va **cui**, también invariable: *in cui*, "
       "*con cui*, *per cui*, *a cui*, *di cui*.",
  "ex": [["La città *in cui* vivo.", "La ciudad en la que vivo."],
         ["Il motivo *per cui* sono venuto.", "El motivo por el que vine."],
         ["La persona *a cui* ho scritto.", "La persona a la que le escribí."],
         ["Il libro *di cui* ti parlavo.", "El libro del que te hablaba."]],
  "tip": "Solo con *a* la preposición se puede omitir: *la persona cui ho "
         "scritto* es correcto y culto. Con las demás, nunca."},

 {"h": "il cui: «cuyo»",
  "r": "*il / la / i / le cui* = «cuyo». El artículo concuerda con **lo "
       "poseído**, no con el poseedor.",
  "ex": [["Lo scrittore *il cui* libro ho letto.", "El escritor cuyo libro leí."],
         ["Una città *le cui* strade sono strette.", "Una ciudad cuyas calles son angostas."],
         ["Il ragazzo *i cui* genitori abitano a Roma.", "El chico cuyos padres viven en Roma."]],
  "more": ["No necesita preposición, aunque puede llevarla según la función: "
           "*la casa nel cui giardino...* (la casa en cuyo jardín...)."]},

 {"h": "il quale: el relativo formal",
  "r": "*il quale* (*la quale, i quali, le quali*) reemplaza a *che* o "
       "*cui*: concuerda, deshace ambigüedades y sube el registro.",
  "ex": [["Ho parlato con la sorella di Marco, *la quale* è medico.", "Hablé con la hermana de Marco, que es médica."],
         ["Il progetto *al quale* lavoro.", "El proyecto en el que trabajo."],
         ["Sono le ragioni *per le quali* ho rinunciato.", "Son las razones por las que renuncié."]],
  "tip": "*il figlio della vicina, che mi saluta sempre*: ¿quién saluda? *il "
         "figlio della vicina, il quale mi saluta sempre*: el hijo, sin "
         "duda."},

 {"h": "chi: sin antecedente",
  "q": [{"prompt": "Elegí el relativo", "stem": "___ cerca trova.", "answer": "Chi", "options": ["Chi", "Che", "Cui"]}, {"prompt": "Elegí el verbo", "stem": "Chi ___ finito può uscire.", "answer": "ha", "options": ["ha", "hanno", "hai"]}],
  "r": "*chi* = «quien, el que», solo para personas y **sin antecedente**. "
       "El verbo va en singular.",
  "ex": [["*Chi* cerca trova.", "El que busca encuentra."],
         ["*Chi* ha finito può uscire.", "El que terminó puede salir."],
         ["*Chi* dorme non piglia pesci.", "Camarón que se duerme se lo lleva la corriente."]]},

 {"h": "«Lo que»: quello che, il che",
  "r": "«Lo que» = *quello che*, *ciò che*, *quel che*; «todo lo que» = "
       "*tutto ciò che*. *il che* retoma **una frase entera**.",
  "ex": [["Non capisco *quello che* dici.", "No entiendo lo que decís."],
         ["Fai *tutto ciò che* vuoi.", "Hacé todo lo que quieras."],
         ["È arrivato tardi, *il che* mi ha infastidito.", "Llegó tarde, lo que me molestó."]]},
]},

35: {
"intro": "La pasiva italiana tiene tres auxiliares —*essere*, *venire*, "
         "*andare*— y cada uno aporta un matiz. Es de lo que más sube el "
         "registro de un texto.",
"blocks": [
 {"h": "essere: la pasiva neutra",
  "r": "*essere* + participio concordado con el sujeto; el agente va con "
       "*da*. Sirve en **cualquier tiempo**.",
  "ex": [["Il libro *è stato scritto* da Calvino.", "El libro fue escrito por Calvino."],
         ["Le lettere *sono state spedite* ieri.", "Las cartas fueron enviadas ayer."],
         ["La casa *sarà venduta*.", "La casa va a ser vendida."]],
  "tip": "*è letto*, *era letto*, *è stato letto*, *sarà letto*, *sarebbe "
         "stato letto*, *che sia letto*: siempre *essere* conjugado + "
         "participio."},

 {"h": "venire: la pasiva de acción",
  "r": "*venire* reemplaza a *essere* **solo en tiempos simples** y subraya "
       "la acción, no el estado.",
  "ex": [["La porta *viene chiusa* alle otto.", "La puerta se cierra a las ocho."],
         ["I documenti *vengono controllati* ogni giorno.", "Los documentos se revisan todos los días."],
         ["Il pranzo *veniva servito* alle due.", "El almuerzo se servía a las dos."]],
  "warn": "*La porta è chiusa* puede ser estado («está cerrada»); *La porta "
          "viene chiusa* solo es acción («se cierra»). Y nunca «è venuta "
          "chiusa».",
  "more": ["Es típica de la prensa, los reglamentos y la administración: "
           "*le domande vengono esaminate entro trenta giorni* (las "
           "solicitudes se examinan dentro de los treinta días)."]},

 {"h": "andare: la pasiva de obligación",
  "r": "*andare* + participio = **debe ser** hecho. Muy usado en "
       "instrucciones, recetas y normas.",
  "ex": [["Il modulo *va compilato* in stampatello.", "El formulario tiene que llenarse en imprenta."],
         ["La pasta *va scolata* al dente.", "La pasta hay que colarla al dente."],
         ["Questi errori *andrebbero corretti*.", "Estos errores deberían corregirse."]],
  "tip": "*va detto*, *va notato*, *va ricordato* son conectores de texto "
         "argumentativo de nivel C1: «hay que decir que», «cabe recordar "
         "que»."},

 {"h": "Cuándo conviene evitarla",
  "q": [{"prompt": "¿Cuál es lo más natural? «Se dice que va a llover.»", "answer": "Si dice che pioverà.", "options": ["Si dice che pioverà.", "È detto che pioverà.", "Viene detto che pioverà."]}],
  "r": "Si el agente no importa, suena mejor el *si* (semana 36) o la "
       "tercera plural impersonal: *dicono che...*",
  "ex": [["*Dicono che* pioverà.", "Dicen que va a llover."],
         ["Mi *hanno rubato* la bici.", "Me robaron la bici."],
         ["*Hanno chiuso* il bar sotto casa.", "Cerraron el bar de abajo de casa."]],
  "more": ["El italiano usa la pasiva menos que el inglés y más que el "
           "castellano hablado. En una charla, *mi hanno rubato la bici* "
           "suena mucho más natural que *la mia bici è stata rubata*."]},
]},

36: {
"intro": "El *si* italiano hace lo mismo que «se vende» o «se vive bien», "
         "con una trampa de concordancia. Y en lo coloquial, *si* reemplaza "
         "a *noi*.",
"blocks": [
 {"h": "Si passivante: concuerda",
  "r": "Con un objeto expresado, el verbo **concuerda con ese objeto**, "
       "singular o plural. Igual que «se venden libros».",
  "ex": [["Qui *si parla* italiano.", "Acá se habla italiano."],
         ["*Si vendono* libri usati.", "Se venden libros usados."],
         ["In questo ristorante *si mangiano* ottimi piatti.", "En este restaurante se comen platos excelentes."]],
  "warn": "«Si vende libri» está mal: *si vendono libri*, *si affittano "
          "camere*, *si cercano collaboratori*. Los carteles reales se "
          "equivocan seguido; el examen no perdona."},

 {"h": "Si impersonale: siempre singular",
  "r": "Sin objeto, o con verbo intransitivo, *si* = «uno, la gente», y el "
       "verbo va en **tercera singular**.",
  "ex": [["In Italia *si mangia* bene.", "En Italia se come bien."],
         ["Non *si può* fumare qui.", "No se puede fumar acá."],
         ["Come *si dice* in italiano?", "¿Cómo se dice en italiano?"],
         ["*Si dice* che sia partito.", "Dicen que se fue."]]},

 {"h": "El adjetivo, en masculino plural",
  "r": "Con el *si* impersonale, el adjetivo va en **masculino plural**, "
       "aunque el verbo esté en singular.",
  "ex": [["Quando si è *stanchi*, si dorme male.", "Cuando uno está cansado, duerme mal."],
         ["Si è sempre *giovani* dentro.", "Uno siempre es joven por dentro."],
         ["Da *piccoli* si è più *felici*.", "De chico uno es más feliz."]],
  "warn": "No tiene paralelo en castellano («uno está cansado», en singular) "
          "y aparece en todos los exámenes B2.",
  "more": ["En los tiempos compuestos el auxiliar es siempre *essere*: *si è "
           "mangiato bene*. Con verbos que ya van con *essere*, el participio "
           "también pasa a plural: *si è arrivati tardi*."]},

 {"h": "Con verbos reflexivos: ci si",
  "r": "No se pueden juntar dos *si*: con un verbo reflexivo, el impersonal "
       "es **ci si**: *ci si diverte*.",
  "ex": [["D'estate *ci si sveglia* presto.", "En verano uno se despierta temprano."],
         ["Con lui non *ci si annoia* mai.", "Con él uno no se aburre nunca."],
         ["A tutto *ci si abitua*.", "Uno se acostumbra a todo."]]},

 {"h": "El si toscano por noi",
  "q": [{"prompt": "En el habla toscana, «andiamo al cinema» es…", "answer": "si va al cinema", "options": ["si va al cinema", "si andiamo al cinema", "si vanno al cinema"]}, {"prompt": "«Allora, si mangia?» quiere decir…", "answer": "Bueno, ¿comemos?", "options": ["Bueno, ¿comemos?", "Bueno, ¿comés?", "Bueno, ¿come él?"]}],
  "r": "En el habla, sobre todo en Toscana, *si* + tercera singular "
       "reemplaza a *noi*: *si va* = *andiamo*.",
  "ex": [["Stasera *si va* al cinema.", "Esta noche vamos al cine."],
         ["Domani *si parte*.", "Mañana salimos."],
         ["Allora, *si mangia*?", "Bueno, ¿comemos?"]],
  "tip": "Es informal pero muy extendido: tenés que entenderlo; usarlo no "
         "hace falta."},
]},

37: {
"intro": "Vas a reconocer sin esfuerzo el passato remoto, el tiempo de la "
         "narración literaria, y a producirlo cuando escribas un relato.",
"blocks": [
 {"h": "Las formas regulares",
  "r": "Cada conjugación tiene sus terminaciones. En *-ere*, tres personas "
       "tienen **dos formas**, y valen las dos.",
  "ex": [["Mario *parlò* a lungo.", "Mario habló un buen rato."],
         ["Quella notte *dormii* poco.", "Esa noche dormí poco."],
         ["*Vendettero* la casa e *partirono*.", "Vendieron la casa y se fueron."]],
  "table": {"head": ["", "parlare", "vendere", "dormire"],
            "rows": [["io", "parlai", "vendei / vendetti", "dormii"],
                     ["tu", "parlasti", "vendesti", "dormisti"],
                     ["lui/lei", "parlò", "vendé / vendette", "dormì"],
                     ["noi", "parlammo", "vendemmo", "dormimmo"],
                     ["voi", "parlaste", "vendeste", "dormiste"],
                     ["loro", "parlarono", "venderono / vendettero", "dormirono"]]},
  "tip": "Ojo al acento: *parlò*, *dormì*. Sin tilde es otra palabra (*parlo* "
         "= hablo)."},

 {"h": "El patrón 1-3-6 de los irregulares",
  "r": "Los irregulares lo son solo en **io, lui/lei y loro**, con la misma "
       "raíz: *-i, -e, -ero*. El resto es regular.",
  "ex": [["Lui *prese* il treno; noi *prendemmo* l'autobus.", "Él tomó el tren; nosotros, el colectivo."],
         ["Mi *scrissero* una lettera lunghissima.", "Me escribieron una carta larguísima."],
         ["Lo *vidi* e gli *dissi* tutto.", "Lo vi y le dije todo."],
         ["Che cosa *facesti* quel giorno?", "¿Qué hiciste ese día?"]],
  "table": {"head": ["Verbo", "io", "tu", "lui", "noi", "voi", "loro"],
            "rows": [["prendere", "presi", "prendesti", "prese", "prendemmo", "prendeste", "presero"],
                     ["scrivere", "scrissi", "scrivesti", "scrisse", "scrivemmo", "scriveste", "scrissero"],
                     ["vedere", "vidi", "vedesti", "vide", "vedemmo", "vedeste", "videro"],
                     ["dire", "dissi", "dicesti", "disse", "dicemmo", "diceste", "dissero"],
                     ["fare", "feci", "facesti", "fece", "facemmo", "faceste", "fecero"],
                     ["venire", "venni", "venisti", "venne", "venimmo", "veniste", "vennero"],
                     ["avere", "ebbi", "avesti", "ebbe", "avemmo", "aveste", "ebbero"]]},
  "tip": "*essere* es el único irregular entero: *fui, fosti, fu, fummo, "
         "foste, furono*. Y *dare*: *diedi / detti*; *stare*: *stetti*."},

 {"h": "Cuándo se usa",
  "r": "Para hechos **cerrados y sin lazo con el presente**: historia y "
       "literatura. Si todavía pesa hoy, passato prossimo.",
  "ex": [["Dante *nacque* a Firenze nel 1265.", "Dante nació en Florencia en 1265."],
         ["La guerra *finì* nel 1945.", "La guerra terminó en 1945."],
         ["Un giorno *arrivò* uno straniero.", "Un día llegó un forastero."],
         ["Stamattina *ho preso* il treno.", "Esta mañana tomé el tren."]],
  "warn": "El norte usa el passato prossimo para todo; Sicilia y Nápoles, el "
          "remoto hasta para lo de esta mañana. En la escritura formal, la "
          "distinción se respeta.",
  "more": ["Ninguna de las dos costumbres regionales es incorrecta al "
           "hablar. Pero en un texto escrito, un hecho histórico va en "
           "passato remoto y lo que todavía pesa en el presente, en passato "
           "prossimo."]},

 {"h": "Trapassato remoto",
  "r": "*ebbi* o *fui* + participio, tras *quando, dopo che, appena*, con la "
       "principal en passato remoto. Alcanza con **reconocerlo**.",
  "ex": [["Appena *ebbe finito*, uscì.", "Apenas terminó, salió."],
         ["Quando *ebbero mangiato*, partirono.", "Cuando terminaron de comer, se fueron."],
         ["Dopo che *fu partito*, tutti tacquero.", "Después de que se fue, todos se callaron."]],
  "more": ["Es literario: en el habla y en la escritura de todos los días se "
           "reemplaza por el trapassato prossimo o por *dopo* + infinitivo "
           "compuesto (*dopo aver finito, uscì*)."]},
]},

38: {
"intro": "Vas a pasar cualquier frase al discurso indirecto, integrando "
         "concordancia de tiempos, condicional compuesto, congiuntivo y "
         "pronombres.",
"blocks": [
 {"h": "Los desplazamientos de tiempo",
  "r": "Si el verbo de decir está **en pasado**, todo baja un escalón.",
  "ex": [["«Sono stanco» → Disse che *era* stanco.", "Dijo que estaba cansado."],
         ["«Ho finito» → Disse che *aveva finito*.", "Dijo que había terminado."],
         ["«Verrò» → Disse che *sarebbe venuto*.", "Dijo que vendría."],
         ["«Vieni!» → Mi disse *di venire*.", "Me dijo que fuera."]],
  "table": {"head": ["Discurso directo", "Discurso indirecto"],
            "rows": [["presente", "imperfetto"],
                     ["passato prossimo / remoto", "trapassato prossimo"],
                     ["imperfetto", "imperfetto (no cambia)"],
                     ["futuro", "condizionale passato"],
                     ["condizionale presente", "condizionale passato"],
                     ["imperativo", "di + infinito"],
                     ["congiuntivo presente", "congiuntivo imperfetto"]]},
  "more": ["El imperativo también puede pasar a *che* + congiuntivo "
           "imperfetto: *mi disse che venissi*. Es más formal que *di "
           "venire*."]},

 {"h": "Personas, lugares y tiempos",
  "r": "También se desplazan **personas, demostrativos, lugar y tiempo**: el "
       "punto de vista ya no es el del que habla.",
  "ex": [["«Vengo qui domani» → Disse che sarebbe andato *lì* *il giorno dopo*.", "Dijo que iría allá al día siguiente."],
         ["«Questo libro è mio» → Disse che *quel* libro era *suo*.", "Dijo que ese libro era suyo."],
         ["«Ieri ero malato» → Disse che *il giorno prima* era malato.", "Dijo que el día anterior estaba enfermo."]],
  "table": {"head": ["Directo", "Indirecto"],
            "rows": [["io, tu", "lui, lei (según el caso)"],
                     ["questo", "quello"],
                     ["qui, qua", "lì, là"],
                     ["ora, adesso", "allora, in quel momento"],
                     ["oggi", "quel giorno"],
                     ["ieri", "il giorno prima"],
                     ["domani", "il giorno dopo"],
                     ["fa (due giorni fa)", "prima (due giorni prima)"],
                     ["venire", "andare"]]}},

 {"h": "Preguntas indirectas",
  "q": [{"prompt": "¿Cuál está bien? «Me preguntó si iba.»", "answer": "Mi chiese se venissi.", "options": ["Mi chiese se venissi.", "Mi chiese se vengo.", "Mi chiese che venissi."]}, {"prompt": "Completá: «No sé si es cierto.»", "stem": "Non so ___ sia vero.", "answer": "se", "options": ["se", "si", "che"]}],
  "r": "Van con *se* o con la palabra interrogativa. Con *chiedere* y los "
       "verbos de duda, el italiano cuidado prefiere **congiuntivo**.",
  "ex": [["«Dove abiti?» → Mi chiese dove *abitassi*.", "Me preguntó dónde vivía."],
         ["«Vieni?» → Mi chiese *se venissi*.", "Me preguntó si iba."],
         ["Non so *se sia* vero.", "No sé si es cierto."]],
  "warn": "Este *se* no es el hipotético: es «si» de pregunta y admite "
          "condicional. *Mi chiedo se sarebbe d'accordo* es perfectamente "
          "correcto."},

 {"h": "Los verbos para reportar",
  "r": "**No repitas *dire***: el C1 se nota en la variedad del verbo que "
       "introduce lo dicho.",
  "ex": [["Ha *ammesso* di aver sbagliato.", "Admitió que se había equivocado."],
         ["Mi *ha suggerito* di riposare.", "Me sugirió que descansara."],
         ["Ha *promesso* che sarebbe tornato presto.", "Prometió que volvería pronto."],
         ["*Ha ribadito* che non era d'accordo.", "Reiteró que no estaba de acuerdo."]],
  "table": {"head": ["Para", "Verbos"],
            "rows": [["afirmar", "affermare, sostenere, dichiarare"],
                     ["agregar o insistir", "aggiungere, precisare, ribadire"],
                     ["reconocer o negar", "ammettere, negare"],
                     ["proponer", "suggerire, proporre"],
                     ["comprometer o amenazar", "promettere, minacciare"],
                     ["quejarse o señalar", "lamentarsi, far notare"]]},
  "warn": "Varios piden congiuntivo: *nega che sia vero*, *ammette che sia "
          "difficile*."},
]},

39: {
"intro": "Jefe de la tercera estación: congiuntivo y concordancia, "
         "hipotéticos, pasiva y *si*, relativos, passato remoto y discurso "
         "indirecto. Esta es tu hoja de repaso.",
"parts": [
 {"h": "Repaso: congiuntivo e hipotético", "blocks": [0, 1],
  "match": r"congiuntivo|subjuntivo|«se»|condicional compuesto|condizionale passato|hipot"},
 {"h": "Repaso: pasiva, si, remoto, discurso indirecto", "blocks": [2, 3, 4],
  "match": r"\S"},
],
"blocks": [
 {"h": "Los cuatro congiuntivos",
  "q": [{"prompt": "Principal en presente, acción anterior.", "stem": "Penso che Anna ___ ieri.", "answer": "sia partita", "options": ["sia partita", "partisse", "fosse partita"]}, {"prompt": "Principal en pasado, acción simultánea.", "stem": "Pensavo che Anna ___ a casa.", "answer": "fosse", "options": ["fosse", "sia", "sarà"]}],
  "r": "Elegí por **el tiempo del principal** y **el momento de la acción**. "
       "Lo posterior a un pasado va en condizionale passato.",
  "ex": [["Credo che Luca *abbia* ragione.", "Creo que Luca tiene razón."],
         ["Credo che *sia* già *uscito*.", "Creo que ya salió."],
         ["Credevo che *fosse* a casa.", "Creía que estaba en casa."],
         ["Credevo che *fosse* già *uscito*.", "Creía que ya había salido."]],
  "table": {"head": ["Tiempo", "Forma", "Cuándo"],
            "rows": [["presente", "che io parli / prenda", "principal presente; a la vez o después"],
                     ["passato", "che io abbia parlato / sia andato", "principal presente; antes"],
                     ["imperfetto", "che io parlassi / prendessi", "principal pasado o condicional; a la vez"],
                     ["trapassato", "che io avessi parlato / fossi andato", "principal pasado; antes"]]}},

 {"h": "El período hipotético",
  "r": "Tres tipos: real, posible, imposible. **Nunca** condicional después "
       "de *se*.",
  "ex": [["Se *ho* tempo, ti *chiamo*.", "Si tengo tiempo, te llamo."],
         ["Se *avessi* tempo, ti *chiamerei*.", "Si tuviera tiempo, te llamaría."],
         ["Se *avessi avuto* tempo, ti *avrei chiamato*.", "Si hubiera tenido tiempo, te habría llamado."]]},

 {"h": "Pasiva y si",
  "r": "Tres auxiliares para la pasiva, dos *si* para lo impersonal. Repasá "
       "qué aporta cada uno.",
  "ex": [["La porta *viene chiusa* alle otto.", "La puerta se cierra a las ocho."],
         ["Il modulo *va compilato*.", "El formulario tiene que llenarse."],
         ["*Si vendono* libri usati.", "Se venden libros usados."],
         ["Quando si è *stanchi*, si dorme male.", "Cuando uno está cansado, duerme mal."]],
  "table": {"head": ["Construcción", "Ejemplo", "Ojo"],
            "rows": [["essere + participio", "Il libro è stato scritto da Calvino.", "cualquier tiempo"],
                     ["venire + participio", "La porta viene chiusa alle otto.", "acción; solo tiempos simples"],
                     ["andare + participio", "Il modulo va compilato.", "= debe ser"],
                     ["si passivante", "Si vendono libri.", "concuerda con el objeto"],
                     ["si impersonale", "Quando si è stanchi...", "verbo singular, adjetivo masc. plural"]]}},

 {"h": "Passato remoto y discurso indirecto",
  "r": "El **passato remoto** narra el pasado cerrado: *fu, ebbe, fece, "
       "disse*. Al reportar, los tiempos **retroceden** un paso.",
  "ex": [["Garibaldi *partì* da Quarto nel 1860.", "Garibaldi partió de Quarto en 1860."],
         ["«Vengo» → Disse che *veniva*.", "Dijo que venía."],
         ["«Verrò» → Disse che *sarebbe venuto*.", "Dijo que vendría."]],
  "table": {"head": ["Dijo", "Se reporta"],
            "rows": [["«Vengo»", "disse che veniva"],
                     ["«Sono venuto»", "disse che era venuto"],
                     ["«Verrò»", "disse che sarebbe venuto"],
                     ["«Vieni!»", "gli disse di venire"]]},
  "tip": "Cambian también *oggi → quel giorno*, *domani → il giorno dopo*, "
         "*qui → lì*."},

 {"h": "Las trampas de la estación",
  "r": "Las faltas que más delatan al hispanohablante. Tapá la columna de la "
       "derecha y corregí vos.",
  "ex": [["Credo che *sia* tardi.", "Creo que es tarde."],
         ["Se *avessi* tempo, verrei.", "Si tuviera tiempo, vendría."],
         ["Ha detto che *sarebbe venuto*.", "Dijo que vendría."],
         ["La città *in cui* vivo.", "La ciudad en la que vivo."]],
  "table": {"head": ["No", "Sí"],
            "rows": [["credo che è tardi", "credo che sia tardi"],
                     ["che lui parla (-are)", "che lui parli"],
                     ["ha detto che verrebbe", "ha detto che sarebbe venuto"],
                     ["se avrei tempo", "se avessi tempo"],
                     ["come se è", "come se fosse"],
                     ["si vende libri", "si vendono libri"],
                     ["quando si è stanco", "quando si è stanchi"],
                     ["mi lo dai?", "me lo dai?"],
                     ["ho tre", "ne ho tre"],
                     ["la città che vivo", "la città in cui vivo"]]}},
]},

}
