/*
 * Controles de los arreglos de contenido (auditorías de septiembre 2026:
 * portugués A6, A7, B2, B4-B8; italiano, el equivalente de A6).
 *
 *  1. Opción múltiple sin la pista «la correcta es la más larga» (Haladyna,
 *     Downing y Rodriguez 2002), en los dos idiomas: en las preguntas de
 *     lectura (LETTURE_DATA.EPISODI y LettureSettimana.TESTI) y en «Descubrí
 *     la regla» (ítems scopri del curso compilado), la respuesta es la única
 *     opción más larga en a lo sumo el 40 % de cada conjunto.  Y, para no
 *     pasarse al revés, tampoco es la única más corta en más del 40 %.
 *  2. Portugués: la escucha de las semanas 1, 2 y 7 va a la parte de la
 *     lección que enseña esos sonidos; «si» no es opción; el duelo ser/estar
 *     de la semana 1 no usa contracciones, posesivos ni presente de otros
 *     verbos, y trae la ubicación fija con ser; las glosas de «¿Qué
 *     significa?» no contienen la propia palabra; el laboratorio de
 *     contracciones (semana 3) no usa presente regular; las lecturas de la
 *     semana 1 glosan las contracciones.
 *
 *   node tools/lib/test_fix_contenido_pt.js
 */
"use strict";
var pack = require("./pack.js");

var checks = 0, fails = 0;
function ok(cond, what) { checks++; if (!cond) { fails++; console.log("FAIL " + what); } }

var MAX = 0.40;
function onlyLongest(opts, a) { return opts.every(function (o) { return o === a || o.length < a.length; }); }
function onlyShortest(opts, a) { return opts.every(function (o) { return o === a || o.length > a.length; }); }
function rate(list, name) {
  var n = list.length, lo = 0, sh = 0;
  list.forEach(function (q) { if (onlyLongest(q.o, q.a)) lo++; if (onlyShortest(q.o, q.a)) sh++; });
  console.log("  " + name + ": la correcta es la más larga en " + lo + "/" + n + " (" + Math.round(100 * lo / n) +
              " %), la más corta en " + sh + "/" + n + " (" + Math.round(100 * sh / n) + " %)");
  ok(n > 0, name + ": sin preguntas");
  ok(lo <= MAX * n, name + ": la correcta es la opción más larga en " + lo + "/" + n);
  ok(sh <= MAX * n, name + ": la correcta es la opción más corta en " + sh + "/" + n);
}

/* ------------------------------------------------ 1. la opción más larga */

pack.LANGS.forEach(function (code) {
  console.log(code + ":");
  var ctx = pack(code, { upTo: "letture.js" });
  var qs = function (list) {
    var out = [];
    list.forEach(function (x) {
      (x.questions || []).forEach(function (q) {
        ok(q[1].indexOf(q[2]) >= 0, code + " " + x.id + ": la respuesta no está entre las opciones");
        out.push({ o: q[1], a: q[2] });
      });
    });
    return out;
  };
  rate(qs(ctx.LETTURE_DATA.EPISODI), "lecturas");
  rate(qs(ctx.LettureSettimana.TESTI), "textos de la semana");
  var sc = [];
  JSON.stringify(pack.data(code, "course.json"), function (k, v) {
    if (v && v.type === "scopri" && v.options) sc.push({ o: v.options, a: v.answer });
    return v;
  });
  rate(sc, "«Descubrí la regla»");
});

/* ------------------------------------------------------- 2. portugués */

var ctx = pack("pt", { upTo: "duelli.js", includeStop: true });
var course = pack.data("pt", "course.json");
var byWeek = {};
course.weeks.forEach(function (w) { byWeek[w.week] = w; });
var items = {};
course.items.forEach(function (it) { items[it.id] = it; });

// B2: cada ítem de escucha, en la parte de la lección que enseña sus sonidos
var PART = { 1: /sonidos/i, 2: /plurales/i, 7: /números/i };
Object.keys(PART).forEach(function (w) {
  var wk = byWeek[w], seen = 0;
  wk.parts.forEach(function (p) {
    p.items.forEach(function (id) {
      if (!/^asc-pt-/.test(id) || items[id].w !== +w) return;
      seen++;
      ok(PART[w].test(p.h), "escucha " + id + " en la parte «" + p.h + "»");
    });
  });
  ok(seen > 0, "semana " + w + " sin ítems de escucha");
});

// B7: «si» no es la palabra portuguesa para «sí»
course.items.filter(function (it) { return it.type === "listen"; }).forEach(function (it) {
  ok(it.options.indexOf("si") < 0, "escucha con la opción «si»: " + it.id);
});
ok(ctx.AscoltoData && ctx.AscoltoData.PAIRS.length > 0, "pares de sonidos cargados");
ctx.AscoltoData.PAIRS.forEach(function (p) {
  ok(p.a !== "si" && p.b !== "si", "par con «si»: " + p.id);
});

// B4 / B5: el duelo ser/estar de la semana 1
var Conj = ctx.Conj, other = {};
Object.keys(Conj.VERBS).forEach(function (v) {
  if (/^(ser|estar|ter)$/.test(v)) return;
  try { Conj.conjugate(v, "presente").forEach(function (f) { if (f) other[f] = v; }); } catch (e) { /* defectivo */ }
});
var DET = /^(o|a|os|as|um|uma|uns|umas|em|de|com|para)$/;   // tras artículo o preposición es sustantivo
var LATER = /^(no|na|nos|nas|num|numa|do|da|dos|das|dum|duma|ao|aos|à|às|pelo|pela|pelos|pelas|meu|minha|meus|minhas|seu|sua|dele|dela|esse|essa|este|esta|isso|isto)$/;
function later(sentence) {
  var toks = sentence.toLowerCase().replace(/[.,;:!?¿¡«»—]/g, " ").split(/\s+/).filter(Boolean), bad = [];
  toks.forEach(function (t, i) {
    if (LATER.test(t)) bad.push(t);
    else if (other[t] && !(i > 0 && DET.test(toks[i - 1]))) bad.push(t + " (" + other[t] + ")");
  });
  return bad;
}
var duel = ctx.Duelli.DUELLI.filter(function (d) { return d.id === "serestar"; })[0];
ok(duel && duel.week === 1, "duelo ser/estar en la semana 1");
duel.items.forEach(function (x, k) {
  var bad = later(ctx.Duelli.filled(x));
  ok(!bad.length, "duelo ser/estar " + k + " usa formas posteriores: " + bad.join(", ") + " — " + x.s);
});
ok(duel.items.filter(function (x) { return x.k === 0 && /ficar|queda/.test(x.why); }).length >= 4,
   "duelo ser/estar: al menos 4 ítems de ubicación fija con ser / ficar");

// B4: el laboratorio de contracciones de la semana 3, sin presente regular
var contr = ctx.LAB_DATA.CAPIRE.filter(function (s) { return s.id === "contracao"; })[0];
ok(contr && contr.week === 3, "laboratorio de contracciones en la semana 3");
contr.items.forEach(function (it) {
  var bad = later(it[0]).filter(function (t) { return !LATER.test(t); });
  ok(!bad.length, "contracciones: «" + it[0] + "» usa " + bad.join(", "));
});

// B4: las lecturas de la semana 1 glosan las contracciones que usan
var Lt = pack("pt", { upTo: "letture.js" });
Lt.LETTURE_DATA.EPISODI.concat(Lt.LettureSettimana.TESTI).filter(function (e) { return e.week === 1; }).forEach(function (e) {
  var toks = e.text.toLowerCase().replace(/[.,;:!?¿¡«»—"“”]/g, " ").split(/\s+/);
  toks.filter(function (t) { return /^(no|na|nos|nas|do|da|dos|das|num|numa|pelo|pela)$/.test(t); }).forEach(function (t) {
    ok(e.gloss[t], "lectura " + e.id + " (semana 1): «" + t + "» sin glosa");
  });
});

// A7: la glosa de «¿Qué significa?» no contiene la palabra portuguesa
function plain(s) { return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
var COGNATES = { apostar: 1, "a carga horária": 1, "a crônica": 1 };   // mismo significado, misma palabra
course.weeks.forEach(function (w) {
  (w.vocab || []).forEach(function (v) {
    if (COGNATES[v[0]]) return;
    v[0].split(/[\/,]/).map(function (x) { return plain(x.trim().replace(/^(o|a|os|as|um|uma)\s+/, "")); }).filter(Boolean).forEach(function (x) {
      ok(!new RegExp("(^|[^a-z])" + x.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "([^a-z]|$)").test(plain(v[1])),
         "semana " + w.week + ": la glosa de «" + v[0] + "» contiene la palabra: " + v[1]);
    });
  });
});

// B6: la semana 3 advierte que «no» (em + o) no es la negación
var w3 = JSON.stringify(byWeek[3].lesson);
ok(/negación/.test(w3) && /não/.test(w3), "semana 3: advertencia de que «no» no es la negación");
ok(/negación/.test(JSON.stringify(byWeek[1].lesson)), "semana 1: la negación con não");

console.log("\ncontroles: " + checks + "   errores: " + fails);
process.exit(fails ? 1 : 0);
