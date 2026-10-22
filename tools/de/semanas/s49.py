# -*- coding: utf-8 -*-
"""Semana 49 — Es ist davon auszugehen (C1): la lengua académica (impersonales, sein/haben + zu, Funktionsverbgefüge avanzados)."""
from base import q, ch, li, cz, tr, ty, MAY  # noqa: F401


def V(*xs):
    """Las respuestas, cada una también sin comas (la app no perdona una coma de menos)."""
    out = []
    for x in xs:
        for y in (x, x.replace(",", "")):
            if y not in out:
                out.append(y)
    return out


WEEK = {
    "week": 49,
    "title": "Es ist davon auszugehen",
    "level": "C1",
    "focus": "El alemán de los trabajos académicos: escribir sin «yo», las construcciones con sein / haben + zu y los Funktionsverbgefüge del registro alto.",
    "fare": "Redactar y entender textos académicos y exposiciones: presentar una tesis, matizar, señalar límites y sacar conclusiones con las fórmulas que espera un profesor o un examinador.",
    "tema": "Pasiva impersonal, es handelt sich um, Konjunktiv I en textos (es sei darauf hingewiesen), sein + zu, haben + zu, participio con zu, Funktionsverbgefüge (zur Diskussion stellen, in Betracht ziehen, Anwendung finden)",
    "keys": [
        "Sin «yo»: *Es wird angenommen, dass … / Im Folgenden wird gezeigt, dass …*",
        "*Bei dem Text handelt es sich um …*: el sujeto de *sich handeln um* es siempre *es*.",
        "*Es sei darauf hingewiesen, dass …* = cabe señalar que …",
        "*sein + zu* = se puede / se debe: *Es ist davon auszugehen, dass …*",
        "*haben + zu* = tener que: *Sie haben die Arbeit bis Juni abzugeben.*",
        "*die zu lösende Aufgabe* = la tarea que hay que resolver.",
        "FVG: *zur Diskussion stellen, in Betracht ziehen, Stellung nehmen, Anwendung finden, in Kraft treten*.",
    ],
    "lesson": {
        "intro": "En un trabajo académico alemán casi nunca aparece *ich*: el texto habla «solo», con pasivas, con *es* y con sustantivos pesados. Ya conocés la pasiva (semanas 27 y 31), las alternativas con *sein + zu* (semana 40) y las primeras Nomen-Verb-Verbindungen (semana 32). Esta semana las juntamos en el registro de la universidad.",
        "parts": [
            {"h": "Escribir sin «yo»", "blocks": [0, 1, 2]},
            {"h": "sein + zu y haben + zu", "blocks": [3, 4]},
            {"h": "Funktionsverbgefüge del registro alto", "blocks": [5, 6, 7]},
        ],
        "blocks": [
            {
                "h": "La pasiva impersonal del texto",
                "r": "Para presentar, afirmar o suponer sin nombrar a nadie, el texto académico usa la **pasiva**, muchas veces con *es* en el Vorfeld y una subordinada con *dass*. Si otro elemento ocupa el Vorfeld, el *es* **desaparece**.",
                "table": {"head": ["Fórmula", "Para qué"], "rows": [
                    ["Es wird angenommen, dass …", "presentar una suposición general"],
                    ["Im Folgenden wird gezeigt, dass …", "anunciar lo que viene"],
                    ["In dieser Arbeit wird untersucht, ob …", "plantear la pregunta"],
                    ["Es wurde nachgewiesen, dass …", "citar un resultado comprobado"],
                    ["Bisher wurde kaum beachtet, dass …", "señalar un vacío"],
                ]},
                "ex": [
                    ["*Es wird* häufig *behauptet*, dass Zweisprachigkeit Kinder überfordert.", "Se suele afirmar que el bilingüismo sobreexige a los chicos."],
                    ["Häufig *wird behauptet*, dass Zweisprachigkeit Kinder überfordert.", "A menudo se afirma que el bilingüismo sobreexige a los chicos."],
                    ["Im Folgenden *werden* die wichtigsten Ergebnisse *dargestellt*.", "A continuación se presentan los resultados más importantes."],
                ],
                "warn": "En castellano, el «se» impersonal no concuerda siempre con nada. En alemán, si hay un sujeto en plural, el verbo va en plural: *Im Folgenden **werden** die Ergebnisse dargestellt* (no *wird*).",
                "tip": "*man* no está prohibido (*Man kann feststellen, dass …*), pero un texto lleno de *man* suena a redacción escolar. Alterná con la pasiva y con *sich lassen*.",
                "q": [
                    q("Completá: *___ wird angenommen, dass die Zahl steigt.*", "Es", ["Es", "Man", "Das"]),
                    q("Completá: *Im Folgenden ___ zwei Modelle verglichen.*", "werden", ["werden", "wird", "ist"]),
                ],
            },
            {
                "h": "Es handelt sich um …, es zeigt sich …",
                "r": "Hay verbos que en el texto académico van con un *es* fijo como sujeto: *es handelt sich um* (se trata de), *es zeigt sich, dass* (se ve que), *es ergibt sich (daraus), dass* (de ahí resulta que), *es lässt sich feststellen, dass* (se puede constatar que), *es kommt auf … an* (depende de).",
                "ex": [
                    ["*Bei* den Befragten *handelt es sich um* Studierende im ersten Semester.", "Los encuestados son estudiantes de primer año."],
                    ["*Es zeigt sich*, dass die Methode in kleinen Gruppen besser funktioniert.", "Se observa que el método funciona mejor en grupos chicos."],
                    ["*Daraus ergibt sich*, dass weitere Studien nötig sind.", "De ahí resulta que hacen falta más estudios."],
                    ["*Es lässt sich feststellen*, dass die Kosten gesunken sind.", "Se puede constatar que los costos bajaron."],
                ],
                "warn": "*Der Text handelt sich um …* está mal. O *Der Text **handelt von** …* (trata de, cuenta), o *Bei dem Text **handelt es sich um** einen Essay* (el texto es un ensayo). En *sich handeln um*, el sujeto es siempre *es*.",
                "tip": "*Es geht um …* es la versión neutra y oral de *es handelt sich um*: en un trabajo escrito, preferí la segunda.",
                "q": [
                    q("Completá: *Bei dem Artikel handelt ___ sich um eine Glosse.*", "es", ["es", "er", "man"]),
                    q("¿Cuál es correcta?", "Der Roman handelt von einer Familie in Wien.", ["Der Roman handelt von einer Familie in Wien.", "Der Roman handelt sich um eine Familie in Wien.", "Der Roman handelt es um eine Familie in Wien."]),
                ],
            },
            {
                "h": "Es sei darauf hingewiesen: el Konjunktiv I del texto",
                "r": "Además del discurso indirecto (semana 35), el **Konjunktiv I** aparece en fórmulas fijas del texto científico, con valor de «cabe…, téngase en cuenta…»: *Es sei darauf hingewiesen, dass …* (cabe señalar que), *Man beachte …* (obsérvese), *Hier sei nur erwähnt, dass …* (baste mencionar que), *Gegeben sei …* (sea dado…, en matemática).",
                "ex": [
                    ["*Es sei darauf hingewiesen*, dass die Stichprobe sehr klein war.", "Cabe señalar que la muestra era muy chica."],
                    ["*Man beachte* den Unterschied zwischen beiden Gruppen.", "Obsérvese la diferencia entre ambos grupos."],
                    ["*Hier sei nur erwähnt*, dass es auch andere Erklärungen gibt.", "Aquí baste mencionar que hay también otras explicaciones."],
                ],
                "more": [
                    "Otras fórmulas de remisión, con el participio solo: *wie bereits erwähnt* (como ya se dijo), *wie oben dargestellt* (como se expuso arriba), *wie im zweiten Kapitel gezeigt* (como se mostró en el capítulo 2).",
                ],
                "warn": "*Es sei* no es «es sea» ni un subjuntivo de duda: es una orden suave, impersonal, típica del registro escrito. En el habla nadie dice *Man beachte*.",
                "q": [
                    q("Completá: *Es ___ darauf hingewiesen, dass …*", "sei", ["sei", "wäre", "würde"]),
                    q("¿Qué significa *Man beachte die Tabelle 3*?", "Obsérvese la tabla 3.", ["Obsérvese la tabla 3.", "Se respetó la tabla 3.", "Uno debería haber mirado la tabla 3."]),
                ],
            },
            {
                "h": "sein + zu: se puede, se debe",
                "r": "*sein + zu + infinitivo* equivale a una **pasiva con modal**: según el contexto, **poder** (*kann … werden*) o **deber** (*muss … werden*). En la lengua académica está por todos lados. En los verbos separables, el *zu* va entre el prefijo y la raíz: *aus**zu**gehen*.",
                "table": {"head": ["sein + zu", "= pasiva con modal"], "rows": [
                    ["Es ist davon auszugehen, dass …", "Man muss davon ausgehen, dass …"],
                    ["Die Ergebnisse sind mit Vorsicht zu interpretieren.", "… müssen mit Vorsicht interpretiert werden."],
                    ["Das Problem ist kaum zu lösen.", "… kann kaum gelöst werden."],
                    ["Der Antrag ist bis Juni einzureichen.", "… muss bis Juni eingereicht werden."],
                ]},
                "ex": [
                    ["*Es ist davon auszugehen*, dass die Preise weiter steigen.", "Hay que partir de la base de que los precios seguirán subiendo."],
                    ["Dieser Befund *ist* nicht leicht *zu erklären*.", "Este hallazgo no es fácil de explicar."],
                ],
                "warn": "Solo el contexto dice si es «se puede» o «se debe»: *Das ist nicht zu ändern* = no se puede cambiar; *Die Regeln sind zu beachten* = hay que respetarlas. Con *kaum, leicht, nicht* suele ser «poder».",
                "tip": "*Es ist davon auszugehen, dass …* es la fórmula estrella para presentar una suposición fundada: más elegante que *Ich glaube, dass …*",
                "q": [
                    q("Completá: *Es ist davon ___, dass …*", "auszugehen", ["auszugehen", "zu ausgehen", "ausgegangen"]),
                    q("¿Qué significa *Das Risiko ist nicht zu unterschätzen*?", "No hay que subestimar el riesgo.", ["No hay que subestimar el riesgo.", "El riesgo no es subestimado.", "El riesgo no fue subestimado."]),
                ],
            },
            {
                "h": "haben + zu y el participio con zu",
                "r": "*haben + zu + infinitivo* es activo y significa **tener que** (a veces con tono de orden o de reglamento): *Sie haben die Arbeit bis Juni abzugeben.* Y el *sein + zu* se puede convertir en **adjetivo**: *zu* + participio I declinado (*Gerundiv*): *die Frage, die zu untersuchen ist* → *die **zu untersuchende** Frage*.",
                "ex": [
                    ["Die Teilnehmenden *haben* den Fragebogen vollständig *auszufüllen*.", "Los participantes tienen que completar el cuestionario entero."],
                    ["Du *hast* hier nichts *zu sagen*.", "Vos acá no tenés nada que decir."],
                    ["*Die zu untersuchende Frage* lautet: …", "La pregunta que hay que investigar es: …"],
                    ["Wir besprechen *die noch zu klärenden Punkte* morgen.", "Los puntos que quedan por aclarar los vemos mañana."],
                    ["Das ist ein *nicht zu unterschätzendes* Problem.", "Es un problema que no hay que subestimar."],
                ],
                "warn": "*haben + zu* tiene sujeto (el que tiene que hacer algo); *sein + zu*, no: el sujeto es la cosa. *Die Studierenden haben die Arbeit abzugeben* vs. *Die Arbeit ist abzugeben*.",
                "more": ["El participio con *zu* se declina como cualquier adjetivo: *eine zu lösende Aufgabe, der zu erwartende Gewinn, mit den zu erwartenden Kosten*."],
                "q": [
                    q("*die Aufgabe, die gelöst werden muss* =", "die zu lösende Aufgabe", ["die zu lösende Aufgabe", "die lösende Aufgabe", "die zu gelöste Aufgabe"]),
                    q("*Sie haben das Formular auszufüllen* significa…", "Tienen que completar el formulario.", ["Tienen que completar el formulario.", "Completaron el formulario.", "Pueden completar el formulario si quieren."]),
                ],
            },
            {
                "h": "FVG con stellen, ziehen y bringen",
                "r": "Un **Funktionsverbgefüge** (FVG) es un sustantivo que lleva el significado + un verbo «vacío». Suena más formal que el verbo simple y a veces agrega un matiz (empezar, provocar). Con *stellen*, *ziehen* y *bringen* se forman los más académicos.",
                "table": {"head": ["FVG", "≈ verbo simple", "Castellano"], "rows": [
                    ["zur Diskussion stellen", "diskutieren lassen", "poner en discusión"],
                    ["in Frage stellen (infrage stellen)", "bezweifeln", "poner en duda"],
                    ["unter Beweis stellen", "beweisen, zeigen", "demostrar"],
                    ["in Betracht ziehen", "berücksichtigen", "tomar en consideración"],
                    ["Schlüsse ziehen (aus)", "schließen", "sacar conclusiones"],
                    ["zur Rechenschaft ziehen", "verantwortlich machen", "pedir cuentas"],
                    ["zum Ausdruck bringen", "ausdrücken", "expresar"],
                    ["zur Sprache bringen", "ansprechen", "sacar un tema"],
                    ["in Erfahrung bringen", "herausfinden", "averiguar"],
                ]},
                "ex": [
                    ["Die Autorin *stellt* die gängige Theorie *in Frage*.", "La autora pone en duda la teoría corriente."],
                    ["Man sollte auch andere Ursachen *in Betracht ziehen*.", "Habría que tomar en cuenta también otras causas."],
                    ["Er *brachte* seine Enttäuschung deutlich *zum Ausdruck*.", "Expresó claramente su decepción."],
                ],
                "warn": "El sustantivo del FVG no lleva el artículo que vos quieras: es fijo. *in Betracht ziehen* (sin artículo), *zur Sprache bringen* (con *zur*), *unter Beweis stellen*. Aprendelos como bloque.",
                "q": [
                    q("Completá: *Wir sollten diese Möglichkeit in Betracht ___.*", "ziehen", ["ziehen", "stellen", "nehmen"]),
                    q("Completá: *Sie hat ihre Meinung klar zum Ausdruck ___.*", "gebracht", ["gebracht", "gestellt", "gezogen"]),
                ],
            },
            {
                "h": "FVG con nehmen, treten, üben y leisten",
                "r": "Otro grupo frecuente en informes y discusiones: *Stellung nehmen zu* (opinar formalmente sobre), *Bezug nehmen auf* (hacer referencia a), *Einfluss nehmen auf* (influir en), *zur Kenntnis nehmen* (tomar nota), *in Kraft treten* (entrar en vigor), *in Erscheinung treten* (aparecer), *Kritik üben an* (criticar), *einen Beitrag leisten zu* (contribuir a), *Widerstand leisten* (resistir).",
                "ex": [
                    ["Die Ministerin hat zu den Vorwürfen *Stellung genommen*.", "La ministra se pronunció sobre las acusaciones."],
                    ["Das Gesetz *tritt* am 1. Januar *in Kraft*.", "La ley entra en vigor el 1.º de enero."],
                    ["Die Studie *leistet einen* wichtigen *Beitrag zur* Forschung.", "El estudio hace un aporte importante a la investigación."],
                    ["Ich nehme *Bezug auf* Ihr Schreiben vom 3. Mai.", "Me refiero a su escrito del 3 de mayo."],
                ],
                "warn": "«Tomar posición» no es *Position nehmen*: es *Stellung nehmen **zu*** + Dat. Y «hacer una crítica» en registro formal es *Kritik **üben** an*, no *Kritik machen*.",
                "q": [
                    q("Completá: *Die neue Regel tritt im Mai in ___.*", "Kraft", ["Kraft", "Gang", "Wirkung"]),
                    q("Completá: *Er hat zu dem Thema Stellung ___.*", "genommen", ["genommen", "gegeben", "gemacht"]),
                ],
            },
            {
                "h": "FVG con sentido pasivo: finden, kommen, stehen",
                "r": "Algunos FVG tienen **sentido pasivo** y sirven para evitar el *werden*: *Anwendung finden* = *angewendet werden*, *zum Einsatz kommen* = *eingesetzt werden*, *zur Sprache kommen* = *angesprochen werden*, *zur Diskussion stehen* = *diskutiert werden*. Muchos forman **pares**: activo con *bringen / stellen*, pasivo con *kommen / stehen*.",
                "table": {"head": ["Activo (alguien lo hace)", "Pasivo (le pasa a la cosa)"], "rows": [
                    ["etwas zur Sprache bringen", "zur Sprache kommen"],
                    ["etwas zur Diskussion stellen", "zur Diskussion stehen"],
                    ["etwas zum Abschluss bringen", "zum Abschluss kommen"],
                    ["etwas anwenden", "Anwendung finden"],
                    ["etwas beachten", "Beachtung finden"],
                ]},
                "ex": [
                    ["Diese Methode *findet* in der Medizin breite *Anwendung*.", "Este método se aplica mucho en medicina."],
                    ["In der Sitzung *kam* auch das Budget *zur Sprache*.", "En la reunión también se habló del presupuesto."],
                    ["Zurzeit *steht* ein neues Modell *zur Diskussion*.", "Actualmente se discute un nuevo modelo."],
                ],
                "tip": "Con estos pares podés variar sin repetir *werden*: *Das Thema wurde angesprochen* → *Das Thema kam zur Sprache*.",
                "q": [
                    q("*Das Verfahren wird oft angewendet* =", "Das Verfahren findet oft Anwendung.", ["Das Verfahren findet oft Anwendung.", "Das Verfahren bringt oft Anwendung.", "Das Verfahren stellt oft Anwendung."]),
                    q("Pasivo de *etwas zur Diskussion stellen*:", "zur Diskussion stehen", ["zur Diskussion stehen", "zur Diskussion kommen lassen", "zur Diskussion ziehen"]),
                ],
            },
        ],
    },
    "vocab": [
        ["die Hypothese", "la hipótesis", "Die Hypothese konnte durch die Daten nicht bestätigt werden."],
        ["die Fragestellung", "el planteo, la pregunta de investigación", "Die Fragestellung der Arbeit ist klar formuliert."],
        ["der Forschungsstand", "el estado de la cuestión", "Im zweiten Kapitel wird der aktuelle Forschungsstand dargestellt."],
        ["die Abhandlung", "el tratado, el ensayo académico", "Sie hat eine umfangreiche Abhandlung über Kant geschrieben."],
        ["die Fußnote", "la nota al pie", "Die Quelle steht in der Fußnote."],
        ["das Literaturverzeichnis", "la bibliografía", "Jedes zitierte Werk muss im Literaturverzeichnis stehen."],
        ["die Methodik", "la metodología", "Die Methodik der Studie ist umstritten."],
        ["der Befund", "el hallazgo, el resultado", "Dieser Befund widerspricht früheren Studien."],
        ["die Annahme", "la suposición, el supuesto", "Die Annahme, dass alle Menschen rational handeln, ist problematisch."],
        ["die Herangehensweise", "el enfoque, el abordaje", "Ihre Herangehensweise an das Thema ist originell."],
        ["belegen", "fundamentar, probar (con datos)", "Diese These lässt sich mit Zahlen belegen."],
        ["erörtern", "discutir, analizar a fondo (por escrito)", "In der Hausarbeit soll das Problem erörtert werden."],
        ["schlussfolgern", "concluir, deducir", "Aus den Daten lässt sich schlussfolgern, dass die Methode wirkt."],
        ["in Betracht ziehen", "tomar en consideración", "Wir sollten auch andere Erklärungen in Betracht ziehen."],
        ["zur Diskussion stellen", "poner en discusión, someter a debate", "Der Autor stellt ein neues Modell zur Diskussion."],
    ],
    "items": [
        # parte 0 — escribir sin «yo»
        ch(0, "Elegí la palabra.", "___ wird angenommen, dass der Klimawandel die Migration verstärkt.", "Es", ["Es", "Man", "Das"], "Pasiva impersonal: *es* llena el Vorfeld."),
        ch(0, "Elegí el verbo.", "Im Folgenden ___ die wichtigsten Ergebnisse dargestellt.", "werden", ["werden", "wird", "ist"], "El sujeto es plural (*die Ergebnisse*): *werden*."),
        ch(0, "Elegí el verbo.", "Bei dem Text ___ es sich um eine Glosse.", "handelt", ["handelt", "geht", "zeigt"], "*es handelt sich um* = se trata de."),
        ch(0, "Elegí el verbo.", "Daraus ___ sich, dass weitere Studien nötig sind.", "ergibt", ["ergibt", "handelt", "gilt"], "*es ergibt sich (daraus), dass* = de ahí resulta que."),
        ch(0, "Elegí la forma.", "Es ___ darauf hingewiesen, dass die Stichprobe klein war.", "sei", ["sei", "wäre", "würde"], "Fórmula con Konjunktiv I: *Es sei darauf hingewiesen* = cabe señalar."),
        ch(0, "¿Cuál es el registro académico?", "(A continuación muestro que…)", "Im Folgenden wird gezeigt, dass …", ["Im Folgenden wird gezeigt, dass …", "Im Folgenden zeige ich euch mal, dass …", "Jetzt wird mal gezeigt, dass …"], "Sin «yo», con pasiva y *im Folgenden*; *mal*, *jetzt* y *euch* son de la lengua oral."),
        ch(0, "¿Cuál es correcta?", "(La novela trata de una familia.)", "Der Roman handelt von einer Familie.", ["Der Roman handelt von einer Familie.", "Der Roman handelt sich um eine Familie.", "Der Roman handelt es um eine Familie."], "*handeln von* con sujeto; *sich handeln um* solo con *es*."),
        cz(0, "Escribí el auxiliar en Präteritum.", "In der Studie ___ untersucht, wie Kinder Sprachen lernen.", "wurde", note="Pasiva impersonal en Präteritum: *wurde untersucht*."),
        cz(0, "Escribí el auxiliar.", "Es ___ sich gezeigt, dass die Methode funktioniert.", "hat", note="*sich zeigen* hace el Perfekt con *haben*."),
        cz(0, "Escribí la palabra.", "Bei den Teilnehmern handelte ___ sich um Studierende.", "es", note="*sich handeln um*: el sujeto es siempre *es*."),
        cz(0, "Escribí el participio (erwähnen).", "Wie bereits ___, ist die Datenlage dünn.", "erwähnt", note="*wie bereits erwähnt* = como ya se dijo."),
        cz(0, "Escribí el Konjunktiv I de *beachten*.", "Man ___ den Unterschied zwischen beiden Gruppen.", "beachte", note="*Man beachte* = obsérvese (Konjunktiv I, tercera persona: *-e*)."),
        ty(0, "Pasalo a la pasiva impersonal, empezando con *Es*.", "Man nimmt an, dass die Zahl steigt.", "Es wird angenommen, dass die Zahl steigt.", V("Es wird angenommen, dass die Zahl steigt."), "*man nimmt an* → *es wird angenommen*."),
        ty(0, "Reescribilo sin «wir», empezando con *Im Folgenden*.", "Im Folgenden stellen wir die Methode vor.", "Im Folgenden wird die Methode vorgestellt.", note="Pasiva: *wird … vorgestellt*; no hace falta *es* porque *Im Folgenden* ocupa el Vorfeld."),
        tr(0, "Se trata de un problema complejo.", "Es handelt sich um ein komplexes Problem.", ["Es handelt sich um ein komplexes Problem.", "Es handelt sich um ein vielschichtiges Problem.", "Es geht um ein komplexes Problem."], "*Es handelt sich um* + Akk."),
        tr(0, "Se demostró que la hipótesis es falsa.", "Es wurde nachgewiesen, dass die Hypothese falsch ist.", V("Es wurde nachgewiesen, dass die Hypothese falsch ist.", "Es wurde gezeigt, dass die Hypothese falsch ist.", "Es wurde bewiesen, dass die Hypothese falsch ist.", "Es wurde nachgewiesen, dass die Hypothese nicht stimmt.", "Es wurde gezeigt, dass die Hypothese nicht stimmt."), "Pasiva impersonal en Präteritum con *es*."),
        tr(0, "Cabe señalar que los datos son de 2020.", "Es sei darauf hingewiesen, dass die Daten aus dem Jahr 2020 stammen.", V("Es sei darauf hingewiesen, dass die Daten aus dem Jahr 2020 stammen.", "Es sei darauf hingewiesen, dass die Daten von 2020 sind.", "Es sei darauf hingewiesen, dass die Daten aus dem Jahr 2020 sind.", "Es ist darauf hinzuweisen, dass die Daten aus dem Jahr 2020 stammen.", "Es ist darauf hinzuweisen, dass die Daten von 2020 sind."), "*Es sei darauf hingewiesen, dass …* (o *Es ist darauf hinzuweisen*)."),
        # parte 1 — sein + zu y haben + zu
        ch(1, "Elegí la forma.", "Es ist davon ___, dass die Preise weiter steigen.", "auszugehen", ["auszugehen", "ausgehen", "zu ausgehen"], "Separable: el *zu* va en el medio: *aus-zu-gehen*."),
        ch(1, "Elegí la forma.", "Die Ergebnisse sind mit Vorsicht ___.", "zu interpretieren", ["zu interpretieren", "interpretiert zu", "interpretieren zu"], "*sein + zu + infinitivo* = deben ser interpretados."),
        ch(1, "¿Qué significa?", "Das Problem ist kaum zu lösen.", "El problema casi no se puede resolver.", ["El problema casi no se puede resolver.", "El problema casi no hay que resolverlo.", "El problema casi está resuelto."], "Con *kaum*, *sein + zu* es «poder»."),
        ch(1, "¿Qué significa?", "Die Studierenden haben die Arbeit bis Juni abzugeben.", "Los estudiantes tienen que entregar el trabajo a más tardar en junio.", ["Los estudiantes tienen que entregar el trabajo a más tardar en junio.", "Los estudiantes entregaron el trabajo en junio.", "Los estudiantes pueden entregar el trabajo después de junio."], "*haben + zu* = tener que."),
        ch(1, "Elegí la forma.", "die ___ Frage (la pregunta que hay que investigar)", "zu untersuchende", ["zu untersuchende", "untersuchende", "zu untersuchte"], "Participio I con *zu*: *die zu untersuchende Frage*."),
        ch(1, "Elegí la forma.", "Die ___ Punkte besprechen wir morgen.", "noch zu klärenden", ["noch zu klärenden", "noch zu klärende", "noch zu geklärten"], "Plural con artículo definido: terminación *-en*."),
        cz(1, "Escribí *einreichen* con *zu*.", "Der Antrag ist bis zum 30. Juni ___.", "einzureichen", note="*sein + zu*: *ist einzureichen* = tiene que ser presentado."),
        cz(1, "Escribí *aufhalten* con *zu*.", "Diese Entwicklung ist kaum noch ___.", "aufzuhalten", note="*kaum aufzuhalten* = casi imposible de frenar."),
        cz(1, "Escribí la palabra que falta.", "Das ist ein nicht ___ unterschätzendes Risiko.", "zu", note="*ein nicht zu unterschätzendes Risiko* = un riesgo que no hay que subestimar."),
        cz(1, "Escribí *beachten* con *zu*.", "Alle Mieter haben die Hausordnung ___.", "zu beachten", note="*haben + zu* = tener que."),
        ty(1, "Reescribí con *sein + zu*.", "Man muss die Daten sorgfältig prüfen.", "Die Daten sind sorgfältig zu prüfen.", note="La cosa pasa a sujeto; *müssen + pasiva* = *sein + zu*."),
        ty(1, "Reescribí con *sein + zu*.", "Man kann den Fehler leicht vermeiden.", "Der Fehler ist leicht zu vermeiden.", note="Con *leicht*, *sein + zu* = «se puede»."),
        ty(1, "Reescribí con un participio con *zu*.", "die Aufgabe, die gelöst werden muss", "die zu lösende Aufgabe", note="*zu* + participio I declinado (*lösend-e*)."),
        tr(1, "Hay que partir de que el número va a aumentar.", "Es ist davon auszugehen, dass die Zahl steigen wird.", V("Es ist davon auszugehen, dass die Zahl steigen wird.", "Es ist davon auszugehen, dass die Zahl steigt.", "Es ist davon auszugehen, dass die Zahl zunehmen wird.", "Es ist davon auszugehen, dass die Zahl zunimmt."), "*Es ist davon auszugehen, dass …*"),
        tr(1, "Los participantes tienen que completar el formulario. (haben + zu)", "Die Teilnehmer haben das Formular auszufüllen.", ["Die Teilnehmer haben das Formular auszufüllen.", "Die Teilnehmenden haben das Formular auszufüllen."], "*haben + zu*: activo, con sujeto."),
        # parte 2 — Funktionsverbgefüge
        ch(2, "Elegí el verbo.", "Die Forscher ___ die Ergebnisse zur Diskussion.", "stellen", ["stellen", "setzen", "ziehen"], "*zur Diskussion stellen* = poner en discusión."),
        ch(2, "Elegí el verbo.", "Wir sollten auch andere Erklärungen in Betracht ___.", "ziehen", ["ziehen", "stellen", "nehmen"], "*in Betracht ziehen* = tomar en consideración."),
        ch(2, "Elegí el verbo.", "Die Ministerin hat zu den Vorwürfen Stellung ___.", "genommen", ["genommen", "gestellt", "gebracht"], "*Stellung nehmen zu* = pronunciarse sobre."),
        ch(2, "Elegí el verbo.", "Das neue Gesetz ___ am 1. Januar in Kraft.", "tritt", ["tritt", "kommt", "steht"], "*in Kraft treten* = entrar en vigor."),
        ch(2, "Elegí el verbo.", "Dieses Verfahren ___ in der Medizin breite Anwendung.", "findet", ["findet", "nimmt", "bringt"], "*Anwendung finden* = ser aplicado (sentido pasivo)."),
        ch(2, "Elegí el verbo.", "Sie hat ihre Kritik deutlich zum Ausdruck ___.", "gebracht", ["gebracht", "gestellt", "genommen"], "*zum Ausdruck bringen* = expresar."),
        ch(2, "¿Qué significa?", "In der Sitzung kam auch das Budget zur Sprache.", "En la reunión también se habló del presupuesto.", ["En la reunión también se habló del presupuesto.", "El presupuesto llegó tarde a la reunión.", "Alguien presentó el presupuesto por escrito."], "*zur Sprache kommen* = ser mencionado (pasivo de *zur Sprache bringen*)."),
        cz(2, "Escribí el verbo (infinitivo).", "Er musste seine Fähigkeiten erst unter Beweis ___.", "stellen", note="*unter Beweis stellen* = demostrar."),
        cz(2, "Escribí el verbo.", "Viele Freiwillige ___ einen wichtigen Beitrag zur Integration.", "leisten", note="*einen Beitrag leisten zu* = contribuir a."),
        cz(2, "Escribí el participio (*zu dem Ergebnis kommen* = llegar a la conclusión).", "Die Kommission ist zu dem Ergebnis ___, dass das Projekt zu teuer ist.", "gekommen", note="*zu dem Ergebnis kommen* = llegar a la conclusión."),
        cz(2, "Escribí el sustantivo.", "Bitte nehmen Sie die neuen Regeln zur ___.", "Kenntnis", note="*zur Kenntnis nehmen* = tomar nota. " + MAY),
        ty(2, "Reescribí con *in Frage stellen*.", "Viele bezweifeln die Methode.", "Viele stellen die Methode in Frage.", ["Viele stellen die Methode in Frage.", "Viele stellen die Methode infrage."], "*in Frage stellen* (también *infrage*) = poner en duda."),
        ty(2, "Reescribí con *Anwendung finden*.", "Die Methode wird häufig angewendet.", "Die Methode findet häufig Anwendung.", note="*Anwendung finden* reemplaza la pasiva."),
        tr(2, "Tenemos que tomar en cuenta todos los riesgos.", "Wir müssen alle Risiken in Betracht ziehen.", ["Wir müssen alle Risiken in Betracht ziehen.", "Wir müssen alle Risiken berücksichtigen.", "Alle Risiken müssen in Betracht gezogen werden."], "*in Betracht ziehen*: el sustantivo va sin artículo."),
        tr(2, "La propuesta está en discusión.", "Der Vorschlag steht zur Diskussion.", ["Der Vorschlag steht zur Diskussion.", "Der Vorschlag wird diskutiert."], "*zur Diskussion stehen*: el pasivo de *zur Diskussion stellen*."),
        li(2, "die Abhandlung", ["die Abhandlung", "die Behandlung", "die Verhandlung"], "*die Abhandlung* = el ensayo académico; *die Behandlung* = el tratamiento; *die Verhandlung* = la negociación."),
    ],
}
