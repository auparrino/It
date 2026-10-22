# -*- coding: utf-8 -*-
"""Semana 43 — Als ob nichts wäre (C1): als ob / als wenn, modales en Konjunktiv II pasado y es sei denn."""
from itertools import product

from base import q, ch, li, cz, tr, ty, MAY  # noqa: F401


def V(*parts):
    """Todas las combinaciones: cada parte es un texto fijo o una lista de variantes."""
    return ["".join(p) for p in product(*[[x] if isinstance(x, str) else x for x in parts])]


WEEK = {
    "week": 43,
    "title": "Als ob nichts wäre",
    "level": "C1",
    "focus": "El Konjunktiv II en su versión más fina: comparar con lo irreal, reprochar lo que no se hizo y poner condiciones con *es sei denn*.",
    "fare": "Describir a alguien que actúa como si nada, reprocharle (y reprocharte) lo que habría que haber hecho, y anunciar la única excepción a un plan.",
    "tema": "als ob / als wenn / als + Konjunktiv II presente y pasado, modales en Konjunktiv II pasado (hätte machen sollen), es sei denn, zu … als dass; reproches",
    "keys": [
        "*als ob* + Konjunktiv II: *Er tut so, als ob er alles wüsste* (al mismo tiempo).",
        "Para algo anterior, Konjunktiv II pasado: *Sie sieht aus, als ob sie nicht geschlafen hätte*.",
        "Sin *ob*, el verbo va pegado a *als*: *als wäre nichts passiert*.",
        "Reproches: *Du hättest anrufen sollen / können / müssen*: *hätte* + dos infinitivos.",
        "En la subordinada, *hätte* va **antes** de los dos infinitivos: *…, dass ich hätte anrufen sollen*.",
        "*es sei denn* = a menos que, con indicativo: *Wir kommen, es sei denn, es regnet*.",
    ],
    "lesson": {
        "intro": "Hay gente que actúa como si nada hubiera pasado, y hay cosas que tendríamos que haber hecho y no hicimos. Para las dos cosas el alemán usa el Konjunktiv II, con algunas construcciones que a nivel C1 tenés que dominar.",
        "parts": [
            {"h": "Como si: als ob, als wenn, als", "blocks": [0, 1, 2]},
            {"h": "Lo que tendrías que haber hecho", "blocks": [3, 4, 5]},
            {"h": "Excepciones y consecuencias irreales", "blocks": [6, 7]},
        ],
        "blocks": [
            {
                "h": "als ob / als wenn: comparar con lo que no es",
                "r": "En la semana 30 viste *als ob* con el Konjunktiv II presente. Repaso: *als ob* (o *als wenn*, igual de correcto) compara con algo **irreal o dudoso**: «como si». Es subordinante, el verbo va al **final** y va en **Konjunktiv II** cuando la comparación es **simultánea**. Lo típico: *so tun, als ob* («hacer como si») y *aussehen / klingen / sich anfühlen, als ob*.",
                "ex": [
                    ["Er tut so, *als ob* er alles *wüsste*.", "Hace como si supiera todo."],
                    ["Du redest, *als wenn* du der Chef *wärst*.", "Hablás como si fueras el jefe."],
                    ["Es fühlt sich an, *als ob* ich schon ewig hier *wohnen würde*.", "Se siente como si viviera acá desde siempre."],
                    ["Er gibt das Geld aus, *als ob* er Millionär *wäre*.", "Gasta la plata como si fuera millonario."],
                ],
                "warn": "En castellano «como si» va con subjuntivo imperfecto (*como si supiera*); en alemán, con Konjunktiv II: *als ob er wüsste*, no *als ob er weiß*. En el habla se oye el indicativo, y en la prensa a veces el Konjunktiv I (*als ob er alles wisse*), pero en un texto C1 lo seguro es el Konjunktiv II.",
                "tip": "Con verbos regulares usá *würde* + infinitivo (*als ob er arbeiten würde*); con *sein, haben, wissen* y los modales, la forma propia: *wäre, hätte, wüsste, könnte*.",
                "q": [
                    q("Completá: *Er tut so, als ob er krank ___.*", "wäre", ["wäre", "ist", "war"]),
                    q("*als wenn* es…", "lo mismo que *als ob*", ["lo mismo que *als ob*", "«cuando»", "«aunque»"]),
                ],
            },
            {
                "h": "Como si hubiera pasado: als ob + Konjunktiv II pasado",
                "r": "Si lo que imaginás es **anterior** a la acción principal, usás el **Konjunktiv II pasado**: *hätte* / *wäre* + participio. Es nuestro «como si hubiera…». La elección entre *hätte* y *wäre* es la misma que en el Perfekt.",
                "table": {"head": ["Comparación", "Forma", "Ejemplo"], "rows": [
                    ["simultánea", "wäre / hätte / würde + inf.", "Er tut, als ob er müde wäre."],
                    ["anterior (con haben)", "hätte + participio", "Er tut, als ob er nichts gehört hätte."],
                    ["anterior (con sein)", "wäre + participio", "Sie lacht, als ob nichts passiert wäre."],
                ]},
                "ex": [
                    ["Sie sieht aus, *als ob* sie die ganze Nacht nicht *geschlafen hätte*.", "Parece como si no hubiera dormido en toda la noche."],
                    ["Er begrüßte mich, *als ob* wir uns erst gestern *gesehen hätten*.", "Me saludó como si nos hubiéramos visto recién ayer."],
                    ["Sie tat, *als ob* sie nie dort *gewesen wäre*.", "Hizo como si nunca hubiera estado ahí."],
                ],
                "warn": "*passieren, geschehen, gehen, kommen, sein* y los demás verbos que hacen el Perfekt con *sein* usan *wäre*: *als ob nichts passiert wäre*, no *passiert hätte*.",
                "q": [
                    q("Completá: *Er tut so, als ob er den Brief nie ___ hätte.*", "bekommen", ["bekommen", "bekommt", "bekäme"]),
                    q("Completá: *Sie redet, als ob nichts geschehen ___.*", "wäre", ["wäre", "hätte", "ist"]),
                ],
            },
            {
                "h": "als + verbo: la versión sin ob",
                "r": "En el registro escrito (y en el título de esta semana) se suele omitir *ob*: entonces el **verbo conjugado** va **inmediatamente después de *als***, y el resto queda igual. El sentido no cambia.",
                "table": {"head": ["Con ob / wenn", "Sin ob"], "rows": [
                    ["als ob nichts passiert wäre", "als wäre nichts passiert"],
                    ["als ob er alles wüsste", "als wüsste er alles"],
                    ["als wenn sie krank wäre", "als wäre sie krank"],
                    ["als ob er nichts gehört hätte", "als hätte er nichts gehört"],
                ]},
                "ex": [
                    ["Er tut, *als wüsste* er alles.", "Hace como si supiera todo."],
                    ["Sie lebt weiter, *als wäre* nichts gewesen.", "Sigue con su vida como si nada."],
                    ["Er sah mich an, *als hätte* er einen Geist gesehen.", "Me miró como si hubiera visto un fantasma."],
                    ["Es klingt, *als hätte* jemand an die Tür geklopft.", "Suena como si alguien hubiera golpeado la puerta."],
                ],
                "warn": "No mezcles las dos: *als ob wäre nichts* o *als nichts passiert wäre* están mal. Con *ob*, verbo al final; sin *ob*, verbo pegado a *als*.",
                "tip": "*Als ob!*, solo y con ironía, es nuestro «¡Sí, seguro!»: *Er will pünktlich sein? Als ob!*",
                "q": [
                    q("Completá sin *ob*: *Er tut, als ___ er nichts gesehen.*", "hätte", ["hätte", "habe", "hat"]),
                    q("¿Qué oración es correcta?", "Sie lacht, als wäre nichts passiert.", ["Sie lacht, als wäre nichts passiert.", "Sie lacht, als nichts passiert wäre.", "Sie lacht, als ob wäre nichts passiert."]),
                ],
            },
            {
                "h": "hätte + doble infinitivo",
                "r": "Para un **reproche** o un **arrepentimiento** con modal en pasado, el alemán no usa el participio del modal sino su **infinitivo**: *hätte* + infinitivo del verbo + infinitivo del modal. Es el «doble infinitivo»: *Du hättest anrufen sollen* = «tendrías que haber llamado».",
                "table": {"head": ["Modal", "Matiz", "Ejemplo"], "rows": [
                    ["sollen", "consejo o deber no cumplido", "Du hättest früher kommen sollen."],
                    ["müssen", "obligación clara (más fuerte)", "Ich hätte es wissen müssen."],
                    ["können", "posibilidad desperdiciada; reproche", "Du hättest mir helfen können!"],
                    ["nicht dürfen", "no estaba permitido / no tendría que", "Das hätte nicht passieren dürfen."],
                ]},
                "ex": [
                    ["Wir *hätten* das Spiel gewinnen *können*.", "Podríamos haber ganado el partido."],
                    ["Sie *hätten* mich vorher fragen *müssen*.", "Me tendrían que haber preguntado antes."],
                    ["Das *hättest* du mir früher sagen *sollen*!", "¡Eso me lo tendrías que haber dicho antes!"],
                ],
                "warn": "No digas *Du hättest anrufen gesollt*: con otro verbo al lado, el modal queda en infinitivo (*sollen*). Y siempre es *hätte*, aunque el verbo principal sea de movimiento: *Du hättest kommen sollen*, nunca *wärst kommen sollen*.",
                "tip": "«¡Me podrías haber avisado!» con tono de queja = *Du hättest mir Bescheid sagen können!*: acá *können* es reproche, no una posibilidad neutra.",
                "q": [
                    q("Completá: *Du hättest früher kommen ___.*", "sollen", ["sollen", "gesollt", "sollst"]),
                    q("Completá: *Wir ___ den früheren Zug nehmen sollen.*", "hätten", ["hätten", "wären", "würden"]),
                ],
            },
            {
                "h": "Reprochar y reprocharse",
                "r": "Los reproches se refuerzan o se suavizan con palabras chicas: *wenigstens* («por lo menos»), *lieber* («mejor»), *auch* («también»). Y para contar el reproche de otro: *jemandem etwas vorwerfen* (reprocharle algo a alguien).",
                "ex": [
                    ["Du *hättest* wenigstens anrufen *können*!", "¡Por lo menos podrías haber llamado!"],
                    ["Ich *hätte* lieber zu Hause bleiben *sollen*.", "Mejor me hubiera quedado en casa."],
                    ["Das *hättest* du dir sparen *können*.", "Te lo podrías haber ahorrado."],
                    ["Man *hätte* die Bürger früher informieren *müssen*.", "Habría que haber informado antes a los ciudadanos."],
                    ["Sie *wirft* ihm *vor*, dass er nie zuhört.", "Le reprocha que nunca escucha."],
                ],
                "warn": "*vorwerfen* lleva **dativo** de persona y acusativo de cosa: *Sie wirft* ***ihm*** *Leichtsinn vor*. Es separable: el *vor* va al final.",
                "tip": "*Das hättest du dir sparen können* es el clásico para cuando alguien hizo un comentario innecesario.",
                "q": [
                    q("¿Cómo decís «¡Por lo menos podrías haber llamado!»?", "Du hättest wenigstens anrufen können!", ["Du hättest wenigstens anrufen können!", "Du hättest wenigstens angerufen können!", "Du könntest wenigstens anrufen gehabt!"]),
                    q("Completá: *Sie wirft ___ Unpünktlichkeit vor.* (a él)", "ihm", ["ihm", "ihn", "er"]),
                ],
            },
            {
                "h": "En la subordinada: hätte va adelante",
                "r": "Cuando esta construcción va en una **subordinada** (*dass, weil, obwohl…*), hay una excepción famosa a la regla del verbo al final: *hätte* **no** va último, sino **antes** de los dos infinitivos.",
                "table": {"head": ["Principal", "Subordinada"], "rows": [
                    ["Ich hätte anrufen sollen.", "…, dass ich hätte anrufen sollen."],
                    ["Er hätte nicht fahren dürfen.", "…, weil er nicht hätte fahren dürfen."],
                    ["Wir hätten helfen können.", "…, obwohl wir hätten helfen können."],
                ]},
                "ex": [
                    ["Mir ist klar, dass ich früher *hätte* reagieren *sollen*.", "Tengo claro que tendría que haber reaccionado antes."],
                    ["Er ist sauer, weil wir ihn *hätten* einladen *müssen*.", "Está enojado porque lo tendríamos que haber invitado."],
                ],
                "warn": "*…, dass ich anrufen sollen hätte* está mal. El orden es: *hätte* + infinitivo + modal, todo junto al final.",
                "tip": "Pensalo como un bloque fijo de tres piezas que nunca se desarma: *hätte – machen – sollen*.",
                "more": ["Lo mismo pasa con el Perfekt de los modales en subordinada: *…, weil ich nicht habe kommen können*."],
                "q": [
                    q("¿Qué orden es correcto?", "…, dass ich hätte anrufen sollen.", ["…, dass ich hätte anrufen sollen.", "…, dass ich anrufen sollen hätte.", "…, dass ich hätte angerufen sollen."]),
                    q("Completá: *Er ärgert sich, weil er die Wohnung ___ kaufen können.*", "hätte", ["hätte", "wäre", "würde"]),
                ],
            },
            {
                "h": "es sei denn: a menos que",
                "r": "*es sei denn* («a menos que», «salvo que») introduce la **única excepción** a lo que acabás de decir. La fórmula está en Konjunktiv I, pero lo que sigue va en **indicativo**: con coma y orden de oración principal (verbo segundo), o con *dass* y verbo al final. Siempre va **después** de la principal.",
                "table": {"head": ["Conector", "Significado", "Orden"], "rows": [
                    ["es sei denn, …", "a menos que", "coma + verbo 2.º (o *dass* + verbo al final)"],
                    ["außer wenn …", "excepto si", "verbo al final"],
                    ["sonst …", "si no, de lo contrario", "verbo 2.º"],
                ]},
                "ex": [
                    ["Wir fahren morgen los, *es sei denn*, es regnet.", "Salimos mañana, a menos que llueva."],
                    ["Ich komme gern, *es sei denn*, ich muss länger arbeiten.", "Voy con gusto, salvo que tenga que trabajar más."],
                    ["Das Gesetz tritt im Mai in Kraft, *es sei denn, dass* das Gericht es stoppt.", "La ley entra en vigor en mayo, a menos que el tribunal la frene."],
                ],
                "warn": "En castellano «a menos que» pide subjuntivo (*a menos que llueva*). En alemán, después de *es sei denn* va **indicativo**: *es sei denn, es regnet*, no *es regne* ni *es würde regnen*.",
                "tip": "*es sei denn* no abre la oración: primero el plan, después la excepción.",
                "q": [
                    q("Completá: *Ich gehe joggen, es sei denn, es ___.*", "regnet", ["regnet", "regne", "würde regnen"]),
                    q("*es sei denn* significa…", "a menos que", ["a menos que", "es decir", "por lo tanto"]),
                ],
            },
            {
                "h": "zu …, als dass: demasiado como para",
                "r": "Una estructura de C1: *zu* + adjetivo en la principal y *als dass* + **Konjunktiv II** en la subordinada. Dice que algo es **demasiado** como para que ocurra una consecuencia; como esa consecuencia no ocurre, va en Konjunktiv.",
                "ex": [
                    ["Das Problem ist *zu* komplex, *als dass* man es schnell lösen *könnte*.", "El problema es demasiado complejo como para resolverlo rápido."],
                    ["Er ist *zu* stolz, *als dass* er sich entschuldigen *würde*.", "Es demasiado orgulloso como para pedir perdón."],
                    ["Die Zeit war *zu* knapp, *als dass* wir alles *hätten* besprechen *können*.", "El tiempo fue demasiado corto como para que pudiéramos hablar de todo."],
                ],
                "warn": "Si el sujeto es el mismo, también podés usar *um … zu* (semana 23): *Er ist zu stolz, um sich zu entschuldigen*. Con *als dass*, el verbo va en **Konjunktiv II**, no en indicativo.",
                "q": [
                    q("Completá: *Der Text ist zu lang, als dass ich ihn heute lesen ___.*", "könnte", ["könnte", "kann", "konnte"]),
                    q("¿Qué significa *zu müde, als dass er arbeiten könnte*?", "demasiado cansado como para poder trabajar", ["demasiado cansado como para poder trabajar", "tan cansado que trabaja igual", "cansado porque trabajó"]),
                ],
            },
        ],
    },
    "vocab": [
        ["der Vorwurf", "el reproche", "Diesen Vorwurf weise ich entschieden zurück."],
        ["vorwerfen", "reprochar (jemandem etwas)", "Sie wirft ihm vor, dass er nie zuhört."],
        ["die Ausrede", "la excusa", "Das ist doch nur eine Ausrede!"],
        ["vortäuschen", "fingir, simular", "Er hat die Krankheit nur vorgetäuscht."],
        ["sich verstellen", "fingir, disimular", "Du musst dich vor mir nicht verstellen."],
        ["gleichgültig", "indiferente", "Er tut so, als wäre ihm alles gleichgültig."],
        ["unverschämt", "descarado, caradura", "Was für eine unverschämte Antwort!"],
        ["fahrlässig", "negligente", "Es war fahrlässig, die Tür offen zu lassen."],
        ["rechtzeitig", "a tiempo", "Hättest du dich rechtzeitig angemeldet, hättest du einen Platz bekommen."],
        ["die Rücksicht", "la consideración (por los demás)", "Du hättest mehr Rücksicht auf die Nachbarn nehmen sollen."],
        ["ahnen", "sospechar, intuir", "Das konnte doch niemand ahnen!"],
        ["sich einmischen", "meterse (en algo ajeno)", "Misch dich nicht in meine Angelegenheiten ein!"],
        ["beleidigt", "ofendido", "Sie ist so beleidigt, als hätte ich sie angeschrien."],
        ["die Gewissensbisse", "el remordimiento (en plural)", "Er hatte Gewissensbisse, weil er nicht angerufen hatte."],
        ["die Einbildung", "la imaginación (lo imaginado), la ilusión", "Das ist reine Einbildung."],
    ],
    "items": [
        # parte 0 — als ob / als wenn / als
        ch(0, "Elegí la forma correcta.", "Er tut so, als ob er alles ___. (wissen)", "wüsste", ["wüsste", "weiß", "wusste"], "Comparación irreal y simultánea: Konjunktiv II, *wüsste*."),
        ch(0, "Elegí la forma correcta.", "Sie sieht aus, als ob sie nicht geschlafen ___.", "hätte", ["hätte", "wäre", "hat"], "Anterior y con *haben* (*hat geschlafen*): *geschlafen hätte*."),
        ch(0, "Elegí la forma correcta.", "Er benimmt sich, als ob nichts passiert ___.", "wäre", ["wäre", "hätte", "ist"], "*passieren* hace el Perfekt con *sein*: *passiert wäre*."),
        ch(0, "Elegí la continuación correcta.", "Er tut, …", "als hätte er nichts gehört.", ["als hätte er nichts gehört.", "als er nichts gehört hätte.", "als ob hätte er nichts gehört."], "Sin *ob*, el verbo va pegado a *als*."),
        ch(0, "¿Qué significa?", "Du redest, als wärst du der Chef.", "Hablás como si fueras el jefe.", ["Hablás como si fueras el jefe.", "Hablás porque sos el jefe.", "Hablás cuando sos el jefe."], "*als wärst du* = *als ob du wärst*: como si fueras."),
        cz(0, "Escribí la forma de *sein*.", "Er tut so, als ob er krank ___.", "wäre", note="*als ob* + Konjunktiv II: *wäre*."),
        cz(0, "Escribí la forma de *sein* (sin *ob*).", "Sie lacht, als ___ nichts gewesen.", "wäre", note="*als wäre nichts gewesen* = como si nada."),
        cz(0, "Escribí el participio de *sehen*.", "Er sieht mich an, als ob er mich nie ___ hätte.", "gesehen", note="Konjunktiv II pasado: *hätte* + participio."),
        cz(0, "Escribí la forma de *haben* (sin *ob*).", "Es klingt, als ___ jemand geklopft.", "hätte", note="*als hätte jemand geklopft*: verbo pegado a *als*."),
        cz(0, "Escribí la forma de *haben* (sin *ob*, con *du*).", "Du tust ja so, als ___ du nichts davon gewusst.", "hättest", note="*als hättest du … gewusst*."),
        tr(0, "Él hace como si no me conociera.", "Er tut so, als ob er mich nicht kennen würde.",
           V("Er tut", [" so,", ","], " ", ["als ob", "als wenn"], " er mich nicht ", ["kennen würde", "kennte"], ".")
           + V("Er tut", [" so,", ","], " als ", ["würde er mich nicht kennen", "kennte er mich nicht"], "."),
           "*so tun, als ob* + Konjunktiv II (con *kennen*, lo normal es *kennen würde*)."),
        tr(0, "Ella me saludó como si nada hubiera pasado.", "Sie hat mich begrüßt, als ob nichts passiert wäre.",
           V(["Sie hat mich begrüßt", "Sie begrüßte mich"], ", ", ["als ob", "als wenn"], " nichts ", ["passiert", "geschehen"], " wäre.")
           + V(["Sie hat mich begrüßt", "Sie begrüßte mich"], ", als wäre nichts ", ["passiert", "geschehen"], "."),
           "Anterior + verbo con *sein*: *passiert wäre*."),
        tr(0, "Ella parece como si hubiera llorado.", "Sie sieht aus, als ob sie geweint hätte.",
           V("Sie sieht ", ["", "so "], "aus, ", ["als ob", "als wenn"], " sie geweint hätte.")
           + V("Sie sieht ", ["", "so "], "aus, als hätte sie geweint."),
           "*aussehen, als ob* + Konjunktiv II pasado: *geweint hätte*."),
        ty(0, "Escribí en alemán el título de la semana: «como si nada» (literal: como si nada fuera).", "«como si nada»", "als ob nichts wäre", ["als ob nichts wäre", "als wäre nichts", "als wenn nichts wäre"], "Con *ob*, verbo al final; sin *ob*, *als wäre nichts*."),
        li(0, "wüsste", ["wüsste", "wusste", "wüste"], "*wüsste* (Konjunktiv II) con ü; *wusste* (Präteritum) con u; *die Wüste* es el desierto."),
        # parte 1 — reproches con doble infinitivo
        ch(1, "Elegí la forma correcta.", "Du hättest früher kommen ___.", "sollen", ["sollen", "gesollt", "sollst"], "Doble infinitivo: el modal queda en infinitivo."),
        ch(1, "Elegí la forma correcta.", "Schade! Wir ___ das Spiel gestern gewinnen können.", "hätten", ["hätten", "wären", "würden"], "Siempre *hätte* + doble infinitivo, también con verbos de movimiento."),
        ch(1, "¿Qué significa?", "Ich hätte es wissen müssen.", "Lo tendría que haber sabido.", ["Lo tendría que haber sabido.", "Tuve que saberlo.", "Lo voy a tener que saber."], "*hätte … müssen* = tendría que haber…"),
        ch(1, "Elegí la forma correcta.", "Das hätte nicht passieren ___.", "dürfen", ["dürfen", "gedurft", "darf"], "*nicht dürfen*: no tendría que haber pasado."),
        ch(1, "¿Qué expresa?", "Du hättest mir helfen können!", "un reproche: podías ayudarme y no lo hiciste", ["un reproche: podías ayudarme y no lo hiciste", "una suposición sobre el futuro", "un pedido amable para ahora"], "*hätte … können* con signo de exclamación: posibilidad desperdiciada."),
        ch(1, "Elegí la continuación correcta.", "Ich weiß, dass ich …", "mehr hätte lernen sollen.", ["mehr hätte lernen sollen.", "mehr lernen sollen hätte.", "mehr hätte gelernt sollen."], "En subordinada, *hätte* va antes del doble infinitivo."),
        cz(1, "Escribí la forma de *haben*.", "Ihr ___ mich anrufen können!", "hättet", note="*ihr hättet* + doble infinitivo."),
        cz(1, "Escribí el modal («podrías»).", "Du hättest wenigstens Bescheid sagen ___!", "können", note="*hätte … können*: reproche."),
        cz(1, "Escribí la forma de *haben*.", "Er ist enttäuscht, weil wir ihn ___ einladen sollen.", "hätten", note="En la subordinada: *hätten einladen sollen*."),
        cz(1, "Escribí el pronombre (a él).", "Sie wirft ___ vor, dass er gelogen hat.", "ihm", note="*vorwerfen* + dativo de persona."),
        cz(1, "Escribí la forma de *haben*.", "Man ___ die Bürger früher informieren müssen.", "hätte", note="*man hätte … müssen* = habría que haber…"),
        tr(1, "Tendrías que haber llamado.", "Du hättest anrufen sollen.", ["Du hättest anrufen sollen.", "Du hättest anrufen müssen."], "*hätte* + infinitivo + *sollen*."),
        tr(1, "Podríamos haber ganado.", "Wir hätten gewinnen können.", note="*hätten gewinnen können*: doble infinitivo."),
        tr(1, "Eso no tendría que haber pasado.", "Das hätte nicht passieren dürfen.",
           V("Das hätte nicht ", ["passieren", "geschehen"], " ", ["dürfen", "sollen"], "."),
           "*nicht … dürfen*: no estaba permitido que pasara."),
        ty(1, "Pasá a subordinada. Escribí solo lo que sigue a *dass ich*.", "Ich hätte früher reagieren sollen. → Mir ist klar, dass ich …", "früher hätte reagieren sollen", note="*hätte* va antes de los dos infinitivos."),
        # parte 2 — es sei denn, zu … als dass
        ch(2, "Elegí la forma correcta.", "Wir fahren morgen los, es sei denn, es ___.", "regnet", ["regnet", "regne", "würde regnen"], "Después de *es sei denn*, indicativo."),
        ch(2, "¿Qué significa *es sei denn*?", "Ich komme mit, es sei denn, ich bin krank.", "a menos que", ["a menos que", "es decir", "por lo tanto"], "*es sei denn* = a menos que, salvo que."),
        ch(2, "Elegí la continuación correcta.", "Ich komme mit, es sei denn, …", "ich muss arbeiten.", ["ich muss arbeiten.", "ich arbeiten muss.", "muss ich arbeiten."], "Sin *dass*, orden de principal: verbo en 2.º lugar."),
        ch(2, "Elegí la forma correcta.", "Er ist zu stolz, als dass er sich entschuldigen ___.", "würde", ["würde", "wird", "hat"], "*zu …, als dass* + Konjunktiv II."),
        ch(2, "Elegí la palabra.", "Das Problem ist ___ komplex, als dass man es schnell lösen könnte.", "zu", ["zu", "so", "sehr"], "La estructura es *zu* + adjetivo …, *als dass*."),
        ch(2, "Elegí la forma correcta.", "Die Zeit war zu knapp, als dass wir alles ___ besprechen können.", "hätten", ["hätten", "haben", "wären"], "Konjunktiv II pasado con modal: *hätten besprechen können*."),
        cz(2, "Escribí la palabra que falta.", "Ich helfe dir, es sei ___, ich habe keine Zeit.", "denn", note="*es sei denn* = a menos que."),
        cz(2, "Escribí la palabra que falta.", "Der Vertrag verlängert sich automatisch, es ___ denn, Sie kündigen schriftlich.", "sei", note="Fórmula fija en Konjunktiv I: *es sei denn*."),
        cz(2, "Escribí la palabra que falta.", "Die Aufgabe ist zu schwer, als ___ ein Kind sie lösen könnte.", "dass", note="*zu …, als dass*."),
        cz(2, "Escribí la forma de *können*.", "Er spricht zu leise, als dass man ihn verstehen ___.", "könnte", note="Consecuencia irreal: Konjunktiv II, *könnte*."),
        cz(2, "Escribí la forma de *sein* (sin *ob*).", "Er tut, als ___ ihm alles gleichgültig.", "wäre", note="*als wäre ihm alles gleichgültig* = como si todo le diera igual."),
        tr(2, "Vamos a ir, a menos que llueva.", "Wir gehen hin, es sei denn, es regnet.",
           V(["Wir gehen hin", "Wir gehen", "Wir werden hingehen", "Wir kommen", "Wir fahren hin"], ", es sei denn, ", ["es regnet", "dass es regnet"], "."),
           "*es sei denn* + indicativo: *es regnet*."),
        tr(2, "Es demasiado tarde como para que podamos cambiar algo.", "Es ist zu spät, als dass wir etwas ändern könnten.",
           V("Es ist zu spät, als dass wir ", ["", "noch "], "etwas ", ["", "daran "], "ändern könnten."),
           "*zu spät, als dass* + Konjunktiv II: *könnten*."),
        ty(2, "Escribí la fórmula alemana de tres palabras que significa «a menos que».", "«a menos que»", "es sei denn", note="*es sei denn*, siempre detrás de la principal."),
        tr(2, "Él hace como si todo le diera igual.", "Er tut so, als ob ihm alles egal wäre.",
           V("Er tut", [" so,", ","], " ", ["als ob", "als wenn"], " ihm alles ", ["egal", "gleichgültig"], " wäre.")
           + V("Er tut", [" so,", ","], " als wäre ihm alles ", ["egal", "gleichgültig"], "."),
           "*ihm ist alles egal* → *als ob ihm alles egal wäre*."),
    ],
}
