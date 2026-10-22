# -*- coding: utf-8 -*-
"""Semana 41 — Aufgrund der Krise (B2): preposiciones con genitivo del registro escrito, en la economía y la empresa."""
from itertools import product

from base import q, ch, li, cz, tr, ty, MAY  # noqa: F401


def _todas(*partes):
    """Todas las combinaciones de variantes, para los accept largos."""
    return [" ".join(p for p in c if p) for c in product(*partes)]


_DESPIDOS = _todas(
    ["Aufgrund der Krise", "Wegen der Krise", "Auf Grund der Krise"],
    ["hat", ],
    ["die Firma", "das Unternehmen"],
    ["200 Mitarbeiter", "200 Angestellte", "200 Beschäftigte", "zweihundert Mitarbeiter"],
    ["entlassen."],
) + _todas(
    ["Aufgrund der Krise", "Wegen der Krise"],
    ["entließ"],
    ["die Firma", "das Unternehmen"],
    ["200 Mitarbeiter.", "200 Angestellte.", "200 Beschäftigte."],
) + _todas(
    ["Die Firma", "Das Unternehmen"],
    ["hat aufgrund der Krise"],
    ["200 Mitarbeiter", "200 Angestellte", "200 Beschäftigte"],
    ["entlassen."],
)

_ANFRAGE = _todas(
    ["Bezüglich Ihrer Anfrage", "Hinsichtlich Ihrer Anfrage", "In Bezug auf Ihre Anfrage"],
    ["schicken", "senden", "übersenden"],
    ["wir Ihnen"],
    ["die Informationen.", "die Information.", "die Infos."],
)

_BONUS = _todas(
    ["Statt einer Gehaltserhöhung", "Anstatt einer Gehaltserhöhung"],
    ["bekam er", "erhielt er", "hat er"],
    ["einen Bonus"],
    ["", "bekommen", "erhalten"],
)
_BONUS = [s for s in _BONUS if (s.split()[3] == "hat") == (s.endswith("bekommen") or s.endswith("erhalten"))]

_BERICHT = _todas(
    ["Dem Bericht zufolge", "Laut Bericht", "Laut dem Bericht", "Laut des Berichts"],
    ["ist der Umsatz gesunken.", "sank der Umsatz.", "ist der Umsatz zurückgegangen.", "ging der Umsatz zurück.",
     "sind die Verkäufe gesunken.", "sanken die Verkäufe.", "ist der Absatz gesunken.", "sank der Absatz."],
)

WEEK = {
    "week": 41,
    "title": "Aufgrund der Krise",
    "level": "B2",
    "focus": "Los diarios económicos y los mails de empresa usan un puñado de preposiciones con genitivo que casi no se oyen en la calle: aufgrund, infolge, angesichts, hinsichtlich…",
    "fare": "Leer noticias de economía e informes de empresa, y escribir mails formales que expliquen causas, plazos y fuentes con precisión.",
    "tema": "Preposiciones con genitivo: aufgrund, infolge, angesichts (causa); hinsichtlich, bezüglich (tema); mittels, anstatt (medio y alternativa); innerhalb, außerhalb (tiempo y lugar); zufolge (fuente, con dativo); registro escrito y hablado",
    "keys": [
        "*aufgrund* = debido a; *infolge* = como consecuencia de; *angesichts* = ante, en vista de.",
        "*hinsichtlich / bezüglich* = en cuanto a; *mittels* = por medio de; *(an)statt* = en lugar de.",
        "*innerhalb / außerhalb* + genitivo; sin artículo, *innerhalb von*: *innerhalb von drei Tagen*.",
        "*zufolge* va **detrás** y con **dativo**: *dem Bericht zufolge*.",
        "Plural sin artículo ni adjetivo: *von* + dativo: *aufgrund von Problemen*.",
        "En la charla, *wegen dem Streik*; por escrito, *wegen des Streiks*.",
    ],
    "lesson": {
        "intro": "*Aufgrund der schwachen Nachfrage und angesichts steigender Zinsen hat die Geschäftsführung beschlossen …* Así arranca cualquier comunicado de empresa. Esta semana dominás esas preposiciones y el genitivo que las acompaña.",
        "parts": [
            {"h": "El genitivo y las preposiciones de causa", "blocks": [0, 1]},
            {"h": "Tema, medio y alternativa", "blocks": [2, 3, 7]},
            {"h": "Tiempo, lugar, fuentes y registro", "blocks": [4, 5, 6]},
        ],
        "blocks": [
            {
                "h": "Repaso: las formas del genitivo",
                "r": "Ya usaste *wegen, trotz* y *während*. Las preposiciones de esta semana piden el mismo caso: **genitivo**. Masculino y neutro llevan *des / eines* y el sustantivo suma **-s** (o **-es** si tiene una sílaba o termina en *-s, -z, -sch*). Femenino y plural, *der*. El adjetivo, casi siempre **-en**; sin artículo, el plural toma **-er**.",
                "table": {"head": ["Género", "Con artículo", "Sin artículo"], "rows": [
                    ["masculino", "des starken Wettbewerbs / eines Fehlers", "starken Wettbewerbs"],
                    ["femenino", "der hohen Inflation / einer Krise", "hoher Inflation"],
                    ["neutro", "des Unternehmens / eines Projekts", "schlechten Wetters"],
                    ["plural", "der steigenden Zinsen", "steigender Zinsen"],
                ]},
                "ex": [
                    ["aufgrund *des* hohen Umsatz*es*", "debido a la alta facturación"],
                    ["angesichts *der* steigend*en* Kosten", "ante el aumento de los costos"],
                    ["infolge *des* Streik*s*", "como consecuencia de la huelga"],
                ],
                "warn": "Si el plural no tiene ni artículo ni adjetivo, el genitivo no se nota y se usa **von** + dativo: *aufgrund von Lieferproblemen*, no «aufgrund Lieferprobleme». Lo mismo con *innerhalb von drei Monaten*.",
                "more": [
                    "Los masculinos débiles hacen el genitivo en *-n / -en*, sin *-s*: *des Kunden, des Konsumenten, des Kollegen*.",
                    "Sin artículo, el adjetivo masculino y neutro termina en *-en* (el *-s* ya está en el sustantivo): *angesichts starken Wettbewerbs*.",
                ],
                "q": [
                    q("Completá: *aufgrund ___ Krise*", "der", ["der", "die", "den"]),
                    q("Completá: *infolge des ___* (der Streik)", "Streiks", ["Streiks", "Streik", "Streiken"]),
                ],
            },
            {
                "h": "Causa: aufgrund, infolge, angesichts",
                "r": "Las tres expresan una causa, con matices. **aufgrund** (también *auf Grund*) es la causa neutra, «debido a», el *wegen* formal. **infolge** presenta un hecho como **consecuencia** de un acontecimiento: «a raíz de». **angesichts** es «ante», «en vista de»: una situación que hay que tener en cuenta, muchas veces antes de una decisión.",
                "table": {"head": ["Preposición", "Matiz", "Ejemplo"], "rows": [
                    ["aufgrund", "debido a (causa)", "Aufgrund der Krise wurden 200 Stellen gestrichen."],
                    ["infolge", "a raíz de (consecuencia de un hecho)", "Infolge des Brandes musste die Fabrik schließen."],
                    ["angesichts", "ante, en vista de", "Angesichts der hohen Inflation erhöht die Zentralbank die Zinsen."],
                ]},
                "ex": [
                    ["*Aufgrund* der schwachen Nachfrage produziert das Werk weniger.", "Debido a la baja demanda, la planta produce menos."],
                    ["*Infolge* der Pandemie sind viele Firmen in die Insolvenz gegangen.", "A raíz de la pandemia, muchas empresas quebraron."],
                    ["*Angesichts* des starken Wettbewerbs müssen wir die Preise senken.", "Ante la fuerte competencia, tenemos que bajar los precios."],
                ],
                "warn": "Después de estas preposiciones va el **genitivo**, no el dativo: *aufgrund des Wetters*, nunca «aufgrund dem Wetter».",
                "more": [
                    "*dank* (gracias a) va con genitivo o dativo: *dank des neuen Produkts / dank dem neuen Produkt*.",
                    "El adverbio *infolgedessen* = «como consecuencia (de eso)», al principio de la oración: *Infolgedessen sank der Gewinn.*",
                ],
                "q": [
                    q("«Ante la crisis, la empresa decidió ahorrar»: *___ der Krise beschloss die Firma zu sparen.*", "Angesichts", ["Angesichts", "Anstatt", "Hinsichtlich"]),
                    q("«A raíz del incendio, la fábrica cerró»: *___ des Brandes wurde die Fabrik geschlossen.*", "Infolge", ["Infolge", "Mittels", "Bezüglich"]),
                ],
            },
            {
                "h": "Tema: hinsichtlich, bezüglich",
                "r": "**hinsichtlich** y **bezüglich** significan «en cuanto a», «respecto de». *bezüglich* es el clásico de los mails y cartas comerciales (abreviado **bzgl.**); *hinsichtlich* suena más abstracto, de informe. En registro más neutro: *in Bezug auf* + acusativo.",
                "ex": [
                    ["*Bezüglich* Ihrer Anfrage vom 3. Mai teilen wir Ihnen mit, dass …", "Respecto de su consulta del 3 de mayo, le informamos que …"],
                    ["*Hinsichtlich* der Kosten gibt es noch offene Fragen.", "En cuanto a los costos, todavía hay preguntas abiertas."],
                    ["Die Produkte unterscheiden sich *hinsichtlich* ihrer Qualität.", "Los productos se diferencian en (cuanto a) su calidad."],
                    ["*In Bezug auf* den Preis sind wir flexibel.", "En cuanto al precio, somos flexibles."],
                ],
                "warn": "*bzgl.* (bezüglich) no es lo mismo que *bzw.* (*beziehungsweise* = o bien, respectivamente). Las dos abreviaturas aparecen en los mismos mails.",
                "tip": "En un mail, *Bezüglich Ihrer Anfrage …* abre con elegancia. En la charla decís simplemente *Wegen deiner Frage …* o *Zu deiner Frage …*",
                "q": [
                    q("*bzgl.* es la abreviatura de…", "bezüglich", ["bezüglich", "beziehungsweise", "beispielsweise"]),
                    q("Completá: *Bezüglich ___ Termins melde ich mich morgen.*", "des", ["des", "dem", "den"]),
                ],
            },
            {
                "h": "Medio y alternativa: mittels, anstatt",
                "r": "**mittels** = «por medio de», «mediante»; es técnico y formal (más neutro: *mithilfe* + genitivo o *mit*). **anstatt** o **statt** = «en lugar de», con genitivo. Para un verbo, **(an)statt … zu** + infinitivo; y con otro sujeto, **(an)statt dass**.",
                "ex": [
                    ["Die Zahlung erfolgt *mittels* Überweisung.", "El pago se realiza mediante transferencia."],
                    ["Die Daten werden *mittels* einer Software ausgewertet.", "Los datos se evalúan por medio de un software."],
                    ["*Statt* einer Gehaltserhöhung bekam er einen Bonus.", "En lugar de un aumento de sueldo, recibió un bono."],
                    ["*Anstatt* zu investieren, hat die Firma nur gespart.", "En lugar de invertir, la empresa solo ahorró."],
                    ["*Anstatt dass* die Chefs sparen, müssen die Angestellten verzichten.", "En vez de que ahorren los jefes, tienen que renunciar los empleados."],
                ],
                "warn": "Con *anstatt … zu*, el infinitivo con *zu* va al final, como con *um … zu*: *Anstatt das Problem zu lösen, …* Y con separables, *zu* en el medio: *anstatt anzurufen*.",
                "more": ["*stattdessen* (adverbio) = «en cambio», «en su lugar»: *Die Firma hat nicht investiert. Stattdessen hat sie Schulden abbezahlt.*"],
                "q": [
                    q("«Mediante una aplicación»: ___ einer App", "mittels", ["mittels", "infolge", "hinsichtlich"]),
                    q("Completá: *Anstatt die Preise ___ senken, erhöht die Firma sie.*", "zu", ["zu", "um", "dass"]),
                ],
            },
            {
                "h": "Tiempo y lugar: innerhalb, außerhalb",
                "r": "**innerhalb** = «dentro de» y **außerhalb** = «fuera de», tanto en el **espacio** como en el **tiempo**. Con genitivo; si el sustantivo no tiene artículo (típico con números), se usa **von** + dativo.",
                "table": {"head": ["Uso", "Ejemplo"], "rows": [
                    ["tiempo", "innerhalb eines Jahres / innerhalb von zwei Wochen"],
                    ["tiempo", "außerhalb der Geschäftszeiten"],
                    ["lugar", "innerhalb des Unternehmens / außerhalb der EU"],
                ]},
                "ex": [
                    ["Der Umsatz hat sich *innerhalb* eines Jahres verdoppelt.", "La facturación se duplicó en el plazo de un año."],
                    ["Die Rechnung ist *innerhalb von* 30 Tagen zu bezahlen.", "La factura debe pagarse dentro de los 30 días."],
                    ["*Außerhalb* der Geschäftszeiten ist niemand erreichbar.", "Fuera del horario comercial no hay nadie disponible."],
                    ["Der neue Standort liegt *außerhalb* der Stadt.", "La nueva sede está fuera de la ciudad."],
                ],
                "warn": "«Dentro de tres días» como plazo **máximo** es *innerhalb von drei Tagen*; si querés decir «dentro de tres días» como momento futuro («de acá a tres días»), es *in drei Tagen*.",
                "q": [
                    q("Completá: *innerhalb ___ drei Monaten*", "von", ["von", "der", "des"]),
                    q("«Fuera de la UE»:", "außerhalb der EU", ["außerhalb der EU", "außerhalb die EU", "außer der EU"]),
                ],
            },
            {
                "h": "Fuentes: zufolge, laut",
                "r": "**zufolge** = «según» y es especial: va **detrás** del sustantivo y pide **dativo**: *dem Bericht zufolge*. **laut** (según) va delante, con dativo o genitivo, y muchas veces sin artículo: *laut Statistik, laut Angaben der Firma*. Las dos citan una fuente: el que habla no se hace responsable, como con *soll*.",
                "ex": [
                    ["*Dem Bericht zufolge* ist der Gewinn um 5 % gestiegen.", "Según el informe, la ganancia subió un 5 %."],
                    ["*Experten zufolge* droht eine Rezession.", "Según los expertos, amenaza una recesión."],
                    ["*Laut* Statistik ist die Arbeitslosigkeit gesunken.", "Según las estadísticas, el desempleo bajó."],
                    ["*Laut* Angaben der Geschäftsführung soll der Standort erhalten bleiben.", "Según la gerencia, la sede se mantendría."],
                ],
                "warn": "«Según el informe» no es «zufolge des Berichts» sino *dem Bericht zufolge*: es la gran excepción de la semana, la preposición del registro escrito que **no** lleva genitivo (salvo cuando va delante, algo raro y muy formal).",
                "tip": "*laut* también es «fuerte» (de volumen): *Die Musik ist laut*. Delante de un sustantivo y sin verbo cerca, es «según».",
                "q": [
                    q("Completá: *___ Bericht zufolge …*", "Dem", ["Dem", "Des", "Den"]),
                    q("¿Dónde va *zufolge*?", "detrás del sustantivo", ["detrás del sustantivo", "delante del artículo", "al final de la oración"]),
                ],
            },
            {
                "h": "Registro: lo escrito y lo hablado",
                "r": "Estas preposiciones son del **registro escrito**: en una charla suenan acartonadas. En la lengua hablada, incluso *wegen, trotz, statt* aparecen con **dativo** (*wegen dem Streik*), algo aceptado en lo oral pero no en un texto formal. Para escribir bien, combiná: preposición + genitivo + sustantivo (el estilo nominal de la semana 38).",
                "table": {"head": ["Hablado", "Escrito"], "rows": [
                    ["Weil die Krise da ist, …", "Aufgrund der Krise …"],
                    ["wegen dem Streik", "wegen des Streiks / infolge des Streiks"],
                    ["Was die Kosten angeht, …", "Hinsichtlich der Kosten …"],
                    ["Wie die Zeitung schreibt, …", "Der Zeitung zufolge …"],
                    ["Statt dass wir investieren, …", "Statt einer Investition …"],
                ]},
                "ex": [
                    ["Weil die Zinsen gestiegen sind, investieren die Firmen weniger.", "Como subieron las tasas, las empresas invierten menos. (verbal)"],
                    ["*Aufgrund der gestiegenen Zinsen* investieren die Firmen weniger.", "Debido a la suba de las tasas, las empresas invierten menos. (nominal)"],
                ],
                "warn": "*wegen dem* en un examen escrito o un mail formal es un error de registro. Y no exageres en la charla: decir *angesichts* en un asado suena a noticiero.",
                "q": [
                    q("¿Cuál es la forma del registro escrito?", "wegen des Streiks", ["wegen des Streiks", "wegen dem Streik", "wegen der Streik"]),
                    q("*Weil die Nachfrage sinkt* → ___ der sinkenden Nachfrage", "Aufgrund", ["Aufgrund", "Anstatt", "Trotz"]),
                ],
            },
            {
                "h": "Sin hacer, sin que: ohne … zu y ohne dass",
                "r": "*ohne* no es solo preposición (*ohne Geld*). Con un verbo funciona como *um … zu* y *anstatt … zu*: si el sujeto es **el mismo**, **ohne … zu** + infinitivo al final; si es **otro**, **ohne dass** + verbo conjugado al final.",
                "table": {"head": ["Mismo sujeto", "Otro sujeto"], "rows": [
                    ["um … zu (para)", "damit (para que)"],
                    ["ohne … zu (sin)", "ohne dass (sin que)"],
                    ["(an)statt … zu (en lugar de)", "(an)statt dass (en lugar de que)"],
                ]},
                "ex": [
                    ["Er ging, *ohne* etwas *zu sagen*.", "Se fue sin decir nada."],
                    ["Er ging, *ohne dass* es jemand *merkte*.", "Se fue sin que nadie lo notara."],
                    ["Die Firma hat die Preise erhöht, *ohne* die Kunden *zu informieren*.", "La empresa subió los precios sin informar a los clientes."],
                    ["Die Preise wurden erhöht, *ohne dass* die Kunden informiert wurden.", "Se subieron los precios sin que se informara a los clientes."],
                ],
                "warn": "«Sin decir» no es «ohne sagen»: falta el *zu*, *ohne etwas zu sagen*. Y «sin que nadie lo **notara**» va en **indicativo**: *ohne dass es jemand merkte*, nada de subjuntivo. Con separables, *zu* en el medio: *ohne anzurufen*.",
                "tip": "*ohne dass* ya es negativo: no agregues *nicht*. *ohne dass er es merkte* = sin que lo notara.",
                "q": [
                    q("«Se fue sin saludar»:", "Er ging, ohne zu grüßen.", ["Er ging, ohne zu grüßen.", "Er ging, ohne grüßen.", "Er ging, ohne dass grüßen."]),
                    q("«Entró sin que lo viéramos»:", "Er kam herein, ohne dass wir ihn sahen.", ["Er kam herein, ohne dass wir ihn sahen.", "Er kam herein, ohne uns ihn zu sehen.", "Er kam herein, ohne dass wir ihn nicht sahen."]),
                    q("«Para que» (otro sujeto) es…", "damit", ["damit", "um … zu", "ohne dass"]),
                ],
            },
        ],
    },
    "vocab": [
        ["der Umsatz", "la facturación, las ventas", "Der Umsatz ist im letzten Quartal gestiegen."],
        ["der Gewinn", "la ganancia", "Die Firma hat einen Gewinn von zwei Millionen gemacht."],
        ["der Verlust", "la pérdida", "Aufgrund hoher Kosten macht das Werk Verluste."],
        ["die Nachfrage", "la demanda", "Die Nachfrage nach Elektroautos wächst."],
        ["die Konjunktur", "la coyuntura económica", "Die Konjunktur schwächt sich ab."],
        ["die Inflation", "la inflación", "Angesichts der hohen Inflation sparen viele Menschen."],
        ["der Zinssatz", "la tasa de interés", "Die Zentralbank hat den Zinssatz erhöht."],
        ["der Wettbewerb", "la competencia (económica)", "Der Wettbewerb in der Branche ist hart."],
        ["die Branche", "el rubro, el sector", "In welcher Branche arbeiten Sie?"],
        ["der Standort", "la sede, la ubicación (de una planta)", "Die Firma will den Standort in Bremen schließen."],
        ["die Geschäftsführung", "la gerencia, la dirección", "Die Geschäftsführung hat einen Sparplan vorgelegt."],
        ["der Zulieferer", "el proveedor (de piezas)", "Infolge des Streiks beim Zulieferer stehen die Bänder still."],
        ["die Bilanz", "el balance", "Die Bilanz des Jahres ist positiv."],
        ["die Insolvenz", "la quiebra, la insolvencia", "Das Unternehmen hat Insolvenz angemeldet."],
        ["entlassen", "despedir (a empleados)", "Die Firma musste 200 Mitarbeiter entlassen."],
        ["investieren", "invertir", "Wir investieren in neue Technologien."],
    ],
    "items": [
        # parte 0 — genitivo y causa
        ch(0, "Elegí el artículo.", "Aufgrund ___ Krise sparen viele Firmen.", "der", ["der", "die", "den"], "*die Krise* → genitivo *der Krise*."),
        ch(0, "Elegí la forma.", "Infolge ___ ist die Produktion gestoppt. (der Streik)", "des Streiks", ["des Streiks", "dem Streik", "der Streik"], "Masculino: *des* + *-s*."),
        ch(0, "Elegí la forma.", "Angesichts ___ Wettbewerbs müssen wir sparen.", "des starken", ["des starken", "dem starken", "der starken"], "Genitivo masculino: *des starken Wettbewerbs*."),
        ch(0, "Elegí la forma.", "Aufgrund ___ kam die Lieferung zu spät.", "technischer Probleme", ["technischer Probleme", "technischen Problemen", "technische Probleme"], "Plural sin artículo con adjetivo: genitivo en *-er*."),
        ch(0, "Elegí la forma correcta.", "(debido a problemas de entrega)", "aufgrund von Lieferproblemen", ["aufgrund von Lieferproblemen", "aufgrund Lieferprobleme", "aufgrund Lieferproblemen"], "Plural sin artículo ni adjetivo: *von* + dativo."),
        ch(0, "Elegí la preposición.", "(Ante la crisis, la empresa decidió ahorrar.) ___ der Krise beschloss die Firma zu sparen.", "Angesichts", ["Angesichts", "Infolge", "Anstatt"], "«Ante», antes de decidir: *angesichts*."),
        ch(0, "Elegí la preposición.", "(A raíz del incendio, la fábrica cerró.) ___ des Brandes wurde die Fabrik geschlossen.", "Infolge", ["Infolge", "Angesichts", "Hinsichtlich"], "Consecuencia de un hecho: *infolge*."),
        cz(0, "Escribí el artículo.", "Aufgrund ___ schlechten Wetters fällt die Messe aus.", "des", note="*das Wetter* → *des schlechten Wetters*."),
        cz(0, "Escribí el artículo.", "Infolge ___ Inflation sind die Preise gestiegen.", "der", note="*die Inflation* → *der Inflation*."),
        cz(0, "Escribí el artículo.", "Angesichts ___ steigenden Zinsen investieren die Firmen weniger.", "der", note="Plural con artículo: *der steigenden Zinsen*."),
        cz(0, "Escribí la terminación.", "Aufgrund des hohen Umsatz___ zahlt die Firma einen Bonus.", "es", note="Termina en *-z*: *des Umsatzes*."),
        cz(0, "Escribí la terminación.", "Aufgrund eines Fehler___ im System war der Shop offline.", "s", note="*der Fehler* → *eines Fehlers*."),
        ty(0, "Escribí el genitivo singular con artículo definido.", "der Kunde →", "des Kunden", note="Masculino débil: *-n*, sin *-s*."),
        # parte 0 — repaso: masculinos con -n y declinación del adjetivo
        cz(0, "Escribí la forma de *der Präsident*.", "Aufgrund der Rede des ___ stiegen die Kurse.", "Präsidenten", ["Präsidenten", "Praesidenten"], "Masculino con *-n* (semana 13): fuera del nominativo, *Präsidenten*, también en genitivo. «des Präsidents» es un error frecuente. " + MAY),
        ch(0, "Encontrá el error.", "¿Qué oración tiene un error?", "Die Firma hat dem Kunde ein neues Angebot gemacht.", ["Die Firma hat dem Kunde ein neues Angebot gemacht.", "Die Firma hat dem Kunden ein neues Angebot gemacht.", "Der Kunde hat ein neues Angebot bekommen."], "Dativo de *der Kunde*: *dem Kunden*. Solo el sujeto queda sin *-n*."),
        ch(0, "Elegí la terminación.", "Wegen eines unerwartet___ Rückgangs der Nachfrage …", "unerwarteten", ["unerwarteten", "unerwartetes", "unerwarteter"], "En genitivo con artículo (también *eines*), el adjetivo va siempre en *-en*."),
        cz(0, "Escribí *stark* con su terminación.", "Trotz ___ Konkurrenz wächst das Unternehmen.", "starker", note="Sin artículo, genitivo femenino (*der Konkurrenz*): el adjetivo toma la marca del artículo, *-er*."),
        cz(0, "Escribí *neu* con su terminación.", "Das Unternehmen hat einen ___ Standort in Polen eröffnet.", "neuen", note="Acusativo masculino tras *einen*: *-en*."),
        ty(0, "Reescribí con *aufgrund*.", "Weil die Nachfrage gesunken ist, produziert die Firma weniger.", "Aufgrund der gesunkenen Nachfrage produziert die Firma weniger.", ["Aufgrund der gesunkenen Nachfrage produziert die Firma weniger.", "Die Firma produziert aufgrund der gesunkenen Nachfrage weniger.", "Aufgrund des Rückgangs der Nachfrage produziert die Firma weniger.", "Die Firma produziert aufgrund des Rückgangs der Nachfrage weniger.", "Auf Grund der gesunkenen Nachfrage produziert die Firma weniger."], "*weil* → *aufgrund* + genitivo; el participio (*gesunken*) se vuelve adjetivo."),
        tr(0, "Debido a la crisis, la empresa despidió a 200 empleados.", _DESPIDOS[0], _DESPIDOS, "*aufgrund* + genitivo; después, verbo en posición 2."),
        li(0, "angesichts", ["angesichts", "anstatt", "abseits"], "*angesichts* = ante, en vista de."),
        # parte 1 — hinsichtlich, bezüglich, mittels, anstatt
        ch(1, "Elegí la preposición.", "___ Ihrer Anfrage vom 3. Mai teilen wir Ihnen mit, dass …", "Bezüglich", ["Bezüglich", "Mittels", "Anstatt"], "«Respecto de su consulta»: *bezüglich*, el clásico de los mails."),
        ch(1, "Elegí la preposición.", "Die Daten werden ___ einer Software ausgewertet.", "mittels", ["mittels", "hinsichtlich", "infolge"], "«Por medio de»: *mittels*."),
        ch(1, "Elegí la preposición.", "Er nahm den Zug ___ des Flugzeugs.", "statt", ["statt", "bezüglich", "mittels"], "«En lugar de»: *(an)statt*."),
        ch(1, "¿Qué significa?", "Anstatt zu investieren, hat die Firma gespart.", "En lugar de invertir, la empresa ahorró.", ["En lugar de invertir, la empresa ahorró.", "Para invertir, la empresa ahorró.", "Aunque invirtió, la empresa ahorró."], "*anstatt … zu* = en lugar de + infinitivo."),
        ch(1, "¿Qué significa?", "Hinsichtlich der Kosten gibt es noch Fragen.", "En cuanto a los costos, todavía hay preguntas.", ["En cuanto a los costos, todavía hay preguntas.", "A pesar de los costos, todavía hay preguntas.", "Por los costos, ya no hay preguntas."], "*hinsichtlich* = en cuanto a."),
        ch(1, "¿Qué significa la abreviatura?", "bzgl.", "bezüglich", ["bezüglich", "beziehungsweise", "beispielsweise"], "*bzgl.* = bezüglich; *bzw.* = beziehungsweise."),
        cz(1, "Escribí el artículo.", "Bezüglich ___ Termins melde ich mich morgen.", "des", note="*der Termin* → *des Termins*."),
        cz(1, "Escribí el artículo.", "Die Produkte unterscheiden sich hinsichtlich ___ Qualität.", "der", note="*die Qualität* → *der Qualität*."),
        cz(1, "Escribí la preposición (mediante).", "Die Zahlung erfolgt ___ Überweisung.", "mittels", note="*mittels* = mediante; aquí sin artículo."),
        cz(1, "Escribí la palabra que falta.", "Anstatt das Problem ___ lösen, diskutieren sie stundenlang.", "zu", note="*anstatt … zu* + infinitivo al final."),
        cz(1, "Escribí el infinitivo con *zu* de *anrufen*.", "Anstatt ___, schrieb er eine lange E-Mail.", "anzurufen", note="Separable: *zu* en el medio, *anzurufen*."),
        ty(1, "Reescribí con *anstatt … zu*.", "Er hat nicht gespart, sondern alles ausgegeben.", "Anstatt zu sparen, hat er alles ausgegeben.", ["Anstatt zu sparen, hat er alles ausgegeben.", "Anstatt zu sparen hat er alles ausgegeben.", "Statt zu sparen, hat er alles ausgegeben.", "Statt zu sparen hat er alles ausgegeben.", "Er hat alles ausgegeben, anstatt zu sparen.", "Er hat alles ausgegeben, statt zu sparen.", "Er hat alles ausgegeben anstatt zu sparen.", "Er hat alles ausgegeben statt zu sparen."], "*anstatt zu* + infinitivo; si va primero, el verbo principal sigue enseguida."),
        ty(1, "Reescribí con *hinsichtlich*.", "in Bezug auf den Preis", "hinsichtlich des Preises", ["hinsichtlich des Preises", "bezüglich des Preises"], "*in Bezug auf* + acusativo → *hinsichtlich* + genitivo."),
        tr(1, "Respecto de su consulta, le enviamos la información.", _ANFRAGE[0], _ANFRAGE, "*Bezüglich* + genitivo: *Ihrer Anfrage*; después, verbo segundo."),
        tr(1, "En lugar de un aumento de sueldo, recibió un bono.", _BONUS[0], _BONUS, "*(an)statt* + genitivo: *einer Gehaltserhöhung*."),
        li(1, "hinsichtlich", ["hinsichtlich", "hoffentlich", "höchstens"], "*hinsichtlich* = en cuanto a."),
        # parte 2 — innerhalb, außerhalb, zufolge, laut, registro
        ch(2, "Elegí la preposición.", "___ der Öffnungszeiten ist das Büro geschlossen.", "Außerhalb", ["Außerhalb", "Innerhalb", "Infolge"], "«Fuera del horario»: *außerhalb*."),
        ch(2, "Elegí la preposición.", "Die Lieferung erfolgt ___ einer Woche.", "innerhalb", ["innerhalb", "außerhalb", "angesichts"], "Plazo máximo: *innerhalb*."),
        ch(2, "Elegí la palabra.", "Sie müssen innerhalb ___ drei Monaten antworten.", "von", ["von", "der", "des"], "Sin artículo (número): *innerhalb von* + dativo."),
        ch(2, "Elegí la palabra.", "Dem Bericht ___ ist der Umsatz gestiegen.", "zufolge", ["zufolge", "laut", "aufgrund"], "*zufolge* va detrás, con dativo."),
        ch(2, "Elegí el artículo.", "___ Bericht zufolge droht eine Rezession.", "Dem", ["Dem", "Des", "Den"], "*zufolge* pide dativo."),
        ch(2, "¿Cuál es la forma del registro escrito?", "(debido a la huelga)", "wegen des Streiks", ["wegen des Streiks", "wegen dem Streik", "wegen der Streik"], "Por escrito, *wegen* + genitivo."),
        ch(2, "¿Qué significa?", "Der Gewinn sank. Infolgedessen wurden Stellen gestrichen.", "Como consecuencia, se recortaron puestos.", ["Como consecuencia, se recortaron puestos.", "A pesar de eso, se recortaron puestos.", "En lugar de eso, se recortaron puestos."], "*infolgedessen* = como consecuencia (de eso)."),
        cz(2, "Escribí el artículo.", "Außerhalb ___ EU gelten andere Regeln.", "der", note="*die EU* → *außerhalb der EU*."),
        cz(2, "Escribí el artículo.", "Innerhalb ___ Unternehmens gibt es Streit.", "des", note="*das Unternehmen* → *des Unternehmens*."),
        cz(2, "Escribí la preposición (según, detrás).", "Den neuesten Zahlen ___ wächst die Wirtschaft wieder.", "zufolge", note="Dativo plural + *zufolge*."),
        cz(2, "Escribí la preposición (según, delante).", "___ Statistik ist die Arbeitslosigkeit gesunken.", "Laut", ["laut"], "*laut* va delante, muchas veces sin artículo."),
        ty(2, "Pasá al registro escrito.", "wegen dem Regen", "wegen des Regens", note="*der Regen* → genitivo *des Regens*."),
        ty(2, "Reescribí con *zufolge*.", "Laut der Zeitung will die Firma den Standort schließen.", "Der Zeitung zufolge will die Firma den Standort schließen.", note="*laut der Zeitung* → *der Zeitung zufolge* (dativo, detrás)."),
        ty(2, "Reescribí con *innerhalb*.", "Sie müssen die Rechnung in den nächsten 30 Tagen bezahlen.", "Sie müssen die Rechnung innerhalb von 30 Tagen bezahlen.", ["Sie müssen die Rechnung innerhalb von 30 Tagen bezahlen.", "Sie müssen die Rechnung innerhalb der nächsten 30 Tage bezahlen.", "Sie müssen die Rechnung innerhalb von dreißig Tagen bezahlen."], "Número sin artículo: *innerhalb von*; con artículo, genitivo: *innerhalb der nächsten 30 Tage*."),
        tr(2, "Según el informe, la facturación bajó.", _BERICHT[0], _BERICHT, "*Dem Bericht zufolge* o *laut (dem) Bericht*; después, verbo segundo."),
        tr(2, "Fuera del horario comercial no hay nadie.", "Außerhalb der Geschäftszeiten ist niemand da.", ["Außerhalb der Geschäftszeiten ist niemand da.", "Außerhalb der Öffnungszeiten ist niemand da.", "Außerhalb der Geschäftszeiten ist keiner da.", "Außerhalb der Öffnungszeiten ist keiner da.", "Außerhalb der Geschäftszeiten ist niemand erreichbar.", "Außerhalb der Öffnungszeiten ist niemand erreichbar.", "Außerhalb der Geschäftszeiten ist niemand im Büro.", "Außerhalb der Öffnungszeiten ist niemand im Büro."], "*außerhalb* + genitivo plural: *der Geschäftszeiten*."),
        li(2, "infolgedessen", ["infolgedessen", "stattdessen", "trotzdem"], "*infolgedessen* = como consecuencia de eso."),
        # parte 1 — ohne … zu / ohne dass, mezclado con um … zu y anstatt … zu
        ch(1, "Elegí la forma correcta.", "Er hat gekündigt, ohne mit seinem Chef ___.", "zu sprechen", ["zu sprechen", "sprechen", "dass er spricht"], "Mismo sujeto (él renuncia, él no habla) → *ohne … zu* + infinitivo. «Sin hablar» no es «ohne sprechen»: falta el *zu*."),
        ch(1, "Elegí la forma correcta.", "Die Firma hat Stellen gestrichen, ___ die Gewerkschaft davon wusste.", "ohne dass", ["ohne dass", "ohne zu", "ohne"], "Otro sujeto (la empresa / el sindicato) → *ohne dass* + verbo al final. En indicativo: *wusste*, aunque nuestro «sin que lo supiera» vaya en subjuntivo."),
        ch(1, "Elegí la conjunción.", "(Para renovar el departamento.) Sie hat einen Kredit aufgenommen, ___ ihre Wohnung zu renovieren.", "um", ["um", "ohne", "anstatt"], "Finalidad: *um … zu* (para renovar)."),
        ch(1, "Elegí la conjunción.", "(Se fue sin despedirse.) Er ist nach Hause gegangen, ___ sich zu verabschieden.", "ohne", ["ohne", "um", "damit"], "«Sin despedirse»: *ohne … zu*. *um … zu* diría «para despedirse», que no tiene sentido si se fue."),
        cz(1, "Escribí *ohne dass* u *ohne … zu* (solo la palabra o las palabras que faltan).", "Der Vertrag wurde geändert, ___ wir informiert wurden.", "ohne dass", note="Otro sujeto (*wir*) y verbo conjugado al final → *ohne dass*."),
        cz(1, "Escribí el infinitivo con *zu* de *anrufen*.", "Sie kam einfach vorbei, ohne vorher ___.", "anzurufen", note="*ohne … zu* con separable: *zu* en el medio, *anzurufen*."),
        tr(1, "Se fue sin decir nada.", "Er ging, ohne etwas zu sagen.", ["Er ging, ohne etwas zu sagen.", "Er ist gegangen, ohne etwas zu sagen.", "Sie ging, ohne etwas zu sagen.", "Sie ist gegangen, ohne etwas zu sagen.", "Er ging, ohne ein Wort zu sagen.", "Er ist gegangen, ohne ein Wort zu sagen.", "Er ging weg, ohne etwas zu sagen.", "Er ist weggegangen, ohne etwas zu sagen."], "«Sin + infinitivo» = *ohne … zu*, con el infinitivo al final. Nunca «ohne sagen»."),
        tr(1, "Firmó el contrato sin que el abogado lo leyera.", "Er unterschrieb den Vertrag, ohne dass der Anwalt ihn las.", ["Er unterschrieb den Vertrag, ohne dass der Anwalt ihn las.", "Er hat den Vertrag unterschrieben, ohne dass der Anwalt ihn gelesen hat.", "Er unterschrieb den Vertrag, ohne dass der Anwalt ihn gelesen hatte.", "Sie unterschrieb den Vertrag, ohne dass der Anwalt ihn las.", "Sie hat den Vertrag unterschrieben, ohne dass der Anwalt ihn gelesen hat.", "Er hat den Vertrag unterschrieben, ohne dass ihn der Anwalt gelesen hat.", "Er unterschrieb den Vertrag, ohne dass ihn der Anwalt las."], "Otro sujeto (el abogado) → *ohne dass*, verbo al final y en **indicativo** (*las*), no un subjuntivo como «leyera»."),
        ty(1, "Uní con *ohne … zu* u *ohne dass* (lo que corresponda).", "Er hat das Geld investiert. Er hat sich nicht informiert.", "Er hat das Geld investiert, ohne sich zu informieren.", ["Er hat das Geld investiert, ohne sich zu informieren.", "Er hat das Geld investiert, ohne sich vorher zu informieren."], "Mismo sujeto → *ohne … zu*. El *nicht* desaparece: *ohne* ya es la negación."),
        # parte 2 — repaso de la prensa (semanas 35 y 37): soll, will y Konjunktiv I con fuentes
        ch(2, "¿Qué significa?", "Der Minister soll Geld von der Firma angenommen haben.", "Dicen que el ministro aceptó dinero de la empresa.", ["Dicen que el ministro aceptó dinero de la empresa.", "El ministro tiene que aceptar dinero de la empresa.", "El ministro asegura haber aceptado dinero de la empresa."], "*soll* + infinitivo perfecto = rumor sobre el pasado, lo dicen otros. Como nuestro condicional de prensa: «habría aceptado»."),
        ch(2, "Elegí el modal.", "(Él dice que no sabía nada, pero nadie le cree.) Der Chef ___ von nichts gewusst haben.", "will", ["will", "soll", "muss"], "Lo afirma el propio sujeto y el hablante duda: *will*. *soll* sería lo que dicen otros."),
        cz(2, "Escribí la forma de *sein* en Konjunktiv I.", "Laut Polizei ___ der Täter ins Ausland geflohen.", "sei", note="Discurso indirecto de prensa: Konjunktiv I, *sei* (+ *geflohen*, que va con *sein*)."),
        cz(2, "Escribí la forma de *haben* en Konjunktiv I.", "Dem Sprecher zufolge ___ die Firma keine Fehler gemacht.", "habe", note="*er/sie hat* → Konjunktiv I *habe*: la empresa dice eso, el diario no lo afirma."),
        cz(2, "Escribí la forma de *haben* que corresponda (Konjunktiv I no se distingue).", "Laut Gewerkschaft ___ die Mitarbeiter keine Informationen bekommen.", "hätten", note="*sie haben* en Konjunktiv I es igual al indicativo (*haben*), así que se reemplaza por el Konjunktiv II *hätten*. No es irreal: solo marca que es una cita."),
        cz(2, "Escribí la forma de *kommen* que corresponda (Konjunktiv I no se distingue).", "Der Zeitung zufolge ___ die Investoren aus China.", "kämen", note="*sie kommen* en Konjunktiv I sería igual al indicativo → Konjunktiv II *kämen* (de *kamen* + diéresis). También se ve *würden … kommen*, con *kommen* al final."),
        cz(2, "Escribí el participio que falta (pasiva en pasado).", "Laut Polizei ist bei dem Unfall niemand verletzt ___.", "worden", note="Pasiva en Perfekt: *ist … verletzt worden*. Si ya hay otro participio, *worden* va sin *ge-*."),
        ty(2, "Reescribí con *sollen*.", "Laut der Zeitung hat der Minister gelogen.", "Der Minister soll gelogen haben.", note="«Según el diario» + hecho pasado = *soll* + infinitivo perfecto (*gelogen haben*)."),
        ty(2, "Pasá a discurso indirecto con Konjunktiv I, empezando con *Laut Zeitung*.", "Der Minister soll gelogen haben.", "Laut Zeitung habe der Minister gelogen.", ["Laut Zeitung habe der Minister gelogen.", "Laut der Zeitung habe der Minister gelogen."], "Las dos herramientas de prensa: *soll* (modal) o fuente + Konjunktiv I (*habe … gelogen*)."),
        # parte 2 — repaso: relativas en dativo y con preposición (semana 24)
        cz(2, "Escribí el relativo.", "Die Firma, für ___ sie seit zehn Jahren arbeitet, wurde verkauft.", "die", note="*für* + acusativo, *die Firma* femenino → *für die*. La preposición va delante, no al final como en el castellano coloquial «la empresa que trabaja para ella»."),
        ch(2, "Elegí el relativo.", "Die Kunden, ___ wir die Ware geliefert haben, sind zufrieden.", "denen", ["denen", "den", "die"], "*liefern* + dativo (a quién) y plural → *denen*, no *den*."),
        tr(2, "Es un tema sobre el que se discute mucho.", "Das ist ein Thema, über das viel diskutiert wird.", ["Das ist ein Thema, über das viel diskutiert wird.", "Das ist ein Thema, über das man viel diskutiert.", "Das ist ein Thema, worüber viel diskutiert wird.", "Das ist ein Thema, worüber man viel diskutiert.", "Es ist ein Thema, über das viel diskutiert wird.", "Es ist ein Thema, über das man viel diskutiert."], "*diskutieren über* + acusativo → *über das* (neutro). *worüber* también se usa."),
    ],
}
