# -*- coding: utf-8 -*-
"""Auditoría de gramática 2026-10, área 3 (sintaxis: dislocación, escindidas,
conectores, subordinadas, relativas, cohesión): producción y vuelta espaciada.

Lo que la auditoría marcó como «mejorable» o «flojo»:

1. Dislocación con retoma (adelanto nuevo en la 21): 21, 22, 24 y 26.
2. Pseudoescindida (*quello che voglio è…*; S48[2]): 48 y 51.
3. *infatti* / *in realtà* («de hecho» que confirma o corrige; S28[1]):
   28, 31 y 39.
4. Temporales: *finché (non)* + indicativo, *appena / quando* + futuro sin
   subjuntivo calcado, *prima che* + congiuntivo frente a *dopo che* +
   indicativo (S28[2]): 28, 29, 31 y 33.
5. Concesivas: *nonostante* + congiuntivo (28, 29, 30, 39), *pur* +
   gerundio (46, 51) y *per quanto* + congiuntivo (bloque S49[7]): 49 y 51.
6. Finales: *perché* + congiuntivo (para que) frente a *perché* +
   indicativo (porque) (S25[4], S28[4]): 25, 26, 28, 29 y 33; *in modo da*
   / *in modo che* (28, 32) y *tanto che* (31, 32).
7. *chissà* (S38[2]): 38, 40 y 45.
8. Relativas: con o sin comas, *il quale* sujeto solo entre comas, y *il
   primo / l'ultimo / l'unico a* + infinitivo (bloques nuevos en la 34):
   34, 35, 36, 37 y 39.
9. Cohesión: sustitución (*tale provvedimento*, *quest'ultimo*, *il
   fenomeno*) y *del resto / d'altronde* (S49): 49, 51 y 52.
10. *che* polivalente temporal y causal (S48[6]): 48 y 50.
11. Locuciones del estilo nominal (*a seguito di*, *in vista di*; bloque
    nuevo en la 49): 49, 51 y 52.

Prefijo de los ids: gr3-<semana>-<n>.
"""
from itertools import product

TR = "Traducí al italiano."
FX = "Trova l'errore: tocá la palabra que está mal y corregila."
CH = "¿Cuál está bien?"
QQ = "¿Qué quiere decir?"
CZ = "Completá con el verbo entre paréntesis."

LEVEL = {}
for _w in range(1, 53):
    LEVEL[_w] = "A1" if _w <= 6 else "A2" if _w <= 18 else "B1" if _w <= 28 else "B2" if _w <= 39 else "C1"

ITEMS = []
_N = {}


def _combo(*parts):
    """Todas las combinaciones de las piezas: las variantes igual de válidas."""
    return ["".join(c) for c in product(*[p if isinstance(p, list) else [p] for p in parts])]


def _add(w, typ, topic, prompt, stem, answer, note, alt=None, **extra):
    _N[w] = _N.get(w, 0) + 1
    seen, clean = set(), []
    for a in alt or []:
        k = a.rstrip(".?!")
        if a and k != answer.rstrip(".?!") and k not in seen:
            seen.add(k)
            clean.append(a)
    d = dict(id="gr3-%d-%02d" % (w, _N[w]), w=w, level=LEVEL[w], type=typ, topic=topic,
             prompt=prompt, stem=stem, answer=answer, note=note)
    if clean:
        d["alt"] = clean
    d.update(extra)
    ITEMS.append(d)
    return d


def tr(w, topic, stem, variants, note, prompt=TR):
    """translate: la primera variante es la respuesta; el resto, alt (y, si
    hay dos puntos o punto y coma, la misma con coma)."""
    more = [v.replace(": ", ", ").replace("; ", ", ") for v in variants if ": " in v or "; " in v]
    return _add(w, "translate", topic, prompt, stem, variants[0], note, variants[1:] + more)


def fx(w, topic, cat, stem, bad, good, note, good_alt=None, prompt=FX):
    assert stem.count(bad) == 1, (stem, bad)
    d = _add(w, "fixerr", topic, prompt, stem, stem.replace(bad, good, 1), note,
             [stem.replace(bad, g, 1) for g in good_alt or []], cat=cat, bad=bad, good=good)
    if good_alt:
        d["goodAlt"] = list(good_alt)
    return d


def ch(w, topic, stem, options, answer, note, prompt=CH):
    assert answer in options and len(set(options)) == len(options), stem
    return _add(w, "choice", topic, prompt, stem, answer, note, options=options)


def cz(w, topic, prompt, stem, answer, note, alt=None):
    return _add(w, "cloze", topic, prompt, stem, answer, note, alt)


def ty(w, topic, prompt, stem, variants, note):
    return _add(w, "typed", topic, prompt, stem, variants[0], note, variants[1:])


# ===========================================================================
# 1. Dislocación con retoma (adelanto en la 21; a fondo en la 48)
# ===========================================================================
T_DIS = "dislocazione"
RET = "Completá con el pronombre que retoma lo que va adelante (lo, la, li, le, ne, ci)."
DIS = ("Lo que va adelante y ya se conoce se retoma con un pronombre: *lo/la/li/le* para el "
       "objeto, *ne* para una cantidad o «de eso», *ci* para el lugar. Como el rioplatense "
       "«el café lo tomo amargo».")

cz(21, T_DIS, RET, "Il caffè ___ prendo sempre amaro.", "lo",
   DIS + " *Il caffè* es objeto directo masculino: *lo*.")
cz(21, T_DIS, RET, "Di pane ___ compro due chili.", "ne",
   DIS + " Con una cantidad (*due chili*), *ne*: *di pane ne compro due chili*.")
cz(21, T_DIS, RET, "A Roma ___ vado domani con Luca.", "ci",
   DIS + " Un lugar adelantado se retoma con *ci*.")
tr(21, T_DIS, "La pizza la hago yo.",
   ["La pizza la faccio io", "La pizza la preparo io"],
   DIS + " Y el sujeto que es la novedad (*io*) va al final, igual que en castellano.")
fx(22, T_DIS, "parola_in_piu", "A Marco lo conosco da anni.", "A Marco", "Marco",
   "El objeto directo de persona va sin *a*, también adelantado: *Marco lo conosco*. "
   "La *a* del castellano («a Marco lo conozco») no se calca.")
tr(22, T_DIS, "De plata no hablamos.",
   ["Di soldi non ne parliamo", "Di soldi non parliamo", "Dei soldi non ne parliamo",
    "Non parliamo di soldi"],
   DIS + " *parlare di* → *ne*: *di soldi non ne parliamo*. Sin *ne* también se entiende, "
   "pero con la retoma suena más natural.")
fx(24, T_DIS, "pronome", "Il libro ho già letto, te lo presto.", "ho già", "l'ho già",
   DIS + " Sin *l'* la frase queda coja: *il libro l'ho già letto*.")
tr(26, T_DIS, "A Lucía no la vi.",
   ["Lucia non l'ho vista", "Lucia non la ho vista", "Non ho visto Lucia", "Lucia, non l'ho vista"],
   "Sin *a* delante de *Lucia*, y el participio concuerda con *l'* (= *la*): *l'ho vista*. "
   "*Non ho visto Lucia* (sin dislocar) también vale.")
ch(26, T_DIS, "Le chiavi, dove ___?", ["le hai messe", "hai messo", "li hai messi"], "le hai messe",
   "*Le chiavi* es femenino plural: lo retoma *le*, y con *le* delante el participio "
   "concuerda: *messe*. Sin pronombre («dove hai messo?») la frase queda coja.")

# ===========================================================================
# 2. Pseudoescindida (S48[2])
# ===========================================================================
T_PSE = "frase scissa"
PSE_P = "Reescribí poniendo adelante «quello che…» (lo que…)."
PSE = ("Pseudoescindida: *quello che* (o *ciò che*, *quel che*) + verbo + *è* + lo que querés "
       "destacar. Es el «lo que quiero es…» del castellano.")

ty(48, T_PSE, PSE_P, "Voglio riposare.",
   ["Quello che voglio è riposare", "Ciò che voglio è riposare", "Quel che voglio è riposare",
    "Quello che voglio fare è riposare"],
   PSE + " El foco (*riposare*) queda al final.")
ty(48, T_PSE, PSE_P, "Mi preoccupa il prezzo.",
   ["Quello che mi preoccupa è il prezzo", "Ciò che mi preoccupa è il prezzo",
    "Quel che mi preoccupa è il prezzo"],
   PSE + " *mi* queda adentro de la relativa: *quello che mi preoccupa*.")
tr(48, T_PSE, "Lo que pasa es que no tengo tiempo.",
   ["Il fatto è che non ho tempo", "Il punto è che non ho tempo", "Il problema è che non ho tempo",
    "Quello che succede è che non ho tempo", "Il fatto è che non ho il tempo"],
   "«Lo que pasa es que» no se calca: *passare* no es «suceder». Se dice *il fatto è che* "
   "(o *il punto è che*, *il problema è che*).")
fx(51, T_PSE, "lessico", "Quello che passa è che sono stanco.", "Quello che passa", "Il fatto",
   "«Lo que pasa es que» = *il fatto è che*: *passare* es pasar por un lugar o el tiempo, "
   "no «suceder».", good_alt=["Il punto", "Il problema", "Quello che succede"])
tr(51, T_PSE, "Lo que necesito es un café.",
   ["Quello che mi serve è un caffè", "Ciò che mi serve è un caffè", "Quel che mi serve è un caffè",
    "Quello di cui ho bisogno è un caffè", "Ciò di cui ho bisogno è un caffè"],
   PSE + " Con *avere bisogno di*, la preposición pasa al relativo: *quello di cui ho bisogno*. "
   "Más simple: *quello che mi serve*.")

# ===========================================================================
# 3. infatti / in realtà (S28[1])
# ===========================================================================
T_INF = "infatti o in realtà"
INF = ("«De hecho» tiene dos caras. Si confirma o explica lo anterior, *infatti*; si lo corrige "
       "o lo contradice, *in realtà*. *Infatti* nunca contradice.")

ch(28, T_INF, "Dice che arriva sempre puntuale; ___, arriva sempre in ritardo.",
   ["in realtà", "infatti", "quindi"], "in realtà",
   INF + " Acá lo que sigue desmiente lo que dice: *in realtà*.")
ch(28, T_INF, "Era stanchissimo: ___ si è addormentato sul divano.",
   ["infatti", "in realtà", "invece"], "infatti",
   INF + " Dormirse confirma que estaba cansado: *infatti*.")
tr(28, T_INF, "Parece fácil; de hecho, es muy difícil.",
   _combo("Sembra facile", ["; ", ": ", ", ma "], "in realtà", [" ", ", "],
          ["è molto difficile", "è difficilissimo"]),
   INF + " Este «de hecho» corrige la apariencia: *in realtà*, no *infatti*.")
tr(31, T_INF, "No vino a la fiesta: de hecho, estaba enfermo.",
   _combo("Non è ", ["venuto", "venuta"], " alla festa: infatti era ", ["malato", "malata"]) +
   _combo("Non è ", ["venuto", "venuta"], " alla festa; infatti era ", ["malato", "malata"]) +
   _combo("Non è ", ["venuto", "venuta"], " alla festa: infatti stava male") +
   _combo("Non è ", ["venuto", "venuta"], " alla festa: in effetti era ", ["malato", "malata"]),
   INF + " Acá explica por qué no vino: *infatti*.")
fx(31, T_INF, "lessico", "Sembra caro; infatti costa pochissimo.", "infatti", "in realtà",
   INF + " «Parece caro, pero cuesta poquísimo» corrige: *in realtà* (o *invece*).",
   good_alt=["invece"])
ch(39, T_INF, "Tutti pensano che sia timido; ___ è solo riservato.",
   ["in realtà", "infatti", "perciò"], "in realtà",
   INF + " Corrige lo que todos piensan: *in realtà*.")
ch(39, T_INF, "Te l'avevo detto che era bravo: ___ ha preso il massimo dei voti.",
   ["infatti", "in realtà", "tuttavia"], "infatti",
   INF + " La nota confirma lo que le habías dicho: *infatti*.")
cz(39, T_INF, "Completá con infatti o in realtà.", "Sembrava arrabbiato; ___ era solo stanco.",
   "in realtà", INF + " Parecía una cosa y era otra: corrige.", ["In realtà"])

# ===========================================================================
# 4. Temporales: finché, appena / quando + futuro, prima che / dopo che
# ===========================================================================
T_TEM = "temporali"
SUBJ = ("Donde el castellano pone subjuntivo de futuro («apenas llegue», «cuando sea», «hasta "
        "que vuelvas»), el italiano pone indicativo: futuro (lo cuidado) o presente (charlando).")
FIN = ("*finché (non)* = hasta que. El *non* es optativo y no niega, como el «hasta que no "
       "termines» del castellano.")

cz(28, T_TEM, CZ, "Resto qui finché non ___ (tu, tornare).", "torni",
   FIN + " " + SUBJ, ["tornerai", "sarai tornato", "sarai tornata"])
tr(28, T_TEM, "Hasta que no termines, no salís.",
   ["Finché non finisci, non esci", "Finché non hai finito, non esci",
    "Finché non avrai finito, non esci", "Finché non finirai, non esci",
    "Non esci finché non finisci", "Non esci finché non hai finito",
    "Non esci finché non avrai finito", "Finché non finisci non esci"],
   FIN + " «termines» (subjuntivo) → *finisci* o *avrai finito* (indicativo).")
tr(28, T_TEM, "Te espero hasta que llegues.",
   ["Ti aspetto finché non arrivi", "Ti aspetto finché arrivi", "Ti aspetto finché non arriverai",
    "Ti aspetto fino a quando non arrivi", "Ti aspetto fino a quando arrivi",
    "Ti aspetto finché non sarai arrivato", "Ti aspetto finché non sarai arrivata"],
   FIN + " «llegues» → *arrivi* (indicativo), no congiuntivo.")
fx(28, T_TEM, "tempo_verbale", "Appena finisca il corso, cercherò lavoro.", "finisca", "finirò",
   SUBJ + " «Apenas termine el curso» → *appena finirò* (o *finisco*); si el que termina es el "
   "curso, *appena finirà*.", good_alt=["finisco", "avrò finito", "finirà", "finisce", "sarà finito"])
fx(29, T_TEM, "lessico", "Resto a casa fino che non smette di piovere.", "fino che", "finché",
   "«Hasta que» = *finché* (o *fino a quando*), en una palabra; «fino che» no es italiano estándar.",
   good_alt=["fino a quando"])
ch(29, T_TEM, "Ti chiamo dopo che ___ con il direttore.",
   ["ho parlato", "abbia parlato", "parli"], "ho parlato",
   "*dopo che* va con indicativo, aunque el castellano diga «después de que hable». El único "
   "temporal con congiuntivo es *prima che*.")
ch(29, T_TEM, "Torniamo a casa prima che ___ buio.", ["faccia", "fa", "farà"], "faccia",
   "*prima che* pide **siempre** congiuntivo: *prima che faccia buio*. Su opuesto, *dopo che*, va "
   "con indicativo.")
fx(31, T_TEM, "tempo_verbale", "Quando arriviate a Roma, chiamatemi.", "arriviate", "arriverete",
   SUBJ + " «Cuando lleguen» → *quando arriverete* (o *arrivate*); *arriviate* es el "
   "congiuntivo calcado del castellano.", good_alt=["arrivate", "sarete arrivati"])
fx(33, T_TEM, "tempo_verbale", "Quando sia grande, farò il medico.", "sia", "sarò",
   SUBJ + " «Cuando sea grande» → *quando sarò grande*: nunca congiuntivo tras *quando*.")

# ===========================================================================
# 5. Concesivas: nonostante + congiuntivo, pur + gerundio, per quanto
# ===========================================================================
T_CON = "concessive"
NON = ("*nonostante* (aunque, a pesar de que) + verbo pide congiuntivo, como *benché*. Con "
       "sustantivo, sin verbo: *nonostante la pioggia*.")

cz(28, T_CON, CZ, "Nonostante ___ (essere) stanca, Anna continua a lavorare.", "sia",
   NON + " «Aunque está cansada» lleva indicativo en castellano; acá, *sia*.")
fx(29, T_CON, "tempo_verbale", "Nonostante fa freddo, Luca esce in maglietta.", "fa", "faccia",
   NON + " *fare* → *faccia*. Con indicativo, *anche se fa freddo*.")
cz(30, T_CON, CZ, "Nonostante ___ (piovere), siamo usciti lo stesso.", "piovesse",
   NON + " Con la principal en pasado, congiuntivo imperfetto: *piovesse*.", ["fosse piovuto"])
tr(39, T_CON, "A pesar de que estaba cansado, terminó el trabajo.",
   _combo(["Nonostante fosse stanco", "Benché fosse stanco", "Sebbene fosse stanco",
           "Anche se era stanco"], [", ", " "], ["ha finito il lavoro", "ha terminato il lavoro"]),
   NON + " En pasado: *fosse*. Con *anche se*, indicativo: *anche se era stanco*.")
PUR = ("*pur* + gerundio = aunque / aun + gerundio, con el **mismo sujeto** en las dos partes: "
       "*pur sapendolo* = aunque lo sabía.")
tr(46, T_CON, "Aunque vive en Roma, no habla italiano.",
   ["Pur vivendo a Roma, non parla italiano", "Anche se vive a Roma, non parla italiano",
    "Benché viva a Roma, non parla italiano", "Sebbene viva a Roma, non parla italiano",
    "Nonostante viva a Roma, non parla italiano", "Pur abitando a Roma, non parla italiano"],
   PUR + " Todas valen; *pur vivendo* es la más compacta.")
ty(51, T_CON, "Reescribí con pur + gerundio.", "Anche se sapeva la verità, ha taciuto.",
   ["Pur sapendo la verità, ha taciuto", "Pur conoscendo la verità, ha taciuto"],
   PUR + " *anche se sapeva* → *pur sapendo*; el tiempo lo da la principal.")
ty(51, T_CON, "Reescribí con pur + gerundio.", "Anche se è giovane, ha molta esperienza.",
   ["Pur essendo giovane, ha molta esperienza"],
   PUR + " *è* → *essendo*: *pur essendo giovane*.")
PQ = ("*per quanto* + congiuntivo = «por más que»: concede, como *benché*. No confundir con *per "
      "quanto ne so* (por lo que sé) ni *per quanto riguarda* (en cuanto a).")
tr(49, T_CON, "Por más que lo intento, no me sale.",
   ["Per quanto ci provi, non ci riesco", "Per quanto mi sforzi, non ci riesco",
    "Per quanto ci provi, non mi riesce", "Per quanto ci provi non ci riesco",
    "Per quanto io ci provi, non ci riesco"],
   PQ + " *provarci* → *ci provi* (congiuntivo); «me sale» = *ci riesco*.")
ch(49, T_CON, "«Per quanto ne so, il negozio è chiuso.»",
   ["Por lo que sé, el negocio está cerrado.", "Por más que sé, el negocio está cerrado.",
    "Aunque lo sepa, el negocio está cerrado."],
   "Por lo que sé, el negocio está cerrado.",
   PQ + " Con *ne so* e indicativo es una fórmula fija: «por lo que sé».", prompt=QQ)
cz(51, T_CON, CZ, "Per quanto ___ (essere) bravo, anche lui sbaglia.", "sia",
   PQ + " *essere* → *sia*.")

# ===========================================================================
# 6. Finales: perché + congiuntivo / indicativo, in modo da / che, tanto che
# ===========================================================================
T_FIN = "finali e consecutive"
PER = ("*perché* + congiuntivo = para que (fin); *perché* + indicativo = porque (causa). El modo "
       "cambia el sentido.")

ch(25, T_FIN, "Te lo spiego di nuovo perché tu ___.", ["capisca", "capisci", "capire"], "capisca",
   PER + " Acá es un fin («para que entiendas»): *capisca*.")
ch(25, T_FIN, "Oggi non esco perché ___.", ["piove", "piova", "piovere"], "piove",
   PER + " Acá es la causa («porque llueve»): indicativo, *piove*.")
tr(25, T_FIN, "Te lo repito para que entiendas.",
   ["Te lo ripeto perché tu capisca", "Te lo ripeto affinché tu capisca",
    "Te lo ripeto perché capisca", "Te lo ripeto affinché capisca"],
   PER + " «para que» → *perché* o *affinché* + congiuntivo. Nunca «per che».")
tr(25, T_FIN, "Te lo repito porque no entendés.",
   ["Te lo ripeto perché non capisci", "Te lo ripeto perché tu non capisci"],
   PER + " Causa → indicativo: *perché non capisci*. Con *capisca* diría «para que no entiendas».")
ch(26, T_FIN, "«Parlo forte perché tutti sentano.»",
   ["Hablo fuerte para que todos oigan.", "Hablo fuerte porque todos oyen.",
    "Hablo fuerte aunque todos oigan."],
   "Hablo fuerte para que todos oigan.", PER + " *sentano* es congiuntivo: fin.", prompt=QQ)
cz(28, T_FIN, CZ, "Ti lascio le chiavi perché tu ___ (potere) entrare.", "possa",
   PER + " Es un fin («para que puedas»): *possa*.")
fx(28, T_FIN, "tempo_verbale", "Parlo piano affinché il bambino non si sveglia.", "sveglia", "svegli",
   "*affinché* (para que) pide siempre congiuntivo: *non si svegli*.")
ch(28, T_FIN, "Parto presto ___ arrivare in tempo.", ["in modo da", "in modo che", "dopo che"],
   "in modo da",
   "Mismo sujeto (yo parto, yo llego): *in modo da* + infinitivo. *in modo che* necesita un verbo "
   "conjugado en congiuntivo.")
ch(29, T_FIN, "Ti presto il libro perché lo ___ anche tu.", ["legga", "leggi", "leggere"], "legga",
   PER + " «para que lo leas vos también»: *legga*.")
ch(31, T_FIN, "Era stanchissimo, ___ si è addormentato al cinema.", ["tanto che", "tanto da", "anzi"],
   "tanto che",
   "*tanto che* = tanto es así que, + verbo conjugado. *tanto da* va con infinitivo (*tanto da "
   "addormentarsi*); *anzi* corrige, no da consecuencia.")
ch(32, T_FIN, "Parlo piano ___ il bambino non si svegli.", ["in modo che", "in modo da", "dopo che"],
   "in modo che",
   "Sujetos distintos (yo hablo, el chico no se despierta): *in modo che* + congiuntivo. *in modo "
   "da* solo con infinitivo y el mismo sujeto.")
tr(32, T_FIN, "Salí temprano para no perder el tren.",
   _combo("Sono ", ["uscito", "uscita", "partito", "partita"], " presto ",
          ["per non perdere", "in modo da non perdere"],
          " il treno"),
   "Mismo sujeto: *per* o *in modo da* + infinitivo, no «perché non perda» (eso pediría otro "
   "sujeto).")
tr(32, T_FIN, "Llovía muchísimo, tanto es así que suspendieron el partido.",
   _combo(["Pioveva tantissimo", "Pioveva moltissimo"], [", tanto che ", " tanto che ", ", tant'è che "],
          ["hanno sospeso la partita", "la partita è stata sospesa", "hanno rinviato la partita",
           "la partita è stata rinviata"]),
   "«Tanto es así que» se dice *tanto che*, y va con indicativo porque cuenta una consecuencia que pasó de verdad.")
cz(33, T_FIN, "Completá con el verbo: ¿porque o para que? El modo decide.",
   "Ti chiamo perché ___ (io, avere) bisogno di te.", "ho",
   PER + " Es la causa («porque te necesito»): indicativo, *ho*.")
cz(33, T_FIN, "Completá con el verbo: ¿porque o para que? El modo decide.",
   "Ti chiamo perché tu ___ (sapere) la notizia da me.", "sappia",
   PER + " Es el fin («para que lo sepas por mí»): congiuntivo, *sappia*.")

# ===========================================================================
# 7. chissà (S38[2])
# ===========================================================================
T_CHI = "chissà"
CHI = ("*chissà* + *se / dove / chi / come…* = «quién sabe si…», «me pregunto…». Ya hace de "
       "«me pregunto»: no lleva otro verbo antes. Sigue indicativo o futuro de probabilidad.")

tr(38, T_CHI, "Me pregunto dónde lo habrá puesto.",
   ["Chissà dove l'avrà messo", "Chissà dove lo avrà messo", "Mi chiedo dove l'abbia messo",
    "Mi chiedo dove l'avrà messo", "Chissà dove l'ha messo", "Mi domando dove l'abbia messo",
    "Mi domando dove l'avrà messo", "Chissà dove lo ha messo", "Mi chiedo dove lo abbia messo"],
   CHI + " «habrá puesto» es futuro de probabilidad, igual que en castellano: *avrà messo*.")
tr(38, T_CHI, "Quién sabe si mañana llueve.",
   ["Chissà se domani piove", "Chissà se domani pioverà", "Chissà se piove domani",
    "Chissà se pioverà domani"],
   CHI + " Es una sola palabra: *chissà*, no «chi sa».")
ch(40, T_CHI, "«Chissà chi ha vinto.»",
   ["Me pregunto quién ganó.", "Alguien sabe quién ganó.", "¿Vos sabés quién ganó?"],
   "Me pregunto quién ganó.", CHI, prompt=QQ)
fx(45, T_CHI, "ortografia", "Chi sa se Marco si ricorda di noi.", "Chi sa", "Chissà",
   CHI + " Se escribe junto y con acento: *chissà*. *Chi sa…?*, con signo de pregunta, sería "
   "otra cosa: «¿quién sabe si…?», una pregunta de verdad.")

# ===========================================================================
# 8. Relativas: comas, il quale, il primo a + infinitivo (S34)
# ===========================================================================
T_REL = "relative"
PRI = ("Tras *il primo*, *l'ultimo*, *l'unico*, la relativa se acorta con *a* + infinitivo "
       "(*ad* ante vocal). El castellano dice «el primero **en**»: la *in* no se calca.")
COM = ("Sin comas, la relativa elige (solo esos); con comas, agrega un dato sobre todos. *il "
       "quale* como sujeto solo va entre comas.")

tr(34, T_REL, "Fue la última en irse.",
   ["È stata l'ultima ad andarsene", "È stata l'ultima ad andare via", "È stata l'ultima a uscire",
    "È stata l'ultima a andarsene"],
   PRI + " *andarsene*: el pronombre se pega al infinitivo.")
tr(34, T_REL, "Sos el primero en llegar.",
   ["Sei il primo ad arrivare", "Sei la prima ad arrivare", "Sei il primo a arrivare"],
   PRI)
fx(34, T_REL, "preposizione", "Marco è stato il primo in arrivare.", "in", "ad",
   PRI, good_alt=["a"])
ch(34, T_REL, "«I turisti, che avevano il biglietto, sono entrati.»",
   ["Todos los turistas tenían entrada y entraron.", "Entraron solo los turistas que tenían entrada.",
    "No entró ningún turista."],
   "Todos los turistas tenían entrada y entraron.", COM, prompt=QQ)
ch(35, T_REL, CH, ["La ragazza che parla è mia sorella.", "La ragazza la quale parla è mia sorella.",
                   "La ragazza cui parla è mia sorella."],
   "La ragazza che parla è mia sorella.",
   COM + " Sin comas, *che*; *cui* va con preposición.", prompt="Elegí la frase correcta.")
tr(36, T_REL, "Es la única que sabe la verdad.",
   ["È l'unica a sapere la verità", "È l'unica che sa la verità", "È l'unica che sappia la verità"],
   PRI + " *che sa* (o *che sappia*, más cuidado) también vale; *a sapere* es lo más natural.")
fx(37, T_REL, "preposizione", "Sono stata l'ultima di saperlo.", "di", "a",
   PRI + " Tampoco *di*: *l'ultima a saperlo*.")
ch(39, T_REL, "«I turisti che avevano il biglietto sono entrati.»",
   ["Entraron solo los turistas que tenían entrada.", "Todos los turistas tenían entrada y entraron.",
    "No entró ningún turista."],
   "Entraron solo los turistas que tenían entrada.", COM, prompt=QQ)
tr(39, T_REL, "Mi hermana, que vive en Roma, llega mañana.",
   ["Mia sorella, che vive a Roma, arriva domani", "Mia sorella, la quale vive a Roma, arriva domani",
    "Mia sorella, che abita a Roma, arriva domani", "Mia sorella, la quale abita a Roma, arriva domani"],
   COM + " Acá hay comas: valen *che* y *la quale*.")

# ===========================================================================
# 9. Cohesión: sustituir sin repetir; del resto / d'altronde (S49)
# ===========================================================================
T_COE = "coesione"
SOST = "Reescribí solo la segunda frase sin repetir el sustantivo (tale…, il fenomeno, quest'ultimo, ciò)."
COE = ("En un texto cuidado no se repite el sustantivo: se retoma con una palabra más general "
       "(*il provvedimento*, *il fenomeno*), con *tale* o *quest'ultimo*, o con *ciò*.")

ty(49, T_COE, SOST, "Il governo ha approvato la riforma. La riforma entrerà in vigore a gennaio.",
   ["Tale provvedimento entrerà in vigore a gennaio", "Il provvedimento entrerà in vigore a gennaio",
    "Questo provvedimento entrerà in vigore a gennaio", "Tale riforma entrerà in vigore a gennaio",
    "Quest'ultima entrerà in vigore a gennaio", "Essa entrerà in vigore a gennaio",
    "Entrerà in vigore a gennaio"],
   COE + " *Tale provvedimento* (dicha medida) es lo más típico.")
ty(49, T_COE, SOST, "L'inquinamento è in aumento. L'inquinamento preoccupa gli esperti.",
   ["Il fenomeno preoccupa gli esperti", "Tale fenomeno preoccupa gli esperti",
    "Questo fenomeno preoccupa gli esperti", "Ciò preoccupa gli esperti", "La cosa preoccupa gli esperti"],
   COE + " *Il fenomeno* retoma un proceso; *ciò*, el hecho entero.")
ch(49, T_COE, "Non mi stupisce che abbia vinto: ___, si allenava ogni giorno.",
   ["del resto", "tuttavia", "invece"], "del resto",
   "*del resto* / *d'altronde* = después de todo, por otra parte: suman un dato que ya se sabía "
   "y que refuerza. *tuttavia* e *invece* oponen.")
ty(51, T_COE, SOST, "Ho parlato con il direttore e con la sua segretaria. La segretaria mi ha dato un appuntamento.",
   ["Quest'ultima mi ha dato un appuntamento", "Lei mi ha dato un appuntamento",
    "Questa mi ha dato un appuntamento"],
   COE + " *quest'ultima* = la última nombrada (la secretaria); concuerda en género.")
tr(51, T_COE, "No te enojes con él: después de todo, es solo un nene.",
   _combo("Non arrabbiarti con lui: ", ["del resto", "d'altronde", "dopotutto", "in fondo"],
          [", ", " "], "è solo un bambino"),
   "«Después de todo» = *del resto*, *d'altronde* o *dopotutto*. El imperativo negativo de *tu* "
   "es *non* + infinitivo: *non arrabbiarti*.")
ty(52, T_COE, SOST, "Molti giovani lasciano il paese. Il fatto che molti giovani lascino il paese preoccupa il sindaco.",
   ["Ciò preoccupa il sindaco", "Questo preoccupa il sindaco", "Il fenomeno preoccupa il sindaco",
    "Tale fenomeno preoccupa il sindaco", "La cosa preoccupa il sindaco"],
   COE + " Una frase entera se retoma con *ciò* o *il fenomeno*.")
ch(52, T_COE, "Il progetto è costoso; ___, i benefici sono evidenti.",
   ["tuttavia", "pertanto", "inoltre"], "tuttavia",
   "*tuttavia* opone (sin embargo); *pertanto* saca una consecuencia; *inoltre* suma.")
ch(52, T_COE, "I dati sono incompleti; ___ non si possono trarre conclusioni.",
   ["pertanto", "tuttavia", "altresì"], "pertanto",
   "Consecuencia: *pertanto* (por lo tanto). *altresì* (asimismo) suma.")
cz(51, T_COE, "Completá con un conector formal que sume (además).",
   "Il piano è economico; ___, è facile da applicare.", "inoltre",
   "Sumar en registro alto: *inoltre*, *per di più*.", ["Inoltre", "per di più", "in più"])

# ===========================================================================
# 10. che polivalente: temporal y causal (S48[6])
# ===========================================================================
T_CHE = "che polivalente"

ch(48, T_CHE, "«Il giorno che sei arrivato pioveva.» ¿Se puede escribir así?",
   ["Sí: el che temporal (= in cui) vale también escrito.",
    "No: hay que escribir «il giorno cui».",
    "Solo en dialecto."],
   "Sí: el che temporal (= in cui) vale también escrito.",
   "Tras *il giorno*, *l'anno*, *la volta*, *che* temporal es estándar: *il giorno che / in cui "
   "sei arrivato*. El *che* polivalente que no vale escrito es otro: «la casa che ci abito».",
   prompt="Registro")
ch(48, T_CHE, "«Sbrigati, che è tardi!» ¿Qué hace ese che?",
   ["Explica: «apurate, que es tarde» (causal, de la charla).",
    "Es un relativo: «la tarde que…».",
    "Es un error: falta «il»."],
   "Explica: «apurate, que es tarde» (causal, de la charla).",
   "*che* causal = el «que» explicativo del castellano. Charlando, normal; escrito formal, "
   "*perché*.", prompt="Registro")
ch(50, T_CHE, "En un mail formal, ¿cuál escribís?",
   ["La casa in cui abito è in centro.", "La casa che ci abito è in centro.",
    "La casa dove ci abito è in centro."],
   "La casa in cui abito è in centro.",
   "*che ci abito* es *che* polivalente del habla: escrito, *in cui* (o *dove*). «Dove ci "
   "abito» repite el lugar dos veces.", prompt="Registro")
ch(50, T_CHE, "¿Cuál es solo de la charla?",
   ["Vieni, che ti faccio vedere una cosa.", "Vieni: ti voglio far vedere una cosa.",
    "Vieni, perché ti voglio far vedere una cosa."],
   "Vieni, che ti faccio vedere una cosa.",
   "El *che* causal o explicativo (*vieni, che…*) es oral. Escrito: dos puntos o *perché*.",
   prompt="Registro")

# ===========================================================================
# 11. Locuciones del estilo nominal (bloque nuevo en la 49)
# ===========================================================================
T_NOM = "stile nominale"
NOM_P = "Reescribí en estilo nominal con la locución entre paréntesis."
NOM = ("El estilo nominal cambia una oración entera («después de que pasó el accidente») por "
       "preposición + sustantivo: *a seguito dell'incidente*.")

ty(49, T_NOM, NOM_P, "Dopo che è avvenuto l'incidente, la strada è chiusa. (a seguito di)",
   ["A seguito dell'incidente, la strada è chiusa", "A seguito dell'incidente la strada è chiusa"],
   NOM + " *di* + *l'incidente* = *dell'incidente*.")
ty(49, T_NOM, NOM_P, "Siccome si avvicinano le elezioni, il governo promette tutto. (in vista di)",
   ["In vista delle elezioni, il governo promette tutto",
    "In vista delle elezioni il governo promette tutto"],
   NOM + " *in vista di* = de cara a: *in vista delle elezioni*.")
ty(51, T_NOM, NOM_P, "Quando c'è la festa del paese, i negozi restano chiusi. (in occasione di)",
   ["In occasione della festa del paese, i negozi restano chiusi",
    "In occasione della festa del paese i negozi restano chiusi"],
   NOM + " *in occasione di* = con motivo de: *in occasione della festa*.")
ty(52, T_NOM, NOM_P, "Per calcolare l'imposta, conta il reddito dell'anno scorso. (ai fini di)",
   ["Ai fini del calcolo dell'imposta, conta il reddito dell'anno scorso",
    "Ai fini del calcolo dell'imposta conta il reddito dell'anno scorso"],
   NOM + " *calcolare* → *il calcolo*; *ai fini di* = a efectos de.")
tr(52, T_NOM, "Tras el accidente, cortaron la ruta.",
   _combo(["A seguito dell'incidente", "In seguito all'incidente", "Dopo l'incidente"], [", ", " "],
          ["hanno chiuso la strada", "la strada è stata chiusa", "è stata chiusa la strada"]),
   NOM + " Ojo: *in seguito a* lleva *a* (*all'incidente*); *a seguito di* lleva *di*.")
