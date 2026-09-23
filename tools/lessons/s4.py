# -*- coding: utf-8 -*-
"""Stagione 4 — La Vetta (settimane 40-52, B2 → C1)."""

LESSONS = {

40: {
"intro": "El causativo es la construcción que más rápido delata a un extranjero "
         "cuando falta. *Fare* + infinitivo significa «hacer que alguien haga» "
         "o «mandar a hacer», y el italiano la usa donde el castellano arma una "
         "subordinada entera.",
"blocks": [
 {"h": "fare + infinito",
  "p": ["Un solo bloque: *fare* conjugado + infinitivo, sin nada en el medio. "
        "Los dos verbos funcionan como una unidad."],
  "ex": [["Ho fatto riparare la macchina.", "Mandé a arreglar el auto."],
         ["Mi fai ridere.", "Me hacés reír."],
         ["Il professore ci fa studiare molto.",
          "El profesor nos hace estudiar mucho."],
         ["Fammi sapere.", "Avisame. (literalmente: hacé que yo sepa)"],
         ["Si è fatto tagliare i capelli.", "Se cortó el pelo (fue a la peluquería)."]],
  "tip": "*Farsi* + infinitivo indica que la acción se hizo hacer para uno "
         "mismo: *mi sono fatto fare un vestito*, *si è fatta operare*. Es la "
         "forma normal de decir «me corté el pelo» o «me hice un traje»."},

 {"h": "Quién hace qué: el reparto de los complementos",
  "p": ["Si el infinitivo no tiene objeto propio, el que ejecuta la acción es "
        "objeto DIRECTO. Si el infinitivo ya lleva un objeto directo, el que "
        "ejecuta pasa a INDIRECTO, introducido por *a*."],
  "ex": [["Faccio lavorare Marco. → Lo faccio lavorare.",
          "Hago trabajar a Marco. → Lo hago trabajar."],
         ["Faccio leggere il libro a Marco. → Glielo faccio leggere.",
          "Le hago leer el libro a Marco. → Se lo hago leer."]],
  "warn": "El detalle de examen: los pronombres van SIEMPRE delante de *fare*, "
          "no del infinitivo. *Lo faccio venire*, jamás «faccio venirlo». Solo "
          "cuando *fare* está en imperativo informal, infinitivo o gerundio se "
          "pegan a *fare*: *fallo entrare*, *devo farlo venire*."},

 {"h": "lasciare: permitir en vez de obligar",
  "p": ["Funciona igual que *fare* pero significa «dejar que». Admite además "
        "la construcción con *che* + congiuntivo."],
  "ex": [["Lascia parlare tuo fratello.", "Dejá hablar a tu hermano."],
         ["Non mi lasciano uscire.", "No me dejan salir."],
         ["Lascialo stare.", "Dejalo en paz."],
         ["Lascia che ti spieghi.", "Dejá que te explique."]]},

 {"h": "Expresiones fijas con fare",
  "table": {"head": ["Expresión", "Sentido"],
            "rows": [["far vedere", "mostrar"],
                     ["far sapere", "avisar"],
                     ["far notare", "señalar, hacer notar"],
                     ["far presente", "advertir, poner en conocimiento"],
                     ["farsi capire", "hacerse entender"],
                     ["farsi vivo", "dar señales de vida"],
                     ["far finta di", "hacer de cuenta que"],
                     ["dare da fare", "dar trabajo"],
                     ["farcela", "lograrlo"]]},
  "tip": "*Far vedere* es lo que un italiano dice donde el castellano usa "
         "«mostrar»: *fammi vedere*, no «mostrami» (que existe pero suena "
         "raro en el habla cotidiana)."},
]},

41: {
"intro": "Ver, oír y sentir seguidos de otro verbo admiten tres construcciones "
         "distintas, y cada una enfoca la escena de otra manera. El castellano "
         "casi siempre usa una sola. Elegir bien es puro nivel C1.",
"blocks": [
 {"h": "Las tres opciones",
  "table": {"head": ["Construcción", "Enfoque", "Ejemplo"],
            "rows": [["+ infinitivo", "el hecho completo",
                      "Ho visto Maria uscire."],
                     ["+ che + indicativo", "la circunstancia, con más detalle",
                      "Ho visto che Maria usciva."],
                     ["+ che (relativa)", "la acción en curso, sorprendida",
                      "Ho visto Maria che usciva."]]},
  "p": ["Con *vedere*, *sentire*, *udire*, *guardare*, *ascoltare*, "
        "*osservare*, *notare*. La más frecuente en el habla es la del "
        "infinitivo."]},

 {"h": "Colocación del objeto",
  "ex": [["Ho sentito cantare Maria.", "Oí cantar a María."],
         ["Ho sentito Maria cantare.", "Oí a María cantar."],
         ["L'ho sentita cantare.", "La oí cantar."],
         ["Li ho visti entrare.", "Los vi entrar."]],
  "warn": "El participio concuerda con el pronombre directo, igual que "
          "siempre: *l'ho vista uscire*, *li ho sentiti parlare*. Es un detalle "
          "que los correctores buscan."},

 {"h": "La pasiva de percepción",
  "p": ["Cuando el sujeto es quien recibe la acción, el italiano usa el verbo "
        "de percepción en forma reflexiva + infinitivo: *Si è sentito chiamare* (oyó que lo llamaban), *si è visto "
        "rifiutare la richiesta* (le rechazaron el pedido, y lo vio)."]},

 {"h": "Sentire, un verbo que abarca mucho",
  "table": {"head": ["Uso", "Ejemplo", "Castellano"],
            "rows": [["oír", "Non ti sento.", "No te escucho."],
                     ["sentir físicamente", "Sento freddo.", "Tengo frío."],
                     ["probar / oler", "Senti che buono!", "¡Probá qué rico!"],
                     ["saber por alguien", "Ho sentito che parti.",
                      "Me enteré de que te vas."],
                     ["sentirsi", "Come ti senti?", "¿Cómo te sentís?"],
                     ["sentirsela", "Non me la sento.", "No me animo."]]},
  "tip": "*Ci sentiamo!* es la despedida telefónica estándar: «hablamos». Y "
         "*Senti...* es la muletilla para introducir un tema, como el «mirá» "
         "rioplatense."},
]},

42: {
"intro": "La lista de verbo + preposición es lo que separa al que habla "
         "correcto del que habla bien. No hay regla: hay que memorizarla. Pero "
         "se puede memorizar por grupos, y los grupos son bastante estables.",
"blocks": [
 {"h": "Verbos con a + infinitivo",
  "p": ["*cominciare a*, *iniziare a*, *continuare a*, *riuscire a*, "
        "*provare a*, *imparare a*, *insegnare a*, *aiutare a*, *invitare a*, "
        "*abituarsi a*, *rinunciare a*, *decidersi a*, *mettersi a*, "
        "*sbrigarsi a*, *convincere a*, *costringere a*."],
  "ex": [["Ho cominciato a studiare italiano.", "Empecé a estudiar italiano."],
         ["Non riesco a capire.", "No logro entender."],
         ["Mi sono messo a ridere.", "Me puse a reír."]]},

 {"h": "Verbos con di + infinitivo",
  "p": ["*finire di*, *smettere di*, *cercare di*, *decidere di*, *sperare di*, "
        "*credere di*, *pensare di*, *dimenticare di*, *ricordarsi di*, "
        "*promettere di*, *accettare di*, *rifiutare di*, *avere bisogno di*, "
        "*avere voglia di*, *avere paura di*, *essere contento di*."],
  "ex": [["Ho smesso di fumare.", "Dejé de fumar."],
         ["Cerca di capire.", "Tratá de entender."],
         ["Ho voglia di uscire.", "Tengo ganas de salir."]]},

 {"h": "Verbos sin preposición",
  "p": ["Los modales y los de percepción y voluntad: *volere*, *potere*, "
        "*dovere*, *sapere*, *preferire*, *desiderare*, *osare*, *fare*, "
        "*lasciare*, *vedere*, *sentire*, *piacere*, *bisognare*, y los "
        "impersonales *è meglio*, *basta*, *conviene*."],
  "ex": [["Preferisco restare a casa.", "Prefiero quedarme en casa."],
         ["So nuotare.", "Sé nadar."],
         ["Conviene partire presto.", "Conviene salir temprano."]]},

 {"h": "Los que cambian respecto del castellano",
  "warn": "*pensare A qualcosa* (pensar EN algo) pero *pensare DI fare* (pensar "
          "hacer). *Sognare qualcuno* sin preposición (soñar con alguien). "
          "*Entrare IN casa* (entrar a/en). *Salire SU un treno*. "
          "*Innamorarsi DI* (enamorarse de). *Sposare qualcuno* sin *a*. "
          "*Telefonare A qualcuno* (llamar a alguien, indirecto). "
          "*Cercare qualcosa* sin preposición (buscar algo). "
          "*Aspettare qualcuno* sin *a* (esperar a alguien). "
          "*Chiedere A qualcuno DI fare* (pedirle a alguien que haga). "
          "*Dipendere DA*, *fidarsi DI*, *accorgersi DI*, *occuparsi DI*, "
          "*servire A*, *credere IN/A*."},

 {"h": "Cómo estudiar esto",
  "tip": "No memorices listas: memorizá la frase entera. *Non riesco a "
         "capire*, *ho smesso di fumare*, *mi sono abituato ad alzarmi presto*. "
         "La preposición viaja pegada al verbo dentro de una frase completa, y "
         "así se recupera automáticamente al hablar."},
]},

43: {
"intro": "El infinitivo italiano hace bastante más trabajo que el castellano: "
         "es sustantivo, es orden impersonal, es subordinada completa. "
         "Aprovecharlo acorta las frases y sube el registro.",
"blocks": [
 {"h": "El infinitivo sustantivado",
  "p": ["Con artículo, funciona como un sustantivo masculino: *il mangiare*, "
        "*il bere*, *un continuo andare e venire*, *il dolce far niente*. Es "
        "más frecuente que en castellano y suena literario pero natural."],
  "ex": [["Il camminare fa bene alla salute.", "Caminar hace bien a la salud."],
         ["Con l'andare del tempo.", "Con el paso del tiempo."],
         ["Sul far del giorno.", "Al despuntar el día."]]},

 {"h": "El infinitivo compuesto",
  "p": ["*avere* o *essere* + participio. Obligatorio detrás de *dopo* y muy "
        "frecuente con verbos de opinión referidos al pasado."],
  "ex": [["Dopo aver mangiato, siamo usciti.", "Después de comer, salimos."],
         ["Dopo essere arrivati, ci siamo riposati.",
          "Después de llegar, descansamos."],
         ["Credo di aver capito.", "Creo haber entendido."],
         ["Mi dispiace di essere arrivato tardi.", "Lamento haber llegado tarde."]],
  "warn": "*Dopo* + infinitivo SIMPLE es un error. Siempre *dopo aver...* o "
          "*dopo essere...*. En cambio *prima di* pide infinitivo simple: "
          "*prima di uscire*."},

 {"h": "El infinitivo como imperativo impersonal",
  "p": ["Las instrucciones, recetas, carteles y prospectos usan el infinitivo. "
        "Es la forma neutra de dar una orden a nadie en particular."],
  "ex": [["Non fumare.", "No fumar."],
         ["Spingere / Tirare.", "Empujar / Tirar."],
         ["Cuocere per dieci minuti.", "Cocinar diez minutos."],
         ["Agitare prima dell'uso.", "Agitar antes de usar."]]},

 {"h": "Sustituyendo a una subordinada",
  "p": ["Cuando los dos verbos tienen el mismo sujeto, el italiano prefiere el "
        "infinitivo a la subordinada con *che*, y esto es una marca fuerte de "
        "buen estilo."],
  "ex": [["Penso di partire domani.", "Pienso salir mañana."],
         ["Sono uscito senza salutare.", "Salí sin saludar."],
         ["È troppo tardi per telefonare.", "Es muy tarde para llamar."],
         ["Ho abbastanza tempo per finire.", "Tengo tiempo suficiente para terminar."]],
  "tip": "*per* + infinitivo cubre la finalidad; *senza* + infinitivo la "
         "ausencia; *invece di* + infinitivo la sustitución; *oltre a* + "
         "infinitivo la adición. Cuatro conectores que resuelven medio texto "
         "argumentativo."},
]},

44: {
"intro": "Gerundio y participio comprimen dos frases en una. Son el recurso "
         "estrella de la prosa italiana escrita, y el italiano los usa donde "
         "el castellano pone «como», «cuando», «después de que».",
"blocks": [
 {"h": "El gerundio simple",
  "p": ["*-ando* para *-are*, *-endo* para *-ere* e *-ire*. Irregulares por la "
        "raíz latina de siempre: *facendo*, *dicendo*, *bevendo*, "
        "*traducendo*, *ponendo*."],
  "ex": [["Studiando, si impara.", "Estudiando, se aprende."],
         ["Sbagliando s'impara.", "Errando se aprende."],
         ["Essendo stanco, sono rimasto a casa.",
          "Como estaba cansado, me quedé en casa."],
         ["Pur sapendolo, non ha detto niente.",
          "Aun sabiéndolo, no dijo nada."]],
  "warn": "Regla de hierro: el gerundio italiano exige que el sujeto sea el "
          "MISMO que el de la frase principal. *Uscendo di casa, ho incontrato "
          "Marco* está bien porque el que sale y el que encuentra soy yo. "
          "«Uscendo di casa, ha cominciato a piovere» está mal: la lluvia no "
          "salió de casa."},

 {"h": "El gerundio compuesto",
  "p": ["*avendo* o *essendo* + participio: expresa anterioridad. "
        "*Avendo finito il lavoro, sono uscito.* *Essendo arrivati tardi, "
        "abbiamo perso il treno.* Es de registro escrito y muy elegante."]},

 {"h": "stare + gerundio: el progresivo",
  "p": ["Indica acción en desarrollo en este momento. A diferencia del "
        "castellano, el italiano NO lo usa para el futuro cercano ni para "
        "acciones habituales."],
  "ex": [["Sto mangiando.", "Estoy comiendo."],
         ["Stavo dormendo quando hai chiamato.",
          "Estaba durmiendo cuando llamaste."]],
  "warn": "«Estoy estudiando italiano este año» NO es *sto studiando* sino "
          "*studio italiano quest'anno*. El progresivo italiano es "
          "estrictamente puntual: lo que está pasando ahora mismo."},

 {"h": "El participio pasado absoluto",
  "p": ["Un participio solo, al principio de la frase, con valor temporal o "
        "causal. Concuerda con el sustantivo al que se refiere (en los transitivos, "
        "con el objeto: *letta la lettera*) y es la construcción más culta "
        "de esta semana."],
  "ex": [["Finito il lavoro, siamo usciti.", "Terminado el trabajo, salimos."],
         ["Arrivata la primavera, tutto cambia.",
          "Llegada la primavera, todo cambia."],
         ["Letta la lettera, si mise a piangere.",
          "Leída la carta, se puso a llorar."],
         ["Una volta capito il meccanismo, è facile.",
          "Una vez entendido el mecanismo, es fácil."]]},

 {"h": "El participio presente",
  "p": ["Termina en *-ante* / *-ente* y casi siempre se ha lexicalizado como "
        "adjetivo o sustantivo: *interessante*, *seguente*, *cantante*, "
        "*insegnante*, *dirigente*, *proveniente*. Como verbo activo sobrevive "
        "en registro jurídico: *i cittadini residenti all'estero*."]},
]},

45: {
"intro": "El passato remoto es el tiempo de la narración literaria y del habla "
         "del sur de Italia. En el norte casi no se usa al hablar, pero está en "
         "todos los libros, y un C1 tiene que reconocerlo sin esfuerzo y "
         "producirlo cuando escribe un relato.",
"blocks": [
 {"h": "Las formas regulares",
  "table": {"head": ["", "parlare", "vendere", "dormire"],
            "rows": [["io", "parlai", "vendei / vendetti", "dormii"],
                     ["tu", "parlasti", "vendesti", "dormisti"],
                     ["lui/lei", "parlò", "vendé / vendette", "dormì"],
                     ["noi", "parlammo", "vendemmo", "dormimmo"],
                     ["voi", "parlaste", "vendeste", "dormiste"],
                     ["loro", "parlarono", "venderono / vendettero", "dormirono"]]},
  "p": ["Los verbos en *-ere* tienen dos series posibles en tres personas. Las "
        "dos son correctas; la de *-etti* es algo más común."]},

 {"h": "El patrón 1-3-6 de los irregulares",
  "p": ["Casi todos los irregulares del passato remoto lo son SOLO en tres "
        "personas: *io*, *lui/lei* y *loro*. Las otras tres son regulares. Y "
        "las tres irregulares se construyen sobre la misma raíz: "
        "*-i*, *-e*, *-ero*."],
  "table": {"head": ["Verbo", "io", "tu", "lui", "noi", "voi", "loro"],
            "rows": [["prendere", "presi", "prendesti", "prese", "prendemmo",
                      "prendeste", "presero"],
                     ["scrivere", "scrissi", "scrivesti", "scrisse", "scrivemmo",
                      "scriveste", "scrissero"],
                     ["vedere", "vidi", "vedesti", "vide", "vedemmo", "vedeste",
                      "videro"],
                     ["dire", "dissi", "dicesti", "disse", "dicemmo", "diceste",
                      "dissero"],
                     ["fare", "feci", "facesti", "fece", "facemmo", "faceste",
                      "fecero"],
                     ["venire", "venni", "venisti", "venne", "venimmo", "veniste",
                      "vennero"],
                     ["avere", "ebbi", "avesti", "ebbe", "avemmo", "aveste",
                      "ebbero"]]},
  "tip": "*essere* es el único totalmente irregular: *fui, fosti, fu, fummo, "
         "foste, furono*. Y *dare* y *stare*: *diedi/detti*, *stetti*."},

 {"h": "Cuándo se usa",
  "p": ["Para hechos puntuales y concluidos, sin relación con el presente: la "
        "narración histórica y literaria. El passato prossimo, en cambio, "
        "mantiene el vínculo con el ahora."],
  "ex": [["Dante nacque a Firenze nel 1265.", "Dante nació en Florencia en 1265."],
         ["La guerra finì nel 1945.", "La guerra terminó en 1945."],
         ["Un giorno arrivò uno straniero.", "Un día llegó un forastero."],
         ["Stamattina ho preso il treno.", "Esta mañana tomé el tren."]],
  "warn": "En el norte de Italia se usa el passato prossimo para todo, incluso "
          "para hechos remotos. En Sicilia y Nápoles se usa el passato remoto "
          "incluso para lo de esta mañana. Ninguna de las dos costumbres es "
          "incorrecta, pero en la escritura formal la distinción se respeta."},

 {"h": "Trapassato remoto",
  "p": ["*ebbi* / *fui* + participio. Solo aparece en subordinadas temporales "
        "detrás de *quando*, *dopo che*, *appena*, cuando el verbo principal "
        "está en passato remoto. Es puramente literario: *Appena ebbe finito, "
        "uscì*. Reconocerlo alcanza."]},
]},

46: {
"intro": "Los verbos pronominales idiomáticos son las combinaciones fijas de "
         "verbo + *ci*, *ne*, *la* o dos partículas juntas. No se deducen: "
         "significan otra cosa que el verbo suelto, y son altísima frecuencia "
         "en el italiano real.",
"blocks": [
 {"h": "Los imprescindibles",
  "table": {"head": ["Verbo", "Sentido", "Ejemplo"],
            "rows": [["andarsene", "irse", "Me ne vado, ciao."],
                     ["farcela", "lograrlo, poder con algo", "Non ce la faccio più."],
                     ["avercela con", "estar enojado con", "Ce l'hai con me?"],
                     ["prendersela", "ofenderse", "Non te la prendere."],
                     ["cavarsela", "arreglárselas", "Me la cavo con l'inglese."],
                     ["sentirsela", "animarse a", "Non me la sento di dirglielo."],
                     ["smetterla", "dejar de", "Smettila!"],
                     ["piantarla", "cortarla", "Piantala!"],
                     ["metterci", "tardar", "Ci metto un'ora."],
                     ["volerci", "hacer falta", "Ci vuole pazienza."],
                     ["entrarci", "tener que ver", "Non c'entra niente."],
                     ["starci", "estar de acuerdo, caber", "Ci sto!"]]}},

 {"h": "Cómo se conjugan",
  "p": ["El pronombre reflexivo cambia con la persona, y *la*, *ne* o *ci* se "
        "quedan fijos. En los tiempos compuestos, los que llevan reflexivo van "
        "con *essere* (*me ne sono andato*, *se l'è presa*); *farcela*, "
        "*avercela* y *metterci* conservan *avere* (*ce l'ho fatta*, *ci ho "
        "messo un'ora*). Con las formas en *la* el participio termina en *-a*."],
  "ex": [["Me ne sono andato / Ce ne siamo andati.", "Me fui / Nos fuimos."],
         ["Ce l'ho fatta!", "¡Lo logré!"],
         ["Se l'è presa.", "Se ofendió."],
         ["Non me la sono sentita.", "No me animé."]],
  "warn": "*Ce l'ho fatta* lleva el participio en *-a* porque concuerda con esa "
          "*la* que no se refiere a nada concreto. Lo mismo *se l'è cavata*, "
          "*se l'è presa*. Es un automatismo que hay que fijar."},

 {"h": "avercela y averci",
  "p": ["En el italiano hablado, *avere* casi siempre lleva un *ci* de apoyo "
        "sin significado: *ce l'ho*, *ce n'hai?*, *ci ho fame* (regional). "
        "*Hai una penna? — Sì, ce l'ho.* Sin el *ce* suena antinatural."]},

 {"h": "Otras construcciones fijas de nivel",
  "table": {"head": ["Expresión", "Sentido"],
            "rows": [["stare per + infinito", "estar a punto de"],
                     ["finire per + infinito", "terminar por"],
                     ["essere sul punto di", "estar por"],
                     ["mettersi a", "ponerse a"],
                     ["continuare a", "seguir + gerundio"],
                     ["non fare che + infinito", "no hacer más que"],
                     ["avere un bel + infinito", "por más que (hai un bel dire)"],
                     ["fare a meno di", "prescindir de"]]},
  "tip": "*Sto per uscire* = «estoy por salir». Es la forma normal de expresar "
         "el futuro inminente: *stare* + gerundio NO sirve para eso."},
]},

47: {
"intro": "El discurso indirecto junta todo lo que estudiaste: concordancia de "
         "tiempos, condicional compuesto, congiuntivo, pronombres. Es el examen "
         "integrador natural del C1.",
"blocks": [
 {"h": "Los desplazamientos de tiempo",
  "p": ["Si el verbo de decir está en pasado, todo baja un escalón."],
  "table": {"head": ["Discurso directo", "Discurso indirecto"],
            "rows": [["presente", "imperfetto"],
                     ["passato prossimo / remoto", "trapassato prossimo"],
                     ["imperfetto", "imperfetto (no cambia)"],
                     ["futuro", "condizionale passato"],
                     ["condizionale presente", "condizionale passato"],
                     ["imperativo", "di + infinito (o congiuntivo imperfetto)"],
                     ["congiuntivo presente", "congiuntivo imperfetto"]]},
  "ex": [["«Sono stanco» → Disse che era stanco.", "Dijo que estaba cansado."],
         ["«Ho finito» → Disse che aveva finito.", "Dijo que había terminado."],
         ["«Verrò» → Disse che sarebbe venuto.", "Dijo que vendría."],
         ["«Vieni!» → Mi disse di venire.", "Me dijo que fuera."]]},

 {"h": "Los otros desplazamientos",
  "table": {"head": ["Directo", "Indirecto"],
            "rows": [["io, tu", "lui, lei (según el caso)"],
                     ["questo", "quello"],
                     ["qui, qua", "lì, là"],
                     ["ora, adesso", "allora, in quel momento"],
                     ["oggi", "quel giorno"],
                     ["ieri", "il giorno prima"],
                     ["domani", "il giorno dopo"],
                     ["fa (due giorni fa)", "prima (due giorni prima)"],
                     ["venire", "andare"]]},
  "ex": [["«Vengo qui domani» → Disse che sarebbe andato lì il giorno dopo.",
          "Dijo que iría allá al día siguiente."]]},

 {"h": "Preguntas indirectas",
  "p": ["Se introducen con *se* (si) o con la palabra interrogativa. El italiano "
        "culto suele poner congiuntivo, sobre todo con *chiedere* y con verbos "
        "de duda."],
  "ex": [["«Dove abiti?» → Mi chiese dove abitassi.",
          "Me preguntó dónde vivía."],
         ["«Vieni?» → Mi chiese se venissi.", "Me preguntó si iba."],
         ["Non so se sia vero.", "No sé si es cierto."]],
  "warn": "*Se* del discurso indirecto no es el *se* hipotético: acá "
          "significa «si» de pregunta y admite congiuntivo o indicativo, sin la "
          "prohibición del condicional. *Mi chiedo se sarebbe d'accordo* es "
          "perfectamente correcto."},

 {"h": "Los verbos para reportar",
  "p": ["No repitas *dire*. El C1 se nota en la variedad: *affermare*, "
        "*sostenere*, *dichiarare*, *ammettere*, *negare*, *aggiungere*, "
        "*precisare*, *ribadire*, *suggerire*, *proporre*, *promettere*, "
        "*minacciare*, *lamentarsi*, *far notare*. Ojo: muchos piden "
        "congiuntivo (*negare che sia*, *ammettere che sia*)."]},
]},

48: {
"intro": "El italiano tiene un orden de palabras mucho más flexible que el "
         "castellano y lo usa activamente para marcar el foco. Las "
         "dislocaciones no son un descuido del habla: son la forma normal de "
         "hablar, y aparecen en literatura y periodismo.",
"blocks": [
 {"h": "Dislocación a la izquierda",
  "p": ["El objeto se pone al principio y se retoma con un pronombre. Es la "
        "estructura más frecuente del italiano hablado y muchos manuales ni la "
        "mencionan."],
  "ex": [["Il pane lo compro io.", "El pan lo compro yo."],
         ["A Marco non gli ho detto niente.", "A Marco no le dije nada."],
         ["Di soldi non ne ho.", "Plata no tengo."],
         ["Questo film l'ho già visto.", "Esta película ya la vi."]],
  "tip": "El castellano rioplatense hace exactamente lo mismo («el pan lo "
         "compro yo»), así que esta te sale gratis. Usala: sin ella el "
         "italiano suena a libro de texto."},

 {"h": "Dislocación a la derecha",
  "p": ["El pronombre va primero y el elemento se agrega al final, como "
        "aclaración. Marca oralidad e intimidad."],
  "ex": [["Non ci credo, a queste storie.", "No me las creo, esas historias."],
         ["L'ho vista ieri, Maria.", "La vi ayer, a María."],
         ["Ce l'hai, il biglietto?", "¿Lo tenés, el boleto?"]]},

 {"h": "Frase escindida (è... che)",
  "p": ["Para poner un elemento en foco exclusivo, igual que el castellano «es "
        "X el que...»."],
  "ex": [["È Marco che ha telefonato.", "Fue Marco el que llamó."],
         ["È per questo che sono venuto.", "Es por esto que vine."],
         ["Sono io che ho sbagliato.", "Soy yo el que se equivocó."]]},

 {"h": "Sujeto después del verbo",
  "p": ["Con verbos intransitivos y de acontecimiento, el sujeto va detrás "
        "cuando es información nueva. Es obligatorio con *c'è / ci sono*."],
  "ex": [["È arrivato Marco.", "Llegó Marco."],
         ["Mi ha telefonato tua sorella.", "Me llamó tu hermana."],
         ["C'è un problema.", "Hay un problema."],
         ["Manca il sale.", "Falta la sal."]]},

 {"h": "Anteponer para enfatizar",
  "ex": [["Bello, questo quadro!", "¡Lindo, este cuadro!"],
         ["Stanco sono, non malato.", "Cansado estoy, no enfermo."],
         ["Di lavorare non ha nessuna voglia.", "Ganas de trabajar no tiene ninguna."]],
  "warn": "Estas anteposiciones son marcadas: usalas para enfatizar, no por "
          "defecto. Un texto entero con orden invertido suena artificial."},
]},

49: {
"intro": "Escribir en italiano culto no es escribir difícil: es elegir los "
         "conectores correctos, mantener la cohesión y no repetir. Esta semana "
         "es la caja de herramientas del texto argumentativo del examen C1.",
"blocks": [
 {"h": "Conectores de registro alto",
  "table": {"head": ["Función", "Formas"],
            "rows": [["añadir", "inoltre, per di più, altresì, non solo... ma anche"],
                     ["oponer", "tuttavia, ciononostante, per contro, "
                      "d'altro canto, viceversa"],
                     ["conceder", "certo... tuttavia, se è vero che... è "
                      "altrettanto vero che"],
                     ["causa", "in quanto, poiché, dal momento che, "
                      "in virtù di, a causa di"],
                     ["consecuencia", "di conseguenza, pertanto, ne consegue che, "
                      "sicché"],
                     ["ejemplificar", "ad esempio, in particolare, segnatamente, "
                      "basti pensare a"],
                     ["reformular", "ovvero, vale a dire, in altri termini, "
                      "per meglio dire"],
                     ["concluir", "in conclusione, in definitiva, "
                      "tutto sommato, in ultima analisi"]]},
  "warn": "Varios de estos piden congiuntivo: *nonostante*, *benché*, "
          "*sebbene*, *qualora*, *affinché*, *a condizione che*, *nel caso in "
          "cui*, *prima che*, *senza che*, *a meno che non*. Usar el conector "
          "elegante con el indicativo detrás anula el efecto."},

 {"h": "Las fórmulas impersonales",
  "p": ["Distancian al autor y elevan el texto: *va detto che*, *va rilevato "
        "che*, *si tratta di*, *è opportuno*, *occorre notare*, *risulta "
        "evidente*, *è lecito supporre*, *non si può prescindere da*, "
        "*giova ricordare*."],
  "ex": [["Va detto che il problema è complesso.",
          "Hay que decir que el problema es complejo."],
         ["Si tratta di una questione delicata.", "Se trata de un asunto delicado."],
         ["Occorre precisare che non tutti concordano.",
          "Cabe precisar que no todos coinciden."]]},

 {"h": "Cohesión: no repetir",
  "p": ["El italiano escrito evita repetir el sustantivo. Los recursos son "
        "cuatro: pronombres (*lo, ne, ci*), sinónimos, hiperónimos "
        "(*il fenomeno*, *la questione*, *tale situazione*) y demostrativos "
        "(*ciò*, *tale*, *questi*, *il suddetto*)."],
  "ex": [["Il governo ha approvato la riforma; tale provvedimento entrerà in "
          "vigore a gennaio.",
          "El gobierno aprobó la reforma; dicha medida entrará en vigor en enero."],
         ["Ciò comporta un aumento dei costi.", "Ello implica un aumento de costos."]]},

 {"h": "Estructura del testo argomentativo",
  "tip": "El esquema que esperan los examinadores: (1) *introduzione* que "
         "plantea el tema; (2) *tesi* explícita; (3) dos o tres *argomenti* con "
         "ejemplos; (4) *controargomento* reconocido y refutado —acá es donde "
         "se usan *certo... tuttavia* y el congiuntivo concesivo—; "
         "(5) *conclusione* que retoma la tesis sin repetirla textualmente. "
         "Cuatro párrafos bien conectados valen más que ocho sueltos."},
]},

50: {
"intro": "La última trampa del hispanohablante es la que parece más fácil: el "
         "vocabulario que se parece. Los falsos amigos italiano-castellano son "
         "muchos, y algunos producen malentendidos graves o cómicos.",
"blocks": [
 {"h": "Los clásicos que hay que saber",
  "table": {"head": ["Italiano", "Significa", "No significa"],
            "rows": [["burro", "manteca", "burro (= asino)"],
                     ["salire", "subir", "salir (= uscire)"],
                     ["aceto", "vinagre", "aceite (= olio)"],
                     ["guardare", "mirar", "guardar (= tenere, conservare)"],
                     ["prima", "antes", "prima (= cugina)"],
                     ["largo", "ancho", "largo (= lungo)"],
                     ["esito", "resultado", "éxito (= successo)"],
                     ["imbarazzata", "avergonzada", "embarazada (= incinta)"],
                     ["subire", "padecer", "subir (= salire)"],
                     ["topo", "ratón", "topo (= talpa)"],
                     ["gamba", "pierna", "gamba (= gambero)"],
                     ["caldo", "calor / caliente", "caldo (= brodo)"],
                     ["equipaggio", "tripulación", "equipaje (= bagaglio)"],
                     ["cartone", "cartón / dibujo animado", "cartón de bingo"],
                     ["negozio", "negocio (tienda)", "negocio como trato (= affare)"]]},
  "warn": "*Sono imbarazzata* significa «estoy avergonzada», no «estoy "
          "embarazada». Y *un burro* en el plato es manteca. Estos dos son los "
          "que producen las anécdotas."},

 {"h": "Segunda tanda, más sutil",
  "table": {"head": ["Italiano", "Significa"],
            "rows": [["attendere", "esperar (no atender)"],
                     ["assistere a", "presenciar"],
                     ["pretendere", "exigir (no pretender)"],
                     ["sopportare", "soportar, aguantar"],
                     ["rimanere", "quedarse"],
                     ["tornare", "volver"],
                     ["cercare", "buscar"],
                     ["lasciare", "dejar"],
                     ["ricordare", "recordar y también recordarle a alguien"],
                     ["accostare", "acercar, arrimar"],
                     ["rubare", "robar"],
                     ["salire su", "subirse a"],
                     ["licenziare", "despedir (no licenciar)"],
                     ["fermare", "detener (no firmar = firmare)"],
                     ["andare via", "irse"]]}},

 {"h": "Palabras que el castellano no distingue",
  "p": ["*sapere* (saber un dato) contra *conoscere* (conocer a alguien o un "
        "lugar). *Portare* (llevar y también traer: *portami l'acqua*) contra "
        "*prendere* (tomar, agarrar, ir a buscar). *Andare* (ir) contra *venire* (venir hacia donde está "
        "el que escucha: *vengo da te* = «voy a tu casa»). *Buono* (bueno de "
        "sabor o de carácter) contra *bravo* (hábil, bueno en lo suyo): "
        "*un bravo cuoco*, *un bravo studente*."],
  "warn": "*Vengo* se usa para moverse hacia el interlocutor, aunque en "
          "castellano digamos «voy». *Vieni alla festa? — Sì, vengo.* Decir "
          "«sì, vado» ahí es un error de lógica deíctica."},

 {"h": "Registro: la misma idea, tres niveles",
  "table": {"head": ["Coloquial", "Neutro", "Formal"],
            "rows": [["un sacco di", "molto", "notevolmente"],
                     ["roba", "cose", "elementi, aspetti"],
                     ["mica", "non... affatto", "in alcun modo"],
                     ["beccare", "prendere", "cogliere"],
                     ["fregare", "ingannare", "raggirare"],
                     ["un casino", "molto disordine", "notevole confusione"],
                     ["dai!", "su!", "la prego"]]},
  "tip": "Para el C1 no hace falta hablar solo formal: hace falta ELEGIR. "
         "Reconocer que *un casino* es coloquial y *notevole confusione* es de "
         "informe es exactamente lo que evalúa el examen oral."},
]},

51: {
"intro": "Última semana antes del examen final. No hay teoría nueva: hay un "
         "barrido de todo lo que suele fallar. Leelo como una lista de control y "
         "volvé a las semanas donde algo no te cierre.",
"blocks": [
 {"h": "Lista de control: congiuntivo",
  "p": ["¿Verbo de opinión, duda, deseo, emoción o voluntad? → congiuntivo. "
        "¿Sujetos distintos? → *che* + congiuntivo. ¿Mismo sujeto? → *di* + "
        "infinitivo. ¿Principal en pasado? → imperfetto o trapassato. "
        "¿Conector concesivo o final (*benché*, *affinché*, *nonostante*, "
        "*prima che*, *senza che*, *a meno che non*)? → congiuntivo sí o sí. "
        "¿Superlativo relativo o *l'unico che*? → congiuntivo."]},

 {"h": "Lista de control: tiempos",
  "table": {"head": ["Si querés decir", "Usá"],
            "rows": [["dijo que vendría", "disse che sarebbe venuto"],
                     ["si tuviera, iría", "se avessi, andrei"],
                     ["si hubiera tenido, habría ido", "se avessi avuto, sarei andato"],
                     ["hace dos años que estudio", "studio da due anni"],
                     ["estaba comiendo cuando llamó",
                      "stavo mangiando quando ha chiamato"],
                     ["antes de salir", "prima di uscire"],
                     ["después de salir", "dopo essere uscito"],
                     ["hay que hacerlo", "va fatto / bisogna farlo"]]}},

 {"h": "Lista de control: pronombres",
  "p": ["*me lo, te la, glielo, ce ne, ve li, se ne*: la *i* pasa a *e* y "
        "*gli+lo* se pega. *ne* obligatorio con cantidades. *ci* para lugar y "
        "para *a/in/su*. Participio concuerda con *lo, la, li, le* y con "
        "*essere*. Pronombres delante del verbo conjugado y pegados al "
        "infinitivo, gerundio e imperativo informal."]},

 {"h": "Las quince faltas más caras",
  "warn": "1. *credo che è* → *credo che sia*. "
          "2. *mi ho lavato* → *mi sono lavato*. "
          "3. *se avrei* → *se avessi*. "
          "4. *ha detto che verrebbe* → *sarebbe venuto*. "
          "5. *si vende libri* → *si vendono libri*. "
          "6. *dopo mangiare* → *dopo aver mangiato*. "
          "7. *ho tre* → *ne ho tre*. "
          "8. *vedo a Marco* → *vedo Marco*. "
          "9. *mi libro* → *il mio libro*. "
          "10. *qualche amici* → *qualche amico*. "
          "11. *facilemente* → *facilmente*. "
          "12. *qual'è* → *qual è*. "
          "13. *parleremo* (futuro) usado por *parleremmo* (condicional). "
          "14. *sto studiando quest'anno* → *studio quest'anno*. "
          "15. *puedo* italianizado a «poso» → *posso*, con doble s."},

 {"h": "Cómo llegar al boss",
  "tip": "Hacé una pasada por el gimnasio de verbos con congiuntivo imperfetto "
         "y trapassato, que son las formas que menos se automatizan. Después "
         "repasá esta hoja en voz alta: leer las trampas en voz alta las fija "
         "mejor que releerlas."},
]},

52: {
"intro": "El examen del año. Cuarenta preguntas, todo el programa, sin ayudas. "
         "Esta hoja no enseña nada nuevo: es el mapa completo del italiano que "
         "cubriste en 52 semanas, para mirarlo una vez antes de entrar.",
"blocks": [
 {"h": "El sistema verbal entero",
  "table": {"head": ["Modo", "Tiempos"],
            "rows": [["Indicativo", "presente, imperfetto, passato prossimo, "
                      "trapassato prossimo, passato remoto, trapassato remoto, "
                      "futuro semplice, futuro anteriore"],
                     ["Congiuntivo", "presente, passato, imperfetto, trapassato"],
                     ["Condizionale", "presente, passato"],
                     ["Imperativo", "tu, noi, voi (informal); Lei (= congiuntivo)"],
                     ["Formas no finitas", "infinito, gerundio, participio "
                      "(simples y compuestos)"]]}},

 {"h": "Las cinco reglas que sostienen todo",
  "p": ["1. El auxiliar decide la concordancia: con *essere*, el participio "
        "sigue al sujeto. "
        "2. La subjetividad decide el modo: opinión, deseo, duda y emoción "
        "piden congiuntivo. "
        "3. El tiempo de la principal decide el de la subordinada. "
        "4. Detrás de *se* hipotético va indicativo (realidad) o congiuntivo "
        "(posibilidad e irrealidad), nunca condicional. "
        "5. El futuro visto desde el pasado es condicional COMPUESTO."]},

 {"h": "Lo que separa un B2 de un C1",
  "p": ["No es saber más reglas: es usar los recursos que el B2 evita. "
        "Causativo (*fare fare*), participio absoluto (*finito il lavoro*), "
        "gerundio compuesto (*avendo capito*), dislocaciones (*il pane lo "
        "compro io*), pronominales idiomáticos (*non ce la faccio*), *ne* y "
        "*ci* en todos sus valores, pasiva con *andare* y *venire*, y "
        "conectores de registro alto con el modo correcto detrás."]},

 {"h": "Antes de entrar",
  "tip": "Leé una vez la hoja de la semana 51 con las quince faltas. En el "
         "examen, cuando dudes entre indicativo y congiuntivo detrás de un "
         "verbo de opinión, poné congiuntivo: en italiano acierta casi "
         "siempre. Y cuando dudes entre condicional simple y compuesto en una "
         "frase que mira al futuro desde el pasado, poné el compuesto."},

 {"h": "Después del examen",
  "p": ["El C1 no es un punto de llegada sino el nivel donde el idioma empieza "
        "a devolverte cosas: podés leer a Calvino, a Ferrante y a Buzzati sin "
        "diccionario, seguir un debate en la radio y escribir un texto "
        "argumentativo defendible. El repaso espaciado sigue abierto para "
        "siempre: cinco minutos por día alcanzan para no perder lo ganado. "
        "*In bocca al lupo!*"]},
]},

}
