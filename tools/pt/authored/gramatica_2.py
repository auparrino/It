# -*- coding: utf-8 -*-
"""Auditoría de gramática, área 2 del portugués (sustantivo y pronombre):
ítems de producción espaciados para los puntos «falta» y «mejorable»
(prefijo gr2-).

Hilos (cada uno vuelve en 2-4 semanas posteriores, mezclado con lo que
compite):

  - plural con cambio de timbre (ovo / ovos [ó]; lección 4, bloque nuevo):
    4, 7 y 13; plural de compuestos (lección 7, tip): 7, 10 y 13;
  - comparar desde A1 (lección 4, bloque nuevo): 4, 6 y 8; repaso después
    de la 19: 26, 39 y 51;
  - superlativo (-íssimo, -érrimo para leer; lección 19): 40 y 51;
  - posición del adjetivo (grande homem / homem grande; lección 19, bloque
    nuevo): 19, 22 y 26;
  - indefinidos qualquer, cada, outro, vários, certo (lección 20, bloque
    nuevo) y el duelo tudo / todo: 20, 22, 23, 26 y 39;
  - diminutivo de todos los días (lección 12, bloque nuevo): 12, 14 y 16;
  - pronombre entre auxiliar y verbo (vou te ligar; lección 16, tip):
    17, 21 y 24;
  - próclise con sujeto expreso en lo escrito (lección 33): 33, 36 y 49;
  - que + sustantivo y exclamativo «Que lindo!» (lección 8, tip): 8, 10
    y 12;
  - ordinales y fracciones (lección 7, bloque nuevo): 7, 9 y 13.

Cada ítem va en una semana en la que su gramática ya se explicó; «part» es
la parte de la lección de esa semana (None: la última).
"""
import itertools

TR = "Traducí al portugués."
TRF = "Traducí al portugués formal."
TRC = "Traducí al portugués coloquial de Brasil."
CO = "Completá."
CE = "Elegí la forma correcta."
FX = "Encontrá el error: tocá la palabra que está mal y corregila."
FXL = "Encontrá el error: tocá lo que está mal y corregilo."
FXF = "Texto formal. Encontrá el error: tocá la palabra que está mal y corregila."
HB = "Elegí cómo se dice en el habla de Brasil."
EF = "Elegí la forma de la escritura formal."
SG = "Elegí el significado."
LI = "Escuchá: ¿cómo suena la o tónica?"

MT = "plural: ovo / ovos [ó]"
CP = "plural de compuestos"
CM = "comparativos: mais... do que, maior, melhor"
SP = "superlativo: -íssimo, -érrimo"
AP = "posición del adjetivo: grande homem / homem grande"
IN = "indefinidos: qualquer, cada, outro, vários"
TT = "tudo / todo"
DM = "diminutivo: cafezinho, minutinho"
PR = "pronombre con auxiliar: vou te ligar"
CL = "colocación formal: sujeto + próclise"
IQ = "que + sustantivo; Que lindo!"
NU = "ordinales y fracciones"

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
    d = dict(id="gr2-%d-%02d" % (w, _N[w]), w=w, level=_level(w),
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


def li(w, p, topic, said, options, answer, note):
    assert answer in options and len(set(options)) == len(options)
    return _add(w, p, "listen", LI, said, answer, note, topic=topic, options=list(options), nopeek=True)


def fx(w, p, topic, stem, bad, good, cat, note, goodAlt=None, prompt=None):
    assert stem.count(bad) == 1, (stem, bad)
    extra = dict(bad=bad, good=good, cat=cat)
    if goodAlt:
        extra["goodAlt"] = list(goodAlt)
    if prompt is None:
        prompt = FXL if " " in bad else FX
    return _add(w, p, "fixerr", prompt, stem, stem.replace(bad, good, 1), note,
                [stem.replace(bad, g, 1) for g in goodAlt or []], topic=topic, **extra)


AB = "abierta [ó], la de avó"
CE_ = "cerrada [ô], la de avô"

# ===========================================================================
# Plural con cambio de timbre (metafonía) y plural de compuestos
# ===========================================================================
li(4, 0, MT, "os ovos", [AB, CE_], AB,
   "*ovo* tiene ô cerrada, pero el plural *ovos* la abre: «óvus». La escritura no cambia; el sonido sí.")
li(4, 0, MT, "um ovo", [CE_, AB], CE_,
   "En singular, *ovo* es cerrada: «ôvu». Recién en el plural (*ovos*) y en *ova* se abre.")
li(4, 0, MT, "os olhos verdes", [AB, CE_], AB,
   "*olho* [ô] → *olhos* [ó]: como *ovo*. Un hispanohablante la cierra siempre, y se nota.")
li(4, 0, MT, "os bolos", [CE_, AB], CE_,
   "*bolo* no está en la lista: *bolos* sigue cerrada, igual que *gostos* y *almoços*.")
ch(4, 0, MT, "¿En cuál la o tónica se abre en el plural?", ["ovo → ovos", "bolo → bolos", "gosto → gostos"],
   "ovo → ovos",
   "*ovo, olho, porto, corpo, jogo, povo, novo* abren la o en plural: *ovos* [ó]. *bolo* y *gosto* no: "
   "*bolos*, *gostos* [ô]. Es una lista corta: aprendela de memoria.")
ch(4, 0, MT, "«Uma casa nova»: la o de «nova» suena…", [AB, CE_, "casi una u"], AB,
   "*novo* [ô], pero *nova, novos, novas* [ó]: el femenino y el plural abren la o. Lo mismo *grosso* → "
   "*grossa* [ó].")
li(7, 0, MT, "dois jogos", [AB, CE_], AB,
   "*jogo* [ô] → *jogos* [ó], como *ovos* y *olhos*. Con números lo vas a oír todo el tiempo: *dois "
   "jogos*, *três jogos*.")
li(13, 0, MT, "os portos do Brasil", [AB, CE_], AB,
   "*porto* [ô] → *portos* [ó]. Repaso de la semana 4: *ovos, olhos, corpos, portos* abren; *bolos*, no.")
ch(13, 0, MT, "¿En cuál de estos plurales la o tónica es cerrada [ô]?",
   ["os almoços", "os corpos", "os povos"], "os almoços",
   "*almoço → almoços* queda cerrada, como *bolos* y *gostos*. *corpos* y *povos* se abren [ó], como "
   "*ovos*.")

cl(7, 1, CP, "Eu trabalho todas as ___ (segunda-feira).", "segundas-feiras",
   "En *segunda-feira* las dos partes son palabras que varían (adjetivo + sustantivo): plural en las "
   "dos, *segundas-feiras*. «Segunda-feiras» es el error típico.")
cl(7, 1, CP, "Os dois ___ (guarda-chuva) estão no carro.", "guarda-chuvas",
   "Verbo + sustantivo (*guarda* + *chuva*): el verbo no varía, solo el sustantivo: *guarda-chuvas*. "
   "Igual *beija-flores*, *para-brisas*.")
cl(7, 1, CP, "Quero dez ___ (pão de queijo), por favor.", "pães de queijo",
   "Con *de* en el medio, solo cambia la primera palabra: *pães de queijo* (como «panes de queso»). "
   "Y *pão* hace *pães*, no «pãos».")
cl(10, None, CP, "Todas as ___ (quinta-feira) a gente joga futebol.", "quintas-feiras",
   "Las dos partes varían, como en *segundas-feiras*: *quintas-feiras*. En la charla también "
   "*todas as quintas*.", alt=["quintas"])
cl(13, 0, CP, "Comprei dois ___ (guarda-chuva) na feira.", "guarda-chuvas",
   "*guarda* es verbo y no varía: *guarda-chuvas*. Compará con *segundas-feiras* (las dos partes "
   "varían) y *pães de queijo* (solo la primera).")

# ===========================================================================
# Comparar desde A1 y repaso tras la semana 19
# ===========================================================================
ch(4, 2, CM, "O Rio é ___ Niterói.", ["maior do que", "mais grande do que", "más grande que"],
   "maior do que",
   "«Más grande» es *maior*: «mais grande» no se usa así. *maior, menor, melhor, pior* ya son "
   "comparativos y no llevan *mais*.")
cl(4, 2, CM, "A Bia é mais alta ___ eu.", "do que",
   "Comparativo: *mais* + adjetivo + *do que* (o *que*). Y detrás va *eu*, no «mim»: *do que eu*.",
   alt=["que"])
tr(4, 2, CM, "Lucas es mayor que yo.",
   _x(["O Lucas", "Lucas"], " é mais velho ", ["do que", "que"], " eu"),
   "Para la edad, «mayor» es *mais velho* (y «menor», *mais novo*). *maior* es «más grande» de "
   "tamaño. Detrás de *que*, *eu*.")
fx(4, 2, CM, "O açaí daqui é mais bom do que o de lá.", "mais bom", "melhor", "concordancia",
   "«Más bueno» no: *melhor*. Como *maior* y *pior*, ya es comparativo y no lleva *mais*.")
ch(4, 2, CM, "Esse hotel é ___ do que o outro.", ["pior", "mais ruim", "peor"], "pior",
   "*ruim* → *pior* (peor). «Mais ruim» se oye, pero es error; «peor» es español.")
cl(6, None, CM, "Minha irmã é ___ do que eu: ela tem vinte anos e eu, vinte e cinco.", "mais nova",
   "Para la edad: *mais novo / mais nova* (menor) y *mais velho / mais velha* (mayor). *menor do que "
   "eu* se entiende de tamaño: «más baja que yo».", alt=["mais jovem"])
tr(8, None, CM, "Este hotel es mejor que el otro.",
   _x(["Este", "Esse"], " hotel é melhor ", ["do que", "que"], " o outro"),
   "*bom* → *melhor*, sin *mais*: «mais bom» es error. Y el segundo término, con *do que* o *que*.")
fx(26, None, CM, "O Rio é mais grande que Niterói, mas Niterói tem a melhor vista.", "mais grande", "maior",
   "concordancia",
   "«Mais grande» es el calco de «más grande»: en Brasil, *maior*. Lo mismo *menor*, *melhor*, *pior*.")
cl(26, None, CM, "O aluguel em Botafogo é tão caro ___ no Leblon.", "quanto",
   "Igualdad: *tão* + adjetivo + *quanto* (o *como*). «Tan... que» no: eso es consecuencia (*tão caro "
   "que ninguém paga*).", alt=["como"])
fx(39, None, CM, "Ela fala português muito melhor do que mim.", "mim", "eu", "pronome",
   "Detrás de *do que* va el pronombre sujeto: *do que eu* (se entiende «do que eu falo»). «Mim» "
   "solo va detrás de preposición: *para mim*.")
cl(39, None, CM, "Não tenho ___ paciência quanto você.", "tanta",
   "Con sustantivo, *tanto* concuerda: *tanta paciência*, *tantos amigos*. Con adjetivo, *tão* "
   "invariable: *tão paciente quanto você*.")
ch(51, None, CM, "O problema é ___ do que parecia.", ["maior", "mais grande", "mais maior"], "maior",
   "*grande* → *maior*. «Mais grande» es calco del español y «mais maior», doble comparativo.")
tr(51, None, CM, "Es tan caro como en San Pablo.",
   _x(["É", "Está"], " tão caro ", ["quanto", "como"], " em São Paulo"),
   "Igualdad: *tão... quanto* (o *como*), nunca «tan». Y San Pablo es *São Paulo*.")

# ===========================================================================
# Superlativo
# ===========================================================================
ch(40, None, SP, "«Uma região paupérrima» es una región…",
   ["pobrísima", "empobrecida hace poco", "con poca población"], "pobrísima",
   "*paupérrimo* es el superlativo culto de *pobre* (del latín *pauper*): pobrísimo. En la charla, "
   "*pobríssimo* o *muito pobre*.", prompt=SG)
ch(40, None, SP, "Notícia de jornal: «O cantor, ___, lotou o estádio.»",
   ["celebérrimo", "celebrísimo", "celébrimo"], "celebérrimo",
   "*célebre* → *celebérrimo* (famosísimo): superlativo en *-érrimo*, como *paupérrimo* y *libérrimo*. "
   "Es de la prensa y de los textos cultos.", prompt=EF)
cl(51, None, SP, "O restaurante era ___ (caro, superlativo en -íssimo).", "caríssimo",
   "*caro* → *caríssimo*: cae la vocal final y entra *-íssimo*, con tilde en la í. Una sola *s* en "
   "español (carísimo), dos en portugués.")
fx(51, None, SP, "É o bairro mais caro que a cidade.", "que a", "da", "preposicion",
   "En el superlativo, el segundo término va con *de* contraído: *o bairro mais caro da cidade*. "
   "*que* es para comparar dos cosas (*mais caro que Botafogo*).")

# ===========================================================================
# Posición del adjetivo
# ===========================================================================
ch(19, 1, AP, "Ele tem dois metros de altura: é um ___.", ["homem grande", "grande homem", "gran homem"],
   "homem grande",
   "Detrás, *grande* describe el tamaño: *um homem grande* (alto, grandote). Delante, valora: *um "
   "grande homem* (importante). «Gran» no existe.")
ch(19, 1, AP, "Tiradentes é um herói nacional: foi um ___.", ["grande homem", "homem grande", "gran homem"],
   "grande homem",
   "Delante, *grande* = gran, importante: *um grande homem*. Detrás sería «un hombre alto». Y en "
   "portugués no se apocopa: nunca «gran».")
ch(19, 1, AP, "Ele não tem dinheiro nenhum: é um ___.", ["homem pobre", "pobre homem", "pobre de homem"],
   "homem pobre",
   "Detrás, *pobre* = sin plata: *um homem pobre*. Delante, *um pobre homem* es «un pobre hombre», "
   "digno de lástima, aunque sea rico.")
ch(19, 1, AP, "«Certo dia, o João sumiu.» «Certo» quiere decir…", ["un, cierto (día)", "correcto", "seguro"],
   "un, cierto (día)",
   "Delante del sustantivo, *certo* = cierto, alguno: *certo dia*, *certas pessoas*. Detrás, "
   "«correcto»: *a resposta certa*.", prompt=SG)
tr(19, 1, AP, "Lucas es un viejo amigo mío.",
   _x(["O Lucas", "Lucas"], [" é um velho amigo meu", " é meu velho amigo", " é um velho amigo"]),
   "Algunos adjetivos cambian de sentido según el lugar: delante, *um velho amigo* es un amigo de hace años; detrás, *um amigo velho* es un amigo de edad. Como en castellano «viejo amigo».")
tr(19, 1, AP, "Fue un gran error.",
   _x(["Foi", "Isso foi"], " um grande erro"),
   "«Gran» es *grande*, siempre entero: *um grande erro*, *uma grande ideia*. Delante valora.")
fx(22, None, AP, "O Pelé foi um gran jogador.", "gran", "grande", "espanol",
   "El portugués no acorta *grande*: *um grande jogador*. «Gran» es español.")
ch(22, None, AP, "«Ela é uma velha amiga.» Quiere decir que…",
   ["se conocen hace años", "es una amiga anciana", "ya no son amigas"], "se conocen hace años",
   "Delante, *velho* = de hace mucho: *uma velha amiga*. «Una amiga anciana» sería *uma amiga velha* "
   "(o, más amable, *uma amiga idosa*).", prompt=SG)
tr(26, None, AP, "Llegaste justo a tiempo.",
   _x(["Você chegou", "Chegou", "Você chegou bem", "Chegou bem"], [" na hora certa", " no momento certo", " na hora", " a tempo"]),
   "*certo* detrás = el justo, el correcto: *na hora certa*. Delante sería «cierto»: *certa hora* = a "
   "cierta hora.")
ch(26, None, AP, "«Foi um simples erro.» Quiere decir que fue…",
   ["un mero error, nada más", "un error fácil de entender", "un error de una persona simple"],
   "un mero error, nada más",
   "Delante, *simples* = mero: *um simples erro*. Detrás describe: *um erro simples* (fácil de "
   "arreglar).", prompt=SG)

# ===========================================================================
# Indefinidos: qualquer, cada, outro, vários, certo; tudo / todo
# ===========================================================================
ch(20, 0, IN, "___ pessoa pode entrar.", ["Qualquer", "Qualquier", "Cualquer"], "Qualquer",
   "*qualquer*: con *qu* y sin *i* final. No cambia de género: *qualquer homem*, *qualquer mulher*.")
cl(20, 0, IN, "___ um paga o seu, tá?", "Cada",
   "*cada* no varía: *cada um*, *cada uma*, *cada dia*. Igual que en español.")
tr(20, 0, IN, "Quiero otra cerveza.",
   _x(["Quero", "Eu quero"], [" outra cerveja", " mais uma cerveja"]),
   "*outro / outra* concuerda y va sin *um*, como en español: *outra cerveja*. En el bar se dice "
   "mucho *mais uma*.")
fx(20, 0, IN, "Já fui a Salvador vários vezes.", "vários", "várias", "concordancia",
   "*vários / várias* concuerda con el sustantivo: *vez* es femenino, *várias vezes*.")
ch(20, 0, IN, "Estamos à disposição para ___ dúvidas.", ["quaisquer", "qualquers", "qualquer"], "quaisquer",
   "El plural de *qualquer* es *quaisquer*: cambia en el medio (*qual → quais*). «Qualquers» no "
   "existe y «qualquer dúvidas» es error de concordancia.")
cl(20, 0, TT, "___ bem? — ___ ótimo!", "Tudo | Tudo",
   "Sin sustantivo, «todo» es *tudo*, invariable: *tudo bem*, *tudo ótimo*. *todo* va con "
   "sustantivo.")
cl(20, 0, TT, "Ela sabe ___ sobre futebol.", "tudo",
   "«Sabe todo» = *sabe tudo*: no hay sustantivo detrás. *todo* necesita uno (*todo o time*).")
tr(20, 0, TT, "Me comí todo.",
   _x(["Comi", "Eu comi"], " tudo"),
   "«todo» sin sustantivo = *tudo*. Y sin «me»: *comi tudo* (el portugués no usa ese «me» enfático).")
fx(20, 0, TT, "Tudo os meus amigos foram ao show.", "Tudo", "Todos", "concordancia",
   "Delante de sustantivo, *todo / toda / todos / todas*, que concuerda: *todos os meus amigos*. "
   "*tudo* va solo.")
ch(20, 0, TT, "Vou à academia ___: segunda, terça, quarta…", ["todo dia", "tudo dia", "todo o dia"],
   "todo dia",
   "*todo dia* (sin artículo) = todos los días. *todo o dia* = el día entero. *tudo dia* no existe.")
ch(20, 0, TT, "Choveu ___, de manhã até a noite.", ["o dia todo", "tudo o dia", "todo dia"], "o dia todo",
   "Con artículo, *todo* habla del día entero: *o dia todo* o *todo o dia*. Sin artículo, *todo dia* es «todos los días»: el artículo cambia el sentido.")
tr(20, 0, TT, "Todo el mundo vino.",
   ["Todo mundo veio", "Veio todo mundo", "Todos vieram", "Vieram todos"],
   "En Brasil «todo el mundo» se dice *todo mundo*, sin artículo, y lleva el verbo en singular porque el núcleo es *mundo*. Con *todos*, el verbo va en plural.")
ch(22, None, IN, "Me liga a ___ hora, tô em casa.", ["qualquer", "cualquer", "quaisquer"], "qualquer",
   "*qualquer hora*: en singular, *qualquer*. *quaisquer* es el plural, y va con plural: *quaisquer "
   "horas* (raro).")
fx(22, None, TT, "Todo está pronto para a festa.", "Todo", "Tudo", "espanol",
   "Sin sustantivo, *tudo*: *tudo está pronto*. «Todo» solo es el español.")
tr(23, None, IN, "Cualquier cosa, me llamás.",
   _x("Qualquer coisa", ["", ","], [" me liga", " me ligue", " você me liga", " liga pra mim", " é só me ligar"]),
   "*qualquer coisa* es la fórmula de despedida; *me liga* (habla). Con *qu*: nunca «cualquer».")
cl(23, None, IN, "Me dá ___ (otro) pão de queijo?", "outro",
   "*outro* va sin *um*, como en español: *outro pão de queijo*. Concuerda: *outra coxinha*.",
   alt=["mais um"])
cl(26, None, TT, "Ele acha que sabe ___, mas não sabe nada.", "tudo",
   "Sin sustantivo, *tudo*. Igual que *nada*, es invariable.")
tr(26, None, TT, "Como acá todos los días.",
   _x(["Eu como", "Como"], " aqui ", ["todo dia", "todos os dias"]) + _x(["Todo dia", "Todos os dias"], ["", " eu"], " como aqui"),
   "«Todos los días» = *todo dia* (habla) o *todos os dias*. Ojo: *todo o dia* es «el día entero».")
fx(26, None, IN, "Visitei vários cidades do Nordeste.", "vários", "várias", "concordancia",
   "*cidade* es femenino: *várias cidades*. *vários* concuerda como cualquier adjetivo.")
fx(39, None, TT, "Já entendi todo, obrigado.", "todo", "tudo", "espanol",
   "Sin sustantivo detrás, *tudo*: *entendi tudo*. «Entendí todo» empuja al calco.")
tr(39, None, TT, "Estudié toda la noche.",
   _x(["Estudei", "Eu estudei"], [" a noite toda", " a noite inteira", " toda a noite"]),
   "«toda la noche» = *a noite toda* o *toda a noite* (el período entero). *toda noite* sería «cada "
   "noche».")
ch(39, None, IN, "Esse remédio se vende em ___ farmácia.", ["qualquer", "quaisquer", "cualquier"], "qualquer",
   "*qualquer farmácia*: singular. *quaisquer* solo va con plural (*quaisquer farmácias*).")

# ===========================================================================
# Diminutivo de todos los días
# ===========================================================================
cl(12, 3, DM, "Vamos tomar um ___ (café, diminutivo)?", "cafezinho",
   "*café* termina en vocal tónica: *-zinho*. *cafezinho*, nunca «cafecito».")
ch(12, 3, DM, "Só um ___, já volto!", ["minutinho", "minutito", "minutozinho"], "minutinho",
   "*minuto* termina en *-o* átona: se cambia por *-inho*, *minutinho*. «-ito» es español.")
fx(12, 3, DM, "Volto rapidito, tá?", "rapidito", "rapidinho", "espanol",
   "El diminutivo portugués es *-inho*: *rapidinho* (enseguida). «-ito» no existe.")
cl(12, 3, DM, "Quero um ___ (pão, diminutivo) com manteiga.", "pãozinho",
   "*pão* termina en nasal: *-zinho*, *pãozinho*. En plural, *pãezinhos* (lo vas a ver en la 44).")
tr(12, 3, DM, "Esperame un minutito.",
   _x(["Me espera", "Me espere", "Espera", "Espere"], [" um minutinho", " um pouquinho"]),
   "*minutinho* con *-inho*; el imperativo del habla lleva el pronombre adelante: *me espera*.")
cl(14, None, DM, "Moro ___ (perto, diminutivo) da praia.", "pertinho",
   "El diminutivo también va con adverbios: *pertinho* (cerquita), *cedinho*, *agorinha*.")
ch(14, None, DM, "casa → ___", ["casinha", "casita", "casazinha"], "casinha",
   "*casa* termina en *-a* átona: se cambia por *-inha*. *-zinha* es tras vocal tónica o nasal "
   "(*cafezinho*, *pãozinho*).")
tr(16, None, DM, "¿Me hacés un favorcito?",
   _x(["Me faz um favorzinho", "Você me faz um favorzinho", "Faz um favorzinho pra mim",
       "Faz um favorzinho para mim"]),
   "*favor* termina en *-r*: *-zinho*, *favorzinho*. El diminutivo suaviza el pedido.")

# ===========================================================================
# Pronombre entre auxiliar y verbo (habla de Brasil)
# ===========================================================================
fx(17, None, PR, "Te vou mandar a foto amanhã.", "Te vou mandar", "Vou te mandar", "colocacao",
   "Con *vou* + infinitivo, en Brasil el pronombre va entre los dos: *vou te mandar*. «Te vou» no se "
   "oye en Brasil. *vou mandar-te* es de Portugal.", goodAlt=["Vou mandar-te"])
ch(17, None, PR, "___ esperando na portaria.", ["Estou te", "Te estou", "Estou-te"], "Estou te",
   "*estou te esperando*: el pronombre, entre el auxiliar y el gerundio, sin guion. «Estou-te» es de "
   "Portugal.", prompt=HB)
tr(21, None, PR, "Ya te había dicho que iba a llover.",
   _x(["Eu já ", "Já "], ["tinha te dito", "tinha te falado", "te tinha dito", "te tinha falado"],
      " que ia chover"),
   "Con *tinha* + participio, en Brasil lo más común es *tinha te dito*; con *já* o *eu* delante, "
   "*te tinha dito* también vale. Nunca detrás del participio («tinha dito-te»).")
tr(24, None, PR, "Te estoy esperando en la puerta.",
   _x(["Estou te esperando", "Eu estou te esperando", "Tô te esperando", "Eu tô te esperando",
       "Estou esperando você", "Eu estou esperando você", "Tô esperando você", "Eu tô esperando você"],
      " na porta"),
   "*estou te esperando*: el pronombre entre *estou* y el gerundio. «Te estou» no se oye en Brasil.")

# ===========================================================================
# Colocación formal: con sujeto expreso, próclise aceptada
# ===========================================================================
ch(33, 0, CL, "Texto formal, al empezar la oración: «___ que o prazo terminou.»",
   ["Informaram-me", "Me informaram", "Informaram me"], "Informaram-me",
   "Sin sujeto delante y al comienzo, la norma pide ênclise: *Informaram-me*, con guion. «Me "
   "informaram» es del habla.", prompt=EF)
ch(33, 0, CL, "Texto formal: «O governo ___ que o prazo terminou.» ¿Qué vale?",
   ["las dos: nos informou / informou-nos", "solo informou-nos", "solo nos informou"],
   "las dos: nos informou / informou-nos",
   "Con sujeto expreso delante, la norma brasileña acepta la próclise (*O governo nos informou*), y es "
   "lo más común en la prensa. La ênclise también vale. Lo obligatorio es la ênclise al empezar.",
   prompt=CE)
ch(36, None, CL, "Texto formal: «___ que a reunião foi adiada.»",
   ["Comunicaram-nos", "Nos comunicaram", "Comunicaram nos"], "Comunicaram-nos",
   "La oración empieza con el verbo: ênclise con guion, *Comunicaram-nos*. Con sujeto delante sí "
   "valdría *A diretora nos comunicou*.", prompt=EF)
fx(36, None, CL, "Ontem, me disseram que o contrato foi assinado.", "me disseram", "disseram-me",
   "colocacao",
   "Tras pausa (la coma), sin sujeto ni atractor delante, la norma pide ênclise: *Ontem, disseram-me*. "
   "Con sujeto sí vale la próclise: *Ontem, o diretor me disse*.", prompt=FXF)
tr(49, None, CL, "La directora me comunicó el resultado ayer.",
   _x(["A diretora "], ["me comunicou", "comunicou-me"], " o resultado ontem")
   + _x(["Ontem a diretora ", "Ontem, a diretora "], ["me comunicou", "comunicou-me"], " o resultado"),
   "Con sujeto delante (*a diretora*), la norma brasileña acepta *me comunicou*; *comunicou-me* "
   "también vale. Sin sujeto y al empezar, solo ênclise: *Comunicou-me*.", prompt=TRF)

# ===========================================================================
# que + sustantivo; «Que lindo!»
# ===========================================================================
fx(8, 0, IQ, "Qué linda essa praia!", "Qué", "Que", "ortografia",
   "Para exclamar, *que* sin tilde: *Que linda!*, *Que calor!* La tilde de «¡Qué…!» es del español.")
ch(8, 0, IQ, "___ horas são?", ["Que", "Qué", "Quais"], "Que",
   "*que* + sustantivo = «qué»: *Que horas são?* Sin tilde. *Quais horas* no se dice.")
tr(8, 0, IQ, "¡Qué calor!",
   ["Que calor", "Nossa, que calor", "Que calor que está", "Está muito calor", "Está muito quente",
    "Faz muito calor"],
   "Exclamativo: *que* + sustantivo, sin tilde: *Que calor!* Igual *Que saudade!*, *Que sorte!*")
cl(10, None, IQ, "___ saudade da minha família!", "Que",
   "Exclamativo: *Que* + sustantivo, sin tilde. *Que saudade!* es de las frases más brasileñas que hay.")
fx(12, None, IQ, "Qué bom que você veio!", "Qué", "Que", "ortografia",
   "*Que bom!* sin tilde: en portugués el exclamativo *que* no se acentúa. Solo *quê* al final lleva "
   "circunflejo (*O quê?*).")

# ===========================================================================
# Ordinales y fracciones
# ===========================================================================
ch(7, 0, NU, "Moro no ___ andar.", ["terceiro", "tercer", "três"], "terceiro",
   "Ordinal entero: *terceiro* (y *primeiro*). «Tercer» y «primer» son apócopes del español que el "
   "portugués no tiene.")
cl(7, 0, NU, "É a ___ (1.ª) vez que estou no Brasil.", "primeira",
   "El ordinal concuerda: *a primeira vez*, *o primeiro dia*.")
tr(7, 0, NU, "La mitad de la pizza es mía.",
   ["A metade da pizza é minha", "Metade da pizza é minha"],
   "«La mitad» se dice *a metade*, con *-de* como en *cidade*; nunca «mitade». *O meio* no es la mitad de una cantidad sino el centro de algo.")
fx(7, 0, NU, "São Paulo tem doze milhões pessoas.", "milhões pessoas", "milhões de pessoas", "preposicion",
   "*milhão* es sustantivo y pide *de*: *doze milhões de pessoas*, como en español.")
ch(7, 0, NU, "1/3 do bolo:", ["um terço", "um tercio", "um terceiro"], "um terço",
   "La fracción es *um terço*; *terceiro* es el ordinal (*o terceiro andar*). *um quarto* sirve para "
   "las dos.")
cl(9, None, NU, "O banheiro fica no ___ (2.º) andar.", "segundo",
   "Ordinal: *segundo andar*. Ojo: en Brasil la planta baja es el *térreo*, y el *primeiro andar* es "
   "el de arriba.")
tr(9, None, NU, "Es la tercera calle a la derecha.",
   _x("É a terceira rua ", ["à direita", "na direita", "do lado direito"]),
   "*terceira* concuerda con *rua*. «A la derecha» = *à direita* (en el habla también *na direita*).")
cl(13, 2, NU, "A ___ dos alunos é argentina.", "metade",
   "«La mitad» = *a metade*: con *e* (no «mitade»). *meio* es «medio» (*meio quilo*).")
fx(13, 2, NU, "Moro no tercer andar, perto do metrô.", "tercer", "terceiro", "espanol",
   "En portugués no hay apócope: *terceiro andar*, *primeiro dia*. «Tercer» es del español.")
