# -*- coding: utf-8 -*-
"""Auditoría de gramática 2026-10, área 4 (preposiciones, régimen, registro,
formación de palabras): producción y vuelta espaciada.

Lo que la auditoría marcó como «flojo» o «mejorable»:

1. Tiempo: da / fa / tra / per / entro (lección 9, filas nuevas fa y entro):
   9, y el contraste da / fa con el pasado en 11, 15 y 19.
2. Verbo + a / di + infinitivo (bloque B1 nuevo en la 22): 22, y vuelve en
   24, 25 y 26 mezclado con los que van sin preposición.
3. Adjetivo + di / a (bloque nuevo en la 22): calcos «contento con»,
   «interessato in», «stanco da»; 22, 24 y 26.
4. Locuciones de lugar: vicino a, lontano da, davanti a, accanto a… (bloque
   nuevo en la 17): 17, y vuelven en 19, 21 y 26.
5. andare / venire y portare / prendere (bloque nuevo en la 14, duelo
   «andare o venire» en docs/lang/it/duelli_data.js): 14, 16, 17, 19 y 31.
6. Registro escrito: carta informal (bloque nuevo en la 31) y aperturas del
   mail formal (filas nuevas en la 42): 31, 33, 42 y 44.  La concordancia
   con Lei ya la cubren gr0 (20, 26, 48) y el bloque de la 20.
7. Diminutivos y aumentativos en B1 (bloque nuevo en la 23): 23, 25, 27 y
   repaso en 48, 49 y 51.
8. Palabras compuestas y s- de «sacar» (46): 46, 48 y 50.
9. Préstamos invariables (bloque nuevo en la 48) y reconocer el italiano
   regional (lección 26, 36 y 37): 27, 38, 48, 49 y 51.

Prefijo de los ids: gr4-<semana>-<tema>-<n>.
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


def _add(w, tema, typ, topic, prompt, stem, answer, note, alt=None, **extra):
    k = (w, tema)
    _N[k] = _N.get(k, 0) + 1
    seen, clean = set(), []
    for a in alt or []:
        key = a.rstrip(".?!")
        if a and key != answer.rstrip(".?!") and key not in seen:
            seen.add(key)
            clean.append(a)
    d = dict(id="gr4-%d-%s-%02d" % (w, tema, _N[k]), w=w, level=LEVEL[w], type=typ, topic=topic,
             prompt=prompt, stem=stem, answer=answer, note=note)
    if clean:
        d["alt"] = clean
    d.update(extra)
    ITEMS.append(d)
    return d


def tr(w, tema, topic, stem, variants, note, prompt=TR):
    """translate: la primera variante es la respuesta; el resto, alt."""
    return _add(w, tema, "translate", topic, prompt, stem, variants[0], note, variants[1:])


def fx(w, tema, topic, cat, stem, bad, good, note, good_alt=None, prompt=FX):
    pat = r"(?<!\w)" + re.escape(bad) + r"(?!\w)"
    assert len(re.findall(pat, stem)) == 1, (stem, bad)
    swap = lambda g: re.sub(pat, lambda m: g, stem, count=1)  # noqa: E731
    d = _add(w, tema, "fixerr", topic, prompt, stem, swap(good), note,
             [swap(g) for g in good_alt or []], cat=cat, bad=bad, good=good)
    if good_alt:
        d["goodAlt"] = list(good_alt)
    return d


def ch(w, tema, topic, stem, options, answer, note, prompt=CH):
    assert answer in options and len(set(options)) == len(options), stem
    return _add(w, tema, "choice", topic, prompt, stem, answer, note, options=options)


def cz(w, tema, topic, prompt, stem, answer, note, alt=None):
    assert "___" in stem, stem
    return _add(w, tema, "cloze", topic, prompt, stem, answer, note, alt)


def ctx(frase, consigna="Contestá en italiano lo que está en castellano."):
    return "Te dicen: «%s». %s" % (frase, consigna)


def es(frase):
    return "Completá: «%s»" % frase


# ===========================================================================
# 1. Tiempo: da / fa / tra / per / entro (lección 9)
# ===========================================================================
TI = "preposizioni di tempo"
DAFA = ("«Hace» tiene dos traducciones. Si la acción **sigue**, presente + *da* "
        "(*abito qui da tre anni*). Si ya **pasó**, pasado + *fa*, que va detrás del "
        "número (*sono arrivato tre anni fa*).")
ENTRO = "*entro* = antes de, a más tardar: marca una fecha límite (*entro venerdì*)."

tr(9, "ti", TI, "Tengo que terminar antes del viernes.",
   _combo(["Devo finire ", "Devo finirlo ", "Devo finire tutto "], ["entro venerdì", "prima di venerdì"]),
   ENTRO + " *Prima di venerdì* también vale. Lo que no va es *per* + duración ni *tra*, "
   "que es «dentro de».")
ch(9, "ti", TI, "Devi consegnare la domanda ___ il 30 giugno.", ["entro", "tra", "da"], "entro",
   ENTRO + " *Tra* sería «dentro de» un plazo (*tra due giorni*), no una fecha; *da*, «desde».")
cz(9, "ti", TI, es("Salgo dentro de tres días."), "Parto ___ tre giorni.", "tra",
   "«Dentro de» + tiempo = *tra* o *fra* (son iguales). No *in tre giorni*, que es «en tres "
   "días» de duración (lo hice en tres días).", alt=["fra"])
cz(9, "ti", TI, es("Me quedo en Roma una semana, después vuelvo."), "Resto a Roma ___ una settimana, poi torno.",
   "per", "Una duración que termina: *per*. *Da una settimana* querría decir que ya estás "
   "hace una semana y seguís.")
tr(9, "ti", TI, "Vivo en Roma desde hace tres años.",
   _combo(["Abito", "Vivo"], " a Roma da tre anni"),
   "Algo que empezó y **sigue**: presente + *da*. Nada de *fa* ni de pasado: " + DAFA)
fx(9, "ti", TI, "preposizione", "Studio italiano fa due anni e mi piace molto.", "fa", "da",
   "Seguís estudiando: presente + *da* (*studio italiano da due anni*). *Fa* es para lo que "
   "ya terminó y va detrás: *due anni fa*.")
ch(9, "ti", TI, "Il corso finisce ___ due settimane.", ["tra", "da", "fa"], "tra",
   "Desde hoy hacia adelante: *tra* / *fra* (dentro de). *Da* mira hacia atrás y *fa* va "
   "detrás del número y en pasado.")

cz(11, "ti", TI, es("Llegué a Italia hace tres años."), "Sono arrivato in Italia tre anni ___.", "fa",
   "Ya pasó y terminó: passato prossimo + *fa*, detrás del número. " + DAFA)
tr(11, "ti", TI, "Conocí a Marco hace cinco años.",
   ["Ho conosciuto Marco cinque anni fa", "Cinque anni fa ho conosciuto Marco"],
   "Un hecho del pasado: passato prossimo + *fa*. Y sin «a» delante de Marco: *ho conosciuto "
   "Marco*.")
cz(11, "ti", TI, es("Vivo en Italia desde hace tres años."), "Vivo in Italia ___ tre anni.", "da",
   "Seguís viviendo ahí: presente + *da*. Compará con *sono arrivato tre anni fa*: el "
   "castellano dice «hace» en las dos.")

tr(15, "ti", TI, "Hace un año que no lo veo.",
   ["Non lo vedo da un anno", "È un anno che non lo vedo", "È da un anno che non lo vedo", "Non lo vedo da un anno ormai"],
   "La situación sigue (no lo ves todavía): presente + *da*. «Hace… que» no se calca con *fa*. "
   "*È un anno che…* también se dice.")
tr(15, "ti", TI, "Lo vi hace un año, en Roma.",
   _combo(["L'ho visto un anno fa", "Un anno fa l'ho visto"], [", a Roma", " a Roma"]) + ["L'ho visto a Roma un anno fa"],
   "Un hecho puntual del pasado: passato prossimo + *fa*. *Lo* se apostrofa delante de *ho*.")
ch(15, "ti", TI, "Quando l'ho conosciuto, Luca lavorava in banca ___ due anni.",
   ["da", "fa", "per"], "da",
   "En el pasado también: imperfetto + *da* para lo que seguía en ese momento (*lavorava lì "
   "da due anni*). *Fa* contaría desde hoy.")
fx(15, "ti", TI, "preposizione", "Abito in questa casa fa dieci anni.", "fa", "da",
   "Seguís viviendo ahí: *da dieci anni*. " + DAFA)

cz(19, "ti", TI, es("Voy a terminar el proyecto antes de fin de mes."), "Finirò il progetto ___ la fine del mese.",
   "entro", ENTRO + " *Prima della fine del mese* dice lo mismo con más palabras.")
tr(19, "ti", TI, "Te contesto antes del lunes.",
   _combo(["Ti rispondo ", "Ti risponderò "], ["entro lunedì", "prima di lunedì"]),
   ENTRO + " El presente sirve para un futuro cercano, como en castellano.")
fx(19, "ti", TI, "preposizione", "Il treno parte da dieci minuti: sbrighiamoci!", "da", "tra",
   "Todavía no salió: «dentro de diez minutos» = *tra* (o *fra*) *dieci minuti*. *Da* sería "
   "que hace diez minutos que está saliendo.", good_alt=["fra"])
tr(19, "ti", TI, "Llegué hace dos meses y me voy dentro de un año.",
   _combo(["Sono arrivato", "Sono arrivata"], " due mesi fa e ", ["parto", "partirò", "riparto", "ripartirò", "me ne vado", "me ne andrò"], [" tra un anno", " fra un anno"]),
   "Las dos caras del tiempo: hacia atrás, *fa* (detrás del número); hacia adelante, *tra* / *fra*.")

# ===========================================================================
# 2-3. Verbo / adjetivo + a / di + infinitivo (lección 22)
# ===========================================================================
RE = "verbi e preposizioni"
REG = ("Entre verbo e infinitivo: con **a** *cominciare, continuare, riuscire, provare, imparare, "
       "aiutare*; con **di** *finire, smettere, cercare, decidere, ricordarsi, dimenticarsi, sperare*; "
       "sin nada los modales, *preferire* y *piacere*.")
ADJ = ("Adjetivos de estado + **di** (*contento, stanco, sicuro, capace di*); de disposición + **a** "
       "(*pronto, abituato, disposto, interessato a*).")

cz(22, "re", RE, es("Decidí irme mañana."), "Ho deciso ___ partire domani.", "di",
   "«Decidí irme»: el castellano no pone nada, el italiano pone *di*. " + REG)
cz(22, "re", RE, es("No logro abrir la puerta."), "Non riesco ___ aprire la porta.", "ad",
   "*riuscire a*; delante de vocal (sobre todo *a*) se suele escribir *ad*: *riesco ad aprire*.",
   alt=["a"])
cz(22, "re", RE, es("Sigue lloviendo."), "Continua ___ piovere.", "a",
   "«Seguir + -ndo» = *continuare a* + infinitivo. No *continua piovendo*: el gerundio no va acá.")
cz(22, "re", RE, es("Dejé de fumar hace dos años."), "Ho smesso ___ fumare due anni fa.", "di",
   "*smettere di* (dejar de). Y fijate el *fa* detrás del número: ya pasó.")
ch(22, "re", RE, "«Prefiero quedarme en casa.»",
   ["Preferisco restare a casa.", "Preferisco di restare a casa.", "Preferisco a restare a casa."],
   "Preferisco restare a casa.",
   "*preferire*, como los modales (*voglio, posso, devo*), va **sin** preposición. " + REG)
tr(22, "re", RE, "Decidí estudiar italiano.",
   ["Ho deciso di studiare italiano", "Ho deciso di studiare l'italiano"],
   "*decidere di* + infinitivo. «Decidí estudiar» no lleva nada en castellano: por eso se olvida.")
tr(22, "re", RE, "Tratá de dormir un poco.",
   ["Cerca di dormire un po'", "Prova a dormire un po'", "Cerca di dormire un pochino"],
   "«Tratar de» = *cercare di*; «intentar» también es *provare a*. Fijate: *di* con uno, *a* con el otro.")
tr(22, "re", RE, "Espero verte pronto.",
   ["Spero di vederti presto", "Spero di vederti presto!", "Spero di rivederti presto"],
   "*sperare di* + infinitivo cuando el sujeto es el mismo (yo espero, yo te veo).")
fx(22, "re", RE, "preposizione", "Non sono riuscito di finire il lavoro.", "di", "a",
   "*riuscire a* (lograr): *non sono riuscito a finire*. " + REG)
fx(22, "re", RE, "preposizione", "Ho cominciato di studiare a settembre.", "di", "a",
   "*cominciare a*, como «empezar a». El error sale de mezclarlo con *finire di*.")
fx(22, "re", RE, "preposizione", "Mi sono dimenticato a chiamarti, scusa!", "a", "di",
   "*dimenticarsi di* (olvidarse de): *mi sono dimenticato di chiamarti*.")
tr(22, "re", RE, "Sigo pensando en vos.",
   ["Continuo a pensare a te", "Penso ancora a te", "Continuo a pensarti"],
   "Dos *a*: *continuare a* + infinitivo y *pensare a qualcuno* (pensar **en**).")
# adjetivos
fx(22, "re", RE, "preposizione", "Sono interessato in questo corso.", "in", "a",
   "«Interesado **en**» = *interessato **a***. " + ADJ)
fx(22, "re", RE, "preposizione", "Siamo molto contenti con te, bravo!", "con", "di",
   "«Contento con» es un calco: *contento di* (*sono contento di te*, *del risultato*). " + ADJ)
fx(22, "re", RE, "preposizione", "Sono stanco da aspettare: andiamo!", "da", "di",
   "«Cansado de esperar» = *stanco di aspettare*. *Da* no va con estos adjetivos. " + ADJ)
cz(22, "re", RE, es("¿Estás listo para salir?"), "Sei pronto ___ partire?", "a",
   "*pronto a* + infinitivo (dispuesto a hacerlo); *pronto per* también se dice mucho. " + ADJ, alt=["per"])
cz(22, "re", RE, es("Estoy segura de tener razón."), "Sono sicura ___ avere ragione.", "di",
   "*sicuro di* + infinitivo cuando el sujeto es el mismo. " + ADJ)
tr(22, "re", RE, "Estoy cansado de esperar.",
   ["Sono stanco di aspettare", "Sono stanca di aspettare"],
   "*stanco di* + infinitivo, nunca *da*. " + ADJ)
tr(22, "re", RE, "Me alegra mucho verte.",
   ["Sono molto contento di vederti", "Sono molto contenta di vederti",
    "Sono contentissimo di vederti", "Sono contentissima di vederti", "Mi fa molto piacere vederti"],
   "«Me alegra» + verbo se dice con *contento di* + infinitivo: *sono contento di vederti*.")

# vuelta: 24, 25, 26
cz(24, "re", RE, es("Intenté llamarte pero no contestabas."), "Ho provato ___ chiamarti, ma non rispondevi.", "a",
   "*provare a* (intentar). Con *cercare* sería *di*: *ho cercato di chiamarti*. " + REG)
fx(24, "re", RE, "preposizione", "Ho bisogno a parlarti di una cosa.", "a", "di",
   "*avere bisogno di* (necesitar), como *avere voglia di*, *avere paura di*.")
tr(24, "re", RE, "Me olvidé de comprar el pan.",
   ["Mi sono dimenticato di comprare il pane", "Mi sono dimenticata di comprare il pane",
    "Ho dimenticato di comprare il pane", "Mi sono scordato di comprare il pane",
    "Mi sono scordata di comprare il pane"],
   "*dimenticarsi di* / *dimenticare di* + infinitivo: siempre *di*.")
ch(24, "re", RE, "«Quiero aprender a cocinar.»",
   ["Voglio imparare a cucinare.", "Voglio di imparare a cucinare.", "Voglio imparare di cucinare."],
   "Voglio imparare a cucinare.",
   "Dos verbos, dos reglas: *volere* sin nada; *imparare a*. " + REG)

tr(25, "re", RE, "Espero poder venir.",
   ["Spero di poter venire", "Spero di potere venire"],
   "Mismo sujeto (yo espero, yo vengo): *sperare di* + infinitivo, no *che* + congiuntivo. "
   "*poter* pierde la *-e* delante de otro infinitivo, pero *potere* también vale.")
cz(25, "re", RE, es("Estoy acostumbrada a levantarme temprano."), "Sono abituata ___ alzarmi presto.", "ad",
   "*abituato a* + infinitivo; delante de vocal, *ad*. " + ADJ, alt=["a"])
fx(25, "re", RE, "preposizione", "Ti prometto a tornare presto.", "a", "di",
   "*promettere di* (prometer): *ti prometto di tornare*. " + REG)

fx(26, "re", RE, "preposizione", "Abbiamo deciso a partire domani mattina.", "a", "di",
   "*decidere di* + infinitivo. (*Decidersi a* existe, pero es «decidirse»: *ci siamo decisi a partire*.)")
tr(26, "re", RE, "No logro entender esta regla.",
   ["Non riesco a capire questa regola"],
   "*riuscire a*. " + REG)
cz(26, "re", RE, es("¡Dejá de quejarte!"), "Smetti ___ lamentarti!", "di",
   "*smettere di*: con imperativo también.")
ch(26, "re", RE, "«Es capaz de hacerlo solo.»",
   ["È capace di farlo da solo.", "È capace a farlo da solo.", "È capace da farlo da solo."],
   "È capace di farlo da solo.", "*capace di* + infinitivo. " + ADJ)

# ===========================================================================
# 4. Locuciones de lugar (lección 17)
# ===========================================================================
LU = "preposizioni di luogo"
LUN = ("«Cerca de» = *vicino a*; «lejos de» = *lontano da*; «al lado de» = *accanto a*; "
       "«enfrente de» = *di fronte a*; «delante de» = *davanti a*. La última preposición se "
       "funde con el artículo.")

cz(17, "lu", LU, es("La farmacia está al lado del banco."), "La farmacia è ___ alla banca.", "accanto",
   "«Al lado de» = *accanto a*: *accanto alla banca*. " + LUN)
cz(17, "lu", LU, es("Vivo cerca del centro."), "Abito ___ centro.", "vicino al",
   "«Cerca **de**» = *vicino **a***, y *a* + *il* = *al*. " + LUN)
cz(17, "lu", LU, es("El mar está lejos de la ciudad."), "Il mare è lontano ___ città.", "dalla",
   "«Lejos de» = *lontano da*: *da* + *la* = *dalla*. " + LUN)
cz(17, "lu", LU, es("Nos vemos frente al cine a las nueve."), "Ci vediamo ___ cinema alle nove.", "davanti al",
   "«Frente a» se dice *davanti a* o *di fronte a*: *davanti al cinema*.", alt=["di fronte al"])
tr(17, "lu", LU, "Vivo lejos del centro.",
   _combo(["Abito", "Vivo"], " lontano dal centro"),
   "*lontano da* + *il* = *lontano dal*. Nunca *lontano del*. " + LUN)
tr(17, "lu", LU, "El baño está al fondo del pasillo.",
   ["Il bagno è in fondo al corridoio", "Il bagno è alla fine del corridoio"],
   "«Al fondo de» = *in fondo a*: *in fondo al corridoio*.")
tr(17, "lu", LU, "Te espero frente a la estación.",
   _combo("Ti aspetto ", ["davanti alla", "di fronte alla"], " stazione"),
   "*davanti a* / *di fronte a* + *la* = *alla*. " + LUN)
fx(17, "lu", LU, "preposizione", "La scuola è vicino della stazione.", "della", "alla",
   "«Cerca de» = *vicino a*: *vicino alla stazione*. *Vicino di* se usa solo en *il vicino di casa* (el vecino).")
fx(17, "lu", LU, "preposizione", "Il supermercato è lontano del centro.", "del", "dal",
   "«Lejos de» = *lontano da*: *lontano dal centro*. " + LUN)
fx(17, "lu", LU, "preposizione", "Il gatto dorme accanto del divano.", "del", "al",
   "«Al lado de» = *accanto a*: *accanto al divano*. " + LUN)
ch(17, "lu", LU, "In mezzo ___ piazza c'è una fontana.", ["alla", "della", "nella"], "alla",
   "«En el medio de» = *in mezzo a*: *in mezzo alla piazza*. El castellano pone «de»; el italiano, *a*.")
ch(17, "lu", LU, "«El libro está abajo de la cama.»",
   ["Il libro è sotto il letto.", "Il libro è sotto del letto.", "Il libro è sotto da letto."],
   "Il libro è sotto il letto.",
   "*sotto, sopra, dietro* suelen ir sin preposición delante de un sustantivo: *sotto il letto*.")

# vuelta: 19, 21, 26
tr(19, "lu", LU, "La parada está cerca de mi casa.",
   ["La fermata è vicino a casa mia", "La fermata è vicina a casa mia"],
   "*vicino a casa mia*: sin artículo, porque *casa mia* no lo lleva. " + LUN)
fx(19, "lu", LU, "preposizione", "Il parcheggio è di fronte del supermercato.", "del", "al",
   "«Enfrente de» = *di fronte a*: *di fronte al supermercato*. " + LUN)
tr(21, "lu", LU, "¿El correo? Está al lado del banco.",
   ["La posta? È accanto alla banca", "La posta? È proprio accanto alla banca",
    "L'ufficio postale? È accanto alla banca"],
   "*accanto a* + *la* = *accanto alla*. Y para ubicar una cosa, *essere*: *è accanto alla banca*.")
fx(21, "lu", LU, "preposizione", "Ci vediamo davanti del museo?", "del", "al",
   "*davanti a*: *davanti al museo*. " + LUN)
fx(26, "lu", LU, "preposizione", "Abitiamo lontano della città, in campagna.", "della", "dalla",
   "*lontano da*: *lontano dalla città*. " + LUN)
tr(26, "lu", LU, "Hay un árbol en el medio del patio.",
   ["C'è un albero in mezzo al cortile", "In mezzo al cortile c'è un albero"],
   "*In mezzo a* se contrae con el artículo: *in mezzo al cortile*. Y «hay» con un singular es *c'è*, no «ha».")

# ===========================================================================
# 5. andare / venire, portare / prendere (lección 14)
# ===========================================================================
DE = "andare venire"
DEN = ("Si vas **hacia donde está el otro** (el que habla o el que escucha), *venire*, aunque en "
       "castellano digas «voy». *Andare* es ir a un tercer lugar.")
PPN = ("*portare* = llevar **y** traer; *prendere* = tomar, agarrar, ir a buscar: *ti vengo a "
       "prendere* (te paso a buscar).")

ch(14, "de", DE, "Vieni alla festa sabato? — Sì, ___!", ["vengo", "vado", "ci vado"], "vengo",
   "Te invitan a donde está el otro: *Sì, vengo!* «Sì, vado» o «ci vado» suenan a que te vas a otro lado. " + DEN)
tr(14, "de", DE, "Esta noche voy a tu casa.",
   ["Stasera vengo da te", "Stasera vengo a casa tua", "Stasera vengo a casa da te"],
   "Vas hacia el que te escucha: *vengo da te*. " + DEN)
tr(14, "de", DE, "Traé el vino.",
   ["Porta il vino", "Porta il vino tu", "Porta tu il vino", "Porta del vino"],
   "«Traer» y «llevar» son el mismo verbo: *portare*. " + PPN, prompt=ctx("Stasera vengo a cena da te. Cosa porto?"))
tr(14, "de", DE, "Te paso a buscar a las ocho.",
   ["Ti vengo a prendere alle otto", "Vengo a prenderti alle otto", "Passo a prenderti alle otto",
    "Ti passo a prendere alle otto"],
   "«Pasar a buscar» = *venire* (o *passare*) *a prendere*. " + PPN)
fx(14, "de", DE, "lessico", "Vieni al cinema con noi? — Sì, vado volentieri!", "vado", "vengo",
   "La pregunta es *vieni*: vas con los que te invitan, *vengo*. " + DEN)
cz(14, "de", DE, es("Traeme un vaso de agua, por favor."), "___ un bicchiere d'acqua, per favore.", "Portami",
   "*portare* también es «traer»: *portami*. " + PPN, alt=["Mi porti"])
ch(14, "de", DE, "Domani ___ a Firenze con mia sorella.", ["vado", "vengo", "porto"], "vado",
   "Florencia es un tercer lugar (ni el que habla ni el que escucha están ahí): *andare*. " + DEN,
   prompt="Se lo contás a un amigo, en Roma. ¿Cuál está bien?")

tr(16, "de", DE, "Sí, voy.",
   ["Sì, vengo", "Sì, vengo!", "Sì, vengo volentieri", "Sì, vengo anch'io"],
   "Te invitan a ir con ellos: *vengo*. " + DEN, prompt=ctx("Vieni con noi al mare domenica?"))
fx(16, "de", DE, "lessico", "Ieri sono andato da te, ma non c'eri.", "andato", "venuto",
   "Se lo decís al que vive ahí: fuiste hacia él, *sono venuto da te* (o *sono passato*). " + DEN,
   good_alt=["venuta", "passato", "passata"])
ch(17, "de", DE, "Alle quattro, quando escono, vado a ___ i bambini a scuola.",
   ["prendere", "portare", "venire"], "prendere",
   "Ir a buscar a alguien = *andare a prendere*. *Portare i bambini a scuola* sería llevarlos a la mañana. " + PPN)
tr(19, "de", DE, "Mañana voy a tu oficina y te llevo los documentos.",
   _combo("Domani ", ["vengo", "verrò"], [" nel tuo ufficio", " in ufficio da te", " da te in ufficio"],
          " e ti ", ["porto", "porterò"], " i documenti"),
   "Vas hacia el otro: *vengo*; y le llevás algo: *ti porto*. " + DEN)
fx(31, "de", DE, "lessico", "Aspettami lì, tra cinque minuti ti vado a prendere!", "vado", "vengo",
   "Vas hacia el que te espera: *ti vengo a prendere*. " + DEN)

# ===========================================================================
# 6. Registro escrito: carta informal (31) y aperturas formales (42)
# ===========================================================================
RG = "registro"
CARA = ("A un amigo: *Caro* / *Cara* + nombre (concuerda con quien lo recibe) y cierre afectuoso "
        "(*un abbraccio*, *a presto*). *Gentile*, *Egregio* y *Distinti saluti* son del registro formal.")

ch(31, "rg", RG, "Le escribís a tu amiga Sara:", ["Cara Sara,", "Caro Sara,", "Egregia Sara,"], "Cara Sara,",
   "*Cara* concuerda con Sara. *Egregia* es muy formal. " + CARA, prompt="Elegí cómo empezar el mensaje.")
fx(31, "rg", RG, "accordo", "Caro Giulia, grazie per il regalo!", "Caro", "Cara",
   "*Caro* es un adjetivo: concuerda con quien recibe el mensaje (*Cara Giulia*, *Cari ragazzi*).")
tr(31, "rg", RG, "Un abrazo y hasta pronto.",
   ["Un abbraccio e a presto", "Un abbraccio e a presto!", "Un abbraccio, a presto"],
   "Cierre de un mensaje a un amigo. «Hasta pronto» = *a presto*. " + CARA)
ch(33, "rg", RG, "Fine del messaggio a tuo fratello:", ["Un abbraccio!", "Distinti saluti", "Cordiali saluti"],
   "Un abbraccio!", "A la familia y a los amigos, *un abbraccio*. Las otras dos son cierres de mail formal. " + CARA,
   prompt="Elegí cómo cerrar.")
APE = ("Aperturas formales: *Gentile* + Signora / Dottoressa / Professore (la más usada); *Egregio* "
       "(muy formal, a un hombre); *Spettabile* (*Spett.le*) a una empresa o una oficina.")
ch(42, "rg", RG, "Mail a una empresa: «___ Ditta Rossi,»", ["Spettabile", "Gentile", "Cara"], "Spettabile",
   "A una empresa o una oficina: *Spettabile* (*Spett.le*). " + APE, prompt="Elegí la apertura.")
ch(42, "rg", RG, "Mail a la doctora Bianchi, a la que no conocés:",
   ["Gentile Dottoressa Bianchi,", "Cara Dottoressa Bianchi,", "Spettabile Dottoressa Bianchi,"],
   "Gentile Dottoressa Bianchi,", "A una persona: *Gentile*. *Cara* es de confianza; *Spettabile*, "
   "para empresas. " + APE, prompt="Elegí la apertura.")
tr(42, "rg", RG, "Estimada señora Ferri: le escribo para pedirle una información.",
   _combo("Gentile ", ["Signora", "Sig.ra"], " Ferri, Le scrivo per ", ["chiederLe", "chiederle"], [" un'informazione", " un'informazione.", " una informazione"]),
   "Apertura con *Gentile*, coma (no dos puntos) y el pronombre de cortesía *Le*, con mayúscula en "
   "el mail formal. " + APE)
ch(44, "rg", RG, "Carta a un abogado, muy formal:",
   ["Egregio Avvocato,", "Caro Avvocato,", "Spettabile Avvocato,"], "Egregio Avvocato,",
   "*Egregio* es la apertura más formal para un hombre (con una mujer, mejor *Gentile*). " + APE,
   prompt="Elegí la apertura.")

# ===========================================================================
# 7. Diminutivos y aumentativos (lección 23)
# ===========================================================================
AL = "alterati"
ALN = ("*-ino* y *-etto* achican o dan cariño; *-one* agranda (y vuelve masculino al femenino: "
       "*il portone*); *-accio* critica. No todo sustantivo los acepta todos.")
FA = "Formá el alterado."

cz(23, "al", AL, FA + " «gatto → gatito»", "Abbiamo un ___ nero.", "gattino", "*gatto* + *-ino*. " + ALN)
cz(23, "al", AL, FA + " «casa → casita»", "Vivono in una ___ al mare.", "casetta",
   "Lo común es *casetta*; *casina* se oye en el centro de Italia. *Casino* es un lío. " + ALN, alt=["casina"])
cz(23, "al", AL, FA + " «tempo → tiempo horrible»", "Che ___! Piove da tre giorni.", "tempaccio",
   "*-accio* da un juicio negativo: *tempaccio*. " + ALN)
cz(23, "al", AL, FA + " «parola → malas palabras (plural)»", "Non dire ___ davanti ai bambini!", "parolacce",
   "*parolaccia*, plural *parolacce*: palabra fea. " + ALN)
ch(23, "al", AL, "«¡Qué lío!»", ["Che casino!", "Che casetta!", "Che casona!"], "Che casino!",
   "*Casino* no es una casa chica: es un lío (y, en registro bajo, un quilombo). " + ALN, prompt="¿Cómo se dice?")
tr(23, "al", AL, "Tenemos un gatito.", ["Abbiamo un gattino", "Abbiamo un micino"],
   "*gattino*: el *-ito* castellano no se calca, se elige el sufijo. " + ALN)
tr(23, "al", AL, "¿Me esperás un segundito?",
   ["Mi aspetti un attimino?", "Mi aspetti un attimo?", "Mi aspetti un momentino?", "Mi aspetti un momento?",
    "Mi aspetti un secondino?", "Mi aspetti un secondo?"],
   "*un attimino* (o *un momentino*): el diminutivo suaviza el pedido, como en castellano.")
fx(23, "al", AL, "lessico", "Ho letto un libraccio di mille pagine: bellissimo!", "libraccio", "librone",
   "*-accio* critica: *libraccio* es un libro malo. Para «enorme» va *-one*: *librone*. " + ALN)

ch(25, "al", AL, "Ha scritto un ___ di ottocento pagine, ma si legge bene.",
   ["librone", "libraccio", "libretto"], "librone",
   "Grande y sin crítica: *-one*. *Libraccio* sería un libro malo; *libretto*, uno chico. " + ALN)
tr(25, "al", AL, "Hoy tuve un día de porquería.",
   ["Oggi ho avuto una giornataccia", "Oggi ho passato una giornataccia", "Ho avuto una giornataccia oggi",
    "Che giornataccia ho avuto oggi", "Che giornataccia oggi"],
   "*giornata* + *-accia* = *giornataccia*. " + ALN)
cz(27, "al", AL, FA + " «casa → casita»", "Hanno comprato una ___ in campagna.", "casetta",
   "*casetta*, no *casita*. " + ALN, alt=["casina"])
fx(27, "al", AL, "accordo", "Abitano in un palazzo con una portone verde.", "una", "un",
   "*-one* vuelve masculino: *la porta → il portone*, así que *un portone verde*. " + ALN)
ch(48, "al", AL, "«Il fumetto»", ["la historieta", "un humo chico", "un fumador"], "la historieta",
   "*fumetto* nació de *fumo* (el globito de humo donde hablan los personajes), pero hoy es palabra propia: la historieta.",
   prompt=QQ)
tr(49, "al", AL, "Tiene un auto enorme.",
   ["Ha una macchinona", "Ha una macchina enorme", "Ha un macchinone", "Ha una macchina grandissima"],
   "*macchina* + *-one*: *macchinona* (en el habla, también *macchinone*). " + ALN)
ch(51, "al", AL, "Quando gli ho detto di no, ha fatto una ___ davanti a tutti.",
   ["figuraccia", "figurona", "figurina"], "figuraccia",
   "*fare una figuraccia* = quedar mal; *una figurona*, quedar muy bien; *la figurina* es una figurita.")

# ===========================================================================
# 8. Palabras compuestas y s- de «sacar» (46)
# ===========================================================================
CO = "composizione"
CON = ("Verbo + sustantivo nombra el objeto que hace algo. En plural, si el sustantivo ya es "
       "plural no cambia (*i portachiavi*); si es singular en *-o*, cambia (*i grattacieli*).")
SN = "*s-* delante de un verbo puede significar «sacar, quitar»: *sbucciare* (pelar), *scongelare*, *smontare*."

cz(46, "co", CO, "Formá el compuesto: «porta + chiavi = llavero».", "Ho perso il ___.", "portachiavi", CON)
cz(46, "co", CO, "Formá el compuesto: «apri + bottiglie = destapador».", "Dov'è l'___?", "apribottiglie", CON)
cz(46, "co", CO, "Pasá al plural.", "il portachiavi → i ___", "portachiavi",
   "Verbo + sustantivo nombra el objeto que hace algo. *Chiavi* ya es plural, así que el compuesto no "
   "cambia: *i portachiavi*, como *gli apribottiglie*.")
cz(46, "co", CO, "Pasá al plural.", "il grattacielo → i ___", "grattacieli",
   "*cielo* está en singular y el compuesto termina en *-o*: cambia la última vocal. " + CON)
cz(46, "co", CO, "Pasá al plural.", "l'asciugamano → gli ___", "asciugamani",
   "*mano* está en singular y *asciugamano* termina en *-o*: *gli asciugamani*. " + CON)
tr(46, "co", CO, "¿Dónde está el secador de pelo?",
   ["Dov'è l'asciugacapelli?", "Dove è l'asciugacapelli?", "Dov'è il phon?", "Dov'è il fon?"],
   "*asciuga* + *capelli* = *l'asciugacapelli* (también *il phon*). " + CON)
cz(46, "co", CO, es("Antes de cocinarlas, tenés que pelar las papas."), "Prima di cucinarle, devi ___ le patate.",
   "sbucciare", SN + " *buccia* es la cáscara: *s-* + *buccia* = sacar la cáscara.", alt=["pelare"])
tr(46, "co", CO, "Para la mudanza hay que desarmar la cama.",
   _combo(["Per il trasloco ", ""], ["bisogna", "dobbiamo", "devo", "si deve"], " smontare il letto") +
   _combo(["Bisogna", "Dobbiamo", "Devo"], " smontare il letto per il trasloco"),
   SN + " *montare* es armar; *smontare*, desarmar.")
cz(46, "co", CO, es("El pollo está en el freezer: lo tengo que descongelar."), "Il pollo è nel freezer: lo devo ___.",
   "scongelare", SN)
ch(48, "co", CO, "il cavatappi", ["el sacacorchos", "el destapador", "el abrelatas"], "el sacacorchos",
   "*cava* (saca) + *tappi* (corchos). El destapador es *l'apribottiglie*; el abrelatas, *l'apriscatole*. " + CON,
   prompt=QQ)
tr(48, "co", CO, "Perdí el llavero.", ["Ho perso il portachiavi", "Ho perso il mio portachiavi"], CON)
fx(50, "co", CO, "accordo", "A Milano hanno costruito due nuovi grattacielo.", "grattacielo", "grattacieli",
   "*cielo* está en singular y termina en *-o*: *i grattacieli*. Los que no cambian son los de sustantivo plural (*i portachiavi*). " + CON)

# ===========================================================================
# 9. Préstamos (48) y reconocer el italiano regional (26, 36, 37)
# ===========================================================================
PR = "prestiti"
PRN = ("Los préstamos del inglés y del latín no llevan *-s* en plural: *i computer*, *i weekend*, "
       "*i curriculum*. El género suele copiar el de la palabra italiana (*la mail*, como *la posta*).")

cz(48, "pr", PR, es("Compré dos computadoras nuevas."), "Ho comprato due ___ nuovi.", "computer", PRN)
fx(48, "pr", PR, "accordo", "Abbiamo passato due weekends al mare.", "weekends", "weekend", PRN)
fx(48, "pr", PR, "accordo", "Ti mando un mail stasera con tutti i dettagli.", "un", "una",
   "*la mail* es femenina (como *la posta*), aunque en castellano digas «el mail». También se oye *un'email*.")
tr(48, "pr", PR, "Mandé el currículum a cinco empresas.",
   _combo("Ho ", ["mandato", "inviato", "spedito"], " il curriculum a cinque aziende"), PRN)
ch(48, "pr", PR, "«Un bono por única vez.»", ["un bonus una tantum", "un bonus ad hoc", "un bonus pro capite"],
   "un bonus una tantum",
   "Son latinismos que el italiano usa mucho en la administración: *una tantum* es «por única vez»; *ad hoc*, «hecho para eso»; *pro capite*, «por persona».",
   prompt="¿Cómo se dice?")
ch(49, "pr", PR, "Il reddito ___ è salito del due per cento.", ["pro capite", "una tantum", "ad hoc"], "pro capite",
   "*pro capite* = per cápita, por persona. " + PRN)

IT = "italiano regionale"
STD = "Lo oís en el sur o en la charla. ¿Cómo se dice en italiano estándar?"
ITN = ("En el sur, *tenere* y *stare* invaden *avere* y *essere* (*tengo fame*, *sto stanco*), "
       "como en castellano. Reconocelo al oír; vos usá el estándar.")
ch(27, "it", IT, "«Sto stanco.»", ["Sono stanco.", "Ho stanco.", "Sto stanco."], "Sono stanco.", ITN, prompt=STD)
ch(27, "it", IT, "«Tengo fame.»", ["Ho fame.", "Sono fame.", "Tengo fame."], "Ho fame.", ITN, prompt=STD)
ch(38, "it", IT, "«Noi si va al mare domani.»", ["Noi andiamo al mare domani.", "Noi si andiamo al mare domani.",
                                                  "Noi va al mare domani."],
   "Noi andiamo al mare domani.",
   "*Noi si va* es toscano: *si* + 3.ª persona por *noi*. En el estándar, *andiamo*.",
   prompt="Lo oís en Florencia. ¿Cómo se dice en italiano estándar?")
ch(38, "it", IT, "«Stamattina andai al mercato.»",
   ["Stamattina sono andato al mercato.", "Stamattina andavo al mercato.", "Stamattina vado al mercato."],
   "Stamattina sono andato al mercato.",
   "En el sur el *passato remoto* se usa también para hoy; en el estándar, un hecho de esta mañana va en *passato prossimo*.",
   prompt=STD)
ch(48, "it", IT, "«Ci ho fame, mangiamo?»", ["Ho fame, mangiamo?", "Ne ho fame, mangiamo?", "Ci ho fame, mangiamo?"],
   "Ho fame, mangiamo?",
   "*Ci ho* es el *ci* de apoyo del habla: en un texto, *ho fame*. " + ITN, prompt=STD)
ch(51, "it", IT, "«Sto preoccupato per l'esame.»",
   ["Sono preoccupato per l'esame.", "Ho preoccupato per l'esame.", "Sto preoccupato per l'esame."],
   "Sono preoccupato per l'esame.", "Un estado de ánimo va con *essere*. " + ITN, prompt=STD)
