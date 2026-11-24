/*
 * «💡 Estrategia de la semana» (js/estrategia.js): lo que depende del
 * griego.  Un set rotativo por grupo de misión; cada estrategia vale entre
 * las semanas from y to (por defecto, 1-52) y la semana N muestra la que
 * le toca en la rueda de las que valen para N.
 *
 *   GROUPS  grupo → [{ id, t, from?, to? }]
 *           palabras, practica (Superá la semana), dominala, leccion; y
 *           capire, escucha, lectura, escritura, frases y parla para cuando
 *           el paquete tenga esas misiones (hoy no las muestra).
 *   t       dos líneas como mucho, en castellano y en voseo: qué hacer, no
 *           por qué existe la misión; lo griego va en *cursiva*.
 * Test: tools/lib/test_estrategia.js.
 */
window.ESTRATEGIA_DATA = {
  GROUPS: {
    palabras: [
      { id: "pal-voz", t: "Leé cada palabra en voz alta, letra por letra, antes de mirar cómo suena: descifrar el alfabeto es el ejercicio.", to: 6 },
      { id: "pal-articulo", t: "Aprendé el sustantivo siempre con su artículo: no *θάλασσα*, sino *η θάλασσα*. El artículo te da el género y después el caso." },
      { id: "pal-acento", t: "Al copiar una palabra, decí dónde va la fuerza y escribí el acento en el momento: *καλημέρα*. Dejarlo para el final es olvidarlo." },
      { id: "pal-familia", t: "Buscá la palabra castellana escondida: *το τηλέφωνο*, *η μουσική*, *το πρόβλημα*. Lo que ya sabés sostiene lo nuevo." },
      { id: "pal-frase", t: "Para cada palabra, inventá una frase corta sobre vos: *Έχω έναν σκύλο*, *Μένω στο Μπουένος Άιρες*. Lo tuyo se recuerda más.", from: 4 },
      { id: "pal-ortografia", t: "Hay cinco maneras de escribir «i» (*η, ι, υ, ει, οι*): mirá cuál lleva cada palabra y escribila una vez a mano.", from: 2 },
      { id: "pal-terminacion", t: "La terminación avisa el género: *-ος* casi siempre es *ο*, *-α* y *-η* son *η*, *-ο*, *-ι* y *-μα* son *το*. Buscala.", from: 3 },
      { id: "pal-verbo", t: "Con cada verbo nuevo, aprendé también su otro tema: *αγοράζω → αγοράσω*, *γράφω → γράψω*. Lo vas a necesitar con *να* y *θα*.", from: 11 }
    ],
    practica: [
      { id: "pr-voz", t: "Antes de tocar o escribir, decí la respuesta en voz alta: recuperarla de memoria es lo que entrena." },
      { id: "pr-error", t: "Cuando te equivoques, leé la corrección y decí la forma buena dos veces antes de seguir." },
      { id: "pr-caso", t: "Antes de responder, preguntate quién hace y qué: el que hace va con *ο*, lo que recibe la acción con *τον*.", from: 5 },
      { id: "pr-sin-pista", t: "Probá primero sin pista: aunque falles, intentar recordar fija más que mirar la respuesta enseguida." },
      { id: "pr-lento", t: "Leé despacio y entero, sin saltear letras: *ρ* es r, *ν* es n, *η* es i. La prisa las vuelve p, v y n.", to: 5 }
    ],
    dominala: [
      { id: "dom-repaso", t: "Antes de Dominala, mirá tu lista de errores de la semana: lo que fallaste ayer es lo que más va a volver hoy." },
      { id: "dom-calma", t: "No hay vidas: andá sin apuro. Leé la consigna entera, sobre todo la persona y el caso que pide." },
      { id: "dom-revisar", t: "Antes de mandar cada respuesta escrita, revisá dos cosas: el acento sobre la vocal fuerte y la *ς* al final de palabra." },
      { id: "dom-articulo", t: "Si dudás del artículo, pensá primero el género y recién después el caso: *ο → τον*, *η → την*, *το → το*.", from: 5 }
    ],
    leccion: [
      { id: "lez-ejemplos", t: "Mirá primero los ejemplos y tratá de adivinar la regla; después leé la explicación y fijate si acertaste." },
      { id: "lez-castellano", t: "Buscá dónde se parece al castellano y dónde no: los artículos que cambian con el caso son lo que hay que vigilar." },
      { id: "lez-propio", t: "Al terminar, inventá un ejemplo propio con la regla y decilo en voz alta." },
      { id: "lez-chequeo", t: "En los chequeos, contestá antes de mirar las opciones: si la respuesta ya está en tu cabeza, la regla está aprendida." },
      { id: "lez-tabla", t: "Leé las tablas en voz alta de arriba abajo, como una canción: *είμαι, είσαι, είναι*. El oído se queda con el paradigma antes que el ojo." }
    ],
    capire: [
      { id: "cap-forma", t: "Acá el significado no ayuda: mirá solo la forma (el artículo, la terminación) para decidir." },
      { id: "cap-articulo", t: "El artículo es la pista: *τον* y *την* marcan lo que recibe la acción, aunque esté al principio de la frase." }
    ],
    escucha: [
      { id: "esc-preguntas", t: "Leé las preguntas antes de escuchar y adiviná las respuestas: después escuchás para confirmar, no para descubrir." },
      { id: "esc-dos", t: "Primera escucha: solo quién habla, dónde están y de qué. Segunda: los detalles (números, horas, nombres)." }
    ],
    lectura: [
      { id: "lec-titulo", t: "Antes de leer, mirá el título y la primera línea y adiviná de qué va: leer con una expectativa es leer más rápido." },
      { id: "lec-articulos", t: "En una frase larga, buscá el verbo y después los artículos: te dicen quién hace qué, aunque el orden cambie." }
    ],
    escritura: [
      { id: "scr-plan", t: "Plan antes de escribir: los puntos de la consigna, uno por renglón, y un conector para cada uno: *και*, *αλλά*, *γιατί*." },
      { id: "scr-relectura", t: "Releé una vez solo para los acentos y otra solo para los artículos: son los dos lugares donde más se escapan errores." }
    ],
    frases: [
      { id: "fr-bloque", t: "Aprendé la frase entera como un bloque, sin desarmarla: *Τι κάνεις;* sale de una sola vez cuando hace falta." },
      { id: "fr-sombra", t: "Escuchá y repetí casi encima del audio: copiá el ritmo y dónde cae la fuerza, no solo las palabras." }
    ],
    parla: [
      { id: "par-ganar-tiempo", t: "Si te trabás, ganá tiempo en griego: *Λοιπόν…*, *Πώς το λένε…;* Mejor eso que pasar al castellano." }
    ]
  }
};
