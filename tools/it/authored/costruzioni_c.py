# -*- coding: utf-8 -*-
"""da, segnali discorsivi, volerci / metterci y evidencia negativa (propuestas 2026-10, Tanda 1).

Cuatro propuestas del plan auditorias/PLAN-2026-10-propuestas.md:

1. «da» con personas e infinitivo, más allá de la 9: *dai miei*, *dal
   dentista*, *qualcosa da bere*, *molto da fare*, contra el calco «per»
   y «a» del castellano. Vuelve en la 10, 17, 20 y 27 (el duelo «da o per»
   está en docs/lang/it/duelli_data.js, desde la 17).
2. Segnali discorsivi en microescenas: la situación en castellano y la
   respuesta en italiano con *prego*, *ecco*, *mica*, *magari*, *pure*.
   Prego y ecco: 2, 8, 10 y 17; pure: 12 y 44; mica: 18 y 28; magari: 30 y 39.
3. Evidencia negativa de lo que no tenía ni un error: trapassato (26, 29, 32),
   modales en tiempos compuestos (16, 31), *occorrere* en plural (25, 35) y
   el gerundio a la española (42, 44).
4. *ci vuole / ci metto* y la trampa de «tardar»: traducciones y fixerr en la
   22, 27 y 45 (el duelo «ci vuole o ci metto» abre en la 22).

Prefijo de los ids: cx-c-<semana>-<n>.
"""
from itertools import product

TR = "Traducí al italiano."
FX = "Trova l'errore: tocá la palabra que está mal y corregila."
SCENA = "¿Qué decís acá? Contestá en italiano."
CH = "¿Qué quiere decir?"

LEVEL = {}
for _w in range(1, 53):
    LEVEL[_w] = "A1" if _w <= 6 else "A2" if _w <= 18 else "B1" if _w <= 28 else "B2" if _w <= 39 else "C1"

T_DA = "da + persona / infinito"
T_SEG = "segnali discorsivi"
T_NEG = "errori da disimparare"
T_VOL = "volerci e metterci"

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
    d = dict(id="cx-c-%d-%02d" % (w, _N[w]), w=w, level=LEVEL[w], type=typ, topic=topic,
             prompt=prompt, stem=stem, answer=answer, note=note)
    if clean:
        d["alt"] = clean
    d.update(extra)
    ITEMS.append(d)
    return d


def tr(w, topic, stem, variants, note, prompt=TR):
    """translate: la primera variante es la respuesta; el resto, alt."""
    return _add(w, "translate", topic, prompt, stem, variants[0], note, variants[1:])


def ty(w, topic, stem, variants, note, prompt=SCENA):
    """typed: la situación en castellano → lo que se dice en italiano."""
    return _add(w, "typed", topic, prompt, stem, variants[0], note, variants[1:], stemEs=True)


def fx(w, topic, cat, stem, bad, good, note, good_alt=None):
    assert stem.count(bad) == 1, (stem, bad)
    d = _add(w, "fixerr", topic, FX, stem, stem.replace(bad, good, 1), note,
             [stem.replace(bad, g, 1) for g in good_alt or []], cat=cat, bad=bad, good=good)
    if good_alt:
        d["goodAlt"] = list(good_alt)
    return d


def ch(w, topic, stem, options, answer, note, prompt=CH, **extra):
    return _add(w, "choice", topic, prompt, stem, answer, note, options=options, **extra)


# ===========================================================================
# 1. «da» con personas e infinitivo
# ===========================================================================

# --- 10 ---------------------------------------------------------------------
tr(10, T_DA, "Esta noche ceno en lo de mis viejos.",
   _combo(["Stasera", "Questa sera"], " ceno ", ["dai miei", "dai miei genitori", "a casa dei miei",
                                                 "a casa dei miei genitori"], ".")
   + ["Ceno dai miei stasera."],
   "«En lo de» alguien es *da* + la persona: *dai miei* (mis viejos, sin repetir *genitori*). "
   "✗ «ceno ai miei» no se dice: con personas va *da*.")
tr(12, T_DA, "Estoy en el dentista, te llamo después.",
   _combo("Sono dal dentista, ", ["ti chiamo", "ti richiamo"], [" dopo", " più tardi"], "."),
   "Estar o ir a la consulta, al negocio o a la casa de una persona: *da* + la persona, con artículo si hace falta "
   "(*dal dentista*). ✗ «sono al dentista» suena coloquial; lo estándar es *dal*.")
tr(10, T_DA, "¿Querés algo para tomar?",
   ["Vuoi qualcosa da bere?", "Vuoi bere qualcosa?"],
   "«Algo para» + verbo, cuando dice para qué sirve la cosa, es *da* + infinitivo: *qualcosa da bere*. "
   "✗ «qualcosa per bere» es el calco del «para» castellano.")

# --- 17 ---------------------------------------------------------------------
tr(17, T_DA, "Hoy tengo mucho que hacer.",
   _combo("Oggi ho ", ["molto", "tanto", "molte cose", "tante cose", "un sacco di cose"], " da fare.")
   + _combo("Ho ", ["molto", "tanto", "molte cose", "tante cose", "un sacco di cose"], " da fare oggi."),
   "«Tener que hacer» con algo delante (mucho, nada, cosas) es *avere* + algo + *da* + infinitivo: *ho molto da fare*. "
   "No confundir con «tengo que hacerlo», que es *devo farlo*.")
tr(17, T_DA, "Mañana voy a lo de Giulia a estudiar.",
   ["Domani vado da Giulia a studiare.", "Domani vado a studiare da Giulia."],
   "Dos preposiciones que el castellano resuelve con «a»: el lugar-persona va con *da* (*da Giulia*) y el "
   "para qué del movimiento con *a* + infinitivo (*vado a studiare*).")
fx(17, T_DA, "preposizione", "Hai fame? Vuoi qualcosa per mangiare?", "per", "da",
   "Algo que sirve para comer es *qualcosa da mangiare*: *da* + infinitivo describe la cosa. "
   "*per* + infinitivo es la finalidad de una acción: *esco per mangiare*.")
fx(17, T_DA, "preposizione", "Sabato sera andiamo a Marco per vedere la partita.", "a Marco", "da Marco",
   "Ir a lo de una persona: *andare da* + persona. «Andare a Marco» no significa nada en italiano: "
   "*a* sirve para ciudades (*a Roma*), no para la casa de alguien.")

# --- 20 ---------------------------------------------------------------------
tr(20, T_DA, "Me gustaría algo para leer en el viaje.",
   _combo("Vorrei qualcosa da leggere ", ["in viaggio", "durante il viaggio", "per il viaggio"], "."),
   "Con el condicional la regla es la misma: algo que sirve para leer es *qualcosa da leggere*. "
   "El *per* queda para el destino de la cosa: *per il viaggio*.")
tr(20, T_DA, "¿Podrías pasar por lo de la abuela?",
   ["Potresti passare dalla nonna?", "Potresti passare da nonna?", "Potresti fare un salto dalla nonna?"],
   "*passare da* + persona: pasar un rato por la casa de alguien. Con sustantivo va con artículo: "
   "*da* + *la nonna* = *dalla nonna*.")

# --- 27 ---------------------------------------------------------------------
tr(27, T_DA, "Ayer estuve en lo de Marta toda la tarde.",
   _combo(["Ieri sono ", "Sono "], ["stato", "stata"], " da Marta tutto il pomeriggio", "."),
   "*essere da* + persona es «estar en lo de»: *sono stato da Marta*. Y *stare* (*sono stato*) lleva *essere*, "
   "así que el participio concuerda con quien habla.")
tr(27, T_DA, "Es una película para ver con amigos.",
   _combo("È un film da ", ["vedere", "guardare"], " con ", ["gli amici", "amici"], "."),
   "*da* + infinitivo dice para qué es la cosa: *un film da vedere*, *un libro da leggere*. "
   "✗ «un film per vedere» es el calco del «para» castellano.")
fx(27, T_DA, "preposizione", "Il frigo è vuoto: non c'è niente per mangiare.", "per", "da",
   "*niente da* + infinitivo (nada que comer): el *da* va después de *niente*, *qualcosa*, *molto*. "
   "El castellano dice «nada que comer» o «para comer», y por eso tienta el *per*.")

# ===========================================================================
# 2. Segnali discorsivi en microescenas
# ===========================================================================

# --- 2: prego ---------------------------------------------------------------
ty(2, T_SEG, "Te dan las gracias por pasarle la sal. Contestá.",
   ["Prego!", "Di niente!", "Di nulla!", "Figurati!", "Non c'è di che!"],
   "Para contestar a *grazie* lo más común es *prego* (de nada). También van *di niente* o, entre amigos, *figurati*. "
   "✗ «de niente» no existe: es *di*.")
ch(2, T_SEG, "En un bar, el mozo se acerca y te dice: «Prego?»",
   ["¿Qué le sirvo?", "Por favor.", "De nada."], "¿Qué le sirvo?", stemEs=True, note=
   "*Prego* no es solo «de nada»: con tono de pregunta, el mozo o el vendedor te invita a pedir (¿qué le sirvo?, ¿qué desea?). "
   "«Por favor» es *per favore*.")

# --- 8: prego y ecco --------------------------------------------------------
ty(8, T_SEG, "Golpean la puerta de tu oficina. Decí, cortés: ¡Pase!",
   ["Prego!", "Avanti!", "Prego, avanti!"],
   "*Prego* también es «pase, adelante»: invita a hacer algo. *Avanti!* es lo mismo, más directo. "
   "El mismo *prego* de «de nada»: en italiano sirve para las dos cosas.")
ty(8, T_SEG, "Tu amigo busca las llaves y vos las encontrás. Dáselas y decí: ¡Acá están las llaves!",
   ["Ecco le chiavi!", "Ecco qui le chiavi!", "Ecco qua le chiavi!", "Le chiavi sono qui!"],
   "*ecco* presenta algo que está ahí, al alcance: «acá está, acá tenés». Va sin verbo: "
   "✗ «ecco sono le chiavi» sobra el verbo.")

# --- 10: ecco + pronombre -------------------------------------------------
ty(10, T_SEG, "Te llaman desde la cocina y llegás corriendo. Decí: ¡Acá estoy!",
   ["Eccomi!", "Eccomi qui!", "Eccomi qua!"],
   "*ecco* se pega al pronombre átono, como un imperativo: *ecco* + *mi* = *eccomi* (¡acá estoy!, ¡ya llegué!). "
   "✗ «ecco io» no se dice.")

# --- 12: pure ---------------------------------------------------------------
ty(12, T_SEG, "Un compañero te pide prestado el libro. Decile: ¡Agarralo nomás!",
   ["Prendilo pure!", "Prendi pure!", "Sì, prendilo pure!", "Sì, prendi pure!"],
   "*pure* después de un imperativo es el «nomás» o «dale»: da permiso con amabilidad. "
   "El pronombre se pega al imperativo de *tu*: *prendilo*.")
ty(12, T_SEG, "Alguien te pregunta si se puede sentar en tu mesa. Contestale: ¡Sentate nomás!",
   ["Siediti pure!", "Sì, siediti pure!", "Accomodati pure!", "Sì, accomodati pure!"],
   "Imperativo de *sedersi* para *tu*: *siediti* (el reflexivo va pegado). Y *pure* detrás lo vuelve "
   "invitación: «sentate nomás, no hay problema».")

# --- 17: ecco + pronombre y prego -------------------------------------------
ty(17, T_SEG, "Buscás las llaves por toda la casa y al final las ves arriba de la mesa. Decí: ¡Acá están!",
   ["Eccole!", "Eccole qui!", "Eccole qua!"],
   "*ecco* + pronombre directo: *eccole* porque son *le chiavi* (femenino plural). "
   "Para *il libro* sería *eccolo*; para *gli amici*, *eccoli*.")
ty(17, T_SEG, "Preguntan por Marco y justo lo ves entrar. Decí: ¡Ahí está!",
   ["Eccolo!", "Eccolo qui!", "Eccolo qua!", "Eccolo là!", "Eccolo lì!"],
   "*eccolo* (*ecco* + *lo*) señala a alguien que aparece. Concuerda con la persona: *eccola* (Giulia), "
   "*eccoli* (los chicos).")
ty(17, T_SEG, "Una señora mayor te agradece que le abriste la puerta. Contestale con cortesía.",
   ["Prego, signora!", "Prego!", "Si figuri!", "Si figuri, signora!", "Di niente!", "Di niente, signora!",
    "Di nulla!", "Non c'è di che!"],
   "Con alguien a quien tratás de *Lei*, *figurati* pasa a *si figuri*. *Prego* sirve con todos, "
   "y *signora* al final lo hace más amable.")

# --- 18: mica ---------------------------------------------------------------
ty(18, T_SEG, "Pasalo al italiano con *mica*: ¡No es nada fácil, eh!",
   ["Non è mica facile, eh!", "Non è mica facile!", "Mica è facile, eh!", "Mica è facile!"],
   "*mica* refuerza el *non* al hablar: *non è mica facile* (para nada). Va después del verbo, donde iría "
   "*niente* o *affatto*. Al principio de la frase va sin *non*.")
ty(18, T_SEG, "Probás la comida de tu amigo y te sorprende. Decí con *mica*: ¡Nada mal!",
   ["Mica male!", "Non è mica male!", "Mica male, eh!"],
   "*Mica male!* es el «¡nada mal!» de todos los días. Al principio, *mica* va solo; con el verbo, "
   "vuelve el *non*: *non è mica male*.")

# --- 28: mica ---------------------------------------------------------------
ty(28, T_SEG, "Preguntale a un compañero, con *mica*: ¿No tendrás una lapicera, por casualidad?",
   ["Non hai mica una penna?", "Non avresti mica una penna?", "Hai mica una penna?"],
   "En una pregunta negativa *mica* suaviza el pedido: «¿no tendrás…, por casualidad?». "
   "Va entre el verbo y lo que pedís: *non hai mica una penna?*")
ty(28, T_SEG, "Te tratan como si no entendieras nada. Contestá con *mica*: ¡No soy ningún tonto, eh!",
   ["Non sono mica stupido, eh!", "Non sono mica stupido!", "Non sono mica stupida, eh!",
    "Non sono mica stupida!", "Mica sono stupido!", "Mica sono stupida!", "Non sono mica scemo!",
    "Non sono mica scema!"],
   "*mica* en una afirmación negativa protesta: «¡mirá que no soy…!». El adjetivo concuerda con quien habla "
   "(*stupido / stupida*).")

# --- 30: magari -------------------------------------------------------------
ty(30, T_SEG, "Te preguntan si te ganaste la lotería. Contestá: ¡Ojalá!",
   ["Magari!", "Magari fosse vero!"],
   "*Magari!* solo es «¡ojalá!»: deseo de algo que no pasó. Si sigue un verbo, va en congiuntivo imperfetto: "
   "*magari fosse vero!*")
ty(30, T_SEG, "Pasalo al italiano con *magari*: ¡Ojalá tuviera más tiempo!",
   ["Magari avessi più tempo!"],
   "*magari* + congiuntivo imperfetto: un deseo que hoy no se cumple. "
   "✗ «magari ho più tempo» sería «capaz que tengo más tiempo», otra cosa.")
ty(30, T_SEG, "Te invitan al cine y no podés. Rechazá sin cerrar la puerta: Lo siento, ¡otra vez será!",
   ["Mi dispiace, magari un'altra volta!", "Mi dispiace, sarà per un'altra volta!",
    "Peccato, magari un'altra volta!"],
   "*magari un'altra volta* es el «otra vez será»: rechaza con amabilidad y deja abierta otra invitación. "
   "Acá *magari* es «quizás», no «ojalá».")

# --- 39: magari -------------------------------------------------------------
ty(39, T_SEG, "Pasalo al italiano con *magari*: Capaz que mañana llueve.",
   ["Magari domani piove.", "Magari domani pioverà."],
   "*magari* + indicativo es «a lo mejor, capaz que»: *magari domani piove*. Con congiuntivo imperfetto "
   "sería un deseo (*magari piovesse*, ¡ojalá lloviera!).")
ty(39, T_SEG, "Pasalo al italiano con *magari*: ¡Ojalá lo hubiera sabido antes!",
   ["Magari l'avessi saputo prima!", "Magari lo avessi saputo prima!"],
   "Para el deseo sobre el pasado, *magari* + congiuntivo trapassato: *magari l'avessi saputo*. "
   "El *lo* suele apostrofarse ante *avessi*: *l'avessi*.")

# --- 44: pure ---------------------------------------------------------------
ty(44, T_SEG, "Un compañero te pregunta: «Posso aprire la finestra?». Contestale: ¡Abrila nomás!",
   ["Aprila pure!", "Sì, aprila pure!", "Apri pure!", "Sì, apri pure!", "Certo, aprila pure!"],
   "*pure* después del imperativo da permiso: «dale, nomás». El pronombre va pegado (*aprila*) y "
   "*pure* va al final.")
ty(44, T_SEG, "Una señora te trata de usted. Decile: Tutéeme nomás, señora.",
   ["Mi dia pure del tu, signora.", "Mi dia pure del tu, signora!", "Signora, mi dia pure del tu."],
   "Con el *Lei* el imperativo es el congiuntivo (*mi dia*) y el pronombre va delante. *pure* sigue "
   "marcando permiso: «nomás». *dare del tu* es «tutear».")

# ===========================================================================
# 3. Evidencia negativa: trapassato, modales, occorrere, gerundio
# ===========================================================================

# --- 16 y 26-29: trapassato y modales ---------------------------------------
fx(26, T_NEG, "tempo_verbale", "Quando sono arrivato, il film è già cominciato.",
   "è già cominciato", "era già cominciato",
   "Lo que pasó antes que otro pasado va en trapassato prossimo: *era già cominciato* (ya había empezado). "
   "Con *già* y un *quando* en pasado, el castellano dice «había»: el italiano, también.")
tr(29, T_NEG, "Cuando llegamos a la estación, el tren ya había salido.",
   _combo("Quando siamo ", ["arrivati", "arrivate"], " alla stazione, il treno era già partito."),
   "«Había salido» es trapassato prossimo: imperfetto del auxiliar + participio. *partire* lleva *essere*: "
   "*era partito*. ✗ «è già partito» borra el orden de los hechos.")
fx(16, T_NEG, "ausiliare", "Ieri sono dovuto lavorare fino a tardi.", "sono dovuto", "ho dovuto",
   "Con *dovere, potere, volere* el auxiliar lo elige el infinitivo: *lavorare* lleva *avere*, así que "
   "*ho dovuto lavorare*. *sono dovuto* va solo con verbos de *essere*: *sono dovuto partire*.")
tr(16, T_NEG, "Tuve que levantarme temprano.",
   ["Mi sono dovuto alzare presto.", "Mi sono dovuta alzare presto.", "Ho dovuto alzarmi presto."],
   "Con un reflexivo, si el pronombre va delante sube con él el *essere*: *mi sono dovuto alzare*. "
   "Si se pega al infinitivo, vuelve el *avere*: *ho dovuto alzarmi*.")

# --- 25: occorrere -----------------------------------------------------------
fx(25, T_NEG, "accordo", "Per l'iscrizione occorre due documenti.", "occorre", "occorrono",
   "*occorrere* (hacer falta) concuerda con lo que hace falta, como *servire*: *due documenti* es plural, "
   "así que *occorrono*. Igual que «hacen falta» en castellano.")
tr(25, T_NEG, "Para la inscripción hacen falta dos fotos.",
   ["Per l'iscrizione occorrono due foto.", "Occorrono due foto per l'iscrizione.",
    "Per l'iscrizione servono due foto.", "Per l'iscrizione ci vogliono due foto."],
   "*occorrere*, *servire* y *volerci* concuerdan con lo que hace falta: *due foto*, plural. "
   "*foto* es femenino e invariable: *una foto, due foto*.")
tr(25, T_NEG, "Hace falta que vengas mañana.",
   ["Occorre che tu venga domani.", "Bisogna che tu venga domani.", "È necessario che tu venga domani.",
    "Occorre che venga domani.", "Bisogna che venga domani."],
   "Con una oración detrás (*che* + verbo), *occorre* queda en singular y pide congiuntivo: "
   "*occorre che tu venga*. El *tu* ayuda, porque *venga* sirve para tres personas.")

# --- 26 y 32: trapassato -----------------------------------------------------
fx(32, T_NEG, "tempo_verbale", "Non sono venuto alla festa perché la settimana prima ho preso l'influenza.",
   "ho preso", "avevo preso",
   "*la settimana prima* (la semana anterior) mira hacia atrás desde otro pasado: pide trapassato, "
   "*avevo preso*. Con *la settimana scorsa* (desde hoy) sí iría *ho preso*.")
tr(26, T_NEG, "Me di cuenta de que me había olvidado las llaves.",
   _combo(["Mi sono accorto", "Mi sono accorta", "Mi sono reso conto", "Mi sono resa conto"],
          " che avevo dimenticato le chiavi.")
   + _combo(["Mi sono accorto", "Mi sono accorta"], [" di aver", " di avere"], " dimenticato le chiavi.")
   + _combo(["Mi sono accorto", "Mi sono reso conto"], " che mi ero dimenticato ", ["le", "delle"], " chiavi.")
   + _combo(["Mi sono accorta", "Mi sono resa conto"], " che mi ero dimenticata ", ["le", "delle"], " chiavi."),
   "El olvido fue antes de darte cuenta: trapassato, *avevo dimenticato*. *dimenticare* lleva objeto "
   "directo y *avere*; *accorgersi* es reflexivo y va con *essere*.")

# --- 31: modales en el condizionale passato ----------------------------------
fx(31, T_NEG, "ausiliare", "Saremmo dovuti chiamare prima di venire.", "Saremmo dovuti", "Avremmo dovuto",
   "El modal toma el auxiliar del infinitivo: *chiamare* va con *avere*, así que *avremmo dovuto chiamare*. "
   "*saremmo dovuti* iría con *venire* o *partire*.")
tr(31, T_NEG, "Tendrías que haberme avisado.",
   ["Avresti dovuto avvisarmi.", "Mi avresti dovuto avvisare.", "Avresti dovuto avvertirmi.",
    "Mi avresti dovuto avvertire.", "Dovevi avvisarmi.", "Mi dovevi avvisare."],
   "«Tendrías que haber» + participio es *avresti dovuto* + infinitivo simple: el pasado lo lleva el modal, "
   "no el infinitivo. Al hablar también se oye *dovevi avvisarmi*. ✗ «dovresti avermi avvisato» es el calco.")
tr(31, T_NEG, "Me hubiera gustado ir, pero no pude.",
   _combo(["Sarei voluto", "Sarei voluta", "Avrei voluto", "Mi sarebbe piaciuto"], " andare, ma non ho potuto."),
   "*andare* lleva *essere*, así que lo estándar es *sarei voluto andare*; *avrei voluto* también se acepta. "
   "Solo, sin infinitivo, el modal va con *avere*: *non ho potuto*.")

# --- 35: occorrere en futuro y compuesto -------------------------------------
fx(35, T_NEG, "accordo", "Occorrerà tre settimane per finire i lavori.", "Occorrerà", "Occorreranno",
   "*occorrere* concuerda con lo que hace falta en todos los tiempos: *tre settimane*, plural, da "
   "*occorreranno*. Va delante, pero sigue siendo el sujeto.")
fx(35, T_NEG, "ausiliare", "Hanno occorso tre anni per costruire il ponte.", "Hanno occorso", "Sono occorsi",
   "*occorrere* lleva *essere* y el participio concuerda con lo que hizo falta: *tre anni*, masculino plural, "
   "*sono occorsi*. Igual que *ci sono voluti*.")

# --- 42: continuare a, smettere di ------------------------------------------
fx(42, T_NEG, "tempo_verbale", "Continua piovendo da stamattina.", "Continua piovendo", "Continua a piovere",
   "«Seguir + gerundio» no se calca: *continuare a* + infinitivo. *Continua a piovere*. "
   "El gerundio italiano no va detrás de *continuare*.")
fx(42, T_NEG, "preposizione", "Ho smesso fumando l'anno scorso.", "fumando", "di fumare",
   "*smettere di* + infinitivo es «dejar de»: *ho smesso di fumare*. Igual que *continuare a*, "
   "*smettere* nunca va con gerundio.")
tr(42, T_NEG, "Sigo pensando que tenés razón.",
   _combo("Continuo a ", ["pensare", "credere"], " che tu abbia ragione.")
   + _combo("Continuo a ", ["pensare", "credere"], " che hai ragione.")
   + ["Penso ancora che tu abbia ragione."],
   "«Sigo + gerundio» se dice *continuo a* + infinitivo. Después de *pensare che* va congiuntivo "
   "(*abbia*), aunque al hablar se oye también el indicativo.")

# --- 44: gerundio a la española ---------------------------------------------
fx(44, T_NEG, "tempo_verbale", "Ho ricevuto una scatola contenendo libri.", "contenendo", "che contiene",
   "El gerundio italiano no sirve de adjetivo. Para describir un sustantivo, relativo (*che contiene*) "
   "o, en lo escrito, participio presente (*contenente*).",
   good_alt=["contenente"])
fx(44, T_NEG, "tempo_verbale", "Uscendo di casa, ha cominciato a piovere.", "Uscendo", "Mentre uscivo",
   "El gerundio toma el sujeto de la principal: así diría que la lluvia salía de casa. Si los sujetos "
   "son distintos, va *mentre* + verbo: *mentre uscivo*.",
   good_alt=["Mentre uscivamo", "Mentre usciva"])
fx(44, T_NEG, "tempo_verbale", "Dalla finestra ho visto un uomo correndo verso la stazione.", "correndo", "correre",
   "Después de *vedere* lo que hace el otro va en infinitivo (*ho visto un uomo correre*) o con *che* "
   "(*che correva*). El gerundio haría que el que corre sea yo.",
   good_alt=["che correva"])
tr(44, T_NEG, "Sigue lloviendo desde esta mañana.",
   _combo("Continua a piovere ", ["da stamattina", "da questa mattina", "fin da stamattina"], ".")
   + _combo(["Piove ancora", "Non smette di piovere"], " da ", ["stamattina", "questa mattina"], "."),
   "*continuare a* + infinitivo, nunca + gerundio: *continua a piovere*. Y «desde» un momento, con un hecho "
   "que sigue, es *da* con presente.")

# ===========================================================================
# 4. ci vuole / ci metto y la trampa de «tardar»
# ===========================================================================

# --- 22 ---------------------------------------------------------------------
tr(22, T_VOL, "Tardé una hora en encontrarlo.",
   _combo(["Ci ho messo", "Ci ho impiegato", "Ho impiegato"], " un'ora ", ["a", "per"], " trovarlo."),
   "«Tardar» un tiempo es *metterci*, que se conjuga con quien tarda: *ci ho messo* (con *avere*). "
   "✗ «ho tardato un'ora» suena a «me retrasé una hora».")
tr(22, T_VOL, "Para esta torta hacen falta dos huevos.",
   _combo("Per questa torta ", ["ci vogliono", "servono", "occorrono"], " due uova.")
   + _combo(["Ci vogliono", "Servono"], " due uova per questa torta."),
   "*volerci* es impersonal y concuerda con lo que hace falta: *due uova*, plural, *ci vogliono*. "
   "Ojo: *uovo* tiene plural femenino, *le uova*.")
fx(22, T_VOL, "accordo", "Da qui a Milano ci vuole tre ore.", "vuole", "vogliono",
   "*volerci* concuerda con lo que hace falta: *tre ore* es plural, así que *ci vogliono*. "
   "Con *un'ora* sí iría *ci vuole*.")
fx(22, T_VOL, "falso_amico", "Di solito tardo venti minuti ad arrivare al lavoro.", "tardo", "ci metto",
   "*tardare* es llegar tarde o demorarse más de la cuenta (*scusa, ho tardato*). El tiempo que te lleva algo "
   "es *metterci*: *ci metto venti minuti*.")

# --- 27 ---------------------------------------------------------------------
tr(27, T_VOL, "¿Cuánto tardás en llegar a la facultad?",
   _combo("Quanto ", ["", "tempo "], "ci metti ", ["ad arrivare", "per arrivare", "a arrivare"], " all'università?"),
   "El que tarda es *tu*: *metterci* concuerda con la persona, *ci metti*. La tarea va con *a* "
   "(o *ad* ante vocal) o con *per* + infinitivo.")
tr(27, T_VOL, "Con los chicos hace falta mucha paciencia.",
   _combo("Con i ", ["bambini", "ragazzi"], " ci vuole ", ["molta", "tanta"], " pazienza.")
   + _combo("Ci vuole ", ["molta", "tanta"], " pazienza con i ", ["bambini", "ragazzi"], "."),
   "*volerci* no es solo tiempo: es «hace falta» cualquier cosa. *pazienza* es singular, así que *ci vuole*; "
   "*ci vogliono* sería para un plural.")
fx(27, T_VOL, "ausiliare", "Ieri ci sono messo due ore per tornare a casa.", "sono", "ho",
   "*metterci* lleva *avere*: *ci ho messo*. El que lleva *essere* es *volerci*: *ci sono volute due ore*. "
   "Pista: si hay una persona que tarda, *avere*.")

# --- 45 ---------------------------------------------------------------------
fx(45, T_VOL, "accordo", "Per finire il progetto ci è voluto tre mesi.", "è voluto", "sono voluti",
   "*volerci* lleva *essere* y en compuesto concuerda en todo con lo que hizo falta: *tre mesi*, masculino plural, "
   "*ci sono voluti*.")
tr(45, T_VOL, "Tardaron tres años en construir el puente.",
   _combo("Ci hanno messo tre anni ", ["a", "per"], " costruire il ponte.")
   + _combo("Ci sono voluti tre anni ", ["a", "per"], " costruire il ponte.")
   + _combo("Hanno impiegato tre anni ", ["a", "per"], " costruire il ponte."),
   "Con sujeto que tarda (*loro*), *ci hanno messo*. Sin persona, *ci sono voluti tre anni*. "
   "✗ «hanno tardato tre anni» diría que se retrasaron.")
ch(45, T_VOL, "¿Cuál dice «Tardé dos horas en llegar»?",
   ["Ci ho messo due ore ad arrivare.", "Ho tardato due ore ad arrivare.", "Mi sono messo due ore ad arrivare."],
   "Ci ho messo due ore ad arrivare.", stemEs=True, prompt="Elegí la que está bien.", note=
   "La duración de algo es *metterci*: *ci ho messo due ore*. *tardare* es llegar tarde o demorarse más de lo debido "
   "(*non tardare!*): *ho tardato due ore* diría que te retrasaste dos horas.")
