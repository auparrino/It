"""Arma docs/lang/de/data/course.json (alemán) desde tools/de/curso.py.

Mismo formato que el curso de italiano (tools/build_course.py), así el motor
de la app lo juega igual: cuatro temporadas de 13 semanas, lección en partes,
ejercicios con id, vocabulario de la semana.  Sin gimnasio de verbos, sin
jefes por ahora.

Run: python3 tools/de/build_course.py
"""
import json
import os
import sys
import unicodedata

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, HERE)
import curso  # noqa: E402
import can  # noqa: E402
import sillabo  # noqa: E402
sys.path.insert(0, os.path.join(ROOT, "tools", "lib"))
import puedo  # noqa: E402
import vocab_norma  # noqa: E402

OUT = os.path.join(ROOT, "docs", "lang", "de", "data", "course.json")
TYPES = {"choice", "cloze", "translate", "listen", "typed", "fixerr", "dictation"}


def nfc(x):
    if isinstance(x, str):
        return unicodedata.normalize("NFC", x)
    if isinstance(x, list):
        return [nfc(v) for v in x]
    if isinstance(x, dict):
        return {k: nfc(v) for k, v in x.items()}
    return x


def season_of(n):
    for s in curso.SEASONS:
        if s["weeks"][0] <= n <= s["weeks"][1]:
            return s["n"]
    raise SystemExit("semana %d: fuera de las temporadas" % n)


def early(weeks, items):
    """Nada antes de su teoría (tools/de/sillabo.py): un ejercicio que usa algo
    que su semana todavía no enseñó (el Perfekt con sein en la 11, la pasiva
    en la 21) pasa a la semana que lo enseña, a la última parte de la
    lección.  Como en el italiano y el portugués."""
    by_week = {w["week"]: w for w in weeks}
    moved, never = [], []
    # y las palabras: lo que el alumno escribe, enseñado antes (tools/lib/vocab_norma.py)
    lex = vocab_norma.lexicon(weeks, "de")
    for it in items:
        n = it["wk"]
        if it["type"] == "listen":
            continue
        to, feats = sillabo.min_week(it, n)
        vw, why = vocab_norma.need_week(it, lex)
        if vw == 99:
            never.append("%s (semana %d): «%s» no se enseña en ninguna lección" % (it["id"], n, ", ".join(why)))
        elif vw > max(to, n):
            to, feats = vw, dict(feats, **{"vocabulario " + "/".join(why): vw})
        if to <= n or to not in by_week:
            continue
        src, dst = by_week[n], by_week[to]
        src["items"].remove(it["id"])
        for p in src["parts"]:
            if it["id"] in p["items"]:
                p["items"].remove(it["id"])
        dst["items"].append(it["id"])
        dst["parts"][-1]["items"].append(it["id"])
        it["wk"], it["level"], it["topic"] = to, dst["level"], "de%d" % to
        moved.append("%s (semana %d → %d) usa %s" % (it["id"], n, to,
                     ", ".join("%s:%d" % kv for kv in feats.items() if kv[1] > n)))
    print("sillabo: %d ejercicios pasan a una semana posterior, a su teoría" % len(moved))
    for m in moved:
        print("   ", m)
    if never:
        raise SystemExit("Palabras que el alumno tiene que escribir y ninguna lección enseña "
                         "(glosalas en la consigna o enseñalas en la lección):\n  " + "\n  ".join(never))


def build():
    weeks, items = [], []
    for w in curso.WEEKS:
        n = w["week"]
        lesson = w["lesson"]
        parts = [{"h": p["h"], "blocks": list(p["blocks"]), "items": []} for p in lesson["parts"]]
        ids = []
        for k, it in enumerate(w["items"], 1):
            if it["type"] not in TYPES:
                raise SystemExit("semana %d, ejercicio %d: tipo %r" % (n, k, it["type"]))
            iid = "de%02d-%03d" % (n, k)
            out = {"id": iid, "src": "autore", "level": w["level"], "topic": "de%d" % n, "wk": n}
            for key in ("type", "prompt", "stem", "answer", "options", "note", "bad", "cat"):
                if it.get(key) not in (None, ""):
                    out[key] = it[key]
            # the prompt and the stem are shown as plain text: no *marks* in sight
            for key in ("prompt", "stem"):
                if key in out:
                    out[key] = out[key].replace("*", "")
            acc = list(it.get("accept") or [])
            if it["answer"] not in acc:
                acc.insert(0, it["answer"])
            # the same answer without its inner commas is right too, in every
            # week (the correction only drops the final punctuation)
            if it["type"] in ("translate", "typed", "cloze", "fixerr", "dictation"):
                acc += [a.replace(",", "") for a in acc if "," in a and a.replace(",", "") not in acc]
            out["accept"] = acc
            if it["type"] == "fixerr":
                out["good"] = it["good"]
            if it["type"] in ("listen", "dictation"):
                out["nopeek"] = True
            items.append(out)
            ids.append(iid)
            parts[it.get("part", 0)]["items"].append(iid)
        weeks.append({
            "week": n, "season": season_of(n), "title": w["title"], "level": w["level"],
            "focus": w["focus"], "fare": w.get("fare", ""), "tema": w.get("tema", ""), "keys": w["keys"],
            "lesson": {"intro": lesson["intro"], "parts": [{"h": p["h"], "blocks": p["blocks"]} for p in parts],
                       "blocks": lesson["blocks"]},
            "boss": False,
            "refs": {"dummies": [], "routledge": [], "sections": []},
            "items": ids, "challenges": [], "verbs": [], "persons": None, "tenses": [], "known": [],
            "gymShare": 0, "extra": [],
            "parts": parts,
            "vocab": [list(v) for v in w.get("vocab", [])],
        })
    early(weeks, items)
    course = {"title": "La Via — alemán", "lang": "de", "seasons": curso.SEASONS,
              "weeks": weeks, "items": items, "challenges": [], "sources": []}
    # el género de cada sustantivo del curso, para el color de los artículos
    # (tools/de/generos.py; la app lo aprende en LANG.rules.gender.learn)
    course["genders"] = json.load(open(os.path.join(HERE, "generos.json"), encoding="utf-8"))
    # «Ya puedo…»: los objetivos de cada semana, atados a sus ítems
    # (tools/de/can.py, tools/lib/puedo.py)
    for p in puedo.attach(course, can.CAN):
        print("aviso:", p)
    return nfc(course)


def main():
    course = build()
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(course, f, ensure_ascii=False, separators=(",", ":"))
        f.write("\n")
    print("%s: %d semanas, %d ejercicios" % (os.path.relpath(OUT, ROOT), len(course["weeks"]), len(course["items"])))


if __name__ == "__main__":
    main()
