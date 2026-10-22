# -*- coding: utf-8 -*-
"""Construcciones que el castellano empuja a calcar (propuestas 2026-10, Tanda 1).

Tres propuestas del plan auditorias/PLAN-2026-10-propuestas.md:

1. «Trampas del castellano»: traducciones cortas del rioplatense en las que
   el castellano empuja al error, y que vuelven espaciadas después de su
   lección: *lo so* (11, 18, 30), passato prossimo y no remoto para «ayer
   fui» (12, 16, 38), *ne* partitivo y *ci* locativo (22, 25, 33), el futuro
   en el pasado *sarebbe venuto* (32, 38, 44) y superlativo + congiuntivo
   (30, 40, 48).
2. *ci* pronominal con los verbos de «a» (*ci penso*, *ci riesco*, *ci
   conto*, *ci credo*): bloque en la 21, recuerdo en la 28 y vuelta en la 42
   (verbi e preposizioni), con un duelo lo/ci.
3. Sin «a» delante del objeto directo de persona (18, 27, 34, 42 y 48),
   mezclado con verbos que sí la llevan (*telefonare a*, *chiedere a*) para
   que no se resuelva con «nunca a».

Prefijo de los ids: cx-a-<semana>-<n>.
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


def _swap(stem, bad, good):
    pat = r"(?<!\w)" + re.escape(bad) + r"(?!\w)"
    if re.search(pat, stem):
        return re.sub(pat, lambda m: good, stem, count=1)
    return stem.replace(bad, good, 1)


def _add(w, typ, topic, prompt, stem, answer, note, alt=None, **extra):
    _N[w] = _N.get(w, 0) + 1
    seen, clean = set(), []
    for a in alt or []:
        k = a.rstrip(".?!")
        if a and k != answer.rstrip(".?!") and k not in seen:
            seen.add(k)
            clean.append(a)
    d = dict(id="cx-a-%d-%02d" % (w, _N[w]), w=w, level=LEVEL[w], type=typ, topic=topic,
             prompt=prompt, stem=stem, answer=answer, note=note)
    if clean:
        d["alt"] = clean
    d.update(extra)
    ITEMS.append(d)
    return d


def tr(w, topic, stem, variants, note, prompt=TR):
    """translate: la primera variante es la respuesta; el resto, alt."""
    return _add(w, "translate", topic, prompt, stem, variants[0], note, variants[1:])


def fx(w, topic, cat, stem, bad, good, note, goodAlt=None):
    extra = dict(cat=cat, bad=bad, good=good)
    if goodAlt:
        extra["goodAlt"] = goodAlt
    return _add(w, "fixerr", topic, FX, stem, _swap(stem, bad, good), note, **extra)


def cz(w, topic, prompt, stem, answer, note, alt=None):
    return _add(w, "cloze", topic, prompt, stem, answer, note, alt)


def ch(w, topic, stem, options, answer, note, prompt=CH):
    return _add(w, "choice", topic, prompt, stem, answer, note, options=options)


def ctx(frase, consigna="Contestá en italiano lo que está en castellano."):
    return "Te dicen: «%s». %s" % (frase, consigna)


T = "trappole"
CI = "ci pronominale"
ACC = "accusativo preposizionale"

# ===========================================================================
# 1. Trampas del castellano
# ===========================================================================

# --- lo so (lección: semana 10; vuelve en 11, 18, 30) ----------------------
LOSO = ("«Ya sé» se dice *lo so*: *sapere* pide su objeto, y cuando no hay otra cosa "
        "que saber, ese objeto es *lo* (lo que me dijiste). «Sì, so» suena cortado, como "
        "«sí, conozco» sin decir qué.")

tr(11, T, "Sí, ya sé.",
   ["Sì, lo so", "Lo so", "Sì, lo so già", "Lo so già", "Sì, già lo so", "Già lo so"],
   LOSO, prompt=ctx("Domani non c'è lezione"))
fx(11, T, "pronome", "Anna è in Italia? — Sì, so, ha telefonato ieri.", "so", "lo so",
   LOSO + " *Non so* sin *lo* sí se oye, pero en la respuesta afirmativa el *lo* no se cae.")

tr(18, T, "No, no sabía.",
   ["No, non lo sapevo", "No, non lo sapevo!", "Non lo sapevo"],
   "«No sabía» = *non lo sapevo*: el *lo* resume lo que te acaban de contar. "
   "Con otra palabra que hace de objeto, el *lo* sobra: *non sapevo niente* (no sabía nada).",
   prompt=ctx("Sai che Marta parte per Londra?"))
tr(18, T, "Ya sé, pero no puedo hacer nada.",
   _combo(["Lo so, ma ", "Sì, lo so, ma "], ["non posso fare niente", "non posso fare nulla"]),
   LOSO + " Y fijate la doble negación: *non posso fare niente*.",
   prompt=ctx("Il treno è in ritardo di due ore!"))

tr(30, T, "Sí, ya sé: te lo dije yo.",
   _combo(["Sì, lo so: ", "Sì, lo so, ", "Lo so: ", "Lo so, "], ["te l'ho detto io", "sono stato io a dirtelo",
                                                                 "sono stata io a dirtelo"]),
   "Dos «lo» que el castellano reparte distinto: *lo so* (ya sé) y *te l'ho detto* (te lo dije), "
   "donde *lo* se apostrofa delante de *ho*.",
   prompt=ctx("Lo sapevi che Paolo ha cambiato lavoro?"))

# --- passato prossimo, no remoto (lección 11; vuelve en 12, 16, 38) ------------
PROSS = ("Para «ayer fui», «esta mañana comí», el italiano hablado usa el *passato prossimo* "
         "(*sono andato*, *ho mangiato*), aunque el castellano rioplatense use el pretérito simple. "
         "El remoto (*andai*) queda para la narración y los hechos lejanos.")

tr(12, T, "Ayer fui al cine con Luca.",
   _combo("Ieri sono ", ["andato", "andata"], " al cinema con Luca") +
   _combo("Sono ", ["andato", "andata"], " al cinema con Luca ieri"),
   PROSS + " *Andare* va con *essere*: el participio concuerda (*andato*, *andata*).")
tr(12, T, "El sábado comí en lo de mi abuela.",
   _combo(["Sabato ", "Sabato scorso "], ["ho mangiato", "ho pranzato"], [" da mia nonna", " a casa di mia nonna"]),
   PROSS + " «En lo de» es *da*: *da mia nonna*, sin artículo delante de *nonna*.")
fx(12, T, "tempo_verbale", "Ieri andai al mercato con mia madre.", "andai", "sono andata",
   PROSS, goodAlt=["sono andato"])

tr(16, T, "Hoy me desperté tarde y perdí el tren.",
   _combo("Oggi mi sono ", ["svegliato", "svegliata"], " tardi e ho perso il treno"),
   PROSS + " Con el reflexivo, *essere* y concordancia: *mi sono svegliato/a*.")
tr(16, T, "¿Viste la película anoche?",
   ["Hai visto il film ieri sera?", "Ieri sera hai visto il film?", "L'hai visto il film ieri sera?"],
   PROSS + " Y en la pregunta no se invierte nada: *hai visto…?* con la entonación.")
fx(16, T, "tempo_verbale", "Stamattina mi alzai alle sei.", "alzai", "sono alzata",
   PROSS + " Con *stamattina* (hoy) el remoto no va nunca.", goodAlt=["sono alzato"])

tr(38, T, "Anoche hablé con mi hermana por teléfono.",
   ["Ieri sera ho parlato con mia sorella al telefono", "Ieri sera ho sentito mia sorella al telefono",
    "Ieri sera ho telefonato a mia sorella", "Ho parlato con mia sorella al telefono ieri sera",
    "Ieri sera ho parlato al telefono con mia sorella", "Ho sentito mia sorella al telefono ieri sera"],
   "Ya viste el remoto, pero para ayer o anoche el italiano estándar sigue con el *prossimo*: "
   "*ho parlato*. «Parlai» para ayer se oye en el sur y en Toscana, pero en el resto suena raro.")
tr(38, T, "¿Ya almorzaste?",
   ["Hai già pranzato?", "Hai pranzato?", "Hai già mangiato?"],
   "«¿Ya almorzaste?» mira a hoy: *hai già pranzato?* El remoto (*pranzasti*) sería de novela.")
tr(38, T, "Garibaldi nació en Niza en 1807.",
   ["Garibaldi nacque a Nizza nel 1807", "Garibaldi è nato a Nizza nel 1807"],
   "Este sí admite remoto: es un hecho histórico, cerrado y lejano (*nacque*). *È nato* también "
   "está bien. Lo que no va es al revés: remoto para lo de ayer. Y el año lleva artículo: *nel 1807*.")

# --- ne partitivo y ci locativo (lección 21; vuelve en 22, 25, 33) ---------------
NE = ("Cuando decís una cantidad sin repetir la cosa, el italiano pide *ne* (de eso): "
      "*ne ho due*. «Ho due» queda cojo.")
CILOC = "«Ir allá» sin repetir el lugar es *ci vado*: el *ci* reemplaza *a Roma*, *al mare*. «Sì, vado» suena incompleto."

tr(22, T, "Tengo dos.",
   ["Ne ho due", "Ne ho due.", "Ho due fratelli"],
   NE, prompt=ctx("Quanti fratelli hai?"))
tr(22, T, "Sí, voy mañana.",
   ["Sì, ci vado domani", "Sì, domani ci vado"],
   CILOC, prompt=ctx("Vai a Roma?"))
tr(22, T, "No, gracias, ya tomé tres.",
   _combo("No, grazie, ne ho ", ["già presi tre", "già bevuti tre", "presi già tre", "bevuti già tre"]),
   NE + " En tiempo compuesto, el participio concuerda con lo que *ne* reemplaza: *ne ho presi tre* (caffè).",
   prompt=ctx("Vuoi un caffè?"))

tr(25, T, "Sí, estuve el año pasado.",
   _combo("Sì, ci sono ", ["stato", "stata", "andato", "andata"], " l'anno scorso"),
   CILOC + " Con *essere stato* también: *ci sono stato*.",
   prompt=ctx("Sei mai stato a Napoli?"))
tr(25, T, "Sí, quedan algunos.",
   ["Sì, ce ne sono ancora alcuni", "Sì, ce ne sono alcuni", "Sì, ne sono rimasti alcuni",
    "Sì, ne restano alcuni", "Sì, ne rimangono alcuni", "Sì, ce ne sono ancora un po'",
    "Sì, ne sono rimasti un po'"],
   NE + " Con *ci sono*, el *ci* se vuelve *ce* delante de *ne*: *ce ne sono*.",
   prompt=ctx("Ci sono ancora biscotti?"))

tr(33, T, "Si hace lindo, voy.",
   ["Se fa bel tempo, ci vado", "Se c'è bel tempo, ci vado", "Ci vado se fa bel tempo",
    "Se fa bello, ci vado"],
   CILOC + " Hipótesis real: *se* + presente, presente.",
   prompt=ctx("Domani vai al mare?"))
tr(33, T, "Muchísimo: si tuviera plata, me compraría dos pares.",
   _combo(["Moltissimo", "Tantissimo"], ": se avessi ", ["i soldi", "soldi"], ", ", ["ne comprerei", "me ne comprerei"], " due paia"),
   NE + " Y en la hipótesis, nunca condicional tras *se*: *se avessi…, ne comprerei*. "
   "*Paio* tiene plural femenino: *due paia*.",
   prompt=ctx("Ti piacciono queste scarpe?"))

# --- futuro en el pasado (lección 31-32; vuelve en 32, 38, 44) --------------------
FUT = ("«Dijo que vendría» es futuro visto desde el pasado, y el italiano lo dice con el "
       "*condizionale passato*: *ha detto che sarebbe venuto*. El calco «verrebbe» se oye, pero "
       "la forma estándar es la compuesta.")

tr(32, T, "Dijo que vendría a las ocho.",
   _combo(["Ha detto", "Disse"], " che sarebbe ", ["venuto", "venuta", "arrivato", "arrivata"], " alle otto"),
   FUT)
tr(32, T, "Pensaba que llovería.",
   _combo(["Pensavo", "Credevo"], " che ", ["sarebbe piovuto", "avrebbe piovuto"]),
   FUT + " *Piovere* admite los dos auxiliares: *sarebbe piovuto* y *avrebbe piovuto*.")

tr(38, T, "Me prometió que me llamaría al día siguiente.",
   _combo("Mi ha promesso che mi ", ["avrebbe chiamato", "avrebbe chiamata", "avrebbe telefonato"],
          [" il giorno dopo", " il giorno seguente"]) +
   _combo("Mi promise che mi ", ["avrebbe chiamato", "avrebbe chiamata", "avrebbe telefonato"],
          [" il giorno dopo", " il giorno seguente"]) +
   ["Mi ha promesso di chiamarmi il giorno dopo", "Mi ha promesso di chiamarmi il giorno seguente"],
   FUT + " En el estilo indirecto, *domani* pasa a *il giorno dopo*.")
fx(38, T, "condizionale", "Mi ha detto che verrebbe alla festa, ma non è venuto.", "verrebbe", "sarebbe venuto",
   FUT)

tr(44, T, "Sabíamos que no iba a ser fácil.",
   ["Sapevamo che non sarebbe stato facile"],
   FUT + " También «iba a» mirando hacia adelante desde el pasado: *non sarebbe stato*.")
cz(44, T, "Completá con el verbo entre paréntesis (futuro visto desde el pasado).",
   "Era convinto che il treno ___ (arrivare) in orario.", "sarebbe arrivato",
   FUT + " *Arrivare* va con *essere*: *sarebbe arrivato*.")

# --- superlativo + congiuntivo (lección 25 y 29; vuelve en 30, 40, 48) ------------
SUP = ("Detrás de un superlativo (*il più…*, *il migliore*, *l'unico*) el italiano cuidado "
       "pone congiuntivo: *la pizza più buona che abbia mai mangiato*. Y el «en mi vida» "
       "suele ir como *mai*.")

tr(30, T, "Es la mejor pizza que comí en mi vida.",
   _combo("È la ", ["pizza più buona", "pizza migliore", "migliore pizza"], " che ", ["", "io "],
          "abbia ", ["mai mangiato", "mangiato in vita mia", "mai mangiato in vita mia"]),
   SUP)
fx(30, T, "congiuntivo", "È il film più bello che ho mai visto.", "ho", "abbia",
   SUP + " En la charla se oye *che ho visto*; en lo escrito y cuidado, *che abbia visto*.")

tr(40, T, "Es la persona más generosa que conozco.",
   ["È la persona più generosa che io conosca", "È la persona più generosa che conosca"],
   SUP + " En presente: *che io conosca*. El *io* ayuda porque *conosca* sirve para tres personas.")
cz(40, T, "Completá con el verbo entre paréntesis.",
   "È l'unico ristorante che ___ (essere) aperto la domenica.", "sia",
   "*L'unico che*, como el superlativo, pide congiuntivo en el registro cuidado: *che sia aperto*.")

tr(48, T, "Es el libro más difícil que leí.",
   _combo("È il libro più difficile che ", ["", "io "], "abbia ", ["letto", "mai letto"]),
   SUP + " *Abbia letto* es congiuntivo passato: algo pasado mirado desde hoy.")
cz(48, T, "Completá con el verbo entre paréntesis.",
   "Era la cosa più stupida che Marco ___ (potere) dire in quel momento.", "potesse",
   SUP + " En pasado, la concordancia lleva al congiuntivo imperfetto: *era… che potesse*.")

# ===========================================================================
# 2. Ci pronominal con los verbos de «a» (21, 28, 42)
# ===========================================================================
CIA = ("Con los verbos que llevan *a* (*pensare a*, *credere a*, *riuscire a*, *provare a*), "
       "«eso» se dice *ci*, no *lo*: el castellano dice «lo pienso», el italiano *ci penso*.")

tr(21, CI, "Dejá, yo me encargo.",
   ["Lascia, ci penso io", "Lascia stare, ci penso io", "Lascia perdere, ci penso io", "Ci penso io"],
   "«Yo me encargo» es *ci penso io* (pienso en eso yo). " + CIA)
tr(21, CI, "¡No lo puedo creer!",
   ["Non ci posso credere!", "Non posso crederci!"],
   "*Credere a qualcosa* → *ci credo*. Por eso «no lo puedo creer» es *non ci posso credere*: "
   "nunca «non lo posso credere».")
tr(21, CI, "Lo intenté, pero no pude.",
   _combo("Ci ho provato, ma non ci sono ", ["riuscito", "riuscita"]),
   CIA + " *Riuscire* va con *essere*: *ci sono riuscito/a*.")
tr(21, CI, "Sí, puedo.",
   ["Sì, ci riesco", "Sì, ci riesco!"],
   "Contestá con el mismo verbo: *riesci a venire?* → *sì, ci riesco*. El *ci* reemplaza *a venire*. " + CIA,
   prompt=ctx("Riesci a venire stasera?", "Contestá en italiano con el verbo de la pregunta."))
fx(21, CI, "ci_ne", "Lo penso io, non ti preoccupare.", "Lo", "Ci",
   "«Me encargo yo» es *ci penso io*: *pensare a* pide *ci*. " + CIA)
tr(21, CI, "Perfecto, cuento con eso.",
   ["Perfetto, ci conto", "Perfetto, ci conto!"],
   "*Contare su qualcosa* → *ci conto*: con una cosa, el *ci* reemplaza *su questo*. "
   "Con una persona es otra cosa: *conto su di te*.",
   prompt=ctx("Domani ti porto i libri"))
tr(21, CI, "Pensalo bien antes de decidir.",
   ["Pensaci bene prima di decidere"],
   "Imperativo + *ci* pegado: *pensaci*. El castellano dice «pensalo»; el italiano piensa *a* "
   "algo, así que va *ci*.")
tr(21, CI, "Todavía no, lo pienso esta noche.",
   ["Non ancora, ci penso stasera", "Ancora no, ci penso stasera", "Non ancora, ci penso questa sera"],
   CIA, prompt=ctx("Hai pensato al regalo per la mamma?"))
tr(21, CI, "Yo sí creo.",
   ["Io sì, ci credo", "Io ci credo", "Sì, io ci credo", "Io invece ci credo"],
   "*Credere ai fantasmi* → *ci credo*. " + CIA,
   prompt=ctx("Non credo ai fantasmi. E tu?"))
ch(21, CI, "Il tuo progetto? ___ penso spesso.", ["Ci", "Lo", "Ne"], "Ci",
   "*Pensare a qualcosa* → *ci penso*. *Lo* sería objeto directo, y *pensare* no lo lleva en este sentido.",
   prompt="Elegí el pronombre.")
ch(21, CI, "Il tuo progetto? ___ trovo molto interessante.", ["Lo", "Ci", "Ne"], "Lo",
   "*Trovare qualcosa interessante*: objeto directo, sin preposición, así que *lo*. "
   "Compará con *ci penso* (pensare *a*).",
   prompt="Elegí el pronombre.")

tr(28, CI, "Lo intenté varias veces, pero al final no pude.",
   _combo("Ci ho provato ", ["più volte", "diverse volte", "varie volte", "molte volte"],
          ", ma alla fine non ci sono ", ["riuscito", "riuscita"]),
   CIA + " *Alla fine* (al final) cierra la frase; *ma* contrasta.")
tr(28, CI, "Pensalo bien, ya que después no podés cambiar de idea.",
   _combo("Pensaci bene, ", ["dato che", "visto che", "perché", "poiché"], " dopo non puoi cambiare idea") +
   _combo("Pensaci bene, ", ["dato che", "visto che", "perché", "poiché"], " poi non puoi cambiare idea"),
   "*Pensaci*: *ci* pegado al imperativo. «Ya que» se dice *dato che*, *visto che* o *poiché*.")
fx(28, CI, "ci_ne", "Voglio smettere di fumare, ma non lo riesco.", "lo", "ci",
   "*Riuscire a fare qualcosa* → *ci riesco*. «No lo logro» empuja al *lo*, pero el verbo lleva *a*. " + CIA)

tr(42, CI, "Sí, lo pensé mucho.",
   ["Sì, ci ho pensato molto", "Sì, ci ho pensato tanto", "Sì, ci ho pensato a lungo"],
   CIA + " En pasado no cambia nada: *ci ho pensato*.",
   prompt=ctx("Hai pensato a quello che ti ho detto?"))
tr(42, CI, "No sé si voy a poder.",
   ["Non so se ci riuscirò", "Non so se ce la farò", "Non so se ci riesco", "Non so se ce la faccio"],
   "*Riuscire a* → *ci riuscirò*. También *ce la farò* (farcela), muy de todos los días. " + CIA,
   prompt=ctx("Riuscirai a finire entro venerdì?"))
tr(42, CI, "No, ya no creo.",
   ["No, non ci credo più"],
   "*Credere a* → *ci credo*; «ya no» es *non… più*. " + CIA,
   prompt=ctx("Credi ancora alle sue promesse?"))
tr(42, CI, "Fue difícil, pero lo logré.",
   _combo(["È stato difficile", "È stata dura"], ", ma ", ["ci sono riuscito", "ci sono riuscita", "ce l'ho fatta"]),
   "«Lo logré» = *ci sono riuscito/a*: *riuscire a* pide *ci* y el auxiliar *essere*. También *ce l'ho fatta*.")
tr(42, CI, "Cuento con vos.",
   ["Conto su di te", "Conto su di te!"],
   "*Contare su*: con una cosa, *ci conto*; con una persona, *su di* + pronombre tónico: *conto su di te*.")
fx(42, CI, "ci_ne", "Ti sposi a giugno? Non lo posso credere!", "lo", "ci",
   "*Credere a qualcosa* → *ci credo*: *non ci posso credere*. " + CIA)
ch(42, CI, "Al viaggio? ___ penso da settimane.", ["Ci", "Ne", "Lo"], "Ci",
   "*Pensare a* → *ci*. Con *parlare di* sería *ne*: *ne parliamo domani*.",
   prompt="Elegí el pronombre.")
ch(42, CI, "Del viaggio? ___ parliamo domani.", ["Ne", "Ci", "Lo"], "Ne",
   "*Parlare di* → *ne*. *Ci* es para *a* (*pensare a*, *credere a*).",
   prompt="Elegí el pronombre.")

# ===========================================================================
# 3. Sin «a» delante del objeto directo de persona (18, 27, 34, 42, 48)
# ===========================================================================
ACCN = ("El italiano no pone «a» delante del objeto directo de persona: *ho visto Marco*, "
        "no «ho visto a Marco».")

tr(18, ACC, "¿A quién invitaste?",
   ["Chi hai invitato?", "Chi hai invitato alla festa?"],
   ACCN + " Tampoco en la pregunta: *chi hai invitato?* (no «a chi»).")
tr(18, ACC, "No vi a nadie.",
   ["Non ho visto nessuno"],
   ACCN + " Y la doble negación es obligatoria: *non ho visto nessuno*.")
fx(18, ACC, "a_personale", "Aspetto a mia sorella alla stazione.", "a mia sorella", "mia sorella",
   ACCN + " *Aspettare* es transitivo: *aspetto mia sorella*.")

tr(27, ACC, "Saludé a sus padres.",
   ["Ho salutato i suoi genitori", "Ho salutato i loro genitori"],
   ACCN + " *Salutare qualcuno*, sin preposición.")
fx(27, ACC, "a_personale", "Conosci a Marco, il fratello di Giulia?", "a Marco", "Marco",
   ACCN + " *Conoscere qualcuno*: *conosci Marco?*")
ch(27, ACC, "Le telefoneé a mi hermana.", ["Ho telefonato a mia sorella.", "Ho telefonato mia sorella."], "Ho telefonato a mia sorella.",
   "Ojo, acá la «a» sí va: *telefonare a qualcuno* es indirecto (le telefoneé). La «a» no es "
   "«nunca»: depende del verbo. *Chiamare*, en cambio, es directo: *ho chiamato mia sorella*.")

tr(34, ACC, "La chica que conocí en Roma es médica.",
   _combo("La ragazza che ho ", ["conosciuto", "conosciuta"], " a Roma ", ["è medico", "fa il medico", "è un medico", "è dottoressa", "è una dottoressa"]),
   "*Che* es el relativo del objeto directo, sin preposición: no «a cui». "
   + ACCN + " *Medico* se usa también para mujeres.")
fx(34, ACC, "preposizione", "Il ragazzo a cui ho incontrato ieri è il fratello di Anna.", "a cui", "che",
   "*Incontrare qualcuno* es directo, así que el relativo es *che*. *A cui* va con verbos de «a»: "
   "*il ragazzo a cui ho telefonato*.")
tr(34, ACC, "Le pregunté la hora a Luca.",
   ["Ho chiesto l'ora a Luca", "Ho domandato l'ora a Luca", "A Luca ho chiesto l'ora"],
   "Acá la «a» sí va: *chiedere qualcosa a qualcuno*. Lo que preguntás es directo (*l'ora*); "
   "a quién, indirecto (*a Luca*).")

tr(42, ACC, "Ayudé a mi vecino a mover el sillón.",
   _combo("Ho aiutato ", ["il mio vicino", "il vicino", "il mio vicino di casa"], " a spostare ", ["il divano", "la poltrona"]),
   "*Aiutare qualcuno a fare*: la persona va sin «a» (*ho aiutato il mio vicino*), la «a» es "
   "para el infinitivo. Y *il mio vicino* lleva artículo, no es pariente.")
fx(42, ACC, "a_personale", "Ho ringraziato a tutti per l'aiuto.", "a tutti", "tutti",
   "*Ringraziare qualcuno*: directo, como *ho salutato tutti*. " + ACCN)
ch(42, ACC, "Le pedí a Paolo que me esperara.", ["Ho chiesto a Paolo di aspettarmi.", "Ho chiesto Paolo di aspettarmi."],
   "Ho chiesto a Paolo di aspettarmi.",
   "*Chiedere a qualcuno di fare*: acá la «a» va, porque Paolo es indirecto. Con *aiutare*, "
   "*invitare*, *ringraziare*, no: son directos.")

tr(48, ACC, "A Marco no lo vi más.",
   ["Marco non l'ho più visto", "Non ho più visto Marco"],
   "Al adelantar el objeto (dislocación), el italiano lo retoma con *lo*, pero sin «a»: "
   "*Marco non l'ho più visto*. «A Marco» sería indirecto.")
fx(48, ACC, "a_personale", "A Giulia la conosco da anni.", "A Giulia", "Giulia",
   "Dislocación a la izquierda: *Giulia la conosco da anni*. El *la* retoma el objeto; la «a» "
   "del castellano no pasa.")
tr(48, ACC, "A tu hermano lo vi ayer en el centro.",
   ["Tuo fratello l'ho visto ieri in centro",
    "Ho visto tuo fratello ieri in centro", "Ieri ho visto tuo fratello in centro"],
   "*Tuo fratello l'ho visto*: dislocado y retomado con *lo*, sin «a». *Tuo fratello* sin artículo: "
   "pariente en singular.")
