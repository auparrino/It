/* El color del género en alemán (Signalgrammatik: docs/lang/de/rules.js
   LANG.rules.gender, app.js genderPaint y genderNotice, theme.css):
   - el léxico sale de las palabras de la semana y de las tablas «Palabra |
     Artículo» de las lecciones; los plurales (die Eltern) quedan aparte;
   - el color es el del sustantivo, no el del artículo: «der Mutter» va en
     rojo, «die Zimmer» en amarillo, «die Tisch» no se pinta;
   - el aviso de la corrección («es die Sonne») sale solo cuando el
     artículo dice otro género, no otro caso;
   - pintar un pedazo de página (un DOM mínimo) envuelve solo el artículo,
     no toca los atributos y pinta las columnas que nombran un género;
   - italiano y portugués no tienen nada de esto, y el tema alemán trae los
     cuatro colores en claro y en oscuro con contraste AA.
     node tools/lib/test_genero.js */
"use strict";
var fs = require("fs"), path = require("path");
var pack = require("./pack.js");
var T = require("./testkit.js")("de"), ok = T.ok, eq = T.eq;

var c = pack("de"), G = c.LANG.rules && c.LANG.rules.gender;
ok(!!G, "de: LANG.rules.gender existe");
var n = G.learn(pack.data("de", "course.json"));
ok(n >= 400, "de: el léxico tiene los sustantivos del curso (" + n + ")");

// the gender of the noun, with the article that goes with it
[["der", "Tisch", "m"], ["die", "Sonne", "f"], ["das", "Mädchen", "n"], ["der", "Mond", "m"],
 ["der", "Mutter", "f"],          // dative: the color of die Mutter
 ["die", "Zimmer", "pl"],         // the plural of das Zimmer
 ["die", "Kinder", "pl"], ["den", "Kindern", "pl"], ["die", "Bücher", "pl"], ["die", "Lampen", "pl"],
 ["die", "Eltern", "pl"], ["die", "Geschwister", "pl"],
 ["den", "Kollegen", "m"],        // n-Deklination: singular
 ["des", "Tisches", "m"], ["einen", "Bruder", "m"], ["eine", "Tasche", "f"], ["ein", "Buch", "n"],
 ["Der", "Handschuh", "m"],       // a compound: der Schuh
 ["die", "U-Bahn", "f"],
 ["die", "Tisch", null], ["das", "Tisch", null], ["eine", "Bruder", null]   // wrong: no color
].forEach(function (x) { eq(G.of(x[0], x[1]), x[2], "de: " + x[0] + " " + x[1]); });

// in a text: only the articles, with the adjectives in between
var ms = G.marks("Der kleine, alte Tisch und die Lampen. Mit der Mutter. Das ist ein Buch. Kaffee, die Milch.");
eq(ms.map(function (m) { return m.art + ":" + m.g; }), ["Der:m", "die:pl", "der:f", "ein:n", "die:f"], "de: los artículos de un texto");
eq(G.marks("Das ist gut. Er sagt, dass Kinder spielen.").length, 0, "de: «Das ist», «dass Kinder» no son artículo + sustantivo");
eq(G.marks("el sol, la luna, de la casa").length, 0, "de: el castellano no se pinta");

// the warning of the correction
var no = G.notice("der Sonne scheint", "Die Sonne scheint.");
ok(no && no.g === "f" && no.said === "der Sonne", "de: «der Sonne» → es die Sonne (" + JSON.stringify(no) + ")");
var h = G.noticeHtml("der Sonne scheint", "Die Sonne scheint.");
ok(/es <b[^>]*><span class="gen gen-f mk"[^>]*>Die<\/span> Sonne<\/b> \(femenino\)/.test(h), "de: el aviso pinta «die Sonne» en rojo: " + h);
ok(/no «<span[^>]*>der Sonne<\/span>»/.test(h), "de: el aviso dice lo que escribiste");
ok(G.notice("Ich habe eine Bruder", "Ich habe einen Bruder.") && G.notice("Ich habe eine Bruder", "Ich habe einen Bruder.").g === "m", "de: «eine Bruder» → masculino");
eq(G.notice("Ich habe ein Bruder", "Ich habe einen Bruder."), null, "de: «ein Bruder» por «einen» es el caso, no el género");
eq(G.notice("Ich helfe die Mutter", "Ich helfe der Mutter."), null, "de: «die Mutter» por «der Mutter» es el caso, no el género");
eq(G.notice("Das Tisch ist neu", "Der Tisch ist neu."), { said: "Das Tisch", art: "Der", adj: "", noun: "Tisch", g: "m" }, "de: «Das Tisch» → der Tisch");
eq(G.notice("Die Sonne scheint", "Die Sonne scheint."), null, "de: bien escrito, sin aviso");
eq(G.notice("", "Die Sonne scheint."), null, "de: sin respuesta, sin aviso");

// what is not an article + noun: a pronoun, a determiner in between, a relative
[["Ist das Ihre Wohnung?", []], ["Ich denke, dass das keine gute Idee ist.", []],
 ["das Auto, das letzte Woche repariert wurde", ["das:n"]], ["Das Auto, das Peter fährt.", ["Das:n"]],
 ["Das ist das Café, wo wir uns kennen.", ["das:n"]]]
  .forEach(function (x) { eq(G.marks(x[0]).map(function (m) { return m.art + ":" + m.g; }), x[1], "de: «" + x[0] + "»"); });
// the article of another noun is not the one written (den Mann mit Frau)
eq(G.notice("Ich sehe den Mann mit Frau", "Ich sehe den Mann mit der Frau."), null, "de: «den» es de Mann, no de Frau");
eq((G.notice("Ich habe eine kleinen Bruder", "Ich habe einen kleinen Bruder.") || {}).said, "eine kleinen Bruder", "de: el aviso cita lo escrito, con el adjetivo");

// the gender a table header names
[["Masculino", "m"], ["Nom. masc.", "m"], ["femenino", "f"], ["Neutro", "n"], ["Plural", "pl"], ["Dativ plural", "pl"],
 ["der Balkon", "m"], ["die Küche", "f"], ["Singular", null], ["Género", null], ["Castellano", null],
 ["Neutro o formal", null], ["citar (plural)", null], ["nominativo masculino", "m"], ["un femenino", "f"]]
  .forEach(function (x) { eq(G.head(x[0]), x[1], "de: la columna «" + x[0] + "»"); });

/* ------------------------------------------------ a minimal DOM to paint */
function Text(v) { this.nodeType = 3; this.nodeValue = v; this.nodeName = "#text"; this.parentNode = null; }
Text.prototype.splitText = function (off) {
  var rest = new Text(this.nodeValue.slice(off));
  this.nodeValue = this.nodeValue.slice(0, off);
  this.parentNode.insertAfter(rest, this);
  return rest;
};
function El(tag, cls, kids) {
  this.nodeType = 1; this.nodeName = tag.toUpperCase(); this.className = cls || ""; this.attrs = {}; this.childNodes = [];
  this.parentNode = null; this.ownerDocument = DOC;
  (kids || []).forEach(function (k) { this.append(typeof k === "string" ? new Text(k) : k); }, this);
}
El.prototype.append = function (k) { k.parentNode = this; this.childNodes.push(k); return k; };
El.prototype.insertAfter = function (k, ref) { k.parentNode = this; this.childNodes.splice(this.childNodes.indexOf(ref) + 1, 0, k); };
El.prototype.replaceChild = function (k, old) { k.parentNode = this; this.childNodes[this.childNodes.indexOf(old)] = k; };
El.prototype.getAttribute = function (a) { return a === "class" ? this.className : this.attrs[a] == null ? null : this.attrs[a]; };
El.prototype.setAttribute = function (a, v) { if (a === "class") this.className = v; else this.attrs[a] = String(v); };
Object.defineProperty(El.prototype, "firstChild", { get: function () { return this.childNodes[0] || null; } });
Object.defineProperty(El.prototype, "children", { get: function () { return this.childNodes.filter(function (k) { return k.nodeType === 1; }); } });
Object.defineProperty(El.prototype, "textContent", {
  get: function () { return this.childNodes.map(function (k) { return k.nodeType === 3 ? k.nodeValue : k.textContent; }).join(""); },
  set: function (v) { this.childNodes = []; this.append(new Text(v)); }
});
[Text, El].forEach(function (C) {
  Object.defineProperty(C.prototype, "nextSibling", { get: function () {
    var p = this.parentNode; if (!p) return null; return p.childNodes[p.childNodes.indexOf(this) + 1] || null;
  } });
});
function all(el, test, out) {
  out = out || [];
  el.childNodes.forEach(function (k) { if (k.nodeType === 1) { if (test(k)) out.push(k); all(k, test, out); } });
  return out;
}
// the selectors gPaint uses: «table», «thead th», «tbody tr», «.rowcard», «.rc-h»…
El.prototype.querySelectorAll = function (sel) {
  var self = this;
  var one = function (root, s) {
    var parts = s.trim().split(/\s+/), cur = [root];
    parts.forEach(function (p) {
      var next = [];
      cur.forEach(function (r) {
        all(r, function (k) { return p.charAt(0) === "." ? (" " + k.className + " ").indexOf(" " + p.slice(1) + " ") >= 0 : k.nodeName === p.toUpperCase(); })
          .forEach(function (k) { if (next.indexOf(k) < 0) next.push(k); });
      });
      cur = next;
    });
    return cur;
  };
  return sel.split(",").reduce(function (acc, s) { return acc.concat(one(self, s)); }, []);
};
El.prototype.querySelector = function (sel) { return this.querySelectorAll(sel)[0] || null; };
function html(el) {
  if (el.nodeType === 3) return el.nodeValue;
  var a = (el.className ? ' class="' + el.className + '"' : "") + Object.keys(el.attrs).map(function (k) { return " " + k + '="' + el.attrs[k] + '"'; }).join("");
  return "<" + el.nodeName.toLowerCase() + a + ">" + el.childNodes.map(html).join("") + "</" + el.nodeName.toLowerCase() + ">";
}
var DOC = { createElement: function (t) { return new El(t); } };

// the week's words: «der Tisch» with the form beside the color; the button's label untouched
var words = new El("div", "card wwords", [
  new El("div", "mission word", [new El("button", "mi say", ["🔊"]), new El("span", "", [new El("b", "", ["der Tisch"]), new El("small", "", ["la mesa · Das ist ein Tisch."])])]),
  new El("div", "mission word", [new El("span", "", [new El("b", "", ["die Eltern"]), new El("small", "", ["los padres"])])]),
  new El("div", "mission word", [new El("span", "", [new El("b", "", ["gut"]), new El("small", "", ["bien"])])])
]);
words.childNodes[0].childNodes[0].setAttribute("aria-label", "Escuchar der Tisch");
var painted = G.paint(words, { mark: true });
var out = html(words);
ok(/<b><span class="gen gen-m mk" title="masculino">der<\/span> Tisch<\/b>/.test(out), "de: Palabras de la semana: der Tisch en azul, con su forma: " + out);
ok(/<span class="gen gen-n mk" title="neutro">ein<\/span> Tisch/.test(out) === false, "de: «ein Tisch» es masculino, no neutro");
ok(/<span class="gen gen-m mk" title="masculino">ein<\/span> Tisch/.test(out), "de: el ejemplo «ein Tisch» también en azul");
ok(/<span class="gen gen-pl mk" title="plural">die<\/span> Eltern/.test(out), "de: die Eltern en amarillo (plural)");
ok(/aria-label="Escuchar der Tisch"/.test(out), "de: los atributos no se tocan");
eq(painted, 3, "de: tres artículos pintados");
eq(G.paint(words, { mark: true }), 0, "de: pintar dos veces no cambia nada");
eq(html(words), out, "de: la segunda pasada deja la página igual");

// the article and its noun in two tags: «<i>der</i> Mond»
var ex = new El("li", "", [new El("span", "it", [new El("i", "it", ["der"]), " Mond"]), new El("span", "es", ["la luna"])]);
G.paint(ex);
ok(/<i class="it"><span class="gen gen-m" title="masculino">der<\/span><\/i> Mond/.test(html(ex)), "de: «*der* Mond» en azul: " + html(ex));

// a table: the columns that name a gender, the column of articles
var tab = new El("table", "gram", [
  new El("thead", "", [new El("tr", "", [new El("th", "", ["Caso"]), new El("th", "", ["Masculino"]), new El("th", "", ["Femenino"]), new El("th", "", ["Neutro"]), new El("th", "", ["Plural"])])]),
  new El("tbody", "", [new El("tr", "", [new El("td", "k", ["Dativ"]), new El("td", "", ["dem / einem"]), new El("td", "", ["der / einer"]), new El("td", "", ["dem / einem"]), new El("td", "", ["den / – (+ n)"])])])
]);
G.paint(new El("section", "blk", [tab]));
var cells = all(tab, function (k) { return k.nodeName === "TD"; }).map(function (k) { return k.className; });
eq(cells, ["k", "gen-c gen-m", "gen-c gen-f", "gen-c gen-n", "gen-c gen-pl"], "de: cada columna en el color de su género");
// a masculine column and the plural row: die Kollegen is plural
var tab3 = new El("table", "gram", [
  new El("thead", "", [new El("tr", "", [new El("th", "", [""]), new El("th", "", ["Masculino"])])]),
  new El("tbody", "", [new El("tr", "", [new El("td", "k", ["Nominativ"]), new El("td", "", ["der Kollege"])]),
                       new El("tr", "", [new El("td", "k", ["Plural"]), new El("td", "", ["die Kollegen"])])])]);
G.paint(new El("section", "blk", [tab3]));
eq(all(tab3, function (k) { return k.nodeName === "TD"; }).map(function (k) { return k.className; }),
   ["k", "gen-c gen-m", "k", "gen-c gen-pl"], "de: la fila «Plural» manda sobre la columna «Masculino»");
var tab2 = new El("section", "blk", [new El("table", "gram", [
  new El("thead", "", [new El("tr", "", [new El("th", "", ["Palabra"]), new El("th", "", ["Artículo"]), new El("th", "", ["Castellano"])])]),
  new El("tbody", "", [new El("tr", "", [new El("td", "k", ["Sonne"]), new El("td", "", ["die"]), new El("td", "", ["el sol"])]),
                       new El("tr", "", [new El("td", "k", ["Mädchen"]), new El("td", "", ["das"]), new El("td", "", ["la chica"])])])])]);
G.paint(tab2);
eq(all(tab2, function (k) { return k.nodeName === "TD"; }).map(function (k) { return k.className; }),
   ["k", "gen-c gen-f", "", "k", "gen-c gen-n", ""], "de: la columna «Artículo» en el color de cada palabra");

/* ------------------------------------------------ the other languages and the app */
["it", "pt"].forEach(function (code) {
  var o = pack(code);
  ok(!(o.LANG.rules || {}).gender, code + ": sin color de género (solo alemán)");
  var css = fs.readFileSync(path.join(pack.DOCS, "lang", code, "theme.css"), "utf8");
  ok(css.indexOf("--gen-m") < 0, code + ": su tema no trae los colores del género");
});
var app = fs.readFileSync(path.join(pack.DOCS, "js", "app.js"), "utf8");
ok(/genderPaint\(app\(\), "\.blk, \.wwords"\)/.test(app), "app.js pinta la lección y las palabras de la semana al dibujar");
ok(/genderPaint\(\$\("#fb"\)/.test(app) && /genderPaint\(\$\("#lesfb"\)/.test(app), "app.js pinta la devolución del juego y de la lección");
ok(/genderNotice\(claimGiven, sol\)/.test(app), "app.js agrega el aviso de género a la corrección");
ok(/genderRules\(\)\.learn\(course\)/.test(app), "app.js le pasa el curso al léxico");

// the theme: four colors in light and in dark, AA on the cards and the feedback
var css = fs.readFileSync(path.join(pack.DOCS, "lang", "de", "theme.css"), "utf8");
function lum(hex) {
  var r = [1, 3, 5].map(function (i) { var v = parseInt(hex.substr(i, 2), 16) / 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
  return 0.2126 * r[0] + 0.7152 * r[1] + 0.0722 * r[2];
}
function contrast(a, b) { var x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
var light = /:root \{ (--gen-m[^}]+)\}/.exec(css), dark = /html\[data-theme="dark"\] \{ (--gen-m[^}]+)\}/.exec(css);
ok(light && dark, "de: los colores del género en claro y en oscuro");
function vars(s) { var o = {}; s.replace(/--gen-(\w+): (#[0-9a-f]{6})/g, function (_, k, v) { o[k] = v; }); return o; }
if (light && dark) {
  var L = vars(light[1]), D = vars(dark[1]);
  eq(Object.keys(L).sort(), ["f", "m", "n", "pl"], "de: cuatro colores en claro");
  eq(Object.keys(D).sort(), ["f", "m", "n", "pl"], "de: cuatro colores en oscuro");
  Object.keys(L).forEach(function (g) {
    ["#fffefa", "#f7f5f0", "#ede6d8", "#dff1e1", "#fdf0c8", "#fbe1df"].forEach(function (bg) {
      ok(contrast(L[g], bg) >= 4.5, "de: " + g + " en claro sobre " + bg + " (" + contrast(L[g], bg).toFixed(1) + ")");
    });
    ["#132031", "#0b1522", "#1d2c3f", "#0f3b2a", "#3a2f10", "#44201a"].forEach(function (bg) {
      ok(contrast(D[g], bg) >= 4.5, "de: " + g + " en oscuro sobre " + bg + " (" + contrast(D[g], bg).toFixed(1) + ")");
    });
  });
  ok(css.indexOf('html:not([data-theme="light"]) { --gen-m') >= 0, "de: el oscuro del sistema también");
}
["m", "n", "f", "pl"].forEach(function (g) {
  ok(new RegExp("\\.gen-" + g + "\\.mk::before \\{ content: \"\\\\25").test(css), "de: " + g + " lleva una forma además del color");
});

T.done();
