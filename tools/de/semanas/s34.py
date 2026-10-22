# -*- coding: utf-8 -*-
"""Semana 34 — Obwohl, trotzdem, deshalb (B2): concesivos y consecutivos, y dónde va el verbo."""
from base import q, ch, li, cz, tr, ty, MAY  # noqa: F401


def _nc(*xs):
    """Cada variante, también sin comas (la corrección no saca las comas del medio)."""
    out = []
    for x in xs:
        for y in (x, x.replace(",", "")):
            if y not in out:
                out.append(y)
    return out


WEEK = {
    "week": 34,
    "title": "Obwohl, trotzdem, deshalb",
    "level": "B2",
    "focus": "Decir «aunque» y «por eso» de varias maneras, y saber en cada caso dónde va el verbo.",
    "fare": "Argumentar sobre la sociedad, la migración y la convivencia: oponer hechos, sacar consecuencias y encadenar razones sin errores de orden.",
    "tema": "obwohl / trotzdem / trotz, weil / da / deshalb, sodass, so … dass, folglich, also, posición del verbo, migración y convivencia",
    "keys": [
        "*obwohl* subordina: verbo al final. *Obwohl er müde ist, arbeitet er.*",
        "*trotzdem* es un adverbio: ocupa un lugar y el verbo va detrás. *Trotzdem arbeitet er.*",
        "*weil* da la causa; *deshalb* presenta la consecuencia: *Er ist krank, deshalb bleibt er zu Hause.*",
        "*sodass* = de modo que; *so* + adjetivo + *dass* = tan … que. Verbo al final.",
        "*und, aber, oder, denn, sondern* no cuentan: posición 0.",
        "*folglich* (formal), *daher, deswegen, darum* (neutros), *also* (entonces).",
    ],
    "lesson": {
        "intro": "Ya sabés *weil* y *dass* (semana 18) y *zwar … aber* (semana 29). Ahora completás el juego: decir lo mismo con una conjunción, con un adverbio o con una preposición, y saber qué le pasa al verbo en cada caso. Es lo que separa un texto B1 de uno B2.",
        "parts": [
            {"h": "Aunque: obwohl, trotzdem, trotz", "blocks": [0, 1, 2]},
            {"h": "Causa y consecuencia", "blocks": [3, 4, 5]},
            {"h": "El verbo según el conector", "blocks": [6, 7]},
        ],
        "blocks": [
            {
                "h": "obwohl: aunque, con verbo al final",
                "r": "*obwohl* introduce una **subordinada concesiva**: un hecho que **debería impedir** lo otro, pero no lo impide. Como *weil*, manda el **verbo conjugado al final**. Si la subordinada va primero, la principal **arranca con el verbo**: verbo, coma, verbo.",
                "ex": [
                    ["Er arbeitet weiter, *obwohl* er müde *ist*.", "Sigue trabajando, aunque está cansado."],
                    ["*Obwohl* sie seit zehn Jahren in Berlin *lebt*, *fühlt* sie sich manchmal fremd.", "Aunque vive hace diez años en Berlín, a veces se siente extranjera."],
                    ["*Obwohl* ich Deutsch gelernt *habe*, *verstehe* ich den Dialekt nicht.", "Aunque estudié alemán, no entiendo el dialecto."],
                ],
                "warn": "*obwohl* es para **hechos**. Si el «aunque» castellano es hipotético («aunque llueva mañana, vamos»), en alemán es ***auch wenn*** o ***selbst wenn***: *Auch wenn es morgen regnet, gehen wir.*",
                "tip": "Pista: si en castellano usás subjuntivo después de «aunque» porque **no sabés** si pasa, no es *obwohl*.",
                "q": [
                    q("Completá: *Er kommt, obwohl er keine Zeit ___.*", "hat", ["hat", "haben", "hätte"]),
                    q("¿Cuál es correcta?", "Obwohl es regnet, gehen wir spazieren.", ["Obwohl es regnet, gehen wir spazieren.", "Obwohl es regnet, wir gehen spazieren.", "Obwohl regnet es, gehen wir spazieren."]),
                ],
            },
            {
                "h": "trotzdem: igual, sin embargo",
                "r": "*trotzdem* dice lo mismo desde el otro lado: primero el obstáculo, después lo que pasa **igual**. No es una conjunción sino un **adverbio**: ocupa un lugar en la oración. Si va en la **posición 1**, el verbo va **inmediatamente detrás** y el sujeto después. También puede ir en el **campo medio**: *Er arbeitet trotzdem weiter.*",
                "ex": [
                    ["Er ist müde. *Trotzdem arbeitet er* weiter.", "Está cansado. Igual sigue trabajando."],
                    ["Er ist müde, *trotzdem arbeitet er* weiter.", "Está cansado; sin embargo, sigue trabajando."],
                    ["Er ist müde, aber er arbeitet *trotzdem* weiter.", "Está cansado, pero igual sigue trabajando."],
                    ["Die Wohnung ist teuer. Wir nehmen sie *trotzdem*.", "El departamento es caro. Igual lo tomamos."],
                ],
                "warn": "*Trotzdem er arbeitet* está mal: después de *trotzdem* en posición 1 viene **el verbo**. Es la misma regla que *Heute arbeite ich* (semana 6).",
                "tip": "Nuestro «igual» rioplatense («está lloviendo, pero voy igual») es casi siempre *trotzdem*.",
                "q": [
                    q("¿Cuál es correcta?", "Trotzdem kommt sie mit.", ["Trotzdem kommt sie mit.", "Trotzdem sie kommt mit.", "Trotzdem sie mitkommt."]),
                    q("Completá: *Es ist kalt. Wir gehen ___ schwimmen.*", "trotzdem", ["trotzdem", "obwohl", "trotz"]),
                ],
            },
            {
                "h": "Una idea, tres construcciones",
                "r": "La misma relación «a pesar de» se arma con una **conjunción subordinante** (*obwohl*), con un **adverbio** (*trotzdem*) o con una **preposición + genitivo** (*trotz*, semana 26). Elegir bien te da variedad al escribir.",
                "table": {"head": ["Conector", "Qué es", "Ejemplo"], "rows": [
                    ["obwohl", "subordinante: verbo al final", "Obwohl es regnet, gehen wir spazieren."],
                    ["trotzdem", "adverbio: verbo en 2.º lugar", "Es regnet. Trotzdem gehen wir spazieren."],
                    ["trotz", "preposición + genitivo", "Trotz des Regens gehen wir spazieren."],
                    ["zwar … aber", "conector doble (semana 29)", "Es regnet zwar, aber wir gehen spazieren."],
                ]},
                "warn": "*trotz* va con **sustantivo**, nunca con una oración: «*trotz es regnet*» está mal. Y *obwohl* necesita verbo: «*obwohl des Regens*» tampoco existe.",
                "more": ["En el habla vas a oír *trotz dem Regen* (con dativo). Por escrito, usá el genitivo: *trotz des Regens*."],
                "q": [
                    q("Completá: *___ der Kritik hält die Regierung an dem Plan fest.*", "Trotz", ["Trotz", "Trotzdem", "Obwohl"]),
                    q("Completá: *___ die Kritik groß ist, hält die Regierung an dem Plan fest.*", "Obwohl", ["Obwohl", "Trotz", "Trotzdem"]),
                ],
            },
            {
                "h": "weil y deshalb: la causa y la consecuencia",
                "r": "*weil* (semana 18) y *da* introducen la **causa**, con verbo al final. *deshalb* (y sus hermanos *deswegen, darum, daher*) presenta la **consecuencia** y es un **adverbio**: verbo justo detrás. Es la misma información contada desde el otro extremo. *da* se usa sobre todo **al comienzo** y en registro más formal, cuando la causa ya es conocida.",
                "table": {"head": ["Causa (verbo al final)", "Consecuencia (verbo en 2.º lugar)"], "rows": [
                    ["Er bleibt zu Hause, weil er krank ist.", "Er ist krank, deshalb bleibt er zu Hause."],
                    ["Da der Zug Verspätung hatte, kamen wir zu spät.", "Der Zug hatte Verspätung, deswegen kamen wir zu spät."],
                    ["Viele ziehen weg, weil die Mieten steigen.", "Die Mieten steigen, daher ziehen viele weg."],
                ]},
                "warn": "Mirá hacia dónde apunta: después de *weil* va **la causa**; después de *deshalb*, **el efecto**. «*Ich lerne Deutsch, deshalb ich will in Wien arbeiten*» tiene dos errores: la lógica al revés y el orden. Bien: *Ich will in Wien arbeiten, deshalb lerne ich Deutsch.*",
                "q": [
                    q("Completá: *Er ist krank, ___ bleibt er zu Hause.*", "deshalb", ["deshalb", "weil", "obwohl"]),
                    q("Completá: *Er bleibt zu Hause, ___ er krank ist.*", "weil", ["weil", "deshalb", "denn"]),
                ],
            },
            {
                "h": "sodass y so … dass: de modo que, tan … que",
                "r": "*sodass* (también *so dass*) introduce una **consecuencia** como subordinada: verbo al final. Si querés subrayar la **intensidad** («tan … que»), separás: ***so*** + adjetivo o adverbio en la principal, ***dass*** en la subordinada.",
                "ex": [
                    ["Es hat stark geschneit, *sodass* die Schule geschlossen *blieb*.", "Nevó mucho, de modo que la escuela quedó cerrada."],
                    ["Er war *so* müde, *dass* er sofort *einschlief*.", "Estaba tan cansado que se durmió enseguida."],
                    ["Sie spricht *so* schnell, *dass* ich sie nicht verstehen *kann*.", "Habla tan rápido que no la puedo entender."],
                    ["Die Kurse waren *so* voll, *dass* viele warten *mussten*.", "Los cursos estaban tan llenos que muchos tuvieron que esperar."],
                ],
                "warn": "«Tan … que» es *so … dass*, no «*zu … dass*» ni «*sehr … dass*». *zu* significa «demasiado» y va con *um … zu*: *Er ist zu müde, um zu arbeiten.*",
                "q": [
                    q("Completá: *Der Kurs war ___ voll, dass viele warten mussten.*", "so", ["so", "zu", "sehr"]),
                    q("Completá: *Es regnete, sodass das Fest ___.*", "ausfiel", ["ausfiel", "fiel aus", "ausfallen"]),
                ],
            },
            {
                "h": "folglich, also, daher: el registro",
                "r": "Hay más adverbios consecutivos, todos con **verbo en 2.º lugar**. Lo que cambia es el **registro**: *also* es el de todos los días; *deshalb, deswegen, darum, daher* son neutros; *folglich* (por consiguiente) e *infolgedessen* son de texto escrito o formal.",
                "table": {"head": ["Conector", "Registro", "Ejemplo"], "rows": [
                    ["also", "coloquial, neutro", "Es ist spät, also gehen wir."],
                    ["darum / deswegen", "neutro, oral", "Ich hatte Hunger, darum habe ich gekocht."],
                    ["deshalb", "neutro (oral y escrito)", "Die Mieten steigen, deshalb ziehen viele an den Stadtrand."],
                    ["daher", "algo más formal, escrito", "Die Mieten steigen, daher ziehen viele an den Stadtrand."],
                    ["folglich", "formal, escrito", "Die Kurse sind kostenlos; folglich nehmen viele daran teil."],
                ]},
                "warn": "*also* es un falso amigo del inglés: en alemán **no** significa «también» (eso es *auch*), sino «entonces, así que, o sea».",
                "q": [
                    q("*Es ist spät, also gehen wir* significa…", "Es tarde, así que nos vamos.", ["Es tarde, así que nos vamos.", "Es tarde y también nos vamos.", "Aunque es tarde, nos vamos."]),
                    q("¿Cuál es el más formal?", "folglich", ["folglich", "also", "darum"]),
                ],
            },
            {
                "h": "Tres casilleros para el verbo",
                "r": "Todo se reduce a **tres tipos** de conector. Los de **posición 0** unen dos oraciones sin ocupar lugar: el orden sigue normal. Los **subordinantes** mandan el verbo **al final**. Los **adverbios** ocupan la posición 1, y el verbo va **detrás**; también pueden ir en el campo medio.",
                "table": {"head": ["Tipo", "Conectores", "El verbo", "Ejemplo"], "rows": [
                    ["Posición 0", "und, aber, oder, denn, sondern", "en 2.º lugar, normal", "…, denn er ist krank."],
                    ["Subordinante", "weil, da, obwohl, sodass, dass, wenn", "al final", "…, weil er krank ist."],
                    ["Adverbio", "deshalb, trotzdem, folglich, also, daher", "detrás del conector", "…, deshalb bleibt er zu Hause."],
                ]},
                "ex": [
                    ["Sie lernt Deutsch, *denn* sie *will* in Wien studieren.", "Estudia alemán, porque quiere estudiar en Viena."],
                    ["Sie lernt Deutsch, *weil* sie in Wien studieren *will*.", "Estudia alemán porque quiere estudiar en Viena."],
                    ["Sie will in Wien studieren, *deshalb lernt* sie Deutsch.", "Quiere estudiar en Viena; por eso estudia alemán."],
                    ["Sie will in Wien studieren, sie lernt *deshalb* Deutsch.", "Quiere estudiar en Viena, así que estudia alemán."],
                ],
                "warn": "*denn* y *weil* significan casi lo mismo, pero el orden no: *denn er ist krank* / *weil er krank ist*. Y *aber* no cuenta, *trotzdem* sí: *…, aber er kommt trotzdem* / *…, trotzdem kommt er*.",
                "tip": "Prueba rápida: ¿podés mover la palabra al medio de la oración (*Er bleibt deshalb zu Hause*)? Entonces es un adverbio y el verbo va detrás de ella cuando la ponés primero.",
                "q": [
                    q("¿Cuál es correcta?", "…, denn er ist krank.", ["…, denn er ist krank.", "…, denn ist er krank.", "…, denn er krank ist."]),
                    q("¿Qué tipo de conector es *trotzdem*?", "un adverbio", ["un adverbio", "un subordinante", "de posición 0"]),
                ],
            },
            {
                "h": "Argumentar sobre la convivencia",
                "r": "Con estos conectores armás argumentos sobre **sociedad y migración**: oponés un dato a otro (*obwohl, trotzdem*), explicás causas (*weil, da*) y sacás consecuencias (*deshalb, folglich, sodass*). Variar el conector hace que el texto suene de nivel B2.",
                "ex": [
                    ["Viele Zuwanderer sprechen gut Deutsch. *Trotzdem* finden sie oft keine Wohnung.", "Muchos inmigrantes hablan bien alemán. Igual muchas veces no consiguen departamento."],
                    ["*Obwohl* er seit Jahren hier lebt, hat er die Staatsangehörigkeit noch nicht beantragt.", "Aunque vive acá hace años, todavía no pidió la ciudadanía."],
                    ["Das Viertel ist sehr vielfältig, *deshalb* gibt es jedes Jahr ein Straßenfest.", "El barrio es muy diverso; por eso todos los años hay una fiesta en la calle."],
                    ["Viele haben Vorurteile, *weil* sie keine Migranten kennen.", "Muchos tienen prejuicios porque no conocen a ningún migrante."],
                    ["Die Integrationskurse sind kostenlos; *folglich* nehmen viele daran teil.", "Los cursos de integración son gratuitos; por consiguiente, muchos participan."],
                ],
                "warn": "En un texto argumentativo no repitas *aber* y *weil* en cada frase: alternalos con *trotzdem, obwohl, deshalb, folglich*. Pero ojo con el verbo cada vez que cambiás de tipo de conector.",
                "q": [
                    q("Completá: *Viele sprechen gut Deutsch. ___ finden sie keine Arbeit.*", "Trotzdem", ["Trotzdem", "Deshalb", "Obwohl"]),
                    q("Completá: *Das Viertel ist vielfältig, deshalb ___ es viele Feste.*", "gibt", ["gibt", "es gibt", "geben"]),
                ],
            },
        ],
    },
    "vocab": [
        ["die Einwanderung", "la inmigración", "Die Einwanderung hat die Stadt verändert."],
        ["der Zuwanderer", "el inmigrante", "Viele Zuwanderer besuchen einen Integrationskurs."],
        ["die Herkunft", "el origen, la procedencia", "Die Herkunft eines Menschen sagt nichts über seinen Charakter."],
        ["das Vorurteil", "el prejuicio", "Viele Vorurteile verschwinden, wenn man sich kennenlernt."],
        ["die Vielfalt", "la diversidad", "Die Vielfalt der Kulturen macht das Viertel interessant."],
        ["die Minderheit", "la minoría", "In diesem Land leben mehrere sprachliche Minderheiten."],
        ["die Staatsangehörigkeit", "la nacionalidad, la ciudadanía", "Sie hat die deutsche Staatsangehörigkeit beantragt."],
        ["die Einbürgerung", "la naturalización", "Für die Einbürgerung braucht man einen Sprachnachweis."],
        ["die Aufenthaltserlaubnis", "el permiso de residencia", "Seine Aufenthaltserlaubnis gilt zwei Jahre."],
        ["die Gleichberechtigung", "la igualdad de derechos", "Die Gleichberechtigung von Mann und Frau steht im Grundgesetz."],
        ["das Zusammenleben", "la convivencia", "Ein Straßenfest ist gut für das Zusammenleben im Viertel."],
        ["sich einleben", "adaptarse, acostumbrarse (a un lugar nuevo)", "Nach einem Jahr hat sie sich gut eingelebt."],
        ["ausgrenzen", "excluir, marginar", "Niemand sollte wegen seiner Herkunft ausgegrenzt werden."],
        ["benachteiligen", "perjudicar, discriminar", "Bei der Wohnungssuche werden Ausländer oft benachteiligt."],
        ["folglich", "por consiguiente", "Die Kurse sind kostenlos; folglich sind sie immer voll."],
    ],
    "items": [
        # parte 0 — obwohl, trotzdem, trotz
        ch(0, "Elegí el conector.", "Er arbeitet weiter, ___ er müde ist.", "obwohl", ["obwohl", "trotzdem", "trotz"], "Verbo al final (*ist*): subordinante → *obwohl*."),
        ch(0, "Elegí el conector.", "Er ist müde. ___ arbeitet er weiter.", "Trotzdem", ["Trotzdem", "Obwohl", "Trotz"], "Verbo justo detrás: adverbio → *trotzdem*."),
        ch(0, "Elegí el conector.", "___ des Regens gehen wir spazieren.", "Trotz", ["Trotz", "Trotzdem", "Obwohl"], "Sustantivo en genitivo: preposición *trotz*."),
        ch(0, "Elegí la continuación.", "Obwohl sie wenig Zeit hat, …", "… hilft sie uns.", ["… hilft sie uns.", "… sie hilft uns.", "… sie uns hilft."], "Después de la subordinada, la principal empieza con el verbo."),
        ch(0, "Elegí el orden correcto.", "(Igual vino.)", "Trotzdem ist er gekommen.", ["Trotzdem ist er gekommen.", "Trotzdem er ist gekommen.", "Trotzdem er gekommen ist."], "*trotzdem* en posición 1 → verbo conjugado detrás."),
        ch(0, "¿obwohl o auch wenn?", "___ es morgen regnet, machen wir das Fest. (no sabemos si va a llover)", "Auch wenn", ["Auch wenn", "Obwohl", "Trotzdem"], "Hipótesis, no hecho: *auch wenn*."),
        cz(0, "Escribí el conector.", "___ er seit zehn Jahren hier lebt, spricht er kaum Deutsch.", "Obwohl", note="Subordinada al principio, verbo *lebt* al final: *Obwohl*."),
        cz(0, "Escribí la forma de *haben*.", "Obwohl sie keine Zeit ___, hilft sie uns.", "hat", note="Con *obwohl*, el verbo conjugado al final."),
        cz(0, "Escribí el conector.", "Die Wohnung ist teuer. Wir nehmen sie ___.", "trotzdem", note="Adverbio en el campo medio: «igual»."),
        cz(0, "Escribí el artículo en genitivo.", "Trotz ___ Kritik hält die Regierung an dem Plan fest.", "der", note="*die Kritik* → genitivo *der Kritik*."),
        cz(0, "Escribí la forma de *sein* en pasado.", "Er ging zur Arbeit, obwohl er krank ___.", "war", note="Präteritum de *sein*, al final por *obwohl*."),
        tr(0, "Aunque está cansada, trabaja.", "Obwohl sie müde ist, arbeitet sie.", _nc("Obwohl sie müde ist, arbeitet sie.", "Sie arbeitet, obwohl sie müde ist."), "Verbo al final en la subordinada; verbo, coma, verbo."),
        tr(0, "Llueve. Igual vamos a pasear.", "Es regnet. Trotzdem gehen wir spazieren.", _nc("Es regnet. Trotzdem gehen wir spazieren.", "Es regnet, trotzdem gehen wir spazieren.", "Es regnet. Wir gehen trotzdem spazieren.", "Es regnet, wir gehen trotzdem spazieren.", "Es regnet, aber wir gehen trotzdem spazieren."), "*trotzdem* en posición 1 → verbo detrás."),
        tr(0, "A pesar de la lluvia jugamos al fútbol.", "Trotz des Regens spielen wir Fußball.", ["Trotz des Regens spielen wir Fußball.", "Wir spielen trotz des Regens Fußball."], "*trotz* + genitivo: *des Regens*."),
        ty(0, "Uní las dos oraciones con *obwohl* (empezá con *Ich*).", "Ich gehe zur Arbeit. Ich bin krank.", "Ich gehe zur Arbeit, obwohl ich krank bin.", _nc("Ich gehe zur Arbeit, obwohl ich krank bin."), "*obwohl* + verbo al final: *bin*."),
        # parte 1 — causa y consecuencia
        ch(1, "Elegí el conector.", "Er ist krank, ___ bleibt er zu Hause.", "deshalb", ["deshalb", "weil", "obwohl"], "Consecuencia + verbo detrás: *deshalb*."),
        ch(1, "Elegí el conector.", "Er bleibt zu Hause, ___ er krank ist.", "weil", ["weil", "deshalb", "denn"], "Causa con verbo al final: *weil*. (*denn* pediría *denn er ist krank*.)"),
        ch(1, "Elegí el conector.", "Es hat stark geschneit, ___ die Schule geschlossen blieb.", "sodass", ["sodass", "deshalb", "obwohl"], "Verbo al final y consecuencia: *sodass*."),
        ch(1, "Elegí la palabra.", "Der Kurs war ___ voll, dass viele warten mussten.", "so", ["so", "zu", "sehr"], "«Tan … que» = *so … dass*."),
        ch(1, "¿Cuál es el más formal?", "«por consiguiente»", "folglich", ["folglich", "also", "darum"], "*folglich* es de registro escrito y formal."),
        ch(1, "Elegí la continuación.", "Ich habe den Bus verpasst, …", "… deshalb bin ich zu spät gekommen.", ["… deshalb bin ich zu spät gekommen.", "… deshalb ich bin zu spät gekommen.", "… deshalb ich zu spät gekommen bin."], "*deshalb* + verbo conjugado + sujeto."),
        ch(1, "¿Qué significa *also*?", "Es ist schon spät, also gehen wir.", "entonces, así que", ["entonces, así que", "también", "sin embargo"], "*also* ≠ inglés *also*: «también» es *auch*."),
        cz(1, "Escribí un conector de consecuencia.", "Die Mieten sind gestiegen, ___ ziehen viele Familien an den Stadtrand.", "deshalb", ["deshalb", "deswegen", "darum", "daher", "folglich", "also"], "Adverbio + verbo detrás (*ziehen*)."),
        cz(1, "Escribí la forma de *können*.", "Sie spricht so schnell, dass ich sie nicht verstehen ___.", "kann", note="*dass* → verbo conjugado al final, detrás del infinitivo."),
        cz(1, "Escribí la palabra que falta.", "Er war ___ müde, dass er sofort einschlief.", "so", note="*so* + adjetivo … *dass*."),
        cz(1, "Escribí el conector de causa.", "___ der Zug Verspätung hatte, kamen wir zu spät.", "Weil", ["Weil", "Da"], "Causa con verbo al final; al comienzo, *da* suena más formal."),
        cz(1, "Escribí el conector.", "Es regnete stark, ___ das Konzert abgesagt wurde.", "sodass", ["sodass", "so dass"], "Consecuencia en subordinada: *sodass* (o *so dass*)."),
        tr(1, "Está enfermo, por eso se queda en casa.", "Er ist krank, deshalb bleibt er zu Hause.", _nc("Er ist krank, deshalb bleibt er zu Hause.", "Er ist krank, deswegen bleibt er zu Hause.", "Er ist krank, darum bleibt er zu Hause.", "Er ist krank, daher bleibt er zu Hause.", "Er ist krank. Deshalb bleibt er zu Hause.", "Er ist krank. Deswegen bleibt er zu Hause.", "Er ist krank, er bleibt deshalb zu Hause."), "*deshalb* + verbo + sujeto."),
        tr(1, "Estaba tan cansado que se durmió enseguida.", "Er war so müde, dass er sofort einschlief.", _nc("Er war so müde, dass er sofort einschlief.", "Er war so müde, dass er sofort eingeschlafen ist.", "Er war so müde, dass er gleich einschlief.", "Er war so müde, dass er gleich eingeschlafen ist."), "*so … dass*, con el verbo al final."),
        ty(1, "Reescribí con *deshalb* (empezá con *Ich will*).", "Ich lerne Deutsch, weil ich in Wien arbeiten will.", "Ich will in Wien arbeiten, deshalb lerne ich Deutsch.", _nc("Ich will in Wien arbeiten, deshalb lerne ich Deutsch.", "Ich will in Wien arbeiten. Deshalb lerne ich Deutsch.", "Ich will in Wien arbeiten, deswegen lerne ich Deutsch.", "Ich will in Wien arbeiten, darum lerne ich Deutsch.", "Ich will in Wien arbeiten, daher lerne ich Deutsch."), "La causa pasa adelante; *deshalb* presenta la consecuencia."),
        # parte 2 — el verbo según el conector
        ch(2, "¿Cuál es correcta?", "(… porque está enfermo.)", "…, denn er ist krank.", ["…, denn er ist krank.", "…, denn ist er krank.", "…, denn er krank ist."], "*denn* es de posición 0: orden normal."),
        ch(2, "¿Cuál es correcta?", "(… pero igual viene.)", "…, aber er kommt trotzdem.", ["…, aber er kommt trotzdem.", "…, aber kommt er trotzdem.", "…, aber trotzdem er kommt."], "*aber* no cuenta; *trotzdem* puede ir en el campo medio."),
        ch(2, "¿Qué tipo de conector es?", "folglich", "un adverbio: verbo detrás", ["un adverbio: verbo detrás", "un subordinante: verbo al final", "de posición 0: no cuenta"], "Como *deshalb*: *Folglich nehmen viele teil.*"),
        ch(2, "Elegí el conector.", "Viele Zuwanderer sprechen gut Deutsch. ___ finden sie oft keine Wohnung.", "Trotzdem", ["Trotzdem", "Deshalb", "Obwohl"], "El dato contradice lo esperable: *trotzdem*."),
        ch(2, "Elegí el conector.", "Das Viertel ist sehr vielfältig, ___ gibt es jedes Jahr ein Straßenfest.", "deshalb", ["deshalb", "trotzdem", "obwohl"], "Consecuencia lógica: *deshalb*."),
        ch(2, "Elegí la oración correcta.", "(Como todavía no tiene la ciudadanía, no puede votar.)", "Da sie die Staatsangehörigkeit noch nicht hat, darf sie nicht wählen.", ["Da sie die Staatsangehörigkeit noch nicht hat, darf sie nicht wählen.", "Da sie hat die Staatsangehörigkeit noch nicht, darf sie nicht wählen.", "Da sie die Staatsangehörigkeit noch nicht hat, sie darf nicht wählen."], "*da* = verbo al final; después, verbo, coma, verbo."),
        cz(2, "Escribí la forma de *kennen*.", "Viele haben Vorurteile, weil sie keine Migranten ___.", "kennen", note="*weil* → verbo al final."),
        cz(2, "Escribí la forma de *leben*.", "Obwohl er seit Jahren hier ___, fühlt er sich noch fremd.", "lebt", note="*seit* + presente (semana 20); *obwohl* → verbo al final."),
        cz(2, "Escribí la forma de *vermissen*.", "Sie hat sich gut eingelebt, trotzdem ___ sie ihre Familie sehr.", "vermisst", note="*trotzdem* + verbo + sujeto."),
        cz(2, "Escribí un conector de consecuencia formal.", "Die Integrationskurse sind kostenlos; ___ nehmen viele Menschen daran teil.", "folglich", ["folglich", "deshalb", "deswegen", "daher", "darum", "infolgedessen"], "Adverbio + verbo detrás (*nehmen*)."),
        cz(2, "Escribí el conector de posición 0.", "Sie lernt jeden Tag Deutsch, ___ sie will in Wien studieren.", "denn", note="Orden normal (*sie will*): es *denn*, no *weil*."),
        tr(2, "Aunque vive acá hace años, no tiene la ciudadanía.", "Obwohl er seit Jahren hier lebt, hat er die Staatsangehörigkeit nicht.", _nc("Obwohl er seit Jahren hier lebt, hat er die Staatsangehörigkeit nicht.", "Obwohl sie seit Jahren hier lebt, hat sie die Staatsangehörigkeit nicht.", "Obwohl er seit Jahren hier lebt, hat er nicht die Staatsangehörigkeit.", "Obwohl sie seit Jahren hier lebt, hat sie nicht die Staatsangehörigkeit.", "Obwohl er schon seit Jahren hier lebt, hat er die Staatsangehörigkeit nicht.", "Obwohl sie schon seit Jahren hier lebt, hat sie die Staatsangehörigkeit nicht.", "Er hat die Staatsangehörigkeit nicht, obwohl er seit Jahren hier lebt.", "Sie hat die Staatsangehörigkeit nicht, obwohl sie seit Jahren hier lebt."), "*seit* + presente; *obwohl* + verbo al final."),
        tr(2, "Muchos tienen prejuicios porque no conocen a ningún migrante.", "Viele haben Vorurteile, weil sie keine Migranten kennen.", _nc("Viele haben Vorurteile, weil sie keine Migranten kennen.", "Viele Menschen haben Vorurteile, weil sie keine Migranten kennen.", "Viele haben Vorurteile, weil sie keine Migrantinnen und Migranten kennen.", "Viele haben Vorurteile, denn sie kennen keine Migranten.", "Viele haben Vorurteile, weil sie keinen Migranten kennen.", "Viele Menschen haben Vorurteile, weil sie keinen Migranten kennen.", "Viele haben Vorurteile, denn sie kennen keinen Migranten."), "*weil* + verbo al final; «ningún» = *keine*."),
        ty(2, "Escribí en alemán, con artículo.", "«el prejuicio»", "das Vorurteil", note="*vor* + *das Urteil* (el juicio). " + MAY),
        li(2, "Staatsangehörigkeit", ["Staatsangehörigkeit", "Selbstständigkeit", "Gleichberechtigung"], "*die Staatsangehörigkeit* = la nacionalidad."),
    ],
}
