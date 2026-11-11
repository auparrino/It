/* El código QR (docs/js/qr.js): pasar el token de la nube al celular.
   Los tres códigos de referencia de abajo salieron de qr.js y se leyeron
   con un lector independiente (jsQR) antes de fijarlos acá: si el
   codificador cambia un solo módulo, este test lo dice.  También la forma
   (tamaño por versión, los tres ojos, las líneas de sincronía) y el límite.
     node tools/lib/test_qr.js */
"use strict";
var T = require("./testkit.js")("lib"), ok = T.ok, eq = T.eq;
var QR = require("../../docs/js/qr.js");

// cada fila, sus módulos como un número en base 36
var GOLD = [{"t": "hola", "n": 21, "rows": ["18nen", "mxc1", "wpct", "wrbx", "wp5p", "mzi9", "18prz", "1ds", "187my", "3ind", "135ay", "6mnw", "16qvl", "3wp", "18qjq", "mv9o", "wso2", "wtgk", "ws64", "mwxg", "18qs6"]}, {"t": "https://ejemplo.github.io/app/?lang=it#gist=ghp_abcdefghijklmnopqrstuvwxyz0123456789ABCD", "n": 37, "rows": ["1qooa8hr", "w7z3m81", "19vtfj31", "1a3mnhwd", "19xqslel", "w9vj135", "1qt5f2wv", "3xchkw", "1q3uq9pm", "vuye65q", "1irdl0q5", "vpdysey", "r8dn2e5", "jwzb0va", "cp0vpdj", "8zmruqx", "125h5of1", "eys1yna", "1a91uz87", "tsk24fl", "1d4ev00v", "e5fq682", "vyh9bn", "1mdlzs4x", "1r028ndr", "wllwysu", "1269otcf", "xv3mf5d", "16zk14os", "7rt4i8", "1qtnijbn", "w69cob5", "1a2r08vw", "1a0eaifr", "1a2efig3", "w882jgh", "1quaz007"]}, {"t": "èèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèx", "n": 49, "rows": ["5igdyt74vz", "2tl0zub39d", "41manwy3q5", "41pw1sgoyl", "41nyrdbbkt", "2tkcmk7znl", "5iicojrr7j", "50bn52ps", "59d0pf1319", "z0j4j7yv1", "4gotib5k29", "29lk0kib6w", "1doqrw4v5k", "1i30up8nv7", "kibysngxl", "3k6i4iz4em", "59w33p306e", "lxs9asd0l", "24nt1q4lzo", "4j2ujkfhdx", "i6opiu0j4", "3efywy754t", "ovn7yk835", "5dyg6ch3bs", "1yp826uo2g", "1krbzwkys6", "os7gyo9vb", "2a5bhzi5ol", "28u7i8vwqr", "1c9ov7vw8l", "58ovzpeqes", "49wnsxtm1h", "2x9ij98ysg", "3trbpwkvs", "hv1b9b1sv", "1up2381cab", "npddckcgd", "3x1ckpxhnq", "1isnle209z", "2gfzjvldue", "4wtp2cg35f", "j3l9hixc", "5i25gaih5m", "2thbd8xwym", "41c5t2sdmd", "41ehlrlonv", "41dne0lrbj", "2u12985vio", "5ifcj9xob3"]}];

GOLD.forEach(function (g) {
  var m = QR.matrix(g.t);
  ok(!!m, "arma el código de «" + g.t.slice(0, 24) + "…»");
  eq(m.length, g.n, "tamaño");
  var rows = m.map(function (r) { return BigInt("0b" + r.join("")).toString(36); });
  eq(rows, g.rows, "módulo a módulo, igual al código leído con un lector independiente");
});

function finder(m, r0, c0) {
  for (var a = 0; a < 7; a++) for (var b = 0; b < 7; b++) {
    var on = a === 0 || a === 6 || b === 0 || b === 6 || (a >= 2 && a <= 4 && b >= 2 && b <= 4);
    if (m[r0 + a][c0 + b] !== (on ? 1 : 0)) return false;
  }
  return true;
}
[1, 17, 18, 60, 110, 140, 160, 200, 230].forEach(function (len) {
  var m = QR.matrix(new Array(len + 1).join("a")), n = m.length;
  ok((n - 17) % 4 === 0 && n >= 21 && n <= 53, len + " bytes: tamaño de una versión 1-9 (" + n + ")");
  ok(m.every(function (r) { return r.length === n && r.every(function (x) { return x === 0 || x === 1; }); }), len + " bytes: cuadrado, de 0 y 1");
  ok(finder(m, 0, 0) && finder(m, 0, n - 7) && finder(m, n - 7, 0), len + " bytes: los tres ojos");
  var timing = true;
  for (var i = 8; i < n - 8; i++) if (m[6][i] !== (i % 2 ? 0 : 1) || m[i][6] !== (i % 2 ? 0 : 1)) timing = false;
  ok(timing, len + " bytes: las líneas de sincronía");
  eq(m[n - 8][8], 1, len + " bytes: el módulo oscuro");
});
eq(QR.matrix(new Array(232).join("a")), null, "231 bytes no entran: null");
eq(QR.svg(new Array(232).join("a")), "", "y el svg, vacío");
var svg = QR.svg("hola", 200);
ok(/^<svg [^>]*viewBox="0 0 29 29"[^>]*width="200"/.test(svg) && /<path d="M/.test(svg), "svg con margen de 4 módulos y el tamaño pedido");

var Boot = require("../../docs/js/boot.js"), k = Boot.ORDER.map(function (e) { return e.core; });
ok(k.indexOf("qr.js") >= 0 && k.indexOf("qr.js") < k.indexOf("app.js"), "qr.js está en ORDER, antes de app.js");
var app = require("fs").readFileSync(require("path").join(__dirname, "../../docs/js/app.js"), "utf8");
ok(/function nubeFromLink[\s\S]{0,900}confirm\(/.test(app), "el token del enlace se guarda solo si el alumno acepta");
ok(/function nubeFromLink[\s\S]{0,500}history\.replaceState/.test(app), "y el token se borra de la barra de direcciones");

T.done();
