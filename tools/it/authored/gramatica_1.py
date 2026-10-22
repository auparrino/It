# -*- coding: utf-8 -*-
"""Auditoría de gramática 2026-10, área 1 (condizionale, congiuntivo, periodo
ipotetico, pasiva, si, formas no personales): producción y vuelta espaciada.

Lo que la auditoría marcó como «mejorable» o «flojo»:

1. Condizionale de la noticia no confirmada (20, 31): comprensión y
   titulares en la 35, 38 y 47.
2. Superlativo / l'unico + congiuntivo (25, 29): 29, 33, 37 y 42 (además de
   los cx-a de la 30, 40 y 48).
3. Congiuntivo sin verbo principal (bloque nuevo en la 48): 48, 50 y 51.
4. Subordinada con *che* adelantada (che sia bravo, lo sanno tutti; 48):
   48, 49 y 50.
5. Periodo ipotetico della realtà con futuro (33): 33, 36 y 39.
6. Doble imperfetto coloquial (33): escucha y elección en 33, 39, 48 y 51.
7. come se + congiuntivo (30): 30, 31, 32, 33, 39 y 51.
8. Pasiva con essere: agente con *da* y doble participio (35): 35 y 39.
9. andare + participio de pérdida (bloque nuevo en la 35): 35, 36, 39 y 51.
10. si impersonale / passivante (adelanto en la 16): 16, 17, 18 y, para que
    no desaparezca entre la 36 y la 51, 41, 43, 45 y 47.
11. Gerundio de posterioridad (44): 44 y 47.
12. Infinitivo sustantivado (43): 43, 45 y 47.

Prefijo de los ids: gr1-<semana>-<n>.
"""
from itertools import product

TR = "Traducí al italiano."
FX = "Trova l'errore: tocá la palabra que está mal y corregila."
CH = "¿Cuál está bien?"
QQ = "¿Qué quiere decir?"
ORALE = ("Escuchá: así se dice charlando. ¿Cuál es la versión para escribir?")

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
    d = dict(id="gr1-%d-%02d" % (w, _N[w]), w=w, level=LEVEL[w], type=typ, topic=topic,
             prompt=prompt, stem=stem, answer=answer, note=note)
    if clean:
        d["alt"] = clean
    d.update(extra)
    ITEMS.append(d)
    return d


def tr(w, topic, stem, variants, note, prompt=TR):
    """translate: la primera variante es la respuesta; el resto, alt (y, si
    hay dos puntos, la misma con coma)."""
    more = [v.replace(": ", ", ") for v in variants if ": " in v]
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


def ls(w, topic, stem, options, answer, note, prompt=ORALE):
    assert answer in options and len(set(options)) == len(options), stem
    return _add(w, "listen", topic, prompt, stem, answer, note, options=options)


CZ = "Completá con el verbo entre paréntesis."

# ===========================================================================
# 1. Condizionale de la noticia no confirmada (lección 20 y 31)
# ===========================================================================
T_NOT = "condizionale di cronaca"
NOT = ("En la prensa, el condizionale presenta un dato **no confirmado**: el periodista lo cuenta "
       "sin garantizarlo. Leelo como «parece que», «habría». *Secondo* y *stando a* lo anuncian.")

ch(35, T_NOT, "«Secondo l'ANSA, il sindaco si sarebbe dimesso.» ¿Qué dice el periodista?",
   ["Parece que el intendente renunció, pero no está confirmado.",
    "El intendente renunció: es seguro.",
    "El intendente va a renunciar."],
   "Parece que el intendente renunció, pero no está confirmado.",
   NOT + " *Si sarebbe dimesso* es condizionale passato: un hecho pasado sin confirmar.",
   prompt="Leé el titular.")
tr(35, T_NOT, "Según fuentes oficiales, habría dos detenidos.",
   _combo(["Secondo fonti ufficiali", "Stando a fonti ufficiali"], [", ", " "], "ci sarebbero due ",
          ["arrestati", "arresti", "fermati"], ["", "."]),
   NOT + " «Habría» = *ci sarebbero*: el *ci* de *c'è / ci sono* no se pierde en condizionale.")
ch(38, T_NOT, "¿Cuál de estos titulares da la noticia como no confirmada?",
   ["I ladri sarebbero entrati dalla finestra.",
    "I ladri sono entrati dalla finestra.",
    "I ladri entrarono dalla finestra."],
   "I ladri sarebbero entrati dalla finestra.",
   NOT + " *Sono entrati* y *entrarono* dan el hecho como cierto; *sarebbero entrati*, no.",
   prompt="Leé los titulares.")
cz(38, T_NOT, "Completá como en un diario: el dato no está confirmado.",
   "Secondo la polizia, l'uomo ___ (fuggire) in moto ieri sera.", "sarebbe fuggito",
   NOT + " Hecho pasado sin confirmar: condizionale passato, con *essere* porque *fuggire* es de "
   "movimiento: *sarebbe fuggito*.")
ch(47, T_NOT, "«Secondo le prime stime, il PIL crescerebbe dell'1%.» ¿Qué quiere decir?",
   ["Según las primeras estimaciones, el PBI crecería un 1% (no es seguro).",
    "Según las primeras estimaciones, el PBI creció un 1%.",
    "Si el PBI creciera un 1%, sería una buena estimación."],
   "Según las primeras estimaciones, el PBI crecería un 1% (no es seguro).",
   NOT + " En la prensa económica es constante: *crescerebbe*, *ammonterebbe*, *sarebbe pari a*.",
   prompt="Leé la noticia.")
tr(47, T_NOT, "Según la prensa, la empresa habría cerrado dos fábricas.",
   _combo(["Secondo la stampa", "Stando alla stampa", "Secondo i giornali", "Stando ai giornali"],
          [", ", " "], ["l'azienda", "la ditta", "la società"], " avrebbe chiuso due ",
          ["fabbriche", "stabilimenti"], ["", "."]),
   NOT + " «Habría cerrado» = *avrebbe chiuso*: el mismo «habría» periodístico del castellano.")

# ===========================================================================
# 2. Superlativo / l'unico + congiuntivo (lección 25 y 29)
# ===========================================================================
T_SUP = "congiuntivo nelle relative"
SUP = ("Después de un superlativo, *l'unico*, *il primo* o *l'ultimo* + *che*, el italiano cuidado "
       "pone congiuntivo; el castellano, indicativo («el único que me ayudó»). Hablando se oye el "
       "indicativo; escrito, congiuntivo.")

fx(29, T_SUP, "congiuntivo", "È l'unico amico che mi ha aiutato davvero.", "ha", "abbia",
   SUP + " Hecho pasado: congiuntivo passato, *che mi abbia aiutato*.")
cz(33, T_SUP, CZ, "È il ristorante più caro che io ___ (provare) in vita mia.", "abbia provato",
   SUP + " Algo pasado visto desde hoy: congiuntivo passato, *che io abbia provato*.",
   alt=["abbia mai provato"])
ch(37, T_SUP, "Sei l'unica persona che mi ___ davvero.",
   ["capisca", "capisci", "capiresti"], "capisca",
   "Después de *l'unico/l'unica* + *che*, el italiano cuidado pone congiuntivo, y el verbo concuerda "
   "con *l'unica persona* (ella), no con *tu*: *che mi capisca*. «Capisci» calca «sos la única que me entendés».",
   prompt="Elegí la del registro cuidado.")
fx(42, T_SUP, "congiuntivo", "Era il viaggio più lungo che avevamo mai fatto.", "avevamo", "avessimo",
   SUP + " En pasado, la concordancia lleva al congiuntivo trapassato: *che avessimo mai fatto*.")

# ===========================================================================
# 3. Congiuntivo sin verbo principal (bloque nuevo en la 48)
# ===========================================================================
T_IND = "congiuntivo indipendente"
IND = ("Sin verbo principal, *che* + congiuntivo da una orden a un tercero (*che entri*), una duda "
       "(*che sia partito?*) o una fórmula fija (*sia chiaro*).")

ch(48, T_IND, "«Che sia già partito?»",
   ["¿Se habrá ido ya?", "¡Que se vaya ya!", "Ya se fue."], "¿Se habrá ido ya?",
   IND + " La pregunta con *che* + congiuntivo es una suposición: el castellano la hace con "
   "futuro («¿se habrá ido?»).", prompt=QQ)
ch(48, T_IND, "Dice la secretaria: «C'è il signor Rossi.» Contesta il direttore: «Che aspetti!»",
   ["Que espere.", "¿Estará esperando?", "Ojalá espere."], "Que espere.",
   IND + " Es una orden para alguien que no está en la charla: «que espere».", prompt=QQ)
tr(48, T_IND, "¿Se habrá olvidado?",
   ["Che se ne sia dimenticato?", "Che se ne sia dimenticata?", "Che si sia dimenticato?",
    "Che si sia dimenticata?", "Se ne sarà dimenticato?", "Se ne sarà dimenticata?",
    "Si sarà dimenticato?", "Si sarà dimenticata?"],
   IND + " La duda va con *che* + congiuntivo passato (*che se ne sia dimenticato?*) o, como en "
   "castellano, con futuro anteriore (*se ne sarà dimenticato?*). Las dos valen.")
tr(48, T_IND, "Que espere (él): estoy ocupado.",
   _combo("Che aspetti", [": ", ", "], ["sono occupato", "sono occupata"], ["", "."]),
   IND + " «Que espere» = *che aspetti*: congiuntivo, igual que en castellano, pero sin principal.")
cz(50, T_IND, CZ, "Che ___ (essere) già arrivati? Non vedo la macchina.", "siano",
   IND + " Duda: «¿habrán llegado ya?». *Che siano già arrivati?* (o *saranno già arrivati?*).")
ch(50, T_IND, "«Sia chiaro: domani non si lavora.»",
   ["Que quede claro: mañana no se trabaja.", "Está claro que mañana no se trabaja.",
    "Si está claro, mañana no se trabaja."],
   "Que quede claro: mañana no se trabaja.",
   IND + " *Sia chiaro* es una fórmula fija: «que quede claro», no una constatación.", prompt=QQ)
tr(51, T_IND, "¿Será verdad?",
   ["Che sia vero?", "Sarà vero?"],
   IND + " Dos maneras de dudar: *che sia vero?* (congiuntivo, muy italiano) o *sarà vero?* (futuro, "
   "como el castellano).")

# ===========================================================================
# 4. Subordinada con che adelantada: congiuntivo (lección 48)
# ===========================================================================
T_DIS = "congiuntivo nella soggettiva anticipata"
DIS = ("Una frase con *che* puesta al principio, como tema, lleva congiuntivo (en registro "
       "cuidado) aunque cuente un hecho: *che sia bravo, lo sanno tutti*. El castellano pone indicativo («que es bueno…»).")

cz(48, T_DIS, CZ, "Che Marco ___ (avere) ragione, lo sanno tutti.", "abbia", DIS)
tr(49, T_DIS, "Que estaba cansado, se notaba.",
   _combo("Che fosse stanco", [", ", " "], ["si vedeva", "si notava", "era evidente"], ["", "."])
   + _combo("Che fosse stanca", [", ", " "], ["si vedeva", "si notava", "era evidente"], ["", "."]),
   DIS + " En pasado, congiuntivo imperfetto: *che fosse stanco*.")
fx(50, T_DIS, "congiuntivo", "Che è partito senza salutare mi ha fatto male.", "è", "sia",
   DIS + " Es un hecho, pero va adelante como tema: *che sia partito senza salutare*.")

# ===========================================================================
# 5. Periodo ipotetico della realtà con futuro (lección 33)
# ===========================================================================
T_REA = "periodo ipotetico della realtà"
REA = ("Con *se*, el castellano nunca pone futuro («si venís»). El italiano sí, cuando la "
       "consecuencia es futura: *se verrai, ti porterò*. El presente en las dos partes también vale.")

tr(33, T_REA, "Si venís mañana, te muestro la casa.",
   _combo("Se vieni domani", [", ", " "], ["ti mostro", "ti faccio vedere", "ti mostrerò", "ti farò vedere"],
          " la casa", ["", "."])
   + _combo("Se verrai domani", [", ", " "], ["ti mostrerò", "ti farò vedere"], " la casa", ["", "."]),
   REA + " Lo que no va es mezclar futuro con *se* y presente afuera.")
cz(33, T_REA, "Completá con el futuro, como en la consecuencia.",
   "Se ___ (finire) presto, verremo a trovarvi.", "finiremo",
   REA + " Si la consecuencia está en futuro (*verremo*), el *se* también lo lleva: *se finiremo*.",
   alt=["finiamo"])
ch(33, T_REA, "Se ___ a Roma, ti porterò al Colosseo.",
   ["verrai", "verresti", "venissi"], "verrai",
   REA + " *Verresti* es el «si vendrías» que no existe; *venissi* sería el tipo II, con "
   "*ti porterei*.")
cz(36, T_REA, CZ, "Se domani ___ (fare) bel tempo, andremo al mare.", "farà",
   REA + " *Fa* también vale; con *andremo* afuera, lo más prolijo es *farà*.", alt=["fa"])
tr(39, T_REA, "Si me escribís, te contesto enseguida.",
   _combo("Se mi scrivi", [", ", " "], ["ti rispondo", "ti risponderò"], [" subito", " immediatamente"],
          ["", "."])
   + _combo("Se mi scriverai", [", ", " "], "ti risponderò", [" subito", " immediatamente"], ["", "."]),
   REA + " Lo que nunca va es condizionale: «se mi scriveresti».")

# ===========================================================================
# 6. Doble imperfetto coloquial (lección 33)
# ===========================================================================
T_IMP = "periodo ipotetico dell'irrealtà"
IMP = ("Charlando, el italiano dice el período irreal del pasado con dos imperfetti (*se lo sapevo, "
       "non venivo*), como el «si lo sabía, no venía» rioplatense. Por escrito: congiuntivo "
       "trapassato + condizionale passato.")

ls(33, T_IMP, "Se me lo dicevi, ti aiutavo.",
   ["Se me l'avessi detto, ti avrei aiutato.", "Se me lo dicessi, ti aiuterei.",
    "Se me l'avresti detto, ti avrei aiutato."],
   "Se me l'avessi detto, ti avrei aiutato.",
   IMP + " *Se me lo dicessi, ti aiuterei* es otra cosa: presente («si me lo dijeras»).")
ls(39, T_IMP, "Se partivamo prima, non perdevamo il treno.",
   ["Se fossimo partiti prima, non avremmo perso il treno.",
    "Se partissimo prima, non perderemmo il treno.",
    "Se saremmo partiti prima, non avremmo perso il treno."],
   "Se fossimo partiti prima, non avremmo perso il treno.",
   IMP + " *Partire* va con *essere*: *se fossimo partiti*.")
ch(48, T_IMP, "«Se lo sapevo, non venivo.» ¿Dónde queda bien?",
   ["En una charla con amigos.", "En un mail a la universidad.", "En el examen escrito."],
   "En una charla con amigos.",
   IMP + " En lo escrito: *se l'avessi saputo, non sarei venuto*.", prompt="Registro.")
ls(51, T_IMP, "Se studiavi di più, passavi l'esame.",
   ["Se avessi studiato di più, avresti passato l'esame.",
    "Se studiassi di più, passeresti l'esame.",
    "Se avresti studiato di più, avresti passato l'esame."],
   "Se avessi studiato di più, avresti passato l'esame.",
   IMP + " Ojo: *se studiassi di più, passeresti* habla de hoy (tipo II), no del examen que ya pasó.")

# ===========================================================================
# 7. come se + congiuntivo (lección 30)
# ===========================================================================
T_CS = "come se"
CS = ("*come se* va siempre con congiuntivo imperfetto (lo de ahora) o trapassato (lo anterior), "
      "como «como si fuera / hubiera». «Come se è» es el error típico del habla.")

cz(30, T_CS, CZ, "Mi guarda come se non mi ___ (conoscere).", "conoscesse",
   CS + " Lo de ahora: imperfetto, *conoscesse*.")
tr(30, T_CS, "Hace como si no hubiera pasado nada.",
   _combo("Fa come se non fosse ", ["successo", "accaduto"], " ", ["niente", "nulla"], ["", "."]),
   CS + " «Hubiera pasado» es anterior: trapassato, *non fosse successo*, con *essere* porque "
   "*succedere* lo pide.")
fx(31, T_CS, "congiuntivo", "Fai come se sei a casa tua!", "sei", "fossi",
   CS + " La fórmula de bienvenida es *fai come se fossi a casa tua*: «hacé como si estuvieras en "
   "tu casa».")
ch(32, T_CS, "Ha reagito come se non ___ niente.",
   ["avesse sentito", "ha sentito", "abbia sentito"], "avesse sentito",
   CS + " Lo anterior a la reacción: trapassato, *avesse sentito*. *Abbia sentito* no va nunca "
   "con *come se*.")
tr(33, T_CS, "Me habla como si fuera mi jefe.",
   _combo("Mi parla come se fosse il mio ", ["capo", "direttore"], ["", "."]),
   CS + " Lo de ahora: imperfetto, *fosse*.")
cz(39, T_CS, CZ, "Spende come se ___ (essere) milionario.", "fosse", CS)
fx(51, T_CS, "congiuntivo", "Si comportava come se sapeva tutto.", "sapeva", "sapesse",
   CS + " Aunque el principal esté en pasado, sigue siendo imperfetto de congiuntivo: *sapesse*.")

# ===========================================================================
# 8. Pasiva con essere: da y doble participio (lección 35)
# ===========================================================================
T_PAS = "forma passiva"
PAS = ("En la pasiva el agente va con *da*, nunca con *per*: *scritto da Calvino*. Y en los tiempos "
       "compuestos concuerdan los dos participios con el sujeto: *la casa è stata costruita*.")

fx(35, T_PAS, "preposizione", "Il romanzo è stato scritto per Calvino.", "per", "da",
   PAS + " «Por Calvino» no se calca: *da Calvino*.")
fx(35, T_PAS, "concordanza", "La casa è stato costruita nel Settecento.", "stato", "stata",
   PAS + " *La casa* es femenino: *è stata costruita*, los dos participios en femenino.")
tr(39, T_PAS, "La carta fue escrita por mi abuelo.",
   ["La lettera è stata scritta da mio nonno", "La lettera fu scritta da mio nonno",
    "La lettera venne scritta da mio nonno"],
   PAS + " *Venne scritta* (pasiva con *venire* en remoto) y *fu scritta* también valen.")

# ===========================================================================
# 9. andare + participio de pérdida (bloque nuevo en la 35)
# ===========================================================================
T_AND = "andare + participio"
AND = ("En pasado, *andare* + *perso*, *distrutto*, *smarrito* dice que algo se perdió o se "
       "destruyó: *è andata persa*. Con *essere*, como todo *andare*. Con otros participios, "
       "en presente (*va fatto*), es obligación.")

tr(35, T_AND, "Se perdió la valija.",
   _combo("La valigia ", ["è andata persa", "è andata perduta", "si è persa"], ["", "."])
   + ["Si è persa la valigia", "È andata persa la valigia"],
   AND + " «Se me perdió» también se dice *mi si è persa*, pero *è andata persa* es lo más común.")
ch(36, T_AND, "Con il terremoto molte case ___.",
   ["sono andate distrutte", "hanno andato distrutte", "sono venute distrutte"], "sono andate distrutte",
   "En pasado, *andare* + *distrutto*, *perso*, *smarrito* dice que algo se destruyó o se perdió: "
   "*sono andate distrutte*, con *essere*. *Venire* no va en tiempos compuestos. También vale *sono rimaste distrutte*.")
ch(39, T_AND, "«Il documento è andato perso.»",
   ["El documento se perdió.", "Hay que perder el documento.", "El documento se fue."],
   "El documento se perdió.",
   AND + " No confundir con *il documento va firmato* (hay que firmarlo).", prompt=QQ)
cz(51, T_AND, "Completá con el auxiliar de la pérdida.",
   "Il pacco non è mai arrivato: è ___ smarrito alle poste.", "andato",
   AND + " *È stato smarrito* también se entiende, pero *andato* es el que dice «se perdió».",
   alt=["stato"])

# ===========================================================================
# 10. si impersonale / passivante: adelanto en la 16 y vueltas
# ===========================================================================
T_SI = "si impersonale e passivante"
SI = ("*si* + tercera persona es el «se» impersonal. Con un sustantivo plural, el verbo va en "
      "plural, como en castellano: «se venden casas» = *si vendono case*.")

ch(16, T_SI, "In questo negozio si ___ biciclette usate.",
   ["vendono", "vende", "vendiamo"], "vendono",
   SI + " «Si vende biciclette» aparece en carteles, pero está mal.")
tr(16, T_SI, "En Italia se come bien.",
   ["In Italia si mangia bene", "In Italia si mangia bene.", "Si mangia bene in Italia"],
   SI + " Sin sustantivo detrás, singular: *si mangia*.")
tr(16, T_SI, "¿Cómo se dice esto en italiano?",
   _combo("Come si dice ", ["questo", "questa cosa"], " in italiano?")
   + ["Come si dice in italiano?", "Questo come si dice in italiano?"],
   SI + " *Come si dice?* es la pregunta más útil del curso.")
tr(17, T_SI, "Se venden bicicletas usadas.",
   ["Si vendono biciclette usate", "Vendesi biciclette usate"],
   SI + " Plural: *si vendono*. En los carteles también ves *vendesi*, *affittasi*.")
fx(18, T_SI, "concordanza", "Qui si vende biglietti per il concerto.", "vende", "vendono",
   SI + " *Biglietti* es plural: *si vendono biglietti*.")
cz(18, T_SI, CZ, "In estate si ___ (fare) il bagno nel lago.", "fa",
   SI + " *Il bagno* es singular: *si fa*.")
ch(18, T_SI, "Da qui si ___ le montagne.",
   ["vedono", "vede", "vediamo"], "vedono",
   SI + " *Le montagne* es plural: *si vedono*. Con *si* no va nunca *vediamo*.")
tr(41, T_SI, "Se buscan mozos con experiencia.",
   ["Si cercano camerieri con esperienza", "Cercasi camerieri con esperienza"],
   SI + " Avisos de trabajo: *si cercano* o, en el cartel, *cercasi*.")
fx(43, T_SI, "concordanza", "Quando si è stanco, si lavora male.", "stanco", "stanchi",
   "Con el *si* impersonale el adjetivo va en masculino plural, aunque el verbo esté en "
   "singular: *si è stanchi*. El castellano dice «uno está cansado», en singular.")
cz(45, T_SI, "Completá con el impersonal de un verbo reflexivo.",
   "A tutto ___ abitua.", "ci si",
   "*Abituarsi* ya tiene *si*: dos *si* no se juntan, así que el impersonal es *ci si abitua* "
   "(uno se acostumbra).")
tr(47, T_SI, "Se vendieron más de mil libros.",
   ["Si sono venduti più di mille libri", "Sono stati venduti più di mille libri",
    "Si vendettero più di mille libri", "Furono venduti più di mille libri",
    "Vennero venduti più di mille libri"],
   SI + " En compuesto, *essere* y participio concordado con *libri*: *si sono venduti*.")

# ===========================================================================
# 11. Gerundio de posterioridad (lección 44)
# ===========================================================================
T_GER = "gerundio"
GER = ("El gerundio italiano cuenta algo simultáneo, la causa o el modo; nunca algo posterior. "
       "«Se recibió en 2010, consiguiendo trabajo en 2012» va con *e* + verbo conjugado.")

fx(44, T_GER, "tempo_verbale", "Marco si è laureato nel 2010 trovando lavoro nel 2012.",
   "trovando", "e ha trovato", GER)
fx(44, T_GER, "tempo_verbale", "Il treno è partito alle otto arrivando a Milano alle undici.",
   "arrivando", "ed è arrivato", GER + " *Arrivare* va con *essere*: *ed è arrivato*.")
tr(47, T_GER, "Vivió diez años en París, volviendo a Italia en 2015.",
   _combo("Ha vissuto ", ["dieci anni a Parigi", "a Parigi per dieci anni", "a Parigi dieci anni"],
          " ", ["ed è", "e poi è"], " ", ["tornato", "tornata"], " in Italia nel 2015", ["", "."])
   + _combo("Visse ", ["dieci anni a Parigi", "a Parigi per dieci anni"], " ", ["e", "e poi"],
            " tornò in Italia nel 2015", ["", "."]),
   GER + " El castellano periodístico lo usa; el italiano, no.")

# ===========================================================================
# 12. Infinitivo sustantivado (lección 43)
# ===========================================================================
T_INF = "infinito sostantivato"
INF = ("Con artículo, el infinitivo es un sustantivo masculino y lleva complementos: *il continuo "
       "andare e venire*, *il suo lamentarsi*. Es más frecuente que en castellano.")

tr(43, T_INF, "El ir y venir de la gente me cansa.",
   _combo(["L'andare e venire", "Il continuo andare e venire", "Il via vai", "Il viavai"],
          [" della gente", " di gente"], " mi stanca", ["", "."]),
   INF + " *Il via vai* (o *viavai*) es el sustantivo de todos los días.")
tr(43, T_INF, "Con el paso del tiempo, todo se olvida.",
   _combo(["Con l'andare del tempo", "Col passare del tempo", "Con il passare del tempo",
           "Coll'andare del tempo", "Con l'andar del tempo", "Col passar del tempo"], [", ", " "], "tutto si dimentica", ["", "."]),
   INF + " «El paso del tiempo» = *il passare / l'andare del tempo*.")
ch(43, T_INF, "«Mi dà fastidio il suo continuo lamentarsi.»",
   ["Me molestan sus quejas constantes.", "Me molesta quejarme todo el tiempo.",
    "Le molesta que me queje todo el tiempo."],
   "Me molestan sus quejas constantes.",
   INF + " *Il suo lamentarsi* = sus quejas (de él o de ella).", prompt=QQ)
cz(45, T_INF, "Completá con el infinitivo sustantivado (con su artículo).",
   "___ (fumare) fa male alla salute, e anche il bere.", "Il fumare",
   INF + " *Fumare fa male*, sin artículo, también vale.", alt=["Fumare", "il fumare"])
cz(47, T_INF, "Completá con el infinitivo (forma corta).",
   "Siamo partiti sul ___ (fare) del giorno.", "far",
   INF + " *Sul far del giorno* (al amanecer) es una fórmula fija, con el infinitivo truncado.",
   alt=["fare"])
