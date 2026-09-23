#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Il sillabo: da quale settimana in poi si può proporre un esercizio.

Ogni semana hereda capítulos enteros de los libros, y un capítulo de
sustantivos puede traer oraciones en imperfetto o en passato prossimo.  Este
módulo mira qué gramática usa realmente cada ejercicio (tiempos verbales,
pronombres combinados, ne, cui, gerundio, comparativos) y devuelve la primera
semana en la que todo eso ya se enseñó.  build_course.py lo usa para no
proponer nada antes de su teoría.

Reglas:
- En el contexto (el enunciado que se lee) vale todo lo que ya se enseñó; el
  presente se tolera desde el principio porque se entiende por cognados.
- En la respuesta (lo que el alumno escribe o elige) el presente cuenta
  desde la semana 6, salvo essere/avere, que se enseñan en la semana 1.
- Una forma ambigua (parli = presente o congiuntivo) cuenta por su lectura
  más temprana: el detector prefiere dejar pasar a descartar de más.

    python3 tools/sillabo.py            informe por semana de lo que se mueve
"""
import json
import os
import re
import subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Semana en la que la teoría presenta cada tiempo o construcción.  Si se
# reordena el programa (WEEKS en build_course.py), esto se ajusta acá.
TENSE_WEEK = {
    "presente": 6,
    "imperativo": 9,
    "passatoProssimo": 17,
    "imperfetto": 18,
    "futuro": 20,
    "futuroAnteriore": 20,
    "condizionale": 21,
    "trapassatoProssimo": 26,
    "congiuntivo": 27,
    "congiuntivoPassato": 29,
    "congImperfetto": 30,
    "congiuntivoTrapassato": 30,
    "condizionalePassato": 31,
    "passivo": 34,
    "passatoRemoto": 45,
    "trapassatoRemoto": 45,
    "gerundio": 44,
}
FEATURE_WEEK = {
    "comparativo": 22,
    "pronomi combinati": 36,
    "ne": 36,
    "cui": 38,
}
ESSERE_AVERE = {"sono", "sei", "è", "siamo", "siete", "ho", "hai", "ha",
                "abbiamo", "avete", "hanno", "c'è"}

COMPOUND = {
    "presente": "passatoProssimo", "imperfetto": "trapassatoProssimo",
    "futuro": "futuroAnteriore", "passatoRemoto": "trapassatoRemoto",
    "condizionale": "condizionalePassato", "congiuntivo": "congiuntivoPassato",
    "congImperfetto": "congiuntivoTrapassato",
}
# Lo que puede meterse entre auxiliar y participio.
BETWEEN = {"non", "già", "mai", "sempre", "ancora", "più", "appena", "anche",
           "ben", "bene", "proprio", "davvero", "poi", "tutto", "tutti", "solo",
           "subito", "spesso", "finalmente", "forse", "mica", "neanche", "pure"}
# Palabras frecuentes que coinciden con una forma verbal pero casi siempre
# son otra cosa en los ejercicios (sustantivo, adjetivo, conjunción).
NOT_VERBS = {"porta", "pesca", "sale", "canto", "ama", "fine", "vite", "volta",
             "parte", "conto", "resto", "posto", "mostra", "spesa", "ponte",
             "rete", "bevi", "corsa", "venti", "letto", "fatto", "stato",
             "detto", "morte", "prima", "dopo", "sole", "mare", "come", "dove",
             "perché", "ora", "era", "ami", "amo", "lavoro", "studio", "gioco",
             "viaggio", "sogno", "invito", "aiuto", "ritorno", "arrivo",
             "pranzo", "ceno", "compito", "regalo", "caso", "passo", "giro",
             "tema", "fiore", "sete", "mente", "vino", "piano", "ballo",
             "dubbio", "odio", "grazie", "cara", "caro", "molto", "tanto",
             "poco", "sia", "fossi", "canti", "conti", "speri", "senti",
             "voglia", "paia", "quanta", "quante", "quanti", "quanto"}
# Casos dudosos que sí deben contar como verbo cuando no hay otra lectura.
AMBIGUOUS_OK = {"era": "imperfetto", "sia": "congiuntivo", "fossi": "congImperfetto"}

# me lo, te la, glielo; y pegados al verbo: dammelo, diteceli
COMBINED = re.compile(r"\b(me|te|ce|ve)\s+(lo|la|li|le|ne)\b|glie(lo|la|li|le|ne)\b", re.I)
# sin te/se: finitelo es finite + lo
ENCLITIC = re.compile(r"^\w{3,}(me|ce|ve)(lo|la|li|le|ne)$")

STARE = {"sto", "stai", "sta", "stiamo", "state", "stanno", "stavo", "stavi",
         "stava", "stavamo", "stavate", "stavano"}
ARTICLES = {"il", "lo", "la", "i", "gli", "le", "l'"}
THAN = {"di", "del", "dello", "della", "dei", "degli", "delle", "dell'", "che", "quanto"}

NUMBERS = {"uno", "due", "tre", "quattro", "cinque", "sei", "sette", "otto",
           "nove", "dieci", "venti", "venticinque", "quarto"}

_LEX = None
_NOMI = None


def nominal_forms():
    """Nouns and adjectives of the bank, all their forms: «temi» or «stanchi»
    in an answer are not a present tense."""
    global _NOMI
    if _NOMI is None:
        with open(os.path.join(ROOT, "docs", "data", "bank.json"), encoding="utf-8") as fh:
            bank = json.load(fh)
        _NOMI = set()
        for n in bank["nouns"]:
            _NOMI.update(x.lower() for x in (n[0], n[2]) if x)
        for a in bank["adjectives"]:
            _NOMI.update(x.lower() for x in a[:4] if x)
        for w in bank["words"]:
            if " " not in w[0]:
                _NOMI.add(w[0].lower())
    return _NOMI


def lexicon():
    global _LEX
    if _LEX is None:
        out = subprocess.run(["node", os.path.join(ROOT, "tools", "forms_lexicon.js")],
                             check=True, capture_output=True, text=True).stdout
        _LEX = json.loads(out)
        _LEX["gerunds"] = set(_LEX["gerunds"])
        _LEX["imperatives"] = set(_LEX["imperatives"])
    return _LEX


def tokens(text):
    text = text.replace("’", "'").lower()
    out = []
    for t in re.findall(r"[a-zàèéìòóù]+'?", text):
        # l'ho → l' + ho; c'è se deja entero porque es una unidad
        out.append(t)
    return out


def _simple_week(tok):
    lex = lexicon()
    if tok in NOT_VERBS and tok not in AMBIGUOUS_OK:
        return None, None
    tenses = lex["simple"].get(tok)
    if not tenses:
        if tok in lex["imperatives"]:
            return TENSE_WEEK["imperativo"], "imperativo"
        return None, None
    best = min(tenses, key=lambda t: TENSE_WEEK[t])
    if tok in AMBIGUOUS_OK and AMBIGUOUS_OK[tok] in tenses:
        best = AMBIGUOUS_OK[tok]
    return TENSE_WEEK[best], best


def analyze(text, answer=False):
    """Features used by an Italian text → {feature: week}.

    answer=True: the learner produces this text, so the present tense of any
    verb but essere/avere also counts.
    """
    lex = lexicon()
    feats = {}

    def need(name, week):
        if week and week > feats.get(name, 0):
            feats[name] = week

    low = text.replace("’", "'").lower()
    toks = tokens(low)
    as_participle = set()      # «persi» in «ci siamo persi» is not a passato remoto
    for i, tok in enumerate(toks):
        # tiempos compuestos: auxiliar + participio
        auxes = lex["aux"].get(tok)
        if auxes:
            j = i + 1
            while j < len(toks) and toks[j] in BETWEEN:
                j += 1
            if j < len(toks) and toks[j] in lex["participles"]:
                pp, pp_aux = toks[j], lex["participles"][toks[j]]
                comps = []
                for a in auxes:
                    verb, tense = a.split(":")
                    if verb == "venire":
                        if "avere" in pp_aux:
                            comps.append("passivo")
                        continue
                    reflexive = i and toks[i - 1] in ("mi", "ti", "si", "ci", "vi")
                    if (verb == "essere" and "essere" not in pp_aux and not reflexive
                            and not pp.startswith("stat")):
                        continue        # è chiuso, sono stanchi: adjetivo
                    comps.append(COMPOUND[tense])
                if comps:
                    # aveste mangiato: congiuntivo trapassato antes que trapassato remoto
                    comp = min(comps, key=lambda t: TENSE_WEEK[t])
                    need(comp, TENSE_WEEK[comp])
                    as_participle.add(j)
        wk, tense = _simple_week(tok) if i not in as_participle else (None, None)
        if tense and tense != "presente":
            need(tense, wk)
        elif (tense == "presente" and answer and tok not in ESSERE_AVERE
              and tok not in nominal_forms()):
            need("presente", wk)
        if tok in lex["gerunds"] and len(tok) > 5:
            # stare + gerundio se enseña en la semana 7, y desde ahí un
            # gerundio se entiende leyendo; producirlo suelto es de la 44
            if (i and toks[i - 1] in STARE) or not answer:
                need("stare + gerundio", 7)
            else:
                need("gerundio", TENSE_WEEK["gerundio"])
        if tok == "cui":
            need("cui", FEATURE_WEEK["cui"])
        if tok == "ne":
            need("ne", FEATURE_WEEK["ne"])
        # comparativo (più ... di/che) o superlativo relativo (le vittime più
        # tragiche); «parla più piano» o «non ... più» no cuentan
        if tok in ("più", "meno"):
            after = set(toks[i + 1:i + 5])
            nxt = toks[i + 1] if i + 1 < len(toks) else ""
            prev = toks[i - 1] if i else ""
            prev2 = toks[i - 2] if i > 1 else ""
            superl = prev in ARTICLES or (prev2 in ARTICLES and prev in nominal_forms())
            clock = tok == "meno" and (nxt in NUMBERS or nxt in ("un", "mezzo", "mezza"))
            if (after & THAN or superl) and not clock:
                if not ("non" in toks[max(0, i - 4):i] and tok == "più"):
                    need("comparativo", FEATURE_WEEK["comparativo"])
    # dammelo, diteceli; pero no clientela, tutela
    if COMBINED.search(low) or any(ENCLITIC.match(t) and t not in nominal_forms()
                                   for t in toks):
        need("pronomi combinati", FEATURE_WEEK["pronomi combinati"])
    return feats


def _strip_glosses(stem):
    # (El pueblo danés estaba…), (partir, irse de viaje): castellano o pistas
    return re.sub(r"\([^)]*\)", " ", stem or "")


def _answers(item):
    return [a.strip() for a in re.split(r"\s*\|\s*", item.get("answer") or "") if a.strip()]


def item_features(item):
    """{feature: week} for one graded item of the course."""
    feats = {}
    typ = item.get("type")
    answers = _answers(item)
    context = ""
    if typ not in ("translate",):          # en translate el enunciado es castellano
        stem = _strip_glosses(item.get("stem"))
        for a in answers:
            stem = stem.replace("___", a, 1)     # diventat___ → diventata
        context = stem
    for text, is_answer in ((context, False), (" ".join(answers), True),
                            (" ".join(item.get("options") or []), False)):
        for k, v in analyze(text, answer=is_answer).items():
            if v > feats.get(k, 0):
                feats[k] = v
    return feats


def min_week(item):
    feats = item_features(item)
    return (max(feats.values()) if feats else 1), feats


def main():
    """Report: what each week receives from earlier weeks, and why."""
    with open(os.path.join(ROOT, "docs", "data", "course.json"), encoding="utf-8") as fh:
        course = json.load(fh)
    items = {i["id"]: i for i in course["items"]}
    total = 0
    for w in course["weeks"]:
        for iid in w.get("extra", []):
            it = items[iid]
            mw, feats = min_week(it)
            total += 1
            why = ", ".join("%s→%d" % (k, v) for k, v in sorted(feats.items(), key=lambda x: -x[1]))
            print("sem %2d  %-22s %-60s [%s]" % (w["week"], iid, (it.get("stem") or "")[:60], why))
    print("ejercicios que esperan a su teoría: %d" % total)


if __name__ == "__main__":
    main()
