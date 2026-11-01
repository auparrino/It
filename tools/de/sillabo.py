# -*- coding: utf-8 -*-
"""Qué estructuras usa una frase alemana, y desde qué semana se puede pedir.

El italiano y el portugués tienen un conjugador que reconoce cada forma
(tools/it/sillabo.py, tools/pt/sillabo.py); el alemán todavía no.  Acá van
marcas que no se confunden: el auxiliar y el participio del Perfekt, war /
hatte, würde / wäre / hätte, el Präteritum de los modales, la pasiva, el
Konjunktiv I, las conjunciones que mandan el verbo al final…  Cada una
tiene la semana en que la enseña la lección (tools/de/TEMARIO.md).

build_course.py lo usa para que nada se tome antes de explicarse: un
ejercicio cuya respuesta usa algo que su semana todavía no enseñó pasa a la
semana de esa teoría.  Ante la duda no marca: un falso «es temprano» movería
un ejercicio sin motivo.
"""
import re

# participios que parecen otra cosa y palabras con ge- que no son participios
_NOT_PART = set("""gegen gestern gern gerne genug gerade genau gesund gesamt gesamte gemeinsam gemütlich
gefährlich geheim gelb gemein gerecht gewiss gewöhnlich gehen geben gehören gewinnen genießen gelten
geschehen gefallen gelingen gestehen gebären gedenken gedeihen geraten gebrauchen gestatten gewähren
geehrte geehrter geehrten geschwister gemüse geschäft geschenk geschichte gesicht gespräch getränk
gelegenheit gegend gebäude gebühr gefühl gedanke gedicht gesetz gewitter gewicht genehmigung""".split())
_PART = r"\bge[a-zäöüß]{2,}(?:t|en)\b"
_HABEN = r"\b(?:habe|hast|hat|haben|habt)\b"
_SEIN = r"\b(?:bin|bist|ist|sind|seid)\b"

# Fórmulas que la lección explica antes de su regla (desde esa semana no
# cuentan): «Ich hätte gern…» y «Ich bin 1990 geboren», en la semana 5.
FIXED = [
    (re.compile(r"\bhätte(?:st|n)?\s+(?:[a-zäöüß]+\s+)?gern\b"), 5),
    (re.compile(r"\b(?:bin|bist|ist|sind|seid)\b[^.?!;:,]*?\bgeboren\b"), 5),
]

# (estructura, semana, expresión): la frase la usa si la expresión aparece
RULES = [
    ("Perfekt (haben)", 11, re.compile(_HABEN + r"[^.?!;:]*?" + _PART)),
    ("Perfekt (sein)", 12, re.compile(_SEIN + r"[^.?!;:]*?" + _PART)),
    ("Präteritum de sein/haben", 12, re.compile(r"\b(?:war|warst|waren|wart|hatte|hattest|hatten|hattet)\b")),
    ("subordinada (weil, dass)", 18, re.compile(r"\b(?:weil|dass)\b")),
    ("Präteritum", 21, re.compile(r"\b(?:konnte|konntest|konnten|musste|musstest|mussten|wollte|wolltest|wollten|"
                                  r"durfte|durftest|durften|mochte|mochten|ging|gingen|kam|kamen|sah|sahen|gab|gaben|"
                                  r"nahm|nahmen|fand|fanden|blieb|blieben|lief|liefen|fuhr|fuhren|schrieb|schrieben|"
                                  r"sprach|sprachen|trank|tranken|saß|saßen|stand|standen|wusste|wussten|dachte|dachten|"
                                  r"brachte|brachten|sagte|sagten|machte|machten|wohnte|wohnten|arbeitete|arbeiteten)\b")),
    ("Futur I / um … zu", 23, re.compile(r"\b(?:werde|wirst|werdet)\b|\bum\b[^.?!;:]*\bzu\s+[a-zäöüß]+en\b")),
    ("Konjunktiv II", 25, re.compile(r"\b(?:würde|würdest|würden|würdet|wäre|wärst|wären|wärt|hätte|hättest|hätten|hättet|"
                                     r"könnte|könntest|könnten|müsste|müssten|dürfte|dürften)\b")),
    ("genitivo (wegen, trotz, während)", 26, re.compile(r"\b(?:wegen|trotz|während)\b")),
    ("pasiva", 27, re.compile(r"\b(?:wird|werden|wurde|wurden)\b[^.?!;:]*?" + _PART + r"(?:\s+(?:werden|worden))?\s*[.?!,;:]?$|"
                              r"\b(?:wurde|wurden)\b[^.?!;:]*?" + _PART)),
    ("Plusquamperfekt / nachdem", 28, re.compile(r"\bnachdem\b|\b(?:hatte|hatten|war|waren)\b[^.?!;:,]*?" + _PART)),
    ("Konjunktiv II pasado", 30, re.compile(r"\b(?:hätte|hätten|wäre|wären)\b[^.?!;:,]*?" + _PART)),
    ("Konjunktiv I", 35, re.compile(r"\b(?:er|sie|es|man)\s+sei\b")),
]


def _clean(text):
    s = str(text or "")
    s = re.sub(r"\([^)]*\)", " ", s)
    return s


def features(text, week=52):
    """{estructura: semana} de lo que usa el texto (en la semana «week»: las
    fórmulas ya explicadas no cuentan)."""
    out = {}
    for sent in re.split(r"(?<=[.?!;])\s+", _clean(text)):
        low = sent.lower()
        for rx, wk in FIXED:
            if week >= wk:
                low = rx.sub(" ", low)
        for name, week, rx in RULES:
            m = rx.search(low)
            if not m:
                continue
            # el participio encontrado no es un participio (gegen, gestern…)
            if "ge" in m.group(0):
                parts = re.findall(_PART, m.group(0))
                if parts and all(p in _NOT_PART for p in parts):
                    continue
            out[name] = week
    return out


def min_week(item, week=52):
    """La primera semana en que la respuesta del ítem usa solo lo enseñado
    (la consigna se lee: puede traer de todo).  week: la del ítem, para las
    fórmulas ya explicadas."""
    ans = str(item.get("answer") or "").split("|")[0]
    stem = _clean(item.get("stem") or "")
    if "___" in stem and item.get("type") in ("cloze", "choice"):
        parts = [a.strip() for a in str(item.get("answer") or "").split("|")]
        k = iter(parts)
        ans = re.sub(r"_{3,}", lambda m: next(k, ""), stem)
    feats = features(ans, week)
    return (max(feats.values()) if feats else 1), feats
