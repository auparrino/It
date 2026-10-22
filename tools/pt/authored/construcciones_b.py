# -*- coding: utf-8 -*-
"""Construcciones que el castellano no tiene o arma de otra manera (plan
2026-10, Tanda 1, portugués): ítems de producción espaciados (prefijo cx-b-).

Cuatro hilos, cada uno vuelve en varias semanas:

  - há / faz + tiempo («hace dos semanas», «desde hace un mes»): 11, 21,
    30 y 36;
  - acabar de y las perífrasis aspectuales (voltar a, chegar a, vir a,
    andar / viver + gerúndio, ficar de): 21, 33, 38 y 47;
  - infinitivo pessoal y «para + infinitivo» traducidos desde
    «que + subjuntivo», que es lo que el alumno calca: 30, 32, 35, 37, 40,
    43 y 47 (dos por semana);
  - cambio de estado: ponerse → ficar, volverse / hacerse → virar,
    tornar-se, empezar a (y seguir) → passar a: bloque nuevo en la lección
    22 y repaso en 24, 28, 32, 38, 40, 42, 45 y 49.

Cada ítem va en una semana en la que su gramática ya se explicó
(curriculo.TENSE_WEEK); «part» es la parte de la lección de esa semana.
En las traducciones, `alt` lleva las variantes que un nativo aceptaría
(se arman con _x: cada lista es un lugar con sus opciones).
"""
import itertools

TR = "Traducí al portugués."
TRF = "Traducí al portugués formal."
TRC = "Traducí al portugués coloquial de Brasil."
CO = "Completá con la forma correcta del verbo entre paréntesis."
CE = "Elegí la forma correcta."
FX = "Encontrá el error: tocá la palabra que está mal y corregila."

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
    d = dict(id="cx-b-%d-%02d" % (w, _N[w]), w=w, part=part, level=_level(w),
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
    assert answer in options
    return _add(w, p, "choice", prompt, stem, answer, note, topic=topic, options=list(options))


def fx(w, p, topic, stem, bad, good, cat, note, goodAlt=None):
    assert stem.count(bad) == 1, (stem, bad)
    extra = dict(bad=bad, good=good, cat=cat)
    if goodAlt:
        extra["goodAlt"] = list(goodAlt)
    return _add(w, p, "fixerr", FX, stem, stem.replace(bad, good, 1), note,
                [stem.replace(bad, g, 1) for g in goodAlt or []], topic=topic, **extra)


HA = "há / faz + tiempo"
PF = "perífrasis: acabar de, voltar a, ficar de"
IP = "infinitivo pessoal"
CE_ = "cambio de estado: ficar, virar, tornar-se, passar a"


# ===========================================================================
# Há / faz + tiempo
# ===========================================================================
tr(11, 2, HA, "Llegué a Río hace dos semanas.",
   _x(["Cheguei", "Eu cheguei"], [" ao Rio", " no Rio"], [" há", " faz"], " duas semanas")
   + _x(["Cheguei", "Eu cheguei"], [" ao Rio", " no Rio"], " duas semanas atrás")
   + _x(["Faz", "Há"], " duas semanas que ", ["cheguei", "eu cheguei"], [" ao Rio", " no Rio"]),
   "«Hace» + tiempo se dice *há* (del verbo *haver*, por eso la h) o *faz*: *cheguei há duas semanas*. "
   "También *duas semanas atrás*. Lo que no va es «hace»: es castellano.")
cl(11, 2, HA, "O Rafa voltou de Salvador ___ (hace) três dias.", "há",
   "*Há três dias* = hace tres días (pasado). Lleva h porque es el verbo *haver*. Sin h, *a* mira al "
   "futuro: *daqui a três dias* = dentro de tres días.",
   alt=["faz"], prompt="Completá.")
fx(11, 2, HA, "Faz dois anos atrás que eu cheguei ao Brasil.", "anos atrás", "anos", "sobrante",
   "O *faz / há* adelante, o *atrás* al final, pero no los dos: *faz dois anos que cheguei* o "
   "*cheguei dois anos atrás*. Juntos repiten la idea (como «hace dos años atrás»).")

tr(21, 1, HA, "Hace tres años que vivo en Río.",
   _x(["Faz", "Há"], " três anos que ", ["eu moro", "moro"], " no Rio")
   + _x(["Eu moro", "Moro"], " no Rio ", ["há", "faz"], " três anos"),
   "Igual que en castellano: *faz / há* + tiempo + *que* + presente, porque seguís viviendo ahí. "
   "No hace falta el composto: *moro no Rio há três anos*. «Vivir» en un lugar es *morar*.")
tr(21, 1, HA, "No veo a Bia desde hace un mes.",
   _x(["Não vejo", "Eu não vejo"], " a Bia ", ["há", "faz"], " um mês")
   + _x(["Faz", "Há"], " um mês que ", ["não vejo", "eu não vejo"], " a Bia"),
   "«Desde hace» se dice solo *há* o *faz*: *não vejo a Bia há um mês*. «Desde há» es de Portugal y "
   "«desde faz» no existe. Y sin «a» personal: *vejo a Bia* (la *a* es el artículo).")

tr(30, 2, HA, "Hacía años que no iba a la playa.",
   _x(["Fazia", "Havia"], " anos que ", ["eu não ia", "não ia"], " à praia")
   + _x(["Eu não ia", "Não ia"], " à praia ", ["havia", "fazia", "há"], " anos"),
   "En un relato en pasado, *há / faz* pasan al imperfeito: *havia / fazia anos que não ia*, como "
   "«hacía años». En el habla se oye también *há anos*. *Ir a + a praia* se contrae: *à praia*.")

ch(36, 1, HA, "O último ônibus passou ___ dez minutos.", ["há", "a", "à"], "há",
   "Tiempo pasado → *há* (= hace): *passou há dez minutos*. Tiempo futuro → *a*: *daqui a dez "
   "minutos*. *À* es *a + a* (artículo), y delante de *dez minutos* no hay artículo femenino.")
tr(36, 1, HA, "Me mudé hace un año y dentro de un mes vuelvo.",
   _x(["Eu me mudei", "Me mudei", "Mudei-me", "Mudei"], [" há", " faz"], " um ano e ",
      ["daqui a um mês", "dentro de um mês"], " ", ["volto", "eu volto", "vou voltar", "eu vou voltar"]),
   "Hacia atrás, *há* (con h, de *haver*): *há um ano*. Hacia adelante, *daqui a* (sin h ni crase): "
   "*daqui a um mês*. El hispanohablante los mezcla porque suenan igual.")


# ===========================================================================
# acabar de y perífrasis aspectuales
# ===========================================================================
tr(21, 1, PF, "Acabo de llegar.",
   ["Acabei de chegar", "Eu acabei de chegar", "Acabei de chegar agora", "Cheguei agora", "Eu cheguei agora",
    "Acabo de chegar", "Eu acabo de chegar"],
   "En Brasil, al hablar, «acabo de» + infinitivo va en pasado: *acabei de chegar* (recién llegué). "
   "*Acabo de chegar* también es correcto, pero suena más escrito.")
tr(21, 1, PF, "Recién terminamos de cenar.",
   _x(["Acabamos", "Nós acabamos", "A gente acabou"], " de jantar")
   + _x(["Terminamos", "Nós terminamos", "A gente terminou"], " de jantar agora"),
   "El «recién» rioplatense con pasado se dice *acabar de* en perfeito: *acabamos de jantar*. "
   "*Recém* en portugués solo va pegado a un participio o adjetivo: *recém-chegado*, *recém-casados*.")
cl(21, 1, PF, "Liga para o Rafa agora: ele ___ (acabar) de chegar em casa.", "acabou",
   "*Acabar de* + infinitivo, en perfeito: *ele acabou de chegar* = acaba de llegar, recién llegó. "
   "En presente (*acaba de chegar*) es más escrito.", alt=["acaba"])

tr(33, 2, PF, "Volví a fumar.",
   ["Voltei a fumar", "Eu voltei a fumar", "Tornei a fumar", "Comecei a fumar de novo", "Eu comecei a fumar de novo"],
   "«Volver a» + infinitivo = *voltar a* + infinitivo: *voltei a fumar*. En lo escrito también *tornar a*. "
   "Ojo: *voltar* solo, sin *a* + infinitivo, es volver a un lugar.")
tr(33, 2, PF, "Quedamos en vernos el viernes.",
   _x(["A gente ficou de se ver", "Ficamos de nos ver", "Nós ficamos de nos ver",
       "A gente ficou de se encontrar", "Ficamos de nos encontrar", "Nós ficamos de nos encontrar",
       "A gente combinou de se ver", "Combinamos de nos ver",
       "A gente combinou de se encontrar", "Combinamos de nos encontrar"],
      [" na sexta", " na sexta-feira"]),
   "«Quedar en» (acordar) es *ficar de* + infinitivo, o *combinar de*. *Ficar em* es otra cosa: quedarse "
   "en un lugar (*ficamos em casa*). Con *a gente*, el pronombre es *se*: *a gente ficou de se ver*.")
tr(33, 2, PF, "Se la pasa quejándose.",
   _x(["Ele vive", "Ela vive", "Vive"], [" reclamando", " se queixando"])
   + _x(["Ele passa", "Ela passa"], [" o dia", " o tempo todo"], [" reclamando", " se queixando"]),
   "*Viver* + gerúndio = pasársela haciendo algo, una y otra vez y con fastidio: *ele vive reclamando*. "
   "«Quejarse» es *reclamar* (en la charla) o *queixar-se*.")
tr(33, 2, PF, "Llegué a pensar que no venías.",
   _x(["Cheguei", "Eu cheguei"], " a pensar que você não ", ["vinha", "viria", "ia vir"]),
   "*Chegar a* + infinitivo = llegar a (al punto de): *cheguei a pensar*. Igual que en castellano, "
   "con *a*; lo que cambia es *você* con el verbo en tercera: *você não vinha*.")
cl(33, 2, PF, "Anos depois, aquele menino tímido ___ (vir) a ser presidente do clube.", "veio",
   "*Vir a* + infinitivo = llegar a, terminar (con el tiempo): *veio a ser presidente*. Es más del "
   "relato escrito; en la charla, *acabou virando presidente*.")
cl(33, 2, PF, "Ultimamente eu ___ (andar) dormindo mal.", "ando",
   "*Andar* + gerúndio, como en castellano: *ando dormindo mal* = ando durmiendo mal, algo que se repite "
   "en estos días. Dice lo mismo que *tenho dormido mal*.", alt=["tenho andado"])

tr(38, 2, PF, "Quedé en llamarla y me olvidé.",
   _x(["Fiquei", "Eu fiquei"], " de ", ["ligar pra ela", "ligar para ela", "lhe ligar"], " e ",
      ["esqueci", "me esqueci", "acabei esquecendo"]),
   "«Quedar en» = *ficar de*: *fiquei de ligar*. «Llamarla» se dice *ligar pra ela* (*ligar para* "
   "alguien); *ligar-lhe* es formal. Y en el habla *esquecer* va muchas veces sin *se*: *esqueci*.",
   prompt=TRC)
tr(38, 2, PF, "Recién lo vi a Rafa en el bar.",
   _x(["Acabei de ver", "Eu acabei de ver"], " o Rafa ", ["no bar", "no boteco"])
   + _x(["Vi", "Eu vi"], " o Rafa ", ["agora há pouco", "agora"], [" no bar", " no boteco"]),
   "«Recién» + pasado = *acabar de* en perfeito: *acabei de ver*. El «lo» que duplica al objeto y la "
   "«a» personal se caen: *vi o Rafa*, con el artículo delante del nombre.", prompt=TRC)

tr(47, 1, PF, "Con los años, la medida llegó a ser aceptada por todos.",
   _x(["Com os anos", "Com o tempo", "Ao longo dos anos"], ", a medida ",
      ["veio a ser aceita", "acabou sendo aceita", "acabou por ser aceita", "passou a ser aceita",
       "chegou a ser aceita"], " por todos"),
   "*Vir a* + infinitivo = llegar a (con el tiempo): *veio a ser aceita*. Con *ser*, el participio "
   "corto y concordado: *aceita*, no «aceitada».", prompt=TRF)
tr(47, 0, PF, "Si volvemos a cometer el mismo error, vamos a perder la confianza del público.",
   _x(["Se voltarmos", "Se nós voltarmos", "Se a gente voltar"], " a cometer o mesmo erro, ",
      ["vamos perder", "perderemos", "nós vamos perder", "a gente vai perder"], " a confiança do público"),
   "«Volver a» = *voltar a* + infinitivo. Y el «si + presente» que mira al futuro pide futuro do "
   "subjuntivo: *se voltarmos*, nunca «se voltamos».")


# ===========================================================================
# Infinitivo pessoal desde «que + subjuntivo»
# ===========================================================================
tr(30, 1, IP, "Me alegró que hayan venido.",
   _x(["Fiquei feliz", "Fiquei contente", "Eu fiquei feliz", "Eu fiquei contente"], [" por", " de"],
      [" vocês terem vindo", " terem vindo"])
   + _x(["Fiquei feliz", "Fiquei contente", "Eu fiquei feliz", "Eu fiquei contente"], " que vocês ",
        ["tenham vindo", "vieram"]),
   "«Que + subjuntivo» con otro sujeto → *por* + sujeto + infinitivo pessoal: *por vocês terem vindo* "
   "(= que hayan venido). *Que vocês tenham vindo* también vale, pero el infinitivo es lo más natural.")
tr(30, 1, IP, "Es raro que ellos todavía no hayan llamado.",
   _x(["É estranho", "É esquisito"], " ",
      ["eles ainda não terem ligado", "eles não terem ligado ainda",
       "que eles ainda não tenham ligado", "que eles não tenham ligado ainda"]),
   "*É* + adjetivo + *que* + subjuntivo se puede decir con infinitivo pessoal compuesto: *é estranho "
   "eles não terem ligado*. «Raro» en portugués es sobre todo «poco frecuente»; «extraño» es *estranho*.")

tr(32, 1, IP, "Traje el libro para que lo leas.",
   _x(["Trouxe", "Eu trouxe"], " o livro ",
      ["para você ler", "pra você ler", "para que você leia", "para que você o leia", "para você lê-lo"]),
   "«Para que + subjuntivo» → *para* + sujeto + infinitivo: *para você ler*. *Para que você leia* "
   "también es correcto, pero en Brasil se prefiere el infinitivo, y el «lo» se sobreentiende.")
tr(32, 1, IP, "Hasta que lleguen, no empezamos.",
   _x(["Até eles chegarem", "Até vocês chegarem", "Até que eles cheguem", "Até que vocês cheguem"], ", ",
      ["a gente não começa", "não começamos", "nós não começamos"])
   + _x(["A gente não começa", "Não começamos"], " até ", ["eles chegarem", "vocês chegarem"]),
   "«Hasta que + subjuntivo» → *até* + sujeto + infinitivo pessoal: *até eles chegarem*. En los "
   "regulares coincide con el futuro do subjuntivo; en los irregulares no: *até eles fazerem* (no "
   "«fizerem»), *até eles virem* (no «vierem»).")

tr(35, 1, IP, "Es mejor que lo hablemos en persona.",
   _x("É melhor ", ["a gente conversar", "conversarmos", "nós conversarmos", "a gente falar", "falarmos",
                    "que a gente converse", "que conversemos"],
      ["", " sobre isso"], [" pessoalmente", " ao vivo"]),
   "*É melhor que* + subjuntivo → *é melhor* + infinitivo pessoal: *é melhor conversarmos* (o *a gente "
   "conversar*). Y «hablar algo» no lleva objeto directo: *conversar sobre isso*.")
tr(35, 1, IP, "Antes de que se vayan, firmen acá.",
   _x(["Antes de vocês irem embora", "Antes de irem embora", "Antes que vocês vão embora",
       "Antes de vocês saírem", "Antes de saírem"], ", assinem aqui"),
   "«Antes de que + subjuntivo» → *antes de* + sujeto + infinitivo pessoal: *antes de vocês irem "
   "embora*. «Irse» es *ir embora*; el infinitivo pessoal de *ir* es regular: *irem*.")

tr(37, 0, IP, "Es importante que mantengamos la calma.",
   _x("É importante ", ["mantermos", "nós mantermos", "a gente manter", "que a gente mantenha",
                        "que mantenhamos", "que nós mantenhamos"], " a calma"),
   "*Manter* se conjuga como *ter*, pero el infinitivo pessoal es siempre regular: *mantermos* "
   "(infinitivo + -mos). «Mantivermos» es futuro do subjuntivo y acá no va.")
_v = []
for _pre in ("Pedi", "Eu pedi"):
    for _s in ("eles", "vocês"):
        _v += ["%s para %s proporem outra data" % (_pre, _s), "%s pra %s proporem outra data" % (_pre, _s),
               "%s a %s que propusessem outra data" % (_pre, _s), "%s que %s propusessem outra data" % (_pre, _s)]
_v += ["Pedi-lhes que propusessem outra data", "Pedi que propusessem outra data"]
tr(37, 1, IP, "Les pedí que propusieran otra fecha.", _v,
   "«Pedir que + subjuntivo» → en Brasil, *pedir para* + sujeto + infinitivo pessoal: *pedi para eles "
   "proporem*. *Proporem* sale del infinitivo *propor*; «propuserem» es futuro do subjuntivo.")

tr(40, 1, IP, "Es necesario que los ciudadanos conozcan sus derechos.",
   _x(["É necessário", "É preciso"], " ", ["os cidadãos conhecerem", "que os cidadãos conheçam"],
      [" seus direitos", " os seus direitos"]),
   "*É necessário que* + subjuntivo → *é necessário* + sujeto + infinitivo pessoal: *os cidadãos "
   "conhecerem*. En el informe ahorra un *que* y queda más compacto.", prompt=TRF)
tr(40, 1, IP, "La empresa cerró sin que los empleados fueran avisados.",
   _x("A empresa fechou sem ", ["os funcionários serem avisados", "que os funcionários fossem avisados",
                                "os empregados serem avisados", "que os empregados fossem avisados"]),
   "«Sin que + subjuntivo» → *sem* + sujeto + infinitivo pessoal: *sem os funcionários serem avisados* "
   "(pasiva: *serem* + participio concordado). En una empresa, «empleado» suele ser *funcionário*.",
   prompt=TRF)

tr(43, 2, IP, "Les escribo para que puedan revisar el contrato.",
   _x(["Escrevo-lhes", "Escrevo", "Escrevo a vocês", "Lhes escrevo"], " para ",
      ["poderem", "vocês poderem", "que possam", "que vocês possam"], " ", ["revisar", "analisar"], " o contrato"),
   "«Para que puedan» → *para poderem*: el infinitivo pessoal ya dice quién (ellos / ustedes). En el "
   "mail formal, *escrevo-lhes*; *para que possam* también es correcto.", prompt=TRF)
tr(43, 2, IP, "Agradecemos que nos hayan respondido tan rápido.",
   _x("Agradecemos ", ["por", "por vocês"], [" terem nos respondido", " nos terem respondido", " terem respondido"],
      [" tão rápido", " tão rapidamente", " com tanta rapidez"])
   + ["Agradecemos a resposta tão rápida", "Agradecemos a rapidez da resposta"],
   "*Agradecer por* + infinitivo pessoal compuesto: *por terem respondido* (= que hayan respondido). "
   "Lo más elegante en un mail es nominalizar: *agradecemos a rapidez da resposta*.", prompt=TRF)

tr(47, 0, IP, "Es fundamental que las escuelas tengan acceso a internet.",
   _x("É fundamental ", ["as escolas terem", "que as escolas tenham"], " acesso à internet"),
   "*É fundamental que* + subjuntivo → *é fundamental* + sujeto + infinitivo pessoal: *as escolas "
   "terem*. Y *acesso a + a internet* lleva crase: *à internet*.", prompt=TRF)
tr(47, 1, IP, "Aunque no estemos de acuerdo, hay que escucharlos.",
   _x(["Apesar de não concordarmos", "Apesar de nós não concordarmos", "Apesar de a gente não concordar",
       "Embora não concordemos", "Ainda que não concordemos", "Mesmo não concordando",
       "Mesmo que a gente não concorde"], ", ",
      ["é preciso ouvi-los", "precisamos ouvi-los", "temos que ouvi-los", "é preciso escutá-los",
       "é preciso ouvir eles", "a gente precisa ouvir eles"]),
   "«Aunque + subjuntivo» → *apesar de* + infinitivo pessoal (*apesar de não concordarmos*) o *embora* "
   "+ subjuntivo. «Estar de acuerdo» es *concordar*. En lo escrito, *ouvi-los*; en la charla, *ouvir eles*.")


# ===========================================================================
# Cambio de estado: ficar, virar, tornar-se, passar a (lección 22, bloque nuevo)
# ===========================================================================
tr(22, 2, CE_, "Me puse nervioso antes de la entrevista.",
   _x(["Fiquei", "Eu fiquei"], [" nervoso", " nervosa"], " antes da entrevista"),
   "«Ponerse» + adjetivo (nervioso, rojo, triste) es *ficar*: *fiquei nervoso*. «Me pus nervoso» no "
   "existe: *pôr-se* es ponerse de pie o el sol que se pone.")
tr(22, 2, CE_, "Mi hermano se hizo médico.",
   _x(["Meu irmão", "O meu irmão"], [" virou médico", " se tornou médico", " tornou-se médico"]),
   "«Hacerse / volverse» + sustantivo (profesión, identidad) es *virar* en la charla o *tornar-se*: "
   "*virou médico*. «Se fez médico» es calco. «Se recibió de médico» sería *se formou em Medicina*.")
cl(22, 2, CE_, "Depois que o filho nasceu, ela ___ (passar) a trabalhar de casa.", "passou",
   "*Passar a* + infinitivo = empezar a hacer algo y seguir haciéndolo (un hábito nuevo): *passou a "
   "trabalhar de casa*. *Começou a* solo marca el comienzo.")
cl(22, 2, CE_, "Com a chuva, a rua ___ (se convirtió en) um rio.", "virou",
   "«Convertirse en» + sustantivo es *virar*, sin preposición: *a rua virou um rio*. En lo escrito, "
   "*tornou-se* o *transformou-se em*.", alt=["se tornou", "tornou-se", "se transformou em", "transformou-se em"],
   prompt="Completá con el verbo que corresponde.")
fx(22, 2, CE_, "Quando soube da notícia, ele se pôs muito triste.", "se pôs", "ficou", "espanol",
   "«Se puso triste» es *ficou triste*: los cambios de ánimo van con *ficar*. *Pôr-se* no sirve para "
   "estados (es calco del castellano).")

cl(24, 3, CE_, "Tomara que ele não ___ (ficar) chateado com a notícia.", "fique",
   "*Tomara que* pide subjuntivo: *fique* (la c pasa a qu para conservar el sonido). *Ficar chateado* "
   "= ponerse mal, enojarse: el cambio de ánimo otra vez con *ficar*.")

tr(28, 1, CE_, "Si se hiciera famoso, se olvidaría de nosotros.",
   _x(["Se ele ficasse famoso", "Se ficasse famoso", "Se ele se tornasse famoso"], ", ",
      ["ia esquecer da gente", "ia se esquecer da gente", "esqueceria de nós", "se esqueceria de nós",
       "ele ia esquecer da gente", "ele ia se esquecer da gente"]),
   "«Hacerse famoso / rico» es *ficar famoso / rico*. Y la hipótesis va con imperfeito do subjuntivo "
   "(*se ele ficasse*) + futuro do pretérito o, en el habla, *ia* + infinitivo.")

tr(32, 1, CE_, "Dicen que el barrio se volvió peligroso.",
   _x(["Dizem que", "Diz-se que", "Falam que"], " o bairro ",
      ["ficou perigoso", "se tornou perigoso", "tornou-se perigoso", "virou um lugar perigoso"]),
   "«Volverse» + adjetivo es *ficar* (o *tornar-se*, más escrito): *ficou perigoso*. *Virar* va mejor "
   "con sustantivo: *virou um lugar perigoso*. «Dicen que» sin sujeto: *dizem que*.")

tr(38, 0, CE_, "Esa canción se volvió un hit en todo Brasil.",
   _x(["Essa música", "Essa canção"], " virou ", ["hit", "um hit", "sucesso", "um sucesso"],
      [" no Brasil inteiro", " no Brasil todo", " em todo o Brasil"]),
   "En la charla, *virar* + sustantivo, a veces sin artículo: *virou hit*, *virou moda*. «Canción» es "
   "casi siempre *música*; *canção* es más poético.", prompt=TRC)
cl(38, 1, CE_, "Você ___ (ficar) sabendo da festa de sábado?", "ficou",
   "*Ficar sabendo* = enterarse: *você ficou sabendo?* (¿te enteraste?). Es *ficar* + gerúndio para un "
   "cambio: pasar de no saber a saber.")

tr(40, 1, CE_, "La ciudad se convirtió en un centro industrial.",
   _x("A cidade ", ["tornou-se", "se tornou", "transformou-se em", "se transformou em",
                    "converteu-se em", "se converteu em"], " um centro industrial")
   + _x("A cidade ", ["transformou-se", "se transformou", "converteu-se", "se converteu"], " num centro industrial"),
   "En el texto formal, *tornar-se* + sustantivo, sin preposición: *tornou-se um centro industrial*. "
   "*Transformar-se* y *converter-se* llevan *em*. *Virar* queda para la charla.", prompt=TRF)

tr(42, 2, CE_, "Desde entonces, la empresa empezó a contratar más mujeres.",
   _x("Desde então, a empresa ", ["passou a contratar", "começou a contratar"], " mais mulheres"),
   "*Passar a* + infinitivo marca un cambio que se mantiene (de ahí en más): *passou a contratar*. "
   "*Começou a* también vale, pero solo dice que arrancó.")

fx(45, 0, CE_, "Com o tempo, a Ana virou em minha melhor amiga.", "virou em", "virou", "regencia",
   "*Virar* + sustantivo va sin preposición: *virou minha melhor amiga*. El «en» viene de «se convirtió "
   "en». Con *tornar-se*, tampoco: *tornou-se minha melhor amiga*.",
   goodAlt=["se tornou", "tornou-se"])

tr(49, 2, CE_, "El Marco Civil de Internet se convirtió en ley en 2014.",
   _x("O Marco Civil da Internet ", ["tornou-se", "se tornou", "transformou-se em", "se transformou em",
                                      "converteu-se em", "se converteu em"], " lei em 2014"),
   "Registro formal: *tornou-se lei* (sin preposición) o *transformou-se em lei*. En la charla, *virou "
   "lei*. El Marco Civil da Internet es la Lei 12.965, de 2014.", prompt=TRF)
