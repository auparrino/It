# -*- coding: utf-8 -*-
"""«Ya puedo…»: lo que tenés que poder hacer al final de cada semana.

Tres o cuatro objetivos por semana, escritos como acciones (a partir de
`fare`, `focus` y la lección de cada semana en curso.py y semanas/), cada
uno atado a uno o dos ítems de esa misma semana (sus ids en course.json).
Se ven al abrir la semana y, al terminar las misiones, la app pregunta
«¿Ya podés…?»: si decís que sí, te lo prueba con esos ítems
(docs/js/puedo.js).

build_course.py lo copia a cada semana como `can: [{t, items}]` y descarta
(con aviso) los ids que ya no estén en la semana.  Test:
tools/lib/test_puedo.js.
"""

CAN = {
    1: [
        ("Saludar y despedirte según la hora y la persona", ["de01-040", "de01-039"]),
        ("Preguntar cómo está alguien, de du o de Sie", ["de01-042", "de01-055"]),
        ("Pedir que te deletreen: Wie schreibt man das?", ["de01-056"]),
        ("Elegir entre du y Sie", ["de01-058", "de01-057"]),
    ],
    2: [
        ("Presentarte: cómo te llamás, de dónde sos, dónde vivís", ["de02-033", "de02-034"]),
        ("Preguntarle a otro su nombre y su origen", ["de02-037", "de02-038"]),
        ("Hacer una pregunta de sí o no con el verbo primero", ["de02-057", "de02-058"]),
        ("Conjugar sein: ich bin, wir sind", ["de02-015", "de02-016"]),
    ],
    3: [
        ("Nombrar cosas con su artículo: der, die, das", ["de03-013", "de03-014"]),
        ("Decir qué es y qué no es algo: ein, kein", ["de03-035", "de03-036"]),
        ("Hablar en plural: die Schlüssel, keine Bücher", ["de03-057", "de03-058"]),
        ("Preguntar dónde está algo: Wo ist der Schlüssel?", ["de03-019", "de03-059"]),
    ],
    4: [
        ("Contar qué hacés: Ich lerne Deutsch, wir arbeiten", ["de04-017", "de04-019"]),
        ("Hablar de tu familia con haben y el acusativo: einen Bruder", ["de04-037", "de04-041"]),
        ("Pedir lo que querrías: Ich möchte einen Hund", ["de04-066", "de04-069"]),
        ("Negar con nicht o con kein", ["de04-067", "de04-068"]),
    ],
    5: [
        ("Preguntar cuánto cuesta algo y entender el precio", ["de05-038", "de05-039"]),
        ("Pedir en el café: Ich hätte gern einen Tee, Ich nehme ein Bier", ["de05-058", "de05-059"]),
        ("Comprar en el mercado y pedir la cuenta", ["de05-060", "de05-061"]),
        ("Decir números al revés: siebenundvierzig", ["de05-014", "de05-012"]),
    ],
    6: [
        ("Decir la hora: Es ist halb zehn", ["de06-037", "de06-038"]),
        ("Contar tu rutina con el tiempo adelante: Am Samstag schlafe ich", ["de06-062", "de06-063"]),
        ("Preguntar cuándo: Wann arbeitest du?", ["de06-064"]),
        ("Usar los verbos que cambian la vocal: isst, sprichst, liest", ["de06-017", "de06-018"]),
    ],
    7: [
        ("Contar qué sabés hacer: Ich kann schwimmen", ["de07-013", "de07-063"]),
        ("Decir qué tenés que hacer: Ich muss heute arbeiten", ["de07-014", "de07-064"]),
        ("Pedir permiso y decir qué está prohibido: darf ich…?, hier darf man nicht", ["de07-038", "de07-040"]),
        ("Decir qué querés hacer: Ich will Deutsch lernen", ["de07-039", "de07-061"]),
    ],
    8: [
        ("Contar tu mañana con verbos separables: Ich stehe um sieben auf", ["de08-013", "de08-015"]),
        ("Decir la hora como en la calle: Viertel nach drei, zehn vor neun", ["de08-040", "de08-041"]),
        ("Invitar y arreglar una cita: Kommst du mit?, Hast du Zeit?", ["de08-053", "de08-056"]),
        ("Rechazar una invitación con amabilidad: Leider kann ich nicht", ["de08-054"]),
    ],
    9: [
        ("Preguntar cómo llegar: Wo ist der Bahnhof?", ["de09-050"]),
        ("Dar indicaciones de Sie: Gehen Sie an der Ampel links", ["de09-051", "de09-052"]),
        ("Pedirle algo a un amigo con el imperativo: Ruf mich an!, Hilf mir!", ["de09-014", "de09-021"]),
        ("Decir en qué viajás: mit dem Bus, mit der U-Bahn", ["de09-034", "de09-035"]),
    ],
    10: [
        ("Decir de quién es algo: meine Küche, deine Tasche", ["de10-013", "de10-015"]),
        ("Decir qué hay: Es gibt einen Balkon", ["de10-028", "de10-030"]),
        ("Describir tu casa: klein, aber gemütlich", ["de10-054", "de10-029"]),
        ("Preguntarle al dueño por el departamento", ["de10-053", "de10-055"]),
    ],
    11: [
        ("Contar qué hiciste ayer: Gestern habe ich gekocht", ["de11-013", "de11-010"]),
        ("Preguntarle a otro qué hizo: Was hast du gemacht?", ["de11-014", "de11-044"]),
        ("Usar los participios irregulares: gesehen, geschlafen", ["de11-029", "de11-024"]),
        ("Contar con separables: Ich habe eingekauft", ["de11-043", "de11-051"]),
    ],
    12: [
        ("Contar adónde fuiste con sein: Ich bin nach Berlin gefahren", ["de12-014", "de12-045"]),
        ("Decir cómo estuvo: Wie war der Urlaub?, Wir hatten Glück", ["de12-029", "de12-030"]),
        ("Contar cuánto te quedaste: Wir waren zwei Wochen am Strand", ["de12-047", "de12-016"]),
        ("Elegir entre haben y sein en el Perfekt", ["de12-046", "de12-008"]),
    ],
    13: [
        ("Regalarle algo a alguien: Ich schenke meiner Mutter ein Buch", ["de13-013", "de13-073"]),
        ("Ofrecer ayuda: Ich helfe dir", ["de13-041", "de13-014"]),
        ("Decir qué te gusta con gefallen y schmecken", ["de13-051", "de13-070"]),
        ("Decir de quién es algo: Der Koffer gehört mir", ["de13-052"]),
    ],
    14: [
        ("Decir dónde está algo (dativo): unter dem Tisch", ["de14-016", "de14-031"]),
        ("Decir adónde va algo (acusativo): in den Kühlschrank", ["de14-030", "de14-032"]),
        ("Pedir que pongan algo en su lugar: Stell die Flasche…!", ["de14-033", "de14-048"]),
        ("Contar una mudanza: Wir sind nach Berlin umgezogen", ["de14-047", "de14-049"]),
    ],
    15: [
        ("Describir la ropa con el adjetivo: die grüne Jacke", ["de15-014", "de15-016"]),
        ("Decir cuál te llevás: Ich nehme das weiße Hemd", ["de15-056", "de15-015"]),
        ("Preguntar cuál: Welche Jacke gefällt dir?", ["de15-030", "de15-032"]),
        ("Pedir probarte algo y quejarte del precio", ["de15-054", "de15-055"]),
    ],
    16: [
        ("Comparar dos ciudades o dos climas: größer als, wärmer als", ["de16-014", "de16-051"]),
        ("Decir que dos cosas son iguales: so groß wie", ["de16-016"]),
        ("Decir qué preferís y qué te gusta más: lieber, am liebsten", ["de16-030", "de16-052"]),
        ("Decir lo mejor: die beste Pizza", ["de16-031", "de16-032"]),
    ],
    17: [
        ("Decir qué te duele: Mir tut der Kopf weh", ["de17-013", "de17-015"]),
        ("Contar qué te pasa: Ich habe Fieber, ich habe mich erkältet", ["de17-014", "de17-035"]),
        ("Decir cómo te sentís: Ich fühle mich gut, wie fühlst du dich?", ["de17-034", "de17-037"]),
        ("Pasar el consejo del médico con sollen", ["de17-058", "de17-060"]),
    ],
    18: [
        ("Explicar por qué con weil y el verbo al final", ["de18-013", "de18-014"]),
        ("Dar tu opinión con dass: Ich glaube, dass du recht hast", ["de18-040", "de18-041"]),
        ("Poner una condición con wenn", ["de18-057", "de18-059"]),
        ("Sacar una consecuencia con deshalb", ["de18-020", "de18-021"]),
    ],
    19: [
        ("Decir de qué trabajás y dónde: Ich arbeite bei einer kleinen Firma", ["de19-012", "de19-014"]),
        ("Preguntar la profesión de Sie: Was sind Sie von Beruf?", ["de19-013"]),
        ("Describir tu trabajo con el adjetivo: ein interessanter Beruf", ["de19-030", "de19-033"]),
        ("Leer un aviso de empleo: ein gutes Gehalt, flexible Arbeitszeiten", ["de19-046", "de19-029"]),
    ],
    20: [
        ("Decir para quién o sin qué: für dich, ohne Milch", ["de20-013", "de20-014"]),
        ("Decir adónde vas: zur Post, nach Hause", ["de20-030", "de20-032"]),
        ("Decir desde cuándo: seit drei Jahren", ["de20-044", "de20-046"]),
        ("Hacer un trámite en el correo: ein Paket nach Deutschland schicken", ["de20-045"]),
    ],
    21: [
        ("Contar tu infancia: Als ich klein war, wohnte ich…", ["de21-057", "de21-014"]),
        ("Decir qué podías o tenías que hacer: konnte, mussten", ["de21-013", "de21-015"]),
        ("Contar cómo era antes: Früher gab es keine Handys", ["de21-059", "de21-030"]),
        ("Distinguir als de wenn: immer wenn es regnete", ["de21-058"]),
    ],
    22: [
        ("Decir qué esperás o en qué pensás: Ich warte auf dich, sie denkt an", ["de22-014", "de22-017"]),
        ("Decir qué te interesa o te alegra: Ich interessiere mich für, ich freue mich", ["de22-018", "de22-051"]),
        ("Preguntar con wo-: Worauf wartest du?, Worum geht es?", ["de22-034", "de22-036"]),
        ("Responder sin repetir: Ich denke daran", ["de22-052", "de22-054"]),
    ],
    23: [
        ("Contar planes y suposiciones con werden", ["de23-012", "de23-013"]),
        ("Decir qué tratás o tenés ganas de hacer: zu + infinitivo", ["de23-031", "de23-032"]),
        ("Decir para qué: um … zu", ["de23-045", "de23-046"]),
        ("Contar un propósito: Ich habe mir vorgenommen…", ["de23-047", "de23-064"]),
    ],
    24: [
        ("Describir a alguien con una relativa: einen Bruder, der in Mendoza wohnt", ["de24-014", "de24-008"]),
        ("Usar el relativo en acusativo: der Kaffee, den ich trinke", ["de24-015", "de24-009"]),
        ("Usar el relativo con preposición: mit dem ich gereist bin", ["de24-028", "de24-029"]),
        ("Definir una palabra que no sabés: jemand, der Taxi fährt", ["de24-049", "de24-048"]),
    ],
    25: [
        ("Decir qué harías: Ich würde gern reisen", ["de25-013", "de25-014"]),
        ("Imaginar: Wenn ich reich wäre, würde ich reisen", ["de25-027", "de25-028"]),
        ("Dar un consejo sin sonar mandón: du solltest, an deiner Stelle", ["de25-050", "de25-052"]),
        ("Pedir algo con amabilidad: Könnten Sie das wiederholen?", ["de25-051", "de25-058"]),
    ],
    26: [
        ("Decir de quién es algo con el genitivo: das Auto meines Vaters", ["de26-013", "de26-017"]),
        ("Explicar por qué se cancela algo: wegen des Streiks, trotz des Regens", ["de26-042", "de26-043"]),
        ("Preguntar con cortesía en la ventanilla: Wissen Sie, wann…?", ["de26-056", "de26-058"]),
        ("Preguntar si algo es así: Ich würde gern wissen, ob…", ["de26-065", "de26-057"]),
    ],
    27: [
        ("Explicar cómo se recicla con la pasiva: Der Müll wird getrennt", ["de27-012", "de27-013"]),
        ("Pasar de man a la pasiva: Die Umwelt wird geschützt", ["de27-014", "de27-048"]),
        ("Contar lo que se hizo: Die Fabrik wurde 1990 gebaut", ["de27-031", "de27-032"]),
        ("Describir un proceso paso a paso: Zuerst werden die Flaschen gewaschen", ["de27-046", "de27-045"]),
    ],
    28: [
        ("Contar lo que ya había pasado: Ich hatte schon gegessen", ["de28-012", "de28-013"]),
        ("Ordenar dos hechos: nachdem, bevor", ["de28-027", "de28-028"]),
        ("Contar una vida: während, seitdem", ["de28-041", "de28-042"]),
        ("Hablar de lo que viene: sobald du ankommst, bis ich zurückkomme", ["de28-064", "de28-043"]),
    ],
    29: [
        ("Elegir entre dos opciones: entweder … oder", ["de29-012", "de29-007"]),
        ("Descartar las dos: weder … noch", ["de29-013", "de29-014"]),
        ("Sumar: nicht nur … sondern auch, sowohl … als auch", ["de29-028", "de29-027"]),
        ("Decir «cuanto más…, más…»: je mehr, desto", ["de29-044", "de29-047"]),
    ],
    30: [
        ("Decir qué habrías hecho: Ich hätte das nicht gemacht", ["de30-012", "de30-013"]),
        ("Imaginar el pasado: Wenn ich das gewusst hätte…", ["de30-027", "de30-035"]),
        ("Lamentar algo: Hätte ich doch mehr gelernt!", ["de30-028", "de30-029"]),
        ("Decir «como si»: als ob er reich wäre", ["de30-053", "de30-052"]),
    ],
    31: [
        ("Decir qué hay que hacer: Der Drucker muss repariert werden", ["de31-012", "de31-014"]),
        ("Entender un cartel: Hier darf nicht geparkt werden", ["de31-013", "de31-007"]),
        ("Contar qué ya se arregló: ist repariert worden", ["de31-027", "de31-029"]),
        ("Describir cómo quedó algo: Das Büro ist geschlossen", ["de31-041", "de31-044"]),
    ],
    32: [
        ("Tomar una decisión en una reunión: eine Entscheidung treffen", ["de32-014", "de32-010"]),
        ("Pedir la palabra: Darf ich eine Frage stellen?", ["de32-015", "de32-009"]),
        ("Pedir que te avisen: Sag mir bitte Bescheid", ["de32-030"]),
        ("Poner algo a disposición o descartarlo: zur Verfügung, kommt nicht in Frage", ["de32-031", "de32-032"]),
    ],
    33: [
        ("Describir con el participio I: der schlafende Hund", ["de33-013", "de33-009"]),
        ("Describir con el participio II: die geschlossene Tür", ["de33-030", "de33-032"]),
        ("Describir un cuadro: eine lesende Frau", ["de33-046"]),
        ("Decir cómo hizo algo alguien: Sie kam lachend herein", ["de33-045"]),
    ],
    34: [
        ("Decir «aunque» con obwohl y el verbo al final", ["de34-012", "de34-046"]),
        ("Decir «igual» con trotzdem y el verbo justo después", ["de34-013"]),
        ("Dar causa y consecuencia: weil, deshalb", ["de34-028", "de34-047"]),
        ("Decir «tan… que»: so müde, dass", ["de34-029", "de34-033"]),
    ],
    35: [
        ("Contar lo que alguien dice con el Konjunktiv I: er sei krank", ["de35-014", "de35-015"]),
        ("Contar lo que alguien dijo en pasado: er habe nichts gesehen", ["de35-030", "de35-032"]),
        ("Usar el Konjunktiv II cuando el I no se distingue: sie hätten", ["de35-031"]),
        ("Contar una pregunta o un pedido: ob er Zeit habe, ich solle", ["de35-045", "de35-046"]),
    ],
    36: [
        ("Leer un atributo de participio: die von ihm geschriebene Mail", ["de36-013", "de36-027"]),
        ("Pasar el participio a una relativa", ["de36-029", "de36-030"]),
        ("Condensar una relativa en un participio: der abgefahrene Zug", ["de36-044"]),
        ("Escribir una noticia en Präteritum: Die Partei verlor die Wahl", ["de36-048", "de36-043"]),
    ],
    37: [
        ("Suponer con certeza: Er muss zu Hause sein", ["de37-014", "de37-045"]),
        ("Decir que algo es imposible: Das kann nicht wahr sein", ["de37-015", "de37-049"]),
        ("Contar un rumor: Er soll im Lotto gewonnen haben", ["de37-028", "de37-031"]),
        ("Dudar de lo que alguien dice de sí: Er will unschuldig sein", ["de37-029", "de37-032"]),
    ],
    38: [
        ("Pasar un verbo a sustantivo: entwickeln, die Entwicklung", ["de38-008", "de38-015"]),
        ("Escribir en estilo nominal: der Anstieg der Temperatur", ["de38-029", "de38-030"]),
        ("Usar preposiciones en vez de subordinadas: während der Messung, nach der Analyse", ["de38-047", "de38-048"]),
        ("Nombrar un tema de investigación: die Erforschung des Klimas", ["de38-032"]),
    ],
    39: [
        ("Negar o dar vuelta con prefijos: unzufrieden, ein Missverständnis", ["de39-013", "de39-014"]),
        ("Formar sustantivos: die Prüfung, die Dankbarkeit", ["de39-029", "de39-030"]),
        ("Formar adjetivos: machbar, kostenlos", ["de39-047", "de39-046"]),
        ("Usar los verbos con prefijo inseparable: verbessern, übersetzt", ["de39-015", "de39-053"]),
    ],
    40: [
        ("Decir que algo se puede hacer: Das lässt sich machen", ["de40-017", "de40-015"]),
        ("Leer un aviso con -bar: telefonisch erreichbar", ["de40-016"]),
        ("Entender lo que hay que hacer: Das Formular ist zu unterschreiben", ["de40-033", "de40-029"]),
        ("Decirlo simple con man: Als Verbraucher hat man Rechte", ["de40-049", "de40-045"]),
    ],
    41: [
        ("Dar la causa por escrito: aufgrund der Krise", ["de41-020", "de41-019"]),
        ("Referirte a un tema en un mail: bezüglich Ihrer Anfrage, hinsichtlich", ["de41-035", "de41-034"]),
        ("Citar una fuente: dem Bericht zufolge", ["de41-052", "de41-050"]),
        ("Poner plazos y lugares: innerhalb von 30 Tagen, außerhalb der Geschäftszeiten", ["de41-051", "de41-053"]),
    ],
    42: [
        ("Contraponer dos posturas: einerseits, andererseits; während", ["de42-012", "de42-011"]),
        ("Matizar: allerdings, dennoch", ["de42-026", "de42-027"]),
        ("Dar tu opinión: Meiner Meinung nach…", ["de42-043", "de42-045"]),
        ("Contradecir con elegancia: Das sehe ich anders; die Jugendlichen hingegen", ["de42-044", "de42-013"]),
    ],
    43: [
        ("Describir a alguien que actúa como si nada: als ob", ["de43-011", "de43-012"]),
        ("Reprochar lo que no se hizo: Du hättest anrufen sollen", ["de43-027", "de43-029"]),
        ("Lamentar una oportunidad: Wir hätten gewinnen können", ["de43-028", "de43-054"]),
        ("Anunciar la excepción a un plan: es sei denn", ["de43-042", "de43-044"]),
    ],
    44: [
        ("Desear suerte y festejarla: Ich drücke dir die Daumen, Schwein gehabt", ["de44-012", "de44-014"]),
        ("Decir que no entendés nada o que te toman el pelo", ["de44-027", "de44-028"]),
        ("Decir que estás harto o que alguien dio en el clavo", ["de44-013", "de44-029"]),
        ("Usar un refrán: Übung macht den Meister", ["de44-042", "de44-050"]),
    ],
    45: [
        ("Abrir una carta formal: Sehr geehrte Frau Weber,", ["de45-013"]),
        ("Reclamar o rescindir: Ich wende mich an Sie, weil…; Hiermit kündige ich", ["de45-032", "de45-012"]),
        ("Pedir con cortesía formal: Ich wäre Ihnen dankbar, wenn…", ["de45-055", "de45-056"]),
        ("Ofrecerte y cerrar: Sollten Sie Fragen haben…", ["de45-034", "de45-035"]),
    ],
    46: [
        ("Suavizar un pedido con mal y doch: Komm doch mal vorbei!", ["de46-045", "de46-011"]),
        ("Reprochar con onda: Du weißt es doch schon!", ["de46-014", "de46-012"]),
        ("Resignarte: Das ist halt so", ["de46-028", "de46-023"]),
        ("Preguntar con interés y tranquilizar: Wie heißt du denn?, Das wird schon klappen", ["de46-043", "de46-030"]),
    ],
    47: [
        ("Ordenar dos pronombres: Ich erkläre es dir", ["de47-013", "de47-016"]),
        ("Ordenar los objetos: Ich habe meiner Mutter das Foto gezeigt", ["de47-015", "de47-014"]),
        ("Ordenar tiempo, modo y lugar: am Samstag mit Freunden ins Kino", ["de47-032", "de47-027"]),
        ("Negar justo lo que querés: Nicht ich, sondern mein Bruder", ["de47-033", "de47-034"]),
    ],
    48: [
        ("Hablar de emociones con la preposición justa: stolz auf, Angst vor", ["de48-015", "de48-031"]),
        ("Decir que estás de acuerdo o convencido: einverstanden mit, davon überzeugt", ["de48-016", "de48-017"]),
        ("Nombrar un vínculo: das Vertrauen in, das Interesse an", ["de48-033", "de48-029"]),
        ("Usar el genitivo culto: Ich bin mir meiner Verantwortung bewusst", ["de48-048", "de48-047"]),
    ],
    49: [
        ("Escribir sin «yo»: Es wird angenommen, dass…", ["de49-013", "de49-014"]),
        ("Presentar un tema: Es handelt sich um…", ["de49-015"]),
        ("Decir lo que hay que hacer en estilo académico: sind zu prüfen", ["de49-028", "de49-031"]),
        ("Usar fórmulas del registro alto: in Betracht ziehen, zur Diskussion stehen", ["de49-046", "de49-045"]),
    ],
    50: [
        ("Retomar toda una idea: was, womit, dies", ["de50-013", "de50-016"]),
        ("Ordenar un texto: zunächst, darüber hinaus", ["de50-031", "de50-028"]),
        ("Resumir un artículo: Der Artikel befasst sich mit…", ["de50-045", "de50-043"]),
        ("Referir lo que dice un autor: Der Autor schreibt, die Lage sei ernst", ["de50-044", "de50-046"]),
    ],
    51: [
        ("Entender a un austríaco: heuer, Erdäpfel", ["de51-014", "de51-012"]),
        ("Entender a un suizo: parkieren, grillieren", ["de51-029", "de51-027"]),
        ("Esquivar falsos amigos: Firma, Fitnessstudio, Nachricht", ["de51-044", "de51-045"]),
        ("Entender el alemán hablado: Haste Zeit?", ["de51-043"]),
    ],
    52: [
        ("Imaginar el pasado: Wenn ich Zeit gehabt hätte…", ["de52-016"]),
        ("Citar con el Konjunktiv I: Sie sagt, sie komme morgen", ["de52-015", "de52-055"]),
        ("Encadenar con el conector justo: obwohl, je mehr … desto", ["de52-032", "de52-033"]),
        ("Opinar y pedir en el oral del examen", ["de52-047", "de52-048"]),
    ],
}
