# -*- coding: utf-8 -*-
"""Semana 27 — Es wird gemacht (B1): la voz pasiva (werden + participio) en presente y Präteritum."""
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
    "week": 27,
    "title": "Es wird gemacht",
    "level": "B1",
    "focus": "La voz pasiva: contar qué se hace y qué se hizo, sin importar tanto quién.",
    "fare": "Explicar cómo se recicla, describir un proceso paso a paso y hablar del medio ambiente.",
    "tema": "Vorgangspassiv en presente y Präteritum, von / durch, pasiva sin sujeto; medio ambiente, reciclaje, procesos",
    "keys": [
        "Pasiva = *werden* + participio al final: *Der Müll wird getrennt*.",
        "El acusativo de la activa pasa a sujeto: *den Müll* → *der Müll*.",
        "Pasado: *wurde* + participio: *Die Fabrik wurde 1960 gebaut*.",
        "*von* + dativo = quién lo hace; *durch* + acusativo = medio o causa.",
        "Sin sujeto: *Hier wird nicht geraucht* (acá no se fuma).",
        "*wurde* (se hizo) no es *würde* (haría).",
    ],
    "lesson": {
        "intro": "Hasta ahora siempre dijiste quién hace qué. La pasiva da vuelta el foco: importa lo que se hace —se separa la basura, se recicla el vidrio, se construyó una fábrica— y quién lo hace pasa a segundo plano o desaparece. Es la voz de las noticias, los manuales y los procesos.",
        "parts": [
            {"h": "La pasiva con werden", "blocks": [0, 1, 2]},
            {"h": "En pasado y con agente", "blocks": [3, 4, 5]},
            {"h": "Se fuma, se recicla: procesos", "blocks": [6, 7, 8]},
        ],
        "blocks": [
            {
                "h": "werden + participio",
                "r": "La pasiva pone adelante **lo que se hace**, no quién lo hace. Se arma con ***werden* conjugado** + **participio II** al final (el mismo del Perfekt). En castellano decimos «se separa la basura» o «la basura es separada»; en alemán: *Der Müll **wird** getrennt*.",
                "table": {"head": ["Persona", "werden", "Ejemplo"], "rows": [
                    ["ich", "werde", "Ich werde oft gefragt."],
                    ["du", "wirst", "Du wirst abgeholt."],
                    ["er, sie, es", "wird", "Das Glas wird gesammelt."],
                    ["wir", "werden", "Wir werden eingeladen."],
                    ["ihr", "werdet", "Ihr werdet gerufen."],
                    ["sie, Sie", "werden", "Die Flaschen werden gewaschen."],
                ]},
                "ex": [
                    ["Der Müll *wird* jeden Montag *abgeholt*.", "La basura se retira todos los lunes."],
                    ["Hier *wird* Papier *recycelt*.", "Acá se recicla papel."],
                    ["Die Flaschen *werden* zuerst *gewaschen*.", "Primero se lavan las botellas."],
                ],
                "warn": "*werden* ya lo conocés como futuro (*Ich werde lernen*) y como «ponerse, volverse» (*Es wird kalt*). Fijate qué lo acompaña: con **infinitivo** es futuro; con **participio**, pasiva. *Ich werde fragen* (voy a preguntar) ≠ *Ich werde gefragt* (me preguntan).",
                "tip": "El participio va al final, como en el Perfekt: es el mismo corchete verbal de siempre.",
                "q": [
                    q("Completá: *Die Flaschen ___ gesammelt.*", "werden", ["werden", "wird", "wirst"]),
                    q("¿Qué significa *Ich werde gefragt*?", "Me preguntan.", ["Me preguntan.", "Voy a preguntar.", "Pregunté."]),
                ],
            },
            {
                "h": "De la activa a la pasiva",
                "r": "El **acusativo** de la oración activa pasa a ser el **sujeto** (nominativo) de la pasiva, y *werden* concuerda con él. El sujeto de la activa (*man, die Stadt*…) desaparece, o se nombra con *von* (lo ves en la parte 2).",
                "table": {"head": ["Activa", "Pasiva"], "rows": [
                    ["Man trennt *den* Müll.", "*Der* Müll wird getrennt."],
                    ["Man sammelt *die* Flaschen.", "*Die* Flaschen werden gesammelt."],
                    ["Die Stadt baut *einen* Park.", "*Ein* Park wird gebaut."],
                    ["Man verbraucht viel Energie.", "Viel Energie wird verbraucht."],
                ]},
                "warn": "*den Müll* pasa a ***der** Müll*: el artículo cambia porque ya no es objeto sino sujeto. *Den Müll wird getrennt* está mal.",
                "more": [
                    "Solo el acusativo se vuelve sujeto. Un dativo sigue siendo dativo y *werden* queda en singular: *Man hilft mir* → *Mir wird geholfen* (me ayudan).",
                    "*man* + activa y la pasiva dicen casi lo mismo: *Man trennt den Müll* = *Der Müll wird getrennt*. La pasiva suena más a texto escrito.",
                ],
                "q": [
                    q("Pasá a pasiva: *Man baut eine Schule.*", "Eine Schule wird gebaut.", ["Eine Schule wird gebaut.", "Einer Schule wird gebaut.", "Eine Schule werden gebaut."]),
                    q("Pasá a pasiva: *Man sammelt die Batterien.*", "Die Batterien werden gesammelt.", ["Die Batterien werden gesammelt.", "Die Batterien wird gesammelt.", "Die Batterien werden sammeln."]),
                ],
            },
            {
                "h": "La pasiva en la subordinada",
                "r": "Con *dass, weil, wenn*… el verbo conjugado va al **final**: primero el participio y después *werden*: *…, weil der Müll getrennt **wird***.",
                "ex": [
                    ["Ich weiß, dass hier Glas *recycelt wird*.", "Sé que acá se recicla vidrio."],
                    ["Das ist wichtig, weil zu viel Plastik *verbraucht wird*.", "Es importante porque se consume demasiado plástico."],
                    ["Weißt du, wann der Müll *abgeholt wird*?", "¿Sabés cuándo pasan a buscar la basura?"],
                ],
                "warn": "El orden es participio + *werden*, nunca al revés: *…, dass der Müll getrennt wird*, no *…, dass der Müll wird getrennt*.",
                "tip": "Es la regla de la semana 18: en la subordinada, el verbo conjugado cierra la oración. La pasiva no cambia nada.",
                "q": [
                    q("Completá: *Ich glaube, dass das Papier ___.*", "recycelt wird", ["recycelt wird", "wird recycelt", "recycelt werden"]),
                    q("Completá: *Er ärgert sich, weil die Tonnen nicht ___.*", "geleert werden", ["geleert werden", "werden geleert", "geleert wird"]),
                ],
            },
            {
                "h": "En pasado: wurde + participio",
                "r": "Para contar qué **se hizo**, sobre todo por escrito, se usa el **Präteritum de *werden***: ***wurde*** + participio. *Die Fabrik wurde 1960 gebaut* = la fábrica se construyó (fue construida) en 1960.",
                "table": {"head": ["Persona", "werden (Präteritum)"], "rows": [
                    ["ich", "wurde"],
                    ["du", "wurdest"],
                    ["er, sie, es", "wurde"],
                    ["wir", "wurden"],
                    ["ihr", "wurdet"],
                    ["sie, Sie", "wurden"],
                ]},
                "ex": [
                    ["Die Fabrik *wurde* 1960 *gebaut*.", "La fábrica se construyó en 1960."],
                    ["Früher *wurde* der Müll nicht *getrennt*.", "Antes no se separaba la basura."],
                    ["Die ersten Windräder *wurden* hier vor 30 Jahren *aufgestellt*.", "Los primeros molinos de viento se instalaron acá hace 30 años."],
                ],
                "warn": "*wurde* (se hizo, fue) y *würde* (haría, semana 25) se distinguen solo por la diéresis, y cambian todo: *Das Haus wurde verkauft* = la casa se vendió; *Ich würde das Haus verkaufen* = yo vendería la casa.",
                "tip": "*ich wurde* y *er wurde* son iguales, sin -t, como *ich war / er war*.",
                "q": [
                    q("Completá: *Die Flaschen ___ gestern abgeholt.*", "wurden", ["wurden", "wurde", "würden"]),
                    q("*Das Haus wurde verkauft* significa…", "La casa se vendió.", ["La casa se vendió.", "La casa se vendería.", "La casa se va a vender."]),
                ],
            },
            {
                "h": "¿Por quién? von + dativo",
                "r": "Si querés decir **quién** hace la acción —una persona, una institución—, usás ***von* + dativo**: *von der Stadt, vom (= von dem) Hausmeister, von den Nachbarn*. Es nuestro «por»: «fue organizado por los vecinos».",
                "ex": [
                    ["Das Projekt wird *von der* Stadt finanziert.", "El proyecto es financiado por la ciudad."],
                    ["Die Tonnen werden *vom* Hausmeister an die Straße gestellt.", "El encargado saca los tachos a la calle."],
                    ["Der Park wurde *von den* Nachbarn gereinigt.", "El parque fue limpiado por los vecinos."],
                ],
                "warn": "El «por» de la pasiva no es *für*: *für* es «para». *Das Projekt wird für die Stadt finanziert* sería «para la ciudad».",
                "tip": "Casi siempre el agente se calla: si no importa o es obvio, la pasiva va sin *von*. Por eso es tan común en noticias e instrucciones.",
                "q": [
                    q("Completá: *Das Fest wird ___ den Schülern organisiert.*", "von", ["von", "für", "mit"]),
                    q("Completá: *Der Bericht wurde von ___ Chefin geschrieben.*", "der", ["der", "die", "den"]),
                ],
            },
            {
                "h": "¿A través de qué? durch + acusativo",
                "r": "Con ***durch* + acusativo** nombrás el **medio o la causa**: algo que no actúa por voluntad propia (un fenómeno, un proceso, un intermediario): *durch den Sturm, durch das Abwasser, durch den Verkehr*.",
                "table": {"head": ["von + dativo", "durch + acusativo"], "rows": [
                    ["quién actúa (persona, institución)", "medio, causa, intermediario"],
                    ["*von der Regierung* beschlossen", "*durch ein neues Gesetz* geregelt"],
                    ["*von den Bauern* gepflanzt", "*durch den Sturm* zerstört"],
                ]},
                "ex": [
                    ["Der Fluss wird *durch das Abwasser* verschmutzt.", "El río es contaminado por las aguas residuales."],
                    ["Viele Bäume wurden *durch den Sturm* zerstört.", "Muchos árboles fueron destruidos por la tormenta."],
                    ["Die Luft wird *durch den Verkehr* belastet.", "El aire se contamina por el tránsito."],
                ],
                "warn": "*durch* pide **acusativo**: *durch **den** Sturm*, no *durch dem Sturm*. Y *von* pide **dativo**: *von **dem** (vom) Hausmeister*.",
                "more": ["Con fuerzas de la naturaleza también vas a oír *von*: *vom Sturm zerstört*. Con un medio o una causa, *durch* es la opción segura."],
                "q": [
                    q("Completá: *Das Meer wird ___ Plastik verschmutzt.*", "durch", ["durch", "von", "für"]),
                    q("Completá: *Die Stadt wurde durch ___ Hochwasser zerstört.*", "das", ["das", "dem", "des"]),
                ],
            },
            {
                "h": "Pasiva sin sujeto: Hier wird geraucht",
                "r": "Con verbos sin acusativo (*rauchen, tanzen, arbeiten, feiern, lachen*…) podés armar una pasiva **sin sujeto**: solo importa que la acción **ocurre**. El verbo va en **3.ª persona singular** (*wird, wurde*). Si nada ocupa el casillero 1, entra un ***es*** de relleno, que desaparece cuando otra cosa va adelante.",
                "ex": [
                    ["Hier *wird* nicht *geraucht*.", "Acá no se fuma."],
                    ["Am Sonntag *wird* nicht *gearbeitet*.", "El domingo no se trabaja."],
                    ["*Es wird* getanzt und gelacht.", "Se baila y se ríe."],
                    ["Gestern *wurde* lange *gefeiert*.", "Ayer se festejó hasta tarde."],
                ],
                "warn": "El *es* de relleno solo vive en el casillero 1: *Es wird hier getanzt*, pero *Hier wird getanzt*. *Hier wird es getanzt* está mal.",
                "more": ["Si hay un sujeto de verdad, el verbo concuerda con él aunque adelante esté el *es*: *Es **werden** zu viele Flaschen weggeworfen* (se tiran demasiadas botellas)."],
                "tip": "Es nuestro «se» impersonal: se fuma, se trabaja, se baila. También podés decirlo con *man*: *Hier raucht man nicht*.",
                "q": [
                    q("Completá: *Am Wochenende ___ nicht gearbeitet.*", "wird", ["wird", "werden", "wirst"]),
                    q("¿Qué oración es correcta?", "Hier wird viel gelacht.", ["Hier wird viel gelacht.", "Hier es wird viel gelacht.", "Hier wird es viel gelacht."]),
                ],
            },
            {
                "h": "Describir un proceso",
                "r": "Para explicar **cómo se hace** algo (reciclar, fabricar, reparar), la fórmula de manual es pasiva + conectores de orden: *zuerst, dann, danach, anschließend, zum Schluss*. Después del conector, el verbo va **segundo**.",
                "table": {"head": ["Paso", "Cómo se recicla el vidrio"], "rows": [
                    ["1. zuerst", "Zuerst wird das Glas gesammelt."],
                    ["2. dann", "Dann wird es nach Farben sortiert."],
                    ["3. danach", "Danach wird es gereinigt und zerkleinert."],
                    ["4. anschließend", "Anschließend wird es geschmolzen."],
                    ["5. zum Schluss", "Zum Schluss werden neue Flaschen hergestellt."],
                ]},
                "ex": [
                    ["*Zuerst werden* die Flaschen *gewaschen*.", "Primero se lavan las botellas."],
                    ["*Danach wird* das Papier *getrocknet*.", "Después se seca el papel."],
                ],
                "warn": "*Dann wird es sortiert*, no *Dann es wird sortiert*: el conector ocupa el casillero 1 y el verbo va segundo.",
                "tip": "El *es* de *Dann wird es sortiert* no es de relleno: reemplaza a *das Glas*, es un sujeto de verdad.",
                "q": [
                    q("Completá: *Zuerst ___ das Glas gesammelt.*", "wird", ["wird", "werden", "wirst"]),
                    q("¿Qué orden es correcto?", "Dann wird es geschmolzen.", ["Dann wird es geschmolzen.", "Dann es wird geschmolzen.", "Dann es geschmolzen wird."]),
                ],
            },
            {
                "h": "lassen: mandar a hacer y dejar",
                "r": "*lassen* (*du lässt, er lässt*; Präteritum *ließ*) tiene dos usos frecuentes. Con **otro verbo en infinitivo** al final, como un modal: (1) **hacer que otro lo haga**: *Ich lasse das Auto reparieren* = llevo el auto a arreglar; (2) **dejar, permitir**: *Lass mich das machen!* = dejame hacerlo a mí. **Sin otro verbo**, es **dejar algo en un lugar**: *Ich lasse den Schirm im Auto*. En el Perfekt: con otro verbo, **doble infinitivo** (*habe … reparieren lassen*); sin otro verbo, **participio** (*habe … gelassen*).",
                "table": {"head": ["Alemán", "Castellano", "Uso"], "rows": [
                    ["Ich lasse das Auto reparieren.", "Llevo el auto a arreglar.", "mandar a hacer"],
                    ["Ich lasse mir die Haare schneiden.", "Me corto el pelo (en la peluquería).", "mandar a hacer (a mí)"],
                    ["Lass mich das machen!", "¡Dejame hacerlo a mí!", "dejar, permitir"],
                    ["Ich habe die Jacke im Auto gelassen.", "Dejé la campera en el auto.", "dejar en un lugar"],
                    ["Ich habe das Auto reparieren lassen.", "Mandé a arreglar el auto.", "Perfekt con otro verbo"],
                ]},
                "ex": [
                    ["Wir *lassen* die Wohnung streichen.", "Mandamos a pintar el departamento."],
                    ["Meine Eltern *ließen* mich nie allein ausgehen.", "Mis viejos nunca me dejaban salir solo."],
                    ["*Lass* mich in Ruhe!", "¡Dejame en paz!"],
                    ["Wo hast du den Schlüssel *gelassen*?", "¿Dónde dejaste la llave?"],
                ],
                "warn": "«Me corté el pelo» en castellano no dice si fuiste a la peluquería. En alemán sí: *Ich habe mir die Haare geschnitten* = me lo corté yo mismo (con tijera, en casa). Si te lo cortó otro: *Ich habe mir die Haare schneiden lassen*. Lo mismo con «me arreglé el auto», «me hice un tatuaje», etc.",
                "tip": "Pensá en la pasiva: *Das Auto wird repariert* (alguien lo arregla). Con *lassen* decís, además, que **vos** lo encargaste: *Ich lasse das Auto reparieren*.",
                "q": [
                    q("*Ich lasse meinen Computer reparieren* significa…", "Llevo la computadora a arreglar.", ["Llevo la computadora a arreglar.", "Arreglo mi computadora yo mismo.", "Dejo de arreglar la computadora."]),
                    q("Completá: *Ich habe meine Brille zu Hause ___.*", "gelassen", ["gelassen", "lassen", "gelasst"]),
                    q("Completá: *Wir haben das Dach reparieren ___.*", "lassen", ["lassen", "gelassen", "lässt"]),
                ],
            },
        ],
    },
    "vocab": [
        ["die Umwelt", "el medio ambiente", "Die Umwelt wird durch Abgase belastet."],
        ["der Müll", "la basura", "Der Müll wird jeden Dienstag abgeholt."],
        ["die Mülltonne", "el tacho de basura", "Die gelbe Mülltonne ist für Verpackungen."],
        ["trennen", "separar", "In Deutschland wird der Müll getrennt."],
        ["recyceln", "reciclar", "Altpapier wird recycelt."],
        ["das Altpapier", "el papel usado (para reciclar)", "Das Altpapier kommt in die blaue Tonne."],
        ["die Verpackung", "el envase, el embalaje", "Die Verpackung ist aus Plastik."],
        ["das Pfand", "el depósito que te devuelven por el envase", "Auf diese Flasche gibt es 25 Cent Pfand."],
        ["verschmutzen", "contaminar, ensuciar", "Das Meer wird durch Plastik verschmutzt."],
        ["der Klimawandel", "el cambio climático", "Der Klimawandel wurde lange unterschätzt."],
        ["schützen", "proteger", "Dieser Wald wird besonders geschützt."],
        ["herstellen", "fabricar, producir", "Diese Taschen werden aus alten Flaschen hergestellt."],
        ["erneuerbar", "renovable", "Wind und Sonne sind erneuerbare Energien."],
        ["verbrauchen", "consumir, gastar", "Es wird zu viel Wasser verbraucht."],
        ["der Rohstoff", "la materia prima", "Holz ist ein wichtiger Rohstoff."],
    ],
    "items": [
        # parte 0 — werden + participio, activa → pasiva, subordinada
        ch(0, "Elegí la forma de *werden*.", "Der Müll ___ getrennt.", "wird", ["wird", "werden", "wirst"], "Sujeto *der Müll* (= er) → *wird*."),
        ch(0, "Elegí la forma de *werden*.", "Die Flaschen ___ gesammelt.", "werden", ["werden", "wird", "worden"], "Sujeto plural → *werden*."),
        ch(0, "Elegí el participio.", "Das Papier wird ___.", "recycelt", ["recycelt", "recyceln", "recycelte"], "Pasiva = *werden* + participio: *recycelt*."),
        ch(0, "¿Cuál dice «se clasifica el vidrio»?", "(se clasifica el vidrio)", "Das Glas wird sortiert.", ["Das Glas wird sortiert.", "Das Glas sortiert sich.", "Das Glas ist sortiert."], "Proceso = *werden* + participio. *sortiert sich* calca el «se» castellano; *ist sortiert* es el estado (ya está clasificado)."),
        ch(0, "Pasá a pasiva.", "Man trennt den Müll.", "Der Müll wird getrennt.", ["Der Müll wird getrennt.", "Den Müll wird getrennt.", "Der Müll wird trennen."], "El acusativo *den Müll* pasa a sujeto: *der Müll*."),
        ch(0, "Elegí el final correcto.", "Ich weiß, dass hier Papier ___.", "recycelt wird", ["recycelt wird", "wird recycelt", "recycelt werden"], "En la subordinada: participio + *wird* al final."),
        cz(0, "Escribí la forma de *werden* en presente.", "Wie ___ Strom aus Wind erzeugt?", "wird", note="Sujeto *Strom* (singular) → *wird*."),
        cz(0, "Escribí el participio de *trennen*.", "In Deutschland wird der Müll ___.", "getrennt", note="*trennen* → *getrennt*."),
        cz(0, "Escribí el participio de *herstellen*.", "Diese Taschen werden aus Plastikflaschen ___.", "hergestellt", note="Verbo separable: el *ge-* va en el medio: *her-ge-stellt*."),
        cz(0, "Escribí la forma de *werden* en presente.", "Hier ___ alte Batterien gesammelt.", "werden", note="Sujeto *alte Batterien*, plural → *werden*."),
        cz(0, "Escribí el participio de *schützen*.", "Die Tiere werden in diesem Park ___.", "geschützt", note="*schützen* → *geschützt*."),
        tr(0, "La basura se separa.", "Der Müll wird getrennt.", ["Der Müll wird getrennt.", "Der Abfall wird getrennt."], "«se» + verbo = pasiva con *werden*."),
        tr(0, "Acá se recicla vidrio.", "Hier wird Glas recycelt.", ["Hier wird Glas recycelt.", "Glas wird hier recycelt.", "Hier wird Altglas recycelt.", "Altglas wird hier recycelt.", "Hier recycelt man Glas."], "*Hier* adelante, *wird* segundo, participio al final."),
        ty(0, "Pasá a pasiva.", "Man schützt die Umwelt.", "Die Umwelt wird geschützt.", note="*die Umwelt* (acusativo femenino) pasa a sujeto: no cambia la forma, pero el verbo es *wird*."),
        li(0, "getrennt", ["getrennt", "gerannt", "gekannt"], "*getrennt* = separado, de *trennen*."),
        ch(0, "¿Qué hace *werden* acá?", "Mein Bruder wird Arzt.", "Verbo solo: «llegar a ser».", ["Verbo solo: «llegar a ser».", "Futuro: «va a ...».", "Pasiva: «es ...-do»."], "Sin otro verbo, *werden* es ponerse / llegar a ser: mi hermano va a ser médico (se está recibiendo)."),
        ch(0, "¿Qué hace *werden* acá?", "Der Arzt wird morgen kommen.", "Futuro: «va a ...».", ["Futuro: «va a ...».", "Pasiva: «es ...-do».", "Verbo solo: «llegar a ser»."], "*werden* + **infinitivo** (*kommen*) = Futur I: el médico va a venir mañana."),
        ch(0, "¿Qué hace *werden* acá?", "Der Patient wird morgen operiert.", "Pasiva: «es ...-do».", ["Pasiva: «es ...-do».", "Futuro: «va a ...».", "Verbo solo: «llegar a ser»."], "*werden* + **participio** (*operiert*) = pasiva: al paciente lo operan mañana. Fijate en la forma del final: infinitivo o participio."),
        ch(0, "¿Qué significa?", "Das Haus wird verkauft.", "La casa se vende / la están vendiendo.", ["La casa se vende / la están vendiendo.", "La casa va a vender.", "La casa se va a convertir en venta."], "*wird* + participio (*verkauft*) = pasiva. «La casa va a vender» sería futuro activo, y no tiene sentido: la casa no vende nada."),
        # parte 1 — wurde, von, durch
        ch(1, "Elegí la forma correcta.", "Die Fabrik ___ 1960 gebaut.", "wurde", ["wurde", "wird", "würde"], "Hecho pasado: *wurde* + participio."),
        ch(1, "Elegí la forma correcta.", "Die Fenster ___ gestern geputzt.", "wurden", ["wurden", "wurde", "worden"], "*die Fenster* es plural → *wurden*."),
        ch(1, "Elegí la preposición.", "Das Projekt wird ___ der Stadt finanziert.", "von", ["von", "durch", "für"], "Quién actúa (una institución): *von* + dativo."),
        ch(1, "Elegí la preposición.", "Der Fluss wurde ___ das Abwasser verschmutzt.", "durch", ["durch", "von", "mit"], "Causa no personal, y fijate el acusativo *das*: *durch*."),
        ch(1, "Elegí el artículo.", "Das Paket wurde von ___ Nachbarin gebracht.", "der", ["der", "die", "den"], "*von* + dativo: *von der Nachbarin*."),
        ch(1, "Elegí el artículo.", "Die Stadt wurde durch ___ Regen überschwemmt.", "den", ["den", "dem", "des"], "*durch* + acusativo: *den Regen*."),
        cz(1, "Escribí *werden* en Präteritum.", "Früher ___ der Müll nicht getrennt.", "wurde", note="Singular en pasado: *wurde*."),
        cz(1, "Escribí *werden* en Präteritum.", "Die ersten Pfandflaschen ___ schon vor vielen Jahren eingeführt.", "wurden", note="Plural en pasado: *wurden*."),
        cz(1, "Escribí *von* o *durch*.", "Das Gesetz wurde ___ der Regierung beschlossen.", "von", note="La que actúa es una institución: *von* + dativo."),
        cz(1, "Escribí *von* o *durch*.", "Das Meer wird ___ Plastik verschmutzt.", "durch", note="El plástico no actúa: es la causa → *durch*."),
        cz(1, "Escribí la contracción de *von dem*.", "Die Tonnen werden ___ Hausmeister an die Straße gestellt.", "vom", ["vom", "von dem"], "*von dem* → *vom*."),
        tr(1, "La fábrica fue construida en 1990.", "Die Fabrik wurde 1990 gebaut.", ["Die Fabrik wurde 1990 gebaut.", "1990 wurde die Fabrik gebaut.", "Die Fabrik wurde im Jahr 1990 gebaut.", "Im Jahr 1990 wurde die Fabrik gebaut."], "Año solo, sin preposición (o *im Jahr 1990*)."),
        tr(1, "El parque fue limpiado por los vecinos.", "Der Park wurde von den Nachbarn gereinigt.", ["Der Park wurde von den Nachbarn gereinigt.", "Der Park wurde von den Nachbarn sauber gemacht.", "Der Park wurde von den Nachbarn saubergemacht."], "«por» + persona = *von* + dativo plural (*den Nachbarn*)."),
        ty(1, "Pasá al Präteritum.", "Der Müll wird abgeholt.", "Der Müll wurde abgeholt.", note="*wird* → *wurde*; el participio no cambia."),
        li(1, "wurde", ["wurde", "würde", "wurden"], "*wurde* (pasado) suena con *u*; *würde* (condicional) con *ü*."),
        # parte 2 — pasiva sin sujeto y procesos
        ch(2, "Elegí la forma correcta.", "Hier ___ nicht geraucht.", "wird", ["wird", "werden", "wirst"], "Pasiva sin sujeto: siempre 3.ª persona singular."),
        ch(2, "¿Qué oración es correcta?", "(Acá no se fuma.)", "Hier wird nicht geraucht.", ["Hier wird nicht geraucht.", "Hier es wird nicht geraucht.", "Es hier wird nicht geraucht."], "El *es* de relleno solo va si el casillero 1 está vacío."),
        ch(2, "Elegí la forma correcta.", "Am Sonntag ___ in vielen Läden nicht gearbeitet.", "wird", ["wird", "werden", "wurden"], "Sin sujeto y en presente: *wird*."),
        ch(2, "Elegí la forma correcta.", "Zuerst wird das Glas gesammelt, dann ___ es nach Farben sortiert.", "wird", ["wird", "werden", "wirst"], "*es* (= das Glas) → *wird*, y el verbo segundo después de *dann*."),
        ch(2, "Elegí el participio.", "Das Altpapier wird ___ und dann zu neuem Papier verarbeitet.", "gesammelt", ["gesammelt", "sammeln", "sammelt"], "Dos participios unidos por *und*, con un solo *wird*."),
        cz(2, "Escribí la forma de *werden* en presente.", "Es ___ viel zu viel Plastik verbraucht.", "wird", note="El sujeto es *Plastik* (singular); *es* solo rellena el casillero 1."),
        cz(2, "Escribí el participio de *schmelzen*.", "Danach wird das Glas ___.", "geschmolzen", note="Irregular: *schmelzen* → *geschmolzen*."),
        cz(2, "Escribí el participio de *waschen*.", "Die Flaschen werden zuerst ___.", "gewaschen", note="Irregular: *waschen* → *gewaschen*."),
        cz(2, "Escribí la forma de *werden* en presente.", "Zum Schluss ___ neue Flaschen hergestellt.", "werden", note="Sujeto *neue Flaschen*, plural → *werden*."),
        cz(2, "Escribí la forma de *werden*.", "In der Kantine ___ seit Montag kein Plastikgeschirr mehr benutzt.", "wird", note="Sujeto *kein Plastikgeschirr* (singular) → *wird*."),
        tr(2, "Acá no se fuma.", "Hier wird nicht geraucht.", ["Hier wird nicht geraucht.", "Es wird hier nicht geraucht.", "Hier raucht man nicht."], "Pasiva sin sujeto; con *Es* adelante, *Es wird hier nicht geraucht*."),
        tr(2, "Primero se lavan las botellas.", "Zuerst werden die Flaschen gewaschen.", ["Zuerst werden die Flaschen gewaschen.", "Die Flaschen werden zuerst gewaschen.", "Zuerst wäscht man die Flaschen."], "*werden* (plural) segundo, participio al final."),
        tr(2, "En la fiesta se baila.", "Auf der Party wird getanzt.", ["Auf der Party wird getanzt.", "Es wird auf der Party getanzt.", "Auf dem Fest wird getanzt.", "Es wird auf dem Fest getanzt.", "Auf der Party tanzt man.", "Auf dem Fest tanzt man."], "*tanzen* no tiene acusativo: pasiva sin sujeto con *wird*."),
        ty(2, "Pasá a pasiva.", "Man produziert hier Strom.", "Hier wird Strom produziert.", ["Hier wird Strom produziert.", "Strom wird hier produziert.", "Es wird hier Strom produziert."], "*Strom* pasa a sujeto; *wird* segundo, *produziert* al final."),
        ty(2, "Escribí en alemán, con artículo.", "«el medio ambiente»", "die Umwelt", note="*die Umwelt*: «el mundo de alrededor». " + MAY),
        # parte 2 — lassen
        ch(2, "Elegí la forma.", "Ich habe mein Handy im Büro ___.", "gelassen", ["gelassen", "lassen", "gelasst"], "Sin otro verbo, *lassen* = dejar en un lugar, y en el Perfekt va el participio: *gelassen*."),
        ch(2, "Elegí la forma.", "Ich habe mein Handy reparieren ___.", "lassen", ["lassen", "gelassen", "gelasst"], "Con otro verbo (*reparieren*), doble infinitivo, como los modales: *reparieren lassen*."),
        ch(2, "¿Qué significa?", "Ich habe mir die Haare geschnitten.", "Me corté el pelo yo mismo.", ["Me corté el pelo yo mismo.", "Fui a la peluquería a cortarme el pelo.", "Dejé que me crezca el pelo."], "Sin *lassen*, lo hiciste vos. Si fue el peluquero: *Ich habe mir die Haare schneiden lassen*."),
        tr(2, "Me corté el pelo. (en la peluquería)", "Ich habe mir die Haare schneiden lassen.", ["Ich habe mir die Haare schneiden lassen.", "Ich ließ mir die Haare schneiden."], "Lo hizo otro: *lassen* + infinitivo, y en Perfekt doble infinitivo (*schneiden lassen*, nunca «gelassen»). «Ich habe mir die Haare geschnitten» diría que te lo cortaste solo."),
        tr(2, "Mandamos a arreglar el auto.", "Wir haben das Auto reparieren lassen.", ["Wir haben das Auto reparieren lassen.", "Wir ließen das Auto reparieren.", "Wir lassen das Auto reparieren."], "*lassen* + infinitivo = hacer que otro lo haga. Perfekt: *haben … reparieren lassen*."),
        tr(2, "¡Dejame en paz! (a un amigo)", "Lass mich in Ruhe!", ["Lass mich in Ruhe!", "Lass mich bitte in Ruhe!"], "*lassen* = dejar. Imperativo con *du*: *du lässt → Lass!* (el *a → ä* se va, como en *Fahr!*)."),
        cz(2, "Escribí la forma de *lassen* en Präteritum.", "Meine Eltern ___ mich nie allein ausgehen.", "ließen", note="*lassen* = dejar, permitir. Präteritum irregular: *ließ*, *sie ließen*."),
        ty(2, "Escribí en alemán.", "«Dejé la campera en el auto.»", "Ich habe die Jacke im Auto gelassen.", ["Ich habe die Jacke im Auto gelassen.", "Ich habe meine Jacke im Auto gelassen.", "Ich ließ die Jacke im Auto.", "Ich ließ meine Jacke im Auto.", "Ich habe die Jacke im Auto liegen lassen.", "Ich habe meine Jacke im Auto liegen lassen."], "Sin otro verbo: participio *gelassen*. También se dice *im Auto liegen lassen*: ahí hay otro verbo (*liegen*), así que doble infinitivo."),
        # encontrá el error, dictado y repaso (semanas 9 a 16)
        fx(0, "In Deutschland trennt sich der Müll.", "trennt sich der Müll", "wird der Müll getrennt", "calco", "El «se» de «se separa» no es *sich*: si alguien lo hace, es pasiva: *wird … getrennt*. *trennt sich* diría que la basura se separa sola."),
        fx(1, "Das Haus wurde durch meinen Großvater gebaut.", "durch meinen Großvater", "von meinem Großvater", "preposición", "La persona que hace la acción va con *von* + dativo: *von meinem Großvater*. *durch* (con acusativo) es para la causa o el medio. El «por» castellano sirve para los dos; el alemán los separa."),
        fx(1, "Die Brücke würde 1960 gebaut.", "würde", "wurde", "auxiliar", "Un hecho pasado en pasiva va con *wurde*, sin diéresis. *würde* es el condicional («sería, haría»): la ü cambia todo el sentido."),
        di(1, "Der Brief wurde von meiner Mutter geschrieben.", note="*von* + dativo: *meiner Mutter*, con -er. Y *wurde*, con u: pasiva en pasado."),
        di(2, "Zuerst werden die Flaschen mit heißem Wasser gewaschen.", note="*mit* + dativo sin artículo: *heißem Wasser*, con -em. *werden* en plural, por *die Flaschen*."),
        ty(2, "Contá en dos oraciones cómo se reciclan las botellas, con la pasiva (*werden* + participio).", "(primero se juntan las botellas · después se lavan)", "Zuerst werden die Flaschen gesammelt. Dann werden sie gewaschen.", _mix(["Zuerst werden die Flaschen gesammelt.", "Erst werden die Flaschen gesammelt.", "Die Flaschen werden zuerst gesammelt."], ["Dann werden sie gewaschen.", "Danach werden sie gewaschen.", "Dann werden die Flaschen gewaschen.", "Danach werden die Flaschen gewaschen.", "Anschließend werden sie gewaschen.", "Dann werden sie gespült.", "Danach werden sie gespült."]), "*werden* en plural (*die Flaschen*, *sie*) en la posición 2 y el participio al final. Si arrancás con *Zuerst* o *Dann*, el verbo va enseguida."),
        cz(2, "Escribí el pronombre (a mí).", "Im Geschäft wurde ___ sofort geholfen.", "mir", note="Repaso de la semana 13: *helfen* pide dativo, y en la pasiva el dativo no se vuelve sujeto: *mir wurde geholfen*, nunca «ich wurde geholfen»."),
        cz(2, "Escribí el artículo.", "Die Mülltonne steht hinter ___ Haus. (das Haus)", "dem", note="Repaso de la semana 14: *steht* dice dónde está, sin movimiento → *hinter* + dativo: *hinter dem Haus*."),
        tr(2, "Fuimos en tren a Berlín.", "Wir sind mit dem Zug nach Berlin gefahren.", ["Wir sind mit dem Zug nach Berlin gefahren.", "Wir fuhren mit dem Zug nach Berlin.", "Wir sind mit der Bahn nach Berlin gefahren.", "Wir fuhren mit der Bahn nach Berlin."], "Repaso de las semanas 9 y 12: *fahren* es moverse → Perfekt con *sein*. «En tren» = *mit dem Zug*, no «in dem Zug»."),
        cz(2, "Escribí *als* o *wie*.", "Glas wird öfter recycelt ___ Plastik.", "als", note="Repaso de la semana 16: después de un comparativo (*öfter*) va *als*. *wie* va con la igualdad: *so oft wie*."),
    ],
}
