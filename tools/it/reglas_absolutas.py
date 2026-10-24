#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Alarma de reglas absolutas (Tanda 4, auditorias/PLAN-2026-10-propuestas.md).

Una regla falsa que los propios ítems contradicen («el italiano no
diptonga» con *tieni* en la misma semana, «no se dice ho ritardo») le enseña
al alumno a desconfiar de la lección.  build_course.py llama a check() y
avisa, sin frenar el build:

- fuerte: un «✗ forma» de una nota o de la lección cuya forma el curso
  acepta como respuesta en otro ítem (la nota dice que está mal y otro
  ejercicio la da por buena);
- para revisar a mano: cuántas notas y bloques dicen «nunca» o «no se
  dice», por semana.

    python3 tools/it/reglas_absolutas.py      sobre docs/lang/it/data/course.json
"""
import json
import os
import re
import sys

ABS = re.compile(r"\bnunca\b|\bno se dice\b", re.I)
# ✗ seguido de la forma: «✗ho ritardo», «✗ *Stare di moda*», «✗«piacce»»
CROSS = re.compile(r"✗\s*[«*\"]*\s*([^»*\".,;:()!?\n]+)")


def _norm(s):
    return re.sub(r"\s+", " ", (s or "").replace("’", "'")).strip(" .?!¡¿").lower()


def _lesson_texts(lesson):
    for i, b in enumerate((lesson or {}).get("blocks") or [], 1):
        parts = [b.get("r") or "", b.get("warn") or "", b.get("tip") or ""] + list(b.get("more") or [])
        yield "bloque %d «%s»" % (i, b.get("h", "")), " ".join(parts)


def check(course):
    """(fuertes, por_semana): fuertes = [(dónde, forma)], por_semana =
    {semana: cantidad de «nunca» / «no se dice»}."""
    items = course.get("items") or []
    accepted = {}
    for it in items:
        for a in it.get("accept") or [it.get("answer")]:
            if a:
                accepted.setdefault(_norm(a), it["id"])
    week_of = {}
    for w in course.get("weeks") or []:
        for iid in (w.get("items") or []) + (w.get("extra") or []):
            week_of.setdefault(iid, w["week"])
    strong, weak = [], {}

    def look(where, week, text, own_id=None):
        if ABS.search(text):
            weak[week] = weak.get(week, 0) + 1
        for m in CROSS.finditer(text):
            form = _norm(m.group(1))
            # una palabra suelta («dare», «l'ho») es respuesta de muchos
            # ejercicios por otras razones: solo cuentan las formas de dos o
            # más palabras que otro ítem acepta enteras
            other = accepted.get(form)
            if other and other != own_id and " " in form:
                strong.append((where, form, other))

    for it in items:
        look(it["id"], week_of.get(it["id"], 0), it.get("note") or "", it["id"])
    for w in course.get("weeks") or []:
        for where, text in _lesson_texts(w.get("lesson")):
            look("semana %d %s" % (w["week"], where), w["week"], text)
    return strong, weak


def report(course, limit=15):
    strong, weak = check(course)
    lines = []
    if strong:
        lines.append("reglas absolutas: %d «✗» que otro ejercicio acepta:" % len(strong))
        lines += ["  - %s: ✗%s (aceptado en %s)" % s for s in strong[:limit]]
    n = sum(weak.values())
    if n:
        top = sorted(weak.items(), key=lambda kv: -kv[1])[:5]
        lines.append("reglas absolutas: %d notas o bloques con «nunca» / «no se dice» (revisar; más en las semanas %s)"
                     % (n, ", ".join("%d (%d)" % kv for kv in top)))
    return lines


if __name__ == "__main__":
    here = os.path.dirname(os.path.abspath(__file__))
    path = sys.argv[1] if len(sys.argv) > 1 else os.path.join(here, "..", "..", "docs", "lang", "it", "data", "course.json")
    with open(path, encoding="utf-8") as fh:
        for line in report(json.load(fh), limit=200):
            print(line)
