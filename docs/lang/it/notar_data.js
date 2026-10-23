/*
 * «¿Qué notás?» de La Via C1: antes de «La regla», unos ejemplos con la
 * forma marcada y una pregunta sobre la regla misma.  Solo los datos: la
 * lógica está en docs/js/lezione.js (Lezione.notice) y la pantalla en
 * app.js.
 *
 * Armar la regla antes de leerla (Grammatik entdecken de Netzwerk y
 * Schritte, los recuadros de Nuovo Espresso y Domani): el alumno formula
 * una hipótesis y la regla la confirma («¡Eso!») o le marca la diferencia.
 *
 * NOTAR_DATA[semana][título del bloque] = {
 *   ex: [[forma marcada con *…*, castellano], …]   (4 o 5; si falta, los del bloque)
 *   q: la pregunta, answer: la respuesta (una de options),
 *   options: 3 opciones, no: la diferencia, si elegiste otra (con *…*).
 * }
 * El título tiene que ser el «h» exacto del bloque en
 * docs/lang/it/data/course.json (lo verifica tools/lib/test_notar.js).
 */
(function (root) {
  "use strict";

  root.NOTAR_DATA = {
    2: {
      "El esquema básico": {
        ex: [["il libr*o* → i libr*i*", "el libro → los libros"],
             ["la cas*a* → le cas*e*", "la casa → las casas"],
             ["il fior*e* → i fior*i*", "la flor → las flores"],
             ["la chiav*e* → le chiav*i*", "la llave → las llaves"]],
        q: "Mirá las que terminan en -e (fiore es masculino; chiave, femenino): ¿cómo hacen el plural?",
        answer: "En -i, sean masculinas o femeninas",
        options: ["En -i, sean masculinas o femeninas", "En -es, como en castellano", "En -i las masculinas y en -e las femeninas"],
        no: "El género no cambia nada: *fiore* y *chiave* hacen *-i* las dos. Y el plural nunca lleva *-s*."
      }
    },
    3: {
      "lo: para los comienzos difíciles": {
        ex: [["*lo* studente", "el estudiante"],
             ["*lo* zaino", "la mochila"],
             ["*lo* psicologo", "el psicólogo"],
             ["*il* sole, *il* sale", "el sol, la sal"]],
        q: "¿Cuándo va lo en vez de il?",
        answer: "Si la palabra empieza con s + consonante, z, ps o gn",
        options: ["Si la palabra empieza con s + consonante, z, ps o gn", "Si la palabra empieza con s, sea cual sea la letra que sigue", "Si la palabra es extranjera o viene del griego, como psicologo"],
        no: "No alcanza con la *s*: *il sole* lleva *il*, porque después de la *s* viene vocal. Cuenta el comienzo difícil de pronunciar: *st-*, *z-*, *ps-*."
      }
    },
    9: {
      "Presente + da: lo que sigue pasando": {
        ex: [["*Abito* a Bologna *da* tre anni.", "Vivo en Bolonia hace tres años."],
             ["*Studio* italiano *da* due mesi.", "Estudio italiano hace dos meses."],
             ["Ti *aspetto da* un'ora!", "¡Te espero hace una hora!"],
             ["*Lavoro* qui *da* gennaio.", "Trabajo acá desde enero."]],
        q: "Todavía vive allá, todavía estudia: ¿qué usa el italiano para «hace tres años»?",
        answer: "Presente + da",
        options: ["Presente + da", "Presente + fa, como «hace»", "Pasado + da"],
        no: "*fa* es para algo terminado (*tre anni fa*: ya pasó). Si sigue pasando: presente + *da*."
      }
    },
    10: {
      "Dónde se coloca el pronombre": {
        ex: [["*Ti* chiamo domani.", "Te llamo mañana."],
             ["Voglio chiamar*ti*.", "Quiero llamarte."],
             ["Non *lo* conosco.", "No lo conozco."],
             ["È bello veder*ti*!", "¡Qué lindo verte!"]],
        q: "¿Dónde va el pronombre (ti, lo)?",
        answer: "Delante del verbo conjugado; pegado al infinitivo",
        options: ["Delante del verbo conjugado; pegado al infinitivo", "Siempre delante del verbo, también con el infinitivo", "Siempre pegado al final del verbo, como en «llamalo»"],
        no: "Como en castellano: *ti chiamo* (te llamo), *chiamarti* (llamarte). El infinitivo pierde la *-e*: *chiamar-ti*."
      }
    },
    11: {
      "Cuál auxiliar": {
        ex: [["*Sono andata* al mare.", "Fui al mar."],
             ["*Ho mangiato* una pizza.", "Comí una pizza."],
             ["*Sono uscito* alle otto.", "Salí a las ocho."],
             ["*Ho comprato* il pane.", "Compré el pan."],
             ["*Sono arrivati* tardi.", "Llegaron tarde."]],
        q: "¿Cuándo va essere (sono) y cuándo avere (ho)?",
        answer: "essere para ir, salir, llegar; avere para hacerle algo a algo",
        options: ["essere para ir, salir, llegar; avere para hacerle algo a algo",
                  "essere para los verbos en -are; avere para los en -ere e -ire", "essere cuando hay objeto directo; avere cuando no hay"],
        no: "*andare* y *mangiare* son los dos en *-are* y llevan auxiliares distintos. Decide el sentido: moverse o cambiar de estado, *essere*; hacerle algo a algo (*il pane*, *una pizza*), *avere*."
      },
      "Con essere, el participio concuerda": {
        ex: [["Marco è partit*o*.", "Marco se fue."],
             ["Anna è partit*a*.", "Anna se fue."],
             ["Siamo arrivat*i* tardi.", "Llegamos tarde."],
             ["Le ragazze sono uscit*e*.", "Las chicas salieron."]],
        q: "¿Qué cambia en el participio (partito, partita…)?",
        answer: "Concuerda con el sujeto: -o, -a, -i, -e",
        options: ["Concuerda con el sujeto: -o, -a, -i, -e", "Nada: siempre termina en -o, como en castellano", "Depende del verbo: -ato, -uto, -ito"],
        no: "Con *essere*, el participio se porta como un adjetivo: *Anna è partita* como *Anna è alta*."
      }
    },
    14: {
      "El mecanismo": {
        ex: [["Mi *piace* il caffè.", "Me gusta el café."],
             ["Mi *piacciono* i film italiani.", "Me gustan las películas italianas."],
             ["Ti *piace* leggere?", "¿Te gusta leer?"],
             ["Ci *piacciono* gli spaghetti.", "Nos gustan los espaguetis."]],
        q: "¿De qué depende piace o piacciono?",
        answer: "De lo que gusta: singular o plural",
        options: ["De lo que gusta: singular o plural", "De la persona a la que le gusta: mi, ti, ci", "De si es una pregunta o una respuesta"],
        no: "Igual que «gusta / gustan»: *mi piace il caffè*, *ci piacciono gli spaghetti*. La persona (*mi*, *ci*) no cambia el verbo."
      }
    },
    15: {
      "La pregunta correcta": {
        ex: [["Da bambino *andavo* al mare ogni estate.", "De chico iba al mar todos los veranos."],
             ["Ieri *sono andato* al mare.", "Ayer fui al mar."],
             ["*Faceva* freddo e non *c'era* nessuno.", "Hacía frío y no había nadie."],
             ["Alle otto *è arrivato* Marco.", "A las ocho llegó Marco."]],
        q: "¿Cuándo va el imperfetto (andavo, faceva)?",
        answer: "Para costumbres y para describir cómo estaban las cosas",
        options: ["Para costumbres y para describir cómo estaban las cosas", "Para lo que duró mucho tiempo, aunque ya terminó", "Para lo que pasó hace mucho, no ayer ni hoy"],
        no: "La duración no decide: *ho abitato a Roma per dieci anni* va en passato prossimo. Decide si contás un hecho o pintás el fondo, una costumbre."
      }
    },
    19: {
      "Después de quando, futuro": {
        ex: [["Quando *arriverai*, ti darò le chiavi.", "Cuando llegues, te voy a dar las llaves."],
             ["Appena *potrò*, ti chiamerò.", "Apenas pueda, te llamo."],
             ["Ti scriverò quando *sarò* a Roma.", "Te voy a escribir cuando esté en Roma."],
             ["Quando *finirò* l'università, andrò in Italia.", "Cuando termine la facultad, me voy a Italia."]],
        q: "Después de quando o appena, hablando del futuro, ¿qué tiempo va?",
        answer: "Futuro: quando arriverai",
        options: ["Futuro: quando arriverai", "Subjuntivo, como «cuando llegues»", "Infinitivo: quando arrivare"],
        no: "El castellano pone subjuntivo («cuando llegues»); el italiano, futuro: *quando arriverai*, *appena potrò*."
      }
    },
    21: {
      "NE: una cantidad": {
        ex: [["Quanti libri hai? — *Ne* ho tre.", "¿Cuántos libros tenés? — Tengo tres."],
             ["Vuoi del pane? — Sì, *ne* prendo un po'.", "¿Querés pan? — Sí, agarro un poco."],
             ["Hai fratelli? — Sì, *ne* ho due.", "¿Tenés hermanos? — Sí, tengo dos."],
             ["Quanti caffè bevi? — *Ne* bevo quattro.", "¿Cuántos cafés tomás? — Tomo cuatro."]],
        q: "¿Qué hace ne, que en castellano no se dice?",
        answer: "Reemplaza la cosa contada cuando decís solo la cantidad",
        options: ["Reemplaza la cosa contada cuando decís solo la cantidad", "Reemplaza un lugar ya nombrado: «allá», «ahí»", "Es una negación, como non, para decir «ninguno»"],
        no: "*Ne ho tre* = «tengo tres (de eso)». El castellano lo calla; el italiano, si no nombrás la cosa, lo pide."
      }
    },
    24: {
      "Cómo se arma": {
        ex: [["vengo → che io *venga*", "vengo → que yo venga"],
             ["faccio → che tu *faccia*", "hago → que vos hagas"],
             ["finisco → che lui *finisca*", "termino → que él termine"],
             ["parlo → che io *parli*", "hablo → que yo hable"]],
        q: "¿De dónde sale el congiuntivo presente?",
        answer: "Del io del presente, cambiando la -o final",
        options: ["Del io del presente, cambiando la -o final", "Del infinitivo, cambiando la terminación: venire → venga", "Del futuro, cambiando la terminación: verrò → venga"],
        no: "*venire* no tiene la *g*; *vengo* sí. Por eso se parte del *io*: *vengo → venga*, *faccio → faccia*."
      }
    },
    25: {
      "«Creo que es»: congiuntivo": {
        ex: [["Credo che *abbia* ragione.", "Creo que tiene razón."],
             ["Penso che *sia* una buona idea.", "Pienso que es una buena idea."],
             ["Mi sembra che *sia* in ritardo.", "Me parece que está atrasado."],
             ["Credo che *parta* domani.", "Creo que se va mañana."]],
        q: "Después de credo che, penso che, mi sembra che, ¿qué modo va?",
        answer: "Congiuntivo, aunque en castellano vaya indicativo",
        options: ["Congiuntivo, aunque en castellano vaya indicativo", "Indicativo, como en castellano: credo che ha ragione", "Depende: congiuntivo solo si dudás mucho"],
        no: "«Creo que es» → *credo che sia*. En italiano, opinar no es afirmar: pide congiuntivo."
      },
      "Mismo sujeto: infinitivo": {
        ex: [["Credo *di avere* ragione.", "Creo que tengo razón."],
             ["Spero *di arrivare* in tempo.", "Espero llegar a tiempo."],
             ["Spero che tu *arrivi* in tempo.", "Espero que llegues a tiempo."],
             ["Penso *di partire* domani.", "Pienso irme mañana."]],
        q: "¿Cuándo va di + infinitivo y no che + congiuntivo?",
        answer: "Cuando el que cree o espera es el mismo que hace la acción",
        options: ["Cuando el que cree o espera es el mismo que hace la acción", "Cuando la acción es en el futuro: spero di arrivare", "Con sperare y credere siempre, sea quien sea el sujeto"],
        no: "*Spero di arrivare* (yo espero, yo llego) y *spero che tu arrivi* (yo espero, vos llegás): mismo verbo, otro sujeto."
      }
    },
    36: {
      "Si passivante: concuerda": {
        ex: [["Qui *si parla* italiano.", "Acá se habla italiano."],
             ["*Si vendono* libri usati.", "Se venden libros usados."],
             ["*Si affitta* una camera.", "Se alquila una habitación."],
             ["*Si affittano* camere.", "Se alquilan habitaciones."]],
        q: "¿De qué depende si affitta o si affittano?",
        answer: "De lo que se alquila: singular o plural",
        options: ["De lo que se alquila: singular o plural", "De quién alquila: una persona o varias", "De nada: siempre si affitta, en singular"],
        no: "Como «se alquila una habitación / se alquilan habitaciones»: el verbo concuerda con la cosa."
      }
    }
  };
})(this);
