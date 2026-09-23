"""Legge parole (una per riga) da stdin e stampa quelle che nessun dizionario
Hunspell (it, es, en di LibreOffice) riconosce.  Usato da lint.js.
Requisiti: pip install spylls ; cd tools/audit && npm install"""
import os
import sys
from spylls.hunspell import Dictionary

HERE = os.path.dirname(os.path.abspath(__file__))
DICTS = [Dictionary.from_files(os.path.join(HERE, "node_modules", "dictionary-" + l, "index"))
         for l in ("it", "es", "en")]

def ok(w):
    for d in DICTS:
        if d.lookup(w) or d.lookup(w.capitalize()):
            return True
    return False

for line in sys.stdin:
    w = line.strip()
    if w and not ok(w):
        print(w)
