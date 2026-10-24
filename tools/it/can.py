# -*- coding: utf-8 -*-
"""«Ya puedo…»: lo que tenés que poder hacer al final de cada semana.

Tres o cuatro objetivos por semana, escritos como acciones (a partir de
`fare`, `focus` y la lección de build_course.py), cada uno atado a uno o
dos ítems de esa misma semana (sus ids en course.json).  Se ven al abrir la
semana y, al terminar las misiones, la app pregunta «¿Ya podés…?»: si decís
que sí, te lo prueba con esos ítems (docs/js/puedo.js).

build_course.py lo copia a cada semana como `can: [{t, items}]` y descarta
(con aviso) los ids que ya no estén en la semana.  Test:
tools/lib/test_puedo.js.
"""

CAN = {
    1: [
        ("Decir quién sos y cómo estás con essere", ["d07-005", "d07-002"]),
        ("Decir que tenés hambre, frío o sueño con avere (no con essere)", ["d07-016", "g2-va-22"]),
        ("Presentarte y decir de dónde sos", ["rf-1-14"]),
        ("Escribir bien acentos y dobles: città, è, nonno", ["rf-1-24", "g2-va-16"]),
    ],
    2: [
        ("Decir qué hay con c'è y ci sono", ["g2-sc-04-c", "s:r01-01:b"]),
        ("Saber si una cosa es masculina o femenina (il problema, la lezione)", ["d03-008", "g2-va-26"]),
        ("Pasar los sustantivos al plural", ["g2-sc-06-c", "g2-sc-06-b"]),
        ("Contestar «prego» cuando te agradecen", ["cx-c-2-01"]),
    ],
    3: [
        ("Poner el artículo justo, también lo y gli", ["g2-sc-05-c", "g2-va-44"]),
        ("Pedir en el bar: il latte, l'acqua", ["ar-g-14", "ar-g-16"]),
        ("Hablar de tu familia y tus cosas: mia madre, il mio libro", ["ar-u-05", "ar-u-02"]),
        ("Usar del, nel, alla: preposición y artículo juntos", ["s:r02-03:b", "s:r02-03:e"]),
    ],
    4: [
        ("Decir de qué nacionalidad es alguien", ["mj-04-12", "mj-04-11"]),
        ("Decir la edad con avere", ["mj-04-10"]),
        ("Describir personas con el adjetivo concordado", ["rf-4-23", "rf-4-16"]),
        ("Usar molto bien: molto stanche, molta fame", ["mj-04-07", "g2-va-08"]),
    ],
    5: [
        ("Contar tu rutina en presente", ["d06-063", "d06-061"]),
        ("Hablarle a alguien de tu (vos): mangi, paghi", ["d06-054", "s:r18-03:a"]),
        ("Proponer un café y pagar: prendiamo, pagano", ["l2-c-18", "d06-055"]),
        ("Conjugar los verbos en -isc: capisco, finisco", ["d06-057", "d06-052"]),
    ],
    6: [
        ("Decir adónde vas y qué hacés: vado, faccio", ["g2-va-37", "s:r18-01:c"]),
        ("Contar qué estás haciendo ahora mismo (sto + gerundio)", ["mj-06-04", "mj-06-05"]),
        ("Distinguir «sé hacer» de «puedo»: so, posso", ["gr0-6-01", "gr0-6-04"]),
        ("Elegir entre essere y stare", ["mj-06-10", "mj-06-11"]),
    ],
    7: [
        ("Decir la hora", ["d04-032", "d04-035"]),
        ("Decir una fecha", ["s:r17-01b:a"]),
        ("Decir números y precios", ["s:r17-01:l", "s:r17-01:e"]),
        ("Contar a qué hora hacés las cosas", ["l2-c-31", "d04-036"]),
    ],
    8: [
        ("Preguntar dónde está algo", ["d11-022", "d11-025"]),
        ("Pedirle algo con cortesía a un desconocido", ["pr-08-01", "pr-08-03"]),
        ("Preguntar cuándo y adónde", ["d11-024", "d11-023"]),
        ("Escribir bien «qual è»", ["g2-va-72", "a2-ort-05"]),
    ],
    9: [
        ("Decir dónde vivís: a Roma, in Italia", ["b2-prep-01", "b2-prep-02"]),
        ("Decir desde cuándo hacés algo (da tre anni)", ["g2-ct-01", "mj-09-12"]),
        ("Decir que vas a lo de alguien (dal medico)", ["g2-ct-02", "mj-09-10"]),
        ("Decir cómo te movés: in bici, a piedi", ["mj-09-04", "mj-09-05"]),
    ],
    10: [
        ("Reemplazar el objeto por lo, la, li", ["g2-ct-03", "s:r07-05b:a"]),
        ("Decir a quién: le scrivo, gli dico", ["g2-ct-04"]),
        ("Pedir un favor: mi dai una mano?", ["l2-c-56", "l2-c-55"]),
        ("Ofrecer algo: vuoi qualcosa da bere?", ["cx-c-10-02"]),
    ],
    11: [
        ("Contar lo que hiciste ayer con avere", ["g2-ct-07", "l2-c-50"]),
        ("Contar adónde fuiste con essere", ["g2-ct-05", "g2-va-04"]),
        ("Usar los participios irregulares: visto, fatto", ["d16-002", "l2-c-51"]),
        ("Decir hace cuánto pasó algo (tre anni fa)", ["gr4-11-ti-02", "gr4-11-ti-01"]),
    ],
    12: [
        ("Contar tu mañana con reflexivos: mi alzo, mi lavo", ["g2-ct-08", "mj-12-04"]),
        ("Dar instrucciones y consejos de tu", ["mj-12-08", "g2-ct-09"]),
        ("Prohibir algo: non parlare, non bere", ["d09-021", "mj-12-06"]),
        ("Pedirle algo a un desconocido de Lei: mi dica, mi passi", ["mj-12-14", "s:r22-01b:b"]),
    ],
    13: [
        ("Elegir entre essere y stare sin dudar", ["gr0-13-02", "gr0-13-01"]),
        ("Contar el pasado con el auxiliar justo", ["gr0-13-05", "gr0-13-06"]),
        ("Distinguir «sé hacer» de «puedo»", ["gr0-13-03", "gr0-13-04"]),
        ("Pedir con imperativo y pronombre: fammi, dagli", ["gr0-13-07", "gr0-13-08"]),
    ],
    14: [
        ("Decir qué te gusta: mi piace, mi piacciono", ["g2-ct-10", "g2-sc-07-c"]),
        ("Decir qué le gusta a otro: a Marco non piace", ["g2-ct-11", "g2-va-57"]),
        ("Invitar a alguien a salir", ["pr-14-01"]),
        ("Rechazar o aceptar una invitación", ["pr-14-02", "pr-14-03"]),
    ],
    15: [
        ("Contar cómo era tu infancia en imperfetto", ["b2-pass-05", "g2-ct-12"]),
        ("Contar una escena: lo que pasaba y lo que pasó", ["g2-ct-13", "g2-sc-08-c"]),
        ("Elegir entre imperfetto y passato prossimo", ["g2-va-64", "g2-sc-08-b"]),
        ("Comparar antes y ahora: c'erano pochissime macchine", ["s:r20-01b:a", "s:r20-01b:b"]),
    ],
    16: [
        ("Contar tu día de ayer con reflexivos en pasado", ["cx-a-16-01", "g2-ct-15"]),
        ("Decir que la pasaron bien: ci siamo divertiti", ["g2-ct-14", "d17-003"]),
        ("Usar essere con los reflexivos en pasado", ["g2-va-65", "cx-a-16-03"]),
        ("Hablar en general con si: si mangia, si dice", ["gr1-16-02", "gr1-16-03"]),
    ],
    17: [
        ("Hablar de tu familia con el posesivo justo", ["g2-ct-16", "g2-va-03"]),
        ("Decir de quién es algo: del mio amico", ["g2-ct-17", "s:r08-01b:a"]),
        ("Decir dónde está algo en la casa o la ciudad", ["gr4-17-lu-06", "gr4-17-lu-07"]),
        ("Cuantificar: alcuni, troppi, tanti", ["d13-011", "d13-012"]),
    ],
    18: [
        ("Negar con doble negación: non … nessuno, mai", ["g2-ct-18", "g2-ct-19"]),
        ("Empezar con nessuno sin non", ["a2-neg-02"]),
        ("Decir que ya no: non … più", ["a2-neg-03"]),
        ("Exclamar: Come sei sbadato!", ["s:r11-03:c", "s:r11-03:a"]),
    ],
    19: [
        ("Contar tus planes en futuro", ["g2-ct-20", "d18-021"]),
        ("Hacer suposiciones: sarà a casa, saranno le otto", ["g2-ct-21", "g2-sc-15-a"]),
        ("Decir qué pasa cuando otra cosa ocurra: quando arriverete", ["d18-032"]),
        ("Poner plazos: entro lunedì, tra un anno", ["gr4-19-ti-02", "gr4-19-ti-03"]),
    ],
    20: [
        ("Pedir con cortesía: vorrei un tavolo per due", ["mj-20-10", "g2-va-53"]),
        ("Pedir un favor: potrebbe aiutarmi?", ["g2-ct-23", "s:r21-03:a"]),
        ("Expresar un deseo: mi piacerebbe andare a Roma", ["g2-ct-22"]),
        ("Dar un consejo: dovresti mangiare meno dolci", ["g2-sc-16-c"]),
    ],
    21: [
        ("Pedir cantidades con ne: ne voglio due", ["g2-ct-24", "cx-b-21-07"]),
        ("Decir que vas a un lugar sin repetirlo: ci vado", ["g2-ct-25", "g2-sc-11-c"]),
        ("Decir cuánto tardás: ci metto venti minuti", ["l2-c-98", "c1-ci-04"]),
        ("Pedir algo en un negocio: vorrei un bicchiere d'acqua", ["g2-out-cor-10"]),
    ],
    22: [
        ("Prestar y pedir cosas con dos pronombres: te lo presto", ["g2-ct-28", "mj-22-07"]),
        ("Dárselo a otro: glielo do", ["g2-ct-27"]),
        ("Decir que te fuiste o que lo lograste: me ne sono andato, ce l'abbiamo fatta", ["cx-b-22-05", "cx-b-22-06"]),
        ("Prohibir con pronombre: non dirmelo", ["gr0-22-03", "gr0-22-04"]),
    ],
    23: [
        ("Comparar dos cosas: più grande di", ["g2-ct-29", "rf-22-22"]),
        ("Comparar dos cualidades o acciones con che", ["g2-ct-30", "g2-sc-14-c"]),
        ("Decir lo mejor y lo peor: il giorno peggiore della mia vita", ["rf-22-23", "g2-va-40"]),
        ("Ponderar con -issimo: buonissimo", ["rf-22-25"]),
    ],
    24: [
        ("Decir lo que esperás de otro: spero che tu venga", ["mj-24-17", "c1-cong-12"]),
        ("Pedir que alguien haga algo: voglio che tu paghi", ["mj-24-03", "s:r24-01:b"]),
        ("Dar tu opinión con penso che + congiuntivo", ["c1-cong-02", "c1-cong-05"]),
        ("Decir que no lo necesitás: non ne ho bisogno", ["cx-b-24-01"]),
    ],
    25: [
        ("Opinar con credo che sia", ["g2-ct-32", "g2-va-28"]),
        ("Decir que algo es seguro, con indicativo: è chiaro che", ["g2-out-cer-12"]),
        ("Expresar una esperanza: spero che tu venga", ["g2-ct-33"]),
        ("Poner una condición o un fin: benché piova, perché tu capisca", ["mj-25-14", "gr3-25-03"]),
    ],
    26: [
        ("Contar el pasado con el auxiliar justo", ["gr0-26-03", "cx-c-26-01"]),
        ("Hacer suposiciones en futuro: chi sarà?", ["gr0-26-05", "gr0-26-06"]),
        ("Dar órdenes y prohibir: non dirlo a nessuno", ["gr0-26-07", "gr0-26-16"]),
        ("Hablarle de Lei a un desconocido", ["gr0-26-15", "gr0-26-14"]),
    ],
    27: [
        ("Decir cómo hace alguien algo: perfettamente, bene, male", ["rf-16-21", "g2-ct-35"]),
        ("Poner el adverbio en su lugar: arriva sempre", ["g2-va-67", "g2-ct-36"]),
        ("Decir qué tan seguro estás: forse è, può darsi che sia, sarà", ["t4it27-27-e01", "t4it27-27-e02"]),
        ("Decir cuánto tardás o qué hace falta: ci metti, ci vuole", ["cx-c-27-04", "cx-c-27-05"]),
    ],
    28: [
        ("Contraponer dos cosas: invece, anche se", ["m3-28-01", "g2-ct-38"]),
        ("Corregir una idea con in realtà (no con infatti)", ["gr3-28-03", "gr3-28-01"]),
        ("Dar una causa o una consecuencia: perché, dato che", ["g2-ct-37", "cx-a-28-02"]),
        ("Poner un límite en el tiempo: finché non arrivi", ["gr3-28-06", "gr3-28-05"]),
    ],
    29: [
        ("Opinar sobre algo que ya pasó: credo che siano arrivati", ["g2-ct-39", "m3-29-01"]),
        ("Alegrarte o lamentar algo pasado: sono contento che tu abbia", ["m3-29-02", "c1-tf-29-02"]),
        ("Dudar de algo pasado: dubito che abbiano letto", ["m3-29-03", "s:r24-02b:c"]),
        ("Suponer algo pasado: può darsi che sia già partito", ["s:r24-02b:b", "s:r24-02b:a"]),
    ],
    30: [
        ("Contar lo que otro quería: volevo che venissi", ["g2-ct-40", "c1-tf-30-01"]),
        ("Contar lo que pensabas: pensavo che fosse", ["g2-ct-41"]),
        ("Decir «como si»: come se non fosse successo niente", ["gr1-30-02", "gr1-30-01"]),
        ("Desear lo imposible: magari avessi più tempo", ["cx-c-30-02", "cx-c-30-01"]),
    ],
    31: [
        ("Lamentar lo que no hiciste: avresti dovuto avvisarmi", ["cx-c-31-02", "g2-va-55"]),
        ("Decir que habrías hecho algo: sarei venuto, ma", ["g2-ct-42", "cx-c-31-03"]),
        ("Contar lo que alguien prometió: ha detto che sarebbe arrivato", ["g2-ct-43", "t4it27-31-u07"]),
        ("Dar una noticia no confirmada: sarebbe arrivato ieri", ["mj-31-04"]),
    ],
    32: [
        ("Contar lo que creías: credevo che avessi già finito", ["m3-32-01", "c1-tf-32-02"]),
        ("Contar lo que creías que iba a pasar: ero sicuro che sarebbe arrivata", ["m3-32-02", "cx-a-32-02"]),
        ("Pasar una opinión al pasado: pensavo che fosse giusto", ["c1-tf-32-01", "g2-va-56"]),
        ("Ordenar dos hechos pasados: avevo preso l'influenza", ["cx-c-32-01"]),
    ],
    33: [
        ("Poner una condición real: se vieni, ti mostro", ["gr1-33-02", "gr1-33-03"]),
        ("Imaginar otra situación: se avessi tempo, andrei", ["g2-ct-44", "g2-va-11"]),
        ("Dar un consejo: se fossi in te", ["m3-33-01"]),
        ("Lamentar lo que pudo ser: se l'avessi saputo, non sarei venuto", ["g2-ct-45", "c1-ipot-06"]),
    ],
    34: [
        ("Unir dos frases con che", ["cx-a-34-01", "s:r13-02:a"]),
        ("Usar cui con preposición: con cui, di cui", ["g2-ct-46", "g2-ct-47"]),
        ("Decir «cuyo»: il cui, la cui", ["c1-tf-34-01", "d14-021"]),
        ("Hablar en general con chi: chi non studia", ["gr2-34-ch-01", "gr2-34-ch-03"]),
    ],
    35: [
        ("Contar quién hizo algo con la pasiva: è stata costruita", ["g2-ct-48", "c1-tf-35-01"]),
        ("Poner el agente con da, no con per", ["rf2-35-05", "gr1-35-03"]),
        ("Hablar de un proceso con venire: viene riparato", ["c1-tf-35-02"]),
        ("Decir lo que hay que hacer: va pagata", ["c1-tf-35-03"]),
    ],
    36: [
        ("Contar costumbres con si: qui si mangia bene", ["g2-ct-49", "c1-tf-36-01"]),
        ("Concordar el si con lo que se vende: si vendono case", ["g2-ct-50", "c1-pass-06"]),
        ("Poner el adjetivo en plural tras si: si vive tranquilli", ["g2-va-62"]),
        ("Contar con si en pasado: se n'è parlato molto", ["mj-36-11"]),
    ],
    37: [
        ("Contar hechos históricos en passato remoto", ["g2-ct-51", "m3-37-02"]),
        ("Pasar un relato del passato prossimo al remoto", ["c1-tf-37-01", "c1-tf-37-02"]),
        ("Contar una historia familiar: mio nonno nacque", ["m3-37-03"]),
        ("Encadenar con trapassato remoto: appena ebbe finito", ["c1-tf-37-03", "s:r20-01f:a"]),
    ],
    38: [
        ("Contar lo que alguien dijo: ha detto che era stanca", ["rf2-38-09", "c1-tf-38-01"]),
        ("Pasar un pasado al discurso indirecto: aveva perso", ["c1-tf-38-02", "g2-sc-22-c"]),
        ("Contar una promesa: mi ha detto che mi avrebbe aspettato", ["m3-38-01", "g2-va-68"]),
        ("Preguntarte en voz alta: chissà dove l'avrà messo", ["gr3-38-01", "gr3-38-02"]),
    ],
    39: [
        ("Poner condiciones reales e irreales", ["gr1-39-01", "d22-017"]),
        ("Contar con la pasiva", ["gr1-39-04"]),
        ("Hacer una concesión: nonostante fosse stanco", ["gr3-39-04", "gr1-39-03"]),
        ("Dar instrucciones paso a paso", ["gr0-39-03", "gr0-39-04"]),
    ],
    40: [
        ("Decir que mandaste a hacer algo: ho fatto riparare la macchina", ["g2-ct-53", "c1-tf-40-01"]),
        ("Contar que te hiciste hacer algo: mi sono fatto tagliare i capelli", ["c1-caus-04", "c1-tf-40-02"]),
        ("Decir que alguien te obliga: mi fa mangiare la verdura", ["g2-ct-54"]),
        ("Permitir o no con lasciare; pedir noticias con fammi sapere", ["mj-40-07", "mj-40-08"]),
    ],
    41: [
        ("Contar lo que viste: l'ho visto uscire", ["g2-ct-55", "c1-tf-41-01"]),
        ("Contar lo que oíste: ho sentito litigare i vicini", ["c1-tf-41-02", "c1-er-07"]),
        ("Concordar el participio con el pronombre: l'ho vista", ["c1-tf-41-03", "c1-er-06"]),
        ("Decir qué te gusta ver o escuchar: vedere giocare la squadra", ["s:r27-02b:a", "s:r27-01b:a"]),
    ],
    42: [
        ("Usar di o a después del verbo: ho smesso di, ho cominciato a", ["g2-ct-56", "c1-er-08"]),
        ("Decir que tratás o te acostumbraste: cerco di, mi sono abituato ad", ["g2-ct-57", "mj-42-05"]),
        ("Decir que seguís haciendo algo: continuo a pensare", ["cx-c-42-03", "cx-c-42-01"]),
        ("Abrir un mail formal: Gentile Signora, Le scrivo per", ["gr4-42-rg-03"]),
    ],
    43: [
        ("Decir qué hacer antes: prima di uscire", ["g2-ct-58"]),
        ("Encadenar con el infinitivo compuesto: dopo aver mangiato", ["c1-tf-43-02", "c1-er-11"]),
        ("Usar el infinitivo cuando el sujeto es el mismo: mi sembra di aver sbagliato", ["c1-tf-43-01"]),
        ("Usar el infinitivo como sujeto: mangiare bene è importante", ["c1-tf-43-03", "gr1-43-02"]),
    ],
    44: [
        ("Condensar con gerundio: studiando si impara", ["rf2-44-07", "c1-tf-44-01"]),
        ("Encadenar dos hechos: avendo finito il lavoro", ["g2-ct-59", "m3-44-01"]),
        ("Decir «aunque» con pur + gerundio", ["m3-44-02"]),
        ("Abrir con participio: finita la riunione", ["rf2-44-11", "s:r23-01d:a"]),
    ],
    45: [
        ("Decir que no podés más o que lo lograste: farcela", ["c1-ne-05", "c1-tf-45-01"]),
        ("Decir que te vas: me ne vado", ["rf-46-22", "c1-tf-45-02"]),
        ("Hablar de enojos: ce l'hai con me?, non prendertela", ["cx-b-45-02", "rf-46-23"]),
        ("Decir qué hace falta o que estás por hacer algo: ci vuole, sto per", ["g2-ct-62", "g2-ct-61"]),
    ],
    46: [
        ("Achicar con cariño: un attimino, un cagnolino", ["rf-24-23", "rf-24-24"]),
        ("Agrandar o despreciar: un librone, una giornataccia", ["c1-tf-46-03", "rf-24-25"]),
        ("Armar palabras compuestas: portachiavi, asciugacapelli", ["gr4-46-co-06", "gr4-46-co-01"]),
        ("Decir «aunque» con pur + gerundio", ["gr3-46-01"]),
    ],
    47: [
        ("Dar cantidades aproximadas: una ventina, un centinaio", ["g2-ct-63", "rf2-47-08"]),
        ("Decir fracciones: oltre un terzo, due terzi", ["mj-47-11", "c1-tf-47-03"]),
        ("Pedir cantidades en el negocio: due etti, mezzo chilo", ["mj-47-14"]),
        ("Escribir bien los números: ventimila", ["c1-er-18"]),
    ],
    48: [
        ("Adelantar el tema y retomarlo: Marco lo conosco bene", ["g2-ct-64", "c1-tf-48-01"]),
        ("Poner el objeto adelante con dos pronombres: le chiavi, le ho date", ["m3-48-01"]),
        ("Destacar con una frase escindida: il fatto è che", ["gr3-48-03", "c1-er-19"]),
        ("Hablar de Lei por teléfono: La chiamo domani", ["gr0-48-01"]),
    ],
    49: [
        ("Escribir en estilo nominal: l'aumento dei prezzi, a seguito di", ["c1-tf-49-01", "gr3-49-06"]),
        ("Retomar sin repetir: tale provvedimento, il fenomeno", ["gr3-49-03", "gr3-49-04"]),
        ("Hacer una concesión culta: per quanto ci provi", ["gr3-49-01"]),
        ("Escribir en registro alto: va rilevato che", ["m3-49-01", "c1-er-21"]),
    ],
    50: [
        ("Esquivar falsos amigos: imbarazzata, largo", ["c1-er-23", "c1-er-24"]),
        ("Decir que te da vergüenza o que presenciaste algo", ["m3-50-01", "m3-50-02"]),
        ("Usar el verbo justo: commettere un errore, esprimere un'opinione", ["c1-tf-50-01", "c1-tf-50-02"]),
        ("Exigir o despedir sin calcar el español: pretendo, licenziare", ["m3-50-03", "m3-50-04"]),
    ],
    51: [
        ("Imaginar el pasado y el presente juntos: se avessi studiato, ora sarei", ["mj-51-14"]),
        ("Hacer una concesión con pur + gerundio", ["c1-tf-51-01", "gr3-51-03"]),
        ("Decir lo que hay que hacer con la pasiva: vanno rispettate", ["mj-51-13", "c1-tf-51-02"]),
        ("Usar como se debe sarà y come se", ["gr0-51-01", "gr1-51-03"]),
    ],
    52: [
        ("Opinar o dudar con el congiuntivo justo", ["d20-017", "d20-028"]),
        ("Encadenar con participio e infinitivo: appena uscito, dopo aver finito", ["s:r20-03b:a", "s:r20-03b:b"]),
        ("Escribir en estilo nominal: a seguito dell'incidente", ["gr3-52-05", "gr3-52-04"]),
        ("Hilar un texto: tuttavia, pertanto", ["gr3-52-02", "gr3-52-03"]),
    ],
}
