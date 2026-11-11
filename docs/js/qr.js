/*
 * Un código QR, sin bibliotecas: para pasar el token de la copia en la nube
 * de la computadora al celular sin tipear 40 caracteres (app.js: «📱 Pasar
 * al celular»).  El QR lleva la dirección de la app con el token en el
 * fragmento (#gist=…), que no viaja a ningún servidor.
 *
 * Lo justo de la norma (ISO/IEC 18004): modo byte, corrección de errores L,
 * versiones 1 a 9 (hasta 230 bytes), la máscara de menor penalidad.
 *
 *   QR.matrix("texto")      → filas de 0/1 (null si no entra)
 *   QR.svg("texto", 220)    → un <svg> con margen, o ""
 *
 * tools/lib/test_qr.js lo compara módulo a módulo con códigos de referencia.
 */
(function (root) {
  "use strict";

  // per version (level L): total codewords, error correction codewords per block, blocks
  var VERS = [null, [26, 7, 1], [44, 10, 1], [70, 15, 1], [100, 20, 1], [134, 26, 1],
              [172, 18, 2], [196, 20, 2], [242, 24, 2], [292, 30, 2]];
  var ALIGN = [null, [], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46]];

  /* ---- GF(256) y Reed-Solomon ---- */
  var EXP = [], LOG = [];
  (function () {
    var x = 1;
    for (var i = 0; i < 255; i++) { EXP[i] = x; LOG[x] = i; x <<= 1; if (x & 256) x ^= 0x11d; }
    for (i = 255; i < 512; i++) EXP[i] = EXP[i - 255];
  })();
  function mul(a, b) { return a && b ? EXP[LOG[a] + LOG[b]] : 0; }
  function generator(n) {
    var g = [1];
    for (var i = 0; i < n; i++) {
      var next = [];
      for (var j = 0; j <= g.length; j++) next[j] = (j < g.length ? mul(g[j], EXP[i]) : 0) ^ (j > 0 ? g[j - 1] : 0);
      g = next;
    }
    return g.reverse();   // highest degree first
  }
  function remainder(data, n) {
    var g = generator(n), r = data.concat(new Array(n).fill(0));
    for (var i = 0; i < data.length; i++) {
      var c = r[i];
      if (!c) continue;
      for (var j = 0; j < g.length; j++) r[i + j] ^= mul(g[j], c);
    }
    return r.slice(data.length);
  }

  function utf8(text) {
    var out = [], s = unescape(encodeURIComponent(String(text)));
    for (var i = 0; i < s.length; i++) out.push(s.charCodeAt(i));
    return out;
  }

  /* ---- los datos: modo, largo, bytes, relleno y corrección ---- */
  function codewords(bytes, v) {
    var total = VERS[v][0], ecPer = VERS[v][1], blocks = VERS[v][2], dataLen = total - ecPer * blocks;
    var bits = [];
    function put(val, n) { for (var i = n - 1; i >= 0; i--) bits.push((val >> i) & 1); }
    put(4, 4);
    put(bytes.length, 8);
    bytes.forEach(function (b) { put(b, 8); });
    put(0, Math.min(4, dataLen * 8 - bits.length));
    while (bits.length % 8) bits.push(0);
    var data = [];
    for (var i = 0; i < bits.length; i += 8) data.push(parseInt(bits.slice(i, i + 8).join(""), 2));
    for (var pad = 0; data.length < dataLen; pad++) data.push(pad % 2 ? 0x11 : 0xec);
    // blocks of equal size (true for L up to version 9), interleaved
    var per = dataLen / blocks, D = [], E = [];
    for (var b = 0; b < blocks; b++) {
      D.push(data.slice(b * per, (b + 1) * per));
      E.push(remainder(D[b], ecPer));
    }
    var out = [];
    for (i = 0; i < per; i++) for (b = 0; b < blocks; b++) out.push(D[b][i]);
    for (i = 0; i < ecPer; i++) for (b = 0; b < blocks; b++) out.push(E[b][i]);
    return out;
  }

  /* ---- la grilla: patrones fijos, datos en zigzag, máscara, formato ---- */
  // val followed by the remainder of val·x^deg divided by poly (BCH)
  function bch(val, poly, len) {
    var deg = poly.toString(2).length - 1, v = val << deg;
    for (var i = len - 1; i >= deg; i--) if (v & (1 << i)) v ^= poly << (i - deg);
    return (val << deg) | v;
  }
  function build(cw, v, mask) {
    var n = 17 + 4 * v, m = [], fixed = [], r, c, i, j;
    for (r = 0; r < n; r++) { m.push(new Array(n).fill(0)); fixed.push(new Array(n).fill(false)); }
    function set(rr, cc, val) { if (rr >= 0 && rr < n && cc >= 0 && cc < n) { m[rr][cc] = val ? 1 : 0; fixed[rr][cc] = true; } }
    function finder(r0, c0) {
      for (var a = -1; a <= 7; a++) for (var b = -1; b <= 7; b++) {
        var inside = a >= 0 && a <= 6 && b >= 0 && b <= 6;
        var on = inside && (a === 0 || a === 6 || b === 0 || b === 6 || (a >= 2 && a <= 4 && b >= 2 && b <= 4));
        set(r0 + a, c0 + b, on);
      }
    }
    finder(0, 0); finder(0, n - 7); finder(n - 7, 0);
    var al = ALIGN[v];
    for (i = 0; i < al.length; i++) for (j = 0; j < al.length; j++) {
      if ((i === 0 && j === 0) || (i === 0 && j === al.length - 1) || (i === al.length - 1 && j === 0)) continue;
      for (var a = -2; a <= 2; a++) for (var b = -2; b <= 2; b++) set(al[i] + a, al[j] + b, Math.max(Math.abs(a), Math.abs(b)) !== 1);
    }
    for (i = 8; i < n - 8; i++) { set(6, i, i % 2 === 0); set(i, 6, i % 2 === 0); }
    set(n - 8, 8, 1);   // the dark module
    // reserve the format areas (written at the end)
    for (i = 0; i < 9; i++) { if (!fixed[8][i]) set(8, i, 0); if (!fixed[i][8]) set(i, 8, 0); }
    for (i = 0; i < 8; i++) { set(8, n - 1 - i, 0); if (i < 7) set(n - 1 - i, 8, 0); }
    if (v >= 7) {
      var vi = bch(v, 0x1f25, 18);
      for (i = 0; i < 18; i++) {
        var bit = (vi >> i) & 1, a2 = Math.floor(i / 3), b2 = i % 3 + n - 11;
        set(a2, b2, bit); set(b2, a2, bit);
      }
    }
    // data, two columns at a time, from the bottom right, upwards first
    var bits = [];
    cw.forEach(function (x) { for (var k = 7; k >= 0; k--) bits.push((x >> k) & 1); });
    var at = 0, up = true;
    for (c = n - 1; c > 0; c -= 2) {
      if (c === 6) c--;
      for (var k = 0; k < n; k++) {
        r = up ? n - 1 - k : k;
        for (j = 0; j < 2; j++) {
          var cc = c - j;
          if (fixed[r][cc]) continue;
          var d = at < bits.length ? bits[at] : 0;
          at++;
          m[r][cc] = d ^ (MASKS[mask](r, cc) ? 1 : 0);
        }
      }
      up = !up;
    }
    // format: level L (01) and the mask
    var f = bch((1 << 3) | mask, 0x537, 15) ^ 0x5412;
    // bit 0 is the least significant.  One copy goes down the column 8
    // (bits 0-7 at the top, skipping the timing row; bits 8-14 at the
    // bottom); the other along the row 8 (bits 0-7 from the right end;
    // bits 8-14 at the left, skipping the timing column).
    for (i = 0; i < 15; i++) {
      var fb = (f >> i) & 1;
      if (i < 6) m[i][8] = fb; else if (i < 8) m[i + 1][8] = fb; else m[n - 15 + i][8] = fb;
      if (i < 8) m[8][n - 1 - i] = fb; else if (i === 8) m[8][7] = fb; else m[8][14 - i] = fb;
    }
    return m;
  }
  var MASKS = [
    function (r, c) { return (r + c) % 2 === 0; },
    function (r) { return r % 2 === 0; },
    function (r, c) { return c % 3 === 0; },
    function (r, c) { return (r + c) % 3 === 0; },
    function (r, c) { return (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0; },
    function (r, c) { return (r * c) % 2 + (r * c) % 3 === 0; },
    function (r, c) { return ((r * c) % 2 + (r * c) % 3) % 2 === 0; },
    function (r, c) { return ((r + c) % 2 + (r * c) % 3) % 2 === 0; }
  ];

  function penalty(m) {
    var n = m.length, p = 0, r, c, i, dark = 0;
    function runs(get) {
      for (var a = 0; a < n; a++) {
        var len = 1;
        for (var b = 1; b < n; b++) {
          if (get(a, b) === get(a, b - 1)) len++;
          else { if (len >= 5) p += len - 2; len = 1; }
        }
        if (len >= 5) p += len - 2;
      }
    }
    runs(function (a, b) { return m[a][b]; });
    runs(function (a, b) { return m[b][a]; });
    for (r = 0; r < n - 1; r++) for (c = 0; c < n - 1; c++) {
      if (m[r][c] === m[r][c + 1] && m[r][c] === m[r + 1][c] && m[r][c] === m[r + 1][c + 1]) p += 3;
    }
    var P1 = [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0], P2 = [0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1];
    function hit(get, a, b) {
      var x = true, y = true;
      for (var k = 0; k < 11; k++) { var v = get(a, b + k); if (v !== P1[k]) x = false; if (v !== P2[k]) y = false; }
      return (x ? 1 : 0) + (y ? 1 : 0);
    }
    for (r = 0; r < n; r++) for (c = 0; c <= n - 11; c++) {
      p += 40 * hit(function (a, b) { return m[a][b]; }, r, c);
      p += 40 * hit(function (a, b) { return m[b][a]; }, r, c);
    }
    for (r = 0; r < n; r++) for (i = 0; i < n; i++) dark += m[r][i];
    p += Math.floor(Math.abs(dark * 20 - n * n * 10) / (n * n)) * 10;
    return p;
  }

  function matrix(text) {
    var bytes = utf8(text), v = 0;
    for (var k = 1; k <= 9; k++) {
      // 4 bits of mode + 8 of length + the bytes must fit in the data codewords
      if (bytes.length + 2 <= VERS[k][0] - VERS[k][1] * VERS[k][2]) { v = k; break; }
    }
    if (!v) return null;
    var cw = codewords(bytes, v), best = null, bestP = Infinity;
    for (var mask = 0; mask < 8; mask++) {
      var m = build(cw, v, mask), p = penalty(m);
      if (p < bestP) { bestP = p; best = m; }
    }
    return best;
  }

  function svg(text, size) {
    var m = matrix(text);
    if (!m) return "";
    var n = m.length, q = 4, d = "";
    for (var r = 0; r < n; r++) for (var c = 0; c < n; c++) if (m[r][c]) d += "M" + (c + q) + " " + (r + q) + "h1v1h-1z";
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + (n + 2 * q) + " " + (n + 2 * q) + '" width="' + (size || 220) +
      '" height="' + (size || 220) + '" shape-rendering="crispEdges" role="img" aria-label="Código QR">' +
      '<rect width="100%" height="100%" fill="#fff"/><path d="' + d + '" fill="#000"/></svg>';
  }

  var api = { matrix: matrix, svg: svg };
  if (typeof module === "object" && module.exports) module.exports = api;
  root.QR = api;
})(typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : this);
