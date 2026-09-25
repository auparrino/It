# -*- coding: utf-8 -*-
"""Stagione 2 — Il Ponte (settimane 14-26, A2 → B1)."""

LESSONS = {

14: {
"intro": "*piacere* funciona como «gustar»: lo que gusta es el sujeto. El "
         "mecanismo ya lo tenés; lo difícil llega con los nombres, los "
         "tónicos y los verbos parecidos.",
"blocks": [
 {"h": "El mecanismo",
  "r": "Lo que gusta es el **sujeto**; la persona va en indirecto. *piace* "
       "con singular o infinitivo, *piacciono* con plural.",
  "ex": [["Mi *piace* il caffè.", "Me gusta el café."],
         ["Mi *piacciono* i film italiani.", "Me gustan las películas italianas."],
         ["Mi *piace* leggere.", "Me gusta leer."],
         ["*A Marco* piace la musica.", "A Marco le gusta la música."]],
  "warn": "Con un nombre o un sustantivo, la persona lleva **a**: *a Marco "
          "piace*, *ai bambini piacciono*. Sin *a* cambia todo: *Marco "
          "piace* = Marco le gusta a la gente."},

 {"h": "Negar y enfatizar",
  "r": "*non* va antes del pronombre: *non mi piace*. Para contrastar, "
       "pronombre **tónico** con *a*: *a me*, *a lui*.",
  "ex": [["*Non mi* piace per niente.", "No me gusta para nada."],
         ["*A me* piace, *a lui* no.", "A mí me gusta, a él no."],
         ["*A noi* piacciono le montagne.", "A nosotros nos gustan las montañas."],
         ["Mi piace *un sacco*.", "Me gusta muchísimo. (coloquial)"]],
  "warn": "Nada de «a me mi piace»: el castellano repite («a mí me gusta»), "
          "el italiano no. O *a me piace*, o *mi piace*.",
  "tip": "*Ti va di uscire?* (¿tenés ganas de salir?) funciona igual que "
         "*piacere*."},

 {"h": "En pasado va con essere",
  "r": "En passato prossimo, *piacere* va con **essere** y el participio "
       "concuerda con **lo que gustó**.",
  "ex": [["Mi *è piaciuto* il film.", "Me gustó la película."],
         ["Mi *è piaciuta* la cena.", "Me gustó la cena."],
         ["Mi *sono piaciuti* i quadri.", "Me gustaron los cuadros."],
         ["Mi *sono piaciute* le foto.", "Me gustaron las fotos."]],
  "warn": "Nunca «mi ha piaciuto». Y el participio mira a la cosa, no a quien "
          "habla: Anna dice *mi è piaciuto il film*, no «piaciuta»."},

 {"h": "La familia de piacere",
  "r": "Estos verbos funcionan **igual que *piacere***: la cosa es el sujeto "
       "y la persona va en indirecto.",
  "table": {"head": ["Verbo", "Sentido", "Ejemplo"],
            "rows": [["mancare", "faltar / extrañar", "Mi manchi."],
                     ["servire", "hacer falta", "Mi serve una penna."],
                     ["bastare", "alcanzar", "Mi bastano dieci euro."],
                     ["sembrare / parere", "parecer", "Mi sembra giusto."],
                     ["interessare", "interesar", "Non mi interessa."],
                     ["dispiacere", "sentir (lo siento) / molestar", "Mi dispiace."],
                     ["occorrere", "ser necesario", "Ci occorre tempo."],
                     ["succedere", "pasar, suceder", "Che ti succede?"],
                     ["restare / rimanere", "quedar", "Mi restano due giorni."]]},
  "ex": [["Mi *manchi*.", "Te extraño."],
         ["Mi *manca* l'Italia.", "Extraño Italia."],
         ["Mi *serve* una penna.", "Necesito una lapicera."],
         ["Non mi *interessa*.", "No me interesa."]],
  "warn": "*Mi manchi* = «te extraño», no «me extrañás». El sujeto es el que "
          "falta: *mi manca Roma* = extraño Roma."},
]},

15: {
"intro": "LA semana difícil del B1: passato prossimo o imperfetto. No se "
         "decide por «puntual o duradero», sino por lo que mira quien habla: "
         "los hechos o el decorado.",
"parts": [
 {"h": "El imperfetto: forma e irregulares", "blocks": [0, 1],
  "match": r"Conjugá el verbo en imperfetto|usando el imperfetto|ya no son como antes|estabas preparado|robar|Completá con el imperfetto"},
 {"h": "Imperfetto o passato prossimo: el contraste", "blocks": [2, 3, 4, 5],
  "match": r"passato prossimo|tiempo|trapassato|auxiliar|cortes"},
],
"blocks": [
 {"h": "La forma del imperfetto",
  "r": "Infinitivo sin *-re* + *-vo, -vi, -va, -vamo, -vate, -vano*: "
       "*parlavo, vendevo, dormivo*.",
  "table": {"head": ["", "parlare", "vendere", "dormire", "essere"],
            "rows": [["io", "parlavo", "vendevo", "dormivo", "ero"],
                     ["tu", "parlavi", "vendevi", "dormivi", "eri"],
                     ["lui/lei", "parlava", "vendeva", "dormiva", "era"],
                     ["noi", "parlavamo", "vendevamo", "dormivamo", "eravamo"],
                     ["voi", "parlavate", "vendevate", "dormivate", "eravate"],
                     ["loro", "parlavano", "vendevano", "dormivano", "erano"]]},
  "ex": [["Da bambino *giocavo* a calcio.", "De chico jugaba al fútbol."],
         ["*Abitavamo* a Roma.", "Vivíamos en Roma."],
         ["Dove *eri*?", "¿Dónde estabas?"]],
  "tip": "*loro* lleva el acento en la misma sílaba que *io*: *parlàvo → "
         "parlàvano*, nunca «parlavàno»."},

 {"h": "Los pocos irregulares",
  "r": "Pocos, y con la raíz latina: *fare → facevo*, *dire → dicevo*, *bere "
       "→ bevevo*. *essere* va aparte: *ero, eri, era*.",
  "ex": [["Da bambino *facevo* sport.", "De chico hacía deporte."],
         ["Che cosa *dicevi*?", "¿Qué decías?"],
         ["*Bevevo* troppo caffè.", "Tomaba demasiado café."],
         ["*Era* tardi.", "Era tarde."]],
  "more": ["Siguen el mismo patrón *tradurre → traducevo*, *produrre → "
           "producevo* y *porre → ponevo*."]},

 {"h": "La pregunta correcta",
  "r": "¿Contás **qué pasó** o describís **cómo estaban las cosas**? Hechos: "
       "passato prossimo. Fondo, costumbre, estado: imperfetto.",
  "table": {"head": ["Imperfetto", "Passato prossimo"],
            "rows": [["descripción del fondo", "hecho que avanza el relato"],
                     ["costumbre repetida", "hecho con número de veces"],
                     ["estado físico o mental", "cambio de estado"],
                     ["edad, hora, clima", "acontecimiento fechado"],
                     ["acción en curso interrumpida", "la interrupción"]]},
  "ex": [["Mentre *dormivo*, *è suonato* il telefono.", "Mientras dormía, sonó el teléfono."],
         ["Da bambino *andavo* al mare ogni estate.", "De chico iba al mar todos los veranos."],
         ["Ieri *sono andato* al mare.", "Ayer fui al mar."],
         ["*Faceva* freddo e non *c'era* nessuno.", "Hacía frío y no había nadie."]],
  "warn": "«¿Duró mucho?» no sirve: *ho abitato a Roma per dieci anni* dura "
          "diez años y va en passato prossimo, porque es un período cerrado."},

 {"h": "El mismo verbo, dos lecturas",
  "r": "Con *sapere*, *conoscere* y los modales, el imperfetto deja el "
       "resultado abierto; el passato prossimo lo cierra.",
  "ex": [["*Sapevo* la verità. / *Ho saputo* la verità.", "Sabía la verdad. / Me enteré de la verdad."],
         ["*Conoscevo* Marco. / *Ho conosciuto* Marco.", "Conocía a Marco. / Conocí a Marco."],
         ["*Potevo* farlo. / *Ho potuto* farlo.", "Podía hacerlo. / Pude (y lo hice)."],
         ["*Volevo* uscire. / *Ho voluto* uscire.", "Quería salir. / Quise salir (y salí)."],
         ["*Doveva* partire. / *È dovuto* partire.", "Tenía que irse. / Tuvo que irse (y se fue)."]],
  "tip": "Es la misma diferencia que entre «podía» y «pude»: el castellano ya "
         "te la da."},

 {"h": "Imperfetto de cortesía",
  "r": "Para pedir con suavidad, imperfetto: *Volevo un caffè* suena más "
       "amable que *voglio*.",
  "ex": [["*Volevo* un caffè, per favore.", "Quería un café, por favor."],
         ["*Cercavo* il signor Rossi.", "Buscaba al señor Rossi."],
         ["*Volevo* chiederti una cosa.", "Te quería preguntar algo."]]},

 {"h": "Adelanto: imperfetto en la hipótesis",
  "r": "Al hablar, el imperfetto reemplaza las formas cultas de la hipótesis "
       "irreal: *Se lo sapevo, non venivo*.",
  "ex": [["Se lo *sapevo*, non *venivo*.", "Si lo sabía, no venía (coloquial)."],
         ["Se l'*avessi saputo*, non *sarei venuto*.", "Si lo hubiera sabido, no habría venido (forma culta)."]],
  "tip": "Reconocelo al escuchar; en el examen, escribí la forma culta.",
  "more": ["La forma culta usa congiuntivo trapassato y condizionale "
           "passato: llegan en las semanas 30 y 31, y la hipótesis completa "
           "en la 33."]},
]},

16: {
"intro": "Los reflexivos en pasado tienen una sola regla, absoluta, y el "
         "castellano empuja justo al revés. Esta semana la automatizás.",
"blocks": [
 {"h": "Todos con essere. Todos.",
  "q": [{"prompt": "¿Cuál está bien? «Me lavé» (dice Anna).", "answer": "Mi sono lavata.", "options": ["Mi sono lavata.", "Mi ho lavata.", "Mi sono lavato."]}, {"prompt": "Completá: «Se divirtieron» (los chicos).", "stem": "I ragazzi si ___ divertiti.", "answer": "sono", "options": ["sono", "hanno", "è"]}],
  "r": "Reflexivos y pronominales van **siempre con *essere***, y el "
       "participio concuerda con el sujeto.",
  "table": {"head": ["", "lavarsi"],
            "rows": [["io", "mi sono lavato / lavata"],
                     ["tu", "ti sei lavato / lavata"],
                     ["lui / lei", "si è lavato / lavata"],
                     ["noi", "ci siamo lavati / lavate"],
                     ["voi", "vi siete lavati / lavate"],
                     ["loro", "si sono lavati / lavate"]]},
  "ex": [["Stamattina *mi sono svegliato* alle sette.", "Hoy a la mañana me desperté a las siete."],
         ["Anna *si è vestita* in fretta.", "Ana se vistió rápido."],
         ["I ragazzi *si sono divertiti*.", "Los chicos se divirtieron."]],
  "warn": "*lavare* solo va con *avere*, y el instinto lo arrastra: «mi ho "
          "lavato». Con pronombre, siempre *mi sono lavato*: es el error más "
          "penalizado del B1."},

 {"h": "El mismo verbo con y sin pronombre",
  "r": "Sin pronombre, cada verbo sigue su regla: *ho lavato la macchina*. "
       "Con pronombre reflexivo, *essere*: *mi sono lavato*.",
  "ex": [["*Ho lavato* la macchina. / *Mi sono lavato* le mani.", "Lavé el auto. / Me lavé las manos."],
         ["*Ho svegliato* i bambini. / *Mi sono svegliato* tardi.", "Desperté a los chicos. / Me desperté tarde."],
         ["*Ho fermato* il taxi. / *Mi sono fermato* al semaforo.", "Paré el taxi. / Me detuve en el semáforo."]],
  "more": ["Con objeto directo detrás (*le mani*), el italiano cuidado hace "
           "concordar el participio con el sujeto: *mi sono lavato le mani*. "
           "La concordancia con el objeto (*mi sono lavate le mani*) se "
           "admite, pero es minoritaria."]},

 {"h": "Recíprocos y pronominales",
  "r": "Los recíprocos (uno al otro) y pronominales como *accorgersi* o "
       "*dimenticarsi* también van con *essere*.",
  "ex": [["*Ci siamo conosciuti* a Milano.", "Nos conocimos en Milán."],
         ["*Si sono salutati* alla stazione.", "Se despidieron en la estación."],
         ["*Mi sono dimenticata* le chiavi.", "Me olvidé las llaves."],
         ["*Si è accorto* dell'errore.", "Se dio cuenta del error."]],
  "warn": "«Nos conocimos» no es «ci abbiamo conosciuto»: el recíproco va con "
          "*essere* y en plural, *ci siamo conosciuti*."},

 {"h": "Con modales, dos opciones",
  "r": "Pronombre delante → *essere*. Pronombre pegado al infinitivo → "
       "*avere*. Las dos son correctas y significan lo mismo.",
  "ex": [["*Mi sono dovuto* alzare presto.", "Tuve que levantarme temprano."],
         ["*Ho dovuto* alzar*mi* presto.", "Tuve que levantarme temprano."],
         ["Non *mi sono potuto* fermare.", "No me pude detener."],
         ["Non *ho potuto* fermar*mi*.", "No me pude detener."]],
  "warn": "Lo que no vale es mezclar: ni «mi ho dovuto alzare» ni «sono "
          "dovuto alzarmi»."},
]},

17: {
"intro": "Demostrativos, posesivos e indefinidos: las piezas chicas que "
         "arman cualquier frase larga. Casi todo calca el castellano; esta "
         "semana fijás los pocos puntos donde no.",
"parts": [
 {"h": "Demostrativos: questo y quello", "blocks": [0],
  "match": r"questo|quello|demostrativ"},
 {"h": "Posesivos: con artículo, salvo la familia", "blocks": [1, 2],
  "match": r"posesiv|suo o loro|invitados|devolviendo|\bmio\b|\btuo\b|\bsuo\b|\bloro\b|famil"},
 {"h": "Indefinidos y molto", "blocks": [3, 4],
  "match": r"indefinid|tutto|molto|alcun|qualche|nessun|ogn|poch|tropp"},
],
"blocks": [
 {"h": "Demostrativos: solo dos grados",
  "r": "Dos grados, no tres: *questo* (cerca) y *quello* (lejos). Ante "
       "sustantivo, *quello* cambia como el artículo: *quel*, *quello*, "
       "*quell'*.",
  "table": {"head": ["", "m.sg", "f.sg", "m.pl", "f.pl"],
            "rows": [["questo", "questo", "questa", "questi", "queste"],
                     ["quello (ante sust.)", "quel / quello / quell'", "quella / quell'", "quei / quegli", "quelle"],
                     ["quello (pronombre)", "quello", "quella", "quelli", "quelle"]]},
  "ex": [["*Questo* caffè è buono.", "Este café está rico."],
         ["*Quel* ragazzo è Marco.", "Ese chico es Marco."],
         ["*Quello* studente è bravo.", "Ese estudiante es bueno."],
         ["Quali libri? *Quelli*.", "¿Qué libros? Esos."]],
  "warn": "El castellano tiene «ese» y «aquel»: en italiano los dos son "
          "*quello*.",
  "tip": "Como pronombre suelto, el masculino plural es *quelli*, nunca "
         "*quei*.",
  "more": ["*codesto* (ese, cerca de quien escucha) existe, pero es toscano "
           "o burocrático: no lo vas a necesitar."]},

 {"h": "Posesivos: siempre con artículo",
  "r": "El posesivo lleva **artículo** y concuerda con lo poseído, no con el "
       "dueño: *la sua macchina*. *loro* no cambia.",
  "table": {"head": ["", "m.sg", "f.sg", "m.pl", "f.pl"],
            "rows": [["mio", "il mio", "la mia", "i miei", "le mie"],
                     ["tuo", "il tuo", "la tua", "i tuoi", "le tue"],
                     ["suo", "il suo", "la sua", "i suoi", "le sue"],
                     ["nostro", "il nostro", "la nostra", "i nostri", "le nostre"],
                     ["vostro", "il vostro", "la vostra", "i vostri", "le vostre"],
                     ["loro", "il loro", "la loro", "i loro", "le loro"]]},
  "ex": [["Anna e *il suo* cane.", "Ana y su perro."],
         ["Marco e *la sua* macchina.", "Marco y su auto."],
         ["È *la loro* casa.", "Es la casa de ellos."],
         ["Dove sono *le mie* chiavi?", "¿Dónde están mis llaves?"]],
  "warn": "*suo* no mira al dueño: *la sua macchina* es el auto de él o de "
          "ella. Manda *macchina*, que es femenino."},

 {"h": "Familia: sin artículo",
  "q": [{"prompt": "¿Cuál está bien? «Mi padre es médico.»", "answer": "Mio padre è medico.", "options": ["Mio padre è medico.", "Il mio padre è medico.", "Lo mio padre è medico."]}, {"prompt": "¿Cuál está bien? «El padre de ellos es alto.»", "answer": "Il loro padre è alto.", "options": ["Il loro padre è alto.", "Loro padre è alto.", "Suo padre è alto."]}],
  "r": "Parentesco en **singular y sin adjetivo**: el posesivo va sin "
       "artículo. *mio padre*, *tua sorella*.",
  "ex": [["*Mio padre* è medico.", "Mi padre es médico."],
         ["*I miei fratelli* abitano a Roma.", "Mis hermanos viven en Roma. (plural: con artículo)"],
         ["*Il mio caro* nonno ha novant'anni.", "Mi querido abuelo tiene noventa años. (con adjetivo: con artículo)"],
         ["*La mia* mamma è simpatica.", "Mi mamá es simpática. (forma afectiva: con artículo)"],
         ["*Il loro* padre è alto.", "El padre de ellos es alto. (loro: siempre con artículo)"]],
  "warn": "«il mio padre» es error de principiante. Y con *loro* el artículo "
          "no se cae nunca."},

 {"h": "Indefinidos que hay que saber",
  "r": "Casi todos calcan el castellano. Fijá tres: *qualche* + "
       "**singular**, *ogni* invariable y *nessuno / niente* detrás del "
       "verbo con *non*.",
  "table": {"head": ["Forma", "Sentido", "Nota"],
            "rows": [["qualche + singular", "algunos", "¡siempre singular! qualche libro"],
                     ["alcuni / alcune + plural", "algunos", "alcuni libri"],
                     ["ogni + singular", "cada / todos los", "invariable: ogni giorno"],
                     ["tutto/a/i/e + artículo", "todo", "tutti i giorni, tutta la notte"],
                     ["qualcuno / qualcosa", "alguien / algo", "invariables"],
                     ["nessuno / niente", "nadie / nada", "detrás del verbo piden non"],
                     ["altro/a/i/e", "otro", "¡con un!: un altro libro"],
                     ["poco, molto, troppo, tanto", "poco, mucho...", "concuerdan como adjetivos"]]},
  "ex": [["Ho letto *qualche* libro.", "Leí algunos libros."],
         ["Vado al lavoro *ogni giorno*.", "Voy al trabajo todos los días."],
         ["*Non* c'è *nessuno*.", "No hay nadie."],
         ["Vuoi *un altro* caffè?", "¿Querés otro café?"]],
  "warn": "*qualche amico* = algunos amigos: «qualche amici» es error "
          "seguro. Y *ogni giorno*, nunca «ogni giorni»."},

 {"h": "molto: adjetivo o adverbio",
  "r": "Con sustantivo **concuerda**: *molti libri*. Con adjetivo, adverbio "
       "o verbo **no cambia**: *molto stanchi*. Igual *poco, tanto, troppo*.",
  "ex": [["Ho *molti* amici.", "Tengo muchos amigos."],
         ["C'è *poca* gente.", "Hay poca gente."],
         ["Sono *molto* contenta.", "Estoy muy contenta."],
         ["Lavorano *troppo*.", "Trabajan demasiado."]],
  "warn": "*Sono molto stanchi*, nunca «molti stanchi»: delante de un "
          "adjetivo es adverbio y no cambia, como «muy»."},
]},

18: {
"intro": "En italiano la doble negación es obligatoria, igual que en "
         "castellano. Esta semana ordenás el inventario completo, las "
         "trampas y las exclamaciones de todos los días.",
"parts": [
 {"h": "Negar: non … niente, mai, mica", "blocks": [0, 1, 2],
  "match": r"negaci|negativ|\bnon\b|affatto|mica|neanche"},
 {"h": "Exclamaciones", "blocks": [3, 4],
  "match": r"exclama|che!|quanto o come|interjecci|reaccion"},
],
"blocks": [
 {"h": "El esquema non ... X",
  "r": "Palabra negativa **después** del verbo → *non* delante. **Antes** "
       "del verbo → sin *non*. Igual que en castellano.",
  "ex": [["*Non* ho visto *nessuno*.", "No vi a nadie."],
         ["*Nessuno* mi ha visto.", "Nadie me vio."],
         ["*Non* vado *mai* al cinema.", "Nunca voy al cine."],
         ["*Non* lavoro *più* qui.", "Ya no trabajo acá."],
         ["Non ho *né* tempo *né* voglia.", "No tengo ni tiempo ni ganas."]]},

 {"h": "El inventario",
  "r": "*non* + otra palabra, casi siempre como en castellano. La excepción: "
       "*non... che* significa «solo».",
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
  "ex": [["Non c'è *niente* da fare.", "No hay nada que hacer."],
         ["Non è *ancora* arrivato.", "Todavía no llegó."],
         ["Non mi piace *neanche* un po'.", "No me gusta ni un poco."],
         ["*Non* ho *che* dieci euro.", "Solo tengo diez euros."]],
  "warn": "*Non ho che dieci euro* = «solo tengo diez euros», no «no tengo "
          "diez euros». Trampa clásica de comprensión lectora."},

 {"h": "mica, la negación coloquial",
  "r": "*mica* refuerza la negación al hablar: *Non è mica facile!* Se dice "
       "mucho y se escribe poco.",
  "ex": [["Non è *mica* facile!", "¡No es nada fácil!"],
         ["Non hai *mica* una penna?", "¿No tenés una lapicera, por casualidad?"],
         ["*Mica* male!", "¡Nada mal!"]],
  "tip": "Al principio de la frase, *mica* va solo, sin *non*: *Mica male!*"},

 {"h": "Exclamaciones con che, come, quanto",
  "q": [{"prompt": "¿Cuál está bien? «¡Qué lindo día!»", "answer": "Che bella giornata!", "options": ["Che bella giornata!", "Che una bella giornata!", "Come bella giornata!"]}, {"prompt": "¿Cuál está bien? «¡Qué lástima!»", "answer": "Che peccato!", "options": ["Che peccato!", "Che un peccato!", "Come peccato!"]}],
  "r": "*Che* + sustantivo o adjetivo, **sin artículo**: *Che bello!* *Come* "
       "o *quanto* + verbo: *Come sei elegante!*",
  "ex": [["*Che* peccato!", "¡Qué lástima!"],
         ["*Che* bella giornata!", "¡Qué lindo día!"],
         ["*Come* sei elegante!", "¡Qué elegante estás!"],
         ["*Quanto* mi manchi!", "¡Cuánto te extraño!"]],
  "warn": "Nunca «che una bella giornata»: igual que «¡qué lindo día!», sin "
          "artículo."},

 {"h": "Cinco exclamaciones de todos los días",
  "r": "No se traducen palabra por palabra: aprendelas enteras, con su "
       "sentido.",
  "ex": [["*Magari!*", "¡Ojalá!"],
         ["*Figurati!*", "¡Por favor, no es nada!"],
         ["*Dai!*", "¡Dale!"],
         ["*Boh!*", "Ni idea."],
         ["*Beato te!*", "¡Qué suerte la tuya!"]]},
]},

19: {
"intro": "El futuro italiano es muy regular. Además de hablar del porvenir, "
         "sirve para suponer sobre el presente: *sarà a casa* = estará en "
         "casa.",
"parts": [
 {"h": "Futuro simple y sus raíces", "blocks": [0, 1],
  "match": r"^(?!.*(anteriore|compuesto|probabilidad|quando|appena|parientes)).*(futuro|planes|Promesas|Decisiones)"},
 {"h": "Futuro anteriore, suposición y quando", "blocks": [2, 3, 4],
  "match": r"anteriore|probabilidad|quando|appena"},
],
"blocks": [
 {"h": "Futuro semplice",
  "r": "Infinitivo sin *-e* + *-ò, -ai, -à, -emo, -ete, -anno*. En *-are*, "
       "la *a* pasa a *e*: *parlerò*.",
  "table": {"head": ["", "parlare", "vendere", "dormire"],
            "rows": [["io", "parlerò", "venderò", "dormirò"],
                     ["tu", "parlerai", "venderai", "dormirai"],
                     ["lui/lei", "parlerà", "venderà", "dormirà"],
                     ["noi", "parleremo", "venderemo", "dormiremo"],
                     ["voi", "parlerete", "venderete", "dormirete"],
                     ["loro", "parleranno", "venderanno", "dormiranno"]]},
  "ex": [["Domani *parlerò* con Marco.", "Mañana voy a hablar con Marco."],
         ["*Partiremo* alle otto.", "Vamos a salir a las ocho."],
         ["*Dormirete* qui?", "¿Van a dormir acá?"]],
  "tip": "La ortografía de siempre: *cercare → cercherò*, *pagare → pagherò* "
         "(con h); *cominciare → comincerò*, *mangiare → mangerò* (sin i)."},

 {"h": "Raíces irregulares",
  "r": "Pocos verbos cambian la raíz; las terminaciones son las de siempre. "
       "Esa misma raíz vuelve en el condicional.",
  "table": {"head": ["Verbo", "Raíz", "Verbo", "Raíz"],
            "rows": [["essere", "sar-", "avere", "avr-"],
                     ["andare", "andr-", "dovere", "dovr-"],
                     ["potere", "potr-", "sapere", "sapr-"],
                     ["vedere", "vedr-", "vivere", "vivr-"],
                     ["venire", "verr-", "volere", "vorr-"],
                     ["rimanere", "rimarr-", "tenere", "terr-"],
                     ["bere", "berr-", "fare", "far-"],
                     ["dare", "dar-", "stare", "star-"]]},
  "ex": [["Domani *andrò* al mare.", "Mañana voy a ir al mar."],
         ["*Sarò* a casa alle otto.", "Voy a estar en casa a las ocho."],
         ["*Verrai* alla festa?", "¿Vas a venir a la fiesta?"]],
  "warn": "*andare* y *vedere* pierden la vocal: *andrò*, *vedrò*. «anderò» "
          "o «vederò» no existen."},

 {"h": "Futuro anteriore",
  "r": "*avrò / sarò* + participio: lo que ya estará terminado antes de otro "
       "momento futuro.",
  "ex": [["Quando *avrò finito*, ti chiamerò.", "Cuando termine, te llamo."],
         ["Tra un'ora *avremo finito*.", "En una hora ya vamos a haber terminado."],
         ["*Saranno* già *partiti*.", "Ya se habrán ido."]],
  "tip": "También sirve para suponer sobre el pasado: *saranno già partiti* "
         "= ya se habrán ido."},

 {"h": "Futuro para suponer",
  "q": [{"prompt": "¿Cuál está bien? «¿Dónde está Marco? — Estará en casa.»", "answer": "Dov'è Marco? — Sarà a casa.", "options": ["Dov'è Marco? — Sarà a casa.", "Dov'è Marco? — Starà a casa.", "Dov'è Marco? — Sarebbe a casa."]}, {"prompt": "«Avrà quarant'anni» quiere decir…", "answer": "Debe tener unos cuarenta años.", "options": ["Debe tener unos cuarenta años.", "Va a cumplir cuarenta años.", "Tuvo cuarenta años."]}],
  "r": "El futuro sirve para **suponer sobre el presente**: *Sarà a casa* = "
       "estará en casa.",
  "ex": [["Che ora è? — *Saranno* le tre.", "¿Qué hora es? — Serán las tres."],
         ["Quanti anni ha? — *Avrà* quarant'anni.", "¿Cuántos años tiene? — Tendrá unos cuarenta."],
         ["Dov'è Marco? — *Sarà* a casa.", "¿Dónde está Marco? — Estará en casa."],
         ["*Sarà* vero?", "¿Será verdad?"]],
  "tip": "El castellano también lo hace («serán las tres»), pero el italiano "
         "mucho más: usalo sin miedo."},

 {"h": "Después de quando, futuro",
  "r": "Si el sentido es futuro, detrás de *quando* y *appena* va "
       "**futuro**.",
  "ex": [["Quando *arriverai*, ti darò le chiavi.", "Cuando llegues, te doy las llaves."],
         ["Appena *potrò*, ti chiamerò.", "Apenas pueda, te llamo."],
         ["Ti scriverò quando *sarò* a Roma.", "Te escribo cuando esté en Roma."]],
  "warn": "El castellano pone subjuntivo («cuando llegues»): no lo calques. "
          "Al hablar se oye *quando arrivi*; en el examen, escribí el "
          "futuro.",
  "tip": "Con *se* pasa lo mismo: *se avrò tempo, verrò* = si tengo tiempo, "
         "voy a ir."},
]},

20: {
"intro": "El condicional usa la raíz del futuro: si dominás la semana "
         "pasada, lo tenés casi hecho. Sirve para pedir con cortesía, "
         "aconsejar y dar noticias no confirmadas.",
"blocks": [
 {"h": "Las formas",
  "r": "Raíz de futuro + *-ei, -esti, -ebbe, -emmo, -este, -ebbero*: "
       "*parlerei, sarei, vorrei*.",
  "table": {"head": ["", "parlare", "essere", "avere", "volere"],
            "rows": [["io", "parlerei", "sarei", "avrei", "vorrei"],
                     ["tu", "parleresti", "saresti", "avresti", "vorresti"],
                     ["lui/lei", "parlerebbe", "sarebbe", "avrebbe", "vorrebbe"],
                     ["noi", "parleremmo", "saremmo", "avremmo", "vorremmo"],
                     ["voi", "parlereste", "sareste", "avreste", "vorreste"],
                     ["loro", "parlerebbero", "sarebbero", "avrebbero", "vorrebbero"]]},
  "ex": [["Io *prenderei* un caffè.", "Yo me tomaría un café."],
         ["*Sarebbe* bello.", "Sería lindo."],
         ["*Avremmo* bisogno di aiuto.", "Necesitaríamos ayuda."]],
  "warn": "*noi* lleva **dos emes**: *parleremmo* (hablaríamos). Con una "
          "sola, *parleremo*, es futuro (vamos a hablar)."},

 {"h": "Cortesía, deseo y consejo",
  "r": "Para pedir, desear o aconsejar sin imponer: *vorrei*, *potresti*, "
       "*mi piacerebbe*, *dovresti*.",
  "ex": [["*Vorrei* un caffè, per favore.", "Quisiera un café, por favor."],
         ["*Potresti* aiutarmi?", "¿Podrías ayudarme?"],
         ["Mi *piacerebbe* andare in Italia.", "Me gustaría ir a Italia."],
         ["*Dovresti* riposare.", "Deberías descansar."],
         ["*Saprebbe* dirmi dov'è la stazione?", "¿Sabría decirme dónde está la estación?"]],
  "tip": "*Vorrei* es la forma educada por defecto en un bar, un negocio o "
         "una oficina. *Voglio un caffè* suena a orden."},

 {"h": "La noticia no confirmada",
  "r": "Diarios y noticieros usan el condicional para datos **no "
       "verificados**: leelo como «parece que».",
  "ex": [["Secondo fonti vicine al governo, il ministro si *dimetterebbe*.", "Según fuentes cercanas al gobierno, el ministro renunciaría."],
         ["Ci *sarebbero* venti feriti.", "Habría veinte heridos."],
         ["Il presidente *sarebbe* malato.", "El presidente estaría enfermo."]],
  "tip": "Aparece en toda comprensión lectora: es un dato que el periodista "
         "no garantiza."},

 {"h": "Adelanto: nunca condicional tras se",
  "r": "Detrás de *se* hipotético **nunca** va condicional: *Se avessi "
       "tempo, verrei*, jamás «se avrei tempo».",
  "ex": [["Se *avessi* tempo, *verrei*.", "Si tuviera tiempo, vendría."],
         ["Se *potessi*, ti *aiuterei*.", "Si pudiera, te ayudaría."]],
  "warn": "En el italiano hablado regional se oye «se avrei»: no lo imites. "
          "Es como decir «si tendría» en castellano.",
  "tip": "La estructura completa llega en la semana 33: por ahora, "
         "reconocela."},
]},

21: {
"intro": "*ne* y *ci* no existen en castellano y el italiano los usa en casi "
         "cada frase. Sin ellos, tu italiano suena correcto pero extranjero.",
"parts": [
 {"h": "NE: cantidades y «de eso»", "blocks": [0, 1],
  "match": r"^(?!.*(\bci\b|c'è|ci sono|volerci|metterci|lugar)).*(\bne\b|«ne»)"},
 {"h": "CI: lugar, «a algo» y expresiones", "blocks": [2, 3, 4],
  "match": r"\bci\b|c'è|lugar"},
],
"blocks": [
 {"h": "NE: una cantidad",
  "q": [{"prompt": "Elegí la que va", "stem": "Quanti fratelli hai? — ___ ho due.", "answer": "Ne", "options": ["Ne", "Li", "Ci"]}, {"prompt": "¿Cuál está bien? «¿Tenés cigarrillos? — No, no tengo.»", "answer": "No, non ne ho.", "options": ["No, non ne ho.", "No, non ho.", "No, non lo ho."]}, {"prompt": "¿Cuál está bien? «¿Querés pan? — Sí, agarro un poco.»", "answer": "Sì, ne prendo un po'.", "options": ["Sì, ne prendo un po'.", "Sì, prendo un po'.", "Sì, lo prendo un po'."]}],
  "r": "*ne* reemplaza **una cantidad** de algo ya nombrado. En castellano "
       "no se dice nada; en italiano es **obligatorio**.",
  "ex": [["Quanti libri hai? — *Ne* ho tre.", "¿Cuántos libros tenés? — Tengo tres."],
         ["Vuoi del pane? — Sì, *ne* prendo un po'.", "¿Querés pan? — Sí, agarro un poco."],
         ["Hai sigarette? — No, non *ne* ho.", "¿Tenés cigarrillos? — No, no tengo."]],
  "warn": "*Ho tre* sin *ne* es agramatical. Cada vez que respondas con una "
          "cantidad, *ne* tiene que estar.",
  "tip": "En tiempos compuestos, el participio concuerda con lo contado: *ne "
         "ho comprati tre* (libros), *ne ho comprate due* (revistas)."},

 {"h": "NE: di + algo",
  "q": [{"prompt": "Elegí la que va", "stem": "Che ___ pensi? (¿Qué pensás de eso?)", "answer": "ne", "options": ["ne", "ci", "lo"]}, {"prompt": "¿Cuál está bien? «Estoy contento con eso.»", "answer": "Ne sono contento.", "options": ["Ne sono contento.", "Ci sono contento.", "Lo sono contento."]}],
  "r": "*ne* también reemplaza **di + algo**: *parlare del viaggio → "
       "parlarne*; *sono contento del risultato → ne sono contento*.",
  "ex": [["*Ne* parliamo domani.", "Hablamos de eso mañana."],
         ["*Ne* sono contento.", "Estoy contento con eso."],
         ["Che *ne* pensi?", "¿Qué te parece? / ¿Qué pensás de eso?"],
         ["*Ne* ho sentito parlare.", "Oí hablar de eso."]]},

 {"h": "CI: un lugar",
  "q": [{"prompt": "Elegí la que va", "stem": "Vai a Roma? — Sì, ___ vado domani.", "answer": "ci", "options": ["ci", "ne", "lo"]}, {"prompt": "¿Cuál está bien? «¿Estuviste en Grecia? — No, nunca.»", "answer": "No, non ci sono mai stato.", "options": ["No, non ci sono mai stato.", "No, non ne sono mai stato.", "No, non sono mai ci stato."]}],
  "r": "*ci* reemplaza **un lugar** ya nombrado: «ahí». En castellano muchas "
       "veces no se dice; en italiano, sí.",
  "ex": [["Vai a Roma? — Sì, *ci* vado domani.", "¿Vas a Roma? — Sí, voy mañana."],
         ["Sei mai stato in Grecia? — No, non *ci* sono mai stato.", "¿Estuviste alguna vez en Grecia? — No, nunca."],
         ["Abiti ancora a Roma? — Sì, *ci* abito da dieci anni.", "¿Seguís viviendo en Roma? — Sí, vivo ahí hace diez años."]],
  "warn": "«Sí, voy mañana» a secas suena incompleto en italiano: *sì, ci "
          "vado domani*."},

 {"h": "CI: a + algo",
  "q": [{"prompt": "Elegí la que va", "stem": "Credi ai fantasmi? — No, non ___ credo.", "answer": "ci", "options": ["ci", "ne", "li"]}, {"prompt": "Elegí la que va", "stem": "Pensi al lavoro? — Sì, ___ penso sempre.", "answer": "ci", "options": ["ci", "ne", "li"]}],
  "r": "*ci* también reemplaza **a / in / su + algo**: *pensare al lavoro → "
       "ci penso*; *credere ai fantasmi → ci credo*.",
  "ex": [["Pensi al lavoro? — Sì, *ci* penso sempre.", "¿Pensás en el trabajo? — Sí, pienso en eso siempre."],
         ["Credi ai fantasmi? — No, non *ci* credo.", "¿Creés en fantasmas? — No, no creo en eso."],
         ["*Ci* riesco!", "¡Me sale! / ¡Lo logro!"],
         ["Non *ci* capisco niente.", "No entiendo nada de esto."]],
  "tip": "Si el verbo pide *di*, va *ne*; si pide *a*, *in* o *su*, va *ci*: "
         "*parlare di → ne parlo*, *pensare a → ci penso*."},

 {"h": "Expresiones fijas",
  "r": "Algunos verbos llevan *ci* o *ne* **fijos** y cambian de sentido: "
       "aprendelos como palabras nuevas.",
  "table": {"head": ["Expresión", "Sentido"],
            "rows": [["ci vuole / ci vogliono", "hace falta / hacen falta"],
                     ["c'è / ci sono", "hay"],
                     ["farcela", "arreglárselas, lograrlo (ce la faccio)"],
                     ["andarsene", "irse (me ne vado)"],
                     ["averne abbastanza", "estar harto (ne ho abbastanza)"],
                     ["non poterne più", "no aguantar más (non ne posso più)"],
                     ["metterci", "tardar (ci metto due ore)"],
                     ["volerci", "hacer falta (ci vogliono due ore)"]]},
  "ex": [["*Ci vogliono* due ore.", "Hacen falta dos horas."],
         ["*Ci metto* dieci minuti.", "Tardo diez minutos."],
         ["Non *ne posso più*!", "¡No doy más!"],
         ["*Ne ho abbastanza*.", "Estoy harto."]],
  "warn": "*ci metto due ore* = yo tardo dos horas (personal). *ci vogliono "
          "due ore* = se necesitan dos horas (impersonal). No los mezcles."},
]},

22: {
"intro": "Dos pronombres átonos juntos: el orden es el del castellano, pero "
         "la forma cambia. Es mecánico, así que se automatiza repitiendo.",
"blocks": [
 {"h": "La transformación",
  "r": "El indirecto va **primero** y su *-i* pasa a **-e**: *mi + lo → me "
       "lo*. *gli* y *le* dan **glielo**.",
  "table": {"head": ["", "+ lo", "+ la", "+ li", "+ le", "+ ne"],
            "rows": [["mi", "me lo", "me la", "me li", "me le", "me ne"],
                     ["ti", "te lo", "te la", "te li", "te le", "te ne"],
                     ["gli / le / Le", "glielo", "gliela", "glieli", "gliele", "gliene"],
                     ["ci", "ce lo", "ce la", "ce li", "ce le", "ce ne"],
                     ["vi", "ve lo", "ve la", "ve li", "ve le", "ve ne"],
                     ["si", "se lo", "se la", "se li", "se le", "se ne"]]},
  "ex": [["*Me lo* dici?", "¿Me lo decís?"],
         ["Il libro? *Te lo* do domani.", "¿El libro? Te lo doy mañana."],
         ["Le foto? *Ve le* mando stasera.", "¿Las fotos? Se las mando esta noche."]],
  "warn": "La sorpresa no es el orden sino la vocal: «mi lo» no existe, "
          "siempre *me lo*, *te la*, *ce ne*. La *i* pasa a *e* sin "
          "excepción."},

 {"h": "glielo: una palabra, muchos sentidos",
  "r": "*glielo* se escribe **junto** y es «se lo» a él, a ella y a usted; "
       "hoy también a ellos.",
  "ex": [["*Glielo* dico io.", "Se lo digo yo."],
         ["Signora, *glielo* porto subito.", "Señora, se lo traigo enseguida."],
         ["Anna vuole la ricetta: *gliela* mando.", "Ana quiere la receta: se la mando."],
         ["Ai ragazzi? *Glielo* spiego io.", "¿A los chicos? Se lo explico yo."]],
  "warn": "No calques «se lo»: para «a él / a ella» es *glielo*. En "
          "italiano *se lo* es reflexivo: *se lo mette* = se lo pone (él "
          "mismo).",
  "more": ["Para el plural, el italiano culto diría *lo do loro* (se lo doy "
           "a ellos), con *loro* después del verbo. Hoy suena rebuscado: "
           "*glielo do* cubre también ese caso."]},

 {"h": "En frases de todos los días",
  "r": "Los combinados van **delante del verbo conjugado**: indirecto + "
       "directo, o indirecto + *ne*.",
  "ex": [["*Me lo* dai?", "¿Me lo das?"],
         ["*Te la* spiego dopo.", "Te la explico después."],
         ["*Ce ne* ha parlato ieri.", "Nos habló de eso ayer."],
         ["*Se ne* sono andati.", "Se fueron."]],
  "tip": "*andarsene* (irse) se conjuga siempre con los dos: *me ne vado*, "
         "*te ne vai*, *se ne sono andati*."},

 {"h": "En los tiempos compuestos",
  "r": "El participio **concuerda** con el pronombre directo: *me l'ha data* "
       "(la carta), *gliele ho date* (las llaves).",
  "ex": [["Il libro? *Me l'ha prestato* Marco.", "¿El libro? Me lo prestó Marco."],
         ["La lettera? *Me l'ha data* ieri.", "¿La carta? Me la dio ayer."],
         ["Le chiavi? *Gliele ho date* ieri.", "¿Las llaves? Se las di ayer."],
         ["*Ce li* hanno *portati*.", "Nos los trajeron."]],
  "warn": "*lo* y *la* se apostrofan ante *ha*: *me l'ha*. Solo el "
          "participio te dice si era «lo» o «la»: *me l'ha dato / data*."},

 {"h": "Con infinitivo e imperativo, pegados",
  "q": [{"prompt": "¿Cuál está bien? «¡Dámelo!»", "answer": "Dammelo!", "options": ["Dammelo!", "Damelo!", "Me lo da'!"]}, {"prompt": "¿Cuál está bien? «Quiero decírtelo.»", "answer": "Voglio dirtelo.", "options": ["Voglio dirtelo.", "Voglio dirtilo.", "Voglio dirlo ti."]}, {"prompt": "¿Cuál está bien? «¡Decíselo ya!»", "answer": "Diglielo subito!", "options": ["Diglielo subito!", "Digglielo subito!", "Digli lo subito!"]}],
  "r": "Con infinitivo e imperativo van **pegados al final**, como en "
       "castellano: *dirtelo*, *dammelo*.",
  "ex": [["Voglio *dirtelo*.", "Quiero decírtelo."],
         ["Puoi *portarmelo*?", "¿Me lo podés traer?"],
         ["*Dammelo*!", "¡Dámelo!"],
         ["*Diglielo* subito!", "¡Decíselo ya!"],
         ["Non *dirmelo*!", "¡No me lo digas!"]],
  "warn": "Con *da', di', fa', va', sta'* la consonante se duplica: "
          "*dammelo*, *fammelo*. Con *gli*, no: *diglielo*.",
  "tip": "Con los modales valen las dos: *te lo voglio dire* = *voglio "
         "dirtelo*. Elegí una y usala siempre hasta que salga sola."},
]},

23: {
"intro": "Comparar es fácil hasta que hay que elegir entre *di* y *che*: en "
         "castellano los dos son «que». Es pregunta fija de todos los "
         "exámenes.",
"parts": [
 {"h": "Comparativos: di o che, igualdad", "blocks": [0, 1],
  "match": r"^(?!.*(superlativ|issimo|más largo|mayor|malísima|máxima|mínima)).*(compar|tan alto|menos|di \+ artículo)"},
 {"h": "Superlativos e irregulares", "blocks": [2, 3, 4],
  "match": r"superlativ|issimo|mayor|más"},
],
"blocks": [
 {"h": "di o che",
  "r": "*di* ante sustantivo, pronombre o número. *che* entre dos adjetivos, "
       "dos verbos o dos sustantivos del mismo verbo, y ante preposición.",
  "table": {"head": ["Se usa", "Cuándo", "Ejemplo"],
            "rows": [["di", "ante sustantivo o pronombre", "Marco è più alto di Luca."],
                     ["di", "ante número", "Ho più di venti libri."],
                     ["che", "entre dos adjetivos", "È più simpatico che bello."],
                     ["che", "entre dos verbos", "È più facile dire che fare."],
                     ["che", "ante preposición", "Vado più a Roma che a Milano."],
                     ["che", "dos sustantivos, mismo verbo", "Bevo più caffè che tè."]]},
  "ex": [["Anna è più giovane *di* me.", "Ana es más joven que yo."],
         ["Ho più *di* venti libri.", "Tengo más de veinte libros."],
         ["Studiare è meno noioso *che* lavorare.", "Estudiar es menos aburrido que trabajar."],
         ["Mi piace più il mare *che* la montagna.", "Me gusta más el mar que la montaña."]],
  "more": ["La idea de fondo: *di* compara dos elementos distintos respecto "
           "de UNA misma cualidad (Marco y Luca, respecto de la altura). "
           "*che* compara dos cualidades, dos acciones o dos cantidades del "
           "mismo elemento."]},

 {"h": "Igualdad",
  "r": "*come* o *quanto*: *Marco è alto come Luca*. El *così* o *tanto* de "
       "delante suele omitirse.",
  "ex": [["Marco è alto *come* Luca.", "Marco es tan alto como Luca."],
         ["Marco è *tanto* alto *quanto* Luca.", "Marco es tan alto como Luca."],
         ["Ho *tanti* libri *quanti* quaderni.", "Tengo tantos libros como cuadernos."]],
  "tip": "Con sustantivos, *tanto* y *quanto* concuerdan como adjetivos: "
         "*tanti libri quanti quaderni*."},

 {"h": "Superlativo relativo",
  "r": "Artículo + *più / meno* + adjetivo + *di*: *il ragazzo più alto "
       "della classe*. El artículo **no se repite**.",
  "ex": [["È la città *più bella* d'Italia.", "Es la ciudad más linda de Italia."],
         ["È il ragazzo *più alto* della classe.", "Es el chico más alto de la clase."],
         ["È *il più* bravo di tutti.", "Es el más hábil de todos."]],
  "warn": "Nada de «la città la più bella»: un solo artículo, igual que en "
          "castellano.",
  "more": ["Detrás de un superlativo relativo, el italiano culto pide "
           "congiuntivo («la cosa más linda que haya visto»). Lo vas a ver "
           "más adelante, cuando llegue el congiuntivo."]},

 {"h": "Superlativo absoluto",
  "r": "*-issimo* o *molto* + adjetivo: *bellissimo* = *molto bello*. "
       "Concuerda como cualquier adjetivo.",
  "ex": [["Sono *stanchissimo*.", "Estoy cansadísimo."],
         ["È *bravissima*.", "Es buenísima (en lo que hace)."],
         ["Le case sono *molto belle*.", "Las casas son muy lindas."]],
  "tip": "Los terminados en *-co* / *-go* suman *h*: *ricco → ricchissimo*, "
         "*lungo → lunghissimo*."},

 {"h": "Las formas irregulares",
  "r": "*buono, cattivo, grande, piccolo* tienen comparativo propio: "
       "*migliore, peggiore, maggiore, minore*. Adverbios: *meglio, peggio*.",
  "table": {"head": ["Adjetivo", "Comparativo", "Superlativo rel.", "Superl. abs."],
            "rows": [["buono", "migliore", "il migliore", "ottimo"],
                     ["cattivo", "peggiore", "il peggiore", "pessimo"],
                     ["grande", "maggiore", "il maggiore", "massimo"],
                     ["piccolo", "minore", "il minore", "minimo"],
                     ["bene (adv.)", "meglio", "—", "benissimo"],
                     ["male (adv.)", "peggio", "—", "malissimo"]]},
  "ex": [["È il mio *migliore* amico.", "Es mi mejor amigo."],
         ["Canta *meglio* di me.", "Canta mejor que yo."],
         ["Oggi sto *peggio*.", "Hoy estoy peor."]],
  "warn": "*migliore* es adjetivo (*un libro migliore*); *meglio* es "
          "adverbio (*canta meglio*). Confundirlos es como decir «canta "
          "mejor libro»."},
]},

24: {
"intro": "Llega el congiuntivo. Esta semana, solo la forma del presente: "
         "regulares, irregulares y la trampa de la vocal. El uso, la semana "
         "que viene.",
"parts": [
 {"h": "Cómo se arma el congiuntivo", "blocks": [0, 1, 2],
  "match": r"^(?!.*(irregular|prefieren|registro cuidado)).*(congiuntivo|subjuntivo)"},
 {"h": "Irregulares y usos", "blocks": [3, 4],
  "match": r"irregular|prefieren"},
],
"blocks": [
 {"h": "Cómo se arma",
  "r": "Tomá el *io* del presente, sacale la *-o* y sumá las terminaciones: "
       "*vengo → venga*, *faccio → faccia*.",
  "table": {"head": ["", "-are (parlare)", "-ere (prendere)", "-ire (dormire)", "-isc (finire)"],
            "rows": [["io", "parli", "prenda", "dorma", "finisca"],
                     ["tu", "parli", "prenda", "dorma", "finisca"],
                     ["lui/lei", "parli", "prenda", "dorma", "finisca"],
                     ["noi", "parliamo", "prendiamo", "dormiamo", "finiamo"],
                     ["voi", "parliate", "prendiate", "dormiate", "finiate"],
                     ["loro", "parlino", "prendano", "dormano", "finiscano"]]},
  "ex": [["Spero che *venga* anche Marco.", "Espero que venga también Marco."],
         ["Voglio che tu *faccia* i compiti.", "Quiero que hagas la tarea."],
         ["Spero che *finiscano* presto.", "Espero que terminen pronto."]],
  "more": ["El mismo mecanismo, con otros irregulares del presente: *esco → "
           "esca*, *dico → dica*, *bevo → beva*, *rimango → rimanga*, "
           "*scelgo → scelga*. Los verbos en *-isc* (*finire*) conservan el "
           "*-isc-* en el singular y en *loro*, igual que en el presente."]},

 {"h": "Singular idéntico: poné el pronombre",
  "r": "*io*, *tu* y *lui/lei* tienen **la misma forma**. Si no queda claro "
       "quién es el sujeto, poné el pronombre.",
  "ex": [["Credo che *tu abbia* ragione.", "Creo que tenés razón."],
         ["Penso che *lui venga*.", "Creo que viene él."],
         ["Vuole che *io parta*.", "Quiere que yo me vaya."]],
  "warn": "En castellano la terminación ya dice quién («que vengas»), así "
          "que el pronombre se te va a olvidar. *che venga* puede ser yo, "
          "vos o él."},

 {"h": "La vocal que confunde",
  "r": "Al revés que en castellano: *-are* hace **-i** (*che parli*); *-ere* "
       "e *-ire* hacen **-a** (*che prenda*, *che dorma*).",
  "ex": [["Credo che lui *parli* bene.", "Creo que él habla bien."],
         ["Credo che lui *prenda* il treno.", "Creo que toma el tren."],
         ["Spero che tu *dorma* bene.", "Espero que duermas bien."],
         ["Spero che *arrivino* presto.", "Espero que lleguen pronto."]],
  "warn": "Como el indicativo es *parla*, el instinto produce «che parla»: "
          "indicativo, error. Es la confusión más común del hispanohablante.",
  "more": ["En castellano, *-ar* usa *e* (que hable) y *-er/-ir* usan *a* "
           "(que coma, que viva). El italiano coincide en *-ere/-ire*, pero "
           "en *-are* usa *i*, no *e*."]},

 {"h": "Los irregulares de memoria",
  "r": "Muchos salen del *io* del presente (*vado → vada*). Otros van de "
       "memoria: *sia*, *abbia*, *sappia*, *dia*, *stia*.",
  "table": {"head": ["Verbo", "io/tu/lui", "noi", "voi", "loro"],
            "rows": [["essere", "sia", "siamo", "siate", "siano"],
                     ["avere", "abbia", "abbiamo", "abbiate", "abbiano"],
                     ["andare", "vada", "andiamo", "andiate", "vadano"],
                     ["fare", "faccia", "facciamo", "facciate", "facciano"],
                     ["dare", "dia", "diamo", "diate", "diano"],
                     ["stare", "stia", "stiamo", "stiate", "stiano"],
                     ["potere", "possa", "possiamo", "possiate", "possano"],
                     ["volere", "voglia", "vogliamo", "vogliate", "vogliano"],
                     ["dovere", "debba", "dobbiamo", "dobbiate", "debbano"],
                     ["sapere", "sappia", "sappiamo", "sappiate", "sappiano"],
                     ["venire", "venga", "veniamo", "veniate", "vengano"],
                     ["uscire", "esca", "usciamo", "usciate", "escano"],
                     ["dire", "dica", "diciamo", "diciate", "dicano"],
                     ["bere", "beva", "beviamo", "beviate", "bevano"],
                     ["scegliere", "scelga", "scegliamo", "scegliate", "scelgano"],
                     ["rimanere", "rimanga", "rimaniamo", "rimaniate", "rimangano"]]},
  "ex": [["Spero che *sia* vero.", "Espero que sea verdad."],
         ["Spero che tu *stia* bene.", "Espero que estés bien."],
         ["Credo che *vada* a Roma.", "Creo que va a Roma."],
         ["Spero che *possano* venire.", "Espero que puedan venir."]],
  "tip": "*noi* es igual al indicativo (*parliamo*) y *voi* sale de *noi* "
         "(*-iamo → -iate*). Solo aprendés dos formas: la del singular y la "
         "de *loro*."},

 {"h": "Ya lo venías usando",
  "r": "El imperativo formal de la semana 12 **es congiuntivo**: *Scusi!*, "
       "*Senta!*, *Venga!*. Media forma ya la sabés.",
  "ex": [["*Scusi*, dov'è la stazione?", "Disculpe, ¿dónde está la estación?"],
         ["Mi *dica*!", "¡Dígame!"],
         ["*Prenda* pure!", "¡Tome nomás! (usted)"],
         ["Si *accomodi*!", "¡Póngase cómodo!"]]},
]},

25: {
"intro": "Ahora, el uso. El gran choque con el castellano son los verbos de "
         "opinión: «creo que es tarde» va con indicativo en castellano y con "
         "congiuntivo en italiano.",
"blocks": [
 {"h": "La regla madre",
  "r": "Congiuntivo después de *che* cuando el principal expresa **algo no "
       "constatado** —opinión, duda, deseo, emoción— y los sujetos son "
       "**distintos**.",
  "table": {"head": ["Categoría", "Verbos", "Ejemplo"],
            "rows": [["opinión", "credere, pensare, ritenere, immaginare", "Credo che sia tardi."],
                     ["duda", "dubitare, non sapere se", "Dubito che venga."],
                     ["deseo/voluntad", "volere, desiderare, preferire, sperare", "Voglio che tu venga."],
                     ["emoción", "essere contento, temere, avere paura", "Sono contento che tu stia bene."],
                     ["espera", "aspettare che", "Aspetto che finisca."],
                     ["impersonales", "è necessario, è possibile, bisogna, sembra", "È possibile che piova."]]},
  "ex": [["Spero che tu *stia* bene.", "Espero que estés bien."],
         ["Voglio che tu *venga*.", "Quiero que vengas."],
         ["Ho paura che *sia* tardi.", "Tengo miedo de que sea tarde."],
         ["È possibile che *piova*.", "Puede que llueva."]]},

 {"h": "«Creo que es»: congiuntivo",
  "q": [{"prompt": "¿Cuál está bien? «Creo que tiene razón.»", "answer": "Credo che abbia ragione.", "options": ["Credo che abbia ragione.", "Credo che ha ragione.", "Credo che avrà ragione."]}, {"prompt": "Elegí la que va", "stem": "Penso che ___ una buona idea.", "answer": "sia", "options": ["sia", "è", "sarà"]}, {"prompt": "Elegí la que va", "stem": "Mi sembra che Marco ___ stanco.", "answer": "sia", "options": ["sia", "è", "sta"]}],
  "r": "*credere*, *pensare*, *sembrare* piden **congiuntivo**, aunque en "
       "castellano vayan con indicativo: *Credo che sia tardi*.",
  "ex": [["Credo che *abbia* ragione.", "Creo que tiene razón."],
         ["Penso che *sia* una buona idea.", "Pienso que es una buena idea."],
         ["Mi sembra che *sia* in ritardo.", "Me parece que está atrasado."],
         ["Immagino che tu *sia* stanco.", "Imagino que estás cansado."]],
  "warn": "Es el error que más rápido delata a un hispanohablante. La buena "
          "noticia: la regla es muy estable y se corrige rápido."},

 {"h": "Cuándo NO va congiuntivo",
  "q": [{"prompt": "¿Cuál está bien? «Es verdad que tiene razón.»", "answer": "È vero che ha ragione.", "options": ["È vero che ha ragione.", "È vero che abbia ragione.", "È vero che avesse ragione."]}, {"prompt": "Elegí la que va", "stem": "So che ___ tardi.", "answer": "è", "options": ["è", "sia", "fosse"]}, {"prompt": "Elegí la que va", "stem": "Secondo me, ___ una buona idea.", "answer": "è", "options": ["è", "sia", "che sia"]}],
  "r": "Si el principal presenta **un hecho** (*so che*, *è vero che*, *vedo "
       "che*) o hay *secondo me*: **indicativo**.",
  "ex": [["*So che è* tardi.", "Sé que es tarde."],
         ["*È vero che ha* ragione.", "Es verdad que tiene razón."],
         ["*Vedo che sei* stanco.", "Veo que estás cansado."],
         ["*Secondo me, è* una buona idea.", "Para mí, es una buena idea."]],
  "tip": "Si la información se da como dato, indicativo. Si pasa por la "
         "cabeza de alguien —creo, espero, temo, quiero, dudo—, congiuntivo.",
  "more": ["Otros que presentan hechos y van con indicativo: *è certo che*, "
           "*è chiaro che*, *dico che*, *sono sicuro che*."]},

 {"h": "Mismo sujeto: infinitivo",
  "q": [{"prompt": "¿Cuál está bien? «Creo tener razón.»", "answer": "Credo di avere ragione.", "options": ["Credo di avere ragione.", "Credo che io abbia ragione.", "Credo avere ragione."]}, {"prompt": "¿Cuál está bien? «Quiero irme mañana.»", "answer": "Voglio partire domani.", "options": ["Voglio partire domani.", "Voglio di partire domani.", "Voglio che parta domani."]}, {"prompt": "Elegí la que va", "stem": "Spero ___ in tempo.", "answer": "di arrivare", "options": ["di arrivare", "che arrivi", "arrivare"]}],
  "r": "Si el sujeto es **el mismo**, nada de *che*: *di* + infinitivo. Como "
       "en castellano: «creo tener razón».",
  "ex": [["Credo *di avere* ragione.", "Creo tener razón."],
         ["Spero *di arrivare* in tempo.", "Espero llegar a tiempo."],
         ["Voglio *partire* domani.", "Quiero irme mañana. (sin di)"],
         ["Voglio che tu *parta* domani.", "Quiero que te vayas mañana."]],
  "warn": "*volere*, *potere*, *dovere*, *preferire*, *desiderare* van con "
          "infinitivo **sin** *di*: *voglio partire*. *sperare*, *credere*, "
          "*pensare* piden *di*: *spero di partire*."},
]},

26: {
"intro": "Cierre de la segunda estación: pasados y futuros ordenados, el "
         "trapassato prossimo, los pronombres combinados con *ne* y *ci*, y "
         "el congiuntivo presente.",
"parts": [
 {"h": "Repaso: los tiempos del pasado y del futuro", "blocks": [0, 1, 2, 3],
  "match": r"^(?!.*piac).*(futuro|condicional|condizionale|imperfetto|passato|trapassato|tiempo|auxiliar|reflexivo)"},
 {"h": "Repaso: pronombres combinados, ne, ci y congiuntivo", "blocks": [4, 5],
  "match": r"^(?!.*piac).*(pronombre|combinad|«ne»|\bne\b|\bci\b|congiuntivo|subjuntivo|posesiv|indefinid)"},
 {"h": "Repaso: trampas de los verbos y de la frase", "blocks": [6, 7],
  "match": r"\S"},
],
"blocks": [
 {"h": "El mapa de los tiempos",
  "r": "Dos mecanismos: terminación sobre la raíz (presente, imperfetto, "
       "futuro, condizionale) o auxiliar + participio (tiempos compuestos).",
  "table": {"head": ["Tiempo", "Se forma", "Sirve para"],
            "rows": [["presente", "raíz + terminación", "ahora, habitual, futuro cercano"],
                     ["passato prossimo", "avere/essere + participio", "hecho pasado y terminado"],
                     ["imperfetto", "raíz + -avo/-evo/-ivo", "fondo, costumbre, descripción"],
                     ["trapassato prossimo", "avevo/ero + participio", "pasado anterior a otro pasado"],
                     ["futuro semplice", "raíz de futuro + -ò, -ai, -à", "porvenir y suposición"],
                     ["futuro anteriore", "avrò/sarò + participio", "terminado antes de un futuro"],
                     ["condizionale", "raíz de futuro + -ei, -esti, -ebbe", "cortesía, deseo, noticia no confirmada"]]},
  "ex": [["Ieri *ho lavorato* tanto.", "Ayer trabajé mucho."],
         ["Da ragazzo *lavoravo* in un bar.", "De joven trabajaba en un bar."],
         ["Domani *lavorerò* da casa.", "Mañana voy a trabajar desde casa."],
         ["*Lavorerei* volentieri con te.", "Trabajaría con gusto con vos."]]},

 {"h": "El trapassato prossimo",
  "r": "Imperfetto de *avere* o *essere* + participio: lo que pasó **antes** "
       "de otro hecho pasado.",
  "ex": [["*Avevo* già *mangiato*.", "Ya había comido."],
         ["Non *avevo* mai *visto* Roma.", "Nunca había visto Roma."],
         ["Quando sono arrivato, il film *era* già *cominciato*.", "Cuando llegué, la película ya había empezado."]],
  "warn": "Al hablar decimos «cuando llegué, la película ya empezó». En "
          "italiano, el hecho anterior va en trapassato: *era già "
          "cominciato*.",
  "tip": "El auxiliar se elige como en el passato prossimo: *avevo "
         "mangiato*, *ero uscito*."},

 {"h": "Auxiliar: la decisión de cada frase",
  "r": "*essere*: desplazamiento (*andare, uscire*), cambio de estado, "
       "reflexivos y familia de *piacere*. *avere*: todo lo demás.",
  "ex": [["Anna *è uscita* presto.", "Ana salió temprano."],
         ["*Sono diventato* papà.", "Me convertí en papá."],
         ["*Ho camminato* tanto.", "Caminé mucho."],
         ["Mi *è piaciuta* la cena.", "Me gustó la cena."]],
  "warn": "Con *avere*, el participio concuerda con *lo, la, li, le, ne* "
          "delante (*le ho viste, ne ho comprate due*); con *mi, ti, ci, vi* "
          "es opcional.",
  "tip": "Moverse no alcanza: *camminare*, *viaggiare* y *nuotare* van con "
         "*avere*.",
  "more": ["Con *essere*, el participio concuerda con el sujeto: *Anna è "
           "uscita*, *i ragazzi sono arrivati*. También van con *essere* "
           "los pronominales (*mi sono accorto*) y los impersonales (*è "
           "successo*)."]},

 {"h": "Raíces de futuro y condicional",
  "r": "La raíz irregular del futuro es la misma del condicional: *sarò / "
       "sarei*, *vorrò / vorrei*.",
  "table": {"head": ["Verbo", "Raíz", "Verbo", "Raíz"],
            "rows": [["essere", "sar-", "avere", "avr-"],
                     ["andare", "andr-", "potere", "potr-"],
                     ["volere", "vorr-", "venire", "verr-"],
                     ["dovere", "dovr-", "sapere", "sapr-"],
                     ["vedere", "vedr-", "rimanere", "rimarr-"],
                     ["tenere", "terr-", "bere", "berr-"],
                     ["fare", "far-", "dare", "dar-"]]},
  "ex": [["*Verrò* alla festa.", "Voy a ir a la fiesta."],
         ["*Verrei*, ma non posso.", "Iría, pero no puedo."],
         ["Domani *dovrò* lavorare.", "Mañana voy a tener que trabajar."],
         ["*Dovresti* riposare.", "Deberías descansar."]]},

 {"h": "Pronombres combinados, ne y ci",
  "r": "Indirecto primero y *-i* → **-e**: *me lo*; *gli* + *lo* → "
       "**glielo**. *ne*: cantidad o «de eso». *ci*: lugar.",
  "ex": [["*Me lo* dai?", "¿Me lo das?"],
         ["*Glielo* dico io.", "Se lo digo yo."],
         ["Quanti libri hai? *Ne* ho tre.", "¿Cuántos libros tenés? Tengo tres."],
         ["Vai a Roma? Sì, *ci* vado domani.", "¿Vas a Roma? Sí, voy mañana."]]},

 {"h": "Congiuntivo presente",
  "r": "Después de *penso che, credo che, voglio che, spero che*: "
       "**congiuntivo**. Con *so che* y *è vero che*, indicativo.",
  "table": {"head": ["", "parlare", "prendere", "essere", "avere"],
            "rows": [["io/tu/lui", "parli", "prenda", "sia", "abbia"],
                     ["noi", "parliamo", "prendiamo", "siamo", "abbiamo"],
                     ["voi", "parliate", "prendiate", "siate", "abbiate"],
                     ["loro", "parlino", "prendano", "siano", "abbiano"]]},
  "ex": [["Penso che *sia* tardi.", "Creo que es tarde."],
         ["Voglio che tu *venga*.", "Quiero que vengas."],
         ["So che *è* tardi.", "Sé que es tarde. (dato: indicativo)"]],
  "warn": "*Credo che sia tardi*, nunca «credo che è tardi». Y con el mismo "
          "sujeto, *di* + infinitivo: *credo di avere ragione*."},

 {"h": "Repaso: trampas de los verbos",
  "r": "1. *mi sono lavato*, jamás «mi ho lavato». 2. *parleremo* ≠ "
       "*parleremmo*. 3. Futuro después de *quando*.",
  "ex": [["Stamattina *mi sono alzato* tardi.", "Hoy a la mañana me levanté tarde."],
         ["Domani *parleremo* con lui.", "Mañana vamos a hablar con él."],
         ["*Parleremmo* volentieri con lui.", "Hablaríamos con gusto con él."],
         ["Quando *arriverai*, ti chiamerò.", "Cuando llegues, te llamo."]],
  "tip": "Y detrás de *se* hipotético, nunca condicional: «se avrei» no "
         "existe."},

 {"h": "Repaso: trampas de la frase",
  "r": "4. *migliore* adjetivo, *meglio* adverbio. 5. *più alto di Luca*, "
       "pero *più simpatico che bello*. 6. *qualche* + singular.",
  "ex": [["È il mio *migliore* amico.", "Es mi mejor amigo."],
         ["Canta *meglio* di me.", "Canta mejor que yo."],
         ["È più simpatico *che* bello.", "Es más simpático que lindo."],
         ["Ho *qualche* amico a Roma.", "Tengo algunos amigos en Roma."]],
  "tip": "7. *mio padre*, sin artículo; pero *il loro padre* y *i miei "
         "fratelli*, con artículo."},
]},

}
