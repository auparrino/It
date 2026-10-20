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


MAY = "La app no corrige mayúsculas, pero en alemán los sustantivos van siempre con mayúscula."
