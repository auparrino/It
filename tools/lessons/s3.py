# -*- coding: utf-8 -*-
"""Stagione 3 — Il Congiuntivo (settimane 27-39, B1 → B2)."""

LESSONS = {

27: {
"intro": "Llega el congiuntivo. Esta semana, solo la forma del presente: "
         "regulares, irregulares y la trampa de la vocal. El uso, la semana "
         "que viene.",
"blocks": [
 {"h": "Cómo se arma",
  "r": "Tomá el *io* del presente, sacale la *-o* y agregá las terminaciones. "
       "Los irregulares del presente arrastran su irregularidad: *vengo → "
       "venga*, *faccio → faccia*.",
  "table": {"head": ["", "-are (parlare)", "-ere (prendere)", "-ire (dormire)",
                     "-isc (finire)"],
            "rows": [["io", "parli", "prenda", "dorma", "finisca"],
                     ["tu", "parli", "prenda", "dorma", "finisca"],
                     ["lui/lei", "parli", "prenda", "dorma", "finisca"],
                     ["noi", "parliamo", "prendiamo", "dormiamo", "finiamo"],
                     ["voi", "parliate", "prendiate", "dormiate", "finiate"],
                     ["loro", "parlino", "prendano", "dormano", "finiscano"]]},
  "more": ["El mismo mecanismo, con otros irregulares del presente: *esco → "
           "esca*, *dico → dica*, *bevo → beva*, *rimango → rimanga*, *scelgo "
           "→ scelga*. Los verbos en *-isc* (*finire*) conservan el *-isc-* "
           "en el singular y en *loro*, igual que en el presente."]},

 {"h": "Singular idéntico: poné el pronombre",
  "r": "*io*, *tu* y *lui/lei* tienen **la misma forma**. Si el contexto no "
       "aclara quién es el sujeto, el italiano **pone el pronombre**.",
  "ex": [["Credo che tu abbia ragione.", "Creo que tenés razón."],
         ["Penso che lui venga.", "Pienso que él viene."]],
  "warn": "En castellano la terminación ya dice quién («que vengas»), así que "
          "el pronombre se te va a olvidar. *che venga* puede ser yo, vos o él."},

 {"h": "La vocal que confunde",
  "r": "Al revés que en castellano: *-are* hace **-i** (*che parli*) y "
       "*-ere/-ire* hacen **-a** (*che prenda*, *che dorma*).",
  "ex": [["Credo che lui parli bene.", "Creo que él habla bien."],
         ["Credo che lui prenda il treno.", "Creo que toma el tren."],
         ["Spero che tu dorma bene.", "Espero que duermas bien."]],
  "warn": "Como el indicativo es *parla*, el instinto produce «che parla», que "
          "es indicativo. Esta confusión explica buena parte de los errores de "
          "congiuntivo del hispanohablante.",
  "more": ["En castellano, *-ar* usa *e* (que hable) y *-er/-ir* usan *a* (que "
           "coma, que viva). El italiano coincide en *-ere/-ire*, pero en "
           "*-are* usa *i*, no *e*."]},

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
         "cambiando *-iamo* por *-iate*. De seis personas, aprendés cuatro formas."},

 {"h": "Ya lo venías usando",
  "r": "El imperativo formal de la semana 9 **es congiuntivo**: *Scusi!*, "
       "*Senta!*, *Venga!*, *Mi dica!*. Si eso te sale solo, media forma ya "
       "está aprendida.",
  "ex": [["Prenda pure!", "¡Tome nomás! (usted)"],
         ["Si accomodi!", "¡Póngase cómodo!"]]},
]},

28: {
"intro": "Ahora, el uso. El gran choque con el castellano son los verbos de "
         "opinión: «creo que es tarde» va con indicativo en castellano y con "
         "congiuntivo en italiano.",
"blocks": [
 {"h": "La regla madre",
  "r": "Congiuntivo después de *che* cuando el principal expresa **algo no "
       "constatado**: opinión, duda, deseo, emoción, espera. Y con **sujetos "
       "distintos**.",
  "table": {"head": ["Categoría", "Verbos", "Ejemplo"],
            "rows": [["opinión", "credere, pensare, ritenere, immaginare, "
                      "supporre", "Credo che sia tardi."],
                     ["duda", "dubitare, non sapere se", "Dubito che venga."],
                     ["deseo/voluntad", "volere, desiderare, preferire, sperare",
                      "Voglio che tu venga."],
                     ["emoción", "essere contento, temere, avere paura, "
                      "dispiacere", "Sono contento che tu stia bene."],
                     ["espera", "aspettare che, aspettarsi che",
                      "Aspetto che finisca."],
                     ["impersonales", "è necessario, è possibile, bisogna, "
                      "sembra, pare", "È possibile che piova."]]}},

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
  "r": "Si el que cree y el que hace son **la misma persona**, nada de *che*: "
       "*di* + infinitivo. Como en castellano: «creo tener razón».",
  "ex": [["Credo di avere ragione.", "Creo tener razón."],
         ["Spero di arrivare in tempo.", "Espero llegar a tiempo."],
         ["Voglio partire domani.", "Quiero salir mañana. (sin di)"],
         ["Voglio che tu parta domani.", "Quiero que te vayas mañana."]],
  "warn": "*volere*, *potere*, *dovere*, *preferire*, *desiderare* van con "
          "infinitivo **sin** *di*: *voglio partire*. *sperare*, *credere*, "
          "*pensare* piden *di*: *spero di partire*."},
]},

29: {
"intro": "El congiuntivo passato sirve para opinar hoy sobre algo que ya "
         "pasó. Se aprende en un minuto: es el passato prossimo con el "
         "auxiliar en congiuntivo.",
"blocks": [
 {"h": "La forma",
  "r": "*abbia* o *sia* + participio. Valen las reglas del passato prossimo: "
       "el mismo auxiliar y, con *essere*, participio concordado.",
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
  "ex": [["Credo che sia già partito.", "Creo que ya salió."],
         ["Mi dispiace che tu non sia venuto.", "Lamento que no hayas venido."],
         ["Non penso che abbiano capito.", "No creo que hayan entendido."],
         ["È strano che non abbia chiamato.", "Es raro que no haya llamado."],
         ["Spero che vi siate divertiti.", "Espero que se hayan divertido."]]},

 {"h": "Presente o passato",
  "r": "Mismo momento o después → **congiuntivo presente**. Antes → "
       "**congiuntivo passato**. Nada más.",
  "table": {"head": ["Frase", "Cuándo pasa la acción"],
            "rows": [["Credo che venga.", "ahora o después"],
                     ["Credo che sia venuto.", "antes"],
                     ["Spero che stia bene.", "ahora"],
                     ["Spero che sia stato bene.", "en aquel momento"]]}},

 {"h": "Con concesivas y superlativos",
  "r": "*benché*, *sebbene*, *nonostante* y los superlativos (*il più... "
       "che*) piden congiuntivo; si la acción es anterior, **passato**.",
  "ex": [["Benché abbia studiato, non si sente pronto.",
          "Aunque estudió, no se siente listo."],
         ["Sebbene abbia dormito dieci ore, è ancora stanco.",
          "Aunque durmió diez horas, sigue cansado."],
         ["È la cosa più bella che io abbia mai visto.",
          "Es lo más lindo que vi en mi vida."]],
  "warn": "*dopo che* no es concesiva: va con **indicativo**. *Dopo che è "
          "partito...*, nunca «dopo che sia partito»."},
]},

30: {
"intro": "Congiuntivo imperfetto y trapassato: los necesitás después de un "
         "verbo en pasado o en condicional, y para desear lo imposible. Son "
         "sorprendentemente regulares.",
"blocks": [
 {"h": "Imperfetto: la forma",
  "r": "Raíz del infinitivo + *-assi*, *-essi*, *-issi*. El único irregular "
       "de verdad es *essere → fossi*.",
  "table": {"head": ["", "parlare", "vendere", "dormire", "essere"],
            "rows": [["io", "parlassi", "vendessi", "dormissi", "fossi"],
                     ["tu", "parlassi", "vendessi", "dormissi", "fossi"],
                     ["lui/lei", "parlasse", "vendesse", "dormisse", "fosse"],
                     ["noi", "parlassimo", "vendessimo", "dormissimo", "fossimo"],
                     ["voi", "parlaste", "vendeste", "dormiste", "foste"],
                     ["loro", "parlassero", "vendessero", "dormissero", "fossero"]]},
  "warn": "*noi* termina en *-ssimo* (*parlassimo*), parecido al superlativo. "
          "Y *io* y *tu* son iguales: otra vez, poné el pronombre."},

 {"h": "Los pocos irregulares",
  "r": "*fare*, *dire*, *bere*, *porre*, *tradurre* usan la raíz del "
       "imperfetto de indicativo (*facevo → facessi*). *dare* y *stare* "
       "cambian la vocal: *dessi*, *stessi*.",
  "table": {"head": ["Verbo", "io/tu", "lui/lei", "loro"],
            "rows": [["fare", "facessi", "facesse", "facessero"],
                     ["dire", "dicessi", "dicesse", "dicessero"],
                     ["bere", "bevessi", "bevesse", "bevessero"],
                     ["porre", "ponessi", "ponesse", "ponessero"],
                     ["tradurre", "traducessi", "traducesse", "traducessero"],
                     ["dare", "dessi", "desse", "dessero"],
                     ["stare", "stessi", "stesse", "stessero"]]}},

 {"h": "Trapassato del congiuntivo",
  "r": "*avessi* o *fossi* + participio. Es el trapassato prossimo pasado a "
       "congiuntivo: una acción **anterior** a un verbo en pasado.",
  "ex": [["Credevo che fosse partito.", "Creía que había salido."],
         ["Pensavo che aveste già mangiato.", "Pensaba que ya habían comido."],
         ["Magari l'avessi saputo prima!", "¡Ojalá lo hubiera sabido antes!"]],
  "more": ["También es la forma obligatoria en el *se* de la hipótesis "
           "imposible del pasado (*se l'avessi saputo...*). La frase completa, "
           "con su condicional, la armás en la semana 32."]},

 {"h": "Cuándo aparecen",
  "r": "Si el principal está **en pasado o en condicional**, nada de "
       "congiuntivo presente: **imperfetto** si es simultáneo, **trapassato** "
       "si es anterior.",
  "table": {"head": ["Principal", "Subordinada", "Ejemplo"],
            "rows": [["presente", "congiuntivo presente", "Credo che venga."],
                     ["presente", "congiuntivo passato", "Credo che sia venuto."],
                     ["pasado", "congiuntivo imperfetto", "Credevo che venisse."],
                     ["pasado", "congiuntivo trapassato", "Credevo che fosse venuto."],
                     ["condicional", "congiuntivo imperfetto", "Vorrei che venisse."]]},
  "tip": "*Vorrei che tu venissi* = «querría que vinieras»: condicional arriba, "
         "imperfetto abajo, igual que en castellano. Este caso te sale gratis.",
  "more": ["Lo posterior también va en imperfetto después de un condicional o "
           "de un verbo de voluntad: *volevo che venisse* (quería que viniera). "
           "Con verbos de opinión, en cambio, lo posterior va en condizionale "
           "passato: lo ves en la semana 31."]},

 {"h": "Ojalá, como si",
  "r": "*Magari*, *se solo* y *come se* piden congiuntivo imperfetto (o "
       "trapassato), aunque no haya verbo principal.",
  "ex": [["Magari fosse vero!", "¡Ojalá fuera cierto!"],
         ["Se solo avessi più tempo...", "Si tuviera más tiempo..."],
         ["Parla come se fosse un esperto.", "Habla como si fuera un experto."],
         ["Fosse anche l'ultima volta, non ci vado.",
          "Aunque fuera la última vez, no voy."]],
  "warn": "*come se* va **siempre** con imperfetto o trapassato: *come se "
          "fosse*, *come se non fosse successo niente*. Nunca «come se è»."},
]},

31: {
"intro": "La concordancia de tiempos ordena todo lo anterior con dos "
         "preguntas: ¿en qué tiempo está el principal? ¿La subordinada pasa "
         "antes, a la vez o después?",
"blocks": [
 {"h": "El cuadro con congiuntivo",
  "r": "Elegí la forma según **el principal** (presente o pasado) y **el "
       "momento** de la subordinada (antes, a la vez, después).",
  "table": {"head": ["Principal", "Anterior", "Simultáneo", "Posterior"],
            "rows": [["presente / futuro", "congiuntivo passato",
                      "congiuntivo presente", "congiuntivo presente"],
                     ["pasado", "congiuntivo trapassato",
                      "congiuntivo imperfetto", "condizionale passato"]]},
  "ex": [["Credo che sia partito / parta / parta domani.",
          "Creo que salió / sale / sale mañana."],
         ["Credevo che fosse partito / partisse / sarebbe partito.",
          "Creía que había salido / salía / saldría."]]},

 {"h": "Lo posterior en el pasado",
  "r": "«Creía que vendría» va con condicional **compuesto**: *Credevo che "
       "sarebbe venuto*. Vale para todo futuro visto desde el pasado, con "
       "congiuntivo o sin él.",
  "ex": [["Ha detto che sarebbe arrivato alle otto.",
          "Dijo que llegaría a las ocho."],
         ["Sapevo che avresti capito.", "Sabía que ibas a entender."],
         ["Pensavo che sarebbe stato più facile.",
          "Pensaba que sería más fácil."]],
  "warn": "El castellano usa el condicional simple («vendría»), así que la "
          "traducción literal falla: «credevo che verrebbe» está mal.",
  "more": ["La forma es *avrei* / *sarei* + participio (*avrebbe capito*, "
           "*sarebbe arrivato*). La tabla completa y sus otros usos, en la "
           "semana 33."]},

 {"h": "Con indicativo, la misma lógica",
  "r": "Sin congiuntivo también hay concordancia. Principal en presente: "
       "passato prossimo, presente, futuro. En pasado: trapassato, imperfetto, "
       "condizionale passato.",
  "table": {"head": ["Principal", "Anterior", "Simultáneo", "Posterior"],
            "rows": [["presente", "passato prossimo", "presente", "futuro"],
                     ["pasado", "trapassato prossimo", "imperfetto",
                      "condizionale passato"]]},
  "ex": [["So che è partito / parte / partirà.", "Sé que salió / sale / saldrá."],
         ["Sapevo che era partito / partiva / sarebbe partito.",
          "Sabía que había salido / salía / saldría."]]},

 {"h": "Cómo entrenarlo",
  "r": "Antes de escribir el verbo de la subordinada, preguntate: ¿el "
       "principal es presente o pasado? ¿Esto pasa antes, durante o después?",
  "tip": "Con esas dos respuestas la forma sale sola. Hacelo en voz alta al "
         "principio: es más rápido que recordar la tabla."},
]},

32: {
"intro": "El período hipotético: tres tipos y una prohibición. Si lo tenés "
         "automatizado, tenés el B2.",
"blocks": [
 {"h": "Los tres tipos",
  "r": "**I** real: indicativo. **II** posible o irreal: congiuntivo "
       "imperfetto + condicional. **III** imposible, pasado: congiuntivo "
       "trapassato + condizionale passato.",
  "table": {"head": ["Tipo", "Con se...", "La otra parte", "Ejemplo"],
            "rows": [["I — real", "indicativo presente/futuro",
                      "indicativo o imperativo",
                      "Se ho tempo, ti chiamo."],
                     ["II — posible / irreal presente", "congiuntivo imperfetto",
                      "condizionale presente",
                      "Se avessi tempo, ti chiamerei."],
                     ["III — imposible (pasado)", "congiuntivo trapassato",
                      "condizionale passato",
                      "Se avessi avuto tempo, ti avrei chiamato."]]},
  "more": ["El tipo I habla de algo que puede pasar de verdad. El II, de algo "
           "improbable o contrario a los hechos de hoy. El III, de algo que ya "
           "no puede pasar porque el momento pasó."]},

 {"h": "Nunca condicional después de se",
  "r": "Detrás de *se* **nunca** va condicional: ni «se avrei», ni «se "
       "sarei», ni «se vorrei». Congiuntivo con el *se*, condicional en la "
       "otra parte.",
  "ex": [["Se fossi ricco, comprerei una casa al mare.",
          "Si fuera rico, me compraría una casa en la playa."],
         ["Se fosse venuto, l'avremmo visto.",
          "Si hubiera venido, lo habríamos visto."],
         ["Se potessi, verrei subito.", "Si pudiera, iría enseguida."]],
  "warn": "Es igual al castellano correcto («si tuviera... llamaría»), pero "
          "como en el habla rioplatense se oye «si tendría», el error se "
          "traslada."},

 {"h": "Los mixtos, los más reales",
  "r": "Se puede cruzar un pasado imposible con una consecuencia presente, o "
       "al revés. Son frecuentísimos en la conversación.",
  "ex": [["Se avessi studiato, ora saresti laureato.",
          "Si hubieras estudiado, ahora estarías recibido."],
         ["Se fossi più ordinato, non avresti perso le chiavi.",
          "Si fueras más ordenado, no habrías perdido las llaves."]]},

 {"h": "Otras formas de hipótesis",
  "r": "Piden congiuntivo: *a meno che non*, *purché*, *a patto che*, *nel "
       "caso in cui*, *qualora* (formal). Y *magari* + imperfetto para desear.",
  "ex": [["Vengo, a meno che non piova.", "Voy, a menos que llueva."],
         ["Ti presto la macchina purché tu guidi piano.",
          "Te presto el auto con tal de que manejes despacio."],
         ["Qualora fosse necessario, mi chiami.",
          "En caso de que fuera necesario, llámeme."],
         ["Magari piovesse!", "¡Ojalá lloviera!"]]},

 {"h": "El doble imperfetto coloquial",
  "r": "En el habla se oye *Se lo sapevo, non venivo*, con dos imperfetti de "
       "indicativo. Vale en lo oral; por escrito y en exámenes, la forma "
       "completa.",
  "ex": [["Se lo sapevo, non venivo.", "Si lo sabía, no venía. (oral)"],
         ["Se l'avessi saputo, non sarei venuto.",
          "Si lo hubiera sabido, no habría venido."]]},
]},

33: {
"intro": "El condizionale passato ya apareció en la concordancia. Ahora, sus "
         "tres usos: lo que no pasó, el futuro visto desde el pasado y la "
         "noticia sin confirmar.",
"blocks": [
 {"h": "La forma",
  "r": "*avrei* o *sarei* + participio, con las reglas de auxiliar y "
       "concordancia de siempre: *avrei parlato*, *sarei andato/a*, *mi sarei "
       "alzato/a*.",
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
  "ex": [["Avrei voluto aiutarti.", "Habría querido ayudarte."],
         ["Sarei venuto, ma non ho potuto.", "Habría ido, pero no pude."],
         ["Al posto tuo, avrei detto di no.", "En tu lugar, habría dicho que no."],
         ["Avresti dovuto avvisarmi.", "Deberías haberme avisado."]],
  "tip": "*Avresti dovuto / potuto / voluto* + infinitivo es la fórmula del "
         "reproche y del arrepentimiento. Muy útil y muy frecuente."},

 {"h": "Uso 2: el futuro en el pasado",
  "r": "«Dijo que vendría» = *ha detto che sarebbe venuto*. Si el punto de "
       "referencia está en el pasado, condicional **compuesto**, nunca simple.",
  "ex": [["Mi ha promesso che sarebbe tornato.", "Me prometió que volvería."],
         ["Non sapevo che avrebbe portato gli amici.",
          "No sabía que traería a los amigos."],
         ["Era sicuro che avremmo vinto.", "Estaba seguro de que ganaríamos."],
         ["Pensavo che ti sarebbe piaciuto.", "Pensaba que te iba a gustar."]],
  "warn": "*ha detto che verrebbe* es el calco del castellano y está mal. El "
          "castellano usa el condicional simple; el italiano, el compuesto."},

 {"h": "Uso 3: la noticia sin confirmar",
  "r": "En la prensa, el condizionale passato presenta un hecho pasado **no "
       "confirmado**, como el «habría» periodístico del castellano.",
  "ex": [["Il ladro sarebbe fuggito in auto.",
          "El ladrón habría huido en auto."],
         ["Secondo il giornale, avrebbero già firmato.",
          "Según el diario, ya habrían firmado."]]},
]},

34: {
"intro": "La pasiva italiana tiene tres auxiliares —*essere*, *venire*, "
         "*andare*— y cada uno aporta un matiz. Es de lo que más sube el "
         "registro de un texto.",
"blocks": [
 {"h": "essere: la pasiva neutra",
  "r": "*essere* + participio concordado con el sujeto; el agente va con "
       "*da*. Sirve en **cualquier tiempo**, porque *essere* se conjuga.",
  "ex": [["Il libro è stato scritto da Calvino.",
          "El libro fue escrito por Calvino."],
         ["Le lettere sono state spedite ieri.", "Las cartas fueron enviadas ayer."],
         ["La casa sarà venduta.", "La casa será vendida."]],
  "tip": "*è letto*, *era letto*, *è stato letto*, *sarà letto*, *sarebbe "
         "stato letto*, *che sia letto*: siempre *essere* conjugado + participio."},

 {"h": "venire: la pasiva de acción",
  "r": "*venire* reemplaza a *essere* **solo en tiempos simples** y subraya el "
       "proceso, no el estado. Típico de la prensa y de la administración.",
  "ex": [["La porta viene chiusa alle otto.", "La puerta se cierra a las ocho."],
         ["I documenti vengono controllati ogni giorno.",
          "Los documentos se revisan todos los días."]],
  "warn": "*La porta è chiusa* puede ser estado («está cerrada»); *La porta "
          "viene chiusa* solo es acción («se cierra»). Y nunca «è venuta chiusa»."},

 {"h": "andare: la pasiva de obligación",
  "r": "*andare* + participio = **debe ser** hecho. Muy usado en "
       "instrucciones, recetas y normas.",
  "ex": [["Il modulo va compilato in stampatello.",
          "El formulario debe llenarse en imprenta."],
         ["La pasta va scolata al dente.", "La pasta hay que colarla al dente."],
         ["Questi errori andrebbero corretti.", "Estos errores deberían corregirse."]],
  "tip": "*va detto*, *va notato*, *va ricordato* son conectores de texto "
         "argumentativo de nivel C1: «hay que decir que», «cabe recordar que»."},

 {"h": "Cuándo conviene evitarla",
  "r": "Si el agente no importa, lo natural suele ser el *si passivante* "
       "(semana 35) o la tercera plural impersonal: *dicono che...* (dicen "
       "que...).",
  "more": ["El italiano usa la pasiva menos que el inglés y más que el "
           "castellano hablado."]},
]},

35: {
"intro": "El *si* italiano hace lo mismo que «se vende» o «se vive bien», con "
         "una trampa de concordancia. Y en lo coloquial, *si* reemplaza a "
         "*noi*.",
"blocks": [
 {"h": "Si passivante: concuerda",
  "r": "Con un objeto expresado, el verbo **concuerda con ese objeto**, "
       "singular o plural. Igual que en castellano: «se venden libros».",
  "ex": [["Qui si parla italiano.", "Acá se habla italiano."],
         ["Si vendono libri usati.", "Se venden libros usados."],
         ["In questo ristorante si mangiano ottimi piatti.",
          "En este restaurante se comen platos excelentes."]],
  "warn": "«Si vende libri» está mal: *si vendono libri*, *si affittano "
          "camere*, *si cercano collaboratori*. Los carteles reales se "
          "equivocan seguido; el examen no perdona."},

 {"h": "Si impersonale: siempre singular",
  "r": "Sin objeto, o con verbo intransitivo, *si* = «uno, la gente», y el "
       "verbo va en **tercera singular**.",
  "ex": [["In Italia si mangia bene.", "En Italia se come bien."],
         ["Si dice che sia partito.", "Se dice que se fue."],
         ["Non si può fumare qui.", "No se puede fumar acá."],
         ["Come si dice in italiano?", "¿Cómo se dice en italiano?"]]},

 {"h": "El adjetivo, en masculino plural",
  "r": "Con el *si* impersonal, el adjetivo o participio referido al sujeto "
       "va en **masculino plural**, aunque el verbo esté en singular.",
  "ex": [["Quando si è stanchi, si dorme male.",
          "Cuando uno está cansado, duerme mal."],
         ["Si è sempre giovani dentro.", "Uno siempre es joven por dentro."]],
  "warn": "No tiene paralelo en castellano («uno está cansado», en singular) "
          "y aparece en todos los exámenes B2."},

 {"h": "Con verbos reflexivos: ci si",
  "r": "No se pueden juntar dos *si*: el impersonal de un verbo reflexivo se "
       "dice **ci si**: *ci si diverte*, *ci si abitua a tutto*.",
  "ex": [["D'estate ci si sveglia presto.", "En verano uno se despierta temprano."],
         ["Con lui non ci si annoia mai.", "Con él uno no se aburre nunca."]]},

 {"h": "El si toscano por noi",
  "r": "En el italiano central y coloquial, *si* + tercera singular "
       "reemplaza a *noi*: *Stasera si va al cinema* = *andiamo al cinema*.",
  "ex": [["Stasera si va al cinema.", "Esta noche vamos al cine."],
         ["Domani si parte.", "Mañana salimos."]],
  "tip": "Es informal pero muy extendido: tenés que entenderlo; usarlo no "
         "hace falta."},
]},

36: {
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
          "siempre *me lo*, *te la*, *ce ne*. La *i* pasa a *e* sin excepción."},

 {"h": "glielo: una palabra, muchos sentidos",
  "r": "*glielo* se escribe **junto** y es «se lo» a él, a ella y a usted; en "
       "el italiano actual, también a ellos.",
  "ex": [["Glielo dico io.", "Se lo digo yo."],
         ["Signora, glielo porto subito.", "Señora, se lo traigo enseguida."]],
  "more": ["Para el plural, el italiano culto diría *lo do loro* (se lo doy a "
           "ellos), con *loro* después del verbo. Hoy suena rebuscado: "
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
  "ex": [["Il libro? Me l'ha prestato Marco.",
          "¿El libro? Me lo prestó Marco."],
         ["Le chiavi? Gliele ho date ieri.", "¿Las llaves? Se las di ayer."],
         ["Ce li hanno portati.", "Nos los trajeron."]]},

 {"h": "Con infinitivo e imperativo, pegados",
  "r": "Con infinitivo e imperativo van **pegados al final**, como en "
       "castellano: *dirtelo*, *dammelo*. Con el gerundio también (semana 44).",
  "ex": [["Voglio dirtelo.", "Quiero decírtelo."],
         ["Puoi portarmelo?", "¿Me lo podés traer?"],
         ["Dammelo!", "¡Dámelo!"],
         ["Diglielo subito!", "¡Decíselo ya!"],
         ["Non dirmelo!", "¡No me lo digas!"]],
  "tip": "Con los modales valen las dos: *te lo voglio dire* = *voglio "
         "dirtelo*. Elegí una y usala siempre hasta que salga sola."},
]},

37: {
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
         ["Me ne vado.", "Me voy (de acá)."]]},

 {"h": "CI: un lugar",
  "r": "*ci* reemplaza **un lugar** ya mencionado: «ahí, allá». En castellano "
       "muchas veces no se dice; en italiano, sí.",
  "ex": [["Vai a Roma? — Sì, ci vado domani.", "¿Vas a Roma? — Sí, voy mañana."],
         ["Sei mai stato in Grecia? — No, non ci sono mai stato.",
          "¿Estuviste alguna vez en Grecia? — No, nunca."],
         ["Abiti ancora a Roma? — Sì, ci abito da dieci anni.",
          "¿Seguís viviendo en Roma? — Sí, vivo ahí hace diez años."]]},

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

38: {
"intro": "Los relativos alargan la frase sin romperla. *che* sirve para casi "
         "todo, hasta que aparece una preposición.",
"blocks": [
 {"h": "che: sin preposición",
  "r": "*che* es invariable: personas y cosas, sujeto u objeto directo. "
       "**Nunca** lleva preposición delante.",
  "ex": [["Il libro che ho letto è bellissimo.", "El libro que leí es hermoso."],
         ["La ragazza che parla è mia sorella.", "La chica que habla es mi hermana."]],
  "warn": "El relativo **no se omite nunca**, igual que en castellano: "
          "*il libro che ho letto*, nunca «il libro ho letto»."},

 {"h": "cui: con preposición",
  "r": "Detrás de una preposición va **cui**, también invariable: *in cui*, "
       "*con cui*, *per cui*, *a cui*, *di cui*.",
  "ex": [["La città in cui vivo.", "La ciudad en la que vivo."],
         ["L'amico con cui studio.", "El amigo con el que estudio."],
         ["Il motivo per cui sono venuto.", "El motivo por el que vine."],
         ["La persona a cui ho scritto.", "La persona a la que escribí."],
         ["Il libro di cui ti parlavo.", "El libro del que te hablaba."]],
  "tip": "Solo con *a* la preposición se puede omitir: *la persona cui ho "
         "scritto* es correcto y culto. Con las demás, nunca."},

 {"h": "il cui: «cuyo»",
  "r": "*il / la / i / le cui* = «cuyo». El artículo concuerda con **lo "
       "poseído**, no con el poseedor.",
  "ex": [["Lo scrittore il cui libro ho letto.",
          "El escritor cuyo libro leí."],
         ["Una città le cui strade sono strette.",
          "Una ciudad cuyas calles son angostas."]],
  "more": ["No necesita preposición, aunque puede llevarla según la función: "
           "*la casa nel cui giardino...* (la casa en cuyo jardín...)."]},

 {"h": "il quale: el relativo formal",
  "r": "*il quale / la quale / i quali / le quali* reemplazan a *che* y a "
       "*cui*. Concuerdan, así que **deshacen ambigüedades**, y suben el "
       "registro.",
  "ex": [["Ho parlato con la sorella di Marco, la quale è medico.",
          "Hablé con la hermana de Marco, que es médica."],
         ["Il progetto al quale lavoro.", "El proyecto en el que trabajo."]],
  "tip": "*il figlio della vicina, che mi saluta sempre*: ¿quién saluda? *il "
         "figlio della vicina, il quale mi saluta sempre*: el hijo, sin duda."},

 {"h": "chi: sin antecedente",
  "r": "*chi* = «quien, el que», solo para personas y **sin antecedente**. "
       "El verbo va en singular.",
  "ex": [["Chi dorme non piglia pesci.",
          "Camarón que se duerme se lo lleva la corriente."],
         ["Chi ha finito può uscire.", "El que terminó puede salir."]]},

 {"h": "«Lo que»: quello che, il che",
  "r": "«Lo que» = *quello che*, *ciò che*, *quel che*; «todo lo que» = "
       "*tutto ciò che*. *il che* retoma **una frase entera**.",
  "ex": [["Non capisco quello che dici.", "No entiendo lo que decís."],
         ["È arrivato tardi, il che mi ha infastidito.",
          "Llegó tarde, lo que me molestó."]]},
]},

39: {
"intro": "Jefe de la tercera estación: congiuntivo, concordancia, "
         "hipotéticos, pasiva, *si*, pronombres y relativos juntos. Esta es "
         "tu hoja de repaso.",
"blocks": [
 {"h": "Los cuatro congiuntivos",
  "r": "Elegí por **el tiempo del principal** y **el momento de la acción**. "
       "Lo posterior a un pasado va en condizionale passato.",
  "table": {"head": ["Tiempo", "Forma", "Cuándo"],
            "rows": [["presente", "che io parli / prenda",
                      "principal en presente, acción simultánea o posterior"],
                     ["passato", "che io abbia parlato / sia andato",
                      "principal en presente, acción anterior"],
                     ["imperfetto", "che io parlassi / prendessi",
                      "principal en pasado o condicional, simultánea"],
                     ["trapassato", "che io avessi parlato / fossi andato",
                      "principal en pasado, acción anterior"]]}},

 {"h": "El período hipotético",
  "r": "Tres tipos: real, posible, imposible. **Nunca** condicional después "
       "de *se*.",
  "ex": [["Se ho tempo, ti chiamo.", "Si tengo tiempo, te llamo."],
         ["Se avessi tempo, ti chiamerei.", "Si tuviera tiempo, te llamaría."],
         ["Se avessi avuto tempo, ti avrei chiamato.",
          "Si hubiera tenido tiempo, te habría llamado."]]},

 {"h": "Pasiva y si",
  "r": "Tres auxiliares para la pasiva, dos *si* para lo impersonal. Repasá "
       "qué aporta cada uno.",
  "table": {"head": ["Construcción", "Ejemplo", "Ojo"],
            "rows": [["essere + participio", "Il libro è stato scritto da Calvino.",
                      "cualquier tiempo"],
                     ["venire + participio", "La porta viene chiusa alle otto.",
                      "acción; solo tiempos simples"],
                     ["andare + participio", "Il modulo va compilato.",
                      "= debe ser"],
                     ["si passivante", "Si vendono libri.",
                      "concuerda con el objeto"],
                     ["si impersonale", "Quando si è stanchi...",
                      "verbo singular, adjetivo masc. plural"]]}},

 {"h": "Pronombres combinados",
  "r": "Indirecto primero, *-i* → *-e*, y *gli / le* → *glie-* pegado. Con "
       "infinitivo e imperativo, al final.",
  "table": {"head": ["", "lo", "la", "li", "le", "ne"],
            "rows": [["mi", "me lo", "me la", "me li", "me le", "me ne"],
                     ["ti", "te lo", "te la", "te li", "te le", "te ne"],
                     ["gli/le", "glielo", "gliela", "glieli", "gliele", "gliene"],
                     ["ci", "ce lo", "ce la", "ce li", "ce le", "ce ne"],
                     ["vi", "ve lo", "ve la", "ve li", "ve le", "ve ne"],
                     ["si", "se lo", "se la", "se li", "se le", "se ne"]]}},

 {"h": "Las trampas de la estación",
  "r": "Las faltas que más delatan al hispanohablante. Tapá la columna de la "
       "derecha y corregí vos.",
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
