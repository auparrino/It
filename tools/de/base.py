# -*- coding: utf-8 -*-
"""Las funciones chicas con que se arman los ejercicios del curso de alemán.

Las usan tools/de/curso.py (semanas 1-6) y cada semana de tools/de/semanas/:
q (chequeo de la lección), ch (opción múltiple), cz (hueco), tr (traducir al
alemán), li (escuchar) y ty (escribir).
"""


def q(prompt, answer, options, stem=None):
    d = {"prompt": prompt, "answer": answer, "options": list(options)}
    if stem:
        d["stem"] = stem
    return d


def _acc(answer, accept):
    acc = list(accept or [])
    if answer not in acc:
        acc.insert(0, answer)
    return acc


def ch(part, prompt, stem, answer, options, note=""):
    return {"type": "choice", "part": part, "prompt": prompt, "stem": stem,
            "answer": answer, "options": list(options), "note": note}


def li(part, word, options, note=""):
    return {"type": "listen", "part": part, "prompt": "Escuchá: ¿qué palabra dice?",
            "stem": word, "answer": word, "options": list(options), "note": note}


def cz(part, prompt, stem, answer, accept=None, note=""):
    return {"type": "cloze", "part": part, "prompt": prompt, "stem": stem,
            "answer": answer, "accept": _acc(answer, accept), "note": note}


def tr(part, stem, answer, accept=None, note=""):
    return {"type": "translate", "part": part, "prompt": "Traducí al alemán.", "stem": stem,
            "answer": answer, "accept": _acc(answer, accept), "note": note}


def ty(part, prompt, stem, answer, accept=None, note=""):
    return {"type": "typed", "part": part, "prompt": prompt, "stem": stem,
            "answer": answer, "accept": _acc(answer, accept), "note": note}


def fx(part, stem, bad, good, cat, note, accept=None):
    """Encontrá el error: stem con una sola palabra (o grupo) mal, bad; good la
    corrige (None: sobra).  La respuesta es la oración corregida."""
    answer = stem.replace(bad, good, 1) if good is not None else " ".join(stem.replace(bad, "", 1).split())
    return {"type": "fixerr", "part": part, "prompt": "Encontrá el error: tocá la palabra que está mal y corregila.",
            "stem": stem, "answer": answer, "accept": _acc(answer, accept), "bad": bad, "good": good,
            "cat": cat, "note": note}


def di(part, sentence, accept=None, note=""):
    """Dictado: se escucha la oración y se escribe entera (las terminaciones
    que el hispanohablante no oye: -em/-en/-er, ein/einen)."""
    return {"type": "dictation", "part": part, "prompt": "Dictado: escuchá y escribí lo que oís.",
            "stem": sentence, "answer": sentence, "accept": _acc(sentence, accept), "note": note}


MAY = "La app no corrige mayúsculas, pero en alemán los sustantivos van siempre con mayúscula."
