/*
 * «Trova l'errore» del italiano: la respuesta guardada es la frase corregida
 * (revisión 2026-10, temporada 4).  er() de c1_trasforma.py reemplazaba la
 * primera SUBCADENA «bad» y no la palabra: con bad = «a» se comía la «a» de
 * «padre» (c1-er-09: «Mio pdidre ha smesso a fumare»).  _fx() de
 * mejoras3_a.py tenía el mismo patrón.  Este control lo cubre en todo el
 * curso: answer distinto del stem, «good» adentro de answer y «bad» (como
 * palabra) ya no en answer, salvo que «good» lo contenga o el stem lo
 * repita.
 *
 *   node tools/lib/test_fixerr_it.js
 */
"use strict";
var pack = require("./pack.js");
var T = require("./testkit.js")("it"), ok = T.ok;

function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
function count(text, word) {
  var re = new RegExp("(^|[^\\p{L}\\p{N}'’])" + esc(word) + "(?=$|[^\\p{L}\\p{N}'’])", "gu");
  return (text.match(re) || []).length;
}

var course = pack.data("it", "course.json");
var n = 0, mal = [];
course.items.forEach(function (it) {
  if (it.type !== "fixerr" || !it.bad || !it.good) return;
  n++;
  var stem = String(it.stem), ans = String(it.answer), bad = String(it.bad), good = String(it.good);
  if (ans === stem) mal.push(it.id + ": la respuesta es igual a la frase con el error");
  else if (ans.indexOf(good) < 0) mal.push(it.id + ": la respuesta no tiene «" + good + "»");
  else if (good.indexOf(bad) < 0 && count(stem, bad) === 1 && count(ans, bad) > 0)
    mal.push(it.id + ": la respuesta todavía tiene «" + bad + "»: " + ans);
});
mal.slice(0, 10).forEach(function (m) { console.log("  " + m); });
ok(n > 300, "fixerr del italiano con bad y good: " + n);
ok(mal.length === 0, "la respuesta guardada es la frase corregida (" + mal.length + " mal)");

// La regla de er() / _fx(): cambiar la PALABRA, no la primera subcadena.
function swap(stem, bad, good) {
  var re = new RegExp("(^|[^\\p{L}\\p{N}])" + esc(bad) + "(?=$|[^\\p{L}\\p{N}])", "u");
  return re.test(stem) ? stem.replace(re, function (m, pre) { return pre + good; }) : stem.replace(bad, good);
}
ok(swap("Mio padre ha smesso a fumare.", "a", "di") === "Mio padre ha smesso di fumare.",
   "bad = «a» cambia la palabra «a», no la «a» de «padre»");
var c109 = course.items.filter(function (it) { return it.id === "c1-er-09"; })[0];
ok(!c109 || /smesso di fumare/.test(c109.answer) && /padre/.test(c109.answer), "c1-er-09: «Mio padre ha smesso di fumare»");
T.done();
