# -*- coding: utf-8 -*-
"""Planillas para que un hablante nativo revise el curso.

Genera en revision/ tres CSV (se abren con Excel, Numbers o Google Sheets):
ejercicios.csv, banco.csv y teoria.csv.  Cada fila trae lo que ve el
alumno y la respuesta que la app acepta, más tres columnas vacías para el
revisor: OK (sí/no), Corrección y Comentario.  Las filas van ordenadas por
semana; conviene revisar primero las semanas 1 a 26, que es donde más gente
llega.  Uso: python3 tools/hoja_nativo.py
"""
import csv, json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "docs", "data")
OUT = os.path.join(ROOT, "revision")
REV = ["OK (sí/no)", "Corrección", "Comentario"]


def write(name, head, rows):
    with open(os.path.join(OUT, name), "w", encoding="utf-8-sig", newline="") as fh:
        w = csv.writer(fh)
        w.writerow(head + REV)
        for r in rows:
            w.writerow([("" if x is None else x) for x in r] + ["", "", ""])
    return len(rows)


def main():
    os.makedirs(OUT, exist_ok=True)
    course = json.load(open(os.path.join(DATA, "course.json"), encoding="utf-8"))
    home = {}
    for w in course["weeks"]:
        for iid in w["items"]:
            home.setdefault(iid, w["week"])
    rows = []
    for it in course["items"]:
        if it["type"] in ("listen", "word", "guess"):
            continue
        acc = [a for a in (it.get("accept") or []) if a != it.get("answer")]
        rows.append([home.get(it["id"], it.get("wk")), it["id"], it["type"], it.get("prompt"), it.get("stem"),
                     it.get("answer"), " | ".join(acc), " | ".join(it.get("options") or [])])
    rows.sort(key=lambda r: (r[0] or 99, r[1]))
    n1 = write("ejercicios.csv", ["Semana", "Id", "Tipo", "Consigna", "Enunciado", "Respuesta", "También se acepta", "Opciones"], rows)

    bank = json.load(open(os.path.join(DATA, "bank.json"), encoding="utf-8"))
    brow = [[s.get("w", 1), "bank:%d" % i, s.get("es"), (s.get("it") or [""])[0], " | ".join((s.get("it") or [])[1:])]
            for i, s in enumerate(bank["sentences"])]
    brow.sort(key=lambda r: (r[0], r[1]))
    n2 = write("banco.csv", ["Semana", "Id", "Castellano", "Italiano", "También se acepta"], brow)

    trow = []
    for w in course["weeks"]:
        for k, b in enumerate((w.get("lesson") or {}).get("blocks", [])):
            ex = " · ".join("%s = %s" % (e[0], e[1]) for e in (b.get("ex") or []))
            tab = " · ".join(" / ".join(r) for r in ((b.get("table") or {}).get("rows") or []))
            trow.append([w["week"], k + 1, b.get("h"), b.get("r"), b.get("warn"), ex, tab])
    n3 = write("teoria.csv", ["Semana", "Bloque", "Título", "Regla", "Atención", "Ejemplos", "Tabla"], trow)
    print("revision/: %d ejercicios, %d oraciones del banco, %d bloques de teoría" % (n1, n2, n3))


if __name__ == "__main__":
    main()
