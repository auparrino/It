/*
 * «💡 Estrategia de la semana» (js/estrategia.js): lo que depende del
 * italiano.  Un set rotativo por grupo de misión; cada estrategia vale
 * entre las semanas from y to (por defecto, 1-52) y la semana N muestra
 * la que le toca en la rueda de las que valen para N.
 *
 *   GROUPS  grupo → [{ id, t, from?, to? }]
 *           escucha (Radio, escuchas del tramo, dictogloss), oido (Suoni),
 *           lectura, escritura (Scrivi, tarea del tramo), palabras, frases,
 *           practica (Superá la semana), dominala, leccion, capire, parla,
 *           falsos
 *   t       dos líneas como mucho, en castellano y en voseo: qué hacer, no
 *           por qué existe la misión; lo italiano va en *cursiva*.
 * Test: tools/lib/test_estrategia.js.
 */
window.ESTRATEGIA_DATA = {
  GROUPS: {
    escucha: [
      { id: "esc-preguntas", t: "Leé las preguntas antes de escuchar y adiviná las respuestas: después escuchás para confirmar, no para descubrir." },
      { id: "esc-dos", t: "Primera escucha: solo quién habla, dónde están y de qué. Segunda: los detalles (números, horas, nombres)." },
      { id: "esc-clave", t: "No persigas cada palabra: anotá 3 o 4 palabras clave que oigas y armá la idea con eso." },
      { id: "esc-numeros", t: "Antes de escuchar, repasá en voz baja los números y las horas: *diciotto, ventitré, alle otto e mezza*. Es lo que más se escapa.", to: 26 },
      { id: "esc-tono", t: "Prestá atención al tono, no solo a las palabras: *Dai!*, *Magari!*, *Figurati* cambian todo según cómo se dicen." },
      { id: "esc-conectores", t: "Escuchá los conectores: *però*, *quindi*, *invece*, *comunque* te avisan si viene un contraste, una consecuencia o un cambio de tema.", from: 14 },
      { id: "esc-resumen", t: "Al terminar, decí en voz alta, en una frase en italiano, de qué se trataba. Si no te sale, volvé a escuchar el principio.", from: 20 },
      { id: "esc-postura", t: "En una escucha larga, buscá la postura de quien habla: ¿está a favor, en contra o duda? Las frases con *secondo me*, *credo che* la dicen.", from: 27 }
    ],
    oido: [
      { id: "oido-boca", t: "Repetí cada par en voz alta antes de elegir: lo que tu boca distingue, tu oído lo empieza a distinguir." },
      { id: "oido-dobles", t: "Las dobles se oyen como una pausita antes de la consonante: *nono* y *nonno*, *caro* y *carro*. Contá ese silencio." },
      { id: "oido-acento", t: "Marcá con el dedo la sílaba fuerte mientras escuchás: *PARlano*, *teLEfono*. El acento corrido cambia la palabra." },
      { id: "oido-ojos", t: "Hacé una ronda con los ojos cerrados: sin la pantalla, el oído trabaja solo." }
    ],
    lectura: [
      { id: "lec-titulo", t: "Antes de leer, mirá el título y la primera línea y adiviná de qué va: leer con una expectativa es leer más rápido." },
      { id: "lec-preguntas", t: "Leé primero las preguntas: después buscá en el texto solo lo que piden, sin traducir todo." },
      { id: "lec-saltar", t: "Si una palabra no la sabés, seguí de largo: muchas veces la frase siguiente la explica. Tocala solo si sin ella no entendés." },
      { id: "lec-cognados", t: "Ojo con los parecidos: *burro* es manteca, *caldo* es calor, *salire* es subir. Si el sentido no cierra, sospechá del parecido." },
      { id: "lec-quien", t: "En los diálogos, seguí quién dice qué: los pronombres (*lui*, *lei*, *gli*, *le*) te dicen de quién se habla.", from: 10 },
      { id: "lec-subrayar", t: "Subrayá mentalmente los conectores (*perché*, *quindi*, *mentre*, *anche se*): son el esqueleto del texto.", from: 14 },
      { id: "lec-volver", t: "Al terminar, elegí una frase que te guste y leela en voz alta dos veces: así se te queda la música del italiano." }
    ],
    escritura: [
      { id: "scr-plan", t: "Plan antes de escribir: los puntos de la consigna, uno por renglón, y un conector para cada uno: *inoltre*, *però*, *quindi*." },
      { id: "scr-modelo", t: "Arrancá con frases que ya sabés que están bien (las de la lección o las de Frases) y cambiales una parte: menos riesgo, más italiano." },
      { id: "scr-relectura", t: "Releé una vez solo para el verbo (persona y tiempo) y otra solo para el género: *la* mano, *il* problema." },
      { id: "scr-castellano", t: "No escribas en castellano y traduzcas: pensá con lo que tenés en italiano, aunque salga más simple." },
      { id: "scr-variar", t: "Prohibido repetir el mismo conector: si ya usaste *e*, probá *inoltre* o *poi*; si ya usaste *ma*, probá *però* o *invece*.", from: 14 },
      { id: "scr-registro", t: "Decidí antes el registro: *tu* o *Lei*. Y fijate que el saludo y la despedida (*Ciao* / *Gentile…*, *Un abbraccio* / *Cordiali saluti*) vayan con él.", from: 20 },
      { id: "scr-argumento", t: "Para opinar: tesis, dos razones con ejemplo y una concesión (*è vero che…, però…*). Cerrá con *insomma* o *per concludere*.", from: 27 }
    ],
    palabras: [
      { id: "pal-articulo", t: "Aprendé cada sustantivo con su artículo: no *mano*, sino *la mano*. El artículo te dice el género gratis." },
      { id: "pal-frase", t: "Para cada palabra, inventá una frase corta sobre vos: *Ho un fratello*, *Lavoro in centro*. Lo tuyo se recuerda más." },
      { id: "pal-voz", t: "Decí cada palabra en voz alta antes de escribirla, con el acento donde va: decirla fija la forma." },
      { id: "pal-plural", t: "Fijate en el plural de las raras: *l'uomo / gli uomini*, *il braccio / le braccia*, *la mano / le mani*." },
      { id: "pal-verbo", t: "Con los verbos, aprendé también qué preposición piden: *pensare a*, *parlare di*, *aver bisogno di*.", from: 8 },
      { id: "pal-familia", t: "Agrupá por familia: *lavoro, lavorare, lavoratore*. Una palabra nueva trae otras dos casi gratis.", from: 14 }
    ],
    frases: [
      { id: "fr-bloque", t: "Aprendé la frase entera como un bloque, sin desarmarla: *Mi può dare una mano?* sale de una sola vez cuando hace falta." },
      { id: "fr-sombra", t: "Escuchá y repetí casi encima del audio (*shadowing*): copiá el ritmo y la melodía, no solo las palabras." },
      { id: "fr-situacion", t: "Imaginá la escena real (el bar, la estación) mientras repetís: la frase queda pegada al lugar donde la vas a usar." },
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
      { id: "dom-revisar", t: "Antes de mandar cada respuesta escrita, revisá la última letra: *-o / -a / -i / -e* es donde se escapan los puntos." }
    ],
    leccion: [
      { id: "lez-ejemplos", t: "Mirá primero los ejemplos y tratá de adivinar la regla; después leé la explicación y fijate si acertaste." },
      { id: "lez-castellano", t: "Buscá dónde se parece al castellano y dónde no: lo distinto es lo que hay que vigilar." },
      { id: "lez-propio", t: "Al terminar, inventá un ejemplo propio con la regla y decilo en voz alta." },
      { id: "lez-chequeo", t: "En los chequeos, contestá antes de mirar las opciones: si la respuesta ya está en tu cabeza, la regla está aprendida." }
    ],
    capire: [
      { id: "cap-forma", t: "Acá el significado no ayuda: mirá solo la forma (la terminación, el artículo, el pronombre) para decidir." },
      { id: "cap-pista", t: "Antes de elegir, señalá la palabra que te da la pista: *gli* es a él, *le* es a ella; *c'è* es uno, *ci sono* son varios." }
    ],
    parla: [
      { id: "par-objetivos", t: "Leé los tres objetivos y prepará una frase para cada uno antes de empezar: entrar con algo armado da confianza." },
      { id: "par-ganar-tiempo", t: "Si te trabás, ganá tiempo en italiano: *Allora…*, *Cioè…*, *Come si dice…?* Mejor eso que pasar al castellano." },
      { id: "par-preguntar", t: "No solo contestes: hacé vos una pregunta por turno (*E tu?*, *Davvero?*, *Come mai?*). Así la charla avanza." }
    ],
    falsos: [
      { id: "fal-frase", t: "Para cada falso amigo, armá una frase que lo use bien: *Ho fame, mangio un panino col burro*. La frase gana al parecido." },
      { id: "fal-sospecha", t: "Regla de oro: si una palabra italiana se parece mucho a una castellana y el sentido no cierra, es un falso amigo." }
    ]
  }
};
