# -*- coding: utf-8 -*-
"""«Ya puedo…»: lo que tenés que poder hacer al final de cada semana.

Tres o cuatro objetivos por semana, escritos como acciones (a partir de
`fare` en curriculo.SAI_FARE, `focus` y la lección), cada uno atado a uno o
dos ítems de esa misma semana (sus ids en course.json).  Se ven al abrir la
semana y, al terminar las misiones, la app pregunta «¿Ya podés…?»: si decís
que sí, te lo prueba con esos ítems (docs/js/puedo.js).

build_course.py lo copia a cada semana como `can: [{t, items}]` y descarta
(con aviso) los ids que ya no estén en la semana.  Test:
tools/lib/test_puedo.js.
"""

CAN = {
    1: [
        ("Saludar y presentarte: Oi, tudo bem? Eu me chamo…", ["s1-01-29", "s1-01-30"]),
        ("Decir de dónde sos y cuántos años tenés", ["s1-01-32", "s1-01-33"]),
        ("Decir que tenés hambre o sed: estou com fome", ["s1-01-34", "s1-01-36"]),
        ("Elegir entre ser, estar y ficar para ubicar algo", ["gr0-1-01", "gr0-1-04"]),
    ],
    2: [
        ("Decir qué hay con tem", ["s1-02-35", "s1-02-36"]),
        ("Pasar al plural los -ão y los -l: estações, animais", ["s1-02-15", "s1-02-16"]),
        ("Acertar el género que cambia: o leite, a viagem", ["s1-02-32", "s1-02-33"]),
        ("Hablar de tu familia en plural: dois irmãos", ["s1-02-30", "s1-02-31"]),
    ],
    3: [
        ("Decir dónde estás: na praia, no centro", ["s1-03-29", "s1-03-30"]),
        ("Contraer el artículo con la preposición: do, nas, pela", ["s1-03-19", "s1-03-23"]),
        ("Ubicar cosas: em cima da mesa, perto da praia", ["s1-03-34", "s1-03-35"]),
        ("Decir dónde queda algo: onde fica a estação?", ["gr0-3-01", "gr0-3-03"]),
    ],
    4: [
        ("Decir la nacionalidad: argentina, brasileiro, portuguesa", ["s1-04-31", "s1-04-47"]),
        ("Describir a alguien con el adjetivo concordado", ["s1-04-36", "s1-04-16"]),
        ("Usar muito para «muy» y para «mucho»", ["s1-04-34", "s1-04-35"]),
        ("Comparar: mais alta do que, melhor", ["gr2-4-08", "gr2-4-10"]),
    ],
    5: [
        ("Contar tu rutina: eu acordo cedo, à noite a gente janta", ["s1-05-34", "s1-05-35"]),
        ("Preguntarle algo a alguien con você", ["s1-05-28", "cx-c-5-05"]),
        ("Contestar a la brasileña, con el verbo: moro, não falo", ["cx-c-5-01", "cx-c-5-03"]),
        ("Decir dónde vivís y de qué trabajás", ["s1-05-29", "s1-05-33"]),
    ],
    6: [
        ("Proponer un plan: vamos à praia?", ["s1-06-36", "s1-06-29"]),
        ("Decir que no podés o no sabés: não posso, não sei", ["s1-06-31", "s1-06-33"]),
        ("Aceptar una invitación con el verbo: posso!", ["cx-c-6-01"]),
        ("Usar los irregulares en yo: peço, durmo, consigo", ["s1-06-34", "gr0-6-07"]),
    ],
    7: [
        ("Decir la hora y a qué hora empieza algo", ["s1-07-34", "s1-07-36"]),
        ("Decir qué día es y cuándo pasa algo: na segunda, em março", ["s1-07-31", "gr4-7-08"]),
        ("Pedir y preguntar precios: duas cervejas, quanto custa?", ["s1-07-30", "s1-07-35"]),
        ("Decir cuándo vuelve algo: daqui a uma hora", ["gr4-7-06", "gr4-7-05"]),
    ],
    8: [
        ("Hacer preguntas: onde você mora?, por que…?", ["s1-08-28", "s1-08-29"]),
        ("Contar tus planes con ir + infinitivo", ["s1-08-30", "s1-08-31"]),
        ("Preguntar como en el habla, con é que", ["cx-c-8-01", "gr3-8-05"]),
        ("Contestar a la brasileña: vou, não estou", ["cx-c-8-03", "cx-c-8-04"]),
    ],
    9: [
        ("Decir dónde vivís: moro no Rio", ["s1-09-28", "s1-09-30"]),
        ("Decir cómo te movés: de ônibus, a pé", ["s1-09-31", "s1-09-32"]),
        ("Dar indicaciones: vira à direita, a terceira rua", ["s1-09-35", "gr2-9-02"]),
        ("Agradecer con pelo: obrigado pela ajuda", ["gr4-9-05", "gr4-9-03"]),
    ],
    10: [
        ("Hablar de tu familia: minha irmã, meus pais", ["s1-10-28", "s1-10-34"]),
        ("Decir de quién es algo: o carro dele", ["s1-10-30", "s1-10-19"]),
        ("Señalar cosas: essa mala, o que é isso?", ["s1-10-29", "s1-10-32"]),
        ("Preguntar el teléfono con seu", ["s1-10-31", "s1-10-18"]),
    ],
    11: [
        ("Contar lo que hiciste ayer", ["s1-11-30", "s1-11-32"]),
        ("Preguntar qué hizo alguien: o que você fez?", ["s1-11-33", "s1-11-37"]),
        ("Usar el perfeito para «he comido»: hoje eu comi", ["s1-11-36"]),
        ("Decir hace cuánto: cheguei há duas semanas", ["cx-b-11-01", "cx-b-11-03"]),
    ],
    12: [
        ("Pedir algo con el imperativo de você: fale devagar", ["s1-12-30", "s1-12-32"]),
        ("Pedir como en el habla: me liga amanhã, me dá um minuto", ["gr0-12-05", "gr0-12-06"]),
        ("Contar tu rutina con reflexivos: me visto, a gente se vê", ["gr0-12-01", "cx-c-12-02"]),
        ("Hablarle con respeto a una persona mayor: o senhor", ["gr4-12-02", "gr4-12-04"]),
    ],
    13: [
        ("Contar lo que hiciste: ontem vi o Pão de Açúcar", ["s1-13-14", "s1-13-11"]),
        ("Decir de quién es algo: o irmão dela", ["s1-13-15"]),
        ("Decir cuándo: há duas semanas, daqui a um mês", ["gr4-13-01", "gr4-13-02"]),
        ("Ubicar cosas: em cima, embaixo", ["gr4-13-04"]),
    ],
    14: [
        ("Decir qué te gusta: eu gosto do mar", ["s2-14-13", "s2-14-07"]),
        ("Decir qué le gusta a otro: a minha irmã gosta de gatos", ["s2-14-14", "s2-14-16"]),
        ("Decir qué necesitás o en qué pensás: preciso de, penso em", ["s2-14-32", "s2-14-34"]),
        ("Opinar con achar: acho que não", ["s2-14-44"]),
    ],
    15: [
        ("Contar cómo era tu infancia en imperfeito", ["s2-15-12", "cx-c-15-01"]),
        ("Contar costumbres de antes: todo domingo a gente ia", ["s2-15-33", "s2-15-14"]),
        ("Describir una escena: fazia calor, estava chovendo", ["s2-15-32", "s2-15-43"]),
        ("Decir que te pusiste o te quedaste: fiquei triste", ["gr0-15-08", "gr0-15-10"]),
    ],
    16: [
        ("Hablar sin repetir: te ligo, ele não me viu", ["s2-16-10", "s2-16-11"]),
        ("Pedir algo como en el habla: me passa o sal?", ["s2-16-12"]),
        ("Escribir el pronombre formal: eu o vi, vou comprá-lo", ["s2-16-25", "s2-16-26"]),
        ("Decir para quién o con quién: para mim, conosco", ["s2-16-41", "s2-16-42"]),
    ],
    17: [
        ("Contar planes como en el habla: vou trabalhar, vou te ligar", ["s2-17-30", "s2-17-31"]),
        ("Prometer o anunciar en futuro simple: farei o possível", ["s2-17-13", "s2-17-44"]),
        ("Hablar del clima: faz muito calor, será que vai chover?", ["s2-17-43", "s2-17-42"]),
        ("Conjugar los futuros irregulares: trarei, direi", ["s2-17-07", "s2-17-23"]),
    ],
    18: [
        ("Pedir con cortesía: eu gostaria de um café", ["s2-18-12", "s2-18-30"]),
        ("Pedir un favor: você poderia me trazer a conta?", ["s2-18-29", "s2-18-31"]),
        ("Rechazar una invitación sin sonar seco", ["prag-18-1", "prag-18-2"]),
        ("Dar un consejo: você deveria, no seu lugar eu ficaria", ["s2-18-42", "s2-18-43"]),
    ],
    19: [
        ("Comparar: maior do que, melhor do que", ["s2-19-15", "s2-19-16"]),
        ("Decir que dos cosas son iguales: tão alto quanto", ["s2-19-17"]),
        ("Decir lo mejor: a praia mais bonita, o melhor dia", ["s2-19-38", "s2-19-41"]),
        ("Ponderar con bem e -íssimo: bem perto, caríssimo", ["s2-19-39", "s2-19-45"]),
    ],
    20: [
        ("Distinguir tudo de todo: comi tudo, todo dia", ["gr2-20-08", "s2-20-16"]),
        ("Negar: não tenho nenhum problema", ["s2-20-17"]),
        ("Negar como en Río: não sei não", ["cx-c-20-01", "cx-c-20-02"]),
        ("Reaccionar: pois é, nem pensar", ["cx-c-20-03", "prag-20-2"]),
    ],
    21: [
        ("Contar lo que venís haciendo: tenho trabalhado muito", ["s2-21-10", "s2-21-31"]),
        ("Decir «he hecho» con el perfeito simple: hoje eu comi", ["s2-21-29", "s2-21-32"]),
        ("Contar lo que ya había pasado: já tinham ido embora", ["s2-21-43", "s2-21-44"]),
        ("Decir desde cuándo o que recién pasó: faz três anos, acabei de chegar", ["cx-b-21-01", "cx-b-21-03"]),
    ],
    22: [
        ("Contar quién hizo algo con la pasiva: foi construída em 1920", ["s2-22-37", "s2-22-39"]),
        ("Describir cómo está algo: a porta está aberta", ["s2-22-15", "s2-22-38"]),
        ("Usar el participio corto: foi entregue, está paga", ["s2-22-16", "s2-22-17"]),
        ("Decir que te pusiste o te volviste: fiquei nervoso, virou médico", ["cx-b-22-01", "cx-b-22-02"]),
    ],
    23: [
        ("Desear algo: tomara que seja verdade", ["s2-23-12", "gr4-23-01"]),
        ("Pedirle o recomendarle algo a alguien: quero que você venha", ["s2-23-30", "s2-23-31"]),
        ("Dudar con subjuntivo: duvido que ele saiba, talvez", ["s2-23-43", "gr1-23-02"]),
        ("Opinar con acho que + indicativo", ["s2-23-42"]),
    ],
    24: [
        ("Decir para qué: para que você entenda", ["s2-24-09", "col-24-1"]),
        ("Hacer una concesión: embora esteja cansada", ["s2-24-25"]),
        ("Poner una condición: a não ser que chova, desde que você cuide", ["gr1-24-01", "gr3-24-03"]),
        ("Hacer una pregunta que es una duda: será que vai chover?", ["prag-24-3"]),
    ],
    25: [
        ("Unir frases con que y quem: a amiga com quem viajei", ["s2-25-10", "s2-25-11"]),
        ("Hablar de lugares con onde y em que", ["s2-25-12", "s2-25-28"]),
        ("Decir «lo que»: não entendi o que ele disse", ["s2-25-26", "s2-25-22"]),
        ("Buscar algo que todavía no existe: procuro alguém que fale", ["gr1-25-07", "gr1-25-06"]),
    ],
    26: [
        ("Contar recuerdos: quando eu tinha dez anos, morava…", ["s2-26-07"]),
        ("Decir que empezó, dejó o siguió algo: começou a chover", ["gr0-26-01", "gr0-26-03"]),
        ("Dudar o poner condiciones con subjuntivo", ["gr1-26-01", "gr1-26-02"]),
        ("Comparar: maior, tão caro quanto", ["gr2-26-01", "gr2-26-02"]),
    ],
    27: [
        ("Decir qué vas a hacer cuando algo pase: quando eu tiver tempo", ["s3-27-25", "s3-27-28"]),
        ("Poner una condición abierta: se você quiser, se chover", ["s3-27-30", "s3-27-32"]),
        ("Usar las formas irregulares: quando você vir, quiser", ["s3-27-27", "s3-27-42"]),
        ("Distinguir costumbre de futuro: quando eu recebo / receber", ["cx-a-27-07", "cx-a-27-08"]),
    ],
    28: [
        ("Imaginar otra situación: se eu tivesse dinheiro, viajaria", ["s3-28-25", "s3-28-13"]),
        ("Preguntar qué harías: o que você faria se ganhasse?", ["s3-28-28"]),
        ("Dar un consejo: se eu fosse você, não iria", ["s3-28-32"]),
        ("Contar lo que querías: queria que você viesse; como se fosse", ["s3-28-30", "s3-28-31"]),
    ],
    29: [
        ("Decir para quién o para qué con infinitivo personal: para vocês acharem", ["s3-29-25", "s3-29-13"]),
        ("Opinar con infinitivo personal: é bom vocês chegarem cedo", ["s3-29-27", "s3-29-28"]),
        ("Decir antes o sin que otros hagan algo: antes de vocês saírem", ["s3-29-26", "s3-29-29"]),
        ("Decirlo como en el habla: pra gente ouvir, deixa eu ver", ["s3-29-32", "gr1-29-04"]),
    ],
    30: [
        ("Imaginar el pasado que no fue: se eu tivesse sabido, teria ido", ["s3-30-25", "s3-30-26"]),
        ("Unir pasado y presente: se tivesse aceitado, hoje moraria", ["s3-30-27"]),
        ("Desear o dudar sobre algo pasado: espero que tenham gostado", ["s3-30-28", "s3-30-29"]),
        ("Elegir la forma de la condición: se eu tiver, tivesse, tivesse tido", ["gr1-30-02", "gr1-30-03"]),
    ],
    31: [
        ("Contar lo que alguien dijo: ele disse que morava", ["s3-31-25", "s3-31-14"]),
        ("Contar algo pasado que te dijeron: disse que tinha visto", ["s3-31-26", "s3-31-15"]),
        ("Contar un pedido: ela me pediu que eu fosse", ["s3-31-28", "s3-31-19"]),
        ("Contar una pregunta: me perguntou se eu ia", ["s3-31-30", "s3-31-31"]),
    ],
    32: [
        ("Escribir un aviso: alugam-se apartamentos, precisa-se de", ["s3-32-25", "s3-32-26"]),
        ("Contar costumbres con se: aqui se fala espanhol", ["s3-32-27", "s3-32-32"]),
        ("Hablar sin decir quién: roubaram o meu celular, dizem que", ["s3-32-30", "s3-32-29"]),
        ("Hablar en general con a gente: aqui a gente se levanta cedo", ["cx-c-32-01"]),
    ],
    33: [
        ("Leer y escribir el pronombre formal: disse-me, não me disse", ["s3-33-25", "s3-33-26"]),
        ("Pegar el pronombre al infinitivo: tenho de vendê-lo", ["s3-33-28"]),
        ("Decir que volviste a algo o que vivís haciéndolo: voltei a fumar", ["cx-b-33-01", "cx-b-33-03"]),
        ("Decirlo como en el habla: vou te ligar amanhã", ["s3-33-30"]),
    ],
    34: [
        ("Oponer ideas: mas, no entanto", ["s3-34-25", "s3-34-27"]),
        ("Dar causa y consecuencia: por isso, já que", ["s3-34-28", "s3-34-29"]),
        ("Agregar y aclarar: inclusive, ou seja, aliás", ["s3-34-30", "s3-34-31"]),
        ("Decir que algo fue tanto que…: tão cansado que", ["gr3-34-02", "gr3-34-05"]),
    ],
    35: [
        ("Usar el verbo con su preposición: assistir ao jogo, sonhar com", ["s3-35-27", "s3-35-28"]),
        ("Usar el verbo sin preposición: namorar alguém, ajudar o vizinho", ["s3-35-26", "gr4-35-07"]),
        ("Preferir una cosa a otra", ["s3-35-25"]),
        ("Decir adónde llegaste: cheguei a São Paulo, ao aeroporto", ["gr4-35-05", "gr4-35-01"]),
    ],
    36: [
        ("Poner crase al ir a un lugar femenino: vou à feira", ["s3-36-25", "s3-36-28"]),
        ("Poner crase en las horas: às três, das dez às cinco", ["s3-36-32", "s3-36-26"]),
        ("No ponerla ante pronombre o masculino: dei o livro a ela", ["s3-36-27"]),
        ("Usar las locuciones: à vontade, à vista", ["s3-36-29", "s3-36-30"]),
    ],
    37: [
        ("Conjugar los derivados de ter y vir: mantêm, interveio", ["s3-37-25", "s3-37-26"]),
        ("Conjugar los derivados de pôr y ver: propôs, preveem", ["s3-37-27", "s3-37-28"]),
        ("Conjugar los -ear y -iar: passeamos, odeio", ["s3-37-29", "s3-37-30"]),
        ("Usar los irregulares sueltos: não coube, perco, meço", ["s3-37-31", "s3-37-32"]),
    ],
    38: [
        ("Hablar como en una charla: tô cansado, né", ["s3-38-25"]),
        ("Pedir entre amigos: me conta tudo, me manda o arquivo", ["gr0-38-02", "gr0-38-01"]),
        ("Preguntar con é que: o que é que aconteceu?", ["cx-c-38-03"]),
        ("Usar a gente con el verbo justo: a gente se vê", ["cx-c-38-05", "cx-c-38-06"]),
    ],
    39: [
        ("Imaginar el pasado: se eu tivesse estudado, teria passado", ["s3-39-07", "gr1-39-03"]),
        ("Hablar del futuro con futuro do subjuntivo: quando eu chegar", ["s3-39-08", "cx-a-39-01"]),
        ("Concordar los tiempos: quero que venha, queria que viesse", ["gr1-39-05", "gr1-39-06"]),
        ("Usar los verbos con su preposición: ligar para, ajudar a", ["gr4-39-03", "gr4-39-04"]),
    ],
    40: [
        ("Escribir con sustantivos: o aumento dos preços, a decisão", ["s4-40-25", "s4-40-26"]),
        ("Retomar sin repetir: isso preocupa, entrar nele", ["gr3-40-10", "gr3-40-13"]),
        ("Escribir un aviso formal: é proibida a entrada", ["gr3-40-08", "gr3-40-09"]),
        ("Ofrecerte por escrito: se houver qualquer dúvida", ["cx-a-40-02"]),
    ],
    41: [
        ("Contar algo anterior en el relato: ela já tinha saído", ["s4-41-25", "s4-41-32"]),
        ("Pasar del mais-que-perfeito literario al del habla", ["s4-41-16", "s4-41-19"]),
        ("Usar el mais-que-perfeito simple: partira, dissera", ["s4-41-13", "s4-41-17"]),
        ("Desear lo imposible: quem me dera!", ["s4-41-31", "gr1-41-03"]),
    ],
    42: [
        ("Abrir con infinitivo: ao chegar em casa, ao chegarmos", ["s4-42-25", "s4-42-27"]),
        ("Abrir con participio: terminada a reunião, feitas as contas", ["s4-42-29", "s4-42-30"]),
        ("Condensar con gerundio: saindo cedo, estando cansada", ["s4-42-13", "s4-42-14"]),
        ("Decir antes o después de qué: antes de sair, depois de ler", ["s4-42-26", "s4-42-28"]),
    ],
    43: [
        ("Abrir y cerrar un mail formal: Prezada Senhora, Atenciosamente", ["s4-43-25", "s4-43-26"]),
        ("Mandar un adjunto: segue em anexo", ["s4-43-27", "pc1-43-01"]),
        ("Pedir algo formalmente: agradeceria se o senhor me informasse", ["pc1-43-02", "gr4-43-02"]),
        ("Evitar el gerundio de telemarketing: vou confirmar", ["gr1-43-02", "gr1-43-03"]),
    ],
    44: [
        ("Formar sustantivos: a beleza, a felicidade, a aprendizagem", ["s4-44-25", "s4-44-27"]),
        ("Nominalizar una frase: o atraso, a falta de pontualidade", ["pc1-44-05", "pc1-44-06"]),
        ("Escribir bien los prefijos: antissocial, autoescola", ["gr4-44-06", "gr4-44-05"]),
        ("Decir oficios con -eiro: o borracheiro", ["s4-44-28"]),
    ],
    45: [
        ("Esquivar falsos amigos: esquisito, apelido", ["s4-45-25", "s4-45-26"]),
        ("Elegir la palabra justa: escritório, oficina, copo, taça", ["s4-45-29", "s4-45-28"]),
        ("Decir largo y ancho: comprida, larga", ["s4-45-27", "s4-45-31"]),
        ("Acertar el género distinto: o sal, a ponte", ["s4-45-30", "pc1-45-04"]),
    ],
    46: [
        ("Decir lo mismo en Brasil y en Portugal: está fazendo, está a fazer", ["s4-46-25", "s4-46-26"]),
        ("Usar el léxico de Portugal: apanhei o comboio", ["s4-46-27"]),
        ("Pasar del portugués europeo al de Brasil: me diz", ["pc1-46-05"]),
        ("Hablar del transporte en Brasil: celular, ônibus, trem", ["pc1-46-01", "pc1-46-02"]),
    ],
    47: [
        ("Afirmar con matices: é possível que, tudo indica que", ["s4-47-25", "pc1-47-01"]),
        ("Rebatir con cuidado: não acho que seja tão simples", ["s4-47-26", "pc1-47-02"]),
        ("Conceder con infinitivo personal: apesar de não concordarmos", ["cx-b-47-04", "cx-b-47-03"]),
        ("Retomar sin repetir: tais cortes, eles", ["gr3-47-02", "gr3-47-03"]),
    ],
    48: [
        ("Citar a un autor con el verbo justo: ressalta, aponta", ["s4-48-27", "pc1-48-01"]),
        ("Atribuir la información: segundo o IBGE", ["s4-48-28", "pc1-48-04"]),
        ("Reformular: ou seja, em outras palavras", ["s4-48-29", "pc1-48-03"]),
        ("Opinar sobre un texto: concordo com o autor, o texto se refere à", ["s4-48-25", "s4-48-26"]),
    ],
    49: [
        ("Pasar de a gente a nós: nós vamos solicitar", ["s4-49-25", "cx-c-49-01"]),
        ("Usar haver en lo escrito: houve muitas reclamações", ["s4-49-27", "pc1-49-01"]),
        ("Usar el pronombre formal: eu o vi, o convidamos", ["s4-49-26", "pc1-49-02"]),
        ("Escribir un pedido formal: solicito que o produto seja trocado", ["gr4-49-01", "gr1-49-01"]),
    ],
    50: [
        ("Usar los verbos que van juntos: faço questão, levar a sério", ["s4-50-25", "s4-50-26"]),
        ("Usar expresiones: pisei na bola, demos um jeito", ["s4-50-28", "s4-50-29"]),
        ("Decir «pase lo que pase»: custe o que custar", ["gr1-50-04", "cx-a-50-02"]),
        ("Hablar de resultados: deu certo, desempenhou um papel", ["pc1-50-05", "pc1-50-02"]),
    ],
    51: [
        ("Hablar del futuro con futuro do subjuntivo: quando você chegar", ["s4-51-25", "gr1-51-02"]),
        ("Poner condiciones en los tres tiempos", ["gr1-51-01", "s4-51-26"]),
        ("Concordar los tiempos: peço que assine, pedi que assinasse", ["gr1-51-05", "gr1-51-04"]),
        ("Concordar el verbo con el sujeto: chegaram as encomendas", ["gr3-51-02", "gr3-51-01"]),
    ],
    52: [
        ("Hablar del futuro con futuro do subjuntivo", ["s4-51-25", "gr1-51-02"]),
        ("Contar lo que alguien dijo, con los tiempos corridos", ["gr1-51-04"]),
        ("Escribir en registro formal: houve, eu o vi", ["s4-49-27", "s4-49-26"]),
        ("Concordar el verbo: mais de um candidato desistiu", ["gr3-52-01", "gr3-51-02"]),
    ],
}
