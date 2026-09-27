/* Una sola versión: la de la app.  package.json, APP_VERSION de
   docs/js/app.js (la que ve el alumno en Oggi / Io) y VERSION de docs/sw.js
   (el nombre de la caché) tienen que decir lo mismo:
     package.json 2.8.0  ↔  app.js "v2.8"  ↔  sw.js "c1-v2.8"
     package.json 3.0.1  ↔  app.js "v3.0.1"  ↔  sw.js "c1-v3.0.1"
   Para subir de versión se cambian los tres a la vez.
   Run: node tools/lib/test_version.js */
"use strict";
var fs = require("fs"), path = require("path");
var ROOT = path.join(__dirname, "..", "..");
var bad = 0, checks = 0;
function ok(c, m) { checks++; if (!c) { bad++; console.log("FAIL " + m); } }

var pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8")).version;
var app = (fs.readFileSync(path.join(ROOT, "docs/js/app.js"), "utf8").match(/APP_VERSION = "v(\d+(?:\.\d+)*)"/) || [])[1];
var sw = (fs.readFileSync(path.join(ROOT, "docs/sw.js"), "utf8").match(/VERSION = "c1-v(\d+(?:\.\d+)*)"/) || [])[1];

ok(/^\d+\.\d+\.\d+$/.test(pkg || ""), "package.json: versión semver (X.Y.Z): " + pkg);
ok(!!app, "docs/js/app.js: APP_VERSION = \"vX.Y\"");
ok(!!sw, "docs/sw.js: VERSION = \"c1-vX.Y\"");
// the app shows X.Y when the patch number is 0
var short = String(pkg).replace(/\.0$/, "");
ok(app === short || app === pkg, "package.json " + pkg + " ≠ app.js v" + app);
ok(sw === app, "sw.js c1-v" + sw + " ≠ app.js v" + app);

console.log("versión: " + pkg + " (app v" + app + ", sw c1-v" + sw + ")   controles: " + checks + "   errores: " + bad);
process.exit(bad ? 1 : 0);
