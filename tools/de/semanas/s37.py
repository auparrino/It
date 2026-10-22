# -*- coding: utf-8 -*-
"""Semana 37 — Er soll reich sein (B2): los modales subjetivos para suponer y para repetir lo que dicen otros."""
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
    "week": 37,
    "title": "Er soll reich sein",
    "level": "B2",
    "focus": "Los modales que ya conocés tienen una segunda vida: sirven para decir qué tan seguro estás de algo y para repetir lo que otros afirman.",
    "fare": "Hacer hipótesis con distintos grados de certeza, contar rumores sin hacerte cargo y dudar de lo que alguien dice de sí mismo.",
    "tema": "Modales subjetivos: muss, dürfte, kann, könnte, kann nicht (suposición); soll y will (afirmación ajena); infinitivo perfecto; werden + wohl",
    "keys": [
        "Escala de certeza: *muss* (casi seguro) > *dürfte* (probable) > *kann / könnte* (posible) > *kann nicht* (imposible).",
        "*Er soll reich sein* = dicen que es rico (lo afirman otros).",
        "*Er will reich sein* = él dice que es rico (y uno duda).",
        "Para el pasado: modal + infinitivo perfecto: *Er muss es vergessen haben*.",
        "*muss nicht* = no necesariamente; lo imposible es *kann nicht*.",
        "Objetivo: *Er hat arbeiten müssen* (tuvo que). Subjetivo: *Er muss gearbeitet haben* (debe de haber trabajado).",
    ],
    "lesson": {
        "intro": "Un vecino misterioso, una casa vacía, un auto caro en la puerta. Esta semana aprendés a especular en alemán con los mismos modales de siempre, y a contar lo que dicen los demás sin jurar que es cierto.",
        "parts": [
            {"h": "Suponer: qué tan seguro estás", "blocks": [0, 1, 2]},
            {"h": "Lo que dicen otros: soll y will", "blocks": [3, 4]},
            {"h": "Otras formas de suponer y el pasado objetivo", "blocks": [5, 6, 7]},
        ],
        "blocks": [
            {
                "h": "Dos vidas de los modales",
                "r": "Hasta ahora usaste los modales en sentido **objetivo**: obligación, permiso, capacidad (*Ich muss arbeiten*). En sentido **subjetivo**, el modal no habla de la acción sino de **la opinión del que habla**: cuánto cree que algo es verdad. La forma es la misma; el contexto decide.",
                "table": {"head": ["Modal", "Certeza", "Castellano"], "rows": [
                    ["Er *muss* krank sein.", "casi 100 %", "Debe de estar enfermo / seguro que está enfermo."],
                    ["Er *dürfte* krank sein.", "≈ 75 %", "Probablemente esté enfermo."],
                    ["Er *kann* krank sein.", "≈ 50 %", "Puede ser que esté enfermo."],
                    ["Er *könnte* krank sein.", "< 50 %", "Podría estar enfermo."],
                    ["Er *kann nicht* krank sein.", "0 %", "No puede estar enfermo."],
                ]},
                "ex": [
                    ["Er *muss* heute arbeiten.", "Hoy tiene que trabajar. (objetivo: obligación)"],
                    ["Er *muss* krank sein, er hustet die ganze Zeit.", "Debe de estar enfermo: tose todo el tiempo. (subjetivo)"],
                ],
                "warn": "En castellano se distingue (en teoría) «debe estar» (obligación) de «debe **de** estar» (suposición), aunque en el Río de la Plata casi siempre decimos «debe estar» para las dos. El alemán tampoco las distingue en la forma: fijate en el contexto.",
                "tip": "Si podés agregar «seguramente», «me parece que» o «capaz que» en castellano, el modal alemán es subjetivo.",
                "q": [
                    q("*Sie muss zu Hause sein, das Licht ist an.* ¿Qué expresa *muss*?", "una suposición casi segura", ["una suposición casi segura", "una obligación", "un permiso"]),
                    q("¿Qué modal expresa **imposibilidad**?", "kann nicht", ["kann nicht", "muss nicht", "darf nicht"]),
                ],
            },
            {
                "h": "muss, dürfte, kann, könnte",
                "r": "**muss**: tenés pruebas y sacás una conclusión casi segura. **dürfte** (Konjunktiv II de *dürfen*, y solo en esa forma con este sentido): probable, típico de la prensa y los informes. **kann** / **könnte**: es una posibilidad entre otras; *könnte* suena más cauto. **kann nicht**: lo descartás.",
                "ex": [
                    ["Sein Auto steht vor der Tür. Er *muss* zu Hause sein.", "Su auto está en la puerta. Seguro que está en casa."],
                    ["Die Reparatur *dürfte* etwa 500 Euro kosten.", "La reparación probablemente cueste unos 500 euros."],
                    ["Wer klingelt da? – Das *könnte* der Postbote sein.", "¿Quién toca el timbre? – Podría ser el cartero."],
                    ["Das *kann* sein.", "Puede ser."],
                    ["Das *kann nicht* stimmen!", "¡Eso no puede ser cierto!"],
                ],
                "warn": "*Er muss nicht krank sein* **no** es «no puede estar enfermo» sino «no necesariamente está enfermo». Para descartar algo: *Er kann nicht krank sein*.",
                "more": [
                    "*dürfte* nunca aparece como *darf* con este sentido: *Er darf krank sein* sería «tiene permiso para estar enfermo».",
                    "La pregunta típica para especular: *Wer könnte das sein?* (¿Quién podrá ser?)",
                ],
                "q": [
                    q("«Probablemente tenga unos 40 años»: *Sie ___ etwa vierzig sein.*", "dürfte", ["dürfte", "darf", "muss"]),
                    q("*Er muss nicht der Täter sein* significa…", "no necesariamente es el culpable", ["no necesariamente es el culpable", "no puede ser el culpable", "no debe ser el culpable"]),
                ],
            },
            {
                "h": "Suponer sobre el pasado: el infinitivo perfecto",
                "r": "Para suponer algo que **ya pasó**, el modal va en presente y al final va el **infinitivo perfecto**: participio + *haben* o *sein*. Es el mismo auxiliar que en el Perfekt: *er hat vergessen → vergessen haben*; *er ist gegangen → gegangen sein*.",
                "table": {"head": ["Perfekt", "Infinitivo perfecto", "Suposición"], "rows": [
                    ["er hat vergessen", "vergessen haben", "Er muss es vergessen haben."],
                    ["sie hat verpasst", "verpasst haben", "Sie dürfte den Zug verpasst haben."],
                    ["er ist gewesen", "gewesen sein", "Er kann nicht dort gewesen sein."],
                    ["sie ist abgefahren", "abgefahren sein", "Sie könnte schon abgefahren sein."],
                ]},
                "ex": [
                    ["Die Tür ist offen. Jemand *muss* eingebrochen *sein*.", "La puerta está abierta. Alguien debe de haber entrado a robar."],
                    ["Er *kann* den Brief nicht geschrieben *haben*, er war im Krankenhaus.", "No puede haber escrito la carta: estaba en el hospital."],
                    ["Ich glaube, dass sie den Termin vergessen *haben muss*.", "Creo que debe de haberse olvidado del turno."],
                ],
                "warn": "El modal **no** pasa al pasado: «debe de haberlo olvidado» no es *Er hat es vergessen müssen* (eso es «tuvo que olvidarlo»). Lo que va al pasado es el infinitivo del final.",
                "tip": "En subordinada, el modal conjugado cierra la oración: *…, dass er krank gewesen sein muss.*",
                "q": [
                    q("Completá: *Sie muss den Bus verpasst ___.*", "haben", ["haben", "sein", "hat"]),
                    q("Completá: *Er kann nicht in Rom gewesen ___.*", "sein", ["sein", "haben", "ist"]),
                ],
            },
            {
                "h": "soll: dicen que…",
                "r": "*sollen* subjetivo transmite **una información de otros** (rumor, prensa, testigos) sin que el hablante se haga responsable. Equivale a «dicen que», «se dice que» o al condicional periodístico: «el ladrón **habría** huido por la ventana».",
                "ex": [
                    ["Der neue Nachbar *soll* sehr reich sein.", "Dicen que el vecino nuevo es muy rico."],
                    ["Das Restaurant *soll* ausgezeichnet sein.", "Dicen que el restaurante es excelente."],
                    ["Der Dieb *soll* durch das Fenster geflohen *sein*.", "El ladrón habría huido por la ventana."],
                    ["In dem alten Schloss *soll* es spuken.", "Dicen que en el castillo viejo hay fantasmas."],
                ],
                "warn": "No lo confundas con el *sollen* de los consejos u órdenes ajenas: *Du sollst mehr schlafen* (tenés que / te dicen que duermas más). Con infinitivo perfecto o con *sein*, casi siempre es rumor.",
                "more": ["Es la herramienta típica de las noticias junto al Konjunktiv I: *Der Minister soll von dem Plan gewusst haben* = el ministro habría sabido del plan."],
                "q": [
                    q("*Sie soll sehr klug sein* significa…", "dicen que es muy inteligente", ["dicen que es muy inteligente", "tiene que ser muy inteligente", "ella dice que es muy inteligente"]),
                    q("«El autor habría huido al extranjero»: *Der Täter ___ ins Ausland geflohen sein.*", "soll", ["soll", "will", "muss"]),
                ],
            },
            {
                "h": "will: él dice que…",
                "r": "*wollen* subjetivo: el **sujeto afirma algo sobre sí mismo**, y el hablante muestra que **no le cree del todo**. Suele ir con infinitivo perfecto: *Er will nichts gesehen haben* = dice que no vio nada (sí, claro).",
                "ex": [
                    ["Der Zeuge *will* den Täter genau gesehen *haben*.", "El testigo asegura haber visto bien al autor."],
                    ["Sie *will* von nichts gewusst *haben*.", "Ella dice que no sabía nada."],
                    ["Er *will* ein berühmter Pianist sein.", "Él dice ser un pianista famoso."],
                ],
                "warn": "*soll* = lo dicen **otros** sobre el sujeto. *will* = lo dice **el sujeto** sobre sí mismo. *Er soll reich sein* (dicen que es rico) ≠ *Er will reich sein* (él dice que es rico… o quiere serlo: el contexto decide).",
                "tip": "Con infinitivo perfecto, *will* casi nunca es «querer»: *Er will es nicht gewusst haben* solo puede ser «dice que no lo sabía».",
                "q": [
                    q("*Er will den ganzen Abend zu Hause gewesen sein.* ¿Quién lo afirma?", "él mismo", ["él mismo", "otras personas", "el que habla"]),
                    q("«Ella asegura haber pagado la cuenta»: *Sie ___ die Rechnung bezahlt haben.*", "will", ["will", "soll", "dürfte"]),
                ],
            },
            {
                "h": "Otras maneras de suponer: wohl, vermutlich, angeblich",
                "r": "Cada modal subjetivo tiene un **adverbio** equivalente, más fácil de manejar. Y *werden* + *wohl* + infinitivo (el «futuro de suposición») sirve para el presente: *Er wird wohl krank sein* = seguramente esté enfermo, como nuestro «estará enfermo».",
                "table": {"head": ["Modal", "Adverbio equivalente"], "rows": [
                    ["Er muss krank sein.", "Er ist sicher / bestimmt krank."],
                    ["Er dürfte krank sein.", "Er ist wahrscheinlich / vermutlich krank."],
                    ["Er könnte krank sein.", "Er ist vielleicht / möglicherweise krank."],
                    ["Er soll krank sein.", "Er ist angeblich krank."],
                    ["Er will krank sein.", "Er behauptet, krank zu sein."],
                ]},
                "ex": [
                    ["Sie *wird wohl* im Stau stehen.", "Estará en un embotellamiento."],
                    ["Er *wird* den Termin *wohl* vergessen *haben*.", "Se habrá olvidado del turno."],
                    ["Der Täter ist *angeblich* ins Ausland geflohen.", "El autor supuestamente huyó al extranjero."],
                ],
                "warn": "Sin un adverbio de futuro, *wird wohl* casi siempre es una suposición sobre el presente: *Er wird wohl schlafen* = «estará durmiendo» (ahora). Con *morgen, nächste Woche…*, es futuro probable: *Er wird wohl morgen kommen*. Igual que nuestro futuro de probabilidad: «¿Qué hora será?»",
                "q": [
                    q("¿Qué adverbio equivale a *soll*?", "angeblich", ["angeblich", "sicher", "vielleicht"]),
                    q("*Er wird wohl im Büro sein* significa…", "seguramente está en la oficina", ["seguramente está en la oficina", "mañana va a estar en la oficina", "quiere estar en la oficina"]),
                ],
            },
            {
                "h": "En el pasado: ¿tuvo que o debe de haber?",
                "r": "Cuando el modal **objetivo** va al pasado, se conjuga el modal: Präteritum (*er musste arbeiten*) o Perfekt con doble infinitivo (*er hat arbeiten müssen*). Cuando el modal es **subjetivo**, el modal queda en presente y el pasado va en el infinitivo: *er muss gearbeitet haben*.",
                "table": {"head": ["Objetivo (obligación real)", "Subjetivo (suposición)"], "rows": [
                    ["Er musste lange arbeiten. / Er hat lange arbeiten müssen.", "Er muss lange gearbeitet haben."],
                    ["Tuvo que trabajar mucho tiempo.", "Debe de haber trabajado mucho tiempo."],
                    ["Sie konnte nicht kommen.", "Sie kann nicht gekommen sein."],
                    ["No pudo venir.", "No puede haber venido."],
                ]},
                "ex": [
                    ["Wir *haben* gestern länger bleiben *müssen*.", "Ayer tuvimos que quedarnos más tiempo."],
                    ["Ihr *müsst* gestern länger geblieben *sein*.", "Ayer deben de haberse quedado más tiempo."],
                ],
                "warn": "En el Perfekt objetivo, el modal va en **infinitivo**, no en participio: *Er hat arbeiten müssen* (nunca «gemusst» cuando hay otro verbo). **Sin otro verbo**, sí va el participio: *Das habe ich nicht gekonnt* (no pude), *Er hat es so gewollt* (lo quiso así).",
                "more": [
                    "En la subordinada, el doble infinitivo no se deja pasar: *haben* se adelanta y queda **antes** de los dos infinitivos: *…, weil er **hat** arbeiten müssen* (no «weil er arbeiten müssen hat»). Como suena pesado, hablando y escribiendo casi todos usan el Präteritum: *…, weil er arbeiten musste*.",
                ],
                "q": [
                    q("Completá: *Ich bin zu spät gekommen, weil ich noch ___.*", "habe arbeiten müssen", ["habe arbeiten müssen", "arbeiten müssen habe", "arbeiten gemusst habe"]),
                    q("«No pudo venir» (no le fue posible):", "Sie konnte nicht kommen.", ["Sie konnte nicht kommen.", "Sie kann nicht gekommen sein.", "Sie hat nicht kommen gekonnt."]),
                    q("«No puede haber venido» (lo descarto):", "Sie kann nicht gekommen sein.", ["Sie kann nicht gekommen sein.", "Sie konnte nicht kommen.", "Sie hat nicht kommen können."]),
                ],
            },
            {
                "h": "Futur II: se habrá olvidado, habré terminado",
                "r": "*werden* + **participio** + *haben/sein* (el infinitivo perfecto) es el **Futur II**. Tiene los mismos dos usos que nuestro futuro compuesto: (1) **suponer algo sobre el pasado**: *Er wird es vergessen haben* = se habrá olvidado; (2) decir que algo **va a estar terminado** antes de un momento: *Bis Freitag werde ich den Bericht geschrieben haben* = para el viernes habré escrito el informe. *haben* o *sein* se eligen como en el Perfekt.",
                "table": {"head": ["Alemán", "Castellano", "Uso"], "rows": [
                    ["Er *wird* es *vergessen haben*.", "Se habrá olvidado.", "suposición (pasado)"],
                    ["Sie *wird* schon *angekommen sein*.", "Ya habrá llegado.", "suposición (pasado)"],
                    ["Er *wird* wohl *verschlafen haben*.", "Se habrá quedado dormido.", "suposición (pasado)"],
                    ["Bis Freitag *werde* ich den Bericht *geschrieben haben*.", "Para el viernes habré escrito el informe.", "terminado antes de"],
                ]},
                "ex": [
                    ["Wo ist Tom? – Er *wird* den Bus *verpasst haben*.", "¿Dónde está Tom? – Habrá perdido el colectivo."],
                    ["In zwei Jahren *werde* ich das Studium *abgeschlossen haben*.", "En dos años habré terminado la carrera."],
                ],
                "warn": "Para lo que va a estar terminado, en la charla el alemán prefiere el **Perfekt** con una palabra de tiempo: *Bis Freitag habe ich den Bericht geschrieben*. El Futur II suena escrito o formal. Para suponer, en cambio, *wird … haben* (casi siempre con *wohl* o *schon*) es muy común, igual que *muss / dürfte … haben*.",
                "tip": "La estructura es la misma del Perfekt, pero con *werden* conjugado adelante y *haben/sein* en infinitivo al final: *er hat geschlafen* → *er wird geschlafen haben*.",
                "q": [
                    q("*Sie wird den Zug verpasst haben* significa…", "Habrá perdido el tren.", ["Habrá perdido el tren.", "Va a perder el tren.", "Tuvo que perder el tren."]),
                    q("Completá: *Er wird schon nach Hause gegangen ___.*", "sein", ["sein", "haben", "werden"]),
                    q("«Para junio habré terminado la carrera» (formal):", "Bis Juni werde ich das Studium abgeschlossen haben.", ["Bis Juni werde ich das Studium abgeschlossen haben.", "Bis Juni werde ich das Studium abschließen haben.", "Bis Juni habe ich das Studium abschließen werden."]),
                ],
            },
        ],
    },
    "vocab": [
        ["das Gerücht", "el rumor", "Es gibt ein Gerücht über den neuen Nachbarn."],
        ["die Vermutung", "la suposición, la conjetura", "Das ist nur eine Vermutung, ich weiß es nicht sicher."],
        ["der Verdacht", "la sospecha", "Die Polizei hat einen Verdacht."],
        ["das Indiz", "el indicio", "Es gibt kein einziges Indiz gegen ihn."],
        ["der Täter", "el autor (de un delito)", "Der Täter soll ins Ausland geflohen sein."],
        ["die Spur", "el rastro, la pista", "Von dem Dieb fehlt jede Spur."],
        ["das Rätsel", "el enigma, el acertijo", "Sein Verschwinden ist ein Rätsel."],
        ["das Geheimnis", "el secreto, el misterio", "Sie kann kein Geheimnis für sich behalten."],
        ["das Alibi", "la coartada", "Er hat ein Alibi: Er war im Kino."],
        ["der Einbruch", "el robo (con entrada forzada)", "Nach dem Einbruch war die Tür kaputt."],
        ["verschwinden", "desaparecer", "Der Hund ist gestern spurlos verschwunden."],
        ["verdächtigen", "sospechar de (alguien)", "Die Polizei verdächtigt den Nachbarn."],
        ["vermuten", "suponer, sospechar", "Ich vermute, dass sie den Zug verpasst hat."],
        ["angeblich", "supuestamente", "Er ist angeblich Millionär."],
        ["vermutlich", "probablemente, presuntamente", "Der Brief ist vermutlich verloren gegangen."],
        ["spuken", "haber fantasmas, aparecerse", "In dem alten Haus soll es spuken."],
    ],
    "items": [
        # parte 0 — suponer: muss, dürfte, kann, könnte, kann nicht; pasado
        ch(0, "Elegí el modal.", "Das Licht ist aus. Sie ___ schon schlafen.", "muss", ["muss", "soll", "will"], "Sacás una conclusión de una prueba (la luz): *muss*. *soll* sería un rumor."),
        ch(0, "Elegí el modal.", "Er ___ nicht der Täter sein, er war im Urlaub.", "kann", ["kann", "muss", "darf"], "Lo descartás por completo: *kann nicht*. *muss nicht* sería «no necesariamente»."),
        ch(0, "¿Qué expresa la oración?", "Der Chef dürfte noch im Büro sein.", "es probable", ["es probable", "es seguro", "es imposible"], "*dürfte* = probablemente, cerca del 75 %."),
        ch(0, "Elegí el modal.", "Sie hat ein Haus am See und drei Autos. Sie ___ viel Geld haben.", "muss", ["muss", "darf", "will"], "Las pruebas hablan: *muss*. *darf* es permiso; *will* sería lo que ella afirma."),
        ch(0, "Completá.", "Er ist nicht gekommen. Er muss den Termin ___.", "vergessen haben", ["vergessen haben", "vergessen hat", "haben vergessen"], "Modal + infinitivo perfecto: participio + *haben* al final."),
        ch(0, "Completá.", "Die Straße ist nass. Es muss geregnet ___.", "haben", ["haben", "sein", "hat"], "*es hat geregnet* → *geregnet haben*."),
        ch(0, "Completá.", "Sie ist nicht mehr da. Sie könnte schon nach Hause gegangen ___.", "sein", ["sein", "haben", "ist"], "*sie ist gegangen* → *gegangen sein*: el mismo auxiliar que en el Perfekt."),
        cz(0, "Escribí el modal (casi seguro).", "Sein Auto steht vor der Tür. Er ___ zu Hause sein.", "muss", note="Conclusión segura a partir de una prueba: *muss*."),
        cz(0, "Escribí el modal (imposible).", "Das ___ nicht stimmen! Ich habe ihn gestern gesehen.", "kann", note="Para descartar algo: *kann nicht*."),
        cz(0, "Escribí la forma de *dürfen* (probable).", "Die Reparatur ___ etwa 300 Euro kosten.", "dürfte", note="Con sentido de probabilidad, solo el Konjunktiv II: *dürfte*."),
        cz(0, "Escribí la forma de *können* (posible, cauto).", "Er ist so blass. Er ___ krank sein.", "könnte", ["könnte", "kann"], "*könnte* es la posibilidad prudente; *kann* también sirve."),
        cz(0, "Escribí el auxiliar.", "Sie muss den Zug verpasst ___.", "haben", note="*sie hat verpasst* → *verpasst haben*."),
        cz(0, "Escribí el auxiliar.", "Er kann nicht in Berlin gewesen ___.", "sein", note="*er ist gewesen* → *gewesen sein*."),
        tr(0, "Él debe de estar en casa.", "Er muss zu Hause sein.", ["Er muss zu Hause sein.", "Er muss zuhause sein.", "Er muss daheim sein."], "Suposición casi segura: *muss*."),
        tr(0, "Eso no puede ser verdad.", "Das kann nicht wahr sein.", ["Das kann nicht wahr sein.", "Das kann nicht stimmen.", "Das kann doch nicht wahr sein."], "Lo imposible: *kann nicht*."),
        tr(0, "Ella debe de haber perdido la llave.", "Sie muss den Schlüssel verloren haben.", ["Sie muss den Schlüssel verloren haben.", "Sie muss ihren Schlüssel verloren haben."], note="Modal en presente + *verloren haben*."),
        # parte 1 — soll y will
        ch(1, "Elegí el modal.", "(Dicen que es muy rico.) Er ___ sehr reich sein.", "soll", ["soll", "will", "muss"], "Lo dicen otros: *soll*."),
        ch(1, "Elegí el modal.", "(Él asegura que es médico, pero no le creo.) Er ___ Arzt sein.", "will", ["will", "soll", "muss"], "Lo afirma el sujeto sobre sí mismo: *will*."),
        ch(1, "¿Qué significa?", "Die Firma soll Millionen verdient haben.", "Dicen que la empresa ganó millones.", ["Dicen que la empresa ganó millones.", "La empresa tiene que ganar millones.", "La empresa dice que ganó millones."], "*soll* + infinitivo perfecto = rumor sobre el pasado."),
        ch(1, "¿Qué significa?", "Der Zeuge will den Täter gesehen haben.", "El testigo asegura haber visto al autor.", ["El testigo asegura haber visto al autor.", "El testigo quiere ver al autor.", "Dicen que el testigo vio al autor."], "*will* + infinitivo perfecto: lo afirma él, y el hablante duda."),
        ch(1, "Elegí el modal.", "(Según la prensa, el ladrón huyó por la ventana.) Der Dieb ___ durch das Fenster geflohen sein.", "soll", ["soll", "will", "kann"], "Información de terceros (la prensa): *soll*."),
        ch(1, "Elegí el modal.", "(Nadie le cree.) Er ___ die ganze Nacht zu Hause gewesen sein.", "will", ["will", "soll", "dürfte"], "Su versión sobre sí mismo, poco creíble: *will*."),
        cz(1, "Escribí el modal (dicen que…).", "Das neue Restaurant ___ sehr gut sein.", "soll", note="Rumor, información ajena: *soll*."),
        cz(1, "Escribí el modal (ella afirma…).", "Sie ___ nichts davon gewusst haben.", "will", note="Ella lo dice de sí misma: *will*."),
        cz(1, "Escribí el auxiliar.", "Der Politiker soll Geld angenommen ___.", "haben", note="*er hat angenommen* → *angenommen haben*."),
        cz(1, "Escribí el auxiliar.", "Der Täter soll ins Ausland geflohen ___.", "sein", note="*fliehen* es de movimiento: *ist geflohen* → *geflohen sein*."),
        cz(1, "Escribí el modal (dicen que…).", "In dem alten Haus ___ es spuken.", "soll", note="*Es spukt* = hay fantasmas; el rumor, con *soll*."),
        tr(1, "Dicen que el museo es muy lindo.", "Das Museum soll sehr schön sein.", ["Das Museum soll sehr schön sein.", "Das Museum soll wirklich schön sein."], "«Dicen que» = *soll*."),
        tr(1, "Él asegura haberlo visto todo.", "Er will alles gesehen haben.", ["Er will alles gesehen haben.", "Er will das alles gesehen haben."], "Afirmación propia, dudosa: *will* + *gesehen haben*."),
        tr(1, "Dicen que ella se mudó a Viena.", "Sie soll nach Wien gezogen sein.", ["Sie soll nach Wien gezogen sein.", "Sie soll nach Wien umgezogen sein."], "*ziehen* (mudarse) va con *sein*: *gezogen sein*."),
        ty(1, "Reescribí con *sollen*.", "Man sagt, dass er im Lotto gewonnen hat.", "Er soll im Lotto gewonnen haben.", note="«Man sagt, dass…» se condensa en *soll* + infinitivo perfecto."),
        ty(1, "Reescribí con *wollen*.", "Er behauptet, dass er unschuldig ist.", "Er will unschuldig sein.", note="«Er behauptet…» sobre sí mismo = *will*."),
        ty(1, "Reescribí con *wollen*.", "Sie behauptet, dass sie die Rechnung bezahlt hat.", "Sie will die Rechnung bezahlt haben.", note="Afirmación sobre el pasado: *will* + *bezahlt haben*."),
        li(1, "angeblich", ["angeblich", "vermutlich", "eigentlich"], "*angeblich* = supuestamente: la versión de otros, como *soll*."),
        # parte 2 — adverbios, werden + wohl, objetivo vs. subjetivo en pasado
        ch(2, "¿Qué significa?", "Sie wird wohl im Stau stehen.", "Estará en un embotellamiento.", ["Estará en un embotellamiento.", "Mañana va a estar en un embotellamiento.", "Quiere estar en un embotellamiento."], "*werden + wohl* = suposición sobre el presente, como nuestro futuro de probabilidad."),
        ch(2, "¿Qué oración dice lo mismo?", "Er dürfte krank sein.", "Er ist wahrscheinlich krank.", ["Er ist wahrscheinlich krank.", "Er ist sicher krank.", "Er ist angeblich krank."], "*dürfte* ≈ *wahrscheinlich*."),
        ch(2, "¿Qué oración dice lo mismo?", "Er soll krank sein.", "Er ist angeblich krank.", ["Er ist angeblich krank.", "Er ist bestimmt krank.", "Er ist vielleicht krank."], "*soll* ≈ *angeblich*."),
        ch(2, "Elegí la traducción.", "«Tuvo que trabajar mucho.» (obligación)", "Er hat viel arbeiten müssen.", ["Er hat viel arbeiten müssen.", "Er muss viel gearbeitet haben.", "Er hat viel arbeiten gemusst."], "Obligación en el pasado: Perfekt con doble infinitivo."),
        ch(2, "Elegí la traducción.", "«Debe de haber trabajado mucho.» (suposición)", "Er muss viel gearbeitet haben.", ["Er muss viel gearbeitet haben.", "Er hat viel arbeiten müssen.", "Er musste viel arbeiten."], "Suposición: modal en presente + infinitivo perfecto."),
        ch(2, "¿Qué significa?", "Er muss nicht krank sein.", "No necesariamente está enfermo.", ["No necesariamente está enfermo.", "No puede estar enfermo.", "No tiene que enfermarse."], "*muss nicht* = no necesariamente; lo imposible es *kann nicht*."),
        cz(2, "Escribí la partícula de la suposición.", "Sie wird ___ schon zu Hause sein.", "wohl", note="*werden + wohl* = seguramente (ahora)."),
        cz(2, "Escribí el adverbio (supuestamente).", "Er ist ___ krank, aber ich glaube das nicht.", "angeblich", note="*angeblich*: la versión de otros, en la que no confiás."),
        cz(2, "Escribí un adverbio de probabilidad.", "Das Paket kommt ___ morgen an.", "wahrscheinlich", ["wahrscheinlich", "vermutlich", "voraussichtlich"], "*wahrscheinlich* o *vermutlich* = probablemente."),
        cz(2, "Escribí el modal en infinitivo.", "Wir haben gestern länger bleiben ___.", "müssen", note="Perfekt de un modal objetivo: doble infinitivo, *bleiben müssen*."),
        ty(2, "Reescribí con un modal.", "Er ist sicher im Büro.", "Er muss im Büro sein.", note="*sicher* ≈ *muss*."),
        ty(2, "Reescribí con *können* en Konjunktiv II.", "Es ist möglich, dass sie den Bus verpasst hat.", "Sie könnte den Bus verpasst haben.", note="Posibilidad sobre el pasado: *könnte* + *verpasst haben*."),
        ty(2, "Reescribí con *dürfen*.", "Wahrscheinlich hat er es vergessen.", "Er dürfte es vergessen haben.", note="*wahrscheinlich* ≈ *dürfte*; el pasado va en el infinitivo: *vergessen haben*."),
        tr(2, "Seguramente él ya está durmiendo.", "Er wird wohl schon schlafen.", ["Er wird wohl schon schlafen.", "Er schläft wohl schon.", "Er dürfte schon schlafen.", "Er schläft wahrscheinlich schon.", "Er schläft vermutlich schon.", "Wahrscheinlich schläft er schon.", "Vermutlich schläft er schon.", "Er schläft sicher schon.", "Er schläft bestimmt schon.", "Sicher schläft er schon.", "Er muss schon schlafen."], "Nuestro «seguramente» es probabilidad: *wird wohl*, *dürfte* o *wahrscheinlich*."),
        tr(2, "Es imposible que él haya escrito esta carta.", "Er kann diesen Brief nicht geschrieben haben.", ["Er kann diesen Brief nicht geschrieben haben.", "Er kann den Brief nicht geschrieben haben."], "*kann nicht* + infinitivo perfecto."),
        li(2, "vermutlich", ["vermutlich", "verständlich", "vergeblich"], "*vermutlich* = probablemente; viene de *vermuten*."),
        # parte 2 — Perfekt de modales en subordinada y sin otro verbo
        ch(2, "Elegí el orden correcto.", "Ich konnte nicht kommen, weil er ___.", "hat arbeiten müssen", ["hat arbeiten müssen", "arbeiten müssen hat", "arbeiten gemusst hat"], "Con doble infinitivo, *hat* se adelanta en la subordinada: *weil er hat arbeiten müssen*. Más común todavía: *weil er arbeiten musste*."),
        tr(2, "No lo pude hacer.", "Ich habe es nicht machen können.", ["Ich habe es nicht machen können.", "Ich konnte es nicht machen.", "Ich habe das nicht machen können.", "Ich konnte das nicht machen.", "Ich habe es nicht tun können.", "Ich konnte es nicht tun.", "Das habe ich nicht machen können.", "Das konnte ich nicht machen."], "Perfekt con doble infinitivo (*machen können*, no «gekonnt»), o el Präteritum *konnte*, que es lo más usado."),
        ch(2, "Elegí la forma correcta.", "(No pude con eso: la tarea era demasiado difícil.) Ich habe es nicht ___.", "gekonnt", ["gekonnt", "können", "gekönnt"], "**Sin otro verbo**, el modal va en participio: *Ich habe es nicht gekonnt*. Con otro verbo sería *nicht machen können*."),
        # parte 2 — Futur II
        ch(2, "¿Qué significa?", "Er wird den Bus verpasst haben.", "Habrá perdido el colectivo.", ["Habrá perdido el colectivo.", "Va a perder el colectivo.", "Tuvo que perder el colectivo."], "*werden* + infinitivo perfecto = suposición sobre el pasado, como nuestro «habrá perdido»."),
        ch(2, "¿Qué significa?", "Bis Montag werde ich das Buch gelesen haben.", "Para el lunes habré leído el libro.", ["Para el lunes habré leído el libro.", "El lunes voy a leer el libro.", "Hasta el lunes estuve leyendo el libro."], "Futur II: algo que va a estar terminado antes de un momento del futuro."),
        cz(2, "Escribí el auxiliar en infinitivo (*haben* o *sein*).", "Sie wird schon angekommen ___.", "sein", note="*ankommen* hace el Perfekt con *sein* (*sie ist angekommen*), así que en el Futur II: *angekommen sein*."),
        cz(2, "Escribí el auxiliar en infinitivo (*haben* o *sein*).", "Er wird den Schlüssel im Büro vergessen ___.", "haben", note="*vergessen* hace el Perfekt con *haben*: *wird … vergessen haben* = se habrá olvidado."),
        tr(2, "Se habrá quedado dormido.", "Er wird verschlafen haben.", ["Er wird verschlafen haben.", "Er wird wohl verschlafen haben.", "Er wird sicher verschlafen haben.", "Er hat wohl verschlafen.", "Er dürfte verschlafen haben.", "Er muss verschlafen haben."], "Suposición sobre el pasado: *wird (wohl) verschlafen haben*. *verschlafen* = quedarse dormido (no despertarse a tiempo)."),
        tr(2, "Ya habrán terminado.", "Sie werden schon fertig sein.", ["Sie werden schon fertig sein.", "Sie werden wohl schon fertig sein.", "Sie werden schon fertig geworden sein.", "Sie werden es schon geschafft haben.", "Sie dürften schon fertig sein.", "Sie sind wohl schon fertig."], "Con *fertig* lo natural es *werden … fertig sein* (suposición sobre ahora); el Futur II *fertig geworden sein* también es correcto pero pesado."),
        # parte 0 — muss nicht / kann nicht
        ch(0, "¿Qué significa?", "Sie kann nicht zu Hause sein, ihr Auto ist weg.", "Es imposible que esté en casa.", ["Es imposible que esté en casa.", "No necesariamente está en casa.", "No tiene permiso para estar en casa."], "*kann nicht* descarta: imposible. «No necesariamente» sería *muss nicht*."),
        cz(0, "Escribí el modal (no necesariamente).", "Wer viel lacht, ___ nicht glücklich sein.", "muss", note="*muss nicht* = no necesariamente. Si dijeras *kann nicht*, afirmarías que es imposible."),
        # parte 1 — repaso de la semana 35: soll y Konjunktiv I, las dos herramientas de la prensa
        ty(1, "Pasá a discurso indirecto, empezando con *Laut Zeitung*.", "Der Minister soll gelogen haben.", "Laut Zeitung habe der Minister gelogen.", ["Laut Zeitung habe der Minister gelogen.", "Laut der Zeitung habe der Minister gelogen."], "Lo que con *soll* es rumor, con una fuente va en Konjunktiv I: *habe … gelogen* (un solo pasado en el indirecto)."),
        ty(1, "Reescribí con *sollen*.", "Laut Polizei sei der Täter nach Spanien geflohen.", "Der Täter soll nach Spanien geflohen sein.", ["Der Täter soll nach Spanien geflohen sein.", "Laut Polizei soll der Täter nach Spanien geflohen sein."], note="Konjunktiv I con fuente → *soll* + infinitivo perfecto. *geflohen sein*, porque *fliehen* va con *sein*."),
        ty(1, "Reescribí con *sollen*.", "Die Zeugen sagen, der Fahrer sei zu schnell gefahren.", "Der Fahrer soll zu schnell gefahren sein.", note="«Dicen que…» + Konjunktiv I = *soll*. *gefahren sein*: *fahren* va con *sein*."),
        ch(1, "¿Qué oración dice lo mismo?", "Er will nichts gewusst haben.", "Er behauptet, er habe nichts gewusst.", ["Er behauptet, er habe nichts gewusst.", "Man sagt, er habe nichts gewusst.", "Er wollte nichts wissen."], "*will* = lo afirma él mismo (*er behauptet*), con Konjunktiv I para la cita. *Man sagt…* sería *soll*."),
        # encontrá el error, dictado y repaso (semanas 19 a 34)
        fx(0, "Sie muss den Schlüssel verloren hat.", "verloren hat", "verloren haben", "verbo", "Para suponer sobre el pasado, el modal va con el infinitivo perfecto: participio + *haben* sin conjugar: *muss … verloren haben*. El modal ya está conjugado."),
        fx(1, "Er soll ins Ausland gefahren haben.", "haben", "sein", "auxiliar", "En el infinitivo perfecto va el auxiliar del Perfekt: *fahren* se hace con *sein* → *soll … gefahren sein*."),
        fx(2, "Bis Freitag werde ich die Arbeit beendet.", "beendet", "beendet haben", "verbo", "Futur II = *werden* + participio + *haben* (o *sein*): *werde … beendet haben*. Sin *haben*, *werde … beendet* parece una pasiva («voy a ser terminado»)."),
        di(0, "Er dürfte den letzten Zug verpasst haben.", note="*den letzten Zug*: acusativo masculino, -en dos veces. *dürfte*, con ü: «probablemente»."),
        di(1, "Der Täter soll mit einem roten Auto weggefahren sein.", note="*mit einem roten Auto*: dativo neutro, -em en el artículo y -en en el adjetivo. *weggefahren sein*: infinitivo perfecto con *sein*."),
        ty(0, "Escribí dos suposiciones sobre tu vecino, que no abre la puerta: una con *muss* y otra con *könnte*.", "(seguro que está durmiendo · capaz que se fue de viaje)", "Er muss noch schlafen. Er könnte verreist sein.", _mix(["Er muss noch schlafen.", "Er muss schon schlafen.", "Er muss gerade schlafen.", "Er muss wohl schlafen.", "Er muss schlafen."], ["Er könnte verreist sein.", "Er könnte weggefahren sein.", "Er könnte in Urlaub gefahren sein.", "Er könnte auf Reisen sein."]), "*muss* = casi seguro. *könnte* = es posible. Para lo que ya pasó (irse de viaje), infinitivo perfecto con *sein*: *könnte verreist sein*."),
        cz(2, "Escribí *worden* o *geworden*.", "Der Täter ist nie gefunden ___.", "worden", note="Repaso de la semana 31: pasiva en Perfekt → *ist* + participio + *worden*. *geworden* va cuando *werden* es «volverse»."),
        cz(2, "Escribí *worden* o *geworden*.", "Nach dem Einbruch ist sie sehr vorsichtig ___.", "geworden", note="Repaso de la semana 31: acá *werden* es «volverse» (con un adjetivo, sin otro participio) → *ist … geworden*."),
        cz(2, "Escribí el adjetivo con su terminación.", "Die Polizei sucht einen ___ Mann. (groß)", "großen", note="Repaso de la semana 19: *einen*, acusativo masculino → adjetivo con *-en*: *einen großen Mann*."),
        tr(2, "Aunque tenía coartada, la policía sospechaba de él.", "Obwohl er ein Alibi hatte, verdächtigte ihn die Polizei.", _mix(["Obwohl er ein Alibi hatte, verdächtigte ihn die Polizei.", "Obwohl er ein Alibi hatte, verdächtigte die Polizei ihn.", "Obwohl er ein Alibi hatte, hat ihn die Polizei verdächtigt.", "Obwohl er ein Alibi hatte, hat die Polizei ihn verdächtigt.", "Die Polizei verdächtigte ihn, obwohl er ein Alibi hatte."]), "Repaso de la semana 34: *obwohl* manda el verbo al final; después de la coma, el verbo enseguida. Y *verdächtigen* + acusativo: *ihn*, sin «de»."),
        cz(2, "Escribí *um* o *damit*.", "Ich schließe die Tür ab, ___ niemand einbrechen kann.", "damit", note="Repaso de la semana 23: sujetos distintos (*ich* / *niemand*) → *damit*, con el verbo al final. *um … zu* va solo con el mismo sujeto."),
    ],
}
