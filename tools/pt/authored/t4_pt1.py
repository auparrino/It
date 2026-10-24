# -*- coding: utf-8 -*-
"""Tanda 4, portugués, semanas 1-13 (prefijo t4pt1-).

Lo que pedían las propuestas de la temporada 1 (auditorias/2026-10-
portugues-revision.md y PLAN-2026-10-propuestas.md, «Tanda 4»):

  - escucha dentro de la lista del curso: un ítem de oído por semana, del
    2 al 12, con el sonido de la semana de Suoni en una oración (lo que
    se distingue de oído: nasales, -l final, átonas que cambian el tiempo,
    números, horas y precios), dictados cortos y escucha en el jefe;
  - gostar de en la semana 6 (bloque nuevo de la lección): completar,
    corregir *me gosta* y traducir «¿te gusta…?»;
  - rechazar con atenuación (semana 6, bloque «Invitar…», y semanas 8 y
    12): elegir lo adecuado y un error de registro, que se corrige por
    adecuación y no por gramática;
  - pronombres objeto del habla, solo para entender: *vi ele* (11), *me
    liga, te vejo* (12, bloque nuevo);
  - jefe de la 13: traducciones que cruzan dos o tres reglas.

Cada ítem va en una semana con su gramática ya explicada; «part» es la
parte de la lección de esa semana (tools/pt/lessons/s1.py).
"""
import itertools

ITEMS = []
_N = {}

LI = "Escuchá: ¿qué oración dice?"
DI = "Dictado: escuchá y escribí lo que oís."
TR = "Traducí al portugués."
CZ = "Completá."
FX = "Encontrá el error: tocá la parte que está mal y corregila."
SG = "Elegí lo que significa."
PR = "Elegí la respuesta más adecuada a la situación."


def _level(w):
    return "A1" if w <= 8 else "A2"


def _id(w):
    _N[w] = _N.get(w, 0) + 1
    return "t4pt1-%02d-%02d" % (w, _N[w])


def _x(*parts):
    """Todas las combinaciones: cada parte es un texto fijo o una lista de
    opciones.  La primera combinación es la respuesta."""
    slots = [p if isinstance(p, list) else [p] for p in parts]
    out = []
    for combo in itertools.product(*slots):
        s = "".join(combo)
        if s not in out:
            out.append(s)
    return out


def _add(w, part, typ, prompt, stem, answer, note, topic, alt=None, **kw):
    d = dict(id=_id(w), w=w, part=part, level=_level(w), type=typ, topic=topic,
             prompt=prompt, stem=stem, answer=answer, alt=list(alt or []), note=note)
    d.update(kw)
    ITEMS.append(d)


def li(w, part, said, others, note):
    """Se oye «said» (TTS pt-BR, sin ver el texto) y se elige entre oraciones
    que se distinguen de oído."""
    _add(w, part, "listen", LI, said, said, note, "escucha", options=[said] + others, nopeek=True)


def di(w, part, sentence, note, alt=None):
    _add(w, part, "dictation", DI, sentence, sentence, note, "escucha", alt=alt)


def ch(w, part, prompt, stem, options, answer, note, topic):
    _add(w, part, "choice", prompt, stem, answer, note, topic, options=options)


def tr(w, part, stem, answers, note, topic):
    _add(w, part, "translate", TR, stem, answers[0], note, topic, alt=answers[1:])


def cz(w, part, stem, answer, note, topic, alt=None):
    _add(w, part, "cloze", CZ, stem, answer, note, topic, alt=alt)


def fx(w, part, cat, stem, bad, good, note, topic, good_alt=None):
    kw = dict(cat=cat, bad=bad, good=good)
    if good_alt:
        kw["goodAlt"] = good_alt
    _add(w, part, "fixerr", FX, stem, stem.replace(bad, good, 1), note, topic, **kw)


# ---------------------------------------------------------------- escucha
# El sonido de la semana (la misma línea que tools/pt/curriculo.py pone en
# «Lo que se juega»), en una oración.
li(2, 0, "As mães estão aqui.", ["As mãos estão aqui."],
   "mães (madres) cierra hacia la i: «mãis»; mãos (manos) cierra hacia la u: «mãus».")
li(3, 1, "Estou no Rio.", ["Estou em Rio."],
   "La contracción no suena «nu», átona y corta. Con nombres que llevan artículo (o Rio) es obligatoria: estou no Rio.")
li(4, 0, "O mel é muito bom.", ["O meu é muito bom."],
   "mel suena «méu», con é abierta, porque la -l final es u; meu tiene ê cerrada.")
li(5, 0, "Vocês falam muito.", ["Você fala muito."],
   "La -am final es nasal y suena «ãu»: falam ≈ «fálãu» (vocês, plural). Sin ese final nasal, fala es singular (você). Se escribe -am porque es átona; -ão es para la sílaba tónica (estação, pão).")
li(6, 0, "Estou com pressa.", ["Estou com presa."],
   "ss es s sorda: pressa (prisa). Una s sola entre vocales suena z: presa (presa, garra).")
li(7, 2, "São seis e meia.", ["São sete e meia.", "São três e meia."],
   "seis (6) suena «séis»; sete (7), «séchi»; três (3), «trêis». Y meia = y media.")
li(7, 2, "Custa sessenta reais.", ["Custa setenta reais.", "Custa seiscentos reais."],
   "sessenta (60) con ss; setenta (70) con una t que acá suena t, no «ch». seiscentos es 600.")
li(8, 2, "Ele está chegando.", ["Ele está jogando."],
   "ch suena «sh», sorda (chegando); j suena como la «y» zumbada de «yo», sonora (jogando).")
li(9, 0, "A Bia mora no Leblon.", ["A Bia mora em Leblon."],
   "Leblon, como el Flamengo o el Centro, lleva artículo: no Leblon. Otros barrios no: em Copacabana, em Ipanema.")
li(10, 0, "O carro dele é novo.", ["O carro dela é novo."],
   "dele (de él): ê cerrada y la e final suena «i», «déli»; dela (de ella): é abierta, «déla».")
li(10, 2, "Os meus avós moram em Recife.", ["Os meus avôs moram em Recife."],
   "avós (ó abierta): las abuelas, o los abuelos en general (abuela y abuelo); avôs (ô cerrada): solo abuelos varones.")
li(11, 0, "Ela falou com a Bia.", ["Ela fala com a Bia."],
   "falou (pasado) carga el acento al final, en una ô cerrada: «faló». fala (presente) lo carga en la raíz: «fála». El sujeto es el mismo: solo el final te dice el tiempo.")
li(11, 1, "Eu vim de ônibus.", ["Eu vi o ônibus."],
   "vim (vine) es nasal: la i suena también por la nariz. vi (vi) es oral.")
li(12, 0, "Me dê o sal, por favor.", ["Me de o sal, por favor."],
   "dê (imperativo de dar) suena «dê», con e cerrada y tónica. de, la preposición, es átona y suena «yi». Por eso dê lleva circunflejo.")

di(7, 2, "O ingresso custa quarenta reais.",
   "quarenta (40), con qu; reais, plural de real.",
   alt=["O ingresso custa 40 reais.", "O ingresso custa R$ 40.", "O ingresso custa R$40.",
        "O ingresso custa R$ 40,00.", "O ingresso custa R$40,00."])
di(7, 2, "O show começa às nove e meia.",
   "às (a + as) con acento grave para la hora; nove e meia = nueve y media.",
   alt=["O show começa às 9 e meia.", "O show começa às 9h30.", "O show começa às 21h30.",
        "O show começa às 9:30.", "O show começa às 21:30."])
di(9, 2, "Vou de metrô até a praia.",
   "de + medio de transporte, sin artículo; até a = hasta la.",
   alt=["Vou de metrô até à praia."])
di(11, 2, "Ontem a gente comeu num restaurante baiano.",
   "comeu (perfeito) termina en -eu; num = em + um.",
   alt=["Ontem a gente comeu em um restaurante baiano."])

# El jefe también escucha.
li(13, 1, "Eles vieram ontem.", ["Eles viram ontem."],
   "vieram (vinieron) tiene tres sílabas, vi-e-ram; viram (vieron), dos.")
li(13, 1, "Fui à praia ontem.", ["Foi à praia ontem."],
   "fui (yo fui) termina en «úi»; foi (él, ella o usted fue), en «ói». Sin sujeto, el verbo es la única pista.")
di(13, 1, "A gente vai à praia no sábado.",
   "a gente + verbo en singular (vai); à = a + a; no sábado = el sábado.")

# ------------------------------------------------------------- gostar de
# Semana 6, bloque «Você gosta de samba? — Gosto!» (parte 2).
cz(6, 2, "Eu gosto ___ praia.", "da",
   "gostar lleva de, que se contrae con el artículo: de + a = da. Sin artículo, en general, también vale: gosto de praia. El que siente el gusto es el sujeto: eu gosto.", "gostar",
   alt=["de"])
fx(6, 2, "gostar", "Me gosta o samba.", "Me gosta o", "Eu gosto do",
   "En portugués no se dice «me gusta»: el que siente el gusto es el sujeto (eu gosto) y lo que gusta va con de (do samba).",
   "gostar", good_alt=["Gosto do", "Eu gosto de", "Gosto de"])
tr(6, 2, "¿Te gusta el samba?",
   _x(["Você gosta de samba?", "Você gosta do samba?", "Gosta de samba?", "Gosta do samba?",
       "Cê gosta de samba?", "Tu gosta de samba?", "Tu gostas de samba?"]),
   "Al revés que en español: el que siente el gusto es el sujeto (você gosta) y lo que gusta lleva de. Para contestar se repite el verbo: Gosto!",
   "gostar")
ch(6, 2, SG, "A Ana gosta do João.", ["A Ana le gusta João.", "A João le gusta Ana.", "Ana y João se gustan."],
   "A Ana le gusta João.",
   "El sujeto (a Ana) es la que siente el gusto; lo que gusta va después de de: do João.", "gostar")

# ------------------------------------------------- rechazar con atenuación
ch(6, 2, PR, "Bia te invita a la playa y no podés. ¿Qué suena más amable en Brasil?",
   ["Ah, que pena! Hoje não dá, mas fica pra próxima, tá?", "Não posso.", "Não quero, obrigado."],
   "Ah, que pena! Hoje não dá, mas fica pra próxima, tá?",
   "Un no seco suena brusco en Brasil. Lamentá (que pena), decí que no podés (hoje não dá) y dejá la puerta abierta (fica pra próxima).",
   "pragmatica")
ch(8, 3, PR, "Te invitan a un churrasco el domingo y no podés. ¿Qué decís para no sonar brusco?",
   ["Ah, que pena! Acho que não vai dar, mas fica pra próxima!", "Não vou.", "Não, obrigado."],
   "Ah, que pena! Acho que não vai dar, mas fica pra próxima!",
   "Acho que não vai dar suaviza el no: «me parece que no va a poder ser». Não vou suena a que no querés ir.",
   "pragmatica")
ch(8, 3, PR, "Un compañero de trabajo: —Vamos tomar um chope depois do trabalho? Hoy no podés.",
   ["Poxa, hoje não dá… Amanhã pode ser?", "Não posso. Tchau.", "Não gosto de chope."],
   "Poxa, hoje não dá… Amanhã pode ser?",
   "Poxa marca la lástima y la contrapropuesta (amanhã pode ser?) muestra que el no es por hoy, no por él.",
   "pragmatica")
ch(12, 3, PR, "Tu vecina te invita a un cafezinho y estás apurado.",
   ["Ah, que pena, agora não vai dar: tô com pressa! Mas fica pra próxima, tá?", "Não, obrigado. Não tenho tempo.", "Agora não. Tchau."],
   "Ah, que pena, agora não vai dar: tô com pressa! Mas fica pra próxima, tá?",
   "El rechazo brasileño lamenta, explica y deja la puerta abierta. Las otras dos son correctas, pero suenan secas.",
   "pragmatica")
ch(12, 3, PR, "Un amigo te invita a la playa el domingo, pero querés quedarte en casa.",
   ["Poxa, domingo não vai dar… Mas a gente marca outro dia, tá?", "Não gosto de praia.", "Não vou, não."],
   "Poxa, domingo não vai dar… Mas a gente marca outro dia, tá?",
   "Aunque el motivo sea que no tenés ganas, lo habitual en Brasil es decir que no va a dar y proponer otro día: a gente marca outro dia.",
   "pragmatica")
fx(12, 3, "registro", "Senhor, fala mais devagar, por favor.", "fala", "fale",
   "No hay error de gramática: fala es la forma del habla, la de los amigos. Si tratás a alguien de senhor, lo esperable es la forma formal: Senhor, fale mais devagar (o, más suave todavía, O senhor pode falar mais devagar?).",
   "pragmatica")

# --------------------------------------- pronombres objeto, para entender
ch(11, 1, SG, "Vi ele ontem no metrô.",
   ["Lo vi ayer en el subte.", "Él me vio ayer en el subte.", "Él vio ayer el subte."],
   "Lo vi ayer en el subte.",
   "En el habla de Brasil el objeto «lo» es muchas veces ele, después del verbo: vi ele. Por escrito: eu o vi. Para entender: se practica en la semana 16.",
   "pronomes")
ch(12, 0, SG, "Me liga amanhã!", ["Llamame mañana.", "Te llamo mañana.", "Me llamo así."],
   "Llamame mañana.",
   "me delante del verbo, en el habla: me liga = llamame (vos a mí).", "pronomes")
ch(12, 0, SG, "Eu te ligo amanhã.", ["Te llamo mañana.", "Llamame mañana.", "Me llamo mañana."],
   "Te llamo mañana.",
   "te ligo = te llamo (yo a vos). Mirá el sujeto: eu.", "pronomes")
ch(12, 0, SG, "Te vejo lá!", ["¡Te veo allá!", "¡Me ves allá!", "¡Nos vemos acá!"],
   "¡Te veo allá!",
   "te vejo = te veo: vejo es eu (yo veo) y te es a vos.", "pronomes")
ch(12, 0, SG, "Me dá uma ajuda?", ["¿Me das una mano?", "¿Te doy una mano?", "¿Le das una mano?"],
   "¿Me das una mano?",
   "En el habla, el pronombre va delante del verbo: me dá es «me das», vos a mí. Y dar uma ajuda es dar una mano.", "pronomes")

# ------------------------------------------- jefe: dos o tres reglas a la vez
tr(13, 2, "El hermano de ella vino ayer en colectivo y trajo dos panes.",
   _x(["O irmão dela veio ontem de ônibus", "O irmão dela veio de ônibus ontem",
       "Ontem o irmão dela veio de ônibus"], " e trouxe dois pães."),
   "Tres reglas: dele / dela para «de él / de ella»; perfeito irregular (veio, trouxe) y de + transporte; plural -ão → -ães (pães).",
   "jefe")
_J2 = [("a gente foi", "viu"), ("fomos", "vimos"), ("nós fomos", "vimos")]
tr(13, 2, "Ayer fuimos a la playa de Ipanema y vimos a João.",
   # «Ontem» adelante con à / para a / pra y con o sin artículo ante João;
   # «ontem» al final de la primera parte, con la forma principal.
   ["Ontem %s %s praia de Ipanema e %s o João." % (su, d, v)
      for d in ("à", "para a", "pra") for su, v in _J2]
   + ["Ontem %s à praia de Ipanema e %s João." % (su, v) for su, v in _J2]
   + ["%s à praia de Ipanema ontem e %s o João." % (su[0].upper() + su[1:], v) for su, v in _J2],
   "a gente + verbo en singular (foi, viu); a + a = à (en el habla, pra praia); y sin «a» personal: vi o João.",
   "jefe")
tr(13, 2, "Mis amigas argentinas están muy cansadas: van a dormir en el hotel.",
   _x(["Minhas", "As minhas"], " amigas argentinas estão muito cansadas", [": vão", " e vão"], " dormir no hotel."),
   "muito ante adjetivo no cambia (muito cansadas); el adjetivo sí concuerda (argentinas, cansadas); ir + infinitivo sin «a»; em + o = no.",
   "jefe")
