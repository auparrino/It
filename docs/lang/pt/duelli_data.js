/*
 * Duelos de Rumo C1: dos formas que compiten.  Solo los datos: la lógica
 * (sesión, pista, lados) está en el núcleo, docs/js/duelli.js, que lee
 * window.DUELLI_DATA.
 *
 * Dos formas que compiten, mezcladas en la misma sesión.
 *
 * Intercalar funciona cuando las categorías se parecen entre sí (Brunmair &
 * Richter 2019, g = 0,42, y más cuanto más parecidas); pedir que expliques
 * por qué suma (Bisra et al. 2018, g = 0,55).  Cada oración trae la pista
 * que decide («cue», un pedazo de la oración): después de elegir la forma,
 * «¿qué te lo dijo?».  Cada duelo se abre cuando las dos formas ya se
 * enseñaron («week», según tools/pt/curriculo.py).
 *
 * Los once duelos del portugués para hispanohablantes: ser/estar, por/para,
 * perfeito/imperfeito, perfeito simples/composto, seu/dele, indicativo/
 * subjuntivo, futuro do subjuntivo/infinitivo pessoal, la crase (à/a),
 * presente/futuro do subjuntivo (chegue/chegar) y la correlación de tiempos
 * (venha/viesse y tiver/tivesse).
 */
(function (root) {
  "use strict";

  // s: la oración con ___; a: la forma correcta; b: la que compite;
  // cue: lo que decide (un pedazo de la oración); why: la regla en una línea;
  // k: el lado del duelo (0 = la primera forma del título, 1 = la segunda).
  function A(s, a, b, cue, why) { return { s: s, a: a, b: b, cue: cue, why: why, k: 0 }; }
  function B(s, a, b, cue, why) { return { s: s, a: a, b: b, cue: cue, why: why, k: 1 }; }

  var DUELLI = [
    // Semana 1: solo ser, estar y ter, sin contracciones ni presente regular
    // (llegan en las semanas 3 y 5).  El contraste que de verdad hace
    // tropezar, con la misma regla que la lección: lugares fijos, ficar (lo
    // más seguro; también ser o estar); eventos, ser; personas, estar.  Los ítems nuevos van al final: el repaso guarda
    // las tarjetas por índice.
    { id: "serestar", week: 1, title: "ser o estar", sub: "lo que algo es, dónde queda, o cómo y dónde está", items: [
      A("Eu ___ argentino, de Buenos Aires.", "sou", "estou", "argentino", "Nacionalidad y origen: ser."),
      A("A Bia ___ médica e muito simpática.", "é", "está", "médica", "Profesión: ser."),
      A("O Rio ___ uma cidade muito bonita.", "é", "está", "cidade", "Definir, clasificar: ser."),
      A("O João e eu ___ irmãos e temos um gato.", "somos", "estamos", "irmãos", "Parentesco: ser."),
      A("A aula de português ___ hoje ou amanhã?", "é", "está", "aula", "Cuándo es un evento: ser."),
      A("Hoje ___ sábado, dia de feira.", "é", "está", "sábado", "Días y fechas: ser (*hoje é sábado*)."),
      A("Vocês ___ de Salvador ou de Recife?", "são", "estão", "de Salvador", "Origen: ser de."),
      A("O João ___ alto e muito simpático.", "é", "está", "simpático", "Rasgos de carácter y de aspecto: ser."),
      A("A casa grande ___ de uma amiga carioca.", "é", "está", "de uma amiga", "Posesión: ser de."),
      A("A festa ___ sábado, em Botafogo.", "é", "está", "festa", "Cuándo y dónde es un evento (una fiesta, un show): ser."),
      B("Eu ___ muito cansado hoje.", "estou", "sou", "hoje", "Un estado de ahora: estar."),
      B("Onde você ___ agora? Em Copacabana?", "está", "é", "agora", "Dónde está una persona: estar."),
      B("A sopa ___ fria, não quente.", "está", "é", "fria", "Un estado que cambió (se enfrió): estar."),
      B("A Bia e o João ___ em Ipanema agora.", "estão", "são", "agora", "Ubicación de personas: estar."),
      B("Cuidado, o café ___ muito quente!", "está", "é", "Cuidado", "Cómo está algo en este momento: estar."),
      B("Hoje o mar ___ calmo e azul.", "está", "é", "Hoje", "El mar de hoy, no el de siempre: estar."),
      B("Nós ___ com fome e com sede.", "estamos", "somos", "com fome", "*Estar com* fome, sede, frio, sono."),
      B("A Bia ___ doente e muito cansada hoje.", "está", "é", "doente", "Salud: estar."),
      B("Hoje o banco ___ fechado, e o metrô também.", "está", "é", "fechado", "Resultado, estado: estar + participio."),
      B("Hoje o céu ___ nublado em Copacabana.", "está", "é", "nublado", "El tiempo de hoy: estar."),
      A("A festa ___ em Botafogo, um bairro tranquilo.", "é", "está", "festa",
        "Un evento se ubica con ser: *a festa é em Botafogo*. Ficar queda para lo fijo: *o bairro fica longe*."),
      A("O show ___ em Copacabana, com a Bia.", "é", "está", "show",
        "Un evento se ubica con ser: *o show é em Copacabana*. Lo que no se mueve (el estadio), mejor ficar."),
      A("Onde ___ a reunião? Em Botafogo.", "é", "está", "reunião",
        "Un evento se ubica con ser: *onde é a reunião?* Para un lugar fijo, ficar: *onde fica o escritório?*"),
      A("O casamento ___ perto ou longe daqui?", "é", "está", "casamento",
        "Un evento, cerca o lejos: *é perto*, *é longe*. Ficar es para lugares fijos: *o hotel fica perto*."),
      B("O Martín ___ em Copacabana agora, com a Bia.", "está", "é", "agora",
        "Una persona se mueve: dónde está va con estar. El barrio, que no se mueve, va con ficar: *Copacabana fica no Rio*."),
      B("A Bia ___ em casa hoje, com o gato.", "está", "é", "em casa",
        "Dónde está una persona: estar (*estou em casa*). La casa, que no se mueve, *fica* en Botafogo.")
    ] },

    { id: "porpara", week: 9, title: "por o para", sub: "por dónde y por qué, o hacia dónde y para qué", items: [
      A("Vamos passear ___ Santa Teresa?", "por", "para", "passear", "Recorrer un lugar: por."),
      A("Obrigado ___ tudo, de verdade!", "por", "para", "Obrigado", "Agradecer: *obrigado por*."),
      A("Obrigado ___ convite, eu vou sim!", "pelo", "para o", "Obrigado", "Agradecer: *obrigado por* + *o* = *pelo*. «Por o» no existe."),
      A("Eu passo ___ Copacabana todos os dias.", "por", "para", "passo", "Pasar por un lugar: por."),
      A("Falo com a minha mãe ___ telefone.", "pelo", "para o", "telefone", "El medio: *pelo telefone* (o *por telefone*), con la contracción por + o."),
      A("A gente chega ___ volta das oito, beleza?", "por", "para", "volta das oito", "«A eso de las ocho» = *por volta das oito*: fórmula fija."),
      A("Obrigada ___ ajuda com a mudança!", "pela", "para a", "Obrigada", "*obrigada por* + *a* = *pela*: la contracción es obligatoria."),
      A("Custa ___ menos cem reais.", "pelo", "para o", "menos", "«Al menos, por lo menos» = *pelo menos*, sin «lo»."),
      A("Desculpa ___ não ligar ontem.", "por", "para", "Desculpa", "La causa: *desculpa por*."),
      A("Estou aqui ___ acaso, sem querer.", "por", "para", "acaso", "*Por acaso* = por casualidad."),
      B("Esse presente é ___ você, feliz aniversário!", "para", "por", "presente", "El destinatario: para."),
      B("Amanhã eu vou ___ São Paulo de ônibus.", "para", "por", "vou", "El destino: *ir para*."),
      B("Estudo português ___ morar no Brasil.", "para", "por", "morar", "Finalidad + infinitivo: para."),
      B("___ mim, o melhor bairro é Botafogo.", "Para", "Por", "mim", "Opinión: *para mim*."),
      B("Preciso do relatório ___ sexta-feira sem falta.", "para", "por", "sexta-feira", "El plazo: para."),
      B("Esse ônibus vai ___ o Centro?", "para", "por", "vai", "La dirección: *ir para*."),
      B("As flores são ___ a sua mãe.", "para", "por", "flores", "El destinatario: para."),
      B("Ele trabalha ___ uma empresa alemã.", "para", "por", "trabalha", "Para quién trabajás: para."),
      B("Esse remédio é ___ dor de cabeça.", "para", "por", "remédio", "Para qué sirve algo: para."),
      B("Falta pouco ___ o Carnaval do Rio de Janeiro.", "para", "por", "Falta pouco", "*Falta pouco para* = falta poco para.")
    ] },

    { id: "passado", week: 15, title: "perfeito o imperfeito", sub: "el hecho o el fondo", items: [
      A("Ontem eu ___ à praia com a Bia.", "fui", "ia", "Ontem", "Un hecho puntual y terminado: perfeito."),
      A("De repente, ___ a luz no prédio todo.", "acabou", "acabava", "De repente", "Lo que pasa de golpe: perfeito."),
      A("Em 2014, a Copa do Mundo ___ no Brasil.", "foi", "era", "Em 2014", "Un hecho fechado en el pasado: perfeito."),
      A("Semana passada nós ___ uma feijoada.", "comemos", "comíamos", "Semana passada", "Un hecho terminado: perfeito."),
      A("Enquanto eu cozinhava, o telefone de casa ___.", "tocou", "tocava", "Enquanto eu cozinhava", "Lo que interrumpe la acción en curso: perfeito."),
      A("Ele ___ três anos em Lisboa.", "morou", "morava", "três anos", "Un período cerrado, con su duración: perfeito."),
      A("Ontem à noite a gente ___ até tarde.", "dançou", "dançava", "Ontem à noite", "Un hecho terminado: perfeito."),
      A("Naquele dia, ___ tudo errado.", "deu", "dava", "Naquele dia", "Lo que pasó una vez: perfeito."),
      A("Ano passado eu ___ Machado de Assis pela primeira vez.", "li", "lia", "pela primeira vez", "Una vez, terminado: perfeito."),
      A("O Brasil ___ independente em 1822.", "ficou", "ficava", "em 1822", "Un cambio en una fecha: perfeito."),
      B("Quando eu era criança, ___ à praia todo domingo.", "ia", "fui", "todo domingo", "Hábito en el pasado: imperfeito."),
      B("Antigamente, a gente ___ em Niterói.", "morava", "morou", "Antigamente", "Cómo era antes: imperfeito."),
      B("Enquanto eu ___, o telefone tocou.", "cozinhava", "cozinhei", "Enquanto", "La acción en curso que otra interrumpe: imperfeito."),
      B("A casa dos meus avós ___ enorme e cheia de plantas.", "era", "foi", "enorme", "Una descripción: imperfeito."),
      B("Todo verão, nós ___ para Búzios.", "íamos", "fomos", "Todo verão", "Lo que se repetía: imperfeito."),
      B("Naquela época, ela sempre ___ cedo.", "acordava", "acordou", "sempre", "Hábito: imperfeito."),
      B("Eram oito horas e ___ muito no Centro.", "chovia", "choveu", "Eram oito horas", "El fondo de la escena: imperfeito."),
      B("Quando eu ___ pequeno, tinha medo do mar.", "era", "fui", "pequeno", "Edad y descripción en el pasado: imperfeito."),
      B("Naquela época, ele ___ na padaria da esquina.", "trabalhava", "trabalhou", "Naquela época", "Cómo eran las cosas: imperfeito."),
      B("O dia ___ lindo e o mar estava calmo.", "estava", "esteve", "o mar estava calmo", "Descripción del escenario: imperfeito.")
    ] },

    { id: "composto", week: 21, title: "perfeito simples o composto", sub: "comi o tenho comido", items: [
      A("Ontem eu ___ até as dez da noite.", "trabalhei", "tenho trabalhado", "Ontem", "Un hecho fechado: perfeito simples."),
      A("Você já ___ feijoada alguma vez?", "comeu", "tem comido", "já", "«¿Alguna vez…?», «ya…»: perfeito simples (*já comeu*), no «ha comido»."),
      A("Este ano eu ___ três vezes ao Rio.", "fui", "tenho ido", "três vezes", "Veces contadas: perfeito simples (*fui três vezes*)."),
      A("Hoje de manhã eu ___ um e-mail do chefe.", "recebi", "tenho recebido", "Hoje de manhã", "Una vez, hoy: perfeito simples («he recibido» = *recebi*)."),
      A("Ainda não ___ o filme novo do Walter Salles.", "vi", "tenho visto", "Ainda não", "*Ainda não* + perfeito simples: *ainda não vi*."),
      A("Nunca ___ tão bem como aqui!", "comi", "tenho comido", "Nunca", "*Nunca* + perfeito simples: «nunca he comido» = *nunca comi*."),
      A("Em 2019 eu ___ seis meses em Lisboa.", "morei", "tenho morado", "Em 2019", "Un período cerrado: perfeito simples."),
      A("Semana passada ___ com a Bia no telefone.", "falei", "tenho falado", "Semana passada", "Un hecho terminado: perfeito simples."),
      A("Quando você ___ ao Brasil pela primeira vez?", "veio", "tem vindo", "pela primeira vez", "Una vez: perfeito simples."),
      A("Já ___ ao Nordeste três vezes com a família.", "fui", "tenho ido", "três vezes", "Veces contadas: perfeito simples."),
      B("Ultimamente ___ muito, estou exausto.", "tenho trabalhado", "trabalhei", "Ultimamente", "Algo que se repite hasta hoy: perfeito composto."),
      B("Nos últimos meses, a gente ___ muito ao cinema.", "tem ido", "foi", "Nos últimos meses", "Una repetición que llega hasta hoy: perfeito composto."),
      B("Ultimamente ele ___ muito cansado, vive bocejando.", "tem estado", "esteve", "Ultimamente", "Un estado que dura hasta hoy: perfeito composto."),
      B("Você ___ o jornal ultimamente?", "tem lido", "leu", "ultimamente", "Hábito reciente: perfeito composto."),
      B("Desde janeiro, ___ português todos os dias.", "tenho estudado", "estudei", "Desde janeiro", "*Desde* + algo que sigue pasando: perfeito composto."),
      B("A inflação ___ mês após mês, e continua subindo.", "tem subido", "subiu", "continua subindo", "Un proceso que sigue: perfeito composto."),
      B("O que você ___ de bom ultimamente?", "tem feito", "fez", "ultimamente", "«¿Qué andás haciendo?»: perfeito composto."),
      B("Desde que cheguei ao Rio, ___ todo fim de semana.", "tem chovido", "choveu", "Desde que cheguei", "*Desde que* + repetición hasta hoy: perfeito composto."),
      B("Ultimamente a gente ___ pouco, né?", "tem se falado", "se falou", "Ultimamente", "Algo que viene pasando: perfeito composto."),
      B("Desde o Carnaval, ela ___ muito na academia.", "tem malhado", "malhou", "Desde o Carnaval", "*Desde* + hábito que sigue: perfeito composto.")
    ] },

    { id: "seudele", week: 10, title: "seu o dele", sub: "de você o de otro", items: [
      A("Martín, essa mochila é ___?", "sua", "dela", "Martín", "Le hablás a Martín (você): *sua*."),
      A("Senhor, esse guarda-chuva é ___?", "seu", "dele", "Senhor", "Con *o senhor* también va *seu*: le hablás a él."),
      A("Bia, esses óculos são ___?", "seus", "dela", "Bia", "Le hablás a Bia: *seus* (de você)."),
      A("Dona Ana, essa bolsa é ___?", "sua", "dela", "Dona Ana", "Le hablás a la señora: *sua*."),
      A("Você tem caneta? Essa caneta azul é ___?", "sua", "dele", "Você tem", "Hablás con você: *sua*."),
      A("Moço, esse celular no chão é ___?", "seu", "dele", "Moço", "Le hablás al muchacho: *seu*."),
      A("Rafa, essas chaves na mesa são ___?", "suas", "dele", "Rafa", "Le hablás a Rafa: *suas*."),
      A("Oi, Lucas! Esse cachorro lindo é ___?", "seu", "dele", "Lucas", "Le hablás a Lucas: *seu*."),
      A("Senhora, essa mala grande é ___?", "sua", "dela", "Senhora", "Le hablás a la señora: *sua*."),
      A("Você está com frio? Esse casaco é ___?", "seu", "dele", "Você está com frio", "Hablás con você: *seu*."),
      B("A Bia está procurando a mochila. Essa mochila é ___?", "dela", "sua", "A Bia está procurando", "Hablás de Bia, no con ella: *dela* (evita la ambigüedad de *sua*)."),
      B("O João mora aqui. Esse carro é ___.", "dele", "seu", "O João mora aqui", "Hablás de João: *dele*."),
      B("Os meninos jogam bola na praia. A bola é ___.", "deles", "sua", "Os meninos", "De ellos: *deles*."),
      B("A Ana e a Clara estão no quiosque. As cadeiras são ___.", "delas", "suas", "A Ana e a Clara", "De ellas: *delas*."),
      B("Meu vizinho tem um cachorro enorme. O cachorro é ___.", "dele", "seu", "Meu vizinho", "De él: *dele*."),
      B("A professora está na sala. Esse livro é ___.", "dela", "seu", "A professora", "De ella: *dela*."),
      B("Meus pais têm uma casa em Búzios. A casa é ___.", "deles", "sua", "Meus pais", "De ellos: *deles*."),
      B("Aquele moço ali procura o celular. O celular é ___.", "dele", "seu", "Aquele moço", "De él: *dele*."),
      B("A Sofía toca violão. Esse violão é ___.", "dela", "seu", "A Sofía", "De ella: *dela*."),
      B("Os turistas procuram as malas. As malas são ___.", "deles", "suas", "Os turistas", "De ellos: *deles*.")
    ] },

    { id: "subjuntivo", week: 23, title: "indicativo o subjuntivo", sub: "lo que se afirma o lo que se desea", items: [
      A("Acho que ele ___ razão.", "tem", "tenha", "Acho que", "*Achar que* afirmativo: indicativo (a diferencia de *não acho que*)."),
      A("Sei que você ___ ocupado hoje.", "está", "esteja", "Sei que", "Un hecho que sabés: indicativo."),
      A("Tenho certeza de que ela ___ amanhã.", "vem", "venha", "Tenho certeza", "Certeza: indicativo."),
      A("É verdade que o Rio ___ lindo no inverno.", "é", "seja", "É verdade", "Un hecho: indicativo."),
      A("Parece que ___ chover mais tarde.", "vai", "vá", "Parece que", "*Parece que* + indicativo."),
      A("Vejo que vocês ___ cansados hoje.", "estão", "estejam", "Vejo que", "Lo que ves: indicativo."),
      A("Com certeza ele ___ amanhã cedo.", "vem", "venha", "Com certeza", "Certeza: indicativo."),
      A("Acredito que o show ___ às nove.", "começa", "comece", "Acredito que", "*Acreditar que* afirmativo: indicativo."),
      A("É claro que a gente ___ ir junto.", "pode", "possa", "É claro", "Evidencia: indicativo."),
      A("Ele diz que ___ muito cansado.", "está", "esteja", "diz que", "Lo que alguien afirma: indicativo."),
      B("Espero que você ___ bem.", "esteja", "está", "Espero que", "Deseo: subjuntivo."),
      B("Quero que vocês ___ cedo amanhã.", "cheguem", "chegam", "Quero que", "Querer que otro haga algo: subjuntivo."),
      B("Talvez ela ___ hoje à noite.", "venha", "vem", "Talvez", "*Talvez* antes del verbo: subjuntivo."),
      B("Duvido que ele ___ a verdade.", "saiba", "sabe", "Duvido que", "Duda: subjuntivo."),
      B("É importante que a gente ___ junto.", "fique", "fica", "É importante que", "Juicio de valor: subjuntivo."),
      B("Não acho que ___ uma boa ideia.", "seja", "é", "Não acho", "*Achar* negado: subjuntivo."),
      B("Tomara que não ___ no fim de semana!", "chova", "chove", "Tomara", "*Tomara que* + subjuntivo."),
      B("É possível que o voo ___ atrasado.", "esteja", "está", "É possível", "Posibilidad: subjuntivo."),
      B("Peço que você ___ a porta, por favor.", "feche", "fecha", "Peço que", "Pedido: subjuntivo."),
      B("Sinto muito que você ___ doente.", "esteja", "está", "Sinto muito", "Sentimiento sobre algo: subjuntivo.")
    ] },

    { id: "futinf", week: 29, title: "futuro do subjuntivo o infinitivo pessoal", sub: "quando vocês fizerem o para vocês fazerem", items: [
      A("Quando você ___ ao Rio, me avisa.", "for", "ir", "Quando", "*Quando* + futuro: futuro do subjuntivo (*for*)."),
      A("Se vocês ___ tempo, passem lá em casa.", "tiverem", "terem", "Se", "*Se* + futuro: futuro do subjuntivo (*tiverem*)."),
      A("Assim que eu ___ o resultado, te ligo.", "souber", "saber", "Assim que", "*Assim que* + futuro: futuro do subjuntivo."),
      A("Faça como você ___, tanto faz.", "quiser", "querer", "como", "*Como* + futuro: futuro do subjuntivo (*como quiser*)."),
      A("Se a gente ___, a gente vai.", "puder", "poder", "Se", "*Se* + futuro: futuro do subjuntivo (*puder*)."),
      A("Quem ___ a resposta levanta a mão.", "souber", "saber", "Quem", "*Quem* + futuro: futuro do subjuntivo."),
      A("Sempre que você ___ ao Brasil, fique aqui em casa.", "vier", "vir", "Sempre que", "*Sempre que* + futuro: futuro do subjuntivo de *vir* (*vier*)."),
      A("Enquanto eu ___ aqui, pode contar comigo.", "estiver", "estar", "Enquanto", "*Enquanto* + futuro: futuro do subjuntivo."),
      A("Se ele ___ isso de novo, vou embora.", "disser", "dizer", "Se", "*Se* + futuro: futuro do subjuntivo (*disser*)."),
      A("Quando vocês ___ o trabalho, me mandem.", "fizerem", "fazerem", "Quando", "*Quando* + futuro: futuro do subjuntivo (*fizerem*)."),
      B("Liguei para vocês ___ as notícias por mim.", "saberem", "souberem", "para", "Después de preposición: infinitivo pessoal."),
      B("Antes de nós ___ embora, vamos jantar.", "irmos", "formos", "Antes de", "*Antes de* + infinitivo pessoal."),
      B("É melhor vocês ___ o que aconteceu.", "saberem", "souberem", "É melhor", "*É melhor* + infinitivo pessoal."),
      B("Comprei ingressos para nós ___ o show.", "vermos", "virmos", "para", "*Para* + infinitivo pessoal de *ver* (*vermos*); *virmos* es el futuro do subjuntivo."),
      B("Depois de vocês ___ o trabalho, podem sair.", "fazerem", "fizerem", "Depois de", "*Depois de* + infinitivo pessoal."),
      B("Sem eles ___ nada, a gente não decide.", "dizerem", "disserem", "Sem", "*Sem* + infinitivo pessoal."),
      B("É importante os alunos ___ presentes.", "estarem", "estiverem", "É importante", "*É importante* + infinitivo pessoal."),
      B("Até vocês ___ a resposta, esperem aqui.", "terem", "tiverem", "Até", "*Até* + infinitivo pessoal (o *até que* + subjuntivo presente)."),
      B("O professor pediu para os alunos ___ cedo.", "virem", "vierem", "pediu para", "*Pedir para* + infinitivo pessoal de *vir* (*virem*)."),
      B("Ao ___ a notícia, eles ficaram felizes.", "saberem", "souberem", "Ao", "*Ao* + infinitivo pessoal = al + infinitivo.")
    ] },

    { id: "crase", week: 36, title: "à o a", sub: "la crase: a + a", items: [
      A("Vou ___ praia de Ipanema no domingo.", "à", "a", "praia", "*Ir a* + *a praia*: à."),
      A("Cheguei ___ reunião meia hora atrasado.", "à", "a", "reunião", "*Chegar a* + *a reunião*: à."),
      A("A loja abre ___ nove horas.", "às", "as", "nove horas", "La hora exacta: às."),
      A("Entreguei o documento ___ secretária.", "à", "a", "secretária", "*Entregar a* + *a secretária*: à."),
      A("Fomos ___ festa da Bia no sábado.", "à", "a", "festa", "*Ir a* + *a festa*: à."),
      A("Assisti ___ peça no teatro municipal.", "à", "a", "Assisti", "*Assistir a* + *a peça*: à."),
      A("Refiro-me ___ situação atual do país.", "à", "a", "Refiro-me", "*Referir-se a* + *a situação*: à."),
      A("Todos devem obedecer ___ lei.", "à", "a", "obedecer", "*Obedecer a* + *a lei*: à."),
      A("Fui ___ Bahia no Carnaval.", "à", "a", "Bahia", "*A Bahia* lleva artículo: *vou à Bahia*."),
      A("Pedi um bife ___ milanesa com arroz.", "à", "a", "milanesa", "*À moda de*: à milanesa, à baiana."),
      B("Vou ___ Lisboa em julho.", "a", "à", "Lisboa", "*Lisboa* no lleva artículo (*venho de Lisboa*): sin crase."),
      B("De repente, começou ___ chover.", "a", "à", "chover", "Ante verbo nunca hay crase."),
      B("Fui ___ esta praia uma vez.", "a", "à", "esta", "Ante *esta* / *essa*, sin crase."),
      B("Ela chegou ___ pé na praia.", "a", "à", "pé", "Ante masculino no hay crase."),
      B("Entreguei o livro ___ ela ontem.", "a", "à", "ela", "Ante pronombre personal, sin crase."),
      B("Estou disposto ___ ajudar vocês.", "a", "à", "ajudar", "Ante infinitivo, sin crase."),
      B("Vendem roupas ___ preços baixos.", "a", "à", "preços", "Ante masculino plural, sin crase."),
      B("Amanhã vou ___ Copacabana.", "a", "à", "Copacabana", "*Copacabana* no lleva artículo (*volto de Copacabana*): sin crase."),
      B("Ele foi ___ uma festa ontem.", "a", "à", "uma", "Ante *uma* (artículo indefinido), sin crase."),
      B("Escrevi ___ você ontem à noite.", "a", "à", "você", "Ante *você*, sin crase.")
    ] },

    // Semana 27: el error más típico del hispanohablante (*quando eu chegue,
    // *se você possa).  Mismo verbo de los dos lados: lo que decide es el
    // disparador (espero que, talvez, é importante que → presente; quando,
    // se, assim que, depois que → futuro), no el castellano, que dice
    // presente de subjuntivo o, con «si», indicativo.
    { id: "futpres", week: 27, title: "chegue o chegar", sub: "presente o futuro do subjuntivo", items: [
      A("Espero que você ___ bem.", "chegue", "chegar", "Espero que", "*Esperar que* (deseo) + presente do subjuntivo: *chegue*."),
      A("Talvez ele ___ amanhã.", "venha", "vier", "Talvez", "*Talvez* (duda) + presente do subjuntivo: *venha*."),
      A("Quero que vocês ___ a verdade.", "saibam", "souberem", "Quero que", "*Querer que* + presente do subjuntivo: *saibam*."),
      A("É importante que você ___ o contrato.", "leia", "ler", "É importante que", "*É importante que* + presente do subjuntivo: *leia*."),
      A("Tomara que ___ sol no domingo.", "faça", "fizer", "Tomara que", "*Tomara que* (ojalá) + presente do subjuntivo: *faça*."),
      A("Duvido que ela ___ dinheiro para isso.", "tenha", "tiver", "Duvido que", "*Duvidar que* (duda) + presente do subjuntivo: *tenha*."),
      A("É melhor que a gente ___ cedo.", "saia", "sair", "É melhor que", "*É melhor que* + presente do subjuntivo: *saia* (con *a gente*, tercera)."),
      A("Embora ele ___ cansado, vai à festa.", "esteja", "estiver", "Embora", "*Embora* (concesión) pide presente do subjuntivo, nunca futuro: *esteja*."),
      A("Vamos embora antes que ___.", "chova", "chover", "antes que", "*Antes que* pide presente do subjuntivo: *antes que chova*, no futuro."),
      A("A gente espera aqui até que ele ___.", "chegue", "chegar", "até que", "*Até que* pide presente do subjuntivo: *até que ele chegue* (o *até ele chegar*, infinitivo)."),
      B("Quando você ___, me liga.", "chegar", "chegue", "Quando", "*Quando* + algo que todavía no pasó: futuro do subjuntivo, nunca «quando você chegue»."),
      B("Se ele ___ amanhã, a gente sai.", "vier", "venha", "Se", "*Se* + condición futura: futuro do subjuntivo (*vieram → vier*)."),
      B("Assim que vocês ___ a verdade, me contem.", "souberem", "saibam", "Assim que", "*Assim que* (en cuanto) + futuro: futuro do subjuntivo (*souberam → souberem*)."),
      B("Depois que você ___ o contrato, assina.", "ler", "leia", "Depois que", "*Depois que* + algo por venir: futuro do subjuntivo (*ler*, igual al infinitivo)."),
      B("Se ___ sol no domingo, a gente vai à praia.", "fizer", "faça", "Se", "*Se* + condición futura: *fizer* (*fizeram → fizer*), nunca «se faça»."),
      B("Enquanto ela ___ dinheiro, vai continuar viajando.", "tiver", "tenha", "Enquanto", "*Enquanto* (mientras) + futuro: futuro do subjuntivo (*tiver*)."),
      B("Quem ___ por último apaga a luz.", "sair", "saia", "Quem", "*Quem* + algo por venir (quien salga): futuro do subjuntivo, no «quem saia»."),
      B("Como você ___, a gente faz.", "quiser", "queira", "Como", "*Como* + algo por decidir (como quieras): futuro do subjuntivo (*quiser*)."),
      B("Se ___ amanhã, o jogo vai ser cancelado.", "chover", "chova", "Se", "*Se* + condición futura: *chover* (igual al infinitivo), no «se chova»."),
      B("Logo que o ônibus ___, te aviso.", "chegar", "chegue", "Logo que", "*Logo que* (apenas) + futuro: futuro do subjuntivo (*chegar*).")
    ] },

    // Semana 28: la correlación de tiempos.  La principal manda: presente →
    // presente do subjuntivo; pasado o condicional → imperfeito do
    // subjuntivo.  El rioplatense dice «quería que vengas», «me pidió que
    // traiga»: el portugués no lo admite.
    { id: "venhaviesse", week: 28, title: "venha o viesse", sub: "la principal en presente o en pasado", items: [
      A("Quero que você ___ à festa.", "venha", "viesse", "Quero", "Principal en presente → presente do subjuntivo: *quero que venha*."),
      A("Espero que eles ___ do presente.", "gostem", "gostassem", "Espero", "*Espero* (presente) → *gostem*."),
      A("É importante que todos ___ a verdade.", "saibam", "soubessem", "É importante", "*É importante* (presente) → presente do subjuntivo: *saibam*."),
      A("Peço que o senhor ___ aqui.", "assine", "assinasse", "Peço", "*Peço* (presente) → *assine*."),
      A("Ela vai pedir que eu ___ o vinho.", "traga", "trouxesse", "vai pedir", "*Vai pedir* (futuro) → presente do subjuntivo: *traga*."),
      B("Queria que você ___ à festa.", "viesse", "venha", "Queria", "Principal en pasado → imperfeito do subjuntivo: *queria que viesse*, no «que venha»."),
      B("Esperava que eles ___ do presente.", "gostassem", "gostem", "Esperava", "*Esperava* (pasado) → *gostassem*."),
      B("Seria importante que todos ___ a verdade.", "soubessem", "saibam", "Seria", "Condicional (*seria*) → imperfeito do subjuntivo: *soubessem*."),
      B("Pedi que o senhor ___ ali.", "assinasse", "assine", "Pedi", "*Pedi* (pasado) → *assinasse*. «Le pedí que firme» no pasa al portugués."),
      B("Ela pediu que eu ___ o vinho.", "trouxesse", "traga", "pediu", "*Pediu* (pasado) → *trouxesse* (trouxeram → trouxesse), no «que eu traga»."),
      A("Duvido que ele ___ a tempo.", "chegue", "chegasse", "Duvido", "*Duvido* (presente) → presente do subjuntivo: *chegue*."),
      A("Prefiro que vocês ___ de ônibus.", "venham", "viessem", "Prefiro", "*Prefiro* (presente) → *venham*."),
      A("Ela insiste que eu ___ cedo.", "saia", "saísse", "insiste", "*Insiste* (presente) → presente do subjuntivo: *saia*."),
      B("Duvidei que ele ___ a tempo.", "chegasse", "chegue", "Duvidei", "*Duvidei* (pasado) → imperfeito do subjuntivo: *chegasse*."),
      B("Preferia que vocês ___ de ônibus.", "viessem", "venham", "Preferia", "*Preferia* (pasado, o el condicional del habla) → *viessem*."),
      B("Ela insistiu que eu ___ cedo.", "saísse", "saia", "insistiu", "*Insistiu* (pasado) → *saísse*."),
      A("Exijo que vocês ___ silêncio.", "façam", "fizessem", "Exijo", "*Exijo* (presente) → presente do subjuntivo: *façam*."),
      A("É melhor que ele ___ o ônibus das oito.", "pegue", "pegasse", "É melhor", "*É melhor* (presente) → *pegue*."),
      B("Exigiu que vocês ___ silêncio.", "fizessem", "façam", "Exigiu", "*Exigiu* (pasado) → *fizessem*."),
      B("Seria melhor que ele ___ o ônibus das oito.", "pegasse", "pegue", "Seria melhor", "*Seria* (condicional) → *pegasse*.")
    ] },

    // Semana 28: la condición real (se tiver → vou) o imaginada (se tivesse
    // → iria).  Lo que decide es la otra mitad de la frase.
    { id: "tivertivesse", week: 28, title: "tiver o tivesse", sub: "condición real o imaginada", items: [
      A("Se eu ___ tempo amanhã, vou à praia.", "tiver", "tivesse", "vou", "Del otro lado, *vou* (real, futuro): *se* + futuro do subjuntivo, *tiver*."),
      A("Se você ___ dúvidas, me liga.", "tiver", "tivesse", "me liga", "Pedido real para después: *se você tiver*."),
      A("Quando eles ___ dinheiro, vão viajar.", "tiverem", "tivessem", "vão viajar", "*Vão viajar*: algo que puede pasar → futuro do subjuntivo, *tiverem*."),
      A("Se a gente ___ sorte, chega antes da chuva.", "tiver", "tivesse", "chega", "*Chega* (presente con valor de futuro): condición real → *tiver*."),
      A("Se ___ vaga no hotel, eu te aviso.", "houver", "houvesse", "te aviso", "*Te aviso*: real → futuro do subjuntivo de *haver*, *houver*."),
      B("Se eu ___ tempo, iria à praia.", "tivesse", "tiver", "iria", "Del otro lado, *iria* (condicional): hipótesis → imperfeito do subjuntivo, *tivesse*."),
      B("Se ela ___ mais paciência, seria uma ótima professora.", "tivesse", "tiver", "seria", "*Seria*: algo imaginado → *tivesse*."),
      B("Se nós ___ um carro, viajaríamos mais.", "tivéssemos", "tivermos", "viajaríamos", "*Viajaríamos* → *tivéssemos* (con tilde)."),
      B("Se ___ vaga no hotel, eu te avisaria.", "houvesse", "houver", "avisaria", "*Avisaria* (condicional) → *houvesse*."),
      B("Se eles ___ dinheiro, iam viajar.", "tivessem", "tiverem", "iam viajar", "*Iam* es el condicional del habla (*iriam*): sigue siendo hipótesis → *tivessem*."),
      A("Se vocês ___ tempo no sábado, passem lá em casa.", "tiverem", "tivessem", "passem", "*Passem* (una invitación real) → futuro do subjuntivo: *tiverem*."),
      A("Se o tempo ___ bom, a gente faz churrasco.", "estiver", "estivesse", "faz", "*Faz* (presente con valor de futuro): condición real → *estiver*."),
      A("Se eu ___ o resultado amanhã, te conto.", "souber", "soubesse", "te conto", "*Te conto*: real → *souber*, futuro do subjuntivo de *saber*."),
      B("Se vocês ___ tempo, passariam lá em casa?", "tivessem", "tiverem", "passariam", "*Passariam* (condicional) → hipótesis: *tivessem*."),
      B("Se o tempo ___ bom, a gente faria churrasco.", "estivesse", "estiver", "faria", "*Faria*: algo imaginado → *estivesse*."),
      B("Se eu ___ o resultado da prova, te contaria.", "soubesse", "souber", "contaria", "*Contaria* (condicional) → *soubesse*."),
      A("Se vocês ___ ir, avisem antes.", "puderem", "pudessem", "avisem", "*Avisem* (un pedido real) → futuro do subjuntivo: *puderem*."),
      A("Se ela ___ cedo, a gente almoça junto.", "chegar", "chegasse", "almoça", "*Almoça* (presente con valor de futuro): real → *chegar*."),
      B("Se vocês ___ ir, avisariam antes?", "pudessem", "puderem", "avisariam", "*Avisariam* (condicional) → hipótesis: *pudessem*."),
      B("Se ela ___ cedo, a gente almoçaria junto.", "chegasse", "chegar", "almoçaria", "*Almoçaria* (condicional) → *chegasse*.")
    ] },

    // Semana 24: el conector decide el modo.  Causa o tiempo pasado
    // (já que, como, porque, depois que, desde que + pasado): indicativo.
    // Concesión, condición y finalidad (embora, mesmo que, caso, desde que
    // = «siempre que», a menos que, para que): subjuntivo.
    { id: "conectores", week: 24, title: "indicativo o subjuntivo según el conector", sub: "já que você está o embora você esteja", items: [
      A("Já que você ___ aqui, me ajuda com a mala.", "está", "esteja", "Já que", "*Já que* da una causa conocida: indicativo."),
      A("Como hoje ___ feriado, o banco está fechado.", "é", "seja", "Como", "*Como* causal (al principio, «como»): indicativo."),
      A("Vou ficar em casa porque ___ cansado.", "estou", "esteja", "porque", "*Porque* da la causa, un hecho: indicativo. «Porque esteja» es error."),
      A("Depois que ele ___, a festa acabou.", "saiu", "saia", "Depois que", "*Depois que* con pasado: indicativo."),
      A("Desde que eu ___ ao Rio, só chove.", "cheguei", "chegue", "só chove", "*Desde que* de tiempo («desde que llegué»), con algo que ya pasó: indicativo."),
      A("Já que vocês ___ cedo, podem escolher a mesa.", "chegaram", "cheguem", "Já que", "*Já que* + un hecho: indicativo."),
      B("Embora ___ caro, vale a pena.", "seja", "é", "Embora", "*Embora* pide subjuntivo aunque sea un hecho (en castellano, «aunque es caro»)."),
      B("Mesmo que ___ amanhã, o bloco sai.", "chova", "chove", "Mesmo que", "*Mesmo que* + subjuntivo."),
      B("Caso você ___ de ajuda, me liga.", "precise", "precisa", "Caso", "*Caso* + presente do subjuntivo."),
      B("Pode ir à festa, desde que ___ cedo.", "volte", "volta", "Pode ir", "*Desde que* de condición («siempre que»): subjuntivo. Lo dice *pode ir*: un permiso con condición."),
      B("Vamos à praia, a menos que ___.", "chova", "chove", "a menos que", "*A menos que* + subjuntivo."),
      B("Vou explicar de novo para que todos ___.", "entendam", "entendem", "para que", "Finalidad con otro sujeto: *para que* + subjuntivo."),
      A("Visto que o prazo ___ amanhã, vamos correr.", "termina", "termine", "Visto que", "*Visto que* da una causa conocida: indicativo."),
      A("Enquanto você ___ a louça, eu arrumo a sala.", "lava", "lave", "Enquanto", "*Enquanto* para algo que pasa ahora, al mismo tiempo: indicativo."),
      B("Ainda que ___ cansada, ela foi trabalhar.", "estivesse", "estava", "Ainda que", "*Ainda que* (aunque) pide subjuntivo aunque sea un hecho: *estivesse*."),
      B("Contanto que você ___ o trabalho, pode sair mais cedo.", "termine", "termina", "Contanto que", "*Contanto que* (siempre que, con condición) + subjuntivo."),
      A("Ela sempre chega atrasada porque ___ longe.", "mora", "more", "porque", "*Porque* da la causa, un hecho: indicativo."),
      A("Ontem, assim que ele ___, começamos a reunião.", "chegou", "chegue", "Ontem", "*Ontem*: ya pasó → indicativo, *chegou*."),
      B("Por mais que ___, não consigo dormir.", "tente", "tento", "Por mais que", "*Por mais que* (por más que) + subjuntivo."),
      B("Antes que ___ tarde, vamos embora.", "fique", "fica", "Antes que", "*Antes que* + subjuntivo.")
    ] }
  ];

  root.DUELLI_DATA = { DUELLI: DUELLI };
})(typeof window !== "undefined" ? window : globalThis);
