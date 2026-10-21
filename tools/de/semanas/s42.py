# -*- coding: utf-8 -*-
"""Semana 42 — Einerseits, andererseits (B2): conectores para argumentar y Redemittel de debate."""
from itertools import product

from base import q, ch, li, cz, tr, ty, MAY  # noqa: F401


def V(*parts):
    """Todas las combinaciones: cada parte es un texto fijo o una lista de variantes."""
    return ["".join(p) for p in product(*[[x] if isinstance(x, str) else x for x in parts])]


WEEK = {
    "week": 42,
    "title": "Einerseits, andererseits",
    "level": "B2",
    "focus": "Argumentar como en un debate: contraponer dos posturas, matizar, sumar razones y contradecir con los conectores del registro culto.",
    "fare": "Comparar dos posiciones, conceder un punto y contradecir con elegancia, en una discusión o en un texto de opinión.",
    "tema": "Conectores adversativos y aditivos (während, wohingegen, hingegen, allerdings, dennoch, außerdem, zudem), Redemittel para debatir, opinión pública",
    "keys": [
        "*während* y *wohingegen* subordinan (verbo al final) y contraponen: *…, wohingegen die Löhne stagnieren*.",
        "*hingegen* y *dagegen* son adverbios: posición 1 con el verbo detrás, o en el medio: *Die Löhne hingegen stagnieren*.",
        "*einerseits …, andererseits …* = por un lado…, por el otro.",
        "*allerdings* restringe («eso sí»); *dennoch* es un *trotzdem* de registro alto.",
        "*außerdem, zudem, darüber hinaus* suman argumentos y van seguidos del verbo.",
        "*Meiner Meinung nach ist…*, *Ich halte das für…*, *Da muss ich Ihnen widersprechen*.",
    ],
    "lesson": {
        "intro": "En un debate no alcanza con tener razón: hay que ordenar los argumentos, mostrar las dos caras y contradecir sin pelearse. Esta semana: los conectores que contraponen y suman, y las fórmulas para opinar y discutir en alemán culto.",
        "parts": [
            {"h": "Contraponer: während, wohingegen, hingegen", "blocks": [0, 1, 2]},
            {"h": "Matizar y sumar: allerdings, dennoch, zudem", "blocks": [3, 4, 5]},
            {"h": "Opinar y discutir", "blocks": [6, 7]},
        ],
        "blocks": [
            {
                "h": "während y wohingegen: contraste con verbo al final",
                "r": "Ya conocés *während* como preposición con genitivo (*während des Spiels*) y como conector temporal (*während ich koche*). También sirve para **contraponer** dos hechos, como nuestro «mientras que». *wohingegen* significa lo mismo, pero **solo** es contraste y suena más formal. Los dos son **subordinantes**: el verbo conjugado va al **final**.",
                "table": {"head": ["Conector", "Tipo", "Ejemplo"], "rows": [
                    ["während", "subordinante: verbo al final", "…, während die Löhne kaum steigen."],
                    ["wohingegen", "subordinante: verbo al final (solo contraste, formal)", "…, wohingegen die Löhne kaum steigen."],
                    ["hingegen / dagegen", "adverbio: verbo en 2.º lugar", "Die Löhne hingegen steigen kaum."],
                    ["einerseits … andererseits", "adverbios: verbo en 2.º lugar", "Andererseits steigen die Löhne kaum."],
                ]},
                "ex": [
                    ["Die Mieten steigen rasant, *während* die Löhne kaum *wachsen*.", "Los alquileres suben muchísimo, mientras que los sueldos casi no crecen."],
                    ["*Während* Stadtbewohner kaum ein Auto *brauchen*, *sind* Menschen auf dem Land darauf angewiesen.", "Mientras que en la ciudad casi no hace falta auto, en el campo la gente depende de él."],
                    ["Die Älteren lesen Zeitung, *wohingegen* sich die Jüngeren in sozialen Medien *informieren*.", "Los mayores leen el diario, mientras que los jóvenes se informan en las redes."],
                ],
                "warn": "*während* puede ser temporal o de contraste, y el contexto decide. Si no querés dejar dudas, usá *wohingegen*. Y si la subordinada va primero, la principal **arranca con el verbo**: *Während A teuer ist, ist B billig*.",
                "tip": "*wohingegen* casi siempre va **después** de la principal; *während* puede ir antes o después.",
                "q": [
                    q("Completá: *Er spricht gern, ___ sie lieber zuhört.*", "wohingegen", ["wohingegen", "hingegen", "außerdem"]),
                    q("¿Qué orden es correcto?", "Während er spart, gibt sie viel aus.", ["Während er spart, gibt sie viel aus.", "Während er spart, sie gibt viel aus.", "Während spart er, gibt sie viel aus."]),
                ],
            },
            {
                "h": "hingegen, dagegen, im Gegensatz dazu",
                "r": "*hingegen* y *dagegen* («en cambio») no subordinan: son **adverbios**. Pueden ir en la **posición 1** (y el verbo sigue segundo), en el **campo medio**, o justo **después del sujeto** que contrastás, que es la opción más elegante. *im Gegensatz dazu* («en contraste con eso») funciona igual, pero va en posición 1 o en el medio.",
                "ex": [
                    ["Die Befürworter sind optimistisch. Die Gegner *hingegen* warnen vor hohen Kosten.", "Los partidarios son optimistas. Los opositores, en cambio, advierten sobre costos altos."],
                    ["*Hingegen* warnen die Gegner vor hohen Kosten.", "En cambio, los opositores advierten sobre costos altos."],
                    ["Die Gegner warnen *dagegen* vor hohen Kosten.", "Los opositores, en cambio, advierten sobre costos altos."],
                    ["Im Norden regnet es viel. *Im Gegensatz dazu* ist der Süden sehr trocken.", "En el norte llueve mucho. En contraste, el sur es muy seco."],
                ],
                "warn": "En castellano «en cambio» va casi en cualquier lugar, entre comas. En alemán, si *hingegen* va al principio, **ocupa la posición 1**: *Hingegen warnen die Gegner*, nunca *Hingegen die Gegner warnen*.",
                "tip": "El patrón *sujeto + hingegen + verbo* (*Ich hingegen sehe das anders*) es el más usado en textos de opinión: subraya justo lo que contrastás.",
                "q": [
                    q("¿Qué oración es correcta?", "Die Gegner hingegen warnen davor.", ["Die Gegner hingegen warnen davor.", "Hingegen die Gegner warnen davor.", "Die Gegner, hingegen sie warnen davor."]),
                    q("*hingegen* es…", "un adverbio: no manda el verbo al final", ["un adverbio: no manda el verbo al final", "un subordinante como *weil*", "una preposición con dativo"]),
                ],
            },
            {
                "h": "Einerseits …, andererseits …",
                "r": "Para presentar **las dos caras** de un tema: *einerseits* («por un lado») y *andererseits* («por el otro»). Son adverbios: si encabezan la oración, el verbo va **segundo**; también pueden ir en el campo medio. *andererseits* solo sirve para traer la mirada contraria: *Andererseits muss man bedenken, dass…*",
                "ex": [
                    ["*Einerseits* ist das Auto bequem, *andererseits* verschmutzt es die Luft.", "Por un lado el auto es cómodo; por el otro, contamina el aire."],
                    ["Ich möchte *einerseits* Geld sparen, *andererseits* aber auch reisen.", "Por un lado quiero ahorrar plata, pero por el otro también viajar."],
                    ["Das Homeoffice spart Zeit. *Andererseits* fehlt vielen der Kontakt zu den Kollegen.", "El home office ahorra tiempo. Por otra parte, a muchos les falta el contacto con los compañeros."],
                ],
                "warn": "Después de *einerseits* en posición 1 viene el verbo, no el sujeto: *Einerseits ist das Auto bequem*, no *Einerseits das Auto ist bequem*.",
                "more": ["En la redacción argumentativa alemana (*die Erörterung*) es clásico el esquema pro – contra – opinión propia: *Einerseits spricht für …, dass … Andererseits darf man nicht vergessen, dass … Insgesamt bin ich der Meinung, dass …*"],
                "q": [
                    q("Completá: *Einerseits ist die Wohnung schön, ___ ist sie sehr laut.*", "andererseits", ["andererseits", "außerdem", "deshalb"]),
                    q("¿Qué orden es correcto?", "Einerseits ist es teuer, andererseits ist es praktisch.", ["Einerseits ist es teuer, andererseits ist es praktisch.", "Einerseits es ist teuer, andererseits es ist praktisch.", "Einerseits ist es teuer, andererseits es ist praktisch."]),
                ],
            },
            {
                "h": "allerdings y jedoch: matizar",
                "r": "*allerdings* introduce una **restricción**: concedés algo y le ponés un pero. Es como nuestro «eso sí» o «aunque». Es adverbio: posición 1 (con el verbo detrás) o campo medio. *jedoch* («sin embargo») es igual de formal y puede funcionar como adverbio o, como *aber*, ir delante de la oración sin cambiar el orden.",
                "ex": [
                    ["Das Angebot ist günstig, *allerdings* ist die Qualität schlecht.", "La oferta es barata; eso sí, la calidad es mala."],
                    ["Die Idee ist gut. Sie ist *allerdings* schwer umzusetzen.", "La idea es buena. Aunque es difícil de llevar a la práctica."],
                    ["Die Regierung hat Reformen versprochen, *jedoch* ist bisher wenig passiert.", "El gobierno prometió reformas; sin embargo, hasta ahora pasó poco."],
                    ["– War die Prüfung schwer? – *Allerdings!*", "– ¿Fue difícil el examen? – ¡Ya lo creo!"],
                ],
                "warn": "*aber* va en la posición 0 y no cambia el orden: *aber die Qualität ist schlecht*. *allerdings* ocupa la posición 1: *allerdings ist die Qualität schlecht*. Si los mezclás sale *allerdings die Qualität ist schlecht*, que está mal.",
                "tip": "Sola, como respuesta, *Allerdings!* confirma con fuerza: «¡y sí, claro que sí!».",
                "q": [
                    q("Completá: *Das Hotel ist schön, allerdings ___ weit vom Zentrum.*", "liegt es", ["liegt es", "es liegt", "liegen es"]),
                    q("¿Qué conector puede ir en posición 0, como *aber*, sin cambiar el orden?", "jedoch", ["jedoch", "allerdings", "dennoch"]),
                ],
            },
            {
                "h": "dennoch: el trotzdem del registro alto",
                "r": "Ya viste *trotzdem* en la semana 34: «aun así». *dennoch* significa lo mismo y es más formal; *nichtsdestotrotz* es todavía más culto. Los tres son adverbios: **posición 1 + verbo**, o campo medio. Esta tabla ordena lo que viste hasta ahora según el orden de la oración.",
                "table": {"head": ["Idea", "Subordinante (verbo al final)", "Adverbio (verbo en 2.º lugar)"], "rows": [
                    ["concesión: aunque / aun así", "obwohl", "trotzdem, dennoch, nichtsdestotrotz"],
                    ["contraste: mientras que / en cambio", "während, wohingegen", "hingegen, dagegen"],
                    ["restricción: eso sí / sin embargo", "—", "allerdings, jedoch"],
                    ["suma: además", "—", "außerdem, zudem, darüber hinaus"],
                ]},
                "ex": [
                    ["Die Kritik war heftig, *dennoch* hielt die Regierung an ihrem Plan fest.", "Las críticas fueron duras; aun así, el gobierno mantuvo su plan."],
                    ["Die Studie hat Schwächen. Sie liefert *dennoch* wichtige Erkenntnisse.", "El estudio tiene debilidades. Aun así, aporta conclusiones importantes."],
                    ["*Nichtsdestotrotz* sollten wir die Risiken ernst nehmen.", "No obstante, deberíamos tomar en serio los riesgos."],
                ],
                "warn": "*obwohl* y *dennoch* dicen casi lo mismo pero ordenan distinto: *Obwohl die Kritik heftig war, …* (verbo al final), *Die Kritik war heftig, dennoch hielt …* (verbo segundo).",
                "q": [
                    q("Completá: *Es war teuer, ___ haben wir es gekauft.*", "dennoch", ["dennoch", "obwohl", "wohingegen"]),
                    q("*nichtsdestotrotz* significa…", "no obstante, aun así", ["no obstante, aun así", "por lo tanto", "además"]),
                ],
            },
            {
                "h": "außerdem, zudem, darüber hinaus: sumar argumentos",
                "r": "Para **agregar** un argumento: *außerdem* (neutro), *zudem* y *überdies* (más formales), *darüber hinaus* («más allá de eso», muy escrito) y *ferner* (enumeraciones, informes). Todos son adverbios: si arrancan la oración, el **verbo va segundo**.",
                "table": {"head": ["Conector", "Registro", "Equivale a"], "rows": [
                    ["außerdem", "neutro, oral y escrito", "además"],
                    ["zudem", "formal", "además, a eso se suma"],
                    ["überdies", "formal, escrito", "por si fuera poco"],
                    ["darüber hinaus", "muy escrito", "más allá de eso"],
                    ["ferner", "informes, listas", "asimismo"],
                ]},
                "ex": [
                    ["Ein Tempolimit spart Energie. *Außerdem* senkt es die Zahl der Unfälle.", "Un límite de velocidad ahorra energía. Además, baja la cantidad de accidentes."],
                    ["Das Verfahren ist teuer; *zudem* dauert es sehr lange.", "El procedimiento es caro; además, tarda mucho."],
                    ["*Darüber hinaus* muss man die sozialen Folgen berücksichtigen.", "Más allá de eso, hay que tener en cuenta las consecuencias sociales."],
                ],
                "warn": "«Además, pienso…» no es *Außerdem ich denke…*: el verbo va segundo, *Außerdem denke ich, dass…*. Y no confundas *zudem* (además) con *trotzdem* (aun así).",
                "tip": "En un texto no repitas *außerdem* tres veces: alterná con *zudem*, *darüber hinaus* y *Hinzu kommt, dass…* («a esto se suma que…»).",
                "q": [
                    q("¿Qué orden es correcto?", "Zudem kostet das Projekt viel Geld.", ["Zudem kostet das Projekt viel Geld.", "Zudem das Projekt kostet viel Geld.", "Zudem das Projekt viel Geld kostet."]),
                    q("¿Cuál NO suma un argumento?", "dennoch", ["dennoch", "zudem", "darüber hinaus"]),
                ],
            },
            {
                "h": "Dar tu opinión con registro",
                "r": "Para opinar hay fórmulas fijas. Algunas ocupan la posición 1 y dejan el verbo segundo (*Meiner Meinung nach ist…*); otras abren una subordinada con *dass*; y *halten für* lleva acusativo: *Ich halte das für einen Fehler*.",
                "table": {"head": ["Fórmula", "Orden", "Ejemplo"], "rows": [
                    ["Meiner Meinung / Ansicht nach", "posición 1 + verbo", "Meiner Meinung nach ist das Gesetz zu streng."],
                    ["Meines Erachtens (formal)", "posición 1 + verbo", "Meines Erachtens fehlt eine klare Strategie."],
                    ["Ich bin der Meinung / Ansicht, dass …", "dass + verbo al final", "Ich bin der Ansicht, dass wir handeln müssen."],
                    ["Ich vertrete den Standpunkt, dass …", "dass + verbo al final", "Ich vertrete den Standpunkt, dass Bildung kostenlos sein sollte."],
                    ["etwas für + Akk. halten", "opinar que algo es…", "Ich halte den Vorschlag für unrealistisch."],
                    ["Was halten Sie von …? (+ Dat.)", "pregunta", "Was halten Sie von diesem Vorschlag?"],
                ]},
                "warn": "«Pienso que es un error» no es *Ich halte, dass…*: *halten* va con *für* (*Ich halte das für einen Fehler*) o con *von* en la pregunta (*Was hältst du davon?*). Y en *Meiner Meinung nach* el *nach* va **detrás**.",
                "tip": "*Meines Erachtens* (abreviado *m. E.*) es típico de los textos académicos y los debates formales.",
                "q": [
                    q("Completá: *Ich halte das ___ einen Fehler.*", "für", ["für", "von", "als"]),
                    q("¿Qué orden es correcto?", "Meiner Meinung nach ist das falsch.", ["Meiner Meinung nach ist das falsch.", "Meiner Meinung nach das ist falsch.", "Nach meiner Meinung das ist falsch."]),
                ],
            },
            {
                "h": "Reaccionar: conceder y contradecir",
                "r": "En un debate se reacciona a lo que dijo el otro. Lo elegante es **conceder primero y contradecir después** (*zwar …, aber*, semana 29). *widersprechen* lleva **dativo**: *Ich widerspreche Ihnen*.",
                "table": {"head": ["Para…", "Redemittel"], "rows": [
                    ["acordar", "Da stimme ich Ihnen zu. / Da haben Sie völlig recht. / Ich bin ganz Ihrer Meinung."],
                    ["conceder", "Da haben Sie zwar recht, aber … / Ich gebe zu, dass … / Das mag sein, aber …"],
                    ["contradecir", "Das sehe ich anders. / Da muss ich Ihnen widersprechen. / Ich bin anderer Meinung."],
                    ["pedir aclaración", "Wie meinen Sie das? / Könnten Sie das näher erläutern?"],
                    ["defender tu turno", "Lassen Sie mich bitte ausreden! / Um auf meinen Punkt zurückzukommen: …"],
                ]},
                "ex": [
                    ["Das *mag* zwar *sein*, *aber* die Kosten sind zu hoch.", "Puede ser, pero los costos son demasiado altos."],
                    ["*Ich gebe zu*, dass das Argument nicht ganz falsch ist.", "Admito que el argumento no está del todo mal."],
                    ["Da muss ich *Ihnen* entschieden *widersprechen*.", "Ahí tengo que contradecirlo rotundamente."],
                ],
                "warn": "*Ich bin anderer Meinung* va **sin artículo** (es un genitivo fijo): no *Ich bin eine andere Meinung*. Y *Ich bin ganz Ihrer Meinung* = estoy totalmente de acuerdo con usted.",
                "more": ["*recht haben* (tener razón) se escribe con minúscula o con mayúscula: *Sie haben recht* / *Sie haben Recht*. Las dos formas son correctas."],
                "q": [
                    q("Completá: *Da muss ich ___ widersprechen.*", "Ihnen", ["Ihnen", "Sie", "Ihrer"]),
                    q("¿Cómo decís «Soy de otra opinión»?", "Ich bin anderer Meinung.", ["Ich bin anderer Meinung.", "Ich habe andere Meinung.", "Ich bin eine andere Meinung."]),
                ],
            },
        ],
    },
    "vocab": [
        ["der Standpunkt", "el punto de vista, la postura", "Ich vertrete einen anderen Standpunkt."],
        ["der Einwand", "la objeción", "Ihr Einwand ist durchaus berechtigt."],
        ["die Stellungnahme", "la toma de posición, el comunicado", "Die Partei hat eine Stellungnahme veröffentlicht."],
        ["das Gegenargument", "el contraargumento", "Welches Gegenargument fällt dir dazu ein?"],
        ["die Abwägung", "la ponderación", "Nach sorgfältiger Abwägung haben wir uns dagegen entschieden."],
        ["abwägen", "sopesar, ponderar", "Man muss die Vor- und Nachteile genau abwägen."],
        ["vertreten", "sostener (una opinión); representar", "Sie vertritt die Ansicht, dass Bildung kostenlos sein sollte."],
        ["die Gegenposition", "la postura contraria", "Im Debattierclub muss man oft die Gegenposition vertreten."],
        ["einräumen", "admitir, conceder", "Der Minister räumte ein, dass Fehler gemacht worden waren."],
        ["umstritten", "controvertido, polémico", "Das Tempolimit ist in Deutschland seit Jahren umstritten."],
        ["berechtigt", "justificado, legítimo", "Die Kritik an dem Projekt ist berechtigt."],
        ["der Befürworter", "el partidario, el defensor", "Die Befürworter des Gesetzes sind optimistisch."],
        ["der Gegner", "el opositor, el adversario", "Die Gegner warnen vor hohen Kosten."],
        ["die Öffentlichkeit", "el público, la opinión pública", "Der Skandal hat die Öffentlichkeit empört."],
        ["die Umfrage", "la encuesta", "Laut einer Umfrage ist die Mehrheit dafür."],
        ["zweifellos", "sin duda", "Das ist zweifellos ein wichtiges Argument."],
    ],
    "items": [
        # parte 0 — contraponer
        ch(0, "Elegí la continuación correcta.", "Während die Mieten in der Stadt steigen, ___ auf dem Land.", "sinken sie", ["sinken sie", "sie sinken", "sinken"], "Si la subordinada va primero, la principal arranca con el verbo: *sinken sie*."),
        ch(0, "Elegí el conector.", "Mein Bruder liebt Debatten, ___ meine Schwester Diskussionen lieber aus dem Weg geht.", "wohingegen", ["wohingegen", "hingegen", "außerdem"], "El verbo (*geht*) está al final: hace falta un subordinante, *wohingegen*."),
        ch(0, "Elegí el conector.", "Die Jüngeren informieren sich online. Die Älteren ___ lesen lieber Zeitung.", "hingegen", ["hingegen", "wohingegen", "während"], "Detrás del sujeto y con el verbo en 2.º lugar: el adverbio *hingegen*."),
        ch(0, "Elegí la oración correcta.", "Die Stadt investiert viel in Radwege; …", "für Autofahrer hingegen wird wenig getan.", ["für Autofahrer hingegen wird wenig getan.", "für Autofahrer hingegen wenig getan wird.", "hingegen für Autofahrer wird wenig getan."], "*hingegen* es adverbio: el verbo sigue en 2.º lugar. *hingegen* + *für Autofahrer* serían dos elementos antes del verbo."),
        ch(0, "¿Qué significa *während* acá?", "Mein Vater ist sehr sparsam, während meine Mutter gern Geld ausgibt.", "mientras que (contraste)", ["mientras que (contraste)", "durante (preposición)", "después de que"], "Se contraponen dos actitudes: *während* de contraste, como *wohingegen*."),
        cz(0, "Escribí el conector («por un lado»).", "___ ist das Auto bequem, andererseits verschmutzt es die Luft.", "Einerseits", note="*einerseits … andererseits*: por un lado…, por el otro."),
        cz(0, "Escribí el conector («por el otro»).", "Einerseits will ich sparen, ___ möchte ich reisen.", "andererseits", note="*andererseits* ocupa la posición 1: el verbo (*möchte*) va detrás."),
        cz(0, "Escribí un conector subordinante de contraste.", "Die Mieten steigen, ___ die Löhne stagnieren.", "wohingegen", ["wohingegen", "während"], "Verbo al final (*stagnieren*): *wohingegen* o *während*."),
        cz(0, "Escribí un adverbio de contraste («en cambio»).", "Die Befürworter sind optimistisch. Die Gegner ___ warnen vor hohen Kosten.", "hingegen", ["hingegen", "dagegen", "jedoch"], "Después del sujeto que se contrasta: *hingegen* (o *dagegen*, *jedoch*)."),
        cz(0, "Escribí la forma de *diskutieren*.", "Während Peter gern ___, schweigt seine Frau lieber.", "diskutiert", note="*während* subordina: el verbo va al final de su oración."),
        tr(0, "Mientras que mi hermano vive en el campo, yo vivo en la ciudad.", "Während mein Bruder auf dem Land wohnt, wohne ich in der Stadt.",
           V("Während mein Bruder auf dem Land ", ["wohnt, wohne", "lebt, lebe"], " ich in der Stadt.")
           + V("Ich ", ["wohne", "lebe"], " in der Stadt, ", ["während", "wohingegen"], " mein Bruder auf dem Land ", ["wohnt", "lebt"], "."),
           "*während* + verbo al final; después, la principal empieza con el verbo (*wohne ich*)."),
        tr(0, "Por un lado es caro, por el otro es práctico.", "Einerseits ist es teuer, andererseits ist es praktisch.",
           V("Einerseits ist ", ["es", "das"], " teuer, andererseits ist ", ["es", "das"], " praktisch.")
           + V("Einerseits ist ", ["es", "das"], " teuer, andererseits praktisch."),
           "Después de *einerseits* y de *andererseits*, el verbo en 2.º lugar."),
        tr(0, "Los jóvenes, en cambio, lo ven distinto.", "Die Jugendlichen hingegen sehen das anders.",
           V(["Die Jugendlichen", "Die Jungen", "Die jungen Leute"], " ", ["hingegen", "dagegen"], " sehen das anders.")
           + V(["Die Jugendlichen", "Die Jungen", "Die jungen Leute"], " sehen das ", ["hingegen", "dagegen"], " anders.")
           + V(["Hingegen", "Dagegen"], " sehen ", ["die Jugendlichen", "die Jungen", "die jungen Leute"], " das anders."),
           "*hingegen* detrás del sujeto, en el medio o en posición 1: el verbo siempre segundo."),
        ty(0, "Escribí el conector subordinante que solo sirve para contrastar («mientras que»).", "«mientras que» (nunca temporal)", "wohingegen", note="*während* puede ser temporal; *wohingegen*, solo contraste."),
        li(0, "wohingegen", ["wohingegen", "hingegen", "dagegen"], "*wo-hin-gegen*: subordinante, con verbo al final."),
        # parte 1 — matizar y sumar
        ch(1, "Elegí el conector.", "Das Angebot klingt gut, ___ ist es sehr teuer.", "allerdings", ["allerdings", "außerdem", "wohingegen"], "Concedés y restringís: *allerdings* (eso sí). Verbo en 2.º lugar."),
        ch(1, "Elegí el conector.", "Die Kritik war heftig. ___ hielt die Regierung an ihrem Plan fest.", "Dennoch", ["Dennoch", "Zudem", "Deshalb"], "Concesión: aun así. *dennoch* = *trotzdem* formal."),
        ch(1, "Elegí el conector.", "Ein Tempolimit spart Energie. ___ senkt es die Zahl der Unfälle.", "Außerdem", ["Außerdem", "Allerdings", "Dennoch"], "Se suma un argumento a favor: *außerdem*."),
        ch(1, "Elegí la continuación correcta.", "Der Plan ist sinnvoll, zudem …", "kostet er wenig.", ["kostet er wenig.", "er kostet wenig.", "kostet wenig er."], "*zudem* ocupa la posición 1: verbo y después sujeto."),
        ch(1, "¿Qué significa *Allerdings!* como respuesta?", "– Ist das schwierig? – Allerdings!", "¡Ya lo creo!", ["¡Ya lo creo!", "Para nada.", "No sé."], "Solo, como respuesta, *Allerdings!* confirma con énfasis."),
        ch(1, "Elegí el conector.", "Die Regierung hielt am Plan fest, ___ die Kritik heftig war.", "obwohl", ["obwohl", "dennoch", "trotzdem"], "Verbo al final (*war*): subordinante *obwohl*. *dennoch* y *trotzdem* piden el verbo en 2.º lugar."),
        cz(1, "Escribí un conector de restricción («eso sí, sin embargo»).", "Die Idee ist gut, ___ fehlt das Geld.", "allerdings", ["allerdings", "jedoch"], "*allerdings* o *jedoch*, con el verbo (*fehlt*) en 2.º lugar. (*aber* pediría *aber das Geld fehlt*.)"),
        cz(1, "Escribí un conector formal («aun así»).", "Das Projekt war teuer und riskant. ___ wurde es umgesetzt.", "Dennoch", ["Dennoch", "Trotzdem", "Nichtsdestotrotz"], "Concesión con verbo en 2.º lugar: *dennoch* (o *trotzdem*)."),
        cz(1, "Escribí un conector aditivo formal («además»).", "Das Auto ist zu teuer. ___ verbraucht es viel Benzin.", "Zudem", ["Zudem", "Außerdem", "Überdies", "Darüber hinaus", "Ferner"], "Se suma un argumento: *zudem*, *außerdem*, *darüber hinaus*…"),
        cz(1, "Escribí la forma de *haben*.", "Die Wohnung ist hell; außerdem ___ sie einen Balkon.", "hat", note="*außerdem* en posición 1: el verbo va justo detrás."),
        tr(1, "Es una buena idea; eso sí, es cara.", "Das ist eine gute Idee, allerdings ist sie teuer.",
           V(["Das", "Es"], " ist eine gute Idee, ", ["allerdings", "jedoch"], " ist sie teuer.")
           + V(["Das", "Es"], " ist eine gute Idee, sie ist ", ["allerdings", "jedoch"], " teuer.")
           + V(["Das", "Es"], " ist eine gute Idee", [". ", "; "], ["Allerdings", "Jedoch"], " ist sie teuer."),
           "*allerdings* en posición 1 lleva el verbo detrás: *allerdings ist sie teuer*."),
        tr(1, "Era caro; aun así lo compramos.", "Es war teuer, dennoch haben wir es gekauft.",
           V("Es war teuer, ", ["dennoch", "trotzdem"], " haben wir es gekauft.")
           + V("Es war teuer, ", ["dennoch", "trotzdem"], " kauften wir es.")
           + V("Es war teuer, wir haben es ", ["dennoch", "trotzdem"], " gekauft."),
           "*dennoch* (= *trotzdem*): verbo en 2.º lugar."),
        tr(1, "Además, es demasiado tarde.", "Außerdem ist es zu spät.",
           V(["Außerdem", "Zudem", "Darüber hinaus", "Überdies"], " ist es ", ["", "schon "], "zu spät.")
           + V("Es ist ", ["außerdem", "zudem", "überdies"], " ", ["", "schon "], "zu spät."),
           "Conector en posición 1, verbo detrás: *Außerdem ist es…*"),
        ty(1, "Escribí en alemán la expresión de dos palabras: «más allá de eso, además» (registro escrito).", "«más allá de eso»", "darüber hinaus", ["darüber hinaus", "Darüber hinaus"], "*darüber hinaus*: muy usado en textos argumentativos."),
        ty(1, "Escribí el sinónimo formal de *trotzdem* que empieza con *d*.", "*trotzdem* (formal)", "dennoch", note="*dennoch*: misma idea, registro más alto."),
        # parte 2 — opinar y discutir
        ch(2, "Elegí la continuación correcta.", "Meiner Meinung nach ___ das Gesetz zu streng.", "ist", ["ist", "es ist", "das ist"], "*Meiner Meinung nach* ocupa la posición 1: después va el verbo."),
        ch(2, "Elegí el verbo.", "Ich ___ das für keine gute Idee.", "halte", ["halte", "finde", "denke"], "*etwas für + acusativo halten* = considerar algo como…"),
        ch(2, "Elegí la forma correcta.", "Da muss ich ___ widersprechen.", "Ihnen", ["Ihnen", "Sie", "Ihr"], "*widersprechen* lleva dativo: *Ihnen*."),
        ch(2, "¿Qué frase concede antes de contradecir?", "Querés reconocer un punto del otro y después oponerte.", "Da haben Sie zwar recht, aber …", ["Da haben Sie zwar recht, aber …", "Das ist völliger Unsinn.", "Ich bin ganz Ihrer Meinung."], "*zwar …, aber*: primero concedés, después contradecís."),
        ch(2, "Elegí la forma correcta.", "Ich bin ___ Meinung. (otra opinión)", "anderer", ["anderer", "andere", "anderen"], "Genitivo fijo y sin artículo: *Ich bin anderer Meinung*."),
        ch(2, "Completá la fórmula formal.", "Meines ___ fehlt eine klare Strategie.", "Erachtens", ["Erachtens", "Erachten", "Erachtung"], "*Meines Erachtens* (m. E.) = a mi juicio."),
        ch(2, "Elegí el verbo (registro alto).", "Es lässt sich nicht ___, dass sich das Klima verändert.", "leugnen", ["leugnen", "lügen", "löschen"], "*leugnen* = negar (un hecho). *Es lässt sich nicht leugnen* = no se puede negar."),
        cz(2, "Escribí el verbo («sostengo»).", "Ich ___ den Standpunkt, dass das Tempolimit sinnvoll ist.", "vertrete", note="*einen Standpunkt vertreten* = sostener una postura."),
        cz(2, "Escribí la partícula separable («admito»).", "Ich gebe ___, dass das Argument nicht ganz falsch ist.", "zu", note="*zugeben* es separable: *Ich gebe zu, dass…*"),
        cz(2, "Escribí la preposición.", "Was halten Sie ___ dem Vorschlag?", "von", note="En la pregunta: *Was halten Sie von…?* (+ dativo)."),
        cz(2, "Escribí la preposición.", "Ich halte das ___ übertrieben.", "für", note="Al opinar: *etwas für … halten*."),
        cz(2, "Escribí la palabra que falta («estoy totalmente de acuerdo con usted»).", "Ich bin ganz Ihrer ___.", "Meinung", note="*Ich bin ganz Ihrer Meinung.* " + MAY),
        tr(2, "En mi opinión, el proyecto es demasiado caro.", "Meiner Meinung nach ist das Projekt zu teuer.",
           V(["Meiner Meinung nach", "Meiner Ansicht nach", "Meines Erachtens"], " ist das Projekt zu teuer.")
           + V("Ich bin der ", ["Meinung", "Ansicht"], ", dass das Projekt zu teuer ist.")
           + ["Ich finde, das Projekt ist zu teuer.", "Ich finde, dass das Projekt zu teuer ist."],
           "*Meiner Meinung nach* + verbo: *ist das Projekt…*"),
        tr(2, "Lo veo distinto.", "Das sehe ich anders.", ["Das sehe ich anders.", "Ich sehe das anders."], "*Das sehe ich anders*: la forma más común de discrepar con cortesía."),
        ty(2, "Escribí en alemán (usted).", "«¿Qué opina usted de eso?»", "Was halten Sie davon?", ["Was halten Sie davon?", "Was meinen Sie dazu?", "Wie sehen Sie das?", "Was denken Sie darüber?"], "*halten von* → *davon*: ¿qué opina de eso?"),
    ],
}
