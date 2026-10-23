/*
 * «💡 Estrategia de la semana» (js/estrategia.js): lo que depende del
 * alemán.  Un set rotativo por grupo de misión; cada estrategia vale entre
 * las semanas from y to (por defecto, 1-52) y la semana N muestra la que
 * le toca en la rueda de las que valen para N.
 *
 *   GROUPS  grupo → [{ id, t, from?, to? }]
 *           palabras, practica (Superá la semana), dominala, leccion,
 *           capire; y escucha, lectura, escritura, frases y parla para
 *           cuando el paquete tenga esas misiones (hoy no las muestra).
 *   t       dos líneas como mucho, en castellano y en voseo: qué hacer, no
 *           por qué existe la misión; lo alemán va en *cursiva*.
 * Test: tools/lib/test_estrategia.js.
 */
window.ESTRATEGIA_DATA = {
  GROUPS: {
    palabras: [
      { id: "pal-articulo", t: "Aprendé el sustantivo siempre con artículo y plural: no *Tisch*, sino *der Tisch, die Tische*. Sin eso, la palabra está a medias." },
      { id: "pal-colores", t: "Asociá cada género a una imagen: *der* azul, *die* rojo, *das* verde. Imaginá la cosa de ese color al repetirla." },
      { id: "pal-frase", t: "Para cada palabra, inventá una frase corta sobre vos: *Ich habe einen Bruder*, *Ich arbeite im Büro*. Lo tuyo se recuerda más." },
      { id: "pal-voz", t: "Decí cada palabra en voz alta antes de escribirla, con la mayúscula en la cabeza: en alemán todo sustantivo va con mayúscula." },
      { id: "pal-pistas", t: "Algunas terminaciones te regalan el género: *-ung*, *-heit*, *-keit* son *die*; *-chen* es *das*. Buscalas.", from: 6 },
      { id: "pal-verbo", t: "Con los verbos, aprendé también el caso o la preposición que piden: *helfen* + dativo, *warten auf*, *denken an*.", from: 10 },
      { id: "pal-perfekt", t: "Con cada verbo nuevo, aprendé su Perfekt entero: *gehen → ist gegangen*, *essen → hat gegessen*.", from: 14 },
      { id: "pal-compuestos", t: "Desarmá las palabras largas de atrás para adelante: *Haustür* es *Haus* + *Tür*, y el género lo da la última: *die* Haustür.", from: 8 }
    ],
    practica: [
      { id: "pr-voz", t: "Antes de tocar o escribir, decí la respuesta en voz alta: recuperarla de memoria es lo que entrena." },
      { id: "pr-error", t: "Cuando te equivoques, leé la corrección y decí la forma buena dos veces antes de seguir." },
      { id: "pr-verbo-final", t: "Antes de responder, ubicá el verbo: en la principal va segundo; con *weil*, *dass* o *wenn*, al final.", from: 12 },
      { id: "pr-sin-pista", t: "Probá primero sin pista: aunque falles, intentar recordar fija más que mirar la respuesta enseguida." }
    ],
    dominala: [
      { id: "dom-repaso", t: "Antes de Dominala, mirá tu lista de errores de la semana: lo que fallaste ayer es lo que más va a volver hoy." },
      { id: "dom-calma", t: "No hay vidas: andá sin apuro. Leé la consigna entera, sobre todo la persona y el caso que pide." },
      { id: "dom-caso", t: "Para cada artículo, preguntate primero el caso: ¿quién hace (nominativo), qué (acusativo), a quién (dativo)?", from: 4 },
      { id: "dom-revisar", t: "Antes de mandar cada respuesta escrita, revisá mayúsculas y diéresis: *Bäcker*, no *Backer*; *die Tür*, no *die tür*." }
    ],
    leccion: [
      { id: "lez-ejemplos", t: "Mirá primero los ejemplos y tratá de adivinar la regla; después leé la explicación y fijate si acertaste." },
      { id: "lez-castellano", t: "Buscá dónde se parece al castellano y dónde no: el orden de las palabras y los casos son lo que hay que vigilar." },
      { id: "lez-propio", t: "Al terminar, inventá un ejemplo propio con la regla y decilo en voz alta." },
      { id: "lez-chequeo", t: "En los chequeos, contestá antes de mirar las opciones: si la respuesta ya está en tu cabeza, la regla está aprendida." }
    ],
    capire: [
      { id: "cap-forma", t: "Acá el significado no ayuda: mirá solo la forma (el artículo, la terminación) para decidir." },
      { id: "cap-articulo", t: "El artículo es la pista: *den* casi siempre es acusativo masculino, *dem* es dativo. No te guíes por el orden de la frase." }
    ],
    escucha: [
      { id: "esc-preguntas", t: "Leé las preguntas antes de escuchar y adiviná las respuestas: después escuchás para confirmar, no para descubrir." },
      { id: "esc-dos", t: "Primera escucha: solo quién habla, dónde están y de qué. Segunda: los detalles (números, horas, nombres)." },
      { id: "esc-numeros", t: "Ojo con los números: en alemán la unidad va primero, *dreiundzwanzig* es tres-y-veinte. Repasalos antes de escuchar.", to: 26 }
    ],
    lectura: [
      { id: "lec-titulo", t: "Antes de leer, mirá el título y la primera línea y adiviná de qué va: leer con una expectativa es leer más rápido." },
      { id: "lec-verbo", t: "En una frase larga, buscá el verbo al final y el sujeto al principio: el medio se entiende después." }
    ],
    escritura: [
      { id: "scr-plan", t: "Plan antes de escribir: los puntos de la consigna, uno por renglón, y un conector para cada uno: *außerdem*, *aber*, *deshalb*." },
      { id: "scr-relectura", t: "Releé una vez solo para el verbo (¿está segundo?, ¿al final con *weil*?) y otra solo para mayúsculas y artículos." }
    ],
    frases: [
      { id: "fr-bloque", t: "Aprendé la frase entera como un bloque, sin desarmarla: *Können Sie mir helfen?* sale de una sola vez cuando hace falta." },
      { id: "fr-sombra", t: "Escuchá y repetí casi encima del audio (*shadowing*): copiá el ritmo y la melodía, no solo las palabras." }
    ],
    parla: [
      { id: "par-ganar-tiempo", t: "Si te trabás, ganá tiempo en alemán: *Also…*, *Na ja…*, *Wie sagt man…?* Mejor eso que pasar al castellano." }
    ]
  }
};
