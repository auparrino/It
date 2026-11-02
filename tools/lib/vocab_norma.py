# -*- coding: utf-8 -*-
"""Norma «nada se pide antes de explicarse», para el vocabulario.

El italiano ya lo controla con su banco y su conjugador
(tools/it/lessico.py: item_vocab).  El alemán y el portugués usan esto:
una palabra que el alumno tiene que ESCRIBIR (traducción, hueco, escritura)
tiene que estar enseñada en la lección o en las palabras de su semana o de
una anterior, o estar en pantalla (la consigna, el enunciado, la pista), o
ser un cognado que un hispanohablante deduce (piloto → Pilot, farmacia →
farmácia), o un número.  Las formas flexionadas cuentan si comparten la raíz
con una palabra enseñada (Termin → Termine, morar → morávamos), y en alemán
un compuesto de dos palabras enseñadas (Taxi + Fahrer).

need_week(item, lex) dice desde qué semana se puede pedir el ejercicio
(99: la palabra no se enseña nunca); los builds (tools/de/build_course.py,
tools/pt/build_course.py) mueven el ejercicio a esa semana, como hacen con
la gramática (sillabo.py), y fallan si alguno no se enseña nunca.
"""
import re
import unicodedata

WORD = re.compile(r"[A-Za-zÀ-ÿß]+(?:['’][A-Za-zÀ-ÿ]+)?")

ENDINGS = {
    "de": ["ieren", "iert", "test", "ten", "tet", "te", "ern", "eren", "en", "em", "er", "es", "est", "et", "st", "e", "n", "s", "t"],
    "pt": ["mente", "ando", "endo", "indo", "ados", "idos", "ada", "ida", "ado", "ido", "amos", "emos", "imos",
           "ar", "er", "ir", "am", "em", "as", "es", "os", "o", "a", "s", "e"],
}
NUMBER = {
    "de": re.compile(r"^(?:ein|eins|zwei|drei|vier|fünf|sechs|sech|sieben|sieb|acht|neun|zehn|elf|zwölf|zwanzig|dreißig|"
                     r"hundert|tausend|und|zig|ßig|ten|sten|ter|ste|en|e|s)+$"),
    "pt": re.compile(r"^(?:um|uma|dois|duas|três|quatro|cinco|seis|sete|oito|nove|dez|onze|doze|treze|catorze|quatorze|"
                     r"quinze|dezesseis|dezessete|dezoito|dezenove|vinte|trinta|quarenta|cinquenta|sessenta|setenta|"
                     r"oitenta|noventa|cem|cento|duzentos|trezentos|quatrocentos|quinhentos|seiscentos|setecentos|"
                     r"oitocentos|novecentos|mil|milhão|milhões|e)$"),
}
# Spanish → target spelling rules for cognates (applied to the Spanish word).
COG = {
    "de": [("ción", "tion"), ("cion", "tion"), ("dad", "tät"), ("ía", "ie"), ("ismo", "ismus"), ("ista", "ist"),
           ("ico", "isch"), ("ica", "ik"), ("c", "k"), ("o", ""), ("a", ""), ("e", "")],
    "pt": [("ción", "ção"), ("ciones", "ções"), ("dad", "dade"), ("aje", "agem"), ("ble", "vel"), ("ñ", "nh"),
           ("ll", "lh"), ("ue", "o"), ("ie", "e"), ("z", "s"), ("ia", "ía")],
}


def plain(w):
    w = unicodedata.normalize("NFD", w.lower().replace("’", "'"))
    return "".join(c for c in w if unicodedata.category(c) != "Mn").replace("ß", "ss")


def stem(w, lang):
    w = plain(w)
    if "'" in w:
        w = w.split("'")[-1]
    for e in ENDINGS[lang]:
        if len(w) - len(e) >= 3 and w.endswith(e):
            return w[:-len(e)]
    return w


def words(text):
    return [m.group(0) for m in WORD.finditer(str(text or "").replace("*", ""))]


def strings(x):
    if isinstance(x, str):
        yield x
    elif isinstance(x, (list, tuple)):
        for y in x:
            yield from strings(y)
    elif isinstance(x, dict):
        for y in x.values():
            yield from strings(y)


def lexicon(weeks, lang):
    """{stem: first week} of every word the lessons and the week's words teach."""
    first = {}
    for w in sorted(weeks, key=lambda x: int(x["week"])):
        n = int(w["week"])
        for s in strings([w.get("lesson"), w.get("vocab"), w.get("keys"), w.get("can")]):
            for t in words(s):
                for k in (stem(t, lang), plain(t)):
                    if len(k) >= 2 and k not in first:
                        first[k] = n
    return {"lang": lang, "first": first}


def _lev(a, b):
    if abs(len(a) - len(b)) > 2:
        return 9
    prev = list(range(len(b) + 1))
    for i, ca in enumerate(a, 1):
        cur = [i]
        for j, cb in enumerate(b, 1):
            cur.append(min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (ca != cb)))
        prev = cur
    return prev[-1]


def cognate(w, spanish, lang):
    """The target word is a Spanish word on screen, spelled the target way."""
    p = plain(w)
    if len(p) < 4:
        return False
    # German -ieren verbs: kritisiert ← criticaron, diskutiert ← discute
    if lang == "de" and "ier" in p and len(p) >= 6:
        for es in spanish:
            e = plain(es).replace("qu", "k").replace("c", "k")
            if len(e) >= 5 and e[:5] == p[:5].replace("c", "k"):
                return True
    for es in spanish:
        e = plain(es)
        if len(e) < 4:
            continue
        cands = {e}
        for a, b in COG[lang]:
            cands |= {c.replace(plain(a), plain(b)) for c in list(cands)}
        for c in cands:
            if c == p or (len(p) >= 5 and _lev(c, p) <= 1) or (len(p) >= 7 and _lev(c, p) <= 2):
                return True
    return False


def word_week(t, lex, visible, spanish, hints=()):
    """First week the learner can write t (1 if on screen; 99 if never)."""
    lang, first = lex["lang"], lex["first"]
    p = plain(t)
    if len(p) <= 1 or NUMBER[lang].match(p) or p.isdigit():
        return 1
    s = stem(t, lang)
    if s in visible or p in visible:
        return 1
    # an inflected form of a word on screen (the hint: «(anfangen)» → anfängt)
    for v in visible:
        if len(v) >= 4 and (p.startswith(v[:max(4, len(v) - 3)]) or v.startswith(p[:max(4, len(p) - 3)])
                            or (v in p and len(p) - len(v) <= 8)):
            return 1
    # a hint in parentheses (the verb to conjugate, the base word): dar → dava,
    # arrumado → desarrumada, prever → imprevisível
    for h in hints:
        if len(h) >= 2 and (p[:2] == h[:2] or (len(h) >= 4 and h[:max(4, len(h) - 3)] in p) or (len(s) >= 3 and s in h)):
            return 1
    if cognate(t, spanish, lang):
        return 1
    best = first.get(s, first.get(p, 99))
    # German participles: ge-zeig-t, ab-ge-lauf-en → the verb's stem
    if best == 99 and lang == "de":
        m = re.match(r"^([a-z]*?)ge([a-z]{3,})$", p)
        if m:
            best = min(best, first.get(stem(m.group(1) + m.group(2), lang), 99), first.get(stem(m.group(2), lang), 99))
    # an inflected form of a taught word: the longest taught stem it starts with
    if best == 99:
        for n in range(len(p), 2, -1):
            k = p[:n]
            if k in first and len(p) - n <= 6:
                best = min(best, first[k])
                break
    # German compounds: two taught words (Taxi + Fahrer, Haus + Tür, with -s-)
    if best == 99 and lang == "de":
        for i in range(3, len(p) - 2):
            a, b = p[:i], p[i:]
            wa = first.get(a, first.get(stem(a, lang), 99))
            wb = first.get(stem(b, lang), first.get(b, 99))
            if wb == 99 and b.startswith("s"):
                wb = first.get(stem(b[1:], lang), 99)
            if max(wa, wb) < 99:
                best = min(best, max(wa, wb))
    return best


# Exercises where the learner writes: the answer has to be known.
WRITE = {"translate", "typed", "cloze"}


def need_week(item, lex):
    """First week every word the learner has to write is taught (1: any week;
    99: a word never taught), and the words that decide it."""
    if item.get("type") not in WRITE:
        return 1, []
    stem_txt = str(item.get("stem") or "")
    # an ending to fill (Kind___): not a word
    if re.search(r"[A-Za-zÀ-ÿß]_{2,}|_{2,}[A-Za-zÀ-ÿß]", stem_txt):
        return 1, []
    shown = " ".join(strings([item.get("prompt"), stem_txt, item.get("options")]))
    visible = set()
    for t in words(shown):
        visible.add(plain(t))
        visible.add(stem(t, lex["lang"]))
    spanish = words(shown)
    hints = [stem(h, lex["lang"]) for h in words(" ".join(re.findall(r"\(([^)]*)\)", stem_txt)))]
    # a word-formation item shows the base word after an arrow (prever → ___)
    hints += [stem(h, lex["lang"]) for h in words(" ".join(re.findall(r"([^.→]*)→", stem_txt)))]
    best = None
    for a in [item.get("answer")] + list(item.get("accept") or []):
        if a is None:
            continue
        per = [(word_week(t, lex, visible, spanish, hints), t) for t in words(a)]
        wk = max([w for w, _ in per] or [1])
        if best is None or wk < best[0]:
            best = (wk, [t for w, t in per if w == wk and w > 1])
    return best or (1, [])
