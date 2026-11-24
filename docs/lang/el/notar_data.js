/*
 * «¿Qué notás?» de Δρόμος C1: antes de «La regla», unos ejemplos con la
 * forma marcada y una pregunta sobre la regla misma.  Solo los datos: la
 * lógica está en docs/js/lezione.js (Lezione.notice) y la pantalla en
 * app.js.
 *
 * NOTAR_DATA[semana][título del bloque] = {
 *   ex: [[forma marcada con *…*, castellano], …]   (4 o 5; si falta, los del bloque)
 *   q: la pregunta, answer: la respuesta (una de options),
 *   options: 3 opciones, no: la diferencia, si elegiste otra (con *…*).
 * }
 * El título tiene que ser el «h» exacto del bloque en
 * docs/lang/el/data/course.json (lo verifica tools/lib/test_notar.js).
 */
(function (root) {
  "use strict";

  root.NOTAR_DATA = {
    2: {
      "El verbo είμαι: ser y estar": {
        ex: [["*Είμαι* η Μαρία.", "Soy María."],
             ["*Είμαι* εδώ.", "Estoy acá."],
             ["Ο Νίκος *είναι* από την Ελλάδα.", "Nikos es de Grecia."],
             ["Ο Νίκος *είναι* εδώ.", "Nikos está acá."]],
        q: "¿Cuántos verbos usa el griego para «ser» y «estar»?",
        answer: "Uno solo para los dos",
        options: ["Uno solo para los dos", "Dos, como el castellano", "Ninguno: no se dice"],
        no: "Mirá de nuevo: *είμαι* es «soy» y también «estoy»; *είναι*, «es» y «está». Un solo verbo."
      }
    },
    3: {
      "Tres géneros, tres artículos": {
        ex: [["*ο* δρόμος", "el camino"],
             ["*η* θάλασσα", "el mar"],
             ["*το* νησί", "la isla"],
             ["*ο* ήλιος, *η* πόρτα, *το* σπίτι", "el sol, la puerta, la casa"]],
        q: "¿Cuántos artículos distintos hay para «el / la»?",
        answer: "Tres: ο, η y το",
        options: ["Tres: ο, η y το", "Dos, como en castellano", "Uno solo para todo"],
        no: "Son tres: *ο* (masculino), *η* (femenino) y *το* (neutro). Y no siempre coinciden con el género del castellano: *το νησί* es «la isla»."
      }
    },
    4: {
      "Las seis personas": {
        ex: [["Εγώ *μένω* εδώ.", "Yo vivo acá."],
             ["Εσύ *μένεις* εδώ;", "¿Vos vivís acá?"],
             ["Η Μαρία *μένει* εδώ.", "María vive acá."],
             ["Εμείς *μένουμε* εδώ.", "Nosotros vivimos acá."]],
        q: "¿Qué parte del verbo dice quién hace la acción?",
        answer: "La terminación: -ω, -εις, -ει…",
        options: ["La terminación: -ω, -εις, -ει…", "El principio de la palabra", "Solo el pronombre de adelante"],
        no: "El principio (*μέν-*) queda igual; cambia el final: *μένω, μένεις, μένει, μένουμε*. Como en castellano: vivo, vivís, vive."
      }
    },
    5: {
      "El masculino cambia: ο καφές → τον καφέ": {
        ex: [["*Ο καφές* είναι καλός.", "El café es bueno."],
             ["Θέλω *τον καφέ*.", "Quiero el café."],
             ["*Ο χυμός* είναι εδώ.", "El jugo está acá."],
             ["Έχω *τον χυμό*.", "Tengo el jugo."]],
        q: "¿Qué pasa con «ο καφές» cuando es lo que querés o tenés?",
        answer: "Cambia el artículo y pierde la -ς",
        options: ["Cambia el artículo y pierde la -ς", "Queda igual, como en castellano", "Solo cambia de lugar en la frase"],
        no: "Cuando hace la acción es *ο καφές*; cuando la recibe, *τον καφέ*: el artículo pasa a *τον* y el sustantivo pierde la *-ς*."
      }
    },
    6: {
      "σε + artículo: στον, στην, στο": {
        ex: [["Είμαι *στον* σταθμό.", "Estoy en la estación."],
             ["Είμαι *στην* πλατεία.", "Estoy en la plaza."],
             ["Είμαι *στο* λιμάνι.", "Estoy en el puerto."],
             ["Πάω *στο* ξενοδοχείο.", "Voy al hotel."]],
        q: "¿De qué depende que sea στον, στην o στο?",
        answer: "Del género del lugar",
        options: ["Del género del lugar", "De si vas o si estás", "De la distancia"],
        no: "Es *σε* pegado al artículo: *στον* con masculinos, *στην* con femeninos, *στο* con neutros. Sirve igual para «en» y para «a»."
      }
    },
    7: {
      "Los verbos en -άω: μιλάω": {
        ex: [["Εγώ *μιλάω* ελληνικά.", "Yo hablo griego."],
             ["Εσύ *μιλάς* ισπανικά.", "Vos hablás castellano."],
             ["Η Ελένη *μιλάει* αγγλικά.", "Eleni habla inglés."],
             ["Εμείς *μιλάμε* λίγο.", "Nosotros hablamos un poco."]],
        q: "¿En qué se diferencian de «μένω, μένεις, μένει»?",
        answer: "Llevan una α con el acento",
        options: ["Llevan una α con el acento", "No cambian con la persona", "Van siempre con pronombre"],
        no: "En estos verbos la fuerza cae en la terminación, que lleva *α*: *μιλάω, μιλάς, μιλάει, μιλάμε*."
      }
    },
    8: {
      "El posesivo va después": {
        ex: [["η μητέρα *μου*", "mi madre"],
             ["ο πατέρας *σου*", "tu padre"],
             ["το σπίτι *μας*", "nuestra casa"],
             ["η γάτα *της*", "su gata (de ella)"]],
        q: "¿Dónde va «mi», «tu», «nuestro» en griego?",
        answer: "Después del sustantivo, con artículo",
        options: ["Después del sustantivo, con artículo", "Antes del sustantivo, sin artículo", "Pegado al artículo, en una palabra"],
        no: "Al revés que en castellano: primero el artículo y el sustantivo, después el posesivo: *η μητέρα μου*, «la madre mía»."
      }
    },
    9: {
      "Μου αρέσει, μου αρέσουν": {
        ex: [["Μου *αρέσει* το ψάρι.", "Me gusta el pescado."],
             ["Μου *αρέσουν* τα ψάρια.", "Me gustan los pescados."],
             ["Μου *αρέσει* η ελιά.", "Me gusta la aceituna."],
             ["Μου *αρέσουν* οι ελιές.", "Me gustan las aceitunas."]],
        q: "¿Cuándo es αρέσει y cuándo αρέσουν?",
        answer: "Según lo que gusta: una cosa o varias",
        options: ["Según lo que gusta: una cosa o varias", "Según a quién le gusta: a mí o a vos", "Según el género de lo que gusta"],
        no: "Igual que «gusta / gustan»: el verbo va con lo que gusta. Una cosa, *αρέσει*; varias, *αρέσουν*. El *μου* no cambia nada."
      }
    },
    10: {
      "ποτέ + δεν: nunca": {
        ex: [["*Ποτέ δεν* πίνω καφέ.", "Nunca tomo café."],
             ["*Δεν* πίνω *ποτέ* καφέ.", "No tomo nunca café."],
             ["*Ποτέ δεν* κοιμάμαι νωρίς.", "Nunca me duermo temprano."],
             ["*Δεν* έρχομαι *ποτέ* αργά.", "No vengo nunca tarde."]],
        q: "¿Qué palabra acompaña siempre a ποτέ?",
        answer: "δεν, esté donde esté ποτέ",
        options: ["δεν, esté donde esté ποτέ", "ninguna: ποτέ va solo", "όχι, antes del verbo"],
        no: "En castellano «nunca tomo» va sin «no»; en griego *δεν* va siempre: *ποτέ δεν πίνω*. Sin *δεν*, la frase queda coja."
      }
    },
    11: {
      "No hay infinitivo: θέλω να…": {
        ex: [["Θέλω *να πάω* στο νησί.", "Quiero ir a la isla."],
             ["Θέλεις *να πας* στο νησί;", "¿Querés ir a la isla?"],
             ["Η Άννα θέλει *να πάει*.", "Anna quiere ir."],
             ["Θέλουμε *να πάμε* μαζί.", "Queremos ir juntos."]],
        q: "¿Qué le pasa al segundo verbo («ir»)?",
        answer: "Lleva να y cambia con la persona",
        options: ["Lleva να y cambia con la persona", "Queda siempre igual, como «ir»", "Va sin να y con otro pronombre"],
        no: "El griego no tiene infinitivo: «quiero ir» se dice «quiero que-vaya». Los dos verbos se conjugan: *θέλω να πάω*, *θέλεις να πας*."
      }
    },
    12: {
      "Θα + el tema que ya conocés": {
        ex: [["Θέλω *να αγοράσω* ψωμί.", "Quiero comprar pan."],
             ["Αύριο *θα αγοράσω* ψωμί.", "Mañana voy a comprar pan."],
             ["Πρέπει *να γράψω*.", "Tengo que escribir."],
             ["Αύριο *θα γράψω*.", "Mañana voy a escribir."]],
        q: "¿Qué forma del verbo va después de θα?",
        answer: "La misma que después de να",
        options: ["La misma que después de να", "La del presente de siempre", "Una nueva, solo del futuro"],
        no: "No hay nada nuevo que aprender: *θα* lleva el mismo tema que *να*: *να αγοράσω → θα αγοράσω*, *να γράψω → θα γράψω*."
      }
    },
    13: {
      "El aumento έ-": {
        ex: [["γράφω → *έγραψα*", "escribo → escribí"],
             ["παίζω → *έπαιξα*", "juego → jugué"],
             ["κάνω → *έκανα*", "hago → hice"],
             ["αγοράζω → *αγόρασα*", "compro → compré"]],
        q: "¿Qué verbos suman una έ- adelante en el pasado?",
        answer: "Los cortos, de dos sílabas",
        options: ["Los cortos, de dos sílabas", "Todos los verbos, siempre", "Solo los irregulares"],
        no: "El acento tiene que subir tres sílabas desde el final. A los cortos les falta una, y la *έ-* se la da: *έ-γρα-ψα*. *αγόρασα* ya tiene las tres."
      }
    }
  };
})(typeof window !== "undefined" ? window : globalThis);
