# -*- coding: utf-8 -*-
"""El género de los sustantivos del curso de alemán, para el color de los
artículos (LANG.rules.gender en docs/lang/de/rules.js).

Sin esto, la app solo pintaba los sustantivos de «Palabras de la semana» y
de las tablas de género de las lecciones: cualquier otro (die Rechnung, das
Fenster…) quedaba sin color.  Acá se arma tools/de/generos.json: cada forma
de cada sustantivo que aparece en el curso (Tisch, Tisches, Tische,
Tischen) con su género (m, f, n) o «pl» si es una forma de plural.
build_course.py lo copia en course.json («genders») y la app lo aprende con
el resto (gender.learn).

Los datos salen del paquete german-nouns (lista de unos 100.000 sustantivos
de Wiktionary en alemán, CC BY-SA 4.0); el CI no lo necesita: generos.json
queda commiteado.  Para regenerarlo, después de cambiar mucho el curso:

    pip download german-nouns --no-deps -d /tmp/gn && cd /tmp/gn && unzip -o *.whl
    python3 tools/de/generos.py /tmp/gn/german_nouns/nouns.csv

Se dejan afuera los sustantivos con más de un género (der/das Teil, der/die
See), los que se declinan como adjetivos (der/die Deutsche) y las formas que
son a la vez de dos géneros distintos: lo que no se sabe no se pinta.
"""
import csv
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
COURSE = os.path.join(ROOT, "docs", "lang", "de", "data", "course.json")
OUT = os.path.join(HERE, "generos.json")
CASES = ("nominativ", "genitiv", "dativ", "akkusativ")
# con mayúscula pero pronombres (das Ich, das Sie): nunca un sustantivo acá
PRON = set("Sie Ihr Ihre Ihren Ihrem Ihrer Ihres Ich Du Er Es Wir Euch Uns Dich Dir Mich Mir Man".split())
# Sustantivos comunes que Wiktionary da con un segundo género raro (das
# Mensch, die Kunde, der Foto) o que no trae: el género del uso de todos los días.
OVERRIDE = {"Monat": "m", "Monats": "m", "Monate": "pl", "Monaten": "pl", "Mensch": "m", "Menschen": "pl",
            "Kunde": "m", "Kundin": "f", "Laden": "m", "Läden": "pl", "Foto": "n", "Fotos": "pl",
            "Moment": "m", "Uni": "f", "Mail": "f", "Mails": "pl", "E-Mail": "f", "Bar": "f", "Laptop": "m",
            "Euro": "m", "Kilo": "n", "Handy": "n", "Handys": "pl", "Auto": "n", "Autos": "pl",
            "Infos": "pl", "Kosten": "pl", "Leute": "pl", "Ferien": "pl", "Eltern": "pl", "Geschwister": "pl",
            "Kartons": "pl", "Taxi": "n", "Rock": "m", "Kontakt": "m", "Kontakte": "pl"}
WORD = re.compile(r"[A-ZÄÖÜ][a-zäöüßé]+(?:-[A-ZÄÖÜ]?[a-zäöüßé]+)*")


def course_words():
    """Las palabras con mayúscula de todo el curso (consignas, ejemplos, tablas)."""
    out = set()

    def walk(x):
        if isinstance(x, str):
            out.update(WORD.findall(x))
        elif isinstance(x, list):
            for y in x:
                walk(y)
        elif isinstance(x, dict):
            for y in x.values():
                walk(y)
    walk(json.load(open(COURSE, encoding="utf-8")))
    return out


def main(path):
    csv.field_size_limit(10 ** 9)
    want = course_words()
    form_g = {}
    for row in csv.DictReader(open(path, encoding="utf-8")):
        if "Substantiv" not in (row.get("pos") or "").split(","):
            continue
        gs = {row.get(k) for k in ("genus", "genus 1", "genus 2", "genus 3", "genus 4")} - {"", None}
        if len(gs) != 1 or not gs <= {"m", "f", "n"}:
            continue
        if any(row.get(k) for k in row if k and (k.endswith(" stark") or k.endswith(" schwach"))):
            continue
        g = gs.pop()
        for k, v in row.items():
            # las columnas con * son formas viejas o raras (dem Tische): confunden
            if not k or not v or k.endswith("*") or not any(k.startswith(c) for c in CASES):
                continue
            num = "pl" if " plural" in k else g
            for f in re.split(r"[,/]\s*", v):
                f = f.strip()
                if f not in want or f in PRON:
                    continue
                prev = form_g.get(f, "")
                if prev == "":
                    form_g[f] = num
                elif prev is None:
                    continue
                elif prev != num:
                    # das Zimmer / die Zimmer: el singular gana (la app reconoce el plural);
                    # dos géneros en singular: no se sabe
                    form_g[f] = None if (prev != "pl" and num != "pl") else (prev if num == "pl" else num)
    for f, g in OVERRIDE.items():
        if f in want:
            form_g[f] = g
    lex = {f: g for f, g in sorted(form_g.items()) if g}
    with open(OUT, "w", encoding="utf-8") as fh:
        json.dump(lex, fh, ensure_ascii=False, separators=(",", ":"), sort_keys=True)
        fh.write("\n")
    print("%s: %d formas" % (os.path.relpath(OUT, ROOT), len(lex)))


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "/tmp/gn/german_nouns/nouns.csv")
