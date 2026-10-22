# -*- coding: utf-8 -*-
"""Semana 33 — Der lachende Mann (B2): el participio I y II como adjetivo."""
from base import q, ch, li, cz, tr, ty, MAY  # noqa: F401


def _nc(*xs):
    """Cada variante, también sin comas (la corrección no saca las comas del medio)."""
    out = []
    for x in xs:
        for y in (x, x.replace(",", "")):
            if y not in out:
                out.append(y)
    return out


WEEK = {
    "week": 33,
    "title": "Der lachende Mann",
    "level": "B2",
    "focus": "Los participios como adjetivos: el participio I (lo que está pasando) y el participio II (lo que ya pasó o ya se hizo).",
    "fare": "Describir un cuadro, una foto o un barrio con frases compactas: la mujer sentada, el sol que se pone, la fachada renovada, los viajeros.",
    "tema": "Partizip I y Partizip II como atributo, participios sustantivados y como adverbio, arte y ciudad",
    "keys": [
        "Partizip I = infinitivo + *d*: *lachen → lachend*. Activo y simultáneo: *der lachende Mann*.",
        "Partizip II de verbos con objeto = pasivo y terminado: *das gekaufte Auto*.",
        "Con verbos de *sein* = activo y terminado: *der angekommene Zug*, *die gestiegenen Preise*.",
        "Delante del sustantivo se declinan como cualquier adjetivo: *mit dem schlafenden Hund*.",
        "Sustantivados, con terminación de adjetivo: *der Reisende, ein Reisender, die Reisenden*.",
        "*spannend* (el libro) ≠ *gespannt* (yo, expectante).",
    ],
    "lesson": {
        "intro": "En castellano decimos «el hombre que se ríe» o «la puerta cerrada». El alemán prefiere poner el participio **delante** del sustantivo, con terminación de adjetivo: *der lachende Mann*, *die geschlossene Tür*. Es la base de las frases largas de la prensa (semana 36) y la forma más elegante de describir un cuadro o una ciudad.",
        "parts": [
            {"h": "El participio I: lo que está pasando", "blocks": [0, 1]},
            {"h": "El participio II: lo que ya pasó", "blocks": [2, 3, 4]},
            {"h": "Participios para describir", "blocks": [5, 6, 7]},
        ],
        "blocks": [
            {
                "h": "Formar el Partizip I",
                "r": "El **Partizip I** se forma con el **infinitivo + *d***: *lachen → lachend*, *schlafen → schlafend*, *lächeln → lächelnd*. No tiene excepciones que importen (*sein → seiend* y *tun → tuend* casi no se usan). Expresa una acción **activa** que pasa **al mismo tiempo**: el que ríe, mientras ríe. Se parece a nuestros adjetivos en *-nte* (durmiente, sonriente, creciente).",
                "table": {"head": ["Infinitiv", "Partizip I", "Castellano"], "rows": [
                    ["lachen", "lachend", "que ríe, riendo"],
                    ["schlafen", "schlafend", "que duerme, durmiente"],
                    ["weinen", "weinend", "que llora, llorando"],
                    ["steigen", "steigend", "que sube, creciente"],
                    ["kommen", "kommend", "que viene, próximo"],
                    ["folgen", "folgend", "siguiente"],
                ]},
                "ex": [
                    ["der *schlafende* Hund", "el perro que duerme"],
                    ["die *steigenden* Preise", "los precios en alza"],
                    ["im *kommenden* Jahr", "el año que viene"],
                    ["der *folgende* Text", "el texto siguiente"],
                ],
                "warn": "El Partizip I **no arma tiempos verbales**: «estoy leyendo» no es *ich bin lesend*, sino *ich lese* o *ich lese gerade*. Solo se usa como adjetivo o como adverbio.",
                "q": [
                    q("¿Cuál es el Partizip I de *singen*?", "singend", ["singend", "gesungen", "singen"]),
                    q("¿Cómo decís «estoy leyendo (ahora)»?", "Ich lese gerade.", ["Ich lese gerade.", "Ich bin lesend.", "Ich bin gelesen."]),
                ],
            },
            {
                "h": "Delante del sustantivo, con terminación",
                "r": "Delante del sustantivo, el participio se declina **como cualquier adjetivo** (semanas 15 y 19): después de *der/die/das* va *-e* o *-en*; después de *ein* o sin artículo, la terminación muestra el género y el caso.",
                "table": {"head": ["", "Con artículo definido", "Con ein / sin artículo"], "rows": [
                    ["Nom. masc.", "der lachende Mann", "ein lachender Mann"],
                    ["Akk. masc.", "den lachenden Mann", "einen lachenden Mann"],
                    ["Dat. masc.", "dem lachenden Mann", "einem lachenden Mann"],
                    ["Nom. fem.", "die singende Frau", "eine singende Frau"],
                    ["Nom. neutro", "das weinende Kind", "ein weinendes Kind"],
                    ["Plural", "die spielenden Kinder", "spielende Kinder"],
                ]},
                "ex": [
                    ["Weck den *schlafenden* Hund nicht!", "No despiertes al perro que duerme."],
                    ["Ein *weinendes* Kind saß auf der Treppe.", "Un chico que lloraba estaba sentado en la escalera."],
                    ["Im *kommenden* Jahr ziehe ich nach Wien.", "El año que viene me mudo a Viena."],
                    ["Spring nie auf einen *fahrenden* Zug!", "Nunca te subas a un tren en marcha."],
                ],
                "warn": "No te olvides la *d*: *das weinende Kind*, no *das weinene Kind*. La *d* es del participio; la terminación (*-e, -en, -es*) viene después.",
                "tip": "Siempre lo podés desarmar en una relativa: *der lachende Mann* = *der Mann, der lacht*. Si la relativa funciona en presente activo, el Partizip I también.",
                "q": [
                    q("Completá: *Ein ___ Kind saß auf der Treppe.*", "weinendes", ["weinendes", "weinende", "weinenden"]),
                    q("Completá: *Weck den ___ Hund nicht!*", "schlafenden", ["schlafenden", "schlafende", "schlafender"]),
                ],
            },
            {
                "h": "Partizip II con objeto: pasivo y terminado",
                "r": "El **Partizip II** de un verbo **transitivo** (con acusativo) delante del sustantivo tiene sentido **pasivo** y, en general, **terminado**: *das gekaufte Auto* = el auto que fue comprado. Con verbos de estado como *lieben* o *suchen* es solo pasivo: *die geliebte Mutter* = la madre que es amada. Es como nuestro «el auto comprado», pero en alemán va **antes** del sustantivo y se declina.",
                "table": {"head": ["Infinitiv", "Partizip II", "Como adjetivo"], "rows": [
                    ["kaufen", "gekauft", "das gekaufte Auto"],
                    ["schließen", "geschlossen", "die geschlossene Tür"],
                    ["stehlen", "gestohlen", "das gestohlene Fahrrad"],
                    ["bestellen", "bestellt", "die bestellten Bücher"],
                    ["renovieren", "renoviert", "ein renoviertes Haus"],
                    ["kochen", "gekocht", "ein gekochtes Ei"],
                ]},
                "ex": [
                    ["Das *gestohlene* Fahrrad ist wieder da.", "La bici robada apareció."],
                    ["Wir wohnen in einem *renovierten* Altbau.", "Vivimos en un edificio antiguo renovado."],
                    ["Ich habe die *bestellten* Bücher abgeholt.", "Retiré los libros encargados."],
                    ["Er stand vor der *geschlossenen* Tür.", "Estaba parado frente a la puerta cerrada."],
                ],
                "warn": "El orden es al revés que en castellano: «el auto comprado» → *das **gekaufte** Auto*. Y lleva terminación: *das gekauft Auto* está mal.",
                "tip": "Los verbos en *-ieren* no llevan *ge-*: *der reparierte Fernseher*, *das renovierte Haus*.",
                "q": [
                    q("¿Cómo decís «la puerta cerrada»?", "die geschlossene Tür", ["die geschlossene Tür", "die Tür geschlossene", "die schließende Tür"]),
                    q("Completá: *Wir wohnen in einem ___ Haus.* (renovieren)", "renovierten", ["renovierten", "renovierenden", "renoviertes"]),
                ],
            },
            {
                "h": "Partizip II con verbos de sein: activo y terminado",
                "r": "Con los verbos **intransitivos que hacen el Perfekt con *sein*** (cambio de estado, movimiento), el Partizip II tiene sentido **activo y terminado**: *der angekommene Zug* = el tren que llegó; *die gestiegenen Preise* = los precios que subieron.",
                "table": {"head": ["Infinitiv", "Perfekt", "Como adjetivo"], "rows": [
                    ["ankommen", "ist angekommen", "der angekommene Zug"],
                    ["einschlafen", "ist eingeschlafen", "das eingeschlafene Baby"],
                    ["fallen", "ist gefallen", "die gefallenen Blätter"],
                    ["steigen", "ist gestiegen", "die gestiegenen Mieten"],
                    ["verschwinden", "ist verschwunden", "der verschwundene Schlüssel"],
                ]},
                "ex": [
                    ["Leg das *eingeschlafene* Baby ins Bett.", "Acostá al bebé que se durmió."],
                    ["Die *gestiegenen* Mieten sind ein großes Problem.", "Los alquileres, que subieron, son un gran problema."],
                    ["Ich habe den *verschwundenen* Schlüssel gefunden.", "Encontré la llave que había desaparecido."],
                ],
                "warn": "Con verbos de *haben* **sin objeto** no funciona: «*der geschlafene Mann*» o «*die gearbeitete Frau*» no existen (*hat geschlafen*, *hat gearbeitet*). Ahí usás el Partizip I (*der schlafende Mann*) o una relativa.",
                "q": [
                    q("¿Cuál existe?", "das eingeschlafene Baby", ["das eingeschlafene Baby", "das geschlafene Baby", "das gearbeitete Baby"]),
                    q("*die gefallenen Blätter* son las hojas…", "que ya cayeron", ["que ya cayeron", "que están cayendo", "que alguien tiró"]),
                ],
            },
            {
                "h": "¿I o II? Mientras o después",
                "r": "La pregunta clave: ¿el sustantivo **hace** la acción y está pasando ahora? → **Partizip I**. ¿Le **hicieron** algo y ya está hecho (o, con verbos de *sein*, ya le pasó)? → **Partizip II**.",
                "table": {"head": ["Partizip I (en curso, activo)", "Partizip II (terminado)"], "rows": [
                    ["die kochende Suppe (está hirviendo)", "die gekochte Suppe (ya está cocida)"],
                    ["die steigenden Preise (siguen subiendo)", "die gestiegenen Preise (ya subieron)"],
                    ["der lesende Student (el que lee)", "das gelesene Buch (el libro leído)"],
                    ["die liebende Mutter (la madre que ama)", "die geliebte Mutter (la madre amada)"],
                ]},
                "ex": [
                    ["Vorsicht, *kochendes* Wasser!", "¡Cuidado, agua hirviendo!"],
                    ["Zum Frühstück esse ich ein *gekochtes* Ei.", "En el desayuno como un huevo duro (cocido)."],
                ],
                "warn": "«El libro leído» no puede ser *das lesende Buch*: el libro no lee. Preguntate siempre quién hace la acción.",
                "q": [
                    q("Completá: *Vorsicht, ___ Wasser!* (está hirviendo)", "kochendes", ["kochendes", "gekochtes", "kochende"]),
                    q("«la madre amada» es…", "die geliebte Mutter", ["die geliebte Mutter", "die liebende Mutter", "die geliebende Mutter"]),
                ],
            },
            {
                "h": "Participios sustantivados",
                "r": "Como cualquier adjetivo, el participio puede funcionar como **sustantivo**: lleva mayúscula, pero se declina **como adjetivo**. Por eso cambia según el artículo: *der Reisende*, pero *ein Reisender*. Muchos son palabras de todos los días.",
                "table": {"head": ["Con der / die", "Con ein / eine", "Plural", "Castellano"], "rows": [
                    ["der Reisende", "ein Reisender", "die Reisenden", "el viajero, el pasajero"],
                    ["der Vorsitzende", "ein Vorsitzender", "die Vorsitzenden", "el presidente (de una comisión)"],
                    ["der Angestellte", "ein Angestellter", "die Angestellten", "el empleado"],
                    ["die Verletzte", "eine Verletzte", "die Verletzten", "la herida"],
                    ["die Studierende", "eine Studierende", "die Studierenden", "la estudiante"],
                ]},
                "ex": [
                    ["Alle *Reisenden* müssen hier aussteigen.", "Todos los pasajeros tienen que bajar acá."],
                    ["Sie ist *Angestellte* bei einer Bank.", "Es empleada de un banco."],
                    ["Bei dem Unfall gab es zwei *Verletzte*.", "En el accidente hubo dos heridos."],
                    ["Der *Vorsitzende* eröffnet die Sitzung.", "El presidente abre la sesión."],
                    ["*Das Gesagte* bleibt unter uns.", "Lo dicho queda entre nosotros."],
                ],
                "warn": "*ein Angestellter*, pero *der Angestellte*: la terminación depende del artículo, igual que en *ein guter / der gute*. Y en plural sin artículo: *zwei Verletzte*, no «Verletzten». Pero *alle* funciona como *die*: *alle Reisenden*.",
                "tip": "*die Studierenden* (de *studieren*) se usa mucho en las universidades porque incluye a hombres y mujeres sin decir *Studentinnen und Studenten*.",
                "q": [
                    q("Completá: *Er ist ein ___.* (viajero)", "Reisender", ["Reisender", "Reisende", "Reisenden"]),
                    q("Completá: *Alle ___ müssen aussteigen.*", "Reisenden", ["Reisenden", "Reisende", "Reisender"]),
                ],
            },
            {
                "h": "El participio que dice cómo",
                "r": "Sin terminación y después del verbo, el participio funciona como **adverbio** y dice **cómo** se hace algo: *Sie kam lachend ins Zimmer*. Además, muchos participios ya son **adjetivos comunes**: *spannend, überraschend, überzeugend, auffallend, entscheidend*; *begeistert, verheiratet, interessiert, gespannt*.",
                "ex": [
                    ["Das Kind lief *weinend* zu seiner Mutter.", "El chico corrió llorando hacia su mamá."],
                    ["*Lachend* sagte er: „Natürlich!“", "Riéndose, dijo: «¡Claro!»."],
                    ["Sie hat sehr *überzeugend* argumentiert.", "Argumentó de forma muy convincente."],
                    ["Der Film war *spannend*.", "La película fue atrapante."],
                    ["Ich bin *gespannt*, wie der Film endet.", "Tengo intriga por saber cómo termina la película."],
                ],
                "warn": "*spannend* (Partizip I: la película **genera** tensión) ≠ *gespannt* (Partizip II: **yo** estoy expectante). Es la misma lógica que *interessant* / *interessiert*: *Der Film ist spannend; ich bin gespannt*.",
                "q": [
                    q("Completá: *Ich bin ___, wer gewinnt.*", "gespannt", ["gespannt", "spannend", "spannende"]),
                    q("*Sie kam lachend herein* significa…", "Entró riéndose.", ["Entró riéndose.", "Entró y después se rió.", "Entró a reírse."]),
                ],
            },
            {
                "h": "Describir un cuadro o un barrio",
                "r": "En la descripción de imágenes y de lugares, los participios te ahorran relativas. Combinalos con las palabras para ubicar: *im Vordergrund* (adelante), *im Hintergrund* (al fondo), *in der Mitte*, *links*, *rechts*, *oben*, *unten*.",
                "ex": [
                    ["*Im Vordergrund* sieht man eine *sitzende* Frau.", "Adelante se ve a una mujer sentada."],
                    ["Das Gemälde zeigt die *untergehende* Sonne.", "El cuadro muestra el sol poniéndose."],
                    ["*Im Hintergrund* steht ein *verlassenes* Haus.", "Al fondo hay una casa abandonada."],
                    ["Auf dem Platz steht ein *restaurierter* Brunnen.", "En la plaza hay una fuente restaurada."],
                    ["Die *renovierte* Fassade fällt sofort auf.", "La fachada renovada llama la atención enseguida."],
                ],
                "warn": "«Sentada» describe una posición actual, no algo que alguien le hizo: es *eine sitzende Frau* (Partizip I). «*eine gesessene Frau*» no existe: *sitzen* no tiene objeto ni es un cambio de estado.",
                "more": ["En la semana 36 el participio se estira con complementos: *die im Park spielenden Kinder* (los chicos que juegan en el parque). Todo va entre el artículo y el sustantivo."],
                "q": [
                    q("Completá: *Im Vordergrund sieht man eine ___ Frau.*", "sitzende", ["sitzende", "gesessene", "sitzender"]),
                    q("*im Hintergrund* es…", "al fondo", ["al fondo", "adelante", "en el medio"]),
                ],
            },
        ],
    },
    "vocab": [
        ["das Gemälde", "el cuadro, la pintura", "Das Gemälde zeigt eine lesende Frau."],
        ["der Vordergrund", "el primer plano", "Im Vordergrund sieht man einen schlafenden Hund."],
        ["der Hintergrund", "el fondo", "Im Hintergrund sieht man die Berge."],
        ["die Leinwand", "el lienzo; la pantalla (de cine)", "Der Maler malt auf einer großen Leinwand."],
        ["die Skulptur", "la escultura", "Im Park steht eine moderne Skulptur."],
        ["der Bildhauer", "el escultor", "Der Bildhauer arbeitet mit Stein und Holz."],
        ["darstellen", "representar, mostrar", "Das Bild stellt eine Szene am Hafen dar."],
        ["die Fassade", "la fachada", "Die renovierte Fassade fällt sofort auf."],
        ["der Brunnen", "la fuente; el pozo", "Auf dem Marktplatz steht ein alter Brunnen."],
        ["das Denkmal", "el monumento", "Vor dem Rathaus steht ein Denkmal."],
        ["die Kuppel", "la cúpula", "Die Kuppel des Doms sieht man von weitem."],
        ["untergehen", "ponerse (el sol); hundirse", "Im Winter geht die Sonne früh unter."],
        ["der Reisende", "el viajero, el pasajero", "Alle Reisenden müssen hier aussteigen."],
        ["überzeugend", "convincente", "Ihre Argumente waren sehr überzeugend."],
        ["auffallend", "llamativo", "Sie trug einen auffallenden Hut."],
        ["gespannt", "expectante, con intriga", "Ich bin gespannt, wie die Geschichte endet."],
    ],
    "items": [
        # parte 0 — Partizip I
        ch(0, "Elegí el Partizip I.", "lachen →", "lachend", ["lachend", "gelacht", "lachte"], "Partizip I = infinitivo + *d*."),
        ch(0, "Elegí la forma correcta.", "Weck den ___ Hund nicht!", "schlafenden", ["schlafenden", "schlafende", "geschlafenen"], "Acusativo masculino con *den*: *-en*. (*geschlafen* no sirve: *hat geschlafen*.)"),
        ch(0, "Elegí la forma correcta.", "Ein ___ Kind saß auf der Treppe.", "weinendes", ["weinendes", "weinende", "weinenden"], "Neutro con *ein*, nominativo: *-es*."),
        ch(0, "Elegí la forma correcta.", "Im ___ Jahr fahren wir nach Österreich.", "kommenden", ["kommenden", "kommende", "gekommenen"], "*im* = *in dem*: dativo → *-en*. *im kommenden Jahr* = el año que viene."),
        ch(0, "¿Qué significa?", "die steigenden Preise", "los precios que están subiendo", ["los precios que están subiendo", "los precios que ya subieron", "los precios que alguien subió"], "Partizip I: la acción sigue en curso."),
        ch(0, "Elegí la oración correcta.", "(Estoy leyendo.)", "Ich lese gerade.", ["Ich lese gerade.", "Ich bin lesend.", "Ich bin gelesen."], "El Partizip I no arma tiempos verbales."),
        ch(0, "Elegí la forma correcta.", "Im Park sahen wir ___ Kinder.", "spielende", ["spielende", "spielenden", "spielender"], "Plural sin artículo, acusativo: *-e*."),
        cz(0, "Escribí el Partizip I, sin terminación.", "singen → ___", "singend", note="Infinitivo + *d*."),
        cz(0, "Completá con el Partizip I de *lächeln*.", "Eine ___ Frau öffnete die Tür.", "lächelnde", note="*lächeln → lächelnd*; femenino con *eine*: *-e*."),
        cz(0, "Completá con el Partizip I de *schreien*.", "Der Vater trug das ___ Baby ins Bett.", "schreiende", note="Acusativo neutro con *das*: *-e*."),
        cz(0, "Completá con el Partizip I de *fahren*.", "Spring nie auf einen ___ Zug!", "fahrenden", note="Acusativo masculino con *einen*: *-en*."),
        cz(0, "Completá con el Partizip I de *folgen*.", "Lesen Sie bitte den ___ Text.", "folgenden", note="*der folgende Text* = el texto siguiente; acusativo: *den folgenden*."),
        tr(0, "el perro que duerme", "der schlafende Hund", _nc("der schlafende Hund", "der Hund, der schläft"), "Partizip I + terminación de adjetivo."),
        tr(0, "Un chico que lloraba estaba en la puerta.", "Ein weinendes Kind stand an der Tür.", ["Ein weinendes Kind stand an der Tür.", "Ein weinendes Kind stand vor der Tür.", "Ein weinender Junge stand an der Tür.", "Ein weinender Junge stand vor der Tür.", "An der Tür stand ein weinendes Kind.", "Vor der Tür stand ein weinendes Kind.", "Ein weinendes Kind stand in der Tür.", "In der Tür stand ein weinendes Kind.", "Ein weinender Junge stand in der Tür."], "*das Kind* con *ein*: *ein weinendes Kind*."),
        tr(0, "el año que viene", "das kommende Jahr", ["das kommende Jahr", "im kommenden Jahr", "nächstes Jahr", "das nächste Jahr"], "*kommend* = que viene, próximo."),
        ty(0, "Escribí el Partizip I.", "wissen →", "wissend", note="Sin excepciones: *wissen + d*. (*ein wissendes Lächeln* = una sonrisa cómplice.)"),
        # parte 1 — Partizip II
        ch(1, "Elegí la forma correcta.", "Das ___ Fahrrad ist wieder da. (stehlen)", "gestohlene", ["gestohlene", "stehlende", "gestohlenen"], "Lo robaron: pasivo y terminado → Partizip II. Nominativo neutro con *das*: *-e*."),
        ch(1, "Elegí la forma correcta.", "Wir wohnen in einem ___ Altbau. (renovieren)", "renovierten", ["renovierten", "renovierenden", "renovierter"], "Dativo con *einem*: *-en*. Verbo en *-ieren*: sin *ge-*."),
        ch(1, "Elegí la forma correcta.", "Ich habe den ___ Schlüssel gefunden. (verschwinden)", "verschwundenen", ["verschwundenen", "verschwindenden", "verschwundene"], "*ist verschwunden*: Partizip II activo; acusativo con *den*: *-en*."),
        ch(1, "¿Cuál es correcta?", "(el bebé que se durmió)", "das eingeschlafene Baby", ["das eingeschlafene Baby", "das geschlafene Baby", "das eingeschlafen Baby"], "*einschlafen* hace Perfekt con *sein*. *geschlafen* no sirve (*hat geschlafen*)."),
        ch(1, "¿Partizip I o II?", "Vorsicht, ___ Suppe! (está hirviendo)", "kochende", ["kochende", "gekochte", "kochend"], "Está pasando ahora: Partizip I; femenino sin artículo: *-e*."),
        ch(1, "¿Partizip I o II?", "Die ___ Mieten sind für viele ein Problem. (ya subieron)", "gestiegenen", ["gestiegenen", "steigenden", "gestiegene"], "Ya subieron: Partizip II de *steigen* (*ist gestiegen*)."),
        ch(1, "¿Qué significa?", "das gelesene Buch", "el libro leído", ["el libro leído", "el libro que lee", "el libro de lectura"], "Partizip II de un verbo con objeto: pasivo."),
        cz(1, "Completá con el Partizip II de *bestellen*.", "Ich habe die ___ Bücher abgeholt.", "bestellten", note="*bestellen* no lleva *ge-* (prefijo *be-*). Plural con *die*: *-en*."),
        cz(1, "Completá con el Partizip II de *schließen*.", "Er stand vor der ___ Tür.", "geschlossenen", note="*vor* + dativo (lugar): *vor der geschlossenen Tür*."),
        cz(1, "Completá con el Partizip II de *fallen*.", "Die Kinder spielen mit den ___ Blättern.", "gefallenen", note="*ist gefallen*: activo y terminado. Dativo plural: *-en*."),
        cz(1, "Completá con el Partizip II de *kochen*.", "Zum Frühstück esse ich ein ___ Ei.", "gekochtes", note="Neutro con *ein*, acusativo: *-es*."),
        cz(1, "Completá con el Partizip II de *reparieren*.", "Der ___ Fernseher funktioniert wieder.", "reparierte", note="Verbo en *-ieren*, sin *ge-*: *repariert*."),
        cz(1, "Completá con el participio de *lieben*.", "Sie ist eine ___ Mutter. (que ama mucho)", "liebende", note="Ella ama: activo → Partizip I."),
        tr(1, "la puerta cerrada", "die geschlossene Tür", ["die geschlossene Tür", "die verschlossene Tür"], "El participio va antes del sustantivo y con terminación."),
        tr(1, "el auto comprado", "das gekaufte Auto", ["das gekaufte Auto", "der gekaufte Wagen"], "Pasivo y terminado: Partizip II."),
        tr(1, "los precios que subieron", "die gestiegenen Preise", _nc("die gestiegenen Preise", "die Preise, die gestiegen sind"), "*steigen* hace Perfekt con *sein*: Partizip II activo."),
        # parte 2 — participios para describir
        ch(2, "Elegí la forma correcta.", "Alle ___ müssen hier aussteigen.", "Reisenden", ["Reisenden", "Reisende", "Reisender"], "*alle* funciona como *die*: terminación *-en*."),
        ch(2, "Elegí la forma correcta.", "Sie ist ___ bei einer Bank. (empleada)", "Angestellte", ["Angestellte", "Angestellter", "Angestellten"], "Femenino sin artículo: *-e*, como *eine Angestellte*."),
        ch(2, "Elegí la forma correcta.", "Bei dem Unfall gab es zwei ___.", "Verletzte", ["Verletzte", "Verletzten", "Verletzter"], "Plural sin artículo (*es gibt* + acusativo): *-e*."),
        ch(2, "¿spannend o gespannt?", "Ich bin ___, wie der Film endet.", "gespannt", ["gespannt", "spannend", "spannende"], "La persona está expectante: *gespannt*."),
        ch(2, "¿spannend o gespannt?", "Der Krimi ist wirklich ___.", "spannend", ["spannend", "gespannt", "gespannte"], "El libro genera tensión: *spannend*. Predicativo, sin terminación."),
        ch(2, "¿Qué significa?", "Sie kam lachend ins Zimmer.", "Entró riéndose a la habitación.", ["Entró riéndose a la habitación.", "Entró a la habitación para reírse.", "Se rió después de entrar."], "Participio sin terminación = adverbio: dice cómo."),
        ch(2, "Elegí la forma correcta.", "Im Vordergrund sieht man eine ___ Frau.", "sitzende", ["sitzende", "gesessene", "sitzender"], "Posición actual: Partizip I. «*gesessene*» no existe."),
        cz(2, "Completá con el Partizip I de *untergehen*.", "Das Bild zeigt die ___ Sonne.", "untergehende", note="*untergehen → untergehend*; acusativo femenino con *die*: *-e*."),
        cz(2, "Completá con el Partizip I de *überzeugen*.", "Sie hat sehr ___ argumentiert.", "überzeugend", note="Adverbio: sin terminación."),
        cz(2, "Escribí la palabra (al fondo).", "Im ___ sieht man Berge, ganz klein.", "Hintergrund", note="*im Hintergrund* = al fondo. " + MAY),
        cz(2, "Completá con el participio sustantivado de *vorsitzen*.", "Der ___ eröffnet die Sitzung.", "Vorsitzende", note="Con *der*: *-e*. Con *ein* sería *ein Vorsitzender*."),
        cz(2, "Completá con el Partizip II de *restaurieren*.", "Auf dem Platz steht ein ___ Brunnen.", "restaurierter", note="Masculino con *ein*, nominativo: *-er*."),
        tr(2, "Ella entró riéndose.", "Sie kam lachend herein.", ["Sie kam lachend herein.", "Sie kam lachend rein.", "Lachend kam sie herein.", "Sie ist lachend hereingekommen.", "Sie ist lachend reingekommen."], "Participio como adverbio, sin terminación."),
        tr(2, "El cuadro muestra a una mujer leyendo.", "Das Bild zeigt eine lesende Frau.", ["Das Bild zeigt eine lesende Frau.", "Das Gemälde zeigt eine lesende Frau.", "Das Bild stellt eine lesende Frau dar.", "Das Gemälde stellt eine lesende Frau dar."], "Partizip I: la mujer lee mientras la vemos."),
        ty(2, "Escribí en alemán, con artículo.", "«el cuadro (la pintura)»", "das Gemälde", note="*das Gemälde*, de *malen* (pintar). " + MAY),
        li(2, "Vordergrund", ["Vordergrund", "Hintergrund", "Vorgarten"], "*der Vordergrund* = el primer plano."),
    ],
}
