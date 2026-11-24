# -*- coding: utf-8 -*-
"""Qué estructuras usa una frase griega, y desde qué semana se puede pedir.

El griego todavía no tiene conjugador; acá van marcas que no se confunden:
las contracciones de σε con el artículo, el acusativo masculino, los verbos
en -άω, el plural, μου αρέσει, los verbos en -μαι, να, θα y las formas más
frecuentes del aoristo.  Cada una tiene la semana en que la enseña la
lección (tools/el/TEMARIO.md).

build_course.py lo usa para que nada se tome antes de explicarse: un
ejercicio cuya respuesta usa algo que su semana todavía no enseñó pasa a la
semana de esa teoría.  Ante la duda no marca: un falso «es temprano» movería
un ejercicio sin motivo.
"""
import re

G = r"[Ͱ-Ͽ]"
B = r"(?<![Ͱ-Ͽ])"          # principio de palabra (\b no sirve: el acento corta)
E = r"(?![Ͱ-Ͽ])"           # fin de palabra


def w(alts):
    return re.compile(B + r"(?:" + alts + r")" + E)


# Fórmulas que la lección explica antes de su regla (desde esa semana no
# cuentan): «από την Αργεντινή / από το Μεξικό» en la 2, «στην Αθήνα» y
# «στο Μπουένος Άιρες» en la 4 (con μένω), «τι ώρα είναι;».
FIXED = [
    (re.compile(r"με λένε|σε λένε|τον λένε|την λένε|σας λένε"), 2),
    (re.compile(r"τι κάνεις|τι κάνετε"), 1),
    (re.compile(r"θα ήθελα|θα ήθελες|θα θέλατε"), 9),
    (re.compile(r"καλή όρεξη|καλό ταξίδι|στην υγειά (?:σου|σας|μας)|γεια (?:σου|σας)"), 1),
]

# (estructura, semana, expresión): la frase la usa si la expresión aparece
RULES = [
    ("σε + artículo (στον, στην, στο)", 4, w("στον|στην|στο|στη")),
    ("acusativo masculino (τον, έναν)", 5, w("τον|έναν")),
    ("σε + artículo en plural", 9, w("στους|στα")),
    ("verbos en -άω", 7, w("(?:μιλ|αγαπ|ρωτ|ξυπν|περπατ|απαντ|πειν|διψ|περν|γελ|τραγουδ|σταματ|ξεκιν|βοηθ|κρατ|φιλ|χτυπ|κολυμπ|ζητ)"
                           "(?:άω|ώ|άς|άει|ά|άμε|ούμε|άτε|άνε|ούν|ούνε)")),
    ("plural (οι)", 8, w("οι")),
    ("acusativo plural (τους, τις)", 9, re.compile(B + r"τις" + E + r"(?!\s+(?:μία|μια|δύο|τρεις|τέσσερις|πέντε|έξι|επτά|εφτά|οκτώ|οχτώ|εννέα|εννιά|δέκα|έντεκα|δώδεκα)" + E + ")")),
    ("μου αρέσει", 9, w("αρέσει|αρέσουν|αρέσω|αρέσεις")),
    ("verbos en -μαι", 10, w(G + r"{2,}(?:ομαι|εσαι|εται|όμαστε|εστε|ονται|άμαι|άσαι|άται|ούμαι|ιέμαι)")),
    ("να + subjuntivo", 11, w("να")),
    ("futuro con θα", 12, w("θα")),
    ("aoristo", 13, w("έκανα|έκανες|έκανε|κάναμε|κάνατε|έκαναν|πήγα|πήγες|πήγε|πήγαμε|πήγατε|πήγαν|έφαγα|έφαγες|έφαγε|φάγαμε|φάγατε|έφαγαν|"
                      "ήπια|ήπιες|ήπιε|ήπιαμε|είδα|είδες|είδε|είδαμε|είδατε|είδαν|είπα|είπες|είπε|είπαμε|είπατε|είπαν|"
                      "ήμουν|ήσουν|ήταν|ήμασταν|ήσασταν|είχα|είχες|είχε|είχαμε|είχατε|είχαν|ήρθα|ήρθες|ήρθε|ήρθαμε|ήρθατε|ήρθαν|"
                      "πήρα|πήρες|πήρε|πήραμε|έδωσα|έδωσες|έδωσε|αγόρασα|αγόρασες|αγόρασε|αγοράσαμε|δούλεψα|δούλεψες|δούλεψε|δουλέψαμε|"
                      "έμεινα|έμεινες|έμεινε|μείναμε|μίλησα|μίλησες|μίλησε|μιλήσαμε|έγραψα|έγραψες|έγραψε|γράψαμε|"
                      "διάβασα|διάβασες|διάβασε|διαβάσαμε|έπαιξα|έπαιξες|έπαιξε|παίξαμε|ξύπνησα|ξύπνησες|ξύπνησε|"
                      "κοιμήθηκα|κοιμήθηκες|κοιμήθηκε|χθες|χτες")),
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
        for name, wk, rx in RULES:
            if rx.search(low):
                out[name] = wk
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
    # una respuesta en castellano (¿qué significa?) no usa gramática griega
    if not re.search(G, ans):
        return 1, {}
    feats = features(ans, week)
    return (max(feats.values()) if feats else 1), feats
