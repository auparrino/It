# -*- coding: utf-8 -*-
"""Ascolto, settimana 1: distinguere i suoni prima di scriverli.

Il testo non si vede (nopeek): si sente una parola e si sceglie come si
scrive.  Coppie minime delle doppie e delle lettere che in spagnolo non
esistono (c/ch, gl, gn, sc).
"""

P = "Escuchá: ¿qué palabra dice?"

# (dice, altre opzioni, nota)
PAIRS = [
    ("nonno", ["nono"], "nonno = abuelo, con doble n larga; nono = noveno."),
    ("nono", ["nonno"], "nono = noveno, n simple; nonno (abuelo) alarga la n."),
    ("palla", ["pala"], "palla = pelota: la l doble dura más. pala = pala."),
    ("sette", ["sete"], "sette = siete (doble t, se frena antes); sete = sed."),
    ("casa", ["cassa"], "casa, con s simple (suena casi como z suave); cassa = caja."),
    ("penna", ["pena"], "penna = lapicera, doble n; pena = pena."),
    ("caro", ["carro"], "caro = caro, r simple; carro = carro, r fuerte."),
    ("sono", ["sonno"], "sono = soy / son; sonno = sueño, con doble n."),
    ("cappello", ["capello"], "cappello = sombrero (doble p); capello = pelo."),
    ("anno", ["ano"], "anno = año: la doble n es la que en español es ñ."),
    ("chiesa", ["ciesa", "cesa"], "ch + i suena como k (como «quie» en español): chiesa = iglesia."),
    ("cena", ["chena", "scena"], "c + e suena como la ch española: cena = cena. Para el sonido k se escribe ch."),
    ("figlio", ["filio", "fillo"], "gl + i: un sonido como la ll bien pronunciada; figlio = hijo."),
    ("bagno", ["banio", "bañio"], "gn suena como la ñ: bagno = baño."),
    ("pesce", ["pese", "pesche"], "sc + e suena como sh: pesce = pez, pescado."),
    ("gatto", ["gato", "ghatto"], "gatto = gato: doble t, y g dura ante a."),
]

ITEMS = []
for k, (said, other, note) in enumerate(PAIRS, 1):
    ITEMS.append(dict(id="asc-1-%02d" % k, type="listen", topic="ortografia", level="A1",
                      prompt=P, stem=said, options=[said] + other, answer=said,
                      nopeek=True, note=note))
