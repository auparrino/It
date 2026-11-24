# -*- coding: utf-8 -*-
"""Revisa semanas del curso de griego antes de compilar (las mismas reglas que
tools/el/test_curso.js, más las de la escritura griega), sin tocar docs/.

Lo propio del griego:
  - ninguna palabra mezcla letras latinas y griegas (la «o» latina dentro de
    una palabra griega no se ve y rompe la corrección);
  - lo que el alumno escribe en griego va solo en letras griegas;
  - cada palabra de dos sílabas o más lleva su acento (y una sola vez, salvo
    el segundo acento de «το όνομά μου»);
  - la sigma final es ς y la de adentro σ; la pregunta termina en «;», no «?»;
  - nada de griego politónico.

Run: python3 tools/el/check_semana.py            (todas)
     python3 tools/el/check_semana.py 7 8 9      (solo esas semanas)
"""
import os
import re
import sys
import unicodedata

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
if sys.argv[1:]:
    os.environ["EL_SEMANAS"] = ",".join(sys.argv[1:])      # no carga las que se están escribiendo
import curso  # noqa: E402

TYPES = {"choice", "cloze", "translate", "listen", "typed", "fixerr", "dictation"}
SPANISH = re.compile(r"[A-Za-zñáéíóú¿¡]")          # lo que el alumno escribe en griego no lleva ninguna letra latina
GREEK = re.compile(r"[\u0370-\u03ff]")
GWORD = re.compile(r"[\u0370-\u03ff\u1f00-\u1fff]+")
MIXED = re.compile(r"[A-Za-zÀ-ÿ][\u0370-\u03ff]|[\u0370-\u03ff][A-Za-zÀ-ÿ]")
# sin acento aunque parezcan de dos sílabas (la ι es una semivocal)
NO_ACCENT = set("για μια δυο πια γεια ποιος ποια ποιο ποιοι ποιες ποιον ποιους ποιου ποιας ποιων γιος γιο πιο πιω πιεις πιει μιας μιαν".split())
VOW = "αεηιουω"


def strip(s):
    return "".join(c for c in unicodedata.normalize("NFD", s) if unicodedata.category(c) != "Mn")


def syllables(word):
    """Cuántas sílabas tiene, más o menos: los dígrafos son una vocal."""
    d = unicodedata.normalize("NFD", word.lower())
    # las vocales con diéresis no forman dígrafo: se marcan aparte
    out, i, n = [], 0, 0
    chars = []
    while i < len(d):
        c = d[i]
        marks = ""
        j = i + 1
        while j < len(d) and unicodedata.category(d[j]) == "Mn":
            marks += d[j]
            j += 1
        chars.append((c, "\u0308" in marks, "\u0301" in marks))
        i = j
    k = 0
    while k < len(chars):
        c, dia, acc = chars[k]
        if c in VOW:
            nxt = chars[k + 1] if k + 1 < len(chars) else None
            if nxt and not nxt[1] and not acc and c + nxt[0] in ("ου", "αι", "ει", "οι", "υι", "αυ", "ευ", "ηυ"):
                k += 1
            n += 1
        k += 1
    return n


def greek_problems(text):
    """Lo que está mal escrito en un texto con griego."""
    out = []
    s = str(text or "")
    if MIXED.search(s.replace("*", "")):
        out.append("mezcla letras latinas y griegas en una palabra")
    if re.search(r"[\u1f00-\u1fff]", s):
        out.append("griego politónico")
    if "¿" not in s and re.search(r"[\u0370-\u03ff]\*?\s?\?", s):
        out.append("pregunta griega con «?» (va «;»)")
    for wd in GWORD.findall(s.replace("*", "")):
        if len(wd) == 1 or wd.isupper():
            continue
        if re.search(r"σ$", wd) or re.search(r"ς.", wd):
            out.append("sigma final mal en «%s»" % wd)
        acc = sum(1 for c in unicodedata.normalize("NFD", wd) if c == "\u0301")
        if acc > 2:
            out.append("más de dos acentos en «%s»" % wd)
        low = wd.lower()
        if acc == 0 and syllables(wd) >= 2 and low not in NO_ACCENT:
            # ι / υ / ει / οι sin acento delante de vocal: una sola sílaba (παιδιά, but «μια»)
            glide = re.sub(r"(?:ει|οι|ι|υ)(?=[αεοωου])", "", strip(low))
            if syllables(glide) >= 2:
                out.append("falta el acento en «%s»" % wd)
    return out
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
                bad("bloque %d: ejemplo que no es [griego, castellano] %r" % (i, e))
        # el griego de la lección: sin partes de palabra (-ος, μιλ-) ni letras sueltas
        texts = [b.get("r"), b.get("warn"), b.get("tip")] + list(b.get("more") or []) + [x for e in b.get("ex", []) for x in e]
        for r in (t or {}).get("rows", []) if t else []:
            texts += list(r)
        for x in texts:
            for p in greek_problems(re.sub(r"-[\u0370-\u03ff]+|[\u0370-\u03ff]+-", " ", str(x or ""))):
                # la regla, el aviso y el atajo pueden citar la forma mal escrita
                if x in (b.get("warn"), b.get("tip"), b.get("r")) + tuple(b.get("more") or ()) and "latinas" not in p and "politónico" not in p:
                    continue
                bad("bloque %d: %s en %r" % (i, p, str(x)[:70]))
        for qq in b.get("q", []) + b.get("qq", []):
            for x in [qq.get("prompt"), qq.get("stem"), qq.get("answer")] + list(qq.get("options") or []):
                for p in greek_problems(str(x or "")):
                    if "latinas" in p or "politónico" in p:
                        bad("bloque %d: %s en %r" % (i, p, str(x)[:70]))
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
            bad("%s: dictado que no es en griego" % t)
        if it["type"] in ("translate", "typed", "cloze", "fixerr", "dictation"):
            for a in it.get("accept", []):
                if SPANISH.search(a):
                    bad("%s: respuesta escrita con letras latinas %r" % (t, a))
        if it["type"] == "listen" and SPANISH.search(it["stem"]):
            bad("%s: escucha que no es en griego" % t)
        # lo que se da por bueno se revisa entero; un distractor, el error de un
        # «encontrá el error» y una nota pueden traer a propósito una forma mal
        # escrita (sin acento, con otra sigma): ahí solo las letras latinas coladas
        full = [it.get("prompt"), it.get("answer")] + list(it.get("accept") or []) + ([] if it["type"] == "fixerr" else [it.get("stem")])
        loose = [it.get("note"), it.get("stem")] + list(it.get("options") or [])
        for x in full:
            # una palabra con hueco (καλημ___) o una terminación (-ος) no es una palabra entera
            for p in greek_problems(re.sub(r"[\u0370-\u03ff]*_{2,}[\u0370-\u03ff]*|-[\u0370-\u03ff]+|[\u0370-\u03ff]+-", " ", str(x or ""))):
                bad("%s: %s en %r" % (t, p, str(x)[:70]))
        for x in loose:
            for p in greek_problems(str(x or "")):
                if "latinas" in p or "politónico" in p:
                    bad("%s: %s en %r" % (t, p, str(x)[:70]))
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
            bad("palabra o ejemplo con letras latinas %r" % (v,))
        if GREEK.search(v[1]):
            bad("la glosa tiene que ir en castellano %r" % (v,))
        for x in v[:3]:
            for p in greek_problems(x):
                bad("palabra %r: %s" % (v[0], p))


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
