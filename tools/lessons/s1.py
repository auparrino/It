# -*- coding: utf-8 -*-
"""Stagione 1 — Le Fondamenta (settimane 1-13, A1 → A2)."""

LESSONS = {

1: {
"intro": "El italiano se escribe casi como el castellano pero suena "
         "distinto. Antes de la gramática, a leer en voz alta.",
"blocks": [
 {"h": "Un alfabeto de 21 letras",
  "r": "Sin *j, k, w, x, y* (salvo préstamos) ni *ñ*. La *h* no suena nunca. "
       "Las cinco vocales, limpias como en castellano.",
  "ex": [["il jazz, il weekend", "préstamos: se escriben como en el original"],
         ["ho / o", "tengo / o: la h no suena"],
         ["signore", "señor: la ñ se escribe gn"]],
  "tip": "Ya tenés el 80% de la pronunciación: las vocales son las tuyas."},

 {"h": "c y g cambian según la vocal",
  "r": "*c* y *g* son duras ante *a, o, u* y blandas ante *e, i*. La *h* las "
       "endurece; una *i* muda las ablanda.",
  "table": {"head": ["Se escribe", "Suena", "Ejemplo"],
            "rows": [["ca, co, cu", "ka, ko, ku", "casa, cosa, cubo"],
                     ["ce, ci", "che, chi (como en «chico»)", "cena, cinema"],
                     ["che, chi", "ke, ki", "perché, chiave"],
                     ["cia, cio, ciu", "cha, cho, chu", "ciao, cioccolata"],
                     ["ga, go, gu", "ga, go, gu", "gatto, gonna"],
                     ["ge, gi", "dy, como la j inglesa de «jeans»", "gelato, giro"],
                     ["ghe, ghi", "gue, gui", "spaghetti, ghiaccio"],
                     ["gn", "ñ", "signore, bagno"],
                     ["gli", "ll tradicional (no la rioplatense), casi «li» rápida", "figlio, aglio"],
                     ["sce, sci", "sh inglesa", "pesce, sciare"],
                     ["z", "ts o dz", "grazie, zero"]]}},

 {"h": "Las dobles consonantes",
  "r": "Una consonante doble **dura más** y cambia la palabra: *nono* "
       "(noveno) no es *nonno* (abuelo).",
  "ex": [["nono / nonno", "noveno / abuelo"],
         ["casa / cassa", "casa / caja"],
         ["pena / penna", "pena / lapicera"],
         ["sete / sette", "sed / siete"]],
  "warn": "Es la falta más frecuente del hispanohablante: *bello*, "
          "*sorella*, *mamma*, *appartamento* se escriben con doble.",
  "more": ["En castellano ninguna consonante larga distingue palabras (la "
           "*rr* y la *ll* son sonidos distintos, no alargados), así que el "
           "oído no está entrenado. Pronunciala larga, como si la "
           "sostuvieras: en *penna* la n dura el doble."]},

 {"h": "El acento: dónde cae y cuándo se escribe",
  "r": "La mayoría son llanas (*CA-sa*). La tilde solo se escribe si el "
       "acento cae en la última sílaba: *città*, *perché*, *caffè*.",
  "ex": [["città, caffè, però", "tilde: acento al final"],
         ["abitano, telefono, camera", "esdrújulas sin tilde: Á-bitano, te-LÉ-fono"],
         ["è / e", "es / y"]],
  "tip": "Si no ves tilde, no acentúes la última sílaba: *PAR-lo*, nunca "
         "«par-LÓ».",
  "more": ["La tilde también distingue monosílabos: *è* (es) / *e* (y), *dà* "
           "(da) / *da* (de, desde), *sì* (sí) / *si* (se). Muchas "
           "esdrújulas no coinciden con el castellano y no se marcan: hay "
           "que aprenderlas con el oído."]},

 {"h": "Detalles que se pegan rápido",
  "r": "*qu* suena «cu». La *s* entre vocales suele ser sonora. La *r* "
       "simple es un toque; la *rr*, vibrante.",
  "ex": [["questo", "«cuésto», nunca «késto»"],
         ["rosa", "s sonora, como una z inglesa"],
         ["caro / carro", "r simple / rr vibrante"]]},

 {"h": "Siete vocales, no cinco",
  "r": "La *e* y la *o* acentuadas pueden ser **abiertas** (*è*, *ò*) o "
       "**cerradas** (*é*, *ó*). A veces cambian la palabra.",
  "ex": [["pèsca / pésca", "durazno / pesca (de pescar)"],
         ["è / e", "es (abierta) / y"],
         ["pòrta / sóle", "o abierta / o cerrada"]],
  "warn": "Ni *b* = *v* ni «e» delante de *s* + consonante: *vino* con v de "
          "labios y dientes, *scuola* y *studente*, nunca «escuola».",
  "tip": "Escuchá cada ejemplo con 🔊 y repetilo en voz alta: la diferencia "
         "se aprende con el oído, no con la regla.",
  "more": ["En el norte y en el sur la distribución de las vocales abiertas "
           "cambia; el modelo del curso es el italiano estándar. Lo que sí "
           "conviene cuidar siempre son las dobles, la *s* de *scuola* y la "
           "*v*."]},

 {"h": "Tus dos primeros verbos: essere y avere",
  "r": "*essere* = ser y casi siempre «estar»; *avere* = tener. Son "
       "irregulares: se aprenden de memoria. El pronombre se suele omitir.",
  "table": {"head": ["", "essere", "avere"],
            "rows": [["io", "sono", "ho"],
                     ["tu", "sei", "hai"],
                     ["lui / lei", "è", "ha"],
                     ["noi", "siamo", "abbiamo"],
                     ["voi", "siete", "avete"],
                     ["loro", "sono", "hanno"]]},
  "ex": [["Sono di Buenos Aires.", "Soy de Buenos Aires."],
         ["Il caffè è caldo.", "El café está caliente."],
         ["Ho vent'anni.", "Tengo veinte años."],
         ["C'è un bar qui vicino?", "¿Hay un bar cerca de acá?"]],
  "warn": "*è* (es) lleva tilde; *e* (y), no. Y *ho, hai, ha, hanno* se leen "
          "«o, ai, a, anno».",
  "tip": "Edad y sensaciones van con *avere*: *ho fame, ho sete, ho sonno, "
         "ho fretta* (estoy apurado). «Hay» = *c'è* / *ci sono*.",
  "more": ["Con *avere* también: *ho freddo / ho caldo* (frío / calor), *ho "
           "paura* (miedo), *ho vergogna* (vergüenza), *ho ragione / ho "
           "torto* (tengo razón / estoy equivocado). *sono* sirve para «yo "
           "soy» y para «ellos son»: el contexto decide. El resto de los "
           "verbos llega en las semanas 5 y 6."]},
]},

2: {
"intro": "El género y el número del sustantivo mandan sobre artículo y "
         "adjetivo. Esta semana: las terminaciones, los plurales con trampa "
         "y los géneros que no coinciden con el castellano.",
"blocks": [
 {"h": "El esquema básico",
  "r": "*-o → -i* (masculino), *-a → -e* (femenino), *-e → -i* (**cualquiera "
       "de los dos**). El género de los en *-e* se aprende con la palabra.",
  "table": {"head": ["Singular", "Plural", "Género", "Ejemplo"],
            "rows": [["-o", "-i", "masculino", "libro → libri"],
                     ["-a", "-e", "femenino", "casa → case"],
                     ["-e", "-i", "masc. o fem.", "studente → studenti; chiave → chiavi"]]},
  "tip": "Femeninas: *-zione, -sione, -tà, -tù*, casi siempre *-trice* (*la "
         "stazione, la città, l'attrice*). Masculinas: *-ore, -ale, -ame* "
         "(*il dottore, il giornale*)."},

 {"h": "Plurales con h: -chi, -ghi",
  "r": "Para no ablandar *c* y *g*, muchos plurales agregan **h**: *amica → "
       "amiche*. Es ortografía: el sonido no cambia.",
  "table": {"head": ["Terminación", "Plural", "Ejemplos"],
            "rows": [["-ca, -ga", "-che, -ghe (siempre)", "amica → amiche; riga → righe"],
                     ["-co, -go (llanas)", "-chi, -ghi", "banco → banchi; lago → laghi"],
                     ["-co, -go (esdrújulas)", "-ci, -gi (salvo dialogo → dialoghi, carico → carichi)", "medico → medici; biologo → biologi"],
                     ["-cia, -gia (vocal antes)", "-cie, -gie", "camicia → camicie; valigia → valigie"],
                     ["-cia, -gia (consonante antes)", "-ce, -ge", "arancia → arance; spiaggia → spiagge"],
                     ["-io (i átona)", "-i", "figlio → figli"],
                     ["-io (i tónica)", "-ii", "zio → zii"]]},
  "warn": "Excepciones llanas sin *h*: *amico → amici*, *greco → greci*, "
          "*nemico → nemici*."},

 {"h": "Los que no cambian",
  "r": "**Invariables**: terminados en consonante, en vocal con tilde, "
       "monosílabos y en *-i*. Solo cambia el artículo.",
  "ex": [["il film → i film", "consonante"],
         ["la città → le città; il caffè → i caffè", "vocal con tilde"],
         ["il re → i re", "monosílabo"],
         ["la crisi → le crisi", "en -i"],
         ["Le città italiane sono belle.", "Las ciudades italianas son lindas."]]},

 {"h": "Irregulares de todos los días",
  "r": "Pocos, pero frecuentes. Varias partes del cuerpo hacen el plural en "
       "**-a** y pasan a femenino: *il braccio → le braccia*.",
  "table": {"head": ["Singular", "Plural", "Nota"],
            "rows": [["l'uomo", "gli uomini", "el hombre"],
                     ["l'uovo (m.)", "le uova (f.)", "cambia de género"],
                     ["il braccio", "le braccia", "partes del cuerpo: plural en -a"],
                     ["il dito", "le dita", "íd."],
                     ["il ginocchio", "le ginocchia", "íd."],
                     ["la mano", "le mani", "femenino aunque termine en -o"],
                     ["il paio", "le paia", "el par"],
                     ["il dio", "gli dei", "el dios"]]}},

 {"h": "Géneros que no coinciden",
  "r": "No confíes en el castellano: *il latte, il sale, il fiore, il miele* "
       "son masculinos; *la fine, l'origine, la domenica, l'arte* son "
       "femeninos.",
  "warn": "*il sangue* (la sangre), *il costume* (la costumbre), *il "
          "carcere* (la cárcel), *l'analisi* (f., el análisis). Son las que "
          "más puntos hacen perder.",
  "more": ["Los helenismos en *-ma* y *-eta* son masculinos como en "
           "castellano y hacen el plural en *-i*: *il problema → i "
           "problemi*, *il programma, il sistema, il tema, il poeta*."]},

 {"h": "Los de -ista",
  "r": "En singular sirven para los dos géneros (*il / la giornalista*); en "
       "plural se separan: *i giornalisti* / *le giornaliste*.",
  "ex": [["il turista / la turista", "el turista / la turista"],
         ["i turisti / le turiste", "los turistas / las turistas"]]},
]},

3: {
"intro": "El artículo depende del género y también del **sonido** con que "
         "empieza la palabra siguiente. Además, el italiano pone artículo en "
         "lugares donde el castellano no.",
"blocks": [
 {"h": "Determinados: el sonido decide",
  "r": "*il / i* ante consonante; *l' / gli* ante vocal; *lo / gli* ante **s "
       "+ consonante, z, gn, ps, pn, x, y**. Femenino: *la / le*, *l'* ante "
       "vocal.",
  "table": {"head": ["Contexto", "Sing.", "Plur.", "Ejemplo"],
            "rows": [["masc. ante consonante común", "il", "i", "il libro → i libri"],
                     ["masc. ante vocal", "l'", "gli", "l'amico → gli amici"],
                     ["masc. ante s+consonante, z, gn, ps, pn, x, y", "lo", "gli", "lo studente → gli studenti; lo zio → gli zii"],
                     ["fem. ante consonante", "la", "le", "la casa → le case"],
                     ["fem. ante vocal", "l'", "le", "l'amica → le amiche"]]},
  "tip": "*s impura* = *s* seguida de consonante: *lo sport*, *lo studio*, "
         "*lo specchio*."},

 {"h": "Indeterminados: un, uno, una, un'",
  "r": "*un* ante consonante y vocal; *uno* donde iría *lo*; *una* femenino; "
       "*un'* femenino ante vocal.",
  "ex": [["un libro, un amico", "masculino: sin apóstrofo"],
         ["uno studente, uno zaino", "como lo"],
         ["una casa", "femenino"],
         ["un'amica", "femenino ante vocal: con apóstrofo"]],
  "warn": "*un amico* sin apóstrofo, *un'amica* con apóstrofo. El apóstrofo "
          "marca el femenino: pregunta clásica de examen."},

 {"h": "Preposiciones articuladas",
  "r": "*di, a, da, in, su* + artículo determinado se **fusionan siempre**, "
       "con todos los artículos: *di + il = del*, *in + la = nella*.",
  "table": {"head": ["", "il", "lo", "l'", "i", "gli", "la", "le"],
            "rows": [["di", "del", "dello", "dell'", "dei", "degli", "della", "delle"],
                     ["a", "al", "allo", "all'", "ai", "agli", "alla", "alle"],
                     ["da", "dal", "dallo", "dall'", "dai", "dagli", "dalla", "dalle"],
                     ["in", "nel", "nello", "nell'", "nei", "negli", "nella", "nelle"],
                     ["su", "sul", "sullo", "sull'", "sui", "sugli", "sulla", "sulle"]]}},

 {"h": "El partitivo: «algo de», «unos»",
  "r": "*di* + artículo expresa una cantidad indeterminada, donde el "
       "castellano no pone nada o pone «unos».",
  "ex": [["Compro del pane.", "Compro pan."],
         ["C'è dell'acqua in frigo.", "Hay agua en la heladera."],
         ["Ho degli amici a Roma.", "Tengo (unos) amigos en Roma."]]},

 {"h": "Artículo donde el castellano no lo pone",
  "r": "Llevan artículo: **posesivos** (*il mio libro*), años (*nel 1999*), "
       "países y regiones (*l'Italia*), lenguas (*studio l'italiano*).",
  "ex": [["La mia casa è grande.", "Mi casa es grande."],
         ["L'Italia è bella.", "Italia es linda."],
         ["il lunedì", "los lunes (costumbre)"]],
  "warn": "Sin artículo: ciudades (*Roma è bella*) y parientes en singular "
          "sin adjetivo (*mio padre, mia sorella*). Pero *i miei fratelli*, "
          "*il loro padre*, *la mia sorellina*."},
]},

4: {
"intro": "El adjetivo concuerda como en castellano. Lo nuevo: su posición, "
         "que puede cambiar el sentido, y algunos adjetivos que se deforman "
         "delante del sustantivo.",
"blocks": [
 {"h": "Dos clases y nada más",
  "r": "Los adjetivos en *-o* tienen **4 formas**; los en *-e*, **2**. Con "
       "géneros mezclados gana el masculino plural.",
  "table": {"head": ["Clase", "m.sg", "f.sg", "m.pl", "f.pl", "Ejemplo"],
            "rows": [["en -o (4 formas)", "-o", "-a", "-i", "-e", "alto, alta, alti, alte"],
                     ["en -e (2 formas)", "-e", "-e", "-i", "-i", "grande, grande, grandi, grandi"]]},
  "ex": [["Marco e Anna sono italiani.", "Marco y Ana son italianos."]],
  "tip": "Colores que vienen de sustantivos no cambian: *blu, rosa, viola, "
         "beige* (*le borse blu*). *arancione* admite plural *arancioni*."},

 {"h": "Delante o detrás: cambia el sentido",
  "r": "Por defecto el adjetivo va **detrás**. Los frecuentes (*bello, "
       "buono, grande, vecchio, nuovo, povero*) suelen ir delante, y a veces "
       "cambian de sentido.",
  "ex": [["un uomo grande / un grand'uomo", "un hombre corpulento / un gran hombre"],
         ["un amico vecchio / un vecchio amico", "un amigo viejo / un viejo amigo"],
         ["una casa nuova / una nuova casa", "una casa nueva / otra casa"],
         ["un uomo povero / un povero uomo", "un hombre pobre / un pobre hombre"]]},

 {"h": "bello y quello copian al artículo",
  "r": "Delante del sustantivo, *bello* y *quello* toman la forma de *il / "
       "lo / l' / i / gli*. Detrás del verbo, *bello* es normal.",
  "table": {"head": ["Artículo", "bello", "quello", "Ejemplo"],
            "rows": [["il", "bel", "quel", "quel bel libro"],
                     ["lo", "bello", "quello", "quello studente"],
                     ["l'", "bell'", "quell'", "quell'albergo, un bell'albergo"],
                     ["i", "bei", "quei", "quei bei quadri"],
                     ["gli", "begli", "quegli", "quegli studenti, quei begli occhi"],
                     ["la / le", "bella / belle", "quella / quelle", "quella bella casa"]]},
  "tip": "*Che bel film!* (delante) frente a *Questo film è bello* (detrás, "
         "forma plena)."},

 {"h": "buono, grande, santo se acortan",
  "r": "*buono* delante copia a *un / uno / una / un'*. *grande* → *gran*, "
       "*grand'*. *santo* → *san*, *sant'*.",
  "ex": [["un buon amico, un buono studente", "como un / uno"],
         ["una buona idea, una buon'amica", "como una / un'"],
         ["un gran successo, un grand'uomo", "un gran éxito, un gran hombre"],
         ["San Marco, Santo Stefano, Sant'Antonio", "ante consonante, s impura, vocal"]],
  "warn": "El castellano apocopa *buen* y *san* solo en masculino. El "
          "italiano también tiene *buon'amica* en femenino."},
]},

5: {
"intro": "El presente sostiene casi todo lo que vas a decir los primeros "
         "meses. Las tres conjugaciones se parecen al castellano, pero el "
         "acento y algunas grafías cambian.",
"blocks": [
 {"h": "Las tres conjugaciones",
  "r": "*tu* termina **siempre en -i** y *noi* **siempre en -iamo**, en las "
       "tres conjugaciones.",
  "table": {"head": ["", "-are (parlare)", "-ere (vendere)", "-ire (dormire)", "-ire -isc (finire)"],
            "rows": [["io", "parlo", "vendo", "dormo", "finisco"],
                     ["tu", "parli", "vendi", "dormi", "finisci"],
                     ["lui/lei", "parla", "vende", "dorme", "finisce"],
                     ["noi", "parliamo", "vendiamo", "dormiamo", "finiamo"],
                     ["voi", "parlate", "vendete", "dormite", "finite"],
                     ["loro", "parlano", "vendono", "dormono", "finiscono"]]},
  "warn": "*loro* se acentúa en la raíz: *PAR-lano*, *VEN-dono*, *A-bitano*, "
          "*te-LE-fonano*. Decir «parLAno» te delata enseguida."},

 {"h": "Los verbos en -isc-",
  "r": "Muchos verbos en *-ire* meten **-isc-** en todas las personas menos "
       "*noi* y *voi*. No hay regla: se aprenden con la palabra.",
  "ex": [["Non capisco.", "No entiendo."],
         ["Capiamo tutto.", "Entendemos todo."],
         ["Preferisco il tè.", "Prefiero el té."]],
  "tip": "Los más usados: *finire, capire, preferire, pulire, spedire, "
         "costruire, unire, guarire, colpire, restituire*."},

 {"h": "Grafías que cambian la raíz",
  "r": "La escritura sigue al **sonido**: *cercare → cerchi* (conserva la "
       "k); *mangiare → mangi* (la *i* sobra).",
  "table": {"head": ["Infinitivo", "Qué pasa", "tu", "noi"],
            "rows": [["cercare, pagare", "se agrega h para mantener el sonido duro", "cerchi, paghi", "cerchiamo, paghiamo"],
                     ["cominciare, mangiare", "se pierde la i de la raíz", "cominci, mangi", "cominciamo, mangiamo"],
                     ["studiare (i átona)", "se funden las dos i", "studi", "studiamo"],
                     ["sciare (i tónica)", "se conservan las dos", "scii", "sciamo"]]}},

 {"h": "El sujeto se omite; Lei para usted",
  "r": "La terminación ya dice quién habla: *io, tu, lui* solo para "
       "enfatizar. El trato formal es **Lei** + tercera persona singular.",
  "ex": [["Io lavoro, tu no.", "Yo trabajo, vos no."],
         ["Lei parla italiano?", "¿Usted habla italiano?"]]},
]},

6: {
"intro": "Unos quince irregulares cubren media conversación. Y una "
         "diferencia grande con el castellano: el italiano casi nunca "
         "diptonga.",
"blocks": [
 {"h": "Los cuatro pilares",
  "r": "*essere, avere, andare, stare*: de memoria. La *h* de *ho, hai, ha, "
       "hanno* **no suena**; solo distingue en la escritura.",
  "table": {"head": ["", "essere", "avere", "andare", "stare"],
            "rows": [["io", "sono", "ho", "vado", "sto"],
                     ["tu", "sei", "hai", "vai", "stai"],
                     ["lui/lei", "è", "ha", "va", "sta"],
                     ["noi", "siamo", "abbiamo", "andiamo", "stiamo"],
                     ["voi", "siete", "avete", "andate", "state"],
                     ["loro", "sono", "hanno", "vanno", "stanno"]]}},

 {"h": "Modales, sapere y fare",
  "r": "*potere, volere, dovere* van seguidos de **infinitivo**: *posso "
       "venire*. *sapere* = saber; *fare* = hacer.",
  "table": {"head": ["", "potere", "volere", "dovere", "sapere", "fare"],
            "rows": [["io", "posso", "voglio", "devo", "so", "faccio"],
                     ["tu", "puoi", "vuoi", "devi", "sai", "fai"],
                     ["lui/lei", "può", "vuole", "deve", "sa", "fa"],
                     ["noi", "possiamo", "vogliamo", "dobbiamo", "sappiamo", "facciamo"],
                     ["voi", "potete", "volete", "dovete", "sapete", "fate"],
                     ["loro", "possono", "vogliono", "devono", "sanno", "fanno"]]},
  "ex": [["Devo lavorare.", "Tengo que trabajar."],
         ["Vuoi un caffè?", "¿Querés un café?"]]},

 {"h": "Seis irregulares más",
  "r": "*venire, uscire, dire, bere, dare, rimanere*. Varios meten una **g** "
       "solo en *io* y *loro*: *rimango / rimangono*.",
  "table": {"head": ["", "venire", "uscire", "dire", "bere", "dare", "rimanere"],
            "rows": [["io", "vengo", "esco", "dico", "bevo", "do", "rimango"],
                     ["tu", "vieni", "esci", "dici", "bevi", "dai", "rimani"],
                     ["lui/lei", "viene", "esce", "dice", "beve", "dà", "rimane"],
                     ["noi", "veniamo", "usciamo", "diciamo", "beviamo", "diamo", "rimaniamo"],
                     ["voi", "venite", "uscite", "dite", "bevete", "date", "rimanete"],
                     ["loro", "vengono", "escono", "dicono", "bevono", "danno", "rimangono"]]},
  "tip": "Si sabés la forma de *io*, casi siempre deducís la de *loro*."},

 {"h": "El italiano no diptonga",
  "r": "Donde el castellano rompe la vocal (*puedo, duermo, pienso*), el "
       "italiano **la deja entera**: *posso, dormo, penso*.",
  "ex": [["Non posso venire.", "No puedo venir."],
         ["Dormo poco.", "Duermo poco."],
         ["Penso di sì.", "Pienso que sí."],
         ["Quanto costa?", "¿Cuánto cuesta?"]],
  "warn": "Excepciones pocas: *vieni, vuole, può*. En *gioco* la *i* es solo "
          "gráfica. Si tu instinto quiere diptongar, frenalo."},

 {"h": "essere o stare",
  "r": "*stare* = «estar» **de salud** y «quedarse». Estados, cualidades y "
       "ubicación van con *essere*.",
  "ex": [["Come stai?", "¿Cómo estás?"],
         ["Stasera sto a casa.", "Esta noche me quedo en casa."],
         ["Sono stanco.", "Estoy cansado."],
         ["Sono a Roma.", "Estoy en Roma."],
         ["La porta è aperta.", "La puerta está abierta."]]},

 {"h": "stare + gerundio",
  "r": "*stare* + gerundio = acción **en curso ahora mismo**. Gerundio: "
       "*-are → -ando*, *-ere / -ire → -endo*.",
  "ex": [["Sto leggendo un libro.", "Estoy leyendo un libro."],
         ["Cosa stai facendo?", "¿Qué estás haciendo?"],
         ["Stiamo cenando.", "Estamos cenando."]],
  "warn": "Se usa mucho menos que en castellano. Costumbres y planes van en "
          "presente: *lavoro a Milano* (estoy trabajando en Milán), *stasera "
          "esco*.",
  "more": ["Los irregulares salen de la raíz larga: *fare → facendo*, *dire "
           "→ dicendo*, *bere → bevendo*."]},
]},

7: {
"intro": "Números, fechas y horas: tres o cuatro convenciones distintas del "
         "castellano que vas a usar todos los días.",
"blocks": [
 {"h": "Cardinales: una sola palabra",
  "r": "Se escriben **pegados**: *ventidue, centoventitré*. *-uno* y *-otto* "
       "comen la vocal de la decena: *ventuno, ventotto*. Desde *venti*, "
       "*tre* lleva tilde.",
  "table": {"head": ["", "", "", ""],
            "rows": [["1 uno", "11 undici", "21 ventuno", "100 cento"],
                     ["2 due", "12 dodici", "22 ventidue", "200 duecento"],
                     ["3 tre", "13 tredici", "23 ventitré", "1.000 mille"],
                     ["4 quattro", "14 quattordici", "30 trenta", "2.000 duemila"],
                     ["5 cinque", "15 quindici", "40 quaranta", "10.000 diecimila"],
                     ["6 sei", "16 sedici", "50 cinquanta", "1.000.000 un milione"],
                     ["7 sette", "17 diciassette", "60 sessanta", ""],
                     ["8 otto", "18 diciotto", "70 settanta", ""],
                     ["9 nove", "19 diciannove", "80 ottanta", ""],
                     ["10 dieci", "20 venti", "90 novanta", ""]]},
  "warn": "*cento* no cambia (*trecento*); *mille* → *mila* pegado "
          "(*duemila*). *milione* y *miliardo* son sustantivos: *due milioni "
          "di persone*."},

 {"h": "Ordinales",
  "r": "Del 1 al 10, forma propia. Desde el 11: cardinal sin vocal final + "
       "**-esimo**: *undicesimo, ventesimo*. Concuerdan como adjetivos en "
       "*-o*.",
  "ex": [["primo, secondo, terzo, quarto, quinto", "1.º a 5.º"],
         ["sesto, settimo, ottavo, nono, decimo", "6.º a 10.º"],
         ["ventitreesimo", "23.º: la e de tre se conserva"],
         ["la prima volta", "la primera vez"]]},

 {"h": "Fechas",
  "r": "*il* + número + mes, **sin «de»**. Cardinal para todos los días "
       "salvo el 1, que es *primo*.",
  "ex": [["Oggi è il 5 maggio.", "Hoy es el 5 de mayo."],
         ["Il primo gennaio.", "El primero de enero."],
         ["Nel 2003.", "En 2003."]],
  "tip": "Meses y días van en minúscula: *lunedì, gennaio*. 5/8 es el 5 de "
         "agosto, como en castellano."},

 {"h": "La hora",
  "r": "*Che ora è?* o *Che ore sono?* Se responde en **plural** con *le*: "
       "*Sono le tre*. En singular solo *l'una*, *mezzogiorno*, "
       "*mezzanotte*.",
  "ex": [["Sono le tre. / È l'una.", "Son las tres. / Es la una."],
         ["Sono le due e un quarto.", "Son las dos y cuarto."],
         ["Sono le otto e mezza.", "Son las ocho y media."],
         ["Sono le cinque meno un quarto.", "Son las cinco menos cuarto."],
         ["Il treno parte alle 14:30.", "El tren sale a las 14:30."]],
  "warn": "«A las…» es *alle tre*, pero *all'una*, *a mezzogiorno*, *a "
          "mezzanotte*.",
  "more": ["En trenes, cines y oficinas el italiano usa el reloj de 24 horas "
           "mucho más que el castellano rioplatense: *alle diciotto* (a las "
           "seis de la tarde). También se dice *le sette e quarantacinque*."]},
]},

8: {
"intro": "Preguntar en italiano es casi igual que en castellano: sin "
         "inversión ni auxiliar. Cambian la posición de la preposición y "
         "algunas formas fijas.",
"blocks": [
 {"h": "Sí o no: solo entonación",
  "r": "La pregunta es la afirmación con **entonación** de pregunta. Se "
       "escribe solo el signo de cierre, al final; el de apertura no se usa.",
  "ex": [["Parli italiano. → Parli italiano?", "Hablás italiano. → ¿Hablás italiano?"],
         ["Vieni con noi?", "¿Venís con nosotros?"],
         ["Hai fame?", "¿Tenés hambre?"],
         ["Non sei d'accordo?", "¿No estás de acuerdo?"]]},

 {"h": "Los interrogativos",
  "r": "Van al principio. *quanto* concuerda (*quanti anni*); *perché* sirve "
       "para «por qué» **y** «porque».",
  "table": {"head": ["Palabra", "Sentido", "Ejemplo"],
            "rows": [["chi", "quién", "Chi è?"],
                     ["che / che cosa / cosa", "qué", "Cosa fai?"],
                     ["quale / quali", "cuál(es)", "Quale preferisci?"],
                     ["quanto/a/i/e", "cuánto", "Quanti anni hai?"],
                     ["come", "cómo", "Come stai?"],
                     ["dove", "dónde", "Dove abiti?"],
                     ["quando", "cuándo", "Quando parti?"],
                     ["perché", "por qué / porque", "Perché non vieni?"],
                     ["come mai", "cómo es que", "Come mai sei qui?"]]},
  "ex": [["Perché non vieni? — Perché sono stanco.", "¿Por qué no venís? — Porque estoy cansado."]]},

 {"h": "La preposición va adelante",
  "r": "La preposición **abre** la pregunta, nunca queda al final ni se "
       "omite.",
  "ex": [["Di chi è questa borsa?", "¿De quién es esta cartera?"],
         ["Con chi esci stasera?", "¿Con quién salís esta noche?"],
         ["A che ora comincia?", "¿A qué hora empieza?"],
         ["Da dove vieni?", "¿De dónde venís?"],
         ["Di che cosa parlate?", "¿De qué hablan?"]]},

 {"h": "che o quale; qual è",
  "r": "*che* pregunta qué tipo de cosa; *quale* pide **elegir** entre "
       "opciones conocidas.",
  "ex": [["Che libro leggi?", "¿Qué (tipo de) libro leés?"],
         ["Quale libro preferisci, questo o quello?", "¿Cuál preferís, este o aquel?"],
         ["Qual è il problema?", "¿Cuál es el problema?"]],
  "warn": "*Qual è* va **sin apóstrofo**: es un truncamiento, no una "
          "elisión. «Qual'è» es de las faltas más marcadas por los "
          "correctores."},

 {"h": "El sujeto va al final",
  "r": "Si la pregunta tiene sujeto explícito, va **después del verbo**, al "
       "final.",
  "ex": [["Dove abita Marco?", "¿Dónde vive Marco?"],
         ["Che cosa dice il professore?", "¿Qué dice el profesor?"],
         ["Quanto costano queste scarpe?", "¿Cuánto cuestan estos zapatos?"]]},
]},

9: {
"intro": "Las preposiciones son donde la traducción literal falla más "
         "rápido. Unos pocos patrones cubren la mayoría de los casos y "
         "evitan los errores más visibles.",
"blocks": [
 {"h": "Las ocho preposiciones simples",
  "r": "*di, a, da, in, con, su, per, tra / fra*. Cada una tiene varios "
       "valores: aprendelas **con su ejemplo**, no con una traducción.",
  "table": {"head": ["Prep.", "Valores principales", "Ejemplo"],
            "rows": [["di", "posesión, materia, origen, cantidad", "il libro di Marco; sono di Roma"],
                     ["a", "destino a ciudad, hora, complemento indirecto", "vado a Roma; alle otto; scrivo a Luca"],
                     ["da", "origen, casa de alguien, agente, finalidad, duración", "vengo da Milano; vado da Anna"],
                     ["in", "lugar cerrado, países, medios de transporte", "in Italia; in banca; in treno"],
                     ["con", "compañía, instrumento", "esco con Anna"],
                     ["su", "sobre, acerca de", "sul tavolo; un libro su Dante"],
                     ["per", "finalidad, destino, duración", "parto per Roma; per due ore"],
                     ["tra / fra", "entre; dentro de (tiempo)", "tra amici; torno tra un'ora"]]}},

 {"h": "a o in",
  "r": "**a** con ciudades; **in** con países, regiones y continentes. Para "
       "los lugares comunes, memorizá el par.",
  "ex": [["Vivo a Bologna, in Italia.", "Vivo en Bolonia, en Italia."],
         ["Vado in Francia in macchina.", "Voy a Francia en auto."],
         ["Sono in ufficio fino alle sei.", "Estoy en la oficina hasta las seis."]],
  "tip": "Con *in*: *banca, centro, ufficio, montagna, chiesa, piazza, "
         "farmacia*. Con *a*: *al cinema, al mare, al ristorante, a teatro, "
         "a scuola, a casa, a letto*."},

 {"h": "da, la que no tiene equivalente",
  "r": "*da* no tiene traducción única. Estos cinco usos aparecen **todo el "
       "tiempo**.",
  "table": {"head": ["Uso", "Ejemplo", "Castellano"],
            "rows": [["procedencia", "Vengo da Napoli.", "Vengo de Nápoles."],
                     ["casa / negocio de alguien", "Vado dal medico.", "Voy al médico."],
                     ["finalidad del objeto", "occhiali da sole", "anteojos de sol"],
                     ["agente de la pasiva", "scritto da Calvino", "escrito por Calvino"],
                     ["duración que sigue abierta", "Studio italiano da due anni.", "Estudio italiano desde hace dos años."]]}},

 {"h": "Presente + da: lo que sigue pasando",
  "r": "Para algo que empezó antes y **sigue**: **presente + da** + tiempo. "
       "Nunca pasado.",
  "ex": [["Abito qui da cinque anni.", "Vivo acá desde hace cinco años."],
         ["Ti aspetto da un'ora!", "¡Hace una hora que te espero!"]],
  "warn": "El castellano dice «hace… que». El italiano no usa *fa* ni pasado "
          "acá: *studio da due anni*, no «studio fa due anni»."},

 {"h": "Verbos con su preposición",
  "r": "Muchos verbos llevan una preposición fija, distinta del castellano. "
       "Aprendé **verbo + preposición** juntos.",
  "ex": [["pensare a, credere a / in", "pensar en, creer en"],
         ["sognare di, innamorarsi di", "soñar con, enamorarse de"],
         ["entrare in, salire su", "entrar en / a, subir a"],
         ["dipendere da, sposarsi con", "depender de, casarse con"],
         ["cominciare a, finire di", "empezar a, terminar de"]],
  "warn": "*cerco un libro*, *ascolto la musica*, *aspetto Marco*: **sin** "
          "preposición. Con persona el castellano pone «a» (espero a Marco); "
          "el italiano no."},
]},

10: {
"intro": "Los pronombres son el corazón del italiano hablado. Esta semana, "
         "el mapa completo: directos, indirectos y tónicos, y dónde se "
         "ponen.",
"blocks": [
 {"h": "El cuadro entero",
  "r": "Los **átonos** van delante del verbo: *ti vedo*. Los **tónicos**, "
       "después de preposición o para enfatizar: *con me*, *per te*.",
  "table": {"head": ["Sujeto", "Directo", "Indirecto", "Tónico (tras prep.)"],
            "rows": [["io", "mi", "mi", "me"],
                     ["tu", "ti", "ti", "te"],
                     ["lui", "lo", "gli", "lui"],
                     ["lei", "la", "le", "lei"],
                     ["Lei (formal)", "La", "Le", "Lei"],
                     ["noi", "ci", "ci", "noi"],
                     ["voi", "vi", "vi", "voi"],
                     ["loro", "li / le", "gli (loro)", "loro"]]},
  "ex": [["Lo dico a te, non a lui.", "Te lo digo a vos, no a él."]]},

 {"h": "Directo o indirecto",
  "r": "Directo: sin preposición (*vedo Marco → lo vedo*). Indirecto: con "
       "*a* (*telefono a Marco → gli telefono*). Solo cambia en tercera "
       "persona.",
  "ex": [["Vedo Marco → Lo vedo.", "Veo a Marco → Lo veo."],
         ["Telefono a Marco → Gli telefono.", "Llamo a Marco → Lo llamo (en it., indirecto)."],
         ["Vedo Anna → La vedo.", "Veo a Ana → La veo."],
         ["Scrivo ad Anna → Le scrivo.", "Le escribo a Ana."],
         ["Conosco i tuoi amici → Li conosco.", "Conozco a tus amigos."]]},

 {"h": "Sin leísmo y sin «a» personal",
  "r": "*le* singular es **siempre indirecto** femenino. Y el objeto directo "
       "de persona va **sin *a***: *vedo Marco*.",
  "warn": "«Le vedo» por «lo veo» es error grave: *le vedo* solo significa "
          "«las veo». Y nunca «vedo a Marco»."},

 {"h": "Dónde se coloca el pronombre",
  "r": "Delante del verbo conjugado (*ti chiamo*); **pegado** al infinitivo "
       "(*voglio chiamarti*). Con modales valen las dos: *ti voglio vedere* "
       "= *voglio vederti*.",
  "tip": "El infinitivo pierde la *-e* final: *vedere* + *ti* → *vederti*.",
  "more": ["También se pega al gerundio (*chiamandoti*) y al imperativo "
           "informal (*chiamami!*), que llega en la semana 12."]},
]},

11: {
"intro": "El passato prossimo cubre el «comí» y el «he comido» castellanos: "
         "*ieri ho mangiato* = ayer comí. La forma es fácil; lo que se "
         "entrena es elegir el auxiliar.",
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
  "r": "*avere* con los verbos que pueden llevar objeto directo. *essere* "
       "con movimiento, permanencia, cambio de estado, reflexivos e "
       "impersonales, y la familia de *piacere*.",
  "table": {"head": ["Grupo (con essere)", "Verbos"],
            "rows": [["movimiento", "andare, venire, arrivare, partire, uscire, entrare, tornare, salire, scendere, cadere"],
                     ["permanencia", "restare, rimanere, stare"],
                     ["cambio de estado", "nascere, morire, diventare, crescere, guarire, dimagrire"],
                     ["existencia", "essere, esserci"],
                     ["gustar y afines", "piacere, mancare, sembrare, costare, servire, bastare, succedere"],
                     ["todos los reflexivos", "alzarsi, lavarsi, divertirsi..."]]},
  "ex": [["Ho letto il libro.", "Leí el libro."],
         ["Sono andato a Roma.", "Fui a Roma."],
         ["Ti è piaciuto il film?", "¿Te gustó la película?"]],
  "warn": "No todo movimiento va con *essere*: *camminare, viaggiare, "
          "nuotare* van con *avere*. Y *essere* usa *essere* (*sono stato*); "
          "*avere* usa *avere* (*ho avuto*)."},

 {"h": "Con essere, el participio concuerda",
  "r": "Con *essere*, el participio **concuerda con el sujeto** en género y "
       "número: *-o, -a, -i, -e*.",
  "ex": [["Marco è partito. / Anna è partita.", "Marco se fue. / Ana se fue."],
         ["Siamo arrivati tardi.", "Llegamos tarde."],
         ["Le ragazze sono uscite.", "Las chicas salieron."]]},

 {"h": "Verbos con los dos auxiliares",
  "r": "Algunos aceptan los dos, con sentido distinto: **con objeto directo, "
       "*avere***; sin objeto, *essere*.",
  "ex": [["Ho cambiato idea. / Sono cambiato molto.", "Cambié de idea. / Cambié mucho (yo)."],
         ["Ho finito il lavoro. / Il film è finito.", "Terminé el trabajo. / La película terminó."],
         ["Ho passato tre giorni lì. / Sono passato da casa tua.", "Pasé tres días ahí. / Pasé por tu casa."],
         ["Ho salito le scale. / Sono salito sul treno.", "Subí las escaleras. / Me subí al tren."]]},

 {"h": "Modales: manda el infinitivo",
  "r": "Con *potere, volere, dovere*, el auxiliar lo elige el infinitivo que "
       "sigue: *ho dovuto studiare*, pero *sono dovuto andare*.",
  "ex": [["Ho voluto vedere il film.", "Quise ver la película."],
         ["Sono dovuta partire presto.", "Tuve que irme temprano."]],
  "tip": "Al hablar, *avere* se impone cada vez más (*ho dovuto andare*). En "
         "el examen, usá la forma canónica."},

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
  "r": "Los adverbios cortos (*già, mai, ancora, sempre, appena*) van "
       "**entre** el auxiliar y el participio.",
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
  "warn": "*lo* y *la* se apostrofan ante *ho*: *l'ho visto*, *l'ho vista*. "
          "*li* y *le*, nunca: *li ho visti*."},
]},

12: {
"intro": "Reflexivos e imperativo: la rutina diaria y las órdenes. Comparten "
         "un rasgo clave: el pronombre se pega al final del verbo.",
"blocks": [
 {"h": "Los reflexivos",
  "r": "Pronombre *mi, ti, si, ci, vi, si* delante del verbo. El infinitivo "
       "se cita con *-si* pegado: *alzarsi, lavarsi, chiamarsi*.",
  "table": {"head": ["", "alzarsi (sing.)", "", "alzarsi (pl.)"],
            "rows": [["io", "mi alzo", "noi", "ci alziamo"],
                     ["tu", "ti alzi", "voi", "vi alzate"],
                     ["lui/lei", "si alza", "loro", "si alzano"]]},
  "ex": [["Mi chiamo Luca.", "Me llamo Luca."],
         ["A che ora ti svegli?", "¿A qué hora te despertás?"]]},

 {"h": "Reflexivos que no coinciden",
  "r": "Algunos son reflexivos en italiano y no en castellano, o llevan otra "
       "preposición. Aprendelos con su **di** o **con**.",
  "ex": [["ricordarsi di / dimenticarsi di", "acordarse de / olvidarse de"],
         ["accorgersi di", "darse cuenta de"],
         ["sbagliarsi, trasferirsi", "equivocarse, mudarse"],
         ["laurearsi", "recibirse"],
         ["sposarsi con qualcuno", "casarse con alguien (no «sposare a»)"]]},

 {"h": "El imperativo informal",
  "r": "Igual que el presente, salvo *tu* de los verbos en **-are**, que "
       "termina en *-a*: *tu parli* → *Parla!*",
  "table": {"head": ["", "-are (parlare)", "-ere (prendere)", "-ire (dormire)", "-isc (finire)"],
            "rows": [["tu", "parla!", "prendi!", "dormi!", "finisci!"],
                     ["noi", "parliamo!", "prendiamo!", "dormiamo!", "finiamo!"],
                     ["voi", "parlate!", "prendete!", "dormite!", "finite!"]]},
  "ex": [["Chiamami!", "¡Llamame!"],
         ["Alzati!", "¡Levantate!"]]},

 {"h": "El negativo de tu",
  "r": "*tu* negativo = **non + infinitivo**. En *noi* y *voi* alcanza con "
       "anteponer *non*.",
  "ex": [["Non parlare!", "¡No hables!"],
         ["Non andare!", "¡No vayas!"],
         ["Non ti preoccupare!", "¡No te preocupes!"],
         ["Non parlate!", "¡No hablen!"]]},

 {"h": "Adelanto: el formal es un subjuntivo",
  "r": "Para *Lei* se usa el congiuntivo presente (semana 24). Por ahora, "
       "**reconocelo**: el pronombre va **delante**, no pegado.",
  "ex": [["Scusi! / Senta!", "¡Disculpe! / ¡Oiga!"],
         ["Venga! / Prenda!", "¡Venga! / ¡Tome!"],
         ["Mi dica!", "¡Dígame!"],
         ["Si accomodi!", "¡Siéntese!"],
         ["Faccia pure!", "¡Hágalo nomás!"]]},

 {"h": "Formas cortas: consonante doble",
  "r": "*va', da', fa', sta', di'* + pronombre **duplican** la consonante "
       "del pronombre: *da'* + *mi* → *dammi*.",
  "ex": [["Dammi la mano!", "¡Dame la mano!"],
         ["Dimmi tutto.", "Decime todo."],
         ["Fallo subito!", "¡Hacelo ya!"],
         ["Vacci tu!", "¡Andá vos!"],
         ["Stammi bene.", "Cuidate."]],
  "warn": "Única excepción: *gli* no se duplica. *Dagli il libro*, nunca "
          "«daggli»."},
]},

13: {
"intro": "Semana de jefe final: no hay teoría nueva. Es la hoja de repaso "
         "del examen A2. Leela antes de entrar y volvé cada vez que falles.",
"blocks": [
 {"h": "Artículos, de un vistazo",
  "r": "Mirá **género** y **primer sonido** de la palabra siguiente.",
  "table": {"head": ["", "consonante", "vocal", "s+cons., z, gn, ps"],
            "rows": [["masc. sing.", "il", "l'", "lo"],
                     ["masc. pl.", "i", "gli", "gli"],
                     ["fem. sing.", "la", "l'", "la"],
                     ["fem. pl.", "le", "le", "le"],
                     ["indet. masc.", "un", "un", "uno"],
                     ["indet. fem.", "una", "un'", "una"]]}},

 {"h": "Presente: las terminaciones",
  "r": "*tu* en **-i** y *noi* en **-iamo** siempre. *-isc-* en todas menos "
       "*noi* y *voi*.",
  "table": {"head": ["", "-are", "-ere", "-ire", "-isc"],
            "rows": [["io", "-o", "-o", "-o", "-isco"],
                     ["tu", "-i", "-i", "-i", "-isci"],
                     ["lui", "-a", "-e", "-e", "-isce"],
                     ["noi", "-iamo", "-iamo", "-iamo", "-iamo"],
                     ["voi", "-ate", "-ete", "-ite", "-ite"],
                     ["loro", "-ano", "-ono", "-ono", "-iscono"]]}},

 {"h": "Irregulares: essere a fare",
  "r": "Los que más aparecen en el examen. **Sin diptongo** y con el acento "
       "de *loro* en la raíz.",
  "table": {"head": ["", "essere", "avere", "andare", "fare", "venire"],
            "rows": [["io", "sono", "ho", "vado", "faccio", "vengo"],
                     ["tu", "sei", "hai", "vai", "fai", "vieni"],
                     ["lui/lei", "è", "ha", "va", "fa", "viene"],
                     ["noi", "siamo", "abbiamo", "andiamo", "facciamo", "veniamo"],
                     ["voi", "siete", "avete", "andate", "fate", "venite"],
                     ["loro", "sono", "hanno", "vanno", "fanno", "vengono"]]}},

 {"h": "Irregulares: modales, dire, uscire",
  "r": "*potere, volere, dovere* + **infinitivo**. *dire* y *uscire* cambian "
       "la raíz: *dico*, *esco*.",
  "table": {"head": ["", "potere", "volere", "dovere", "dire", "uscire"],
            "rows": [["io", "posso", "voglio", "devo", "dico", "esco"],
                     ["tu", "puoi", "vuoi", "devi", "dici", "esci"],
                     ["lui/lei", "può", "vuole", "deve", "dice", "esce"],
                     ["noi", "possiamo", "vogliamo", "dobbiamo", "diciamo", "usciamo"],
                     ["voi", "potete", "volete", "dovete", "dite", "uscite"],
                     ["loro", "possono", "vogliono", "devono", "dicono", "escono"]]}},

 {"h": "Pronombres",
  "r": "Átonos **delante** del verbo conjugado; tónicos **después** de "
       "preposición.",
  "table": {"head": ["Directo", "Indirecto", "Reflexivo", "Tónico"],
            "rows": [["mi, ti, lo, la", "mi, ti, gli, le", "mi, ti, si", "me, te, lui, lei"],
                     ["ci, vi, li, le", "ci, vi, gli", "ci, vi, si", "noi, voi, loro"]]}},

 {"h": "Passato prossimo: auxiliar y participio",
  "r": "*avere* con objeto directo; *essere* con movimiento, cambio de "
       "estado y reflexivos, y entonces el participio **concuerda**.",
  "table": {"head": ["", "con avere", "con essere"],
            "rows": [["io", "ho mangiato", "sono andato/a"],
                     ["lei", "ha visto", "è partita"],
                     ["noi", "abbiamo fatto", "siamo arrivati/e"],
                     ["loro", "hanno detto", "sono usciti/e"]]},
  "warn": "Irregulares de memoria: *fatto, detto, visto, preso, messo, scritto, "
          "letto, venuto, stato*."},

 {"h": "Reflexivos e imperativo",
  "r": "Pronombre reflexivo **delante** del verbo: *mi alzo*. En el "
       "imperativo de *tu*, **pegado**: *alzati!*; en negativo, *non* + "
       "infinitivo.",
  "ex": [["Mi alzo alle sette.", "Me levanto a las siete."],
         ["Parla più piano!", "¡Hablá más despacio!"],
         ["Non parlare!", "¡No hables!"],
         ["Dimmi!", "¡Decime!"]]},

 {"h": "Las cinco trampas del hispanohablante",
  "r": "Repasalas antes del examen: son las que más puntos cuestan.",
  "ex": [["posso, dormo, penso", "1. No diptongar."],
         ["PAR-lano, A-bitano", "2. loro: acento en la raíz."],
         ["il mio libro", "3. Artículo con el posesivo."],
         ["Vedo Marco.", "4. Sin «a» ante el objeto directo."],
         ["Studio da due anni.", "5. Presente + da para lo que sigue."]]},
]},

}
