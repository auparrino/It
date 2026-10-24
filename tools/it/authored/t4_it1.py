# -*- coding: utf-8 -*-
"""Tanda 4, italiano, semanas 1-13 (auditorias/PLAN-2026-10-propuestas.md).

Lo que la revisión contra manuales (auditorias/2026-10-italiano-revision.md,
temporada 1) pedía y no estaba hecho:

1. Escucha dentro de las rondas, no solo en Suoni: de la 2 a la 13 no había
   ningún ítem listen.  Ahora hay de 6 a 13 por semana, con lo que se
   distingue de oído: los números del 0 al 20 (2), singular o plural por el
   artículo (2-3), bel / bello y la vocal final (4), la persona por la
   terminación (5-6), horas, precios y fechas (7), quanto / quando, chi /
   che y la entonación (8), las articuladas (9), los pronombres (10),
   ho / o, ha / a, è / e y la concordancia del participio (11), la persona
   del reflexivo y la orden (12), y una mezcla en el jefe (13).  Más algún
   dictado corto por semana.  Las opciones son formas italianas o cifras:
   así se elige por el oído y no por la traducción.
2. Semana 10 en tres tramos: directos con verbos transitivos y sin «a»
   personal (t4it1-10-d…), indirectos con telefonare, scrivere, dire,
   dare, rispondere y el contraste al final (t4it1-10-i…); los tónicos y la
   posición quedan en el tercer tramo de la lección.  Con fixerr de leísmo y
   de «a» personal en la semana misma.
3. El jefe de la 13: una parte «Las trampas» con fixerr mezclados de todo
   lo de la temporada (t4it1-13-t…), por categoría (artículo, auxiliar,
   pronombre, preposición…).

Las notas dicen por qué, no solo cuál.  Prefijo de los ids:
t4it1-<semana>-<tramo><n>.
"""
import re

LEVEL = {}
for _w in range(1, 53):
    LEVEL[_w] = "A1" if _w <= 6 else "A2" if _w <= 18 else "B1" if _w <= 28 else "B2" if _w <= 39 else "C1"

T_ASC = "ascolto"
FX = "Trova l'errore: tocá la palabra que está mal y corregila."
TR = "Traducí al italiano."
PRON = "Contestá en italiano con el pronombre (lo, la, li, le, gli…). Usá la pista entre paréntesis."
DI = "Dictado: escuchá y escribí lo que oís."

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
    d = dict(id="t4it1-%d-%s%02d" % (w, tag, _N[k]), w=w, level=LEVEL[w], type=typ, topic=topic,
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
    """Trova l'errore: «bad» es una palabra de la frase; «good», lo que va
    (vacío si sobra)."""
    pat = r"(?<![\w'])" + re.escape(bad) + r"(?![\w'])"
    assert re.search(pat, stem), (stem, bad)
    answer = re.sub(pat, lambda m: good, stem, count=1)
    answer = re.sub(r"\s{2,}", " ", answer).strip()
    return _add(w, tag, "fixerr", topic, FX, stem, answer, note, cat=cat, bad=bad, good=good)


def tr(w, tag, topic, stem, variants, note):
    return _add(w, tag, "translate", topic, TR, stem, variants[0], note, variants[1:])


def ty(w, tag, topic, stem, variants, note, prompt=PRON):
    return _add(w, tag, "typed", topic, prompt, stem, variants[0], note, variants[1:])


def cz(w, tag, topic, prompt, stem, answer, note, alt=None):
    return _add(w, tag, "cloze", topic, prompt, stem, answer, note, alt)


# ===========================================================================
# 1. Escucha dentro de las rondas
# ===========================================================================

NUM = "Escuchá: ¿qué número dice?"
CUANTOS = "Escuchá: ¿cuántos hay?"
UNO = "Escuchá: ¿uno o varios? Elegí lo que oíste."
OIDO = "Escuchá y elegí lo que oíste."
QUIEN = "Escuchá: ¿quién lo hace? Elegí el sujeto."
HORA = "Escuchá: ¿qué hora dice?"
PRECIO = "Escuchá: ¿cuánto cuesta?"
DIA = "Escuchá: ¿qué día dice?"
INTERR = "Escuchá: ¿con qué palabra pregunta?"
PRON_OIDO = "Escuchá: ¿qué pronombre dice?"
IGUAL = "Escuchá: suenan igual. ¿Cuál es la frase bien escrita?"
QUIEN_HABLA = "Escuchá: ¿quien habla es hombre o mujer? Guiate por la terminación, no por la voz. Elegí la frase."

# --- 2: los números del 0 al 20 (se reconocen; escribirlos, en la 7) ---------
li(2, "n", NUM, "sedici", ["16", "6", "13"],
   "*sedici* (16) contra *sei* (6): del 11 al 16 terminan en *-dici*: undici, dodici, tredici, "
   "quattordici, quindici, sedici.")
li(2, "n", NUM, "tredici", ["13", "3", "30"],
   "*tredici* = 13, *tre* = 3. El 30 (*trenta*) se parece al principio, pero termina en *-enta*; llega en la semana 7.")
li(2, "n", NUM, "diciassette", ["17", "7", "70"],
   "Del 17 al 19 el orden se da vuelta: *dicia-sette*, «diez y siete». Y la doble t de *sette* se sostiene.")
li(2, "n", NUM, "dodici", ["12", "2", "20"],
   "*dodici* (12) empieza como *due* (2) pero termina en *-dici*. El 20 es *venti*.")
li(2, "n", CUANTOS, "Ci sono quindici studenti.", ["15", "5", "50"],
   "*quindici* = 15; *cinque* = 5. Con plural, *ci sono*: *ci sono quindici studenti*.", answer="15")
li(2, "n", CUANTOS, "Ci sono diciannove sedie.", ["19", "9", "90"],
   "Del 17 al 19 se arma al revés que el 11-16: primero *dici-* y después la unidad, *diciannove*, "
   "con doble n. Si solo oís *nove*, es 9.", answer="19")
li(2, "n", CUANTOS, "Ci sono otto penne.", ["8", "18", "80"],
   "*otto* (8), con doble t. *diciotto* (18) es *dici* + *otto*, sin la a: la o de *otto* se come la vocal.", answer="8")
li(2, "n", NUM, "undici", ["11", "1", "10"],
   "*undici* (11) empieza como *uno* y termina en *-dici*. *dieci* = 10.")

# --- 2: singular o plural, por la vocal final y por c'è / ci sono -------------
li(2, "p", UNO, "Ecco i libri.", ["Ecco il libro.", "Ecco i libri."],
   "*il libro* → *i libri*: cambian el artículo y la vocal final. Al oído, la *-i* final es la pista.")
li(2, "p", UNO, "Ci sono le sedie.", ["C'è la sedia.", "Ci sono le sedie."],
   "En plural cambian tres cosas: *c'è* → *ci sono*, *la* → *le* y *-a* → *-e*.")
li(2, "p", UNO, "Ecco le chiavi.", ["Ecco la chiave.", "Ecco le chiavi."],
   "*chiave* termina en *-e* y el plural va en *-i*: *le chiavi*. El artículo *le* ya dice que son varias.")
li(2, "p", UNO, "Il bar è qui.", ["Il bar è qui.", "I bar sono qui."],
   "*bar* no cambia en plural: el número lo dicen el artículo (*il / i*) y el verbo (*è / sono*).")
li(2, "p", UNO, "La città è bella.", ["La città è bella.", "Le città sono belle."],
   "*città* no cambia en plural (termina en vocal con tilde): escuchá *la / le*, *è / sono* y *bella / belle*.")

# --- 3: el artículo dice el número -------------------------------------------
li(3, "p", UNO, "Ecco gli studenti.", ["Ecco lo studente.", "Ecco gli studenti."],
   "*lo studente* → *gli studenti*: *lo* va delante de s + consonante, y su plural es *gli*.")
li(3, "p", UNO, "Ecco l'amica.", ["Ecco l'amica.", "Ecco le amiche."],
   "*l'* sirve para los dos géneros delante de vocal. El plural femenino es *le amiche*, con *h* para que suene «k».")
li(3, "p", UNO, "Ecco gli amici.", ["Ecco l'amico.", "Ecco gli amici."],
   "*l'amico* → *gli amici*: delante de vocal, el plural masculino es *gli*. *amici* suena «amichi».")
li(3, "p", UNO, "Ci sono le università.", ["C'è l'università.", "Ci sono le università."],
   "*università* no cambia: lo dicen *le* y *ci sono*. Por eso el artículo importa tanto en italiano.")
li(3, "p", UNO, "Ecco lo zaino.", ["Ecco lo zaino.", "Ecco gli zaini."],
   "*lo zaino* (con *lo* por la *z*) → *gli zaini*.")
li(3, "p", OIDO, "Lo zucchero è sul tavolo.",
   ["Lo zucchero è sul tavolo.", "Il zucchero è sul tavolo.", "Lo zucchero è su tavolo."],
   "*lo* delante de *z*: *lo zucchero*. Y *su* + *il* se pegan: *sul tavolo*.")
di(3, "d", "Un caffè e un cornetto, per favore.",
   "*un* sirve delante de consonante y de vocal en masculino (*un caffè*, *un amico*); *uno* solo delante de s + "
   "consonante, z, gn, ps (*uno zaino*).")

# --- 4: adjetivos, bel / bello y la vocal final ------------------------------
li(4, "a", OIDO, "Le ragazze sono simpatiche.", ["Le ragazze sono simpatiche.", "I ragazzi sono simpatici."],
   "*simpatiche* (fem. pl.) suena «simpatike»: la *h* mantiene la k. *simpatici* (masc. pl.), sin *h*, suena «simpatichi».")
li(4, "a", OIDO, "Che bel ragazzo!", ["Che bel ragazzo!", "Che bello ragazzo!", "Che bei ragazzi!"],
   "Delante del sustantivo, *bello* se corta como el artículo: *bel* (il ragazzo), *bello* (lo zaino), *bell'* (l'albero), "
   "*bei* (i ragazzi).")
li(4, "a", OIDO, "È un bell'albero.", ["È un bell'albero.", "È un bello albero.", "Sono begli alberi."],
   "Delante de vocal, *bell'* con apóstrofo, como *l'albero*: *un bell'albero*. En plural, como *gli alberi*: "
   "*begli alberi*.")
li(4, "a", OIDO, "Ho un'amica tedesca.", ["Ho un'amica tedesca.", "Ho un amico tedesco."],
   "Al oído, la diferencia es la vocal final: *amica tedesca*. Por escrito, además, el apóstrofo: *un'amica*.")
li(4, "a", OIDO, "Quel ragazzo è italiano.", ["Quel ragazzo è italiano.", "Quello ragazzo è italiano."],
   "*quello* se corta como *bello*: *quel ragazzo*, *quello studente*, *quell'amico*.")
di(4, "d", "La casa è grande e luminosa.",
   "*grande* (en -e) vale para los dos géneros; *luminosa* concuerda con *casa*.")
di(4, "d", "Mio fratello è alto e biondo.",
   "Con familiar en singular, posesivo sin artículo: *mio fratello*. Los adjetivos van después y concuerdan.")

# --- 5: la persona por la terminación ----------------------------------------
P3 = "lui / lei"
li(5, "p", QUIEN, "Parlate italiano?", ["voi", "noi", "loro"],
   "*-ate* es *voi*: *parlate*. *noi* sería *parliamo*; *loro*, *parlano*.", answer="voi")
li(5, "p", QUIEN, "Parliamo spesso.", ["noi", "voi", "loro"],
   "*-iamo* es siempre *noi*, en las tres conjugaciones: *parliamo, leggiamo, dormiamo*.", answer="noi")
li(5, "p", QUIEN, "Parlano troppo.", ["loro", P3, "voi"],
   "*PARlano*: el acento cae en la raíz, no en la terminación. Es *loro*.", answer="loro")
li(5, "p", QUIEN, "Scrive una lettera.", [P3, "tu", "io"],
   "*-e* es *lui / lei*: *scrive*. *tu* sería *scrivi*; *io*, *scrivo*.", answer=P3)
li(5, "p", QUIEN, "Scrivi a Marco?", ["tu", P3, "noi"],
   "*-i* es *tu*, en todos los verbos: *scrivi, parli, dormi*.", answer="tu")
li(5, "p", QUIEN, "Capisco tutto.", ["io", P3, "loro"],
   "*capisco* (io) suena «capisko»: *sc* + o es duro. *capisce* (lui) suena «capishe».", answer="io")
li(5, "p", QUIEN, "Capisce l'italiano?", [P3, "io", "tu"],
   "*sc* + e suena «sh»: *capisce* = lui / lei (o *Lei*, usted). *io capisco* suena con k.", answer=P3)
di(5, "d", "Mangiamo a casa stasera.",
   "*noi* en *-iamo*, y sin doble i: *mangiamo* (la i de *mangiare* ya está).")
di(5, "d", "Prendo un caffè, grazie.",
   "*prendo*, de *prendere*: en el bar se pide con *prendo* (o *vorrei*, más cortés).")

# --- 6: irregulares y essere / stare -----------------------------------------
li(6, "p", QUIEN, "Escono stasera.", ["loro", P3, "tu"],
   "*escono* = loro; *esce* = lui; *esci* = tu. *uscire* cambia la raíz: *esco, esci, esce, usciamo, uscite, escono*.",
   answer="loro")
li(6, "p", QUIEN, "Esci stasera?", ["tu", "loro", "io"],
   "*esci* (tu) suena «eshi»: *sc* + i suena «sh». *esco* (io) suena con k.", answer="tu")
li(6, "p", QUIEN, "Vanno al mare.", ["loro", "voi", P3],
   "*vanno* (loro), con doble n. *va* es lui / lei; *andate*, voi.", answer="loro")
li(6, "p", QUIEN, "Fanno colazione al bar.", ["loro", "noi", "voi"],
   "*fanno* (loro), con doble n como *vanno*, *danno*, *stanno*, *hanno*.", answer="loro")
li(6, "e", OIDO, "Oggi sono stanco.", ["Oggi sono stanco.", "Oggi sto stanco."],
   "Cansado va con *essere*: *sono stanco*. *stare* es para la salud y para quedarse: *sto bene*, *sto a casa*.")
li(6, "e", OIDO, "Sto bene, grazie.", ["Sto bene, grazie.", "Sono bene, grazie."],
   "La salud va con *stare*: *sto bene*, *sto male*. «Sono bene» es el calco de «soy bien»: en italiano, *sto bene*.")
di(6, "d", "Non posso venire, devo lavorare.",
   "*posso* y *devo*, sin diptongo; el infinitivo va directo, sin preposición: *devo lavorare*.")
di(6, "d", "Sai dov'è la fermata?",
   "*sai* es *sapere* para *tu*, irregular como *hai* y *fai*. Y *dove* + *è* se pegan con apóstrofo: *dov'è*.")

# --- 7: horas, precios y fechas ------------------------------------------------
li(7, "h", HORA, "Sono le sette e un quarto.", ["7:15", "6:45", "17:00"],
   "*e un quarto* = y cuarto: 7:15. *meno un quarto* sería 6:45.", answer="7:15")
li(7, "h", HORA, "Sono le sette meno un quarto.", ["6:45", "7:15", "7:45"],
   "*le sette meno un quarto* = las siete menos cuarto: 6:45, como en castellano.", answer="6:45")
li(7, "h", HORA, "Sono le diciassette.", ["17:00", "7:00", "7:17"],
   "En trenes, cines y oficinas se usa el reloj de 24 horas: *le diciassette* = las cinco de la tarde.",
   answer="17:00")
li(7, "h", HORA, "È l'una e mezza.", ["1:30", "12:30", "1:50"],
   "*l'una* va en singular (*è l'una*); *e mezza* = y media. 1:50 sería *l'una e cinquanta*.", answer="1:30")
li(7, "h", HORA, "Il treno parte alle diciotto e venti.", ["18:20", "8:20", "18:12"],
   "Escuchá el principio: *diciotto* empieza con *dici-*, así que es 18 y no 8. Después de *e* vienen los minutos: "
   "*venti*, no *dodici*.", answer="18:20")
li(7, "c", PRECIO, "Costa quattordici euro e cinquanta.", ["14,50 €", "40,50 €", "14,15 €"],
   "*quattordici* (14) contra *quaranta* (40); *cinquanta* (50) contra *quindici* (15). Los céntimos van después de *e*.",
   answer="14,50 €")
li(7, "c", PRECIO, "Sono sedici euro e settanta.", ["16,70 €", "60,70 €", "16,17 €"],
   "*sedici* (16) contra *sessanta* (60); *settanta* (70) contra *diciassette* (17).", answer="16,70 €")
li(7, "c", PRECIO, "Un caffè costa un euro e venti.", ["1,20 €", "1,12 €", "2,20 €"],
   "*un euro e venti* = 1,20 €. *euro* no cambia en plural: *due euro*.", answer="1,20 €")
li(7, "f", DIA, "Il mio compleanno è il tredici maggio.", ["13/5", "30/5", "3/5"],
   "*tredici* (13) contra *trenta* (30) y *tre* (3). La fecha va con *il* y sin «de»: *il tredici maggio*.",
   answer="13/5")
li(7, "f", DIA, "L'esame è lunedì trenta marzo.", ["lunedì 30/3", "martedì 30/3", "lunedì 13/3"],
   "*lunedì* (lunes) y *martedì* (martes) solo cambian al principio; *trenta* termina en *-enta*, *tredici* en *-dici*.",
   answer="lunedì 30/3")
li(7, "f", DIA, "Partiamo il primo agosto.", ["1/8", "1/6", "1/10"],
   "El día 1 es ordinal: *il primo agosto*. *agosto* = agosto; *giugno* = junio; *ottobre* = octubre.", answer="1/8")
di(7, "d", "Sono le otto e mezza.",
   "*le otto*, en plural y con doble t; *e mezza* (o *e mezzo*) = y media.",
   alt=["Sono le otto e mezzo.", "Sono le 8 e mezza.", "Sono le 8 e mezzo."])
di(7, "d", "Il mio compleanno è il ventuno aprile.",
   "*ventuno*: *venti* pierde la i delante de *uno*. La fecha, con *il* y sin «de».",
   alt=["Il mio compleanno è il 21 aprile."])

# --- 8: preguntas -----------------------------------------------------------------
li(8, "q", INTERR, "Quanto costa il biglietto?", ["quanto", "quando", "quale"],
   "*quanto* (cuánto) con n + t; *quando* (cuándo) con n + d. Al oído se parecen: escuchá la consonante después de la n.",
   answer="quanto")
li(8, "q", INTERR, "Quando parte il treno?", ["quando", "quanto", "come"],
   "*quando* = cuándo, con d. Para la hora exacta también: *a che ora parte?*", answer="quando")
li(8, "q", INTERR, "Chi viene stasera?", ["chi", "che", "ci"],
   "*chi* (quién) suena «ki»; *che* (qué) suena «ke»; *ci* suena «chi». La h mantiene la k.", answer="chi")
li(8, "q", INTERR, "Che cosa fai domani?", ["che cosa", "chi", "come"],
   "Para «qué» sirven *che cosa*, *cosa* o *che*, las tres. *che* suena «ke» porque la h mantiene la k; "
   "*chi* sería «quién».", answer="che cosa")
li(8, "q", OIDO, "Di dove sei?", ["Di dove sei?", "Dove sei?", "Da dove sei?"],
   "*Di dove sei?* pregunta el origen (¿de dónde sos?); *Dove sei?*, dónde estás ahora. La respuesta: *sono di Rosario*.")
li(8, "q", IGUAL, "Qual è il tuo numero?", ["Qual è il tuo numero?", "Qual'è il tuo numero?"],
   "*qual è* se oye como una sola palabra, pero se escribe sin apóstrofo: es un truncamiento (*qual* existe solo, "
   "como en *qual buon vento*), no una elisión.")
li(8, "q", "Escuchá: ¿pregunta o afirmación? Elegí la frase.", "Marco è a casa?",
   ["Marco è a casa?", "Marco è a casa."],
   "Sin inversión ni auxiliar: solo la entonación que sube al final (y el *?* escrito) dice que es una pregunta.")
di(8, "d", "Scusi, dov'è la stazione?",
   "*scusi* (usted) para hablarle a un desconocido; *dov'è* con apóstrofo.")
di(8, "d", "A che ora comincia il film?",
   "La preposición abre la pregunta: *a che ora…?* Y *comincia*: c + i suena «ch».")

# --- 9: preposiciones al oído ----------------------------------------------------
li(9, "r", OIDO, "Torno dall'ufficio alle sei.", ["dall'ufficio", "dell'ufficio", "nell'ufficio"],
   "*dall'* = *da* + *l'*: vengo de ahí. *dell'* sería «de la oficina» (pertenencia); *nell'*, «en la oficina».",
   answer="dall'ufficio")
li(9, "r", OIDO, "Vengo dal mercato.", ["dal mercato", "del mercato", "al mercato"],
   "*venire da* + lugar: *vengo dal mercato*. *del* es *di* + *il*; *al*, *a* + *il*.", answer="dal mercato")
li(9, "r", OIDO, "Le chiavi sono nella borsa.", ["nella borsa", "sulla borsa", "alla borsa"],
   "*nella* = *in* + *la*: adentro. *sulla* = arriba de.", answer="nella borsa")
li(9, "r", OIDO, "Vivo a Bologna, in Italia.", ["a Bologna, in Italia", "in Bologna, a Italia", "a Bologna, a Italia"],
   "Ciudad con *a*, país con *in*: *a Bologna, in Italia*. En castellano es «en» para los dos; por eso se confunden.",
   answer="a Bologna, in Italia")
li(9, "r", OIDO, "Domenica vado dai nonni.", ["dai nonni", "dei nonni", "ai nonni"],
   "*da* + persona = a lo de: *vado dai nonni* (a lo de mis abuelos). *ai nonni* sería «a los abuelos» (darles algo).",
   answer="dai nonni")
di(9, "d", "Vado a Roma in treno.",
   "Ciudad con *a*; medio de transporte con *in* y sin artículo: *in treno, in macchina*.")
di(9, "d", "Abito qui da tre anni.",
   "Presente + *da* para lo que sigue: «hace tres años que vivo acá».")

# --- 10: pronombres al oído -------------------------------------------------------
li(10, "o", PRON_OIDO, "Le scrivo domani.", ["Le", "Gli", "La"],
   "*scrivere a* alguien → indirecto: *le scrivo* (a ella). *gli scrivo* sería a él.", answer="Le")
li(10, "o", PRON_OIDO, "Gli telefono stasera.", ["Gli", "Lo", "Le"],
   "*telefonare a* → *gli telefono* (a él). En castellano decimos «lo llamo»; en italiano, *gli telefono* o *lo chiamo*.",
   answer="Gli")
li(10, "o", PRON_OIDO, "Li conosco bene.", ["Li", "Le", "Lo"],
   "*li* = los (masculino plural): *li conosco* = los conozco. *le* sería las.", answer="Li")
li(10, "o", PRON_OIDO, "Le conosco bene.", ["Le", "Li", "La"],
   "Con un verbo de directo, *le* = las: *le conosco* = las conozco. Con *scrivere a*, *le* sería «a ella».",
   answer="Le")
li(10, "o", OIDO, "Mi aiuti, per favore?", ["Mi aiuti, per favore?", "Ti aiuto, per favore?", "Mi aiuta, per favore?"],
   "La terminación dice la persona: *mi aiuti* (con *-i*) es *tu*, ¿me ayudás?; *mi aiuta* (con *-a*) sería usted o él. "
   "El pronombre va delante del verbo.")
di(10, "x", "Ti aspetto alla fermata.",
   "El pronombre va delante del verbo conjugado: *ti aspetto* (te espero). *aspettare* es directo, sin «a».")
di(10, "x", "Non lo so.",
   "*lo* retoma la idea entera: *non lo so* = no (lo) sé. Va entre *non* y el verbo.")

# --- 11: lo que suena igual y la concordancia ------------------------------------
li(11, "h", IGUAL, "Ho visto Marco ieri.", ["Ho visto Marco ieri.", "O visto Marco ieri."],
   "*ho* (de avere) lleva h; *o* (o) no. Suenan igual: decide la gramática. Si va un participio detrás, es *ho*.")
li(11, "h", IGUAL, "Luca ha un cane e un gatto.", ["Luca ha un cane e un gatto.", "Luca a un cane è un gatto."],
   "*ha* (tiene) con h; *a* es la preposición. *e* (y) sin tilde; *è* (es) con tilde.")
li(11, "h", IGUAL, "È andata a casa.", ["È andata a casa.", "E andata a casa.", "È andata ha casa."],
   "*è* (verbo) con tilde, también en mayúscula: *È*. *a casa*, preposición sin h.")
li(11, "h", IGUAL, "Anna è stanca e ha sonno.", ["Anna è stanca e ha sonno.", "Anna e stanca è a sonno."],
   "*è stanca* (está cansada) con tilde; *e* (y) sin tilde; *ha sonno* (tiene sueño) con h.")
li(11, "g", QUIEN_HABLA, "Sono arrivata ieri sera.", ["Sono arrivata ieri sera.", "Sono arrivato ieri sera."],
   "Con *essere* el participio concuerda con quien habla: *arrivata* = una mujer.")
li(11, "g", OIDO, "Siamo usciti presto.", ["Siamo usciti presto.", "Siamo uscite presto.", "Abbiamo uscito presto."],
   "*usciti*: varones o grupo mixto. *uscire* va con *essere* (*siamo usciti*), no con *avere*.")
di(11, "d", "Ieri ho mangiato una pizza.",
   "*ho* con h; *mangiato* con *avere*, sin concordar (objeto directo detrás).")
di(11, "d", "Non ho mai visto Roma.",
   "*mai* va entre el auxiliar y el participio: *non ho mai visto*.")

# --- 12: reflexivos y órdenes -----------------------------------------------------
li(12, "r", QUIEN, "Ci alziamo presto.", ["noi", "voi", "loro"],
   "*ci* + *-iamo* = noi: *ci alziamo* (nos levantamos).", answer="noi")
li(12, "r", QUIEN, "Vi svegliate tardi?", ["voi", "noi", "loro"],
   "*vi* + *-ate* = voi: *vi svegliate* (¿se despiertan tarde?).", answer="voi")
li(12, "r", QUIEN, "Si veste in fretta.", [P3, "loro", "io"],
   "*si* + *-e* = lui / lei: *si veste*. *loro* sería *si vestono*.", answer=P3)
li(12, "r", QUIEN, "Mi lavo le mani.", ["io", "tu", P3],
   "*mi* + *-o* = io. Con partes del cuerpo, artículo y no posesivo: *mi lavo le mani*.", answer="io")
li(12, "r", "Escuchá: ¿orden o pregunta? Elegí la frase.", "Ti alzi?", ["Alzati!", "Ti alzi?"],
   "En la orden el pronombre va pegado al final (*alzati!*); en la pregunta va delante (*ti alzi?*) y la voz sube.")
li(12, "r", "Escuchá: ¿orden o descripción? Elegí la frase.", "Non parlare!", ["Non parlare!", "Non parla."],
   "El imperativo negativo de *tu* es *non* + infinitivo: *non parlare!* *Non parla* describe: él no habla.")
di(12, "d", "Siediti, per favore.",
   "*siediti* = *siedi* + *ti*, pegado: sentate. Ojo: *sedersi* tiene diptongo en las formas fuertes.")
di(12, "d", "Non ti preoccupare.",
   "Con el imperativo negativo, el pronombre puede ir delante o pegado: *non ti preoccupare* = *non preoccuparti*.")

# --- 13: el jefe, mezclado ------------------------------------------------------
li(13, "l", HORA, "Sono le nove meno un quarto.", ["8:45", "9:15", "9:45"],
   "*le nove meno un quarto* = las nueve menos cuarto: 8:45.", answer="8:45")
li(13, "l", PRECIO, "Costa diciotto euro e quaranta.", ["18,40 €", "80,40 €", "18,14 €"],
   "*diciotto* (18) contra *ottanta* (80); *quaranta* (40) contra *quattordici* (14).", answer="18,40 €")
li(13, "l", IGUAL, "Gli ho scritto ieri.", ["Gli ho scritto ieri.", "Gli o scritto ieri."],
   "*ho* con h: es el auxiliar, y detrás viene el participio. Y *scrivere a* → *gli* (a él).")
li(13, "l", QUIEN_HABLA, "Sono andata al mare.", ["Sono andata al mare.", "Sono andato al mare.", "Ho andato al mare."],
   "*andare* va con *essere* y concuerda: *andata* = una mujer.")
di(13, "d", "Vado dal dentista alle tre.",
   "*da* + persona o profesional: *dal dentista*. La hora con *alle*.")
di(13, "d", "Studio italiano da sei mesi.",
   "Presente + *da* para lo que todavía sigue: «hace seis meses que estudio italiano».")


# ===========================================================================
# 2. Semana 10 en tramos
# ===========================================================================
T_PR = "pronomi"

# --- tramo 1: directos (vedere, conoscere, aspettare, chiamare, aiutare) -----
tr(10, "d", T_PR, "Conozco a Laura: la veo todos los días.",
   ["Conosco Laura: la vedo tutti i giorni.", "Conosco Laura, la vedo tutti i giorni.",
    "Conosco Laura: la vedo ogni giorno.", "Conosco Laura, la vedo ogni giorno.",
    "Conosco Laura e la vedo tutti i giorni.", "Conosco Laura e la vedo ogni giorno."],
   "Dos cosas que el castellano empuja: sin «a» delante de *Laura* (objeto directo de persona) y *la* como directo.")
tr(10, "d", T_PR, "¿Esperás a tus amigos? — Sí, los espero acá.",
   ["Aspetti i tuoi amici? — Sì, li aspetto qui.", "Aspetti i tuoi amici? Sì, li aspetto qui.",
    "Aspetti i tuoi amici? — Sì, li aspetto qua.", "Aspetti i tuoi amici? Sì, li aspetto qua."],
   "*aspettare* lleva directo, sin *a*: *aspetto i miei amici* → *li aspetto*. «Los» masculino plural es *li*.")
tr(10, "d", T_PR, "¿Ayudás a tu mamá? — Sí, la ayudo.",
   ["Aiuti tua madre? — Sì, la aiuto.", "Aiuti tua madre? Sì, la aiuto.", "Aiuti tua madre? — Sì, l'aiuto.",
    "Aiuti tua madre? Sì, l'aiuto.", "Aiuti la tua mamma? — Sì, la aiuto.", "Aiuti la tua mamma? Sì, la aiuto.",
    "Aiuti la tua mamma? Sì, l'aiuto.", "Aiuti tua mamma? Sì, la aiuto.", "Aiuti tua mamma? Sì, l'aiuto."],
   "*aiutare* es directo, como en castellano: *la aiuto* (o *l'aiuto*). Sin «a»: *aiuti tua madre*.")
ty(10, "d", T_PR, "Vedi Marco stasera? (sì)",
   ["Sì, lo vedo stasera.", "Sì, lo vedo.", "Lo vedo stasera.", "Sì, stasera lo vedo.", "Lo vedo."],
   "*vedere* es directo: *Marco* → *lo*. ✗ *le vedo* sería «las veo» y ✗ *gli vedo* no existe.")
ty(10, "d", T_PR, "Conosci le mie cugine? (no)",
   ["No, non le conosco.", "Non le conosco."],
   "Femenino plural directo: *le*. El *non* va delante del pronombre: *non le conosco*.")
ty(10, "d", T_PR, "Chiami tu i bambini? (sì, adesso)",
   ["Sì, li chiamo adesso.", "Sì, li chiamo io adesso.", "Li chiamo adesso.", "Sì, adesso li chiamo.",
    "Sì, adesso li chiamo io.", "Adesso li chiamo."],
   "*chiamare* = llamar (a alguien, por su nombre o por teléfono): directo. *i bambini* → *li*.")
cz(10, "d", T_PR, "Completá con el pronombre directo.", "Dove sono le chiavi? Non ___ trovo.", "le",
   "*le chiavi* (femenino plural) → *le*: *non le trovo*. Mirá el sustantivo, no el castellano («no las encuentro»).")
cz(10, "d", T_PR, "Completá con el pronombre directo.", "Il caffè? ___ prendo senza zucchero.", "Lo",
   "*il caffè* → *lo*: *lo prendo senza zucchero*. Va delante del verbo conjugado.")
fx(10, "d", T_PR, "pronome", "Marco? Le vedo domani.", "Le", "Lo",
   "Leísmo: en castellano «le veo» se oye, pero en italiano *le* directo es «las». A Marco: *lo vedo*.")
fx(10, "d", T_PR, "a_personale", "Vedo a Marco tutti i giorni.", "a", "",
   "Sin «a» delante del objeto directo de persona: *vedo Marco*. *a* + persona es solo para el indirecto (*scrivo a Marco*).")
fx(10, "d", T_PR, "a_personale", "Chiamo a mia madre ogni sera.", "a", "",
   "*chiamare* es directo: *chiamo mia madre*. La «a» personal del castellano no pasa al italiano.")
fx(10, "d", T_PR, "pronome", "I biglietti? Lo compro domani.", "Lo", "Li",
   "*i biglietti* es masculino plural: *li compro*. El pronombre concuerda con lo que reemplaza.")

# --- tramo 2: indirectos (telefonare, scrivere, dire, dare, rispondere) -----
tr(10, "i", T_PR, "Le escribo esta noche (a Anna).",
   ["Le scrivo stasera.", "Stasera le scrivo.", "Le scrivo questa sera.", "Questa sera le scrivo."],
   "*scrivere a* alguien → indirecto. A ella: *le*. Igual que en castellano, pero solo para el indirecto.")
tr(10, "i", T_PR, "Mañana lo llamo por teléfono (a Marco).",
   ["Domani gli telefono.", "Gli telefono domani.", "Domani lo chiamo.", "Lo chiamo domani."],
   "*telefonare a* → indirecto: *gli telefono*. Con *chiamare* (directo), *lo chiamo*. El castellano dice «lo» en los dos.")
tr(10, "i", T_PR, "Le digo la verdad (a ella).",
   ["Le dico la verità.", "Le dico la verità a lei."],
   "*dire a* alguien → *le dico*. La cosa que se dice (*la verità*) es el directo; la persona, el indirecto.")
ty(10, "i", T_PR, "Rispondi a Giulia? (sì, subito)",
   ["Sì, le rispondo subito.", "Le rispondo subito.", "Sì, subito le rispondo."],
   "*rispondere a* → indirecto: *le rispondo* (a ella). ✗ *la rispondo* es el calco del directo.")
ty(10, "i", T_PR, "Dai il libro a Marco? (sì)",
   ["Sì, gli do il libro.", "Gli do il libro.", "Sì, gli do il libro adesso.", "Sì, glielo do.", "Glielo do."],
   "*dare qualcosa a qualcuno*: la persona es indirecto → *gli*. *do* sin tilde (solo *dà* la lleva).")
fx(10, "i", T_PR, "pronome", "Anna? Gli scrivo domani.", "Gli", "Le",
   "A ella, el indirecto es *le*: *le scrivo*. *gli* es a él (o a ellos).")
fx(10, "i", T_PR, "pronome", "Marco? Lo telefono stasera.", "Lo", "Gli",
   "*telefonare a* pide indirecto: *gli telefono*. En castellano «lo llamo», por eso se cuela el *lo*.")
fx(10, "i", T_PR, "pronome", "Mia madre? La dico sempre la verità.", "La", "Le",
   "*dire a* alguien → *le dico*. *la* sería directo («la digo»), y lo que se dice ya es *la verità*.")
fx(10, "i", T_PR, "pronome", "Paolo mi scrive e io lo rispondo subito.", "lo", "gli",
   "*rispondere a* → *gli rispondo*. Directo o indirecto lo decide el verbo italiano, no el castellano.")
# el contraste, al final del tramo
cz(10, "i", T_PR, "Completá con los pronombres: directo o indirecto.",
   "Marco? ___ telefono e poi ___ vedo al bar.", "Gli | lo",
   "*telefonare a* → *gli*; *vedere* (directo) → *lo*. La misma persona, dos pronombres: los decide el verbo.")
cz(10, "i", T_PR, "Completá con los pronombres: directo o indirecto.",
   "Anna? ___ chiamo e ___ dico tutto.", "La | le",
   "*chiamare* (directo) → *la*; *dire a* (indirecto) → *le*. En castellano, «la llamo y le digo todo»: acá coincide.")
tr(10, "i", T_PR, "Los veo mañana y les cuento todo (a mis amigos).",
   ["Li vedo domani e gli racconto tutto.", "Domani li vedo e gli racconto tutto.",
    "Li vedo domani e racconto loro tutto.", "Domani li vedo e racconto loro tutto."],
   "*vedere* → *li* (directo); *raccontare a* → *gli* (indirecto plural, en el habla) o *loro* detrás del verbo (formal).")


# ===========================================================================
# 3. El jefe de la 13: «Las trampas», mezcladas y por categoría
# ===========================================================================
T_TR = "trappole"

fx(13, "t", T_TR, "articolo", "Il zaino di Marco è nuovo.", "Il", "Lo",
   "Delante de *z* (y de s + consonante), *lo*: *lo zaino*, *lo studente*. *il* va delante de consonante simple.")
fx(13, "t", T_TR, "articolo_possessivo", "Mio libro è sul tavolo.", "Mio", "Il mio",
   "El posesivo lleva artículo: *il mio libro*. Solo los familiares en singular van sin él (*mio padre*).")
fx(13, "t", T_TR, "articolo_possessivo", "Miei genitori sono in Argentina.", "Miei", "I miei",
   "Familiares en plural, con artículo: *i miei genitori*. Sin artículo solo en singular: *mio padre*, *mia madre*.")
fx(13, "t", T_TR, "articolo", "Amo Italia e la sua cucina.", "Italia", "l'Italia",
   "Los países llevan artículo: *amo l'Italia*. Con *in* no: *vivo in Italia*.")
fx(13, "t", T_TR, "genere", "La problema è difficile.", "La", "Il",
   "*problema* es masculino, como en castellano: *il problema*, *i problemi*.")
fx(13, "t", T_TR, "plurale", "Ho comprato due chiave.", "chiave", "chiavi",
   "Los sustantivos en *-e* hacen el plural en *-i*: *una chiave*, *due chiavi*. El plural italiano no se arma con *-s*.")
fx(13, "t", T_TR, "accordo", "C'è molti turisti in centro.", "C'è", "Ci sono",
   "«Hay» concuerda en italiano: plural → *ci sono molti turisti*.")
fx(13, "t", T_TR, "ausiliare", "Ieri ho andato al cinema.", "ho", "sono",
   "*andare* (movimiento) va con *essere*: *sono andato / andata*.")
fx(13, "t", T_TR, "ausiliare", "Maria è mangiato una pizza.", "è", "ha",
   "*mangiare* con objeto directo va con *avere*: *ha mangiato*.")
fx(13, "t", T_TR, "participio_accordo", "Anna è arrivato tardi.", "arrivato", "arrivata",
   "Con *essere* el participio concuerda con el sujeto: *Anna è arrivata*.")
fx(13, "t", T_TR, "irregolare", "Ho prenduto il treno delle otto.", "prenduto", "preso",
   "Participio irregular: *prendere → preso*. Como *mettere → messo*, *chiudere → chiuso*.")
fx(13, "t", T_TR, "essere_stare", "Oggi sto molto stanco.", "sto", "sono",
   "Cansado va con *essere*: *sono stanco*. *stare* es la salud (*sto bene*) y quedarse (*sto a casa*).")
fx(13, "t", T_TR, "irregolare", "Io vuolo un caffè, per favore.", "vuolo", "voglio",
   "*volere* es irregular: *voglio, vuoi, vuole*. La forma de *io* no tiene diptongo. Más cortés: *vorrei*.")
fx(13, "t", T_TR, "persona_verbale", "Signora, Lei sei molto gentile.", "sei", "è",
   "Con *Lei* (usted), tercera persona: *Lei è*. *sei* es de *tu*.")
fx(13, "t", T_TR, "a_personale", "Aspetto a Giulia alla fermata.", "a", "",
   "Sin «a» delante del objeto directo de persona: *aspetto Giulia*.")
fx(13, "t", T_TR, "pronome", "Paolo? Le aspetto alla stazione.", "Le", "Lo",
   "A él, directo: *lo aspetto* (o *l'aspetto*). *le aspetto* es «las espero»: el leísmo no pasa al italiano.")
fx(13, "t", T_TR, "pronome", "Anna? Gli telefono stasera.", "Gli", "Le",
   "*telefonare a* lleva indirecto, y a ella es *le*: *le telefono*.")
fx(13, "t", T_TR, "pronome", "Luca? Lo rispondo subito.", "Lo", "Gli",
   "*rispondere a* lleva indirecto: *gli rispondo*.")
fx(13, "t", T_TR, "preposizione", "Vivo in Bologna con mia sorella.", "in", "a",
   "Ciudad con *a*: *vivo a Bologna*. *in* es para países y regiones: *in Italia*, *in Toscana*.")
fx(13, "t", T_TR, "preposizione", "Dopo il lavoro vado a Giulia.", "a", "da",
   "A lo de alguien se va con *da*: *vado da Giulia*, *dal medico*, *dai nonni*.")
fx(13, "t", T_TR, "preposizione", "Abito a Roma fa tre anni.", "fa", "da",
   "Si todavía vivís ahí: presente + *da*: *abito a Roma da tre anni*. *fa* es para lo que ya pasó: *sono arrivato tre anni fa*.")
fx(13, "t", T_TR, "imperativo_pronome", "Luca, non parla così!", "parla", "parlare",
   "El imperativo negativo de *tu* es *non* + infinitivo: *non parlare!*. *non parla* describe (él no habla).")
fx(13, "t", T_TR, "pronome", "Mi chiamo Luca e alzo alle sette.", "alzo", "mi alzo",
   "*alzarsi* es reflexivo: *mi alzo* (me levanto). Sin *mi*, *alzo* es «levanto (algo)».")
fx(13, "t", T_TR, "doppie", "Abiamo due gatti e un cane.", "Abiamo", "Abbiamo",
   "*abbiamo* (de *avere*) con doble b, como *abbiamo mangiato*. Al hablar, la b se sostiene: *ab-biamo*.")
fx(13, "t", T_TR, "accento", "Marco da il libro a Giulia.", "da", "dà",
   "*dà* (da, del verbo *dare*) lleva tilde; *da* sin tilde es la preposición.")
