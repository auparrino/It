# -*- coding: utf-8 -*-
"""Stagione 3 — Il Congiuntivo (settimane 27-39, B1 → B2)."""

LESSONS = {

27: {
"intro": "Llegó el congiuntivo, que es la frontera real entre el que se hace "
         "entender y el que habla italiano. Buena noticia para vos: el "
         "castellano tiene subjuntivo y lo usás sin pensar. Mala noticia: no "
         "se reparten igual, y hay una diferencia de forma que confunde a todos "
         "los hispanohablantes. Esta semana solo la forma; el uso, la que viene.",
"blocks": [
 {"h": "Cómo se arma",
  "p": ["Se parte de la primera persona del presente de indicativo, se le saca "
        "la *-o* y se agregan las terminaciones. Por eso todos los irregulares "
        "del presente arrastran su irregularidad al congiuntivo: "
        "*vengo → venga*, *faccio → faccia*, *esco → esca*, *dico → dica*, "
        "*bevo → beva*, *rimango → rimanga*, *scelgo → scelga*."],
  "table": {"head": ["", "-are (parlare)", "-ere (prendere)", "-ire (dormire)",
                     "-isc (finire)"],
            "rows": [["io", "parli", "prenda", "dorma", "finisca"],
                     ["tu", "parli", "prenda", "dorma", "finisca"],
                     ["lui/lei", "parli", "prenda", "dorma", "finisca"],
                     ["noi", "parliamo", "prendiamo", "dormiamo", "finiamo"],
                     ["voi", "parliate", "prendiate", "dormiate", "finiate"],
                     ["loro", "parlino", "prendano", "dormano", "finiscano"]]},
  "warn": "Las tres personas del singular son IGUALES. Por eso, cuando el "
          "sujeto no se deduce del contexto, el italiano sí pone el pronombre: "
          "*Credo che TU abbia ragione*, *Penso che LUI venga*. El castellano "
          "casi nunca lo necesita («quiero que vengas»: la terminación ya dice "
          "quién) y por eso al hispanohablante se le olvida."},

 {"h": "La vocal que confunde",
  "warn": "En castellano el subjuntivo de los verbos en *-ar* usa *e* "
          "(que hable) y el de *-er/-ir* usa *a* (que coma, que viva). En "
          "italiano *-ere/-ire* también hacen *-a* (*che prenda*, *che dorma*), "
          "pero *-are* no hace *-e* sino *-i* (*che parli*). Ahí está la trampa: "
          "como el indicativo es *parla*, tu instinto va a producir «che parla», "
          "que es indicativo. Esta confusión explica buena parte de los errores "
          "de congiuntivo del hispanohablante.",
  "ex": [["Credo che lui parli bene.", "Creo que él habla bien."],
         ["Credo che lui prenda il treno.", "Creo que toma el tren."],
         ["Spero che tu dorma bene.", "Espero que duermas bien."]]},

 {"h": "Los irregulares que hay que saber de memoria",
  "table": {"head": ["Verbo", "Congiuntivo (io/tu/lui)", "noi", "voi", "loro"],
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
  "tip": "La forma de *noi* coincide siempre con el indicativo (*parliamo*), y "
         "la de *voi* sale de la de *noi* cambiando *-iamo* por *-iate* "
         "(*parliamo → parliate*, *prendiamo → prendiate*, *dormiamo → "
         "dormiate*). O sea que de "
         "seis personas, solo tenés que aprender cuatro formas distintas."},

 {"h": "Ya lo venías usando sin saberlo",
  "p": ["El imperativo formal que estudiaste en la semana 9 es congiuntivo "
        "puro: *Scusi!*, *Senta!*, *Prenda!*, *Venga!*, *Mi dica!*, "
        "*Si accomodi!*. Si esas frases ya te salen solas, la forma del "
        "congiuntivo ya está medio aprendida."]},
]},

28: {
"intro": "La forma era lo fácil. Ahora viene el uso, y acá el castellano te "
         "traiciona en un punto concreto y enorme: los verbos de opinión. "
         "«Creo que es tarde» lleva indicativo en castellano y congiuntivo "
         "obligatorio en italiano.",
"blocks": [
 {"h": "La regla madre",
  "p": ["El congiuntivo aparece en la subordinada con *che* cuando el verbo "
        "principal expresa algo que NO es un hecho constatado: opinión, duda, "
        "deseo, emoción, voluntad, temor, expectativa. Y hace falta que los dos "
        "sujetos sean distintos; si son el mismo, se usa *di* + infinitivo."],
  "table": {"head": ["Categoría", "Verbos", "Ejemplo"],
            "rows": [["opinión", "credere, pensare, ritenere, immaginare, "
                      "supporre", "Credo che sia tardi."],
                     ["duda", "dubitare, non sapere se", "Dubito che venga."],
                     ["deseo/voluntad", "volere, desiderare, preferire, sperare",
                      "Voglio che tu venga."],
                     ["emoción", "essere contento, temere, avere paura, "
                      "dispiacere", "Sono contento che tu stia bene."],
                     ["expectativa", "aspettare che, aspettarsi che",
                      "Aspetto che finisca."],
                     ["impersonales", "è necessario, è possibile, bisogna, "
                      "sembra, pare", "È possibile che piova."]]}},

 {"h": "El choque frontal con el castellano",
  "warn": "*Credo che sia tardi* = «Creo que ES tarde». *Penso che tu abbia "
          "ragione* = «Pienso que TENÉS razón». *Mi sembra che non stia bene* = "
          "«Me parece que no ESTÁ bien». En castellano estos verbos, en "
          "afirmativa, van con indicativo; en italiano piden congiuntivo. "
          "Es el error que más rápido identifica a un hispanohablante, "
          "y el más fácil de corregir porque la regla es muy estable.",
  "ex": [["Credo che abbia ragione.", "Creo que tiene razón."],
         ["Penso che sia una buona idea.", "Pienso que es una buena idea."],
         ["Mi sembra che sia in ritardo.", "Me parece que llega tarde."],
         ["Immagino che tu sia stanco.", "Imagino que estás cansado."]]},

 {"h": "Cuándo NO va congiuntivo",
  "p": ["Con verbos que afirman un hecho: *so che*, *è vero che*, *è certo "
        "che*, *dico che*, *vedo che*, *è chiaro che*. Y con *secondo me*. "
        "Ahí va indicativo, igual que en castellano."],
  "ex": [["So che è tardi.", "Sé que es tarde."],
         ["È vero che ha ragione.", "Es verdad que tiene razón."],
         ["Secondo me, è una buona idea.", "Para mí, es una buena idea."]],
  "tip": "Truco práctico: si el verbo principal presenta la información como "
         "un dato, indicativo. Si la filtra por la cabeza de alguien —creo, "
         "espero, temo, quiero, dudo— congiuntivo."},

 {"h": "Mismo sujeto: infinitivo",
  "p": ["Si el que cree y el que hace son la misma persona, no hay subordinada "
        "con *che* sino *di* + infinitivo. El castellano hace lo mismo."],
  "ex": [["Credo di avere ragione.", "Creo tener razón."],
         ["Spero di arrivare in tempo.", "Espero llegar a tiempo."],
         ["Voglio partire domani.", "Quiero salir mañana. (sin di)"],
         ["Voglio che tu parta domani.", "Quiero que te vayas mañana."]],
  "warn": "*volere*, *potere*, *dovere*, *preferire* y *desiderare* van con "
          "infinitivo DESNUDO, sin *di*: *voglio partire*, *preferisco restare*. "
          "*sperare*, *credere*, *pensare* piden *di*: *spero di partire*."},
]},

29: {
"intro": "El congiuntivo passato es el eslabón que faltaba: sirve para opinar "
         "hoy sobre algo que ya pasó. Se forma en un minuto, porque es el "
         "passato prossimo con el auxiliar en congiuntivo.",
"blocks": [
 {"h": "La forma",
  "table": {"head": ["", "con avere", "con essere"],
            "rows": [["io", "abbia parlato", "sia andato/a"],
                     ["tu", "abbia parlato", "sia andato/a"],
                     ["lui/lei", "abbia parlato", "sia andato/a"],
                     ["noi", "abbiamo parlato", "siamo andati/e"],
                     ["voi", "abbiate parlato", "siate andati/e"],
                     ["loro", "abbiano parlato", "siano andati/e"]]},
  "p": ["Todas las reglas del passato prossimo siguen valiendo: la elección del "
        "auxiliar y la concordancia del participio con *essere*."]},

 {"h": "Cuándo se usa",
  "p": ["Verbo principal en presente (o futuro) + acción de la subordinada "
        "ANTERIOR a la del principal."],
  "ex": [["Credo che sia già partito.", "Creo que ya salió."],
         ["Mi dispiace che tu non sia venuto.", "Lamento que no hayas venido."],
         ["Non penso che abbiano capito.", "No creo que hayan entendido."],
         ["È strano che non abbia chiamato.", "Es raro que no haya llamado."],
         ["Spero che vi siate divertiti.", "Espero que se hayan divertido."]]},

 {"h": "Presente o passato: la diferencia de sentido",
  "table": {"head": ["Frase", "Cuándo pasa la acción"],
            "rows": [["Credo che venga.", "ahora o después"],
                     ["Credo che sia venuto.", "antes"],
                     ["Spero che stia bene.", "ahora"],
                     ["Spero che sia stato bene.", "en aquel momento"]]},
  "tip": "La regla en una línea: mismo momento o posterior → congiuntivo "
         "presente; anterior → congiuntivo passato. Nada más."},

 {"h": "Con concesivas y superlativos",
  "p": ["Aparece mucho con *nonostante*, *benché*, *sebbene* y "
        "los superlativos. (*Dopo che*, en cambio, va con indicativo.)"],
  "ex": [["Benché abbia studiato, non ha passato l'esame.",
          "Aunque estudió, no aprobó."],
         ["È la cosa più bella che io abbia mai visto.",
          "Es lo más lindo que vi en mi vida."],
         ["Nonostante sia partito presto, è arrivato tardi.",
          "A pesar de que salió temprano, llegó tarde."]]},
]},

30: {
"intro": "El congiuntivo imperfetto y el trapassato son la marca del italiano "
         "culto. Sin ellos no se puede armar un período hipotético ni respetar "
         "la concordancia de tiempos: te quedás en un B1 eterno. Y son "
         "sorprendentemente regulares.",
"blocks": [
 {"h": "Imperfetto: una sola irregularidad de verdad",
  "table": {"head": ["", "parlare", "vendere", "dormire", "essere"],
            "rows": [["io", "parlassi", "vendessi", "dormissi", "fossi"],
                     ["tu", "parlassi", "vendessi", "dormissi", "fossi"],
                     ["lui/lei", "parlasse", "vendesse", "dormisse", "fosse"],
                     ["noi", "parlassimo", "vendessimo", "dormissimo", "fossimo"],
                     ["voi", "parlaste", "vendeste", "dormiste", "foste"],
                     ["loro", "parlassero", "vendessero", "dormissero", "fossero"]]},
  "p": ["Los irregulares principales son los mismos de siempre, y por la misma razón "
        "latina: *essere → fossi*; *fare → facessi*; *dire → dicessi*; "
        "*bere → bevessi*; *dare → dessi*; *stare → stessi* (y *porre → ponessi*, *tradurre → traducessi*). Todo lo demás es "
        "raíz del infinitivo + *-assi / -essi / -issi*."],
  "warn": "*noi* lleva doble ese y termina en *-ssimo* (*parlassimo*), que se "
          "parece peligrosamente al superlativo. Y las dos primeras personas "
          "del singular son idénticas: otra vez hace falta el pronombre."},

 {"h": "Trapassato del congiuntivo",
  "p": ["*avessi* o *fossi* + participio. Es el congiuntivo del "
        "trapassato prossimo, y es la forma obligatoria en la hipótesis "
        "imposible del pasado."],
  "ex": [["Credevo che fosse partito.", "Creía que había salido."],
         ["Se l'avessi saputo, non sarei venuto.",
          "Si lo hubiera sabido, no habría venido."],
         ["Pensavo che aveste già mangiato.", "Pensaba que ya habían comido."]]},

 {"h": "Cuándo aparecen",
  "p": ["Regla simple: **si el verbo principal está en pasado o en condicional, "
        "la subordinada no puede llevar congiuntivo presente.** Baja al "
        "imperfetto (simultáneo; también posterior tras un condicional o un verbo de "
        "voluntad: volevo che venisse) o al trapassato (anterior). Con verbos de "
        "opinión, lo posterior va en condizionale passato (lo ves en la semana 31)."],
  "table": {"head": ["Principal", "Subordinada", "Ejemplo"],
            "rows": [["presente", "congiuntivo presente", "Credo che venga."],
                     ["presente", "congiuntivo passato", "Credo che sia venuto."],
                     ["pasado", "congiuntivo imperfetto", "Credevo che venisse."],
                     ["pasado", "congiuntivo trapassato", "Credevo che fosse venuto."],
                     ["condicional", "congiuntivo imperfetto", "Vorrei che venisse."]]},
  "tip": "*Vorrei che tu venissi* — «querría que vinieras». El condicional en "
         "la principal arrastra imperfetto en la subordinada, exactamente igual "
         "que en castellano. Este caso te sale gratis."},

 {"h": "Los otros usos del imperfetto de congiuntivo",
  "ex": [["Magari fosse vero!", "¡Ojalá fuera cierto!"],
         ["Se solo avessi più tempo...", "Si tuviera más tiempo..."],
         ["Parla come se fosse un esperto.", "Habla como si fuera un experto."],
         ["Fosse anche l'ultima volta, non ci vado.",
          "Aunque fuera la última vez, no voy."]],
  "warn": "*come se* pide SIEMPRE congiuntivo imperfetto o trapassato, nunca "
          "presente: *come se fosse*, *come se non fosse successo niente*. "
          "Nunca «come se è»."},
]},

31: {
"intro": "La concordancia de tiempos es la regla que ordena todo lo anterior. "
         "No es una lista para memorizar: es una lógica de dos preguntas. "
         "¿En qué tiempo está el verbo principal? ¿La subordinada pasa antes, "
         "al mismo tiempo o después?",
"blocks": [
 {"h": "El cuadro completo con congiuntivo",
  "table": {"head": ["Principal", "Anterior", "Simultáneo", "Posterior"],
            "rows": [["presente / futuro", "congiuntivo passato",
                      "congiuntivo presente", "congiuntivo presente"],
                     ["pasado", "congiuntivo trapassato",
                      "congiuntivo imperfetto", "condizionale passato"]]},
  "ex": [["Credo che sia partito / parta / parta domani.",
          "Creo que salió / sale / sale mañana."],
         ["Credevo che fosse partito / partisse / sarebbe partito.",
          "Creía que había salido / salía / saldría."]]},

 {"h": "El posterior en el pasado: la sorpresa",
  "warn": "Para decir «creía que vendría», el italiano NO usa el condicional "
          "simple sino el COMPUESTO: *Credevo che sarebbe venuto*. Esta es una "
          "de las diferencias más marcadas con el castellano, que usa "
          "«vendría». Vale para todos los casos de futuro visto desde el "
          "pasado, con congiuntivo o sin él.",
  "ex": [["Ha detto che sarebbe arrivato alle otto.",
          "Dijo que llegaría a las ocho."],
         ["Sapevo che avresti capito.", "Sabía que ibas a entender."],
         ["Pensavo che sarebbe stato più facile.",
          "Pensaba que sería más fácil."]]},

 {"h": "Con indicativo también hay concordancia",
  "table": {"head": ["Principal", "Anterior", "Simultáneo", "Posterior"],
            "rows": [["presente", "passato prossimo", "presente", "futuro"],
                     ["pasado", "trapassato prossimo", "imperfetto",
                      "condizionale passato"]]},
  "ex": [["So che è partito / parte / partirà.", "Sé que salió / sale / saldrá."],
         ["Sapevo che era partito / partiva / sarebbe partito.",
          "Sabía que había salido / salía / saldría."]]},

 {"h": "Cómo entrenarlo",
  "tip": "Antes de escribir el verbo de la subordinada, hacé las dos preguntas "
         "en voz alta: (1) ¿el principal es presente o pasado? (2) ¿esto pasa "
         "antes, durante o después? Con esas dos respuestas la forma sale sola. "
         "Es más rápido que recordar la tabla."},
]},

32: {
"intro": "El período hipotético es el examen del congiuntivo: si lo tenés "
         "automatizado, tenés el B2. Son tres tipos, y una prohibición "
         "absoluta que el italiano comparte con el castellano culto pero que "
         "el habla popular de los dos idiomas rompe todo el tiempo.",
"blocks": [
 {"h": "Los tres tipos",
  "table": {"head": ["Tipo", "Prótasis (se...)", "Apódosis", "Ejemplo"],
            "rows": [["I — real", "indicativo presente/futuro",
                      "indicativo o imperativo",
                      "Se ho tempo, ti chiamo."],
                     ["II — posible / irreal presente", "congiuntivo imperfetto",
                      "condizionale presente",
                      "Se avessi tempo, ti chiamerei."],
                     ["III — imposible (pasado)", "congiuntivo trapassato",
                      "condizionale passato",
                      "Se avessi avuto tempo, ti avrei chiamato."]]},
  "p": ["El tipo I habla de algo que puede pasar de verdad. El II, de algo "
        "improbable o contrario a los hechos actuales. El III, de algo que ya "
        "no puede pasar porque el momento pasó."]},

 {"h": "La prohibición",
  "warn": "Detrás de *se* NUNCA va condicional. Ni *se avrei*, ni *se "
          "sarei*, ni *se vorrei*. En los tipos II y III la secuencia correcta es congiuntivo "
          "en la parte del *se* y condicional en la otra. Es idéntico al "
          "castellano correcto («si tuviera... llamaría»), pero como en el "
          "castellano rioplatense se oye «si tendría», el error se traslada.",
  "ex": [["Se fossi ricco, comprerei una casa al mare.",
          "Si fuera rico, me compraría una casa en la playa."],
         ["Se fosse venuto, l'avremmo visto.",
          "Si hubiera venido, lo habríamos visto."],
         ["Se potessi, verrei subito.", "Si pudiera, iría enseguida."]]},

 {"h": "Los mixtos, que son los más reales",
  "p": ["Se puede combinar un pasado imposible con una consecuencia presente, o "
        "al revés. Son frecuentísimos en la conversación."],
  "ex": [["Se avessi studiato, ora saresti laureato.",
          "Si hubieras estudiado, ahora estarías recibido."],
         ["Se fossi più ordinato, non avresti perso le chiavi.",
          "Si fueras más ordenado, no habrías perdido las llaves."]]},

 {"h": "Otras formas de hipótesis",
  "p": ["*Magari* + congiuntivo imperfetto para el deseo (*Magari piovesse!*). "
        "*Se solo...*, *Come se...*, *Nel caso in cui* + congiuntivo, *Qualora* "
        "+ congiuntivo (registro formal), *A meno che non* + congiuntivo, "
        "*Purché* / *A patto che* + congiuntivo."],
  "ex": [["Vengo, a meno che non piova.", "Voy, a menos que llueva."],
         ["Ti presto la macchina purché tu guidi piano.",
          "Te presto el auto con tal de que manejes despacio."],
         ["Qualora fosse necessario, mi chiami.",
          "En caso de que fuera necesario, llámeme."]],
  "tip": "En el italiano hablado se oye muchísimo el doble imperfetto de "
         "indicativo: *Se lo sapevo, non venivo*. Es coloquial y aceptado en la "
         "oralidad, pero en cualquier examen escrito hay que poner "
         "*se l'avessi saputo, non sarei venuto*."},
]},

33: {
"intro": "El condicional compuesto tiene dos trabajos: decir «habría hecho» y "
         "—este es el que sorprende— expresar el futuro visto desde el pasado, "
         "donde el castellano usa el condicional simple.",
"blocks": [
 {"h": "La forma",
  "p": ["*avrei* o *sarei* + participio, con las reglas de auxiliar y "
        "concordancia de siempre: *avrei parlato*, *sarei andato/a*, "
        "*mi sarei alzato/a*."],
  "table": {"head": ["", "con avere", "con essere"],
            "rows": [["io", "avrei fatto", "sarei andato/a"],
                     ["tu", "avresti fatto", "saresti andato/a"],
                     ["lui/lei", "avrebbe fatto", "sarebbe andato/a"],
                     ["noi", "avremmo fatto", "saremmo andati/e"],
                     ["voi", "avreste fatto", "sareste andati/e"],
                     ["loro", "avrebbero fatto", "sarebbero andati/e"]]}},

 {"h": "Uso 1: lo que no pasó",
  "ex": [["Avrei voluto aiutarti.", "Habría querido ayudarte."],
         ["Sarei venuto, ma non ho potuto.", "Habría ido, pero no pude."],
         ["Al posto tuo, avrei detto di no.", "En tu lugar, habría dicho que no."],
         ["Avresti dovuto avvisarmi.", "Deberías haberme avisado."]],
  "tip": "*Avresti dovuto / potuto / voluto* + infinitivo es la fórmula del "
         "reproche y del arrepentimiento. Muy útil y muy frecuente."},

 {"h": "Uso 2: el futuro en el pasado",
  "warn": "Este es el punto que hay que grabar a fuego. «Dijo que vendría» no "
          "es *ha detto che verrebbe* sino *ha detto che sarebbe venuto*. El "
          "italiano exige el condicional COMPUESTO siempre que el punto de "
          "referencia esté en el pasado. El castellano usa el simple, así que "
          "la traducción literal siempre falla.",
  "ex": [["Mi ha promesso che sarebbe tornato.", "Me prometió que volvería."],
         ["Non sapevo che avrebbe portato gli amici.",
          "No sabía que traería a los amigos."],
         ["Era sicuro che avremmo vinto.", "Estaba seguro de que ganaríamos."],
         ["Pensavo che ti sarebbe piaciuto.", "Pensaba que te iba a gustar."]]},

 {"h": "Uso 3: la noticia no confirmada, en pasado",
  "ex": [["Il ladro sarebbe fuggito in auto.",
          "El ladrón habría huido en auto."],
         ["Secondo il giornale, avrebbero già firmato.",
          "Según el diario, ya habrían firmado."]]},
]},

34: {
"intro": "La pasiva italiana tiene tres auxiliares distintos donde el "
         "castellano tiene uno, y cada uno cambia el matiz. Es una de las cosas "
         "que más suben el registro de un texto escrito.",
"blocks": [
 {"h": "essere: la pasiva neutra",
  "p": ["*essere* + participio, con el participio concordando con el sujeto y "
        "el agente introducido por *da*."],
  "ex": [["Il libro è stato scritto da Calvino.",
          "El libro fue escrito por Calvino."],
         ["Le lettere sono state spedite ieri.", "Las cartas fueron enviadas ayer."],
         ["La casa sarà venduta.", "La casa será vendida."]],
  "tip": "Como *essere* mismo se conjuga, la pasiva puede ir en cualquier "
         "tiempo: *è letto*, *era letto*, *è stato letto*, *sarà letto*, "
         "*sarebbe stato letto*, *che sia letto*."},

 {"h": "venire: la pasiva de acción",
  "p": ["Sustituye a *essere* solo en los tiempos simples y subraya el proceso, "
        "no el estado resultante. Es la que usa la prosa periodística y "
        "administrativa."],
  "ex": [["La porta viene chiusa alle otto.", "La puerta se cierra a las ocho."],
         ["I documenti vengono controllati ogni giorno.",
          "Los documentos se revisan todos los días."]],
  "warn": "*La porta è chiusa* es ambiguo: puede ser «la puerta está cerrada» "
          "(estado). *La porta viene chiusa* solo puede ser «la puerta se "
          "cierra» (acción). Por eso *venire* es tan útil. No existe en tiempos "
          "compuestos: no se dice «è venuta chiusa»."},

 {"h": "andare: la pasiva de obligación",
  "p": ["*andare* + participio significa «debe ser». Se usa muchísimo en "
        "instrucciones, recetas y normativas."],
  "ex": [["Il modulo va compilato in stampatello.",
          "El formulario debe llenarse en imprenta."],
         ["La pasta va scolata al dente.", "La pasta hay que colarla al dente."],
         ["Questi errori andrebbero corretti.", "Estos errores deberían corregirse."]],
  "tip": "*va fatto*, *va detto*, *va notato*, *va ricordato* son conectores de "
         "texto argumentativo de nivel C1: «hay que decir que», «cabe recordar "
         "que»."},

 {"h": "Cuándo conviene evitarla",
  "p": ["El italiano usa la pasiva menos que el inglés y más que el castellano "
        "hablado. Cuando el agente no importa, lo natural no es la pasiva sino "
        "el *si passivante* (semana que viene) o la tercera persona del plural "
        "impersonal: *dicono che...* (dicen que...)."]},
]},

35: {
"intro": "El *si* italiano hace dos trabajos que el castellano también conoce "
         "—«se vende», «se vive bien»— pero con una diferencia de concordancia "
         "que hay que ver con lupa, y con un uso coloquial de *si* = *noi* que "
         "no existe en castellano.",
"blocks": [
 {"h": "Si passivante: concuerda",
  "p": ["Con verbos transitivos y objeto expresado, el verbo concuerda con ese "
        "objeto, que en realidad es el sujeto gramatical. Exactamente igual que "
        "en castellano."],
  "ex": [["Qui si parla italiano.", "Acá se habla italiano."],
         ["Si vendono libri usati.", "Se venden libros usados."],
         ["In questo ristorante si mangiano ottimi piatti.",
          "En este restaurante se comen platos excelentes."]],
  "warn": "*Si vende libri* es incorrecto: si el objeto es plural, el verbo va "
          "en plural. El cartel correcto es *Si affittano camere*, "
          "*Si cercano collaboratori*, *Si vendono appartamenti*. Los carteles "
          "reales en Italia se equivocan seguido, pero el examen no perdona."},

 {"h": "Si impersonale: siempre singular",
  "p": ["Con verbos intransitivos o sin objeto, *si* significa «uno, la gente» "
        "y el verbo va en tercera del singular."],
  "ex": [["In Italia si mangia bene.", "En Italia se come bien."],
         ["Si dice che sia partito.", "Se dice que se fue."],
         ["Non si può fumare qui.", "No se puede fumar acá."],
         ["Come si dice in italiano?", "¿Cómo se dice en italiano?"]]},

 {"h": "El adjetivo va en plural masculino",
  "warn": "Con el *si* impersonal, cualquier adjetivo o participio referido al "
          "sujeto va en masculino PLURAL, aunque el verbo esté en singular. "
          "*Quando si è stanchi, si dorme male.* *Si è sempre giovani dentro.* "
          "Es una construcción que no tiene paralelo en castellano y que "
          "aparece en todos los exámenes B2."},

 {"h": "Con verbos reflexivos: ci si",
  "p": ["Como no se pueden apilar dos *si*, el impersonal de un verbo "
        "reflexivo se dice *ci si*: *ci si alza presto*, *ci si diverte*, "
        "*ci si annoia*, *ci si abitua a tutto*."],
  "ex": [["D'estate ci si sveglia presto.", "En verano uno se despierta temprano."],
         ["Con lui non ci si annoia mai.", "Con él uno no se aburre nunca."]]},

 {"h": "El si toscano por noi",
  "p": ["En el italiano central y coloquial, *si* + tercera persona sustituye "
        "a *noi*: *Stasera si va al cinema* = *andiamo al cinema*. "
        "*Domani si parte.* Es informal pero muy extendido: hay que "
        "entenderlo, no hace falta usarlo."]},
]},

36: {
"intro": "Dos pronombres átonos en la misma frase: acá el italiano se separa "
         "definitivamente del castellano. No solo cambian de orden, sino que "
         "cambian de forma. Es mecánico, y por eso se automatiza con "
         "repetición.",
"blocks": [
 {"h": "La regla de la transformación",
  "p": ["El indirecto va PRIMERO y su *-i* final se convierte en *-e*. Los "
        "de tercera persona (*gli*, *le*) se fusionan en *glie-* y se escriben "
        "pegados."],
  "table": {"head": ["", "+ lo", "+ la", "+ li", "+ le", "+ ne"],
            "rows": [["mi", "me lo", "me la", "me li", "me le", "me ne"],
                     ["ti", "te lo", "te la", "te li", "te le", "te ne"],
                     ["gli / le / Le", "glielo", "gliela", "glieli", "gliele", "gliene"],
                     ["ci", "ce lo", "ce la", "ce li", "ce le", "ce ne"],
                     ["vi", "ve lo", "ve la", "ve li", "ve le", "ve ne"],
                     ["si", "se lo", "se la", "se li", "se le", "se ne"]]},
  "warn": "*glielo* se escribe en UNA palabra y vale para «se lo» masculino, "
          "femenino y de usted: *glielo do* puede ser «se lo doy a él», «a "
          "ella» o «a usted». El plural *loro* culto sería *lo do loro*, pero "
          "en el italiano actual *glielo* cubre también el plural."},

 {"h": "El orden es el del castellano; cambia la vocal",
  "warn": "El castellano dice «me lo» pero también «se lo» a partir de «le lo». "
          "El italiano sigue la misma lógica, así que la sorpresa no es el "
          "orden sino la *e*: *mi* + *lo* no da «mi lo» sino *me lo*. La i "
          "cambia a e siempre, sin excepción.",
  "ex": [["Me lo dai?", "¿Me lo das?"],
         ["Te la spiego dopo.", "Te la explico después."],
         ["Glielo dico io.", "Se lo digo yo."],
         ["Ce ne ha parlato ieri.", "Nos habló de eso ayer."],
         ["Se ne sono andati.", "Se fueron."]]},

 {"h": "En los tiempos compuestos",
  "p": ["El participio concuerda con el pronombre directo, igual que antes: "
        "*Me l'ha data* (la carta), *Gliele ho dette* (las cosas), "
        "*Ce li hanno portati*."],
  "ex": [["Il libro? Me l'ha prestato Marco.",
          "¿El libro? Me lo prestó Marco."],
         ["Le chiavi? Gliele ho date ieri.", "¿Las llaves? Se las di ayer."]]},

 {"h": "Con infinitivo, gerundio e imperativo van pegados",
  "ex": [["Voglio dirtelo.", "Quiero decírtelo."],
         ["Puoi portarmelo?", "¿Me lo podés traer?"],
         ["Dammelo!", "¡Dámelo!"],
         ["Diglielo subito!", "¡Decíselo ya!"],
         ["Non dirmelo!", "¡No me lo digas!"],
         ["Portandoglielo, ha risolto tutto.", "Llevándoselo, resolvió todo."]],
  "tip": "Con los modales tenés las dos opciones y las dos son correctas: "
         "*te lo voglio dire* = *voglio dirtelo*. Elegí una y usala siempre "
         "hasta que salga automática."},
]},

37: {
"intro": "*Ne* y *ci* son dos partículas que el castellano no tiene y que el "
         "italiano usa en casi todas las frases. Mientras no las incorpores, tu "
         "italiano va a sonar correcto pero extranjero. El francés tiene "
         "*en* y *y*: si sabés algo de francés, esta semana es un paseo.",
"blocks": [
 {"h": "NE, valor partitivo",
  "p": ["Sustituye a una cantidad de algo ya mencionado. En castellano "
        "simplemente no se dice nada; en italiano es obligatorio."],
  "ex": [["Quanti libri hai? — Ne ho tre.", "¿Cuántos libros tenés? — Tengo tres."],
         ["Vuoi del pane? — Sì, ne prendo un po'.", "¿Querés pan? — Sí, agarro un poco."],
         ["Hai sigarette? — No, non ne ho.", "¿Tenés cigarrillos? — No, no tengo."]],
  "warn": "Decir *ho tre* sin *ne* es agramatical. Cada vez que respondas con "
          "una cantidad, el *ne* tiene que estar."},

 {"h": "NE, valor de di + algo",
  "ex": [["Parliamo del progetto → Ne parliamo domani.",
          "Hablamos de eso mañana."],
         ["Sono contento del risultato → Ne sono contento.",
          "Estoy contento con eso."],
         ["Che ne pensi?", "¿Qué te parece? / ¿Qué pensás de eso?"],
         ["Non ne vale la pena.", "No vale la pena."],
         ["Me ne vado.", "Me voy (de acá)."]],
  "p": ["En los tiempos compuestos, el participio concuerda con la cantidad: "
        "*Ne ho comprati tre* (libros), *Ne ho comprate due* (revistas)."]},

 {"h": "CI, valor de lugar",
  "ex": [["Vai a Roma? — Sì, ci vado domani.", "¿Vas a Roma? — Sí, voy mañana."],
         ["Sei mai stato in Grecia? — No, non ci sono mai stato.",
          "Nunca estuve ahí."],
         ["Abiti ancora a Roma? — Sì, ci abito da dieci anni.",
          "¿Seguís viviendo en Roma? — Sí, vivo ahí hace diez años."]]},

 {"h": "CI, valor de a + algo",
  "ex": [["Pensi al lavoro? — Sì, ci penso sempre.", "Sí, pienso en eso siempre."],
         ["Credi ai fantasmi? — No, non ci credo.", "No, no creo en eso."],
         ["Ci riesco!", "¡Lo logro!"],
         ["Non ci capisco niente.", "No entiendo nada de esto."]],
  "tip": "Regla mecánica: si el verbo pide *di*, la partícula es *ne*; si pide "
         "*a*, *in* o *su*, la partícula es *ci*. *Parlare di* → *ne parlo*. "
         "*Pensare a* → *ci penso*."},

 {"h": "Las expresiones fijas que hay que saber",
  "table": {"head": ["Expresión", "Sentido"],
            "rows": [["ci vuole / ci vogliono", "hace falta / hacen falta"],
                     ["c'è / ci sono", "hay"],
                     ["farcela", "arreglárselas, lograrlo (ce la faccio)"],
                     ["andarsene", "irse (me ne vado)"],
                     ["averne abbastanza", "estar harto (ne ho abbastanza)"],
                     ["non poterne più", "no aguantar más (non ne posso più)"],
                     ["metterci", "tardar (ci metto due ore)"],
                     ["volerci", "hacer falta (ci vogliono due ore)"]]},
  "warn": "*metterci* y *volerci* se confunden: *ci metto due ore* (yo tardo "
          "dos horas, personal) frente a *ci vogliono due ore* (se necesitan "
          "dos horas, impersonal)."},
]},

38: {
"intro": "Los relativos son lo que permite alargar las frases sin romperlas. "
         "El italiano tiene un sistema más simple que el castellano en la "
         "superficie —*che* sirve para casi todo— pero se complica en cuanto "
         "aparece una preposición.",
"blocks": [
 {"h": "che: sujeto y objeto, sin preposición",
  "p": ["*Che* es invariable y sirve para personas y cosas, en función de "
        "sujeto o de objeto directo. Nunca lleva preposición delante."],
  "ex": [["Il libro che ho letto è bellissimo.", "El libro que leí es hermoso."],
         ["La ragazza che parla è mia sorella.", "La chica que habla es mi hermana."]],
  "warn": "En italiano el relativo NO se puede omitir nunca. El inglés y a "
          "veces el castellano coloquial lo dejan caer; el italiano no."},

 {"h": "cui: cuando hay preposición",
  "p": ["Si el relativo va detrás de una preposición, se usa *cui*, también "
        "invariable. La preposición va delante."],
  "ex": [["La città in cui vivo.", "La ciudad en la que vivo."],
         ["L'amico con cui studio.", "El amigo con el que estudio."],
         ["Il motivo per cui sono venuto.", "El motivo por el que vine."],
         ["La persona a cui ho scritto.", "La persona a la que escribí."],
         ["Il libro di cui ti parlavo.", "El libro del que te hablaba."]],
  "tip": "Con *a*, la preposición se puede omitir: *la persona cui ho scritto* "
         "es correcto y culto. Con las demás preposiciones, nunca."},

 {"h": "il cui: el posesivo relativo",
  "p": ["*il cui*, *la cui*, *i cui*, *le cui* significan «cuyo». El artículo "
        "concuerda con la cosa poseída, no con el poseedor, y no necesita "
        "preposición (aunque puede llevarla según la función: *la casa nel "
        "cui giardino...*)."],
  "ex": [["Lo scrittore il cui libro ho letto.",
          "El escritor cuyo libro leí."],
         ["Una città le cui strade sono strette.",
          "Una ciudad cuyas calles son angostas."]]},

 {"h": "il quale: el relativo formal",
  "p": ["*il quale / la quale / i quali / le quali* pueden sustituir a *che* y "
        "a *cui*. Concuerdan, así que sirven para deshacer ambigüedades, y "
        "elevan el registro."],
  "ex": [["Ho parlato con la sorella di Marco, la quale è medico.",
          "Hablé con la hermana de Marco, que es médica."],
         ["Il progetto al quale lavoro.", "El proyecto en el que trabajo."]],
  "tip": "Compará: *il figlio della vicina, che mi saluta sempre* (¿quién "
         "saluda?) frente a *il figlio della vicina, il quale mi saluta sempre* "
         "(el hijo, sin duda)."},

 {"h": "chi, quello che, ciò che",
  "p": ["*chi* = «quien», solo para personas y sin antecedente: *Chi dorme non "
        "piglia pesci*. *quello che* / *ciò che* / *quel che* = «lo que», "
        "neutro: *Non capisco quello che dici*. *Tutto ciò che* = «todo lo "
        "que». Y *il che* retoma una frase entera: *È arrivato tardi, il che mi "
        "ha infastidito*."]},
]},

39: {
"intro": "Jefe de la tercera estación. Es el examen más duro hasta acá porque "
         "junta el congiuntivo, la concordancia de tiempos, los hipotéticos, "
         "la pasiva y los pronombres. Esta hoja es el resumen operativo.",
"blocks": [
 {"h": "Los cuatro congiuntivos",
  "table": {"head": ["Tiempo", "Forma", "Cuándo"],
            "rows": [["presente", "che io parli / prenda",
                      "principal en presente, acción simultánea o posterior"],
                     ["passato", "che io abbia parlato / sia andato",
                      "principal en presente, acción anterior"],
                     ["imperfetto", "che io parlassi / prendessi",
                      "principal en pasado o condicional, simultánea"],
                     ["trapassato", "che io avessi parlato / fossi andato",
                      "principal en pasado, acción anterior"]]}},

 {"h": "El período hipotético en tres líneas",
  "p": ["I: *Se ho tempo, ti chiamo.* "
        "II: *Se avessi tempo, ti chiamerei.* "
        "III: *Se avessi avuto tempo, ti avrei chiamato.* "
        "Nunca condicional después de *se*."]},

 {"h": "Pronombres combinados",
  "table": {"head": ["", "lo", "la", "li", "le", "ne"],
            "rows": [["mi", "me lo", "me la", "me li", "me le", "me ne"],
                     ["ti", "te lo", "te la", "te li", "te le", "te ne"],
                     ["gli/le", "glielo", "gliela", "glieli", "gliele", "gliene"],
                     ["ci", "ce lo", "ce la", "ce li", "ce le", "ce ne"],
                     ["vi", "ve lo", "ve la", "ve li", "ve le", "ve ne"]]}},

 {"h": "Las trampas de la estación",
  "warn": "1. *Credo che SIA*, no «credo che è». "
          "2. *-are* → *-i* (no *-e* como en castellano), *-ere/-ire* → *-a*. "
          "3. «Dijo que vendría» = *ha detto che SAREBBE VENUTO*. "
          "4. *Si vendONO libri* (plural). "
          "5. *Quando si è STANCHI* (plural masculino). "
          "6. *ne* obligatorio con cantidades: *ne ho tre*. "
          "7. *cui* con preposición, *che* sin ella. "
          "8. *come se* + congiuntivo imperfetto o trapassato, siempre."},
]},

}
