#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Assemble the playable course from the extracted banks + the authored items.

Reads   docs/data/bank_dummies.json, docs/data/bank_routledge.json
        tools/authored/*.py
Writes  docs/data/course.json   (52 weekly missions + the graded item bank)

Run:  python3 tools/build_course.py
"""
import importlib.util
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "docs", "data")

# --------------------------------------------------------------------------
# El programa del año.  d = capítulos de "Italian Grammar For Dummies"
#                       r = capítulos de "Soluzioni" (Routledge)
#                       t = temas del banco de ítems propios
#                       v = verbos y tiempos del gimnasio de conjugación
# --------------------------------------------------------------------------
WEEKS = [
    # ---------------- Stagione 1: Le Fondamenta (A1 -> A2) ----------------
    dict(w=1, title="Suoni e ortografia", level="A1", d=[], r=[1],
         focus="El italiano se lee como se escribe, pero no como el español.",
         keys=["Dobles consonantes: cambian el significado (nono/nonno, casa/cassa).",
               "c/g suenan duras ante a, o, u y blandas ante e, i; ch/gh las endurecen.",
               "gli, gn, sc(e/i): tres sonidos que el español no tiene.",
               "El acento gráfico solo marca la sílaba final tónica (città, perché)."],
         v=["essere", "avere"], t=["ortografia"]),
    dict(w=2, title="Nomi: genere e numero", level="A1", d=[3], r=[1],
         focus="Los sustantivos y sus plurales, incluidos los que no se mueven.",
         keys=["-o → -i, -a → -e, -e → -i.",
               "Invariables: crisi, città, film, sport.",
               "Plurales en -chi/-ghi para conservar el sonido duro.",
               "Irregulares frecuentes: uomo/uomini, uovo/uova, mano (f.)."],
         v=["essere", "avere"], t=[]),
    dict(w=3, title="Articoli determinativi e indeterminativi", level="A1",
         d=[3], r=[2],
         focus="El artículo italiano depende del sonido que sigue, no solo del género.",
         keys=["lo/gli ante z, s+consonante, gn, ps, x, y.",
               "il/i en el resto de los masculinos; l' ante vocal.",
               "Preposiciones articuladas: del, al, dal, nel, sul.",
               "El italiano usa artículo donde el español lo omite (mi piace LA musica)."],
         v=["essere", "avere"], t=["articoli"]),
    dict(w=4, title="Aggettivi qualificativi", level="A1", d=[5], r=[3],
         focus="Concordancia y las tres formas irregulares que aparecen todo el tiempo.",
         keys=["Adjetivos en -o (4 formas) y en -e (2 formas).",
               "bello y quello siguen al artículo: bel, bello, begli, bei.",
               "buono en singular sigue a un/uno/una: buon giorno.",
               "santo → San, Sant', Santo, Santa.",
               "Posición: normalmente después, pero delante cambia el matiz."],
         v=["essere", "avere"], t=[]),
    dict(w=5, title="Numeri, date e ora", level="A1", d=[4], r=[17],
         focus="Contar, fechar y decir la hora sin traducir del español.",
         keys=["Los números se escriben en una sola palabra: quattrocentosessantaquattro.",
               "Fechas con artículo y número cardinal: il 3 marzo; solo el 1 es ordinal.",
               "La hora va en femenino plural: sono le due; excepciones è l'una, è mezzogiorno.",
               "Reloj de 24 horas en contextos formales."],
         v=["essere", "avere"], t=[]),
    dict(w=6, title="Presente indicativo: verbi regolari", level="A1",
         d=[6], r=[18],
         focus="Las tres conjugaciones y las reglas ortográficas que las deforman.",
         keys=["-are, -ere, -ire, más los -ire con infijo -isc- (finisco).",
               "-care/-gare añaden h ante i/e: cerchi, paghi.",
               "-ciare/-giare pierden la i: mangi, cominci.",
               "El sujeto pronominal se omite salvo para contrastar."],
         v=["parlare", "vendere", "dormire", "finire", "cercare", "mangiare"],
         tenses=["presente"], t=[]),
    dict(w=7, title="Presente indicativo: verbi irregolari", level="A2",
         d=[7], r=[18],
         focus="Los quince irregulares que cubren la mitad de lo que vas a decir.",
         keys=["essere, avere, andare, stare, dare, fare.",
               "Modales: potere, volere, dovere, sapere.",
               "venire, tenere, uscire, rimanere, salire.",
               "Muchos comparten patrón: -go en io/loro (vengo/vengono)."],
         v=["essere", "avere", "andare", "stare", "dare", "fare", "potere",
            "volere", "dovere", "sapere", "venire", "uscire"],
         tenses=["presente"], t=[]),
    dict(w=8, title="Pronomi personali", level="A2", d=[8], r=[7],
         focus="Objeto directo, indirecto y las formas tónicas.",
         keys=["Directo: mi, ti, lo, la, ci, vi, li, le.",
               "Indirecto: mi, ti, gli, le, ci, vi, gli.",
               "Tónicos tras preposición: con me, per te, secondo lui.",
               "Enclíticos con infinitivo e imperativo: dirmi, dimmi."],
         v=["parlare", "dare", "dire"], tenses=["presente"], t=[]),
    dict(w=9, title="Riflessivi e imperativo", level="A2", d=[9], r=[22],
         focus="Rutina diaria y órdenes: dos bloques que se aprenden juntos.",
         keys=["Reflexivos: mi alzo, ti lavi, si veste.",
               "Imperativo tú de -are: parla (sin -i); el resto usa el presente.",
               "Usted usa el congiuntivo: parli, prenda, finisca.",
               "Negativo de tú: non + infinitivo (non parlare!).",
               "Con pronombre: dimmi, fallo, alzati; con Lei se antepone."],
         v=["alzarsi", "lavarsi", "vestirsi", "svegliarsi", "divertirsi"],
         tenses=["presente"], t=[]),
    dict(w=10, title="Piacere e verbi simili", level="A2", d=[10], r=[25],
         focus="La estructura invertida que también existe en español, pero con trampas.",
         keys=["mi piace + singular / mi piacciono + plural.",
               "El sujeto es la cosa que gusta, no la persona.",
               "En pasado va con essere: mi è piaciuta la mostra.",
               "Familia: mancare, servire, bastare, interessare, sembrare."],
         v=["piacere"], tenses=["presente", "passatoProssimo"], t=["piacere"]),
    dict(w=11, title="Domande e interrogativi", level="A2", d=[11], r=[10],
         focus="Preguntar sin invertir el orden como en inglés.",
         keys=["chi, che/che cosa, quale/quali, quanto, come, dove, quando, perché.",
               "La pregunta sí/no se marca solo con la entonación.",
               "Con preposición, esta va delante: Di chi è? A che ora?",
               "quale ante è se apocopa: qual è (sin apóstrofo)."],
         v=["essere", "fare", "andare"], tenses=["presente"], t=[]),
    dict(w=12, title="Preposizioni di base", level="A2", d=[12], r=[15],
         focus="Las preposiciones que no se pueden traducir del español una a una.",
         keys=["in + países y regiones; a + ciudades.",
               "da + persona = a casa de; da + tiempo = desde hace.",
               "Preposiciones articuladas obligatorias: nel, sul, dal, del.",
               "in/a con medios y lugares: in treno, a piedi, al mare, in montagna."],
         v=["andare", "venire", "stare"], tenses=["presente"], t=["preposizioni"]),
    dict(w=13, title="BOSS — Livello A2", level="A2", d=[3, 4, 5, 6, 7],
         r=[1, 2, 3], boss=True,
         focus="Examen de la primera estación: todo lo anterior, mezclado y cronometrado.",
         keys=["Sustantivos, artículos y adjetivos concordando sin pensarlo.",
               "Presente completo, regular e irregular.",
               "Pronombres objeto y reflexivos.",
               "Preposiciones básicas."],
         v=["essere", "avere", "andare", "fare", "potere", "volere"],
         tenses=["presente"], t=[]),

    # ---------------- Stagione 2: Il Ponte (A2 -> B1) ----------------
    dict(w=14, title="Dimostrativi, possessivi, indefiniti", level="A2",
         d=[13], r=[8, 9, 12],
         focus="Señalar, poseer y cuantificar.",
         keys=["questo/quello, con las formas de quello como bello.",
               "Posesivos con artículo: il mio libro.",
               "Parentesco singular sin artículo: mia sorella, tuo padre.",
               "Indefinidos: qualche + singular, alcuni + plural, ogni invariable."],
         v=["essere", "avere"], tenses=["presente"], t=["possessivi"]),
    dict(w=15, title="Connettivi e transizioni", level="B1", d=[14], r=[16],
         focus="Hilar frases: el primer salto real de nivel.",
         keys=["e, ma, però, anzi, invece, mentre.",
               "perché no abre frase: usá siccome, poiché, dato che.",
               "quindi, dunque, perciò para consecuencia.",
               "inoltre, tuttavia, infatti para el registro escrito."],
         v=["essere", "avere"], tenses=["presente"], t=["connettivi"]),
    dict(w=16, title="Avverbi", level="B1", d=[15], r=[4],
         focus="Formación en -mente y el orden de los adverbios.",
         keys=["Adjetivo femenino + -mente: lentamente.",
               "Adjetivos en -le/-re pierden la e: facilmente, particolarmente.",
               "Irregulares: bene, male, meglio, peggio.",
               "Posición: después del verbo; en tiempos compuestos, entre auxiliar y participio."],
         v=["parlare", "andare"], tenses=["presente"], t=[]),
    dict(w=17, title="Passato prossimo", level="B1", d=[16], r=[20],
         focus="El pasado que más vas a usar, y la guerra de los auxiliares.",
         keys=["avere + participio para transitivos.",
               "essere + participio con concordancia para movimiento y cambio de estado.",
               "Participios irregulares: fatto, detto, visto, preso, scritto, letto.",
               "Con avere concuerda solo si el objeto va antes en pronombre: le ho viste."],
         v=["parlare", "andare", "fare", "vedere", "prendere", "scrivere",
            "leggere", "venire"],
         tenses=["passatoProssimo"], t=["passato"]),
    dict(w=18, title="Imperfetto e il contrasto con il passato prossimo",
         level="B1", d=[16], r=[20],
         focus="No es cuestión de duración: es cuestión de qué estás mirando.",
         keys=["Imperfetto: fondo, costumbre, descripción, edad, hora, estado.",
               "Passato prossimo: acción cerrada que hace avanzar el relato.",
               "Mentre + imperfetto / quando + passato prossimo.",
               "Irregulares: ero, facevo, dicevo, bevevo."],
         v=["essere", "fare", "dire", "bere", "avere", "parlare"],
         tenses=["imperfetto", "passatoProssimo"], t=["passato"]),
    dict(w=19, title="Riflessivi al passato", level="B1", d=[17], r=[20],
         focus="Todos los reflexivos van con essere, sin excepción.",
         keys=["mi sono alzato/a, ci siamo divertiti/e.",
               "El participio concuerda con el sujeto.",
               "Con objeto directo propio: si è lavata le mani.",
               "Recíprocos: si sono conosciuti a Roma."],
         v=["alzarsi", "divertirsi", "svegliarsi", "accorgersi", "fermarsi"],
         tenses=["passatoProssimo"], t=[]),
    dict(w=20, title="Futuro semplice e anteriore", level="B1", d=[18], r=[19],
         focus="Futuro, y su uso más italiano: la suposición.",
         keys=["Raíz del infinitivo sin -e: parlerò, venderò, dormirò.",
               "Raíces contractas: sarò, avrò, andrò, verrò, vorrò, dovrò.",
               "Futuro de probabilidad: saranno le tre = serán las tres.",
               "Futuro anteriore para lo anterior a un futuro: quando avrò finito."],
         v=["essere", "avere", "andare", "venire", "volere", "dovere", "parlare"],
         tenses=["futuro", "futuroAnteriore"], t=[]),
    dict(w=21, title="Condizionale presente", level="B1", d=[18], r=[21],
         focus="Cortesía, deseo y noticia no confirmada.",
         keys=["Misma raíz que el futuro: vorrei, potrei, dovrei.",
               "vorrei y potrei son la base de toda cortesía.",
               "dovrei = debería; potrei = podría.",
               "Condicional de rumor en periodismo: il ministro sarebbe dimissionario."],
         v=["volere", "potere", "dovere", "essere", "avere", "piacere"],
         tenses=["condizionale"], t=[]),
    dict(w=22, title="Comparativi e superlativi", level="B1", d=[], r=[5],
         focus="di o che, y las formas irregulares que hay que saber de memoria.",
         keys=["più/meno ... di ante sustantivo o pronombre.",
               "più/meno ... che al comparar dos cualidades o dos infinitivos.",
               "Superlativo relativo: il più ... di.",
               "Absoluto en -issimo.",
               "migliore/peggiore/maggiore/minore; ottimo/pessimo/massimo/minimo."],
         v=["essere"], tenses=["presente"], t=["comparativi"]),
    dict(w=23, title="Negazioni ed esclamazioni", level="B1", d=[], r=[11, 14],
         focus="La doble negación es obligatoria, no un error.",
         keys=["non ... niente/nessuno/mai/più/ancora.",
               "Si el negativo va delante, cae el non: nessuno è venuto.",
               "neanche/nemmeno/neppure = ni siquiera.",
               "Exclamaciones: Che bello! Quanto sei gentile! Come sei cambiato!"],
         v=["essere", "avere", "venire"], tenses=["presente", "passatoProssimo"],
         t=["negazioni"]),
    dict(w=24, title="Suffissi e alterazione", level="B1", d=[], r=[6],
         focus="Un recurso que el italiano usa muchísimo más que el español.",
         keys=["-ino/-etto/-ello: pequeño o afectivo.",
               "-one: aumentativo (un librone).",
               "-accio: despectivo (tempaccio, parolaccia).",
               "No todo se puede alterar: hay combinaciones fijas y lexicalizadas."],
         v=["essere"], tenses=["presente"], t=["suffissi"]),
    dict(w=25, title="Numerali, misure e quantità", level="B1", d=[], r=[17],
         focus="Cantidad precisa: donde se nota si sos turista o residente.",
         keys=["Ordinales: primo ... decimo, luego -esimo.",
               "Colectivos: un paio, una decina, un centinaio, migliaia.",
               "Fracciones y porcentajes: due terzi, il 20 per cento.",
               "Medidas y el partitivo: del pane, un po' di, qualche."],
         v=["essere", "avere"], tenses=["presente"], t=["numerali"]),
    dict(w=26, title="BOSS — Livello B1", level="B1", d=[16, 17, 18], r=[20, 21],
         boss=True,
         focus="Examen de la segunda estación: todo el sistema de pasados y futuros.",
         keys=["Passato prossimo e imperfetto elegidos sin dudar.",
               "Futuro y condicional con raíces irregulares.",
               "Pronombres, conectores y comparativos en frases largas."],
         v=["essere", "avere", "fare", "andare", "venire", "volere"],
         tenses=["passatoProssimo", "imperfetto", "futuro", "condizionale"], t=[]),

    # ---------------- Stagione 3: La Corrente (B1 -> B2) ----------------
    dict(w=27, title="Congiuntivo presente: forme", level="B2", d=[20], r=[24],
         focus="La forma es fácil; lo difícil viene después.",
         keys=["Se parte de la 1ª persona del presente: finisco → finisca.",
               "-are → i; -ere/-ire → a; noi = indicativo; voi siempre -iate.",
               "Las tres personas del singular son idénticas: hace falta el pronombre.",
               "Irregulares clave: sia, abbia, faccia, vada, possa, voglia, debba."],
         v=["parlare", "vendere", "dormire", "finire", "essere", "avere",
            "fare", "andare", "potere", "volere"],
         tenses=["congiuntivo"], t=["congiuntivo"]),
    dict(w=28, title="Congiuntivo: quando si usa", level="B2", d=[20], r=[24],
         focus="El punto donde el español te traiciona: credo che SIA, no «es».",
         keys=["Opinión, duda, deseo, emoción, voluntad → congiuntivo.",
               "Certeza y declaración → indicativo (so che, è chiaro che).",
               "Negar un verbo declarativo lo pasa a congiuntivo: non dico che sia.",
               "benché, sebbene, prima che, affinché, purché, a meno che.",
               "Superlativo y antecedente indefinido en relativas."],
         v=["essere", "avere", "sapere", "credere"], tenses=["congiuntivo"],
         t=["congiuntivo"]),
    dict(w=29, title="Congiuntivo passato", level="B2", d=[22], r=[24],
         focus="Opinión presente sobre un hecho pasado.",
         keys=["abbia/sia + participio.",
               "Penso che sia partito ieri.",
               "Concordancia del participio con essere.",
               "Se usa cuando el verbo principal está en presente o futuro."],
         v=["parlare", "partire", "fare", "essere"], tenses=["congiuntivoPassato"],
         t=["congiuntivo", "concordanza"]),
    dict(w=30, title="Congiuntivo imperfetto e trapassato", level="B2",
         d=[], r=[24],
         focus="Las dos formas que hacen falta para hablar del pasado con matiz.",
         keys=["Imperfetto: parlassi, vendessi, dormissi; irregulares fossi, facessi, dessi, stessi.",
               "Trapassato: avessi/fossi + participio.",
               "Aparecen tras verbo principal en pasado y en el periodo hipotético.",
               "Son la marca del italiano culto: sin ellas te quedás en B1."],
         v=["parlare", "essere", "fare", "dare", "stare", "avere"],
         tenses=["congImperfetto", "congiuntivoTrapassato"], t=["congiuntivo"]),
    dict(w=31, title="Concordanza dei tempi", level="B2", d=[], r=[24],
         focus="Qué tiempo pide qué tiempo: la regla que ordena todo el sistema.",
         keys=["Principal en presente + simultáneo → congiuntivo presente.",
               "Principal en presente + anterior → congiuntivo passato.",
               "Principal en pasado + simultáneo → congiuntivo imperfetto.",
               "Principal en pasado + anterior → congiuntivo trapassato.",
               "Futuro en el pasado = condizionale passato (disse che sarebbe venuto)."],
         v=["essere", "avere", "venire", "partire"],
         tenses=["congiuntivo", "congiuntivoPassato", "congImperfetto",
                 "congiuntivoTrapassato"],
         t=["concordanza"]),
    dict(w=32, title="Periodo ipotetico", level="B2", d=[19], r=[21, 24],
         focus="Los tres tipos, y la prohibición absoluta del condicional tras «se».",
         keys=["Tipo I real: se ho tempo, ti chiamo.",
               "Tipo II irreal presente: se avessi tempo, ti chiamerei.",
               "Tipo III irreal pasado: se avessi avuto tempo, ti avrei chiamato.",
               "Mixtos: condición pasada, consecuencia presente.",
               "Nunca «se + condizionale»."],
         v=["avere", "essere", "potere", "venire"],
         tenses=["congImperfetto", "congiuntivoTrapassato", "condizionale",
                 "condizionalePassato"],
         t=["periodo ipotetico"]),
    dict(w=33, title="Condizionale passato", level="B2", d=[21], r=[21],
         focus="«Habría» y el futuro visto desde el pasado.",
         keys=["avrei/sarei + participio.",
               "Arrepentimiento: avrei dovuto studiare.",
               "avrei potuto / avrei dovuto / avrei voluto.",
               "Futuro en el pasado: mi ha detto che sarebbe arrivato tardi."],
         v=["dovere", "potere", "volere", "venire", "fare"],
         tenses=["condizionalePassato"], t=["concordanza"]),
    dict(w=34, title="La voce passiva", level="B2", d=[19], r=[26],
         focus="Tres auxiliares distintos, tres matices distintos.",
         keys=["essere + participio: pasiva neutra.",
               "venire + participio: subraya el proceso; solo tiempos simples.",
               "andare + participio: obligación (va fatto = debe hacerse).",
               "El agente va con da."],
         v=["fare", "scrivere", "vedere"], tenses=["passatoProssimo"],
         t=["passivo"]),
    dict(w=35, title="Si passivante e si impersonale", level="B2", d=[], r=[26],
         focus="La construcción con «si» que el español tiene pero usa distinto.",
         keys=["si passivante concuerda con el objeto: si vendono libri.",
               "si impersonale con verbo en 3ª singular: si dice, si va.",
               "Con si impersonal el adjetivo va en plural: quando si è stanchi.",
               "En pasado siempre con essere: si è mangiato bene."],
         v=["mangiare", "vendere", "dire"], tenses=["presente", "passatoProssimo"],
         t=["passivo"]),
    dict(w=36, title="Pronomi combinati", level="B2", d=[], r=[7],
         focus="Dos pronombres en la misma frase, en el orden correcto.",
         keys=["Indirecto + directo: me lo, te la, ce ne, ve li.",
               "gli/le + lo → glielo, gliela, glieli, gliele, gliene.",
               "mi/ti/ci/vi pasan a me/te/ce/ve ante otro pronombre.",
               "Con infinitivo y modales hay dos posiciones válidas."],
         v=["dare", "dire", "mettere"],
         tenses=["presente", "passatoProssimo"], t=["pronomi combinati"]),
    dict(w=37, title="Le particelle NE e CI", level="B2", d=[], r=[12, 25],
         focus="Dos palabritas que no existen en español y aparecen todo el tiempo.",
         keys=["ne = di + algo, y partitivo: ne ho due.",
               "ci = a + algo, y locativo: ci vado, ci credo.",
               "Con ne partitivo el participio concuerda: ne ho comprate tre.",
               "Verbos pronominales: andarsene, farcela, avercela, volerci, metterci."],
         v=["andare", "avere", "fare"], tenses=["presente", "passatoProssimo"],
         t=["ne", "ci"]),
    dict(w=38, title="Pronomi relativi", level="B2", d=[], r=[13],
         focus="che, cui, il quale: elegir bien alarga las frases sin romperlas.",
         keys=["che como sujeto u objeto, sin preposición.",
               "cui siempre con preposición: di cui, a cui, in cui, con cui.",
               "il cui / la cui para el posesivo.",
               "quello che / ciò che = lo que; il che retoma toda una frase."],
         v=["essere", "parlare"], tenses=["presente", "passatoProssimo"],
         t=["relativi"]),
    dict(w=39, title="BOSS — Livello B2", level="B2", d=[19, 20, 21, 22],
         r=[24, 26], boss=True,
         focus="Examen de la tercera estación: subjuntivo, hipotéticos y pasiva.",
         keys=["Los cuatro tiempos del congiuntivo, elegidos por concordancia.",
               "Los tres periodos hipotéticos.",
               "Pasiva en sus tres formas y el si passivante.",
               "Pronombres combinados, ne y ci."],
         v=["essere", "avere", "fare", "potere", "venire"],
         tenses=["congiuntivo", "congImperfetto", "congiuntivoPassato",
                 "condizionalePassato"],
         t=["congiuntivo", "periodo ipotetico", "passivo"]),

    # ---------------- Stagione 4: La Vetta (B2 -> C1) ----------------
    dict(w=40, title="Il causativo: fare e lasciare", level="C1", d=[], r=[27],
         focus="Hacer que alguien haga algo: una construcción sin equivalente directo.",
         keys=["fare + infinito: ho fatto riparare la macchina.",
               "farsi + infinito: mi sono fatto tagliare i capelli.",
               "lasciare + infinito = permitir.",
               "Con dos complementos, la persona pasa a indirecto: glielo ho fatto leggere."],
         v=["fare", "vedere"],
         tenses=["passatoProssimo"], t=["causativo"]),
    dict(w=41, title="Verbi di percezione", level="C1", d=[], r=[27],
         focus="Ver, oír y sentir con infinitivo, gerundio o relativa.",
         keys=["ho visto Maria uscire / che usciva / uscendo: tres matices.",
               "Con pronombre: l'ho vista uscire.",
               "sentire, vedere, guardare, ascoltare, osservare, notare.",
               "El infinitivo es la forma no marcada."],
         v=["vedere", "sentire", "ascoltare"],
         tenses=["passatoProssimo"], t=["percezione"]),
    dict(w=42, title="Verbi e preposizioni", level="C1", d=[], r=[28],
         focus="La lista que separa al que habla bien del que habla correcto.",
         keys=["Con a: cominciare, continuare, riuscire, provare, imparare, aiutare.",
               "Con di: decidere, cercare, finire, smettere, dimenticarsi, pentirsi.",
               "Sin preposición: modales, preferire, desiderare, amare, osare.",
               "Cambios de sentido: pensare a / pensare di, finire di / finire per."],
         v=["cominciare", "finire", "riuscire"],
         tenses=["passatoProssimo"], t=["preposizioni"]),
    dict(w=43, title="L'infinito", level="C1", d=[], r=[23],
         focus="El infinitivo como sujeto, como orden y como subordinada.",
         keys=["Infinitivo sustantivado: il mangiare, un continuo andare e venire.",
               "Infinitivo compuesto: dopo aver mangiato, per essere arrivato tardi.",
               "Instrucciones y avisos: non fumare, spingere, tirare.",
               "Si el sujeto es el mismo, se prefiere infinitivo al congiuntivo: "
               "spero di venire, no spero che io venga."],
         v=["fare", "essere", "avere"], tenses=["presente"], t=["infinito"]),
    dict(w=44, title="Gerundio e participio", level="C1", d=[], r=[23],
         focus="Las formas que comprimen dos frases en una.",
         keys=["Gerundio simple con sujeto compartido: studiando, ha imparato.",
               "Gerundio compuesto: avendo finito, è uscito.",
               "pur + gerundio = aunque.",
               "Participio absoluto: finita la riunione, siamo usciti.",
               "stare + gerundio solo para la acción en curso; «seguir + gerundio» = continuare A."],
         v=["fare", "dire", "bere", "porre"], tenses=["presente"],
         t=["gerundio", "participio"]),
    dict(w=45, title="Passato remoto e trapassato remoto", level="C1",
         d=[], r=[20],
         focus="El pasado de la narrativa y del sur: hay que reconocerlo y saber usarlo.",
         keys=["Regular: parlai, vendei, dormii.",
               "Irregulares en el patrón 1-3-3: feci/facesti/fece/facemmo/faceste/fecero.",
               "Imprescindible para leer literatura y prensa histórica.",
               "Trapassato remoto solo tras conjunción temporal: appena ebbe finito."],
         v=["essere", "avere", "fare", "dire", "prendere", "vedere", "nascere",
            "conoscere", "scrivere"],
         tenses=["passatoRemoto", "trapassatoRemoto"], t=["passato remoto"]),
    dict(w=46, title="Costruzioni verbali speciali", level="C1", d=[], r=[25],
         focus="Verbos pronominales idiomáticos y construcciones fijas.",
         keys=["andarsene, farcela, avercela con, prendersela, cavarsela.",
               "volerci vs metterci.",
               "stare per + infinitivo = estar a punto de.",
               "finire per, finire con l', mettersi a, stare a."],
         v=["andare", "fare", "avere", "stare"],
         tenses=["presente", "passatoProssimo"], t=["ne", "ci"]),
    dict(w=47, title="Discorso indiretto", level="C1", d=[], r=[24, 29],
         focus="Reportar lo que se dijo, con todos los desplazamientos.",
         keys=["Presente → imperfetto; passato prossimo → trapassato.",
               "Futuro → condizionale passato: disse che sarebbe venuto.",
               "Imperativo → di + infinitivo: mi disse di aspettare.",
               "Cambian también deícticos: oggi → quel giorno, qui → lì, "
               "domani → il giorno dopo."],
         v=["dire", "essere", "venire", "fare"],
         tenses=["imperfetto", "trapassatoProssimo", "condizionalePassato"],
         t=["concordanza"]),
    dict(w=48, title="Ordine delle parole e dislocazioni", level="C1",
         d=[], r=[29],
         focus="El orden marcado: lo que suena italiano de verdad.",
         keys=["Dislocación a la izquierda con pronombre de retoma: il pane lo compro io.",
               "Dislocación a la derecha: lo sapevo già, questo.",
               "Frase escindida: è questo che non capisco.",
               "c'è + relativa como presentativo: c'è Marco che ti aspetta.",
               "Inversión sujeto-verbo con inacusativos: è arrivato il treno."],
         v=["essere", "avere", "arrivare"], tenses=["presente", "passatoProssimo"],
         t=["ordine"]),
    dict(w=49, title="Registro alto e coesione testuale", level="C1",
         d=[], r=[16, 29],
         focus="Escribir y argumentar como un nativo culto.",
         keys=["Conectores de registro alto: nonostante, malgrado, qualora, "
               "laddove, in quanto, ove.",
               "Nominalización: l'aumento dei prezzi anziché i prezzi sono aumentati.",
               "Ordenar el argumento: in primo luogo, per di più, d'altra parte, "
               "in definitiva.",
               "Evitar el calco del español en la subordinación."],
         v=["essere", "porre", "trarre", "tradurre"],
         tenses=["congiuntivo", "condizionale"], t=["connettivi"]),
    dict(w=50, title="Lessico avanzato e falsi amici", level="C1", d=[], r=[6, 15],
         focus="La última trampa del hispanohablante: el vocabulario que se parece.",
         keys=["burro, salire, aceto, guardare, prima, largo, esito, imbarazzata.",
               "Matices: sapere/conoscere, portare/prendere, andare/venire.",
               "Colocaciones fijas: prendere una decisione, fare una domanda.",
               "Sufijos y alteración como recurso expresivo."],
         v=["sapere", "conoscere", "prendere"],
         tenses=["presente", "passatoProssimo"], t=["falsi amici", "espressioni"]),
    dict(w=51, title="Ripasso generale C1", level="C1",
         d=[19, 20, 21, 22], r=[24, 26, 27, 28, 29],
         focus="Barrido final de todo lo que da problemas.",
         keys=["Congiuntivo y concordancia de tiempos automáticos.",
               "Periodo hipotético en los tres tipos y mixtos.",
               "Causativo, pasiva y si passivante.",
               "Dislocaciones y registro."],
         v=["essere", "avere", "fare", "porre", "tradurre", "venire", "rimanere"],
         tenses=["congiuntivo", "congImperfetto", "congiuntivoTrapassato",
                 "condizionalePassato", "passatoRemoto"],
         t=["congiuntivo", "periodo ipotetico", "passivo", "causativo",
            "ordine", "concordanza"]),
    dict(w=52, title="ESAME FINALE — Livello C1", level="C1",
         d=[16, 18, 19, 20, 21, 22], r=[20, 21, 24, 26, 27, 28, 29], boss=True,
         focus="El examen del año: 40 preguntas, todo el programa, sin ayudas.",
         keys=["Se aprueba con 85%.",
               "Mezcla ítems de los dos manuales, del gimnasio de conjugación y "
               "del banco C1.",
               "Si lo pasás, terminaste el año."],
         v=["essere", "avere", "fare", "dire", "porre", "tradurre", "trarre",
            "rimanere", "venire", "scegliere"],
         tenses=["congiuntivo", "congImperfetto", "congiuntivoPassato",
                 "congiuntivoTrapassato", "condizionalePassato", "passatoRemoto",
                 "futuroAnteriore"],
         t=["congiuntivo", "concordanza", "periodo ipotetico", "passivo",
            "causativo", "percezione", "preposizioni", "gerundio", "ordine",
            "relativi", "ne", "ci", "pronomi combinati", "falsi amici"]),
]

SEASONS = [
    dict(n=1, name="Le Fondamenta", weeks=[1, 13], level="A1 → A2",
         blurb="Sonidos, género, artículos y el presente completo."),
    dict(n=2, name="Il Ponte", weeks=[14, 26], level="A2 → B1",
         blurb="Todo el sistema de pasados, futuro y condicional."),
    dict(n=3, name="La Corrente", weeks=[27, 39], level="B1 → B2",
         blurb="Congiuntivo, periodo hipotético, pasiva, ne y ci."),
    dict(n=4, name="La Vetta", weeks=[40, 52], level="B2 → C1",
         blurb="Causativo, formas no finitas, discurso indirecto y registro alto."),
]


# --------------------------------------------------------------------------
# Normalización de los ítems extraídos de "For Dummies"
# --------------------------------------------------------------------------

def classify(directions: str) -> tuple:
    """Guess the drill type and give it a Spanish prompt."""
    d = directions.lower()
    if "into italian" in d:
        return "translate", "Traducí al italiano."
    if "into english" in d:
        return "translate_en", "Traducí al inglés."
    if "plural" in d:
        return "plural", "Escribí el plural."
    if "masculine or feminine" in d or "“m”" in d or '"m"' in d:
        return "gender", "¿Masculino (M) o femenino (F)?"
    if "write out the numbers" in d or "spelling out" in d:
        return "numbers", "Escribí el número en palabras."
    if "conjugat" in d:
        return "conjugate", "Conjugá el verbo."
    if "question" in d and "answer" in d:
        return "qa", "Respondé en italiano."
    return "cloze", "Completá la frase."


def split_answers(answer: str) -> list:
    """Accepted spellings for one book answer.

    The book writes alternative answers with ';' and word-bank answers with
    ','.  The full string always stays first: it is the printed answer, so it
    must grade as correct even when it also splits into parts.
    """
    out = [answer.strip()]
    for part in re.split(r";|/(?=\s)", answer):
        part = part.strip()
        if part and part not in out:
            out.append(part)
    if "," in answer:
        for part in answer.split(","):
            part = part.strip()
            if part and part not in out:
                out.append(part)
    return [x for x in out if x]


def load_authored() -> list:
    """Import every tools/authored/*.py module and collect its ITEMS."""
    out = []
    folder = os.path.join(ROOT, "tools", "authored")
    for fn in sorted(os.listdir(folder)):
        if not fn.endswith(".py"):
            continue
        spec = importlib.util.spec_from_file_location(fn[:-3],
                                                      os.path.join(folder, fn))
        mod = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(mod)
        for it in getattr(mod, "ITEMS", []):
            item = dict(it)
            item["src"] = "autore"
            item.setdefault("level", "C1" if item["id"].startswith("c1") else "B2")
            out.append(item)
    return out


def main() -> None:
    with open(os.path.join(DATA, "bank_dummies.json"), encoding="utf-8") as fh:
        dummies = json.load(fh)
    with open(os.path.join(DATA, "bank_routledge.json"), encoding="utf-8") as fh:
        routledge = json.load(fh)

    # --- graded items from the Dummies bank -----------------------------
    items = []
    for ch in dummies["chapters"]:
        for it in ch["items"]:
            kind, prompt = classify(it["directions"] or "")
            items.append({
                "id": it["id"],
                "src": "dummies",
                "chapter": ch["chapter"],
                "type": kind,
                "prompt": prompt,
                "stem": it["stem"],
                "answer": it["answer"],
                "accept": split_answers(it["answer"]),
                "example": it["example"],
                "hint": it["directions"],
            })

    authored = load_authored()
    for it in authored:
        it.setdefault("accept", [it["answer"]] + list(it.get("alt", [])))

    # --- weekly missions -------------------------------------------------
    by_chapter = {}
    for it in items:
        by_chapter.setdefault(it["chapter"], []).append(it["id"])
    by_topic = {}
    for it in authored:
        by_topic.setdefault(it["topic"], []).append(it["id"])

    challenges = {c["chapter"]: c for c in routledge["chapters"]}

    weeks, missing = [], []
    for spec in WEEKS:
        pool = []
        for c in spec.get("d", []):
            if c not in by_chapter:
                missing.append("dummies cap. %s (settimana %s)" % (c, spec["w"]))
            pool += by_chapter.get(c, [])
        for t in spec.get("t", []):
            if t not in by_topic:
                missing.append("tema '%s' (settimana %s)" % (t, spec["w"]))
            pool += by_topic.get(t, [])

        chal = []
        for c in spec.get("r", []):
            if c not in challenges:
                missing.append("routledge cap. %s (settimana %s)" % (c, spec["w"]))
                continue
            chal += [x["id"] for x in challenges[c]["challenges"]]

        season = next(s["n"] for s in SEASONS
                      if s["weeks"][0] <= spec["w"] <= s["weeks"][1])
        weeks.append({
            "week": spec["w"],
            "season": season,
            "title": spec["title"],
            "level": spec["level"],
            "focus": spec["focus"],
            "keys": spec["keys"],
            "boss": bool(spec.get("boss")),
            "refs": {
                "dummies": spec.get("d", []),
                "routledge": spec.get("r", []),
                "sections": [s for c in spec.get("r", [])
                             for s in (challenges.get(c, {}).get("sections") or [])],
            },
            "items": pool,
            "challenges": chal,
            "verbs": spec.get("v", []),
            "tenses": spec.get("tenses", ["presente"]),
        })

    if missing:
        print("ATTENZIONE, riferimenti mancanti:")
        for m in missing:
            print("  -", m)

    # Routledge challenges, flattened for the self-scored mode.
    flat = []
    for c in routledge["chapters"]:
        for x in c["challenges"]:
            flat.append({
                "id": x["id"],
                "chapter": c["chapter"],
                "chapterTitle": c["title"],
                "instruction": x["instruction"],
                "items": x["items"],
            })

    course = {
        "title": "La Via C1",
        "seasons": SEASONS,
        "weeks": weeks,
        "items": items + authored,
        "challenges": flat,
        "sources": [dummies["source"], routledge["source"]],
    }
    out = os.path.join(DATA, "course.json")
    with open(out, "w", encoding="utf-8") as fh:
        json.dump(course, fh, ensure_ascii=False, separators=(",", ":"))

    empty = [w["week"] for w in weeks if not w["items"]]
    print("settimane: %d  item giocabili: %d (dummies %d + autore %d)"
          % (len(weeks), len(items) + len(authored), len(items), len(authored)))
    print("sfide Routledge: %d  gruppi con item: %d"
          % (sum(len(x["items"]) for x in flat), len(flat)))
    if empty:
        print("settimane senza item auto-correggibili:", empty)
    print("-> %s (%.0f KB)" % (out, os.path.getsize(out) / 1024))


if __name__ == "__main__":
    main()
