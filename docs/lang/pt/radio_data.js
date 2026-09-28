/* Serie «Rádio»: generado por tools/lib/build_radio.js a partir de tools/pt/radio/.
   No editar a mano: editá los JSON de cada semana y corré npm run build. */
(function (root) {
  "use strict";
  root.RADIO_DATA = {
 "name": "Rádio Calçadão",
 "label": "Rádio",
 "blurb": "La radio comunitaria de Botafogo, de la semana 6 a la 25: un programa corto por semana, a dos voces, con la gramática y las palabras de la semana y el portugués que se habla en Brasil (a gente, pra, tá). Nanda y Téo conducen «Bom dia, Calçadão»; llaman Sofía (la argentina de las lecturas), Dona Lúcia y Caio, el repórter de bicicleta. Dos escuchas con las preguntas a la vista y la transcripción al final.",
 "metaFrom": 14,
 "criterion": 60,
 "personaggi": {
  "Nanda": "conduce «Bom dia, Calçadão»; carioca de Botafogo, rápida, ama la playa y el samba",
  "Téo": "co-conductor; paulista, vive en Río hace poco, compara todo con São Paulo",
  "Sofía": "la argentina de las lecturas; llama cuando tiene una duda o una novedad",
  "Dona Lúcia": "la vecina de 80 años de las lecturas; llama casi todas las semanas",
  "Caio": "estudiante de 20 años, repórter en bicicleta"
 },
 "EPISODI": [
  {
   "week": 6,
   "level": "A1",
   "title": "Qual é o rolê?",
   "genre": "programa da manhã",
   "es": "Es viernes a la mañana en Rádio Calçadão, la radio comunitaria de Botafogo. Nanda, la conductora, le pregunta a Téo, su compañero, qué planes tiene para el fin de semana.",
   "speakers": [
    "Nanda",
    "Téo"
   ],
   "turns": [
    [
     "A",
     "Bom dia, Botafogo! Aqui é a Rádio Calçadão, com a Nanda e o Téo. Téo, qual é o rolê do fim de semana?"
    ],
    [
     "B",
     "Hoje de noite eu saio com uns amigos. A gente vai a um bar na Lapa: o chope lá é barato."
    ],
    [
     "A",
     "Legal! E amanhã, o que você faz?"
    ],
    [
     "B",
     "Amanhã é a minha folga. De manhã quero passear na praia e de noite tem um show de samba. Você quer vir?"
    ],
    [
     "A",
     "Eu topo! Quanto custa o ingresso?"
    ],
    [
     "B",
     "Trinta reais. É caro, mas a banda é ótima."
    ],
    [
     "A",
     "Estou sem grana este mês... Mas eu vou. Eu curto muito samba!"
    ],
    [
     "B",
     "No domingo eu não saio de casa. Durmo até tarde e vejo o jogo na TV."
    ],
    [
     "A",
     "E vocês, ouvintes? Estão a fim de sair? A gente quer saber o que vocês fazem!"
    ]
   ],
   "gloss": {
    "fim de semana": "fin de semana",
    "chope": "chop, cerveza tirada",
    "ouvintes": "oyentes",
    "banda": "banda (de música)"
   },
   "questions": [
    [
     "¿Adónde va Téo esta noche?",
     [
      "A un bar de la Lapa con amigos",
      "A un show de samba en la Lapa, con Nanda",
      "A la playa, a pasear",
      "A la casa de Nanda"
     ],
     "A un bar de la Lapa con amigos"
    ],
    [
     "¿Por qué Nanda duda antes de aceptar la invitación?",
     [
      "Porque no le gusta el samba",
      "Porque este mes no tiene plata",
      "Porque el sábado a la noche trabaja en la radio",
      "Porque no conoce la banda"
     ],
     "Porque este mes no tiene plata"
    ],
    [
     "¿Qué hace Téo el domingo?",
     [
      "Va a la playa temprano",
      "Se queda en casa y ve el partido",
      "Trabaja en la radio",
      "Sale con amigos a la Lapa"
     ],
     "Se queda en casa y ve el partido"
    ]
   ],
   "info": [
    [
     "La entrada del show cuesta treinta reales.",
     true
    ],
    [
     "Téo trabaja el sábado.",
     false
    ],
    [
     "A Nanda le gusta el samba.",
     true
    ]
   ],
   "grammatica": {
    "label": "el presente de los irregulares: sair, ir, fazer, querer, vir, ver, dormir",
    "forme": [
     "saio",
     "vai",
     "faz",
     "quero",
     "quer vir",
     "vou",
     "fazem",
     "durmo",
     "vejo"
    ]
   },
   "parole": [
    [
     "rolê",
     "rolê"
    ],
    [
     "chope",
     "chope"
    ],
    [
     "folga",
     "folga"
    ],
    [
     "passear",
     "passear"
    ],
    [
     "topo",
     "topar"
    ],
    [
     "ingresso",
     "ingresso"
    ],
    [
     "grana",
     "grana"
    ],
    [
     "curto",
     "curtir"
    ],
    [
     "a fim de",
     "a fim de"
    ]
   ],
   "qlang": "es",
   "infoPrompt": "¿Lo dice o no lo dice?",
   "infoYes": "Lo dice",
   "infoNo": "No lo dice"
  },
  {
   "week": 7,
   "level": "A1",
   "title": "Um presente para a Bia",
   "genre": "telefonema ao vivo",
   "es": "Llama a la radio Sofía, la argentina que vive en Botafogo. Quiere hacerle un regalo especial a su amiga Bia y necesita fechas, horarios y precios.",
   "speakers": [
    "Nanda",
    "Sofía"
   ],
   "turns": [
    [
     "A",
     "São oito e meia: aqui é a Rádio Calçadão. Temos uma ouvinte na linha. Alô?"
    ],
    [
     "B",
     "Alô, Nanda? Aqui é a Sofía, a argentina de Botafogo!"
    ],
    [
     "A",
     "Oi, Sofía! Tudo bem?"
    ],
    [
     "B",
     "Tudo! Sábado é o aniversário da Bia e eu quero dar um presente: um ingresso para o show de samba na Lapa. Quando é?"
    ],
    [
     "A",
     "É no sábado, dia vinte e dois de março, às dez da noite."
    ],
    [
     "B",
     "E quanto custa?"
    ],
    [
     "A",
     "Oitenta reais a inteira e quarenta a meia. Estudante paga meia."
    ],
    [
     "B",
     "A Bia é estudante! Posso pagar com cartão?"
    ],
    [
     "A",
     "Pode. A bilheteria abre de segunda a sexta, das duas às seis. Sempre tem fila."
    ],
    [
     "B",
     "Eu vou amanhã, quarta-feira, às duas em ponto."
    ],
    [
     "A",
     "Em ponto? Você sempre chega atrasada, Sofía!"
    ],
    [
     "B",
     "É verdade! Amanhã eu chego à uma e meia. Prometo!"
    ],
    [
     "A",
     "Combinado! Para vocês, ouvintes: às nove tem notícias e às nove e quinze, a previsão do tempo."
    ]
   ],
   "gloss": {
    "ouvinte": "oyente",
    "ouvintes": "oyentes",
    "a inteira": "la entrada completa",
    "a meia": "la media entrada (para estudiantes)",
    "bilheteria": "boletería",
    "fila": "cola, fila",
    "em ponto": "en punto",
    "previsão do tempo": "pronóstico del tiempo",
    "notícias": "noticias"
   },
   "questions": [
    [
     "¿Qué quiere regalarle Sofía a Bia?",
     [
      "Una entrada para un show de samba",
      "Una torta de cumpleaños",
      "Una tarjeta de crédito",
      "Un viaje a la Lapa"
     ],
     "Una entrada para un show de samba"
    ],
    [
     "¿Cuánto paga Sofía por la entrada de Bia?",
     [
      "Veinte reales",
      "Cuarenta reales",
      "Ochenta reales",
      "Ciento veinte reales"
     ],
     "Cuarenta reales"
    ],
    [
     "¿Cuándo va a ir Sofía a la boletería?",
     [
      "El sábado a la noche",
      "Mañana, miércoles, temprano",
      "El lunes a las seis de la tarde",
      "Hoy a las ocho y media"
     ],
     "Mañana, miércoles, temprano"
    ]
   ],
   "info": [
    [
     "El show es el sábado a las diez de la noche.",
     true
    ],
    [
     "En la boletería no se puede pagar con tarjeta.",
     false
    ],
    [
     "Sofía siempre llega tarde.",
     true
    ]
   ],
   "grammatica": {
    "label": "la hora, las fechas y los precios",
    "forme": [
     "são oito e meia",
     "dia vinte e dois de março",
     "às dez da noite",
     "oitenta reais",
     "quarenta",
     "de segunda a sexta",
     "das duas às seis",
     "às duas em ponto",
     "à uma e meia",
     "às nove e quinze"
    ]
   },
   "parole": [
    [
     "aniversário",
     "aniversário"
    ],
    [
     "cartão",
     "cartão"
    ],
    [
     "segunda",
     "segunda-feira"
    ],
    [
     "sexta",
     "sexta-feira"
    ],
    [
     "amanhã",
     "amanhã"
    ],
    [
     "quarta-feira",
     "quarta-feira"
    ],
    [
     "atrasada",
     "atrasado"
    ],
    [
     "meia",
     "meia"
    ]
   ],
   "qlang": "es",
   "infoPrompt": "¿Lo dice o no lo dice?",
   "infoYes": "Lo dice",
   "infoNo": "No lo dice"
  },
  {
   "week": 8,
   "level": "A1",
   "title": "Sábado no Aterro",
   "genre": "entrada ao vivo",
   "es": "Sábado a la mañana: Caio, el cronista en bicicleta de la radio, está en el Aterro do Flamengo. Nanda le pregunta qué está haciendo la gente y qué va a hacer él el resto del fin de semana.",
   "speakers": [
    "Nanda",
    "Caio"
   ],
   "turns": [
    [
     "A",
     "Agora, o Caio, nosso repórter de bicicleta. Caio, onde você está?"
    ],
    [
     "B",
     "Oi, Nanda! Tô no Aterro do Flamengo. Tá um dia lindo!"
    ],
    [
     "A",
     "E o que as pessoas estão fazendo aí?"
    ],
    [
     "B",
     "Muita gente tá correndo, umas crianças estão jogando bola e uma família tá fazendo churrasco na grama."
    ],
    [
     "A",
     "Churrasco às nove da manhã? E você, o que está fazendo?"
    ],
    [
     "B",
     "Tô tomando uma água de coco, né? Ninguém é de ferro!"
    ],
    [
     "A",
     "E depois, quais são os planos?"
    ],
    [
     "B",
     "De tarde vou fazer uma trilha com uns amigos até uma cachoeira. Amanhã a gente vai a um sítio em Petrópolis."
    ],
    [
     "A",
     "Que delícia! Eu ainda não sei o que vou fazer. Acho que vou arrumar a casa: meu apartamento tá precisando de uma faxina."
    ],
    [
     "B",
     "Faxina no sábado? Não, Nanda! Você vem com a gente para a cachoeira?"
    ],
    [
     "A",
     "Vou pensar. E vocês, ouvintes: o que estão fazendo agora? E o que vão fazer no fim de semana? Já, já tem música!"
    ]
   ],
   "gloss": {
    "repórter": "cronista, periodista",
    "grama": "pasto (el césped)",
    "água de coco": "agua de coco",
    "Ninguém é de ferro": "nadie es de fierro (hay que darse un gusto)",
    "Que delícia": "¡qué lindo!",
    "Já, já": "enseguida",
    "ouvintes": "oyentes"
   },
   "questions": [
    [
     "¿Dónde está Caio?",
     [
      "En la radio, con Nanda",
      "En el Aterro do Flamengo",
      "En una cascada de Petrópolis",
      "En su departamento"
     ],
     "En el Aterro do Flamengo"
    ],
    [
     "¿Qué está haciendo Caio en este momento?",
     [
      "Está corriendo por la playa",
      "Está haciendo un asado",
      "Está tomando agua de coco",
      "Está jugando a la pelota"
     ],
     "Está tomando agua de coco"
    ],
    [
     "¿Qué piensa hacer Nanda el fin de semana?",
     [
      "Ir a una cascada con Caio",
      "Limpiar y ordenar su casa",
      "Ir a una quinta en Petrópolis",
      "Trabajar en la radio"
     ],
     "Limpiar y ordenar su casa"
    ]
   ],
   "info": [
    [
     "Una familia está haciendo un asado en el pasto.",
     true
    ],
    [
     "Caio va solo a la cascada.",
     false
    ],
    [
     "El domingo Caio va a una quinta.",
     true
    ]
   ],
   "grammatica": {
    "label": "estar + gerundio (lo que está pasando) e ir + infinitivo (lo que vas a hacer)",
    "forme": [
     "estão fazendo",
     "tá correndo",
     "estão jogando",
     "tá fazendo",
     "está fazendo",
     "tô tomando",
     "vou fazer",
     "vou arrumar",
     "tá precisando",
     "vão fazer",
     "vou pensar"
    ]
   },
   "parole": [
    [
     "agora",
     "agora"
    ],
    [
     "churrasco",
     "churrasco"
    ],
    [
     "depois",
     "depois"
    ],
    [
     "fim de semana",
     "fim de semana"
    ],
    [
     "trilha",
     "trilha"
    ],
    [
     "cachoeira",
     "cachoeira"
    ],
    [
     "sítio",
     "sítio"
    ],
    [
     "ainda",
     "ainda"
    ],
    [
     "arrumar",
     "arrumar"
    ],
    [
     "faxina",
     "faxina"
    ],
    [
     "já",
     "já"
    ]
   ],
   "qlang": "es",
   "infoPrompt": "¿Lo dice o no lo dice?",
   "infoYes": "Lo dice",
   "infoNo": "No lo dice"
  },
  {
   "week": 9,
   "level": "A2",
   "title": "Téo no engarrafamento",
   "genre": "boletim do trânsito",
   "es": "Lunes a la mañana y Téo todavía no llegó a la radio. Nanda lo llama: está atrapado en el tránsito y le cuenta dónde está y cómo piensa llegar.",
   "speakers": [
    "Nanda",
    "Téo"
   ],
   "turns": [
    [
     "A",
     "Bom dia! Hoje eu tô sozinha no estúdio: o Téo ainda não está aqui. Téo, cadê você?"
    ],
    [
     "B",
     "Oi, Nanda! Tô num ônibus na praia de Botafogo, parado no sinal. É um engarrafamento enorme!"
    ],
    [
     "A",
     "Mas você vem de onde?"
    ],
    [
     "B",
     "Venho da rodoviária. Volto de São Paulo, de ônibus: a viagem é longa, mas é barata."
    ],
    [
     "A",
     "E por que você não pega o metrô?"
    ],
    [
     "B",
     "Boa ideia! Vou descer no próximo ponto e vou a pé até a estação Botafogo. De lá pego o metrô pra Copacabana."
    ],
    [
     "A",
     "Pra Copacabana? Não, Téo! A rádio fica em Botafogo, na rua Voluntários da Pátria."
    ],
    [
     "B",
     "Ah, é verdade! Então eu não pego o metrô. Desço do ônibus, viro à esquerda e depois à direita, e chego na rua da rádio."
    ],
    [
     "A",
     "Olha, a Dona Lúcia tá passando de carro aqui na frente. Ela pode te dar uma carona!"
    ],
    [
     "B",
     "Uma carona com a Dona Lúcia? Ela dirige muito devagar!"
    ],
    [
     "A",
     "Devagar como esse ônibus? Impossível! Tô te esperando, e os ouvintes também."
    ]
   ],
   "gloss": {
    "cadê": "¿dónde está?",
    "parado": "parado, detenido",
    "enorme": "enorme",
    "longa": "larga",
    "devagar": "despacio",
    "ouvintes": "oyentes",
    "estúdio": "estudio (de radio)",
    "rádio": "radio (la emisora)"
   },
   "questions": [
    [
     "¿Dónde está Téo cuando Nanda lo llama?",
     [
      "En un colectivo parado en un semáforo",
      "En el subte, en una estación cerca de Copacabana",
      "En la terminal de micros",
      "En el auto de Dona Lúcia"
     ],
     "En un colectivo parado en un semáforo"
    ],
    [
     "¿De dónde vuelve Téo?",
     [
      "De Copacabana",
      "De São Paulo",
      "De la playa",
      "De la casa de Dona Lúcia"
     ],
     "De São Paulo"
    ],
    [
     "¿Por qué Téo no toma el subte al final?",
     [
      "Porque la radio queda en Botafogo, no en Copacabana",
      "Porque el subte está cerrado",
      "Porque no tiene tarjeta",
      "Porque Dona Lúcia lo lleva"
     ],
     "Porque la radio queda en Botafogo, no en Copacabana"
    ]
   ],
   "info": [
    [
     "Téo viaja de São Paulo en avión.",
     false
    ],
    [
     "Según Téo, Dona Lúcia maneja muy despacio.",
     true
    ],
    [
     "La radio queda en la calle Voluntários da Pátria.",
     true
    ]
   ],
   "grammatica": {
    "label": "las preposiciones de lugar y movimiento: em (no, na), de, a, para / pra, até",
    "forme": [
     "no estúdio",
     "num ônibus",
     "na praia de botafogo",
     "de onde",
     "da rodoviária",
     "de são paulo",
     "de ônibus",
     "no próximo ponto",
     "a pé",
     "até a estação",
     "pra copacabana",
     "em botafogo",
     "na rua",
     "de carro"
    ]
   },
   "parole": [
    [
     "ônibus",
     "ônibus"
    ],
    [
     "sinal",
     "sinal"
    ],
    [
     "engarrafamento",
     "engarrafamento"
    ],
    [
     "rodoviária",
     "rodoviária"
    ],
    [
     "pega",
     "pegar"
    ],
    [
     "metrô",
     "metrô"
    ],
    [
     "descer",
     "descer"
    ],
    [
     "ponto",
     "ponto"
    ],
    [
     "viro",
     "virar"
    ],
    [
     "esquerda",
     "esquerda"
    ],
    [
     "direita",
     "direita"
    ],
    [
     "carona",
     "carona"
    ]
   ],
   "qlang": "es",
   "infoPrompt": "¿Lo dice o no lo dice?",
   "infoYes": "Lo dice",
   "infoNo": "No lo dice"
  },
  {
   "week": 10,
   "level": "A2",
   "title": "Achados e perdidos",
   "genre": "quadro do programa",
   "es": "En la radio hay una caja de «objetos perdidos» del barrio. Hoy Dona Lúcia, la vecina de ochenta años, pasa por el estudio: busca algo suyo y Nanda le muestra lo que hay en la caja.",
   "speakers": [
    "Nanda",
    "Dona Lúcia"
   ],
   "turns": [
    [
     "A",
     "Bom dia! Hoje tem o nosso quadro «Achados e perdidos». No estúdio está a Dona Lúcia, nossa vizinha. Dona Lúcia, o que a senhora procura?"
    ],
    [
     "B",
     "Bom dia, minha filha. Eu procuro os meus óculos. Em casa não estão: nem no quarto, nem embaixo do travesseiro!"
    ],
    [
     "A",
     "Aqui na caixa tem uns óculos. São estes, pretos?"
    ],
    [
     "B",
     "Não, esses não são meus. Os meus são vermelhos. Esses pretos parecem os do meu irmão."
    ],
    [
     "A",
     "E este guarda-chuva amarelo? É da senhora?"
    ],
    [
     "B",
     "Também não. Mas é igual ao guarda-chuva da minha neta, a Carol. Acho que é dela."
    ],
    [
     "A",
     "Então eu ligo para a Carol. E esta carteira marrom?"
    ],
    [
     "B",
     "Nossa, essa carteira é do meu genro, o marido da minha filha! Ele procura essa carteira há uma semana. É a cara dele: esquece tudo!"
    ],
    [
     "A",
     "E os seus óculos, Dona Lúcia? Não estão na caixa..."
    ],
    [
     "B",
     "Ai, que cabeça a minha! Olha só: estão aqui, na minha bolsa, dentro do estojo. Que vergonha, minha filha!"
    ],
    [
     "A",
     "Não tem problema! E vocês, ouvintes: se esse guarda-chuva é seu, a rádio fica na rua Voluntários da Pátria."
    ]
   ],
   "gloss": {
    "quadro": "sección (de un programa)",
    "Achados e perdidos": "objetos perdidos",
    "estúdio": "estudio (de radio)",
    "procura": "busca",
    "caixa": "caja",
    "neta": "nieta",
    "genro": "yerno",
    "É a cara dele": "es típico de él",
    "estojo": "estuche",
    "ouvintes": "oyentes",
    "embaixo do": "debajo de"
   },
   "questions": [
    [
     "¿Qué busca Dona Lúcia?",
     [
      "Sus anteojos",
      "Su paraguas",
      "Su billetera",
      "A su nieta"
     ],
     "Sus anteojos"
    ],
    [
     "¿De quién es la billetera marrón, según Dona Lúcia?",
     [
      "De su hermano",
      "De su yerno",
      "De su nieta",
      "De Nanda"
     ],
     "De su yerno"
    ],
    [
     "¿Dónde están, al final, los anteojos de Dona Lúcia?",
     [
      "En la caja de la radio",
      "En la casa del hermano",
      "En su cartera, en el estuche",
      "En el paraguas amarillo"
     ],
     "En su cartera, en el estuche"
    ]
   ],
   "info": [
    [
     "Los anteojos de Dona Lúcia son rojos.",
     true
    ],
    [
     "El paraguas amarillo es de Nanda.",
     false
    ],
    [
     "Nanda va a llamar a Carol.",
     true
    ]
   ],
   "grammatica": {
    "label": "los posesivos (seu, dele, dela) y los demostrativos (este, esse)",
    "forme": [
     "os meus óculos",
     "são estes",
     "esses não são meus",
     "os meus são vermelhos",
     "os do meu irmão",
     "este guarda-chuva",
     "é da senhora",
     "da minha neta",
     "é dela",
     "esta carteira",
     "essa carteira",
     "do meu genro",
     "da minha filha",
     "a cara dele",
     "os seus óculos",
     "na minha bolsa",
     "é seu"
    ]
   },
   "parole": [
    [
     "óculos",
     "óculos"
    ],
    [
     "irmão",
     "irmão / irmã"
    ],
    [
     "guarda-chuva",
     "guarda-chuva"
    ],
    [
     "carteira",
     "carteira"
    ],
    [
     "quarto",
     "quarto"
    ],
    [
     "travesseiro",
     "travesseiro"
    ]
   ],
   "qlang": "es",
   "infoPrompt": "¿Lo dice o no lo dice?",
   "infoYes": "Lo dice",
   "infoNo": "No lo dice"
  },
  {
   "week": 11,
   "level": "A2",
   "title": "A Sofía voltou de Salvador",
   "genre": "telefonema ao vivo",
   "es": "Sofía volvió de un viaje a Salvador de Bahía y llama a la radio para contarlo. No todo salió como estaba previsto.",
   "speakers": [
    "Nanda",
    "Sofía"
   ],
   "turns": [
    [
     "A",
     "Bom dia! Temos na linha uma amiga da rádio: a Sofía! Sofía, faz uma semana que você não liga."
    ],
    [
     "B",
     "Oi, Nanda! Fui a Salvador com a Bia. A gente voltou ontem de noite."
    ],
    [
     "A",
     "Que maravilha! E como foi a viagem?"
    ],
    [
     "B",
     "Começou mal. O voo saiu do Rio com duas horas de atraso, e em Salvador a minha mala demorou muito para chegar."
    ],
    [
     "A",
     "Coitada! E onde vocês ficaram?"
    ],
    [
     "B",
     "Numa pousada no Rio Vermelho, perto do mar. A dona foi muito simpática: ela preparou um café da manhã enorme todos os dias."
    ],
    [
     "A",
     "E o que vocês fizeram lá?"
    ],
    [
     "B",
     "Andamos pelo Pelourinho, vimos uma roda de capoeira e comemos acarajé na praia. A Bia provou a pimenta e chorou de rir!"
    ],
    [
     "A",
     "E a volta?"
    ],
    [
     "B",
     "Anteontem eu esqueci o celular na pousada e voltei correndo para pegar o telefone antes de ir embora. Enfim, a gente chegou ao aeroporto na hora certa."
    ],
    [
     "A",
     "Que aventura! E agora, saudade de Salvador?"
    ],
    [
     "B",
     "Muita saudade! Da comida, da música, do mar... Quero voltar no ano que vem."
    ],
    [
     "A",
     "Obrigada, Sofía! E vocês, ouvintes, para onde vocês viajaram nas últimas férias?"
    ]
   ],
   "gloss": {
    "na linha": "en línea, al teléfono",
    "ouvintes": "oyentes",
    "Faz uma semana": "hace una semana",
    "atraso": "atraso, demora",
    "Coitada": "pobrecita",
    "dona": "dueña",
    "roda de capoeira": "ronda de capoeira",
    "acarajé": "buñuelo bahiano de porotos, frito en aceite de palma",
    "pimenta": "ají picante",
    "chorou de rir": "lloró de risa",
    "na hora certa": "a tiempo, justo a la hora",
    "aventura": "aventura",
    "férias": "vacaciones",
    "maravilha": "maravilla"
   },
   "questions": [
    [
     "¿Qué pasó con la valija de Sofía en Salvador?",
     [
      "Se perdió para siempre",
      "Tardó mucho en llegar",
      "Llegó abierta",
      "Quedó en Río de Janeiro"
     ],
     "Tardó mucho en llegar"
    ],
    [
     "¿Qué hizo la dueña de la posada?",
     [
      "Les preparó un desayuno enorme todos los días",
      "Las llevó al aeropuerto",
      "Les enseñó capoeira",
      "Les cocinó acarajé"
     ],
     "Les preparó un desayuno enorme todos los días"
    ],
    [
     "¿Qué se olvidó Sofía en la posada?",
     [
      "La valija",
      "El pasaje",
      "El celular",
      "La billetera"
     ],
     "El celular"
    ]
   ],
   "info": [
    [
     "Sofía y Bia volvieron ayer a la noche.",
     true
    ],
    [
     "El vuelo salió a horario.",
     false
    ],
    [
     "Sofía quiere volver a Salvador el año que viene.",
     true
    ]
   ],
   "grammatica": {
    "label": "el pretérito perfeito, regulares e irregulares",
    "forme": [
     "fui",
     "voltou",
     "foi",
     "começou",
     "saiu",
     "demorou",
     "ficaram",
     "preparou",
     "fizeram",
     "andamos",
     "vimos",
     "comemos",
     "provou",
     "chorou",
     "esqueci",
     "voltei",
     "chegou",
     "viajaram"
    ]
   },
   "parole": [
    [
     "ontem",
     "ontem"
    ],
    [
     "voo",
     "voo"
    ],
    [
     "mala",
     "mala"
    ],
    [
     "demorou",
     "demorar"
    ],
    [
     "chegar",
     "chegar"
    ],
    [
     "ficaram",
     "ficar"
    ],
    [
     "pousada",
     "pousada"
    ],
    [
     "anteontem",
     "anteontem"
    ],
    [
     "esqueci",
     "esquecer"
    ],
    [
     "ir embora",
     "ir embora"
    ],
    [
     "enfim",
     "enfim"
    ],
    [
     "saudade",
     "saudade"
    ]
   ],
   "qlang": "es",
   "infoPrompt": "¿Lo dice o no lo dice?",
   "infoYes": "Lo dice",
   "infoNo": "No lo dice"
  },
  {
   "week": 12,
   "level": "A2",
   "title": "Téo, se cuida!",
   "genre": "quadro «Saúde no ar»",
   "es": "Téo llega a la radio caminando raro y con tos. En la sección de salud, Nanda le pregunta por su rutina y le da consejos, y hasta una receta de la abuela.",
   "speakers": [
    "Nanda",
    "Téo"
   ],
   "turns": [
    [
     "A",
     "Bom dia! Começa agora o quadro «Saúde no ar», e hoje o paciente é o Téo. O que aconteceu, Téo?"
    ],
    [
     "B",
     "Ai, Nanda... Ontem machuquei as costas na academia. Agora dói o ombro, o pescoço... e ainda tô com tosse."
    ],
    [
     "A",
     "Coitado! Me conta: a que horas você se levanta?"
    ],
    [
     "B",
     "Eu me levanto às cinco, me visto rápido e vou para a academia. Depois venho para a rádio e só me deito à meia-noite."
    ],
    [
     "A",
     "Aí está o problema! Escuta a doutora Nanda. Primeiro: hoje não vá à academia. Descanse e não carregue peso."
    ],
    [
     "B",
     "Nem a mochila?"
    ],
    [
     "A",
     "Nem a mochila! Segundo: coloque uma bolsa de água quente nas costas. Terceiro: deite-se mais cedo."
    ],
    [
     "B",
     "Tá bom. E para a tosse?"
    ],
    [
     "A",
     "Anote a receita da minha avó. Coloque água numa panela com um pedaço de gengibre e ferva cinco minutos. Depois tire do fogo, ponha uma colher de mel e beba bem quente."
    ],
    [
     "B",
     "Parece bom. E se a tosse continua?"
    ],
    [
     "A",
     "Aí vá ao médico, hein? E lembre-se de escovar os dentes depois do mel. Cadê a sua escova de dentes?"
    ],
    [
     "B",
     "Na mochila, que eu não posso carregar!"
    ],
    [
     "A",
     "Então eu carrego. E vocês, ouvintes: qual é o remédio da sua avó?"
    ]
   ],
   "gloss": {
    "quadro": "sección (de un programa)",
    "paciente": "paciente",
    "academia": "gimnasio",
    "dói": "duele",
    "Coitado": "pobrecito",
    "carregue peso": "levantes peso",
    "bolsa de água quente": "bolsa de agua caliente",
    "gengibre": "jengibre",
    "ferva": "hacé hervir",
    "mel": "miel",
    "remédio": "remedio",
    "ouvintes": "oyentes",
    "mochila": "mochila",
    "fogo": "fuego"
   },
   "questions": [
    [
     "¿Qué le pasó a Téo ayer?",
     [
      "Se lastimó la espalda en el gimnasio",
      "Se cayó de la bicicleta",
      "Se quemó con agua caliente",
      "Se durmió en la radio"
     ],
     "Se lastimó la espalda en el gimnasio"
    ],
    [
     "¿Qué le dice Nanda que haga hoy?",
     [
      "Ir al gimnasio más tarde, después de la radio",
      "Descansar y no levantar peso",
      "Ir al médico enseguida",
      "Tomar un café bien caliente"
     ],
     "Descansar y no levantar peso"
    ],
    [
     "¿Para qué sirve la receta de la abuela de Nanda?",
     [
      "Para el dolor de espalda",
      "Para la tos",
      "Para dormir",
      "Para el dolor de panza"
     ],
     "Para la tos"
    ]
   ],
   "info": [
    [
     "Téo se levanta a las cinco.",
     true
    ],
    [
     "Nanda le dice que se ponga hielo en la espalda.",
     false
    ],
    [
     "El té lleva jengibre y miel.",
     true
    ]
   ],
   "grammatica": {
    "label": "el imperativo con você y los reflexivos con el pronombre delante",
    "forme": [
     "você se levanta",
     "eu me levanto",
     "me visto",
     "me deito",
     "escuta",
     "não vá",
     "descanse",
     "não carregue",
     "coloque",
     "deite-se",
     "anote",
     "ponha",
     "ferva",
     "tire",
     "beba",
     "vá ao médico",
     "lembre-se"
    ]
   },
   "parole": [
    [
     "costas",
     "costas"
    ],
    [
     "machuquei",
     "machucar"
    ],
    [
     "ombro",
     "ombro"
    ],
    [
     "pescoço",
     "pescoço"
    ],
    [
     "tosse",
     "tosse"
    ],
    [
     "receita",
     "receita"
    ],
    [
     "panela",
     "panela"
    ],
    [
     "colher",
     "colher"
    ],
    [
     "lembre-se",
     "lembrar"
    ],
    [
     "escova de dentes",
     "escova de dentes"
    ]
   ],
   "qlang": "es",
   "infoPrompt": "¿Lo dice o no lo dice?",
   "infoYes": "Lo dice",
   "infoNo": "No lo dice"
  }
 ]
};
  if (typeof module === "object" && module.exports) module.exports = root.RADIO_DATA;
})(typeof window !== "undefined" ? window : globalThis);
