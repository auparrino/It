# -*- coding: utf-8 -*-
"""Auditoría de gramática 2026-10, área 2 (sustantivo y pronombre).

Lo que la auditoría marcó como «mejorable»: producción en la semana donde se
enseña y vuelta espaciada 2-4 semanas después, mezclado con lo que compite.

1. Partitivo (del, dello, dell', dei, degli, delle): bloque de repaso en la 9;
   vuelve en la 11, 12 y 14 mezclado con qualche, alcuni, un po' di y la
   negación (duelo «qualche o alcuni» desde la 3).
2. Posesivos idiomáticos (i miei, a casa mia, dalla tua parte, dire la sua,
   un mio amico): bloque en la 17; vuelven en la 20, 22 y 24.
3. Comparativo di o che y migliore / meglio: repaso en la 27, 28 y 30 (duelo
   «di o che» desde la 23).
4. Superlativo con stra-, super-, arci- y la repetición (piano piano): «more»
   de la 23 y reconocimiento en la 23 y la 27.
5. Relativos che / cui adelantados a la 17 (A2); vuelven en la 20, 23 y 27, y
   en la 38, 42 y 48 (el duelo «che o cui» abre en la 17).
6. chi (verbo en singular, también objeto), quanto = todo lo que, e il
   quale de registro: 34 y 49.

Prefijo de los ids: gr2-<semana>-<tema>-<n>.
"""
import re
from itertools import product

TR = "Traducí al italiano."
FX = "Trova l'errore: tocá la palabra que está mal y corregila."
CH = "¿Cuál está bien?"
QQ = "¿Qué quiere decir?"

LEVEL = {}
for _w in range(1, 53):
    LEVEL[_w] = "A1" if _w <= 6 else "A2" if _w <= 18 else "B1" if _w <= 28 else "B2" if _w <= 39 else "C1"

ITEMS = []
_N = {}


def _combo(*parts):
    """Todas las combinaciones de las piezas: las variantes igual de válidas."""
    return ["".join(c) for c in product(*[p if isinstance(p, list) else [p] for p in parts])]


def _add(w, tag, typ, topic, prompt, stem, answer, note, alt=None, **extra):
    _N[(w, tag)] = _N.get((w, tag), 0) + 1
    seen, clean = set(), []
    for a in alt or []:
        k = a.rstrip(".?!")
        if a and k != answer.rstrip(".?!") and k not in seen:
            seen.add(k)
            clean.append(a)
    d = dict(id="gr2-%d-%s-%02d" % (w, tag, _N[(w, tag)]), w=w, level=LEVEL[w], type=typ,
             topic=topic, prompt=prompt, stem=stem, answer=answer, note=note)
    if clean:
        d["alt"] = clean
    d.update(extra)
    ITEMS.append(d)
    return d


def tr(w, tag, topic, stem, variants, note, prompt=TR):
    """translate: la primera variante es la respuesta; el resto, alt."""
    return _add(w, tag, "translate", topic, prompt, stem, variants[0], note, variants[1:])


def fx(w, tag, topic, cat, stem, bad, good, note, good_alt=None, prompt=FX):
    pat = r"(?<!\w)" + re.escape(bad) + r"(?!\w)"
    assert len(re.findall(pat, stem)) == 1, (stem, bad)
    swap = lambda g: re.sub(pat, lambda m: g, stem, count=1)  # noqa: E731
    d = _add(w, tag, "fixerr", topic, prompt, stem, swap(good), note,
             [swap(g) for g in good_alt or []], cat=cat, bad=bad, good=good)
    if good_alt:
        d["goodAlt"] = list(good_alt)
    return d


def ch(w, tag, topic, stem, options, answer, note, prompt=CH):
    assert answer in options and len(set(options)) == len(options), stem
    return _add(w, tag, "choice", topic, prompt, stem, answer, note, options=options)


def cz(w, tag, topic, prompt, stem, answer, note, alt=None):
    return _add(w, tag, "cloze", topic, prompt, stem, answer, note, alt)


# ===========================================================================
# 1. Partitivo (lección 3; repaso en la 9)
# ===========================================================================
PA = "partitivo"
PA_P = "Completá con el partitivo (di + artículo)."
PA_N = ("El partitivo es *di* + el artículo que pide el sustantivo: *il pane* → *del pane*, "
        "*lo zucchero* → *dello zucchero*, *gli amici* → *degli amici*, *le uova* → *delle uova*.")

cz(9, "pa", PA, PA_P, "Al mercato compro ___ uova.", "delle",
   "*uova* es femenino plural (*le uova*), así que *delle*. El castellano no pone nada («compro "
   "huevos»); el italiano lo suele marcar. " + PA_N)
cz(9, "pa", PA, PA_P, "In classe ci sono ___ studenti nuovi.", "degli",
   "*studente* empieza con s + consonante: *lo studente*, *gli studenti*, y entonces *degli*. "
   "✗ «dei studenti».")
cz(9, "pa", PA, PA_P, "Vuoi ___ acqua?", "dell'",
   "*l'acqua* → *dell'acqua*, con apóstrofo como el artículo. «¿Querés agua?» no lleva nada en "
   "castellano; en italiano es natural *vuoi dell'acqua?* o *un po' d'acqua?*", ["dell’"])
cz(9, "pa", PA, PA_P, "Metto sempre ___ zucchero nel caffè.", "dello",
   "*lo zucchero* → *dello zucchero*. Es incontable: va en singular, como *del pane*, *del latte*.")
tr(9, "pa", PA, "Hay unos chicos en el parque.",
   _combo(["Ci sono dei ragazzi ", "Ci sono alcuni ragazzi "], ["nel parco", "al parco"], ["", "."]) +
   _combo(["Nel parco", "Al parco"], [" ci sono dei ragazzi", " ci sono alcuni ragazzi"], ["", "."]),
   "«Unos» = *dei* (o *alcuni*): *i ragazzi* → *dei ragazzi*. ✗ «uni ragazzi»: el indeterminado "
   "italiano no tiene plural, el plural es el partitivo.")
tr(9, "pa", PA, "¿Querés agua?",
   ["Vuoi dell'acqua?", "Vuoi un po' d'acqua?", "Vuoi un po' di acqua?", "Vuoi acqua?"],
   "Lo más natural es *vuoi dell'acqua?* o *un po' d'acqua?*: el partitivo dice «algo de». "
   "*Vuoi l'acqua?* sería «¿querés EL agua?» (una ya nombrada).")
fx(9, "pa", PA, "articolo", "Compro sempre dei pane fresco.", "dei", "del",
   "*pane* es singular (*il pane*): *del pane*. *dei* es plural: *dei panini*. Que en castellano "
   "no se diga nada no quiere decir que cualquier forma sirva.")
fx(9, "pa", PA, "articolo", "Ho dei amici a Roma.", "dei", "degli",
   "*amici* empieza con vocal: *gli amici*, entonces *degli amici*. ✗ «dei amici», como ✗ «i amici».",
   ["alcuni"])

# --- vuelve en la 11, 12 y 14, mezclado con qualche / alcuni / un po' / negación ---
tr(11, "pa", PA, "Ayer compré unos libros.",
   _combo("Ieri ho comprato ", ["dei libri", "alcuni libri", "qualche libro"], ["", "."]),
   "«Unos libros»: *dei libri* o *alcuni libri*. También *qualche libro*, pero con *qualche* el "
   "sustantivo va en SINGULAR. ✗ «qualche libri».")
fx(11, "pa", PA, "articolo", "Ho comprato dei pane e del latte.", "dei", "del",
   "*pane* y *latte* son incontables y singulares: *del pane*, *del latte*. *dei* va con plurales: "
   "*dei panini*.")
cz(12, "pa", PA, PA_P, "In farmacia ho preso ___ sciroppo per la tosse.", "dello",
   "*lo sciroppo* (s + consonante) → *dello sciroppo*. Igual que *lo zucchero* → *dello zucchero*.")
tr(12, "pa", PA, "No tengo pan.",
   ["Non ho pane", "Non ho pane.", "Io non ho pane", "Non c'è pane", "Non c'è pane.", "Non ho più pane",
    "Non c'è più pane"],
   "En negativo el partitivo se cae: *non ho pane*. Afirmativo, *ho del pane*; negativo, nada. "
   "(Con plurales igual: *non ho amici*.)")
ch(14, "pa", PA, "Quest'estate ho letto ___ libro molto bello.", ["qualche", "alcuni", "dei"], "qualche",
   "*libro* está en singular: solo *qualche* va con singular (= algunos). *alcuni* y *dei* piden "
   "plural: *alcuni libri*, *dei libri*.")
tr(14, "pa", PA, "Hay unas chicas en la puerta.",
   _combo("Ci sono ", ["delle", "alcune"], " ragazze ", ["alla porta", "davanti alla porta"], ["", "."]),
   "«Unas» = *delle* o *alcune* (*le ragazze* → *delle ragazze*). ✗ «une ragazze»: no existe.")
fx(14, "pa", PA, "preposizione", "Ho bisogno di del latte per la torta.", "di del", "di",
   "Después de *di* el partitivo no se suma: *ho bisogno di latte*. Nunca «di del». (*Ho bisogno "
   "del latte* también está bien si es ESA leche, la que ya está en la heladera.)",
   ["del"])


# ===========================================================================
# 2. Posesivos idiomáticos (bloque nuevo en la 17)
# ===========================================================================
PO = "possessivi idiomatici"

tr(17, "po", PO, "Mis viejos viven en Córdoba.",
   _combo(["I miei", "I miei genitori"], " vivono a Córdoba", ["", "."]) +
   _combo(["I miei", "I miei genitori"], " abitano a Córdoba", ["", "."]),
   "*I miei* solo, sin un sustantivo del que se venga hablando, son los padres: «mis viejos». Lleva artículo porque es plural. "
   "Igual *i tuoi*, *i suoi*.")
tr(17, "po", PO, "Estoy de tu lado.",
   ["Sono dalla tua parte", "Sono dalla tua parte.", "Io sono dalla tua parte", "Sto dalla tua parte"],
   "«Estar del lado de alguien» = *essere / stare dalla parte di qualcuno*: *sono dalla tua parte*. "
   "✗ «al tuo lato»: *lato* es el costado de una cosa.")
tr(17, "po", PO, "¿Vamos a mi casa?",
   ["Andiamo a casa mia?", "Andiamo da me?"],
   "Con *casa* el posesivo va detrás y sin artículo: *a casa mia*, *a casa tua* (o *da me*). «Alla mia casa» es el calco del castellano.")
fx(17, "po", PO, "articolo", "Stasera la festa è alla mia casa.", "alla mia casa", "a casa mia",
   "Con *casa*, la frase fija es *a casa mia / tua / sua*, sin artículo y con el posesivo detrás. "
   "También *da me*.", ["da me"])
cz(17, "po", PO, "Completá con la frase fija.", "In riunione ognuno ha detto ___: è stato un caos.", "la sua",
   "*Dire la sua* = dar la propia opinión (se sobreentiende *opinione*, femenino). Con *ognuno*, *la sua*.")
tr(17, "po", PO, "Te presento a un amigo mío.",
   ["Ti presento un mio amico", "Ti presento un mio amico.", "Ti presento un amico mio",
    "Ti presento un amico mio."],
   "«Un amigo mío» = *un mio amico* (también *un amico mio*): con *un* el posesivo va sin artículo. "
   "Y sin la «a» del castellano: *presentare qualcuno*.")
ch(17, "po", PO, "«Domenica pranzo dai miei.»",
   ["El domingo almuerzo en lo de mis padres.", "El domingo almuerzo con mis amigos.",
    "El domingo almuerzo en mi casa."],
   "El domingo almuerzo en lo de mis padres.",
   "*Da* + persona es «en lo de»: *dai miei*, en lo de mis padres, porque *i miei* solos son los padres. «En mi casa» sería *a casa mia*.",
   prompt=QQ)

# --- vuelve en la 20, 22 y 24 ---
tr(20, "po", PO, "Mis viejos no saben nada.",
   _combo(["I miei", "I miei genitori"], " non sanno ", ["niente", "nulla"], ["", "."]),
   "*I miei* = mis padres, y la negación doble: *non sanno niente*. ✗ «miei non sanno».")
fx(20, "po", PO, "preposizione", "Hai ragione, sono alla tua parte.", "alla", "dalla",
   "La frase fija es *essere dalla parte di qualcuno*: con *da*. *Sono dalla tua parte* = estoy de tu lado.")
cz(22, "po", PO, "Completá con el posesivo.",
   "Luca è arrivato in ritardo un'altra volta: ne ha fatta una delle ___!", "sue",
   "*Farne una delle sue* = «mandarse una de las suyas». Femenino plural (se sobreentiende *cose*) y "
   "con *ne*: *ne ha fatta una delle sue*.")
tr(22, "po", PO, "Si querés, dormí en mi casa.",
   _combo("Se vuoi", [", ", " "], "dormi ", ["a casa mia", "da me"], ["", "."]),
   "*A casa mia* o *da me*, sin artículo. Y el imperativo de tu de *dormire* es *dormi*.")
tr(24, "po", PO, "Yo también quiero dar mi opinión.",
   _combo(["Anch'io", "Anche io"], " ", ["voglio", "vorrei"], " dire la mia", ["", "."]),
   "*Dire la mia / la tua / la sua* es dar la propia opinión: el posesivo va en femenino porque se sobreentiende *opinione*.")


# ===========================================================================
# 3. Comparativo: di o che, migliore o meglio (lección 23)
# ===========================================================================
DC = "comparativo di che"
DC_P = "Completá con di o che."
DC_N = ("*di* ante sustantivo, pronombre o número (dos cosas, una cualidad); *che* entre dos "
        "adjetivos, dos verbos, dos sustantivos del mismo verbo o ante preposición.")

ch(27, "dc", DC, "Questo vino è ___ di quello.", ["migliore", "meglio", "più meglio"], "migliore",
   "Califica al vino (sustantivo): adjetivo, *migliore*. *meglio* es adverbio (*canta meglio*) y "
   "«più meglio» no existe. *Più buono* también se dice.")
ch(27, "dc", DC, "Luca cucina ___ di sua sorella.", ["meglio", "migliore", "più bene"], "meglio",
   "Modifica al verbo *cucinare*: adverbio, *meglio*. «più bene» no se dice.")
tr(27, "dc", DC, "Es más simpático que lindo.",
   ["È più simpatico che bello", "È più simpatico che bello.", "Lui è più simpatico che bello"],
   "Dos adjetivos de la misma persona: *che*. ✗ «più simpatico di bello». " + DC_N)
fx(27, "dc", DC, "preposizione", "D'estate vado più spesso al mare di in montagna.", "di", "che",
   "Ante preposición (*in montagna*) va *che*: *più al mare che in montagna*. " + DC_N)
cz(28, "dc", DC, DC_P, "Leggo più giornali ___ libri.", "che",
   "Dos sustantivos con el mismo verbo (*leggo*): *che*. Comparás cantidades de lo que hacés, no "
   "dos cosas respecto de una cualidad.")
tr(28, "dc", DC, "Mi hermana es más alta que yo, pero yo corro mejor que ella.",
   _combo("Mia sorella è più alta di me", [", ma", " ma", ", però", " però"], " io corro meglio di lei", ["", "."]),
   "«Que yo» = *di me* (pronombre tónico, nunca «di io»). *Correre meglio*: adverbio, *meglio*, "
   "no *migliore*.")
fx(28, "dc", DC, "preposizione", "Mi piace più camminare di correre.", "di", "che",
   "Dos verbos (*camminare*, *correre*): *che*. *di* va ante sustantivo o pronombre.")
cz(30, "dc", DC, "Completá con di + artículo o con che.", "Il viaggio è stato più lungo ___ previsto.", "del",
   "*Più lungo del previsto* = más largo de lo previsto: *di* + *il previsto*. Es una frase fija.")
tr(30, "dc", DC, "Hay más turistas que habitantes.",
   ["Ci sono più turisti che abitanti", "Ci sono più turisti che abitanti."],
   "Dos sustantivos con el mismo verbo (*ci sono*): *che*. " + DC_N)


# ===========================================================================
# 4. Superlativo: stra-, super-, arci-, repetición (lección 23)
# ===========================================================================
SU = "superlativo prefissi"

ch(23, "su", SU, "«Sono arcistufo di questo lavoro.»",
   ["Estoy hartísimo de este trabajo.", "Estoy un poco cansado de este trabajo.",
    "Estoy aburrido de este trabajo."],
   "Estoy hartísimo de este trabajo.",
   "*arci-* lleva el adjetivo al máximo, como *-issimo*: *arcistufo* = hartísimo, *arcinoto* = "
   "conocidísimo. Es más culto que *stra-*.", prompt=QQ)
ch(23, "su", SU, "«La metro era strapiena.»",
   ["El subte estaba llenísimo.", "El subte estaba casi vacío.", "El subte estaba bastante lleno."],
   "El subte estaba llenísimo.",
   "*stra-* (y *super-*) en el habla = «re», «súper»: *strapieno* (lleno hasta el tope), *straricco*.",
   prompt=QQ)
ch(23, "su", SU, "«Il bambino è stato buono buono tutto il pomeriggio.»",
   ["El nene se portó re bien toda la tarde.", "El nene se portó más o menos toda la tarde.",
    "El nene estuvo mal toda la tarde."],
   "El nene se portó re bien toda la tarde.",
   "Repetir la palabra intensifica: *buono buono* = bien portadito; *piano piano* = despacito.",
   prompt=QQ)
ch(27, "su", SU, "«È una storia arcinota.»",
   ["Es una historia conocidísima.", "Es una historia muy vieja.", "Es una historia poco conocida."],
   "Es una historia conocidísima.",
   "*arci-* + adjetivo = superlativo: *arcinoto* = conocidísimo. Mezclalo con *-issimo*: "
   "*notissimo* dice lo mismo.", prompt=QQ)
tr(27, "su", SU, "Despacito, vas a ver que lo lográs.",
   _combo("Piano piano", [", ", " "], ["vedrai che ce la fai", "vedrai che ce la farai"], ["", "."]),
   "*Piano piano* = despacito, de a poco: la repetición intensifica. *Farcela* = lograrlo.")


# ===========================================================================
# 5. Relativos che / cui adelantados a la 17
# ===========================================================================
RE = "relativi che cui"
RE_P = "Completá con che o cui."
RE_N = ("Sin preposición, *che*; detrás de una preposición, *cui* (invariable y sin artículo): "
        "*in cui*, *con cui*, *di cui*, *a cui*, *per cui*.")

cz(17, "re", RE, RE_P, "La città in ___ vivo è piccola.", "cui",
   "Hay preposición (*in*): *cui*. «La ciudad en la que vivo» = *la città in cui vivo*. ✗ «in che».")
cz(17, "re", RE, RE_P, "Il libro ___ leggo è di Calvino.", "che",
   "*Leggere qualcosa*: objeto directo, sin preposición, entonces *che*. " + RE_N)
cz(17, "re", RE, RE_P, "Il ragazzo con ___ esco si chiama Luca.", "cui",
   "*Uscire con qualcuno*: hay preposición, *con cui*. ✗ «con che», ✗ «con il che».")
cz(17, "re", RE, RE_P, "Il film di ___ ti ho parlato è stupendo.", "cui",
   "*Parlare di qualcosa*: *di cui*. El castellano dice «del que»; el italiano no pone artículo: *di cui*.")
tr(17, "re", RE, "La chica con la que salgo es de Verona.",
   ["La ragazza con cui esco è di Verona", "La ragazza con cui esco è di Verona.",
    "La ragazza con la quale esco è di Verona"],
   "«Con la que» = *con cui*, sin artículo. ✗ «con la che», ✗ «con che». " + RE_N)
tr(17, "re", RE, "El motivo por el que vengo es simple.",
   ["Il motivo per cui vengo è semplice", "Il motivo per cui vengo è semplice.",
    "Il motivo per il quale vengo è semplice"],
   "Después de preposición, el relativo es *cui*: «por el que» es *per cui*, sin artículo. *Per cui* al principio de frase también es «por eso».")
fx(17, "re", RE, "pronome", "Questa è la collega con che lavoro.", "che", "cui",
   "Detrás de *con* nunca va *che*: *con cui*. " + RE_N, ["la quale"])
fx(17, "re", RE, "pronome", "Il paese in che sono nato è in Calabria.", "che", "cui",
   "*In* + relativo = *in cui* (también *dove*: *il paese dove sono nato*). ✗ «in che».")
fx(17, "re", RE, "pronome", "La casa cui ho comprato è vecchia.", "cui", "che",
   "*Comprare qualcosa* no lleva preposición: el relativo es *che*. *cui* va detrás de una preposición.")
ch(17, "re", RE, "L'amico ___ scrivo vive a Roma.", ["a cui", "che", "a che"], "a cui",
   "*Scrivere a qualcuno*: la preposición *a* queda delante, *a cui*. ✗ «a che».")

# --- vuelve en la 20, 23 y 27 ---
tr(20, "re", RE, "La casa en la que vivo es chica.",
   _combo("La casa ", ["in cui", "dove", "nella quale"], " vivo è piccola", ["", "."]),
   "«En la que» = *in cui* (o *dove*). Sin artículo: ✗ «nella che». " + RE_N)
fx(20, "re", RE, "pronome", "Questo è il collega a che ho chiesto aiuto.", "che", "cui",
   "*Chiedere aiuto a qualcuno*: *a cui*. Detrás de preposición, nunca *che*.")
cz(23, "re", RE, "Completá con preposición + cui.", "La persona ___ mi fido di più è mia madre.", "di cui",
   "*Fidarsi di qualcuno*: la preposición del verbo va delante del relativo, *di cui*. "
   "(*Della quale* también es correcto, más formal.)", ["della quale"])
ch(23, "re", RE, "Il ristorante ___ siamo andati ieri era ottimo.", ["in cui", "che", "cui"], "in cui",
   "*Andare in un ristorante*: *in cui* (o *dove*). Sin la preposición, *cui* solo no alcanza.")
tr(27, "re", RE, "Esa es la razón por la que no vine.",
   _combo(["Questo è il motivo", "Quello è il motivo", "È il motivo", "Ecco il motivo"], " ",
          ["per cui", "per il quale"], " non sono ",
          ["venuto", "venuta"], ["", "."]) +
   _combo(["Questa è la ragione", "Quella è la ragione", "È la ragione", "Ecco la ragione"], " ",
          ["per cui", "per la quale"], " non sono ",
          ["venuto", "venuta"], ["", "."]),
   "«Por la que» = *per cui*: la preposición delante y *cui* sin artículo. ✗ «per la che».")

# --- y en la 38, 42 y 48 ---
cz(38, "re", RE, "Completá con preposición + cui.", "Il motivo ___ ho rinunciato è personale.", "per cui",
   "*Rinunciare per un motivo*: *per cui* (o *per il quale*).", ["per il quale"])
fx(42, "re", RE, "pronome", "È un argomento a cui non so niente.", "a cui", "di cui",
   "*Sapere qualcosa DI un argomento*: *di cui non so niente*. La preposición la decide el verbo, "
   "no el castellano.", ["del quale"])
tr(42, "re", RE, "Es un problema del que todos hablan.",
   _combo("È un problema ", ["di cui", "del quale"], [" parlano tutti", " tutti parlano"], ["", "."]),
   "*Parlare di*: *di cui*, sin artículo (✗ «del che»). Formal: *del quale*.")
cz(48, "re", RE, "Completá con el relativo.", "Questa è l'azienda per ___ lavoro da dieci anni.", "cui",
   "Detrás de *per*: *cui*. Formal, *per la quale* (concuerda con *azienda*).", ["la quale"])
tr(48, "re", RE, "El barrio donde crecí cambió mucho.",
   _combo("Il quartiere ", ["in cui", "dove", "nel quale"], " sono ", ["cresciuto", "cresciuta"],
          " è cambiato molto", ["", "."]),
   "«Donde» relativo = *in cui* o *dove*. *Cambiare* sin objeto (cambiar uno mismo) va con *essere*: "
   "*è cambiato*.")


# ===========================================================================
# 6. chi, quanto e il quale (lección 34; registro en la 49)
# ===========================================================================
CI = "relativi chi quale"

tr(34, "ch", CI, "Los que no estudian no aprueban.",
   _combo(["Chi non studia non passa", "Chi non studia non è promosso",
           "Quelli che non studiano non passano", "Coloro che non studiano non passano"], ["", "."]),
   "«Los que» sin antecedente = *chi*, con el verbo en SINGULAR: *chi non studia*. Con *quelli che*, plural.")
fx(34, "ch", CI, "concordanza", "Chi vogliono venire alla gita deve dirmelo entro stasera.", "vogliono", "vuole",
   "*chi* = «el que, los que» pero siempre con verbo en singular: *chi vuole venire*. Aunque pienses en varios.")
tr(34, "ch", CI, "Ayudo a los que lo necesitan.",
   ["Aiuto chi ne ha bisogno", "Aiuto chi ne ha bisogno.", "Aiuto chi ha bisogno",
    "Aiuto quelli che ne hanno bisogno", "Aiuto coloro che ne hanno bisogno"],
   "*chi* también es objeto: *aiuto chi ne ha bisogno*. Sin la «a» del castellano (*aiutare qualcuno*) "
   "y con el verbo en singular.")
cz(34, "ch", CI, "Completá con chi, che o cui.", "Ringrazio ___ mi ha aiutato.", "chi",
   "No hay antecedente (*ringrazio* a alguien que no nombraste): *chi* = la persona que. "
   "*che* necesita un sustantivo antes: *la persona che mi ha aiutato*.")
fx(34, "ch", CI, "pronome", "Che ha finito l'esame può uscire.", "Che", "Chi",
   "Sin antecedente, «el que» es *chi*: *chi ha finito può uscire*. *Che* necesita un sustantivo "
   "delante (*lo studente che ha finito*).")
ch(34, "ch", CI, "«Farò quanto posso per aiutarti.»",
   ["Voy a hacer todo lo que pueda para ayudarte.", "No sé cuánto te puedo ayudar.",
    "Voy a ayudarte un poco."],
   "Voy a hacer todo lo que pueda para ayudarte.",
   "*quanto* relativo = todo lo que (*tutto ciò che*), más culto: *farò quanto posso*, *ti ho "
   "detto quanto so*.", prompt=QQ)

tr(49, "ch", CI, "Es una condición sin la cual no podemos firmar.",
   _combo(["È una condizione", "Si tratta di una condizione"], " senza ", ["la quale", "cui"],
          " non possiamo firmare", ["", "."]),
   "Tras preposiciones largas (*senza, secondo, durante, verso*) el registro escrito prefiere "
   "*il / la quale*: *senza la quale*. *Senza cui* también se ve.")
cz(49, "ch", CI, "Completá con el relativo (registro formal).",
   "È una norma secondo ___ i contratti devono essere scritti.", "la quale",
   "*Secondo la quale* concuerda con *norma*. *Secondo cui* también es correcto y muy usado.",
   ["cui"])
fx(49, "ch", CI, "concordanza", "Sono queste le ragioni per i quali ho rinunciato all'incarico.",
   "i quali", "le quali",
   "*il quale* concuerda con el antecedente: *le ragioni* (f. pl.) → *per le quali*. Si dudás, "
   "*per cui* no cambia nunca.", ["cui"])
