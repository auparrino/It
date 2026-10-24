/* Las voces del teléfono (docs/js/voces.js): el género por el nombre, la
   calidad, una voz por hablante según su género, y que cada diálogo de los
   datos diga el género de cada hablante («sexes» junto a «speakers»).
   Run: node tools/lib/test_voces.js */
"use strict";
var fs = require("fs"), path = require("path");
var pack = require("./pack.js");
var T = require("./testkit.js")("lib"), ok = T.ok;
var V = require(path.join(pack.DOCS, "js", "voces.js"));

function voz(name, lang, local) { return { name: name, lang: lang || "de-DE", localService: !!local }; }

// el género por el nombre
ok(V.gender(voz("Microsoft Katja Online (Natural) - German (Germany)")) === "f", "Katja es voz de mujer");
ok(V.gender(voz("Microsoft Conrad Online (Natural) - German (Germany)")) === "m", "Conrad es voz de hombre");
ok(V.gender(voz("Microsoft Elsa - Italian (Italy)", "it-IT")) === "f" && V.gender(voz("Microsoft Diego Online (Natural)", "it-IT")) === "m", "Elsa / Diego");
ok(V.gender(voz("Microsoft Francisca Online (Natural)", "pt-BR")) === "f" && V.gender(voz("Microsoft Antonio Online (Natural)", "pt-BR")) === "m", "Francisca / Antonio");
ok(V.gender(voz("Anna")) === "f" && V.gender(voz("Markus")) === "m" && V.gender(voz("Luca", "it-IT")) === "m", "voces de Apple");
ok(V.gender(voz("Google Deutsch")) === "f", "la voz Google Deutsch es de mujer");
ok(V.gender(voz("de-de-x-nfh-local")) === null, "un nombre que no dice nada: género desconocido");

// la calidad: Natural, Neural, Online, Enhanced, Premium y Google primero; las de juguete, al final
var lista = [voz("Eddy (Deutsch (Deutschland))", "de-DE", true), voz("Anna", "de-DE", true), voz("Google Deutsch", "de-DE"),
             voz("Microsoft Katja Online (Natural) - German (Germany)"), voz("Microsoft Hedda - German (Germany)", "de-DE", true),
             voz("Anna (Enhanced)", "de-DE", true), voz("Microsoft Karl", "de-AT", true)];
var ord = V.sort(lista, /^de[-_]de/i).map(function (v) { return v.name; });
ok(/Natural|Enhanced/.test(ord[0]) && /Natural|Enhanced/.test(ord[1]), "primero las voces Natural y Enhanced: " + ord.slice(0, 2));
ok(ord.indexOf("Anna (Enhanced)") < ord.indexOf("Anna"), "Enhanced antes que la misma voz común");
ok(ord.indexOf("Google Deutsch") < ord.indexOf("Microsoft Hedda - German (Germany)"), "Google antes que una voz común");
ok(ord[ord.length - 1] === "Microsoft Karl", "la variante no preferida (de-AT) al final");
ok(ord.indexOf("Eddy (Deutsch (Deutschland))") === ord.length - 2, "la voz de juguete, última de las de Alemania");

// a cada hablante, una voz de su género, distinta
var de = V.sort([voz("Microsoft Katja Online (Natural)"), voz("Microsoft Conrad Online (Natural)"), voz("Microsoft Amala Online (Natural)")], null);
var c = V.cast(de, ["m", "f"], 2);
ok(V.gender(de[c[0].vi]) === "m" && V.gender(de[c[1].vi]) === "f", "hombre y mujer: cada uno una voz de su género");
ok(c[0].pitch === 1 && c[1].pitch === 1, "con la voz de su género, la altura natural");
c = V.cast(de, ["f", "f"], 2);
ok(c[0].vi !== c[1].vi && V.gender(de[c[0].vi]) === "f" && V.gender(de[c[1].vi]) === "f", "dos mujeres: dos voces de mujer distintas");
c = V.cast(de, ["m", "m"], 2);
ok(c[0].vi !== c[1].vi, "dos hombres con una sola voz de hombre: igual, dos voces distintas");
ok(V.gender(de[c[0].vi]) === "m" && c[1].pitch < 1, "el segundo hombre, con otra voz y más grave");
// una sola voz: la misma, con otra altura
var una = [voz("Google Deutsch")];
c = V.cast(una, ["f", "m"], 2);
ok(c[0].vi === 0 && c[1].vi === 0 && c[0].pitch === 1 && c[1].pitch < 0.9, "una sola voz (de mujer): el hombre, más grave");
c = V.cast(una, ["m", "m"], 2);
ok(Math.abs(c[0].pitch - c[1].pitch) >= 0.12, "una sola voz y dos hombres: dos alturas distintas");
c = V.cast(una, null, 2);
ok(Math.abs(c[0].pitch - c[1].pitch) >= 0.12, "sin géneros: igual, dos alturas distintas");
ok(V.cast([], ["f", "m"], 2).length === 2, "sin voces no se rompe");
ok(V.who("A") === 0 && V.who("B") === 1 && V.who("C") === 2, "A, B y C son los hablantes 0, 1 y 2");

// los datos: cada diálogo dice el género de cada hablante
var bad = [];
["it", "pt"].forEach(function (l) {
  ["radio", "tramo"].forEach(function (dir) {
    var d = path.join(pack.ROOT || path.join(pack.DOCS, ".."), "tools", l, dir);
    fs.readdirSync(d).filter(function (f) { return /^w\d+\.json$/.test(f); }).forEach(function (f) {
      (function walk(o) {
        if (Array.isArray(o)) return o.forEach(walk);
        if (!o || typeof o !== "object") return;
        if (o.speakers) {
          var s = o.sexes || [];
          if (s.length !== o.speakers.length || s.some(function (x) { return x !== "f" && x !== "m"; })) bad.push(l + "/" + dir + "/" + f);
        }
        Object.keys(o).forEach(function (k) { walk(o[k]); });
      })(JSON.parse(fs.readFileSync(path.join(d, f), "utf8")));
    });
  });
  var es = fs.readFileSync(path.join(pack.DOCS, "lang", l, "esame_data.js"), "utf8");
  (es.match(/speakers: \["[^\]]*\](, sexes: \[[^\]]*\])?/g) || []).forEach(function (m) {
    var n = (m.split("]")[0].match(/"/g) || []).length / 2, sx = /sexes: \[([^\]]*)\]/.exec(m);
    if (!sx || (sx[1].match(/"[fm]"/g) || []).length !== n) bad.push(l + "/esame_data.js: " + m.slice(0, 60));
  });
});
ok(!bad.length, "cada diálogo (radio, tramo, examen) trae «sexes», uno por hablante: " + bad.slice(0, 5).join(" | "));

// la app: la mejor voz, los diálogos con el reparto y el aviso de que falta la voz
var APP = fs.readFileSync(path.join(pack.DOCS, "js", "app.js"), "utf8");
var TRAMO = fs.readFileSync(path.join(pack.DOCS, "js", "tramo.js"), "utf8");
ok(/Voces\.sort\(voices, LG\.voicePrefer\)/.test(APP), "pickVoice ordena las voces con Voces.sort");
ok(/castVoices\(it\.sexes/.test(APP) && /cast: castVoices/.test(APP), "los diálogos del curso y del tramo usan el reparto por género");
ok(/sexes: a\.sexes/.test(TRAMO) && /H\.cast\(opts\.sexes/.test(TRAMO), "el tramo y la radio pasan los géneros del episodio");
ok(/function noVoiceWarn\(\)/.test(APP) && /Texto a voz/.test(APP) && /language-unavailable/.test(APP), "si falta la voz del idioma, la app dice cómo instalarla");
ok(/"voces\.js"/.test(fs.readFileSync(path.join(pack.DOCS, "js", "boot.js"), "utf8")), "boot.js carga voces.js");
T.done();
