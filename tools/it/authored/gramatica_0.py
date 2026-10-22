# -*- coding: utf-8 -*-
"""Auditoría de gramática 2026-10, área 0 (el verbo): producción y vuelta espaciada.

Lo que la auditoría marcó como «mejorable» o «falta» en presente irregular,
passato prossimo, futuro, imperativo y tiempos del relato:

1. essere o stare: fixerr y traducciones en la 8, 10, 13 y 26 (el duelo
   «essere o stare» abre en la 6, en docs/lang/it/duelli_data.js).
2. sapere o potere (saber hacer / poder): 6 y 8, vuelve en 10 y 13.
3. Doble auxiliar con cominciare y correre (lección 11): 13, 16 y 26.
4. Futuro de suposición (avrà perso il treno): 19, 26, 39 y 51, mezclado
   con el condizionale de la noticia no confirmada.
5. Imperativo de tu / voi, afirmativo y negativo, en instrucciones: 26 y 39
   (el duelo «imperativo: tu o Lei» abre en la 12).
6. Formas cortas con pronombre (dammi, fammi, dagli, vacci): 12, 13, 22, 26.
7. Concordancia de Lei y el *La* formal (lección 20): 20, 26 y 48.
8. Negativo de tu con pronombre (non dirmelo / non me lo dire): 22 y 26.
9. Presente histórico e imperfetto de crónica (lección 48): 48, 49 y 51.

Prefijo de los ids: gr0-<semana>-<n>.
"""
import re
from itertools import product

TR = "Traducí al italiano."
FX = "Trova l'errore: tocá la palabra que está mal y corregila."
CH = "¿Cuál está bien?"

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
    d = dict(id="gr0-%d-%02d" % (w, _N[w]), w=w, level=LEVEL[w], type=typ, topic=topic,
             prompt=prompt, stem=stem, answer=answer, note=note)
    if clean:
        d["alt"] = clean
    d.update(extra)
    ITEMS.append(d)
    return d


def tr(w, topic, stem, variants, note, prompt=TR):
    """translate: la primera variante es la respuesta; el resto, alt (y, si
    hay dos puntos, la misma con coma: la puntuación interna cuenta)."""
    more = [v.replace(": ", ", ") for v in variants if ": " in v]
    return _add(w, "translate", topic, prompt, stem, variants[0], note, variants[1:] + more)


def fx(w, topic, cat, stem, bad, good, note, good_alt=None, prompt=FX):
    pat = r"(?<!\w)" + re.escape(bad) + r"(?!\w)"
    assert len(re.findall(pat, stem)) == 1, (stem, bad)
    swap = lambda g: re.sub(pat, lambda m: g, stem, count=1)  # noqa: E731
    d = _add(w, "fixerr", topic, prompt, stem, swap(good), note,
             [swap(g) for g in good_alt or []], cat=cat, bad=bad, good=good)
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
# 1. essere o stare (lección 6)
# ===========================================================================
ES = "essere stare"
ES_N = ("*stare* es «estar» sobre todo para la salud (*sto bene*) y para «quedarse» "
        "(*sto a casa*). Estados, cualidades y ubicación van con *essere*.")

fx(8, ES, "lessico", "Oggi sto stanco, vado a letto presto.", "sto", "sono",
   "«Estoy cansado» = *sono stanco*. " + ES_N)
ch(10, ES, "Il museo ___ in centro, vicino al Duomo.", ["è", "sta", "c'è"], "è",
   "Dónde está algo que ya nombraste: *essere* (*il museo è in centro*). *C'è* presenta algo "
   "nuevo (*in centro c'è un museo*); *sta*, para cosas, es regional.")
fx(13, ES, "lessico", "La mia camera sta al secondo piano.", "sta", "è",
   "Dónde está una cosa: *essere*. «Está en el segundo piso» = *è al secondo piano*. " + ES_N)
tr(13, ES, "Estoy muy cansada, pero estoy bien.",
   _combo(["Sono molto stanca", "Sono stanchissima"], [", ma sto bene", " ma sto bene"]),
   "Dos «estoy» que el italiano separa: el estado (*sono stanca*) y la salud (*sto bene*).")
fx(26, ES, "lessico", "Sto preoccupato per l'esame di domani.", "Sto", "Sono",
   "Preocupado, contento, nervioso: estados de ánimo, *essere*. " + ES_N)
tr(26, ES, "Esta noche me quedo en casa: no me siento bien.",
   _combo("Stasera ", ["sto", "rimango", "resto"], " a casa: non mi sento bene") +
   _combo("Stasera ", ["sto", "rimango", "resto"], " a casa: non sto bene") +
   _combo("Stasera ", ["sto", "rimango", "resto"], " a casa perché non ", ["mi sento", "sto"], " bene"),
   "«Quedarse» puede ser *stare*, *rimanere* o *restare*; la salud también es *stare*: *non sto bene*.")

# ===========================================================================
# 2. sapere o potere (lección 6)
# ===========================================================================
SP = "sapere potere"
SP_N = ("*sapere* + infinitivo = saber hacer algo, una habilidad aprendida (*so nuotare*). "
        "*potere* = poder: te dejan o estás en condiciones (*oggi non posso nuotare*).")
SP_P = "Modales: ¿sapere o potere?"

ch(6, SP, "Mio figlio ha cinque anni e ___ già leggere.", ["sa", "può", "conosce"], "sa",
   "Leer es algo que se aprende: *sa leggere*. " + SP_N, prompt=SP_P)
ch(6, SP, "Scusi, ___ entrare?", ["posso", "so", "conosco"], "posso",
   "Pedís permiso: *posso entrare?* «¿Sé entrar?» no tiene sentido. " + SP_N, prompt=SP_P)
ch(6, SP, "Non ___ nuotare, ma voglio imparare.", ["so", "posso", "sa"], "so",
   "Querés aprender porque te falta la habilidad: *non so nuotare*. " + SP_N, prompt=SP_P)
ch(6, SP, "Oggi non ___ nuotare: ho la febbre.", ["posso", "so", "sa"], "posso",
   "Sabés nadar, pero hoy no estás en condiciones: *non posso*. " + SP_N, prompt=SP_P)
tr(8, SP, "No sé manejar.", ["Non so guidare", "Io non so guidare"],
   "Una habilidad que no aprendiste: *non so guidare*. *Non posso guidare* sería que hoy no "
   "podés (no tenés el auto, te lo prohibieron). Y «manejar» es *guidare*.")
tr(8, SP, "Hoy no puedo manejar: no tengo el auto.",
   _combo("Oggi non posso guidare: non ho ", ["la macchina", "l'auto", "la mia macchina"]),
   "Sabés manejar, pero hoy no es posible: *potere*. " + SP_N)
fx(10, SP, "lessico", "Mia sorella può cucinare molto bene: fa dei dolci buonissimi.", "può", "sa",
   "Cocinar bien es una habilidad: *sa cucinare*. *Può cucinare* sería que tiene permiso o "
   "tiempo para hacerlo.")
ch(13, SP, "Non ___ venire stasera: devo lavorare fino alle dieci.", ["posso", "so", "sa"], "posso",
   "No es que no sepas venir: no te da el tiempo. *Non posso*. " + SP_N, prompt=SP_P)
ch(13, SP, "Non ___ guidare: non ho mai preso lezioni.", ["so", "posso", "devo"], "so",
   "Nunca aprendiste: *non so guidare*. " + SP_N, prompt=SP_P)

# ===========================================================================
# 3. Doble auxiliar: cominciare, correre (lección 11)
# ===========================================================================
AUX = "ausiliare doppio"
AUX_N = ("*cominciare*, *finire*, *correre* tienen dos auxiliares: con objeto (o la actividad "
         "de correr), *avere*; si la cosa empieza o termina sola, o corrés hacia un lugar, *essere*.")

ch(13, AUX, "Il concerto ___ alle nove.", ["è cominciato", "ha cominciato", "è cominciata"],
   "è cominciato",
   "El concierto empieza solo, sin objeto: *essere*, y el participio concuerda con *il "
   "concerto*. " + AUX_N, prompt="Elegí el auxiliar.")
ch(13, AUX, "Ieri ___ un libro nuovo.", ["ho cominciato", "sono cominciato", "ho cominciata"],
   "ho cominciato",
   "Empezás algo (un libro): objeto directo, *avere*, y el participio no concuerda. " + AUX_N,
   prompt="Elegí el auxiliar.")
fx(16, AUX, "ausiliare", "Quando ha cominciato a piovere, ho corso a casa.", "ho corso", "sono corso",
   "Corrés hacia un lugar (*a casa*): *essere*. *Ho corso* va con la actividad: *ho corso "
   "dieci chilometri*.", good_alt=["sono corsa"])
tr(16, AUX, "Esta mañana corrí una hora en el parque.",
   _combo(["Stamattina", "Questa mattina"], " ho corso ", ["un'ora", "per un'ora"], " al parco") +
   _combo(["Stamattina", "Questa mattina"], " ho corso ", ["un'ora", "per un'ora"], " nel parco") +
   _combo(["Stamattina", "Questa mattina"], " ho corso ", ["al parco", "nel parco"], " per un'ora"),
   "Correr como actividad, sin destino: *avere* (*ho corso*). Con destino sería *sono corso a casa*.")
tr(26, AUX, "La clase empezó tarde y terminó a las ocho.",
   _combo("La lezione è ", ["cominciata", "iniziata"], [" tardi ", " in ritardo "], ["ed è", "e è"],
          [" finita", " terminata"], " alle otto"),
   "La clase empieza y termina sola: *essere* en los dos, y el participio en *-a* por *la "
   "lezione*. Con objeto sería *ho cominciato il corso*.")

# ===========================================================================
# 4. Futuro de suposición (lección 19)
# ===========================================================================
FP = "futuro probabilità"
FP_N = ("El futuro sirve para suponer: *sarà a casa* (estará en casa, supongo); el futuro "
        "anteriore, para suponer sobre el pasado: *avrà perso il treno*.")

tr(19, FP, "Habrá perdido el tren.",
   ["Avrà perso il treno", "Avrà perduto il treno", "Deve aver perso il treno", "Deve avere perso il treno"],
   "Suponés algo que ya pasó: futuro anteriore, *avrà perso*. Igual que «habrá perdido»: "
   "no es futuro, es «supongo que lo perdió».",
   prompt="Traducí al italiano (futuro de probabilidad).")
ch(26, FP, "Non risponde al telefono. — ___ in riunione.", ["Sarà", "Starà", "Sarebbe"], "Sarà",
   "Suposición sobre el presente: futuro de *essere*, *sarà*. *Sarebbe* es condizionale "
   "(una noticia no confirmada o una hipótesis), y la ubicación va con *essere*, no *stare*.")
tr(26, FP, "¿Quién será a esta hora?",
   ["Chi sarà a quest'ora?", "Chi sarà mai a quest'ora?", "Ma chi sarà a quest'ora?"],
   "Te preguntás algo que no sabés: futuro, *chi sarà?* Igual que en castellano.")
tr(26, FP, "Debe tener unos cuarenta años.",
   ["Avrà una quarantina d'anni", "Avrà quarant'anni", "Avrà circa quarant'anni",
    "Deve avere una quarantina d'anni", "Deve avere circa quarant'anni", "Deve avere quarant'anni",
    "Avrà sui quarant'anni"],
   "Para calcular una edad, el italiano usa el futuro (*avrà quarant'anni*) o *dovere* "
   "(*deve avere*). Y la edad, con *avere*.")
ch(39, FP, "Le luci sono spente: …",
   ["saranno già andati a dormire", "sarebbero già andati a dormire", "andranno già a dormire"],
   "saranno già andati a dormire",
   "Suponés algo que ya pasó: futuro anteriore (*saranno andati*). El condizionale "
   "(*sarebbero andati*) es la noticia no confirmada; *andranno* es futuro de verdad.")
tr(39, FP, "No contesta: se habrá quedado dormido.",
   _combo("Non risponde: si sarà ", ["addormentato", "addormentata"]) +
   _combo("Non risponde, si sarà ", ["addormentato", "addormentata"]),
   "Suposición sobre el pasado: futuro anteriore, con *essere* porque *addormentarsi* es "
   "reflexivo.")
fx(51, FP, "condizionale", "Paolo non è ancora arrivato: sarebbe nel traffico.", "sarebbe", "sarà",
   "Para suponer, futuro: *sarà nel traffico*. El condizionale (*sarebbe*) sirve para la noticia "
   "que no está confirmada (*secondo i giornali, sarebbe fuggito*), no para tu suposición.")
tr(51, FP, "¿Qué hora será? — Serán las once.",
   ["Che ore saranno? — Saranno le undici", "Che ora sarà? — Saranno le undici",
    "Che ore saranno? Saranno le undici", "Che ora sarà? Saranno le undici"],
   "Suposición sobre la hora: futuro en la pregunta y en la respuesta, como en castellano.")

# ===========================================================================
# 5. Imperativo de tu y voi en instrucciones (lección 12)
# ===========================================================================
IMP = "imperativo"
IMP_N = ("tu afirmativo: en *-are*, *-a* (*parla*); en *-ere/-ire*, igual que el presente. "
         "tu negativo: *non* + infinitivo. voi: igual que el presente, también en negativo.")

tr(26, IMP, "Tomá el paraguas y no te olvides las llaves.",
   _combo("Prendi l'ombrello e ", ["non dimenticare le chiavi", "non dimenticarti le chiavi",
                                   "non ti dimenticare le chiavi", "non scordarti le chiavi",
                                   "non ti scordare le chiavi"]),
   "Afirmativo de tu: *prendi*. Negativo de tu: *non* + infinitivo (*non dimenticare*), "
   "nunca «non dimentichi», que es de usted.")
tr(26, IMP, "Chicos, no hagan ruido: duerman un poco.",
   _combo("Ragazzi, non fate rumore: dormite ", ["un po'", "un pochino"]),
   "Con *voi*, el negativo es *non* + la forma de siempre (*non fate*); no hay infinitivo como en *tu*.")
fx(26, IMP, "imperativo", "Non mangia troppo, ti fa male!", "mangia", "mangiare",
   "*Non mangia* quiere decir «no come». Con *tu*, el negativo pide infinitivo: *non mangiare!*")
fx(26, IMP, "imperativo", "Paolo, aspetti un attimo, arrivo!", "aspetti", "aspetta",
   "A Paolo lo tuteás: en *-are*, el imperativo de tu termina en *-a* (*aspetta!*). *Aspetti* "
   "es de usted (o el presente «esperás»).")
tr(39, IMP, "Cortá la cebolla, ponela en la olla y no la dejes quemar.",
   _combo("Taglia la cipolla, mettila ", ["nella pentola", "in pentola"], " e ",
          ["non lasciarla bruciare", "non la lasciare bruciare", "non farla bruciare", "non la far bruciare"]),
   "Una receta de tu: *taglia*, *mettila* (pronombre pegado) y el negativo con infinitivo, "
   "con el pronombre pegado o delante: *non lasciarla / non la lasciare*.")
tr(39, IMP, "Seguí derecho y en el semáforo doblá a la izquierda.",
   _combo(["Vai", "Va'", "Prosegui", "Continua"], " ", ["dritto", "diritto"], " e al semaforo ",
          ["gira", "svolta"], " a sinistra"),
   "Indicaciones de tu: *vai / va' dritto*, *gira a sinistra*. De usted sería *vada dritto, giri a sinistra*.")
ch(39, IMP, "Ragazzi, ___ tardi stasera!", ["non tornate", "non tornare", "non tornino"], "non tornate",
   "Con *voi* el negativo es *non* + la forma de *voi* (*non tornate*). *Non tornare* es solo "
   "para *tu*; *non tornino*, para *loro* formal.")
cz(39, IMP, "Completá el imperativo negativo de tu (preoccuparsi).",
   "Non ___, ci penso io.", "preoccuparti",
   "Negativo de tu: *non* + infinitivo, con el pronombre pegado (*non preoccuparti*) o delante "
   "(*non ti preoccupare*).", alt=["ti preoccupare"])

# ===========================================================================
# 6. Formas cortas con pronombre: dammi, fammi, dagli, vacci (lección 12)
# ===========================================================================
CORTE = "imperativo forme corte"
CORTE_N = ("*da', fa', va', di', sta'* + pronombre duplican la consonante: *dammi, fammi, vacci, "
           "dimmi*. La única excepción es *gli*: *dagli*.")
CORTE_P = "Trova l'errore (forma corta del imperativo): tocá la palabra que está mal y corregila."

fx(12, CORTE, "imperativo_pronome", "Dami la mano, attraversiamo.", "Dami", "Dammi",
   CORTE_N, prompt=CORTE_P)
fx(12, CORTE, "imperativo_pronome", "Dimi tutto, ti ascolto.", "Dimi", "Dimmi",
   CORTE_N, prompt=CORTE_P)
fx(13, CORTE, "imperativo_pronome", "Fami sapere quando arrivi!", "Fami", "Fammi",
   CORTE_N + " *Fammi sapere* = avisame.", prompt=CORTE_P)
fx(13, CORTE, "imperativo_pronome", "Daggli il mio numero, per favore.", "Daggli", "Dagli",
   "Con *gli* no se duplica nada: *dagli*. Con los demás pronombres sí: *dammi, dalla, daccelo*.",
   prompt=CORTE_P)
fx(22, CORTE, "imperativo_pronome", "Vaci tu, io sono stanco.", "Vaci", "Vacci",
   CORTE_N + " *Vacci tu* = andá vos (*ci* = ahí).")
tr(22, CORTE, "Hacelo vos, yo no tengo tiempo.",
   ["Fallo tu, io non ho tempo", "Fallo tu: io non ho tempo", "Fallo tu, non ho tempo"],
   "*Fa'* + *lo* = *fallo*, con doble *l*. Y el «vos» enfático va detrás: *fallo tu*.")
PEGA = "Pasá a imperativo de tu, con el pronombre pegado."
ty(26, CORTE, PEGA, "Mi fai un favore? → ___ un favore!", ["Fammi"],
   CORTE_N)
ty(26, CORTE, PEGA, "Ci vai tu? → ___ tu!", ["Vacci"], CORTE_N)
ty(26, CORTE, PEGA, "Gli dai una mano? → ___ una mano!", ["Dagli"],
   "*Da'* + *gli* = *dagli*, sin doble: *gli* es la única excepción a la regla de *dammi, fammi, vacci*.")

# ===========================================================================
# 7. Lei: concordancia y el La formal (lección 20)
# ===========================================================================
LEI = "Lei formale"
LEI_N = ("Con *Lei* el verbo va en 3ª persona, pero el adjetivo y el participio siguen a la persona "
         "real. Y el pronombre directo formal es *La* para hombres y mujeres.")

ch(20, LEI, "Signor Rossi, Lei è ___?", ["stanco", "stanca", "stanchi"], "stanco",
   "Le hablás a un hombre: *stanco*. *Lei* es femenino de forma, pero no vuelve femenino al "
   "señor. " + LEI_N, prompt="Elegí la forma de usted (Lei).")
ch(20, LEI, "Professoressa, ___ ringrazio per l'aiuto.", ["La", "Le", "Ti"], "La",
   "*ringraziare qualcuno* lleva objeto directo: *La ringrazio* (de usted). *Le* es indirecto "
   "(*Le telefono*); *ti*, de tu. " + LEI_N, prompt="Elegí la forma de usted (Lei).")
tr(20, LEI, "Señor Bianchi, ¿usted ya está listo?",
   ["Signor Bianchi, Lei è già pronto?", "Signor Bianchi, è già pronto?",
    "Signor Bianchi, Lei è pronto?", "Signor Bianchi, è pronto?"],
   "Con *Lei*, verbo en 3ª (*è*) y adjetivo en masculino porque es un señor (*pronto*). "
   "Y «listo» = *pronto*.")
fx(26, LEI, "accordo", "Dottore, La ringrazio: è stata molto gentile.", "stata", "stato",
   "Le hablás a un doctor (hombre): *è stato gentile*. El femenino de *Lei* no arrastra al "
   "participio. " + LEI_N)
tr(26, LEI, "Señora, ¿usted llegó ayer?",
   ["Signora, Lei è arrivata ieri?", "Signora, è arrivata ieri?"],
   "*Arrivare* va con *essere*: el participio concuerda con la persona real (*arrivata*, una señora).")
tr(48, LEI, "Señor Conti, lo llamo mañana.",
   ["Signor Conti, La chiamo domani", "Signor Conti, la chiamo domani",
    "Signor Conti, La richiamo domani", "Signor Conti, la richiamo domani"],
   "El pronombre directo formal es *La* también para un hombre: *La chiamo domani*. «Lo chiamo» "
   "para un hombre es antiguo; hoy, en un mail o una llamada de trabajo, va *La*.")
fx(48, LEI, "pronome", "Ingegnere, Le ringrazio per la Sua pazienza.", "Le", "La",
   "*ringraziare* lleva objeto directo: *La ringrazio*. *Le* es para los verbos con «a» "
   "(*Le scrivo*, *Le telefono*).")

# ===========================================================================
# 8. Negativo de tu con pronombre (lecciones 12 y 22)
# ===========================================================================
NEG = "imperativo negativo pronomi"
NEG_N = ("En el negativo de tu el pronombre va pegado al infinitivo o delante, las dos valen: "
         "*non dirmelo* = *non me lo dire*.")

tr(22, NEG, "No me lo digas.",
   ["Non dirmelo!", "Non me lo dire!", "Non dirmelo", "Non me lo dire"],
   NEG_N + " Nunca «non dimmelo»: eso mezcla el afirmativo (*dimmelo*) con el negativo.")
tr(22, NEG, "No lo toques, está caliente.",
   ["Non toccarlo, è caldo", "Non lo toccare, è caldo", "Non toccarlo, scotta", "Non lo toccare, scotta",
    "Non toccarlo: è caldo", "Non lo toccare: è caldo"],
   NEG_N + " Si quema de verdad, *scotta*.")
tr(22, NEG, "No te vayas todavía.",
   ["Non andartene ancora", "Non te ne andare ancora", "Non andare via ancora", "Non andartene ancora!",
    "Non te ne andare ancora!"],
   "«Irse» es *andarsene*: en negativo, *non andartene* o *non te ne andare*. También *non andare via*.")
fx(22, NEG, "posizione_pronome", "Non dirlomi, non lo voglio sapere!", "dirlomi", "dirmelo",
   "Con dos pronombres, primero el indirecto, que pasa a *me*: *dirmelo*, en el mismo orden que "
   "«decírmelo». O los dos delante: *non me lo dire*.")
tr(26, NEG, "No se lo cuentes a nadie.",
   ["Non dirlo a nessuno", "Non lo dire a nessuno", "Non raccontarlo a nessuno",
    "Non lo raccontare a nessuno"],
   "El «se» del castellano repite a «nadie»; el italiano no duplica: *non dirlo a nessuno*. "
   + NEG_N)
ch(26, NEG, "Il libro è di Marco: ___ a nessuno!", ["non prestarlo", "non prestalo", "non lo presta"],
   "non prestarlo",
   "Negativo de tu: *non* + infinitivo, con el pronombre pegado (*non prestarlo*) o delante "
   "(*non lo prestare*). *Non prestalo* mezcla el afirmativo; *non lo presta* es «no lo presta».")
tr(26, NEG, "No te preocupes por mí.",
   ["Non preoccuparti per me", "Non ti preoccupare per me"],
   NEG_N + " Y con *Lei*: *non si preoccupi*.")

# ===========================================================================
# 9. Presente histórico e imperfetto de crónica (lección 48)
# ===========================================================================
REL = "tempi del racconto"
PQ = "¿Por qué está en ese tiempo?"
OPT_PS = "Presente histórico: la biografía cuenta el pasado en presente."

ch(48, REL, "«Nel 1265 nasce a Firenze Dante Alighieri.» (de una biografía)",
   [OPT_PS, "Es un error: tendría que ir en passato remoto.", "Habla de algo que pasa ahora."], OPT_PS,
   "Biografías, efemérides y manuales cuentan el pasado en presente, como el castellano "
   "(«Dante nace en 1265»). No es un error: es otro registro.", prompt=PQ)
ch(48, REL, "«Alle 7 il treno lasciava la stazione; dieci minuti dopo si fermava in galleria.» (crónica de un diario)",
   ["Imperfetto de crónica: hechos puntuales contados como escena.",
    "Imperfetto de hábito: el tren lo hacía todos los días.",
    "Imperfetto de cortesía."],
   "Imperfetto de crónica: hechos puntuales contados como escena.",
   "La prensa usa el *imperfetto narrativo* para hechos puntuales (*si fermava* = se detuvo). "
   "No es un hábito: lo dicen las horas exactas. Reconocelo; vos escribí *si è fermato*.", prompt=PQ)
ch(48, REL, "«Ieri sono al bar, tranquillo, e a un certo punto entra Marco tutto bagnato.»",
   ["Presente de relato oral: vuelve viva la escena.", "Presente con valor de futuro.",
    "Es un error: todo tendría que ir en imperfetto."],
   "Presente de relato oral: vuelve viva la escena.",
   "Contando algo en charla, se pasa al presente para meter al otro en la escena, igual que "
   "en castellano («ayer estoy en el bar y entra Marco»).", prompt=PQ)
ch(49, REL, "Biografía en presente: «Leopardi nasce a Recanati nel 1798. Da ragazzo ___ giorno e notte nella biblioteca del padre.»",
   ["studia", "studiò", "ha studiato"], "studia",
   "Si el texto arranca en presente histórico, seguí en presente (*studia*). Saltar al remoto o al "
   "prossimo en la misma biografía es un error de coherencia.",
   prompt="Elegí el tiempo que mantiene el relato.")
STOR = "Pasá al presente histórico, como en una biografía."
ty(49, REL, STOR, "Nel 1861 l'Italia diventò un regno e Torino fu la prima capitale.",
   ["Nel 1861 l'Italia diventa un regno e Torino è la prima capitale",
    "Nel 1861 l'Italia diventa un regno e Torino è la prima capitale."],
   "Remoto → presente: *diventò* → *diventa*, *fu* → *è*. Las fechas quedan: el presente "
   "histórico no confunde a nadie.")
ty(49, REL, STOR, "Nel 1946 gli italiani scelsero la repubblica e le donne votarono per la prima volta.",
   ["Nel 1946 gli italiani scelgono la repubblica e le donne votano per la prima volta",
    "Nel 1946 gli italiani scelgono la repubblica e le donne votano per la prima volta."],
   "*scelsero* → *scelgono* (presente irregular, con *g*), *votarono* → *votano*.")
ch(51, REL, "Crónica de un diario: «Due giorni dopo la sconfitta, l'allenatore ___.»",
   ["si dimetteva", "si dimetterebbe", "si dimetta"], "si dimetteva",
   "El *imperfetto* de crónica cuenta un hecho puntual (renunció). *Si dimetterebbe* sería "
   "una noticia no confirmada; *si dimetta*, un congiuntivo sin nada que lo pida.",
   prompt="Elegí el tiempo de la crónica.")
