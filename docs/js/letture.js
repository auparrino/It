/*
 * Le letture: "Martín a Bologna", una serie a puntate graduata da A1 a B2.
 *
 * Input comprensibile (Krashen 1985): testi appena sopra il livello, con le
 * parole meno frequenti glossate perché la copertura resti vicina al 98%
 * che serve per capire senza fatica (Hu & Nation 2000).  Ogni puntata usa la
 * grammatica di quel punto del percorso, e finisce con una "caccia" alle
 * forme: notare la forma dentro un testo che hai già capito (Schmidt 1990).
 * La storia continua: la voglia di sapere come va a finire è motivazione.
 *
 * Ogni puntata: testo, glossario {parola: significato}, domande di
 * comprensione (in castellano, sul significato) e una caccia {label, targets}
 * dove targets sono le parole esatte (minuscole) da trovare nel testo.
 */
(function (root) {
  "use strict";

  var EPISODI = [
    { id: "ep1", week: 1, n: 1, level: "A1", emoji: "🧳", title: "Arrivo a Bologna",
      grammar: "essere e avere",
      // Day one: only essere, avere and words you can guess (argentino,
      // grande, piccolo).  Short sentences, one idea each.
      text:
        "Ciao! Io sono Martín. Sono argentino e ho 32 anni. " +
        "Oggi sono a Bologna!\n\n" +
        "Bologna è bella. Ho una valigia grande e uno zaino piccolo. " +
        "La casa è in via Zamboni. È piccola ma bella. Ho una mappa e un telefono: " +
        "la mappa è grande, il telefono è piccolo.\n\n" +
        "Giulia è la mia coinquilina. È di Napoli e ha 28 anni. " +
        "È molto simpatica. Giulia ha un gatto. Il gatto è nero e bello. " +
        "Io sono stanco, ma sono contento!",
      gloss: { oggi: "hoy", bella: "linda", valigia: "valija", zaino: "mochila",
               coinquilina: "compañera de departamento", mia: "mi (la mia = mi)",
               ma: "pero", mappa: "mapa", gatto: "gato", nero: "negro", stanco: "cansado", contento: "contento, feliz", molto: "muy" },
      questions: [
        ["¿De dónde es Giulia?", ["de Nápoles", "de Bolonia", "de Buenos Aires", "de Roma"], "de Nápoles"],
        ["¿Cómo es la casa?", ["chica pero linda", "grande y fea", "lejos del centro", "en Nápoles"], "chica pero linda"],
        ["¿Cómo está Martín?", ["cansado pero contento", "triste", "enojado", "enfermo"], "cansado pero contento"]
      ],
      hunt: { label: "Tocá todas las formas de essere (sono, è)", targets: ["sono", "è"] } },

    { id: "ep2", week: 5, n: 2, level: "A1", emoji: "🧀", title: "Al mercato",
      grammar: "presente e articoli",
      text:
        "Il sabato mattina Giulia e Martín vanno al Mercato di Mezzo. Giulia compra " +
        "sempre il pane fresco e la frutta. Martín guarda tutto con curiosità: ci sono " +
        "tortellini, mortadella e formaggi di ogni tipo.\n\n" +
        "«Cosa prendi?» chiede Giulia.\n" +
        "«Non lo so. Tutto sembra buonissimo!» risponde Martín.\n\n" +
        "Il signore del banco sorride e taglia un pezzo di parmigiano. «Questo è " +
        "stagionato trenta mesi. Lo vuole provare?» Martín mangia e chiude gli occhi. " +
        "«Mamma mia! Prendo mezzo chilo!»\n\n" +
        "Giulia ride: «Benvenuto in Emilia-Romagna. Qui si mangia bene, ma si spende " +
        "anche tanto.»",
      gloss: { banco: "puesto (del mercado)", taglia: "corta", pezzo: "pedazo",
               stagionato: "estacionado, curado", provare: "probar",
               occhi: "ojos", ride: "se ríe", spende: "gasta", sembra: "parece" },
      questions: [
        ["¿Qué compra siempre Giulia?", ["pan fresco y fruta", "queso y mortadela", "tortellini", "vino"], "pan fresco y fruta"],
        ["¿Qué hace el señor del puesto?", ["le da a probar parmesano", "le cobra de más", "le vende fruta", "no lo atiende"], "le da a probar parmesano"],
        ["¿Qué dice Giulia de la región?", ["se come bien pero se gasta mucho", "es barata", "la comida es mala", "es muy fría"], "se come bien pero se gasta mucho"]
      ],
      hunt: { label: "Tocá las comidas que aparecen", targets:
        ["pane", "frutta", "tortellini", "mortadella", "formaggi", "parmigiano"] } },

    { id: "ep3", week: 12, n: 3, level: "A1", emoji: "⏰", title: "Una giornata tipo",
      grammar: "verbi riflessivi",
      text:
        "Di solito mi sveglio alle sette meno un quarto. Non mi alzo subito: resto " +
        "cinque minuti a letto e guardo il telefono. Poi mi faccio la doccia, mi vesto " +
        "e preparo il caffè con la moka. Giulia invece si alza tardi, perché lavora di " +
        "sera in un ristorante.\n\n" +
        "Esco di casa alle otto e prendo l'autobus numero 13. In ufficio i colleghi " +
        "sono gentili, ma parlano in dialetto quando sono arrabbiati. A pranzo mangio " +
        "un panino al bar sotto l'ufficio.\n\n" +
        "La sera torno a casa stanco, ma felice. Prima di dormire studio l'italiano per " +
        "venti minuti. Mi addormento sempre con il libro in mano.",
      gloss: { resto: "me quedo", letto: "cama", invece: "en cambio",
               tardi: "tarde", colleghi: "compañeros de trabajo", arrabbiati: "enojados",
               pranzo: "almuerzo", stanco: "cansado", addormento: "(me) duermo" },
      questions: [
        ["¿Por qué Giulia se levanta tarde?", ["trabaja de noche en un restaurante", "está enferma", "no tiene trabajo", "estudia de noche"], "trabaja de noche en un restaurante"],
        ["¿Cuándo hablan en dialecto los compañeros?", ["cuando están enojados", "en el almuerzo", "siempre", "con el jefe"], "cuando están enojados"],
        ["¿Qué hace Martín antes de dormir?", ["estudia italiano veinte minutos", "mira series", "llama a su mamá", "sale a correr"], "estudia italiano veinte minutos"]
      ],
      hunt: { label: "Tocá los verbos reflexivos (los que van con mi / si)", targets:
        ["sveglio", "alzo", "faccio", "vesto", "alza", "addormento"] } },

    { id: "ep4", week: 11, n: 4, level: "A2", emoji: "🚆", title: "Gita a Firenze",
      grammar: "passato prossimo",
      text:
        "Sabato scorso Martín e Giulia sono andati a Firenze in treno. Sono partiti " +
        "presto, alle otto, e sono arrivati in un'ora e mezza. Prima hanno visitato il " +
        "Duomo, poi hanno camminato fino a Ponte Vecchio.\n\n" +
        "A pranzo hanno mangiato una bistecca enorme in una trattoria vicino a Santa " +
        "Croce. Martín ha bevuto un bicchiere di Chianti e ha detto: «Questa è la " +
        "bistecca migliore della mia vita». Giulia ha riso: «Perché non hai mai " +
        "assaggiato quella di mia nonna!»\n\n" +
        "Il pomeriggio è stato lungo. Hanno perso il treno delle sei e sono tornati a " +
        "casa a mezzanotte, stanchissimi ma contenti.",
      gloss: { scorso: "pasado", presto: "temprano", camminato: "caminado",
               bistecca: "bife", trattoria: "fonda, restaurante sencillo",
               bicchiere: "vaso", migliore: "mejor", assaggiato: "probado",
               perso: "perdido" },
      questions: [
        ["¿Cómo viajaron a Florencia?", ["en tren", "en auto", "en colectivo", "en avión"], "en tren"],
        ["¿Qué opina Giulia del bife?", ["que el de su abuela es mejor", "que está crudo", "que es carísimo", "que es el mejor de su vida"], "que el de su abuela es mejor"],
        ["¿Por qué volvieron a medianoche?", ["perdieron el tren de las seis", "se quedaron a cenar", "el tren estaba demorado", "se perdieron"], "perdieron el tren de las seis"]
      ],
      hunt: { label: "Tocá los participios del passato prossimo", targets:
        ["andati", "partiti", "arrivati", "visitato", "camminato", "mangiato", "bevuto",
         "detto", "riso", "assaggiato", "stato", "perso", "tornati"] } },

    { id: "ep5", week: 15, n: 5, level: "A2", emoji: "🌊", title: "Quando ero piccola",
      grammar: "imperfetto e passato prossimo",
      text:
        "Una sera Giulia racconta la sua infanzia a Martín.\n\n" +
        "«Quando ero piccola, abitavamo in un palazzo vicino al mare. Mio padre faceva " +
        "il pescatore e usciva ogni notte con la barca. Mia madre cucinava per tutto il " +
        "quartiere: la domenica a pranzo eravamo sempre in venti! Io andavo a scuola a " +
        "piedi e il pomeriggio giocavo a pallone con mio fratello per strada.\n\n" +
        "Un giorno, però, è successa una cosa strana: mio padre è tornato senza pesce, " +
        "ma con un cane bagnato. L'abbiamo chiamato Totò ed è rimasto con noi quindici " +
        "anni.»\n\n" +
        "Martín sorride: «Ecco perché ami tanto i cani!»",
      gloss: { racconta: "cuenta", infanzia: "infancia", pescatore: "pescador",
               barca: "barco, bote", quartiere: "barrio", pallone: "pelota",
               strada: "calle", successa: "pasado, sucedido", bagnato: "mojado",
               rimasto: "quedado" },
      questions: [
        ["¿De qué trabajaba el padre de Giulia?", ["era pescador", "era cocinero", "era maestro", "era taxista"], "era pescador"],
        ["¿Cuántos eran los domingos al mediodía?", ["veinte", "cuatro", "diez", "dos"], "veinte"],
        ["¿Qué trajo el padre un día?", ["un perro mojado", "un pescado enorme", "un gato", "nada"], "un perro mojado"]
      ],
      hunt: { label: "Tocá los verbos en imperfetto (lo que pasaba siempre)", targets:
        ["ero", "abitavamo", "faceva", "usciva", "cucinava", "eravamo", "andavo", "giocavo"] } },

    { id: "ep6", week: 19, n: 6, level: "B1", emoji: "💼", title: "Il colloquio",
      grammar: "futuro semplice",
      text:
        "Lunedì Martín avrà un colloquio importante in un'azienda di Modena che produce " +
        "motori elettrici. Ha paura di non capire le domande, così Giulia lo aiuta a " +
        "prepararsi.\n\n" +
        "«Ti chiederanno perché vuoi lavorare con loro. Tu risponderai che la loro " +
        "tecnologia ti affascina da anni.»\n" +
        "«E se mi faranno domande tecniche?»\n" +
        "«Parlerai lentamente e userai le parole che conosci. Se non capisci, chiederai " +
        "di ripetere: non è una vergogna.»\n\n" +
        "Martín ripassa tutta la domenica. La sera è nervoso: «Domani a quest'ora saprò " +
        "se il mio italiano basta.» Giulia gli prepara una tisana: «Andrà benissimo, " +
        "vedrai.»",
      gloss: { colloquio: "entrevista (de trabajo)", azienda: "empresa",
               affascina: "fascina", lentamente: "despacio", vergogna: "vergüenza",
               ripassa: "repasa", basta: "alcanza", tisana: "té de hierbas" },
      questions: [
        ["¿Qué produce la empresa?", ["motores eléctricos", "autos deportivos", "software", "queso"], "motores eléctricos"],
        ["¿Qué consejo le da Giulia si no entiende?", ["pedir que repitan", "hablar en español", "sonreír y asentir", "cambiar de tema"], "pedir que repitan"],
        ["¿Cómo está Martín el domingo a la noche?", ["nervioso", "tranquilo", "enojado", "aburrido"], "nervioso"]
      ],
      hunt: { label: "Tocá los verbos en futuro", targets:
        ["avrà", "chiederanno", "risponderai", "faranno", "parlerai", "userai",
         "chiederai", "saprò", "andrà", "vedrai"] } },

    { id: "ep7", week: 22, n: 7, level: "B1", emoji: "📞", title: "Com'è andata?",
      grammar: "pronomi diretti, indiretti e combinati",
      text:
        "Martín esce dal colloquio e chiama subito Giulia.\n\n" +
        "«Allora? Com'è andata?»\n" +
        "«Non lo so ancora. Mi hanno fatto tantissime domande. Il direttore mi ha chiesto " +
        "il curriculum, anche se gliel'ho già mandato per email.»\n" +
        "«E tu?»\n" +
        "«Gliel'ho dato un'altra volta, ovviamente, e poi gli ho spiegato il mio " +
        "progetto in Argentina. Gli è piaciuto, credo.»\n" +
        "«Ti hanno detto quando ti rispondono?»\n" +
        "«Me lo diranno entro venerdì.»\n" +
        "«Allora stasera festeggiamo lo stesso. Compro una pizza e te la porto a casa.»\n" +
        "«Portamene due, ho una fame da lupo!»",
      gloss: { subito: "enseguida", ancora: "todavía", chiesto: "pedido",
               spiegato: "explicado", entro: "a más tardar, dentro de",
               festeggiamo: "festejamos", stesso: "(lo stesso) igual, de todos modos" },
      questions: [
        ["¿Qué le pidió el director?", ["el currículum, otra vez", "una carta de recomendación", "que hablara en inglés", "el pasaporte"], "el currículum, otra vez"],
        ["¿Cuándo le van a contestar?", ["a más tardar el viernes", "mañana", "en un mes", "no le dijeron"], "a más tardar el viernes"],
        ["¿Qué pide Martín al final?", ["dos pizzas", "una cerveza", "que Giulia lo llame", "silencio"], "dos pizzas"]
      ],
      hunt: { label: "Tocá los pronombres de objeto indirecto sueltos (mi, ti, gli, me, te)", targets:
        ["mi", "ti", "gli", "me", "te"] } },

    { id: "ep8", week: 20, n: 8, level: "B1", emoji: "✉️", title: "La risposta",
      grammar: "condizionale",
      text:
        "Venerdì mattina arriva la mail: l'azienda di Modena gli offre il posto. Martín " +
        "dovrebbe essere felicissimo, ma è confuso. Il lavoro è ottimo, però " +
        "significa lasciare Bologna, Giulia e i nuovi amici.\n\n" +
        "«Cosa faresti tu al posto mio?» chiede a Giulia.\n" +
        "«Io accetterei subito. Modena è a mezz'ora di treno: potresti venire qui ogni " +
        "fine settimana.»\n" +
        "«Sì, ma mi mancherebbe la vita di qui.»\n" +
        "«Allora non traslocare! Potresti fare il pendolare, come fanno in tanti.»\n\n" +
        "Martín ci pensa tutta la notte. Alle tre scrive un messaggio a sua madre: " +
        "«Mamma, secondo te sarei capace di ricominciare da capo, un'altra volta?»",
      gloss: { posto: "puesto (de trabajo); al posto mio = en mi lugar", ottimo: "excelente", lasciare: "dejar",
               mancherebbe: "extrañaría (me faltaría)",
               traslocare: "mudarse", pendolare: "persona que viaja todos los días al trabajo",
               capo: "(da capo) desde cero", capace: "capaz" },
      questions: [
        ["¿Qué le ofrece la empresa?", ["el puesto", "una beca", "un aumento", "un viaje"], "el puesto"],
        ["¿Qué haría Giulia?", ["aceptaría enseguida", "lo pensaría un mes", "rechazaría la oferta", "se mudaría con él"], "aceptaría enseguida"],
        ["¿Qué alternativa le propone?", ["viajar todos los días en tren", "trabajar desde casa", "volver a Argentina", "buscar otro trabajo"], "viajar todos los días en tren"]
      ],
      hunt: { label: "Tocá los verbos en condizionale", targets:
        ["dovrebbe", "faresti", "accetterei", "potresti", "mancherebbe", "sarei"] } },

    { id: "ep9", week: 30, n: 9, level: "B2", emoji: "💌", title: "Il consiglio della mamma",
      grammar: "congiuntivo",
      text:
        "La risposta della madre arriva la mattina dopo, per colpa del fuso orario.\n\n" +
        "«Caro Martín, penso che tu sia già capace di tutto, anche se non te ne accorgi. " +
        "Non credo che la città conti molto: conta che tu faccia un lavoro che ti " +
        "appassiona. Mi sembra che Giulia sia una buona amica, e gli amici veri restano, " +
        "anche a quaranta chilometri.\n\n" +
        "Vorrei che tu non avessi paura di sbagliare: è normale che una scelta " +
        "importante faccia un po' paura. Qualunque cosa tu decida, sono orgogliosa di te. " +
        "Un bacio grande, mamma.\n\n" +
        "P.S. Spero che tu abbia imparato a cucinare, perché a Modena Giulia non ti " +
        "preparerà la cena.»",
      gloss: { fuso: "(fuso orario) huso horario",
               accorgi: "(te ne accorgi) te das cuenta", appassiona: "apasiona",
               sbagliare: "equivocarse", scelta: "elección, decisión",
               qualunque: "cualquier", orgogliosa: "orgullosa" },
      questions: [
        ["¿Por qué la respuesta llega a la mañana?", ["por la diferencia horaria", "porque la madre dormía la siesta", "porque se cortó internet", "porque estaba ocupada"], "por la diferencia horaria"],
        ["Según la madre, ¿qué es lo que importa?", ["hacer un trabajo que lo apasione", "la ciudad", "ganar mucho", "estar cerca de ella"], "hacer un trabajo que lo apasione"],
        ["¿Qué dice la posdata?", ["que ojalá haya aprendido a cocinar", "que lo va a visitar", "que Giulia es su novia", "que vuelva a casa"], "que ojalá haya aprendido a cocinar"]
      ],
      hunt: { label: "Tocá los verbos en congiuntivo", targets:
        ["sia", "conti", "faccia", "avessi", "decida", "abbia"] } },

    { id: "ep10", week: 33, n: 10, level: "B2", emoji: "🥂", title: "Un anno dopo",
      grammar: "periodo ipotetico",
      text:
        "È passato un anno da quando Martín è arrivato a Bologna. Alla fine ha accettato " +
        "il lavoro e fa il pendolare: ogni mattina prende il treno delle 7:40 per Modena. " +
        "Stasera festeggia con Giulia nel bar sotto casa, dove hanno preso il primo caffè insieme.\n\n" +
        "«Se non avessi trovato te come coinquilina, non avrei mai imparato l'italiano " +
        "così in fretta» le dice.\n" +
        "«E se tu non fossi venuto, io non avrei mai assaggiato l'asado» risponde lei.\n\n" +
        "Ridono. Martín ripensa al primo giorno, quando capiva una parola su dieci. " +
        "Adesso sogna in italiano, litiga in italiano e, soprattutto, scherza in " +
        "italiano.\n\n" +
        "«Sai qual è la cosa più strana?» dice. «Se dovessi tornare a Buenos Aires " +
        "domani, mi mancherebbero perfino i portici.»",
      gloss: { fretta: "(in fretta) rápido, apuro",
               ripensa: "vuelve a pensar, recuerda", sogna: "sueña", litiga: "discute, se pelea",
               scherza: "bromea", perfino: "hasta, incluso", portici: "soportales, galerías techadas" },
      questions: [
        ["¿Cómo va Martín a Módena?", ["en tren, todos los días", "en auto", "se mudó allá", "en bicicleta"], "en tren, todos los días"],
        ["¿Dónde festejan?", ["en el bar donde tomaron el primer café juntos", "en Florencia", "en la empresa", "en Nápoles"], "en el bar donde tomaron el primer café juntos"],
        ["¿Qué extrañaría Martín si volviera?", ["hasta los portici", "solo la comida", "el trabajo", "nada"], "hasta los portici"]
      ],
      hunt: { label: "Tocá el verbo de cada condición con «se» (congiuntivo)", targets:
        ["avessi", "fossi", "dovessi"] } },

    /* La quarta stagione: tre puntate C1, una ogni quattro settimane, così
       la strada verso l'esame ha ancora una storia da leggere. */
    { id: "ep11", week: 41, n: 11, level: "C1", emoji: "🧑‍💼", title: "Il capo nuovo",
      grammar: "causativo e verbi di percezione",
      text:
        "A settembre in azienda arriva un direttore nuovo, Fabrizio, e in una settimana fa rifare a tutti " +
        "i rapporti del trimestre. Non lascia parlare nessuno nelle riunioni e ha fatto aspettare " +
        "Martín un'ora davanti al suo ufficio.\n\n" +
        "«Lo sento urlare dal corridoio» dice Giulia al telefono. «Non lasciarti mettere i piedi in testa.»\n" +
        "Martín ci pensa. Il giorno dopo si fa ricevere alle otto, prima di tutti, e gli porta un " +
        "piano di lavoro di una pagina. Martín lo guarda leggere in silenzio; poi Fabrizio sorride per la prima volta.\n\n" +
        "«Finalmente qualcuno che mi fa risparmiare tempo» dice. Da quel giorno lo fa sedere accanto a sé.",
      gloss: { azienda: "empresa", rifare: "rehacer", rapporti: "informes", trimestre: "trimestre",
               urlare: "gritar", corridoio: "pasillo", "testa": "(mettere i piedi in testa) pisotear, abusar",
               ricevere: "(farsi ricevere) conseguir que lo atiendan", risparmiare: "ahorrar", accanto: "al lado" },
      questions: [
        ["¿Qué hace Fabrizio en su primera semana?", ["hace rehacer los informes", "despide a Martín", "organiza una fiesta", "se va de vacaciones"], "hace rehacer los informes"],
        ["¿Qué le aconseja Giulia?", ["que no se deje pisotear", "que renuncie", "que grite también", "que llegue tarde"], "que no se deje pisotear"],
        ["¿Cómo termina?", ["Fabrizio lo sienta a su lado", "Martín cambia de trabajo", "Fabrizio se va", "nadie habla más"], "Fabrizio lo sienta a su lado"]
      ],
      hunt: { label: "Tocá las formas de «fare» y «lasciare» seguidas de infinitivo (causativo)", targets:
        ["fa", "fatto", "lascia", "lasciarti"] } },

    { id: "ep12", week: 45, n: 12, level: "C1", emoji: "🍷", title: "La cena di lavoro",
      grammar: "gerundio e participio",
      text:
        "Essendo l'unico straniero della squadra, a Martín tocca il brindisi della cena di fine anno. " +
        "Avendo preparato due righe in italiano, le legge dal telefono, ma sbagliando una doppia: " +
        "dice «pena» invece di «penna» e tutti ridono.\n\n" +
        "Finita la cena, Fabrizio lo prende da parte. «Sapendo quanto ti costa, ti ringrazio il doppio.» " +
        "Martín, arrossendo, risponde che dopo un anno una doppia sbagliata è quasi un lusso.\n\n" +
        "Tornando a casa a piedi sotto i portici, pensa che la lingua non si impara: si abita.",
      gloss: { squadra: "equipo", brindisi: "brindis", righe: "renglones", doppia: "consonante doble",
               ridono: "ríen", "parte": "(prendere da parte) llevar aparte", arrossendo: "sonrojándose",
               lusso: "lujo", portici: "soportales", abita: "(si abita) se habita, se vive" },
      questions: [
        ["¿Por qué le toca el brindis a Martín?", ["porque es el único extranjero", "porque es el jefe", "porque cumple años", "porque lo pidió"], "porque es el único extranjero"],
        ["¿Qué error comete?", ["una consonante doble", "un verbo en pasado", "el nombre del jefe", "el número de mesa"], "una consonante doble"],
        ["¿Qué piensa al volver?", ["que la lengua se habita, no se aprende", "que quiere volver a Buenos Aires", "que odia los brindis", "que Fabrizio es malo"], "que la lengua se habita, no se aprende"]
      ],
      hunt: { label: "Tocá todos los gerundios (essendo, sapendo…)", targets:
        ["essendo", "avendo", "sbagliando", "sapendo", "arrossendo", "tornando"] } },

    { id: "ep13", week: 49, n: 13, level: "C1", emoji: "✉️", title: "L'ultima lettera",
      grammar: "registro alto e coesione",
      text:
        "Gentile professoressa Bianchi,\n\n" +
        "le scrivo affinché sappia quanto le sono grato. Nonostante il mio italiano fosse, all'inizio, " +
        "un impasto di spagnolo e buona volontà, lei non mi ha mai corretto con impazienza. Tuttavia " +
        "non mi ha nemmeno lasciato passare una preposizione sbagliata, e di questo la ringrazio.\n\n" +
        "Qualora l'università organizzasse ancora il corso per stranieri, sarei lieto di tornare " +
        "come volontario. Infatti, dopo un anno, mi sono reso conto che si impara davvero solo " +
        "insegnando a qualcun altro.\n\n" +
        "Con stima e riconoscenza,\nMartín",
      gloss: { affinché: "para que (+ congiuntivo)", grato: "agradecido", nonostante: "a pesar de que",
               impasto: "mezcla, masa", tuttavia: "sin embargo", nemmeno: "ni siquiera", qualora: "en caso de que (+ congiuntivo)",
               lieto: "contento (registro alto)", volontario: "voluntario", stima: "estima", riconoscenza: "gratitud" },
      questions: [
        ["¿A quién le escribe Martín?", ["a su profesora", "a Fabrizio", "a Giulia", "al Comune"], "a su profesora"],
        ["¿Qué agradece?", ["que lo corrigiera sin impaciencia y sin dejar pasar errores", "que le regalara un libro", "que le diera trabajo", "que le enseñara a cocinar"], "que lo corrigiera sin impaciencia y sin dejar pasar errores"],
        ["¿Qué descubrió después de un año?", ["que se aprende enseñando", "que el italiano es fácil", "que no quiere volver", "que odia las preposiciones"], "que se aprende enseñando"]
      ],
      hunt: { label: "Tocá los conectores (affinché, nonostante, tuttavia, qualora, infatti)", targets:
        ["affinché", "nonostante", "tuttavia", "qualora", "infatti"] } },

    /* ---------------------------------------------- Cultura: storia, idee, libri.
       Contenuto che interessa (Hidi & Renninger 2006): l'interesse per il tema
       aumenta comprensione e memoria.  Si scelgono liberamente. */

    { id: "c-dante", week: 11, series: "cultura", area: "Letteratura", n: 1, level: "A2", emoji: "📜",
      title: "Dante e la lingua italiana", grammar: "presente storico",
      text:
        "Dante Alighieri nasce a Firenze nel 1265. Scrive la Divina Commedia in volgare " +
        "fiorentino e non in latino, la lingua dei dotti. È una scelta rivoluzionaria: " +
        "vuole essere letto da tutti, non solo dai professori.\n\n" +
        "Il poema racconta un viaggio immaginario in tre parti: l'Inferno, il Purgatorio " +
        "e il Paradiso. Nel primo regno e in quasi tutto il secondo la guida di Dante è il poeta latino Virgilio; " +
        "poi lo accompagna Beatrice, la donna che ha amato da giovane.\n\n" +
        "Dante muore in esilio a Ravenna nel 1321, lontano dalla sua città. Ancora oggi " +
        "molti italiani sanno a memoria il primo verso: «Nel mezzo del cammin di nostra " +
        "vita». Non a caso lo chiamano il padre della lingua italiana.",
      gloss: { volgare: "lengua vulgar, la hablada por el pueblo", dotti: "sabios, eruditos",
               scelta: "elección", poema: "poema", regno: "reino", guida: "guía",
               accompagna: "acompaña", esilio: "exilio", cammin: "(cammino) camino",
               verso: "verso" },
      questions: [
        ["¿Por qué escribe en volgare y no en latín?", ["para que lo lean todos", "porque no sabía latín", "porque se lo pidió el papa", "para vender más"], "para que lo lean todos"],
        ["¿Quién lo guía en el Paraíso?", ["Beatrice", "Virgilio", "su padre", "nadie"], "Beatrice"],
        ["¿Dónde muere Dante?", ["en el exilio, en Ravenna", "en Florencia", "en Roma", "en la cárcel"], "en el exilio, en Ravenna"]
      ],
      hunt: { label: "Tocá los tres reinos del viaje (cada vez que aparecen)", targets:
        ["inferno", "purgatorio", "paradiso"] } },

    { id: "c-machiavelli", week: 38, series: "cultura", area: "Filosofia", n: 2, level: "B1", emoji: "🦊",
      title: "Machiavelli e Il Principe", grammar: "passato prossimo e remoto",
      text:
        "Nel 1513 Niccolò Machiavelli è fuori dalla politica. I Medici sono tornati al " +
        "potere a Firenze e lui, sospettato di aver partecipato a una congiura, è stato " +
        "arrestato e torturato. Si ritira in campagna, vicino a San Casciano, e scrive un " +
        "libro breve che cambierà il pensiero politico: Il Principe.\n\n" +
        "Machiavelli non descrive lo Stato ideale, ma la politica com'è davvero. Un " +
        "principe, scrive, deve saper essere «golpe e lione», cioè astuto come la volpe " +
        "e forte come il leone.\n\n" +
        "Spesso gli si attribuisce la frase «il fine giustifica i mezzi», ma nel libro " +
        "non c'è: è una sintesi, e un po' una caricatura, del suo pensiero. Il Principe " +
        "fu pubblicato nel 1532, cinque anni dopo la morte del suo autore.",
      gloss: { sospettato: "sospechado", congiura: "conspiración", ritira: "(si ritira) se retira",
               campagna: "campo", pensiero: "pensamiento", davvero: "de verdad",
               golpe: "zorra (italiano antiguo: volpe)", lione: "león (italiano antiguo: leone)",
               astuto: "astuto", volpe: "zorro", fine: "fin, objetivo", mezzi: "medios" },
      questions: [
        ["¿Qué le pasó a Maquiavelo en 1513?", ["lo arrestaron y torturaron", "lo nombraron embajador", "se casó", "se fue a Francia"], "lo arrestaron y torturaron"],
        ["¿Qué describe El Príncipe?", ["la política como es realmente", "el Estado ideal", "la vida de los santos", "la historia de Roma"], "la política como es realmente"],
        ["¿Qué pasa con «el fin justifica los medios»?", ["no está en el libro", "es la primera frase", "la dijo un Medici", "es el título original"], "no está en el libro"]
      ],
      hunt: { label: "Tocá los animales (en italiano antiguo y moderno)", targets:
        ["golpe", "lione", "volpe", "leone"] } },

    { id: "c-galileo", week: 29, series: "cultura", area: "Storia", n: 3, level: "B1", emoji: "🔭",
      title: "Galileo e il cannocchiale", grammar: "congiuntivo e condizionale",
      text:
        "Nel 1609 Galileo Galilei sente parlare di uno strumento olandese che fa sembrare " +
        "vicine le cose lontane. Lo costruisce da solo, lo migliora e lo punta verso il " +
        "cielo. Quello che vede cambia tutto: la Luna ha montagne e valli, e intorno a " +
        "Giove girano quattro satelliti. Se non tutto gira intorno alla Terra, forse " +
        "aveva ragione Copernico.\n\n" +
        "Galileo difende questa idea nel Dialogo sopra i due massimi sistemi del mondo, " +
        "scritto in italiano perché lo possano leggere tutti. Nel 1633 l'Inquisizione " +
        "lo processa e lo costringe ad abiurare.\n\n" +
        "Secondo la leggenda, dopo il processo avrebbe mormorato «Eppur si muove», ma non " +
        "ci sono prove che l'abbia detto davvero. Passa gli ultimi anni agli arresti " +
        "domiciliari, vicino a Firenze.",
      gloss: { strumento: "instrumento", olandese: "holandés", migliora: "mejora",
               punta: "apunta", valli: "valles", girano: "giran", massimi: "máximos",
               costringe: "obliga", abiurare: "abjurar, renegar", mormorato: "murmurado",
               eppur: "(eppure) y sin embargo", prove: "pruebas",
               domiciliari: "(arresti domiciliari) prisión domiciliaria" },
      questions: [
        ["¿Qué descubre Galileo alrededor de Júpiter?", ["cuatro satélites", "anillos", "montañas", "nada"], "cuatro satélites"],
        ["¿Por qué escribe el Dialogo en italiano?", ["para que lo pueda leer todo el mundo", "porque la Iglesia se lo exigió", "porque no sabía latín", "para esconderlo"], "para que lo pueda leer todo el mundo"],
        ["¿Dijo realmente «Eppur si muove»?", ["no hay pruebas de que lo haya dicho", "sí, delante del tribunal", "sí, en su libro", "lo dijo Copérnico"], "no hay pruebas de que lo haya dicho"]
      ],
      hunt: { label: "Tocá los verbos en congiuntivo o condizionale", targets:
        ["possano", "avrebbe", "abbia"] } },

    { id: "c-garibaldi", week: 31, series: "cultura", area: "Storia", n: 4, level: "B1", emoji: "🇮🇹",
      title: "Garibaldi e l'Unità", grammar: "presente storico e futuro nel passato",
      text:
        "Nel maggio del 1860 Giuseppe Garibaldi parte da Quarto, vicino a Genova, con " +
        "circa mille volontari. Sono i famosi Mille, e portano la camicia rossa. Sbarcano " +
        "a Marsala, in Sicilia, e in pochi mesi conquistano il Regno delle Due Sicilie. " +
        "A Teano, in ottobre, Garibaldi incontra il re Vittorio Emanuele II e gli " +
        "consegna il Sud.\n\n" +
        "Il 17 marzo 1861 nasce il Regno d'Italia, ma Roma non ne fa ancora parte: " +
        "diventerà capitale solo nel 1871.\n\n" +
        "Secondo la tradizione, Massimo d'Azeglio avrebbe detto: «Abbiamo fatto l'Italia, " +
        "ora dobbiamo fare gli italiani». Aveva ragione: allora solo una piccola minoranza " +
        "parlava italiano, gli altri parlavano i loro dialetti.",
      gloss: { volontari: "voluntarios", camicia: "camisa", sbarcano: "desembarcan",
               conquistano: "conquistan", consegna: "entrega", diventerà: "se convertirá en",
               minoranza: "minoría", dialetti: "dialectos" },
      questions: [
        ["¿Cuántos voluntarios llevaba Garibaldi?", ["unos mil", "unos cien", "diez mil", "trescientos"], "unos mil"],
        ["¿Cuándo pasa Roma a ser capital?", ["en 1871", "en 1861", "en 1860", "en 1946"], "en 1871"],
        ["¿Qué quiere decir la frase de d'Azeglio?", ["que faltaba crear una identidad común", "que los italianos no querían la unidad", "que Italia era demasiado grande", "que había que hacer la guerra"], "que faltaba crear una identidad común"]
      ],
      hunt: { label: "Tocá los lugares geográficos", targets:
        ["quarto", "genova", "marsala", "sicilia", "teano", "italia", "roma"] } },

    { id: "c-gramsci", week: 45, series: "cultura", area: "Sociologia", n: 5, level: "B2", emoji: "📓",
      title: "Gramsci e l'egemonia", grammar: "passato remoto",
      text:
        "Antonio Gramsci, nato in Sardegna nel 1891, fu tra i fondatori del Partito " +
        "Comunista d'Italia. Nel 1926 il regime fascista lo arrestò e nel 1928 lo condannò a più " +
        "di vent'anni di carcere. «Per vent'anni dobbiamo impedire a questo cervello di " +
        "funzionare», avrebbe detto il pubblico ministero.\n\n" +
        "Eppure in prigione Gramsci scrisse migliaia di pagine: i Quaderni del carcere. " +
        "Il concetto più famoso è quello di egemonia: una classe non domina solo con la " +
        "forza, ma soprattutto con il consenso, facendo sì che le sue idee sembrino " +
        "naturali a tutti. Per questo, secondo Gramsci, la cultura, la scuola e i " +
        "giornali sono campi di battaglia politica.\n\n" +
        "Morì a Roma nel 1937, pochi giorni dopo aver riacquistato la libertà.",
      gloss: { fondatori: "fundadores", carcere: "cárcel", impedire: "impedir",
               cervello: "cerebro", "ministero": "(pubblico ministero) fiscal",
               quaderni: "cuadernos", egemonia: "hegemonía", consenso: "consenso",
               giornali: "diarios", riacquistato: "recuperado" },
      questions: [
        ["¿Qué quería impedir el fiscal?", ["que su cerebro funcionara", "que escapara", "que hablara con la prensa", "que viera a su familia"], "que su cerebro funcionara"],
        ["Según Gramsci, ¿cómo domina una clase?", ["sobre todo con el consenso", "solo con la fuerza", "con el dinero", "con la religión"], "sobre todo con el consenso"],
        ["¿Por qué la escuela y los diarios son campos de batalla?", ["porque ahí se construye el consenso", "porque son del Estado", "porque ahí hubo violencia", "porque los cerró el fascismo"], "porque ahí se construye el consenso"]
      ],
      hunt: { label: "Tocá los verbos en passato remoto", targets:
        ["fu", "arrestò", "condannò", "scrisse", "morì"] } },

    { id: "c-levi", week: 42, series: "cultura", area: "Letteratura", n: 6, level: "B2", emoji: "🕯️",
      title: "Primo Levi, testimone", grammar: "passato remoto e congiuntivo",
      text:
        "Primo Levi era un chimico ebreo di Torino. Nel 1944 fu deportato ad Auschwitz, " +
        "dove rimase fino alla liberazione del campo, nel gennaio del 1945. Sopravvisse " +
        "anche grazie al suo mestiere: lavorava in un laboratorio del campo.\n\n" +
        "Tornato a casa, sentì il bisogno di raccontare. In Se questo è un uomo descrive " +
        "la vita nel Lager con una prosa limpida, quasi scientifica, senza gridare. Non " +
        "vuole solo commuovere il lettore: vuole che capisca come un sistema possa " +
        "distruggere l'umanità delle persone.\n\n" +
        "Molti anni dopo, nei Sommersi e i salvati, riflette sulla «zona grigia», lo " +
        "spazio ambiguo tra vittime e carnefici. «È avvenuto, quindi può accadere di " +
        "nuovo», scrisse: per questo ricordare è un dovere.",
      gloss: { chimico: "químico", ebreo: "judío", sopravvisse: "sobrevivió",
               mestiere: "oficio", bisogno: "necesidad", limpida: "límpida, clara",
               gridare: "gritar", commuovere: "conmover", sommersi: "hundidos",
               carnefici: "verdugos", avvenuto: "ocurrido", dovere: "deber" },
      questions: [
        ["¿Qué lo ayudó a sobrevivir?", ["su oficio de químico", "un amigo guardia", "estar enfermo", "escapar"], "su oficio de químico"],
        ["¿Cómo escribe sobre el Lager?", ["con una prosa clara, casi científica", "con mucho enojo", "en forma de poesía", "con humor"], "con una prosa clara, casi científica"],
        ["¿Qué es la «zona gris»?", ["el espacio ambiguo entre víctimas y verdugos", "una parte del campo", "el invierno polaco", "la memoria olvidada"], "el espacio ambiguo entre víctimas y verdugos"]
      ],
      hunt: { label: "Tocá los verbos en passato remoto", targets:
        ["fu", "rimase", "sopravvisse", "sentì", "scrisse"] } },

    { id: "c-boom", week: 24, series: "cultura", area: "Sociologia", n: 7, level: "B1", emoji: "📺",
      title: "Il boom economico", grammar: "presente e passato prossimo",
      text:
        "Tra la fine degli anni Cinquanta e l'inizio dei Sessanta l'Italia cambia " +
        "faccia. È il miracolo economico: le fabbriche del Nord crescono, e milioni di " +
        "persone lasciano i campi del Sud per andare a lavorare a Torino e a Milano. " +
        "Nelle case arrivano il frigorifero, la lavatrice e soprattutto la " +
        "televisione.\n\n" +
        "Nel 1954 la Rai comincia le trasmissioni televisive, e un programma come Non è mai troppo " +
        "tardi insegna a leggere e a scrivere agli adulti. Secondo il linguista Tullio " +
        "De Mauro, la televisione ha fatto moltissimo per l'unità della lingua.\n\n" +
        "Ma il boom ha anche un lato oscuro: le periferie crescono senza regole, e Pier " +
        "Paolo Pasolini accusa la società dei consumi di cancellare le culture popolari.",
      gloss: { faccia: "cara", fabbriche: "fábricas", crescono: "crecen",
               lavatrice: "lavarropas", trasmissioni: "transmisiones", insegna: "enseña",
               oscuro: "oscuro", periferie: "periferias, suburbios", regole: "reglas",
               consumi: "consumo", cancellare: "borrar" },
      questions: [
        ["¿Adónde se mudan millones de personas?", ["a las ciudades industriales del norte", "al extranjero", "al campo", "a Roma"], "a las ciudades industriales del norte"],
        ["¿Qué hacía «Non è mai troppo tardi»?", ["enseñaba a leer y escribir a adultos", "era un concurso", "daba noticias", "vendía electrodomésticos"], "enseñaba a leer y escribir a adultos"],
        ["¿De qué acusa Pasolini a la sociedad de consumo?", ["de borrar las culturas populares", "de empobrecer al norte", "de censurar la televisión", "de cerrar fábricas"], "de borrar las culturas populares"]
      ],
      hunt: { label: "Tocá los aparatos que llegan a las casas", targets:
        ["frigorifero", "lavatrice", "televisione"] } },

    { id: "c-calvino", week: 34, series: "cultura", area: "Letteratura", n: 8, level: "B1", emoji: "🏙️",
      title: "Calvino e le città invisibili", grammar: "congiuntivo imperfetto",
      text:
        "Nel libro Le città invisibili, pubblicato nel 1972, Italo Calvino immagina un dialogo " +
        "tra Marco Polo e l'imperatore dei Tartari, Kublai Kan. Marco Polo racconta le " +
        "città che ha visitato nei suoi viaggi: città sottili, città continue, città " +
        "nascoste. Ogni città ha un nome di donna: Zaira, Despina, Ottavia.\n\n" +
        "Ma sono città vere? Poco a poco il lettore capisce che forse Marco Polo descrive " +
        "sempre la stessa città: Venezia, quella da cui è partito. Il libro non ha una " +
        "trama: si può aprire a caso, come un atlante di sogni.\n\n" +
        "Calvino, nato a Cuba nel 1923 da genitori italiani, pensava che la leggerezza " +
        "fosse una virtù, non un difetto: lo spiega nelle Lezioni americane.",
      gloss: { imperatore: "emperador", sottili: "sutiles", nascoste: "escondidas",
               trama: "trama, argumento", caso: "(a caso) al azar", atlante: "atlas",
               sogni: "sueños", genitori: "padres", leggerezza: "levedad, liviandad",
               difetto: "defecto" },
      questions: [
        ["¿Entre quiénes es el diálogo?", ["Marco Polo y Kublai Kan", "Calvino y un lector", "dos emperadores", "Marco Polo y su padre"], "Marco Polo y Kublai Kan"],
        ["¿Qué ciudad se esconde detrás de todas?", ["Venecia", "Roma", "Pekín", "La Habana"], "Venecia"],
        ["¿Qué pensaba Calvino de la levedad?", ["que era una virtud", "que era un defecto", "que era imposible", "que era aburrida"], "que era una virtud"]
      ],
      hunt: { label: "Tocá los nombres de ciudades", targets:
        ["zaira", "despina", "ottavia", "venezia"] } },

    { id: "c-beccaria", week: 36, series: "cultura", area: "Filosofia", n: 9, level: "B2", emoji: "⚖️",
      title: "Beccaria contro la pena di morte", grammar: "presente storico e imperfetto",
      text:
        "Nel 1764 un giovane nobile milanese di ventisei anni, Cesare Beccaria, pubblica " +
        "un libretto che fa il giro d'Europa: Dei delitti e delle pene. In un'epoca in " +
        "cui la tortura era normale, Beccaria sostiene che è inutile e crudele: un " +
        "colpevole robusto può resistere, e un innocente debole può confessare pur di " +
        "smettere di soffrire.\n\n" +
        "Si oppone anche alla pena di morte: secondo lui, a scoraggiare il crimine non è " +
        "la crudeltà della pena, ma la sua certezza. Voltaire lo commenta con entusiasmo, " +
        "e nel 1786 il Granducato di Toscana diventa il primo Stato moderno ad abolire " +
        "la pena capitale.\n\n" +
        "Una curiosità: Beccaria era il nonno di Alessandro Manzoni.",
      gloss: { delitti: "delitos", pene: "penas", sostiene: "sostiene",
               crudele: "cruel", colpevole: "culpable", "pur": "(pur di) con tal de",
               smettere: "dejar de", scoraggiare: "desalentar", certezza: "certeza",
               nonno: "abuelo" },
      questions: [
        ["¿Por qué la tortura es inútil según Beccaria?", ["un culpable fuerte resiste y un inocente débil confiesa", "porque es cara", "porque la prohíbe la Iglesia", "porque nadie confiesa"], "un culpable fuerte resiste y un inocente débil confiesa"],
        ["¿Qué desalienta el crimen, según él?", ["la certeza de la pena", "la crueldad de la pena", "la religión", "la pobreza"], "la certeza de la pena"],
        ["¿Qué pasó en Toscana en 1786?", ["abolió la pena de muerte", "prohibió el libro", "coronó a Beccaria", "invadió Milán"], "abolió la pena de muerte"]
      ],
      hunt: { label: "Tocá las palabras del derecho penal", targets:
        ["delitti", "pene", "tortura", "pena", "crimine"] } },

    { id: "c-ginzburg", week: 48, series: "cultura", area: "Letteratura", n: 10, level: "B1", emoji: "🍽️",
      title: "Natalia Ginzburg, Lessico famigliare", grammar: "imperfetto",
      text:
        "«Non fate malagrazie!» gridava il padre a tavola. Con frasi come questa comincia " +
        "Lessico famigliare, il libro in cui Natalia Ginzburg racconta la sua famiglia " +
        "torinese, i Levi, dagli anni Venti al dopoguerra.\n\n" +
        "Il libro non segue una trama: segue le parole. Ogni famiglia, scrive Ginzburg, " +
        "ha delle espressioni sue, che bastano per riconoscersi anche dopo anni, anche in " +
        "una grotta buia, tra milioni di persone.\n\n" +
        "Sullo sfondo c'è la storia: il fascismo, le leggi razziali, la guerra, l'arresto " +
        "e la morte del marito Leone Ginzburg. Ma il tono resta ironico e leggero. Il " +
        "libro vinse il Premio Strega nel 1963.",
      gloss: { malagrazie: "groserías, malos modales", gridava: "gritaba",
               tavola: "mesa", lessico: "léxico", famigliare: "familiar",
               dopoguerra: "posguerra", riconoscersi: "reconocerse", grotta: "gruta, cueva",
               buia: "oscura", sfondo: "fondo", razziali: "raciales", marito: "marido" },
      questions: [
        ["¿Qué sigue el libro, en lugar de una trama?", ["las palabras de la familia", "la vida del padre", "la guerra", "un crimen"], "las palabras de la familia"],
        ["¿Para qué sirven las expresiones familiares?", ["para reconocerse aun después de años", "para hablar en secreto", "para educar a los hijos", "para escribir libros"], "para reconocerse aun después de años"],
        ["¿Cuál es el tono del libro?", ["irónico y liviano", "trágico y solemne", "político y agresivo", "técnico"], "irónico y liviano"]
      ],
      hunt: { label: "Tocá las palabras que remiten a la historia del siglo XX", targets:
        ["dopoguerra", "fascismo", "razziali", "guerra", "arresto"] } }
  ];

  /* ------------------------------------------------------------ testo */

  // Tokens of a paragraph, keeping punctuation attached for display.
  function tokens(par) {
    return par.split(/\s+/).filter(Boolean);
  }

  // The bare word inside a token: lower case, no surrounding punctuation.
  function bare(tok) {
    return String(tok).toLowerCase()
      .replace(/^[^a-zàèéìíòóù]+/, "")
      .replace(/[^a-zàèéìíòóù']+$/, "")
      .replace(/'$/, "");
  }

  function paragraphs(ep) { return ep.text.split(/\n+/); }

  function allTokens(ep) {
    var out = [];
    paragraphs(ep).forEach(function (p) { tokens(p).forEach(function (t) { out.push(t); }); });
    return out;
  }

  // Gloss for a token.  Elided forms (l'università) look up the part after
  // the apostrophe too.
  function glossFor(ep, tok) {
    var b = bare(tok);
    if (ep.gloss[b]) return ep.gloss[b];
    var k = b.lastIndexOf("'");
    if (k >= 0 && ep.gloss[b.slice(k + 1)]) return ep.gloss[b.slice(k + 1)];
    return null;
  }

  // The word after an elision: l'inferno → inferno.
  function core(tok) {
    var b = bare(tok), k = b.lastIndexOf("'");
    return k >= 0 ? b.slice(k + 1) : b;
  }

  // Indices of the tokens the hunt is after.
  function huntTargets(ep) {
    var out = [];
    allTokens(ep).forEach(function (t, i) {
      if (ep.hunt.targets.indexOf(bare(t)) >= 0 ||
          ep.hunt.targets.indexOf(core(t)) >= 0) out.push(i);
    });
    return out;
  }

  /* Caccia: selected is a list of token indices.  Every miss and every false
     hit costs; the verdict follows the net share found. */
  function gradeHunt(ep, selected) {
    var want = huntTargets(ep);
    var hit = 0, wrong = 0;
    selected.forEach(function (i) {
      if (want.indexOf(i) >= 0) hit++; else wrong++;
    });
    var score = Math.max(0, hit - wrong) / want.length;
    return {
      score: score, hit: hit, wrong: wrong, total: want.length, targets: want,
      verdict: score >= 0.85 ? "giusto" : score >= 0.5 ? "quasi" : "sbagliato"
    };
  }

  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  // The playable part of an episode: comprehension first (meaning), then the
  // hunt (form).
  function session(ep) {
    var out = ep.questions.map(function (q, i) {
      return { id: "lettura:" + ep.id + ":" + i, src: "lettura", ep: ep.id,
               type: "choice", prompt: "Comprensión", stem: q[0],
               options: shuffle(q[1]), answer: q[2], accept: [q[2]], withText: true };
    });
    out.push({ id: "caccia:" + ep.id, src: "lettura", ep: ep.id, type: "hunt",
               prompt: "Caccia alle forme · " + ep.grammar, stem: ep.hunt.label,
               answer: ep.hunt.targets.join(", ") });
    return out;
  }

  function byId(id) {
    for (var i = 0; i < EPISODI.length; i++) if (EPISODI[i].id === id) return EPISODI[i];
    return null;
  }

  // Everything that isn't marked otherwise is part of Martín's story.
  EPISODI.forEach(function (e) { if (!e.series) e.series = "martin"; });

  var SERIES = [
    { id: "martin", name: "Martín a Bologna", emoji: "📖",
      blurb: "Una historia por capítulos, de A1 a B2. Cada episodio usa la gramática que estás viendo y abre el siguiente." },
    { id: "cultura", name: "Cultura", emoji: "🏛️",
      blurb: "Historia, filosofía, sociología y literatura italianas en textos graduados. Cada uno se abre con la gramática que usa; entre los abiertos, elegí el que te interese." }
  ];

  function ofSeries(id) {
    return EPISODI.filter(function (e) { return e.series === id; });
  }

  /* Each text opens in the week whose grammar it uses (tools/sillabo.py:
     «week»), so nothing is read before its theory.  Martín's episodes also
     go one after the other; culture texts are free to pick among the open
     ones (choice sustains motivation: Deci & Ryan 2000). */
  function isOpen(ep, done, week) {
    if (week && ep.week > week) return false;
    if (ep.series !== "martin") return true;
    return ep.n === 1 || !!(done || {})["ep" + (ep.n - 1)];
  }

  function next(done, series) {
    var list = ofSeries(series || "martin");
    for (var i = 0; i < list.length; i++) {
      if (!(done || {})[list[i].id]) return list[i];
    }
    return null;
  }

  var api = {
    EPISODI: EPISODI,
    SERIES: SERIES,
    ofSeries: ofSeries,
    tokens: tokens,
    bare: bare,
    core: core,
    paragraphs: paragraphs,
    allTokens: allTokens,
    glossFor: glossFor,
    huntTargets: huntTargets,
    gradeHunt: gradeHunt,
    session: session,
    byId: byId,
    isOpen: isOpen,
    next: next
  };

  if (typeof module === "object" && module.exports) module.exports = api;
  else root.Letture = api;
})(typeof window !== "undefined" ? window : globalThis);
