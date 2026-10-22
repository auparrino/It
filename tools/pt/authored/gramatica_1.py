# -*- coding: utf-8 -*-
"""Gramática del verbo: subjuntivos, condicionales, infinitivo pessoal,
gerundio y discurso indirecto (auditoría de gramática 2026-10, área 1 del
portugués).  Prefijo de los ids: gr1-<semana>-<n>.

Lo que la auditoría marcó como «falta», «flojo» o «mejorable», resuelto con
ítems de PRODUCCIÓN (hueco, traducción con la trampa del castellano,
encontrar el error) en la semana donde se enseña y que vuelven espaciados,
mezclados con la forma que compite:

 1. talvez (antes del verbo: subjuntivo; después: indicativo) y emoción +
    que (fico feliz que, que pena que): 23, 25, 26, 28 y 29.
 2. a não ser que / a menos que / contanto que (24 y 26) y el duelo caso +
    presente do subjuntivo / se + futuro do subjuntivo: 30, 33, 36 y 38.
 3. Relativas con antecedente indefinido (procuro alguém que fale): bloque
    nuevo en la lección 25; ítems en 25, 27, 31 y 34.
 4. tomara que / quem me dera que + imperfeito do subjuntivo (41) y como
    se (39 y 47).
 5. Las tres condicionales con el mismo verbo, en un solo ítem: 30, 39, 44
    y 51 (tabla nueva en la lección 30).
 6. tiver + participio (futuro composto do subjuntivo), que no volvía
    después de la 30: 33, 36, 40, 43, 47 y 51.
 7. Infinitivo pessoal: sujeto propio sin decir (é hora de irmos),
    deixar / ver / mandar + sujeto + infinitivo y la hipercorrección
    (precisamos sairmos): 29, 32 y 39 (tabla nueva en la lección 29).
 8. Gerundismo (vou estar enviando): bloque nuevo en la lección 43; ítems
    en 43 y 49.  Gerundio adverbial de repaso: 46, 48 y 51.
 9. Discurso indirecto espaciado: 34, 37, 40, 43, 46, 48 y 51.
10. Correlación de tiempos (quero que venha / queria que viesse): bloque
    nuevo en la lección 39, duelos «venha o viesse» y «tiver o tivesse» en
    docs/lang/pt/duelli_data.js y huecos dobles en 39, 42, 45, 48 y 51.
11. Fórmulas con subjuntivo (custe o que custar, venha o que vier, quer
    queira quer não, que eu saiba, oxalá): bloque nuevo en la lección 50;
    ítems en 50 y 51.  (aconteça o que acontecer y seja como for ya están en
    construcciones_a.py.)

Respuestas de varios huecos: «a | b» (el alumno escribe «a / b» o «a b»).
"""
from itertools import product

TR = "Traducí al portugués."
TRF = "Traducí al portugués formal."
TRC = "Traducí al portugués coloquial de Brasil."
CO = "Completá con la forma correcta del verbo entre paréntesis."
CP = "Completá."
CE = "Elegí la forma correcta."
FX = "Encontrá el error: tocá la palabra que está mal y corregila."
FXF = "Texto formal. Encontrá el error: tocá la palabra que está mal y corregila."

ITEMS = []
_N = {}


def _level(w):
    return "A1" if w <= 8 else "A2" if w <= 16 else "B1" if w <= 27 else "B2" if w <= 40 else "C1"


def _x(*parts):
    """Todas las combinaciones: cada parte es un texto fijo o una lista de
    opciones.  La primera combinación es la respuesta."""
    out = []
    for c in product(*[p if isinstance(p, list) else [p] for p in parts]):
        s = "".join(c)
        if s not in out:
            out.append(s)
    return out


def _add(w, part, typ, prompt, stem, answer, note, topic, alt=None, **extra):
    _N[w] = _N.get(w, 0) + 1
    seen, clean = set(), []
    for a in alt or []:
        k = a.rstrip(".?!")
        if a and k != answer.rstrip(".?!") and k not in seen:
            seen.add(k)
            clean.append(a)
    d = dict(id="gr1-%d-%02d" % (w, _N[w]), w=w, level=_level(w), type=typ, topic=topic,
             prompt=prompt, stem=stem, answer=answer, alt=clean, note=note)
    if part is not None:
        d["part"] = part
    d.update(extra)
    ITEMS.append(d)
    return d


def tr(w, part, stem, variants, note, topic, prompt=TR):
    """translate: la primera variante es la respuesta; el resto, alt."""
    extra = dict(registro="formal") if prompt == TRF else {}
    return _add(w, part, "translate", prompt, stem, variants[0], note, topic, variants[1:], **extra)


def cl(w, part, stem, answer, note, topic, alt=None, prompt=CO):
    return _add(w, part, "cloze", prompt, stem, answer, note, topic, alt)


def ch(w, part, stem, options, answer, note, topic, prompt=CE):
    assert answer in options
    return _add(w, part, "choice", prompt, stem, answer, note, topic, options=options)


def fx(w, part, stem, bad, good, cat, note, topic, prompt=FX):
    assert stem.count(bad) == 1, stem
    return _add(w, part, "fixerr", prompt, stem, stem.replace(bad, good, 1), note, topic,
                bad=bad, good=good, cat=cat)


# ===========================================================================
# 1. talvez y emoción + que (23-29)
# ===========================================================================
T1 = "subjuntivo: duda y emoción"

ch(23, 2, "Não tenho certeza, mas ele ___ amanhã, talvez.", ["vem", "venha", "venga"], "vem",
   "*Talvez* **después** del verbo no manda nada: el verbo ya se dijo en indicativo (*ele vem, "
   "talvez*), como «viene, tal vez». Delante del verbo, en cambio, pide subjuntivo: *talvez ele venha*.",
   T1)
fx(23, 2, "Talvez ele vem amanhã para o churrasco.", "vem", "venha", "subjuntivo",
   "*Talvez* delante del verbo pide subjuntivo: *talvez ele venha* (vir: venho → venha). "
   "El «quizás viene» del habla rioplatense no pasa al portugués.", T1)
cl(23, 1, "Fico feliz que você ___ (vir) à minha festa.", "venha",
   "Emoción + *que* (*fico feliz que, que pena que, sinto muito que*) pide subjuntivo, como en "
   "castellano: *venha* (venho → venha), nunca «vem».", T1)
tr(23, 1, "Qué lástima que no puedas venir.",
   _x(["Que pena que ", "É uma pena que ", "Pena que "], ["você não possa", "não possa"], " vir."),
   "«Qué lástima que» es *que pena que* (o *é uma pena que*) + subjuntivo: *possa* (posso → "
   "possa). Ojo: *pena* acá es «lástima», no «vergüenza».", T1)
cl(25, None, "Que pena que a Bia não ___ (poder) vir ao churrasco amanhã.", "possa",
   "*Que pena que* (emoción) + presente do subjuntivo: *possa*. El diptongo del castellano "
   "(«pueda») no pasa: *possa*.", T1)
tr(26, 1, "Tal vez llueva mañana.",
   _x(["Talvez chova amanhã.", "Amanhã talvez chova.", "Pode ser que chova amanhã.",
       "É possível que chova amanhã."]),
   "*Talvez* delante del verbo → subjuntivo: *chova* (chover: chovo → chova). Si lo ponés al "
   "final, el verbo va en indicativo: *amanhã chove, talvez*.", T1)
cl(28, None, "Talvez o Rafa ___ (estar) em casa. / O Rafa ___ (estar) em casa, talvez.",
   "esteja | está",
   "Mismo adverbio, distinto lugar: *talvez* antes del verbo pide subjuntivo (*esteja*); "
   "después, el verbo ya salió en indicativo (*está*, talvez).", T1)
fx(29, None, "Sinto muito que você está doente logo nas férias.", "está", "esteja", "subjuntivo",
   "*Sinto muito que* (emoción) + subjuntivo: *esteja*, igual que «siento que estés». El "
   "indicativo es el error de quien traduce palabra por palabra.", T1)


# ===========================================================================
# 2. a não ser que / a menos que / contanto que (24, 26) y caso / se (30-38)
# ===========================================================================
T2 = "subjuntivo: conjunciones"

cl(24, 1, "Vamos à praia no sábado, a não ser que ___ (chover).", "chova",
   "*A não ser que* (a menos que) va siempre con subjuntivo: *chova*. Es condición negativa: "
   "vamos, salvo si llueve.", T2)
cl(24, 1, "Eu te empresto o carro, contanto que você ___ (devolver) amanhã.", "devolva",
   "*Contanto que* = «con tal de que», con subjuntivo: *devolva* (devolvo → devolva). También "
   "valdría *desde que você devolva*.", T2)
fx(24, 1, "A gente vai de bicicleta, a menos que está chovendo.", "está", "esteja", "subjuntivo",
   "*A menos que* pide subjuntivo como «a menos que esté lloviendo»: *esteja chovendo*.", T2)
tr(26, 1, "A menos que llueva, vamos al partido.",
   _x(["A menos que chova", "A não ser que chova"], ", ",
      ["a gente vai", "vamos", "nós vamos"], [" ao jogo.", " no jogo."]) +
   _x(["A gente vai", "Vamos", "Nós vamos"], [" ao jogo", " no jogo"], ", ",
      ["a menos que chova.", "a não ser que chova."]),
   "*A menos que* / *a não ser que* + subjuntivo: *chova*. *Ir ao jogo* es la norma; *ir no "
   "jogo*, del habla.", T2)

CASE = (" *Caso* va con presente do subjuntivo; *se* con algo futuro, con futuro do subjuntivo. "
        "Dicen lo mismo: «caso se» no existe, y «se + presente do subjuntivo», tampoco.")
cl(30, None, "Caso ___ (chover), fico em casa. / Se ___ (chover), fico em casa.", "chova | chover",
   "*Caso chova* (chovo → chova) / *se chover* (igual al infinitivo)." + CASE, T2)
cl(33, None, "Caso você ___ (precisar) de algo, me avise. / Se você ___ (precisar) de algo, me avise.",
   "precise | precisar", "*Caso precise* / *se precisar*." + CASE, T2)
cl(36, None, "Caso a reunião ___ (ser) cancelada, aviso. / Se a reunião ___ (ser) cancelada, aviso.",
   "seja | for", "Con *ser* se ve clarísimo: *caso seja* (subjuntivo presente) / *se for* "
   "(futuro do subjuntivo, de *foram*)." + CASE, T2)
fx(38, None, "Caso você tiver alguma dúvida, me liga.", "tiver", "tenha", "subjuntivo",
   "*Caso* pide presente do subjuntivo: *caso você tenha*. *Tiver* va con *se* (*se você tiver "
   "alguma dúvida*): son dos maneras de decir lo mismo, no se cruzan.", T2)


# ===========================================================================
# 3. Relativas con antecedente indefinido (25, 27, 31, 34)
# ===========================================================================
T3 = "subjuntivo en relativas"

ch(25, 3, "Procuro alguém que ___ inglês e português para o hostel.", ["fale", "fala", "falar"], "fale",
   "No sé si esa persona existe: la relativa va en subjuntivo, *alguém que fale*, como «busco a "
   "alguien que hable». Y sin «a» personal: *procuro alguém*.", T3)
ch(25, 3, "Conheço uma moça que ___ alemão muito bem.", ["fala", "fale", "falasse"], "fala",
   "La moça existe, la conozco: indicativo, *que fala*. El subjuntivo es para lo buscado o "
   "negado (*procuro alguém que fale*).", T3)
cl(25, 3, "Quero alugar um apê que ___ (ter) varanda e seja perto da praia.", "tenha",
   "Un apê que todavía no encontré: subjuntivo, *tenha* (tenho → tenha). Si ya existe (*moro "
   "num apê que tem varanda*), indicativo.", T3)
cl(25, 3, "Não há ninguém aqui que ___ (saber) a senha do wi-fi.", "saiba",
   "Antecedente negado (*ninguém, nada, nenhum*): subjuntivo, *saiba*. Ojo, que el castellano "
   "dice «sepa» y el portugués *saiba*.", T3)
fx(25, 3, "Procuro um professor que sabe alemão para dar aulas ao meu filho.", "sabe", "saiba",
   "subjuntivo",
   "El profesor que busco todavía no apareció: *que saiba* (subjuntivo). *Que sabe* diría que "
   "ya sé quién es.", T3)
tr(25, 3, "Busco a alguien que pueda cuidar al perro el fin de semana.",
   _x(["Procuro", "Estou procurando", "Eu procuro", "Eu estou procurando"], " alguém que possa cuidar ",
      ["do cachorro", "do meu cachorro"], [" no fim de semana.", " neste fim de semana."]),
   "Subjuntivo porque no sé si existe: *alguém que possa*. Sin «a» personal (*procuro alguém*) "
   "y *cuidar de* lleva preposición: *cuidar do cachorro*.", T3)
cl(27, 2, "Quero um apê que ___ (ter) varanda. / Fico com o apê que você ___ (escolher).",
   "tenha | escolher",
   "Lo buscado, que no sé si existe: presente do subjuntivo (*que tenha*). Lo que se va a "
   "decidir después: futuro do subjuntivo (*que você escolher*), como *quem quiser*.", T3)
tr(31, None, "No conozco a nadie que hable ruso.",
   _x(["Não conheço ninguém", "Eu não conheço ninguém"], " que fale russo."),
   "Antecedente negado → subjuntivo: *ninguém que fale*. Sin «a» personal: *não conheço "
   "ninguém*.", T3)
cl(34, None, "Tenho um colega que ___ (falar) japonês. / Preciso de um colega que ___ (falar) japonês.",
   "fala | fale",
   "El colega que tengo existe: indicativo (*fala*). El que necesito, todavía no: subjuntivo "
   "(*fale*).", T3)


# ===========================================================================
# 4. tomara que / quem me dera + imperfeito do subjuntivo (41), como se (39, 47)
# ===========================================================================
T4 = "imperfeito do subjuntivo: deseo"

cl(41, 2, "Ele diz que vai devolver o dinheiro, mas não acredito. Tomara que ___ (ser) verdade! "
          "(= ojalá fuera)",
   "fosse",
   "Deseo que vemos difícil o irreal: *tomara que* + imperfeito do subjuntivo, *fosse* (ojalá "
   "fuera). *Tomara que seja* (ojalá sea) es para lo que puede pasar.", T4)
cl(41, 2, "Quem me dera que ele ___ (vir) com a gente para Salvador!", "viesse",
   "*Quem me dera que* + imperfeito do subjuntivo: *viesse* (vieram → viesse), como «¡ojalá "
   "viniera!». No «venha»: el deseo se ve lejano.", T4)
tr(41, 2, "¡Ojalá estuvieras acá!",
   _x(["Quem me dera que ", "Quem me dera ", "Tomara que "], ["você estivesse aqui!"]) +
   ["Queria que você estivesse aqui!", "Eu queria que você estivesse aqui!"],
   "Algo que no es (no estás acá): imperfeito do subjuntivo, *estivesse*. *Quem me dera* o "
   "*tomara que*; nunca «esteja», que sería un deseo posible.", T4)
cl(39, 0, "Ele fala como se ___ (ser) o dono da empresa.", "fosse",
   "*Como se* va siempre con imperfeito do subjuntivo: *fosse*, igual que «como si fuera». "
   "Nunca «como se é» ni «como se seja».", T4)
fx(47, None, "O governo age como se a crise não existe.", "existe", "existisse", "subjuntivo",
   "*Como se* + imperfeito do subjuntivo: *como se não existisse*. Tras *como se* el "
   "castellano también pide «existiera».", T4)


# ===========================================================================
# 5. Las tres condicionales con el mismo verbo (30, 39, 44, 51)
# ===========================================================================
T5 = "condicionales"
TRES = (" Real (futuro): *se* + futuro do subjuntivo. Posible (presente): *se* + imperfeito do "
        "subjuntivo. Imposible (pasado): *se* + *tivesse* + participio.")

cl(30, 0, "Se eu ___ (ter) tempo amanhã, vou à praia. / Se eu ___ (ter) tempo agora, iria. / "
          "Se eu ___ (ter) tempo ontem, teria ido.",
   "tiver | tivesse | tivesse tido",
   "*Tiver* / *tivesse* / *tivesse tido*: la otra mitad (*vou, iria, teria ido*) te dice cuál "
   "va." + TRES, T5)
cl(30, 0, "Se você ___ (vir) amanhã, a gente janta junto. / Se você ___ (vir) hoje, a gente "
          "jantaria junto. / Se você ___ (vir) ontem, a gente teria jantado junto.",
   "vier | viesse | tivesse vindo",
   "*Vir* engaña: *vier* (futuro do subj.), *viesse* (imperfeito do subj.), *tivesse vindo* "
   "(participio *vindo*)." + TRES, T5)
cl(39, 0, "Se ___ (fazer) sol amanhã, vamos à praia. / Se ___ (fazer) sol hoje, iríamos à praia. "
          "/ Se ___ (fazer) sol ontem, teríamos ido à praia.",
   "fizer | fizesse | tivesse feito",
   "Del tronco de *fizeram*: *fizer*, *fizesse*; y el participio irregular *feito*." + TRES, T5)
cl(39, 0, "Se eu tiver dinheiro, ___ (viajar). / Se eu tivesse dinheiro, ___ (viajar). / "
          "Se eu tivesse tido dinheiro, ___ (viajar).",
   "viajo | viajaria | teria viajado",
   "Ahora la otra mitad: real → presente o futuro (*viajo, vou viajar*); posible → futuro do "
   "pretérito (*viajaria*; habla: *viajava*); imposible → *teria viajado* (habla: *tinha "
   "viajado*). Nunca *tivesse* en esta mitad.",
   T5, alt=_x(["viajo", "vou viajar", "viajarei"], " | ", ["viajaria", "viajava"], " | ",
              ["teria viajado", "tinha viajado"]))
cl(44, None, "Se a gente ___ (sair) cedo amanhã, chega a tempo. / Se a gente ___ (sair) cedo "
             "agora, chegaria a tempo. / Se a gente ___ (sair) cedo ontem, teria chegado a tempo.",
   "sair | saísse | tivesse saído",
   "*Sair* (igual al infinitivo), *saísse* y *saído*, con tilde por el hiato. *A gente* va con "
   "el verbo en tercera del singular." + TRES, T5)
cl(51, 0, "Se o país ___ (investir) em ciência, crescerá. / Se o país ___ (investir) em ciência, "
          "cresceria. / Se o país ___ (investir) em ciência, teria crescido.",
   "investir | investisse | tivesse investido",
   "El resultado decide: *crescerá* (real), *cresceria* (posible), *teria crescido* "
   "(imposible)." + TRES, T5)


# ===========================================================================
# 6. tiver + participio (33-51)
# ===========================================================================
T6 = "futuro composto do subjuntivo"
TIVER = (" *Tiver* + participio = «cuando / si haya hecho»: algo futuro ya terminado. "
         "«Quando eu tenha feito» es el calco del castellano.")

cl(33, None, "Quando eu ___ (terminar: ter + particípio) o relatório, te mando.", "tiver terminado",
   "Con *quando* y algo futuro, el auxiliar *ter* va en futuro do subjuntivo: *tiver terminado*."
   + TIVER, T6)
fx(36, None, "Quando eu tenha terminado a mudança, aviso todo mundo.", "tenha", "tiver",
   "futuro_subj",
   "Tras *quando* con algo por venir va futuro do subjuntivo, también en el compuesto: *quando "
   "eu tiver terminado*. *Tenha terminado* va con *espero que, talvez*." + TIVER, T6)
cl(40, None, "Se até o fim do mês a empresa não ___ (cumprir: ter + particípio) o acordo, o "
             "sindicato fará greve.", "tiver cumprido",
   "*Se* + algo que tendrá que estar hecho para cierta fecha: *tiver cumprido*." + TIVER, T6)
cl(43, 2, "Assim que o senhor ___ (receber: ter + particípio) os documentos, peço que confirme "
          "o recebimento.", "tiver recebido",
   "*Assim que* + acción futura terminada: *tiver recebido*. Fórmula muy de mail formal; "
   "el *peço que confirme* sigue en presente do subjuntivo." + TIVER, T6)
cl(47, None, "Caso o cliente já ___ (pagar: ter + particípio) a fatura, desconsidere este aviso. / "
             "Se o cliente já ___ (pagar: ter + particípio) a fatura, desconsidere este aviso.",
   "tenha pagado | tiver pagado",
   "*Caso* pide presente do subjuntivo (*tenha pagado*); *se*, futuro do subjuntivo (*tiver "
   "pagado*). Con *ter*, el participio *pago* también vale, y en Brasil es el más común.",
   T6, alt=["tenha pago | tiver pago", "tenha pago | tiver pagado", "tenha pagado | tiver pago"])
tr(51, 0, "Cuando hayan leído el informe, lo discutimos.",
   _x("Quando vocês tiverem lido o relatório, ",
      ["a gente discute.", "discutimos.", "nós discutimos.", "a gente conversa.",
       "vamos discutir.", "a gente vai discutir."]) +
   _x(["A gente discute", "Discutimos", "Vamos discutir"], " o relatório quando vocês tiverem lido."),
   "«Cuando hayan leído» = *quando vocês tiverem lido*: *tiver* en futuro do subjuntivo + "
   "participio. No «tenham lido» (eso es para *espero que*).", T6)


# ===========================================================================
# 7. Infinitivo pessoal: sujeto sin decir, causativos, hipercorrección (29-39)
# ===========================================================================
T7 = "infinitivo pessoal"

cl(29, 2, "Já são dez horas, pessoal: está na hora de nós ___ (ir).", "irmos",
   "El infinitivo tiene sujeto propio (*nós*): se flexiona, *irmos*. Sin sujeto (*é hora de "
   "ir*) sería en general, para cualquiera.", T7)
tr(29, 2, "Los vi salir del bar.",
   ["Vi eles saírem do bar.", "Eu vi eles saírem do bar.", "Vi eles sair do bar.",
    "Eu vi eles sair do bar.", "Eu os vi sair do bar.", "Os vi sair do bar.", "Vi-os sair do bar."],
   "Con *ver, ouvir, deixar, mandar*, el sujeto del infinitivo va en el medio. En el habla: *vi "
   "eles saírem* (o *sair*); escrito: *eu os vi sair* (con pronombre átono, sin flexión).", T7)
tr(29, 2, "Dejame ver.",
   ["Deixa eu ver.", "Me deixa ver.", "Deixe-me ver.", "Deixa-me ver.", "Me deixe ver.",
    "Deixe eu ver."],
   "En Brasil se dice *deixa eu ver*: el *eu* es el sujeto de *ver*. Escrito o formal, *deixe-me "
   "ver*. «Deixa mim ver» es error: *mim* nunca es sujeto.", T7)
cl(32, None, "O professor deixou os alunos ___ (usar) o dicionário na prova.", "usarem",
   "Con *deixar* + sujeto en el medio, flexionar es lo más claro (*os alunos usarem*); sin "
   "flexión (*usar*) también es correcto.", T7, alt=["usar"])
fx(39, 0, "Nós precisamos sairmos agora, senão perdemos o ônibus.", "sairmos", "sair", "inf_pessoal",
   "Mismo sujeto y verbo auxiliar o modal (*precisar, querer, poder, dever, ir*) + infinitivo: "
   "sin flexión, *precisamos sair*. «Sairmos» es hipercorrección.", T7)


# ===========================================================================
# 8. Gerundismo (43, 49) y gerundio adverbial (46, 48, 51)
# ===========================================================================
T8 = "gerundio y gerundismo"

fx(43, 2, "Vamos estar confirmando a sua reserva até o fim do dia.", "estar confirmando", "confirmar",
   "registro",
   "Gerundismo: *vamos estar confirmando* es un calco del inglés muy criticado. Confirmar es un "
   "acto puntual: *vamos confirmar* (o *confirmaremos*).", T8, prompt=FXF)
fx(43, 2, "O senhor vai estar recebendo o boleto por e-mail amanhã.", "estar recebendo", "receber",
   "registro",
   "Recibir el boleto es un acto puntual, no algo en curso: *vai receber* (o *receberá*). "
   "*Vai estar recebendo* es el gerundismo de la atención al cliente.", T8, prompt=FXF)
ch(43, 2, "E-mail ao cliente: «Em breve ___ o seu cadastro.»",
   ["atualizaremos", "vamos estar atualizando", "estaremos atualizando"], "atualizaremos",
   "En un mail formal, el futuro simple (*atualizaremos*) o *vamos atualizar*. Las otras dos "
   "son gerundismo: suenan a call center.", T8)
tr(43, 2, "Le enviaré la factura mañana.",
   _x(["Enviarei", "Vou enviar", "Vou lhe enviar", "Envio", "Eu enviarei", "Eu vou enviar",
       "Eu lhe enviarei", "Lhe enviarei"], " a fatura amanhã.") +
   _x("Amanhã ", ["enviarei", "vou enviar", "lhe enviarei", "envio"], " a fatura.") +
   ["Enviar-lhe-ei a fatura amanhã.", "Vou enviar-lhe a fatura amanhã.", "Envio-lhe a fatura amanhã.",
    "Amanhã lhe envio a fatura.", "Vou enviar a fatura ao senhor amanhã."],
   "Futuro simple (*enviarei*) o *vou enviar*. Nunca «vou estar enviando»: es el gerundismo, "
   "mal visto justo en los mails formales.", T8, prompt=TRF)
fx(49, None, "Por favor, aguarde: vou estar transferindo a sua ligação.", "estar transferindo",
   "transferir", "registro",
   "Transferir una llamada es un acto puntual: *vou transferir* (o *já transfiro*). *Vou estar "
   "transferindo* es gerundismo: en registro culto, evitalo.", T8, prompt=FXF)
tr(46, None, "Saliendo temprano, llegamos a tiempo.",
   _x("Saindo ", ["cedo", "mais cedo"], ", ", ["chegamos", "a gente chega", "nós chegamos"], " a tempo."),
   "Gerundio adverbial = condición o modo: *saindo cedo* (si salimos temprano). El gerundio "
   "de *sair* es *saindo*: sin la «l» del castellano («saliendo»).", T8)
cl(48, None, "___ (pôr) tudo na balança, a proposta é boa.", "Pondo",
   "Gerundio de *pôr*: *pondo* (de *pôr*, no «poniendo»). Abre la frase como «poniendo todo en "
   "la balanza».", T8)
cl(51, 2, "___ (terminar) o mestrado, ela voltou para Rosario. (= cuando terminó)", "Terminando",
   "Gerundio adverbial de tiempo: *terminando o mestrado* = *quando terminou*. Con anterioridad "
   "marcada, también *tendo terminado*.", T8, alt=["Tendo terminado", "Ao terminar"])


# ===========================================================================
# 9. Discurso indirecto espaciado (34-51)
# ===========================================================================
T9 = "discurso indireto"

cl(34, None, "«Vou sair mais cedo amanhã.» → Ela disse que ___ (ir) sair mais cedo no dia seguinte.",
   "ia",
   "Con *disse* en pasado, *vou* retrocede a *ia*; y *amanhã* pasa a *no dia seguinte*. «Disse "
   "que vai» solo si se cuenta el mismo día.", T9)
tr(37, None, "Me pidió que la llame.",
   _x(["Ela me pediu ", "Ela pediu ", "Me pediu ", "Pediu "],
      ["que eu ligasse ", "para eu ligar ", "pra eu ligar "], ["para ela.", "pra ela."]) +
   _x(["Ela me pediu ", "Me pediu "], ["que ligasse ", "para ligar ", "pra ligar "],
      ["para ela.", "pra ela."]) +
   ["Ela me pediu que eu lhe telefonasse.", "Ela me pediu para telefonar para ela.",
    "Ela pediu que eu telefonasse para ela."],
   "En el Río de la Plata, «me pidió que la llame»; en portugués, *pediu* (pasado) arrastra el "
   "imperfeito do subjuntivo: *que eu ligasse*. O, más simple, *pediu para eu ligar*.", T9)
cl(40, None, "«Vamos investir em escolas amanhã.» → O ministro afirmou que ___ (investir) em "
             "escolas no dia seguinte.",
   "investiriam",
   "Futuro visto desde el pasado → futuro do pretérito: *investiriam* (o *iam investir*). Y "
   "*amanhã* → *no dia seguinte*.", T9,
   alt=["iam investir", "iriam investir", "investiria", "ia investir"])
cl(43, None, "«Envie o contrato hoje.» → O diretor pediu que eu ___ (enviar) o contrato naquele dia.",
   "enviasse",
   "El imperativo pasa a imperfeito do subjuntivo tras *pediu*: *enviasse*. Nunca «que eu envie» "
   "con el verbo de decir en pasado.", T9)
cl(46, None, "«Você já esteve em Lisboa?» → Ela me perguntou ___ eu já ___ (estar) em Lisboa.",
   "se | tinha estado",
   "Pregunta de sí o no → *perguntou se* (nunca «que se»); el perfeito retrocede a *tinha* + "
   "participio: *tinha estado* (formal: *havia estado*).", T9, prompt=CP,
   alt=["se | havia estado", "se | estivera"])
cl(48, None, "«Quando a obra terminar, reabriremos a estação.» → A prefeitura informou que, "
             "quando a obra ___ (terminar), ___ (reabrir) a estação.",
   "terminasse | reabriria",
   "El futuro do subjuntivo retrocede a imperfeito do subjuntivo (*terminasse*) y el futuro a "
   "futuro do pretérito (*reabriria*, con *a prefeitura* como sujeto).", T9,
   alt=["terminasse | reabririam", "terminasse | ia reabrir", "terminasse | iria reabrir"])
tr(51, 0, "Me dijo que me llamaría al día siguiente.",
   _x(["Ele me disse que", "Ele disse que", "Me disse que", "Disse que", "Ela me disse que",
       "Ela disse que"], [" me ligaria", " ia me ligar", " me ligava", " iria me ligar"],
      " no dia seguinte."),
   "Futuro visto desde el pasado: *ligaria* (habla: *ia me ligar*). «Al día siguiente» es *no "
   "dia seguinte*, no *amanhã*.", T9)


# ===========================================================================
# 10. Correlación de tiempos (39-51)
# ===========================================================================
T10 = "correlação de tempos"
CORR = (" La principal manda: presente → presente do subjuntivo; pasado o condicional → "
        "imperfeito do subjuntivo.")

cl(39, 0, "Quero que você ___ (vir) à festa. / Queria que você ___ (vir) à festa.", "venha | viesse",
   "*Quero que venha* / *queria que viesse*. «Quería que vengas» es rioplatense; en portugués "
   "no pasa." + CORR, T10)
cl(39, 0, "Espero que eles ___ (gostar) do presente. / Esperava que eles ___ (gostar) do presente.",
   "gostem | gostassem", "*Espero que gostem* / *esperava que gostassem*." + CORR, T10)
cl(42, None, "Quando ele ___ (chegar), eu ligo. / Ele disse que, quando ___ (chegar), ligaria.",
   "chegar | chegasse",
   "*Quando* + futuro → futuro do subjuntivo (*chegar*); visto desde el pasado, imperfeito do "
   "subjuntivo (*chegasse*), con *ligaria* en la otra mitad.", T10)
cl(45, None, "É importante que todos ___ (saber). / Seria importante que todos ___ (saber).",
   "saibam | soubessem",
   "*É importante que saibam* / *seria importante que soubessem*: el condicional también arrastra "
   "el imperfeito do subjuntivo." + CORR, T10)
cl(48, None, "Se o relatório ___ (ficar) pronto amanhã, publico. / Ele disse que, se o relatório "
             "___ (ficar) pronto no dia seguinte, publicaria.",
   "ficar | ficasse",
   "*Se* + futuro → *ficar* (futuro do subjuntivo); contado desde el pasado → *ficasse* "
   "(imperfeito do subjuntivo).", T10)
cl(51, 0, "Peço que o senhor ___ (assinar) aqui. / Pedi que o senhor ___ (assinar) ali.",
   "assine | assinasse", "*Peço que assine* / *pedi que assinasse*. «Le pedí que firme» no pasa "
   "al portugués." + CORR, T10)


# ===========================================================================
# 11. Fórmulas con subjuntivo (50, 51)
# ===========================================================================
T11 = "fórmulas com subjuntivo"
FORMULA = (" Patrón: presente do subjuntivo + relativo + futuro do subjuntivo del mismo verbo. El "
           "castellano repite el presente («cueste lo que cueste»).")

cl(50, 1, "Custe o que ___ (custar), vou terminar a faculdade.", "custar",
   "*Custe o que custar*: la segunda vez, futuro do subjuntivo (igual al infinitivo en los "
   "regulares)." + FORMULA, T11)
cl(50, 1, "Venha o que ___ (vir), estamos preparados.", "vier",
   "*Venha o que vier* (venga lo que venga): *vier*, del tronco de *vieram*. No «venha o que "
   "venha»." + FORMULA, T11)
fx(50, 1, "Doa a quem doa, a verdade precisa ser dita.", "a quem doa", "a quem doer", "espanol",
   "*Doa a quem doer* (le duela a quien le duela): futuro do subjuntivo de *doer* en la segunda "
   "parte." + FORMULA, T11)
tr(50, 1, "Vamos a terminar la obra, cueste lo que cueste.",
   _x(["Vamos terminar", "A gente vai terminar", "Nós vamos terminar", "Terminaremos"], " a obra",
      [", custe o que custar.", " custe o que custar."]) +
   _x("Custe o que custar, ", ["vamos terminar", "a gente vai terminar", "nós vamos terminar",
                               "terminaremos"], " a obra."),
   "«Cueste lo que cueste» = *custe o que custar*, no «custe o que custe»." + FORMULA, T11)
tr(50, 1, "Que yo sepa, la reunión es a las diez.",
   ["Que eu saiba, a reunião é às dez.", "A reunião é às dez, que eu saiba.",
    "Que eu saiba, a reunião é às dez horas.", "A reunião é às dez horas, que eu saiba."],
   "*Que eu saiba* (que yo sepa): subjuntivo en una fórmula que sola es una oración. *Saiba*, no "
   "«sepa». Y la hora lleva crase: *às dez*.", T11)
tr(50, 1, "Quieras o no, mañana viajamos.",
   _x(["Quer queira, quer não, ", "Queira ou não, ", "Queira ou não queira, ", "Querendo ou não, "],
      ["amanhã a gente viaja.", "amanhã nós viajamos.", "amanhã viajamos.", "a gente viaja amanhã.",
       "viajamos amanhã."]),
   "*Quer queira, quer não* (formal) o *queira ou não* / *querendo ou não* (habla). Con *você*, "
   "subjuntivo en tercera: *queira*.", T11)
cl(51, 2, "Seja como ___ (ser), o prazo termina hoje.", "for",
   "*Seja como for* (sea como sea): *seja* + futuro do subjuntivo de *ser*, *for*. «Seja como "
   "seja» es el calco.", T11)
