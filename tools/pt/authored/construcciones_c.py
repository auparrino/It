# -*- coding: utf-8 -*-
"""Contestar, preguntar y decir «nosotros» a la brasileña (plan 2026-10,
Tanda 1, portugués): ítems de producción espaciados (prefijo cx-c-).

Tres hilos del plan auditorias/PLAN-2026-10-propuestas.md:

1. Contestar y preguntar a la brasileña (5, 8, 11, 14, 20 y 38, con repaso
   en 27, 33 y 46): la respuesta con el verbo repetido (*—Vem? —Venho.*),
   la negación al final (*não sei não*, *sei não*), la pregunta con
   «é que» (*onde é que…?*) y *pois é / pois não*.  Respuesta escrita, no
   de opción múltiple (salvo un reconocimiento de *pois não*).
2. «A gente se / da gente» y el sujeto explícito (5, 10, 12, 15, 16, 23,
   27 y 38): *a gente se vê* (nunca «a gente nos vemos»), *a casa da
   gente*, *pra gente*, y el pronombre sujeto que en Brasil se dice porque
   *fala, morava, disse* no dicen quién.
3. Los ítems sueltos del duelo «chegue o chegar» (30, 39, 47 y 51): dos
   huecos con el mismo verbo, uno con disparador de presente do subjuntivo
   (*espero que, talvez, é importante que*) y otro de futuro do subjuntivo
   (*quando, se, assim que*).  El duelo está en docs/lang/pt/duelli_data.js.

Cada ítem va en una semana en la que su gramática ya se explicó; cuando
algo llega antes que su bloque (la respuesta con el verbo antes de la 20,
«é que» que ninguna lección explica), la nota lo dice y lo explica.
Respuestas de dos huecos: «a | b».
"""
import itertools

TR = "Traducí al portugués."
TRC = "Traducí al portugués coloquial de Brasil."
CO = "Completá con la forma correcta del verbo entre paréntesis."
CH = "Completá como en el habla de Brasil."
DLG = "Completá el diálogo."
FX = "Encontrá el error: tocá lo que está mal y corregilo."
EL = "Elegí la respuesta adecuada."

ITEMS = []
_N = {}


def _level(w):
    return "A1" if w <= 8 else "A2" if w <= 16 else "B1" if w <= 27 else "B2" if w <= 40 else "C1"


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


def _add(w, part, typ, prompt, stem, answer, note, alt=None, topic="", **extra):
    _N[w] = _N.get(w, 0) + 1
    # una respuesta corta con coma termina en punto: si no, engine.js la
    # parte en palabras sueltas y aceptaría «sim» o «não» solos
    dot = lambda a: a + "." if (typ != "choice" and "," in a
                                and not a.endswith((".", "!", "?", "…"))) else a
    answer = dot(answer)
    seen, alts = {answer.rstrip(".?!")}, []
    for a in map(dot, alt or []):
        k = a.rstrip(".?!")
        if a and k not in seen:
            seen.add(k)
            alts.append(a)
    d = dict(id="cx-c-%d-%02d" % (w, _N[w]), w=w, part=part, level=_level(w), type=typ,
             topic=topic, prompt=prompt, stem=stem, answer=answer, alt=alts, note=note)
    d.update(extra)
    ITEMS.append(d)
    return d


T_RESP = "contestar a la brasileña"
T_GENTE = "a gente y el sujeto explícito"
T_DUELO = "presente o futuro do subjuntivo"


def tr(w, part, stem, variants, note, topic=T_RESP, prompt=TR):
    extra = dict(registro="formal") if "formal" in prompt else {}
    return _add(w, part, "translate", prompt, stem, variants[0], note, variants[1:], topic, **extra)


def cl(w, part, stem, answer, note, alt=None, topic=T_RESP, prompt=DLG):
    return _add(w, part, "cloze", prompt, stem, answer, note, alt, topic)


def ch(w, part, stem, options, answer, note, topic=T_RESP, prompt=EL):
    return _add(w, part, "choice", prompt, stem, answer, note, None, topic, options=options)


def fx(w, part, stem, bad, good, cat, note, topic=T_GENTE, prompt=FX):
    assert stem.count(bad) == 1, (stem, bad)
    return _add(w, part, "fixerr", prompt, stem, stem.replace(bad, good, 1), note, None, topic,
                bad=bad, good=good, cat=cat)


SI_VERBO = ("En Brasil casi nunca se contesta solo «sim»: se repite el verbo, conjugado para "
            "quien contesta. ")
REGLA_20 = " Lo vas a ver entero en la semana 20; por ahora, imitalo."


# ===========================================================================
# Semana 5 · Presente regular (0 conjugaciones · 1 pronombre sujeto · 2 rutina)
# ===========================================================================
W = 5
cl(W, 0, "— Você mora no Rio? — ___. (que sí, con el verbo)", "Moro",
   SI_VERBO + "A *você mora?* se contesta *moro* (eu): el verbo cambia de persona, de "
   "*você* a *eu*. *Sim* solo suena seco o cortante." + REGLA_20,
   _x(["Moro", "Eu moro"], ["", ", sim", " sim"]) + ["Sim, moro", "Sim, eu moro"])
cl(W, 0, "— Vocês trabalham no sábado? — ___. (que sí, con el verbo; contestás por los dos)",
   "Trabalhamos",
   "La respuesta repite el verbo en la persona de quien contesta: a *vocês trabalham?* se "
   "responde *trabalhamos* (nós) o, en el habla, *a gente trabalha* (tercera del singular, "
   "nunca «a gente trabalhamos»)." + REGLA_20,
   _x(["Trabalhamos", "Nós trabalhamos", "A gente trabalha"], ["", ", sim", " sim"]))
cl(W, 2, "— Você fala inglês? — ___. (que no, con el verbo)", "Não falo",
   "Para negar también se usa el verbo: *não falo*, no un «não» suelto ni «no». En el habla "
   "también se oye *falo não* o *não falo não*, con el *não* al final (semana 20).",
   ["Não falo, não", "Não falo não", "Falo não", "Eu não falo"])
ch(W, 1, "«Fala português muito bem.» Sin más contexto, ¿quién habla portugués?",
   ["No se sabe: él, ella, vos o nosotros (a gente)", "Él", "Vos"],
   "No se sabe: él, ella, vos o nosotros (a gente)",
   "*fala* sirve para *ele, ela, você* y *a gente*: cuatro sujetos con la misma forma. Por eso "
   "en Brasil el sujeto se dice (*ela fala, você fala*) mucho más que en castellano, donde "
   "«hablás» ya dice quién.",
   topic=T_GENTE)
tr(W, 1, "¿Trabajás en el centro y estudiás de noche? (dejá claro que es vos)",
   _x(["Você trabalha no centro e "], ["", "você "], "estuda ", ["à noite", "de noite"], "?"),
   "*Trabalha* y *estuda* solos pueden ser *ele, ela* o *você*: en Brasil el sujeto se dice, "
   "*você trabalha*. Ojo con la persona: *você* va con el verbo en tercera, nunca «você "
   "trabalhas».",
   topic=T_GENTE)


# ===========================================================================
# Semana 6 · Irregulares e invitaciones
# ===========================================================================
cl(6, 2, "— Você pode vir no sábado? — ___! (que sí, con el verbo)", "Posso",
   "A *você pode?* se contesta *posso*: el verbo de la pregunta en tu persona, y en *eu* "
   "*poder* es irregular (*posso*, no «podo»). Para aceptar una invitación alcanza con eso; "
   "*claro!* le suma ganas." + REGLA_20,
   _x(["Posso", "Claro, posso", "Eu posso"], ["", ", sim", " sim"]))


# ===========================================================================
# Semana 8 · Preguntas, ir + infinitivo, estar + gerúndio
# ===========================================================================
W = 8
E_QUE = ("En el habla, después de la palabra de pregunta va *é que*: *onde é que…?, o que é "
         "que…?* Es un relleno que no se traduce, y después va sujeto + verbo, sin invertir. ")
tr(W, 0, "¿Dónde vive Bia? (como se pregunta en el habla, con «é que»)",
   _x("Onde é que a Bia ", ["mora", "vive"], "?"),
   E_QUE + "*Vivir* (en un lugar) es *morar*, y el nombre lleva artículo: *a Bia*.")
tr(W, 0, "¿Qué vas a hacer el sábado? (con «é que»)",
   _x(["O que é que", "Que é que"], " você vai fazer ", ["no sábado", "sábado"], "?"),
   E_QUE + "Nunca «o que vai você fazer»: el sujeto va delante del verbo.")
cl(W, 1, "— Você vai à praia amanhã? — ___. (que sí, con el verbo)", "Vou",
   SI_VERBO + "A *você vai?* se contesta *vou*, aunque la pregunta sea *ir* + infinitivo "
   "(*você vai nadar? — vou*): basta con el auxiliar." + REGLA_20,
   ["Vou, sim", "Vou sim", "Eu vou", "Sim, vou"])
cl(W, 2, "— Você está trabalhando agora? — ___. (que no, con el verbo)", "Não estou",
   "Con *estar* + gerúndio, la respuesta repite solo *estar*: *estou* o *não estou*. En el "
   "habla se recorta: *tô*, *não tô*, *tô não*.",
   ["Não estou, não", "Não estou não", "Estou não", "Não tô", "Tô não", "Não tô não"])


# ===========================================================================
# Semana 10 · Posesivos: «da gente»
# ===========================================================================
W = 10
tr(W, 0, "Nuestra casa queda cerca de la playa. (en el habla, con «a gente»)",
   _x("A casa da gente ", ["fica", "é"], " perto da praia"),
   "Si «nosotros» es *a gente*, «nuestro» es *da gente* (de + a gente), detrás del sustantivo: "
   "*a casa da gente*. Es del habla; lo neutro es *a nossa casa*. Nunca «a casa de a gente».",
   topic=T_GENTE)


# ===========================================================================
# Semana 11 · Pretérito perfeito (0 regulares · 1 irregulares · 2 comi = he comido)
# ===========================================================================
W = 11
cl(W, 2, "— Você já almoçou? — ___. (que sí, con el verbo)", "Já almocei",
   "Se contesta con el verbo: *já almocei* (o solo *já*, que alcanza). Fijate en la grafía: "
   "*almoçar → almocei* (ç ante e se escribe c). Y «¿ya almorzaste?» va en perfeito, nunca "
   "«tenho almoçado».",
   ["Já", "Almocei", "Já almocei, sim", "Já almocei sim", "Sim, já almocei"])
cl(W, 2, "— Vocês gostaram do show? — ___! (que sí, contestás por los dos)", "Gostamos",
   "A *vocês gostaram?* se contesta *gostamos* (nós) o *a gente gostou*: repetís *gostar* en tu "
   "persona. «Nos gustó» no es «nos gostou»: el que siente el gusto es el sujeto.",
   _x(["Gostamos", "A gente gostou"], ["", " muito", ", sim", " sim"]))
tr(W, 1, "¿Cuándo llegaste? (con «é que» o «foi que», como en el habla)",
   ["Quando é que você chegou?", "Quando foi que você chegou?", "Quando é que cê chegou?"],
   "En pasado, la pregunta del habla admite *é que* y también *foi que*: *quando foi que você "
   "chegou?* Las dos son relleno; el orden sigue siendo sujeto + verbo.")


# ===========================================================================
# Semana 12 · Reflexivos: «a gente se»
# ===========================================================================
W = 12
NOS = ("Con *a gente* el verbo va en tercera del singular, y el reflexivo también: *a gente "
       "se* + verbo. «A gente nos…» mezcla dos personas: es el calco de «nos». ")
tr(W, 1, "Nos vimos ayer en la playa.",
   _x(["A gente se viu", "Nós nos vimos"], [" ontem na praia", " na praia ontem"]),
   NOS + "*A gente se viu* (ver en perfeito, tercera) o, más formal, *nós nos vimos*.",
   topic=T_GENTE)
fx(W, 1, "A gente nos vemos amanhã, tá?", "nos vemos", "se vê", "pronome",
   NOS + "Se corrigen las dos palabras: *a gente se vê amanhã*. Con *nós*, en cambio, "
   "*nós nos vemos*.")
tr(W, 1, "Nos encontramos a las ocho, ¿dale?",
   _x(["A gente se encontra", "Nós nos encontramos"], " às oito, ",
      ["combinado", "tá", "tá bom", "pode ser", "beleza", "ok"], "?"),
   NOS + "*Encontrar-se* (verse con alguien) va con *se*: *a gente se encontra*. «¿Dale?» al "
   "final de un plan es *combinado?* o *tá?*.",
   topic=T_GENTE)
tr(W, 1, "Bia dijo que viene. (dejá claro que viene ella)",
   _x(["A Bia disse", "Bia disse"], " que ela vem"),
   "*Disse que vem* no dice quién viene: puede ser ella, él, vos o nosotros. El brasileño "
   "repite el sujeto en la subordinada: *a Bia disse que ela vem*. En castellano «ella» "
   "sobraría; acá aclara.",
   topic=T_GENTE)


# ===========================================================================
# Semana 14 · Gostar de y verbos con preposición
# ===========================================================================
W = 14
cl(W, 0, "— Você gosta de futebol? — ___. (que sí, con el verbo)", "Gosto",
   "Se contesta con el verbo, en la persona de quien habla: *gosto*. Nunca «me gosta», "
   "el calco de «me gusta»: el que siente el gusto es el sujeto.",
   ["Gosto, sim", "Gosto sim", "Gosto muito", "Eu gosto", "Sim, gosto"])
tr(W, 1, "¿Qué necesitás? (con «é que», como en el habla)",
   ["Do que é que você precisa?", "De que é que você precisa?", "O que é que você precisa?",
    "Do que é que cê precisa?"],
   "*Precisar de* lleva su preposición también en la pregunta, y va adelante de todo: *do que "
   "é que você precisa?* En el habla se oye *o que é que você precisa?*, sin el *de*; en lo "
   "escrito, con *de*.")
cl(W, 1, "— Você precisa de ajuda? — ___. (que no, con el verbo)", "Não preciso",
   "La negación se arma con el verbo: *não preciso*, sin el *de*, porque no hay objeto. En el "
   "habla se oye *preciso não* o *não preciso não* (semana 20). «Gracias» se puede sumar: "
   "*não preciso, obrigado*.",
   _x(["Não preciso", "Não preciso, não", "Não preciso não", "Preciso não"],
      ["", ", obrigado", ", obrigada"]))


# ===========================================================================
# Semana 15 · Imperfeito: el sujeto que la forma no dice
# ===========================================================================
W = 15
tr(W, 1, "Cuando era chico, vivía en Rosario. (hablás de vos)",
   _x("Quando eu era ", ["criança", "pequeno", "menino", "pequena", "menina"], ", ",
      ["", "eu "], "morava em Rosário") +
   _x("Quando era ", ["criança", "pequeno", "menino", "pequena", "menina"], ", eu morava em Rosário"),
   "En el imperfeito *eu* y *ele* tienen la misma forma (*era, morava*): sin el pronombre, "
   "«quando era criança» puede ser él. Por eso se dice *eu* por lo menos una vez. "
   "Y *Rosário* lleva tilde en portugués.",
   topic=T_GENTE)


# ===========================================================================
# Semana 16 · Pronombres con preposición: «pra gente»
# ===========================================================================
W = 16
tr(W, 2, "Bia nos llamó ayer. (en el habla, con «a gente»)",
   _x(["A Bia", "Bia"], " ligou ", ["pra gente", "para a gente"], " ontem") +
   _x(["A Bia", "Bia"], " ligou ontem ", ["pra gente", "para a gente"]),
   "En el habla, «nos» (objeto) también es *a gente*, con la preposición del verbo: *ligar "
   "para alguém* → *ligou pra gente*. Nunca «a gente» delante del verbo como «nos»: «a Bia a "
   "gente ligou» no existe. Lo neutro es *a Bia nos ligou*.",
   topic=T_GENTE)


# ===========================================================================
# Semana 18 · Cortesía en el restaurante: «pois não» = cómo no
# ===========================================================================
cl(18, 1, "— Garçom, a conta, por favor. — ___, senhor. Já trago.", "Pois não",
   "Ante un pedido, *pois não* es «¡cómo no!», «enseguida»: dice que sí, aunque tenga *não*. "
   "Es la respuesta típica de quien atiende (mozo, recepción, farmacia).",
   ["Pois não!"])


# ===========================================================================
# Semana 20 · Negación y reacciones (1 negar · 2 pois é)
# ===========================================================================
W = 20
tr(W, 1, "No sé, no. (como en Río, con el «não» al final)",
   ["Não sei não", "Sei não", "Não sei, não"],
   "La negación brasileña del habla repite el *não* al final (*não sei não*) o lo deja solo al "
   "final (*sei não*). No es enfática como el «no sé, no» rioplatense: es la manera normal de "
   "negar charlando.")
tr(W, 1, "No me gustó, no. (habla)",
   ["Não gostei não", "Gostei não", "Não gostei, não"],
   "*Não gostei não*: la persona es el sujeto (*gostei*, no «me gostou») y la negación va "
   "adelante y al final. En un texto escrito, solo *não gostei*.")
cl(W, 2, "— Que calor, hein? — ___, e amanhã vai ser pior. (le das la razón)", "Pois é",
   "*Pois é* es «y sí», «así es»: para dar la razón o llenar la pausa. No lo confundas con "
   "*pois não*, que es «¿en qué lo ayudo?» o «¡cómo no!».",
   ["Pois é…"])
ch(W, 2, "Entrás a una farmacia y la empleada te dice: «Pois não?». ¿Qué te está diciendo?",
   ["¿Qué desea?", "Pues no.", "¿No va a comprar nada?"],
   "¿Qué desea?",
   "*Pois não?* con tono de pregunta es la fórmula de quien atiende: «¿qué desea?». Como "
   "respuesta a un pedido es «¡cómo no!», o sea, sí. No niega nada, aunque tenga *não*.")


# ===========================================================================
# Semana 23 · Subjuntivo: a gente + subjuntivo
# ===========================================================================
W = 23
tr(W, 1, "Espero que nos veamos pronto.",
   _x(["Espero que a gente se veja", "Espero que nos vejamos"], [" logo", " em breve"]),
   "Con *a gente* el subjuntivo también va en tercera del singular: *que a gente se veja* "
   "(*ver → vejo → veja*). Más formal: *que nos vejamos*. Nunca «que a gente nos vejamos».",
   topic=T_GENTE)


# ===========================================================================
# Semana 24 · Dudar: será que, sei lá (repaso de la negación al final)
# ===========================================================================
cl(24, 3, "— Será que vai chover amanhã? — ___. (no sé, con el «não» al final)", "Sei não",
   "*Sei não* o *não sei não*: la negación del habla al final, que viste en la 20. *Sei lá* "
   "(qué sé yo) también sirve como reacción, pero acá se pide la del *não*.",
   ["Não sei não", "Não sei, não"])


# ===========================================================================
# Semana 27 · Futuro do subjuntivo (repaso)
# ===========================================================================
W = 27
cl(W, 2, "— Se der, você vem amanhã? — ___. (que sí, con el verbo)", "Venho",
   "A *você vem?* se contesta *venho* (vir, eu): el verbo de la pregunta, en tu persona. "
   "*Venho* solo ya dice que sí; el «sim» de más no hace falta.",
   ["Venho, sim", "Venho sim", "Eu venho", "Sim, venho"], prompt=CH)
tr(W, 1, "Cuando nos veamos, te cuento.",
   _x(["Quando a gente se vir, ", "Quando nos virmos, "], ["eu te conto", "te conto"]) +
   _x(["Eu te conto", "Te conto"], [" quando a gente se vir", " quando nos virmos"]),
   "«Cuando nos veamos» es futuro: futuro do subjuntivo de *ver* (*viram → vir*), con *a "
   "gente* en tercera: *quando a gente se vir*. No «se veja» (presente) ni «se ver» (que "
   "sería el infinitivo): la trampa de ver / vir de esta semana.",
   topic=T_GENTE)


# ===========================================================================
# Ítems sueltos del duelo «chegue o chegar» (30, 39, 47, 51)
# ===========================================================================
DUO = (" Mismo verbo, otro disparador: lo que decide es la palabra de adelante, no lo que "
       "diría el castellano.")
cl(30, 1, "Espero que vocês ___ (chegar) bem. / Quando vocês ___ (chegar), me liguem.",
   "cheguem | chegarem",
   "*Esperar que* pide presente do subjuntivo: *cheguem* (deseo). *Quando* + algo que todavía "
   "no pasó pide futuro do subjuntivo: *chegarem*." + DUO,
   topic=T_DUELO, prompt=CO)
cl(39, 0, "Talvez ele ___ (vir) amanhã. / Se ele ___ (vir) amanhã, a gente sai.",
   "venha | vier",
   "*Talvez* (duda) lleva presente do subjuntivo: *venha*. *Se* con una condición futura lleva "
   "futuro do subjuntivo: *vier* (*vieram → vier*). Nunca «se ele venha»." + DUO,
   topic=T_DUELO, prompt=CO)
cl(47, 1, "Ainda que a empresa ___ (manter) os prazos, a qualidade precisa melhorar. / Se a empresa "
          "___ (manter) os prazos, renovaremos o contrato.",
   "mantenha | mantiver",
   "*Ainda que* (concesión) lleva presente do subjuntivo: *mantenha*, como *tenha*. *Se* + "
   "condición futura, futuro do subjuntivo: *mantiver*, como *tiver* (*mantiveram → mantiver*)."
   + DUO,
   topic=T_DUELO, prompt=CO)
cl(51, 0, "Duvido que ela ___ (fazer) isso. / Se ela ___ (fazer) isso, vai se arrepender.",
   "faça | fizer",
   "*Duvidar que* (duda) pide presente do subjuntivo: *faça*. *Se* con algo que puede pasar "
   "después, futuro do subjuntivo: *fizer* (*fizeram → fizer*)." + DUO,
   topic=T_DUELO, prompt=CO)


# ===========================================================================
# Semana 32 · Sujeto indeterminado y el habla: a gente se
# ===========================================================================
tr(32, 1, "Acá nos levantamos temprano.",
   _x("Aqui a gente ", ["se levanta", "acorda"], " cedo") +
   _x("A gente ", ["se levanta", "acorda"], " cedo aqui"),
   NOS + "En el habla, el «nosotros» de costumbre es *a gente*: *aqui a gente se levanta "
   "cedo*. *Acordar* (despertarse) va sin *se* en Brasil.",
   topic=T_GENTE, prompt=TRC)


# ===========================================================================
# Semana 33 · Colocação pronominal: lo escrito y lo hablado (repaso)
# ===========================================================================
W = 33
cl(W, 2, "— Você já leu o livro que eu te emprestei? — ___. (que sí, como se habla)", "Já li",
   "Al hablar se contesta con el verbo solo, sin pronombre: *já li* (objeto nulo). En lo "
   "escrito sería *já o li*; «li-o» en una charla suena a texto escrito. *Já* solo también alcanza.",
   ["Li", "Já", "Já li, sim", "Já li sim", "Li, sim"], prompt=CH)


# ===========================================================================
# Semana 38 · Português falado (0 reacciones · 2 pronombres del habla)
# ===========================================================================
W = 38
cl(W, 0, "— Cê vai na festa hoje? — ___. Tô morto de cansaço. (que no, con el «não» al final)",
   "Vou não",
   "*Vou não* (o *não vou não*): la negación al final, típica del habla de Río y del Nordeste. "
   "Se contesta con el verbo de la pregunta (*vai → vou*), nunca con un «não» suelto.",
   ["Não vou não", "Não vou, não"], prompt=CH)
cl(W, 0, "— Garçom, por favor! — ___, senhor? (te atiende)", "Pois não",
   "*Pois não?* es lo que dice quien atiende: «¿qué desea?», «¿en qué lo ayudo?». No niega "
   "nada. *Pois é*, en cambio, es «y sí, así es».",
   ["Pois não…"], prompt=CH)
tr(W, 0, "¿Qué es lo que pasó? (con «é que», como en el habla)",
   ["O que é que aconteceu?", "Que é que aconteceu?", "O que foi que aconteceu?",
    "Que que aconteceu?", "O que que aconteceu?", "O que é que houve?", "O que foi que houve?"],
   "La pregunta del habla mete *é que* o *foi que* después de la palabra interrogativa: *o que "
   "é que aconteceu?* Rápido se reduce a *que que aconteceu?* Lo que no va es «o que é o que».",
   prompt=TRC)
ch(W, 2, "«Disse que vai.» Sin más contexto, ¿quién va?",
   ["No se sabe: él, ella, vos o nosotros (a gente)", "Él", "Vos"],
   "No se sabe: él, ella, vos o nosotros (a gente)",
   "*Vai* es la forma de *ele, ela, você* y *a gente*: sin pronombre, nadie sabe quién va. Por "
   "eso el brasileño dice *ele disse que ela vai*: el sujeto que el castellano calla, el "
   "portugués lo necesita.",
   topic=T_GENTE)
tr(W, 2, "¿Nos vemos después del laburo?",
   _x(["A gente se vê", "A gente se encontra", "Nos vemos"], " depois do ",
      ["trabalho", "serviço", "expediente"], "?"),
   NOS + "En el habla, *a gente se vê depois do trabalho?* «Laburo» se dice *trabalho* o "
   "*serviço* (*trampo*, en São Paulo).",
   topic=T_GENTE, prompt=TRC)
fx(W, 2, "Bora, a gente nos falamos amanhã.", "nos falamos", "se fala", "pronome",
   NOS + "*A gente se fala* (hablamos después) es una despedida de todos los días: verbo y "
   "reflexivo en tercera, *se fala*.")


# ===========================================================================
# Semana 46 · Brasil y Portugal (repaso)
# ===========================================================================
W = 46
tr(W, 0, "¿Qué es lo que querés hacer? (como en Brasil, con «é que»)",
   _x(["O que é que", "Que é que"], " você quer fazer?"),
   "*O que é que você quer fazer?* El *é que* de la pregunta existe en los dos lados del "
   "Atlántico; lo que cambia es la persona: en Portugal, *o que é que tu queres fazer?*, con "
   "*tu* y su verbo en segunda.")


# ===========================================================================
# Semana 49 · Registro: a gente → nós en lo formal
# ===========================================================================
tr(49, 0, "Nos reunimos el lunes para revisar el informe. (en un acta)",
   _x(["Nós nos reunimos", "Reunimo-nos"], [" na segunda-feira", " segunda-feira"],
      " para ", ["revisar", "revisarmos"], " o relatório"),
   "En un texto formal, *a gente se reuniu* pasa a *nós nos reunimos* o, con ênclise, "
   "*reunimo-nos* (la *-s* de *reunimos* se cae ante *-nos*). *Reunimos* sirve para presente "
   "y para pasado, como en castellano.",
   topic=T_GENTE, prompt="Traducí al portugués formal.")
