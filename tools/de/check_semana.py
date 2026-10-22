# -*- coding: utf-8 -*-
"""Revisa semanas del curso de alemán antes de compilar (las mismas reglas que
tools/de/test_curso.js, más algunas de estilo), sin tocar docs/.

Run: python3 tools/de/check_semana.py            (todas)
     python3 tools/de/check_semana.py 7 8 9      (solo esas semanas)
"""
import os
import re
import sys
import unicodedata

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
if sys.argv[1:]:
    os.environ["DE_SEMANAS"] = ",".join(sys.argv[1:])      # no carga las que se están escribiendo
import curso  # noqa: E402

TYPES = {"choice", "cloze", "translate", "listen", "typed", "fixerr", "dictation"}
SPANISH = re.compile(r"[ñáéíóú¿¡]", re.I)
LEVELS = {"A1", "A2", "B1", "B2", "C1"}


def nfc(s):
    return not isinstance(s, str) or s == unicodedata.normalize("NFC", s)


def check(w, errs):
    n = w.get("week")
    tag = "semana %s" % n

    def bad(msg):
        errs.append("%s: %s" % (tag, msg))

    for key in ("title", "level", "focus", "fare", "tema"):
        if not w.get(key):
            bad("falta %r" % key)
    if w.get("level") not in LEVELS:
        bad("nivel %r" % w.get("level"))
    if len(w.get("keys", [])) < 3:
        bad("menos de 3 claves")
    lesson = w.get("lesson", {})
    bl = lesson.get("blocks", [])
    parts = lesson.get("parts", [])
    if not lesson.get("intro"):
        bad("la lección no tiene intro")
    seen = {}
    for p in parts:
        if not p.get("h"):
            bad("parte sin título")
        for i in p.get("blocks", []):
            if i >= len(bl) or i in seen:
                bad("bloque %d repetido o inexistente" % i)
            seen[i] = 1
    if len(seen) != len(bl):
        bad("hay bloques fuera de las partes")
    for i, b in enumerate(bl):
        if not (b.get("h") and b.get("r")):
            bad("bloque %d sin título o regla" % i)
        if len(b.get("q", [])) < 1:
            bad("bloque %d sin chequeo (q)" % i)
        for qq in b.get("q", []) + b.get("qq", []):
            o = qq["options"]
            if qq["answer"] not in o or len(set(o)) != len(o):
                bad("bloque %d: chequeo %r" % (i, qq["prompt"]))
        t = b.get("table")
        if t:
            for r in t["rows"]:
                if len(r) != len(t["head"]):
                    bad("bloque %d: fila de tabla de otro largo %r" % (i, r))
        for e in b.get("ex", []):
            if len(e) != 2:
                bad("bloque %d: ejemplo que no es [alemán, castellano] %r" % (i, e))
    items = w.get("items", [])
    if len(items) < 30:
        bad("ejercicios: %d (mínimo 30)" % len(items))
    per = {}
    for k, it in enumerate(items, 1):
        t = "ejercicio %d" % k
        per[it.get("part", 0)] = per.get(it.get("part", 0), 0) + 1
        if it["type"] not in TYPES:
            bad("%s: tipo %r" % (t, it["type"]))
        if not (it.get("prompt") and it.get("stem") and it.get("answer")):
            bad("%s: prompt, stem y answer" % t)
        if it.get("part", 0) >= len(parts):
            bad("%s: parte %r inexistente" % (t, it.get("part")))
        if it.get("options"):
            o = it["options"]
            if it["answer"] not in o:
                bad("%s: la respuesta no está entre las opciones" % t)
            if len({x.lower() for x in o}) != len(o):
                bad("%s: opciones repetidas sin mirar mayúsculas %r" % (t, o))
        if it["type"] == "cloze" and not re.search(r"_{3,}", it["stem"]):
            bad("%s: hueco sin ___" % t)
        if it["type"] == "fixerr":
            if not it.get("bad") or it["stem"].count(it["bad"]) != 1 or not it.get("cat"):
                bad("%s: encontrá el error sin «bad» (una sola vez en el stem) o sin categoría" % t)
        if it["type"] == "dictation" and SPANISH.search(it["stem"]):
            bad("%s: dictado que no es en alemán" % t)
        if it["type"] in ("translate", "typed", "cloze", "fixerr", "dictation"):
            for a in it.get("accept", []):
                if SPANISH.search(a):
                    bad("%s: respuesta escrita con letras del castellano %r" % (t, a))
        if it["type"] == "listen" and SPANISH.search(it["stem"]):
            bad("%s: escucha que no es en alemán" % t)
        for s in [it.get("stem"), it.get("answer"), it.get("note")] + list(it.get("options") or []) + list(it.get("accept") or []):
            if not nfc(s):
                bad("%s: no está en NFC %r" % (t, s))
    for pk in range(len(parts)):
        if not per.get(pk):
            bad("la parte %d no tiene ejercicios" % pk)
    voc = w.get("vocab", [])
    if len(voc) < 8:
        bad("vocabulario: %d (mínimo 8)" % len(voc))
    for v in voc:
        if len(v) < 2 or not v[0] or not v[1]:
            bad("palabra incompleta %r" % (v,))
            continue
        if SPANISH.search(v[0]) or (len(v) > 2 and SPANISH.search(v[2] or "")):
            bad("palabra o ejemplo con letras del castellano %r" % (v,))
        if re.match(r"^(der|die|das) ", v[0]) and not re.match(r"^(der|die|das) [A-ZÄÖÜ]", v[0]):
            bad("sustantivo sin mayúscula %r" % v[0])


def main():
    only = {int(a) for a in sys.argv[1:]}
    errs, words, nums = [], {}, []
    for w in curso.WEEKS:
        nums.append(w["week"])
        for v in w.get("vocab", []):
            if v and v[0] in words and (not only or w["week"] in only or words[v[0]] in only):
                errs.append("semana %d: «%s» ya estaba en la semana %d" % (w["week"], v[0], words[v[0]]))
            words.setdefault(v[0], w["week"])
        if not only or w["week"] in only:
            check(w, errs)
    if not only and nums != list(range(1, len(nums) + 1)):
        errs.append("semanas fuera de orden o salteadas: %s" % nums)
    for e in errs:
        print(e)
    print("%s: %d problema(s)" % ("OK" if not errs else "MAL", len(errs)))
    sys.exit(1 if errs else 0)


if __name__ == "__main__":
    main()
