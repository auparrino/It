# -*- coding: utf-8 -*-
"""«Ya puedo…»: copia a cada semana del curso sus objetivos (`can`).

Cada idioma escribe los suyos en tools/<código>/can.py (CAN = {semana:
[(texto, [ids]), …]}): tres o cuatro acciones por semana, cada una atada a
uno o dos ítems de esa semana.  Este módulo no nombra ningún idioma: lo
llaman los tres build_course.py justo antes de escribir course.json,

    import puedo
    problemas += puedo.attach(course, can.CAN)

y deja en cada semana

    "can": [{"t": "Pedir con cortesía…", "items": ["mj-20-10", "g2-va-53"]}, …]

Un id vale si está en la lista de ítems de esa semana; en la última semana
(el examen final), también si es de una semana anterior.  Un id que ya no
vale se descarta con aviso (el objetivo queda, y si se queda sin ítems la
app no lo prueba).  Lo lee docs/js/puedo.js; test: tools/lib/test_puedo.js.
"""


def attach(course, can):
    weeks = course.get("weeks") or []
    known = {it["id"] for it in course.get("items") or []}
    first = {}
    for w in weeks:
        for iid in w.get("items") or []:
            first.setdefault(iid, w["week"])
    last = max((w["week"] for w in weeks), default=0)
    problems = []
    for w in weeks:
        out = []
        own = set(w.get("items") or [])
        for text, ids in can.get(w["week"], []):
            ok = []
            for iid in ids:
                if iid in own or (w["week"] == last and iid in known and first.get(iid, last + 1) <= last):
                    ok.append(iid)
                else:
                    problems.append("«ya puedo», semana %d: %s ya no está en la semana (%s)" % (w["week"], iid, text))
            out.append({"t": text, "items": ok})
        if out:
            w["can"] = out
        elif "can" in w:
            del w["can"]
    return problems
