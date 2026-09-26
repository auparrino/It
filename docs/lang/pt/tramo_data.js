/* Tramo C1: generado por tools/lib/build_tramo.js a partir de tools/pt/tramo/.
   No editar a mano: editá los JSON de cada semana y corré npm run build. */
(function (root) {
  "use strict";
  root.TRAMO_DATA = {
 "series": {
  "id": "lunga",
  "name": "Leituras longas",
  "emoji": "📰",
  "blurb": "De la semana 27 en adelante, un texto largo por semana (de 350 a 900 palabras) de un género real, con preguntas en portugués como en el Celpe-Bras."
 },
 "names": {
  "ascolto": "Escutas longas"
 },
 "GENRES": {
  "carta_formal": {
   "name": "Carta formal",
   "paragraphs": 3,
   "open": [
    "\\b(prezad[oa]s?|senhor[a]?|sr\\.|sra\\.|ilustr[ií]ssim[oa]|excelent[ií]ssim[oa]|a quem possa interessar|à coordenação|ao senhor|à senhora|à diretoria)\\b"
   ],
   "close": [
    "\\b(atenciosamente|cordialmente|respeitosamente|agradeço|desde já agradeço|sem mais)"
   ],
   "openHint": "Prezado(a)…, Senhor(a)…",
   "closeHint": "Atenciosamente, Cordialmente + nome",
   "hint": "Registro formal: vocativo, apresentação e motivo, desenvolvimento, pedido concreto, despedida e assinatura."
  },
  "email_informal": {
   "name": "E-mail informal",
   "paragraphs": 3,
   "open": [
    "\\b(oi|olá|ola|querid[oa]s?|e aí|fala)\\b"
   ],
   "close": [
    "\\b(abraços?|beijos?|um beijo|até logo|até mais|até breve|me conta|me fala|saudades|bjs|abs)\\b"
   ],
   "openHint": "Oi…, Querida…",
   "closeHint": "Um abraço, Beijos, Até mais…",
   "hint": "Registro informal (você, a gente), mas com parágrafos: saudação, motivo, desenvolvimento, despedida."
  },
  "carta_leitor": {
   "name": "Carta do leitor",
   "paragraphs": 3,
   "open": [
    "\\b(prezad[oa]s?|senhor[a]? editor[a]?|caro editor|cara editora|à redação|prezada redação)\\b"
   ],
   "close": [
    "\\b(atenciosamente|cordialmente|leitor[a]? d[eao]|agradeço)"
   ],
   "openHint": "Prezados editores…, À redação…",
   "closeHint": "Atenciosamente + nome e cidade",
   "hint": "Responde a uma matéria publicada: mencioná-la, posicionar-se, argumentar e fechar com uma proposta."
  },
  "artigo": {
   "name": "Artigo",
   "paragraphs": 3,
   "title": true,
   "hint": "Título na primeira linha; abertura que prenda o leitor, desenvolvimento com informações do texto ou do áudio, conclusão."
  },
  "resenha": {
   "name": "Resenha",
   "paragraphs": 3,
   "title": true,
   "hint": "Título; apresentação da obra ou do evento, pontos fortes e fracos com exemplos, avaliação final e recomendação."
  },
  "texto_opiniao": {
   "name": "Texto de opinião",
   "paragraphs": 4,
   "hint": "Tese na introdução, pelo menos dois argumentos com exemplos, um contra-argumento refutado, conclusão."
  },
  "resumo": {
   "name": "Resumo",
   "paragraphs": 3,
   "hint": "As ideias principais com suas palavras, na ordem lógica, atribuídas ao autor (segundo o autor, o texto defende…), sem opinião."
  },
  "relato": {
   "name": "Relato",
   "paragraphs": 3,
   "hint": "Narração em primeira pessoa com contexto (quando, onde, quem), fatos em ordem, e uma reflexão final."
  }
 },
 "CONNETTIVI": [
  "porém",
  "contudo",
  "entretanto",
  "no entanto",
  "todavia",
  "aliás",
  "inclusive",
  "portanto",
  "logo",
  "assim",
  "além disso",
  "ademais",
  "por outro lado",
  "em primeiro lugar",
  "em segundo lugar",
  "por exemplo",
  "ou seja",
  "isto é",
  "embora",
  "apesar de",
  "mesmo que",
  "desde que",
  "já que",
  "visto que",
  "uma vez que",
  "enquanto",
  "em suma",
  "enfim",
  "por fim",
  "em conclusão",
  "dessa forma",
  "desse modo",
  "por isso",
  "pois",
  "de fato",
  "afinal",
  "ainda assim",
  "caso"
 ],
 "SETTIMANE": [
  {
   "week": 27,
   "level": "B2",
   "lettura": {
    "title": "Trocar a capital pelo interior: o que ninguém conta",
    "emoji": "🚚",
    "genre": "reportagem",
    "grammar": "futuro do subjuntivo",
    "text": "Quando a Renata Siqueira fala da mudança, ela ainda ri do caminhão. Foram onze horas de estrada entre São Paulo e uma cidadezinha no sul de Minas Gerais, com dois filhos, um cachorro e uma geladeira que não passava pela porta da casa nova. “Se alguém me perguntar se valeu a pena, eu vou dizer que sim. Mas vou dizer também que não foi o paraíso que eu tinha imaginado”, conta a designer, de 41 anos.\n\nA história dela não é rara. Nos últimos anos, com o trabalho remoto, muitas famílias das grandes capitais começaram a fazer as contas: aluguel mais barato, menos trânsito, mais tempo com as crianças. Quem acompanha esse tipo de mudança, porém, faz um alerta. “Quem sair da cidade grande só para fugir dos problemas vai encontrar outros”, resume o psicólogo Álvaro Tenório, que atende famílias em transição. Segundo ele, a primeira pergunta não é para onde ir, mas o que a pessoa espera encontrar lá.\n\nOs obstáculos costumam aparecer depois da lua de mel. A internet cai quando chove, o hospital mais próximo fica a quarenta minutos e a escola nem sempre oferece o que os pais queriam. Além disso, a vida social exige paciência: nas cidades pequenas, todo mundo se conhece, e o recém-chegado demora a ser convidado. “Se você quiser fazer amigos, vai ter que participar da festa da igreja, do mutirão da praça, da reunião da escola. Ninguém vai bater na sua porta”, diz Renata.\n\nPara quem estiver pensando em dar esse passo, Tenório sugere um período de teste. “Alugue uma casa por alguns meses antes de vender tudo. Se as crianças se adaptarem e o trabalho continuar funcionando, aí sim vale a pena pensar em algo definitivo.” Ele também recomenda conversar com os moradores antigos, e não só com outros paulistanos que fizeram o mesmo caminho. “Eles vão dizer como é o inverno, onde fica o médico bom, quem conserta o telhado. Isso não aparece em nenhum anúncio de imobiliária.”\n\nRenata, por enquanto, não pensa em voltar. “Enquanto eu puder trabalhar daqui e os meninos estiverem felizes, a gente fica. Quando eles forem para a faculdade, talvez a gente repense. Mas isso é assunto para daqui a dez anos.” Na janela da cozinha, a geladeira que não cabia na porta finalmente encontrou o seu lugar.",
    "gloss": {
     "caminhão": "camión",
     "estrada": "ruta",
     "cidadezinha": "pueblito",
     "geladeira": "heladera",
     "aluguel": "alquiler",
     "fugir": "escapar",
     "atende": "atiende",
     "costumam": "suelen",
     "cai": "se corta",
     "recém-chegado": "recién llegado",
     "mutirão": "trabajo comunitario voluntario",
     "bater": "golpear, tocar (la puerta)",
     "alugue": "alquilá",
     "moradores": "vecinos, habitantes",
     "conserta": "arregla",
     "telhado": "techo (de tejas)",
     "imobiliária": "inmobiliaria",
     "repense": "lo repensemos",
     "janela": "ventana",
     "cabia": "cabía"
    },
    "questions": [
     [
      "Qual é a ideia central da reportagem?",
      [
       "Mudar para o interior pode dar certo, mas exige preparação e expectativas realistas.",
       "As famílias que deixam as capitais quase sempre se arrependem e acabam voltando para lá.",
       "O trabalho remoto acabou com os problemas das cidades pequenas de Minas.",
       "Os psicólogos desaconselham qualquer mudança com filhos pequenos."
      ],
      "Mudar para o interior pode dar certo, mas exige preparação e expectativas realistas."
     ],
     [
      "Por que o texto começa e termina falando da geladeira?",
      [
       "Para mostrar que a família gastou demais com a mudança.",
       "Porque ela simboliza as dificuldades iniciais que acabaram sendo resolvidas.",
       "Para criticar as casas mal construídas do interior.",
       "Porque Renata quer vendê-la antes de voltar a São Paulo."
      ],
      "Porque ela simboliza as dificuldades iniciais que acabaram sendo resolvidas."
     ],
     [
      "Segundo Álvaro Tenório, qual deve ser a primeira pergunta de quem quer se mudar?",
      [
       "Quanto custa o aluguel na nova cidade.",
       "Se haverá boa internet e escola perto.",
       "O que a pessoa espera encontrar no novo lugar.",
       "Para qual cidade outros paulistanos foram."
      ],
      "O que a pessoa espera encontrar no novo lugar."
     ],
     [
      "No contexto, a expressão “depois da lua de mel” se refere a…",
      [
       "o período posterior ao casamento de Renata.",
       "o fim do encantamento inicial com a nova vida.",
       "as férias que a família tirou antes de se mudar.",
       "a época do ano em que chove mais em Minas."
      ],
      "o fim do encantamento inicial com a nova vida."
     ],
     [
      "Por que o psicólogo recomenda conversar com os moradores antigos?",
      [
       "Porque eles costumam oferecer aluguéis mais baratos aos recém-chegados da capital.",
       "Porque os outros paulistanos dão informações falsas.",
       "Porque é a única forma de ser convidado para as festas.",
       "Porque conhecem detalhes práticos que não aparecem nos anúncios."
      ],
      "Porque conhecem detalhes práticos que não aparecem nos anúncios."
     ]
    ],
    "vf": [
     [
      "A viagem de mudança de Renata durou menos de um dia.",
      "verdadeiro"
     ],
     [
      "Renata afirma que a vida no interior foi exatamente como ela imaginava.",
      "falso"
     ],
     [
      "Tenório sugere vender a casa na capital antes de fazer o período de teste.",
      "falso"
     ],
     [
      "O marido de Renata também trabalha de forma remota.",
      "não se diz"
     ],
     [
      "Renata admite que a família pode repensar a decisão no futuro.",
      "verdadeiro"
     ]
    ],
    "hunt": {
     "label": "Tocá los verbos en futuro do subjuntivo",
     "targets": [
      "perguntar",
      "sair",
      "quiser",
      "estiver",
      "adaptarem",
      "puder",
      "estiverem",
      "forem"
     ]
    }
   },
   "ascolto": {
    "title": "Morar fora: por onde começar?",
    "genre": "programa de rádio com consultas",
    "es": "En un programa de radio, una conductora le lee a un consultor en movilidad internacional las dudas de los oyentes que piensan irse a vivir al exterior.",
    "speakers": [
     "Luciana, apresentadora",
     "Paulo, consultor"
    ],
    "turns": [
     [
      "A",
      "Boa tarde, você está ouvindo o Vida em Movimento. Hoje o assunto é morar fora do Brasil, e quem responde às perguntas é o Paulo Ribeiro, que trabalha há quinze anos com mudanças internacionais. Tudo bem, Paulo?"
     ],
     [
      "B",
      "Tudo ótimo, Luciana. Obrigado pelo convite."
     ],
     [
      "A",
      "Então, a primeira mensagem é da Juliana, de Belo Horizonte. Ela tem vinte e oito anos, é enfermeira e quer ir para o Canadá. Ela pergunta: por onde eu começo?"
     ],
     [
      "B",
      "Olha, Juliana, a primeira coisa é o documento, não a passagem. Quando você tiver o diploma traduzido e reconhecido, aí sim você começa a procurar vaga. Tem muita gente que faz o contrário, sabe? Compra a passagem, chega lá e descobre que não pode trabalhar na área."
     ],
     [
      "A",
      "E isso demora?"
     ],
     [
      "B",
      "Depende muito do país e da profissão. Na área de saúde, geralmente demora, tipo, um ano ou mais. Por isso, se ela puder, é bom começar agora, enquanto ainda está empregada aqui."
     ],
     [
      "A",
      "Tá. A segunda pergunta é do Rodrigo, de Porto Alegre. Ele quer levar a família inteira, mulher e dois filhos, e tem medo de as crianças sofrerem com a língua."
     ],
     [
      "B",
      "É um medo muito comum, né? Mas, na minha experiência, as crianças são as que se adaptam mais rápido. Quem sofre mais, na verdade, costuma ser o adulto que fica em casa, sem trabalho e sem rede de amigos. Então, Rodrigo, se vocês forem, pensem também em como a sua mulher vai se integrar. Um curso, um trabalho voluntário, qualquer coisa."
     ],
     [
      "A",
      "Interessante, eu não tinha pensado nisso. E a saudade, Paulo? Muita gente escreve falando disso."
     ],
     [
      "B",
      "A saudade vem, não tem jeito. O que eu digo é: não tome nenhuma decisão importante nos primeiros seis meses. Nem de ficar para sempre, nem de voltar correndo. Deixe o tempo passar um pouco."
     ],
     [
      "A",
      "Ótimo conselho. Voltamos depois do intervalo com mais perguntas."
     ]
    ],
    "gloss": {
     "passagem": "pasaje",
     "vaga": "puesto de trabajo vacante",
     "enfermeira": "enfermera",
     "empregada": "empleada",
     "tá": "está bien, dale",
     "saudade": "nostalgia, extrañar",
     "jeito": "forma, manera (“não tem jeito”: no hay forma de evitarlo)",
     "intervalo": "tanda publicitaria, pausa"
    },
    "questions": [
     [
      "Qual é o primeiro passo que Paulo recomenda a Juliana?",
      [
       "Comprar logo a passagem para garantir um bom preço.",
       "Resolver a tradução e o reconhecimento do diploma.",
       "Procurar uma vaga de enfermeira antes de tudo.",
       "Pedir demissão para ter tempo de estudar a língua."
      ],
      "Resolver a tradução e o reconhecimento do diploma."
     ],
     [
      "Por que Paulo sugere que Juliana comece o processo já?",
      [
       "Porque o reconhecimento na área de saúde costuma ser demorado.",
       "Porque as regras do Canadá vão mudar no ano que vem.",
       "Porque ela está prestes a perder o emprego no Brasil.",
       "Porque as vagas de enfermeira são poucas no inverno."
      ],
      "Porque o reconhecimento na área de saúde costuma ser demorado."
     ],
     [
      "Qual é a opinião de Paulo sobre a adaptação das crianças?",
      [
       "As crianças sofrem mais que os adultos com a língua.",
       "É melhor que as crianças fiquem no Brasil no primeiro ano.",
       "Em geral, elas se adaptam mais depressa que os adultos.",
       "Depende de a escola oferecer aulas em português."
      ],
      "Em geral, elas se adaptam mais depressa que os adultos."
     ],
     [
      "O que surpreende a apresentadora na resposta ao Rodrigo?",
      [
       "A ideia de que o adulto sem trabalho é quem mais sofre.",
       "A informação de que o Canadá não aceita famílias grandes.",
       "O conselho de fazer um curso antes de viajar.",
       "O fato de Paulo ter morado fora com os filhos."
      ],
      "A ideia de que o adulto sem trabalho é quem mais sofre."
     ],
     [
      "O conselho final de Paulo sobre a saudade é…",
      [
       "voltar ao Brasil nas férias para diminuir a saudade.",
       "evitar decisões definitivas durante os primeiros meses.",
       "decidir logo se vai ficar, para não sofrer à toa.",
       "procurar outros brasileiros assim que chegar."
      ],
      "evitar decisões definitivas durante os primeiros meses."
     ]
    ],
    "vf": [
     [
      "Paulo trabalha com mudanças internacionais há mais de dez anos.",
      "verdadeiro"
     ],
     [
      "Juliana já tem uma oferta de emprego no Canadá.",
      "não se diz"
     ],
     [
      "Rodrigo pretende se mudar sozinho e levar a família depois.",
      "falso"
     ],
     [
      "Paulo diz que a saudade pode ser evitada com planejamento.",
      "falso"
     ]
    ]
   },
   "compito": {
    "genre": "email_informal",
    "title": "Conselhos para uma amiga que quer se mudar",
    "fonte": "lettura",
    "t": "Você tem uma amiga, a Camila, que mora no Rio de Janeiro e está pensando em se mudar com a família para uma cidade pequena na serra. Após ler a reportagem “Trocar a capital pelo interior: o que ninguém conta”, escreva um e-mail para a Camila contando a experiência da Renata e os conselhos do psicólogo Álvaro Tenório, e sugerindo como ela pode se preparar para a mudança. Não se esqueça de usar informações da reportagem, de mencionar pelo menos um problema prático e um desafio da vida social, e de usar um registro informal, adequado a uma amiga. Seu texto deve ter entre 120 e 180 palavras.",
    "es": "Un mail informal a una amiga: contale lo que leíste (Renata y los consejos del psicólogo) y aconsejala. Usá el futuro do subjuntivo (quando você for, se quiser) y cerrá con un saludo cariñoso.",
    "min": 120,
    "max": 180,
    "punti": [
     [
      "Saludo y motivo del mail (la mudanza de Camila)",
      [
       "oi",
       "querida",
       "olá"
      ]
     ],
     [
      "Contar la experiencia de Renata",
      [
       "renata"
      ]
     ],
     [
      "Un problema práctico (internet, hospital, escuela)",
      [
       "internet",
       "hospital",
       "escola",
       "médico"
      ]
     ],
     [
      "El consejo de alquilar primero / hacer una prueba",
      [
       "alug",
       "teste",
       "experiment"
      ]
     ],
     [
      "Cierre afectuoso",
      [
       "beijo",
       "abraço",
       "saudade"
      ]
     ]
    ],
    "model": "Oi, Camila, tudo bem?\n\nFiquei pensando na nossa conversa sobre a mudança para a serra e ontem li uma reportagem que tem tudo a ver com você. Conta a história da Renata, uma designer que saiu de São Paulo com os filhos e foi morar numa cidadezinha de Minas. Ela diz que valeu a pena, mas que não foi o paraíso que imaginava.\n\nOs problemas práticos aparecem logo: a internet cai quando chove e o hospital pode ficar longe. E a vida social exige paciência, porque ninguém vai bater na sua porta. Se você quiser fazer amigos, vai ter que ir à festa da igreja e às reuniões da escola.\n\nO psicólogo da reportagem dá um conselho ótimo: alugue uma casa por alguns meses antes de vender o apartamento. Se as crianças se adaptarem e o seu trabalho continuar funcionando, aí vocês decidem com calma.\n\nQuando você for visitar as cidades, me chama que eu vou junto!\n\nUm beijo grande,\nMarina"
   }
  },
  {
   "week": 28,
   "level": "B2",
   "lettura": {
    "title": "E se a gente escolhesse menos?",
    "emoji": "🥛",
    "genre": "coluna de opinião",
    "grammar": "imperfeito do subjuntivo e condicionais",
    "text": "Outro dia, na fila do supermercado, uma senhora me perguntou qual iogurte eu levaria se fosse ela. Havia, contei depois, vinte e três tipos na prateleira: integral, desnatado, grego, com mel, sem lactose, com pedaços de fruta. Respondi qualquer coisa e fiquei pensando que, se meu avô entrasse naquele corredor, sairia de mãos vazias. Não por falta de dinheiro, mas por excesso de alternativas.\n\nA gente cresceu ouvindo que liberdade é poder escolher. E é, claro. Ninguém em sã consciência gostaria de voltar a um tempo em que a profissão, o casamento e a cidade de uma pessoa fossem decididos pela família. Mas desconfio que confundimos liberdade com quantidade. Se tivéssemos menos opções, talvez escolhêssemos com mais calma e, principalmente, ficássemos mais satisfeitos com o que escolhemos.\n\nPenso nos meus alunos do cursinho. Aos dezessete anos, eles precisam decidir o que vão fazer da vida, como se a decisão fosse irreversível. Muitos me dizem que prefeririam que alguém escolhesse por eles. Um deles, o Caio, me confessou: “Se eu soubesse que dá para mudar depois, eu não estaria tão nervoso”. Seria cômico, se não fosse triste: passamos a adolescência inteira dizendo aos jovens que o mundo está aberto e esquecemos de avisar que as portas também se abrem mais tarde.\n\nNão estou propondo que as prateleiras voltem a ter um único iogurte, nem que os vestibulandos sorteiem o curso. Proponho algo mais modesto: que parássemos de tratar cada escolha como se fosse a última. Se encarássemos as decisões como experimentos, e não como sentenças, o medo de errar diminuiria bastante. Quem dera as escolas ensinassem isso com a mesma seriedade com que ensinam logaritmos.\n\nVoltando à senhora do supermercado: ela acabou levando o primeiro iogurte que viu, o mais simples de todos, e pareceu aliviada. Eu, que tinha passado cinco minutos comparando rótulos, saí com dois, e em casa descobri que não gostava de nenhum. Se fosse para dar um conselho, eu diria: escolha, prove e, se não gostar, escolha outra vez. A vida raramente é tão definitiva quanto parece na fila do caixa.",
    "gloss": {
     "fila": "fila, cola",
     "prateleira": "estante, góndola",
     "desnatado": "descremado",
     "corredor": "pasillo",
     "vazias": "vacías",
     "sã": "sana",
     "desconfio": "sospecho",
     "cursinho": "curso preuniversitario",
     "prefeririam": "preferirían",
     "vestibulandos": "aspirantes al examen de ingreso a la universidad",
     "sorteiem": "sorteen",
     "parássemos": "dejáramos",
     "encarássemos": "encaráramos, viéramos",
     "errar": "equivocarse",
     "aliviada": "aliviada",
     "rótulos": "etiquetas",
     "prove": "probá",
     "caixa": "caja (del súper)"
    },
    "questions": [
     [
      "Qual é a tese principal do colunista?",
      [
       "A liberdade de escolha deveria ser limitada pelo Estado.",
       "O excesso de opções pode tornar as escolhas mais angustiantes.",
       "Os supermercados enganam o consumidor com rótulos confusos e promessas exageradas.",
       "Os jovens deveriam deixar a família decidir a profissão."
      ],
      "O excesso de opções pode tornar as escolhas mais angustiantes."
     ],
     [
      "Por que o autor menciona o avô?",
      [
       "Para ilustrar alguém que ficaria paralisado diante de tantas alternativas.",
       "Porque o avô trabalhava num supermercado.",
       "Para mostrar que antigamente as pessoas comiam melhor e gastavam bem menos.",
       "Porque o avô escolheu a profissão do autor."
      ],
      "Para ilustrar alguém que ficaria paralisado diante de tantas alternativas."
     ],
     [
      "O que a fala do aluno Caio revela?",
      [
       "Que ele já tinha escolhido o curso errado.",
       "Que ele prefere não fazer faculdade nenhuma.",
       "Que os pais o pressionam para ser engenheiro.",
       "Que a ansiedade vem da ideia de que a escolha é definitiva."
      ],
      "Que a ansiedade vem da ideia de que a escolha é definitiva."
     ],
     [
      "Qual é a atitude do autor em relação à liberdade de escolha?",
      [
       "Rejeita-a completamente, por causar sofrimento.",
       "Defende-a, mas critica a confusão entre liberdade e quantidade.",
       "Considera-a um privilégio que só as gerações mais velhas souberam aproveitar.",
       "Mostra-se indiferente, pois o tema não o afeta."
      ],
      "Defende-a, mas critica a confusão entre liberdade e quantidade."
     ],
     [
      "O final do texto, com os dois iogurtes, sugere que…",
      [
       "o autor tem mais bom gosto que a senhora.",
       "os iogurtes mais caros são sempre os piores.",
       "pensar demais nem sempre leva a uma escolha melhor.",
       "é melhor não comprar nada quando há dúvida."
      ],
      "pensar demais nem sempre leva a uma escolha melhor."
     ]
    ],
    "vf": [
     [
      "Havia mais de vinte tipos de iogurte na prateleira.",
      "verdadeiro"
     ],
     [
      "O autor propõe que os vestibulandos sorteiem o curso.",
      "falso"
     ],
     [
      "O autor dá aulas em um cursinho.",
      "verdadeiro"
     ],
     [
      "O Caio acabou mudando de curso depois do primeiro ano.",
      "não se diz"
     ],
     [
      "A senhora do supermercado ficou insatisfeita com a escolha.",
      "falso"
     ]
    ],
    "hunt": {
     "label": "Tocá los verbos en imperfeito do subjuntivo",
     "targets": [
      "fosse",
      "entrasse",
      "fossem",
      "tivéssemos",
      "escolhêssemos",
      "ficássemos",
      "soubesse",
      "escolhesse",
      "parássemos",
      "encarássemos",
      "ensinassem"
     ]
    }
   },
   "ascolto": {
    "title": "Largar tudo e abrir uma pousada?",
    "genre": "podcast de conversa",
    "es": "En un podcast sobre decisiones, dos amigos, Tati y Bruno, discuten el plan de Bruno de dejar su trabajo en un banco para abrir una posada en la costa de Bahía.",
    "speakers": [
     "Tati",
     "Bruno"
    ],
    "turns": [
     [
      "A",
      "Bem-vindos a mais um episódio do Encruzilhada. Hoje o convidado é meu amigo Bruno, que trabalha há dez anos num banco em São Paulo e tem um sonho que deixa a mãe dele de cabelo em pé. Conta aí, Bruno."
     ],
     [
      "B",
      "Então, eu quero abrir uma pousada na Bahia, lá perto de Itacaré. Pequena, seis quartos, café da manhã caprichado. É um sonho antigo, sabe? Desde a faculdade."
     ],
     [
      "A",
      "E o que te segura?"
     ],
     [
      "B",
      "Olha, se eu fosse sincero, diria que é medo. Medo de largar um salário garantido e depois dar tudo errado."
     ],
     [
      "A",
      "Mas vem cá, se você tivesse a garantia de que ia dar certo, você iria amanhã?"
     ],
     [
      "B",
      "Amanhã não, mas no mês que vem, com certeza. O problema é que ninguém dá essa garantia, né?"
     ],
     [
      "A",
      "Claro. Eu vou fazer o papel de advogada do diabo. Se eu fosse você, antes de pedir demissão, passaria uma temporada trabalhando numa pousada de alguém. Sem romantismo. Lavando lençol, atendendo hóspede reclamando do chuveiro."
     ],
     [
      "B",
      "É, minha irmã falou a mesma coisa. Ela disse que eu idealizo muito, que eu vejo só a rede na varanda e o pôr do sol."
     ],
     [
      "A",
      "E ela tem razão?"
     ],
     [
      "B",
      "Um pouco, vai. Mas também acho que, se todo mundo pensasse assim, ninguém abriria negócio nenhum. Em algum momento você tem que arriscar."
     ],
     [
      "A",
      "Concordo, mas arriscar com rede de proteção. Tipo, uma reserva que desse para viver um ano sem lucro."
     ],
     [
      "B",
      "Isso eu já estou juntando. Acho que o próximo passo é mesmo tirar umas férias longas e trabalhar lá de graça, para ver se eu aguento."
     ],
     [
      "A",
      "Pois é. E depois você volta aqui e conta pra gente."
     ]
    ],
    "gloss": {
     "encruzilhada": "encrucijada",
     "caprichado": "bien hecho, cuidado",
     "segura": "frena, detiene",
     "largar": "dejar, soltar",
     "demissão": "renuncia",
     "temporada": "temporada, período",
     "lençol": "sábana",
     "hóspede": "huésped",
     "chuveiro": "ducha",
     "rede": "hamaca paraguaya / red",
     "varanda": "galería, balcón",
     "juntando": "ahorrando",
     "aguento": "aguanto"
    },
    "questions": [
     [
      "Segundo Bruno, o que o impede de realizar o sonho?",
      [
       "A falta de dinheiro para comprar o terreno.",
       "O medo de perder a segurança do salário.",
       "A oposição da irmã e da mãe.",
       "A dificuldade de conseguir clientes na Bahia."
      ],
      "O medo de perder a segurança do salário."
     ],
     [
      "O que Tati quer dizer com “fazer o papel de advogada do diabo”?",
      [
       "Que vai apresentar objeções, mesmo sem ser contra o plano.",
       "Que vai defender Bruno diante da família.",
       "Que conhece as leis sobre pousadas.",
       "Que acha o sonho de Bruno perigoso e imoral."
      ],
      "Que vai apresentar objeções, mesmo sem ser contra o plano."
     ],
     [
      "Qual é a crítica da irmã de Bruno?",
      [
       "Ele gasta demais com viagens.",
       "Ele escolheu uma região isolada demais para atrair turistas.",
       "Ele imagina apenas o lado agradável do negócio.",
       "Ele não sabe cozinhar para os hóspedes."
      ],
      "Ele imagina apenas o lado agradável do negócio."
     ],
     [
      "Em que ponto Tati e Bruno concordam no final?",
      [
       "É preciso arriscar, mas com alguma proteção financeira.",
       "É melhor esperar a aposentadoria para abrir a pousada.",
       "O banco deveria financiar o projeto.",
       "Não vale a pena largar um emprego estável por um sonho de juventude."
      ],
      "É preciso arriscar, mas com alguma proteção financeira."
     ],
     [
      "Qual será, provavelmente, o próximo passo de Bruno?",
      [
       "Pedir demissão no mês que vem.",
       "Comprar uma pousada já pronta em Itacaré.",
       "Fazer um curso de administração hoteleira.",
       "Trabalhar numa pousada durante as férias."
      ],
      "Trabalhar numa pousada durante as férias."
     ]
    ],
    "vf": [
     [
      "Bruno trabalha no banco há uma década.",
      "verdadeiro"
     ],
     [
      "A pousada que Bruno imagina teria mais de dez quartos.",
      "falso"
     ],
     [
      "A mãe de Bruno já visitou Itacaré.",
      "não se diz"
     ],
     [
      "Bruno ainda não começou a guardar dinheiro para o projeto.",
      "falso"
     ]
    ]
   },
   "compito": {
    "genre": "texto_opiniao",
    "title": "Menos opções, mais felicidade?",
    "fonte": "lettura",
    "t": "Você é leitor(a) do jornal que publicou a coluna “E se a gente escolhesse menos?”. O jornal convidou os leitores a enviar textos de opinião para a seção Debate, respondendo à pergunta: “Seríamos mais felizes se tivéssemos menos opções?”. Após ler a coluna, escreva um texto de opinião em que você apresente a tese do colunista, posicione-se a favor ou contra ela e sustente sua posição com pelo menos dois argumentos, um deles relacionado à escolha da profissão pelos jovens. Não se esqueça de dar um título ao texto e de usar um registro formal. Seu texto deve ter entre 126 e 186 palavras.",
    "es": "Un texto de opinión para un diario: resumí la tesis de la columna, tomá posición y argumentá (uno de los argumentos, sobre los jóvenes y la carrera). Aprovechá las hipótesis con se + imperfeito do subjuntivo + condicional.",
    "min": 126,
    "max": 186,
    "punti": [
     [
      "Presentar la tesis del columnista",
      [
       "colunista",
       "coluna",
       "autor"
      ]
     ],
     [
      "Tomar posición",
      [
       "concordo",
       "discordo",
       "na minha opinião",
       "acredito",
       "creio"
      ]
     ],
     [
      "Argumento sobre los jóvenes y la elección de carrera",
      [
       "jovens",
       "vestibul",
       "profissão",
       "curso",
       "adolesc"
      ]
     ],
     [
      "Conclusión",
      [
       "portanto",
       "por isso",
       "enfim",
       "em suma",
       "assim"
      ]
     ]
    ],
    "model": "Escolher cansa, mas não escolher cansa mais\n\nNa coluna “E se a gente escolhesse menos?”, o autor defende que o excesso de opções nos deixa ansiosos e insatisfeitos, e que seríamos mais felizes se tivéssemos menos alternativas. Concordo apenas em parte.\n\nÉ verdade que ninguém precisa de vinte e três tipos de iogurte. No consumo, a abundância muitas vezes só gera perda de tempo. No entanto, quando se trata de decisões importantes, reduzir as opções seria um erro. Se os jovens de hoje tivessem as mesmas possibilidades que seus avós, muitos estariam presos a profissões que não escolheram.\n\nO problema dos vestibulandos, a meu ver, não é a quantidade de cursos, mas a falsa ideia de que a primeira escolha é para sempre. Nesse ponto, o colunista acerta em cheio: se as escolas mostrassem que é possível mudar de caminho, a pressão diminuiria muito.\n\nPortanto, não precisamos de menos liberdade, e sim de menos medo de errar. Mais opções, com mais tolerância aos recomeços."
   }
  },
  {
   "week": 29,
   "level": "B2",
   "lettura": {
    "title": "Estágio não é emprego (mas também não é favor)",
    "emoji": "🎓",
    "genre": "guia informativo",
    "grammar": "infinitivo pessoal",
    "text": "Todo semestre, milhares de universitários começam o primeiro estágio com a mesma mistura de entusiasmo e insegurança. Querem aprender, querem causar boa impressão e, muitas vezes, aceitam qualquer condição por medo de perderem a vaga. Preparamos este guia para vocês conhecerem seus direitos antes de assinarem qualquer papel.\n\nO que é, afinal, um estágio? Pela lei, o estágio é um ato educativo. Isso significa que a prioridade não é a produção da empresa, mas o aprendizado do estudante. Por isso, a instituição de ensino, a empresa e o estagiário assinam um termo de compromisso que descreve as atividades previstas. Recomendamos vocês guardarem uma cópia desse documento: é ele que vai servir de prova se algo der errado.\n\nHorário e descanso. Para quem está no ensino superior, a jornada não pode passar de seis horas por dia. É comum, porém, os estagiários ficarem até mais tarde “só hoje”, e depois todos os dias, sem ninguém se dar conta. Hora extra não faz parte do estágio. Além disso, depois de um ano no mesmo lugar, vocês têm direito a um recesso de trinta dias, de preferência coincidindo com as férias escolares, justamente para poderem descansar da rotina dupla.\n\nBolsa e transporte. No estágio não obrigatório, aquele que o estudante faz por escolha própria, a empresa deve pagar uma bolsa e um auxílio-transporte. Desconfiem de propostas que oferecem apenas “experiência” como recompensa: experiência não paga aluguel nem passagem de ônibus.\n\nQuando algo não vai bem. Muitos colegas contam que passam o dia tirando cópias ou atendendo o telefone, tarefas que nada têm a ver com o curso. Antes de pedirem demissão, conversem com o supervisor da empresa e com o professor orientador. Eles existem justamente para os estágios cumprirem sua função. Se a situação não mudar, procurem a coordenação do curso: vocês têm o direito de serem ouvidos sem sofrerem represálias.\n\nPor fim, um lembrete: conhecer os direitos não é ser encrenqueiro. As boas empresas são as primeiras a quererem estagiários bem informados, porque sabem que um estágio bem feito é o começo de uma carreira sólida. Ao terminarem a leitura, compartilhem este guia com os colegas. Quanto mais estudantes souberem disso, mais difícil vai ser alguém abusar.\n\nColetivo Estágio Justo, centro acadêmico da Faculdade de Administração",
    "gloss": {
     "estágio": "pasantía",
     "vaga": "puesto, lugar",
     "assinarem": "firmen (ustedes)",
     "estagiário": "pasante",
     "termo": "acta, convenio",
     "jornada": "jornada laboral",
     "recesso": "receso, licencia",
     "bolsa": "beca, asignación",
     "auxílio-transporte": "viático para transporte",
     "desconfiem": "desconfíen",
     "passagem": "boleto, pasaje",
     "ônibus": "colectivo",
     "tirando": "sacando (fotocopias)",
     "demissão": "renuncia",
     "orientador": "tutor",
     "represálias": "represalias",
     "lembrete": "recordatorio",
     "encrenqueiro": "problemático, quilombero",
     "compartilhem": "compartan",
     "abusar": "abusar, aprovecharse"
    },
    "questions": [
     [
      "Qual é o principal objetivo do texto?",
      [
       "Denunciar uma empresa específica que explora estagiários.",
       "Informar os estudantes sobre seus direitos no estágio.",
       "Convencer os universitários a não fazerem estágio.",
       "Explicar como conseguir um emprego depois do estágio."
      ],
      "Informar os estudantes sobre seus direitos no estágio."
     ],
     [
      "Por que o guia recomenda guardar uma cópia do termo de compromisso?",
      [
       "Porque a universidade exige o documento no fim do curso.",
       "Porque sem ele a bolsa não é paga.",
       "Porque ele pode servir como prova em caso de problema.",
       "Porque a empresa costuma perder os documentos dos estagiários."
      ],
      "Porque ele pode servir como prova em caso de problema."
     ],
     [
      "No terceiro parágrafo, a expressão “só hoje”, entre aspas, sugere que…",
      [
       "a empresa paga as horas extras apenas em dias especiais.",
       "os estagiários trabalham menos às sextas-feiras.",
       "a lei permite exceções uma vez por semana.",
       "a exceção acaba virando hábito sem ninguém perceber."
      ],
      "a exceção acaba virando hábito sem ninguém perceber."
     ],
     [
      "O que o texto aconselha a quem só tira cópias e atende o telefone?",
      [
       "Conversar com o supervisor e o orientador antes de desistir.",
       "Pedir demissão imediatamente e procurar outra vaga.",
       "Recorrer à Justiça sem avisar a empresa.",
       "Aceitar a situação, porque faz parte do aprendizado."
      ],
      "Conversar com o supervisor e o orientador antes de desistir."
     ],
     [
      "Qual é o tom do último parágrafo?",
      [
       "Resignado, pois os abusos nunca vão acabar.",
       "Irônico em relação às empresas que contratam estagiários.",
       "Encorajador, associando informação a proteção coletiva.",
       "Agressivo, ameaçando as empresas com processos."
      ],
      "Encorajador, associando informação a proteção coletiva."
     ]
    ],
    "vf": [
     [
      "Segundo o guia, o estágio é, antes de tudo, um ato educativo.",
      "verdadeiro"
     ],
     [
      "O guia afirma que horas extras são permitidas se forem bem pagas.",
      "falso"
     ],
     [
      "O recesso de trinta dias vale para qualquer estagiário desde o primeiro mês.",
      "falso"
     ],
     [
      "O Coletivo Estágio Justo oferece assessoria jurídica gratuita.",
      "não se diz"
     ],
     [
      "No estágio não obrigatório, a empresa deve pagar bolsa e auxílio-transporte.",
      "verdadeiro"
     ]
    ],
    "hunt": {
     "label": "Tocá los infinitivos personales (infinitivo con persona)",
     "targets": [
      "perderem",
      "conhecerem",
      "assinarem",
      "guardarem",
      "ficarem",
      "poderem",
      "pedirem",
      "cumprirem",
      "serem",
      "sofrerem",
      "quererem",
      "terminarem"
     ]
    }
   },
   "ascolto": {
    "title": "Estudar e trabalhar: quando o chefe não ajuda",
    "genre": "programa de rádio com consultas",
    "es": "En un programa de radio sobre derechos laborales, una oyente que trabaja y estudia de noche le cuenta su problema a una abogada.",
    "speakers": [
     "Jéssica, ouvinte",
     "Sandra, advogada"
    ],
    "turns": [
     [
      "B",
      "Boa noite, Jéssica, você está no ar. Pode contar a sua dúvida."
     ],
     [
      "A",
      "Boa noite, doutora. Então, eu trabalho numa loja de material de construção, de carteira assinada, e faço faculdade de enfermagem à noite. Quando eu entrei, combinei com o gerente de sair às cinco e meia, para dar tempo de chegar na aula."
     ],
     [
      "B",
      "Certo. E o que mudou?"
     ],
     [
      "A",
      "Mudou o gerente, né? O novo quer que todo mundo fique até as sete, porque é o horário de mais movimento. Eu já perdi duas provas este mês."
     ],
     [
      "B",
      "Entendi. Olha, Jéssica, a primeira coisa: esse acordo de horário foi feito por escrito ou só de boca?"
     ],
     [
      "A",
      "Só de boca. Na época parecia tranquilo."
     ],
     [
      "B",
      "É o que acontece na maioria dos casos. Então, o meu conselho é, antes de vocês discutirem de novo, você pedir uma reunião com o RH e levar o comprovante de matrícula e o horário das aulas. É importante eles verem que é uma coisa séria, não um capricho."
     ],
     [
      "A",
      "E se ele disser que não?"
     ],
     [
      "B",
      "Aí vale a pena procurar o sindicato da categoria. Às vezes a convenção coletiva tem regras sobre funcionário estudante. E, principalmente, guarde tudo: mensagens, escala, e-mails. Sem prova, fica a sua palavra contra a dele."
     ],
     [
      "A",
      "Tá, mas eu tenho medo de ser mandada embora."
     ],
     [
      "B",
      "Eu entendo, e é um medo legítimo. Por isso eu sugiro ir por etapas, com calma, sem confronto logo de cara. Muitas empresas preferem ajustar a escala a perder uma boa funcionária. E, se tudo der errado, pelo menos você vai ter documentado tudo para os seus direitos serem respeitados."
     ],
     [
      "A",
      "Obrigada, doutora. Vou fazer isso amanhã mesmo."
     ]
    ],
    "gloss": {
     "carteira": "libreta de trabajo (“de carteira assinada”: en blanco)",
     "combinei": "acordé, arreglé",
     "movimento": "movimiento de clientes",
     "boca": "boca (“de boca”: de palabra)",
     "matrícula": "inscripción",
     "capricho": "capricho",
     "sindicato": "sindicato",
     "escala": "cronograma de turnos",
     "mandada": "echada (“mandada embora”: despedida)",
     "etapas": "etapas, pasos",
     "cara": "cara (“logo de cara”: de entrada)"
    },
    "questions": [
     [
      "Qual é o problema de Jéssica?",
      [
       "O novo gerente exige que ela fique até tarde, e ela perde aulas.",
       "Ela foi demitida por faltar ao trabalho em dias de prova.",
       "A loja se recusa a registrar a carteira de trabalho dela desde o começo.",
       "O salário dela foi reduzido depois da mudança de gerente."
      ],
      "O novo gerente exige que ela fique até tarde, e ela perde aulas."
     ],
     [
      "Por que a advogada pergunta se o acordo foi feito por escrito?",
      [
       "Porque acordos verbais são proibidos por lei.",
       "Porque isso muda a força da prova que Jéssica tem.",
       "Porque quer saber se o gerente antigo ainda trabalha lá.",
       "Porque o sindicato só aceita casos com contrato novo."
      ],
      "Porque isso muda a força da prova que Jéssica tem."
     ],
     [
      "O que Jéssica deve levar à reunião com o RH?",
      [
       "Uma carta do sindicato e um advogado.",
       "A carteira de trabalho e os recibos de salário.",
       "O comprovante de matrícula e o horário das aulas.",
       "Uma declaração dos colegas de loja."
      ],
      "O comprovante de matrícula e o horário das aulas."
     ],
     [
      "Qual é a estratégia geral sugerida pela advogada?",
      [
       "Entrar logo na Justiça para garantir os direitos.",
       "Aceitar o novo horário até o fim do semestre.",
       "Pedir transferência para outra loja da rede.",
       "Agir aos poucos, dialogando e reunindo provas."
      ],
      "Agir aos poucos, dialogando e reunindo provas."
     ],
     [
      "Segundo a advogada, por que a empresa talvez aceite ajustar a escala?",
      [
       "Porque a lei obriga todas as lojas a liberar estudantes.",
       "Porque pode preferir isso a perder uma boa funcionária.",
       "Porque o gerente novo está em período de experiência.",
       "Porque o movimento da loja diminui à noite."
      ],
      "Porque pode preferir isso a perder uma boa funcionária."
     ]
    ],
    "vf": [
     [
      "Jéssica estuda enfermagem no período noturno.",
      "verdadeiro"
     ],
     [
      "O acordo inicial sobre o horário foi registrado em contrato.",
      "falso"
     ],
     [
      "A convenção coletiva da categoria de Jéssica garante horário especial para estudantes.",
      "não se diz"
     ],
     [
      "Jéssica pretende procurar o RH no dia seguinte.",
      "verdadeiro"
     ]
    ]
   },
   "compito": {
    "genre": "carta_formal",
    "title": "Pedido de regularização do estágio",
    "fonte": "lettura",
    "t": "Você faz estágio há oito meses numa agência de publicidade. Sua jornada frequentemente passa de seis horas, você passa boa parte do dia fazendo tarefas que não têm relação com o curso e nunca recebeu uma cópia do termo de compromisso. Após ler o guia “Estágio não é emprego (mas também não é favor)”, escreva uma carta formal para a gerente de Recursos Humanos da agência, Sra. Beatriz Andrade, expondo a situação, mencionando o que o guia informa sobre os direitos do estagiário e propondo soluções concretas. Não se esqueça de manter um tom respeitoso e cooperativo, com abertura e fecho adequados. Seu texto deve ter entre 131 e 191 palavras.",
    "es": "Una carta formal a Recursos Humanos: describí los tres problemas, apoyate en lo que dice la guía y proponé soluciones. Registro formal (Prezada Sra., Atenciosamente) y, si podés, infinitivo personal (para nós combinarmos…).",
    "min": 131,
    "max": 191,
    "punti": [
     [
      "Apertura formal y presentación",
      [
       "prezada",
       "senhora",
       "sra."
      ]
     ],
     [
      "Jornada que pasa de seis horas",
      [
       "seis horas",
       "jornada",
       "horário"
      ]
     ],
     [
      "Tareas sin relación con el curso",
      [
       "tarefas",
       "atividades",
       "cópias"
      ]
     ],
     [
      "Pedir el termo de compromisso",
      [
       "termo",
       "compromisso"
      ]
     ],
     [
      "Cierre formal",
      [
       "atenciosamente",
       "cordialmente",
       "respeitosamente"
      ]
     ]
    ],
    "model": "São Paulo, 12 de março de 2026\n\nPrezada Sra. Beatriz Andrade,\n\nMeu nome é Lucas Ferreira e faço estágio no setor de criação desta agência há oito meses. Escrevo para expor algumas questões e, principalmente, para buscarmos juntos uma solução.\n\nEm primeiro lugar, minha jornada tem ultrapassado com frequência as seis horas diárias. Segundo o guia do Coletivo Estágio Justo, esse é o limite para estudantes do ensino superior, e hora extra não faz parte do estágio. Além disso, grande parte do meu dia é dedicada a tarefas como tirar cópias e atender o telefone, que pouco têm a ver com a minha formação. Por fim, até hoje não recebi uma cópia do termo de compromisso.\n\nGostaria de sugerir uma reunião com o meu supervisor para revermos as atividades previstas e para eu receber o documento. Tenho certeza de que, com esses ajustes, o estágio será ainda mais proveitoso para ambas as partes.\n\nAgradeço desde já a atenção.\n\nAtenciosamente,\nLucas Ferreira"
   }
  }
 ]
};
  if (typeof module === "object" && module.exports) module.exports = root.TRAMO_DATA;
})(typeof window !== "undefined" ? window : globalThis);
