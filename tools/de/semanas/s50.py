# -*- coding: utf-8 -*-
"""Semana 50 — Kurz gesagt (C1): la cohesión del texto (remisiones, conectores textuales, resumir y referir)."""
from base import q, ch, li, cz, tr, ty, MAY  # noqa: F401


def V(*xs):
    """Las respuestas, cada una también sin comas (la app no perdona una coma de menos)."""
    out = []
    for x in xs:
        for y in (x, x.replace(",", "")):
            if y not in out:
                out.append(y)
    return out


WEEK = {
    "week": 50,
    "title": "Kurz gesagt",
    "level": "C1",
    "focus": "Cómo se hilan las oraciones de un texto: remitir a lo dicho (dies, ersteres / letzteres, was, wobei, womit), ordenar con conectores textuales y resumir lo que dice otro.",
    "fare": "Escribir textos que se leen de corrido, resumir un artículo o una exposición y referir con precisión lo que afirma, admite o critica un autor.",
    "tema": "dies / damit / dadurch, ersterer / letzterer, relativas que retoman toda la oración (was, wobei, womit, wodurch), conectores textuales (zunächst, darüber hinaus, demnach, das heißt, nämlich, und zwar), resumir y referir",
    "keys": [
        "*Dies* retoma toda una afirmación: *Dies zeigt, dass …*; *Folgendes / Eines ist klar:* anuncia.",
        "*Ersteres … letzteres …*: el primero y el último de dos, declinados como adjetivos.",
        "«lo cual / lo que» = *was*; con preposición: *womit, wodurch, wobei, worüber*.",
        "Conectores en posición 1 = verbo segundo: *Darüber hinaus spielt … eine Rolle*.",
        "*nämlich* nunca va primero: *Er kommt nicht, er ist nämlich krank.*",
        "Resumir: *Der Text befasst sich mit … / Die Autorin vertritt die These, dass … / Abschließend kommt er zu dem Schluss, dass …*",
    ],
    "lesson": {
        "intro": "Un texto no es una lista de oraciones sueltas: cada una retoma algo de la anterior y prepara la siguiente. Ya conocés muchos conectores (semanas 18, 29, 34 y 42) y el discurso indirecto (semana 35). Esta semana nos ocupamos del pegamento del texto: las palabras que remiten, las que ordenan y las fórmulas para resumir y referir.",
        "parts": [
            {"h": "Remitir: hacia atrás y hacia adelante", "blocks": [0, 1, 2]},
            {"h": "Conectores textuales", "blocks": [3, 4]},
            {"h": "Resumir y referir", "blocks": [5, 6, 7]},
        ],
        "blocks": [
            {
                "h": "Dies, damit, dadurch: retomar lo dicho",
                "r": "Para retomar **una afirmación entera** se usa sobre todo *dies* (más formal que *das*) o un **da-compuesto**: *damit* (con eso), *dadurch* (por eso, de ese modo), *daraus* (de ahí). Para **anunciar** lo que viene: *Folgendes*, *Eines ist klar:*, o un *da-* que prepara una oración con *dass*.",
                "ex": [
                    ["Die Zahl der Studierenden hat sich verdoppelt. *Dies* zeigt, wie attraktiv der Standort ist.", "La cantidad de estudiantes se duplicó. Esto muestra lo atractiva que es la sede."],
                    ["Die Regierung hat das Gesetz verabschiedet. *Damit* ist die Debatte vorerst beendet.", "El gobierno aprobó la ley. Con eso, el debate queda cerrado por ahora."],
                    ["Viele Arbeitsplätze wurden verlagert. *Dadurch* ist die Region verarmt.", "Se trasladaron muchos puestos de trabajo. Por eso la región se empobreció."],
                    ["*Eines* ist klar: So kann es nicht weitergehen.", "Una cosa está clara: así no se puede seguir."],
                    ["Ich möchte *darauf* hinweisen, dass die Frist morgen endet.", "Quiero señalar que el plazo vence mañana."],
                ],
                "warn": "«Esto» referido a una idea entera es *dies* o *das*, no *dieser* ni *dieses* con sustantivo implícito: *Dies zeigt, dass …*",
                "tip": "*Dies* es la palabra de remisión más típica de los textos académicos; en el habla, *das*.",
                "q": [
                    q("Completá: *Die Preise sind gestiegen. ___ zeigt, dass die Nachfrage groß ist.*", "Dies", ["Dies", "Dieser", "Welches"]),
                    q("Completá: *___ ist klar: Wir brauchen mehr Zeit.*", "Eines", ["Eines", "Einer", "Ein"]),
                ],
            },
            {
                "h": "Ersterer, letzterer, derselbe",
                "r": "Para retomar **uno de dos** elementos mencionados: *ersterer* (el primero) y *letzterer* (el último). Se declinan **como adjetivos**: sin artículo, con terminación fuerte (*Letzterer, Letztere, Letzteres*); con artículo, débil (*der Letztere*). Según la norma actual van con mayúscula (*Letzterer, der Letztere, Ersteres*); la minúscula aparece en textos viejos y en el uso informal. *derselbe / dieselbe / dasselbe* = el mismo (la misma cosa).",
                "table": {"head": ["Retoma…", "Nominativo", "Ejemplo"], "rows": [
                    ["un masculino", "Ersterer / Letzterer", "Der Bus ist billig, der Zug schnell; Letzterer ist aber teurer."],
                    ["un femenino", "Erstere / Letztere", "… mit dem Direktor und seiner Assistentin; Letztere war sehr hilfsbereit."],
                    ["un neutro o una acción", "Ersteres / Letzteres", "Mieten oder kaufen? Ersteres ist flexibler, Letzteres günstiger."],
                    ["un plural", "Erstere / Letztere", "Ärzte und Pfleger fehlen; Letztere besonders auf dem Land."],
                ]},
                "ex": [
                    ["Ich habe mit dem Direktor und seiner Assistentin gesprochen; *Letztere* war sehr hilfsbereit.", "Hablé con el director y su asistente; esta última fue muy servicial."],
                    ["Es gibt zwei Optionen: mieten oder kaufen. *Ersteres* ist flexibler, *Letzteres* langfristig günstiger.", "Hay dos opciones: alquilar o comprar. Lo primero es más flexible; lo segundo, más barato a largo plazo."],
                    ["Wir kommen immer wieder zu *demselben* Ergebnis.", "Siempre llegamos al mismo resultado."],
                ],
                "warn": "*letzterer* retoma lo **último mencionado**, no «el último de una serie» en el tiempo. Y concuerda en género con aquello a lo que remite: *die Assistentin* → *letztere*.",
                "more": ["*derselbe* se escribe junto y declina las dos partes: *demselben, derselben, denselben*. En registro neutro, *der gleiche* se usa a menudo igual (*das gleiche Auto*), aunque en sentido estricto *derselbe* es «el mismo ejemplar»."],
                "q": [
                    q("*Paris und Rom sind schön; ___ ist aber teurer.* (Rom; los nombres de ciudad son neutros)", "letzteres", ["letzteres", "letzterer", "letztere"]),
                    q("*Kaffee oder Tee? ___ macht mich nervös.* (el café)", "Ersterer", ["Ersterer", "Erstere", "Letzterer"]),
                ],
            },
            {
                "h": "Lo cual: was, womit, wodurch, wobei",
                "r": "Una relativa puede retomar **toda la oración anterior** (*weiterführender Relativsatz*). El pronombre es *was* (lo cual, lo que); si el verbo pide preposición, *wo(r)- + preposición*: *womit, wodurch, worüber, woran, wobei*. También *weshalb / weswegen* (por lo cual). El verbo va al final.",
                "table": {"head": ["Pronombre", "Valor", "Ejemplo"], "rows": [
                    ["was", "lo cual", "Er kam zu spät, was mich ärgerte."],
                    ["wodurch", "con lo cual (causa)", "Der Zug fiel aus, wodurch ich den Termin verpasste."],
                    ["womit", "con lo cual (+ verbo con mit)", "Sie hat gekündigt, womit niemand gerechnet hatte."],
                    ["worüber", "de lo cual (+ verbo con über)", "Er hat gewonnen, worüber sich alle freuten."],
                    ["wobei", "aunque / con la salvedad de que", "Das Projekt war ein Erfolg, wobei die Kosten höher waren als geplant."],
                    ["weshalb, weswegen", "por lo cual", "Es regnete, weshalb das Konzert abgesagt wurde."],
                ]},
                "ex": [
                    ["Die Mieten steigen seit Jahren, *was* viele Familien belastet.", "Los alquileres suben desde hace años, lo cual pesa sobre muchas familias."],
                    ["Wir haben uns geeinigt, *wobei* einige Fragen offen bleiben.", "Llegamos a un acuerdo, aunque algunas cuestiones siguen abiertas."],
                ],
                "warn": "«Lo cual» nunca es *das*: *Er kam zu spät, **was** mich ärgerte*, no *…, das mich ärgerte*. *das* retoma un sustantivo neutro; *was*, una oración entera.",
                "tip": "*wobei* es oro en el C1: matiza lo que acabás de decir sin empezar otra oración. *Der Film war gut, wobei das Ende etwas schwach war.*",
                "q": [
                    q("Completá: *Sie hat die Prüfung bestanden, ___ niemand gerechnet hatte.*", "womit", ["womit", "was", "wodurch"]),
                    q("Completá: *Er hat sich entschuldigt, ___ mich überrascht hat.*", "was", ["was", "das", "der"]),
                ],
            },
            {
                "h": "Ordenar, sumar, contrastar, concluir",
                "r": "Los conectores textuales ocupan la **posición 1**: el verbo sigue segundo y el sujeto pasa detrás. Sirven para mostrar la arquitectura del texto.",
                "table": {"head": ["Función", "Conectores"], "rows": [
                    ["ordenar", "zunächst, erstens / zweitens, anschließend, schließlich, zuletzt"],
                    ["sumar", "darüber hinaus, des Weiteren, ferner, außerdem, zudem"],
                    ["contrastar", "im Gegensatz dazu, demgegenüber, hingegen"],
                    ["concluir", "somit, demnach, folglich, daher"],
                ]},
                "ex": [
                    ["*Zunächst* wird das Problem beschrieben. *Anschließend* werden Lösungen diskutiert.", "Primero se describe el problema. Después se discuten soluciones."],
                    ["*Darüber hinaus* spielt die Familie eine wichtige Rolle.", "Además, la familia cumple un papel importante."],
                    ["In Spanien isst man spät. *Im Gegensatz dazu* isst man in Deutschland oft schon um sechs.", "En España se come tarde. En cambio, en Alemania se come muchas veces a las seis."],
                    ["Die Daten sind eindeutig. *Somit* ist die Hypothese bestätigt.", "Los datos son claros. Con lo cual, la hipótesis queda confirmada."],
                ],
                "warn": "Después del conector no va coma ni sujeto: *Darüber hinaus **spielt die Familie** …*, no *Darüber hinaus, die Familie spielt …* (calco del «Además, la familia…»).",
                "q": [
                    q("¿Cuál es correcta?", "Darüber hinaus ist die Methode billig.", ["Darüber hinaus ist die Methode billig.", "Darüber hinaus, die Methode ist billig.", "Darüber hinaus die Methode ist billig."]),
                    q("¿Qué significa *demnach*?", "según eso, por lo tanto", ["según eso, por lo tanto", "sin embargo", "además"]),
                ],
            },
            {
                "h": "Reformular y precisar: das heißt, nämlich, und zwar",
                "r": "Para aclarar o precisar: *das heißt* (*d. h.*, es decir), *mit anderen Worten* (en otras palabras), *genauer gesagt* (más precisamente), *und zwar* (más concretamente), *nämlich* (es que, o sea), *beziehungsweise* (*bzw.*, o bien / respectivamente). Ojo con la posición: no todos ocupan la posición 1.",
                "table": {"head": ["Conector", "Posición", "Ejemplo"], "rows": [
                    ["das heißt", "fuera de la oración (posición 0)", "Er kommt am Montag, das heißt, wir haben noch Zeit."],
                    ["mit anderen Worten", "posición 1 o con dos puntos", "Mit anderen Worten: Das Geld ist weg."],
                    ["und zwar", "posición 0, agrega un detalle", "Ich komme morgen, und zwar um acht."],
                    ["nämlich", "nunca primero; dentro de la oración", "Er kommt nicht, er ist nämlich krank."],
                    ["beziehungsweise", "entre dos elementos", "Kinder bzw. Rentner zahlen 5 bzw. 7 Euro."],
                ]},
                "ex": [
                    ["Die Stadt hat zwei Millionen Einwohner, *das heißt* doppelt so viele wie 1970.", "La ciudad tiene dos millones de habitantes, es decir, el doble que en 1970."],
                    ["Wir haben ein Problem, *und zwar* ein ziemlich großes.", "Tenemos un problema, y bastante grande."],
                    ["Ich bleibe zu Hause, ich habe *nämlich* Fieber.", "Me quedo en casa, es que tengo fiebre."],
                ],
                "warn": "*nämlich* parece *denn*, pero no se porta igual: *denn* va al principio y une dos oraciones (*…, denn ich bin krank*); *nämlich* va **adentro** de la segunda (*…, ich bin nämlich krank*). *Nämlich bin ich krank* está mal.",
                "tip": "*beziehungsweise* con dos pares significa «respectivamente»: *Kinder bzw. Rentner zahlen 5 bzw. 7 Euro* = los chicos pagan 5 y los jubilados, 7.",
                "q": [
                    q("Completá: *Er kommt heute nicht, er ist ___ krank.*", "nämlich", ["nämlich", "denn", "und zwar"]),
                    q("Completá: *Ich rufe dich an, ___ heute Abend.*", "und zwar", ["und zwar", "nämlich", "demnach"]),
                ],
            },
            {
                "h": "Cerrar y resumir: kurz gesagt",
                "r": "Para condensar o cerrar: *kurz gesagt*, *kurzum* (en pocas palabras), *alles in allem* (en definitiva), *im Großen und Ganzen* (en líneas generales), *unterm Strich* (en resumidas cuentas), *zusammenfassend lässt sich sagen, dass …* (en resumen, se puede decir que), *abschließend* (para terminar).",
                "ex": [
                    ["*Kurz gesagt*: Das Projekt war zu teuer.", "En pocas palabras: el proyecto era demasiado caro."],
                    ["*Alles in allem* war die Konferenz ein Erfolg.", "En definitiva, el congreso fue un éxito."],
                    ["*Unterm Strich* bleibt wenig übrig.", "En resumidas cuentas, queda poco."],
                    ["*Zusammenfassend lässt sich sagen*, dass die Reform ihr Ziel verfehlt hat.", "En resumen, se puede decir que la reforma no alcanzó su objetivo."],
                ],
                "warn": "*kurz gesagt* y *kurzum* suelen ir con dos puntos o coma y no cuentan como posición 1 (*Kurzum, es war ein Desaster*); *alles in allem* y *unterm Strich*, en cambio, ocupan la posición 1 y piden inversión: *Alles in allem **war** es ein Erfolg.*",
                "q": [
                    q("Completá: *Alles in allem ___.*", "war es ein gutes Jahr", ["war es ein gutes Jahr", "es war ein gutes Jahr", "es ein gutes Jahr war"]),
                    q("¿Qué significa *unterm Strich*?", "en resumidas cuentas", ["en resumidas cuentas", "entre líneas", "por debajo de lo esperado"]),
                ],
            },
            {
                "h": "Resumir un texto",
                "r": "Un resumen (*Zusammenfassung*) va **en presente**, sin opinión propia y sin citas largas: presenta el tema, la tesis, la estructura y la conclusión. Estas fórmulas te lo arman.",
                "table": {"head": ["Para…", "Fórmula"], "rows": [
                    ["el tema", "Der Text befasst sich mit … / In dem Artikel geht es um …"],
                    ["la tesis", "Die Autorin vertritt die These / Auffassung, dass …"],
                    ["la estructura", "Im ersten Abschnitt wird … dargestellt. Anschließend geht sie auf … ein."],
                    ["lo central", "Im Mittelpunkt steht die Frage, ob …"],
                    ["la conclusión", "Abschließend kommt er zu dem Schluss, dass …"],
                ]},
                "ex": [
                    ["Der Artikel *befasst sich mit* der Wohnungsnot in deutschen Großstädten.", "El artículo trata de la escasez de vivienda en las grandes ciudades alemanas."],
                    ["Die Autorin *vertritt die These*, dass Bildung kostenlos sein sollte.", "La autora sostiene la tesis de que la educación debería ser gratuita."],
                    ["Im zweiten Abschnitt *geht* sie *auf* die Kosten *ein*.", "En la segunda parte se ocupa de los costos."],
                ],
                "warn": "«Llegar a la conclusión» es *zu **dem** Schluss kommen* (o *zum Schluss kommen, dass*), no *zur Konklusion*. Y *der Schluss* acá es «la conclusión», no «el final».",
                "q": [
                    q("Completá: *Der Text befasst sich ___ der Frage, ob …*", "mit", ["mit", "von", "über"]),
                    q("Completá: *Abschließend kommt der Autor zu dem ___, dass …*", "Schluss", ["Schluss", "Ende", "Abschluss"]),
                ],
            },
            {
                "h": "Referir: qué hace el autor con lo que dice",
                "r": "Para referir, elegí el verbo que muestra **qué hace** el autor: no es lo mismo *behaupten* (afirmar, a veces sin pruebas) que *einräumen* (admitir, conceder). Lo que dice va en **Konjunktiv I** (semana 35) o con *dass*. Para atribuir: *laut* + Dat., *nach Ansicht* + Gen., *der Autorin zufolge*, *wie die Autorin schreibt*.",
                "table": {"head": ["Verbo", "Qué hace el autor"], "rows": [
                    ["behaupten", "afirma (sin que esté probado)"],
                    ["betonen, hervorheben", "destaca, subraya"],
                    ["einräumen", "admite, concede un punto"],
                    ["darlegen, erläutern", "expone, explica"],
                    ["anführen", "aduce (un argumento, un ejemplo)"],
                    ["bezweifeln, kritisieren", "duda, critica"],
                    ["fordern", "exige, reclama"],
                ]},
                "ex": [
                    ["Der Autor *behauptet*, die Regierung *habe* versagt.", "El autor afirma que el gobierno fracasó."],
                    ["Sie *räumt* jedoch *ein*, dass die Datenlage dünn *sei*.", "Admite, sin embargo, que los datos son escasos."],
                    ["*Laut* der Studie schlafen Jugendliche zu wenig.", "Según el estudio, los adolescentes duermen poco."],
                ],
                "warn": "*einräumen* es separable: *Sie **räumt** ein, dass …* / *Sie hat **eingeräumt**, dass …*. Y no confundas *betonen* (subrayar una idea) con *bemerken* (comentar al pasar).",
                "q": [
                    q("El autor admite un punto débil. Él…", "räumt ein, dass …", ["räumt ein, dass …", "behauptet, dass …", "fordert, dass …"]),
                    q("Completá: *Die Autorin schreibt, die Lage ___ ernst.*", "sei", ["sei", "wäre gewesen", "würde"]),
                ],
            },
        ],
    },
    "vocab": [
        ["die Zusammenfassung", "el resumen", "Schreiben Sie eine Zusammenfassung des Textes in etwa 150 Wörtern."],
        ["der Abschnitt", "la sección, el apartado", "Im dritten Abschnitt geht die Autorin auf die Kosten ein."],
        ["der Absatz", "el párrafo", "Jeder Absatz sollte nur einen Gedanken enthalten."],
        ["die Kernthese", "la tesis central", "Die Kernthese des Buches lautet: Weniger ist mehr."],
        ["der Verweis", "la remisión, la referencia", "Am Ende des Kapitels steht ein Verweis auf weitere Literatur."],
        ["der Leitgedanke", "la idea rectora", "Der Leitgedanke des Textes zieht sich durch alle Kapitel."],
        ["das Fazit", "la conclusión, el balance", "Mein Fazit: Die Reise hat sich gelohnt."],
        ["die Quintessenz", "lo esencial, la quintaesencia", "Die Quintessenz des Vortrags lässt sich in einem Satz sagen."],
        ["hervorheben", "destacar, subrayar", "Die Autorin hebt hervor, dass die Studie neu ist."],
        ["wiedergeben", "referir, reproducir (lo dicho)", "Geben Sie die Meinung des Autors mit eigenen Worten wieder."],
        ["darlegen", "exponer", "Im ersten Teil legt er seine Argumente dar."],
        ["zusammenfassen", "resumir", "Kannst du den Artikel kurz zusammenfassen?"],
        ["letzterer", "este último (de dos)", "Er hat einen Hund und eine Katze; Letztere schläft den ganzen Tag."],
        ["kurzum", "en pocas palabras", "Kurzum, es war ein gelungener Abend."],
        ["demnach", "según eso, por lo tanto", "Die Studie ist demnach nicht repräsentativ."],
    ],
    "items": [
        # parte 0 — remitir
        ch(0, "Elegí el pronombre.", "Die Mieten steigen seit Jahren, ___ viele Familien belastet.", "was", ["was", "das", "welches"], "*was* retoma toda la oración anterior («lo cual»)."),
        ch(0, "Elegí el pronombre.", "Der Zug hatte Verspätung, ___ ich den Anschluss verpasste.", "wodurch", ["wodurch", "worüber", "wofür"], "*wodurch* = con lo cual (causa)."),
        ch(0, "Elegí el pronombre.", "Sie hat die Prüfung bestanden, ___ niemand gerechnet hatte.", "womit", ["womit", "was", "wodurch"], "*rechnen mit* → *womit*."),
        ch(0, "Elegí el conector.", "Das Projekt war ein Erfolg, ___ die Kosten höher waren als geplant.", "wobei", ["wobei", "wodurch", "womit"], "*wobei* = aunque, con la salvedad de que."),
        ch(0, "Elegí la forma.", "Ich habe mit dem Direktor und seiner Assistentin gesprochen. ___ war sehr hilfsbereit.", "Letztere", ["Letztere", "Letzterer", "Letzteres"], "Retoma *die Assistentin*: femenino → *letztere*."),
        ch(0, "Elegí la forma.", "Mieten oder kaufen? ___ ist flexibler, Letzteres langfristig günstiger.", "Ersteres", ["Ersteres", "Ersterer", "Erstere"], "Retoma una acción (*das Mieten*): neutro → *ersteres*."),
        ch(0, "Elegí la palabra.", "Die Zahl der Unfälle hat sich halbiert. ___ zeigt, dass die Maßnahmen wirken.", "Dies", ["Dies", "Dieser", "Welches"], "*Dies* retoma la afirmación entera."),
        cz(0, "Escribí el pronombre (lo cual).", "Er kam zwei Stunden zu spät, ___ mich sehr geärgert hat.", "was", note="«lo cual» = *was*, nunca *das*."),
        cz(0, "Escribí el pronombre (con lo cual, causa).", "Die Firma hat 200 Stellen gestrichen, ___ die Arbeitslosigkeit in der Region stieg.", "wodurch", ["wodurch", "weshalb", "weswegen"], "*wodurch* (o *weshalb*): la segunda parte es consecuencia de la primera."),
        cz(0, "Escribí el adjetivo.", "Eines ist ___: So kann es nicht weitergehen.", "klar", ["klar", "sicher"], "*Eines ist klar:* anuncia lo que viene."),
        cz(0, "Escribí el da-compuesto.", "Ich möchte ___ hinweisen, dass die Frist morgen endet.", "darauf", note="*hinweisen auf* → *darauf hinweisen, dass*."),
        cz(0, "Escribí el da-compuesto (con eso).", "Die Regierung hat das Gesetz verabschiedet. ___ ist die Debatte vorerst beendet.", "Damit", note="*Damit* retoma lo anterior y ocupa la posición 1: verbo segundo."),
        ty(0, "Uní las dos oraciones con *was*.", "Er hat sich entschuldigt. Das hat mich überrascht.", "Er hat sich entschuldigt, was mich überrascht hat.", V("Er hat sich entschuldigt, was mich überrascht hat.", "Er hat sich entschuldigt, was mich überraschte."), "*was* retoma toda la oración; verbo al final."),
        ty(0, "Uní las dos oraciones con *womit*.", "Sie hat gekündigt. Damit hatte niemand gerechnet.", "Sie hat gekündigt, womit niemand gerechnet hatte.", V("Sie hat gekündigt, womit niemand gerechnet hatte.", "Sie hat gekündigt, womit niemand gerechnet hat."), "*rechnen mit* → *womit*."),
        tr(0, "Llovió todo el día, lo cual arruinó la fiesta.", "Es hat den ganzen Tag geregnet, was die Party ruiniert hat.", V("Es hat den ganzen Tag geregnet, was die Party ruiniert hat.", "Es hat den ganzen Tag geregnet, was das Fest ruiniert hat.", "Es hat den ganzen Tag geregnet, was die Feier ruiniert hat.", "Es hat den ganzen Tag geregnet, was die Feier verdorben hat.", "Es regnete den ganzen Tag, was die Feier ruinierte.", "Es regnete den ganzen Tag, was die Feier verdarb.", "Es hat den ganzen Tag geregnet, was die Party verdorben hat.", "Es hat den ganzen Tag geregnet, was das Fest verdorben hat.", "Es regnete den ganzen Tag, was die Party ruinierte.", "Es regnete den ganzen Tag, was das Fest ruinierte.", "Es regnete den ganzen Tag, was die Party verdarb.", "Es regnete den ganzen Tag, was das Fest verdarb."), "«lo cual» = *was*, con el verbo al final."),
        tr(0, "Esto muestra que el método funciona.", "Dies zeigt, dass die Methode funktioniert.", V("Dies zeigt, dass die Methode funktioniert.", "Das zeigt, dass die Methode funktioniert."), "*Dies* (formal) o *das* retoman una idea entera."),
        # parte 1 — conectores textuales
        ch(1, "Elegí el conector.", "Zunächst wird das Problem beschrieben. ___ werden mögliche Lösungen diskutiert.", "Anschließend", ["Anschließend", "Einerseits", "Im Gegensatz dazu"], "*zunächst … anschließend* = primero … después."),
        ch(1, "Elegí el orden.", "Darüber hinaus ___ eine wichtige Rolle.", "spielt die Familie", ["spielt die Familie", "die Familie spielt", "hat die Familie gespielt"], "El conector ocupa la posición 1: verbo segundo, sujeto detrás."),
        ch(1, "Elegí la palabra.", "Er kommt heute nicht. Er ist ___ krank.", "nämlich", ["nämlich", "denn", "und zwar"], "*nämlich* va dentro de la oración: *Er ist nämlich krank.*"),
        ch(1, "Elegí la palabra.", "Ich komme morgen, ___ um acht Uhr.", "und zwar", ["und zwar", "nämlich", "demnach"], "*und zwar* agrega una precisión."),
        ch(1, "Elegí el conector.", "Die Stadt hat zwei Millionen Einwohner, ___ doppelt so viele wie vor 50 Jahren.", "das heißt", ["das heißt", "trotzdem", "stattdessen"], "*das heißt* (d. h.) = es decir."),
        ch(1, "Elegí el conector.", "In Spanien isst man spät zu Abend. ___ isst man in Deutschland oft schon um sechs.", "Im Gegensatz dazu", ["Im Gegensatz dazu", "Darüber hinaus", "Folglich"], "Contraste entre dos casos: *im Gegensatz dazu*."),
        ch(1, "¿Qué significa?", "Kinder bzw. Rentner zahlen 5 bzw. 7 Euro.", "Los chicos pagan 5 euros y los jubilados, 7.", ["Los chicos pagan 5 euros y los jubilados, 7.", "Los chicos y los jubilados pagan entre 5 y 7 euros.", "Los chicos o los jubilados pagan 12 euros."], "*bzw.* con dos pares = respectivamente."),
        cz(1, "Escribí el conector (en segundo lugar).", "Erstens ist das Modell zu teuer, ___ ist es zu kompliziert.", "zweitens", note="*erstens … zweitens*: posición 1, verbo segundo."),
        cz(1, "Escribí un conector de conclusión.", "Die Ergebnisse sind eindeutig. ___ ist die Hypothese bestätigt.", "Somit", ["Somit", "Demnach", "Folglich", "Daher", "Deshalb", "Damit"], "*somit, demnach, folglich*: concluyen y piden verbo segundo."),
        cz(1, "Escribí un conector para sumar (además).", "Das Hotel liegt zentral. ___ ist es günstig.", "Darüber hinaus", ["Darüber hinaus", "Außerdem", "Zudem", "Ferner", "Des Weiteren"], "Conector aditivo en posición 1: verbo segundo."),
        cz(1, "Escribí la palabra que falta.", "Mit anderen ___: Wir haben kein Geld mehr.", "Worten", note="*mit anderen Worten* = en otras palabras (*Worte*, no *Wörter*: son palabras con sentido)."),
        ty(1, "Reescribí empezando con *Darüber hinaus*.", "Die Methode ist außerdem billig.", "Darüber hinaus ist die Methode billig.", note="Conector en posición 1, verbo segundo, sujeto detrás."),
        ty(1, "Reescribí con *nämlich* en vez de *denn*.", "Ich bleibe zu Hause, denn ich bin krank.", "Ich bleibe zu Hause, ich bin nämlich krank.", V("Ich bleibe zu Hause, ich bin nämlich krank.", "Ich bleibe zu Hause. Ich bin nämlich krank."), "*nämlich* va dentro de la segunda oración, nunca primero."),
        tr(1, "En otras palabras: el proyecto fracasó.", "Mit anderen Worten: Das Projekt ist gescheitert.", V("Mit anderen Worten: Das Projekt ist gescheitert.", "Mit anderen Worten, das Projekt ist gescheitert.", "Mit anderen Worten ist das Projekt gescheitert.", "Mit anderen Worten: Das Projekt scheiterte."), "*mit anderen Worten* con dos puntos, o en posición 1 con inversión."),
        tr(1, "Primero se describe el problema.", "Zunächst wird das Problem beschrieben.", ["Zunächst wird das Problem beschrieben.", "Zuerst wird das Problem beschrieben.", "Zunächst wird das Problem dargestellt.", "Zuerst wird das Problem dargestellt."], "*Zunächst* en posición 1 + pasiva."),
        li(1, "beziehungsweise", ["beziehungsweise", "bezüglich", "beispielsweise"], "*beziehungsweise* (bzw.) = o bien / respectivamente; *beispielsweise* = por ejemplo."),
        # parte 2 — resumir y referir
        ch(2, "Elegí la preposición.", "Der Artikel befasst sich ___ der Frage, ob Homeoffice produktiver ist.", "mit", ["mit", "von", "über"], "*sich befassen mit* + Dat."),
        ch(2, "Elegí el sustantivo.", "Die Autorin vertritt die ___, dass Bildung kostenlos sein sollte.", "These", ["These", "Thema", "Frage"], "*eine These vertreten* = sostener una tesis."),
        ch(2, "Elegí el sustantivo.", "Abschließend kommt der Autor zu dem ___, dass mehr Forschung nötig ist.", "Schluss", ["Schluss", "Ende", "Abschluss"], "*zu dem Schluss kommen* = llegar a la conclusión."),
        ch(2, "Elegí el verbo.", "Im ersten Abschnitt ___ der Autor auf die Ursachen ein.", "geht", ["geht", "kommt", "nimmt"], "*eingehen auf* = ocuparse de, tratar."),
        ch(2, "Elegí el orden.", "Alles in allem ___.", "war die Konferenz ein Erfolg", ["war die Konferenz ein Erfolg", "die Konferenz war ein Erfolg", "die Konferenz ein Erfolg war"], "*alles in allem* ocupa la posición 1: inversión."),
        ch(2, "¿Qué expresión sirve para resumir?", "(en resumidas cuentas)", "unterm Strich", ["unterm Strich", "unter anderem", "unter Umständen"], "*unterm Strich* = en resumidas cuentas; *unter anderem* = entre otras cosas; *unter Umständen* = eventualmente."),
        cz(2, "Escribí la palabra que falta (según).", "___ der Studie schlafen Jugendliche zu wenig.", "Laut", ["Laut", "Nach"], "*laut* + Dat. = según."),
        cz(2, "Escribí el verbo de decir.", "Der Autor ___, die Regierung habe versagt.", "behauptet", ["behauptet", "meint", "schreibt", "betont", "sagt", "erklärt", "kritisiert"], "Verbo de decir + Konjunktiv I (*habe*)."),
        cz(2, "Escribí la forma de *einräumen*.", "Sie ___ jedoch ein, dass die Datenlage dünn sei.", "räumt", note="*einräumen* es separable: *sie räumt … ein*."),
        cz(2, "Escribí la palabra que falta.", "___ gesagt: Das Projekt war zu teuer.", "Kurz", note="*Kurz gesagt:* = en pocas palabras."),
        ty(2, "Escribí la fórmula: «En resumen, se puede decir que…»", "(Zusammenfassend …)", "Zusammenfassend lässt sich sagen, dass", V("Zusammenfassend lässt sich sagen, dass", "Zusammenfassend kann man sagen, dass", "Zusammenfassend lässt sich feststellen, dass"), "*Zusammenfassend lässt sich sagen, dass …*"),
        ty(2, "Pasalo a estilo indirecto con Konjunktiv I, sin *dass*.", "Der Autor schreibt: «Die Lage ist ernst.»", "Der Autor schreibt, die Lage sei ernst.", V("Der Autor schreibt, die Lage sei ernst."), "Sin *dass*: verbo segundo en Konjunktiv I (*sei*)."),
        tr(2, "El artículo trata de la escasez de vivienda.", "Der Artikel befasst sich mit der Wohnungsnot.", ["Der Artikel befasst sich mit der Wohnungsnot.", "Der Artikel behandelt die Wohnungsnot.", "Der Artikel handelt von der Wohnungsnot.", "In dem Artikel geht es um die Wohnungsnot.", "Im Artikel geht es um die Wohnungsnot.", "Der Artikel befasst sich mit dem Wohnungsmangel.", "Der Artikel behandelt den Wohnungsmangel.", "In dem Artikel geht es um den Wohnungsmangel.", "Im Artikel geht es um den Wohnungsmangel.", "Der Artikel beschäftigt sich mit der Wohnungsnot."], "*sich befassen mit* (o *behandeln*, *es geht um*)."),
        tr(2, "Según la autora, el problema es nuevo.", "Laut der Autorin ist das Problem neu.", V("Laut der Autorin ist das Problem neu.", "Der Autorin zufolge ist das Problem neu.", "Nach Ansicht der Autorin ist das Problem neu.", "Die Autorin meint, das Problem sei neu.", "Laut Autorin ist das Problem neu."), "*laut* + Dat. / *der Autorin zufolge* / *nach Ansicht der Autorin*."),
        # parte 0 — repaso: dessen/deren (semana 26) y wer …, der … (semana 44)
        ch(0, "Elegí el relativo.", "Die Studie, ___ Ergebnisse gestern veröffentlicht wurden, sorgt für Streit.", "deren", ["deren", "dessen", "die"], "El dueño es *die Studie* → *deren*, aunque «cuyos resultados» mire al plural *Ergebnisse*."),
        tr(0, "el autor, cuyo último libro fue un éxito", "der Autor, dessen letztes Buch ein Erfolg war", V("der Autor, dessen letztes Buch ein Erfolg war", "der Autor, dessen neuestes Buch ein Erfolg war", "der Autor, dessen letztes Buch ein Erfolg gewesen ist"), "Dueño masculino → *dessen*; sin artículo después y adjetivo fuerte: *dessen letztes Buch*."),
        cz(0, "Escribí el pronombre que retoma.", "Wer den Text aufmerksam liest, ___ fällt auf, dass ein Argument fehlt.", "dem", note="*wer* es nominativo, pero *auffallen* pide dativo en la principal → *dem* (obligatorio)."),
        # parte 0 — repaso: partículas modales (semanas 18 y 46)
        cz(0, "Escribí la partícula que suaviza el pedido.", "Kannst du mir ___ kurz helfen?", "mal", note="*mal* = «un toque»: hace el pedido amable. Sin partícula suena seco."),
        ch(0, "Elegí la partícula.", "Was ist ___ los? Du siehst so traurig aus.", "denn", ["denn", "mal", "halt"], "En preguntas, *denn* muestra interés o preocupación («¿qué pasa, che?»)."),
    ],
}
