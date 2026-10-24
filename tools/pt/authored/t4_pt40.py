# -*- coding: utf-8 -*-
"""Tanda 4 del plan de octubre, portugués, semanas 40-51 (prefijo t4pt40-).

Propuestas de auditorias/PLAN-2026-10-propuestas.md («pt semanas 40-52»)
y de auditorias/2026-10-portugues-revision.md (temporada 4) que no
estaban hechas (los duelos, el Capire y la evidencia negativa del banco
van aparte):

  1. Sonidos de C1: la vocal que cambia entre sustantivo y verbo (o acordo
     [ô] / eu acordo [ó], o começo [ê] / ele começa [é], o apoio / eu
     apoio, o governo / ele governa) y la metafonía del plural y del
     femenino (povo / povos, famoso / famosa, poço / poços, fogo / fogos),
     siempre dentro de una frase para que el TTS no se equivoque con los
     homógrafos.  Van como ítems listen del curso y no como pares de
     Suoni (los pares de Suoni se escriben distinto).  En la 46, «reconstruí
     la palabra» con la reducción de las vocales del portugués europeo.
     La entonación PB / PE queda afuera: no hay voz pt-PT real.
  2. Escuchar la gramática dentro de la ronda: formas que se distinguen de
     oído (estivera / estivesse, tinham / têm saído, ao chegarmos / ao
     chegar, teria / tinha fugido, tenha / tinha, encontrei-o / encontrei
     ele), números, porcentajes con «vírgula», horas, fechas y precios, y
     un dictado por semana.
  3. Semana 41: interpretar el mais-que-perfeito simple en lugar de
     producirlo (¿qué pasó primero?, ¿«había dicho» o «dijera»?, ¿vira de
     ver o de virar?).
  4. Atenuación pragmática y modalización C1 (47 y 49): elegir entre la
     respuesta brusca, la atenuada y la sobreformal; reformular lo brusco;
     elegir el grado de compromiso según el género.  Bloques nuevos en la
     lección 47.
  5. Pendientes: tendo + particípio en la 42.
  6. «Vícios do texto formal» (48-49): onde para todo, a nível de, o mesmo
     como pronombre, fazem dois anos, pensar de que / ter certeza que, la
     mayoría y cerca de, y la coma (sujeto-verbo, porém).  Bloque nuevo en
     la lección 48.
  7. Semana 45 a la altura de C1: heterosemánticos finos (esperto,
     pretender, polido, requintado, desenvolver, competência, presumir,
     propina, firma, largar, em que pese) y prosodia culta (rubrica,
     recorde, gratuito, Nobel, ruim).  Bloques nuevos en la lección 45.
  8. Colocaciones: producir la expresión entera desde el castellano, con la
     trampa a la vista, 2 por semana de la 40 a la 49 (la 46 incluida).
  9. Una frase de la lectura de la semana (letture_settimana.js) con hueco.
 10. Insumos de la prensa brasileña actual: los dictados de 47-50 (tarifa
     zero, enchentes, Enem, saneamento) con el foco gramatical de la semana.

La semana 52 (examen) no lleva ítems de este archivo.  El resto de la
Tanda 4 de 40-52 está en tools/pt/authored/s4.py (semanas 41, 44, 46 y 51,
distractores) y en tools/pt/authored/esame_c1.py.

Criterio: se acepta todo lo que es portugués correcto en Brasil; la nota
dice cuál es la forma más natural.  Cada ítem va en una semana en la que su
gramática ya se explicó; «part» es la parte de la lección de esa semana
(None: la última).  Las consignas van en portugués (semana 27 en adelante):
o están en tools/pt/consignas.py o empiezan con Complete / Escolha / Qual /
Como / Leia…
"""
import itertools

TR = "Traducí al portugués."
TRF = "Traducí al portugués formal."
TRC = "Traducí al portugués coloquial de Brasil."
CO = "Completá."
CE = "Elegí la forma correcta."
SIG = "Elegí el significado."
EQ = "Elegí la equivalencia."
SIT = "Elegí la opción más adecuada a la situación."
DI = "Dictado: escuchá y escribí lo que oís."
FXF = "Texto formal. Encontrá el error: tocá la palabra que está mal y corregila."
CB = "Uní las frases en una sola usando el conector entre paréntesis."
LF = "Qual forma você ouviu?"
LN = "Qual número você ouviu?"
LR = "Leia e responda."
AT = "Complete com a versão atenuada."
LC = "Complete com a palavra que falta: a frase é da leitura da semana."
PE = "Qual é a palavra? Escreva como se escreve."

OF = "fechado [ô], como em avô"
OA = "aberto [ó], como em avó"
EF = "fechado [ê], como em você"
EA = "aberto [é], como em café"

T_SO = "sonidos de C1: vocal abierta o cerrada"
T_LI = "escuchar la gramática"
T_MQ = "mais-que-perfeito: interpretar"
T_PR = "atenuación y modalización"
T_TE = "tendo + particípio"
T_VI = "vícios do texto formal"
T_HS = "heterosemánticos finos"
T_AC = "prosodia culta"
T_CO = "colocaciones desde el español"
T_LE = "lectura de la semana"
T_PE = "portugués europeo: reconocer"

ITEMS = []
_N = {}


def _level(w):
    return "B2" if w <= 40 else "C1"


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
    d = dict(id="t4pt40-%d-%02d" % (w, _N[w]), w=w, level=_level(w),
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
    assert "___" in stem, stem
    return _add(w, p, "cloze", prompt, stem, answer, note, alt, topic=topic)


def ch(w, p, topic, stem, options, answer, note, prompt=CE):
    assert answer in options and len(set(options)) == len(options), stem
    return _add(w, p, "choice", prompt, stem, answer, note, topic=topic, options=list(options))


def ty(w, p, topic, stem, answer, note, alt=None, prompt=PE):
    return _add(w, p, "typed", prompt, stem, answer, note, alt, topic=topic)


def fx(w, p, topic, stem, bad, good, cat, note, goodAlt=None, prompt=FXF):
    assert bad in stem, stem
    extra = dict(bad=bad, good=good, cat=cat)
    if goodAlt:
        extra["goodAlt"] = list(goodAlt)
    return _add(w, p, "fixerr", prompt, stem, stem.replace(bad, good, 1), note,
                [stem.replace(bad, g, 1) for g in goodAlt or []], topic=topic, **extra)


def cb(w, p, topic, stem, variants, note):
    return _add(w, p, "combina", CB, stem, variants[0], note, variants[1:], topic=topic)


def li(w, p, topic, said, options, answer, note, prompt=LF):
    assert answer in options and len(set(options)) == len(options), said
    return _add(w, p, "listen", prompt, said, answer, note, topic=topic, options=list(options), nopeek=True)


def vo(w, p, said, word, answer, note):
    """¿Abierta o cerrada?  La o (o la e) tónica de una palabra dentro de una frase."""
    e = answer in (EF, EA)
    return li(w, p, T_SO, said, [EF, EA] if e else [OF, OA], answer, note,
              prompt="Como soa o «%s» tônico de «%s» nesta frase?" % ("e" if e else "o", word))


def di(w, p, text, note, alt=None, topic=T_LI):
    """Dictado (TTS pt-BR): se oye la frase y se escribe."""
    assert 6 <= len(text.split()) <= 10, text
    return _add(w, p, "dictation", DI, text, text, note, alt, topic=topic, nopeek=True)


def ac(w, p, said, word, options, answer, note):
    """¿Dónde cae el acento?  La palabra dentro de una frase."""
    return li(w, p, T_AC, said, options, answer, note,
              prompt="Qual é a sílaba tônica de «%s» nesta frase?" % word)


# ===========================================================================
# Semana 40 — Registro formal e nominalização (B2)
# partes: 0 nominalización · 1 haver y verbos del informe · 2 cohesión
# ===========================================================================
W = 40
li(W, 1, T_LI, "O Censo de 2022 contou 203 milhões de habitantes no Brasil.",
   ["203 milhões", "230 milhões", "213 milhões"], "203 milhões",
   "*Duzentos e três* (203) frente a *duzentos e trinta* (230) y *duzentos e treze* (213): el *e* une "
   "centenas, decenas y unidades, y lo que decide es la última palabra. El Censo 2022 del IBGE contó "
   "unos 203 millones de habitantes.", prompt=LN)
li(W, 1, T_LI, "Houve uma queda de 3,5% nas vendas do comércio em janeiro.",
   ["3,5%", "3,05%", "35%"], "3,5%",
   "La coma decimal se lee *vírgula*: *três vírgula cinco por cento*. 3,05 sería *três vírgula zero "
   "cinco*. Y *houve uma queda*: *haver* existencial, siempre en singular.", prompt=LN)
di(W, 0, "A análise dos dados levou mais de seis meses.",
   "*A análise* es femenino (de *analisar*, sin -ção ni -mento) y lleva tilde: a-NÁ-li-se. "
   "*Levar* + tiempo = «llevar, tardar».")
tr(W, 1, T_CO, "El ministerio tomó medidas para reducir la deforestación.",
   _x("O ministério ", ["tomou providências", "tomou medidas"], " para ",
      ["reduzir", "diminuir", "combater"], " o desmatamento."),
   "«Tomar medidas» se dice sobre todo *tomar providências* (también *tomar medidas*). "
   "La deforestación es *o desmatamento* (de *mato*, monte).", prompt=TRF)
tr(W, 2, T_CO, "La autora plantea una cuestión importante sobre el censo.",
   _x("A autora ", ["levanta", "coloca", "traz", "propõe"], " uma questão ", ["importante", "relevante"],
      " sobre o censo."),
   "«Plantear una cuestión» es *levantar uma questão* (o *colocar*): *plantar* es solo sembrar. "
   "*Questão* (cuestión, asunto) no es *pergunta* (pregunta).", prompt=TRF)
cl(W, 0, T_LE, "Promulgada em 5 de outubro de 1988, a atual Constituição brasileira marcou o ___ formal do período autoritário.",
   "encerramento",
   "Nominalización de *encerrar* (cerrar, terminar): *o encerramento*, masculino en -mento. "
   "Es la primera frase de «A Constituição Cidadã».", prompt=LC, alt=["fim"])

# ===========================================================================
# Semana 41 — Mais-que-perfeito simples: interpretar
# partes: 0 forma y trampa · 1 tres formas · 2 expresiones y narración
# ===========================================================================
W = 41
ch(W, 0, T_MQ, "«Quando o médico chegou, o paciente já morrera.» O que aconteceu primeiro?",
   ["o paciente morreu", "o médico chegou", "as duas coisas ao mesmo tempo"], "o paciente morreu",
   "*Morrera* = *tinha morrido* (había muerto): el -ra portugués es un pasado anterior a otro pasado. "
   "Primero murió el paciente; después llegó el médico.", prompt=LR)
ch(W, 0, T_MQ, "«Ela dissera que viria.» «Dissera» quer dizer…",
   ["había dicho", "dijera", "diría"], "había dicho",
   "*Dissera* = *tinha dito*: indicativo. El «dijera» castellano (subjuntivo) es *dissesse*. "
   "En el portugués de hoy la -ra no es subjuntivo (salvo fórmulas fijas como *quem me dera*).", prompt=SIG)
ch(W, 0, T_MQ, "«A moça vira o vulto na janela e gritou.» «Vira» vem de…",
   ["ver: tinha visto", "virar: dá a volta", "vir: viene"], "ver: tinha visto",
   "*Vira* puede ser *virar* (ela vira a esquina) o el mais-que-perfeito de *ver* (viram → vira). "
   "Acá hay un objeto (*o vulto*, la silueta) y el relato está en pasado (*gritou*): *tinha visto*.",
   prompt=LR)
ch(W, 1, T_MQ, "Qual frase apresenta uma hipótese (algo que não aconteceu)?",
   ["Se eu tivesse tempo, iria a Lisboa.", "Eu tivera tempo, mas não fui a Lisboa.",
    "Eu tinha tido tempo, mas não fui a Lisboa."],
   "Se eu tivesse tempo, iria a Lisboa.",
   "La hipótesis va con *tivesse* (imperfeito do subjuntivo). *Tivera* = *tinha tido* (había tenido): "
   "habla de algo que sí pasó. «Se eu tivera» es el calco de «si yo tuviera».", prompt=LR)
ch(W, 1, T_MQ, "«Quando cheguei à festa, a Bia já saíra.» Você encontrou a Bia na festa?",
   ["Não: ela saiu antes de eu chegar.", "Sim: ela saiu depois.", "Não se sabe."],
   "Não: ela saiu antes de eu chegar.",
   "*Saíra* = *tinha saído*: su salida es anterior a mi llegada. No hay encuentro posible.", prompt=LR)
ch(W, 1, T_MQ, "«O seu Manuel fora marinheiro na juventude.» «Fora» quer dizer…",
   ["había sido", "fuera", "afuera"], "había sido",
   "*Fora* es el mais-que-perfeito de *ser* y de *ir* (foram → fora): acá, *tinha sido* marinero. "
   "No es el «fuera» castellano (subjuntivo, *fosse*) ni el adverbio *fora* (afuera), que no lleva sujeto.",
   prompt=SIG)
ch(W, 2, T_MQ, "«Mal o sol nascera, os pescadores já estavam no mar.» O que aconteceu primeiro?",
   ["o sol nasceu", "os pescadores foram para o mar", "não dá para saber"], "o sol nasceu",
   "*Mal* + mais-que-perfeito = «apenas había salido»: primero el sol, enseguida los pescadores. "
   "Es una construcción de la narración escrita.", prompt=LR)
li(W, 0, T_LI, "Ela contou que estivera em Coimbra no ano anterior.",
   ["estivera", "estivesse", "estaria"], "estivera",
   "*Estivera* (es-ti-VÉ-ra) = *tinha estado*; *estivesse* (es-ti-VÉS-si) es subjuntivo y *estaria*, "
   "condicional. Al leer, la -ra; al hablar, *tinha estado*.")
li(W, 1, T_LI, "Quando chegamos, eles já tinham saído.",
   ["tinham saído", "têm saído", "tinham saindo"], "tinham saído",
   "*Tinham saído* (habían salido) frente a *têm saído* (vienen saliendo). Lo que se oye: «TI-nham» "
   "con dos sílabas, «têm» con una.")
vo(W, 0, "O acordo foi assinado antes da eleição.", "acordo",
   OF, "*O acordo* (sustantivo) lleva ô cerrada. *Eu acordo* (me despierto, verbo) la abre: [ó]. "
   "Mismas letras, otro timbre: lo decide la categoría de la palabra.")
vo(W, 0, "Todo dia eu acordo às seis da manhã.", "acordo",
   OA, "*Eu acordo* (verbo) lleva ó abierta, como *eu jogo*, *eu olho*. El sustantivo *o acordo* "
   "(el acuerdo) es cerrado: [ô].")
vo(W, 1, "Ele olha o mar pela janela.", "olha",
   OA, "*Olhar* abre la o tónica en el presente: *eu olho*, *ele olha* [ó]. El sustantivo *o olho* "
   "es cerrado [ô], y su plural, *os olhos*, se abre otra vez [ó].")
di(W, 2, "Quando cheguei ao cais, o navio já partira.",
   "*Partira* = *tinha partido* (había partido). *Cais* es el muelle; se escribe igual en singular y "
   "en plural.", alt=["Quando cheguei no cais, o navio já partira."])
tr(W, 2, T_CO, "Nadie había tenido en cuenta el tránsito.",
   _x("Ninguém ", ["tinha", "havia"], " ", ["levado em conta o trânsito", "levado em consideração o trânsito",
                                           "levado o trânsito em conta", "levado o trânsito em consideração",
                                           "considerado o trânsito"], ".")
   + ["Ninguém levara em conta o trânsito.", "Ninguém levara o trânsito em conta."],
   "«Tener en cuenta» es *levar em conta*: el verbo es *levar* y *conta* va sin artículo. "
   "«Había tenido» = *tinha levado* (al leer, también *levara*).")
tr(W, 2, T_CO, "El portero hizo la vista gorda y nos dejó entrar.",
   _x("O porteiro fez vista grossa e ", ["nos deixou", "deixou a gente", "deixou-nos"], " entrar."),
   "«Hacer la vista gorda» es *fazer vista grossa*, sin artículo: la vista es *grossa*, no «gorda».")
cl(W, 0, T_LE, "Clarice ___ em 1920 na Ucrânia, numa família judia que fugira da guerra e da perseguição.",
   "nascera",
   "La lectura cuenta todo lo anterior a 1977 con el mais-que-perfeito simple: *nascera* = *tinha nascido*.",
   alt=["tinha nascido", "havia nascido"], prompt=LC)

# ===========================================================================
# Semana 42 — Orações reduzidas (y el pendiente: tendo + particípio)
# partes: 0 gerundio e infinitivo · 1 participio · 2 desarmar y armar
# ===========================================================================
W = 42
cl(W, 1, T_TE, "___ (terminar) a obra, o arquiteto voltou para Brasília. (= depois de ter terminado)",
   "Tendo terminado",
   "*Tendo* + participio marca lo que pasó antes: *tendo terminado* = después de haber terminado. "
   "El participio no concuerda: va siempre en -o.",
   alt=["Depois de terminar", "Depois de ter terminado", "Terminada"])
fx(W, 1, T_TE, "Tendo feitas as contas, decidimos ficar em casa.", "feitas", "feito", "participio",
   "Con *tendo*, el participio va siempre en -o: *tendo feito as contas*. La concordancia (*feitas as "
   "contas*) es de la reducida sin *tendo*.", prompt="Encontrá el error: tocá la palabra que está mal y corregila.")
cb(W, 2, T_TE, "Ela morou dez anos no Recife. Conhecia bem o frevo. (tendo + particípio)",
   _x(["Tendo morado dez anos no Recife, ela conhecia bem o frevo",
       "Ela, tendo morado dez anos no Recife, conhecia bem o frevo",
       "Tendo morado no Recife dez anos, ela conhecia bem o frevo",
       "Tendo morado dez anos no Recife, conhecia bem o frevo"]),
   "*Tendo morado* resume «como había vivido»: la causa anterior a lo que sigue. El sujeto queda en "
   "la principal.")
li(W, 0, T_LI, "Ao chegarmos ao Rio, fomos direto à praia.",
   ["Ao chegarmos", "Ao chegar", "Ao chegarem"], "Ao chegarmos",
   "*Chegarmos* (che-GAR-mus) marca *nós*; *chegar* no marca persona y *chegarem*, *eles*. "
   "Con el mismo sujeto las dos primeras valen: lo que se ejercita es oír la terminación.")
li(W, 1, T_LI, "Feitas as contas, desistimos da viagem.",
   ["Feitas", "Feito", "Feita"], "Feitas",
   "*Feitas as contas*: el participio concuerda con *as contas* (femenino plural). Se oye la -s final, "
   "que además se liga con *as*: «fêi-tas-as».")
vo(W, 1, "Terminado o almoço, voltamos ao escritório.", "almoço",
   OF, "*O almoço* (sustantivo) lleva ô cerrada; *ele almoça* (verbo) la abre: [ó].")
vo(W, 0, "Ela almoça sempre lendo o jornal.", "almoça",
   OA, "*Almoçar* abre la o en las formas con acento en la raíz: *eu almoço*, *ela almoça* [ó]. "
   "El sustantivo *o almoço* es cerrado.")
vo(W, 1, "Fechados os olhos, ela ouviu a música.", "olhos",
   OA, "Metafonía: *o olho* [ô] → *os olhos* [ó]. El plural abre la o, como *ovo / ovos*, "
   "*corpo / corpos*.")
di(W, 2, "Terminada a reunião, fomos todos ao boteco.",
   "Reducida de participio: *terminada* concuerda con *a reunião*. *Ao boteco*: a + o.")
tr(W, 0, T_CO, "Aprovechando el feriado, terminamos el informe.",
   _x(["Aproveitando o feriado", "Tirando proveito do feriado"], ", ",
      ["terminamos", "a gente terminou", "acabamos"], " o relatório."),
   "*Aproveitar* es el verbo; con sustantivo, *tirar proveito de* (no «sacar proveito»: en Brasil "
   "*sacar* es entender o retirar dinero). El gerundio portugués no cambia la vocal: *aproveitando*.")
tr(W, 2, T_CO, "Al llegar a la comisaría, hicimos la denuncia.",
   _x(["Ao chegar", "Ao chegarmos", "Chegando"], " à delegacia, ",
      ["registramos", "fizemos", "a gente registrou", "a gente fez"], " ",
      ["um BO", "um boletim de ocorrência", "o BO", "o boletim de ocorrência", "a denúncia",
       "uma denúncia"], "."),
   "«Hacer la denuncia» policial es *registrar um BO* (*boletim de ocorrência*). La comisaría es la "
   "*delegacia*, y *chegar a* lleva crase con femenino: *à delegacia*.")
cl(W, 0, T_LE, "___ baixinho, quase falando, João Gilberto mudou a maneira de cantar no Brasil.",
   "Cantando",
   "Reducida de gerundio al comienzo: *cantando baixinho* = cantando bajito, con ese modo. "
   "Es de la lectura «Chega de Saudade».", prompt=LC)

# ===========================================================================
# Semana 43 — Correspondência formal
# partes: 0 abrir y cerrar · 1 tratamiento · 2 pedir · 3 reclamação
# ===========================================================================
W = 43
li(W, 2, T_LI, "A reunião foi remarcada para as catorze horas e trinta minutos.",
   ["14h30", "4h30", "13h30"], "14h30",
   "En lo formal, las horas van de 0 a 24: *catorze horas e trinta minutos* (14h30). *Catorze* "
   "(o *quatorze*) suena «ca-TOR-zi».", prompt="Qual horário você ouviu?")
li(W, 2, T_LI, "O prazo para a entrega dos documentos termina no dia vinte e três de março.",
   ["23 de março", "13 de março", "23 de maio"], "23 de março",
   "*Vinte e três* (23) frente a *treze* (13); *março* (MAR-su) frente a *maio* (MAI-u). Las fechas "
   "se dicen con el número cardinal: *no dia vinte e três*.", prompt="Qual data você ouviu?")
vo(W, 2, "O prazo começa a contar na segunda-feira.", "começa",
   EA, "*Começar* abre la e en las formas con acento en la raíz: *ele começa* [é]. El sustantivo "
   "*o começo* es cerrado [ê].")
vo(W, 2, "Desde o começo do processo, pedimos uma resposta.", "começo",
   EF, "*O começo* (sustantivo) lleva ê cerrada; *ele começa* (verbo), é abierta.")
vo(W, 1, "O governo do estado ainda não respondeu.", "governo",
   EF, "*O governo* (sustantivo) lleva ê cerrada; *ele governa* (verbo) la abre: [é].")
di(W, 2, "Venho por meio desta solicitar a prorrogação do prazo.",
   "Fórmula del pedido formal: *venho por meio desta solicitar*. *Prorrogação* (de *prorrogar*): "
   "extender un plazo.")
tr(W, 2, T_CO, "Le solicito que extienda el plazo de entrega hasta el viernes.",
   _x(["Solicito que", "Solicito-lhe que", "Peço que", "Peço-lhe que", "Solicito que o senhor",
       "Peço que o senhor", "Solicito que a senhora", "Peço que a senhora"],
      " prorrogue o prazo de entrega até ", ["sexta-feira", "a sexta-feira", "sexta"], "."),
   "«Extender el plazo» es *prorrogar o prazo* (no «estender»). Y tras *solicitar que*, subjuntivo: "
   "*prorrogue*.", prompt=TRF)
tr(W, 2, T_CO, "Le escribo para sacarme una duda sobre la inscripción.",
   _x(["Escrevo", "Escrevo-lhe", "Eu lhe escrevo", "Eu escrevo"],
      " para ", ["esclarecer", "tirar"], " uma dúvida sobre a inscrição."),
   "«Sacarse una duda» es *esclarecer* (o *tirar*) *uma dúvida*. En un mail formal, *esclarecer*.",
   prompt=TRF)
cl(W, 0, T_LE, "Venho por meio desta ___ autorização para consultar a primeira edição de Os Sertões.",
   "solicitar",
   "*Venho por meio desta solicitar*: la fórmula del pedido formal va con infinitivo. Es la carta de "
   "Sofía a la Biblioteca Nacional.", alt=["pedir"], prompt=LC)

# ===========================================================================
# Semana 44 — Formação de palavras
# partes: 0 sufijos · 1 -eiro, -ada, prefijos · 2 diminutivos · 3 formar
# ===========================================================================
W = 44
vo(W, 0, "Ele é um escritor famoso no Brasil inteiro.", "famoso",
   OF, "En los adjetivos en *-oso*, el masculino singular cierra la o [ô]: *famoso*, *gostoso*.")
vo(W, 0, "Ela é uma escritora famosa no Brasil inteiro.", "famosa",
   OA, "Metafonía en *-oso*: el femenino y el plural abren la o: *famosa*, *famosos*, *famosas* [ó]. "
   "Solo el masculino singular es cerrado.")
vo(W, 1, "Os povos indígenas têm direito às suas terras.", "povos",
   OA, "Metafonía: *o povo* [ô] → *os povos* [ó], como *porto / portos*, *corpo / corpos*.")
vo(W, 1, "O esforço da equipe foi enorme.", "esforço",
   OF, "*O esforço* (sustantivo) lleva ô cerrada; *ele se esforça* (verbo) y el plural *os esforços* "
   "la abren [ó].")
li(W, 2, T_LI, "De manhã comprei seis pãezinhos na padaria.",
   ["pãezinhos", "pãozinhos"], "pãezinhos",
   "En la norma, el diminutivo pluraliza la base: *pães* → *pãezinhos* (pãiz-ZI-nhus). En la charla se "
   "oye mucho *pãozinhos*: acá la voz dijo la forma culta.")
di(W, 0, "A organização do bloco começa logo depois do Natal.",
   "*Organizar* → *a organização* (-ção, femenino). *Começa* lleva é abierta, de *começar*.")
tr(W, 2, T_CO, "No te preocupes: nos las vamos a arreglar.",
   _x(["Não se preocupe", "Não se preocupa", "Fica tranquilo", "Relaxa", "Não esquenta"], ": ",
      ["a gente vai dar um jeito", "vamos dar um jeito", "nós vamos dar um jeito",
       "a gente dá um jeito", "daremos um jeito"], "."),
   "«Arreglárselas» es *dar um jeito*: el verbo es *dar*. De ahí el *jeitinho*.", prompt=TRC)
tr(W, 1, T_CO, "Hicimos una colecta para el regalo de la profesora.",
   _x(["Fizemos", "A gente fez"], " uma vaquinha ", ["para o", "pro"], " presente da professora."),
   "«Hacer una colecta» entre amigos es *fazer uma vaquinha* (como la «vaquita» rioplatense).",
   prompt=TRC)
cl(W, 0, T_LE, "Para ele, a ___ não foi uma convivência pacífica, e sim um processo marcado pela violência.",
   "mestiçagem",
   "*Mestiço* + *-agem* → *a mestiçagem* (el mestizaje): femenina, como casi todas las palabras en "
   "-agem. Es de la lectura sobre Darcy Ribeiro.", prompt=LC)

# ===========================================================================
# Semana 45 — Heterosemánticos finos y prosodia culta
# partes: 0 falsos amigos · 1 mesa y trabajo · 2 género y acento
# ===========================================================================
W = 45
cl(W, 0, T_HS, "Cuidado com ele: é muito ___ (vivo, astuto) e sempre leva vantagem.",
   "esperto",
   "*Esperto* es «vivo, astuto, listo», no «experto». El experto es *especialista* o *perito*.",
   alt=["espertinho"])
tr(W, 0, T_HS, "Tengo pensado viajar a Recife en julio.",
   _x(["Pretendo", "Eu pretendo"], " ", ["viajar para", "ir para", "ir a", "viajar a"], " Recife em julho."),
   "*Pretender* = tener la intención, tener pensado: *pretendo viajar*. Es muy común en Brasil, "
   "y no suena pretencioso.")
ch(W, 0, T_HS, "«Ele é muito polido com os clientes.»",
   ["Es muy educado.", "Es muy prolijo.", "Es muy pulcro."], "Es muy educado.",
   "*Polido* es «cortés, educado» (también «pulido», una superficie). La persona prolija es "
   "*caprichosa*; la pulcra, *asseada*.", prompt=SIG)
ch(W, 0, T_HS, "«Fomos a um restaurante requintado.»",
   ["refinado, elegante", "recalentado", "lleno de gente"], "refinado, elegante",
   "*Requintado* es «refinado, sofisticado»: la palabra que buscás cuando querés decir «exquisito» "
   "(que en portugués es *esquisito*, raro).", prompt=SIG)
cl(W, 0, T_HS, "O país precisa ___ (desarrollar) a indústria e a pesquisa.", "desenvolver",
   "«Desarrollar» es *desenvolver*; el desarrollo, *o desenvolvimento*. «Desenvolver» un paquete "
   "(desenvolverlo) es *desembrulhar*.")
ch(W, 1, T_HS, "«Isso não é da minha competência.»",
   ["No me corresponde: no es mi atribución.", "No compito en eso.", "No soy competitivo."],
   "No me corresponde: no es mi atribución.",
   "*Competência* es «atribución, jurisdicción» (*é da competência do município*) y también «capacidad». "
   "La competencia comercial es *a concorrência*; la deportiva, *a competição*.", prompt=SIG)
tr(W, 1, T_HS, "Hay mucha competencia entre las librerías del centro.",
   _x(["Há", "Tem", "Existe"], " muita concorrência entre as livrarias do centro."),
   "Competencia entre empresas = *concorrência* (de *concorrer*). *Competência* es otra cosa: "
   "atribución o capacidad.")
tr(W, 0, T_HS, "Le encanta presumir de su auto nuevo.",
   _x(["Ele adora", "Adora", "Ela adora"], " ",
      ["se exibir com o carro novo", "se gabar do carro novo", "se mostrar com o carro novo",
       "exibir o carro novo", "ostentar o carro novo"], "."),
   "*Presumir* en portugués es «suponer» (*presumo que ele saiba*). Alardear es *se gabar (de)*, "
   "*se exibir*, *ostentar*.")
ch(W, 1, T_HS, "O vereador foi preso por receber ___ de uma construtora.",
   ["propina", "gorjeta", "coima"], "propina",
   "En Brasil *propina* es el soborno (la «coima» rioplatense). La propina del mozo es *a gorjeta*. "
   "Y *coima* existe, pero en Portugal es una multa.")
cl(W, 1, T_HS, "Falta a sua ___ (firma, la del documento) na última página do contrato.", "assinatura",
   "La firma de un documento es *a assinatura* (de *assinar*). *Firma* en Brasil es una empresa "
   "(*uma firma de engenharia*); solo en *reconhecer firma* (certificar la firma) guarda el sentido viejo.")
tr(W, 0, T_HS, "Dejó el trabajo y se fue a vivir a la playa.",
   _x(["Largou", "Ele largou", "Ela largou", "Deixou", "Ele deixou", "Ela deixou"], " ",
      ["o emprego", "o trabalho"], " e foi morar ", ["na praia", "perto da praia"], "."),
   "*Largar* es «dejar, abandonar, soltar»: *largou o emprego*. «Vivir» en un lugar es *morar*.")
cl(W, 2, T_HS, "___ a crise, o setor cresceu 3% no ano passado. (formal: «a pesar de», três palavras)",
   "Em que pese",
   "*Em que pese* (a pesar de) es de la escritura culta: *em que pese a crise*. En la charla, "
   "*apesar da crise*.")
ac(W, 2, "Falta a rubrica do diretor em cada página.", "rubrica",
   ["ru-BRI-ca", "RU-bri-ca"], "ru-BRI-ca",
   "La norma dice ru-BRI-ca, llana y sin tilde (la firma abreviada). «RÚ-bri-ca» se oye mucho, "
   "también entre brasileños, pero en un examen oral cuenta.")
ac(W, 2, "O atleta bateu o recorde mundial.", "recorde",
   ["re-COR-de", "RE-cor-de"], "re-COR-de",
   "*Recorde*, llana: re-CÓR-di. Sin tilde, porque termina en vocal. El castellano «récord» carga el "
   "acento en la primera sílaba; el portugués, en la segunda.")
ac(W, 2, "A entrada no museu é gratuita às terças.", "gratuita",
   ["gra-TUI-ta", "gra-tu-I-ta"], "gra-TUI-ta",
   "*Gratuito / gratuita*: el diptongo *ui* va junto y el acento cae en la *u*: gra-TUI-tu. "
   "«Gra-tu-Í-to» es un error frecuente.")
ac(W, 2, "Saramago ganhou o Nobel de Literatura em 1998.", "Nobel",
   ["no-BEL", "NO-bel"], "no-BEL",
   "En portugués *Nobel* es aguda: no-BÉL (termina en -l, como *papel*). Por eso va sin tilde.")
ch(W, 2, T_AC, "Qual é a pronúncia da norma culta de «ruim»?",
   ["ru-ÍM (duas sílabas)", "RÚ-im"], "ru-ÍM (duas sílabas)",
   "La norma pide *ru-ÍM*, aguda y en dos sílabas. «RÚ-im» es lo más común en la charla, en todo "
   "Brasil: no suena mal, pero en una situación formal conviene la otra.", prompt=LR)
di(W, 2, "A academia fica perto da delegacia de polícia.",
   "Dos heterotónicos: a-ca-de-MI-a (el gimnasio; en castellano, a-ca-DE-mia) y po-LÍ-cia (en "
   "castellano, po-li-CÍ-a). Y *de-le-ga-CI-a*, la comisaría, también con el acento en la *i*.")
tr(W, 0, T_CO, "Me dio vergüenza pedirle plata.",
   _x(["Fiquei sem graça de", "Fiquei com vergonha de", "Eu fiquei sem graça de",
       "Eu fiquei com vergonha de"], " ",
      ["pedir dinheiro para ele", "pedir dinheiro a ele", "lhe pedir dinheiro", "pedir grana para ele",
       "pedir dinheiro pra ele", "pedir grana pra ele"], "."),
   "«Darle vergüenza a alguien» se dice al revés: *ficar sem graça* (o *com vergonha*), con la "
   "persona como sujeto. «Plata» es *dinheiro* (coloquial, *grana*).", prompt=TRC)
tr(W, 2, T_CO, "El portugués juega un papel central en Angola.",
   _x("O português ", ["desempenha", "tem", "exerce", "cumpre"], " um papel ",
      ["central", "fundamental", "importante"], " em Angola."),
   "«Jugar un papel» es *desempenhar um papel* (o *ter*, *exercer*): «jogar um papel» es calco.",
   prompt=TRF)
cl(W, 0, T_LE, "A proposta pareceu ___ a muitos leitores.", "esquisita",
   "*Esquisito* es «raro, extraño»: el manifiesto de Oswald les pareció raro, no exquisito.",
   alt=["estranha"], prompt=LC)

# ===========================================================================
# Semana 46 — Portugal y África: reconocer, no imitar
# partes: 0 Brasil y Portugal · 1 sonidos y regiones · 2 África y ortografía
# ===========================================================================
W = 46
ty(W, 1, T_PE, "Em Lisboa, você ouve algo como «tlfón». → ___", "telefone",
   "El portugués europeo se come las *e* átonas: *te-le-fo-ne* queda en «tlfón». Si reponés las "
   "vocales que se cayeron, aparece la palabra conocida.")
ty(W, 1, T_PE, "Em Lisboa, você ouve algo como «pquenu». → ___", "pequeno",
   "La *e* átona de *pequeno* casi desaparece en Portugal: «p'quenu». En Brasil se oye entera: "
   "pe-QUE-nu.")
ty(W, 1, T_PE, "Em Lisboa, você ouve algo como «mnina». → ___", "menina",
   "*Menina*, con la primera *e* tragada: «m'nina». En Portugal es la chica; en Brasil, también.")
ty(W, 1, T_PE, "Em Lisboa, você ouve algo como «dpoix». → ___", "depois",
   "*Depois*: la *e* se cae y la *s* final suena «sh» (como en el Rio). Juntas, «d'poish».")
ch(W, 0, T_PE, "«O miúdo está a jogar à bola no quintal.» É do Brasil ou de Portugal?",
   ["de Portugal", "do Brasil"], "de Portugal",
   "Tres marcas europeas: *miúdo* (chico), *estar a* + infinitivo y *jogar à bola*. En Brasil: "
   "*o menino está jogando bola no quintal*. (En Angola también se oiría: comparte esas marcas con "
   "Portugal.)", prompt=LR)
tr(W, 0, T_PE, "(PT) A miúda está a tomar o pequeno-almoço.",
   _x("A ", ["menina", "garota"], " ", ["está", "tá"], " tomando ",
      ["o café da manhã", "café da manhã", "café"], "."),
   "Tres marcas europeas en una frase: *miúda* (la chica), *estar a* + infinitivo y *pequeno-almoço* "
   "(el desayuno). En Brasil: *a menina está tomando café da manhã*.",
   prompt="Como se diz isto no Brasil?")
di(W, 0, "No Rio a gente diz aipim, e não mandioca.",
   "Variación dentro de Brasil: *aipim* en Rio, *macaxeira* en el Nordeste, *mandioca* en casi todo "
   "el resto. *A gente diz*: verbo en singular.")
tr(W, 0, T_CO, "Los lisboetas sacan provecho del turismo brasileño.",
   _x("Os lisboetas ", ["tiram proveito do", "aproveitam o", "se beneficiam do"], " turismo brasileiro."),
   "«Sacar provecho» es *tirar proveito de* (o *aproveitar*): en Brasil *sacar* es entender («saquei!») "
   "o sacar plata del banco.", prompt=TRF)
_SAUDADE = ["sinto falta do", "sinto saudade do", "sinto saudades do", "tenho saudade do",
            "tenho saudades do", "estou com saudade do", "estou com saudades do"]
tr(W, 0, T_CO, "Extraño el acento de Lisboa.",
   [s[0].upper() + s[1:] + " sotaque de Lisboa." for s in _SAUDADE]
   + ["Eu " + s + " sotaque de Lisboa." for s in _SAUDADE],
   "«Extrañar» es *sentir falta de* o *ter saudade de*: *estranhar* es «notar algo raro». Y el acento de "
   "un lugar es *o sotaque*; *o acento* es la tilde.", prompt=TRC)
cl(W, 0, T_LE, "A Sofía estranhou algumas coisas no prefácio: «estou a ler» em vez de «estou ___».",
   "lendo",
   "Portugal: *estar a* + infinitivo (*estou a ler*); Brasil: *estar* + gerundio (*estou lendo*).",
   prompt=LC)

# ===========================================================================
# Semana 47 — Argumentação, modalização y atenuación
# partes: 0 afirmar con matices (y atenuar) · 1 conceder · 2 concluir
# ===========================================================================
W = 47
ch(W, 0, T_PR, "Seu chefe convida você para um churrasco no sábado, mas você já tem outro compromisso. Você responde:",
   ["Poxa, que pena! Acho que não vai dar: já tenho um compromisso no sábado.",
    "Não posso. Tenho outra coisa.",
    "Lamento informar que me encontro impossibilitado de comparecer."],
   "Poxa, que pena! Acho que não vai dar: já tenho um compromisso no sábado.",
   "En Brasil un no se envuelve: lamento (*poxa, que pena*), suavizador (*acho que não vai dar*) y "
   "motivo. El «no puedo» seco suena cortante; lo sobreformal, frío y distante para una invitación.",
   prompt=SIT)
ch(W, 0, T_PR, "Numa reunião, você discorda da proposta de um colega. Você diz:",
   ["Entendo seu ponto, mas eu vejo de outro jeito. E se a gente testasse antes?",
    "Isso não faz sentido nenhum.",
    "Discordo veementemente da proposta apresentada pelo colega."],
   "Entendo seu ponto, mas eu vejo de outro jeito. E se a gente testasse antes?",
   "Para disentir sin pelear: reconocé al otro (*entendo seu ponto*), marcá que es tu visión (*eu vejo "
   "de outro jeito*) y proponé (*e se a gente…?*). La crítica directa al otro corta la charla.",
   prompt=SIT)
ch(W, 0, T_PR, "Você precisa pedir mais prazo à coordenadora do projeto:",
   ["Será que daria para estender o prazo até sexta? Ainda estou fechando os dados.",
    "Não vou conseguir entregar na quarta.",
    "Solicito, em caráter de urgência, a prorrogação imediata do prazo."],
   "Será que daria para estender o prazo até sexta? Ainda estou fechando os dados.",
   "*Será que daria para…?* es el pedido brasileño típico: pregunta indirecta + futuro do pretérito. "
   "Avisar solo que no llegás suena a hecho consumado; el «em caráter de urgência» es para un oficio.",
   prompt=SIT)
ch(W, 0, T_PR, "Um colega mostra um relatório com vários erros e pede sua opinião:",
   ["Ficou bom! Só acho que valeria a pena revisar os números da tabela 2.",
    "Tem muitos erros nesse relatório.",
    "O documento apresenta inconsistências graves que comprometem sua validade."],
   "Ficou bom! Só acho que valeria a pena revisar os números da tabela 2.",
   "Para criticar el trabajo de un colega: primero lo bueno, después la sugerencia con *acho que* y "
   "futuro do pretérito (*valeria a pena*). La crítica va al dato, no a la persona.", prompt=SIT)
cl(W, 0, T_PR, "«Isso está errado.» → Será que não valeria a pena ___ esse ponto?", "rever",
   "Lo brusco (*isso está errado*) se reformula como pregunta: *será que não valeria a pena rever…?*",
   alt=["revisar", "repensar", "reconsiderar", "rediscutir", "reavaliar", "discutir"], prompt=AT)
cl(W, 0, T_PR, "«Me manda o arquivo agora.» → Você ___ me mandar o arquivo quando puder?", "poderia",
   "El futuro do pretérito suaviza el pedido: *você poderia…?* Y *quando puder* le deja el momento "
   "al otro. *Pode* también es cortés, un poco menos suave.", alt=["podia", "pode"], prompt=AT)
cl(W, 0, T_PR, "«Você está enganado.» → Acho que não é bem ___.", "assim",
   "*Acho que não é bem assim* corrige sin acusar: no dice que el otro se equivoca, dice que la cosa "
   "es distinta.", prompt=AT)
ch(W, 0, T_PR, "Nota de uma prefeitura à imprensa, com a investigação ainda em andamento: «___, a obstrução dos bueiros agravou o alagamento.»",
   ["Ao que tudo indica", "Sem sombra de dúvida", "Na boa"], "Ao que tudo indica",
   "Si la investigación sigue abierta, una institución no afirma de más: *ao que tudo indica* (según "
   "todo parece). *Sem sombra de dúvida* compromete demasiado; *na boa* es de la charla.",
   prompt="Escolha a opção adequada ao gênero do texto.")
ch(W, 0, T_PR, "Num ensaio acadêmico, para apresentar uma conclusão bem fundamentada:",
   ["Tudo leva a crer que a política reduziu a evasão escolar.",
    "Acho que a política meio que reduziu a evasão escolar.",
    "Com certeza absoluta, a política acabou com a evasão escolar."],
   "Tudo leva a crer que a política reduziu a evasão escolar.",
   "En un ensayo, *tudo leva a crer que* + indicativo afirma con apoyo pero sin absolutos. *Meio que* "
   "es de la charla; *com certeza absoluta*, demasiado tajante para un texto académico.",
   prompt="Escolha a opção adequada ao gênero do texto.")
ch(W, 0, T_PR, "Mensagem para a sua chefe, sugerindo uma ideia para o projeto:",
   ["Eu diria que seria interessante testar a nova versão com alguns clientes.",
    "É imprescindível testar a nova versão com os clientes.",
    "Testa aí com os clientes."],
   "Eu diria que seria interessante testar a nova versão com alguns clientes.",
   "Al jefe se le sugiere: *eu diria que*, *seria interessante* (futuro do pretérito de atenuación). "
   "*É imprescindível* suena a orden; *testa aí*, a charla con un amigo.",
   prompt="Escolha a opção adequada ao gênero do texto.")
cl(W, 0, T_PR, "Não se pode descartar que a obra ___ (atrasar) mais alguns meses.", "atrase",
   "*Não se pode descartar que* pide subjuntivo, como *é possível que*: *atrase*.")
li(W, 1, T_LI, "Embora ele tenha razão, não concordo com a forma.",
   ["tenha", "tinha", "tem"], "tenha",
   "*Embora* pide subjuntivo: *tenha* (TÊ-nha). *Tinha* (TCHI-nha) es imperfeito y *tem*, presente: "
   "las dos serían error después de *embora*.")
li(W, 0, T_LI, "Segundo a pesquisa, 62,5% dos entrevistados apoiam a tarifa zero.",
   ["62,5%", "65,2%", "6,25%"], "62,5%",
   "*Sessenta e dois vírgula cinco por cento*: la coma decimal se dice *vírgula*. Y *apoiam*, con ó "
   "abierta (de *apoiar*).", prompt=LN)
vo(W, 0, "O erro do relatório foi corrigido a tempo.", "erro",
   EF, "*O erro* (sustantivo): ê cerrada. *Eu erro* (verbo, de *errar*): é abierta. Ojo: no pasa con "
   "todos los verbos; los en *-ejar* (*desejo*, *planejo*) quedan cerrados también como verbo.")
vo(W, 1, "Quando escrevo com pressa, eu erro muito.", "erro",
   EA, "*Eu erro* (verbo) abre la e: [é], como *ele erra*. El sustantivo *o erro* es cerrado: [ê].")
di(W, 0, "Tudo leva a crer que a tarifa zero será ampliada.",
   "*Tudo leva a crer que* + indicativo (*será ampliada*): afirma con apoyo, sin absolutos. La *tarifa "
   "zero* (colectivo gratis) ya funciona en más de cien ciudades brasileñas.")
tr(W, 0, T_CO, "El informe pone en duda la eficacia del programa.",
   _x("O relatório ", ["põe em xeque", "coloca em xeque", "põe em dúvida", "coloca em dúvida", "questiona"],
      " a eficácia do programa."),
   "«Poner en duda» se dice *pôr em xeque* (o *em dúvida*): el *xeque* del ajedrez.", prompt=TRF)
tr(W, 1, T_CO, "La autora hace hincapié en la desigualdad.",
   _x("A autora ", ["enfatiza a", "ressalta a", "destaca a", "sublinha a", "frisa a", "insiste na",
                     "dá ênfase à"], " desigualdade."),
   "«Hacer hincapié» no existe en portugués: *enfatizar*, *ressaltar*, *destacar* o *dar ênfase a*.",
   prompt=TRF)
cl(W, 1, T_LE, "Ainda que o jeitinho ___ pequenos problemas do dia a dia, é possível que reforce desigualdades maiores.",
   "resolva",
   "*Ainda que* (aunque) va siempre con subjuntivo, aunque el hecho sea real: *resolva*.",
   prompt=LC)

# ===========================================================================
# Semana 48 — Resumo e reformulação; vícios do texto formal (bloque nuevo, parte 2)
# ===========================================================================
W = 48
fx(W, 2, T_VI, "A reunião onde decidimos o orçamento durou três horas.", "onde", "em que", "relativo",
   "*Onde* es solo para lugares. Para una reunión, un momento o un texto: *em que* o *na qual*.",
   goodAlt=["na qual"])
fx(W, 2, T_VI, "A nível de saúde pública, o saneamento é urgente.", "A nível de", "Em termos de",
   "registro",
   "*A nível de* («a nivel de») es un vicio que corrige el ENEM: *em termos de*, *no âmbito da*. "
   "*Ao nível de* solo es «a la altura de» (*ao nível do mar*).", goodAlt=["Em nível de"])
fx(W, 2, T_VI, "Fazem dois anos que a obra está parada.", "Fazem", "Faz", "concordancia",
   "*Fazer* de tiempo transcurrido es impersonal: *faz dois anos* (hace dos años), siempre en singular, "
   "como *houve*.")
fx(W, 2, T_VI, "Penso de que o governo deveria investir mais em saneamento.", "Penso de que",
   "Penso que", "regencia",
   "*Pensar que* va sin *de*: el «dequeísmo» es error también en portugués.")
fx(W, 2, T_VI, "Tenho certeza que a proposta será aprovada.", "certeza que", "certeza de que", "regencia",
   "En el texto formal, *ter certeza **de** que*: el sustantivo pide su preposición. En la charla se "
   "oye mucho *certeza que*.")
fx(W, 2, T_VI, "Recebi o relatório e li o mesmo com atenção.", "li o mesmo", "li-o", "registro",
   "*O mesmo* como pronombre («el mismo») es un vicio de la burocracia: *li-o*, *eu o li*, o se "
   "repite el sustantivo.", goodAlt=["o li", "li o relatório"])
ch(W, 2, T_VI, "Escolha a frase com a pontuação correta.",
   ["Os moradores do bairro reclamaram da obra.", "Os moradores do bairro, reclamaram da obra.",
    "Os moradores, do bairro reclamaram da obra."],
   "Os moradores do bairro reclamaram da obra.",
   "No va una sola *vírgula* entre el sujeto y el verbo, por largo que sea el sujeto (dos, sí, si "
   "encierran un inciso). Es el error de "
   "puntuación que más se corrige en la redação.", prompt=LR)
ch(W, 2, T_VI, "Escolha a frase com a pontuação correta.",
   ["O projeto, porém, não avançou.", "O projeto porém, não avançou.", "O projeto, porém não avançou."],
   "O projeto, porém, não avançou.",
   "*Porém*, *no entanto*, *contudo* en medio de la oración van entre dos comas. Al comienzo, con una: "
   "*Porém, o projeto não avançou.*", prompt=LR)
cl(W, 2, T_VI, "A maioria dos alunos ___ (chegar, perfeito) cedo à palestra.", "chegou",
   "Con *a maioria de* + plural valen las dos: *a maioria dos alunos chegou* (concuerda con *maioria*) "
   "y *chegaram* (con *alunos*).", alt=["chegaram"])
cl(W, 2, T_VI, "Cerca de mil pessoas ___ (comparecer, perfeito) à audiência pública.", "compareceram",
   "Con *cerca de* + número, el verbo concuerda con lo contado: *cerca de mil pessoas compareceram*.")
li(W, 2, T_LI, "Segundo a polícia, o suspeito teria fugido para o Paraguai.",
   ["teria fugido", "tinha fugido", "terá fugido"], "teria fugido",
   "El condicional del rumor: *teria fugido* (habría huido, según la policía). *Tinha fugido* lo daría "
   "por cierto; *terá fugido*, futuro, es otra cosa.")
li(W, 0, T_LI, "O ensaio de Roberto Schwarz foi publicado em 1973.",
   ["1973", "1963", "1937"], "1973",
   "*Mil novecentos e setenta e três*: *setenta* (70) frente a *sessenta* (60). En portugués los años "
   "se leen como un número entero.", prompt=LN)
vo(W, 0, "O autor apoia a tese da professora.", "apoia",
   OA, "*Apoiar* abre la o: *eu apoio*, *ele apoia* [ó]. El sustantivo *o apoio* es cerrado [ô].")
vo(W, 1, "O projeto conta com o apoio do governo.", "apoio",
   OF, "*O apoio* (sustantivo): ô cerrada. *Eu apoio* (verbo): ó abierta.")
di(W, 1, "Segundo a Defesa Civil, a enchente teria desalojado mil famílias.",
   "*Segundo* + fuente atribuye el dato, y *teria desalojado* (futuro do pretérito) dice que la prensa "
   "no lo da por confirmado. *Desalojar* = dejar a alguien sin casa; *a enchente*, la inundación.",
   alt=["Segundo a Defesa Civil, a enchente teria desalojado 1.000 famílias.",
        "Segundo a Defesa Civil, a enchente teria desalojado 1000 famílias."])
tr(W, 0, T_CO, "El estudio llama la atención sobre la falta de saneamiento.",
   _x("O estudo chama ", ["a atenção", "atenção"], " para a falta de saneamento."),
   "«Llamar la atención **sobre**» es *chamar a atenção **para***: otra preposición.", prompt=TRF)
tr(W, 2, T_CO, "La investigación sacó a la luz un caso de corrupción.",
   _x("A ", ["investigação", "apuração"], " trouxe à tona um caso de corrupção."),
   "«Sacar a la luz» es *trazer à tona* (con crase): lo que estaba debajo del agua sale a la superficie.",
   prompt=TRF)
cl(W, 1, T_LE, "Em outras palavras, era o favor, e não o ___, que organizava a vida social.", "direito",
   "*Em outras palavras* reformula: el favor ocupaba el lugar del derecho. Es la tesis de Schwarz.",
   prompt=LC)

# ===========================================================================
# Semana 49 — Registro culto y coloquial (y atenuación en lo escrito)
# partes: 0 gramática · 1 reducciones y pronombres · 2 vocabulario
# ===========================================================================
W = 49
ch(W, 2, T_PR, "No grupo de WhatsApp do trabalho, um colega pede ajuda num sábado, e você está com a família:",
   ["Putz, hoje não consigo, tô com a família. Segunda cedo eu vejo isso com você, beleza?",
    "Não posso, é sábado.",
    "Informo que não me encontro disponível no presente momento."],
   "Putz, hoje não consigo, tô com a família. Segunda cedo eu vejo isso com você, beleza?",
   "En WhatsApp entre colegas: registro de charla, un motivo y una alternativa. El «no» solo suena "
   "seco; la fórmula de oficio, ridícula en ese canal.", prompt=SIT)
ch(W, 2, T_PR, "E-mail a um professor: você quer questionar a nota de um trabalho.",
   ["Professor, gostaria de entender melhor os critérios da avaliação. Seria possível conversarmos?",
    "Professor, a minha nota está errada.",
    "Oi, prof! Cê me deu nota baixa, né?"],
   "Professor, gostaria de entender melhor os critérios da avaliação. Seria possível conversarmos?",
   "Para cuestionar sin acusar: *gostaria de entender* y *seria possível…?* (futuro do pretérito). "
   "Decir que la nota está mal es acusar; *cê* y *prof* no van en un mail.", prompt=SIT)
ch(W, 2, T_PR, "E-mail formal: você precisa recusar um convite para dar uma palestra.",
   ["Agradeço muito o convite, mas, infelizmente, não poderei participar nesta data.",
    "Não vou poder ir, foi mal.",
    "Não posso."],
   "Agradeço muito o convite, mas, infelizmente, não poderei participar nesta data.",
   "El rechazo formal: agradecer, *infelizmente* y el motivo acotado (*nesta data*), que deja la puerta "
   "abierta. *Foi mal* es de la charla.", prompt=SIT)
cl(W, 2, T_PR, "«Vocês erraram o cálculo.» → Acho que ___ um problema no cálculo.", "houve",
   "Sacar al culpable de la frase atenúa: *houve um problema* en lugar de *vocês erraram*. En la "
   "charla, *teve um problema*.", alt=["teve", "tem", "há"], prompt=AT)
fx(W, 1, T_VI, "Este é o livro onde o autor fala da seca no Nordeste.", "onde", "em que", "relativo",
   "Un libro no es un lugar: *em que* (o *no qual*). *Onde* queda para los lugares: *a cidade onde nasci*.",
   goodAlt=["no qual"])
cl(W, 1, T_VI, "O período ___ vivi no Recife foi o melhor da minha vida.", "em que",
   "Para tiempo, *em que* (o *no qual*), no *onde*: *o período em que vivi*.", alt=["no qual"])
li(W, 1, T_LI, "Encontrei-o ontem no centro da cidade.",
   ["Encontrei-o", "Encontrei ele", "Encontrei-a"], "Encontrei-o",
   "*Encontrei-o* (la o suena «u»: en-con-TREI-u) es lo escrito y formal; *encontrei ele*, lo de la "
   "charla; *encontrei-a*, femenino.")
li(W, 0, T_LI, "Haverá reunião na sexta-feira, às dez horas.",
   ["Haverá", "Vai ter", "Houve"], "Haverá",
   "*Haverá* (a-ve-RÁ) es el futuro formal; en la charla, *vai ter*. *Houve* (Ô-vi) es pasado.")
vo(W, 2, "Os fogos de Copacabana duram quinze minutos.", "fogos",
   OA, "Metafonía: *o fogo* [ô] → *os fogos* [ó], como *jogo / jogos*.")
vo(W, 2, "Eu jogo futevôlei na praia aos domingos.", "jogo",
   OA, "*Eu jogo* (verbo) abre la o [ó]; *o jogo* (el partido) es cerrado [ô].")
di(W, 0, "O Enem será aplicado em dois domingos de novembro.",
   "Pasiva con *ser* en futuro (*será aplicado*): el registro de los comunicados oficiales. El Enem, el "
   "examen de ingreso a las universidades, se toma en dos domingos de noviembre.",
   alt=["O ENEM será aplicado em dois domingos de novembro."])
tr(W, 2, T_CO, "Por fin logramos saldar la deuda con el banco.",
   _x(["Finalmente", "Enfim", "Até que enfim"], " ",
      ["conseguimos", "a gente conseguiu"], " ",
      ["quitar a dívida", "pagar toda a dívida", "saldar a dívida"], " com o banco."),
   "«Saldar una deuda» es *quitar a dívida*: *quitar* en portugués es pagarla toda, no «sacarla».")
tr(W, 1, T_CO, "No te descuides con el celular en el colectivo.",
   ["Não dá mole com o celular no ônibus.", "Não dê mole com o celular no ônibus.",
    "Não vacila com o celular no ônibus.", "Não vacile com o celular no ônibus.",
    "Não dá mole com o celular no busão."],
   "«Descuidarse» (y quedar expuesto) es *dar mole* en la charla carioca; *vacilar* también sirve. "
   "Ojo: *mole* es blando, y *dar mole* también es «dar bola» a alguien.", prompt=TRC)
cl(W, 2, T_LE, "Uma mulher, Celeste Caeiro, distribuiu cravos aos soldados, que os ___ nos canos das espingardas.",
   "puseram",
   "*Pôr* en perfeito: *puseram* (pusieron). *Os* retoma *cravos*: *que os puseram*.",
   alt=["colocaram", "botaram", "enfiaram"], prompt=LC)

# ===========================================================================
# Semana 50 — Colocações y expresiones
# ===========================================================================
W = 50
li(W, 1, T_LI, "O apartamento custa três mil e quinhentos reais por mês.",
   ["R$ 3.500", "R$ 3.050", "R$ 2.500"], "R$ 3.500",
   "*Três mil e quinhentos* (3.500) frente a *três mil e cinquenta* (3.050). En los precios, el punto "
   "separa los miles y la coma los centavos, como en Argentina.", prompt="Qual valor você ouviu?")
vo(W, 2, "Gosto não se discute.", "Gosto",
   OF, "En el refrán, *gosto* es sustantivo (el gusto): ô cerrada. *Eu gosto* (verbo) sería abierto.")
vo(W, 2, "Ele se esforça muito no trabalho.", "esforça",
   OA, "*Esforçar-se* abre la o en las formas con acento en la raíz: *ele se esforça* [ó]. *O esforço* "
   "es cerrado.")
vo(W, 1, "Os poços da região secaram.", "poços",
   OA, "Metafonía: *o poço* [ô] → *os poços* [ó].")
di(W, 2, "A prefeitura tomou providências para ampliar o saneamento básico.",
   "Colocación de la semana: *tomar providências* (tomar medidas). *Saneamento básico* (agua y "
   "cloacas) es un tema fijo de la prensa brasileña.")
cl(W, 1, T_LE, "Enquanto o poder público tomava providências, milhares de voluntários ___ as mangas.",
   "arregaçaram",
   "*Arregaçar as mangas* es arremangarse, ponerse a trabajar en serio. Es de la lectura «Depois da "
   "tempestade».", prompt=LC)

# ===========================================================================
# Semana 51 — Repaso
# ===========================================================================
W = 51
li(W, 0, T_LI, "Quando eu for a Salvador, vou provar acarajé.",
   ["for", "fui", "fosse"], "for",
   "*Quando eu for* (futuro do subjuntivo) habla de algo por venir. *Fui* (FUI) es pasado y *fosse* "
   "(FÔ-si), imperfeito do subjuntivo.")
li(W, 0, T_LI, "Se tivéssemos começado antes, teríamos conseguido a verba.",
   ["tivéssemos", "tivermos", "tínhamos"], "tivéssemos",
   "*Se tivéssemos começado* (si hubiéramos empezado) va con *teríamos conseguido*. *Tivermos* sería "
   "futuro (si llegamos a…) y *tínhamos*, imperfeito.")
vo(W, 2, "Os ossos do dinossauro estão no Museu Nacional.", "ossos",
   OA, "Metafonía: *o osso* [ô] → *os ossos* [ó].")
di(W, 0, "Se eu tivesse tempo, leria Guimarães Rosa de novo.",
   "Hipótesis: *se* + imperfeito do subjuntivo (*tivesse*) y futuro do pretérito (*leria*).")
cl(W, 0, T_LE, "«Se ___ começado antes, teríamos conseguido verba», lamentou a Bia.", "tivéssemos",
   "Pasado irreal: *se tivéssemos começado* (si hubiéramos empezado) + *teríamos conseguido*.",
   prompt=LC)
