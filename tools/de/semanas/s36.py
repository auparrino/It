# -*- coding: utf-8 -*-
"""Semana 36 — Die von ihm geschriebene Mail (B2): atributos de participio extendidos y su paráfrasis con relativa."""
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
    "week": 36,
    "title": "Die von ihm geschriebene Mail",
    "level": "B2",
    "focus": "Los atributos de participio extendidos: leerlos sin perderse y pasarlos a una relativa (y al revés).",
    "fare": "Entender artículos de prensa, estudios e informes, donde un sustantivo carga delante toda una oración, y escribir con ese estilo compacto.",
    "tema": "Erweitertes Partizipialattribut (Partizip I y II), paráfrasis con relativa activa, pasiva y en Perfekt, prensa, estudios, informes",
    "keys": [
        "Todo lo que el castellano pone después del sustantivo, el alemán lo mete entre artículo y sustantivo: *die von ihm geschriebene Mail*.",
        "Para leer: artículo → buscá su sustantivo → el participio justo antes → los complementos.",
        "Partizip I → relativa activa: *die im Park spielenden Kinder* = *die Kinder, die im Park spielen*.",
        "Partizip II con objeto → relativa pasiva: *die Mail, die von ihm geschrieben wurde*.",
        "Partizip II con *sein* → Perfekt activo: *der Zug, der gestern angekommen ist*.",
        "Solo se arma si el relativo es sujeto: *der Mann, dem ich geholfen habe* no se puede convertir.",
    ],
    "lesson": {
        "intro": "En la semana 33 viste *die geschriebene Mail*. Ahora el participio se estira: *die gestern von ihm an alle Kollegen geschriebene Mail*. Es una relativa entera comprimida delante del sustantivo, el sello de la prensa, los informes y la ciencia en alemán. Primero vas a aprender a leerla; después, a escribirla.",
        "parts": [
            {"h": "Reconocer el atributo extendido", "blocks": [0, 1]},
            {"h": "Del participio a la relativa", "blocks": [2, 3, 4]},
            {"h": "De la relativa al participio", "blocks": [5, 6]},
        ],
        "blocks": [
            {
                "h": "Del participio simple al extendido",
                "r": "Entre el artículo y el participio pueden ir **complementos**: tiempo, lugar, agente, objeto. *die Mail* → *die geschriebene Mail* → *die gestern geschriebene Mail* → *die gestern von ihm geschriebene Mail*. Lo que en castellano va **después** del sustantivo («escrito por él ayer»), en alemán va **antes**, en el orden de una subordinada: el participio, como el verbo, **al final**.",
                "table": {"head": ["Artículo", "Complementos", "Participio + terminación", "Sustantivo"], "rows": [
                    ["die", "gestern von ihm", "geschriebene", "Mail"],
                    ["die", "im Park", "spielenden", "Kinder"],
                    ["der", "um acht Uhr in Berlin", "angekommene", "Zug"],
                    ["ein", "seit Jahren", "geschlossenes", "Kino"],
                    ["die", "seit Jahren stark", "steigenden", "Mieten"],
                ]},
                "ex": [
                    ["Die *gestern von ihm geschriebene* Mail war sehr unhöflich.", "El mail que él escribió ayer era muy maleducado."],
                    ["Die *im Park spielenden* Kinder sind laut.", "Los chicos que juegan en el parque hacen ruido."],
                    ["Ein *seit Jahren geschlossenes* Kino wird jetzt renoviert.", "Un cine cerrado desde hace años está siendo renovado."],
                ],
                "warn": "La terminación de adjetivo va **en el participio**, no en los complementos: *die im Park spielend**en** Kinder*. Y el participio va siempre **pegado al sustantivo**: «*die spielenden im Park Kinder*» está mal.",
                "q": [
                    q("¿Cuál es correcta?", "die im Park spielenden Kinder", ["die im Park spielenden Kinder", "die spielenden im Park Kinder", "die im Park spielend Kinder"]),
                    q("¿Cuál es el sustantivo en *der um acht Uhr angekommene Zug*?", "Zug", ["Zug", "Uhr", "acht"]),
                ],
            },
            {
                "h": "Cómo leerlo: el corchete",
                "r": "Artículo y sustantivo forman un **corchete** que encierra todo el atributo. Para leer: **1)** si después del artículo viene algo que **no concuerda** con él (una preposición, un adverbio, otro artículo), alerta; **2)** buscá hacia adelante el **sustantivo** que concuerda con el artículo; **3)** justo antes está el **participio**; **4)** leé en castellano: sustantivo → participio → complementos.",
                "ex": [
                    ["*Die* im letzten Jahr veröffentlicht*e* *Studie* zeigt …", "El estudio publicado el año pasado muestra…"],
                    ["Mit *dem* von der Stadt geplant*en* *Projekt* sind nicht alle einverstanden.", "No todos están de acuerdo con el proyecto planificado por la ciudad."],
                    ["*Die* von den Befragten genannt*en* *Gründe* sind sehr unterschiedlich.", "Los motivos mencionados por los encuestados son muy diversos."],
                ],
                "warn": "Dentro del corchete puede haber **otros** artículos y sustantivos que te despistan: en *mit dem von der Stadt geplanten Projekt*, el *dem* no va con *Stadt* (eso es *von der Stadt*), sino con *Projekt*. Fijate en el género y el caso: *dem* → masculino o neutro en dativo → *Projekt*.",
                "tip": "Si leés en voz alta, hacé una pausa mental después del artículo: «*die* … [im letzten Jahr veröffentlichte] … *Studie*».",
                "q": [
                    q("En *mit dem von der Stadt geplanten Projekt*, *dem* va con…", "Projekt", ["Projekt", "Stadt", "von"]),
                    q("*die im letzten Jahr veröffentlichte Studie* es…", "el estudio publicado el año pasado", ["el estudio publicado el año pasado", "el estudio del año pasado que publica", "el último estudio del año"]),
                ],
            },
            {
                "h": "Partizip I → relativa activa",
                "r": "Un atributo con **Partizip I** se desarma en una **relativa activa**, en el **mismo tiempo** que la oración principal: el sustantivo hace la acción mientras pasa lo otro.",
                "table": {"head": ["Atributo", "Relativa"], "rows": [
                    ["die im Park spielenden Kinder", "die Kinder, die im Park spielen"],
                    ["die seit Jahren steigenden Mieten", "die Mieten, die seit Jahren steigen"],
                    ["der am Fenster sitzende Mann", "der Mann, der am Fenster sitzt"],
                    ["die in Berlin wohnenden Studierenden", "die Studierenden, die in Berlin wohnen"],
                ]},
                "ex": [
                    ["Ich sah die *im Park spielenden* Kinder.", "Vi a los chicos que jugaban en el parque."],
                    ["= Ich sah die Kinder, die im Park *spielten*.", "(el tiempo de la relativa sigue al de la principal)"],
                ],
                "warn": "El Partizip I no tiene tiempo propio: lo toma de la oración principal. Si la principal está en pasado, la relativa también: *Ich sah die Kinder, die im Park spielten.*",
                "q": [
                    q("*die im Büro arbeitenden Kollegen* =", "die Kollegen, die im Büro arbeiten", ["die Kollegen, die im Büro arbeiten", "die Kollegen, die im Büro gearbeitet haben", "die Kollegen, die im Büro gearbeitet werden"]),
                ],
            },
            {
                "h": "Partizip II con objeto → relativa pasiva",
                "r": "Un **Partizip II** de un verbo con objeto se desarma en una **relativa en voz pasiva** (semanas 27 y 31). El agente con *von* se queda igual. Si el participio describe un **estado** (*seit Jahren geschlossen*), la relativa va en **Zustandspassiv** con *sein*.",
                "table": {"head": ["Atributo", "Relativa"], "rows": [
                    ["die von ihm geschriebene Mail", "die Mail, die von ihm geschrieben wurde"],
                    ["das 2010 gebaute Stadion", "das Stadion, das 2010 gebaut wurde"],
                    ["der vom Ministerium veröffentlichte Bericht", "der Bericht, der vom Ministerium veröffentlicht wurde"],
                    ["die seit Jahren geschlossene Fabrik", "die Fabrik, die seit Jahren geschlossen ist"],
                ]},
                "ex": [
                    ["Das *von der Firma entwickelte* Programm ist kostenlos.", "El programa desarrollado por la empresa es gratuito."],
                    ["= Das Programm, das von der Firma entwickelt *wurde* (*worden ist*), ist kostenlos.", "(pasiva en Präteritum o en Perfekt: las dos sirven)"],
                ],
                "warn": "El sustantivo **recibe** la acción: la mail no escribe, *es escrita*. Por eso «*die Mail, die von ihm geschrieben hat*» está mal: hace falta *wurde* (o *worden ist*).",
                "q": [
                    q("*das 2010 gebaute Stadion* =", "das Stadion, das 2010 gebaut wurde", ["das Stadion, das 2010 gebaut wurde", "das Stadion, das 2010 gebaut hat", "das Stadion, das 2010 baut"]),
                    q("*die seit Monaten gesperrte Straße* =", "die Straße, die seit Monaten gesperrt ist", ["die Straße, die seit Monaten gesperrt ist", "die Straße, die seit Monaten sperrt", "die Straße, die seit Monaten gesperrt hat"]),
                ],
            },
            {
                "h": "Partizip II con sein → relativa activa en Perfekt",
                "r": "Con los verbos que hacen el **Perfekt con *sein*** (semana 33: *ankommen, steigen, verschwinden*), el Partizip II es **activo**: la relativa va en **Perfekt** (o en Plusquamperfekt, si la principal está en pasado).",
                "table": {"head": ["Atributo", "Relativa"], "rows": [
                    ["der gestern angekommene Zug", "der Zug, der gestern angekommen ist"],
                    ["die stark gestiegenen Preise", "die Preise, die stark gestiegen sind"],
                    ["der vor einer Woche verschwundene Hund", "der Hund, der vor einer Woche verschwunden ist"],
                    ["die aus Syrien geflohene Familie", "die Familie, die aus Syrien geflohen ist"],
                ]},
                "ex": [
                    ["Die *stark gestiegenen* Preise belasten viele Familien.", "Los precios, que subieron mucho, pesan sobre muchas familias."],
                    ["Der *vor einer Woche verschwundene* Hund ist wieder da.", "El perro que había desaparecido hace una semana volvió."],
                ],
                "warn": "Acá no hay pasiva: «*der Zug, der angekommen wurde*» no existe. El tren llegó solo: *der angekommen **ist***.",
                "q": [
                    q("*die gestern gelandete Maschine* =", "die Maschine, die gestern gelandet ist", ["die Maschine, die gestern gelandet ist", "die Maschine, die gestern gelandet wurde", "die Maschine, die gestern landet"]),
                ],
            },
            {
                "h": "El camino inverso: de relativa a participio",
                "r": "Para escribir con estilo de informe: **1)** sacá el pronombre relativo y el auxiliar (*wird, wurde, ist, sind*); **2)** elegí el participio: relativa activa en presente → **Partizip I**; pasiva o Perfekt con *sein* → **Partizip II**; **3)** poné todo entre artículo y sustantivo, con el participio al final y **terminación de adjetivo**.",
                "table": {"head": ["Relativa", "Atributo"], "rows": [
                    ["die Frau, die am Fenster sitzt", "die am Fenster sitzende Frau"],
                    ["das Auto, das letzte Woche repariert wurde", "das letzte Woche reparierte Auto"],
                    ["die Gäste, die gestern angekommen sind", "die gestern angekommenen Gäste"],
                    ["mit der Studie, die im Mai veröffentlicht wurde", "mit der im Mai veröffentlichten Studie"],
                ]},
                "warn": "Solo se puede si el pronombre relativo es el **sujeto** (nominativo) de la relativa. *der Mann, **dem** ich geholfen habe* o *das Buch, **das ich** lese* (relativo en acusativo con sujeto *ich*) **no** se convierten: «*der mir geholfene Mann*» no existe. Para *das Buch, das ich lese*, la versión pasiva sí sirve: *das von mir gelesene Buch*.",
                "tip": "No exageres: más de cuatro o cinco palabras dentro del corchete se vuelve difícil de leer hasta para un alemán. En un mail, la relativa suele ser más clara.",
                "q": [
                    q("*die Frau, die am Fenster sitzt* →", "die am Fenster sitzende Frau", ["die am Fenster sitzende Frau", "die am Fenster gesessene Frau", "die sitzende am Fenster Frau"]),
                    q("¿Se puede convertir *der Mann, dem ich geholfen habe*?", "No, el relativo no es sujeto.", ["No, el relativo no es sujeto.", "Sí: der mir geholfene Mann", "Sí: der von mir geholfene Mann"]),
                ],
            },
            {
                "h": "En los informes y en la prensa",
                "r": "Estudios, encuestas e informes están llenos de atributos extendidos, combinados con fórmulas fijas: *laut Angaben* + genitivo (según datos de), *im Vergleich zum Vorjahr* (en comparación con el año anterior), *einen Anstieg / Rückgang verzeichnen* (registrar un aumento / una baja). Los participios sustantivados también abundan: *die Befragten* (los encuestados).",
                "ex": [
                    ["Die *vom Ministerium veröffentlichte* Studie zeigt einen deutlichen Anstieg der Mieten.", "El estudio publicado por el ministerio muestra un aumento marcado de los alquileres."],
                    ["Laut Angaben der Polizei ist die Zahl der *im Straßenverkehr verletzten* Personen gesunken.", "Según datos de la policía, bajó la cantidad de personas heridas en el tránsito."],
                    ["Mehr als die Hälfte der *Befragten* ist mit der *vor zwei Jahren eingeführten* Reform unzufrieden.", "Más de la mitad de los encuestados está disconforme con la reforma introducida hace dos años."],
                    ["Die *im letzten Jahr erhobenen* Daten zeigen einen Rückgang der Arbeitslosigkeit.", "Los datos relevados el año pasado muestran una baja del desempleo."],
                ],
                "warn": "*laut* (según) no tiene nada que ver con *laut* (fuerte, ruidoso): *laut Angaben* = según datos. Va con genitivo o dativo: *laut des Berichts* / *laut dem Bericht*.",
                "more": ["En textos formales vas a ver también *zu* + Partizip I: *das zu lösende Problem* = el problema que hay que resolver (*das Problem, das gelöst werden muss*). Lo retomás en la semana 40."],
                "q": [
                    q("*die Befragten* son…", "los encuestados", ["los encuestados", "las preguntas", "los que preguntan"]),
                    q("*einen Rückgang verzeichnen* significa…", "registrar una baja", ["registrar una baja", "registrar un aumento", "volver atrás"]),
                ],
            },
        ],
    },
    "vocab": [
        ["die Studie", "el estudio (científico)", "Die Studie wurde im Mai veröffentlicht."],
        ["die Stichprobe", "la muestra (estadística)", "Für die Studie wurde eine Stichprobe von 2000 Personen befragt."],
        ["der Befragte", "el encuestado", "Nur wenige Befragte lesen noch eine gedruckte Zeitung."],
        ["der Zeitraum", "el período", "Im untersuchten Zeitraum stiegen die Preise um zehn Prozent."],
        ["das Gutachten", "el dictamen, el informe pericial", "Ein unabhängiges Gutachten bestätigt die Ergebnisse."],
        ["die Pressemitteilung", "el comunicado de prensa", "Die Firma hat eine Pressemitteilung herausgegeben."],
        ["der Jahresbericht", "el informe anual", "Im Jahresbericht stehen alle wichtigen Zahlen."],
        ["veröffentlichen", "publicar", "Das Ministerium veröffentlicht die Daten jedes Jahr."],
        ["erheben", "relevar (datos); cobrar (un impuesto)", "Die Daten wurden im letzten Jahr erhoben."],
        ["die Angabe", "el dato, la indicación", "Laut Angaben der Polizei gab es keine Verletzten."],
        ["der Anteil", "la proporción, la parte", "Der Anteil der Frauen in Führungspositionen ist gestiegen."],
        ["die Mehrheit", "la mayoría", "Die Mehrheit der Befragten ist mit der Reform unzufrieden."],
        ["der Durchschnitt", "el promedio", "Im Durchschnitt arbeiten die Befragten 38 Stunden pro Woche."],
        ["die Prognose", "el pronóstico, la proyección", "Die Prognose für das nächste Jahr ist positiv."],
        ["der Verfasser", "el autor (de un texto)", "Der Verfasser des Artikels ist Journalist in Wien."],
    ],
    "items": [
        # parte 0 — reconocer
        ch(0, "¿Cuál es el sustantivo de la frase?", "die gestern von ihm geschriebene Mail", "Mail", ["Mail", "ihm", "gestern"], "El artículo *die* va con *Mail*; todo lo del medio es el atributo."),
        ch(0, "¿Qué significa?", "die im Park spielenden Kinder", "los chicos que juegan en el parque", ["los chicos que juegan en el parque", "el parque donde juegan los chicos", "los chicos que jugaron en el parque"], "Partizip I: activo y simultáneo."),
        ch(0, "Elegí la forma correcta.", "Die ___ Studie zeigt einen Anstieg der Mieten.", "im Mai veröffentlichte", ["im Mai veröffentlichte", "veröffentlichte im Mai", "im Mai veröffentlichten"], "Complementos primero, participio al final; nominativo con *die*: *-e*."),
        ch(0, "Elegí el orden correcto.", "(el tren que llegó a las ocho)", "der um acht Uhr angekommene Zug", ["der um acht Uhr angekommene Zug", "der angekommene um acht Uhr Zug", "der Zug um acht Uhr angekommene"], "El participio va pegado al sustantivo."),
        ch(0, "¿Con qué palabra concuerda *dem*?", "mit dem von der Stadt geplanten Projekt", "Projekt", ["Projekt", "Stadt", "geplanten"], "*dem* (dativo masc./neutro) → *Projekt*; *der Stadt* es otra frase."),
        ch(0, "Elegí la terminación.", "Die seit Jahren steigend___ Mieten sind ein Problem.", "-en", ["-en", "-e", "-es"], "Plural con *die*: *steigenden*."),
        ch(0, "Elegí la forma correcta.", "Ein seit Jahren ___ Kino wird jetzt renoviert.", "geschlossenes", ["geschlossenes", "geschlossene", "geschlossener"], "Neutro con *ein*: *-es*."),
        cz(0, "Completá con el participio de *schreiben*.", "Die von ihm ___ Mail war sehr unhöflich.", "geschriebene", note="La escribieron: Partizip II; con *die* en nominativo: *-e*."),
        cz(0, "Completá con el participio de *spielen*.", "Die im Park ___ Kinder sind laut.", "spielenden", note="Juegan ahora: Partizip I; plural con *die*: *-en*."),
        cz(0, "Completá con el participio de *ankommen*.", "Der gerade ___ Zug kommt aus Hamburg.", "angekommene", note="*ist angekommen*: Partizip II activo."),
        cz(0, "Completá con el participio de *veröffentlichen*.", "In der gestern ___ Studie geht es um Wohnungsnot.", "veröffentlichten", note="*in* + dativo femenino: *der … veröffentlichten*. Sin *ge-*: prefijo *ver-*."),
        cz(0, "Completá con el Partizip I de *steigen*.", "Die immer weiter ___ Preise machen vielen Sorgen.", "steigenden", note="Siguen subiendo: Partizip I."),
        tr(0, "el mail escrito por él", "die von ihm geschriebene Mail", ["die von ihm geschriebene Mail", "die von ihm geschriebene E-Mail", "das von ihm geschriebene Mail", "das von ihm geschriebene E-Mail"], "*von ihm* va dentro, antes del participio. (*das Mail* en Austria y Suiza.)"),
        tr(0, "los chicos que juegan en el parque", "die im Park spielenden Kinder", _nc("die im Park spielenden Kinder", "die Kinder, die im Park spielen"), "*im Park* dentro del corchete, Partizip I al final."),
        ty(0, "Escribí el sustantivo, con artículo.", "«la encuesta» (pista: *um* + *die Frage*)", "die Umfrage", note="*die Umfrage*: *um* + *die Frage*. " + MAY),
        # parte 1 — del participio a la relativa
        ch(1, "Elegí la paráfrasis.", "die im Park spielenden Kinder", "die Kinder, die im Park spielen", ["die Kinder, die im Park spielen", "die Kinder, die im Park gespielt werden", "die Kinder, die im Park gespielt haben"], "Partizip I → relativa activa en presente."),
        ch(1, "Elegí la paráfrasis.", "die von ihm geschriebene Mail", "die Mail, die von ihm geschrieben wurde", ["die Mail, die von ihm geschrieben wurde", "die Mail, die er schreibt", "die Mail, die ihn geschrieben hat"], "Partizip II con objeto → pasiva."),
        ch(1, "Elegí la paráfrasis.", "der gestern angekommene Zug", "der Zug, der gestern angekommen ist", ["der Zug, der gestern angekommen ist", "der Zug, der gestern angekommen wurde", "der Zug, der gestern ankommt"], "Verbo de *sein* → Perfekt activo."),
        ch(1, "Elegí la paráfrasis.", "die stark gestiegenen Preise", "die Preise, die stark gestiegen sind", ["die Preise, die stark gestiegen sind", "die Preise, die stark gestiegen wurden", "die Preise, die stark steigen"], "*steigen* → *sind gestiegen*."),
        ch(1, "Elegí la paráfrasis.", "die seit Jahren geschlossene Fabrik", "die Fabrik, die seit Jahren geschlossen ist", ["die Fabrik, die seit Jahren geschlossen ist", "die Fabrik, die seit Jahren schließt", "die Fabrik, die seit Jahren geschlossen wird"], "Un estado que dura: Zustandspassiv con *sein*."),
        ch(1, "Elegí el auxiliar.", "die vom Bürgermeister eröffnete Brücke → die Brücke, die vom Bürgermeister eröffnet ___", "wurde", ["wurde", "hat", "wird"], "La abrieron (una vez, en el pasado): pasiva en Präteritum."),
        cz(1, "Escribí el verbo de la relativa.", "die im Büro arbeitenden Kollegen → die Kollegen, die im Büro ___", "arbeiten", note="Partizip I → presente activo."),
        cz(1, "Escribí el auxiliar.", "der vor einer Woche verschwundene Hund → der Hund, der vor einer Woche verschwunden ___", "ist", note="*verschwinden* hace Perfekt con *sein*."),
        cz(1, "Escribí el auxiliar de la pasiva.", "das 2010 gebaute Stadion → das Stadion, das 2010 gebaut ___", "wurde", ["wurde", "worden ist"], "Pasiva en Präteritum (o *worden ist*)."),
        cz(1, "Escribí el pronombre relativo.", "der von allen gelobte Bericht → der Bericht, ___ von allen gelobt wurde", "der", note="*der Bericht* es sujeto de la relativa: *der*."),
        cz(1, "Escribí el participio.", "die Gäste, die gestern angekommen sind → die gestern ___ Gäste", "angekommenen", note="Plural con *die*: *-en*."),
        tr(1, "el informe publicado ayer", "der gestern veröffentlichte Bericht", _nc("der gestern veröffentlichte Bericht", "der Bericht, der gestern veröffentlicht wurde", "der Bericht, der gestern veröffentlicht worden ist", "der gestern publizierte Bericht"), "*gestern* dentro del corchete, participio al final."),
        tr(1, "la familia que huyó de Siria", "die aus Syrien geflohene Familie", _nc("die aus Syrien geflohene Familie", "die Familie, die aus Syrien geflohen ist", "die Familie, die aus Syrien floh"), "*fliehen* hace Perfekt con *sein*: Partizip II activo."),
        ty(1, "Reescribí con una relativa.", "die im Garten spielenden Kinder", "die Kinder, die im Garten spielen", _nc("die Kinder, die im Garten spielen"), "Partizip I → relativa activa en presente."),
        ty(1, "Reescribí con una relativa en pasiva.", "das von der Firma entwickelte Programm", "das Programm, das von der Firma entwickelt wurde", _nc("das Programm, das von der Firma entwickelt wurde", "das Programm, das von der Firma entwickelt worden ist"), "Partizip II con objeto → pasiva; *von der Firma* queda igual."),
        # parte 2 — de la relativa al participio, prensa
        ch(2, "Elegí el atributo.", "die Frau, die am Fenster sitzt", "die am Fenster sitzende Frau", ["die am Fenster sitzende Frau", "die am Fenster gesessene Frau", "die sitzende am Fenster Frau"], "Relativa activa en presente → Partizip I."),
        ch(2, "Elegí el atributo.", "das Auto, das letzte Woche repariert wurde", "das letzte Woche reparierte Auto", ["das letzte Woche reparierte Auto", "das letzte Woche reparierende Auto", "das reparierte letzte Woche Auto"], "Pasiva → Partizip II."),
        ch(2, "¿Se puede convertir en atributo?", "der Mann, dem ich geholfen habe", "No: el relativo no es sujeto.", ["No: el relativo no es sujeto.", "Sí: der mir geholfene Mann", "Sí: der von mir geholfene Mann"], "Solo con relativo en nominativo (sujeto)."),
        ch(2, "¿Qué significa?", "laut Angaben der Polizei", "según datos de la policía", ["según datos de la policía", "a pesar de la policía", "en voz alta, dijo la policía"], "*laut* + genitivo = según."),
        ch(2, "Elegí el sustantivo.", "Die Umfrage zeigt einen deutlichen ___ der Mieten. (aumento)", "Anstieg", ["Anstieg", "Rückgang", "Ausstieg"], "*der Anstieg* = el aumento; *der Rückgang* = la baja."),
        ch(2, "Elegí la forma correcta.", "Mehr als die Hälfte der ___ ist zufrieden. (los encuestados)", "Befragten", ["Befragten", "Befragte", "Befragter"], "Participio sustantivado, genitivo plural con *der*: *-en*."),
        cz(2, "Completá con el participio de *wohnen*.", "Die Zahl der in Berlin ___ Studierenden ist gestiegen.", "wohnenden", note="Partizip I; genitivo plural con *der*: *-en*."),
        cz(2, "Completá con el participio de *erheben*.", "Die im letzten Jahr ___ Daten zeigen einen Rückgang.", "erhobenen", note="*erheben – erhob – erhoben*; plural con *die*: *-en*."),
        cz(2, "Completá con el participio de *planen*.", "Das von der Stadt ___ Projekt kostet zehn Millionen Euro.", "geplante", note="Neutro nominativo con *das*: *-e*."),
        cz(2, "Escribí el sustantivo (la baja).", "Der Bericht zeigt einen ___ der Arbeitslosigkeit.", "Rückgang", note="*der Rückgang*: *zurück* + *gehen*. " + MAY),
        cz(2, "Completá con el Partizip I de *zunehmen*.", "Die Studie warnt vor der stark ___ Luftverschmutzung.", "zunehmenden", note="*warnen vor* + dativo: *der … zunehmenden*."),
        tr(2, "la mujer sentada en la ventana", "die am Fenster sitzende Frau", _nc("die am Fenster sitzende Frau", "die Frau, die am Fenster sitzt"), "Posición actual → Partizip I."),
        tr(2, "La encuesta publicada ayer muestra un aumento.", "Die gestern veröffentlichte Umfrage zeigt einen Anstieg.", _nc("Die gestern veröffentlichte Umfrage zeigt einen Anstieg.", "Die Umfrage, die gestern veröffentlicht wurde, zeigt einen Anstieg.", "Die gestern publizierte Umfrage zeigt einen Anstieg."), "Atributo extendido de prensa: *die gestern veröffentlichte Umfrage*."),
        ty(2, "Convertí en atributo con participio.", "der Zug, der um acht Uhr abgefahren ist", "der um acht Uhr abgefahrene Zug", ["der um acht Uhr abgefahrene Zug", "der um 8 Uhr abgefahrene Zug"], "Perfekt con *sein* → Partizip II activo."),
        li(2, "Pressemitteilung", ["Pressemitteilung", "Pressesprecherin", "Pressefreiheit"], "*die Pressemitteilung* = el comunicado de prensa."),
    ],
}
