# -*- coding: utf-8 -*-
"""Sintaxis: preguntas, conectores, subordinadas, relativas, concordancia,
cohesión y orden (auditoría de gramática 2026-10, área 3 del portugués).
Prefijo de los ids: gr3-<semana>-<n>.

Lo que la auditoría marcó como «falta», «flojo» o «mejorable», resuelto con
bloques de lección nuevos o corregidos y con ítems de PRODUCCIÓN que
vuelven espaciados, mezclados con lo que compite:

 1. Preguntar como en Brasil (entonación sola, «é que», interrogativo al
    final, né?): bloque nuevo en la lección 8; ítems en 8, 20, 38 y 46.
    (Las traducciones con «é que» de 8, 11, 14, 38 y 46 ya están en
    construcciones_c.py.)
 2. Contestar con el verbo: tip en la lección 5 (bloque «Você y vocês»);
    dos choice de contraste en la 5 (los cloze ya están en
    construcciones_c.py).
 3. Tema adelante (Esse livro, eu já li) y orden S-V: bloque nuevo en la
    lección 38; ítems en 38, 40 y 49.
 4. Conectores básicos (mas, então, por isso) y porque / por que / por
    quê: tip en la lección 8; ítems en 8, 13, 26 y 38.
 5. Consecutivas (tão… que, tanto… que, de modo que): bloque nuevo en la
    lección 34; ítems en 34, 39 y 47.  Duelo nuevo «indicativo o
    subjuntivo según el conector» (semana 24) en docs/lang/pt/duelli_data.js.
    El mensaje sobre «apesar de que» quedó unificado en 24 y 47.
 6. desde que (condición + subjuntivo / tiempo + indicativo): 24, 26 y 39.
    (contanto que y a não ser que en 24 y 26 ya están en gramatica_1.py.)
 7. cujo: tip de registro en la lección 25; repaso en 26, 39 y 48.
 8. Concordancia verbal (sujeto compuesto, a maioria, porcentajes, mais de
    um, sujeto pospuesto, fui eu que): bloque nuevo en la lección 40; ítems
    en 40, 51 y 52.
 9. Concordancia nominal: obrigada (tip en la 4), meio / meia y bastante
    (bloque nuevo en la 20), é proibido entrada / é proibida a entrada
    (tip en el bloque nuevo de la 40); ítems en 4, 20, 22, 40 y 51.
10. Cohesión (isso, tal, o primeiro / o segundo, elipsis, «o mesmo»):
    lección 40, bloque «Sin repetir», ampliado; ítems en 40, 47 y 48.
11. Hendidas y «é que» enfático (foi a Bia que, o que eu quero é, eu é
    que não vou): bloque nuevo en la lección 38; ítems en 38, 40, 47 y 49.

Cada ítem va en una semana en la que su gramática ya se explicó; «part» es
la parte de la lección de esa semana (None: la última).
Respuestas de dos huecos: «a | b».
"""
import itertools

TR = "Traducí al portugués."
TRC = "Traducí al portugués coloquial de Brasil."
CO = "Completá."
CV = "Completá con la forma correcta del verbo entre paréntesis."
CW = "Completá con la forma correcta de la palabra entre paréntesis."
CE = "Elegí la forma correcta."
EL = "Elegí la respuesta adecuada."
SG = "Elegí el significado."
HB = "Elegí cómo se dice en el habla de Brasil."
EF = "Elegí la versión formal."
NC = "Elegí la forma de la norma culta."
CH = "Completá como en el habla de Brasil."
RW = "Reescribí la frase manteniendo el sentido: escribí solo lo que falta en el hueco."
CB = "Uní las frases en una sola usando el conector entre paréntesis."
CART = "Elegí la forma correcta para el cartel."
FX = "Encontrá el error: tocá lo que está mal y corregilo."
FXF = "Texto formal. Encontrá el error: tocá la palabra que está mal y corregila."
COHE = "Elegí la forma que retoma el término sin repetirlo."

T_PREG = "preguntar como en Brasil"
T_RESP = "contestar a la brasileña"
T_TEMA = "orden: el tema adelante"
T_CONE = "conectores: mas, porque, por que, por quê"
T_CONS = "consecutivas: tão… que, tanto… que"
T_DESDE = "desde que: condición o tiempo"
T_CUJO = "cujo"
T_CONC = "concordancia verbal"
T_NOM = "concordancia nominal: obrigada, meio, bastante, proibido"
T_COHE = "cohesión: isso, tal, o primeiro"
T_DEST = "destacar: foi… que, o que… é, eu é que"

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


def _add(w, part, typ, prompt, stem, answer, note, topic, alt=None, **extra):
    _N[w] = _N.get(w, 0) + 1
    seen, alts = {answer.rstrip(".?!")}, []
    for a in alt or []:
        k = a.rstrip(".?!")
        if a and k not in seen:
            seen.add(k)
            alts.append(a)
    d = dict(id="gr3-%d-%02d" % (w, _N[w]), w=w, level=_level(w), type=typ, topic=topic,
             prompt=prompt, stem=stem, answer=answer, alt=alts, note=note)
    if part is not None:
        d["part"] = part
    if "formal" in prompt and typ == "translate":
        d["registro"] = "formal"
    d.update(extra)
    ITEMS.append(d)
    return d


def tr(w, part, stem, variants, note, topic, prompt=TR):
    return _add(w, part, "translate", prompt, stem, variants[0], note, topic, variants[1:])


def cl(w, part, stem, answer, note, topic, alt=None, prompt=CO):
    assert "___" in stem, stem
    return _add(w, part, "cloze", prompt, stem, answer, note, topic, alt)


def ch(w, part, stem, options, answer, note, topic, prompt=CE):
    assert answer in options and len(set(options)) == len(options), stem
    return _add(w, part, "choice", prompt, stem, answer, note, topic, options=options)


def cb(w, part, stem, variants, note, topic):
    return _add(w, part, "combina", CB, stem, variants[0], note, topic, variants[1:])


def fx(w, part, stem, bad, good, cat, note, topic, prompt=FX):
    assert stem.count(bad) == 1, (stem, bad)
    return _add(w, part, "fixerr", prompt, stem, stem.replace(bad, good, 1), note, topic,
                bad=bad, good=good, cat=cat)


# ===========================================================================
# Semana 4 · obrigado / obrigada (tip en la lección, bloque «Describir a
# alguien»)
# ===========================================================================
ch(4, 2, "Una chica le agradece al mozo. ¿Qué dice?",
   ["Obrigada!", "Obrigado!", "Obrigadas!"], "Obrigada!",
   "*obrigado* es un adjetivo («agradecido») y concuerda con **quien habla**: la mujer dice "
   "*obrigada*, el hombre *obrigado*. No depende de a quién se le agradece.",
   T_NOM, prompt=EL)


# ===========================================================================
# Semana 5 · Contestar con el verbo (tip en el bloque «Você y vocês»)
# ===========================================================================
SIM = ("En Brasil se contesta repitiendo el verbo, conjugado para quien contesta; un *sim* "
       "solo suena seco. ")
ch(5, 0, "— Você gosta de açaí? Contestá que sí, como en Brasil.",
   ["Gosto!", "Sim.", "Gosta!"], "Gosto!",
   SIM + "La pregunta va con *você* (*gosta*), pero vos contestás por vos: *gosto*. "
   "Repetir *gosta* tal cual es el error típico.", T_RESP, prompt=EL)
ch(5, 0, "— Vocês moram aqui? Contestás por los dos, que sí, como en Brasil.",
   ["Moramos, sim.", "Sim.", "Sim, moram."], "Moramos, sim.",
   SIM + "A *vocês moram?* se contesta *moramos* (o *a gente mora*): el verbo pasa a la "
   "persona de quien responde. *Sim* puede ir al final, como refuerzo.", T_RESP, prompt=EL)


# ===========================================================================
# Semana 8 · Preguntar como en Brasil (bloque nuevo, parte 0) y conectores
# ===========================================================================
W = 8
ch(W, 0, "«¿Venís mañana?»",
   ["Você vem amanhã?", "Vem você amanhã?", "É que você vem amanhã?"], "Você vem amanhã?",
   "La pregunta de sí o no es la misma frase con tono de pregunta: no se da vuelta sujeto y "
   "verbo («vem você» suena a traducción) ni se agrega *é que*, que va solo detrás de una "
   "palabra de pregunta.", T_PREG)
ch(W, 0, "¿Cuál es la pregunta con «é que» bien armada?",
   ["O que é que você quer?", "O que é que quer você?", "O que você é que quer?"],
   "O que é que você quer?",
   "*é que* va pegado a la palabra de pregunta y después viene sujeto + verbo, en el orden de "
   "siempre: *o que é que você quer?* Es relleno: «¿qué querés?», no «¿qué es que…?».",
   T_PREG)
ch(W, 0, "Querés que te confirmen algo: «Sos argentino, ¿no?»",
   ["Você é argentino, né?", "Você é argentino, viu?", "Você é argentino, no?"],
   "Você é argentino, né?",
   "Para pedir que te confirmen: *né?* (o *não é?*). El «¿viste?» porteño no es *viu?*: en "
   "Brasil *viu?* remata un aviso o un pedido (*se cuida, viu?*). Y «no» es castellano.",
   T_PREG)
ch(W, 0, "— Vou vender o carro. Te sorprende: ¿qué preguntás?",
   ["Você vai vender o quê?", "Você vai vender o que?", "Você vai vender qué?"],
   "Você vai vender o quê?",
   "Para la sorpresa (o para que te repitan), la palabra de pregunta va al final: *você vai "
   "vender o quê?* Al final de la frase, *quê* lleva circunflejo.", T_PREG)
cl(W, 0, "O que você quer? → O que ___ você quer? (como en el habla)", "é que",
   "En el habla, detrás de la palabra de pregunta va *é que*, y el resto no cambia: *o que é "
   "que você quer?* No se traduce: es «¿qué querés?».", T_PREG, prompt=RW)
cl(W, 0, "— Vou morar em Manaus. — Você vai morar ___?! (sorpresa: ¿dónde?)", "onde",
   "La palabra de pregunta al final muestra sorpresa: *você vai morar onde?* Con *morar* "
   "(estar en un lugar) va *onde*; *aonde* es para ir hacia un lugar.", T_PREG)
cl(W, 0, "— Vou comer um sanduíche de 40 reais. — Você vai comer ___?! (no lo podés creer)",
   "o quê",
   "Al final de la pregunta, «qué» es *o quê*, con circunflejo: *você vai comer o quê?* "
   "Sin tilde (*o que*) solo va al principio: *o que você vai comer?*", T_PREG,
   alt=["quê"])
cl(W, 0, "Você é de Rosário, ___? (pedís que te lo confirmen)", "né",
   "*né?* (de *não é?*) pide confirmación, como «¿no?» o «¿cierto?». *não é?* entero también "
   "vale, y suena un poco más cuidado; *não?* solo, también.", T_PREG, alt=["não é", "não"])
tr(W, 0, "¿Venís a la fiesta? (pregunta de sí o no)",
   _x(["Você vem", "Você vai", "Cê vem", "Cê vai"], [" à festa", " pra festa", " para a festa"], "?"),
   "La pregunta de sí o no no invierte nada: *você vem à festa?*, con el sujeto adelante y el "
   "tono de pregunta. «Vem você à festa?» suena a libro viejo o a traducción.", T_PREG)
cl(W, 1, "Moro em Buenos Aires, ___ trabalho em Montevidéu. (pero)", "mas",
   "«pero» es *mas* (sin i): *pero* no existe en portugués, y *mais* (con i) es «más». "
   "*mas* va al principio de su oración, con coma delante. *porém* también vale, pero es más formal.", T_CONE,
   alt=["porém", "só que"])
tr(W, 1, "Estoy cansado, por eso me quedo en casa.",
   _x(["Estou", "Eu estou", "Tô"], " cansado, ", ["por isso", "então"], " ", ["", "eu "], "fico em casa"),
   "«por eso» es *por isso* (por + isso, separado); «entonces, así que», *então*. Y "
   "«quedarse» es *ficar*, sin *me*: *fico em casa*.", T_CONE)


# ===========================================================================
# Semana 13 · Jefe A2: porque / por que / por quê vuelven
# ===========================================================================
W = 13
cl(W, 1, "— Você não vem amanhã? ___? (¿por qué?, sola al final)", "Por quê",
   "Sola o al final de la frase, antes del signo de pregunta, va separada y con circunflejo: "
   "*por quê?* Al principio de la pregunta, sin tilde: *por que você não vem?*", T_CONE,
   alt=["por quê"])
cl(W, 1, "Não sei ___ ele está bravo. (por qué, en el medio de la frase)", "por que",
   "La pregunta indirecta (*não sei por que…*) se escribe como la directa: separado y sin "
   "tilde. *porque* junto es la respuesta: *porque está cansado*.", T_CONE)


# ===========================================================================
# Semana 20 · meio / bastante (bloque nuevo, parte 0) y preguntas de vuelta
# ===========================================================================
W = 20
cl(W, 0, "A Sofía ficou ___ chateada com a notícia. (medio)", "meio",
   "Delante de un adjetivo, *meio* es adverbio («un poco») y no cambia: *meio chateada*, "
   "aunque sea ella. *meia* va solo con sustantivos: *meia hora*.", T_NOM)
cl(W, 0, "Bebi ___ garrafa de água no almoço. (media)", "meia",
   "Delante de un sustantivo femenino, *meio* concuerda: *meia hora*, *meia garrafa*, "
   "*meio-dia e meia*. Delante de adjetivo, en cambio, *meio* no cambia.", T_NOM)
fx(W, 0, "A Bia está meia cansada hoje.", "meia", "meio", "concordancia",
   "*meio* + adjetivo no concuerda: *meio cansada*. «Meia cansada» se oye mucho, pero es error: "
   "*meia* va con sustantivos (*meia hora*).", T_NOM)
ch(W, 0, "Tem ___ opções no cardápio. (texto escrito)",
   ["bastantes", "bastante", "bastante de"], "bastantes",
   "Delante de un sustantivo, *bastante* es adjetivo y en lo escrito concuerda: *bastantes "
   "opções*. En la charla se oye invariable. Como adverbio no cambia: *elas falam bastante*. "
   "Nunca «bastante de».", T_NOM, prompt="Elegí la forma de la norma escrita.")
tr(W, 1, "¿Por qué no viniste ayer? (como en el habla, con «é que»)",
   _x(["Por que é que ", "Por que foi que "], ["você ", "cê "], "não veio ontem?"),
   "La pregunta del habla mete *é que* (o *foi que*, en pasado) detrás de *por que*, que va "
   "separado y sin tilde al principio. Después, sujeto + verbo: *você não veio*.", T_PREG)
cl(W, 1, "— Paguei 50 reais num café. — Você pagou ___?! (sorpresa: ¿cuánto?)", "quanto",
   "La palabra de pregunta al final muestra sorpresa o pide que repitan: *você pagou "
   "quanto?* Es muy de la charla; la pregunta neutra es *quanto você pagou?*", T_PREG)


# ===========================================================================
# Semana 22 · meia, de vuelta
# ===========================================================================
cl(22, None, "O jogo começa ao meio-dia e ___. (12:30)", "meia",
   "*meia* es «media hora»: concuerda con *hora*, aunque no se diga. Por eso *meio-dia e "
   "meia* y *meia-noite e meia*; *meio* solo queda delante de adjetivos (*meio cansado*).",
   T_NOM)


# ===========================================================================
# Semana 24 · desde que: condición (subjuntivo) o tiempo (indicativo)
# ===========================================================================
W = 24
DESDE = ("*desde que* tiene dos caras: con subjuntivo es condición («siempre que, con tal de "
         "que»); con indicativo es tiempo («desde que»). ")
ch(W, 1, "«Podés ir, siempre que vuelvas temprano.» Pode ir, desde que ___ cedo.",
   ["volte", "volta", "volva"], "volte",
   DESDE + "Acá es condición: subjuntivo, *volte*. «Volva» es el calco de «vuelvas».", T_DESDE)
ch(W, 1, "«Desde que llegué, no para de llover.» Desde que ___, só chove.",
   ["cheguei", "chegue", "chego"], "cheguei",
   DESDE + "Acá es tiempo (desde el momento en que llegué): indicativo, *cheguei*.", T_DESDE)
cl(W, 1, "Te empresto a bicicleta, desde que você ___ (cuidar) bem dela.", "cuide",
   DESDE + "Es una condición: *desde que você cuide*. *cuidar de*: *cuidar bem dela*.",
   T_DESDE, prompt=CV)
cl(W, 1, "Moramos em Niterói desde que ___ (casar). (casarse, nosotros)", "casamos",
   DESDE + "Acá marca desde cuándo: indicativo, *desde que casamos* (o *nos casamos*). "
   "Si arrancás con *a gente*, seguí igual: *a gente mora… desde que a gente casou*.", T_DESDE, alt=["nos casamos"], prompt=CV)


# ===========================================================================
# Semana 26 · Jefe B1: desde que, cujo, porque
# ===========================================================================
W = 26
cl(W, 1, "Desde que eu ___ (mudar) pra cá, durmo melhor. E você pode ficar, desde que ___ "
   "(ajudar) com as contas.", "mudei | ajude",
   DESDE + "Primero, tiempo (*desde que mudei*, ya pasó); después, condición (*desde que "
   "ajude*, siempre que ayudes).", T_DESDE, alt=["me mudei | ajude"], prompt=CV)
tr(W, 1, "Podés usar mi computadora, siempre que la apagues después.",
   _x("Você pode usar ", ["o meu", "meu"], " computador, ", ["desde que", "contanto que"], " ",
      ["o desligue", "desligue ele", "você o desligue", "você desligue ele", "desligue", "você desligue"], " depois"),
   "«siempre que» de condición es *desde que* o *contanto que*, con subjuntivo: *desligue*. "
   "Ojo con el género: *o computador* es masculino, así que se retoma con *o* (o *ele*, "
   "en el habla, o nada: *desde que desligue depois*).", T_DESDE)
cl(W, 1, "O bairro ___ moradores reclamaram do barulho fica perto do centro.", "cujos",
   "*cujo* concuerda con lo poseído (*moradores*: masculino plural), no con el poseedor: "
   "*cujos moradores*. Sin artículo detrás: nunca «cujos os».", T_CUJO)
cl(W, 1, "A cantora ___ voz você ouviu no rádio é baiana.", "cuja",
   "*cuja* porque lo poseído es *voz* (femenino). En la charla se evita (*a cantora que "
   "você ouviu a voz dela*); escribiendo, *cuja*.", T_CUJO)
cl(W, 1, "___ você não me ligou ontem? — ___ o meu celular quebrou.", "Por que | Porque",
   "La pregunta va separada y sin tilde (*por que*); la respuesta, junta (*porque*). Igual "
   "que en castellano, pero sin tilde en la pregunta.", T_CONE, alt=["por que | porque"])
cl(W, 1, "Ela foi embora e ninguém sabe o ___. (el motivo)", "porquê",
   "Con artículo es sustantivo, «el porqué»: *o porquê*, junto y con circunflejo. *Por quê* "
   "separado es la pregunta al final de la frase.", T_CONE)


# ===========================================================================
# Semana 34 · Consecutivas (bloque nuevo, parte 1)
# ===========================================================================
W = 34
TAO = ("*tão* va con adjetivos y adverbios (*tão cansado*, *tão rápido*); *tanto* con verbos "
       "(*choveu tanto*), y *tanto, tanta, tantos* con sustantivos (*tanta gente*). ")
cl(W, 1, "Choveu ___ que a rua alagou.", "tanto",
   TAO + "Acá modifica a un verbo (*choveu*): *tanto*, invariable.", T_CONS)
cl(W, 1, "Estava ___ cansado que dormi no ônibus.", "tão",
   TAO + "Delante de adjetivo, *tão*: «tan» con til y o final. «Tanto cansado» es error.",
   T_CONS)
cb(W, 1, "Saí cedo. Cheguei a tempo. (de modo que)",
   _x("Saí cedo", [", ", " "], ["de modo que", "de forma que"], " ", ["", "eu "], "cheguei a tempo"),
   "*de modo que* + indicativo presenta la consecuencia: «así que». Con subjuntivo sería "
   "finalidad (*de modo que todos ouçam*).", T_CONS)
cb(W, 1, "O show estava muito cheio. Não conseguimos entrar. (tão… que)",
   _x("O show estava tão cheio que ", ["não conseguimos", "a gente não conseguiu", "nós não conseguimos"], " entrar"),
   "*tão* + adjetivo + *que* + consecuencia en indicativo: *tão cheio que não conseguimos "
   "entrar*. El *muito* se va: «tão muito» no existe.", T_CONS)
fx(W, 1, "Ele falou tanto rápido que ninguém entendeu.", "tanto", "tão", "espanol",
   TAO + "*rápido* acá es adverbio: *tão rápido*. «Tanto rápido» mezcla los dos.", T_CONS)


# ===========================================================================
# Semana 38 · Tema adelante, destacar, preguntas y porque de vuelta
# (bloques nuevos 7 y 8, parte 3)
# ===========================================================================
W = 38
TEMA = ("Al hablar, el brasileño pone el tema adelante y lo comenta después; lo escrito vuelve "
        "al orden de siempre, sujeto + verbo + complemento. ")
ch(W, 3, "«Ese libro ya lo leí.»", ["Esse livro, eu já li.", "Esse livro, já li-o.",
                                   "Esse livro, eu já lo li."], "Esse livro, eu já li.",
   TEMA + "El castellano repite el pronombre («**lo** leí»); en Brasil el hueco queda vacío: "
   "*esse livro, eu já li*. Con *já* delante, nunca *li-o*.", T_TEMA, prompt=HB)
ch(W, 3, "«Já li esse livro» y «Esse livro, eu já li»: ¿cuál va en un informe?",
   ["Já li esse livro.", "Esse livro, eu já li.", "Esse livro, eu já li ele."],
   "Já li esse livro.",
   TEMA + "El tema suelto adelante (y más con *ele* repetido) es de la charla. En un texto "
   "formal: *já li esse livro*.", T_TEMA, prompt="Elegí la forma de la escritura formal.")
ch(W, 3, "A minha irmã, ela mora em Recife.",
   ["A minha irmã mora em Recife.", "A minha irmã, ela mora em Recife.",
    "Mora ela em Recife, a minha irmã."], "A minha irmã mora em Recife.",
   TEMA + "*A minha irmã, ela mora…* repite el sujeto con *ela*: es normal hablando, no "
   "escribiendo.", T_TEMA, prompt=EF)
cl(W, 3, "Feijoada, eu adoro. → Eu ___.", "adoro feijoada",
   TEMA + "*Feijoada, eu adoro* es la charla; el orden neutro es *eu adoro feijoada*. "
   "*adorar* no lleva preposición.", T_TEMA, alt=["adoro a feijoada"], prompt=RW)
cl(W, 3, "Esse filme, eu já vi duas vezes. → Eu já ___ duas vezes.", "vi esse filme",
   TEMA + "Sin tema suelto, el objeto vuelve detrás del verbo: *eu já vi esse filme duas "
   "vezes*. Nada de pronombre de refuerzo.", T_TEMA, alt=["vi este filme"], prompt=RW)
DEST = ("Para destacar algo: *ser* + lo destacado + *que* (*foi a Bia que…*), *o que… é* "
        "(*o que eu quero é…*) o *é que* detrás del sujeto (*eu é que…*). ")
cl(W, 3, "A Bia me contou a novidade. → Foi ___ que me contou a novidade.", "a Bia",
   DEST + "Se destaca quién: *foi a Bia que me contou*. Sin «la que»: nunca «foi a Bia a que».",
   T_DEST, prompt=RW)
cl(W, 3, "Eu cheguei ontem. → Foi ___ que eu cheguei.", "ontem",
   DEST + "Se destaca cuándo: *foi ontem que eu cheguei*. Donde el castellano pone «cuando», "
   "el portugués deja *que*.", T_DEST, prompt=RW)
cl(W, 3, "Eu quero dormir. → O que eu quero ___.", "é dormir",
   DEST + "La seudohendida: *o que eu quero é dormir* (lo que quiero es dormir). Sin «lo»: "
   "«lo que» es *o que*.", T_DEST, prompt=RW)
ch(W, 3, "«Eu é que não vou!»", ["¡Yo sí que no voy!", "Es que no voy.", "No soy yo el que va."],
   "¡Yo sí que no voy!",
   "*é que* detrás del sujeto lo destaca: *eu é que não vou* = «yo sí que no voy», «lo que es "
   "yo, no voy». No es el «es que» de las excusas, que en portugués es *é que* al principio.",
   T_DEST, prompt=SG)
ch(W, 3, "«Você é que sabe.»", ["Vos sabrás (decidí vos).", "Vos sos el que sabe todo.",
                               "Es que vos sabés."], "Vos sabrás (decidí vos).",
   "*você é que sabe* deja la decisión al otro: «vos sabrás», «como quieras». El *é que* "
   "destaca a *você*.", T_DEST, prompt=SG)
fx(W, 3, "Foi eles que quebraram o vidro.", "Foi", "Foram", "concordancia",
   "En la hendida, *ser* concuerda con lo destacado: *foram eles que…*, *fui eu que…*, como "
   "«fueron ellos los que». «Foi eles» se oye, pero es error.", T_DEST)
cl(W, 0, "Cê tá ___? Tô te esperando faz meia hora! (¿dónde estás?)", "onde",
   "En la charla y en el chat la palabra de pregunta va al final: *cê tá onde?* (= *onde você "
   "está?*). Con *estar*, *onde*; *aonde* es para ir.", T_PREG)
fx(W, 0, "Onde é que está você? Tô na porta.", "está você", "você está", "espanol",
   "Después de *é que*, sujeto + verbo, sin invertir: *onde é que você está?* «Está você» "
   "copia el «¿dónde estás vos?» del castellano.", T_PREG)
cl(W, 0, "Cê não veio ___? A festa foi ótima! (¿por qué?, al final)", "por quê",
   "Al final de la pregunta, *por quê*: separado y con circunflejo. Al principio, *por que* "
   "(*por que você não veio?*); en la respuesta, *porque*.", T_CONE)
cl(W, 0, "Fiquei em casa ___ tava chovendo. (porque)", "porque",
   "La respuesta, la causa, va junta y sin tilde: *porque*. Separado (*por que*) es la "
   "pregunta.", T_CONE)


# ===========================================================================
# Semana 39 · Repaso: consecutivas, desde que, cujo
# ===========================================================================
W = 39
tr(W, 1, "Hacía tanto calor que fuimos a la playa.",
   _x("Fazia tanto calor que ", ["fomos", "a gente foi", "nós fomos"], " ", ["à praia", "pra praia", "para a praia"]),
   TAO + "*calor* es masculino, como en castellano: *tanto calor*. Y «hacía calor» es *fazia "
   "calor* (con *fazer*, como en castellano).", T_CONS)
ch(W, 1, "«Você passa, desde que estude.» Acá desde que significa…",
   ["siempre que estudies", "desde que estudiaste", "ya que estudiás"], "siempre que estudies",
   DESDE + "Con subjuntivo (*estude*), es condición.", T_DESDE, prompt=SG)
cl(W, 1, "Desde que ___ (começar) as obras, o trânsito piorou.", "começaram",
   DESDE + "Acá es tiempo (algo que ya empezó): indicativo. El sujeto va detrás (*as obras*), "
   "pero igual manda: plural, *começaram*.", T_DESDE, prompt=CV)
cl(W, 1, "É um projeto ___ objetivo é limpar a baía.", "cujo",
   "*cujo* = «cuyo»: concuerda con *objetivo* (masculino singular), sin artículo detrás.",
   T_CUJO)
cl(W, 1, "As cidades ___ praias estão poluídas perdem turistas.", "cujas",
   "*cujas* concuerda con *praias* (lo poseído, femenino plural), no con *cidades*. Nunca "
   "«cujas as».", T_CUJO)


# ===========================================================================
# Semana 40 · Concordancia (bloque nuevo, parte 1) y cohesión (bloque 5)
# ===========================================================================
W = 40
CONC = ("El verbo concuerda con su sujeto aunque esté lejos o detrás. ")
cl(W, 1, "O Lucas e a Sofía ___ (chegar) ontem de Rosário.", "chegaram",
   CONC + "Sujeto compuesto (dos personas): plural, *chegaram*.", T_CONC, prompt=CV)
cl(W, 1, "Eu e a Bia ___ (ir) juntos ao show.", "fomos",
   CONC + "*eu* + otra persona = *nós*: *eu e a Bia fomos* (o *a Bia e eu fomos*). Nunca "
   "«foi» ni «foram»: con *eu* adentro, primera del plural.",
   T_CONC, prompt=CV)
cl(W, 1, "Mais de um passageiro ___ (perder) o voo por causa da greve.", "perdeu",
   CONC + "*mais de um* lleva el verbo en singular, aunque signifique varios: *mais de um "
   "passageiro perdeu*.", T_CONC, prompt=CV)
cl(W, 1, "Segundo a pesquisa, 40% dos cariocas ___ (usar) ônibus todo dia.", "usam",
   CONC + "Con porcentaje + *de* + plural, el verbo va en plural: *40% dos cariocas usam*.",
   T_CONC, prompt=CV)
cl(W, 1, "A maioria dos alunos ___ (passar) na prova.", "passou",
   CONC + "Con *a maioria de* + plural valen las dos: *passou* (con *maioria*) o *passaram* "
   "(con *alunos*). En un texto, elegí una y mantenela.", T_CONC, alt=["passaram"], prompt=CV)
fx(W, 1, "Faltou dois alunos na reunião de ontem.", "Faltou", "Faltaram", "concordancia",
   CONC + "El sujeto (*dois alunos*) está detrás, pero manda igual: *faltaram*. «Faltou dois» "
   "se oye mucho; en lo escrito es error.", T_CONC, prompt=FXF)
cl(W, 1, "___ eu que fiz o bolo. (ser)", "Fui",
   "En la hendida, *ser* concuerda con lo destacado: *fui eu que fiz* (o *fui eu quem fez*). "
   "«Foi eu que fiz» se oye, pero en lo escrito es error.", T_DEST, prompt=CV)
ch(W, 1, "É ___ a entrada de animais.", ["proibida", "proibido", "proibidos"], "proibida",
   "Con artículo (*a entrada*), el adjetivo concuerda: *é proibida a entrada*. Sin artículo, "
   "queda invariable: *é proibido entrada*.", T_NOM, prompt=CART)
cl(W, 1, "É ___ (proibir) entrada de menores de 18 anos.", "proibido",
   "Sin artículo delante del sustantivo, *é proibido* no cambia: *é proibido entrada*. Con "
   "artículo concordaría: *é proibida a entrada*.", T_NOM, prompt=CW)
cl(W, 2, "Os aluguéis subiram 20% em um ano. ___ preocupa os estudantes.", "Isso",
   "Para retomar una idea entera (que los alquileres subieron), *isso*, o un sustantivo que la "
   "resuma: *esse aumento*, *tal aumento*. Repetir la oración es lo que hay que evitar.",
   T_COHE, alt=["Esse aumento", "Tal aumento", "Este aumento"])
ch(W, 2, "Machado de Assis e Clarice Lispector são clássicos da literatura brasileira; ___ "
   "nasceu na Ucrânia.", ["esta", "aquele", "este"], "esta",
   "*este, esta* retoma lo último nombrado (Clarice, nacida en Ucrania en 1920); *aquele*, lo "
   "primero (Machado, carioca). Y concuerda: *esta* (ella).", T_COHE, prompt=COHE)
cb(W, 2, "A prefeitura lançou um plano. O plano prevê novas ciclovias. (que)",
   ["A prefeitura lançou um plano que prevê novas ciclovias"],
   "Con el relativo, el segundo *plano* desaparece: *um plano que prevê…*. Es la forma más "
   "simple de no repetir.", T_COHE)
fx(W, 2, "Verifique se o elevador está parado antes de entrar no mesmo.", "no mesmo", "nele",
   "registro",
   "*o mesmo* como pronombre («entrar no mesmo») suena burocrático y la norma lo critica. Con "
   "preposición, *nele*; o repetí el sustantivo.", T_COHE, prompt=FXF)
cl(W, 2, "Esse relatório, a diretoria já leu. → A diretoria já ___.", "leu esse relatório",
   "El tema suelto adelante es de la charla; en un informe, orden neutro: *a diretoria já leu "
   "esse relatório*.", T_TEMA, alt=["leu este relatório"], prompt=RW)


# ===========================================================================
# Semana 46 · Preguntar en Brasil, de vuelta
# ===========================================================================
cl(46, None, "— Comprei um apartamento em Lisboa. — Você comprou ___?! (no lo podés creer)",
   "o quê",
   "La palabra de pregunta al final, con circunflejo, muestra sorpresa: *você comprou o "
   "quê?* Es del habla de Brasil; en Portugal la pregunta con palabra al final también existe "
   "(*Tu estás a fazer o quê?*).", T_PREG, alt=["quê"], prompt=CH)


# ===========================================================================
# Semana 47 · Consecutiva, cohesión y destacar en la argumentación
# ===========================================================================
W = 47
cb(W, 2, "Os dados são incompletos. Não é possível concluir nada. (de forma que)",
   _x("Os dados são incompletos", [", ", " "], ["de forma que", "de modo que"], " não é possível concluir nada"),
   "*de forma que* + indicativo presenta la consecuencia en un texto argumentativo («de modo "
   "que, así que»). Con subjuntivo sería finalidad.", T_CONS)
cl(W, 2, "O governo anunciou cortes na educação. ___ cortes provocaram protestos em todo o país.",
   "Tais",
   "*tal* retoma lo dicho y concuerda en número: *tal corte*, *tais cortes*. También *esses "
   "cortes*. Evitá *os mesmos*.", T_COHE, alt=["Esses", "Os referidos", "Estes"])
fx(W, 2, "Os dados foram divulgados ontem. Os mesmos mostram queda do desemprego.",
   "Os mesmos", "Eles", "registro",
   "*os mesmos* como pronombre es burocrático: la norma lo critica. Usá *eles* o un sustantivo: "
   "*esses dados*, *tais números*.", T_COHE, prompt=FXF)
cl(W, 2, "O que o país precisa ___ de investimento em educação.", "é",
   "La seudohendida destaca lo importante al final: *o que o país precisa é de investimento*. "
   "*precisar de* conserva su preposición.", T_DEST)


# ===========================================================================
# Semana 48 · cujo y cohesión
# ===========================================================================
W = 48
cb(W, 2, "A pesquisa ouviu dois mil jovens. Os resultados da pesquisa saem amanhã. (cujo)",
   ["A pesquisa, cujos resultados saem amanhã, ouviu dois mil jovens",
    "A pesquisa cujos resultados saem amanhã ouviu dois mil jovens"],
   "*cujos* une las dos y evita repetir *a pesquisa*: concuerda con *resultados* (masculino "
   "plural) y va sin artículo.", T_CUJO)
cl(W, 2, "O desmatamento cresceu 15% no último ano. ___ mostra que a fiscalização falhou.",
   "Isso",
   "*isso* retoma la oración entera. También un sustantivo resumen: *esse aumento*, *tal "
   "dado*.", T_COHE, alt=["Esse dado", "Esse aumento", "Tal aumento", "Esse número"])
cl(W, 2, "O Rio e São Paulo disputam turistas: ___ tem praia; o segundo, museus.",
   "o primeiro",
   "*o primeiro… o segundo* ordena dos referentes ya nombrados, en el orden en que aparecieron. "
   "*aquele… este* hace lo mismo.", T_COHE, alt=["aquele"])


# ===========================================================================
# Semana 49 · Del habla al texto: tema suelto y «é que»
# ===========================================================================
W = 49
ch(W, 0, "O prefeito, ele disse que a obra vai atrasar.",
   ["O prefeito afirmou que a obra atrasará.", "O prefeito, ele afirmou que a obra atrasará.",
    "Afirmou ele, o prefeito, que a obra atrasará."], "O prefeito afirmou que a obra atrasará.",
   "En la escritura, sin sujeto repetido (*o prefeito, ele…*): el tema suelto es de la charla. "
   "Y *dizer* se precisa (*afirmar*).", T_TEMA, prompt=EF)
ch(W, 0, "«Eles é que decidiram.» En un texto formal:",
   ["Foram eles que decidiram.", "Foi eles que decidiram.", "Eles é que decidiu."],
   "Foram eles que decidiram.",
   "*eles é que…* es destacado del habla; en el texto, la hendida con *ser* concordado: "
   "*foram eles que decidiram*.", T_DEST, prompt="Elegí la forma de la escritura formal.")


# ===========================================================================
# Semana 51 · Repaso: concordancia
# ===========================================================================
W = 51
cl(W, 2, "Eu e você ___ (precisar) conversar com calma.", "precisamos",
   "*eu e você* = *nós*: *precisamos*. El sujeto compuesto con *eu* va en primera del plural.",
   T_CONC, prompt=CV)
fx(W, 2, "Chegou as encomendas que você pediu.", "Chegou", "Chegaram", "concordancia",
   "El sujeto (*as encomendas*) está detrás, pero manda igual: *chegaram*.", T_CONC)
ch(W, 2, "Ela ficou ___ preocupada com os prazos.", ["meio", "meia", "meios"], "meio",
   "Delante de adjetivo, *meio* (= un poco) no cambia: *meio preocupada*.", T_NOM, prompt=NC)
cl(W, 2, "É ___ (necessário) paciência para aprender uma língua.", "necessário",
   "Sin artículo, *é necessário* queda invariable: *é necessário paciência*. Con artículo "
   "concordaría: *é necessária a paciência*.", T_NOM, prompt=CW)


# ===========================================================================
# Semana 52 · Examen: concordancia
# ===========================================================================
cl(52, None, "Mais de um candidato ___ (desistir) da vaga antes da entrevista.", "desistiu",
   "*mais de um* lleva el verbo en singular: *desistiu*. Es una trampa clásica de prueba.",
   T_CONC, prompt=CV)
