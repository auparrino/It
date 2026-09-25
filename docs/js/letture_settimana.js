/*
 * La settimana: un texto corto por semana, para las semanas que no tenían
 * lectura (Jeon & Day 2016: la lectura extensiva rinde, d = 0,57).  Cada uno
 * usa la gramática de su semana y palabras ya vistas o glosadas, para leer
 * sin diccionario (Hu & Nation 2000: 98 % de cobertura).  Los controla
 * tools/check_letture.py (gramática y vocabulario por semana).
 */
(function (root) {
  "use strict";

  var TESTI = [
    { id: "w-02", week: 2, n: 1, level: "A1", emoji: "🍽️", title: "La cucina di Anna",
      grammar: "nomi: genere e numero",
      text:
        "Anna ha una cucina piccola ma bella. C'è un tavolo e ci sono quattro sedie. " +
        "Sopra il tavolo ci sono due bicchieri, tre piatti e un vaso con i fiori.\n\n" +
        "Il frigorifero è pieno: ci sono le uova, il latte, due formaggi e tante verdure. " +
        "Anna ha anche la pasta, il riso, lo zucchero e il caffè. Il caffè è importante: " +
        "in Italia la mattina è sacro!\n\n" +
        "Sopra il divano ci sono le foto di famiglia: i nonni, gli zii e i cugini. " +
        "In una foto c'è anche il cane, Otto. Otto è vecchio, ma è ancora il re di casa.",
      gloss: { bicchieri: "vasos", piatti: "platos", vaso: "florero", fiori: "flores", frigorifero: "heladera",
               pieno: "lleno", uova: "huevos", verdure: "verduras", divano: "sillón", sopra: "sobre, arriba de", cugini: "primos",
               cane: "perro", vecchio: "viejo", ancora: "todavía", sacro: "sagrado", re: "rey" },
      questions: [
        ["¿Cuántas sillas hay en la cocina?", ["cuatro", "dos", "tres", "seis"], "cuatro"],
        ["¿Qué hay en la heladera?", ["huevos, leche, quesos y verduras", "solo café", "pasta y arroz", "nada"], "huevos, leche, quesos y verduras"],
        ["¿Quién es Otto?", ["el perro", "el abuelo", "un primo", "el rey de Italia"], "el perro"]
      ],
      hunt: { label: "Tocá los sustantivos en plural", targets: ["sedie", "bicchieri", "piatti", "fiori", "uova", "formaggi", "verdure", "foto", "nonni", "zii", "cugini"] } },

    { id: "w-03", week: 3, n: 2, level: "A1", emoji: "🏘️", title: "La mia via",
      grammar: "articoli e preposizioni articolate",
      text:
        "Abito in una via tranquilla, vicino alla stazione. All'angolo c'è un bar: " +
        "il barista è un amico e il caffè è buono. Accanto al bar c'è lo studio di un dentista " +
        "e poi c'è un'edicola.\n\n" +
        "Nella piazza ci sono gli alberi e le panchine. La mattina ci sono degli anziani " +
        "con i giornali e dei bambini con lo zaino. Il sabato c'è il mercato: " +
        "c'è della frutta, c'è del pesce e ci sono dei fiori.\n\n" +
        "Dalla finestra vedo il campanile della chiesa. La sera la via è vuota " +
        "e c'è solo il rumore dell'acqua della fontana.",
      gloss: { via: "calle", tranquilla: "tranquila", angolo: "esquina", accanto: "al lado", edicola: "kiosco de diarios",
               panchine: "bancos (de plaza)", anziani: "ancianos", giornali: "diarios", zaino: "mochila",
               pesce: "pescado", campanile: "campanario", vuota: "vacía", rumore: "ruido",
               fontana: "fuente", vedo: "veo" },
      questions: [
        ["¿Qué hay en la esquina?", ["un bar", "una iglesia", "una estación", "un mercado"], "un bar"],
        ["¿Qué pasa los sábados?", ["hay mercado", "cierra el bar", "no hay nadie", "hay misa"], "hay mercado"],
        ["¿Cómo está la calle de noche?", ["vacía y tranquila", "llena de gente", "con música", "con tráfico"], "vacía y tranquila"]
      ],
      hunt: { label: "Tocá las preposiciones articuladas (alla, al, nella…)", targets: ["alla", "al", "nella", "della", "del", "dei", "degli", "dalla"] } },

    { id: "w-04", week: 4, n: 3, level: "A1", emoji: "👯", title: "Due sorelle diverse",
      grammar: "aggettivi",
      text:
        "Marta ed Elisa sono sorelle, ma sono molto diverse. Marta è alta e magra, " +
        "ha i capelli lunghi e neri e gli occhi verdi. È una ragazza seria e precisa. " +
        "Elisa è bassa, ha i capelli corti e biondi ed è sempre allegra.\n\n" +
        "Marta ama i vestiti eleganti e le scarpe nere. Elisa preferisce le magliette " +
        "colorate e i pantaloni comodi. Marta ha una macchina nuova; Elisa ha una bici rossa.\n\n" +
        "Però hanno una cosa in comune: sono due buone amiche e hanno un bel rapporto. " +
        "E tutte e due amano la pizza napoletana!",
      gloss: { sorelle: "hermanas", diverse: "distintas", magra: "flaca", capelli: "pelo", occhi: "ojos",
               bassa: "baja", corti: "cortos", allegra: "alegre", vestiti: "ropa, vestidos", scarpe: "zapatos",
               magliette: "remeras", colorate: "de colores", pantaloni: "pantalones", comodi: "cómodos", bici: "bici", comune: "común (in comune = en común)",
               rapporto: "relación", tutte: "todas (tutte e due = las dos)" },
      questions: [
        ["¿Cómo es Marta?", ["alta, flaca y seria", "baja y alegre", "rubia y de pelo corto", "desordenada"], "alta, flaca y seria"],
        ["¿Qué tiene Elisa?", ["una bici roja", "un auto nuevo", "zapatos negros", "vestidos elegantes"], "una bici roja"],
        ["¿Qué tienen en común?", ["son buenas amigas y aman la pizza", "el mismo pelo", "la misma ropa", "nada"], "son buenas amigas y aman la pizza"]
      ],
      hunt: { label: "Tocá los adjetivos de color", targets: ["neri", "verdi", "biondi", "nere", "colorate", "rossa"] } },

    { id: "w-06", week: 6, n: 4, level: "A1", emoji: "⏰", title: "Una giornata di Sara",
      grammar: "presente irregolare",
      text:
        "Sara fa l'infermiera e lavora in un ospedale di Torino. Esce di casa alle sei " +
        "e va al lavoro in autobus. Dice sempre che la mattina presto la città è molto bella.\n\n" +
        "In ospedale non può mai stare ferma: deve controllare i pazienti, dare le medicine " +
        "e parlare con i medici. A mezzogiorno beve un caffè veloce con i colleghi.\n\n" +
        "Il pomeriggio viene a casa stanca, ma la sera esce con gli amici. " +
        "\"Vuoi venire al cinema?\" chiede la sua amica Laura. \"Sì, vengo volentieri, " +
        "ma domani devo lavorare presto!\" risponde Sara.",
      gloss: { infermiera: "enfermera", ospedale: "hospital", ferma: "quieta", controllare: "controlar",
               pazienti: "pacientes", medici: "médicos", mezzogiorno: "mediodía", veloce: "rápido",
               colleghi: "compañeros de trabajo", stanca: "cansada", volentieri: "con gusto", presto: "temprano" },
      questions: [
        ["¿Cómo va Sara al trabajo?", ["en colectivo", "a pie", "en auto", "en tren"], "en colectivo"],
        ["¿Qué hace al mediodía?", ["toma un café rápido", "almuerza en casa", "duerme", "va al cine"], "toma un café rápido"],
        ["¿Por qué no puede quedarse hasta tarde?", ["mañana trabaja temprano", "está enferma", "no le gusta el cine", "no tiene plata"], "mañana trabaja temprano"]
      ],
      hunt: { label: "Tocá los verbos irregulares (fa, esce, va, dice…)", targets: ["fa", "esce", "va", "dice", "può", "deve", "beve", "viene", "vuoi", "vengo", "devo"] } },

    { id: "w-07", week: 7, n: 5, level: "A1", emoji: "📅", title: "L'agenda di Paolo",
      grammar: "numeri, date e ora",
      text:
        "Oggi è lunedì dodici marzo e Paolo ha una settimana piena. Alle otto e mezza " +
        "ha una riunione in ufficio. Alle dieci e un quarto deve chiamare un cliente di Milano.\n\n" +
        "Martedì tredici è il compleanno di sua madre: compie sessantacinque anni. " +
        "Paolo compra una torta e ventiquattro rose rosse.\n\n" +
        "Mercoledì alle diciannove ha lezione di inglese e giovedì alle sette di mattina " +
        "va in palestra. Venerdì sedici prende per Napoli il treno delle quindici e quaranta.\n\n" +
        "Il biglietto costa trentotto euro. \"Che ore sono?\" chiede Paolo al collega. " +
        "\"Sono le nove meno cinque\". Paolo corre: è già in ritardo!",
      gloss: { riunione: "reunión", ufficio: "oficina", quarto: "cuarto",
               cliente: "cliente", compleanno: "cumpleaños", compie: "cumple", torta: "torta", palestra: "gimnasio",
               biglietto: "pasaje", collega: "compañero de trabajo", corre: "corre", ritardo: "retraso (in ritardo = tarde)" },
      questions: [
        ["¿A qué hora es la reunión del lunes?", ["a las ocho y media", "a las diez y cuarto", "a las siete", "a las nueve"], "a las ocho y media"],
        ["¿Cuántos años cumple la madre?", ["sesenta y cinco", "cincuenta y seis", "setenta", "sesenta"], "sesenta y cinco"],
        ["¿Cuánto cuesta el pasaje?", ["treinta y ocho euros", "veintiocho euros", "cuarenta euros", "dieciocho euros"], "treinta y ocho euros"]
      ],
      hunt: { label: "Tocá los números escritos en letras", targets: ["dodici", "otto", "dieci", "tredici", "sessantacinque", "ventiquattro", "diciannove", "sette", "sedici", "quindici", "quaranta", "trentotto", "nove", "cinque"] } },

    { id: "w-08", week: 8, n: 6, level: "A1", emoji: "🎙️", title: "Un'intervista alla radio",
      grammar: "domande e interrogativi",
      text:
        "Oggi alla radio c'è un'intervista con Luca, un giovane cuoco di Palermo.\n\n" +
        "\"Luca, chi è la persona speciale nella tua cucina?\" " +
        "\"Mia nonna, senza dubbio.\"\n" +
        "\"Dove lavori adesso?\" \"In un piccolo ristorante vicino al porto.\"\n" +
        "\"Quando apri la mattina?\" \"Alle undici, ma arrivo alle otto.\"\n" +
        "\"Che cosa cucini di solito?\" \"Pesce, soprattutto. E la pasta con le sarde.\"\n" +
        "\"Quanti clienti hai ogni sera?\" \"Circa cinquanta.\"\n" +
        "\"Perché fai questo lavoro?\" \"Perché amo il mare e amo le persone.\"\n" +
        "\"E come stai, dopo tante ore in cucina?\" \"Stanco, ma felice!\"",
      gloss: { intervista: "entrevista", giovane: "joven", cuoco: "cocinero", dubbio: "duda (senza dubbio = sin duda)",
               porto: "puerto", solito: "habitual (di solito = por lo general)", soprattutto: "sobre todo", sarde: "sardinas",
               circa: "más o menos", felice: "feliz" },
      questions: [
        ["¿Quién es la persona especial en su cocina?", ["su abuela", "su madre", "un cliente", "su jefe"], "su abuela"],
        ["¿Dónde trabaja?", ["en un restaurante cerca del puerto", "en un hotel", "en la radio", "en Milán"], "en un restaurante cerca del puerto"],
        ["¿Por qué hace este trabajo?", ["ama el mar y a la gente", "gana mucho", "no tiene otra opción", "por su padre"], "ama el mar y a la gente"]
      ],
      hunt: { label: "Tocá las palabras interrogativas", targets: ["chi", "dove", "quando", "che", "quanti", "perché", "come"] } },

    { id: "w-10", week: 10, n: 7, level: "A2", emoji: "🎁", title: "Il regalo per la nonna",
      grammar: "pronomi personali",
      text:
        "Domenica è la festa della nonna Rosa e i nipoti preparano un regalo. " +
        "\"Le compriamo un libro?\" chiede Giulia. \"No, la nonna ha già tanti libri e non li legge più\", " +
        "risponde Marco.\n\n" +
        "\"Allora le regaliamo una pianta?\" \"Buona idea! La mettiamo sul balcone e lei la guarda ogni mattina.\"\n\n" +
        "Marco chiama il fioraio e gli chiede un'orchidea bianca. Il fioraio la prepara e " +
        "gli dice: \"La potete prendere sabato\".\n\n" +
        "Domenica la nonna apre il pacco e sorride: \"Ragazzi, mi fate sempre felice! " +
        "Vi voglio bene\". I nipoti la abbracciano forte.",
      gloss: { festa: "fiesta", nipoti: "nietos", regalo: "regalo", già: "ya", pianta: "planta", balcone: "balcón",
               fioraio: "florista", orchidea: "orquídea", pacco: "paquete", sorride: "sonríe",
               bene: "bien (vi voglio bene = los quiero)", abbracciano: "abrazan", forte: "fuerte" },
      questions: [
        ["¿Por qué no le regalan un libro?", ["ya tiene muchos y no los lee", "no le gusta leer", "son caros", "no hay librería"], "ya tiene muchos y no los lee"],
        ["¿Qué le regalan al final?", ["una orquídea blanca", "un libro", "una torta", "un viaje"], "una orquídea blanca"],
        ["¿Qué hace la abuela?", ["sonríe y les dice que los quiere", "llora", "se enoja", "no abre el paquete"], "sonríe y les dice que los quiere"]
      ],
      hunt: { label: "Tocá los pronombres de objeto (le, la, li, gli, mi, vi)", targets: ["le", "la", "li", "gli", "mi", "vi"] } },

    { id: "w-14", week: 14, n: 8, level: "A2", emoji: "🍕", title: "Gusti di famiglia",
      grammar: "piacere e verbi simili",
      text:
        "Nella famiglia Bianchi nessuno ha gli stessi gusti. A papà piace il calcio, " +
        "ma non gli piacciono i film romantici. A mamma piacciono i libri gialli e le passeggiate in montagna.\n\n" +
        "A Chiara, la figlia, piace ballare. Le piacciono la musica pop e i concerti. " +
        "Il fratello, Tommaso, preferisce i videogiochi: gli piace stare a casa.\n\n" +
        "La domenica è difficile decidere cosa fare. Ieri Chiara ha proposto il mare: " +
        "a tutti è piaciuta l'idea, tranne a Tommaso. Alla fine sono andati al mare " +
        "e Tommaso ha giocato sul telefono. \"Mi manca il mio computer!\" ha detto.",
      gloss: { gusti: "gustos", nessuno: "nadie", stessi: "mismos", gialli: "policiales (libri gialli = novelas policiales)",
               passeggiate: "caminatas", ballare: "bailar", concerti: "recitales", videogiochi: "videojuegos",
               decidere: "decidir", proposto: "propuesto", tranne: "excepto", manca: "extraña (me falta)" },
      questions: [
        ["¿Qué no le gusta al papá?", ["las películas románticas", "el fútbol", "la montaña", "la música"], "las películas románticas"],
        ["¿Qué le gusta a Tommaso?", ["los videojuegos", "bailar", "los libros", "la montaña"], "los videojuegos"],
        ["¿Qué extraña Tommaso en la playa?", ["su computadora", "a su mamá", "la pizza", "la montaña"], "su computadora"]
      ],
      hunt: { label: "Tocá las formas de piacere y mancare", targets: ["piace", "piacciono", "piaciuta", "manca"] } },

    { id: "w-16", week: 16, n: 9, level: "A2", emoji: "😴", title: "Una mattina storta",
      grammar: "riflessivi al passato",
      text:
        "Ieri Giorgio non ha sentito la sveglia e si è svegliato alle otto e mezza. " +
        "Si è alzato di corsa, si è lavato in due minuti e non si è fatto la barba.\n\n" +
        "Si è vestito al buio e si è messo due calzini diversi: un calzino blu e un calzino verde. " +
        "Poi si è accorto che pioveva e non trovava l'ombrello.\n\n" +
        "In ufficio i colleghi si sono messi a ridere. Giorgio si è arrabbiato un po', " +
        "ma poi si è guardato i piedi e anche lui si è divertito.\n\n" +
        "La sera lui e sua moglie si sono seduti sul divano e si sono raccontati la giornata.",
      gloss: { sveglia: "despertador", corsa: "carrera (di corsa = a las corridas)", barba: "barba",
               buio: "oscuridad", calzini: "medias", pioveva: "llovía",
               ombrello: "paraguas", ridere: "reírse", arrabbiato: "enojado", piedi: "pies",
               divano: "sillón", raccontati: "contado (se contaron)", accorto: "dado cuenta" },
      questions: [
        ["¿Por qué se despertó tarde?", ["no oyó el despertador", "estaba enfermo", "era domingo", "se quedó sin luz"], "no oyó el despertador"],
        ["¿Qué tenía de raro?", ["dos medias distintas", "dos zapatos distintos", "la camisa al revés", "no tenía zapatos"], "dos medias distintas"],
        ["¿Cómo terminó el día?", ["contándose el día con su mujer", "enojado", "en la oficina", "sin cenar"], "contándose el día con su mujer"]
      ],
      hunt: { label: "Tocá los auxiliares de los reflexivos (è, sono)", targets: ["è", "sono"] } },

    { id: "w-17", week: 17, n: 10, level: "A2", emoji: "📦", title: "Il trasloco",
      grammar: "dimostrativi, possessivi, indefiniti",
      text:
        "Oggi Elena e Marco cambiano casa. Ci sono scatole dappertutto. " +
        "\"Di chi è questa scatola?\" chiede Marco. \"È mia: dentro ci sono i miei libri\".\n\n" +
        "\"E quella lì, vicino alla porta?\" \"Quella è tua: ci sono le tue scarpe e qualche maglione\".\n\n" +
        "Alcuni amici aiutano con i mobili. Ognuno porta qualcosa: Luca porta le sedie, " +
        "Anna porta quel vecchio specchio della nonna.\n\n" +
        "Alla fine della giornata sono tutti stanchi. \"Questo appartamento è perfetto\", dice Elena. " +
        "\"Sì, ma quelle scale... Nessuno vuole più portare niente!\" risponde Marco, e ride.",
      gloss: { scatole: "cajas", scatola: "caja", dappertutto: "por todas partes", dentro: "adentro",
               maglione: "pulóver", mobili: "muebles", ognuno: "cada uno", specchio: "espejo", scale: "escaleras",
               ride: "se ríe", appartamento: "departamento" },
      questions: [
        ["¿Qué hay en la caja de Elena?", ["sus libros", "zapatos", "platos", "ropa"], "sus libros"],
        ["¿Qué lleva Anna?", ["el espejo viejo de la abuela", "las sillas", "una caja de libros", "nada"], "el espejo viejo de la abuela"],
        ["¿De qué se queja Marco al final?", ["de las escaleras", "del departamento", "de los amigos", "del precio"], "de las escaleras"]
      ],
      hunt: { label: "Tocá los demostrativos (questa, quella, quel…)", targets: ["questa", "quella", "quel", "questo", "quelle"] } },

    { id: "w-23", week: 23, n: 11, level: "B1", emoji: "⚖️", title: "Bologna o Milano?",
      grammar: "comparativi e superlativi",
      text:
        "Francesca deve scegliere dove vivere. Milano è più grande di Bologna e offre più lavoro, " +
        "ma è anche più cara. Un appartamento a Milano costa molto più che a Bologna.\n\n" +
        "Bologna è meno caotica e più tranquilla. Per molti è la città più simpatica d'Italia, " +
        "e la cucina è migliore: i tortellini sono buonissimi!\n\n" +
        "A Milano però lo stipendio è più alto e ci sono più opportunità per una giovane architetta. " +
        "Francesca pensa: \"Il lavoro è importante quanto la qualità della vita\".\n\n" +
        "Alla fine sceglie Bologna, ma lavora due giorni a settimana a Milano. " +
        "Il treno ci mette solo un'ora: è la soluzione migliore.",
      gloss: { scegliere: "elegir", offre: "ofrece", cara: "cara", caotica: "caótica", stipendio: "sueldo",
               opportunità: "oportunidades", architetta: "arquitecta", qualità: "calidad", mette: "tarda (ci mette)",
               soluzione: "solución" },
      questions: [
        ["¿Qué ciudad es más cara?", ["Milán", "Bolonia", "las dos igual", "ninguna"], "Milán"],
        ["¿Qué ofrece Milán?", ["un sueldo más alto", "mejor comida", "más tranquilidad", "casas más baratas"], "un sueldo más alto"],
        ["¿Qué decide Francesca?", ["vivir en Bolonia y trabajar dos días en Milán", "vivir en Milán", "quedarse en su casa", "irse al exterior"], "vivir en Bolonia y trabajar dos días en Milán"]
      ],
      hunt: { label: "Tocá las formas de comparación (più, meno, migliore…)", targets: ["più", "meno", "migliore", "buonissimi", "quanto"] } },

    { id: "w-27", week: 27, n: 12, level: "B1", emoji: "💼", title: "Il primo mese di Chiara",
      grammar: "avverbi",
      text:
        "Chiara lavora in una casa editrice da appena un mese. Arriva sempre puntualmente alle nove " +
        "e spesso resta fino a tardi.\n\n" +
        "All'inizio parlava pochissimo: ascoltava attentamente i colleghi e prendeva appunti. " +
        "Adesso si sente già più sicura e discute tranquillamente con il capo.\n\n" +
        "Il lavoro è davvero interessante, ma a volte è piuttosto faticoso. " +
        "Ieri, per esempio, ha letto velocemente tre manoscritti e alla fine era completamente stanca.\n\n" +
        "Comunque Chiara è contenta: finalmente fa il lavoro che sognava. " +
        "\"Non ho ancora capito tutto\", dice, \"ma imparo qualcosa ogni giorno\".",
      gloss: { editrice: "editorial (casa editrice)", appena: "apenas", resta: "se queda",
               inizio: "principio (all'inizio = al principio)", appunti: "apuntes", sicura: "segura", capo: "jefe", davvero: "de verdad",
               volte: "veces (a volte = a veces)", attentamente: "con atención", piuttosto: "bastante", faticoso: "cansador", manoscritti: "manuscritos",
               sognava: "soñaba", imparo: "aprendo" },
      questions: [
        ["¿Hace cuánto trabaja Chiara en la editorial?", ["apenas un mes", "un año", "una semana", "tres meses"], "apenas un mes"],
        ["¿Qué hacía al principio?", ["escuchaba con atención y tomaba apuntes", "hablaba mucho", "llegaba tarde", "discutía con el jefe"], "escuchaba con atención y tomaba apuntes"],
        ["¿Cómo se siente ahora?", ["contenta: hace el trabajo que soñaba", "aburrida", "quiere renunciar", "enojada con el jefe"], "contenta: hace el trabajo que soñaba"]
      ],
      hunt: { label: "Tocá los adverbios en -mente", targets: ["puntualmente", "attentamente", "tranquillamente", "velocemente", "completamente", "finalmente"] } },

    { id: "w-28", week: 28, n: 13, level: "B1", emoji: "🏙️", title: "Città o campagna?",
      grammar: "connettivi",
      text:
        "Molti giovani italiani lasciano i piccoli paesi e vanno in città. Infatti in città ci sono " +
        "più università e più lavoro. Inoltre la vita culturale è più ricca.\n\n" +
        "Tuttavia la città ha anche dei problemi: gli affitti sono alti, quindi molti vivono " +
        "in appartamenti piccoli. E poi il traffico e il rumore stancano.\n\n" +
        "In campagna, invece, la vita è più lenta e le case costano meno. " +
        "Però i servizi sono pochi e spesso bisogna prendere la macchina per tutto.\n\n" +
        "Insomma, nessuna scelta è perfetta. Comunque, grazie al lavoro da casa, " +
        "oggi alcuni giovani tornano nei paesi, anche se non è sempre facile.",
      gloss: { paesi: "pueblos", lasciano: "dejan", ricca: "rica", affitti: "alquileres", rumore: "ruido",
               stancano: "cansan", lenta: "lenta", servizi: "servicios", bisogna: "hay que", scelta: "elección" },
      questions: [
        ["¿Por qué muchos jóvenes van a la ciudad?", ["hay más universidades y trabajo", "es más barata", "es más tranquila", "no hay tráfico"], "hay más universidades y trabajo"],
        ["¿Qué problema tiene el campo?", ["pocos servicios y hace falta el auto", "el ruido", "los alquileres altos", "el tráfico"], "pocos servicios y hace falta el auto"],
        ["¿Qué cambió con el trabajo desde casa?", ["algunos jóvenes vuelven a los pueblos", "nadie vuelve", "las ciudades se vaciaron", "subieron los alquileres del campo"], "algunos jóvenes vuelven a los pueblos"]
      ],
      hunt: { label: "Tocá los conectores (infatti, inoltre, tuttavia…)", targets: ["infatti", "inoltre", "tuttavia", "quindi", "invece", "però", "insomma", "comunque"] } },

    { id: "w-32", week: 32, n: 14, level: "B2", emoji: "✉️", title: "La lettera del nonno",
      grammar: "concordanza dei tempi",
      text:
        "Mentre riordinava la soffitta, Laura ha trovato una lettera che il nonno aveva scritto alla nonna nel 1962.\n\n" +
        "\"Cara Maria, pensavo che non mi rispondessi più. Temevo che tuo padre ti avesse proibito " +
        "di scrivermi. Quando è arrivata la tua lettera, ho capito che mi avevi aspettato.\n\n" +
        "Ti prometto che troverò un lavoro e che ti sposerò entro un anno. " +
        "Spero che tu non abbia cambiato idea e che mi aspetti ancora un po'.\"\n\n" +
        "Laura ha pianto mentre la leggeva. Sapeva che i nonni si erano sposati nel 1963, " +
        "ma non immaginava che fosse stato così difficile.",
      gloss: { riordinava: "ordenaba", soffitta: "altillo", temevo: "temía", proibito: "prohibido",
               prometto: "prometo", sposerò: "me casaré con", entro: "dentro de", pianto: "llorado",
               immaginava: "imaginaba" },
      questions: [
        ["¿Dónde encontró Laura la carta?", ["en el altillo", "en un libro", "en el correo", "en la cocina"], "en el altillo"],
        ["¿Qué temía el abuelo?", ["que el padre de ella le prohibiera escribirle", "perder el trabajo", "que la carta no llegara", "mudarse"], "que el padre de ella le prohibiera escribirle"],
        ["¿Qué no se imaginaba Laura?", ["que hubiera sido tan difícil", "que se hubieran casado", "que el abuelo escribiera", "que existiera la carta"], "que hubiera sido tan difícil"]
      ],
      hunt: { label: "Tocá los congiuntivi (rispondessi, avesse, abbia, aspetti, fosse)", targets: ["rispondessi", "avesse", "abbia", "aspetti", "fosse"] } },

    { id: "w-35", week: 35, n: 15, level: "B2", emoji: "🧀", title: "Com'è fatto il parmigiano",
      grammar: "la voce passiva",
      text:
        "Il Parmigiano Reggiano è prodotto soltanto in alcune province dell'Emilia-Romagna e della Lombardia. " +
        "Il latte viene munto la sera e la mattina, e viene lavorato in grandi caldaie di rame.\n\n" +
        "La forma viene poi immersa in acqua e sale per circa venti giorni. " +
        "Dopo, le forme sono sistemate su lunghi scaffali, dove vengono girate e controllate regolarmente.\n\n" +
        "Il formaggio deve essere stagionato almeno dodici mesi. Ogni forma è esaminata da un esperto, " +
        "che la batte con un martelletto per sentire se è perfetta.\n\n" +
        "Pare che il parmigiano fosse già apprezzato nel Medioevo: " +
        "è stato citato perfino da Boccaccio nel Decameron.",
      gloss: { soltanto: "solamente", province: "provincias", munto: "ordeñado", caldaie: "calderas", rame: "cobre",
               forma: "horma", immersa: "sumergida", sistemate: "acomodadas", scaffali: "estantes",
               girate: "dadas vuelta", stagionato: "estacionado", almeno: "por lo menos", esaminata: "examinada",
               batte: "golpea", martelletto: "martillito", apprezzato: "apreciado", pare: "parece", perfino: "hasta, incluso", citato: "citado" },
      questions: [
        ["¿Cuándo se ordeña la leche?", ["a la tarde y a la mañana", "solo de noche", "una vez por semana", "al mediodía"], "a la tarde y a la mañana"],
        ["¿Cuánto tiempo se estaciona como mínimo?", ["doce meses", "veinte días", "dos años", "seis meses"], "doce meses"],
        ["¿Para qué el experto golpea la horma?", ["para oír si está perfecta", "para cortarla", "para limpiarla", "para darla vuelta"], "para oír si está perfecta"]
      ],
      hunt: { label: "Tocá los participios de la pasiva (prodotto, munto…)", targets: ["prodotto", "munto", "lavorato", "immersa", "sistemate", "girate", "controllate", "stagionato", "esaminata", "citato"] } },

    { id: "w-43", week: 43, n: 16, level: "C1", emoji: "🎓", title: "Imparare da adulti",
      grammar: "l'infinito",
      text:
        "Imparare una lingua da adulti non è impossibile, ma richiede costanza. " +
        "Secondo molti studiosi, studiare venti minuti ogni giorno è più utile che passare " +
        "tre ore sui libri la domenica.\n\n" +
        "Dopo aver letto un testo, conviene riassumerlo con parole proprie: " +
        "ripetere senza capire serve a poco. Prima di andare a dormire, è utile " +
        "ripassare le parole nuove, perché il sonno aiuta a ricordarle.\n\n" +
        "L'importante è non avere paura di sbagliare. Sbagliare fa parte del processo, " +
        "e correggersi da soli insegna più che ricevere la risposta giusta.\n\n" +
        "Per non perdere la motivazione, basta fissarsi obiettivi piccoli e festeggiare ogni progresso.",
      gloss: { richiede: "requiere", costanza: "constancia", studiosi: "investigadores", conviene: "conviene",
               riassumerlo: "resumirlo", proprie: "propias", ripassare: "repasar", sonno: "sueño",
               sbagliare: "equivocarse", correggersi: "corregirse", fissarsi: "ponerse", obiettivi: "objetivos",
               festeggiare: "festejar", motivazione: "motivación" },
      questions: [
        ["¿Qué es más útil según el texto?", ["estudiar veinte minutos por día", "tres horas el domingo", "no estudiar", "leer sin entender"], "estudiar veinte minutos por día"],
        ["¿Por qué repasar antes de dormir?", ["el sueño ayuda a recordar", "hay más tiempo", "se está más despierto", "es más divertido"], "el sueño ayuda a recordar"],
        ["¿Qué enseña más?", ["corregirse solo", "recibir la respuesta correcta", "no equivocarse nunca", "estudiar de memoria"], "corregirse solo"]
      ],
      hunt: { label: "Tocá los infinitivos usados como sustantivo o después de preposición", targets: ["imparare", "studiare", "passare", "aver", "andare", "dormire", "ripassare", "ricordarle", "avere", "sbagliare", "perdere", "fissarsi", "festeggiare"] } },

    { id: "w-46", week: 46, n: 17, level: "C1", emoji: "🐱", title: "Il gattino del vicino",
      grammar: "suffissi e alterazione",
      text:
        "Nel palazzone dove abito vive un vecchietto simpaticissimo, il signor Bruno. " +
        "Ha un gattino nero e un cagnolino bianco che abbaia a tutti.\n\n" +
        "Ogni mattina il signor Bruno scende con il suo cappellino e un giornalino sotto il braccio. " +
        "Si siede su una panchina del giardinetto e dà qualche briciolina ai passerotti.\n\n" +
        "Ieri il gattino è sparito. Il vecchietto era disperato: l'ha cercato in ogni angolino. " +
        "Alla fine l'abbiamo trovato dentro uno scatolone, addormentato su un vecchio maglione.\n\n" +
        "\"Che furbacchione!\" ha detto il signor Bruno, e per festeggiare " +
        "ci ha offerto un caffettino al bar.",
      gloss: { palazzone: "edificio grandote", vecchietto: "viejito", abbaia: "ladra", scende: "baja",
               cappellino: "sombrerito", giornalino: "revistita, diarito", braccio: "brazo", briciolina: "miguita",
               passerotti: "gorriones", sparito: "desaparecido", angolino: "rinconcito", scatolone: "cajón, caja grande",
               addormentato: "dormido", furbacchione: "pícaro, vivo", caffettino: "cafecito" },
      questions: [
        ["¿Qué animales tiene el señor Bruno?", ["un gatito negro y un perrito blanco", "dos perros", "un pájaro", "un gato blanco"], "un gatito negro y un perrito blanco"],
        ["¿Dónde encontraron al gatito?", ["dormido en una caja grande", "en el bar", "en el jardín", "en la calle"], "dormido en una caja grande"],
        ["¿Cómo festejó Bruno?", ["los invitó a un cafecito", "hizo una fiesta", "compró una torta", "no festejó"], "los invitó a un cafecito"]
      ],
      hunt: { label: "Tocá las palabras con sufijo (-ino, -etto, -one…)", targets: ["palazzone", "vecchietto", "gattino", "cagnolino", "cappellino", "giornalino", "giardinetto", "briciolina", "passerotti", "angolino", "scatolone", "furbacchione", "caffettino"] } },

    { id: "w-47", week: 47, n: 18, level: "C1", emoji: "🧮", title: "La ricetta della nonna",
      grammar: "numerali, misure e quantità",
      text:
        "Per il ragù della nonna servono mezzo chilo di carne macinata, un etto di pancetta, " +
        "una carota, una costa di sedano e mezza cipolla.\n\n" +
        "Si aggiungono un bicchiere di vino rosso, due cucchiai di concentrato di pomodoro " +
        "e circa un litro e mezzo di passata. Il sugo deve cuocere almeno tre ore a fuoco basso.\n\n" +
        "La nonna dice che la ricetta basta per una decina di persone, " +
        "ma la nostra famiglia è di sei persone: gli avanzi finiscono in freezer.\n\n" +
        "Un terzo del ragù va sulle tagliatelle della domenica; il resto, " +
        "la metà almeno, lo regaliamo agli zii, che ne vanno pazzi.",
      gloss: { ragù: "salsa boloñesa", macinata: "picada", etto: "cien gramos", pancetta: "panceta",
               costa: "rama", sedano: "apio", cipolla: "cebolla", aggiungono: "agregan", cucchiai: "cucharadas",
               passata: "puré de tomate", sugo: "salsa", cuocere: "cocinarse", fuoco: "fuego",
               decina: "unas diez", avanzi: "sobras", pazzi: "locos (ne vanno pazzi = les encanta)", tagliatelle: "tallarines al huevo" },
      questions: [
        ["¿Cuánto tiempo se cocina la salsa?", ["por lo menos tres horas", "media hora", "un día", "una hora"], "por lo menos tres horas"],
        ["¿Para cuántas personas alcanza la receta?", ["unas diez", "seis", "dos", "veinte"], "unas diez"],
        ["¿Qué hacen con lo que sobra?", ["va al freezer y a los tíos", "lo tiran", "lo venden", "lo comen al día siguiente"], "va al freezer y a los tíos"]
      ],
      hunt: { label: "Tocá las medidas y cantidades (mezzo, etto, decina…)", targets: ["mezzo", "chilo", "etto", "mezza", "litro", "decina", "terzo", "metà"] } },

    { id: "w-50", week: 50, n: 19, level: "C1", emoji: "🔤", title: "Parole che ingannano",
      grammar: "lessico avanzato e falsi amici",
      text:
        "Appena arrivata a Roma, Valeria ha detto al suo coinquilino che era \"molto imbarazzata\", " +
        "volendo dire che si vergognava. Lui ha capito subito, ma altre parole sono state più insidiose.\n\n" +
        "In un negozio ha chiesto una \"salsa\" per la pasta e le hanno dato del ketchup: " +
        "in italiano si dice \"sugo\". Poi ha raccontato che il suo capo era \"molto largo\", " +
        "pensando alla generosità, e i colleghi si sono messi a ridere.\n\n" +
        "Ormai Valeria ha imparato la lezione: prima di usare una parola che somiglia allo spagnolo, " +
        "la controlla sul dizionario. \"Le parole più pericolose\", dice, " +
        "\"sono quelle che sembrano facili\".",
      gloss: { imbarazzata: "avergonzada, incómoda", vergognava: "le daba vergüenza", coinquilino: "compañero de departamento",
               insidiose: "traicioneras", negozio: "negocio", sugo: "salsa (para pasta)", largo: "ancho",
               generosità: "generosidad", ormai: "a esta altura", somiglia: "se parece", pericolose: "peligrosas" },
      questions: [
        ["¿Qué le dieron cuando pidió «salsa»?", ["ketchup", "salsa de tomate", "aceite", "queso"], "ketchup"],
        ["¿Por qué se rieron los compañeros?", ["dijo «largo» pensando en «generoso»", "llegó tarde", "habló en español", "se equivocó de oficina"], "dijo «largo» pensando en «generoso»"],
        ["¿Qué hace ahora Valeria?", ["controla en el diccionario las palabras parecidas al español", "habla solo en inglés", "no usa palabras nuevas", "pregunta al jefe"], "controla en el diccionario las palabras parecidas al español"]
      ],
      hunt: { label: "Tocá los falsos amigos del texto", targets: ["imbarazzata", "salsa", "largo"] } }
  ];

  var api = { TESTI: TESTI };
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.LettureSettimana = api;
})(typeof window !== "undefined" ? window : globalThis);
