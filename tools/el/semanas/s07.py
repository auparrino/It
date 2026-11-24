# -*- coding: utf-8 -*-
"""Semana 7 — Τι ώρα είναι;  Los números hasta 100, la hora, los días y los verbos en -άω."""
import re

from base import q, ch, li, cz, tr, ty, fx, di  # noqa: F401

# formas que valen las dos: επτά / εφτά, οκτώ / οχτώ, εννέα / εννιά, μία / μια, la ν final
_PARES = [
    (r"επτά", "εφτά"), (r"Επτά", "Εφτά"),
    (r"οκτώ", "οχτώ"), (r"Οκτώ", "Οχτώ"),
    (r"εννέα", "εννιά"), (r"Εννέα", "Εννιά"),
    (r"(?<![Ͱ-Ͽ])μία(?![Ͱ-Ͽ])", "μια"),
    (r"(?<![Ͱ-Ͽ])Μία(?![Ͱ-Ͽ])", "Μια"),
    (r"στον σταθμό", "στο σταθμό"),
    (r"έναν χυμό", "ένα χυμό"),
    (r"Τη Δευτέρα", "Την Δευτέρα"), (r"τη Δευτέρα", "την Δευτέρα"),
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


NUM = "¿Qué número es?"
HORA = "¿Qué hora es?"
LETRAS = "Escribí el número con letras."
SIG = "¿Qué significa?"

WEEK = {
    "week": 7,
    "title": "Τι ώρα είναι;",
    "level": "A1",
    "focus": "Los números hasta 100, la hora y los días de la semana; y el segundo tipo de verbos, los que terminan en *-άω*.",
    "fare": "Preguntar y decir la hora, arreglar una cita (qué día y a qué hora), contar a qué hora te despertás y qué idiomas hablás.",
    "tema": "Números 11-100, la hora, στις + hora, los días de la semana, verbos en -άω (tipo B)",
    "keys": [
        "Del 13 al 19, el diez adelante y todo junto: *δεκατρία, δεκαπέντε*. Desde el 21, separado y sin «y»: *είκοσι ένα*.",
        "La hora va en femenino: *Είναι μία*, *τρεις*, *τέσσερις* (no «ένα, τρία, τέσσερα»).",
        "Primero la hora y después los minutos; *και* suma y *παρά* resta: *πέντε και μισή*, *έξι παρά τέταρτο*.",
        "«A las…» es *στις*: *στις πέντε*. Solo la una cambia: *στη μία*.",
        "El día va en acusativo y sin preposición: *τη Δευτέρα*, *το Σάββατο*, *την Κυριακή*.",
        "Verbos en *-άω*: *μιλάω, μιλάς, μιλάει, μιλάμε, μιλάτε, μιλάνε*, con el acento siempre en la *ά*.",
    ],
    "lesson": {
        "intro": "Para tomar un barco, llegar a una clase o encontrarte con alguien necesitás tres cosas: los números, la hora y los días. Y de yapa, una familia nueva de verbos, la de *μιλάω* (hablar).",
        "parts": [
            {"h": "Los números y la hora", "blocks": [0, 1, 2, 3]},
            {"h": "Cuándo: στις, las partes del día y los días", "blocks": [4, 5, 6]},
            {"h": "Los verbos en -άω", "blocks": [7, 8]},
        ],
        "blocks": [
            {
                "h": "Del 11 al 19",
                "r": "*έντεκα* (11) y *δώδεκα* (12) son especiales. Del 13 al 19 es *δέκα* más la unidad, **todo junto** y con un solo acento, el de la unidad: *δεκατρία, δεκατέσσερα, δεκαπέντε*…",
                "table": {"head": ["Número", "Griego", "Cómo se arma"], "rows": [
                    ["11", "έντεκα", "ένα + δέκα, cambiado"],
                    ["12", "δώδεκα", "δύο + δέκα, cambiado"],
                    ["13", "δεκατρία", "δέκα + τρία"],
                    ["14", "δεκατέσσερα", "δέκα + τέσσερα"],
                    ["15", "δεκαπέντε", "δέκα + πέντε"],
                    ["16", "δεκαέξι", "δέκα + έξι"],
                    ["17", "δεκαεπτά", "δέκα + επτά"],
                    ["18", "δεκαοκτώ", "δέκα + οκτώ"],
                    ["19", "δεκαεννέα", "δέκα + εννέα"],
                ]},
                "ex": [
                    ["*έντεκα* ευρώ", "once euros"],
                    ["*δώδεκα* ευρώ", "doce euros"],
                    ["Ο λογαριασμός είναι *δεκαπέντε* ευρώ.", "La cuenta es de quince euros."],
                    ["Το κρασί κάνει *δεκαοκτώ* ευρώ.", "El vino sale dieciocho euros."],
                ],
                "warn": "En *έντεκα* y *δώδεκα* el diez va **al final**; desde el 13 va **adelante**. Y la palabra lleva un solo acento, el de la unidad: *δεκαπέντε*, no «δέκα πέντε».",
                "tip": "*επτά, οκτώ, εννέα* tienen una forma más de calle: *εφτά, οχτώ, εννιά*. Acá también: *δεκαεφτά, δεκαοχτώ, δεκαεννιά*. Valen las dos.",
                "q": [
                    q("¿Cómo se dice 15?", "δεκαπέντε", ["δεκαπέντε", "πεντεδέκα", "πενήντα"]),
                    q("¿Qué número es *δώδεκα*?", "12", ["12", "20", "2"]),
                    q("¿Qué número es *δεκαεννέα*?", "19", ["19", "90", "9"]),
                ],
            },
            {
                "h": "Las decenas y el cien",
                "r": "Las decenas terminan casi todas en *-ντα*: *τριάντα, σαράντα, πενήντα*… Solo *είκοσι* (20) es distinta. Para seguir contando, la decena y la unidad van **separadas y sin «y»**: *είκοσι ένα* (21), *τριάντα πέντε* (35). Cien es *εκατό*.",
                "table": {"head": ["Número", "Griego", "Ejemplo"], "rows": [
                    ["20", "είκοσι", "είκοσι δύο (22)"],
                    ["30", "τριάντα", "τριάντα ένα (31)"],
                    ["40", "σαράντα", "σαράντα πέντε (45)"],
                    ["50", "πενήντα", "πενήντα έξι (56)"],
                    ["60", "εξήντα", "εξήντα τρία (63)"],
                    ["70", "εβδομήντα", "εβδομήντα επτά (77)"],
                    ["80", "ογδόντα", "ογδόντα οκτώ (88)"],
                    ["90", "ενενήντα", "ενενήντα εννέα (99)"],
                    ["100", "εκατό", "εκατό ευρώ"],
                ]},
                "ex": [
                    ["*είκοσι* ευρώ", "veinte euros"],
                    ["*σαράντα δύο*", "cuarenta y dos"],
                    ["Το ξενοδοχείο κάνει *εξήντα πέντε* ευρώ.", "El hotel sale sesenta y cinco euros."],
                    ["*εκατό* ευρώ", "cien euros"],
                ],
                "warn": "Nada de «y» entre la decena y la unidad: «τριάντα και πέντε» no se dice. Y ojo con los parecidos: *εξήντα* es 60 y *εβδομήντα* es 70; *πέντε* es 5 y *πενήντα* es 50.",
                "tip": "Varias decenas se parecen a su unidad: *τρία → τριάντα*, *πέντε → πενήντα*, *έξι → εξήντα*, *εννέα → ενενήντα*. *σαράντα* (40) y *ογδόντα* (80) hay que aprenderlas aparte.",
                "more": ["Delante de un sustantivo masculino o femenino, el 1, el 3 y el 4 cambian también adentro de un número: *είκοσι μία*, *είκοσι τρεις*. Con *ευρώ*, que es neutro, quedan como los aprendiste: *είκοσι ένα ευρώ*."],
                "q": [
                    q("¿Cómo se dice 21?", "είκοσι ένα", ["είκοσι ένα", "είκοσι και ένα", "ένα είκοσι"]),
                    q("¿Qué número es *πενήντα*?", "50", ["50", "5", "15"]),
                    q("¿Cómo se dice 100?", "εκατό", ["εκατό", "δέκα δέκα", "ενενήντα"]),
                ],
            },
            {
                "h": "Τι ώρα είναι; – La hora en punto",
                "r": "Se pregunta *Τι ώρα είναι;* y se contesta *Είναι* + el número, sin artículo. Como *η ώρα* es femenina, el 1, el 3 y el 4 van **en femenino**: *μία, τρεις, τέσσερις*. Los demás números no cambian. «En punto» es *ακριβώς*.",
                "table": {"head": ["Hora", "Griego"], "rows": [
                    ["1:00", "Είναι μία."],
                    ["2:00", "Είναι δύο."],
                    ["3:00", "Είναι τρεις."],
                    ["4:00", "Είναι τέσσερις."],
                    ["5:00", "Είναι πέντε."],
                    ["11:00", "Είναι έντεκα."],
                    ["12:00", "Είναι δώδεκα."],
                ]},
                "ex": [
                    ["Τι ώρα είναι; – *Είναι μία*.", "¿Qué hora es? – Es la una."],
                    ["Είναι *τρεις* ακριβώς.", "Son las tres en punto."],
                    ["Είναι *τέσσερις* το απόγευμα.", "Son las cuatro de la tarde."],
                    ["Είναι *δέκα η ώρα*.", "Son las diez."],
                ],
                "warn": "El castellano dice «**son las** tres»; el griego, siempre *είναι* y sin artículo: *Είναι τρεις*. Y no uses el número de contar: «Είναι τρία» está mal para la hora.",
                "tip": "Si querés, agregás *η ώρα* atrás: *Είναι πέντε η ώρα*. Sirve para que quede claro que hablás de la hora.",
                "more": ["En la calle se cuenta de 1 a 12 y se aclara con la parte del día: *οκτώ το πρωί*, *οκτώ το βράδυ*. En los horarios escritos (barcos, colectivos) van las 24 horas."],
                "q": [
                    q("¿Cómo se dice «son las tres»?", "Είναι τρεις.", ["Είναι τρεις.", "Είναι τρία.", "Είναι οι τρεις."]),
                    q("¿Qué significa *ακριβώς*?", "en punto", ["en punto", "y media", "más o menos"]),
                    q("¿Cómo se dice «es la una»?", "Είναι μία.", ["Είναι μία.", "Είναι ένα.", "Είναι ένας."]),
                ],
            },
            {
                "h": "Y media, y cuarto, menos cuarto",
                "r": "Primero la hora y después los minutos, como en castellano. *και* suma y *παρά* resta. La media es *μισή* y el cuarto, *τέταρτο*. Los minutos van con el número de contar: *και πέντε, και δέκα, και είκοσι*.",
                "table": {"head": ["Hora", "Griego", "Palabra por palabra"], "rows": [
                    ["5:10", "πέντε και δέκα", "cinco y diez"],
                    ["5:15", "πέντε και τέταρτο", "cinco y cuarto"],
                    ["5:30", "πέντε και μισή", "cinco y media"],
                    ["5:45", "έξι παρά τέταρτο", "seis menos cuarto"],
                    ["5:50", "έξι παρά δέκα", "seis menos diez"],
                    ["6:00", "έξι ακριβώς", "seis en punto"],
                ]},
                "ex": [
                    ["Είναι δύο *και μισή*.", "Son las dos y media."],
                    ["Είναι επτά *και τέταρτο*.", "Son las siete y cuarto."],
                    ["Είναι εννέα *παρά τέταρτο*.", "Son las nueve menos cuarto."],
                    ["Είναι μία *παρά είκοσι*.", "Es la una menos veinte."],
                ],
                "warn": "*παρά* es «menos», no «para»: *έξι παρά τέταρτο* son las seis **menos** cuarto (5:45). Y es *μισή*, con *η* final, porque acompaña a *η ώρα*.",
                "tip": "Hasta la media se suma con *και*; pasada la media, se resta de la hora que viene con *παρά*: 7:40 es *οκτώ παρά είκοσι*.",
                "more": ["Vas a oír también la media pegada a la hora: *δυόμισι* (2:30), *τρεισήμισι* (3:30). Con *δύο και μισή* te entienden siempre."],
                "q": [
                    q("¿Qué hora es *τρεις και μισή*?", "3:30", ["3:30", "2:30", "3:15"]),
                    q("¿Qué hora es *οκτώ παρά τέταρτο*?", "7:45", ["7:45", "8:15", "8:45"]),
                    q("¿Cómo se dice «y cuarto»?", "και τέταρτο", ["και τέταρτο", "και μισή", "παρά τέταρτο"]),
                ],
            },
            {
                "h": "¿A qué hora? – στις",
                "r": "«¿A qué hora?» es *Τι ώρα;* y «¿cuándo?» es *Πότε;* Para contestar «a las…» se usa **στις** + la hora: *στις πέντε*, *στις οκτώ και μισή*. Hay una sola excepción: «a la una» es *στη μία*.",
                "ex": [
                    ["Τι ώρα πάμε στο λιμάνι; – *Στις επτά*.", "¿A qué hora vamos al puerto? – A las siete."],
                    ["Το μάθημα είναι *στις έξι και μισή*.", "La clase es a las seis y media."],
                    ["Τρώμε *στη μία*.", "Comemos a la una."],
                    ["Πότε έχεις μάθημα; – *Στις δέκα παρά τέταρτο*.", "¿Cuándo tenés clase? – A las diez menos cuarto."],
                    ["Έχω *ραντεβού* στις τρεις.", "Tengo una cita a las tres."],
                ],
                "warn": "*στις* es «a las», no «son las». *Είναι πέντε* = son las cinco; *στις πέντε* = a las cinco. Y con la una, *στη μία*, nunca «στις μία».",
                "tip": "*στις* es de la familia de *στον, στην, στο*: es *σε* + el artículo femenino en plural (las horas son varias; la una, una sola). El plural se ve la semana que viene; por ahora, aprendelo pegado a la hora.",
                "more": [
                    "*το ραντεβού* es la cita o el turno: con un amigo, con el médico, en el banco. Es neutro y no cambia nunca: *Έχω ραντεβού στις πέντε*.",
                    "Para reconocer: «como a las cinco» es *κατά τις πέντε* y «hasta las cinco», *μέχρι τις πέντε*.",
                ],
                "q": [
                    q("¿Cómo se dice «a las cuatro»?", "στις τέσσερις", ["στις τέσσερις", "στις τέσσερα", "είναι τέσσερις"]),
                    q("¿Cómo se dice «a la una»?", "στη μία", ["στη μία", "στις μία", "στο ένα"]),
                ],
            },
            {
                "h": "Las partes del día, hoy y mañana",
                "r": "*το πρωί* (la mañana), *το μεσημέρι* (el mediodía), *το απόγευμα* (la tarde) y *το βράδυ* (la noche, hasta irse a dormir) son los cuatro **neutros**. Para decir «a la mañana» o «a la noche» van así nomás, **sin preposición**: *Το πρωί πίνω καφέ*. Con la hora, van atrás: *στις οκτώ το πρωί*.",
                "table": {"head": ["Griego", "Castellano", "Ejemplo"], "rows": [
                    ["το πρωί", "la mañana; a la mañana", "Το πρωί δουλεύω."],
                    ["το μεσημέρι", "el mediodía; al mediodía", "Το μεσημέρι τρώμε στην ταβέρνα."],
                    ["το απόγευμα", "la tarde; a la tarde", "Το απόγευμα έχω μάθημα."],
                    ["το βράδυ", "la noche; a la noche", "Το βράδυ διαβάζω."],
                    ["σήμερα", "hoy", "Σήμερα δεν δουλεύω."],
                    ["αύριο", "mañana", "Αύριο πάμε στο νησί."],
                ]},
                "ex": [
                    ["*Το πρωί* πίνω έναν καφέ.", "A la mañana tomo un café."],
                    ["Έχω ραντεβού *στις πέντε το απόγευμα*.", "Tengo una cita a las cinco de la tarde."],
                    ["*Σήμερα το βράδυ* τρώμε στο σπίτι.", "Hoy a la noche comemos en casa."],
                    ["*Αύριο το πρωί* πάω στην τράπεζα.", "Mañana a la mañana voy al banco."],
                ],
                "warn": "«Mañana» son dos palabras distintas: el día de mañana es *αύριο*; la mañana del día es *το πρωί*. «Mañana a la mañana»: *αύριο το πρωί*. Y no pongas *σε*: «στο πρωί» no se dice.",
                "tip": "*νωρίς* es «temprano» y *αργά*, «tarde»: *Είναι νωρίς*, *Είναι πολύ αργά*. No confundas *αργά* (tarde, lo contrario de temprano) con *το απόγευμα* (la tarde, la parte del día).",
                "more": ["*το μεσημέρι* en Grecia es largo: va más o menos de las 12 a las 4, y a esa hora se almuerza. Al despedirte podés desear *Καλό απόγευμα!* o *Καλό βράδυ!*"],
                "q": [
                    q("¿Cómo se dice «mañana a la mañana»?", "αύριο το πρωί", ["αύριο το πρωί", "πρωί το αύριο", "αύριο στο πρωί"]),
                    q("¿Qué significa *αργά*?", "tarde (no temprano)", ["tarde (no temprano)", "la tarde", "mañana"]),
                    q("Completá: *στις εννέα ___* (a las nueve de la noche)", "το βράδυ", ["το βράδυ", "στο βράδυ", "η βράδυ"]),
                ],
            },
            {
                "h": "Los días de la semana",
                "r": "Los días se escriben con **mayúscula**. Seis son femeninos y uno es neutro: *το Σάββατο*. Para decir **cuándo** («el lunes voy…»), el día va en **acusativo y sin preposición**: *τη Δευτέρα, την Τρίτη, το Σάββατο*. Para decir qué día es, sin artículo: *Σήμερα είναι Δευτέρα*.",
                "table": {"head": ["Día", "Griego", "«El…» (cuándo)"], "rows": [
                    ["lunes", "η Δευτέρα", "τη Δευτέρα"],
                    ["martes", "η Τρίτη", "την Τρίτη"],
                    ["miércoles", "η Τετάρτη", "την Τετάρτη"],
                    ["jueves", "η Πέμπτη", "την Πέμπτη"],
                    ["viernes", "η Παρασκευή", "την Παρασκευή"],
                    ["sábado", "το Σάββατο", "το Σάββατο"],
                    ["domingo", "η Κυριακή", "την Κυριακή"],
                ]},
                "ex": [
                    ["Σήμερα είναι *Τετάρτη*.", "Hoy es miércoles."],
                    ["*Την Παρασκευή* πάμε στο θέατρο.", "El viernes vamos al teatro."],
                    ["Έχω μάθημα *την Τρίτη* και *την Πέμπτη*.", "Tengo clase el martes y el jueves."],
                    ["*Το Σάββατο* δεν δουλεύω.", "El sábado no trabajo."],
                    ["*Τι μέρα* είναι σήμερα;", "¿Qué día es hoy?"],
                ],
                "warn": "No es «στην Τρίτη» ni «η Τρίτη πάω»: para decir cuándo, el acusativo solo, *την Τρίτη*. Y la cuenta empieza en el domingo: por eso el lunes es «el segundo» y no «el primero».",
                "tip": "Cuatro días son números: *Δευτέρα* (segunda), *Τρίτη* (tercera), *Τετάρτη* (cuarta), *Πέμπτη* (quinta). *Παρασκευή* es «preparación» (del sábado) y *Κυριακή*, «el día del Señor».",
                "more": ["*η εβδομάδα* (la semana) tiene adentro el siete, igual que *εβδομήντα* (70). «Esta semana» se dice *αυτή την εβδομάδα*, también en acusativo y sin preposición."],
                "q": [
                    q("¿Cómo se dice «el sábado» (cuándo)?", "το Σάββατο", ["το Σάββατο", "στο Σάββατο", "την Σάββατο"]),
                    q("¿Qué día es *Τρίτη*?", "martes", ["martes", "miércoles", "jueves"]),
                    q("Completá: *Σήμερα είναι ___.*", "Κυριακή", ["Κυριακή", "την Κυριακή", "στην Κυριακή"]),
                ],
            },
            {
                "h": "Los verbos en -άω: μιλάω",
                "r": "Hasta acá los verbos terminaban en *-ω* sin acento (*μένω, δουλεύω*): son el tipo A. Los del tipo B terminan en **-άω**, con el acento en la terminación, y tienen sus propias terminaciones: *-άω, -άς, -άει, -άμε, -άτε, -άνε*. El acento no se mueve nunca de la *ά*.",
                "table": {"head": ["Persona", "μιλάω (hablar)", "μένω (para comparar)"], "rows": [
                    ["εγώ", "μιλάω", "μένω"],
                    ["εσύ", "μιλάς", "μένεις"],
                    ["αυτός, αυτή, αυτό", "μιλάει", "μένει"],
                    ["εμείς", "μιλάμε", "μένουμε"],
                    ["εσείς", "μιλάτε", "μένετε"],
                    ["αυτοί", "μιλάνε", "μένουν"],
                ]},
                "ex": [
                    ["*Μιλάω* λίγο ελληνικά.", "Hablo un poco de griego."],
                    ["*Μιλάς* ισπανικά;", "¿Hablás castellano?"],
                    ["Η Μαρία *μιλάει* πολύ καλά αγγλικά.", "María habla muy bien inglés."],
                    ["Δεν *μιλάμε* ελληνικά στο σπίτι.", "No hablamos griego en casa."],
                ],
                "warn": "No les pongas las terminaciones de *μένω*: «μιλάεις», «μιλάουμε» y «μιλάετε» no existen. Es *μιλάς, μιλάμε, μιλάτε*: más cortas.",
                "tip": "Se parece al castellano: «hablás, hablamos» → *μιλάς, μιλάμε*. Y es el mismo molde de *πάω, πας, πάει, πάμε, πάτε, πάνε*, que ya sabés.",
                "more": ["Hay formas más cortas que vas a leer seguido: *μιλώ* (igual a *μιλάω*), *μιλά* (igual a *μιλάει*), *μιλούν* (igual a *μιλάνε*). Son las mismas personas; vos usá las de la tabla."],
                "q": [
                    q("Completá: *Εσύ ___ ελληνικά;*", "μιλάς", ["μιλάς", "μιλάεις", "μιλάει"]),
                    q("Completá: *Εμείς ___ ισπανικά.*", "μιλάμε", ["μιλάμε", "μιλάουμε", "μιλάνε"]),
                    q("¿Dónde va el acento en estos verbos?", "siempre en la *ά* de la terminación", ["siempre en la *ά* de la terminación", "en la primera sílaba", "cambia según la persona"]),
                ],
            },
            {
                "h": "ξυπνάω, ρωτάω, περπατάω, αγαπάω, πεινάω, διψάω",
                "r": "Todos van como *μιλάω*: *ξυπνάω* (despertarse), *ρωτάω* (preguntar), *περπατάω* (caminar), *αγαπάω* (querer, amar). Y dos que en castellano no son verbos: *πεινάω* es «tener hambre» y *διψάω*, «tener sed», en una sola palabra.",
                "table": {"head": ["Verbo", "Significa", "Ejemplo"], "rows": [
                    ["ξυπνάω", "despertarse", "Ξυπνάω στις επτά."],
                    ["ρωτάω", "preguntar", "Ρωτάω τον κύριο."],
                    ["περπατάω", "caminar", "Περπατάμε στην παραλία."],
                    ["αγαπάω", "querer, amar", "Αγαπάω τη θάλασσα."],
                    ["πεινάω", "tener hambre", "Πεινάς;"],
                    ["διψάω", "tener sed", "Διψάω πολύ."],
                ]},
                "ex": [
                    ["Τι ώρα *ξυπνάς*; – *Ξυπνάω* νωρίς, στις έξι.", "¿A qué hora te despertás? – Me despierto temprano, a las seis."],
                    ["Το παιδί *πεινάει*.", "El nene tiene hambre."],
                    ["*Διψάμε*. Θέλουμε νερό.", "Tenemos sed. Queremos agua."],
                    ["Ο Πέτρος *αγαπάει* την Ελένη.", "Pedro quiere a Elena."],
                    ["*Ρωτάω* πού είναι ο σταθμός.", "Pregunto dónde queda la estación."],
                ],
                "warn": "No traduzcas «tengo hambre» con *έχω*: se dice *πεινάω*, y «tengo sed», *διψάω*. Y *ξυπνάω* no lleva «me»: *Ξυπνάω στις επτά*, me despierto a las siete.",
                "tip": "La persona a la que le preguntás va en acusativo, directa: *Ρωτάω τον Νίκο*, «le pregunto a Nico». Lo mismo con *αγαπάω*: *Αγαπάω την Ελλάδα*.",
                "q": [
                    q("¿Cómo se dice «tengo hambre»?", "Πεινάω.", ["Πεινάω.", "Έχω πεινάω.", "Διψάω."]),
                    q("Completá: *Το πρωί η Άννα ___ στις έξι.*", "ξυπνάει", ["ξυπνάει", "ξυπνάς", "ξυπνάω"]),
                    q("*Διψάμε* significa…", "Tenemos sed.", ["Tenemos sed.", "Tenemos hambre.", "Tienen sed."]),
                ],
            },
        ],
    },
    "vocab": [
        ["η ώρα", "la hora", "Τι ώρα είναι;"],
        ["το πρωί", "la mañana", "Το πρωί πίνω καφέ."],
        ["το μεσημέρι", "el mediodía", "Το μεσημέρι τρώμε στο σπίτι."],
        ["το απόγευμα", "la tarde", "Το απόγευμα έχω μάθημα."],
        ["το βράδυ", "la noche", "Το βράδυ διαβάζω ένα βιβλίο."],
        ["η μέρα", "el día", "Τι μέρα είναι σήμερα;"],
        ["η εβδομάδα", "la semana", "Δουλεύω μία εβδομάδα στην Αθήνα."],
        ["σήμερα", "hoy", "Σήμερα είναι Δευτέρα."],
        ["αύριο", "mañana", "Αύριο πάμε στο νησί."],
        ["πότε", "cuándo", "Πότε έχεις μάθημα;"],
        ["μιλάω", "hablar (hablo)", "Μιλάω λίγο ελληνικά."],
        ["ξυπνάω", "despertarse (me despierto)", "Ξυπνάω στις επτά."],
        ["ρωτάω", "preguntar (pregunto)", "Ρωτάω πού είναι το λιμάνι."],
        ["περπατάω", "caminar (camino)", "Περπατάω στην παραλία."],
        ["αγαπάω", "querer, amar (quiero)", "Αγαπάω την Ελλάδα."],
        ["πεινάω", "tener hambre (tengo hambre)", "Πεινάω πολύ."],
        ["διψάω", "tener sed (tengo sed)", "Διψάω. Θέλω νερό."],
        ["νωρίς", "temprano", "Ξυπνάω νωρίς."],
        ["αργά", "tarde", "Είναι πολύ αργά."],
    ],
    "can": [
        ("Decir y escribir los números hasta 100", [13, 14]),
        ("Preguntar y decir la hora", [15, 16]),
        ("Arreglar una cita: qué día y a qué hora", [31, 34]),
        ("Usar los verbos en -άω: hablar, despertarte, tener hambre o sed", [46, 47]),
    ],
    "items": [
        # parte 0 — los números y la hora
        ch(0, NUM, "δώδεκα", "12", ["12", "20", "2"], "*δώδεκα* es 12; 20 es *είκοσι*."),
        ch(0, NUM, "δεκαεπτά", "17", ["17", "70", "7"], "*δεκαεπτά*: *δέκα* + *επτά*, 17. El 70 es *εβδομήντα*."),
        ch(0, "¿Cómo se dice?", "45", "σαράντα πέντε", ["σαράντα πέντε", "σαράντα και πέντε", "τριάντα πέντε"], "La decena y la unidad, separadas y sin «y»: *σαράντα πέντε*."),
        ch(0, "¿Cómo se dice?", "«Son las tres.»", "Είναι τρεις.", ["Είναι τρεις.", "Είναι τρία.", "Στις τρεις."], "La hora va en femenino: *τρεις*. *στις τρεις* sería «a las tres»."),
        ch(0, HORA, "Είναι επτά και μισή.", "7:30", ["7:30", "6:30", "7:15"], "*και μισή* = y media."),
        ch(0, HORA, "Είναι δέκα παρά τέταρτο.", "9:45", ["9:45", "10:15", "10:45"], "*παρά* resta: las diez menos cuarto."),
        ch(0, HORA, "Είναι μία και είκοσι.", "1:20", ["1:20", "12:40", "1:40"], "*μία* es la una, y *και είκοσι* le suma veinte minutos."),
        li(0, "δεκατρία", ["δεκατρία", "δεκατέσσερα", "τριάντα"], "*δεκατρία*, 13: un solo acento, en la *ί*. *τριάντα* es 30."),
        cz(0, LETRAS, "Το κρασί κάνει ___ ευρώ. (12)", "δώδεκα", note="*δώδεκα*, con *ω* y el acento en la primera."),
        cz(0, LETRAS, "Το ξενοδοχείο κάνει ___ ευρώ. (80)", "ογδόντα", note="*ογδόντα*: una de las decenas que no se parecen a su unidad."),
        cz(0, "Completá la hora: las 4:00.", "Είναι ___ ακριβώς.", "τέσσερις", note="Para la hora, el 4 va en femenino: *τέσσερις*, no «τέσσερα»."),
        cz(0, "Completá la hora: las 6:30.", "Είναι έξι και ___.", "μισή", note="*μισή*, con *η* final, porque acompaña a *η ώρα*."),
        ty(0, LETRAS, "15", "δεκαπέντε", note="Todo junto y con un solo acento: *δεκαπέντε*."),
        ty(0, LETRAS, "33", "τριάντα τρία", note="Separado y sin «y»: *τριάντα τρία*."),
        tr(0, "¿Qué hora es?", "Τι ώρα είναι;", note="*Τι ώρα είναι;*, con *;* al final."),
        tr(0, "Son las ocho y cuarto.", "Είναι οκτώ και τέταρτο.", var("Είναι οκτώ και τέταρτο.", "Η ώρα είναι οκτώ και τέταρτο."), "Sin artículo: *Είναι οκτώ*. El cuarto es *τέταρτο*."),
        tr(0, "Es la una menos diez.", "Είναι μία παρά δέκα.", var("Είναι μία παρά δέκα.", "Η ώρα είναι μία παρά δέκα."), "*μία* en femenino, y *παρά* para lo que falta."),
        fx(0, "Είναι τρία και μισή.", "τρία", "τρεις", "concordancia", "La hora es femenina: *τρεις*, no «τρία»."),
        di(0, "Είναι πέντε και τέταρτο.", note="*τέταρτο* lleva el acento en la primera y termina en *ο*."),
        # parte 1 — cuándo
        ch(1, "Elegí la forma correcta.", "Το μάθημα είναι ___ πέντε.", "στις", ["στις", "στη", "στο"], "«A las» + hora: *στις πέντε*."),
        ch(1, "Elegí la forma correcta.", "Τρώμε ___ μία.", "στη", ["στη", "στις", "στο"], "La una es una sola: *στη μία*, no «στις μία»."),
        ch(1, "¿Qué día sigue?", "Δευτέρα, Τρίτη, ___", "Τετάρτη", ["Τετάρτη", "Πέμπτη", "Παρασκευή"], "*Τετάρτη*, «la cuarta»: miércoles."),
        ch(1, "¿Cómo se dice «el viernes voy al puerto»?", "___ πάω στο λιμάνι.", "Την Παρασκευή", ["Την Παρασκευή", "Η Παρασκευή", "Στην Παρασκευή"], "Para decir cuándo, el día en acusativo y sin preposición: *την Παρασκευή*."),
        ch(1, SIG, "Αύριο το πρωί έχω ραντεβού.", "Mañana a la mañana tengo una cita.", ["Mañana a la mañana tengo una cita.", "Hoy a la mañana tengo una cita.", "Mañana a la tarde tengo clase."], "*αύριο* = mañana (el día); *το πρωί* = a la mañana."),
        ch(1, "¿Qué contestás?", "Τι μέρα είναι σήμερα;", "Σήμερα είναι Πέμπτη.", ["Σήμερα είναι Πέμπτη.", "Είναι πέντε και μισή.", "Στις πέντε."], "*Τι μέρα…;* pregunta el día, no la hora: *Πέμπτη*, jueves."),
        li(1, "Κυριακή", ["Κυριακή", "Τετάρτη", "Παρασκευή"], "*Κυριακή*: domingo, con el acento en la última."),
        cz(1, "Completá: «a las nueve».", "Έχουμε ραντεβού ___ εννέα.", "στις", note="*στις* + hora: *στις εννέα*."),
        cz(1, "Completá con el artículo del día.", "___ Σάββατο δεν δουλεύω.", "Το", ["Το", "το"], "*το Σάββατο* es el único día neutro; para decir cuándo, queda igual."),
        cz(1, "Completá: «a la noche».", "Το ___ διαβάζω ένα βιβλίο.", "βράδυ", note="*το βράδυ*, sin preposición: «a la noche». Termina en *υ*."),
        tr(1, "Hoy es lunes.", "Σήμερα είναι Δευτέρα.", note="Para decir qué día es, sin artículo y con mayúscula: *Δευτέρα*."),
        tr(1, "La clase es a las seis y media.", "Το μάθημα είναι στις έξι και μισή.", note="*στις* + la hora, y después los minutos: *στις έξι και μισή*."),
        tr(1, "El sábado vamos a la playa.", "Το Σάββατο πάμε στην παραλία.", ["Το Σάββατο πάμε στην παραλία.", "Πάμε στην παραλία το Σάββατο.", "Το Σάββατο εμείς πάμε στην παραλία."], "El día, sin preposición: *το Σάββατο*."),
        tr(1, "¿Cuándo tenés clase?", "Πότε έχεις μάθημα;", ["Πότε έχεις μάθημα;", "Πότε έχεις μάθημα εσύ;", "Εσύ πότε έχεις μάθημα;"], "*Πότε* (¿cuándo?), con el acento en la primera."),
        ty(1, "Contestá en griego: el martes a las cuatro.", "Πότε έχεις ραντεβού; (el martes a las cuatro)", "Την Τρίτη στις τέσσερις.", ["Την Τρίτη στις τέσσερις.", "Έχω ραντεβού την Τρίτη στις τέσσερις.", "Την Τρίτη, στις τέσσερις."], "El día en acusativo (*την Τρίτη*) y la hora en femenino (*στις τέσσερις*)."),
        fx(1, "Έχω μάθημα στις μία.", "στις", "στη", "articulo", "La una es singular: *στη μία*.", ["Έχω μάθημα στην μία.", "Έχω μάθημα στη μια."]),
        di(1, "Αύριο είναι Κυριακή.", note="*Αύριο* empieza con *αυ*, que acá suena «av»; *Κυριακή*, con *υ* y con mayúscula."),
        # parte 2 — los verbos en -άω
        ch(2, "Elegí la forma de μιλάω.", "Εσύ ___ αγγλικά;", "μιλάς", ["μιλάς", "μιλάει", "μιλάεις"], "Con *εσύ*: *μιλάς*. «μιλάεις» mezcla las terminaciones de *μένω*."),
        ch(2, "Elegí la forma de ξυπνάω.", "Η Σοφία ___ νωρίς το πρωί.", "ξυπνάει", ["ξυπνάει", "ξυπνάω", "ξυπνάνε"], "Ella: *ξυπνάει*."),
        ch(2, "Elegí la forma de περπατάω.", "Εμείς ___ στην παραλία.", "περπατάμε", ["περπατάμε", "περπατάτε", "περπατάνε"], "Con *εμείς*: *περπατάμε*, como «caminamos»."),
        ch(2, "¿Cómo se dice?", "«Tengo sed.»", "Διψάω.", ["Διψάω.", "Έχω διψάω.", "Πεινάω."], "«Tener sed» es un verbo: *διψάω*. *πεινάω* es «tener hambre»."),
        ch(2, SIG, "Ο Νίκος και η Άννα πεινάνε.", "Nico y Ana tienen hambre.", ["Nico y Ana tienen hambre.", "Nico y Ana tienen sed.", "Nico y Ana caminan."], "*πεινάνε*: ellos tienen hambre."),
        li(2, "ρωτάω", ["ρωτάω", "περπατάω", "αγαπάω"], "*ρωτάω*: preguntar. Empieza con *ρ*, que es una r."),
        cz(2, "Completá con la forma de μιλάω.", "Ο Κώστας και η Ελένη ___ ισπανικά.", "μιλάνε", ["μιλάνε", "μιλούν", "μιλούνε", "μιλάν"], "Son dos, «ellos»: *μιλάνε*."),
        cz(2, "Completá con la forma de ξυπνάω.", "Τι ώρα ___ εσύ το πρωί;", "ξυπνάς", note="Con *εσύ*: *ξυπνάς*."),
        cz(2, "Completá con la forma de αγαπάω.", "Η Μαρία ___ τον Γιάννη.", "αγαπάει", ["αγαπάει", "αγαπά"], "Ella: *αγαπάει*. A quien quiere va en acusativo: *τον Γιάννη*."),
        tr(2, "Hablo un poco de griego.", "Μιλάω λίγο ελληνικά.", ["Μιλάω λίγο ελληνικά.", "Μιλώ λίγο ελληνικά.", "Εγώ μιλάω λίγο ελληνικά.", "Μιλάω λίγα ελληνικά.", "Μιλάω ελληνικά λίγο."], "*μιλάω* + el idioma, sin artículo: *Μιλάω ελληνικά*."),
        tr(2, "Me despierto a las siete.", "Ξυπνάω στις επτά.", var("Ξυπνάω στις επτά.", "Ξυπνώ στις επτά.", "Εγώ ξυπνάω στις επτά."), "*ξυπνάω* va solo, sin «me»; la hora, con *στις*."),
        tr(2, "¿Tenés hambre?", "Πεινάς;", ["Πεινάς;", "Εσύ πεινάς;", "Πεινάς εσύ;"], "Una sola palabra: *Πεινάς;*"),
        ty(2, "Contestá en griego: no, pero tengo sed.", "Πεινάς; (no, pero tengo sed)", "Όχι, αλλά διψάω.", ["Όχι, αλλά διψάω.", "Όχι, αλλά διψώ.", "Όχι αλλά διψάω.", "Όχι, δεν πεινάω, αλλά διψάω."], "*αλλά* = pero; *διψάω* = tengo sed."),
        fx(2, "Εμείς μιλάουμε ελληνικά.", "μιλάουμε", "μιλάμε", "conjugacion", "Los verbos en *-άω* hacen *-άμε* con *εμείς*: *μιλάμε*.", ["Εμείς μιλούμε ελληνικά."]),
        di(2, "Μιλάς ελληνικά;", note="*Μιλάς* con *ι*; *ελληνικά* con dos *λ* y con *η*."),
        tr(2, "Voy a la estación a pie.", "Πάω στον σταθμό με τα πόδια.", var("Πάω στον σταθμό με τα πόδια.", "Πάω με τα πόδια στον σταθμό.", "Εγώ πάω στον σταθμό με τα πόδια."), "Repaso de la semana 6: *ο σταθμός* es masculino (*στον σταθμό*) y «a pie» es *με τα πόδια*."),
        cz(2, "Completá con στον, στην o στο.", "Το φαρμακείο είναι δίπλα ___ τράπεζα.", "στην", note="Repaso de la semana 6: *δίπλα* va con *σε*, y *η τράπεζα* es femenino: *στην τράπεζα*."),
        ch(2, "Elegí la forma de πάω.", "Η Άννα και ο Πέτρος ___ στο αεροδρόμιο με το ταξί.", "πάνε", ["πάνε", "πάει", "πάμε"], "Repaso de la semana 6: son dos, «ellos»: *πάνε*."),
        tr(2, "Quiero un jugo, por favor.", "Θέλω έναν χυμό, παρακαλώ.", var("Θέλω έναν χυμό, παρακαλώ.", "Εγώ θέλω έναν χυμό, παρακαλώ."), "Repaso de la semana 5: lo que querés va en acusativo: *έναν χυμό*."),
        fx(2, "Πίνω ένας καφές το πρωί.", "ένας καφές", "έναν καφέ", "caso", "Repaso de la semana 5: lo que tomás va en acusativo: *έναν καφέ*.", ["Πίνω ένα καφέ το πρωί."]),
    ],
}
