#!/usr/bin/env python3
"""Il Redattore: escribe de noche ítems nuevos contra tus errores.

Lee progress.json, encuentra las semanas donde más tropezás (fichas del SRS
con poca facilidad) y le pide a Ollama ítems nuevos en el formato del banco
propio, con la teoría de esa semana como contexto.  Los valida (respuesta
entre las opciones, hueco en el enunciado, sin duplicados) y los agrega a
docs/data/bank_maestro.json, que el juego mezcla en las rondas de esa semana.

    python3 tools/redattore.py             # 6 ítems por semana floja
    python3 tools/redattore.py --n 4 --weeks 21 22
    python3 tools/redattore.py --dry-run   # muestra sin guardar

Los ítems generados por un modelo local pueden tener errores; el juego los
marca como «escritos por il Maestro» y siempre pide verificar con la teoría.
"""
import argparse
import datetime as dt
import os
import random
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import agente  # noqa: E402

OUT_PATH = os.path.join(agente.DOCS, "data", "bank_maestro.json")
MAX_ITEMS = 300
MAX_PER_WEEK = 40

SCHEMA = {
    "type": "object",
    "properties": {
        "items": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "type": {"type": "string", "enum": ["choice", "cloze"]},
                    "prompt": {"type": "string"},
                    "stem": {"type": "string"},
                    "options": {"type": "array", "items": {"type": "string"}},
                    "answer": {"type": "string"},
                    "note": {"type": "string"},
                },
                "required": ["type", "prompt", "stem", "answer", "note"],
            },
        }
    },
    "required": ["items"],
}


def norm(s):
    return re.sub(r"\s+", " ", str(s or "").strip().lower())


def validate(it):
    """Devuelve el ítem limpio o None con el motivo en it['_why']."""
    if not isinstance(it, dict):
        return None
    t = it.get("type")
    stem, answer, prompt = str(it.get("stem", "")).strip(), str(it.get("answer", "")).strip(), \
        str(it.get("prompt", "")).strip()
    if t not in ("choice", "cloze") or not stem or not answer or not prompt:
        return None
    if "___" not in stem:
        return None
    if len(answer) > 60 or len(answer.split()) > 4:
        return None
    # The answer must not be sitting in plain sight in the stem.
    if norm(answer) in norm(stem).replace("___", ""):
        return None
    out = {"type": t, "prompt": prompt, "stem": stem, "answer": answer,
           "accept": [answer], "note": str(it.get("note", "")).strip()[:300]}
    if t == "choice":
        opts = [str(o).strip() for o in (it.get("options") or []) if str(o).strip()]
        uniq = []
        for o in opts:
            if norm(o) not in [norm(u) for u in uniq]:
                uniq.append(o)
        if not any(norm(o) == norm(answer) for o in uniq):
            uniq.append(answer)
        if len(uniq) < 3 or len(uniq) > 5:
            return None
        out["options"] = uniq
        out["answer"] = [o for o in uniq if norm(o) == norm(answer)][0]
        out["accept"] = [out["answer"]]
    return out


def examples_for(course, week, k=3):
    items = {it["id"]: it for it in course["items"]}
    pool = [items[i] for i in week.get("items", []) if i in items
            and items[i].get("type") in ("choice", "cloze")]
    random.shuffle(pool)
    lines = []
    for it in pool[:k]:
        line = "- prompt: %s | stem: %s | answer: %s" % (it["prompt"], it["stem"], it["answer"])
        if it.get("options"):
            line += " | options: %s" % ", ".join(it["options"])
        lines.append(line)
    return "\n".join(lines)


def ask(course, week, n, weak_hint, model=None, host=None):
    msgs = [
        {"role": "system", "content": agente.PERSONA + "\n\nContexto:\n" + agente.lesson_context(week)},
        {"role": "user", "content":
            "Escribí %d ejercicios nuevos de italiano para esta semana, distintos entre sí y "
            "distintos de los ejemplos. %s\n\n"
            "Formato de cada ítem: type «choice» (3 o 4 options, la answer entre ellas, "
            "distractores que sean errores típicos de un hispanohablante) o «cloze» (el "
            "estudiante escribe la answer: una palabra o dos como mucho). prompt: consigna "
            "corta en español. stem: la frase en italiano con ___ donde va la respuesta; la "
            "respuesta no puede aparecer en el stem. note: una frase en español explicando la "
            "regla. Italiano correcto y natural; si no estás seguro de una forma, no la uses.\n\n"
            "Ejemplos del banco (mismo formato):\n%s\n\nRespondé solo JSON: {\"items\": [...]}."
            % (n, weak_hint, examples_for(course, week))},
    ]
    raw = agente.chat(msgs, model=model, schema=SCHEMA, temperature=0.6, host=host)
    return agente.extract_json(raw).get("items", [])


def merge(bank, new_items, week, stamp):
    """Agrega ítems válidos y no repetidos; recorta el banco si crece demasiado."""
    existing = {norm(it["stem"]) for it in bank["items"]}
    n0 = len([it for it in bank["items"] if it.get("week") == week["week"]])
    added = []
    for k, raw in enumerate(new_items):
        it = validate(raw)
        if not it or norm(it["stem"]) in existing:
            continue
        if n0 + len(added) >= MAX_PER_WEEK:
            break
        it.update(id="m%02d-%s-%d" % (week["week"], stamp, k), src="maestro",
                  week=week["week"], level=week.get("level", ""),
                  topic=week["title"], made=stamp)
        bank["items"].append(it)
        existing.add(norm(it["stem"]))
        added.append(it)
    if len(bank["items"]) > MAX_ITEMS:
        bank["items"] = bank["items"][-MAX_ITEMS:]
    return added


def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("--progress", default=agente.PROGRESS_PATH)
    ap.add_argument("--course", default=agente.COURSE_PATH)
    ap.add_argument("--out", default=OUT_PATH)
    ap.add_argument("--model", default=os.environ.get("MAESTRO_MODEL"))
    ap.add_argument("--ollama", default=agente.OLLAMA)
    ap.add_argument("--n", type=int, default=6, help="ítems por semana")
    ap.add_argument("--weeks", type=int, nargs="*", help="forzar semanas")
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()

    course = agente.load_course(a.course)
    progress = agente.load_progress(a.progress)
    weeks_by_n = {w["week"]: w for w in course["weeks"]}

    if a.weeks:
        targets = [(n, "") for n in a.weeks if n in weeks_by_n]
    else:
        weak = agente.weak_topics(progress, course, limit=2)
        targets = [(w, "El estudiante falla seguido en «%s» (%d fichas flojas): apuntá ahí." % (t, k))
                   for w, t, k in weak]
        cur = agente.current_week(progress, course)["week"]
        if cur not in [w for w, _ in targets]:
            targets.append((cur, "Es la semana en curso."))

    bank = agente.load_json(a.out, {"items": []}) or {"items": []}
    bank.setdefault("items", [])
    stamp = dt.date.today().strftime("%Y%m%d")
    total = 0
    for n, hint in targets:
        week = weeks_by_n[n]
        try:
            raw = ask(course, week, a.n, hint, model=a.model, host=a.ollama)
        except Exception as e:
            print("semana %d: Ollama falló (%s)" % (n, e), file=sys.stderr)
            continue
        added = merge(bank, raw, week, stamp) if not a.dry_run else \
            [v for v in (validate(r) for r in raw) if v]
        total += len(added)
        print("semana %d «%s»: %d generados, %d válidos" % (n, week["title"], len(raw), len(added)))
        for it in added:
            print("   ·", it["stem"], "→", it["answer"])
    if not a.dry_run and total:
        bank["updatedAt"] = dt.datetime.now().isoformat(timespec="seconds")
        agente.save_json(a.out, bank)
        print("guardado en %s (%d ítems en total)" % (a.out, len(bank["items"])))


if __name__ == "__main__":
    main()
