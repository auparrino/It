#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Controlla le lezioni senza ricompilare il corso.

    python3 tools/check_lessons.py              tutte
    python3 tools/check_lessons.py s1           solo tools/lessons/s1.py

Per ogni settimana: formato (regola corta, limiti di parole, tabelle) e gli
esempi italiani che usano tempi o costruzioni che arrivano più avanti
(tools/sillabo.py).  I blocchi il cui titolo comincia con «Adelanto» possono
anticipare.
"""
import importlib.util
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import build_course  # noqa: E402
import sillabo       # noqa: E402


def main():
    only = sys.argv[1] if len(sys.argv) > 1 else None
    folder = os.path.join(HERE, "lessons")
    problems = []
    for fn in sorted(os.listdir(folder)):
        if not fn.endswith(".py") or fn == "__init__.py":
            continue
        if only and fn[:-3] != only:
            continue
        spec = importlib.util.spec_from_file_location(fn[:-3], os.path.join(folder, fn))
        mod = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(mod)
        for week, lesson in sorted(mod.LESSONS.items()):
            problems += build_course.check_lesson(week, lesson)
            for i, b in enumerate(lesson.get("blocks", []), 1):
                if (b.get("h") or "").startswith("Adelanto"):
                    continue
                for pair in b.get("ex", []):
                    feats = sillabo.analyze(re.sub(r"\*", "", pair[0]))
                    late = {k: v for k, v in feats.items() if v > week}
                    if late:
                        problems.append("settimana %s blocco %d: «%s» usa %s"
                                        % (week, i, pair[0], late))
    for p in problems:
        print(p)
    print("problemi: %d" % len(problems))
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
