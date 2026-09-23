# -*- coding: utf-8 -*-
"""Stagione 1 — Le Fondamenta (settimane 1-13, A1 → A2)."""

LESSONS = {

1: {
"intro": "El italiano y el castellano se escriben con el mismo alfabeto pero no "
         "suenan igual. Antes de aprender una sola regla de gramática conviene "
         "saber leer en voz alta, porque casi todo el sistema —plurales, "
         "conjugaciones, artículos— se explica por el sonido y no por la letra.",
"blocks": [
 {"h": "Un alfabeto de 21 letras",
  "p": ["El italiano no usa *j*, *k*, *w*, *x* ni *y* salvo en préstamos "
        "(*jazz*, *karate*, *weekend*). Tampoco existe la *ñ*: ese sonido se "
        "escribe *gn*. Y no existe la *h* con valor propio: la *h* italiana es "
        "siempre muda y solo sirve para endurecer una *c* o una *g*, o para "
        "distinguir *ho* (tengo) de *o* (o).",
        "Las cinco vocales se pronuncian limpias y sin diptongar, igual que en "
        "castellano. Esa es la buena noticia: como hispanohablante ya tenés el "
        "80% de la pronunciación resuelta."]},

 {"h": "Las consonantes que cambian según la vocal que sigue",
  "p": ["*c* y *g* son duras ante *a*, *o*, *u*, y blandas ante *e*, *i*. Para "
        "que sigan duras ante *e* o *i* se intercala una *h*; para que sean "
        "blandas ante *a*, *o*, *u* se intercala una *i* que no se pronuncia."],
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

 {"h": "Las dobles consonantes no son un adorno",
  "p": ["Esta es la única dificultad seria de pronunciación para un "
        "hispanohablante. Una consonante doble dura más y cambia el "
        "significado de la palabra. No es un detalle de acento: es la "
        "diferencia entre dos palabras distintas."],
  "ex": [["nono / nonno", "noveno / abuelo"],
         ["casa / cassa", "casa / caja"],
         ["pena / penna", "pena / lapicera"],
         ["papa / pappa", "papa (el Papa) / papilla"],
         ["sete / sette", "sed / siete"]],
  "warn": "En castellano no hay consonantes largas que distingan palabras "
          "(la *rr* y la *ll* son sonidos distintos, no alargados), así que el "
          "oído no está entrenado. Al escribir vas a olvidarte de las dobles todo el "
          "tiempo: *bello*, *sorella*, *professore*, *appartamento*, *mamma*. "
          "Es la falta más frecuente del hispanohablante en los exámenes."},

 {"h": "El acento: dónde cae y cuándo se escribe",
  "p": ["La mayoría de las palabras italianas son llanas: el acento cae en la "
        "penúltima sílaba (*CA-sa*, *fi-NE-stra*, *stu-DEN-te*). Pero hay "
        "muchísimas esdrújulas que el castellano no tiene en el mismo lugar, y "
        "el italiano no las marca: se escribe *abitano*, *parlano*, *telefono*, "
        "*camera*, *utile*, y se pronuncian *Á-bitano*, *PAR-lano*, *te-LÉ-fono*.",
        "La tilde solo se escribe cuando el acento cae en la última sílaba "
        "(*città*, *perché*, *caffè*, *lunedì*, *però*) o para distinguir "
        "monosílabos (*è* es / *e* y; *dà* da / *da* de, desde; *sì* sí / *si* se)."],
  "tip": "Regla práctica: si no ves tilde, no acentúes la última sílaba. El "
         "error de decir *par-LÓ* en vez de *PAR-lo* delata al hispanohablante "
         "en la primera frase."},

 {"h": "Detalles que se pegan rápido",
  "p": ["*qu* siempre suena «cu» (*questo* = «cuésto», nunca «késto»). "
        "*s* entre vocales suele sonar sonora, como una *z* inglesa (*rosa*, y en "
        "el norte también *casa*). "
        "La *r* simple entre vocales es un toque breve (*caro*), como la *r* de "
        "«caro»; la *rr* doble (*terra*, *carro*) sí es vibrante múltiple."]},
]},

2: {
"intro": "En italiano el género y el número del sustantivo mandan sobre el "
         "artículo, el adjetivo y hasta sobre el participio. Equivocarse de "
         "terminación no es un desliz de estilo: rompe la concordancia de toda "
         "la frase. La buena noticia es que el sistema es más regular que el "
         "castellano; la mala, que el género de muchas palabras no coincide.",
"blocks": [
 {"h": "El esquema básico",
  "table": {"head": ["Singular", "Plural", "Género", "Ejemplo"],
            "rows": [["-o", "-i", "masculino", "libro → libri"],
                     ["-a", "-e", "femenino", "casa → case"],
                     ["-e", "-i", "masc. o fem.", "studente → studenti; "
                      "chiave → chiavi"]]},
  "p": ["Los que terminan en *-e* son el problema: hay que aprender el género "
        "junto con la palabra. Ayudan algunas terminaciones: *-zione*, *-sione*, "
        "*-tà*, *-tù*, *-ice* son femeninas (*la stazione*, *la città*, *la "
        "virtù*, *l'attrice*); *-ore*, *-ale*, *-ame* suelen ser masculinas "
        "(*il dottore*, *il giornale*)."]},

 {"h": "Plurales que cambian de letra para no cambiar de sonido",
  "p": ["Como *c* y *g* se ablandan ante *e* e *i*, muchos plurales meten una "
        "*h* para conservar el sonido duro. Es pura ortografía, no gramática."],
  "table": {"head": ["Terminación", "Plural", "Ejemplos"],
            "rows": [["-ca, -ga", "-che, -ghe (siempre)",
                      "amica → amiche; riga → righe"],
                     ["-co, -go (llanas)", "-chi, -ghi",
                      "banco → banchi; lago → laghi"],
                     ["-co, -go (esdrújulas)", "-ci, -gi",
                      "medico → medici; biologo → biologi"],
                     ["-cia, -gia (vocal antes)", "-cie, -gie",
                      "camicia → camicie; valigia → valigie"],
                     ["-cia, -gia (consonante antes)", "-ce, -ge",
                      "arancia → arance; spiaggia → spiagge"],
                     ["-io (i átona)", "-i", "figlio → figli"],
                     ["-io (i tónica)", "-ii", "zio → zii"]]},
  "tip": "Excepción célebre que hay que saber igual: *amico → amici*, "
         "*greco → greci*, *nemico → nemici*, aunque son llanas."},

 {"h": "Invariables y otros que no se dejan",
  "p": ["No cambian nunca: los acabados en consonante (*il film / i film*, "
        "*lo sport / gli sport*), en vocal tónica (*la città / le città*, "
        "*il caffè / i caffè*), los monosílabos (*il re / i re*) y los acabados "
        "en *-i* (*la crisi / le crisi*, *l'analisi / le analisi*)."],
  "ex": [["Ho visto due film.", "Vi dos películas."],
         ["Le città italiane sono belle.", "Las ciudades italianas son lindas."]]},

 {"h": "Los irregulares que aparecen todos los días",
  "table": {"head": ["Singular", "Plural", "Nota"],
            "rows": [["l'uomo", "gli uomini", "el hombre"],
                     ["l'uovo (m.)", "le uova (f.)", "cambia de género"],
                     ["il braccio", "le braccia", "partes del cuerpo: plural en -a"],
                     ["il dito", "le dita", "íd."],
                     ["il ginocchio", "le ginocchia", "íd."],
                     ["la mano", "le mani", "femenino aunque termine en -o"],
                     ["il paio", "le paia", "el par"],
                     ["il dio", "gli dei", "el dios"]]}},

 {"h": "El género que no coincide con el castellano",
  "warn": "Estas son las que hacen perder puntos, porque el instinto castellano "
          "está mal calibrado: *il latte* (la leche), *il sale* (la sal), "
          "*il sangue* (la sangre), *il fiore* (la flor), *il miele* (la miel), "
          "*il carcere* (la cárcel), *il costume* (la costumbre); y del otro lado "
          "*la fine* (el fin), *l'origine* (f., el origen), *la domenica* (el "
          "domingo), *l'analisi* (f.), *l'arte* (f.).",
  "p": ["Aparte están los helenismos en *-ma*, *-emma* y *-eta*, que son "
        "masculinos igual que en castellano: *il problema*, *il programma*, "
        "*il sistema*, *il tema*, *il poeta*. En plural hacen *-i*: "
        "*i problemi*, *i programmi*. Los de *-ista* valen para los dos "
        "géneros en singular (*il/la giornalista*) pero se separan en plural: "
        "*i giornalisti* / *le giornaliste*."]},
]},

3: {
"intro": "El artículo italiano es la primera cosa realmente distinta del "
         "castellano. No basta con saber el género: hay que mirar el sonido con "
         "el que empieza la palabra que viene después. Y encima el italiano usa "
         "artículo en un montón de lugares donde el castellano lo omite.",
"blocks": [
 {"h": "Determinados: el sonido decide",
  "table": {"head": ["Contexto", "Sing.", "Plur.", "Ejemplo"],
            "rows": [["masc. ante consonante común", "il", "i", "il libro → i libri"],
                     ["masc. ante vocal", "l'", "gli", "l'amico → gli amici"],
                     ["masc. ante s+consonante, z, gn, ps, pn, x, y, sc",
                      "lo", "gli", "lo studente → gli studenti; lo zio → gli zii"],
                     ["fem. ante consonante", "la", "le", "la casa → le case"],
                     ["fem. ante vocal", "l'", "le", "l'amica → le amiche"]]},
  "tip": "Nemotecnia para *lo/gli*: «z, s impura, gn, ps, pn, x, y». *s impura* "
         "significa *s* seguida de otra consonante: *lo sport*, *lo specchio*, "
         "*lo studio*, *lo strano tipo*."},

 {"h": "Indeterminados",
  "p": ["Siguen la misma lógica: *un* para el masculino normal y ante vocal "
        "(*un libro*, *un amico*, sin apóstrofo), *uno* donde iría *lo* "
        "(*uno studente*, *uno zaino*), *una* femenino, *un'* femenino ante "
        "vocal, con apóstrofo (*un'amica*)."],
  "warn": "*un amico* (masculino, sin apóstrofo) frente a *un'amica* (femenino, "
          "con apóstrofo). El apóstrofo es la única marca de género. Es una "
          "pregunta clásica de examen."},

 {"h": "Preposiciones articuladas",
  "p": ["Cuando *di, a, da, in, su* se encuentran con un artículo determinado, "
        "se fusionan obligatoriamente. No es solo *de el* → *del* y *a el* → *al* "
        "como en castellano: acá pasa siempre y con las cinco preposiciones."],
  "table": {"head": ["", "il", "lo", "l'", "i", "gli", "la", "le"],
            "rows": [["di", "del", "dello", "dell'", "dei", "degli", "della", "delle"],
                     ["a", "al", "allo", "all'", "ai", "agli", "alla", "alle"],
                     ["da", "dal", "dallo", "dall'", "dai", "dagli", "dalla", "dalle"],
                     ["in", "nel", "nello", "nell'", "nei", "negli", "nella", "nelle"],
                     ["su", "sul", "sullo", "sull'", "sui", "sugli", "sulla", "sulle"]]},
  },

 {"h": "El partitivo: «unos», «algo de»",
  "p": ["*di* + artículo también sirve para expresar cantidad indeterminada, "
        "donde el castellano no pone nada."],
  "ex": [["Ho comprato del pane.", "Compré pan."],
         ["Vorrei dell'acqua.", "Quisiera agua."],
         ["Ho degli amici a Roma.", "Tengo (unos) amigos en Roma."]]},

 {"h": "Dónde el italiano pone artículo y el castellano no",
  "warn": "Con los posesivos: *il mio libro*, *la mia casa* (no «mi libro»). "
          "Con los años: *il 1999* (*nel 1999*, «en 1999»). "
          "Con los nombres de países y regiones: *l'Italia è bella*. "
          "Con las lenguas: *studio l'italiano*. (En las generalizaciones, "
          "con los días en sentido habitual y con los porcentajes el artículo "
          "va igual que en castellano: *mi piace la musica*, *il lunedì* = los "
          "lunes, *il 20%* = el 20%.)",
  "p": ["Al revés, se omite con los nombres de ciudad (*Roma è bella*) y con "
        "los parientes en singular sin adjetivo: *mio padre*, *mia sorella*, "
        "pero *il mio caro fratello*, *la mia sorellina*, *i miei fratelli* y "
        "*il loro padre*."]},
]},

4: {
"intro": "El adjetivo italiano concuerda en género y número igual que el "
         "castellano, así que el mecanismo ya lo tenés. Lo que cambia es la "
         "posición —el italiano antepone más de lo que parece— y un puñado de "
         "adjetivos que se deforman delante del sustantivo.",
"blocks": [
 {"h": "Dos clases y nada más",
  "table": {"head": ["Clase", "m.sg", "f.sg", "m.pl", "f.pl", "Ejemplo"],
            "rows": [["en -o (4 formas)", "-o", "-a", "-i", "-e",
                      "alto, alta, alti, alte"],
                     ["en -e (2 formas)", "-e", "-e", "-i", "-i",
                      "grande, grande, grandi, grandi"]]},
  "p": ["Con sustantivos de géneros mezclados gana el masculino plural: "
        "*Marco e Anna sono italiani*. Los colores tomados de sustantivos son "
        "invariables: *blu*, *rosa*, *viola*, *beige*, *arancione* (este último "
        "admite plural *arancioni*)."]},

 {"h": "La posición cambia el sentido",
  "p": ["Por defecto el adjetivo va detrás, como en castellano: *una macchina "
        "rossa*, *un film interessante*. Pero los adjetivos frecuentes y "
        "valorativos (*bello*, *buono*, *grande*, *piccolo*, *giovane*, "
        "*vecchio*, *nuovo*, *povero*) suelen ir delante, y ahí muchas veces "
        "cambian de significado."],
  "ex": [["un uomo grande / un grand'uomo", "un hombre corpulento / un gran hombre"],
         ["un amico vecchio / un vecchio amico", "un amigo viejo / un viejo amigo"],
         ["una casa nuova / una nuova casa", "una casa nueva / otra casa"],
         ["un uomo povero / un povero uomo", "un hombre pobre / un pobre hombre"]]},

 {"h": "bello y quello se comportan como artículos",
  "p": ["Delante del sustantivo, *bello* y *quello* copian las formas de "
        "*il/lo/l'/i/gli/la/le*. Detrás del verbo, en cambio, *bello* es un "
        "adjetivo normal de cuatro formas."],
  "table": {"head": ["Artículo", "bello", "quello", "Ejemplo"],
            "rows": [["il", "bel", "quel", "quel bel libro"],
                     ["lo", "bello", "quello", "quello studente"],
                     ["l'", "bell'", "quell'", "quell'albergo, un bell'albergo"],
                     ["i", "bei", "quei", "quei bei quadri"],
                     ["gli", "begli", "quegli", "quegli studenti, quei begli occhi"],
                     ["la/le", "bella/belle", "quella/quelle", "quella bella casa"]]},
  "tip": "Comparalo: *Che bel film!* (delante) frente a *Questo film è bello* "
         "(detrás, forma plena)."},

 {"h": "buono, grande, santo: se acortan",
  "p": ["*buono* delante del sustantivo sigue las formas de *un/uno/una/un'*: "
        "*un buon amico*, *un buono studente*, *una buona idea*, *una buon'amica*. "
        "*grande* se apocopa en *gran* ante consonante (*un gran successo*) y en "
        "*grand'* ante vocal (*un grand'uomo*). *santo* da *san* ante consonante "
        "(*San Marco*), *santo* ante s impura (*Santo Stefano*), *sant'* ante "
        "vocal (*Sant'Antonio*)."],
  "warn": "El castellano apocopa *buen* y *san* de forma parecida, pero solo en "
          "masculino singular. El italiano también tiene *buon'amica* en "
          "femenino, que no tiene equivalente castellano."},
]},

5: {
"intro": "Números, fechas y horas son el terreno donde más se nota la "
         "traducción literal. Hay tres o cuatro convenciones que no coinciden "
         "con el castellano y que se usan cincuenta veces por día.",
"blocks": [
 {"h": "Cardinales: una sola palabra, siempre",
  "p": ["*ventidue*, *quarantasette*, *centoventitré*, *milleduecento*. "
        "Los que terminan en *-uno* y *-otto* pierden la vocal de la decena: "
        "*ventuno*, *ventotto*, *trentuno*, *quarantotto*. A partir de *venti*, "
        "*tre* lleva tilde: *ventitré*, *trentatré*."],
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
  "warn": "*cento* es invariable (*trecento*, nunca «trecenti») y *mille* hace "
          "el plural *mila* pegado: *duemila*, *cinquemila*. En cambio "
          "*milione* y *miliardo* son sustantivos y piden *di*: "
          "*due milioni di persone*."},

 {"h": "Ordinales",
  "p": ["Del 1 al 10 tienen forma propia: *primo, secondo, terzo, quarto, "
        "quinto, sesto, settimo, ottavo, nono, decimo*. Del 11 en adelante se "
        "arma con el cardinal sin su vocal final más *-esimo*: *undicesimo*, "
        "*ventesimo*, *ventitreesimo* (aquí la *e* de *tre* se conserva). "
        "Concuerdan como cualquier adjetivo en *-o*."]},

 {"h": "Fechas",
  "p": ["Se dice *il* + número + mes, sin la preposición *de* del castellano, y "
        "con el cardinal salvo el día 1, que usa el ordinal."],
  "ex": [["Oggi è il 5 maggio.", "Hoy es el 5 de mayo."],
         ["Il primo gennaio.", "El primero de enero."],
         ["Sono nato nel 1988.", "Nací en 1988."],
         ["Nel Duemila / Nel 2003.", "En el año 2000 / En 2003."]],
  "tip": "Los meses y los días de la semana van en minúscula: *lunedì*, "
         "*gennaio*. Y ojo con el orden numérico: 5/8/2024 es el 5 de agosto, "
         "no el 8 de mayo."},

 {"h": "La hora",
  "p": ["Se pregunta *Che ora è?* o *Che ore sono?* (las dos valen). Se "
        "responde en plural, con el artículo femenino *le*, porque se "
        "sobreentiende *le ore*. Solo la una, el mediodía y la medianoche van "
        "en singular."],
  "ex": [["Sono le tre.", "Son las tres."],
         ["È l'una.", "Es la una."],
         ["È mezzogiorno / È mezzanotte.", "Es mediodía / medianoche."],
         ["Sono le due e un quarto.", "Son las dos y cuarto."],
         ["Sono le otto e mezza.", "Son las ocho y media."],
         ["Sono le cinque meno un quarto.", "Son las cinco menos cuarto."],
         ["Sono le sette e quarantacinque.", "Son las siete y cuarenta y cinco."],
         ["Il treno parte alle 14:30.", "El tren sale a las 14:30."]],
  "warn": "Para la hora en punto se usa *alle* (*alle tre*), pero *all'una*, "
          "*a mezzogiorno* y *a mezzanotte* sin artículo plural. Y en contexto "
          "formal —trenes, cines, oficinas— el italiano usa el reloj de 24 "
          "horas mucho más que el castellano rioplatense."},
]},

6: {
"intro": "El presente es el tiempo que sostiene el 60% de lo que vas a decir en "
         "los primeros meses. Las tres conjugaciones italianas se parecen "
         "bastante a las castellanas, pero la segunda persona y el acento están "
         "en otro lugar, y hay reglas de escritura que deforman las raíces.",
"blocks": [
 {"h": "Las tres conjugaciones",
  "table": {"head": ["", "-are (parlare)", "-ere (vendere)", "-ire (dormire)",
                     "-ire -isc (finire)"],
            "rows": [["io", "parlo", "vendo", "dormo", "finisco"],
                     ["tu", "parli", "vendi", "dormi", "finisci"],
                     ["lui/lei", "parla", "vende", "dorme", "finisce"],
                     ["noi", "parliamo", "vendiamo", "dormiamo", "finiamo"],
                     ["voi", "parlate", "vendete", "dormite", "finite"],
                     ["loro", "parlano", "vendono", "dormono", "finiscono"]]},
  "p": ["Fijate en dos cosas: la *tu* termina en *-i* en las tres "
        "conjugaciones, y la *noi* termina en *-iamo* en las tres. Eso "
        "simplifica mucho respecto del castellano."],
  "warn": "El acento de la tercera persona del plural cae en la raíz, no en la "
          "terminación: *PAR-lano*, *VEN-dono*, *DOR-mono*, *A-bitano*, "
          "*te-LE-fonano*. El hispanohablante dice «parLAno» y se lo escucha a "
          "un kilómetro."},

 {"h": "Los verbos -isc-",
  "p": ["Un grupo grande de verbos en *-ire* intercala *-isc-* en todas las "
        "personas menos *noi* y *voi*. Los más usados: *finire*, *capire*, "
        "*preferire*, *pulire*, *spedire*, *costruire*, *unire*, *guarire*, "
        "*colpire*, *restituire*. No hay regla para saber cuáles son: se "
        "aprenden con la palabra."],
  "ex": [["Non capisco.", "No entiendo."],
         ["Capiamo tutto.", "Entendemos todo."],
         ["Preferisco il tè.", "Prefiero el té."]]},

 {"h": "Reglas de escritura que cambian la raíz",
  "table": {"head": ["Infinitivo", "Qué pasa", "tu", "noi"],
            "rows": [["cercare, pagare", "se agrega h para mantener el sonido duro",
                      "cerchi, paghi", "cerchiamo, paghiamo"],
                     ["cominciare, mangiare", "se pierde la i de la raíz",
                      "cominci, mangi", "cominciamo, mangiamo"],
                     ["studiare (i átona)", "se funden las dos i",
                      "studi", "studiamo"],
                     ["sciare (i tónica)", "se conservan las dos",
                      "scii", "sciamo"]]},
  "tip": "La lógica es sonora, no caprichosa: *cerchi* mantiene la *k* de "
         "*cercare*; *mangi* ya suena blando gracias a la *g* + *i*, así que la "
         "segunda *i* sobra."},

 {"h": "El sujeto se omite",
  "p": ["Como en castellano, la terminación ya dice quién habla, así que "
        "*io*, *tu*, *lui* solo se usan para enfatizar o para desambiguar: "
        "*Io lavoro, tu no*. Lo que sí aparece siempre es *Lei* con mayúscula "
        "para el trato formal, que usa la tercera persona del singular: "
        "*Lei parla italiano?* (¿Usted habla italiano?)."]},
]},

7: {
"intro": "Los irregulares del presente son pocos pero se usan constantemente: "
         "quince verbos cubren la mitad de cualquier conversación. Y hay una "
         "diferencia estructural enorme con el castellano que conviene entender "
         "de entrada.",
"blocks": [
 {"h": "Los cuatro pilares",
  "table": {"head": ["", "essere", "avere", "andare", "stare"],
            "rows": [["io", "sono", "ho", "vado", "sto"],
                     ["tu", "sei", "hai", "vai", "stai"],
                     ["lui/lei", "è", "ha", "va", "sta"],
                     ["noi", "siamo", "abbiamo", "andiamo", "stiamo"],
                     ["voi", "siete", "avete", "andate", "state"],
                     ["loro", "sono", "hanno", "vanno", "stanno"]]},
  "p": ["*avere* escribe una *h* muda en cuatro formas (*ho, hai, ha, hanno*) "
        "solo para distinguirlas de otras palabras. No se pronuncia."]},

 {"h": "Los modales y los de uso diario",
  "table": {"head": ["", "potere", "volere", "dovere", "sapere", "fare"],
            "rows": [["io", "posso", "voglio", "devo", "so", "faccio"],
                     ["tu", "puoi", "vuoi", "devi", "sai", "fai"],
                     ["lui/lei", "può", "vuole", "deve", "sa", "fa"],
                     ["noi", "possiamo", "vogliamo", "dobbiamo", "sappiamo", "facciamo"],
                     ["voi", "potete", "volete", "dovete", "sapete", "fate"],
                     ["loro", "possono", "vogliono", "devono", "sanno", "fanno"]]},
  },

 {"h": "Y los otros que hay que tener sí o sí",
  "table": {"head": ["", "venire", "uscire", "dire", "bere", "dare", "rimanere"],
            "rows": [["io", "vengo", "esco", "dico", "bevo", "do", "rimango"],
                     ["tu", "vieni", "esci", "dici", "bevi", "dai", "rimani"],
                     ["lui/lei", "viene", "esce", "dice", "beve", "dà", "rimane"],
                     ["noi", "veniamo", "usciamo", "diciamo", "beviamo", "diamo",
                      "rimaniamo"],
                     ["voi", "venite", "uscite", "dite", "bevete", "date", "rimanete"],
                     ["loro", "vengono", "escono", "dicono", "bevono", "danno",
                      "rimangono"]]},
  "tip": "Muchos irregulares lo son solo en *io* y *loro*, y regulares en el "
         "resto: *venGo / venGono* pero *vieni, veniamo, venite*. Si sabés la "
         "primera persona, casi siempre deducís la tercera del plural."},

 {"h": "La trampa grande: el italiano no diptonga",
  "warn": "El castellano rompe la vocal de la raíz cuando lleva acento: "
          "p*ue*do, d*ue*rmo, q*uie*ro, p*ie*nso, c*ue*nto. El italiano casi nunca "
          "lo hace (salvo unos pocos: *vieni*, *vuole*, *può*). Se dice *posso*, "
          "*dormo*, *penso*, *conto*, *trovo*, *gioco* (acá la *i* es solo "
          "gráfica). Cada vez que tu instinto quiera diptongar, frenalo.",
  "ex": [["Non posso venire.", "No puedo venir."],
         ["Dormo poco.", "Duermo poco."],
         ["Penso di sì.", "Pienso que sí."],
         ["Quanto costa?", "¿Cuánto cuesta?"]]},

 {"h": "essere o stare",
  "p": ["No se reparten como en castellano. *Stare* significa sobre todo "
        "«estar» de salud y «quedarse» (*Come stai?*, *Stasera sto a casa*), y "
        "forma el presente continuo (*sto mangiando*). Para estados, "
        "cualidades y ubicaciones el italiano usa *essere*: *sono stanco* "
        "(estoy cansado), *sono a Roma* (estoy en Roma), *la porta è aperta* "
        "(la puerta está abierta)."]},
]},

8: {
"intro": "Los pronombres son el corazón del italiano hablado: aparecen pegados "
         "al verbo, delante, detrás, y en combinaciones. Esta semana se ordena "
         "el mapa completo; las combinaciones vienen mucho más adelante.",
"blocks": [
 {"h": "El cuadro entero",
  "table": {"head": ["Sujeto", "Directo", "Indirecto", "Tónico (tras prep.)"],
            "rows": [["io", "mi", "mi", "me"],
                     ["tu", "ti", "ti", "te"],
                     ["lui", "lo", "gli", "lui"],
                     ["lei", "la", "le", "lei"],
                     ["Lei (formal)", "La", "Le", "Lei"],
                     ["noi", "ci", "ci", "noi"],
                     ["voi", "vi", "vi", "voi"],
                     ["loro", "li / le", "gli (loro)", "loro"]]},
  "p": ["Los átonos van delante del verbo conjugado: *ti vedo*, *le parlo*, "
        "*li conosco*. Los tónicos van detrás de preposición o para enfatizar: "
        "*con me*, *per te*, *a lui*, *lo dico a te, non a lui*."]},

 {"h": "Directo o indirecto",
  "p": ["Directo responde a «¿qué / a quién?» sin preposición; indirecto "
        "responde a «¿a quién / para quién?». La diferencia se ve solo en la "
        "tercera persona: *lo/la/li/le* frente a *gli/le/gli*."],
  "ex": [["Vedo Marco → Lo vedo.", "Veo a Marco → Lo veo."],
         ["Telefono a Marco → Gli telefono.", "Llamo a Marco → Lo llamo (en it., indirecto)."],
         ["Vedo Anna → La vedo.", "Veo a Ana → La veo."],
         ["Scrivo a Anna → Le scrivo.", "Le escribo a Ana."],
         ["Conosco i tuoi amici → Li conosco.", "Conozco a tus amigos."]],
  "warn": "El leísmo del castellano (*le* como complemento directo de "
          "persona: «le vi», «le saludo») acá es un error grave: en italiano *le* singular es "
          "SIEMPRE indirecto femenino (como directo, *le* solo es plural: "
          "*le vedo* = las veo). Además el italiano no pone la "
          "preposición *a* delante del objeto directo de persona: se dice "
          "*vedo Marco*, no «vedo a Marco»."},

 {"h": "Dónde se coloca el pronombre",
  "p": ["Delante del verbo conjugado (*ti chiamo*), pero pegado al final del "
        "infinitivo, del gerundio y del imperativo informal (*voglio "
        "chiamarti*, *chiamandoti*, *chiamami!*). Con los modales las dos "
        "opciones son correctas: *ti voglio vedere* = *voglio vederti*."],
  "tip": "El infinitivo pierde la *-e* final al pegar el pronombre: "
         "*vedere* + *ti* → *vederti*, no «vederéti»."},

 {"h": "Concordancia del participio",
  "p": ["Con los pronombres directos de tercera persona (*lo, la, li, le*), el "
        "participio del passato prossimo concuerda en género y número. Con "
        "*mi, ti, ci, vi* la concordancia es opcional."],
  "ex": [["Ho visto Anna → L'ho vista.", "La vi."],
         ["Ho comprato i libri → Li ho comprati.", "Los compré."],
         ["Ho letto le lettere → Le ho lette.", "Las leí."]]},
]},

9: {
"intro": "Reflexivos e imperativo van juntos porque en la práctica se usan "
         "juntos: la rutina diaria y las órdenes son el 90% del italiano "
         "doméstico. Y comparten un rasgo clave: los pronombres se pegan al "
         "final del verbo.",
"blocks": [
 {"h": "Los reflexivos",
  "table": {"head": ["", "alzarsi (sing.)", "", "alzarsi (pl.)"],
            "rows": [["io", "mi alzo", "noi", "ci alziamo"],
                     ["tu", "ti alzi", "voi", "vi alzate"],
                     ["lui/lei", "si alza", "loro", "si alzano"]]},
  "p": ["El infinitivo se cita con el pronombre pegado (*alzarsi*, *lavarsi*, "
        "*chiamarsi*, *svegliarsi*, *vestirsi*, *divertirsi*, *annoiarsi*, "
        "*arrabbiarsi*). Muchos verbos italianos son reflexivos donde el "
        "castellano no los usa, y al revés."],
  "warn": "*ricordarsi di* (acordarse de), *dimenticarsi di*, *accorgersi di* "
          "(darse cuenta), *sbagliarsi* (equivocarse), *trasferirsi* "
          "(mudarse), *laurearsi* (recibirse). Y *sposarsi con qualcuno*, no "
          "«sposare a»."},

 {"h": "El imperativo informal",
  "table": {"head": ["", "-are (parlare)", "-ere (prendere)", "-ire (dormire)",
                     "-isc (finire)"],
            "rows": [["tu", "parla!", "prendi!", "dormi!", "finisci!"],
                     ["noi", "parliamo!", "prendiamo!", "dormiamo!", "finiamo!"],
                     ["voi", "parlate!", "prendete!", "dormite!", "finite!"]]},
  "p": ["Todo igual que el presente, con una sola excepción: la *tu* de los "
        "verbos en *-are* termina en *-a*, no en *-i*. *Tu parli* pero "
        "*Parla!*."],
  "tip": "El negativo de *tu* es el más raro del italiano: *non* + infinitivo. "
         "*Non parlare!*, *Non andare!*, *Non ti preoccupare!*. En *noi* y "
         "*voi* basta con anteponer *non*: *non parliamo*, *non parlate*."},

 {"h": "El imperativo formal es un subjuntivo",
  "p": ["Para *Lei* (usted) el italiano usa la forma del congiuntivo presente. "
        "Todavía no lo estudiaste formalmente, pero conviene reconocerlo: "
        "*Parli!*, *Prenda!*, *Senta!*, *Scusi!*, *Venga!*, *Faccia pure!*. "
        "Notá que con *Lei* el pronombre NO se pega: va delante. *Mi dica!* "
        "(dígame), *Si accomodi!* (siéntese)."]},

 {"h": "Formas cortas y consonante doble",
  "p": ["Cinco verbos tienen imperativo de *tu* apocopado: *va'* (o *vai*), "
        "*da'*, *fa'*, *sta'*, *di'*. Cuando se les pega un pronombre, la "
        "consonante inicial del pronombre se duplica."],
  "ex": [["Dammi la mano!", "¡Dame la mano!"],
         ["Dimmi tutto.", "Decime todo."],
         ["Fallo subito!", "¡Hacelo ya!"],
         ["Vacci tu!", "¡Andá vos!"],
         ["Stammi bene.", "Cuidate."]],
  "warn": "La única excepción a la duplicación es *gli*: *dagli il libro*, "
          "nunca «daggli»."},
]},

10: {
"intro": "*Piacere* no significa «gustar» en el sentido de que vos gustás algo: "
         "significa «resultar agradable». La estructura es la misma que en "
         "castellano —«me gusta el café»— pero como en castellano la usás sin "
         "pensarla, cuando aparecen los pronombres tónicos y el pasado se te "
         "desarma.",
"blocks": [
 {"h": "El mecanismo",
  "p": ["El sujeto gramatical es la cosa que gusta. La persona a la que le "
        "gusta va en complemento indirecto. Por eso el verbo solo se usa "
        "prácticamente en tercera persona: *piace* si el sujeto es singular o "
        "un infinitivo, *piacciono* si es plural."],
  "ex": [["Mi piace il caffè.", "Me gusta el café."],
         ["Mi piacciono i film italiani.", "Me gustan las películas italianas."],
         ["Mi piace leggere.", "Me gusta leer."],
         ["Ti piace Roma?", "¿Te gusta Roma?"],
         ["A Marco piace la musica.", "A Marco le gusta la música."],
         ["A noi piacciono le montagne.", "A nosotros nos gustan las montañas."]],
  "warn": "Con nombre propio o sustantivo hace falta la preposición *a*: "
          "*a Marco piace*, *ai bambini piacciono*. Sin *a* la frase queda "
          "dicha al revés."},

 {"h": "En pasado va con essere",
  "p": ["El participio concuerda con el sujeto, es decir con la cosa que gustó."],
  "ex": [["Mi è piaciuto il film.", "Me gustó la película."],
         ["Mi è piaciuta la cena.", "Me gustó la cena."],
         ["Mi sono piaciuti i quadri.", "Me gustaron los cuadros."],
         ["Mi sono piaciute le foto.", "Me gustaron las fotos."]]},

 {"h": "La familia entera",
  "table": {"head": ["Verbo", "Sentido", "Ejemplo"],
            "rows": [["mancare", "faltar / extrañar", "Mi manchi. (Te extraño.)"],
                     ["servire", "hacer falta", "Mi serve una penna."],
                     ["bastare", "alcanzar", "Mi bastano dieci euro."],
                     ["sembrare / parere", "parecer", "Mi sembra giusto."],
                     ["interessare", "interesar", "Non mi interessa."],
                     ["dispiacere", "lamentar / molestar", "Mi dispiace."],
                     ["occorrere", "ser necesario", "Ci occorre tempo."],
                     ["succedere", "suceder", "Che ti succede?"],
                     ["restare / rimanere", "quedar", "Mi restano due giorni."]]},
  "warn": "*Mi manchi* es «te extraño», no «me extrañás». El sujeto es la "
          "persona ausente: *mi manca mio fratello* = extraño a mi hermano. "
          "Es el error número uno del hispanohablante enamorado."},

 {"h": "Cómo se niega y cómo se enfatiza",
  "ex": [["Non mi piace per niente.", "No me gusta para nada."],
         ["A me piace, a lui no.", "A mí me gusta, a él no."],
         ["Mi piace un sacco.", "Me gusta muchísimo. (coloquial)"],
         ["Ti va di uscire?", "¿Tenés ganas de salir?"]]},
]},

11: {
"intro": "Preguntar en italiano es más fácil que en inglés y casi igual que en "
         "castellano: no hay inversión obligatoria ni verbo auxiliar. Lo que "
         "cambia es la posición de las preposiciones y un puñado de formas "
         "fijas.",
"blocks": [
 {"h": "La pregunta total: solo entonación",
  "p": ["*Parli italiano.* → *Parli italiano?* No se toca nada más. En la "
        "escritura, el signo de interrogación va solo al final: el italiano no "
        "usa el signo de apertura del castellano."],
  "ex": [["Vieni con noi?", "¿Venís con nosotros?"],
         ["Hai capito?", "¿Entendiste?"],
         ["Non sei d'accordo?", "¿No estás de acuerdo?"]]},

 {"h": "Los interrogativos",
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
  "tip": "*Perché* sirve para la pregunta y para la respuesta: *Perché non "
         "vieni? — Perché sono stanco.* Una sola palabra para «por qué» y "
         "«porque»."},

 {"h": "La preposición va adelante",
  "p": ["El italiano nunca deja la preposición al final como el inglés, ni la "
        "omite como a veces el castellano coloquial."],
  "ex": [["Di chi è questa borsa?", "¿De quién es esta cartera?"],
         ["Con chi esci stasera?", "¿Con quién salís esta noche?"],
         ["A che ora comincia?", "¿A qué hora empieza?"],
         ["Da dove vieni?", "¿De dónde venís?"],
         ["Di che cosa parlate?", "¿De qué hablan?"]]},

 {"h": "che o quale",
  "p": ["*Che* pregunta por la naturaleza de algo (*Che libro leggi?* = ¿qué "
        "tipo de libro?). *Quale* pide elegir dentro de un conjunto conocido "
        "(*Quale libro preferisci, questo o quello?*)."],
  "warn": "*Qual è* se escribe SIN apóstrofo. No es una elisión sino un "
          "truncamiento antiguo. *Qual è il tuo nome?*, *Qual è il problema?*. "
          "Escribir «qual'è» es una de las faltas más señaladas por los "
          "correctores italianos."},

 {"h": "El sujeto, si aparece, va al final",
  "ex": [["Dove abita Marco?", "¿Dónde vive Marco?"],
         ["Che cosa dice il professore?", "¿Qué dice el profesor?"],
         ["Quanto costano queste scarpe?", "¿Cuánto cuestan estos zapatos?"]]},
]},

12: {
"intro": "Las preposiciones son el terreno donde la traducción literal fracasa "
         "más rápido. No se aprenden por regla sino por uso, pero hay unos "
         "cuantos patrones que cubren la mayoría de los casos y evitan los "
         "errores más visibles.",
"blocks": [
 {"h": "Las ocho preposiciones simples",
  "table": {"head": ["Prep.", "Valores principales", "Ejemplo"],
            "rows": [["di", "posesión, materia, origen, cantidad",
                      "il libro di Marco; sono di Roma"],
                     ["a", "destino a ciudad, hora, complemento indirecto",
                      "vado a Roma; alle otto; scrivo a Luca"],
                     ["da", "origen, casa de alguien, agente, finalidad, duración",
                      "vengo da Milano; vado da Anna"],
                     ["in", "lugar cerrado, países, medios de transporte",
                      "in Italia; in banca; in treno"],
                     ["con", "compañía, instrumento", "esco con Anna"],
                     ["su", "sobre, acerca de", "sul tavolo; un libro su Dante"],
                     ["per", "finalidad, destino, duración",
                      "parto per Roma; per due ore"],
                     ["tra / fra", "entre, dentro de (tiempo)",
                      "tra amici; torno tra un'ora"]]}},

 {"h": "a o in: el par que más se falla",
  "p": ["*a* con ciudades y pueblos; *in* con países, regiones, continentes e "
        "islas grandes. Con lugares comunes hay que memorizar el par: "
        "*in banca*, *in centro*, *in ufficio*, *in montagna*, *in chiesa*, "
        "*in piazza*, *in farmacia*, frente a *al cinema*, *al mare*, "
        "*al ristorante*, *a teatro*, *a scuola*, *a casa*, *a letto*."],
  "ex": [["Vivo a Bologna, in Italia.", "Vivo en Bolonia, en Italia."],
         ["Vado in Francia in macchina.", "Voy a Francia en auto."],
         ["Sono in ufficio fino alle sei.", "Estoy en la oficina hasta las seis."]]},

 {"h": "da, la preposición sin equivalente",
  "p": ["*da* es la que no tiene traducción única y por eso hay que estudiarla "
        "aparte. Cinco usos que aparecen todo el tiempo:"],
  "table": {"head": ["Uso", "Ejemplo", "Castellano"],
            "rows": [["procedencia", "Vengo da Napoli.", "Vengo de Nápoles."],
                     ["casa / negocio de alguien", "Vado dal medico.",
                      "Voy al médico."],
                     ["finalidad del objeto", "occhiali da sole",
                      "anteojos de sol"],
                     ["agente de la pasiva", "scritto da Calvino",
                      "escrito por Calvino"],
                     ["duración que sigue abierta", "Studio italiano da due anni.",
                      "Estudio italiano desde hace dos años."]]},
  "warn": "El último uso es el que rompe la cabeza: el italiano usa PRESENTE + "
          "*da* donde el castellano usa presente + «hace... que». *Abito qui da "
          "cinque anni* = «vivo acá desde hace cinco años». Nunca pasado."},

 {"h": "Otras trampas rápidas",
  "warn": "*pensare a* (pensar en), *credere a/in*, *sognare di*, "
          "*innamorarsi di* (enamorarse de), *sposarsi con*, "
          "*entrare in* (entrar en/a), *salire su*, *dipendere da*, "
          "*servire a/per*, *finire di*, *cominciare a*. "
          "Y el clásico: *cerco un libro*, *ascolto la musica* y *aspetto "
          "Marco* van SIN preposición; con persona el castellano pone «a» "
          "(espero a Marco) y el italiano no."},
]},

13: {
"intro": "Semana de jefe final: no hay teoría nueva. Esto es la hoja de repaso de "
         "todo lo que entra en el examen A2. Leela entera antes de entrar, y "
         "volvé a ella cada vez que falles una pregunta.",
"blocks": [
 {"h": "Artículos, de un vistazo",
  "table": {"head": ["", "consonante", "vocal", "s+cons., z, gn, ps"],
            "rows": [["masc. sing.", "il", "l'", "lo"],
                     ["masc. pl.", "i", "gli", "gli"],
                     ["fem. sing.", "la", "l'", "la"],
                     ["fem. pl.", "le", "le", "le"],
                     ["indet. masc.", "un", "un", "uno"],
                     ["indet. fem.", "una", "un'", "una"]]}},

 {"h": "Presente: las terminaciones",
  "table": {"head": ["", "-are", "-ere", "-ire", "-isc"],
            "rows": [["io", "-o", "-o", "-o", "-isco"],
                     ["tu", "-i", "-i", "-i", "-isci"],
                     ["lui", "-a", "-e", "-e", "-isce"],
                     ["noi", "-iamo", "-iamo", "-iamo", "-iamo"],
                     ["voi", "-ate", "-ete", "-ite", "-ite"],
                     ["loro", "-ano", "-ono", "-ono", "-iscono"]]}},

 {"h": "Los irregulares que van a aparecer",
  "p": ["*essere*: sono, sei, è, siamo, siete, sono. "
        "*avere*: ho, hai, ha, abbiamo, avete, hanno. "
        "*andare*: vado, vai, va, andiamo, andate, vanno. "
        "*fare*: faccio, fai, fa, facciamo, fate, fanno. "
        "*potere*: posso, puoi, può, possiamo, potete, possono. "
        "*volere*: voglio, vuoi, vuole, vogliamo, volete, vogliono. "
        "*dovere*: devo, devi, deve, dobbiamo, dovete, devono. "
        "*venire*: vengo, vieni, viene, veniamo, venite, vengono. "
        "*dire*: dico, dici, dice, diciamo, dite, dicono. "
        "*uscire*: esco, esci, esce, usciamo, uscite, escono."]},

 {"h": "Pronombres",
  "table": {"head": ["Directo", "Indirecto", "Reflexivo", "Tónico"],
            "rows": [["mi, ti, lo, la", "mi, ti, gli, le", "mi, ti, si", "me, te, lui, lei"],
                     ["ci, vi, li, le", "ci, vi, gli", "ci, vi, si", "noi, voi, loro"]]}},

 {"h": "Las cinco trampas del hispanohablante",
  "warn": "1. No diptongar: *posso*, *dormo*, *penso*. "
          "2. Acento en la raíz: *PARlano*, *ABitano*. "
          "3. Artículo con el posesivo: *il mio libro*. "
          "4. Sin *a* delante del objeto directo: *vedo Marco*. "
          "5. Presente + *da* para lo que sigue pasando: *studio da due anni*."},
]},

}
