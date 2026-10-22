# -*- coding: utf-8 -*-
"""Auditoría de gramática, área 4 del portugués (preposiciones y régimen,
marcadores, registro, formación de palabras): ítems de producción
espaciados para los puntos «flojo» y «mejorable» (prefijo gr4-).

Hilos (cada uno vuelve en 2-4 semanas posteriores, mezclado con lo que
compite):

  - preposiciones de tiempo (em março, no verão, no dia 15, aos sábados,
    daqui a; lección 7, bloque nuevo «¿Cuándo?»): 7, 9, 11 (con há) y 13;
  - ir a / ir para y chegar a / chegar em en los dos registros (lección
    35, bloque 4): 35, 39 y 41;
  - por / para: obrigado pelo, por volta de, pelo menos, pelo telefone
    (lección 9, bloque nuevo; duelo «porpara» en duelli_data.js): 9, 11,
    12 y 13;
  - ajudar alguém a + infinitivo, ligar para, visar (lección 35, bloque
    3): 16, 35, 39 y 40;
  - em cima / embaixo (lección 3, tip) y de repente = capaz que (lección
    16, bloque 6): 9, 10, 13, 16, 20 y 24;
  - o senhor / a senhora al hablar (lección 12, bloque 8) y será que
    (lecciones 17 y 24): 12, 14, 18, 28 y 38;
  - e-mail de reclamação y carta aberta (lección 43, bloque nuevo; lección
    47, bloque 5): 43, 47 y 49;
  - -mente sin tilde (lección 19, bloque 4) y -vel / -ista / -eiro
    (lección 26, bloque nuevo): 19, 22, 26, 29 y 30;
  - el guion después del Acuerdo (lección 44, bloque nuevo): 44, 46 y 49;
  - heterotónicos y agudas sin tilde (aqui, Peru; lección 1, bloque
    nuevo): 1, 2, 13 y 26, con ítems de escucha;
  - ficar com (lección 22, bloque 6) y colocaciones de alta frecuencia
    (dar uma olhada, fazer questão, dar certo, levar a sério): 18, 21, 22,
    23, 24 y 28.

Cada ítem va en una semana en la que su gramática ya se explicó; «part» es
la parte de la lección de esa semana (None: sin parte fija).
Respuestas de dos huecos: «a | b» (el alumno escribe «a / b» o «a b»).
"""
import itertools

TR = "Traducí al portugués."
TRF = "Traducí al portugués formal."
TRC = "Traducí al portugués coloquial de Brasil."
CO = "Completá."
CV = "Completá con la forma correcta del verbo entre paréntesis."
CP = "Completá con la preposición (contraída con el artículo si hace falta)."
CE = "Elegí la forma correcta."
FX = "Encontrá el error: tocá la palabra que está mal y corregila."
FXL = "Encontrá el error: tocá lo que está mal y corregilo."
FXF = "Texto formal. Encontrá el error: tocá la palabra que está mal y corregila."
SG = "Elegí el significado."
SIT = "Elegí la opción más adecuada a la situación."
FORM = "Elegí la opción adecuada para el registro formal."
NE = "Elegí la forma de la norma escrita."
GR = "Elegí la grafía brasileña actual."
LI = "Escuchá: ¿dónde cae el acento?"

T_TIEMPO = "preposiciones de tiempo: em, no, às, daqui a"
T_IR = "chegar a / em, ir a / para"
T_PP = "por / para: pelo, por volta de, pelo menos"
T_RG = "régimen: ajudar a, ligar para, visar"
T_LOC = "em cima / embaixo; de repente"
T_TRAT = "tratamiento: o senhor; será que"
T_REC = "e-mail de reclamação, carta aberta"
T_SUF = "sufijos: -mente, -vel, -ista, -eiro"
T_GUI = "guion: micro-ondas, antissocial"
T_HET = "heterotónicos y tildes: academia, aqui"
T_FIC = "ficar com y colocaciones"

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
    d = dict(id="gr4-%d-%02d" % (w, _N[w]), w=w, level=_level(w),
             type=typ, topic=topic, prompt=prompt, stem=stem, answer=answer,
             alt=alts, note=note)
    if part is not None:
        d["part"] = part
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


def li(w, p, said, options, answer, note):
    assert answer in options and len(set(options)) == len(options)
    return _add(w, p, "listen", LI, said, answer, note, topic=T_HET, options=list(options), nopeek=True)


def fx(w, p, topic, stem, bad, good, cat, note, goodAlt=None, prompt=None):
    assert stem.count(bad) == 1, (stem, bad)
    extra = dict(bad=bad, good=good, cat=cat)
    if goodAlt:
        extra["goodAlt"] = list(goodAlt)
    if prompt is None:
        prompt = FXL if " " in bad else FX
    return _add(w, p, "fixerr", prompt, stem, stem.replace(bad, good, 1), note,
                [stem.replace(bad, g, 1) for g in goodAlt or []], topic=topic, **extra)


# ===========================================================================
# 1. Preposiciones de tiempo (lección 7, bloque «¿Cuándo?»)
# ===========================================================================
cl(7, 1, T_TIEMPO, "O carnaval de 2027 é ___ fevereiro.", "em",
   "Mes y año van con *em* solo, sin artículo: *em fevereiro*, *em 2027*. «En el febrero» no existe.")
cl(7, 1, T_TIEMPO, "O aniversário da Bia é ___ dia 20.", "no",
   "«El 20» se dice *no dia 20* (em + o dia). El español no pone preposición; el portugués sí, y "
   "contraída.")
cl(7, 1, T_TIEMPO, "___ verão, o Rio está cheio de turistas.", "no",
   "Las estaciones llevan *em* + artículo: *no verão*, *no inverno*. Distinto de los meses: *em "
   "janeiro*, sin artículo.")
ch(7, 1, T_TIEMPO, "A feira de São Cristóvão é ___ sábados (todos os sábados).",
   ["aos", "a los", "em os"], "aos",
   "Lo que pasa cada semana: *aos sábados* (a + os), también *nos sábados*. «A los» es español y «em "
   "os» siempre se contrae.")
ch(7, 1, T_TIEMPO, "O ônibus sai ___ dez minutos (= dentro de diez minutos).",
   ["daqui a", "de aqui a", "há"], "daqui a",
   "«Dentro de» contando desde ahora: *daqui a dez minutos* (*daqui* = de + aqui, junto). *há* mira "
   "al pasado: *há dez minutos* = hace diez minutos.")
fx(7, 1, T_TIEMPO, "Volto de aqui a uma hora.", "de aqui a", "daqui a", "contraccion",
   "*de + aqui* se escribe junto: *daqui*. «Dentro de una hora» = *daqui a uma hora*.")
fx(7, 1, T_TIEMPO, "As férias de julho são em o inverno.", "em o", "no", "contraccion",
   "*em + o* = *no*, siempre: *no inverno*. Las estaciones llevan artículo; los meses, no: *em julho*.")
tr(7, 1, T_TIEMPO, "El lunes trabajo.",
   _x(["Na segunda", "Na segunda-feira"], " ", ["eu trabalho", "trabalho"])
   + _x(["Eu trabalho", "Trabalho"], " ", ["na segunda", "na segunda-feira"])
   + _x(["Segunda", "Segunda-feira"], " ", ["eu trabalho", "trabalho"]),
   "«El lunes» sin preposición en español; en portugués, *na segunda* (em + a). *segunda-feira* es "
   "femenino, por eso *na*. Al hablar también se oye *segunda eu trabalho*.")
tr(7, 1, T_TIEMPO, "En marzo estoy en Río.",
   _x("Em março ", ["eu estou", "estou"], " no Rio") + _x(["Eu estou", "Estou"], " no Rio em março"),
   "El mes va con *em* a secas: *em março*. El *Rio* lleva artículo: *no Rio*.")

ch(9, 0, T_TIEMPO, "Vou para Salvador ___ janeiro e volto ___ dia 2 de fevereiro.",
   ["em | no", "no | no", "em | em o"], "em | no",
   "Mes: *em janeiro* (sin artículo). Día: *no dia 2* (em + o), donde el español dice «el 2», sin "
   "preposición.")
tr(9, 0, T_TIEMPO, "Dentro de una hora llego a la playa.",
   _x("Daqui a uma hora ", ["eu chego", "chego"], [" à praia", " na praia"])
   + _x(["Eu chego", "Chego"], [" à praia", " na praia"], " daqui a uma hora"),
   "«Dentro de una hora» = *daqui a uma hora*. *chegar a* + *a praia* = *à praia* (norma); al hablar, "
   "*chego na praia*.")

ch(11, 2, T_TIEMPO, "Conheci a Bia ___ dois anos, numa festa em Niterói.",
   ["há", "daqui a", "em"], "há",
   "Hacia atrás, *há* (= hace): *há dois anos*. Hacia adelante, *daqui a*. *em dois anos* sería «en "
   "dos años» (lo que tardó).")
ch(11, 2, T_TIEMPO, "A gente volta para Rosario ___ três dias.",
   ["daqui a", "há", "faz"], "daqui a",
   "*volta* (presente con valor de futuro) pide *daqui a* = dentro de. *há* y *faz* son «hace»: miran "
   "al pasado.")
fx(11, 2, T_TIEMPO, "Cheguei ao Rio no 3 de maio.", "no 3", "no dia 3", "espanol",
   "Con fecha completa: *no dia 3 de maio* o *em 3 de maio*. «No 3» solo no se dice.",
   goodAlt=["em 3"])
cl(11, 2, T_TIEMPO, "A Ana se formou ___ 2020 e começou a trabalhar ___ março.", "em | em",
   "Año y mes, con *em* sin artículo: *em 2020*, *em março*. Nada de «no 2020».")

cl(13, 1, T_TIEMPO, "As aulas acabaram ___ duas semanas e começam de novo ___ um mês.",
   "há | daqui a",
   "Hacia atrás, *há* (= hace); hacia adelante, *daqui a* (= dentro de). Suenan parecido; el tiempo "
   "del verbo te dice cuál. Al hablar, *em um mês* también se oye.",
   alt=["faz | daqui a", "há | em", "faz | em"])
tr(13, 1, T_TIEMPO, "Las clases empiezan dentro de dos semanas.",
   _x("As aulas começam daqui a duas semanas") + _x("Daqui a duas semanas ", ["as aulas começam", "começam as aulas"]),
   "«Dentro de dos semanas» = *daqui a duas semanas*: *daqui* junto y *a* sin acento (delante de "
   "*duas semanas* no hay artículo).")

# ===========================================================================
# 2. ir a / ir para, chegar a / chegar em (lección 35, bloque 4)
# ===========================================================================
cl(35, 1, T_IR, "Habla: «Cheguei no aeroporto às dez.» → Texto formal: «Cheguei ___ aeroporto às dez.»",
   "ao",
   "En la norma, *chegar a*: *a* + *o aeroporto* = *ao*. Al hablar, *cheguei no aeroporto* es lo "
   "normal.", prompt=CP)
cl(35, 1, T_IR, "Texto formal: «Fui ao mercado.» → Habla: «Fui ___ mercado.»", "no",
   "Al hablar, con *ir* es muy común *em*: *fui no mercado* (em + o), o *fui pro mercado*. En un "
   "texto, *fui ao mercado*.", alt=["pro"], prompt=CP)
ch(35, 1, T_IR, "Vou ___ Salvador: arrumei um emprego lá e vou morar perto do Pelourinho.",
   ["para", "a", "em"], "para",
   "Te mudás, te quedás: *ir para*. *ir a* es la visita o el trámite del que volvés. «Ir em Salvador» "
   "solo se oye al hablar.")
ch(35, 1, T_IR, "Vou ___ farmácia e já volto.", ["à", "na", "a"], "à",
   "Ida corta y volvés: *ir a* + *a farmácia* = *à* (norma). *na* es del habla; *a* sin acento se "
   "come el artículo.", prompt=NE)
tr(35, 1, T_IR, "Llegué a São Paulo el lunes.",
   _x(["Cheguei", "Eu cheguei"], " a São Paulo ", ["na segunda", "na segunda-feira"])
   + _x(["Na segunda", "Na segunda-feira"], " ", ["cheguei", "eu cheguei"], " a São Paulo"),
   "Norma: *chegar a*. *São Paulo* no lleva artículo, así que queda *a São Paulo* (sin crase). "
   "«Cheguei em São Paulo» es del habla.", prompt=TRF)

ch(39, 1, T_IR, "«Quando ___ Brasília, liguei para a minha mãe.»",
   ["cheguei a", "cheguei em", "cheguei na"], "cheguei a",
   "Por escrito, *chegar a*; *Brasília* va sin artículo: *a Brasília*. *cheguei em* es del habla y "
   "«na Brasília» le pone un artículo que no tiene.", prompt=NE)
ch(39, 1, T_IR, "A Carla vai ___ Lisboa fazer o doutorado: vai ficar quatro anos.",
   ["para", "a", "em"], "para",
   "Cuatro años allá: destino donde te quedás, *ir para*. *ir a Lisboa* sugiere una visita corta.")
fx(41, None, T_IR, "Ao chegarmos no hotel, fomos recebidos pelo gerente.", "no hotel", "ao hotel",
   "regencia",
   "Texto formal: *chegar a*, *ao hotel*. *chegar no hotel* es lo normal al hablar, pero en un "
   "informe se corrige.", prompt=FXL)

# ===========================================================================
# 3. Por / para (lección 9, bloque «Por y para: lo que cambia»)
# ===========================================================================
cl(9, 2, T_PP, "Obrigado ___ convite! Eu vou sim.", "pelo",
   "*obrigado por* + *o convite*: la contracción es obligatoria, *pelo convite*. «Por o» no existe.")
cl(9, 2, T_PP, "A gente chega ___ volta das nove.", "por",
   "«A eso de las nueve» = *por volta das nove*: fórmula fija. «A isso de» no se dice.")
tr(9, 2, T_PP, "Gracias por la ayuda.",
   _x(["Obrigado", "Obrigada", "Muito obrigado", "Muito obrigada"], " pela ajuda"),
   "*por* + *a ajuda* = *pela ajuda*. Y *obrigado* concuerda con quien habla: *obrigada* si sos mujer.")
fx(9, 2, T_PP, "Custa por lo menos cinquenta reais.", "por lo menos", "pelo menos", "espanol",
   "«Por lo menos» = *pelo menos*: *lo* no existe en portugués y *por* se contrae.")
ch(9, 2, T_PP, "Falo com o João ___ telefone todo dia.", ["pelo", "por o", "para o"], "pelo",
   "El medio: *pelo telefone* (también *por telefone*, sin artículo). «Por o» nunca: se contrae.")

tr(11, 1, T_PP, "Gracias por el regalo, ¡me encantó!",
   _x(["Obrigado", "Obrigada", "Muito obrigado", "Muito obrigada"], " pelo presente", [", ", "! "],
      ["adorei", "amei", "gostei muito"]),
   "*por* + *o presente* = *pelo presente*. «Me encantó» = *adorei* o *amei* (perfeito: ya pasó).")
cl(12, None, T_PP, "Ontem eu dormi ___ menos dez horas.", "pelo",
   "«Por lo menos» = *pelo menos*. El español mete *lo*; el portugués contrae: *pelo*.")
ch(13, 2, T_PP, "O show começou ___ volta das dez.", ["por", "a", "para"], "por",
   "«A eso de las diez» = *por volta das dez*. La *a* del español no va: «a volta» es «la vuelta».")

# ===========================================================================
# 4. ajudar alguém a + infinitivo, ligar para, visar (lección 35, bloque 3)
# ===========================================================================
cl(16, 2, T_RG, "Ontem eu liguei ___ a Bia, mas ela não atendeu.", "para",
   "«Llamar por teléfono» = *ligar para* alguien: *liguei para a Bia*. Al hablar, *liguei pra Bia* o "
   "*liguei pra ela*.")
tr(35, 1, T_RG, "Ayudé a mi vecino a cargar las cajas.",
   _x(["Ajudei", "Eu ajudei"], " ", ["o meu", "meu"], " vizinho a carregar as caixas"),
   "*ajudar* lleva a la persona sin *a* (*ajudei o vizinho*) y la *a* va delante del infinitivo: *a "
   "carregar*. «Ajudei ao vizinho» es calco.")
fx(35, 1, T_RG, "Ajudei ao Lucas a fazer o trabalho.", "ao Lucas", "o Lucas", "regencia",
   "*ajudar alguém*: objeto directo, sin «a» personal. La *a* queda para el infinitivo: *a fazer*.")
cl(35, 1, T_RG, "Você pode ligar ___ o médico amanhã de manhã?", "para",
   "Para llamar por teléfono, *ligar* va con *para*: *ligar para o médico*. Sin la preposición, *ligar* es «prender»: *ligar a TV*. Por eso *ligar o médico* no se entiende.")
tr(39, 1, T_RG, "Mañana llamo a Bia.",
   _x("Amanhã ", ["eu ligo", "ligo", "vou ligar", "eu vou ligar"], [" para a Bia", " pra Bia"])
   + _x(["Eu ligo", "Ligo", "Vou ligar", "Eu vou ligar"], [" para a Bia", " pra Bia"], " amanhã"),
   "*ligar para* + persona; al hablar, *pra Bia*. «Llamo a Bia» no es «chamo a Bia»: *chamar* es "
   "llamar en voz alta o llamar a alguien para que venga.")
ch(39, 1, T_RG, "O professor ajudou os alunos ___ entender o texto.", ["a", "em", "de"], "a",
   "*ajudar alguém a fazer algo*: la *a* va delante del infinitivo. *em* y *de* son calcos de otros "
   "verbos (*pensar em*, *gostar de*).")
ch(40, None, T_RG, "«O programa visa reduzir a evasão escolar.» «Visa» quiere decir…",
   ["tiene como objetivo", "revisa", "anuncia"], "tiene como objetivo",
   "*visar (a)* + infinitivo = tener por objetivo, apuntar a; es de registro formal. *visar um "
   "documento* = visarlo, sellarlo.", prompt=SG)

# ===========================================================================
# 5. em cima / embaixo (lección 3) y de repente (lección 16)
# ===========================================================================
fx(9, None, T_LOC, "O gato está em baixo da cama.", "em baixo", "embaixo", "ortografia",
   "*embaixo* se escribe junto (y *em cima*, separado). «Em baixo» es un error muy frecuente, también "
   "entre brasileños.")
fx(10, None, T_LOC, "A chave está encima da mesa.", "encima", "em cima", "espanol",
   "«Encima» es español: *em cima*, separado, con *de* contraído: *em cima da mesa*.")
cl(13, 2, T_LOC, "O livro está ___ da mesa e a mochila, ___ da cadeira. (arriba | abajo)",
   "em cima | embaixo",
   "*em cima de* (dos palabras) y *embaixo de* (una), con *de* contraído: *da mesa*, *da cadeira*. "
   "*debaixo de* también vale.", alt=["em cima | debaixo"])
ch(16, 3, T_LOC, "En una charla: «De repente eu vou na festa, vamos ver.» ¿Qué quiere decir?",
   ["Capaz que voy a la fiesta.", "De golpe voy a la fiesta.", "Voy enseguida a la fiesta."],
   "Capaz que voy a la fiesta.",
   "Al hablar, para suponer o proponer, *de repente* = capaz que, a lo mejor. *vamos ver* lo "
   "confirma: no es seguro.", prompt=SG)
ch(20, None, T_LOC, "«Estava tudo calmo e, de repente, começou a chover.» Acá «de repente» es…",
   ["de golpe", "capaz que", "de nuevo"], "de golpe",
   "En un relato en pasado, *de repente* es «de golpe», como en español. «Capaz que» es su uso en "
   "propuestas y suposiciones.", prompt=SG)
tr(24, None, T_LOC, "Capaz que mañana vamos a la playa.",
   _x("De repente ", ["a gente vai", "nós vamos"], [" à praia", " na praia"], " amanhã")
   + _x("De repente amanhã ", ["a gente vai", "nós vamos"], [" à praia", " na praia"])
   + _x("Talvez ", ["a gente vá", "nós vamos"], [" à praia", " na praia"], " amanhã"),
   "Al hablar, «capaz que» = *de repente* (o *talvez*). Con *talvez* delante del verbo va subjuntivo: "
   "*talvez a gente vá*.", prompt=TRC)

# ===========================================================================
# 6. o senhor / a senhora al hablar (lección 12) y será que (17, 24)
# ===========================================================================
ch(12, 3, T_TRAT, "Al portero del edificio, un señor mayor: «Com licença, ___ sabe onde fica o metrô?»",
   ["o senhor", "tu", "vocês"], "o senhor",
   "A alguien mayor o en un trato de servicio, *o senhor / a senhora*, con verbo en 3.ª: *o senhor "
   "sabe*. *tu* suena demasiado íntimo y *vocês* es plural.", prompt=SIT)
ch(12, 3, T_TRAT, "A una señora mayor en la panadería: «A senhora ___ ajuda com a sacola?»",
   ["quer", "queres", "querem"], "quer",
   "*a senhora* concuerda como *você*: verbo en 3.ª del singular, *a senhora quer*. *queres* es de "
   "*tu*; *querem*, plural.")
ch(12, 3, T_TRAT, "En el quiosco, al dueño mayor: «Bom dia! ___ tem troco para cinquenta?»",
   ["O senhor", "Tu", "Vocês"], "O senhor",
   "Con un desconocido mayor, *o senhor*: es cortesía, no distancia fría. En Río, al vendedor joven "
   "se le dice *você*.", prompt=SIT)
tr(14, None, T_TRAT, "Señora, ¿usted vive aquí?",
   _x(["Senhora, a senhora", "A senhora"], " mora aqui"),
   "«Usted» = *a senhora* (o *o senhor*), con verbo en 3.ª: *mora*. Y «vivir» en un lugar es "
   "*morar*.")
ch(18, 1, T_TRAT, "En el hotel, al recepcionista mayor: «___ poderia chamar um táxi para mim?»",
   ["O senhor", "Tu", "Vocês"], "O senhor",
   "Pedido cortés a un desconocido mayor: *o senhor poderia…?*, verbo en 3.ª. *tu poderia* mezcla "
   "personas y *vocês* es plural.", prompt=SIT)
cl(28, None, T_TRAT, "___ ela vem hoje? Já são dez horas e nada.", "Será que",
   "Duda en voz alta: *será que* + indicativo (*será que ela vem?*) = ¿vendrá? El portugués casi no "
   "usa el futuro para dudar.")
tr(28, None, T_TRAT, "¿No me podrías ayudar con la mudanza?",
   _x("Será que ", ["você poderia", "você podia"], " me ajudar com a mudança")
   + _x(["Você poderia", "Você podia", "Você não poderia", "Você não podia"], " me ajudar com a mudança"),
   "Para un pedido grande, *será que você poderia…?* suaviza mucho. «¿No me podrías…?» con *não* "
   "también vale.")
tr(38, None, T_TRAT, "¿Vendrá Bia hoy?",
   _x("Será que a Bia ", ["vem", "vai vir"], " hoje"),
   "La duda en presente o futuro va con *será que* + indicativo: *será que a Bia vem hoje?* «Virá a "
   "Bia hoje?» suena a libro.", prompt=TRC)

# ===========================================================================
# 7. E-mail de reclamação (lección 43) y carta aberta (lección 47)
# ===========================================================================
ch(43, 3, T_REC, "Primera frase de una reclamação por un pedido que no llegó:",
   ["Venho registrar minha insatisfação com a entrega do pedido nº 4521.",
    "Estou muito bravo porque vocês não entregaram nada!",
    "Oi, tudo bem? Meu pedido não chegou."],
   "Venho registrar minha insatisfação com a entrega do pedido nº 4521.",
   "La reclamação abre con el motivo en tono firme y cortés: *venho registrar minha insatisfação com…* "
   "y el número del pedido. Ni enojo ni charla.", prompt=FORM)
cl(43, 3, T_REC, "Solicito que o valor ___ (ser) devolvido no prazo de dez dias úteis.", "seja",
   "*Solicito que* pide subjuntivo: *que o valor seja devolvido*. «Que é devolvido» es el error "
   "típico.", prompt=CV)
ch(43, 3, T_REC, "Para cerrar la reclamação: «___ retorno. Atenciosamente,»",
   ["Aguardo", "Espero por", "Guardo"], "Aguardo",
   "En un mail formal, «quedo a la espera» se dice *aguardo retorno*: *aguardar* es esperar. No lo confundas con *guardar*, que es guardar algo, como en castellano.", prompt=FORM)
fx(43, 3, T_REC, "Venho a registrar minha insatisfação com o atendimento.", "Venho a registrar",
   "Venho registrar", "espanol",
   "*vir* + infinitivo sin *a*: *venho registrar*, *venho solicitar*. «Vengo a» se calca del "
   "español.")
cl(43, 3, T_REC, "Entrei em contato com o SAC no dia 10 de maio (protocolo ___ 88231).", "nº",
   "El número del reclamo se cita como *protocolo nº…*: es la prueba de que ya reclamaste. *nº* = "
   "número.", alt=["n.º", "n°", "número"])
ch(47, 2, T_REC, "Apertura de una carta aberta de los vecinos al intendente:",
   ["Nós, moradores do bairro de Santa Teresa, vimos a público manifestar nossa preocupação com…",
    "Oi, prefeito, tudo bem? A gente queria falar uma coisa.",
    "Eu venho reclamar porque estou cansado do barulho."],
   "Nós, moradores do bairro de Santa Teresa, vimos a público manifestar nossa preocupação com…",
   "La carta aberta habla en nombre de un grupo (*nós, moradores…*) y en público: *vimos a público "
   "manifestar*. El tono de la charla no va.", prompt=FORM)
tr(49, None, T_REC, "Solicito que el producto sea cambiado en un plazo de cinco días.",
   _x("Solicito que o produto seja trocado ", ["no prazo de", "em um prazo de", "num prazo de", "em até"],
      " cinco dias"),
   "*Solicito que* + subjuntivo: *seja trocado*. «Cambiar un producto» es *trocar* y «en un plazo de», "
   "*no prazo de*.", prompt=TRF)

# ===========================================================================
# 8. -mente sin tilde (lección 19) y -vel / -ista / -eiro (lección 26)
# ===========================================================================
cl(19, 1, T_SUF, "Ele fala ___ (rápido → adverbio) e ninguém entende.", "rapidamente",
   "*-mente* se pega al femenino y la base pierde la tilde: *rápida → rapidamente*. En español queda "
   "(rápidamente); en portugués, no.")
cl(19, 1, T_SUF, "Esse problema se resolve ___ (fácil → adverbio).", "facilmente",
   "*fácil → facilmente*: la tilde de *fácil* se va, porque el acento pasa a *-men-*.")
fx(19, 1, T_SUF, "O trabalho está práticamente pronto.", "práticamente", "praticamente", "ortografia",
   "*prática → praticamente*: en *-mente*, la base pierde la tilde. «Prácticamente» con tilde es la "
   "costumbre del español.")
cl(22, None, T_SUF, "Ela respondeu ___ (educado → adverbio), mesmo irritada.", "educadamente",
   "*-mente* sobre el femenino: *educada → educadamente*. Igual *rápida → rapidamente*, sin tilde.")
cl(26, 1, T_SUF, "Esse tecido pode ser lavado na máquina: é ___ (lavar + -vel).", "lavável",
   "*-vel* = «que se puede»: *lavar → lavável*, con tilde en la vocal de antes (*-ável*). «-ble» no "
   "existe en portugués.")
cl(26, 1, T_SUF, "Quem dirige um táxi é o ___.", "taxista",
   "*-ista* para oficios y posturas: *taxista*, *dentista*, *jornalista*. No cambia en femenino: *a "
   "taxista*.")
fx(26, 1, T_SUF, "O panadero da esquina abre às seis.", "panadero", "padeiro", "espanol",
   "Panadero = *padeiro* (de *pão*): «-ero» → *-eiro*. Igual *carteiro*, *pedreiro*, *cozinheiro*.")
fx(26, 1, T_SUF, "Isso não é posible agora.", "posible", "possível", "espanol",
   "«-ble» → *-vel*, con doble *s* y tilde: *possível*. Plural, *possíveis*.")
ch(29, None, T_SUF, "Uma pessoa em quem você pode confiar é…", ["confiável", "confiable", "confiavel"],
   "confiável",
   "*confiar + -vel = confiável*: tilde en la *á* de *-ável*. «Confiable» es español y «confiavel» "
   "pierde la tilde.")
cl(30, None, T_SUF, "Ela fala ___ (perfeito → adverbio) o português.", "perfeitamente",
   "*-mente* sobre el femenino: *perfeita → perfeitamente*. Si la base tuviera tilde, se iría: "
   "*rápida → rapidamente*.")

# ===========================================================================
# 9. El guion después del Acuerdo (lección 44)
# ===========================================================================
ch(44, 1, T_GUI, "Ele é muito ___: não fala com ninguém.", ["antissocial", "anti-social", "antisocial"],
   "antissocial",
   "Prefijo en vocal + *s*: junto y la *s* se duplica, *antissocial* (si no, sonaría z). «Anti-social» "
   "es la grafía de antes del Acuerdo.", prompt=GR)
ch(44, 1, T_GUI, "Esquenta a comida no ___.", ["micro-ondas", "microondas", "micro ondas"], "micro-ondas",
   "Misma vocal al final del prefijo y al principio de la palabra (*micro* + *ondas*): guion. Igual "
   "*anti-inflamatório*, *contra-ataque*.", prompt=GR)
ch(44, 1, T_GUI, "O médico receitou um ___.", ["anti-inflamatório", "antiinflamatório", "antinflamatório"],
   "anti-inflamatório",
   "*anti* + *inflamatório*: vocal igual (*i* + *i*) → guion. Con vocal distinta va junto: "
   "*antiaéreo*.", prompt=GR)
ch(44, 1, T_GUI, "A cidade precisa investir em ___.", ["infraestrutura", "infra-estrutura", "infraestructura"],
   "infraestrutura",
   "Vocal distinta (*a* + *e*): junto, *infraestrutura*. El guion se usaba antes del Acuerdo de 1990; "
   "«-structura» es español.", prompt=GR)
fx(44, 1, T_GUI, "Estou fazendo auto-escola desde março.", "auto-escola", "autoescola", "ortografia",
   "*auto* + *escola*: vocales distintas (*o* + *e*) → junto. Igual *autoestima*, *autoajuda*.")
fx(44, 1, T_GUI, "Meu vizinho é meio anti-social.", "anti-social", "antissocial", "ortografia",
   "Prefijo en vocal + *s* → junto y *ss*: *antissocial*. Lo mismo *ultrassom*, *minissaia*.")
ch(46, None, T_GUI, "No teatro, o ___ cuida do cenário durante a peça.",
   ["contrarregra", "contra-regra", "contraregra"], "contrarregra",
   "Prefijo en vocal + *r*: junto y *rr*, para que siga sonando fuerte: *contrarregra*. Con una *r* "
   "sola sonaría suave.", prompt=GR)
fx(46, None, T_GUI, "Depois da terapia, a auto-estima dele melhorou muito.", "auto-estima", "autoestima",
   "ortografia",
   "*auto* + *estima*: vocales distintas → junto, *autoestima*. Con prefijo en vocal, guion solo si "
   "sigue la misma vocal (*micro-ondas*) o una *h* (*anti-higiênico*).")
fx(49, None, T_GUI, "Ontem fiz um ultra-som do joelho.", "ultra-som", "ultrassom", "ortografia",
   "*ultra* + *som*: prefijo en vocal + *s* → junto y *ss*. Como *antissocial*, *minissaia*.")

# ===========================================================================
# 10. Heterotónicos y agudas sin tilde (lección 1, bloque nuevo)
# ===========================================================================
_A = "a-ca-de-MI-a"
li(1, 1, "academia", [_A, "a-ca-DE-mia"], _A,
   "*academia* (gimnasio, en Brasil) carga en la *i*: a-ca-de-MI-a, como «María». En español es "
   "a-ca-DE-mia.")
li(1, 1, "polícia", ["po-LÍ-cia", "po-li-CÍ-a"], "po-LÍ-cia",
   "*polícia*: la tilde marca la sílaba fuerte, po-LÍ-cia. En español es po-li-CÍ-a.")
li(1, 1, "nível", ["NÍ-vel", "ni-VEL"], "NÍ-vel",
   "*nível* es grave: NÍ-vel (la tilde lo dice). En español «nivel» es aguda.")
li(1, 1, "cérebro", ["CÉ-re-bro", "ce-RE-bro"], "CÉ-re-bro",
   "*cérebro* es esdrújula: CÉ-re-bro, con *é* abierta. En español, ce-RE-bro.")
fx(1, 1, T_HET, "Estou aquí.", "aquí", "aqui", "ortografia",
   "*aqui* no lleva tilde: las agudas en *-i* ya cargan el acento al final. «Aquí» es español.")
fx(2, None, T_HET, "O Lucas está alí, perto da porta.", "alí", "ali", "ortografia",
   "*ali*, sin tilde, como *aqui*: en portugués la *-i* final ya es tónica.")
fx(2, None, T_HET, "A Ana é do Perú.", "Perú", "Peru", "ortografia",
   "*Peru*, sin tilde: las agudas en *-u* no la llevan (*caju*, *Itu*). «Perú» es la grafía española.")
ch(2, None, T_HET, "A ___ está na rua.", ["polícia", "policía", "polícía"], "polícia",
   "*polícia* carga en la *í* (po-LÍ-cia), no en la *a* como en español. Una sola tilde.")
li(13, 0, "alergia", ["a-ler-GI-a", "a-LER-gia"], "a-ler-GI-a",
   "*alergia*: a-ler-GI-a, la *i* fuerte y en hiato, como *academia*. En español, a-LER-gia.")
li(13, 0, "oxigênio", ["o-xi-GÊ-nio", "o-XÍ-ge-no"], "o-xi-GÊ-nio",
   "*oxigênio* carga en *gê*: o-xi-GÊ-nio. El español dice o-XÍ-ge-no.")
fx(13, 0, T_HET, "Tenho alergía a camarão.", "alergía", "alergia", "ortografia",
   "*alergia* se escribe sin tilde: es grave terminada en *-a* (a-ler-GI-a), y esas no la llevan, "
   "como *academia* o *anemia*.")
li(26, None, "anemia", ["a-ne-MI-a", "a-NE-mia"], "a-ne-MI-a",
   "*anemia*: a-ne-MI-a, como *academia* y *alergia*. En español, a-NE-mia.")
li(26, None, "limite", ["li-MI-te", "LÍ-mi-te"], "li-MI-te",
   "*limite* es grave y sin tilde: li-MI-te. En español es esdrújula: LÍ-mi-te.")

# ===========================================================================
# 11. ficar com (lección 22) y colocaciones de alta frecuencia
# ===========================================================================
tr(18, 2, T_FIC, "¿Podrías echarle un vistazo a mi texto?",
   _x(["Você poderia", "Você podia", "Poderia", "Podia"], " dar uma olhada ", ["no meu texto", "no texto"]),
   "«Echar un vistazo» = *dar uma olhada em* algo: *dar uma olhada no meu texto*. Con *poderia* o "
   "*podia*, el pedido suena amable.")
cl(21, None, T_FIC, "Eu faço ___ de pagar o almoço: você é minha convidada.", "questão",
   "*fazer questão de* = insistir en, tener el gusto de: *faço questão de pagar*. No es «hacer "
   "cuestión».")
ch(22, 2, T_FIC, "En una tienda: «Gostei, fico com esse.» ¿Qué quiere decir?",
   ["Me lo llevo.", "Me quedo acá con este.", "Este me queda bien."], "Me lo llevo.",
   "*ficar com* algo, al comprar = quedárselo, llevárselo: *fico com esse*. «Me queda bien» es *fica "
   "bem em mim*.", prompt=SG)
tr(22, 2, T_FIC, "Me lo llevo (en una tienda).",
   _x(["Fico com", "Eu fico com", "Vou ficar com"], [" esse", " este", " ele"])
   + ["Vou levar", "Vou levar esse", "Levo esse", "Eu levo esse"],
   "En la tienda, *fico com esse* (o *vou levar*). «Me lo llevo» no se traduce palabra por palabra: "
   "nada de «me o levo».")
tr(22, 2, T_FIC, "Me dio vergüenza.",
   _x(["Fiquei", "Eu fiquei"], " com vergonha") + ["Senti vergonha", "Eu senti vergonha", "Me deu vergonha",
                                                    "Deu vergonha"],
   "*ficar com* + sensación = «me dio»: *fiquei com vergonha*, *fiquei com medo*. «Me deu vergonha» "
   "también se oye.")
tr(23, None, T_FIC, "Ojalá salga bien.",
   _x("Tomara que ", ["dê certo", "tudo dê certo"]),
   "«Salir bien» = *dar certo*; con *tomara que*, subjuntivo: *dê certo*. «Salga bem» no se dice.")
ch(24, None, T_FIC, "«A Bia ficou com o Rafa na festa.» ¿Qué pasó?",
   ["Estuvieron juntos, sin compromiso.", "Bia se quedó esperando a Rafa.", "Bia se peleó con Rafa."],
   "Estuvieron juntos, sin compromiso.",
   "Entre jóvenes, *ficar com alguém* es besarse o estar con alguien sin ser novios. En una fiesta se entiende así; en otro contexto también puede ser «quedarse con alguien» (*fico com a minha avó*).", prompt=SG)
cl(24, None, T_FIC, "Ele não leva nada ___ sério: vive brincando.", "a",
   "La colocación brasileña es *levar a sério*: con *levar* (llevar) y *a*, sin artículo. «Tomar a sério» suena a calco del castellano.")
cl(28, None, T_FIC, "Quando vi a nota, ___ com medo de reprovar.", "fiquei",
   "*ficar com medo* = me dio miedo, me asusté: *fiquei com medo*. «Me deu medo» también se oye; "
   "«tive medo» es más neutro.", alt=["eu fiquei"])
