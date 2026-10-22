/* Los errores de dedo (Engine.slipOf): una tilde, una letra doble, la tecla
   de al lado o dos letras cambiadas son «casi», no un error; la terminación,
   las palabras cortas y lo que el idioma llama gramática, no.
   Run: node tools/lib/test_desliz.js */
"use strict";
var pack = require("./pack.js");
var T = require("./testkit.js")("lib"), ok = T.ok;

function check(code, slips, errors) {
  var E = pack(code, { upTo: "app.js" }).Engine;
  slips.forEach(function (p) {
    ok(E.slipOf(p[0], [p[1]]), code + ": «" + p[0] + "» por «" + p[1] + "» es un error de dedo");
    ok(E.grade(p[0], { answer: p[1] }) === E.VERDICT.CLOSE, code + ": «" + p[0] + "» por «" + p[1] + "» es «casi»");
  });
  errors.forEach(function (p) {
    ok(!E.slipOf(p[0], [p[1]]), code + ": «" + p[0] + "» por «" + p[1] + "» no es un error de dedo");
  });
}

check("it",
  [["matina", "mattina"], ["buongionro", "buongiorno"], ["ragazzzo", "ragazzo"], ["ho mamgiato la pizza", "ho mangiato la pizza"], ["perche", "perché"]],
  [["parli", "parlo"], ["il", "al"], ["sono andata", "sono andato"], ["scusi", "scusa"], ["ho mamgiato la piza bene", "ho mangiato la pizza bene"]]);
check("pt",
  [["vpcê", "você"], ["obirgado", "obrigado"], ["cabeca", "cabeça"]],
  [["falo", "fala"], ["no", "na"], ["a casa", "à casa"]]);
check("de",
  [["Strasse", "Straße"], ["Danle schön", "Danke schön"], ["Kartofel", "Kartoffel"]],
  [["dem", "den"], ["wohnst", "wohnt"], ["Bruder", "Brüder"], ["einen", "ein"]]);

T.done();
