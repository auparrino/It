# -*- coding: utf-8 -*-
"""Semana 39 — Unglaublich, machbar (B2): formación de palabras con prefijos y sufijos."""
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
    "week": 39,
    "title": "Unglaublich, machbar",
    "level": "B2",
    "focus": "El alemán arma palabras nuevas con piezas fijas: un prefijo cambia el sentido, un sufijo cambia la clase de palabra y, muchas veces, el género.",
    "fare": "Adivinar el significado de palabras que nunca viste, multiplicar tu vocabulario y moverte en el mundo de la universidad.",
    "tema": "Prefijos un-, miss-, ver-, zer-, be-; sufijos -ung, -heit, -keit, -schaft (sustantivos) y -bar, -los, -lich, -ig, -isch (adjetivos); la universidad",
    "keys": [
        "*un-* niega adjetivos: *ehrlich → unehrlich*; *miss-* = mal, al revés: *missverstehen*.",
        "*zer-* = en pedazos (*zerbrechen*); *be-* vuelve transitivo: *auf die Frage antworten → die Frage beantworten*.",
        "*ver-, zer-, be-, miss-* son inseparables: participio sin *ge-* (*verstanden, zerstört*).",
        "*-ung, -heit, -keit, -schaft* forman sustantivos **femeninos**.",
        "*-keit* va después de *-ig, -lich, -bar, -sam*: *Möglichkeit, Schwierigkeit*.",
        "*-bar* = se puede (*machbar*); *-los* = sin (*kostenlos*); *kindlich* ≠ *kindisch*.",
    ],
    "lesson": {
        "intro": "*Un-ver-gess-lich*: cuatro piezas, una sola palabra, y la entendés aunque no la hayas visto nunca. Esta semana desarmás el mecano del alemán, con palabras del mundo universitario: *Vorlesung, Hausarbeit, Sprechstunde*.",
        "parts": [
            {"h": "Prefijos: un-, miss-, ver-, zer-, be-", "blocks": [0, 1, 2, 7, 8]},
            {"h": "Sufijos de sustantivo: -ung, -heit, -keit, -schaft", "blocks": [3, 4, 9]},
            {"h": "Sufijos de adjetivo: -bar, -los, -lich, -ig, -isch", "blocks": [5, 6]},
        ],
        "blocks": [
            {
                "h": "un-: lo contrario",
                "r": "*un-* delante de un **adjetivo** (o de algunos sustantivos) da lo contrario, como nuestro *in-* o *des-*: *möglich → unmöglich*, *bekannt → unbekannt*. El acento suele caer sobre *un-* (*UNbekannt*); en *unmöglich* o *unglaublich* también se oye en la raíz.",
                "table": {"head": ["Base", "Con un-", "Castellano"], "rows": [
                    ["ehrlich", "unehrlich", "deshonesto"],
                    ["zufrieden", "unzufrieden", "insatisfecho, disconforme"],
                    ["verständlich", "unverständlich", "incomprensible"],
                    ["pünktlich", "unpünktlich", "impuntual"],
                    ["die Ordnung", "die Unordnung", "el desorden"],
                    ["das Glück", "das Unglück", "la desgracia, el accidente"],
                ]},
                "ex": [
                    ["Die Vorlesung war *unglaublich* langweilig.", "La clase teórica fue increíblemente aburrida."],
                    ["Viele Studierende sind mit den Prüfungen *unzufrieden*.", "Muchos estudiantes están disconformes con los exámenes."],
                ],
                "warn": "No todo adjetivo acepta *un-*: el contrario de *gut* es *schlecht* («ungut» casi no se usa) y el de *alt* es *jung* o *neu*. *un-* se usa sobre todo con adjetivos derivados (*-lich, -bar, -ig*) y participios.",
                "tip": "*unfreundlich* es más fuerte que *nicht freundlich*: el primero es «antipático»; el segundo, «no del todo amable».",
                "q": [
                    q("Lo contrario de *möglich*:", "unmöglich", ["unmöglich", "inmöglich", "möglichlos"]),
                    q("*die Unordnung* significa…", "el desorden", ["el desorden", "la orden", "el pedido"]),
                ],
            },
            {
                "h": "miss-: mal, al revés",
                "r": "*miss-* indica que algo sale **mal** o **al revés**, como nuestro «mal-» o «des-»: *verstehen → missverstehen* (malinterpretar), *trauen → misstrauen* (desconfiar). Es inseparable: *ich missverstehe*, *ich habe missverstanden*.",
                "table": {"head": ["Palabra", "Castellano"], "rows": [
                    ["missverstehen / das Missverständnis", "malinterpretar / el malentendido"],
                    ["misslingen (ist misslungen)", "salir mal, fracasar"],
                    ["misstrauen (+ dativo) / das Misstrauen", "desconfiar / la desconfianza"],
                    ["der Misserfolg", "el fracaso"],
                    ["missbrauchen / der Missbrauch", "abusar de / el abuso"],
                ]},
                "ex": [
                    ["Da hast du mich *missverstanden*.", "Ahí me malinterpretaste."],
                    ["Das Experiment ist leider *misslungen*.", "Lamentablemente, el experimento salió mal."],
                    ["Ich *misstraue* solchen Statistiken.", "Desconfío de ese tipo de estadísticas."],
                ],
                "warn": "*misslingen* es como *gefallen*: lo que sale mal es el sujeto y la persona va en dativo: *Der Versuch ist mir misslungen* = «el intento me salió mal».",
                "q": [
                    q("«Me malinterpretaste»:", "Du hast mich missverstanden.", ["Du hast mich missverstanden.", "Du hast mich gemissverstanden.", "Du hast mich unverstanden."]),
                ],
            },
            {
                "h": "ver-, zer-, be-",
                "r": "**ver-** tiene varios sentidos: equivocarse (*sich verlaufen, sich verschreiben, verschlafen*), cambiar de estado a partir de un adjetivo (*besser → verbessern*, *länger → verlängern*) o dar el sentido opuesto (*kaufen → verkaufen*, *mieten → vermieten*). **zer-** = romper en pedazos, destruir. **be-** convierte un verbo con preposición en un verbo con **acusativo** directo.",
                "table": {"head": ["Prefijo", "Ejemplo", "Castellano"], "rows": [
                    ["ver- (error)", "sich verlaufen, sich verschreiben", "perderse (a pie), escribir mal"],
                    ["ver- (cambio)", "verbessern, vergrößern", "mejorar, agrandar"],
                    ["zer-", "zerbrechen, zerstören, zerreißen", "romper(se), destruir, despedazar"],
                    ["be-", "auf eine Frage antworten → eine Frage beantworten", "responder (a) una pregunta"],
                    ["be-", "über ein Thema sprechen → ein Thema besprechen", "hablar sobre / discutir un tema"],
                ]},
                "ex": [
                    ["Ich habe *verschlafen* und die Vorlesung verpasst.", "Me quedé dormido y me perdí la clase."],
                    ["Der Professor hat meine Hausarbeit *verbessert*.", "El profesor corrigió mi trabajo práctico."],
                    ["Das Feuer hat die alte Bibliothek *zerstört*.", "El fuego destruyó la vieja biblioteca."],
                    ["Bitte *beantworten* Sie alle Fragen.", "Por favor, responda todas las preguntas."],
                ],
                "warn": "Con *be-* desaparece la preposición: *auf die Frage antworten* pero *die Frage beantworten* (nunca «auf die Frage beantworten»). Y los cuatro prefijos son inseparables: *beantwortet, zerstört, verbessert*, sin *ge-*.",
                "tip": "*sich verlaufen* (a pie) y *sich verfahren* (en auto): «perderse» depende de cómo ibas.",
                "q": [
                    q("Completá: *Bitte ___ Sie die E-Mail bis Freitag.*", "beantworten", ["beantworten", "antworten", "verantworten"]),
                    q("*Das Glas ist ___.* (se hizo pedazos)", "zerbrochen", ["zerbrochen", "verbrochen", "gezerbrochen"]),
                ],
            },
            {
                "h": "-ung: del verbo al sustantivo",
                "r": "*-ung* forma sustantivos a partir de **verbos** y siempre son **femeninos**, con plural en *-en*. Ya lo viste en el estilo nominal; en la universidad está en todas partes.",
                "table": {"head": ["Verbo", "Sustantivo", "Castellano"], "rows": [
                    ["vorlesen", "die Vorlesung", "la clase teórica (en un aula grande)"],
                    ["prüfen", "die Prüfung", "el examen"],
                    ["sich anmelden", "die Anmeldung", "la inscripción"],
                    ["sich bewerben", "die Bewerbung", "la postulación"],
                    ["einführen", "die Einführung", "la introducción"],
                    ["üben", "die Übung", "el ejercicio; la clase práctica"],
                ]},
                "ex": [
                    ["Die *Anmeldung* für die Prüfung endet am Freitag.", "La inscripción al examen cierra el viernes."],
                    ["Die *Einführung* in die Statistik ist Pflicht.", "La introducción a la estadística es obligatoria."],
                ],
                "warn": "*die Vorlesung* no es «la lectura» sino la clase magistral del profesor. Y *die Übung* en la facultad es la clase práctica, no solo un ejercicio.",
                "q": [
                    q("Plural de *die Prüfung*:", "die Prüfungen", ["die Prüfungen", "die Prüfunge", "die Prüfungs"]),
                    q("El sustantivo de *sich anmelden*:", "die Anmeldung", ["die Anmeldung", "die Anmelde", "die Abmeldung"]),
                ],
            },
            {
                "h": "-heit, -keit, -schaft",
                "r": "**-heit** y **-keit** forman sustantivos abstractos a partir de **adjetivos** (como nuestro *-dad*): *frei → die Freiheit*. *-keit* va después de **-ig, -lich, -bar, -sam** y, en general, de **-er/-el** (*Sauberkeit, Tapferkeit*; excepciones: *Sicherheit, Dunkelheit*); *-heit*, en casi todos los demás. **-schaft** forma colectivos o relaciones a partir de sustantivos: *der Freund → die Freundschaft*. Los tres son **femeninos**.",
                "table": {"head": ["Sufijo", "Ejemplos"], "rows": [
                    ["-heit", "frei → Freiheit, krank → Krankheit, gesund → Gesundheit, sicher → Sicherheit"],
                    ["-keit", "möglich → Möglichkeit, schwierig → Schwierigkeit, dankbar → Dankbarkeit, einsam → Einsamkeit"],
                    ["-igkeit", "genau → Genauigkeit, schnell → Schnelligkeit, müde → Müdigkeit"],
                    ["-schaft", "Freund → Freundschaft, Mann → Mannschaft, Wissen → Wissenschaft, Land → Landschaft"],
                ]},
                "ex": [
                    ["Ich habe *Schwierigkeiten* mit der Hausarbeit.", "Tengo dificultades con el trabajo práctico."],
                    ["Die *Freiheit* der *Wissenschaft* ist im Grundgesetz garantiert.", "La libertad de la ciencia está garantizada en la Ley Fundamental."],
                    ["In der *Gesellschaft* gibt es viele Meinungen.", "En la sociedad hay muchas opiniones."],
                ],
                "warn": "Aunque la base sea masculina o neutra, el resultado es femenino: *der Freund → die Freundschaft*, *das Kind → die Kindheit*.",
                "tip": "Muchas palabras en *-dad / -tad* son *-heit / -keit*: libertad = *Freiheit*, seguridad = *Sicherheit*, posibilidad = *Möglichkeit*.",
                "q": [
                    q("*schwierig* →", "die Schwierigkeit", ["die Schwierigkeit", "die Schwierigheit", "die Schwere"]),
                    q("¿Qué artículo lleva *Wissenschaft*?", "die", ["die", "das", "der"]),
                ],
            },
            {
                "h": "-bar y -los",
                "r": "**-bar** se agrega a la raíz de un verbo con objeto directo y significa **«que se puede»**, como nuestro *-ble*: *machen → machbar* (realizable), *lesen → lesbar* (legible). **-los** se agrega a un sustantivo y significa **«sin»**: *die Kosten → kostenlos* (gratis), *die Hoffnung → hoffnungslos*. Su contrario suele ser *-voll* o *-reich*.",
                "table": {"head": ["-bar", "-los", "contrario de -los"], "rows": [
                    ["machbar (realizable)", "kostenlos (gratis)", "kostenpflichtig (pago)"],
                    ["essbar (comestible)", "arbeitslos (desocupado)", "–"],
                    ["erreichbar (ubicable)", "hoffnungslos (desesperado)", "hoffnungsvoll"],
                    ["vergleichbar (comparable)", "erfolglos (sin éxito)", "erfolgreich"],
                ]},
                "ex": [
                    ["Der Zeitplan ist kaum *machbar*.", "El cronograma es casi irrealizable."],
                    ["Die Sprechstunde ist *kostenlos*.", "La consulta es gratuita."],
                    ["Seine Handschrift ist *unlesbar*.", "Su letra es ilegible."],
                ],
                "warn": "*-los* va pegado al sustantivo, a veces con una *-s-* o una *-n-* de unión: *arbeitslos, hoffnungslos, namenlos* (*Name* + *n*). No lo confundas con *los* (suelto) de *Was ist los?*",
                "more": ["La semana que viene vas a usar *-bar* como alternativa a la pasiva: *Das Gerät ist reparierbar* = se puede reparar."],
                "q": [
                    q("«Se puede hacer» →", "machbar", ["machbar", "mächtig", "gemacht"]),
                    q("«Sin trabajo» →", "arbeitslos", ["arbeitslos", "arbeitsam", "arbeitsfähig"]),
                ],
            },
            {
                "h": "-lich, -ig, -isch",
                "r": "**-lich** forma adjetivos de sustantivos y verbos, muchas veces con diéresis: *der Tag → täglich*, *der Arzt → ärztlich*, *die Wissenschaft → wissenschaftlich*. **-ig** también: *die Sonne → sonnig*, *die Lust → lustig*; y de adverbios de tiempo y lugar: *heute → heutig*. **-isch** aparece en palabras extranjeras, nacionalidades y adjetivos con matiz negativo: *praktisch, politisch, argentinisch, kindisch*.",
                "table": {"head": ["Par", "Diferencia"], "rows": [
                    ["kindlich / kindisch", "infantil, de niño (neutro) / infantil, inmaduro (crítica)"],
                    ["zweiwöchig / zweiwöchentlich", "que dura dos semanas / cada dos semanas"],
                    ["geschäftlich / geschäftig", "de negocios / atareado"],
                ]},
                "ex": [
                    ["Das ist eine *wissenschaftliche* Arbeit.", "Es un trabajo científico."],
                    ["Die *heutige* Vorlesung fällt aus.", "La clase de hoy se suspende."],
                    ["Sei nicht so *kindisch*!", "¡No seas tan infantil!"],
                    ["Wir machen einen *zweiwöchigen* Kurs.", "Hacemos un curso de dos semanas."],
                ],
                "warn": "Los adjetivos se escriben con minúscula aunque vengan de un sustantivo o de un país: *argentinisch, deutsch, wissenschaftlich*.",
                "more": ["Las piezas se combinan: *un-ver-gess-lich* (inolvidable), *Un-abhängig-keit* (independencia), *Un-vergleich-bar-keit*."],
                "q": [
                    q("«Se comporta de forma inmadura»: *Er ist sehr ___.*", "kindisch", ["kindisch", "kindlich", "kinderlos"]),
                    q("«Todos los días» →", "täglich", ["täglich", "tagsüber", "tägig"]),
                ],
            },
            {
                "h": "er- y ent-",
                "r": "**er-** marca que se **llega al resultado** (a veces, con esfuerzo): *reichen → erreichen* (alcanzar, lograr), *kämpfen → erkämpfen* (conseguir peleando). Con verbos de muerte, morir **por** eso: *frieren → erfrieren* (morir congelado), *trinken → ertrinken* (ahogarse). **ent-** se parece a nuestro **«des-»**: quitar, alejarse, salir de: *decken → entdecken* (des-cubrir), *wickeln → entwickeln* (des-arrollar), *spannen → entspannen* (dis-tender, relajar), *kommen → entkommen* (escaparse).",
                "table": {"head": ["Base", "Con prefijo", "Castellano"], "rows": [
                    ["reichen (alcanzar, bastar)", "erreichen", "alcanzar, llegar a, lograr"],
                    ["frieren (tener frío)", "erfrieren", "morir congelado"],
                    ["trinken (tomar)", "ertrinken", "ahogarse"],
                    ["decken (cubrir)", "entdecken", "descubrir"],
                    ["wickeln (envolver)", "entwickeln", "desarrollar"],
                    ["spannen (tensar)", "entspannen", "relajar(se)"],
                ]},
                "ex": [
                    ["Wir haben den Zug gerade noch *erreicht*.", "Alcanzamos el tren justo."],
                    ["Kolumbus *entdeckte* 1492 Amerika.", "Colón descubrió América en 1492."],
                    ["Die Firma *entwickelt* eine neue App.", "La empresa desarrolla una aplicación nueva."],
                    ["Am Wochenende will ich mich nur *entspannen*.", "El fin de semana solo quiero relajarme."],
                ],
                "warn": "Los dos son **inseparables** y sin *ge-*: *erreicht, entdeckt, entwickelt*. Y *erreichen* lleva acusativo directo, sin preposición: «llegar **al** tren / **a** la meta» = *den Zug / das Ziel erreichen* (nada de «an den Zug»).",
                "tip": "Si ves *ent-*, probá traducir con «des-»: *entdecken, entwickeln, enttäuschen* (des-ilusionar, decepcionar), *entladen* (descargar).",
                "q": [
                    q("«Descubrir» →", "entdecken", ["entdecken", "erdecken", "verdecken"]),
                    q("Completá: *Wir haben das Ziel ___.* (logramos)", "erreicht", ["erreicht", "entreicht", "gereicht"]),
                ],
            },
            {
                "h": "Separable o no: el acento manda",
                "r": "Algunos prefijos (*um-, über-, unter-, durch-, wieder-*) pueden ir de las dos maneras, y **cambia el significado**. Si el **acento** cae en el prefijo, es **separable** y tiene el sentido concreto (*-ge-* en el medio). Si el acento cae en el verbo, es **inseparable**, sin *ge-*, y casi siempre tiene un sentido figurado.",
                "table": {"head": ["Separable (acento en el prefijo)", "Inseparable (acento en el verbo)"], "rows": [
                    ["UMfahren: Er fährt den Baum um. (lo voltea con el auto) · hat umgefahren", "umFAHren: Er umfährt den Stau. (lo esquiva) · hat umfahren"],
                    ["ÜBERsetzen: Wir setzen mit der Fähre über. (cruzamos) · hat übergesetzt", "überSETzen: Ich übersetze den Text. (traduzco) · hat übersetzt"],
                    ["WIEDERholen: Er holt den Ball wieder. (lo va a buscar) · hat wiedergeholt", "wiederHOlen: Kannst du das wiederholen? (repetir) · hat wiederholt"],
                    ["DURCHschauen: Ich schaue die Post durch. (la reviso por encima) · hat durchgeschaut", "durchSCHAUen: Ich durchschaue dich! (te calé) · hat durchschaut"],
                ]},
                "ex": [
                    ["Der Text ist schon *übersetzt*.", "El texto ya está traducido."],
                    ["Wir haben den Stau *umfahren*.", "Esquivamos el embotellamiento."],
                    ["Ein Lkw hat das Schild *umgefahren*.", "Un camión volteó el cartel."],
                ],
                "warn": "El error típico es «Ich habe den Text übergesetzt» o «Ich setze den Text über»: «traducir» es inseparable: *Ich übersetze, ich habe übersetzt*. Lo mismo «repetir»: *Ich wiederhole, ich habe wiederholt*.",
                "tip": "El significado más usado en el día a día suele ser el **inseparable**: *übersetzen* (traducir), *wiederholen* (repetir), *sich unterhalten* (charlar).",
                "q": [
                    q("Perfekt de «traducir»: *Ich habe den Brief ___.*", "übersetzt", ["übersetzt", "übergesetzt", "geübersetzt"]),
                    q("*Wir haben den Stau umfahren* significa…", "Esquivamos el embotellamiento.", ["Esquivamos el embotellamiento.", "Chocamos el embotellamiento.", "Volvimos al embotellamiento."]),
                ],
            },
            {
                "h": "Compuestos: la -s- y la -n- del medio",
                "r": "Para armar un compuesto, a veces hace falta una letra de **unión** entre las partes. No es plural ni genitivo: es pegamento. Va **-s-** después de *-ung, -heit, -keit, -schaft, -ion, -tät* (y en algunos masculinos y neutros); va **-n-/-en-** después de muchos femeninos en *-e*. El **género y el plural** los pone siempre la **última** parte.",
                "table": {"head": ["Partes", "Compuesto", "Castellano"], "rows": [
                    ["die Wohnung + die Suche", "die Wohnung**s**suche", "la búsqueda de departamento"],
                    ["die Arbeit + der Platz", "der Arbeit**s**platz", "el puesto de trabajo"],
                    ["die Universität + die Bibliothek", "die Universität**s**bibliothek", "la biblioteca de la universidad"],
                    ["die Geburt + der Tag", "der Geburt**s**tag", "el cumpleaños"],
                    ["die Straße + die Bahn", "die Straße**n**bahn", "el tranvía"],
                    ["die Stadt + das Zentrum", "das Stadtzentrum", "el centro de la ciudad"],
                    ["schreiben + der Tisch", "der Schreibtisch", "el escritorio"],
                    ["groß + die Stadt", "die Großstadt", "la gran ciudad"],
                ]},
                "ex": [
                    ["Die *Wohnungssuche* in München ist ein Albtraum.", "Buscar departamento en Múnich es una pesadilla."],
                    ["Wir haben zwei neue *Arbeitsplätze*.", "Tenemos dos puestos de trabajo nuevos."],
                ],
                "warn": "La -s- **no** depende del género de la última parte: *der Arbeitsplatz, die Arbeitszeit, das Arbeitsamt*: la pone la **primera** (*Arbeit*). Y no hay «de» en el medio: «la búsqueda **de** departamento» es una sola palabra, leída de atrás para adelante.",
                "tip": "Si el primer elemento es un verbo, va solo la raíz: *schreib-en → der Schreibtisch, wohn-en → das Wohnzimmer*. Si es un adjetivo, sin terminación: *die Großstadt*.",
                "q": [
                    q("die Wohnung + die Suche →", "die Wohnungssuche", ["die Wohnungssuche", "die Wohnungsuche", "die Wohnungensuche"]),
                    q("¿Qué género tiene *Arbeitsplatz*?", "der", ["der", "die", "das"]),
                ],
            },
        ],
    },
    "vocab": [
        ["die Vorlesung", "la clase teórica, la clase magistral", "Die Vorlesung beginnt um zehn Uhr im Hörsaal 3."],
        ["der Hörsaal", "el aula magna, el auditorio", "Der Hörsaal ist voll, viele sitzen auf dem Boden."],
        ["die Klausur", "el examen escrito (de la facultad)", "Morgen schreiben wir eine Klausur in Statistik."],
        ["die Hausarbeit", "el trabajo práctico, la monografía", "Meine Hausarbeit muss zwanzig Seiten lang sein."],
        ["die Sprechstunde", "el horario de consulta", "Der Professor hat am Mittwoch Sprechstunde."],
        ["die Mensa", "el comedor universitario", "Mittags essen wir in der Mensa."],
        ["das Referat", "la exposición oral (en clase)", "Nächste Woche halte ich ein Referat im Seminar."],
        ["die Abschlussarbeit", "la tesis, el trabajo final", "Er schreibt gerade seine Abschlussarbeit."],
        ["die Wissenschaft", "la ciencia", "Die Wissenschaft braucht Freiheit."],
        ["wissenschaftlich", "científico", "Das ist eine wissenschaftliche Arbeit."],
        ["das Missverständnis", "el malentendido", "Das war nur ein Missverständnis."],
        ["die Schwierigkeit", "la dificultad", "Ich habe Schwierigkeiten mit der Grammatik."],
        ["unverständlich", "incomprensible", "Der Text ist völlig unverständlich."],
        ["machbar", "realizable, factible", "Ist das bis Montag machbar?"],
        ["zerstören", "destruir", "Das Erdbeben hat die Stadt zerstört."],
        ["beantworten", "responder (algo)", "Bitte beantworten Sie alle Fragen."],
    ],
    "items": [
        # parte 0 — prefijos
        ch(0, "Elegí lo contrario.", "möglich ↔ ?", "unmöglich", ["unmöglich", "inmöglich", "möglichlos"], "*un-* niega adjetivos."),
        ch(0, "Elegí la palabra.", "Ich habe dich falsch verstanden. = Ich habe dich ___.", "missverstanden", ["missverstanden", "gemissverstanden", "unverstanden"], "*miss-* = mal: *missverstehen*, participio sin *ge-*."),
        ch(0, "Elegí la palabra.", "Das Glas ist in tausend Stücke ___.", "zerbrochen", ["zerbrochen", "verbrochen", "gezerbrochen"], "*zer-* = en pedazos."),
        ch(0, "Elegí el verbo.", "Bitte ___ Sie die Fragen schriftlich.", "beantworten", ["beantworten", "antworten", "verantworten"], "*be-* + acusativo: *die Fragen beantworten*. *antworten* necesitaría *auf*."),
        ch(0, "Elegí el verbo.", "Ich habe ___ und die Vorlesung verpasst.", "verschlafen", ["verschlafen", "überschlafen", "eingeschlafen"], "*ver-* = equivocarse: *verschlafen*, quedarse dormido."),
        ch(0, "Elegí el participio.", "Wir haben das Thema im Seminar ___.", "besprochen", ["besprochen", "gebesprochen", "besprecht"], "*be-* es inseparable: sin *ge-*."),
        ch(0, "Elegí el participio.", "Leider ist der Versuch ___.", "misslungen", ["misslungen", "gemisslungen", "misslingt"], "*misslingen* → *ist misslungen*, sin *ge-*."),
        cz(0, "Escribí el prefijo (increíble).", "Das ist ___glaublich!", "un", note="*unglaublich* = increíble."),
        cz(0, "Escribí el prefijo (tramitar, procesar).", "Bitte ___arbeiten Sie den Antrag bis Freitag.", "be", note="*an etwas arbeiten → etwas bearbeiten*."),
        cz(0, "Escribí el prefijo (destruir).", "Der Sturm hat viele Häuser ___stört.", "zer", note="*zerstören* = destruir."),
        cz(0, "Escribí el prefijo (perderse a pie).", "Er hat sich auf dem Campus ___laufen.", "ver", note="*sich verlaufen*: el *ver-* del error."),
        cz(0, "Escribí el prefijo (desconfiar).", "Ich ___traue diesen Zahlen.", "miss", note="*misstrauen* + dativo = desconfiar de."),
        ty(0, "Escribí lo contrario de *zufrieden*.", "zufrieden ↔ ?", "unzufrieden", note="*un-* + adjetivo."),
        tr(0, "Fue un malentendido.", "Das war ein Missverständnis.", ["Das war ein Missverständnis.", "Es war ein Missverständnis.", "Das ist ein Missverständnis gewesen."], "*das Missverständnis*, de *missverstehen*."),
        tr(0, "Tenemos que mejorar el texto.", "Wir müssen den Text verbessern.", note="*besser → verbessern*: el *ver-* del cambio de estado."),
        li(0, "zerstören", ["zerstören", "verstören", "stören"], "*zerstören* = destruir; *stören* = molestar."),
        # parte 1 — sustantivos
        ch(1, "Elegí el sustantivo.", "frei →", "die Freiheit", ["die Freiheit", "die Freikeit", "die Freizeit"], "*-heit* después de la mayoría de los adjetivos."),
        ch(1, "Elegí el sustantivo.", "möglich →", "die Möglichkeit", ["die Möglichkeit", "die Möglichheit", "die Ermöglichung"], "Después de *-lich* va *-keit*."),
        ch(1, "Elegí el sustantivo.", "der Freund →", "die Freundschaft", ["die Freundschaft", "die Freundheit", "die Freundlichkeit"], "*-schaft* forma relaciones a partir de sustantivos."),
        ch(1, "Elegí el artículo.", "___ Wissenschaft", "die", ["die", "das", "der"], "*-schaft* siempre es femenino."),
        ch(1, "Elegí el sustantivo.", "schwierig →", "die Schwierigkeit", ["die Schwierigkeit", "die Schwierigheit", "die Schwere"], "Después de *-ig* va *-keit*."),
        ch(1, "Elegí el sustantivo.", "sich anmelden →", "die Anmeldung", ["die Anmeldung", "die Anmelde", "die Abmeldung"], "De verbo: *-ung*."),
        ch(1, "Elegí el plural.", "die Vorlesung →", "die Vorlesungen", ["die Vorlesungen", "die Vorlesunge", "die Vorlesungs"], "*-ung* hace el plural en *-en*."),
        cz(1, "Escribí el final.", "Ich habe Schwierig___ mit der Hausarbeit. (plural)", "keiten", note="*die Schwierigkeit, die Schwierigkeiten*."),
        cz(1, "Escribí el sufijo.", "Die Gesund___ ist das Wichtigste.", "heit", note="*gesund → die Gesundheit*."),
        cz(1, "Escribí el sufijo.", "Die Sicher___ der Daten ist wichtig.", "heit", note="*sicher → die Sicherheit* (nunca «Sicherkeit»)."),
        cz(1, "Escribí el sufijo.", "Ehrlich___ ist eine wichtige Eigenschaft.", "keit", note="Después de *-lich*: *-keit*."),
        cz(1, "Escribí el sufijo.", "Unsere Mann___ hat das Spiel gewonnen.", "schaft", note="*die Mannschaft* = el equipo."),
        ty(1, "Escribí el sustantivo de *prüfen*, con artículo.", "prüfen →", "die Prüfung", note="*-ung*, femenino. " + MAY),
        ty(1, "Escribí el sustantivo de *dankbar*, con artículo.", "dankbar →", "die Dankbarkeit", note="Después de *-bar*: *-keit*. " + MAY),
        ty(1, "Escribí el sustantivo de *krank*, con artículo.", "krank →", "die Krankheit", note="*-heit*, femenino. " + MAY),
        tr(1, "La amistad es importante.", "Freundschaft ist wichtig.", ["Freundschaft ist wichtig.", "Die Freundschaft ist wichtig."], "*der Freund → die Freundschaft*."),
        # parte 2 — adjetivos
        ch(2, "Elegí el adjetivo.", "Das kann man machen. = Das ist ___.", "machbar", ["machbar", "mächtig", "gemacht"], "*-bar* = que se puede."),
        ch(2, "Elegí el adjetivo.", "ohne Kosten = ___", "kostenlos", ["kostenlos", "kostbar", "kostspielig"], "*-los* = sin."),
        ch(2, "Elegí el adjetivo.", "Er benimmt sich wie ein kleines Kind. (crítica) Er ist ___.", "kindisch", ["kindisch", "kindlich", "kinderlos"], "*kindisch* critica; *kindlich* es neutro."),
        ch(2, "Elegí el adjetivo.", "Der Kurs dauert zwei Wochen. = ein ___ Kurs", "zweiwöchiger", ["zweiwöchiger", "zweiwöchentlicher", "zweiwochiger"], "*-ig* = duración; *-lich* = frecuencia (cada dos semanas)."),
        ch(2, "Elegí el adjetivo.", "Das Wasser kann man trinken. = Das Wasser ist ___.", "trinkbar", ["trinkbar", "getrunken", "trinkfest"], "*-bar* sobre la raíz de *trinken*."),
        ch(2, "Elegí el adjetivo.", "jeden Tag = ___", "täglich", ["täglich", "tagsüber", "tägig"], "*der Tag → täglich*, con diéresis."),
        cz(2, "Escribí el sufijo (sin costo).", "Die Beratung ist kosten___.", "los", note="*kostenlos* = gratis."),
        cz(2, "Escribí el sufijo.", "Diese Arbeit ist sehr wissenschaft___.", "lich", note="*die Wissenschaft → wissenschaftlich*."),
        cz(2, "Escribí el sufijo (que se puede leer).", "Seine Handschrift ist kaum les___.", "bar", note="*lesbar* = legible."),
        cz(2, "Escribí el sufijo.", "Der Tipp ist sehr prakt___.", "isch", note="Palabras extranjeras: *-isch*: *praktisch*."),
        cz(2, "Escribí el sufijo.", "Heute ist es sonn___ und warm.", "ig", note="*die Sonne → sonnig*."),
        ty(2, "Escribí el adjetivo: «que no se puede creer».", "un- … -lich", "unglaublich", note="*un- + glaub + -lich*."),
        ty(2, "Escribí el adjetivo: «que no se puede entender».", "un- … -lich", "unverständlich", ["unverständlich", "unverstaendlich"], "*un- + verständ + -lich*."),
        tr(2, "La consulta es gratis.", "Die Beratung ist kostenlos.", ["Die Beratung ist kostenlos.", "Die Sprechstunde ist kostenlos.", "Die Beratung ist gratis.", "Die Sprechstunde ist gratis."], "*kostenlos* = sin costo."),
        tr(2, "Este plan no es realizable.", "Dieser Plan ist nicht machbar.", ["Dieser Plan ist nicht machbar.", "Der Plan ist nicht machbar.", "Dieser Plan ist undurchführbar.", "Der Plan ist undurchführbar."], "*machbar* = realizable."),
        li(2, "unvergesslich", ["unvergesslich", "unverständlich", "unverzichtbar"], "*un-ver-gess-lich* = inolvidable."),
        # parte 0 — er- y ent-
        ch(0, "Elegí el verbo.", "Kolumbus hat 1492 Amerika ___.", "entdeckt", ["entdeckt", "erdeckt", "verdeckt"], "*ent-* ≈ «des-»: *entdecken* = des-cubrir. *verdecken* es tapar."),
        ch(0, "Elegí el verbo.", "Wir haben den letzten Zug gerade noch ___.", "erreicht", ["erreicht", "entreicht", "gereicht"], "*er-* = llegar al resultado: *erreichen* (alcanzar), con acusativo y sin *ge-*."),
        cz(0, "Escribí el verbo con *ent-* (relajarse).", "Nach der Arbeit will ich mich nur ___.", "entspannen", note="*spannen* = tensar; *entspannen* = dis-tender, relajar(se). Reflexivo: *sich entspannen*."),
        tr(0, "La empresa desarrolla un producto nuevo.", "Die Firma entwickelt ein neues Produkt.", ["Die Firma entwickelt ein neues Produkt.", "Das Unternehmen entwickelt ein neues Produkt."], "«des-arrollar» = *ent-wickeln* (des-envolver). Inseparable: *entwickelt*."),
        # parte 0 — separable o no
        tr(0, "Ya traduje el texto.", "Ich habe den Text schon übersetzt.", ["Ich habe den Text schon übersetzt.", "Ich habe den Text bereits übersetzt.", "Den Text habe ich schon übersetzt."], "«traducir» = *überSETzen*, inseparable: *übersetzt*, sin *ge-*. «übergesetzt» es «cruzado en barco»."),
        tr(0, "¿Podés repetir eso?", "Kannst du das wiederholen?", ["Kannst du das wiederholen?", "Kannst du das bitte wiederholen?", "Könntest du das wiederholen?", "Könntest du das bitte wiederholen?", "Kannst du das noch mal wiederholen?"], "«repetir» = *wiederHOlen*, inseparable. *wiederholen* separable (*holt … wieder*) es «ir a buscar de vuelta»."),
        ch(0, "¿Qué significa?", "Wir haben den Stau umfahren.", "Esquivamos el embotellamiento.", ["Esquivamos el embotellamiento.", "Atropellamos el embotellamiento.", "Volvimos al embotellamiento."], "Sin *-ge-* en el medio → inseparable (*umFAHren*) = rodear, esquivar. *umgefahren* = voltear con el auto."),
        ch(0, "Encontrá el error.", "¿Qué oración tiene un error?", "Ich habe den Text ins Spanische übergesetzt.", ["Ich habe den Text ins Spanische übergesetzt.", "Ich habe den Text ins Spanische übersetzt.", "Ein Lkw hat das Schild umgefahren."], "«traducir» es inseparable: *übersetzt*. *umgefahren* sí está bien: es el separable (voltear)."),
        # parte 1 — compuestos con -s- y -n-
        ty(1, "Armá el compuesto, con artículo.", "die Arbeit + der Platz", "der Arbeitsplatz", note="*Arbeit* pide la -s- de unión; el género lo pone *der Platz*. " + MAY),
        ty(1, "Armá el compuesto, con artículo.", "die Straße + die Bahn", "die Straßenbahn", ["die Straßenbahn", "die Strassenbahn"], "Femenino en *-e* → *-n-* de unión: *Straße-n-bahn*. " + MAY),
        ty(1, "Armá el compuesto, con artículo.", "die Stadt + das Zentrum", "das Stadtzentrum", note="Sin letra de unión; el género lo pone *das Zentrum*. " + MAY),
        ch(1, "Elegí la forma.", "die Wohnung + die Suche", "die Wohnungssuche", ["die Wohnungssuche", "die Wohnungsuche", "die Wohnungensuche"], "Después de *-ung* va siempre *-s-*: *Wohnung-s-suche* (con dos s)."),
        ch(1, "Elegí el artículo.", "___ Universitätsbibliothek", "die", ["die", "der", "das"], "Manda la última parte: *die Bibliothek*. La *-s-* es de unión, viene de *-tät*."),
        ty(1, "Armá el compuesto, con artículo.", "schreiben + der Tisch", "der Schreibtisch", note="Verbo como primera parte: solo la raíz (*schreib-*). " + MAY),
        # encontrá el error, dictado y repaso (semanas 21 a 35)
        fx(0, "Ich habe den Brief ins Deutsche übergesetzt.", "übergesetzt", "übersetzt", "participio", "*übersetzen* (traducir) es inseparable: el acento cae en *-set-* y el participio no lleva *ge-*: *übersetzt*. Igual que *verstanden*, *bekommen*, *erklärt*."),
        fx(1, "Unser Freundschaft ist mir sehr wichtig.", "Unser", "Unsere", "género", "*-schaft* hace sustantivos femeninos: *unsere Freundschaft*, aunque *der Freund* sea masculino. En los derivados manda el sufijo."),
        fx(2, "Das Wasser ist hier nicht trinklich.", "trinklich", "trinkbar", "sufijo", "«Que se puede + verbo» es *-bar*: *trinkbar* (potable), *machbar*, *lesbar*. *-lich* también existe (*verständlich*), pero no con todos los verbos."),
        di(1, "Die Freundlichkeit der Leute hat mich überrascht.", note="*-keit* hace femeninos: *die Freundlichkeit*. *der Leute*: genitivo plural."),
        di(2, "In der Mensa gibt es einen kostenlosen Kaffee.", note="*es gibt* + acusativo: *einen kostenlosen Kaffee*, con -en dos veces. *-los* = sin (costo)."),
        ty(2, "Escribí dos oraciones sobre tu primera semana en la facu: una con un adjetivo con *un-* y otra con uno con *-los*.", "(la clase fue incomprensible · el café en el comedor es gratis)", "Die Vorlesung war unverständlich. Der Kaffee in der Mensa ist kostenlos.", _mix(["Die Vorlesung war unverständlich.", "Die Vorlesung war völlig unverständlich.", "Die Vorlesung war total unverständlich.", "Die Vorlesung war für mich unverständlich."], ["Der Kaffee in der Mensa ist kostenlos.", "In der Mensa ist der Kaffee kostenlos.", "Der Kaffee ist in der Mensa kostenlos."]), "*un-* da lo contrario: *verständlich* → *unverständlich*. *-los* = sin: *kostenlos*, gratis. Con *In der Mensa* adelante, el verbo va enseguida."),
        cz(2, "Escribí *wurde* o *würde*.", "Ich ___ gern an der Vorlesung teilnehmen, aber ich muss arbeiten.", "würde", note="Repaso de la semana 25: deseo o cortesía → *würde* + infinitivo, con ü. *wurde* (sin ü) es el pasado."),
        cz(2, "Escribí *deshalb* o *trotzdem*.", "Die Vorlesung war langweilig, ___ bin ich bis zum Ende geblieben.", "trotzdem", note="Repaso de la semana 34: «igual, de todas formas» → *trotzdem*, con el verbo enseguida. *deshalb* diría que te quedaste porque era aburrida."),
        tr(2, "Cuando llegué al aula, la clase ya había empezado.", "Als ich in den Hörsaal kam, hatte die Vorlesung schon angefangen.", _mix(["Als ich in den Hörsaal kam, hatte die Vorlesung schon angefangen.", "Als ich in den Hörsaal kam, hatte die Vorlesung schon begonnen.", "Als ich in den Hörsaal kam, hatte die Vorlesung bereits angefangen.", "Als ich in den Hörsaal kam, hatte die Vorlesung bereits begonnen.", "Als ich im Hörsaal ankam, hatte die Vorlesung schon angefangen.", "Als ich im Hörsaal ankam, hatte die Vorlesung schon begonnen."]), "Repaso de las semanas 21 y 28: una vez en el pasado → *als*; lo que pasó antes, en Plusquamperfekt: *hatte … angefangen*."),
        cz(2, "Escribí *sein* en Konjunktiv I.", "Die Professorin sagte, die Klausur ___ nicht schwer.", "sei", note="Repaso de la semana 35: discurso indirecto → Konjunktiv I: *sei*, sin *-e* final."),
    ],
}
