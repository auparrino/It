#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Reglas absolutas del portugués (Tanda 4, auditorias/PLAN-2026-10-propuestas.md,
«pt semanas 27-39: corregir las reglas absolutas que quedan»).

Una regla falsa se fija igual de bien que una verdadera, y cuando el propio
curso la contradice (o personagem en la semana del «todas en -agem»,
*perguntou se poderia* en la semana del «nunca condicional tras se») el
alumno aprende a desconfiar de la lección.  Este control recorre las
fuentes (lecciones, ítems, vocabulario, banco y los datos de docs/lang/pt)
y:

- FALLA con las reglas falsas que la revisión de octubre ya corrigió, para
  que no vuelvan:
    · «todas / siempre» junto a *-agem* sin «casi» (o personagem);
    · «nunca condicional / futuro» tras *se* sin decir que es el *se* de
      condición (el *se* interrogativo los admite: perguntou se poderia);
    · «tras -ir, nada» sin la excepción del hiato (possuí-lo, atraí-lo);
    · «*más* no existe» (es el plural de *má*).
- AVISA, para revisar a mano, cuántas reglas dicen «todas / siempre /
  nunca» junto a una terminación o a «femenino / masculino / tilde /
  acento / plural», por archivo.

    python3 tools/pt/check_reglas.py          (sale con 1 si hay una regla falsa)
"""
import glob
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

SOURCES = (["tools/pt/lessons/*.py", "tools/pt/authored/*.py", "tools/pt/vocab/*.py", "tools/pt/bank/*.py",
            "docs/lang/pt/*.js"])

ABS = re.compile(r"\b(todas|todos|siempre|nunca)\b", re.I)
MORPHO = re.compile(r"(femenin|masculin|tilde|acento|plural|termina|\s-[a-zç]{2,5}\b)", re.I)

# (nombre, patrón de la regla falsa, lo que la vuelve verdadera si aparece en la misma línea)
FALSE_RULES = [
    ("-agem: todas femeninas (o personagem)",
     re.compile(r"(\b(todas|todos|siempre)\b[^.\n]{0,40}-agem|-agem[^.\n]{0,40}\b(todas|todos|siempre)\b)", re.I),
     re.compile(r"\bcasi\b", re.I)),
    ("nunca condicional / futuro tras «se» (el se interrogativo sí los admite)",
     re.compile(r"\bnunca\s+(condicional|futuro)\b[^.\n]{0,30}\b(tras|después de)\s*[«*]*se\b", re.I),
     re.compile(r"\bcondici[oó]n\b|interrogativo|pregunta", re.I)),
    ("ênclise: «tras -ir, nada» sin el hiato (possuí-lo)",
     re.compile(r"tras \*?-ir\*?,? nada", re.I),
     re.compile(r"salvo|possuí|atraí", re.I)),
    ("«más no existe» (más = malas, plural de má)",
     re.compile(r"(?<![a-zà-ÿ])\*?más\*? no existe", re.I),
     None),
]


def files():
    out = []
    for pat in SOURCES:
        out += sorted(glob.glob(os.path.join(ROOT, pat)))
    return [f for f in out if "__pycache__" not in f]


def check():
    """(falsas, por_archivo): falsas = [(archivo, línea, regla, texto)],
    por_archivo = {archivo: cuántas reglas absolutas morfológicas}."""
    bad, review = [], {}
    for f in files():
        rel = os.path.relpath(f, ROOT)
        with open(f, encoding="utf-8") as fh:
            lines = fh.read().split("\n")
        for n, line in enumerate(lines, 1):
            # la excepción puede seguir en la línea de abajo (cadenas partidas)
            near = line + " " + (lines[n] if n < len(lines) else "")
            for name, pat, saved in FALSE_RULES:
                if pat.search(line) and not (saved and saved.search(near)):
                    bad.append((rel, n, name, line.strip()[:140]))
            if ABS.search(line) and MORPHO.search(line):
                review[rel] = review.get(rel, 0) + 1
    return bad, review


def main():
    bad, review = check()
    total = sum(review.values())
    print("reglas absolutas para revisar a mano («todas / siempre / nunca» + morfología): %d" % total)
    for rel, k in sorted(review.items(), key=lambda kv: -kv[1])[:8]:
        print("   %4d  %s" % (k, rel))
    for rel, n, name, text in bad:
        print("FALLA %s:%d  %s\n      %s" % (rel, n, name, text))
    print("reglas falsas: %d" % len(bad))
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
