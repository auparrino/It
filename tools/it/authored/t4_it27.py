# -*- coding: utf-8 -*-
"""Tanda 4, italiano, semanas 27-39 (auditorias/PLAN-2026-10-propuestas.md).

Lo que la revisión contra manuales (auditorias/2026-10-italiano-revision.md,
temporada 3) pedía y no estaba hecho (los duelos, el Capire y la evidencia
negativa del banco van por otro lado):

1. La 27 deja de ser una semana de adverbios A1-A2: modalidad epistémica
   (*forse* + indicativo frente a *può darsi che* + congiuntivo, *sarà* /
   *avrà perso*, *dovrebbe* + infinitivo) y adverbios de juicio (*mica*,
   *appunto*, *eppure*, *magari*): t4it27-27-e…, -j…
2. La 28 empieza el modelo «por propósito»: la misma causa, concesión o
   condición con conector, con sustantivo o con infinitivo (t4it27-28-p…).
3. La 37 hace elegir entre passato remoto e imperfetto al narrar, y pasa un
   relato del prossimo al remoto (t4it27-37-n…); la 38 reconoce el gerundio
   solo (tiempo, causa, concesión, modo: t4it27-38-g…).
4. Pendientes de la semanal: *credo che fosse* (32), *come se* (30), los
   tres usos del condizionale passato en lugar de los modales A1 (31), el
   doble imperfetto y *qualora* (33), relativas con congiuntivo y con
   *da* + infinitivo (34), y ítems propios para el repaso del jefe (39).
5. Escucha dentro de las rondas, con lo que se distingue solo de oído
   (*parlò / parlo*, *avremmo / avremo*, *venissi / venisse*, *si vende /
   si vendono*…), números, horas y precios, y un dictado por semana.
6. «Racconto a buchi»: la lectura de la semana ya leída, con los verbos en
   infinitivo (w-29 a w-39).
7. Pragmática que no se resuelve por el largo de la opción: lo breve como lo
   adecuado entre amigos, *tu / Lei* y *Scusa / Mi scusi* como lo que decide,
   y pares que difieren en una palabra (*vorrei / esigo / voglio*).

Prefijo de los ids: t4it27-<semana>-<tramo><n>.
"""
import itertools
import re

LEVEL = {}
for _w in range(1, 53):
    LEVEL[_w] = "B1" if _w <= 28 else "B2"

T_ASC = "ascolto"
FX = "Trova l'errore: tocá la palabra que está mal y corregila."
TR = "Traducí al italiano."
DI = "Dictado: escuchá y escribí lo que oís."
TY = "Reescribí la frase con la forma que se pide, sin cambiar el sentido: escribí solo lo que falta."
RB = ("Racconto a buchi: es la lectura de la semana («%s»). Poné cada verbo en el tiempo "
      "que pide el texto.")
PR = "Elegí la opción adecuada a la situación."

ITEMS = []
_N = {}


def _add(w, tag, typ, topic, prompt, stem, answer, note, alt=None, **extra):
    k = (w, tag)
    _N[k] = _N.get(k, 0) + 1
    seen, clean = set(), []
    for a in alt or []:
        key = a.rstrip(".?!")
        if a and key != answer.rstrip(".?!") and key not in seen:
            seen.add(key)
            clean.append(a)
    d = dict(id="t4it27-%d-%s%02d" % (w, tag, _N[k]), w=w, level=LEVEL[w], type=typ, topic=topic,
             prompt=prompt, stem=stem, answer=answer, note=note)
    if clean:
        d["alt"] = clean
    d.update(extra)
    assert len(note) <= 320, (d["id"], len(note))
    assert note.count("*") % 2 == 0, d["id"]
    ITEMS.append(d)
    return d


def li(w, tag, prompt, said, options, note, answer=None):
    """listen: se oye la frase (sin texto) y se elige.  La respuesta es lo
    que se dijo, salvo que se pida otra cosa (el número, la hora, el precio):
    entonces es la que se pasa en «answer» (o la primera opción)."""
    answer = answer or (said if said in options else options[0])
    assert answer in options, (said, options)
    return _add(w, tag, "listen", T_ASC, prompt, said, answer, note, options=options, nopeek=True)


def di(w, tag, text, note, alt=None):
    """Dictado: se oye la frase y se escribe entera."""
    return _add(w, tag, "dictation", T_ASC, DI, text, text, note, alt, nopeek=True)


def fx(w, tag, topic, cat, stem, bad, good, note, alt=None):
    """Trova l'errore: «bad» es una palabra de la frase; «good», lo que va."""
    pat = r"(?<![\w'])" + re.escape(bad) + r"(?![\w'])"
    assert len(re.findall(pat, stem)) == 1, (stem, bad)
    answer = re.sub(pat, lambda m: good, stem, count=1)
    answer = re.sub(r"\s{2,}", " ", answer).strip()
    return _add(w, tag, "fixerr", topic, FX, stem, answer, note, alt, cat=cat, bad=bad, good=good)


def tr(w, tag, topic, stem, variants, note):
    return _add(w, tag, "translate", topic, TR, stem, variants[0], note, variants[1:])


def cz(w, tag, topic, prompt, stem, answer, note, alt=None):
    assert stem.count("___") == len(answer.split(" | ")), stem
    return _add(w, tag, "cloze", topic, prompt, stem, answer, note, alt)


def ty(w, tag, topic, stem, answer, note, alt=None, prompt=TY):
    """typed de transformación (como los c1-tf): «A → B ___», se escribe
    solo lo que falta."""
    assert "→" in stem and stem.count("___") == len(answer.split(" | ")), stem
    return _add(w, tag, "typed", topic, prompt, stem, answer, note, alt)


def ch(w, tag, topic, prompt, stem, options, note):
    """choice: la primera opción es la correcta (se guarda así; la app las
    mezcla)."""
    assert len(set(options)) == len(options), options
    return _add(w, tag, "choice", topic, prompt, stem, options[0], note, options=list(options))


def pr(w, situation, good, others, note):
    """Pragmática: la situación en castellano (stemEs) y tres versiones."""
    opts = [good] + list(others)
    lens = [len(o) for o in opts]
    # que no se resuelva por el largo: la más larga no pasa del doble de la más corta
    assert max(lens) <= 2 * min(lens), (situation, lens)
    return _add(w, "pr", "choice", "pragmatica", PR, situation, good, note, options=opts, stemEs=True)


def rb(w, title, stem, gaps, note, prompt=None):
    """Varios huecos sobre la lectura: cada hueco, la lista de formas que
    valen (la primera es la del texto)."""
    assert stem.count("___") == len(gaps), stem
    combos = [" | ".join(c) for c in itertools.product(*gaps)]
    return _add(w, "rb", "cloze", "tempo_verbale", (prompt or RB) % title, stem, combos[0], note, combos[1:])


def combo(*parts):
    """Todas las combinaciones: cada parte es un texto o una lista de variantes."""
    parts = [[p] if isinstance(p, str) else p for p in parts]
    return ["".join(c) for c in itertools.product(*parts)]


OIDO = "Escuchá y elegí lo que oíste."
QUIEN = "Escuchá: ¿quién lo hace? Elegí el sujeto."
HORA = "Escuchá: ¿a qué hora?"
PRECIO = "Escuchá: ¿cuánto cuesta?"
ANNO = "Escuchá: ¿en qué año?"
P3 = "lui / lei"


# ===========================================================================
# 27: qué tan seguro estás (forse, può darsi che, sarà, dovrebbe) y juicio
# ===========================================================================
T_EP = "modalità"
ch(27, "e", T_EP, "Elegí la que va.", "Forse Luca ___ ancora in ufficio.", ["è", "sia", "stia"],
   "*forse* va con indicativo: *forse è*. El castellano suele poner subjuntivo después de «quizás» "
   "(quizás esté) y de ahí sale ✗forse sia.")
ch(27, "e", T_EP, "Elegí la que va.", "Può darsi che Luca ___ ancora in ufficio.", ["sia", "è", "sarà"],
   "*può darsi che* (puede ser que), como *è possibile che* o *è probabile che*, pide congiuntivo: "
   "*sia*. La misma duda con *forse* lleva indicativo: *forse è*.")
cz(27, "e", T_EP, "Completá con essere: «debe de estar en una reunión».",
   "Non risponde al telefono: ___ in riunione.", "sarà",
   "Para suponer algo del presente, el italiano usa el futuro: *sarà in riunione* = debe de estar, "
   "capaz que está. No habla del mañana. *deve essere* también lo dice.", alt=["deve essere", "dev'essere"])
cz(27, "e", T_EP, "Completá con el futuro de suposición (algo que ya pasó).",
   "Sono le nove e Anna non è ancora arrivata: ___ il treno. (perdere)", "avrà perso",
   "Suposición sobre algo pasado: futuro anteriore, *avrà perso* (habrá perdido, seguro perdió). "
   "Con *dovere*: *deve aver perso*.", alt=["avrà perduto", "deve aver perso", "deve avere perso"])
cz(27, "e", T_EP, "Completá con essere en futuro de suposición.",
   "Che ore sono? — Non ho l'orologio, ma ___ le tre.", "saranno",
   "La hora va en plural (*sono le tre*), así que la suposición también: *saranno le tre* = serán las tres, "
   "deben ser las tres.")
cz(27, "e", T_EP, "Completá con dovere: es una suposición con datos (el seguimiento del envío).",
   "Secondo il sito, il pacco ___ arrivare domani.", "dovrebbe",
   "*dovrebbe* + infinitivo = «debería», lo que esperás según un horario o un plan. "
   "*deve arrivare* lo daría por seguro.")
tr(27, "e", T_EP, "A esta hora Marco ya debería haber terminado.",
   combo(["A quest'ora Marco ", "Marco a quest'ora "], "dovrebbe ",
         ["aver già finito", "avere già finito", "già aver finito", "già avere finito", "aver finito", "avere finito"], ".")
   + combo(["A quest'ora Marco ", "Marco a quest'ora "], "avrà già finito."),
   "*dovrebbe* + infinitivo compuesto (*aver finito*) supone algo ya terminado. *già* puede ir entre "
   "*aver* y el participio, como en *ha già finito*.")
fx(27, "e", T_EP, "modo_verbale", "Forse Marco sia già partito.", "sia", "è",
   "*forse* no pide congiuntivo: *forse è già partito*. Si querés el congiuntivo, cambiá el comienzo: "
   "*può darsi che sia già partito*.")
fx(27, "e", T_EP, "modo_verbale", "Può darsi che domani piove.", "piove", "piova",
   "*può darsi che* pide congiuntivo: *piova*. Con *forse*, en cambio, indicativo: *forse domani piove*.")
ch(27, "e", T_EP, "¿Qué quiere decir?", "Non ha voglia di uscire stasera: sarà stanco.",
   ["Debe de estar cansado.", "Mañana va a estar cansado.", "Estaba cansado."],
   "*sarà stanco* no habla del futuro: es una suposición sobre ahora, como «debe de estar cansado» o "
   "«estará cansado».")
tr(27, "e", T_EP, "Puede ser que tenga razón.",
   combo("Può darsi che ", ["", "lui ", "lei ", "Lei "], "abbia ragione.")
   + combo("È possibile che ", ["", "lui ", "lei ", "Lei "], "abbia ragione.")
   + ["Può essere che abbia ragione.", "Forse ha ragione.", "Potrebbe avere ragione.", "Potrebbe aver ragione."],
   "*può darsi che* + congiuntivo: *abbia ragione*. Con *forse* la misma idea va en indicativo: "
   "*forse ha ragione*.")

T_GI = "avverbi di giudizio"
ch(27, "j", T_GI, "Elegí el adverbio: «¡Pero no estoy enojado!»", "Non sono ___ arrabbiato!",
   ["mica", "magari", "appunto"],
   "*mica* refuerza la negación, como «para nada» o un «pero» de protesta: *non sono mica arrabbiato*. "
   "Es oral.")
ch(27, "j", T_GI, "Elegí el adverbio: «Ya es tarde. — Justamente: vámonos.»", "È già tardi. — ___: andiamo!",
   ["Appunto", "Eppure", "Mica"],
   "*appunto* = justamente, eso mismo: toma lo que acaba de decir el otro y lo usa como razón.")
ch(27, "j", T_GI, "Elegí el adverbio: «y sin embargo».", "Ha studiato tanto, ___ non ha passato l'esame.",
   ["eppure", "appunto", "magari"],
   "*eppure* = y sin embargo: lo que pasó contradice lo que esperabas.")
ch(27, "j", T_GI, "¿Qué quiere decir *magari* acá?", "Stasera magari passo da te.",
   ["capaz que", "¡ojalá!", "justamente"],
   "*magari* con indicativo es «capaz que, a lo mejor»: *magari passo* = capaz que paso.")
ch(27, "j", T_GI, "¿Y acá?", "Vinciamo noi domenica? — Magari!",
   ["¡ojalá!", "capaz que", "justamente"],
   "*Magari!* solo, como respuesta, es «¡ojalá!». Con un verbo, «ojalá» pide congiuntivo imperfetto "
   "(*magari fosse vero!*), que llega en la 30.")
ch(27, "j", T_GI, "Escribís un mail formal. ¿Cuál va? «No es para nada cierto.»", "___",
   ["Non è affatto vero.", "Non è mica vero.", "Non è appunto vero."],
   "*mica* es de la charla; en un texto formal, la negación fuerte es *affatto*: *non è affatto vero*.")

li(27, "l", HORA, "Saranno le tre meno un quarto.", ["2:45", "3:15", "3:45"],
   "*le tre meno un quarto* = las tres menos cuarto (2:45). *saranno*: es una suposición, «serán».",
   answer="2:45")
li(27, "l", PRECIO, "Dovrebbe costare sui trecentocinquanta euro.", ["350 €", "250 €", "3.500 €"],
   "*trecentocinquanta* = 350 (*duecento* = 200, *tremila* = 3.000). *sui* = alrededor de.",
   answer="350 €")
li(27, "l", OIDO, "Sinceramente non lo so.", ["Sinceramente non lo so.", "Sicuramente non lo sa."],
   "*sinceramente* (la verdad) y *sicuramente* (seguro) se parecen; escuchá también el final: *so* (yo) "
   "o *sa* (él).")
di(27, "d", "Forse ha perso il treno.",
   "*forse* + indicativo: *ha perso*. *perso* es el participio de *perdere*.")


# ===========================================================================
# 28: una idea, varias formas (causa, concesión, condición)
# ===========================================================================
T_SC = "connettivi"
ty(28, "p", T_SC, "Anche se piove, usciamo. → Benché ___, usciamo.", "piova",
   "*anche se* va con indicativo (*piove*); *benché*, con congiuntivo: *piova*. Dicen lo mismo.")
ty(28, "p", T_SC, "Anche se piove, usciamo. → Nonostante la ___, usciamo.", "pioggia",
   "*nonostante* + sustantivo: *nonostante la pioggia*. Es la forma más corta de la concesión.")
ty(28, "p", T_SC, "Benché sia tardi, restiamo ancora un po'. → ___ è tardi, restiamo ancora un po'.",
   "Anche se",
   "Con indicativo (*è*) la concesión va con *anche se*. *benché* pediría congiuntivo: *benché sia*.",
   alt=["anche se"])
ty(28, "p", T_SC, "Siccome pioveva, siamo rimasti a casa. → Per la ___, siamo rimasti a casa.", "pioggia",
   "La causa con un sustantivo: *per* (o *a causa di*) + sustantivo. *per la pioggia* = por la lluvia.")
ty(28, "p", T_SC, "Lo hanno multato perché aveva parcheggiato in doppia fila. → Lo hanno multato per ___ "
   "parcheggiato in doppia fila.", "aver",
   "Mismo sujeto: la causa pasa a *per* + infinitivo compuesto, *per aver parcheggiato* (por haber "
   "estacionado).", alt=["avere"])
ty(28, "p", T_SC, "Puoi venire se porti qualcosa da bere. → Puoi venire a condizione di ___ qualcosa da bere.",
   "portare",
   "Mismo sujeto: la condición pasa a *a condizione di* + infinitivo. Con otro sujeto, *a condizione che* "
   "+ congiuntivo.")
ty(28, "p", T_SC, "Ti presto la macchina se me la riporti stasera. → Ti presto la macchina a patto che me la "
   "___ stasera.", "riporti",
   "*a patto che* (con tal de que) pide congiuntivo; con *tu*, *riporti* coincide con el indicativo.")
ty(28, "p", T_SC, "Se hai bisogno, chiamami. → In caso di ___, chiamami.", "bisogno",
   "*in caso di* + sustantivo = si hay…: *in caso di bisogno*, *in caso di pioggia*.")
ty(28, "p", T_SC, "Se ci sono problemi, ci avvisi. (mail formal) → Qualora ci ___ problemi, ci avvisi.",
   "siano",
   "*qualora* = si, en un texto formal, y pide congiuntivo: *qualora ci siano problemi* (o, más "
   "hipotético, *ci fossero*).", alt=["fossero"])
ch(28, "p", T_SC, "Elegí el conector: «Aunque llueve, salimos.»", "___ piove, usciamo.",
   ["Anche se", "Benché", "Nonostante"],
   "Con *piove* (indicativo) va *anche se*. *benché* y *nonostante* + verbo piden congiuntivo: "
   "*benché piova*.")
fx(28, "p", T_SC, "modo_verbale", "Benché è tardi, restiamo ancora un po'.", "è", "sia",
   "*benché* pide congiuntivo: *benché sia tardi*. Si querés el indicativo, *anche se è tardi*.")
ch(28, "p", T_SC, "¿Qué relación expresa *pur essendo*?", "Pur essendo stanco, è uscito con noi.",
   ["concesión", "causa", "tiempo"],
   "*pur* + gerundio es una concesión: «aunque estaba cansado». Por ahora alcanza con reconocerlo; "
   "producirlo es de la semana 44.")
ch(28, "p", T_SC, "¿Qué relación expresa *essendo*?", "Essendo tardi, abbiamo preso un taxi.",
   ["causa", "concesión", "condición"],
   "El gerundio al principio suele dar la causa: *essendo tardi* = como era tarde (*siccome era tardi*).")

li(28, "l", PRECIO, "Il biglietto costa diciassette euro e cinquanta.", ["17,50 €", "70,50 €", "7,50 €"],
   "*diciassette* = 17 (*settanta* = 70, *sette* = 7). *e cinquanta* = y cincuenta centavos.",
   answer="17,50 €")
li(28, "l", OIDO, "Dato che sei qui, aiutami.", ["Dato che sei qui, aiutami.", "Anche se sei qui, aiutami."],
   "*dato che* (ya que, como) da la causa: por eso tiene sentido pedir ayuda. *anche se* sería «aunque», que acá no encaja.")
di(28, "d", "Nonostante la pioggia, siamo usciti.",
   "*nonostante* + sustantivo, sin verbo: *nonostante la pioggia*.")


# ===========================================================================
# 29: congiuntivo passato (escucha y la lectura «Il concerto»)
# ===========================================================================
li(29, "l", QUIEN, "Credo che abbiano capito.", [P3, "loro", "noi"],
   "*abbiano* (loro) termina en *-ano*; *abbia* (lui / lei), en *-a*; *abbiamo* (noi), en *-amo*.",
   answer="loro")
li(29, "l", QUIEN, "Spero che siate arrivati bene.", ["voi", "noi", "loro"],
   "*siate* = voi; *siamo* = noi; *siano* = loro. Y el participio en plural: *arrivati*.", answer="voi")
di(29, "d", "Mi dispiace che tu non sia venuto.",
   "*mi dispiace che* + congiuntivo passato: *tu non sia venuto*. *venire* va con *essere*.")
rb(29, "Il concerto",
   "\"Credo che ___ (perdere) il treno\", dice Sara. \"Penso che se ne ___ (dimenticare)\", risponde Paolo. "
   "\"È strano che non ci ___ (scrivere) niente.\"",
   [["abbia perso", "abbia perduto"], ["sia dimenticato"], ["abbia scritto"]],
   "Opinan hoy sobre algo de ayer: congiuntivo passato. *dimenticarsene* es reflexivo, así que va con "
   "*essere*: *se ne sia dimenticato*.")
rb(29, "Il concerto",
   "\"Mi dispiace che ___ (rimanere, voi) ad aspettarmi.\" \"Speriamo che tu ___ (guarire), almeno\", "
   "ha detto Sara.",
   [["siate rimasti", "siate rimaste"], ["sia guarito"]],
   "*rimanere* y *guarire* van con *essere*: el participio concuerda (*rimasti*, *guarito*).")


# ===========================================================================
# 30: come se, escucha y la lectura «Il pianoforte»
# ===========================================================================
T_CS = "come se"
cz(30, "c", T_CS, "Completá con el verbo que pide *come se*.", "Parla come se ___ tutto. (sapere)", "sapesse",
   "*come se* va siempre con congiuntivo: imperfetto si es a la vez (*sapesse*), trapassato si es antes "
   "(*avesse saputo*).")
cz(30, "c", T_CS, "Completá con el verbo que pide *come se*.", "Mi tratta come se ___ un bambino. (essere, io)",
   "fossi", "*come se* + congiuntivo imperfetto: «como si fuera». Con *io*, *fossi*.")
ch(30, "c", T_CS, "Elegí la que va.", "Ha speso tutto come se ___ milionario.", ["fosse", "era", "sarebbe"],
   "Después de *come se* el castellano también pone subjuntivo (como si fuera): *fosse*. Ni indicativo "
   "ni condicional.")
fx(30, "c", T_CS, "modo_verbale", "Fa come se non è successo niente.", "è", "fosse",
   "*come se* pide congiuntivo; algo anterior va en trapassato: *come se non fosse successo niente*.")

li(30, "l", OIDO, "Volevo che venissi anche tu.", ["Volevo che venissi anche tu.", "Volevo che venisse anche lui."],
   "*venissi* (io / tu) termina en *-i*; *venisse* (lui / lei), en *-e*. La última vocal dice la persona.")
li(30, "l", QUIEN, "Pensavo che fossero già partiti.", ["loro", "noi", P3],
   "*fossero* (loro) termina en *-ero*; *fossimo* (noi), en *-imo*; *fosse* (lui / lei), en *-e*.",
   answer="loro")
di(30, "d", "Magari avessi più tempo!",
   "*magari* + congiuntivo imperfetto = ojalá: *magari avessi* (ojalá tuviera).")
rb(30, "Il pianoforte",
   "Da piccola Marta voleva che suo padre la ___ (portare) ogni domenica al mare. Sperava che il sole non "
   "___ (finire) mai e che l'estate ___ (durare) tutto l'anno.",
   [["portasse"], ["finisse"], ["durasse"]],
   "Principal en pasado (*voleva*, *sperava*) y a la vez: congiuntivo imperfetto.")
rb(30, "Il pianoforte",
   "Non immaginava che sua madre ___ (avere) quel sogno e che ci ___ (rinunciare) per la famiglia.",
   [["avesse avuto"], ["avesse rinunciato"]],
   "Principal en pasado y lo anterior a él: congiuntivo trapassato (*avesse* + participio).")


# ===========================================================================
# 31: los tres usos del condizionale passato
# ===========================================================================
T_CP = "condizionale passato"
USOS = ["lo que no pasó", "el futuro visto desde el pasado", "una noticia sin confirmar"]
U = "¿Qué uso del condizionale passato es?"
ch(31, "u", T_CP, U, "Sarei venuto volentieri, ma ero malato.", USOS,
   "Uso 1: lo que habría pasado y no pasó. El *ma* que sigue lo deja claro.")
ch(31, "u", T_CP, U, "Mi ha promesso che mi avrebbe chiamato.", [USOS[1], USOS[0], USOS[2]],
   "Uso 2: desde un pasado (*mi ha promesso*) se mira hacia adelante: *avrebbe chiamato* = llamaría. "
   "El castellano usa el condicional simple.")
ch(31, "u", T_CP, U, "Secondo i giornali, il ministro avrebbe incontrato il presidente in segreto.",
   [USOS[2], USOS[0], USOS[1]],
   "Uso 3, el de la prensa: *avrebbe incontrato* = se habría reunido, según dicen. El diario no lo confirma.")
ch(31, "u", T_CP, U, "Sapevo che avresti capito.", [USOS[1], USOS[0], USOS[2]],
   "Uso 2: *sapevo* está en pasado y *capire* viene después: *avresti capito* = ibas a entender.")
ch(31, "u", T_CP, U, "Avrei dovuto dirtelo prima.", USOS,
   "Uso 1: *avrei dovuto* = debería haber, lo que no hiciste. Es el arrepentimiento.")
ch(31, "u", T_CP, U, "Secondo la polizia, il ladro sarebbe entrato dalla finestra del bagno.", [USOS[2], USOS[0], USOS[1]],
   "Uso 3: la versión que circula, sin confirmar: «el ladrón habría entrado por la ventana».")
tr(31, "u", T_CP, "Dijo que vendría.",
   combo(["Ha detto", "Disse"], " che sarebbe ", ["venuto", "venuta"], ".")
   + combo(["Ha detto", "Disse"], " che veniva."),
   "El futuro visto desde el pasado va en condizionale passato: *sarebbe venuto*. ✗verrebbe es el calco "
   "del «vendría». Hablando también se dice *ha detto che veniva*.")

li(31, "l", OIDO, "Avremmo finito alle sei.", ["Avremmo finito alle sei.", "Avremo finito alle sei."],
   "*avremmo* (doble m) es condicional: «habríamos terminado». *avremo* (una m) es futuro: «habremos "
   "terminado». Escuchá cuánto dura la m.")
li(31, "l", QUIEN, "Sarei venuto, ma pioveva.", ["io", "tu", P3],
   "La terminación dice la persona: *sarei* es io, *saresti* es tu y *sarebbe*, lui o lei. Escuchá el final.", answer="io")
li(31, "l", HORA, "Ha detto che sarebbe arrivato alle venti e quaranta.", ["20:40", "12:40", "20:14"],
   "*venti e quaranta* = 20:40 (*dodici* = 12, *quattordici* = 14).", answer="20:40")
di(31, "d", "Avresti dovuto avvisarmi.",
   "*avresti dovuto* + infinitivo = deberías haber… El pronombre se pega al infinitivo: *avvisarmi*.")
rb(31, "Il treno perso",
   "\"___ (dovere, io) uscire prima\", ha pensato. \"___ (potere, io) prendere la metro.\"",
   [["Sarei dovuto", "Avrei dovuto"], ["Avrei potuto"]],
   "Lo que no hizo: condizionale passato. Con *uscire* el modal toma *essere* (*sarei dovuto*); hoy "
   "también se acepta *avrei dovuto*.")


# ===========================================================================
# 32: credo che fosse (presente + congiuntivo imperfetto)
# ===========================================================================
T_CO = "concordanza"
CI = "Completá con el congiuntivo que va: es una descripción o un hábito del pasado."
cz(32, "c", T_CO, CI, "Credo che da giovane ___ molto timido. (essere)", "fosse",
   "Principal en presente, pero lo que describís es del pasado y duraba (en indicativo sería *era*): "
   "congiuntivo imperfetto, *fosse*.", alt=["sia stato"])
cz(32, "c", T_CO, CI, "Penso che allora i miei nonni ___ a Roma. (vivere)", "vivessero",
   "*allora* (en aquella época): una situación que duraba, como un imperfetto. Por eso *vivessero*, "
   "aunque *penso* esté en presente.", alt=["abbiano vissuto"])
cz(32, "c", T_CO, CI, "Non credo che ieri sera ___ freddo: eravamo tutti in maglietta. (fare)", "facesse",
   "El tiempo que hacía es una descripción: *faceva* → *facesse*. *fare* toma la raíz larga: *facesse*.",
   alt=["abbia fatto"])
tr(32, "c", T_CO, "Creo que la casa era más grande.",
   combo(["Credo", "Penso"], " che la casa fosse più grande.") + ["Mi sembra che la casa fosse più grande."],
   "«era» describe: en congiuntivo, *fosse*. *sia stata* contaría un hecho cerrado, no cómo era.")
fx(32, "c", T_CO, "concordanza", "Credevo che Marco sia già partito.", "sia", "fosse",
   "Principal en pasado (*credevo*) y lo anterior: congiuntivo trapassato, *fosse già partito*.")

li(32, "l", OIDO, "Credevo che fosse partito.", ["Credevo che fosse partito.", "Credo che sia partito."],
   "*credevo* (pasado) arrastra *fosse*; *credo* (presente), *sia*.")
li(32, "l", ANNO, "La lettera è del millenovecentosessantadue.", ["1962", "1972", "1862"],
   "*millenovecento* = 1900 y *sessantadue* = 62 (*settantadue* = 72).", answer="1962")
di(32, "d", "Pensavo che sarebbe stato più facile.",
   "Lo posterior a un pasado: condizionale passato, *sarebbe stato*.")
rb(32, "La lettera del nonno",
   "\"Cara Maria, pensavo che non mi ___ (rispondere) più. Temevo che tuo padre ti ___ (proibire) "
   "di scrivermi.\"",
   [["rispondessi", "avresti risposto"], ["avesse proibito", "proibisse"]],
   "*pensavo* y a la vez: congiuntivo imperfetto (o lo posterior: *avresti risposto*). *temevo* y algo "
   "anterior: trapassato, *avesse proibito*; *proibisse* también vale.")
rb(32, "La lettera del nonno",
   "\"Ti prometto che ___ (trovare) un lavoro. Spero che tu non ___ (cambiare) idea e che mi ___ "
   "(aspettare) ancora un po'.\"",
   [["troverò"], ["abbia cambiato", "cambi"], ["aspetti"]],
   "Principal en presente: lo posterior va en futuro (*troverò*), lo anterior en congiuntivo passato "
   "(*abbia cambiato*) y lo de ahora en presente (*aspetti*).")


# ===========================================================================
# 33: el doble imperfetto, qualora y escucha
# ===========================================================================
T_PI = "periodo ipotetico"
ch(33, "i", T_PI, "Lo vas a escribir en un mail formal. ¿Cómo queda «Se lo sapevo, non venivo»?", "___",
   ["Se l'avessi saputo, non sarei venuto.", "Se lo saprei, non verrei.", "Se lo sapevo, non sarei venuto."],
   "El doble imperfetto es oral. Por escrito, tipo III: *se l'avessi saputo, non sarei venuto*.")
ch(33, "i", T_PI, "Un amigo te dice: «Se me lo dicevi, ti aiutavo.» ¿Qué quiere decir?", "___",
   ["Si me lo hubieras dicho, te habría ayudado.", "Cuando me lo decías, te ayudaba.",
    "Si me lo decís, te ayudo."],
   "Es el doble imperfetto coloquial: una hipótesis sobre el pasado, como el «si me lo decías, te "
   "ayudaba» del habla rioplatense.")
cz(33, "i", T_PI, "Completá con el congiuntivo (registro formal).",
   "Qualora ___ necessario, La contatteremo noi. (essere)", "fosse",
   "*qualora* = si, en un texto formal, siempre con congiuntivo: *fosse* (o *sia*).", alt=["sia"])

li(33, "l", OIDO, "Se avesse tempo, verrebbe.", ["Se avesse tempo, verrebbe.", "Se avessi tempo, verrei."],
   "*avesse / verrebbe* = lui / lei; *avessi / verrei* = io. Las dos partes cambian juntas.")
di(33, "d", "Se fossi in te, non lo farei.",
   "*se fossi in te* = yo que vos: congiuntivo imperfetto con *se*, condizionale en la otra parte.")
rb(33, "Se fossi sindaco",
   "\"Se ___ (essere, io) sindaco, ___ (costruire) un parco giochi in ogni quartiere.\"",
   [["fossi"], ["costruirei"]],
   "Tipo II: congiuntivo imperfetto con *se* y condizionale presente en la otra parte.")
rb(33, "Se fossi sindaco",
   "\"E se ___ (essere, voi) sindaci l'anno scorso, che cosa ___ (cambiare)?\"",
   [["foste stati", "foste state"], ["avreste cambiato"]],
   "Tipo III (*l'anno scorso*): congiuntivo trapassato y condizionale passato.")


# ===========================================================================
# 34: dove, relativas con congiuntivo y con da + infinitivo
# ===========================================================================
T_RE = "relativi"
cz(34, "r", T_RE, "Completá con un relativo de lugar.", "La città ___ sono nato è piccola.", "dove",
   "Para lugares, *dove* = *in cui*: *la città dove sono nato*, *la città in cui sono nato*.",
   alt=["in cui", "nella quale"])
ch(34, "r", T_RE, "Elegí la que va en un aviso escrito: todavía la estás buscando.", "Cerco una persona che ___ il tedesco.",
   ["sappia", "sa", "saprebbe"],
   "Lo que se busca y no se sabe si existe va en congiuntivo, como en castellano: «que sepa» = *che sappia*. "
   "Hablando se oye también *che sa*; por escrito, congiuntivo.")
ch(34, "r", T_RE, "Elegí la que va: ya lo encontraste.", "Ho trovato un appartamento che ___ un balcone enorme.",
   ["ha", "abbia", "avrebbe"],
   "El departamento ya existe y lo encontraste: indicativo, *ha*. El congiuntivo diría que todavía lo buscás.")
cz(34, "r", T_RE, "Completá con el congiuntivo passato.", "È il libro più bello che io ___ mai ___. (leggere)",
   "abbia | letto",
   "Después de un superlativo, la relativa va en congiuntivo: *il più bello che io abbia mai letto*.")
cz(34, "r", T_RE, "Completá con la preposición.", "Non ho niente ___ dire.", "da",
   "*niente, qualcosa, molto* + infinitivo llevan *da*: *niente da dire* (nada que decir).")
tr(34, "r", T_RE, "Tengo una casa para alquilar.",
   ["Ho una casa da affittare.", "Io ho una casa da affittare.", "Ho una casa da dare in affitto."],
   "*da* + infinitivo = para, que hay que: *una casa da affittare*, *un libro da leggere*.")
fx(34, "r", T_RE, "preposizione", "Non c'è niente che fare.", "che", "da",
   "Después de *niente* el infinitivo va con *da*: *niente da fare*. ✗niente che fare es el calco de "
   "«nada que hacer».")

li(34, "l", OIDO, "Non so a chi scrivere.", ["Non so a chi scrivere.", "È la persona a cui scrivo."],
   "*chi* (quién) no tiene antecedente: *non so a chi*. *cui* va después de una preposición y de un "
   "antecedente: *la persona a cui*.")
di(34, "d", "È il film più bello che abbia mai visto.",
   "Superlativo + relativa en congiuntivo passato: *che abbia mai visto*.")
cz(34, "r", T_RE, "Es la lectura de la semana («La mia libreria»): completá con el relativo que va.",
   "C'è una libreria ___ passo ore intere. È in una piccola via ___ pochi conoscono, vicino a un ponte "
   "___ vedo il fiume.",
   "in cui | che | da cui",
   "*passare ore in*: *in cui* (o *dove*). *conoscere la via*, sin preposición: *che*. Ves el río desde el "
   "puente: *da cui*.",
   alt=["dove | che | da cui", "nella quale | che | da cui", "in cui | che | dal quale",
        "dove | che | dal quale", "nella quale | che | dal quale"])


# ===========================================================================
# 35: pasiva (escucha y la lectura del parmigiano)
# ===========================================================================
li(35, "l", OIDO, "Le case sono state vendute.", ["Le case sono state vendute.", "La casa è stata venduta."],
   "En la pasiva todo concuerda con el sujeto: *le case sono state vendute* (plural, femenino).")
li(35, "l", OIDO, "I pacchi vengono spediti domani.", ["I pacchi vengono spediti domani.",
                                                       "Il pacco viene spedito domani."],
   "*vengono* (plural) / *viene* (singular): con *venire* la pasiva habla de una acción.")
li(35, "l", PRECIO, "La villa è stata venduta per due milioni e mezzo.",
   ["2.500.000 €", "2.000.500 €", "250.000 €"],
   "*due milioni e mezzo*: dos millones y medio, con *milioni* en plural. Para 250.000 se diría *duecentocinquantamila*.",
   answer="2.500.000 €")
di(35, "d", "Il modulo va compilato entro venerdì.",
   "*andare* + participio = tiene que: *va compilato* (tiene que llenarse).")
rb(35, "Com'è fatto il parmigiano",
   "Le forme ___ (sistemare) su lunghi scaffali, dove ___ (girare) e controllate regolarmente.",
   [["sono sistemate", "vengono sistemate"], ["vengono girate", "sono girate"]],
   "Pasiva en presente, concordada con *le forme*: *sono sistemate*, *vengono girate*. *venire* subraya "
   "la acción que se repite; *essere* también vale.",
   prompt="Racconto a buchi: es la lectura de la semana («%s»). Pasá cada verbo a la pasiva en presente.")


# ===========================================================================
# 36: si passivante e impersonale (escucha y la lectura)
# ===========================================================================
li(36, "l", OIDO, "Si vendono case.", ["Si vendono case.", "Si vende casa."],
   "*si vendono* (plural) va con *case*; *si vende*, con *casa*. El verbo concuerda con lo que se vende.")
li(36, "l", OIDO, "Ci si è alzati presto.", ["Ci si è alzati presto.", "Ci si alza presto."],
   "*ci si è alzati*: pasado, con *essere* y el participio en plural. *ci si alza*: presente.")
di(36, "d", "In Italia il cappuccino si beve solo la mattina.",
   "*si beve*: si passivante en singular, porque *il cappuccino* es singular.")
SI = "Racconto a buchi: es la lectura de la semana («%s»). Completá con el si y el verbo en presente."
rb(36, "In Italia si fa così",
   "In Italia, a tavola, ___ (seguire) alcune regole. Il cappuccino ___ (bere) solo la mattina.",
   [["si seguono"], ["si beve"]],
   "Si passivante: el verbo concuerda con lo que sigue o precede (*alcune regole* → *si seguono*; "
   "*il cappuccino* → *si beve*).", prompt=SI)
rb(36, "In Italia si fa così",
   "La pasta non ___ (tagliare) con il coltello e sugli spaghetti al pesce non ___ (mettere) il parmigiano.",
   [["si taglia"], ["si mette"]],
   "*la pasta*, *il parmigiano*: singulares, así que *si taglia*, *si mette*. El *non* va antes del *si*.",
   prompt=SI)


# ===========================================================================
# 37: narrar con remoto e imperfetto
# ===========================================================================
T_NA = "passato remoto"
RI = "Elegí: ¿la acción que avanza (remoto) o el fondo (imperfetto)?"
ch(37, "n", T_NA, RI, "Mentre Cola ___, il re gettò la coppa.", ["nuotava", "nuotò", "ha nuotato"],
   "*mentre* abre el fondo, lo que estaba pasando: imperfetto, *nuotava*. La acción que lo corta va en "
   "remoto: *gettò*.")
ch(37, "n", T_NA, RI, "Un giorno il re ___ una coppa d'oro in mare.", ["gettò", "gettava", "gettavano"],
   "*un giorno* abre un hecho puntual: remoto, *gettò*. *gettava* sería una costumbre o un fondo, "
   "y *gettavano* no concuerda con *il re*.")
ch(37, "n", T_NA, RI, "Ogni mattina il vecchio ___ al porto a guardare le barche.",
   ["andava", "andò", "è andato"],
   "*ogni mattina* = costumbre: imperfetto, *andava*, como «iba» en castellano.")
ch(37, "n", T_NA, RI, "All'improvviso qualcuno ___ alla porta.", ["bussò", "bussava", "bussarono"],
   "*all'improvviso* (de repente) marca un hecho puntual: remoto, *bussò*. *bussarono* no concuerda con "
   "*qualcuno*, que es singular.")
cz(37, "n", T_NA, "Completá con imperfetto o passato remoto.",
   "Quella notte ___ freddo e per strada non c'era nessuno. Verso mezzanotte ___ un cavaliere. "
   "(fare, arrivare)",
   "faceva | arrivò",
   "El tiempo que hacía es fondo: *faceva*. *verso mezzanotte* abre un hecho: *arrivò*.")
cz(37, "n", T_NA, "Completá con imperfetto o passato remoto.",
   "Dante ___ a Firenze nel 1265, quando la città ___ ricca e potente. (nascere, essere)",
   "nacque | era",
   "Nacer es un hecho: *nacque*. Cómo era la ciudad es descripción: *era*.")
ty(37, "n", T_NA, "Quando ero piccolo, mio nonno ha comprato una barca. → Quando ero piccolo, mio nonno ___ "
   "una barca.", "comprò",
   "Al pasar el relato al remoto, cambian los hechos (*ha comprato* → *comprò*); el imperfetto "
   "(*ero*) queda igual.", prompt="Pasá el relato al passato remoto: el imperfetto queda como está.")
ty(37, "n", T_NA, "Il mare era calmo e i pescatori sono partiti all'alba. → Il mare era calmo e i pescatori "
   "___ all'alba.", "partirono",
   "*sono partiti* → *partirono*: en el remoto no hay auxiliar. *era calmo* es fondo y no cambia.",
   prompt="Pasá el relato al passato remoto: el imperfetto queda como está.")
ty(37, "n", T_NA, "Mentre leggeva, ha sentito un rumore e si è alzato. → Mentre leggeva, ___ un rumore e "
   "___.", "sentì | si alzò",
   "Los hechos pasan al remoto (*sentì*, *si alzò*); el reflexivo deja el *si* delante. *leggeva* es "
   "el fondo.", prompt="Pasá el relato al passato remoto: el imperfetto queda como está.")
ty(37, "n", T_NA, "Dopo aver finito il lavoro, uscì. → Appena ___ il lavoro, uscì.", "ebbe finito",
   "Con *appena* y la principal en remoto, lo anterior va en trapassato remoto: *ebbe finito*. "
   "Hoy también se lee *appena finì*.", alt=["finì"],
   prompt="Reescribí con el trapassato remoto, sin cambiar el sentido: escribí solo lo que falta.")
fx(37, "n", T_NA, "tempo_verbale", "Mentre il re parlò, Cola guardava il mare.", "parlò", "parlava",
   "*mentre* + lo que estaba pasando: imperfetto, *parlava*. El remoto no sirve de fondo.")
fx(37, "n", T_NA, "tempo_verbale", "Un giorno, mentre camminava sulla spiaggia, trovava una bottiglia.",
   "trovava", "trovò",
   "*un giorno* y un hallazgo puntual: remoto, *trovò*. *camminava* es el fondo y queda.")

li(37, "l", OIDO, "Parlò a lungo.", ["Parlò a lungo.", "Parlo a lungo."],
   "*parlò* (habló) lleva el golpe al final; *parlo* (hablo), en la primera sílaba. El acento escrito "
   "marca justamente eso.")
li(37, "l", QUIEN, "Vennero in tanti alla festa.", ["loro", P3, "noi"],
   "*vennero* (loro) termina en *-ero*; *venne* (lui / lei), en *-e*; *venimmo* (noi), en *-immo*.",
   answer="loro")
li(37, "l", OIDO, "Parlavano di lui.", ["Parlavano di lui.", "Parlarono di lui."],
   "*parlavano* (imperfetto: hablaban) lleva *-va-*; *parlarono* (remoto: hablaron), *-ro-*.")
li(37, "l", ANNO, "Garibaldi partì da Quarto nel milleottocentosessanta.", ["1860", "1816", "1960"],
   "*milleottocento* = 1800 y *sessanta* = 60 (*sedici* = 16).", answer="1860")
di(37, "d", "Un giorno il re volle metterlo alla prova.",
   "*volle*: remoto de *volere*, con doble l. *metterlo*: el pronombre pegado al infinitivo.")
RR = ("Racconto a buchi: es la lectura de la semana («%s»). Poné cada verbo en passato remoto o en "
      "imperfetto, según cuente la acción o el fondo.")
rb(37, "La leggenda di Colapesce",
   "Tanto tempo fa, a Messina, ___ (vivere) un ragazzo che si ___ (chiamare) Cola. ___ (passare) le "
   "giornate in mare e ___ (nuotare) come un pesce.",
   [["visse", "viveva"], ["chiamava"], ["Passava"], ["nuotava"]],
   "El comienzo presenta al personaje y su costumbre: *si chiamava*, *passava*, *nuotava* (fondo). "
   "*visse* lo pone en escena como un hecho; *viveva* también se lee.", prompt=RR)
rb(37, "La leggenda di Colapesce",
   "Un giorno il re ___ (volere) metterlo alla prova. [...] Alla fine il re ___ (lanciare) un anello nel "
   "punto più profondo.",
   [["volle"], ["lanciò"]],
   "*un giorno*, *alla fine*: los hechos que hacen avanzar la historia van en remoto.", prompt=RR)
rb(37, "La leggenda di Colapesce",
   "Cola ___ (scoprire) che una delle colonne ___ (essere) rotta. ___ (decidere) di restare sotto il "
   "mare, e da quel giorno nessuno lo ___ (vedere) più.",
   [["scoprì"], ["era"], ["Decise"], ["vide"]],
   "Lo que hace Cola va en remoto (*scoprì*, *decise*, *vide*); cómo estaba la columna es descripción, "
   "en imperfetto: *era*.", prompt=RR)


# ===========================================================================
# 38: reconocer el gerundio; escucha y la lectura «La telefonata di Anna»
# ===========================================================================
T_GE = "gerundio"
REL = ["tiempo", "causa", "concesión", "modo"]
G = "¿Qué relación expresa el gerundio?"
ch(38, "g", T_GE, G, "Tornando a casa, ho incontrato Marco.", REL,
   "*tornando* = cuando volvía: tiempo. El sujeto es el mismo de la principal (yo volvía, yo lo encontré).")
ch(38, "g", T_GE, G, "Non avendo la macchina, siamo venuti in treno.", ["causa", "tiempo", "concesión", "modo"],
   "*non avendo la macchina* = como no teníamos auto: causa. Equivale a *siccome non avevamo la macchina*.")
ch(38, "g", T_GE, G, "Pur avendo studiato molto, non ha passato l'esame.", ["concesión", "causa", "tiempo", "modo"],
   "*pur* delante del gerundio lo vuelve concesión: aunque había estudiado mucho.")
ch(38, "g", T_GE, G, "Ha imparato a cucinare guardando sua nonna.", ["modo", "tiempo", "causa", "concesión"],
   "Después del verbo, el gerundio suele decir cómo: aprendió mirando a su abuela.")
ch(38, "g", T_GE, G, "Avendo perso il treno, è arrivata in ritardo.", ["causa", "tiempo", "concesión", "modo"],
   "*avendo perso* (gerundio compuesto) = como había perdido el tren: causa, y anterior a la principal.")
ch(38, "g", T_GE, G, "Uscendo dal cinema, ho visto che pioveva.", REL,
   "*uscendo* = al salir, cuando salía: tiempo.")
ch(38, "g", T_GE, "¿Cuál dice lo mismo?", "Pur essendo stanca, è uscita.",
   ["Anche se era stanca, è uscita.", "Siccome era stanca, è uscita.", "Quando era stanca, è uscita."],
   "*pur essendo* = aunque era: es *anche se* (o *benché fosse*), no *siccome*.")

li(38, "l", OIDO, "Mi ha chiesto se venivo.", ["Mi ha chiesto se venivo.", "Mi ha chiesto di venire."],
   "*se venivo* reporta una pregunta (¿venís?); *di venire*, un pedido (¡vení!).")
li(38, "l", OIDO, "Ha detto che sarebbe venuto.", ["Ha detto che sarebbe venuto.", "Ha detto che verrà."],
   "Las dos se dicen: *sarebbe venuto* es el futuro visto desde el pasado (dijo que vendría); *verrà* lo "
   "sigue dando por futuro hoy.")
di(38, "d", "Mi ha detto di non dirlo a nessuno.",
   "Una orden negativa en indirecto: *di non* + infinitivo. *dirlo*: pronombre pegado.")
INDI = ("Racconto a buchi: es la lectura de la semana («%s»). Poné cada verbo como lo cuenta el discurso "
        "indirecto.")
rb(38, "La telefonata di Anna",
   "Mi ha detto che ___ (trovare) un nuovo lavoro a Milano e che ___ (partire) la settimana dopo.",
   [["aveva trovato"], ["sarebbe partita", "partiva"]],
   "Lo anterior al momento en que habló: trapassato (*aveva trovato*). Lo posterior: condizionale passato "
   "(*sarebbe partita*, concuerda con Anna); hablando, también *partiva*.", prompt=INDI)
rb(38, "La telefonata di Anna",
   "Mi ha chiesto se ___ (potere, io) aiutarla con il trasloco.",
   [["potevo", "potessi"]],
   "Pregunta indirecta en el pasado: *se potevo* (al hablar) o *se potessi* (registro cuidado).",
   prompt=INDI)


# ===========================================================================
# 39: ítems propios para el repaso del jefe (remoto, indirecto, si, relativos)
# ===========================================================================
T_RIP = "ripasso"
rb(39, "Il nonno emigrante",
   "Mio nonno ___ (partire) per l'Argentina nel 1951. ___ (avere) vent'anni e non ___ (parlare) una "
   "parola di spagnolo.",
   [["partì"], ["Aveva"], ["parlava"]],
   "El hecho, en remoto (*partì*); la edad y lo que no sabía, en imperfetto (*aveva*, *parlava*).", prompt=RR)
ty(39, "x", T_RIP, "«Domani vengo qui.» → Disse che il giorno dopo ___ lì.", "sarebbe andato",
   "Futuro → condizionale passato, y el punto de vista cambia: *venire qui* pasa a *andare lì*.",
   alt=["sarebbe venuto", "sarebbe andata", "sarebbe venuta"], prompt="Pasá al discurso indirecto: escribí solo lo que falta.")
cz(39, "x", T_RIP, "Completá con el si y el verbo en presente.",
   "In questo ristorante ___ bene e ___ poco. (mangiare, spendere)", "si mangia | si spende",
   "Si impersonale sin objeto: verbo en singular, *si mangia*, *si spende*.")
cz(39, "x", T_RIP, "Completá con el si y el verbo en presente.",
   "Al mercato ___ prodotti di stagione. (vendere)", "si vendono",
   "Si passivante: el verbo concuerda con lo que se vende, *prodotti* (plural): *si vendono*.")
cz(39, "x", T_RIP, "Completá con el relativo.", "Il collega ___ ti ho parlato arriva domani.", "di cui",
   "*parlare di qualcuno*: la preposición pasa delante del relativo, *di cui*.", alt=["del quale"])
ch(39, "x", T_RIP, "Elegí el relativo: «cuya casa».", "Mia nonna, ___ casa era in centro, vendeva fiori.",
   ["la cui", "che", "di cui"],
   "«cuya» = *il / la cui*, y el artículo concuerda con lo poseído: *la cui casa*.")
ty(39, "x", T_RIP, "I romani hanno costruito questo ponte. → Questo ponte ___ dai romani.", "è stato costruito",
   "Pasiva con el mismo tiempo: *hanno costruito* → *è stato costruito*. El agente va con *da*: *dai "
   "romani*.", prompt="Pasá de activa a pasiva sin cambiar el tiempo: escribí solo lo que falta.")
cz(39, "x", T_RIP, "Completá con la pasiva que expresa obligación.",
   "Questo modulo ___ entro venerdì: è obbligatorio. (compilare)", "va compilato",
   "*andare* + participio = tiene que: *va compilato* (como *deve essere compilato*).",
   alt=["deve essere compilato"])
fx(39, "x", T_RIP, "concordanza", "Credevo che tu eri già partito.", "eri", "fossi",
   "*credevo che* pide congiuntivo: lo anterior a un pasado, trapassato, *fossi già partito*.")
fx(39, "x", T_RIP, "periodo_ipotetico", "Se avrei saputo, sarei venuto.", "avrei", "avessi",
   "En la parte del *se* de una hipótesis no va el condicional: sobre el pasado, congiuntivo trapassato, "
   "*se avessi saputo*.")
fx(39, "x", T_RIP, "discorso_indiretto", "Ieri Luca mi ha chiesto dove vai.", "vai", "andavo",
   "En indirecto con el verbo en pasado, *vai* baja a *andavo* (o *andassi*, más cuidado), y la persona "
   "cambia: ahora es *io*.", alt=["Ieri Luca mi ha chiesto dove andassi."])
ch(39, "x", T_RIP, "Elegí la que va.", "Mentre ___ la cena, arrivò Luca.",
   ["preparavamo", "preparammo", "abbiamo preparato"],
   "*mentre* + lo que estaba pasando: imperfetto. La acción que interrumpe, en remoto: *arrivò*.")
ch(39, "x", T_RIP, "Elegí el conector.", "___ fosse stanco, continuò a lavorare.",
   ["Benché", "Anche se", "Siccome"],
   "Con congiuntivo (*fosse*) va *benché*. *anche se* + congiuntivo sería una hipótesis (aunque estuviera), "
   "y *siccome* da una causa.")
li(39, "l", QUIEN, "Arrivai tardi alla stazione.", ["io", P3, "loro"],
   "*arrivai* (io) termina en *-ai*; *arrivò* (lui / lei), en *-ò*; *arrivarono* (loro), en *-arono*.",
   answer="io")
di(39, "d", "Se non fosse partito, avrebbe fatto il contadino.",
   "Tipo III: congiuntivo trapassato con *se* (*fosse partito*) y condizionale passato.")


# ===========================================================================
# Pragmática (31 y 36): lo breve, el registro y una sola palabra
# ===========================================================================
pr(31, "En la recepción del hotel: tu habitación da a la calle y querés otra.",
   "Vorrei cambiare camera: questa è troppo rumorosa.",
   ["Esigo di cambiare camera: questa è troppo rumorosa.",
    "Voglio cambiare camera: questa è troppo rumorosa."],
   "Cambia una sola palabra. *vorrei* pide con cortesía; *esigo* (exijo) es para cuando ya pediste y no "
   "te hicieron caso; *voglio* suena a capricho.")
pr(31, "Tu mejor amigo llega al bar, tarde otra vez; lo esperabas y se lo querés marcar con humor.",
   "Oh, finalmente! Ti aspetto da mezz'ora.",
   ["Mi scusi, ma La aspetto da mezz'ora.", "Sei sempre in ritardo, non ti sopporto!"],
   "Entre amigos alcanza con una broma corta. *Mi scusi… La aspetto* es el *Lei* de un desconocido: "
   "con un amigo suena frío. La tercera es una pelea.")
pr(31, "Le escribís al dueño del departamento que alquilás (se tratan de usted): se rompió la caldera.",
   "Buongiorno, Le scrivo perché la caldaia si è rotta.",
   ["Ciao, ti scrivo perché la caldaia si è rotta.", "Buongiorno, la caldaia è rotta: venga subito."],
   "Decide el registro: con el dueño, *Lei* (*Le scrivo*). *Ciao, ti scrivo* es de amigos; *venga "
   "subito* es una orden.")
pr(36, "Cena entre amigos: alguien cuenta por quinta vez la misma anécdota y querés cortarlo con humor.",
   "Dai, basta, la sappiamo a memoria!",
   ["Scusa, potresti forse cambiare argomento?", "Stai zitto, sei proprio noioso!"],
   "Entre amigos, lo breve y con humor es lo natural. El pedido formal suena a reproche frío; el "
   "*stai zitto* ofende.")
pr(36, "En una reunión con un cliente al que no conocés: querés interrumpirlo un momento.",
   "Mi scusi se La interrompo un attimo.",
   ["Scusa se ti interrompo un attimo.", "Aspetta, fammi parlare un attimo."],
   "Decide *tu / Lei*: con un cliente, *mi scusi se La interrompo*. *Scusa se ti* es para un compañero; "
   "*aspetta, fammi parlare* corta de golpe.")
pr(36, "En el colectivo, le pisás el pie a un señor mayor que no conocés.",
   "Oh, mi scusi!", ["Oh, scusa!", "Oh, scusami!"],
   "Con un desconocido mayor, *mi scusi* (Lei). *scusa* y *scusami* son con tu: a un chico de tu edad, "
   "sí.")
pr(36, "En el chat del equipo (se tutean): no estás de acuerdo con la propuesta de un compañero.",
   "Non sono del tutto d'accordo: possiamo parlarne?",
   ["Non sono d'accordo per niente: è un'idea assurda.", "Scusate, forse sbaglio io, ma non so... forse..."],
   "*non del tutto* + una propuesta abre la charla. *assurda* ataca la idea; el tercero se disculpa "
   "tanto que no dice nada.")
