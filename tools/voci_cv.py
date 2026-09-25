#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Common Voice: elegir oraciones para escuchar gramática (VOCES.md, caso 2).

Lee el índice de oraciones validadas de Common Voice Italian
(`validated.tsv`, sin bajar el audio) y elige unas pocas por semana:

- de 5 a 12 palabras, con al menos dos votos a favor y ninguno en contra;
- la semana es la primera en la que ya se enseñó su gramática
  (sillabo.analyze) y se conoce su vocabulario (lessico.word_week), con a lo
  sumo una palabra no vista;
- hablantes distintos dentro de cada semana.

Escribe `docs/audio/cv/elegidas.json` (semana → oraciones con su archivo mp3
de Common Voice) y `docs/audio/cv/elegidas.txt`, la lista de archivos a
extraer del paquete completo.  Con `--clips DIR` convierte esos audios a Opus
liviano en `docs/audio/cv/` (hace falta ffmpeg).

    python3 tools/voci_cv.py validated.tsv [--por-semana 10] [--clips DIR]
"""
import argparse
import collections
import csv
import json
import os
import subprocess
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import lessico  # noqa: E402
import sillabo  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "docs", "audio", "cv")


def candidates(tsv):
    csv.field_size_limit(10 ** 7)
    with open(tsv, encoding="utf-8", newline="") as fh:
        for row in csv.DictReader(fh, delimiter="\t", quoting=csv.QUOTE_NONE):
            try:
                up, down = int(row.get("up_votes") or 0), int(row.get("down_votes") or 0)
            except ValueError:
                continue
            text = (row.get("sentence") or "").strip()
            if up < 2 or down > 0 or not 5 <= len(text.split()) <= 12:
                continue
            yield row["client_id"], row["path"], text


def week_of(text, seen):
    """First week at which the sentence can be heard, or None."""
    gram = max(sillabo.analyze(text).values() or [1])
    vocab = sorted((lessico.word_week(t, seen)[0] for t in lessico.words_of(text)),
                   reverse=True)
    if not vocab or vocab[0] == 99 and (len(vocab) < 2 or vocab[1] == 99):
        return None                              # dos palabras fuera del curso
    lex = vocab[1] if len(vocab) > 1 and vocab[0] == 99 else vocab[0]
    wk = max(gram, lex)
    return wk if wk <= 52 else None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("tsv")
    ap.add_argument("--por-semana", type=int, default=10)
    ap.add_argument("--clips", help="carpeta con los mp3 de Common Voice")
    args = ap.parse_args()

    with open(os.path.join(ROOT, "docs", "data", "course.json"), encoding="utf-8") as fh:
        seen = lessico.lesson_words(json.load(fh))

    by_week = collections.defaultdict(list)
    speakers = collections.defaultdict(set)
    texts = set()
    for client, path, text in candidates(args.tsv):
        key = text.lower().rstrip(".!?")
        if key in texts:
            continue
        wk = week_of(text, seen)
        if not wk or len(by_week[wk]) >= args.por_semana or client in speakers[wk]:
            continue
        texts.add(key)
        speakers[wk].add(client)
        by_week[wk].append({"it": text, "cv": path,
                            "file": os.path.splitext(path)[0] + ".opus"})

    os.makedirs(OUT, exist_ok=True)
    chosen = {str(w): by_week[w] for w in sorted(by_week)}
    with open(os.path.join(OUT, "elegidas.json"), "w", encoding="utf-8") as fh:
        json.dump(chosen, fh, ensure_ascii=False, indent=1)
    with open(os.path.join(OUT, "elegidas.txt"), "w", encoding="utf-8") as fh:
        fh.writelines(s["cv"] + "\n" for w in chosen.values() for s in w)
    total = sum(len(v) for v in chosen.values())
    print("oraciones elegidas: %d en %d semanas" % (total, len(chosen)))
    for w, v in chosen.items():
        print("  semana %s: %d · %s" % (w, len(v), v[0]["it"]))

    if args.clips:
        for w in chosen.values():
            for s in w:
                src = os.path.join(args.clips, s["cv"])
                dst = os.path.join(OUT, s["file"])
                if os.path.exists(dst):
                    continue
                subprocess.run(["ffmpeg", "-loglevel", "error", "-i", src,
                                "-af", "silenceremove=start_periods=1:start_threshold=-45dB,"
                                "areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse",
                                "-ac", "1", "-c:a", "libopus", "-b:a", "24k", dst], check=True)


if __name__ == "__main__":
    main()
