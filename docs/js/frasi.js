/*
 * Le frasi — il banco di conversazione.  La grammatica del percorso ti dà il
 * sistema; queste frasi ti danno la parlata: blocchi pronti, ad alta
 * frequenza, da dire senza pensare.  Ogni frase: [italiano, castellano, nota?].
 *
 * Contiene anche la logica degli esercizi di frase (tessere, ascolto,
 * scrittura, lampo), senza dipendenze dal DOM, così si testa sotto Node.
 */
(function (root) {
  "use strict";

  var SCENES = [
    { id: "ciao", emoji: "👋", name: "Primi passi",
      blurb: "Saludar, presentarte y despedirte como un italiano.",
      phrases: [
        ["Ciao, come stai?", "Hola, ¿cómo estás?"],
        ["Sto bene, grazie. E tu?", "Estoy bien, gracias. ¿Y vos?"],
        ["Buongiorno, come sta?", "Buen día, ¿cómo está (usted)?", "Con *Lei* el verbo va en tercera persona."],
        ["Mi chiamo Augusto.", "Me llamo Augusto."],
        ["Piacere di conoscerti.", "Un gusto conocerte."],
        ["Di dove sei?", "¿De dónde sos?"],
        ["Sono argentino, di Buenos Aires.", "Soy argentino, de Buenos Aires."],
        ["Che lavoro fai?", "¿De qué trabajás?"],
        ["Abito qui da due anni.", "Vivo acá hace dos años.", "«Hace X tiempo que…» = *da* + tiempo, con presente."],
        ["Parli spagnolo?", "¿Hablás español?"],
        ["Parlo un po' di italiano.", "Hablo un poco de italiano."],
        ["Tutto a posto?", "¿Todo bien?"],
        ["Non c'è male.", "Nada mal."],
        ["Ci vediamo dopo!", "¡Nos vemos después!"],
        ["A domani!", "¡Hasta mañana!"],
        ["Buona serata!", "¡Que tengas buena noche!"],
        ["Salutami tua sorella.", "Saludá a tu hermana de mi parte."],
        ["Ciao, a presto!", "¡Chau, hasta pronto!"]
      ] },

    { id: "salva", emoji: "🛟", name: "Salvavita",
      blurb: "Las frases que te rescatan cuando no entendés nada.",
      phrases: [
        ["Scusa, non ho capito.", "Perdón, no entendí."],
        ["Puoi ripetere, per favore?", "¿Podés repetir, por favor?"],
        ["Puoi parlare più piano?", "¿Podés hablar más despacio?", "*Piano* = despacio (y bajito). No es «plano»."],
        ["Come si dice «ventana» in italiano?", "¿Cómo se dice «ventana» en italiano?"],
        ["Cosa vuol dire questa parola?", "¿Qué significa esta palabra?"],
        ["Come si scrive?", "¿Cómo se escribe?"],
        ["Non lo so.", "No sé."],
        ["Non mi ricordo la parola.", "No me acuerdo la palabra."],
        ["Sto imparando l'italiano.", "Estoy aprendiendo italiano."],
        ["Mi puoi correggere se sbaglio?", "¿Me podés corregir si me equivoco?"],
        ["Ho sbagliato.", "Me equivoqué."],
        ["Un attimo, ci penso.", "Un momento, lo pienso."],
        ["Intendi dire che…?", "¿Querés decir que…?"],
        ["Va bene, ho capito.", "Está bien, entendí."],
        ["Mi serve aiuto.", "Necesito ayuda."],
        ["Dov'è il bagno?", "¿Dónde está el baño?"],
        ["Non importa.", "No importa."],
        ["Esatto!", "¡Exacto!"]
      ] },

    { id: "bar", emoji: "☕", name: "Al bar",
      blurb: "Pedir un café de pie, a la italiana.",
      phrases: [
        ["Un caffè, per favore.", "Un café, por favor.", "*Un caffè* es un espresso. Si querés café con leche, pedí *un caffellatte*."],
        ["Vorrei un cappuccino e un cornetto.", "Quisiera un cappuccino y una medialuna."],
        ["Quant'è?", "¿Cuánto es?"],
        ["Posso pagare con la carta?", "¿Puedo pagar con tarjeta?"],
        ["Pago io, offro io!", "¡Pago yo, invito yo!"],
        ["Facciamo alla romana?", "¿Pagamos a medias / cada uno lo suyo?"],
        ["Ci prendiamo un caffè?", "¿Nos tomamos un café?"],
        ["Un bicchiere d'acqua, per favore.", "Un vaso de agua, por favor."],
        ["Per me un succo d'arancia.", "Para mí un jugo de naranja."],
        ["È libero questo tavolo?", "¿Está libre esta mesa?"],
        ["Da portare via.", "Para llevar."],
        ["Lo prendo al banco.", "Lo tomo en la barra."],
        ["Tenga il resto.", "Quédese con el vuelto."],
        ["Mi fa lo scontrino?", "¿Me hace el ticket?"],
        ["Grazie mille!", "¡Muchas gracias!"],
        ["Prego!", "¡De nada!", "*Prego* sirve para «de nada», «pase», «adelante» y «¿qué desea?»."]
      ] },

    { id: "tavola", emoji: "🍝", name: "A tavola",
      blurb: "Restaurante, cena con amigos y comida.",
      phrases: [
        ["Avete un tavolo per due?", "¿Tienen una mesa para dos?"],
        ["Ho prenotato a nome Parrino.", "Reservé a nombre de Parrino."],
        ["Possiamo vedere il menù?", "¿Podemos ver el menú?"],
        ["Cosa mi consiglia?", "¿Qué me recomienda?"],
        ["Prendo gli spaghetti alle vongole.", "Pido los spaghetti con almejas.", "Para pedir comida se usa *prendo* (o *vorrei*); *chiedo* es pedir algo a alguien o preguntar."],
        ["Sono allergico alle noci.", "Soy alérgico a las nueces."],
        ["Il conto, per favore.", "La cuenta, por favor."],
        ["Era tutto buonissimo.", "Estaba todo riquísimo."],
        ["Ho una fame da lupo.", "Tengo un hambre de lobo."],
        ["Sono pieno, non ce la faccio più.", "Estoy lleno, no puedo más."],
        ["Buon appetito!", "¡Buen provecho!"],
        ["Cin cin! Alla salute!", "¡Chin chin! ¡Salud!"],
        ["Mi passi il sale?", "¿Me pasás la sal?"],
        ["Un altro po' di vino?", "¿Un poco más de vino?"],
        ["Il servizio è incluso?", "¿El servicio está incluido?"],
        ["È troppo salato.", "Está demasiado salado."],
        ["Faccio io la spesa stasera.", "Hago yo las compras (del súper) esta noche.", "*Fare la spesa* = hacer las compras de comida."]
      ] },

    { id: "giro", emoji: "🚆", name: "In giro",
      blurb: "Moverse por la ciudad: direcciones, trenes y hoteles.",
      phrases: [
        ["Scusi, dov'è la stazione?", "Disculpe, ¿dónde está la estación?"],
        ["È lontano da qui?", "¿Está lejos de acá?"],
        ["Si va sempre dritto e poi a destra.", "Se va siempre derecho y después a la derecha."],
        ["Giri a sinistra al semaforo.", "Doble a la izquierda en el semáforo."],
        ["Un biglietto per Firenze, andata e ritorno.", "Un pasaje a Florencia, ida y vuelta."],
        ["A che ora parte il treno?", "¿A qué hora sale el tren?"],
        ["Il treno è in ritardo.", "El tren está demorado."],
        ["Da quale binario parte?", "¿De qué andén sale?"],
        ["Devo scendere alla prossima fermata.", "Me tengo que bajar en la próxima parada."],
        ["Quanto ci vuole a piedi?", "¿Cuánto se tarda a pie?", "*Ci vuole* / *ci vogliono* = se necesita / se tarda."],
        ["Ci vogliono dieci minuti.", "Se tarda diez minutos."],
        ["Mi sono perso.", "Me perdí."],
        ["Ho una prenotazione per tre notti.", "Tengo una reserva por tres noches."],
        ["A che ora è il check-out?", "¿A qué hora es el check-out?"],
        ["C'è una farmacia qui vicino?", "¿Hay una farmacia acá cerca?"],
        ["Mi può chiamare un taxi?", "¿Me puede llamar un taxi?"],
        ["Si può andare a piedi?", "¿Se puede ir caminando?"]
      ] },

    { id: "lavoro", emoji: "💼", name: "In ufficio",
      blurb: "Reuniones, correos y charla de oficina.",
      phrases: [
        ["Ho una riunione alle tre.", "Tengo una reunión a las tres."],
        ["Sono di fretta, ne parliamo dopo?", "Estoy apurado, ¿lo hablamos después?"],
        ["Ti mando una mail entro stasera.", "Te mando un mail antes de esta noche."],
        ["Mi puoi dare una mano?", "¿Me podés dar una mano?"],
        ["Ci sentiamo domani.", "Hablamos mañana."],
        ["Qual è la scadenza?", "¿Cuál es la fecha límite?"],
        ["Sono d'accordo con te.", "Estoy de acuerdo con vos."],
        ["Non sono del tutto convinto.", "No estoy del todo convencido."],
        ["Facciamo il punto della situazione.", "Hagamos un resumen de la situación."],
        ["Ci aggiorniamo la settimana prossima.", "Nos actualizamos la semana que viene."],
        ["Oggi lavoro da casa.", "Hoy trabajo desde casa."],
        ["Che noia questa riunione!", "¡Qué aburrida esta reunión!"],
        ["Ho un sacco di lavoro.", "Tengo un montón de trabajo."],
        ["Faccio una pausa.", "Me tomo un descanso."],
        ["Stacco alle sei.", "Salgo (del trabajo) a las seis."],
        ["Il capo è di buon umore oggi.", "El jefe está de buen humor hoy."],
        ["Mi è venuta un'idea.", "Se me ocurrió una idea."],
        ["Tienimi aggiornato.", "Mantenéme al tanto."]
      ] },

    { id: "chiacchiere", emoji: "💬", name: "Chiacchiere",
      blurb: "Charla casual: el finde, el clima, planes.",
      phrases: [
        ["Cosa hai fatto nel fine settimana?", "¿Qué hiciste el fin de semana?"],
        ["Sono andato al mare con degli amici.", "Fui a la playa con unos amigos.", "*Andare* usa *essere* en el passato prossimo."],
        ["Che tempo fa oggi?", "¿Qué tiempo hace hoy?"],
        ["Fa un caldo pazzesco.", "Hace un calor terrible."],
        ["Sta per piovere.", "Está por llover."],
        ["Che fai stasera?", "¿Qué hacés esta noche?"],
        ["Ti va di uscire?", "¿Tenés ganas de salir?", "*Ti va di* + infinitivo = ¿te pinta…?"],
        ["Non vedo l'ora!", "¡No veo la hora!"],
        ["Da quanto tempo!", "¡Cuánto tiempo!"],
        ["Com'è andata?","¿Cómo te fue?"],
        ["È andata benissimo.", "Me fue re bien."],
        ["Sei mai stato in Italia?", "¿Alguna vez estuviste en Italia?"],
        ["Mi piace un sacco.", "Me encanta / me gusta un montón."],
        ["Mi piacciono i film italiani.", "Me gustan las películas italianas.", "Plural: *mi piacciono*."],
        ["Che bella giornata!", "¡Qué lindo día!"],
        ["Ho visto una serie bellissima.", "Vi una serie buenísima."],
        ["Cosa ne pensi?", "¿Qué pensás de eso?"],
        ["Dimmi tutto!", "¡Contame todo!"]
      ] },

    { id: "reazioni", emoji: "🤌", name: "Reazioni",
      blurb: "Las muletillas que te hacen sonar nativo.",
      phrases: [
        ["Dai!", "¡Dale! / ¡Vamos! / ¡No me digas!", "*Dai* cambia con el tono: ánimo, sorpresa o fastidio."],
        ["Magari!", "¡Ojalá!"],
        ["Meno male!", "¡Menos mal!"],
        ["Che figata!", "¡Qué bueno! / ¡Qué genial!"],
        ["Boh, non lo so.", "Ni idea."],
        ["Mamma mia, che casino!", "¡Madre mía, qué lío!", "*Casino* = lío, desorden. El de apostar es *casinò*."],
        ["Ma dai, davvero?", "¿En serio?"],
        ["Che peccato!", "¡Qué lástima!"],
        ["Figurati!", "¡Faltaba más! / ¡No es nada!"],
        ["Non ci posso credere!", "¡No lo puedo creer!"],
        ["Ci mancherebbe!", "¡Ni lo menciones! / ¡Obvio!"],
        ["Pazienza.", "Paciencia / ¿qué le vamos a hacer?"],
        ["Che schifo!", "¡Qué asco!"],
        ["Va be', fa niente.", "Bueno, no pasa nada."],
        ["Accidenti!", "¡Uy, caramba!"],
        ["Sul serio?", "¿Posta? / ¿De verdad?"],
        ["Ma che dici?", "¿Pero qué decís?"],
        ["Ecco!", "¡Ahí está! / ¡Eso!"]
      ] },

    { id: "ponti", emoji: "🌉", name: "Connettori",
      blurb: "Las palabras puente que te dan tiempo para pensar.",
      phrases: [
        ["Allora, cosa facciamo?", "Entonces, ¿qué hacemos?"],
        ["Cioè, volevo dire un'altra cosa.", "O sea, quería decir otra cosa."],
        ["Comunque, non è un problema.", "De todos modos, no es un problema."],
        ["Insomma, è andata così.", "En fin, fue así."],
        ["Però non ho tempo.", "Pero no tengo tiempo."],
        ["Quindi ci vediamo lunedì.", "Así que nos vemos el lunes."],
        ["Infatti, hai ragione.", "Justamente, tenés razón.", "*Infatti* confirma lo dicho: no es «de hecho» contradictorio."],
        ["Anzi, è ancora meglio.", "Es más, es todavía mejor."],
        ["Tra l'altro, lo conosco.", "Además / por cierto, lo conozco."],
        ["A proposito, hai sentito Marco?", "A propósito, ¿hablaste con Marco?"],
        ["Secondo me, ha ragione lei.", "Para mí, ella tiene razón."],
        ["Da una parte sì, dall'altra no.", "Por un lado sí, por el otro no."],
        ["Invece io preferisco il mare.", "Yo, en cambio, prefiero el mar."],
        ["Praticamente abbiamo finito.", "Prácticamente terminamos."],
        ["Tipo, non so, domani?", "Tipo, no sé, ¿mañana?"],
        ["Beh, dipende.", "Bueno, depende."],
        ["Ad ogni modo, ti chiamo.", "De cualquier forma, te llamo."],
        ["Appunto!", "¡Justamente!"]
      ] },

    { id: "opinioni", emoji: "🧠", name: "Opinioni",
      blurb: "Opinar y matizar — con el congiuntivo ya incorporado.",
      phrases: [
        ["Penso che sia una buona idea.", "Pienso que es una buena idea.", "Tras *penso che* va congiuntivo: *sia*, no *è*."],
        ["Credo che abbia ragione.", "Creo que tiene razón."],
        ["Non credo che venga.", "No creo que venga."],
        ["Mi sembra che tu sia stanco.", "Me parece que estás cansado."],
        ["Spero che vada tutto bene.", "Espero que salga todo bien."],
        ["È meglio che tu lo sappia.", "Es mejor que lo sepas."],
        ["Sono sicuro che è vero.", "Estoy seguro de que es verdad.", "Con certeza (*sono sicuro*) vuelve el indicativo."],
        ["Non è detto.", "No necesariamente."],
        ["Dipende dai punti di vista.", "Depende de los puntos de vista."],
        ["Hai ragione, non ci avevo pensato.", "Tenés razón, no lo había pensado."],
        ["Non sono d'accordo per niente.", "No estoy para nada de acuerdo."],
        ["Può darsi.", "Puede ser."],
        ["Se avessi tempo, verrei.", "Si tuviera tiempo, iría.", "Periodo hipotético: *se* + congiuntivo imperfetto + condizionale."],
        ["Se fossi in te, lo farei.", "Yo que vos, lo haría."],
        ["Vorrei che tu venissi.", "Quisiera que vinieras."],
        ["Mi sa che hai ragione.", "Me parece que tenés razón.", "*Mi sa che* es coloquial y va con indicativo."],
        ["Ne vale la pena.", "Vale la pena."]
      ] },

    { id: "tempo", emoji: "⏳", name: "Passato e futuro",
      blurb: "Contar lo que hiciste y lo que vas a hacer.",
      phrases: [
        ["Ieri sono uscito tardi.", "Ayer salí tarde."],
        ["Ho mangiato troppo.", "Comí demasiado."],
        ["Non ho dormito bene.", "No dormí bien."],
        ["Sono appena arrivato.", "Acabo de llegar.", "«Acabar de» = *appena* + passato prossimo."],
        ["Stavo per chiamarti.", "Estaba por llamarte."],
        ["Domani vado dal medico.", "Mañana voy al médico.", "A casa de una persona: *da*. *Vado dal medico*, no «al medico»."],
        ["Quest'estate andrò in Sicilia.", "Este verano voy a ir a Sicilia."],
        ["Ci sono stato l'anno scorso.", "Estuve ahí el año pasado."],
        ["Quando ero piccolo, giocavo a calcio.", "Cuando era chico, jugaba al fútbol."],
        ["Stamattina mi sono svegliato presto.", "Esta mañana me desperté temprano."],
        ["Non l'ho ancora fatto.", "Todavía no lo hice."],
        ["L'ho già visto.", "Ya lo vi."],
        ["Fra un'ora sono lì.", "En una hora estoy ahí.", "*Fra/tra* + tiempo = dentro de. «En una hora» no es *in un'ora*."],
        ["Tre anni fa vivevo a Roma.", "Hace tres años vivía en Roma."],
        ["Sto lavorando, ti richiamo.", "Estoy trabajando, te vuelvo a llamar."],
        ["Ci ho messo due ore.", "Tardé dos horas."],
        ["Prima o poi ci riuscirò.", "Tarde o temprano lo voy a lograr."]
      ] },

    { id: "trappole", emoji: "🪤", name: "Falsi amici",
      blurb: "Palabras que parecen españolas y te traicionan.",
      phrases: [
        ["Ho mal di testa.", "Me duele la cabeza.", "*Testa* es cabeza (no «testa» de testar)."],
        ["Sono imbarazzato.", "Estoy avergonzado.", "*Imbarazzata* NO es embarazada: embarazada es *incinta*."],
        ["Mia moglie è incinta.", "Mi esposa está embarazada."],
        ["Esco con i miei amici.", "Salgo con mis amigos.", "*Salire* es subir; salir es *uscire*."],
        ["Salgo sull'autobus.", "Me subo al colectivo."],
        ["Ho caldo, apro la finestra.", "Tengo calor, abro la ventana.", "*Ventana* no existe: es *finestra*."],
        ["Mi guardo allo specchio.", "Me miro al espejo."],
        ["Ho lasciato la borsa in macchina.", "Dejé la cartera en el auto.", "*Macchina* = auto (y máquina)."],
        ["Questo burro è salato.", "Esta manteca es salada.", "*Burro* es manteca; el animal es *asino*."],
        ["Ho una camera doppia.", "Tengo una habitación doble.", "*Camera* = habitación; *cámara* de fotos = *macchina fotografica*."],
        ["Mi piace il salone.", "Me gusta la sala.", "*Salone* = sala amplia."],
        ["Guarda che è tardi.", "Mirá que es tarde."],
        ["Faccio colazione alle otto.", "Desayuno a las ocho.", "*Colazione* = desayuno."],
        ["Che guaio!", "¡Qué problema!"],
        ["Non mi toccare!", "¡No me toques!"],
        ["Il negozio è chiuso.", "El negocio está cerrado."],
        ["Ho fatto il bucato.", "Lavé la ropa.", "*Bucato* = la ropa lavada; nada que ver con la boca."],
        ["Mi fa schifo.", "Me da asco."]
      ] },

    { id: "casa", emoji: "🏠", name: "Casa e famiglia",
      blurb: "Tu gente, tu casa, tu rutina.",
      phrases: [
        ["Ho due fratelli e una sorella.", "Tengo dos hermanos y una hermana."],
        ["Mia madre è molto simpatica.", "Mi mamá es muy simpática.", "Con familiares en singular, sin artículo: *mia madre*."],
        ["I miei genitori abitano in Argentina.", "Mis padres viven en Argentina."],
        ["Vivo da solo.", "Vivo solo."],
        ["Mi alzo alle sette.", "Me levanto a las siete."],
        ["Mi faccio la doccia.", "Me baño / me doy una ducha."],
        ["Stasera cucino io.", "Esta noche cocino yo."],
        ["Devo pulire casa.", "Tengo que limpiar la casa."],
        ["Vado a letto presto.", "Me voy a dormir temprano."],
        ["Ho un cane che si chiama Toto.", "Tengo un perro que se llama Toto."],
        ["Siamo in quattro.", "Somos cuatro."],
        ["Mio figlio va a scuola.", "Mi hijo va a la escuela."],
        ["Stiamo insieme da cinque anni.", "Estamos juntos hace cinco años."],
        ["Mi manca la mia famiglia.", "Extraño a mi familia.", "Estructura invertida: *mi manca* = me falta → extraño."],
        ["Casa mia è piccola ma carina.", "Mi casa es chica pero linda."],
        ["Vieni a cena da me?", "¿Venís a cenar a casa?"]
      ] },

    { id: "negozi", emoji: "🛍️", name: "Negozi e salute",
      blurb: "Comprar, probarte ropa y el médico.",
      phrases: [
        ["Quanto costa?", "¿Cuánto cuesta?"],
        ["Posso provarlo?", "¿Me lo puedo probar?"],
        ["Avete una taglia più grande?", "¿Tienen un talle más grande?"],
        ["Sto solo dando un'occhiata.", "Solo estoy mirando."],
        ["Lo prendo.", "Me lo llevo."],
        ["È in saldo?", "¿Está en oferta / rebaja?"],
        ["Mi fa uno sconto?", "¿Me hace un descuento?"],
        ["È troppo caro.", "Es demasiado caro."],
        ["Non mi sento bene.", "No me siento bien."],
        ["Mi fa male la gola.", "Me duele la garganta."],
        ["Ho la febbre.", "Tengo fiebre."],
        ["Mi sono raffreddato.", "Me resfrié."],
        ["Ho bisogno di un medico.", "Necesito un médico."],
        ["Prenda questa pastiglia due volte al giorno.", "Tome esta pastilla dos veces por día."],
        ["Mi può fare la ricevuta?", "¿Me puede hacer el recibo?"],
        ["A che ora chiudete?", "¿A qué hora cierran?"]
      ] },

    { id: "cuore", emoji: "❤️", name: "Sentimenti",
      blurb: "Decir lo que sentís: gustos, ganas y emociones.",
      phrases: [
        ["Ho voglia di un gelato.", "Tengo ganas de un helado."],
        ["Non ne ho voglia.", "No tengo ganas."],
        ["Sono stanco morto.", "Estoy muerto de cansancio."],
        ["Mi annoio.", "Me aburro."],
        ["Sono contento per te.", "Me alegro por vos."],
        ["Mi dispiace tantissimo.", "Lo siento muchísimo."],
        ["Ti voglio bene.", "Te quiero.", "*Ti voglio bene*: familia y amigos. *Ti amo*: pareja."],
        ["Mi fai ridere.", "Me hacés reír."],
        ["Sono nervoso per l'esame.", "Estoy nervioso por el examen."],
        ["Che bello vederti!", "¡Qué lindo verte!"],
        ["Mi hai fatto una bella sorpresa.", "Me diste una linda sorpresa."],
        ["Non ti preoccupare.", "No te preocupes."],
        ["Mi fido di te.", "Confío en vos."],
        ["Ne ho abbastanza!", "¡Ya me cansé! / ¡Estoy harto!"],
        ["Sono fiero di te.", "Estoy orgulloso de vos."],
        ["In bocca al lupo!", "¡Suerte!", "Se responde *Crepi!* (¡que se muera el lobo!)."]
      ] },

    { id: "idee", emoji: "🏛️", name: "Parlare di idee",
      blurb: "Para charlar de historia, política, libros y sociedad sin quedarte mudo.",
      phrases: [
        ["Da un punto di vista storico, ha senso.", "Desde un punto de vista histórico, tiene sentido."],
        ["Bisogna contestualizzare.", "Hay que contextualizar."],
        ["È una questione di classe sociale.", "Es una cuestión de clase social."],
        ["Non sono d'accordo con questa interpretazione.", "No estoy de acuerdo con esta interpretación."],
        ["Dipende da cosa intendi per libertà.", "Depende de qué entendés por libertad."],
        ["Il problema è più complesso di così.", "El problema es más complejo que eso."],
        ["Su questo punto hai ragione.", "En este punto tenés razón."],
        ["Mi ha fatto riflettere.", "Me hizo reflexionar."],
        ["È un libro che mi ha cambiato la vita.", "Es un libro que me cambió la vida."],
        ["L'ho letto in traduzione.", "Lo leí traducido."],
        ["Il suo pensiero è ancora attuale.", "Su pensamiento sigue siendo actual.", "*Attuale* = actual, vigente. «Actualmente» es *attualmente*."],
        ["Non si può ridurre tutto all'economia.", "No se puede reducir todo a la economía."],
        ["Si tratta di un luogo comune.", "Se trata de un lugar común."],
        ["In altre parole, il potere si basa sul consenso.", "En otras palabras, el poder se basa en el consenso."],
        ["Faccio l'avvocato del diavolo.", "Hago de abogado del diablo."],
        ["La storia la scrivono i vincitori.", "La historia la escriben los vencedores."],
        ["Sono cresciuto leggendo Borges.", "Crecí leyendo a Borges.", "Con personas no va *a*: *leggo Borges*, *conosco Maria*."],
        ["Che cosa ne pensi, da sociologo?", "¿Qué opinás, como sociólogo?"]
      ] },

    { id: "citazioni", emoji: "✒️", name: "Citazioni celebri",
      blurb: "Versos y frases que cualquier italiano reconoce. Aprenderlas es aprender la lengua y la cultura a la vez.",
      phrases: [
        ["Nel mezzo del cammin di nostra vita", "En medio del camino de nuestra vida", "Dante, *Inferno* I, 1: el primer verso de la *Commedia*."],
        ["Lasciate ogni speranza, voi ch'entrate", "Abandonen toda esperanza, ustedes que entran", "Dante, *Inferno* III: la inscripción sobre la puerta del infierno."],
        ["Amor, ch'a nullo amato amar perdona", "Amor, que a ningún amado permite no amar", "Dante, *Inferno* V: Francesca da Rimini."],
        ["Fatti non foste a viver come bruti", "No fueron hechos para vivir como bestias", "Dante, *Inferno* XXVI: Ulises; sigue *ma per seguir virtute e canoscenza*."],
        ["E quindi uscimmo a riveder le stelle", "Y de allí salimos a volver a ver las estrellas", "Dante, *Inferno* XXXIV: el último verso del Infierno. *Uscimmo* es passato remoto."],
        ["Chi vuol esser lieto, sia: di doman non c'è certezza", "Quien quiera ser feliz, que lo sea: del mañana no hay certeza", "Lorenzo de' Medici, *Canzona di Bacco* (1490)."],
        ["Sempre caro mi fu quest'ermo colle", "Siempre me fue querida esta colina solitaria", "Leopardi, *L'infinito* (1819). *Fu* = passato remoto de *essere*."],
        ["E il naufragar m'è dolce in questo mare", "Y naufragar me es dulce en este mar", "Leopardi, el último verso de *L'infinito*."],
        ["Quel ramo del lago di Como", "Aquel brazo del lago de Como", "Manzoni, el comienzo de *I promessi sposi*."],
        ["Se vogliamo che tutto rimanga com'è, bisogna che tutto cambi", "Si queremos que todo siga como está, es necesario que todo cambie", "Tomasi di Lampedusa, *Il Gattopardo*. Dos congiuntivi: *rimanga*, *cambi*."],
        ["M'illumino d'immenso", "Me ilumino de inmensidad", "Ungaretti, *Mattina* (1917): un poema entero de dos versos."],
        ["Si sta come d'autunno sugli alberi le foglie", "Se está como en otoño en los árboles las hojas", "Ungaretti, *Soldati* (1918): los soldados en la trinchera."],
        ["Ognuno sta solo sul cuor della terra", "Cada uno está solo sobre el corazón de la tierra", "Quasimodo, *Ed è subito sera*."],
        ["Odio gli indifferenti", "Odio a los indiferentes", "Gramsci, artículo de 1917."],
        ["Il pessimismo dell'intelligenza, l'ottimismo della volontà", "El pesimismo de la inteligencia, el optimismo de la voluntad", "Lema que Gramsci tomó de Romain Rolland."],
        ["Considerate se questo è un uomo", "Consideren si esto es un hombre", "Primo Levi, del poema que abre *Se questo è un uomo*."],
        ["Un paese ci vuole, non fosse che per il gusto di andarsene via", "Hace falta un pueblo, aunque sea por el gusto de irse", "Pavese, *La luna e i falò* (1950)."],
        ["Eppur si muove", "Y sin embargo se mueve", "Atribuida a Galileo tras el proceso de 1633. No hay pruebas de que la haya dicho."]
      ] }
  ];

  /* ------------------------------------------------------------- indice */

  var ALL = [];
  SCENES.forEach(function (s) {
    s.phrases.forEach(function (p, i) {
      ALL.push({
        id: "frase:" + s.id + ":" + i,
        scene: s.id,
        it: p[0],
        es: p[1],
        note: p[2] || ""
      });
    });
  });

  var BY_ID = {};
  ALL.forEach(function (f) { BY_ID[f.id] = f; });

  // A word capitalised in mid-sentence is a name (Firenze, Borges).
  var PROPER = {};
  ALL.forEach(function (f) {
    var t = String(f.it).replace(/«|»/g, "").split(/\s+/);
    for (var i = 1; i < t.length; i++) {
      var w = t[i].replace(/^[.,!?;:…"]+|[.,!?;:…"]+$/g, "");
      if (/^[A-ZÀ-Ý]/.test(w) && !/[.!?…]$/.test(t[i - 1])) PROPER[w] = true;
    }
  });

  function scene(id) {
    for (var i = 0; i < SCENES.length; i++) if (SCENES[i].id === id) return SCENES[i];
    return null;
  }

  function ofScene(id) {
    return ALL.filter(function (f) { return f.scene === id; });
  }

  /* --------------------------------------------------------- confronto */

  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  // Words as the learner sees them on the tiles (punctuation kept on the word).
  function tiles(s) {
    return String(s).replace(/«|»/g, "").split(/\s+/).filter(Boolean);
  }

  /* Tiles as shown on screen: no punctuation and no sentence-initial capital,
     or the tiles give the order away ("Ciao," first, "stai?" last).  Proper
     nouns keep their capital (PROPER is filled at load, see above). */

  function tileWords(s) {
    return tiles(s).map(function (t) {
      var w = t.replace(/^[.,!?;:…"]+|[.,!?;:…"]+$/g, "");
      return PROPER[w] ? w : w.charAt(0).toLowerCase() + w.slice(1);
    }).filter(Boolean);
  }

  // Words as the grader compares them: lower case, no punctuation, no accents.
  // Phrase drills train speed of recall, so a missing accent on a phone
  // keyboard is not an error here (the grammar rounds stay strict).
  function words(s) {
    return String(s == null ? "" : s)
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[’‘`´]/g, "'")
      .replace(/'/g, "")          // dov'è = dove, po' = po
      .replace(/[^a-z0-9 ]+/g, " ")
      .split(/\s+/)
      .filter(Boolean);
  }

  // Longest common subsequence of two word lists.
  function lcs(a, b) {
    var prev = [], cur, i, j;
    for (j = 0; j <= b.length; j++) prev[j] = 0;
    for (i = 1; i <= a.length; i++) {
      cur = [0];
      for (j = 1; j <= b.length; j++) {
        cur[j] = a[i - 1] === b[j - 1] ? prev[j - 1] + 1
               : Math.max(prev[j], cur[j - 1]);
      }
      prev = cur;
    }
    return prev[b.length];
  }

  /* Similarity 0..1 between what was written and the target, word by word.
     Returns also which target words were hit, so the UI can colour them. */
  function compare(said, target) {
    var s = words(said), t = words(target);
    if (!t.length) return { score: 0, hits: [] };
    var common = lcs(s, t);
    var score = (2 * common) / (s.length + t.length || 1);
    var pool = s.slice();
    var hits = t.map(function (w) {
      var k = pool.indexOf(w);
      if (k >= 0) { pool.splice(k, 1); return true; }
      return false;
    });
    return { score: score, hits: hits };
  }

  /* A written phrase: exact words = right; one slip in a longer phrase =
     close.  Word order counts, because that is what makes it Italian. */
  function gradeWritten(given, target) {
    var r = compare(given, target);
    var same = words(given).join(" ") === words(target).join(" ");
    r.verdict = same ? "giusto" : r.score >= 0.8 ? "quasi" : "sbagliato";
    return r;
  }

  /* --------------------------------------------------------- esercizi */

  /* Ogni frase genera esercizi di tipo diverso.  Tutti condividono la forma
     degli item del corso (id, type, prompt, stem, answer), più il campo
     `frase` che porta la frase di origine. */

  function tilesItem(f) {
    var own = tileWords(f.it);
    var others = shuffle(ALL.filter(function (g) { return g.scene === f.scene && g.id !== f.id; }));
    var extra = [];
    var have = words(f.it);
    for (var i = 0; i < others.length && extra.length < 3; i++) {
      var cand = tileWords(others[i].it);
      var w = cand[Math.floor(Math.random() * cand.length)];
      var key = words(w).join(" ");
      if (key && have.indexOf(key) < 0 && extra.every(function (e) {
        return words(e).join(" ") !== key;
      })) extra.push(w);
    }
    return {
      id: f.id, frase: f, src: "frasi", type: "tiles",
      prompt: "Armá la frase en italiano",
      stem: f.es,
      tiles: shuffle(own.concat(extra)),
      answer: f.it, accept: [f.it], note: f.note
    };
  }

  function listenItem(f) {
    var used = {};
    used[f.es] = true;
    var others = shuffle(ALL).filter(function (g) {
      if (used[g.es]) return false;
      used[g.es] = true;
      return true;
    });
    var near = others.filter(function (g) { return g.scene === f.scene; }).slice(0, 2);
    var far = others.filter(function (g) { return g.scene !== f.scene; }).slice(0, 1);
    return {
      id: f.id, frase: f, src: "frasi", type: "listen",
      prompt: "Escuchá: ¿qué significa?",
      stem: f.it,
      options: shuffle([f.es].concat(near.map(function (g) { return g.es; }),
                                     far.map(function (g) { return g.es; }))),
      answer: f.es, accept: [f.es], note: f.note
    };
  }

  function writeItem(f) {
    return {
      id: f.id, frase: f, src: "frasi", type: "write",
      prompt: "Escribilo en italiano (los acentos no cuentan)",
      stem: f.es,
      answer: f.it, accept: [f.it], note: f.note
    };
  }

  function flashItem(f) {
    return {
      id: f.id, frase: f, src: "frasi", type: "flash",
      prompt: "¿Cómo se dice? Pensalo y tocá para ver",
      stem: f.es,
      answer: f.it, accept: [f.it], note: f.note
    };
  }

  /* Cloze in contesto: la frase intera, una parola da ricordare.  Recuperare
     una parola dentro il suo blocco la lega al blocco (Nation 2013). */
  var STOP = ["sono", "come", "questo", "questa", "della", "nella", "alla", "anche",
              "però", "perché", "molto", "sempre", "ancora"];

  function clozeItem(f) {
    var toks = tiles(f.it);
    var cands = [];
    toks.forEach(function (t, i) {
      var core = t.replace(/^[^A-Za-zÀ-ÿ]+|[^A-Za-zÀ-ÿ]+$/g, "");
      if (core.length >= 3 && core.indexOf("'") < 0 && /^[A-Za-zÀ-ÿ]+$/.test(core) &&
          STOP.indexOf(core.toLowerCase()) < 0) cands.push({ i: i, core: core });
    });
    if (!cands.length) return tilesItem(f);
    var c = cands[Math.floor(Math.random() * cands.length)];
    var stem = toks.map(function (t, i) {
      return i === c.i ? t.replace(c.core, "___") : t;
    }).join(" ");
    return {
      id: f.id, frase: f, src: "frasi", type: "cloze",
      prompt: "Completá la frase: «" + f.es + "»",
      stem: stem,
      answer: c.core, accept: [c.core], note: f.note
    };
  }

  /* Dettato: ascoltare e scrivere unisce suono e grafia. */
  function dictationItem(f) {
    return {
      id: f.id, frase: f, src: "frasi", type: "dictation",
      prompt: "Dettato: escuchá y escribí lo que oís",
      stem: f.it,
      answer: f.it, accept: [f.it], note: f.note
    };
  }

  /* Pretest: provare a indovinare prima di vedere la risposta migliora il
     ricordo, anche quando si sbaglia (Kornell, Hays & Bjork 2009; Richland,
     Kornell & Kao 2009).  Non costa vite né entra nel ripasso. */
  function guessItem(f) {
    var used = {};
    used[f.it] = true;
    var others = shuffle(ALL.filter(function (g) { return g.scene === f.scene; }))
      .concat(shuffle(ALL))
      .filter(function (g) {
        if (used[g.it]) return false;
        used[g.it] = true;
        return true;
      }).slice(0, 2);
    return {
      id: f.id, frase: f, src: "frasi", type: "guess",
      prompt: "Adiviná antes de aprenderla (no pasa nada si le errás)",
      stem: f.es,
      options: shuffle([f.it].concat(others.map(function (g) { return g.it; }))),
      answer: f.it, accept: [f.it], note: f.note
    };
  }

  function pickItem(f, opts) {
    opts = opts || {};
    // Known phrases are asked to be produced more often than recognised:
    // recall is what makes you fast when you talk.
    // Desirable difficulty (Bjork 1994): a phrase seen for the first time is
    // recognised (tiles); once it is known, it has to be produced.
    var kinds = opts.silent ? ["tiles", "cloze", "flash", "write", "write"]
                            : ["tiles", "cloze", "listen", "dictation", "flash", "write", "write"];
    if (opts.fresh) kinds = ["tiles", "tiles", "cloze"];
    var k = kinds[Math.floor(Math.random() * kinds.length)];
    return k === "tiles" ? tilesItem(f) : k === "listen" ? listenItem(f)
         : k === "write" ? writeItem(f) : k === "cloze" ? clozeItem(f)
         : k === "dictation" ? dictationItem(f) : flashItem(f);
  }

  /* Una sessione di scena: prima presenta le frasi nuove, poi le mette alla
     prova con tipi d'esercizio diversi. */
  function sceneSession(sceneId, cards, opts) {
    opts = opts || {};
    var list = ofScene(sceneId);
    var fresh = list.filter(function (f) { return !cards[f.id]; });
    var known = list.filter(function (f) { return cards[f.id]; });
    var newOnes = fresh.slice(0, opts.newCount || 4);
    var out = [];
    newOnes.forEach(function (f, i) {
      // Half of the new phrases are guessed before being shown.
      if (i % 2 === 0) out.push(guessItem(f));
      out.push({ id: f.id, frase: f, src: "frasi", type: "intro",
                 prompt: "Frase nueva", stem: f.it, answer: f.it, note: f.note });
    });
    var isNew = {};
    newOnes.forEach(function (f) { isNew[f.id] = true; });
    var drill = newOnes.concat(shuffle(known).slice(0, Math.max(0, 8 - newOnes.length)));
    shuffle(drill).forEach(function (f) {
      out.push(pickItem(f, { silent: opts.silent, fresh: isNew[f.id] }));
    });
    // Chiudere scrivendo le nuove a memoria, perché restino.
    newOnes.slice(0, 2).forEach(function (f) { out.push(writeItem(f)); });
    return out;
  }

  // How many phrases of a scene have been seen at least once.
  function progress(sceneId, cards) {
    var list = ofScene(sceneId), seen = 0, strong = 0;
    list.forEach(function (f) {
      var c = cards[f.id];
      if (c) { seen++; if (c.interval >= 3) strong++; }
    });
    return { total: list.length, seen: seen, strong: strong };
  }

  // Phrase of the day: same for the whole calendar day.
  function ofTheDay(d) {
    d = d || new Date();
    var n = d.getFullYear() * 400 + d.getMonth() * 31 + d.getDate();
    return ALL[(n * 7919) % ALL.length];
  }

  var api = {
    SCENES: SCENES,
    ALL: ALL,
    BY_ID: BY_ID,
    scene: scene,
    ofScene: ofScene,
    tiles: tiles,
    tileWords: tileWords,
    PROPER: PROPER,
    words: words,
    compare: compare,
    gradeWritten: gradeWritten,
    tilesItem: tilesItem,
    listenItem: listenItem,
    writeItem: writeItem,
    clozeItem: clozeItem,
    dictationItem: dictationItem,
    guessItem: guessItem,
    flashItem: flashItem,
    pickItem: pickItem,
    sceneSession: sceneSession,
    progress: progress,
    ofTheDay: ofTheDay
  };

  if (typeof module === "object" && module.exports) module.exports = api;
  else root.Frasi = api;
})(typeof window !== "undefined" ? window : globalThis);
