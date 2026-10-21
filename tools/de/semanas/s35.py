# -*- coding: utf-8 -*-
"""Semana 35 — Er sagte, er sei krank (B2): discurso indirecto con Konjunktiv I (y II de reemplazo)."""
from base import q, ch, li, cz, tr, ty, MAY  # noqa: F401


def _nc(*xs):
    """Cada variante, también sin comas (la corrección no saca las comas del medio)."""
    out = []
    for x in xs:
        for y in (x, x.replace(",", "")):
            if y not in out:
                out.append(y)
    return out


WEEK = {
    "week": 35,
    "title": "Er sagte, er sei krank",
    "level": "B2",
    "focus": "El discurso indirecto: contar lo que dijo otro con el Konjunktiv I, y con el Konjunktiv II cuando el I no se distingue.",
    "fare": "Leer y escribir noticias, citar declaraciones y contar lo que alguien dijo, preguntó o pidió, con la distancia que exige el periodismo.",
    "tema": "Konjunktiv I (presente, pasado, futuro), Konjunktiv II de reemplazo, preguntas y pedidos indirectos, verbos de decir, prensa y noticias",
    "keys": [
        "Konjunktiv I = raíz del infinitivo + *-e*: *er komme, er habe, er könne, er wisse*.",
        "*sein* es especial: *er sei, sie seien*.",
        "Si el Konjunktiv I es igual al indicativo, va el II: *sie haben → sie hätten*.",
        "Un solo pasado: *er habe gemacht, er sei gegangen*.",
        "Futuro: *er werde kommen*. Pedido u orden: *er solle warten*.",
        "Preguntas: *Sie fragte, ob er Zeit habe / wo er wohne*.",
    ],
    "lesson": {
        "intro": "Cuando un diario alemán cuenta lo que dijo un ministro, no escribe *Er sagt, er ist krank*, sino *Er sagt, er sei krank*. Ese *sei* es el **Konjunktiv I**: la forma que marca «esto lo dice él, no yo». En castellano lo hacemos con los tiempos (dijo que estaba enfermo); en alemán, con el modo.",
        "parts": [
            {"h": "El Konjunktiv I", "blocks": [0, 1]},
            {"h": "Reemplazos y tiempos", "blocks": [2, 3, 4]},
            {"h": "Contar lo que dijo otro", "blocks": [5, 6, 7]},
        ],
        "blocks": [
            {
                "h": "Formar el Konjunktiv I",
                "r": "Se forma con la **raíz del infinitivo** + ***-e, -est, -e, -en, -et, -en***. **Sin cambio vocálico** y sin irregularidades: *er komme, er habe, er fahre, er könne, er wisse*. En la práctica se usa sobre todo la **3.ª persona del singular**, porque es la que siempre se distingue del indicativo (*er kommt* ≠ *er komme*).",
                "table": {"head": ["Persona", "kommen", "haben", "können", "werden"], "rows": [
                    ["ich", "komme", "habe", "könne", "werde"],
                    ["du", "kommest", "habest", "könnest", "werdest"],
                    ["er, sie, es", "komme", "habe", "könne", "werde"],
                    ["wir", "kommen", "haben", "können", "werden"],
                    ["ihr", "kommet", "habet", "könnet", "werdet"],
                    ["sie, Sie", "kommen", "haben", "können", "werden"],
                ]},
                "ex": [
                    ["Er sagt, er *komme* morgen.", "Dice que viene mañana."],
                    ["Sie sagt, sie *habe* keine Zeit.", "Dice que no tiene tiempo."],
                    ["Der Minister erklärte, er *könne* dazu nichts sagen.", "El ministro declaró que no podía decir nada al respecto."],
                    ["Die Sprecherin sagt, sie *wisse* davon nichts.", "La vocera dice que no sabe nada de eso."],
                ],
                "warn": "Nada de cambio vocálico: *er fahre*, *er spreche*, *er nehme*, aunque en indicativo sea *er fährt, er spricht, er nimmt*. Y los modales pierden la irregularidad: *er könne, er müsse, er wolle, er dürfe*.",
                "q": [
                    q("Konjunktiv I de *er fährt*:", "er fahre", ["er fahre", "er führe", "er fähre"]),
                    q("Completá: *Er sagt, er ___ heute arbeiten.* (müssen)", "müsse", ["müsse", "muss", "müsste"]),
                ],
            },
            {
                "h": "sein: el único irregular",
                "r": "*sein* tiene su propio Konjunktiv I, **distinto en todas las personas**: por eso es el más usado de todos.",
                "table": {"head": ["Persona", "Indicativo", "Konjunktiv I"], "rows": [
                    ["ich", "bin", "sei"],
                    ["du", "bist", "sei(e)st"],
                    ["er, sie, es", "ist", "sei"],
                    ["wir", "sind", "seien"],
                    ["ihr", "seid", "seiet"],
                    ["sie, Sie", "sind", "seien"],
                ]},
                "ex": [
                    ["Er sagte, er *sei* krank.", "Dijo que estaba enfermo."],
                    ["Die Lage *sei* ernst, sagte der Sprecher.", "La situación es grave, dijo el vocero."],
                    ["Die Kunden sagen, sie *seien* zufrieden.", "Los clientes dicen que están satisfechos."],
                ],
                "warn": "*sie seien* (Konjunktiv I) nunca se confunde con *sie sind*: por eso acá no hace falta reemplazo. Y no confundas *seid* (indicativo de *ihr*: *ihr seid*) con *seit* (desde hace): suenan igual.",
                "q": [
                    q("Completá: *Er sagt, das Hotel ___ zu teuer.*", "sei", ["sei", "ist", "wäre"]),
                    q("Completá: *Sie sagen, sie ___ müde.*", "seien", ["seien", "sind", "seiet"]),
                ],
            },
            {
                "h": "Cuando el Konjunktiv I no se nota: el II",
                "r": "En varias personas el Konjunktiv I es **igual al indicativo** (*ich habe, wir haben, sie haben, sie kommen*). Como así no se nota que es discurso indirecto, se usa el **Konjunktiv II** (semana 25): *sie hätten, sie kämen, sie könnten*. Si el Konjunktiv II también se confunde con el Präteritum (verbos regulares: *sie arbeiteten*), va ***würde* + infinitivo**.",
                "table": {"head": ["Indicativo", "Konjunktiv I", "Se usa"], "rows": [
                    ["sie haben", "sie haben (igual)", "sie hätten"],
                    ["sie kommen", "sie kommen (igual)", "sie kämen / sie würden kommen"],
                    ["wir können", "wir können (igual)", "wir könnten"],
                    ["sie arbeiten", "sie arbeiten (igual)", "sie würden arbeiten"],
                    ["er hat", "er habe (distinto)", "er habe"],
                ]},
                "ex": [
                    ["Die Kollegen sagen, sie *hätten* keine Zeit.", "Los compañeros dicen que no tienen tiempo."],
                    ["Sie sagten, sie *könnten* nicht kommen.", "Dijeron que no podían venir."],
                    ["Die Studierenden erklärten, sie *würden* morgen *protestieren*.", "Los estudiantes declararon que mañana van a protestar."],
                ],
                "warn": "Acá el Konjunktiv II **no** significa «irreal» ni «cortés»: es solo el repuesto del I. *Sie sagen, sie hätten keine Zeit* = dicen que no tienen tiempo (no «que no tendrían»).",
                "tip": "Receta: probá el Konjunktiv I; si suena igual al indicativo, pasá al II; si el II suena igual al Präteritum, *würde* + infinitivo.",
                "q": [
                    q("Completá: *Die Nachbarn sagen, sie ___ nichts gehört.*", "hätten", ["hätten", "haben", "habe"]),
                    q("Completá: *Die Firmen sagen, sie ___ keine Fachkräfte.* (finden)", "fänden", ["fänden", "finden", "finde"]),
                ],
            },
            {
                "h": "Un solo pasado",
                "r": "El discurso indirecto tiene **una sola forma de pasado**: Konjunktiv I de ***haben*** o ***sein*** + **participio**. No importa si el original estaba en Präteritum, Perfekt o Plusquamperfekt: todo se reduce a *er habe gemacht* o *er sei gegangen*.",
                "table": {"head": ["Directo", "Indirecto"], "rows": [
                    ["„Ich war krank.“", "Er sagt, er sei krank gewesen."],
                    ["„Ich habe den Unfall gesehen.“", "Sie sagt, sie habe den Unfall gesehen."],
                    ["„Ich fuhr nach Rom.“", "Er sagt, er sei nach Rom gefahren."],
                    ["„Wir hatten Glück.“", "Sie sagen, sie hätten Glück gehabt."],
                    ["„Ich hatte das schon gewusst.“", "Er sagt, er habe das schon gewusst."],
                ]},
                "ex": [
                    ["Der Zeuge sagte, er *habe* nichts *gesehen*.", "El testigo dijo que no había visto nada."],
                    ["Die Polizei teilte mit, der Fahrer *sei* zu schnell *gefahren*.", "La policía informó que el conductor había ido demasiado rápido."],
                ],
                "warn": "«*Er sagte, er war krank gewesen*» o «*er sei krank war*» están mal. La forma es siempre auxiliar en Konjunktiv + participio: *er sei krank gewesen*. Elegí *haben* o *sein* como en el Perfekt (semanas 11 y 12).",
                "q": [
                    q("„Ich ging nach Hause.“ → *Er sagt, er ___ nach Hause gegangen.*", "sei", ["sei", "habe", "ist"]),
                    q("„Ich kaufte ein Auto.“ → *Sie sagt, sie ___ ein Auto gekauft.*", "habe", ["habe", "sei", "hat"]),
                ],
            },
            {
                "h": "Futuro, pedidos y órdenes",
                "r": "El **futuro** se cuenta con *werde* + infinitivo: „Ich werde kommen.“ → *Er sagt, er werde kommen.* Los **imperativos** no tienen forma indirecta: se cuentan con ***sollen*** (orden, instrucción) o, en registro muy formal, con ***mögen*** (pedido cortés).",
                "table": {"head": ["Directo", "Indirecto"], "rows": [
                    ["„Ich werde anrufen.“", "Sie sagt, sie werde anrufen."],
                    ["„Warten Sie hier!“", "Er sagte, ich solle hier warten."],
                    ["„Ruf mich bitte an!“", "Sie sagte, ich solle sie anrufen."],
                    ["„Kommen Sie bitte pünktlich, Herr Klein!“", "Er bat, Herr Klein möge pünktlich kommen."],
                ]},
                "ex": [
                    ["Die Regierung kündigte an, sie *werde* die Steuern senken.", "El gobierno anunció que va a bajar los impuestos."],
                    ["Der Arzt sagte, ich *solle* mehr schlafen.", "El médico me dijo que durmiera más."],
                ],
                "warn": "En castellano el pedido indirecto va en subjuntivo («me dijo que esperara»). En alemán **no** se conjuga el verbo del pedido: va *sollen* en Konjunktiv + infinitivo al final: *Er sagte, ich solle warten.*",
                "q": [
                    q("„Warte hier!“ → *Sie sagte, ich ___ hier warten.*", "solle", ["solle", "soll", "warte"]),
                    q("„Ich werde helfen.“ → *Er sagt, er ___ helfen.*", "werde", ["werde", "wird", "würde"]),
                ],
            },
            {
                "h": "Cambiar personas, lugares y tiempos",
                "r": "Como en castellano, al contar lo que dijo otro cambian los **pronombres y posesivos** (*ich → er/sie*, *mein → sein/ihr*) y, si cambia el momento, también **las expresiones de tiempo y lugar**. El *dass* es **opcional**: con *dass*, verbo al final; sin *dass*, orden de principal.",
                "table": {"head": ["Directo", "Indirecto"], "rows": [
                    ["ich, mein", "er / sie, sein / ihr"],
                    ["heute", "an diesem Tag"],
                    ["morgen", "am nächsten Tag"],
                    ["gestern", "am Tag davor"],
                    ["hier", "dort"],
                ]},
                "ex": [
                    ["„Mein Chef ist heute nicht hier.“", "«Mi jefe hoy no está acá.»"],
                    ["Sie sagte, *ihr* Chef *sei* an diesem Tag nicht dort.", "Dijo que su jefe ese día no estaba allí."],
                    ["Er sagt, *dass* er krank *sei*.", "Dice que está enfermo. (con *dass*)"],
                    ["Er sagt, er *sei* krank.", "Dice que está enfermo. (sin *dass*)"],
                ],
                "warn": "Con *dass*, el verbo se va al final: *Er sagt, dass er krank sei*. Sin *dass*, queda en 2.º lugar: *Er sagt, er sei krank*. Mezclarlos («*Er sagt, dass er sei krank*») es un error muy frecuente.",
                "q": [
                    q("Completá: *Er sagt, dass er keine Zeit ___.*", "habe", ["habe", "hat", "haben"]),
                    q("„Ich komme morgen.“ (dicho ayer) → *Sie sagte, sie komme ___.*", "am nächsten Tag", ["am nächsten Tag", "morgen", "am Tag davor"]),
                ],
            },
            {
                "h": "Preguntas indirectas",
                "r": "Las preguntas se cuentan como en la semana 26: con ***ob*** (sí o no) o con la **palabra W-**, verbo al final, y el verbo en **Konjunktiv I** (o II de reemplazo).",
                "ex": [
                    ["„Hat sie Zeit?“ → Er fragte, *ob* sie Zeit *habe*.", "Preguntó si ella tenía tiempo."],
                    ["„Wo wohnt er?“ → Sie fragte, *wo* er *wohne*.", "Preguntó dónde vivía él."],
                    ["„Wann kommen die Gäste?“ → Er fragte, *wann* die Gäste *kämen*.", "Preguntó cuándo venían los invitados."],
                    ["„Warum ist der Zug zu spät?“ → Ein Reisender fragte, *warum* der Zug zu spät *sei*.", "Un pasajero preguntó por qué el tren venía tarde."],
                ],
                "warn": "En la pregunta indirecta no va el orden de pregunta: «*Er fragte, ob hat sie Zeit*» está mal. Es una subordinada: *ob* / W- + … + verbo al final.",
                "q": [
                    q("„Ist das Museum geöffnet?“ → *Sie fragte, ob das Museum geöffnet ___.*", "sei", ["sei", "ist es", "seien"]),
                    q("„Wo arbeitet er?“ → *Ich fragte, wo er ___.*", "arbeite", ["arbeite", "arbeitet er", "arbeiten"]),
                ],
            },
            {
                "h": "En los diarios y en la charla",
                "r": "En la prensa, el Konjunktiv I marca **distancia**: el periodista no afirma, **cita**. Por eso aparece con verbos como *sagen, erklären, betonen, behaupten, bestätigen, dementieren, mitteilen, berichten*, y puede seguir varias oraciones sin repetir el verbo de decir. En la **lengua hablada**, en cambio, casi todos usan el **indicativo** o *würde*: *Er hat gesagt, dass er krank ist.*",
                "table": {"head": ["Verbo", "Castellano"], "rows": [
                    ["behaupten", "afirmar, sostener (sin pruebas)"],
                    ["betonen", "subrayar, recalcar"],
                    ["bestätigen", "confirmar"],
                    ["dementieren", "desmentir"],
                    ["mitteilen", "comunicar, informar"],
                ]},
                "ex": [
                    ["Der Sprecher *betonte*, die Firma *habe* keine Fehler gemacht. Man *werde* die Vorwürfe prüfen.", "El vocero subrayó que la empresa no había cometido errores. Que se iban a examinar las acusaciones."],
                    ["Die Ministerin *dementierte*, dass sie zurücktreten *wolle*.", "La ministra desmintió que quisiera renunciar."],
                    ["Laut Polizei *sei* niemand verletzt worden.", "Según la policía, nadie resultó herido."],
                ],
                "warn": "El Konjunktiv I **no** expresa duda del periodista ni que la frase sea falsa: es una cita neutra. Si el diario quiere marcar duda, lo dice con el verbo: *behaupten* (afirmar sin pruebas) ya sugiere «eso dice él».",
                "tip": "En los titulares se ve a menudo la versión corta con dos puntos: *Minister: Lage sei unter Kontrolle.*",
                "q": [
                    q("*Er dementierte den Bericht* significa…", "Desmintió el informe.", ["Desmintió el informe.", "Confirmó el informe.", "Escribió el informe."]),
                    q("En una charla con amigos, lo más natural es…", "Er hat gesagt, dass er krank ist.", ["Er hat gesagt, dass er krank ist.", "Er sagte, er sei krank gewesen sei.", "Er hat gesagt, er seie krank."]),
                ],
            },
        ],
    },
    "vocab": [
        ["die Schlagzeile", "el titular", "Die Schlagzeile stand auf allen Titelseiten."],
        ["die Meldung", "la noticia breve, el parte", "Laut einer Meldung der Polizei gab es keine Verletzten."],
        ["die Pressekonferenz", "la conferencia de prensa", "Die Ministerin gab gestern eine Pressekonferenz."],
        ["der Sprecher", "el vocero, el portavoz", "Der Sprecher sagte, die Firma habe keine Fehler gemacht."],
        ["die Nachrichtenagentur", "la agencia de noticias", "Die Nachrichtenagentur meldete einen Unfall auf der Autobahn."],
        ["die Quelle", "la fuente", "Ein guter Journalist prüft seine Quellen."],
        ["das Zitat", "la cita", "Das Zitat stammt aus einem Interview von 2019."],
        ["zitieren", "citar", "Die Zeitung zitiert einen Experten."],
        ["die Aussage", "la declaración", "Der Zeuge hat seine Aussage geändert."],
        ["der Zeuge", "el testigo", "Der Zeuge sagte, er habe nichts gesehen."],
        ["behaupten", "afirmar, sostener", "Er behauptet, er sei unschuldig."],
        ["betonen", "subrayar, recalcar", "Die Ministerin betonte, die Lage sei ernst."],
        ["bestätigen", "confirmar", "Die Polizei hat die Meldung bestätigt."],
        ["dementieren", "desmentir", "Die Regierung dementierte den Bericht."],
        ["mitteilen", "comunicar, informar", "Die Firma teilte mit, sie werde 200 Stellen streichen."],
        ["die Pressefreiheit", "la libertad de prensa", "Die Pressefreiheit ist ein Grundrecht."],
    ],
    "items": [
        # parte 0 — el Konjunktiv I
        ch(0, "Elegí el Konjunktiv I.", "Er sagt, er ___ morgen. (kommen)", "komme", ["komme", "kommt", "käme"], "Raíz *komm-* + *-e*."),
        ch(0, "Elegí el Konjunktiv I.", "Sie sagt, sie ___ keine Zeit. (haben)", "habe", ["habe", "hat", "hatte"], "*sie habe*: distinto de *sie hat*, así que sirve."),
        ch(0, "Elegí el Konjunktiv I.", "Er sagt, er ___ krank.", "sei", ["sei", "ist", "seie"], "*sein* → *er sei*."),
        ch(0, "Elegí el Konjunktiv I.", "Sie erklärt, sie ___ nach Wien. (fahren)", "fahre", ["fahre", "fährt", "fähre"], "Sin cambio vocálico: *sie fahre*."),
        ch(0, "Elegí el Konjunktiv I.", "Der Minister sagt, er ___ dazu nichts sagen. (können)", "könne", ["könne", "kann", "konnte"], "Modal sin irregularidad: *er könne*."),
        ch(0, "Elegí el Konjunktiv I.", "Die Kunden sagen, sie ___ zufrieden.", "seien", ["seien", "sind", "sei"], "Plural de *sein*: *sie seien*."),
        ch(0, "Elegí el Konjunktiv I.", "Sie sagt, sie ___ davon nichts. (wissen)", "wisse", ["wisse", "weiß", "wüsste"], "Raíz del infinitivo *wiss-* + *-e*."),
        cz(0, "Escribí el Konjunktiv I de *haben*.", "Der Zeuge sagt, er ___ Angst.", "habe", note="*er habe*."),
        cz(0, "Escribí el Konjunktiv I de *sein*.", "Die Sprecherin sagt, die Lage ___ ernst.", "sei", note="*die Lage* = *sie* → *sei*."),
        cz(0, "Escribí el Konjunktiv I de *müssen*.", "Er sagt, er ___ heute länger arbeiten.", "müsse", note="Sin diéresis que cambie: raíz *müss-* + *-e*."),
        cz(0, "Escribí el Konjunktiv I de *sprechen*.", "Sie sagt, ihr Sohn ___ drei Sprachen.", "spreche", note="Sin cambio *e → i*: *er spreche*."),
        cz(0, "Escribí el Konjunktiv I de *wollen*.", "Der Trainer sagt, er ___ den Verein verlassen.", "wolle", note="*er wolle*, no *will*."),
        cz(0, "Escribí el Konjunktiv I de *sein*.", "Die Politiker sagen, sie ___ optimistisch.", "seien", note="*sie seien*."),
        tr(0, "Dice que está enfermo.", "Er sagt, er sei krank.", _nc("Er sagt, er sei krank.", "Er sagt, dass er krank sei.", "Sie sagt, sie sei krank.", "Sie sagt, dass sie krank sei."), "Konjunktiv I de *sein*: *sei*."),
        tr(0, "Ella dice que no tiene tiempo.", "Sie sagt, sie habe keine Zeit.", _nc("Sie sagt, sie habe keine Zeit.", "Sie sagt, dass sie keine Zeit habe."), "*sie habe*; con *dass*, verbo al final."),
        ty(0, "Escribí el Konjunktiv I (3.ª persona singular).", "nehmen → er ___", "nehme", ["nehme", "er nehme"], "Raíz del infinitivo + *-e*, sin cambio vocálico."),
        # parte 1 — reemplazos y tiempos
        ch(1, "Elegí la forma del discurso indirecto.", "Die Nachbarn sagen, sie ___ nichts gehört.", "hätten", ["hätten", "haben", "habe"], "*sie haben* = indicativo: va el Konjunktiv II *hätten*."),
        ch(1, "Elegí la forma del discurso indirecto.", "Die Gäste sagen, sie ___ später. (kommen)", "kämen", ["kämen", "kommen", "komme"], "*sie kommen* no se distingue: Konjunktiv II *kämen*."),
        ch(1, "Elegí el pasado indirecto.", "„Ich war in Berlin.“ → Er sagt, er ___ in Berlin gewesen.", "sei", ["sei", "habe", "war"], "*sein* hace Perfekt con *sein*: *er sei gewesen*."),
        ch(1, "Elegí el pasado indirecto.", "„Ich habe nichts gesehen.“ → Der Zeuge sagt, er ___ nichts gesehen.", "habe", ["habe", "hätte", "sei"], "*er habe* se distingue del indicativo: no hace falta el II."),
        ch(1, "Elegí el futuro indirecto.", "„Wir werden die Steuern senken.“ → Die Regierung sagt, sie ___ die Steuern senken.", "werde", ["werde", "wird", "würde"], "*die Regierung* = *sie* singular → *werde*."),
        ch(1, "Elegí la forma correcta.", "„Warten Sie hier!“ → Er sagte, ich ___ hier warten.", "solle", ["solle", "soll", "sollen"], "Orden → *sollen* en Konjunktiv I: *ich solle*."),
        ch(1, "Elegí la forma correcta.", "Die Arbeiter erklärten, sie ___ morgen streiken.", "würden", ["würden", "werden", "wurden"], "*sie werden* no se distingue: *würden* + infinitivo."),
        cz(1, "Escribí el auxiliar (Konjunktiv).", "„Wir hatten Glück.“ → Sie sagen, sie ___ Glück gehabt.", "hätten", note="*sie haben* = indicativo → *hätten*."),
        cz(1, "Escribí el auxiliar (Konjunktiv I).", "„Ich fuhr zu schnell.“ → Der Fahrer gibt zu, er ___ zu schnell gefahren.", "sei", note="*fahren* hace Perfekt con *sein*."),
        cz(1, "Escribí el participio.", "„Ich war krank.“ → Sie sagt, sie sei krank ___.", "gewesen", note="Pasado indirecto: *sei* + *gewesen*."),
        cz(1, "Escribí el Konjunktiv de *können*.", "Die Kollegen sagen, sie ___ nicht kommen.", "könnten", note="*sie können* = indicativo → Konjunktiv II *könnten*."),
        cz(1, "Escribí el Konjunktiv I de *werden*.", "„Ich rufe morgen an.“ → Sie sagt, sie ___ morgen anrufen.", "werde", note="Futuro indirecto: *werde* + infinitivo."),
        cz(1, "Escribí el Konjunktiv I de *sollen*.", "„Ruf mich an!“ → Sie sagte, ich ___ sie anrufen.", "solle", note="Imperativo → *sollen*."),
        tr(1, "Dijo que no había visto nada.", "Er sagte, er habe nichts gesehen.", _nc("Er sagte, er habe nichts gesehen.", "Er sagte, dass er nichts gesehen habe.", "Sie sagte, sie habe nichts gesehen.", "Sie sagte, dass sie nichts gesehen habe.", "Er hat gesagt, er habe nichts gesehen.", "Sie hat gesagt, sie habe nichts gesehen."), "Un solo pasado: *habe* + participio."),
        tr(1, "Dicen que no tienen tiempo.", "Sie sagen, sie hätten keine Zeit.", _nc("Sie sagen, sie hätten keine Zeit.", "Sie sagen, dass sie keine Zeit hätten."), "*sie haben* = indicativo → *hätten*."),
        ty(1, "Pasá a discurso indirecto (empezá con *Er sagt, er*).", "„Ich bin nach Hause gegangen.“", "Er sagt, er sei nach Hause gegangen.", _nc("Er sagt, er sei nach Hause gegangen.", "Er sagt, dass er nach Hause gegangen sei."), "*gehen* → *sein*: *er sei gegangen*."),
        # parte 2 — contar lo que dijo otro
        ch(2, "Elegí el orden correcto.", "(Dice que tiene tiempo.)", "Er sagt, dass er Zeit habe.", ["Er sagt, dass er Zeit habe.", "Er sagt, dass er habe Zeit.", "Er sagt, er Zeit habe."], "Con *dass*, verbo al final; sin *dass*, en 2.º lugar."),
        ch(2, "Elegí el posesivo.", "„Mein Auto ist kaputt.“ → Sie sagt, ___ Auto sei kaputt.", "ihr", ["ihr", "mein", "sein"], "Lo dice ella: *mein* → *ihr*."),
        ch(2, "Elegí la pregunta indirecta.", "„Hat er Zeit?“ → Sie fragte, …", "… ob er Zeit habe.", ["… ob er Zeit habe.", "… ob hat er Zeit.", "… dass er Zeit habe."], "Pregunta de sí o no → *ob* + verbo al final."),
        ch(2, "Elegí la pregunta indirecta.", "„Wo wohnt sie?“ → Er fragte, …", "… wo sie wohne.", ["… wo sie wohne.", "… wo wohne sie.", "… ob sie wohne."], "Palabra W- + verbo al final, en Konjunktiv I."),
        ch(2, "¿Qué significa?", "Die Regierung dementierte den Bericht.", "El gobierno desmintió el informe.", ["El gobierno desmintió el informe.", "El gobierno confirmó el informe.", "El gobierno presentó el informe."], "*dementieren* = desmentir; *bestätigen* = confirmar."),
        ch(2, "¿Qué expresa el Konjunktiv I en la prensa?", "Der Sprecher sagte, die Firma habe keine Fehler gemacht.", "que el periodista cita, sin afirmarlo él", ["que el periodista cita, sin afirmarlo él", "que el periodista cree que es mentira", "que es algo irreal"], "Es distancia neutra, no duda ni irrealidad."),
        ch(2, "¿Qué es lo más natural en una charla?", "(Me dijo que estaba enfermo.)", "Er hat gesagt, dass er krank ist.", ["Er hat gesagt, dass er krank ist.", "Er hat gesagt, dass er ist krank.", "Er hat gesagt, er krank sei."], "Hablando, el indicativo es lo normal."),
        cz(2, "Escribí la palabra que falta.", "„Kommst du mit?“ → Sie fragte, ___ ich mitkomme.", "ob", note="Pregunta de sí o no → *ob*."),
        cz(2, "Escribí el Konjunktiv I de *sein*.", "„Warum ist der Zug zu spät?“ → Ein Reisender fragte, warum der Zug zu spät ___.", "sei", note="W- + verbo al final: *sei*."),
        cz(2, "Escribí el Konjunktiv I de *arbeiten*.", "„Wo arbeitet er?“ → Ich fragte, wo er ___.", "arbeite", note="*er arbeite*: raíz + *-e*."),
        cz(2, "Escribí el verbo (confirmar, Präteritum).", "Die Polizei ___ die Meldung: Es habe keine Verletzten gegeben.", "bestätigte", note="*bestätigen* = confirmar; regular: *bestätigte*."),
        cz(2, "Escribí la expresión de tiempo.", "„Ich komme morgen.“ (dicho la semana pasada) → Sie sagte, sie komme am ___ Tag.", "nächsten", note="*morgen* → *am nächsten Tag*."),
        tr(2, "Ella preguntó si él tenía tiempo.", "Sie fragte, ob er Zeit habe.", _nc("Sie fragte, ob er Zeit habe.", "Sie fragte, ob er Zeit hätte.", "Sie hat gefragt, ob er Zeit habe.", "Sie hat gefragt, ob er Zeit hat.", "Sie fragte, ob er Zeit hat."), "*ob* + verbo al final; en la prensa, *habe*."),
        tr(2, "El médico dijo que durmiera más.", "Der Arzt sagte, ich solle mehr schlafen.", _nc("Der Arzt sagte, ich solle mehr schlafen.", "Der Arzt sagte, dass ich mehr schlafen solle.", "Der Arzt hat gesagt, ich solle mehr schlafen.", "Der Arzt sagte, ich sollte mehr schlafen.", "Die Ärztin sagte, ich solle mehr schlafen.", "Die Ärztin hat gesagt, ich solle mehr schlafen.", "Die Ärztin sagte, ich sollte mehr schlafen."), "Pedido indirecto → *sollen*."),
        ty(2, "Escribí en alemán, con artículo.", "«el titular (de un diario)»", "die Schlagzeile", note="*die Schlagzeile*: *die Zeile* = la línea. " + MAY),
        li(2, "Pressekonferenz", ["Pressekonferenz", "Pressefreiheit", "Pressemeldung"], "*die Pressekonferenz* = la conferencia de prensa."),
    ],
}
