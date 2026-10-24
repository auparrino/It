/* La grilla de Escreva (docs/js/grilla.js): lo que depende del portugués.
 *
 * Las 4 filas siguen la grilla del Celpe-Bras (Documento base): la
 * adecuación contextual (enunciador, interlocutor, propósito y género), la
 * adecuación discursiva (coherencia y cohesión), la léxica y la gramatical,
 * dichas en castellano y sin jerga.  context: esas cuatro casillas para la
 * consigna de cada semana desde la 14.  auto: qué mira la estimación local
 * de esa fila.  connectors: los que cuenta la fila de coherencia (sin «e»).
 * ignore: palabras de cuatro letras o más que vuelven siempre.  samples: un
 * par de textos de muestra (nota alta y nota baja) por tramo del curso, con
 * sus anotaciones [fila, nota].
 */
(function (root) {
  "use strict";
  var DATA = {
    from: 14,
    title: "La grilla",
    intro: "Así se califica un texto en el Celpe-Bras: primero, si el texto sirve para lo que pide la tarea. Leela antes de escribir.",
    contextLabels: { e: "Quién escribe (enunciador)", i: "A quién (interlocutor)", p: "Para qué (propósito)", g: "Qué texto (género)" },
    rows: [
      { id: "adequacao", auto: "task", name: "Adecuación",
        what: "Escribís en el papel que pide la consigna, a quien corresponde, para lo que corresponde y con la forma del género (mensaje, mail, nota…).",
        hi: "Queda claro quién escribe, a quién y para qué; el formato y el tono son los del género.",
        lo: "Un texto que podría ir a cualquiera, o un tono que no va (*Oi, tudo bem?* a una institución).",
        self: "¿Queda claro quién escribe, a quién, para qué y en qué formato?" },
      { id: "coesao", auto: "connectors", name: "Orden y conectores",
        what: "Las ideas siguen un hilo y se unen con conectores.",
        hi: "Conectores variados: *além disso*, *porém*, *por isso*, *então*.",
        lo: "Frases sueltas, o todo unido con *e* y *porque*.",
        self: "¿Usaste al menos tres conectores distintos?" },
      { id: "lexico", auto: "variety", name: "Vocabulario",
        what: "Palabras precisas y variadas, sin portuñol.",
        hi: "No repite; usa las palabras de la semana.",
        lo: "Repite *muito*, *bom*, *coisa*; mete palabras en castellano.",
        self: "¿Evitaste repetir las mismas palabras y meter castellano?" },
      { id: "gramatica", auto: "errors", name: "Gramática",
        what: "Las estructuras de la semana, bien usadas.",
        hi: "Pocos errores, y ninguno impide entender.",
        lo: "Los errores de siempre (*eu gosto café*, *a gente vamos*).",
        self: "¿Releíste buscando tus errores de siempre?" }
    ],
    context: {
      14: { e: "Vos, que vas a compartir el departamento", i: "Una estudiante que todavía no conocés (*você*, con confianza)", p: "Contar tus gustos y preguntar los de ella", g: "Mensaje" },
      15: { e: "Vos, que vivís en otro país", i: "Los lectores de una revista para inmigrantes", p: "Contar cómo era tu ciudad y algo que pasó", g: "Relato breve" },
      16: { e: "Vos, que cuidaste la casa", i: "Dona Lúcia, tu vecina (con respeto: *a senhora*)", p: "Contarle qué hiciste con cada cosa", g: "Nota (*bilhete*)" },
      17: { e: "Vos, futuro alumno de intercambio", i: "La coordinación del curso", p: "Presentar tus planes", g: "E-mail formal" },
      18: { e: "Vos, que organizás el festejo", i: "El restaurante", p: "Reservar la mesa y hacer dos pedidos", g: "Mensaje de reserva, cortés" },
      19: { e: "Vos, que conocés las dos ciudades", i: "Un amigo argentino", p: "Comparar y recomendar una", g: "Mensaje" },
      20: { e: "Vos, oyente de la radio", i: "Nanda y Caio (o seu Jorge), y los oyentes", p: "Quejarte sin pelear, con humor", g: "Mensaje a un programa de radio" },
      21: { e: "Vos", i: "Una amiga que no ves hace meses", p: "Contar tus novedades", g: "Respuesta a un mensaje" },
      22: { e: "Vos, que escribís en el diario de la escuela", i: "Los lectores del diario", p: "Informar sobre un monumento", g: "Nota periodística breve" },
      23: { e: "Vos, oyente del «Consultório da Nanda»", i: "Rafael, que se peleó con la novia", p: "Aconsejarlo y desearle suerte", g: "Mensaje" },
      24: { e: "Vos, que organizás el viaje", i: "El grupo de amigos", p: "Explicar el plan y sus condiciones", g: "Mensaje al grupo" },
      25: { e: "Vos, vecino del barrio", i: "Los estudiantes de intercambio que llegan", p: "Describir el barrio", g: "Texto para un sitio web" },
      26: { e: "Vos, en nombre de la radio", i: "Diego, el oyente que viaja en el feriadão", p: "Contar, recomendar con cortesía y desear buen viaje", g: "E-mail de respuesta" },
      27: { e: "Vos, a punto de mudarte", i: "Un amigo", p: "Contar qué vas a hacer al llegar", g: "Mensaje" },
      28: { e: "Vos, alumno de la clase", i: "Los lectores del blog de la clase", p: "Imaginar un viaje en el tiempo", g: "Entrada de blog" },
      29: { e: "Vos, en el debate", i: "La clase", p: "Defender qué hace falta para aprender", g: "Párrafo argumentativo" },
      30: { e: "Vos", i: "Un lector cualquiera", p: "Imaginar cómo habría sido otra historia", g: "Texto breve de hipótesis" },
      31: { e: "Vos, que estuviste en la charla", i: "Un compañero", p: "Contar lo que se dijo", g: "Relato en estilo indirecto" },
      32: { e: "Quien pone el cartel (un dueño, un vecino, un comercio)", i: "La gente que pasa por la calle", p: "Ofrecer, buscar, avisar, prohibir", g: "Carteles y avisos" },
      33: { e: "Vos, en nombre de la biblioteca", i: "Los lectores del boletín", p: "Presentar a un escritor", g: "Texto formal de boletín" },
      34: { e: "Vos, lector del diario", i: "Los otros lectores del sitio", p: "Opinar y argumentar", g: "Comentario en un diario" },
      35: { e: "Vos", i: "Un amigo", p: "Contar una película o un libro que te marcó", g: "Mensaje" },
      36: { e: "Vos", i: "Tu familia", p: "Contar tu sábado", g: "Mensaje familiar" },
      37: { e: "Vos, divulgador de la facultad", i: "Los lectores de la revista (público general)", p: "Explicar cómo funciona una institución", g: "Artículo de divulgación" },
      38: { e: "Vos, amigo", i: "Un amigo carioca", p: "Invitarlo al boteco", g: "WhatsApp, bien coloquial" },
      40: { e: "Vos, autor de un informe", i: "Los lectores de un informe", p: "Exponer sobre la Constitución de 1988", g: "Párrafo de informe, formal" },
      41: { e: "Un narrador literario", i: "El club de lectura", p: "Resumir el comienzo de una novela", g: "Resumen narrativo" },
      42: { e: "Vos, cronista", i: "Los lectores del diario del barrio", p: "Pintar un domingo en Copacabana", g: "Crónica" },
      43: { e: "Vos, investigador", i: "La Biblioteca Nacional", p: "Pedir acceso a documentos", g: "E-mail formal" },
      44: { e: "Vos", i: "Un amigo extranjero", p: "Describir tu barrio", g: "Mensaje" },
      45: { e: "Vos", i: "Un amigo", p: "Contar tu primer mes en Río", g: "Mensaje" },
      46: { e: "Vos, viajero", i: "Los lectores de tu blog", p: "Contar la visita y comparar", g: "Post de viaje" },
      47: { e: "Vos, en el debate", i: "La clase", p: "Defender una tesis con matices", g: "Texto argumentativo" },
      48: { e: "Vos, que presentás el ensayo", i: "La clase", p: "Resumir y atribuir las ideas", g: "Resumen académico" },
      49: { e: "Vos, que editás la revista", i: "Los lectores de la revista de la facultad", p: "Llevar un comentario al registro culto", g: "Reescritura formal" },
      50: { e: "Vos", i: "Una amiga", p: "Contar una confusión", g: "E-mail informal" },
      51: { e: "Vos, hoy", i: "Vos, hace un año", p: "Hacer el balance y dar consejos", g: "Carta personal" }
    },
    connectors: ["além disso", "mas", "porém", "então", "por isso", "portanto", "porque", "depois", "antes",
      "também", "no entanto", "contudo", "ou seja", "por exemplo", "enquanto", "embora", "mesmo que", "quando",
      "primeiro", "finalmente", "por um lado", "por outro lado", "na minha opinião", "caso", "pois", "aliás",
      "ainda assim", "assim", "ou", "inclusive"],
    ignore: ["para", "pelo", "pela", "pelos", "pelas", "numa", "esse", "essa", "este", "esta", "isso", "isto",
      "quando", "também", "porque", "está", "estou", "minha", "meus", "minhas", "você", "vocês", "eles", "elas", "dele", "dela", "nossa", "nosso", "como"],
    samples: [
      { from: 14, task: "Un mensaje a un amigo: contale tu fin de semana e invitalo a un programa.",
        hi: { grade: "5 de 5",
              t: "Oi, Pedro! Tudo bem? O meu fim de semana foi ótimo: no sábado fui à praia com a minha irmã e almoçamos num quiosque em Copacabana. No domingo, porém, choveu o dia todo, então fiquei em casa e vi um filme. E você, o que fez? Vamos tomar um chope na quinta depois do trabalho? Abraço, Sofía",
              notes: [["adequacao", "Saluda, cuenta, pregunta y propone: hace lo que pide la consigna, con el tono de amigos (*Oi*, *Abraço*)."],
                      ["coesao", "*porém*, *então* y el *E você?* encadenan las partes."],
                      ["gramatica", "*fui à praia*, con crase; *almoçamos*, *choveu*, *fiquei* en pretérito perfeito."]] },
        lo: { grade: "2 de 5",
              t: "Olá. O fim de semana foi bom. No sábado eu fui à praia. Eu gosto praia. Eu comi muito. No domingo eu me quedei em casa. Eu me quedei em casa todo o dia. Tchau.",
              notes: [["adequacao", "No pregunta nada ni propone un programa: falta la mitad de la consigna; *Olá* y *Tchau* suenan secos para un amigo."],
                      ["gramatica", "*gosto praia* → *gosto da praia*: *gostar* pide *de*."],
                      ["lexico", "*me quedei* es castellano (→ *fiquei*), y encima dos veces seguidas; *eu* va en casi todas las frases, cuando el verbo ya dice quién es."]] } },
      { from: 27, task: "¿Conviene aprender un idioma con una aplicación o con un curso? Un párrafo para el debate de la clase.",
        hi: { grade: "5 de 5",
              t: "Na minha opinião, o aplicativo ajuda, mas não basta. Por um lado, dá para estudar todos os dias, até no ônibus, e aprender muito vocabulário. Por outro lado, nenhum aplicativo corrige a nossa pronúncia quando conversamos. Por isso, acho que o curso continua sendo necessário, pelo menos para praticar a conversa: na sala de aula a gente erra, ri e aprende com os outros. Portanto, o ideal é combinar os dois.",
              notes: [["adequacao", "Toma posición en la primera frase y la retoma al final: es un párrafo para un debate."],
                      ["coesao", "*Por um lado… por outro lado*, *por isso*, *portanto*."],
                      ["lexico", "Palabras precisas: *não basta*, *praticar a conversa*, *combinar*."]] },
        lo: { grade: "2 de 5",
              t: "Eu acho que o aplicativo é muito bom. O aplicativo é muito bom porque é muito fácil. O curso também é bom. O curso é bom porque tem professor. Eu uso o aplicativo todos os dias e eu gosto muito do aplicativo.",
              notes: [["adequacao", "Dice que los dos son buenos y no elige: en un debate falta la tesis."],
                      ["lexico", "*muito bom*, *o aplicativo* y *eu* se repiten; ni un matiz."],
                      ["coesao", "Todo se une con *porque* y *e*: faltan los conectores que ordenan (*por um lado*, *além disso*, *portanto*)."]] } },
      { from: 40, task: "Un e-mail formal a la prefeitura para quejarte del ruido de una obra en tu calle.",
        hi: { grade: "5 de 5",
              t: "Prezados senhores,\nmeu nome é Sofía Pérez e moro na Rua Bambina, 15, em Botafogo. Escrevo para informar que, há três semanas, a obra em frente ao meu prédio começa às seis da manhã, inclusive aos sábados. Como no prédio moram duas crianças pequenas e uma senhora idosa, solicito que verifiquem se o horário permitido está sendo respeitado. Além disso, agradeceria se pudessem me indicar a quem devo me dirigir caso o problema continue.\nAtenciosamente,\nSofía Pérez",
              notes: [["adequacao", "Enunciador (vecina, con dirección), interlocutor (la prefeitura), propósito (reclamar y pedir algo concreto) y formato de e-mail formal."],
                      ["coesao", "*Como*, *Além disso* y *caso* ordenan el pedido."],
                      ["gramatica", "*solicito que verifiquem*, *caso o problema continue*: subjuntivo bien usado."]] },
        lo: { grade: "2 de 5",
              t: "Oi, tudo bem? Eu escrevo porque a obra faz muito barulho. O barulho é muito forte e eu não posso dormir. Por favor, façam alguma coisa. Beijos!",
              notes: [["adequacao", "*Oi, tudo bem?* y *Beijos* a una prefeitura; no dice quién escribe, dónde vive ni desde cuándo."],
                      ["lexico", "*barulho* y *muito* dos veces; *façam alguma coisa* es vago (→ *solicito que verifiquem*)."],
                      ["coesao", "Tres frases sin conectores: falta el *como* que explica y el *além disso* que suma."]] } }
    ]
  };
  if (typeof module === "object" && module.exports) module.exports = DATA;
  root.GRILLA_DATA = DATA;
})(typeof window !== "undefined" ? window : globalThis);
