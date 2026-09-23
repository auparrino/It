/* Scrivi: una misión semanal de producción libre.
 *
 * Cada semana (menos las de jefe) pide un texto corto con la función
 * comunicativa de la semana («contá tu fin de semana», «pedí algo con
 * cortesía») y con sus estructuras («al menos 4 verbos en passato
 * prossimo»).  No hay una respuesta única: el corrector cuenta las
 * estructuras pedidas y busca en el texto los errores que un
 * hispanohablante comete de verdad (español metido, artículo que no va con
 * el sustantivo, «ho andato», «a» personal, «il mio padre», «se avrei»…),
 * con el mismo diagnóstico del resto del curso.  Cada tarea trae un texto
 * modelo para comparar después de escribir.
 */
(function (root) {
  "use strict";
  var D = root.Diagnosi || (typeof require === "function" ? require("./diagnosi.js") : null);
  var Conj = root.Conj || (typeof require === "function" ? require("./conjugator.js") : null);

  /* ------------------------------------------------------------ tareas
     t: la consigna; min: palabras; use: [estructura, cuántas, etiqueta];
     model: un texto que cumple todo (tools/test_scrivi.js lo verifica). */
  var TASKS = {
    1: { t: "Presentate: de dónde sos, cuántos años tenés, qué tenés y cómo estás hoy.", min: 15,
         use: [["essere", 2, "2 formas de essere (sono, sei, è…)"], ["avere", 1, "1 forma de avere (ho, hai, ha…)"]],
         model: "Ciao! Sono Luca e sono argentino. Sono di Buenos Aires. Ho trent'anni e ho un cane. Oggi sono stanco, ma sono contento." },
    2: { t: "Contá qué tenés: hermanos, animales, cosas de tu casa. Usá sustantivos en plural.", min: 15,
         use: [["plurali", 4, "4 sustantivos en plural"]],
         model: "Ho due fratelli e tre sorelle. Ho un cane e due gatti. Ho molti libri, tre penne e due computer. I libri sono vecchi." },
    3: { t: "Estás en un bar: pedí para vos y para un amigo, y contá qué hay en la barra.", min: 15,
         use: [["articoli", 5, "5 artículos (il, lo, la, un, una…)"], ["prepArt", 1, "1 preposición articulada (sul, del, al…)"]],
         model: "Buongiorno! Un caffè e un cappuccino, per favore. E anche una brioche e un succo d'arancia. Sul bancone ci sono i cornetti, le paste e lo zucchero. Il caffè del bar è buono." },
    4: { t: "Describí a una persona que conocés: de dónde es, cómo es por fuera y por dentro.", min: 15,
         use: [["aggettivi", 5, "5 adjetivos concordados"]],
         model: "Marta è una ragazza spagnola. È alta e magra, ha i capelli lunghi e neri e gli occhi verdi. È simpatica e intelligente, ma un po' timida. È una brava insegnante." },
    5: { t: "Contá tu rutina de un día de semana: dónde trabajás o estudiás, qué comés, qué hacés a la noche.", min: 15,
         use: [["presente", 5, "5 verbos en presente"]],
         model: "La mattina prendo il treno alle otto. Lavoro in un ufficio in centro e parlo molto al telefono. A mezzogiorno mangio un panino con i colleghi. La sera leggo un libro o guardo la televisione. Dormo poco!" },
    6: { t: "Contá tu fin de semana típico: adónde vas, qué hacés, quién viene, qué tenés que hacer.", min: 15,
         use: [["irregolari", 4, "4 verbos irregulares (andare, fare, uscire, venire, dovere, volere, potere…)"]],
         model: "Il sabato esco con gli amici. Andiamo al cinema o facciamo una passeggiata in centro. La domenica vengono i nonni a pranzo e devo cucinare. Voglio riposare, ma non posso: faccio sempre tante cose!" },
    7: { t: "Escribí tu agenda de la semana: qué día, a qué hora y qué hacés. Los números, con letras.", min: 25,
         use: [["ore", 3, "3 horas (alle nove, all'una…)"], ["numeri", 3, "3 números escritos con letras"]],
         model: "Lunedì alle nove ho una riunione in ufficio. Martedì pomeriggio, alle cinque e mezza, vado in palestra. Mercoledì dodici è il compleanno di Anna: la festa comincia alle otto e mezza. Venerdì all'una pranzo con Paolo." },
    8: { t: "Vas a conocer a un compañero nuevo: escribí las preguntas que le harías.", min: 20,
         use: [["domande", 5, "5 preguntas"]],
         model: "Come ti chiami? Di dove sei? Dove abiti adesso? Che lavoro fai? Quanti anni hai? Con chi vivi? Quale musica preferisci?" },
    9: { t: "Contá adónde vas esta semana y cómo: a casa de quién, a qué ciudad, en qué.", min: 25,
         use: [["preposizioni", 7, "7 preposiciones (a, in, da, di, con, per…)"]],
         model: "Lunedì vado in ufficio in autobus. Martedì sera vado da Marta: studiamo italiano da due mesi. Giovedì parto per Firenze in treno con Paola. Sabato vado al mercato a piedi e la domenica resto a casa." },
    10: { t: "Te preguntan por gente que conocés («¿Conocés a Marco? ¿Llamás a Anna?»): respondé con pronombres.", min: 25,
         use: [["pronomi", 4, "4 pronombres de objeto (lo, la, li, gli, le…)"]],
         model: "Marco? Sì, lo conosco bene: lo vedo ogni giorno. Anna? La chiamo stasera e le dico tutto. I cugini? Li vedo il sabato. A Paolo scrivo spesso: gli mando molte foto." },
    11: { t: "Contá qué hiciste el fin de semana pasado, con avere y con essere.", min: 25,
         use: [["pp", 4, "4 verbos en passato prossimo"]],
         model: "Sabato mattina sono andato al mercato e ho comprato frutta e verdura. Nel pomeriggio ho letto un libro e ho dormito un po'. La sera sono uscito con Paola: abbiamo mangiato una pizza e siamo tornati a casa tardi." },
    12: { t: "Contá tu mañana (me despierto, me levanto…) y dale a un amigo tres consejos con el imperativo.", min: 25,
         use: [["riflessivi", 3, "3 verbos reflexivos"], ["imperativo", 2, "2 imperativos"]],
         model: "Mi sveglio alle sette, mi alzo subito e mi faccio la doccia. Poi mi vesto e faccio colazione. Tre consigli per te: dormi di più, bevi tanta acqua e non lavorare la domenica!" },
    14: { t: "Contá qué te gusta y qué no (comida, música, deporte), y qué le gusta a otra persona.", min: 25,
         use: [["piacere", 4, "4 formas de piacere"]],
         model: "Mi piace molto la cucina italiana, soprattutto la pasta. Non mi piacciono i film dell'orrore. Mi piace ascoltare musica e mi piacciono i concerti all'aperto. A mia madre piace leggere, ma non le piace il calcio." },
    15: { t: "Contá cómo era tu vida de chico (dónde vivías, qué hacías) y algo que pasó un día.", min: 25,
         use: [["imperfetto", 5, "5 verbos en imperfetto"], ["pp", 1, "1 passato prossimo para lo que pasó"]],
         model: "Quando ero piccolo abitavo in una casa vicino al mare. Ogni estate andavo in spiaggia con i cugini e giocavamo a calcio tutto il giorno. La scuola era piccola e la maestra era molto gentile. Un giorno, però, sono caduto dalla bicicletta e sono andato all'ospedale." },
    16: { t: "Contá tu día de ayer, desde que te despertaste hasta que te dormiste.", min: 25,
         use: [["riflPass", 4, "4 reflexivos en pasado (mi sono…, ci siamo…)"]],
         model: "Ieri mi sono svegliata alle sei e mezza, mi sono lavata e mi sono vestita in fretta. Al lavoro mi sono annoiata un po'. La sera io e Marco ci siamo incontrati in centro e ci siamo divertiti molto. Mi sono addormentata a mezzanotte." },
    17: { t: "Mostrale a un amigo fotos de tu familia: quién es este, de quién es aquella casa…", min: 25,
         use: [["possessivi", 4, "4 posesivos"], ["dimostrativi", 2, "2 demostrativos (questo, quello…)"]],
         model: "Questa è mia madre e questo è mio padre, davanti alla loro casa. Quella ragazza con il cappello è mia cugina Laura. Quei bambini sono i suoi figli. Ogni estate andiamo tutti insieme al mare: è la nostra tradizione." },
    18: { t: "Un amigo te propone planes y a todo decís que no (nunca, nada, nadie). Cerrá con una exclamación.", min: 25,
         use: [["negazioni", 3, "3 negaciones (mai, niente, nessuno, neanche…)"], ["esclamazione", 1, "1 exclamación con che, come o quanto"]],
         model: "No, grazie, non vado mai in discoteca. Non conosco nessuno a quella festa e non ho niente da mettere. Stasera non esco neanche con Marco: sono molto stanco. Che settimana difficile!" },
    19: { t: "Contá tus planes para las próximas vacaciones y hacé una suposición sobre alguien.", min: 35,
         use: [["futuro", 5, "5 verbos en futuro"]],
         model: "Quest'estate andrò in Sicilia con due amici. Prenderemo il traghetto da Napoli e staremo dieci giorni a Palermo. Visiteremo i mercati e mangeremo tanti arancini. Marco non risponde al telefono da ieri: sarà già in spiaggia!" },
    20: { t: "Escribile a un hotel pidiendo una habitación y algo más, con cortesía.", min: 35,
         use: [["condizionale", 3, "3 verbos en condicional"]],
         model: "Buongiorno, vorrei prenotare una camera doppia per tre notti, dal dieci al tredici maggio. Sarebbe possibile avere una camera con vista sul mare? Mi piacerebbe anche sapere se la colazione è inclusa. Potrebbe rispondermi entro venerdì? Grazie mille." },
    21: { t: "Contá qué comprás en el mercado (cuánto de cada cosa) y cada cuánto vas: usá ne y ci.", min: 35,
         use: [["ne", 2, "2 veces ne"], ["ci", 2, "2 veces ci"]],
         model: "Al mercato compro sempre la frutta: oggi ne prendo due chili. Le uova? Ne compro sei. Il pane, invece, lo prendo dal fornaio. Al mercato ci vado ogni sabato mattina, e ci resto un'ora perché ci sono sempre tante persone." },
    22: { t: "Organizás un cumpleaños: contá quién le da qué a quién, con pronombres combinados.", min: 35,
         use: [["combinati", 3, "3 pronombres combinados (glielo, me la, te le…)"]],
         model: "Sabato è il compleanno di Giulia. Il regalo gliel'ho già comprato: è un libro, e glielo do alla festa. La torta? Me la prepara la nonna. Marco vuole sapere l'indirizzo: glielo mando stasera. E tu hai bisogno delle foto? Te le porto io." },
    23: { t: "Compará dos ciudades o dos países que conozcas.", min: 35,
         use: [["comparativi", 4, "4 comparaciones (più… di, meno… che, migliore…)"]],
         model: "Buenos Aires è più grande di Roma, ma Roma è più antica. A Roma la vita è più cara che a Buenos Aires, soprattutto le case. Il caffè italiano è migliore, secondo me, ma la carne argentina è la più buona del mondo! Roma è bellissima." },
    24: { t: "Un amigo tiene un problema con su jefe: decile qué pensás, qué creés y qué esperás.", min: 35,
         use: [["congiuntivo", 4, "4 verbos en congiuntivo (che sia, che abbia…)"]],
         model: "Caro Luca, penso che tu abbia ragione: il tuo capo è molto severo. Credo che sia stanco anche lui, ma spero che capisca la situazione. È importante che tu parli con lui presto. Spero che tutto vada bene!" },
    25: { t: "Opiná sobre el trabajo desde casa: qué pensás, qué dudás, qué te parece importante.", min: 35,
         use: [["congiuntivo", 5, "5 verbos en congiuntivo"]],
         model: "Credo che lavorare da casa sia comodo, ma penso che non sia per tutti. Sembra che molte persone lavorino di più e si riposino di meno. Dubito che le aziende vogliano tornare indietro. È importante che ognuno possa scegliere." },
    27: { t: "Describí cómo estudia o trabaja alguien que conocés.", min: 35,
         use: [["avverbi", 5, "5 adverbios en -mente"]],
         model: "Mio fratello studia sempre attentamente e lavora velocemente. Parla lentamente e chiaramente, e ascolta pazientemente tutti. Raramente si arrabbia. Purtroppo, però, arriva spesso in ritardo. Ieri, per esempio, è arrivato tranquillamente alle dieci, e il professore l'ha guardato severamente." },
    28: { t: "¿Es mejor vivir en la ciudad o en el campo? Escribí un párrafo con tu opinión.", min: 35,
         use: [["connettivi", 5, "5 conectores distintos (però, quindi, infatti, invece, anche se…)"]],
         model: "Secondo me è meglio vivere in città, anche se il traffico è un problema. Infatti in città ci sono più servizi: ospedali, scuole e trasporti. In campagna, invece, la vita è più tranquilla e l'aria è pulita. Però per lavorare bisogna usare sempre la macchina, quindi si perde molto tempo. Inoltre d'inverno le giornate sono lunghe e noiose." },
    29: { t: "Te contaron noticias de amigos: reaccioná (me alegra que…, no creo que…, qué raro que…).", min: 45,
         use: [["congPassato", 4, "4 congiuntivos pasados (abbia trovato, sia partito…)"]],
         model: "Sono contento che Marta abbia trovato un lavoro nuovo. Non credo che Luca sia partito davvero per l'Australia: è strano che non mi abbia detto niente! Mi dispiace che i cugini non siano venuti alla festa. Spero che almeno abbiano ricevuto l'invito. Chissà se Paola ha già finito la tesi: le scrivo stasera." },
    30: { t: "Contá qué querían tus padres o tus maestros que hicieras de chico, y qué te gustaría que cambiara hoy.", min: 45,
         use: [["congImperfetto", 4, "4 verbos en congiuntivo imperfetto"]],
         model: "Da piccolo i miei genitori volevano che studiassi medicina e che diventassi un bravo dottore. Mia madre sperava che imparassi il pianoforte. Io, invece, desideravo che mi lasciassero giocare a calcio tutto il giorno con gli amici. Oggi vorrei che le scuole dessero più tempo allo sport e alla musica." },
    31: { t: "Contá qué habrías hecho distinto el año pasado y algo que alguien dijo que haría y no hizo.", min: 45,
         use: [["condPassato", 4, "4 condicionales compuestos (avrei fatto, sarei andato…)"]],
         model: "L'anno scorso avrei dovuto studiare di più e sarei andato volentieri a vivere all'estero. Avrei preferito un lavoro meno stressante, ma non ho avuto il coraggio di cambiare. Marco aveva detto che mi avrebbe aiutato con il trasloco, ma non è venuto: avrebbe potuto almeno telefonarmi!" },
    32: { t: "Contá un malentendido: qué creías, qué sabías y qué pensabas que iba a pasar.", min: 45,
         use: [["concordanza", 5, "5 verbos de la concordancia en pasado (fosse, avesse fatto, sarebbe venuto, era partito…)"]],
         model: "Pensavo che il treno partisse alle otto, invece era già partito alle sette e mezza. Credevo che Anna mi avesse lasciato un messaggio, ma non c'era niente. Sapevo che sarebbe arrivata in ritardo, però non immaginavo che non venisse proprio. Alla fine ho capito che si era dimenticata dell'appuntamento." },
    33: { t: "¿Qué harías si ganaras la lotería? ¿Qué habría pasado si no hubieras empezado italiano? Usá los tres tipos.", min: 45,
         use: [["se", 4, "4 condiciones con se"], ["congImperfetto", 2, "2 congiuntivos imperfectos o pluscuamperfectos"], ["condizionale", 2, "2 condicionales"]],
         model: "Se vincessi la lotteria, comprerei una casa in Toscana e smetterei di lavorare. Se avessi più tempo, viaggerei ogni mese e imparerei a cucinare bene. Se non avessi cominciato a studiare italiano, non avrei conosciuto tanti amici nuovi. Se domani fa bel tempo, andiamo al mare." },
    34: { t: "Describí tu barrio: la gente que vive ahí, el lugar donde…, la persona con la que…", min: 45,
         use: [["relativi", 4, "4 relativos (che, cui, il quale…)"]],
         model: "Abito in un quartiere che mi piace molto. La piazza in cui gioco a carte con i vicini è piccola ma piena di vita. Il fornaio da cui compro il pane è un signore che conosce tutti. La ragazza con la quale divido l'appartamento lavora in un teatro che si trova in centro." },
    35: { t: "Contá la historia de un monumento: cuándo fue construido, por quién, qué le pasó después.", min: 45,
         use: [["passiva", 4, "4 pasivas (è stato costruito, viene restaurato…)"]],
         model: "Il Colosseo è stato costruito dai Romani nel primo secolo. Per secoli è stato usato per gli spettacoli dei gladiatori. Nel Medioevo è stato danneggiato da molti terremoti e le sue pietre sono state usate per altri palazzi. Oggi è visitato da milioni di turisti e viene restaurato regolarmente." },
    36: { t: "Explicá cómo se hace algo típico (la pizza, el mate, el asado) con el si passivante e impersonale.", min: 45,
         use: [["si", 6, "6 construcciones con si"]],
         model: "Per fare la pizza napoletana si usa una farina speciale. Si impasta la farina con acqua, sale e lievito e si lascia riposare l'impasto per molte ore. Poi si stende la pasta, si mettono il pomodoro e la mozzarella e si cuoce nel forno a legna. Si mangia calda, con le mani!" },
    37: { t: "Contá la vida de un personaje histórico en passato remoto.", min: 45,
         use: [["remoto", 6, "6 verbos en passato remoto"]],
         model: "Giuseppe Garibaldi nacque a Nizza nel 1807. Da giovane fece il marinaio e viaggiò in tutto il mondo. Visse molti anni in America del Sud, dove combatté in Brasile e in Uruguay. Nel 1860 partì da Quarto con mille volontari e conquistò la Sicilia. Morì a Caprera nel 1882. Ancora oggi in molte città italiane c'è una piazza che porta il suo nome, e lo chiamano ancora «l'eroe dei due mondi»." },
    38: { t: "Contá una conversación reciente en estilo indirecto: qué te dijo, qué te preguntó, qué respondiste.", min: 45,
         use: [["indiretto", 4, "4 verbos de decir con che, se o di (mi ha detto che…)"]],
         model: "Il mese scorso ho incontrato Paola. Mi ha detto che aveva cambiato lavoro e che era molto contenta. Mi ha chiesto se volessi andare con lei a una festa il sabato dopo. Le ho risposto che mi sarebbe piaciuto, ma che dovevo lavorare. Allora mi ha detto di chiamarla la settimana successiva. Le ho promesso che l'avrei fatto e ci siamo salutati davanti al bar." },
    40: { t: "Contá qué cosas hacés hacer y cuáles dejás hacer (el auto, el pelo, los chicos…).", min: 60,
         use: [["causativo", 5, "5 causativos (faccio riparare, lascio fare…)"]],
         model: "Quando la macchina si rompe, la faccio riparare dal meccanico sotto casa, perché io non ne capisco niente. Ogni mese mi faccio tagliare i capelli da Gino, un barbiere che conosco da anni. A casa, invece, lascio fare molte cose ai miei figli: li lascio cucinare la domenica e gli faccio pulire la loro camera. Mia figlia vorrebbe farsi fare un tatuaggio, ma io non glielo lascio fare: è troppo giovane." },
    41: { t: "Contá lo que viste y oíste esta mañana desde tu ventana o en la calle.", min: 60,
         use: [["percezione", 5, "5 verbos de percepción con infinitivo (ho visto… attraversare)"]],
         model: "Stamattina, dalla finestra, ho visto un signore anziano attraversare la strada molto lentamente. Poi ho sentito due vicini litigare per un parcheggio: gridavano così forte che li ho sentiti anche con la finestra chiusa. Più tardi ho visto dei bambini giocare nel cortile e ho sentito una ragazza cantare una vecchia canzone di Mina. Alla fine ho visto il sole sparire dietro le nuvole e ho sentito la pioggia battere sui vetri." },
    42: { t: "Escribí un mail formal a una escuela de idiomas: qué decidiste, qué intentás, qué necesitás.", min: 60,
         use: [["infPrep", 5, "5 verbos con a o di + infinitivo (decidere di, riuscire a…)"]],
         model: "Gentile segreteria, vi scrivo perché ho deciso di iscrivermi al vostro corso di italiano avanzato. Da qualche mese cerco di leggere un giornale italiano ogni giorno, ma non riesco ancora a capire tutti gli articoli di politica. Vorrei cominciare a frequentare le lezioni a settembre e continuare a studiare fino a dicembre. Vi chiedo di inviarmi il programma e di indicarmi il costo. Spero di ricevere presto una vostra risposta. Distinti saluti, Laura Gómez" },
    43: { t: "¿Qué es lo más difícil de aprender un idioma? Usá el infinitivo como sujeto y después de preposición.", min: 60,
         use: [["infinito", 8, "8 infinitivos"]],
         model: "Imparare una lingua da adulti non è facile. Parlare con i nativi fa paura, e sbagliare davanti agli altri è ancora peggio. Secondo me, prima di cominciare bisogna trovare un motivo forte. Dopo aver studiato la grammatica di base, conviene leggere molto e ascoltare podcast ogni giorno. Il segreto è non smettere mai: anche dieci minuti al giorno bastano per non dimenticare quello che si è imparato." },
    44: { t: "Contá cómo aprendiste a hacer algo (cocinar, manejar…) con gerundios y un participio absoluto.", min: 60,
         use: [["gerundio", 3, "3 gerundios"], ["partAss", 1, "1 participio absoluto (Finito il corso, …)"]],
         model: "Ho imparato a cucinare guardando mia nonna. Stando accanto a lei in cucina, ho capito i segreti della pasta fatta in casa. Sbagliando molte volte, ho imparato a dosare la farina e le uova. Finito il corso di cucina che ho fatto l'anno scorso, ho cominciato a preparare la cena per gli amici. Arrivati a casa mia, tutti chiedono sempre la stessa cosa: le lasagne della nonna!" },
    45: { t: "Contá una situación difícil: si al final lo lograste, si te fuiste, si te enojaste (farcela, andarsene, prendersela…).", min: 60,
         use: [["pronominali", 5, "5 verbos pronominales (farcela, andarsene, metterci…)"]],
         model: "Il mese scorso ho dovuto traslocare da solo. Ci sono volute tre settimane per trovare un appartamento, e ci ho messo due giorni a riempire gli scatoloni. A un certo punto ho pensato di non farcela e volevo andarmene in vacanza. Il padrone di casa se l'è presa perché ho graffiato il pavimento, ma alla fine me la sono cavata pagando un piccolo risarcimento. Quando è finito tutto, ho detto: ce l'ho fatta!" },
    46: { t: "Describí tu casa y tu barrio con diminutivos, aumentativos y despectivos (casetta, gattone, tempaccio…).", min: 60,
         use: [["suffissi", 6, "6 palabras con sufijo (-etto, -ino, -one, -accio…)"]],
         model: "Abito in una casetta con un giardinetto pieno di fiorellini. Il vicino ha un gattone grasso che dorme tutto il giorno sul muretto. Purtroppo in questi giorni fa un tempaccio: piove sempre e il cielo è grigio. In fondo alla strada c'è un localino dove fanno dei panini buonissimi. Il proprietario è un omone simpatico con un vocione che si sente da lontano. La sera i ragazzini giocano a pallone nella piazzetta." },
    47: { t: "Escribí la lista de compras para una cena de ocho personas, con cantidades, pesos, porcentajes y aproximaciones.", min: 60,
         use: [["quantita", 6, "6 cantidades (un chilo, tre etti, una decina, il trenta per cento…)"]],
         model: "Per la cena di sabato siamo in otto. Mi servono un chilo e mezzo di pasta, tre etti di parmigiano e mezzo litro di panna. Per l'antipasto compro una dozzina di uova e un paio di etti di prosciutto crudo. Il vino? Direi una decina di bottiglie. Ho un budget di cento euro: il trenta per cento va per il vino e metà per la carne. Il resto lo spendo per il dolce, che deve bastare per una ventina di fette." },
    48: { t: "Contá una anécdota de una fiesta con dislocaciones y frases escindidas (La torta l'ha fatta…, È stata lei a…).", min: 60,
         use: [["dislocazioni", 4, "4 dislocaciones o frases escindidas"]],
         model: "La torta l'ha fatta mia sorella, non io. È stata lei a decidere il menù della festa, e i biglietti d'invito li ha scritti a mano. Io, il vino, l'ho scelto all'ultimo momento. Alla festa è arrivato anche Paolo, che non vedevamo da anni. È stato lui che ha portato la chitarra, e le canzoni le abbiamo cantate fino alle tre. I vicini, però, non li abbiamo invitati, e il giorno dopo si sono lamentati del rumore." },
    49: { t: "Texto argumentativo formal: ¿las ciudades deberían prohibir los autos en el centro? Introducción, argumentos y conclusión.", min: 60,
         use: [["connettiviAlti", 5, "5 conectores de registro alto (pertanto, inoltre, sebbene, in conclusione…)"]],
         model: "In primo luogo, occorre ricordare che il traffico è una delle principali cause dell'inquinamento urbano. Chiudere il centro alle automobili, pertanto, migliorerebbe la qualità dell'aria. Inoltre, le strade liberate potrebbero diventare spazi per i pedoni e per il commercio. D'altro canto, sebbene i vantaggi siano evidenti, non si può ignorare il problema di chi lavora in centro e non dispone di mezzi pubblici adeguati. In conclusione, ritengo che il divieto sia auspicabile, purché venga accompagnato da un serio investimento nel trasporto pubblico." },
    50: { t: "Escribile a un amigo italiano un malentendido que tuviste con un falso amigo (burro, salire, imbarazzata…).", min: 60,
         use: [["falsi", 3, "3 falsos amigos bien usados"]],
         model: "Caro Marco, ti racconto una figuraccia. Ieri, in un bar di Bologna, ho chiesto un panino con il burro: pensavo di aver ordinato qualcosa di esotico, e invece era solo pane e burro! Poi ho detto alla barista che ero imbarazzata, e per fortuna ha capito che mi vergognavo e non che aspettavo un bambino, come avrebbe capito un argentino. Alla fine, per salire al mio appartamento, ho preso l'ascensore sbagliato. Un abbraccio, Sofia" },
    51: { t: "Escribile una carta a tu yo de hace un año: qué habría pasado si no hubieras empezado, qué lograste, qué le pedirías.", min: 60,
         use: [["congiuntivo", 2, "2 congiuntivos"], ["se", 1, "1 hipótesis con se"], ["condizionale", 2, "2 condicionales"]],
         model: "Caro me stesso di un anno fa, ti scrivo per dirti che ce l'hai fatta. Se non avessi cominciato a studiare italiano quella sera di settembre, oggi non potrei leggere questa lettera senza dizionario. Penso che il segreto sia stato studiare un po' ogni giorno, anche quando non ne avevi voglia. Non credo che tu abbia mai immaginato di arrivare fin qui. Ti chiederei solo una cosa: sbaglia pure, ma non smettere di parlare. Sarebbe un peccato che tutta questa fatica finisse in un cassetto. Con affetto, il tuo io del futuro." }
  };

  /* ------------------------------------------------------------ tokens */

  function toks(text) {
    var out = [], re = /[A-Za-zÀ-ÖØ-öø-ÿ]+'?|\d+|[.!?,;:]/g, m, start = true, clause = true;
    var src = String(text || "").replace(/[’‘`´]/g, "'");
    while ((m = re.exec(src))) {
      var o = m[0];
      if (/^[.!?,;:]$/.test(o)) { out.push({ p: o, at: m.index }); clause = true; if (/[.!?]/.test(o)) start = true; continue; }
      out.push({ o: o, w: o.toLowerCase(), at: m.index, len: o.length, start: start, clause: clause || start,
                 cap: /^[A-ZÀ-Ý]/.test(o) });
      start = false; clause = false;
    }
    return out;
  }
  /* Every Italian word the course shows (answers, phrases, readings, the
     bank, the glossary): a word the learner writes that is in here exists. */
  var LEXI = Object.create(null), lexiN = 0;
  function learn(list) {
    (list || []).forEach(function (txt) {
      String(txt || "").toLowerCase().replace(/[’‘`´]/g, "'").split(/[^a-zà-ÿ']+/).forEach(function (w) {
        w = w.replace(/^'+/, "");
        if (w.length > 1 && !LEXI[w]) { LEXI[w] = 1; lexiN++; }
        var m = /^([a-zà-ÿ]+')(.+)$/.exec(w);   // dell'acqua
        if (m) [m[1], m[2]].forEach(function (x) { if (!LEXI[x]) { LEXI[x] = 1; lexiN++; } });
      });
    });
  }
  function learnCourse(src) {
    if (lexiN > 5000) return;
    src = src || {};
    var list = [];
    (src.items || []).forEach(function (it) {
      // Only what the learner has to write: stems and choice options carry Spanish.
      if (it.type === "translate" || it.type === "cloze" || it.type === "conjugate" || it.type === "plural") {
        list.push(String(it.answer || "").replace(/\|/g, " "));
        (it.accept || []).forEach(function (a) { list.push(a); });
      }
    });
    (src.bank && src.bank.sentences || []).forEach(function (x) { (x.it || []).forEach(function (a) { list.push(a); }); });
    (src.phrases || []).forEach(function (f) { list.push(f.it); });
    (src.readings || []).forEach(function (e) { list.push(e.text); });
    learn(list);
    learn(Object.keys(src.glossario || {}));
    learn(Object.keys(DATA.lex || {}));
    learn(["base basi basso bassa bassi basse fine alto alta alti alte nativo nativa nativi native peggio meglio podcast budget omone vocione " +
           "tutto tutta tutti tutte questo questa questi queste quello quella quelli quelle ogni ognuno qualche qualcuno qualcosa niente nulla " +
           "sempre mai già ancora poi dopo prima adesso ora oggi domani ieri stasera stamattina insieme davvero proprio soltanto solo " +
           "severo severa severi severe gentile gentili felice felici stanco stanca stanchi stanche contento contenta contenti contente"]);
  }
  function known(w) { return !!(LEXI[w] || (U.isItalian && U.isItalian(w))); }

  function words(tk) { return tk.filter(function (t) { return t.w && /[a-zà-ÿ]/.test(t.w); }); }

  var U = D ? D.util : {};
  var DATA = D ? D.DATA : { lex: {}, nouns: {}, nounsByPlural: {}, adj: {}, falsi: {} };
  function V(w) { return D ? D.verbForms(w) : []; }
  function PP(w) {
    if (!w) return null;
    if (D && D.participleOf(w)) return D.participleOf(w);
    if (IRR_PART[w]) return IRR_PART[w];
    return null;
  }
  var IRR_PART = {};
  ("fatto:fare detto:dire visto:vedere preso:prendere messo:mettere scritto:scrivere letto:leggere stato:essere venuto:venire " +
   "rimasto:rimanere nato:nascere morto:morire aperto:aprire chiuso:chiudere corso:correre vissuto:vivere bevuto:bere scelto:scegliere " +
   "perso:perdere risposto:rispondere chiesto:chiedere speso:spendere rotto:rompere acceso:accendere spento:spegnere vinto:vincere " +
   "successo:succedere piaciuto:piacere offerto:offrire sceso:scendere salito:salire deciso:decidere diviso:dividere promesso:promettere " +
   "permesso:permettere tradotto:tradurre ridotto:ridurre condotto:condurre dipinto:dipingere nascosto:nascondere").split(" ").forEach(function (x) {
    var p = x.split(":");
    ["o", "a", "i", "e"].forEach(function (v) { IRR_PART[p[0].slice(0, -1) + v] = p[1]; });
  });
  function isPart(w) { return !!PP(w) || (/(at|ut|it)[oaie]$/.test(w) && w.length > 4 && !DATA.nouns[w] && !DATA.nounsByPlural[w]); }
  function isNoun(w) { return !!(DATA.nouns[w] || DATA.nounsByPlural[w]); }
  function nounLike(w) { return isNoun(w) || !!DATA.adj[w]; }
  function isInf(w) {
    if (!w) return false;
    if (w === "aver" || w === "esser") return true;
    if (U.isInfinitive && U.isInfinitive(w)) return true;
    return /(are|ere|ire|rre)$/.test(w) && w.length > 4 && !nounLike(w) && !V(w).length;
  }
  function isInfCl(w) {   // farlo, vederti, andarsene
    if (isInf(w)) return true;
    var m = /^(.+?[aei]r)(mi|ti|si|ci|vi|lo|la|li|le|ne|gli|sene|mene|tene|cela|glielo|gliela|melo|mela|telo|tela)$/.exec(w || "");
    return !!(m && isInf(m[1] + "e"));
  }

  var AUX_PRES = { ho: 1, hai: 1, ha: 1, abbiamo: 1, avete: 1, hanno: 1, sono: 1, sei: 1, "è": 1, siamo: 1, siete: 1 };
  var AVE_PRES = { ho: 1, hai: 1, ha: 1, abbiamo: 1, avete: 1, hanno: 1 };
  var ESS_ALL = {};
  (U.ESSERE || []).forEach(function (x) { ESS_ALL[x] = 1; });
  var SKIP_ADV = { "già": 1, mai: 1, ancora: 1, appena: 1, sempre: 1, anche: 1, bene: 1, molto: 1, poi: 1, tutto: 1, "più": 1, davvero: 1, proprio: 1, subito: 1, finalmente: 1 };
  function nextPart(tk, i, max) {   // participle after the auxiliary, skipping già, mai…
    for (var k = i + 1; k < tk.length && k <= i + (max || 3); k++) {
      var t = tk[k];
      if (!t.w) return -1;
      if (isPart(t.w) && !SKIP_ADV[t.w]) return k;
      if (!SKIP_ADV[t.w]) return -1;
    }
    return -1;
  }
  function isVerb(w) { return !!(w && (V(w).length || AUX_PRES[w] || ESS_ALL[w] || (U.AVERE || []).indexOf(w) >= 0)); }

  var ESS_VERBS = { andare: 1, venire: 1, partire: 1, arrivare: 1, uscire: 1, tornare: 1, ritornare: 1, essere: 1, nascere: 1,
                    morire: 1, rimanere: 1, restare: 1, entrare: 1, cadere: 1, diventare: 1, riuscire: 1, succedere: 1, piacere: 1,
                    sembrare: 1, stare: 1, costare: 1, bastare: 1, mancare: 1 };
  function auxOf(lemma) {
    if (!lemma) return null;
    if (ESS_VERBS[lemma]) return "essere";
    try { return Conj ? Conj.auxiliary(lemma) : null; } catch (e) { return null; }
  }

  var NUMS = /^(uno|una|due|tre|quattro|cinque|sei|sette|otto|nove|dieci|undici|dodici|tredici|quattordici|quindici|sedici|diciassette|diciotto|diciannove|venti\w*|ventuno|ventitré|trenta\w*|quaranta\w*|cinquanta\w*|sessanta\w*|settanta\w*|ottanta\w*|novanta\w*|cento\w*|mille|mila|primo|prima|secondo|terzo|quarto|quinto|sesto|settimo|ottavo|nono|decimo|mezzogiorno|mezzanotte)$/;
  var POSS = { mio: 1, mia: 1, miei: 1, mie: 1, tuo: 1, tua: 1, tuoi: 1, tue: 1, suo: 1, sua: 1, suoi: 1, sue: 1,
               nostro: 1, nostra: 1, nostri: 1, nostre: 1, vostro: 1, vostra: 1, vostri: 1, vostre: 1 };
  var DEM = /^(questo|questa|questi|queste|quest'|quel|quello|quella|quei|quegli|quelle|quell')$/;
  var NEG = { niente: 1, nulla: 1, nessuno: 1, nessuna: 1, nessun: 1, mai: 1, neanche: 1, nemmeno: 1, neppure: 1, affatto: 1, mica: 1 };
  var CONN = ["però", "ma", "quindi", "allora", "infatti", "invece", "comunque", "anche se", "mentre", "siccome", "perciò", "poi",
              "inoltre", "tuttavia", "dunque", "perché", "oppure", "cioè", "insomma", "eppure", "sebbene", "benché", "nonostante",
              "secondo me", "da una parte", "dall'altra", "prima di tutto", "alla fine", "per esempio", "invece di"];
  var CONN_ALTI = ["in primo luogo", "in secondo luogo", "pertanto", "inoltre", "tuttavia", "dunque", "sebbene", "benché",
                   "d'altro canto", "per contro", "in conclusione", "in definitiva", "ciononostante", "di conseguenza",
                   "vale a dire", "ovvero", "poiché", "dal momento che", "affinché", "qualora", "purché", "altresì",
                   "ne consegue", "occorre", "in altri termini", "per di più", "nondimeno", "a mio avviso", "infine"];
  var SAY = { detto: 1, disse: 1, dissero: 1, dice: 1, dicono: 1, diceva: 1, chiesto: 1, chiese: 1, chiesero: 1, risposto: 1,
              rispose: 1, risposero: 1, promesso: 1, promise: 1, spiegato: 1, "spiegò": 1, raccontato: 1, "raccontò": 1,
              domandato: 1, "domandò": 1, scritto: 1, scrisse: 1 };
  var PRONOM = /\b(farcela|ce l'ho fatta|ce l'hai fatta|ce l'ha fatta|ce l'abbiamo fatta|ce l'hanno fatta|ce la faccio|ce la fai|ce la fa|ce la facciamo|non ce la|andarsene|andarmene|andartene|me ne vado|te ne vai|se ne va|se ne vanno|se n'è andat\w|me ne sono andat\w|prendersela|se l'è presa|se l'è preso|se la prende|me la prendo|te la prendi|cavarsela|me la cavo|te la cavi|se la cava|me la sono cavat\w|ce la siamo cavat\w|metterci|ci ho messo|ci ha messo|ci hanno messo|ci metto|ci mette|ci mettiamo|volerci|ci vuole|ci vogliono|ci sono volut\w|ci è volut\w|fregarsene|me ne frego|me ne sono fregat\w|sentirsela|me la sento|non me la sento|averci|ce l'ho|ce l'hai|ce l'ha)\b/g;
  var QUANT = /\b(chilo|chili|etto|etti|grammi|grammo|litro|litri|mezzo|mezza|decina|decine|dozzina|ventina|trentina|centinaio|centinaia|migliaio|migliaia|metà|per cento|percento|terzo|terzi|quarto|quarti|doppio|triplo|paio|bottiglia|bottiglie|scatola|scatole|fetta|fette|metro|metri|chilometri|chilometro)\b|%/g;
  var SUFF = /^(.{3,}?)(ettino|ellino|ellini|ellina|ettina|etto|etta|etti|ette|ino|ina|ini|ine|ello|ella|elli|elle|one|ona|oni|accio|accia|acci|acce|uccio|uccia|ucci|otto|otta)$/;

  function suffixed(w) {
    if (DATA.lex[w] || !SUFF.test(w)) return false;
    var m = SUFF.exec(w), stem = m[1];
    if ({ omone: 1, omoni: 1 }[w]) return true;
    var cands = [stem + "o", stem + "a", stem + "e", stem, stem.replace(/(c|g)h$/, "$1") + "o", stem.replace(/(c|g)h$/, "$1") + "a",
                 stem.replace(/i$/, "") + "e", stem.replace(/i$/, "") + "o"];
    return cands.some(function (c) { return DATA.lex[c] && !V(c).length; });
  }

  /* ------------------------------------------------ estructuras (features) */

  function features(text) {
    var tk = toks(text), ws = words(tk), low = " " + ws.map(function (t) { return t.w; }).join(" ") + " ";
    var f = {};
    var add = function (k, n) { f[k] = (f[k] || 0) + (n == null ? 1 : n); };
    var norm = String(text || "").toLowerCase().replace(/[’‘`´]/g, "'");
    var prevW = function (i) { for (var k = i - 1; k >= 0; k--) if (tk[k].w) return tk[k].w; return ""; };
    tk.forEach(function (t, i) {
      if (t.p) { if (t.p === "?") add("domande"); return; }
      var w = t.w, nx = tk[i + 1] || {}, n = nx.w || "", fv = V(w);
      var tense = function (x) { return fv.some(function (v) { return v.tense === x; }); };
      if ({ sono: 1, sei: 1, "è": 1, siamo: 1, siete: 1 }[w]) add("essere");
      if (AVE_PRES[w]) add("avere");
      if (DATA.nounsByPlural[w] && DATA.nounsByPlural[w].s !== w) add("plurali");
      if (U.ARTICLES && U.ARTICLES[w]) add("articoli");
      var pi = U.prepInfo ? U.prepInfo(w) : null;
      if (pi) { add("preposizioni"); if (pi.art) add("prepArt"); }
      if (DATA.adj[w] && !POSS[w]) add("aggettivi");
      if (tense("presente") && !AUX_PRES[w]) add("presente");
      if (fv.some(function (v) { return v.tense === "presente" && /^(andare|fare|uscire|venire|dovere|volere|potere|dire|stare|dare|bere|sapere|rimanere|tenere|scegliere|salire|tradurre|porre)$/.test(v.lemma); })) add("irregolari");
      if (/^(alle|all'|dalle|dall'|mezzogiorno|mezzanotte)$/.test(w) || (w === "le" && NUMS.test(n)) || (w === "l'" && n === "una")) add("ore");
      if (NUMS.test(w) && !(w === "sei" && (!tk[i + 1] || !NUMS.test(n)) && /^(tu|non|ci|lo|la)$/.test(prevW(i)))) add("numeri");
      if (/^(lo|la|li|le|gli|l'|ne)$/.test(w) && isVerb(n) && !isNoun(n)) add("pronomi");
      if (AUX_PRES[w] && nextPart(tk, i) > 0) add("pp");
      if (/^(mi|ti|si|ci|vi)$/.test(w) && isVerb(n) && !/^piac/.test(n)) add("riflessivi");
      if (/^(mi|ti|si|ci|vi|me|te|se|ce|ve)$/.test(w) && ESS_ALL[n] && nextPart(tk, i + 1) > 0) add("riflPass");
      if (t.clause || /^(e|ma)$/.test(prevW(i))) {
        var imp = fv.some(function (v) {
          return v.tense === "presente" && ((v.p === 1 && /(ere|ire|rre)$/.test(v.lemma)) || (v.p === 2 && /are$/.test(v.lemma)) || v.p === 4);
        }) || /^(va'|vai|fa'|fai|di'|dimmi|sta'|stai|da'|dai|vieni|abbi|sii|esci|fammi|dammi|alzati|svegliati|riposati|vestiti|lavati|siediti|calmati|sbrigati|guarda|senti|scusa|aspetta|ascolta)$/.test(w) ||
          (w === "non" && isInf(n));
        if (imp && !AUX_PRES[w]) add("imperativo");
      }
      if (/^piac/.test(w)) add("piacere");
      if (tense("imperfetto") || /^(ero|eri|era|eravamo|eravate|erano)$/.test(w) ||
          (/(av|ev|iv)(o|i|a|amo|ate|ano)$/.test(w) && w.length > 4 && !nounLike(w) && !DATA.lex[w])) add("imperfetto");
      if (POSS[w] || (w === "loro" && U.ARTICLES && U.ARTICLES[prevW(i)])) add("possessivi");
      if (DEM.test(w)) add("dimostrativi");
      if (NEG[w]) add("negazioni");
      if (tense("futuro") || (/([aei]r|rr|dr|vr)(ò|ai|à|emo|ete|anno)$/.test(w) && w.length > 4 && !/^(però|perciò)$/.test(w) && !nounLike(w))) add("futuro");
      if (tense("condizionale") || (/(rei|resti|rebbe|remmo|reste|rebbero)$/.test(w) && w.length > 5 && !nounLike(w))) add("condizionale");
      if (w === "ne" || w === "n'") add("ne");
      if (w === "ci" || w === "c'") add("ci");
      if (/^(glielo|gliela|glieli|gliele|gliene|gliel')$/.test(w) || (/^(me|te|ce|ve|se)$/.test(w) && /^(lo|la|li|le|ne|l')$/.test(n))) add("combinati");
      if (/^(più|meno)$/.test(w)) {
        for (var k = i + 1; k <= i + 4 && k < tk.length && tk[k].w; k++)
          if (/^(di|che|del|della|dei|degli|delle|dello|dell')$/.test(tk[k].w)) { add("comparativi"); break; }
      }
      if (/^(migliore|migliori|peggiore|peggiori|maggiore|maggiori|minore|minori)$/.test(w) || /issim[oaie]$/.test(w)) add("comparativi");
      if (/^(il|la|i|le|gli|lo)$/.test(w) && /^(più|meno)$/.test(n) && tk[i + 2] && nounLike(tk[i + 2].w || "")) add("comparativi");
      var trig = false;
      for (var q = i - 1; q >= Math.max(0, i - 5); q--) if (tk[q].w && /^(che|affinché|benché|sebbene|purché|prima|qualora)$/.test(tk[q].w)) { trig = true; break; }
      if (trig && fv.some(function (v) { return v.tense === "congiuntivo"; })) add("congiuntivo");
      if (/^(abbia|abbiano|abbiate|sia|siano|siate)$/.test(w) && nextPart(tk, i) > 0) { add("congPassato"); if (trig) add("congiuntivo", 0); }
      if (tense("congImperfetto") || (/(assi|asse|assimo|assero|essi|esse|essimo|essero|issi|isse|issimo|issero)$/.test(w) && w.length > 5 && !nounLike(w) && !DATA.lex[w])) add("congImperfetto");
      if (/^(avrei|avresti|avrebbe|avremmo|avreste|avrebbero|sarei|saresti|sarebbe|saremmo|sareste|sarebbero)$/.test(w) && nextPart(tk, i) > 0) add("condPassato");
      if (/^(avevo|avevi|aveva|avevamo|avevate|avevano|ero|eri|era|eravamo|eravate|erano)$/.test(w) && nextPart(tk, i) > 0) add("trapassato");
      if (w === "se" && !/^(lo|la|li|le|ne|l')$/.test(n)) add("se");
      if (w === "cui" || (/^(quale|quali)$/.test(w) && U.ARTICLES && (U.ARTICLES[prevW(i)] || (U.prepInfo(prevW(i)) || {}).art))) add("relativi");
      if (w === "che" && (isNoun(prevW(i)) || /^(quello|ciò|quella|quelli|quelle)$/.test(prevW(i)))) add("relativi");
      if ((ESS_ALL[w] || /^(viene|vengono|veniva|venivano|venne|vennero|verrà|verranno|venga|vengano)$/.test(w))) {
        var pk = nextPart(tk, i, 3);
        if (pk > 0 && /^(stato|stata|stati|state)$/.test(tk[pk].w)) pk = nextPart(tk, pk, 2);
        if (pk > 0 && auxOf(PP(tk[pk].w)) !== "essere" && !/^(stato|stata|stati|state)$/.test(tk[pk].w)) add("passiva");
      }
      if (w === "si" && (isVerb(n) || /^(può|possono|deve|devono)$/.test(n) || (/[^aeiou](a|ano|e|ono)$/.test(n) && !isNoun(n) && !DATA.adj[n]))) add("si");
      if (tense("passatoRemoto") || (/[^r]ò$/.test(w) && !/^(può|ciò|però|perciò|farò)$/.test(w)) ||
          (/(arono|erono|irono|ettero)$/.test(w) && !nounLike(w))) add("remoto");
      if (SAY[w]) {
        for (var s2 = i + 1; s2 <= i + 3 && s2 < tk.length && tk[s2].w; s2++)
          if (/^(che|se|di|come|dove|quando|perché|cosa)$/.test(tk[s2].w)) { add("indiretto"); break; }
      }
      var isFare = fv.some(function (v) { return v.lemma === "fare" || v.lemma === "lasciare"; }) || /^(fatto|fatta|fatti|fatte|lasciato|lasciata|lasciati|lasciate|fare|lasciare|farsi|farlo|farla|farli|farle|fargli|farmi|farti|lasciarlo|lasciarla|lasciarli|lasciarmi)$/.test(w);
      if (isFare) {
        for (var c2 = i + 1; c2 <= i + 3 && c2 < tk.length && tk[c2].w; c2++) {
          var cw = tk[c2].w;
          if (isInfCl(cw)) { add("causativo"); break; }
          if (!/^(lo|la|li|le|gli|l'|mi|ti|ci|vi|si|ne)$/.test(cw)) break;
        }
      }
      var isPerc = fv.some(function (v) { return /^(vedere|sentire|guardare|ascoltare|osservare)$/.test(v.lemma); }) || /^(visto|vista|visti|viste|sentito|sentita|sentiti|sentite|guardato|ascoltato|osservato)$/.test(w);
      if (isPerc) {
        for (var p2 = i + 1; p2 <= i + 4 && p2 < tk.length && tk[p2].w; p2++) if (isInfCl(tk[p2].w)) { add("percezione"); break; }
      }
      if (/^(a|ad|di|da)$/.test(w) && isInfCl(n)) add("infPrep");
      if (isInfCl(w)) add("infinito");
      if (/(ando|endo)$/.test(w) && w.length > 5 && !nounLike(w) && !/^(quando|secondo|mondo|tremendo|stupendo|orrendo)$/.test(w)) add("gerundio");
      if (t.start && isPart(w) && !AUX_PRES[w] && (U.ARTICLES && U.ARTICLES[n] || /^(a|al|alla|in|da|dal)$/.test(n))) add("partAss");
      if (suffixed(w)) add("suffissi");
      if (DATA.falsi && DATA.falsi[w]) add("falsi");
      if (/mente$/.test(w) && w.length > 6 && !isNoun(w)) add("avverbi");
    });
    f.concordanza = (f.congImperfetto || 0) + (f.condPassato || 0) + (f.trapassato || 0);
    // multi-word counts on the text
    var count = function (list) {
      var used = {};
      list.forEach(function (c) { if ((" " + low + " ").indexOf(" " + c + " ") >= 0 || norm.indexOf(c + " ") >= 0 && /'/.test(c)) used[c] = 1; });
      return Object.keys(used).length;
    };
    f.connettivi = count(CONN);
    f.connettiviAlti = count(CONN_ALTI);
    f.pronominali = (norm.match(PRONOM) || []).length;
    f.quantita = (norm.match(QUANT) || []).length;
    f.dislocazioni = dislocations(tk);
    f.esclamazione = exclamations(tk);
    f.words = ws.length;
    return f;
  }

  function sentences(tk) {
    var out = [], cur = [];
    tk.forEach(function (t) {
      if (t.p && /[.!?]/.test(t.p)) { if (cur.length) out.push({ t: cur, end: t.p }); cur = []; }
      else cur.push(t);
    });
    if (cur.length) out.push({ t: cur, end: "" });
    return out;
  }
  function exclamations(tk) {
    return sentences(tk).filter(function (s) {
      var first = s.t.filter(function (x) { return x.w; })[0];
      return s.end === "!" && first && /^(che|come|quanto|quanta|quanti|quante|quale)$/.test(first.w);
    }).length;
  }
  function dislocations(tk) {
    var n = 0, ART = U.ARTICLES || {};
    for (var i = 0; i < tk.length; i++) {
      var t = tk[i];
      if (!t.w) continue;
      // Left: «il vino, l'ho scelto» — article/demonstrative + noun, then a clitic + verb, no verb in between.
      if ((ART[t.w] && ART[t.w][2] === "det" || DEM.test(t.w)) && tk[i + 1] && tk[i + 1].w && !isVerb(tk[i + 1].w)) {
        for (var k = i + 2; k < tk.length && k <= i + 7; k++) {
          var x = tk[k];
          if (x.p && /[.!?]/.test(x.p)) break;
          if (!x.w) continue;
          if (/^(lo|la|li|le|l'|ne)$/.test(x.w) && tk[k + 1] && isVerb(tk[k + 1].w)) { n++; i = k; break; }
          if (isVerb(x.w) && x.w !== "non") break;
        }
      }
      // Cleft: «è stata lei a…», «è stato lui che…», «è Marco che…»
      if (/^(è|era|fu)$/.test(t.w)) {
        var j = i + 1;
        if (tk[j] && /^(stato|stata|stati|state)$/.test(tk[j].w || "")) j++;
        var who = tk[j];
        if (who && who.w && (/^(lui|lei|io|tu|noi|voi|loro)$/.test(who.w) || who.cap) && tk[j + 1] && /^(che|a|ad)$/.test(tk[j + 1].w || "")) n++;
      }
    }
    return n;
  }

  /* ------------------------------------------------------------ errores */

  var DO_VERBS = /^(conoscere|vedere|aspettare|chiamare|salutare|incontrare|visitare|ascoltare|guardare|amare|trovare|accompagnare|invitare|ringraziare|aiutare)$/;
  var DO_PART = /^(conosciut|vist|aspettat|chiamat|salutat|incontrat|visitat|ascoltat|guardat|amat|trovat|accompagnat|invitat|ringraziat|aiutat)[oaie]$/;
  var TO_SUBJ = { "è": "sia", sono: "sia (io) / siano (loro)", ha: "abbia", hanno: "abbiano", va: "vada", vanno: "vadano", fa: "faccia", fanno: "facciano",
                  "può": "possa", possono: "possano", vuole: "voglia", vogliono: "vogliano", deve: "debba", devono: "debbano",
                  sa: "sappia", sanno: "sappiano", viene: "venga", vengono: "vengano", vieni: "venga", esce: "esca", dice: "dica",
                  sta: "stia", stanno: "stiano", "c'è": "ci sia" };
  var OPINION = /^(penso|pensi|pensa|credo|credi|crede|spero|speri|spera|voglio|vuoi|vuole|dubito|immagino|temo|sembra|pare|bisogna|importante|possibile|probabile|meglio|peccato|necessario)$/;
  var ASK = /^(chiedo|chiedi|chiede|chiesto|chiese|domando|domanda|so|sai|sa|sapere|sapevo|dubito|capire|capisco|vedere|vediamo|dimmi|dico)$/;

  function expectedArticle(art, noun) {
    var A = U.ARTICLES[art], info = DATA.nouns[noun] || DATA.nounsByPlural[noun];
    if (!A || !info) return null;
    var plural = DATA.nounsByPlural[noun] && info.pl === noun && info.s !== noun;
    var sing = DATA.nouns[noun] && info.s === noun;
    if (plural && sing) return null;
    var num = info.s === info.pl ? A[1] : plural ? "p" : "s";   // invariable: trust the article's number
    var g = info.g, snd = U.soundRule(noun);
    if (num === "p" && /a$/.test(noun) && /o$/.test(info.s)) g = "f";   // le uova, le braccia, le dita
    if (A[2] === "det") {
      if (num === "s") return g === "m" ? (snd === "sz" ? "lo" : snd === "v" ? "l'" : "il") : (snd === "v" ? "l'" : "la");
      return g === "m" ? (snd === "c" ? "i" : "gli") : "le";
    }
    if (num === "p") return null;
    return g === "m" ? (snd === "sz" ? "uno" : "un") : (snd === "v" ? "un'" : "una");
  }

  /* Who is talking: a text in first person singular («Mi chiamo…», «io»,
     «mio», a verb in the io form) with no noi / voi / loro as subject.  In
     such a text a verb with no subject of its own is the learner's. */
  var NOT_PERSONAL = /^(piacere|sembrare|mancare|servire|interessare|bastare|dispiacere|volerci|occorrere|succedere|costare|parere|convenire|importare)$/;
  function speakerIo(tk) {
    var io = 0, pl = 0;
    tk.forEach(function (t, i) {
      if (!t.w) return;
      if (/^(io|mio|mia|miei|mie|me)$/.test(t.w)) io++;
      if (t.w === "mi" && t.start) io++;
      if (/^(noi|voi|loro|nostro|nostra|nostri|nostre)$/.test(t.w)) pl++;
      if (V(t.w).some(function (v) { return v.p === 0 && v.tense !== "congiuntivo" && v.tense !== "congImperfetto"; }) &&
          !V(t.w).some(function (v) { return v.p !== 0; })) io++;
    });
    return io > 0 && pl === 0;
  }
  function ioForm(lemma, tense) {
    try { var f = Conj.conjugate(lemma, tense)[0]; return f.split(" ").pop(); } catch (e) { return null; }
  }
  // An adjective in the other number: felici → felice, argentino → argentini.
  function adjNumber(w, plural) {
    var lem = DATA.adj[w];
    if (!lem) return null;
    var stem = w.replace(/(he|hi)$/, "h").replace(/[oaie]$/, "");
    var cands = plural ? (/[ie]$/.test(w) && /e$/.test(lem) ? [stem + "i"] : /a$/.test(w) ? [stem + "e", stem.replace(/(c|g)$/, "$1h") + "e"] : [stem + "i", stem.replace(/(c|g)$/, "$1h") + "i"])
                       : (/e$/.test(lem) ? [stem + "e"] : /e$/.test(w) ? [stem + "a"] : [stem + "o"]);
    for (var k = 0; k < cands.length; k++) if (DATA.adj[cands[k]] === lem) return cands[k];
    return null;
  }

  function lint(text, week) {
    week = week || 52;
    var tk = toks(text), out = [];
    var isIo = speakerIo(tk), personFlag = {};
    var push = function (i, n, cat, msg, soft) { out.push({ i: i, n: n || 1, cat: cat, msg: msg, soft: !!soft }); };
    var it = function (s) { return "*" + s + "*"; };
    var wi = function (k, dir) { for (var x = k + dir; x >= 0 && x < tk.length; x += dir) if (tk[x].w) return x; return -1; };
    var lexKeys = null;
    tk.forEach(function (t, i) {
      if (!t.w) return;
      var w = t.w, ni = wi(i, 1), n = ni >= 0 ? tk[ni].w : "", pi = wi(i, -1), p = pi >= 0 ? tk[pi].w : "";
      var nxt = ni >= 0 ? tk[ni] : null;
      // A capital in mid-sentence, or two capitals in a row (Buenos Aires): a name.
      var proper = t.cap && (!t.start || (nxt && nxt.cap && ni === i + 1));
      var already = out.some(function (f) { return i >= f.i && i < f.i + f.n; });
      var truncated = /^(aver|esser|far|dir|star|andar|poter|voler|dover|saper|fin|per|cuor|buon|bel|gran|san|qual|tal|signor|dottor|professor|mar|ben|son|vien)$/.test(w);
      // 1. Español metido
      if (!already && !proper && !truncated && !LEXI[w] && U.spanishWord && (U.spanishWord(w) || U.looksSpanish(w))) {
        var tr = U.spanishWord(w);
        // a Spanish plural: translate the singular and make it plural (gatos → gatti)
        if (!tr && /s$/.test(w)) {
          [w.replace(/es$/, ""), w.replace(/s$/, "")].some(function (sg) {
            if (DATA.nouns[sg] && DATA.nouns[sg].pl) { tr = DATA.nouns[sg].pl; return true; }   // libros → libri
            var t1 = U.spanishWord(sg);
            if (!t1) return false;
            var it1 = String(t1).split(" / ")[0], nn = DATA.nouns[it1];
            tr = nn && nn.pl ? nn.pl : it1;
            return true;
          });
        }
        push(i, 1, "parola_spagnola", it(t.o) + " es español" + (tr ? "; en italiano: " + it(String(tr).split(" / ")[0]) : "") + ".");
        return;
      }
      // 2. Palabra que no existe: tipeo, doble, tilde
      if (!already && !proper && !truncated && /^[a-zà-ÿ]+'?$/.test(w) && w.length > 2 && !known(w) && !isPart(w) && !isInfCl(w) &&
          !suffixed(w) && !/(ando|endo|mente)$/.test(w)) {
        if (!lexKeys) lexKeys = Object.keys(LEXI).concat(Object.keys(DATA.lex));
        var best = null, bd = 9, lim = w.length > 6 ? 2 : 1;
        for (var k = 0; k < lexKeys.length; k++) {
          var c = lexKeys[k];
          if (Math.abs(c.length - w.length) > lim || c.indexOf(" ") >= 0) continue;
          if (U.deaccent(c) === U.deaccent(w) || U.degeminate(c) === U.degeminate(w)) { best = c; bd = 0; break; }
          var d = U.editDistance(c, w);
          if (d < bd) { bd = d; best = c; }
        }
        if (best && bd === 0 && U.deaccent(best) === U.deaccent(w)) push(i, 1, "accento", "Falta la tilde: " + it(best) + ".");
        else if (best && bd === 0) push(i, 1, "doppie", "Se escribe " + it(best) + " (" + (best.length > w.length ? "con doble" : "sin doble") + ").");
        // A near word is only a guess: with the whole course as lexicon, a
        // word it does not know is more often rare than wrong (pertanto is
        // not a typo of portato), so no guess then.
        else if (best && bd <= lim && lexiN < 5000) push(i, 1, "refuso", "¿Quisiste decir " + it(best) + "?", true);
        else if (lexiN < 5000) push(i, 1, "lessico", "No conozco " + it(t.o) + ": revisá cómo se escribe.", true);
        return;
      }
      // 3. Artículo y sustantivo
      if (U.ARTICLES[w] && n && isNoun(n) && !V(n).length && !DATA.adj[n] && !(ni >= 0 && tk[ni].cap)) {
        var ea = expectedArticle(w, n);
        if (ea && ea !== w && !(w === "l'" && ea === "l'")) {
          var gen = U.ARTICLES[ea][0] !== U.ARTICLES[w][0] && U.ARTICLES[w][0] !== "?";
          push(i, 2, gen ? "genere" : "articolo", "Con " + it(n) + " va " + it(ea + (ea.slice(-1) === "'" ? "" : " ") + n) + ".");
        }
      }
      // 4. Auxiliar: «ho andato», «mi ho lavato»
      if (AVE_PRES[w]) {
        var pk = nextPart(tk, i);
        if (pk > 0) {
          var lem = PP(tk[pk].w);
          if (lem && /rsi$/.test(lem)) lem = lem.slice(0, -3) + "re";   // li ho sentiti: sentire, not sentirsi
          var refl = { mi: "ho", ti: "hai", si: "ha", vi: "avete" }[p] === w || (p === "si" && w === "hanno");
          if (refl || (lem && auxOf(lem) === "essere" && lem !== "essere")) {
            push(i, pk - i + 1, "ausiliare", (refl ? "Los reflexivos van con *essere*: " : "Con " + it(lem) + " va *essere*: ") +
              it(({ ho: "sono", hai: "sei", ha: "è", abbiamo: "siamo", avete: "siete", hanno: "sono" })[w] + " " + tk[pk].w.replace(/[oaie]$/, /^(abbiamo|avete|hanno)$/.test(w) ? "i" : "o")) + " (y el participio concuerda con el sujeto).");
          }
        }
      }
      // 5. «a» personal
      if (w === "a" && pi >= 0 && (V(p).some(function (v) { return DO_VERBS.test(v.lemma); }) || DO_PART.test(p)) &&
          ni >= 0 && (tk[ni].cap || POSS[n] || /^(lui|lei|loro)$/.test(n)) && !/^(casa|scuola|letto)$/.test(n)) {
        push(i, 1, "a_personale", "Sin «a»: el objeto directo de persona va directo (" + it(p + " " + tk[ni].o) + ").");
      }
      // 6. «il mio padre»
      if (/^(il|la|lo)$/.test(w) && POSS[n] && tk[ni + 1] && /^(madre|padre|fratello|sorella|moglie|marito|figlio|figlia|nonno|nonna|zio|zia|cugino|cugina|suocero|suocera|cognato|cognata|nipote)$/.test(tk[ni + 1].w || "")) {
        push(i, 1, "articolo_possessivo", "Con un familiar en singular, sin artículo: " + it(n + " " + tk[ni + 1].w) + ".");
      }
      // 7. Posesivo sin artículo con una cosa: «mio libro»
      if (POSS[w] && ni >= 0 && isNoun(n) && !/^(madre|padre|fratello|sorella|moglie|marito|figlio|figlia|nonno|nonna|zio|zia|cugino|cugina|mamma|papà|suocero|suocera|nipote|cognato|cognata)$/.test(n) &&
          !(U.ARTICLES[p] || (U.prepInfo(p) || {}).art || ESS_ALL[p] || DEM.test(p) || /^(un|una|uno|un')$/.test(p))) {
        var eaP = expectedArticle("il", n);
        if (eaP) push(i, 2, "articolo_possessivo", "Con el posesivo va el artículo: " + it(eaP + (eaP.slice(-1) === "'" ? "" : " ") + w + " " + n) + ".");
      }
      // 8. «a il» → «al»
      if (/^(a|di|da|in|su)$/.test(w) && /^(il|lo|la|i|gli|le|l')$/.test(n) && ni === i + 1) {
        var cf = U.contract(w, n);
        if (cf) push(i, 2, "preposizione_articolata", it(w + " " + n) + " se escribe junto: " + it(cf) + ".");
      }
      // 9. «se avrei»
      if (w === "se" && !/^(lo|la|li|le|ne|l')$/.test(n) && !ASK.test(p) && !ASK.test(pi > 0 ? (tk[wi(pi, -1)] || {}).w || "" : "")) {
        for (var s = i + 1; s < tk.length && s <= i + 4 && tk[s].w; s++) {
          var sw = tk[s].w;
          if (/^(non|mi|ti|ci|vi|si|lo|la|li|le|gli|ne|io|tu|lui|lei|noi|voi|loro|già|mai|davvero)$/.test(sw)) continue;
          if (V(sw).some(function (v) { return v.tense === "condizionale"; }) || /(rei|resti|rebbe|remmo|reste|rebbero)$/.test(sw)) {
            push(s, 1, "periodo_ipotetico", "Después de *se* hipotético no va condicional: *se avessi…*, *se potessi…* (el condicional va en la otra parte).");
          }
          break;
        }
      }
      // 10. «penso che è» (desde la semana del congiuntivo)
      if (week >= 24 && w === "che" && OPINION.test(p)) {
        for (var q = i + 1; q < tk.length && q <= i + 3 && tk[q].w; q++) {
          var qw = tk[q].w;
          if (/^(io|tu|lui|lei|noi|voi|loro|non|mi|ti|ci|vi|si|lo|la|gli|le)$/.test(qw) || tk[q].cap) continue;
          var key = qw === "c'" && tk[q + 1] && tk[q + 1].w === "è" ? "c'è" : qw;
          if (TO_SUBJ[key]) push(q, key === "c'è" ? 2 : 1, "congiuntivo", "Después de " + it(p + " che") + " va congiuntivo: " + it(TO_SUBJ[key]) + ".");
          break;
        }
      }
      // 11. «molto amici»
      if (/^(molto|tanto|poco|troppo)$/.test(w) && ni >= 0 && DATA.nounsByPlural[n] && DATA.nounsByPlural[n].s !== n) {
        var g11 = DATA.nounsByPlural[n].g;
        push(i, 1, "accordo", "Delante de un sustantivo concuerda: " + it((w === "poco" ? "poch" : w.slice(0, -1)) + (g11 === "f" ? "e" : "i") + " " + n) + ".");
      }
      // 11b. «molto pasta» → «molta pasta»
      if (/^(molto|tanto|poco|troppo)$/.test(w) && ni >= 0 && DATA.nouns[n] && DATA.nouns[n].s === n && DATA.nouns[n].g === "f" &&
          !DATA.adj[n] && !V(n).length) {
        push(i, 1, "accordo", "Delante de un sustantivo concuerda: " + it(w.slice(0, -1) + "a " + n) + ".");
      }
      // 12. «c'è due» → «ci sono»
      if (w === "è" && p === "c'" && ni >= 0 && (/^(due|tre|quattro|cinque|sei|sette|otto|nove|dieci|molti|molte|tanti|tante|alcuni|alcune|dei|degli|delle|parecchi|parecchie)$/.test(n) || (U.ARTICLES[n] && U.ARTICLES[n][1] === "p"))) {
        push(pi, 2, "ci_ne", "Con plural va *ci sono*: " + it("ci sono " + n) + ".");
      }
      // 13. «lui e alto» → «è»
      if (w === "e" && (/^(lui|lei)$/.test(p) || (pi >= 0 && tk[pi].cap && !tk[pi].start)) && ni >= 0 && (DATA.adj[n] || isPart(n)) && !(tk[ni].cap)) {
        push(i, 1, "accento", "El verbo lleva tilde: " + it("è") + " (*e* sin tilde es «y»).");
      }
      // 15. Persona: hablás de vos y el verbo no tiene sujeto propio
      //     (Mi chiami → mi chiamo, Hanno 32 anni → ho, e siamo → sono).
      if (isIo && !proper) {
        var clauseStart = t.start || /^(e|ma|però|poi|anche|quindi)$/.test(p) ||
          (pi >= 0 && tk[pi].start && /^(mi|ti|ci|vi|si|non)$/.test(p));
        var subjBefore = false;
        for (var sb = i - 1; sb >= 0 && tk[sb].w; sb--) { if (/^(io|tu|lui|lei|noi|voi|loro)$/.test(tk[sb].w) || (tk[sb].cap && !tk[sb].start) || isNoun(tk[sb].w)) { subjBefore = true; break; } }
        var ind = V(w).filter(function (v) { return !/congiuntivo|congImperfetto/.test(v.tense); });
        // noi / voi («siamo in tre») only with a singular adjective after it
        // (siamo argentino); tu in a question is someone else (mi chiami domani?)
        var nxAdj = ni >= 0 && DATA.adj[n] && !/[ie]$/.test(n) ? n : null;
        var sEnd = null;
        for (var se = i + 1; se < tk.length; se++) if (tk[se].p && /[.!?]/.test(tk[se].p)) { sEnd = tk[se].p; break; }
        if (ind.length && ind.every(function (v) { return v.p === 3 || v.p === 4; }) && !nxAdj) ind = [];
        if (ind.length && ind.every(function (v) { return v.p === 1; }) && sEnd === "?") ind = [];
        if (clauseStart && !subjBefore && ind.length && !ind.some(function (v) { return v.p === 0 || v.p === 2; }) &&
            !NOT_PERSONAL.test(ind[0].lemma)) {
          var v0 = ind[0] || V(w)[0], f0 = v0 && ioForm(v0.lemma, v0.tense);
          if (f0 && f0 !== w && !NOT_PERSONAL.test(v0.lemma) || (v0 && v0.lemma === "essere" && f0 && f0 !== w)) {
            personFlag[i] = 1;
            push(i, 1, "persona_verbale", "Hablás de vos (*io*): " + it((p === "mi" ? "mi " : "") + f0) + ", no " + it(w) + ".");
          }
        }
      }
      // 16. Adjetivo con essere: el número del sujeto (è felici, siamo contento, io sono felici)
      if (ESS_ALL[w] && !personFlag[i]) {
        var aj = ni;
        if (aj >= 0 && /^(molto|tanto|così|più|proprio|davvero|un po'|sempre|già)$/.test(n)) aj = wi(ni, 1);
        var aw = aj >= 0 ? tk[aj].w : "";
        if (aw && DATA.adj[aw] && !isNoun(aw)) {
          var subj16 = false;
          for (var s6 = i - 1; s6 >= 0 && tk[s6].w; s6--) {
            if (/^(tu|lui|lei|noi|voi|loro)$/.test(tk[s6].w) || (tk[s6].cap && !tk[s6].start) || isNoun(tk[s6].w) || (tk[s6].cap && s6 !== i - 1 && !/^(mi|io|non)$/.test(tk[s6].w))) { subj16 = true; break; }
            if (tk[s6].w === "e" && s6 > 0 && tk[s6 - 1].cap) { subj16 = true; break; }
          }
          var sing = /^(sei|è|ero|eri|era|sarò|sarai|sarà|sarei|saresti|sarebbe|sia)$/.test(w) || (isIo && !subj16 && /^(sono|ero|sarò|sarei)$/.test(w));
          var plu = /^(siamo|siete|eravamo|eravate|erano|saremo|sarete|saranno|saremmo|sareste|sarebbero|siano)$/.test(w) || (!isIo && w === "sono" && false);
          var isPl = /[ie]$/.test(aw) && DATA.adj[aw] !== aw && !(/e$/.test(aw) && DATA.adj[aw] === aw);
          var fix = sing && isPl ? adjNumber(aw, false) : plu && !isPl ? adjNumber(aw, true) : null;
          if (fix && fix !== aw) push(aj, 1, "accordo", (sing && isIo && w === "sono" ? "Hablás de vos: el adjetivo va en singular: " : "Concuerda con el sujeto de " + it(w) + ": ") + it(fix) + ".");
        }
      }
      // 17. Después de un número, plural: 32 anni (no «anno», ni «anne»)
      if ((/^\d+$/.test(w) && +w > 1) || (NUMS.test(w) && !/^(uno|una|un|primo|prima|secondo|terzo|quarto|quinto|sesto|settimo|ottavo|nono|decimo|mezzogiorno|mezzanotte|sei)$/.test(w))) {
        if (ni === i + 1 && !personFlag[ni] && !/^(gennaio|febbraio|marzo|aprile|maggio|giugno|luglio|agosto|settembre|ottobre|novembre|dicembre|euro|per|volte|e|o)$/.test(n)) {
          var nw = n, pluralOk = DATA.nounsByPlural[nw] && DATA.nounsByPlural[nw].pl === nw;
          var cand = DATA.nouns[nw] && DATA.nouns[nw].s === nw && DATA.nouns[nw].pl !== nw ? DATA.nouns[nw].pl : null;
          if (!pluralOk && !cand && !known(nw)) {
            var st = nw.replace(/s$/, "").replace(/[oaie]$/, "");   // annos, anne → anni
            ["i", "e"].forEach(function (x) { if (!cand && DATA.nounsByPlural[st + x] && DATA.nounsByPlural[st + x].pl === st + x) cand = st + x; });
          }
          if (cand && !pluralOk) {
            // a word already flagged as unknown is replaced by this clearer one
            out = out.filter(function (f) { return f.i !== ni; });
            push(ni, 1, "plurale", "Después de " + it(t.o) + " va el plural: " + it(cand) + ".");
          }
        }
      }
      // 14. «sono trenta anni» → «ho trent'anni»
      if (w === "sono" && ni >= 0 && (NUMS.test(n) || /^\d+$/.test(n)) && tk[ni + 1] && tk[ni + 1].w === "anni" && !(tk[ni + 2] && /^(che|fa)$/.test(tk[ni + 2].w || ""))) {
        push(i, 1, "lessico", "La edad va con *avere*: " + it("ho " + n + " anni") + ".");
      }
    });
    return out.sort(function (a, b) { return a.i - b.i; });
  }

  /* ------------------------------------------------------------ revisión */

  function check(text, week) {
    var task = TASKS[week] || { min: 20, use: [] };
    var f = features(text);
    var reqs = [{ label: task.min + " palabras", n: f.words || 0, need: task.min }].concat(task.use.map(function (u) {
      return { id: u[0], label: u[2], n: f[u[0]] || 0, need: u[1] };
    }));
    reqs.forEach(function (r) { r.ok = r.n >= r.need; });
    var findings = lint(text, week);
    return { words: f.words || 0, features: f, reqs: reqs, findings: findings,
             hard: findings.filter(function (x) { return !x.soft; }).length,
             ok: reqs.every(function (r) { return r.ok; }) };
  }

  /* The text with the flagged words marked, for the result screen. */
  function markup(text, findings, esc) {
    esc = esc || function (s) { return s; };
    var tk = toks(text), marks = {};
    findings.forEach(function (f, k) { for (var j = 0; j < f.n; j++) if (tk[f.i + j] && tk[f.i + j].w) marks[f.i + j] = { k: k, soft: f.soft }; });
    var src = String(text || "").replace(/[’‘`´]/g, "'"), html = "", last = 0;
    tk.forEach(function (t, i) {
      if (!t.w || !marks[i]) return;
      html += esc(src.slice(last, t.at)) + '<mark class="' + (marks[i].soft ? "soft" : "bad") + '">' + esc(src.substr(t.at, t.len)) +
        "<sup>" + (marks[i].k + 1) + "</sup></mark>";
      last = t.at + t.len;
    });
    return html + esc(src.slice(last));
  }

  /* ------------------------------------------------------ LanguageTool
     A second opinion from the free public API of LanguageTool (no key; 20
     requests a minute, plenty for one learner).  It knows far more Italian
     than the local checker; the local findings keep their Spanish
     explanation, and what LanguageTool adds goes after them. */
  var LT_URL = "https://api.languagetool.org/v2/check";
  var LT_KIND = {
    GRAMMAR: ["grammatica", "Gramática", false], TYPOS: ["refuso", "Ortografía", false],
    CONFUSED_WORDS: ["lessico", "Palabra", false], PUNCTUATION: ["puntuazione", "Puntuación", true],
    CASING: ["maiuscole", "Mayúsculas", true], STYLE: ["stile", "Estilo", true], REDUNDANCY: ["stile", "Estilo", true],
    SEMANTICS: ["lessico", "Sentido", true], TYPOGRAPHY: ["stile", "Tipografía", true], COLLOCATIONS: ["lessico", "Combinación", true]
  };
  function ltCheck(text, done) {
    if (typeof fetch !== "function") return done(new Error("sin fetch"));
    var ctl = typeof AbortController === "function" ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctl) ctl.abort(); }, 12000);
    var body = "text=" + encodeURIComponent(String(text).slice(0, 18000)) + "&language=it&motherTongue=es";
    fetch(LT_URL, { method: "POST", body: body, signal: ctl ? ctl.signal : undefined,
                    headers: { "Content-Type": "application/x-www-form-urlencoded" } })
      .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then(function (j) { clearTimeout(timer); done(null, (j && j.matches) || []); })
      .catch(function (e) { clearTimeout(timer); done(e); });
  }
  // LanguageTool's matches as findings on the same tokens, minus what the
  // local checker already said and what is noise for a learner (a name, a
  // word the course itself uses, a space).
  function fromLT(text, matches, local) {
    var tk = toks(text), taken = {};
    (local || []).forEach(function (f) { for (var j = 0; j < f.n; j++) taken[f.i + j] = 1; });
    var out = [];
    (matches || []).forEach(function (m) {
      var cat = (m.rule && m.rule.category && m.rule.category.id) || "";
      if (/WHITESPACE|DOUBLE_PUNCT|UNPAIRED/.test((m.rule && m.rule.id) || "")) return;
      var kind = LT_KIND[cat] || ["lt", "Revisar", true];
      var first = -1, n = 0;
      tk.forEach(function (t, i) {
        if (!t.w) return;
        if (t.at < m.offset + m.length && t.at + t.len > m.offset) { if (first < 0) first = i; n = i - first + 1; }
      });
      if (first < 0) return;
      for (var j = 0; j < n; j++) if (taken[first + j] && tk[first + j].w) return;
      var w = tk[first];
      if (cat === "TYPOS" && (w.cap && !w.start || known(w.w))) return;   // names and words of the course
      for (var q = 0; q < n; q++) taken[first + q] = 1;
      var rep = (m.replacements || []).slice(0, 2).map(function (r) { return "*" + r.value + "*"; }).join(" o ");
      out.push({ i: first, n: n, cat: kind[0], soft: kind[2], lt: true,
                 msg: kind[1] + " (LanguageTool): " + String(m.message || m.shortMessage || "").replace(/\s+/g, " ").trim() +
                      (rep ? " → " + rep : "") });
    });
    return out;
  }

  /* ------------------------------------------------------------ IA
     Optional: Cerebras (free key of the learner, OpenAI-style API, answers
     in a second or two).  It reads the whole text like a teacher, marks
     everything and explains in Spanish; the key never leaves the phone
     except to Cerebras.  Which models a key can use changes over time, so
     the app asks Cerebras for the list and takes the best one available. */
  var AI_PREFER = [/qwen-3-235b.*instruct/i, /gpt-oss-120b/i, /llama-3\.3-70b/i, /llama-4-maverick/i, /qwen-3-32b/i, /llama-4-scout/i, /qwen/i, /llama/i];
  var AI_FALLBACK = ["qwen-3-235b-a22b-instruct-2507", "gpt-oss-120b", "llama-3.3-70b", "qwen-3-32b", "llama3.1-8b"];
  var AI_URL = "https://api.cerebras.ai/v1";
  function aiPrompt(text, week, task) {
    return "Sos profesor de italiano para un hispanohablante rioplatense que está en la semana " + week +
      " de 52 de un curso hasta C1. La consigna era: «" + (task ? task.t : "texto libre") + "».\n" +
      "Corregí su texto. Marcá TODOS los errores: gramática, concordancia, persona del verbo, artículos, " +
      "preposiciones, léxico, ortografía, tildes, dobles, castellano metido y lo que un italiano no diría. " +
      "No marques como error algo correcto solo porque se podría decir mejor.\n" +
      "Respondé SOLO con JSON: {\"errores\":[{\"mal\":\"fragmento EXACTO copiado del texto (lo más corto posible)\"," +
      "\"bien\":\"la corrección de ese fragmento\",\"explicacion\":\"una oración en castellano rioplatense con la regla\"}]," +
      "\"corregido\":\"el texto completo corregido\",\"comentario\":\"una o dos oraciones de devolución, en castellano\"}\n\n" +
      "Texto:\n" + text;
  }
  function aiCheck(text, week, key, done) { llm(aiPrompt(text, week, TASKS[week]), key, done); }

  /* Any exercise: why is my answer wrong (or is it right after all)? */
  function explainPrompt(x) {
    return "Sos profesor de italiano para un hispanohablante rioplatense. Un alumno respondió un ejercicio de una app.\n" +
      "Consigna: " + (x.prompt || "") + "\nEnunciado: " + (x.stem || "") +
      (x.options && x.options.length ? "\nOpciones: " + x.options.join(" | ") : "") +
      "\nRespuesta del alumno: " + (x.given || "(vacía)") + "\nRespuesta que la app da por correcta: " + (x.answer || "") +
      (x.accept && x.accept.length > 1 ? "\nOtras respuestas que la app acepta: " + x.accept.join(" | ") : "") +
      (x.feedback ? "\nCorrección que mostró la app: " + x.feedback : "") +
      "\n\nExplicale al alumno, en 2 a 4 oraciones en castellano rioplatense, qué está mal en su respuesta y cuál es la regla, " +
      "con un ejemplo corto en italiano. Si su respuesta en realidad también es correcta, o si la corrección de la app está mal o confunde, decilo claro.\n" +
      "Respondé SOLO con JSON: {\"tambien_correcta\": true o false, \"app_equivocada\": true o false, \"explicacion\": \"...\"}";
  }
  function explain(x, key, done) { llm(explainPrompt(x), key, done); }

  /* One request at a time through the models, best first: each attempt
     waits at most 20 s, the whole thing at most 60 s.  The model that
     answered last time goes first next time. */
  var MODEL_KEY = "laviac1.cerebras.model", LIST_KEY = "laviac1.cerebras.models";
  function models(key, cb) {
    try {
      var c = JSON.parse(localStorage.getItem(LIST_KEY) || "null");
      if (c && c.at > Date.now() - 86400000 && c.ids && c.ids.length) return cb(c.ids);
    } catch (e) { /* */ }
    var ctl = typeof AbortController === "function" ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctl) ctl.abort(); }, 8000);
    fetch(AI_URL + "/models", { headers: { Authorization: "Bearer " + key }, signal: ctl ? ctl.signal : undefined })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        clearTimeout(timer);
        var ids = ((j && j.data) || []).map(function (m) { return m.id; }).filter(Boolean);
        var ranked = [];
        AI_PREFER.forEach(function (rx) { ids.forEach(function (id) { if (rx.test(id) && ranked.indexOf(id) < 0) ranked.push(id); }); });
        ids.forEach(function (id) { if (ranked.indexOf(id) < 0) ranked.push(id); });
        if (ranked.length) { try { localStorage.setItem(LIST_KEY, JSON.stringify({ at: Date.now(), ids: ranked })); } catch (e) { /* */ } }
        cb(ranked.length ? ranked : AI_FALLBACK.slice());
      })
      .catch(function () { clearTimeout(timer); cb(AI_FALLBACK.slice()); });
  }
  // The JSON inside a reply (some models think aloud in <think>…</think> or wrap it in ```).
  function jsonOf(txt) {
    txt = String(txt || "").replace(/<think>[\s\S]*?<\/think>/g, "").replace(/```(json)?/g, "").trim();
    var a = txt.indexOf("{"), b = txt.lastIndexOf("}");
    return JSON.parse(a >= 0 && b > a ? txt.slice(a, b + 1) : txt);
  }
  function llm(prompt, key, done) {
    if (typeof fetch !== "function") return done(new Error("sin fetch"));
    models(key, function (list) {
      var order = list.slice(0, 6), deadline = Date.now() + 60000, lastErr = null, plain = {};
      try {
        var good = localStorage.getItem(MODEL_KEY);
        if (good && order.indexOf(good) > 0) { order.splice(order.indexOf(good), 1); order.unshift(good); }
      } catch (e) { /* */ }
      var k = 0;
      function next(err) {
        if (err) lastErr = err;
        if (k >= order.length || Date.now() > deadline) {
          var m = lastErr && /abort/i.test(String(lastErr.message || lastErr)) ? "la IA no respondió a tiempo" : String((lastErr && lastErr.message) || lastErr || "sin respuesta");
          return done(new Error(m));
        }
        attempt(order[k++]);
      }
      function attempt(model) {
        var ctl = typeof AbortController === "function" ? new AbortController() : null;
        var timer = setTimeout(function () { if (ctl) ctl.abort(); }, Math.min(20000, Math.max(3000, deadline - Date.now())));
        var body = { model: model, temperature: 0.2, max_completion_tokens: 4096,
                     messages: [{ role: "system", content: "Respondés solo con JSON válido." }, { role: "user", content: prompt }] };
        if (!plain[model]) body.response_format = { type: "json_object" };
        if (/gpt-oss/i.test(model) && !plain[model]) body.reasoning_effort = "low";
        fetch(AI_URL + "/chat/completions", {
          method: "POST", signal: ctl ? ctl.signal : undefined,
          headers: { "Content-Type": "application/json", Authorization: "Bearer " + key },
          body: JSON.stringify(body)
        }).then(function (r) {
          if (r.ok) return r.json();
          return r.text().then(function (b) {
            clearTimeout(timer);
            // a model that rejects the JSON mode or the reasoning option: again without them
            if (r.status === 400 && !plain[model] && /response_format|json|reasoning/i.test(b)) { plain[model] = 1; attempt(model); return null; }
            if (r.status === 401 || r.status === 403) return done(new Error("HTTP " + r.status + ", clave"));
            next(new Error(r.status === 429 ? "se terminó el cupo por ahora (429)" : r.status >= 500 ? "Cerebras está saturado ahora (" + r.status + ")" : "HTTP " + r.status));
            return null;
          });
        }).then(function (j) {
          if (!j) return;
          clearTimeout(timer);
          var msg = j.choices && j.choices[0] && j.choices[0].message;
          var data;
          try { data = jsonOf(msg && msg.content); } catch (e) { return next(new Error("respuesta ilegible")); }
          try { localStorage.setItem(MODEL_KEY, model); } catch (e) { /* */ }
          done(null, data);
        }).catch(function (e) { clearTimeout(timer); next(e); });
      }
      next();
    });
  }
  // The AI's errors as findings on the text's tokens (each fragment is found
  // in the text; what the local checker already marked is not repeated).
  function fromAI(text, data, local) {
    var tk = toks(text), taken = {}, low = String(text).replace(/[’‘`´]/g, "'").toLowerCase(), from = 0, out = [];
    (local || []).forEach(function (f) { if (!f.lt) for (var j = 0; j < f.n; j++) taken[f.i + j] = 1; });
    ((data && data.errores) || []).forEach(function (e) {
      var bad = String(e.mal || "").replace(/[’‘`´]/g, "'").trim();
      if (!bad) return;
      var at = low.indexOf(bad.toLowerCase(), from);
      if (at < 0) at = low.indexOf(bad.toLowerCase());
      if (at < 0) return;
      from = at + bad.length;
      var first = -1, n = 0;
      tk.forEach(function (t, i) { if (t.w && t.at < at + bad.length && t.at + t.len > at) { if (first < 0) first = i; n = i - first + 1; } });
      if (first < 0) return;
      var dup = true;
      for (var j = 0; j < n; j++) if (!taken[first + j]) dup = false;
      if (dup) return;
      out.push({ i: first, n: n, cat: "ia", soft: false, ai: true,
                 msg: "IA: " + (e.bien ? "*" + bad + "* → *" + String(e.bien).trim() + "*. " : "") + String(e.explicacion || "").trim() });
    });
    return out;
  }

  function weeks() { return Object.keys(TASKS).map(Number); }

  var api = { TASKS: TASKS, features: features, lint: lint, check: check, markup: markup, weeks: weeks, toks: toks,
              learn: learn, learnCourse: learnCourse, ltCheck: ltCheck, fromLT: fromLT,
              aiCheck: aiCheck, fromAI: fromAI, aiPrompt: aiPrompt, explain: explain, explainPrompt: explainPrompt };
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.Scrivi = api;
})(typeof window !== "undefined" ? window : globalThis);
