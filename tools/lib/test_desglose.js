/* «Cómo se arma»: el desglose palabra por palabra, en los dos idiomas. */
"use strict";
var pack = require("./pack.js");
var n = 0, bad = 0;
function ok(c, m) { n++; if (!c) { bad++; console.log("FAIL " + m); } }

var CASES = {
  pt: [["Valeu, falou!", ["*valeu*: de *valer* (pretérito perfeito", "*falou*: de *falar* (pretérito perfeito"]],
       ["Fui no mercado pelo caminho.", ["de *ser* o *ir*", "*no* = *em* + *o*", "*pelo* = *por* + *o*"]],
       ["Tô morrendo de fome!", ["*morrendo*: de *morrer* (gerundio)"]]],
  it: [["Sono andato al mercato.", ["*andato*: de *andare* (participio)", "*al* = *a* + *il*"]],
       ["Mi passi il sale?", ["*passi*: de *passare*"]]]
};
Object.keys(CASES).forEach(function (code) {
  var c = pack(code), g = pack.data(code, "glossario.json");
  CASES[code].forEach(function (cs) {
    var got = c.Desglose.lines(cs[0], { gloss: g }).join(" | ");
    cs[1].forEach(function (want) { ok(got.indexOf(want) >= 0, code + ": «" + cs[0] + "» → " + got + " (falta " + want + ")"); });
  });
  // «il sale» is salt, not salire; «água» is transparent
  var sale = c.Desglose.of(code === "it" ? "Mi passi il sale?" : "Um copo de água.", { gloss: g });
  ok(!sale.some(function (e) { return e.w === "sale" && e.kind === "verb"; }), code + ": sustantivo tras artículo leído como verbo");
  ok(!sale.some(function (e) { return e.w === "água"; }), code + ": palabra transparente desglosada");
  // every phrase of the conversation scenes can be broken down without error
  var F = c.Frasi, cnt = 0;
  F.ALL.forEach(function (f) { c.Desglose.of(f.t || f.it, { gloss: g }); cnt++; });
  ok(cnt > 300, code + ": frases desglosadas: " + cnt);
});
console.log("controles: " + n + "   errores: " + bad);
process.exit(bad ? 1 : 0);
