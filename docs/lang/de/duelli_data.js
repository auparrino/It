/*
 * Duelos de Weg C1: dos formas que compiten.  Solo los datos: la lógica
 * (sesión, pista, lados) está en el núcleo, docs/js/duelli.js, que lee
 * window.DUELLI_DATA.
 *
 * Intercalar funciona cuando las categorías se parecen entre sí (Brunmair &
 * Richter 2019, g = 0,42, y más cuanto más parecidas); pedir que expliques
 * por qué suma (Bisra et al. 2018, g = 0,55).  Cada oración trae la pista
 * que decide («cue», un pedazo de la oración): después de elegir la forma,
 * «¿qué te lo dijo?».  Cada duelo se abre cuando las dos formas ya se
 * enseñaron («week», según docs/lang/de/data/course.json).
 *
 * Los ocho duelos del alemán para hispanohablantes: nicht/kein (semana 4),
 * haben/sein en el Perfekt (12), dem/den con las preposiciones de dos casos
 * (14), weil/denn (18), seit/vor (20), als/wenn (21), dass/das (24, con el
 * relativo) y wurde/würde (27, con la pasiva).
 */
(function (root) {
  "use strict";

  // s: la oración con ___; a: la forma correcta; b: la que compite;
  // cue: lo que decide (un pedazo de la oración); why: la regla en una línea;
  // k: el lado del duelo (0 = la primera forma del título, 1 = la segunda).
  // Los ítems nuevos van al final: el repaso guarda las tarjetas por índice.
  function A(s, a, b, cue, why) { return { s: s, a: a, b: b, cue: cue, why: why, k: 0 }; }
  function B(s, a, b, cue, why) { return { s: s, a: a, b: b, cue: cue, why: why, k: 1 }; }

  var DUELLI = [
    // Semana 4: «kein niega sustantivos con ein o sin artículo; nicht, todo
    // lo demás».  Solo presente, haben, sein y möchte; nada de posesivos ni
    // de es gibt (llegan en la 10).
    { id: "nichtkein", week: 4, title: "nicht o kein", sub: "¿negás un sustantivo con ein (o sin artículo) o todo lo demás?", items: [
      A("Ich wohne ___ in Berlin.", "nicht", "kein", "in Berlin", "Negás un lugar (*in Berlin*), no un sustantivo que iría con *ein*: *nicht*."),
      B("Ich habe ___ Auto.", "kein", "nicht", "Auto", "*Ich habe ein Auto* → *kein Auto*: el sustantivo que va con *ein* se niega con *kein*, no con *nicht*."),
      A("Das Hotel ist ___ teuer.", "nicht", "kein", "teuer", "*teuer* es un adjetivo, no un sustantivo: se niega con *nicht*."),
      B("Wir haben ___ Zeit.", "keine", "nicht", "Zeit", "*Zeit* va sin artículo (*Wir haben Zeit*): sustantivo sin artículo → *kein*; femenino, *keine*."),
      A("Ich komme ___ aus Spanien.", "nicht", "kein", "aus Spanien", "Negás de dónde venís (*aus Spanien*), no un sustantivo con *ein*: *nicht*."),
      B("Mein Vater möchte ___ Kaffee.", "keinen", "nicht", "Kaffee", "*Kaffee* sin artículo → *kein*; es *der Kaffee* y está en acusativo: *keinen*, como *einen*."),
      A("Mein Bruder arbeitet heute ___.", "nicht", "kein", "arbeitet", "Negás la acción entera (*arbeitet*), no un sustantivo: *nicht*, al final."),
      B("Das ist ___ Problem.", "kein", "nicht", "Problem", "*Das ist ein Problem* → *Das ist kein Problem*: «no es ningún problema» se dice con *kein*."),
      A("Das ist ___ der Bus nach Köln.", "nicht", "kein", "der Bus", "Con artículo determinado (*der Bus*) no va *kein*: se niega con *nicht*. *kein* reemplaza solo a *ein* o a la nada."),
      B("Ich habe heute ___ Hunger.", "keinen", "nicht", "Hunger", "*Hunger haben* va sin artículo → *kein*; *der Hunger*, en acusativo: *keinen*. «Nicht Hunger» no se dice."),
      A("Ich trinke den Kaffee ___.", "nicht", "kein", "den Kaffee", "*den Kaffee* lleva artículo determinado: ese café en particular no lo tomás → *nicht*, al final."),
      B("Sie hat ___ Kinder.", "keine", "nicht", "Kinder", "*Kinder*, plural sin artículo (*Sie hat Kinder*) → *kein*; en plural, *keine*."),
      A("Wir verstehen das ___.", "nicht", "kein", "das", "*das* (eso) es un pronombre, no un sustantivo con *ein*: negás el verbo con *nicht*, al final."),
      B("Ich brauche ___ Tasche.", "keine", "nicht", "Tasche", "*eine Tasche* → *keine Tasche*: el sustantivo con *ein* se niega con *kein*, con la misma terminación."),
      A("Anna ist ___ hier.", "nicht", "kein", "hier", "*hier* (acá) es un adverbio, no un sustantivo: *nicht*."),
      B("Max hat ___ Bruder.", "keinen", "nicht", "Bruder", "*einen Bruder* → *keinen Bruder*: *kein* toma las terminaciones de *ein* (masculino, acusativo: *-en*)."),
      A("Der Film ist ___ gut.", "nicht", "kein", "gut", "*gut* es un adjetivo después de *ist*: se niega con *nicht*."),
      B("Wir trinken ___ Bier.", "kein", "nicht", "Bier", "*Bier* sin artículo (*Wir trinken Bier*) → *kein Bier*. «Nicht Bier» solo sirve para corregir: *nicht Bier, sondern Wein*."),
      A("Ich kenne den Mann ___.", "nicht", "kein", "den Mann", "*den Mann* lleva artículo determinado: no conocés a ese hombre → *nicht*, al final."),
      B("Heute brauchst du ___ Jacke.", "keine", "nicht", "Jacke", "*eine Jacke* → *keine Jacke* (no te hace falta ninguna campera): sustantivo con *ein* → *kein*.")
    ] },

    // Semana 12: movimiento de un lugar a otro o cambio de estado → sein
    // (y sein, bleiben, passieren); casi todo lo demás → haben.
    { id: "habensein", week: 12, title: "haben o sein", sub: "en el Perfekt: ¿te movés o cambiás de estado, o hacés otra cosa?", items: [
      A("Ich ___ gestern Pizza gegessen.", "habe", "bin", "gegessen", "*essen* no te lleva de un lugar a otro ni te cambia: Perfekt con *haben*."),
      B("Ich ___ gestern nach Berlin gefahren.", "bin", "habe", "gefahren", "*fahren nach* = ir de un lugar a otro: Perfekt con *sein*."),
      A("Wir ___ den ganzen Tag gearbeitet.", "haben", "sind", "gearbeitet", "*arbeiten* es una actividad, sin movimiento ni cambio: *haben*."),
      B("Wir ___ um sechs Uhr aufgestanden.", "sind", "haben", "aufgestanden", "*aufstehen* es un cambio de estado (de acostado a levantado): *sein*."),
      A("___ du schon Kaffee getrunken?", "Hast", "Bist", "getrunken", "*trinken* lleva objeto (*Kaffee*) y no te mueve: *haben*."),
      B("___ du schon in Wien gewesen?", "Bist", "Hast", "gewesen", "*sein* hace su propio Perfekt con *sein*: *ich bin gewesen*, como *bleiben* y *passieren*."),
      A("Mein Opa ___ lange geschlafen.", "hat", "ist", "geschlafen", "Dormir no te lleva a ningún lado: *haben*. Pero *einschlafen* (dormirse) es un cambio: *ist eingeschlafen*."),
      B("Er ___ am Sonntag zu Hause geblieben.", "ist", "hat", "geblieben", "*bleiben* (quedarse) va con *sein*, aunque no haya movimiento: es uno de los tres que hay que memorizar."),
      A("Sie ___ ein Auto gekauft.", "hat", "ist", "gekauft", "*kaufen* lleva objeto (*ein Auto*): *haben*."),
      B("Sie ___ mit dem Zug gekommen.", "ist", "hat", "gekommen", "*kommen* = llegar de un lugar a otro: *sein*."),
      A("Ihr ___ viel gelernt.", "habt", "seid", "gelernt", "*lernen* es una actividad, sin movimiento ni cambio: *haben*."),
      B("Was ___ gestern im Büro passiert?", "ist", "hat", "passiert", "*passieren* (pasar, ocurrir) va siempre con *sein*: *Was ist passiert?*"),
      A("Ich ___ meine Mutter angerufen.", "habe", "bin", "angerufen", "*anrufen* lleva objeto (*meine Mutter*) y no te mueve: *haben*."),
      B("Ihr ___ sehr spät eingeschlafen.", "seid", "habt", "eingeschlafen", "*einschlafen* = pasar de despierto a dormido, un cambio de estado: *sein*."),
      A("Wir ___ am Samstag Fußball gespielt.", "haben", "sind", "gespielt", "*spielen* es una actividad: *haben*."),
      B("Ich ___ zu Fuß ins Zentrum gegangen.", "bin", "habe", "gegangen", "*gehen* = ir caminando de un lugar a otro: *sein*."),
      A("Was ___ ihr am Wochenende gemacht?", "habt", "seid", "gemacht", "*machen* (hacer) va con *haben*: no dice que te muevas ni que cambies."),
      B("Mein Sohn ___ groß geworden.", "ist", "hat", "geworden", "*werden* (ponerse, volverse) es el cambio de estado por excelencia: *sein*."),
      A("Ich ___ zwei Stunden gewartet.", "habe", "bin", "gewartet", "Esperar es quedarte quieto haciendo algo: *haben*."),
      B("Wir ___ im Juli nach Spanien geflogen.", "sind", "haben", "geflogen", "*fliegen nach* = viajar de un lugar a otro: *sein*.")
    ] },

    // Semana 14: las preposiciones de dos casos.  Solo masculinos, para que
    // compitan dem y den, y sin in/an (que se contraen en im/am).
    { id: "wowohin", week: 14, title: "dem o den", sub: "¿dónde está? (wo?, dativo) o ¿adónde va? (wohin?, acusativo)", items: [
      A("Das Buch liegt auf ___ Tisch.", "dem", "den", "liegt", "*liegen* = estar acostado, quieto en un lugar (*wo?*): dativo, *auf dem Tisch*."),
      B("Ich lege das Buch auf ___ Tisch.", "den", "dem", "lege", "*legen* = poner acostado: el libro va hacia la mesa (*wohin?*), acusativo, *auf den Tisch*."),
      A("Die Flasche steht neben ___ Kühlschrank.", "dem", "den", "steht", "*stehen* = estar parado en un lugar, sin moverse (*wo?*): dativo."),
      B("Er stellt die Flasche neben ___ Kühlschrank.", "den", "dem", "stellt", "*stellen* = poner parado: la botella va hacia ahí (*wohin?*), acusativo."),
      A("Die Katze sitzt unter ___ Tisch.", "dem", "den", "sitzt", "*sitzen* = estar sentado: un lugar (*wo?*), dativo."),
      B("Ich setze das Kind auf ___ Stuhl.", "den", "dem", "setze", "*setzen* = sentar a alguien: lo llevás a la silla (*wohin?*), acusativo."),
      A("Das Bild hängt über ___ Schreibtisch.", "dem", "den", "Das Bild hängt", "*hängen* sin objeto (el cuadro cuelga) es estar en un lugar (*wo?*): dativo."),
      B("Er hängt das Bild über ___ Schreibtisch.", "den", "dem", "hängt das Bild", "*hängen* con objeto (él cuelga el cuadro) es una acción hacia un lugar (*wohin?*): acusativo."),
      A("Der Hund schläft auf ___ Teppich.", "dem", "den", "schläft", "Dormir pasa en un lugar, el perro no va a ningún lado (*wo?*): dativo."),
      B("Sie legt den Brief neben ___ Computer.", "den", "dem", "legt", "*legen* = dejar algo acostado en un lugar: hay movimiento (*wohin?*), acusativo."),
      A("Wir warten vor ___ Bahnhof.", "dem", "den", "warten", "Esperar es quedarse en un lugar (*wo?*): dativo, *vor dem Bahnhof* (delante de la estación)."),
      B("Stell das Fahrrad hinter ___ Baum!", "den", "dem", "Stell", "*Stell!* (imperativo de *stellen*) = poné: la bici va hacia atrás del árbol (*wohin?*), acusativo."),
      A("Das Fahrrad steht hinter ___ Baum.", "dem", "den", "steht", "*stehen*: la bici ya está ahí, quieta (*wo?*): dativo."),
      B("Wir stellen das Sofa neben ___ Schrank.", "den", "dem", "stellen", "*stellen* = poner: el sillón va hacia al lado del ropero (*wohin?*), acusativo."),
      A("Mein Auto steht vor ___ Supermarkt.", "dem", "den", "steht", "*stehen*: el auto está estacionado ahí (*wo?*): dativo."),
      B("Leg die Zeitung auf ___ Stuhl!", "den", "dem", "Leg", "*Leg!* (imperativo de *legen*) = dejá: el diario va hacia la silla (*wohin?*), acusativo."),
      A("Der Schlüssel liegt neben ___ Laptop.", "dem", "den", "liegt", "*liegen*: la llave está ahí, quieta (*wo?*): dativo."),
      B("Ich stelle die Tasche hinter ___ Sessel.", "den", "dem", "stelle", "*stellen* = poner: la cartera va hacia atrás del sillón (*wohin?*), acusativo."),
      A("Die Kinder spielen auf ___ Spielplatz.", "dem", "den", "spielen", "Jugar pasa adentro de un lugar, sin ir hacia él (*wo?*): dativo."),
      B("Wir gehen jetzt auf ___ Spielplatz.", "den", "dem", "gehen", "*gehen auf* = ir hacia la plaza: dirección, destino (*wohin?*), acusativo.")
    ] },

    // Semana 18: weil manda el verbo conjugado al final; denn no mueve nada
    // (y nunca abre la oración).
    { id: "weildenn", week: 18, title: "weil o denn", sub: "¿el verbo se va al final o queda en segundo lugar?", items: [
      A("Ich bleibe zu Hause, ___ ich krank bin.", "weil", "denn", "krank bin", "El verbo conjugado (*bin*) está al final: eso pide *weil*. Con *denn* sería *denn ich bin krank*."),
      B("Ich bleibe zu Hause, ___ ich bin krank.", "denn", "weil", "bin krank", "*bin* va enseguida del sujeto, en segundo lugar, no al final: eso es *denn*, que no mueve el verbo."),
      A("Sie lernt Deutsch, ___ sie in Wien arbeiten möchte.", "weil", "denn", "arbeiten möchte", "*möchte* cierra la oración, detrás del infinitivo: verbo al final, *weil*."),
      B("Sie lernt Deutsch, ___ sie möchte in Wien arbeiten.", "denn", "weil", "möchte in Wien", "*möchte* está en segundo lugar y el infinitivo al final, como en una oración normal: *denn*."),
      A("Wir nehmen ein Taxi, ___ der Bus nicht kommt.", "weil", "denn", "nicht kommt", "*kommt* está al final, después de *nicht*: subordinada con *weil*."),
      B("Wir nehmen ein Taxi, ___ der Bus kommt nicht.", "denn", "weil", "kommt nicht", "*kommt* en segundo lugar, con *nicht* detrás: orden normal, *denn*."),
      A("Er ist müde, ___ er früh aufgestanden ist.", "weil", "denn", "aufgestanden ist", "En el Perfekt, *ist* se va detrás del participio, al final: *weil*."),
      B("Er ist müde, ___ er ist früh aufgestanden.", "denn", "weil", "ist früh", "*ist* en segundo lugar y el participio al final: el Perfekt de siempre, sin tocar. Eso es *denn*."),
      A("Ich rufe dich an, ___ ich eine Frage habe.", "weil", "denn", "Frage habe", "*habe* está al final, después del objeto: *weil*."),
      B("Ich rufe dich an, ___ ich habe eine Frage.", "denn", "weil", "habe eine Frage", "*habe* va en segundo lugar, antes del objeto: *denn* no mueve el verbo."),
      A("___ es regnet, bleiben wir heute drinnen.", "Weil", "Denn", "regnet", "*denn* nunca abre la oración; además *regnet* está al final de su parte: *weil*. Y después, verbo con verbo: *regnet, bleiben*."),
      B("Er trinkt keinen Kaffee, ___ er kann dann nicht schlafen.", "denn", "weil", "kann dann", "*kann* va en segundo lugar y el infinitivo al final: orden normal, *denn*."),
      A("Ich kann nicht kommen, ___ ich arbeiten muss.", "weil", "denn", "arbeiten muss", "El modal (*muss*) se va al final, detrás del infinitivo: *weil*."),
      B("Ich kann nicht kommen, ___ ich muss arbeiten.", "denn", "weil", "muss arbeiten", "El modal (*muss*) en segundo lugar y el infinitivo al final: *denn*."),
      A("Wir gehen früh schlafen, ___ wir morgen früh aufstehen.", "weil", "denn", "aufstehen", "El separable queda entero (*aufstehen*) al final: el verbo se fue al final, *weil*."),
      B("Wir gehen früh schlafen, ___ morgen stehen wir früh auf.", "denn", "weil", "stehen wir", "Después de *denn* va una oración normal: *morgen* en el lugar 1, *stehen* en el 2 y *auf* al final."),
      A("Er trinkt keinen Kaffee, ___ er dann nicht schlafen kann.", "weil", "denn", "schlafen kann", "El modal (*kann*) cierra la oración: *weil*."),
      B("Sie fährt mit dem Rad, ___ das ist billiger.", "denn", "weil", "ist billiger", "*ist* va en segundo lugar, antes de *billiger*: *denn*. Con *weil*: *weil das billiger ist*."),
      A("Sie fährt mit dem Rad, ___ das billiger ist.", "weil", "denn", "billiger ist", "*ist* está al final: *weil*. Con *denn*: *denn das ist billiger*."),
      B("Ich esse heute nichts, ___ ich habe keinen Hunger.", "denn", "weil", "habe keinen", "*habe* va en segundo lugar, antes de *keinen Hunger*: orden normal, *denn*.")
    ] },

    // Semana 20: seit + presente para lo que sigue («hace … que»); vor + pasado
    // para lo que ya pasó («hace … llegué»).
    { id: "seitvor", week: 20, title: "seit o vor", sub: "«hace tres años que…» (y sigue) o «hace tres años» (y ya pasó)", items: [
      A("Ich wohne ___ drei Jahren in Berlin.", "seit", "vor", "wohne", "Seguís viviendo ahí (presente, *wohne*): *seit* = hace tres años que vivo (desde hace). *vor* va con algo que ya terminó."),
      B("Ich bin ___ drei Jahren nach Berlin gekommen.", "vor", "seit", "gekommen", "*bin gekommen*: algo que pasó una vez y terminó → *vor* = hace tres años (llegué)."),
      A("Wir kennen uns ___ zehn Jahren.", "seit", "vor", "kennen", "*kennen* en presente: se conocen desde hace diez años y sigue: *seit*."),
      B("Wir haben uns ___ zehn Jahren kennengelernt.", "vor", "seit", "kennengelernt", "*kennenlernen* (conocerse) pasó un día y terminó: *vor* = hace diez años."),
      A("Sie lernt ___ einem Monat Deutsch.", "seit", "vor", "lernt", "*lernt* en presente: empezó hace un mes y sigue estudiando: *seit*. En castellano, «hace un mes que estudia»."),
      B("Sie hat ___ einem Monat mit dem Kurs angefangen.", "vor", "seit", "angefangen", "*hat angefangen*: el comienzo es un momento que ya pasó → *vor*."),
      A("Ich warte schon ___ einer Stunde hier.", "seit", "vor", "warte schon", "*warte schon* (presente): todavía estás esperando → *seit*. El alemán no usa pasado acá."),
      B("Er hat mich ___ einer Stunde angerufen.", "vor", "seit", "angerufen", "*hat angerufen*: la llamada ya pasó y terminó → *vor*."),
      A("Er arbeitet ___ zwei Wochen in einer Bäckerei.", "seit", "vor", "arbeitet", "*arbeitet* (presente): sigue trabajando ahí → *seit*."),
      B("___ zwei Wochen war ich in Hamburg.", "Vor", "Seit", "war", "*war* (pasado): ya no estás en Hamburgo → *vor* = hace dos semanas."),
      A("___ einer Woche regnet es jeden Tag.", "Seit", "Vor", "regnet", "*regnet* (presente): sigue lloviendo → *seit*."),
      B("Der Zug ist ___ fünf Minuten abgefahren.", "vor", "seit", "abgefahren", "*ist abgefahren*: el tren ya salió, es un momento del pasado → *vor*."),
      A("Ich habe ___ drei Tagen Kopfschmerzen.", "seit", "vor", "habe", "*habe* (presente): te sigue doliendo → *seit* = hace tres días que me duele."),
      B("Ich war ___ drei Tagen beim Arzt.", "vor", "seit", "war", "*war* (pasado): la visita al médico ya pasó → *vor*."),
      A("Wir sind ___ fünf Stunden unterwegs.", "seit", "vor", "unterwegs", "*sind unterwegs* = estamos en viaje, todavía: *seit*."),
      B("___ einer Woche hat es den ganzen Tag geregnet.", "Vor", "Seit", "geregnet", "*hat geregnet*: fue un día del pasado y terminó → *vor*."),
      A("Ich spiele ___ acht Jahren Gitarre.", "seit", "vor", "spiele", "*spiele* (presente): seguís tocando → *seit*."),
      B("Meine Eltern haben ___ 30 Jahren geheiratet.", "vor", "seit", "geheiratet", "*haben geheiratet*: el casamiento fue un día → *vor*. Para lo que sigue: *Sie sind seit 30 Jahren verheiratet*."),
      A("Die Kinder schlafen ___ einer halben Stunde.", "seit", "vor", "schlafen", "*schlafen* (presente): siguen durmiendo → *seit*."),
      B("Ich habe ___ einer halben Stunde gegessen.", "vor", "seit", "gegessen", "*habe gegessen*: la comida ya terminó → *vor* = hace media hora.")
    ] },

    // Semana 21: als para una vez o un período cerrado del pasado; wenn para
    // cada vez que (pasado) y para cuando/si en presente y futuro.
    { id: "alswenn", week: 21, title: "als o wenn", sub: "¿una vez en el pasado, o cada vez / si / cuando ahora o después?", items: [
      A("___ ich klein war, wohnte ich in Córdoba.", "Als", "Wenn", "klein war", "La infancia es un período del pasado que pasó una sola vez: *als*."),
      B("___ ich Zeit habe, gehe ich ins Kino.", "Wenn", "Als", "Zeit habe", "Presente (*habe*): cuando o siempre que tengo tiempo → *wenn*. *als* es solo para el pasado."),
      A("___ ich 2019 nach Berlin kam, sprach ich kein Deutsch.", "Als", "Wenn", "2019", "Un año concreto, una sola llegada: *als*."),
      B("Immer ___ es regnete, blieben wir zu Hause.", "wenn", "als", "Immer", "*Immer* = cada vez: en el pasado, lo que se repite va con *wenn*."),
      A("___ wir letzten Sommer in Rom waren, war es sehr heiß.", "Als", "Wenn", "letzten Sommer", "*letzten Sommer*: un viaje, una vez, en el pasado → *als*."),
      B("Jedes Mal, ___ ich sie besuchte, kochte sie Pasta.", "wenn", "als", "Jedes Mal", "*Jedes Mal* = cada vez que: lo repetido, aunque sea pasado, va con *wenn*."),
      A("___ mein Vater jung war, gab es kein Internet.", "Als", "Wenn", "jung war", "La juventud de tu papá es un período cerrado del pasado: *als*."),
      B("___ du morgen kommst, bring bitte Brot mit.", "Wenn", "Als", "morgen", "*morgen*: futuro → *wenn* (cuando). *als* nunca mira hacia adelante."),
      A("___ das Telefon gestern Abend klingelte, war ich unter der Dusche.", "Als", "Wenn", "gestern Abend", "*gestern Abend*: pasó una vez → *als*."),
      B("Früher gingen wir jedes Mal an den Fluss, ___ wir in Rosario waren.", "wenn", "als", "jedes Mal", "*jedes Mal* = cada vez que estábamos en Rosario: se repite → *wenn*. Con *als* sería una sola estadía."),
      A("___ ich zum ersten Mal Schnee sah, war ich zehn.", "Als", "Wenn", "zum ersten Mal", "*zum ersten Mal*: la primera vez es una sola → *als*."),
      B("Jedes Jahr, ___ ich Geburtstag hatte, backte meine Oma einen Kuchen.", "wenn", "als", "Jedes Jahr", "*Jedes Jahr*: pasaba en cada cumpleaños → *wenn*, aunque sea pasado. *als* sería un solo cumpleaños."),
      A("Wir haben uns kennengelernt, ___ wir an der Uni waren.", "als", "wenn", "an der Uni", "Los años de la facu son un período cerrado del pasado: *als*."),
      B("___ es morgen schön ist, fahren wir ans Meer.", "Wenn", "Als", "morgen", "*morgen*: futuro y condición (si mañana está lindo) → *wenn*."),
      A("___ der Film am Samstag zu Ende war, gingen wir essen.", "Als", "Wenn", "am Samstag", "*am Samstag*: un día concreto, una vez → *als*."),
      B("Ich trinke immer Tee, ___ ich müde bin.", "wenn", "als", "trinke immer", "Presente y costumbre (*trinke immer*): *wenn*."),
      A("Letzte Woche, ___ ich krank war, hat mir mein Bruder geholfen.", "als", "wenn", "Letzte Woche", "*Letzte Woche*: una vez, en el pasado → *als*."),
      B("Jeden Sommer, ___ die Schule zu Ende war, fuhren wir nach Mar del Plata.", "wenn", "als", "Jeden Sommer", "*Jeden Sommer* = cada verano: se repite → *wenn*."),
      A("Sie war sehr glücklich, ___ sie gestern den Job bekam.", "als", "wenn", "gestern", "*gestern*: pasó una vez → *als*."),
      B("___ du willst, können wir heute Abend zusammen kochen.", "Wenn", "Als", "du willst", "*du willst* (presente): «si querés», una condición → *wenn*. *als* no sirve nunca para «si»." )
    ] },

    // Semana 24: dass (conjunción, «que», verbo al final) o das (artículo,
    // pronombre o relativo de un sustantivo neutro).
    { id: "dassdas", week: 24, title: "dass o das", sub: "¿conjunción «que» o artículo / relativo de un sustantivo neutro?", items: [
      A("Ich glaube, ___ er heute kommt.", "dass", "das", "glaube", "Después de *glaube* + coma viene lo que creés, con el verbo al final: conjunción *dass*. No hay ningún sustantivo neutro al que remita."),
      B("Das ist das Buch, ___ ich gerade lese.", "das", "dass", "Buch", "*das Buch* es neutro y lo que sigue habla de él: relativo *das* (= «que», «el cual»), con una sola *s*."),
      A("Sie sagt, ___ sie keine Zeit hat.", "dass", "das", "sagt", "*sagt* + lo que dice: conjunción *dass*."),
      B("Das Kind, ___ dort spielt, ist mein Sohn.", "das", "dass", "Kind", "*das Kind* (neutro) y la relativa habla de él: *das*. Probá con «el cual»: si va, es *das*."),
      A("Ich hoffe, ___ das Wetter morgen gut ist.", "dass", "das", "hoffe", "*hoffe* + lo que esperás: *dass*. El *das* que sigue es el artículo de *das Wetter*."),
      B("___ Auto vor dem Haus gehört meinem Vater.", "Das", "Dass", "Auto", "*Auto* es neutro: el artículo es *das*. *dass* nunca va delante de un sustantivo."),
      A("Weißt du, ___ Anna schwanger ist?", "dass", "das", "Weißt du", "*Weißt du* + lo que sabés: conjunción *dass*, verbo al final."),
      B("Wo ist das Hotel, ___ du gebucht hast?", "das", "dass", "Hotel", "*das Hotel* (neutro): la relativa dice cuál, *das*."),
      A("Es ist wichtig, ___ du jeden Tag übst.", "dass", "das", "wichtig", "*Es ist wichtig* + qué es importante: *dass*, como nuestro «es importante que…»."),
      B("Ich kenne ein Restaurant, ___ sehr gut ist.", "das", "dass", "Restaurant", "*ein Restaurant* (neutro) y la relativa lo describe: *das*, aunque el artículo sea *ein*."),
      A("Ich finde es gut, ___ ihr kommt.", "dass", "das", "finde es gut", "*finde es gut* + lo que te parece bien: *dass*."),
      B("Siehst du ___ Haus da drüben?", "das", "dass", "Haus", "*Haus* es neutro: artículo *das* (acusativo, igual que el nominativo)."),
      A("Er hat gesagt, ___ das Restaurant geschlossen ist.", "dass", "das", "gesagt", "*hat gesagt* + lo que dijo: *dass*. El segundo *das* es el artículo de *Restaurant*."),
      B("Das Fahrrad, ___ ich gekauft habe, war billig.", "das", "dass", "Fahrrad", "*das Fahrrad* (neutro) es el objeto de la relativa: *das* (en neutro, acusativo = nominativo)."),
      A("Schade, ___ du nicht mitkommst.", "dass", "das", "Schade", "*Schade* = qué lástima + lo que da lástima: *dass*."),
      B("Das ist ein Problem, ___ wir lösen müssen.", "das", "dass", "Problem", "*ein Problem* (neutro) es lo que hay que resolver: relativo *das*."),
      A("Ich weiß, ___ das schwer ist.", "dass", "das", "weiß", "*weiß* + lo que sabés: *dass*. Si podés decir «que», es *dass*; si podés decir «el cual» o «eso», es *das*."),
      B("Gib mir bitte ___ Salz.", "das", "dass", "Salz", "*Salz* es neutro: artículo *das*. Delante de un sustantivo nunca va *dass*."),
      A("Wir freuen uns, ___ ihr da seid.", "dass", "das", "freuen uns", "*freuen uns* + de qué: conjunción *dass*, verbo (*seid*) al final."),
      B("Das Zimmer, ___ wir gemietet haben, ist sehr klein.", "das", "dass", "Zimmer", "*das Zimmer* (neutro) y la relativa dice cuál: *das*.")
    ] },

    // Semana 27: wurde (pasiva en pasado o Präteritum de werden, «se hizo,
    // se puso») o würde (Konjunktiv II, nuestro condicional).
    { id: "wurdewuerde", week: 27, title: "wurde o würde", sub: "¿se hizo, se puso (pasado o pasiva) o haría (Konjunktiv II)?", items: [
      A("Das Haus ___ 1912 gebaut.", "wurde", "würde", "gebaut", "Participio al final (*gebaut*): pasiva en pasado, *wurde* = fue construida. *würde* va con infinitivo."),
      B("Ich ___ gern nach Japan reisen.", "würde", "wurde", "reisen", "Infinitivo al final (*reisen*) y un deseo: *würde* = viajaría."),
      A("Das Paket ___ gestern geliefert.", "wurde", "würde", "geliefert", "Participio (*geliefert*) + *gestern*: pasiva en pasado, *wurde*."),
      B("An deiner Stelle ___ ich das nicht machen.", "würde", "wurde", "An deiner Stelle", "*An deiner Stelle* = yo que vos: algo imaginado → *würde* (no lo haría)."),
      A("Es ___ schon dunkel, als wir nach Hause kamen.", "wurde", "würde", "kamen", "Todo pasa en el pasado (*kamen*): *wurde* = se hizo, se puso (oscuro). *würde* sería «se pondría»."),
      B("___ Sie bitte das Fenster schließen?", "Würden", "Wurden", "bitte", "Un pedido amable (*bitte* + infinitivo): *Würden Sie…?* = ¿cerraría…?"),
      A("Mein Bruder ___ 2015 Arzt.", "wurde", "würde", "2015", "Un año del pasado: Präteritum de *werden*, *wurde Arzt* = se recibió de médico."),
      B("Wenn ich Zeit hätte, ___ ich mehr lesen.", "würde", "wurde", "hätte", "*Wenn … hätte*: condición irreal, Konjunktiv II en las dos partes → *würde* lesen."),
      A("Die Fenster ___ letzte Woche repariert.", "wurden", "würden", "repariert", "Participio (*repariert*) + *letzte Woche*: pasiva en pasado, *wurden* (plural)."),
      B("Was ___ du an meiner Stelle tun?", "würdest", "wurdest", "an meiner Stelle", "*an meiner Stelle* = en mi lugar: algo imaginado → *würdest* (¿qué harías?)."),
      A("Der Brief ___ von meiner Oma geschrieben.", "wurde", "würde", "geschrieben", "Participio (*geschrieben*) + *von* (quién lo hizo): pasiva, *wurde*."),
      B("Sie ___ nie so etwas sagen.", "würde", "wurde", "sagen", "Infinitivo al final (*sagen*): *würde* = ella nunca diría algo así. *wurde* nunca va con infinitivo."),
      A("Plötzlich ___ es ganz still im Saal.", "wurde", "würde", "Plötzlich", "*Plötzlich* (de repente) cuenta algo que pasó: *wurde* = se hizo silencio."),
      B("Ohne dich ___ ich das nicht schaffen.", "würde", "wurde", "schaffen", "Infinitivo (*schaffen*) y una condición imaginada (*ohne dich*): *würde* = no lo lograría."),
      A("Die Rechnung ___ schon bezahlt.", "wurde", "würde", "bezahlt", "Participio (*bezahlt*): pasiva en pasado, *wurde* = ya se pagó."),
      B("Es wäre schön, wenn du morgen kommen ___.", "würdest", "wurdest", "wäre schön", "*wäre schön* (sería lindo): todo en Konjunktiv II → *würdest*."),
      A("Gestern ___ das Wetter immer schlechter.", "wurde", "würde", "Gestern", "*Gestern*: pasado → *wurde* (se puso cada vez peor)."),
      B("Wir ___ gern ein Haus am Meer kaufen.", "würden", "wurden", "kaufen", "Infinitivo al final (*kaufen*) y un deseo: *würden* = compraríamos."),
      A("Die Stadt ___ im Krieg zerstört.", "wurde", "würde", "zerstört", "Participio (*zerstört*): pasiva en pasado, *wurde* = fue destruida."),
      B("Mit mehr Geld ___ ich eine Weltreise machen.", "würde", "wurde", "machen", "Infinitivo (*machen*) y algo imaginado (*mit mehr Geld*): *würde* = haría.")
    ] }
  ];

  root.DUELLI_DATA = { DUELLI: DUELLI };
})(typeof window !== "undefined" ? window : globalThis);
