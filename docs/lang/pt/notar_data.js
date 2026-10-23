/*
 * «¿Qué notás?» de Rumo C1: antes de «La regla», unos ejemplos con la
 * forma marcada y una pregunta sobre la regla misma.  Solo los datos: la
 * lógica está en docs/js/lezione.js (Lezione.notice) y la pantalla en
 * app.js.
 *
 * Armar la regla antes de leerla (el «foco na língua» de Oi Brasil! y
 * Novo Avenida Brasil, Grammatik entdecken): el alumno formula una
 * hipótesis y la regla la confirma («¡Eso!») o le marca la diferencia.
 *
 * NOTAR_DATA[semana][título del bloque] = {
 *   ex: [[forma marcada con *…*, castellano], …]   (4 o 5; si falta, los del bloque)
 *   q: la pregunta, answer: la respuesta (una de options),
 *   options: 3 opciones, no: la diferencia, si elegiste otra (con *…*).
 * }
 * El título tiene que ser el «h» exacto del bloque en
 * docs/lang/pt/data/course.json (lo verifica tools/lib/test_notar.js).
 */
(function (root) {
  "use strict";

  root.NOTAR_DATA = {
    3: {
      "em + artículo: no, na, nos, nas": {
        ex: [["Estou *no* hotel.", "Estoy en el hotel."],
             ["Ela está *na* praia.", "Ella está en la playa."],
             ["Moro *no* Rio.", "Vivo en Río."],
             ["*Nas* ruas do Centro tem muita gente.", "En las calles del Centro hay mucha gente."]],
        q: "¿Qué son no y na en estas frases?",
        answer: "em + o y em + a: «en el», «en la»",
        options: ["em + o y em + a: «en el», «en la»", "La negación, como «no» en castellano", "Artículos solos, sin la preposición"],
        no: "*no* = *em + o* (en el); *na* = *em + a* (en la). La negación es *não*. Y «em o» no se dice nunca."
      }
    },
    5: {
      "A gente = nosotros": {
        ex: [["*A gente mora* perto da praia.", "Vivimos cerca de la playa."],
             ["*Nós moramos* em Niterói.", "Vivimos en Niterói."],
             ["*A gente come* muito açaí.", "Comemos mucho açaí."],
             ["*A gente trabalha* no Centro.", "Trabajamos en el Centro."]],
        q: "a gente quiere decir «nosotros»: ¿cómo va el verbo?",
        answer: "En tercera del singular: a gente mora",
        options: ["En tercera del singular: a gente mora", "Como nós: a gente moramos", "En tercera del plural: a gente moram"],
        no: "Aunque sea «nosotros», *a gente* se conjuga como *ele*: *a gente mora*, *a gente vai*. «A gente moramos» suena muy mal."
      }
    },
    8: {
      "ir + infinitivo: el futuro del habla": {
        ex: [["*Vou viajar* amanhã.", "Voy a viajar mañana."],
             ["A gente *vai comer* na feira.", "Vamos a comer en la feria."],
             ["Você *vai sair* hoje?", "¿Vas a salir hoy?"],
             ["Eles *vão ver* o jogo.", "Van a ver el partido."]],
        q: "Compará con «voy a viajar»: ¿qué no está en portugués?",
        answer: "La «a»: vou viajar",
        options: ["La «a»: vou viajar", "Nada: vou a viajar, igual", "El verbo ir: viajo amanhã"],
        no: "Entre *vou* y el infinitivo no va nada: *vou viajar*, *vamos sair*. «Vou a viajar» es el calco más típico."
      }
    },
    11: {
      "Perfeito regular": {
        ex: [["Ontem eu *falei* com a Ana.", "Ayer hablé con Ana."],
             ["Ela *falou* comigo.", "Ella habló conmigo."],
             ["Eu *trabalhei* muito.", "Trabajé mucho."],
             ["Você *trabalhou* ontem?", "¿Trabajaste ayer?"]],
        q: "En los verbos en -ar, ¿qué terminación lleva eu en el perfeito?",
        answer: "-ei: falei, trabalhei",
        options: ["-ei: falei, trabalhei", "-ou: falou, trabalhou", "-é: falé, trabalhé"],
        no: "*-ei* es *eu*; *-ou* es *ele / você*: *eu falei*, *ela falou*. «Falé» no existe."
      },
      "comi = comí y he comido": {
        ex: [["Hoje eu *acordei* cedo.", "Hoy me desperté temprano."],
             ["Ainda não *almocei*.", "Todavía no almorcé."],
             ["Você já *foi* a Paraty?", "¿Ya fuiste a Paraty?"],
             ["Nunca *comi* acarajé.", "Nunca comí acarajé."]],
        q: "En España dirían «hoy me he despertado», «nunca he comido». ¿Cómo lo dice el portugués?",
        answer: "Con el perfeito: acordei, comi",
        options: ["Con el perfeito: acordei, comi", "Con tenho + participio: tenho comido", "Con hei + participio: hei comido"],
        no: "El perfeito cubre los dos pasados: «comí» y «he comido» son *comi*. *Tenho comido* es otra cosa: «vengo comiendo»."
      }
    },
    16: {
      "El pronombre va delante": {
        ex: [["*Me* empresta sua caneta?", "¿Me prestás tu lapicera?"],
             ["Vou *te* ligar amanhã.", "Te voy a llamar mañana."],
             ["Ele não *me* viu.", "Él no me vio."],
             ["*Te* espero na praia.", "Te espero en la playa."]],
        q: "En Brasil, al hablar, ¿dónde va el pronombre (me, te)?",
        answer: "Delante del verbo, aun al empezar la frase",
        options: ["Delante del verbo, aun al empezar la frase", "Pegado detrás del verbo: empresta-me", "Al final de la frase, después de todo lo demás"],
        no: "*Me empresta?*, *te espero*: en la charla brasileña va delante. Detrás (*empreste-me*) suena a Portugal o a texto formal."
      }
    },
    20: {
      "La doble negación": {
        ex: [["*Não* vi *ninguém* na praia.", "No vi a nadie en la playa."],
             ["*Ninguém* sabe.", "Nadie sabe."],
             ["*Não* comi *nada*.", "No comí nada."],
             ["*Nunca* fui a Manaus.", "Nunca fui a Manaos."]],
        q: "¿Cuándo va não además de ninguém, nada, nunca?",
        answer: "Cuando la palabra negativa va detrás del verbo",
        options: ["Cuando la palabra negativa va detrás del verbo", "Siempre, también delante: não ninguém sabe", "Nunca: con ninguém alcanza, vi ninguém"],
        no: "Como en castellano: «no vi a nadie», pero «nadie sabe». Si la negativa va delante del verbo, *não* sobra."
      }
    },
    21: {
      "tenho feito = vengo haciendo": {
        ex: [["*Tenho dormido* mal.", "Vengo durmiendo mal."],
             ["*Tem chovido* muito no Rio.", "Viene lloviendo mucho en Río."],
             ["Ultimamente *temos comido* em casa.", "Últimamente venimos comiendo en casa."],
             ["Ontem *dormi* mal.", "Anoche dormí mal."]],
        q: "¿Qué cuenta tenho dormido?",
        answer: "Algo que se repite desde hace un tiempo y sigue",
        options: ["Algo que se repite desde hace un tiempo y sigue", "Algo que pasó una vez: «he dormido»", "Algo que había pasado antes de otra cosa"],
        no: "*Tenho dormido mal* = vengo durmiendo mal (y sigo). Una vez es *dormi mal*."
      }
    },
    23: {
      "Raíz del «eu» + vocal cambiada": {
        ex: [["faço → que eu *faça*", "hago → que yo haga"],
             ["tenho → que você *tenha*", "tengo → que vos tengas"],
             ["posso → que ele *possa*", "puedo → que él pueda"],
             ["falo → que eu *fale*", "hablo → que yo hable"]],
        q: "¿De dónde sale el presente do subjuntivo?",
        answer: "Del eu del presente, sin -o y con la vocal cambiada",
        options: ["Del eu del presente, sin -o y con la vocal cambiada", "Del infinitivo, cambiando la vocal: fazer → faça", "Del perfeito, cambiando la vocal: fiz → faça"],
        no: "*fazer* no tiene la *ç*; *faço* sí. Por eso se parte del *eu*: *faço → faça*, *posso → possa* (no «poda», como saldría de *poder*)."
      },
      "achar que: indicativo": {
        ex: [["*Acho que* ela *está* em casa.", "Creo que está en casa."],
             ["*Acho que* *vai* chover.", "Creo que va a llover."],
             ["*Acredito que* vocês *vão* gostar.", "Creo que les va a gustar."],
             ["*Não acho que* *seja* uma boa ideia.", "No creo que sea una buena idea."]],
        q: "¿Qué modo va después de acho que?",
        answer: "Indicativo; negado (não acho que), subjuntivo",
        options: ["Indicativo; negado (não acho que), subjuntivo", "Siempre subjuntivo, porque es una opinión", "Siempre indicativo, también negado"],
        no: "Igual que «creo que está / no creo que esté»: *acho que está*, *não acho que seja*."
      }
    },
    24: {
      "embora: siempre subjuntivo": {
        ex: [["*Embora* *esteja* chovendo, vamos ao jogo.", "Aunque está lloviendo, vamos al partido."],
             ["*Embora* ele *seja* paulista, torce pelo Flamengo.", "Aunque es paulista, es hincha de Flamengo."],
             ["*Embora* *tenha* pouco tempo, ela sempre ajuda.", "Aunque tiene poco tiempo, siempre ayuda."],
             ["Está chovendo, *mas* vamos ao jogo.", "Está lloviendo, pero vamos al partido."]],
        q: "Está lloviendo de verdad. ¿Qué modo va con embora?",
        answer: "Subjuntivo, siempre",
        options: ["Subjuntivo, siempre", "Indicativo, porque es real", "Infinitivo"],
        no: "«Aunque está» lleva indicativo en castellano; con *embora*, no: *embora esteja*. Para el indicativo, *mas*."
      }
    },
    27: {
      "Regulares: igual al infinitivo": {
        ex: [["Quando você *voltar*, me avisa.", "Cuando vuelvas, avisame."],
             ["Se eu *falar* com ela, te conto.", "Si hablo con ella, te cuento."],
             ["Se nós *sairmos* cedo, pegamos o metrô vazio.", "Si salimos temprano, agarramos el metro vacío."],
             ["Quando eles *abrirem* a loja, eu compro.", "Cuando abran el negocio, compro."]],
        q: "Quando você voltar, se eu falar: ¿a qué se parece esta forma?",
        answer: "Al infinitivo (voltar, falar), con -mos y -em en el plural",
        options: ["Al infinitivo (voltar, falar), con -mos y -em en el plural", "Al presente del indicativo: volta, fala, voltamos", "Al presente do subjuntivo: volte, fale, voltemos"],
        no: "Es el futuro do subjuntivo: en los regulares, *eu* y *ele* son iguales al infinitivo; *nós* suma *-mos* y *eles*, *-em*."
      },
      "Irregulares: la 3.ª plural del perfeito": {
        ex: [["fizeram → Se você *fizer* a feijoada…", "hicieron → Si hacés la feijoada…"],
             ["tiveram → Quando eu *tiver* tempo…", "tuvieron → Cuando tenga tiempo…"],
             ["puderam → Se você *puder*, me liga.", "pudieron → Si podés, llamame."],
             ["quiseram → Se Deus *quiser*!", "quisieron → ¡Si Dios quiere!"]],
        q: "¿De dónde salen fizer, tiver, puder?",
        answer: "De eles del perfeito: fizeram → fizer",
        options: ["De eles del perfeito: fizeram → fizer", "Del infinitivo, como los regulares: fazer", "Del presente: faço → fizer"],
        no: "Los irregulares parten del perfeito: *fizeram → fizer*, *tiveram → tiver*. Por eso *se você fizer*, nunca «se você fazer»."
      }
    },
    29: {
      "Con un sujeto propio": {
        ex: [["*É bom* vocês *chegarem* cedo.", "Es bueno que ustedes lleguen temprano."],
             ["*É importante* eles *saberem* os direitos.", "Es importante que ellos sepan sus derechos."],
             ["*Está na hora de* nós *irmos*.", "Es hora de que nos vayamos."],
             ["*É bom chegar* cedo.", "Es bueno llegar temprano."]],
        q: "¿Cuándo el infinitivo lleva -em o -mos (chegarem, irmos)?",
        answer: "Cuando tiene su propio sujeto (vocês, eles, nós)",
        options: ["Cuando tiene su propio sujeto (vocês, eles, nós)", "Cuando la frase entera está en plural", "Siempre después de é bom o é importante"],
        no: "*É bom chegar cedo* (en general) frente a *é bom vocês chegarem cedo* (ustedes): se flexiona cuando tiene sujeto propio, donde el castellano pone «que + subjuntivo»."
      }
    }
  };
})(this);
