/* «2 minutos» (plan 1.1): el botón de Oggi, la ronda de seis ítems y el
   registro del día mínimo (state.dos).
   Run: node tools/lib/test_dos.js */
"use strict";
var fs = require("fs"), path = require("path");
var pack = require("./pack.js");
var T = require("./testkit.js")("lib"), ok = T.ok;

var APP = fs.readFileSync(path.join(pack.DOCS, "js", "app.js"), "utf8");
ok(/id="dos"/.test(APP) && /on\("#dos"/.test(APP), "Oggi tiene el botón «2 minutos» y su gancho");
ok(/kind === "dos"\) items = dosItems\(\)/.test(APP), "startRound conoce la ronda «dos»");
ok(/round\.kind === "dos" && total >= 1\)[^\n]*state\.dos\[Engine\.dayKey\(\)\] = true/.test(APP), "terminar la ronda marca el día en state.dos");
ok(/dosItems\(\) \{[\s\S]*?slice\(0, 6\)/.test(APP), "la ronda es de seis ítems");

var E = pack("it", { upTo: "app.js" }).Engine;
ok(E.MODULE_OBJ.indexOf("dos") >= 0, "state.dos está entre los campos de módulo (test_estado lo controla)");
T.done();
