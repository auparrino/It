# -*- coding: utf-8 -*-
"""Tanda 4, italiano, semanas 14-26 (auditorias/PLAN-2026-10-propuestas.md).

Lo que la revisión contra manuales (auditorias/2026-10-italiano-revision.md,
temporada 2) pedía y no estaba hecho:

1. El trapassato prossimo con bloque propio en la 16 (antes era un «more» de
   la 15 y un bloque del jefe): 12 ítems con la pista (*già*, *mai*,
   *quando* + otro pasado), reflexivos incluidos (t4it14-16-tp…).
   tools/it/sillabo.py lo da por enseñado desde la 16.
2. Escucha dentro de las rondas, con lo que se distingue solo de oído:
   *giocavamo / giocavano*, *parleremo / parleremmo*, *verrò / verrei*,
   *era / è già partito*, *che parli / che parla*, y números, horas y
   precios.  De 2 a 5 por semana, más un dictado (t4it14-<sem>-l…, -d…).
3. «Racconto a buchi»: la lectura de la semana ya leída (w-15, w-16, w-19,
   w-26), con los verbos en infinitivo para ponerlos en el tiempo que pide
   el texto (t4it14-<sem>-rb…).
4. Adelantos que faltaban: *mi piaci / ti piaccio* (14), el *si*
   impersonale de todos los días (16, que ya trae el bloque de adelanto) y
   *credo che sia andato* como fórmula de opinión sobre el pasado (25).
5. *piacere* en contexto, en lugar de los diez *piace / piacciono* de tabla.

Prefijo de los ids: t4it14-<semana>-<tramo><n>.
"""
import itertools
import re

LEVEL = {}
for _w in range(1, 53):
    LEVEL[_w] = "A1" if _w <= 6 else "A2" if _w <= 18 else "B1" if _w <= 28 else "B2" if _w <= 39 else "C1"

T_ASC = "ascolto"
FX = "Trova l'errore: tocá la palabra que está mal y corregila."
TR = "Traducí al italiano."
DI = "Dictado: escuchá y escribí lo que oís."
RB = ("Racconto a buchi: es la lectura de la semana («%s»). Poné cada verbo en el tiempo "
      "que pide el texto.")

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
    d = dict(id="t4it14-%d-%s%02d" % (w, tag, _N[k]), w=w, level=LEVEL[w], type=typ, topic=topic,
             prompt=prompt, stem=stem, answer=answer, note=note)
    if clean:
        d["alt"] = clean
    d.update(extra)
    ITEMS.append(d)
    return d


def li(w, tag, prompt, said, options, note, answer=None):
    """listen: se oye la frase (sin texto) y se elige.  La respuesta es lo
    que se dijo, salvo que se pida otra cosa (el número, la hora, el precio):
    entonces es la primera opción."""
    answer = answer or (said if said in options else options[0])
    assert answer in options, (said, options)
    return _add(w, tag, "listen", T_ASC, prompt, said, answer, note, options=options, nopeek=True)


def di(w, tag, text, note, alt=None):
    """Dictado: se oye la frase y se escribe entera."""
    return _add(w, tag, "dictation", T_ASC, DI, text, text, note, alt, nopeek=True)


def fx(w, tag, topic, cat, stem, bad, good, note):
    """Trova l'errore: «bad» es una palabra de la frase; «good», lo que va."""
    pat = r"(?<![\w'])" + re.escape(bad) + r"(?![\w'])"
    assert len(re.findall(pat, stem)) == 1, (stem, bad)
    answer = re.sub(pat, lambda m: good, stem, count=1)
    answer = re.sub(r"\s{2,}", " ", answer).strip()
    return _add(w, tag, "fixerr", topic, FX, stem, answer, note, cat=cat, bad=bad, good=good)


def tr(w, tag, topic, stem, variants, note):
    return _add(w, tag, "translate", topic, TR, stem, variants[0], note, variants[1:])


def cz(w, tag, topic, prompt, stem, answer, note, alt=None):
    return _add(w, tag, "cloze", topic, prompt, stem, answer, note, alt)


def ch(w, tag, topic, prompt, stem, options, note):
    """choice: la primera opción es la correcta (se guarda así; la app las
    mezcla)."""
    return _add(w, tag, "choice", topic, prompt, stem, options[0], note, options=list(options))


def rb(w, title, stem, gaps, note):
    """Varios huecos sobre la lectura: cada hueco, la lista de formas que
    valen (la primera es la del texto)."""
    assert stem.count("___") == len(gaps), stem
    combos = [" | ".join(c) for c in itertools.product(*gaps)]
    return _add(w, "rb", "cloze", "tempo_verbale", RB % title, stem, combos[0], note, combos[1:])


def combo(*parts):
    """Todas las combinaciones: cada parte es un texto o una lista de variantes."""
    parts = [[p] if isinstance(p, str) else p for p in parts]
    return ["".join(c) for c in itertools.product(*parts)]


OIDO = "Escuchá y elegí lo que oíste."
QUIEN = "Escuchá: ¿quién lo hace? Elegí el sujeto."
QUIEN_HABLA = "Escuchá la última vocal del participio y elegí la frase."
HORA = "Escuchá: ¿a qué hora?"
PRECIO = "Escuchá: ¿cuánto cuesta?"
CUANTOS = "Escuchá: ¿cuántos hay?"
P3 = "lui / lei"


# ===========================================================================
# 14: piacere con personas y en contexto
# ===========================================================================
T_PI = "piacere"
ch(14, "p", T_PI, "¿Cómo se dice «me gustás»?", "___",
   ["Mi piaci.", "Ti piaccio.", "Mi piace te."],
   "Lo que gusta es el sujeto, también cuando es una persona: «me gustás» = *mi piaci* (*tu piaci a me*). "
   "*Ti piaccio* es al revés: «te gusto».")
tr(14, "p", T_PI, "Me gustás mucho.",
   ["Mi piaci molto.", "Mi piaci tanto.", "Tu mi piaci molto.", "Tu mi piaci tanto.", "Mi piaci un sacco."],
   "El sujeto es *tu*, así que el verbo va en segunda persona: *piaci*. La persona a la que le gusta va "
   "en indirecto, *mi*, como en castellano.")
tr(14, "p", T_PI, "¿Le gusto? (a ella)",
   ["Le piaccio?", "Le piaccio io?", "Io le piaccio?", "Piaccio a lei?"],
   "El que gusta soy yo: *piaccio*, primera persona, con doble c. «A ella» es el indirecto *le*.")
cz(14, "p", T_PI, "Completá con piacere en presente.", "Marco, tu mi ___ molto.", "piaci",
   "*tu* es el sujeto: *piaci*. «Tu mi piace» es el error típico: el verbo concuerda con quien gusta, "
   "no con quien habla.")
cz(14, "p", T_PI, "Completá con piacere en presente.", "Io non ___ a tua madre, vero?", "piaccio",
   "Sujeto *io*: *piaccio*, como *faccio* o *taccio*. «No le gusto a tu mamá».")
cz(14, "p", T_PI, "Completá con piacere en presente.", "Ragazzi, voi ci ___ tantissimo!", "piacete",
   "Sujeto *voi*: *piacete*. *ci* es «a nosotros»: «¡ustedes nos gustan muchísimo!».")
fx(14, "p", T_PI, "persona_verbale", "Tu mi piace da morire.", "piace", "piaci",
   "Quien gusta es *tu*: el verbo va con él, *piaci*. Igual que en castellano: «(vos) me gustás».")

# piacere en contexto: lo que gusta decide el verbo, y en pasado, el participio
CTX = "Completá con piacere en el tiempo que pide la frase."
PRES = "Completá con piacere en presente."
cz(14, "c", T_PI, PRES, "Ti ___ i miei amici?", "piacciono",
   "Lo que gusta son *i miei amici*, plural: *piacciono*. El *ti* (a vos) no cambia nada.")
cz(14, "c", T_PI, PRES, "Ai miei genitori ___ molto Roma.", "piace",
   "*Ai miei genitori* es a quién le gusta; lo que gusta es *Roma*, singular: *piace*. Que la persona "
   "sea plural no importa.")
cz(14, "c", T_PI, CTX, "Ieri sera ti ___ la pizza?", "è piaciuta",
   "En pasado, *essere* y el participio concuerda con lo que gustó: *la pizza* → *è piaciuta*.")
cz(14, "c", T_PI, PRES, "A Luca non ___ i film dell'orrore.", "piacciono",
   "*i film* es plural (aunque *film* no cambie): *piacciono*. Mirá el artículo: *i*.")
cz(14, "c", T_PI, CTX, "Alla fine, ai bambini ___ tutti i regali.", "sono piaciuti",
   "Pasado con *alla fine*: *essere* + participio que concuerda con *i regali* (masculino plural): "
   "*sono piaciuti*.")

# --- escucha -----------------------------------------------------------------
li(14, "l", OIDO, "Mi piacciono i film italiani.", ["Mi piacciono i film italiani.", "Mi piace il film italiano."],
   "*piacciono* (con doble c y *-ono*) va con lo que gusta en plural. *film* no cambia: el número lo dicen "
   "el artículo (*i / il*) y el verbo.")
li(14, "l", OIDO, "Ti piaccio?", ["Ti piaccio?", "Ti piace?", "Mi piaci?"],
   "*piaccio* termina en *-o*: el que gusta soy yo, «¿te gusto?». *Ti piace?* es «¿te gusta (algo)?», "
   "y *mi piaci?*, «¿me gustás?».")
li(14, "l", OIDO, "Mi è piaciuta la cena.", ["Mi è piaciuta la cena.", "Mi sono piaciute le cene."],
   "En pasado el participio cambia con lo que gustó: *piaciuta* (la cena), *piaciute* (le cene). "
   "Y el auxiliar también: *è / sono*.")
di(14, "d", "Mi manchi tanto.",
   "*Mi manchi* = «te extraño»: el que falta es el sujeto, *tu*.")


# ===========================================================================
# 15: imperfetto y passato prossimo
# ===========================================================================
li(15, "l", QUIEN, "Giocavamo a carte.", ["noi", "loro", "voi"],
   "*gio-ca-VA-mo* (noi) lleva el acento en la terminación; *gio-CA-va-no* (loro), en la sílaba de antes. "
   "Escuchá dónde cae el golpe.", answer="noi")
li(15, "l", QUIEN, "Parlavano sempre.", ["loro", "noi", "voi"],
   "*par-LA-va-no*: el acento cae lejos del final, como en «hablaban». *parlavamo* (noi) y *parlavate* "
   "(voi) lo tienen en la terminación.", answer="loro")
li(15, "l", OIDO, "Da bambino giocavo a calcio.",
   ["Da bambino giocavo a calcio.", "Da bambino ho giocato a calcio."],
   "*da bambino* es una costumbre de entonces: imperfetto, *giocavo*. *ho giocato* contaría un hecho cerrado.")
li(15, "l", OIDO, "Mentre dormivo, è suonato il telefono.",
   ["Mentre dormivo, è suonato il telefono.", "Mentre dormivo, suonava il telefono."],
   "Las dos se dicen, pero no cuentan lo mismo: *è suonato* es un hecho (sonó una vez y te despertó); "
   "*suonava* es fondo (sonaba mientras dormías).")
di(15, "d", "Quando ero piccolo, abitavo a Napoli.",
   "Edad y costumbre del pasado: imperfetto. *ero*, de *essere*, es irregular.")

# --- racconto a buchi: w-15 «L'estate dal nonno» --------------------------------
rb(15, "L'estate dal nonno",
   "Quando ___ (essere) bambino ___ (passare) le estati dal nonno, in un paese della Puglia. "
   "La casa ___ (essere) bianca e ___ (avere) un grande fico nel cortile.",
   [["ero"], ["passavo"], ["era"], ["aveva"]],
   "Es el decorado del cuento: edad, costumbre y descripción van en imperfetto. Todavía no pasó nada.")
rb(15, "L'estate dal nonno",
   "Ogni mattina il nonno mi ___ (svegliare) presto e ___ (andare, noi) insieme al mercato. "
   "Il pomeriggio ___ (fare) troppo caldo.",
   [["svegliava"], ["andavamo"], ["faceva"]],
   "*ogni mattina*, *il pomeriggio*: lo que pasaba siempre, imperfetto. *fare* toma la raíz larga: *faceva*.")
rb(15, "L'estate dal nonno",
   "Un giorno, però, ___ (succedere) una cosa strana: mentre ___ (raccogliere) i fichi, "
   "___ (vedere) un piccolo cane sotto l'albero. Il nonno l'___ (adottare) subito.",
   [["è successa"], ["raccoglievo"], ["ho visto"], ["ha adottato"]],
   "*Un giorno* abre el hecho: passato prossimo (*è successa*, con *essere* y concordando con *una cosa*). "
   "*mentre* marca el fondo: *raccoglievo*. Lo que pasa en ese fondo: *ho visto*, *l'ha adottato*.")


# ===========================================================================
# 16: reflexivos en pasado, trapassato prossimo y si impersonale
# ===========================================================================
T_TP = "trapassato"
CT = "Completá con el trapassato prossimo (imperfetto de avere o essere + participio)."
cz(16, "tp", T_TP, CT, "Quando sono arrivato alla stazione, il treno ___ già ___. (partire)", "era | partito",
   "Primero salió el tren, después llegaste: lo anterior va en trapassato. *partire* va con *essere*: "
   "*era partito*.")
cz(16, "tp", T_TP, CT, "Non sono andata al cinema perché ___ già ___ il film. (vedere)", "avevo | visto",
   "Verlo fue antes de no ir: *avevo visto*. *vedere* va con *avere*, como en el passato prossimo "
   "(*ho visto* → *avevo visto*).")
cz(16, "tp", T_TP, CT, "Quando l'ho chiamata, Anna si ___ già ___. (addormentarsi)", "era | addormentata",
   "Reflexivo: *essere*, también en el trapassato, y el participio concuerda con *Anna*: "
   "*si era addormentata*.")
cz(16, "tp", T_TP, CT, "Siamo arrivati tardi: i nostri amici ___ già ___ a mangiare. (cominciare)",
   "avevano | cominciato",
   "*cominciare a* + infinitivo, con *avere*: *avevano cominciato*. Llegaron después de que empezaran.",
   alt=["avevano | iniziato"])
cz(16, "tp", T_TP, CT, "Finalmente ho trovato le chiavi che ___ ieri. (perdere, io)", "avevo perso",
   "Las perdiste antes de encontrarlas: *avevo perso*. El participio de *perdere* es *perso* (también "
   "*perduto*, más formal); con *che* = las llaves delante, la concordancia *perse* es optativa.",
   alt=["avevo perduto", "avevo perse", "avevo perdute"])
cz(16, "tp", T_TP, CT, "Marta era stanca perché la notte prima non ___ bene. (dormire)", "aveva dormito",
   "*la notte prima* mira hacia atrás desde otro pasado (*era stanca*): trapassato, *aveva dormito*.")
ch(16, "tp", T_TP, "Elegí la que va: «Cuando salí, ya había parado de llover.»", "Quando sono uscito, ___ di piovere.",
   ["aveva già smesso", "ha già smesso", "smetteva già"],
   "Paró antes de que salieras: trapassato, *aveva già smesso*. *ha già smesso* pondría los dos hechos "
   "en el mismo plano.")
fx(16, "tp", T_TP, "tempo_verbale", "Quando sono arrivata, Marco è già uscito.", "è", "era",
   "Con *quando* + passato prossimo y *già*, lo anterior va en trapassato: *era già uscito*. "
   "Al hablar decimos «ya salió»; en italiano se marca el orden.")
fx(16, "tp", T_TP, "ausiliare", "Prima di quel viaggio non avevo mai stato a Roma.", "avevo", "ero",
   "En castellano «había» sirve para todo; en italiano el auxiliar es el del passato prossimo: "
   "*sono stato* → *ero stato*.")
fx(16, "tp", T_TP, "ausiliare", "Quando sono entrato, i bambini si avevano già lavati.", "avevano", "erano",
   "Reflexivo: *essere*, también en el trapassato, y el participio concuerda con *i bambini*: *si erano lavati*.")
tr(16, "tp", T_TP, "Me dijo que nunca había estado en Roma.",
   combo("Mi ha detto che non era mai ", ["stato", "stata"], " a Roma.")
   + combo(["Lui", "Lei"], " mi ha detto che non era mai ", ["stato", "stata"], " a Roma."),
   "«Había estado» = *era stato*: *essere* va con *essere*. Y *non … mai* rodea al auxiliar: "
   "*non era mai stato*.")
tr(16, "tp", T_TP, "Cuando llegamos, la película ya había empezado.",
   combo("Quando siamo ", ["arrivati", "arrivate"], ", il film era già ", ["cominciato", "iniziato"], "."),
   "Cuando lo que empieza es la cosa (la película, la clase), *cominciare* y *iniziare* van con *essere*: "
   "*il film era già cominciato*. Con una persona que empieza a hacer algo, *avere*: *avevano cominciato a mangiare*. "
   "«La película» es *il film*, masculino.")

# --- escucha -----------------------------------------------------------------
li(16, "l", QUIEN_HABLA, "Mi sono svegliata tardi.", ["Mi sono svegliata tardi.", "Mi sono svegliato tardi."],
   "Con *essere* el participio concuerda con quien habla: *svegliata* (mujer), *svegliato* (hombre). "
   "La última vocal lo dice todo.")
li(16, "l", OIDO, "Quando sono arrivato, era già partito.",
   ["Quando sono arrivato, era già partito.", "Quando sono arrivato, è già partito."],
   "*era già partito* (había salido) frente a *è già partito* (ya salió): una sílaba de diferencia, y "
   "es la que ordena los hechos.")
li(16, "l", OIDO, "Si erano già alzati.", ["Si erano già alzati.", "Si sono già alzati."],
   "*si erano* (trapassato: se habían levantado) frente a *si sono* (se levantaron). Los dos con *essere*.")
li(16, "l", QUIEN, "Vi siete conosciuti a Roma?", ["voi", "noi", "loro"],
   "*vi siete* = voi. *ci siamo* sería noi; *si sono*, loro. Recíproco: «¿se conocieron en Roma?».", answer="voi")
di(16, "d", "Ci siamo divertiti molto.",
   "Reflexivo con *essere* y participio en plural: *divertiti* (si fueran todas mujeres, *divertite*).")
di(16, "d", "Il treno era già partito.",
   "Trapassato: *era* + *partito*. Con *già* entre el auxiliar y el participio.")

# --- si impersonale de todos los días (adelanto del bloque de la 16) ------------
T_SI = "si impersonale"
ch(16, "si", T_SI, "¿Cómo se dice «En Italia se cena tarde»?", "___",
   ["In Italia si cena tardi.", "In Italia ci cena tardi.", "In Italia cena tardi."],
   "El «se» impersonal es *si* + tercera persona: *si cena*. *ci* es otra cosa (allá, nosotros).")
cz(16, "si", T_SI, "Completá con lo que falta.", "In quella trattoria ___ mangia benissimo.", "si",
   "El *si* impersonal es el «se» de «se come bien»: *si mangia*. Sin *si*, el sujeto sería la trattoria: "
   "«la trattoria come».")
cz(16, "si", T_SI, "Completá con el verbo.", "In questo negozio si ___ biciclette usate. (vendere)", "vendono",
   "Con un sustantivo plural detrás, el verbo va en plural: *si vendono biciclette*, como «se venden».")
tr(16, "si", T_SI, "¿Cómo se dice «despertador» en italiano?",
   ["Come si dice «despertador» in italiano?", "Come si dice despertador in italiano?",
    "Come si dice \"despertador\" in italiano?"],
   "*Come si dice…?* es la fórmula que ya usás: es el *si* impersonal.")
fx(16, "si", T_SI, "accordo", "Si vende case al mare.", "vende", "vendono",
   "Lo que se vende es *case*, plural: *si vendono*. «Si vende case» se ve escrito a mano en algún cartel, "
   "pero la norma pide el plural (el cartel formal es *vendesi*).")

# --- racconto a buchi: w-16 «Una mattina storta» ---------------------------------
rb(16, "Una mattina storta",
   "Ieri Giorgio non ___ (sentire) la sveglia e ___ (svegliarsi) alle otto e mezza. "
   "Poi ___ (accorgersi) che ___ (piovere).",
   [["ha sentito"], ["si è svegliato"], ["si è accorto"], ["pioveva"]],
   "*sentire* no es reflexivo: va con *avere*; los reflexivos, con *essere*: *si è svegliato*, *si è accorto*. "
   "La lluvia es el fondo: *pioveva*.")
rb(16, "Una mattina storta",
   "In ufficio i colleghi ___ (mettersi) a ridere. Giorgio ___ (arrabbiarsi) un po', "
   "ma poi anche lui ___ (divertirsi).",
   [["si sono messi"], ["si è arrabbiato"], ["si è divertito"]],
   "Todos reflexivos: *essere*, y el participio concuerda con el sujeto: *i colleghi* → *messi*, "
   "*Giorgio* → *arrabbiato*, *divertito*.")


# ===========================================================================
# 17-18: escucha (demostrativos, posesivos, negaciones), con números
# ===========================================================================
li(17, "l", OIDO, "Quei ragazzi sono simpatici.", ["Quei ragazzi sono simpatici.", "Quel ragazzo è simpatico."],
   "*quei* (plural) y *quel* (singular) se distinguen por la *i* final; también *sono / è* y *-ci / -co*.")
li(17, "l", OIDO, "Sono i miei amici.", ["Sono i miei amici.", "È il mio amico."],
   "*i miei* lleva la *i* del plural dos veces. *il mio* es singular.")
li(17, "l", PRECIO, "Ognuno paga quindici euro.", ["15 €", "50 €", "5 €"],
   "*quindici* = 15; *cinquanta* = 50; *cinque* = 5. *ognuno* (cada uno) va con verbo en singular.",
   answer="15 €")
di(17, "d", "Questa è mia sorella.",
   "Familiar en singular, sin artículo: *mia sorella*.")

li(18, "l", OIDO, "Non ho visto nessuno.", ["Non ho visto nessuno.", "Non ho visto niente."],
   "*nessuno* = nadie; *niente* = nada. Las dos con *non* delante del verbo.")
li(18, "l", OIDO, "Non ci vado più.", ["Non ci vado più.", "Non ci vado mai."],
   "*non … più* dice que antes sí iba y ahora no («ya no voy»); *non … mai*, que no voy nunca.")
li(18, "l", OIDO, "Neanche io.", ["Neanche io.", "Anch'io."],
   "*neanche io* = yo tampoco; *anch'io* = yo también. Ojo: suenan parecido al final.")
di(18, "d", "Non ho mai visto niente di simile.",
   "Dos negativos con un solo *non*: *non … mai … niente*. En italiano no se anulan.")


# ===========================================================================
# 19: futuro, con horas
# ===========================================================================
li(19, "l", QUIEN, "Partirà domani.", [P3, "io", "loro"],
   "*partirà* (lui / lei) y *partirò* (io) cambian solo la última vocal, y las dos llevan el acento ahí. "
   "*partiranno* sería loro.", answer=P3)
li(19, "l", QUIEN, "Andremo al mare.", ["noi", "voi", "loro"],
   "*-emo* es noi; *-ete*, voi; *-anno*, loro: *andremo, andrete, andranno*.", answer="noi")
li(19, "l", HORA, "Il treno partirà alle diciassette e quaranta.", ["17:40", "7:40", "17:14"],
   "*diciassette* = 17 (*sette* = 7); *quaranta* = 40 (*quattordici* = 14).", answer="17:40")
di(19, "d", "Quando avrò finito, ti chiamerò.",
   "Futuro anteriore para lo que va a estar terminado antes: *avrò finito*. Y *ti chiamerò*.")

rb(19, "Il piano di Giulia",
   "Il prossimo anno Giulia ___ (finire) l'università e ___ (partire) per un anno in Spagna. "
   "A Valencia ___ (vivere) con due amiche.",
   [["finirà"], ["partirà"], ["vivrà"]],
   "El plan de Giulia va en futuro. *vivere* pierde la *e*: *vivrà*, como *andrà*, *potrà*, *dovrà*.")
rb(19, "Il piano di Giulia",
   "Poi, quando ___ (parlare) bene la lingua, ___ (fare) domanda in una scuola di italiano. "
   "Il padre sorride: «E noi ___ (venire) a trovarti a Natale!»",
   [["parlerà", "parla"], ["farà"], ["verremo"]],
   "Después de *quando*, si se habla del futuro, lo normal es futuro también: *quando parlerà* (en "
   "castellano, «cuando hable»); charlando también se oye el presente, *quando parla*. *venire* contrae: "
   "*verremo*.")


# ===========================================================================
# 20: condizionale, lo que solo se oye (la doble m), con un precio
# ===========================================================================
li(20, "l", OIDO, "Parleremmo con lui.", ["Parleremmo con lui.", "Parleremo con lui."],
   "*parleremmo* (hablaríamos) sostiene la *m*: la doble está después del acento y cuesta oírla. "
   "*parleremo* (hablaremos) la tiene simple.")
li(20, "l", OIDO, "Verrei volentieri.", ["Verrei volentieri.", "Verrò volentieri."],
   "*verrei* (vendría) termina en *-ei*; *verrò* (vendré), en *-ò* con acento.")
li(20, "l", OIDO, "Avresti tempo domani?", ["Avresti tempo domani?", "Avrai tempo domani?"],
   "*avresti* (¿tendrías?) es más cortés que *avrai* (¿vas a tener?). El *-esti* es la marca del condicional.")
li(20, "l", PRECIO, "Costerebbe trecentocinquanta euro.", ["350 €", "315 €", "305 €"],
   "*trecentocinquanta* = 350 (*trecentoquindici* = 315). Y *costerebbe*: el condicional suaviza el precio "
   "que todavía no es seguro.", answer="350 €")
di(20, "d", "Potrebbe ripetere, per favore?",
   "*potrebbe* (Lei): el condicional de cortesía para pedir.")


# ===========================================================================
# 21-23: ne y ci, combinados, comparativos
# ===========================================================================
li(21, "l", OIDO, "Ne ho comprate tre.", ["Ne ho comprate tre.", "Ne ho comprati tre."],
   "Con *ne* el participio concuerda con lo que se cuenta: *comprate* si son femeninas (tre mele), "
   "*comprati* si son masculinos (tre libri). La vocal final es la pista.")
li(21, "l", "Escuchá: ¿cuántas quiere?", "Quante mele? Ne voglio dodici.", ["12", "2", "20"],
   "*dodici* = 12 (*due* = 2, *venti* = 20). *ne voglio dodici* = quiero doce (de esas): *ne* retoma *mele*.",
   answer="12")
di(21, "d", "Ci vado domani.",
   "*ci* = allá: *ci vado* (voy allá).")

li(22, "l", OIDO, "Gliele do domani.", ["Gliele do domani.", "Gliela do domani.", "Glielo do domani."],
   "*gliele* (se las), *gliela* (se la), *glielo* (se lo): la última vocal dice qué se da.")

li(23, "l", "Escuchá: ¿cuánto cuesta el tren?", "Il treno costa trentacinque euro, l'autobus ventotto.", ["35 €", "28 €", "53 €"],
   "Te preguntan el tren: *trentacinque* = 35. *ventotto* (28) pierde la *i* de *venti* delante de *otto*.",
   answer="35 €")
li(23, "l", OIDO, "Marco è più alto di me.", ["Marco è più alto di me.", "Marco è alto come me."],
   "*più … di* compara (más alto que yo); *come* iguala (tan alto como yo).")
li(23, "l", OIDO, "È il migliore della classe.", ["È il migliore della classe.", "È il peggiore della classe."],
   "*migliore* = el mejor; *peggiore* = el peor. El superlativo relativo lleva *di*: *della classe*.")
di(23, "d", "Roma è più grande di Milano.",
   "*più … di* delante de un nombre: *di Milano*.")


# ===========================================================================
# 24-25: congiuntivo, y la fórmula para opinar sobre el pasado
# ===========================================================================
li(24, "l", OIDO, "Spero che Marco parli con lei.", ["Spero che Marco parli con lei.", "So che Marco parla con lei."],
   "*parli* (congiuntivo, después de *spero che*) frente a *parla* (indicativo, después de *so che*): "
   "además del verbo de adelante, cambia la última vocal.")
li(24, "l", QUIEN, "Bisogna che finiate presto.", ["voi", "noi", "loro"],
   "*-iate* es voi en el congiuntivo presente: *finiate, parliate*. noi sería *finiamo*; loro, *finiscano*.",
   answer="voi")
li(24, "l", OIDO, "Credo che abbia ragione.", ["Credo che abbia ragione.", "Credo che ha ragione."],
   "*abbia* es el congiuntivo de *avere*; *ha* es el indicativo, que se oye charlando. Por escrito, *abbia*.")
di(24, "d", "Penso che sia una buona idea.",
   "*penso che* + congiuntivo: *sia*.")

T_CP = "congiuntivo"
CP = "Completá con sia o abbia + participio: una opinión sobre algo que ya pasó."
cz(25, "cp", T_CP, CP, "Credo che Luca ___ già ___ a casa. (andare)", "sia | andato",
   "*Luca è andato* → *credo che sia andato*: el mismo auxiliar del passato prossimo, en congiuntivo.")
cz(25, "cp", T_CP, CP, "Penso che Anna non ___ ___ la domanda. (capire)", "abbia | capito",
   "*ha capito* → *abbia capito*. *capire* va con *avere*.")
cz(25, "cp", T_CP, CP, "Spero che i ragazzi ___ ___ bene. (arrivare)", "siano | arrivati",
   "*sono arrivati* → *siano arrivati*: con *essere*, el participio concuerda con *i ragazzi*.")
tr(25, "cp", T_CP, "Creo que ya comieron.",
   combo(["Credo", "Penso"], " che abbiano già ", ["mangiato", "pranzato", "cenato"], ".")
   + ["Credo che abbiano mangiato già.", "Mi sa che hanno già mangiato."],
   "«Creo que» + algo que ya pasó: *credo che abbiano mangiato*. *Mi sa che* (me da que) va con indicativo.")
fx(25, "cp", T_CP, "ausiliare", "Credo che Paolo abbia uscito presto.", "abbia", "sia",
   "El auxiliar es el del passato prossimo: *Paolo è uscito* → *sia uscito*.")
li(25, "l", OIDO, "Credo che sia andato a casa.",
   ["Credo che sia andato a casa.", "Credo che sia andata a casa.", "Credo che vada a casa."],
   "*sia andato* (que se fue: él) frente a *sia andata* (ella) y *vada* (que va, ahora).")
li(25, "l", OIDO, "So che è vero.", ["So che è vero.", "Penso che sia vero."],
   "*so che* da un dato: indicativo, *è*. *penso che* da una opinión: congiuntivo, *sia*.")
di(25, "d", "Spero che siano arrivati bene.",
   "Congiuntivo de *essere* + participio en plural: *siano arrivati*.")


# ===========================================================================
# 26: el jefe, mezclado
# ===========================================================================
li(26, "l", OIDO, "Quando siamo arrivati, il film era già cominciato.",
   ["Quando siamo arrivati, il film era già cominciato.", "Quando siamo arrivati, il film è già cominciato."],
   "*era già cominciato*: empezó antes de que llegaran. Una sílaba (*e-ra / è*) cambia el orden de los hechos.")
li(26, "l", OIDO, "Ci andremmo volentieri.", ["Ci andremmo volentieri.", "Ci andremo volentieri."],
   "*andremmo* (iríamos) con *m* larga; *andremo* (iremos) con *m* simple.")
di(26, "d", "Gliel'ho detto ieri.",
   "*glielo* + *ho* → *gliel'ho*: «se lo dije ayer».", alt=["Glielo ho detto ieri."])

rb(26, "Caro diario",
   "Spero che i colleghi ___ (essere) gentili e che il capo non ___ (essere) troppo severo. "
   "Penso che all'inizio ___ (fare) qualche errore, ma ___ (imparare) in fretta.",
   [["siano", "saranno"], ["sia", "sarà"], ["farò"], ["imparerò"]],
   "*spero che* pide congiuntivo: *siano*, *sia* (con *sperare* también vale el futuro: *saranno*, *sarà*). "
   "En *penso che farò* el que piensa y el que hace son el mismo (yo) y se mira adelante: futuro, *farò*; "
   "*faccia* se leería como «que él haga». *imparerò*, también futuro.")
rb(26, "Caro diario",
   "Ho già preparato tutto: i vestiti, la borsa e i documenti. Mia madre me li ___ (controllare) due volte. Quando ___ (essere) studente ___ (sognare) un lavoro così.",
   [["ha controllati"], ["ero"], ["sognavo"]],
   "Con *li* delante, el participio concuerda: *me li ha controllati* (los documentos). Y el pasado "
   "de fondo, en imperfetto: *ero*, *sognavo*.")
