# -*- coding: utf-8 -*-
"""Auditoría de gramática, área 0 del portugués (verbo): ítems de producción
espaciados para los puntos «mejorable» y «flojo» (prefijo gr0-).

Seis hilos, cada uno vuelve en 2-4 semanas posteriores:

  - ubicar con ficar / ser / estar (lección 1, regla unificada): 1, 3, 4 y 9;
  - presente sin diptongo y con cambio en eu (consigo, sigo, sinto, sirvo,
    repito; lección 6): 6, 12, 13 y 23;
  - imperativo del habla con el pronombre adelante (me passa, me liga;
    lección 12): 12, 24 y 38;
  - perífrasis: começar a, parar / deixar de, continuar + gerúndio, voltar
    a, costumar (lección 15, bloque nuevo): 15, 21, 26 y 33;
  - ficar = ponerse / quedarse, y ficar + gerúndio (lección 15, bloque
    nuevo, y tabla de la 22): 15, 22, 26 y 38;
  - mais-que-perfeito simples para reconocer al leer (fizera = tinha
    feito): 42, 48 y 49.

Cada ítem va en una semana en la que su gramática ya se explicó; «part» es
la parte de la lección de esa semana.  Respuestas de dos huecos: «a | b».
"""
import itertools

TR = "Traducí al portugués."
TRF = "Traducí al portugués formal."
TRC = "Traducí al portugués coloquial de Brasil."
CO = "Completá con la forma correcta del verbo entre paréntesis."
CE = "Elegí la forma correcta."
FX = "Encontrá el error: tocá la palabra que está mal y corregila."
HB = "Completá como en el habla de Brasil."
SG = "Elegí el significado."
EQ = "Elegí la equivalencia."

UB = "ubicar: ficar, ser, estar"
AV = "presente: consigo, sigo, sinto, sirvo"
IM = "imperativo del habla: me passa, me liga"
PF = "perífrasis: começar a, parar de, continuar"
FI = "ficar: ponerse, quedarse"
MQ = "mais-que-perfeito simples (lectura)"

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
    seen = {answer}
    alts = []
    for a in alt or []:
        if a not in seen:
            seen.add(a)
            alts.append(a)
    d = dict(id="gr0-%d-%02d" % (w, _N[w]), w=w, part=part, level=_level(w),
             type=typ, topic=topic, prompt=prompt, stem=stem, answer=answer,
             alt=alts, note=note)
    d.update(extra)
    ITEMS.append(d)
    return d


def tr(w, p, topic, stem, variants, note, prompt=TR):
    extra = dict(registro="formal") if prompt == TRF else {}
    return _add(w, p, "translate", prompt, stem, variants[0], note, variants[1:], topic=topic, **extra)


def cl(w, p, topic, stem, answer, note, alt=None, prompt=CO):
    assert "___" in stem
    return _add(w, p, "cloze", prompt, stem, answer, note, alt, topic=topic)


def ch(w, p, topic, stem, options, answer, note, prompt=CE):
    assert answer in options and len(set(options)) == len(options)
    return _add(w, p, "choice", prompt, stem, answer, note, topic=topic, options=list(options))


def fx(w, p, topic, stem, bad, good, cat, note, goodAlt=None):
    assert stem.count(bad) == 1, (stem, bad)
    extra = dict(bad=bad, good=good, cat=cat)
    if goodAlt:
        extra["goodAlt"] = list(goodAlt)
    return _add(w, p, "fixerr", FX, stem, stem.replace(bad, good, 1), note,
                [stem.replace(bad, g, 1) for g in goodAlt or []], topic=topic, **extra)


# ===========================================================================
# Ubicar: lugar fijo → ficar; evento → ser; persona → estar
# ===========================================================================
ch(1, 2, UB, "Onde ___ o hotel?", ["fica", "queda", "tem"], "fica",
   "«¿Dónde queda?» = *onde fica?*: para lo que no se mueve, *ficar* es lo más seguro (*é* y *está* "
   "también se oyen). «Queda» no existe en este sentido: es calco del castellano.")
ch(1, 2, UB, "O show ___ amanhã, em Ipanema.", ["é", "está", "fica"], "é",
   "Un evento (un show, una fiesta, una clase) se ubica con *ser*: *o show é amanhã*. *Está* es para "
   "personas y cosas que se mueven; *fica*, para lugares fijos.")
ch(1, 2, UB, "A Bia ___ em Ipanema agora, com o João.", ["está", "é", "fica"], "está",
   "Una persona se mueve: dónde está ahora va con *estar*. *A Bia fica em Ipanema* sería «se queda "
   "en Ipanema», y *é em Ipanema* no se dice de una persona.")
cl(1, 2, UB, "Eu ___ em Copacabana, mas o apartamento ___ em Botafogo.", "estou | fica",
   "Vos te movés: *estou em Copacabana*. El departamento no se mueve: *fica em Botafogo* (lo más "
   "seguro; *é* o *está* también se oyen). Es la regla: persona, *estar*; lugar fijo, *ficar*.",
   alt=["estou | é", "estou | está"], prompt="Completá con estar o ficar.")
tr(1, 2, UB, "¿Dónde queda el hotel?",
   ["Onde fica o hotel?", "Onde é o hotel?", "Onde está o hotel?"],
   "«Quedar» (ubicación) es *ficar*: *onde fica o hotel?* También se dice *onde é* u *onde está*. "
   "«Onde queda» no: *quedar* casi no se usa en Brasil.")

tr(3, 2, UB, "¿Dónde queda la estación?",
   ["Onde fica a estação?", "Onde é a estação?", "Onde está a estação?"],
   "Lugar fijo → *ficar*: *onde fica a estação?* (*é* y *está* también valen). Nunca «queda». Y "
   "-ción → -ção: *estação*.")
tr(3, 2, UB, "La fiesta es en la casa de Bia.",
   _x("A festa ", ["é", "vai ser"], " na casa da Bia"),
   "Un evento se ubica con *ser*: *a festa é na casa da Bia*, no «está». Y *em + a* = *na*, *de + a* "
   "= *da*: el artículo va también delante del nombre (*a Bia*).")
cl(3, 2, UB, "O mercado ___ perto da praia, e a Bia ___ lá agora.", "fica | está",
   "El mercado no se mueve: *fica perto da praia* (*é* o *está* también se oyen). La Bia sí: *está lá "
   "agora*.", alt=["é | está", "está | está"], prompt="Completá con estar o ficar.")

ch(4, 2, UB, "A reunião ___ no escritório do João.", ["é", "está", "fica"], "é",
   "La reunión es un evento: *é no escritório*, como «la reunión es en…». *Está* es para personas y "
   "*fica*, para lugares fijos. *Escritório* = oficina; *oficina* es el taller.")
fx(4, 2, UB, "O Martín é na praia com a Bia.", "é", "está", "espanol",
   "Una persona se ubica con *estar*: *o Martín está na praia*. *Ser* es para eventos (*a festa é na "
   "praia*) y *ficar* para lugares fijos (*a praia fica perto*).")

tr(9, 2, UB, "El museo queda lejos del centro; el show es en la playa.",
   _x("O museu ", ["fica", "é", "está"], " longe do centro", [";", ","], " o show é na praia")
   + _x("O museu ", ["fica", "é", "está"], " longe do centro e o show é na praia"),
   "Lugar fijo, *ficar*: *o museu fica longe*; evento, *ser*: *o show é na praia*. *Longe de + o* = "
   "*longe do*, *em + a* = *na*.")
cl(9, 2, UB, "A farmácia ___ na esquina, mas o farmacêutico ___ de férias.", "fica | está",
   "La farmacia no se mueve: *fica na esquina* (lo más seguro; *é* también se oye). El farmacéutico "
   "es una persona y su situación de ahora: *está de férias*.", alt=["é | está", "está | está"],
   prompt="Completá con estar o ficar.")


# ===========================================================================
# Presente: el cambio de vocal solo en eu (consigo, sigo, sinto, sirvo)
# ===========================================================================
cl(6, 2, AV, "Não ___ (conseguir) dormir com esse calor.", "consigo",
   "*conseguir* cambia la vocal solo en *eu*: *consigo*, pero *consegue*, *conseguem*. Y «no puedo "
   "dormir» (no me sale) se dice con *conseguir*: *não consigo*.")
cl(6, 2, AV, "Eu ___ (seguir) você no Instagram, mas você não me segue.", "sigo",
   "*seguir*: *eu sigo*, *você segue*. La *e* pasa a *i* solo en *eu*; en las demás personas queda "
   "*e*, sin diptongo («sigue» es castellano).")
cl(6, 2, AV, "Eu ___ (sentir) muita saudade de Buenos Aires.", "sinto",
   "*sentir*: *eu sinto*, *ele sente*. Ojo: *sento* es de *sentar* (me siento en la silla). «Siento» "
   "con diptongo no existe.")
fx(6, 2, AV, "No inverno eu sento muito frio.", "sento", "sinto", "verbo_irregular",
   "«Siento frío» es *sinto frio* (de *sentir*). *Sento* es de *sentar*: *eu me sento aqui* (me "
   "siento acá).")
ch(6, 2, AV, "Ela sempre ___ a mesma pergunta.", ["repete", "repite", "repita"], "repete",
   "*repetir* cambia solo en *eu* (*repito*); *ela repete*, con *e*. «Repite» es castellano y "
   "*repita* es imperativo o subjuntivo.")
cl(6, 2, AV, "Nos fins de semana eu trabalho num bar: ___ (servir) as mesas.", "sirvo",
   "*servir*: *eu sirvo*, *ele serve*. Como *vestir* (*visto*) y *repetir* (*repito*): la *e* "
   "cambia a *i* solo en *eu*.")
tr(6, 2, AV, "No consigo abrir la puerta.",
   _x(["Não consigo", "Eu não consigo"], " abrir a porta"),
   "*conseguir* en *eu*: *consigo* (la *e* pasa a *i*). Nada de «consego»: el cambio va solo en *eu*, "
   "y se escribe con *i*. Y *porta* sin diptongo («puerta»).")

cl(12, 1, AV, "De manhã eu tomo banho, me ___ (vestir) e saio correndo.", "visto",
   "*vestir*: *eu me visto*, *ele se veste*. La *e* cambia a *i* solo en *eu*, igual que *sinto*, "
   "*sigo*, *sirvo*. Y el pronombre, adelante: *me visto*.")
cl(12, 1, AV, "Durante a semana eu ___ (dormir) pouco, mas no sábado fico na cama até meio-dia.", "durmo",
   "*dormir*: *eu durmo* (con *u*), *ele dorme* (con *o*). Sin el diptongo del castellano «duermo».")

fx(13, 1, AV, "Eu não consego entender o que ele diz.", "consego", "consigo", "verbo_irregular",
   "*conseguir* en *eu*: *consigo*, con *i*. «Consego» mezcla la *e* de *consegue* con la *-o* de "
   "*eu*. Lo mismo pasa con *sigo* y *sinto*.")
tr(13, 1, AV, "La sigo a Bia y ella me sigue a mí.",
   _x(["Eu sigo", "Sigo"], " a Bia e ela me segue"),
   "*seguir*: *eu sigo*, *ela segue*. Sin «a» personal (*sigo a Bia*: la *a* es el artículo) y sin "
   "el «a mí» que duplica: *ela me segue*.")

cl(23, 0, AV, "Tomara que eu ___ (conseguir) a vaga.", "consiga",
   "El subjuntivo sale del *eu* del presente: *consigo → consiga*. Por eso la *i* sigue en todas "
   "las personas: *que você consiga*, *que eles consigam*.")
cl(23, 0, AV, "É importante que vocês ___ (seguir) as instruções.", "sigam",
   "*sigo → siga, sigam*: el subjuntivo hereda la *i* del *eu*. «Sigan» con *n* es castellano.")
cl(23, 0, AV, "É melhor que o garçom ___ (servir) primeiro as crianças.", "sirva",
   "*sirvo → sirva*: la *i* del *eu* pasa a todo el subjuntivo. Igual *durma*, *sinta*, *vista*.")


# ===========================================================================
# Imperativo del habla: forma de 3.ª y el pronombre adelante
# ===========================================================================
cl(12, 0, IM, "Fale com ela. → (con amigos) ___ com ela.", "Fala",
   "Al hablar, el imperativo de *você* es igual a la 3.ª del presente: *fala!* *Fale* es lo escrito "
   "o formal.", prompt=HB)
cl(12, 0, IM, "Não faça isso! → (con amigos) Não ___ isso!", "faz",
   "En el habla, la orden negativa también va con la forma de *ele*: *não faz isso!* *Não faça* es lo "
   "escrito. «Não faças», con -s, no se oye en Brasil.", prompt=HB)
tr(12, 0, IM, "Llamame mañana.",
   ["Me liga amanhã", "Me ligue amanhã", "Liga pra mim amanhã", "Liga para mim amanhã",
    "Ligue pra mim amanhã", "Ligue para mim amanhã"],
   "En el habla, el pronombre va **adelante**: *me liga* (= llamame). El castellano lo pega atrás; "
   "«liga-me» suena a Portugal.", prompt=TRC)
tr(12, 0, IM, "Dame un minuto.",
   ["Me dá um minuto", "Me dê um minuto"],
   "*Me dá* (habla) o *me dê* (escrito), con el pronombre adelante. «Dá-me» es de Portugal o de un "
   "texto muy formal.", prompt=TRC)
fx(12, 0, IM, "Passa-me o sal, por favor!", "Passa-me", "Me passa", "pronome",
   "Entre amigos, en Brasil: *me passa o sal*. El pronombre va antes del verbo; *passa-me* suena a "
   "Portugal.", goodAlt=["Me passe"])

ch(24, 2, IM, "(a un amigo) ___ devagar, que eu não entendo nada!", ["Fala", "Falá", "Falas"], "Fala",
   "Con un amigo, el imperativo del habla: *fala devagar!* «Falá» es el voseo porteño, que no existe "
   "en portugués; «falas» es la 2.ª del presente, no una orden.", prompt="Elegí la forma que se usa en el habla.")
tr(24, 2, IM, "Ayudame con las valijas.",
   _x(["Me ajuda", "Me ajude"], " com as malas"),
   "Pronombre adelante: *me ajuda* (habla) o *me ajude* (escrito). «Valija» es *mala*.", prompt=TRC)

cl(38, 2, IM, "Envie-me o arquivo. → (entre amigos) ___ o arquivo.", "Me manda",
   "Lo formal pega el pronombre atrás (*envie-me*); el habla lo pone adelante y usa la forma de *ele*: "
   "*me manda o arquivo*.", alt=["Me envia", "Me manda aí"], prompt=HB)
tr(38, 2, IM, "Contame todo.",
   ["Me conta tudo", "Me conte tudo", "Conta tudo pra mim", "Conta tudo para mim"],
   "*Me conta tudo*: forma de *ele* y el pronombre adelante. «Conta-me» suena formal o de Portugal; "
   "y «todo» como pronombre es *tudo*.", prompt=TRC)


# ===========================================================================
# Perífrasis: começar a, parar / deixar de, continuar + gerúndio, voltar a
# ===========================================================================
tr(15, 3, PF, "Dejé de fumar.",
   _x(["Parei", "Eu parei", "Deixei", "Eu deixei"], " de fumar"),
   "«Dejar de» = *parar de* (lo más común al hablar) o *deixar de* + infinitivo: *parei de fumar*. "
   "Sin el *de*, *deixei fumar* es «dejé (permití) fumar».")
tr(15, 3, PF, "Sigo viviendo en Río.",
   _x(["Continuo", "Eu continuo"], [" morando", " a morar"], " no Rio")
   + _x(["Ainda moro", "Eu ainda moro", "Sigo morando", "Eu sigo morando"], " no Rio"),
   "«Seguir + gerundio» → *continuar* + gerúndio: *continuo morando no Rio* (o *ainda moro*). *Sigo "
   "morando* existe, pero suena a castellano; *seguir* es sobre todo ir detrás.")
ch(15, 3, PF, "De repente, a Bia ___ chorar.", ["começou a", "começou de", "começou"], "começou a",
   "*começar a* + infinitivo, como «empezar a»: *começou a chorar*. Sin *a* o con *de* no va.")
fx(15, 3, PF, "Ela continua de trabalhar no mesmo banco.", "de trabalhar", "trabalhando", "regencia",
   "*continuar* + gerúndio: *continua trabalhando* (sigue trabajando). También *continua a trabalhar*, "
   "pero nunca con *de*: el *de* es de *parar de*.", goodAlt=["a trabalhar"])
cl(15, 3, PF, "Quando eu era criança, ___ (costumar) passar o verão em Mar del Plata.", "costumava",
   "«Solía» = *costumava* + infinitivo: la costumbre del pasado va en imperfeito. En presente, "
   "*costumo* (suelo).", alt=["eu costumava"])
cl(15, 3, PF, "Ontem ___ (parar) de chover às seis e a gente saiu.", "parou",
   "*parar de* + infinitivo = dejar de: *parou de chover*. Un hecho puntual del relato → perfeito.")
tr(15, 3, PF, "Volví a estudiar portugués.",
   _x(["Voltei", "Eu voltei"], " a estudar português"),
   "«Volver a» + infinitivo = *voltar a*: *voltei a estudar*. Sin *a*, *voltar* es volver a un lugar.")

tr(21, 1, PF, "Hace un año que dejé de comer carne.",
   _x(["Faz", "Há"], " um ano que ", ["parei", "eu parei", "deixei", "eu deixei"], " de comer carne")
   + _x(["Parei", "Eu parei", "Deixei", "Eu deixei"], " de comer carne ", ["há", "faz"], " um ano"),
   "*parar de* / *deixar de* + infinitivo, en perfeito porque es un hecho: *parei de comer carne*. Y "
   "«hace un año» = *faz / há um ano*.")
fx(21, 1, PF, "Já são dez horas e ele sigue trabalhando.", "sigue", "continua", "espanol",
   "«Sigue trabajando» → *continua trabalhando*. «Sigue» es la grafía del castellano; en portugués "
   "sería *segue*, que se oye en las noticias, pero lo natural es *continuar*.", goodAlt=["segue"])
cl(21, 1, PF, "Faz um mês que eu ___ (voltar) a correr na praia.", "voltei",
   "*voltar a* + infinitivo = volver a: *voltei a correr*. Es un hecho (empezó otra vez), así que "
   "perfeito, no composto.")

tr(26, 0, PF, "Empezó a llover y dejamos de jugar.",
   _x("Começou a chover e ", ["paramos", "nós paramos", "a gente parou", "deixamos", "nós deixamos",
                              "a gente deixou"], " de jogar"),
   "*começar a* y *parar de* / *deixar de* + infinitivo, igual que «empezar a» y «dejar de». «Llover» "
   "va sin sujeto: *começou a chover*.")
cl(26, 0, PF, "Depois do divórcio, ela ___ (voltar) a morar com os pais.", "voltou",
   "*voltar a* + infinitivo: *voltou a morar*. Un hecho del pasado → perfeito.")

tr(33, 2, PF, "A pesar de la crisis, la empresa sigue creciendo.",
   _x(["Apesar da crise", "Mesmo com a crise"], ", a empresa ",
      ["continua crescendo", "continua a crescer", "segue crescendo", "vem crescendo"]),
   "«Seguir + gerundio» → *continuar* + gerúndio (o *continuar a* + infinitivo, más escrito). En la "
   "prensa también *segue crescendo*. *Apesar de + a* = *apesar da*.", prompt=TRF)
ch(33, 2, PF, "Depois do acidente, ele ___ dirigir à noite.", ["deixou de", "deixou", "parou a"], "deixou de",
   "«Dejó de» = *deixou de* (o *parou de*) + infinitivo. Sin *de*, *deixou dirigir* es «dejó "
   "(permitió) manejar». *Parar a* no existe.")


# ===========================================================================
# ficar: ponerse (+ adjetivo), quedarse (lugar), quedarse + gerundio
# ===========================================================================
tr(15, 3, FI, "Me puse triste.",
   _x(["Fiquei", "Eu fiquei"], " triste"),
   "«Ponerse» + adjetivo = *ficar*: *fiquei triste*. «Me pus triste» no existe, y *ficar* va sin "
   "pronombre.")
tr(15, 3, FI, "Me quedé mirando el mar.",
   _x(["Fiquei", "Eu fiquei"], " olhando ", ["o mar", "para o mar", "pro mar"]),
   "«Quedarse + gerundio» = *ficar* + gerúndio: *fiquei olhando o mar*. Sin «me»: *fiquei*, nunca "
   "«me fiquei».")
fx(15, 3, FI, "Quando vi a nota, me pus muito nervoso.", "me pus", "fiquei", "espanol",
   "«Me puse nervioso» = *fiquei nervoso*. *Pôr-se* no sirve para estados de ánimo: es calco del "
   "castellano.")
ch(15, 3, FI, "Ontem a gente ___ em casa vendo filme.", ["ficou", "se ficou", "quedou"], "ficou",
   "«Quedarse» (en un lugar) = *ficar*, sin pronombre: *a gente ficou em casa*. *A gente* va con el "
   "verbo en singular.")
cl(15, 3, FI, "Eu ___ (ficar) esperando o ônibus uma hora.", "fiquei",
   "*ficar* + gerúndio = quedarse haciendo algo: *fiquei esperando*. Hecho cerrado → perfeito; "
   "*fiquei* lleva *qu* para conservar el sonido.")

ch(22, 2, FI, "Depois daquele filme, a atriz ___ famosa no Brasil inteiro.", ["ficou", "pôs-se", "fez-se"], "ficou",
   "«Hacerse famoso» = *ficar famoso*: *ficou famosa*. *Pôr-se* y *fazer-se* + adjetivo son calcos. "
   "En la charla también se oye *virou famosa*.")
cl(22, 2, FI, "Nós ___ (ficar) conversando até as três da manhã.", "ficamos",
   "*ficar* + gerúndio = quedarse haciendo algo: *ficamos conversando*. Es la fila nueva de la tabla.")

tr(26, 1, FI, "Nos quedamos charlando hasta tarde.",
   _x(["Ficamos", "Nós ficamos", "A gente ficou"], [" conversando", " batendo papo"], " até tarde"),
   "«Quedarse + gerundio» = *ficar* + gerúndio: *ficamos conversando*. Sin pronombre: nada de «nos "
   "ficamos». «Charlar» es *conversar* o *bater papo*.")
fx(26, 1, FI, "Quando o chefe entrou, ele se pôs vermelho.", "se pôs", "ficou", "espanol",
   "«Se puso colorado» = *ficou vermelho*: cambio de estado con *ficar*. *Pôr-se* no va con "
   "adjetivos de ánimo o de color.")

cl(38, 2, FI, "Quando ouviu a notícia, ela ___ (se puso) pálida e ___ (se quedó) olhando para o chão.",
   "ficou | ficou",
   "Los dos son *ficar*: «ponerse» + adjetivo (*ficou pálida*) y «quedarse» + gerundio (*ficou "
   "olhando*). El castellano usa dos verbos; el portugués, uno.", prompt="Completá.")
tr(38, 2, FI, "Me quedé con hambre.",
   _x(["Fiquei", "Eu fiquei", "Continuei", "Eu continuei"], " com fome"),
   "*ficar com* + sensación: *fiquei com fome* (me quedé con hambre, o me dio hambre). Igual *fiquei "
   "com medo* (me dio miedo), *fiquei com sono*. Si ya tenías hambre antes, *continuei com fome*.", prompt=TRC)


# ===========================================================================
# mais-que-perfeito simples: reconocerlo al leer (fizera = tinha feito)
# ===========================================================================
ch(42, 1, MQ, "«Quando o médico chegou, o paciente já falecera.» «Falecera» = ___",
   ["había muerto", "muriera", "moriría"], "había muerto",
   "La -ra portuguesa es indicativo: *falecera* = *tinha falecido* (había muerto). «Muriera» sería "
   "*falecesse*.", prompt=SG)
ch(48, 2, MQ, "O ministro afirmou que a obra começara em março. Na fala: a obra ___ em março.",
   ["tinha começado", "começasse", "começaria"], "tinha começado",
   "En la prensa, *começara* = *tinha começado*: lo anterior a «afirmou». No es subjuntivo "
   "(*começasse*) ni condicional.", prompt=EQ)
cl(49, 0, MQ, "Ninguém sabia que ele dissera aquilo. → Ninguém sabia que ele ___ aquilo.", "tinha dito",
   "*dissera* (culto, escrito) = *tinha dito* (habla): había dicho. No es «dijera», que sería "
   "*dissesse*.", alt=["havia dito"], prompt=HB)
ch(49, 0, MQ, "Em «Machado já publicara Brás Cubas quando fundou a Academia», «publicara» equivale a ___.",
   ["tinha publicado", "publicasse", "publicaria"], "tinha publicado",
   "*publicara* = *tinha publicado* (había publicado): lo anterior a *fundou* (Brás Cubas es de 1881; "
   "la Academia Brasileira de Letras, de 1897). Para decirlo vos, *tinha publicado*.", prompt=EQ)
