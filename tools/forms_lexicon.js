#!/usr/bin/env node
/*
 * Lessico delle forme verbali, per il sillabo.
 *
 * Coniuga tutti i verbi del coniugatore più i regolari del banco e stampa in
 * JSON quale tempo può esprimere ogni forma.  tools/sillabo.py lo usa per
 * sapere quali tempi compaiono in un esercizio e quindi da quale settimana
 * in poi lo si può proporre.
 *
 *   node tools/forms_lexicon.js > lessico.json
 */
"use strict";
var path = require("path");
var fs = require("fs");
var Conj = require(path.join(__dirname, "..", "docs", "js", "conjugator.js"));

var bank = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "docs", "data", "bank.json"), "utf8"));
bank.verbs.forEach(function (v) {
  if (!v[4]) Conj.register(v[0], { es: v[1], aux: v[2], isc: v[3] });
});

var simple = {};        // forma -> [tempi]
var participles = {};   // participio (4 desinenze) -> [ausiliari]
var gerunds = {};
var imperatives = {};   // solo le forme che non coincidono con altri tempi
var aux = {};           // forme di essere/avere/venire -> [verbo:tempo]

function add(map, form, val) {
  form = form.toLowerCase();
  if (!map[form]) map[form] = [];
  if (map[form].indexOf(val) < 0) map[form].push(val);
}

Conj.list().forEach(function (inf) {
  var info = Conj.info(inf);
  Conj.SIMPLE_TENSES.forEach(function (t) {
    var forms;
    try { forms = Conj.conjugate(inf, t); } catch (e) { return; }
    forms.forEach(function (f) {
      var w = f.split(" ");
      add(simple, w[w.length - 1], t);
      if (inf === "essere" || inf === "avere" || inf === "venire") add(aux, f, inf + ":" + t);
    });
  });
  try {
    var pp = Conj.participle(inf);
    var ausiliare = info.refl ? "essere" : info.aux;
    ["o", "a", "i", "e"].forEach(function (e) {
      add(participles, pp.replace(/[oaie]$/, e), ausiliare);
    });
  } catch (e) { /* senza participio */ }
  try { add(gerunds, Conj.gerund(inf).replace(/si$/, ""), inf); } catch (e) { /* no */ }
  try {
    var im = Conj.imperative(inf);
    if (im) add(imperatives, im.tu.split(" ").pop(), inf);
  } catch (e) { /* no */ }
});

process.stdout.write(JSON.stringify({
  simple: simple, participles: participles, aux: aux,
  gerunds: Object.keys(gerunds), imperatives: Object.keys(imperatives)
}));
