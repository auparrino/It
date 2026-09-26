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
    "text": "Quando a Renata Siqueira fala da mudança, ela ainda ri do caminhão. Foram onze horas de estrada entre São Paulo e uma cidadezinha no sul de Minas Gerais, com dois filhos, um cachorro e uma geladeira que não passava pela porta da casa nova. “Se alguém me perguntar se valeu a pena, eu vou dizer que sim. Mas vou dizer também que não foi o paraíso que eu tinha imaginado”, conta a designer, de 41 anos.\n\nA história dela não é rara. Nos últimos anos, com o trabalho remoto, muitas famílias das grandes capitais começaram a fazer as contas: aluguel mais barato, menos trânsito, mais tempo com as crianças. Quem acompanha esse tipo de mudança, porém, faz um alerta. “Quem sair da cidade grande só para fugir dos problemas vai encontrar outros”, resume o psicólogo Álvaro Tenório, que atende famílias em transição. Segundo ele, a primeira pergunta não é para onde ir, mas o que a pessoa espera encontrar lá.\n\nOs obstáculos costumam aparecer depois da lua de mel. A internet cai quando chove, o hospital mais próximo fica a quarenta minutos e a escola nem sempre oferece o que os pais queriam. Além disso, a vida social exige paciência: nas cidades pequenas, todo mundo se conhece, e o recém-chegado demora a ser convidado. “Se você quiser fazer amigos, vai ter que participar da festa da igreja, do mutirão da praça, da reunião da escola. Ninguém vai bater na sua porta”, diz Renata.\n\nPara quem estiver pensando em dar esse passo, Tenório sugere um período de teste. “Alugue uma casa por alguns meses antes de vender tudo. Se as crianças se adaptarem e o trabalho continuar funcionando, aí sim vale a pena pensar em algo definitivo.” Ele também recomenda conversar com os moradores antigos, e não só com outros paulistanos que fizeram o mesmo caminho. “Eles vão dizer como é o inverno, onde fica o médico bom, quem conserta o telhado. Isso não aparece em nenhum anúncio de imobiliária.”\n\nRenata, por enquanto, não pensa em voltar. “Enquanto eu puder trabalhar daqui e os meninos estiverem felizes, a gente fica. Quando eles forem para a faculdade, talvez a gente repense. Mas isso é assunto para daqui a dez anos.” Na cozinha, ao lado da janela, a geladeira que não cabia na porta finalmente encontrou o seu lugar.",
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
     "repense": "repensemos",
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
      "continuar",
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
      "Juliana já tem parentes morando no Canadá.",
      "não se diz"
     ],
     [
      "Rodrigo pretende se mudar sem a mulher e os filhos.",
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
      "Olha, sendo bem sincero, é medo. Medo de largar um salário garantido e depois dar tudo errado."
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
    "text": "Todo semestre, milhares de universitários começam o primeiro estágio com a mesma mistura de entusiasmo e insegurança. Querem aprender, querem causar boa impressão e, muitas vezes, aceitam qualquer condição por medo de perderem a vaga. Preparamos este guia para vocês conhecerem seus direitos antes de assinarem qualquer papel.\n\nO que é, afinal, um estágio? Pela lei, o estágio é um ato educativo. Isso significa que a prioridade não é a produção da empresa, mas o aprendizado do estudante. Por isso, a instituição de ensino, a empresa e o estagiário assinam um termo de compromisso que descreve as atividades previstas. É fundamental vocês guardarem uma cópia desse documento: é ele que vai servir de prova se algo der errado.\n\nHorário e descanso. Para quem está no ensino superior, a jornada não pode passar de seis horas por dia. É comum, porém, os estagiários ficarem até mais tarde “só hoje”, e depois todos os dias, sem ninguém se dar conta. Hora extra não faz parte do estágio. Além disso, depois de um ano no mesmo lugar, vocês têm direito a um recesso de trinta dias, de preferência coincidindo com as férias escolares, justamente para poderem descansar da rotina dupla.\n\nBolsa e transporte. No estágio não obrigatório, aquele que o estudante faz por escolha própria, a empresa deve pagar uma bolsa e um auxílio-transporte. Desconfiem de propostas que oferecem apenas “experiência” como recompensa: experiência não paga aluguel nem passagem de ônibus.\n\nQuando algo não vai bem. Muitos colegas contam que passam o dia tirando cópias ou atendendo o telefone, tarefas que nada têm a ver com o curso. Antes de pedirem demissão, conversem com o supervisor da empresa e com o professor orientador. Eles existem justamente para os estágios cumprirem sua função. Se a situação não mudar, procurem a coordenação do curso: vocês têm o direito de serem ouvidos sem sofrerem represálias.\n\nPor fim, um lembrete: conhecer os direitos não é ser encrenqueiro. As boas empresas são as primeiras a quererem estagiários bem informados, porque sabem que um estágio bem feito é o começo de uma carreira sólida. Ao terminarem a leitura, compartilhem este guia com os colegas. Quanto mais estudantes souberem disso, mais difícil vai ser alguém abusar.\n\nColetivo Estágio Justo, centro acadêmico da Faculdade de Administração",
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
  },
  {
   "week": 30,
   "level": "B2",
   "lettura": {
    "title": "As cartas da caixa de sapatos",
    "emoji": "✉️",
    "genre": "crônica memorialística",
    "grammar": "tempos compostos e hipótese no passado",
    "text": "Minha avó Zefinha morreu no ano passado, aos noventa e dois anos, e deixou uma caixa de sapatos cheia de cartas. Eu tinha passado a infância inteira na casa dela, na Zona Leste de São Paulo, e nunca tinha reparado naquela caixa, escondida no alto do guarda-roupa. Se alguém tivesse me perguntado, eu teria jurado que conhecia todas as histórias dela. Estava enganada.\n\nAs cartas eram de um rapaz chamado Severino, escritas entre 1958 e 1961, de uma cidadezinha do sertão da Paraíba. Pelas datas, entendi que ela já tinha vindo para São Paulo quando as recebeu. Ele falava da seca, da mãe doente, de um roçado que não tinha dado nada naquele ano. E, em quase todas, perguntava a mesma coisa: quando ela ia voltar.\n\nMinha avó nunca voltou. Casou com meu avô, um pedreiro pernambucano que ela tinha conhecido na fila de um posto de saúde, criou cinco filhos e só pisou de novo na Paraíba quarenta anos depois, para o enterro de uma irmã. Nunca mencionou nenhum Severino. Minha mãe, quando mostrei as cartas, ficou um tempo em silêncio e depois disse: “Se ela tivesse ficado lá, eu não teria nascido. Nem você.”\n\nÉ uma frase óbvia, mas me acompanhou por semanas. Fiquei imaginando a outra vida possível: a moça que teria se casado com Severino, que teria plantado feijão em vez de costurar para fora, que talvez tivesse sido mais feliz, ou menos. Não há como saber. O que sei é que, se eu não tivesse encontrado aquela caixa, teria continuado a ver minha avó como uma personagem simples, sem segredos, a senhora que fazia cuscuz aos domingos.\n\nA memória de uma família, percebo agora, é feita tanto do que se conta quanto do que se cala. Minha avó tinha guardado aquelas cartas durante mais de sessenta anos. Não as tinha queimado nem jogado fora. Terá sido saudade? Arrependimento? Ou apenas o costume de quem aprendeu a não desperdiçar nada, nem papel?\n\nTentei procurar o Severino. Um primo que ainda mora no sertão descobriu que ele tinha morrido nos anos noventa, depois de ter trabalhado a vida inteira na mesma terra. Tinha tido filhos, netos. Talvez algum deles guarde, numa gaveta, as cartas que minha avó escreveu de volta. Gosto de pensar que sim. Gosto de pensar que, em algum lugar, a outra metade da conversa também sobreviveu.",
    "gloss": {
     "reparado": "notado, prestado atención",
     "guarda-roupa": "ropero",
     "jurado": "jurado",
     "enganada": "equivocada",
     "rapaz": "muchacho",
     "sertão": "sertón, interior semiárido del Nordeste",
     "seca": "sequía",
     "roçado": "chacrita, parcela sembrada",
     "pedreiro": "albañil",
     "fila": "fila, cola",
     "pisou": "pisó",
     "enterro": "entierro",
     "feijão": "porotos",
     "costurar": "coser (“costurar para fora”: coser por encargo)",
     "cuscuz": "cuscús nordestino (de harina de maíz)",
     "cala": "calla",
     "queimado": "quemado",
     "arrependimento": "arrepentimiento",
     "desperdiçar": "desperdiciar",
     "gaveta": "cajón"
    },
    "questions": [
     [
      "O que a narradora descobre com as cartas?",
      [
       "Que o avô tinha escrito cartas de amor para uma moça de Pernambuco.",
       "Que a avó tinha voltado várias vezes para a Paraíba.",
       "Que a avó tinha deixado no sertão um rapaz que esperava a sua volta.",
       "Que Severino era um irmão da avó que ficou no sertão."
      ],
      "Que a avó tinha deixado no sertão um rapaz que esperava a sua volta."
     ],
     [
      "A frase da mãe, “Nem você”, tem o efeito de…",
      [
       "culpar a avó por ter abandonado Severino no sertão sem explicação.",
       "lembrar que a existência da família dependeu daquela escolha.",
       "mostrar que a mãe não gostou de ver as cartas.",
       "sugerir que a narradora deveria ir à Paraíba."
      ],
      "lembrar que a existência da família dependeu daquela escolha."
     ],
     [
      "Como a narradora via a avó antes de encontrar a caixa?",
      [
       "Como uma senhora sem grandes segredos.",
       "Como uma mulher amargurada pelo passado.",
       "Como uma pessoa misteriosa e distante.",
       "Como alguém que falava muito do sertão."
      ],
      "Como uma senhora sem grandes segredos."
     ],
     [
      "Qual é a ideia central do quinto parágrafo?",
      [
       "As pessoas mais velhas guardam papéis velhos apenas por economia.",
       "É impossível saber se a avó foi feliz no casamento.",
       "As cartas antigas devem ser doadas a museus.",
       "A memória familiar se constrói também com silêncios."
      ],
      "A memória familiar se constrói também com silêncios."
     ],
     [
      "O que expressa o final do texto?",
      [
       "A certeza de que os filhos de Severino guardaram as cartas.",
       "O desejo, sem comprovação, de que a correspondência completa exista.",
       "A decisão de viajar ao sertão para conhecer a família de Severino.",
       "A tristeza por não ter conhecido Severino pessoalmente."
      ],
      "O desejo, sem comprovação, de que a correspondência completa exista."
     ]
    ],
    "vf": [
     [
      "As cartas foram escritas ao longo de alguns anos, entre o fim dos anos 1950 e o início dos anos 1960.",
      "verdadeiro"
     ],
     [
      "A avó voltou à Paraíba logo depois de se casar.",
      "falso"
     ],
     [
      "O avô da narradora sabia da existência das cartas.",
      "não se diz"
     ],
     [
      "Severino ainda está vivo e mora no sertão.",
      "falso"
     ],
     [
      "A avó criou cinco filhos em São Paulo.",
      "verdadeiro"
     ]
    ],
    "hunt": {
     "label": "Tocá las formas del auxiliar ter en los tiempos compuestos (tinha, tivesse, teria…)",
     "targets": [
      "tinha",
      "tivesse",
      "teria",
      "terá",
      "ter"
     ]
    }
   },
   "ascolto": {
    "title": "O último trem de Vila Esperança",
    "genre": "entrevista de história oral",
    "es": "Para un proyecto de memoria oral, una entrevistadora conversa con un ferroviario jubilado de un pueblo de Minas Gerais sobre el día en que dejó de pasar el tren de pasajeros.",
    "speakers": [
     "Clara, entrevistadora",
     "Seu Aurélio"
    ],
    "turns": [
     [
      "A",
      "Seu Aurélio, obrigada por receber a gente. Para começar, o senhor pode contar como foi parar na ferrovia?"
     ],
     [
      "B",
      "Ah, minha filha, eu tinha quinze anos. Meu pai já trabalhava na estação e me levou para ajudar a carregar as malas. Eu achava que ia ficar uns meses. Fiquei trinta e oito anos."
     ],
     [
      "A",
      "E como era a estação naquela época?"
     ],
     [
      "B",
      "Era o coração da cidade, sabe? Todo mundo ia lá. Quem esperava parente, quem vendia pastel, quem só queria ver o trem chegar. Os namoros começavam na plataforma. O meu mesmo começou ali."
     ],
     [
      "A",
      "Que bonito. E o senhor se lembra do último trem de passageiros?"
     ],
     [
      "B",
      "Lembro como se fosse hoje. Foi numa quinta-feira. O pessoal tinha colocado bandeirinha, parecia festa, mas era enterro, né? Eu estava na plataforma de uniforme, e quando o trem saiu, o maquinista apitou três vezes. Tinha gente chorando."
     ],
     [
      "A",
      "O senhor já sabia que ia acabar?"
     ],
     [
      "B",
      "Olha, a gente desconfiava. Já tinham cortado os horários, os vagões estavam cada vez mais vazios, porque a estrada tinha sido asfaltada e todo mundo tinha comprado carro ou ia de ônibus. Mas ninguém acreditava de verdade."
     ],
     [
      "A",
      "E o senhor acha que, se o trem não tivesse acabado, a cidade seria diferente hoje?"
     ],
     [
      "B",
      "Eu acho que sim. Se tivessem mantido pelo menos o trem de carga, muita família não teria ido embora. Os meus dois filhos, por exemplo, foram para Belo Horizonte. Talvez tivessem ficado. Mas também pode ser que não, né? Os jovens sempre querem conhecer o mundo."
     ],
     [
      "A",
      "E a estação, o que virou?"
     ],
     [
      "B",
      "Ficou fechada uns vinte anos. Agora a prefeitura reformou e virou biblioteca. Eu vou lá toda semana. Fico sentado no banco da plataforma, lendo jornal, esperando um trem que não vem mais."
     ]
    ],
    "gloss": {
     "ferrovia": "ferrocarril",
     "malas": "valijas",
     "pastel": "empanada frita",
     "namoros": "noviazgos",
     "bandeirinha": "banderita",
     "maquinista": "maquinista",
     "apitou": "tocó el silbato",
     "desconfiava": "sospechaba",
     "vagões": "vagones",
     "asfaltada": "asfaltada",
     "carga": "carga (“trem de carga”: tren de carga)",
     "virou": "se convirtió en"
    },
    "questions": [
     [
      "Como Seu Aurélio começou a trabalhar na ferrovia?",
      [
       "Foi contratado depois de passar num concurso público da ferrovia.",
       "O pai o levou para ajudar na estação ainda adolescente.",
       "Começou vendendo pastel na plataforma.",
       "Foi transferido de uma estação de Belo Horizonte."
      ],
      "O pai o levou para ajudar na estação ainda adolescente."
     ],
     [
      "Por que ele diz que a despedida “parecia festa, mas era enterro”?",
      [
       "Porque houve uma festa de verdade na cidade logo depois da partida.",
       "Porque um ferroviário tinha morrido naquela semana.",
       "Porque a decoração alegre contrastava com a tristeza geral.",
       "Porque a prefeitura organizou música e discursos."
      ],
      "Porque a decoração alegre contrastava com a tristeza geral."
     ],
     [
      "Segundo ele, o que contribuiu para o fim do trem de passageiros?",
      [
       "A estrada asfaltada e a preferência pelo carro e pelo ônibus.",
       "Um acidente grave com um dos vagões.",
       "A falta de maquinistas na região.",
       "O fechamento da mina de ferro que sustentava a economia da cidade."
      ],
      "A estrada asfaltada e a preferência pelo carro e pelo ônibus."
     ],
     [
      "Qual é a posição de Seu Aurélio sobre os filhos terem ido embora?",
      [
       "Tem certeza de que ficariam se o trem tivesse continuado funcionando.",
       "Culpa os filhos por terem abandonado a cidade.",
       "Acredita que o trem influenciaria, mas admite a dúvida.",
       "Acha que a mudança não teve nada a ver com o trem."
      ],
      "Acredita que o trem influenciaria, mas admite a dúvida."
     ],
     [
      "A imagem final do entrevistado sugere…",
      [
       "alegria com a nova biblioteca da cidade.",
       "raiva da prefeitura pela reforma da estação.",
       "vontade de voltar a trabalhar na ferrovia como antigamente.",
       "uma nostalgia serena por um tempo que não volta."
      ],
      "uma nostalgia serena por um tempo que não volta."
     ]
    ],
    "vf": [
     [
      "Seu Aurélio trabalhou na ferrovia por mais de três décadas.",
      "verdadeiro"
     ],
     [
      "O último trem de passageiros partiu num domingo.",
      "falso"
     ],
     [
      "A esposa de Seu Aurélio também trabalhava na estação.",
      "não se diz"
     ],
     [
      "A antiga estação continua abandonada até hoje.",
      "falso"
     ]
    ]
   },
   "compito": {
    "genre": "relato",
    "title": "Um objeto que guarda uma história",
    "fonte": "lettura",
    "t": "Um projeto de memória oral está reunindo relatos de famílias brasileiras para uma exposição chamada “O que as gavetas guardam”. Após ler a crônica “As cartas da caixa de sapatos”, escreva um relato pessoal para o site do projeto. Comece comentando, em poucas linhas, o que a descoberta da narradora mostra sobre a memória de uma família; depois conte a história de um objeto, uma foto ou um documento da sua família e reflita sobre como a vida de vocês poderia ter sido diferente se algum fato do passado tivesse acontecido de outra forma. Não se esqueça de narrar em primeira pessoa, com um registro semiformal. Seu texto deve ter entre 137 e 197 palavras.",
    "es": "Un relato personal: partí de la crónica (qué muestra sobre la memoria familiar), contá la historia de un objeto de tu familia y armá una hipótesis en el pasado (se tivesse…, teria…).",
    "min": 137,
    "max": 197,
    "punti": [
     [
      "Comentar la crónica de las cartas",
      [
       "crônica",
       "cartas",
       "caixa",
       "zefinha"
      ]
     ],
     [
      "Presentar el objeto y la persona de la familia",
      [
       "minha avó",
       "meu avô",
       "minha mãe",
       "meu pai",
       "bisav",
       "tio",
       "tia"
      ]
     ],
     [
      "Hipótesis en el pasado",
      [
       "tivesse",
       "teria",
       "teríamos"
      ]
     ],
     [
      "Reflexión sobre la memoria",
      [
       "memória",
       "lembr",
       "silêncio",
       "segredo"
      ]
     ]
    ],
    "model": "O relógio que parou em Buenos Aires\n\nA crônica “As cartas da caixa de sapatos” me fez pensar que a memória de uma família também é feita de silêncios. Às vezes, um único objeto guarda uma história que ninguém teve coragem de contar.\n\nNa minha casa, esse objeto é um relógio de bolso que pertenceu ao meu bisavô, um espanhol que chegou a Buenos Aires em 1923. O relógio está parado às quatro e dez, e meu pai sempre disse que ninguém sabia por quê. Só no ano passado, conversando com uma tia, descobri que meu bisavô tinha comprado uma passagem para o Rio de Janeiro, onde um irmão o esperava. Na véspera da viagem, conheceu minha bisavó num baile e desistiu.\n\nSe ele tivesse embarcado, eu teria nascido brasileiro, e talvez estivesse escrevendo este relato na minha língua materna. Não sei se teríamos sido mais felizes. Sei que o relógio parado, hoje, me parece menos um defeito e mais uma lembrança daquela noite em que tudo poderia ter sido diferente."
   }
  },
  {
   "week": 31,
   "level": "B2",
   "lettura": {
    "title": "O último jornal de papel do vale",
    "emoji": "🗞️",
    "genre": "reportagem",
    "grammar": "discurso indireto e correlação de tempos",
    "text": "Na manhã em que visitamos a redação do Correio do Vale, Marlene Andrade estava revisando, de caneta vermelha, a página de obituários. A jornalista, de 67 anos, contou que fazia aquilo toda quinta-feira havia mais de três décadas e que ainda não tinha se acostumado a encontrar nomes conhecidos na lista. “Numa cidade de vinte mil habitantes, a gente conhece todo mundo que morre”, disse, sem tirar os olhos do papel.\n\nO semanário, fundado pelo pai dela em 1974, é hoje o único veículo de imprensa de uma região de seis municípios no sul da Bahia. Marlene explicou que a tiragem, que já tinha chegado a oito mil exemplares, caíra para pouco mais de mil, e que a publicidade das lojas locais mal pagava o papel. Perguntei se ela tinha pensado em fechar. Ela respondeu que pensava nisso todos os dias, mas que ainda não tinha coragem.\n\nPesquisadores que estudam o jornalismo local chamam de “desertos de notícias” os municípios que não têm nenhum veículo dedicado à cobertura da vida da cidade. Segundo o professor de comunicação Henrique Sales, que acompanha o fenômeno há alguns anos, quando um jornal como o de Marlene desaparece, a população perde muito mais do que uma fonte de informação. Ele afirmou que, sem imprensa local, ninguém fiscaliza as contas da prefeitura nem as decisões da câmara de vereadores, e acrescentou que os boatos passam a circular sem nenhum contraponto nos grupos de mensagens.\n\nMarlene conhece bem esse risco. Ela lembrou que, dois anos antes, um áudio anônimo tinha espalhado que a água da cidade estava contaminada, e que as pessoas esvaziaram os supermercados em poucas horas. Foi o Correio do Vale, segundo ela, que ligou para o laboratório, publicou o resultado da análise e acalmou a população. “Se não fosse a gente, o prefeito ia desmentir no rádio e metade da cidade ia dizer que ele estava mentindo”, comentou.\n\nO filho de Marlene, Tiago, de 34 anos, quer transformar o jornal num site com assinatura digital. Ele me disse que já tinha feito as contas e que, se conseguisse quinhentos assinantes, o projeto se pagaria. A mãe desconfia. Afirmou que respeitava a ideia, mas que não sabia se os leitores mais velhos, que são a maioria, acompanhariam a mudança.\n\nAntes de irmos embora, Marlene nos mostrou a coleção completa do jornal, encadernada ano a ano, numa estante que ocupa uma parede inteira. Perguntamos o que aconteceria com aquilo tudo se o jornal fechasse. Ela ficou em silêncio e depois disse que preferia não pensar nisso naquele dia, porque ainda tinha uma edição para fechar.",
    "gloss": {
     "redação": "redacción (del diario)",
     "caneta": "birome, lapicera",
     "obituários": "necrológicas",
     "acostumado": "acostumbrado",
     "semanário": "semanario",
     "veículo": "medio (de comunicación)",
     "tiragem": "tirada",
     "caíra": "había caído",
     "fiscaliza": "controla",
     "vereadores": "concejales",
     "boatos": "rumores",
     "contraponto": "contrapeso, versión opuesta",
     "espalhado": "difundido",
     "esvaziaram": "vaciaron",
     "desmentir": "desmentir",
     "assinatura": "suscripción",
     "assinantes": "suscriptores",
     "desconfia": "desconfía",
     "encadernada": "encuadernada",
     "estante": "biblioteca, estantería"
    },
    "questions": [
     [
      "Qual é o foco principal da reportagem?",
      [
       "A biografia do pai de Marlene, fundador do jornal em 1974.",
       "A crise de um jornal local e o que sua possível perda significa.",
       "A disputa entre Marlene e o prefeito sobre o caso da água contaminada.",
       "As técnicas de revisão usadas pelos jornais do interior."
      ],
      "A crise de um jornal local e o que sua possível perda significa."
     ],
     [
      "Segundo o professor Henrique Sales, o que acontece em um “deserto de notícias”?",
      [
       "A população passa a ler apenas jornais das capitais.",
       "Os poderes locais ficam sem fiscalização e os boatos se espalham.",
       "Os anunciantes migram todos para as rádios comunitárias.",
       "Os jornalistas se mudam para cidades maiores."
      ],
      "Os poderes locais ficam sem fiscalização e os boatos se espalham."
     ],
     [
      "Qual é a função do episódio da água contaminada na reportagem?",
      [
       "Exemplificar concretamente a importância do jornal para a cidade.",
       "Mostrar que o prefeito da cidade é pouco confiável e mente no rádio.",
       "Criticar a qualidade dos laboratórios da região.",
       "Explicar por que a tiragem do jornal caiu tanto."
      ],
      "Exemplificar concretamente a importância do jornal para a cidade."
     ],
     [
      "Como Marlene reage ao projeto do filho?",
      [
       "Apoia-o sem reservas e já começou a vender assinaturas.",
       "Proíbe qualquer mudança enquanto estiver viva.",
       "Com respeito, mas com dúvidas sobre os leitores idosos.",
       "Diz que prefere vender o jornal a um grupo da capital."
      ],
      "Com respeito, mas com dúvidas sobre os leitores idosos."
     ],
     [
      "Na última frase, a palavra “fechar” ganha duplo sentido porque…",
      [
       "Marlene decidiu fechar o jornal naquela mesma semana.",
       "a repórter não entendeu a resposta de Marlene.",
       "a coleção seria fechada ao público a partir do dia seguinte.",
       "alude ao fim do jornal e também ao fechamento da edição."
      ],
      "alude ao fim do jornal e também ao fechamento da edição."
     ]
    ],
    "vf": [
     [
      "O Correio do Vale é publicado uma vez por semana.",
      "verdadeiro"
     ],
     [
      "A tiragem do jornal hoje é maior do que nos anos de maior sucesso.",
      "falso"
     ],
     [
      "Tiago já trabalhou em um jornal digital de Salvador.",
      "não se diz"
     ],
     [
      "Marlene disse que nunca pensou em fechar o jornal.",
      "falso"
     ],
     [
      "Segundo Tiago, quinhentos assinantes bastariam para sustentar o site.",
      "verdadeiro"
     ]
    ],
    "hunt": {
     "label": "Tocá los verbos que introducen el discurso indirecto",
     "targets": [
      "contou",
      "explicou",
      "perguntei",
      "respondeu",
      "afirmou",
      "acrescentou",
      "lembrou",
      "perguntamos"
     ]
    }
   },
   "ascolto": {
    "title": "“Eu nunca disse isso”",
    "genre": "conversa entre colegas de redação",
    "es": "En la redacción de un portal de noticias, una editora y un periodista hablan de un entrevistado que asegura que sus palabras fueron tergiversadas.",
    "speakers": [
     "Renata, editora",
     "Gustavo, repórter"
    ],
    "turns": [
     [
      "A",
      "Gustavo, senta aqui um minutinho. O empresário da entrevista de domingo ligou hoje cedo. Ele disse que nunca tinha falado aquilo sobre os funcionários."
     ],
     [
      "B",
      "Como assim, nunca tinha falado? Ele falou, Renata. Está gravado."
     ],
     [
      "A",
      "Calma, eu sei. Só estou te contando o que ele disse. Segundo ele, a frase foi tirada de contexto e o texto deu a entender que ele ia demitir metade da equipe."
     ],
     [
      "B",
      "Mas ele disse exatamente isso. Ele falou que, se as vendas não melhorassem até dezembro, ia ter que cortar metade do pessoal. Eu só coloquei no discurso indireto."
     ],
     [
      "A",
      "Então, aí é que está. No título, a gente pôs “Empresário anuncia demissão de metade dos funcionários”. Não tem nenhum “se” no título, né?"
     ],
     [
      "B",
      "Tá, o título ficou forte. Mas quem fez o título foi o pessoal do fechamento, não fui eu."
     ],
     [
      "A",
      "Eu sei, não estou te culpando. Estou tentando entender o que a gente responde. Ele pediu uma correção e falou que, se a gente não publicasse até amanhã, ia procurar um advogado."
     ],
     [
      "B",
      "Olha, eu acho que o texto está correto. O título, sim, exagerou. A condição sumiu, virou um anúncio."
     ],
     [
      "A",
      "Concordo. Então vamos fazer assim: a gente mantém o texto, porque a gravação confirma tudo, e publica uma nota de esclarecimento dizendo que o título foi alterado para refletir melhor a declaração."
     ],
     [
      "B",
      "Faz sentido. E eu mando para ele o trecho do áudio, para ele ver que a gente não inventou nada."
     ],
     [
      "A",
      "Isso. Mas manda com educação, tá? Sem aquele tom de quem ganhou a discussão."
     ],
     [
      "B",
      "Pode deixar. Aliás, acho que vale uma conversa com o pessoal do fechamento sobre títulos. Não é a primeira vez que isso acontece."
     ],
     [
      "A",
      "Anotado. Vou levar isso para a reunião de pauta de amanhã."
     ]
    ],
    "gloss": {
     "empresário": "empresario",
     "cedo": "temprano",
     "gravado": "grabado",
     "demitir": "despedir, echar",
     "pessoal": "personal, empleados",
     "fechamento": "cierre (el equipo que titula y cierra la edición)",
     "sumiu": "desapareció",
     "esclarecimento": "aclaración",
     "trecho": "fragmento",
     "pauta": "temario (“reunião de pauta”: reunión de temario)",
     "anotado": "anotado, tomo nota"
    },
    "questions": [
     [
      "Do que o empresário reclamou?",
      [
       "De não ter sido entrevistado pessoalmente.",
       "De que sua frase teria sido tirada de contexto.",
       "De que a entrevista foi publicada sem foto.",
       "De que o repórter gravou a conversa sem permissão."
      ],
      "De que sua frase teria sido tirada de contexto."
     ],
     [
      "O que o empresário realmente disse, segundo Gustavo?",
      [
       "Que já tinha demitido metade da equipe em dezembro.",
       "Que nunca demitiria ninguém, mesmo com a crise.",
       "Que ia demitir metade do pessoal se as vendas não melhorassem.",
       "Que ia contratar mais gente se as vendas melhorassem."
      ],
      "Que ia demitir metade do pessoal se as vendas não melhorassem."
     ],
     [
      "Onde, de fato, estava o problema da matéria?",
      [
       "No título, que transformou uma condição em anúncio.",
       "No texto do repórter, que inventou a declaração do empresário.",
       "Na gravação, que estava com trechos incompreensíveis.",
       "Na foto escolhida pelo fechamento para ilustrar a matéria."
      ],
      "No título, que transformou uma condição em anúncio."
     ],
     [
      "Qual é a solução combinada pelos dois?",
      [
       "Apagar a matéria do site e pedir desculpas publicamente.",
       "Esperar o advogado do empresário antes de qualquer ação.",
       "Refazer a entrevista com outras perguntas.",
       "Manter o texto, alterar o título e publicar um esclarecimento."
      ],
      "Manter o texto, alterar o título e publicar um esclarecimento."
     ],
     [
      "O que Renata pede a Gustavo ao enviar o áudio?",
      [
       "Que envie também a transcrição completa.",
       "Que seja educado e não demonstre triunfo.",
       "Que não mencione a nota de esclarecimento.",
       "Que peça ao empresário que retire a ameaça."
      ],
      "Que seja educado e não demonstre triunfo."
     ]
    ],
    "vf": [
     [
      "A entrevista com o empresário foi gravada.",
      "verdadeiro"
     ],
     [
      "Gustavo foi quem escreveu o título da matéria.",
      "falso"
     ],
     [
      "O empresário já tinha dado outras entrevistas ao portal.",
      "não se diz"
     ],
     [
      "Gustavo acha que o problema com os títulos é um caso isolado.",
      "falso"
     ]
    ]
   },
   "compito": {
    "genre": "resumo",
    "title": "Resumo para a newsletter do curso",
    "fonte": "lettura",
    "t": "Você é estudante de jornalismo e colabora com a newsletter semanal do seu curso, que recomenda aos colegas uma reportagem por semana. Após ler a reportagem “O último jornal de papel do vale”, escreva um resumo para a newsletter, apresentando o fenômeno dos desertos de notícias, a situação do Correio do Vale, o episódio da água contaminada e as posições de Marlene e de Tiago sobre o futuro do jornal. Não se esqueça de relatar as falas em discurso indireto, com os tempos verbais adequados, de não dar a sua opinião e de usar um registro formal. Seu texto deve ter entre 143 e 203 palavras.",
    "es": "Un resumen objetivo: sin opinión personal, con las ideas principales en orden y las declaraciones pasadas a discurso indirecto (disse que…, afirmou que…, explicou que…).",
    "min": 143,
    "max": 203,
    "punti": [
     [
      "Presentar el reportaje y el diario",
      [
       "correio do vale",
       "semanário",
       "jornal"
      ]
     ],
     [
      "Explicar los desertos de notícias",
      [
       "deserto"
      ]
     ],
     [
      "El episodio del agua",
      [
       "água",
       "contaminada",
       "boato"
      ]
     ],
     [
      "Posiciones de Marlene y Tiago",
      [
       "tiago",
       "filho",
       "digital",
       "site"
      ]
     ],
     [
      "Discurso indirecto",
      [
       "afirmou que",
       "disse que",
       "explicou que",
       "segundo",
       "contou que"
      ]
     ]
    ],
    "model": "A reportagem “O último jornal de papel do vale” conta a história do Correio do Vale, semanário fundado em 1974 e hoje o único veículo de imprensa de seis municípios do sul da Bahia. A jornalista Marlene Andrade, filha do fundador, explicou que a tiragem tinha caído de oito mil para pouco mais de mil exemplares e que a publicidade mal cobria os custos. Ela admitiu que pensava em fechar o jornal todos os dias.\n\nO texto relaciona o caso aos chamados desertos de notícias, municípios sem cobertura jornalística local. Segundo o professor Henrique Sales, nessas cidades ninguém fiscaliza a prefeitura e os boatos circulam sem contraponto. Marlene lembrou que, dois anos antes, um áudio falso sobre água contaminada tinha provocado pânico, e que foi o jornal que publicou a análise do laboratório e acalmou a população.\n\nQuanto ao futuro, o filho de Marlene, Tiago, afirmou que pretendia transformar o jornal em um site com assinatura digital e que quinhentos assinantes bastariam. A mãe disse que respeitava a ideia, mas duvidava que os leitores mais velhos acompanhassem a mudança."
   }
  },
  {
   "week": 32,
   "level": "B2",
   "lettura": {
    "title": "A cidade que se lê nas placas",
    "emoji": "🪧",
    "genre": "crônica",
    "grammar": "voz passiva sintética e sujeito indeterminado",
    "text": "Há quem conheça uma cidade pelos monumentos. Eu prefiro as placas escritas à mão. Nas minhas caminhadas pelo centro do Recife, aprendi que se descobre mais sobre um bairro lendo os avisos colados nas portas do que folheando qualquer guia turístico.\n\nComecemos pelos clássicos: “Aluga-se”, “Vende-se”, “Passa-se o ponto”. Quando muitos deles aparecem numa mesma rua, sabe-se que alguma coisa vai mal: o comércio antigo está indo embora, os aluguéis subiram, a clientela mudou de endereço. Na Rua da Imperatriz, contei outro dia onze “Aluga-se” em dois quarteirões. Onze. Não se precisa de um economista para interpretar esse dado.\n\nDepois vêm os pedidos. “Precisa-se de costureira com experiência.” “Precisa-se de ajudante de cozinha, tratar aqui.” Essas placas, curiosamente, me dão esperança. Se ainda se procura gente para trabalhar, é porque alguém acredita que o negócio tem futuro. Numa padaria da Boa Vista, a mesma placa de “Precisa-se de padeiro” está pendurada há meses. Já não sei se falta padeiro ou se sobra otimismo.\n\nHá também as regras, que dizem muito sobre o que incomoda as pessoas. “Não se aceitam cheques.” “Proibido estacionar, sujeito a guincho.” “Não se vende fiado.” Esta última, pintada na parede de uma mercearia, vem com um complemento irônico: “Fiado, só amanhã”. É uma piada velha, mas ainda se ri dela, e o dono, seu Everaldo, jura que funciona melhor do que qualquer cartaz sério. Em frente a um prédio residencial, uma folha plastificada avisa: “Não se admite barulho depois das 22h. Contamos com a colaboração de todos.” Imagino a reunião de condomínio que produziu aquela frase educada, e as brigas que ela esconde.\n\nE há, finalmente, as placas que ninguém sabe quem escreveu. “Conserta-se panela de pressão.” “Fazem-se unhas a domicílio.” “Compra-se ouro, prata e relógios antigos.” Não há nome, às vezes nem telefone, só uma seta apontando para uma escada estreita. Diz-se que, nesses sobrados, funciona uma economia inteira que não aparece nas estatísticas oficiais.\n\nOs urbanistas falam em poluição visual, e têm razão em parte: ninguém quer uma cidade coberta de papel velho. Discute-se agora, na Câmara Municipal, um projeto que proibiria cartazes improvisados nas fachadas do centro histórico. Entendo a intenção. Mas confesso um receio: se todas as placas forem retiradas, perde-se também uma forma de ler a cidade, escrita por quem vive nela, com erros de ortografia e tudo.\n\nHoje, voltando para casa, vi um papel novo numa porta azul: “Procura-se gato cinza, atende por Biscoito. Gratifica-se.” Fiquei olhando embaixo dos carros até escurecer. Não o encontrei, mas amanhã volto a procurar. Uma cidade também é isso: gente que se preocupa com o gato de desconhecidos.",
    "gloss": {
     "placas": "carteles",
     "colados": "pegados",
     "folheando": "hojeando",
     "ponto": "local comercial (“passa-se o ponto”: se traspasa el local)",
     "quarteirões": "cuadras",
     "costureira": "costurera",
     "padaria": "panadería",
     "pendurada": "colgada",
     "sobra": "sobra",
     "guincho": "grúa",
     "fiado": "fiado",
     "mercearia": "almacén",
     "piada": "chiste",
     "barulho": "ruido",
     "brigas": "peleas",
     "panela": "olla (“panela de pressão”: olla a presión)",
     "unhas": "uñas",
     "seta": "flecha",
     "sobrados": "casas de dos plantas",
     "receio": "temor",
     "gratifica-se": "se gratifica, hay recompensa"
    },
    "questions": [
     [
      "Qual é a tese do cronista?",
      [
       "As placas escritas à mão revelam aspectos da vida da cidade.",
       "O centro do Recife está completamente abandonado.",
       "Os guias turísticos deveriam incluir as placas da cidade.",
       "A poluição visual é o maior problema urbano do Recife."
      ],
      "As placas escritas à mão revelam aspectos da vida da cidade."
     ],
     [
      "Por que o autor diz que as placas de “Precisa-se” lhe dão esperança?",
      [
       "Porque ele próprio está procurando emprego no comércio do centro.",
       "Porque indicam que ainda há quem aposte no futuro dos negócios.",
       "Porque os salários oferecidos são altos.",
       "Porque desaparecem rapidamente das portas."
      ],
      "Porque indicam que ainda há quem aposte no futuro dos negócios."
     ],
     [
      "Na frase “Já não sei se falta padeiro ou se sobra otimismo”, o autor…",
      [
       "critica o dono da padaria por não pagar bem.",
       "afirma que não há padeiros desempregados na cidade.",
       "brinca com a dúvida sobre o motivo de a placa continuar ali.",
       "mostra que a padaria vai fechar em breve."
      ],
      "brinca com a dúvida sobre o motivo de a placa continuar ali."
     ],
     [
      "Qual é a posição do autor sobre o projeto discutido na Câmara?",
      [
       "Apoia-o com entusiasmo, porque detesta papel velho.",
       "Rejeita-o totalmente e pede a mobilização dos leitores contra a Câmara.",
       "Não tem opinião e apenas descreve o debate.",
       "Entende a intenção, mas teme perder um modo de ler a cidade."
      ],
      "Entende a intenção, mas teme perder um modo de ler a cidade."
     ],
     [
      "O episódio final do gato perdido serve para…",
      [
       "denunciar o abandono de animais no centro.",
       "reforçar a ideia de que as placas criam laços entre desconhecidos.",
       "mostrar que as placas quase nunca funcionam quando se trata de animais.",
       "introduzir um novo assunto para a próxima crônica."
      ],
      "reforçar a ideia de que as placas criam laços entre desconhecidos."
     ]
    ],
    "vf": [
     [
      "O autor contou onze placas de “Aluga-se” em dois quarteirões.",
      "verdadeiro"
     ],
     [
      "A placa da padaria da Boa Vista foi colocada na semana passada.",
      "falso"
     ],
     [
      "Seu Everaldo acha que a piada do fiado funciona melhor que um aviso sério.",
      "verdadeiro"
     ],
     [
      "O projeto de lei já foi aprovado pela Câmara Municipal.",
      "falso"
     ],
     [
      "O autor mora no bairro da Boa Vista.",
      "não se diz"
     ]
    ],
    "hunt": {
     "label": "Tocá las formas con “-se” de pasiva sintética o sujeto indeterminado",
     "targets": [
      "aluga-se",
      "vende-se",
      "sabe-se",
      "precisa-se",
      "conserta-se",
      "fazem-se",
      "compra-se",
      "diz-se",
      "discute-se",
      "perde-se",
      "procura-se"
     ]
    }
   },
   "ascolto": {
    "title": "Domingo sem carro na avenida",
    "genre": "programa de rádio de serviço",
    "es": "En un programa de radio de la mañana, el conductor entrevista a la coordinadora de un nuevo programa municipal que cierra una avenida a los autos los domingos, y le traslada las dudas de los oyentes.",
    "speakers": [
     "Fábio, apresentador",
     "Vera, coordenadora"
    ],
    "turns": [
     [
      "A",
      "Bom dia, ouvintes. A partir deste domingo, a Avenida Beira-Rio vai ser fechada para carros das sete da manhã às seis da tarde. Para explicar as regras, está aqui com a gente a Vera Campos, coordenadora do programa Domingo na Avenida. Bom dia, Vera."
     ],
     [
      "B",
      "Bom dia, Fábio, bom dia a todos."
     ],
     [
      "A",
      "Vera, a primeira pergunta é a mais óbvia: o que se pode fazer na avenida?"
     ],
     [
      "B",
      "Olha, praticamente tudo o que não tem motor. Caminhar, correr, andar de bicicleta, de patins, levar as crianças. Aceitam-se também cachorros, desde que estejam na coleira. A ideia é devolver a rua para as pessoas pelo menos um dia por semana."
     ],
     [
      "A",
      "Tem muita mensagem aqui de gente preocupada com o comércio. O pessoal da feira, por exemplo, pergunta se vai poder vender."
     ],
     [
      "B",
      "Vai, sim. Mas precisa fazer um cadastro na subprefeitura. Não se permite montar barraca em qualquer lugar, porque tem que deixar espaço para as ambulâncias passarem. Os pontos de venda vão ser demarcados no chão."
     ],
     [
      "A",
      "E o som? Porque já estão dizendo por aí que vai virar um grande baile."
     ],
     [
      "B",
      "Pois é, falam muita coisa, né? Mas não, som alto não se permite. Caixinha de som individual, tudo bem, em volume moderado. Apresentação de música, só nos palcos autorizados."
     ],
     [
      "A",
      "Tem também quem more na avenida. Um ouvinte, o Sérgio, pergunta como ele faz para tirar o carro da garagem."
     ],
     [
      "B",
      "Boa pergunta. Os moradores podem entrar e sair, mas em velocidade reduzida e acompanhados por um agente, nos cruzamentos principais. Fornece-se um adesivo para o para-brisa, que se retira na subprefeitura com comprovante de residência."
     ],
     [
      "A",
      "E se chover?"
     ],
     [
      "B",
      "Se chover forte, o programa é cancelado e avisa-se pelas redes sociais da prefeitura até as seis da manhã."
     ],
     [
      "A",
      "Muito bem. Obrigado, Vera, e bom domingo para todo mundo."
     ]
    ],
    "gloss": {
     "motor": "motor",
     "patins": "patines",
     "coleira": "correa, collar",
     "feira": "feria",
     "cadastro": "inscripción, registro",
     "barraca": "puesto (de feria)",
     "demarcados": "marcados, delimitados",
     "caixinha": "cajita (“caixinha de som”: parlante chico)",
     "palcos": "escenarios",
     "cruzamentos": "cruces, esquinas",
     "adesivo": "calcomanía, sticker",
     "para-brisa": "parabrisas"
    },
    "questions": [
     [
      "Qual é o objetivo principal do programa Domingo na Avenida?",
      [
       "Aumentar a arrecadação da feira aos domingos.",
       "Devolver a rua às pessoas ao menos uma vez por semana.",
       "Reduzir o número de acidentes com motos e carros na avenida.",
       "Criar um espaço exclusivo para shows de música."
      ],
      "Devolver a rua às pessoas ao menos uma vez por semana."
     ],
     [
      "Por que os feirantes não podem montar barraca em qualquer lugar?",
      [
       "Porque é preciso deixar passagem livre para as ambulâncias.",
       "Porque a prefeitura quer cobrar uma taxa mais alta.",
       "Porque os moradores reclamaram do barulho.",
       "Porque só se aceitam vendedores de comida."
      ],
      "Porque é preciso deixar passagem livre para as ambulâncias."
     ],
     [
      "O que Vera responde sobre os boatos de que a avenida vai “virar um grande baile”?",
      [
       "Confirma que haverá música alta o dia inteiro em toda a avenida.",
       "Diz que os bailes só vão acontecer à noite.",
       "Nega: só há música nos palcos autorizados e som moderado.",
       "Afirma que ainda não se decidiu nada sobre o som."
      ],
      "Nega: só há música nos palcos autorizados e som moderado."
     ],
     [
      "Como o morador Sérgio poderá tirar o carro da garagem?",
      [
       "Não poderá, porque a proibição vale para todos.",
       "Poderá sair só depois das seis da tarde.",
       "Terá de estacionar o carro em outra rua já no sábado à noite.",
       "Com um adesivo, devagar e acompanhado por um agente."
      ],
      "Com um adesivo, devagar e acompanhado por um agente."
     ],
     [
      "Em caso de chuva forte, o que acontece?",
      [
       "O programa é transferido para o sábado seguinte.",
       "O programa é cancelado e a informação sai nas redes sociais.",
       "A avenida fica fechada, mas sem vendedores.",
       "Os palcos são cobertos e os shows continuam."
      ],
      "O programa é cancelado e a informação sai nas redes sociais."
     ]
    ],
    "vf": [
     [
      "A avenida vai ficar fechada para carros durante onze horas.",
      "verdadeiro"
     ],
     [
      "É proibido levar cachorros para a avenida.",
      "falso"
     ],
     [
      "O programa foi inspirado em experiências de outras capitais.",
      "não se diz"
     ],
     [
      "O adesivo para moradores é enviado pelo correio.",
      "falso"
     ]
    ]
   },
   "compito": {
    "genre": "carta_leitor",
    "title": "Placas, sim ou não?",
    "fonte": "lettura",
    "t": "Você mora no centro do Recife e leu, no jornal da cidade, a crônica “A cidade que se lê nas placas”, que comenta um projeto da Câmara Municipal para proibir cartazes improvisados nas fachadas do centro histórico. Após ler a crônica, escreva uma carta do leitor para a seção Voz do Leitor do jornal, posicionando-se sobre o projeto. Retome pelo menos um exemplo ou argumento do cronista, para concordar ou discordar dele, e proponha uma alternativa ou uma condição para a regra. Não se esqueça de se identificar ao final e de usar um registro formal. Seu texto deve ter entre 148 e 208 palavras.",
    "es": "Una carta de lector al diario: tomá posición sobre el proyecto, retomá algún ejemplo de la crónica y proponé una alternativa. Aprovechá la pasiva con se (permitem-se, exige-se, retiram-se…).",
    "min": 148,
    "max": 208,
    "punti": [
     [
      "Referirse a la crónica",
      [
       "crônica",
       "cronista"
      ]
     ],
     [
      "Posición sobre el proyecto",
      [
       "projeto",
       "proib",
       "proposta"
      ]
     ],
     [
      "Retomar un ejemplo de las placas",
      [
       "aluga-se",
       "precisa-se",
       "fiado",
       "placa",
       "cartaz"
      ]
     ],
     [
      "Proponer una alternativa",
      [
       "sugiro",
       "proponho",
       "alternativa",
       "poderia",
       "que tal"
      ]
     ],
     [
      "Firma del lector",
      [
       "morador",
       "moradora",
       "recife"
      ]
     ]
    ],
    "model": "Prezado editor,\n\nLi com muito interesse a crônica “A cidade que se lê nas placas”, publicada no último domingo. Concordo com o cronista quando ele afirma que os avisos escritos à mão contam a história do centro: os onze “Aluga-se” da Rua da Imperatriz dizem mais sobre a crise do comércio do que muitos relatórios.\n\nNo entanto, não posso concordar totalmente com a defesa das placas. Moro num sobrado da Boa Vista e vejo todos os dias fachadas históricas cobertas de papel rasgado, fita adesiva e cola. Sem nenhuma regra, perde-se o patrimônio que todos dizemos querer proteger.\n\nPor isso, em vez de uma proibição total, sugiro uma alternativa: que se instalem, em cada quarteirão, murais de madeira onde se possam afixar anúncios, pedidos de emprego e avisos de animais perdidos. Assim, preserva-se a fachada e mantém-se essa forma popular de comunicação. Os murais poderiam, inclusive, ser pintados por artistas do bairro.\n\nEspero que os vereadores ouçam também os moradores antes de votar o projeto.\n\nAtenciosamente,\nCarla Menezes, moradora da Boa Vista, Recife"
   }
  },
  {
   "week": 33,
   "level": "B2",
   "lettura": {
    "title": "O testamento do relojoeiro",
    "emoji": "🕰️",
    "genre": "conto",
    "grammar": "colocação pronominal na escrita",
    "text": "Numa tarde de março de 1911, entrou no cartório de Vila Rica do Norte um velho de chapéu gasto, que trazia debaixo do braço uma caixa de madeira. O tabelião, Dr. Anselmo Valadares, recebeu-o com a cortesia um tanto cansada de quem já ouvira todas as histórias da cidade e não esperava ouvir nenhuma nova.\n\n— Venho fazer o meu testamento — disse o velho, sentando-se antes que lhe oferecessem a cadeira.\n\n— Pois não. Diga-me o seu nome e os bens que possui.\n\nO velho chamava-se Joaquim Pereira e fora, durante quarenta anos, o único relojoeiro da vila. Não tinha mulher nem filhos, e os seus bens resumiam-se a uma casa de dois cômodos e àquela caixa, que abriu com vagar sobre a mesa. Dentro havia um relógio de parede desmontado, peça por peça, cada uma embrulhada em papel de seda.\n\n— Deixo a casa à Santa Casa de Misericórdia — explicou. — O relógio, deixá-lo-ei a quem conseguir montá-lo.\n\nO tabelião ergueu os olhos. Em vinte anos de ofício, nunca se deparara com cláusula semelhante. Tentou dissuadi-lo: os juízes costumavam desconfiar de herdeiros incertos, e um testamento assim abrir-se-ia a toda sorte de disputas. O velho, porém, não se deixou convencer.\n\n— O senhor escreva. Os juízes que se entendam depois.\n\nAnselmo escreveu. Enquanto a pena corria sobre o papel, perguntou-lhe, por pura curiosidade, por que razão desmontara o relógio. Joaquim demorou a responder.\n\n— Porque me ensinaram que um relógio só é nosso quando sabemos refazê-lo. Quem o montar há de entender o que eu entendi.\n\nMeses depois, o relojoeiro morreu, e a notícia do estranho legado espalhou-se pela vila. Apareceram candidatos de toda parte: ferreiros, estudantes, um padre com fama de engenhoso, até um engenheiro vindo da capital. Todos se debruçaram sobre as peças, e todos desistiram. Faltava sempre alguma coisa, ou sobrava.\n\nO engenheiro, dizem, passou três semanas trancado numa sala da prefeitura, cercado de desenhos e cálculos, e saiu de lá convencido de que o velho lhe pregara uma peça. Escreveu ao tabelião uma carta indignada, exigindo que se anulasse o testamento. Anselmo respondeu-lhe em duas linhas: a cláusula era clara, e o prazo ainda não se esgotara.\n\nFoi uma menina de onze anos, filha da lavadeira que servia ao cartório, quem pediu para tentar. Os adultos riram-se dela, mas o tabelião, por um impulso que nunca soube explicar, entregou-lhe a caixa. A menina levou-a para casa e só a devolveu na primavera seguinte, com o relógio funcionando.\n\n— Como conseguiu? — perguntou-lhe Anselmo, incrédulo.\n\n— Seu Joaquim me ensinou, quando eu era pequena. Eu ficava na janela da oficina, e ele me explicava cada peça. Ele me disse que um dia eu ia entender para quê.\n\nO tabelião registrou a entrega com a solenidade de um ato público. Contam na vila que, ao fechar o livro, murmurou para si mesmo: “Far-se-á justiça, afinal, ainda que por caminhos tortos.” E contam também que, até o fim da vida, nunca mais se atrasou para compromisso algum.",
    "gloss": {
     "cartório": "escribanía",
     "gasto": "gastado",
     "tabelião": "escribano",
     "ouvira": "había oído",
     "cômodos": "ambientes, cuartos",
     "vagar": "calma, lentitud",
     "embrulhada": "envuelta",
     "seda": "seda (“papel de seda”: papel finito para envolver)",
     "deixá-lo-ei": "lo dejaré",
     "ergueu": "levantó",
     "deparara": "se había topado",
     "dissuadi-lo": "disuadirlo",
     "herdeiros": "herederos",
     "abrir-se-ia": "se abriría",
     "pena": "pluma (para escribir)",
     "legado": "legado",
     "ferreiros": "herreros",
     "debruçaram": "se inclinaron (a estudiar)",
     "lavadeira": "lavandera",
     "oficina": "taller",
     "far-se-á": "se hará",
     "tortos": "torcidos"
    },
    "questions": [
     [
      "O que torna o testamento de Joaquim tão incomum?",
      [
       "O fato de ele deixar a casa para uma instituição de caridade.",
       "A condição de que o relógio fique com quem conseguir montá-lo.",
       "A exigência de que o tabelião guarde o relógio para sempre.",
       "A decisão de não deixar nada para os parentes distantes da vila."
      ],
      "A condição de que o relógio fique com quem conseguir montá-lo."
     ],
     [
      "Qual é a primeira reação do tabelião diante da cláusula?",
      [
       "Recusa-se a registrar o testamento e manda o velho embora.",
       "Aceita imediatamente, achando a ideia genial.",
       "Tenta convencer o velho a desistir, prevendo disputas.",
       "Oferece-se para montar o relógio ele mesmo."
      ],
      "Tenta convencer o velho a desistir, prevendo disputas."
     ],
     [
      "Por que todos os candidatos adultos fracassam?",
      [
       "Porque as peças estavam enferrujadas e quebradas.",
       "Porque o tabelião escondeu algumas peças da caixa.",
       "Porque o padre convenceu a vila de que era um mau presságio.",
       "Faltava-lhes o saber que Joaquim transmitira a alguém."
      ],
      "Faltava-lhes o saber que Joaquim transmitira a alguém."
     ],
     [
      "A frase “Quem o montar há de entender o que eu entendi” antecipa que…",
      [
       "o relógio tem um valor mais afetivo e simbólico do que material.",
       "o relógio esconde uma pequena fortuna em ouro entre as suas peças.",
       "Joaquim pretende voltar para buscar o relógio.",
       "o engenheiro da capital será o herdeiro."
      ],
      "o relógio tem um valor mais afetivo e simbólico do que material."
     ],
     [
      "Qual é o efeito da última frase do conto?",
      [
       "Mostrar que o tabelião ficou doente depois do caso.",
       "Encerrar com humor, sugerindo que a história mudou o tabelião.",
       "Criticar a lentidão da justiça nas cidades do interior.",
       "Explicar que o relógio foi dado de presente ao tabelião."
      ],
      "Encerrar com humor, sugerindo que a história mudou o tabelião."
     ]
    ],
    "vf": [
     [
      "Joaquim Pereira trabalhou como relojoeiro durante quatro décadas.",
      "verdadeiro"
     ],
     [
      "A menina montou o relógio ali mesmo, no cartório.",
      "falso"
     ],
     [
      "O tabelião se recusou a entregar a caixa à menina.",
      "falso"
     ],
     [
      "A menina tornou-se relojoeira quando adulta.",
      "não se diz"
     ],
     [
      "A menina aprendeu com Joaquim observando o trabalho dele na oficina.",
      "verdadeiro"
     ]
    ],
    "hunt": {
     "label": "Tocá los pronombres en ênclise o mesóclise (unidos al verbo con guion)",
     "targets": [
      "recebeu-o",
      "sentando-se",
      "chamava-se",
      "deixá-lo-ei",
      "abrir-se-ia",
      "dissuadi-lo",
      "perguntou-lhe",
      "espalhou-se",
      "entregou-lhe",
      "levou-a",
      "far-se-á"
     ]
    }
   },
   "ascolto": {
    "title": "“Me dá um cigarro”: a língua que se escreve e a que se fala",
    "genre": "podcast literário",
    "es": "En un podcast sobre literatura, una conductora conversa con un profesor sobre la ubicación de los pronombres en el portugués de Brasil: lo que se dice, lo que se escribe y lo que hicieron los escritores con eso.",
    "speakers": [
     "Lia, apresentadora",
     "Otávio, professor"
    ],
    "turns": [
     [
      "A",
      "Olá, está começando mais um Entrelinhas. Hoje eu recebo o professor Otávio Brandão para falar de um assunto que parece pequeno, mas rende muito: onde a gente coloca o pronome. Professor, por que isso dá tanta discussão no Brasil?"
     ],
     [
      "B",
      "Porque aqui existe uma distância grande entre o que se fala e o que a gramática tradicional manda escrever. Na fala, o brasileiro diz “me dá”, “me empresta”, “te vejo amanhã”, com o pronome antes do verbo, mesmo no começo da frase. Já a norma escrita, que foi muito baseada no português de Portugal, pede “dá-me”, “empresta-me”."
     ],
     [
      "A",
      "E ninguém fala “empresta-me” no ônibus, né?"
     ],
     [
      "B",
      "Ninguém. Se alguém falar, as pessoas vão achar que é brincadeira ou que a pessoa está lendo um documento. E foi justamente isso que os modernistas perceberam. Tem um poema do Oswald de Andrade, “Pronominais”, que é curtinho e resume tudo."
     ],
     [
      "A",
      "Esse eu adoro. Como ele é mesmo?"
     ],
     [
      "B",
      "Ele começa com “Dê-me um cigarro, diz a gramática”, e termina dizendo que o bom negro e o bom branco da nação brasileira dizem todos os dias “me dá um cigarro”. Quer dizer, ele coloca a língua do povo contra a língua dos livros, e dá razão ao povo."
     ],
     [
      "A",
      "Mas então, hoje, na escrita, o que vale?"
     ],
     [
      "B",
      "Olha, depende muito do texto. Num e-mail para um amigo, numa crônica, num romance com diálogo, a próclise brasileira já é totalmente aceita. Num documento jurídico, numa tese, num editorial mais formal, ainda se usa bastante a ênclise, sobretudo no começo da frase."
     ],
     [
      "A",
      "E a mesóclise? Aquela do “far-se-á”, “dir-se-ia”?"
     ],
     [
      "B",
      "A mesóclise hoje é quase uma peça de museu. Aparece em textos muito solenes, ou então com efeito de ironia, sabe? Quando alguém usa na conversa, geralmente é para fazer graça ou para parecer pomposo."
     ],
     [
      "A",
      "Então a dica para os nossos ouvintes que estão aprendendo português é…"
     ],
     [
      "B",
      "É entender o gênero. Não existe uma colocação certa em absoluto, existe a colocação adequada àquele texto. Leiam muito, e reparem onde cada autor põe o pronome."
     ]
    ],
    "gloss": {
     "rende": "da para mucho (hablar)",
     "empresta": "prestá",
     "brincadeira": "broma",
     "modernistas": "modernistas (movimiento de 1922)",
     "curtinho": "cortito",
     "jurídico": "jurídico",
     "graça": "gracia (“fazer graça”: hacerse el gracioso)",
     "pomposo": "pomposo",
     "reparem": "fíjense"
    },
    "questions": [
     [
      "Segundo o professor, por que a colocação pronominal gera tanta discussão no Brasil?",
      [
       "Porque os brasileiros não usam pronomes na fala.",
       "Porque a fala se distancia da norma escrita tradicional.",
       "Porque a gramática brasileira mudou recentemente.",
       "Porque cada estado brasileiro segue uma regra diferente na escola."
      ],
      "Porque a fala se distancia da norma escrita tradicional."
     ],
     [
      "O que, segundo Otávio, o poema “Pronominais” faz?",
      [
       "Defende que todos aprendam a norma de Portugal.",
       "Ironiza os fumantes e os hábitos da elite na época do modernismo.",
       "Dá razão à língua falada pelo povo contra a língua dos livros.",
       "Propõe abolir os pronomes da língua escrita."
      ],
      "Dá razão à língua falada pelo povo contra a língua dos livros."
     ],
     [
      "Em que tipo de texto ainda se usa bastante a ênclise, segundo o professor?",
      [
       "Em textos formais, como documentos jurídicos e teses.",
       "Em conversas informais pelo celular.",
       "Em diálogos de romances contemporâneos.",
       "Em crônicas publicadas nos jornais populares de hoje em dia."
      ],
      "Em textos formais, como documentos jurídicos e teses."
     ],
     [
      "Como o professor descreve a mesóclise hoje?",
      [
       "Como a forma mais comum na escrita jornalística.",
       "Como um erro que deve ser corrigido nas escolas.",
       "Como algo raro, solene ou usado com ironia.",
       "Como uma marca típica do português falado em Portugal."
      ],
      "Como algo raro, solene ou usado com ironia."
     ],
     [
      "Qual é o conselho final para quem aprende português?",
      [
       "Usar sempre a ênclise para não errar.",
       "Evitar pronomes oblíquos em textos formais.",
       "Imitar a fala do Rio de Janeiro em qualquer situação.",
       "Adequar a colocação ao gênero e observar os autores."
      ],
      "Adequar a colocação ao gênero e observar os autores."
     ]
    ],
    "vf": [
     [
      "Na fala brasileira, é comum começar a frase com o pronome, como em “me dá”.",
      "verdadeiro"
     ],
     [
      "O professor considera a próclise brasileira inaceitável em qualquer texto escrito.",
      "falso"
     ],
     [
      "O poema de Oswald de Andrade foi proibido nas escolas da época.",
      "não se diz"
     ],
     [
      "Segundo o professor, existe uma única colocação correta para todos os textos.",
      "falso"
     ]
    ]
   },
   "compito": {
    "genre": "resenha",
    "title": "Resenha de “O testamento do relojoeiro”",
    "fonte": "lettura",
    "t": "Você colabora com o blog literário da biblioteca do seu bairro, que publica resenhas de contos curtos para incentivar a leitura. Após ler o conto “O testamento do relojoeiro”, escreva uma resenha para o blog. Apresente brevemente o enredo, sem revelar o final por completo, comente pelo menos um aspecto da linguagem ou do estilo do conto (por exemplo, o contraste entre o registro formal do narrador e a fala das personagens) e diga se recomenda a leitura, justificando. Não se esqueça de dar um título à resenha e de usar um registro formal, mas acessível. Seu texto deve ter entre 154 e 214 palavras.",
    "es": "Una reseña: título, resumen del argumento sin arruinar el final, un comentario sobre el estilo y una recomendación justificada. En registro formal escrito, ubicá bien los pronombres (ênclise al comenzar la oración).",
    "min": 154,
    "max": 214,
    "punti": [
     [
      "Presentar el cuento y su argumento",
      [
       "conto",
       "relojoeiro",
       "testamento"
      ]
     ],
     [
      "Mencionar a los personajes",
      [
       "joaquim",
       "tabelião",
       "menina",
       "anselmo"
      ]
     ],
     [
      "Comentario sobre lenguaje o estilo",
      [
       "linguagem",
       "estilo",
       "narrador",
       "registro"
      ]
     ],
     [
      "Recomendación justificada",
      [
       "recomend",
       "vale a pena",
       "indico",
       "sugiro"
      ]
     ]
    ],
    "model": "Um relógio que ensina a esperar\n\n“O testamento do relojoeiro” é um conto curto que se passa numa pequena vila, em 1911. Um velho relojoeiro, Joaquim Pereira, procura o tabelião da cidade para fazer um testamento curioso: deixará um relógio desmontado a quem conseguir montá-lo. Após a morte de Joaquim, candidatos de toda parte tentam resolver o enigma, sem sucesso. O desfecho, que não convém revelar aqui, surpreende pela simplicidade e emociona sem apelar para o sentimentalismo.\n\nO que mais me chamou a atenção foi a linguagem. O narrador escreve num registro formal, quase antigo, cheio de ênclises e até de mesóclises, como “recebeu-o” e “abrir-se-ia”. Nem todas as personagens, porém, falam desse modo: a menina diz “me ensinou”, como qualquer brasileiro diria. Esse contraste cria um efeito interessante: sente-se a distância entre o mundo solene do cartório e o saber transmitido de forma afetiva, na janela de uma oficina.\n\nRecomendo a leitura a quem gosta de histórias que parecem pequenas, mas guardam uma reflexão sobre o tempo e sobre aquilo que só se aprende com paciência. Lê-se em dez minutos e fica na memória por muito mais."
   }
  },
  {
   "week": 34,
   "level": "B2",
   "lettura": {
    "title": "Concreto demais, chão de menos",
    "emoji": "🌧️",
    "genre": "artigo de opinião",
    "grammar": "conectores e coesão",
    "text": "Toda vez que uma grande cidade brasileira fica debaixo d’água, repete-se o mesmo roteiro. As imagens de carros boiando circulam nas redes, os governantes culpam a chuva “fora do normal” e, poucas semanas depois, o assunto desaparece. No entanto, as chuvas fora do normal estão ficando cada vez mais normais, e insistir nesse discurso já não convence ninguém.\n\nO problema, aliás, não está apenas no céu, mas também no chão. Ao longo do século passado, nossas cidades cresceram canalizando rios sob avenidas e trocando terra por asfalto. Por conseguinte, a água que antes se infiltrava no solo passou a correr pela superfície, cada vez mais depressa, até encontrar o ponto mais baixo, que costuma ser justamente o bairro mais pobre. Ou seja, a enchente não é um acidente: é, em grande medida, consequência do modo como construímos.\n\nÉ nesse contexto que ganha força a ideia de “cidade-esponja”, desenvolvida por urbanistas na China e hoje discutida no mundo inteiro. Em vez de expulsar a água o mais rápido possível por meio de canos e galerias, a proposta é retê-la: parques que alagam de propósito, calçadas permeáveis, telhados verdes, jardins de chuva nos canteiros das avenidas. Dessa forma, o solo volta a absorver parte da chuva, e o sistema de drenagem deixa de ficar sobrecarregado.\n\nOs críticos, contudo, levantam objeções razoáveis. Em primeiro lugar, dizem, essas soluções exigem espaço, algo escasso nas regiões centrais. Além disso, a manutenção de áreas verdes custa caro e raramente é prioridade nos orçamentos municipais. Há ainda quem argumente que, sem obras tradicionais de grande porte, como reservatórios subterrâneos, nenhuma medida “verde” será suficiente.\n\nReconheço o peso desses argumentos. Todavia, eles partem de uma falsa oposição. Ninguém sério propõe abandonar as obras de engenharia; o que se propõe é combiná-las com soluções baseadas na natureza, que, em geral, são mais baratas e trazem benefícios adicionais, como sombra, lazer e redução do calor. Um parque inundável, por exemplo, passa a maior parte do ano servindo de praça, ao passo que um piscinão de concreto passa a maior parte do ano vazio e cercado por grades.\n\nQuanto à falta de espaço, ela é real, porém menos absoluta do que parece. Estacionamentos, pátios de escolas, canteiros centrais e terrenos abandonados somam áreas consideráveis em qualquer metrópole. Embora não resolvam tudo sozinhos, esses espaços podem funcionar como uma rede de pequenas esponjas espalhadas pela cidade. Muitos deles, inclusive, pertencem ao próprio poder público, o que dispensaria desapropriações demoradas.\n\nNão se trata, portanto, de escolher entre concreto e verde, mas de admitir que cobrimos chão demais. Enquanto essa discussão não sair dos seminários e entrar nos planos diretores, continuaremos assistindo, a cada verão, às mesmas cenas, e ouvindo as mesmas desculpas. A chuva, afinal, não vai esperar que nos decidamos.\n\nMariana Coutinho é engenheira civil e pesquisadora de drenagem urbana.",
    "gloss": {
     "roteiro": "guion",
     "boiando": "flotando",
     "canalizando": "entubando",
     "asfalto": "asfalto",
     "enchente": "inundación",
     "canos": "caños",
     "galerias": "conductos pluviales",
     "retê-la": "retenerla",
     "alagam": "se inundan",
     "calçadas": "veredas",
     "telhados": "techos",
     "canteiros": "canteros",
     "drenagem": "desagüe, drenaje",
     "orçamentos": "presupuestos",
     "porte": "envergadura, tamaño",
     "piscinão": "gran reservorio pluvial",
     "grades": "rejas",
     "dispensaria": "haría innecesarias",
     "desapropriações": "expropiaciones",
     "diretores": "directores (“planos diretores”: planes de ordenamiento urbano)"
    },
    "questions": [
     [
      "Qual é a tese defendida pela autora?",
      [
       "As enchentes são causadas apenas por chuvas excepcionais.",
       "É preciso unir engenharia tradicional e soluções baseadas na natureza.",
       "As obras de engenharia devem ser totalmente substituídas por parques e jardins.",
       "As cidades brasileiras devem parar de crescer."
      ],
      "É preciso unir engenharia tradicional e soluções baseadas na natureza."
     ],
     [
      "No primeiro parágrafo, o conector “No entanto” introduz…",
      [
       "uma confirmação do discurso dos governantes.",
       "um exemplo de enchente recente.",
       "uma contestação da desculpa da chuva “fora do normal”.",
       "uma conclusão sobre as redes sociais."
      ],
      "uma contestação da desculpa da chuva “fora do normal”."
     ],
     [
      "Segundo o segundo parágrafo, por que os bairros mais pobres costumam sofrer mais?",
      [
       "Porque os governantes não investem em asfalto nem em saneamento nessas regiões.",
       "Porque as casas são construídas perto dos parques inundáveis.",
       "Porque ali chove mais do que nos bairros ricos.",
       "Porque a água escorre para os pontos mais baixos, onde eles costumam ficar."
      ],
      "Porque a água escorre para os pontos mais baixos, onde eles costumam ficar."
     ],
     [
      "Como a autora trata as objeções dos críticos?",
      [
       "Ignora-as, pois considera que não têm fundamento.",
       "Reconhece seu peso, mas mostra que partem de uma falsa oposição.",
       "Aceita-as e muda de posição no fim do texto.",
       "Ridiculariza-as, chamando os críticos de desonestos e mal informados."
      ],
      "Reconhece seu peso, mas mostra que partem de uma falsa oposição."
     ],
     [
      "Qual é a função da comparação entre o parque inundável e o piscinão?",
      [
       "Mostrar que o piscinão é mais eficiente contra enchentes.",
       "Provar que os parques são mais baratos de construir.",
       "Destacar que a solução verde tem usos no resto do ano.",
       "Criticar o fato de os parques ficarem fechados à noite."
      ],
      "Destacar que a solução verde tem usos no resto do ano."
     ]
    ],
    "vf": [
     [
      "A autora afirma que as chuvas intensas estão se tornando mais frequentes.",
      "verdadeiro"
     ],
     [
      "Segundo o texto, a ideia de cidade-esponja surgiu no Brasil.",
      "falso"
     ],
     [
      "A autora defende o abandono total das obras de engenharia tradicionais.",
      "falso"
     ],
     [
      "A autora participou da elaboração do plano diretor de sua cidade.",
      "não se diz"
     ],
     [
      "Para a autora, estacionamentos e pátios de escola podem ajudar a absorver água.",
      "verdadeiro"
     ]
    ],
    "hunt": {
     "label": "Tocá los conectores (adversativos, explicativos, conclusivos…)",
     "targets": [
      "entanto",
      "aliás",
      "conseguinte",
      "contudo",
      "todavia",
      "porém",
      "embora",
      "portanto"
     ]
    }
   },
   "ascolto": {
    "title": "Canudo, copo e talher: proibir resolve?",
    "genre": "debate radiofônico",
    "es": "En un debate de radio, una bióloga de una ONG ambiental y el dueño de un restaurante discuten un proyecto municipal que prohibiría los descartables de plástico en bares y restaurantes.",
    "speakers": [
     "Carla, bióloga",
     "Ronaldo, dono de restaurante"
    ],
    "turns": [
     [
      "A",
      "Bom, como a moderadora explicou, o projeto proíbe canudo, copo e talher de plástico descartável em bares e restaurantes da cidade. E eu, sinceramente, acho que já passou da hora. A gente vê isso todo dia na praia, no mangue, no estômago das tartarugas."
     ],
     [
      "B",
      "Olha, Carla, ninguém aqui é a favor de lixo na praia, tá? Eu tenho restaurante há vinte anos e sou o primeiro a querer a praia limpa. Só que o projeto, do jeito que está, joga toda a conta nas costas do pequeno comerciante."
     ],
     [
      "A",
      "Mas por quê? As alternativas já existem."
     ],
     [
      "B",
      "Existem, mas custam mais caro. Um copo de papel decente custa quase o triplo, e o de vidro exige lavar, exige funcionário, exige máquina. O grande restaurante absorve isso. O meu, com oito mesas, não."
     ],
     [
      "A",
      "Entendo, e acho justo discutir um prazo de adaptação. Aliás, eu defendo isso. Mesmo assim, o custo ambiental é muito maior, só que ninguém paga por ele no caixa. Quem paga é o pescador, é a cidade que gasta com limpeza."
     ],
     [
      "B",
      "Concordo em parte. Agora, me diz uma coisa: o grande vilão é o canudinho do meu bar? Porque, pelo que eu leio, a maior parte do plástico no mar vem de outras fontes, de embalagem, de rede de pesca..."
     ],
     [
      "A",
      "Você tem razão num ponto: o canudo sozinho não resolve. No entanto, ele é simbólico. Quando a pessoa deixa de receber o canudo, ela começa a perceber quanto descartável usa no resto do dia. É uma porta de entrada."
     ],
     [
      "B",
      "Tá, mas lei não é campanha educativa. Se é para educar, então vamos educar, com incentivo, com linha de crédito para o comerciante trocar os materiais. Proibir e multar é o caminho mais fácil para a prefeitura."
     ],
     [
      "A",
      "Então a gente talvez concorde mais do que parece. Proibição com prazo e com apoio ao pequeno negócio, você toparia?"
     ],
     [
      "B",
      "Com prazo de um ano e com crédito, eu topo. Sem isso, vai ter muito bar fechando as portas, e aí o problema vira outro."
     ],
     [
      "A",
      "Fechado. Então fica aí a nossa sugestão para os vereadores."
     ]
    ],
    "gloss": {
     "canudo": "sorbete, pajita",
     "talher": "cubierto",
     "mangue": "manglar",
     "tartarugas": "tortugas",
     "costas": "espalda",
     "triplo": "triple",
     "pescador": "pescador",
     "vilão": "villano",
     "embalagem": "envase, packaging",
     "multar": "multar",
     "toparia": "aceptarías, te prenderías",
     "fechado": "trato hecho"
    },
    "questions": [
     [
      "Qual é a principal objeção de Ronaldo ao projeto?",
      [
       "Ele acha que o plástico não polui as praias.",
       "O custo recairia sobretudo sobre o pequeno comerciante.",
       "Os clientes não aceitam copos de papel.",
       "A prefeitura não tem fiscais suficientes para aplicar a lei."
      ],
      "O custo recairia sobretudo sobre o pequeno comerciante."
     ],
     [
      "Quando Carla diz que o custo ambiental “ninguém paga no caixa”, ela quer dizer que…",
      [
       "os restaurantes repassam ao cliente um preço alto demais pelos descartáveis.",
       "os consumidores deveriam pagar uma taxa extra.",
       "o plástico é mais barato porque é subsidiado.",
       "o prejuízo existe, mas recai sobre outras pessoas e sobre a cidade."
      ],
      "o prejuízo existe, mas recai sobre outras pessoas e sobre a cidade."
     ],
     [
      "Por que, segundo Carla, a proibição do canudo é importante, mesmo sem resolver o problema?",
      [
       "Porque os canudos são, de longe, a maior fonte de plástico no mar.",
       "Porque os pescadores exigiram essa medida.",
       "Porque é simbólica e faz as pessoas repararem no próprio consumo.",
       "Porque é a medida mais barata para os restaurantes."
      ],
      "Porque é simbólica e faz as pessoas repararem no próprio consumo."
     ],
     [
      "Qual é a crítica de Ronaldo à estratégia da prefeitura?",
      [
       "Proibir e multar é mais fácil do que incentivar a mudança.",
       "A campanha educativa foi cara e inútil.",
       "A lei deveria valer apenas para as praias.",
       "O prazo de adaptação proposto é longo demais."
      ],
      "Proibir e multar é mais fácil do que incentivar a mudança."
     ],
     [
      "Como termina o debate?",
      [
       "Com Ronaldo mudando totalmente de opinião.",
       "Sem nenhum ponto de acordo entre os dois.",
       "Com Carla desistindo de defender a proibição.",
       "Com um acordo: proibição com prazo e crédito para os pequenos."
      ],
      "Com um acordo: proibição com prazo e crédito para os pequenos."
     ]
    ],
    "vf": [
     [
      "O restaurante de Ronaldo tem oito mesas.",
      "verdadeiro"
     ],
     [
      "Carla se opõe a qualquer prazo de adaptação para os comerciantes.",
      "falso"
     ],
     [
      "Ronaldo já substituiu os canudos de plástico no seu restaurante.",
      "não se diz"
     ],
     [
      "Ronaldo aceitaria a proibição com um ano de prazo e linha de crédito.",
      "verdadeiro"
     ]
    ]
   },
   "compito": {
    "genre": "artigo",
    "title": "Cidade preparada para o clima",
    "fonte": "entrambi",
    "t": "Você é estudante universitário(a) e a revista do diretório acadêmico da sua faculdade vai publicar um número especial sobre meio ambiente urbano. Após ler o artigo “Concreto demais, chão de menos” e ouvir o debate “Canudo, copo e talher: proibir resolve?”, escreva um artigo para a revista discutindo o que a sua cidade poderia fazer para enfrentar os problemas ambientais. Use pelo menos uma informação ou argumento de cada fonte, apresente uma objeção possível às medidas que você defende e responda a ela. Não se esqueça de dar um título ao artigo, de articular as ideias com conectores variados (no entanto, aliás, portanto…) e de usar um registro formal. Seu texto deve ter entre 160 e 220 palavras.",
    "es": "Un artículo con título: usá un dato o argumento del texto y otro del debate, planteá una objeción y respondela. Lo que se evalúa esta semana es la cohesión: conectores variados y bien usados.",
    "min": 160,
    "max": 220,
    "punti": [
     [
      "Usar el texto sobre la cidade-esponja",
      [
       "esponja",
       "enchente",
       "permeáve",
       "parque",
       "drenagem"
      ]
     ],
     [
      "Usar el debate sobre el plástico",
      [
       "plástico",
       "descartáve",
       "canudo"
      ]
     ],
     [
      "Objeción y respuesta",
      [
       "críticos",
       "objeção",
       "argumentam",
       "alegam",
       "dirão"
      ]
     ],
     [
      "Conectores adversativos",
      [
       "no entanto",
       "contudo",
       "porém",
       "todavia"
      ]
     ],
     [
      "Conclusión",
      [
       "portanto",
       "em suma",
       "por conseguinte",
       "dessa forma"
      ]
     ]
    ],
    "model": "Pequenas mudanças, cidade mais resistente\n\nAs enchentes de todo verão e o plástico acumulado nas praias parecem problemas distintos. No entanto, ambos revelam a mesma falha: cidades que foram planejadas sem levar em conta o meio ambiente.\n\nNo caso das chuvas, o artigo da engenheira Mariana Coutinho mostra que cobrimos chão demais. A proposta da cidade-esponja, com parques inundáveis, calçadas permeáveis e jardins de chuva, permitiria que o solo voltasse a absorver parte da água. Aliás, muitos desses espaços já pertencem à prefeitura, como pátios de escolas e canteiros centrais.\n\nJá no debate sobre os descartáveis, ficou claro que proibir o plástico em bares e restaurantes pode ter um efeito educativo importante. Os críticos, contudo, argumentam que essas medidas custam caro e prejudicam o pequeno comerciante. A objeção é legítima, porém não justifica a inércia. Como sugeriram os próprios participantes do debate, é possível combinar a proibição com prazos de adaptação e linhas de crédito.\n\nPortanto, a questão não é escolher entre economia e meio ambiente, mas planejar a transição com responsabilidade. Se nada for feito, continuaremos pagando a conta, só que em forma de enchentes e praias sujas."
   }
  },
  {
   "week": 35,
   "level": "B2",
   "lettura": {
    "title": "Despachantes: os tradutores da burocracia",
    "emoji": "🗂️",
    "genre": "perfil jornalístico",
    "grammar": "regência verbal",
    "text": "Às oito da manhã, quando as portas do cartório ainda estão fechadas, Neide Araújo já está sentada no banquinho de plástico que carrega consigo há quase trinta anos. Despachante no centro de São Paulo, ela assiste diariamente a um espetáculo que conhece de cor: gente que chega com a pasta errada, que se esqueceu de uma cópia autenticada, que não sabe a qual guichê se dirigir. “Meu trabalho é traduzir”, resume. “O cidadão fala português, o Estado fala outra língua.”\n\nA profissão, que muitos consideravam condenada ao desaparecimento com a digitalização dos serviços públicos, resiste. E não só resiste: em certos nichos, cresce. Transferência de veículos, regularização de imóveis, pedidos de segunda via de documentos antigos, processos de cidadania para descendentes de imigrantes — tudo isso ainda exige alguém que saiba a que norma obedecer e em que ordem proceder. “O aplicativo resolve o simples”, diz Neide. “Quando o caso foge do padrão, ninguém quer depender de um robô.”\n\nOs clientes confirmam. Rodrigo, engenheiro de 41 anos, recorreu a um despachante depois de perder três manhãs tentando registrar um terreno herdado do avô. “Eu preferia mil vezes pagar a taxa a voltar àquela fila”, conta. Ele admite que, no início, desconfiava da categoria. “Tem muita gente que associa despachante a jeitinho, a atalho. Mas o que eu encontrei foi alguém que simplesmente conhecia o caminho.”\n\nEssa desconfiança, aliás, é um tema recorrente entre os próprios profissionais. Carlos Menezes, que preside uma associação regional da categoria, afirma que o setor aspira a um reconhecimento que nunca teve. “Nosso trabalho visa à segurança do cidadão, não a burlar regras”, insiste. Segundo ele, a formalização do ofício implica responsabilidades claras: contrato por escrito, recibo, prestação de contas. Quem não simpatiza com a categoria, argumenta, costuma confundir o despachante sério com o intermediário informal que circula na porta das repartições.\n\nMas há algo que nenhum regulamento descreve: o vínculo. Neide se lembra do nome de quase todos os clientes antigos. Sabe quem casou, quem se divorciou, quem namora a filha de quem — porque, no fim das contas, a burocracia acompanha a vida. Casamento pede certidão; herança pede inventário; mudança de país pede tradução juramentada. “Eu já atendi três gerações da mesma família”, diz, com orgulho. “O avô confiava em mim, o filho confia, e agora o neto me manda mensagem pelo celular.”\n\nÉ justamente nesse ponto que o ofício se transforma. Os despachantes mais jovens trabalham a distância, digitalizam documentos, acompanham processos por plataformas on-line e raramente pisam num cartório. Para eles, o desafio não é mais enfrentar filas, mas explicar ao cliente o que significa cada etapa. “As pessoas não gostam de assinar o que não entendem”, observa Juliana Prado, de 29 anos, que abriu seu escritório virtual durante a pandemia. “Eu passo mais tempo respondendo a dúvidas do que preenchendo formulários.”\n\nNeide não pensa em se aposentar tão cedo. Quando lhe perguntam se o computador vai substituí-la, ela ri e aponta para a fila que se forma na calçada. “Enquanto existir papel, carimbo e gente com pressa, alguém vai precisar de mim.” Talvez tenha razão. Talvez a burocracia mude de forma, mas não de natureza: sempre haverá um cidadão perdido diante de uma regra que não compreende — e alguém disposto a lhe mostrar o caminho.",
    "gloss": {
     "cartório": "escribanía, registro civil",
     "banquinho": "banquito",
     "cor": "(de cor) de memoria",
     "pasta": "carpeta",
     "autenticada": "certificada por escribano",
     "guichê": "ventanilla",
     "imóveis": "inmuebles",
     "foge": "se sale (de)",
     "recorreu": "acudió, recurrió",
     "herdado": "heredado",
     "taxa": "arancel",
     "jeitinho": "atajo criollo, viveza",
     "atalho": "atajo",
     "burlar": "eludir, trampear",
     "prestação": "(prestação de contas) rendición",
     "repartições": "oficinas públicas",
     "certidão": "partida, certificado",
     "inventário": "sucesión",
     "juramentada": "pública (traducción)",
     "preenchendo": "llenando, completando",
     "aposentar": "jubilarse",
     "calçada": "vereda",
     "carimbo": "sello"
    },
    "questions": [
     [
      "Qual é a ideia central do texto?",
      [
       "A digitalização tornou os despachantes desnecessários.",
       "O despachante continua útil como mediador entre cidadão e Estado.",
       "Os despachantes sobrevivem oferecendo atalhos ilegais aos seus clientes.",
       "O governo pretende regulamentar a profissão de despachante."
      ],
      "O despachante continua útil como mediador entre cidadão e Estado."
     ],
     [
      "Ao dizer “O cidadão fala português, o Estado fala outra língua”, Neide quer dizer que:",
      [
       "os órgãos públicos atendem mal os imigrantes.",
       "os documentos oficiais são escritos em língua estrangeira.",
       "a lógica da burocracia é opaca para o cidadão comum.",
       "ela precisa dominar vários idiomas no trabalho."
      ],
      "a lógica da burocracia é opaca para o cidadão comum."
     ],
     [
      "Por que Rodrigo desconfiava dos despachantes?",
      [
       "Porque os associava a jeitinhos e atalhos.",
       "Porque já tinha sido enganado por um deles.",
       "Porque achava a taxa cobrada muito alta.",
       "Porque preferia resolver tudo pelo aplicativo."
      ],
      "Porque os associava a jeitinhos e atalhos."
     ],
     [
      "Segundo Carlos Menezes, a formalização da profissão:",
      [
       "permitiria aos despachantes cobrar taxas mais altas.",
       "eliminaria de vez o intermediário informal das repartições.",
       "traz obrigações como contrato, recibo e prestação de contas.",
       "depende de uma lei que ainda está sendo votada."
      ],
      "traz obrigações como contrato, recibo e prestação de contas."
     ],
     [
      "O que diferencia o trabalho de Juliana Prado do de Neide?",
      [
       "Ela atende apenas clientes jovens pela internet.",
       "Ela dedica mais tempo a explicar os processos.",
       "Ela cobra menos por cada serviço.",
       "Ela trabalha só com cidadania estrangeira."
      ],
      "Ela dedica mais tempo a explicar os processos."
     ]
    ],
    "vf": [
     [
      "Neide trabalha como despachante há cerca de três décadas.",
      "verdadeiro"
     ],
     [
      "Rodrigo conseguiu registrar o terreno sozinho depois de três manhãs na fila.",
      "falso"
     ],
     [
      "A associação presidida por Carlos Menezes tem sede em São Paulo.",
      "não se diz"
     ],
     [
      "Juliana cobra menos que os despachantes tradicionais.",
      "não se diz"
     ],
     [
      "Neide pretende se aposentar nos próximos meses.",
      "falso"
     ]
    ],
    "hunt": {
     "label": "Tocá los verbos cuya regencia exige atención (assistir a, obedecer a, visar a, namorar alguém, confiar em…)",
     "targets": [
      "assiste",
      "obedecer",
      "depender",
      "preferia",
      "aspira",
      "visa",
      "implica",
      "simpatiza",
      "namora",
      "confiava",
      "gostam",
      "pensa"
     ]
    }
   },
   "ascolto": {
    "title": "Namoro no trabalho: pode ou não pode?",
    "genre": "programa de consultas na rádio",
    "es": "En un programa de radio de consultas legales, una abogada laboralista atiende el llamado de una oyente preocupada por una nueva regla de su empresa.",
    "speakers": [
     "Helena, advogada e apresentadora",
     "Patrícia, ouvinte"
    ],
    "turns": [
     [
      "A",
      "Boa tarde, você está ouvindo o Direito na Hora, e a gente já tem uma ouvinte na linha. Pode falar, Patrícia, tudo bem?"
     ],
     [
      "B",
      "Tudo bem, Helena, obrigada por me atender. Olha, é uma situação meio delicada. Eu trabalho numa empresa de logística há uns quatro anos e, faz seis meses, eu namoro um colega do setor financeiro."
     ],
     [
      "A",
      "Certo. E qual é a dúvida?"
     ],
     [
      "B",
      "Então, semana passada saiu um comunicado novo do RH dizendo que relacionamentos entre funcionários precisam ser informados à empresa. E aí fiquei insegura, sabe? Eu não sei se sou obrigada a obedecer a isso, se isso pode implicar demissão..."
     ],
     [
      "A",
      "Entendi. Vamos por partes. Primeiro: a lei não proíbe ninguém de namorar um colega de trabalho. A vida afetiva é assunto seu, é da sua intimidade. Nenhuma empresa pode punir alguém, nem demitir por justa causa, simplesmente porque essa pessoa namora outra."
     ],
     [
      "B",
      "Ah, que alívio."
     ],
     [
      "A",
      "Agora, calma, tem um porém. A empresa pode, sim, criar regras de conduta. Por exemplo, ela pode pedir que um casal não trabalhe na mesma equipe quando um é chefe do outro. Isso visa a evitar conflito de interesses. Seu namorado é seu superior?"
     ],
     [
      "B",
      "Não, não, nada disso. A gente nem trabalha no mesmo andar. Eu mal vejo ele durante o expediente."
     ],
     [
      "A",
      "Então o caso é mais simples. Veja: se o comunicado só pede que vocês informem a relação, eu diria que não custa conversar com o RH, de maneira discreta. Mas se a empresa exigir detalhes da vida pessoal, ou ameaçar punição, aí ela extrapola o poder de direção."
     ],
     [
      "B",
      "E se eu preferir não falar nada?"
     ],
     [
      "A",
      "Olha, é um direito seu. Mas pensa assim: informar não é confessar nada errado. Às vezes, ser transparente evita fofoca, evita mal-entendido. Eu aconselho você a guardar uma cópia desse comunicado e, se houver qualquer pressão, procurar o sindicato ou um advogado."
     ],
     [
      "B",
      "Tá bom. Posso só perguntar mais uma coisa rapidinho? Se um dia a gente terminar, e a relação ficar ruim no trabalho?"
     ],
     [
      "A",
      "Boa pergunta, e acontece mais do que a gente imagina. Aí o que vale é o comportamento profissional. Ninguém pode usar o cargo pra se vingar, nem constranger o outro na frente dos colegas. Se isso acontecer, pode configurar assédio, e a empresa tem o dever de agir."
     ],
     [
      "B",
      "Entendi. Muito obrigada, Helena, me ajudou bastante."
     ],
     [
      "A",
      "Imagina, Patrícia. E boa sorte pra vocês dois. Depois do intervalo, a gente volta com uma pergunta sobre férias vencidas."
     ]
    ],
    "gloss": {
     "demissão": "despido",
     "demitir": "despedir",
     "porém": "pero, reparo",
     "andar": "piso",
     "expediente": "horario laboral",
     "extrapola": "se excede en",
     "fofoca": "chisme",
     "sindicato": "gremio",
     "vingar": "vengarse",
     "constranger": "intimidar, incomodar",
     "assédio": "acoso",
     "vencidas": "adeudadas, no gozadas"
    },
    "questions": [
     [
      "Por que Patrícia ligou para o programa?",
      [
       "Foi demitida por namorar um colega.",
       "Um comunicado do RH a deixou insegura.",
       "O namorado passou a ser chefe dela.",
       "Quer processar a empresa por assédio."
      ],
      "Um comunicado do RH a deixou insegura."
     ],
     [
      "Segundo Helena, que regra a empresa pode criar?",
      [
       "Proibir qualquer namoro entre funcionários.",
       "Exigir detalhes da vida afetiva do casal.",
       "Separar o casal quando um chefia o outro.",
       "Demitir um dos dois se o namoro terminar."
      ],
      "Separar o casal quando um chefia o outro."
     ],
     [
      "Quando Helena diz que a empresa “extrapola o poder de direção”, ela quer dizer que a empresa:",
      [
       "ultrapassa os limites da sua autoridade.",
       "exerce corretamente o seu direito de mandar.",
       "delega decisões ao sindicato.",
       "muda a direção de um departamento."
      ],
      "ultrapassa os limites da sua autoridade."
     ],
     [
      "Qual é a posição de Helena sobre informar o namoro ao RH?",
      [
       "É obrigatório e deve ser feito por escrito.",
       "Calar é um direito dela, mas informar pode evitar mal-entendidos.",
       "Deve ser evitado, porque pode gerar punição.",
       "Só é necessário se o namoro for sério."
      ],
      "Calar é um direito dela, mas informar pode evitar mal-entendidos."
     ],
     [
      "O que Helena aconselha Patrícia a fazer desde já?",
      [
       "Pedir transferência para outro andar.",
       "Guardar uma cópia do comunicado.",
       "Contratar um advogado imediatamente.",
       "Terminar o namoro para evitar problemas."
      ],
      "Guardar uma cópia do comunicado."
     ]
    ],
    "vf": [
     [
      "Patrícia e o namorado trabalham no mesmo andar.",
      "falso"
     ],
     [
      "Patrícia trabalha na empresa há cerca de quatro anos.",
      "verdadeiro"
     ],
     [
      "O namorado de Patrícia já conversou com o RH.",
      "não se diz"
     ],
     [
      "Para Helena, usar o cargo para se vingar de um ex pode configurar assédio.",
      "verdadeiro"
     ]
    ]
   },
   "compito": {
    "genre": "carta_leitor",
    "title": "Carta ao jornal sobre os despachantes",
    "fonte": "lettura",
    "t": "Você é leitor(a) de um jornal de circulação nacional e já precisou enfrentar um trâmite burocrático complicado. Após ler o perfil “Despachantes: os tradutores da burocracia”, escreva uma carta do leitor para a seção de cartas do jornal, comentando o texto. Na sua carta, retome pelo menos dois argumentos ou depoimentos apresentados no perfil, relate brevemente uma experiência pessoal com a burocracia e posicione-se sobre o futuro da profissão diante da digitalização dos serviços públicos. Não se esqueça de identificar o texto ao qual você se refere, de assinar a carta e de usar registro formal. Seu texto deve ter entre 165 e 225 palavras.",
    "es": "Carta de lector formal: tiene que citar el perfil del diario, usar al menos dos ideas del texto, contar una experiencia propia y opinar. Cuidá la regencia (assistir a, recorrer a, obedecer a, concordar com).",
    "min": 165,
    "max": 225,
    "punti": [
     [
      "Identificar el texto comentado",
      [
       "despachantes",
       "perfil",
       "reportagem",
       "matéria"
      ]
     ],
     [
      "Retomar al menos dos ideias o testimonios del texto",
      [
       "neide",
       "menezes",
       "juliana",
       "rodrigo",
       "aplicativo"
      ]
     ],
     [
      "Contar una experiencia personal con trámites",
      [
       "cartório",
       "fila",
       "document",
       "processo"
      ]
     ],
     [
      "Opinar sobre el futuro frente a la digitalización",
      [
       "digital",
       "futuro",
       "tecnologia"
      ]
     ]
    ],
    "model": "Prezados editores,\n\nLi com grande interesse o perfil “Despachantes: os tradutores da burocracia”, publicado na última edição, e gostaria de acrescentar o ponto de vista de quem já dependeu desses profissionais.\n\nNo ano passado, precisei regularizar o apartamento que meus pais me deixaram. Assisti a uma verdadeira maratona: três idas ao cartório, duas filas intermináveis e um documento recusado porque faltava uma firma reconhecida. Só consegui concluir o processo quando recorri a uma despachante, que, assim como a senhora Neide, sabia exatamente a que regra obedecer e em que ordem agir.\n\nConcordo com o texto quando afirma que o aplicativo resolve apenas o simples. Também me pareceu justo o argumento de Carlos Menezes: não se deve confundir o profissional sério com o intermediário informal que oferece atalhos na porta das repartições.\n\nNo entanto, discordo do otimismo absoluto de Neide. A digitalização não vai eliminar a profissão, mas vai transformá-la, como mostra o exemplo de Juliana Prado. O despachante do futuro será menos um especialista em filas e mais um orientador que explica ao cidadão aquilo que o Estado insiste em complicar.\n\nAtenciosamente,\n\nMariana Lopes\nCampinas (SP)"
   }
  },
  {
   "week": 36,
   "level": "B2",
   "lettura": {
    "title": "À esquerda, às 18h: a crase que a cidade escreve",
    "emoji": "🪧",
    "genre": "coluna sobre língua",
    "grammar": "crase",
    "text": "Quem caminha pelo centro de qualquer capital brasileira faz, sem perceber, um curso intensivo de crase. Basta levantar os olhos. “Farmácia à direita.” “Aberto das 8h às 22h.” “Proibido estacionar à noite.” “Retire sua senha junto à recepção.” As placas, os avisos colados nas portas e os cartazes das repartições formam uma espécie de gramática a céu aberto — nem sempre correta, é verdade, mas surpreendentemente coerente.\n\nA crase, convém lembrar, não é um acento qualquer. O sinal grave indica a fusão de duas vogais: a preposição “a” e o artigo feminino “a”. Por isso ela aparece com tanta frequência nas indicações de horário e de direção. Quem diz “chego às nove” está dizendo, no fundo, “chego a as nove horas”; quem diz “vire à esquerda” subentende “vire a a mão esquerda”, ou algo parecido. A regra prática que muitos professores ensinam — trocar a palavra feminina por uma masculina e ver se aparece “ao” — funciona bem na maioria dos casos: “vou à praça” corresponde a “vou ao parque”.\n\nÉ justamente nos horários que surgem os erros mais curiosos. Numa padaria de bairro, li certa vez: “Funcionamos de segunda à sexta, das 7 as 19h”. Dois tropeços numa linha só. Quando a expressão começa sem artigo — “de segunda” —, o par correspondente também dispensa o artigo: “de segunda a sexta”. Já quando começa com artigo contraído — “das 7h” —, o segundo termo pede crase: “às 19h”. A simetria é a chave: “de… a”, “da… à”, “das… às”.\n\nOs textos formais, por sua vez, adoram as locuções que exigem o sinal grave. Ofícios e comunicados costumam informar que determinado documento está “à disposição” do interessado, que um pedido será analisado “à luz da legislação vigente” ou que as obras avançarão “à medida que” os recursos forem liberados. Nenhuma dessas expressões admite a troca pelo masculino, mas todas são tão fixas que o falante culto as reconhece de ouvido. O mesmo vale para os demonstrativos: um aviso que manda o cidadão dirigir-se “àquele guichê” ou “àquela sala” contrai a preposição com o pronome, e ninguém presta atenção àquilo que já parece óbvio. Há ainda as armadilhas: “devido à chuva” leva crase, porque “devido a” é seguido de um nome feminino com artigo; “devido a problemas técnicos”, não.\n\nAntes de verbos e de palavras masculinas, a crase, em regra, não existe. Ainda assim, não faltam cartazes anunciando “entrega à domicílio” ou “atendimento à partir das 10h”. Esses deslizes, longe de provar que o brasileiro “não sabe português”, mostram o contrário: o falante percebe que ali há um “a” importante e tenta marcá-lo, como quem sublinha uma palavra. Erra por excesso de zelo, não por descaso.\n\nOs linguistas lembram que, na fala, a crase é quase sempre imperceptível. Ninguém pronuncia duas vogais em “à tarde”. O sinal pertence à escrita, e é natural que a escrita, por ser aprendida na escola, gere insegurança. Talvez por isso muitos redatores de repartições públicas prefiram contornar o problema com fórmulas neutras: “Horário de atendimento: 8h–17h”. O traço resolve a questão, mas empobrece o texto.\n\nNo fim das contas, as placas da cidade são um retrato fiel da nossa relação com a norma: respeitosa, às vezes temerosa, frequentemente criativa. Da próxima vez que você esperar o ônibus em frente à estação ou for à biblioteca à tarde, preste atenção aos avisos ao redor. Eles contam, em poucas letras, a história de uma língua que se escreve na rua — e que se corrige, aos poucos, à medida que é lida.",
    "gloss": {
     "senha": "número (de turno)",
     "placas": "carteles, señales",
     "colados": "pegados",
     "cartazes": "afiches",
     "repartições": "oficinas públicas",
     "subentende": "sobreentiende",
     "padaria": "panadería",
     "tropeços": "tropiezos",
     "dispensa": "prescinde de",
     "ofícios": "notas oficiales",
     "recursos": "fondos",
     "ouvido": "(de ouvido) de oído",
     "guichê": "ventanilla",
     "armadilhas": "trampas",
     "deslizes": "errores, descuidos",
     "sublinha": "subraya",
     "zelo": "celo, cuidado",
     "descaso": "desidia",
     "contornar": "esquivar",
     "traço": "guion, raya",
     "ônibus": "colectivo"
    },
    "questions": [
     [
      "Qual é o objetivo principal do texto?",
      [
       "Denunciar o descuido das prefeituras com a sinalização urbana.",
       "Mostrar como a crase aparece nos avisos e placas da cidade.",
       "Defender que a crase seja abolida dos textos oficiais.",
       "Ensinar a pronunciar as vogais contraídas na fala."
      ],
      "Mostrar como a crase aparece nos avisos e placas da cidade."
     ],
     [
      "Por que “de segunda à sexta” está errado, segundo o texto?",
      [
       "Porque os dias da semana nunca aceitam artigo.",
       "Porque a crase só aparece antes de números de horas.",
       "Porque, sem artigo no primeiro termo, não há crase no segundo.",
       "Porque a preposição correta seria “até”, e não “a”."
      ],
      "Porque, sem artigo no primeiro termo, não há crase no segundo."
     ],
     [
      "Como o autor interpreta erros como “à partir das 10h”?",
      [
       "Como sinal de zelo excessivo.",
       "Como prova de ignorância da norma.",
       "Como influência do espanhol.",
       "Como erro de digitação sem importância."
      ],
      "Como sinal de zelo excessivo."
     ],
     [
      "Que crítica o autor faz à fórmula “8h–17h”?",
      [
       "Confunde o leitor sobre o horário real.",
       "Evita o erro, mas empobrece o texto.",
       "Contraria as normas da redação oficial.",
       "Ocupa mais espaço do que a forma com crase."
      ],
      "Evita o erro, mas empobrece o texto."
     ],
     [
      "No 4º parágrafo, reconhecer uma expressão “de ouvido” significa:",
      [
       "ouvi-la pela primeira vez em voz alta.",
       "identificá-la pela familiaridade, sem pensar na regra.",
       "pronunciá-la de acordo com a escrita.",
       "confundi-la com uma expressão parecida."
      ],
      "identificá-la pela familiaridade, sem pensar na regra."
     ]
    ],
    "vf": [
     [
      "Na fala, a crase costuma ser pronunciada como uma vogal longa.",
      "falso"
     ],
     [
      "Trocar a palavra feminina por uma masculina ajuda a decidir a maioria dos casos.",
      "verdadeiro"
     ],
     [
      "O autor da coluna já trabalhou numa repartição pública.",
      "não se diz"
     ],
     [
      "A expressão “devido a problemas técnicos” não leva crase.",
      "verdadeiro"
     ],
     [
      "Os erros de crase nas placas são mais comuns no Nordeste.",
      "não se diz"
     ]
    ],
    "hunt": {
     "label": "Tocá todas las formas con acento grave (à, às, àquele, àquela, àquilo), también las mal puestas de los carteles",
     "targets": [
      "à",
      "às",
      "àquele",
      "àquela",
      "àquilo"
     ]
    }
   },
   "ascolto": {
    "title": "Serviço do fim de semana",
    "genre": "boletim de serviço na rádio",
    "es": "En un informativo matinal, la conductora y un periodista repasan los cambios de tránsito del domingo y una noticia sobre la biblioteca pública de la ciudad.",
    "speakers": [
     "Luciana, apresentadora",
     "Tiago, repórter"
    ],
    "turns": [
     [
      "A",
      "São sete e meia, e a gente vai agora direto à rua com o Tiago, que traz as informações de serviço para o fim de semana. Bom dia, Tiago!"
     ],
     [
      "B",
      "Bom dia, Luciana, bom dia a quem está ouvindo. Olha, o domingo vai ser movimentado. Por causa da corrida de rua, a avenida principal do centro vai ficar fechada das seis às treze horas, no trecho entre a praça da prefeitura e o parque municipal."
     ],
     [
      "A",
      "Das seis à uma da tarde, então. E quem precisa atravessar o centro faz o quê?"
     ],
     [
      "B",
      "A orientação da empresa de trânsito é usar os desvios sinalizados. Quem vem da zona sul deve virar à direita na rua da rodoviária e seguir pela via paralela. Quem vem do norte, à esquerda logo depois do viaduto. Vai ter agente orientando em cada cruzamento."
     ],
     [
      "A",
      "E o transporte público?"
     ],
     [
      "B",
      "As linhas de ônibus que passam pela avenida vão circular em trajeto alternativo. O metrô, por sua vez, abre mais cedo, às cinco da manhã, pra atender os corredores. E, atenção, a estação central fica fechada até o meio-dia, por questão de segurança."
     ],
     [
      "A",
      "Tá anotado. Agora, Tiago, eu sei que você tem uma notícia que não tem nada a ver com a corrida, mas que mexeu com muita gente."
     ],
     [
      "B",
      "Exato. A Biblioteca Pública Municipal anunciou ontem que, a partir do mês que vem, vai reduzir o horário. Hoje ela abre de segunda a sábado, das oito às vinte e uma. Com a mudança, vai funcionar só de terça a sábado, das dez às dezessete."
     ],
     [
      "A",
      "Nossa, é uma redução grande. Qual foi a justificativa?"
     ],
     [
      "B",
      "Segundo o comunicado, a decisão se deve à falta de funcionários e à necessidade de cortar gastos com energia. A direção diz que a medida é temporária, mas não informou até quando."
     ],
     [
      "A",
      "E imagino que a reação não foi das melhores..."
     ],
     [
      "B",
      "Não foi, não. Eu conversei com alguns frequentadores ontem à tarde. Tem muito estudante que trabalha de dia e só consegue estudar à noite, sabe? Uma moça me disse que a biblioteca era o único lugar silencioso que ela tinha pra se preparar pra concurso. Um senhor aposentado reclamou do fechamento às segundas, que era o dia em que ele levava o neto."
     ],
     [
      "A",
      "E existe algum canal pra quem quiser se manifestar?"
     ],
     [
      "B",
      "Tem, sim. A Secretaria de Cultura recebe sugestões e reclamações por escrito, pelo protocolo on-line ou diretamente no balcão de atendimento, que fica no térreo da prefeitura, à esquerda de quem entra. O prazo da consulta pública vai até o fim do mês."
     ],
     [
      "A",
      "Perfeito. Obrigada, Tiago. A gente volta daqui a pouco com a previsão do tempo."
     ]
    ],
    "gloss": {
     "trecho": "tramo",
     "desvios": "desvíos",
     "rodoviária": "terminal de ómnibus",
     "cruzamento": "cruce",
     "corredores": "corredores (de la carrera)",
     "mexeu": "movilizó, afectó",
     "frequentadores": "usuarios habituales",
     "concurso": "concurso para cargo público",
     "aposentado": "jubilado",
     "balcão": "mostrador",
     "térreo": "planta baja",
     "prazo": "plazo"
    },
    "questions": [
     [
      "Por que a avenida principal vai ficar fechada no domingo?",
      [
       "Por causa de obras na via.",
       "Por causa de uma corrida de rua.",
       "Por causa de uma manifestação.",
       "Por causa da feira de artesanato."
      ],
      "Por causa de uma corrida de rua."
     ],
     [
      "Qual será o novo horário da biblioteca?",
      [
       "De segunda a sábado, das 8h às 21h.",
       "De segunda a sexta, das 10h às 17h.",
       "De terça a sábado, das 10h às 17h.",
       "De terça a domingo, das 8h às 17h."
      ],
      "De terça a sábado, das 10h às 17h."
     ],
     [
      "Segundo o comunicado, a redução se deve:",
      [
       "à falta de funcionários e ao corte de gastos.",
       "à baixa procura de leitores no período noturno.",
       "a uma reforma no prédio da biblioteca.",
       "à transferência do acervo para outro local."
      ],
      "à falta de funcionários e ao corte de gastos."
     ],
     [
      "O que os depoimentos colhidos por Tiago sugerem?",
      [
       "Que os usuários preferem estudar em casa.",
       "Que o horário noturno era essencial para quem trabalha de dia.",
       "Que a biblioteca era pouco frequentada à noite.",
       "Que os aposentados apoiam a mudança."
      ],
      "Que o horário noturno era essencial para quem trabalha de dia."
     ],
     [
      "Onde fica o balcão de atendimento da Secretaria de Cultura?",
      [
       "No térreo da prefeitura, à esquerda da entrada.",
       "Na própria biblioteca, junto à recepção.",
       "No primeiro andar, à direita do elevador.",
       "Na estação central do metrô."
      ],
      "No térreo da prefeitura, à esquerda da entrada."
     ]
    ],
    "vf": [
     [
      "A estação central do metrô ficará fechada o dia todo.",
      "falso"
     ],
     [
      "A direção da biblioteca diz que a medida é temporária.",
      "verdadeiro"
     ],
     [
      "A biblioteca vai demitir parte dos funcionários.",
      "não se diz"
     ],
     [
      "A consulta pública vai até o fim do mês.",
      "verdadeiro"
     ]
    ]
   },
   "compito": {
    "genre": "carta_formal",
    "title": "Carta à Secretaria de Cultura",
    "fonte": "ascolto",
    "t": "Você frequenta a Biblioteca Pública Municipal à noite, depois do trabalho. Após ouvir o boletim de serviço da rádio, escreva uma carta formal à Secretaria Municipal de Cultura, dentro do prazo da consulta pública, manifestando-se sobre a redução do horário da biblioteca. Na carta, retome as informações do boletim (horário atual, novo horário e justificativa apresentada), explique como a mudança afeta você e outros usuários e proponha pelo menos uma alternativa. Não se esqueça de incluir local e data, destinatário, assunto, saudação e fecho adequados. Use registro formal e cuide do uso da crase nas indicações de horário. Seu texto deve ter entre 171 e 231 palavras.",
    "es": "Carta formal de reclamo con propuesta: datos del audio (horarios y motivo), cómo te afecta y una alternativa. Ojo con la crase: “das 10h às 17h”, pero “de terça a sábado”.",
    "min": 171,
    "max": 231,
    "punti": [
     [
      "Retomar los horarios anunciados",
      [
       "às 17h",
       "17h",
       "horário"
      ]
     ],
     [
      "Mencionar la justificación dada",
      [
       "funcionários",
       "gastos",
       "energia"
      ]
     ],
     [
      "Explicar cómo afecta a los usuarios",
      [
       "noite",
       "trabalh",
       "estud"
      ]
     ],
     [
      "Proponer una alternativa",
      [
       "propon",
       "sugir",
       "alternativ"
      ]
     ],
     [
      "Saludo y cierre formales",
      [
       "prezad",
       "atenciosamente",
       "respeitosamente"
      ]
     ]
    ],
    "model": "Belo Horizonte, 12 de setembro de 2026.\n\nÀ Secretaria Municipal de Cultura\nAssunto: redução do horário da Biblioteca Pública Municipal\n\nPrezados senhores,\n\nDirijo-me a esta Secretaria para manifestar, dentro do prazo da consulta pública, minha preocupação com a mudança anunciada pela Biblioteca Pública Municipal. Segundo informações divulgadas pela rádio, a partir do próximo mês a biblioteca funcionará apenas de terça a sábado, das 10h às 17h, e não mais de segunda a sábado, das 8h às 21h.\n\nCompreendo que a decisão se deve à falta de funcionários e à necessidade de reduzir gastos com energia. No entanto, a medida atinge justamente quem mais depende do espaço. Trabalho das 8h às 18h e só consigo estudar à noite; como eu, dezenas de estudantes que se preparam para concursos perderão o único ambiente silencioso a que têm acesso.\n\nDiante disso, proponho uma alternativa: manter a abertura noturna ao menos três vezes por semana, fechando a biblioteca pela manhã, quando o movimento é menor. Outra possibilidade seria firmar parcerias com universidades para a contratação de estagiários.\n\nCerto de que a Secretaria levará em conta a opinião dos usuários, coloco-me à disposição para colaborar.\n\nAtenciosamente,\n\nRafael Nunes Teixeira"
   }
  },
  {
   "week": 37,
   "level": "B2",
   "lettura": {
    "title": "Quando o morro avisa: sensores contra deslizamentos",
    "emoji": "📡",
    "genre": "artigo de divulgação científica",
    "grammar": "verbos irregulares e derivados; verbos em -ear e -iar",
    "text": "Toda vez que o céu escurece sobre as encostas do Recife, milhares de moradores fazem a mesma pergunta: vai dar tempo de sair de casa? Nos morros da cidade, onde as construções se equilibram em terrenos íngremes, a chuva forte não é apenas um incômodo; é uma ameaça concreta. Há poucos anos, uma equipe de pesquisadores propôs uma resposta que combina tecnologia de baixo custo e conhecimento local — e os primeiros resultados surpreenderam até os mais céticos.\n\nA ideia partiu da geóloga Tânia Bezerra, que coordena um laboratório de risco geológico numa universidade pública da capital pernambucana. “Os modelos tradicionais preveem a chuva, mas não preveem o que a chuva faz com cada encosta”, explica. Para preencher essa lacuna, o grupo instalou dezenas de sensores enterrados no solo, capazes de medir a umidade e pequenos movimentos da terra. Os aparelhos transmitem os dados a cada cinco minutos para uma central que os cruza com as informações meteorológicas.\n\nO desafio técnico era grande, mas não o maior. “Os sensores, a gente compra; a confiança da comunidade, a gente conquista”, resume a pesquisadora. Por isso, desde o início, o projeto manteve reuniões mensais com associações de moradores. Foram eles que indicaram onde a água costumava brotar depois das tempestades, quais muros já tinham rachaduras e quais famílias viviam em situação mais delicada. Esse saber, que nenhum satélite detém, orientou a instalação dos equipamentos.\n\nNo primeiro ano, os pesquisadores obtiveram um resultado animador: em três episódios de chuva intensa, o sistema emitiu alertas com cerca de quarenta minutos de antecedência em relação aos pequenos deslizamentos registrados. Quarenta minutos podem parecer pouco, mas bastam para que uma família deixe a casa e se abrigue num ponto seguro. “Não estamos falando de prever catástrofes com dias de antecedência”, pondera Tânia. “Estamos falando de ganhar o tempo suficiente para salvar vidas.”\n\nOs críticos, no entanto, receiam que a tecnologia crie uma falsa sensação de segurança. Um engenheiro que acompanhou o projeto como consultor lembra que os sensores cobrem apenas uma fração das áreas de risco e que alertas falsos podem minar a credibilidade do sistema. “Se o celular apita três vezes e nada acontece, na quarta vez ninguém sai de casa”, adverte. Há também quem tema que o poder público use o monitoramento como pretexto para adiar obras estruturais, como drenagem e contenção de encostas.\n\nA equipe não ignora essas objeções. Pelo contrário: propõe que o sistema seja visto como complemento, e não substituto, das políticas de habitação. Os pesquisadores defendem que, quando os dados indicarem risco permanente, a prefeitura intervenha com obras e, se necessário, com reassentamento — desde que negociado com os moradores. Nas reuniões, quem medeia essas conversas é uma assistente social ligada ao projeto, que também rastreia, casa por casa, as famílias que ainda não recebem os alertas por falta de celular.\n\nSe o modelo será mantido depois do fim do financiamento, ninguém sabe. Os aparelhos precisam de manutenção, as baterias duram pouco e a verba da pesquisa acaba no ano que vem. Ainda assim, outras cidades já demonstraram interesse, e a equipe prevê publicar um manual aberto para que qualquer município possa reproduzir a experiência. Enquanto isso, nos morros do Recife, os moradores aprenderam a olhar para o celular com a mesma atenção com que olham para o céu. Quando o morro avisa, agora há quem traduza o aviso a tempo.",
    "gloss": {
     "encostas": "laderas",
     "morros": "cerros (barrios en las laderas)",
     "íngremes": "empinados",
     "incômodo": "molestia",
     "lacuna": "vacío",
     "rachaduras": "grietas",
     "detém": "posee",
     "obtiveram": "obtuvieron",
     "antecedência": "anticipación",
     "abrigue": "se refugie",
     "pondera": "matiza",
     "receiam": "temen",
     "minar": "socavar",
     "apita": "suena (la alarma)",
     "adiar": "postergar",
     "intervenha": "intervenga",
     "reassentamento": "reubicación",
     "medeia": "media, hace de mediadora",
     "rastreia": "rastrea",
     "verba": "presupuesto, fondos",
     "manutenção": "mantenimiento"
    },
    "questions": [
     [
      "Qual é a principal novidade do projeto descrito no artigo?",
      [
       "Prever a chuva com vários dias de antecedência.",
       "Cruzar dados do solo de cada encosta com a previsão do tempo.",
       "Substituir as obras de contenção por sensores.",
       "Transferir para áreas seguras todas as famílias que vivem nos morros."
      ],
      "Cruzar dados do solo de cada encosta com a previsão do tempo."
     ],
     [
      "Por que o projeto manteve reuniões mensais com os moradores?",
      [
       "Para cobrar uma taxa pelo serviço de alerta.",
       "Para aproveitar o saber local e ganhar confiança.",
       "Para convencê-los a abandonar as casas mais próximas das encostas.",
       "Para vender celulares às famílias."
      ],
      "Para aproveitar o saber local e ganhar confiança."
     ],
     [
      "Com a frase “Se o celular apita três vezes e nada acontece…”, o engenheiro alerta para:",
      [
       "o alto custo dos aparelhos celulares.",
       "o sinal fraco das operadoras de telefonia nos morros mais altos.",
       "o risco de alarmes falsos desacreditarem o sistema.",
       "a demora na chegada dos alertas."
      ],
      "o risco de alarmes falsos desacreditarem o sistema."
     ],
     [
      "Como a equipe responde às críticas?",
      [
       "Apresenta o sistema como complemento das políticas de habitação.",
       "Garante que os sensores cobrem todas as áreas de risco.",
       "Afirma que as obras estruturais são desnecessárias.",
       "Decide suspender o projeto até obter mais verba."
      ],
      "Apresenta o sistema como complemento das políticas de habitação."
     ],
     [
      "Qual é o tom do último parágrafo?",
      [
       "Pessimista e resignado.",
       "Otimista, mas cauteloso.",
       "Indignado com a prefeitura.",
       "Eufórico."
      ],
      "Otimista, mas cauteloso."
     ]
    ],
    "vf": [
     [
      "Os sensores enviam dados à central a cada cinco minutos.",
      "verdadeiro"
     ],
     [
      "O sistema previu os deslizamentos com vários dias de antecedência.",
      "falso"
     ],
     [
      "A assistente social mora num dos morros monitorados.",
      "não se diz"
     ],
     [
      "A verba da pesquisa termina no ano que vem.",
      "verdadeiro"
     ],
     [
      "Tânia Bezerra trabalhou antes num serviço de meteorologia.",
      "não se diz"
     ]
    ],
    "hunt": {
     "label": "Tocá las formas de los verbos irregulares y sus derivados (propor, prever, manter, deter, obter, intervir) y de los verbos en -ear/-iar",
     "targets": [
      "propôs",
      "preveem",
      "manteve",
      "detém",
      "obtiveram",
      "receiam",
      "propõe",
      "intervenha",
      "medeia",
      "rastreia",
      "mantido",
      "prevê"
     ]
    }
   },
   "ascolto": {
    "title": "Por que ficou tão difícil consertar o celular?",
    "genre": "podcast de tecnologia",
    "es": "En un podcast sobre tecnología cotidiana, la conductora entrevista a un técnico que repara celulares desde hace años sobre las trabas para arreglar los aparatos.",
    "speakers": [
     "Fernanda, apresentadora",
     "Diego, técnico de celulares"
    ],
    "turns": [
     [
      "A",
      "Olá, olá, começa agora mais um episódio do Fio Terra, o podcast que desmonta a tecnologia do dia a dia. Eu sou a Fernanda e hoje eu tô com o Diego, que tem uma assistência técnica de celulares em Campinas há mais de quinze anos. Diego, seja bem-vindo."
     ],
     [
      "B",
      "Valeu, Fernanda, obrigado pelo convite."
     ],
     [
      "A",
      "Diego, vou direto ao ponto: por que ficou tão difícil consertar um celular?"
     ],
     [
      "B",
      "Olha, tem vários motivos, mas o principal é o seguinte: os fabricantes hoje projetam os aparelhos pra não serem abertos. É bateria colada, é tela colada, é parafuso com formato esquisito que só a ferramenta deles abre. E, pior, algumas peças são pareadas com o aparelho."
     ],
     [
      "A",
      "Pareadas? Explica isso pra quem tá ouvindo."
     ],
     [
      "B",
      "Então, cada peça tem um número de série registrado no sistema. Se eu troco a câmera de um celular por outra câmera original, novinha, mas de outro aparelho, o software percebe e bloqueia algumas funções. Ou fica mostrando uma mensagem de peça desconhecida. Aí o cliente acha que eu fiz um serviço malfeito."
     ],
     [
      "A",
      "Nossa. E como você mantém o negócio funcionando com tanta barreira?"
     ],
     [
      "B",
      "Com muito jeito, né? A gente obtém peças de aparelhos descartados, faz curso, troca informação com técnico do Brasil inteiro. Mas eu não vou mentir: tem modelo que eu nem pego mais. Não compensa."
     ],
     [
      "A",
      "Tem gente que diz que isso é questão de segurança. Que, se qualquer um puder abrir o celular, os dados ficam vulneráveis."
     ],
     [
      "B",
      "É, esse é o argumento das empresas. E faz um certo sentido, não vou negar. Mas, veja, dá pra proteger os dados sem impedir o conserto. Na Europa, por exemplo, já se discutem leis de direito ao reparo, e várias marcas passaram a vender peças e publicar manuais."
     ],
     [
      "A",
      "E aqui no Brasil? Existe alguma proposta?"
     ],
     [
      "B",
      "Existem discussões, mas nada muito avançado. O que eu proponho, e muitos colegas também, é simples: que o fabricante seja obrigado a vender a peça e a ferramenta por um preço justo, e que o governo intervenha quando houver bloqueio sem justificativa técnica."
     ],
     [
      "A",
      "E você prevê alguma mudança nos próximos anos?"
     ],
     [
      "B",
      "Prevejo, sim, mas por pressão do consumidor, mais do que por boa vontade das empresas. O pessoal tá cansado de trocar de celular a cada dois anos. E tem a questão ambiental, né? É muito lixo eletrônico."
     ],
     [
      "A",
      "Pra fechar, uma dica pra quem tá ouvindo e quer que o celular dure mais."
     ],
     [
      "B",
      "Cuida da bateria. Evita deixar chegar a zero, evita calor. E, quando quebrar, procura um técnico de confiança antes de sair comprando outro. Às vezes o conserto custa um terço do preço de um aparelho novo."
     ],
     [
      "A",
      "Anotado. Diego, muito obrigada pela conversa."
     ],
     [
      "B",
      "Eu que agradeço."
     ]
    ],
    "gloss": {
     "desmonta": "desarma",
     "consertar": "arreglar, reparar",
     "colada": "pegada",
     "parafuso": "tornillo",
     "esquisito": "raro",
     "pareadas": "vinculadas (al aparato)",
     "malfeito": "mal hecho",
     "compensa": "conviene",
     "conserto": "arreglo",
     "reparo": "reparación",
     "lixo": "basura",
     "dica": "consejo"
    },
    "questions": [
     [
      "Segundo Diego, qual é a principal causa da dificuldade de conserto?",
      [
       "O preço alto das peças originais.",
       "Os aparelhos são projetados para não serem abertos.",
       "A falta de técnicos bem formados em todas as regiões do Brasil.",
       "A proibição legal de abrir os celulares."
      ],
      "Os aparelhos são projetados para não serem abertos."
     ],
     [
      "O que acontece quando se instala uma peça original tirada de outro aparelho?",
      [
       "O aparelho perde a garantia na hora.",
       "A peça não se encaixa no novo aparelho.",
       "O software limita funções ou exibe um aviso.",
       "Os dados pessoais do cliente são apagados sem nenhum aviso."
      ],
      "O software limita funções ou exibe um aviso."
     ],
     [
      "Como Diego avalia o argumento da segurança dos dados?",
      [
       "Acha que é pura desculpa das empresas.",
       "Reconhece que faz sentido, mas não justifica impedir o conserto.",
       "Concorda totalmente e evita abrir aparelhos novos.",
       "Diz que é um problema só dos celulares europeus."
      ],
      "Reconhece que faz sentido, mas não justifica impedir o conserto."
     ],
     [
      "O que Diego propõe?",
      [
       "Que o governo fabrique peças de reposição.",
       "Que as assistências técnicas sejam certificadas.",
       "Que fabricantes vendam peças e ferramentas a preço justo.",
       "Que se proíba a venda de celulares com bateria e tela coladas."
      ],
      "Que fabricantes vendam peças e ferramentas a preço justo."
     ],
     [
      "Por que Diego acredita que haverá mudanças?",
      [
       "Pela pressão dos consumidores e pelo lixo eletrônico.",
       "Porque as empresas mudaram de estratégia.",
       "Porque o Brasil acabou de aprovar uma lei de direito ao reparo.",
       "Porque os celulares ficaram mais baratos."
      ],
      "Pela pressão dos consumidores e pelo lixo eletrônico."
     ]
    ],
    "vf": [
     [
      "Diego tem uma assistência técnica há mais de quinze anos.",
      "verdadeiro"
     ],
     [
      "Diego aceita consertar qualquer modelo de celular.",
      "falso"
     ],
     [
      "Diego também vende celulares usados na sua loja.",
      "não se diz"
     ],
     [
      "Segundo Diego, o conserto pode custar um terço do preço de um aparelho novo.",
      "verdadeiro"
     ]
    ]
   },
   "compito": {
    "genre": "artigo",
    "title": "Tecnologia a serviço de quem?",
    "fonte": "entrambi",
    "t": "Você colabora com uma revista de divulgação científica para jovens, que prepara uma edição especial com o tema “Tecnologia a serviço de quem?”. Após ler o artigo sobre os sensores contra deslizamentos no Recife e ouvir o episódio do podcast Fio Terra sobre o conserto de celulares, escreva um artigo de opinião para a revista. No seu texto, compare as duas experiências, usando informações do artigo e do podcast, e defenda uma posição sobre o papel da tecnologia e do poder público. Não se esqueça de dar um título ao artigo. Use registro formal, mas acessível ao público jovem. Seu texto deve ter entre 177 e 237 palavras.",
    "es": "Artículo con título que compare los dos casos de la semana (sensores en Recife y derecho a reparar) y tome posición. Aprovechá verbos como propor, manter, obter, intervir, prever.",
    "min": 177,
    "max": 237,
    "punti": [
     [
      "Poner un título",
      [
       "tecnologia"
      ]
     ],
     [
      "Usar el caso de los sensores de Recife",
      [
       "sensor",
       "recife",
       "encosta",
       "morro"
      ]
     ],
     [
      "Usar el caso del podcast sobre reparación",
      [
       "conserto",
       "reparo",
       "peça",
       "celular"
      ]
     ],
     [
      "Tomar una posición y concluir",
      [
       "defendo",
       "acredito",
       "portanto",
       "por isso"
      ]
     ]
    ],
    "model": "Tecnologia a serviço de quem?\n\nCostumamos associar inovação a aparelhos cada vez mais caros e sofisticados. Mas duas experiências recentes mostram que a pergunta decisiva não é o que a tecnologia consegue fazer, e sim a quem ela serve.\n\nNo Recife, uma equipe de geólogos instalou sensores de baixo custo nas encostas dos morros. Cruzando dados de umidade do solo com a previsão do tempo, os pesquisadores obtiveram alertas com cerca de quarenta minutos de antecedência. O detalhe mais importante, porém, não é técnico: o projeto só funcionou porque manteve diálogo constante com os moradores, que indicaram onde a terra costumava ceder.\n\nO caso oposto aparece no mercado de celulares. Como relatou um técnico de Campinas no podcast Fio Terra, muitos fabricantes projetam aparelhos que não podem ser abertos e bloqueiam peças originais trocadas fora da rede autorizada. Nesse modelo, a inovação serve para prender o consumidor, e não para resolver seus problemas.\n\nComparar as duas situações ajuda a entender que a tecnologia não é neutra. Quando nasce da escuta da comunidade, protege vidas; quando é desenhada para impedir o conserto, gera lixo e dependência. Por isso, defendo que o poder público intervenha nos dois casos: financiando projetos como o do Recife e garantindo o direito ao reparo. Só assim a tecnologia estará, de fato, a serviço de todos."
   }
  },
  {
   "week": 38,
   "level": "B2",
   "lettura": {
    "title": "Legenda com sotaque: quando a série fala como a gente",
    "emoji": "🎬",
    "genre": "reportagem",
    "grammar": "português falado do Brasil (né, tá, cadê, a gente, pra)",
    "text": "Quem assiste a uma série brasileira com legendas em português talvez nunca tenha reparado num pequeno descompasso: o personagem diz “cadê a chave?”, e a legenda escreve “onde está a chave?”. Ele diz “a gente tá atrasado”, e o texto na tela corrige para “estamos atrasados”. Durante décadas, essa tradução silenciosa do português falado para o português escrito foi a regra nas legendas, nas dublagens e até nos roteiros. Nos últimos anos, porém, algo começou a mudar.\n\n“A gente percebeu que o público estranhava”, conta Luana Freitas, coordenadora de legendagem de uma produtora paulistana que trabalha para plataformas de streaming. “Nas redes, as pessoas reclamavam: por que a legenda fala diferente do ator? Principalmente quem é surdo ou tem dificuldade auditiva e depende do texto pra acompanhar a história.” A empresa passou então a adotar, em produções nacionais, uma legenda mais próxima da fala: o “pra” substituiu o “para”, o “né” ganhou espaço no fim das frases e o “tá” deixou de ser automaticamente convertido em “está”.\n\nA mudança não é trivial. Os linguistas lembram que essas formas não são erros, mas traços consolidados do português brasileiro. O “a gente” no lugar de “nós”, por exemplo, é muito frequente na fala espontânea de todas as regiões e classes sociais, inclusive entre pessoas com alta escolaridade. O “né”, contração de “não é”, funciona como um pedido de confirmação ou simplesmente como um marcador que mantém o interlocutor por perto. “Cadê”, que vem de uma antiga expressão, “que é de”, é tão comum que soa estranho quando alguém pergunta, numa conversa informal, “onde está?”.\n\nNem todos aplaudem. Professores de língua ouvidos pela reportagem manifestam receio de que a legenda coloquial confunda estudantes e estrangeiros que aprendem português. “A legenda é, para muitos espectadores, o principal contato diário com a escrita”, argumenta um docente de uma escola pública de Salvador. “Se ela reproduz o tô e o pro, onde o aluno vai ver o registro formal?” Outros rebatem que o problema está justamente no oposto: ao corrigir a fala, a legenda transmite a ideia de que o jeito como os brasileiros falam é inferior.\n\nHá ainda uma questão técnica. As legendas têm limite de caracteres por linha e de tempo na tela; por isso, os legendistas sempre precisaram cortar palavras e condensar falas. Curiosamente, as formas orais ajudam nesse ponto: “pra” é mais curto que “para”, “tá” é mais curto que “está”. Mas o equilíbrio é delicado. “Se eu escrevo tudo como o ator fala, com tipo, assim, sabe, a legenda fica ilegível”, explica Luana. “A gente seleciona. O que é marca de identidade do personagem fica; o que é só hesitação sai.”\n\nO debate chegou também às redes sociais, onde o português escrito sempre foi mais livre. Nos comentários, ninguém escreve “estamos chegando”: escreve “a gente tá chegando”, quando não abrevia tudo para “tamo chegando”. Para alguns pesquisadores, as plataformas digitais aproximaram a escrita cotidiana da fala de um modo inédito, e a legenda apenas acompanha esse movimento.\n\nTalvez o mais interessante seja perceber que a discussão não opõe certo e errado, mas contextos. Ninguém propõe que um contrato diga “a gente se compromete”, nem que um boletim médico use “cadê”. Assim como um bom falante ajusta o registro conforme a situação, a legenda passa a se ajustar ao gênero que traduz. Numa série sobre adolescentes da periferia, a fala crua é parte da verdade da história; num documentário histórico, a norma culta pode ser mais adequada. No fim, a pergunta que as produtoras começam a fazer é simples: a legenda serve para corrigir o personagem ou para ouvi-lo melhor?",
    "gloss": {
     "reparado": "notado",
     "descompasso": "desajuste",
     "tela": "pantalla",
     "dublagens": "doblajes",
     "roteiros": "guiones",
     "estranhava": "le resultaba raro",
     "surdo": "sordo",
     "traços": "rasgos",
     "escolaridade": "nivel educativo",
     "ouvidos": "consultados",
     "receio": "temor",
     "rebatem": "replican",
     "legendistas": "subtituladores",
     "hesitação": "titubeo",
     "inédito": "sin precedentes",
     "boletim": "parte (médico)",
     "periferia": "barrios populares de las afueras",
     "crua": "cruda"
    },
    "questions": [
     [
      "Qual foi a principal mudança adotada pela produtora de Luana?",
      [
       "Passou a dublar todas as séries estrangeiras.",
       "Aproximou as legendas das produções nacionais da fala dos atores.",
       "Eliminou as legendas das séries brasileiras.",
       "Contratou professores de português para revisar todos os roteiros das séries."
      ],
      "Aproximou as legendas das produções nacionais da fala dos atores."
     ],
     [
      "Segundo o texto, por que a fidelidade à fala importa para pessoas surdas?",
      [
       "Porque dependem da legenda para acompanhar a história como é dita.",
       "Porque preferem ler em registro formal.",
       "Porque não conhecem as formas coloquiais.",
       "Porque as dublagens nacionais raramente são acessíveis às pessoas surdas."
      ],
      "Porque dependem da legenda para acompanhar a história como é dita."
     ],
     [
      "Qual é o argumento do professor de Salvador?",
      [
       "A legenda coloquial tira dos alunos um contato diário com a escrita formal.",
       "As séries nacionais têm pouco valor educativo.",
       "Os alunos não leem legendas.",
       "Os estrangeiros deveriam assistir às séries brasileiras sempre sem nenhuma legenda."
      ],
      "A legenda coloquial tira dos alunos um contato diário com a escrita formal."
     ],
     [
      "Segundo Luana, o que é retirado da legenda?",
      [
       "As gírias regionais dos personagens.",
       "As hesitações sem valor de identidade.",
       "Todas as formas como “né” e “tá”.",
       "Os nomes próprios difíceis."
      ],
      "As hesitações sem valor de identidade."
     ],
     [
      "Que posição o texto sugere no último parágrafo?",
      [
       "O registro formal deve prevalecer sempre.",
       "A escolha do registro depende do gênero e do contexto.",
       "As legendas coloquiais devem ser proibidas em documentários e contratos.",
       "A fala crua é sempre mais verdadeira."
      ],
      "A escolha do registro depende do gênero e do contexto."
     ]
    ],
    "vf": [
     [
      "“A gente” é usado sobretudo por pessoas com pouca escolaridade.",
      "falso"
     ],
     [
      "As formas orais podem ajudar a respeitar o limite de caracteres.",
      "verdadeiro"
     ],
     [
      "A produtora de Luana também legenda séries estrangeiras com linguagem coloquial.",
      "não se diz"
     ],
     [
      "Nas redes sociais, a escrita sempre foi mais livre do que em outros meios.",
      "verdadeiro"
     ],
     [
      "A maioria dos espectadores prefere legendas no registro formal.",
      "não se diz"
     ]
    ],
    "hunt": {
     "label": "Tocá las formas típicas del portugués hablado de Brasil (né, tá, tô, cadê, a gente, pra, pro, tamo)",
     "targets": [
      "né",
      "tá",
      "tô",
      "cadê",
      "gente",
      "pra",
      "pro",
      "tamo"
     ]
    }
   },
   "ascolto": {
    "title": "Cê já terminou a série?",
    "genre": "conversa entre amigos",
    "es": "Dos amigos se encuentran en un café y charlan de una serie brasileña que están viendo, de los spoilers en las redes y de otras cosas.",
    "speakers": [
     "Bruna",
     "Caio"
    ],
    "turns": [
     [
      "A",
      "E aí, Caio, tudo bom? Senta aí. Nossa, cê tá com uma cara de sono..."
     ],
     [
      "B",
      "Tô morto, Bruna. Fiquei até as três da manhã maratonando aquela série, sabe? A da família que tem uma padaria em Niterói."
     ],
     [
      "A",
      "Mentira! Casa de Pão? Eu também tô vendo! Em que episódio cê tá?"
     ],
     [
      "B",
      "Terminei, né. Vi a temporada inteira num fim de semana. Mas calma, não vou dar spoiler."
     ],
     [
      "A",
      "Ai, ainda bem, porque ontem mesmo eu quase vi um spoiler no grupo da faculdade. O pessoal não tem noção, tipo, manda print do final sem avisar nada."
     ],
     [
      "B",
      "Pois é, rede social virou campo minado. Eu silenciei umas palavras no aplicativo pra não aparecer nada da série na minha timeline."
     ],
     [
      "A",
      "Sério? Dá pra fazer isso? Cadê essa opção?"
     ],
     [
      "B",
      "Dá, tá nas configurações, lá em privacidade. Depois eu te mostro. Mas vem cá, o que cê tá achando?"
     ],
     [
      "A",
      "Olha, no começo eu achei meio parado, sabe? Aí lá pelo terceiro episódio a coisa engrenou. E o que eu mais gosto é o jeito que eles falam. Parece a minha família, cara. Minha tia fala igualzinho à dona Cida."
     ],
     [
      "B",
      "Né? Ninguém fala nós vamos, todo mundo fala a gente vai. Eu li até uma matéria dizendo que a legenda agora respeita isso, que antes eles corrigiam tudo."
     ],
     [
      "A",
      "Ah, por isso! Eu sempre vejo com legenda porque o som do meu notebook é horrível, e eu reparei que tava escrito pra, tá, essas coisas. Achei estranho no começo."
     ],
     [
      "B",
      "Mas faz sentido, né? Se o ator fala cadê, por que a legenda vai escrever onde está? Fica artificial."
     ],
     [
      "A",
      "É, mas minha mãe, que é professora, reclamou. Falou que a gente já escreve tudo errado no celular e que agora nem a série ajuda. Ela acha que isso confunde os alunos dela."
     ],
     [
      "B",
      "Ah, mas aí é outra coisa. Uma coisa é mensagem, outra é redação da escola. Ninguém escreve currículo com tô, né?"
     ],
     [
      "A",
      "Verdade. Bom, mudando de assunto, cê vai na festa da Lari sábado?"
     ],
     [
      "B",
      "Vou, mas vou chegar tarde, porque tenho plantão no hospital até as oito. Guarda um pedaço de bolo pra mim."
     ],
     [
      "A",
      "Fechado. E se até lá eu não tiver terminado a série, cê fica quieto, tá?"
     ],
     [
      "B",
      "Juro. Boca de siri."
     ],
     [
      "A",
      "Ó, e me manda depois aquele print das configurações, tá? Senão eu esqueço."
     ],
     [
      "B",
      "Mando agora, pera aí. Pronto, mandei. Cê vai ver que é rapidinho, dá pra silenciar até o nome dos personagens."
     ]
    ],
    "gloss": {
     "cê": "vos (forma oral de você)",
     "morto": "muerto (de cansancio)",
     "maratonando": "viendo de corrido",
     "noção": "(não ter noção) ser desubicado",
     "print": "captura de pantalla",
     "silenciei": "silencié",
     "parado": "lento",
     "engrenou": "agarró ritmo",
     "igualzinho": "igualito",
     "reparei": "noté",
     "plantão": "guardia",
     "bolo": "torta",
     "fechado": "trato hecho",
     "siri": "(boca de siri) boca cerrada"
    },
    "questions": [
     [
      "Por que Caio está com sono?",
      [
       "Trabalhou no plantão a noite toda.",
       "Ficou até tarde vendo a série.",
       "Foi a uma festa na noite anterior.",
       "Estudou para uma prova da faculdade."
      ],
      "Ficou até tarde vendo a série."
     ],
     [
      "Por que Bruna se preocupa com as redes sociais?",
      [
       "Tem medo de ver o final da série antes da hora.",
       "Não sabe usar as configurações de privacidade do aplicativo.",
       "Recebeu críticas por comentar a série.",
       "Perdeu o acesso ao grupo da faculdade."
      ],
      "Tem medo de ver o final da série antes da hora."
     ],
     [
      "Do que Bruna mais gosta na série?",
      [
       "A história da padaria em Niterói.",
       "O jeito de falar dos personagens.",
       "A trilha sonora e a fotografia.",
       "O final surpreendente."
      ],
      "O jeito de falar dos personagens."
     ],
     [
      "O que Caio quer dizer com “Uma coisa é mensagem, outra é redação da escola”?",
      [
       "Que a escola deveria ensinar a escrever mensagens.",
       "Que o registro muda conforme a situação de escrita.",
       "Que as mensagens de celular estragam a língua.",
       "Que a mãe de Bruna tem toda a razão."
      ],
      "Que o registro muda conforme a situação de escrita."
     ],
     [
      "Quando Caio diz “Boca de siri”, ele:",
      [
       "reclama da comida da festa.",
       "promete não contar nada sobre a série.",
       "pede que Bruna fale mais baixo.",
       "diz que vai chegar tarde à festa da Lari."
      ],
      "promete não contar nada sobre a série."
     ]
    ],
    "vf": [
     [
      "Caio viu a temporada inteira num fim de semana.",
      "verdadeiro"
     ],
     [
      "Bruna vê a série sem legenda.",
      "falso"
     ],
     [
      "A mãe de Bruna é professora.",
      "verdadeiro"
     ],
     [
      "Lari é colega de faculdade de Bruna.",
      "não se diz"
     ]
    ]
   },
   "compito": {
    "genre": "email_informal",
    "title": "E-mail a um amigo que aprende português",
    "fonte": "entrambi",
    "t": "Você é brasileiro(a) e tem um amigo estrangeiro, Tom, que está aprendendo português. Ele lhe escreveu dizendo que está confuso: na aula aprende “nós estamos” e “onde está”, mas nas séries brasileiras e nas legendas vê “a gente tá” e “cadê”. Após ler a reportagem “Legenda com sotaque” e ouvir a conversa entre Bruna e Caio, escreva um e-mail para Tom explicando essas formas do português falado, usando informações da reportagem e da conversa, e dando a ele conselhos sobre quando usar cada registro. Use registro informal. Não se esqueça de cumprimentar e de se despedir do seu amigo. Seu texto deve ter entre 182 e 242 palavras.",
    "es": "Mail informal a un amigo: explicá que né, tá, cadê, a gente y pra no son errores sino portugués hablado, usá datos de la lectura y del audio y dale un consejo sobre registros.",
    "min": 182,
    "max": 242,
    "punti": [
     [
      "Explicar las formas orales (a gente, tá, cadê, né, pra)",
      [
       "a gente",
       "cadê",
       "né"
      ]
     ],
     [
      "Aclarar que no son errores",
      [
       "erro",
       "errado"
      ]
     ],
     [
      "Usar información de la lectura y de la charla",
      [
       "legenda",
       "reportagem",
       "conversa"
      ]
     ],
     [
      "Explicar que depende del contexto o registro",
      [
       "contexto",
       "registro",
       "situação"
      ]
     ],
     [
      "Dar un consejo",
      [
       "dica",
       "conselho",
       "sugiro"
      ]
     ]
    ],
    "model": "Oi, Tom!\n\nQue bom receber notícias suas! Adorei saber que você tá maratonando séries brasileiras pra treinar o português. E pode ficar tranquilo: você não tá ficando louco. A confusão tem explicação.\n\nO que você aprende na aula, tipo “nós estamos” e “onde está”, é o português escrito, mais formal. Já o que você ouve nas séries é o português falado do Brasil, que tem suas próprias formas. “A gente” no lugar de “nós”, “tá” no lugar de “está”, “cadê” no lugar de “onde está” e o famoso “né” no fim das frases não são erros: todo mundo usa, até professor universitário.\n\nLi uma reportagem esses dias que explicava justamente isso. Antes, as legendas corrigiam a fala dos atores; agora, em várias produções nacionais, elas respeitam o jeito como a gente fala. Alguns professores reclamam, mas a própria reportagem conclui que tudo depende do contexto: ninguém escreve um contrato com “cadê”.\n\nTambém ouvi uma conversa de dois amigos comentando uma série, e um deles resumiu bem: uma coisa é mensagem, outra é redação da escola.\n\nEntão minha dica é: aprende as duas coisas. Usa “a gente” e “pra” quando conversar com os amigos e guarda o “nós” e o “para” pros e-mails de trabalho e pras provas.\n\nUm abraço e boa maratona!\n\nLucas"
   }
  },
  {
   "week": 40,
   "level": "B2+",
   "lettura": {
    "title": "Permanência estudantil no primeiro ano: principais conclusões",
    "emoji": "📊",
    "genre": "sumário executivo de relatório de pesquisa",
    "grammar": "registro formal e nominalização",
    "text": "Apresentação. O presente relatório reúne os resultados da pesquisa conduzida pelo Núcleo de Estudos sobre Permanência Estudantil (NEPE) ao longo de dois anos letivos, com o objetivo de identificar os fatores associados à evasão de estudantes no primeiro ano de graduação em uma universidade federal da região Centro-Oeste. A investigação combinou a análise de registros acadêmicos de cerca de 4.800 ingressantes com a realização de entrevistas em profundidade com 62 estudantes, dos quais 27 haviam trancado ou abandonado o curso.\n\nMetodologia. A escolha de uma abordagem mista justifica-se pela insuficiência dos dados quantitativos para a compreensão das motivações individuais. Se, por um lado, os registros permitem a identificação de padrões — como a concentração dos abandonos no segundo semestre —, por outro, somente a escuta dos próprios estudantes possibilita a interpretação desses padrões. As entrevistas foram realizadas mediante consentimento livre e esclarecido, com garantia de anonimato, e submetidas a análise de conteúdo por dois pesquisadores de forma independente.\n\nPrincipais resultados. Constatou-se, em primeiro lugar, que a evasão no primeiro ano não decorre de um único fator, mas da sobreposição de dificuldades de natureza econômica, pedagógica e afetiva. A necessidade de conciliação entre trabalho e estudo foi mencionada por mais da metade dos entrevistados que deixaram o curso. Em segundo lugar, verificou-se uma forte relação entre a reprovação em disciplinas introdutórias de cálculo e de leitura acadêmica e a decisão de abandono. Em terceiro lugar, a ausência de vínculos com colegas e professores apareceu como elemento decisivo: estudantes que relataram sentimento de isolamento nas primeiras semanas apresentaram probabilidade significativamente maior de desistência. Em quarto lugar, observou-se que a distância entre a residência e o campus, associada à precariedade do transporte coletivo noturno, agravou a situação dos estudantes de cursos noturnos, que frequentemente mencionaram o cansaço como justificativa para a ausência às aulas.\n\nDiscussão. Os resultados sugerem que a permanência estudantil não depende apenas da concessão de auxílios financeiros, cuja importância, contudo, não se questiona. A adaptação à cultura universitária — marcada pela exigência de autonomia, pela leitura de textos complexos e pela produção de gêneros acadêmicos pouco familiares — constitui um obstáculo frequentemente subestimado pelas instituições. Observa-se, ainda, que a oferta de apoio pedagógico existente é pouco conhecida: apenas uma minoria dos entrevistados declarou ter recorrido à monitoria ou ao serviço de orientação. Tal constatação indica que o problema reside menos na inexistência de serviços do que na sua divulgação. Tampouco se pode desconsiderar a dimensão afetiva: a construção de redes de amizade e a percepção de pertencimento ao ambiente acadêmico mostraram-se tão relevantes quanto o desempenho nas primeiras avaliações.\n\nRecomendações. Diante do exposto, recomenda-se: (a) a ampliação dos programas de auxílio estudantil, com prioridade para ingressantes em situação de vulnerabilidade socioeconômica; (b) a implementação de um programa de acolhimento nas primeiras semanas de aula, com a participação de estudantes veteranos como mentores; (c) a reformulação das disciplinas introdutórias, com a inclusão de atividades de nivelamento; (d) o fortalecimento da divulgação dos serviços de apoio pedagógico e psicológico; e (e) a criação de um sistema de acompanhamento que permita a identificação precoce de estudantes em risco, a partir de indicadores como a frequência às aulas e o desempenho nas primeiras avaliações.\n\nLimitações. Cabe ressaltar, por fim, que o estudo apresenta limitações. A restrição da amostra a uma única instituição impede a generalização dos resultados para o conjunto do sistema federal de ensino. Além disso, a dificuldade de contato com ex-estudantes pode ter produzido um viés, uma vez que aqueles que aceitaram participar talvez mantivessem uma relação menos conflituosa com a universidade. Sugere-se, portanto, a replicação da pesquisa em outras instituições, bem como a realização de um acompanhamento longitudinal dos estudantes que retornaram aos estudos após o trancamento da matrícula.",
    "gloss": {
     "letivos": "lectivos",
     "evasão": "deserción",
     "ingressantes": "ingresantes",
     "trancado": "congelado (la matrícula)",
     "abordagem": "enfoque",
     "esclarecido": "informado",
     "decorre": "deriva",
     "sobreposição": "superposición",
     "reprovação": "desaprobación (materia bochada)",
     "desistência": "abandono",
     "auxílios": "ayudas económicas, becas",
     "monitoria": "tutoría de alumnos avanzados",
     "acolhimento": "recepción, acogida",
     "nivelamento": "nivelación",
     "precoce": "temprana",
     "frequência": "asistencia",
     "desempenho": "rendimiento",
     "ressaltar": "destacar",
     "amostra": "muestra",
     "viés": "sesgo",
     "trancamento": "congelamiento"
    },
    "questions": [
     [
      "Qual é o objetivo da pesquisa?",
      [
       "Avaliar a qualidade dos cursos de graduação da região.",
       "Identificar fatores ligados ao abandono no primeiro ano.",
       "Comparar a evasão entre universidades públicas e privadas.",
       "Medir o impacto dos auxílios financeiros nas notas."
      ],
      "Identificar fatores ligados ao abandono no primeiro ano."
     ],
     [
      "Por que os pesquisadores optaram por uma abordagem mista?",
      [
       "Porque os números mostram padrões, mas não os explicam.",
       "Porque não conseguiram acesso aos registros acadêmicos completos.",
       "Porque as entrevistas eram mais baratas que as estatísticas.",
       "Porque o ministério exigia dois tipos de dados."
      ],
      "Porque os números mostram padrões, mas não os explicam."
     ],
     [
      "Segundo o relatório, qual obstáculo costuma ser subestimado pelas instituições?",
      [
       "O custo do transporte até a universidade.",
       "A adaptação às exigências da cultura acadêmica.",
       "A falta de vagas nas disciplinas introdutórias oferecidas no primeiro semestre.",
       "O excesso de atividades extracurriculares."
      ],
      "A adaptação às exigências da cultura acadêmica."
     ],
     [
      "A possível existência de “viés” refere-se ao fato de que:",
      [
       "os pesquisadores conheciam pessoalmente os entrevistados.",
       "quem aceitou a entrevista talvez tivesse uma visão menos crítica da universidade.",
       "os registros acadêmicos continham erros de digitação.",
       "a amostra incluía apenas estudantes de cálculo."
      ],
      "quem aceitou a entrevista talvez tivesse uma visão menos crítica da universidade."
     ],
     [
      "Qual recomendação responde mais diretamente ao isolamento dos calouros?",
      [
       "A ampliação dos auxílios estudantis.",
       "A reformulação das disciplinas de cálculo.",
       "O acolhimento com veteranos como mentores.",
       "O acompanhamento da frequência às aulas e do desempenho nas primeiras provas."
      ],
      "O acolhimento com veteranos como mentores."
     ]
    ],
    "vf": [
     [
      "O estudo analisou dados de várias universidades federais.",
      "falso"
     ],
     [
      "Os abandonos concentraram-se no segundo semestre.",
      "verdadeiro"
     ],
     [
      "O relatório considera os auxílios financeiros irrelevantes para a permanência.",
      "falso"
     ],
     [
      "Poucos entrevistados recorreram à monitoria.",
      "verdadeiro"
     ],
     [
      "A pesquisa foi financiada pelo governo estadual.",
      "não se diz"
     ]
    ],
    "hunt": {
     "label": "Tocá los sustantivos que nominalizan una acción (evasão, análise, identificação…)",
     "targets": [
      "evasão",
      "análise",
      "realização",
      "identificação",
      "interpretação",
      "conciliação",
      "reprovação",
      "concessão",
      "ampliação",
      "implementação",
      "fortalecimento",
      "acompanhamento"
     ]
    }
   },
   "ascolto": {
    "title": "O capítulo que precisa de outro registro",
    "genre": "reunião de orientação acadêmica",
    "es": "Una profesora se reúne con su tesista de maestría para comentar el primer capítulo que él le mandó y cómo mejorar la escritura.",
    "speakers": [
     "Profª Regina, orientadora",
     "Vítor, mestrando"
    ],
    "turns": [
     [
      "A",
      "Vítor, entra, senta. Eu li o capítulo que você me mandou. Tem coisa muito boa ali, mas a gente precisa conversar sobre o texto."
     ],
     [
      "B",
      "Pode falar, professora. Eu imaginei que ia ter bastante correção."
     ],
     [
      "A",
      "Não é tanto de conteúdo, é de registro. Olha esse trecho aqui: a gente foi nas escolas e viu que os professores não usavam muito o laboratório porque ninguém ensinou eles. O dado é ótimo. Mas isso é fala, não é texto acadêmico."
     ],
     [
      "B",
      "É, relendo agora eu percebo. Eu escrevi meio no embalo, pensando em arrumar depois."
     ],
     [
      "A",
      "Normal, todo mundo faz isso no primeiro rascunho. Então vamos pensar juntos. Primeiro: quem é a gente? No relatório, a gente evita a primeira pessoa informal. Você pode usar a primeira do plural, visitamos, ou uma construção impessoal."
     ],
     [
      "B",
      "Tipo foram visitadas as escolas?"
     ],
     [
      "A",
      "Pode ser. Ou, melhor ainda, você nominaliza: as visitas às escolas revelaram a baixa utilização dos laboratórios. Percebe? O verbo usar vira utilização, e o foco passa pro fenômeno, não pra você."
     ],
     [
      "B",
      "E o porque ninguém ensinou eles?"
     ],
     [
      "A",
      "Aí tem duas coisas. Uma é gramatical: na escrita formal, é ninguém os ensinou, ou ninguém lhes ensinou isso. A outra é de argumento: você tem certeza de que é por isso? Ou é uma hipótese?"
     ],
     [
      "B",
      "Hum, é o que os professores disseram nas entrevistas. Mas, pensando bem, não dá pra afirmar que é a única causa."
     ],
     [
      "A",
      "Exato. Então você escreve algo como: os relatos dos docentes apontam a ausência de formação específica como um dos fatores explicativos. Viu como a nominalização também ajuda a ser prudente? Um dos fatores já relativiza."
     ],
     [
      "B",
      "Entendi. Só tenho um medo, professora: se eu nominalizar tudo, o texto não fica pesado, cheio de palavra terminada em ção?"
     ],
     [
      "A",
      "Ótima pergunta. Fica, sim, se exagerar. Tem texto acadêmico que é uma sequência de substantivos abstratos e ninguém entende quem fez o quê. O ideal é equilibrar. Nominaliza quando isso resume uma ação que você já explicou, ou quando quer dar destaque a um processo. E mantém os verbos quando a ação precisa de um sujeito claro."
     ],
     [
      "B",
      "Faz sentido. E o prazo? Continua sendo o fim do mês?"
     ],
     [
      "A",
      "Continua, mas eu prefiro receber uma versão revisada daqui a duas semanas, pra dar tempo de a banca ler com calma. E outra coisa: revê as referências, tem autor citado no texto que não aparece na lista final."
     ],
     [
      "B",
      "Pode deixar. Vou fazer uma revisão geral, primeiro de registro, depois das referências."
     ],
     [
      "A",
      "Perfeito. E, Vítor, não desanima. Escrever bem é reescrever. Todo mundo passa por isso, inclusive eu."
     ]
    ],
    "gloss": {
     "trecho": "fragmento",
     "relendo": "releyendo",
     "embalo": "envión, de un tirón",
     "arrumar": "arreglar",
     "rascunho": "borrador",
     "relativiza": "matiza",
     "destaque": "relieve",
     "prazo": "plazo",
     "banca": "jurado (de tesis)",
     "revê": "revisá",
     "desanima": "te desanimes"
    },
    "questions": [
     [
      "Qual é o principal problema do capítulo, segundo a orientadora?",
      [
       "O registro, muito próximo da fala.",
       "A falta de dados sobre as escolas.",
       "O excesso de citações de outros autores.",
       "A escolha do tema da pesquisa."
      ],
      "O registro, muito próximo da fala."
     ],
     [
      "Por que a orientadora sugere “as visitas às escolas revelaram…”?",
      [
       "Para deixar o texto mais curto e mais fácil de ler.",
       "Para deslocar o foco do pesquisador para o fenômeno.",
       "Para evitar repetir o nome das escolas visitadas.",
       "Para mostrar que as visitas foram feitas por outra equipe."
      ],
      "Para deslocar o foco do pesquisador para o fenômeno."
     ],
     [
      "Além do problema gramatical, o que ela aponta na frase sobre os professores?",
      [
       "A frase é longa demais para um texto acadêmico.",
       "A causa aparece como certeza, e não como hipótese.",
       "Os professores entrevistados não autorizaram a citação.",
       "O dado contradiz o que Vítor escreveu na introdução."
      ],
      "A causa aparece como certeza, e não como hipótese."
     ],
     [
      "Qual é o conselho sobre o uso da nominalização?",
      [
       "Usá-la em todas as frases para garantir a formalidade.",
       "Evitá-la, porque torna o texto pesado.",
       "Equilibrá-la, mantendo verbos quando o sujeito importa.",
       "Reservá-la apenas para a conclusão do capítulo."
      ],
      "Equilibrá-la, mantendo verbos quando o sujeito importa."
     ],
     [
      "O que a orientadora pede para daqui a duas semanas?",
      [
       "A lista de referências completa, separada do capítulo.",
       "Uma versão revisada, para a banca ler com calma.",
       "A data da defesa marcada com a secretaria do programa.",
       "Novas entrevistas com os professores das escolas."
      ],
      "Uma versão revisada, para a banca ler com calma."
     ]
    ],
    "vf": [
     [
      "A orientadora criticou sobretudo o conteúdo da pesquisa.",
      "falso"
     ],
     [
      "Há autores citados no texto que não aparecem nas referências.",
      "verdadeiro"
     ],
     [
      "Vítor pesquisa escolas de uma única cidade.",
      "não se diz"
     ],
     [
      "Vítor pretende revisar primeiro o registro e depois as referências.",
      "verdadeiro"
     ]
    ]
   },
   "compito": {
    "genre": "resumo",
    "title": "Resumo do relatório sobre evasão",
    "fonte": "lettura",
    "t": "Você é aluno(a) da disciplina de Metodologia Científica. O professor pediu que cada estudante leia o sumário executivo do relatório do NEPE sobre permanência estudantil no primeiro ano e escreva um resumo que será compartilhado com a turma no ambiente virtual da disciplina. Seu resumo deve apresentar o objetivo, a metodologia, os principais resultados, as recomendações e as limitações do estudo. Não copie frases do original: reformule as ideias com suas palavras. Use registro formal e, sempre que possível, nominalizações. Não se esqueça de dar um título ao texto. Seu resumo deve ter entre 188 e 248 palavras.",
    "es": "Resumen académico impersonal, sin opinión: objetivo, método, resultados, recomendaciones y límites. Reformulá con sustantivos (a identificação, a ampliação…) sin copiar el original.",
    "min": 188,
    "max": 248,
    "punti": [
     [
      "Objetivo del estudio",
      [
       "objetivo",
       "evasão",
       "abandono"
      ]
     ],
     [
      "Metodología",
      [
       "entrevista",
       "mista",
       "registros"
      ]
     ],
     [
      "Resultados principales",
      [
       "resultado",
       "fatores",
       "isolamento"
      ]
     ],
     [
      "Recomendaciones",
      [
       "recomend",
       "acolhimento",
       "ampliação"
      ]
     ],
     [
      "Limitaciones",
      [
       "limitaç",
       "amostra",
       "viés"
      ]
     ]
    ],
    "model": "Fatores de evasão no primeiro ano de graduação: resumo\n\nO relatório do Núcleo de Estudos sobre Permanência Estudantil (NEPE) tem como objetivo a identificação das causas do abandono de cursos no primeiro ano de graduação em uma universidade federal do Centro-Oeste. Para tanto, os pesquisadores adotaram uma abordagem mista, que associou a análise dos registros acadêmicos de aproximadamente 4.800 ingressantes à realização de 62 entrevistas em profundidade.\n\nOs resultados indicam que a evasão decorre da combinação de fatores econômicos, pedagógicos e afetivos. Destacam-se a dificuldade de conciliação entre trabalho e estudo, a reprovação em disciplinas introdutórias e o isolamento social nas primeiras semanas. O estudo aponta, ainda, o desconhecimento dos serviços de apoio pedagógico já oferecidos pela instituição.\n\nCom base nesses dados, o relatório recomenda a ampliação dos auxílios estudantis, a criação de um programa de acolhimento com mentoria de veteranos, a reformulação das disciplinas iniciais, a maior divulgação dos serviços de apoio e a implantação de um sistema de detecção precoce de estudantes em risco.\n\nPor fim, os autores reconhecem limitações, como a restrição da amostra a uma única universidade e a possibilidade de viés na seleção dos entrevistados, e sugerem a replicação do estudo em outras instituições."
   }
  },
  {
   "week": 41,
   "level": "B2+",
   "lettura": {
    "title": "O relógio da estação",
    "emoji": "🕰️",
    "genre": "conto",
    "grammar": "pretérito mais-que-perfeito simples",
    "text": "Quando Helena desceu do ônibus em Santa Rita do Pontal, o relógio da praça marcava três e dez, exatamente como marcava no dia em que ela partira, quarenta e dois anos antes. Por um instante, achou que o tempo, por alguma cortesia inexplicável, a esperara. Depois percebeu que o relógio simplesmente parara, e que ninguém se dera ao trabalho de consertá-lo.\n\nViera para o enterro do pai. A notícia chegara por telefone, numa voz de mulher que ela não reconhecera e que se apresentara como vizinha. “Seu Olavo falava muito da senhora”, dissera a voz, e Helena não soube o que responder, porque o pai, que ela soubesse, nunca falara muito de coisa alguma. Era um homem de frases curtas, que consertava relógios num balcão estreito ao lado da estação ferroviária e que, na única vez em que ela lhe pedira explicações, respondera apenas que certas coisas não se explicam, se aguentam.\n\nA casa estava como ela a deixara, ou quase. Os móveis continuavam nos mesmos lugares, embora mais escuros; as cortinas que a mãe costurara tinham perdido a cor; e na parede da sala, onde antes houvera um retrato de casamento, restava apenas um retângulo mais claro na pintura. A vizinha — chamava-se Dona Aurora e tinha a idade que a mãe teria, se não tivesse morrido tão cedo — ofereceu café e contou, sem que ninguém lhe perguntasse, que o velho tirara o retrato da parede no mesmo ano em que a filha fora embora.\n\nHelena lembrava-se bem daquele ano. Tinha dezenove anos e um namorado que o pai detestara desde o primeiro dia. Discutiram uma única vez, na cozinha, em voz baixa, porque naquela família ninguém gritava. Ele dissera que, se ela fosse para São Paulo com aquele rapaz, não precisava voltar. Ela fora. O rapaz, afinal, não durara mais que dois invernos; mas o orgulho durara quarenta e dois anos. Escrevera ao pai algumas vezes, no começo, cartas cuidadosas, sem pedidos de desculpas, e nunca recebera resposta. Concluíra, com a lógica cruel dos jovens, que ele cumprira a palavra.\n\nDepois do enterro, Dona Aurora entregou-lhe uma chave. “É da oficina”, explicou. “Ele pediu que ficasse com a senhora.” A oficina ficava ao lado da estação, que deixara de receber trens havia muito tempo. Lá dentro, o cheiro de óleo e de metal era o mesmo da infância. Sobre o balcão, dezenas de relógios de pulso esperavam donos que talvez nunca viessem buscá-los. Numa gaveta, presa por um elástico, Helena encontrou um maço de envelopes. Reconheceu a própria letra antes de reconhecer as cartas. Estavam todas abertas, lidas tantas vezes que o papel se tornara macio como tecido.\n\nEmbaixo delas havia outro maço, menor, de envelopes fechados, selados, endereçados a ela em São Paulo. Nenhum fora enviado. O primeiro tinha a data de um mês depois da partida; o último, de três semanas antes da morte. Helena não os abriu ali. Sentou-se no banco alto em que o pai passara a vida inclinado sobre engrenagens minúsculas e ficou olhando para a praça pela janela suja.\n\nFoi Dona Aurora, horas mais tarde, quem a encontrou do mesmo jeito. Helena mostrou-lhe os envelopes, e a vizinha suspirou. Contou que, anos atrás, o velho lhe confessara que escrevera muitas vezes, mas que, a cada carta, se lembrava do que dissera na cozinha e achava que não tinha o direito de voltar atrás. “Ele era assim”, concluiu. “Consertava o relógio dos outros, mas o dele parou naquele dia.”\n\nNa manhã seguinte, antes de pegar o ônibus de volta, Helena atravessou a praça com uma pequena caixa de ferramentas que encontrara na oficina. Não sabia consertar relógios; nunca aprendera, porque nunca quisera aprender o que era dele. Mas subiu a escada estreita da torre, abriu a tampa empoeirada e ficou um longo tempo diante do mecanismo, como quem lê uma carta numa língua esquecida. Quando desceu, o relógio continuava marcando três e dez. Ela olhou para cima e, pela primeira vez em quarenta e dois anos, não teve pressa.",
    "gloss": {
     "partira": "se había ido",
     "esperara": "había esperado",
     "parara": "se había parado",
     "enterro": "entierro",
     "balcão": "mostrador",
     "estreito": "angosto",
     "aguentam": "se aguantan",
     "costurara": "había cosido",
     "houvera": "había habido",
     "detestara": "había detestado",
     "rapaz": "muchacho",
     "oficina": "taller",
     "gaveta": "cajón",
     "maço": "fajo",
     "macio": "suave",
     "selados": "con estampilla",
     "engrenagens": "engranajes",
     "tampa": "tapa",
     "empoeirada": "polvorienta",
     "quisera": "había querido",
     "pressa": "apuro"
    },
    "questions": [
     [
      "No início do conto, por que o relógio da praça marca a mesma hora do dia da partida de Helena?",
      [
       "Porque o pai o ajustara para lembrar a filha.",
       "Porque estava parado e ninguém o consertara.",
       "Porque Helena chegou exatamente no mesmo horário.",
       "Porque a cidade adotara aquela hora como símbolo."
      ],
      "Porque estava parado e ninguém o consertara."
     ],
     [
      "O que revela o retângulo mais claro na parede da sala?",
      [
       "Que a mãe levara o retrato quando se mudou de casa.",
       "Que o pai tirara o retrato quando a filha foi embora.",
       "Que a casa fora pintada recentemente pela vizinha Dona Aurora.",
       "Que o retrato fora vendido depois do enterro."
      ],
      "Que o pai tirara o retrato quando a filha foi embora."
     ],
     [
      "Ao encontrar as próprias cartas na gaveta, Helena percebe que o pai:",
      [
       "nunca as abrira.",
       "as lera muitas vezes.",
       "as devolvera ao correio.",
       "as mostrara à vizinha."
      ],
      "as lera muitas vezes."
     ],
     [
      "Segundo Dona Aurora, por que o pai nunca enviara as cartas que escrevera?",
      [
       "Porque não sabia o endereço atualizado de Helena em São Paulo.",
       "Porque achava que não podia voltar atrás no que dissera.",
       "Porque tinha vergonha da própria letra e da ortografia.",
       "Porque esperava que Helena escrevesse primeiro."
      ],
      "Porque achava que não podia voltar atrás no que dissera."
     ],
     [
      "O que sugere a última frase do conto, “não teve pressa”?",
      [
       "Que Helena perdeu o ônibus de volta.",
       "Uma reconciliação com o passado e com o tempo do pai.",
       "Que Helena decidiu morar na cidade para sempre.",
       "O cansaço depois de uma noite sem dormir."
      ],
      "Uma reconciliação com o passado e com o tempo do pai."
     ]
    ],
    "vf": [
     [
      "Helena reconheceu a voz da vizinha ao telefone.",
      "falso"
     ],
     [
      "O namorado de Helena não ficou com ela por muito tempo.",
      "verdadeiro"
     ],
     [
      "Helena se casou em São Paulo.",
      "não se diz"
     ],
     [
      "Helena conseguiu consertar o relógio da praça.",
      "falso"
     ],
     [
      "A estação ao lado da oficina já não recebia trens.",
      "verdadeiro"
     ]
    ],
    "hunt": {
     "label": "Tocá los verbos en pretérito mais-que-perfeito simples (partira, dissera…)",
     "targets": [
      "partira",
      "esperara",
      "parara",
      "dissera",
      "falara",
      "respondera",
      "costurara",
      "houvera",
      "detestara",
      "escrevera",
      "cumprira",
      "quisera"
     ]
    }
   },
   "ascolto": {
    "title": "Quem conta a história?",
    "genre": "podcast literário",
    "es": "En un podcast de literatura, la conductora conversa con un profesor sobre un tiempo verbal típico de la narrativa y sobre los narradores de dos novelas brasileñas clásicas.",
    "speakers": [
     "Marina, apresentadora",
     "Rubens, professor de literatura"
    ],
    "turns": [
     [
      "A",
      "Tá no ar mais um Estante Aberta. Hoje a conversa é sobre um tempo verbal que quase ninguém usa falando, mas que aparece em tudo quanto é romance: o mais-que-perfeito. E pra isso eu convidei o professor Rubens, que dá aula de literatura brasileira. Rubens, obrigada por vir."
     ],
     [
      "B",
      "Eu é que agradeço, Marina. E olha, já começo concordando com você: na fala, ninguém diz eu fizera. A gente diz eu tinha feito. A forma simples ficou praticamente restrita à escrita, e à escrita mais cuidada."
     ],
     [
      "A",
      "Então por que os escritores continuam usando?"
     ],
     [
      "B",
      "Porque ela cria um efeito de distância, sabe? Quando o narrador diz ela partira, o leitor sente que aquilo pertence a um passado já fechado, anterior à cena que está sendo contada. É um tempo que organiza camadas de memória. E tem um ritmo, também: é mais curto que a forma composta."
     ],
     [
      "A",
      "Vamos pra um exemplo concreto. Dom Casmurro."
     ],
     [
      "B",
      "Ótimo exemplo. O Bento Santiago já está velho quando decide escrever o livro. Ele conta a infância, o amor por Capitu, o casamento, a amizade com Escobar... Tudo isso é passado. E o leitor vai percebendo que ele reconstrói esse passado pra convencer a gente de uma coisa: de que fora traído."
     ],
     [
      "A",
      "E aí entra a famosa dúvida."
     ],
     [
      "B",
      "Exato. O Machado nunca confirma. O narrador é o único que fala, e ele tem todo o interesse em apresentar a versão dele. Por isso a crítica fala tanto em narrador não confiável. E o jeito de narrar ajuda nisso: ao empilhar lembranças, ele vai transformando suspeita em fato consumado."
     ],
     [
      "A",
      "Interessante. E a Clarice? Porque em A hora da estrela o narrador também é um personagem, né?"
     ],
     [
      "B",
      "É, o Rodrigo S.M., um escritor que decide contar a história da Macabéa, uma moça alagoana, datilógrafa, que vive no Rio de Janeiro quase sem se dar conta de si mesma. Só que, diferente do Bento, o Rodrigo não esconde a manipulação. Ele fica o tempo todo hesitando, comentando a própria escrita, dizendo que não sabe bem como começar."
     ],
     [
      "A",
      "Então os dois narradores são opostos?"
     ],
     [
      "B",
      "Eu diria que são dois jeitos de lidar com o mesmo problema: quem narra tem poder sobre quem é narrado. O Bento usa esse poder pra se justificar. O Rodrigo tem consciência dele e sofre com isso. E a Macabéa, coitada, não tem voz nem pra se defender."
     ],
     [
      "A",
      "Pra fechar, professor, um conselho pra quem quer ler esses livros agora."
     ],
     [
      "B",
      "Lê desconfiando. No Dom Casmurro, pergunta sempre: quem está contando e por quê? Na Hora da estrela, presta atenção em tudo que o narrador diz sobre si mesmo. E, se aparecer um fizera no caminho, não se assusta: é só a memória trabalhando."
     ],
     [
      "A",
      "Adorei. Professor Rubens, muito obrigada."
     ]
    ],
    "gloss": {
     "estante": "biblioteca (mueble)",
     "restrita": "restringida",
     "camadas": "capas",
     "traído": "traicionado",
     "confiável": "confiable",
     "empilhar": "apilar",
     "consumado": "consumado",
     "alagoana": "de Alagoas",
     "datilógrafa": "dactilógrafa",
     "lidar": "lidiar",
     "coitada": "pobrecita",
     "assusta": "te asustes"
    },
    "questions": [
     [
      "Segundo o professor, onde o mais-que-perfeito simples ainda é usado?",
      [
       "Na fala espontânea do interior do país.",
       "Sobretudo na escrita literária e cuidada.",
       "Apenas em documentos jurídicos antigos.",
       "Nas mensagens formais de trabalho."
      ],
      "Sobretudo na escrita literária e cuidada."
     ],
     [
      "Que efeito ele atribui a esse tempo verbal na narrativa?",
      [
       "Aproximar o leitor do presente da cena.",
       "Marcar um passado anterior e já encerrado.",
       "Indicar dúvida sobre os fatos narrados.",
       "Tornar a linguagem mais popular e oral."
      ],
      "Marcar um passado anterior e já encerrado."
     ],
     [
      "Por que Bento Santiago é considerado um narrador não confiável?",
      [
       "Porque esquece partes importantes da história e se contradiz o tempo todo.",
       "Porque só a versão dele é contada, e ele quer provar que foi traído.",
       "Porque Machado confessa no prefácio que o narrador mente.",
       "Porque ele narra fatos que não presenciou."
      ],
      "Porque só a versão dele é contada, e ele quer provar que foi traído."
     ],
     [
      "Qual é a principal diferença entre Rodrigo S.M. e Bento Santiago?",
      [
       "Rodrigo é mais jovem e mais otimista.",
       "Rodrigo expõe as próprias hesitações e a manipulação.",
       "Rodrigo conta a própria vida, e não a de outra pessoa.",
       "Rodrigo narra no presente, e não no passado."
      ],
      "Rodrigo expõe as próprias hesitações e a manipulação."
     ],
     [
      "Qual conselho final o professor dá aos leitores?",
      [
       "Ler primeiro um resumo de cada romance antes de começar.",
       "Ler com atenção a quem narra e às suas intenções.",
       "Evitar livros com muitos tempos verbais difíceis.",
       "Começar pela Hora da estrela, que é um livro mais curto."
      ],
      "Ler com atenção a quem narra e às suas intenções."
     ]
    ],
    "vf": [
     [
      "O professor diz que, na fala, se prefere “tinha feito” a “fizera”.",
      "verdadeiro"
     ],
     [
      "Segundo o professor, Machado confirma no fim do livro a traição de Capitu.",
      "falso"
     ],
     [
      "Macabéa trabalha como datilógrafa.",
      "verdadeiro"
     ],
     [
      "O professor Rubens já publicou um livro sobre Clarice Lispector.",
      "não se diz"
     ]
    ]
   },
   "compito": {
    "genre": "resenha",
    "title": "Resenha do conto “O relógio da estação”",
    "fonte": "lettura",
    "t": "Você colabora com o blog literário da sua universidade, que publica resenhas curtas de contos contemporâneos. Após ler o conto “O relógio da estação”, escreva uma resenha para os leitores do blog. Na resenha, apresente brevemente o enredo sem revelar todo o final, comente o papel do passado e da memória na narrativa, observe como o uso dos tempos verbais (em especial o mais-que-perfeito) contribui para esse efeito e faça uma avaliação do conto, recomendando-o ou não. Se quiser, relacione o conto com um dos romances comentados no podcast Estante Aberta. Não se esqueça de dar um título à resenha. Use registro semiformal. Seu texto deve ter entre 193 e 253 palavras.",
    "es": "Reseña con título: resumí la trama sin spoilear todo, analizá la memoria y el uso del mais-que-perfeito y cerrá con una valoración. Podés usar formas como “rompera”, “acreditara”.",
    "min": 193,
    "max": 253,
    "punti": [
     [
      "Presentar la trama (Helena, el padre, el reloj)",
      [
       "helena",
       "pai",
       "relógio"
      ]
     ],
     [
      "Comentar el papel del pasado y la memoria",
      [
       "passado",
       "memória",
       "lembran"
      ]
     ],
     [
      "Observar los tiempos verbales",
      [
       "mais-que-perfeito",
       "tempo verbal",
       "verbo"
      ]
     ],
     [
      "Evaluar y recomendar (o no)",
      [
       "recomendo",
       "vale a pena",
       "leitura"
      ]
     ]
    ],
    "model": "Um relógio parado e quarenta e dois anos de silêncio\n\n“O relógio da estação” é um conto breve que trata de um tema universal: o orgulho que separa pais e filhos. Helena, uma mulher de sessenta e poucos anos, volta à pequena cidade onde nasceu para o enterro do pai, com quem rompera aos dezenove anos. Ao receber a chave da antiga oficina de relógios, ela descobre objetos que a obrigam a rever tudo o que acreditara sobre aquela ruptura.\n\nO grande mérito do texto está na maneira como o passado invade o presente. Quase toda a história da família é contada por meio do mais-que-perfeito simples — “partira”, “dissera”, “escrevera” —, tempo verbal pouco usado na fala, mas que aqui cria camadas de memória e reforça a sensação de que tudo já estava decidido antes de a protagonista chegar. O relógio da praça, parado há décadas, funciona como símbolo dessa vida congelada.\n\nComo em Dom Casmurro, comentado recentemente no podcast Estante Aberta, o leitor percebe que a versão de uma única pessoa nunca é a história completa. Aqui, porém, a revelação não nasce da desconfiança, e sim da ternura.\n\nTalvez o desfecho pareça um pouco previsível para leitores experientes, mas a delicadeza da linguagem compensa. Recomendo a leitura a quem gosta de narrativas curtas, silenciosas e profundamente humanas."
   }
  },
  {
   "week": 42,
   "level": "B2+",
   "lettura": {
    "title": "A feira mudou de rua",
    "emoji": "🥬",
    "genre": "crônica",
    "grammar": "orações reduzidas de gerúndio, particípio e infinitivo",
    "text": "A notícia saiu numa quinta-feira, espremida entre um acidente na marginal e a previsão de chuva: “Feira livre da Rua das Acácias será transferida para avenida vizinha”. Lida assim, parecia apenas mais uma decisão administrativa, dessas que ninguém comenta. Terminada a leitura, fechei o jornal e fui fazer café. Mas a frase ficou comigo o dia inteiro, zumbindo como mosca em janela fechada.\n\nMoro nesta rua há dezoito anos. Chegando aqui, recém-casado, descobri que as quartas-feiras tinham um som próprio: o estalo dos ferros das barracas sendo montadas às cinco da manhã, o grito do homem do pastel anunciando a primeira fornada, a discussão diária entre a dona da banca de flores e o feirante das bananas sobre quem invadira o espaço de quem. Acordando com aquele barulho, eu reclamava nos primeiros meses. Depois passei a esperar por ele, e hoje, confesso, durmo mal nas terças, ansioso por ouvi-lo.\n\nSegundo a nota oficial, a mudança atende a pedidos de moradores. Pedidos de quem, não se sabe. Perguntando aqui e ali, não encontrei ninguém que tivesse assinado abaixo-assinado algum. Encontrei, isso sim, o seu Tadashi, que vende verduras na mesma esquina desde antes de eu nascer e que, sabendo da transferência pelo sobrinho, passou a noite fazendo contas. “Na avenida, o freguês passa de carro”, disse ele, arrumando os maços de coentro com a delicadeza de quem penteia uma criança. “Aqui ele passa a pé. Quem passa a pé para, olha, conversa. Quem passa de carro só buzina.”\n\nNa padaria, ao comentar o assunto, ouvi opiniões divididas. O síndico do prédio da esquina, dizendo-se cansado de lavar a calçada toda quarta-feira, achou a mudança excelente. Uma professora aposentada, interrompendo o síndico sem cerimônia, lembrou que foi na feira que ela conheceu o marido, quarenta anos atrás, disputando o último cacho de uva. O padeiro, prudente, preferiu não tomar partido: vende pão para os dois lados. Saí de lá convencido de que ninguém tinha pedido nada a ninguém.\n\nHá quem diga que a feira suja a rua, atrapalha o trânsito, atrai pombos. Tudo verdade. Vista de cima, por uma janela de apartamento, ela deve parecer uma desordem de lonas coloridas e caixotes empilhados. Vista de perto, porém, é outra coisa. É o lugar onde a aposentada do 302 conversa com alguém pela primeira vez na semana; onde o menino aprende, ajudando o pai, a fazer troco de cabeça; onde a moça recém-chegada da Bahia encontra o tempero que não achava em nenhum mercado. Desmontada a última barraca, fica a rua suja, é verdade. Mas fica também uma cidade um pouco menos solitária.\n\nAo ler de novo a notícia, à noite, reparei num detalhe que me escapara: a transferência seria “provisória”, enquanto durassem as obras de recapeamento da avenida — ou seja, a feira iria justamente para a rua em obras. Tentei entender a lógica e desisti. Os jornais, sendo feitos às pressas, às vezes publicam o comunicado sem perguntar nada a ninguém. Não os culpo. Culpo um pouco a mim mesmo, que li a notícia sem estranhar, como quem lê a previsão do tempo.\n\nNa quarta-feira seguinte, levantei cedo e desci. As barracas ainda estavam lá, montadas como sempre. Seu Tadashi me contou, piscando o olho, que os feirantes tinham se reunido com um vereador e que a mudança fora adiada “para estudos”. Adiada, não cancelada. Aprendi, com os anos, que nesta cidade as coisas adiadas tanto podem voltar amanhã quanto nunca mais. Por via das dúvidas, a dona das flores já afixou na barraca um cartaz escrito à mão: “Daqui não saio”.\n\nComprei coentro de que não precisava, um pastel que não devia comer e flores para ninguém em particular. Voltando para casa, carregando as sacolas, pensei que a crônica talvez sirva para isto: para ler de novo, com vagar, as notícias que passam depressa demais. Por trás de cada nota de três linhas há uma rua, uma quarta-feira, um homem arrumando verduras como quem arruma a vida. Publicada a notícia, a cidade segue. Cabe a alguém lembrar que ela não segue igual.",
    "gloss": {
     "espremida": "apretujada",
     "marginal": "autopista urbana",
     "zumbindo": "zumbando",
     "estalo": "chasquido",
     "barracas": "puestos",
     "fornada": "hornada",
     "feirante": "feriante",
     "abaixo-assinado": "petitorio",
     "coentro": "cilantro",
     "freguês": "cliente",
     "penteia": "peina",
     "buzina": "toca bocina",
     "atrapalha": "estorba, complica",
     "pombos": "palomas",
     "caixotes": "cajones",
     "troco": "vuelto",
     "tempero": "condimento",
     "recapeamento": "repavimentación",
     "vereador": "concejal",
     "adiada": "postergada",
     "vagar": "calma",
     "sacolas": "bolsas"
    },
    "questions": [
     [
      "Qual fato motiva a crônica?",
      [
       "Um acidente na marginal próxima ao bairro.",
       "A notícia da transferência da feira para outra via.",
       "O fechamento definitivo da feira da Rua das Acácias.",
       "A aposentadoria de seu Tadashi."
      ],
      "A notícia da transferência da feira para outra via."
     ],
     [
      "Por que seu Tadashi se preocupa com a mudança?",
      [
       "Porque na avenida o aluguel da barraca é mais caro.",
       "Porque na avenida se perde o contato com o freguês que passa a pé.",
       "Porque não tem carro para levar as verduras até lá.",
       "Porque o sobrinho não poderá mais ajudá-lo."
      ],
      "Porque na avenida se perde o contato com o freguês que passa a pé."
     ],
     [
      "Qual é a função do contraste entre a feira “vista de cima” e “vista de perto”?",
      [
       "Opor a aparência de desordem ao valor social da feira.",
       "Mostrar que o cronista mora num andar alto.",
       "Criticar a sujeira deixada pelos feirantes na rua.",
       "Comparar a feira com os supermercados do bairro."
      ],
      "Opor a aparência de desordem ao valor social da feira."
     ],
     [
      "Que incoerência o cronista percebe ao reler a notícia?",
      [
       "A nota oficial não tinha data de publicação nem assinatura.",
       "A feira iria para uma avenida que estaria em obras.",
       "Os moradores tinham assinado contra a mudança.",
       "A prefeitura negava ter tomado a decisão."
      ],
      "A feira iria para uma avenida que estaria em obras."
     ],
     [
      "Segundo o cronista, qual é o papel da crônica?",
      [
       "Corrigir os erros cometidos pelos jornalistas.",
       "Reler com calma o que passa depressa demais.",
       "Defender os comerciantes contra a prefeitura.",
       "Informar os leitores antes dos jornais."
      ],
      "Reler com calma o que passa depressa demais."
     ]
    ],
    "vf": [
     [
      "O cronista sempre gostou do barulho da feira.",
      "falso"
     ],
     [
      "A mudança foi adiada, mas não cancelada.",
      "verdadeiro"
     ],
     [
      "O vereador mora na Rua das Acácias.",
      "não se diz"
     ],
     [
      "Seu Tadashi soube da transferência pelo sobrinho.",
      "verdadeiro"
     ],
     [
      "A maioria dos moradores da rua apoiava a transferência.",
      "não se diz"
     ]
    ],
    "hunt": {
     "label": "Tocá los verbos que forman orações reduzidas de gerundio o participio (Terminada a leitura…, Chegando aqui…)",
     "targets": [
      "terminada",
      "chegando",
      "acordando",
      "perguntando",
      "sabendo",
      "arrumando",
      "vista",
      "ajudando",
      "desmontada",
      "sendo",
      "voltando",
      "publicada"
     ]
    }
   },
   "ascolto": {
    "title": "O Cine Glória reabre as portas",
    "genre": "reportagem ao vivo na rádio",
    "es": "En un programa matinal de radio, el conductor habla en vivo con un cronista que está en la reapertura de un viejo cine de barrio del centro de la ciudad.",
    "speakers": [
     "Rogério, apresentador",
     "Henrique, repórter"
    ],
    "turns": [
     [
      "A",
      "Bom dia, você ouve o Manhã Brasil. E hoje a gente começa com uma boa notícia, coisa rara, né? Depois de vinte e oito anos fechado, o Cine Glória, no centro da cidade, reabre as portas neste sábado. Nosso repórter Henrique está lá. Henrique, bom dia!"
     ],
     [
      "B",
      "Bom dia, Rogério! Olha, chegando aqui às sete da manhã, eu já encontrei gente na calçada. Tem uma fila pequena, mas animada, de pessoas que vieram só pra ver a fachada iluminada de novo."
     ],
     [
      "A",
      "Refresca a memória de quem é mais novo: o que aconteceu com o Glória?"
     ],
     [
      "B",
      "Então, o Glória foi inaugurado nos anos cinquenta e, durante décadas, foi o principal cinema da cidade. Com a chegada dos cinemas de shopping, o público foi diminuindo e, fechado em noventa e oito, o prédio virou depósito de uma loja de móveis. Por pouco não foi demolido."
     ],
     [
      "A",
      "E como ele foi salvo?"
     ],
     [
      "B",
      "Foi uma mobilização dos moradores, principalmente de um grupo de ex-funcionários e de estudantes de arquitetura. Tendo conseguido o tombamento do prédio, eles convenceram a prefeitura a comprar o imóvel. A reforma foi paga em parte com verba pública e em parte com uma vaquinha on-line, que juntou doações de mais de três mil pessoas."
     ],
     [
      "A",
      "Três mil pessoas! E como ficou por dentro?"
     ],
     [
      "B",
      "Rogério, ao entrar, dá um arrepio. Restauraram o teto pintado, as luminárias, até as cortinas vermelhas do palco. Mas as poltronas são novas, bem mais confortáveis, e o projetor é digital. A sala antiga tinha mil lugares; agora são quatrocentos, pra caber um café e uma pequena biblioteca de cinema no mezanino."
     ],
     [
      "A",
      "E a programação? Porque não adianta reabrir e ficar vazio."
     ],
     [
      "B",
      "É justamente essa a preocupação da gestão. A ideia é misturar filmes brasileiros, clássicos e lançamentos, com ingresso a preço popular. Às quartas, sessão gratuita pra escolas públicas. E, terminada cada sessão de domingo, vai ter debate com críticos ou com a própria equipe do filme."
     ],
     [
      "A",
      "Você conversou com alguém que frequentava o cinema antigo?"
     ],
     [
      "B",
      "Conversei com a dona Iolanda, de oitenta e dois anos, que trabalhou na bilheteria por quase vinte anos. Ela me contou, emocionada, que conheceu o marido na fila de um filme de faroeste e que chorou quando viu as portas lacradas. Hoje ela é convidada de honra e vai cortar a fita da inauguração."
     ],
     [
      "A",
      "Que bonito. E tem alguém contra?"
     ],
     [
      "B",
      "Tem, sim, algumas críticas. Um grupo de comerciantes acha que o dinheiro público deveria ter ido pra outras áreas, como a saúde. E tem quem duvide que o cinema se sustente sozinho depois do primeiro ano. A gestão responde que o espaço também vai ser alugado pra eventos, pra ajudar nas contas."
     ],
     [
      "A",
      "Henrique, e qual é o filme da reabertura?"
     ],
     [
      "B",
      "A gestão guardou segredo até agora, mas me confirmou há pouco: escolhido pelos antigos frequentadores, vai ser o mesmo clássico brasileiro que encerrou as atividades em noventa e oito, agora em cópia restaurada. Um jeito de fechar o círculo, como eles dizem."
     ],
     [
      "A",
      "Obrigado, Henrique. Aproveita a sessão por nós."
     ]
    ],
    "gloss": {
     "calçada": "vereda",
     "tombamento": "declaración de patrimonio histórico",
     "imóvel": "inmueble",
     "verba": "fondos",
     "vaquinha": "colecta",
     "arrepio": "escalofrío",
     "palco": "escenario",
     "poltronas": "butacas",
     "mezanino": "entrepiso",
     "adianta": "sirve (de algo)",
     "ingresso": "entrada",
     "bilheteria": "boletería",
     "faroeste": "western",
     "lacradas": "clausuradas",
     "fita": "cinta"
    },
    "questions": [
     [
      "Por que o Cine Glória perdeu público até fechar?",
      [
       "Por causa de um incêndio que destruiu o palco.",
       "Pela concorrência dos cinemas de shopping.",
       "Porque a prefeitura proibiu as sessões noturnas.",
       "Porque o prédio foi vendido a uma loja."
      ],
      "Pela concorrência dos cinemas de shopping."
     ],
     [
      "Como foi financiada a reforma?",
      [
       "Só com dinheiro de uma loja de móveis da região.",
       "Com verba pública e doações de milhares de pessoas.",
       "Com um empréstimo feito pelos ex-funcionários.",
       "Com a venda antecipada de ingressos para o ano todo."
      ],
      "Com verba pública e doações de milhares de pessoas."
     ],
     [
      "Por que a nova sala tem menos lugares do que a antiga?",
      [
       "Para abrir espaço para um café e uma biblioteca.",
       "Porque as normas de segurança atuais exigem corredores mais largos entre as fileiras.",
       "Porque o público atual é bem menor.",
       "Porque o projetor digital ocupa mais espaço."
      ],
      "Para abrir espaço para um café e uma biblioteca."
     ],
     [
      "Qual é a crítica de alguns comerciantes?",
      [
       "O cinema vai tirar clientes das lojas.",
       "O dinheiro público deveria ter outro destino.",
       "Os ingressos estão caros demais para o bairro.",
       "As obras atrapalharam o comércio por meses."
      ],
      "O dinheiro público deveria ter outro destino."
     ],
     [
      "O que a gestão quer dizer com “fechar o círculo”?",
      [
       "Reabrir com o mesmo filme da última sessão de 1998.",
       "Encerrar definitivamente a polêmica com os comerciantes.",
       "Terminar a reforma antes do fim do ano.",
       "Exibir apenas filmes antigos na primeira semana."
      ],
      "Reabrir com o mesmo filme da última sessão de 1998."
     ]
    ],
    "vf": [
     [
      "O prédio do cinema chegou a ser demolido.",
      "falso"
     ],
     [
      "Dona Iolanda trabalhou na bilheteria do Glória.",
      "verdadeiro"
     ],
     [
      "Os ingressos das sessões de domingo custam mais caro.",
      "não se diz"
     ],
     [
      "Às quartas há sessões gratuitas para escolas públicas.",
      "verdadeiro"
     ]
    ]
   },
   "compito": {
    "genre": "relato",
    "title": "Memórias do bairro",
    "fonte": "entrambi",
    "t": "O jornal da sua cidade abriu uma seção chamada “Memórias do bairro”, com relatos de leitores sobre lugares e hábitos que mudaram ou desapareceram. Após ler a crônica “A feira mudou de rua” e ouvir a reportagem da rádio sobre a reabertura do Cine Glória, escreva um relato para essa seção contando uma experiência sua ligada a um espaço do seu bairro que mudou ou desapareceu (uma feira, uma banca de jornal, um cinema, uma padaria…). No relato, descreva o lugar e as pessoas, conte o que aconteceu, relacione sua experiência com pelo menos um dos casos da semana e termine com uma reflexão. Use registro semiformal e procure empregar orações reduzidas de gerúndio, particípio e infinitivo. Seu texto deve ter entre 199 e 259 palavras.",
    "es": "Relato personal en pasado para la sección de un diario: un lugar de tu barrio que cambió, desapareció o volvió, conectado con la crónica o con la nota sobre el cine, con reflexión final. Usá reducidas: “chegando em casa”, “fechada a banca”, “ao passar”.",
    "min": 199,
    "max": 259,
    "punti": [
     [
      "Describir el lugar y las personas",
      [
       "banca",
       "bairro",
       "esquina",
       "rua"
      ]
     ],
     [
      "Contar qué pasó, en pasado",
      [
       "fechou",
       "desapare",
       "mudou"
      ]
     ],
     [
      "Relacionar con la crónica o el informe radial",
      [
       "feira",
       "cine",
       "crônica",
       "reportagem"
      ]
     ],
     [
      "Cerrar con una reflexión",
      [
       "hoje",
       "percebi",
       "aprendi"
      ]
     ]
    ],
    "model": "A banca do seu Arlindo\n\nDurante quase vinte anos, a esquina da minha rua teve uma banca de jornal pintada de verde. Era do seu Arlindo, um homem baixinho que conhecia cada morador pelo nome e pelo jornal que lia. Meu pai comprava ali o jornal todos os domingos e, chegando em casa, me entregava primeiro o caderno de quadrinhos, guardando para si as notícias de política.\n\nLembro que, aos dez anos, eu passava na banca voltando da escola só para olhar as revistas penduradas. Seu Arlindo fingia não ver e, terminado o movimento da tarde, às vezes me deixava ler uma inteira sentado num caixote.\n\nA banca fechou há seis anos. Aposentado o dono, ninguém quis assumir o ponto, e hoje há ali apenas um poste com cartazes de aluguel. Não houve notícia no jornal, nem despedida. Simplesmente, numa segunda-feira, as portas não abriram mais.\n\nLendo recentemente a crônica sobre a feira da Rua das Acácias e ouvindo a reportagem sobre a reabertura do Cine Glória, percebi que as duas histórias falam da mesma coisa: certos lugares não servem apenas para vender produtos ou exibir filmes, mas para criar encontros. Quando eles desaparecem, o bairro perde um pedaço da própria voz; quando voltam, é porque alguém se recusou a esquecê-los.\n\nHoje leio as notícias no celular, como quase todo mundo. Mas, ao passar por aquela esquina, ainda procuro, por reflexo, a banca verde e o sorriso do seu Arlindo."
   }
  },
  {
   "week": 43,
   "level": "B2+",
   "lettura": {
    "title": "Prezado, caro ou olá? O tom certo na correspondência formal",
    "emoji": "✉️",
    "genre": "guia prático",
    "grammar": "correspondência formal e formas de tratamento",
    "text": "Poucos gêneros textuais provocam tanta insegurança quanto a correspondência formal. Estudantes que trocam mensagens espontâneas o dia inteiro travam diante de um e-mail para a coordenação do curso; profissionais experientes hesitam antes de responder a um órgão público. A razão é compreensível: nesses textos, o tom conta tanto quanto o conteúdo. Uma saudação inadequada ou um fecho brusco podem comprometer um pedido perfeitamente legítimo.\n\nComecemos pela abertura. Em cartas e e-mails dirigidos a instituições ou a pessoas com quem não se tem intimidade, “Prezado Senhor” ou “Prezada Senhora”, seguidos do nome ou do cargo, continuam sendo a opção mais segura. “Caro” soa um pouco mais próximo e pode ser usado com colegas ou pessoas já conhecidas. Já o “Olá”, tão comum nas mensagens do dia a dia, deve ser evitado na primeira comunicação com uma instituição, sobretudo quando o objetivo é fazer uma solicitação. Quando não se sabe o nome do destinatário, fórmulas como “Prezados Senhores” ou “À Coordenação do Curso de…” resolvem o problema com elegância.\n\nAs formas de tratamento merecem atenção especial. Na tradição da correspondência oficial brasileira, usa-se “Vossa Senhoria”, abreviado como V. Sa., para a maioria das autoridades e chefias, e “Vossa Excelência” para altas autoridades dos três Poderes, como ministros, governadores e juízes; alguns órgãos simplificaram recentemente essas fórmulas, mas elas continuam muito presentes. Um detalhe gramatical costuma confundir: embora o pronome contenha “Vossa”, a concordância se faz na terceira pessoa. Escreve-se, portanto, “Vossa Senhoria receberá seu certificado”, e não “vosso certificado”. Na correspondência entre particulares e nos e-mails profissionais, contudo, o tratamento cerimonioso vem cedendo espaço a “o senhor” e “a senhora”, que mantêm a cortesia sem soar antiquados: “Gostaria de saber se o senhor poderia…”.\n\nO corpo do texto deve ser objetivo. Recomenda-se apresentar logo no primeiro parágrafo quem escreve e qual é o motivo do contato: “Sou aluna do terceiro semestre do curso de Engenharia Ambiental e venho, por meio desta, solicitar…”. Expressões como “venho por meio desta” ou “sirvo-me do presente” ainda aparecem com frequência, mas muitos especialistas consideram que podem ser substituídas por formulações mais diretas, como “Escrevo para solicitar”. Em seguida, os fatos devem ser expostos em ordem cronológica, com datas e números de protocolo, se houver. Adjetivos excessivos e desabafos emocionais tendem a enfraquecer o pedido: é mais eficaz relatar que o documento foi solicitado há quarenta dias do que afirmar que o atendimento é “uma vergonha”.\n\nO fecho também tem suas regras. Os manuais de redação oficial recomendam “Respeitosamente” para autoridades de hierarquia superior e “Atenciosamente” para as de mesma hierarquia ou inferior. Na prática, fora do serviço público, “Atenciosamente” se tornou o fecho padrão para quase todas as situações formais, e “Cordialmente” funciona bem quando já existe algum contato. Antes do fecho, é comum uma frase de cortesia que retome o pedido — “Agradeço desde já a atenção e aguardo retorno” — e, depois dele, o nome completo, o cargo ou a matrícula e, se for o caso, um telefone para contato.\n\nHá, por fim, a questão do suporte. O e-mail, por ser rápido, convida ao descuido: assunto vago, anexos esquecidos, mensagens enviadas de endereços com apelidos pouco sérios. Um bom e-mail formal tem assunto claro e específico (“Solicitação de segunda chamada – Cálculo I – Turma B”), anexos nomeados de forma compreensível e uma assinatura completa. Convém ainda reler a mensagem antes do envio, verificando nomes próprios e cargos: poucas coisas desagradam tanto quanto ver o próprio nome escrito errado. Também vale conferir se o destinatário é, de fato, a pessoa responsável pelo assunto; muitas mensagens se perdem simplesmente por terem sido enviadas ao setor errado.\n\nNada disso significa que a correspondência formal precise ser rígida ou fria. Uma carta bem escrita pode ser cordial, até calorosa, desde que respeite a distância que a situação exige. O segredo está em lembrar que, do outro lado, há uma pessoa — muitas vezes sobrecarregada — que vai ler dezenas de mensagens naquele dia. Facilitar o trabalho dela, com clareza e cortesia, é a melhor forma de conseguir o que se pede.",
    "gloss": {
     "travam": "se traban",
     "hesitam": "dudan",
     "órgão": "organismo",
     "fecho": "cierre, despedida",
     "chefias": "jefaturas",
     "juízes": "jueces",
     "antiquados": "anticuados",
     "sirvo-me": "me valgo",
     "protocolo": "número de expediente",
     "desabafos": "desahogos",
     "enfraquecer": "debilitar",
     "vergonha": "vergüenza, desastre",
     "aguardo": "espero",
     "retorno": "respuesta",
     "matrícula": "legajo",
     "suporte": "medio, soporte",
     "anexos": "adjuntos",
     "apelidos": "apodos",
     "chamada": "(segunda chamada) examen en otra fecha, para quien faltó",
     "convém": "conviene",
     "conferir": "chequear",
     "calorosa": "cálida",
     "sobrecarregada": "sobrecargada"
    },
    "questions": [
     [
      "Segundo o texto, por que a correspondência formal gera insegurança?",
      [
       "Porque exige um vocabulário técnico difícil.",
       "Porque nela o tom pesa tanto quanto o conteúdo.",
       "Porque as regras mudam a cada novo manual publicado.",
       "Porque as instituições raramente respondem."
      ],
      "Porque nela o tom pesa tanto quanto o conteúdo."
     ],
     [
      "Qual forma de abertura o texto desaconselha no primeiro contato com uma instituição?",
      [
       "“Prezado Senhor”",
       "“Caro colega”",
       "“Olá”",
       "“À Coordenação do Curso”"
      ],
      "“Olá”"
     ],
     [
      "O exemplo “Vossa Senhoria receberá seu certificado” serve para mostrar:",
      [
       "que “Vossa Senhoria” é usado apenas para juízes.",
       "a concordância em terceira pessoa com o pronome de tratamento.",
       "que o possessivo correto seria “vosso”.",
       "um caso de tratamento antiquado que deve ser evitado."
      ],
      "a concordância em terceira pessoa com o pronome de tratamento."
     ],
     [
      "Por que o autor prefere relatar que o documento foi pedido “há quarenta dias”?",
      [
       "Porque fatos objetivos fortalecem o pedido.",
       "Porque é proibido usar adjetivos em cartas formais.",
       "Porque o prazo legal de resposta é de quarenta dias.",
       "Porque a palavra “vergonha” é considerada ofensiva por lei."
      ],
      "Porque fatos objetivos fortalecem o pedido."
     ],
     [
      "Qual é a ideia central do último parágrafo?",
      [
       "A formalidade exige frieza e distância absoluta.",
       "Formalidade não impede cordialidade, e a clareza ajuda quem lê.",
       "As mensagens devem ser curtas porque ninguém as lê.",
       "É melhor telefonar do que escrever às instituições."
      ],
      "Formalidade não impede cordialidade, e a clareza ajuda quem lê."
     ]
    ],
    "vf": [
     [
      "“Respeitosamente” é recomendado para autoridades de hierarquia superior.",
      "verdadeiro"
     ],
     [
      "O texto proíbe o uso da expressão “venho por meio desta”.",
      "falso"
     ],
     [
      "O autor do guia trabalha numa coordenação universitária.",
      "não se diz"
     ],
     [
      "Fora do serviço público, “Atenciosamente” virou o fecho mais comum.",
      "verdadeiro"
     ],
     [
      "Segundo o texto, “Cordialmente” é o fecho mais adequado para escrever a um ministro.",
      "falso"
     ]
    ],
    "hunt": {
     "label": "Tocá las fórmulas de saludo, tratamiento y despedida de la correspondencia formal",
     "targets": [
      "prezado",
      "prezada",
      "prezados",
      "caro",
      "senhoria",
      "excelência",
      "senhor",
      "senhora",
      "venho",
      "respeitosamente",
      "atenciosamente",
      "cordialmente"
     ]
    }
   },
   "ascolto": {
    "title": "Cadê o meu diploma?",
    "genre": "telefonema a uma secretaria universitária",
    "es": "Una egresada de maestría llama a la secretaría de su posgrado porque su diploma se demora y lo necesita con urgencia.",
    "speakers": [
     "Anselmo, secretário",
     "Beatriz, ex-aluna"
    ],
    "turns": [
     [
      "A",
      "Secretaria de Pós-Graduação em Letras, Anselmo, bom dia."
     ],
     [
      "B",
      "Bom dia, seu Anselmo. Meu nome é Beatriz Andrade, eu defendi o mestrado em março e tô ligando por causa do meu diploma."
     ],
     [
      "A",
      "Pois não, Beatriz. Você tem o número do processo?"
     ],
     [
      "B",
      "Tenho, sim. É 2026 barra 0418. Eu dei entrada no pedido logo depois da defesa, entreguei a versão final da dissertação, a ficha catalográfica, tudo. Já se passaram quase cinco meses e até agora nenhuma notícia."
     ],
     [
      "A",
      "Deixa eu ver aqui no sistema... Olha, o seu processo tá parado na etapa de homologação. Falta a ata de defesa assinada por todos os membros da banca."
     ],
     [
      "B",
      "Mas como assim? A banca assinou no dia."
     ],
     [
      "A",
      "Assinou a ata em papel, sim. O problema é que, desde o ano passado, a universidade exige a assinatura eletrônica, e um dos membros externos, que é de outra universidade, ainda não assinou no sistema."
     ],
     [
      "B",
      "Nossa, eu não fazia ideia. Ninguém me avisou."
     ],
     [
      "A",
      "Pois é, infelizmente isso tem acontecido bastante. O sistema manda o aviso pro professor, e às vezes vai parar na caixa de spam. E, como o professor é de fora, nem sempre conhece o nosso sistema. Não é culpa sua, fica tranquila."
     ],
     [
      "B",
      "Entendi. E o que eu posso fazer? Porque, sendo bem sincera, isso tá me prejudicando. Eu fui aprovada num concurso pra professora de um instituto federal, e a posse é daqui a três semanas. Eles exigem o diploma ou, no mínimo, uma declaração de conclusão."
     ],
     [
      "A",
      "Olha, a declaração de conclusão a gente pode emitir, mas só com autorização do coordenador, já que a homologação não saiu. O ideal é você mandar uma solicitação formal por e-mail ao professor Rezende, explicando a situação e pedindo em caráter de urgência."
     ],
     [
      "B",
      "Por e-mail mesmo? Não precisa ser pelo protocolo?"
     ],
     [
      "A",
      "Pode ser por e-mail, mas com tudo bem certinho: assunto claro, número do processo, e anexa o comprovante de aprovação no concurso, com a data da posse. Ah, e escreve pro endereço institucional da coordenação, não pro e-mail pessoal dele."
     ],
     [
      "B",
      "Tá. E como eu me dirijo a ele? Prezado professor?"
     ],
     [
      "A",
      "Pode ser Prezado Professor Doutor Paulo Rezende, ou só Prezado Professor Rezende. Ele não é muito de cerimônia, mas gosta de mensagem objetiva. Diz logo no começo o que você precisa, sem rodeio."
     ],
     [
      "B",
      "Perfeito. E o membro externo da banca? Eu mesma posso entrar em contato com ele?"
     ],
     [
      "A",
      "Pode, e eu até recomendo. Com educação, claro. Explica que o processo depende da assinatura dele e manda o link do sistema. Eu também vou reenviar o aviso hoje à tarde."
     ],
     [
      "B",
      "Muito obrigada, seu Anselmo. O senhor me salvou."
     ],
     [
      "A",
      "Imagina. Se não tiver resposta até sexta, me liga de novo, que eu levo o caso pessoalmente à coordenação. E, Beatriz, parabéns pela aprovação, viu? Boa sorte no trabalho novo."
     ]
    ],
    "gloss": {
     "defendi": "defendí (la tesis)",
     "entrada": "(dar entrada) iniciar el trámite",
     "catalográfica": "(ficha catalográfica) ficha bibliográfica",
     "homologação": "aprobación oficial",
     "ata": "acta",
     "banca": "jurado (de tesis)",
     "prejudicando": "perjudicando",
     "posse": "toma de posesión (del cargo)",
     "comprovante": "comprobante",
     "certinho": "en regla",
     "rodeio": "rodeos",
     "reenviar": "volver a enviar"
    },
    "questions": [
     [
      "Por que Beatriz ligou para a secretaria?",
      [
       "Quer marcar a data da defesa do mestrado.",
       "O diploma não saiu quase cinco meses após a defesa.",
       "Perdeu o número do processo do diploma.",
       "Precisa corrigir um erro de grafia no seu nome no diploma."
      ],
      "O diploma não saiu quase cinco meses após a defesa."
     ],
     [
      "Qual é a causa do atraso?",
      [
       "A dissertação final não foi entregue.",
       "Falta a assinatura eletrônica de um membro externo.",
       "O coordenador está de férias e não pode assinar nada.",
       "A ficha catalográfica tinha erros."
      ],
      "Falta a assinatura eletrônica de um membro externo."
     ],
     [
      "Por que o caso é urgente para Beatriz?",
      [
       "Ela vai se mudar para o exterior daqui a três semanas.",
       "Precisa comprovar o mestrado para tomar posse num cargo.",
       "O prazo para retirar o diploma vai vencer.",
       "O concurso pede o diploma na inscrição, que termina amanhã."
      ],
      "Precisa comprovar o mestrado para tomar posse num cargo."
     ],
     [
      "O que Anselmo recomenda que Beatriz faça?",
      [
       "Ir pessoalmente à coordenação com a ata em papel.",
       "Enviar ao coordenador um pedido formal com o comprovante.",
       "Abrir um novo processo pelo protocolo.",
       "Esperar até sexta antes de tomar qualquer medida."
      ],
      "Enviar ao coordenador um pedido formal com o comprovante."
     ],
     [
      "Como Anselmo descreve o professor Rezende?",
      [
       "Muito formal e exigente com os títulos.",
       "Pouco cerimonioso, mas amigo de mensagens objetivas.",
       "Difícil de encontrar e lento para responder.",
       "Rigoroso com prazos e contrário a exceções."
      ],
      "Pouco cerimonioso, mas amigo de mensagens objetivas."
     ]
    ],
    "vf": [
     [
      "Beatriz defendeu o mestrado em março.",
      "verdadeiro"
     ],
     [
      "A banca não assinou a ata em papel no dia da defesa.",
      "falso"
     ],
     [
      "O professor Rezende já conhece o caso de Beatriz.",
      "não se diz"
     ],
     [
      "Anselmo vai reenviar o aviso ao membro externo.",
      "verdadeiro"
     ]
    ]
   },
   "compito": {
    "genre": "carta_formal",
    "title": "E-mail formal à coordenação do programa",
    "fonte": "entrambi",
    "t": "Você é Beatriz Andrade. Após ouvir o telefonema com a secretaria da Pós-Graduação em Letras e ler o guia “Prezado, caro ou olá?”, escreva um e-mail formal ao coordenador do programa, Prof. Dr. Paulo Rezende, solicitando em caráter de urgência a emissão de uma declaração de conclusão de mestrado. Seu e-mail deve conter assunto claro, saudação adequada, identificação, número do processo, exposição dos fatos informados pela secretaria, o pedido com a justificativa da urgência, menção ao anexo e fecho adequado com assinatura completa. Use registro formal, tratando o destinatário por “o senhor”. Seu texto deve ter entre 205 e 265 palavras.",
    "es": "Mail formal a una autoridad académica con los datos del audio (proceso, firma pendiente, fecha de toma de posesión) y las convenciones de la lectura: asunto, Prezado, “o senhor”, Atenciosamente.",
    "min": 205,
    "max": 265,
    "punti": [
     [
      "Asunto y saludo formal",
      [
       "assunto",
       "prezado"
      ]
     ],
     [
      "Identificarse y dar el número de proceso",
      [
       "0418",
       "processo"
      ]
     ],
     [
      "Exponer los hechos (firma pendiente de la banca)",
      [
       "assinatura",
       "assinou",
       "banca"
      ]
     ],
     [
      "Pedido con urgencia y adjunto",
      [
       "declaração",
       "posse",
       "anexo"
      ]
     ],
     [
      "Cierre formal",
      [
       "atenciosamente",
       "respeitosamente"
      ]
     ]
    ],
    "model": "Assunto: Solicitação urgente de declaração de conclusão de mestrado – Processo 2026/0418\n\nPrezado Professor Rezende,\n\nMeu nome é Beatriz Andrade e defendi minha dissertação de mestrado neste Programa em março deste ano. Escrevo para solicitar, em caráter de urgência, a emissão de uma declaração de conclusão de curso.\n\nLogo após a defesa, dei entrada no pedido de diploma (processo nº 2026/0418) e entreguei toda a documentação exigida. Em contato telefônico com a secretaria, fui informada de que o processo está parado na etapa de homologação, pois um dos membros externos da banca ainda não assinou eletronicamente a ata de defesa. Já escrevi ao professor em questão, a quem expliquei a situação, e aguardo sua resposta.\n\nOcorre que fui aprovada em concurso público para professora de um instituto federal, e a posse está marcada para o dia 16 de outubro. Para assumir o cargo, preciso apresentar o diploma ou, no mínimo, uma declaração de conclusão. Segundo a secretaria, esse documento pode ser emitido mediante autorização da coordenação.\n\nDiante do exposto, solicito que o senhor autorize a emissão da declaração, a fim de que eu não perca a vaga. Envio em anexo o comprovante de aprovação no concurso, no qual consta a data da posse.\n\nAgradeço desde já a atenção e coloco-me à disposição para quaisquer esclarecimentos.\n\nAtenciosamente,\n\nBeatriz Andrade\nPrograma de Pós-Graduação em Letras\nTelefone: (31) 98765-4321"
   }
  },
  {
   "week": 44,
   "level": "B2+",
   "lettura": {
    "title": "Cafezinho, golaço e sextou: a fábrica de palavras do português",
    "emoji": "🧩",
    "genre": "artigo de revista",
    "grammar": "formação de palavras",
    "text": "Numa padaria de qualquer cidade brasileira, a frase “me vê um cafezinho rapidinho?” não espanta ninguém. O cliente não quer necessariamente um café pequeno, nem está pedindo que o atendente saia correndo: está sendo gentil. O diminutivo, nesse caso, suaviza o pedido, aproxima as pessoas e revela algo que os linguistas repetem há décadas — no português do Brasil, as terminações das palavras dizem quase tanto quanto as próprias palavras.\n\nOs sufixos -inho e -zinho talvez sejam o exemplo mais famoso. Eles podem indicar tamanho (uma casinha no alto do morro), carinho (“vem cá, meu filhinho”), ironia (“que trabalhinho, hein?”) ou intensidade (“acordei cedinho”, “o pão está quentinho”). Há até diminutivos que perderam o sentido original e viraram palavras independentes: ninguém pensa em tamanho quando fala em “calcinha” ou na “folhinha” pendurada na parede da cozinha. Para a professora Helena Barros, que pesquisa morfologia numa universidade pública do Recife, o estrangeiro costuma errar menos na forma do que no tom. “O aluno aprende a dizer ‘obrigadinho’, mas não percebe que, dependendo da entonação, a palavra soa irônica”, observa.\n\nOs aumentativos seguem uma lógica parecida, só que ao contrário. Um casarão é uma casa grande, mas um golaço não é um gol comprido: é um gol bonito, digno de replay. Um filmão é um filme excelente, e um “jantarzão” é aquele jantar caprichado de domingo. Ao mesmo tempo, há aumentativos que carregam desprezo ou deboche: um narigão, um livrão chato, um “espertalhão”. Em outros casos, o sufixo -ão criou palavras novas, sem nenhuma ideia de tamanho: cartão, portão e salão têm parentesco com carta, porta e sala, mas hoje ninguém pensa neles como uma carta, uma porta ou uma sala gigantes.\n\nSe os sufixos dão cor, os prefixos costumam dar direção. O prefixo des- inverte (desfazer, desligar, descongelar), re- repete (reler, refazer, reescrever), pré- e pós- situam no tempo (pré-estreia, pós-graduação), e super-, hiper- e mega- exageram. Numa só manhã de trabalho, qualquer brasileiro pode ouvir que a reunião foi superprodutiva, que o trânsito estava hipercomplicado e que a promoção do supermercado é uma megaliquidação imperdível. Os gramáticos mais conservadores torcem o nariz para esses exageros, mas a língua não parece muito preocupada com a opinião deles.\n\nÉ justamente essa liberdade que permite ao idioma criar palavras sem pedir licença. Os sufixos -ção e -mento transformam verbos em substantivos: desmatar deu desmatamento, e lacrar, no sentido que o verbo ganhou nas redes sociais, deu lacração. O sufixo -eiro, que já nomeava ofícios antigos como padeiro e sapateiro, hoje produz concurseiro, quem passa anos estudando para concursos públicos. O -ista cria militâncias inteiras, como a do cicloativista. E a terminação -ar transforma quase qualquer palavra em verbo: printar uma conversa, zapear pelos canais, maratonar uma série. Um dos exemplos mais saborosos é sextou, forma verbal inventada a partir de “sexta-feira” para celebrar o fim da semana de trabalho. Ninguém conjuga “eu sexto, você sexta”, mas todo mundo entende o recado.\n\nAlém dos afixos, o português recorre a outros mecanismos. A composição junta duas palavras numa só: guarda-chuva, beija-flor, arranha-céu. O encurtamento, muito comum entre os jovens, corta a palavra pela metade: refrigerante vira refri, aniversário vira niver, faculdade vira facul. E há os cruzamentos, que fundem duas palavras numa terceira. O mais conhecido entre argentinos e uruguaios talvez seja portunhol, mistura de português e espanhol que muita gente fala sem admitir, especialmente nas cidades de fronteira.\n\nPara Barros, essa criatividade morfológica não é um detalhe técnico, mas uma janela para a cultura. “O diminutivo brasileiro tem muito a ver com a forma como a gente negocia a cortesia”, explica. “Pedir ‘um minutinho’ é pedir tempo sem parecer exigente. Dizer que a conta ficou ‘salgadinha’ é reclamar sem brigar.” Nesse sentido, o famoso jeitinho — ele mesmo um diminutivo — resumiria uma maneira de contornar obstáculos com flexibilidade, para o bem e para o mal.\n\nPara quem aprende português como língua estrangeira, a lição é dupla. Por um lado, conhecer os afixos mais produtivos permite adivinhar o sentido de milhares de palavras: quem sabe o que é fazer e o que significa re- entende refazer sem abrir o dicionário. Por outro, é preciso ouvir muito para captar as nuances de tom. Afinal, entre um cafezinho gentil e um trabalhinho irônico, a diferença não está no dicionário, mas no jeito de dizer.",
    "gloss": {
     "espanta": "asombra, sorprende",
     "atendente": "el que atiende, el empleado",
     "suaviza": "suaviza, ablanda",
     "morro": "cerro (donde suele haber favelas)",
     "cedinho": "tempranito",
     "calcinha": "bombacha (ropa interior femenina)",
     "folhinha": "almanaque de hojas, calendario",
     "pendurada": "colgada",
     "casarão": "caserón",
     "golaço": "golazo",
     "caprichado": "hecho con esmero",
     "desprezo": "desprecio",
     "deboche": "burla, cargada",
     "espertalhão": "vivo, avivado (en sentido negativo)",
     "portão": "portón",
     "torcem": "tuercen (torcer o nariz = poner cara de desaprobación)",
     "desmatamento": "deforestación",
     "lacração": "comentario contundente que “cierra” una discusión en redes",
     "sapateiro": "zapatero",
     "concurseiro": "quien estudia para concursos de empleo público",
     "printar": "sacar captura de pantalla",
     "zapear": "hacer zapping",
     "maratonar": "ver (una serie) de un tirón",
     "sextou": "¡llegó el viernes!",
     "recado": "mensaje",
     "salgadinha": "saladita, bastante cara",
     "brigar": "pelear",
     "contornar": "sortear, esquivar",
     "adivinhar": "adivinar",
     "beija-flor": "picaflor",
     "arranha-céu": "rascacielos",
     "niver": "cumple",
     "facul": "facu"
    },
    "questions": [
     [
      "Qual é a ideia central do artigo?",
      [
       "O uso excessivo de diminutivos empobrece o português do Brasil.",
       "Os afixos do português criam palavras e também expressam valores culturais.",
       "Os neologismos das redes sociais ameaçam seriamente a norma culta do idioma no Brasil.",
       "Os estrangeiros deveriam evitar diminutivos até o nível avançado."
      ],
      "Os afixos do português criam palavras e também expressam valores culturais."
     ],
     [
      "Segundo Helena Barros, qual é a principal dificuldade dos estrangeiros com o diminutivo?",
      [
       "Formar corretamente as terminações -inho e -zinho.",
       "Saber quando o diminutivo indica tamanho físico.",
       "Perceber o tom que ele assume em cada situação.",
       "Distinguir diminutivos de aumentativos na escrita."
      ],
      "Perceber o tom que ele assume em cada situação."
     ],
     [
      "No terceiro parágrafo, o exemplo de “golaço” serve para mostrar que o aumentativo…",
      [
       "só se usa na linguagem do futebol.",
       "costuma soar ofensivo no Brasil, sobretudo entre desconhecidos.",
       "é menos frequente que o diminutivo.",
       "pode avaliar positivamente, sem falar de tamanho."
      ],
      "pode avaliar positivamente, sem falar de tamanho."
     ],
     [
      "A expressão “torcem o nariz” indica que os gramáticos conservadores…",
      [
       "veem esses exageros com desaprovação.",
       "usam esses prefixos com frequência.",
       "desconhecem a origem desses prefixos.",
       "consideram esses exageros inevitáveis."
      ],
      "veem esses exageros com desaprovação."
     ],
     [
      "Por que o texto menciona a forma “sextou”?",
      [
       "Para criticar a influência das redes sociais na linguagem usada no ambiente de trabalho.",
       "Para mostrar um verbo novo, de uso limitado, mas compreendido por todos.",
       "Para exemplificar um sufixo que forma nomes de profissões.",
       "Para provar que todo verbo novo ganha conjugação completa."
      ],
      "Para mostrar um verbo novo, de uso limitado, mas compreendido por todos."
     ]
    ],
    "vf": [
     [
      "Quem pede “um cafezinho rapidinho” quer, necessariamente, um café pequeno.",
      "falso"
     ],
     [
      "Palavras como “portão” e “salão” já não transmitem a ideia de tamanho grande.",
      "verdadeiro"
     ],
     [
      "Helena Barros já morou fora do Brasil.",
      "não se diz"
     ],
     [
      "Segundo o texto, o sufixo -eiro deixou de formar palavras novas.",
      "falso"
     ],
     [
      "Para a pesquisadora, o diminutivo permite pedir e reclamar sem confronto.",
      "verdadeiro"
     ]
    ],
    "hunt": {
     "label": "Tocá las palabras formadas con sufijos o prefijos (diminutivos, aumentativos, des-, re-, super-, -mento…)",
     "targets": [
      "cafezinho",
      "rapidinho",
      "casinha",
      "golaço",
      "casarão",
      "desfazer",
      "reescrever",
      "superprodutiva",
      "desmatamento",
      "concurseiro",
      "cicloativista",
      "maratonar"
     ]
    }
   },
   "ascolto": {
    "title": "Dudu, Val e Paulão: o Brasil dos apelidos",
    "genre": "podcast",
    "es": "En un podcast sobre la lengua, la conductora conversa con un profesor de portugués para extranjeros a partir del mensaje de una oyente colombiana que recibió varios apodos en su nuevo trabajo.",
    "speakers": [
     "Marina (apresentadora)",
     "Tiago (professor)"
    ],
    "turns": [
     [
      "A",
      "Olá, olá! Está começando mais um Língua Solta, o podcast sobre as palavras que a gente usa sem pensar. Hoje eu recebo o Tiago Moura, professor de português para estrangeiros aqui em São Paulo. Tiago, tudo bem?"
     ],
     [
      "B",
      "Tudo ótimo, Marina. Obrigado pelo convite."
     ],
     [
      "A",
      "Então, a gente recebeu uma mensagem de uma ouvinte colombiana, a Valentina, que ficou meio chocada no primeiro dia de trabalho. Em duas horas ela virou Val, Valzinha e, olha, até Tina. Ela quer saber se isso é normal."
     ],
     [
      "B",
      "É normalíssimo! Olha, o brasileiro tem uma verdadeira mania de mexer nos nomes. Basicamente, a gente faz três coisas. A primeira é encurtar: Fernanda vira Nanda, Gabriela vira Gabi, Rafael vira Rafa. A segunda é duplicar uma sílaba, tipo Juju, Dudu, Lulu. E a terceira é acrescentar sufixos, né? O inho, o ão, e por aí vai."
     ],
     [
      "A",
      "Espera, deixa eu entender. Dudu vem de onde?"
     ],
     [
      "B",
      "De Eduardo. É uma forma bem de criança, sabe? Muitas vezes o apelido nasce em casa, quando o irmão mais novo não consegue pronunciar o nome inteiro, e aí fica para a vida toda. Tem advogado de cinquenta anos que ainda é Dudu para a família inteira."
     ],
     [
      "A",
      "E no trabalho? Porque a Valentina ficou sem saber se era falta de respeito."
     ],
     [
      "B",
      "Pelo contrário. Na maioria das vezes, é sinal de que ela foi aceita no grupo. No Brasil, chamar alguém pelo apelido é um jeito de dizer, digamos, você é dos nossos. Agora, claro, tem limites. Com o diretor, com um cliente que você acabou de conhecer, o melhor é esperar. Se a própria pessoa se apresenta como Beto, tudo bem. Se ela se apresenta como Roberto Almeida, ela está te dizendo alguma coisa."
     ],
     [
      "A",
      "Faz sentido. E o aumentativo? Porque eu tenho um colega que todo mundo chama de Paulão, e o homem é baixinho!"
     ],
     [
      "B",
      "Esse exemplo é ótimo, porque mostra que o aumentativo nem sempre fala de tamanho. Paulão pode ser o cara grandão, sim, mas pode ser simplesmente o Paulo querido, o Paulo parceiro. Às vezes é até brincadeira justamente porque ele é baixinho. É uma ironia carinhosa, sabe?"
     ],
     [
      "A",
      "Ironia carinhosa, gostei. E tem diferença entre homens e mulheres nisso?"
     ],
     [
      "B",
      "Tem uma tendência, pelo menos. O ão aparece mais em apelidos masculinos: Paulão, Marcão, Zezão. Com mulheres, o mais comum é o diminutivo: Aninha, Carolzinha. Mas isso está mudando. Eu tenho uma amiga que adora ser chamada de Fernandona, por exemplo."
     ],
     [
      "A",
      "E para quem é de fora, qual é o conselho? Porque imagino que tenha gente que não gosta."
     ],
     [
      "B",
      "O conselho é: se incomodar, diga com leveza. Algo como: prefiro que me chamem de Valentina mesmo. Ninguém vai se ofender. Mas eu diria para ela experimentar um pouco antes. Muitos alunos meus contam que, no começo, estranharam, e depois sentiram falta quando voltaram para casa. Um aluno alemão me escreveu uma vez: no Brasil eu era o Klausinho, aqui eu sou só o senhor Weber."
     ],
     [
      "A",
      "Que coisa! Bom, Valentina, acho que você já tem a sua resposta. Tiago, muito obrigada."
     ],
     [
      "B",
      "Eu que agradeço, Marina. E um beijo para a Val!"
     ]
    ],
    "gloss": {
     "mexer": "meterse con, tocar",
     "encurtar": "acortar",
     "acrescentar": "agregar",
     "apelido": "apodo",
     "baixinho": "petiso",
     "grandão": "grandote",
     "parceiro": "compañero, compinche",
     "brincadeira": "broma, chiste",
     "incomodar": "molestar",
     "leveza": "liviandad, buena onda",
     "estranharam": "les resultó raro",
     "falta": "(sentir falta) extrañar"
    },
    "questions": [
     [
      "Por que a ouvinte Valentina escreveu para o podcast?",
      [
       "Porque queria sugerir um apelido para um colega.",
       "Porque não sabia como interpretar os apelidos que recebeu.",
       "Porque um colega se ofendeu com o apelido que ela usou numa reunião.",
       "Porque não conseguia pronunciar os nomes dos colegas."
      ],
      "Porque não sabia como interpretar os apelidos que recebeu."
     ],
     [
      "Segundo Tiago, o apelido “Dudu” é um exemplo de…",
      [
       "duplicação de sílaba, típica da fala infantil.",
       "encurtamento muito comum entre colegas no ambiente de trabalho.",
       "aumentativo usado com ironia.",
       "sufixo que indica respeito."
      ],
      "duplicação de sílaba, típica da fala infantil."
     ],
     [
      "O que Tiago recomenda em relação a diretores e clientes novos?",
      [
       "Usar logo o apelido para criar proximidade.",
       "Evitar até mesmo o primeiro nome deles.",
       "Perguntar diretamente qual apelido preferem.",
       "Esperar para ver como a pessoa se apresenta."
      ],
      "Esperar para ver como a pessoa se apresenta."
     ],
     [
      "No caso do colega baixinho, o apelido “Paulão” serve para…",
      [
       "destacar o porte físico do colega.",
       "expressar afeto com uma dose de ironia.",
       "indicar que ele é o chefe do setor.",
       "diferenciá-lo de outro Paulo, mais jovem, da mesma equipe."
      ],
      "expressar afeto com uma dose de ironia."
     ],
     [
      "A história do aluno alemão sugere que…",
      [
       "os estrangeiros costumam rejeitar os apelidos.",
       "na Alemanha também se usam muitos diminutivos.",
       "o apelido pode deixar saudade de um trato mais caloroso.",
       "ele preferia ser chamado de senhor no Brasil."
      ],
      "o apelido pode deixar saudade de um trato mais caloroso."
     ]
    ],
    "vf": [
     [
      "Tiago dá aulas de português para estrangeiros em São Paulo.",
      "verdadeiro"
     ],
     [
      "Para Tiago, apelidos no trabalho costumam indicar falta de respeito.",
      "falso"
     ],
     [
      "Valentina já decidiu pedir aos colegas que usem o nome completo dela.",
      "não se diz"
     ],
     [
      "Segundo Tiago, o ão aparece mais em apelidos femininos.",
      "falso"
     ]
    ]
   },
   "compito": {
    "genre": "email_informal",
    "title": "Luzinha ou Lucião?",
    "fonte": "ascolto",
    "t": "Você é argentino(a) e mora em São Paulo há três anos. Sua prima Lucía acaba de começar a trabalhar numa empresa em Curitiba e lhe escreveu contando que os colegas a chamam de “Lu”, “Luzinha” e até de “Lucião”, e que ela não sabe se deve se sentir ofendida. Após ouvir o episódio do podcast Língua Solta, escreva um e-mail para a sua prima explicando, com base no que diz o professor Tiago, como os brasileiros formam e usam os apelidos, o que significam o diminutivo e o aumentativo nesses casos e em que situações convém ter cuidado. Dê a ela um conselho. Não se esqueça de usar exemplos do episódio. Registro informal. Seu texto deve ter entre 210 e 270 palavras.",
    "es": "Mail informal a tu prima: explicá con ejemplos del podcast cómo se forman los apodos, qué valor tienen el diminutivo y el aumentativo, y aconsejala. Cuidá el tono cercano (saludo y despedida informales).",
    "min": 210,
    "max": 270,
    "punti": [
     [
      "Explicar cómo se forman los apodos (acortar, duplicar sílabas, sufijos)",
      [
       "encurt",
       "duplic",
       "sílaba",
       "sufixo"
      ]
     ],
     [
      "Interpretar el diminutivo y el aumentativo con ejemplos del podcast",
      [
       "paulão",
       "carinho",
       "aumentativo",
       "diminutivo"
      ]
     ],
     [
      "Tranquilizarla: el apodo suele indicar aceptación, con límites (jefes, clientes)",
      [
       "aceit",
       "respeito",
       "cliente",
       "chefe"
      ]
     ],
     [
      "Dar un consejo y cerrar con tono informal",
      [
       "conselho",
       "beijo",
       "abraço"
      ]
     ]
    ],
    "model": "Oi, Lu! (Ou Luzinha? Ou Lucião?)\n\nAdorei receber notícias suas! Ri sozinho com a sua mensagem, mas entendo o susto. Por coincidência, ontem ouvi um episódio do podcast Língua Solta que falava exatamente disso, então vou te contar o que aprendi.\n\nO professor entrevistado, o Tiago, explicou que o brasileiro tem mania de mexer nos nomes. Basicamente, a gente encurta (Gabriela vira Gabi, Rafael vira Rafa), duplica uma sílaba, como em Dudu ou Juju, e acrescenta sufixos. O diminutivo, tipo Luzinha, quase sempre é carinho. E o aumentativo nem sempre fala de tamanho: ele contou de um colega baixinho que todo mundo chama de Paulão, por pura ironia carinhosa. Ou seja, o seu “Lucião” provavelmente quer dizer que você já é querida no escritório, e não que alguém te acha grandona.\n\nSegundo ele, receber um apelido no trabalho costuma ser sinal de que você foi aceita no grupo, e não falta de respeito. Só com chefes e com clientes que a gente acabou de conhecer é melhor esperar e ver como a pessoa se apresenta.\n\nMeu conselho? Relaxa e experimenta um pouquinho. Se algum apelido realmente te incomodar, fala com leveza, algo como “prefiro que me chamem de Lucía mesmo”. Ninguém vai se ofender. Aliás, o Tiago contou que muitos estrangeiros sentem falta dos apelidos quando voltam para casa, então aproveita!\n\nMe conta como está a vida em Curitiba. Já sobreviveu ao frio de lá?\n\nUm beijo enorme,\nMartín"
   }
  },
  {
   "week": 45,
   "level": "C1",
   "lettura": {
    "title": "Esquisito é o polvo",
    "emoji": "🐙",
    "genre": "crônica",
    "grammar": "falsos amigos e heterossemânticos",
    "text": "Na minha primeira semana em São Paulo, fui convidada para jantar na casa de uma colega do escritório. Levei um vinho de Mendoza, elogiei a vista da varanda e, quando chegou o prato principal, resolvi caprichar no português: “Que comida esquisita!”. Houve um silêncio breve, desses que parecem durar um século. A anfitriã sorriu com educação e perguntou se eu preferia que ela preparasse outra coisa. Só no dia seguinte, conversando com o porteiro do prédio, descobri que esquisito, em português, não quer dizer delicioso: quer dizer estranho, bizarro, suspeito. Eu tinha acabado de chamar de bizarro o polvo mais bem-feito da minha vida.\n\nOs linguistas chamam essas armadilhas de falsos amigos ou, quando a semelhança engana de forma mais sistemática, de heterossemânticos: palavras quase idênticas na forma, mas com significados diferentes em duas línguas vizinhas. Entre o espanhol e o português, elas são tantas que um professor meu garantia que daria para escrever um romance inteiro só com elas. Não duvido. Nos meus primeiros meses no Brasil, colecionei mal-entendidos como quem coleciona figurinhas da Copa.\n\nTeve o dia em que pedi uma borracha na papelaria e fiquei esperando, com um sorriso nervoso, que o vendedor não pensasse que eu estava procurando alguma mulher embriagada. Borracha, aqui, é aquilo que apaga o lápis — e também o material de que são feitos os pneus. Quem bebeu demais é bêbado. Teve também a vez em que, exausta, disse a uma amiga que precisava passar na oficina antes das nove, e ela me perguntou, preocupada, o que tinha acontecido com o meu carro. Oficina, em português, é onde se conserta automóvel. O lugar onde eu passava oito horas por dia, com computador e ar-condicionado, se chama escritório. E escritório, para completar a confusão, não é o móvel onde escrevo estas linhas: esse é a escrivaninha.\n\nCom o tempo, percebi que os falsos amigos não são só uma questão de vocabulário, mas de convivência. Quando me pediram o apelido para colocar no crachá, respondi com o sobrenome do meu pai. O pessoal do RH riu, e só depois entendi que queriam saber como eu gostaria de ser chamada, e não como a minha família se chama. Desde então, sou a Pati para metade do prédio. Com outras palavras, o risco é maior. Perguntar a uma colega se ela está embaraçada, querendo saber se está grávida, pode deixá-la de fato embaraçada — isto é, constrangida. E pedir um vaso de água num restaurante rende, no mínimo, um olhar curioso do garçom, porque o que se pede é um copo; o vaso fica na sala, com flores dentro, ou no banheiro, com outra função.\n\nHá falsos amigos ainda mais traiçoeiros, porque o sentido não é totalmente diferente, só um pouco deslocado. Uma camiseta larga, em português, é folgada, não comprida; uma avenida larga é uma avenida ampla. A palavra propina, que no meu país é o dinheiro que deixamos para o garçom, aqui significa suborno, e usá-la no restaurante pode causar bem mais do que um mal-entendido: pode gerar um escândalo. E o verbo brincar, que para mim sempre foi sinônimo de pular, aqui é o que as crianças fazem no parquinho e o que os adultos fazem quando não estão falando sério.\n\nO caminho inverso, aliás, também tem as suas pegadinhas. Uma amiga carioca que passou uma temporada em Buenos Aires me contou que, logo na primeira semana, ouviu uma vendedora dizer que o vestido que ela experimentava era “exquisito” e saiu da loja ofendida, convencida de que tinha levado uma crítica disfarçada. Dias depois, num restaurante de San Telmo, pediu polvo com toda a confiança do mundo, e o garçom perguntou, muito sério, se ela queria mesmo um prato de poeira. Ela jura que nunca mais pediu frutos do mar sem apontar para o cardápio.\n\nHoje, quase quatro anos depois, erro menos, mas continuo prestando atenção. Aprendi a desconfiar justamente das palavras que parecem fáceis demais. Um amigo, professor de português para estrangeiros, costuma dizer que o maior perigo, para quem fala espanhol, não é o português que a gente não entende, mas o português que a gente acha que entende. Concordo. As palavras desconhecidas nos obrigam a perguntar; as conhecidas demais nos deixam distraídos.\n\nE acrescento: vale a pena rir dos próprios tropeços. Foi graças a eles que fiz amizade com a colega do jantar, que hoje é uma das minhas melhores amigas em São Paulo. Até hoje, quando ela cozinha polvo, me manda uma foto com a mesma legenda: “Olha só que esquisito”.",
    "gloss": {
     "caprichar": "esmerarse",
     "anfitriã": "anfitriona",
     "esquisito": "raro, extraño",
     "polvo": "pulpo",
     "armadilhas": "trampas",
     "figurinhas": "figuritas",
     "borracha": "goma de borrar; caucho",
     "embriagada": "borracha, ebria",
     "apaga": "borra",
     "pneus": "neumáticos",
     "bêbado": "borracho",
     "oficina": "taller mecánico",
     "conserta": "arregla",
     "escritório": "oficina",
     "escrivaninha": "escritorio (mueble)",
     "apelido": "apodo",
     "crachá": "credencial (tarjeta con el nombre)",
     "sobrenome": "apellido",
     "embaraçada": "avergonzada, incómoda",
     "grávida": "embarazada",
     "constrangida": "incómoda, avergonzada",
     "vaso": "florero, maceta; inodoro",
     "copo": "vaso",
     "garçom": "mozo",
     "traiçoeiros": "traicioneros",
     "larga": "ancha",
     "folgada": "holgada, suelta",
     "propina": "coima",
     "suborno": "soborno, coima",
     "brincar": "jugar; bromear",
     "pular": "saltar",
     "parquinho": "plaza de juegos",
     "tropeços": "tropiezos",
     "legenda": "epígrafe, texto al pie",
     "pegadinhas": "trampitas, cáscaras de banana",
     "poeira": "polvo, tierra",
     "cardápio": "menú, carta"
    },
    "questions": [
     [
      "Qual é o tom predominante da crônica?",
      [
       "Irritado e queixoso.",
       "Bem-humorado e autocrítico.",
       "Técnico e impessoal.",
       "Nostálgico e melancólico."
      ],
      "Bem-humorado e autocrítico."
     ],
     [
      "Por que houve silêncio durante o jantar?",
      [
       "A anfitriã não tinha gostado do vinho que a narradora levou.",
       "A narradora recusou educadamente o prato principal.",
       "A narradora fez um elogio que soou como crítica.",
       "O polvo servido tinha ficado realmente estranho."
      ],
      "A narradora fez um elogio que soou como crítica."
     ],
     [
      "Segundo o texto, o que distingue os heterossemânticos?",
      [
       "Têm a mesma escrita, mas pronúncias muito diferentes.",
       "Existem apenas entre o espanhol e o português.",
       "São palavras antigas, que já caíram em desuso nas duas línguas.",
       "Enganam de maneira mais sistemática."
      ],
      "Enganam de maneira mais sistemática."
     ],
     [
      "O episódio do crachá mostra que a narradora…",
      [
       "confundiu o apelido com o sobrenome.",
       "não quis revelar o seu nome verdadeiro.",
       "já tinha um apelido desde a infância.",
       "preferia ser chamada pelo sobrenome do pai."
      ],
      "confundiu o apelido com o sobrenome."
     ],
     [
      "Com a frase do amigo professor, a narradora sugere que…",
      [
       "o português é, no fundo, mais difícil que o espanhol.",
       "a falsa sensação de compreensão é o maior risco.",
       "os professores costumam exagerar os perigos da língua.",
       "é melhor evitar as palavras parecidas com o espanhol."
      ],
      "a falsa sensação de compreensão é o maior risco."
     ]
    ],
    "vf": [
     [
      "Quando chegou a São Paulo, a narradora trabalhava num escritório.",
      "verdadeiro"
     ],
     [
      "Segundo a narradora, no Brasil, “propina” é o dinheiro deixado para o garçom.",
      "falso"
     ],
     [
      "A narradora pretende voltar a morar na Argentina.",
      "não se diz"
     ],
     [
      "A colega do jantar se tornou uma grande amiga da narradora.",
      "verdadeiro"
     ],
     [
      "Em português, “escritório” designa o móvel onde se escreve.",
      "falso"
     ]
    ],
    "hunt": {
     "label": "Tocá los falsos amigos del español (palabras que parecen iguales pero significan otra cosa)",
     "targets": [
      "esquisito",
      "polvo",
      "borracha",
      "oficina",
      "escritório",
      "apelido",
      "embaraçada",
      "vaso",
      "larga",
      "propina",
      "brincar"
     ]
    }
   },
   "ascolto": {
    "title": "Convidei ela para uma cena",
    "genre": "programa de rádio com participação de ouvintes",
    "es": "En un programa de radio de consultas sobre la lengua, la conductora atiende el llamado de un oyente uruguayo que vive en Porto Alegre y cuenta sus problemas con palabras parecidas al español.",
    "speakers": [
     "Carla (apresentadora)",
     "Diego (ouvinte)"
    ],
    "turns": [
     [
      "A",
      "Boa tarde! Está no ar o Tira-Dúvidas, o programa em que você liga e a gente resolve aquela dúvida de português que não te deixa dormir. O nosso primeiro ouvinte de hoje é o Diego, que liga de Porto Alegre. Boa tarde, Diego!"
     ],
     [
      "B",
      "Boa tarde, Carla! Nossa, que emoção falar com você. Eu ouço o programa toda semana."
     ],
     [
      "A",
      "Que bom! Me conta, qual é a sua dúvida?"
     ],
     [
      "B",
      "Então, eu sou uruguaio, de Montevidéu, e moro aqui há uns oito meses. Meu português já está razoável, sabe, mas eu vivo caindo em armadilhas. E eu queria saber se existe algum jeito de evitar isso, porque eu já passei cada vergonha…"
     ],
     [
      "A",
      "Conta uma, para os ouvintes entenderem do que a gente está falando."
     ],
     [
      "B",
      "Olha, a pior foi no primeiro mês. Eu conheci uma moça no trabalho e convidei ela para uma cena. Achei que estava convidando para jantar, né? E ela respondeu toda animada: adoro teatro, que peça a gente vai ver?"
     ],
     [
      "A",
      "Clássico! Porque cena, em português, é um trecho de um filme, de uma novela ou de uma peça. O que vocês chamam de cena, aqui é jantar. E aí, deu certo?"
     ],
     [
      "B",
      "Deu, deu. A gente riu muito e acabou jantando mesmo. Mas teve outras. No supermercado, eu perguntei onde ficava o aceite, e o rapaz me olhou como se eu fosse de outro planeta."
     ],
     [
      "A",
      "Porque aceite, aqui, é o ato de aceitar alguma coisa. Por exemplo: o aceite de um contrato, o aceite de uma proposta. O que vai na salada é o óleo, ou o azeite, se for de oliva. E, já que a gente está falando de salada, cuidado: se você pedir salsa, vão te trazer salsinha, aquele tempero verde. O que você chama de salsa, aqui é molho."
     ],
     [
      "B",
      "Nossa, isso eu não sabia! E tem uma que ainda me confunde. Um colega disse que viu um rato na cozinha e eu perguntei: um rato de quanto tempo?"
     ],
     [
      "A",
      "Essa é ótima! Em espanhol, rato é um momento, né? Aqui é o bicho mesmo, o roedor. O seu rato de espanhol seria um tempinho, um instante. Agora, Diego, respondendo à sua pergunta: não existe vacina contra falso amigo, mas existem estratégias."
     ],
     [
      "B",
      "Quais?"
     ],
     [
      "A",
      "A primeira: desconfie das palavras que parecem fáceis demais. Se a palavra é idêntica ao espanhol, vale a pena conferir no dicionário, principalmente se você vai usar numa situação importante, tipo uma reunião ou um e-mail formal. A segunda: faça a sua própria lista. Cada vez que você cair numa armadilha, anote a palavra, o sentido em português e uma frase de exemplo. Sabe por quê? Porque o erro que dá vergonha a gente não esquece nunca mais."
     ],
     [
      "B",
      "Isso é verdade. A cena eu nunca mais vou esquecer."
     ],
     [
      "A",
      "Viu? E a terceira é prestar atenção no contexto. Quando você ouvir um brasileiro usar uma palavra conhecida de um jeito estranho, não deixe passar batido: pergunte. Brasileiro adora explicar essas coisas."
     ],
     [
      "B",
      "Pode deixar. Muito obrigado, Carla, de verdade."
     ],
     [
      "A",
      "Eu que agradeço, Diego. E manda um abraço para a moça do teatro!"
     ]
    ],
    "gloss": {
     "armadilhas": "trampas",
     "vergonha": "vergüenza",
     "peça": "obra de teatro",
     "trecho": "fragmento",
     "jantar": "cena (comida)",
     "aceite": "aceptación",
     "óleo": "aceite",
     "salsinha": "perejil",
     "tempero": "condimento",
     "molho": "salsa",
     "rato": "rata, ratón",
     "bicho": "animal, bicho",
     "conferir": "chequear",
     "batido": "(passar batido) pasar desapercibido"
    },
    "questions": [
     [
      "Qual é o objetivo principal da ligação de Diego?",
      [
       "Reclamar do atendimento que recebeu num supermercado.",
       "Contar como conheceu a namorada no teatro.",
       "Pedir estratégias contra os falsos amigos.",
       "Perguntar como se prepara um bom molho de tomate."
      ],
      "Pedir estratégias contra os falsos amigos."
     ],
     [
      "O que a moça entendeu quando Diego a convidou “para uma cena”?",
      [
       "Que ele queria jantar na casa dela.",
       "Que ele a convidava para ver uma peça.",
       "Que ele estava brincando com ela.",
       "Que ele pretendia gravar um vídeo com ela."
      ],
      "Que ele a convidava para ver uma peça."
     ],
     [
      "Segundo Carla, “aceite”, em português, se refere…",
      [
       "a qualquer tipo de óleo de cozinha.",
       "a um tempero verde usado em saladas.",
       "ao ato de aceitar algo, como um contrato.",
       "a uma marca conhecida de azeite de oliva."
      ],
      "ao ato de aceitar algo, como um contrato."
     ],
     [
      "Por que Carla recomenda anotar os próprios erros?",
      [
       "Porque os erros constrangedores ficam na memória.",
       "Porque o dicionário nem sempre registra os falsos amigos.",
       "Porque assim ele pode corrigir os colegas brasileiros.",
       "Porque o programa vai publicar a lista dos ouvintes."
      ],
      "Porque os erros constrangedores ficam na memória."
     ],
     [
      "Com a frase “brasileiro adora explicar essas coisas”, Carla quer…",
      [
       "encorajar Diego a perguntar sem medo.",
       "criticar a mania brasileira de corrigir estrangeiros.",
       "sugerir que Diego faça aulas particulares.",
       "mostrar que os brasileiros também erram muito."
      ],
      "encorajar Diego a perguntar sem medo."
     ]
    ],
    "vf": [
     [
      "Diego mora no Brasil há menos de um ano.",
      "verdadeiro"
     ],
     [
      "O convite de Diego terminou num mal-entendido que estragou a noite.",
      "falso"
     ],
     [
      "Diego trabalha num supermercado de Porto Alegre.",
      "não se diz"
     ],
     [
      "Carla garante que existe um método para nunca mais errar com falsos amigos.",
      "falso"
     ]
    ]
   },
   "compito": {
    "genre": "carta_leitor",
    "title": "O português que a gente acha que entende",
    "fonte": "lettura",
    "t": "Você é um(a) leitor(a) hispanofalante do Diário Paulistano, jornal em que foi publicada a crônica “Esquisito é o polvo”. Após ler a crônica, escreva uma carta do leitor ao jornal comentando o texto. Na sua carta, relacione a crônica com uma experiência sua (real ou imaginada) com falsos amigos entre o espanhol e o português e posicione-se sobre a ideia, citada pela cronista, de que o maior perigo é “o português que a gente acha que entende”. Não se esqueça de identificar-se no final e de usar um registro formal, próprio de uma carta publicada em jornal. Seu texto deve ter entre 216 e 276 palavras.",
    "es": "Carta de lector a un diario: comentá la crónica, contá una anécdota propia con un falso amigo (que no sea solo repetir las de la crónica) y tomá posición sobre la frase del profesor. Registro formal, con vocativo, despedida y firma.",
    "min": 216,
    "max": 276,
    "punti": [
     [
      "Referirse a la crónica y a lo que cuenta",
      [
       "crônica",
       "cronista",
       "polvo",
       "esquisito"
      ]
     ],
     [
      "Contar una experiencia propia con un falso amigo",
      [
       "experiência",
       "comigo",
       "no meu caso",
       "aconteceu"
      ]
     ],
     [
      "Tomar posición sobre “o português que a gente acha que entende”",
      [
       "concordo",
       "discordo",
       "acha que entende",
       "achamos que entendemos"
      ]
     ],
     [
      "Formato de carta de lector: vocativo, despedida e identificación",
      [
       "senhor editor",
       "prezad",
       "atenciosamente",
       "cordialmente"
      ]
     ]
    ],
    "model": "Senhor editor,\n\nSou argentino, moro em Campinas há dois anos e li com um sorriso cúmplice a crônica “Esquisito é o polvo”, publicada no último domingo. Poucas vezes me senti tão bem retratado.\n\nComo a cronista, também tive o meu almoço desastroso. No meu caso, o problema foi a palavra sobremesa: depois de um almoço de negócios, comentei com o meu chefe, diante dos clientes, que o melhor do encontro tinha sido a sobremesa, pensando na conversa tranquila depois da refeição. O silêncio na mesa foi tão longo quanto o descrito no texto. Só mais tarde me explicaram que, no Brasil, sobremesa é o doce servido no fim, e que os clientes tinham entendido que a reunião só valera pelo pudim.\n\nConcordo plenamente com o amigo professor citado pela cronista. As palavras que não entendemos nos obrigam a perguntar; as que achamos que entendemos nos deixam confiantes demais. Esquisito, borracha, escritório ou apelido parecem transparentes justamente porque existem no espanhol, e é essa falsa segurança que provoca os tropeços. Acrescentaria apenas que o risco não é só linguístico: um mal-entendido desses pode passar uma impressão de grosseria ou de desinteresse, como quase aconteceu comigo diante dos clientes.\n\nPor isso, gostaria de sugerir ao jornal que publique mais textos como este. Além de divertidos, eles ajudam os muitos hispanofalantes que vivem no Brasil a perder o medo de errar e, ao mesmo tempo, a desconfiar do que parece fácil demais.\n\nAtenciosamente,\nGustavo Ferreyra, analista de sistemas, Campinas (SP)"
   }
  },
  {
   "week": 46,
   "level": "C1",
   "lettura": {
    "title": "Uma língua, três continentes",
    "emoji": "🌍",
    "genre": "artigo de divulgação",
    "grammar": "variação: Brasil, Portugal e África",
    "text": "Imagine três jovens conversando na sala de embarque do aeroporto de Lisboa: uma paulistana, um lisboeta e uma luandense. A paulistana comenta que o celular está sem bateria; o lisboeta lhe oferece o carregador do seu telemóvel; a angolana observa que a fila está bué grande. Os três falam a mesma língua, se entendem sem grande esforço e, ainda assim, cada um deixa escapar, a cada frase, marcas inconfundíveis da sua origem. O português, língua oficial de nove países e falado por mais de 250 milhões de pessoas, é um bom exemplo de que unidade e diversidade podem conviver sem drama.\n\nAs diferenças mais visíveis estão no vocabulário. O que no Brasil é ônibus, em Portugal é autocarro; o trem brasileiro é o comboio português; o café da manhã de cá do Atlântico vira pequeno-almoço do lado de lá, e a tela do computador vira ecrã. O banheiro, em Portugal, é a casa de banho, e a geladeira é o frigorífico. Algumas dessas palavras soam engraçadas aos ouvidos brasileiros, e vice-versa. Um português pode achar curioso que um brasileiro chame de moça a jovem que ele chamaria de rapariga — palavra perfeitamente neutra em Portugal, mas que, em várias regiões do Brasil, sobretudo no Nordeste, adquiriu um sentido pejorativo e deve ser evitada.\n\nAs diferenças, porém, não param no léxico. Na gramática, a mais famosa talvez seja a forma de expressar uma ação em curso. O brasileiro diz “estou trabalhando”, com gerúndio; o português europeu prefere “estou a trabalhar”, com a preposição a seguida do infinitivo. A colocação dos pronomes também muda: enquanto no Brasil se diz “me dá um minuto”, com o pronome antes do verbo, em Portugal o padrão é “dá-me um minuto”. E o tratamento é outro mundo. Em boa parte do Brasil, você é a forma neutra para falar com qualquer pessoa; em Portugal, o tu domina entre amigos e familiares, e o você pode até soar distante ou pouco cortês, dependendo do contexto.\n\nNa pronúncia, a diferença salta aos ouvidos. O português europeu tende a “engolir” as vogais átonas, de modo que uma palavra como telefone soa, para um brasileiro, quase como “tlfone”. Por isso, muitos brasileiros dizem que entendem os angolanos com mais facilidade do que os portugueses: nas variedades africanas, as vogais costumam ser pronunciadas com mais clareza, mais perto do que se ouve no Brasil. O contrário também acontece. Portugueses que cresceram assistindo a novelas brasileiras entendem sem dificuldade um sotaque carioca ou paulistano, enquanto muitos brasileiros nunca tiveram contato real com o português de Lisboa.\n\nNos países africanos de língua oficial portuguesa, o idioma convive com dezenas de línguas locais, e dessa convivência nasce um vocabulário próprio. Em Angola, onde o português é a língua materna de uma parcela crescente da população, sobretudo nas cidades, bué quer dizer “muito”, kota é uma pessoa mais velha, tratada com respeito, e candengue é criança. Em Moçambique, o ônibus pode ser chamado de machimbombo, e maningue também significa “muito”. Em Cabo Verde e na Guiné-Bissau, o português divide o espaço com crioulos de base portuguesa, que a maioria da população usa no dia a dia, enquanto o português fica reservado à escola, à administração e à imprensa.\n\nA influência, aliás, nunca foi de mão única. O português do Brasil carrega marcas profundas das línguas africanas trazidas pelas pessoas escravizadas, especialmente as do grupo banto, como o quimbundo. Palavras do cotidiano brasileiro, como caçula, cafuné, moleque e quitanda, têm essa origem. Para muitos linguistas, parte do que distingue o português brasileiro do europeu se explica justamente por esse contato histórico, somado ao das línguas indígenas e ao dos imigrantes que chegaram depois.\n\nDiante de tanta variedade, existe um português “certo”? Os linguistas respondem que não: cada variedade tem as suas regras e a sua norma culta, e nenhuma é mais legítima do que as outras. O Acordo Ortográfico de 1990 tentou aproximar a escrita dos países lusófonos, mas não apagou as diferenças — nem era essa a intenção. Em Portugal, por exemplo, ainda se escreve facto, porque o c é pronunciado, enquanto no Brasil se escreve fato. Afinal, uma ortografia comum não obriga ninguém a falar do mesmo jeito.\n\nPara quem aprende português, sobretudo a partir do espanhol, a lição é dupla: escolher uma variedade como referência — no caso deste curso, a brasileira — e, ao mesmo tempo, treinar o ouvido para as outras. Ouvir um podcast de Maputo, um noticiário de Lisboa ou uma canção de Luanda não é perda de tempo. É uma forma de descobrir que o português, como o espanhol, é uma casa com muitos cômodos, e que em todos eles se fala a mesma língua.",
    "gloss": {
     "carregador": "cargador",
     "telemóvel": "celular (Portugal)",
     "bué": "muy, mucho (Angola, también Portugal)",
     "autocarro": "colectivo (Portugal)",
     "comboio": "tren (Portugal)",
     "pequeno-almoço": "desayuno (Portugal)",
     "ecrã": "pantalla (Portugal)",
     "geladeira": "heladera",
     "frigorífico": "heladera (Portugal)",
     "rapariga": "chica (Portugal); ofensivo en parte de Brasil",
     "engolir": "tragar",
     "sotaque": "acento, tonada",
     "parcela": "porción, parte",
     "kota": "persona mayor, respetada (Angola)",
     "candengue": "chico, nene (Angola)",
     "machimbombo": "colectivo (Mozambique)",
     "maningue": "mucho (Mozambique)",
     "crioulos": "lenguas criollas",
     "escravizadas": "esclavizadas",
     "caçula": "el hijo menor",
     "cafuné": "caricia en el pelo",
     "moleque": "pibe",
     "quitanda": "verdulería",
     "noticiário": "noticiero",
     "cômodos": "ambientes, habitaciones"
    },
    "questions": [
     [
      "Qual é a função da cena do aeroporto, no primeiro parágrafo?",
      [
       "Mostrar unidade e diversidade na mesma conversa.",
       "Criticar a falta de padronização do português no mundo.",
       "Provar que os angolanos falam com mais clareza que os portugueses.",
       "Relatar um episódio real vivido pela autora."
      ],
      "Mostrar unidade e diversidade na mesma conversa."
     ],
     [
      "Segundo o texto, por que convém evitar “rapariga” em várias regiões do Brasil?",
      [
       "Porque é uma palavra antiga e já fora de uso.",
       "Porque só se usa no português de Angola.",
       "Porque ganhou ali um sentido pejorativo.",
       "Porque designa uma criança muito pequena."
      ],
      "Porque ganhou ali um sentido pejorativo."
     ],
     [
      "O que o texto afirma sobre o uso de “você” em Portugal?",
      [
       "É a forma neutra para qualquer interlocutor.",
       "Pode soar distante, conforme o contexto.",
       "Substituiu completamente o tu entre amigos.",
       "Aparece apenas na língua escrita mais formal."
      ],
      "Pode soar distante, conforme o contexto."
     ],
     [
      "Por que muitos brasileiros entenderiam melhor os angolanos do que os portugueses?",
      [
       "Porque Angola adotou o vocabulário brasileiro.",
       "Porque os angolanos pronunciam as vogais com mais clareza.",
       "Porque os angolanos assistem a novelas brasileiras desde crianças.",
       "Porque o português angolano não tem palavras locais."
      ],
      "Porque os angolanos pronunciam as vogais com mais clareza."
     ],
     [
      "Qual é a posição do texto sobre a existência de um português “certo”?",
      [
       "A norma de Portugal é a referência original para todos.",
       "O Acordo de 1990 criou uma norma única e obrigatória.",
       "A variedade brasileira deveria ser a oficial por ter mais falantes.",
       "Cada variedade tem a sua norma, igualmente legítima."
      ],
      "Cada variedade tem a sua norma, igualmente legítima."
     ]
    ],
    "vf": [
     [
      "Em Portugal ainda se escreve “facto”, porque o c é pronunciado.",
      "verdadeiro"
     ],
     [
      "Em Cabo Verde, a maior parte da população usa o português no dia a dia.",
      "falso"
     ],
     [
      "Palavras como “cafuné” e “caçula” vêm de línguas do grupo banto.",
      "verdadeiro"
     ],
     [
      "O Acordo Ortográfico de 1990 pretendia unificar também a pronúncia.",
      "falso"
     ],
     [
      "Nas escolas portuguesas, os alunos estudam o português do Brasil.",
      "não se diz"
     ]
    ],
    "hunt": {
     "label": "Tocá las palabras propias del portugués europeo o africano (las que en Brasil se dicen de otra manera)",
     "targets": [
      "telemóvel",
      "autocarro",
      "comboio",
      "pequeno-almoço",
      "ecrã",
      "frigorífico",
      "bué",
      "kota",
      "candengue",
      "machimbombo",
      "maningue"
     ]
    }
   },
   "ascolto": {
    "title": "O português de Angola não é português errado",
    "genre": "entrevista de rádio",
    "es": "En un programa de radio sobre acentos y variedades, el conductor entrevista a una estudiante angoleña que hace una maestría en Campinas: hablan de su portugués, de las palabras de Luanda y de cómo la ven en Brasil.",
    "speakers": [
     "Rodrigo (apresentador)",
     "Nádia (estudante angolana)"
    ],
    "turns": [
     [
      "A",
      "Boa noite, está começando mais um Sotaques do Mundo. Hoje a nossa convidada é a Nádia, que nasceu em Luanda, em Angola, e faz mestrado numa universidade aqui em Campinas. Nádia, seja bem-vinda."
     ],
     [
      "B",
      "Obrigada, Rodrigo. É um prazer estar aqui."
     ],
     [
      "A",
      "Nádia, qual é a pergunta que você mais ouve desde que chegou ao Brasil?"
     ],
     [
      "B",
      "Ah, sem dúvida é: onde você aprendeu a falar português tão bem? E eu respondo: em casa, com a minha mãe! As pessoas ficam surpresas, mas o português é a minha língua materna. Em Luanda, muitos jovens da minha geração só falam português. Os meus avós falavam quimbundo, os meus pais ainda entendem, mas eu, infelizmente, sei só algumas palavras."
     ],
     [
      "A",
      "E o sotaque? Porque, ouvindo você, muita gente deve achar que você é portuguesa."
     ],
     [
      "B",
      "Acontece muito! No supermercado, na universidade, sempre tem alguém que pergunta se eu sou de Portugal. Mas, olha, o sotaque angolano é outra coisa. A gente pronuncia as vogais de forma mais aberta, mais clara que os portugueses. Os meus colegas daqui dizem que me entendem melhor do que entendem um lisboeta."
     ],
     [
      "A",
      "E no vocabulário, o que mudou no seu dia a dia?"
     ],
     [
      "B",
      "Muita coisa. Em Luanda, por exemplo, a gente anda de candongueiro, que são aquelas vans azuis e brancas que fazem de táxi coletivo. Aqui, tive que aprender a dizer ônibus e van. E tem o famoso bué, que para nós quer dizer muito. Eu dizia que a prova estava bué difícil, e os meus colegas riam. Agora, olha só, metade da turma diz bué também, de brincadeira."
     ],
     [
      "A",
      "Que ótimo! Teve algum mal-entendido mais sério?"
     ],
     [
      "B",
      "Teve um que eu nunca vou esquecer. No primeiro semestre, chamei uma colega de rapariga, com todo o carinho, como a gente faz em Angola. Só que ela é de Recife, e lá essa palavra é bem ofensiva. Ela ficou vermelha, e eu sem entender nada. Depois conversamos, rimos, e hoje ela é a minha melhor amiga aqui."
     ],
     [
      "A",
      "E antes de vir, você já conhecia o português brasileiro?"
     ],
     [
      "B",
      "Conhecia bastante, por causa das novelas e da música. Em Angola, a gente cresce vendo novela brasileira. Então eu entendia tudo. Falar como vocês é que é outra história."
     ],
     [
      "A",
      "E o contrário? O brasileiro conhece alguma coisa de Angola?"
     ],
     [
      "B",
      "Muito pouco, sinceramente. Já me perguntaram se em Luanda tem prédio, se a gente fala inglês lá. Luanda é uma cidade enorme, com trânsito, arranha-céus, shopping. Eu acho que falta curiosidade, mas também falta informação, né? A televisão daqui quase não mostra a África, a não ser quando é para falar de tragédia."
     ],
     [
      "A",
      "E você tenta falar como os brasileiros, ou prefere manter o seu jeito?"
     ],
     [
      "B",
      "Olha, um pouco de cada. Na universidade, uso palavras daqui para ser entendida. Mas quando ligo para a minha mãe, volto ao angolano em dois segundos. É a minha identidade, não quero perder isso."
     ],
     [
      "A",
      "Para terminar, Nádia: você já sentiu algum tipo de preconceito por causa da sua forma de falar?"
     ],
     [
      "B",
      "Às vezes sim. Tem gente que me corrige como se o meu português estivesse errado. E eu explico, com calma, que o português de Angola não é português errado. É português de Angola, com as suas regras, assim como o do Brasil tem as dele."
     ],
     [
      "A",
      "Recado dado. Nádia, muito obrigado pela conversa."
     ],
     [
      "B",
      "Eu é que agradeço. Foi bué bom!"
     ]
    ],
    "gloss": {
     "convidada": "invitada",
     "mestrado": "maestría",
     "quimbundo": "kimbundu, lengua bantú de Angola",
     "candongueiro": "combi que funciona como taxi colectivo (Angola)",
     "vans": "combis",
     "bué": "muy, mucho (Angola)",
     "turma": "curso, grupo de compañeros",
     "brincadeira": "broma",
     "rapariga": "chica (Angola, Portugal); insulto en el nordeste de Brasil",
     "vermelha": "colorada",
     "preconceito": "prejuicio",
     "recado": "mensaje"
    },
    "questions": [
     [
      "Por que as pessoas ficam surpresas com o português de Nádia?",
      [
       "Porque ela aprendeu português com novelas brasileiras.",
       "Porque não sabem que o português é a sua língua materna.",
       "Porque ela mistura quimbundo com português o tempo todo.",
       "Porque ela fala exatamente como uma paulistana."
      ],
      "Porque não sabem que o português é a sua língua materna."
     ],
     [
      "Segundo Nádia, por que os colegas brasileiros a entendem bem?",
      [
       "Porque ela pronuncia as vogais de forma mais clara.",
       "Porque ela evita todas as palavras angolanas.",
       "Porque ela morou alguns anos em Lisboa antes de vir ao Brasil.",
       "Porque ela fala devagar para ser entendida."
      ],
      "Porque ela pronuncia as vogais de forma mais clara."
     ],
     [
      "O que aconteceu com a palavra “bué” na turma de Nádia?",
      [
       "Os professores pediram que ela não a usasse mais.",
       "Os colegas passaram a usá-la de brincadeira.",
       "Ninguém entendeu o que ela significava.",
       "Ela deixou de usá-la para não parecer estrangeira."
      ],
      "Os colegas passaram a usá-la de brincadeira."
     ],
     [
      "Ao falar do episódio com a colega de Recife, Nádia mostra que…",
      [
       "a mesma palavra pode ser carinhosa num lugar e ofensiva em outro.",
       "os brasileiros do Nordeste não entendem o português de Angola.",
       "ela sabia que a palavra era ofensiva, mas quis brincar.",
       "a amizade entre as duas terminou por causa do mal-entendido."
      ],
      "a mesma palavra pode ser carinhosa num lugar e ofensiva em outro."
     ],
     [
      "Qual é a atitude de Nádia em relação ao próprio jeito de falar?",
      [
       "Quer perder o sotaque angolano o quanto antes, para se integrar.",
       "Adapta-se no Brasil, mas preserva a sua identidade.",
       "Prefere falar como os portugueses.",
       "Acha que o português de Angola é menos correto."
      ],
      "Adapta-se no Brasil, mas preserva a sua identidade."
     ]
    ],
    "vf": [
     [
      "Os avós de Nádia falavam quimbundo.",
      "verdadeiro"
     ],
     [
      "Nádia fala quimbundo fluentemente.",
      "falso"
     ],
     [
      "Nádia pretende voltar para Angola quando terminar o mestrado.",
      "não se diz"
     ],
     [
      "Antes de vir ao Brasil, Nádia não entendia o português brasileiro.",
      "falso"
     ]
    ]
   },
   "compito": {
    "genre": "resenha",
    "title": "Resenha: Sotaques do Mundo com Nádia",
    "fonte": "ascolto",
    "t": "Você colabora com o blog de uma escola de português para hispanofalantes em Buenos Aires, que publica resenhas de podcasts e programas de rádio úteis para os alunos. Após ouvir a entrevista do programa Sotaques do Mundo com a estudante angolana Nádia, escreva uma resenha do episódio para os leitores do blog. Na sua resenha, apresente o programa e a entrevistada, resuma os principais temas tratados, avalie o episódio (pontos fortes e fracos) e diga se o recomenda e para quem. Não se esqueça de dar um título à resenha e de usar informações e exemplos da entrevista. Registro semiformal. Seu texto deve ter entre 222 e 282 palavras.",
    "es": "Reseña de un episodio de radio para el blog de una escuela: presentá, resumí con ejemplos concretos del audio, evaluá (algo bueno y algo flojo) y recomendá. Ponele título.",
    "min": 222,
    "max": 282,
    "punti": [
     [
      "Presentar el programa y a la entrevistada",
      [
       "nádia",
       "angolan",
       "entrevista",
       "episódio"
      ]
     ],
     [
      "Resumir los temas con ejemplos del audio",
      [
       "rapariga",
       "bué",
       "candongueiro",
       "sotaque"
      ]
     ],
     [
      "Evaluar: puntos fuertes y débiles",
      [
       "ponto alto",
       "ponto fraco",
       "porém",
       "infelizmente",
       "destaque"
      ]
     ],
     [
      "Recomendar y decir a quién",
      [
       "recomendo",
       "recomend",
       "vale a pena"
      ]
     ]
    ],
    "model": "Sotaques do Mundo: quando o português vem de Luanda\n\nQuem acha que o português tem dono deveria ouvir o episódio mais recente do programa Sotaques do Mundo, em que o apresentador Rodrigo conversa com Nádia, uma estudante angolana que faz mestrado em Campinas. Numa conversa curta e descontraída, a entrevista desmonta, com humor, vários preconceitos sobre a língua.\n\nO ponto de partida é a pergunta que Nádia mais ouve no Brasil: onde ela aprendeu a falar português tão bem? A resposta surpreende muitos ouvintes: o português é a sua língua materna. A partir daí, ela compara o seu sotaque, de vogais mais claras que as do português europeu, com o brasileiro, apresenta palavras de Luanda, como candongueiro e bué, e conta o mal-entendido que viveu ao chamar uma colega do Recife de rapariga, palavra carinhosa em Angola e ofensiva em parte do Nordeste.\n\nO ponto alto, porém, é a reflexão final. Com tranquilidade, Nádia afirma que o português de Angola não é português errado, e sim uma variedade com as suas próprias regras. A mensagem é especialmente útil para nós, hispanofalantes, que muitas vezes aprendemos a variedade brasileira como se fosse a única.\n\nSe há um ponto fraco, é a pressa: alguns temas, como a relação entre o português e o quimbundo na família de Nádia, mereciam mais tempo. Mesmo assim, recomendo o episódio a todos os alunos a partir do nível intermediário. Além de treinar o ouvido, ele nos lembra que falar bem português não significa necessariamente falar como um paulistano."
   }
  },
  {
   "week": 47,
   "level": "C1",
   "lettura": {
    "title": "Tarifa zero: nem milagre, nem delírio",
    "emoji": "🚌",
    "genre": "coluna de opinião",
    "grammar": "argumentação e modalização",
    "text": "Poucas propostas têm dividido tanto a nossa cidade quanto a da tarifa zero no transporte coletivo. Nas últimas semanas, a Câmara Municipal voltou a discutir o tema, e o debate, como era de se esperar, rapidamente descambou para a caricatura. De um lado, estão os que veem na gratuidade dos ônibus a solução para todos os males urbanos; do outro, os que a tratam como um delírio populista, supostamente condenado a quebrar os cofres públicos. Convém, talvez, respirar fundo e examinar o assunto com menos paixão e mais argumentos.\n\nComecemos pelo que parece inegável. O modelo atual, em que a maior parte do custo do sistema é paga pelo passageiro na catraca, dá sinais evidentes de esgotamento. A cada reajuste, parte dos usuários desiste do ônibus e migra para a moto, para o carro ou, pior, simplesmente deixa de circular. Com menos passageiros, a receita cai, as empresas pressionam por novos aumentos, e o ciclo se repete. Não é preciso ser economista para perceber que se trata de um círculo vicioso. Quem mais perde, evidentemente, são os moradores das periferias, que gastam uma fatia desproporcional da renda com transporte e que, muitas vezes, deixam de procurar emprego ou de ir ao médico porque não podem pagar a passagem.\n\nOs defensores da tarifa zero argumentam que o transporte deveria ser tratado como um direito, assim como a saúde e a educação, e não como uma mercadoria. É um argumento forte. Afinal, ninguém exige que o aluno pague por aula assistida na escola pública. Além disso, as experiências de cidades brasileiras de pequeno e médio porte que adotaram a gratuidade sugerem que o número de passageiros tende a crescer rapidamente, que o comércio local provavelmente se beneficia e que o trânsito pode, em alguma medida, ficar menos congestionado.\n\nHá ainda um argumento ambiental que costuma ficar em segundo plano, mas que dificilmente pode ser descartado. Cada pessoa que troca o carro pelo ônibus significa menos emissões, menos ruído e menos disputa por espaço nas ruas. Numa cidade que sofre com ilhas de calor e com o ar poluído nos meses secos, esse benefício não é pequeno. É verdade que ele é difícil de medir em reais e centavos, e talvez por isso raramente apareça nas planilhas dos técnicos da prefeitura. Mas o fato de um benefício não caber numa planilha não significa, evidentemente, que ele não exista.\n\nSeria ingênuo, no entanto, ignorar as objeções. A primeira, e certamente a mais séria, é a do financiamento. Ônibus não andam de graça: alguém terá de pagar o combustível, os salários dos motoristas e a renovação da frota. Se a conta for simplesmente transferida para o orçamento municipal, é possível que outras áreas, como a saúde e a educação, acabem sacrificadas. A segunda objeção é a da qualidade. Um sistema gratuito, porém lotado e sucateado, dificilmente convenceria alguém a deixar o carro na garagem. Gratuidade sem investimento poderia, paradoxalmente, afastar justamente os passageiros que se pretendia atrair.\n\nHá ainda um argumento que, a meu ver, é bem mais frágil: o de que aquilo que é gratuito não é valorizado. Esse raciocínio, repetido à exaustão, parece partir de uma desconfiança em relação aos mais pobres que não resiste aos fatos. Ninguém sugere cobrar ingresso nas praças públicas para que elas sejam mais bem cuidadas, nem vender entrada para as bibliotecas municipais para que os livros sejam mais respeitados.\n\nOnde fico, então? Parece-me que a pergunta está mal formulada. Em vez de discutir se a tarifa zero é boa ou má, deveríamos discutir como financiá-la de forma justa e gradual. Algumas alternativas merecem, no mínimo, ser estudadas: uma contribuição maior das empresas, que hoje já custeiam boa parte do vale-transporte dos seus funcionários; uma taxa sobre estacionamentos privados em áreas centrais; ou a implantação da gratuidade por etapas, começando pelos domingos, pelos estudantes e pelas linhas que atendem os bairros mais pobres. Nenhuma dessas medidas é, sozinha, suficiente, mas, combinadas, poderiam tornar o projeto viável sem pôr em risco outros serviços essenciais.\n\nTampouco se devem esperar milagres. A tarifa zero, por si só, não resolverá o problema da mobilidade numa cidade do nosso tamanho. Sem corredores exclusivos, integração com o metrô e planejamento urbano, os ônibus continuarão presos no mesmo engarrafamento de sempre, só que sem cobrar passagem. Talvez o maior mérito da proposta seja justamente obrigar a cidade a discutir, com seriedade, o que quer para o seu transporte nas próximas décadas.\n\nO pior cenário, sem dúvida, seria a Câmara engavetar o assunto mais uma vez, à espera de uma solução perfeita que provavelmente nunca virá. Entre o populismo irresponsável e o imobilismo confortável, existe um amplo espaço para a política séria. Resta saber se os nossos vereadores estão dispostos a ocupá-lo.\n\nMarcelo Antunes é jornalista e escreve às quintas-feiras.",
    "gloss": {
     "descambou": "derivó (para peor)",
     "gratuidade": "gratuidad",
     "cofres": "arcas",
     "convém": "conviene",
     "catraca": "molinete",
     "esgotamento": "agotamiento",
     "reajuste": "aumento (de tarifa)",
     "receita": "ingresos, recaudación",
     "fatia": "tajada, porción",
     "renda": "ingreso (de una persona)",
     "passagem": "boleto, pasaje",
     "mercadoria": "mercancía",
     "porte": "tamaño",
     "ingênuo": "ingenuo",
     "frota": "flota",
     "orçamento": "presupuesto",
     "lotado": "repleto, hasta las manos",
     "sucateado": "venido abajo, desmantelado",
     "raciocínio": "razonamiento",
     "vale-transporte": "subsidio de transporte que paga el empleador",
     "estacionamentos": "estacionamientos, playas de estacionamiento",
     "tampouco": "tampoco",
     "engarrafamento": "embotellamiento",
     "engavetar": "cajonear",
     "imobilismo": "inmovilismo",
     "vereadores": "concejales",
     "ruído": "ruido",
     "planilhas": "planillas"
    },
    "questions": [
     [
      "Qual é o objetivo principal do colunista?",
      [
       "Defender a implantação imediata e total da tarifa zero.",
       "Mostrar que a tarifa zero é um delírio populista.",
       "Deslocar o debate para a questão do financiamento.",
       "Denunciar os lucros abusivos das empresas de ônibus da cidade."
      ],
      "Deslocar o debate para a questão do financiamento."
     ],
     [
      "No segundo parágrafo, o “círculo vicioso” se refere…",
      [
       "à sequência de reajustes, perda de passageiros e novos aumentos.",
       "ao aumento do trânsito causado pelas motos.",
       "à dependência das periferias em relação ao centro.",
       "à disputa política entre vereadores e empresários."
      ],
      "à sequência de reajustes, perda de passageiros e novos aumentos."
     ],
     [
      "Como o autor avalia o argumento de que “o que é gratuito não é valorizado”?",
      [
       "Como o mais sério de todos os argumentos contrários.",
       "Como frágil e marcado por desconfiança dos pobres.",
       "Como verdadeiro, porém pouco relevante no caso.",
       "Como uma questão técnica que cabe aos economistas."
      ],
      "Como frágil e marcado por desconfiança dos pobres."
     ],
     [
      "Ao citar corredores exclusivos e integração com o metrô, o autor quer mostrar que…",
      [
       "o metrô deveria ser gratuito antes dos ônibus.",
       "a cidade já tem infraestrutura suficiente.",
       "os carros deveriam ser proibidos no centro da cidade.",
       "a gratuidade, sozinha, não resolve a mobilidade."
      ],
      "a gratuidade, sozinha, não resolve a mobilidade."
     ],
     [
      "O que expressa a última frase do texto?",
      [
       "Uma dúvida sobre a disposição dos vereadores.",
       "A certeza de que o projeto será aprovado.",
       "Um elogio à seriedade da Câmara Municipal.",
       "Uma ameaça de mobilização popular contra a Câmara."
      ],
      "Uma dúvida sobre a disposição dos vereadores."
     ]
    ],
    "vf": [
     [
      "O autor considera que o modelo atual de financiamento está esgotado.",
      "verdadeiro"
     ],
     [
      "Para o autor, a tarifa zero deveria começar imediatamente em todas as linhas.",
      "falso"
     ],
     [
      "O autor já foi vereador da cidade.",
      "não se diz"
     ],
     [
      "Segundo o autor, uma gratuidade sem investimento pode afastar passageiros.",
      "verdadeiro"
     ],
     [
      "O texto afirma que hoje as empresas não arcam com nenhum custo do transporte dos funcionários.",
      "falso"
     ]
    ],
    "hunt": {
     "label": "Tocá los modalizadores: adverbios, verbos y expresiones que matizan la certeza, la probabilidad o la obligación",
     "targets": [
      "supostamente",
      "convém",
      "talvez",
      "inegável",
      "evidentemente",
      "provavelmente",
      "certamente",
      "dificilmente",
      "poderia",
      "deveríamos",
      "parece-me",
      "possível"
     ]
    }
   },
   "ascolto": {
    "title": "Semana de quatro dias: ponto e contraponto",
    "genre": "debate radiofônico",
    "es": "En un segmento de debate de una radio, una empresaria dueña de una fábrica y un sindicalista discuten la propuesta de la semana laboral de cuatro días.",
    "speakers": [
     "Luciana (empresária)",
     "Carlos (sindicalista)"
    ],
    "turns": [
     [
      "A",
      "Obrigada pelo convite. Olha, eu queria começar dizendo que eu não sou contra a semana de quatro dias por princípio. Eu tenho uma fábrica de móveis no interior de Minas, com uns oitenta funcionários, e sei que o pessoal está cansado. Mas me parece que essa proposta foi pensada para escritórios de cidade grande, não para a indústria."
     ],
     [
      "B",
      "Luciana, eu entendo a preocupação, e acho que ela é legítima. Mas talvez a gente esteja olhando para a questão pelo lado errado. Não se trata só de trabalhar menos, trata-se de trabalhar melhor. As experiências feitas em outros países indicam que, em muitos casos, a produtividade se mantém, e às vezes até aumenta, quando as pessoas descansam mais."
     ],
     [
      "A",
      "Em muitos casos, você disse bem. Não em todos. Numa linha de produção, a máquina não produz mais porque o operador está descansado. Se eu fechar a fábrica um dia a mais por semana, provavelmente vou produzir menos. Então, das duas uma: ou eu contrato mais gente, e o custo sobe, ou eu atraso as entregas e perco clientes."
     ],
     [
      "B",
      "Não necessariamente. Ninguém está propondo que a fábrica feche. Dá para organizar turnos, montar escalas… E tem um custo que as empresas raramente colocam na conta, que é o do adoecimento. Afastamento por estresse, por lesão, por esgotamento. Isso custa caro, e custa para todo mundo, inclusive para o patrão."
     ],
     [
      "A",
      "Concordo que existe esse custo, e seria desonesto negar. Mas veja, eu sou uma empresa pequena. Uma multinacional talvez consiga absorver a mudança. Eu, sinceramente, não sei se consigo. Se a lei vier igual para todos, de uma vez só, receio que muitas pequenas empresas simplesmente não aguentem."
     ],
     [
      "B",
      "Aí eu acho que a gente começa a concordar. Eu também não defendo uma mudança da noite para o dia. Uma transição gradual, com apoio para as pequenas empresas, me parece perfeitamente possível. O que eu não aceito é o argumento de que o trabalhador brasileiro não merece descansar porque o país é pobre."
     ],
     [
      "A",
      "Eu nunca disse isso, Carlos."
     ],
     [
      "B",
      "Não, você não disse, é verdade, peço desculpas. Mas é um argumento que a gente ouve muito por aí."
     ],
     [
      "A",
      "Tudo bem. Mas tem outra coisa que pouca gente considera: o cliente. Se o meu concorrente continua trabalhando cinco dias e eu passo a trabalhar quatro, quem garante que o cliente vai esperar por mim?"
     ],
     [
      "B",
      "Por isso mesmo a negociação tem que ser por setor. Se o setor inteiro muda junto, ninguém sai em desvantagem, e a concorrência continua nas mesmas condições. Ninguém quer que a sua fábrica perca cliente para a do vizinho, Luciana."
     ],
     [
      "A",
      "Olha, eu diria o seguinte: se houver uma transição longa, com algum incentivo fiscal e com negociação setor por setor, eu estaria disposta a experimentar. Quem sabe começar com um projeto piloto na minha própria empresa, com um grupo de voluntários."
     ],
     [
      "B",
      "Isso já é um avanço enorme. E, sinceramente, eu acho que você vai se surpreender. Quando o funcionário sente que a empresa confia nele, ele costuma devolver essa confiança."
     ],
     [
      "A",
      "Pode ser. Mas eu prefiro ver os números antes de acreditar."
     ],
     [
      "B",
      "Justo. Então eu faço um convite: faça o piloto e depois volte aqui para contar como foi."
     ],
     [
      "A",
      "Combinado. Mas, se a produção cair, você vai ter que admitir isso no ar."
     ],
     [
      "B",
      "Fechado. E, se ela não cair, quem admite é você."
     ]
    ],
    "gloss": {
     "móveis": "muebles",
     "operador": "operario (de una máquina)",
     "entregas": "entregas",
     "escalas": "esquemas de turnos rotativos",
     "adoecimento": "enfermarse, enfermedad",
     "afastamento": "licencia (por enfermedad)",
     "esgotamento": "agotamiento, burnout",
     "patrão": "patrón",
     "receio": "temo",
     "aguentem": "aguanten",
     "piloto": "de prueba",
     "fechado": "trato hecho"
    },
    "questions": [
     [
      "Qual é a principal preocupação de Luciana?",
      [
       "Que os funcionários passem a trabalhar com menos cuidado.",
       "Que a mudança prejudique as pequenas indústrias.",
       "Que as multinacionais deixem de investir no Brasil.",
       "Que os sindicatos ganhem poder demais nas negociações."
      ],
      "Que a mudança prejudique as pequenas indústrias."
     ],
     [
      "Que argumento Carlos usa sobre a produtividade?",
      [
       "Ela não importa diante do bem-estar do trabalhador.",
       "As máquinas modernas já dispensam os operadores.",
       "Os clientes aceitariam prazos de entrega mais longos.",
       "Experiências indicam que ela muitas vezes se mantém."
      ],
      "Experiências indicam que ela muitas vezes se mantém."
     ],
     [
      "Ao mencionar o “custo do adoecimento”, Carlos pretende…",
      [
       "mostrar um gasto que as empresas costumam ignorar.",
       "acusar Luciana de maltratar os funcionários.",
       "defender o fechamento das fábricas às sextas.",
       "pedir mais médicos do trabalho nas empresas do setor."
      ],
      "mostrar um gasto que as empresas costumam ignorar."
     ],
     [
      "Em que ponto os dois começam a concordar?",
      [
       "Na aprovação imediata de uma lei nacional.",
       "Na ideia de que o país é pobre demais.",
       "Na necessidade de uma transição gradual.",
       "Na redução proporcional dos salários."
      ],
      "Na necessidade de uma transição gradual."
     ],
     [
      "Como termina o debate?",
      [
       "Com Luciana mudando completamente de opinião sobre o tema.",
       "Com um desafio amistoso em torno de um projeto piloto.",
       "Com Carlos retirando a sua proposta inicial.",
       "Com os dois reconhecendo que não há saída possível."
      ],
      "Com um desafio amistoso em torno de um projeto piloto."
     ]
    ],
    "vf": [
     [
      "A empresa de Luciana tem cerca de oitenta funcionários.",
      "verdadeiro"
     ],
     [
      "Carlos defende que a mudança seja feita de uma só vez, por lei.",
      "falso"
     ],
     [
      "Luciana afirmou que o trabalhador brasileiro não merece descansar.",
      "falso"
     ],
     [
      "O sindicato de Carlos representa os trabalhadores da indústria de móveis.",
      "não se diz"
     ]
    ]
   },
   "compito": {
    "genre": "texto_opiniao",
    "title": "Tarifa zero: a sua opinião",
    "fonte": "lettura",
    "t": "Você mora numa grande cidade brasileira e leu, no site do jornal local, a coluna “Tarifa zero: nem milagre, nem delírio”, de Marcelo Antunes. O jornal abriu um espaço para textos de opinião dos leitores sobre o tema. Escreva um texto de opinião em que você se posicione sobre a tarifa zero, dialogando com a coluna: concorde ou discorde de pelo menos dois argumentos do colunista (por exemplo, o do financiamento, o de que “o que é gratuito não é valorizado” ou a proposta de implantação por etapas) e apresente uma sugestão própria. Não se esqueça de dar um título ao texto, de modalizar as suas afirmações (talvez, provavelmente, a meu ver…) e de usar um registro formal. Seu texto deve ter entre 227 e 287 palavras.",
    "es": "Texto de opinión para la sección de lectores: tomá posición, discutí al menos dos argumentos concretos de la columna y proponé algo tuyo. Usá modalizadores y ponele título.",
    "min": 227,
    "max": 287,
    "punti": [
     [
      "Referirse a la columna y a su tesis",
      [
       "coluna",
       "colunista",
       "antunes"
      ]
     ],
     [
      "Tomar una posición clara",
      [
       "concordo",
       "discordo",
       "a meu ver",
       "na minha opinião"
      ]
     ],
     [
      "Discutir al menos dos argumentos del texto",
      [
       "financiamento",
       "gratuito",
       "etapas",
       "reajuste"
      ]
     ],
     [
      "Proponer algo propio, con modalizadores",
      [
       "acrescentaria",
       "sugiro",
       "proponho",
       "talvez",
       "provavelmente"
      ]
     ],
     [
      "Cerrar con una conclusión",
      [
       "pior cenário",
       "portanto",
       "em suma",
       "por isso",
       "conclu"
      ]
     ]
    ],
    "model": "Tarifa zero: o preço de não decidir\n\nNa coluna publicada nesta semana, Marcelo Antunes propõe que o debate sobre a tarifa zero deixe de lado a pergunta “sim ou não” e se concentre no financiamento. Concordo com boa parte do diagnóstico, mas, a meu ver, o texto é prudente demais nas conclusões.\n\nÉ inegável, como afirma o colunista, que o modelo atual está esgotado. Quem mora na periferia, como eu, sabe que cada reajuste empurra vizinhos para a moto ou os prende em casa. Também me parece correto rebater a ideia de que o que é gratuito não é valorizado: ninguém depreda a escola pública por ela ser gratuita.\n\nDiscordo, porém, da ênfase na implantação por etapas começando pelos domingos. A medida talvez seja simpática, mas dificilmente mudaria a vida de quem precisa do ônibus para trabalhar de segunda a sexta. Se o transporte é um direito, como os próprios defensores argumentam, a gratuidade deveria valer primeiro nos dias úteis e nas linhas das periferias, e não como um passeio de fim de semana.\n\nQuanto ao financiamento, as sugestões da coluna são razoáveis, e eu acrescentaria uma: rever os privilégios de quem usa carro, como as vagas gratuitas nas ruas centrais. Provavelmente não bastaria para pagar a conta inteira, mas seria um sinal claro de prioridade.\n\nO colunista tem razão ao dizer que o pior cenário é engavetar a proposta. Eu apenas lembraria que esperar demais por um projeto perfeito também tem um custo, e quem o paga, como sempre, é quem está no ponto de ônibus."
   }
  },
  {
   "week": 48,
   "level": "C1",
   "lettura": {
    "title": "Sono, telas e o sinal das sete",
    "emoji": "😴",
    "genre": "reportagem de divulgação científica",
    "grammar": "resumo e reformulação: verbos de dizer",
    "text": "Os adolescentes que estudam no turno da manhã dormem, em média, uma hora e meia a menos do que precisariam, e a conta aparece nas notas, no humor e até na saúde. É o que indica um estudo conduzido por pesquisadores de uma universidade pública de Minas Gerais com cerca de 1.200 alunos do ensino médio de catorze escolas estaduais e particulares. Os resultados, divulgados na semana passada, reacenderam uma discussão antiga entre educadores, médicos e famílias: não estaria a escola começando cedo demais?\n\nDurante dois meses, os estudantes usaram pulseiras que registram os períodos de sono e responderam a questionários sobre rotina, uso de celular e desempenho escolar. Nos dias de aula, eles dormiram, em média, seis horas e quarenta minutos por noite — bem menos do que as oito a dez horas que as sociedades médicas costumam recomendar para essa faixa etária. Nos fins de semana, o quadro se invertia: muitos passavam das onze horas de sono, numa tentativa de “pagar a dívida” acumulada ao longo da semana, o que, segundo os pesquisadores, só bagunça ainda mais o relógio do corpo.\n\nAs consequências não se limitam ao boletim. Os questionários mostraram que os alunos que dormiam menos de sete horas relatavam com mais frequência irritação, dificuldade de concentração e sintomas de ansiedade. Muitos também admitiam cochilar durante as aulas ou compensar o cansaço com café e bebidas energéticas. “A gente chega na escola e fica igual a um zumbi até o intervalo”, resume Júlia, de dezesseis anos, aluna de uma escola estadual de Contagem que participou do estudo. “Só começo a entender alguma coisa lá pelas dez horas.” Para os pesquisadores, depoimentos como o dela ajudam a entender por que as primeiras aulas do dia costumam render tão pouco, e por que tantos professores se queixam de turmas apáticas logo cedo.\n\nA coordenadora da pesquisa, a neurocientista Beatriz Lacerda, ressalta que o problema não se resume a preguiça ou excesso de telas. “Na adolescência, o relógio biológico sofre um atraso natural. O corpo passa a produzir melatonina mais tarde, e o jovem só sente sono perto da meia-noite, às vezes depois”, esclarece. “Exigir que ele esteja alerta às sete da manhã é, do ponto de vista biológico, como exigir que um adulto faça uma prova às quatro da madrugada.”\n\nO estudo também comparou turmas que começavam as aulas às sete horas com outras que entravam às oito ou mais tarde. Segundo os pesquisadores, os alunos que começavam mais tarde dormiam, em média, quarenta minutos a mais e relatavam menos sonolência durante as aulas. Lacerda admite, porém, que os dados não permitem afirmar que o horário, sozinho, explique as diferenças de desempenho. “Há muitos fatores envolvidos: renda familiar, tempo de deslocamento, trabalho fora da escola. Seria irresponsável da nossa parte prometer que atrasar o sinal resolve tudo”, pondera.\n\nA proposta de adiar o início das aulas está longe de ser consenso. O diretor de uma escola estadual da capital mineira que participou do estudo reconhece a importância dos resultados, mas adverte para os efeitos práticos da mudança. “Muitos dos nossos alunos trabalham à tarde ou cuidam dos irmãos menores. Se a aula terminar mais tarde, eles simplesmente não vão conseguir vir”, alega. Representantes de associações de pais lembram, por sua vez, que o horário escolar está amarrado ao horário de trabalho das famílias e ao transporte público, o que torna qualquer alteração bem mais complexa do que parece à primeira vista.\n\nHá também quem sustente que o foco deveria estar em outro lugar: no uso de celulares à noite. Um pediatra ouvido pela reportagem, que não participou da pesquisa, critica o que chama de “culpar o relógio” e defende campanhas de educação sobre o sono voltadas às famílias. Lacerda rebate o argumento sem negar o problema. “As telas agravam o atraso, sem dúvida. Mas o atraso existe mesmo em adolescentes que não usam celular. Não se trata de escolher entre uma coisa e outra”, afirma.\n\nA discussão não é exclusiva do Brasil. Em vários países, escolas e distritos já experimentaram atrasar o início das aulas, com resultados geralmente descritos como positivos, embora nem sempre fáceis de reproduzir em outros contextos. Os autores do estudo mineiro fazem questão de destacar esse ponto: em vez de uma regra nacional, sugerem experiências-piloto em redes de ensino interessadas, acompanhadas de perto por pesquisadores e avaliadas ao longo de pelo menos um ano letivo. A equipe já conversa com duas secretarias municipais de educação sobre um primeiro teste, mas prefere não antecipar nomes enquanto não houver um acordo assinado.\n\nEnquanto isso, a equipe recomenda medidas mais simples, que dependem menos de decisões políticas: evitar provas nos primeiros horários, reservar as primeiras aulas para atividades menos exigentes e conversar com os alunos e com os pais sobre a importância do sono. “Não precisamos esperar uma revolução para começar a mudar”, conclui Lacerda. “Só precisamos parar de tratar o adolescente com sono como um adolescente preguiçoso.”",
    "gloss": {
     "turno": "turno (mañana, tarde)",
     "reacenderam": "reavivaron",
     "pulseiras": "pulseras",
     "desempenho": "rendimiento",
     "faixa": "franja (faixa etária = franja etaria)",
     "quadro": "panorama",
     "dívida": "deuda",
     "bagunça": "desordena, desbarajusta",
     "ressalta": "destaca, subraya",
     "preguiça": "fiaca, pereza",
     "esclarece": "aclara",
     "turmas": "cursos, divisiones",
     "relatavam": "contaban, informaban",
     "sonolência": "somnolencia",
     "deslocamento": "traslado, viaje",
     "sinal": "timbre (de la escuela)",
     "pondera": "matiza, sopesa",
     "adiar": "postergar",
     "adverte": "advierte",
     "alega": "aduce, argumenta",
     "amarrado": "atado",
     "sustente": "sostenga",
     "rebate": "refuta, retruca",
     "letivo": "lectivo (ano letivo = ciclo lectivo)",
     "exigentes": "exigentes, demandantes",
     "preguiçoso": "vago, fiaca",
     "cochilar": "cabecear, dormitar",
     "zumbi": "zombi",
     "intervalo": "recreo",
     "depoimentos": "testimonios",
     "queixam": "(se queixam) se quejan"
    },
    "questions": [
     [
      "Qual é o fato principal da reportagem?",
      [
       "Uma lei vai atrasar o início das aulas em Minas Gerais.",
       "Um estudo associa o sono curto dos adolescentes ao horário escolar.",
       "Os adolescentes dormem mal sobretudo por causa do celular.",
       "As escolas particulares já começam as aulas mais tarde que as públicas."
      ],
      "Um estudo associa o sono curto dos adolescentes ao horário escolar."
     ],
     [
      "Segundo Beatriz Lacerda, por que o adolescente sente sono mais tarde?",
      [
       "Pelo excesso de tarefas escolares feitas à noite.",
       "Porque dorme demais nos fins de semana.",
       "Por um atraso natural do relógio biológico.",
       "Porque consome muita cafeína ao longo da tarde."
      ],
      "Por um atraso natural do relógio biológico."
     ],
     [
      "Com a frase “Seria irresponsável da nossa parte prometer…”, a pesquisadora…",
      [
       "critica os políticos que ignoram a pesquisa.",
       "reconhece os limites das conclusões do estudo.",
       "defende o fim das aulas no turno da manhã.",
       "acusa as escolas de ter manipulado os dados."
      ],
      "reconhece os limites das conclusões do estudo."
     ],
     [
      "Qual é o principal argumento do diretor contra a mudança?",
      [
       "Muitos alunos trabalham ou cuidam de irmãos à tarde.",
       "Os professores não aceitariam mudar de horário de jeito nenhum.",
       "Os resultados do estudo não são confiáveis o suficiente.",
       "Com a mudança, os alunos dormiriam ainda mais tarde."
      ],
      "Muitos alunos trabalham ou cuidam de irmãos à tarde."
     ],
     [
      "Como Lacerda responde à crítica do pediatra?",
      [
       "Nega que o celular à noite tenha qualquer efeito sobre o sono dos jovens.",
       "Concorda que o foco deveria ser apenas a educação das famílias.",
       "Diz que o pediatra não tem competência para opinar sobre o estudo.",
       "Admite o papel das telas, mas mantém que o atraso é biológico."
      ],
      "Admite o papel das telas, mas mantém que o atraso é biológico."
     ]
    ],
    "vf": [
     [
      "Os alunos pesquisados usaram pulseiras que registravam o sono.",
      "verdadeiro"
     ],
     [
      "O estudo comprovou que o horário, sozinho, explica as diferenças de notas.",
      "falso"
     ],
     [
      "O pediatra ouvido pela reportagem participou da pesquisa.",
      "falso"
     ],
     [
      "O estudo foi financiado pelo governo do estado de Minas Gerais.",
      "não se diz"
     ],
     [
      "Os pesquisadores propõem experiências-piloto em vez de uma regra nacional.",
      "verdadeiro"
     ]
    ],
    "hunt": {
     "label": "Tocá los verbos de decir que atribuyen con precisión lo que dice cada fuente",
     "targets": [
      "ressalta",
      "esclarece",
      "admite",
      "pondera",
      "reconhece",
      "adverte",
      "alega",
      "sustente",
      "critica",
      "rebate",
      "destacar",
      "conclui"
     ]
    }
   },
   "ascolto": {
    "title": "O verbo que você escolhe é uma opinião",
    "genre": "programa de rádio sobre mídia",
    "es": "En un programa de radio sobre medios, el conductor conversa con la defensora del lector de un diario sobre una queja reciente y sobre cómo los verbos y los resúmenes cambian lo que dice una noticia.",
    "speakers": [
     "Fábio (apresentador)",
     "Sônia (ouvidora de jornal)"
    ],
    "turns": [
     [
      "A",
      "Estamos de volta com o Mídia em Foco. A nossa convidada de hoje é a Sônia Albuquerque, ouvidora do Gazeta das Gerais, ou seja, a pessoa que recebe as críticas dos leitores e escreve uma coluna semanal avaliando o próprio jornal. Sônia, qual foi a reclamação que mais chamou a sua atenção este mês?"
     ],
     [
      "B",
      "Olha, Fábio, curiosamente não foi a de um leitor comum. Foi a de uma pesquisadora. O jornal publicou uma matéria sobre um estudo a respeito do sono dos adolescentes, e o título dizia: pesquisa prova que aula cedo derruba as notas. Ela escreveu indignada, porque o estudo não prova nada disso."
     ],
     [
      "A",
      "Mas então a matéria estava errada?"
     ],
     [
      "B",
      "O texto da matéria, em si, estava razoável. O problema estava no título e no resumo que foi para as redes sociais. A pesquisadora tinha dito, com todas as letras, que os dados não permitiam afirmar que o horário explica o desempenho. Ela sugeriu uma relação. O título transformou uma sugestão numa prova."
     ],
     [
      "A",
      "E isso acontece muito?"
     ],
     [
      "B",
      "Mais do que a gente gostaria. Às vezes é pressa, às vezes é a vontade de ter um título que chame atenção. Mas eu sempre digo aos repórteres: o verbo que você escolhe é uma opinião. Se eu escrevo que o ministro disse, eu estou apenas relatando. Se eu escrevo que ele admitiu, eu dou a entender que ele reconheceu algo negativo, que talvez preferisse esconder. E se eu escrevo que ele alegou, eu estou colocando em dúvida o que ele falou."
     ],
     [
      "A",
      "Então alegar não é sinônimo de dizer."
     ],
     [
      "B",
      "Não é, não. Alegar sugere que aquilo é uma justificativa, que pode ou não ser verdade. É um verbo muito usado em notícia policial, por exemplo: o suspeito alegou que estava em casa. Agora imagina usar alegar para um médico explicando um tratamento. O leitor vai desconfiar do médico sem nenhum motivo."
     ],
     [
      "A",
      "E revelar? Porque eu vejo revelar em todo lugar."
     ],
     [
      "B",
      "Esse é o meu preferido, de tão mal usado. Revelar é tornar público algo que estava escondido. Se uma atriz dá uma entrevista contando que gosta de praia, ela não revelou nada, ela contou. Mas revelar vende mais, né? Então todo mundo revela tudo o tempo todo."
     ],
     [
      "A",
      "E as aspas? Porque tem gente que acha que, se está entre aspas, está protegido."
     ],
     [
      "B",
      "Pois é, essa é outra armadilha. A citação entre aspas tem que ser fiel, palavra por palavra. Mas, mesmo fiel, ela pode enganar, se for tirada do contexto. Uma frase como isso pode ser perigoso, tirada de uma entrevista em que a pessoa dizia exatamente o contrário, vira outra coisa."
     ],
     [
      "A",
      "E o que o jornal fez no caso da pesquisadora?"
     ],
     [
      "B",
      "Corrigiu o título na versão digital e publicou uma nota de correção. Eu discuti o caso na minha coluna e propus uma regra simples para a redação: antes de resumir uma pesquisa, releia o que o pesquisador de fato afirmou. Se ele disse indica, não pode virar prova. Se ele disse pode, não pode virar vai."
     ],
     [
      "A",
      "Parece simples."
     ],
     [
      "B",
      "Parece, mas exige disciplina. Resumir é escolher, e toda escolha tem consequência. O bom resumo diz menos palavras, mas não diz outra coisa."
     ],
     [
      "A",
      "Uma grande frase para terminar. Sônia, muito obrigado."
     ],
     [
      "B",
      "Obrigada a você, Fábio."
     ]
    ],
    "gloss": {
     "ouvidora": "defensora del lector",
     "matéria": "nota, artículo periodístico",
     "derruba": "tira abajo, hunde",
     "pressa": "apuro",
     "alegou": "alegó, adujo",
     "suspeito": "sospechoso",
     "desconfiar": "desconfiar",
     "aspas": "comillas",
     "armadilha": "trampa",
     "fiel": "fiel, exacta",
     "redação": "redacción (de un diario)",
     "releia": "releé"
    },
    "questions": [
     [
      "Qual é a função de Sônia no jornal?",
      [
       "Escrever os títulos das matérias de ciência.",
       "Receber críticas dos leitores e avaliar o jornal.",
       "Coordenar a equipe de repórteres da redação.",
       "Revisar a ortografia de todos os textos antes da publicação."
      ],
      "Receber críticas dos leitores e avaliar o jornal."
     ],
     [
      "Por que a pesquisadora reclamou?",
      [
       "O jornal publicou o nome dela de forma errada.",
       "A matéria inteira distorceu os dados do estudo.",
       "O título transformou uma sugestão numa prova.",
       "O jornal se recusou a entrevistá-la sobre o estudo."
      ],
      "O título transformou uma sugestão numa prova."
     ],
     [
      "Segundo Sônia, o que o verbo “alegar” faz numa notícia?",
      [
       "Põe em dúvida o que a pessoa disse.",
       "Indica que a pessoa confessou um erro grave.",
       "Mostra a total neutralidade do jornalista.",
       "Revela uma informação que estava escondida."
      ],
      "Põe em dúvida o que a pessoa disse."
     ],
     [
      "Por que Sônia critica o uso frequente de “revelar”?",
      [
       "Porque é um verbo informal demais para um jornal sério.",
       "Porque se aplica a coisas que não eram segredo.",
       "Porque só deveria aparecer em notícias policiais.",
       "Porque a maioria dos leitores não entende o seu sentido."
      ],
      "Porque se aplica a coisas que não eram segredo."
     ],
     [
      "O que Sônia quer dizer com “o bom resumo diz menos palavras, mas não diz outra coisa”?",
      [
       "Que um bom resumo deve ter o menor número possível de palavras.",
       "Que o resumo pode incluir a opinião de quem o escreve.",
       "Que resumir é reduzir sem alterar o sentido.",
       "Que o resumo deve evitar qualquer citação direta."
      ],
      "Que resumir é reduzir sem alterar o sentido."
     ]
    ],
    "vf": [
     [
      "O jornal corrigiu o título na versão digital.",
      "verdadeiro"
     ],
     [
      "Segundo Sônia, o texto da matéria também estava cheio de erros.",
      "falso"
     ],
     [
      "A pesquisadora pediu que o repórter fosse demitido.",
      "não se diz"
     ],
     [
      "Para Sônia, uma citação fiel entre aspas nunca pode enganar o leitor.",
      "falso"
     ]
    ]
   },
   "compito": {
    "genre": "resumo",
    "title": "Aula mais tarde? O que diz a pesquisa",
    "fonte": "lettura",
    "t": "Você faz parte do conselho de pais de uma escola estadual de Belo Horizonte, que está discutindo a possibilidade de mudar o horário de entrada das aulas. A direção pediu que você escreva, para o boletim informativo da escola, um resumo da reportagem “Sono, telas e o sinal das sete”, para que todas as famílias conheçam o assunto antes da próxima reunião. O resumo deve apresentar o estudo, os seus principais resultados, as posições favoráveis e contrárias à mudança e as recomendações dos pesquisadores, sem acrescentar a sua opinião. Não se esqueça de reformular com as suas palavras (sem copiar frases do texto) e de usar verbos de dizer precisos para atribuir cada ideia à sua fonte. Registro formal. Seu texto deve ter entre 233 e 293 palavras.",
    "es": "Resumen objetivo para el boletín de la escuela: estudio, resultados, posturas a favor y en contra, recomendaciones. Sin opinión propia, reformulando y atribuyendo cada idea con verbos precisos (admite, advierte, sostiene…).",
    "min": 233,
    "max": 293,
    "punti": [
     [
      "Presentar el estudio: quién lo hizo y con quiénes",
      [
       "estudo",
       "pesquisa",
       "1.200",
       "ensino médio"
      ]
     ],
     [
      "Resultados principales: horas de sueño y reloj biológico",
      [
       "seis horas",
       "relógio biológico",
       "dorm"
      ]
     ],
     [
      "Posturas en contra o con reservas (director, familias, pediatra)",
      [
       "diretor",
       "pediatra",
       "consenso"
      ]
     ],
     [
      "Recomendaciones de los investigadores",
      [
       "piloto",
       "recomend",
       "provas"
      ]
     ],
     [
      "Atribuir con verbos de decir precisos",
      [
       "admite",
       "adverte",
       "sustenta",
       "reconhece",
       "ressalta"
      ]
     ]
    ],
    "model": "Aula mais tarde? O que diz a pesquisa sobre o sono dos adolescentes\n\nUma reportagem publicada recentemente apresenta os resultados de um estudo realizado por pesquisadores de uma universidade pública mineira com cerca de 1.200 alunos do ensino médio. De acordo com o levantamento, os estudantes que têm aula de manhã dormem, nos dias letivos, em média seis horas e quarenta minutos, bem abaixo das oito a dez horas recomendadas para essa idade.\n\nA coordenadora da pesquisa, Beatriz Lacerda, explica que isso não se deve apenas à preguiça ou às telas: na adolescência, o relógio biológico atrasa naturalmente, e o jovem só sente sono perto da meia-noite. O estudo também constatou que os alunos que entram às oito horas ou mais tarde dormem cerca de quarenta minutos a mais. A pesquisadora admite, no entanto, que os dados não permitem afirmar que o horário, sozinho, explique as diferenças de desempenho.\n\nA proposta de atrasar o início das aulas não é consenso. O diretor de uma escola estadual que participou do estudo adverte que muitos alunos trabalham ou cuidam de irmãos à tarde, e representantes de pais lembram que o horário escolar depende do trabalho das famílias e do transporte. Um pediatra, por sua vez, defende que o foco seja o uso do celular à noite; Lacerda reconhece que as telas agravam o problema, mas sustenta que o atraso é biológico.\n\nPor fim, os pesquisadores sugerem experiências-piloto, em vez de uma regra nacional, e recomendam medidas simples: evitar provas nos primeiros horários, reservar as primeiras aulas para atividades menos exigentes e conversar com alunos e famílias sobre a importância do sono."
   }
  },
  {
   "week": 49,
   "level": "C1",
   "lettura": {
    "title": "Tá bom ou está bem? Elogio da adequação",
    "emoji": "🎚️",
    "genre": "ensaio",
    "grammar": "registro culto e coloquial",
    "text": "Todo brasileiro alfabetizado já passou pela experiência de reescrever uma mensagem três vezes antes de enviá-la. Na primeira versão, saiu um “oi, tudo bem? então, vc pode me mandar aquele arquivo?”; na segunda, um “Prezado Sr. Mendes, venho por meio desta solicitar o envio do referido documento”; na terceira, algo no meio do caminho, que talvez nem soe natural. A hesitação tem nome: registro. E, contrariando o que muita gente aprendeu na escola, ela não revela ignorância, mas uma competência sofisticada — a de perceber que a língua muda conforme a situação, o interlocutor e o meio.\n\nOs linguistas costumam descrever o registro como uma escala que vai do mais formal ao mais informal, com muitos pontos intermediários. No extremo culto, estão os discursos solenes, os textos jurídicos e os artigos acadêmicos: frases longas, vocabulário preciso, pronomes colocados segundo a norma, às vezes com construções como “dir-se-ia” ou “entregar-lhe-ei”, que hoje soam quase arcaicas mesmo nesses contextos. No extremo coloquial, estão a conversa de bar, o áudio de WhatsApp e a piada entre amigos: frases curtas, reduções como tô, tá, pra e cê, gírias, repetições e o onipresente né no fim de cada ideia. Entre um extremo e outro, fica a maior parte da vida real: a reunião de trabalho, a consulta médica, o e-mail para um professor.\n\nO português do Brasil tem uma particularidade que confunde estrangeiros e até nativos: a distância entre a língua falada e a escrita formal é considerável. Na fala espontânea, quase ninguém diz “nós iremos”; diz “a gente vai”. Ninguém pergunta “Onde o senhor se encontra?” a um amigo, e sim “Cadê você?”, ou até “Cê tá onde?”. O pronome vem antes do verbo (“me passa o sal”), o verbo ter substitui o haver (“tem muita gente aqui”) e o pronome ele aparece como objeto (“vi ele ontem”). Na escrita formal, porém, a norma pede “Passe-me o sal”, “Há muita gente aqui” e “Eu o vi ontem”. Não se trata de uma versão certa e outra errada, mas de duas gramáticas que convivem e que o falante competente alterna quase sem perceber.\n\nO problema, portanto, não está no uso do coloquial, mas no uso fora de lugar. Um estagiário que escreve a um cliente “e aí, beleza? a proposta vai atrasar um pouquinho, mas relaxa” não comete propriamente um erro gramatical; comete um erro de adequação, talvez mais grave, porque compromete a imagem da empresa. Do mesmo modo, quem responde ao “bora tomar um açaí?” de um amigo com “Agradeço imensamente o gentil convite, ao qual comparecerei com satisfação” provoca risos ou, no mínimo, estranhamento. O excesso de formalidade também é inadequação, só que costuma ser menos criticado.\n\nAs novas tecnologias embaralharam ainda mais as fronteiras. O e-mail, que nasceu como herdeiro da carta, foi ficando mais leve; o WhatsApp, que nasceu para conversas pessoais, virou ferramenta de trabalho em muitas empresas. Hoje, não é raro receber um áudio do chefe às onze da noite, com direito a “oi, gente” e “tipo assim”, pedindo um relatório para a manhã seguinte. Nesse território novo, as regras ainda estão sendo negociadas, e é natural que cada geração tenha a sua opinião. Muitos jovens acham antiquado um e-mail que começa com “Prezado”; muitos gestores consideram desrespeitoso um “blz” vindo de um subordinado.\n\nDurante muito tempo, a escola brasileira tratou o coloquial como um desvio a ser corrigido. O aluno que dizia “nós vai” ou “os menino” ouvia que falava errado e aprendia, sobretudo, a ter vergonha da própria fala e da fala da sua família. Hoje, boa parte dos linguistas e dos documentos oficiais de educação defende outra abordagem: a da adequação. Em vez de apagar a variedade que o aluno traz de casa, a escola deve ampliar o seu repertório, ensinando a norma culta como uma ferramenta a mais, indispensável em certas situações, e não como a única forma legítima de falar.\n\nPara quem aprende português como língua estrangeira, essa discussão tem consequências bem práticas. Muitos alunos chegam ao Brasil com um português de livro didático, correto, mas rígido, e descobrem que ninguém fala daquele jeito. Outros aprendem na rua, com amigos, e se veem em apuros na hora de escrever uma carta de apresentação ou de enfrentar uma entrevista de emprego. O objetivo, em ambos os casos, é o mesmo: circular com segurança pela escala inteira, sabendo quando baixar e quando subir o tom.\n\nNo fundo, dominar os registros é uma forma de respeito: pelo interlocutor, pela situação e pela própria língua, que é mais rica justamente porque não fala sempre do mesmo modo. Quem sabe escrever “Atenciosamente” e também “bjs, até amanhã” não é um falante dividido, mas um falante completo. E quem hesita três vezes antes de enviar uma mensagem, longe de ser inseguro, talvez seja apenas alguém que leva a sério a arte de se comunicar.",
    "gloss": {
     "hesitação": "vacilación, duda",
     "referido": "mencionado",
     "solenes": "solemnes",
     "arcaicas": "arcaicas, anticuadas",
     "piada": "chiste",
     "gírias": "jerga, modismos",
     "onipresente": "omnipresente",
     "cadê": "¿dónde está?",
     "estagiário": "pasante",
     "bora": "¡vamos! (coloquial)",
     "comparecerei": "asistiré",
     "estranhamento": "extrañeza",
     "embaralharam": "mezclaron, entreveraron",
     "herdeiro": "heredero",
     "ferramenta": "herramienta",
     "relatório": "informe",
     "antiquado": "anticuado",
     "gestores": "gerentes",
     "blz": "“beleza”: todo bien (abreviatura)",
     "subordinado": "subordinado",
     "desvio": "desvío",
     "vergonha": "vergüenza",
     "abordagem": "enfoque",
     "apuros": "aprietos",
     "bjs": "besos (abreviatura)"
    },
    "questions": [
     [
      "Qual é a tese central do ensaio?",
      [
       "O registro coloquial está destruindo a norma culta no Brasil.",
       "Adequar a língua à situação é uma competência valiosa.",
       "A escrita formal deveria desaparecer das empresas brasileiras.",
       "Os estrangeiros deveriam aprender apenas o português da rua."
      ],
      "Adequar a língua à situação é uma competência valiosa."
     ],
     [
      "Segundo o texto, qual é a particularidade do português do Brasil?",
      [
       "A ausência de registro coloquial nos textos escritos.",
       "O uso frequente da mesóclise na fala cotidiana.",
       "A grande distância entre a fala e a escrita formal.",
       "A rejeição geral das gírias nos meios de comunicação."
      ],
      "A grande distância entre a fala e a escrita formal."
     ],
     [
      "Por que o autor menciona a resposta formal ao convite para tomar açaí?",
      [
       "Para elogiar a educação de quem responde assim.",
       "Para mostrar que o excesso de formalidade também é inadequado.",
       "Para criticar o uso de gírias entre amigos íntimos.",
       "Para exemplificar um erro gramatical muito comum."
      ],
      "Para mostrar que o excesso de formalidade também é inadequado."
     ],
     [
      "De acordo com o texto, o que a escola deveria fazer hoje?",
      [
       "Corrigir toda forma coloquial que o aluno usar em sala de aula.",
       "Ensinar apenas a variedade que o aluno traz de casa.",
       "Eliminar a norma culta dos currículos escolares do país.",
       "Ampliar o repertório do aluno sem apagar a sua variedade."
      ],
      "Ampliar o repertório do aluno sem apagar a sua variedade."
     ],
     [
      "Como o autor interpreta, no final, quem hesita antes de enviar uma mensagem?",
      [
       "Como alguém que leva a comunicação a sério.",
       "Como um falante inseguro e dividido entre duas línguas.",
       "Como alguém que ainda não domina a norma culta.",
       "Como um usuário que exagera nas formalidades."
      ],
      "Como alguém que leva a comunicação a sério."
     ]
    ],
    "vf": [
     [
      "Segundo o texto, formas como “dir-se-ia” soam quase arcaicas até em contextos formais.",
      "verdadeiro"
     ],
     [
      "O autor considera que o estagiário do exemplo cometeu um erro gramatical.",
      "falso"
     ],
     [
      "O autor trabalha como professor de português para estrangeiros.",
      "não se diz"
     ],
     [
      "Para o autor, o WhatsApp continua sendo usado apenas em conversas pessoais.",
      "falso"
     ],
     [
      "O texto afirma que muitos gestores consideram “blz” desrespeitoso.",
      "verdadeiro"
     ]
    ],
    "hunt": {
     "label": "Tocá las formas del registro coloquial (reducciones, abreviaturas y palabras típicas de la charla informal)",
     "targets": [
      "vc",
      "tô",
      "tá",
      "pra",
      "cê",
      "né",
      "cadê",
      "beleza",
      "bora",
      "blz"
     ]
    }
   },
   "ascolto": {
    "title": "Ser formal não é ser frio",
    "genre": "conversa de trabalho",
    "es": "En una agencia digital, una gerente conversa con un pasante que le mandó a un cliente importante un mensaje demasiado informal; le explica qué falló y qué tiene que tener la respuesta.",
    "speakers": [
     "Renata (gerente)",
     "Lucas (estagiário)"
    ],
    "turns": [
     [
      "A",
      "Lucas, senta aí. Fica tranquilo, não é bronca, tá? É só uma conversa."
     ],
     [
      "B",
      "Tá bom. É sobre o e-mail do Otávio, né? Eu imaginei."
     ],
     [
      "A",
      "É. Ele me ligou hoje de manhã. Não estava bravo, mas estava, digamos, surpreso. Você lembra o que escreveu pra ele?"
     ],
     [
      "B",
      "Lembro. Eu falei que a proposta ia atrasar um pouquinho, porque o financeiro ainda estava fechando os custos, mas que até sexta saía. Eu só quis ser simpático, Renata. Ele sempre foi super educado comigo nas reuniões."
     ],
     [
      "A",
      "Eu sei, e isso é ótimo. O problema não foi a informação, foi o jeito. Você começou com oi, Otávio, blz, abreviou tudo, disse que o financeiro tava enrolado e terminou com relaxa. Pra um amigo, perfeito. Pra um diretor de compras de uma rede de farmácias, que está esperando uma proposta formal da nossa empresa, soou como se a gente não estivesse levando o projeto a sério."
     ],
     [
      "B",
      "Nossa, falando assim… Mas o pessoal aqui do escritório escreve desse jeito o tempo todo."
     ],
     [
      "A",
      "Aqui dentro, entre a gente, tudo bem. Com cliente é outra história. Pensa assim: quando você fala com o Otávio numa reunião, você não fala do mesmo jeito que fala com o seu primo no churrasco, fala?"
     ],
     [
      "B",
      "Não, claro que não."
     ],
     [
      "A",
      "Pois então. Escrever é a mesma coisa, só que pior, porque no texto não tem sorriso, não tem tom de voz. Um relaxa, no WhatsApp com um amigo, é carinhoso. Num e-mail para um cliente que está esperando um documento, pode parecer que você está dizendo: calma, você está exagerando."
     ],
     [
      "B",
      "Entendi. E ele respondeu bem seco: prezado Lucas, aguardo posicionamento formal da empresa. Eu fiquei sem saber o que fazer."
     ],
     [
      "A",
      "Por isso eu quero que você mesmo responda. Acho importante. Vou te passar o que precisa ter. Primeiro, um pedido de desculpas pelo atraso e pelo tom da mensagem anterior, sem exagero, sem drama. Segundo, a explicação: a proposta está na etapa de validação de custos pelo departamento financeiro. Não fala que o financeiro está enrolado. Fala que é uma etapa necessária para garantir valores precisos."
     ],
     [
      "B",
      "Certo. E o prazo?"
     ],
     [
      "A",
      "Sexta-feira, até as dezoito horas. Esse prazo eu já confirmei com o financeiro, pode prometer. E terceiro: ofereça uma videoconferência na segunda-feira seguinte, para a gente apresentar a proposta e tirar as dúvidas da equipe dele. Isso mostra compromisso."
     ],
     [
      "B",
      "E como eu começo? Prezado senhor Otávio?"
     ],
     [
      "A",
      "Prezado senhor Otávio Mendes, ou só prezado Otávio, porque vocês já se conhecem. Mas nada de oi. No final, atenciosamente, o seu nome completo e o seu cargo. E me coloca em cópia, por favor."
     ],
     [
      "B",
      "E se eu ficar formal demais? Tipo, venho por meio desta… Não vai parecer um robô escrevendo?"
     ],
     [
      "A",
      "Boa pergunta. Não precisa ir para o outro extremo. Nada de venho por meio desta, nada de frase de cartório. Frases claras, completas, sem gíria e sem abreviação. Pensa num texto que você poderia ler em voz alta na frente do Otávio e do diretor da nossa empresa sem ficar com vergonha. Esse é o tom."
     ],
     [
      "B",
      "Tá. Renata, desculpa mesmo. Eu achava que ser formal era ser frio."
     ],
     [
      "A",
      "Olha, essa foi a coisa mais importante que você disse hoje. Ser formal não é ser frio. Dá para ser cordial e profissional ao mesmo tempo. Aliás, é exatamente isso que o Otávio espera da gente."
     ],
     [
      "B",
      "Vou escrever agora e te mostro antes de mandar, pode ser?"
     ],
     [
      "A",
      "Perfeito. Pode ir."
     ]
    ],
    "gloss": {
     "bronca": "reto, llamado de atención",
     "bravo": "enojado",
     "enrolado": "complicado, atrasado con sus cosas",
     "relaxa": "tranqui, relajá",
     "churrasco": "asado",
     "seco": "seco, cortante",
     "posicionamento": "respuesta oficial, postura",
     "prazo": "plazo",
     "validação": "validación, aprobación",
     "compromisso": "compromiso",
     "cargo": "puesto",
     "cópia": "copia (en un e-mail)",
     "cartório": "escribanía"
    },
    "questions": [
     [
      "Qual foi, segundo Renata, o problema da mensagem de Lucas?",
      [
       "A informação sobre o atraso estava errada.",
       "O tom era informal demais para um cliente.",
       "Lucas prometeu um prazo sem consultar ninguém.",
       "Lucas enviou a mensagem para a pessoa errada."
      ],
      "O tom era informal demais para um cliente."
     ],
     [
      "Por que Renata diz que escrever é “a mesma coisa, só que pior”?",
      [
       "Porque os clientes leem os e-mails com pressa e sem atenção.",
       "Porque no texto não há sorriso nem tom de voz para suavizar.",
       "Porque os erros de ortografia são mais graves que os de fala.",
       "Porque um e-mail pode ser encaminhado a outras pessoas."
      ],
      "Porque no texto não há sorriso nem tom de voz para suavizar."
     ],
     [
      "Como Lucas deve explicar o motivo do atraso?",
      [
       "Dizendo que o financeiro está enrolado.",
       "Pedindo que Otávio tenha paciência.",
       "Como uma etapa necessária de validação.",
       "Culpando a própria inexperiência de estagiário."
      ],
      "Como uma etapa necessária de validação."
     ],
     [
      "Qual é o objetivo da videoconferência proposta?",
      [
       "Substituir o envio da proposta por escrito.",
       "Apresentar a proposta e esclarecer dúvidas.",
       "Negociar um desconto para compensar o atraso.",
       "Apresentar Renata como a nova responsável pela conta."
      ],
      "Apresentar a proposta e esclarecer dúvidas."
     ],
     [
      "O que Lucas percebe no final da conversa?",
      [
       "Que é possível ser cordial e formal ao mesmo tempo.",
       "Que deveria ter deixado Renata responder ao cliente.",
       "Que Otávio não gosta de conversar com estagiários.",
       "Que nunca mais deve usar o WhatsApp no trabalho."
      ],
      "Que é possível ser cordial e formal ao mesmo tempo."
     ]
    ],
    "vf": [
     [
      "Otávio ligou para Renata porque ficou surpreso com o e-mail de Lucas.",
      "verdadeiro"
     ],
     [
      "Renata vai escrever pessoalmente a resposta ao cliente.",
      "falso"
     ],
     [
      "Lucas já trabalhou antes com outros clientes do setor farmacêutico.",
      "não se diz"
     ],
     [
      "Renata ainda não confirmou o novo prazo com o financeiro.",
      "falso"
     ]
    ]
   },
   "compito": {
    "genre": "carta_formal",
    "title": "Resposta ao cliente",
    "fonte": "ascolto",
    "t": "Você é Lucas, estagiário de uma agência digital. Após ouvir a conversa com a sua gerente, Renata, escreva o e-mail formal de resposta ao senhor Otávio Mendes, diretor de compras da rede de farmácias cliente, que respondeu à sua mensagem anterior pedindo um “posicionamento formal da empresa”. No seu e-mail, siga as orientações de Renata: peça desculpas pelo atraso e pelo tom da mensagem anterior, explique o motivo do atraso de forma profissional, informe o novo prazo de entrega da proposta e ofereça a videoconferência. Não se esqueça de incluir assunto, vocativo e fecho adequados ao registro formal e de assinar com nome e cargo. Seu texto deve ter entre 239 e 299 palavras.",
    "es": "E-mail formal de respuesta al cliente con los datos del audio: disculpas, motivo (validación de costos), nuevo plazo (viernes, 18 h) y videoconferencia el lunes. Cuidá el registro culto: nada de “oi”, “relaxa” ni abreviaturas.",
    "min": 239,
    "max": 299,
    "punti": [
     [
      "Pedir disculpas por el atraso y por el tono",
      [
       "desculpa",
       "lament"
      ]
     ],
     [
      "Explicar el motivo: validación de costos por el área financiera",
      [
       "validação",
       "financeiro",
       "custos"
      ]
     ],
     [
      "Informar el nuevo plazo (viernes, 18 h)",
      [
       "sexta"
      ]
     ],
     [
      "Ofrecer la videoconferencia del lunes",
      [
       "videoconferência",
       "reunião"
      ]
     ],
     [
      "Registro formal: vocativo y cierre",
      [
       "prezado",
       "atenciosamente",
       "cordialmente"
      ]
     ]
    ],
    "model": "Assunto: Proposta comercial – novo prazo de entrega\n\nPrezado Sr. Otávio Mendes,\n\nEm primeiro lugar, gostaria de pedir desculpas pelo atraso na entrega da nossa proposta e, também, pelo tom inadequado da minha mensagem anterior, que não refletiu o cuidado e a seriedade com que a nossa empresa tem conduzido este projeto, nem o respeito que temos pela sua rede e pela sua equipe.\n\nInformo que a proposta se encontra, no momento, na etapa de validação de custos pelo nosso departamento financeiro. Trata-se de um procedimento necessário para garantirmos que todos os valores apresentados sejam precisos e definitivos, evitando revisões posteriores que poderiam causar novos transtornos à sua equipe.\n\nDiante disso, comprometemo-nos a enviar-lhe a versão final da proposta até a próxima sexta-feira, às 18 horas. Esse prazo já foi confirmado junto ao departamento responsável. Ressalto que a proposta contemplará todos os pontos discutidos em nossa última reunião, incluindo o cronograma de implantação.\n\nAlém disso, gostaríamos de sugerir uma videoconferência na segunda-feira seguinte, em horário de sua conveniência, para apresentarmos a proposta em detalhes e esclarecermos eventuais dúvidas da sua equipe. Caso a data não lhe seja favorável, teremos prazer em propor outras opções.\n\nReitero as nossas desculpas pelo inconveniente e agradeço, desde já, a sua compreensão. Permaneço à disposição para qualquer esclarecimento que se faça necessário, por telefone ou por este endereço de e-mail. Informo, ainda, que a nossa gerente de contas, Renata Campos, está em cópia nesta mensagem e acompanhará pessoalmente as próximas etapas do projeto.\n\nAtenciosamente,\n\nLucas Ferraz\nEstagiário de Atendimento ao Cliente\nAgência Horizonte Digital"
   }
  },
  {
   "week": 50,
   "level": "C1",
   "lettura": {
    "title": "“Quem aprende ao pé da letra acaba pisando na bola”",
    "emoji": "📖",
    "genre": "entrevista (pingue-pongue)",
    "grammar": "colocações e expressões idiomáticas",
    "text": "Há quase vinte anos, Marta Siqueira coleciona expressões idiomáticas como quem coleciona figurinhas. Professora de português para estrangeiros em Porto Alegre, ela acaba de lançar um dicionário de expressões do português do Brasil pensado para falantes de espanhol, com explicações, exemplos reais e comparações com o castelhano do Rio da Prata. Nesta entrevista, conta por que essas expressões são, ao mesmo tempo, o maior pesadelo e a maior diversão dos seus alunos.\n\nPor que um dicionário só de expressões?\n\nPorque é aí que o aluno tropeça. Uma palavra isolada quase sempre tem equivalente. Uma expressão, não. O aluno argentino chega ao nível avançado, lê jornal, acompanha as aulas na faculdade e, de repente, ouve um colega dizer que o vizinho bateu as botas. Entende cada palavra e não entende nada. Ou, pior, entende exatamente o contrário. Quem conhece o inglês “kick the bucket” pode achar que chutar o balde também é morrer, mas em português é outra coisa: é desistir de tudo, perder a paciência de vez. Nos livros didáticos, as expressões costumam aparecer numa listinha no fim da unidade, sem contexto nenhum, e quem paga o pato é o aluno, que decora sem saber quando usar.\n\nComo vocês escolhem o que entra?\n\nO critério é o uso. Não adianta registrar uma expressão que só aparece em romance do século dezenove. A equipe ouviu rádio, leu comentários nas redes, gravou conversas em feiras e em pontos de ônibus. Se uma expressão aparece em várias regiões, em várias faixas de idade e em vários tipos de situação, ela entra. Pisar na bola, por exemplo, que é cometer um erro, decepcionar alguém, entrou na hora. Enfiar o pé na jaca, que é exagerar, sobretudo na comida ou na bebida, também. E cair a ficha, que é quando a gente finalmente entende alguma coisa. Essa é linda, porque vem do tempo dos orelhões, que funcionavam com fichas: a ligação só se completava quando elas caíam. Hoje, muitos jovens usam a expressão sem ter a menor ideia de onde ela vem.\n\nO dicionário também trata de colocações. O que são?\n\nSão combinações de palavras que simplesmente andam juntas numa língua, sem uma lógica muito clara. Em português, a gente toma uma decisão, faz uma pergunta, presta atenção, comete um erro. Algumas coincidem com o espanhol, outras não. O brasileiro toma um susto, enquanto o argentino “se lleva” um; tira uma foto, enquanto o argentino “saca”; faz aniversário, enquanto o hispanofalante “cumple” anos; marca uma consulta, enquanto o portenho “saca turno”. O estrangeiro que diz “cumprir anos” ou “sacar uma foto” é entendido, claro, mas denuncia na hora que não é nativo. Numa entrevista de emprego ou numa redação de vestibular, uma colocação errada chama tanta atenção quanto um erro de ortografia.\n\nExiste alguma expressão realmente intraduzível?\n\nIntraduzível, não sei, mas algumas dão muito trabalho. Uma que sempre me tira o sono é sem eira nem beira, que quer dizer sem recurso nenhum, e cuja origem nem os próprios brasileiros sabem explicar direito. Outras têm sorte: fazer uma vaquinha, que é juntar dinheiro entre amigos para comprar alguma coisa, tem um primo perfeito na Argentina, “hacer una vaca”, com a mesma imagem. Quando não existe equivalente, a gente dá um jeito: explica o sentido com palavras simples, mostra dois ou três exemplos reais e, se possível, conta a origem. O que não pode é inventar um equivalente forçado.\n\nVocê já pisou na bola com uma expressão?\n\nJá, e feio, só que em espanhol. Quando fiz mestrado em Buenos Aires, contei a uma amiga que tinha “pisado la pelota” numa reunião com o orientador, querendo dizer que tinha feito besteira. Ela me deu os parabéns. Só dias depois me caiu a ficha: no futebol argentino, “pisar la pelota” é ter calma, dominar o jogo. Eu tinha dito exatamente o contrário do que queria. Ela riu muito, e eu virei piada no grupo durante o semestre inteiro. Aprendi a lição. Hoje, quando uma frase soa estranha demais, desconfio, pesquiso e, se for preciso, pergunto a um falante nativo.\n\nPor que os brasileiros usam tantas expressões?\n\nPorque elas são econômicas e expressivas ao mesmo tempo. “Deu com a língua nos dentes” é bem mais curto e mais saboroso do que “contou um segredo que não devia ter contado”. Numa conversa, ninguém gosta de encher linguiça: a expressão resume uma situação inteira e ainda diz o que o falante pensa dela. Por isso mesmo, elas mudam o tempo todo. Todo ano aparecem expressões novas, e algumas desaparecem sem deixar rastro.\n\nQue conselho você daria a quem aprende português e quer dominar essas expressões?\n\nQue não tente decorar listas, nem o meu dicionário, que foi feito para consultar, não para decorar. Expressão idiomática se aprende no contexto: ouvindo, lendo, vendo série, conversando. E que tenha coragem de usar. Vai errar? Vai. Vai trocar uma palavra, dizer “pisar no pé” em vez de “pisar na bola”. Faz parte. Mas, no dia em que você usar “quebrar o galho” no lugar certo e o brasileiro sorrir, vai sentir que está tirando o português de letra. Quer dizer: quase.\n\nA revista convida os leitores a enviar os seus relatos de mal-entendidos com expressões idiomáticas para a seção Tropeços da Língua. Os melhores textos serão publicados na próxima edição.",
    "gloss": {
     "pesadelo": "pesadilla",
     "tropeça": "tropieza",
     "botas": "botas (bater as botas = estirar la pata)",
     "balde": "balde (chutar o balde = mandar todo al diablo)",
     "desistir": "abandonar, rendirse",
     "decora": "memoriza",
     "pato": "pato (pagar o pato = pagar los platos rotos)",
     "adianta": "sirve (não adianta = no sirve de nada)",
     "faixas": "franjas (faixa de idade = franja etaria)",
     "decepcionar": "decepcionar, fallarle a alguien",
     "enfiar": "meter",
     "jaca": "jaca, fruta tropical (enfiar o pé na jaca = zarparse)",
     "orelhões": "teléfonos públicos",
     "ficha": "cospel (cair a ficha = caer la ficha)",
     "denuncia": "delata",
     "eira": "era, patio (sem eira nem beira = sin un peso)",
     "vaquinha": "vaquita (fazer uma vaquinha = hacer una vaca)",
     "jeito": "manera (dar um jeito = arreglárselas)",
     "feio": "feo, mal",
     "besteira": "macana, pavada",
     "piada": "chiste (virar piada = ser el hazmerreír)",
     "dentes": "dientes (dar com a língua nos dentes = irse de boca)",
     "linguiça": "longaniza (encher linguiça = meter relleno, hacer paja)",
     "rastro": "rastro",
     "decorar": "memorizar",
     "galho": "rama (quebrar o galho = sacar de un apuro)",
     "letra": "letra (tirar de letra = hacer algo con facilidad)",
     "tropeços": "tropiezos"
    },
    "questions": [
     [
      "Por que, segundo Marta, as expressões idiomáticas são o “maior pesadelo” dos alunos?",
      [
       "Porque só aparecem em romances antigos.",
       "Porque raramente têm equivalente palavra por palavra.",
       "Porque os professores proíbem o seu uso em sala de aula.",
       "Porque são vulgares demais para a língua escrita."
      ],
      "Porque raramente têm equivalente palavra por palavra."
     ],
     [
      "Qual é o critério para uma expressão entrar no dicionário?",
      [
       "Ter uma origem conhecida e bem documentada.",
       "Ter um equivalente exato no espanhol do Rio da Prata.",
       "Aparecer em romances clássicos da literatura brasileira.",
       "Ser usada em várias regiões, idades e situações."
      ],
      "Ser usada em várias regiões, idades e situações."
     ],
     [
      "Segundo Marta, o que acontece com o estrangeiro que erra uma colocação?",
      [
       "É entendido, mas revela que não é nativo.",
       "Não é entendido pela maioria dos brasileiros.",
       "Comete um erro gramatical considerado grave.",
       "Parece muito mais formal do que deveria."
      ],
      "É entendido, mas revela que não é nativo."
     ],
     [
      "O que o episódio de “pisar la pelota”, em Buenos Aires, ilustra?",
      [
       "Que o futebol é o assunto preferido dos argentinos.",
       "Que a mesma imagem pode ter sentidos quase opostos em duas línguas.",
       "Que o orientador de Marta era exigente demais com os alunos.",
       "Que os argentinos têm dificuldade para entender o português."
      ],
      "Que a mesma imagem pode ter sentidos quase opostos em duas línguas."
     ],
     [
      "Segundo Marta, por que os brasileiros usam tantas expressões idiomáticas?",
      [
       "Porque a norma culta as exige nos textos mais formais.",
       "Porque são fáceis de traduzir para outras línguas.",
       "Porque resumem uma situação e mostram o que o falante pensa dela.",
       "Porque aparecem em listas nos livros didáticos."
      ],
      "Porque resumem uma situação e mostram o que o falante pensa dela."
     ]
    ],
    "vf": [
     [
      "O dicionário de Marta foi pensado para falantes de espanhol.",
      "verdadeiro"
     ],
     [
      "Segundo Marta, “chutar o balde” significa morrer.",
      "falso"
     ],
     [
      "A expressão “cair a ficha” vem da época dos telefones públicos.",
      "verdadeiro"
     ],
     [
      "Marta recomenda que os alunos decorem o dicionário dela.",
      "falso"
     ],
     [
      "O dicionário de Marta também será lançado na Argentina.",
      "não se diz"
     ]
    ],
    "hunt": {
     "label": "Tocá la palabra clave (el sustantivo que da la imagen) de cada expresión idiomática",
     "targets": [
      "balde",
      "botas",
      "jeito",
      "bola",
      "jaca",
      "ficha",
      "pato",
      "linguiça",
      "dentes",
      "galho",
      "letra"
     ]
    }
   },
   "ascolto": {
    "title": "O casamento em que tudo deu errado",
    "genre": "conversa entre amigos",
    "es": "Dos amigos se encuentran en un café: él, organizador de eventos, le cuenta a ella cómo fue el casamiento que organizó el fin de semana.",
    "speakers": [
     "Carol",
     "Bruno"
    ],
    "turns": [
     [
      "A",
      "Bruno! Finalmente! Achei que você tinha desistido do nosso café. Nossa, que cara é essa?"
     ],
     [
      "B",
      "Nem me fala, Carol. Passei o fim de semana inteiro de cabelo em pé. Lembra do casamento que eu estava organizando lá em Petrópolis?"
     ],
     [
      "A",
      "Claro, o da prima da Juliana. Era ontem, né? Deu tudo certo?"
     ],
     [
      "B",
      "Certo? Olha, se alguma coisa podia dar errado, deu. Pra começar, o bufê pisou na bola feio. Às dez da manhã me ligaram dizendo que o caminhão tinha quebrado na serra e que a comida só chegaria à noite."
     ],
     [
      "A",
      "Não acredito! E a festa era que horas?"
     ],
     [
      "B",
      "Às quatro da tarde. Aí, você sabe, não tinha tempo para chorar. Tive que dar um jeito. Liguei para uma amiga que tem um restaurante lá perto e pedi, pelo amor de Deus, que ela quebrasse o meu galho."
     ],
     [
      "A",
      "E ela topou?"
     ],
     [
      "B",
      "Topou, mas custou os olhos da cara. Salgadinhos, sanduíches, uma massa… Não era o cardápio que os noivos tinham escolhido, mas ninguém passou fome."
     ],
     [
      "A",
      "E quem pagou essa conta?"
     ],
     [
      "B",
      "Por enquanto, eu. Adiantei do meu bolso, porque não dava para esperar a boa vontade de ninguém. Depois vou acertar com o bufê. Mas, sinceramente, naquela hora eu nem pensei em dinheiro. Só pensava nos cento e cinquenta convidados chegando e nas mesas vazias."
     ],
     [
      "A",
      "Imagino o desespero. E o bufê não deu nenhuma satisfação?"
     ],
     [
      "B",
      "Deu, mas tarde demais. O dono me ligou às duas da tarde, todo sem graça, pedindo mil desculpas e sugerindo que a gente fizesse vista grossa para a multa do contrato. Quer dizer, ele queria que eu esquecesse o contrato, né? Nem pensar."
     ],
     [
      "A",
      "Menos mal. E os noivos perceberam?"
     ],
     [
      "B",
      "No começo, não. Mas aí, na hora do bolo, o bicho pegou. Quando a noiva viu que não tinha o bufê que ela tinha escolhido, a ficha caiu, e ela ficou uma fera. Eu achei que ela ia chutar o balde e cancelar a festa ali mesmo."
     ],
     [
      "A",
      "Nossa, que saia justa! E você, fez o quê?"
     ],
     [
      "B",
      "Eu segurei a onda. Levei ela para um canto, expliquei tudo com calma, mostrei as mensagens do bufê. Falei: olha, a culpa não é sua nem minha, mas eu vou resolver. E prometi que a empresa do bufê ia devolver todo o dinheiro."
     ],
     [
      "A",
      "E vai devolver?"
     ],
     [
      "B",
      "Vai ter que devolver, né? Está no contrato. Mas eu sei como é: no fim, quem acaba pagando o pato é sempre o organizador. Se a festa sai boa, o mérito é de todo mundo. Se sai ruim, a culpa é minha."
     ],
     [
      "A",
      "Mas pelo que você está contando, você tirou de letra. Salvou a festa!"
     ],
     [
      "B",
      "Tirar de letra é exagero. Eu suei a camisa, isso sim. Pus a mão na massa, carreguei caixa, ajudei a montar mesa, servi refrigerante. E o mais engraçado é que, no final, os convidados adoraram a comida da minha amiga. Teve tio pedindo o telefone do restaurante."
     ],
     [
      "A",
      "Viu só? Tudo acabou bem. E a noiva, no final, fez as pazes com você?"
     ],
     [
      "B",
      "Fez. Na hora da valsa, ela veio me dar um abraço e disse que, depois do susto, tinha sido a melhor festa da vida dela. Aí eu quase chorei, confesso. Todo aquele cansaço valeu a pena."
     ],
     [
      "A",
      "Que lindo! E agora, o que você vai fazer?"
     ],
     [
      "B",
      "Agora eu vou ficar de molho uns dias. Tomei a decisão de não aceitar nenhum evento até o mês que vem. Preciso descansar a cabeça."
     ],
     [
      "A",
      "Faz muito bem. E olha, se precisar de uma mão para cobrar o bufê, me chama. Advogada serve pra isso."
     ],
     [
      "B",
      "Vou te cobrar essa promessa, hein!"
     ]
    ],
    "gloss": {
     "cabelo": "pelo (de cabelo em pé = con los pelos de punta)",
     "bufê": "catering, servicio de comida",
     "serra": "sierra (ruta de montaña)",
     "galho": "rama (quebrar o galho = sacar de un apuro)",
     "topou": "aceptó, se copó",
     "cardápio": "menú",
     "noivos": "novios (los que se casan)",
     "fera": "fiera (ficar uma fera = ponerse hecha una furia)",
     "saia": "pollera (saia justa = situación incómoda)",
     "onda": "ola (segurar a onda = mantener la calma)",
     "suei": "transpiré (suar a camisa = romperse el lomo)",
     "molho": "remojo (ficar de molho = quedarse quieto, descansar)",
     "cobrar": "reclamar (un pago o una promesa)",
     "adiantei": "adelanté (plata)",
     "satisfação": "explicación",
     "vista": "vista (fazer vista grossa = hacerse el distraído)",
     "multa": "multa"
    },
    "questions": [
     [
      "Qual foi o primeiro problema do casamento?",
      [
       "A noiva quis mudar o cardápio na última hora.",
       "O caminhão do bufê quebrou na estrada.",
       "A amiga de Bruno tinha fechado o restaurante.",
       "Os convidados chegaram bem mais cedo que o previsto."
      ],
      "O caminhão do bufê quebrou na estrada."
     ],
     [
      "Na fala de Bruno, o que significa pedir que a amiga “quebrasse o seu galho”?",
      [
       "Pedir que ela cortasse os custos da festa.",
       "Pedir que ela o ajudasse numa emergência.",
       "Pedir que ela desistisse de outro evento.",
       "Pedir que ela falasse com os noivos por ele."
      ],
      "Pedir que ela o ajudasse numa emergência."
     ],
     [
      "Como a noiva reagiu ao perceber o problema?",
      [
       "Ficou furiosa, e Bruno temeu que ela cancelasse a festa.",
       "Não percebeu nada até o final da festa.",
       "Pediu aos convidados que fossem embora.",
       "Agradeceu a Bruno pela solução encontrada."
      ],
      "Ficou furiosa, e Bruno temeu que ela cancelasse a festa."
     ],
     [
      "Por que Bruno diz que o organizador sempre “paga o pato”?",
      [
       "Porque os organizadores costumam cobrar pouco pelos eventos.",
       "Porque leva a culpa quando algo dá errado.",
       "Porque ganha menos que os outros fornecedores do evento.",
       "Porque precisa cozinhar nos eventos que organiza."
      ],
      "Porque leva a culpa quando algo dá errado."
     ],
     [
      "Como Bruno avalia a própria atuação?",
      [
       "Acha que resolveu tudo sem nenhum esforço.",
       "Acha que deveria ter cancelado a festa logo cedo.",
       "Acha que a amiga fez praticamente todo o trabalho.",
       "Acha que salvou a festa, mas à custa de muito trabalho."
      ],
      "Acha que salvou a festa, mas à custa de muito trabalho."
     ]
    ],
    "vf": [
     [
      "A festa estava marcada para as quatro da tarde.",
      "verdadeiro"
     ],
     [
      "Os convidados reclamaram da comida servida.",
      "falso"
     ],
     [
      "Bruno já tinha trabalhado antes com a mesma empresa de bufê.",
      "não se diz"
     ],
     [
      "Bruno pretende aceitar um novo evento já na semana seguinte.",
      "falso"
     ]
    ]
   },
   "compito": {
    "genre": "relato",
    "title": "Tropeços da Língua",
    "fonte": "lettura",
    "t": "A revista que publicou a entrevista com a professora e lexicógrafa Marta Siqueira convidou os leitores a enviar relatos de mal-entendidos com expressões idiomáticas para a seção Tropeços da Língua. Você é hispanofalante e mora (ou morou) no Brasil. Escreva um relato, em primeira pessoa, contando um mal-entendido (real ou imaginado) com uma expressão idiomática ou uma colocação do português: onde e quando aconteceu, o que você entendeu, o que a expressão significava de fato e o que você aprendeu com isso. Relacione a sua experiência com pelo menos uma ideia da entrevista. Não se esqueça de dar um título ao relato e de usar, além da expressão central, pelo menos outras duas expressões idiomáticas ou colocações. Registro semiformal. Seu texto deve ter entre 244 e 304 palavras.",
    "es": "Relato en primera persona para una sección de la revista: situación, qué entendiste, qué significaba y qué aprendiste, conectándolo con algo que dice Marta. Usá varias expresiones idiomáticas bien usadas y ponele título.",
    "min": 244,
    "max": 304,
    "punti": [
     [
      "Situar la anécdota: dónde, cuándo, con quién",
      [
       "quando",
       "cheguei",
       "semana",
       "morava"
      ]
     ],
     [
      "Explicar qué entendió y qué significaba la expresión",
      [
       "significa",
       "entendi",
       "ao pé da letra",
       "queria dizer"
      ]
     ],
     [
      "Relacionar con una idea de la entrevista",
      [
       "marta",
       "entrevista",
       "dicionário"
      ]
     ],
     [
      "Usar otras expresiones idiomáticas o colocaciones",
      [
       "ficha caiu",
       "pisado na bola",
       "pisei na bola",
       "dar um jeito",
       "pagar o pato",
       "tirar de letra"
      ]
     ],
     [
      "Cerrar con lo que aprendió",
      [
       "aprendi",
       "me mostrou",
       "lição"
      ]
     ]
    ],
    "model": "O dia em que enfiei o pé na jaca… ou quase\n\nQuando cheguei ao Recife para fazer intercâmbio, achava que o meu português já estava pronto. Afinal, como diz Marta Siqueira na entrevista, uma palavra isolada quase sempre tem equivalente. O problema, descobri logo, eram as expressões.\n\nNa minha segunda semana, uma colega da faculdade me convidou para o aniversário da avó dela, um almoço enorme num sítio em Olinda. No fim da tarde, depois de comer de tudo, ouvi o tio dela comentar, rindo: “Hoje eu enfiei o pé na jaca!”. Como havia uma jaqueira no quintal e várias frutas caídas no chão, entendi ao pé da letra. Fiquei preocupado e perguntei, com toda a seriedade, se ele tinha se machucado e se precisava lavar o pé.\n\nA mesa inteira caiu na gargalhada. A minha colega, com pena de mim, explicou que “enfiar o pé na jaca” significa exagerar, sobretudo na comida ou na bebida. Aí a ficha caiu, e eu quis sumir de vergonha. Senti que tinha pisado na bola na frente da família toda.\n\nMas o tio foi muito simpático: disse que, a partir daquele dia, eu seria o “gringo da jaca” e me ensinou mais umas dez expressões antes do cafezinho. Tomei a decisão de anotar todas num caderno, que guardo até hoje.\n\nEsse episódio me mostrou que Marta tem razão ao dizer que expressão idiomática não se aprende em lista, mas no contexto. Hoje, quando alguém usa uma frase que parece absurda, desconfio antes de entender tudo literalmente. E, sempre que como demais num almoço de domingo, lembro daquele dia e sorrio."
   }
  },
  {
   "week": 51,
   "level": "C1",
   "lettura": {
    "title": "O centro vai voltar a ter moradores?",
    "emoji": "🏙️",
    "genre": "reportagem especial",
    "grammar": "revisão B2-C1",
    "text": "Às sete da noite de uma terça-feira, a rua que concentra alguns dos edifícios mais bonitos do centro da cidade parece um cenário abandonado. As lojas baixaram as portas, os escritórios apagaram as luzes, e os poucos pedestres caminham depressa em direção ao metrô. No alto das fachadas art déco, janelas quebradas e faixas de “aluga-se” desbotadas pelo sol contam uma história que se repete em várias capitais brasileiras: o centro, que durante décadas foi o coração econômico e simbólico das cidades, esvaziou-se.\n\nAs causas são conhecidas. A partir dos anos 1970 e 1980, empresas e bancos migraram para novos bairros de negócios, com prédios modernos, estacionamento e segurança privada. As famílias de classe média seguiram o mesmo caminho, em direção a condomínios e bairros residenciais cada vez mais afastados. Mais recentemente, a popularização do trabalho remoto deu o golpe que faltava: muitas empresas descobriram que não precisavam de tantos andares de escritório e devolveram salas inteiras. O resultado é um paradoxo urbano. Milhares de pessoas procuram moradia perto do trabalho e do transporte, enquanto prédios inteiros, justamente nas áreas mais bem servidas de metrô e ônibus, permanecem vazios.\n\nÉ nesse contexto que ganhou força a palavra retrofit, termo emprestado do inglês para designar a reforma profunda de edifícios antigos, adaptando-os a novos usos. A ideia é simples de enunciar e complicada de executar: transformar antigos prédios comerciais em apartamentos, para as famílias morarem perto de onde trabalham. “Se os prédios voltarem a ter moradores, o comércio volta a ter clientes à noite, a rua volta a ter gente, e a sensação de insegurança diminui”, resume a arquiteta Camila Rocha, que coordena projetos de requalificação urbana. “Uma cidade viva é aquela em que as pessoas moram, e não apenas passam.”\n\nOs obstáculos, porém, são numerosos. Muitos desses edifícios foram projetados para outra época e para outra função: têm poucos banheiros, instalações elétricas precárias, elevadores antigos e plantas difíceis de dividir em unidades residenciais. Alguns são tombados pelo patrimônio histórico, o que exige cuidados adicionais com fachadas e materiais. Há ainda a questão da propriedade: não é raro que um mesmo prédio pertença a dezenas de herdeiros que não se entendem, ou que acumule dívidas de impostos há anos. “Enquanto não houver regras mais claras e algum incentivo, o proprietário vai preferir esperar, porque o prédio vazio, no papel, continua valendo dinheiro”, observa Rocha.\n\nPara os proprietários tirarem os projetos da gaveta, algumas prefeituras passaram a oferecer descontos em impostos, a simplificar o licenciamento e a flexibilizar exigências da legislação urbanística para quem se dispuser a reformar. Os defensores dessas medidas argumentam que o custo para o poder público é pequeno diante dos benefícios: aproveita-se uma infraestrutura que já existe, em vez de levar asfalto, esgoto e transporte para bairros cada vez mais distantes. Os críticos, por sua vez, temem que os incentivos acabem beneficiando sobretudo grandes incorporadoras, que poderão lucrar com apartamentos pequenos e caros sem resolver o problema de quem mais precisa.\n\nNa prefeitura, o discurso é otimista, mas cauteloso. Um técnico da secretaria de urbanismo, que pediu para não ser identificado, admite que os primeiros resultados ficaram aquém do esperado. “Muita gente achava que bastaria aprovar uma lei para os prédios se encherem de moradores em dois anos. Não é assim. Cada edifício é um quebra-cabeça jurídico, técnico e financeiro”, explica. Segundo ele, a equipe pretende criar um cadastro público dos imóveis vazios da região, para que interessados possam identificar oportunidades e para que os proprietários que mantiverem prédios abandonados por muito tempo sejam, no futuro, cobrados com impostos progressivos.\n\nEssa é, talvez, a questão central do debate: quem vai morar no centro requalificado? Movimentos de moradia, que há anos ocupam prédios abandonados para chamar a atenção para o déficit habitacional, lembram que o centro nunca esteve realmente vazio. Nele vivem trabalhadores informais, famílias em cortiços e pessoas em situação de rua. “Se as reformas só servirem para trazer gente de fora e expulsar quem já está aqui, não é revitalização, é substituição”, afirma Maria Aparecida Souza, a dona Cida, que mora há oito anos num prédio ocupado a poucas quadras da praça principal. Ela teme a possibilidade de os antigos moradores serem expulsos sem nenhuma alternativa e defende que parte dos apartamentos reformados seja obrigatoriamente destinada à habitação social, com aluguéis compatíveis com a renda de quem trabalha na região.\n\nEntre os comerciantes, o sentimento é de expectativa cautelosa. Jorge Nakamura, que mantém há trinta anos uma papelaria na mesma esquina, já viu vários planos de revitalização serem anunciados com festa e esquecidos logo em seguida. “Quando os moradores chegarem de verdade, eu abro até mais tarde. Mas, por enquanto, só vi maquete”, brinca. Ele reconhece, no entanto, que algo parece estar mudando: dois prédios da sua rua estão em obras, e um terceiro, desocupado há mais de uma década, acaba de ser vendido.\n\nOs especialistas ouvidos pela reportagem concordam em pelo menos um ponto: não existe solução única. O retrofit pode ser uma peça importante, desde que venha acompanhado de habitação social, de serviços públicos, como escolas, postos de saúde e creches, e de espaços de convivência. Sem isso, corre-se o risco de trocar um centro vazio por um centro exclusivo. Se as cidades tiverem a coragem de enfrentar ao mesmo tempo a questão urbanística e a social, talvez possam, finalmente, fazer as pazes com o lugar onde nasceram.",
    "gloss": {
     "pedestres": "peatones",
     "faixas": "carteles, pasacalles",
     "desbotadas": "desteñidas",
     "esvaziou-se": "se vació",
     "andares": "pisos",
     "moradia": "vivienda",
     "emprestado": "tomado prestado",
     "requalificação": "revitalización, recualificación",
     "plantas": "planos, distribución de ambientes",
     "tombados": "declarados patrimonio histórico",
     "herdeiros": "herederos",
     "dívidas": "deudas",
     "gaveta": "cajón",
     "licenciamento": "habilitación, permisos",
     "esgoto": "cloacas",
     "incorporadoras": "desarrolladoras inmobiliarias",
     "lucrar": "ganar plata, lucrar",
     "déficit": "déficit",
     "cortiços": "conventillos",
     "quadras": "cuadras",
     "aluguéis": "alquileres",
     "renda": "ingresos",
     "cautelosa": "cauta",
     "maquete": "maqueta",
     "desocupado": "desocupado, vacío",
     "creches": "guarderías, jardines maternales",
     "aquém": "por debajo",
     "quebra-cabeça": "rompecabezas",
     "cadastro": "registro, padrón"
    },
    "questions": [
     [
      "Qual é o tema central da reportagem?",
      [
       "A história da arquitetura art déco nas capitais do país.",
       "A conversão de prédios vazios do centro em moradia e os seus dilemas.",
       "O aumento da violência nas áreas centrais das grandes cidades.",
       "A volta das empresas ao centro depois do fim do trabalho remoto."
      ],
      "A conversão de prédios vazios do centro em moradia e os seus dilemas."
     ],
     [
      "Qual é o “paradoxo urbano” descrito no segundo parágrafo?",
      [
       "O centro tem muito transporte público, mas quase nenhum passageiro.",
       "Falta moradia enquanto prédios bem localizados ficam vazios.",
       "As empresas voltaram ao centro, mas os funcionários trabalham em casa.",
       "Os aluguéis do centro subiram apesar do abandono dos edifícios."
      ],
      "Falta moradia enquanto prédios bem localizados ficam vazios."
     ],
     [
      "Segundo Camila Rocha, por que muitos proprietários preferem esperar?",
      [
       "Porque a prefeitura proíbe reformas nas áreas centrais.",
       "Porque esperam que as empresas voltem a alugar as salas.",
       "Porque o prédio vazio mantém o seu valor no papel.",
       "Porque os moradores das ocupações impedem as obras."
      ],
      "Porque o prédio vazio mantém o seu valor no papel."
     ],
     [
      "O que dona Cida quer dizer com “não é revitalização, é substituição”?",
      [
       "Que os prédios antigos deveriam ser demolidos e substituídos por novos.",
       "Que o comércio tradicional está sendo trocado por grandes redes.",
       "Que os moradores atuais não aceitam nenhuma mudança no bairro.",
       "Que as reformas podem expulsar quem já mora no centro."
      ],
      "Que as reformas podem expulsar quem já mora no centro."
     ],
     [
      "Qual é a atitude de Jorge Nakamura diante das mudanças?",
      [
       "Cético, mas atento a sinais de mudança.",
       "Totalmente entusiasmado com o retrofit.",
       "Contrário a qualquer reforma na sua rua.",
       "Indiferente, porque pretende fechar a loja em breve."
      ],
      "Cético, mas atento a sinais de mudança."
     ]
    ],
    "vf": [
     [
      "O trabalho remoto contribuiu para esvaziar escritórios no centro.",
      "verdadeiro"
     ],
     [
      "Segundo o texto, qualquer prédio do centro pode ser reformado sem restrições.",
      "falso"
     ],
     [
      "Dona Cida defende que parte dos apartamentos reformados seja destinada à habitação social.",
      "verdadeiro"
     ],
     [
      "Jorge Nakamura pretende vender a sua papelaria.",
      "não se diz"
     ],
     [
      "Os especialistas afirmam que o retrofit, sozinho, resolve o problema do centro.",
      "falso"
     ]
    ],
    "hunt": {
     "label": "Tocá los verbos en futuro del subjuntivo (se voltarem, quando chegarem…) y en infinitivo personal (para os proprietários tirarem…)",
     "targets": [
      "voltarem",
      "morarem",
      "houver",
      "tirarem",
      "dispuser",
      "servirem",
      "serem",
      "chegarem",
      "tiverem",
      "encherem",
      "mantiverem"
     ]
    }
   },
   "ascolto": {
    "title": "Um centro para quem?",
    "genre": "palestra com perguntas do público",
    "es": "Al final de una charla sobre el centro de las ciudades, un urbanista responde las preguntas de una estudiante de arquitectura del público.",
    "speakers": [
     "Henrique Tavares (urbanista)",
     "Paula (estudante)"
    ],
    "turns": [
     [
      "A",
      "E é por isso que eu insisto: o centro não precisa de um grande projeto salvador, precisa de muitas pequenas decisões na mesma direção. Bom, acho que já falei demais. Vamos abrir para as perguntas. Pode falar, por favor."
     ],
     [
      "B",
      "Boa noite, professor. Meu nome é Paula, sou estudante de arquitetura. Eu queria fazer uma pergunta talvez meio provocativa. Todo mundo fala em retrofit como se fosse uma solução mágica. Mas reformar um prédio de setenta anos é caríssimo. Não seria mais barato demolir e construir do zero?"
     ],
     [
      "A",
      "Ótima pergunta, e não tem nada de provocativa. Olha, depende do prédio, é claro. Mas, em muitos casos, a conta não é tão simples quanto parece. Quando você demole, você joga fora a estrutura, que é justamente a parte mais cara e mais poluente de uma obra. Pense no concreto, no aço, no transporte do entulho. Do ponto de vista ambiental, o prédio mais sustentável costuma ser aquele que já existe. E tem outro ponto: muitos desses edifícios contam a história da cidade. Se a gente demolir tudo o que é antigo, o centro vira um lugar igual a qualquer outro."
     ],
     [
      "B",
      "Mas e quando o prédio simplesmente não serve para moradia? Tipo, sem janela nos fundos, sem ventilação nenhuma?"
     ],
     [
      "A",
      "Aí, sim, pode ser o caso de pensar em outro uso. Nem todo prédio precisa virar apartamento. Pode virar escola, centro cultural, espaço de trabalho compartilhado, hotel. O importante é que ele volte a ter vida. Um centro saudável tem uso misto: gente morando, trabalhando, estudando e se divertindo no mesmo lugar, em horários diferentes."
     ],
     [
      "B",
      "Posso fazer mais uma? É sobre gentrificação. O senhor acha que é possível reformar o centro sem expulsar quem já mora lá?"
     ],
     [
      "A",
      "Acho possível, mas não acho automático. Se ninguém fizer nada, o mercado resolve do jeito dele, que é trazer quem pode pagar mais. Então é preciso intervir. Algumas ferramentas são conhecidas. Reservar uma porcentagem das unidades reformadas para habitação social. Criar programas de aluguel social, em que o poder público é o dono dos apartamentos e cobra um aluguel compatível com a renda da família. E, principalmente, conversar com os moradores antes de decidir, e não depois."
     ],
     [
      "B",
      "E as ocupações? Porque aqui perto tem várias."
     ],
     [
      "A",
      "Olha, eu entendo que o tema divide opiniões. Mas eu diria o seguinte: as ocupações, gostemos ou não, mostraram à cidade que esses prédios podiam ser habitados. Tirar as famílias sem oferecer uma alternativa digna não resolve nada, só transfere o problema para outro endereço. Em vários casos, o caminho mais inteligente foi justamente reformar o prédio ocupado junto com os moradores."
     ],
     [
      "B",
      "Mas isso não acaba incentivando novas ocupações?"
     ],
     [
      "A",
      "É uma preocupação legítima, e eu ouço muito. Mas veja: a melhor forma de evitar ocupações é não deixar prédio vazio durante décadas, né? Um prédio abandonado é praticamente um convite. Se ele tiver uso, se tiver gente morando ou trabalhando, o problema nem aparece."
     ],
     [
      "B",
      "Última, prometo. O que o senhor diria para um comerciante que está cansado de ouvir promessas?"
     ],
     [
      "A",
      "Eu diria que ele tem toda a razão de estar cansado. E diria também que ele é parte da solução. Um térreo com loja aberta, iluminada, com gente entrando e saindo, faz mais pela segurança de uma rua do que dez câmeras. Por isso, os projetos precisam garantir que o andar de baixo dos prédios reformados continue sendo comércio. A gente chama isso de fachada ativa."
     ],
     [
      "B",
      "Muito obrigada, professor. Ajudou bastante, de verdade."
     ],
     [
      "A",
      "Eu que agradeço. São perguntas assim que fazem uma palestra valer a pena."
     ]
    ],
    "gloss": {
     "salvador": "salvador",
     "demolir": "demoler",
     "concreto": "hormigón",
     "aço": "acero",
     "entulho": "escombros",
     "fundos": "contrafrente",
     "compartilhado": "compartido",
     "porcentagem": "porcentaje",
     "aluguel": "alquiler",
     "ocupações": "edificios tomados, tomas",
     "endereço": "dirección, domicilio",
     "térreo": "planta baja",
     "andar": "piso"
    },
    "questions": [
     [
      "Qual é a ideia com que o palestrante encerra a sua exposição?",
      [
       "O centro precisa de muitas pequenas decisões coerentes.",
       "O centro precisa de um grande projeto que resolva tudo.",
       "O retrofit deveria ser proibido em prédios históricos.",
       "As prefeituras deveriam vender todos os prédios vazios."
      ],
      "O centro precisa de muitas pequenas decisões coerentes."
     ],
     [
      "Por que o palestrante relativiza a ideia de demolir e construir do zero?",
      [
       "Porque a lei proíbe demolições nas áreas centrais.",
       "Porque os prédios novos não costumam atrair moradores.",
       "Porque descartar a estrutura é caro e poluente.",
       "Porque demolir leva mais tempo do que reformar."
      ],
      "Porque descartar a estrutura é caro e poluente."
     ],
     [
      "O que ele propõe para prédios que não servem para moradia?",
      [
       "Demoli-los para abrir praças e estacionamentos.",
       "Dar-lhes outros usos, como escola ou centro cultural.",
       "Mantê-los fechados até aparecer um comprador interessado.",
       "Vendê-los às incorporadoras pelo menor preço possível."
      ],
      "Dar-lhes outros usos, como escola ou centro cultural."
     ],
     [
      "Segundo o palestrante, o que acontece se o poder público não intervier?",
      [
       "O centro continuará vazio para sempre.",
       "As ocupações se espalharão por toda a cidade.",
       "Os comerciantes abandonarão definitivamente o centro.",
       "O mercado trará moradores que podem pagar mais."
      ],
      "O mercado trará moradores que podem pagar mais."
     ],
     [
      "O que é “fachada ativa”, segundo a palestra?",
      [
       "Uma fachada histórica restaurada com todo o cuidado.",
       "Um sistema de câmeras instalado nas entradas dos prédios.",
       "Um térreo com comércio aberto e movimento.",
       "Uma parede decorada com arte urbana e iluminação."
      ],
      "Um térreo com comércio aberto e movimento."
     ]
    ],
    "vf": [
     [
      "Paula é estudante de arquitetura.",
      "verdadeiro"
     ],
     [
      "O palestrante defende retirar as ocupações para acelerar as reformas.",
      "falso"
     ],
     [
      "O palestrante já coordenou pessoalmente a reforma de um prédio ocupado.",
      "não se diz"
     ],
     [
      "Para o palestrante, câmeras garantem mais segurança do que lojas abertas.",
      "falso"
     ]
    ]
   },
   "compito": {
    "genre": "artigo",
    "title": "Um centro para quem?",
    "fonte": "entrambi",
    "t": "Você mora no centro de uma capital brasileira e colabora com o jornal da associação de moradores do bairro. Após ler a reportagem “O centro vai voltar a ter moradores?” e ouvir a palestra do urbanista Henrique Tavares, escreva um artigo para o jornal do bairro discutindo se a reforma de prédios vazios (o retrofit) pode trazer vida nova ao centro sem expulsar quem já vive lá. No seu artigo, apresente o problema, use informações e argumentos dos dois textos (citando pelo menos uma pessoa de cada um), discuta os riscos e apresente propostas concretas. Não se esqueça de dar um título ao artigo e de usar um registro formal. Seu texto deve ter entre 250 e 310 palavras.",
    "es": "Artículo de opinión-informativo para el diario del barrio que integre la lectura y la charla: problema, argumentos con fuentes de ambos, riesgos (expulsión) y propuestas. Título y registro formal; es la tarea tipo examen.",
    "min": 250,
    "max": 310,
    "punti": [
     [
      "Presentar el problema del centro vacío",
      [
       "vazio",
       "esvazi",
       "abandon"
      ]
     ],
     [
      "Usar información del reportaje",
      [
       "camila",
       "rocha",
       "dona cida",
       "reportagem"
      ]
     ],
     [
      "Usar información de la charla",
      [
       "tavares",
       "palestra",
       "urbanista"
      ]
     ],
     [
      "Discutir el riesgo de expulsión de los habitantes actuales",
      [
       "substituição",
       "expuls",
       "gentrifica",
       "exclusivo"
      ]
     ],
     [
      "Proponer medidas concretas",
      [
       "habitação social",
       "aluguel social",
       "fachada",
       "proponho",
       "defendo"
      ]
     ]
    ],
    "model": "Um centro para quem?\n\nQuem passa pela nossa região depois das sete da noite conhece a cena: lojas fechadas, faixas de “aluga-se” desbotadas e prédios inteiros com as janelas apagadas. Não por acaso, a transformação desses edifícios em moradia, o chamado retrofit, virou tema de reportagens, palestras e conversas de calçada. A pergunta que precisamos fazer, porém, não é apenas se o centro vai voltar a ter moradores, mas quem serão esses moradores.\n\nOs argumentos a favor são fortes. Como lembra a arquiteta Camila Rocha, ouvida numa reportagem recente, se os prédios voltarem a ser habitados, a rua volta a ter gente e a sensação de insegurança diminui. Além disso, como explicou o urbanista Henrique Tavares numa palestra aqui no bairro, reformar costuma ser mais sustentável do que demolir, porque aproveita uma estrutura que já existe e preserva a memória da cidade.\n\nO risco, contudo, é real. Se os incentivos públicos servirem apenas para que grandes incorporadoras vendam apartamentos pequenos e caros, teremos trocado um centro vazio por um centro exclusivo. Dona Cida, moradora de um prédio ocupado, resumiu bem o problema: sem cuidado, não haverá revitalização, e sim substituição.\n\nPor isso, defendo três medidas. Primeiro, que uma parte das unidades reformadas seja obrigatoriamente destinada à habitação social, inclusive por meio de programas de aluguel social. Segundo, que os moradores atuais, das ocupações e dos cortiços, sejam ouvidos antes de qualquer projeto, e não depois. Terceiro, que o térreo dos prédios continue sendo comércio, com fachadas ativas, para os comerciantes da nossa rua fazerem parte da solução.\n\nO centro nunca esteve realmente vazio. Cabe a nós garantir que a sua nova vida inclua quem nunca o abandonou."
   }
  }
 ]
};
  if (typeof module === "object" && module.exports) module.exports = root.TRAMO_DATA;
})(typeof window !== "undefined" ? window : globalThis);
