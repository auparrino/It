# -*- coding: utf-8 -*-
"""Stagione 2 — Il Ponte (settimane 14-26, A2 → B1)."""

LESSONS = {

14: {
"intro": "*piacere* funciona como «gustar»: lo que gusta es el sujeto. El "
         "mecanismo ya lo tenés; lo difícil llega con los nombres, los "
         "tónicos y los verbos parecidos.",
"blocks": [
 {"h": "El mecanismo",
  "r": "El sujeto es **lo que gusta**; la persona va en indirecto. *piace* "
       "con singular o infinitivo, *piacciono* con plural.",
  "ex": [["Mi piace il caffè.", "Me gusta el café."],
         ["Mi piacciono i film italiani.", "Me gustan las películas italianas."],
         ["Mi piace leggere.", "Me gusta leer."],
         ["A Marco piace la musica.", "A Marco le gusta la música."]],
  "warn": "Con nombre o sustantivo va **a**: *a Marco piace*, *ai bambini "
          "piacciono*. Sin *a*, la frase queda dicha al revés."},

 {"h": "Negar y enfatizar",
  "r": "*non* va antes del pronombre. Para contrastar, pronombre **tónico** "
       "con *a*: *a me*, *a lui*.",
  "ex": [["Non mi piace per niente.", "No me gusta para nada."],
         ["A me piace, a lui no.", "A mí me gusta, a él no."],
         ["A noi piacciono le montagne.", "A nosotros nos gustan las montañas."],
         ["Mi piace un sacco.", "Me gusta muchísimo. (coloquial)"],
         ["Ti va di uscire?", "¿Tenés ganas de salir?"]]},

 {"h": "En pasado va con essere",
  "r": "En passato prossimo *piacere* va con **essere**, y el participio "
       "concuerda con **lo que gustó**, no con la persona.",
  "ex": [["Mi è piaciuto il film.", "Me gustó la película."],
         ["Mi è piaciuta la cena.", "Me gustó la cena."],
         ["Mi sono piaciuti i quadri.", "Me gustaron los cuadros."],
         ["Mi sono piaciute le foto.", "Me gustaron las fotos."]]},

 {"h": "La familia de piacere",
  "r": "Estos verbos funcionan **igual**: la cosa es el sujeto y la persona "
       "va en indirecto.",
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
  "warn": "*Mi manchi* = «te extraño», no «me extrañás». El sujeto es el "
          "ausente: *mi manca mio fratello* = extraño a mi hermano."},
]},

15: {
"intro": "LA semana difícil del B1: passato prossimo o imperfetto. No se "
         "decide por «puntual o duradero», sino por lo que mira quien habla: "
         "los hechos o el decorado.",
"blocks": [
 {"h": "La forma del imperfetto",
  "r": "Raíz + *-a-*, *-e-* o *-i-* según la conjugación, y las mismas "
       "terminaciones para las tres: *parlavo, vendevo, dormivo*.",
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
  "r": "Preguntate: **¿cuento qué pasó o describo cómo estaban las cosas?** "
       "El passato prossimo avanza la historia; el imperfetto pinta fondo, "
       "costumbre y estado.",
  "table": {"head": ["Imperfetto", "Passato prossimo"],
            "rows": [["descripción del fondo", "hecho que avanza el relato"],
                     ["costumbre repetida", "hecho ocurrido un número de veces"],
                     ["estado físico o mental", "cambio de estado"],
                     ["edad, hora, clima", "acontecimiento fechado"],
                     ["acción en curso interrumpida", "la interrupción"]]},
  "ex": [["Mentre dormivo, è suonato il telefono.", "Mientras dormía, sonó el teléfono."],
         ["Da bambino andavo al mare ogni estate.", "De chico iba al mar todos los veranos."],
         ["Ieri sono andato al mare.", "Ayer fui al mar."],
         ["Faceva freddo e non c'era nessuno.", "Hacía frío y no había nadie."]],
  "warn": "«¿Duró mucho?» no sirve: *ho abitato a Roma per dieci anni* dura "
          "diez años y va en passato prossimo, porque es un período cerrado."},

 {"h": "El mismo verbo, dos lecturas",
  "r": "Con *sapere, conoscere* y los modales, el imperfetto deja el "
       "resultado abierto; el passato prossimo lo cierra. Como «podía» y "
       "«pude».",
  "ex": [["Sapevo la verità. / Ho saputo la verità.", "Sabía la verdad. / Me enteré de la verdad."],
         ["Conoscevo Marco. / Ho conosciuto Marco.", "Conocía a Marco. / Conocí a Marco."],
         ["Potevo farlo. / Ho potuto farlo.", "Podía hacerlo. / Pude (y lo hice)."],
         ["Volevo uscire. / Ho voluto uscire.", "Quería salir. / Quise salir (y salí)."],
         ["Doveva partire. / È dovuto partire.", "Tenía que irse. / Tuvo que irse (y se fue)."]]},

 {"h": "Imperfetto de cortesía",
  "r": "Para pedir con suavidad: *Volevo un caffè* (quería un café) es más "
       "amable que *voglio*.",
  "ex": [["Volevo un caffè, per favore.", "Quería un café, por favor."],
         ["Cercavo il signor Rossi.", "Buscaba al señor Rossi."]]},

 {"h": "Adelanto: imperfetto en la hipótesis",
  "r": "Al hablar, el imperfetto reemplaza las formas cultas de la hipótesis "
       "irreal: *Se lo sapevo, non venivo*. Reconocelo; en el examen, "
       "escribí la forma culta.",
  "ex": [["Se lo sapevo, non venivo.", "Si lo sabía, no venía (coloquial)."],
         ["Se l'avessi saputo, non sarei venuto.", "Si lo hubiera sabido, no habría venido (forma culta)."]],
  "more": ["La forma culta usa congiuntivo trapassato y condizionale "
           "passato: llegan en las semanas 30 y 31, y la hipótesis completa "
           "en la 33."]},
]},

16: {
"intro": "Los reflexivos en pasado tienen una sola regla, absoluta, y el "
         "castellano empuja justo al revés. Esta semana la automatizás.",
"blocks": [
 {"h": "Todos con essere. Todos.",
  "r": "Reflexivos y pronominales van **siempre con *essere***, aunque sin "
       "pronombre el verbo lleve *avere*. El participio concuerda con el "
       "sujeto.",
  "table": {"head": ["", "lavarsi"],
            "rows": [["io", "mi sono lavato / lavata"],
                     ["tu", "ti sei lavato / lavata"],
                     ["lui / lei", "si è lavato / lavata"],
                     ["noi", "ci siamo lavati / lavate"],
                     ["voi", "vi siete lavati / lavate"],
                     ["loro", "si sono lavati / lavate"]]},
  "warn": "Castellano: «me he lavado», con HABER. Italiano: *mi sono "
          "lavato*, con SER. «mi ho lavato» es el error más penalizado del "
          "B1."},

 {"h": "El mismo verbo con y sin pronombre",
  "r": "Sin pronombre, el verbo sigue su regla: *ho lavato la macchina*. Con "
       "pronombre reflexivo, pasa a *essere*: *mi sono lavato*.",
  "ex": [["Ho lavato la macchina. / Mi sono lavato le mani.", "Lavé el auto. / Me lavé las manos."],
         ["Ho svegliato i bambini. / Mi sono svegliato tardi.", "Desperté a los chicos. / Me desperté tarde."],
         ["Ho fermato il taxi. / Mi sono fermato al semaforo.", "Paré el taxi. / Me detuve en el semáforo."]],
  "more": ["Con objeto directo detrás (*le mani*), el italiano cuidado hace "
           "concordar el participio con el sujeto: *mi sono lavato le mani*. "
           "La concordancia con el objeto (*mi sono lavate le mani*) se "
           "admite, pero es minoritaria."]},

 {"h": "Recíprocos y pronominales",
  "r": "Los recíprocos (el uno al otro) y los pronominales idiomáticos "
       "también van con *essere*: *ci siamo visti*, *si è accorto*, *ci "
       "siamo divertiti*.",
  "ex": [["Ci siamo conosciuti a Milano.", "Nos conocimos en Milán."],
         ["Si sono salutati alla stazione.", "Se despidieron en la estación."],
         ["Mi sono dimenticata le chiavi.", "Me olvidé las llaves."],
         ["Si è accorto dell'errore.", "Se dio cuenta del error."]]},

 {"h": "Con modales, dos opciones",
  "r": "Pronombre delante → *essere*. Pronombre pegado al infinitivo → "
       "*avere*. Las dos son correctas y significan lo mismo.",
  "ex": [["Mi sono dovuto alzare presto.", "Tuve que levantarme temprano."],
         ["Ho dovuto alzarmi presto.", "Tuve que levantarme temprano."]]},
]},

17: {
"intro": "Demostrativos, posesivos e indefinidos: las piezas chicas que "
         "arman cualquier frase larga. Casi todo calca el castellano; esta "
         "semana fijás los pocos puntos donde no.",
"blocks": [
 {"h": "Demostrativos: solo dos grados",
  "r": "Dos grados, no tres: *questo* (cerca de quien habla) y *quello* "
       "(todo lo demás). *quello* ante sustantivo cambia como el artículo: "
       "*quel*, *quello*, *quell'*.",
  "table": {"head": ["", "m.sg", "f.sg", "m.pl", "f.pl"],
            "rows": [["questo", "questo", "questa", "questi", "queste"],
                     ["quello (ante sust.)", "quel / quello / quell'", "quella / quell'", "quei / quegli", "quelle"],
                     ["quello (pronombre)", "quello", "quella", "quelli", "quelle"]]},
  "ex": [["Questo caffè è buono.", "Este café está rico."],
         ["Quel ragazzo è Marco.", "Ese chico es Marco."],
         ["Quali libri? Quelli.", "¿Qué libros? Esos."]],
  "tip": "Como pronombre suelto, el masculino plural es *quelli*, nunca "
         "*quei*.",
  "more": ["*codesto* (ese, cerca de quien escucha) existe, pero es toscano "
           "o burocrático: no lo vas a necesitar."]},

 {"h": "Posesivos: siempre con artículo",
  "r": "El posesivo lleva **artículo** y concuerda con la cosa poseída, no "
       "con el dueño: *Marco e la sua macchina*. *loro* no cambia, pero "
       "lleva artículo igual.",
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
  "r": "Parentesco en **singular y sin adjetivo**: el posesivo va sin "
       "artículo. *mio padre*, *tua sorella*, *suo figlio*.",
  "ex": [["mio padre, tua sorella", "singular: sin artículo"],
         ["i miei fratelli", "plural: con artículo"],
         ["il mio caro fratello", "con adjetivo: con artículo"],
         ["la mia mamma", "forma afectiva: con artículo"],
         ["il loro padre", "con loro: siempre con artículo"]],
  "warn": "«il mio padre» es error de principiante. Y con *loro* el artículo "
          "no se cae nunca."},

 {"h": "Indefinidos que hay que saber",
  "r": "Casi todos funcionan como en castellano. Fijá tres: *qualche* + "
       "**singular**, *ogni* invariable, y *nessuno / niente* detrás del "
       "verbo con *non*.",
  "table": {"head": ["Forma", "Sentido", "Nota"],
            "rows": [["qualche + singular", "algunos", "¡siempre singular! qualche libro"],
                     ["alcuni / alcune + plural", "algunos", "alcuni libri"],
                     ["ogni + singular", "cada / todos los", "invariable: ogni giorno"],
                     ["tutto/a/i/e + artículo", "todo", "tutti i giorni, tutta la notte"],
                     ["qualcuno / qualcosa", "alguien / algo", "invariables"],
                     ["nessuno / niente", "nadie / nada", "detrás del verbo piden non"],
                     ["altro/a/i/e", "otro", "un altro libro (con «un», a diferencia de «otro libro»)"],
                     ["poco, molto, troppo, tanto", "poco, mucho...", "concuerdan como adjetivos"]]},
  "warn": "*qualche amico* = algunos amigos: «qualche amici» es error "
          "seguro. Y *ogni giorno*, nunca «ogni giorni»."},

 {"h": "molto: adjetivo o adverbio",
  "r": "Con sustantivo **concuerda** (*molti libri*, *molta gente*). Con "
       "adjetivo, adverbio o verbo **no cambia** (*molto stanchi*). Igual "
       "*poco, tanto, troppo*.",
  "ex": [["Ho molti amici.", "Tengo muchos amigos."],
         ["Sono molto contenta.", "Estoy muy contenta."],
         ["Lavorano troppo.", "Trabajan demasiado."]]},
]},

18: {
"intro": "En italiano la doble negación es obligatoria, igual que en "
         "castellano. Esta semana ordenás el inventario completo, las "
         "trampas y las exclamaciones de todos los días.",
"blocks": [
 {"h": "El esquema non ... X",
  "r": "Palabra negativa **después** del verbo → *non* delante. Palabra "
       "negativa **antes** del verbo → sin *non*. Igual que en castellano.",
  "ex": [["Non ho visto nessuno.", "No vi a nadie."],
         ["Nessuno mi ha visto.", "Nadie me vio."],
         ["Non vado mai al cinema.", "Nunca voy al cine."],
         ["Non lavoro più qui.", "Ya no trabajo acá."],
         ["Non ho né tempo né voglia.", "No tengo ni tiempo ni ganas."]]},

 {"h": "El inventario",
  "r": "Cada negación se arma con *non* + otra palabra, y casi todas calcan "
       "el castellano. La excepción es *non... che*, que significa «solo».",
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
  "warn": "*Non ho che dieci euro* = «solo tengo diez euros», no «no tengo "
          "diez euros». Trampa clásica de comprensión lectora."},

 {"h": "mica, la negación coloquial",
  "r": "*mica* refuerza la negación al hablar: *Non è mica facile!* = ¡no es "
       "nada fácil! Se dice mucho y se escribe poco.",
  "ex": [["Non è mica facile!", "¡No es nada fácil!"],
         ["Non hai mica una penna?", "¿No tenés una lapicera, por casualidad?"]]},

 {"h": "Exclamaciones con che, come, quanto",
  "r": "*Che* + sustantivo o adjetivo, **sin artículo**: *Che bello!* *Come* "
       "o *quanto* + verbo: *Come sei elegante!*",
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

19: {
"intro": "El futuro italiano es muy regular. Además de hablar del porvenir, "
         "sirve para suponer sobre el presente: *sarà a casa* = estará en "
         "casa.",
"blocks": [
 {"h": "Futuro semplice",
  "r": "Infinitivo sin la *-e* final + *-ò, -ai, -à, -emo, -ete, -anno*. En "
       "*-are*, la *a* pasa a *e*: *parlare → parlerò*.",
  "table": {"head": ["", "parlare", "vendere", "dormire"],
            "rows": [["io", "parlerò", "venderò", "dormirò"],
                     ["tu", "parlerai", "venderai", "dormirai"],
                     ["lui/lei", "parlerà", "venderà", "dormirà"],
                     ["noi", "parleremo", "venderemo", "dormiremo"],
                     ["voi", "parlerete", "venderete", "dormirete"],
                     ["loro", "parleranno", "venderanno", "dormiranno"]]},
  "tip": "La ortografía de siempre: *cercare → cercherò*, *pagare → pagherò* "
         "(con h); *cominciare → comincerò*, *mangiare → mangerò* (sin i)."},

 {"h": "Raíces irregulares",
  "r": "Pocos verbos cambian la raíz; las terminaciones son las de siempre. "
       "La misma raíz sirve después para el condicional: la aprendés dos "
       "veces.",
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
       "estará en casa. El castellano también lo hace, pero el italiano "
       "mucho más.",
  "ex": [["Che ora è? — Saranno le tre.", "¿Qué hora es? — Serán las tres."],
         ["Quanti anni ha? — Avrà quarant'anni.", "Tendrá unos cuarenta."],
         ["Dov'è Marco? — Sarà a casa.", "Estará en casa."],
         ["Sarà anche vero, ma non ci credo.", "Puede que sea cierto, pero no lo creo."]]},

 {"h": "Después de quando, futuro",
  "r": "Si el sentido es futuro, detrás de *quando* y *appena* va "
       "**futuro**: *Quando arriverai, ti darò le chiavi*.",
  "ex": [["Quando arriverai, ti darò le chiavi.", "Cuando llegues, te doy las llaves."],
         ["Appena potrò, ti chiamerò.", "Apenas pueda, te llamo."]],
  "warn": "El castellano pone subjuntivo («cuando llegues»): no lo calques. "
          "Al hablar se oye *quando arrivi*; en el examen, escribí el "
          "futuro."},
]},

20: {
"intro": "El condicional usa la raíz del futuro: si dominás la semana "
         "pasada, lo tenés casi hecho. Sirve para pedir con cortesía, "
         "aconsejar y dar noticias no confirmadas.",
"blocks": [
 {"h": "Las formas",
  "r": "Raíz de futuro + *-ei, -esti, -ebbe, -emmo, -este, -ebbero*. Las "
       "raíces irregulares son las mismas: *sarei, avrei, vorrei*.",
  "table": {"head": ["", "parlare", "essere", "avere", "volere"],
            "rows": [["io", "parlerei", "sarei", "avrei", "vorrei"],
                     ["tu", "parleresti", "saresti", "avresti", "vorresti"],
                     ["lui/lei", "parlerebbe", "sarebbe", "avrebbe", "vorrebbe"],
                     ["noi", "parleremmo", "saremmo", "avremmo", "vorremmo"],
                     ["voi", "parlereste", "sareste", "avreste", "vorreste"],
                     ["loro", "parlerebbero", "sarebbero", "avrebbero", "vorrebbero"]]},
  "warn": "*noi* lleva **dos emes**: *parleremmo* (hablaríamos). Con una "
          "sola, *parleremo*, es futuro (hablaremos)."},

 {"h": "Cortesía, deseo y consejo",
  "r": "Para pedir, desear o aconsejar sin imponer: *vorrei*, *potresti*, "
       "*mi piacerebbe*, *dovresti*.",
  "ex": [["Vorrei un caffè, per favore.", "Quisiera un café, por favor."],
         ["Potresti aiutarmi?", "¿Podrías ayudarme?"],
         ["Mi piacerebbe andare in Italia.", "Me gustaría ir a Italia."],
         ["Dovresti riposare.", "Deberías descansar."],
         ["Saprebbe dirmi dov'è la stazione?", "¿Sabría decirme dónde está la estación?"]],
  "tip": "*Vorrei* es la forma educada por defecto en un bar, un negocio o "
         "una oficina. *Voglio un caffè* suena a orden."},

 {"h": "La noticia no confirmada",
  "r": "Diarios y noticieros usan el condicional para datos **no "
       "verificados**. El castellano también, pero el italiano lo hace casi "
       "siempre.",
  "ex": [["Secondo fonti vicine al governo, il ministro si dimetterebbe.", "Según fuentes cercanas al gobierno, el ministro renunciaría."],
         ["Ci sarebbero venti feriti.", "Habría veinte heridos."]],
  "tip": "Aparece en todo examen de comprensión: leelo como «parece que»."},

 {"h": "Adelanto: nunca condicional tras se",
  "r": "Detrás de *se* hipotético **nunca** va condicional: *Se avessi "
       "tempo, verrei*, jamás «se avrei tempo». La estructura completa llega "
       "en la semana 33.",
  "ex": [["Se avessi tempo, verrei.", "Si tuviera tiempo, vendría."]],
  "warn": "En el italiano hablado regional se oye «se avrei»: no lo imites. "
          "En castellano correcto tampoco se dice «si tendría»."},
]},

21: {
"intro": "*ne* y *ci* no existen en castellano y el italiano los usa en casi "
         "cada frase. Sin ellos, tu italiano suena correcto pero extranjero.",
"blocks": [
 {"h": "NE: una cantidad",
  "r": "*ne* reemplaza **una cantidad** de algo ya mencionado. En castellano "
       "no se dice nada; en italiano es **obligatorio**.",
  "ex": [["Quanti libri hai? — Ne ho tre.", "¿Cuántos libros tenés? — Tengo tres."],
         ["Vuoi del pane? — Sì, ne prendo un po'.", "¿Querés pan? — Sí, agarro un poco."],
         ["Hai sigarette? — No, non ne ho.", "¿Tenés cigarrillos? — No, no tengo."]],
  "warn": "*Ho tre* sin *ne* es agramatical. Cada vez que respondas con una "
          "cantidad, *ne* tiene que estar.",
  "tip": "En tiempos compuestos, el participio concuerda con lo contado: *ne "
         "ho comprati tre* (libros), *ne ho comprate due* (revistas)."},

 {"h": "NE: di + algo",
  "r": "*ne* también reemplaza **di + algo**: *parlare del progetto → "
       "parlarne*; *sono contento del risultato → ne sono contento*.",
  "ex": [["Ne parliamo domani.", "Hablamos de eso mañana."],
         ["Ne sono contento.", "Estoy contento con eso."],
         ["Che ne pensi?", "¿Qué te parece? / ¿Qué pensás de eso?"],
         ["Ne ho sentito parlare.", "Oí hablar de eso."]]},

 {"h": "CI: un lugar",
  "r": "*ci* reemplaza **un lugar** ya mencionado: «ahí, allá». En "
       "castellano muchas veces no se dice; en italiano, sí.",
  "ex": [["Vai a Roma? — Sì, ci vado domani.", "¿Vas a Roma? — Sí, voy mañana."],
         ["Sei mai stato in Grecia? — No, non ci sono mai stato.", "¿Estuviste alguna vez en Grecia? — No, nunca."],
         ["Abiti ancora a Roma? — Sì, ci abito da dieci anni.", "¿Seguís viviendo en Roma? — Sí, vivo ahí hace diez años."]]},

 {"h": "CI: a + algo",
  "r": "*ci* también reemplaza **a / in / su + algo**: *pensare al lavoro → "
       "ci penso*; *credere ai fantasmi → non ci credo*.",
  "ex": [["Pensi al lavoro? — Sì, ci penso sempre.", "Sí, pienso en eso siempre."],
         ["Credi ai fantasmi? — No, non ci credo.", "No, no creo en eso."],
         ["Ci riesco!", "¡Lo logro!"],
         ["Non ci capisco niente.", "No entiendo nada de esto."]],
  "tip": "Si el verbo pide *di*, va *ne*; si pide *a*, *in* o *su*, va *ci*: "
         "*parlare di → ne parlo*, *pensare a → ci penso*."},

 {"h": "Expresiones fijas",
  "r": "Algunos verbos llevan *ci* o *ne* **fijos** y cambian de sentido. Se "
       "aprenden como palabras nuevas.",
  "table": {"head": ["Expresión", "Sentido"],
            "rows": [["ci vuole / ci vogliono", "hace falta / hacen falta"],
                     ["c'è / ci sono", "hay"],
                     ["farcela", "arreglárselas, lograrlo (ce la faccio)"],
                     ["andarsene", "irse (me ne vado)"],
                     ["averne abbastanza", "estar harto (ne ho abbastanza)"],
                     ["non poterne più", "no aguantar más (non ne posso più)"],
                     ["metterci", "tardar (ci metto due ore)"],
                     ["volerci", "hacer falta (ci vogliono due ore)"]]},
  "warn": "*ci metto due ore* = yo tardo dos horas (personal). *ci vogliono "
          "due ore* = se necesitan dos horas (impersonal). No los mezcles."},
]},

22: {
"intro": "Dos pronombres átonos juntos: el orden es el del castellano, pero "
         "la forma cambia. Es mecánico, así que se automatiza repitiendo.",
"blocks": [
 {"h": "La transformación",
  "r": "El indirecto va **primero** y su *-i* se vuelve **-e**: *mi + lo → "
       "me lo*. *gli* y *le* se funden en **glie-**, pegado.",
  "table": {"head": ["", "+ lo", "+ la", "+ li", "+ le", "+ ne"],
            "rows": [["mi", "me lo", "me la", "me li", "me le", "me ne"],
                     ["ti", "te lo", "te la", "te li", "te le", "te ne"],
                     ["gli / le / Le", "glielo", "gliela", "glieli", "gliele", "gliene"],
                     ["ci", "ce lo", "ce la", "ce li", "ce le", "ce ne"],
                     ["vi", "ve lo", "ve la", "ve li", "ve le", "ve ne"],
                     ["si", "se lo", "se la", "se li", "se le", "se ne"]]},
  "warn": "La sorpresa no es el orden sino la vocal: «mi lo» no existe, "
          "siempre *me lo*, *te la*, *ce ne*. La *i* pasa a *e* sin "
          "excepción."},

 {"h": "glielo: una palabra, muchos sentidos",
  "r": "*glielo* se escribe **junto** y es «se lo» a él, a ella y a usted; "
       "en el italiano actual, también a ellos.",
  "ex": [["Glielo dico io.", "Se lo digo yo."],
         ["Signora, glielo porto subito.", "Señora, se lo traigo enseguida."]],
  "more": ["Para el plural, el italiano culto diría *lo do loro* (se lo doy "
           "a ellos), con *loro* después del verbo. Hoy suena rebuscado: "
           "*glielo do* cubre también ese caso."]},

 {"h": "En frases de todos los días",
  "r": "Los combinados van **delante del verbo conjugado**, en el orden del "
       "castellano: indirecto + directo, o indirecto + *ne*.",
  "ex": [["Me lo dai?", "¿Me lo das?"],
         ["Te la spiego dopo.", "Te la explico después."],
         ["Ce ne ha parlato ieri.", "Nos habló de eso ayer."],
         ["Se ne sono andati.", "Se fueron."]]},

 {"h": "En los tiempos compuestos",
  "r": "El participio **concuerda** con el pronombre directo, como siempre: "
       "*me l'ha data* (la carta), *gliele ho dette* (las cosas).",
  "ex": [["Il libro? Me l'ha prestato Marco.", "¿El libro? Me lo prestó Marco."],
         ["Le chiavi? Gliele ho date ieri.", "¿Las llaves? Se las di ayer."],
         ["Ce li hanno portati.", "Nos los trajeron."]]},

 {"h": "Con infinitivo e imperativo, pegados",
  "r": "Con infinitivo e imperativo van **pegados al final**, como en "
       "castellano: *dirtelo*, *dammelo*. Con el gerundio también (semana "
       "44).",
  "ex": [["Voglio dirtelo.", "Quiero decírtelo."],
         ["Puoi portarmelo?", "¿Me lo podés traer?"],
         ["Dammelo!", "¡Dámelo!"],
         ["Diglielo subito!", "¡Decíselo ya!"],
         ["Non dirmelo!", "¡No me lo digas!"]],
  "tip": "Con los modales valen las dos: *te lo voglio dire* = *voglio "
         "dirtelo*. Elegí una y usala siempre hasta que salga sola."},
]},

23: {
"intro": "Comparar es fácil hasta que hay que elegir entre *di* y *che*: en "
         "castellano los dos son «que». Es pregunta fija de todos los "
         "exámenes.",
"blocks": [
 {"h": "di o che",
  "r": "*di* ante sustantivo, pronombre o número. *che* entre dos adjetivos, "
       "dos verbos, dos sustantivos con el mismo verbo, o ante preposición.",
  "table": {"head": ["Se usa", "Cuándo", "Ejemplo"],
            "rows": [["di", "ante sustantivo o pronombre solo", "Marco è più alto di Luca."],
                     ["di", "ante número", "Ho più di venti libri."],
                     ["che", "entre dos adjetivos", "È più simpatico che bello."],
                     ["che", "entre dos verbos", "È più facile dire che fare."],
                     ["che", "ante preposición", "Vado più a Roma che a Milano."],
                     ["che", "entre dos sustantivos con el mismo verbo", "Bevo più caffè che tè."]]},
  "ex": [["Anna è più giovane di me.", "Ana es más joven que yo."],
         ["Studiare è meno noioso che lavorare.", "Estudiar es menos aburrido que trabajar."]],
  "more": ["La idea de fondo: *di* compara dos elementos distintos respecto "
           "de UNA misma cualidad (Marco y Luca, respecto de la altura). "
           "*che* compara dos cualidades, dos acciones o dos cantidades del "
           "mismo elemento."]},

 {"h": "Igualdad",
  "r": "*come* o *quanto*: *Marco è alto come Luca*. El *così* o *tanto* de "
       "delante suele omitirse. Con sustantivos, *tanto... quanto* "
       "concuerda.",
  "ex": [["Marco è alto come Luca.", "Marco es tan alto como Luca."],
         ["Marco è tanto alto quanto Luca.", "Marco es tan alto como Luca."],
         ["Ho tanti libri quanti quaderni.", "Tengo tantos libros como cuadernos."]]},

 {"h": "Superlativo relativo",
  "r": "Artículo + *più / meno* + adjetivo + *di*: *il ragazzo più alto "
       "della classe*. Si el artículo ya está ante el sustantivo, **no se "
       "repite**.",
  "ex": [["È la città più bella d'Italia.", "Es la ciudad más linda de Italia."],
         ["È il ragazzo più alto della classe.", "Es el chico más alto de la clase."]],
  "warn": "Nada de «la città la più bella»: un solo artículo, igual que en "
          "castellano.",
  "more": ["Detrás de un superlativo relativo, el italiano culto pide "
           "congiuntivo («la cosa más linda que haya visto»). Lo vas a ver a "
           "partir de la semana 25."]},

 {"h": "Superlativo absoluto",
  "r": "*-issimo* o *molto* + adjetivo: *bellissimo* = *molto bello*. "
       "Concuerda como cualquier adjetivo: *bellissima, bellissimi, "
       "bellissime*.",
  "ex": [["Sono stanchissimo.", "Estoy cansadísimo."],
         ["È bravissima.", "Es buenísima (en lo que hace)."],
         ["Le case sono molto belle.", "Las casas son muy lindas."]]},

 {"h": "Las formas irregulares",
  "r": "*buono, cattivo, grande, piccolo* tienen comparativo propio: "
       "*migliore, peggiore, maggiore, minore*. Los adverbios *bene* y "
       "*male* dan *meglio* y *peggio*.",
  "table": {"head": ["Adjetivo", "Comparativo", "Superlativo rel.", "Superl. abs."],
            "rows": [["buono", "migliore", "il migliore", "ottimo"],
                     ["cattivo", "peggiore", "il peggiore", "pessimo"],
                     ["grande", "maggiore", "il maggiore", "massimo"],
                     ["piccolo", "minore", "il minore", "minimo"],
                     ["bene (adv.)", "meglio", "—", "benissimo"],
                     ["male (adv.)", "peggio", "—", "malissimo"]]},
  "ex": [["È il migliore amico che ho.", "Es el mejor amigo que tengo."],
         ["Canta meglio di me.", "Canta mejor que yo."]],
  "warn": "*migliore* es adjetivo (*un libro migliore*); *meglio* es "
          "adverbio (*canta meglio*). Confundirlos es como decir «canta "
          "mejor libro»."},
]},

24: {
"intro": "Llega el congiuntivo. Esta semana, solo la forma del presente: "
         "regulares, irregulares y la trampa de la vocal. El uso, la semana "
         "que viene.",
"blocks": [
 {"h": "Cómo se arma",
  "r": "Tomá el *io* del presente, sacale la *-o* y agregá las "
       "terminaciones. Los irregulares del presente arrastran su "
       "irregularidad: *vengo → venga*, *faccio → faccia*.",
  "table": {"head": ["", "-are (parlare)", "-ere (prendere)", "-ire (dormire)", "-isc (finire)"],
            "rows": [["io", "parli", "prenda", "dorma", "finisca"],
                     ["tu", "parli", "prenda", "dorma", "finisca"],
                     ["lui/lei", "parli", "prenda", "dorma", "finisca"],
                     ["noi", "parliamo", "prendiamo", "dormiamo", "finiamo"],
                     ["voi", "parliate", "prendiate", "dormiate", "finiate"],
                     ["loro", "parlino", "prendano", "dormano", "finiscano"]]},
  "more": ["El mismo mecanismo, con otros irregulares del presente: *esco → "
           "esca*, *dico → dica*, *bevo → beva*, *rimango → rimanga*, "
           "*scelgo → scelga*. Los verbos en *-isc* (*finire*) conservan el "
           "*-isc-* en el singular y en *loro*, igual que en el presente."]},

 {"h": "Singular idéntico: poné el pronombre",
  "r": "*io*, *tu* y *lui/lei* tienen **la misma forma**. Si el contexto no "
       "aclara quién es el sujeto, el italiano **pone el pronombre**.",
  "ex": [["Credo che tu abbia ragione.", "Creo que tenés razón."],
         ["Penso che lui venga.", "Pienso que él viene."]],
  "warn": "En castellano la terminación ya dice quién («que vengas»), así "
          "que el pronombre se te va a olvidar. *che venga* puede ser yo, "
          "vos o él."},

 {"h": "La vocal que confunde",
  "r": "Al revés que en castellano: *-are* hace **-i** (*che parli*) y "
       "*-ere/-ire* hacen **-a** (*che prenda*, *che dorma*).",
  "ex": [["Credo che lui parli bene.", "Creo que él habla bien."],
         ["Credo che lui prenda il treno.", "Creo que toma el tren."],
         ["Spero che tu dorma bene.", "Espero que duermas bien."]],
  "warn": "Como el indicativo es *parla*, el instinto produce «che parla», "
          "que es indicativo. Esta confusión explica buena parte de los "
          "errores de congiuntivo del hispanohablante.",
  "more": ["En castellano, *-ar* usa *e* (que hable) y *-er/-ir* usan *a* "
           "(que coma, que viva). El italiano coincide en *-ere/-ire*, pero "
           "en *-are* usa *i*, no *e*."]},

 {"h": "Los irregulares de memoria",
  "r": "Estos se aprenden de memoria. Varios salen del *io* del presente "
       "(*vengo → venga*); *sia*, *abbia*, *sappia*, *dia*, *stia* no.",
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
  "tip": "*noi* es igual al indicativo (*parliamo*); *voi* sale de *noi* "
         "cambiando *-iamo* por *-iate*. De seis personas, aprendés cuatro "
         "formas."},

 {"h": "Ya lo venías usando",
  "r": "El imperativo formal de la semana 12 **es congiuntivo**: *Scusi!*, "
       "*Senta!*, *Venga!*, *Mi dica!*. Si eso te sale solo, media forma ya "
       "está aprendida.",
  "ex": [["Prenda pure!", "¡Tome nomás! (usted)"],
         ["Si accomodi!", "¡Póngase cómodo!"]]},
]},

25: {
"intro": "Ahora, el uso. El gran choque con el castellano son los verbos de "
         "opinión: «creo que es tarde» va con indicativo en castellano y con "
         "congiuntivo en italiano.",
"blocks": [
 {"h": "La regla madre",
  "r": "Congiuntivo después de *che* cuando el principal expresa **algo no "
       "constatado**: opinión, duda, deseo, emoción, espera. Y con **sujetos "
       "distintos**.",
  "table": {"head": ["Categoría", "Verbos", "Ejemplo"],
            "rows": [["opinión", "credere, pensare, ritenere, immaginare, supporre", "Credo che sia tardi."],
                     ["duda", "dubitare, non sapere se", "Dubito che venga."],
                     ["deseo/voluntad", "volere, desiderare, preferire, sperare", "Voglio che tu venga."],
                     ["emoción", "essere contento, temere, avere paura, dispiacere", "Sono contento che tu stia bene."],
                     ["espera", "aspettare che, aspettarsi che", "Aspetto che finisca."],
                     ["impersonales", "è necessario, è possibile, bisogna, sembra, pare", "È possibile che piova."]]}},

 {"h": "«Creo que es»: congiuntivo",
  "r": "*credere*, *pensare*, *sembrare* afirmativos piden **congiuntivo**, "
       "aunque en castellano van con indicativo: *Credo che sia tardi* = "
       "«creo que es tarde».",
  "ex": [["Credo che abbia ragione.", "Creo que tiene razón."],
         ["Penso che sia una buona idea.", "Pienso que es una buena idea."],
         ["Mi sembra che sia in ritardo.", "Me parece que llega tarde."],
         ["Immagino che tu sia stanco.", "Imagino que estás cansado."]],
  "warn": "Es el error que más rápido delata a un hispanohablante. La buena "
          "noticia: la regla es muy estable y se corrige rápido."},

 {"h": "Cuándo NO va congiuntivo",
  "r": "Con verbos que presentan **un hecho** (*so che*, *è vero che*, *è "
       "certo che*, *dico che*, *vedo che*, *è chiaro che*) y con *secondo "
       "me*: indicativo.",
  "ex": [["So che è tardi.", "Sé que es tarde."],
         ["È vero che ha ragione.", "Es verdad que tiene razón."],
         ["Secondo me, è una buona idea.", "Para mí, es una buena idea."]],
  "tip": "Si la información se da como dato, indicativo. Si pasa por la "
         "cabeza de alguien —creo, espero, temo, quiero, dudo—, congiuntivo."},

 {"h": "Mismo sujeto: infinitivo",
  "r": "Si el que cree y el que hace son **la misma persona**, nada de "
       "*che*: *di* + infinitivo. Como en castellano: «creo tener razón».",
  "ex": [["Credo di avere ragione.", "Creo tener razón."],
         ["Spero di arrivare in tempo.", "Espero llegar a tiempo."],
         ["Voglio partire domani.", "Quiero salir mañana. (sin di)"],
         ["Voglio che tu parta domani.", "Quiero que te vayas mañana."]],
  "warn": "*volere*, *potere*, *dovere*, *preferire*, *desiderare* van con "
          "infinitivo **sin** *di*: *voglio partire*. *sperare*, *credere*, "
          "*pensare* piden *di*: *spero di partire*."},
]},

26: {
"intro": "Cierre de la segunda estación: pasados y futuros ordenados, el "
         "trapassato prossimo, los pronombres combinados con *ne* y *ci*, y "
         "el congiuntivo presente.",
"blocks": [
 {"h": "El mapa de los tiempos",
  "r": "Dos mecanismos: terminación sobre la raíz (presente, imperfetto, "
       "futuro, condizionale) o auxiliar + participio (los tiempos "
       "compuestos).",
  "table": {"head": ["Tiempo", "Se forma", "Sirve para"],
            "rows": [["presente", "raíz + terminación", "ahora, habitual, futuro cercano"],
                     ["passato prossimo", "avere/essere + participio", "hecho pasado y terminado"],
                     ["imperfetto", "raíz + -avo/-evo/-ivo", "fondo, costumbre, descripción"],
                     ["trapassato prossimo", "avevo/ero + participio", "pasado anterior a otro pasado"],
                     ["futuro semplice", "raíz de futuro + -ò, -ai, -à", "porvenir y suposición"],
                     ["futuro anteriore", "avrò/sarò + participio", "terminado antes de un futuro"],
                     ["condizionale", "raíz de futuro + -ei, -esti, -ebbe", "cortesía, deseo, noticia no confirmada"]]}},

 {"h": "El trapassato prossimo",
  "r": "Imperfetto de *avere* o *essere* + participio: lo que pasó **antes** "
       "de otro hecho pasado. El auxiliar se elige como en el passato "
       "prossimo.",
  "ex": [["Avevo già mangiato.", "Ya había comido."],
         ["Non avevo mai visto Roma.", "Nunca había visto Roma."],
         ["Quando sono arrivato, il film era già cominciato.", "Cuando llegué, la película ya había empezado."]]},

 {"h": "Auxiliar: la decisión de cada frase",
  "r": "*essere* con desplazamiento, cambio de estado, reflexivos, "
       "pronominales, impersonales y familia de *piacere*: el participio "
       "concuerda con el sujeto. *avere* con todo lo demás.",
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

 {"h": "Pronombres combinados, ne y ci",
  "r": "Indirecto primero, con *-i* → **-e**: *me lo, ce ne*. *gli / le* + "
       "*lo* → **glielo**. *ne* = de eso o cantidad; *ci* = ahí.",
  "ex": [["Me lo dai?", "¿Me lo das?"],
         ["Glielo dico io.", "Se lo digo yo."],
         ["Quanti libri hai? Ne ho tre.", "¿Cuántos libros tenés? Tengo tres."],
         ["Vai a Roma? Sì, ci vado domani.", "¿Vas a Roma? Sí, voy mañana."]]},

 {"h": "Congiuntivo presente",
  "r": "Después de *penso che, credo che, voglio che, è importante che*: "
       "**congiuntivo**. Con *so che* y *è vero che*, indicativo.",
  "table": {"head": ["", "parlare", "prendere", "essere", "avere"],
            "rows": [["io/tu/lui", "parli", "prenda", "sia", "abbia"],
                     ["noi", "parliamo", "prendiamo", "siamo", "abbiamo"],
                     ["voi", "parliate", "prendiate", "siate", "abbiate"],
                     ["loro", "parlino", "prendano", "siano", "abbiano"]]},
  "warn": "*Credo che sia tardi*, nunca «credo che è tardi». Y con el mismo "
          "sujeto, *di* + infinitivo: *credo di avere ragione*."},

 {"h": "Repaso: trampas de los verbos",
  "r": "1. *mi sono lavato*, jamás «mi ho lavato». 2. *parleremo* (futuro) ≠ "
       "*parleremmo* (condicional). 3. Detrás de *se* hipotético, nunca "
       "condicional."},

 {"h": "Repaso: trampas de la frase",
  "r": "4. *migliore* adjetivo, *meglio* adverbio. 5. *più alto di Luca*, "
       "pero *più simpatico che bello*. 6. *qualche* + singular. 7. *dopo "
       "aver mangiato*, no «dopo mangiare»."},
]},

}
