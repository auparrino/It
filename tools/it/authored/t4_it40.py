# -*- coding: utf-8 -*-
"""Tanda 4, italiano, semanas 40-52 (auditorias/PLAN-2026-10-propuestas.md).

Lo que la revisión contra manuales (auditorias/2026-10-italiano-revision.md,
temporada 4) pedía y no estaba hecho (los duelos, el Capire y la evidencia
negativa del banco van por otro lado):

1. El modelo «por propósito» (GrammaticAvanzata, CILS TRE-C1): causa y
   concesión en la 49, condición, tiempo y limitativas en la 51, con
   transformaciones en las dos direcciones y lo que no aparecía nunca
   (*a saperlo*, *a sentire lui*, *pur di*, *a costo di*, *nel* +
   infinitivo, *salvo*): t4it40-49-p…, t4it40-51-p…  Los bloques de teoría
   están en tools/it/lessons/t4_c1.py.
2. En lugar del relleno A2 de la 42, la 45 y la 47 (que build_course.py
   pasa a «extra»), temas C1 de NE5 que faltaban: latinismos (42), futuro
   de suposición y *come se* en fórmulas (45), *chi* / *quanto* y *bello* /
   *buono* intensificadores (47), *magari* + congiuntivo (48).
3. Lo que la 41 y la 44 enseñan y no practicaban: pasiva de percepción y
   *sentire* polisémico (41); gerundio con sujeto distinto y participio
   presente con valor verbal (44).
4. Formación de palabras y colocaciones donde el calco falla, con el calco
   como distractor o como error (50).
5. Escucha dentro de las rondas (lo que se distingue solo de oído, números,
   horas, precios, años) y un dictado por semana (40-51).
6. «Racconto a buchi»: la lectura de la semana ya leída, con los verbos,
   las preposiciones o los pronombres para completar (w-40 a w-49).

Prefijo de los ids: t4it40-<semana>-<tramo><n>.
"""
import itertools
import re

T_ASC = "ascolto"
FX = "Trova l'errore: tocá la palabra que está mal y corregila."
TR = "Traducí al italiano."
DI = "Dictado: escuchá y escribí lo que oís."
TY = "Reescribí la frase con la forma que se pide, sin cambiar el sentido: escribí solo lo que falta."
QQ = "¿Qué quiere decir?"
CE = "Elegí la que va."
RB = "Racconto a buchi: es la lectura de la semana («%s»). Poné cada verbo en la forma que pide el texto."

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
    d = dict(id="t4it40-%d-%s%02d" % (w, tag, _N[k]), w=w, level="C1", type=typ, topic=topic,
             prompt=prompt, stem=stem, answer=answer, note=note)
    if clean:
        d["alt"] = clean
    d.update(extra)
    assert len(note) <= 320, (d["id"], len(note))
    assert note.count("*") % 2 == 0, d["id"]
    ITEMS.append(d)
    return d


def li(w, prompt, said, options, note, answer=None):
    """listen: se oye la frase (sin texto) y se elige.  La respuesta es lo
    que se dijo, salvo que se pida otra cosa (el número, la hora, el precio)."""
    answer = answer or (said if said in options else options[0])
    assert answer in options, (said, options)
    return _add(w, "l", "listen", T_ASC, prompt, said, answer, note, options=list(options), nopeek=True)


def di(w, text, note, alt=None):
    """Dictado: se oye la frase y se escribe entera."""
    return _add(w, "d", "dictation", T_ASC, DI, text, text, note, alt, nopeek=True)


def fx(w, tag, topic, cat, stem, bad, good, note, good_alt=None):
    """Trova l'errore: «bad» está una sola vez en la frase; «good», lo que va."""
    pat = r"(?<![\w'])" + re.escape(bad) + r"(?![\w'])"
    assert len(re.findall(pat, stem)) == 1, (stem, bad)
    answer = re.sub(pat, lambda m: good, stem, count=1)
    extra = {"cat": cat, "bad": bad, "good": good}
    if good_alt:
        extra["goodAlt"] = list(good_alt)
    return _add(w, tag, "fixerr", topic, FX, stem, answer, note, **extra)


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


def ch(w, tag, topic, prompt, stem, options, note, **extra):
    """choice: la primera opción es la correcta (la app las mezcla)."""
    assert len(set(options)) == len(options), options
    return _add(w, tag, "choice", topic, prompt, stem, options[0], note, options=list(options), **extra)


def rb(w, title, stem, gaps, note, prompt=RB, topic="lettura"):
    """Varios huecos sobre la lectura: cada hueco, la lista de formas que
    valen (la primera es la del texto)."""
    assert stem.count("___") == len(gaps), stem
    combos = [" | ".join(c) for c in itertools.product(*gaps)]
    return _add(w, "rb", "cloze", topic, prompt % title, stem, combos[0], note, combos[1:])


def combo(*parts):
    """Todas las combinaciones: cada parte es un texto o una lista de variantes."""
    parts = [[p] if isinstance(p, str) else p for p in parts]
    return ["".join(c) for c in itertools.product(*parts)]


OIDO = "Escuchá y elegí lo que oíste."
HORA = "Escuchá: ¿a qué hora?"
PRECIO = "Escuchá: ¿cuánto?"
ANNO = "Escuchá: ¿en qué año?"


# ===========================================================================
# 40: causativo (escucha y la lectura «Una casa da sistemare»)
# ===========================================================================
li(40, OIDO, "L'ho fatta riparare ieri.", ["L'ho fatta riparare ieri.", "L'ho fatto riparare ieri."],
   "*fatta* (la macchina, la porta) termina en *-a*; *fatto* (il motore), en *-o*. El participio de *fare* "
   "concuerda con el pronombre que va delante.")
li(40, PRECIO, "Per rifare il tetto ci vogliono dodicimila euro.", ["12.000 €", "2.000 €", "20.000 €"],
   "*dodicimila* = 12.000 (*duemila* = 2.000, *ventimila* = 20.000). *mila* es el plural de *mille*.",
   answer="12.000 €")
di(40, "Mi sono fatto tagliare i capelli.",
   "*farsi* + infinitivo: lo que te hacen a vos. Va con *essere*: *mi sono fatto* (o *fatta*).",
   alt=["Mi sono fatta tagliare i capelli."])
rb(40, "Una casa da sistemare",
   "Abbiamo ___ (fare) rifare il tetto da un'impresa. La signora Rosa ci ha ___ (lasciare) usare il suo "
   "giardino. Mio marito dice che si ___ (fare, futuro) crescere la barba. Io lo ___ (lasciare, presente) sognare.",
   [["fatto"], ["lasciato"], ["farà"], ["lascio"]],
   "*fare* + infinitivo = mandar a hacer; *lasciare* + infinitivo = dejar que. Sin pronombre directo "
   "delante, el participio no cambia: *abbiamo fatto*, *ci ha lasciato*.")

# ===========================================================================
# 41: percepción pasiva, sentire polisémico, escucha, lectura
# ===========================================================================
T_PERC = "percezione"
tr(41, "p", T_PERC, "Oí que me llamaban por mi nombre.",
   combo(["Mi sono sentito", "Mi sono sentita"], " chiamare per nome.")
   + combo("Ho sentito ", ["che mi chiamavano", "qualcuno che mi chiamava"], " per nome.")
   + ["Ho sentito qualcuno chiamarmi per nome."],
   "Cuando la acción recae sobre vos, verbo de percepción reflexivo + infinitivo: *mi sono sentito "
   "chiamare*. También vale *ho sentito che mi chiamavano*.")
cz(41, "p", T_PERC, "Completá con vedersi en passato prossimo.",
   "Alla frontiera Marco ___ rifiutare il visto.", "si è visto",
   "Pasiva de percepción: *si è visto rifiutare il visto* = vio cómo le rechazaban la visa. *vedersi* va "
   "con *essere*.")
ch(41, "p", T_PERC, QQ, "«Si è sentita chiamare.»",
   ["Oyó que la llamaban.", "Se sintió llamada a hacerlo.", "Llamó y la oyeron."],
   "*sentirsi* + infinitivo = oír que a uno le hacen algo: *si è sentita chiamare*. «Sentirse llamada» "
   "(vocación) sería *si è sentita chiamata*.")
tr(41, "p", T_PERC, "Se vio superado por un chico de quince años.",
   combo("Si è visto superare da un ", ["ragazzo", "ragazzino"], " di quindici anni.")
   + combo("È stato superato da un ", ["ragazzo", "ragazzino"], " di quindici anni."),
   "Pasiva de percepción: *vedersi* + infinitivo + *da* para el que hace la acción: *si è visto superare "
   "da un ragazzo*. La pasiva común (*è stato superato*) también vale.")
T_SEN = "sentire"
ch(41, "s", T_SEN, QQ, "«Senti che profumo!»",
   ["¡Olé qué rico perfume!", "¿Escuchás ese perfume?", "Sentí pena por el perfume."],
   "*sentire* también es oler y probar: *senti che profumo!* = ¡olé qué rico!, *senti che buono!* = "
   "¡probá qué rico!")
ch(41, "s", T_SEN, QQ, "«Ho sentito che ti sposi.»",
   ["Me enteré de que te casás.", "Presentí que te ibas a casar.", "Te escuché decir que sí."],
   "Es el *sentire* de las noticias: *ho sentito che…* = me enteré de que (me lo contaron), no «sentí».")
ch(41, "s", T_SEN, QQ, "«Non me la sento di guidare.»",
   ["No me animo a manejar.", "No siento el volante.", "No me la imagino manejando."],
   "*sentirsela (di)* = animarse: *non me la sento* = no me animo. *se* y *la* quedan fijos; cambia la "
   "persona: *te la senti?*")
ch(41, "s", T_SEN, QQ, "«Allora ci sentiamo domani.»",
   ["Entonces hablamos mañana.", "Entonces nos sentamos mañana.", "Entonces mañana nos sentimos mejor."],
   "*Ci sentiamo* = hablamos (por teléfono o por mensaje), la despedida de todos los días. «Sentarse» es "
   "*sedersi*.")
li(41, "Escuchá: ¿a quién viste?", "L'ho vista uscire.", ["a ella", "a él"],
   "*l'ho vista* (a ella) termina en *-a*; *l'ho visto* (a él), en *-o*. El participio concuerda con el "
   "pronombre.", answer="a ella")
li(41, HORA, "L'ho sentito rientrare verso l'una e mezza.", ["1:30", "11:30", "12:30"],
   "*l'una e mezza* = la una y media (*le undici* = 11, *mezzogiorno e mezzo* = 12:30).", answer="1:30")
di(41, "Li ho sentiti litigare tutta la notte.",
   "Percepción + infinitivo: *li ho sentiti litigare*. *sentiti* concuerda con *li*.")
rb(41, "Una notte in campagna",
   "Sentivo le cicale ___ (cantare) e i cani abbaiare lontano. A un certo punto ___ (sentire, passato "
   "prossimo) qualcuno camminare in giardino.",
   [["cantare"], ["ho sentito"]],
   "Después de *sentire* o *vedere*, lo que hace el otro va en infinitivo: *sentivo le cicale cantare*, "
   "no «cantando».")

# ===========================================================================
# 42: latinismos del registro formal, escucha, lectura (preposiciones)
# ===========================================================================
T_LAT = "latinismi"
cz(42, "x", T_LAT, "Completá con el latinismo (por única vez).",
   "Per le famiglie colpite dall'alluvione il governo ha previsto un contributo ___ di 500 euro.",
   "una tantum",
   "*una tantum* = por única vez, invariable: *un contributo una tantum*, *due contributi una tantum*.")
cz(42, "x", T_LAT, "Completá con el latinismo (por persona).",
   "Il consumo di acqua ___ in Italia è tra i più alti d'Europa.", "pro capite",
   "*pro capite* = por persona, per cápita. Es el de las estadísticas: *il reddito pro capite*.")
ch(42, "x", T_LAT, CE, "La squadra si è salvata ___, all'ultimo minuto.",
   ["in extremis", "a priori", "ad hoc"],
   "Lo que se salva *all'ultimo minuto* se salva *in extremis*. En cambio, *a priori* es «de antemano» y *ad hoc*, «hecho para eso».")
tr(42, "x", T_LAT, "Crearon una comisión especial para este caso.",
   combo(["Hanno creato", "È stata creata", "Hanno istituito", "È stata istituita"], " una commissione ad hoc per ",
         ["questo caso", "il caso"], "."),
   "«Especial, hecho para eso» = *ad hoc*: *una commissione ad hoc*. Es invariable y no lleva cursiva en "
   "un texto normal.")
ch(42, "x", T_LAT, CE, "È un museo ___: non somiglia a nessun altro.",
   ["sui generis", "pro capite", "una tantum"],
   "Si no se parece a ningún otro, es *sui generis*: único en su tipo. Los otros dos son de números y trámites.")
cz(42, "x", T_LAT, "Completá con el latinismo (de antemano).",
   "Non possiamo escludere ___ questa ipotesi.", "a priori",
   "*a priori* = de antemano, sin mirar los datos; *a posteriori*, después.")
ch(42, "x", T_LAT, CE, "Il divieto non è scritto da nessuna parte, ma esiste ___.",
   ["de facto", "ad hoc", "una tantum"],
   "Existe sin estar escrito: *de facto*, de hecho. También se dice *di fatto*, que es más común.")
li(42, OIDO, "Avevamo cominciato a correre.", ["Avevamo cominciato a correre.", "Abbiamo cominciato a correre."],
   "*avevamo* (trapassato) tiene una sílaba más que *abbiamo*: a-ve-*va*-mo. Y *cominciare* va con *a*.")
li(42, ANNO, "Si è iscritto all'università nel duemilasedici.", ["2016", "2006", "2060"],
   "*duemilasedici* = 2016 (*duemilasei* = 2006, *duemilasessanta* = 2060).", answer="2016")
di(42, "Non sono riuscito a trovare il tempo.",
   "*riuscire a* + infinitivo, con *essere*: *sono riuscito*.",
   alt=["Non sono riuscita a trovare il tempo."])
rb(42, "Buoni propositi",
   "A gennaio Luca ha deciso ___ cambiare vita. Ha smesso ___ fumare e ha cominciato ___ correre ogni "
   "mattina. Non è riuscito ___ trovare il tempo per la chitarra.",
   [["di"], ["di"], ["a"], ["a"]],
   "*decidere di*, *smettere di*; *cominciare a*, *riuscire a*. La lista se aprende de a pares, con el "
   "verbo y su preposición juntos.",
   prompt="Racconto a buchi: es la lectura de la semana («%s»). Completá con la preposición que pide cada verbo.",
   topic="preposizioni")

# ===========================================================================
# 43: escucha y la lectura «Imparare da adulti»
# ===========================================================================
li(43, OIDO, "Dopo aver mangiato, è uscito.", ["Dopo aver mangiato, è uscito.", "Dopo aver mangiato, sono uscito."],
   "*è uscito* (él) y *sono uscito* (yo): escuchá el auxiliar. El infinitivo compuesto no dice la persona.")
li(43, "Escuchá: ¿cuánto estudia por día?", "Studia venti minuti al giorno.", ["20 minuti", "12 minuti", "2 minuti"],
   "*venti* = 20 (*dodici* = 12, *due* = 2).", answer="20 minuti")
di(43, "Prima di andare a dormire, ripasso le parole nuove.",
   "*prima di* + infinitivo, con el mismo sujeto: *prima di andare*.")
rb(43, "Imparare da adulti",
   "Dopo ___ (leggere) un testo, conviene riassumerlo con parole proprie. Prima di ___ (andare) a dormire, "
   "è utile ripassare le parole nuove.",
   [["aver letto", "avere letto"], ["andare"]],
   "*dopo* + infinitivo compuesto (*dopo aver letto*): primero se lee. *prima di* + infinitivo simple.")

# ===========================================================================
# 44: gerundio con sujeto distinto, participio presente, escucha, lectura
# ===========================================================================
T_GER = "gerundio e participio"
fx(44, "g", T_GER, "tempo_verbale", "Essendo malato, il medico gli ha prescritto una settimana di riposo.",
   "Essendo", "Siccome era",
   "El gerundio toma el sujeto de la principal: así el enfermo sería el médico. Con sujetos distintos, "
   "conector: *siccome era malato*.", good_alt=["Dato che era", "Poiché era", "Visto che era"])
fx(44, "g", T_GER, "tempo_verbale", "Arrivando a casa, il telefono ha squillato.", "Arrivando", "Mentre arrivavo",
   "El que llega no es el teléfono: con otro sujeto, el gerundio no sirve. *Mentre arrivavo a casa* o "
   "*appena sono arrivato*.", good_alt=["Appena sono arrivato", "Appena sono arrivata", "Quando sono arrivato",
                                       "Quando sono arrivata", "Mentre arrivavamo"])
fx(44, "g", T_GER, "tempo_verbale", "Leggendo il giornale, il gatto mi è saltato in braccio.", "Leggendo",
   "Mentre leggevo",
   "Así el que lee el diario es el gato: el gerundio toma el sujeto de la principal. Con otro sujeto, "
   "*mentre* + imperfetto: *mentre leggevo il giornale*.", good_alt=["Mentre leggevamo"])
tr(44, "g", T_GER, "Al salir del cine, nos encontramos con Marta.",
   combo(["Uscendo dal cinema", "Mentre uscivamo dal cinema", "All'uscita dal cinema"], ", ",
         ["abbiamo incontrato Marta", "ci siamo incontrati con Marta", "abbiamo visto Marta"], "."),
   "Acá sí: el que sale y el que encuentra es el mismo (*noi*), así que vale el gerundio, *uscendo dal "
   "cinema*. «Al + infinitivo» no se calca con *al*.")
ty(44, "g", T_GER,
   "I cittadini che risiedono all'estero votano per posta. → I cittadini ___ all'estero votano per posta.",
   "residenti",
   "Participio presente con valor de verbo: *residenti* = que residen. Es el de los avisos y las leyes; "
   "hablando, la relativa.")
ty(44, "g", T_GER,
   "Gli studenti che provengono da altre città pagano meno. → Gli studenti ___ da altre città pagano meno.",
   "provenienti",
   "*provenire* → *provenienti* (que vienen de). El participio presente concuerda en número: "
   "*proveniente*, *provenienti*.")
ch(44, "g", T_GER, CE, "Il sindaco ___ si ricandida alle prossime elezioni.",
   ["uscente", "uscito", "uscendo"],
   "*uscente* = saliente, el que termina su mandato: participio presente. *uscito* sería «el que salió» y "
   "el gerundio no va con un sustantivo.")
li(44, OIDO, "Arrivate al ponte, si sono fermate.", ["Arrivate al ponte, si sono fermate.",
                                                    "Arrivati al ponte, si sono fermati."],
   "*arrivate*, *fermate* (ellas) terminan en *-e*; *arrivati*, *fermati* (ellos o un grupo mixto), en *-i*.")
li(44, HORA, "Il treno parte alle diciotto e quarantacinque.", ["18:45", "8:45", "19:45"],
   "*diciotto* = 18 (*otto* = 8, *diciannove* = 19). En horarios se cuenta hasta 24.", answer="18:45")
di(44, "Pur essendo stanca, è uscita con le amiche.",
   "*pur* + gerundio = aunque, con el mismo sujeto: *pur essendo stanca*.",
   alt=["Pur essendo stanco, è uscito con gli amici."])
rb(44, "Tornando a casa",
   "___ (tornare) a casa dal lavoro, Silvia ha incontrato una vecchia amica. ___ (finire) la cena, hanno "
   "camminato lungo il fiume. ___ (arrivare) al ponte, si sono fermate a guardare le luci.",
   [["Tornando"], ["Finita"], ["Arrivate"]],
   "Gerundio para lo que pasa mientras (*tornando*); participio absoluto para lo ya terminado. Con "
   "transitivo concuerda con el objeto (*finita la cena*); con *essere*, con el sujeto (*arrivate*).",
   prompt="Racconto a buchi: es la lectura de la semana («%s»). Usá gerundio o participio, como el texto.",
   topic=T_GER)

# ===========================================================================
# 45: futuro de suposición, come se, escucha, lectura
# ===========================================================================
T_FE = "futuro epistemico"
tr(45, "f", T_FE, "No contesta: debe de estar en una reunión.",
   combo("Non risponde", [": ", ", "], ["sarà in riunione", "dev'essere in riunione", "deve essere in riunione",
                                         "sarà a una riunione"], "."),
   "Para suponer algo de ahora, el italiano usa el futuro: *sarà in riunione*. *deve essere* también "
   "vale, pero el futuro es lo más natural.")
tr(45, "f", T_FE, "Llega tarde: habrá perdido el tren.",
   combo(["È in ritardo", "Arriva tardi", "Ritarda"], [": ", ", "],
         ["avrà perso il treno", "avrà perduto il treno", "deve aver perso il treno", "dev'aver perso il treno"], "."),
   "Suposición sobre algo ya pasado: futuro anteriore, *avrà perso*. Igual que en castellano («habrá perdido»).")
cz(45, "f", T_FE, "Completá con el futuro de suposición.", "Non trovo le chiavi: le ___ (lasciare) in macchina.",
   "avrò lasciate",
   "Suposición sobre el pasado: *avrò lasciate*. Con *le* delante, el participio concuerda: *lasciate*.")
ch(45, "f", T_FE, CE, "Paolo non è venuto alla festa. — Boh, ___ stanco.", ["sarà", "sia", "fosse"],
   "Suposición sin verbo de opinión: futuro, *sarà stanco* (estará cansado). El congiuntivo pediría un "
   "*credo che* delante.")
ch(45, "f", T_FE, QQ, "«Non sarà mica arrabbiato?»",
   ["¿No estará enojado, no?", "No va a estar enojado.", "No está nada enojado."],
   "*Non sarà mica…?* expresa un temor: «¿no estará…?». El futuro acá no habla del futuro: supone.")
cz(45, "f", T_FE, "Completá con el futuro de suposición.", "Sono già le nove: i ragazzi ___ (arrivare) a scuola.",
   "saranno arrivati",
   "Algo que ya debería haber pasado: futuro anteriore, *saranno arrivati* (con *essere*, concuerda).")
T_CS = "come se"
tr(45, "c", T_CS, "Entró como si nada.",
   combo(["È entrato", "È entrata", "Entrò"], " come se ", ["niente", "nulla"], " fosse."),
   "Fórmula fija con congiuntivo imperfetto: *come se niente fosse* (o *nulla*), «como si nada».")
fx(45, "c", T_CS, "modo_verbale", "Mi guarda come se ho detto una sciocchezza.", "ho", "avessi",
   "*come se* pide congiuntivo; algo anterior, trapassato: *come se avessi detto*.")
cz(45, "c", T_CS, "Completá con el congiuntivo.", "Fai come se ___ (essere) a casa tua.", "fossi",
   "*come se* + congiuntivo imperfetto: *come se fossi a casa tua* = hacé de cuenta que estás en tu casa.")
li(45, OIDO, "Ce l'ho fatta!", ["Ce l'ho fatta!", "Ce l'ha fatta!"],
   "*ho* (yo) y *ha* (él, ella) se distinguen por la vocal: *ce l'ho fatta* = ¡lo logré!")
li(45, "Escuchá: ¿cuánto tardó?", "Ci ho messo quattro ore e mezza.", ["4 h 30", "4 h 15", "14 h 30"],
   "*quattro ore e mezza* = cuatro horas y media (*e un quarto* = y cuarto, *quattordici* = 14).",
   answer="4 h 30")
di(45, "Te la sei cavata bene.",
   "*cavarsela* = arreglárselas: *te la sei cavata*, con *essere* y el participio en *-a* (concuerda con *la*).")
rb(45, "La maratona",
   "Paolo ___ (metterci, passato prossimo) quattro ore e mezza, ma ___ (farcela, passato prossimo). "
   "Sua figlia gli ha detto: \"Te la ___ (cavarsela, passato prossimo) bene, papà!\"",
   [["ci ha messo"], ["ce l'ha fatta"], ["sei cavata"]],
   "*metterci* va con *avere* (*ci ha messo*); *farcela*, también (*ce l'ha fatta*, en *-a* por *la*). "
   "*cavarsela* es reflexivo: *te la sei cavata*.",
   topic="costruzioni")

# ===========================================================================
# 46: escucha (alterados, precios)
# ===========================================================================
li(46, "Escuchá: ¿grande o chico?", "Mi hanno regalato un librone.", ["grande", "chico"],
   "*-one* agranda (*librone* = libro grande y pesado); *-etto* / *-ino* achican (*libretto*, *librino*).",
   answer="grande")
li(46, PRECIO, "Il cappellino costa quattordici euro e novanta.", ["14,90 €", "40,90 €", "4,90 €"],
   "*quattordici* = 14 (*quaranta* = 40, *quattro* = 4). *e novanta* = y noventa centavos.", answer="14,90 €")
di(46, "Il vecchietto ha un gattino nero.",
   "*vecchietto* y *gattino*: diminutivos afectivos (un viejito, un gatito).")
rb(46, "Il gattino del vicino",
   "Nel ___ (palazzo, grande) dove abito vive un ___ (vecchio, con cariño) simpaticissimo. Ha un ___ "
   "(gatto, chico) nero e un ___ (cane, chico) bianco. Ieri il gatto è sparito: l'abbiamo trovato dentro "
   "uno ___ (scatola, grande).",
   [["palazzone"], ["vecchietto", "vecchino"], ["gattino"], ["cagnolino", "cagnetto"], ["scatolone"]],
   "*-one* agranda y pasa al masculino: *la scatola* → *lo scatolone*. *-ino* y *-etto* achican con "
   "cariño; *cane* hace *cagnolino*, con una *-ol-* en el medio.",
   prompt="Racconto a buchi: es la lectura de la semana («%s»). Escribí la palabra con el sufijo que usa el texto.",
   topic="alterati")

# ===========================================================================
# 47: chi / quanto, bello / buono, escucha, lectura
# ===========================================================================
T_CHI = "chi e quanto"
ch(47, "q", T_CHI, CE, "___ rompe paga.", ["Chi", "Che", "Quale"],
   "*chi* = el que, quien: ya trae el antecedente. *che* necesita un sustantivo delante (*la persona che "
   "rompe*).")
fx(47, "q", T_CHI, "accordo", "Chi hanno finito può uscire.", "hanno", "ha",
   "*chi* va siempre con verbo en singular, aunque pienses en varios: *chi ha finito può uscire*.")
tr(47, "q", T_CHI, "Te agradezco todo lo que hiciste por mí.",
   combo("Ti ringrazio ", ["per quanto", "per tutto quello che", "per tutto quanto", "di tutto quello che",
                           "per tutto ciò che", "di quanto"], " hai fatto per me."),
   "«Todo lo que» = *quanto* (o *tutto quello che*): *ti ringrazio per quanto hai fatto*.")
cz(47, "q", T_CHI, "Completá con un relativo.", "Ringraziamo ___ sono intervenuti alla serata.", "quanti",
   "*quanti* = (todos) los que: *ringraziamo quanti sono intervenuti*. Más largo: *tutti quelli che*, "
   "*coloro che*.", alt=["tutti quelli che", "coloro che", "tutti coloro che", "quelli che"])
ty(47, "q", T_CHI,
   "Le cose che sono state dette valgono anche per voi. → ___ detto vale anche per voi.", "Quanto",
   "*quanto detto* = lo dicho, todo lo que se dijo. Es del registro formal: *quanto detto sopra*, "
   "*quanto segue*.", alt=["Quanto è stato", "Ciò che è stato", "Quello che è stato"])
ch(47, "q", T_CHI, QQ, "«Chi tace acconsente.»",
   ["El que calla otorga.", "¿Quién se calla?", "El que otorga se calla."],
   "*chi* + verbo = el que: *chi tace* (el que calla) *acconsente* (otorga). Sin signo de pregunta, "
   "*chi* no pregunta.")
T_BB = "bello e buono"
tr(47, "b", T_BB, "No entendí nada de nada.",
   ["Non ho capito un bel niente.", "Non ho capito un bel nulla.", "Non ho capito niente di niente.",
    "Non ho capito proprio niente.", "Non ho capito assolutamente niente."],
   "*un bel niente* = nada de nada: *bello* delante del sustantivo intensifica. *Proprio niente* también vale.")
cz(47, "b", T_BB, "Completá: «media hora larga».", "Ho aspettato una ___ mezz'ora prima che arrivasse.",
   "buona",
   "Delante de una medida, *buono* quiere decir «largo, cumplido»: *una buona mezz'ora* es media hora larga, por lo menos.")
cz(47, "b", T_BB, "Completá: «ya del todo».", "La cena è ___ pronta: venite a tavola!", "bell'e",
   "*bell'e* + participio = ya del todo, listo: *è bell'e pronta*. Delante de vocal, *bell'*.",
   alt=["bella e"])
fx(47, "b", T_BB, "forma", "Ci vuole un bello po' di pazienza.", "bello", "bel",
   "Delante de consonante, *bel*: *un bel po'* (como *quel*, *quello*). *bello* entero solo delante de "
   "s + consonante o z.")
tr(47, "b", T_BB, "Hace un montón que no lo veo.",
   ["È un bel po' che non lo vedo.", "Non lo vedo da un bel po'.", "È da un bel po' che non lo vedo.",
    "Non lo vedo da parecchio tempo.", "È da parecchio che non lo vedo.", "Non lo vedo da un sacco di tempo."],
   "*un bel po'* = un buen rato, un montón: *non lo vedo da un bel po'*.")
ch(47, "b", T_BB, QQ, "«Pesa un buon chilo.»",
   ["Pesa un kilo largo.", "Pesa un kilo justo.", "Pesa un kilo de calidad."],
   "*buono* delante de una medida = largo, cumplido: *un buon chilo*, *una buona mezz'ora*.")
li(47, "Escuchá: ¿cuántos votaron?", "Hanno votato i due terzi degli iscritti.", ["2/3", "1/3", "3/2"],
   "*due terzi* = 2/3 (*un terzo* = 1/3). Las fracciones usan el ordinal: *un quarto*, *tre quinti*.",
   answer="2/3")
li(47, "Escuchá: ¿qué porcentaje?", "La disoccupazione è scesa al sette virgola otto per cento.",
   ["7,8 %", "8,7 %", "78 %"],
   "*sette virgola otto* = 7,8: la coma se dice *virgola*. *per cento* = por ciento.", answer="7,8 %")
di(47, "Servono mezzo chilo di carne e un etto di pancetta.",
   "*mezzo chilo* (delante del sustantivo, concuerda: *mezza cipolla*); *un etto* = cien gramos.")
rb(47, "La ricetta della nonna",
   "Per il ragù servono ___ chilo di carne macinata e ___ cipolla. Il sugo deve cuocere ___ ore a fuoco "
   "basso. (1/2, 1/2, 3)",
   [["mezzo"], ["mezza"], ["tre"]],
   "Delante del sustantivo, *mezzo* concuerda: *mezzo chilo*, *mezza cipolla*. Después de *e* puede "
   "quedar igual o concordar: *un litro e mezzo*, *due ore e mezza*.",
   prompt="Racconto a buchi: es la lectura de la semana («%s»). Escribí las cantidades en letras.",
   topic="numerali")

# ===========================================================================
# 48: magari + congiuntivo, escucha, lectura (pronombres de retoma)
# ===========================================================================
T_OPT = "congiuntivo indipendente"
tr(48, "o", T_OPT, "¡Ojalá fuera cierto!",
   ["Magari fosse vero!", "Magari fosse così!", "Se solo fosse vero!", "Fosse vero!"],
   "«Ojalá» + pasado = *magari* + congiuntivo imperfetto: *magari fosse vero!* Es un deseo que difícilmente "
   "se cumpla.")
cz(48, "o", T_OPT, "Completá con el congiuntivo.", "Magari ___ (avere, io) vent'anni di meno!", "avessi",
   "*magari* + congiuntivo imperfetto = ojalá: *magari avessi* (ojalá tuviera).")
ch(48, "o", T_OPT, QQ, "«Magari è vero.»",
   ["Quizás sea verdad.", "¡Ojalá fuera verdad!", "Seguro que es verdad."],
   "Con indicativo, *magari* = quizás: *magari è vero*. Con congiuntivo imperfetto es un deseo: *magari "
   "fosse vero!*")
li(48, OIDO, "Gliel'ho detto io.", ["Gliel'ho detto io.", "Gliel'hai detto tu."],
   "*ho* … *io* y *hai* … *tu*: el auxiliar y el pronombre del final dicen la persona.")
li(48, ANNO, "È nato nel millenovecentottantotto.", ["1988", "1898", "1978"],
   "*millenovecento* = 1900, *ottantotto* = 88: 1988. Los años se dicen de corrido, en una palabra.",
   answer="1988")
di(48, "Il caffè lo prendo sempre al bar.",
   "Dislocación a la izquierda: *il caffè* va primero y el pronombre *lo* lo retoma.")
rb(48, "Il barista Gino",
   "Il caffè, ___ prendo sempre al bar sotto casa. Il barista, Gino, ___ conosco da vent'anni. Di calcio, "
   "con lui, ___ parlo ogni mattina. Lo scudetto ___ vince l'Inter.",
   [["lo"], ["lo"], ["ne"], ["lo"]],
   "Lo que se pone adelante se retoma con un pronombre: *il caffè, lo…*; *di calcio, ne…* (*parlare di* "
   "pide *ne*).",
   prompt="Racconto a buchi: es la lectura de la semana («%s»). Completá con el pronombre que retoma lo que "
          "va adelante.", topic="dislocazioni")

# ===========================================================================
# 49: por propósito — causa y concesión
# ===========================================================================
T_PP = "per scopo"
P_IMP = "Reescribí con la forma implícita que se pide: escribí solo lo que falta."
P_ESP = "Reescribí con conector y verbo conjugado: escribí solo lo que falta."
# causa
ty(49, "p", T_PP, "Siccome era stanco, è andato a letto presto. → ___ stanco, è andato a letto presto.",
   "Essendo",
   "Causa con el mismo sujeto: gerundio, *essendo stanco*. Es más cuidado que *siccome era*.", prompt=P_IMP)
ty(49, "p", T_PP, "Essendo arrivato in ritardo, ha perso l'inizio. → Siccome ___ in ritardo, ha perso l'inizio.",
   "era arrivato",
   "Al revés: el gerundio compuesto vuelve a ser *siccome* + trapassato (antes que *ha perso*). "
   "*è arrivato* también vale.", alt=["è arrivato"], prompt=P_ESP)
ty(49, "p", T_PP,
   "È stato multato perché aveva parcheggiato in doppia fila. → È stato multato per ___ in doppia fila.",
   "aver parcheggiato",
   "*per* + infinitivo **compuesto** = por haber: la causa. Con el simple sería finalidad (*per "
   "parcheggiare* = para estacionar).", alt=["avere parcheggiato"], prompt=P_IMP)
ty(49, "p", T_PP,
   "Era così stanco che non riusciva nemmeno a parlare. → Stanco ___, non riusciva nemmeno a parlare.",
   "com'era",
   "*adjetivo + com'era* = cansado como estaba: causa expresiva, muy de la charla y de la narración.",
   alt=["come era"])
ty(49, "p", T_PP, "Non è venuto perché era malato. → Non è venuto ___ malattia.", "per",
   "*per* + sustantivo sin artículo da la causa en el registro burocrático: *assente per malattia*.",
   alt=["a causa di", "causa"])
ty(49, "p", T_PP,
   "Dato che il treno era in ritardo, abbiamo preso un taxi. → ___ il treno in ritardo, abbiamo preso un taxi.",
   "Essendo",
   "Sujetos distintos (el tren, nosotros): el gerundio puede ir igual si lleva **su** sujeto después: "
   "*essendo il treno in ritardo*. Es de lo escrito formal.", prompt=P_IMP)
ty(49, "p", T_PP,
   "Visto il maltempo, la partita è stata rinviata. → ___ c'era maltempo, la partita è stata rinviata.",
   "Siccome",
   "*visto* + sustantivo es la versión compacta; con verbo conjugado, *siccome*, *dato che*, *visto che*, "
   "*poiché*.", alt=["Dato che", "Visto che", "Poiché", "Poichè", "Dal momento che"], prompt=P_ESP)
ty(49, "p", T_PP,
   "Avendo perso il lavoro, ha dovuto cambiare casa. → ___ il lavoro, ha dovuto cambiare casa.",
   "Perso",
   "Participio absoluto: *perso il lavoro*. Concuerda con el objeto (*persa la casa*, *persi i soldi*).",
   prompt="Reescribí con el participio: escribí solo lo que falta.")
# concesión
ty(49, "p", T_PP,
   "Benché avesse studiato molto, non ha superato l'esame. → ___ studiato molto, non ha superato l'esame.",
   "Pur avendo",
   "Concesión con el mismo sujeto: *pur* + gerundio compuesto (*pur avendo studiato*) = aunque había estudiado.",
   prompt=P_IMP)
ty(49, "p", T_PP, "Pur essendo ricco, vive in un monolocale. → ___ ricco, vive in un monolocale.",
   "Benché sia",
   "Al revés: *pur essendo* → *benché* (o *sebbene*) + congiuntivo, *benché sia ricco*. Con *anche se*, "
   "indicativo.", alt=["Sebbene sia", "Anche se è", "Nonostante sia", "Malgrado sia"], prompt=P_ESP)
ty(49, "p", T_PP, "Benché piovesse, siamo usciti. → ___ la pioggia, siamo usciti.", "Nonostante",
   "Con sustantivo, sin verbo: *nonostante la pioggia* (o *malgrado*). Es la forma nominal de la concesión.",
   alt=["Malgrado"], prompt="Reescribí con un sustantivo: escribí solo lo que falta.")
ty(49, "p", T_PP, "Nonostante la fatica, ha finito la gara. → ___ stanco, ha finito la gara.", "Benché fosse",
   "De la forma nominal a la explícita: *benché* + congiuntivo imperfetto (pasado). *Pur essendo* y *anche "
   "se era* también valen.", alt=["Sebbene fosse", "Pur essendo", "Anche se era", "Nonostante fosse"],
   prompt=P_ESP)
ty(49, "p", T_PP, "Anche se era stanco, ha lavorato fino a tardi. → ___ stanco, ha lavorato fino a tardi.",
   "Pur essendo",
   "*anche se* + indicativo → *pur* + gerundio, con el mismo sujeto. *pur* es lo que le da el valor de «aunque».",
   prompt=P_IMP)
ty(49, "p", T_PP,
   "Anche se si sforza, non riesce a dimagrire. → Per quanto si ___, non riesce a dimagrire.", "sforzi",
   "*per quanto* + congiuntivo = por más que: *per quanto si sforzi*. Es concesión con énfasis, del "
   "registro cuidado.")
ty(49, "p", T_PP, "Pur avendo vinto, non era contento. → ___ vinto, non era contento.", "Benché avesse",
   "*pur avendo* → *benché* + congiuntivo trapassato (anterior a *era*): *benché avesse vinto*.",
   alt=["Sebbene avesse", "Anche se aveva", "Nonostante avesse"], prompt=P_ESP)
ty(49, "p", T_PP,
   "Malgrado il traffico, siamo arrivati in tempo. → Benché ___ traffico, siamo arrivati in tempo.",
   "ci fosse",
   "De la forma nominal a la explícita: *benché ci fosse traffico*, con congiuntivo imperfetto.",
   prompt=P_ESP)
li(49, OIDO, "Qualora ci fossero problemi, contattate l'amministrazione.",
   ["Qualora ci fossero problemi, contattate l'amministrazione.",
    "Qualora ci fosse un problema, contattate l'amministrazione."],
   "*fossero* (plural, *problemi*) termina en *-ero*; *fosse* (singular), en *-e*.")
li(49, "Escuchá: ¿cuándo empiezan los trabajos?", "I lavori inizieranno lunedì tre marzo.",
   ["lunedì 3 marzo", "lunedì 13 marzo", "martedì 3 marzo"],
   "*tre* = 3 (*tredici* = 13); *lunedì* = lunes, *martedì* = martes.", answer="lunedì 3 marzo")
di(49, "Ci scusiamo per il disagio.",
   "Fórmula de los avisos: *ci scusiamo per il disagio* = disculpen las molestias.")
rb(49, "Avviso ai condomini",
   "Durante tale periodo, ___ durata è prevista in due settimane, l'ascensore non funzionerà. ___ vi "
   "fossero problemi, si prega di contattare l'amministrazione.",
   [["la cui"], ["Qualora", "Nel caso in cui", "Nel caso che"]],
   "*la cui durata* = cuya duración: el artículo concuerda con lo poseído (*durata*). *qualora* + "
   "congiuntivo es el «en caso de que» de los avisos.",
   prompt="Racconto a buchi: es la lectura de la semana («%s»). Completá con las palabras del registro formal.",
   topic="registro alto")

# ===========================================================================
# 50: formación y colocaciones donde el calco falla, escucha
# ===========================================================================
T_FC = "calco lessicale"
P_FP = "Formá la palabra que pide el paréntesis."
cz(50, "f", T_FC, P_FP, "Con il visto ho avuto molte ___. (difficile)", "difficoltà",
   "*difficile* → *difficoltà* (no «difficilità»). Es invariable: *una difficoltà*, *molte difficoltà*.")
cz(50, "f", T_FC, P_FP, "Nessuno mette in dubbio l'___ del vaccino. (efficace)", "efficacia",
   "*efficace* → *efficacia*, como en castellano; «efficacità» no existe.")
cz(50, "f", T_FC, P_FP, "Il treno è stato cancellato e ho chiesto il ___ del biglietto. (rimborsare)", "rimborso",
   "*rimborsare* → *il rimborso* (el reembolso), sin sufijo: «rimborsamento» no existe.")
cz(50, "f", T_FC, P_FP, "Quest'anno l'azienda farà venti nuove ___. (assumere)", "assunzioni",
   "*assumere* (contratar) → *assunzione* (contratación). No es «asunción».")
cz(50, "f", T_FC, P_FP, "Il proprietario ha ottenuto lo ___ dell'inquilino. (sfrattare)", "sfratto",
   "*sfrattare* (desalojar) → *lo sfratto* (el desalojo): el sustantivo es la raíz sola.")
ch(50, "f", T_FC, QQ, "«Il governo deve attuare la riforma.»",
   ["Tiene que llevar a cabo la reforma.", "Tiene que actuar en la reforma.", "Tiene que actualizar la reforma."],
   "*attuare* = llevar a cabo, poner en práctica (*l'attuazione*). «Actuar» es *agire*; «actualizar», *aggiornare*.")
ch(50, "f", T_FC, QQ, "«Ho ricevuto un sollecito di pagamento.»",
   ["Recibí un recordatorio de pago.", "Recibí una solicitud de pago.", "Recibí un pago por adelantado."],
   "*un sollecito* = un recordatorio (de una deuda, de un trámite). «Solícito» es *premuroso*; «solicitud», "
   "*domanda* o *richiesta*.")
ch(50, "c", T_FC, CE, "Dai dati possiamo ___ alcune conclusioni.", ["trarre", "tirare", "prendere"],
   "*trarre conclusioni* = sacar conclusiones. *tirare* es el calco de «tirar»: no va.")
ch(50, "c", T_FC, CE, "Il Comune ha ___ noti i risultati del concorso.", ["reso", "fatto", "dato"],
   "Para «dar a conocer», el registro formal usa *rendere noto*: *ha reso noti i risultati*. «fare noto» calca el castellano.")
ch(50, "c", T_FC, CE, "Durante la riunione nessuno ha ___ obiezioni.", ["sollevato", "alzato", "messo"],
   "*sollevare obiezioni* (o *muovere*). *alzare* es el calco de «levantar»: se alza la mano, no una objeción.")
ch(50, "c", T_FC, CE, "Dopo cena abbiamo ___ una passeggiata in centro.", ["fatto", "dato", "preso"],
   "*fare una passeggiata* (o *fare due passi*). «Dar un paseo» no se calca con *dare*.")
fx(50, "c", T_FC, "collocazione", "Domenica abbiamo dato un giro in bicicletta.", "dato", "fatto",
   "«Dar una vuelta» = *fare un giro*: *abbiamo fatto un giro in bicicletta*. *dare* no va.")
fx(50, "c", T_FC, "collocazione", "Mi ha tirato una foto davanti al Colosseo.", "tirato", "scattato",
   "Las fotos se *scattano* (o se *fanno*): *mi ha scattato una foto*. *tirare* es el calco de «tirar una foto».", good_alt=["fatto"])
fx(50, "c", T_FC, "collocazione", "Bisogna mettere più attenzione quando si guida.", "mettere", "prestare",
   "La atención se presta: *prestare attenzione*, o *fare attenzione*. «Poner atención» no se calca con *mettere*.", good_alt=["fare"])
fx(50, "c", T_FC, "collocazione", "Il ministro ha fatto noto il suo programma.", "fatto", "reso",
   "«Dar a conocer» = *rendere noto*: *ha reso noto il programma*.")
fx(50, "c", T_FC, "collocazione", "Da questi dati tiriamo una conclusione chiara.", "tiriamo", "traiamo",
   "«Sacar una conclusión» = *trarre una conclusione*: *traiamo*. *trarre* es irregular (*traggo, trai, trae*).")
fx(50, "c", T_FC, "collocazione", "Il deputato ha alzato un'obiezione sul bilancio.", "alzato", "sollevato",
   "Una objeción se *solleva* (o se *muove*), no se *alza*: *ha sollevato un'obiezione*.",
   good_alt=["mosso"])
fx(50, "c", T_FC, "collocazione", "Solo dopo un'ora sono caduto in conto dell'errore.", "sono caduto in conto",
   "mi sono reso conto",
   "«Caer en la cuenta» = *rendersi conto* (o *accorgersi*): *mi sono reso conto dell'errore*.",
   good_alt=["mi sono resa conto", "mi sono accorto", "mi sono accorta"])
li(50, "Escuchá: ¿qué te piden?", "Mi passi il burro, per favore?", ["la manteca", "un burro", "la birome"],
   "*il burro* = la manteca: el falso amigo más famoso. «Burro» (el animal) es *l'asino*.", answer="la manteca")
li(50, HORA, "La riunione è stata spostata alle quindici e trenta.", ["15:30", "5:30", "13:30"],
   "*quindici* = 15 (*cinque* = 5, *tredici* = 13). *e trenta* = y media.", answer="15:30")
di(50, "Prima di usare una parola nuova, la controllo sul dizionario.",
   "*prima di* + infinitivo; *controllare* = revisar, chequear (no «controlar» a alguien).")

# ===========================================================================
# 51: por propósito — condición, tiempo, limitativas; escucha
# ===========================================================================
# condición
ty(51, "p", T_PP, "Se l'avessi saputo, sarei venuto. → ___, sarei venuto.", "A saperlo",
   "*a* + infinitivo = si: *a saperlo* (de haberlo sabido). Calca el «de saberlo» castellano, pero con *a*.",
   alt=["Sapendolo", "Avendolo saputo"], prompt=P_IMP)
ty(51, "p", T_PP, "A pensarci bene, hai ragione tu. → Se ___ bene, hai ragione tu.", "ci penso",
   "Al revés: *a pensarci bene* = si lo pienso bien. *Se ci si pensa* (impersonal) también vale.",
   alt=["ci si pensa", "ci pensi"], prompt=P_ESP)
ty(51, "p", T_PP, "Se parti presto, eviti il traffico. → ___ presto, eviti il traffico.", "Partendo",
   "El gerundio también da la condición: *partendo presto* = si salís temprano.", prompt=P_IMP)
ty(51, "p", T_PP, "In caso di pioggia, la festa si farà in casa. → ___ piova, la festa si farà in casa.",
   "Qualora",
   "De la forma nominal a la explícita: *qualora* (o *nel caso in cui*) + congiuntivo, *qualora piova*.",
   alt=["Nel caso in cui", "Nel caso che", "Casomai"], prompt=P_ESP)
ty(51, "p", T_PP, "Qualora ci fossero problemi, chiamatemi. → In caso di ___, chiamatemi.", "problemi",
   "*in caso di* + sustantivo, sin verbo: la forma de los avisos y los reglamentos.",
   prompt="Reescribí con un sustantivo: escribí solo lo que falta.")
ty(51, "p", T_PP, "Ti aiuto, purché tu me lo chieda. → Ti aiuto, a ___ tu me lo chieda.", "condizione che",
   "Las tres piden congiuntivo: *a condizione che*, *a patto che* y *purché* («siempre que»).",
   alt=["patto che"])
ty(51, "p", T_PP, "Se non ci sono imprevisti, partiamo domani. → ___ imprevisti, partiamo domani.", "Salvo",
   "*salvo imprevisti* = salvo imprevistos: fórmula fija de condición negativa.",
   alt=["Salvo eventuali"], prompt="Reescribí con un sustantivo: escribí solo lo que falta.")
ty(51, "p", T_PP, "Puoi entrare se presenti un documento. → Puoi entrare a condizione di ___ un documento.",
   "presentare",
   "*a condizione di* + infinitivo, con el mismo sujeto: *a condizione di presentare*. Es lo formal de «si».",
   prompt=P_IMP)
# tiempo
ty(51, "p", T_PP, "Mentre leggeva la lettera, impallidì. → ___ la lettera, impallidì.", "Nel leggere",
   "*nel* + infinitivo = al + infinitivo castellano (*nel leggere* = al leer). El gerundio también vale.",
   alt=["Leggendo"], prompt=P_IMP)
ty(51, "p", T_PP, "Quando ebbe finito il discorso, lasciò la sala. → ___ il discorso, lasciò la sala.", "Finito",
   "Participio absoluto: *finito il discorso* = una vez terminado el discurso. Concuerda con el objeto.",
   alt=["Dopo aver finito", "Una volta finito", "Avendo finito", "Dopo avere finito"], prompt=P_IMP)
ty(51, "p", T_PP, "Dopo che aveva cenato, è uscito. → Dopo ___ cenato, è uscito.", "aver",
   "Con el mismo sujeto, *dopo* + infinitivo compuesto: *dopo aver cenato*.", alt=["avere"], prompt=P_IMP)
ty(51, "p", T_PP, "Al suo arrivo, tutti si sono alzati. → Quando ___, tutti si sono alzati.", "è arrivato",
   "De la forma nominal (*al suo arrivo*) a la explícita: *quando è arrivato* (o *arrivata*).",
   alt=["è arrivata"], prompt=P_ESP)
ty(51, "p", T_PP, "Mentre tornavo a casa, ho incontrato Luca. → ___ a casa, ho incontrato Luca.", "Tornando",
   "Mismo sujeto (yo): gerundio, *tornando a casa*. Si los sujetos fueran distintos, quedaría *mentre*.",
   alt=["Nel tornare", "Rientrando"], prompt=P_IMP)
# limitativas, pur di, a costo di, salvo
ty(51, "p", T_PP, "Secondo lui è tutto facile, ma non ci credo. → ___ lui, è tutto facile.", "A sentire",
   "*a sentire lui* = según él (y no le creo del todo): *a* + infinitivo limitativo.", alt=["A sentir"],
   prompt=P_IMP)
ty(51, "p", T_PP, "Per dire la verità, non mi è piaciuto. → ___ il vero, non mi è piaciuto.", "A dire",
   "Limita lo que decís: *a dire il vero* (o *a dir la verità*), «a decir verdad», con *a* + infinitivo.", alt=["A dir"], prompt=P_IMP)
ty(51, "p", T_PP, "Farebbe qualsiasi cosa per riuscire a vincere. → Farebbe qualsiasi cosa ___ vincere.",
   "pur di",
   "*pur di* + infinitivo = con tal de: *pur di vincere*. El sujeto es el mismo.")
ty(51, "p", T_PP,
   "Lo finirò anche se dovessi lavorare tutta la notte. → Lo finirò ___ lavorare tutta la notte.",
   "a costo di",
   "*a costo di* + infinitivo = aunque tenga que, a costa de: el precio que estás dispuesto a pagar.")
ty(51, "p", T_PP, "Farò di tutto, ma non rinuncerò alle ferie. → Farò di tutto, ___ rinunciare alle ferie.",
   "salvo",
   "Para la excepción, *salvo* (o *tranne*, *fuorché*) + infinitivo: «salvo, excepto».", alt=["tranne", "fuorché", "fuorchè"])
ty(51, "p", T_PP, "Secondo quello che so, il negozio è chiuso. → ___ ne so, il negozio è chiuso.", "Per quanto",
   "*per quanto ne so* = que yo sepa: limita lo que afirmás. *ne* = de eso.", alt=["Per quel che", "Per quello che"],
   prompt=P_IMP)
li(51, OIDO, "Se fossi in te, non lo farei.", ["Se fossi in te, non lo farei.", "Se fosse in te, non lo farebbe."],
   "*fossi* … *farei* (yo) frente a *fosse* … *farebbe* (él): la vocal final de los dos verbos.")
li(51, ANNO, "Ho cominciato a studiare italiano nel duemilaventicinque.", ["2025", "2015", "2052"],
   "*duemilaventicinque* = 2025 (*duemilaquindici* = 2015, *duemilacinquantadue* = 2052).", answer="2025")
di(51, "Se ti fossi arreso a febbraio, non saresti arrivato fin qui.",
   "Hipótesis sobre el pasado: *se* + congiuntivo trapassato, condizionale passato. *arrendersi* y "
   "*arrivare* van con *essere*.",
   alt=["Se ti fossi arresa a febbraio, non saresti arrivata fin qui."])
