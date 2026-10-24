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
 * Los duelos del portugués para hispanohablantes: ser/estar, por/para,
 * perfeito/imperfeito, perfeito simples/composto, seu/dele, indicativo/
 * subjuntivo, futuro do subjuntivo/infinitivo pessoal, la crase (à/a),
 * presente/futuro do subjuntivo (chegue/chegar), la correlación de tiempos
 * (venha/viesse y tiver/tivesse) y los conectores.  La Tanda 4 suma los
 * pares de cada temporada: muito/muita, tem/têm, no/em, fui/foi, vi/vim,
 * fale/fala (T1); o/lhe, falará/vai falar, tudo/todo, foi/está + participio,
 * tinha prendido/foi preso, estar/ficar (T2); tivesse/teria, ia/iria,
 * vende-se/vendem-se, há/a (T3); saíra/saísse, tinha/tenho feito, o/lhe en
 * la carta formal, alegar/reconhecer, norma/habla y próclise/ênclise (T4).
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
    ] },

    // ---------------------------------------------------------------
    // Tanda 4: los pares de cada temporada.  Cada duelo se abre en la
    // semana en que se enseña su par y desde ahí entra en Estación y en el
    // repaso.
    // ---------------------------------------------------------------

    // Semana 4: muito delante de un adjetivo (muy, no cambia) o de un
    // sustantivo (mucho, concuerda).  Solo ser, estar y ter: el presente
    // regular llega en la 5.
    { id: "muitomuita", week: 4, title: "muito o muita", sub: "muy (no cambia) o mucho (concuerda)", items: [
      A("A praia de Ipanema é ___ bonita.", "muito", "muita", "bonita", "Delante de un adjetivo, *muito* = muy: no cambia (*muito bonita*)."),
      A("As meninas são ___ simpáticas.", "muito", "muitas", "simpáticas", "*simpáticas* es un adjetivo: *muito* no cambia, aunque sean ellas."),
      A("A casa está ___ suja hoje.", "muito", "muita", "suja", "Delante de un adjetivo (*suja*): *muito*, invariable."),
      A("Os quartos são ___ grandes.", "muito", "muitos", "grandes", "*muito grandes* = muy grandes: delante de un adjetivo no se pone en plural."),
      A("A Bia está ___ cansada.", "muito", "muita", "cansada", "*cansada* es un adjetivo: *muito cansada*, nunca «muita cansada»."),
      A("As ruas de Santa Teresa são ___ antigas.", "muito", "muitas", "antigas", "Delante de un adjetivo (*antigas*): *muito*, sin plural."),
      A("A água do mar está ___ fria.", "muito", "muita", "fria", "*fria* es un adjetivo: *muito fria* (muy fría)."),
      A("As praias do Rio são ___ lindas.", "muito", "muitas", "lindas", "*muito lindas* = muy lindas: *muito* no concuerda con un adjetivo."),
      A("A sopa está ___ quente.", "muito", "muita", "quente", "Delante de un adjetivo (*quente*): *muito*."),
      A("As amigas da Bia são ___ altas.", "muito", "muitas", "altas", "*altas* es un adjetivo: *muito altas*."),
      B("Tem ___ gente na praia hoje.", "muita", "muito", "gente", "Delante de un sustantivo, *muito* concuerda: *gente* es femenino → *muita gente*."),
      B("Estou com ___ fome.", "muita", "muito", "fome", "*fome* es un sustantivo femenino: *muita fome* (mucha hambre)."),
      B("O João tem ___ amigas no Rio.", "muitas", "muito", "amigas", "Delante de un sustantivo (*amigas*): *muitas*, femenino plural."),
      B("Hoje tem ___ ondas no mar.", "muitas", "muito", "ondas", "*ondas* es un sustantivo: *muitas ondas* (muchas olas)."),
      B("A Bia tem ___ livros em casa.", "muitos", "muito", "livros", "Delante de un sustantivo (*livros*): *muitos*, masculino plural."),
      B("Estamos com ___ sede.", "muita", "muito", "sede", "*sede* (sed) es femenino: *muita sede*."),
      B("Tem ___ turistas em Copacabana.", "muitos", "muito", "turistas", "Delante de un sustantivo plural: *muitos turistas*."),
      B("O bairro tem ___ praças bonitas.", "muitas", "muito", "praças", "*praças* es un sustantivo: *muitas praças* (el adjetivo viene después)."),
      B("Eles têm ___ filhos?", "muitos", "muito", "filhos", "Delante de un sustantivo (*filhos*): *muitos*."),
      B("Estou com ___ saudade do Rio.", "muita", "muito", "saudade", "*saudade* es femenino: *muita saudade*.")
    ] },

    // Semana 6: tem / têm, vem / vêm.  El circunflejo marca el plural.
    { id: "temtem", week: 6, title: "tem o têm", sub: "uno o varios: también vem / vêm", items: [
      A("A Bia ___ dois irmãos.", "tem", "têm", "A Bia", "Una persona (*a Bia*): *tem*, sin tilde."),
      A("O apartamento ___ três quartos.", "tem", "têm", "apartamento", "Un sujeto en singular (*o apartamento*): *tem*."),
      A("Você ___ tempo amanhã?", "tem", "têm", "Você", "*você* conjuga como *ele*: *tem*, sin tilde."),
      A("A gente ___ aula às oito.", "tem", "têm", "A gente", "*a gente* va con el verbo en singular: *a gente tem*."),
      A("O ônibus da escola ___ às sete.", "vem", "vêm", "ônibus", "Un sujeto en singular (*o ônibus*): *vem*, sin tilde."),
      A("A professora ___ amanhã de Salvador.", "vem", "vêm", "professora", "Una persona (*a professora*): *vem*."),
      A("Você ___ à festa no sábado?", "vem", "vêm", "Você", "*você* + tercera del singular: *você vem*."),
      A("O João ___ de bicicleta para a aula.", "vem", "vêm", "João", "Una persona (*o João*): *vem*."),
      A("Ela ___ muita sorte.", "tem", "têm", "Ela", "*ela*: singular, *tem*."),
      A("A gente ___ de metrô todos os dias.", "vem", "vêm", "A gente", "*a gente* (= nosotros) va en singular: *a gente vem*."),
      B("Eles ___ dois filhos.", "têm", "tem", "Eles", "*eles, elas, vocês*: *têm*, con circunflejo. Sin él, es singular."),
      B("Os meninos ___ fome depois da praia.", "têm", "tem", "meninos", "Sujeto en plural (*os meninos*): *têm*."),
      B("Vocês ___ carro aqui no Rio?", "têm", "tem", "Vocês", "*vocês* conjuga como *eles*: *têm*."),
      B("As meninas ___ aula de manhã.", "têm", "tem", "meninas", "Sujeto en plural (*as meninas*): *têm*."),
      B("Os primos da Bia ___ amanhã.", "vêm", "vem", "primos", "Sujeto en plural (*os primos*): *vêm*, con circunflejo."),
      B("Eles ___ de Recife no sábado.", "vêm", "vem", "Eles", "*eles*: *vêm* (plural de *vem*)."),
      B("Vocês ___ jantar com a gente?", "vêm", "vem", "Vocês", "*vocês* + tercera del plural: *vêm*."),
      B("As amigas da Ana ___ de avião.", "vêm", "vem", "amigas", "Sujeto en plural (*as amigas*): *vêm*."),
      B("Os turistas ___ muitas dúvidas sobre o Rio.", "têm", "tem", "turistas", "Sujeto en plural (*os turistas*): *têm*."),
      B("O João e a Bia ___ de táxi hoje.", "vêm", "vem", "O João e a Bia", "Dos sujetos (*o João e a Bia*) = ellos: *vêm*.")
    ] },

    // Semana 9: lugares con artículo (no Leblon, na Lapa, no Brasil) o sin
    // artículo (em Copacabana, em Portugal, em São Paulo).
    { id: "noem", week: 9, title: "no o em", sub: "lugares con artículo o sin artículo", items: [
      A("Moro ___ Leblon, perto da praia.", "no", "em", "Leblon", "*o Leblon* lleva artículo: *no Leblon*."),
      A("A gente janta ___ Lapa hoje.", "na", "em", "Lapa", "*a Lapa* lleva artículo: *na Lapa*."),
      A("Ela trabalha ___ Tijuca.", "na", "em", "Tijuca", "*a Tijuca* lleva artículo: *na Tijuca*."),
      A("O João estuda ___ Rio.", "no", "em", "Rio", "*o Rio* lleva artículo: *no Rio, do Rio*."),
      A("Eles moram ___ Brasil agora.", "no", "em", "Brasil", "*o Brasil* lleva artículo: *no Brasil* (pero *em Portugal*)."),
      A("A Bia mora ___ Bahia.", "na", "em", "Bahia", "*a Bahia* lleva artículo: *na Bahia*."),
      A("O hotel fica ___ Flamengo.", "no", "em", "Flamengo", "*o Flamengo* (el barrio) lleva artículo: *no Flamengo*."),
      A("Tem um show ___ Argentina em março.", "na", "em", "Argentina", "*a Argentina* lleva artículo: *na Argentina*."),
      A("O escritório fica ___ Centro da cidade.", "no", "em", "Centro", "*o Centro* lleva artículo: *no Centro*."),
      A("A gente almoça ___ Urca no domingo.", "na", "em", "Urca", "*a Urca* lleva artículo: *na Urca*."),
      B("Moro ___ Copacabana, perto do metrô.", "em", "na", "Copacabana", "*Copacabana* va sin artículo: *em Copacabana*."),
      B("A Bia trabalha ___ Ipanema.", "em", "na", "Ipanema", "*Ipanema* va sin artículo: *em Ipanema*."),
      B("O João mora ___ Botafogo.", "em", "no", "Botafogo", "*Botafogo* va sin artículo: *em Botafogo*."),
      B("Eles moram ___ Portugal.", "em", "no", "Portugal", "*Portugal* no lleva artículo: *em Portugal* (pero *no Brasil*)."),
      B("Estou ___ São Paulo hoje.", "em", "no", "São Paulo", "*São Paulo* (la ciudad) va sin artículo: *em São Paulo*."),
      B("A gente janta ___ Santa Teresa.", "em", "na", "Santa Teresa", "*Santa Teresa* va sin artículo: *em Santa Teresa*."),
      B("Ela estuda ___ Salvador.", "em", "no", "Salvador", "Casi todas las ciudades van sin artículo: *em Salvador*."),
      B("O festival de cinema é ___ Buenos Aires.", "em", "no", "Buenos Aires", "*Buenos Aires* va sin artículo: *em Buenos Aires*."),
      B("Vocês moram ___ Niterói?", "em", "no", "Niterói", "*Niterói* va sin artículo: *em Niterói*."),
      B("O museu fica ___ Laranjeiras.", "em", "na", "Laranjeiras", "*Laranjeiras* va sin artículo, como Copacabana: *em Laranjeiras*.")
    ] },

    // Semana 11: fui (eu) o foi (ele, ela, você, a gente; también de ser).
    { id: "fuifoi", week: 11, title: "fui o foi", sub: "yo o él, ella, você", items: [
      A("Ontem eu ___ à praia.", "fui", "foi", "eu", "*eu*: *fui*. *Foi* es de *ele, ela, você*."),
      A("No sábado, eu ___ ao Maracanã com o João.", "fui", "foi", "eu", "*eu fui* (yo fui). La *-i* final es la de *eu*."),
      A("Eu ___ ao médico de manhã.", "fui", "foi", "Eu", "*eu*: *fui*."),
      A("Eu ___ muito feliz no Rio.", "fui", "foi", "Eu", "*eu*: *fui*, de *ser* y de *ir* (la misma forma)."),
      A("___ ao mercado e comprei pão.", "Fui", "Foi", "comprei", "*comprei* dice que es *eu*: entonces *fui*."),
      A("No ano passado, ___ a Salvador e adorei.", "fui", "foi", "adorei", "*adorei* es de *eu*: *fui*."),
      A("Eu não ___ à aula ontem.", "fui", "foi", "Eu", "*eu*: *fui*."),
      A("Quando eu ___ ao Rio, choveu muito.", "fui", "foi", "eu", "*eu*: *fui*."),
      A("Ontem ___ a pé para casa e cheguei cansado.", "fui", "foi", "cheguei", "*cheguei* es de *eu*: *fui*."),
      A("Ontem ___ trabalhar de bicicleta e voltei de metrô.", "fui", "foi", "voltei", "*voltei* es de *eu*: *fui*."),
      B("O show do Gil ___ ótimo!", "foi", "fui", "show", "*o show* (= ele): *foi*. Acá es de *ser*: estuvo, fue."),
      B("A Bia ___ à praia ontem.", "foi", "fui", "A Bia", "*a Bia* (= ela): *foi*."),
      B("Você ___ ao show do Caetano?", "foi", "fui", "Você", "*você* conjuga como *ele*: *foi*."),
      B("A gente ___ à Lapa no sábado.", "foi", "fui", "A gente", "*a gente* = nosotros, pero con el verbo en singular: *a gente foi*."),
      B("A viagem ___ muito boa.", "foi", "fui", "viagem", "*a viagem* (= ela): *foi*."),
      B("O João ___ ao médico de manhã.", "foi", "fui", "João", "*o João* (= ele): *foi*."),
      B("Ela não ___ trabalhar ontem.", "foi", "fui", "Ela", "*ela*: *foi*."),
      B("Como ___ a festa de ontem?", "foi", "fui", "festa", "*a festa* (= ela): *foi*. ¿Cómo estuvo?"),
      B("O jogo de domingo ___ no Maracanã.", "foi", "fui", "jogo", "*o jogo* (= ele): *foi*."),
      B("Quem ___ ao mercado hoje?", "foi", "fui", "Quem", "*quem* va con tercera persona: *quem foi?*")
    ] },

    // Semana 11: vi (ver) o vim (vir); también viu / veio, viram / vieram.
    { id: "vivim", week: 11, title: "vi o vim", sub: "de ver o de vir", items: [
      A("Eu ___ o Cristo da janela do avião.", "vi", "vim", "o Cristo", "Ver algo (*o Cristo*): *vi*, de *ver*. *Vim* es de *vir* (venir)."),
      A("Ontem eu ___ um filme ótimo.", "vi", "vim", "um filme", "Un filme se ve: *vi* (ver)."),
      A("Você ___ a Bia na festa?", "viu", "veio", "a Bia", "Ver a alguien: *viu* (ver), sin «a» delante de la persona."),
      A("Ontem eu ___ o pôr do sol no Arpoador.", "vi", "vim", "o pôr do sol", "El atardecer se ve: *vi*."),
      A("Ela ___ o jogo pela televisão.", "viu", "veio", "o jogo", "Un partido se ve: *viu* (ver)."),
      A("Eles ___ o show de longe.", "viram", "vieram", "o show", "Ver algo: *viram* (ver). *Vieram* es de *vir*."),
      A("Eu não ___ o João ontem.", "vi", "vim", "o João", "Ver a alguien: *vi*."),
      A("A gente ___ muitos turistas na praia.", "viu", "veio", "muitos turistas", "Lo que se ve va directo: *viu muitos turistas*."),
      A("Vocês já ___ a notícia de hoje?", "viram", "vieram", "a notícia", "Una noticia se ve, se lee: *viram* (ver)."),
      A("Hoje eu ___ uma tartaruga no mar de Ipanema.", "vi", "vim", "uma tartaruga", "Ver algo: *vi*."),
      B("Hoje eu ___ de ônibus para o trabalho.", "vim", "vi", "de ônibus", "Venir en un medio (*de ônibus*): *vim*, de *vir*."),
      B("Ela ___ ao Rio em 2020.", "veio", "viu", "ao Rio", "Venir a un lugar (*ao Rio*): *veio*, de *vir*."),
      B("Ontem eu ___ a pé da praia até aqui.", "vim", "vi", "a pé", "Venir caminando (*a pé*): *vim*."),
      B("Vocês ___ de carro ou de metrô?", "vieram", "viram", "de carro", "Venir en auto: *vieram*, de *vir*."),
      B("O João não ___ à aula.", "veio", "viu", "à aula", "Venir a clase (*à aula*): *veio*."),
      B("Eu ___ ao Brasil para estudar português.", "vim", "vi", "ao Brasil", "Venir a un lugar (*ao Brasil*): *vim*."),
      B("A Bia ___ de Salvador ontem.", "veio", "viu", "de Salvador", "Venir desde un lugar (*de Salvador*): *veio*."),
      B("Eles ___ jantar com a gente.", "vieram", "viram", "jantar", "*vir* + infinitivo = venir a hacer algo: *vieram jantar*."),
      B("Por que você não ___ à festa?", "veio", "viu", "à festa", "Venir a la fiesta (*à festa*): *veio*."),
      B("Eu ___ correndo do metrô até o escritório.", "vim", "vi", "correndo", "Venir corriendo: *vim correndo*.")
    ] },

    // Semana 12: el imperativo escrito y formal (fale, venha) o el hablado,
    // con amigos (fala, vem).  La pista es a quién le hablás.
    { id: "falefala", week: 12, title: "fale o fala", sub: "trato formal o con amigos", items: [
      A("Senhor, ___ mais devagar, por favor.", "fale", "fala", "Senhor", "A un señor que no conocés, la forma de *você* escrita: *fale*."),
      A("Dona Maria, ___ aqui, por favor.", "venha", "vem", "Dona Maria", "A una señora mayor (*dona Maria*): *venha*."),
      A("Senhora, ___ o seu nome aqui.", "escreva", "escreve", "Senhora", "Trato formal (*senhora*): *escreva*."),
      A("Doutor, ___ com calma: o que eu tenho?", "diga", "diz", "Doutor", "Al médico (*doutor*), trato formal: *diga*."),
      A("Aviso no elevador: ___ a porta antes de sair.", "feche", "fecha", "Aviso", "Un cartel (*aviso*) usa el imperativo escrito: *feche*."),
      A("Na receita: ___ o açúcar e mexa bem.", "coloque", "coloca", "receita", "Las recetas usan el imperativo escrito: *coloque*, *mexa*."),
      A("Seu Jorge, ___ um minuto, por favor.", "espere", "espera", "Seu Jorge", "A un señor mayor (*seu Jorge*): *espere*."),
      A("Caro passageiro, ___ o cinto de segurança.", "use", "usa", "Caro passageiro", "Un aviso al pasajero: imperativo escrito, *use*."),
      A("Placa na praia: não ___ lixo na areia.", "jogue", "joga", "Placa", "Un cartel (*placa*), y negativo: *não jogue*."),
      A("Dona Ana, ___ à vontade, a casa é sua.", "fique", "fica", "Dona Ana", "A una señora (*dona Ana*): *fique à vontade* (póngase cómoda)."),
      B("Rafa, ___ aí! Como foi o jogo?", "fala", "fale", "Rafa", "Con un amigo (*Rafa*), el imperativo hablado: *fala*, igual a la tercera del presente."),
      B("Bia, ___ cá ver o pôr do sol!", "vem", "venha", "Bia", "Con una amiga (*Bia*): *vem cá!*"),
      B("Cara, ___ isso aqui, que lindo!", "olha", "olhe", "Cara", "*cara* (che) marca la charla: *olha!*"),
      B("Mãe, ___ o almoço que eu lavo a louça.", "faz", "faça", "Mãe", "En casa, con la mamá: *faz*, el imperativo hablado."),
      B("Amiga, ___ para mim amanhã!", "liga", "ligue", "Amiga", "Entre amigas: *liga para mim*."),
      B("João, ___ a verdade: foi você?", "diz", "diga", "João", "Con un amigo (*João*): *diz*, la forma hablada."),
      B("Mano, ___ aí que eu já volto.", "espera", "espere", "Mano", "*mano* (hermano, che) marca la charla: *espera aí*."),
      B("Filho, ___ a mesa para o jantar.", "põe", "ponha", "Filho", "En casa, al hijo: *põe a mesa*, la forma hablada de *pôr*."),
      B("Lu, ___ uma foto nossa!", "tira", "tire", "Lu", "Con una amiga (*Lu*): *tira uma foto!*"),
      B("Pedro, ___ mais alto, não estou ouvindo!", "fala", "fale", "Pedro", "Con un amigo (*Pedro*): *fala*.")
    ] },

    // Semana 16: o (directo) o lhe (indirecto), en la norma.  El habla dice
    // «vi ele», «disse pra ele»; acá se elige entre los dos clíticos.
    { id: "olhe", week: 16, title: "o o lhe", sub: "lo / la o le, en la norma", items: [
      A("Eu ___ vi ontem na praia.", "o", "lhe", "vi", "*ver alguém*: directo → *o* (lo). En el habla: *vi ele*."),
      A("O João? A Bia ___ conhece há anos.", "o", "lhe", "conhece", "*conhecer alguém*: directo → *o*."),
      A("A professora? Eu ___ encontrei no metrô.", "a", "lhe", "encontrei", "*encontrar alguém*: directo, y femenino → *a*."),
      A("Os meninos? Ninguém ___ viu hoje.", "os", "lhes", "viu", "*ver alguém*: directo, plural → *os*."),
      A("O senhor? Eu ___ busco no hotel às oito.", "o", "lhe", "busco", "*buscar alguém* (pasar a buscar): directo → *eu o busco*."),
      A("O Pedro? Eu ___ convidei para a festa.", "o", "lhe", "convidei", "*convidar alguém*: directo → *o convidei*."),
      A("A Ana? Eu ___ espero na saída.", "a", "lhe", "espero", "*esperar alguém*: directo → *a espero*."),
      A("Os documentos? Eu ___ deixei na mesa.", "os", "lhes", "deixei", "*deixar algo*: directo → *os deixei*."),
      A("O senhor? Nós ___ acompanhamos até a porta.", "o", "lhe", "acompanhamos", "*acompanhar alguém*: directo → *o acompanhamos*."),
      A("A sua filha? Eu ___ levei à escola.", "a", "lhe", "levei", "*levar alguém*: directo → *a levei*."),
      B("O João? Eu ___ disse toda a verdade.", "lhe", "o", "disse", "*dizer algo a alguém*: indirecto → *lhe*. En el habla: *disse pra ele*."),
      B("O João? Eu ___ dei um presente.", "lhe", "o", "dei", "*dar algo a alguém*: indirecto → *lhe dei*."),
      B("A Bia? Eu ___ mandei uma mensagem.", "lhe", "a", "mandei", "*mandar algo a alguém*: indirecto → *lhe mandei*."),
      B("O senhor? Eu ___ telefono amanhã.", "lhe", "o", "telefono", "*telefonar a alguém*: indirecto → *lhe telefono*."),
      B("Os alunos? A professora ___ explicou a regra.", "lhes", "os", "explicou", "*explicar algo a alguém*: indirecto, plural → *lhes*."),
      B("A sua mãe? Nós ___ escrevemos um cartão.", "lhe", "a", "escrevemos", "*escrever algo a alguém*: indirecto → *lhe escrevemos*."),
      B("Esse assunto ___ interessa, senhor?", "lhe", "o", "interessa", "*interessar a alguém*: indirecto → *lhe interessa*."),
      B("O Pedro? Eu ___ pedi ajuda.", "lhe", "o", "pedi", "*pedir algo a alguém*: indirecto → *lhe pedi*."),
      B("A Ana? Eu ___ perguntei o nome do restaurante.", "lhe", "a", "perguntei", "*perguntar algo a alguém*: indirecto → *lhe perguntei*."),
      B("Os turistas? O guia ___ mostrou o Pão de Açúcar.", "lhes", "os", "mostrou", "*mostrar algo a alguém*: indirecto, plural → *lhes*.")
    ] },

    // Semana 17: futuro simple en la noticia, el aviso y el contrato; ir +
    // infinitivo en la charla.  La pista es el género del texto.
    { id: "futurovou", week: 17, title: "falará o vai falar", sub: "el texto formal o la charla", items: [
      A("Comunicado: a agência ___ fechada no feriado.", "estará", "vai estar", "Comunicado", "Un comunicado oficial prefiere el futuro simple: *estará*."),
      A("Segundo o edital, as inscrições ___ no dia 5.", "começarão", "vão começar", "edital", "Un edital (convocatoria) es texto formal: *começarão*."),
      A("Contrato: o locatário ___ o aluguel até o dia 10.", "pagará", "vai pagar", "Contrato", "Un contrato usa el futuro simple: *pagará*."),
      A("Previsão do tempo: amanhã ___ no litoral.", "choverá", "vai chover", "Previsão do tempo", "El pronóstico escrito usa el futuro simple: *choverá*."),
      A("Aviso aos passageiros: o embarque ___ às 14h.", "será", "vai ser", "Aviso aos passageiros", "Un aviso oficial: *será*."),
      A("Nota oficial: o prefeito ___ as obras na segunda.", "inaugurará", "vai inaugurar", "Nota oficial", "Una nota oficial: futuro simple, *inaugurará*."),
      A("Prezados clientes, a loja ___ às 10h no domingo.", "abrirá", "vai abrir", "Prezados clientes", "*Prezados clientes* abre un texto formal: *abrirá*."),
      A("No relatório: os resultados ___ publicados em março.", "serão", "vão ser", "relatório", "Un informe es texto formal: *serão publicados*."),
      A("Informamos que o sistema ___ fora do ar à noite.", "estará", "vai estar", "Informamos", "*Informamos que* es fórmula de aviso formal: *estará*."),
      A("Nota do ministério: a vacina ___ gratuita.", "será", "vai ser", "Nota do ministério", "Una nota oficial: futuro simple, *será*."),
      B("Cara, amanhã eu ___ cedo, bora?", "vou surfar", "surfarei", "Cara", "Entre amigos, el futuro es *ir* + infinitivo: *vou surfar*. *Surfarei* suena a discurso."),
      B("No WhatsApp: a gente ___ pizza hoje, topa?", "vai pedir", "pedirá", "WhatsApp", "En un mensaje de WhatsApp: *vai pedir*."),
      B("Mãe, eu ___ tarde hoje, tá?", "vou chegar", "chegarei", "Mãe", "Hablando con la mamá: *vou chegar*."),
      B("Relaxa, ___ tudo certo!", "vai dar", "dará", "Relaxa", "*Relaxa* marca la charla: *vai dar tudo certo* (va a salir todo bien)."),
      B("Bia, você ___ no churrasco sábado?", "vai aparecer", "aparecerá", "Bia", "Con una amiga: *vai aparecer*."),
      B("Hoje eu ___ cedo, tô morto.", "vou dormir", "dormirei", "tô morto", "*tô morto* (estoy muerto) es charla: *vou dormir*."),
      B("Fica tranquila, amanhã cedo eu ___.", "vou te ligar", "te ligarei", "Fica tranquila", "*Fica tranquila* es charla: *vou te ligar*."),
      B("E aí, vocês ___ o jogo onde?", "vão ver", "verão", "E aí", "*E aí* (¿y?, ¿qué onda?) es charla: *vão ver*."),
      B("Valeu, depois eu ___ o dinheiro.", "vou devolver", "devolverei", "Valeu", "*Valeu* (gracias, entre amigos): *vou devolver*."),
      B("Bora pra casa, que ___!", "vai chover", "choverá", "Bora", "*Bora* (vamos) es charla: *vai chover*.")
    ] },

    // Semana 20: tudo (pronombre: todo, todo lo) o todo / toda / todos
    // (delante de un sustantivo).
    { id: "tudotodo", week: 20, title: "tudo o todo", sub: "todo (solo) o todo el, toda la", items: [
      A("Obrigado por ___, Bia, você é demais!", "tudo", "todo", "Obrigado por", "Solo, sin sustantivo: *tudo* (= todo). *Obrigado por tudo*."),
      A("Ele comeu ___ e ainda pediu sobremesa.", "tudo", "todo", "comeu", "*comeu tudo* = se comió todo: solo, sin sustantivo → *tudo*."),
      A("___ bem com você?", "Tudo", "Todo", "bem", "*Tudo bem*: pronombre, no va delante de un sustantivo."),
      A("Ela sabe ___ sobre o Rio.", "tudo", "todo", "sobre", "*saber tudo sobre* = saber todo sobre: pronombre → *tudo*."),
      A("Fiz ___ o que você pediu.", "tudo", "todo", "o que", "*tudo o que* = todo lo que."),
      A("Está ___ pronto para a festa.", "tudo", "todo", "pronto", "*Está tudo pronto* = está todo listo: *tudo*."),
      A("Ele contou ___ para a polícia.", "tudo", "todo", "contou", "*contou tudo* = contó todo: solo → *tudo*."),
      A("Aqui no Leblon ___ é caro.", "tudo", "todo", "é caro", "*tudo é caro* = todo es caro: pronombre sujeto → *tudo*."),
      A("Entendi ___, obrigada pela explicação.", "tudo", "todo", "Entendi", "*Entendi tudo* = entendí todo."),
      A("Essa notícia muda ___ no projeto.", "tudo", "todo", "muda", "*muda tudo* = cambia todo: *tudo*."),
      B("Trabalhei ___ o dia ontem.", "todo", "tudo", "o dia", "Delante de un sustantivo (*o dia*): *todo* = todo el. *Todo o dia* = el día entero."),
      B("___ a turma foi ao cinema.", "Toda", "Tudo", "a turma", "Delante de un sustantivo femenino (*a turma*): *toda*."),
      B("Ela ligou ___ os dias.", "todos", "tudo", "os dias", "*todos os dias* = todos los días."),
      B("Choveu ___ a semana em São Paulo.", "toda", "tudo", "a semana", "*toda a semana* = toda la semana."),
      B("___ mundo sabe disso.", "Todo", "Tudo", "mundo", "*todo mundo* = todo el mundo, todos. Nunca «tudo mundo»."),
      B("Li ___ o livro da Clarice em um dia.", "todo", "tudo", "o livro", "Delante de un sustantivo (*o livro*): *todo o livro*."),
      B("___ as praias estavam cheias.", "Todas", "Tudo", "as praias", "*todas as praias* = todas las playas."),
      B("Ele conhece ___ o Brasil.", "todo", "tudo", "o Brasil", "*todo o Brasil* = todo Brasil, el país entero."),
      B("___ os alunos passaram na prova.", "Todos", "Tudo", "os alunos", "*todos os alunos* = todos los alumnos."),
      B("Gastei ___ o dinheiro na viagem.", "todo", "tudo", "o dinheiro", "*todo o dinheiro* = toda la plata.")
    ] },

    // Semana 22: ser + participio cuenta la acción (con fecha o agente);
    // estar + participio, el estado que quedó.
    { id: "foiesta", week: 22, title: "foi fechado o está fechado", sub: "la acción o el estado que queda", items: [
      A("O museu ___ fechado em 2020 para obras.", "foi", "está", "em 2020", "Una acción con fecha (*em 2020*): pasiva con *ser*, *foi fechado*."),
      A("A ponte ___ construída em 1974.", "foi", "está", "em 1974", "Cuándo se hizo (*em 1974*): *foi construída*."),
      A("O ladrão ___ preso pela polícia ontem.", "foi", "está", "pela polícia", "Con agente (*pela polícia*): la acción, *foi preso*."),
      A("A carta ___ escrita por Machado de Assis.", "foi", "está", "por Machado de Assis", "Con agente (*por Machado*): *foi escrita*."),
      A("O Cristo ___ inaugurado em 1931.", "foi", "está", "em 1931", "Un hecho fechado: *foi inaugurado*."),
      A("As provas ___ corrigidas pela professora na sexta.", "foram", "estão", "pela professora", "Con agente (*pela professora*): *foram corrigidas*."),
      A("O prefeito ___ eleito em outubro.", "foi", "está", "em outubro", "Un hecho con fecha: *foi eleito*."),
      A("A janela ___ quebrada por uma bola.", "foi", "está", "por uma bola", "Con agente (*por uma bola*): la acción, *foi quebrada*."),
      A("O contrato ___ assinado ontem às três.", "foi", "está", "ontem", "Cuándo pasó (*ontem*): *foi assinado*."),
      A("Os documentos ___ entregues pelo correio na segunda.", "foram", "estão", "pelo correio", "Con agente (*pelo correio*): *foram entregues*."),
      B("Hoje é segunda: o museu ___ fechado.", "está", "foi", "Hoje é segunda", "Cómo está hoy (un estado): *está fechado*."),
      B("Pode entrar, a porta ___ aberta.", "está", "foi", "Pode entrar", "El estado de ahora (podés entrar porque…): *está aberta*."),
      B("A loja ainda ___ fechada, volte mais tarde.", "está", "foi", "ainda", "*ainda* (todavía) habla de un estado: *está fechada*."),
      B("Cuidado, o chão ___ molhado!", "está", "foi", "Cuidado", "Un aviso sobre cómo está el piso: *está molhado*."),
      B("O documento ___ assinado e pronto para enviar.", "está", "foi", "pronto", "Cómo quedó (*pronto*, listo): *está assinado*."),
      B("A luz da cozinha ___ acesa: tem alguém lá?", "está", "foi", "tem alguém lá", "Lo que se ve ahora (por eso preguntás quién hay): *está acesa*."),
      B("Neste momento, o restaurante ___ lotado.", "está", "foi", "Neste momento", "*neste momento*: el estado, *está lotado*."),
      B("O elevador ___ quebrado; vamos de escada.", "está", "foi", "vamos de escada", "Cómo está ahora (por eso, la escalera): *está quebrado*."),
      B("Olha, a mesa ___ ocupada.", "está", "foi", "Olha", "Lo que ves ahora: *está ocupada*."),
      B("O café ___ servido! Venham!", "está", "foi", "Venham", "*O café está servido*: está listo, vengan.")
    ] },

    // Semana 22: los participios dobles.  ter / haver + el regular
    // (prendido); ser / estar + el corto (preso).  Del lado de ter, solo
    // los verbos cuyo corto con ter la norma rechaza (prender, acender,
    // imprimir, eleger, morrer): sin pagar, ganhar, gastar, y tampoco
    // aceitar, entregar ni salvar, porque *tinha aceito*, *tinha entregue*
    // y *tinha salvo* son de uso culto en Brasil y no son un error seguro.
    { id: "aceitado", week: 22, title: "tinha prendido o foi preso", sub: "ter + el regular; ser / estar + el corto", items: [
      A("A planta da sala tinha ___ de sede.", "morrido", "morto", "tinha", "Con *ter* (*tinha*), el participio regular: *tinha morrido*. *Morto* va con *estar*: *está morta*."),
      A("A gente tinha ___ a luz da varanda para a festa.", "acendido", "aceso", "tinha", "Con *ter*: *tinha acendido*. *Aceso* va con *estar*: *está aceso*."),
      A("O povo tinha ___ o prefeito duas vezes.", "elegido", "eleito", "tinha", "Con *ter*: *tinha elegido*. *Eleito* va con *ser*: *foi eleito*."),
      A("A polícia já tinha ___ o suspeito.", "prendido", "preso", "tinha", "Con *ter*: *tinha prendido*. *Preso* va con *ser* y *estar*."),
      A("Eu tinha ___ as passagens em casa.", "imprimido", "impresso", "tinha", "Con *ter*: *tinha imprimido*."),
      A("Alguém tinha ___ a luz da sala.", "acendido", "aceso", "tinha", "Con *ter*: *tinha acendido*. *Aceso* va con *estar*: *está aceso*."),
      A("O povo tem ___ sempre os mesmos políticos.", "elegido", "eleito", "tem", "Con *ter* (*tem*): *tem elegido*. *Eleito* va con *ser*: *foi eleito*."),
      A("Este mês a polícia tem ___ muitos ladrões no bairro.", "prendido", "preso", "tem", "Con *ter* (*tem*): *tem prendido*. *Preso* va con *ser* y *estar*."),
      A("Ultimamente eu tenho ___ tudo no trabalho, não em casa.", "imprimido", "impresso", "tenho", "Con *ter* (*tenho*): *tenho imprimido*."),
      A("As plantas do escritório têm ___ por falta de água.", "morrido", "morto", "têm", "Con *ter* (*têm*): *têm morrido*."),
      B("O convite foi ___ por todos.", "aceito", "aceitado", "foi", "Con *ser* (*foi*), el participio corto: *foi aceito*."),
      B("A encomenda foi ___ ontem de manhã.", "entregue", "entregada", "foi", "Con *ser*: *foi entregue*, con *-e* y sin *-ado*."),
      B("O prefeito foi ___ em outubro.", "eleito", "elegido", "foi", "Con *ser*: *foi eleito*."),
      B("O suspeito está ___ desde ontem.", "preso", "prendido", "está", "Con *estar*: *está preso*."),
      B("Os boletos já estão ___ na mesa.", "impressos", "imprimidos", "estão", "Con *estar*: *estão impressos*."),
      B("A luz da cozinha estava ___.", "acesa", "acendida", "estava", "Con *estar*: *estava acesa*."),
      B("Na novela, o vilão foi ___ no último capítulo.", "morto", "matado", "foi", "Con *ser*: *foi morto*, el corto (sirve para *matar* y *morrer*)."),
      B("A conta já está ___, pode ir.", "paga", "pagada", "está", "Con *estar*: *está paga*, el corto, que concuerda."),
      B("A proposta foi ___ pela diretoria.", "aceita", "aceitada", "foi", "Con *ser*: *foi aceita*, el corto, que concuerda."),
      B("A sala está ___, pode entrar.", "limpa", "limpada", "está", "Con *estar*: *está limpa*.")
    ] },

    // Semana 22: estar (cómo estás) o ficar (cómo te pusiste: cambio de
    // estado).  «Me puse nervioso» = fiquei nervoso.
    { id: "estarficar", week: 22, title: "estar o ficar", sub: "cómo estás o cómo te pusiste", items: [
      A("Agora eu ___ cansado, mas feliz.", "estou", "fico", "Agora", "Cómo estás ahora (*agora*): *estar*."),
      A("Como você ___ hoje? Melhor?", "está", "fica", "Como você", "Preguntar cómo está alguien: *como você está?*"),
      A("A sala ___ vazia neste momento.", "está", "fica", "neste momento", "Un estado en este momento: *está vazia*."),
      A("Ela ainda ___ doente, não vem.", "está", "fica", "ainda", "*ainda* (todavía): un estado que sigue, *está doente*."),
      A("Ele ___ bravo comigo desde ontem.", "está", "fica", "desde ontem", "Un estado que dura (*desde ontem*): *está bravo*."),
      A("O céu ___ nublado agora.", "está", "fica", "agora", "Cómo está ahora: *está nublado*."),
      A("Vocês ___ prontos? O táxi chegou.", "estão", "ficam", "O táxi chegou", "Preguntar si ya están listos: *estão prontos?*"),
      A("Você ___ com uma cara triste hoje.", "está", "fica", "hoje", "Cómo se te ve hoy: *está*."),
      A("Neste momento, o João ___ ocupado.", "está", "fica", "Neste momento", "*neste momento*: el estado, *está ocupado*."),
      A("Desculpa, hoje eu ___ sem tempo.", "estou", "fico", "hoje", "Cómo estás hoy: *estou sem tempo*."),
      B("Depois da trilha, eu ___ muito cansado.", "fiquei", "estive", "Depois da trilha", "Un cambio después de algo (*depois da trilha*): *ficar* → *fiquei cansado*."),
      B("Quando viu a conta, ele ___ vermelho.", "ficou", "esteve", "Quando viu a conta", "Se puso colorado al ver algo: cambio → *ficou vermelho*."),
      B("Ela ___ nervosa com a notícia.", "ficou", "esteve", "com a notícia", "Se puso nerviosa por algo: *ficou nervosa*. «Se pôs nervosa» es calco: en Brasil no se usa."),
      B("Com a chuva, a rua ___ alagada.", "ficou", "esteve", "Com a chuva", "Un cambio causado por algo (*com a chuva*): *ficou alagada*."),
      B("Depois da festa, a sala ___ uma bagunça.", "ficou", "esteve", "Depois da festa", "Cómo quedó después: *ficou uma bagunça*."),
      B("Quando o professor chegou, todos ___ quietos.", "ficaram", "estiveram", "Quando o professor chegou", "Se quedaron callados al llegar el profesor: *ficaram*."),
      B("Ele ___ careca muito jovem.", "ficou", "esteve", "muito jovem", "Quedarse pelado (un cambio): *ficou careca*."),
      B("Quando soube do resultado, eu ___ muito feliz.", "fiquei", "estive", "Quando soube", "Me alegré al enterarme (un cambio): *fiquei feliz*."),
      B("Depois do susto, a gente ___ calado.", "ficou", "esteve", "Depois do susto", "Un cambio después del susto: *a gente ficou calado*."),
      B("O céu ___ escuro de repente.", "ficou", "esteve", "de repente", "*de repente* marca un cambio: *ficou escuro*.")
    ] },

    // Semana 30: la hipótesis en el pasado.  Después de se, tivesse +
    // participio; en la consecuencia, teria + participio.
    { id: "tivesseteria", week: 30, title: "tivesse o teria", sub: "la condición (se) o la consecuencia", items: [
      A("Se eu ___ estudado, teria passado.", "tivesse", "teria", "Se", "Después de *se*: *tivesse* + participio. «Se eu teria» es un error (el condicional va del otro lado)."),
      A("Se você ___ chegado antes, teria visto o show.", "tivesse", "teria", "Se você", "Después de *se*: *tivesse chegado*."),
      A("Se a gente ___ saído cedo, não teria pegado trânsito.", "tivesse", "teria", "Se a gente", "La condición (*se*): *tivesse saído*."),
      A("Eu teria ido, se ___ sabido.", "tivesse", "teria", "se", "Detrás de *se*, aunque venga al final: *tivesse sabido*."),
      A("Se eles ___ ligado, eu teria atendido.", "tivessem", "teriam", "Se eles", "Después de *se*: *tivessem ligado*."),
      A("Se não ___ chovido, o show teria sido incrível.", "tivesse", "teria", "Se não", "Después de *se*: *tivesse chovido*."),
      A("Teríamos comprado a casa se o banco ___ aprovado o empréstimo.", "tivesse", "teria", "se o banco", "Después de *se*: *tivesse aprovado*."),
      A("Se ela ___ pedido, eu teria ajudado.", "tivesse", "teria", "Se ela", "Después de *se*: *tivesse pedido*."),
      A("Se vocês ___ avisado, teríamos esperado.", "tivessem", "teriam", "Se vocês", "Después de *se*: *tivessem avisado*."),
      A("Se o juiz ___ visto o lance, teria marcado pênalti.", "tivesse", "teria", "Se o juiz", "Después de *se*: *tivesse visto*."),
      B("Se eu tivesse treinado mais, ___ ganhado a corrida.", "teria", "tivesse", "tivesse treinado", "La otra mitad ya tiene *tivesse*: acá va la consecuencia, *teria ganhado*."),
      B("Se ela tivesse chegado a tempo, ___ pegado o voo.", "teria", "tivesse", "tivesse chegado", "La consecuencia: *teria pegado*."),
      B("Se a gente tivesse reservado, não ___ ficado sem mesa.", "teria", "tivesse", "tivesse reservado", "La consecuencia: *teria ficado*."),
      B("Eu ___ aceitado o emprego, se tivesse recebido a proposta.", "teria", "tivesse", "se tivesse recebido", "La condición está después (*se tivesse…*): acá, *teria aceitado*."),
      B("Se eles tivessem pedido desculpas, ela ___ perdoado.", "teria", "tivesse", "tivessem pedido", "La consecuencia: *teria perdoado*."),
      B("Se não tivesse ventado tanto, o barco ___ saído.", "teria", "tivesse", "tivesse ventado", "La consecuencia: *teria saído*."),
      B("Nós ___ comprado o carro se o preço tivesse baixado.", "teríamos", "tivéssemos", "se o preço tivesse baixado", "La condición va con *se*; la consecuencia, *teríamos comprado*."),
      B("Se ela tivesse estudado medicina, ___ sido uma ótima médica.", "teria", "tivesse", "tivesse estudado", "La consecuencia: *teria sido*."),
      B("Se vocês tivessem chegado cedo, nós ___ almoçado juntos.", "teríamos", "tivéssemos", "tivessem chegado", "La consecuencia: *teríamos almoçado*."),
      B("Se o goleiro tivesse pulado antes, ___ defendido o pênalti.", "teria", "tivesse", "tivesse pulado", "La consecuencia: *teria defendido*.")
    ] },

    // Semana 31: ia / tinha ido (lo que pasaba, lo que ya había pasado) o
    // iria / teria ido (la hipótesis y el futuro del pasado en la norma
    // escrita; en la charla también se dice ia).
    { id: "iairia", week: 31, title: "ia o iria", sub: "lo que pasaba o lo que pasaría (y tinha ido / teria ido)", items: [
      A("Quando eu era criança, ___ à praia todo domingo.", "ia", "iria", "todo domingo", "Una costumbre del pasado (*todo domingo*): imperfeito, *ia*."),
      A("Antigamente a gente ___ ao cinema toda semana.", "ia", "iria", "Antigamente", "*antigamente* + costumbre: *ia*."),
      A("Quando cheguei, ela já ___ embora.", "tinha ido", "teria ido", "já", "Ya había pasado, es un hecho: *tinha ido*. *Teria ido* es hipótesis."),
      A("Naquela época, eles ___ de bonde para o centro.", "iam", "iriam", "Naquela época", "Una costumbre de *naquela época*: *iam*."),
      A("Todo verão, nós ___ para Búzios.", "íamos", "iríamos", "Todo verão", "Lo que se hacía cada verano: *íamos*."),
      A("Quando eu morava em Recife, ___ à praia de Boa Viagem.", "ia", "iria", "Quando eu morava", "Lo que se hacía en esa época (*quando eu morava*): *ia*."),
      A("Em 2010, eu ___ trabalhar de bicicleta todos os dias.", "ia", "iria", "todos os dias", "Costumbre (*todos os dias*): *ia*."),
      A("Quando conheci a Bia, ela já ___ a Salvador três vezes.", "tinha ido", "teria ido", "Quando conheci a Bia", "Un hecho anterior a otro pasado: *tinha ido*."),
      A("Na infância, ela ___ à casa da avó nas férias.", "ia", "iria", "Na infância", "Costumbre de la infancia: *ia*."),
      A("Nas férias, a gente sempre ___ para a casa da praia.", "ia", "iria", "sempre", "Una costumbre (*sempre*, en las vacaciones): *ia*."),
      B("Em nota, o ministro afirmou que ___ à cerimônia se tivesse tempo.", "iria", "ia", "Em nota", "Hipótesis en un texto formal (*em nota*): *iria*. *Ia* es del habla."),
      B("No relatório: sem a chuva, a obra ___ terminado em março.", "teria", "tinha", "No relatório", "Hipótesis (*sem a chuva*) en un informe: *teria terminado*. *Tinha terminado* es del habla."),
      B("Prezados, se houvesse verba, a diretoria ___ ao congresso.", "iria", "ia", "Prezados", "Texto formal (*Prezados*) e hipótesis: *iria*."),
      B("Segundo o jornal, o presidente ___ a Lisboa na semana seguinte.", "iria", "ia", "Segundo o jornal", "El futuro visto desde el pasado, en la prensa: *iria*."),
      B("Na redação do Enem: se o país investisse em educação, ___ mais longe.", "iria", "ia", "Na redação", "Hipótesis en una redacción: *iria*, la forma de la norma."),
      B("Em depoimento, a testemunha disse que, sem o acidente, ___ ao trabalho.", "teria ido", "tinha ido", "Em depoimento", "Algo que no pasó, en un texto formal: *teria ido*."),
      B("O comunicado informou que a delegação ___ ao Japão em maio.", "iria", "ia", "O comunicado", "El futuro visto desde el pasado, en un comunicado: *iria*."),
      B("No artigo, a autora sustenta que, sem a reforma, o sistema ___ à falência.", "teria ido", "tinha ido", "No artigo", "Hipótesis sobre el pasado en un artículo: *teria ido*."),
      B("Senhor diretor, se fosse possível, eu ___ à reunião de amanhã com a equipe.", "iria", "ia", "Senhor diretor", "Al director, con *se fosse possível*: *iria*."),
      B("Na entrevista ao jornal, o técnico disse que, com mais tempo, o time ___ à final.", "teria ido", "tinha ido", "Na entrevista", "Algo que no pasó, en la prensa: *teria ido*.")
    ] },

    // Semana 32: la pasiva sintética concuerda (vendem-se casas); con
    // preposición, no (precisa-se de, trata-se de).
    { id: "vendese", week: 32, title: "vende-se o vendem-se", sub: "uno, o con preposición; o varios", items: [
      A("___ apartamento novo no Leblon.", "Vende-se", "Vendem-se", "apartamento", "*apartamento* (singular) es el sujeto: *vende-se*."),
      A("___ de garçons com experiência.", "Precisa-se", "Precisam-se", "de", "Con preposición (*precisar de*), el verbo no concuerda: *precisa-se de garçons*."),
      A("___ quarto para estudantes perto da PUC.", "Aluga-se", "Alugam-se", "quarto", "*quarto* (singular): *aluga-se*."),
      A("___ casa com piscina em Búzios.", "Vende-se", "Vendem-se", "casa", "*casa* (singular): *vende-se*."),
      A("___ de professores de inglês para o curso.", "Precisa-se", "Precisam-se", "de", "Con *de*, sin sujeto: *precisa-se de*, siempre en singular."),
      A("___ um carro usado em bom estado.", "Vende-se", "Vendem-se", "um carro", "*um carro* (singular): *vende-se*."),
      A("___ de vendedores para o Natal.", "Precisa-se", "Precisam-se", "de", "*precisa-se de* + plural: el verbo sigue en singular."),
      A("___ de problemas sérios no projeto.", "Trata-se", "Tratam-se", "de", "*trata-se de*: en la norma, siempre en singular."),
      A("___ sala comercial no Centro.", "Aluga-se", "Alugam-se", "sala", "*sala* (singular): *aluga-se*."),
      A("___ de ajuda na cozinha do restaurante.", "Precisa-se", "Precisam-se", "de", "Con preposición: *precisa-se de*."),
      B("___ apartamentos novos no Leblon.", "Vendem-se", "Vende-se", "apartamentos", "*apartamentos* es el sujeto (plural): *vendem-se*. En el habla se oye «vende-se»; la norma concuerda."),
      B("___ quartos para estudantes perto da PUC.", "Alugam-se", "Aluga-se", "quartos", "*quartos* (plural): *alugam-se*."),
      B("___ consertos de bicicleta e de patinete.", "Fazem-se", "Faz-se", "consertos", "*consertos* (plural): *fazem-se*."),
      B("___ casas na praia de Búzios.", "Vendem-se", "Vende-se", "casas", "*casas* (plural): *vendem-se*."),
      B("___ aulas de violão e de piano.", "Dão-se", "Dá-se", "aulas", "*aulas* (plural): *dão-se aulas*."),
      B("___ salas comerciais no Centro do Rio.", "Alugam-se", "Aluga-se", "salas comerciais", "*salas* (plural): *alugam-se*."),
      B("___ bicicletas por hora na orla.", "Alugam-se", "Aluga-se", "bicicletas", "*bicicletas* (plural): *alugam-se*."),
      B("___ cópias e encadernações na hora.", "Fazem-se", "Faz-se", "cópias", "*cópias e encadernações* (plural): *fazem-se*."),
      B("___ ingressos para o show na bilheteria.", "Vendem-se", "Vende-se", "ingressos", "*ingressos* (plural): *vendem-se*."),
      B("___ chaves na hora, com garantia.", "Fazem-se", "Faz-se", "chaves", "*chaves* (plural): *fazem-se*.")
    ] },

    // Semana 36: há (hace, tiempo que pasó) o a (dentro de, distancia).
    { id: "haa", week: 36, title: "há o a", sub: "hace (ya pasó) o dentro de, a (distancia)", items: [
      A("Moro no Rio ___ dois anos.", "há", "a", "Moro", "Tiempo que dura hasta hoy («hace»): *há*, de *haver*. Se puede cambiar por *faz*."),
      A("Cheguei ___ dez minutos.", "há", "a", "Cheguei", "Ya pasó (*cheguei*): *há dez minutos* = hace diez minutos."),
      A("___ muito tempo que não vejo a Bia.", "Há", "A", "não vejo", "*Há muito tempo que…* = hace mucho que: *há* (o *faz*)."),
      A("Ela saiu daqui ___ pouco.", "há", "a", "saiu", "Ya pasó (*saiu*): *há pouco* = hace un rato."),
      A("A gente se conheceu ___ vinte anos.", "há", "a", "se conheceu", "Pasado (*se conheceu*): *há vinte anos*."),
      A("O prédio foi construído ___ um século.", "há", "a", "foi construído", "Hace un siglo: *há um século*."),
      A("Trabalho nesta empresa ___ cinco anos.", "há", "a", "Trabalho", "Tiempo que dura hasta hoy: *há cinco anos*."),
      A("___ quanto tempo você estuda português?", "Há", "A", "estuda", "*Há quanto tempo…?* = ¿hace cuánto…?"),
      A("Isso aconteceu ___ três semanas.", "há", "a", "aconteceu", "Ya pasó (*aconteceu*): *há três semanas*."),
      A("Não chove ___ meses no sertão.", "há", "a", "Não chove", "Tiempo que dura hasta hoy: *há meses*."),
      B("Daqui ___ dois anos, quero morar em Lisboa.", "a", "há", "Daqui", "*Daqui a* + tiempo = dentro de: futuro, *a*. «Daqui há» es un error frecuente (también de nativos)."),
      B("A farmácia fica ___ dois quarteirões.", "a", "há", "fica", "Distancia (*fica a…*): *a*."),
      B("O show começa daqui ___ dez minutos.", "a", "há", "daqui", "*daqui a dez minutos* = dentro de diez minutos."),
      B("A praia fica ___ cinco minutos de carro.", "a", "há", "fica", "Distancia en tiempo (*fica a cinco minutos*): *a*."),
      B("Estamos ___ poucos dias do Carnaval.", "a", "há", "Estamos", "Lo que falta (*estar a…*): *a*."),
      B("Volto daqui ___ uma semana.", "a", "há", "daqui", "*daqui a uma semana* = dentro de una semana."),
      B("A cidade fica ___ 300 quilômetros do Rio.", "a", "há", "fica", "Distancia: *a 300 quilômetros*."),
      B("O hotel está ___ cem metros da praia.", "a", "há", "metros", "Distancia (*cem metros*): *a*."),
      B("Daqui ___ pouco a gente sai.", "a", "há", "Daqui", "*daqui a pouco* = dentro de un rato: *a*."),
      B("Estamos ___ uma semana da prova.", "a", "há", "Estamos", "Lo que falta: *estamos a uma semana*.")
    ] },

    // Semana 41: el -ra portugués es pluscuamperfecto (saíra = había
    // salido), no el «saliera» del castellano, que es -sse (saísse).
    { id: "sairasaisse", week: 41, title: "saíra o saísse", sub: "pluscuamperfecto o subjuntivo", items: [
      A("Quando cheguei, ele já ___.", "saíra", "saísse", "já", "Anterior a otro pasado («ya había salido»): mais-que-perfeito simples, *saíra*."),
      A("Quando a polícia chegou, o ladrão já ___ pela janela.", "fugira", "fugisse", "Quando a polícia chegou", "Ya había pasado: *fugira* (= tinha fugido)."),
      A("Machado publicou o livro que ___ anos antes.", "escrevera", "escrevesse", "anos antes", "Anterioridad (*anos antes*): *escrevera* (= tinha escrito)."),
      A("Ao abrir a porta, percebeu que alguém ___ a casa.", "revirara", "revirasse", "percebeu que", "*percebeu que* + un hecho anterior: indicativo, *revirara*."),
      A("Quando a ajuda chegou, a enchente já ___ o bairro.", "destruíra", "destruísse", "já", "Ya había pasado: *destruíra* (= tinha destruído)."),
      A("Ele devolveu o dinheiro que ___ emprestado.", "pedira", "pedisse", "devolveu", "Lo pidió antes de devolverlo: *pedira* (= tinha pedido)."),
      A("Ela finalmente encontrou o anel que ___ na praia.", "perdera", "perdesse", "finalmente encontrou", "Lo había perdido antes: *perdera*."),
      A("O autor reconheceu o erro que ___ na primeira edição.", "cometera", "cometesse", "reconheceu", "Un hecho anterior: *cometera* (= tinha cometido)."),
      A("Quando acordei, a chuva forte já ___.", "passara", "passasse", "Quando acordei", "Ya había pasado al despertarme: *passara*."),
      A("Ela contou que ___ o Pelé quando criança.", "conhecera", "conhecesse", "contou que", "*contou que* + un hecho anterior: *conhecera* (= tinha conhecido)."),
      B("Se eu ___ tempo, viajaria mais.", "tivesse", "tivera", "Se", "Después de *se* hipotético: *tivesse*. El «si tuviera» del castellano no pasa: *tivera* es pluscuamperfecto."),
      B("Embora ___ cansada, ela foi à reunião.", "estivesse", "estivera", "Embora", "*embora* pide subjuntivo: *estivesse*, no *estivera*."),
      B("Se ela ___ a verdade, não teria ido.", "soubesse", "soubera", "Se ela", "Después de *se*: *soubesse*. *Soubera* = había sabido."),
      B("Mesmo que ___ dinheiro, ele não compraria.", "tivesse", "tivera", "Mesmo que", "*mesmo que* + subjuntivo: *tivesse*."),
      B("Pediu que eu ___ mais cedo.", "chegasse", "chegara", "Pediu que", "*pediu que* + subjuntivo: *chegasse*."),
      B("Talvez ela ___ razão, mas não disse nada.", "tivesse", "tivera", "Talvez", "*talvez* + subjuntivo: *tivesse*."),
      B("Se nós ___ mais tempo, terminaríamos o projeto.", "tivéssemos", "tivéramos", "Se nós", "Después de *se*: *tivéssemos*."),
      B("Ainda que ___ frio, fomos à praia.", "fizesse", "fizera", "Ainda que", "*ainda que* (aunque) + subjuntivo: *fizesse*."),
      B("Gostaria que você ___ comigo.", "viesse", "viera", "Gostaria que", "*gostaria que* + subjuntivo: *viesse*."),
      B("Se o governo ___ mais em saneamento, haveria menos doenças.", "investisse", "investira", "Se o governo", "Después de *se* hipotético: *investisse*.")
    ] },

    // Semana 41: tinha feito (antes de otro pasado) o tenho feito (viene
    // pasando hasta hoy).
    { id: "tinhatenho", week: 41, title: "tinha feito o tenho feito", sub: "antes de otro pasado o viene pasando hasta hoy", items: [
      A("Quando cheguei, eles já ___ o jantar.", "tinham feito", "têm feito", "Quando cheguei", "Anterior a otro pasado (*quando cheguei*): *tinham feito*."),
      A("Eu nunca ___ feijoada antes daquela viagem.", "tinha comido", "tenho comido", "antes daquela viagem", "Antes de un momento pasado: *tinha comido*."),
      A("Quando a reunião começou, ela já ___ o relatório.", "tinha enviado", "tem enviado", "Quando a reunião começou", "Ya había pasado: *tinha enviado*."),
      A("Ele disse que ___ o filme no ano anterior.", "tinha visto", "tem visto", "no ano anterior", "Anterior a otro pasado (*no ano anterior*): *tinha visto*."),
      A("Quando liguei, a loja do shopping já ___.", "tinha fechado", "tem fechado", "Quando liguei", "Ya había cerrado cuando llamé: *tinha fechado*."),
      A("Eu ___ o livro antes de ver a série.", "tinha lido", "tenho lido", "antes de ver", "Primero el libro, después la serie: *tinha lido*."),
      A("Até 2019, o país nunca ___ uma crise assim.", "tinha enfrentado", "tem enfrentado", "Até 2019", "Hasta un momento pasado (*até 2019*): *tinha enfrentado*."),
      A("Quando o médico chegou, o paciente já ___ melhorado.", "tinha", "tem", "Quando o médico chegou", "Anterior a otro pasado: *tinha melhorado*."),
      A("Ela me contou que ___ o emprego na semana anterior.", "tinha perdido", "tem perdido", "na semana anterior", "Anterior al momento en que lo contó: *tinha perdido*."),
      A("No dia da prova, eu já ___ toda a matéria.", "tinha estudado", "tenho estudado", "No dia da prova", "Antes de un día pasado: *tinha estudado*."),
      B("Ultimamente eu ___ muito, até nos fins de semana.", "tenho trabalhado", "tinha trabalhado", "Ultimamente", "Algo que viene pasando (*ultimamente*): *tenho trabalhado*."),
      B("Nos últimos meses, ___ muito no Rio.", "tem chovido", "tinha chovido", "Nos últimos meses", "Viene pasando hasta hoy: *tem chovido*."),
      B("Desde janeiro, a gente ___ menos carne.", "tem comido", "tinha comido", "Desde janeiro", "Desde un momento hasta hoy: *tem comido*."),
      B("Ela ___ bem nas últimas semanas.", "tem dormido", "tinha dormido", "nas últimas semanas", "Repetido hasta hoy: *tem dormido*."),
      B("Este ano, os preços ___ sem parar.", "têm subido", "tinham subido", "Este ano", "Viene pasando este año: *têm subido*."),
      B("Vocês ___ ao cinema ultimamente?", "têm ido", "tinham ido", "ultimamente", "*ultimamente*: *têm ido*."),
      B("Desde a mudança para Niterói, eu ___ melhor.", "tenho me sentido", "tinha me sentido", "Desde a mudança", "Desde la mudanza hasta hoy: *tenho me sentido*."),
      B("O governo ___ investido em saneamento nos últimos anos.", "tem", "tinha", "nos últimos anos", "Viene pasando (*nos últimos anos*): *tem investido*."),
      B("De uns tempos para cá, ele ___ cedo.", "tem acordado", "tinha acordado", "De uns tempos para cá", "*de uns tempos para cá* (de un tiempo a esta parte): *tem acordado*."),
      B("Hoje em dia, muitos jovens ___ a cidade.", "têm deixado", "tinham deixado", "Hoje em dia", "Viene pasando hoy: *têm deixado*.")
    ] },

    // Semana 43: en la carta formal, el pronombre según la regencia en
    // portugués, que no siempre es la del castellano (convidá-lo, no «le
    // invito»; agradeço-lhe).  Sin ajudar, atender ni avisar, que admiten
    // las dos construcciones.
    { id: "olhecarta", week: 43, title: "o o lhe en la carta formal", sub: "cumprimento-o, agradeço-lhe", items: [
      A("Desde já ___ cumprimento pela iniciativa.", "o", "lhe", "cumprimento", "*cumprimentar alguém*: directo → *o*."),
      A("Prezado senhor, gostaria de ___ convidar para a palestra.", "o", "lhe", "convidar", "*convidar alguém*: directo → *o convidar*."),
      A("Prezada senhora, nós ___ parabenizamos pelo prêmio.", "a", "lhe", "parabenizamos", "*parabenizar alguém*: directo → *a parabenizamos*."),
      A("Prezado senhor, nós ___ receberemos com prazer em nossa sede.", "o", "lhe", "receberemos", "*receber alguém*: directo → *o receberemos*."),
      A("Prezado cliente, nossa equipe ___ visitará na segunda-feira.", "o", "lhe", "visitará", "*visitar alguém*: directo → *o visitará*."),
      A("Prezado candidato, nós ___ aguardamos na entrevista.", "o", "lhe", "aguardamos", "*aguardar alguém*: directo → *o aguardamos*."),
      A("Senhora diretora, o conselho ___ elegeu por unanimidade.", "a", "lhe", "elegeu", "*eleger alguém*: directo → *a elegeu*."),
      A("Caro professor, eu ___ consultei sobre o tema.", "o", "lhe", "consultei", "*consultar alguém*: directo → *o consultei*."),
      A("Prezado senhor, a empresa ___ contratou em março.", "o", "lhe", "contratou", "*contratar alguém*: directo → *o contratou*."),
      A("Prezado cliente, a central ___ chamará em breve.", "o", "lhe", "chamará", "*chamar alguém*: directo → *o chamará*."),
      B("Desde já ___ agradeço a atenção.", "lhe", "o", "agradeço", "*agradecer algo a alguém*: indirecto → *lhe agradeço*."),
      B("Prezado senhor, venho ___ pedir que confirme o recebimento.", "lhe", "o", "pedir", "*pedir algo a alguém*: indirecto → *lhe pedir*."),
      B("Prezada senhora, nós ___ desejamos boas festas.", "lhe", "a", "desejamos", "*desejar algo a alguém*: indirecto → *lhe desejamos*."),
      B("Prezado cliente, a loja ___ enviará a nota fiscal.", "lhe", "o", "enviará", "*enviar algo a alguém*: indirecto → *lhe enviará*."),
      B("Prezado senhor, nós ___ garantimos que o problema será resolvido.", "lhe", "o", "garantimos", "*garantir algo a alguém*: indirecto → *lhe garantimos*."),
      B("Caro colega, eu ___ recomendo este livro.", "lhe", "o", "recomendo", "*recomendar algo a alguém*: indirecto → *lhe recomendo*."),
      B("Prezado aluno, a secretaria ___ responderá em breve.", "lhe", "o", "responderá", "*responder a alguém*: indirecto → *lhe responderá*."),
      B("Senhor diretor, eu ___ comunico que estarei de férias.", "lhe", "o", "comunico", "*comunicar algo a alguém*: indirecto → *lhe comunico*."),
      B("Prezada senhora, o banco ___ devolverá o valor.", "lhe", "a", "devolverá", "*devolver algo a alguém*: indirecto → *lhe devolverá*."),
      B("Caro autor, a revista ___ agradece a colaboração.", "lhe", "o", "agradece", "*agradecer algo a alguém*: indirecto → *lhe agradece*.")
    ] },

    // Semana 48: alegar (una justificación, en defensa propia, que quien
    // cita no da por cierta) o reconhecer (admitir algo en contra de uno).
    { id: "alegar", week: 48, title: "alegar o reconhecer", sub: "se justifica o lo admite", items: [
      A("O réu ___ que estava em casa na hora do crime.", "alegou", "reconheceu", "na hora do crime", "Una coartada, en defensa propia: *alegou*."),
      A("Para faltar à aula, o aluno ___ que estava doente.", "alegou", "reconheceu", "Para faltar", "Una excusa para faltar: *alegou*."),
      A("A empresa ___ problemas técnicos para justificar o atraso.", "alegou", "reconheceu", "para justificar", "Para justificarse: *alegou*."),
      A("Em sua defesa, o motorista ___ que o sinal estava apagado.", "alegou", "reconheceu", "Em sua defesa", "*em sua defesa*: *alegou*."),
      A("O deputado ___ motivos de saúde para não comparecer.", "alegou", "reconheceu", "para não comparecer", "Una razón para no ir: *alegou*."),
      A("O inquilino ___ falta de dinheiro para não pagar o aluguel.", "alegou", "reconheceu", "para não pagar", "Una justificación para no pagar: *alegou*."),
      A("A defesa ___ que as provas eram ilegais.", "alegou", "reconheceu", "A defesa", "Lo que sostiene la defensa a su favor: *alegou*."),
      A("O jogador ___ cansaço para sair do treino mais cedo.", "alegou", "reconheceu", "para sair", "Una excusa para irse: *alegou*."),
      A("O funcionário ___ que o sistema estava fora do ar quando perdeu o prazo.", "alegou", "reconheceu", "quando perdeu o prazo", "Se justifica por el plazo perdido: *alegou*."),
      A("Sem apresentar provas, o candidato ___ fraude na eleição.", "alegou", "reconheceu", "Sem apresentar provas", "Afirma sin probar: *alegou*."),
      B("O ministro ___ que o próprio governo errou.", "reconheceu", "alegou", "o próprio governo", "Admite un error propio: *reconheceu*."),
      B("A empresa ___ a falha e pediu desculpas.", "reconheceu", "alegou", "pediu desculpas", "Admite y pide disculpas: *reconheceu*."),
      B("O técnico ___ que o time jogou mal.", "reconheceu", "alegou", "jogou mal", "Admite algo en contra de su equipo: *reconheceu*."),
      B("Depois do debate, o candidato ___ a derrota.", "reconheceu", "alegou", "a derrota", "*reconhecer a derrota* = aceptarla."),
      B("O autor ___ os próprios erros no prefácio.", "reconheceu", "alegou", "os próprios erros", "Admite sus errores: *reconheceu*."),
      B("O prefeito ___ que a obra atrasou por falta de planejamento da própria prefeitura.", "reconheceu", "alegou", "da própria prefeitura", "Admite una culpa propia: *reconheceu*."),
      B("Humildemente, ela ___ que não sabia a resposta.", "reconheceu", "alegou", "Humildemente", "Con humildad, admite: *reconheceu*."),
      B("O banco ___ a cobrança indevida e devolveu o dinheiro.", "reconheceu", "alegou", "devolveu o dinheiro", "Admite el error y lo repara: *reconheceu*."),
      B("O réu ___ a culpa diante do juiz.", "reconheceu", "alegou", "a culpa", "*reconhecer a culpa* = admitirla."),
      B("A diretora ___ que a escola falhou com os alunos.", "reconheceu", "alegou", "falhou", "Admite una falla propia: *reconheceu*.")
    ] },

    // Semana 49: la norma escrita (o vi, enviá-lo) o el habla de Brasil
    // (vi ele, me liga).  La pista es el género: un ofício o un WhatsApp.
    { id: "normahabla", week: 49, title: "vi-o o vi ele", sub: "la norma escrita o el habla de Brasil", items: [
      A("No ofício: o documento? ___ ontem ao setor jurídico.", "Encaminhei-o", "Encaminhei ele", "No ofício", "En un *ofício*, la norma: *encaminhei-o*. *Encaminhei ele* es del habla."),
      A("Na carta ao síndico: o porteiro? ___ várias vezes, sem sucesso.", "Procurei-o", "Procurei ele", "Na carta", "En una carta formal: *procurei-o*."),
      A("No relatório: os dados? ___ em tabelas no anexo.", "Organizamo-los", "Organizamos eles", "No relatório", "En un informe: *organizamo-los* (la *-s* de *-mos* cae ante *-los*)."),
      A("No e-mail ao diretor: ___ que o prazo terminou.", "informo-lhe", "te informo", "ao diretor", "Al director, en la norma: *informo-lhe*. *Te* es de la charla."),
      A("Na resposta ao cliente: seu pedido? ___ amanhã.", "Vamos enviá-lo", "Vamos enviar ele", "Na resposta ao cliente", "A un cliente, por escrito: *vamos enviá-lo*."),
      A("Na ata: a proposta? A diretoria ___ por unanimidade.", "a aprovou", "aprovou ela", "Na ata", "En un acta: *a aprovou*. *Aprovou ela* es del habla."),
      A("No parecer: as testemunhas? O juiz ___ na sexta.", "as ouviu", "ouviu elas", "No parecer", "En un dictamen: *as ouviu*."),
      A("Na petição: o contrato? O réu ___ em 2019.", "o assinou", "assinou ele", "Na petição", "En una petición judicial: *o assinou*."),
      A("Senhor coordenador, ___ que revise a minha matrícula.", "peço-lhe", "te peço", "Senhor coordenador", "Al coordinador, en la norma: *peço-lhe*."),
      A("Na redação do Enem: os jovens? A escola deve ___ para o mercado.", "prepará-los", "preparar eles", "Na redação", "En una redacción: *prepará-los*."),
      B("No WhatsApp: a Bia? ___ ontem no shopping!", "Vi ela", "Vi-a", "No WhatsApp", "En el habla de Brasil, *vi ela*. *Vi-a* en un mensaje suena a Portugal o a libro."),
      B("No áudio: ___ amanhã de manhã, tá?", "Me liga", "Liga-me", "No áudio", "Hablando, el pronombre va adelante: *me liga*."),
      B("No restaurante, com amigos: ___ o cardápio?", "Me passa", "Passa-me", "com amigos", "En la charla: *me passa*. *Passa-me* suena europeo."),
      B("Cara, o livro? ___ depois, relaxa.", "Te empresto", "Empresto-te", "Cara", "Entre amigos (*cara*): *te empresto*."),
      B("Mãe, o celular? ___ no sofá, pode pegar.", "Deixei ele", "Deixei-o", "Mãe", "Hablando con la mamá: *deixei ele*."),
      B("Mensagem para a Bia: ___ quando chegar!", "Me avisa", "Avisa-me", "Mensagem", "En un mensaje: *me avisa*."),
      B("Na praia: o protetor? ___ um pouco, por favor.", "Me dá", "Dá-me", "Na praia", "En la playa, charlando: *me dá*."),
      B("No telefone com a mãe: ___, viu?", "Te amo", "Amo-te", "No telefone", "En la charla de Brasil: *te amo*. *Amo-te* suena a Portugal."),
      B("Entre amigos: a Ana? Eu ___ amanhã na faculdade.", "vejo ela", "a verei", "Entre amigos", "Charlando: *vejo ela*. *A verei* es de la escritura formal."),
      B("No boteco, para o garçom: ___ uma cerveja aí!", "Me vê", "Vê-me", "No boteco", "*Me vê uma cerveja* (traeme una cerveza), en la charla.")
    ] },

    // Semana 49: próclise si algo atrae al pronombre (não, que, já,
    // ninguém…); ênclise si la oración arranca con el verbo, también
    // después de un vocativo.  La norma escrita.
    { id: "proclise", week: 49, title: "me disseram o disseram-me", sub: "con un atractor o al principio", items: [
      A("Não ___ nada sobre a reunião.", "me disseram", "disseram-me", "Não", "*não* atrae al pronombre: *não me disseram*."),
      A("Ninguém ___ o resultado da prova.", "me avisou", "avisou-me", "Ninguém", "*ninguém* atrae al pronombre: *ninguém me avisou*."),
      A("O relatório que ___ ontem está incompleto.", "nos enviaram", "enviaram-nos", "que", "*que* (relativo) atrae: *que nos enviaram*."),
      A("Sempre ___ com respeito.", "o trataram", "trataram-no", "Sempre", "*sempre* atrae: *sempre o trataram*."),
      A("Já ___ a resposta oficial do ministério.", "lhe deram", "deram-lhe", "Já", "*já* atrae: *já lhe deram*."),
      A("Quem ___ essa informação?", "lhe passou", "passou-lhe", "Quem", "*quem* atrae: *quem lhe passou*."),
      A("Tudo ___ estranho naquela casa.", "lhe parecia", "parecia-lhe", "Tudo", "*tudo* atrae: *tudo lhe parecia*."),
      A("Espero que ___ antes da noite.", "o encontrem", "encontrem-no", "Espero que", "*que* atrae: *que o encontrem*."),
      A("Nunca ___ tão bem.", "me senti", "senti-me", "Nunca", "*nunca* atrae: *nunca me senti*."),
      A("Onde ___ esses documentos?", "se encontram", "encontram-se", "Onde", "*onde* atrae: *onde se encontram*."),
      B("Prezados, ___ que a reunião foi adiada.", "comunico-lhes", "lhes comunico", "Prezados", "Después de un vocativo (*Prezados*), la oración arranca con el verbo: en la norma, ênclise, *comunico-lhes*."),
      B("Senhor diretor, ___ o relatório em anexo.", "envio-lhe", "lhe envio", "Senhor diretor", "Tras el vocativo, nada atrae: *envio-lhe*."),
      B("Prezada Ana, ___ pela promoção!", "parabenizo-a", "a parabenizo", "Prezada Ana", "La oración arranca con el verbo: *parabenizo-a*."),
      B("Caros colegas, ___ a todos pelo esforço.", "agradeço-lhes", "lhes agradeço", "Caros colegas", "Tras el vocativo: *agradeço-lhes*."),
      B("Senhores passageiros, ___ que mantenham os cintos afivelados.", "pedimos-lhes", "lhes pedimos", "Senhores passageiros", "Al principio de la oración, ênclise: *pedimos-lhes*."),
      B("Excelentíssimo senhor, ___ a revisão do processo.", "solicito-lhe", "lhe solicito", "Excelentíssimo senhor", "Tras el vocativo: *solicito-lhe*."),
      B("Prezado cliente, ___ que seu pedido foi enviado.", "informamos-lhe", "lhe informamos", "Prezado cliente", "La oración empieza con el verbo: *informamos-lhe*."),
      B("Caro João, ___ o convite para a palestra.", "agradeço-lhe", "lhe agradeço", "Caro João", "Tras el vocativo: *agradeço-lhe*."),
      B("Senhora presidente, ___ cordialmente em nome da equipe.", "cumprimento-a", "a cumprimento", "Senhora presidente", "Al principio, ênclise: *cumprimento-a*."),
      B("Prezados alunos, ___ para a cerimônia de formatura.", "convidamo-los", "os convidamos", "Prezados alunos", "Al principio, ênclise: *convidamo-los* (la *-s* de *-mos* cae ante *-los*).")
    ] }
  ];

  root.DUELLI_DATA = { DUELLI: DUELLI };
})(typeof window !== "undefined" ? window : globalThis);
