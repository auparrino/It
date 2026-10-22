# -*- coding: utf-8 -*-
"""El futuro do subjuntivo a lo largo del curso (propuestas 2026-10, Tanda 1).

Cuatro propuestas del plan auditorias/PLAN-2026-10-propuestas.md:

1. Fórmulas antes de la regla (semanas 6, 8, 12, 18, 20 y 24): *se Deus
   quiser*, *quando você puder*, *se der*, *como você quiser*, *se
   precisar*, *seja como for*.  Se aprenden como bloques fijos; la nota lo
   dice («la regla llega en la 27»).
2. Relativas e indefinidos (27, 34, 43 y 50): *quem quiser*, *o que você
   achar*, *aonde você for*, *o que for necessário*, *aconteça o que
   acontecer*: el castellano usa presente de subjuntivo y empuja al calco
   *quem queira*.
3. «Costumbre → plan» (27, 30, 39, 47 y 51): dos huecos con el mismo verbo
   y el mismo conector; la primera oración es hábito o pasado (indicativo),
   la segunda, futuro (futuro do subjuntivo).  Se elige por el sentido, no
   por la palabra que dispara.
4. Hilo espaciado (28-38 y 40-50): dos ítems de producción por semana con
   el tema de esa semana (una traducción con la trampa del castellano y un
   hueco con un irregular); cada tres semanas, uno es dictado.  En las
   semanas que ya llevan ítems de 2 o 3, el hilo pone uno solo.

Respuestas de dos huecos: «a | b» (el alumno escribe «a / b» o «a b»).
Prefijo de los ids: cx-a-<semana>-<n>.
"""
from itertools import product

TR = "Traducí al portugués."
TRF = "Traducí al portugués formal."
CO = "Completá con la forma correcta del verbo entre paréntesis."
FX = "Encontrá el error: tocá la palabra que está mal y corregila."
FXF = "Texto formal. Encontrá el error: tocá la palabra que está mal y corregila."
DI = "Dictado: escuchá y escribí lo que oís."

LEVEL = {}
for _w in range(1, 53):
    LEVEL[_w] = "A1" if _w <= 8 else "A2" if _w <= 16 else "B1" if _w <= 27 else "B2" if _w <= 40 else "C1"

TOPIC = "futuro do subjuntivo"

ITEMS = []
_N = {}


def _combo(*parts):
    """Todas las combinaciones de las piezas: las variantes igual de válidas."""
    return ["".join(c) for c in product(*[p if isinstance(p, list) else [p] for p in parts])]


def _add(w, typ, prompt, stem, answer, note, alt=None, part=None, **extra):
    _N[w] = _N.get(w, 0) + 1
    seen, clean = set(), []
    for a in alt or []:
        k = a.rstrip(".?!")
        if a and k != answer.rstrip(".?!") and k not in seen:
            seen.add(k)
            clean.append(a)
    d = dict(id="cx-a-%d-%02d" % (w, _N[w]), w=w, level=LEVEL[w], type=typ, topic=TOPIC,
             prompt=prompt, stem=stem, answer=answer, alt=clean, note=note)
    if part is not None:
        d["part"] = part
    d.update(extra)
    ITEMS.append(d)
    return d


def tr(w, stem, variants, note, part=None, prompt=TR):
    """translate: la primera variante es la respuesta; el resto, alt."""
    extra = dict(registro="formal") if prompt == TRF else {}
    return _add(w, "translate", prompt, stem, variants[0], note, variants[1:], part, **extra)


def cl(w, stem, answer, note, alt=None, part=None):
    return _add(w, "cloze", CO, stem, answer, note, alt, part)


def fx(w, stem, bad, good, cat, note, part=None, prompt=FX):
    return _add(w, "fixerr", prompt, stem, stem.replace(bad, good, 1), note, None, part,
                bad=bad, good=good, cat=cat)


def di(w, text, note, alt=None, part=None):
    """Dictado (TTS pt-BR): se oye la frase y se escribe."""
    return _add(w, "dictation", DI, text, text, note, alt, part, nopeek=True)


# ===========================================================================
# 1. Fórmulas antes de la regla (6-24)
# ===========================================================================
FORM = " Es una fórmula: aprendela entera, como un bloque. La regla de este tiempo llega en la semana 27."

tr(6, "¡Si Dios quiere!", ["Se Deus quiser!"],
   "Se dice *se Deus quiser*, no «se Deus quer»: *quiser* es el futuro do subjuntivo de *querer*, "
   "un tiempo que el castellano perdió y el portugués usa todos los días." + FORM)

tr(8, "Cuando puedas, avisame.",
   _combo(["Quando você puder, ", "Quando puder, "], ["me avisa"]) +
   _combo(["Quando você puder, ", "Quando puder, "], ["me avise"]) +
   _combo(["Me avisa quando ", "Me avise quando "], ["você puder", "puder"]),
   "«Cuando puedas» se dice *quando você puder*, no «quando você possa»: para un momento futuro, "
   "el portugués usa el futuro do subjuntivo (*puder*). *Me avisa* es como se pide en el habla." + FORM)

tr(12, "Si se puede, vamos al bloco el sábado.",
   _combo(["Se der, ", "Se for possível, "], ["a gente vai", "vamos", "nós vamos"],
          [" ao bloco", " no bloco", " pro bloco", " para o bloco"], [" no sábado", " sábado"]),
   "*Se der* es «si se puede, si sale»: *dar* en futuro do subjuntivo. «Se dá» sería otra cosa "
   "(si se da ahora, siempre). *Ir no bloco* es del habla; en la norma, *ir ao bloco*." + FORM)

tr(18, "Como quieras. (a un amigo que no sabe dónde comer)",
   ["Como você quiser.", "Como quiser.", "Do jeito que você quiser.", "Do jeito que quiser.",
    "Como você preferir.", "Como preferir."],
   "*Como você quiser* (o *como você preferir*). Con *como*, *quem*, *onde* "
   "y una mirada al futuro va el futuro do subjuntivo: nunca «como você queira»." + FORM)

tr(20, "Si hace falta, te ayudo.",
   _combo(["Se precisar, ", "Se você precisar, ", "Se for preciso, ", "Se for necessário, "],
          ["eu te ajudo", "te ajudo", "eu ajudo você", "ajudo você", "eu vou te ajudar", "vou te ajudar"]),
   "«Si hace falta» mira al futuro: *se precisar* (o *se for preciso*), con el futuro do "
   "subjuntivo de *precisar* (igual al infinitivo) o de *ser* (*for*). No «se precisa»." + FORM)

tr(24, "Sea como sea, el sábado voy a la playa.",
   _combo(["Seja como for, "], ["no sábado eu vou", "no sábado vou", "eu vou no sábado", "vou no sábado"],
          [" à praia", " pra praia", " para a praia"]) +
   _combo(["Seja como for, "], ["eu vou", "vou"], [" à praia", " pra praia", " para a praia"], " no sábado") +
   _combo(["No sábado eu vou", "No sábado vou"], [" à praia", " pra praia", " para a praia"], [", seja como for"]),
   "*Seja como for* junta el presente de subjuntivo que ya viste (*seja*) con el futuro do "
   "subjuntivo de *ser* (*for*). No es «seja como seja», el calco de «sea como sea»." + FORM)


# ===========================================================================
# Semana 27 — relativas e indefinidos (6) y costumbre → plan (4)
# partes: 0 forma · 1 ver/vir y momentos futuros · 2 condiciones abiertas
# ===========================================================================
W = 27
tr(W, "Quien quiera puede irse antes.",
   _combo("Quem quiser pode ", ["sair", "ir embora"], [" mais cedo", " antes"]),
   "El castellano dice «quien quiera» con presente de subjuntivo; el portugués, con futuro do "
   "subjuntivo: *quem quiser*. «Quem queira» es el calco. *Irse* acá es *sair* o *ir embora*.",
   part=2)
tr(W, "Elegí el que te parezca mejor.",
   _combo(["Escolha", "Escolhe"], [" o que", " aquele que"],
          [" você achar", " achar", " te parecer", " lhe parecer"], " melhor"),
   "«El que te parezca» mira a algo que todavía no pasó: *o que você achar* (futuro do "
   "subjuntivo de *achar*, igual al infinitivo). También vale *o que te parecer melhor*. "
   "*Escolhe* es el imperativo del habla.",
   part=2)
tr(W, "Voy adonde vayas.",
   _combo(["Vou", "Eu vou"], [" aonde", " onde", " para onde", " pra onde"], " você for"),
   "«Adonde vayas» es *aonde você for*: *ir* en futuro do subjuntivo (*foram → for*). "
   "En el habla también se oye *onde você for*. Nunca «aonde você vá».",
   part=2)
fx(W, "Como vocês prefiram, a gente marca.", "prefiram", "preferirem", "futuro_subj",
   "«Como prefieran» se dice *como vocês preferirem*: con *como* y algo por decidir va el futuro "
   "do subjuntivo (regular: infinitivo + -em). *Prefiram* es el calco del presente de subjuntivo.",
   part=2)
cl(W, "Quem ___ (ter) dúvidas pode me mandar uma mensagem.", "tiver",
   "Indefinido con mirada al futuro: *quem tiver* (el que tenga). *ter → tiveram → tiver*. "
   "No «quem tenha», que es el calco de «quien tenga».",
   part=2)
cl(W, "Aconteça o que ___ (acontecer), conte comigo.", "acontecer",
   "Fórmula de «pase lo que pase»: *aconteça* (presente de subjuntivo) + *o que acontecer* "
   "(futuro do subjuntivo, igual al infinitivo): el mismo verbo en dos tiempos. En Brasil no se "
   "dice «aconteça o que aconteça», el calco de «pase lo que pase».",
   part=2)

cl(W, "Todo mês, quando eu ___ (receber), pago o aluguel. / Este mês, quando eu ___ (receber), "
      "vou pagar as contas atrasadas.", "recebo | receber",
   "La primera es costumbre (todo mês): indicativo, como «cuando cobro». La segunda todavía no "
   "pasó: futuro do subjuntivo, «cuando cobre» = *quando eu receber*. Mismo *quando*, otro sentido.",
   part=1)
cl(W, "Sempre que ele ___ (poder), viaja. / Assim que ele ___ (poder), vai viajar.", "pode | puder",
   "*Sempre que* + presente es lo que hace siempre (indicativo: *pode*). *Assim que* con un plan "
   "es futuro: *puder* (*puderam → puder*). Fijate si ya pasa o todavía no.",
   part=1)
cl(W, "Quando eu era criança e ___ (ter) tempo, lia muito. / Agora, quando eu ___ (ter) tempo, "
      "vou ler mais.", "tinha | tiver",
   "En el pasado habitual va el imperfeito (*tinha*), como «cuando tenía». Para lo que viene, "
   "futuro do subjuntivo: *quando eu tiver*, «cuando tenga».",
   part=1)
cl(W, "Quando eu era pequeno, se ___ (fazer) sol, a gente sempre ia à praia. / Se ___ (fazer) sol "
      "amanhã, a gente vai à praia.", "fazia | fizer",
   "Hábito del pasado (*sempre ia*): imperfeito, *se fazia sol*, como «si hacía sol». Con "
   "*amanhã* es una condición futura: *se fizer sol* (*fizeram → fizer*).",
   part=1)


# ===========================================================================
# 4. Hilo espaciado 28-50 (con relativas y costumbre → plan donde tocan)
# ===========================================================================

# --- 28 · Imperfeito do subjuntivo e condicionais ---------------------------
W = 28
tr(W, "Cuando tenga plata, me compro una casa en Paraty.",
   _combo(["Quando eu tiver ", "Quando tiver "], ["dinheiro", "grana"],
          [", vou comprar", ", eu vou comprar", ", compro", ", eu compro", ", comprarei", ", vou me comprar"],
          " uma casa em Paraty"),
   "«Cuando tenga» es un momento futuro: *quando eu tiver*, no «quando eu tenha». No lo "
   "confundas con la hipótesis de esta semana: *se eu tivesse dinheiro, compraria* (si tuviera).")
cl(W, "Se eu ___ (poder) amanhã, passo aí. / Se eu ___ (poder) agora, passaria aí.", "puder | pudesse",
   "Condición posible en el futuro: *se* + futuro do subjuntivo (*puder*) y presente o futuro en "
   "la otra mitad. Hipótesis (si pudiera): *se* + imperfeito do subjuntivo (*pudesse*) + *-ria*.")

# --- 29 · Infinitivo pessoal -------------------------------------------------
W = 29
tr(W, "En cuanto terminemos el informe, te lo mandamos.",
   _combo(["Assim que ", "Logo que "], ["terminarmos", "a gente terminar", "nós terminarmos"],
          " o relatório, ",
          ["a gente te manda", "te mandamos", "nós te mandamos", "mandamos para você",
           "a gente manda para você", "a gente manda pra você", "enviamos para você", "te enviamos"]),
   "«En cuanto terminemos» → *assim que terminarmos* (o *a gente terminar*): futuro do "
   "subjuntivo. La forma *terminarmos* es igual al infinitivo pessoal de esta semana (*para "
   "terminarmos*), pero acá la pide *assim que*. Nunca «assim que terminemos».")
cl(W, "Os alunos só vão receber o diploma depois que ___ (fazer) a prova final.", "fizerem",
   "*Depois que* + algo futuro: futuro do subjuntivo, *fizerem* (*fizeram → fizer + -em*). Con "
   "*depois de* iría el infinitivo pessoal: *depois de fazerem a prova*.")

# --- 30 · Tempos compostos (1 del hilo + 2 costumbre → plan) ----------------
W = 30
di(W, "Quando eu tiver terminado o mestrado, volto para a Argentina.",
   "*Tiver terminado* es el futuro do subjuntivo compuesto: *ter* en futuro do subjuntivo + "
   "participio, el «cuando haya terminado» del castellano. *Mestrado* es la maestría, y "
   "*a Argentina* lleva artículo.",
   alt=["Quando eu tiver terminado o mestrado, eu volto para a Argentina.",
        "Quando eu tiver terminado o mestrado, volto pra Argentina."])
cl(W, "Quando eu ___ (sair) do trabalho ontem, estava chovendo. / Quando eu ___ (sair) do trabalho "
      "hoje, te ligo.", "saí | sair",
   "*Ontem* es un hecho pasado: perfeito, *quando eu saí*. *Hoje* (todavía no pasó): futuro do "
   "subjuntivo, *quando eu sair* (igual al infinitivo). Mismo *quando*, otro momento.")
cl(W, "Se ele ___ (estar) em casa, sempre atende o telefone. / Se ele ___ (estar) em casa amanhã, "
      "a gente passa lá.", "está | estiver",
   "Lo que pasa siempre: *se* + presente de indicativo (*está*). Una condición futura (*amanhã*): "
   "*se* + futuro do subjuntivo (*estiveram → estiver*).")

# --- 31 · Discurso indireto --------------------------------------------------
W = 31
tr(W, "En cuanto el ministro hable, te aviso.",
   _combo(["Assim que ", "Logo que ", "Quando "], "o ministro falar, ",
          ["eu te aviso", "te aviso", "aviso você", "eu aviso você", "vou te avisar", "eu vou te avisar"]),
   "«En cuanto hable» → *assim que o ministro falar*: futuro do subjuntivo, que en los regulares "
   "es igual al infinitivo. «Assim que o ministro fale» es el calco del castellano.")
cl(W, "«Se eu ___ (ter) novidades, publico a matéria», disse a repórter. / A repórter disse que, "
      "se ___ (ter) novidades, publicaria a matéria.", "tiver | tivesse",
   "En el discurso directo, condición futura: *se eu tiver*. Al contarlo en pasado (*disse que*), "
   "los tiempos se corren: futuro do subjuntivo → imperfeito do subjuntivo (*tivesse*), y "
   "*publico* → *publicaria*.")

# --- 32 · Passiva sintética --------------------------------------------------
W = 32
tr(W, "Mientras haya lugar, se aceptan inscripciones.",
   _combo("Enquanto houver ", ["vaga", "vagas"], ", ",
          ["aceitam-se inscrições", "as inscrições são aceitas", "se aceitam inscrições",
           "a gente aceita inscrições", "aceitamos inscrições"]),
   "«Mientras haya» → *enquanto houver* (futuro do subjuntivo de *haver*, siempre singular), no "
   "«enquanto haja». Y la pasiva del cartel concuerda: *aceitam-se inscrições*. «Lugar» acá es *vaga*.")
cl(W, "Se ___ (haver) qualquer problema com a reserva, procure a recepção.", "houver",
   "Condición futura con *haver*: *se houver* (*houveram → houver*), siempre en singular, como "
   "«si hay / si hubiera». No «se há» ni «se haja».")

# --- 33 · Colocação pronominal (dictado) -------------------------------------
W = 33
di(W, "Quando a senhora o receber, entregue-o ao diretor.",
   "*Quando* atrae el pronombre (próclise): *quando a senhora o receber*, con *receber* en "
   "futuro do subjuntivo. En el imperativo afirmativo de la escritura, ênclise: *entregue-o*.",
   alt=["Quando a senhora o receber, entregue o ao diretor."])
tr(W, "Si me necesitan, llámenme.",
   _combo(["Se precisarem de mim, ", "Se vocês precisarem de mim, "],
          ["me liguem", "liguem-me", "me chamem", "chamem-me"]),
   "«Si me necesitan» mira al futuro: *se precisarem* (futuro do subjuntivo) y *precisar de*. "
   "En el habla, *me liguem*; en la escritura formal, *liguem-me* (no se empieza con pronombre).")

# --- 34 · Conectores (1 del hilo + 2 relativas) ------------------------------
W = 34
tr(W, "Mientras no haya acuerdo, el proyecto queda parado.",
   _combo("Enquanto não houver acordo, o projeto ",
          ["fica parado", "continua parado", "vai ficar parado", "ficará parado", "segue parado"]),
   "*Enquanto* con algo que todavía puede cambiar pide futuro do subjuntivo: *enquanto não houver "
   "acordo*. «Enquanto não haja» es el calco del castellano «mientras no haya».")
tr(W, "Quien no esté de acuerdo puede proponer otra cosa.",
   _combo(["Quem não estiver de acordo", "Quem não concordar"],
          " pode ", ["propor", "sugerir"], " outra coisa"),
   "«Quien no esté» → *quem não estiver* (o *quem não concordar*): el indefinido que mira al "
   "futuro va en futuro do subjuntivo. «Quem não esteja» es el calco.")
cl(W, "Os dados que vocês ___ (trazer) para o debate precisam ter fonte.", "trouxerem",
   "Relativa sobre algo que todavía no existe (los datos que traigan): futuro do subjuntivo, "
   "*trouxerem* (*trouxeram → trouxer + -em*). No «tragam».")

# --- 35 · Regência verbal ----------------------------------------------------
W = 35
cl(W, "Se o senhor ___ (trazer) o RG amanhã, a gente resolve.", "trouxer",
   "*trazer → trouxeram → trouxer*: el futuro do subjuntivo sale del perfeito, no del infinitivo "
   "(nunca «trazer» ni «traga»). *Amanhã* marca la condición futura.")
tr(W, "Cuando te acuerdes de la contraseña, avisame.",
   _combo(["Quando você se lembrar", "Quando se lembrar", "Quando você lembrar", "Quando lembrar"],
          " da senha, ", ["me avisa", "me avise", "avise-me"]),
   "*Lembrar(-se) de* + *a senha* = *da senha*. Y «cuando te acuerdes» es futuro: *quando você "
   "se lembrar* (en los regulares, igual al infinitivo). En el habla, *quando você lembrar*.")

# --- 36 · Crase (dictado) ----------------------------------------------------
W = 36
di(W, "Quando você chegar à rodoviária, pegue o ônibus para Ipanema.",
   "*Chegar a* + *a rodoviária* = *à rodoviária*, con crase. *Chegar* tras *quando* es futuro "
   "do subjuntivo (igual al infinitivo). *Ônibus* lleva circunflejo.",
   alt=["Quando você chegar à rodoviária, pega o ônibus para Ipanema.",
        "Quando você chegar à rodoviária, pegue o ônibus pra Ipanema."])
cl(W, "Quando eu ___ (ir) à reunião, levo os documentos.", "for",
   "*ir → foram → for*: el futuro do subjuntivo de *ir* es igual al de *ser*. *Ir a* + *a reunião* "
   "= *à reunião*, con crase. No «quando eu vá».")

# --- 37 · Verbos irregulares e derivados -------------------------------------
W = 37
cl(W, "Se a empresa ___ (manter) os preços, vamos renovar o contrato.", "mantiver",
   "*Manter* se conjuga como *ter*: *mantiveram → mantiver*. «Se a empresa manter» es un error "
   "frecuente, también entre brasileños; en la norma, *mantiver*.")
tr(W, "Si el gobierno interviene, el precio va a bajar.",
   _combo("Se o governo intervier, o preço ",
          ["vai cair", "vai baixar", "cai", "baixa", "cairá", "baixará"]),
   "*Intervir* se conjuga como *vir*: *intervieram → intervier*. «Se o governo intervir» es el "
   "error típico. La condición es futura, así que no va presente («se intervém»).")

# --- 38 · Português falado ---------------------------------------------------
W = 38
tr(W, "Si querés, te paso a buscar mañana.",
   _combo(["Se você quiser, ", "Se quiser, "],
          ["eu te pego", "te pego", "eu passo para te pegar", "passo pra te pegar",
           "eu passo pra te pegar", "eu passo aí pra te pegar", "eu vou te pegar",
           "eu te busco", "te busco", "eu passo pra te buscar", "passo pra te buscar",
           "eu passo para te buscar", "eu vou te buscar"], " amanhã"),
   "Con *amanhã*, el «si querés» mira al futuro: *se você quiser*. «Pasar a buscar» en el habla "
   "de Brasil es *pegar* o *buscar* (*te pego amanhã*, *te busco amanhã*).")
cl(W, "Quando vocês ___ (vir) pra cá, avisem antes, tá?", "vierem",
   "*vir → vieram → vier*, con vocês *vierem*. «Quando vocês virem» es de *ver* (cuando vean). "
   "*Pra cá* y *tá?* son del habla.")

# --- 39 · Chefão B2 (costumbre → plan) ---------------------------------------
W = 39
cl(W, "No ano passado, sempre que eu ___ (ir) a São Paulo, ficava num hotel. / Da próxima vez que "
      "eu ___ (ir) a São Paulo, vou ficar na casa da Bia.", "ia | for",
   "Hábito del pasado: imperfeito (*ia*), como «cada vez que iba». *Da próxima vez que* mira al "
   "futuro: futuro do subjuntivo, *for*.")
cl(W, "Quando a gente ___ (ver) um filme brasileiro, sempre discute depois. / Quando a gente ___ "
      "(ver) esse filme novo, a gente conversa.", "vê | vir",
   "*Sempre*: costumbre, presente de indicativo (*vê*). Lo que todavía no pasó: futuro do "
   "subjuntivo de *ver*, que es *vir* (*viram → vir*), no «ver» ni «vier».")

# --- 40 · Registro formal ----------------------------------------------------
W = 40
cl(W, "Os dados serão divulgados assim que ___ (estar) disponíveis.", "estiverem",
   "*Assim que* + futuro: futuro do subjuntivo, *estiveram → estiverem*. «Assim que estejam» es el "
   "calco de «en cuanto estén».")
tr(W, "Si hay alguna duda, quedamos a disposición.",
   _combo(["Se houver ", "Caso haja "], ["qualquer dúvida", "alguma dúvida", "dúvidas"],
          ", ", ["ficamos", "permanecemos", "continuamos", "estamos"], " à disposição"),
   "El castellano dice «si hay» con presente, pero la duda es futura: *se houver* (o *caso haja*, "
   "con presente de subjuntivo). «Se há dúvida» suena a que ya la hay. *À disposição*, con crase.",
   prompt=TRF)

# --- 41 · Narrativa (dictado) ------------------------------------------------
W = 41
di(W, "Quando o leitor chegar ao último capítulo, entenderá tudo.",
   "*Chegar* tras *quando* es futuro do subjuntivo; en la otra mitad, futuro (*entenderá*), "
   "propio de la escritura. *Chegar a* + *o* = *ao*.",
   alt=["Quando o leitor chegar ao último capítulo, vai entender tudo."])
cl(W, "Quem ___ (ver) a adaptação de Dom Casmurro para a TV vai reconhecer o Bentinho.", "vir",
   "*ver → viram → vir*: «quem ver» es el error, y *vier* es de *vir* (venir). El indefinido "
   "*quem* que mira al futuro pide futuro do subjuntivo.")

# --- 42 · Orações reduzidas --------------------------------------------------
W = 42
tr(W, "Si se confirma la noticia, el diario la publica mañana.",
   _combo(["Se a notícia se confirmar, ", "Se a notícia for confirmada, ", "Confirmando-se a notícia, ",
           "Caso a notícia se confirme, "],
          ["o jornal a publica", "o jornal publica", "o jornal vai publicá-la", "o jornal vai publicar",
           "o jornal a publicará", "o jornal publicará", "o jornal publica a notícia"], " amanhã"),
   "«Si se confirma» (mañana) es condición futura: *se a notícia se confirmar*. La reducida de "
   "esta semana también vale: *confirmando-se a notícia*. Nunca «se a notícia se confirma».")
cl(W, "Assim que os votos ___ (ser) contados, o resultado será anunciado.", "forem",
   "Pasiva con *ser* tras *assim que*: futuro do subjuntivo de *ser*, *forem contados*. La "
   "reducida equivalente es *contados os votos*.")

# --- 43 · Correspondência formal (1 del hilo + 2 relativas) ------------------
W = 43
cl(W, "Se a senhora ___ (poder) confirmar sua presença até sexta-feira, agradeço.", "puder",
   "*poder → puderam → puder*. En el mail formal, *se a senhora puder…* es la manera cortés de "
   "pedir; «se a senhora possa» no existe.")
cl(W, "Fico à disposição para o que ___ (ser) necessário.", "for",
   "Fórmula de cierre: *para o que for necessário* (para lo que sea necesario). Con *o que* y "
   "mirada al futuro, futuro do subjuntivo de *ser*: *for*, no «seja».")
fx(W, "Podemos marcar a reunião no dia que a senhora prefira.", "prefira", "preferir", "futuro_subj",
   "«El día que usted prefiera» → *no dia que a senhora preferir*: relativa sobre algo que "
   "todavía no se eligió, con futuro do subjuntivo (regular: igual al infinitivo).",
   prompt=FXF)

# --- 44 · Formação de palavras (dictado) --------------------------------------
W = 44
di(W, "Enquanto houver desmatamento na Amazônia, a biodiversidade continuará ameaçada.",
   "*Enquanto houver*: futuro do subjuntivo de *haver*. *Desmatamento* (des- + mata + -mento) y "
   "*biodiversidade* son derivados; *Amazônia*, con circunflejo.")
tr(W, "Cuando renueven el pasaporte, pidan el comprobante.",
   _combo(["Quando vocês renovarem", "Quando renovarem"], " o passaporte, ",
          ["peçam o comprovante", "peçam um comprovante"]),
   "«Cuando renueven» → *quando vocês renovarem* (infinitivo + -em). *Comprovante* viene de "
   "*comprovar* con *-nte*, como «comprobante», pero con *v*.")

# --- 45 · Falsos amigos ------------------------------------------------------
W = 45
tr(W, "Cuando pases por el taller, retirá el auto.",
   _combo(["Quando você passar ", "Quando passar "], ["pela oficina", "na oficina"], ", ",
          ["pegue o carro", "pega o carro", "retire o carro", "busque o carro", "busca o carro"]),
   "El taller mecánico es la *oficina* (falso amigo). Y «cuando pases» es futuro: *quando você "
   "passar*, no «quando você passe».")
cl(W, "Se você ___ (pôr) muito sal no polvo, ninguém vai comer.", "puser",
   "*pôr → puseram → puser*. Ojo también con *polvo*: es el «pulpo» (el polvo es *pó*).")

# --- 46 · Variação -----------------------------------------------------------
W = 46
cl(W, "(Portugal) Se tu ___ (vir) a Lisboa, vamos tomar um café.", "vieres",
   "En Portugal *tu* es lo normal, y el futuro do subjuntivo agrega *-es*: *se tu vieres* "
   "(*vieram → vier + -es*). En Brasil: *se você vier*.")
tr(W, "Cuando vengas a Recife, te llevo a Olinda.",
   _combo(["Quando você vier ", "Quando vier "], ["a Recife", "para Recife", "pra Recife"], ", ",
          ["eu te levo", "te levo", "levo você", "eu levo você", "vou te levar", "eu vou te levar"],
          [" a Olinda", " para Olinda", " pra Olinda"]),
   "«Cuando vengas» → *quando você vier* (*vieram → vier*). «Quando você venha» es el calco y "
   "«quando você vir» es de *ver*.")

# --- 47 · Argumentação (1 del hilo + 2 costumbre → plan) ----------------------
W = 47
tr(W, "Mientras no se demuestre lo contrario, la hipótesis sigue en pie.",
   _combo(["Enquanto não se provar o contrário, ", "Enquanto não for provado o contrário, ",
           "Até que se prove o contrário, ", "Até prova em contrário, "],
          "a hipótese ", ["continua de pé", "se mantém", "continua válida", "segue de pé"]),
   "*Enquanto não* + futuro do subjuntivo: *enquanto não se provar o contrário*. Con *até que* va "
   "presente de subjuntivo (*até que se prove*). «Enquanto não se prove» es el calco.")
cl(W, "Quando os dados ___ (confirmar) uma tendência, os pesquisadores costumam publicar. / Quando os "
      "dados ___ (confirmar) essa tendência, publicaremos o estudo.", "confirmam | confirmarem",
   "*Costumam*: lo que pasa en general, presente de indicativo (*confirmam*). *Publicaremos*: un "
   "plan, así que futuro do subjuntivo (*confirmarem*).")
cl(W, "À medida que a pesquisa ___ (avançar) no ano passado, surgiam novas dúvidas. / À medida que "
      "a pesquisa ___ (avançar), surgirão novas dúvidas.", "avançava | avançar",
   "En el pasado, proceso en curso: imperfeito (*avançava*). Hacia adelante (*surgirão*): futuro "
   "do subjuntivo (*avançar*, igual al infinitivo).")

# --- 48 · Resumo e reformulação (dictado) -------------------------------------
W = 48
di(W, "Quem quiser saber mais encontra o texto completo no site.",
   "*Quem quiser*: indefinido con futuro do subjuntivo (no «quem queira»). Fórmula típica del "
   "final de una nota de divulgación.")
tr(W, "Siempre que sea posible, citen la fuente original.",
   _combo(["Sempre que for possível, ", "Sempre que possível, "],
          ["citem a fonte original", "citem a fonte"]),
   "«Siempre que sea posible» → *sempre que for possível* o, reducida, *sempre que possível*. "
   "«Sempre que seja possível» es el calco.")

# --- 49 · Registro culto e coloquial ------------------------------------------
W = 49
tr(W, "Cuando sepas algo, mandame un mensaje.",
   _combo(["Quando você souber ", "Quando souber "], ["de alguma coisa", "alguma coisa", "de algo", "algo"],
          ", ", ["me manda uma mensagem", "me manda mensagem", "me mande uma mensagem", "me manda um zap"]),
   "*saber → souberam → souber*: *quando você souber*, no «quando você saiba». *Me manda* es el "
   "habla; en un texto cuidado, *mande-me*.")
cl(W, "(edital) Os candidatos que não ___ (comparecer) à prova serão eliminados.", "comparecerem",
   "Registro culto de los edictos y reglamentos: relativa con futuro do subjuntivo, *os que não "
   "comparecerem* (infinitivo + -em). *Comparecer a* + *a prova* = *à prova*.")

# --- 50 · Expressões idiomáticas (1 del hilo + 2 relativas) -------------------
W = 50
cl(W, "Se ___ (dar) zebra, a gente tenta de novo.", "der",
   "*Dar zebra* es «salir todo al revés». *dar → deram → der*: *se der zebra*, como *se der* "
   "(si se puede). No «se dê».")
tr(W, "Pase lo que pase, no bajes los brazos.",
   _combo(["Aconteça o que acontecer, ", "Haja o que houver, ", "Seja o que for, "],
          ["não desista", "não desanime", "não baixe os braços", "não jogue a toalha", "não entregue os pontos"]),
   "Fórmulas en pareja: *aconteça o que acontecer*, *haja o que houver*, *seja o que for*: "
   "presente de subjuntivo + futuro do subjuntivo del mismo verbo. «Bajar los brazos» se dice "
   "*desistir* o *jogar a toalha*.")
cl(W, "Doa a quem ___ (doer), a verdade vai aparecer.", "doer",
   "«Duela a quien le duela» → *doa a quem doer*: presente de subjuntivo + futuro do subjuntivo "
   "(igual al infinitivo). No «doa a quem doa».")

# --- 51 · Revisão (costumbre → plan) ------------------------------------------
W = 51
cl(W, "Antigamente, quando eu ___ (ver) um erro de português, ficava quieto. / De agora em diante, "
      "quando eu ___ (ver) um erro, vou corrigir.", "via | vir",
   "Hábito del pasado: imperfeito, *via*. Lo que viene (*de agora em diante*): futuro do "
   "subjuntivo de *ver*, que es *vir*.")
cl(W, "Quando nós ___ (fazer) os simulados, sempre ficávamos nervosos. / Quando nós ___ (fazer) o "
      "Celpe-Bras, vamos estar tranquilos.", "fazíamos | fizermos",
   "Lo que pasaba siempre: imperfeito (*fazíamos*). El examen que viene: futuro do subjuntivo, "
   "*fizermos* (*fizeram → fizer + -mos*).")
