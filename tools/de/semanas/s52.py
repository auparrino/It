# -*- coding: utf-8 -*-
"""Semana 52 — Die Prüfung (C1): repaso final integrador estilo Goethe C1 (casos, Konjunktiv, pasiva, conectores, estilo nominal, registro)."""
from base import q, ch, li, cz, tr, ty, fx, di, MAY  # noqa: F401


def V(*xs):
    """Las respuestas, cada una también sin comas (la app no perdona una coma de menos)."""
    out = []
    for x in xs:
        for y in (x, x.replace(",", "")):
            if y not in out:
                out.append(y)
    return out


WEEK = {
    "week": 52,
    "title": "Die Prüfung",
    "level": "C1",
    "focus": "El repaso final: todo lo que un examen C1 mide en una semana (casos y declinación, Konjunktiv I y II, pasiva y sus alternativas, conectores, estilo nominal y registro) y las fórmulas para escribir y hablar en el examen.",
    "fare": "Llegar al examen tipo Goethe C1 sabiendo qué revisar, con las estructuras clave a mano y con Redemittel listos para el texto argumentativo, el mail formal, la presentación y la discusión.",
    "tema": "Repaso integrador: preposiciones y casos, declinación del adjetivo, n-Deklination, discurso indirecto, irreales, pasiva y alternativas, conectores y orden, nominalización, participios, registro formal, Redemittel para Schreiben y Sprechen",
    "keys": [
        "Casos: *trotz / wegen / infolge* + Gen.; adjetivo tras *ein-* sin terminación: fuerte (*ein neuer Kollege*); n-Deklination: *des Kollegen*.",
        "Konjunktiv I para citar (*er habe, sie sei*); si coincide con el indicativo, Konjunktiv II (*sie hätten*).",
        "Irreal pasado: *Wenn ich es gewusst hätte, wäre ich gekommen*; *Du hättest anrufen sollen*.",
        "Pasiva: *wird gemacht, muss gemacht werden, ist gemacht worden*; alternativas: *lässt sich machen, ist zu machen, machbar*.",
        "Verbo según el conector: *obwohl* (final), *trotzdem* (segundo), *aber* (no cuenta).",
        "Estilo nominal: *Nachdem er angekommen war* → *Nach seiner Ankunft*.",
        "Registro: *Sehr geehrte Damen und Herren … Mit freundlichen Grüßen*; discrepar: *Das sehe ich etwas anders*.",
    ],
    "lesson": {
        "intro": "Llegaste a la última semana. No hay temas nuevos: hay un repaso con mirada de examen. Un examen C1 (como el Goethe-Zertifikat C1) no te pregunta reglas sueltas; mide si usás con seguridad las estructuras de todo el camino en textos largos y en una conversación exigente. Repasamos las formas, la oración compleja y, al final, cómo escribir y hablar en el examen.",
        "parts": [
            {"h": "Las formas: casos, Konjunktiv y pasiva", "blocks": [0, 1, 2]},
            {"h": "La oración compleja", "blocks": [3, 4]},
            {"h": "El examen: escribir y hablar", "blocks": [5, 6, 7]},
        ],
        "blocks": [
            {
                "h": "Casos y declinación: el chequeo final",
                "r": "Los errores de caso son los que más puntos cuestan en *Schreiben*. Revisá tres cosas: la **preposición** y su caso, la **terminación del adjetivo** y los sustantivos de la **n-Deklination** (*der Kollege, der Mensch, der Name*), que agregan *-n / -en* en todos los casos menos el nominativo singular.",
                "table": {"head": ["Caso", "Preposiciones", "Ejemplo"], "rows": [
                    ["Akkusativ", "durch, für, gegen, ohne, um, bis", "ohne einen guten Grund"],
                    ["Dativ", "aus, bei, mit, nach, seit, von, zu, gegenüber", "seit dem letzten Jahr"],
                    ["Genitiv", "wegen, trotz, während, aufgrund, infolge, angesichts, innerhalb", "trotz des schlechten Wetters"],
                    ["Akk. (¿adónde?) / Dat. (¿dónde?)", "in, an, auf, über, unter, vor, hinter, neben, zwischen", "Ich lege es auf den Tisch. / Es liegt auf dem Tisch."],
                ]},
                "ex": [
                    ["*Trotz des* schlechten Wetters fand das Konzert statt.", "A pesar del mal tiempo, el concierto se hizo."],
                    ["Wir haben mit *einem neuen* Kollegen gesprochen.", "Hablamos con un colega nuevo."],
                    ["Kennst du den Namen *des neuen Kollegen*?", "¿Sabés el nombre del colega nuevo?"],
                ],
                "warn": "La n-Deklination no lleva *-s* en el genitivo: *des Kollegen*, no *des Kollegens*. Excepción conocida: *der Name → des Namens* (también *der Gedanke, der Glaube*).",
                "tip": "En el examen, guardá los últimos cinco minutos de *Schreiben* para una sola pasada: buscá cada preposición y cada adjetivo y preguntate qué caso es.",
                "q": [
                    q("Completá: *Wegen ___ Streiks fielen alle Züge aus.*", "des", ["des", "dem", "den"]),
                    q("Completá: *Ich habe gestern mit ___ Nachbarn gesprochen.* (der Nachbar)", "dem", ["dem", "den", "der"]),
                ],
            },
            {
                "h": "Konjunktiv I y II: citar e imaginar",
                "r": "**Konjunktiv I** para el discurso indirecto (prensa, resúmenes): *er sei, er habe, sie komme*. Si el Konjunktiv I es igual al indicativo (sobre todo en plural), se reemplaza por el **Konjunktiv II**: *sie haben* → *sie hätten*. **Konjunktiv II** para lo irreal: presente (*wäre, hätte, würde* + inf.), pasado (*hätte / wäre* + participio) y con modales (*hätte machen sollen*).",
                "table": {"head": ["Para…", "Forma", "Ejemplo"], "rows": [
                    ["citar", "Konjunktiv I", "Der Minister sagte, er habe nichts gewusst."],
                    ["citar (plural)", "Konjunktiv II de reemplazo", "Sie sagten, sie hätten keine Zeit."],
                    ["irreal presente", "wäre / hätte / würde + inf.", "Wenn ich Zeit hätte, würde ich mitkommen."],
                    ["irreal pasado", "hätte / wäre + participio", "Wenn ich es gewusst hätte, wäre ich gekommen."],
                    ["reproche", "hätte + inf. + modal", "Du hättest mich anrufen sollen."],
                    ["comparación irreal", "als ob / als + Konj. II", "Er tut so, als wäre er der Chef."],
                    ["suponer (pasado)", "muss / dürfte / kann nicht + part. + haben/sein", "Er dürfte es vergessen haben."],
                    ["rumor, versión ajena", "soll / will + infinitivo", "Der Minister soll gelogen haben."],
                ]},
                "ex": [
                    ["Die Sprecherin betonte, man *habe* alles getan.", "La vocera subrayó que se había hecho todo."],
                    ["*Hätte* ich das früher *gewusst*, *wäre* ich nicht *gefahren*.", "Si lo hubiera sabido antes, no habría viajado."],
                ],
                "warn": "*hätte … sollen*: con dos infinitivos, el auxiliar va **antes** en la subordinada: *…, dass du mich **hättest** anrufen sollen*. Y no mezcles los dos irreales: *Wenn ich Zeit gehabt hätte* (pasado) no es *Wenn ich Zeit hätte* (presente).",
                "q": [
                    q("Completá: *Die Politiker sagten, sie ___ keine Lösung gefunden.*", "hätten", ["hätten", "haben", "habe"]),
                    q("Completá: *Du ___ mich anrufen sollen!*", "hättest", ["hättest", "würdest", "wärst"]),
                ],
            },
            {
                "h": "La pasiva y sus alternativas",
                "r": "La pasiva es el corazón del registro escrito. Repasá las formas y tené a mano las **alternativas** para no repetir *werden*: *sich lassen*, *sein + zu*, adjetivos en *-bar* y los FVG con sentido pasivo.",
                "table": {"head": ["Forma", "Ejemplo"], "rows": [
                    ["presente", "Die Brücke wird seit drei Jahren gebaut."],
                    ["Präteritum", "Das Gesetz wurde 2023 verabschiedet."],
                    ["Perfekt", "Das Museum ist 1902 eröffnet worden."],
                    ["con modal", "Das Problem muss sofort gelöst werden."],
                    ["Zustandspassiv", "Die Tür ist geschlossen."],
                    ["sich lassen", "Die Aufgabe lässt sich leicht lösen."],
                    ["sein + zu", "Die Kosten sind kaum zu berechnen."],
                    ["-bar", "Das Problem ist lösbar."],
                ]},
                "ex": [
                    ["Die Ergebnisse *sind* noch nicht *veröffentlicht worden*.", "Los resultados todavía no fueron publicados."],
                    ["Diese Frage *lässt sich* nicht eindeutig *beantworten*.", "Esta pregunta no se puede responder de forma unívoca."],
                ],
                "warn": "En el Perfekt de la pasiva el participio de *werden* es *worden*, sin *ge-*: *ist gebaut **worden***. *ist gebaut geworden* es un error clásico.",
                "q": [
                    q("Completá: *Das Rathaus ist 1890 gebaut ___.*", "worden", ["worden", "geworden", "gewesen"]),
                    q("*Das kann man nicht reparieren* =", "Das ist nicht zu reparieren.", ["Das ist nicht zu reparieren.", "Das hat nicht zu reparieren.", "Das wird nicht reparieren."]),
                ],
            },
            {
                "h": "Conectores y posición del verbo",
                "r": "Cada conector decide dónde va el verbo. Es lo que más se nota en un texto C1: la variedad de conectores **y** el orden correcto.",
                "table": {"head": ["Verbo…", "Conectores", "Ejemplo"], "rows": [
                    ["no cambia (posición 0)", "und, aber, oder, denn, sondern", "…, aber das Wetter war schlecht."],
                    ["segundo (el conector es la posición 1)", "deshalb, trotzdem, dennoch, folglich, außerdem, allerdings", "…; trotzdem gingen wir spazieren."],
                    ["al final (subordinada)", "weil, obwohl, sodass, während, nachdem, falls, sofern", "…, obwohl es regnete."],
                    ["doble", "je … desto, sowohl … als auch, weder … noch, zwar … aber", "Je mehr man übt, desto sicherer wird man."],
                ]},
                "ex": [
                    ["*Obwohl* es *regnete*, gingen wir spazieren.", "Aunque llovía, salimos a caminar."],
                    ["Es regnete. *Trotzdem gingen* wir spazieren.", "Llovía. Igual salimos a caminar."],
                    ["Sie spricht *sowohl* Englisch *als auch* Französisch.", "Habla tanto inglés como francés."],
                ],
                "warn": "*obwohl* y *trotzdem* dicen lo mismo, pero no van en el mismo lugar: *obwohl* abre una subordinada (verbo al final); *trotzdem* ocupa la posición 1 de una principal (verbo segundo).",
                "q": [
                    q("Completá: *___ es regnete, gingen wir spazieren.*", "Obwohl", ["Obwohl", "Trotzdem", "Deshalb"]),
                    q("Completá: *Er war müde. ___ arbeitete er weiter.*", "Trotzdem", ["Trotzdem", "Obwohl", "Weil"]),
                ],
            },
            {
                "h": "Estilo nominal y participios",
                "r": "El registro escrito alto condensa: una subordinada se vuelve **preposición + sustantivo** (semana 38) y una relativa, un **atributo de participio** (semana 36). En la comprensión lectora tenés que desarmarlos; en *Schreiben*, usar algunos te sube el nivel.",
                "table": {"head": ["Estilo verbal", "Estilo nominal"], "rows": [
                    ["Weil die Preise steigen, …", "Wegen der steigenden Preise …"],
                    ["Nachdem er angekommen war, …", "Nach seiner Ankunft …"],
                    ["Während wir gegessen haben, …", "Während des Essens …"],
                    ["Wenn man das Gerät benutzt, …", "Bei der Benutzung des Geräts …"],
                    ["das Auto, das vor zwei Jahren gekauft wurde", "das vor zwei Jahren gekaufte Auto"],
                    ["der Laden, der seit Jahren leer steht", "der seit Jahren leer stehende Laden"],
                    ["die Fragen, die noch geklärt werden müssen", "die noch zu klärenden Fragen"],
                ]},
                "ex": [
                    ["*Nach* Abschluss *des Studiums* zog sie nach Hamburg.", "Después de terminar la carrera se mudó a Hamburgo."],
                    ["Die *von der Firma hergestellten* Produkte sind teuer.", "Los productos fabricados por la empresa son caros."],
                ],
                "warn": "No nominalices todo: un texto solo de sustantivos se vuelve ilegible. En C1 se espera **variedad**: algunas nominalizaciones, algunos participios y subordinadas bien armadas.",
                "q": [
                    q("*Nachdem er angekommen war* =", "Nach seiner Ankunft", ["Nach seiner Ankunft", "Seit seiner Ankunft", "Bis zu seiner Ankunft"]),
                    q("*die im Text genannten Gründe* =", "los motivos mencionados en el texto", ["los motivos mencionados en el texto", "los motivos que van a mencionarse", "los motivos que mencionan el texto"]),
                ],
            },
            {
                "h": "Cómo es el examen",
                "r": "Un examen C1 como el Goethe-Zertifikat tiene **cuatro módulos**: **Lesen** (textos largos y exigentes: información, opiniones, detalles), **Hören** (entrevistas, conferencias, conversaciones), **Schreiben** (en general un texto argumentativo, por ejemplo un aporte a un foro, y un texto formal, como un mail o una carta) y **Sprechen** (una breve exposición y una discusión con otra persona). Los formatos cambian cada tanto: mirá siempre el modelo oficial actualizado.",
                "table": {"head": ["Módulo", "Qué te piden", "Qué repasar"], "rows": [
                    ["Lesen", "entender tesis, matices y detalles", "conectores, remisiones (semana 50), estilo nominal"],
                    ["Hören", "seguir argumentos y opiniones", "partículas, discurso indirecto, variedades (semana 51)"],
                    ["Schreiben", "argumentar y escribir formal", "Redemittel, registro (semana 45), orden de la oración"],
                    ["Sprechen", "exponer, discutir, reaccionar", "Redemittel de discusión, partículas (semana 46), modismos (semana 44)"],
                ]},
                "ex": [
                    ["Lesen Sie zuerst die *Aufgabenstellung* genau.", "Leé primero la consigna con atención."],
                    ["Achten Sie auf die *Bearbeitungszeit*.", "Prestá atención al tiempo disponible."],
                ],
                "tip": "En *Schreiben*, la consigna suele traer varios puntos que tenés que tratar todos. Tachá cada punto cuando lo hayas desarrollado: un punto olvidado resta más que un error de caso.",
                "q": [
                    q("¿Cuántos módulos tiene un examen C1 como el Goethe?", "cuatro", ["cuatro", "dos", "seis"]),
                    q("¿Qué suele pedir *Schreiben*?", "un texto argumentativo y un texto formal", ["un texto argumentativo y un texto formal", "un mail informal a un amigo", "una descripción de fotos"]),
                ],
            },
            {
                "h": "Redemittel para escribir",
                "r": "Un texto argumentativo C1 tiene una **introducción** que presenta el tema, **argumentos** a favor y en contra, tu **posición** y una **conclusión**. El mail formal, además, abre y cierra con fórmulas fijas.",
                "table": {"head": ["Para…", "Redemittel"], "rows": [
                    ["introducir", "In letzter Zeit wird zunehmend darüber diskutiert, ob …"],
                    ["presentar una postura", "Befürworter argumentieren, dass … / Kritiker wenden ein, dass …"],
                    ["contraargumentar", "Dem ist entgegenzuhalten, dass … / Dagegen spricht, dass …"],
                    ["opinar", "Meines Erachtens … / Ich bin der Meinung, dass …"],
                    ["concluir", "Abschließend möchte ich festhalten, dass … / Alles in allem …"],
                    ["mail formal", "Sehr geehrte Damen und Herren, … Ich wende mich an Sie, weil … Mit freundlichen Grüßen"],
                ]},
                "ex": [
                    ["*Meines Erachtens* überwiegen die Vorteile.", "A mi entender, predominan las ventajas."],
                    ["*Dem ist entgegenzuhalten, dass* nicht alle Zugang zum Internet haben.", "A eso hay que objetar que no todos tienen acceso a internet."],
                    ["*Über eine baldige Antwort würde ich mich freuen.*", "Quedo a la espera de una pronta respuesta."],
                ],
                "warn": "*Meines Erachtens* ya significa «en mi opinión»: no le sumes *nach* (*meines Erachtens nach* es un error frecuente). Lo que va con *nach* es *meiner Meinung nach*.",
                "q": [
                    q("Completá: *Meines ___ ist das keine gute Lösung.*", "Erachtens", ["Erachtens", "Erachtens nach", "Meinung"]),
                    q("¿Cómo cerrás un mail formal?", "Mit freundlichen Grüßen", ["Mit freundlichen Grüßen", "Liebe Grüße", "Bis bald"]),
                ],
            },
            {
                "h": "Redemittel para hablar",
                "r": "En la discusión oral se evalúa cómo **interactuás**: si reaccionás a lo que dice el otro, si discrepás con cortesía, si pedís aclaraciones y si ganás tiempo sin quedarte callado. Unas pocas fórmulas bien dichas valen más que muchas a medias.",
                "table": {"head": ["Para…", "Redemittel"], "rows": [
                    ["empezar una exposición", "Ich möchte heute über … sprechen. Zunächst …, danach …"],
                    ["acordar en parte", "Da haben Sie grundsätzlich recht, allerdings …"],
                    ["discrepar con cortesía", "Das sehe ich etwas anders. / Da muss ich Ihnen widersprechen."],
                    ["intervenir", "Darf ich da kurz einhaken?"],
                    ["pedir aclaración", "Wie meinen Sie das genau? / Könnten Sie das näher erläutern?"],
                    ["ganar tiempo", "Lassen Sie mich kurz überlegen. / Das ist eine gute Frage."],
                    ["volver al tema", "Um noch einmal auf … zurückzukommen: …"],
                ]},
                "ex": [
                    ["*Das sehe ich etwas anders*: Gerade auf dem Land ist das Auto unverzichtbar.", "Yo lo veo algo distinto: justamente en el campo el auto es imprescindible."],
                    ["*Könnten Sie die Frage bitte wiederholen?*", "¿Podría repetir la pregunta, por favor?"],
                ],
                "warn": "*Das ist falsch* o *Sie haben keine Ahnung* suenan agresivos en una discusión de examen. Suavizá con *etwas, eigentlich, doch* (semana 46): *Das sehe ich eigentlich etwas anders.*",
                "tip": "*Ich drücke dir die Daumen!* (semana 44): eso te decimos nosotros. *Viel Erfolg bei der Prüfung!*",
                "q": [
                    q("¿Cómo discrepás con cortesía?", "Das sehe ich etwas anders.", ["Das sehe ich etwas anders.", "Das ist Quatsch.", "Sie haben keine Ahnung."]),
                    q("Necesitás unos segundos para pensar:", "Lassen Sie mich kurz überlegen.", ["Lassen Sie mich kurz überlegen.", "Lassen Sie mir kurz überlegen.", "Lassen Sie mich kurz zu überlegen."]),
                ],
            },
        ],
    },
    "vocab": [
        ["die Aufgabenstellung", "la consigna", "Lesen Sie die Aufgabenstellung zweimal, bevor Sie anfangen."],
        ["die Bearbeitungszeit", "el tiempo para resolver (una prueba)", "Die Bearbeitungszeit für diesen Teil beträgt 60 Minuten."],
        ["der Prüfungsteil", "la parte del examen, el módulo", "Der mündliche Prüfungsteil findet am Nachmittag statt."],
        ["das Leseverstehen", "la comprensión lectora", "Beim Leseverstehen kommt es auf die Details an."],
        ["das Hörverstehen", "la comprensión auditiva", "Im Hörverstehen hört man manche Texte nur einmal."],
        ["die Musterprüfung", "el examen modelo", "Machen Sie vor dem Termin mindestens eine Musterprüfung."],
        ["die Gliederung", "la estructura, el esquema", "Eine klare Gliederung macht den Text leichter lesbar."],
        ["die Kernaussage", "la idea central", "Fassen Sie die Kernaussage des Vortrags in zwei Sätzen zusammen."],
        ["die Punktzahl", "el puntaje", "Für das Bestehen braucht man eine Mindestpunktzahl."],
        ["das Zertifikat", "el certificado", "Mit dem C1-Zertifikat kann man sich an vielen Universitäten bewerben."],
        ["das Lampenfieber", "los nervios antes de presentarse (miedo escénico)", "Vor der mündlichen Prüfung hatte sie großes Lampenfieber."],
        ["das Antwortblatt", "la hoja de respuestas", "Übertragen Sie Ihre Lösungen rechtzeitig auf das Antwortblatt."],
        ["der Kurzvortrag", "la exposición breve", "Im ersten Teil der mündlichen Prüfung halten Sie einen Kurzvortrag."],
        ["die Ausdrucksweise", "la forma de expresarse", "Achten Sie in einem formellen Brief auf Ihre Ausdrucksweise."],
        ["souverän", "con soltura, con seguridad", "Er hat die Diskussion souverän geleitet."],
    ],
    "items": [
        # parte 0 — formas
        ch(0, "Elegí la forma.", "Trotz ___ fand das Konzert statt.", "des schlechten Wetters", ["des schlechten Wetters", "des schlechte Wetter", "dem schlechtem Wetter"], "*trotz* + genitivo; adjetivo débil tras *des*: *-en*."),
        ch(0, "Elegí la forma.", "Wir haben mit einem ___ Kollegen gesprochen.", "neuen", ["neuen", "neue", "neuem"], "Dativo tras *einem*: adjetivo en *-en*."),
        ch(0, "Elegí la forma.", "Kennst du den Namen ___?", "des neuen Kollegen", ["des neuen Kollegen", "des neuen Kollegens", "der neue Kollege"], "n-Deklination: *des Kollegen*, sin *-s*."),
        ch(0, "Elegí la forma.", "Der Minister sagte, er ___ nichts von dem Skandal gewusst.", "habe", ["habe", "hat gehabt", "hätte gewesen"], "Discurso indirecto: Konjunktiv I (*er habe*)."),
        ch(0, "Elegí la forma.", "Die Journalisten berichteten, die Politiker ___ keine Lösung gefunden.", "hätten", ["hätten", "haben", "habe"], "*sie haben* (Konj. I) = indicativo → se reemplaza por *hätten*."),
        ch(0, "Elegí la forma.", "Wenn ich früher davon gewusst ___, hätte ich dir geholfen.", "hätte", ["hätte", "wäre", "würde"], "Irreal pasado: *gewusst hätte*."),
        ch(0, "Elegí la forma.", "Du ___ mich anrufen sollen!", "hättest", ["hättest", "würdest", "wärst"], "Reproche: *hätte* + infinitivo + *sollen*."),
        ch(0, "Elegí la forma.", "Er tut so, als ___ er der Chef.", "wäre", ["wäre", "ist gewesen", "würde"], "*als* + Konjunktiv II con el verbo justo detrás."),
        ch(0, "Elegí la forma.", "Die Brücke ___ seit drei Jahren gebaut.", "wird", ["wird", "hat", "ist geworden"], "*seit* + presente: pasiva en presente, *wird gebaut*."),
        ch(0, "Elegí la forma.", "Das Problem muss sofort ___.", "gelöst werden", ["gelöst werden", "gelöst worden", "lösen werden"], "Pasiva con modal: participio + *werden*."),
        cz(0, "Escribí la palabra que falta.", "Das Museum ist 1902 eröffnet ___.", "worden", note="Perfekt de la pasiva: *ist … worden* (sin *ge-*)."),
        cz(0, "Escribí la palabra que falta.", "Diese Aufgabe lässt ___ leicht lösen.", "sich", note="*sich lassen* + infinitivo = se puede."),
        cz(0, "Escribí la palabra que falta.", "Die Kosten sind kaum ___ berechnen.", "zu", note="*sein + zu* = se pueden (con *kaum*: casi no se pueden)."),
        cz(0, "Escribí el artículo.", "Wegen ___ Streiks fielen alle Züge aus.", "des", note="*wegen* + genitivo: *des Streiks*."),
        ty(0, "Pasalo a estilo indirecto con Konjunktiv I, sin *dass*.", "Sie sagt: «Ich komme morgen.»", "Sie sagt, sie komme morgen.", V("Sie sagt, sie komme morgen."), "*ich komme* → *sie komme* (Konjunktiv I)."),
        tr(0, "Si hubiera tenido tiempo, habría venido.", "Wenn ich Zeit gehabt hätte, wäre ich gekommen.", V("Wenn ich Zeit gehabt hätte, wäre ich gekommen.", "Hätte ich Zeit gehabt, wäre ich gekommen.", "Ich wäre gekommen, wenn ich Zeit gehabt hätte."), "Irreal pasado: *gehabt hätte … wäre gekommen*."),
        tr(0, "La ley fue aprobada el año pasado.", "Das Gesetz wurde letztes Jahr verabschiedet.", ["Das Gesetz wurde letztes Jahr verabschiedet.", "Das Gesetz wurde im letzten Jahr verabschiedet.", "Das Gesetz wurde vergangenes Jahr verabschiedet.", "Das Gesetz wurde im vergangenen Jahr verabschiedet.", "Das Gesetz ist letztes Jahr verabschiedet worden.", "Das Gesetz ist im letzten Jahr verabschiedet worden.", "Letztes Jahr wurde das Gesetz verabschiedet."], "Pasiva en Präteritum: *wurde verabschiedet* (aprobar una ley = *verabschieden*)."),
        # parte 1 — la oración compleja
        ch(1, "Elegí el conector.", "___ es regnete, gingen wir spazieren.", "Obwohl", ["Obwohl", "Trotzdem", "Deshalb"], "Verbo al final (*regnete*): subordinada con *obwohl*."),
        ch(1, "Elegí el conector.", "Es regnete. ___ gingen wir spazieren.", "Trotzdem", ["Trotzdem", "Obwohl", "Weil"], "Verbo segundo: *trotzdem* ocupa la posición 1."),
        ch(1, "Elegí la palabra.", "Je mehr man übt, ___ sicherer wird man.", "desto", ["desto", "als", "wie"], "*je … desto* (o *umso*)."),
        ch(1, "Elegí el par.", "Sie spricht ___ Englisch ___ Französisch.", "sowohl … als auch", ["sowohl … als auch", "weder … oder", "entweder … noch"], "*sowohl … als auch* = tanto … como."),
        ch(1, "Elegí el conector.", "Er hat sich beworben, ___ er kaum Chancen hatte.", "obwohl", ["obwohl", "trotzdem", "deshalb"], "Verbo al final (*hatte*): *obwohl*."),
        ch(1, "Elegí el equivalente nominal.", "Nachdem er angekommen war, rief er seine Mutter an.", "Nach seiner Ankunft", ["Nach seiner Ankunft", "Seit seiner Ankunft", "Bis zu seiner Ankunft"], "*nachdem* + verbo → *nach* + sustantivo."),
        ch(1, "¿Qué significa?", "das vor zwei Jahren gekaufte Auto", "el auto que se compró hace dos años", ["el auto que se compró hace dos años", "el auto que se va a comprar en dos años", "el auto que compra desde hace dos años"], "Participio II = pasivo y anterior: *gekauft*."),
        ch(1, "Elegí el artículo.", "Infolge ___ Unfalls war die Autobahn gesperrt.", "eines", ["eines", "einem", "einen"], "*infolge* + genitivo."),
        cz(1, "Escribí un conector (por eso).", "Sie ist krank. ___ kann sie nicht kommen.", "Deshalb", ["Deshalb", "Deswegen", "Daher", "Darum"], "Posición 1, verbo segundo."),
        cz(1, "Escribí un conector (mientras que, contraste).", "Er arbeitet sehr viel, ___ seine Frau eher entspannt ist.", "während", ["während", "wohingegen"], "*während* (contraste) = mientras que; verbo al final."),
        cz(1, "Escribí un conector (para que).", "Wir nehmen ein Taxi, ___ wir pünktlich ankommen.", "damit", ["damit"], "*damit* = para que (finalidad, con verbo conjugado al final). Con el mismo sujeto también se puede *um pünktlich anzukommen*; *sodass* = así que (consecuencia), no finalidad."),
        cz(1, "Escribí el participio declinado de *herstellen*.", "Die von der Firma ___ Produkte sind teuer.", "hergestellten", note="Atributo de participio: *die … hergestellten Produkte* (plural con artículo: *-en*)."),
        ty(1, "Nominalizá con *wegen*.", "Weil die Preise steigen, … → Wegen …", "Wegen der steigenden Preise", ["Wegen der steigenden Preise", "Wegen des Preisanstiegs", "Wegen des Anstiegs der Preise"], "*weil* + verbo → *wegen* + genitivo."),
        ty(1, "Desarmá el participio con una relativa.", "der seit Jahren leer stehende Laden", "der Laden, der seit Jahren leer steht", V("der Laden, der seit Jahren leer steht", "der Laden, der seit Jahren leersteht"), "Participio I (*stehend*) = acción simultánea, activa → relativa en presente."),
        tr(1, "Aunque estaba cansado, siguió trabajando.", "Obwohl er müde war, arbeitete er weiter.", V("Obwohl er müde war, arbeitete er weiter.", "Obwohl er müde war, hat er weitergearbeitet.", "Er arbeitete weiter, obwohl er müde war.", "Er hat weitergearbeitet, obwohl er müde war.", "Er war müde, trotzdem arbeitete er weiter.", "Er war müde. Trotzdem arbeitete er weiter.", "Er war müde, hat aber trotzdem weitergearbeitet."), "*obwohl* (verbo al final) o *trotzdem* (verbo segundo)."),
        tr(1, "Cuanto más leo, más entiendo.", "Je mehr ich lese, desto mehr verstehe ich.", V("Je mehr ich lese, desto mehr verstehe ich.", "Je mehr ich lese, umso mehr verstehe ich."), "*je* + verbo al final, *desto / umso* + verbo segundo."),
        # parte 2 — el examen
        ch(2, "¿Cómo empezás un mail formal a una institución?", "(Estimados señores:)", "Sehr geehrte Damen und Herren,", ["Sehr geehrte Damen und Herren,", "Hallo zusammen,", "Liebe Leute,"], "Fórmula formal estándar cuando no sabés el nombre."),
        ch(2, "¿Cómo cerrás ese mail?", "(Saludos cordiales)", "Mit freundlichen Grüßen", ["Mit freundlichen Grüßen", "Liebe Grüße", "Mit freundliche Grüße"], "Cierre formal estándar, sin coma después."),
        ch(2, "Para contraargumentar en un texto de opinión:", "(A eso hay que objetar que…)", "Dem ist entgegenzuhalten, dass …", ["Dem ist entgegenzuhalten, dass …", "Dem ist zu entgegenhalten, dass …", "Dem muss man entgegenzuhalten, dass …"], "*sein + zu* en una fórmula de registro alto."),
        ch(2, "Discrepás con cortesía en la discusión:", "(Yo lo veo algo distinto.)", "Das sehe ich etwas anders.", ["Das sehe ich etwas anders.", "Das ist Quatsch.", "Sie haben keine Ahnung."], "*etwas* suaviza el desacuerdo."),
        ch(2, "Necesitás unos segundos para pensar:", "(Déjeme pensar un momento.)", "Lassen Sie mich kurz überlegen.", ["Lassen Sie mich kurz überlegen.", "Lassen Sie mir kurz überlegen.", "Lassen Sie mich kurz zu überlegen."], "Ganar tiempo sin quedarte callado."),
        ch(2, "¿Qué significa?", "Ich drücke dir die Daumen!", "¡Te deseo suerte!", ["¡Te deseo suerte!", "¡Te voy a apretar!", "¡Bien hecho!"], "*die Daumen drücken* = desear suerte (semana 44)."),
        ch(2, "Elegí la partícula.", "Komm ___ mal her!", "doch", ["doch", "denn", "wohl"], "*doch mal* suaviza el imperativo (semana 46)."),
        ch(2, "Behördendeutsch. ¿Qué significa?", "Der Antrag ist fristgerecht einzureichen.", "Hay que presentar la solicitud dentro del plazo.", ["Hay que presentar la solicitud dentro del plazo.", "La solicitud ya fue presentada a tiempo.", "Se puede presentar la solicitud después del plazo."], "*sein + zu* = deber; *fristgerecht* = dentro del plazo."),
        cz(2, "Escribí el verbo (dirigirse).", "Ich ___ mich an Sie, weil ich eine Frage zu Ihrem Angebot habe.", "wende", note="*sich wenden an* + Akk. = dirigirse a."),
        cz(2, "Escribí la palabra (a mi entender).", "Meines ___ ist das keine gute Idee.", "Erachtens", note="*meines Erachtens* (sin *nach*). " + MAY),
        cz(2, "Escribí el artículo.", "Ich bin ___ Meinung, dass wir mehr investieren sollten.", "der", note="*der Meinung sein* (genitivo): ser de la opinión."),
        cz(2, "Escribí el modal.", "Abschließend ___ ich festhalten, dass die Vorteile überwiegen.", "möchte", ["möchte", "will", "darf"], "*Abschließend möchte ich festhalten, dass …*: cierre de un texto argumentativo."),
        ty(2, "Escribí la fórmula formal.", "«Quedo a la espera de su respuesta.»", "Ich freue mich auf Ihre Antwort.", ["Ich freue mich auf Ihre Antwort.", "Ich freue mich auf Ihre baldige Antwort.", "Ich freue mich auf Ihre Rückmeldung.", "Über eine baldige Antwort würde ich mich freuen.", "Über eine Antwort würde ich mich freuen.", "Ich würde mich über eine Antwort freuen.", "Ich würde mich über eine baldige Antwort freuen."], "*sich freuen auf* (algo futuro); *Ihre* con mayúscula: es el *Sie* formal."),
        tr(2, "En mi opinión, la propuesta tiene más ventajas que desventajas.", "Meiner Meinung nach hat der Vorschlag mehr Vorteile als Nachteile.", V("Meiner Meinung nach hat der Vorschlag mehr Vorteile als Nachteile.", "Meines Erachtens hat der Vorschlag mehr Vorteile als Nachteile.", "Meiner Ansicht nach hat der Vorschlag mehr Vorteile als Nachteile.", "Ich bin der Meinung, dass der Vorschlag mehr Vorteile als Nachteile hat.", "Ich finde, dass der Vorschlag mehr Vorteile als Nachteile hat.", "Ich finde, der Vorschlag hat mehr Vorteile als Nachteile."), "*Meiner Meinung nach* / *Meines Erachtens* ocupan la posición 1: verbo segundo."),
        tr(2, "¿Podría repetir la pregunta, por favor?", "Könnten Sie die Frage bitte wiederholen?", ["Könnten Sie die Frage bitte wiederholen?", "Könnten Sie bitte die Frage wiederholen?", "Können Sie die Frage bitte wiederholen?", "Können Sie bitte die Frage wiederholen?", "Würden Sie die Frage bitte wiederholen?", "Könnten Sie die Frage bitte noch einmal stellen?"], "Konjunktiv II de cortesía: *Könnten Sie …?*"),
        li(2, "das Lampenfieber", ["das Lampenfieber", "das Reisefieber", "das Lampenlicht"], "*das Lampenfieber* = los nervios antes de salir a escena (o de la prueba oral); *das Reisefieber* = los nervios antes de viajar."),
        # parte 0 — repaso: discurso indirecto, modales subjetivos y pasiva en Konjunktiv
        ch(0, "¿Qué significa?", "Er dürfte es vergessen haben.", "Probablemente se lo olvidó.", ["Probablemente se lo olvidó.", "Tenía permiso para olvidarlo.", "Tendría que haberlo olvidado."], "*dürfte* + infinitivo perfecto = suposición probable sobre el pasado (semana 37)."),
        ch(0, "Elegí el modal.", "(Según la prensa, la empresa evadió impuestos.) Die Firma ___ Steuern hinterzogen haben.", "soll", ["soll", "will", "muss"], "Lo dicen otros: *soll*. *will* sería la versión de la propia empresa; *muss*, una conclusión tuya."),
        ch(0, "¿Qué significa?", "Er kann nicht dort gewesen sein.", "Es imposible que haya estado ahí.", ["Es imposible que haya estado ahí.", "No pudo ir ahí.", "No necesariamente estuvo ahí."], "*kann nicht* + infinitivo perfecto = lo descartás. «No pudo ir» (objetivo) sería *Er konnte nicht dorthin gehen*."),
        cz(0, "Escribí el verbo en Konjunktiv I o el II de reemplazo.", "Die Gewerkschaft erklärte, die Mitarbeiter ___ seit Monaten kein Gehalt bekommen.", "hätten", note="*sie haben* en Konjunktiv I es igual al indicativo → *hätten*. No es irreal: es la cita."),
        cz(0, "Escribí el verbo en Konjunktiv I.", "Laut Polizei ___ bei dem Brand niemand verletzt worden.", "sei", note="Pasiva en pasado + Konjunktiv I: *sei … verletzt worden*."),
        ty(0, "Pasá a discurso indirecto, empezando con *Die Ministerin sagte, …*", "„Wir haben die Steuern nicht erhöht. Das ist eine Lüge der Opposition.“", "Die Ministerin sagte, sie hätten die Steuern nicht erhöht. Das sei eine Lüge der Opposition.", ["Die Ministerin sagte, sie hätten die Steuern nicht erhöht. Das sei eine Lüge der Opposition.", "Die Ministerin sagte, sie hätten die Steuern nicht erhöht, das sei eine Lüge der Opposition.", "Die Ministerin sagte, man habe die Steuern nicht erhöht. Das sei eine Lüge der Opposition.", "Die Ministerin sagte, man habe die Steuern nicht erhöht, das sei eine Lüge der Opposition.", "Die Ministerin sagte, die Regierung habe die Steuern nicht erhöht. Das sei eine Lüge der Opposition.", "Die Ministerin sagte, die Regierung habe die Steuern nicht erhöht, das sei eine Lüge der Opposition."], "*wir haben* → *sie hätten* (el Konjunktiv I *haben* no se nota) o *man habe*; la segunda oración sigue en Konjunktiv I aunque no repitas *sagte*: *das sei*."),
        ch(0, "¿Qué significa?", "Der Bericht hätte früher geschrieben werden müssen.", "Habría que haber escrito el informe antes.", ["Habría que haber escrito el informe antes.", "El informe tuvo que escribirse antes.", "El informe se escribió antes."], "Pasiva + modal en Konjunktiv II pasado (semana 43): algo que debía hacerse y no se hizo."),
        ch(0, "Reconocé la forma.", "…, dass das Unglück nicht hatte verhindert werden können.", "no se había podido evitar", ["no se había podido evitar", "no se podría evitar", "no se habría podido evitar"], "Plusquamperfekt de la pasiva con modal: *hatte* adelante de *verhindert werden können*, como con todo doble infinitivo en la subordinada. Con *hätte* sería «no se habría podido evitar»."),
        # parte 1 — repaso: participio con zu
        ch(1, "¿Qué significa?", "die noch zu klärenden Fragen", "las cuestiones que quedan por aclarar", ["las cuestiones que quedan por aclarar", "las cuestiones ya aclaradas", "las cuestiones que aclaran"], "*zu* + participio I = algo que **hay que** hacer todavía. *geklärt* sería «aclaradas» y *klärend*, «que aclaran»."),
        ch(1, "¿Qué significa?", "Die zu erwartenden Kosten sind hoch.", "Los costos previstos son altos.", ["Los costos previstos son altos.", "Los costos esperados ya se pagaron.", "Los costos que esperan son altos."], "*die zu erwartenden Kosten* = los costos que hay que esperar, los previstos."),
        # parte 1 — repaso: als / wenn / wann y falls / ob
        ch(1, "Elegí el conector.", "___ ich zum ersten Mal in Berlin war, verstand ich fast nichts.", "Als", ["Als", "Wenn", "Wann"], "Una vez en el pasado → *als*. *wenn* en pasado es «cada vez que»; *wann*, solo pregunta."),
        cz(1, "Escribí *als* o *wenn*.", "Jedes Mal, ___ ich deutsche Nachrichten hörte, lernte ich neue Wörter.", "wenn", note="«cada vez que» (repetido) → *wenn*, también en pasado."),
        tr(1, "Avisame en caso de que no puedas venir.", "Sag mir Bescheid, falls du nicht kommen kannst.", V("Sag mir Bescheid, falls du nicht kommen kannst.", "Gib mir Bescheid, falls du nicht kommen kannst.", "Sag mir Bescheid, wenn du nicht kommen kannst.", "Gib mir Bescheid, wenn du nicht kommen kannst.", "Falls du nicht kommen kannst, sag mir Bescheid.", "Falls du nicht kommen kannst, gib mir Bescheid."), "«en caso de que» + subjuntivo → *falls* + indicativo, con el modal al final (*kommen kannst*)."),
        # parte 0 — repaso: preposiciones y adjetivos con preposición
        cz(0, "Escribí el artículo.", "Wir müssen leider ohne ___ Chef entscheiden. (der Chef)", "den", note="*ohne* + acusativo: *den Chef*."),
        ch(0, "Elegí preposición y caso.", "Ich habe gestern lange ___ Kollegin telefoniert. (con mi colega)", "mit meiner", ["mit meiner", "mit meine", "für meine"], "*mit* + dativo femenino: *meiner*."),
        tr(0, "Te dejé el informe sobre tu escritorio.", "Ich habe dir den Bericht auf deinen Schreibtisch gelegt.", ["Ich habe dir den Bericht auf deinen Schreibtisch gelegt.", "Ich habe den Bericht auf deinen Schreibtisch gelegt.", "Ich habe dir den Bericht auf den Schreibtisch gelegt.", "Ich habe den Bericht auf den Schreibtisch gelegt."], "*legen* = destino: *auf deinen Schreibtisch* (acusativo). Ahí queda: *Er liegt auf deinem Schreibtisch* (dativo)."),
        cz(0, "Escribí el posesivo.", "Der Bericht liegt auf ___ Schreibtisch. (tu)", "deinem", note="*liegen*: dónde, dativo: *auf deinem Schreibtisch*."),
        cz(0, "Escribí la preposición.", "Wir sind sehr stolz ___ unser Team.", "auf", note="*stolz auf* + acusativo, aunque en castellano sea «orgulloso **de**»."),
        tr(0, "Estoy muy interesado en el puesto.", "Ich bin sehr an der Stelle interessiert.", ["Ich bin sehr an der Stelle interessiert.", "Ich bin an der Stelle sehr interessiert.", "Ich interessiere mich sehr für die Stelle.", "Ich bin sehr an der Position interessiert.", "Ich interessiere mich sehr für die Position."], "Adjetivo: *interessiert an* + dativo; verbo: *sich interessieren für* + acusativo."),
        # parte 2 — repaso: partículas modales al hablar
        ch(2, "Elegí la partícula.", "(En la parte oral, al compañero) Wie siehst du das ___?", "denn", ["denn", "mal", "doch"], "En preguntas, *denn* suena interesado y natural en una charla."),
        # encontrá el error, dictado, repaso intercalado y producción
        # encontrá el error
        fx(0, "Ich habe gestern mit einem Kollege gesprochen.", "Kollege", "Kollegen", "caso", "*der Kollege* es de la n-Deklination: suma *-n* en todos los casos menos el nominativo singular. *mit einem Kollegen*, *den Kollegen*, *des Kollegen*."),
        fx(1, "Obwohl das Thema ist wichtig, wird es kaum diskutiert.", "das Thema ist wichtig", "das Thema wichtig ist", "orden", "*obwohl* es subordinante: el verbo conjugado va al final, *obwohl das Thema wichtig ist*. Es de los errores que más cuestan en un C1, porque el castellano no cambia el orden."),
        fx(0, "Die Maßnahme ist letztes Jahr eingeführt geworden.", "geworden", "worden", "pasiva", "En la pasiva en Perfekt, *werden* va como *worden*, sin *ge-*: *ist eingeführt worden*. *geworden* es «se volvió»: *Es ist teurer geworden*."),
        # dictado
        di(0, "Trotz des schlechten Wetters sind wir mit den Kindern ans Meer gefahren.", note="*trotz des schlechten Wetters*: genitivo, *-en* en el adjetivo y *-s* en el sustantivo. *mit den Kindern*: dativo plural, con *-n* también en el sustantivo."),
        di(2, "Ich bin davon überzeugt, dass man einen eigenen Weg finden muss.", note="*davon überzeugt*: el *da-* anuncia la oración con *dass*. *einen eigenen Weg*: acusativo masculino, *-en* en el artículo y en el adjetivo."),
        # repaso intercalado
        cz(2, "Escribí *beantworten* con *sein + zu*.", "Alle Fragen sind auf dem Antwortblatt ___.", "zu beantworten", note="Repaso (semana 40): *sein + zu* en una consigna = «hay que»: *sind zu beantworten*. *beantworten* es inseparable, así que *zu* va separado, delante."),
        cz(1, "Escribí el artículo.", "Wegen ___ Lampenfiebers konnte sie kaum sprechen.", "des", note="Repaso (semana 26): *wegen* + genitivo en lo escrito: *des Lampenfiebers* (neutro, con *-s*). *wegen dem* se oye en la charla, pero en el examen es un error."),
        tr(1, "Debido a mi enfermedad, no pude hacer el examen.", "Aufgrund meiner Krankheit konnte ich die Prüfung nicht machen.", [a + b for a in ("Aufgrund meiner Krankheit konnte ich ", "Wegen meiner Krankheit konnte ich ") for b in ("die Prüfung nicht machen.", "die Prüfung nicht ablegen.", "die Prüfung nicht schreiben.")], "Repaso (semana 41): *aufgrund* + genitivo: *meiner Krankheit* (femenino, *-er*). Ocupa la posición 1, así que el verbo va enseguida: *konnte ich*."),
        cz(1, "Escribí la palabra que falta.", "Je mehr du übst, ___ sicherer wirst du.", "desto", ["desto", "umso"], "Repaso (semana 29): *je* + verbo al final, *desto* (o *umso*) + verbo segundo: «cuanto más…, más…»."),
        # producción
        ty(2, "Empezá un aporte a un foro en dos oraciones: presentá el tema de las redes sociales (con la pasiva *wird … diskutiert*) y tu postura con *Meiner Meinung nach* (más ventajas o más desventajas).", "(Schreiben, Teil 1: Forumsbeitrag)", "In letzter Zeit wird viel über soziale Medien diskutiert. Meiner Meinung nach haben sie mehr Vorteile als Nachteile.",
           [a + " " + b for a in ("In letzter Zeit wird viel über soziale Medien diskutiert.", "In letzter Zeit wird viel über die sozialen Medien diskutiert.", "Heutzutage wird viel über soziale Medien diskutiert.", "Zurzeit wird viel über soziale Medien diskutiert.", "Über soziale Medien wird in letzter Zeit viel diskutiert.")
            for b in ("Meiner Meinung nach haben sie mehr Vorteile als Nachteile.", "Meiner Meinung nach haben sie mehr Nachteile als Vorteile.", "Meiner Meinung nach überwiegen die Vorteile.", "Meiner Meinung nach überwiegen die Nachteile.")],
           "La pasiva presenta el tema sin nombrar a nadie: *wird … diskutiert*, con *über* + acusativo. *Meiner Meinung nach* ocupa la posición 1, así que el verbo va enseguida: *haben sie*."),
    ],
}
