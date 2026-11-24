# -*- coding: utf-8 -*-
"""«Ya puedo…»: lo que tenés que poder hacer al final de cada semana.

Tres o cuatro objetivos por semana, escritos como acciones, cada uno atado a
uno o dos ítems de esa misma semana (sus ids en course.json).  Cada semana
los trae en su archivo (WEEK["can"]: [(texto, [números de ejercicio])], con
el número de orden del ejercicio en la semana, desde 1); acá se pasan a ids.

build_course.py lo copia a cada semana como `can: [{t, items}]` y descarta
(con aviso) los ids que ya no estén en la semana.  Test:
tools/lib/test_puedo.js.
"""
import curso

CAN = {
    w["week"]: [(t, ["el%02d-%03d" % (w["week"], k) for k in nums[:2]]) for t, nums in w.get("can", [])]
    for w in curso.WEEKS
}
