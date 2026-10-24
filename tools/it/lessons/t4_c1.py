# -*- coding: utf-8 -*-
"""Tanda 4, italiano, semanas 40-52: bloques que se suman a las lecciones.

Como lessons/c1_extra.py, no tiene LESSONS: build_course.py agrega estos
bloques al final de la lección de su semana (y a su última parte, si la
lección va en partes).  Los ejercicios de cada bloque son los t4it40-<semana>-…
de tools/it/authored/t4_it40.py; PIN_PREFIXES los manda a esa última parte,
así nunca se practican antes de leer el bloque.

- 42: latinismos del registro formal (una tantum, ad hoc, pro capite…).
- 44: gerundio con sujeto propio (el de la prensa) y participio presente.
- 45: suponer con el futuro, también en negativo; *come se* en fórmulas.
- 47: *chi* y *quanto*, el relativo que trae el antecedente; *bello* y
  *buono* que intensifican.
- 49 y 51: el modelo «por propósito» (GrammaticAvanzata, CILS TRE-C1): la
  causa y la concesión (49), la condición, el tiempo y las limitativas (51),
  cada una con todas sus formas y el registro de cada forma.
- 50: formación de palabras y colocaciones donde el calco del castellano falla.
"""

PIN_PREFIXES = ("t4it40-%d-",)

_H = ["Forma", "Ejemplo", "Registro"]

EXTRA_BLOCKS = {
    42: [
        {"h": "Latinismos del registro formal",
         "r": "El italiano formal usa latinismos **invariables** que el castellano casi no usa: *una tantum*, "
              "*ad hoc*, *pro capite*, *in extremis*.",
         "table": {"head": ["Latinismo", "Castellano", "Ejemplo"],
                   "rows": [["una tantum", "por única vez", "un contributo una tantum"],
                            ["ad hoc", "hecho para eso", "una commissione ad hoc"],
                            ["pro capite", "por persona, per cápita", "il reddito pro capite"],
                            ["de facto", "de hecho", "un divieto de facto"],
                            ["sui generis", "muy particular, único", "un museo sui generis"],
                            ["in extremis", "a último momento", "salvarsi in extremis"],
                            ["a priori", "de antemano", "escludere a priori"]]},
         "ex": [["Il Comune darà un bonus *una tantum* alle famiglie.",
                 "La municipalidad va a dar un bono por única vez a las familias."],
                ["La squadra si è salvata *in extremis*.", "El equipo se salvó a último momento."],
                ["È un artista *sui generis*.", "Es un artista muy particular."],
                ["Non possiamo escludere *a priori* questa ipotesi.", "No podemos descartar de antemano esta hipótesis."]],
         "warn": "No llevan plural: *due contributi una tantum*, *commissioni ad hoc*. *De facto* y *di fatto* "
                 "valen los dos; *di fatto* es más común."},
    ],
    44: [
        {"h": "Gerundio con sujeto propio y participio presente",
         "r": "Si el gerundio tiene **su propio** sujeto, lo nombra después: *essendo il treno in ritardo*. "
              "Es de la prensa y del registro formal.",
         "ex": [["*Permanendo il maltempo*, le scuole resteranno chiuse.",
                 "Como sigue el mal tiempo, las escuelas van a seguir cerradas."],
                ["*Essendo il treno* in ritardo, abbiamo preso un taxi.",
                 "Como el tren venía con retraso, tomamos un taxi."],
                ["I cittadini *residenti* all'estero votano per posta.",
                 "Los ciudadanos que residen en el exterior votan por correo."],
                ["Gli studenti *provenienti* da altre città pagano meno.",
                 "Los estudiantes que vienen de otras ciudades pagan menos."]],
         "warn": "Sin sujeto propio, el gerundio toma el de la principal: en «uscendo di casa, ha cominciato a "
                 "piovere» no queda claro quién salía. Va *mentre uscivo*.",
         "tip": "El participio presente con valor de verbo (*residenti*, *provenienti*, *aventi diritto*) es "
                "de avisos y reglamentos; hablando, relativa: *che vengono da*.",
         "more": ["En los diarios vas a leer gerundios «sospesi», con un sujeto distinto del de la principal "
                  "y sin nombrarlo (*Andando in stampa, il governo ha deciso…*). Se toleran en una crónica "
                  "apurada, pero en tu examen cuentan como error: nombrá el sujeto o usá *mentre*, *dopo che*."]},
    ],
    45: [
        {"h": "Suponer con el futuro, también en negativo",
         "r": "Para suponer, futuro (*sarà*) o futuro anteriore (*avrà perso*). En negativo y con *mica*, "
              "la suposición se vuelve sospecha.",
         "table": {"head": ["Forma", "Para qué", "Ejemplo"],
                   "rows": [["sarà + adjetivo o lugar", "suponer algo de ahora", "Sarà stanco."],
                            ["avrà + participio", "suponer algo ya pasado", "Avrà dimenticato."],
                            ["non sarà mica…?", "temor, sospecha", "Non sarà mica malato?"],
                            ["sarà, ma…", "puede ser, pero", "Sarà, ma non ci credo."]]},
         "ex": [["Non risponde: *sarà* in riunione.", "No contesta: debe de estar en una reunión."],
                ["È in ritardo: *avrà perso* il treno.", "Llega tarde: habrá perdido el tren."],
                ["*Non sarà mica* arrabbiato?", "¿No estará enojado, no?"],
                ["*Sarà*, ma non ci credo.", "Puede ser, pero no lo creo."]],
         "warn": "*deve essere in riunione* también se dice, pero al hablar lo más natural es el futuro: "
                 "*sarà in riunione*."},
        {"h": "come se en fórmulas de todos los días",
         "r": "*come se* + congiuntivo imperfetto (a la vez) o trapassato (antes), también en fórmulas fijas.",
         "ex": [["È entrato *come se niente fosse*.", "Entró como si nada."],
                ["Mi guarda *come se avessi detto* una sciocchezza.", "Me mira como si hubiera dicho una pavada."],
                ["Fai *come se fossi* a casa tua.", "Hacé de cuenta que estás en tu casa."]],
         "warn": "Después de *come se* va congiuntivo: «come se niente era» es el error típico."},
    ],
    47: [
        {"h": "chi y quanto: el relativo que trae el antecedente",
         "r": "*chi* = «el que, quien» (personas) y *quanto* = «(todo) lo que»: ya llevan el antecedente adentro.",
         "table": {"head": ["Relativo", "Castellano", "Ejemplo"],
                   "rows": [["chi", "el que, quien, los que", "Chi tace acconsente."],
                            ["quanto", "(todo) lo que", "Ho fatto quanto potevo."],
                            ["quanti / quante", "(todos) los que", "Ringrazio quanti sono venuti."]]},
         "ex": [["*Chi* rompe paga.", "El que rompe paga."],
                ["*Chi* ha finito può uscire.", "Los que terminaron pueden salir."],
                ["*Quanto* detto vale anche per voi.", "Lo dicho vale también para ustedes."],
                ["Ti ringrazio per *quanto* hai fatto.", "Te agradezco por todo lo que hiciste."]],
         "warn": "*chi* lleva el verbo en singular aunque pienses en muchos: *chi ha finito*, no «chi hanno finito»."},
        {"h": "bello y buono para intensificar",
         "r": "Delante del sustantivo, *bello* y *buono* intensifican: *un bel niente* (nada de nada), "
              "*una buona mezz'ora* (media hora larga).",
         "table": {"head": ["Expresión", "Castellano", "Ejemplo"],
                   "rows": [["un bel niente", "nada de nada", "Non ho capito un bel niente."],
                            ["un bel po' (di)", "un montón, bastante", "È un bel po' che non lo vedo."],
                            ["una buona mezz'ora, un buon chilo", "media hora larga, un kilo largo", "Ho aspettato una buona mezz'ora."],
                            ["bell'e + participio", "ya del todo", "La cena è bell'e pronta."]]},
         "ex": [["Non ho capito *un bel niente*.", "No entendí nada de nada."],
                ["Ho aspettato *una buona mezz'ora*.", "Esperé media hora larga."],
                ["La cena è *bell'e pronta*.", "La cena ya está lista."]],
         "warn": "Como el artículo: *un bel po'*, *un bell'esempio*, *un bello scherzo*. Y *buon* va sin "
                 "apóstrofo delante de masculino: *un buon chilo*."},
    ],
    49: [
        {"h": "Por propósito: la causa en todas sus formas",
         "r": "La misma causa se dice con conector, gerundio, adjetivo, infinitivo o sustantivo. Elegís según el registro.",
         "table": {"head": _H,
                   "rows": [["siccome / dato che + indicativo", "Siccome era stanco, è andato a letto.", "neutro"],
                            ["gerundio (mismo sujeto)", "Essendo stanco, è andato a letto.", "cuidado, escrito"],
                            ["gerundio + sujeto propio", "Essendo il treno in ritardo, …", "formal, prensa"],
                            ["adjetivo + com'era", "Stanco com'era, è andato a letto.", "oral, expresivo"],
                            ["per + infinitivo compuesto", "È stato multato per aver parcheggiato male.", "neutro"],
                            ["per / a causa di + sustantivo", "Assente per malattia.", "escrito, burocrático"]]},
         "ex": [["*Essendo* stanco, è andato a letto presto.", "Como estaba cansado, se fue a dormir temprano."],
                ["*Stanco com'era*, non riusciva nemmeno a parlare.", "Cansado como estaba, no podía ni hablar."],
                ["È stato multato *per aver parcheggiato* in doppia fila.", "Lo multaron por haber estacionado en doble fila."],
                ["Non è venuto *per malattia*.", "No vino por enfermedad."]],
         "warn": "*per* + infinitivo **compuesto** da la causa (*per aver parcheggiato*); con el simple es "
                 "finalidad: *per parcheggiare* = para estacionar."},
        {"h": "Por propósito: la concesión",
         "r": "«Aunque» tiene cinco caras: *anche se*, *benché*, *pur* + gerundio, *nonostante* + sustantivo, "
              "*per quanto*.",
         "table": {"head": _H,
                   "rows": [["anche se + indicativo", "Anche se piove, esco.", "neutro, oral"],
                            ["benché / sebbene + congiuntivo", "Benché piova, esco.", "cuidado, escrito"],
                            ["pur + gerundio (mismo sujeto)", "Pur essendo stanco, esco.", "escrito"],
                            ["nonostante / malgrado + sustantivo", "Nonostante la pioggia, esco.", "neutro"],
                            ["per quanto + congiuntivo", "Per quanto si sforzi, non ci riesce.", "cuidado: «por más que»"]]},
         "ex": [["*Pur avendo studiato*, non ha superato l'esame.", "Aunque había estudiado, no aprobó."],
                ["*Nonostante la pioggia*, siamo usciti.", "A pesar de la lluvia, salimos."],
                ["*Per quanto si sforzi*, non riesce a dimagrire.", "Por más que se esfuerce, no logra adelgazar."]],
         "warn": "*pur* + gerundio, solo si el sujeto es el mismo. *anche se* va con indicativo cuando el hecho "
                 "es real; *benché* pide congiuntivo siempre."},
    ],
    50: [
        {"h": "Formación y colocaciones: donde el calco falla",
         "r": "Con las palabras que se parecen, el castellano ayuda… hasta que no. Estas son las que **no** salen calcando.",
         "table": {"head": ["Italiano", "No es", "Castellano"],
                   "rows": [["difficile → difficoltà", "difficilità", "dificultad"],
                            ["efficace → efficacia", "efficacità", "eficacia"],
                            ["rimborsare → rimborso", "rimborsamento", "reembolso"],
                            ["assumere → assunzione", "solo «asunción»", "contratación"],
                            ["attuare", "actuar", "llevar a cabo"],
                            ["un sollecito", "solícito", "un recordatorio de pago"],
                            ["trarre conclusioni", "togliere conclusioni", "sacar conclusiones"],
                            ["rendere noto", "fare noto", "dar a conocer"],
                            ["sollevare obiezioni", "alzare obiezioni", "poner objeciones"],
                            ["fare una passeggiata, scattare una foto", "dare una passeggiata, tirare una foto", "dar un paseo, sacar una foto"]]},
         "ex": [["Ho avuto molte *difficoltà* con il visto.", "Tuve muchas dificultades con la visa."],
                ["Il governo deve *attuare* la riforma.", "El gobierno tiene que llevar a cabo la reforma."],
                ["Dai dati possiamo *trarre* alcune conclusioni.", "De los datos podemos sacar algunas conclusiones."],
                ["Il Comune ha *reso noti* i risultati.", "La municipalidad dio a conocer los resultados."]],
         "warn": "En el trabajo, *assunzione* es «contratación» (*nuove assunzioni*). La asunción de un presidente es *l'insediamento*; *assunzione* también es tomar algo (*di un farmaco*, *di responsabilità*)."},
    ],
    51: [
        {"h": "Por propósito: la condición",
         "r": "La condición no es solo *se*: también *a* + infinitivo, gerundio, *qualora*, *in caso di*, "
              "*purché*, *salvo*.",
         "table": {"head": _H,
                   "rows": [["se + indicativo o congiuntivo", "Se l'avessi saputo, sarei venuto.", "neutro"],
                            ["a + infinitivo", "A saperlo, sarei venuto.", "oral y escrito"],
                            ["gerundio", "Partendo presto, eviti il traffico.", "neutro"],
                            ["qualora / nel caso in cui + congiuntivo", "Qualora piova, si resta in casa.", "formal"],
                            ["in caso di + sustantivo", "In caso di pioggia, si resta in casa.", "avisos, reglamentos"],
                            ["purché / a patto che + congiuntivo", "Ti aiuto, purché tu me lo chieda.", "neutro"],
                            ["a condizione di + infinitivo", "Puoi entrare a condizione di avere il biglietto.", "formal"],
                            ["salvo + sustantivo", "Salvo imprevisti, partiamo domani.", "fórmula fija"]]},
         "ex": [["*A saperlo*, sarei venuto prima.", "De haberlo sabido, habría venido antes."],
                ["*Partendo* presto, eviti il traffico.", "Si salís temprano, evitás el tránsito."],
                ["*In caso di* pioggia, la festa si farà in casa.", "En caso de lluvia, la fiesta se hace adentro."],
                ["*Salvo imprevisti*, partiamo domani.", "Salvo imprevistos, salimos mañana."]],
         "warn": "El «de + infinitivo» condicional del castellano (*de saberlo*) en italiano va con *a*: "
                 "*a saperlo*, no «di saperlo»."},
        {"h": "Por propósito: el tiempo",
         "r": "Lo temporal se comprime: *nel* + infinitivo, gerundio, participio absoluto, *dopo aver* + "
              "participio, *al* + sustantivo.",
         "table": {"head": _H,
                   "rows": [["mentre / quando + indicativo", "Mentre leggeva la lettera, impallidì.", "neutro"],
                            ["nel + infinitivo", "Nel leggere la lettera, impallidì.", "escrito, literario"],
                            ["gerundio", "Leggendo la lettera, impallidì.", "neutro"],
                            ["participio absoluto", "Letta la lettera, uscì.", "escrito"],
                            ["dopo aver + participio", "Dopo aver letto la lettera, uscì.", "neutro"],
                            ["al + sustantivo", "Al suo arrivo, tutti si alzarono.", "formal"]]},
         "ex": [["*Nel leggere* la lettera, impallidì.", "Al leer la carta, palideció."],
                ["*Letta* la lettera, è uscita.", "Una vez leída la carta, salió."],
                ["*Al suo arrivo*, tutti si sono alzati.", "A su llegada, todos se pararon."]],
         "warn": "El «al + infinitivo» castellano se dice sobre todo con *quando* o *appena* + indicativo, con "
                 "gerundio o con *nel* + infinitivo; *al sentire la notizia* existe, pero suena literario."},
        {"h": "Acotar y poner precio: a sentire lui, pur di, a costo di",
         "r": "Infinitivos fijos para acotar lo que decís (*a sentire lui*, *a dire il vero*) o marcar el "
              "precio (*pur di*, *a costo di*).",
         "table": {"head": ["Forma", "Castellano", "Ejemplo"],
                   "rows": [["a sentire + persona", "según él (y no le creo del todo)", "A sentire lui, è tutto facile."],
                            ["a dire il vero", "a decir verdad", "A dire il vero, non mi è piaciuto."],
                            ["per quanto ne so", "que yo sepa", "Per quanto ne so, è chiuso."],
                            ["pur di + infinitivo", "con tal de", "Farebbe di tutto pur di vincere."],
                            ["a costo di + infinitivo", "aunque tenga que", "Lo finisco, a costo di lavorare di notte."],
                            ["salvo / tranne + infinitivo", "salvo, excepto", "Farò tutto, salvo rinunciare alle ferie."]]},
         "ex": [["*A sentire lui*, è tutto facile.", "Si le creés a él, todo es fácil."],
                ["Farebbe qualsiasi cosa *pur di* vincere.", "Haría cualquier cosa con tal de ganar."],
                ["Lo finisco, *a costo di* lavorare tutta la notte.", "Lo termino, aunque tenga que trabajar toda la noche."],
                ["*A dire il vero*, non mi è piaciuto.", "A decir verdad, no me gustó."]],
         "warn": "«Con tal de» no se calca: *pur di* + infinitivo, y solo con el mismo sujeto."},
    ],
}
