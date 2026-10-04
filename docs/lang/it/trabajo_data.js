/*
 * «Per il lavoro»: la ruta de escenas de oficina (js/trabajo.js, auditorias/
 * PLAN.md 1.4).  Martín, ingeniero de Rosario recién llegado a una empresa
 * de Milán, y su equipo: Giulia Ferri (la responsabile del progetto), Luca
 * (sistemas), Sara (compras); afuera, el dottor Bianchi (un cliente) y la
 * signora Conti (de un proveedor).  Una escena por situación, enganchada a
 * la semana cuya gramática usa.
 *
 * Cada escena: id («t-…»), week, level (el de la semana), emoji, name,
 * blurb, grammar y situazione (en castellano); dialogo [[quién, italiano,
 * castellano]]; gloss {palabra del diálogo: glosa}; phrases [[italiano,
 * castellano, nota (la construcción), registro f|n|c|e]] (Frasi las carga
 * como «frase:<escena>:<n>»); items (producción: translate, cloze, typed,
 * fixerr; vuelven al repaso como «trab:<escena>:<n>», por posición: no
 * insertar en el medio); compito {genre mail|messaggio, title, min, max, t,
 * punti, model}.
 * Controles: tools/lib/test_trabajo.js (la forma) y tools/it/check_trabajo.py
 * (la gramática y las palabras, contra el curso).
 */
window.TRABAJO_DATA = {
  label: "Per il lavoro",
  blurb: "Escenas de oficina en italiano, desde el A2: presentarte en una reunión, la charla del café, llamadas y videollamadas, mails formales, opinar, presentar resultados, quejarte con cortesía, negociar plazos y coordinar un equipo. Cada una con su diálogo, las frases que se usan, ejercicios para escribirlas y un mail o un mensaje de verdad.",
  SCENES: [
    { id: "t-presentarsi", week: 8, level: "A2", emoji: "🤝", name: "Presentarsi in riunione",
      blurb: "Presentarte al equipo, decir qué hacés y preguntar quién hace qué.",
      grammar: "El presente, las preguntas y el usted (*Lei*)",
      situazione: "Primer día de Martín en una empresa de Milán: la reunión de las nueve con el equipo del proyecto. La jefa lo trata de usted; los colegas, de vos.",
      dialogo: [
        ["Giulia", "Buongiorno a tutti! Oggi nel gruppo c'è una persona nuova.", "¡Buen día a todos! Hoy hay una persona nueva en el equipo."],
        ["Giulia", "Martín, vuole presentarsi?", "Martín, ¿quiere presentarse?"],
        ["Martín", "Certo. Buongiorno, sono Martín Pereyra. Sono argentino, di Rosario.", "Claro. Buen día, soy Martín Pereyra. Soy argentino, de Rosario."],
        ["Martín", "Sono ingegnere e lavoro nel reparto tecnico, con Luca.", "Soy ingeniero y trabajo en el sector técnico, con Luca."],
        ["Luca", "Benvenuto! Io sono Luca. E con chi lavori, esattamente?", "¡Bienvenido! Yo soy Luca. ¿Y con quién trabajás, exactamente?"],
        ["Martín", "Lavoro con i clienti del Sud America: controllo i dati e preparo i rapporti.", "Trabajo con los clientes de Sudamérica: controlo los datos y preparo los informes."],
        ["Sara", "Piacere, Martín. Io sono Sara, dell'ufficio acquisti. Da quanto tempo sei in Italia?", "Mucho gusto, Martín. Yo soy Sara, de compras. ¿Hace cuánto que estás en Italia?"],
        ["Martín", "Sono in Italia da tre mesi. Studio italiano tutti i giorni.", "Estoy en Italia hace tres meses. Estudio italiano todos los días."],
        ["Giulia", "Bene. La riunione è ogni lunedì alle nove. Ci sono domande?", "Bien. La reunión es todos los lunes a las nueve. ¿Hay preguntas?"],
        ["Martín", "Sì, una domanda: a chi devo scrivere per l'accesso al sistema?", "Sí, una pregunta: ¿a quién le tengo que escribir para el acceso al sistema?"],
        ["Giulia", "A Luca: è lui il responsabile del sistema.", "A Luca: él es el responsable del sistema."],
        ["Luca", "Sì, dopo la riunione parliamo. Benvenuto nel gruppo!", "Sí, después de la reunión hablamos. ¡Bienvenido al equipo!"]
      ],
      gloss: {"reparto": "sector, departamento", "acquisti": "compras", "rapporti": "informes", "accesso": "acceso", "responsabile": "responsable, encargado"},
      phrases: [
        ["Buongiorno a tutti, sono Martín Pereyra.", "Buen día a todos, soy Martín Pereyra.", "Para presentarte en una reunión alcanza con *sono* + nombre y apellido. *A tutti* = a todos: el saludo a un grupo. *Mi chiamo* también vale, pero en el trabajo se oye más *sono*.", "n"],
        ["Sono ingegnere.", "Soy ingeniero.", "La profesión con *essere* va sin artículo, como en español: *sono ingegnere*, *è avvocato*. Con *fare* lleva artículo: *faccio l'ingegnere*. Con un adjetivo vuelve el artículo: *sono un ingegnere esperto*.", "n"],
        ["Lavoro nel reparto tecnico.", "Trabajo en el sector técnico.", "*Nel* = *in* + *il*: el sector y la oficina van con *in* + artículo: *nel reparto vendite*, *nell'ufficio acquisti*. *Reparto* es el sector o departamento de una empresa.", "n"],
        ["Lavoro con i clienti del Sud America.", "Trabajo con los clientes de Sudamérica.", "*Del* = *di* + *il*. Para decir qué hacés, el italiano prefiere un verbo concreto: *lavoro con*, *controllo*, *preparo*. *Cliente* es masculino y femenino: *il cliente*, *la cliente*.", "n"],
        ["Piacere, sono Sara, dell'ufficio acquisti.", "Mucho gusto, soy Sara, de compras.", "*Dell'* = *di* + *l'*: de qué oficina sos. Donde decimos «el área de compras», el italiano dice «la oficina»: *ufficio acquisti*, *ufficio vendite*, *ufficio del personale* (recursos humanos).", "n"],
        ["In che reparto lavora?", "¿En qué sector trabaja (usted)?", "Con usted (*Lei*), el verbo va en tercera persona: *lavora*. *In che* + sustantivo = ¿en qué…?: *in che ufficio?*, *in che città?*. A un colega que tuteás: *in che reparto lavori?*", "f"],
        ["Da quanto tempo lavori qui?", "¿Hace cuánto que trabajás acá?", "*Da quanto tempo* + presente, para lo que empezó y sigue. Se contesta igual: *lavoro qui da due anni*. Nada de «hace»: *fa* es solo para lo terminado.", "n"],
        ["Sono in Italia da tre mesi.", "Estoy en Italia hace tres meses.", "*Da* + tiempo con presente = desde hace. Estar en un lugar es *essere*: *sono in Italia*, *sono in ufficio*; *stare* es para el ánimo (*sto bene*).", "n"],
        ["Qual è la Sua email?", "¿Cuál es su correo (de usted)?", "*Qual è* va sin apóstrofo: *qual* ya es una palabra completa. *Sua* con mayúscula = de usted, en lo escrito formal. Se dice *l'email* o *la mail*: las dos valen.", "f"],
        ["A chi devo scrivere per l'accesso?", "¿A quién le tengo que escribir para el acceso?", "*A chi* = a quién: la preposición va adelante, como en español. *Dovere* + infinitivo, sin «que»: *devo scrivere* = tengo que escribir.", "n"],
        ["La riunione è ogni lunedì alle nove.", "La reunión es todos los lunes a las nueve.", "*Ogni* + singular = todos los…: *ogni lunedì*, *ogni mattina*; *ogni* no cambia nunca. La hora va con *alle* (*a* + *le*): *alle nove*; la una, *all'una*.", "n"],
        ["Benvenuto nel gruppo!", "¡Bienvenido al equipo!", "*Benvenuto* concuerda: *benvenuta* a una mujer, *benvenuti* a varios. El italiano da la bienvenida «en» (*nel gruppo*, *in Italia*), no «a». *Gruppo* o *team* es el equipo de trabajo; *squadra*, más de deporte.", "n"]
      ],
      items: [
        {"type": "translate", "prompt": "Traducí al italiano.", "stem": "Trabajo en compras.", "answer": "Lavoro nell'ufficio acquisti.", "accept": ["Lavoro all'ufficio acquisti.", "Lavoro nel reparto acquisti.", "Io lavoro nell'ufficio acquisti."], "note": "La oficina va con *in* + artículo: *nell'ufficio acquisti* (*in* + *l'*). Compras = *acquisti*, en plural."},
        {"type": "cloze", "prompt": "Completá: «Estoy en Italia hace tres meses».", "stem": "Sono in Italia ___ tre mesi.", "answer": "da", "accept": [], "note": "Lo que empezó y sigue: presente + *da* + tiempo. *Fa* es para lo terminado: *sono arrivato tre mesi fa*."},
        {"type": "typed", "prompt": "Es la jefa de otro sector: pasá la pregunta al usted (*Lei*).", "stem": "In che reparto lavori? → In che reparto ___?", "answer": "lavora", "accept": [], "note": "El usted italiano conjuga en tercera persona, como «ella»: *lavora*, *è*, *ha*."},
        {"type": "translate", "prompt": "Traducí al italiano.", "stem": "Soy ingeniera.", "answer": "Sono ingegnere.", "accept": ["Sono ingegnera.", "Faccio l'ingegnere.", "Io sono ingegnere."], "note": "La profesión con *essere* va sin artículo: *sono ingegnere*. Con *fare*, con artículo: *faccio l'ingegnere*. *Ingegnera* también se usa hoy."},
        {"type": "translate", "prompt": "Traducí al italiano.", "stem": "¿A quién le tengo que escribir?", "answer": "A chi devo scrivere?", "accept": ["A chi devo scrivere io?"], "note": "*A chi* abre la pregunta; *devo* + infinitivo, sin «que». El «le» del español no se traduce: *a chi* ya dice a quién."},
        {"type": "fixerr", "prompt": "Trova l'errore: tocá la palabra que está mal y corregila.", "stem": "Sto in Italia da tre mesi.", "bad": "Sto", "good": "Sono", "answer": "Sono in Italia da tre mesi.", "accept": [], "note": "Estar en un lugar es *essere*: *sono in Italia*, *sono in ufficio*. *Stare* es para cómo estás (*sto bene*)."}
      ],
      compito: { genre: "messaggio", title: "Presentati al gruppo", min: 40, max: 70,
        t: "Escribí en el chat de la empresa un mensaje al equipo nuevo: presentate (nombre, de dónde sos, qué hacés y en qué sector) y hacé una pregunta de trabajo.",
        punti: ["Un saludo al grupo", "Tu nombre y de dónde sos", "Tu trabajo y tu sector", "Desde cuándo estás", "Una pregunta (*a chi…?*, *quando…?*)", "Una despedida"],
        model: "Buongiorno a tutti! Sono Martín Pereyra, sono argentino, di Rosario. Sono ingegnere e da oggi lavoro nel reparto tecnico, con Luca: controllo i dati dei clienti del Sud America. Sono in Italia da tre mesi. Una domanda: a chi devo scrivere per l'accesso al sistema? Grazie e a presto!" } },

    { id: "t-videochiamata", week: 19, level: "B1", emoji: "💻", name: "In videochiamata",
      blurb: "Arrancar una videollamada, resolver el audio y la pantalla, y cerrar con los próximos pasos.",
      grammar: "El futuro (*manderò*, *avremo*, *ci sentiremo*) y el futuro de suposición (*sarà la connessione*)",
      situazione: "Videollamada con el dottor Bianchi, cliente de la empresa. Giulia abre, Martín presenta los datos de ventas; Luca llega tarde y el audio del cliente se corta.",
      dialogo: [
        ["Giulia", "Buongiorno a tutti! Mi sentite? Dottor Bianchi, ci sente bene?", "¡Buen día a todos! ¿Me escuchan? Doctor Bianchi, ¿nos escucha bien?"],
        ["Bianchi", "Buongiorno! Sì, vi sento bene. Ma il vostro collega dei sistemi non c'è?", "¡Buen día! Sí, los escucho bien. ¿Pero el colega de sistemas no está?"],
        ["Giulia", "Luca? Sarà ancora in un'altra riunione: arriverà tra poco. Intanto comincia Martín.", "¿Luca? Debe estar todavía en otra reunión: va a llegar en un rato. Mientras tanto, empieza Martín."],
        ["Martín", "Buongiorno, dottore. Condivido lo schermo… Ecco: vedete il mio schermo?", "Buen día, doctor. Comparto pantalla… Listo: ¿ven mi pantalla?"],
        ["Bianchi", "Sì, vedo la tabella delle vendite.", "Sí, veo la tabla de ventas."],
        ["Martín", "Bene. Come vedete, in Cile le vendite sono cresciute del dodici per cento, e in Argentina… Pronto? Dottore, ci sente?", "Bien. Como ven, en Chile las ventas crecieron un doce por ciento, y en Argentina… ¿Hola? Doctor, ¿nos escucha?"],
        ["Luca", "Buongiorno a tutti, eccomi. Dottore, ha il microfono spento.", "Buen día a todos, acá estoy. Doctor, tiene el micrófono apagado."],
        ["Bianchi", "Ah, ecco. Scusate, è saltato l'audio. Sarà la connessione: oggi va malissimo. Dove eravamo?", "Ah, ahí está. Perdón, se cortó el audio. Debe ser la conexión: hoy anda pésimo. ¿En qué estábamos?"],
        ["Martín", "Riprendo da dove ci siamo fermati: in Argentina le vendite sono stabili.", "Retomo desde donde quedamos: en Argentina las ventas están estables."],
        ["Bianchi", "Molto bene. E quando avremo i dati definitivi?", "Muy bien. ¿Y cuándo vamos a tener los datos definitivos?"],
        ["Martín", "Le manderò il rapporto completo entro venerdì.", "Le voy a mandar el informe completo antes del viernes."],
        ["Giulia", "E io vi manderò l'invito per la prossima chiamata. Ci sentiremo martedì alle dieci, va bene?", "Y yo les voy a mandar la invitación para la próxima llamada. Hablamos el martes a las diez, ¿le parece?"],
        ["Bianchi", "Perfetto. Allora a martedì, e buon lavoro a tutti!", "Perfecto. Entonces hasta el martes, ¡y buen trabajo a todos!"]
      ],
      gloss: {"condivido": "comparto (de *condividere*)", "schermo": "pantalla", "vendite": "ventas", "cresciute": "crecido (de *crescere*)", "microfono": "micrófono", "spento": "apagado (de *spegnere*)", "è saltato": "se cortó (de *saltare*)", "connessione": "conexión", "stabili": "estables", "definitivi": "definitivos", "invito": "invitación", "chiamata": "llamada"},
      phrases: [
        ["Mi sentite?", "¿Me escuchan?", "Para el sonido, el italiano usa *sentire* (oír), no *ascoltare* (escuchar con atención): *mi senti?*, *non ti sento*. *Sentite* es de *voi*, a varios. Patrón: a un cliente de usted, *mi sente?*", "n"],
        ["Dottore, ha il microfono spento.", "Doctor, tiene el micrófono apagado.", "Apagado = *spento*, participio de *spegnere*; prendido = *acceso*. *Dottore* solo, sin apellido, es la forma de dirigirse a alguien: sin artículo. Con apellido se corta: *dottor Bianchi*.", "f"],
        ["Condivido lo schermo.", "Comparto pantalla.", "*Condividere* = compartir. Lleva artículo, donde decimos «comparto pantalla» sin nada: *condivido lo schermo*. *Lo* porque *sch-* es *s* + consonante. Patrón: *condivido il file*, *condivido la presentazione*.", "n"],
        ["Vedete il mio schermo?", "¿Ven mi pantalla?", "El posesivo lleva artículo: *il mio schermo*, donde decimos «mi pantalla». Sin artículo solo van los familiares en singular (*mio padre*). A un cliente de usted: *vede il mio schermo?*", "n"],
        ["È saltato l'audio.", "Se cortó el audio.", "*Saltare* (saltar) = cortarse algo que andaba. Va con *essere* y concuerda: *è saltata la connessione*; *è saltata la riunione* = se suspendió la reunión. Sin «se»: el italiano no lo pone acá.", "n"],
        ["Sarà la connessione.", "Debe ser la conexión.", "Futuro de suposición: *sarà* = debe ser. Nuestro «será» de duda existe, pero el italiano lo usa todo el tiempo para lo que suponés en el presente. Patrón: *saranno le dieci*, *sarà in riunione*.", "n"],
        ["Dove eravamo?", "¿En qué estábamos?", "Para retomar después de un corte: *dove* (dónde) donde decimos «en qué», con el imperfecto *eravamo*. También se oye *a che punto eravamo?*. Sirve en cualquier charla interrumpida.", "n"],
        ["Riprendo da dove ci siamo fermati.", "Retomo desde donde quedamos.", "*Riprendere* = retomar. Donde decimos «quedamos», el italiano dice «nos detuvimos»: *fermarsi*, con *essere* en el pasado (*ci siamo fermati*). *Da dove* = desde donde.", "n"],
        ["Le manderò il rapporto entro venerdì.", "Le voy a mandar el informe antes del viernes.", "Donde decimos «voy a mandar», el italiano usa el futuro: *manderò* (en los verbos en *-are* la *a* pasa a *e*: *mander-*). *Le* = a usted. *Entro* = a más tardar, no «entre».", "f"],
        ["Vi manderò l'invito per la prossima chiamata.", "Les voy a mandar la invitación para la próxima llamada.", "*Vi* = a ustedes. *L'invito* es masculino: la invitación, también la del calendario. *Chiamata* = llamada; la de video, *videochiamata*. *Prossimo* va antes del sustantivo: *la prossima volta*.", "n"],
        ["Ci sentiremo martedì alle dieci.", "Hablamos el martes a las diez.", "*Sentirsi* = hablar a distancia (llamada, mensaje); en persona es *vedersi*. El futuro deja fijada la próxima. Un día concreto va sin artículo: *martedì*; *il martedì* = todos los martes.", "n"],
        ["Quando avremo i dati definitivi?", "¿Cuándo vamos a tener los datos definitivos?", "Futuro de *avere*, que pierde la *e*: *avrò, avrai, avrà, avremo, avrete, avranno*. El italiano no tiene «ir a» + infinitivo para el futuro: nada de *vado a avere*.", "n"]
      ],
      items: [
        {"type": "translate", "prompt": "Traducí al italiano (le hablás al equipo).", "stem": "¿Me escuchan?", "answer": "Mi sentite?", "accept": ["Mi sentite bene?"], "note": "Para el sonido se usa *sentire*, no *ascoltare*: *ascoltare* es escuchar con atención (*ascoltare la musica*)."},
        {"type": "translate", "prompt": "Traducí al italiano.", "stem": "Debe ser la conexión.", "answer": "Sarà la connessione.", "accept": ["Sarà un problema di connessione."], "note": "Para suponer algo del presente, el italiano usa el futuro: *sarà* = debe ser."},
        {"type": "translate", "prompt": "Traducí al italiano (al cliente, de usted).", "stem": "Le voy a mandar el informe antes del viernes.", "answer": "Le manderò il rapporto entro venerdì.", "accept": ["Le mando il rapporto entro venerdì.", "Le invierò il rapporto entro venerdì.", "Le manderò il rapporto prima di venerdì."], "note": "«Voy a» + infinitivo se dice con el futuro: *manderò*. *Entro venerdì* = a más tardar el viernes."},
        {"type": "cloze", "prompt": "Completá: «Hablamos el martes a las diez».", "stem": "Ci ___ martedì alle dieci.", "answer": "sentiremo", "accept": ["sentiamo"], "note": "*Sentirsi* = hablar por teléfono o por mensaje. El futuro *ci sentiremo* fija la próxima llamada; el presente *ci sentiamo* también vale."},
        {"type": "typed", "prompt": "Pasalo al futuro.", "stem": "Domani vi mando l'invito. → Domani vi ___ l'invito.", "answer": "manderò", "accept": [], "note": "En los verbos en *-are* el futuro cambia la *a* por *e*: *mandare* → *manderò*, *parlare* → *parlerò*."},
        {"type": "fixerr", "prompt": "Trova l'errore: tocá la palabra que está mal y corregila.", "stem": "Le mandarò il rapporto entro venerdì.", "bad": "mandarò", "good": "manderò", "answer": "Le manderò il rapporto entro venerdì.", "accept": [], "note": "El futuro de los verbos en *-are* va con *e*: *manderò*, no *mandarò*. Es el error clásico del hispanohablante, que copia el «mandaré»."}
      ],
      compito: { genre: "mail", title: "Dopo la videochiamata", min: 60, max: 100,
        t: "Escribile al dottor Bianchi un mail breve después de la videollamada: agradecele, resumí los próximos pasos (quién va a hacer qué) y confirmá la fecha y la hora de la próxima llamada.",
        punti: ["Un saludo formal (*Gentile dottor…*)", "Un agradecimiento por la llamada", "Al menos dos próximos pasos en futuro (*manderò*, *controllerà*…)", "El día y la hora de la próxima llamada (*ci sentiremo…*)", "Mayúscula de cortesía (*Le*, *La*) en todo el mail", "Un cierre formal y tu firma"],
        model: "Gentile dottor Bianchi,\n\nLa ringrazio per la videochiamata di oggi. Le scrivo con i prossimi passi: io Le manderò il rapporto completo con i dati definitivi entro venerdì; il mio collega Luca controllerà il problema della connessione; Giulia Ferri Le manderà l'invito per la prossima chiamata. Ci sentiremo martedì 14 alle dieci. Se avrà domande prima, potrà scrivermi quando vuole.\n\nCordiali saluti,\nMartín Pereyra" } },

    { id: "t-telefono", week: 24, level: "B1", emoji: "📞", name: "Al telefono",
      blurb: "Hacer y atender llamadas formales: pedir por alguien, deletrear, pedir que repitan y tomar un recado.",
      grammar: "El congiuntivo presente en el imperativo de usted (*mi dica*, *attenda*, *resti*, *scusi*, *le dica che mi richiami*) y el condicional de cortesía (*vorrei parlare con…*)",
      situazione: "Martín llama a la ditta Conti Forniture para hablar con la signora Conti sobre un pedido. Más tarde suena el teléfono de la oficina: es el dottor Bianchi, un cliente, que busca a Giulia.",
      dialogo: [
        ["Centralinista", "Conti Forniture, buongiorno, mi dica.", "Conti Forniture, buen día, dígame."],
        ["Martín", "Buongiorno, sono Martín Pereyra, dell'ufficio tecnico. Vorrei parlare con la signora Conti, per cortesia.", "Buen día, habla Martín Pereyra, del sector técnico. Quisiera hablar con la señora Conti, por favor."],
        ["Centralinista", "Attenda un attimo, resti in linea… Mi dispiace, è in riunione. Vuole lasciare un messaggio?", "Espere un momento, no corte… Lo siento, está en una reunión. ¿Quiere dejarle un mensaje?"],
        ["Martín", "Sì, grazie. Le può dire che ho chiamato per l'ordine 418?", "Sí, gracias. ¿Le puede decir que llamé por el pedido 418?"],
        ["Centralinista", "Certo. Mi scusi, come si scrive il cognome?", "Claro. Disculpe, ¿cómo se escribe el apellido?"],
        ["Martín", "Pereyra: P come Palermo, E come Empoli, R come Roma, E come Empoli, Y come York, R come Roma, A come Ancona.", "Pereyra: P de Palermo, E de Empoli, R de Roma, E de Empoli, Y de York, R de Roma, A de Ancona."],
        ["Centralinista", "Perfetto. La faccio richiamare appena possibile. Buona giornata!", "Perfecto. Le digo que lo llame apenas pueda. ¡Que tenga buen día!"],
        ["Martín", "Ufficio tecnico, buongiorno, sono Martín Pereyra.", "Sector técnico, buen día, habla Martín Pereyra."],
        ["Bianchi", "Buongiorno, sono Roberto Bianchi, della Edilnova. Cercavo la dottoressa Ferri.", "Buen día, habla Roberto Bianchi, de Edilnova. Buscaba a la doctora Ferri."],
        ["Martín", "Mi dispiace, oggi è fuori ufficio fino alle tre. Posso esserle utile io?", "Lo siento, hoy está fuera de la oficina hasta las tres. ¿Lo puedo ayudar yo?"],
        ["Bianchi", "Sì, le dica che la consegna di venerdì è in ritardo e che mi richiami entro stasera, al tre tre tre, quattro cinque sei, sette otto nove zero.", "Sí, dígale que la entrega del viernes está atrasada y que me llame antes de esta noche, al tres tres tres, cuatro cinco seis, siete ocho nueve cero."],
        ["Martín", "Scusi, la linea è disturbata: può ripetere il numero?", "Disculpe, se escucha mal: ¿me repite el número?"],
        ["Bianchi", "Certo: tre tre tre, quattro cinque sei, sette otto nove zero. Grazie, molto gentile.", "Claro: tres tres tres, cuatro cinco seis, siete ocho nueve cero. Gracias, muy amable."],
        ["Martín", "Allora: la consegna di venerdì e richiamarla entro stasera. Riferisco senz'altro. Arrivederci!", "Entonces: la entrega del viernes y llamarlo antes de esta noche. Le paso el mensaje sin falta. ¡Hasta luego!"]
      ],
      gloss: {"centralinista": "telefonista, recepcionista", "attimo": "momento", "in linea": "en línea, sin cortar", "ordine": "pedido", "cognome": "apellido", "fuori ufficio": "fuera de la oficina", "consegna": "entrega", "in ritardo": "atrasado", "richiamare": "volver a llamar", "disturbata": "con interferencia (se escucha mal)", "riferisco": "paso el mensaje (de *riferire*)", "senz'altro": "sin falta, seguro"},
      phrases: [
        ["Conti Forniture, buongiorno, mi dica.", "Conti Forniture, buen día, dígame.", "Así se atiende en una oficina: nombre de la empresa (o del sector) + saludo + *mi dica*. *Dica* es el congiuntivo de *dire*: el imperativo de usted siempre sale del congiuntivo. Con alguien que tuteás: *dimmi*.", "f"],
        ["Buongiorno, sono Roberto Bianchi, della Edilnova.", "Buen día, habla Roberto Bianchi, de Edilnova.", "Al teléfono no se dice «habla»: *sono* + nombre. La empresa va con *della* porque se piensa *la ditta*: *della Conti Forniture*, *della Fiat*. Patrón: *sono X, della ditta Y*.", "f"],
        ["Vorrei parlare con la signora Conti, per cortesia.", "Quisiera hablar con la señora Conti, por favor.", "*Parlare con* (no *a*) para hablar con alguien. *Vorrei* es el condicional de cortesía; *per cortesia* es un *per favore* un poco más formal. *Signora* lleva artículo cuando hablás de ella: *la signora Conti*.", "f"],
        ["Attenda un attimo, resti in linea.", "Espere un momento, no corte.", "*Attenda* y *resti* son congiuntivo: el imperativo de usted (*attendere* → *attenda*, *restare* → *resti*). Ojo: en *-are* la usted termina en *-i*, en *-ere/-ire* en *-a*, al revés que el tú: *resta*, *attendi*.", "f"],
        ["Mi dispiace, è in riunione. Vuole lasciare un messaggio?", "Lo siento, está en una reunión. ¿Quiere dejarle un mensaje?", "*In riunione* va sin artículo, como *in ferie*, *in ufficio*. *Vuole* + infinitivo = ¿quiere…? con usted. También se oye *vuole lasciare detto qualcosa?*", "f"],
        ["Mi scusi, come si scrive il cognome?", "Disculpe, ¿cómo se escribe el apellido?", "*Cognome* = apellido; *nome* = el nombre de pila. *Scusi* es el congiuntivo de *scusare* (usted); *mi scusi* es más cortés todavía. A un colega: *scusa*.", "f"],
        ["P come Palermo, E come Empoli, R come Roma.", "P de Palermo, E de Empoli, R de Roma.", "En Italia se deletrea con ciudades, y se dice *come*, no *di*. Las letras son femeninas: *la erre*; una letra doble es *doppia*: *Ferri, con due erre* o *con la doppia erre*.", "n"],
        ["Scusi, la linea è disturbata: può ripetere?", "Disculpe, se escucha mal: ¿me lo repite?", "*La linea è disturbata* = hay interferencia, se corta. *Può* + infinitivo es el pedido cortés con usted. Para que hable más despacio: *può parlare più lentamente?*", "f"],
        ["La faccio richiamare appena possibile.", "Le digo que lo llame apenas pueda.", "*Fare* + infinitivo = hacer que otro haga algo: *la faccio richiamare* = hago que la llamen a usted. *La* es usted (objeto directo). Patrón: *La faccio contattare*, *Le faccio sapere*.", "f"],
        ["Cercavo la dottoressa Ferri.", "Buscaba a la doctora Ferri.", "El imperfecto de cortesía: *cercavo*, *volevo* suenan más suaves que *cerco*, *voglio*. Y sin *a* delante de la persona: *cerco Giulia*, no «a Giulia».", "f"],
        ["Posso esserle utile io?", "¿Lo puedo ayudar yo?", "*Esserle* = *essere* + *le* (a usted), pegado al infinitivo. Es la oferta cortés de ayuda en la oficina. Con un colega: *posso esserti utile?*", "f"],
        ["Le dica che mi richiami entro stasera.", "Dígale que me llame antes de esta noche.", "*Le dica* = dígale (congiuntivo de *dire*). Un pedido que pasás por otro va con congiuntivo: *dire che* + *richiami*. *Entro* = antes de, a más tardar: *entro stasera*, *entro venerdì*.", "f"]
      ],
      items: [
        {"type": "translate", "prompt": "Traducí al italiano.", "stem": "Quisiera hablar con la señora Conti, por favor.", "answer": "Vorrei parlare con la signora Conti, per cortesia.", "accept": ["Vorrei parlare con la signora Conti, per favore.", "Potrei parlare con la signora Conti, per cortesia?", "Potrei parlare con la signora Conti, per favore?", "Vorrei parlare con la signora Conti per cortesia.", "Vorrei parlare con la signora Conti per favore.", "Buongiorno, vorrei parlare con la signora Conti, per cortesia."], "note": "*Parlare con* (no *a*) y *la signora* con artículo cuando hablás de ella. *Vorrei* o *potrei* son el condicional de cortesía."},
        {"type": "translate", "prompt": "Traducí al italiano (le hablás de usted).", "stem": "Espere un momento, no corte.", "answer": "Attenda un attimo, resti in linea.", "accept": ["Attenda un attimo e resti in linea.", "Aspetti un attimo, resti in linea.", "Attenda un momento, resti in linea.", "Aspetti un momento, resti in linea.", "Attenda un attimo, rimanga in linea.", "Un attimo, resti in linea."], "note": "El imperativo de usted es congiuntivo: *attenda*, *aspetti*, *resti*. «No corte» se dice en positivo: *resti in linea*."},
        {"type": "translate", "prompt": "Traducí al italiano (de usted).", "stem": "¿Quiere dejar un mensaje?", "answer": "Vuole lasciare un messaggio?", "accept": ["Desidera lasciare un messaggio?", "Vuole lasciarle un messaggio?", "Vuole lasciare detto qualcosa?"], "note": "Con usted, tercera persona: *vuole* + infinitivo. *Lasciare un messaggio* = dejar un mensaje."},
        {"type": "typed", "prompt": "Es un cliente, no un colega: pasalo al usted (*Lei*).", "stem": "Dimmi pure. → Mi ___ pure.", "answer": "dica", "accept": [], "note": "El imperativo de usted sale del congiuntivo: *dire* → *dica*. Por eso *mi dica*, *mi scusi*, *attenda*."},
        {"type": "cloze", "prompt": "Completá: «Dígale que me llame antes de esta noche».", "stem": "Le dica che mi ___ entro stasera.", "answer": "richiami", "accept": [], "note": "Un pedido que pasa por otra persona (*dire che*…) va con congiuntivo: *richiamare* → *che mi richiami*."},
        {"type": "fixerr", "prompt": "Trova l'errore: tocá la palabra que está mal y corregila.", "stem": "Buongiorno, parla Martín Pereyra, dell'ufficio tecnico.", "bad": "parla", "good": "sono", "answer": "Buongiorno, sono Martín Pereyra, dell'ufficio tecnico.", "accept": [], "note": "Al teléfono el italiano no dice «habla X»: se presenta con *sono* + nombre."}
      ],
      compito: { genre: "messaggio", title: "Un messaggio per Giulia", min: 60, max: 100,
        t: "Giulia estaba fuera de la oficina y vos atendiste la llamada del dottor Bianchi. Escribile un mensaje por el chat de la empresa con el recado: quién llamó, qué quiere y cómo y cuándo tiene que devolverle el llamado.",
        punti: ["Un saludo", "Quién llamó, de qué empresa y a qué hora", "Qué quiere (el motivo de la llamada)", "Cómo devolverle el llamado: el número y el plazo (*entro…*)", "Qué le dijiste vos o qué podés hacer para ayudar", "Una despedida y tu nombre"],
        model: "Ciao Giulia, verso le undici ti ha cercato il dottor Bianchi, della Edilnova. Dice che la consegna di venerdì è in ritardo e vuole sapere quando arriva il materiale. Chiede che tu lo richiami entro stasera sul cellulare: 333 456 7890. Gli ho detto che eri fuori ufficio fino alle tre e che lo richiami nel pomeriggio. Se vuoi, intanto controllo io i dati dell'ordine. A dopo, Martín" } },

    { id: "t-reclamo", week: 31, level: "B2", emoji: "📦", name: "Un ordine in ritardo",
      blurb: "Reclamarle a un proveedor por un pedido tardío o incompleto sin romper la relación, y pedir una solución.",
      grammar: "El condicional compuesto (*avremmo dovuto*, *avrei preferito*), el futuro visto desde el pasado (*sarebbe arrivato*) y el subjuntivo imperfecto (*ci aspettavamo che arrivasse*)",
      situazione: "El pedido de la ditta Conti Forniture llegó cuatro días tarde y le faltan piezas. Sara, de compras, le avisa a Martín, que llama a la signora Conti: se tratan de usted.",
      dialogo: [
        ["Sara", "Martín, è arrivato l'ordine della ditta Conti, ma con quattro giorni di ritardo. E mancano tre pezzi su dieci.", "Martín, llegó el pedido de la ditta Conti, pero con cuatro días de atraso. Y faltan tres piezas de diez."],
        ["Martín", "Di nuovo? Chiamo subito la signora Conti.", "¿Otra vez? Llamo ya a la signora Conti."],
        ["Conti", "Conti Forniture, buongiorno.", "Conti Forniture, buen día."],
        ["Martín", "Buongiorno, signora Conti, sono Martín Pereyra. La chiamo per l'ordine 418: purtroppo c'è un problema. Avremmo dovuto ricevere la merce lunedì scorso, e invece è arrivata solo oggi.", "Buen día, signora Conti, soy Martín Pereyra. La llamo por el pedido 418: lamentablemente hay un problema. Teníamos que haber recibido la mercadería el lunes pasado, y en cambio llegó recién hoy."],
        ["Conti", "Sì, lo so. Abbiamo avuto qualche difficoltà con il magazzino.", "Sí, ya sé. Tuvimos algunas dificultades con el depósito."],
        ["Martín", "Capisco, ma ci avevate assicurato che sarebbe arrivato tutto entro lunedì. E ci aspettavamo che l'ordine arrivasse completo: mancano tre pezzi su dieci.", "Entiendo, pero nos habían asegurado que iba a llegar todo antes del lunes. Y esperábamos que el pedido llegara completo: faltan tres piezas de diez."],
        ["Conti", "Tre pezzi? Mi dispiace molto, non lo sapevo.", "¿Tres piezas? Lo siento mucho, no lo sabía."],
        ["Martín", "Il ritardo ci ha creato parecchi problemi con un cliente: gli avevamo promesso la consegna per venerdì. Avrei preferito non doverla chiamare per questo.", "El atraso nos causó bastantes problemas con un cliente: le habíamos prometido la entrega para el viernes. Hubiera preferido no tener que llamarla por esto."],
        ["Conti", "Ha ragione. Avrei dovuto avvisarla subito. Mi scuso a nome di tutta la ditta.", "Tiene razón. Tendría que haberle avisado enseguida. Le pido disculpas en nombre de toda la empresa."],
        ["Martín", "Siamo sempre stati soddisfatti della vostra collaborazione, quindi troviamo una soluzione insieme. Le saremmo grati se potesse mandarci i pezzi mancanti entro giovedì.", "Siempre estuvimos conformes con el trabajo con ustedes, así que busquemos una solución juntos. Le agradeceríamos si pudiera mandarnos las piezas que faltan antes del jueves."],
        ["Conti", "Certo. Vi mandiamo i pezzi mancanti con un corriere espresso, a spese nostre: arrivano domani mattina.", "Por supuesto. Les mandamos las piezas que faltan con un servicio de mensajería urgente, a nuestro cargo: llegan mañana a la mañana."],
        ["Martín", "Perfetto, grazie. Le scrivo comunque una mail con i dettagli.", "Perfecto, gracias. De todos modos le escribo un mail con los detalles."],
        ["Conti", "Va bene. E grazie per la pazienza, signor Pereyra.", "Muy bien. Y gracias por la paciencia, señor Pereyra."]
      ],
      gloss: {"ordine": "pedido, orden de compra", "pezzi": "piezas", "merce": "mercadería", "magazzino": "depósito, almacén", "assicurato": "asegurado, garantizado", "consegna": "entrega", "avvisarla": "avisarle", "a nome di": "en nombre de", "soddisfatti": "conformes, satisfechos", "mancanti": "que faltan, faltantes", "corriere espresso": "mensajería urgente", "a spese nostre": "a nuestro cargo, lo pagamos nosotros"},
      phrases: [
        ["Vi scrivo per segnalare un problema con l'ordine 418.", "Les escribo para avisarles de un problema con el pedido 418.", "*Segnalare* = señalar, avisar de algo que anda mal: es el verbo del reclamo educado. *Vi* es «a ustedes», a la empresa. Patrón: *Vi scrivo per segnalare* + el problema.", "e"],
        ["Avremmo dovuto ricevere la merce lunedì scorso.", "Teníamos que haber recibido la mercadería el lunes pasado.", "Lo que tenía que pasar y no pasó: condicional compuesto de *dovere* + infinitivo simple. No «dovremmo aver ricevuto»: el compuesto va en *dovere*. Patrón: *avrei/avremmo dovuto* + infinitivo.", "n"],
        ["Ci avevate assicurato che sarebbe arrivato tutto entro lunedì.", "Nos habían asegurado que iba a llegar todo antes del lunes.", "El futuro visto desde el pasado va en condicional compuesto: *sarebbe arrivato*, nunca «arriverebbe» como nuestro «llegaría». *Entro* = antes de, como máximo para.", "n"],
        ["Ci aspettavamo che l'ordine arrivasse completo.", "Esperábamos que el pedido llegara completo.", "*Aspettarsi che* (esperar algo, contar con algo) pide subjuntivo; con el verbo en pasado, imperfecto: *arrivasse*. Ojo: *aspettare* solo es esperar a alguien; la expectativa es *aspettarsi*.", "n"],
        ["Mancano tre pezzi su dieci.", "Faltan tres piezas de diez.", "La proporción va con *su*: *tre su dieci*, *uno su cinque*. *Mancare* concuerda con lo que falta: *manca un pezzo*, *mancano tre pezzi*.", "n"],
        ["Il ritardo ci ha creato parecchi problemi con un cliente.", "El atraso nos causó bastantes problemas con un cliente.", "*Creare problemi* es la forma de oficina de «causar problemas». *Parecchi* = bastantes, unos cuantos: concuerda (*parecchie difficoltà*). Decir el daño concreto le da peso al reclamo.", "n"],
        ["Avrei preferito non doverla chiamare per questo.", "Hubiera preferido no tener que llamarla por esto.", "Condicional compuesto para un deseo que ya no se cumplió: *avrei preferito*, no «avessi preferito» como «hubiera». El pronombre se pega a *dover*, que pierde la *-e*: *doverla chiamare*.", "f"],
        ["Le saremmo grati se potesse mandarci i pezzi mancanti entro giovedì.", "Le agradeceríamos si pudiera mandarnos las piezas que faltan antes del jueves.", "El pedido más cortés: *Le saremmo grati se* + subjuntivo imperfecto (*potesse*). *Grato* concuerda: *grato*, *grata*, *grati*. Patrón: *Le sarei grato se potesse* + infinitivo.", "f"],
        ["Mi scuso a nome di tutta la ditta.", "Le pido disculpas en nombre de toda la empresa.", "*Scusarsi* es pedir disculpas uno mismo: *mi scuso*, *ci scusiamo*. *A nome di* = en nombre de. *Ditta* es la empresa chica o mediana; la grande es *l'azienda*.", "f"],
        ["Avrei dovuto avvisarla subito, ha ragione.", "Tendría que haberle avisado enseguida, tiene razón.", "Lo que debería haber hecho uno: *avrei dovuto* + infinitivo. *Avvisare* lleva objeto directo: *avvisarla* (a usted), no «avvisarle». Admitir así el error desarma el reclamo.", "f"],
        ["Vi mandiamo i pezzi mancanti con un corriere espresso, a spese nostre.", "Les mandamos las piezas que faltan con mensajería urgente, a nuestro cargo.", "*Corriere* es la empresa de envíos; *espresso*, el envío rápido. *A spese nostre* = lo pagamos nosotros; también *a nostro carico*. *Mancanti* = que faltan.", "n"],
        ["Siamo sempre stati soddisfatti della vostra collaborazione.", "Siempre estuvimos conformes con el trabajo con ustedes.", "La frase que salva la relación: va antes de pedir la solución. *Soddisfatto di* = conforme con. *Sempre* va entre auxiliar y participio: *siamo sempre stati*.", "f"]
      ],
      items: [
        {"type": "translate", "prompt": "Traducí al italiano.", "stem": "Teníamos que haber recibido la mercadería el lunes.", "answer": "Avremmo dovuto ricevere la merce lunedì.", "accept": ["Dovevamo ricevere la merce lunedì.", "La merce avremmo dovuto riceverla lunedì.", "Avremmo dovuto ricevere la merce lunedì scorso."], "note": "Lo que tenía que pasar y no pasó: *avremmo dovuto* + infinitivo simple. En la charla también se oye *dovevamo ricevere*."},
        {"type": "cloze", "prompt": "Completá: «Esperábamos que el pedido llegara completo».", "stem": "Ci aspettavamo che l'ordine ___ completo.", "answer": "arrivasse", "accept": [], "note": "*Aspettarsi che* pide subjuntivo; con el verbo principal en pasado, imperfecto: *arrivasse*."},
        {"type": "fixerr", "prompt": "Trova l'errore: tocá la palabra que está mal y corregila.", "stem": "Ci avevate assicurato che la merce arriverebbe entro lunedì.", "bad": "arriverebbe", "good": "sarebbe arrivata", "answer": "Ci avevate assicurato che la merce sarebbe arrivata entro lunedì.", "accept": [], "note": "El futuro visto desde el pasado va en condicional compuesto: *sarebbe arrivata*. Nuestro «llegaría» en italiano es *sarebbe arrivata*, y concuerda con *la merce*."},
        {"type": "translate", "prompt": "Traducí al italiano (es un mail formal).", "stem": "Le agradeceríamos si pudiera mandarnos las piezas que faltan.", "answer": "Le saremmo grati se potesse mandarci i pezzi mancanti.", "accept": ["Le saremmo grati se ci potesse mandare i pezzi mancanti.", "Le saremmo grati se potesse inviarci i pezzi mancanti.", "Le saremmo grati se ci potesse inviare i pezzi mancanti.", "Le saremmo grati se potesse mandarci i pezzi che mancano.", "Le saremmo molto grati se potesse mandarci i pezzi mancanti."], "note": "*Le saremmo grati se* + subjuntivo imperfecto: *potesse*, nunca el condicional después de *se*. *Grati* concuerda con «nosotros»."},
        {"type": "typed", "prompt": "Ya es tarde: pasalo a lo que tendrías que haber hecho.", "stem": "Devo avvisarla subito. → ___ avvisarla subito.", "answer": "Avrei dovuto", "accept": [], "note": "Lo que no hiciste y tendrías que haber hecho: condicional compuesto de *dovere* + infinitivo simple: *avrei dovuto avvisarla*."},
        {"type": "translate", "prompt": "Traducí al italiano (a la signora Conti, de usted).", "stem": "Hubiera preferido no tener que llamarla por esto.", "answer": "Avrei preferito non doverla chiamare per questo.", "accept": ["Avrei preferito non dover chiamarla per questo.", "Avrei preferito non doverla chiamare per questa cosa.", "Avrei preferito non doverla chiamare per questo motivo."], "note": "Nuestro «hubiera preferido» en italiano es condicional compuesto: *avrei preferito*. El pronombre va pegado a *dover* o a *chiamare*, nunca suelto adelante."}
      ],
      compito: { genre: "mail", title: "Reclamo per l'ordine 418", min: 80, max: 140,
        t: "Escribile un mail formal a la signora Conti, de Conti Forniture: contá los hechos del pedido (qué esperaban y qué llegó), el problema que les causó y la solución que pedís, sin romper la relación.",
        punti: ["Un saludo formal y el motivo del mail", "Los hechos: qué tenía que llegar y cuándo (*avremmo dovuto…*, *sarebbe arrivato…*)", "Qué esperaban y qué pasó (*ci aspettavamo che…*)", "El problema que les causó", "La solución que pedís, con plazo (*Le sarei grato se potesse…*)", "Un cierre que cuide la relación y una despedida"],
        model: "Gentile signora Conti,\ncome anticipato al telefono, Le scrivo per l'ordine 418. Avremmo dovuto ricevere la merce lunedì 12, ma è arrivata solo venerdì 16, e mancano tre pezzi su dieci. La Sua ditta ci aveva assicurato che sarebbe arrivato tutto entro lunedì, e ci aspettavamo che l'ordine arrivasse completo.\nIl ritardo ci ha creato parecchi problemi: avevamo promesso la consegna a un nostro cliente, che ha dovuto aspettare.\nLe sarei quindi grato se potesse mandarci i pezzi mancanti entro giovedì con un corriere espresso, senza costi per noi.\nSiamo sempre stati soddisfatti della collaborazione con Conti Forniture e sono certo che troveremo insieme una soluzione.\nResto in attesa di una Sua risposta.\nCordiali saluti,\nMartín Pereyra" } }
  ]
};
