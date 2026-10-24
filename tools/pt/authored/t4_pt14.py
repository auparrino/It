# -*- coding: utf-8 -*-
"""Tanda 4 del plan de octubre, portugués, semanas 14-26 (prefijo t4pt14-).

Propuestas de auditorias/PLAN-2026-10-propuestas.md («pt semanas 14-26»)
y de auditorias/2026-10-portugues-revision.md que no estaban hechas:

  1. Escuchar la gramática dentro del curso: 3-4 ítems listen por semana
     que se resuelven solo de oído (gosto / gostou, comia / comeu, ia / foi,
     viajarão / viajaram, falará / falaria, tem / tinha estudado, foi /
     está vendida, fale / fala, vá / vai), con números, horas, precios y
     años, y un dictado de 6-10 palabras por semana.
  2. Vocales abiertas y cerradas atadas a la gramática de la semana (o
     gosto [ô] / eu gosto [ó], pôde / pode, almoço / almoça, novo / novos,
     sogro / sogra, jogo / jogue, vovô / vovó).  Van como ítems listen del
     curso y no como pares de Suoni: Suoni pide pares que se escriban
     distinto, y estos se escriben igual o se distinguen por otra letra.
  3. Falsos amigos y heterogenéricos con recuperación cada semana, sacados
     del vocabulario de esa semana (pelada, academia, quintal, brincar,
     embrulhar, aula, fantasia, gorjeta, sobremesa, calça, chinelo,
     esquisito, grávida, careca, delegacia, juros, tontura, passagem,
     estrada, sobrado, estojo), como traducción dirigida a la trampa, y un
     heterogenérico por semana dentro de la gramática (o leite, a dor, o
     sal, a viagem, a árvore, o costume, a ponte, a origem, o nariz, a
     bagagem, o mel).
  4. Más recuerdo activo: un hueco doble con contexto por semana («Quando
     eu ___ (ser) criança, um dia ___ (cair)…»).
  5. Pendientes de la auditoría semanal: esquecer de, casar com, namorar,
     achar + adjetivo (14); el habla real de los pronombres, vi ele, objeto
     nulo, dei pra ela (16); nenhum detrás del sustantivo y nem… nem (20);
     la pasiva desde la activa (22); proteger → proteja y não acho que +
     subjuntivo (23); mesmo que, sem que (24); o que que retoma una frase
     (25).
  6. Adelantar la exposición a gostar de (semana 6, donde está su bloque)
     y a me / te / vi ele / respuestas con el verbo solo (11 y 12).

Criterio de registro (propuesta «Jefe B1… criterio único»): se acepta todo
lo que es portugués correcto en Brasil, del habla o de la norma (vi ele /
eu o vi, dei pra ela / eu lhe dei, quero ver ela / quero vê-la); cuando la
consigna dice «coloquial» o «escrito», se acepta solo ese registro; tu va
con su verbo de 2.ª persona (como en el Sur), y no se acepta la mezcla
ni el calco (lo vi, se lo di, me gosta).  La preposición que se cae en el
relativo (o bairro que eu moro) se acepta solo donde la consigna es del
habla; en lo escrito es error (s2-25-30 lo dice ahora en su consigna).

Respuestas de dos huecos: «a | b» (el alumno escribe «a / b» o «a b»).
Cada ítem va en una semana en la que su gramática ya se explicó; «part» es
la parte de la lección de esa semana (None: la última).
"""
import itertools

TR = "Traducí al portugués."
TRC = "Traducí al portugués coloquial de Brasil."
CO = "Completá."
CO2 = "Completá los dos huecos."
CE = "Elegí la forma correcta."
DI = "Dictado: escuchá y escribí lo que oís."
LS = "Escuchá: ¿qué quiere decir?"
LF = "Escuchá: ¿qué forma del verbo oíste?"

AB = "abierta [ó], la de avó"
CE_ = "cerrada [ô], la de avô"

T_LI = "escuchar la gramática"
T_VO = "vocales abiertas y cerradas"
T_FA = "falsos amigos de la semana"
T_HG = "heterogenéricos"
T_DH = "recuerdo activo: dos huecos"
T_PE = "pendientes de la semana"
T_GO = "gostar de y pronombres del habla"

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
    d = dict(id="t4pt14-%d-%02d" % (w, _N[w]), w=w, level=_level(w),
             type=typ, topic=topic, prompt=prompt, stem=stem, answer=answer,
             alt=alts, note=note)
    if part is not None:
        d["part"] = part
    d.update(extra)
    ITEMS.append(d)
    return d


def tr(w, p, topic, stem, variants, note, prompt=TR):
    return _add(w, p, "translate", prompt, stem, variants[0], note, variants[1:], topic=topic)


def cl(w, p, topic, stem, answer, note, alt=None, prompt=CO):
    assert "___" in stem
    if " | " in answer:
        assert stem.count("___") == answer.count(" | ") + 1, stem
        prompt = CO2 if prompt == CO else prompt
    return _add(w, p, "cloze", prompt, stem, answer, note, alt, topic=topic)


def ch(w, p, topic, stem, options, answer, note, prompt=CE):
    assert answer in options and len(set(options)) == len(options)
    return _add(w, p, "choice", prompt, stem, answer, note, topic=topic, options=list(options))


def li(w, p, topic, said, options, answer, note, prompt=LS):
    assert answer in options and len(set(options)) == len(options)
    return _add(w, p, "listen", prompt, said, answer, note, topic=topic, options=list(options), nopeek=True)


def vo(w, p, said, word, answer, note):
    """¿Abierta o cerrada?  La o tónica de una palabra dentro de una frase."""
    return li(w, p, T_VO, said, [CE_, AB], answer, note,
              prompt="Escuchá: ¿cómo suena la o de «%s»?" % word)


def di(w, p, text, note, alt=None):
    """Dictado (TTS pt-BR): se oye la frase y se escribe."""
    assert 6 <= len(text.split()) <= 10, text
    return _add(w, p, "dictation", DI, text, text, note, alt, topic=T_LI, nopeek=True)


# ===========================================================================
# Antes de la 14: gostar de (semana 6) y los pronombres del habla (11 y 12)
# ===========================================================================
ch(6, 2, T_GO, "Eu ___ muito de pão de queijo.", ["gosto", "me gosta", "gosta"], "gosto",
   "*Gostar de* va al revés que «gustar»: el que siente el gusto es el sujeto. «Me gusta» = *eu gosto*; "
   "«me gosta» no existe.")
ch(6, 2, T_GO, "— Você gosta de forró? — ___!", ["Gosto", "Sim, me gosta", "Gosta"], "Gosto",
   "Para decir que sí se repite el verbo en tu persona: *Gosto!*. Nunca «Sim, me gosta».")
li(6, 2, T_GO, "A Bia gosta do João.", ["A Bia le gusta João.", "A João le gusta Bia."],
   "A Bia le gusta João.",
   "El que siente el gusto es el sujeto, que va adelante: *a Bia gosta do João* = a Bia le gusta João. "
   "Lo que gusta va después de *de* (de + o = *do*).")
tr(6, 2, T_GO, "Nos gusta el pan de queso.",
   _x(["A gente gosta", "Nós gostamos", "Gostamos"], [" de pão de queijo", " do pão de queijo"]),
   "«Nos gusta» = *a gente gosta* (verbo en singular) o *nós gostamos*. Sin «nos» delante y con *de*.")
cl(6, 2, T_GO, "Eles gostam ___ Rio.", "do",
   "*Gostar de* + *o Rio*: de + o = *do*. La preposición no se cae nunca.")

li(11, 1, T_GO, "Vi ele ontem na praia.",
   ["Lo vi ayer en la playa.", "Él me vio ayer en la playa.", "Él vio la playa ayer."],
   "Lo vi ayer en la playa.",
   "Al hablar, *vi ele* = lo vi (por escrito, *eu o vi*). *Vi* es «yo vi»; «él me vio» sería *ele me viu*. "
   "Se practica en la semana 16.")
ch(11, 0, T_GO, "— Você comprou o pão? — ___", ["Comprei.", "Sim, lo comprei.", "Comprou."], "Comprei.",
   "En Brasil se contesta con el verbo solo, sin pronombre: *Comprei.* (como *Gosto!*). "
   "«Lo» no existe en portugués y *comprou* es «compró» (él, vos).")

li(12, 0, T_GO, "Eu te ligo à noite.", ["Te llamo a la noche.", "Me llamás a la noche."],
   "Te llamo a la noche.",
   "*Eu te ligo*: yo te llamo a vos. «Me llamás» sería *você me liga*. Mirá quién es el sujeto.")
tr(12, 0, T_GO, "Llamame mañana.",
   ["Me liga amanhã", "Me ligue amanhã", "Amanhã me liga", "Amanhã me ligue",
    "Liga pra mim amanhã", "Me liga amanhã!"],
   "Al hablar, el pronombre va adelante: *me liga* (o *me ligue*, más formal). «Liga-me» suena a Portugal.")
tr(12, 0, T_GO, "¿Me das una mano?",
   ["Me dá uma ajuda?", "Você me dá uma ajuda?", "Me ajuda?", "Você me ajuda?",
    "Me dá uma mão?", "Você me dá uma mão?", "Me dá uma força?", "Você me dá uma força?"],
   "*Me dá uma ajuda?* (o *me ajuda?*): el *me* va delante del verbo, como en castellano. «Dá-me» es de Portugal.")


# ===========================================================================
# Semana 14 — gostar de y verbos con preposición
# partes: 0 gostar · 1 preposiciones · 2 achar
# ===========================================================================
W = 14
li(W, 0, T_LI, "Você gostou do show?", ["¿Te gustó el show?", "¿Te gusta el show?"], "¿Te gustó el show?",
   "*Gostou* (perfeito) lleva la fuerza al final, gos-TOU; *gosta* (presente), al principio, GÓS-ta. "
   "Lo que cambia el tiempo es dónde cae el acento.")
li(W, 0, T_LI, "Eu gosto muito de samba.", ["Me gusta mucho el samba.", "Me gustó mucho el samba."],
   "Me gusta mucho el samba.",
   "*Gosto* (GÓS-tu): presente de eu. El pasado sería *gostei*.")
vo(W, 0, "O gosto do açaí é forte.", "gosto", CE_,
   "*O gosto* (el sabor) es sustantivo: ô cerrada. *Eu gosto* (verbo) tiene ó abierta. Mismas letras, otro timbre.")
vo(W, 0, "Eu gosto de açaí com banana.", "gosto", AB,
   "*Eu gosto* (verbo): ó abierta, GÓS-tu. *O gosto* (el sabor): ô cerrada.")
di(W, 0, "A gente gosta de jogar pelada na praia.",
   "*A gente gosta*, con el verbo en singular, y *gostar de* + infinitivo. *Pelada* = picado de fútbol.")
tr(W, None, T_FA, "Jugamos un picado todos los jueves.",
   _x(["A gente joga", "Nós jogamos", "Jogamos"], [" uma pelada", " pelada"],
      [" toda quinta", " todas as quintas", " toda quinta-feira", " todas as quintas-feiras"]) +
   _x(["Toda quinta", "Todas as quintas"], [" a gente joga", " jogamos", " nós jogamos"], [" uma pelada", " pelada"]),
   "«Picado» es *pelada* (femenino y del habla). Ojo: *pelado, pelada* también es «desnudo»; sin pelo se dice *careca*.")
tr(W, None, T_FA, "Voy al gimnasio tres veces por semana.",
   _x(["Vou", "Eu vou"], [" à academia", " na academia", " pra academia", " para a academia"],
      [" três vezes por semana", " três vezes na semana"]),
   "El gimnasio es *academia*, con la fuerza en -MI-: a-ca-de-MI-a. *Ir na academia* es del habla; "
   "en la norma, *à academia*.")
tr(W, 0, T_HG, "Me gusta la leche fría.",
   _x(["Eu gosto", "Gosto"], [" de leite", " do leite"], [" gelado", " frio"]),
   "*Leite* es masculino en portugués: *o leite gelado* (en español, «la leche fría»). Y el que gusta es "
   "el sujeto: *eu gosto de leite*.")
cl(W, 1, T_DH, "Você se lembra ___ Bia? Eu sempre penso ___ ela.", "da | nela",
   "*Lembrar-se de* + *a Bia* = *da Bia*; *pensar em* + *ela* = *nela* (em + ela se contraen). "
   "«Pienso en ella» nunca es «penso de ela».")
tr(W, 1, T_PE, "Ella se casó con un brasileño.",
   _x(["Ela casou", "Ela se casou"], [" com um brasileiro"]),
   "*Casar com* (no «casar a»): *ela casou com um brasileiro*. Con *se* y sin *se*, las dos se oyen.")
tr(W, 1, T_PE, "Mi hermano está de novio con una carioca.",
   _x(["Meu irmão", "O meu irmão"], [" namora", " está namorando"], [" uma carioca"]),
   "*Namorar* va sin preposición: *meu irmão namora uma carioca*. «Namorar com» se oye, pero la norma lo pide directo.")
cl(W, 1, T_PE, "Ontem eu esqueci ___ trazer o protetor solar.", "de",
   "*Esquecer de* + infinitivo (o *esquecer-se de*): *esqueci de trazer*. Como *lembrar de*, lleva *de*.")
tr(W, 2, T_PE, "La película me pareció buenísima.",
   _x(["Achei", "Eu achei"], [" o filme"], [" ótimo", " muito bom", " excelente"]) +
   _x(["O filme me pareceu"], [" ótimo", " muito bom"]),
   "Lo más natural es *achar* + objeto + adjetivo: *achei o filme ótimo* («me pareció buenísima»). "
   "*O filme me pareceu ótimo* también vale. *Filme* es masculino.")

# ===========================================================================
# Semana 15 — pretérito imperfeito
# partes: 0 forma · 1 imperfeito o perfeito · 2 acción interrumpida · 3 ficar
# ===========================================================================
W = 15
li(W, 1, T_LI, "Ele comia muito.", ["Comía mucho (siempre, de costumbre).", "Comió mucho (esa vez)."],
   "Comía mucho (siempre, de costumbre).",
   "*Comia* (co-MI-a, tres sílabas) es el imperfeito: costumbre o fondo. *Comeu* (co-MEU) es el perfeito: una vez.")
li(W, 1, T_LI, "Ele comeu muito.", ["Comía mucho (siempre, de costumbre).", "Comió mucho (esa vez)."],
   "Comió mucho (esa vez).",
   "*Comeu* termina en el diptongo -eu, con la fuerza al final: perfeito. El imperfeito sería *comia*.")
li(W, 1, T_LI, "Eu ia à praia.", ["Iba a la playa.", "Fui a la playa."], "Iba a la playa.",
   "*Ia* (I-a) es el imperfeito de ir: «iba». «Fui» es el perfeito, una sola vez.")
li(W, 1, T_VO, "Ele não pôde vir.", ["pôde: no pudo venir", "pode: no puede venir"], "pôde: no pudo venir",
   "*Pôde* (pasado) lleva ô cerrada; *pode* (presente), ó abierta. El circunflejo está para distinguirlas.",
   prompt="Escuchá: ¿pôde (pasado) o pode (presente)?")
li(W, 1, T_VO, "Ela não pode sair.", ["pôde: no pudo salir", "pode: no puede salir"], "pode: no puede salir",
   "*Pode* (presente) tiene ó abierta, PÓ-dji; *pôde* (pasado), ô cerrada.",
   prompt="Escuchá: ¿pôde (pasado) o pode (presente)?")
li(W, 2, T_LI, "Eram duas da tarde quando o bloco começou.",
   ["Las 2 de la tarde", "Las 12 del mediodía", "Las 10 de la mañana"], "Las 2 de la tarde",
   "La hora va en imperfeito: *eram duas* (plural), *era uma* (singular). *Duas* va en femenino porque "
   "piensa en *horas*; *doze* es 12 y *dez*, 10.", prompt="Escuchá: ¿qué hora era?")
di(W, 1, "Quando eu era criança, brincava no quintal da minha avó.",
   "*Era*, *brincava*: imperfeito de costumbre. *Brincar* es jugar (los chicos), no saltar; el *quintal* es el fondo de la casa.")
tr(W, None, T_FA, "Teníamos un patio enorme atrás de la casa.",
   _x(["A gente tinha", "Nós tínhamos", "Tínhamos"], [" um quintal enorme"], [" atrás da casa", " nos fundos da casa"]),
   "El patio o fondo de una casa es *quintal*; *pátio* es el de la escuela o un patio interno. "
   "Y *tínhamos* lleva tilde.")
tr(W, None, T_FA, "Los chicos jugaban en la calle.",
   _x(["As crianças", "Os meninos", "Os moleques"], [" brincavam"], [" na rua"]),
   "Jugar (los chicos) es *brincar*; «brincar» en el sentido de saltar se dice *pular*. "
   "Un partido se *joga*: *jogar bola*.")
ch(W, 0, T_HG, "Eu tinha ___ dor de cabeça horrível.", ["uma", "um"], "uma",
   "*Dor* es femenino en portugués: *uma dor*, *a dor* (en español, «el dolor»).")
cl(W, 2, T_DH, "Quando eu ___ (ser) criança, um dia ___ (cair) da bicicleta.", "era | caí",
   "El fondo va en imperfeito (*era*); lo que pasó una vez, en perfeito (*caí*, con tilde: ca-Í).")
cl(W, 2, T_DH, "Eu ___ (dormir) quando o telefone ___ (tocar).", "dormia | tocou",
   "La acción en curso va en imperfeito (*dormia*, o *estava dormindo*); la que la interrumpe, en perfeito (*tocou*).",
   alt=["estava dormindo | tocou"])

# ===========================================================================
# Semana 16 — pronombres objeto
# partes: 0 cuadro · 1 -lo, vi ele, lhe · 2 con preposición · 3 muletillas
# ===========================================================================
W = 16
li(W, 1, T_LI, "Eu vi ele no metrô.", ["Yo lo vi a él en el metro.", "Él me vio a mí en el metro."],
   "Yo lo vi a él en el metro.",
   "*Eu vi ele*: yo lo vi (así se dice al hablar; por escrito, *eu o vi*). «Él me vio» sería *ele me viu*.")
li(W, 1, T_LI, "Ele me viu no metrô.", ["Yo lo vi a él en el metro.", "Él me vio a mí en el metro."],
   "Él me vio a mí en el metro.",
   "*Ele me viu*: el sujeto es *ele* y *me* va delante del verbo. Escuchá *viu* (él) frente a *vi* (yo).")
li(W, 0, T_LI, "A Bia te ligou?", ["¿Bia te llamó?", "¿Llamaste a Bia?"], "¿Bia te llamó?",
   "*Te* va delante del verbo y es el objeto: Bia te llamó a vos. «¿Llamaste a Bia?» sería *você ligou pra Bia?*.")
di(W, 1, "Comprei um presente e dei pra ela ontem.",
   "Objeto nulo (*comprei um presente e dei*, sin «lo») y *pra ela*: así se cuenta al hablar.")
tr(W, 1, T_PE, "Lo vi ayer en la Lapa.",
   _x(["Vi ele", "Eu vi ele", "Eu o vi"], [" ontem"], [" na Lapa"]) +
   _x(["Ontem eu vi ele", "Ontem vi ele", "Ontem eu o vi"], [" na Lapa"]),
   "Al hablar, *vi ele ontem*: el pronombre sujeto hace de objeto. Por escrito, *eu o vi*. «Lo vi», con *lo*, no.",
   prompt=TRC)
tr(W, 1, T_PE, "—Você comprou o pão? —«Sí, lo compré.» (contestá como en Brasil)",
   ["Comprei", "Comprei, sim", "Comprei sim", "Sim, comprei"],
   "En Brasil se contesta con el verbo solo, sin pronombre: *Comprei*. Es el objeto nulo: el «lo» no se dice.")
tr(W, 1, T_PE, "Quiero verla mañana.",
   _x(["Quero ver ela", "Eu quero ver ela", "Quero vê-la", "Eu quero vê-la"], [" amanhã"]) +
   _x(["Amanhã eu quero ver ela", "Amanhã quero ver ela"]),
   "Al hablar, *quero ver ela*; por escrito, *quero vê-la* (ver + a → vê-la). «Quero verla» no existe.",
   prompt=TRC)
tr(W, 2, T_PE, "Le di el regalo a ella.",
   _x(["Dei o presente", "Eu dei o presente"], [" pra ela", " para ela", " a ela"]) +
   _x(["Dei", "Eu dei"], [" pra ela", " para ela"], [" o presente"]) + ["Eu lhe dei o presente"],
   "Al hablar, el indirecto va con preposición: *dei o presente pra ela*. «Se lo di» no existe: en portugués no hay *se lo*.",
   prompt=TRC)
tr(W, None, T_FA, "¿Me lo envolvés para regalo?",
   _x(["Você pode embrulhar", "Pode embrulhar", "Você embrulha", "Embrulha", "Dá pra embrulhar"],
      [" pra presente", " para presente"], ["?"]),
   "Envolver un regalo es *embrulhar* (*embrulhar pra presente*), nada que ver con «embrollar». "
   "Y el objeto se cae al hablar: *pode embrulhar?*, sin «lo».")
tr(W, None, T_FA, "¿Puedo probármela? (la camisa, en el negocio)",
   ["Posso provar?", "Eu posso provar?", "Posso experimentar?", "Eu posso experimentar?",
    "Posso provar ela?", "Posso experimentar ela?", "Posso prová-la?", "Posso experimentá-la?"],
   "Probarse ropa es *provar* o *experimentar*, sin «me»: *posso provar?*. El objeto se puede callar.")
ch(W, 0, T_HG, "Me passa ___ sal, por favor?", ["o", "a"], "o",
   "*Sal* es masculino en portugués: *o sal* (en español, «la sal»).")
cl(W, 1, T_DH, "A Bia? Eu ___ vi ontem e ___ dei o livro. (escrito)", "a | lhe",
   "Por escrito: *a* para el directo (la vi) y *lhe* para el indirecto (le di). Al hablar: *vi ela* y *dei pra ela*.")

# ===========================================================================
# Semana 17 — futuro do presente
# partes: 0 forma · 1 hablado y escrito · 2 previsiones y clima
# ===========================================================================
W = 17
li(W, 0, T_LI, "Eles viajarão em julho.", ["Van a viajar en julio.", "Viajaron en julio."], "Van a viajar en julio.",
   "*Viajarão* (via-ja-RÃO): futuro, con la fuerza y la nasal al final. *Viajaram* (via-JA-ram): perfeito.")
li(W, 0, T_LI, "Eles viajaram em julho.", ["Van a viajar en julio.", "Viajaron en julio."], "Viajaron en julio.",
   "*Viajaram* lleva la fuerza en -JA- y termina en una vocal apagada: perfeito. El futuro es *viajarão*.")
li(W, 2, T_LI, "Amanhã a temperatura máxima será de trinta e dois graus.",
   ["32 °C", "22 °C", "42 °C"], "32 °C",
   "*Trinta e dois*: los números compuestos llevan *e* entre decenas y unidades. 22 es *vinte e dois*; 42, *quarenta e dois*.",
   prompt="Escuchá: ¿qué máxima anuncian para mañana?")
di(W, 2, "Segundo a previsão, amanhã choverá em todo o estado.",
   "Pronóstico: futuro simple (*choverá*), típico de las noticias. Al hablar se dice *vai chover*.")
tr(W, None, T_FA, "Mañana tengo clase a las ocho.",
   _x(["Amanhã", "Amanhã eu"], [" tenho aula"], [" às oito"]) +
   _x(["Tenho aula", "Eu tenho aula"], [" amanhã às oito", " às oito amanhã"]),
   "La clase es *aula* (*ter aula*); el salón se dice *sala de aula*. Y «a las ocho» es *às oito*, con crase.")
tr(W, None, T_FA, "Mi disfraz de Carnaval va a estar listo el viernes.",
   _x(["Minha fantasia", "A minha fantasia"], [" de Carnaval"],
      [" vai ficar pronta", " vai estar pronta", " ficará pronta", " estará pronta"],
      [" na sexta", " sexta", " na sexta-feira"]),
   "El disfraz es *fantasia*, femenino (*pronta*). *Ficar pronto* = estar listo.")
ch(W, 0, T_HG, "___ viagem para Salvador será longa.", ["A", "O"], "A",
   "*Viagem* es femenino, como casi todas las palabras en *-agem*: *a viagem* (en español, «el viaje»).")
cl(W, 0, T_DH, "No próximo semestre, a escola ___ (trazer) professores novos e ___ (fazer) uma festa.",
   "trará | fará",
   "*Trazer* y *fazer* pierden el -ze- en el futuro: *trará*, *fará* (con tilde en la 3.ª persona).")

# ===========================================================================
# Semana 18 — futuro do pretérito y cortesía
# partes: 0 forma · 1 cortesía · 2 sugerir e imaginar
# ===========================================================================
W = 18
li(W, 0, T_LI, "Ela falaria com o gerente.", ["Hablaría con el gerente.", "Hablará con el gerente."],
   "Hablaría con el gerente.",
   "*Falaria* (fa-la-RI-a) es el condicional; *falará* (fa-la-RÁ), el futuro. Escuchá el final: -ria o -rá.")
li(W, 0, T_LI, "Ela falará com o gerente.", ["Hablaría con el gerente.", "Hablará con el gerente."],
   "Hablará con el gerente.",
   "*Falará* termina en -rá, con la fuerza al final: futuro. El condicional sería *falaria*.")
vo(W, None, "Hoje o almoço é peixe.", "almoço", CE_,
   "*O almoço* (sustantivo) lleva ô cerrada. *Ela almoça* (verbo) abre la o: ó.")
vo(W, None, "Ela almoça no centro.", "almoça", AB,
   "*Almoça* (verbo) tiene ó abierta, como *eu almoço* [ó]; *o almoço* (sustantivo), ô cerrada.")
li(W, 1, T_LI, "A diária custa trezentos e cinquenta reais.", ["R$ 350", "R$ 250", "R$ 360"], "R$ 350",
   "*Trezentos e cinquenta* = 350 (250 es *duzentos e cinquenta*; 360, *trezentos e sessenta*). "
   "La *diária* es lo que cuesta una noche de hotel.",
   prompt="Escuchá: ¿cuánto cuesta la noche?")
di(W, 1, "Eu gostaria de reservar uma mesa para quatro pessoas.",
   "Pedido cortés: *eu gostaria de* + infinitivo, sin tilde en *gostaria*.")
tr(W, None, T_FA, "La propina ya viene en la cuenta.",
   _x(["A gorjeta"], [" já vem", " já está", " já vem incluída", " já está incluída"], [" na conta"]),
   "La propina es *gorjeta* (o *os dez por cento*). Ojo: *propina* en portugués es la coima.")
tr(W, None, T_FA, "¿Qué hay de postre?",
   ["O que tem de sobremesa?", "Qual é a sobremesa?", "O que é que tem de sobremesa?", "Tem o que de sobremesa?"],
   "El postre es *sobremesa*. La charla después de comer no tiene palabra fija: *papo depois do almoço*.")
ch(W, 1, T_HG, "O leite está muito ___ no mercado.", ["caro", "cara"], "caro",
   "*Leite* es masculino: *o leite está caro* (en español, «la leche está cara»).")
cl(W, 2, T_DH, "Com mais tempo, eu ___ (fazer) um curso e ___ (ter) menos estresse.", "faria | teria",
   "Imaginar: condicional. *Fazer* pierde el -ze- (*faria*); *ter* es regular (*teria*).")

# ===========================================================================
# Semana 19 — comparativos y superlativos
# partes: 0 más, menos, tan · 1 el más y -íssimo
# ===========================================================================
W = 19
vo(W, 0, "Comprei um carro novo.", "novo", CE_,
   "*Novo*, en singular, lleva ô cerrada. El plural abre la o: *novos* [ó], como *ovo* → *ovos*.")
vo(W, 0, "Comprei uns tênis novos.", "novos", AB,
   "El plural abre la o: *novo* [ô] → *novos* [ó], como *ovo* → *ovos* y *porco* → *porcos*.")
li(W, 0, T_LI, "Esse tênis custa cento e vinte reais, e aquele, noventa.",
   ["El primero (R$ 120)", "El segundo (R$ 90)", "Cuestan lo mismo"], "El primero (R$ 120)",
   "*Cento e vinte* (120) contra *noventa* (90). *Cem* es 100 justo; desde 101, *cento e…*.",
   prompt="Escuchá: ¿cuál es más caro?")
di(W, 0, "O Rio é mais quente do que Curitiba.",
   "*Mais… do que* (o *mais… que*). *Quente* es caliente; el clima caluroso.")
tr(W, None, T_FA, "Este pantalón es más caro que la pollera.",
   _x(["Esta calça", "Essa calça"], [" é mais cara"], [" do que", " que"], [" a saia"]),
   "El pantalón es *calça* (femenino y en singular: *a calça*, *cara*); la calza es *legging*. La pollera es *saia*.")
tr(W, None, T_FA, "Las ojotas son más cómodas que las zapatillas.",
   _x(["Os chinelos são mais confortáveis"], [" do que", " que"], [" os tênis"]) +
   _x(["Chinelo é mais confortável"], [" do que", " que"], [" tênis"]),
   "Ojotas = *chinelos*; zapatillas = *tênis* (igual en singular y en plural). Cómodo es *confortável* (o *cômodo*, menos usado).")
ch(W, 1, T_HG, "Essa é ___ árvore mais alta da praça.", ["a", "o"], "a",
   "*Árvore* es femenino: *a árvore mais alta* (en español, «el árbol»).")
cl(W, 0, T_DH, "O Maracanã é ___ (grande) do que o Engenhão, mas o trânsito lá é ___ (ruim).", "maior | pior",
   "*Grande* → *maior*; *ruim* (o *mau*) → *pior*. «Mais grande» es error; «mais ruim» se oye, pero lo cuidado es *pior*.")

# ===========================================================================
# Semana 20 — indefinidos, negación y cantidad
# partes: 0 tudo, todo y los indefinidos · 1 negar · 2 reaccionar
# ===========================================================================
W = 20
li(W, 0, T_LI, "Comi tudo.", ["Me comí todo.", "Comí todo el día."], "Me comí todo.",
   "*Tudo* (TU-du) es «todo» sin sustantivo. «Todo el día» es *o dia todo* o *todo o dia* (TÔ-du).")
li(W, 0, T_LI, "Comi o dia todo.", ["Me comí todo.", "Comí todo el día."], "Comí todo el día.",
   "*Todo* (TÔ-du) acompaña a un sustantivo: *o dia todo*. «Todo» solo, sin sustantivo, es *tudo*.")
li(W, 1, T_LI, "Não tem ninguém em casa.", ["No hay nadie en casa.", "¿Hay alguien en casa?", "No hay nada en casa."],
   "No hay nadie en casa.",
   "*Ninguém* (nin-GUÊN) es «nadie», con doble negación (*não… ninguém*). *Nada* es «nada»; *alguém*, «alguien».")
di(W, 1, "Não conheço ninguém nessa festa, nem a dona da casa.",
   "Doble negación (*não… ninguém*) y *nem* = «ni siquiera».")
tr(W, 0, T_PE, "No tengo ningún problema.",
   _x(["Não tenho", "Eu não tenho"], [" problema nenhum", " nenhum problema"]),
   "*Nenhum* puede ir detrás del sustantivo, y así es más enfático y más del habla: *não tenho problema nenhum*.")
cl(W, 0, T_PE, "Não fui a lugar ___ no fim de semana.", "nenhum",
   "*A lugar nenhum*: «a ningún lado». *Nenhum* detrás del sustantivo, con *não* delante del verbo.")
tr(W, 1, T_PE, "No vinieron ni Bia ni Rafa.",
   ["Não vieram nem a Bia nem o Rafa", "Nem a Bia nem o Rafa vieram", "Nem a Bia nem o Rafa veio",
    "Não veio nem a Bia nem o Rafa"],
   "*Nem… nem* = ni… ni. Los nombres llevan artículo (*a Bia, o Rafa*). Si *nem* va delante del verbo, sin *não*.")
tr(W, None, T_FA, "Qué raro, no vino nadie.",
   _x(["Que esquisito", "Que estranho"], [", ", " "], ["não veio ninguém", "ninguém veio"]),
   "Raro es *esquisito* (o *estranho*); «exquisito» se dice *delicioso*, *gostoso*.")
ch(W, 1, T_HG, "Não tenho ___ costume de sair à noite.", ["o", "a"], "o",
   "*Costume* es masculino: *o costume* (en español, «la costumbre»).")
cl(W, 1, T_DH, "Não vi ___ na praia e não comprei ___.", "ninguém | nada",
   "Doble negación: *não vi ninguém* (personas), *não comprei nada* (cosas).")

# ===========================================================================
# Semana 21 — perfeito composto y mais-que-perfeito
# partes: 0 forma · 1 tenho feito · 2 tinha feito
# ===========================================================================
W = 21
li(W, 1, T_LI, "Ela tem estudado muito.",
   ["Viene estudiando mucho (estos días).", "Había estudiado mucho (antes de algo)."],
   "Viene estudiando mucho (estos días).",
   "*Tem estudado*: algo que se repite hasta hoy. *Tinha estudado*: el pasado del pasado. Escuchá el auxiliar: *tem* o *tinha*.")
li(W, 2, T_LI, "Ela tinha estudado muito.",
   ["Viene estudiando mucho (estos días).", "Había estudiado mucho (antes de algo)."],
   "Había estudiado mucho (antes de algo).",
   "*Tinha estudado* (TCHI-nha): «había estudado». *Tem estudado* sería «viene estudiando».")
vo(W, None, "O meu sogro é carioca.", "sogro", CE_,
   "*Sogro* lleva ô cerrada; el femenino abre la o: *sogra* [ó], como *novo / nova*.")
vo(W, None, "A minha sogra é baiana.", "sogra", AB,
   "*Sogra* tiene ó abierta; *sogro*, ô cerrada. El femenino y el plural (*sogros*) abren la o.")
di(W, 1, "Ultimamente eu tenho corrido no Aterro todo domingo.",
   "*Tenho corrido*: algo que se viene repitiendo hasta hoy (no «he corrido»).")
tr(W, None, T_FA, "Mi cuñada está embarazada.",
   _x(["Minha cunhada", "A minha cunhada"], [" está grávida"]),
   "Embarazada es *grávida*. *Embaraçada* es avergonzada o enredada (*fiquei embaraçada* = me dio vergüenza).")
tr(W, None, T_FA, "Mi suegro se quedó pelado.",
   _x(["Meu sogro", "O meu sogro"], [" ficou careca"]),
   "Sin pelo es *careca* (*ficou careca*, sin «se»). *Pelado* en portugués es desnudo.")
ch(W, 1, T_HG, "Ultimamente ___ ponte Rio-Niterói tem estado sempre engarrafada.", ["a", "o"], "a",
   "*Ponte* es femenino: *a ponte* (en español, «el puente»). *Engarrafada* = con embotellamiento.")
cl(W, 2, T_DH, "Quando cheguei, o filme já ___ (começar) e a Bia já ___ (sair).", "tinha começado | tinha saído",
   "Lo que pasó antes de otro pasado: *tinha* + participio (*tinha começado*, *tinha saído*).")

# ===========================================================================
# Semana 22 — participios y voz pasiva
# partes: 0 participios · 1 pasiva con ser y estar · 2 cambio de estado
# ===========================================================================
W = 22
li(W, 1, T_LI, "A casa foi vendida.", ["La vendieron (se cuenta el hecho).", "Ya está vendida (el resultado)."],
   "La vendieron (se cuenta el hecho).",
   "*Foi vendida*: la pasiva con ser cuenta la acción. *Está vendida*: el estado que quedó.")
li(W, 1, T_LI, "A casa está vendida.", ["La vendieron (se cuenta el hecho).", "Ya está vendida (el resultado)."],
   "Ya está vendida (el resultado).",
   "*Está vendida*: estar + participio, el resultado. *Foi vendida* contaría la venta.")
li(W, 1, T_LI, "O Cristo foi inaugurado em mil novecentos e trinta e um.", ["1931", "1921", "1913"], "1931",
   "*Mil novecentos e trinta e um*: los años se leen como números enteros, con *e* antes de la última cifra. "
   "1921 sería *vinte e um*; 1913, *treze*.", prompt="Escuchá: ¿en qué año?")
di(W, 1, "A ponte foi construída nos anos setenta.",
   "*A ponte* (femenino) → *construída*, que concuerda. Ojo con la tilde: cons-tru-Í-da.")
tr(W, 1, T_PE, "A prefeitura fechou o túnel.", ["O túnel foi fechado pela prefeitura", "O túnel foi fechado pela Prefeitura"],
   "Activa → pasiva: el objeto (*o túnel*) pasa a sujeto, *ser* + participio concordado (*foi fechado*) "
   "y el que lo hizo va con *por* (*pela prefeitura*).",
   prompt="Pasá la frase a la voz pasiva.")
tr(W, None, T_FA, "El robo fue denunciado en la comisaría.",
   _x(["O roubo", "O assalto", "O furto"], [" foi registrado", " foi denunciado"], [" na delegacia"]),
   "La comisaría es *delegacia* (la del *delegado*); allí se hace un *boletim de ocorrência*.")
tr(W, None, T_FA, "Los intereses están incluidos en la cuota.",
   _x(["Os juros"], [" estão incluídos", " já estão incluídos"], [" na parcela", " na prestação"]),
   "Los intereses de un préstamo son *os juros* (siempre en plural); *interesse* es el de la curiosidad. "
   "*Estar* + participio: el resultado.")
ch(W, 0, T_HG, "___ origem da cidade foi um forte português.", ["A", "O"], "A",
   "*Origem* es femenino, como casi todas las palabras en *-gem*: *a origem* (en español, «el origen»).")
cl(W, 1, T_DH, "O túnel foi ___ (abrir) em 1960 e ___ (fechar) pela prefeitura no ano passado.", "aberto | fechado",
   "*Abrir* tiene participio irregular (*aberto*); *fechar*, regular (*fechado*). Con ser concuerdan con *o túnel*.")

# ===========================================================================
# Semana 23 — presente do subjuntivo
# partes: 0 forma · 1 deseo y recomendación · 2 duda y opinión
# ===========================================================================
W = 23
li(W, 1, T_LI, "É bom que você fale com ela.", ["fale", "fala"], "fale",
   "*Fale* (subjuntivo) termina en una e que suena casi «i»; *fala* (indicativo), en a. Después de *é bom que*, subjuntivo.",
   prompt=LF)
li(W, 1, T_LI, "Quero que você vá comigo.", ["vá", "vai"], "vá",
   "*Vá* (subjuntivo) es una sola vocal abierta; *vai* termina en el diptongo -ai. *Quero que* + otra persona: subjuntivo.",
   prompt=LF)
vo(W, None, "O jogo começa às oito.", "jogo", CE_,
   "*O jogo* (sustantivo) lleva ô cerrada. El verbo abre la o cuando lleva la fuerza: *eu jogo* [ó], *que ele jogue* [ó].")
vo(W, None, "Tomara que o Flamengo jogue bem.", "jogue", AB,
   "*Jogue* (subjuntivo de *jogar*) tiene ó abierta; *o jogo* (el partido), ô cerrada.")
di(W, 1, "Tomara que não chova no domingo.",
   "*Tomara que* + subjuntivo: *chova* (de *chover*).")
tr(W, None, T_FA, "Me mareé en el barco.",
   _x(["Fiquei com tontura", "Senti tontura", "Tive tontura", "Eu fiquei com tontura", "Eu senti tontura",
       "Eu tive tontura", "Fiquei enjoado", "Fiquei enjoada", "Eu fiquei enjoado", "Eu fiquei enjoada",
       "Senti enjoo", "Eu senti enjoo", "Tive enjoo", "Eu tive enjoo"], [" no barco"]),
   "El mareo es *tontura* (o *enjoo*, si es de estómago, como en un barco). «Tontería» se dice *bobagem*.")
tr(W, 1, T_FA, "Espero que la comida esté exquisita.",
   _x(["Espero que a comida", "Eu espero que a comida"], [" esteja"], [" deliciosa", " gostosa", " uma delícia"]),
   "Exquisito es *delicioso* o *gostoso*; *esquisito* es raro. Y *espero que* pide subjuntivo: *esteja*.")
ch(W, 1, T_HG, "Espero que ___ nariz pare de sangrar logo.", ["o", "a"], "o",
   "*Nariz* es masculino: *o nariz* (en español, «la nariz»).")
cl(W, 1, T_DH, "Espero que você ___ (estar) bem e que ___ (vir) à festa.", "esteja | venha",
   "*Espero que* + subjuntivo: *estar* → *esteja*; *vir* → *venha* (de *eu venho*).")
cl(W, 0, T_PE, "O médico recomenda que você ___ (proteger) a pele do sol.", "proteja",
   "*Proteger* → *eu protejo* → *proteja*: la g pasa a j para conservar el sonido.")
tr(W, 2, T_PE, "No creo que llueva hoy.",
   _x(["Não acho que", "Eu não acho que"], [" chova", " vá chover"], [" hoje"]),
   "*Acho que* va con indicativo, pero *não acho que* duda: subjuntivo (*chova*, *vá chover*).")

# ===========================================================================
# Semana 24 — subjuntivo con conjunciones
# partes: 0 finalidad y tiempo · 1 concesión y condición · 2 imperativo formal · 3 pragmática
# ===========================================================================
W = 24
li(W, 1, T_LI, "Embora esteja chovendo, vamos ao jogo.", ["esteja", "está"], "esteja",
   "*Embora* siempre pide subjuntivo: *esteja* (es-TÊ-ja), aunque la lluvia sea real.", prompt=LF)
li(W, 1, T_LI, "Caso chova, o show será no Circo Voador.",
   ["Si llueve, el show es en el Circo Voador.", "Como llovió, el show fue en el Circo Voador."],
   "Si llueve, el show es en el Circo Voador.",
   "*Caso chova*: condición (si llueve), con subjuntivo. Para algo que ya pasó sería *como choveu*.")
li(W, 0, T_LI, "O ônibus sai às sete e quinze.", ["7:15", "7:50", "6:15"], "7:15",
   "*Sete e quinze* = 7:15. *Cinquenta* (sin-KUEN-ta) suena distinto de *quinze* (KIN-zi), y *seis* de *sete*.",
   prompt="Escuchá: ¿a qué hora sale el micro?")
di(W, 0, "Saia cedo para chegar antes do pôr do sol.",
   "Mismo sujeto: *para* + infinitivo (no *para que*). *Pôr do sol* = la puesta del sol.")
tr(W, 1, T_PE, "Aunque llueva, vamos a la playa.",
   _x(["Mesmo que chova", "Embora chova"], [", ", " "], ["a gente vai", "vamos", "nós vamos"],
      [" à praia", " pra praia", " para a praia"]),
   "*Mesmo que* (aunque, incluso si) pide subjuntivo, igual que *embora*: *mesmo que chova*.")
cl(W, 0, T_PE, "Ele sempre sai sem que ninguém ___ (perceber).", "perceba",
   "*Sem que* + subjuntivo: *perceber* → *eu percebo* → *perceba*.")
tr(W, None, T_FA, "Voy a comprar el pasaje antes de que suba el precio.",
   _x(["Vou comprar a passagem", "Eu vou comprar a passagem"], [" antes que o preço"], [" suba", " aumente"]),
   "El pasaje es *passagem* (femenino, como casi todo *-agem*). *Antes que* + subjuntivo: *suba*.")
tr(W, None, T_FA, "Salgamos temprano, antes de que la ruta se llene.",
   _x(["Vamos sair cedo", "Vamos sair mais cedo"], [", ", " "], ["antes que a estrada"],
      [" fique lotada", " fique cheia", " encha"]),
   "La ruta es *estrada* (*rota* es el recorrido); llena de gente o de autos, *lotada*.")
ch(W, 1, T_HG, "Caso ___ bagagem passe de 23 quilos, você paga uma taxa.", ["a", "o"], "a",
   "*Bagagem* es femenino: *a bagagem* (en español, «el equipaje»).")
cl(W, 1, T_DH, "Embora ___ (estar) cansado, eu vou, desde que você ___ (dirigir).", "esteja | dirija",
   "*Embora* y *desde que* (= con tal de que) piden subjuntivo; *dirigir* → *eu dirijo* → *dirija* (g → j).")

# ===========================================================================
# Semana 25 — pronombres relativos
# partes: 0 que, quem, onde · 1 o que y preposición · 2 o qual y cujo · 3 alguém que
# ===========================================================================
W = 25
li(W, 1, T_VO, "Vovó, essa é a amiga de quem eu te falei.", ["a la abuela (vovó)", "al abuelo (vovô)"],
   "a la abuela (vovó)",
   "*Vovó* termina en ó abierta (la abuela); *vovô*, en ô cerrada (el abuelo). Solo la vocal las distingue.",
   prompt="Escuchá: ¿a quién le habla?")
li(W, 1, T_VO, "Vovô, esse é o amigo de quem eu te falei.", ["a la abuela (vovó)", "al abuelo (vovô)"],
   "al abuelo (vovô)",
   "*Vovô*: ô cerrada, el abuelo. *Vovó*, con ó abierta, es la abuela.",
   prompt="Escuchá: ¿a quién le habla?")
li(W, 1, T_LI, "Esse é o cara de quem eu te falei.", ["de quem", "que"], "de quem",
   "*Falar de* alguien: *o cara de quem eu te falei*. Al hablar a veces se oye *o cara que eu te falei*; "
   "por escrito, con *de quem*.", prompt="Escuchá: ¿qué oíste antes de «eu te falei»?")
di(W, 0, "A rua onde eu moro tem um sobrado azul.",
   "*Onde* = en el que. Un *sobrado* es una casa de dos plantas.")
tr(W, None, T_FA, "Vivimos en un dúplex cerca de la playa.",
   _x(["A gente mora", "Nós moramos", "Moramos"], [" num sobrado", " em um sobrado"], [" perto da praia"]),
   "Una casa de dos plantas es *sobrado*; no tiene nada que ver con «sobrar» (*sobra*). *Em* + *um* = *num*.")
tr(W, 0, T_FA, "La cartuchera que me regalaste es hermosa.",
   _x(["O estojo que você me deu", "O estojo que você me deu de presente"], [" é lindo"]),
   "La cartuchera es *estojo* (masculino: *lindo*). «Regalar» se dice *dar* (de presente).")
ch(W, 0, T_HG, "___ mel que comprei na feira é ótimo.", ["O", "A"], "O",
   "*Mel* es masculino: *o mel* (en español, «la miel»).")
cl(W, 2, T_DH, "A amiga com ___ eu moro é aquela ___ pai é médico.", "quem | cujo",
   "Persona tras preposición: *com quem*. «Cuyo» es *cujo*, que concuerda con lo poseído (*pai*: cujo), sin artículo.")
tr(W, 1, T_PE, "Llegó tarde, lo que es normal.",
   _x(["Ele chegou atrasado", "Chegou atrasado", "Ele chegou tarde", "Chegou tarde",
       "Ela chegou atrasada", "Ela chegou tarde"], [", o que é normal"]),
   "Para retomar toda la frase anterior, *o que*: *chegou atrasado, o que é normal*. «Lo que» nunca es «lo».")

# ===========================================================================
# Semana 26 — CHEFÃO B1: escucha y dictado con todo lo de la estación
# ===========================================================================
W = 26
li(W, 0, T_LI, "A Bia já tinha saído quando você ligou.",
   ["Bia ya se había ido cuando llamaste.", "Bia salió cuando llamaste.", "Bia sale cuando llamás."],
   "Bia ya se había ido cuando llamaste.",
   "*Tinha saído*: el pasado del pasado (ya se había ido). *Ligou*: el hecho que llega después.")
li(W, 1, T_LI, "Talvez ele venha amanhã.", ["Quizás venga mañana.", "Viene mañana, seguro.", "Vino ayer."],
   "Quizás venga mañana.",
   "*Talvez* delante del verbo pide subjuntivo: *venha*. La duda está en las dos palabras.")
di(W, 0, "Quando eu era criança, ia à praia todo domingo.",
   "Costumbre en el pasado: imperfeito (*era*, *ia*). *À praia*, con crase.")
