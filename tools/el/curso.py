# -*- coding: utf-8 -*-
"""Curso de griego moderno para hispanohablantes rioplatenses.

Datos puros: SEASONS y WEEKS.  Cada semana está en su archivo de
tools/el/semanas/ (sNN.py, con su WEEK).  Los ejercicios se arman con las
funciones chicas de base.py (q, ch, cz, tr, li, ty, fx, di), que devuelven
dicts con el esquema del curso.  El temario, con sus fuentes, está en
TEMARIO.md.

Por ahora está la primera temporada (13 semanas, del alfabeto a A2); las
otras tres están planeadas en el temario.
"""
import importlib
import os
import re
import sys


SEASONS = [
    {"n": 1, "name": "Το λιμάνι", "weeks": [1, 13], "level": "A1 → A2",
     "blurb": "El puerto: leer y escribir el alfabeto, saludar, presentarte, nombrar cosas con su artículo, "
              "pedir en el café, moverte por la ciudad, decir la hora, hablar de tu familia y de tu día, "
              "hacer planes y contar lo que hiciste ayer."},
]
SEASON = SEASONS[0]

# Nombres de persona y de lugar: se escriben sin que una lección los «enseñe»
# (tools/lib/vocab_norma.py los da por conocidos).
NOMBRES = """Μαρία Ελένη Άννα Κατερίνα Σοφία Δήμητρα Νίκος Γιώργος Γιάννης Κώστας Πέτρος Δημήτρης Αλέξης Μαρτίν Λουκία
Παπαδόπουλος Παπαδοπούλου Αθήνα Θεσσαλονίκη Κρήτη Σαντορίνη Νάξος Πάρος Μύκονος Ρόδος Κέρκυρα Πειραιάς
Μπουένος Άιρες Μαδρίτη""".split()

WEEKS = []

_SEM = os.path.join(os.path.dirname(os.path.abspath(__file__)), "semanas")
if _SEM not in sys.path:
    sys.path.insert(0, _SEM)
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
# EL_SEMANAS=7,8 carga solo esas (check_semana.py, mientras se escriben otras)
_SOLO = {"s%02d.py" % int(x) for x in os.environ.get("EL_SEMANAS", "").split(",") if x.strip()}
for _f in sorted(os.listdir(_SEM)) if os.path.isdir(_SEM) else []:
    if re.match(r"^s\d\d\.py$", _f) and (not _SOLO or _f in _SOLO):
        WEEKS.append(importlib.import_module(_f[:-3]).WEEK)
WEEKS.sort(key=lambda w: w["week"])
