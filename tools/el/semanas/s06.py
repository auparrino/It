# -*- coding: utf-8 -*-
"""Semana 6 — Πού είναι;  σε + artículo, πάω, el transporte y las indicaciones."""
import re

from base import q, ch, li, cz, tr, ty, fx, di  # noqa: F401

# formas que valen las dos: la ν final que se puede caer, μία / μια
_PARES = [
    (r"στον σταθμό", "στο σταθμό"),
    (r"στη δουλειά", "στην δουλειά"),
    (r"στη θάλασσα", "στην θάλασσα"),
    (r"(?<![Ͱ-Ͽ])μία(?![Ͱ-Ͽ])", "μια"),
    (r"(?<![Ͱ-Ͽ])Μία(?![Ͱ-Ͽ])", "Μια"),
    (r"και ένα(?![Ͱ-Ͽ])", "κι ένα"),
]


def var(*frases):
    """Las frases y sus variantes de escritura, para «accept»."""
    out = []
    for f in frases:
        ops = [f]
        for rx, b in _PARES:
            ops += [re.sub(rx, b, o) for o in ops if re.search(rx, o)]
        for o in ops:
            if o not in out:
                out.append(o)
    return out


ART = "Completá con στον, στην o στο."
PAO = "Completá con la forma de πάω."
SIG = "¿Qué significa?"

WEEK = {
    "week": 6,
    "title": "Πού είναι;",
    "level": "A1",
    "focus": "Moverte por la ciudad: decir dónde está algo y adónde vas, con *σε* pegado al artículo (*στον, στην, στο*) y el verbo *πάω*.",
    "fare": "Preguntar dónde queda un lugar, entender y dar indicaciones simples, decir adónde vas y en qué, y preguntar si hay algo cerca.",
    "tema": "σε + artículo (στον, στην, στο), πάω, με + transporte, adverbios de lugar, υπάρχει, indicaciones",
    "keys": [
        "*σε* + artículo se escribe en una sola palabra: *στον σταθμό, στην τράπεζα, στο λιμάνι*.",
        "*σε* es «en» y también «a»: *Είμαι στο ξενοδοχείο* / *Πάω στο ξενοδοχείο*.",
        "*πάω* es irregular y corto: *πάω, πας, πάει, πάμε, πάτε, πάνε*.",
        "El transporte va con *με* + artículo: *με το λεωφορείο, με το πλοίο*; a pie, *με τα πόδια*.",
        "*δίπλα* y *κοντά* piden *σε*; *απέναντι* y *μακριά* piden *από*: *δίπλα στην τράπεζα, απέναντι από τον σταθμό*.",
        "*Υπάρχει…;* pregunta si hay algo: *Υπάρχει φαρμακείο εδώ κοντά;*",
    ],
    "lesson": {
        "intro": "Llegaste a una isla y hay que encontrar el hotel, el banco y la playa. Esta semana aprendés a decir dónde está cada cosa, adónde vas y en qué, y a preguntar el camino sin perderte en la respuesta.",
        "parts": [
            {"h": "στον, στην, στο: «en» y «a»", "blocks": [0, 1, 2]},
            {"h": "πάω, el transporte y los adverbios de lugar", "blocks": [3, 4, 5]},
            {"h": "Preguntar el camino", "blocks": [6, 7, 8]},
        ],
        "blocks": [
            {
                "h": "σε + artículo: στον, στην, στο",
                "r": "La preposición *σε* (en, a) no va suelta delante del artículo: se pega a él y forman **una sola palabra**. Como toda preposición, pide **acusativo**, el caso de la semana 5: *σε + τον = στον*, *σε + την = στην*, *σε + το = στο*.",
                "table": {"head": ["Género", "Cómo se arma", "Ejemplo", "En castellano"], "rows": [
                    ["masculino", "σε + τον → στον", "στον σταθμό", "en la estación, a la estación"],
                    ["femenino", "σε + την → στην", "στην τράπεζα", "en el banco, al banco"],
                    ["neutro", "σε + το → στο", "στο λιμάνι", "en el puerto, al puerto"],
                ]},
                "ex": [
                    ["Ο Νίκος είναι *στον* σταθμό.", "Nico está en la estación."],
                    ["Η Μαρία δουλεύει *στην* τράπεζα.", "María trabaja en el banco."],
                    ["Το πλοίο είναι *στο* λιμάνι.", "El barco está en el puerto."],
                    ["Τρώμε *στην* ταβέρνα.", "Comemos en la taberna."],
                ],
                "warn": "Después de *στον* el sustantivo va en acusativo, sin la *ς*: *στον σταθμό*, no «στον σταθμός». Y nunca separado: «σε τον σταθμό» no se dice.",
                "tip": "Ya lo usabas como fórmula desde la semana 4: *Μένω στην Αθήνα*. Ahora sabés de dónde sale: *σε + την Αθήνα*.",
                "more": ["Delante de algunas consonantes el femenino pierde la *ν*: *στη θάλασσα*, *στη δουλειά*, *στη Θεσσαλονίκη*. Se mantiene delante de vocal y de *κ, π, τ, ξ, ψ*: *στην Αθήνα, στην πλατεία, στην τράπεζα*. Si escribís siempre *στην*, se entiende igual."],
                "q": [
                    q("¿Cómo se dice «en la estación»? (ο σταθμός)", "στον σταθμό", ["στον σταθμό", "στην σταθμό", "σε ο σταθμός"]),
                    q("*σε + το* se escribe…", "στο", ["στο", "σετο", "στον"]),
                    q("Completá: *Η Ελένη είναι ___ ταβέρνα.*", "στην", ["στην", "στον", "στο"]),
                ],
            },
            {
                "h": "«En» y «a»: la misma palabra",
                "r": "El castellano distingue «estoy **en** el hotel» de «voy **al** hotel». El griego no: las dos son *στο ξενοδοχείο*. El que manda es el verbo: con *είμαι, μένω, δουλεύω* es «en»; con *πάω* (voy) es «a». Con *ένας, μία, ένα* no hay contracción: *σε ένα ξενοδοχείο*.",
                "ex": [
                    ["*Είμαι στο* αεροδρόμιο.", "Estoy en el aeropuerto."],
                    ["*Πάω στο* αεροδρόμιο.", "Voy al aeropuerto."],
                    ["Μένουμε *σε ένα* ξενοδοχείο.", "Paramos en un hotel."],
                    ["Το κλειδί είναι *στο* τραπέζι.", "La llave está en la mesa."],
                    ["Πάω *στον* Νίκο.", "Voy a lo de Nico."],
                ],
                "warn": "No busques una palabra distinta para «a»: «Πάω σε το λιμάνι» y «Πάω το λιμάνι» no existen. Siempre *Πάω στο λιμάνι*.",
                "tip": "*στο* también es «sobre» cuando hablás de un mueble: *στο τραπέζι*, en la mesa. Con una persona es «a lo de»: *στον Νίκο*, *στη Μαρία*.",
                "more": ["Hablando rápido, *σε ένα* se acorta a *σ' ένα*: lo vas a oír y a leer. Vos escribí *σε ένα*."],
                "q": [
                    q("*Πάω στην πλατεία* significa…", "Voy a la plaza.", ["Voy a la plaza.", "Estoy en la plaza.", "Vengo de la plaza."]),
                    q("¿Cómo se dice «en un hotel»?", "σε ένα ξενοδοχείο", ["σε ένα ξενοδοχείο", "στο ένα ξενοδοχείο", "στον ξενοδοχείο"]),
                ],
            },
            {
                "h": "Los lugares de la ciudad: ojo con el género",
                "r": "Para elegir entre *στον, στην, στο* necesitás el género de la palabra **griega**, que muchas veces no es el del castellano. La terminación te avisa: *-ος* es masculino, *-α* y *-η* son femeninos, *-ο* y *-ι* son neutros.",
                "table": {"head": ["Griego", "Género", "Con σε", "Castellano"], "rows": [
                    ["ο σταθμός", "masculino", "στον σταθμό", "la estación"],
                    ["η τράπεζα", "femenino", "στην τράπεζα", "el banco"],
                    ["η πλατεία", "femenino", "στην πλατεία", "la plaza"],
                    ["η παραλία", "femenino", "στην παραλία", "la playa"],
                    ["η ταβέρνα", "femenino", "στην ταβέρνα", "la taberna"],
                    ["το φαρμακείο", "neutro", "στο φαρμακείο", "la farmacia"],
                    ["το ξενοδοχείο", "neutro", "στο ξενοδοχείο", "el hotel"],
                    ["το λιμάνι", "neutro", "στο λιμάνι", "el puerto"],
                    ["το αεροδρόμιο", "neutro", "στο αεροδρόμιο", "el aeropuerto"],
                    ["το σούπερ μάρκετ", "neutro", "στο σούπερ μάρκετ", "el supermercado"],
                ]},
                "ex": [
                    ["Η τράπεζα είναι *στην* πλατεία.", "El banco está en la plaza."],
                    ["Δουλεύω *στο* φαρμακείο.", "Trabajo en la farmacia."],
                    ["Είμαστε *στον* σταθμό.", "Estamos en la estación."],
                    ["Η Άννα είναι *στο* σούπερ μάρκετ.", "Ana está en el supermercado."],
                ],
                "warn": "«La estación» es masculino (*ο σταθμός*), «el banco» es femenino (*η τράπεζα*) y «la farmacia» es neutro (*το φαρμακείο*). No traduzcas el artículo: aprendé cada lugar con el suyo.",
                "tip": "Los lugares en *-είο* son siempre neutros y llevan el acento ahí: *φαρμακείο, ξενοδοχείο, γραφείο*. *Το σούπερ μάρκετ* es una palabra prestada: neutro, y no cambia nunca.",
                "q": [
                    q("¿Cómo se dice «en la farmacia»?", "στο φαρμακείο", ["στο φαρμακείο", "στην φαρμακείο", "στον φαρμακείο"]),
                    q("¿Cómo se dice «al banco»?", "στην τράπεζα", ["στην τράπεζα", "στον τράπεζα", "στο τράπεζα"]),
                    q("¿De qué género es *σταθμός* (estación)?", "masculino", ["masculino", "femenino", "neutro"]),
                ],
            },
            {
                "h": "πάω: ir",
                "r": "*πάω* (ir) es irregular: corto y con terminaciones propias. Aprendelo de memoria, que lo vas a usar todo el día. El lugar adonde vas va con *σε*: *Πάω στο λιμάνι*.",
                "table": {"head": ["Persona", "πάω", "Ejemplo"], "rows": [
                    ["εγώ", "πάω", "Πάω στη δουλειά."],
                    ["εσύ", "πας", "Πού πας;"],
                    ["αυτός, αυτή, αυτό", "πάει", "Η Άννα πάει στην τράπεζα."],
                    ["εμείς", "πάμε", "Πάμε στην παραλία."],
                    ["εσείς", "πάτε", "Πού πάτε;"],
                    ["αυτοί", "πάνε", "Πάνε στο αεροδρόμιο."],
                ]},
                "ex": [
                    ["Πού *πας*; – *Πάω* στο σούπερ μάρκετ.", "¿Adónde vas? – Voy al supermercado."],
                    ["Ο Γιώργος *πάει* στον σταθμό.", "Jorge va a la estación."],
                    ["*Πάμε* στην ταβέρνα;", "¿Vamos a la taberna?"],
                    ["Δεν *πάνε* στο γραφείο τώρα.", "No van a la oficina ahora."],
                ],
                "warn": "*πας* tiene una sola sílaba y va sin acento escrito; las otras cinco tienen dos y lo llevan: *πάω, πάει, πάμε, πάτε, πάνε*. No lo conjugues como *μένω*: «πάεις» y «πάουμε» no existen.",
                "tip": "*Πάμε!* solo es «¡vamos!», y *Πάμε;* es la invitación: «¿vamos?». *Πού πας;* es «¿adónde vas?»: el mismo *πού* de «¿dónde?».",
                "more": [
                    "Vas a ver también *πηγαίνω*, que significa lo mismo y se conjuga como *μένω*. En la calle manda *πάω*.",
                    "«A casa» y «en casa» se dicen muchas veces sin nada: *Πάω σπίτι*, *Είμαι σπίτι*. Con *στο σπίτι* también está bien.",
                ],
                "q": [
                    q("Completá: *Εμείς ___ στην παραλία.*", "πάμε", ["πάμε", "πάνε", "πάτε"]),
                    q("¿Cómo se dice «¿adónde vas?»?", "Πού πας;", ["Πού πας;", "Πού πάει;", "Πού είσαι;"]),
                    q("¿Cuál va sin acento escrito?", "πας", ["πας", "πάει", "πάμε"]),
                ],
            },
            {
                "h": "με + transporte",
                "r": "Para decir **en qué** vas se usa *με* (con) + el artículo: *με το λεωφορείο*, palabra por palabra «con el colectivo». A pie es una expresión fija: *με τα πόδια* («con los pies»). La pregunta es *Πώς πας;* (¿cómo vas?).",
                "table": {"head": ["Griego", "Castellano"], "rows": [
                    ["με το λεωφορείο", "en colectivo"],
                    ["με το αυτοκίνητο", "en auto"],
                    ["με το πλοίο", "en barco"],
                    ["με το ταξί", "en taxi"],
                    ["με το μετρό", "en subte"],
                    ["με τα πόδια", "a pie, caminando"],
                ]},
                "ex": [
                    ["Πάω στη δουλειά *με το λεωφορείο*.", "Voy al trabajo en colectivo."],
                    ["Πάμε στο νησί *με το πλοίο*.", "Vamos a la isla en barco."],
                    ["Πώς πας στο γραφείο; – *Με τα πόδια*.", "¿Cómo vas a la oficina? – A pie."],
                    ["Πάνε στο αεροδρόμιο *με το ταξί*.", "Van al aeropuerto en taxi."],
                ],
                "warn": "En castellano decimos «en colectivo», sin artículo. En griego no es *σε* sino *με*, y con artículo: *με το λεωφορείο*. *Στο λεωφορείο* quiere decir que estás adentro del colectivo.",
                "tip": "Es el mismo *με* de *καφέ με γάλα*, de la semana 5: «con». Los transportes de esta semana son todos neutros: siempre *με το*.",
                "q": [
                    q("¿Cómo se dice «en barco»?", "με το πλοίο", ["με το πλοίο", "στο πλοίο", "από το πλοίο"]),
                    q("*με τα πόδια* significa…", "a pie", ["a pie", "en auto", "con apuro"]),
                ],
            },
            {
                "h": "Acá, allá, cerca, lejos",
                "r": "Los adverbios de lugar no cambian nunca: no tienen género ni caso. *εδώ* (acá), *εκεί* (allá), *κοντά* (cerca), *μακριά* (lejos), *δεξιά* (a la derecha), *αριστερά* (a la izquierda), *ευθεία* (derecho).",
                "table": {"head": ["Griego", "Castellano", "Ejemplo"], "rows": [
                    ["εδώ", "acá", "Το ξενοδοχείο είναι εδώ."],
                    ["εκεί", "allá, ahí", "Η παραλία είναι εκεί."],
                    ["κοντά", "cerca", "Το λιμάνι είναι κοντά."],
                    ["μακριά", "lejos", "Το αεροδρόμιο είναι μακριά."],
                    ["δεξιά", "a la derecha", "Η τράπεζα είναι δεξιά."],
                    ["αριστερά", "a la izquierda", "Το φαρμακείο είναι αριστερά."],
                    ["ευθεία", "derecho, todo recto", "Πάτε ευθεία."],
                ]},
                "ex": [
                    ["Ο σταθμός είναι *κοντά*.", "La estación está cerca."],
                    ["Είναι πολύ *μακριά*;", "¿Queda muy lejos?"],
                    ["Πάτε *ευθεία* και *δεξιά*.", "Vaya derecho y a la derecha."],
                    ["Το σούπερ μάρκετ είναι *εδώ κοντά*.", "El supermercado está acá cerca."],
                ],
                "warn": "*δεξιά* y *αριστερά* ya quieren decir «a la derecha» y «a la izquierda» enteros: no hace falta agregarles nada. *Πάτε δεξιά*, y listo.",
                "tip": "Cuatro terminan con el acento en la última: *κοντά, μακριά, δεξιά, αριστερά*. *ευθεία* suena «efthía»: el par *ευ* es «ef», como en *ευχαριστώ*.",
                "q": [
                    q("¿Qué significa *αριστερά*?", "a la izquierda", ["a la izquierda", "a la derecha", "derecho"]),
                    q("El aeropuerto queda a 40 km. ¿Qué decís?", "Είναι μακριά.", ["Είναι μακριά.", "Είναι κοντά.", "Είναι εδώ."]),
                ],
            },
            {
                "h": "Al lado de, enfrente de, cerca de, lejos de",
                "r": "Para ubicar una cosa respecto de otra, el adverbio se une con una preposición, y cada uno tiene la suya: *δίπλα* (al lado) y *κοντά* van con **σε**; *απέναντι* (enfrente) y *μακριά* van con **από**. Después, el acusativo.",
                "table": {"head": ["Griego", "Castellano", "Ejemplo"], "rows": [
                    ["δίπλα σε", "al lado de", "δίπλα στην τράπεζα"],
                    ["κοντά σε", "cerca de", "κοντά στο λιμάνι"],
                    ["απέναντι από", "enfrente de", "απέναντι από τον σταθμό"],
                    ["μακριά από", "lejos de", "μακριά από την πλατεία"],
                ]},
                "ex": [
                    ["Το φαρμακείο είναι *δίπλα στην* τράπεζα.", "La farmacia está al lado del banco."],
                    ["Η ταβέρνα είναι *απέναντι από το* ξενοδοχείο.", "La taberna está enfrente del hotel."],
                    ["Μένω *κοντά στον* σταθμό.", "Vivo cerca de la estación."],
                    ["Το χωριό είναι *μακριά από τη* θάλασσα.", "El pueblo está lejos del mar."],
                ],
                "warn": "En castellano todo va con «de»: al lado **de**, cerca **de**. En griego «cerca de» y «al lado de» van con *σε*: *κοντά στο λιμάνι*, no «κοντά από το λιμάνι».",
                "tip": "Truco: lo que está **pegado o cerca** va con *σε* (*δίπλα, κοντά*); lo que está **separado** va con *από* (*απέναντι, μακριά*). Es el *από* de *Είμαι από την Αργεντινή*.",
                "more": ["*από εδώ* es «de acá»: *Είναι μακριά από εδώ;*, «¿queda lejos de acá?»."],
                "q": [
                    q("Completá: *δίπλα ___ ξενοδοχείο* (al lado del hotel)", "στο", ["στο", "από το", "το"]),
                    q("Completá: *απέναντι ___ τράπεζα* (enfrente del banco)", "από την", ["από την", "στην", "από η"]),
                ],
            },
            {
                "h": "υπάρχει: hay",
                "r": "*υπάρχει* es «hay» (palabra por palabra, «existe»). Sirve para preguntar si algo existe en un lugar: *Υπάρχει φαρμακείο εδώ κοντά;* Se niega con *δεν*: *Δεν υπάρχει*. Lo que hay es el sujeto: va en **nominativo**, con *ένας, μία, ένα* o sin nada.",
                "ex": [
                    ["*Υπάρχει* φαρμακείο εδώ κοντά;", "¿Hay una farmacia acá cerca?"],
                    ["Ναι, *υπάρχει* ένα στην πλατεία.", "Sí, hay una en la plaza."],
                    ["*Δεν υπάρχει* τράπεζα στο χωριό.", "No hay banco en el pueblo."],
                    ["*Υπάρχει* ένας σταθμός κοντά στο λιμάνι.", "Hay una estación cerca del puerto."],
                ],
                "warn": "En castellano lo que «hay» es objeto; en griego es **sujeto**: *Υπάρχει ένας σταθμός*, no «Υπάρχει έναν σταθμό». Y no lo armes con *είναι*: para preguntar si existe algo, *Υπάρχει…;*",
                "tip": "Suena «ipárji»: empieza con *υ* (i) y lleva *χ* (j). Cuando son varias cosas se usa *υπάρχουν*: lo vas a ver con el plural.",
                "more": ["En la calle vas a oír también *έχει* por «hay»: *Έχει φαρμακείο εδώ;* Por ahora, usá *υπάρχει*."],
                "q": [
                    q("¿Cómo preguntás si hay un banco cerca?", "Υπάρχει τράπεζα εδώ κοντά;", ["Υπάρχει τράπεζα εδώ κοντά;", "Είναι τράπεζα εδώ κοντά;", "Πάει τράπεζα εδώ κοντά;"]),
                    q("Completá: *Υπάρχει ___ σταθμός εδώ;*", "ένας", ["ένας", "έναν", "ένα"]),
                    q("«No hay» se dice…", "Δεν υπάρχει.", ["Δεν υπάρχει.", "Όχι υπάρχει.", "Υπάρχει δεν."]),
                ],
            },
            {
                "h": "Preguntar el camino y entender la respuesta",
                "r": "Para parar a alguien en la calle: *Συγγνώμη…* y la pregunta. Con dos te arreglás: *Πού είναι…;* (¿dónde queda…?), con el lugar en **nominativo**, y *Πώς πάω…;* (¿cómo voy…?), con *σε*. La respuesta viene con *πάτε* (o *πας*, si te tutean) y los adverbios.",
                "table": {"head": ["Griego", "Castellano"], "rows": [
                    ["Συγγνώμη, πού είναι ο σταθμός;", "Disculpe, ¿dónde queda la estación?"],
                    ["Πώς πάω στο λιμάνι;", "¿Cómo voy al puerto?"],
                    ["Είναι μακριά από εδώ;", "¿Queda lejos de acá?"],
                    ["Πάτε ευθεία και δεξιά.", "Vaya derecho y a la derecha."],
                    ["Είναι εκεί, δίπλα στην τράπεζα.", "Está allá, al lado del banco."],
                    ["Όχι, είναι πολύ κοντά.", "No, queda muy cerca."],
                ]},
                "ex": [
                    ["Συγγνώμη, *πού είναι* η πλατεία;", "Disculpe, ¿dónde queda la plaza?"],
                    ["*Πώς πάω* στο αεροδρόμιο; – Με το λεωφορείο.", "¿Cómo voy al aeropuerto? – En colectivo."],
                    ["*Πάτε ευθεία*. Το ξενοδοχείο είναι αριστερά.", "Vaya derecho. El hotel está a la izquierda."],
                    ["Ευχαριστώ πολύ! – *Παρακαλώ!*", "¡Muchas gracias! – ¡De nada!"],
                ],
                "warn": "En *Πού είναι ο σταθμός;* la estación es el sujeto: nominativo, *ο σταθμός*. En *Πώς πάω στον σταθμό;* va con *σε*: acusativo. No los cruces.",
                "tip": "*πού* (¿dónde?) y *πώς* (¿cómo?) llevan acento escrito cuando preguntan, aunque tengan una sola sílaba. Y la pregunta termina en *;*",
                "q": [
                    q("¿Cómo preguntás dónde queda el hotel?", "Πού είναι το ξενοδοχείο;", ["Πού είναι το ξενοδοχείο;", "Πώς είναι το ξενοδοχείο;", "Πού πάει το ξενοδοχείο;"]),
                    q("Te dicen *Πάτε ευθεία*. ¿Qué hacés?", "Seguís derecho.", ["Seguís derecho.", "Doblás a la derecha.", "Volvés para atrás."]),
                ],
            },
        ],
    },
    "vocab": [
        ["το ξενοδοχείο", "el hotel", "Το ξενοδοχείο είναι κοντά."],
        ["η τράπεζα", "el banco", "Η τράπεζα είναι στην πλατεία."],
        ["το φαρμακείο", "la farmacia", "Υπάρχει φαρμακείο εδώ κοντά;"],
        ["το σούπερ μάρκετ", "el supermercado", "Πάω στο σούπερ μάρκετ."],
        ["η παραλία", "la playa", "Η παραλία είναι πολύ ωραία."],
        ["το λιμάνι", "el puerto", "Το πλοίο είναι στο λιμάνι."],
        ["το αεροδρόμιο", "el aeropuerto", "Το αεροδρόμιο είναι μακριά."],
        ["ο σταθμός", "la estación", "Πού είναι ο σταθμός;"],
        ["το λεωφορείο", "el colectivo", "Πάω με το λεωφορείο."],
        ["το πλοίο", "el barco", "Το πλοίο είναι μεγάλο."],
        ["το αυτοκίνητο", "el auto", "Έχω ένα μικρό αυτοκίνητο."],
        ["η πλατεία", "la plaza", "Μένω κοντά στην πλατεία."],
        ["η ταβέρνα", "la taberna", "Τρώμε στην ταβέρνα."],
        ["πάω", "ir (voy)", "Πάω στη δουλειά."],
        ["εκεί", "allá, ahí", "Η Μαρία είναι εκεί."],
        ["κοντά", "cerca", "Είναι κοντά;"],
        ["μακριά", "lejos", "Δεν είναι μακριά."],
        ["δεξιά", "a la derecha", "Το φαρμακείο είναι δεξιά."],
        ["αριστερά", "a la izquierda", "Πάτε αριστερά."],
    ],
    "can": [
        ("Decir dónde está algo o alguien con στον, στην, στο", [12, 13, 14]),
        ("Decir adónde vas y en qué", [31, 32, 34]),
        ("Preguntar el camino y entender las indicaciones", [46, 47, 49]),
        ("Preguntar si hay algo cerca y ubicarlo respecto de otro lugar", [45, 48]),
    ],
    "items": [
        # parte 0 — στον, στην, στο (1-17)
        ch(0, "Elegí la forma correcta.", "Ο Νίκος είναι ___ σταθμό.", "στον", ["στον", "στην", "σε τον"], "*ο σταθμός* es masculino: *σε + τον = στον*, en una sola palabra. No te guíes por «la estación»."),
        ch(0, "Elegí la forma correcta.", "Η Μαρία δουλεύει ___ τράπεζα.", "στην", ["στην", "στον", "στο"], "*η τράπεζα* es femenino, aunque «el banco» sea masculino: *στην τράπεζα*."),
        ch(0, "Elegí la forma correcta.", "Το πλοίο είναι ___ λιμάνι.", "στο", ["στο", "στον", "στην"], "*το λιμάνι* termina en *-ι*: neutro. *σε + το = στο*."),
        ch(0, SIG, "Πάω στην παραλία.", "Voy a la playa.", ["Voy a la playa.", "Estoy en la playa.", "Vengo de la playa."], "Con *πάω* (voy), *στην* es «a la». Con *είμαι* sería «en la»."),
        ch(0, "¿Con qué artículo va?", "«la farmacia»", "το φαρμακείο", ["το φαρμακείο", "η φαρμακείο", "ο φαρμακείο"], "Los lugares en *-είο* son neutros: *το φαρμακείο*, aunque «farmacia» sea femenino."),
        ch(0, "¿Cómo se dice?", "«en la estación»", "στον σταθμό", ["στον σταθμό", "στην σταθμό", "στον σταθμός"], "Masculino y en acusativo, sin la *ς*: *στον σταθμό*."),
        li(0, "τράπεζα", ["τράπεζα", "τραπέζι", "ταβέρνα"], "*τράπεζα* (banco) lleva el acento en la primera; *τραπέζι* es la mesa."),
        cz(0, ART, "Τρώμε ___ ταβέρνα.", "στην", note="*η ταβέρνα* es femenino: *στην ταβέρνα*."),
        cz(0, ART, "Το κλειδί είναι ___ τραπέζι.", "στο", note="*το τραπέζι* es neutro: *στο τραπέζι*, en la mesa."),
        cz(0, ART, "Ο Κώστας μένει ___ Πειραιά.", "στον", note="*ο Πειραιάς* es masculino: *στον Πειραιά*, en acusativo y sin la *ς*."),
        cz(0, "Completá: «en un hotel».", "Μένουμε ___ ξενοδοχείο.", "σε ένα", ["σε ένα", "σ' ένα"], "Con *ένα* no hay contracción: *σε ένα ξενοδοχείο*."),
        tr(0, "Estoy en el hotel.", "Είμαι στο ξενοδοχείο.", ["Είμαι στο ξενοδοχείο.", "Εγώ είμαι στο ξενοδοχείο."], "*το ξενοδοχείο* es neutro: *στο ξενοδοχείο*."),
        tr(0, "La farmacia está en la plaza.", "Το φαρμακείο είναι στην πλατεία.", note="*το φαρμακείο* es neutro y *η πλατεία*, femenino: *στην πλατεία*."),
        tr(0, "Trabajo en el banco.", "Δουλεύω στην τράπεζα.", ["Δουλεύω στην τράπεζα.", "Εγώ δουλεύω στην τράπεζα."], "«El banco» es femenino en griego: *στην τράπεζα*."),
        ty(0, "Escribí en griego.", "«en el puerto» (το λιμάνι)", "στο λιμάνι", note="*σε + το = στο*: *στο λιμάνι*."),
        fx(0, "Ο Γιώργος είναι στην σταθμό.", "στην", "στον", "genero", "*ο σταθμός* es masculino: *στον σταθμό*.", ["Ο Γιώργος είναι στο σταθμό."]),
        di(0, "Η τράπεζα είναι στην πλατεία.", note="*τράπεζα* va con *ζ* y acento en la primera; *πλατεία*, con *ει*."),
        # parte 1 — πάω, el transporte, los adverbios (18-36)
        ch(1, "Elegí la forma de πάω.", "Εσύ πού ___;", "πας", ["πας", "πάει", "πάτε"], "Con *εσύ*: *πας*, una sola sílaba y sin acento escrito."),
        ch(1, "Elegí la forma de πάω.", "Η Άννα ___ στο σούπερ μάρκετ.", "πάει", ["πάει", "πάω", "πάνε"], "Ella: *πάει*. *πάνε* es «ellos van»."),
        ch(1, "Elegí la forma de πάω.", "Εμείς ___ στο νησί με το πλοίο.", "πάμε", ["πάμε", "πάτε", "πάνε"], "Nosotros: *πάμε*. Se parece a «vamos»."),
        ch(1, SIG, "Πάνε στη δουλειά με τα πόδια.", "Van al trabajo a pie.", ["Van al trabajo a pie.", "Vamos al trabajo en auto.", "Van al trabajo con los chicos."], "*πάνε* = van; *με τα πόδια* = a pie."),
        ch(1, "¿Cómo se dice «en colectivo»?", "Πάω στο γραφείο ___.", "με το λεωφορείο", ["με το λεωφορείο", "στο λεωφορείο", "από το λεωφορείο"], "El transporte va con *με* y artículo: *με το λεωφορείο*."),
        ch(1, SIG, "μακριά", "lejos", ["lejos", "cerca", "a la derecha"], "*μακριά* es «lejos»; «cerca» es *κοντά*."),
        ch(1, SIG, "Πάτε ευθεία και αριστερά.", "Vaya derecho y a la izquierda.", ["Vaya derecho y a la izquierda.", "Vaya derecho y a la derecha.", "Vaya a la izquierda y vuelva."], "*ευθεία* = derecho; *αριστερά* = a la izquierda; *δεξιά* = a la derecha."),
        li(1, "δεξιά", ["δεξιά", "δουλειά", "μακριά"], "*δεξιά*: a la derecha, con *ξ* y el acento en la última."),
        cz(1, PAO, "Ο Πέτρος και η Σοφία ___ στο αεροδρόμιο.", "πάνε", note="Son dos, «ellos»: *πάνε*."),
        cz(1, PAO, "Εσείς πού ___;", "πάτε", note="Con *εσείς*: *πάτε*. Es la forma que vas a oír cuando te den indicaciones."),
        cz(1, "Completá: ¿con qué palabra va el transporte?", "Πάμε στην παραλία ___ το αυτοκίνητο.", "με", note="*με το αυτοκίνητο*: en auto, palabra por palabra «con el auto»."),
        cz(1, "Completá: «a pie».", "Πάω στον σταθμό με τα ___.", "πόδια", note="*με τα πόδια*, «con los pies»: una expresión fija."),
        tr(1, "¿Adónde vas?", "Πού πας;", ["Πού πας;", "Εσύ πού πας;", "Πού πας εσύ;"], "*Πού* con acento porque pregunta; *πας*, sin acento."),
        tr(1, "Vamos a la playa.", "Πάμε στην παραλία.", ["Πάμε στην παραλία.", "Εμείς πάμε στην παραλία."], "*πάμε* + *στην παραλία*: «a» y «en» son el mismo *σε*."),
        tr(1, "Voy al trabajo en colectivo.", "Πάω στη δουλειά με το λεωφορείο.", var("Πάω στη δουλειά με το λεωφορείο.", "Πάω με το λεωφορείο στη δουλειά.", "Πάω στη δουλειά με λεωφορείο.", "Εγώ πάω στη δουλειά με το λεωφορείο."), "*στη δουλειά* (delante de *δ* la *ν* se puede caer) y *με το λεωφορείο*."),
        tr(1, "El aeropuerto está lejos.", "Το αεροδρόμιο είναι μακριά.", note="*μακριά* no cambia: es un adverbio."),
        ty(1, "Contestá en griego: a pie.", "Πώς πας στο γραφείο; (a pie)", "Με τα πόδια.", ["Με τα πόδια.", "Πάω με τα πόδια.", "Πάω στο γραφείο με τα πόδια."], "*με τα πόδια*: con los pies."),
        fx(1, "Εμείς πάνε στην ταβέρνα.", "πάνε", "πάμε", "conjugacion", "Con *εμείς* va *πάμε*; *πάνε* es de «ellos»."),
        di(1, "Πάμε στο λιμάνι με τα πόδια.", note="*λιμάνι* con *ι* las dos veces; *πόδια*, con el acento en la *ό*."),
        # parte 2 — preguntar el camino (37-56)
        ch(2, "Elegí la preposición.", "Το φαρμακείο είναι δίπλα ___ τράπεζα.", "στην", ["στην", "από την", "με την"], "*δίπλα* va con *σε*: *δίπλα στην τράπεζα*."),
        ch(2, "Elegí la preposición.", "Η ταβέρνα είναι απέναντι ___ ξενοδοχείο.", "από το", ["από το", "στο", "με το"], "*απέναντι* va con *από*: *απέναντι από το ξενοδοχείο*."),
        ch(2, "¿Qué preguntás?", "Querés saber si hay una farmacia cerca.", "Υπάρχει φαρμακείο εδώ κοντά;", ["Υπάρχει φαρμακείο εδώ κοντά;", "Πώς είναι το φαρμακείο;", "Πού πάει το φαρμακείο;"], "*Υπάρχει…;* = ¿hay…?"),
        ch(2, "¿Qué contestás?", "Συγγνώμη, πού είναι ο σταθμός;", "Είναι εκεί, δεξιά.", ["Είναι εκεί, δεξιά.", "Πάω με το ταξί.", "Ναι, υπάρχει."], "*Πού είναι…;* pregunta dónde queda: se contesta con un lugar, *εκεί, δεξιά*."),
        ch(2, "Elegí la forma correcta.", "Υπάρχει ___ σταθμός κοντά στο λιμάνι.", "ένας", ["ένας", "έναν", "μία"], "Lo que hay es el sujeto: nominativo, *ένας σταθμός*."),
        li(2, "απέναντι", ["απέναντι", "αριστερά", "αεροδρόμιο"], "*απέναντι*: enfrente. El acento, en la *έ*."),
        cz(2, "Completá: «cerca de la estación».", "Μένω κοντά ___ σταθμό.", "στον", ["στον", "στο"], "*κοντά* va con *σε*: *κοντά στον σταθμό*."),
        cz(2, "Completá: «lejos de la plaza».", "Το ξενοδοχείο είναι μακριά ___ την πλατεία.", "από", note="*μακριά* va con *από*: *μακριά από την πλατεία*."),
        cz(2, "Completá: «¿hay…?»", "___ σούπερ μάρκετ εδώ κοντά;", "Υπάρχει", ["Υπάρχει", "υπάρχει"], "*Υπάρχει*, con *υ* al principio: «ipárji»."),
        tr(2, "Disculpe, ¿dónde queda la estación?", "Συγγνώμη, πού είναι ο σταθμός;", note="El lugar por el que preguntás es el sujeto: *ο σταθμός*, nominativo."),
        tr(2, "¿Cómo voy al puerto?", "Πώς πάω στο λιμάνι;", note="*Πώς* (¿cómo?) + *πάω* + *στο λιμάνι*."),
        tr(2, "El hotel está al lado del banco.", "Το ξενοδοχείο είναι δίπλα στην τράπεζα.", note="*δίπλα* + *σε*: *δίπλα στην τράπεζα*, no con *από*."),
        ty(2, "Contestá en griego: no, queda muy cerca.", "Είναι μακριά από εδώ; (no, queda muy cerca)", "Όχι, είναι πολύ κοντά.", ["Όχι, είναι πολύ κοντά.", "Όχι, πολύ κοντά.", "Όχι. Είναι πολύ κοντά."], "*πολύ κοντά*: muy cerca."),
        fx(2, "Η ταβέρνα είναι κοντά από το λιμάνι.", "από το", "στο", "preposicion", "«Cerca de» va con *σε*: *κοντά στο λιμάνι*."),
        di(2, "Υπάρχει φαρμακείο εδώ κοντά;", note="*Υπάρχει* empieza con *υ* y termina en *ει*; *φαρμακείο*, con *ει*."),
        tr(2, "Un café y un agua, por favor.", "Έναν καφέ και ένα νερό, παρακαλώ.", var("Έναν καφέ και ένα νερό, παρακαλώ."), "Repaso de la semana 5: lo que pedís va en acusativo, *έναν καφέ*; *ένα νερό* es neutro y no cambia."),
        cz(2, "Completá con el artículo indefinido en acusativo.", "Θέλω ___ χυμό, παρακαλώ. (un)", "έναν", ["έναν", "ένα"], "Repaso de la semana 5: masculino en acusativo, *έναν χυμό*."),
        ch(2, "Elegí la forma correcta.", "Εμείς ___ στην Αθήνα.", "μένουμε", ["μένουμε", "μένετε", "μένουν"], "Repaso de la semana 4: con *εμείς*, *-ουμε*: *μένουμε*."),
        tr(2, "No entendemos griego.", "Δεν καταλαβαίνουμε ελληνικά.", ["Δεν καταλαβαίνουμε ελληνικά.", "Εμείς δεν καταλαβαίνουμε ελληνικά.", "Δεν καταλαβαίνουμε τα ελληνικά."], "Repaso de la semana 4: *δεν* va delante del verbo, y «nosotros» termina en *-ουμε*: *δεν καταλαβαίνουμε*."),
        ch(2, "Elegí la forma correcta.", "Το σπίτι είναι ___.", "μεγάλο", ["μεγάλο", "μεγάλος", "μεγάλη"], "Repaso de la semana 3: *το σπίτι* es neutro, y el adjetivo también: *μεγάλο*."),
    ],
}
