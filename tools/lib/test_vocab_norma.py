"""Nada se pide antes de explicarse, en el vocabulario (tools/lib/vocab_norma.py).

    python3 tools/lib/test_vocab_norma.py

En el alemán y el portugués, ningún ejercicio de escritura (traducción,
hueco, escribir) de la semana N pide una palabra que ni la lección ni las
palabras de las semanas 1..N enseñan y que no está en pantalla.  El
italiano lo controla tools/it/lessico.py (con su banco y su conjugador)."""
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, HERE)
import vocab_norma  # noqa: E402

bad, checks = [], 0
for lang in ("de", "pt"):
    course = json.load(open(os.path.join(ROOT, "docs", "lang", lang, "data", "course.json"), encoding="utf-8"))
    lex = vocab_norma.lexicon(course["weeks"], lang)
    items = {i["id"]: i for i in course["items"]}
    for w in course["weeks"]:
        n = int(w["week"])
        for iid in w["items"]:
            it = items[iid]
            if it.get("type") not in vocab_norma.WRITE:
                continue
            checks += 1
            need, why = vocab_norma.need_week(it, lex)
            if need > n:
                bad.append("%s %s (semana %d): «%s» %s" % (lang, iid, n, ", ".join(why),
                           "no se enseña nunca" if need == 99 else "se enseña en la semana %d" % need))
# the checker itself: a word on screen, an inflected form, a hint, a cognate
lex = vocab_norma.lexicon([{"week": 1, "vocab": [["der Termin", "la cita"], ["zeigen", "mostrar"],
                                                  ["ich", "yo", "Ich trinke, habe ihm das Foto; er wollte werden, ohne an."]]},
                           {"week": 5, "vocab": [["die Milch", "la leche"]]}], "de")
cases = [({"type": "translate", "prompt": "Tomo leche.", "answer": "Ich trinke Milch."}, 5),
         ({"type": "cloze", "stem": "Heute habe ich drei ___.", "answer": "Termine"}, 1),
         ({"type": "translate", "prompt": "Le mostré la foto.", "answer": "Ich habe ihm das Foto gezeigt."}, 1),
         ({"type": "cloze", "stem": "Er ___ morgen an. (anfangen)", "answer": "fängt"}, 1),
         ({"type": "translate", "prompt": "Quería ser piloto.", "answer": "Ich wollte Pilot werden."}, 1),
         ({"type": "translate", "prompt": "Entró sin golpear.", "answer": "ohne anzuklopfen"}, 99),
         ({"type": "translate", "prompt": "Entró sin golpear. (golpear: anklopfen)", "answer": "ohne anzuklopfen"}, 1),
         ({"type": "choice", "answer": "Milch"}, 1)]
for it, want in cases:
    checks += 1
    got = vocab_norma.need_week(it, lex)[0]
    if got != want:
        bad.append("vocab_norma: %s → semana %s, debería ser %s" % (it.get("answer"), got, want))
for b in bad[:30]:
    print("  ✗ " + b)
print("vocabulario antes de enseñarse   controles: %d   errores: %d" % (checks, len(bad)))
sys.exit(1 if bad else 0)
