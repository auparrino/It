# -*- coding: utf-8 -*-
"""Tanda 4 del plan de octubre, portugués, semanas 27-39 (prefijo t4pt27-).

Propuestas de auditorias/PLAN-2026-10-propuestas.md («pt semanas 27-39»)
y de auditorias/2026-10-portugues-revision.md que no estaban hechas (los
duelos, los CAPIRE y la evidencia negativa del banco los hace otro paso):

  1. «¿Qué forma escuchaste?» dentro de las rondas: ítems listen que se
     resuelven solo de oído (vier / vir, chegarem / chegaram, tivesse /
     tiver, falássemos / falasse, fazerem / fizerem, iria / ia, vendem-se /
     vende-se, propôs / propus, obteve / obtive…), interpretación a partir
     del audio solo («¿ya pasó, pasa siempre o todavía no pasó?»), números,
     fechas, horas, precios y porcentajes al oído, y un dictado por semana
     (salvo 30, 33 y 36, que ya lo tienen en construcciones_a.py).
  2. Traducción contrastiva de los falsos amigos del vocabulario de cada
     semana (azar, sucesso, firma, legenda, estranhar, cômodo, burlar,
     pasta, mercearia, colar, romance / novela, noivo, dispensar…), con
     retorno espaciado en la semana siguiente.
  3. Completar sobre la lectura de la semana (letture_settimana.js): la
     frase del texto ya leído, con el verbo de la gramática de la semana.
  4. Pragmática B2: pedir un documento sin sonar exigente (29), discrepar
     en un debate (34), insistir con cortesía en la repartição (35).  Todas
     las opciones son gramaticales y de largo parecido: decide la adecuación.
  5. Huecos de la teoría: a / há / à y devido à, graças à (bloque nuevo en
     la lección 36), los cuatro porquês (more nuevo en la 34) y ficar /
     virar / tornar-se en el relato (more nuevo en la 30), con sus ítems.
  6. Semana 33: dos párrafos escritos como se habla que se pasan a la
     norma, pronombre por pronombre (reemplazan cuatro «Uní verbo y
     pronombre» mecánicos de s3.py).  Semana 38: escucha de habla rápida y
     dos reescrituras de registro, del audio de WhatsApp al e-mail al
     síndico y al revés (reemplazan seis cloze «forma reducida» de s3.py).
  7. Jefe 39: «encontrá el error» sobre un párrafo entero (un e-mail, una
     carta del lector, un aviso), con los errores típicos de la estación
     mezclados entre ítems: quando eu ver, se eu poderia, precisam-se de,
     vou à Copacabana, pediu que eu vá.  El motor marca un error por ítem;
     varios errores en el mismo párrafo pedirían cambiar wireFixerr (app.js).

Las consignas van en portugués (desde la 27, tools/pt/consignas.py); la
nota, en castellano.  Respuestas de varios huecos: «a | b | c».  Cada ítem
va en una semana en la que su gramática ya se explicó; «part» es la parte
de la lección de esa semana (None: la última).
"""
import itertools

TR = "Traduza para o português."
CO = "Complete."
CO2 = "Complete os espaços."
CE = "Escolha a forma correta."
DI = "Ditado: escute e escreva o que você ouvir."
LF = "Escolha a forma que você ouviu."
LS = "Escolha o que quer dizer a frase que você ouviu."
LQ = "Escolha: o que você ouviu já aconteceu, acontecia sempre ou ainda não aconteceu?"
LN = "Escolha o número que você ouviu."
LD = "Escolha a data que você ouviu."
LH = "Escolha a hora que você ouviu."
LP = "Escolha o preço que você ouviu."
LA = "Escolha o ano que você ouviu."
LR = "Escolha o que a pessoa disse, em português padrão."
PR = "Escolha a opção mais adequada à situação."
FX = "Encontre o erro no texto: toque no que está errado e corrija."
NO = "Passe para a norma escrita: complete os espaços (entre parênteses, como se fala)."
RF = "Reformule em registro formal: complete os espaços do e-mail."
RC = "Reformule como se fala no WhatsApp: complete os espaços."

Q3 = ["Já aconteceu, uma vez.", "Ainda não aconteceu.", "Acontecia sempre, era costume."]

T_LI = "escuchar la gramática"
T_NU = "números, fechas y precios al oído"
T_FA = "falsos amigos de la semana"
T_LE = "la lectura de la semana"
T_PR = "pragmática: adecuación"
T_AH = "a, há o à"
T_PQ = "los cuatro porquês"
T_CE = "cambio de estado en el relato"
T_NO = "del habla a la norma"
T_RE = "registro: del audio al e-mail"
T_HR = "habla rápida"
T_JE = "el jefe: el error en un texto"

ITEMS = []
_N = {}


def _level(w):
    return "B1" if w <= 27 else "B2"


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
    d = dict(id="t4pt27-%d-%02d" % (w, _N[w]), w=w, level=_level(w),
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
        for a in alt or []:
            assert a.count(" | ") == answer.count(" | "), a
        prompt = CO2 if prompt == CO else prompt
    return _add(w, p, "cloze", prompt, stem, answer, note, alt, topic=topic)


def le(w, p, title, stem, answer, note, alt=None):
    """Completar sobre la lectura de la semana (letture_settimana.js)."""
    return cl(w, p, T_LE, stem, answer, note, alt,
              prompt="Complete como na leitura da semana («%s»)." % title)


def ch(w, p, topic, stem, options, answer, note, prompt=CE):
    assert answer in options and len(set(options)) == len(options)
    return _add(w, p, "choice", prompt, stem, answer, note, topic=topic, options=list(options))


def pr(w, p, stem, options, answer, note):
    """Pragmática: todas gramaticales y de largo parecido (la correcta no es
    la única más larga)."""
    assert not all(len(o) < len(answer) for o in options if o != answer), stem
    return ch(w, p, T_PR, stem, options, answer, note, prompt=PR)


def li(w, p, topic, said, options, answer, note, prompt=LS):
    assert answer in options and len(set(options)) == len(options)
    return _add(w, p, "listen", prompt, said, answer, note, topic=topic, options=list(options), nopeek=True)


def di(w, p, text, note, alt=None):
    """Dictado (TTS pt-BR): se oye la frase y se escribe."""
    assert 6 <= len(text.split()) <= 12, text
    return _add(w, p, "dictation", DI, text, text, note, alt, topic=T_LI, nopeek=True)


def _core(t):
    return t.strip(".,;:!?«»\"'()").lower()


def fx(w, p, topic, stem, bad, good, answer, cat, note, goodAlt=None, prompt=FX):
    """Encontrá el error: «bad» es una sola palabra del texto (app.js,
    wireFixerr, marca la primera que coincide), así que tiene que aparecer
    una sola vez; «answer» es el texto corregido."""
    toks, bt = stem.split(), bad.lower().split()
    n = len(bt)
    hits = [k for k in range(len(toks) - n + 1) if [_core(t) for t in toks[k:k + n]] == bt]
    assert len(hits) == 1, (stem, bad)
    k = hits[0]
    seg = " ".join(toks[k:k + n])
    fixed = toks[:k] + [seg.replace(bad, good)] + toks[k + n:]
    assert answer == " ".join(fixed), answer
    d = _add(w, p, "fixerr", prompt, stem, answer, note, topic=topic, bad=bad, good=good, cat=cat)
    if goodAlt:
        d["goodAlt"] = goodAlt
    return d


# ===========================================================================
# Semana 27 — futuro do subjuntivo
# partes: 0 forma · 1 ver/vir, momentos futuros · 2 condiciones abiertas
# ===========================================================================
W = 27
li(W, 1, T_LI, "Quando você vier ao Rio, me avisa.", ["vier", "vir", "ver"], "vier",
   "*Vier* (vi-ÉR, dos sílabas) es el futuro do subjuntivo de *vir*: «cuando vengas». *Vir* sería el de *ver* "
   "(«cuando veas»), y *ver*, el infinitivo. La sílaba de más es lo que se oye.", prompt=LF)
li(W, 1, T_LI, "Quando vocês virem o Cristo de perto, vão entender.", ["virem", "vierem", "verem"], "virem",
   "*Virem* (VI-rem) es el futuro do subjuntivo de *ver*: «cuando vean». *Vierem* (vi-É-rem) es de *vir* "
   "(«cuando vengan»); «verem» es el infinitivo pessoal, que tras *quando* no va.", prompt=LF)
li(W, 0, T_LI, "Se eles chegarem cedo, a gente sai junto.", ["chegarem", "chegaram", "chegam"], "chegarem",
   "*Chegarem* termina en *-rem*, con la fuerza en -GA- y un final nasal que suena «-rêin»: «si llegan» "
   "(futuro). *Chegaram* termina en *-ram*, que suena «-ráu» nasal: «llegaron».", prompt=LF)
li(W, 2, T_LI, "Quando eu terminar o curso, vou viajar pelo Nordeste.", Q3, "Ainda não aconteceu.",
   "*Quando* + futuro do subjuntivo (*terminar*) mira adelante: todavía no terminó. El pasado sería "
   "*quando terminei* (una vez) o *quando terminava* (siempre).", prompt=LQ)
li(W, 2, T_LI, "Quando eu terminava o trabalho, ia à praia.", Q3, "Acontecia sempre, era costume.",
   "*Terminava* e *ia* son imperfeito: un hábito del pasado («cuando terminaba, iba»). Con *quando "
   "terminar* sería futuro; con *quando terminei*, una sola vez.", prompt=LQ)
li(W, 2, T_LI, "Quando eu terminei o trabalho, fui à praia.", Q3, "Já aconteceu, uma vez.",
   "*Terminei* y *fui* son perfeito: pasó una vez. Fijate en el final: *-ei* es pasado; *terminar*, "
   "con *-r*, sería futuro.", prompt=LQ)
li(W, 1, T_NU, "Se tudo der certo, a gente se muda no dia vinte e três.", ["dia 23", "dia 13", "dia 20"], "dia 23",
   "*Vinte e três* = 23 (*treze* es 13). Y *se tudo der certo* («si todo sale bien») es futuro do subjuntivo "
   "de *dar*: *der*.", prompt=LD)
di(W, 0, "Quando vocês puderem, venham conhecer a Quinta da Boa Vista.",
   "*Puderem*: futuro do subjuntivo de *poder*, del tronco del perfeito (*puderam* → *puderem*). "
   "*Venham* es el imperativo de *vocês*.")
le(W, 1, "A corte no Rio", "Enquanto eu ___ (estar) no Rio, vou tropeçar na história a cada esquina.", "estiver",
   "*Enquanto* + un tiempo que todavía no terminó → futuro do subjuntivo: *estiver* (de *estiveram*). "
   "«Enquanto eu esteja» es el calco del castellano «mientras esté».")
le(W, 2, "A corte no Rio", "Se você ___ (querer), depois a gente vai ao Jardim Botânico.", "quiser",
   "Condición abierta sobre el futuro: *se* + futuro do subjuntivo. *Querer* → *quiseram* → *quiser*.")

# ===========================================================================
# Semana 28 — imperfeito do subjuntivo y condicionales
# partes: 0 forma · 1 se eu pudesse, el habla · 2 queria que, como se · 3 opinar
# ===========================================================================
W = 28
li(W, 1, T_LI, "Se eu tivesse tempo, ia à praia todo dia.", ["tivesse", "tiver", "tive"], "tivesse",
   "*Tivesse* (ti-VÉ-si, tres sílabas) es el imperfeito do subjuntivo: hipótesis («si tuviera»). *Tiver* "
   "(«si tengo», futuro) termina en -r; *tive* es «tuve».", prompt=LF)
li(W, 1, T_LI, "Se eu fosse você, aceitava a proposta.", ["fosse", "for", "foi"], "fosse",
   "*Fosse* (FÔ-si): «si yo fuera vos». *For* es el futuro do subjuntivo («si soy, si voy») y *foi*, el "
   "perfeito. Y *aceitava* en lugar de *aceitaria* es el habla.", prompt=LF)
li(W, 2, T_LI, "A professora queria que nós falássemos mais em aula.", ["falássemos", "falasse", "falamos"],
   "falássemos",
   "*Falássemos* tiene cuatro sílabas y la fuerza en -LÁ-: es *nós*. *Falasse* (eu, ele) tiene tres; "
   "*falamos* es el indicativo.", prompt=LF)
li(W, 1, T_LI, "Se vocês quisessem, a gente ia junto.", ["quisessem", "quiserem", "queriam"], "quisessem",
   "*Quisessem* (ki-ZÉ-sem): hipótesis, «si quisieran». *Quiserem* (ki-ZÉ-rem) es «si quieren» (futuro); "
   "*queriam*, «querían».", prompt=LF)
li(W, 1, T_LI, "Se ele viesse, a gente sairia mais tarde.",
   ["Es imaginario: si viniera, saldríamos.", "Puede pasar: si viene, salimos."],
   "Es imaginario: si viniera, saldríamos.",
   "*Viesse* (imperfeito do subjuntivo) + *sairia* (futuro do pretérito): hipótesis. La condición abierta "
   "sería *se ele vier, a gente sai*.")
li(W, 3, T_NU, "O pão de queijo custa sete reais e cinquenta.", ["R$ 7,50", "R$ 17,50", "R$ 7,15"], "R$ 7,50",
   "*Sete reais e cinquenta* (centavos) = R$ 7,50. *Dezessete* sería 17; *quinze*, 15. En Brasil la coma "
   "separa los centavos.", prompt=LP)
di(W, 1, "Se eu pudesse, moraria numa casa perto do mar.",
   "*Pudesse* (de *puderam*) + *moraria*: hipótesis. *Numa* = em + uma.")
tr(W, None, T_FA, "¡Qué mala suerte! Perdí el colectivo.",
   _x(["Que azar! ", "Que azar, ", "Que falta de sorte! ", "Que falta de sorte, ", "Que má sorte! ",
       "Que má sorte, "], ["Perdi o ônibus", "Eu perdi o ônibus"]),
   "*Azar* es mala suerte: *que azar!* = ¡qué mala pata! (también *que falta de sorte!*). El azar (la "
   "casualidad) es *o acaso*. Y el colectivo, *o ônibus*.")
tr(W, None, T_FA, "Lo encontré por casualidad en la feria.",
   _x(["Encontrei ele", "Eu encontrei ele", "Eu o encontrei", "Encontrei-o", "Encontrei com ele",
       "Eu encontrei com ele", "Topei com ele"], " por acaso na feira")
   + _x(["Encontrei ele", "Eu encontrei ele", "Eu o encontrei", "Encontrei-o", "Encontrei com ele"],
        " na feira por acaso"),
   "«Por casualidad» = *por acaso*; *por azar* sería «por mala suerte». *Encontrei ele* es el habla; "
   "*eu o encontrei*, la escritura.")
tr(W, None, T_FA, "Entramos gratis al museo.",
   _x(["Entramos", "A gente entrou", "Nós entramos"], [" de graça", " grátis"], " no museu")
   + _x(["Entramos", "A gente entrou", "Nós entramos"], " no museu", [" de graça", " grátis"]),
   "«Gratis» = *de graça* (o *grátis*). Ojo: *sem graça* es «sin gracia» o «avergonzado». Y se entra *no* "
   "museu (em + o), no «ao».")
le(W, 1, "Se vocês pudessem voltar a 1888", "Se vocês ___ (poder) viajar no tempo, o que fariam?", "pudessem",
   "Hipótesis: *se* + imperfeito do subjuntivo (*puderam* → *pudessem*) y *fariam* en la otra mitad.")
le(W, 1, "Se vocês pudessem voltar a 1888",
   "Outra diz que, se ___ (ser) jornalista, entrevistaria André Rebouças.", "fosse",
   "*Ser* → *foram* → *fosse*: «si fuera periodista». *Entrevistaria* completa la hipótesis.")

# ===========================================================================
# Semana 29 — infinitivo pessoal
# partes: 0 forma · 1 sujeto propio, tras preposición · 2 cuándo no, habla · 3 carta formal
# ===========================================================================
W = 29
li(W, 0, T_LI, "Trouxe o mapa para vocês acharem o caminho.", ["acharem", "acharam", "acham"], "acharem",
   "*Acharem* (-rem, con un final nasal: «-rêin») es el infinitivo pessoal: «para que encuentren». "
   "*Acharam* (-ram, nasal) es el perfeito.", prompt=LF)
li(W, 0, T_LI, "É bom eles fazerem a reserva hoje.", ["fazerem", "fizerem", "façam"], "fazerem",
   "*Fazerem* (fa-ZÊ-rem) sale del infinitivo; *fizerem* (fi-ZÉ-rem), del perfeito (*fizeram*): es el "
   "futuro do subjuntivo, que va tras *quando* o *se*. Una vocal cambia todo.", prompt=LF)
li(W, 1, T_LI, "Antes de sairmos, vamos tomar um café.", ["sairmos", "sairemos", "saímos"], "sairmos",
   "*Sairmos* (sa-ÍR-mus) es el infinitivo pessoal de *nós* tras *antes de*. *Sairemos* (futuro) tiene una "
   "sílaba más; *saímos* no tiene la *r*.", prompt=LF)
li(W, 2, T_LI, "Ela pediu para a gente ir embora.",
   ["Nos pidió que nos fuéramos.", "Pidió permiso para irse.", "Nos pidió que la lleváramos."],
   "Nos pidió que nos fuéramos.",
   "*Pedir para* + sujeto + infinitivo: el sujeto de *ir* es *a gente*. «Pidió permiso para irse» sería "
   "*pediu para ir* (sin otro sujeto).")
li(W, 1, T_NU, "Em Angicos, os trabalhadores aprenderam a ler em quarenta horas.",
   ["40 horas", "14 horas", "400 horas"], "40 horas",
   "Lo que decide es el comienzo de la palabra: *quarenta* = 40, *catorze* (o *quatorze*) = 14, *quatrocentas* = 400.", prompt=LN)
di(W, 3, "Peço a gentileza de me enviarem a declaração.",
   "Fórmula de carta formal: *peço a gentileza de* + infinitivo pessoal (*enviarem*: el sujeto es la "
   "institución, *vocês*).", alt=["Peço a gentileza de me enviarem a declaração"])
tr(W, None, T_FA, "Hizo la torta con mucho esmero.",
   _x(["Fez", "Ela fez", "Ele fez"], " o bolo com ", ["muito capricho", "capricho", "muito esmero", "esmero",
                                                    "muito cuidado"])
   + _x(["Caprichou", "Ela caprichou", "Ele caprichou"], [" no bolo", " muito no bolo"]),
   "*Capricho* es también esmero: *fazer com capricho* = hacer con cuidado, y *caprichar* = esmerarse "
   "(*esmero* también existe, más formal). Y la torta dulce es *o bolo*; "
   "*torta* en Brasil es pastel o tarta (*torta de frango*).")
tr(W, None, T_FA, "¡Qué mala suerte, empezó a llover!",
   _x(["Que azar, ", "Que azar! ", "Que falta de sorte, ", "Que falta de sorte! "],
      ["começou a chover", "começou a chover!"]),
   "Vuelve *azar* = mala suerte. Y *começar a* + infinitivo, sin crase: *a* ante verbo nunca la lleva.")
le(W, 0, "Paulo Freire e a leitura do mundo",
   "O método partia de palavras da vida dos alunos, para eles ___ (discutir) a própria realidade.",
   "discutirem",
   "*Para* + sujeto propio (*eles*) + infinitivo pessoal: *discutirem*. El castellano diría «para que "
   "discutieran».")
le(W, 1, "Paulo Freire e a leitura do mundo",
   "A Bia pede aos alunos para ___ (trazer) notícias do bairro.", "trazerem",
   "*Trazer* es irregular en el perfeito (*trouxeram*), pero el infinitivo pessoal sale del infinitivo: "
   "*trazerem*. «Trouxerem» es el futuro do subjuntivo. Como el sujeto ya está en *aos alunos*, la "
   "norma acepta también *para trazer*; la lectura usa *trazerem*.", alt=["trazer"])
pr(W, 3, "Le escribís a la secretaría de la facultad para pedir un certificado:",
   ["Gostaria de solicitar uma declaração de matrícula.", "Quero que vocês me mandem uma declaração de matrícula.",
    "Me manda uma declaração de matrícula, por favor."],
   "Gostaria de solicitar uma declaração de matrícula.",
   "En una carta formal se pide con *gostaria de solicitar* (futuro do pretérito de cortesía). *Quero que "
   "me mandem* suena a orden, y *me manda* es de la charla.")
pr(W, 3, "El documento no llegó y ya pasó el plazo. Escribís de nuevo:",
   ["Será que seria possível verificar o envio?", "Vocês se esqueceram de mandar o documento?",
    "Exijo que verifiquem o envio hoje mesmo."],
   "Será que seria possível verificar o envio?",
   "*Será que seria possível…?* insiste sin acusar. *Vocês esqueceram* culpa al otro y *exijo que* es una "
   "orden: en Brasil, las dos cierran puertas.")
pr(W, 3, "Cerrás un e-mail formal a alguien que no conocés:",
   ["Agradeço desde já a atenção.", "Valeu pela força aí, um abração!", "Fico no aguardo, beleza? Abraço."],
   "Agradeço desde já a atenção.",
   "Cierre formal: *agradeço desde já a atenção* (y después *atenciosamente*). *Valeu* y *beleza* son del "
   "chat con amigos.")
pr(W, 3, "Le pedís más plazo a un profesor:",
   ["Será que eu poderia entregar na segunda?", "Vou entregar o trabalho só na segunda, tá?",
    "O senhor precisa me dar prazo até segunda."],
   "Será que eu poderia entregar na segunda?",
   "Un pedido a alguien con autoridad va como pregunta atenuada: *será que eu poderia…?*. Anunciarlo "
   "(*vou entregar*) o exigirlo (*precisa me dar*) suena brusco.")

# ===========================================================================
# Semana 30 — tiempos compuestos e hipótesis en el pasado
# partes: 0 ter, se tivesse…, mixtas · 1 espero que, quando tiver, la calle · 2 relato
# ===========================================================================
W = 30
li(W, 0, T_LI, "Se tivesse chovido, a gente teria ficado em casa.",
   ["tivesse chovido", "tiver chovido", "tenha chovido"], "tivesse chovido",
   "*Tivesse chovido* (si hubiera llovido): no llovió. *Tiver chovido* es futuro (cuando haya llovido) y "
   "*tenha chovido*, duda sobre el pasado (que haya llovido).", prompt=LF)
li(W, 1, T_LI, "Quando você tiver terminado o relatório, me liga.", Q3, "Ainda não aconteceu.",
   "*Quando* + *tiver terminado* (futuro composto do subjuntivo): algo futuro que va a estar terminado. "
   "Todavía no pasó.", prompt=LQ)
li(W, 1, T_LI, "Talvez ele tenha saído mais cedo.",
   ["Quizás ya salió más temprano.", "Quizás salga más temprano.", "Si hubiera salido más temprano…"],
   "Quizás ya salió más temprano.",
   "*Talvez* + *tenha saído* (perfeito do subjuntivo): duda sobre algo ya pasado. «Quizás salga» sería "
   "*talvez saia*.")
li(W, 0, T_LI, "Se eu tivesse estudado, teria passado.",
   ["No estudió y no aprobó.", "Estudió y aprobó.", "Todavía puede estudiar."], "No estudió y no aprobó.",
   "*Se tivesse estudado, teria passado*: hipótesis sobre el pasado, que ya no se puede cambiar. Lo que "
   "dice es lo contrario de lo que pasó.")
li(W, 2, T_NU, "O quadro de Pedro Américo foi pintado em mil oitocentos e oitenta e oito.",
   ["1888", "1822", "1808"], "1888",
   "*Mil oitocentos e oitenta e oito* = 1888 (*oitenta* = 80, *vinte e dois* = 22, *oito* = 8). En los "
   "años, cada parte va unida con *e*.", prompt=LA)
tr(W, None, T_FA, "El libro fue un éxito.",
   _x("O livro ", ["foi um sucesso", "fez sucesso", "fez muito sucesso", "foi um grande sucesso",
                   "foi um êxito"]),
   "*Sucesso* es éxito: *fazer sucesso* = tener éxito. Un «suceso» (un hecho) es *um acontecimento*.")
tr(W, None, T_FA, "El suceso de ayer salió en todos los diarios.",
   _x(["O acontecimento de ontem", "O fato de ontem", "O que aconteceu ontem"], [" saiu", " apareceu"],
      " em todos os jornais"),
   "«Suceso» (hecho) = *acontecimento* o *fato*; *o sucesso* sería «el éxito». Y el diario es *o jornal*.")
tr(W, None, T_FA, "Si no me equivoco, el museo cierra los lunes.",
   _x(["Se não me engano", "Se não estou enganado", "Se eu não estiver enganado", "Se não me equivoco"],
      ", o museu fecha ", ["às segundas", "às segundas-feiras", "nas segundas", "nas segundas-feiras",
                           "segunda-feira", "na segunda"]),
   "«Equivocarse» = *enganar-se*: *se não me engano* (*equivocar-se* existe, pero es formal). *Estar "
   "enganado* = estar equivocado. Y los días de "
   "la semana: *às segundas* (todos los lunes).")
cl(W, 2, T_CE, "Quando soube da notícia, ela ___ (ponerse) pálida.", "ficou",
   "«Ponerse» + adjetivo es *ficar*: *ficou pálida*, *fiquei nervoso*. Sin *se*: «se pôs pálida» es calco.")
tr(W, 2, T_CE, "Con los años, el bar se convirtió en un punto de encuentro.",
   _x(["Com os anos", "Com o tempo", "Com o passar dos anos"], ", o bar ",
      ["virou", "se tornou", "tornou-se", "passou a ser"], [" um ponto de encontro", " ponto de encontro"])
   + _x(["Com os anos", "Com o tempo", "Com o passar dos anos"], ", o bar ",
        ["se transformou", "transformou-se"], [" em um ponto de encontro", " num ponto de encontro"]),
   "«Convertirse en» + sustantivo: *virar* (charla), *tornar-se* (escrito), *transformar-se em*. *Virar* "
   "va sin preposición: *virou ponto de encontro*, no «virou em».")
fx(W, 2, T_CE, "Na entrevista, me pus nervoso e esqueci tudo.", "me pus", "fiquei",
   "Na entrevista, fiquei nervoso e esqueci tudo.", "espanol",
   "«Me puse nervioso» = *fiquei nervoso*: el cambio de estado va con *ficar* y sin pronombre. *Pôr-se "
   "nervoso* suena a Portugal o a libro; en Brasil, *ficar*.")
le(W, 0, "Independência ou morte?",
   "Os historiadores discutem o que teria acontecido se a corte não ___ (vir) para o Rio em 1808.",
   "tivesse vindo",
   "Hipótesis sobre el pasado: *se* + *tivesse* + participio. El participio de *vir* es *vindo* (igual "
   "que el gerundio): *tivesse vindo*.")
le(W, 1, "Independência ou morte?", "Espero que você não ___ (arrepender-se) de ter vindo.",
   "tenha se arrependido",
   "*Espero que* + algo ya pasado: perfeito do subjuntivo, *tenha* + participio. El *se* va entre los "
   "dos verbos, como se habla en Brasil.", alt=["se tenha arrependido", "tenha-se arrependido"])

# ===========================================================================
# Semana 31 — discurso indirecto
# partes: 0 ele disse que ia, tabla · 1 pedidos, pronombres · 2 preguntas, verbos · 3 atribuir
# ===========================================================================
W = 31
li(W, 0, T_LI, "Ele disse que iria ao show.", ["iria", "ia", "vai"], "iria",
   "*Iria* (i-RI-a) es el futuro do pretérito; *ia* (I-a), el imperfeito que lo reemplaza en la charla. "
   "Los dos valen en el discurso indirecto; el oído distingue la sílaba de más.", prompt=LF)
li(W, 0, T_LI, "Ela contou que tinha perdido a chave.", ["tinha perdido", "tem perdido", "teria perdido"],
   "tinha perdido",
   "*Tinha perdido*: lo que había pasado antes del momento en que lo contó. *Tem perdido* sería «viene "
   "perdiendo» y *teria perdido*, «habría perdido».", prompt=LF)
li(W, 0, T_LI, "O João disse que mora em Niterói.",
   ["Todavía vive en Niterói.", "Vivía en Niterói y se mudó.", "Va a mudarse a Niterói."],
   "Todavía vive en Niterói.",
   "Si lo dicho sigue siendo verdad, el presente se queda: *disse que mora* = todavía vive ahí. Con "
   "*morava* no se sabe.")
li(W, 3, T_NU, "Segundo o IBGE, a inflação do ano ficou em quatro vírgula cinco por cento.",
   ["4,5%", "4,05%", "45%"], "4,5%",
   "Los decimales se leen con *vírgula*: *quatro vírgula cinco* = 4,5. *Segundo* («según») atribuye el "
   "dato a la fuente.", prompt=LN)
li(W, 2, T_NU, "O ministro afirmou que o aumento seria de trezentos e vinte reais.",
   ["R$ 320", "R$ 230", "R$ 302"], "R$ 320",
   "*Trezentos e vinte* = 320; *duzentos e trinta*, 230; *trezentos e dois*, 302. Y *seria* es el "
   "futuro del pasado: lo que el ministro anunció.", prompt=LP)
di(W, 1, "Ela pediu que eu chegasse cedo no dia seguinte.",
   "Pedido en el pasado: *pediu que* + imperfeito do subjuntivo (*chegasse*). *Amanhã* pasa a *no dia "
   "seguinte*.")
tr(W, None, T_FA, "La obra tuvo mucho éxito en San Pablo.",
   _x("A peça ", ["fez muito sucesso", "teve muito sucesso", "foi um grande sucesso", "foi um sucesso"],
      " em São Paulo"),
   "Vuelve *sucesso* = éxito. Y la obra de teatro es *a peça* (*a obra* es la de construcción o de arte).")
le(W, 1, "Quarto de despejo", "Na aula, a Bia pediu que os alunos ___ (ler) alguns trechos.", "lessem",
   "*Pediu que* + imperfeito do subjuntivo. *Ler* → *leram* → *lessem*.")
le(W, 2, "Quarto de despejo", "Outro aluno perguntou se ela ___ (ficar) rica.", "tinha ficado",
   "Pregunta indirecta sobre algo anterior: *perguntou se* + *tinha* + participio («si se había hecho "
   "rica»). *Ficar rica* = hacerse rica.", alt=["havia ficado", "ficou"])

# ===========================================================================
# Semana 32 — se apassivador y sujeto indeterminado
# partes: 0 vende-se, dónde va el se · 1 dizem que, el habla
# ===========================================================================
W = 32
li(W, 0, T_LI, "Vendem-se apartamentos no Flamengo.", ["Vendem-se", "Vende-se"], "Vendem-se",
   "*Vendem-se* lleva la nasal de *-em* («VÊN-dẽi-si»): concuerda con *apartamentos*. *Vende-se* va con "
   "un singular (*vende-se apartamento*).", prompt=LF)
li(W, 0, T_LI, "Aluga-se quarto perto do metrô.", ["Aluga-se", "Alugam-se"], "Aluga-se",
   "*Aluga-se* («a-LU-ga-si»), sin nasal: un solo cuarto. Con *quartos* sería *alugam-se*.", prompt=LF)
li(W, 1, T_LI, "Roubaram meu celular no ônibus.",
   ["Me robaron el celular: no se sabe quién.", "Mis amigos me robaron el celular.",
    "Robé un celular en el colectivo."],
   "Me robaron el celular: no se sabe quién.",
   "La 3.ª plural sin sujeto (*roubaram*) es el sujeto indeterminado: alguien, no se sabe quién. Igual "
   "que «me robaron» en castellano.")
li(W, 0, T_NU, "Conserta-se celular: troca de tela por cento e oitenta reais.", ["R$ 180", "R$ 118", "R$ 108"],
   "R$ 180",
   "*Cento e oitenta* = 180; *cento e dezoito* = 118; *cento e oito* = 108. *Cem* va solo: *cem reais*.",
   prompt=LP)
di(W, 1, "Dizem que o Rio continua lindo, apesar de tudo.",
   "*Dizem que*: 3.ª plural sin sujeto, «dicen que». *Apesar de* = a pesar de.")
tr(W, None, T_FA, "Compré pan en el almacén de la esquina.",
   _x(["Comprei", "Eu comprei"], [" pão na mercearia da esquina", " pão no mercadinho da esquina",
                                  " pão na venda da esquina"]),
   "El almacén de barrio es *a mercearia* o *o mercadinho* (falso amigo: la mercería es *o armarinho*). "
   "*Armazém* hoy suena a depósito o a almacén mayorista (en el Sur, al almacén de antes).")
tr(W, None, T_FA, "Pegá la foto en el cuaderno.",
   _x(["Cole", "Cola"], " a foto no caderno"),
   "«Pegar» (con pegamento) es *colar*; *pegar* en portugués es agarrar o tomar (*pegar o ônibus*). Y en "
   "la escuela, *colar* es copiarse.")
ch(W, 0, T_FA, "En la puerta de una farmacia dice PUXE. ¿Qué hacés?",
   ["Tirás de la puerta hacia vos.", "Empujás la puerta hacia afuera.", "Esperás a que te abran."],
   "Tirás de la puerta hacia vos.",
   "*Puxe* (de *puxar*) = tire, hacia vos. Parece «empuje», y es lo contrario: empujar es *empurrar* "
   "(*empurre*).", prompt="Escolha o que significa a placa.")
le(W, 0, "A Era Vargas", "Em 1943, ___ (reunir-se) as leis trabalhistas na CLT.", "reuniram-se",
   "Pasiva con *se*: el verbo concuerda con *as leis* (plural), que van detrás: *reuniram-se*. El *se* "
   "detrás, porque no hay nada que lo atraiga.", alt=["se reuniram"])
le(W, 1, "A Era Vargas", "No Estado Novo, ___ (fechar-se) o Congresso e censurava-se a imprensa.", "fechou-se",
   "*O Congresso* es singular: *fechou-se*. Con un plural detrás sería *fecharam-se*.", alt=["se fechou"])

# ===========================================================================
# Semana 33 — colocación pronominal en la escritura
# partes: 0 posiciones · 1 formas que cambian, mesóclise · 2 compuestos, habla · 3 reseñar
# ===========================================================================
W = 33
cl(W, 2, T_NO,
   "___ (Me disseram) que o diretor já chegou. ___ (Vi ele) ontem no corredor, mas ele não ___ "
   "(me cumprimentou). Ele ___ (me pediu) que eu revisasse os números. ___ (Vou te mandar) o relatório amanhã.",
   "Disseram-me | Vi-o | me cumprimentou | me pediu | Vou mandar-lhe",
   "Frase que empieza con el verbo: ênclise (*disseram-me*, *vi-o*). La negación atrae: *não me "
   "cumprimentou* queda como está. Con sujeto delante (*ele*), la norma brasileña acepta las dos. Y el "
   "*te* de *você* es *lhe* por escrito: *vou mandar-lhe* (o *vou lhe mandar*); si el texto tratara de "
   "*tu*, *vou mandar-te*.",
   alt=_x("Disseram-me | Vi-o | me cumprimentou | ", ["me pediu", "pediu-me"], " | ",
          ["Vou mandar-lhe", "Vou lhe mandar", "Mandar-lhe-ei", "Vou enviar-lhe", "Vou lhe enviar",
           "Vou mandar-te", "Vou enviar-te"]),
   prompt=NO)
cl(W, 2, T_NO,
   "Prezado senhor, ___ (me avisaram) que o senhor quer vender o carro. Se ___ (lhe interessar), "
   "___ (te mostro) a minha proposta. ___ (Me liga) quando puder. ___ (Te agradeço) desde já.",
   "avisaram-me | lhe interessar | mostro-lhe | Ligue-me | Agradeço-lhe",
   "Tras la coma del saludo, el verbo abre la frase: *avisaram-me*. *Se* atrae el pronombre: *se lhe "
   "interessar* no cambia. Con *o senhor*, *te* pasa a *lhe* (*mostro-lhe*, *agradeço-lhe*), y el "
   "imperativo formal es *ligue-me*.",
   alt=_x("avisaram-me | lhe interessar | ", ["mostro-lhe", "lhe mostro"], " | ",
          ["Ligue-me", "Telefone-me"], " | ", ["Agradeço-lhe"]),
   prompt=NO)
li(W, 2, T_LI, "Encontrar-nos-emos no cais do Valongo.", ["escrita formal", "fala do dia a dia"],
   "escrita formal",
   "La mesóclise (*encontrar-nos-emos*) solo vive en la escritura muy formal. Al hablar: *a gente se "
   "encontra* o *vamos nos encontrar*.", prompt="Escolha: o que você ouviu é fala ou escrita formal?")
li(W, 2, T_LI, "Vi ele ontem e falei pra ele te ligar.", ["fala do dia a dia", "escrita formal"],
   "fala do dia a dia",
   "*Vi ele*, *pra ele*, *te ligar* con *você*: es la charla. Por escrito: *vi-o ontem e pedi-lhe que "
   "ligasse para você*.", prompt="Escolha: o que você ouviu é fala ou escrita formal?")
li(W, 0, T_NU, "Machado de Assis nasceu em mil oitocentos e trinta e nove.", ["1839", "1829", "1893"], "1839",
   "Fijate en la primera palabra, que dice la decena: *trinta e nove* = 39, *vinte e nove* = 29, *noventa e três* = 93.", prompt=LA)
tr(W, None, T_FA, "Estoy leyendo una novela de Machado de Assis.",
   _x(["Estou lendo", "Tô lendo", "Eu estou lendo"], " um romance ", ["de Machado de Assis", "do Machado de Assis"]),
   "Falso amigo: la novela literaria es *o romance* (el *romancista* la escribe); *a novela* es la telenovela.")
tr(W, None, T_FA, "Mi abuela no se pierde la telenovela de las nueve.",
   _x(["Minha avó", "A minha avó", "Minha vó", "A minha vó"], " não perde a novela das nove"),
   "La telenovela es *a novela* (*a novela das nove*, la del horario central). Y «no se pierde» es *não "
   "perde*, sin *se*.")
tr(W, None, T_FA, "El departamento tiene tres ambientes.",
   _x(["O apartamento tem", "O apê tem"], [" três cômodos", " sala e dois quartos", " dois quartos e sala"]),
   "Cada ambiente de la casa es *um cômodo* (como adjetivo, *cômodo* sí es «cómodo»). En los avisos se "
   "cuenta distinto: *sala e dois quartos*.")
le(W, 1, "O bruxo do Cosme Velho",
   "Em Dom Casmurro, Bentinho nunca ___ (diz + nos) com certeza se Capitu o traiu.", "nos diz",
   "*Nunca* atrae el pronombre: *nunca nos diz* (próclise), como en la lectura.")
le(W, 0, "O bruxo do Cosme Velho",
   "O narrador é um defunto que conta a própria vida. ___ (dedicou + a) «ao verme que primeiro roeu as "
   "frias carnes do meu cadáver».", "Dedicou-a",
   "La frase empieza con el verbo y no hay atractor: ênclise, *dedicou-a*: la *a* retoma *a própria "
   "vida*, es decir, el relato de esa vida.")

# ===========================================================================
# Semana 34 — conectores y cohesión
# partes: 0 adversativos · 1 conclusivos, explicativos, consecuencia · 2 aliás, concesión · 3 argumentar
# ===========================================================================
W = 34
li(W, 2, T_LI, "Embora estivesse cansado, ele foi ao debate.",
   ["Fue al debate aunque estaba cansado.", "No fue al debate porque estaba cansado.",
    "Fue al debate porque estaba descansado."],
   "Fue al debate aunque estaba cansado.",
   "*Embora* es concesión («aunque») y lleva subjuntivo: *estivesse*. La causa sería *porque estava*.")
li(W, 3, T_NU, "Cerca de trinta e sete por cento dos moradores usam o metrô.", ["37%", "27%", "47%"], "37%",
   "Fijate en la primera palabra, que dice la decena: *trinta e sete* = 37, *vinte e sete* = 27, *quarenta e sete* = 47. *Cerca de* = alrededor de.",
   prompt=LN)
di(W, 1, "Choveu tanto que a rua alagou e ninguém saiu.",
   "*Tanto* con verbo (*choveu tanto*) + *que* + consecuencia. *Alagar* = inundarse (una calle).")
tr(W, None, T_FA, "Se rompió un caño y se inundó la cocina.",
   _x(["Um cano estourou", "Estourou um cano", "Um cano quebrou", "Quebrou um cano", "Um cano rompeu",
       "Rompeu um cano", "Um cano furou", "Furou um cano"],
      [" e a cozinha alagou", " e alagou a cozinha", " e a cozinha inundou", " e inundou a cozinha",
       " e a cozinha ficou alagada", " e a cozinha ficou inundada"]),
   "El caño es *o cano* (*o encanamento*, la cañería). Y en portugués no hace falta el *se*: *estourou*, "
   "*alagou*.")
cl(W, 1, T_PQ, "Ninguém entendeu ___ o prefeito cancelou a obra. (el motivo por el que)", "por que",
   "Cuando se puede decir «por qual motivo», *por que*, separado y sin tilde: *ninguém entendeu por que*.")
cl(W, 1, T_PQ, "O João não veio à reunião. Você sabe ___?", "por quê",
   "Al final de la frase, *por quê*, separado y con circunflejo.")
cl(W, 1, T_PQ, "Quero entender o ___ dessa decisão.", "porquê",
   "Con artículo es sustantivo, «el porqué»: *o porquê*, junto y con circunflejo.")
pr(W, 3, "En un debate, no estás de acuerdo con un argumento:",
   ["Entendo o argumento, mas vejo de outro jeito.", "Isso está completamente errado, não tem lógica.",
    "Você não entendeu nada do que se discute aqui."],
   "Entendo o argumento, mas vejo de outro jeito.",
   "Primero se reconoce al otro (*entendo o argumento*) y después se discrepa (*mas…*). *Isso está errado* "
   "y *você não entendeu* atacan a la persona: en Brasil suenan agresivos.")
pr(W, 3, "Querés agregar un dato que contradice a un colega, sin atacarlo:",
   ["Só um complemento: os dados de 2022 mostram outra coisa.",
    "Os seus dados estão errados, é só ver os números de 2022.",
    "Ninguém mais usa esses dados; olhe os números de 2022."],
   "Só um complemento: os dados de 2022 mostram outra coisa.",
   "*Só um complemento* presenta la objeción como un agregado: el desacuerdo llega sin decir «está mal».")
pr(W, 3, "Concedés antes de discrepar:",
   ["É verdade que o transporte melhorou; no entanto, ainda é caro.",
    "O transporte melhorou, então não há o que reclamar do preço.",
    "O transporte não melhorou nada e, além disso, continua caríssimo."],
   "É verdade que o transporte melhorou; no entanto, ainda é caro.",
   "Conceder y contraargumentar: *é verdade que…; no entanto…*. Es el movimiento que más se valora en un "
   "texto argumentativo del Celpe-Bras.")
le(W, 2, "Casa-grande e senzala",
   "A obra também idealizava a convivência entre senhores e escravizados, ___ a mistura tivesse suavizado "
   "a violência. (como si)", "como se",
   "Como en castellano, después de *como se* va subjuntivo: imperfeito o, para algo anterior, mais-que-perfeito (*tivesse suavizado*).")
le(W, 3, "Casa-grande e senzala", "Vale a pena lê-lo, desde que se ___ (ler) também os seus críticos.", "leiam",
   "*Desde que* de condición pide subjuntivo, y la pasiva con *se* concuerda con *os seus críticos*: "
   "*se leiam*.")

# ===========================================================================
# Semana 35 — regencia verbal
# partes: 0 assistir, obedecer, namorar · 1 sin preposición, chegar · 2 lembrar, relativo
# ===========================================================================
W = 35
li(W, 0, T_LI, "Assisti ao jogo no Maracanã.", ["Assisti ao jogo", "Assisti o jogo"], "Assisti ao jogo",
   "*Ao* («au») se oye distinto de *o* («u»). *Assistir a* (ver) es la norma; *assistir o jogo* es lo que "
   "más se oye en la charla.", prompt=LF)
li(W, 2, T_NU, "A palestra é no dia doze de agosto, às dezenove horas.",
   ["12/8, às 19h", "2/8, às 9h", "12/8, às 9h"], "12/8, às 19h",
   "*Doze* = 12 (*dois* = 2) y *dezenove* = 19 (*nove* = 9). En los avisos la hora va de 0 a 24: *às "
   "dezenove horas* = a las siete de la tarde.", prompt="Escolha a data e a hora que você ouviu.")
di(W, 2, "Esse é o filme a que eu assisti ontem.",
   "*Assistir a* + relativo: la preposición va delante del *que* (*a que eu assisti*). En la charla: *o "
   "filme que eu assisti*.", alt=["Esse é o filme a que assisti ontem."])
tr(W, None, T_FA, "Trabaja en una firma de ingeniería.",
   _x(["Trabalha", "Ele trabalha", "Ela trabalha"], [" numa", " em uma"], [" firma", " empresa"],
      " de engenharia"),
   "*Firma* es una empresa. Firmar es *assinar*, y la firma, *a assinatura* (solo en *reconhecer firma* "
   "*firma* es la firma).")
tr(W, None, T_FA, "Firmá acá, por favor.",
   _x(["Assine", "Assina"], " aqui, por favor") + _x("Por favor, ", ["assine", "assina"], " aqui"),
   "Poner la firma es *assinar*, y la firma, *a assinatura*. *Firmar* existe, pero es «afianzar» o, en "
   "lo jurídico, cerrar un acuerdo (*firmar um contrato*): para «firmá acá», *assine aqui*.")
tr(W, None, T_FA, "Es mi novio desde hace dos años.",
   _x(["Ele é meu namorado", "Ele é o meu namorado", "É meu namorado", "É o meu namorado"],
      [" há dois anos", " faz dois anos"])
   + _x(["A gente namora", "Nós namoramos", "Namoramos", "A gente está namorando", "Estamos namorando"],
        [" há dois anos", " faz dois anos"]),
   "El novio es *o namorado*; *o noivo* es el prometido (*ficar noivo* = comprometerse). Y «desde hace» "
   "es *há*.")
tr(W, None, T_FA, "Se burlan de él en la escuela.",
   _x(["Tiram sarro dele", "Zombam dele", "Caçoam dele", "Riem dele", "Tiram onda com ele", "Zoam ele",
       "Zoam com ele", "Debocham dele", "Fazem piada dele", "Fazem piada com ele", "Gozam dele"], " na escola")
   + _x(["Na escola, "], ["tiram sarro dele", "zombam dele", "caçoam dele", "zoam ele", "riem dele"]),
   "«Burlarse de» = *zombar de*, *caçoar de*, *tirar sarro de* (charla). *Burlar* es eludir: *burlar a "
   "lei*, *burlar a fiscalização*.")
pr(W, 2, "En la repartição te dicen que falta un papel, pero vos lo entregaste:",
   ["O senhor poderia verificar de novo? Acho que entreguei.",
    "O senhor está enganado, porque eu entreguei esse papel ontem.",
    "Vocês perderam o meu papel de novo, como sempre acontece."],
   "O senhor poderia verificar de novo? Acho que entreguei.",
   "Se insiste con una pregunta (*o senhor poderia…?*) y atenuando la certeza (*acho que*). Decirle que "
   "está equivocado o culpar a la oficina cierra la conversación.")
pr(W, 2, "Te hacen esperar mucho. Insistís sin pelear:",
   ["Desculpe, será que ainda demora? Estou aqui desde as dez.",
    "Isso é um absurdo! Estou esperando aqui desde as dez horas!",
    "Exijo ser atendido agora mesmo: estou aqui desde as dez."],
   "Desculpe, será que ainda demora? Estou aqui desde as dez.",
   "*Desculpe* + *será que…?* deja el reclamo como pregunta. El dato (*desde as dez*) hace el resto.")
pr(W, 2, "El funcionario te pide que vuelvas mañana. Pedís otra solución:",
   ["Entendo. E não haveria outra forma de resolver hoje?", "Não volto amanhã de jeito nenhum: resolvam isso hoje.",
    "Amanhã não dá. Vocês têm que resolver isso hoje mesmo."],
   "Entendo. E não haveria outra forma de resolver hoje?",
   "*Entendo* reconoce el problema del otro; *não haveria…?* (futuro do pretérito) pide sin exigir.")
pr(W, 2, "Te resolvieron el trámite. Te despedís:",
   ["Muito obrigado pela atenção, ajudou muito.", "Valeu mesmo, cara, você salvou a minha vida!",
    "Obrigado, mas da próxima vez sejam mais rápidos."],
   "Muito obrigado pela atenção, ajudou muito.",
   "Con un funcionario, *muito obrigado pela atenção*. *Valeu, cara* es de amigos, y el reproche final "
   "borra el agradecimiento.")
le(W, 0, "O homem cordial", "Sérgio Buarque ___ (referir-se) ao brasileiro como «homem cordial».", "referiu-se",
   "*Referir-se a* + *o brasileiro* = *ao brasileiro*. En la lectura, ênclise: *referiu-se* (con sujeto "
   "delante, *se referiu* también vale).", alt=["se referiu"])
le(W, 0, "O homem cordial", "O homem cordial prefere a intimidade ___ distância.", "à",
   "*Preferir* X *a* Y: *a* + *a distância* = *à distância*. «Prefere a intimidade do que a distância» es "
   "el calco de «más que».")

# ===========================================================================
# Semana 36 — crase
# partes: 0 a + a, masculino, horas · 1 nunca, barrios · 2 àquele, locuciones, a/há/à
# ===========================================================================
W = 36
AH = ("*Há* (= hace) mira al pasado; *a* mira al futuro (*daqui a*) o mide distancia; *à* es a + a. "
      "Suenan igual: probá con *faz* (si entra, es *há*). ")
cl(W, 2, T_AH, "Conheci a Bia ___ cinco anos, numa roda de samba.", "há",
   AH + "Acá «hace cinco años»: *há* (o *faz cinco anos*).", alt=["faz"])
cl(W, 2, T_AH, "O Arpoador fica ___ dez minutos daqui, a pé.", "a",
   AH + "Distancia: *a dez minutos*, sin *h* y sin crase (*minutos* es masculino).")
cl(W, 2, T_AH, "A reforma do prédio termina daqui ___ dois meses.", "a",
   AH + "Futuro: *daqui a dois meses* = dentro de dos meses.")
cl(W, 2, T_AH, "O voo atrasou devido ___ chuva, mas chegamos graças ___ piloto.", "à | ao",
   "*devido a* y *graças a* piden *a*: con *a chuva*, crase (*devido à chuva*); con *o piloto*, *ao*.")
fx(W, 2, T_AH, "Moro no Rio a três anos e ainda me perco no Centro.", "a", "há",
   "Moro no Rio há três anos e ainda me perco no Centro.", "ortografia",
   AH + "Tiempo pasado que sigue hasta hoy: *há três anos* (= faz três anos).", goodAlt=["faz"])
tr(W, 2, T_AH, "Hace dos años que vivo en Río.",
   _x(["Há", "Faz"], " dois anos que ", ["moro", "eu moro", "vivo", "eu vivo"], " no Rio")
   + _x(["Moro", "Eu moro", "Vivo", "Eu vivo"], " no Rio há dois anos"),
   "«Hace» + tiempo = *há* (o *faz*), con *h*: *há dois anos*, no «a dois anos».")
li(W, 2, T_AH, "Ele chegou há dois anos.", ["Llegó hace dos años.", "Llega dentro de dos años."],
   "Llegó hace dos años.",
   "*Há* y *a* suenan igual: lo que decide es el verbo. *Chegou* (pasado) va con *há*; *chega daqui a "
   "dois anos* sería el futuro.")
li(W, 2, T_AH, "Ele chega daqui a dois anos.", ["Llegó hace dos años.", "Llega dentro de dos años."],
   "Llega dentro de dos años.",
   "*Daqui a* mira adelante: «dentro de». Con el pasado (*chegou*) sería *há dois anos*.")
li(W, 0, T_NU, "O show começa às vinte e uma e trinta.", ["21h30", "20h30", "21h13"], "21h30",
   "*Vinte e uma* (en femenino, porque piensa en *horas*) *e trinta* = 21h30. Y ante la hora, crase: "
   "*às vinte e uma*.", prompt=LH)
li(W, 0, T_NU, "A loja abre de segunda a sábado, das nove às seis.",
   ["das 9h às 18h", "das 19h às 16h", "das 9h às 16h"], "das 9h às 18h",
   "*Das nove às seis*: de 9 a 18 (las seis de la tarde). *Dezesseis* sería 16. Y *de segunda a sábado*, "
   "sin crase: *sábado* es masculino.", prompt=LH)
tr(W, None, T_FA, "Este artista no necesita presentación.",
   _x(["Esse artista", "Este artista"], " dispensa apresentação") +
   _x(["Esse artista", "Este artista"], " não precisa de apresentação"),
   "*Dispensar* es «no necesitar, prescindir de» (y también eximir o despedir). Disculpar es *desculpar*.")
tr(W, None, T_FA, "Cayó en la trampa.",
   _x(["Caiu", "Ele caiu", "Ela caiu"], " na ", ["armadilha", "cilada", "arapuca"]),
   "La trampa es *a armadilha* (o *a cilada*, *a arapuca*). Hacer trampa en el juego es *trapacear* o "
   "*roubar*; *trampa* no se usa en Brasil (y *trampo*, en la charla, es «laburo»).")
le(W, 2, "Uma noite na Lapa", "Graças ___ aquela obra, a água chegava ___ fontes do Centro.", "àquela | às",
   "Hay crase porque se juntan dos *a*: la preposición y el comienzo de la palabra. *Graças a* + *aquela* da *àquela*; *chegar a* + *as fontes* da *às fontes*.")

# ===========================================================================
# Semana 37 — verbos irregulares y derivados
# partes: 0 manter, intervir · 1 propor, prever · 2 -ear, -iar, caber
# ===========================================================================
W = 37
li(W, 1, T_LI, "Ele propôs uma nova lei.", ["propôs", "propus"], "propôs",
   "*Propôs* (ele) termina en *-ôs*, con o cerrada; *propus* (eu), en *-us*. Como *pôs* / *pus*.",
   prompt=LF)
li(W, 1, T_LI, "Eu compus essa música no ano passado.", ["compus", "compôs"], "compus",
   "*Compus* (eu) suena *-ús*; *compôs* (ele), *-ôs*. La vocal final dice quién.", prompt=LF)
li(W, 0, T_LI, "O time obteve o primeiro lugar.", ["obteve", "obtive"], "obteve",
   "*Obteve* (ele, ob-TÊ-vi) frente a *obtive* (eu, ob-TCHI-vi): como *teve* / *tive*.", prompt=LF)
li(W, 0, T_LI, "Eu mantive a promessa até o fim.", ["mantive", "manteve"], "mantive",
   "*Mantive* (eu) tiene la *i* de *tive*; *manteve* (ele), la *e* de *teve*.", prompt=LF)
li(W, 2, T_LI, "Eu passeio na orla todo domingo.", ["passeio", "passeia", "passeou"], "passeio",
   "*Passeio* (eu) termina en *-io*; *passeia* (ele), en *-ia*; *passeou* (pasado), en *-ou*.", prompt=LF)
li(W, 1, T_NU, "Brasília foi inaugurada em vinte e um de abril de mil novecentos e sessenta.",
   ["21/4/1960", "21/4/1956", "12/4/1960"], "21/4/1960",
   "*Vinte e um* = 21 (*doze* = 12); *novecentos e sessenta* = 960 (*cinquenta e seis* = 56).", prompt=LD)
di(W, 1, "Juscelino propôs construir uma capital nova no Planalto Central.",
   "*Propôs*: perfeito de *propor*, como *pôs*, con circunflejo.")
tr(W, None, T_FA, "Guardé los papeles en la carpeta azul.",
   _x(["Guardei", "Eu guardei"], " os papéis na pasta azul"),
   "La carpeta es *a pasta* (también la de la compu). La pasta de comer es *a massa*. Y *papel* → *papéis*.")
tr(W, None, T_FA, "Me olvidé el dentífrico.",
   _x(["Esqueci", "Eu esqueci"], [" a pasta de dente", " a pasta de dentes", " o creme dental"])
   + _x(["Esqueci", "Eu esqueci", "Me esqueci", "Eu me esqueci", "Esqueci-me"],
        [" da pasta de dente", " da pasta de dentes", " do creme dental"]),
   "El dentífrico es *a pasta de dente* (o *creme dental*). «Me olvidé» se dice *esqueci* (sin *me*) "
   "o *me esqueci de*: con el pronombre, va *de*.")
le(W, 1, "Brasília, a capital inventada", "Em 1956, o presidente Juscelino Kubitschek ___ (propor) uma meta ousada.",
   "propôs", "*Propor* se conjuga como *pôr*: *pôs* → *propôs*, con circunflejo.")
le(W, 0, "Brasília, a capital inventada", "Foi JK quem a ___ (manter) contra todas as críticas.", "manteve",
   "*Manter* como *ter*: *teve* → *manteve*. «Manteu» lo regulariza.")

# ===========================================================================
# Semana 38 — portugués hablado de Brasil
# partes: 0 tá, tô, né, reacciones · 1 cadê, ter por haver · 2 pronombres, cuándo usarlo · 3 tema, destacar
# ===========================================================================
W = 38
li(W, 0, T_HR, "Cê num vai?", ["Você não vai?", "Você não vem?", "Você vai num lugar?"], "Você não vai?",
   "En el habla rápida, *você* → *cê* y *não* delante del verbo → *num*: *cê num vai?* = *você não vai?*.",
   prompt=LR)
li(W, 0, T_HR, "Tava lá não.", ["Não estava lá.", "Estava lá, sim.", "Não era lá."], "Não estava lá.",
   "*Tava* = *estava*, y el *não* al final (muy del Nordeste, y cada vez más general) niega igual: *tava "
   "lá não* = *não estava lá*.", prompt=LR)
li(W, 0, T_HR, "Bora que já tá tarde!", ["Vamos embora, que já está tarde!", "Fica, que ainda é cedo!",
                                        "Vou embora amanhã à tarde."],
   "Vamos embora, que já está tarde!",
   "*Bora* = *vamos embora* («vamos»), y *tá* = *está*. El *que* explica: «que ya es tarde».", prompt=LR)
li(W, 0, T_HR, "Pera aí que já tô indo!", ["Espera aí, que já estou indo!", "Para aí, que eu já fui!",
                                          "Espera, que eu não vou!"],
   "Espera aí, que já estou indo!",
   "En el habla rápida se comen sílabas: *pera aí* (o *peraí*) es *espera aí* y *tô* es *estou*. *Já tô indo* = «ya voy».", prompt=LR)
cl(W, 2, T_RE,
   "Áudio: «Oi, seu Carlos! Tá vazando água lá na garagem, tá? Cê pode mandar alguém dar uma olhada? "
   "Valeu!» → E-mail: Prezado senhor Carlos, ___ (tá vazando) água na garagem. ___ (cê pode) enviar "
   "alguém para verificar? ___ (valeu!)",
   "está vazando | O senhor poderia | Agradeço desde já",
   "En el e-mail: formas plenas (*está*), *o senhor* en lugar de *cê* y pedido en futuro do pretérito "
   "(*poderia*). *Valeu* se vuelve un agradecimiento formal.",
   alt=_x("está vazando | ",
          ["O senhor poderia", "O senhor pode", "Seria possível", "Poderia"], " | ",
          ["Agradeço desde já", "Desde já, agradeço", "Agradeço a atenção", "Muito obrigado",
           "Desde já agradeço", "Muito obrigada"]),
   prompt=RF)
cl(W, 2, T_RE,
   "Aviso: «Informamos que a água será cortada amanhã, das 8h às 12h. Solicitamos que os moradores "
   "economizem.» → WhatsApp: Gente, amanhã ___ (a água será cortada) das 8 ao meio-dia. ___ "
   "(solicitamos que economizem), tá?",
   "vão cortar a água | Economizem",
   "En la charla, la pasiva (*será cortada*) se vuelve 3.ª plural sin sujeto (*vão cortar a água*) o "
   "*vai faltar água*; el pedido formal, un imperativo directo con *tá?* que lo suaviza.",
   alt=_x(["vão cortar a água", "vai faltar água", "vão desligar a água", "cortam a água",
           "a água vai ser cortada", "não vai ter água"], " | ",
          ["Economizem", "Economizem água", "Economizem aí", "Economiza aí", "Economizem a água"]),
   prompt=RC)
di(W, 0, "Cê vai mesmo pra Ouro Preto no feriado?",
   "*Cê* = *você*, *pra* = *para*. Se escribe así en el chat; en un texto formal, *você vai mesmo para…*.",
   alt=["Você vai mesmo pra Ouro Preto no feriado?", "Cê vai mesmo para Ouro Preto no feriado?",
        "Você vai mesmo para Ouro Preto no feriado?"])
tr(W, None, T_FA, "Prefiero verla con subtítulos.",
   _x(["Prefiro ", "Eu prefiro "], ["ver", "assistir", "ver o filme", "assistir o filme", "assistir ao filme",
                                   "vê-lo", "ver ele"], [" com legenda", " legendado", " com legendas"])
   + _x(["Prefiro ", "Eu prefiro "], ["ver a série", "assistir a série", "assistir à série", "vê-la", "ver ela",
                                   "assistir a ela"], [" com legenda", " legendada", " com legendas"]),
   "Los subtítulos son *a legenda* (*filme legendado*); la leyenda es *a lenda*. Y ojo con el género: "
   "*o filme* es masculino (*vê-lo*, *ver ele*); si es *a série*, *vê-la*.")
tr(W, None, T_FA, "Extraño Buenos Aires.",
   _x(["Tenho saudade", "Tenho saudades", "Estou com saudade", "Estou com saudades", "Tô com saudade",
       "Tô com saudades", "Sinto saudade", "Sinto saudades", "Sinto falta", "Eu tenho saudade",
       "Eu tenho saudades", "Eu sinto saudade", "Eu sinto falta", "Eu estou com saudade"], " de Buenos Aires"),
   "«Extrañar» (echar de menos) es *ter saudade de* o *sentir falta de*. *Estranhar* es encontrar raro: "
   "*estranhei o silêncio*.")
tr(W, None, T_FA, "Me pareció raro que no llamara.",
   _x(["Estranhei", "Achei estranho"], [" que ele não ligasse", " ele não ter ligado", " que ele não tenha ligado",
                                        " que ela não ligasse", " ela não ter ligado", " que ela não tenha ligado",
                                        " que não ligasse", " que não tenha ligado", " ele não ligar",
                                        " ela não ligar"]),
   "*Estranhar* = encontrar raro, sorprenderse: *estranhei que…*. No es «extrañar a alguien» (*ter saudade*).")
le(W, 1, "Papo de boteco", "Nossa, ___ meu caderno? Vou anotar tudo.", "cadê",
   "*Cadê?* = ¿dónde está?, sin verbo: *cadê meu caderno?*.")

# ===========================================================================
# Semana 39 — jefe B2: el error dentro de un texto entero
# partes: 0 futuro do subj., condicionales, indirecto, correlación · 1 regencia, crase, conectores…
# ===========================================================================
W = 39
fx(W, 0, T_JE,
   "Prezada Ana, obrigado pelo convite para a reunião de quinta. Infelizmente, não vou poder participar, "
   "porque estarei em Brasília a trabalho. Quando eu ver a ata, mando os meus comentários. Se precisar "
   "de alguma informação antes, é só me escrever. Um abraço, Martín.",
   "ver", "vir",
   "Prezada Ana, obrigado pelo convite para a reunião de quinta. Infelizmente, não vou poder participar, "
   "porque estarei em Brasília a trabalho. Quando eu vir a ata, mando os meus comentários. Se precisar "
   "de alguma informação antes, é só me escrever. Um abraço, Martín.",
   "futuro_subj",
   "*Quando* + algo futuro pide futuro do subjuntivo, y el de *ver* es *vir* (de *viram*): *quando eu "
   "vir a ata*. «Quando eu ver» es el error más común de la estación.")
fx(W, 0, T_JE,
   "Prezados editores, li com interesse a reportagem sobre o transporte público. Se a prefeitura "
   "investisse mais nos ônibus, a cidade respiraria melhor. No entanto, se eu poderia sugerir algo, seria "
   "ampliar as ciclovias na Zona Norte, onde muita gente pedala até o trabalho. Atenciosamente, Sofía Gómez.",
   "poderia", "pudesse",
   "Prezados editores, li com interesse a reportagem sobre o transporte público. Se a prefeitura "
   "investisse mais nos ônibus, a cidade respiraria melhor. No entanto, se eu pudesse sugerir algo, seria "
   "ampliar as ciclovias na Zona Norte, onde muita gente pedala até o trabalho. Atenciosamente, Sofía Gómez.",
   "subjuntivo",
   "Tras el *se* de condición, imperfeito do subjuntivo: *se eu pudesse sugerir*. El futuro do pretérito "
   "(*seria*) va en la otra mitad. *Se eu puder sugerir* también se acepta.", goodAlt=["puder"])
fx(W, 0, T_JE,
   "Prezados moradores, informamos que a piscina ficará fechada para manutenção até o dia 15. "
   "Precisam-se de voluntários para ajudar na festa junina do prédio, que será no sábado, a partir das "
   "18h. Os interessados devem procurar a portaria até sexta-feira. Contamos com a colaboração de todos. "
   "A administração.",
   "Precisam-se", "Precisa-se",
   "Prezados moradores, informamos que a piscina ficará fechada para manutenção até o dia 15. "
   "Precisa-se de voluntários para ajudar na festa junina do prédio, que será no sábado, a partir das "
   "18h. Os interessados devem procurar a portaria até sexta-feira. Contamos com a colaboração de todos. "
   "A administração.",
   "concordancia",
   "Con preposición (*precisar de*), el *se* indetermina y el verbo queda en singular: *precisa-se de "
   "voluntários*. Concuerda solo cuando no hay preposición (*vendem-se casas*).")
fx(W, 1, T_JE,
   "Oi, Rafael, tudo bem? No sábado vou à Copacabana com a turma do curso para ver o pôr do sol no Leme. "
   "Se você quiser ir junto, a gente se encontra na saída do metrô às cinco. Avisa até sexta, porque "
   "depois vamos jantar e preciso reservar a mesa.",
   "à", "a",
   "Oi, Rafael, tudo bem? No sábado vou a Copacabana com a turma do curso para ver o pôr do sol no Leme. "
   "Se você quiser ir junto, a gente se encontra na saída do metrô às cinco. Avisa até sexta, porque "
   "depois vamos jantar e preciso reservar a mesa.",
   "crase",
   "*Copacabana* va sin artículo (*volto de Copacabana*): sin crase, *vou a Copacabana*. Con *Lapa* sí "
   "(*volto da Lapa* → *vou à Lapa*). En la charla, *vou pra Copacabana*.",
   goodAlt=["pra", "para"])
fx(W, 0, T_JE,
   "Querida Dona Lúcia, a reunião do condomínio foi ontem. O síndico pediu que eu vá à próxima assembleia "
   "representando o nosso andar, e aceitei. Também disseram que a obra do elevador termina daqui a dois "
   "meses. Se a senhora tiver alguma sugestão, me fale antes do dia 20. Beijos, Sofía.",
   "vá", "fosse",
   "Querida Dona Lúcia, a reunião do condomínio foi ontem. O síndico pediu que eu fosse à próxima assembleia "
   "representando o nosso andar, e aceitei. Também disseram que a obra do elevador termina daqui a dois "
   "meses. Se a senhora tiver alguma sugestão, me fale antes do dia 20. Beijos, Sofía.",
   "subjuntivo",
   "Correlación de tiempos: *pediu* (pasado) + imperfeito do subjuntivo, *que eu fosse*. *Vá* iría con "
   "*pede* (presente).")
li(W, 0, T_LI, "Se eu tiver tempo amanhã, eu vou.", ["tiver", "tivesse"], "tiver",
   "*Tiver* (ti-VÉR, dos sílabas): condición posible sobre el futuro. *Tivesse* (tres sílabas) sería "
   "hipótesis: *se eu tivesse tempo, iria*.", prompt=LF)
li(W, 0, T_LI, "Se eu tivesse tempo, eu iria.", ["tivesse", "tiver"], "tivesse",
   "*Tivesse* + *iria*: hipótesis, poco probable o imposible. Con *tiver* la otra mitad sería *vou* o "
   "*irei*.", prompt=LF)
li(W, 1, T_NU, "Em dez de abril de mil novecentos e oitenta e quatro, cerca de um milhão de pessoas foram à "
   "Candelária.", ["10/4/1984", "10/4/1964", "2/4/1984"], "10/4/1984",
   "*Oitenta e quatro* = 84 (*sessenta e quatro* = 64); *dez* = 10 (*dois* = 2).", prompt=LD)
di(W, 0, "Quando vocês forem votar, lembrem-se daquela praça cheia.",
   "*Forem*: futuro do subjuntivo de *ir* (de *foram*). *Lembrem-se de* + *aquela* = *daquela*.")
tr(W, None, T_FA, "¡Qué mala suerte! Me olvidé la carpeta.",
   _x(["Que azar! ", "Que azar, ", "Que falta de sorte! ", "Que falta de sorte, "],
      ["Esqueci a pasta", "Eu esqueci a pasta", "Esqueci a minha pasta", "Esqueci minha pasta",
       "Me esqueci da pasta", "Esqueci da pasta", "Me esqueci da minha pasta", "Eu me esqueci da pasta"]),
   "Vuelven dos falsos amigos: *azar* (mala suerte) y *pasta* (carpeta).")
tr(W, None, T_FA, "Firmá el contrato en la escribanía.",
   _x(["Assine", "Assina"], " o contrato no cartório"),
   "Firmar = *assinar*; la escribanía es *o cartório*. *Firma* es la empresa.")
le(W, 0, "Diretas Já", "Se a emenda ___ (ser) aprovada, o povo teria votado já em 1985.", "tivesse sido",
   "Hipótesis sobre el pasado: *se* + *tivesse* + participio, y *teria votado* en la otra mitad. La "
   "emenda no se aprobó.")
