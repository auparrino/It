/*
 * «💡 Estrategia de la semana» (js/estrategia.js): lo que depende del
 * portugués de Brasil.  Un set rotativo por grupo de misión; cada
 * estrategia vale entre las semanas from y to (por defecto, 1-52) y la
 * semana N muestra la que le toca en la rueda de las que valen para N.
 *
 *   GROUPS  grupo → [{ id, t, from?, to? }]
 *           escucha (Radio, escuchas del tramo, dictogloss), oido (Suoni),
 *           lectura, escritura (Escrever, tarea del tramo), palabras,
 *           frases, practica (Superá la semana), dominala, leccion, capire,
 *           parla, falsos
 *   t       dos líneas como mucho, en castellano y en voseo: qué hacer, no
 *           por qué existe la misión; lo portugués va en *cursiva*.
 * Test: tools/lib/test_estrategia.js.
 */
window.ESTRATEGIA_DATA = {
  GROUPS: {
    escucha: [
      { id: "esc-preguntas", t: "Leé las preguntas antes de escuchar y adiviná las respuestas: después escuchás para confirmar, no para descubrir." },
      { id: "esc-dos", t: "Primera escucha: solo quién habla, dónde están y de qué. Segunda: los detalles (números, horas, nombres)." },
      { id: "esc-reducciones", t: "En Brasil se comen sílabas: *tá* es *está*, *pra* es *para*, *cê* es *você*. Si algo suena cortito, probablemente es eso." },
      { id: "esc-numeros", t: "Antes de escuchar, repasá en voz baja los números y las horas: *dezesseis, vinte e três, às oito e meia*. Es lo que más se escapa.", to: 26 },
      { id: "esc-clave", t: "No persigas cada palabra: anotá 3 o 4 palabras clave que oigas y armá la idea con eso." },
      { id: "esc-conectores", t: "Escuchá los conectores: *mas*, *então*, *aliás*, *só que* te avisan si viene un contraste, una consecuencia o una corrección.", from: 14 },
      { id: "esc-resumen", t: "Al terminar, decí en voz alta, en una frase en portugués, de qué se trataba. Si no te sale, volvé a escuchar el principio.", from: 20 },
      { id: "esc-postura", t: "En una escucha larga, buscá la postura de quien habla: ¿a favor, en contra o duda? *Na minha opinião*, *acho que*, *sei lá* la dicen.", from: 27 }
    ],
    oido: [
      { id: "oido-boca", t: "Repetí cada par en voz alta antes de elegir: lo que tu boca distingue, tu oído lo empieza a distinguir." },
      { id: "oido-nasal", t: "Las nasales se oyen por la nariz, sin «n» al final: *pão*, *bom*, *sim*. Taparte la nariz un segundo te dice si la hiciste." },
      { id: "oido-abiertas", t: "La *ó* abierta y la *ô* cerrada cambian la palabra: *avó* (abuela) y *avô* (abuelo). Exagerá la boca abierta al repetir." },
      { id: "oido-ojos", t: "Hacé una ronda con los ojos cerrados: sin la pantalla, el oído trabaja solo." }
    ],
    lectura: [
      { id: "lec-titulo", t: "Antes de leer, mirá el título y la primera línea y adiviná de qué va: leer con una expectativa es leer más rápido." },
      { id: "lec-preguntas", t: "Leé primero las preguntas: después buscá en el texto solo lo que piden, sin traducir todo." },
      { id: "lec-cognados", t: "Ojo con los cognados: *esquisito* no es exquisito (es raro), *polvo* es pulpo, *apelido* es apodo. Si el sentido no cierra, sospechá." },
      { id: "lec-saltar", t: "Si una palabra no la sabés, seguí de largo: muchas veces la frase siguiente la explica. Tocala solo si sin ella no entendés." },
      { id: "lec-contracciones", t: "Desarmá las contracciones al leer: *no* es *em + o*, *pela* es *por + a*, *dele* es *de + ele*. Así no te confunden.", to: 26 },
      { id: "lec-subrayar", t: "Subrayá mentalmente los conectores (*porque*, *então*, *enquanto*, *embora*): son el esqueleto del texto.", from: 14 },
      { id: "lec-volver", t: "Al terminar, elegí una frase que te guste y leela en voz alta dos veces: así se te queda la música del portugués." }
    ],
    escritura: [
      { id: "scr-plan", t: "Plan antes de escribir: los puntos de la consigna, uno por renglón, y un conector para cada uno: *além disso*, *mas*, *então*." },
      { id: "scr-modelo", t: "Arrancá con frases que ya sabés que están bien (las de la lección o las de Frases) y cambiales una parte: menos riesgo, más portugués." },
      { id: "scr-relectura", t: "Releé una vez solo para las contracciones (*no*, *na*, *do*, *pela*) y otra solo para el verbo: persona y tiempo." },
      { id: "scr-castellano", t: "No escribas en castellano y traduzcas: pensá con lo que tenés en portugués, aunque salga más simple." },
      { id: "scr-variar", t: "Prohibido repetir el mismo conector: si ya usaste *e*, probá *além disso* o *também*; si ya usaste *mas*, probá *porém* o *só que*.", from: 14 },
      { id: "scr-registro", t: "Decidí antes el registro: *você* con amigos, *o senhor / a senhora* con un desconocido mayor. Y que el saludo y el cierre (*Oi* / *Prezado…*, *Beijos* / *Atenciosamente*) vayan con él.", from: 20 },
      { id: "scr-argumento", t: "Para opinar: tesis, dos razones con ejemplo y una concesión (*é verdade que…, mas…*). Cerrá con *enfim* o *em suma*.", from: 27 }
    ],
    palabras: [
      { id: "pal-articulo", t: "Aprendé cada sustantivo con su artículo: no *leite*, sino *o leite*. Muchos cambian de género respecto del castellano." },
      { id: "pal-frase", t: "Para cada palabra, inventá una frase corta sobre vos: *Tenho um irmão*, *Trabalho no centro*. Lo tuyo se recuerda más." },
      { id: "pal-voz", t: "Decí cada palabra en voz alta antes de escribirla, con la nasal y el acento donde van: decirla fija la forma." },
      { id: "pal-plural", t: "Fijate en el plural de las de *-ão*: *pão / pães*, *mão / mãos*, *avião / aviões*. Cada una tiene el suyo." },
      { id: "pal-verbo", t: "Con los verbos, aprendé también qué preposición piden: *gostar de*, *precisar de*, *pensar em*, *chegar a*.", from: 8 },
      { id: "pal-familia", t: "Agrupá por familia: *trabalho, trabalhar, trabalhador*. Una palabra nueva trae otras dos casi gratis.", from: 14 }
    ],
    frases: [
      { id: "fr-bloque", t: "Aprendé la frase entera como un bloque, sin desarmarla: *Pode me dar uma ajuda?* sale de una sola vez cuando hace falta." },
      { id: "fr-sombra", t: "Escuchá y repetí casi encima del audio (*shadowing*): copiá el ritmo y la melodía, no solo las palabras." },
      { id: "fr-situacion", t: "Imaginá la escena real (la padaria, la rodoviária) mientras repetís: la frase queda pegada al lugar donde la vas a usar." },
      { id: "fr-dias", t: "Volvé a las frases en días distintos, aunque sea dos minutos: lo que vuelve con días de por medio queda firme." }
    ],
    practica: [
      { id: "pr-voz", t: "Antes de tocar o escribir, decí la respuesta en voz alta: recuperarla de memoria es lo que entrena." },
      { id: "pr-error", t: "Cuando te equivoques, leé la corrección y decí la forma buena dos veces antes de seguir." },
      { id: "pr-porque", t: "Si dudás entre dos opciones, preguntate qué regla las separa. Si no sabés, tocá «📖 ¿Por qué?» después." },
      { id: "pr-sin-pista", t: "Probá primero sin pista: aunque falles, intentar recordar fija más que mirar la respuesta enseguida." }
    ],
    dominala: [
      { id: "dom-repaso", t: "Antes de Dominala, mirá tu lista de errores de la semana: lo que fallaste ayer es lo que más va a volver hoy." },
      { id: "dom-calma", t: "No hay vidas: andá sin apuro. Leé la consigna entera, sobre todo la persona y el tiempo que pide." },
      { id: "dom-mezcla", t: "Dominala mezcla toda la semana: antes de cada respuesta, preguntate de qué tema es. Reconocer el tema es medio camino." },
      { id: "dom-revisar", t: "Antes de mandar cada respuesta escrita, revisá tildes y nasales: *é / e*, *está / esta*, *avó / avô* es donde se escapan los puntos." }
    ],
    leccion: [
      { id: "lez-ejemplos", t: "Mirá primero los ejemplos y tratá de adivinar la regla; después leé la explicación y fijate si acertaste." },
      { id: "lez-castellano", t: "Buscá dónde se parece al castellano y dónde no: lo distinto es lo que hay que vigilar." },
      { id: "lez-propio", t: "Al terminar, inventá un ejemplo propio con la regla y decilo en voz alta." },
      { id: "lez-chequeo", t: "En los chequeos, contestá antes de mirar las opciones: si la respuesta ya está en tu cabeza, la regla está aprendida." }
    ],
    capire: [
      { id: "cap-forma", t: "Acá el significado no ayuda: mirá solo la forma (la terminación, el artículo, la contracción) para decidir." },
      { id: "cap-pista", t: "Antes de elegir, señalá la palabra que te da la pista: el artículo, la terminación del verbo o la preposición." }
    ],
    parla: [
      { id: "par-objetivos", t: "Leé los tres objetivos y prepará una frase para cada uno antes de empezar: entrar con algo armado da confianza." },
      { id: "par-ganar-tiempo", t: "Si te trabás, ganá tiempo en portugués: *Então…*, *Tipo…*, *Como é que se diz…?* Mejor eso que pasar al castellano." },
      { id: "par-preguntar", t: "No solo contestes: hacé vos una pregunta por turno (*E você?*, *Sério?*, *Por quê?*). Así la charla avanza." }
    ],
    falsos: [
      { id: "fal-frase", t: "Para cada falso amigo, armá una frase que lo use bien: *O polvo estava ótimo*. La frase gana al parecido." },
      { id: "fal-sospecha", t: "Regla de oro: si una palabra portuguesa se parece mucho a una castellana y el sentido no cierra, es un falso amigo." }
    ]
  }
};
