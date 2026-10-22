# -*- coding: utf-8 -*-
"""ne, ci y los verbos pronominales, en producción y al oído (propuestas 2026-10, Tanda 1).

Tres propuestas del plan auditorias/PLAN-2026-10-propuestas.md:

1. «Responder con el clítico: ne, ci, lo o nada»: primero reconocer qué
   reemplaza el pronombre (cantidad, lugar, «de eso», «a eso», objeto) en la
   21; después, contestar una pregunta con una respuesta corta y el clítico
   que va, con una pista entre paréntesis. Vuelve en la 22, 24, 28, 33 y 40,
   con la concordancia del participio desde la 22 (*ne ho comprate sei*).
2. Verbos pronominales en pasado (*me ne sono andato*, *ce l'ho fatta*, *me
   la sono cavata*): traducción y transformación presente → passato
   prossimo, con el participio en -a. Pocos por vez: 22, 30, 38, 45 y 48.
3. Escucha de clíticos: ítems listen (elegí lo que oíste entre formas que al
   oído se funden: *c'è / ce n'è*, *gli ho / gliel'ho*, *-i / -e* del
   participio) y dictados cortos, en la 21, 22, 26, 33 y 45.

Prefijo de los ids: cx-b-<semana>-<n>.
"""
from itertools import product

TR = "Traducí al italiano."
RISP = "Contestá en italiano con una respuesta corta y el pronombre que va (ne, ci, lo, gliene…). Usá la pista entre paréntesis."
PP = "Pasá la frase al passato prossimo."
FX = "Trova l'errore: tocá la palabra que está mal y corregila."
QUE = "¿Qué reemplaza el pronombre en la respuesta?"
LI = "Escuchá: ¿qué dice?"
DI = "Dictado: escuchá y escribí lo que oís."

LEVEL = {}
for _w in range(1, 53):
    LEVEL[_w] = "A1" if _w <= 6 else "A2" if _w <= 18 else "B1" if _w <= 28 else "B2" if _w <= 39 else "C1"

T_RISP = "ne e ci"
T_PRON = "verbi pronominali"
T_ASC = "ascolto"

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
    d = dict(id="cx-b-%d-%02d" % (w, _N[w]), w=w, level=LEVEL[w], type=typ, topic=topic,
             prompt=prompt, stem=stem, answer=answer, note=note)
    if clean:
        d["alt"] = clean
    d.update(extra)
    ITEMS.append(d)
    return d


def tr(w, topic, stem, variants, note, prompt=TR):
    """translate: la primera variante es la respuesta; el resto, alt."""
    return _add(w, "translate", topic, prompt, stem, variants[0], note, variants[1:])


def ty(w, topic, stem, variants, note, prompt=RISP):
    """typed: pregunta (o frase) → respuesta; la primera variante es la respuesta."""
    return _add(w, "typed", topic, prompt, stem, variants[0], note, variants[1:])


def yn(head, core):
    """«Sì, ci vado» y también «Ci vado»: la respuesta corta con y sin el sì/no."""
    bare = core[0].upper() + core[1:]
    return [head + ", " + core, bare]


def fx(w, topic, cat, stem, bad, good, note):
    return _add(w, "fixerr", topic, FX, stem, stem.replace(bad, good, 1), note,
                cat=cat, bad=bad, good=good)


def ch(w, topic, stem, options, answer, note, prompt=QUE):
    return _add(w, "choice", topic, prompt, stem, answer, note, options=options)


def li(w, said, others, note):
    """listen: se oye la frase (sin texto) y se elige cuál fue."""
    return _add(w, "listen", T_ASC, LI, said, said, note, options=[said] + others, nopeek=True)


def di(w, text, note, alt=None):
    """Dictado: se oye la frase y se escribe entera."""
    return _add(w, "dictation", T_ASC, DI, text, text, note, alt, nopeek=True)


# ===========================================================================
# 1. Responder con el clítico: ne, ci, lo o nada
# ===========================================================================

# --- 21: ¿qué reemplaza? (reconocimiento, solo por la forma) -----------------
Q = ["una cantidad", "un lugar", "«de eso» (di + algo)", "«a eso» (a + algo)", "la cosa misma (objeto directo)"]
CANT, LUG, DI_, A_, OBJ = Q

ch(21, T_RISP, "Quanti caffè bevi al giorno? — Ne bevo tre.", Q, CANT,
   "*ne* con un número detrás (*ne bevo tre*) retoma una cantidad: «de cafés, tomo tres». "
   "En castellano no se dice nada; en italiano, si no repetís *caffè*, el *ne* es obligatorio.")
ch(21, T_RISP, "Sei mai stato a Venezia? — Sì, ci sono stato l'anno scorso.", Q, LUG,
   "*ci* retoma el lugar ya nombrado (*a Venezia*): es el «ahí» que el castellano casi siempre calla. "
   "Pista de forma: la pregunta tenía *a / in* + un lugar.")
ch(21, T_RISP, "Hai paura del buio? — No, non ne ho paura.", Q, DI_,
   "*avere paura di* lleva *di*, y *di* + algo se retoma con *ne*: *non ne ho paura* (no le tengo miedo). "
   "No hay número detrás: no es cantidad, es «de eso».")
ch(21, T_RISP, "Pensi ancora a quella storia? — Sì, ci penso spesso.", Q, A_,
   "*pensare a* qualcosa: el *a* + cosa se retoma con *ci* (*ci penso*), donde el castellano dice "
   "«pienso en eso». Si fuera una persona, iría *penso a lei*.")
ch(21, T_RISP, "Hai visto il nuovo film di Sorrentino? — Sì, l'ho visto ieri.", Q, OBJ,
   "*vedere* lleva objeto directo, sin preposición: se retoma con *lo / la* (*l'ho visto*), como en castellano. "
   "Ni *ne* ni *ci*: no hay cantidad, ni lugar, ni *di* o *a*.")
ch(21, T_RISP, "Parlate spesso di politica a casa? — No, non ne parliamo mai.", Q, DI_,
   "*parlare di* algo: el *di* + cosa se vuelve *ne* (*non ne parliamo*, no hablamos de eso). "
   "Ojo con el *a casa* de la pregunta: no se retoma, el que se retoma es el tema.")

# --- 21: primeras respuestas, en presente ----------------------------------
ty(21, T_RISP, "Quante lingue parli? (tre)",
   ["Ne parlo tre", "Parlo tre lingue"],
   "Si contestás con el número y no repetís *lingue*, el *ne* es obligatorio: *ne parlo tre*. "
   "✗ «Parlo tre» queda cojo en italiano, aunque en castellano «hablo tres» suene bien.")
ty(21, T_RISP, "Credi all'oroscopo? (no)",
   yn("No", "non ci credo"),
   "*credere a* algo → *ci credo*. El castellano dice «no creo» o «no creo en eso»; el italiano retoma el *a* + cosa "
   "con *ci*, delante del verbo y después del *non*.")
ty(21, T_RISP, "Vai spesso al mare d'estate? (sì, ogni fine settimana)",
   yn("Sì", "ci vado ogni fine settimana"),
   "El lugar (*al mare*) se retoma con *ci*: *ci vado*. Sin *ci* la frase no está mal, pero suena seca; "
   "el italiano retoma el lugar casi siempre.")

# --- 22: compuestos y concordancia del participio --------------------------
NE_PART = ("Con *ne* de cantidad, el participio concuerda con lo contado: ")
ty(22, T_RISP, "Quante mele hai comprato? (sei)",
   ["Ne ho comprate sei", "Ho comprato sei mele"],
   NE_PART + "*mele* es femenino plural, así que *ne ho comprate sei*. ✗ «Ne ho comprato sei» es la falta típica: "
   "en la pregunta no hay pronombre y por eso ahí va *comprato*.")
ty(22, T_RISP, "Sei mai stato a Napoli? (sì, due volte)",
   yn("Sì", "ci sono stato due volte"),
   "*ci* va delante del auxiliar: *ci sono stato*. El participio concuerda con el sujeto porque *sono stato* va "
   "con *essere*; si te pregunta *sei mai stata*, contestás *ci sono stata*.")
ty(22, T_RISP, "Hai parlato a Marco del problema? (sì, ieri)",
   yn("Sì", "gliene ho parlato ieri") + yn("Sì", "ieri gliene ho parlato"),
   "Dos cosas a retomar: *a Marco* (*gli*) y *del problema* (*ne*). Juntas dan *gliene*, en una sola palabra: "
   "*gliene ho parlato*, «le hablé de eso».")
ty(22, T_RISP, "Hai dato le chiavi a Luca? (sì, stamattina)",
   yn("Sì", "gliele ho date stamattina") + yn("Sì", "stamattina gliele ho date"),
   "*a Luca* + *le chiavi* = *gliele*. Con un pronombre directo delante, el participio concuerda: "
   "*gliele ho date* (las llaves, femenino plural). ✗ «gliele ho dato» pierde la concordancia.")

# --- 24 -------------------------------------------------------------------
ty(24, T_RISP, "Hai bisogno della macchina domani? (no)",
   yn("No", "non ne ho bisogno"),
   "*avere bisogno di* → *ne ho bisogno*. El castellano dice «no la necesito», con *la*, y empuja a ✗ «non la ho bisogno»: "
   "en italiano el verbo pide *di*, así que va *ne*.")
ty(24, T_RISP, "Quanti biglietti hai preso per il concerto? (quattro)",
   ["Ne ho presi quattro", "Ho preso quattro biglietti"],
   NE_PART + "*biglietti* es masculino plural, así que *ne ho presi quattro*. El *ne* va delante del auxiliar.")
ty(24, T_RISP, "Sei andata al mercato? (sì, stamattina)",
   yn("Sì", "ci sono andata stamattina") + yn("Sì", "stamattina ci sono andata"),
   "La pregunta dice *andata*: contesta una mujer, y *andare* lleva *essere*, así que *ci sono andata*. "
   "El *ci* (al mercado) va antes del auxiliar.")
fx(24, T_RISP, "participio_accordo", "Di biscotti, ne ho mangiato cinque.", "mangiato", "mangiati",
   "Con *ne* de cantidad el participio concuerda con lo contado: *biscotti*, masculino plural, da *ne ho mangiati cinque*. "
   "Sin el *ne* sería *ho mangiato cinque biscotti*.")

# --- 28 -------------------------------------------------------------------
ty(28, T_RISP, "Credi a quello che dice Paolo? (no, per niente)",
   yn("No", "non ci credo per niente"),
   "*credere a* + cosa → *ci credo*. Fijate que *a quello che dice* es una cosa, no una persona: por eso *ci*. "
   "Para la persona sería *non gli credo* (no le creo).")
ty(28, T_RISP, "Hai sentito parlare di questo ristorante? (sì, molto bene)",
   yn("Sì", "ne ho sentito parlare molto bene") + yn("Sì", "ne ho sentito parlare benissimo"),
   "*parlare di* algo → *ne*: *ne ho sentito parlare*, «oí hablar de eso». El *ne* sube hasta delante del auxiliar, "
   "aunque pertenezca a *parlare*.")
ty(28, T_RISP, "Quante pagine hai letto ieri sera? (una ventina)",
   ["Ne ho lette una ventina", "Ho letto una ventina di pagine"],
   NE_PART + "*pagine*, femenino plural: *ne ho lette una ventina*. El número puede ser aproximado y la regla es la misma.")
fx(28, T_RISP, "ci_ne", "Hai bisogno di aiuto? — No, grazie, non ci ho bisogno.", "ci", "ne",
   "*avere bisogno di* lleva *di*, y *di* + algo se retoma con *ne*: *non ne ho bisogno*. "
   "*ci* es para *a / in / su* + algo (*ci penso*, *ci credo*).")

# --- 33 -------------------------------------------------------------------
ty(33, T_RISP, "Se avessi una settimana libera, andresti in Sicilia? (sì, subito)",
   yn("Sì", "ci andrei subito"),
   "En el periodo hipotético la respuesta va en condicional, y el lugar (*in Sicilia*) se retoma igual con *ci*: "
   "*ci andrei subito*.")
ty(33, T_RISP, "Quanti figli vorresti avere? (due)",
   ["Ne vorrei avere due", "Vorrei averne due", "Ne vorrei due", "Vorrei avere due figli"],
   "Con un modal el *ne* puede ir delante (*ne vorrei avere due*) o pegado al infinitivo (*vorrei averne due*): "
   "las dos valen. Lo que no puede faltar es el *ne*.")
ty(33, T_RISP, "Hai mai parlato ai tuoi genitori di questa idea? (no, mai)",
   yn("No", "non gliene ho mai parlato"),
   "*ai tuoi genitori* (*gli*, también para «a ellos») + *di questa idea* (*ne*) = *gliene*. "
   "*mai* va entre el auxiliar y el participio: *non gliene ho mai parlato*.")

# --- 40 -------------------------------------------------------------------
ty(40, T_RISP, "Hai portato i documenti all'avvocato? (sì, ieri)",
   yn("Sì", "glieli ho portati ieri") + yn("Sì", "ieri glieli ho portati"),
   "*all'avvocato* + *i documenti* = *glieli*, y el participio concuerda con el directo: *glieli ho portati*. "
   "El castellano dice «se los llevé»; ✗ «se li ho portati» no existe con este sentido.")
ty(40, T_RISP, "Quante bottiglie di vino hanno bevuto a cena? (tre)",
   ["Ne hanno bevute tre", "Hanno bevuto tre bottiglie"],
   NE_PART + "*bottiglie*, femenino plural: *ne hanno bevute tre*. Concuerda con lo contado, no con el *vino*.")
ty(40, T_RISP, "Ti sei ricordato del compleanno di Anna? (sì, per fortuna)",
   yn("Sì", "per fortuna me ne sono ricordato") + yn("Sì", "me ne sono ricordato, per fortuna"),
   "*ricordarsi di* algo: el reflexivo *mi* + *ne* (de eso) dan *me ne*. Como es reflexivo, auxiliar *essere* "
   "y participio con el sujeto: *me ne sono ricordato* (*ricordata* si sos mujer).")
ty(40, T_RISP, "Sei riuscito a finire il progetto? (sì, alla fine)",
   yn("Sì", "alla fine ci sono riuscito") + yn("Sì", "ci sono riuscito, alla fine"),
   "*riuscire a* + algo → *ci riesco*. En pasado, *riuscire* lleva *essere*: *ci sono riuscito*. "
   "El castellano dice «lo logré», con *lo*: ✗ «l'ho riuscito» es el calco.")

# ===========================================================================
# 2. Verbos pronominales en pasado
# ===========================================================================
ANDAR = ("*andarsene* (irse) lleva los dos pronombres y en pasado va con *essere*: *me ne sono andato*. "
         "El participio concuerda con quien se va.")

# --- 22 -------------------------------------------------------------------
tr(22, T_PRON, "Me fui temprano de la fiesta.",
   _combo("Me ne sono ", ["andato", "andata"], " presto dalla festa") +
   _combo("Dalla festa me ne sono ", ["andato", "andata"], " presto"),
   ANDAR + " ✗ «Mi sono andato» no existe: el *ne* no se cae.")
tr(22, T_PRON, "¡Lo logramos!",
   ["Ce l'abbiamo fatta!", "Ce l'abbiamo fatta"],
   "«Lograrlo» es *farcela*: *ce la facciamo* → *ce l'abbiamo fatta*. La *la* se apostrofa ante *abbiamo* y el participio "
   "termina en *-a*. ✗ «L'abbiamo fatto» es «lo hicimos», otra cosa.")
ty(22, T_PRON, "Me ne vado.",
   ["Me ne sono andato", "Me ne sono andata"],
   ANDAR + " Los pronombres quedan iguales y delante del auxiliar.", prompt=PP)

# --- 30 -------------------------------------------------------------------
tr(30, T_PRON, "Se fueron sin saludar.",
   _combo("Se ne sono ", ["andati", "andate"], " senza salutare"),
   ANDAR + " En tercera persona, *se ne sono andati* (*andate* si son todas mujeres). Y *senza* + infinitivo, como en castellano.")
tr(30, T_PRON, "¿Al final pudiste? (a una amiga que tenía un examen difícil)",
   ["Alla fine ce l'hai fatta?", "Ce l'hai fatta alla fine?", "Ce l'hai fatta?"],
   "*farcela* en passato prossimo: *ce l'hai fatta*, con *avere* y el participio en *-a*, que concuerda con esa *la* fija, "
   "no con tu amiga.")
fx(30, T_PRON, "participio_accordo", "Era difficilissimo, ma alla fine ce l'ho fatto.", "fatto", "fatta",
   "En *farcela* la *la* es fija y el participio concuerda con ella: *ce l'ho fatta*, siempre en *-a*, "
   "lo diga un hombre o una mujer.")
tr(30, T_PRON, "No te lo tomes a mal.",
   ["Non prendertela", "Non te la prendere", "Non prendertela!", "Non te la prendere!",
    "Non prendertela a male", "Non te la prendere a male"],
   "«Tomárselo a mal» es *prendersela*. En el imperativo negativo de *tu* los pronombres van delante (*non te la prendere*) "
   "o pegados al infinitivo (*non prendertela*): valen las dos.")

# --- 38 -------------------------------------------------------------------
tr(38, T_PRON, "Me dijo que se había ido temprano.",
   _combo(["Mi ha detto che ", "Mi disse che "], ["se ne era andato", "se n'era andato", "se ne era andata", "se n'era andata"],
          " presto"),
   "En el discurso indirecto el pasado retrocede al trapassato: *se ne era andato*. Los pronombres de *andarsene* "
   "quedan delante del auxiliar, y *ne* se puede apostrofar: *se n'era andato*.")
ty(38, T_PRON, "Non ce la faccio.",
   ["Non ce l'ho fatta"],
   "*farcela* va con *avere*: *ce la faccio* → *ce l'ho fatta*. ✗ «Non ce l'ho fatto»: el participio concuerda "
   "con la *la* y termina siempre en *-a*.", prompt=PP)
tr(38, T_PRON, "Se ofendió porque no la invité.",
   ["Se l'è presa perché non l'ho invitata", "Se l'è presa perché non l'avevo invitata"],
   "*prendersela* (ofenderse) es reflexivo: va con *essere* (*se l'è presa*) y el participio en *-a*. "
   "Y *l'ho invitata* concuerda con *la* (ella).")

# --- 45 -------------------------------------------------------------------
ty(45, T_PRON, "Me la cavo da sola.",
   ["Me la sono cavata da sola"],
   "*cavarsela* (arreglárselas) es reflexivo: va con *essere* y el participio concuerda con la *la* fija: "
   "*me la sono cavata*. ✗ «Me l'ho cavata» mezcla el auxiliar de *avere*.", prompt=PP)
tr(45, T_PRON, "¿Estás enojado conmigo?",
   ["Ce l'hai con me?", "Ce l'hai con me"],
   "«Estar enojado con alguien» es *avercela con qualcuno*: *ce l'hai con me?*. No se arma con *arrabbiato*: "
   "es una de esas expresiones que se aprenden enteras.")
tr(45, T_PRON, "No me animé a decírselo.",
   ["Non me la sono sentita di dirglielo"],
   "«Animarse a» es *sentirsela di*: reflexivo, con *essere* y participio en *-a* (*me la sono sentita*). "
   "Y «decírselo» a él o a ella es *dirglielo*, pegado al infinitivo.")
fx(45, T_PRON, "ausiliare", "Ieri Marco se l'ha presa con me per niente.", "l'ha", "l'è",
   "*prendersela* es reflexivo y los reflexivos van con *essere*: *se l'è presa*. ✗ «se l'ha presa» "
   "mezcla el auxiliar de *avere*.")

# --- 48 -------------------------------------------------------------------
tr(48, T_PRON, "Nos fuimos antes del final.",
   _combo("Ce ne siamo ", ["andati", "andate"], " prima della fine") +
   _combo("Ce ne siamo ", ["andati", "andate"], " prima che finisse"),
   ANDAR + " Con *noi*, el *ci* pasa a *ce* delante de *ne*: *ce ne siamo andati*.")
tr(48, T_PRON, "Al final se las arreglaron solos.",
   ["Alla fine se la sono cavata da soli", "Se la sono cavata da soli"],
   "*cavarsela* en plural: *se la sono cavata*. El participio concuerda con la *la* fija (*cavata*), aunque el sujeto sea plural.")
ty(48, T_PRON, "Giulia ce la fa.",
   ["Giulia ce l'ha fatta"],
   "*farcela* con *avere*: *ce la fa* → *ce l'ha fatta*. El *-a* del participio no es por Giulia: "
   "también diría *Marco ce l'ha fatta*.", prompt=PP)
fx(48, T_PRON, "participio_accordo", "Le ragazze se ne sono andato senza pagare.", "andato", "andate",
   "*andarsene* va con *essere*, así que el participio concuerda con el sujeto: *le ragazze se ne sono andate*. "
   "Acá no hay *la* fija que mande el *-a*.")

# ===========================================================================
# 3. Escucha de clíticos
# ===========================================================================

# --- 21 -------------------------------------------------------------------
li(21, "Ce n'è ancora un po'.", ["C'è ancora un po'.", "Che n'è ancora un po'."],
   "*ce n'è* = *ci* + *ne* + *è*: «hay (de eso)». Al oído suena «chené», con una *n* que no está en *c'è*. "
   "Sin el *ne* la frase pierde el «de eso».")
li(21, "Non ne ho.", ["Non ho.", "Non l'ho."],
   "*non ne ho* (no tengo de eso) se oye con dos *n* seguidas: «non-ne-ò». *non l'ho* (no lo tengo) suena «nonló». "
   "La *h* de *ho* no suena nunca.")
li(22, "Ce ne sono due.", ["Ci sono due.", "Ce n'è due."],
   "Con *ci sono* + *ne*, el *ci* pasa a *ce*: *ce ne sono due*, «hay dos». "
   "Si oís «che-ne», hay un *ne*; *ce n'è* va con singular.")

# --- 22 -------------------------------------------------------------------
li(22, "Gliel'ho detto ieri.", ["Gli ho detto ieri.", "L'ho detto ieri."],
   "*gliel'ho* = *glie* + *l'* + *ho*: suena «lliéló», con una *l* de más que *gli ho* («lliò»). "
   "Es «se lo dije»; *gli ho detto* sería «le dije», sin decir qué.")
li(22, "Me l'ha data Marco.", ["Me l'ha dato Marco.", "Me l'hai data, Marco."],
   "Con *l'* no se oye si era *lo* o *la*: lo dice la última vocal del participio. *data* = la, *dato* = lo. "
   "Escuchá el final de la palabra.")
di(22, "Me ne vado, ci vediamo domani.",
   "*me ne vado* (me voy) son tres palabras que suenan como una: «menevado». Y *ci vediamo* es «nos vemos»: "
   "acá *ci* es «nosotros», no lugar.")

# --- 26 (jefe B1) ---------------------------------------------------------
li(26, "Ne ho comprati tre.", ["Ne ho comprate tre.", "Li ho comprati tre."],
   "El participio dice qué se contó: *comprati* (masculino, por ejemplo libros) o *comprate* (femenino, por ejemplo manzanas). "
   "La diferencia está en la última vocal.")
li(26, "Ce l'ho in macchina.", ["C'è in macchina.", "Ce n'è in macchina."],
   "*ce l'ho* (lo tengo) suena «chelò»; *c'è* (está) es «che» solo. En el habla *avere* con *lo / la* suma un *ci*: "
   "*ce l'ho*, no ✗ «l'ho» suelto.")
di(26, "Ce l'ho fatta!",
   "*farcela* en pasado: *ce l'ho fatta* (lo logré), que al oído es «chelò fatta». Se escribe con apóstrofo "
   "porque *la* pierde la vocal ante *ho*.",
   alt=["Ce l'ho fatta"])

# --- 33 -------------------------------------------------------------------
li(33, "Se l'avessi saputo, gliel'avrei detto.",
   ["Se l'avessi saputo, gli avrei detto.", "Se lo sapessi, glielo direi."],
   "*gliel'avrei* = *glielo* + *avrei* con apóstrofo: «lliela-vrei». Y *l'avessi saputo* es pasado: "
   "si no lo supiste, no se lo dijiste. La otra opción habla del presente.")
di(33, "Se me l'avessi chiesto, te l'avrei prestato.",
   "Dos combinados con apóstrofo: *me l'avessi* (me lo hubieras) y *te l'avrei* (te lo habría). "
   "Es el periodo hipotético del pasado: congiuntivo trapassato + condizionale passato.")

# --- 45 -------------------------------------------------------------------
li(45, "Se n'è andato senza dire niente.",
   ["Se ne va senza dire niente.", "Si è andato senza dire niente."],
   "*se n'è andato* (se fue): el *ne* se apostrofa ante *è* y suena «sené». ✗ «si è andato» no existe: "
   "*andarsene* no pierde el *ne*.")
li(45, "Non ce la faccio più.", ["Non la faccio più.", "Non ce l'ho fatta più."],
   "*non ce la faccio più* (no doy más) es presente: «che la fáccio». *Non la faccio più* sería «no la hago más» (una torta, por ejemplo).")
di(45, "Me la sono cavata, ma ci ho messo un'ora.",
   "Dos verbos pronominales en pasado: *cavarsela* con *essere* y el participio en *-a*, y *metterci* (tardar) con *avere*: "
   "*ci ho messo*.")
