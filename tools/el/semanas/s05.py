# -*- coding: utf-8 -*-
"""Semana 5 — Έναν καφέ, παρακαλώ.  El acusativo singular, los números 0-10, pedir y pagar."""
import re

from base import q, ch, li, cz, tr, ty, fx, di, TON  # noqa: F401

FORMA = "Elegí la forma correcta."
ART = "Completá con el artículo (τον, την, το)."
UN = "Completá con έναν, μία o ένα."

# Las dos maneras de escribir lo mismo: todas valen en lo que el alumno escribe.
_PARES = [("Μία", "Μια"), ("μία", "μια"), ("τη", "την"), ("μπίρα", "μπύρα"),
          ("επτά", "εφτά"), ("οκτώ", "οχτώ"), ("εννέα", "εννιά"),
          ("Επτά", "Εφτά"), ("Οκτώ", "Οχτώ"), ("Εννέα", "Εννιά")]


def _otra(texto, a, b):
    return re.sub(r"(?<![Ͱ-Ͽ])%s(?![Ͱ-Ͽ])" % a, b, texto)


def var(*bases):
    """Las variantes de escritura de cada respuesta (μία / μια, τη / την,
    μπίρα / μπύρα, επτά / εφτά…, con coma o sin coma)."""
    out = list(bases)
    for a, b in _PARES:
        for x in list(out):
            for y in (_otra(x, a, b), _otra(x, b, a)):
                if y not in out:
                    out.append(y)
    for x in list(out):
        y = x.replace(", ", " ")
        if y not in out:
            out.append(y)
    return out


WEEK = {
    "week": 5,
    "title": "Έναν καφέ, παρακαλώ",
    "level": "A1",
    "focus": "La primera vez que una palabra griega cambia según lo que hace en la oración: el acusativo. Es lo que necesitás para pedir, y solo se nota en el masculino.",
    "fare": "Pedir algo de tomar y de comer, decir cómo lo querés, contar hasta diez, preguntar cuánto sale y pedir la cuenta.",
    "tema": "El acusativo singular (τον, την, το; έναν, μία, ένα), los números del 0 al 10, πόσο κάνει;, τρώω y πίνω, με / χωρίς",
    "keys": [
        "Lo que querés, tenés, tomás o conocés va en **acusativo**: *ο καφές* → *Θέλω τον καφέ*.",
        "En masculino cambian las dos cosas: *ο* → *τον*, *ένας* → *έναν*, y el nombre pierde la *-ς*: *χυμός* → *χυμό*.",
        "En femenino solo cambia el artículo (*η* → *την*) y en neutro no cambia nada.",
        "Un pedido va en acusativo aunque no digas «quiero»: *Έναν καφέ, παρακαλώ*.",
        "*τρώω* es corto: *τρώω, τρως, τρώει, τρώμε, τρώτε, τρώνε*.",
        "*Πόσο κάνει;* es «¿cuánto sale?». *ευρώ* no cambia nunca: *ένα ευρώ, δέκα ευρώ*.",
    ],
    "lesson": {
        "intro": "Hasta ahora las palabras tenían una sola forma: *ο καφές*, *η μπίρα*, *το νερό*. Esta semana aparece la segunda, el **acusativo**: la forma de lo que pedís. Con eso, diez números y dos verbos, ya te arreglás en cualquier café.",
        "parts": [
            {"h": "El acusativo: lo que querés, tenés o conocés", "blocks": [0, 1, 2, 3]},
            {"h": "Comer, tomar y contar", "blocks": [4, 5, 6]},
            {"h": "En el café: pedir y pagar", "blocks": [7, 8]},
        ],
        "blocks": [
            {
                "h": "El masculino cambia: ο καφές → τον καφέ",
                "r": "En griego la palabra cambia según su papel. El que hace la acción (el **sujeto**) va en la forma que ya conocés, el nominativo: *Ο καφές είναι καλός*. Lo que recibe la acción (lo que querés, tomás, tenés, leés) va en **acusativo**: *Θέλω τον καφέ*. En masculino cambian el artículo, **ο → τον**, y el nombre, que **pierde la -ς**.",
                "table": {"head": ["Termina en", "Sujeto (nominativo)", "Objeto (acusativo)"], "rows": [
                    ["-ος → -ο", "ο χυμός", "τον χυμό"],
                    ["-ος → -ο", "ο δρόμος", "τον δρόμο"],
                    ["-ας → -α", "ο άντρας", "τον άντρα"],
                    ["-ης → -η", "ο χάρτης", "τον χάρτη"],
                    ["-ές → -έ", "ο καφές", "τον καφέ"],
                ]},
                "ex": [
                    ["Ο καφές είναι καλός. – Θέλω *τον καφέ*.", "El café es bueno. – Quiero el café."],
                    ["Πίνω *τον χυμό*.", "Tomo el jugo."],
                    ["Ξέρεις *τον δρόμο*;", "¿Sabés el camino?"],
                    ["Διαβάζω *τον χάρτη*.", "Leo el mapa."],
                ],
                "warn": "En castellano «el café» es igual en «el café es bueno» y en «quiero el café». En griego no: «Θέλω ο καφές» es el error número uno de esta semana. Detrás de *θέλω, έχω, πίνω, τρώω, ξέρω, διαβάζω*: acusativo.",
                "tip": "La receta del masculino: al artículo le ponés una *ν* (*ο → τον*) y al nombre le sacás la *ς* (*χυμός → χυμό*). El acento no se mueve.",
                "q": [
                    q("Completá: *Θέλω ___ καφέ.*", "τον", ["τον", "ο", "το"]),
                    q("¿Cuál es el acusativo de *ο χάρτης*?", "τον χάρτη", ["τον χάρτη", "τον χάρτης", "το χάρτη"]),
                    q("Completá: *___ είναι καλός.*", "Ο χυμός", ["Ο χυμός", "Τον χυμό", "Ο χυμό"]),
                ],
            },
            {
                "h": "Femenino y neutro: casi gratis",
                "r": "En **femenino** solo cambia el artículo: **η → την**; el nombre queda igual: *η μπίρα* → *την μπίρα*. En **neutro** no cambia **nada**: *το κρασί* → *το κρασί*.",
                "table": {"head": ["Género", "Sujeto (nominativo)", "Objeto (acusativo)"], "rows": [
                    ["masculino", "ο χυμός", "τον χυμό"],
                    ["femenino", "η μπίρα", "την μπίρα"],
                    ["femenino", "η σαλάτα", "τη σαλάτα"],
                    ["neutro", "το κρασί", "το κρασί"],
                    ["neutro", "το ψωμί", "το ψωμί"],
                ]},
                "ex": [
                    ["Θέλω *την μπίρα*.", "Quiero la cerveza."],
                    ["Η Μαρία τρώει *τη σαλάτα*.", "María come la ensalada."],
                    ["Έχεις *το κλειδί*;", "¿Tenés la llave?"],
                    ["Δεν ξέρω *την πόλη*.", "No conozco la ciudad."],
                ],
                "warn": "No te guíes por el género del castellano: «la llave» es *το κλειδί* (neutro, no cambia) y «el mapa» es *ο χάρτης* (masculino, cambia). Manda el artículo griego.",
                "tip": "*την* pierde la *ν* delante de muchas consonantes: *τη σαλάτα, τη ζάχαρη, τη Μαρία*. La conserva delante de vocal y de *κ, π, τ, ξ, ψ* (y de *μπ, ντ, γκ, τσ, τζ*): *την Ελένη, την πόρτα, την μπίρα*. Si escribís siempre *την*, la app te lo da por bueno.",
                "more": ["El masculino *τον* se escribe siempre con *ν*: *τον χυμό, τον λογαριασμό*. En textos más viejos lo vas a ver también sin ella."],
                "q": [
                    q("Completá: *Θέλω ___ μπίρα.*", "την", ["την", "η", "τον"]),
                    q("¿Qué cambia en el neutro al pasar a acusativo?", "nada", ["nada", "el artículo", "la terminación"]),
                ],
            },
            {
                "h": "Uno, una: έναν, μία, ένα",
                "r": "El artículo indefinido hace lo mismo: en masculino cambia, **ένας → έναν**, y el nombre pierde la *-ς*; en femenino y en neutro queda igual, *μία* y *ένα*. Es la forma de **pedir**: *Έναν καφέ, μία μπίρα και ένα νερό, παρακαλώ*.",
                "table": {"head": ["Género", "Sujeto (nominativo)", "Objeto (acusativo)"], "rows": [
                    ["masculino", "ένας χυμός", "έναν χυμό"],
                    ["femenino", "μία σαλάτα", "μία σαλάτα"],
                    ["neutro", "ένα τσάι", "ένα τσάι"],
                ]},
                "ex": [
                    ["Θέλω *έναν καφέ*.", "Quiero un café."],
                    ["Η Άννα τρώει *μία σαλάτα*.", "Anna come una ensalada."],
                    ["Έχω *έναν φίλο* στην Αθήνα.", "Tengo un amigo en Atenas."],
                    ["*Έναν χυμό*, παρακαλώ.", "Un jugo, por favor."],
                ],
                "warn": "«Ένας καφές, παρακαλώ» suena a diccionario, no a pedido. Aunque no digas *θέλω*, el «quiero» está sobreentendido y la palabra va en acusativo: *Έναν καφέ, παρακαλώ*.",
                "tip": "*μία* se escribe también *μια* (sin acento, dicha de un golpe): las dos valen.",
                "more": ["El adjetivo acompaña al nombre y hace lo mismo: *έναν μεγάλο καφέ*, *μία μικρή μπίρα*, *ένα μεγάλο νερό*."],
                "q": [
                    q("Completá: *___ καφέ, παρακαλώ.*", "Έναν", ["Έναν", "Ένας", "Ένα"]),
                    q("Completá: *Θέλω ___ τσάι.*", "ένα", ["ένα", "έναν", "μία"]),
                    q("¿Cuál está bien?", "Έχω έναν φίλο.", ["Έχω έναν φίλο.", "Έχω ένας φίλος.", "Έχω έναν φίλος."]),
                ],
            },
            {
                "h": "Con las personas también: Ξέρω τον Νίκο",
                "r": "Los nombres de persona llevan artículo, y los dos pasan al acusativo: *ο Νίκος* → *Ξέρω τον Νίκο*; *η Μαρία* → *Ξέρω τη Μαρία*. No hay nada parecido a nuestra «a» de «conozco **a** María»: el acusativo ya dice quién recibe la acción.",
                "table": {"head": ["Sujeto (nominativo)", "Objeto (acusativo)"], "rows": [
                    ["ο Νίκος", "τον Νίκο"],
                    ["ο Γιώργος", "τον Γιώργο"],
                    ["ο Κώστας", "τον Κώστα"],
                    ["ο Γιάννης", "τον Γιάννη"],
                    ["η Μαρία", "τη Μαρία"],
                    ["η Ελένη", "την Ελένη"],
                ]},
                "ex": [
                    ["Ξέρω *τον Νίκο*.", "Conozco a Nikos."],
                    ["Η Ελένη ξέρει *τον Κώστα*.", "Eleni conoce a Kostas."],
                    ["Ο Γιάννης ξέρει *τη Μαρία*.", "Yanis conoce a María."],
                    ["*Τον Γιώργο* ξέρει η Άννα.", "A Yorgos lo conoce Anna."],
                ],
                "warn": "Como el caso marca quién es quién, el orden se puede dar vuelta: en *Τον Γιώργο ξέρει η Άννα* la que conoce es Anna, porque *η Άννα* está en nominativo. No te guíes por quién aparece primero: mirá el artículo.",
                "tip": "*ξέρω* es «saber» y también «conocer» a una persona o un lugar: *Ξέρω τον Νίκο*, *Ξέρω την Αθήνα*.",
                "more": ["Ya usabas un acusativo sin saberlo: en *Τον λένε Νίκο* (se llama Nikos), tanto *τον* como *Νίκο* están en acusativo."],
                "q": [
                    q("¿Cómo decís «Conozco a Kostas»?", "Ξέρω τον Κώστα.", ["Ξέρω τον Κώστα.", "Ξέρω ο Κώστας.", "Ξέρω τον Κώστας."]),
                    q("*Τον Γιώργο ξέρει η Άννα.* ¿Quién conoce a quién?", "Anna conoce a Yorgos.", ["Anna conoce a Yorgos.", "Yorgos conoce a Anna.", "No se puede saber."]),
                ],
            },
            {
                "h": "πίνω y τρώω",
                "r": "*πίνω* (tomar, beber) es regular, como *μένω*. *τρώω* (comer) es **más corto** que los demás: no dice «τρώεις» ni «τρώουμε», sino *τρως* y *τρώμε*. Lo que comés y tomás va en acusativo; si hablás en general, sin artículo: *Πίνω καφέ*.",
                "table": {"head": ["Persona", "πίνω (tomar)", "τρώω (comer)"], "rows": [
                    ["εγώ", "πίνω", "τρώω"],
                    ["εσύ", "πίνεις", "τρως"],
                    ["αυτός, αυτή, αυτό", "πίνει", "τρώει"],
                    ["εμείς", "πίνουμε", "τρώμε"],
                    ["εσείς", "πίνετε", "τρώτε"],
                    ["αυτοί", "πίνουν", "τρώνε"],
                ]},
                "ex": [
                    ["Τι *πίνεις*; – *Πίνω* έναν χυμό.", "¿Qué tomás? – Tomo un jugo."],
                    ["Τι *τρως*;", "¿Qué comés?"],
                    ["*Τρώμε* ψωμί και τυρί.", "Comemos pan y queso."],
                    ["Ο Νίκος δεν *πίνει* κρασί.", "Nikos no toma vino."],
                ],
                "warn": "*τρως* tiene una sola sílaba y por eso va **sin acento**; *τρώω* tiene dos omegas seguidas y suena «tróo». No lo estires como los verbos regulares: «τρώεις» y «τρώουμε» no existen.",
                "tip": "*Πίνω καφέ* (sin artículo) es «tomo café», en general; *Πίνω έναν καφέ* es «me tomo un café», uno, ahora.",
                "q": [
                    q("Completá: *Εσύ τι ___;* (comer)", "τρως", ["τρως", "τρώεις", "τρώει"]),
                    q("Completá: *Εμείς ___ ψωμί.*", "τρώμε", ["τρώμε", "τρώουμε", "τρώνε"]),
                    q("Completá: *Ο Νίκος δεν ___ κρασί.*", "πίνει", ["πίνει", "πίνεις", "πίνω"]),
                ],
            },
            {
                "h": "Con y sin: με, χωρίς",
                "r": "*με* es «con» y *χωρίς* es «sin». Lo que viene detrás va en **acusativo**: *με τον Νίκο*, *με τη Μαρία*. Con las cosas de comer y tomar, sin artículo: *καφές με γάλα*, *τσάι χωρίς ζάχαρη*.",
                "ex": [
                    ["Πίνω καφέ *με* γάλα.", "Tomo café con leche."],
                    ["Ένα τσάι *χωρίς* ζάχαρη, παρακαλώ.", "Un té sin azúcar, por favor."],
                    ["Τρώω ψωμί *με* τυρί.", "Como pan con queso."],
                    ["Η Άννα τρώει *με τον Γιώργο*.", "Anna come con Yorgos."],
                ],
                "warn": "Este *με* no es el de *με λένε* («me llaman»): son dos palabras distintas que se escriben igual. Delante de un nombre o de un artículo es «con».",
                "tip": "Para pedir el café a tu gusto alcanza con tres palabras: *με γάλα*, *με ζάχαρη*, *χωρίς ζάχαρη*.",
                "q": [
                    q("¿Qué significa *τσάι χωρίς ζάχαρη*?", "té sin azúcar", ["té sin azúcar", "té con azúcar", "té con leche"]),
                    q("Completá: *Τρώω με ___ Νίκο.*", "τον", ["τον", "ο", "το"]),
                ],
            },
            {
                "h": "Los números del 0 al 10",
                "r": "Son estos, y varios te suenan: *δύο* (dúo), *τρία* (trío), *πέντε* (pentágono), *έξι* (hexágono), *οκτώ* (octógono), *δέκα* (década). Así, tal cual, sirven para contar, para los teléfonos y para los precios.",
                "table": {"head": ["Número", "Griego", "Fijate"], "rows": [
                    ["0", "μηδέν", "con η"],
                    ["1", "ένα", "con una cosa masculina o femenina: ένας, μία"],
                    ["2", "δύο", "también δυο"],
                    ["3", "τρία", "como «trío»"],
                    ["4", "τέσσερα", "con dos σ"],
                    ["5", "πέντε", "ντ adentro: «pénde»"],
                    ["6", "έξι", "con ξ"],
                    ["7", "επτά", "también εφτά"],
                    ["8", "οκτώ", "también οχτώ"],
                    ["9", "εννέα", "también εννιά"],
                    ["10", "δέκα", "como «década»"],
                ]},
                "ex": [
                    ["*ένα, δύο, τρία*", "uno, dos, tres"],
                    ["*Πέντε* ευρώ.", "Cinco euros."],
                    ["Δύο και τρία κάνουν *πέντε*.", "Dos y tres son cinco."],
                    ["*έξι, επτά, οκτώ, εννέα, δέκα*", "seis, siete, ocho, nueve, diez"],
                ],
                "warn": "*έξι* (seis) y *όχι* (no) se parecen al oído, y *επτά* se parece más a «siete» en «séptimo» que en «siete». No leas *δέκα* con d dura: es la *δ* suave de «nada».",
                "tip": "*εφτά, οχτώ* y *εννιά* son las formas de todos los días; *επτά, οκτώ* y *εννέα*, las más cuidadas. Podés usar cualquiera.",
                "more": ["Delante de una palabra masculina o femenina, el 3 y el 4 tienen otra forma (*τρεις, τέσσερις*): la vas a necesitar cuando aprendas el plural. Con *ευρώ*, que es neutro, van *τρία* y *τέσσερα*."],
                "q": [
                    q("¿Qué número es *επτά*?", "7", ["7", "6", "8"]),
                    q("¿Cómo sigue? *ένα, δύο, τρία, …*", "τέσσερα", ["τέσσερα", "πέντε", "έξι"]),
                    q("¿Qué otra forma tiene *οκτώ*?", "οχτώ", ["οχτώ", "εφτά", "εννιά"]),
                ],
            },
            {
                "h": "Pedir: Έναν καφέ, παρακαλώ",
                "r": "El mozo (*ο σερβιτόρος*) pregunta *Τι θέλετε;* o simplemente *Παρακαλώ;* Vos contestás con lo que querés **en acusativo** y *παρακαλώ*; podés decir *Θέλω…* delante o no. Cuando te lo trae, dice *Ορίστε!* («aquí tiene»).",
                "ex": [
                    ["– Τι θέλετε; – *Έναν καφέ* με γάλα, παρακαλώ.", "– ¿Qué desea? – Un café con leche, por favor."],
                    ["Θέλω *μία σαλάτα* και *ένα νερό*.", "Quiero una ensalada y un agua."],
                    ["– *Ορίστε!* – Ευχαριστώ πολύ.", "– ¡Aquí tiene! – Muchas gracias."],
                    ["*Έναν χυμό* και *μία μπίρα*, παρακαλώ.", "Un jugo y una cerveza, por favor."],
                ],
                "warn": "*Ορίστε* no es «oiga»: es lo que dice quien te **da** algo. Para llamar al mozo se dice *Συγγνώμη!* o *Παρακαλώ!*",
                "tip": "*ένα νερό* es, en la práctica, «una botella de agua»; con *νερό, παρακαλώ* también te entienden.",
                "more": [
                    "*Ορίστε;* con entonación de pregunta es «¿cómo?, ¿perdón?», cuando no entendiste; y es también lo que se dice al atender el teléfono.",
                    "El café griego se pide por el azúcar: *σκέτος* (solo, sin azúcar), *μέτριος* (con un poco) o *γλυκός* (dulce). En acusativo: *έναν καφέ μέτριο*.",
                ],
                "q": [
                    q("El mozo pregunta *Τι θέλετε;* ¿Qué contestás?", "Έναν καφέ, παρακαλώ.", ["Έναν καφέ, παρακαλώ.", "Ένας καφές, παρακαλώ.", "Καλά, ευχαριστώ."]),
                    q("¿Cuándo se dice *Ορίστε!*?", "cuando le das algo a alguien", ["cuando le das algo a alguien", "cuando llamás al mozo", "cuando te despedís"]),
                ],
            },
            {
                "h": "Pagar: Πόσο κάνει;",
                "r": "*Πόσο κάνει;* es «¿cuánto sale?» (palabra por palabra: «¿cuánto hace?»). Se contesta con el número y *ευρώ*, que **no cambia nunca**: *ένα ευρώ, πέντε ευρώ*. Para pedir la cuenta: *Τον λογαριασμό, παρακαλώ*.",
                "ex": [
                    ["*Πόσο κάνει;* – Κάνει τέσσερα ευρώ.", "¿Cuánto sale? – Sale cuatro euros."],
                    ["Πόσο κάνει *ο χυμός*; – Τρία ευρώ.", "¿Cuánto sale el jugo? – Tres euros."],
                    ["*Τον λογαριασμό*, παρακαλώ.", "La cuenta, por favor."],
                    ["Ο καφές κάνει *δύο ευρώ*.", "El café sale dos euros."],
                ],
                "warn": "En *Πόσο κάνει ο χυμός;* el jugo es el **sujeto** (es el que «sale» tanto): va en nominativo, *ο χυμός*. En cambio la cuenta la **pedís**: *τον λογαριασμό*, en acusativo.",
                "tip": "*ευρώ* se dice «evró», con el acento al final: el par *ευ* suena «ev», como viste en la semana 2.",
                "q": [
                    q("Completá: *Πόσο κάνει ___;*", "ο καφές", ["ο καφές", "τον καφέ", "έναν καφέ"]),
                    q("¿Cómo pedís la cuenta?", "Τον λογαριασμό, παρακαλώ.", ["Τον λογαριασμό, παρακαλώ.", "Ο λογαριασμός, παρακαλώ.", "Ορίστε, παρακαλώ."]),
                    q("¿Cómo se dice «diez euros»?", "δέκα ευρώ", ["δέκα ευρώ", "δέκα ευρώς", "δέκα ευρά"]),
                ],
            },
        ],
    },
    "vocab": [
        ["ο χυμός", "el jugo", "Ο χυμός είναι πολύ καλός."],
        ["η μπίρα", "la cerveza", "Μία μπίρα, παρακαλώ."],
        ["το κρασί", "el vino", "Το κρασί είναι πολύ καλό."],
        ["το τσάι", "el té", "Πίνω τσάι με γάλα."],
        ["το γάλα", "la leche", "Το παιδί πίνει γάλα."],
        ["η ζάχαρη", "el azúcar", "Θέλεις ζάχαρη;"],
        ["το ψωμί", "el pan", "Τρώμε ψωμί."],
        ["το τυρί", "el queso", "Τρώω ψωμί με τυρί."],
        ["η σαλάτα", "la ensalada", "Η σαλάτα είναι μεγάλη."],
        ["το γλυκό", "el dulce, el postre", "Θέλω ένα γλυκό."],
        ["ο λογαριασμός", "la cuenta", "Τον λογαριασμό, παρακαλώ."],
        ["το ευρώ", "el euro", "Κάνει δύο ευρώ."],
        ["πίνω", "tomar, beber", "Τι πίνεις;"],
        ["τρώω", "comer", "Τρώω μία σαλάτα."],
        ["ορίστε", "aquí tiene; tomá", "Ορίστε ο καφές."],
        ["πόσο", "cuánto", "Πόσο κάνει ο καφές;"],
        ["με", "con", "Έναν καφέ με γάλα, παρακαλώ."],
        ["χωρίς", "sin", "Πίνω τσάι χωρίς ζάχαρη."],
    ],
    "can": [
        ("Pedir algo de tomar o de comer, con *έναν, μία, ένα*", [15, 45, 46, 51]),
        ("Decir qué tenés y a quién conocés, con el acusativo", [16, 17, 13]),
        ("Decir qué comés y qué tomás, y cómo lo querés", [34, 35, 36]),
        ("Contar hasta diez, preguntar cuánto sale y pedir la cuenta", [32, 47, 48, 49]),
    ],
    "items": [
        # parte 0 — el acusativo (1-20)
        ch(0, FORMA, "Θέλω ___ καφέ.", "έναν", ["έναν", "ένας", "ένα"], "Lo que querés va en acusativo: *ένας* → *έναν*. Y *καφές* ya perdió la *-ς*."),
        ch(0, FORMA, "Ο Νίκος πίνει ___ χυμό.", "τον", ["τον", "ο", "το"], "*ο χυμός* es masculino y acá es lo que se toma: *τον χυμό*."),
        ch(0, FORMA, "Η Μαρία θέλει ___ σαλάτα.", "μία", ["μία", "έναν", "ένα"], "*η σαλάτα* es femenino: *μία*, igual que en nominativo."),
        ch(0, FORMA, "Έχεις ___ κλειδί;", "το", ["το", "τον", "την"], "*το κλειδί* es neutro, aunque «la llave» sea femenino: en acusativo no cambia."),
        ch(0, "Elegí la forma del nombre.", "Ξέρω τον ___.", "Νίκο", ["Νίκο", "Νίκος", "Νίκε"], "También los nombres pierden la *-ς*: *ο Νίκος* → *τον Νίκο*."),
        ch(0, "¿Quién conoce a quién?", "Τον Γιώργο ξέρει η Άννα.", "Anna conoce a Yorgos.", ["Anna conoce a Yorgos.", "Yorgos conoce a Anna.", "No se puede saber."], "*η Άννα* está en nominativo: es el sujeto. *τον Γιώργο* es el objeto, aunque vaya primero."),
        ch(0, "¿Sujeto u objeto? Elegí la forma.", "___ είναι καλός.", "Ο καφές", ["Ο καφές", "Τον καφέ", "Ο καφέ"], "Acá el café es el sujeto: nominativo, *ο καφές*, con su *-ς*."),
        ch(0, "¿Cuál está bien?", "(Quiero la cuenta.)", "Θέλω τον λογαριασμό.", ["Θέλω τον λογαριασμό.", "Θέλω ο λογαριασμός.", "Θέλω τον λογαριασμός."], "Cambian los dos: el artículo (*τον*) y el nombre (*λογαριασμό*, sin *-ς*)."),
        li(0, "έναν", ["έναν", "ένας", "ένα"], "*έναν*, con *ν* final: el acusativo masculino de *ένας*."),
        cz(0, ART, "Ξέρεις ___ δρόμο;", "τον", note="*ο δρόμος* → *τον δρόμο*: el camino es lo que sabés."),
        cz(0, UN, "Θέλω ___ γλυκό.", "ένα", note="*το γλυκό* es neutro: *ένα*, sin cambios."),
        cz(0, "Poné en acusativo la palabra *ο φίλος*.", "Έχω έναν ___ στην Αθήνα.", "φίλο", note="*-ος* → *-ο*: *έναν φίλο*."),
        ty(0, "Poné en acusativo, con su artículo.", "ο σερβιτόρος → Ξέρω …", "τον σερβιτόρο", ["τον σερβιτόρο", "Ξέρω τον σερβιτόρο."], "*ο* → *τον* y *-ος* → *-ο*: *τον σερβιτόρο*."),
        cz(0, ART, "Θέλω ___ μπίρα, όχι το κρασί.", "την", ["την", "τη"], "*η μπίρα* → *την μπίρα*: en femenino solo cambia el artículo. Delante de *μπ* la *ν* se mantiene."),
        tr(0, "Quiero un café.", "Θέλω έναν καφέ.", ["Θέλω έναν καφέ.", "Εγώ θέλω έναν καφέ."], "*ένας καφές* → *έναν καφέ*: el objeto de *θέλω* va en acusativo."),
        tr(0, "Conozco a María.", "Ξέρω τη Μαρία.", var("Ξέρω τη Μαρία.", "Εγώ ξέρω τη Μαρία.", "Τη Μαρία ξέρω."), "Sin «a»: el artículo en acusativo alcanza. *η Μαρία* → *τη Μαρία* (o *την Μαρία*)."),
        tr(0, "Nikos tiene la llave.", "Ο Νίκος έχει το κλειδί.", ["Ο Νίκος έχει το κλειδί.", "Το κλειδί έχει ο Νίκος.", "Το κλειδί το έχει ο Νίκος."], "*ο Νίκος* es el sujeto (nominativo) y *το κλειδί*, neutro, no cambia."),
        fx(0, "Θέλω ένας χυμό, παρακαλώ.", "ένας", "έναν", "caso", "Lo que pedís va en acusativo: *έναν χυμό*.", ["Θέλω έναν χυμό παρακαλώ."]),
        fx(0, "Η Ελένη ξέρει τον Γιάννης.", "Γιάννης", "Γιάννη", "caso", "*-ης* → *-η*: *ο Γιάννης*, pero *τον Γιάννη*."),
        di(0, "Θέλω έναν χυμό.", note="*έναν* con *ν* final; *χυμό* con *υ* y sin *ς*: es acusativo."),
        # parte 1 — πίνω, τρώω, με / χωρίς, los números (21-38)
        ch(1, FORMA, "Εσύ τι ___; (comer)", "τρως", ["τρως", "τρώεις", "τρώει"], "*τρώω* es corto: *εσύ τρως*, de una sílaba y sin acento."),
        ch(1, FORMA, "Εμείς ___ ψωμί με τυρί.", "τρώμε", ["τρώμε", "τρώουμε", "τρώνε"], "*εμείς τρώμε*, no «τρώουμε»."),
        ch(1, FORMA, "Ο Πέτρος και η Σοφία ___ κρασί.", "πίνουν", ["πίνουν", "πίνει", "πίνετε"], "Son dos: plural, *πίνουν*. *πίνω* es regular."),
        ch(1, "¿Qué significa?", "καφές χωρίς ζάχαρη", "café sin azúcar", ["café sin azúcar", "café con azúcar", "café con leche"], "*χωρίς* es «sin»; «con» es *με*."),
        ch(1, "¿Qué número es?", "επτά", "7", ["7", "6", "8"], "*επτά* (o *εφτά*): siete. Pensá en «séptimo»."),
        ch(1, "¿Cómo sigue?", "ένα, δύο, τρία, …", "τέσσερα", ["τέσσερα", "πέντε", "έξι"], "Después del tres, *τέσσερα*: cuatro."),
        li(1, "έξι", ["έξι", "όχι", "έχει"], "*έξι*, con *ξ*: seis. *όχι* es «no» y *έχει*, «tiene»."),
        li(1, "δύο", ["δύο", "δέκα", "εδώ"], "*δύο*: dos. *δέκα* es diez."),
        cz(1, "Completá con la forma de *πίνω*.", "Η Κατερίνα ___ τσάι με γάλα.", "πίνει", note="*η Κατερίνα* = *αυτή* → *πίνει*."),
        cz(1, "Completá con la forma de *τρώω*.", "Το παιδί ___ ένα γλυκό.", "τρώει", note="*αυτό τρώει*: la tercera persona sí tiene la *-ει* de siempre."),
        cz(1, "Completá con *με* o con *χωρίς*.", "Πίνω καφέ ___ ζάχαρη. (sin azúcar)", "χωρίς", note="*χωρίς* = sin. El acento va en la última."),
        cz(1, "Escribí el número con letras.", "Δύο και τρία κάνουν ___.", "πέντε", note="2 + 3 = 5: *πέντε*, con *ντ*."),
        ty(1, "Escribí el número con letras.", "9", "εννέα", ["εννέα", "εννιά"], "*εννέα* o *εννιά*: las dos con doble *ν*."),
        tr(1, "Tomo café con leche.", "Πίνω καφέ με γάλα.", ["Πίνω καφέ με γάλα.", "Εγώ πίνω καφέ με γάλα.", "Πίνω τον καφέ με γάλα."], "En general, sin artículo: *καφέ*, que es el acusativo de *καφές*. *με* = con."),
        tr(1, "No comemos queso.", "Δεν τρώμε τυρί.", ["Δεν τρώμε τυρί.", "Εμείς δεν τρώμε τυρί."], "*δεν* delante del verbo y *τρώμε*, la forma corta de «nosotros»."),
        tr(1, "¿Qué tomás?", "Τι πίνεις;", ["Τι πίνεις;", "Εσύ τι πίνεις;", "Τι πίνεις εσύ;"], "*Τι* primero y el verbo en *-εις*."),
        fx(1, "Η Άννα τρώω μια σαλάτα.", "τρώω", "τρώει", "conjugacion", "*η Άννα* es tercera persona: *τρώει*. *τρώω* es «yo».", var("Η Άννα τρώει μια σαλάτα.")),
        di(1, "Τρώμε ψωμί και τυρί.", note="*τρώμε* y *ψωμί* con omega; *τυρί* con *υ* primero y *ι* al final."),
        # parte 2 — pedir y pagar (39-56)
        ch(2, "El mozo te pregunta *Τι θέλετε;* ¿Qué contestás?", "Τι θέλετε;", "Έναν καφέ, παρακαλώ.", ["Έναν καφέ, παρακαλώ.", "Ένας καφές, παρακαλώ.", "Καλά, ευχαριστώ."], "El pedido va en acusativo aunque no digas *θέλω*: *έναν καφέ*."),
        ch(2, "Querés pagar. ¿Qué decís?", "(La cuenta, por favor.)", "Τον λογαριασμό, παρακαλώ.", ["Τον λογαριασμό, παρακαλώ.", "Ο λογαριασμός, παρακαλώ.", "Ορίστε ο καφές."], "La cuenta se pide: acusativo, *τον λογαριασμό*."),
        ch(2, "El mozo te deja el café en la mesa y dice esto. ¿Qué significa?", "Ορίστε!", "¡Aquí tiene!", ["¡Aquí tiene!", "¡Espere un momento!", "¡Son dos euros!"], "*Ορίστε* es lo que dice quien te da algo."),
        ch(2, FORMA, "Πόσο κάνει ___;", "ο χυμός", ["ο χυμός", "τον χυμό", "έναν χυμό"], "El jugo es el sujeto de *κάνει* (es lo que «sale» tanto): nominativo."),
        ch(2, "¿Qué contestás?", "Πόσο κάνει η μπίρα;", "Τέσσερα ευρώ.", ["Τέσσερα ευρώ.", "Μία μπίρα.", "Ναι, ευχαριστώ."], "*Πόσο κάνει;* pregunta el precio: número + *ευρώ*."),
        cz(2, "Completá el pedido.", "___ χυμό και μία σαλάτα, παρακαλώ.", "Έναν", ["Έναν", "έναν"], "*χυμό* es masculino y está en acusativo: *έναν*."),
        tr(2, "Una cerveza, por favor.", "Μία μπίρα, παρακαλώ.", var("Μία μπίρα, παρακαλώ.", "Θέλω μία μπίρα, παρακαλώ."), "*μία* (o *μια*) no cambia en acusativo. Sin *θέλω* también es un pedido completo."),
        tr(2, "Un té sin azúcar y un agua, por favor.", "Ένα τσάι χωρίς ζάχαρη και ένα νερό, παρακαλώ.", var("Ένα τσάι χωρίς ζάχαρη και ένα νερό, παρακαλώ.", "Ένα τσάι χωρίς ζάχαρη κι ένα νερό, παρακαλώ.", "Θέλω ένα τσάι χωρίς ζάχαρη και ένα νερό, παρακαλώ."), "Los dos son neutros: *ένα τσάι*, *ένα νερό*. *χωρίς* = sin."),
        tr(2, "La cuenta, por favor.", "Τον λογαριασμό, παρακαλώ.", var("Τον λογαριασμό, παρακαλώ.", "Θέλω τον λογαριασμό, παρακαλώ."), "*ο λογαριασμός* → *τον λογαριασμό*: la pedís, va en acusativo."),
        tr(2, "¿Cuánto sale el vino?", "Πόσο κάνει το κρασί;", ["Πόσο κάνει το κρασί;", "Το κρασί πόσο κάνει;"], "*Πόσο κάνει* + lo que querés saber, en nominativo. *το κρασί* es neutro."),
        ty(2, "Contestá con el precio, con el número en letras.", "Πόσο κάνει ο καφές; (3 €)", "Τρία ευρώ.", ["Τρία ευρώ.", "Κάνει τρία ευρώ.", "Ο καφές κάνει τρία ευρώ."], "*τρία ευρώ*: *ευρώ* no cambia y, como es neutro, el tres es *τρία*."),
        ty(2, "Escribí el número con letras.", "8 ευρώ", "οκτώ ευρώ", var("οκτώ ευρώ", "οκτώ"), "*οκτώ* o *οχτώ*, con el acento en la última, igual que *ευρώ*."),
        ty(2, "Pedilo en griego: empezá con *Έναν*.", "(un jugo y una ensalada, por favor)", "Έναν χυμό και μία σαλάτα, παρακαλώ.", var("Έναν χυμό και μία σαλάτα, παρακαλώ.", "Έναν χυμό και μία σαλάτα."), "*έναν χυμό* (masculino, cambia) y *μία σαλάτα* (femenino, igual)."),
        fx(2, "Πόσο κάνει τον καφέ;", "τον καφέ", "ο καφές", "caso", "Acá el café es el sujeto: *Πόσο κάνει ο καφές;* El acusativo es para cuando lo pedís."),
        di(2, "Τον λογαριασμό, παρακαλώ.", ["Τον λογαριασμό, παρακαλώ.", "Τον λογαριασμό παρακαλώ."], note="*λογαριασμό* sin *ς*: es acusativo. *παρακαλώ* termina en omega."),
        cz(2, "Completá con la forma de *μένω*.", "Ο Γιώργος και η Δήμητρα ___ στην Αθήνα.", "μένουν", ["μένουν", "μένουνε"], "Repaso de la semana 4: dos personas, plural → *μένουν*."),
        ch(2, "Elegí la fórmula de lugar.", "Δουλεύω ___ Πειραιά.", "στον", ["στον", "στην", "στο"], "Repaso de la semana 4: *ο Πειραιάς* es masculino → *στον Πειραιά*. Ahora ves por qué pierde la *ς*: es un acusativo."),
        tr(2, "No entendemos inglés.", "Δεν καταλαβαίνουμε αγγλικά.", ["Δεν καταλαβαίνουμε αγγλικά.", "Εμείς δεν καταλαβαίνουμε αγγλικά.", "Δεν καταλαβαίνουμε τα αγγλικά."], "Repaso de la semana 4: *δεν* + verbo en *-ουμε*; el idioma, sin artículo."),
        tr(2, "¿Dónde trabajás?", "Πού δουλεύεις;", ["Πού δουλεύεις;", "Εσύ πού δουλεύεις;", "Πού δουλεύεις εσύ;"], "Repaso de la semana 4: *πού* con acento, y el verbo en *-εις* para *εσύ*."),
    ],
}
