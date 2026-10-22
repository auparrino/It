# -*- coding: utf-8 -*-
"""Semana 47 — Wer, wann, wie, wo (C1): el orden fino de la oración (campo medio, nicht, Vorfeld y Nachfeld)."""
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
    "week": 47,
    "title": "Wer, wann, wie, wo",
    "level": "C1",
    "focus": "El orden fino de la oración: qué va primero en el campo medio, dónde se pone nicht y qué se gana con el Vorfeld y el Nachfeld.",
    "fare": "Ordenar objetos y pronombres sin pensar, negar exactamente lo que querés negar y mover las piezas para destacar, contrastar o enlazar con lo anterior.",
    "tema": "Campo medio, orden de los objetos, pronombres, TeKaMoLo, posición de nicht, sondern, Vorfeld, Nachfeld, foco",
    "keys": [
        "Dos sustantivos: dativo antes que acusativo: *Ich gebe dem Kind das Buch*.",
        "Dos pronombres: acusativo antes que dativo: *Ich gebe es ihm* (al revés que «se lo»).",
        "Los pronombres átonos se adelantan, incluso al sujeto: *Gestern hat mir mein Bruder geholfen*.",
        "Orden neutro de los complementos: TeKaMoLo (*wann – warum – wie – wo*); lo nuevo, al final.",
        "*nicht* oracional va lo más atrás posible, pero antes del participio, la dirección o el predicativo.",
        "Vorfeld: un solo elemento, para enlazar o contrastar; Nachfeld: comparaciones y relativas largas.",
    ],
    "lesson": {
        "intro": "Desde la semana 2 sabés que el verbo va segundo y desde la 7 que la segunda parte del verbo se va al final. Entre esas dos piezas queda el **campo medio**, y ahí el alemán tiene un orden propio que los nativos sienten sin pensar. Esta semana lo hacemos consciente: qué va antes, dónde cae *nicht* y cómo se usan el principio y el final de la oración para dar énfasis.",
        "parts": [
            {"h": "Objetos y pronombres en el campo medio", "blocks": [0, 1]},
            {"h": "TeKaMoLo y el lugar de nicht", "blocks": [2, 3, 4]},
            {"h": "Foco, Vorfeld y Nachfeld", "blocks": [5, 6, 7]},
        ],
        "blocks": [
            {
                "h": "Dos objetos: ¿quién va primero?",
                "r": "Con **dos sustantivos**, el orden neutro es **dativo – acusativo**: *Sie zeigt dem Gast das Zimmer*. Con **dos pronombres**, al revés: **acusativo – dativo**: *Sie zeigt es ihm*. Si hay **un pronombre y un sustantivo**, el **pronombre va primero**, sea del caso que sea.",
                "table": {"head": ["Objetos", "Orden", "Ejemplo"], "rows": [
                    ["sustantivo + sustantivo", "dativo – acusativo", "Sie zeigt dem Gast das Zimmer."],
                    ["pronombre + pronombre", "acusativo – dativo", "Sie zeigt es ihm."],
                    ["pronombre + sustantivo", "pronombre – sustantivo", "Sie zeigt es dem Gast."],
                    ["sustantivo + pronombre", "pronombre – sustantivo", "Sie zeigt ihm das Zimmer."],
                ]},
                "ex": [
                    ["Ich schenke *meiner Schwester ein Buch*.", "Le regalo un libro a mi hermana."],
                    ["Ich schenke *es ihr*.", "Se lo regalo."],
                    ["Ich schenke *ihr ein Buch*.", "Le regalo un libro."],
                    ["Ich schenke *es meiner Schwester*.", "Se lo regalo a mi hermana."],
                ],
                "warn": "En castellano decimos «**se lo** doy»: primero el dativo (*se*), después el acusativo (*lo*). En alemán, con dos pronombres, es al revés: *Ich gebe **es ihm***, nunca *ihm es*.",
                "tip": "Regla de bolsillo: **lo corto antes que lo largo**. Los pronombres (cortos) se adelantan a los sustantivos (largos).",
                "more": ["*das* demostrativo (acentuado) se porta como un sustantivo: *Kannst du mir das erklären?* es perfecto, aunque con *es* sea *Kannst du es mir erklären?*"],
                "q": [
                    q("¿Cuál es correcta?", "Ich erkläre es dir.", ["Ich erkläre es dir.", "Ich erkläre dir es.", "Ich es dir erkläre."]),
                    q("Con dos sustantivos, en el orden neutro, ¿qué va primero?", "el dativo", ["el dativo", "el acusativo", "el sujeto"]),
                ],
            },
            {
                "h": "Los pronombres se adelantan",
                "r": "Los pronombres átonos (*mich, dir, es, ihn, uns, sich*…) se van **al principio del campo medio**: justo detrás del verbo conjugado o de la conjunción, **incluso antes que un sujeto sustantivo**. Entre ellos, el orden es **nominativo – acusativo – dativo**.",
                "ex": [
                    ["Gestern hat *mir* mein Bruder geholfen.", "Ayer me ayudó mi hermano."],
                    ["Ich weiß nicht, ob *ihn* der Chef schon angerufen hat.", "No sé si el jefe ya lo llamó."],
                    ["Am Ende hat *sich* der Minister doch entschuldigt.", "Al final el ministro sí se disculpó."],
                    ["Dann hat *sie es ihm* erklärt.", "Entonces ella se lo explicó."],
                ],
                "warn": "Con un sujeto sustantivo las dos variantes existen (*Gestern hat mein Bruder mir geholfen* no está mal), pero la del pronombre adelante es la más natural. Con un sujeto **pronombre**, en cambio, el sujeto va primero: *Gestern hat **er mir** geholfen*.",
                "tip": "El reflexivo *sich* también es un pronombre átono: *Hat sich der Minister entschuldigt?* suena mucho mejor que *Hat der Minister sich entschuldigt?*",
                "q": [
                    q("¿Cuál suena más natural?", "Morgen bringt es dir der Kurier.", ["Morgen bringt es dir der Kurier.", "Morgen bringt der Kurier dir es.", "Morgen bringt dir es der Kurier."]),
                    q("Completá: *Dann hat ___ erklärt.* (ella, lo, a él)", "sie es ihm", ["sie es ihm", "sie ihm es", "ihm es sie"]),
                ],
            },
            {
                "h": "TeKaMoLo: cuándo, por qué, cómo, dónde",
                "r": "Los complementos circunstanciales del campo medio siguen, en el orden **neutro** (sin énfasis), la secuencia **te**mporal – **ka**usal – **mo**dal – **lo**kal. No es una ley de hierro, es el orden por defecto: si lo cambiás, se nota y suena a énfasis.",
                "table": {"head": ["Tipo", "Pregunta", "Ejemplos"], "rows": [
                    ["temporal", "wann? wie lange?", "morgen, seit Jahren, am Freitag"],
                    ["kausal", "warum?", "wegen der Konferenz, aus Überzeugung"],
                    ["modal", "wie? womit?", "mit dem Zug, allein, gern"],
                    ["lokal", "wo? wohin? woher?", "nach Hamburg, im Büro, draußen"],
                ]},
                "ex": [
                    ["Ich fahre *morgen wegen der Konferenz mit dem Zug nach Hamburg*.", "Mañana voy en tren a Hamburgo por la conferencia."],
                    ["Er arbeitet *seit Jahren aus Überzeugung ehrenamtlich in einem Hospiz*.", "Hace años que trabaja por convicción como voluntario en un hospicio."],
                    ["Wir haben *am Freitag trotz des Regens draußen* gegessen.", "El viernes comimos afuera a pesar de la lluvia."],
                ],
                "warn": "En castellano el tiempo suele ir al final: «Voy a Hamburgo mañana». En alemán va temprano: *Ich fahre morgen nach Hamburg*. *Ich fahre nach Hamburg morgen* suena a traducción.",
                "tip": "La **dirección** (*wohin?*) está casi pegada al verbo: queda al final del campo medio, justo antes del participio o del infinitivo: *Ich bin gestern mit Freunden **ins Kino** gegangen.*",
                "q": [
                    q("Elegí el orden neutro.", "Ich bin gestern mit dem Rad zur Uni gefahren.", ["Ich bin gestern mit dem Rad zur Uni gefahren.", "Ich bin zur Uni mit dem Rad gestern gefahren.", "Ich bin mit dem Rad zur Uni gestern gefahren."]),
                    q("¿Qué significa *Ka* en TeKaMoLo?", "kausal: ¿por qué?", ["kausal: ¿por qué?", "konzessiv: ¿a pesar de qué?", "Kasus: ¿qué caso?"]),
                ],
            },
            {
                "h": "¿Dónde va nicht?",
                "r": "Cuando *nicht* niega **toda la oración** (*Satznegation*), va **lo más atrás posible** en el campo medio: después de los objetos y del tiempo, pero **antes** de todo lo que forma un bloque con el verbo: la segunda parte del verbo, la dirección o el lugar, el predicativo, el objeto con preposición y casi siempre el modo.",
                "table": {"head": ["nicht va…", "Ejemplo"], "rows": [
                    ["después del objeto directo", "Ich kenne den Mann nicht."],
                    ["después del tiempo", "Er kommt heute nicht."],
                    ["antes del participio o el infinitivo", "Ich habe das Buch nicht gelesen."],
                    ["antes de la dirección o el lugar", "Wir fahren nicht nach Berlin."],
                    ["antes del predicativo", "Das Essen ist nicht schlecht."],
                    ["antes del objeto con preposición", "Ich warte nicht auf ihn."],
                    ["antes del modo", "Sie fährt nicht schnell."],
                ]},
                "warn": "En castellano el *no* va siempre pegado delante del verbo. En alemán *nicht* no se pega al verbo conjugado: *Ich nicht kenne ihn* es imposible. Pensalo así: *nicht* viaja hacia el final hasta que choca con algo que «pertenece» al verbo.",
                "tip": "Con el prefijo separable pasa lo mismo: *Sie kommt morgen **nicht mit**.* El prefijo es la segunda parte del verbo, así que *nicht* se queda delante.",
                "q": [
                    q("Elegí la oración correcta.", "Ich habe ihn gestern nicht gesehen.", ["Ich habe ihn gestern nicht gesehen.", "Ich nicht habe ihn gestern gesehen.", "Ich habe ihn gestern gesehen nicht."]),
                    q("Elegí la oración correcta.", "Er interessiert sich nicht für Politik.", ["Er interessiert sich nicht für Politik.", "Er nicht interessiert sich für Politik.", "Er interessiert nicht sich für Politik."]),
                ],
            },
            {
                "h": "Negar una sola parte: nicht … sondern",
                "r": "Si querés negar **un solo elemento** (*Sondernegation*), *nicht* va **justo delante de ese elemento**, y casi siempre aparece la corrección con *sondern*.",
                "ex": [
                    ["Ich fahre *nicht morgen*, sondern übermorgen.", "No viajo mañana, sino pasado mañana."],
                    ["*Nicht ich* habe das gesagt, sondern mein Kollege.", "No fui yo el que lo dijo, sino mi colega."],
                    ["Er hat *nicht das Auto* genommen, sondern das Fahrrad.", "No se llevó el auto, sino la bici."],
                    ["Sie hat *nicht mit dem Chef* gesprochen, sondern mit seiner Assistentin.", "No habló con el jefe, sino con su asistente."],
                ],
                "warn": "«Sino» después de una negación es *sondern*, no *aber*: *nicht heute, **sondern** morgen*. *aber* es «pero»: *Das Hotel ist nicht billig, aber schön.*",
                "tip": "Comparalo: *Ich fahre morgen **nicht** nach Berlin* (no viajo) vs. *Ich fahre **nicht morgen** nach Berlin* (viajo, pero otro día). Un cambio de lugar, otro significado.",
                "q": [
                    q("Completá: *Ich habe nicht dich gemeint, ___ ihn.*", "sondern", ["sondern", "aber", "sonst"]),
                    q("¿Qué niega *Ich fahre nicht morgen nach Berlin*?", "solo el día", ["solo el día", "el viaje entero", "el destino"]),
                ],
            },
            {
                "h": "Lo conocido antes, lo nuevo al final",
                "r": "Más fuerte que TeKaMoLo es el principio **información conocida → información nueva**. Lo nuevo y lo importante (el **foco**) va **al final del campo medio**, justo antes de la segunda parte del verbo. Por eso un objeto **definido** (ya conocido) suele subir, y uno **indefinido** (nuevo) quedarse atrás.",
                "ex": [
                    ["Ich habe *das Buch* gestern *einem Kollegen* geliehen.", "El libro se lo presté ayer a un colega."],
                    ["Ich habe gestern einem Kollegen *ein Buch* geliehen.", "Ayer le presté un libro a un colega."],
                    ["Wir haben *das Problem* gestern stundenlang diskutiert.", "El problema lo discutimos ayer durante horas."],
                    ["Er hat *den Wagen* letzte Woche *an eine Firma in Polen* verkauft.", "El auto lo vendió la semana pasada a una empresa de Polonia."],
                ],
                "warn": "Si traducís palabra por palabra, el objeto queda pegado al verbo conjugado y el foco se pierde. En alemán, lo que querés destacar va **lo más atrás posible** del campo medio: el final es el lugar del énfasis.",
                "tip": "Por eso, aunque con dos sustantivos el orden neutro sea dativo – acusativo, *Ich habe das Buch einem Kollegen geliehen* es perfecto: el libro ya es conocido; lo nuevo es a quién.",
                "q": [
                    q("¿Qué es lo nuevo en *Ich habe das Geld gestern meiner Schwester gegeben*?", "a quién se la di", ["a quién se la di", "qué di", "cuándo la di"]),
                    q("¿Dónde va el foco en el campo medio?", "al final, antes del verbo final", ["al final, antes del verbo final", "justo después del verbo conjugado", "siempre en el Vorfeld"]),
                ],
            },
            {
                "h": "El Vorfeld: enlazar y contrastar",
                "r": "En el **Vorfeld** (lo que va antes del verbo conjugado) entra **un solo elemento**, pero puede ser casi cualquiera: un objeto, un complemento, un participio, hasta una subordinada entera. Si no ponés el sujeto ahí, es para **enlazar con lo anterior** o para **contrastar**. El sujeto pasa detrás del verbo.",
                "ex": [
                    ["*Den Film* habe ich schon gesehen, *das Buch* noch nicht.", "La película ya la vi; el libro, todavía no."],
                    ["*Dem Kind* hat niemand etwas gesagt.", "Al chico nadie le dijo nada."],
                    ["*Gelesen* habe ich den Vertrag, aber *verstanden* habe ich ihn nicht.", "Leer el contrato, lo leí; entenderlo, no lo entendí."],
                    ["*Dass er kündigt*, hat mich überrascht.", "Que renunciara me sorprendió."],
                    ["*Es* kamen mehr Leute als erwartet.", "Vino más gente de la esperada."],
                ],
                "warn": "En castellano duplicamos el objeto adelantado: «La película **la** vi». En alemán, no: *Den Film habe ich gesehen*, nunca *Den Film habe ich ihn gesehen*.",
                "more": [
                    "El *es* de relleno ocupa el Vorfeld cuando querés presentar algo nuevo sin poner nada adelante: *Es kamen viele Gäste.* Si otro elemento ocupa el lugar, desaparece: *Gestern kamen viele Gäste.* El verbo concuerda con el sujeto real (*Gäste* → *kamen*).",
                ],
                "q": [
                    q("¿Cuál está bien?", "Den Kuchen hat meine Oma gebacken.", ["Den Kuchen hat meine Oma gebacken.", "Den Kuchen hat ihn meine Oma gebacken.", "Den Kuchen meine Oma hat gebacken."]),
                    q("¿Qué pasa con el *es* de *Es kamen viele Gäste* si empezás con *Gestern*?", "desaparece", ["desaparece", "va detrás del verbo", "va al final"]),
                ],
            },
            {
                "h": "El Nachfeld: lo que va después del verbo final",
                "r": "Detrás de la segunda parte del verbo (participio, infinitivo, verbo final de la subordinada) queda el **Nachfeld**. Ahí van sobre todo las **comparaciones** con *als / wie*, las **subordinadas y relativas** largas y, en el habla o para dar énfasis, algún **complemento con preposición** agregado al final (*Ausklammerung*).",
                "ex": [
                    ["Er hat mehr gearbeitet *als ich*.", "Trabajó más que yo."],
                    ["Ich habe gestern einen Mann getroffen, *der dich kennt*.", "Ayer me crucé con un hombre que te conoce."],
                    ["Sie hat mir erzählt, *dass sie nach Wien zieht*.", "Me contó que se muda a Viena."],
                    ["Wir haben lange diskutiert *über die Zukunft des Projekts*.", "Discutimos largo sobre el futuro del proyecto."],
                ],
                "warn": "Meter todo dentro del corchete verbal es correcto pero pesado: *Ich habe gestern einen Mann, der dich kennt, getroffen.* Con una relativa larga, el verbo queda lejísimos; en el Nachfeld se lee mucho mejor.",
                "tip": "La *Ausklammerung* del último ejemplo es típica de la lengua oral y de los titulares; en un texto formal, mejor dentro: *Wir haben lange über die Zukunft des Projekts diskutiert.*",
                "q": [
                    q("¿Qué suena más natural?", "Ich habe ihn öfter angerufen als dich.", ["Ich habe ihn öfter angerufen als dich.", "Ich habe als dich ihn öfter angerufen.", "Ich habe ihn öfter als angerufen dich."]),
                    q("¿Qué va normalmente en el Nachfeld?", "una relativa larga", ["una relativa larga", "un pronombre átono", "el sujeto"]),
                ],
            },
        ],
    },
    "vocab": [
        ["die Betonung", "el énfasis; la acentuación", "Die Betonung liegt auf der ersten Silbe."],
        ["der Nachdruck", "el énfasis, la insistencia", "Er hat mit Nachdruck auf die Risiken hingewiesen."],
        ["die Satzstellung", "el orden de las palabras en la oración", "Die Satzstellung im Deutschen ist flexibler, als viele denken."],
        ["das Satzglied", "el constituyente, la parte de la oración", "Im Vorfeld steht immer nur ein Satzglied."],
        ["die Verneinung", "la negación", "Bei der Verneinung steht nicht oft am Ende des Mittelfelds."],
        ["ausgerechnet", "justo, precisamente (con fastidio)", "Ausgerechnet heute ist der Zug ausgefallen."],
        ["ausdrücklich", "expresamente", "Ich habe dich ausdrücklich darum gebeten."],
        ["keineswegs", "de ninguna manera, para nada", "Das ist keineswegs selbstverständlich."],
        ["durchaus", "perfectamente, sin duda", "Das ist durchaus möglich."],
        ["lediglich", "solamente, meramente", "Es war lediglich ein Missverständnis."],
        ["zumindest", "por lo menos", "Zumindest hat er sich entschuldigt."],
        ["insbesondere", "en particular, sobre todo", "Insbesondere junge Leute nutzen diese App."],
        ["nachdrücklich", "enfáticamente, con insistencia", "Die Ärztin hat ihm nachdrücklich geraten, weniger zu arbeiten."],
        ["beiläufig", "de pasada, al pasar", "Sie erwähnte beiläufig, dass sie kündigen will."],
        ["unmissverständlich", "inequívoco, clarísimo", "Der Chef hat sich unmissverständlich ausgedrückt."],
    ],
    "items": [
        # parte 0 — objetos y pronombres
        ch(0, "Elegí el orden correcto.", "Ich gebe ___. (el libro → pronombre, a él)", "es ihm", ["es ihm", "ihm es", "es zu ihm"], "Dos pronombres: acusativo antes que dativo. Al revés que «se lo»."),
        ch(0, "Elegí el orden neutro.", "Sie zeigt ___. (a los invitados, la ciudad)", "den Gästen die Stadt", ["den Gästen die Stadt", "die Gäste der Stadt", "den Gästen der Stadt"], "Dos sustantivos: dativo (*den Gästen*) antes que acusativo (*die Stadt*)."),
        ch(0, "Elegí el orden correcto.", "Die Unterlagen? Ich schicke ___ morgen. (a la jefa)", "sie der Chefin", ["sie der Chefin", "der Chefin sie", "sie die Chefin"], "Pronombre + sustantivo: el pronombre primero, aunque sea acusativo."),
        ch(0, "Elegí el orden correcto.", "Ich habe ___ gekauft. (a ella, un reloj)", "ihr eine Uhr", ["ihr eine Uhr", "eine Uhr ihr", "sie eine Uhr"], "El pronombre dativo *ihr* va antes que el sustantivo."),
        ch(0, "¿Cuál suena más natural?", "(Ayer me ayudó mi vecina.)", "Gestern hat mir meine Nachbarin geholfen.", ["Gestern hat mir meine Nachbarin geholfen.", "Gestern hat meine Nachbarin geholfen mir.", "Gestern mir hat meine Nachbarin geholfen."], "El pronombre átono se adelanta, incluso antes que un sujeto sustantivo."),
        ch(0, "Ordená los pronombres.", "Dann hat ___ gegeben. (él, lo, a ella)", "er es ihr", ["er es ihr", "er ihr es", "es er ihr"], "Entre pronombres: nominativo – acusativo – dativo."),
        ch(0, "Elegí el orden correcto.", "Die Unterlagen? Morgen schickt ___ die Firma.", "sie uns", ["sie uns", "uns sie", "sie wir"], "Pronombres antes del sujeto sustantivo, y acusativo (*sie*) antes que dativo (*uns*)."),
        ch(0, "¿Cuál es correcta?", "(¿Me lo podés explicar?)", "Kannst du es mir erklären?", ["Kannst du es mir erklären?", "Kannst du mir es erklären?", "Kannst du es mich erklären?"], "*es mir*: acusativo – dativo. (Con el demostrativo *das* también: *Kannst du mir das erklären?*)"),
        cz(0, "Escribí el pronombre (a él).", "Das Fahrrad? Ich habe es ___ geliehen.", "ihm", note="*leihen* + dativo de persona: *es ihm*, acusativo antes que dativo."),
        cz(0, "Escribí el pronombre (el auto).", "Und das Auto? – Ich habe ___ meinem Vater verkauft.", "es", note="Pronombre + sustantivo: *es* va primero, aunque sea acusativo."),
        cz(0, "Escribí el pronombre reflexivo.", "Hat ___ der Minister schon entschuldigt?", "sich", note="*sich* es átono: se adelanta al sujeto sustantivo (*der Minister*)."),
        cz(0, "Escribí el pronombre (a nosotros).", "Gestern hat ___ der Vermieter endlich geantwortet.", "uns", note="*antworten* + dativo; el pronombre va antes que el sujeto *der Vermieter*."),
        tr(0, "Te lo explico.", "Ich erkläre es dir.", ["Ich erkläre es dir.", "Ich erkläre dir das.", "Das erkläre ich dir."], "Dos pronombres: *es dir*. Con el demostrativo *das* se puede *dir das*."),
        tr(0, "Se lo di a ella. (el libro → es; Perfekt)", "Ich habe es ihr gegeben.", note="Castellano «se lo», alemán *es ihr*: el orden se invierte."),
        tr(0, "Le mostré la foto a mi mamá. (Perfekt)", "Ich habe meiner Mutter das Foto gezeigt.", ["Ich habe meiner Mutter das Foto gezeigt.", "Ich habe meiner Mama das Foto gezeigt."], "Orden neutro: dativo – acusativo. (*das Foto meiner Mutter* se leería «la foto de mi mamá».)"),
        ty(0, "Reemplazá los dos objetos por pronombres.", "Ich bringe dem Gast den Kaffee.", "Ich bringe ihn ihm.", note="*den Kaffee* → *ihn*, *dem Gast* → *ihm*: acusativo antes que dativo."),
        # parte 1 — TeKaMoLo y nicht
        ch(1, "Elegí el orden neutro.", "Ich fahre ___.", "morgen mit dem Zug nach Wien", ["morgen mit dem Zug nach Wien", "nach Wien mit dem Zug morgen", "mit dem Zug nach Wien morgen"], "TeKaMoLo: tiempo – modo – lugar; la dirección, al final."),
        ch(1, "Elegí el orden neutro.", "Sie ist ___ zu Hause geblieben.", "gestern wegen der Erkältung", ["gestern wegen der Erkältung", "wegen der Erkältung gestern", "gestern wegen die Erkältung"], "Temporal (*gestern*) antes que causal (*wegen der Erkältung*)."),
        ch(1, "Negá toda la oración (*Ich kenne den Mann*).", "Ich kenne ___.", "den Mann nicht", ["den Mann nicht", "nicht den Mann", "keinen Mann"], "Negación oracional: *nicht* después del objeto directo."),
        ch(1, "Negá toda la oración.", "Wir fahren ___ in Urlaub.", "dieses Jahr nicht", ["dieses Jahr nicht", "nicht dieses Jahr", "dieses Jahr nichts"], "*nicht* va después del tiempo y antes de la dirección (*in Urlaub*)."),
        ch(1, "Negá toda la oración.", "Er hat ___.", "sich nicht für die Stelle beworben", ["sich nicht für die Stelle beworben", "nicht sich für die Stelle beworben", "sich für die Stelle beworben nicht"], "Objeto con preposición y participio: *nicht* va antes de los dos."),
        ch(1, "Negá toda la oración.", "Das Hotel war ___.", "nicht besonders sauber", ["nicht besonders sauber", "besonders sauber nicht", "sauber nicht besonders"], "Predicativo (*sauber*): *nicht* va delante."),
        ch(1, "Elegí la oración correcta.", "(Anoche no pude dormir.)", "Ich konnte letzte Nacht nicht schlafen.", ["Ich konnte letzte Nacht nicht schlafen.", "Ich nicht konnte letzte Nacht schlafen.", "Ich konnte letzte Nacht schlafen nicht."], "*nicht* después del tiempo y antes del infinitivo."),
        ch(1, "¿Qué significa?", "Ich habe nicht dich gefragt, sondern deine Schwester.", "No te pregunté a vos, sino a tu hermana.", ["No te pregunté a vos, sino a tu hermana.", "No les pregunté ni a vos ni a tu hermana.", "Te pregunté a vos y después a tu hermana."], "*nicht* delante de *dich* niega solo esa parte; *sondern* trae la corrección."),
        cz(1, "Escribí la palabra que falta.", "Wir treffen uns nicht heute, ___ morgen.", "sondern", note="Después de una negación, «sino» es *sondern*."),
        cz(1, "Escribí las dos palabras (todavía no).", "Ich habe die E-Mail ___ gelesen.", "noch nicht", note="*noch nicht* va antes del participio, como *nicht*."),
        ty(1, "Ordená en el orden neutro.", "ins Kino / mit Freunden / am Samstag — Ich gehe …", "Ich gehe am Samstag mit Freunden ins Kino.", ["Ich gehe am Samstag mit Freunden ins Kino.", "Am Samstag gehe ich mit Freunden ins Kino."], "Te – Mo – Lo; la dirección (*ins Kino*) cierra el campo medio."),
        ty(1, "Ordená en el orden neutro.", "nach Hause / wegen des Regens / früh — Wir sind … gegangen.", "Wir sind früh wegen des Regens nach Hause gegangen.", ["Wir sind früh wegen des Regens nach Hause gegangen.", "Wir sind wegen des Regens früh nach Hause gegangen.", "Wegen des Regens sind wir früh nach Hause gegangen."], "Tiempo y causa adelante, la dirección pegada al participio."),
        ty(1, "Negá toda la oración.", "Ich habe den Film gesehen.", "Ich habe den Film nicht gesehen.", note="Después del objeto, antes del participio."),
        ty(1, "Negá toda la oración.", "Er wartet auf seine Freundin.", "Er wartet nicht auf seine Freundin.", note="*nicht* va antes del objeto con preposición (*auf …*)."),
        ty(1, "Negá toda la oración.", "Sie kommt morgen mit.", "Sie kommt morgen nicht mit.", note="Después del tiempo, antes del prefijo separable."),
        tr(1, "Mañana voy en tren a Berlín.", "Ich fahre morgen mit dem Zug nach Berlin.", ["Ich fahre morgen mit dem Zug nach Berlin.", "Morgen fahre ich mit dem Zug nach Berlin."], "Te – Mo – Lo: el tiempo temprano, el destino al final."),
        tr(1, "No lo hice yo, sino mi hermano.", "Nicht ich habe das gemacht, sondern mein Bruder.", V("Nicht ich habe das gemacht, sondern mein Bruder.", "Nicht ich habe es gemacht, sondern mein Bruder.", "Das habe nicht ich gemacht, sondern mein Bruder."), "Negación de una parte: *nicht* delante de *ich*, y *sondern*."),
        tr(1, "No me interesa el fútbol.", "Ich interessiere mich nicht für Fußball.", ["Ich interessiere mich nicht für Fußball.", "Fußball interessiert mich nicht.", "Für Fußball interessiere ich mich nicht."], "*nicht* antes del objeto con preposición."),
        # parte 2 — foco, Vorfeld y Nachfeld
        ch(2, "¿Qué es correcto?", "(La película ya la vi.)", "Den Film habe ich schon gesehen.", ["Den Film habe ich schon gesehen.", "Den Film habe ich ihn schon gesehen.", "Den Film ich habe schon gesehen."], "En alemán no se duplica el objeto adelantado («la película **la** vi»)."),
        ch(2, "Elegí el verbo.", "Gestern ___ viele Leute zum Konzert.", "kamen", ["kamen", "es kamen", "kam es"], "Si otro elemento ocupa el Vorfeld, el *es* de relleno desaparece."),
        ch(2, "¿Cuál suena mejor?", "(Conocí a una mujer que habla seis idiomas.)", "Ich habe eine Frau kennengelernt, die sechs Sprachen spricht.", ["Ich habe eine Frau kennengelernt, die sechs Sprachen spricht.", "Ich habe kennengelernt eine Frau, die sechs Sprachen spricht.", "Ich habe eine Frau die sechs Sprachen spricht kennengelernt."], "La relativa va al Nachfeld, detrás del participio; el objeto se queda adentro."),
        ch(2, "¿Qué destaca la oración?", "Dem Chef habe ich das nicht gesagt.", "que justamente al jefe no se lo dije", ["que justamente al jefe no se lo dije", "que el jefe no dijo nada", "que nadie le dijo nada al jefe"], "El dativo en el Vorfeld es el tema contrastado: «al jefe, no se lo dije»."),
        ch(2, "¿Cuál suena más natural?", "(Ganó más de lo que esperábamos.)", "Sie hat mehr verdient, als wir erwartet hatten.", ["Sie hat mehr verdient, als wir erwartet hatten.", "Sie hat mehr, als wir erwartet hatten, verdient.", "Sie hat, als wir erwartet hatten, mehr verdient."], "La comparación con *als* va al Nachfeld, después del participio."),
        ch(2, "¿Qué es lo nuevo (el foco)?", "Er hat den Wagen letzte Woche einem Kollegen verkauft.", "a quién lo vendió", ["a quién lo vendió", "qué vendió", "cuándo lo vendió"], "Lo último del campo medio, antes del participio, es el foco."),
        cz(2, "Escribí la palabra que llena el Vorfeld.", "___ fehlen noch drei Unterschriften.", "Es", note="*es* de relleno; el sujeto real es *drei Unterschriften*, por eso *fehlen* en plural."),
        cz(2, "Escribí la palabra de la comparación.", "Die Reise hat länger gedauert, ___ wir gedacht hatten.", "als", note="Comparativo + *als*, en el Nachfeld."),
        tr(2, "La película ya la vi; el libro, todavía no.", "Den Film habe ich schon gesehen, das Buch noch nicht.", V("Den Film habe ich schon gesehen, das Buch noch nicht.", "Den Film habe ich schon gesehen, aber das Buch noch nicht.", "Den Film habe ich bereits gesehen, das Buch noch nicht."), "Objeto en el Vorfeld para contrastar, sin pronombre que lo repita."),
        tr(2, "Ayer conocí a un hombre que te conoce.", "Gestern habe ich einen Mann kennengelernt, der dich kennt.", V("Gestern habe ich einen Mann kennengelernt, der dich kennt.", "Ich habe gestern einen Mann kennengelernt, der dich kennt.", "Gestern habe ich einen Mann getroffen, der dich kennt.", "Ich habe gestern einen Mann getroffen, der dich kennt."), "La relativa, al Nachfeld."),
        tr(2, "Que él se mude me sorprendió.", "Dass er umzieht, hat mich überrascht.", V("Dass er umzieht, hat mich überrascht.", "Es hat mich überrascht, dass er umzieht.", "Mich hat überrascht, dass er umzieht."), "La subordinada entera puede ocupar el Vorfeld; si va al final, el *es* toma su lugar."),
        tr(2, "Justo hoy llueve.", "Ausgerechnet heute regnet es.", ["Ausgerechnet heute regnet es.", "Es regnet ausgerechnet heute."], "*ausgerechnet* + lo destacado: «justo hoy», con fastidio."),
        ty(2, "Empezá con el objeto para contrastar.", "Ich habe den Brief gelesen. → Den Brief …", "Den Brief habe ich gelesen.", note="Objeto en el Vorfeld, verbo segundo, sujeto detrás."),
        ty(2, "Empezá con *Gestern*.", "Es kamen viele Gäste.", "Gestern kamen viele Gäste.", note="El *es* de relleno desaparece cuando otro elemento ocupa el Vorfeld."),
        li(2, "ausgerechnet", ["ausgerechnet", "ausgezeichnet", "ausgerichtet"], "*ausgerechnet* = justo, precisamente (*ausgezeichnet* = excelente)."),
    ],
}
