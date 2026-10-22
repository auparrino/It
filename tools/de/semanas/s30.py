# -*- coding: utf-8 -*-
"""Semana 30 — Hätte ich das gewusst! (B1): Konjunktiv II del pasado, irreales, lamentos y als ob."""
from base import q, ch, li, cz, tr, ty, fx, di, MAY  # noqa: F401


def _mix(*slots):
    """Todas las combinaciones (una frase de cada lista), también sin comas y con punto en vez de «!»."""
    import itertools
    out = []
    for combo in itertools.product(*slots):
        s = " ".join(combo)
        for y in (s, s.replace(",", ""), s.replace("!", "."), s.replace(",", "").replace("!", ".")):
            if y not in out:
                out.append(y)
    return out

WEEK = {
    "week": 30,
    "title": "Hätte ich das gewusst!",
    "level": "B1",
    "focus": "Imaginar otro pasado: lo que habrías hecho, lo que lamentás y el «como si».",
    "fare": "Hablar de decisiones y arrepentimientos, de oportunidades perdidas y de cómo parece que son las cosas.",
    "tema": "Konjunktiv II del pasado (hätte / wäre + participio), irreales del pasado, deseos y lamentos, als ob / als + Konjunktiv II presente; decisiones, arrepentimientos",
    "keys": [
        "Konjunktiv II pasado = *hätte / wäre* + participio: *Ich hätte das gemacht*.",
        "Una sola forma para «hubiera» y «habría»: *Wenn ich das gewusst hätte, wäre ich gekommen*.",
        "*hätte* o *wäre*: la misma elección que en el Perfekt.",
        "Sin *wenn*, el auxiliar va adelante: *Hätte ich das gewusst, …*",
        "Lamentos: *Hätte ich doch mehr gelernt!* / *Ich wünschte, ich wäre…*",
        "*als ob* + Konjunktiv II presente: *als ob er alles wüsste* = *als wüsste er alles*.",
    ],
    "lesson": {
        "intro": "En la semana 25 imaginaste un presente distinto: *Wenn ich reich wäre…* Ahora vas para atrás: lo que habrías hecho, lo que hubiera pasado si…, lo que te gustaría haber hecho distinto. Con dos auxiliares que ya conocés, *hätte* y *wäre*, alcanza. Al final, el «como si» del alemán.",
        "parts": [
            {"h": "hätte / wäre + participio", "blocks": [0, 1]},
            {"h": "Si hubiera…: irreales y lamentos", "blocks": [2, 3, 4, 5]},
            {"h": "Als ob: como si", "blocks": [6, 7]},
        ],
        "blocks": [
            {
                "h": "La forma: hätte / wäre + participio",
                "r": "El **Konjunktiv II del pasado** habla de cosas que **no pasaron**. Se arma con ***hätte*** o ***wäre*** + **participio II** al final. En castellano son «hubiera hecho» y «habría hecho».",
                "table": {"head": ["Persona", "con haben", "con sein"], "rows": [
                    ["ich", "hätte gemacht", "wäre gegangen"],
                    ["du", "hättest gemacht", "wärst gegangen"],
                    ["er, sie, es", "hätte gemacht", "wäre gegangen"],
                    ["wir", "hätten gemacht", "wären gegangen"],
                    ["ihr", "hättet gemacht", "wärt gegangen"],
                    ["sie, Sie", "hätten gemacht", "wären gegangen"],
                ]},
                "ex": [
                    ["Ich *hätte* das nicht *gemacht*.", "Yo no lo habría hecho."],
                    ["Wir *wären* gern *gekommen*.", "Nos habría gustado venir."],
                    ["Sie *wäre* fast *gefallen*.", "Casi se cae."],
                ],
                "warn": "En castellano tenemos dos formas («hubiera» y «habría»); en alemán hay **una sola** para las dos: *hätte gemacht*. Y acá no va *würde*: decí *Ich hätte das gemacht*, no *Ich würde das gemacht*.",
                "tip": "Del Perfekt al Konjunktiv II pasado: *hat → hätte*, *ist → wäre*. El resto no cambia.",
                "q": [
                    q("Completá: *Ich ___ dir geholfen.* (te habría ayudado)", "hätte", ["hätte", "wäre", "würde"]),
                    q("Completá: *Er ___ gern mitgekommen.*", "wäre", ["wäre", "hätte", "würde"]),
                ],
            },
            {
                "h": "¿hätte o wäre? Igual que en el Perfekt",
                "r": "Movimiento de un lugar a otro y cambio de estado (*gehen, fahren, kommen, werden, aufwachen, sterben*), más *sein* y *bleiben* → ***wäre***. Casi todo lo demás → ***hätte***.",
                "table": {"head": ["Perfekt", "Konjunktiv II pasado", "Castellano"], "rows": [
                    ["Ich habe gelernt.", "Ich hätte gelernt.", "habría estudiado"],
                    ["Ich bin gefahren.", "Ich wäre gefahren.", "habría ido"],
                    ["Er ist geblieben.", "Er wäre geblieben.", "se habría quedado"],
                    ["Sie ist gewesen.", "Sie wäre gewesen.", "habría sido / estado"],
                    ["Wir haben gewusst.", "Wir hätten gewusst.", "habríamos sabido"],
                ]},
                "warn": "Los reflexivos van siempre con *hätte*, aunque suenen a movimiento: *Ich hätte mich beeilt* (me habría apurado), *Er hätte sich verfahren* (se habría perdido con el auto).",
                "q": [
                    q("Completá: *Ohne dich ___ ich zu Hause geblieben.*", "wäre", ["wäre", "hätte", "würde"]),
                    q("Completá: *Wir ___ das Risiko nicht gewagt.*", "hätten", ["hätten", "wären", "würden"]),
                ],
            },
            {
                "h": "Wenn …: el irreal del pasado",
                "r": "Para imaginar **otro pasado** usás el Konjunktiv II pasado **en las dos partes**: en la condición (*wenn* … verbo al final) y en la consecuencia (que, si va segunda, arranca con el verbo).",
                "table": {"head": ["Condición (wenn … al final)", "Consecuencia (verbo primero)"], "rows": [
                    ["Wenn ich das gewusst hätte,", "wäre ich gekommen."],
                    ["Wenn wir mehr gespart hätten,", "hätten wir das Haus gekauft."],
                    ["Wenn sie nicht gezögert hätte,", "hätte sie die Stelle bekommen."],
                ]},
                "ex": [
                    ["*Wenn* ich früher *aufgestanden wäre*, *hätte* ich den Zug nicht *verpasst*.", "Si me hubiera levantado antes, no habría perdido el tren."],
                    ["*Wenn* du mich *gefragt hättest*, *hätte* ich dir *geholfen*.", "Si me hubieras preguntado, te habría ayudado."],
                    ["*Wenn* es nicht *geregnet hätte*, *wären* wir an den Strand *gefahren*.", "Si no hubiera llovido, habríamos ido a la playa."],
                ],
                "warn": "En la subordinada, el auxiliar va al **final**, después del participio: *wenn ich das gewusst **hätte***, no *wenn ich hätte das gewusst*.",
                "tip": "Compará con la semana 25: *Wenn ich Zeit hätte, würde ich kommen* (hoy, todavía posible) ↔ *Wenn ich Zeit gehabt hätte, wäre ich gekommen* (ayer, ya no).",
                "q": [
                    q("Completá: *Wenn ich das gewusst ___, wäre ich gekommen.*", "hätte", ["hätte", "wäre", "würde"]),
                    q("«Si hubieras venido, te habrías divertido.»", "Wenn du gekommen wärst, hättest du dich amüsiert.", ["Wenn du gekommen wärst, hättest du dich amüsiert.", "Wenn du gekommen hättest, wärst du dich amüsiert.", "Wenn du wärst gekommen, hättest du dich amüsiert."]),
                ],
            },
            {
                "h": "Sin wenn: el auxiliar adelante",
                "r": "Como en castellano («de haberlo sabido…»), podés sacar *wenn* y poner el **auxiliar en el casillero 1**. La consecuencia puede llevar *dann* o *so*.",
                "ex": [
                    ["*Hätte* ich das *gewusst*, (dann) *wäre* ich nicht *gekommen*.", "De haberlo sabido, no habría venido."],
                    ["*Wäre* er vorsichtiger *gewesen*, *hätte* er keinen Unfall *gehabt*.", "Si hubiera sido más cuidadoso, no habría tenido un accidente."],
                ],
                "warn": "Sin *wenn* no hay verbo al final: *Hätte ich das gewusst, …*, no *Ich das gewusst hätte, …*.",
                "tip": "*Hätte ich das bloß gewusst!*, sin segunda parte, ya es un lamento (bloque siguiente).",
                "more": [
                    "Funciona igual en **presente** (semana 25): *Hätte ich Zeit, käme ich mit* = *Wenn ich Zeit hätte, würde ich mitkommen*. Y hasta con una condición **real**, en indicativo, sobre todo en el habla: *Kommt er, (dann) gehen wir* = *Wenn er kommt, gehen wir*. Lo que se lee es: verbo primero + coma + verbo → es un «si…».",
                ],
                "q": [
                    q("Transformá: *Wenn ich mehr gelernt hätte, …*", "Hätte ich mehr gelernt, …", ["Hätte ich mehr gelernt, …", "Ich hätte mehr gelernt, …", "Wenn hätte ich mehr gelernt, …"]),
                    q("*Hätte ich Geld, würde ich reisen* significa…", "Si tuviera plata, viajaría.", ["Si tuviera plata, viajaría.", "¿Tenía plata? Viajaría.", "Tuve plata y viajé."]),
                ],
            },
            {
                "h": "Lamentos: Hätte ich doch …!",
                "r": "Para lamentar algo que hiciste o no hiciste: el auxiliar adelante con ***doch, nur* o *bloß*** (*Hätte ich doch…!*), o *Wenn* … *doch* … con el verbo al final. También ***Ich wünschte*, ich hätte / wäre…**",
                "ex": [
                    ["*Hätte* ich *doch* mehr *gelernt*!", "¡Si hubiera estudiado más!"],
                    ["*Wenn* ich *bloß* nicht so viel Geld *ausgegeben hätte*!", "¡Ojalá no hubiera gastado tanta plata!"],
                    ["*Wäre* ich *nur* zu Hause *geblieben*!", "¡Me hubiera quedado en casa!"],
                    ["*Ich wünschte*, ich *wäre* mutiger *gewesen*.", "Ojalá hubiera sido más valiente."],
                ],
                "warn": "El «ojalá» del pasado no es *hoffentlich*: *hoffentlich* mira a algo posible (*Hoffentlich kommt er* = ojalá venga). Para lo que ya no tiene arreglo: *Wenn er doch gekommen wäre!*",
                "more": ["*bereuen* (arrepentirse) va con acusativo y sin *sich*: *Ich bereue nichts*. *Er bereut, dass er nicht studiert hat.*"],
                "q": [
                    q("«¡Si hubiera sabido eso!»", "Hätte ich das nur gewusst!", ["Hätte ich das nur gewusst!", "Wäre ich das nur gewusst!", "Ich hatte das nur gewusst!"]),
                    q("Completá: *Ich wünschte, ich ___ mutiger gewesen.*", "wäre", ["wäre", "hätte", "bin"]),
                ],
            },
            {
                "h": "Un pasado que pesa en el presente",
                "r": "A veces la condición es pasada pero la consecuencia es **hoy**. Entonces mezclás: condición en Konjunktiv II **pasado**, consecuencia en Konjunktiv II **presente** (*würde* + infinitivo, *wäre, hätte*).",
                "ex": [
                    ["Wenn ich Deutsch *gelernt hätte*, *würde* ich jetzt in Berlin *arbeiten*.", "Si hubiera estudiado alemán, ahora trabajaría en Berlín."],
                    ["Wenn du nicht so spät ins Bett *gegangen wärst*, *wärst* du jetzt nicht so müde.", "Si no te hubieras acostado tan tarde, ahora no estarías tan cansado."],
                    ["Wenn wir damals *gespart hätten*, *hätten* wir heute mehr Geld.", "Si hubiéramos ahorrado en ese momento, hoy tendríamos más plata."],
                ],
                "warn": "La pista está en la consecuencia: *jetzt, heute, immer noch* piden el Konjunktiv II **presente**. *Wenn ich gespart hätte, hätte ich jetzt ein Auto*, no *hätte ich jetzt ein Auto gehabt*.",
                "q": [
                    q("Completá: *Wenn ich gespart hätte, ___ ich jetzt ein Auto.*", "hätte", ["hätte", "hatte", "habe"]),
                ],
            },
            {
                "h": "als ob + Konjunktiv II: como si",
                "r": "*als ob* = «como si». Compara con algo **irreal** o dudoso, así que pide **Konjunktiv II presente** (*wäre, hätte, würde* + infinitivo, *könnte, wüsste*…), con el verbo al final. Va mucho con ***so tun*** (hacer como si), ***aussehen*** (parecer) y ***sich anhören*** (sonar).",
                "ex": [
                    ["Er tut so, *als ob* er alles *wüsste*.", "Hace como si supiera todo."],
                    ["Du siehst aus, *als ob* du müde *wärst*.", "Tenés cara de estar cansado."],
                    ["Sie redet, *als ob* sie die Chefin *wäre*.", "Habla como si fuera la jefa."],
                    ["Es hört sich an, *als ob* es *regnen würde*.", "Suena como si estuviera lloviendo."],
                ],
                "warn": "El castellano usa un subjuntivo de pasado («como si **supiera**») aunque hable de ahora; el alemán, el Konjunktiv II **presente**: *als ob er alles wüsste*. No hace falta ningún pasado.",
                "more": ["*als ob* con Konjunktiv II pasado (*als ob nichts gewesen wäre*) lo ves en la semana 43."],
                "q": [
                    q("Completá: *Er tut so, als ob er krank ___.*", "wäre", ["wäre", "hätte", "würde"]),
                    q("«Hace como si no me viera.»", "Er tut so, als ob er mich nicht sehen würde.", ["Er tut so, als ob er mich nicht sehen würde.", "Er tut so, als ob er würde mich nicht sehen.", "Er tut so, als ob er sieht mich nicht."]),
                ],
            },
            {
                "h": "als + verbo: la versión corta",
                "r": "En lugar de *als ob* podés usar solo ***als***, con el verbo **enseguida**: *als ob er müde wäre* = *als **wäre** er müde*. Suena un poco más escrito, pero se usa mucho.",
                "table": {"head": ["als ob … verbo al final", "als + verbo + resto"], "rows": [
                    ["…, als ob er müde wäre.", "…, als wäre er müde."],
                    ["…, als ob sie alles wüsste.", "…, als wüsste sie alles."],
                    ["…, als ob es regnen würde.", "…, als würde es regnen."],
                ]},
                "ex": [
                    ["Sie tut so, *als hätte* sie keine Zeit.", "Hace como si no tuviera tiempo."],
                    ["Er spricht Deutsch, *als wäre* es seine Muttersprache.", "Habla alemán como si fuera su lengua materna."],
                ],
                "warn": "Con *als* solo, el verbo va **inmediatamente después**: *als wäre er müde*. *als er müde wäre* está mal, y *als er müde war* es otra cosa: «cuando estaba cansado».",
                "tip": "Es el mismo *als* de los recuerdos (*als ich klein war*), pero el orden y el Konjunktiv le cambian el sentido.",
                "q": [
                    q("Transformá: *…, als ob er reich wäre.*", "…, als wäre er reich.", ["…, als wäre er reich.", "…, als er reich wäre.", "…, als er wäre reich."]),
                ],
            },
        ],
    },
    "vocab": [
        ["bereuen", "arrepentirse de", "Er bereut, dass er das Angebot nicht angenommen hat."],
        ["bedauern", "lamentar", "Wir bedauern sehr, dass Sie nicht kommen konnten."],
        ["die Gelegenheit", "la oportunidad, la ocasión", "So eine Gelegenheit kommt nie wieder."],
        ["verpassen", "perder (un tren, una oportunidad)", "Wenn ich früher losgegangen wäre, hätte ich den Bus nicht verpasst."],
        ["zögern", "dudar, titubear", "Hätte ich nicht so lange gezögert, hätte ich die Wohnung bekommen."],
        ["wagen", "atreverse a, arriesgar", "Wer nicht wagt, der nicht gewinnt."],
        ["sich trauen", "animarse, atreverse", "Ich habe mich nicht getraut, sie anzusprechen."],
        ["das Schicksal", "el destino", "Vielleicht war es Schicksal, dass wir uns getroffen haben."],
        ["der Zufall", "la casualidad", "Wir haben uns durch Zufall in Rom getroffen."],
        ["das Risiko", "el riesgo", "Ohne Risiko hätte ich nie mein eigenes Geschäft eröffnet."],
        ["mutig", "valiente", "Ich wünschte, ich wäre damals mutiger gewesen."],
        ["leichtsinnig", "imprudente", "Es war leichtsinnig, ohne Jacke in die Berge zu fahren."],
        ["vernünftig", "sensato, razonable", "Das wäre die vernünftigere Lösung gewesen."],
        ["die Folge", "la consecuencia", "Er hat nicht an die Folgen gedacht."],
        ["der Wendepunkt", "el punto de inflexión", "Das Jahr in Berlin war ein Wendepunkt in meinem Leben."],
    ],
    "items": [
        # parte 0 — la forma
        ch(0, "Elegí el auxiliar.", "Ich ___ dir geholfen.", "hätte", ["hätte", "wäre", "würde"], "*helfen* hace el Perfekt con *haben* → *hätte geholfen*."),
        ch(0, "Elegí el auxiliar.", "Wir ___ gern gekommen.", "wären", ["wären", "hätten", "würden"], "*kommen* va con *sein* → *wären gekommen*."),
        ch(0, "Elegí el auxiliar.", "Du ___ das nicht gemacht.", "hättest", ["hättest", "wärst", "hattest"], "*hättest* (habrías), no *hattest* (habías)."),
        ch(0, "¿Qué significa?", "Ich wäre fast gefallen.", "Casi me caigo.", ["Casi me caigo.", "Me caí.", "Me voy a caer."], "*fast* + Konjunktiv II pasado: algo que casi pasa, pero no."),
        ch(0, "Elegí el auxiliar.", "Er ___ länger geblieben.", "wäre", ["wäre", "hätte", "würde"], "*bleiben* va con *sein*."),
        ch(0, "Konjunktiv II pasado de *Sie ist gegangen*:", "Sie ist gegangen.", "Sie wäre gegangen.", ["Sie wäre gegangen.", "Sie hätte gegangen.", "Sie würde gegangen."], "*ist* → *wäre*."),
        cz(0, "Escribí *hätte* o *wäre*.", "Ohne Navi ___ ich mich verfahren.", "hätte", note="Reflexivo → *haben*: *hätte mich verfahren*."),
        cz(0, "Escribí *hätte* o *wäre*.", "Bei dem Wetter ___ ich zu Hause geblieben.", "wäre", note="*bleiben* → *wäre geblieben*."),
        cz(0, "Escribí la forma de *hätte* para *ihr*.", "Ihr ___ das sicher geschafft.", "hättet", note="*ihr hättet*."),
        cz(0, "Escribí la forma de *hätte* para *du*.", "Du ___ fast den Bus verpasst.", "hättest", note="*verpassen* va con *haben*: *du hättest verpasst*."),
        cz(0, "Escribí el participio de *wagen*.", "Ich hätte das nie ___.", "gewagt", note="Regular: *wagen* → *gewagt*."),
        tr(0, "Yo no lo habría hecho.", "Ich hätte das nicht gemacht.", ["Ich hätte das nicht gemacht.", "Ich hätte es nicht gemacht.", "Das hätte ich nicht gemacht.", "Ich hätte das nicht getan.", "Ich hätte es nicht getan.", "Das hätte ich nicht getan."], "«habría hecho» = *hätte gemacht*."),
        tr(0, "Ella habría venido.", "Sie wäre gekommen.", note="*kommen* → *wäre gekommen*."),
        ty(0, "Pasá al Konjunktiv II pasado.", "Ich habe es gewusst.", "Ich hätte es gewusst.", note="*habe* → *hätte*."),
        li(0, "wäre", ["wäre", "war", "Ware"], "*wäre* (habría sido, estaría) con *ä*; *war* (era, estaba) sin diéresis."),
        # parte 1 — irreales y lamentos
        ch(1, "Elegí el auxiliar.", "Wenn ich früher aufgestanden ___, hätte ich den Zug nicht verpasst.", "wäre", ["wäre", "hätte", "würde"], "*aufstehen* va con *sein*."),
        ch(1, "Elegí el auxiliar.", "Wenn du mich gefragt hättest, ___ ich dir geholfen.", "hätte", ["hätte", "wäre", "habe"], "Consecuencia irreal: *hätte geholfen*."),
        ch(1, "¿Qué oración es correcta?", "(Si lo hubiera sabido, habría venido.)", "Wenn ich das gewusst hätte, wäre ich gekommen.", ["Wenn ich das gewusst hätte, wäre ich gekommen.", "Wenn ich hätte das gewusst, wäre ich gekommen.", "Wenn ich das gewusst hätte, ich wäre gekommen."], "Auxiliar al final en la subordinada; verbo primero en la principal."),
        ch(1, "Elegí la forma.", "___ ich das nur gewusst!", "Hätte", ["Hätte", "Hatte", "Wäre"], "Lamento: *Hätte ich das nur gewusst!*"),
        ch(1, "¿Qué expresa?", "Wäre ich doch zu Hause geblieben!", "un arrepentimiento", ["un arrepentimiento", "un deseo para el futuro", "una pregunta"], "Auxiliar adelante + *doch* y signo de exclamación: lamento por el pasado, no pregunta."),
        ch(1, "Elegí la forma.", "Wenn ich gespart hätte, ___ ich jetzt mehr Geld.", "hätte", ["hätte", "hatte", "hätte gehabt"], "Consecuencia en el presente (*jetzt*): Konjunktiv II presente."),
        cz(1, "Escribí el auxiliar.", "Wenn es nicht geregnet ___, wären wir an den Strand gefahren.", "hätte", note="*regnen* va con *haben*: *geregnet hätte*."),
        cz(1, "Escribí el auxiliar.", "Wenn wir nicht so lange gezögert hätten, ___ wir die Wohnung bekommen.", "hätten", note="*bekommen* va con *haben*: *hätten bekommen*."),
        cz(1, "Escribí el auxiliar.", "___ er vorsichtiger gewesen, hätte er keinen Unfall gehabt.", "Wäre", note="Sin *wenn*: el auxiliar adelante. *sein* → *wäre gewesen*."),
        cz(1, "Escribí la palabra que falta.", "Ich ___, ich hätte mehr Zeit mit meinem Opa verbracht.", "wünschte", note="*Ich wünschte, …* + Konjunktiv II: ojalá."),
        cz(1, "Escribí el participio de *verpassen*.", "Wenn du pünktlich gewesen wärst, hätten wir den Film nicht ___.", "verpasst", note="Sin *ge-*: *verpassen* → *verpasst*."),
        tr(1, "Si lo hubiera sabido, habría venido.", "Wenn ich das gewusst hätte, wäre ich gekommen.", ["Wenn ich das gewusst hätte, wäre ich gekommen.", "Wenn ich es gewusst hätte, wäre ich gekommen.", "Wenn ich das gewusst hätte, dann wäre ich gekommen.", "Hätte ich das gewusst, wäre ich gekommen.", "Hätte ich es gewusst, wäre ich gekommen.", "Hätte ich das gewusst, dann wäre ich gekommen.", "Ich wäre gekommen, wenn ich das gewusst hätte.", "Ich wäre gekommen, wenn ich es gewusst hätte."], "Konjunktiv II pasado en las dos partes."),
        tr(1, "¡Si hubiera estudiado más!", "Hätte ich doch mehr gelernt!", ["Hätte ich doch mehr gelernt!", "Hätte ich nur mehr gelernt!", "Hätte ich bloß mehr gelernt!", "Wenn ich doch mehr gelernt hätte!", "Wenn ich nur mehr gelernt hätte!", "Wenn ich bloß mehr gelernt hätte!", "Hätte ich doch mehr studiert!", "Wenn ich doch mehr studiert hätte!"], "Lamento: auxiliar adelante + *doch / nur / bloß*."),
        ty(1, "Escribí el lamento con *Hätte … doch*.", "Ich habe den Job nicht angenommen.", "Hätte ich den Job doch angenommen!", ["Hätte ich den Job doch angenommen!", "Hätte ich doch den Job angenommen!"], "Lo que no hiciste se lamenta en positivo: *Hätte ich … doch angenommen!*"),
        li(1, "verpasst", ["verpasst", "verfasst", "gepasst"], "*verpasst* = perdido (el tren, la oportunidad)."),
        # parte 1 — la condición sin wenn (verbo primero)
        ty(1, "Sacá el *wenn* y poné el verbo adelante.", "Wenn ich Zeit hätte, würde ich mitkommen.", "Hätte ich Zeit, würde ich mitkommen.", ["Hätte ich Zeit, würde ich mitkommen.", "Hätte ich Zeit, käme ich mit."], "Sin *wenn*, el verbo conjugado pasa al casillero 1 y ya no va al final: *Hätte ich Zeit, …*"),
        ty(1, "Sacá el *wenn* y poné el auxiliar adelante.", "Wenn wir den Bus genommen hätten, wären wir pünktlich gewesen.", "Hätten wir den Bus genommen, wären wir pünktlich gewesen.", ["Hätten wir den Bus genommen, wären wir pünktlich gewesen.", "Hätten wir den Bus genommen, dann wären wir pünktlich gewesen."], "El auxiliar (*hätten*) va primero; el participio queda al final de esa parte."),
        ch(1, "¿Qué significa?", "Wäre das Wetter besser, könnten wir grillen.", "Si el tiempo estuviera mejor, podríamos hacer un asado.", ["Si el tiempo estuviera mejor, podríamos hacer un asado.", "¿El tiempo estaba mejor? Pudimos hacer un asado.", "Como el tiempo está mejor, podemos hacer un asado."], "Verbo primero + coma + verbo = condición sin *wenn*. Konjunktiv II → irreal."),
        ch(1, "Encontrá el error.", "¿Qué oración tiene un error?", "Hätte ich mehr Geld gehabt hätte, wäre ich geblieben.", ["Hätte ich mehr Geld gehabt hätte, wäre ich geblieben.", "Hätte ich mehr Geld gehabt, wäre ich geblieben.", "Wenn ich mehr Geld gehabt hätte, wäre ich geblieben."], "O *wenn* con el auxiliar al final, o el auxiliar adelante sin *wenn*; las dos cosas juntas, no."),
        tr(1, "De haber tenido tiempo, te habría llamado.", "Hätte ich Zeit gehabt, hätte ich dich angerufen.", ["Hätte ich Zeit gehabt, hätte ich dich angerufen.", "Hätte ich Zeit gehabt, dann hätte ich dich angerufen.", "Wenn ich Zeit gehabt hätte, hätte ich dich angerufen.", "Ich hätte dich angerufen, wenn ich Zeit gehabt hätte."], "«De haber…» = auxiliar adelante sin *wenn*: *Hätte ich Zeit gehabt, …*"),
        # parte 1 — repaso: als/wenn, ob/wenn, falls
        ch(1, "Elegí el conector.", "___ ich klein war, wollte ich Pilot werden.", "Als", ["Als", "Wenn", "Wann"], "Una etapa única del pasado → *als*, aunque en castellano sea «cuando»."),
        cz(1, "Escribí *als* o *wenn*.", "Immer ___ ich bei Oma war, hat sie Kuchen gebacken.", "wenn", note="Algo que se repetía («cada vez que») → *wenn*, también en el pasado."),
        ch(1, "Elegí el conector.", "Ich frage mich, ___ ich das Richtige getan habe.", "ob", ["ob", "wenn", "falls"], "«me pregunto **si**…» es una pregunta → *ob*. *wenn* y *falls* son condiciones."),
        ch(1, "Elegí el conector.", "___ ich das gewusst hätte, wäre ich gekommen.", "Wenn", ["Wenn", "Ob", "Als"], "Condición irreal → *wenn*. *ob* solo después de verbos como *wissen, fragen*."),
        cz(1, "Escribí el conector («por si»).", "Ich nehme Geld mit, ___ das Restaurant keine Karte nimmt.", "falls", ["falls", "wenn"], "Algo que quizás pase → *falls* + indicativo, verbo al final."),
        # parte 2 — als ob
        ch(2, "Elegí la forma.", "Er tut so, als ob er alles ___.", "wüsste", ["wüsste", "gewusst", "wusste"], "*als ob* + Konjunktiv II: *wüsste* (con diéresis)."),
        ch(2, "Elegí la forma.", "Du siehst aus, als ob du müde ___.", "wärst", ["wärst", "warst", "bist gewesen"], "*als ob* + Konjunktiv II presente: *wärst*."),
        ch(2, "Transformá.", "Sie tut so, als ob sie keine Zeit hätte.", "Sie tut so, als hätte sie keine Zeit.", ["Sie tut so, als hätte sie keine Zeit.", "Sie tut so, als sie keine Zeit hätte.", "Sie tut so, als ob hätte sie keine Zeit."], "Con *als* solo, el verbo va enseguida."),
        ch(2, "¿Qué significa?", "Er spricht, als wäre er der Chef.", "Habla como si fuera el jefe.", ["Habla como si fuera el jefe.", "Habla cuando es el jefe.", "Habla porque es el jefe."], "*als* + verbo en Konjunktiv II = como si."),
        ch(2, "Elegí la forma.", "Es hört sich an, als ___ es regnen.", "würde", ["würde", "wird", "wurde"], "*als würde es regnen*: Konjunktiv II con *würde*."),
        cz(2, "Escribí la forma de *sein*.", "Er redet, als ob er der Chef ___.", "wäre", note="*als ob* + *wäre*, al final."),
        cz(2, "Escribí la forma de *haben*.", "Sie tut so, als ob sie keine Angst ___.", "hätte", note="*als ob* + *hätte*."),
        cz(2, "Escribí la forma de *können*.", "Du tust so, als ob du nicht Auto fahren ___.", "könntest", note="Konjunktiv II de *können* para *du*: *könntest*."),
        cz(2, "Escribí la palabra que falta.", "Er sieht aus, ___ wäre er krank.", "als", note="*als* + verbo enseguida = *als ob* … verbo al final."),
        cz(2, "Escribí la forma de *wissen*.", "Sie tut so, als ___ sie nichts.", "wüsste", note="*als wüsste sie nichts*: Konjunktiv II de *wissen*."),
        tr(2, "Él hace como si no me viera.", "Er tut so, als ob er mich nicht sehen würde.", ["Er tut so, als ob er mich nicht sehen würde.", "Er tut so, als würde er mich nicht sehen.", "Er tut so, als ob er mich nicht sähe.", "Er tut so, als sähe er mich nicht."], "«hacer como si» = *so tun, als ob*."),
        tr(2, "Ella habla alemán como si fuera su lengua materna.", "Sie spricht Deutsch, als ob es ihre Muttersprache wäre.", ["Sie spricht Deutsch, als ob es ihre Muttersprache wäre.", "Sie spricht Deutsch, als wäre es ihre Muttersprache."], "«como si fuera» = *als ob … wäre* / *als wäre*."),
        tr(2, "Él hace como si fuera rico.", "Er tut so, als ob er reich wäre.", ["Er tut so, als ob er reich wäre.", "Er tut so, als wäre er reich.", "Er benimmt sich, als ob er reich wäre.", "Er benimmt sich, als wäre er reich."], "Konjunktiv II presente, aunque en castellano digas «fuera»."),
        ty(2, "Pasá a la forma corta con *als* + verbo.", "Er lacht, als ob er glücklich wäre.", "Er lacht, als wäre er glücklich.", note="*als ob … wäre* → *als wäre …*"),
        ty(2, "Escribí en alemán, con artículo.", "«la oportunidad»", "die Gelegenheit", ["die Gelegenheit", "die Chance"], "*die Gelegenheit* (también *die Chance*). " + MAY),
        # encontrá el error, dictado y repaso (semanas 14 a 28)
        fx(0, "Ich hätte früher gekommen.", "hätte", "wäre", "auxiliar", "*kommen* hace el Perfekt con *sein* (*ich bin gekommen*), así que el irreal también: *ich wäre gekommen*. El castellano dice «habría» para todo; el alemán copia el auxiliar del Perfekt."),
        fx(1, "Wenn ich mehr gelernt hätte, ich hätte die Prüfung bestanden.", "ich hätte die", "hätte ich die", "orden", "La subordinada con *wenn* ocupa la posición 1: después de la coma va el verbo y después el sujeto: *hätte ich die Prüfung bestanden*."),
        fx(1, "Wenn ich das gewusst hatte, wäre ich nicht gegangen.", "hatte", "hätte", "Konjunktiv", "Para el irreal hace falta *hätte*, con ä. *hatte* es el indicativo («lo había sabido»): la oración pasaría a decir que sí lo sabías."),
        di(1, "Ich hätte dir gern bei der Arbeit geholfen.", note="*dir*: dativo, porque *helfen* pide dativo. *bei der Arbeit*: dativo femenino. Y *hätte*, con ä."),
        di(2, "Er tut so, als ob er keinen Hunger hätte.", ["Er tut so als ob er keinen Hunger hätte."], "*keinen Hunger*: masculino en acusativo, con -en. *hätte* con ä, al final."),
        ty(1, "Escribí dos lamentos sobre tu pasado, uno con *hätte* y otro con *wäre*.", "(no aprendí alemán antes · no me fui a vivir a Berlín)", "Hätte ich doch früher Deutsch gelernt! Wäre ich doch nach Berlin gezogen!", _mix(["Hätte ich doch früher Deutsch gelernt!", "Hätte ich nur früher Deutsch gelernt!", "Wenn ich doch früher Deutsch gelernt hätte!", "Wenn ich nur früher Deutsch gelernt hätte!"], ["Wäre ich doch nach Berlin gezogen!", "Wäre ich nur nach Berlin gezogen!", "Wenn ich doch nach Berlin gezogen wäre!", "Wenn ich nur nach Berlin gezogen wäre!"]), "*lernen* va con *haben* → *hätte … gelernt*; *ziehen* (mudarse) con *sein* → *wäre … gezogen*. Con *doch* o *nur*, el verbo adelante, como en una pregunta."),
        cz(2, "Escribí el artículo.", "Ich habe den Schlüssel auf ___ Tisch gelegt. (der Tisch)", "den", note="Repaso de la semana 14: *legen* es poner, hay movimiento → *auf* + acusativo: *auf den Tisch*. Si ya está ahí, *liegen* + dativo: *auf dem Tisch*."),
        cz(2, "Escribí el adjetivo con su terminación.", "Wir haben mit einem ___ Mann gesprochen. (mutig)", "mutigen", note="Repaso de la semana 19: *mit* pide dativo; después de *einem*, el adjetivo va con *-en*: *mit einem mutigen Mann*."),
        tr(2, "Ahorro para poder viajar.", "Ich spare, um reisen zu können.", _mix(["Ich spare, um reisen zu können.", "Ich spare Geld, um reisen zu können.", "Ich spare, damit ich reisen kann.", "Ich spare Geld, damit ich reisen kann."]), "Repaso de la semana 23: «para» + infinitivo, con el mismo sujeto → *um … zu*, y el modal queda último: *reisen zu können*."),
        cz(2, "Escribí el auxiliar.", "Als wir ankamen, ___ der Zug schon abgefahren.", "war", note="Repaso de la semana 28: lo que pasó antes va en Plusquamperfekt; *abfahren* es moverse → *sein*: *war … abgefahren*."),
    ],
}
