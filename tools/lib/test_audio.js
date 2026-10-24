/* Las voces grabadas (Piper): docs/lang/<código>/audio_data.js y
   docs/lang/<código>/audio/piper/*.mp3, que escribe tools/audio/grabar.py.
   Controla que la clave de la app (Voces.key, docs/js/voces.js) sea la del
   script, que el manifiesto y los archivos coincidan (ni uno de más ni uno
   de menos) y el tamaño.  Los textos que todavía no tienen audio (si se
   cambió una radio o un diálogo y no se volvió a correr el script) no son un
   error: la app usa la voz del teléfono; se cuentan como aviso.
   Run: node tools/lib/test_audio.js */
"use strict";
var fs = require("fs"), path = require("path"), cp = require("child_process");
var pack = require("./pack.js");
var T = require("./testkit.js")("lib"), ok = T.ok;
var V = require(path.join(pack.DOCS, "js", "voces.js"));
var ROOT = path.join(pack.DOCS, "..");

// la misma clave que tools/audio/grabar.py (los valores salen del script)
ok(V.key("Ciao, come stai?", "") === "5416df09f9526dd7", "clave de una frase suelta");
ok(V.key("Olá  mundo_ ", "f1") === "b0dc63a35b34b335", "clave con espacios, guion bajo y lugar");
ok(V.key("Ñandú «è» 😀 ação", "m2") === "25a9a9759478d877", "clave con tildes, comillas y emoji");
var py = cp.spawnSync("python3", ["-c",
  "import importlib.util as u,json;s=u.spec_from_file_location('g','tools/audio/grabar.py');g=u.module_from_spec(s);s.loader.exec_module(g);" +
  "print(json.dumps([g.key('Ciao, come stai?',''),g.key('Olá  mundo_ ','f1'),g.key('Ñandú «è» 😀 ação','m2'),g.slots(['f','f','m'],3),g.slots(None,2)]))"],
  { cwd: ROOT, encoding: "utf8" });
var got = py.status === 0 ? JSON.parse(py.stdout) : null;
ok(got && got[0] === "5416df09f9526dd7" && got[1] === "b0dc63a35b34b335" && got[2] === "25a9a9759478d877", "el script calcula la misma clave");
ok(got && JSON.stringify(got[3]) === JSON.stringify(V.slots(["f", "f", "m"], 3)) && JSON.stringify(got[4]) === JSON.stringify(V.slots(null, 2)),
   "el script reparte los lugares igual (f1, f2, m1)");

var total = 0;
pack.LANGS.forEach(function (code) {
  var man = path.join(pack.DOCS, "lang", code, "audio_data.js"), dir = path.join(pack.DOCS, "lang", code, "audio", "piper");
  if (!fs.existsSync(man)) { console.log("(" + code + ": sin audios grabados)"); return; }
  var w = {};
  new Function("window", fs.readFileSync(man, "utf8"))(w);
  var AD = w.AUDIO_DATA || {}, have = String(AD.have || "").split(" ").filter(Boolean);
  ok(AD.dir === "audio/piper/" && have.length > 0, code + ": el manifiesto dice dónde están y qué hay");
  ok(have.every(function (k) { return /^[0-9a-f]{16}$/.test(k); }), code + ": claves de 16 cifras hexadecimales");
  var files = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
  var set = {};
  files.forEach(function (f) { set[f.replace(/\.mp3$/, "")] = 1; });
  var missing = have.filter(function (k) { return !set[k]; }), extra = files.filter(function (f) { return have.indexOf(f.replace(/\.mp3$/, "")) < 0; });
  ok(!missing.length, code + ": cada clave del manifiesto tiene su archivo (faltan " + missing.length + ")");
  ok(!extra.length, code + ": ningún archivo fuera del manifiesto (" + extra.slice(0, 3).join(", ") + ")");
  var bytes = files.reduce(function (n, f) { return n + fs.statSync(path.join(dir, f)).size; }, 0);
  total += bytes;
  ok((AD.credits || []).length > 0, code + ": los créditos de las voces");
  console.log(code + ": " + have.length + " audios, " + (bytes / 1048576).toFixed(1) + " MB");
});
ok(total < 120 * 1048576, "los audios grabados pesan menos de 120 MB en total: " + (total / 1048576).toFixed(1) + " MB");

// los textos que esperan su audio (aviso, no error)
var ls = cp.spawnSync("python3", ["tools/audio/grabar.py", "--solo-listar"], { cwd: ROOT, encoding: "utf8" });
if (ls.status === 0) {
  (ls.stdout.match(/^\w+: .*por grabar$/gm) || []).forEach(function (l) {
    var n = +(/(\d+) por grabar/.exec(l) || [])[1];
    if (n) console.log("aviso: " + l + " (correr tools/audio/grabar.py; mientras tanto, la voz del teléfono)");
  });
}
var APP = fs.readFileSync(path.join(pack.DOCS, "js", "app.js"), "utf8");
ok(/function recorded\(text, slot\)/.test(APP) && /playFile\(file, text, rate, opts\)/.test(APP), "speak toca el archivo grabado si está");
ok(/state\.phoneVoice/.test(APP) && /id="phonevoice"/.test(APP), "en el perfil se puede volver a la voz del teléfono");
ok(/"audio_data\.js"/.test(fs.readFileSync(path.join(pack.DOCS, "js", "boot.js"), "utf8")), "boot.js carga audio_data.js");
ok(/audio\\\/\(cv\|piper\)/.test(fs.readFileSync(path.join(pack.DOCS, "sw.js"), "utf8")), "el service worker guarda los audios al escucharlos");
T.done();
