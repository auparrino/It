# -*- coding: utf-8 -*-
"""Stagione 4 — La Vetta (settimane 40-52, B2 → C1)."""

LESSONS = {

40: {
"intro": "Vas a usar el causativo: *fare* + infinitivo para «hacer que "
         "alguien haga» o «mandar a hacer», donde el castellano arma una "
         "subordinada entera.",
"parts": [
 {"h": "fare + infinito: quién hace qué", "blocks": [0, 1, 2, 3],
  "match": r"^(?!.*(lasciare|Lascia|Consejos|Problemas de viaje|Dejo que)).*\S"},
 {"h": "lasciare y expresiones con fare", "blocks": [4, 5],
  "match": r"lasciare|Lascia|Consejos|Problemas de viaje|Dejo que"},
],
"blocks": [
 {"h": "fare + infinito",
  "r": "*fare* conjugado + infinitivo = hacer que alguien haga, o mandar a "
       "hacer. **Nada en el medio**: van pegados.",
  "ex": [["*Ho fatto riparare* la macchina.", "Mandé a arreglar el auto."],
         ["Mi *fai ridere*.", "Me hacés reír."],
         ["Il professore ci *fa studiare* molto.", "El profesor nos hace estudiar mucho."],
         ["*Fammi sapere*.", "Avisame. (literalmente: hacé que yo sepa)"]],
  "warn": "El objeto va después del infinitivo, nunca entre los dos: *faccio "
          "riparare la macchina*, no «faccio la macchina riparare»."},

 {"h": "farsi + infinito: para uno mismo",
  "r": "*farsi* + infinitivo = hacerse hacer algo por otro. Así se dice «me "
       "corté el pelo» o «me operé».",
  "ex": [["*Si è fatto tagliare* i capelli.", "Se cortó el pelo (en la peluquería)."],
         ["*Mi sono fatto fare* un vestito.", "Me mandé a hacer un traje."],
         ["*Si è fatta operare* al ginocchio.", "Se operó la rodilla."]],
  "warn": "*Mi sono tagliato i capelli* = me corté el pelo yo mismo, con la "
          "tijera. Si fuiste a la peluquería: *mi sono fatto tagliare i "
          "capelli*."},

 {"h": "Quién hace qué",
  "q": [{"prompt": "Reemplazá «il libro» y «a Marco».", "stem": "Faccio leggere il libro a Marco → ___ faccio leggere.", "answer": "Glielo", "options": ["Glielo", "Lo gli", "Gli"]}, {"prompt": "Reemplazá «Marco».", "stem": "Faccio lavorare Marco → ___ faccio lavorare.", "answer": "Lo", "options": ["Lo", "Gli", "Le"]}],
  "r": "Si el infinitivo no tiene objeto, quien ejecuta es **directo** "
       "(*lo*). Si ya tiene uno, quien ejecuta pasa a **indirecto** (*gli*).",
  "ex": [["Faccio lavorare Marco. → *Lo* faccio lavorare.", "Hago trabajar a Marco. → Lo hago trabajar."],
         ["Il film fa ridere i bambini. → *Li* fa ridere.", "La película hace reír a los chicos. → Los hace reír."],
         ["Faccio leggere il libro *a Marco*.", "Le hago leer el libro a Marco."],
         ["*Glielo* faccio leggere.", "Se lo hago leer."]],
  "warn": "Sin objeto no hay *a*: *faccio lavorare Marco*, no «faccio "
          "lavorare a Marco». La *a* aparece solo si el infinitivo ya lleva "
          "objeto."},

 {"h": "Los pronombres van delante de fare",
  "r": "Los pronombres van **delante de *fare***, no del infinitivo: *lo "
       "faccio venire*, jamás «faccio venirlo».",
  "ex": [["*Lo* faccio venire.", "Lo hago venir."],
         ["*Te lo* faccio vedere.", "Te lo muestro."],
         ["*Fallo* entrare.", "Hacelo entrar."],
         ["Devo *farlo* venire.", "Tengo que hacerlo venir."]],
  "warn": "Solo se pegan a *fare* cuando *fare* está en imperativo informal "
          "o infinitivo: *fallo entrare*, *devo farlo venire*."},

 {"h": "lasciare: permitir en vez de obligar",
  "r": "*lasciare* + infinitivo = «dejar que», y se arma igual que *fare*. "
       "También existe *lasciare che* + congiuntivo.",
  "ex": [["*Lascia parlare* tuo fratello.", "Dejá hablar a tu hermano."],
         ["Non mi *lasciano uscire*.", "No me dejan salir."],
         ["*Lascialo stare*.", "Dejalo en paz."],
         ["*Lascia che* ti *spieghi*.", "Dejá que te explique."]],
  "warn": "Igual que con *fare*, sin *a* delante de la persona: *lascia "
          "parlare tuo fratello*, no «lascia parlare a tuo fratello»."},

 {"h": "Expresiones fijas con fare",
  "r": "Estas combinaciones se usan todo el tiempo: aprendelas enteras.",
  "ex": [["*Fammi vedere* la foto.", "Mostrame la foto."],
         ["Ti *faccio sapere* domani.", "Te aviso mañana."],
         ["Non *si fa* più *vivo*.", "Ya no da señales de vida."],
         ["*Fa finta di* niente.", "Se hace el distraído."]],
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
  "tip": "Para «mostrar» un italiano dice *far vedere*: *fammi vedere*. "
         "*Mostrami* existe, pero suena raro en el habla cotidiana."},
]},

41: {
"intro": "Vas a elegir entre tres construcciones después de ver, oír y "
         "sentir, cada una con otro enfoque. El castellano casi siempre usa "
         "una sola.",
"blocks": [
 {"h": "Las tres opciones",
  "r": "Tras *vedere, sentire, guardare, ascoltare*: infinitivo, *che* + "
       "indicativo o relativa con *che*. En el habla gana el **infinitivo**.",
  "ex": [["Ho visto Maria *uscire*.", "Vi a María salir."],
         ["Ho visto *che* Maria *usciva*.", "Vi que María estaba saliendo."],
         ["Ho visto Maria *che usciva*.", "Vi a María que salía."]],
  "table": {"head": ["Construcción", "Enfoque", "Ejemplo"],
            "rows": [["+ infinitivo", "el hecho completo", "Ho visto Maria uscire."],
                     ["+ che + indicativo", "lo que constatás (me di cuenta de que)", "Ho visto che Maria usciva."],
                     ["+ che (relativa)", "la acción en curso, sorprendida", "Ho visto Maria che usciva."]]},
  "warn": "Sin *a* delante de la persona: *ho visto Maria uscire*, no «ho "
          "visto a Maria uscire».",
  "more": ["*udire* (oír) funciona igual, pero es de registro escrito."]},

 {"h": "Dónde va el objeto",
  "r": "El sustantivo puede ir antes o después del infinitivo. El pronombre "
       "va **delante del verbo de percepción**.",
  "ex": [["Ho sentito cantare *Maria*.", "Oí cantar a María."],
         ["Ho sentito *Maria* cantare.", "Oí a María cantar."],
         ["*L'ho sentita* cantare.", "La oí cantar."],
         ["*Li ho visti* entrare.", "Los vi entrar."]],
  "warn": "El participio concuerda con el pronombre directo, como siempre: "
          "*l'ho vista uscire*, *li ho sentiti parlare*. Los correctores lo "
          "buscan."},

 {"h": "La pasiva de percepción",
  "r": "Si la acción recae sobre el sujeto: verbo de percepción "
       "**reflexivo** + infinitivo.",
  "ex": [["*Si è sentito chiamare*.", "Oyó que lo llamaban."],
         ["*Mi sono sentito chiamare* per nome.", "Oí que me llamaban por mi nombre."],
         ["*Si è visto rifiutare* la richiesta.", "Vio cómo le rechazaban el pedido."]]},

 {"h": "sentire, un verbo que abarca mucho",
  "r": "*sentire* cubre oír, sentir, probar y enterarse. Con pronombres "
       "forma *sentirsi* y *sentirsela*.",
  "ex": [["Non ti *sento*.", "No te escucho."],
         ["*Senti* che buono!", "¡Probá qué rico!"],
         ["*Ho sentito* che parti.", "Me enteré de que te vas."],
         ["Come *ti senti*?", "¿Cómo te sentís?"]],
  "table": {"head": ["Uso", "Ejemplo", "Castellano"],
            "rows": [["oír", "Non ti sento.", "No te escucho."],
                     ["sentir físicamente", "Sento freddo.", "Tengo frío."],
                     ["probar / oler", "Senti che buono!", "¡Probá qué rico!"],
                     ["saber por alguien", "Ho sentito che parti.", "Me enteré de que te vas."],
                     ["sentirsi", "Come ti senti?", "¿Cómo te sentís?"],
                     ["sentirsela", "Non me la sento.", "No me animo."]]},
  "tip": "*Ci sentiamo!* = «hablamos» (despedida telefónica). *Senti...* "
         "abre un tema, como el «mirá» rioplatense."},
]},

42: {
"intro": "Vas a usar la preposición correcta entre verbo e infinitivo. No "
         "hay regla: se memoriza, pero por grupos bastante estables.",
"parts": [
 {"h": "Verbos con a y con di + infinitivo", "blocks": [0, 1],
  "match": r"di o a|a \+ infinitivo|pensare|di \+|con di|con a\b|credere y parlare"},
 {"h": "Sin preposición, los que cambian y cómo estudiarlos", "blocks": [2, 3, 4],
  "match": r"sin preposición|verbo indicado|preposición de cada verbo|distinto|Elegí"},
],
"blocks": [
 {"h": "Verbos con a + infinitivo",
  "r": "Empezar, seguir, lograr, aprender, ayudar y empujar a otro llevan "
       "**a** (*ad* ante vocal).",
  "ex": [["Ho *cominciato a* studiare italiano.", "Empecé a estudiar italiano."],
         ["Non *riesco a* capire.", "No logro entender."],
         ["Mi sono *messo a* ridere.", "Me puse a reír."],
         ["Mi ha *convinto a* restare.", "Me convenció de quedarme."]],
  "table": {"head": ["Idea", "Verbos"],
            "rows": [["empezar / seguir", "cominciare a, iniziare a, continuare a, mettersi a"],
                     ["lograr / intentar", "riuscire a, provare a"],
                     ["aprender / enseñar / ayudar", "imparare a, insegnare a, aiutare a"],
                     ["empujar a otro", "invitare a, convincere a, costringere a"],
                     ["actitud", "abituarsi a, rinunciare a, decidersi a, sbrigarsi a"]]},
  "warn": "«Me convenció **de**» y «me obligó **a**»: en italiano los dos "
          "con *a*: *mi ha convinto a restare*."},

 {"h": "Verbos con di + infinitivo",
  "r": "Terminar, dejar, tratar, decidir, pensar, recordar, prometer y las "
       "expresiones con *avere* o *essere* llevan **di**.",
  "ex": [["Ho *smesso di* fumare.", "Dejé de fumar."],
         ["*Cerca di* capire.", "Tratá de entender."],
         ["Ho *deciso di* partire.", "Decidí irme."],
         ["Ho *voglia di* uscire.", "Tengo ganas de salir."]],
  "table": {"head": ["Idea", "Verbos"],
            "rows": [["terminar / dejar", "finire di, smettere di"],
                     ["intentar / decidir", "cercare di, decidere di"],
                     ["pensar / creer / esperar", "pensare di, credere di, sperare di"],
                     ["memoria", "dimenticare di, ricordarsi di"],
                     ["compromiso", "promettere di, accettare di, rifiutare di"],
                     ["expresiones", "avere bisogno di, avere voglia di, avere paura di, essere contento di"]]},
  "warn": "Donde el castellano no pone nada, el italiano pone *di*: «decidí "
          "irme» → *ho deciso di partire*; «espero verte» → *spero di "
          "vederti*."},

 {"h": "Verbos sin preposición",
  "r": "**Sin preposición**: los modales (*volere, potere, dovere, sapere*), "
       "*preferire, desiderare, osare* y *basta, bisogna, conviene, è "
       "meglio*.",
  "ex": [["*Preferisco restare* a casa.", "Prefiero quedarme en casa."],
         ["*So nuotare*.", "Sé nadar."],
         ["*Conviene partire* presto.", "Conviene salir temprano."],
         ["*Mi piace leggere*.", "Me gusta leer."]],
  "tip": "Tampoco llevan preposición *fare*, *lasciare*, los de percepción "
         "(*vedo uscire*) ni *piacere*."},

 {"h": "Los que cambian respecto del castellano",
  "r": "Estos verbos rigen **distinto** que en castellano: con otra "
       "preposición o sin ninguna.",
  "ex": [["*Ho sposato* Laura.", "Me casé con Laura."],
         ["*Aspetto* Marco.", "Espero a Marco."],
         ["*Le telefono* stasera.", "La llamo esta noche."],
         ["*Penso a* te.", "Pienso en vos."]],
  "table": {"head": ["Italiano", "Castellano"],
            "rows": [["pensare a qualcosa / pensare di fare", "pensar en algo / pensar hacer"],
                     ["sognare qualcuno", "soñar con alguien"],
                     ["entrare in casa", "entrar a / en casa"],
                     ["salire su un treno", "subir a un tren"],
                     ["innamorarsi di", "enamorarse de"],
                     ["sposare qualcuno", "casarse con alguien"],
                     ["telefonare a qualcuno", "llamar a alguien (gli telefono)"],
                     ["cercare qualcosa / aspettare qualcuno", "buscar algo / esperar a alguien"],
                     ["chiedere a qualcuno di fare", "pedirle a alguien que haga"],
                     ["dipendere da, fidarsi di, accorgersi di", "depender de, fiarse de, darse cuenta de"],
                     ["occuparsi di, servire a, credere in", "ocuparse de, servir para, creer en"]]},
  "warn": "*Sposare* y *aspettare* van sin *a*: *ho sposato Laura*, *aspetto "
          "Marco*. Y *telefonare* pide indirecto: *le telefono*, nunca «la "
          "telefono»."},

 {"h": "Cómo estudiar esto",
  "r": "No memorices listas: memorizá **la frase entera**, con la "
       "preposición pegada al verbo.",
  "ex": [["Non *riesco a* capire.", "No logro entender."],
         ["Mi sono *abituato ad* alzarmi presto.", "Me acostumbré a levantarme temprano."],
         ["Ho *bisogno di* dormire.", "Necesito dormir."]],
  "tip": "Así la preposición se recupera sola al hablar: sale con la frase."},
]},

43: {
"intro": "Vas a aprovechar el infinitivo como sustantivo, como orden "
         "impersonal y en lugar de una subordinada. Acorta las frases y sube "
         "el registro.",
"blocks": [
 {"h": "El infinitivo sustantivado",
  "r": "Con artículo, el infinitivo funciona como **sustantivo masculino**: "
       "*il mangiare*, *il dolce far niente*.",
  "ex": [["*Il camminare* fa bene alla salute.", "Caminar hace bien a la salud."],
         ["Con *l'andare* del tempo.", "Con el paso del tiempo."],
         ["*Sul far* del giorno.", "Al despuntar el día."],
         ["C'era *un continuo andare e venire*.", "Había un ir y venir constante."]],
  "more": ["Es más frecuente que en castellano y suena literario pero "
           "natural."]},

 {"h": "El infinitivo compuesto",
  "r": "*avere* o *essere* + participio. **Obligatorio después de *dopo***, "
       "y frecuente para hablar de algo ya hecho.",
  "ex": [["*Dopo aver mangiato*, siamo usciti.", "Después de comer, salimos."],
         ["*Dopo essere arrivati*, ci siamo riposati.", "Después de llegar, descansamos."],
         ["Credo di *aver capito*.", "Creo haber entendido."],
         ["Mi dispiace di *essere arrivato* tardi.", "Lamento haber llegado tarde."]],
  "warn": "*Dopo* + infinitivo simple es un error: siempre *dopo aver...* o "
          "*dopo essere...*. En cambio *prima di* pide infinitivo simple: "
          "*prima di uscire*."},

 {"h": "El infinitivo como orden impersonal",
  "r": "Instrucciones, recetas, carteles y prospectos dan la orden **en "
       "infinitivo**, a nadie en particular.",
  "ex": [["*Non fumare*.", "No fumar."],
         ["*Spingere* / *Tirare*.", "Empujar / Tirar."],
         ["*Cuocere* per dieci minuti.", "Cocinar diez minutos."],
         ["*Agitare* prima dell'uso.", "Agitar antes de usar."]],
  "tip": "Dicho a una persona, *non fumare!* es el imperativo negativo de "
         "*tu*; en un cartel, es impersonal. La forma es la misma."},

 {"h": "En lugar de una subordinada",
  "r": "Con **el mismo sujeto** en los dos verbos, usá infinitivo en vez de "
       "*che* + verbo conjugado.",
  "ex": [["Penso *di partire* domani.", "Pienso salir mañana."],
         ["Sono uscito *senza salutare*.", "Salí sin saludar."],
         ["È troppo tardi *per telefonare*.", "Es muy tarde para llamar."],
         ["*Invece di* lamentarti, aiutami.", "En vez de quejarte, ayudame."]],
  "warn": "«Pienso que parto mañana» no se calca: *penso di partire domani*. "
          "*Penso che* va cuando cambia el sujeto.",
  "tip": "Cuatro conectores + infinitivo: *per* (finalidad), *senza* "
         "(ausencia), *invece di* (sustitución), *oltre a* (adición)."},
]},

44: {
"intro": "Vas a comprimir dos frases en una con gerundio y participio, el "
         "recurso estrella de la prosa italiana donde el castellano pone "
         "«como», «cuando» o «después de que».",
"parts": [
 {"h": "El gerundio", "blocks": [0, 1, 2, 3],
  "match": r"^(?!.*(particip|concisa|terminación)).*(gerundio|mientras|Cómo lo hacés|\bstare\b|ando\b|endo\b|Continuo a)"},
 {"h": "Los participios", "blocks": [4, 5],
  "match": r"particip|concisa|terminación"},
],
"blocks": [
 {"h": "El gerundio simple",
  "r": "*-ando* para *-are*, *-endo* para *-ere* e *-ire*. Irregulares por "
       "la raíz latina: *facendo, dicendo, bevendo, traducendo, ponendo*.",
  "ex": [["*Sbagliando* s'impara.", "Equivocándose se aprende."],
         ["*Essendo* stanco, sono rimasto a casa.", "Como estaba cansado, me quedé en casa."],
         ["Ho capito il problema *facendo* un disegno.", "Entendí el problema haciendo un dibujo."],
         ["*Pur sapendolo*, non ha detto niente.", "Aun sabiéndolo, no dijo nada."]],
  "tip": "*pur* + gerundio = «aunque»: *pur sapendolo* = aunque lo sabía."},

 {"h": "El gerundio exige el mismo sujeto",
  "r": "El sujeto del gerundio tiene que ser **el mismo** que el de la frase "
       "principal.",
  "ex": [["*Uscendo* di casa, ho incontrato Marco.", "Al salir de casa, me encontré con Marco."],
         ["*Tornando* a casa, ho visto Luca.", "Volviendo a casa, vi a Luca."],
         ["*Mentre uscivo* di casa, ha cominciato a piovere.", "Cuando salía de casa, empezó a llover."]],
  "warn": "«Uscendo di casa, ha cominciato a piovere» está mal: la lluvia no "
          "salió de casa. Con sujetos distintos, usá *mentre* + verbo "
          "conjugado."},

 {"h": "El gerundio compuesto",
  "r": "*avendo* o *essendo* + participio: expresa **anterioridad**. "
       "Registro escrito y elegante.",
  "ex": [["*Avendo finito* il lavoro, sono uscito.", "Como había terminado el trabajo, salí."],
         ["*Essendo arrivati* tardi, abbiamo perso il treno.", "Como llegamos tarde, perdimos el tren."],
         ["Non *avendo capito*, ho chiesto di nuovo.", "Como no había entendido, pregunté de nuevo."]],
  "tip": "Con *essendo*, el participio concuerda con el sujeto: *essendo "
         "arrivata tardi, Maria...*"},

 {"h": "stare + gerundio: el progresivo",
  "r": "*stare* + gerundio = acción **en desarrollo ahora**. No sirve para "
       "el futuro cercano ni para lo habitual.",
  "ex": [["*Sto mangiando*.", "Estoy comiendo."],
         ["*Stavo dormendo* quando hai chiamato.", "Estaba durmiendo cuando llamaste."],
         ["Che cosa *stai facendo*?", "¿Qué estás haciendo?"]],
  "warn": "Se usa mucho menos que el «estar + -ndo» castellano. «Estoy "
          "estudiando italiano este año» es *studio italiano quest'anno*."},

 {"h": "El participio pasado absoluto",
  "r": "Un participio solo, al principio, = «después de» o «como». "
       "Concuerda con su sustantivo: *letta la lettera*.",
  "ex": [["*Finito* il lavoro, siamo usciti.", "Terminado el trabajo, salimos."],
         ["*Arrivata* la primavera, tutto cambia.", "Llegada la primavera, todo cambia."],
         ["*Letta* la lettera, si è messa a piangere.", "Leída la carta, se puso a llorar."],
         ["Una volta *capito* il meccanismo, è facile.", "Una vez entendido el mecanismo, es fácil."]],
  "tip": "Es la construcción más culta de la semana: un solo participio "
         "reemplaza a «después de que...».",
  "more": ["Con verbos transitivos concuerda con el **objeto** (*letta la "
           "lettera*); con intransitivos, con el sujeto (*arrivata la "
           "primavera*)."]},

 {"h": "El participio presente",
  "r": "*-ante* / *-ente*. Casi siempre ya es **adjetivo o sustantivo**: "
       "*interessante, seguente, cantante, insegnante*.",
  "ex": [["Un libro *interessante*.", "Un libro interesante."],
         ["La settimana *seguente*.", "La semana siguiente."],
         ["I cittadini *residenti* all'estero.", "Los ciudadanos residentes en el exterior."],
         ["Le persone *aventi* diritto.", "Las personas que tienen derecho."]],
  "more": ["Como verbo activo sobrevive en el registro jurídico y "
           "administrativo: *i cittadini residenti all'estero*, *le persone "
           "aventi diritto*."]},
]},

45: {
"intro": "Vas a usar los verbos pronominales idiomáticos (*andarsene, "
         "farcela, prendersela*): no se deducen del verbo suelto y están en "
         "todas las conversaciones.",
"blocks": [
 {"h": "Los imprescindibles",
  "r": "Verbo + *ci*, *ne*, *la* o dos partículas: **significan otra cosa** "
       "que el verbo solo.",
  "ex": [["*Me ne vado*, ciao.", "Me voy, chau."],
         ["Non *ce la faccio* più.", "No puedo más."],
         ["Non *te la prendere*.", "No te ofendas."],
         ["*Ci vuole* pazienza.", "Hace falta paciencia."]],
  "table": {"head": ["Verbo", "Sentido", "Ejemplo"],
            "rows": [["andarsene", "irse", "Me ne vado, ciao."],
                     ["farcela", "lograrlo, poder con algo", "Non ce la faccio più."],
                     ["avercela con", "estar enojado con", "Ce l'hai con me?"],
                     ["prendersela", "ofenderse", "Non te la prendere."],
                     ["cavarsela", "arreglárselas", "Me la cavo con l'inglese."],
                     ["sentirsela", "animarse a", "Non me la sento di dirglielo."],
                     ["smetterla", "dejar de (algo molesto)", "Smettila!"],
                     ["piantarla", "cortarla", "Piantala!"],
                     ["metterci", "tardar", "Ci metto un'ora."],
                     ["volerci", "hacer falta", "Ci vuole pazienza."],
                     ["entrarci", "tener que ver", "Non c'entra niente."],
                     ["starci", "estar de acuerdo, caber", "Ci sto!"]]},
  "tip": "No los deduzcas: aprendelos como palabras nuevas, con su frase de "
         "ejemplo."},

 {"h": "Cómo se conjugan",
  "r": "El reflexivo cambia con la persona; *la*, *ne*, *ci* **quedan "
       "fijos**. Compuestos con *essere*, salvo *farcela, avercela, "
       "metterci*.",
  "ex": [["*Me ne sono andato* / *Ce ne siamo andati*.", "Me fui / Nos fuimos."],
         ["*Ce l'ho fatta*!", "¡Lo logré!"],
         ["*Se l'è presa*.", "Se ofendió."],
         ["Non *me la sono sentita*.", "No me animé."],
         ["*Ci ho messo* un'ora.", "Tardé una hora."]]},

 {"h": "El participio en -a",
  "r": "Con las formas en *la*, el participio **termina en -a**: concuerda "
       "con esa *la* que no se refiere a nada concreto.",
  "ex": [["Ce l'ho *fatta*.", "Lo logré."],
         ["Se l'è *cavata*.", "Se las arregló."],
         ["Se l'è *presa*.", "Se ofendió."]],
  "warn": "«Ce l'ho fatto» es la falta típica. Es un automatismo: fijalo "
          "repitiendo *ce l'ho fatta* hasta que salga solo."},

 {"h": "averci: el ci de apoyo",
  "r": "En el habla, *avere* delante de *lo, la, li, le, ne* suma un *ci* sin "
       "significado: *ce l'ho*.",
  "ex": [["Hai una penna? — Sì, *ce l'ho*.", "¿Tenés una lapicera? — Sí, tengo."],
         ["Le chiavi? Non *ce le ho*.", "¿Las llaves? No las tengo."],
         ["*Ce n'hai* ancora?", "¿Te queda?"]],
  "warn": "Sin el *ce*, «l'ho» suena antinatural. *Ci ho fame* también se "
          "oye, pero es regional: no lo escribas."},

 {"h": "Otras construcciones fijas de nivel",
  "r": "Perífrasis frecuentes: **aspecto** (a punto de, empezar, seguir) y "
       "**matiz** (terminar por, no hacer más que).",
  "ex": [["*Sto per* uscire.", "Estoy por salir."],
         ["*Ha finito per* accettare.", "Terminó por aceptar."],
         ["Non *fa che* lamentarsi.", "No hace más que quejarse."],
         ["*Hai un bel dire*, non ti crede nessuno.", "Por más que digas, nadie te cree."]],
  "table": {"head": ["Expresión", "Sentido"],
            "rows": [["stare per + infinito", "estar a punto de"],
                     ["finire per + infinito", "terminar por"],
                     ["essere sul punto di", "estar por"],
                     ["mettersi a", "ponerse a"],
                     ["continuare a", "seguir + gerundio"],
                     ["non fare che + infinito", "no hacer más que"],
                     ["avere un bel + infinito", "por más que (hai un bel dire)"],
                     ["fare a meno di", "prescindir de"]]},
  "tip": "*Sto per uscire* = «estoy por salir»: así se dice el futuro "
         "inminente. *stare* + gerundio NO sirve para eso."},
]},

46: {
"intro": "Con un sufijo, el italiano agrega tamaño, cariño, desprecio o "
         "ironía sin sumar adjetivos. Quien no usa alterados suena "
         "traducido.",
"blocks": [
 {"h": "Los sufijos alterativos",
  "r": "*-ino, -etto, -ello* achican o dan cariño; *-one* agranda; *-accio* "
       "desprecia; *-uccio* es cariñoso.",
  "ex": [["Abbiamo un gatt*ino*.", "Tenemos un gatito."],
         ["Vivono in una cas*etta* al mare.", "Viven en una casita en la playa."],
         ["È un libr*one* di mille pagine.", "Es un librazo de mil páginas."],
         ["Che temp*accio*!", "¡Qué tiempo horrible!"]],
  "table": {"head": ["Sufijo", "Valor", "Ejemplos"],
            "rows": [["-ino / -ina", "pequeño, afectuoso", "gattino, sorellina, un pochino"],
                     ["-etto / -etta", "pequeño, simpático", "casetta, libretto, poveretto"],
                     ["-ello / -ella", "pequeño, a veces despectivo", "alberello, cattivello"],
                     ["-one / -ona", "grande, aumentativo", "librone, portone, pigrone"],
                     ["-accio / -accia", "feo, malo, despectivo", "tempaccio, parolaccia, ragazzaccio"],
                     ["-uccio / -uccia", "cariñoso, un poco menor", "caruccio, boccuccia"]]},
  "warn": "*-one* suele volver masculino un sustantivo femenino: *la porta → "
          "il portone*, *la donna → il donnone*."},

 {"h": "Los falsos alterados",
  "r": "No todo *-ino* u *-one* es alterado: *il tacchino* (el pavo) no es "
       "un *tacco* chico.",
  "ex": [["Mi si è staccato un bott*one*.", "Se me salió un botón."],
         ["Il post*ino* è già passato.", "El cartero ya pasó."],
         ["Un muro di matt*oni*.", "Una pared de ladrillos."],
         ["Una fetta di focacc*ia*.", "Una porción de focaccia (un pan)."]],
  "more": ["Otros: *il burrone* (el barranco), *il montone* (el carnero), "
           "*il mattone* (el ladrillo, no un *matto* grande). Ante la duda, "
           "buscalos en el diccionario como palabra propia."]},

 {"h": "Se aplica a casi todo",
  "r": "Los sufijos van con sustantivos, con adjetivos (*carino, piccolino*) "
       "y hasta con adverbios (*benino, pianino, prestino*).",
  "ex": [["Prendiamo un *caffettino*?", "¿Tomamos un cafecito?"],
         ["Arrivo fra un *attimino*.", "Llego en un segundito."],
         ["Che *freddino*!", "¡Qué fresquito!"],
         ["Ha una *macchinona*.", "Tiene un autazo."],
         ["Che *giornataccia*!", "¡Qué día de porquería!"]]},

 {"h": "Prefijos que multiplican el vocabulario",
  "r": "*ri-* repite; *s-*, *in-* y *dis-* niegan; *stra-*, *super-* e "
       "*iper-* exageran; *mal-* = mal.",
  "ex": [["Te lo *ri*spiego.", "Te lo vuelvo a explicar."],
         ["Il treno era *stra*pieno.", "El tren estaba llenísimo."],
         ["Sono *s*contento del risultato.", "Estoy descontento con el resultado."],
         ["È un ragazzo *mal*educato.", "Es un chico maleducado."]],
  "table": {"head": ["Prefijo", "Sentido", "Ejemplo"],
            "rows": [["ri-", "de nuevo", "rifare, rivedere, ripetere"],
                     ["s-", "negación o intensificación", "scontento, sfortuna, sbagliare"],
                     ["in- / im- / dis-", "negación", "incapace, impossibile, disonesto"],
                     ["stra- / super- / iper-", "exceso", "strapieno, superaffollato"],
                     ["mal-", "mal", "maleducato, malinteso"]]},
  "tip": "*ri-* va con casi cualquier verbo: *te lo rispiego* (te lo vuelvo "
         "a explicar), *ci risentiamo* (volvemos a hablar). Ahorra "
         "perífrasis."},
]},

47: {
"intro": "Cantidades, medidas y números: frases cortas y muy frecuentes que "
         "conviene memorizar en bloque. Acá se nota si manejás el idioma o "
         "lo traducís.",
"blocks": [
 {"h": "Cantidades aproximadas",
  "r": "*una decina, una ventina, un centinaio, un migliaio, un paio* + "
       "**di** + sustantivo: *una ventina di persone*.",
  "ex": [["C'erano *una ventina di* persone.", "Había unas veinte personas."],
         ["Ho *un paio di* domande.", "Tengo un par de preguntas."],
         ["Ha *centinaia di* libri.", "Tiene cientos de libros."],
         ["Costa *circa* dieci euro.", "Cuesta unos diez euros."]],
  "table": {"head": ["Forma", "Sentido", "Ejemplo"],
            "rows": [["una decina, una ventina", "unos diez, unos veinte", "una ventina di persone"],
                     ["un centinaio / centinaia", "un centenar / centenares", "centinaia di libri"],
                     ["un migliaio / migliaia", "un millar / miles", "migliaia di euro"],
                     ["un paio / paia", "un par / pares", "un paio di scarpe"],
                     ["circa / all'incirca", "aproximadamente", "circa dieci"],
                     ["più o meno", "más o menos", "più o meno alle tre"]]},
  "warn": "No te olvides el *di*: *una decina di amici*. Y el plural es "
          "femenino en *-a*: *le centinaia*, *le migliaia*, *due paia*."},

 {"h": "Fracciones",
  "r": "*la metà* (la mitad), *un terzo*, *un quarto*, *tre quarti*, *due "
       "terzi*. Y *il doppio*, *il triplo*.",
  "ex": [["Ho letto *metà* del libro.", "Leí la mitad del libro."],
         ["*Un quarto* d'ora.", "Un cuarto de hora."],
         ["*Due terzi* degli studenti sono d'accordo.", "Dos tercios de los estudiantes están de acuerdo."],
         ["Costa *il doppio*.", "Cuesta el doble."]]},

 {"h": "Porcentajes",
  "r": "Llevan **artículo masculino**: *il 20%*, *l'8%*. El verbo va en "
       "singular o concuerda con el sustantivo que sigue.",
  "ex": [["*Il 30%* degli studenti sono stranieri.", "El 30% de los estudiantes son extranjeros."],
         ["*Il 20%* degli italiani vive qui.", "El 20% de los italianos vive acá."],
         ["Ha preso *l'8%* dei voti.", "Sacó el 8% de los votos."]],
  "warn": "Nunca sin artículo: «30% degli studenti» es de titular de diario. "
          "En una frase normal, *il 30%*."},

 {"h": "Pesos, medidas y compra",
  "r": "En el mostrador se pide por *etto* (100 g). El precio por unidad va "
       "con *a* + artículo: *al chilo*.",
  "ex": [["*Un chilo di* mele, per favore.", "Un kilo de manzanas, por favor."],
         ["*Due etti* di prosciutto.", "Doscientos gramos de jamón."],
         ["*Mezzo litro* di latte.", "Medio litro de leche."],
         ["*Quant'è*?", "¿Cuánto es?"],
         ["Costa dieci euro *al chilo*.", "Cuesta diez euros el kilo."]],
  "tip": "Nadie pide «200 grammi»: se piden *due etti*. Igual *al giorno*, "
         "*all'ora*: *a* + artículo donde el castellano dice «por» o «el»."},

 {"h": "Operaciones y números escritos",
  "r": "*più* (+), *meno* (−), *per* (×), *diviso* (÷), *fa* o *uguale* (=). "
       "Decimales con **coma**, miles con **punto**.",
  "ex": [["Due *più* due *fa* quattro.", "Dos más dos son cuatro."],
         ["Dieci *diviso* due fa cinque.", "Diez dividido dos da cinco."],
         ["3,5 = tre *virgola* cinque", "tres coma cinco"],
         ["Costa *1.500* euro.", "Cuesta mil quinientos euros."]],
  "warn": "Ojo con *per*: en una cuenta es «por» (×), no «para»: *tre per "
          "tre fa nove*."},
]},

48: {
"intro": "Vas a mover el orden de las palabras para marcar el foco, como "
         "hace el italiano en el habla, la literatura y el periodismo.",
"blocks": [
 {"h": "Dislocación a la izquierda",
  "r": "El objeto va **al principio** y se retoma con un pronombre. Es la "
       "estructura más frecuente del italiano hablado.",
  "ex": [["*Il pane lo* compro io.", "El pan lo compro yo."],
         ["*A Marco* non *gli* ho detto niente.", "A Marco no le dije nada."],
         ["*Di soldi* non *ne* ho.", "Plata no tengo."],
         ["*Questo film l'*ho già visto.", "Esta película ya la vi."]],
  "tip": "El rioplatense hace lo mismo («el pan lo compro yo»): te sale "
         "gratis. Usala, sin ella el italiano suena a libro de texto."},

 {"h": "Dislocación a la derecha",
  "r": "El pronombre va primero y el elemento se agrega **al final**, como "
       "aclaración. Marca oralidad e intimidad.",
  "ex": [["Non *ci* credo, *a queste storie*.", "No me las creo, esas historias."],
         ["*L'*ho vista ieri, *Maria*.", "La vi ayer, a María."],
         ["Ce *l'*hai, *il biglietto*?", "¿Lo tenés, el boleto?"]]},

 {"h": "Frase escindida: è... che",
  "r": "*è* + elemento + *che* pone un elemento en **foco exclusivo**, como "
       "«es X el que...».",
  "ex": [["*È* Marco *che* ha telefonato.", "Fue Marco el que llamó."],
         ["*È* per questo *che* sono venuto.", "Es por esto que vine."],
         ["*Sono* io *che* ho sbagliato.", "Soy yo el que se equivocó."],
         ["*È stato* Marco *a* telefonare.", "Fue Marco el que llamó."]],
  "tip": "Variante muy común con sujeto: *è stato Marco a telefonare* "
         "(*a* + infinitivo). Evita el *che* y suena muy natural."},

 {"h": "Sujeto después del verbo",
  "r": "Con intransitivos y verbos de acontecimiento, el sujeto nuevo va "
       "**detrás del verbo**. Con *c'è / ci sono* es obligatorio.",
  "ex": [["È arrivato *Marco*.", "Llegó Marco."],
         ["Mi ha telefonato *tua sorella*.", "Me llamó tu hermana."],
         ["C'è *un problema*.", "Hay un problema."],
         ["Manca *il sale*.", "Falta la sal."]],
  "tip": "Igual que en castellano: «llegó Marco», no «Marco llegó», cuando "
         "Marco es la noticia."},

 {"h": "Anteponer para enfatizar",
  "r": "Un adjetivo o un complemento adelantado **enfatiza**: lo que va "
       "primero es lo que importa.",
  "ex": [["*Bello*, questo quadro!", "¡Lindo, este cuadro!"],
         ["*Stanco* sono, non malato.", "Cansado estoy, no enfermo."],
         ["*Di lavorare* non ha nessuna voglia.", "Ganas de trabajar no tiene ninguna."]],
  "warn": "Son órdenes marcados: usalos para enfatizar, no por defecto. Un "
          "texto entero invertido suena artificial."},
]},

49: {
"intro": "Vas a escribir un texto argumentativo de nivel C1: conectores de "
         "registro alto, fórmulas impersonales, cohesión sin repeticiones y "
         "la estructura que esperan los examinadores.",
"blocks": [
 {"h": "Conectores de registro alto",
  "q": [{"prompt": "¿Qué conector sirve para oponer?", "answer": "tuttavia", "options": ["tuttavia", "inoltre", "pertanto"]}, {"prompt": "¿Qué conector expresa una consecuencia?", "answer": "pertanto", "options": ["pertanto", "altresì", "ovvero"]}],
  "r": "Un conector por función, **variado**: escribir culto es elegir bien "
       "el conector, no escribir difícil.",
  "ex": [["*Inoltre*, i costi sono aumentati.", "Además, los costos aumentaron."],
         ["*Tuttavia*, il problema resta.", "Sin embargo, el problema sigue."],
         ["*Pertanto* la proposta va respinta.", "Por lo tanto, la propuesta debe rechazarse."],
         ["*In definitiva*, la riforma è necessaria.", "En definitiva, la reforma es necesaria."]],
  "table": {"head": ["Función", "Formas"],
            "rows": [["añadir", "inoltre, per di più, altresì, non solo... ma anche"],
                     ["oponer", "tuttavia, ciononostante, per contro, d'altro canto, viceversa"],
                     ["conceder", "certo... tuttavia, se è vero che... è altrettanto vero che"],
                     ["causa", "in quanto, poiché, dal momento che, in virtù di, a causa di"],
                     ["consecuencia", "di conseguenza, pertanto, ne consegue che, sicché"],
                     ["ejemplificar", "ad esempio, in particolare, segnatamente, basti pensare a"],
                     ["reformular", "ovvero, vale a dire, in altri termini, per meglio dire"],
                     ["concluir", "in conclusione, in definitiva, tutto sommato, in ultima analisi"]]},
  "warn": "No repitas *ma... ma... ma*: alterná *tuttavia*, *per contro*, "
          "*d'altro canto*. La variedad es lo que se nota."},

 {"h": "Conectores que piden congiuntivo",
  "r": "*benché, sebbene, nonostante, qualora, affinché, a condizione che, "
       "prima che, senza che, a meno che non* → **congiuntivo**.",
  "ex": [["*Benché sia* tardi, continuiamo.", "Aunque es tarde, seguimos."],
         ["*Qualora ci fossero* problemi, avvisateci.", "En caso de que hubiera problemas, avísennos."],
         ["Te lo ripeto *affinché* tu lo *capisca*.", "Te lo repito para que lo entiendas."],
         ["Partiamo *prima che* *faccia* buio.", "Salgamos antes de que oscurezca."]],
  "warn": "El conector elegante con indicativo detrás anula el efecto: "
          "«benché è tardi» es un error."},

 {"h": "Las fórmulas impersonales",
  "r": "Distancian al autor y elevan el texto. **Una por párrafo** alcanza.",
  "table": {"head": ["Fórmula", "Castellano"],
            "rows": [["va detto che", "hay que decir que"],
                     ["va rilevato che", "cabe señalar que"],
                     ["si tratta di", "se trata de"],
                     ["è opportuno", "es oportuno, conviene"],
                     ["occorre notare", "cabe notar"],
                     ["risulta evidente", "resulta evidente"],
                     ["è lecito supporre", "es lícito suponer"],
                     ["non si può prescindere da", "no se puede prescindir de"],
                     ["giova ricordare", "conviene recordar"]]},
  "ex": [["*Va detto che* il problema è complesso.", "Hay que decir que el problema es complejo."],
         ["*Si tratta di* una questione delicata.", "Se trata de un asunto delicado."],
         ["*Occorre precisare* che non tutti concordano.", "Cabe precisar que no todos coinciden."]],
  "warn": "Evitá el «io penso» en cada frase: en un texto argumentativo, "
          "*va detto che* o *risulta evidente* sostienen la tesis sin "
          "primera persona."},

 {"h": "Cohesión: no repetir",
  "r": "No repitas el sustantivo: usá **pronombres**, sinónimos, "
       "hiperónimos (*la questione*) o demostrativos (*ciò, tale*).",
  "ex": [["Il governo ha approvato la riforma; *tale provvedimento* entrerà in vigore a gennaio.", "El gobierno aprobó la reforma; dicha medida entrará en vigor en enero."],
         ["*Ciò* comporta un aumento dei costi.", "Ello implica un aumento de costos."],
         ["L'inquinamento cresce: *il fenomeno* preoccupa gli esperti.", "La contaminación crece: el fenómeno preocupa a los expertos."]],
  "more": ["Otros recursos: *il suddetto* (el mencionado), *quest'ultimo* "
           "(este último) y los pronombres *lo, ne, ci*: *se ne parla "
           "poco*, *ci torneremo*."]},

 {"h": "Estructura del testo argomentativo",
  "r": "Cinco partes, en este orden. **Cuatro párrafos bien conectados** "
       "valen más que ocho sueltos.",
  "ex": [["*A mio avviso*, la riforma è necessaria.", "En mi opinión, la reforma es necesaria."],
         ["*Certo*, i costi sono alti; *tuttavia* i vantaggi sono maggiori.", "Es cierto que los costos son altos; sin embargo, las ventajas son mayores."],
         ["*In conclusione*, conviene investire nella scuola.", "En conclusión, conviene invertir en la escuela."]],
  "table": {"head": ["Parte", "Qué hace"],
            "rows": [["introduzione", "plantea el tema"],
                     ["tesi", "tu posición, explícita"],
                     ["argomenti", "dos o tres, con ejemplos"],
                     ["controargomento", "lo reconocés y lo refutás: *certo..., tuttavia...*"],
                     ["conclusione", "retoma la tesis sin repetirla textualmente"]]}},
]},

50: {
"intro": "Vas a esquivar la última trampa, la que parece más fácil: los "
         "falsos amigos, y a elegir el registro justo para cada situación.",
"parts": [
 {"h": "Falsos amigos y pares que el castellano no distingue", "blocks": [0, 1, 2],
  "match": r"significa|falso|Verdadero|burro|salire"},
 {"h": "Registro y preposiciones de nivel", "blocks": [3, 4],
  "match": r"preposici|\bdi\b|\bda\b|\bsu\b|\bfra\b"},
],
"blocks": [
 {"h": "Los clásicos que hay que saber",
  "r": "Se parecen a una palabra castellana y **significan otra cosa**. "
       "Aprendé también la palabra italiana para lo que creías.",
  "ex": [["Passami *il burro*.", "Pasame la manteca."],
         ["*Sono imbarazzata*.", "Estoy avergonzada."],
         ["*Salgo* sul treno.", "Me subo al tren."],
         ["Mi fa male la *gamba*.", "Me duele la pierna."]],
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
                     ["cartone", "cartón / dibujo animado", "cartón de bingo (= cartella)"],
                     ["negozio", "negocio (tienda)", "negocio como trato (= affare)"]]},
  "warn": "*Sono imbarazzata* = «estoy avergonzada», no «embarazada». Y *il "
          "burro* en el plato es manteca. Estos dos producen las anécdotas."},

 {"h": "Segunda tanda, más sutil",
  "r": "Verbos que parecen transparentes y **no lo son**. Mirá la columna de "
       "la derecha: ahí está el error.",
  "ex": [["*Attenda* un momento, per favore.", "Espere un momento, por favor."],
         ["*Ho assistito* all'incidente.", "Presencié el accidente."],
         ["*Pretendo* una risposta.", "Exijo una respuesta."],
         ["L'*hanno licenziato*.", "Lo despidieron."]],
  "table": {"head": ["Italiano", "Significa", "Ojo"],
            "rows": [["attendere", "esperar", "atender = servire, assistere"],
                     ["assistere a", "presenciar", "asistir a clase = frequentare"],
                     ["pretendere", "exigir", "pretender (aspirar) = aspirare a"],
                     ["sopportare", "aguantar (a alguien, el dolor)", "sostener un peso = reggere"],
                     ["ricordare", "recordar, recordarle algo a alguien", "recordame que llame = ricordami di chiamare"],
                     ["accostare", "acercar, arrimar", "acostar = mettere a letto"],
                     ["licenziare", "despedir", "licenciarse = laurearsi"],
                     ["fermare", "detener", "firmar = firmare"],
                     ["salire su", "subirse a", "salir = uscire"],
                     ["rimanere / restare", "quedarse", "restar = sottrarre"],
                     ["tornare", "volver", "tornarse = diventare"],
                     ["cercare", "buscar", "cerca (adverbio) = vicino"],
                     ["lasciare", "dejar algo o a alguien", "dejar de = smettere di"],
                     ["rubare", "robar", "robarle algo a alguien = rubare qualcosa a qualcuno"],
                     ["andare via", "irse", "también andarsene"]]}},

 {"h": "Palabras que el castellano no distingue",
  "q": [{"prompt": "¿Cuál está bien? «¿Venís a la fiesta? — Sí, voy.»", "answer": "Sì, vengo.", "options": ["Sì, vengo.", "Sì, vado.", "Sì, sto."]}, {"prompt": "¿Cuál está bien? «¿Conocés a Marco?»", "answer": "Conosci Marco?", "options": ["Conosci Marco?", "Sai Marco?", "Conosci a Marco?"]}],
  "r": "Donde el castellano usa una palabra, el italiano **elige entre dos**.",
  "ex": [["*Conosci* Marco?", "¿Conocés a Marco?"],
         ["*Sai* dov'è la stazione?", "¿Sabés dónde está la estación?"],
         ["Stasera *vengo* da te.", "Esta noche voy a tu casa."],
         ["*Portami* l'acqua, per favore.", "Traeme el agua, por favor."]],
  "table": {"head": ["Par", "Diferencia"],
            "rows": [["sapere / conoscere", "saber un dato / conocer a alguien o un lugar"],
                     ["portare / prendere", "llevar o traer / tomar, agarrar, ir a buscar"],
                     ["andare / venire", "ir / ir hacia donde está el que escucha"],
                     ["buono / bravo", "bueno de sabor o carácter / hábil (*un bravo cuoco*)"]]},
  "warn": "Hacia el interlocutor se usa *venire*, aunque en castellano "
          "digamos «voy»: *Vieni alla festa? — Sì, vengo.* «Sì, vado» ahí es "
          "un error."},

 {"h": "Registro: la misma idea, tres niveles",
  "r": "Para el C1 no hace falta hablar siempre formal: hace falta "
       "**elegir** el nivel según la situación.",
  "ex": [["Ho *un sacco di* lavoro.", "Tengo un montón de trabajo."],
         ["Non è *mica* facile.", "No es nada fácil."],
         ["In ufficio c'è *un casino*.", "En la oficina hay un lío bárbaro."],
         ["La situazione è *notevolmente* peggiorata.", "La situación empeoró notablemente."]],
  "table": {"head": ["Coloquial", "Neutro", "Formal"],
            "rows": [["un sacco di", "molto", "notevolmente"],
                     ["roba", "cose", "elementi, aspetti"],
                     ["mica", "non... affatto", "in alcun modo"],
                     ["beccare", "prendere", "cogliere"],
                     ["fregare", "ingannare", "raggirare"],
                     ["un casino", "molto disordine", "notevole confusione"],
                     ["dai!", "su!", "la prego"]]},
  "tip": "Reconocer que *un casino* es coloquial y *notevole confusione* es "
         "de informe es exactamente lo que evalúa el examen oral."},

 {"h": "Preposiciones de nivel: da, di, a, fra",
  "r": "*da*: para qué sirve o un rasgo; *di*: material o contenido; *a*: el "
       "dibujo; *fra* + tiempo: dentro de.",
  "ex": [["una tazza *da* tè / una tazza *di* tè", "una taza para té / una taza de té (llena)"],
         ["la ragazza *dagli* occhi verdi", "la chica de ojos verdes"],
         ["una giacca *di* lana", "una campera de lana"],
         ["una gonna *a* quadri", "una pollera a cuadros"],
         ["Torno *fra* un'ora.", "Vuelvo dentro de una hora."]],
  "warn": "*fra* o *tra* + tiempo = dentro de (*torno fra un'ora*). *Vado da "
          "Marco* = voy a lo de Marco; *vado a Roma*, *vado in centro*."},
]},

51: {
"intro": "Sin teoría nueva: vas a repasar con listas de control todo lo que "
         "suele fallar y volver a las semanas donde algo no te cierre.",
"parts": [
 {"h": "Lista de control: congiuntivo", "blocks": [0],
  "match": r"congiuntivo|subjuntivo|subordinante|«se»"},
 {"h": "Lista de control: tiempos", "blocks": [1],
  "match": r"condicional|condizionale|futuro|imperfetto|passato|remoto|puedo / podría"},
 {"h": "Pronombres y las faltas más caras", "blocks": [2, 3, 4],
  "match": r"pronombre|\bne\b|\bci\b"},
],
"blocks": [
 {"h": "Lista de control: congiuntivo",
  "r": "Opinión, duda, deseo, emoción o voluntad → **congiuntivo**. Recorré "
       "la tabla de arriba abajo antes de decidir el modo.",
  "ex": [["Credo che *sia* vero.", "Creo que es verdad."],
         ["Spero *di finire* presto.", "Espero terminar pronto."],
         ["Volevo che tu *venissi*.", "Quería que vinieras."],
         ["È l'unico che mi *capisca*.", "Es el único que me entiende."]],
  "table": {"head": ["Si...", "Entonces"],
            "rows": [["verbo de opinión, duda, deseo, emoción o voluntad", "congiuntivo"],
                     ["sujetos distintos", "che + congiuntivo"],
                     ["mismo sujeto", "di + infinito"],
                     ["principal en pasado", "congiuntivo imperfetto o trapassato"],
                     ["benché, affinché, nonostante, prima che, senza che, a meno che non", "congiuntivo sí o sí"],
                     ["superlativo relativo o l'unico che", "congiuntivo"]]}},

 {"h": "Lista de control: tiempos",
  "r": "Las ocho frases que **más se equivocan**. Si dudás, buscá la tuya "
       "acá.",
  "ex": [["Ha detto che *sarebbe venuto*.", "Dijo que vendría."],
         ["Se *avessi* tempo, *andrei*.", "Si tuviera tiempo, iría."],
         ["*Studio* italiano *da* due anni.", "Hace dos años que estudio italiano."],
         ["*Dopo essere uscito*, ho chiamato Luca.", "Después de salir, llamé a Luca."]],
  "table": {"head": ["Si querés decir", "Usá"],
            "rows": [["dijo que vendría", "disse che sarebbe venuto"],
                     ["si tuviera, iría", "se avessi, andrei"],
                     ["si hubiera tenido, habría ido", "se avessi avuto, sarei andato"],
                     ["hace dos años que estudio", "studio da due anni"],
                     ["estaba comiendo cuando llamó", "stavo mangiando quando ha chiamato"],
                     ["antes de salir", "prima di uscire"],
                     ["después de salir", "dopo essere uscito"],
                     ["hay que hacerlo", "va fatto / bisogna farlo"]]}},

 {"h": "Lista de control: pronombres",
  "q": [{"prompt": "¿Cuál está bien? «Te lo digo.»", "answer": "Te lo dico.", "options": ["Te lo dico.", "Ti lo dico.", "Lo ti dico."]}, {"prompt": "¿Cuál está bien? «Tengo tres» (hermanos).", "answer": "Ne ho tre.", "options": ["Ne ho tre.", "Ho tre.", "Li ho tre."]}],
  "r": "Pronombres **delante** del verbo conjugado; **pegados** al "
       "infinitivo, gerundio e imperativo informal.",
  "ex": [["*Te lo* dico domani.", "Te lo digo mañana."],
         ["*Gliel'*ho già detto.", "Ya se lo dije."],
         ["Quanti fratelli hai? — *Ne* ho tre.", "¿Cuántos hermanos tenés? — Tengo tres."],
         ["Le ragazze? *Le* ho *viste* ieri.", "¿Las chicas? Las vi ayer."]],
  "table": {"head": ["Punto", "Regla"],
            "rows": [["combinados", "me lo, te la, ce ne, ve li, se ne: la i pasa a e"],
                     ["gli + lo", "se pega: glielo, gliela, gliene"],
                     ["ne", "obligatorio con cantidades: ne ho tre"],
                     ["ci", "lugar y complementos con a / in / su"],
                     ["participio", "concuerda con lo, la, li, le y con essere"]]}},

 {"h": "Las quince faltas más caras",
  "r": "Quince errores que **bajan la nota** siempre. Leelos en voz alta "
       "hasta que la forma correcta te salga sola.",
  "ex": [["Credo che *sia* così.", "Creo que es así."],
         ["*Mi sono lavato* le mani.", "Me lavé las manos."],
         ["*Si vendono* libri usati.", "Se venden libros usados."],
         ["*Qual è* il problema?", "¿Cuál es el problema?"]],
  "table": {"head": ["Error", "Correcto"],
            "rows": [["credo che è", "credo che sia"],
                     ["mi ho lavato", "mi sono lavato"],
                     ["se avrei", "se avessi"],
                     ["ha detto che verrebbe", "ha detto che sarebbe venuto"],
                     ["si vende libri", "si vendono libri"],
                     ["dopo mangiare", "dopo aver mangiato"],
                     ["ho tre (de algo ya nombrado)", "ne ho tre"],
                     ["vedo a Marco", "vedo Marco"],
                     ["mi libro", "il mio libro"],
                     ["qualche amici", "qualche amico"],
                     ["facilemente", "facilmente"],
                     ["qual'è", "qual è (sin apóstrofo)"],
                     ["parleremo (por «hablaríamos»)", "parleremmo"],
                     ["sto studiando quest'anno", "studio quest'anno (más natural)"],
                     ["poso (por «puedo»)", "posso, con doble s"]]}},

 {"h": "Cómo llegar al jefe final",
  "r": "Antes del examen, **gimnasio de verbos**: congiuntivo imperfetto y "
       "trapassato, las formas que menos se automatizan.",
  "ex": [["Se *fossi* in te, ripasserei.", "Yo que vos, repasaría."],
         ["Pensavo che *fosse* già *partito*.", "Pensaba que ya se había ido."],
         ["Se *avessi studiato*, avrei passato l'esame.", "Si hubiera estudiado, habría aprobado el examen."]],
  "tip": "Después repasá esta hoja en voz alta: leer las trampas en voz alta "
         "las fija mejor que releerlas."},
]},

52: {
"intro": "El examen del año: cuarenta preguntas, todo el programa, sin "
         "ayudas. Esta hoja es el mapa completo de lo que cubriste en 52 "
         "semanas.",
"parts": [
 {"h": "Repaso: el sistema verbal y las cinco reglas", "blocks": [0, 1],
  "match": r"presente|essere|avere|plural|artículo|masculino|adjetivo|passato prossimo|futuro|condicional simple|condizionale presente|imperfetto|pronombre|reflexiv|piace"},
 {"h": "Repaso: lo que separa un B2 de un C1", "blocks": [2, 3, 4],
  "match": r"\S"},
],
"blocks": [
 {"h": "El sistema verbal entero",
  "q": [{"prompt": "¿Qué forma es «che io parlassi»?", "answer": "congiuntivo imperfetto", "options": ["congiuntivo imperfetto", "condizionale presente", "indicativo imperfetto"]}, {"prompt": "¿Qué forma toma el imperativo de Lei?", "answer": "la del congiuntivo presente", "options": ["la del congiuntivo presente", "la del indicativo presente", "la del condizionale"]}],
  "r": "Cuatro modos finitos y tres formas no finitas. **Todos** entran en "
       "el examen.",
  "ex": [["Vorrei che tu *parlassi* più piano.", "Quisiera que hablaras más despacio."],
         ["Quando *ebbe finito*, uscì.", "Cuando hubo terminado, salió."],
         ["*Si accomodi*, prego.", "Pase, por favor."],
         ["*Avendo capito* tutto, ha firmato.", "Como había entendido todo, firmó."]],
  "table": {"head": ["Modo", "Tiempos"],
            "rows": [["Indicativo", "presente, imperfetto, passato prossimo, trapassato prossimo, passato remoto, trapassato remoto, futuro semplice, futuro anteriore"],
                     ["Congiuntivo", "presente, passato, imperfetto, trapassato"],
                     ["Condizionale", "presente, passato"],
                     ["Imperativo", "tu, noi, voi (informal); Lei (= congiuntivo)"],
                     ["Formas no finitas", "infinito, gerundio, participio (simples y compuestos)"]]}},

 {"h": "Las cinco reglas que sostienen todo",
  "q": [{"prompt": "Futuro visto desde el pasado.", "stem": "Disse che ___.", "answer": "sarebbe venuto", "options": ["sarebbe venuto", "verrebbe", "verrà"]}, {"prompt": "Completá el período hipotético.", "stem": "Se ___ tempo, verrei.", "answer": "avessi", "options": ["avessi", "avrei", "ho avuto"]}],
  "r": "Si dudás, volvé a estas cinco: resuelven **la mayoría** de las "
       "preguntas.",
  "ex": [["Maria *è arrivata* tardi.", "María llegó tarde."],
         ["Penso che *abbia* ragione.", "Pienso que tiene razón."],
         ["Disse che *sarebbe venuto*.", "Dijo que vendría."],
         ["Se *avessi* tempo, verrei.", "Si tuviera tiempo, vendría."]],
  "table": {"head": ["Qué decide", "Regla"],
            "rows": [["el auxiliar → la concordancia", "con essere, el participio sigue al sujeto"],
                     ["la subjetividad → el modo", "opinión, deseo, duda y emoción piden congiuntivo"],
                     ["la principal → la subordinada", "el tiempo de la principal decide el de la subordinada"],
                     ["se hipotético", "indicativo (real) o congiuntivo (posible, irreal), nunca condicional"],
                     ["futuro desde el pasado", "condicional COMPUESTO: disse che sarebbe venuto"]]}},

 {"h": "Lo que separa un B2 de un C1",
  "r": "No es saber más reglas: es **usar los recursos que el B2 evita**.",
  "ex": [["*Ho fatto riparare* la macchina.", "Mandé a arreglar el auto."],
         ["*Finito* il lavoro, siamo usciti.", "Terminado el trabajo, salimos."],
         ["Il pane *lo* compro io.", "El pan lo compro yo."],
         ["Non *ce la faccio* più.", "No puedo más."]],
  "table": {"head": ["Recurso", "Ejemplo"],
            "rows": [["causativo", "ho fatto riparare la macchina"],
                     ["participio absoluto", "finito il lavoro"],
                     ["gerundio compuesto", "avendo capito"],
                     ["dislocaciones", "il pane lo compro io"],
                     ["pronominales idiomáticos", "non ce la faccio"],
                     ["ne y ci en todos sus valores", "ne ho tre, ci penso io"],
                     ["pasiva con andare y venire", "va fatto, viene pubblicato"],
                     ["conectores de registro alto", "benché sia, qualora fosse"]]}},

 {"h": "Antes de entrar",
  "r": "Leé una vez las **quince faltas** de la semana 51.",
  "ex": [["Credo che *sia* giusto.", "Creo que es justo."],
         ["Ha detto che *sarebbe partito*.", "Dijo que se iría."]],
  "tip": "¿Dudás entre indicativo y congiuntivo tras un verbo de opinión? "
         "Congiuntivo. ¿Entre condicional simple y compuesto mirando al "
         "futuro desde el pasado? Compuesto."},

 {"h": "Después del examen",
  "r": "El C1 no es la meta: es donde el idioma empieza a devolverte cosas. "
       "**Cinco minutos por día** alcanzan.",
  "ex": [["*Ce l'hai fatta*!", "¡Lo lograste!"],
         ["*In bocca al lupo*! — *Crepi*!", "¡Suerte! — ¡Gracias!"]],
  "more": ["Podés leer a Calvino, a Ferrante y a Buzzati sin diccionario, "
           "seguir un debate en la radio y escribir un texto argumentativo "
           "defendible. El repaso espaciado sigue abierto para siempre. *In "
           "bocca al lupo!*"]},
]},

}
