/*
 * Il laboratorio di La Via C1: i dati.  La logica (sessioni, opzioni,
 * interleaving) è nel nucleo, docs/js/lab.js, che legge window.LAB_DATA.
 *
 *  Ponte        — transfer dallo spagnolo: regole di corrispondenza tra
 *                 cognati (Ringbom 2007; Otwinowska 2015).  Chi parla spagnolo
 *                 conosce già migliaia di parole italiane: basta la regola.
 *                 Ogni regola trae `week`: la settimana del percorso in cui
 *                 entra.
 *  Falsi amici  — lo stesso transfer, dove tradisce.  Entrano nel percorso
 *                 in FALSI_WEEK.
 *  Capire       — input strutturato (VanPatten & Cadierno 1993; VanPatten 2004):
 *                 prima di produrre una forma, imparare a interpretarla.  Ogni
 *                 item si risolve solo guardando la forma, non il contesto.
 */
(function (root) {
  "use strict";

  /* ------------------------------------------------------------- ponte */

  // [spagnolo, italiano, accettate in più?]
  var RULES = [
    { id: "zione", week: 2, h: "-ción → -zione",
      body: "Casi todas las palabras en **-ción** tienen gemela italiana en **-zione**, y son femeninas: *la nazione*, *la stazione*. Ojo: **-cción** pasa a **-zione** (*acción → azione*, *lección → lezione*), y a veces se dobla otra consonante (*atención → attenzione*).",
      ex: [["nación", "nazione"], ["atención", "attenzione"]],
      words: [["nación", "nazione"], ["estación", "stazione"], ["información", "informazione"],
              ["situación", "situazione"], ["relación", "relazione"], ["educación", "educazione"],
              ["solución", "soluzione"], ["posición", "posizione"], ["condición", "condizione"],
              ["tradición", "tradizione"], ["atención", "attenzione"], ["colección", "collezione"],
              ["lección", "lezione"], ["dirección", "direzione"], ["organización", "organizzazione"],
              ["conversación", "conversazione"]] },

    { id: "ta", week: 3, h: "-dad / -tad → -tà",
      body: "Las palabras en **-dad** o **-tad** terminan en **-tà**, con acento, en italiano. Son femeninas e invariables: *la città, le città*.",
      ex: [["ciudad", "città"], ["libertad", "libertà"]],
      words: [["ciudad", "città"], ["universidad", "università"], ["libertad", "libertà"],
              ["verdad", "verità"], ["realidad", "realtà"], ["sociedad", "società"],
              ["calidad", "qualità"], ["posibilidad", "possibilità"], ["curiosidad", "curiosità"],
              ["felicidad", "felicità"], ["velocidad", "velocità"], ["electricidad", "elettricità"],
              ["dificultad", "difficoltà"], ["personalidad", "personalità"], ["publicidad", "pubblicità"]] },

    { id: "bile", week: 4, h: "-ble → -bile",
      body: "Los adjetivos en **-ble** terminan en **-bile**. Muchas veces la consonante se duplica: *posible → possibile*.",
      ex: [["posible", "possibile"], ["terrible", "terribile"]],
      words: [["posible", "possibile"], ["imposible", "impossibile"], ["terrible", "terribile"],
              ["increíble", "incredibile"], ["responsable", "responsabile"], ["probable", "probabile"],
              ["flexible", "flessibile"], ["horrible", "orribile"], ["visible", "visibile"],
              ["sensible", "sensibile"], ["inevitable", "inevitabile"], ["admirable", "ammirabile"]] },

    { id: "tt", week: 5, h: "-ct- / -pt- → -tt-",
      body: "Donde el español tiene **ct** o **pt**, el italiano dobla la **t**: *perfecto → perfetto*, *septiembre → settembre*. Lo mismo con **x** → **ss** entre vocales: *máximo → massimo*, *próximo → prossimo* (pero *exacto → esatto*: **ex-** + vocal da **es-**). Y a veces donde el español ya simplificó el grupo latino: *escrito → scritto*, *objeto → oggetto*.",
      ex: [["perfecto", "perfetto"], ["exacto", "esatto"]],
      words: [["perfecto", "perfetto"], ["efecto", "effetto"], ["director", "direttore"],
              ["actor", "attore"], ["exacto", "esatto"], ["proyecto", "progetto"],
              ["objeto", "oggetto"], ["dictador", "dittatore"], ["septiembre", "settembre"],
              ["octubre", "ottobre"], ["escrito", "scritto"], ["producto", "prodotto"],
              ["correcto", "corretto"], ["aspecto", "aspetto"]] },

    { id: "dittonghi", week: 6, h: "ie / ue → e / o",
      body: "Muchos diptongos del español son vocales simples en italiano: **ie → e**, **ue → o**. *Tiempo → tempo*, *puerta → porta*.",
      ex: [["tiempo", "tempo"], ["puerta", "porta"]],
      words: [["tiempo", "tempo"], ["fiesta", "festa"], ["tierra", "terra"], ["puerta", "porta"],
              ["cuerpo", "corpo"], ["muerte", "morte"], ["puente", "ponte"], ["fuerte", "forte"],
              ["puerto", "porto"], ["cierto", "certo"], ["siete", "sette"], ["diente", "dente"],
              ["viento", "vento"], ["serpiente", "serpente"]] },

    { id: "effe", week: 7, h: "h- → f-",
      body: "La **h-** inicial del español viene de una **f** latina que el italiano conservó: *hacer → fare*, *harina → farina*.",
      ex: [["harina", "farina"], ["humo", "fumo"]],
      words: [["harina", "farina"], ["horno", "forno"], ["humo", "fumo"], ["hambre", "fame"],
              ["hierro", "ferro"], ["hoja", "foglia"], ["higo", "fico"], ["hilo", "filo"],
              ["hormiga", "formica"], ["hongo", "fungo"], ["hacer", "fare"], ["hijo", "figlio"]] },

    { id: "pi", week: 8, h: "pl / cl / fl / bl / ll → pi / chi / fi / bi",
      body: "Después de consonante, la **l** latina se volvió **i** en italiano: *plaza → piazza*, *blanco → bianco*. La **ll-** del español suele ser **pi-**, **chi-** o **fi-**: *lleno → pieno*, *llave → chiave*, *llama → fiamma*.",
      ex: [["plaza", "piazza"], ["llave", "chiave"]],
      words: [["plaza", "piazza"], ["plato", "piatto"], ["pluma", "piuma"], ["blanco", "bianco"],
              ["flor", "fiore"], ["llave", "chiave"], ["lleno", "pieno"], ["llover", "piovere"],
              ["llamar", "chiamare"], ["llama (fuego)", "fiamma"], ["plano", "piano"],
              ["claro", "chiaro"], ["iglesia", "chiesa"], ["ejemplo", "esempio"]] },

    { id: "aggio", week: 9, h: "-aje → -aggio",
      body: "Las palabras en **-aje** pasan a **-aggio** y son masculinas: *el viaje → il viaggio*.",
      ex: [["viaje", "viaggio"], ["mensaje", "messaggio"]],
      words: [["viaje", "viaggio"], ["mensaje", "messaggio"], ["paisaje", "paesaggio"],
              ["coraje", "coraggio"], ["personaje", "personaggio"], ["pasaje", "passaggio"],
              ["masaje", "massaggio"], ["lenguaje", "linguaggio"], ["homenaje", "omaggio"],
              ["aterrizaje", "atterraggio"]] },

    { id: "colte", week: 10, h: "Palabras cultas: -ía → -ia, -cia → -zia",
      body: "El vocabulario de las ideas es casi igual: **-logía → -logia**, **-fía → -fia**, **-ía → -ia** (sin tilde). La **-cia** del español pasa a **-zia**: *democracia → democrazia*, *justicia → giustizia*. Ojo: **historia → storia**, sin *h* ni *i* inicial.",
      ex: [["sociología", "sociologia"], ["democracia", "democrazia"]],
      words: [["sociología", "sociologia"], ["filosofía", "filosofia"], ["ideología", "ideologia"],
              ["teoría", "teoria"], ["economía", "economia"], ["antropología", "antropologia"],
              ["poesía", "poesia"], ["burguesía", "borghesia"], ["democracia", "democrazia"],
              ["aristocracia", "aristocrazia"], ["justicia", "giustizia"], ["noticia", "notizia"],
              ["historia", "storia"], ["psicología", "psicologia"]] }
  ];

  /* -------------------------------------------------------- falsi amici */

  // [italiano, cosa significa davvero, trappola che sembra, nota]
  var FALSI = [
    ["burro", "manteca", "burro (animal)", "El burro es *asino*."],
    ["caldo", "caliente / calor", "caldo (sopa)", "*Fa caldo* = hace calor. El caldo es *brodo*."],
    ["largo", "ancho", "largo", "Largo es *lungo*."],
    ["salire", "subir", "salir", "Salir es *uscire*."],
    ["imbarazzata", "avergonzada", "embarazada", "Embarazada es *incinta*."],
    ["camera", "habitación", "cámara", "La cámara de fotos es *macchina fotografica*."],
    ["subito", "enseguida", "súbito / repentino", "*Torno subito* = vuelvo enseguida."],
    ["presto", "temprano / pronto", "prestado", "*A presto!* = ¡hasta pronto!"],
    ["gamba", "pierna", "gamba (camarón)", "El camarón es *gambero*."],
    ["topo", "ratón", "topo (animal)", "El topo es *talpa*. *Topolino* es Mickey Mouse."],
    ["cattivo", "malo", "cautivo", "*Un cattivo ragazzo* = un chico malo."],
    ["aceto", "vinagre", "aceite", "El aceite es *olio*."],
    ["tasca", "bolsillo", "tasca (bar)", "*Ce l'ho in tasca* = lo tengo en el bolsillo."],
    ["morbido", "suave / blando", "morboso", "*Un cuscino morbido* = una almohada suave."],
    ["cugino", "primo", "cocinero", "Y *primo* en italiano es «primero»."],
    ["vaso", "maceta / jarrón", "vaso", "El vaso para beber es *bicchiere*."],
    ["pronto", "¿hola? (al teléfono) / listo", "pronto", "*Pronto?* se dice al atender."],
    ["rumore", "ruido", "rumor", "El rumor es *voce* o *pettegolezzo*."],
    ["guardare", "mirar", "guardar", "Guardar es *conservare* o *mettere via*."],
    ["fermare", "detener / parar", "firmar", "Firmar es *firmare*."],
    ["autista", "chofer", "autista (TEA)", "*L'autista del bus* = el chofer del colectivo."],
    ["bravo", "bueno / hábil", "bravo (enojado)", "*È bravo in matematica* = es bueno en matemática."],
    ["nudo", "desnudo", "nudo", "El nudo es *nodo*."],
    ["negozio", "tienda / negocio", "negocio (empresa)", "Una empresa es *azienda* o *ditta*."],
    ["lontano", "lejos", "lento", "Suena a «lento», pero es lejos. *Vicino* = cerca."],
    ["compito", "tarea", "cómputo", "*I compiti* = los deberes."],
    ["squadra", "equipo", "cuadra (de la calle)", "La cuadra es *isolato*. *La mia squadra* = mi equipo de fútbol."],
    ["stanza", "habitación / cuarto", "estancia (campo)", "*Una stanza doppia* = una habitación doble."]
  ];

  /* ------------------------------------------------------------- capire */

  // Ogni set: una spiegazione breve (informazione esplicita, come prevede la
  // Processing Instruction) e item che si risolvono solo leggendo la forma.
  var CAPIRE = [
    { id: "persona", week: 5, h: "¿Quién lo hace?",
      body: "En italiano el sujeto casi nunca se dice: **la terminación del verbo** te dice quién. Leé solo el final: *-iamo* = nosotros, *-ate/-ete/-ite* = ustedes, *-ano/-ono* = ellos.",
      q: "¿Quién hace la acción?",
      opts: ["yo", "vos", "él / ella", "nosotros", "ustedes", "ellos"],
      items: [["Parliamo sempre di calcio.", "nosotros"], ["Parlano sempre di calcio.", "ellos"],
              ["Parlate troppo!", "ustedes"], ["Parla troppo!", "él / ella"],
              ["Domani partiamo presto.", "nosotros"], ["Domani partono presto.", "ellos"],
              ["Vivo a Roma da un anno.", "yo"], ["Vivi a Roma da un anno?", "vos"],
              ["Scrivete bene.", "ustedes"], ["Scrive bene.", "él / ella"],
              ["Dormono fino a tardi.", "ellos"], ["Dormiamo fino a tardi.", "nosotros"],
              ["Hai fame?", "vos"], ["Ho fame.", "yo"], ["Hanno fame.", "ellos"],
              ["Abbiamo fame.", "nosotros"]] },

    { id: "tempo", week: 19, h: "¿Cuándo pasa?",
      body: "Las pistas de tiempo (*ieri, domani*) no siempre están: aprendé a leer **el tiempo en el verbo**. *Ha mangiato* = ya pasó; *mangiava* = pasaba habitualmente; *mangerà* = va a pasar; *mangia* = pasa ahora o siempre.",
      q: "¿Cuándo pasa?",
      opts: ["ya pasó (una vez)", "pasaba siempre (antes)", "pasa ahora / siempre", "va a pasar"],
      items: [["Martín ha mangiato la pizza.", "ya pasó (una vez)"],
              ["Martín mangiava la pizza.", "pasaba siempre (antes)"],
              ["Martín mangerà la pizza.", "va a pasar"],
              ["Martín mangia la pizza.", "pasa ahora / siempre"],
              ["Giulia lavorava in un bar.", "pasaba siempre (antes)"],
              ["Giulia ha lavorato in un bar.", "ya pasó (una vez)"],
              ["Giulia lavorerà in un bar.", "va a pasar"],
              ["Andavamo al mare ogni estate.", "pasaba siempre (antes)"],
              ["Siamo andati al mare.", "ya pasó (una vez)"],
              ["Andremo al mare.", "va a pasar"],
              ["Esco con gli amici.", "pasa ahora / siempre"],
              ["Uscirò con gli amici.", "va a pasar"],
              ["Uscivo con gli amici.", "pasaba siempre (antes)"],
              ["Sono uscito con gli amici.", "ya pasó (una vez)"]] },

    { id: "accordo", week: 11, h: "¿Quiénes llegaron?",
      body: "Con *essere*, el participio concuerda con el sujeto: **-o** un hombre, **-a** una mujer, **-i** varios (al menos un hombre), **-e** varias mujeres. El verbo te dice quién llegó aunque no haya nombres.",
      q: "¿Quién llegó / salió / se fue?",
      opts: ["un hombre", "una mujer", "varios (algún hombre)", "varias mujeres"],
      items: [["È arrivato tardi.", "un hombre"], ["È arrivata tardi.", "una mujer"],
              ["Sono arrivati tardi.", "varios (algún hombre)"], ["Sono arrivate tardi.", "varias mujeres"],
              ["È uscita alle otto.", "una mujer"], ["Sono usciti alle otto.", "varios (algún hombre)"],
              ["È partito ieri.", "un hombre"], ["Sono partite ieri.", "varias mujeres"],
              ["Si è svegliata presto.", "una mujer", 16], ["Si sono svegliati presto.", "varios (algún hombre)", 16],
              ["È tornato stanco.", "un hombre"], ["Sono tornate stanche.", "varias mujeres"]] },

    { id: "certezza", week: 25, h: "¿Está seguro o es una opinión?",
      body: "Después de *penso che, credo che, mi sembra che, spero che* va **congiuntivo** (*sia, abbia, venga*): el hablante opina o desea. Con *so che, sono sicuro che, è vero che* va **indicativo** (*è, ha, viene*): lo da por un hecho. La forma del verbo te lo dice.",
      q: "¿Cómo lo presenta el hablante?",
      opts: ["como un hecho", "como opinión / deseo"],
      items: [["So che è tardi.", "como un hecho"], ["Penso che sia tardi.", "como opinión / deseo"],
              ["Credo che abbia ragione.", "como opinión / deseo"], ["È vero che ha ragione.", "como un hecho"],
              ["Spero che venga.", "como opinión / deseo"], ["Sono sicuro che viene.", "como un hecho"],
              ["Mi sembra che stia male.", "como opinión / deseo"], ["Vedo che sta male.", "como un hecho"],
              ["Dubito che lo sappia.", "como opinión / deseo"], ["Sappiamo che lo sa.", "como un hecho"],
              ["Immagino che siano stanchi.", "como opinión / deseo"], ["È chiaro che sono stanchi.", "como un hecho"]] },

    { id: "cortesia", week: 20, h: "¿Pedido cortés o directo?",
      body: "El **condizionale** (*vorrei, potrebbe, sarebbe*) suaviza: es la forma educada de pedir en un bar, una oficina o un mail. El presente (*voglio, può*) es más directo; *voglio* puede sonar brusco con desconocidos.",
      q: "¿Cómo suena?",
      opts: ["cortés / suave", "directo"],
      items: [["Vorrei un caffè.", "cortés / suave"], ["Voglio un caffè.", "directo"],
              ["Potrebbe ripetere?", "cortés / suave"], ["Può ripetere?", "directo"],
              ["Mi darebbe una mano?", "cortés / suave"], ["Mi dai una mano?", "directo"],
              ["Sarebbe possibile cambiare?", "cortés / suave"], ["È possibile cambiare?", "directo"],
              ["Avrei una domanda.", "cortés / suave"], ["Ho una domanda.", "directo"],
              ["Dovresti riposare.", "cortés / suave"], ["Devi riposare.", "directo"]] },

    { id: "pronomi", week: 10, h: "¿A quién se refiere?",
      body: "Los pronombres van **antes** del verbo conjugado y marcan género y número: *lo* (a él / eso), *la* (a ella), *li* (a ellos), *le* (a ellas); y en el indirecto, *gli* = **a él** y *le* = a ella. Mirá solo el pronombre.",
      q: "¿A qué se refiere el pronombre?",
      opts: ["al libro", "a la carta", "a los libros", "a las cartas"],
      items: [["Lo leggo stasera.", "al libro"], ["La leggo stasera.", "a la carta"],
              ["Li leggo stasera.", "a los libros"], ["Le leggo stasera.", "a las cartas"],
              // en passato prossimo: desde la semana 11
              ["L'ho letto ieri.", "al libro", 11], ["L'ho letta ieri.", "a la carta", 11],
              ["Li ho letti ieri.", "a los libros", 11], ["Le ho lette ieri.", "a las cartas", 11],
              ["Non lo trovo più.", "al libro"], ["Non le trovo più.", "a las cartas"]] },

    // ---- Tanda 4: un set por cada tema nuevo de la temporada 1 (Capire →
    // garden → producción) y cinco para las estructuras del C1.
    { id: "numero", week: 3, h: "¿Uno o varios?",
      body: "Muchas palabras **no cambian** en plural: las que llevan acento al final (*la città / le città*, *il caffè / i caffè*), las cortas y las extranjeras (*il re, il film, lo sport*). Ahí **el artículo** te dice si es uno o varios. Y *c'è* es para uno, *ci sono* para varios.",
      q: "¿Uno o varios?",
      opts: ["uno / una", "varios / varias"],
      items: [["la città", "uno / una"], ["le città", "varios / varias"],
              ["il caffè", "uno / una"], ["i caffè", "varios / varias"],
              ["lo studente", "uno / una"], ["gli studenti", "varios / varias"],
              ["il film", "uno / una"], ["i film", "varios / varias"],
              ["l'università", "uno / una"], ["le università", "varios / varias"],
              ["lo sport", "uno / una"], ["gli sport", "varios / varias"],
              ["C'è un bar qui vicino?", "uno / una"], ["Ci sono bar qui vicino?", "varios / varias"]] },

    { id: "gliele", week: 10, h: "¿A él o a ella?",
      body: "En el indirecto, *gli* = **a él** y *le* = **a ella** (o a usted, *Lei*); al hablar, *gli* también vale «a ellos». En castellano los dos son «le»; en italiano el pronombre ya te dice si es hombre o mujer. Con *scrivere, telefonare, rispondere, dire, dare, chiedere* va siempre el indirecto.",
      q: "¿A quién?",
      opts: ["a él", "a ella"],
      items: [["Gli scrivo una lettera.", "a él"], ["Le scrivo una lettera.", "a ella"],
              ["Gli telefono stasera.", "a él"], ["Le telefono stasera.", "a ella"],
              ["Gli rispondo subito.", "a él"], ["Le rispondo subito.", "a ella"],
              ["Gli dico la verità.", "a él"], ["Le dico la verità.", "a ella"],
              ["Gli do il libro.", "a él"], ["Le do il libro.", "a ella"],
              ["Gli chiedo un favore.", "a él"], ["Le chiedo un favore.", "a ella"]] },

    { id: "durata", week: 11, h: "¿Sigue pasando o ya terminó?",
      body: "*Presente + da* = empezó y **sigue** (*abito qui da due anni*: hace dos años que vivo acá). *Passato prossimo + per* = **duró y terminó** (*ho abitato qui per due anni*). *Passato prossimo + fa* = **cuándo** pasó (*sono arrivato due anni fa*). Mirá el tiempo del verbo y la palabrita.",
      q: "¿Qué te dice la frase?",
      opts: ["sigue pasando", "duró y ya terminó", "dice cuándo pasó"],
      items: [["Abito qui da due anni.", "sigue pasando"], ["Ho abitato qui per due anni.", "duró y ya terminó"],
              ["Sono arrivato qui due anni fa.", "dice cuándo pasó"],
              ["Studio italiano da sei mesi.", "sigue pasando"], ["Ho studiato italiano per sei mesi.", "duró y ya terminó"],
              ["Ho cominciato a studiare italiano sei mesi fa.", "dice cuándo pasó"],
              ["Lavoro in banca da un anno.", "sigue pasando"], ["Ho lavorato in banca per un anno.", "duró y ya terminó"],
              ["Ho lasciato la banca un anno fa.", "dice cuándo pasó"],
              ["Aspetto da mezz'ora!", "sigue pasando"], ["Ho aspettato per mezz'ora.", "duró y ya terminó"],
              ["Conosco Anna da molto tempo.", "sigue pasando"], ["Ho conosciuto Anna tanto tempo fa.", "dice cuándo pasó"]] },

    { id: "ordine", week: 12, h: "¿Orden o descripción?",
      body: "Con *tu*, el imperativo de *-are* termina en **-a** (*Parla!*), igual que el presente de él/ella (*Marco parla*): decide si le hablás a alguien (coma, nombre adelante, signo de exclamación). En negativo es más claro: la orden a *tu* es **non + infinitivo** (*Non parlare!*); *non parla* describe lo que hace otro.",
      q: "¿Es una orden o describe lo que alguien hace?",
      opts: ["una orden", "describe"],
      items: [["Non parlare!", "una orden"], ["Non parla.", "describe"],
              ["Non bere troppo!", "una orden"], ["Non beve mai.", "describe"],
              ["Luca, non mangiare!", "una orden"], ["Luca non mangia.", "describe"],
              ["Non uscire stasera!", "una orden"], ["Non esce stasera.", "describe"],
              ["Marco, aspetta qui!", "una orden"], ["Marco aspetta qui.", "describe"],
              ["Non dire niente!", "una orden"], ["Non dice niente.", "describe"]] },

    { id: "chifa", week: 40, h: "¿Quién lo hace?",
      body: "Con *fare* + infinitivo, el sujeto de *fare* **no hace** la acción: la encarga o la provoca. Quien la ejecuta va después, con *a* o con *da* (*faccio lavare la macchina a Marco*: lava Marco). Con *farsi*, el sujeto es el que la recibe: *mi faccio tagliare i capelli da Dina* (corta Dina).",
      q: "¿Quién hace la acción del infinitivo?",
      opts: ["el sujeto", "otra persona"],
      items: [["Faccio lavare la macchina a Marco.", "otra persona"], ["Lavo la macchina con Marco.", "el sujeto"],
              ["Mi sono fatta tagliare i capelli da Dina.", "otra persona"], ["Mi sono tagliata i capelli da sola.", "el sujeto"],
              ["Ho fatto riparare la bici.", "otra persona"], ["Ho riparato la bici.", "el sujeto"],
              ["Faccio cucinare mio marito.", "otra persona"], ["Cucino per mio marito.", "el sujeto"],
              ["Ho fatto scegliere il vino a Luca.", "otra persona"], ["Ho scelto il vino con Luca.", "el sujeto"],
              ["Farò dipingere la casa.", "otra persona"], ["Dipingerò la casa.", "el sujeto"]] },

    { id: "percezione", week: 41, h: "¿Lo viste pasar o te diste cuenta?",
      body: "Después de *vedere* y *sentire*, el infinitivo (*ho visto Maria uscire*) o la relativa (*ho visto Maria che usciva*) cuentan lo que **percibiste en el momento**. Con *che* + verbo, sin el nombre adelante (*ho visto che Maria usciva*, *ho sentito che…*), contás algo que **constataste** o de lo que te enteraste.",
      q: "¿Qué dice la frase?",
      opts: ["lo percibió en el momento", "se dio cuenta / se enteró"],
      items: [["Ho visto Maria uscire.", "lo percibió en el momento"], ["Ho visto che Maria usciva.", "se dio cuenta / se enteró"],
              ["Ho visto Maria che usciva.", "lo percibió en el momento"],
              ["Ho sentito i vicini litigare.", "lo percibió en el momento"], ["Ho sentito che i vicini hanno litigato.", "se dio cuenta / se enteró"],
              ["Ho visto il treno partire.", "lo percibió en el momento"], ["Ho visto che il treno era già partito.", "se dio cuenta / se enteró"],
              ["Ho sentito suonare il telefono.", "lo percibió en el momento"], ["Ho visto che avevi chiamato.", "se dio cuenta / se enteró"],
              ["Ho sentito Luca cantare.", "lo percibió en el momento"], ["Ho sentito che Luca canta in un coro.", "se dio cuenta / se enteró"]] },

    { id: "partabs", week: 44, h: "¿Qué pasó primero?",
      body: "Un participio solo al comienzo (*letta la lettera*, *finito il lavoro*) cuenta algo que **pasó antes** que lo de la principal. El gerundio (*leggendo*, *tornando*) cuenta algo que pasa **al mismo tiempo**. La forma te lo dice, sin *dopo* ni *mentre*.",
      q: "¿Cómo se ordenan los dos hechos?",
      opts: ["primero eso, después lo otro", "las dos cosas a la vez"],
      items: [["Letta la lettera, è uscita.", "primero eso, después lo otro"], ["Leggendo la lettera, sorrideva.", "las dos cosas a la vez"],
              ["Finito il lavoro, siamo andati al bar.", "primero eso, después lo otro"], ["Lavorando, ascolto la radio.", "las dos cosas a la vez"],
              ["Arrivata a casa, ha chiamato sua madre.", "primero eso, después lo otro"], ["Tornando a casa, ha chiamato sua madre.", "las dos cosas a la vez"],
              ["Mangiato il dolce, hanno chiesto il conto.", "primero eso, después lo otro"], ["Mangiando il dolce, chiacchieravano.", "las dos cosas a la vez"],
              ["Chiusa la porta, si è seduto.", "primero eso, después lo otro"], ["Chiudendo la porta, ha sentito un rumore.", "las dos cosas a la vez"],
              ["Partiti gli ospiti, abbiamo pulito tutto.", "primero eso, después lo otro"], ["Uscendo, ho salutato il portiere.", "las dos cosas a la vez"]] },

    { id: "ovs", week: 48, h: "¿Quién hizo qué?",
      body: "En la dislocación el objeto va **adelante** y un pronombre lo retoma: *il vino l'ha portato Luca* = Luca trajo el vino. El que hace la acción queda **después del verbo**. No te guíes por el orden: mirá el pronombre (*l', la, li*) y con quién concuerda el verbo.",
      q: "¿Quién hace la acción?",
      opts: ["el primero que se nombra", "el segundo que se nombra"],
      items: [["Il vino l'ha portato Luca.", "el segundo que se nombra"], ["Luca ha portato il vino.", "el primero que se nombra"],
              ["Marco l'ha visto Anna.", "el segundo que se nombra"], ["Marco ha visto Anna.", "el primero que se nombra"],
              ["La torta l'ha fatta la nonna.", "el segundo que se nombra"], ["La nonna ha fatto la torta.", "el primero que se nombra"],
              ["Giulia la chiama sempre Paolo.", "el segundo que se nombra"], ["Giulia chiama sempre Paolo.", "el primero que se nombra"],
              ["I bambini li accompagna Sara.", "el segundo que se nombra"], ["I bambini accompagnano Sara.", "el primero que se nombra"],
              ["Il professore lo stimano tutti.", "el segundo que se nombra"], ["Il professore stima tutti.", "el primero que se nombra"]] },

    { id: "scissa", week: 49, h: "¿Marco lo hizo o lo recibió?",
      body: "La frase escindida pone algo **en foco**: *è stato Marco a chiamare* = fue Marco el que llamó (*a* + infinitivo: Marco hace). *È Marco che ho chiamato* = es a Marco a quien llamé (el verbo tiene otro sujeto: Marco recibe). Mirá si después de *che* el verbo tiene sujeto propio.",
      q: "¿Marco hizo la acción o la recibió?",
      opts: ["la hizo", "la recibió"],
      items: [["È stato Marco a chiamare.", "la hizo"], ["È Marco che ho chiamato.", "la recibió"],
              ["È stato Marco a chiamarmi.", "la hizo"], ["È Marco che cerco.", "la recibió"],
              ["È Marco che ha vinto.", "la hizo"], ["È Marco che hanno premiato.", "la recibió"],
              ["È stato Marco a scegliere il vino.", "la hizo"], ["È Marco che hanno scelto come capo.", "la recibió"],
              ["È Marco che mi ha aiutato.", "la hizo"], ["È Marco che ho aiutato.", "la recibió"],
              ["Sono stati loro a invitare Marco.", "la recibió"], ["È a Marco che devi chiedere.", "la recibió"]] }
  ];

  root.LAB_DATA = {
    RULES: RULES,
    FALSI: FALSI,
    FALSI_WEEK: 11,
    CAPIRE: CAPIRE,
    ui: { ponte: "Pasalo al italiano", falsi: "¿Qué significa en italiano?" }
  };
})(typeof window !== "undefined" ? window : globalThis);
