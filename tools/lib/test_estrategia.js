/* «💡 Estrategia de la semana» (docs/js/estrategia.js,
 * lang/<código>/estrategia_data.js), en los tres idiomas:
 * - cada estrategia tiene id único, texto corto en castellano (dos líneas
 *   como mucho), semanas válidas y cursivas bien cerradas;
 * - cada grupo de misión que el idioma muestra tiene estrategia todas las
 *   semanas en que puede aparecer, y dos semanas seguidas no repiten la
 *   misma cuando hay dos o más;
 * - aparece una vez por semana y grupo (y otra con «¿Te sirvió?» si no
 *   tuvo voto), no si la misión está hecha ni si el alumno las apagó; el 👍/👎 se guarda y llega al cierre semanal;
 * - el guardado descarta un state.strat roto; el núcleo no nombra idiomas;
 * - app.js la muestra antes de la misión tocada, en Ajustes y en el cierre.
 *   Run: node tools/lib/test_estrategia.js */
"use strict";
var fs = require("fs"), path = require("path");
var pack = require("./pack.js");
var Boot = require(path.join(pack.DOCS, "js", "boot.js"));
var T = require("./testkit.js")("es"), ok = T.ok;

var SRC = fs.readFileSync(path.join(pack.DOCS, "js", "estrategia.js"), "utf8");
ok(!/italian|portugu|brasil|alem[aá]n|deutsch|\bLa Via\b|Rumo C1|Weg C1/i.test(SRC.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "")), "estrategia.js no nombra ningún idioma");
ok(Boot.coreFiles().indexOf("js/estrategia.js") >= 0, "el service worker guarda estrategia.js");
var APP = fs.readFileSync(path.join(pack.DOCS, "js", "app.js"), "utf8");
ok(/Estrategia\.before\(wk, kind, done, start\)/.test(APP), "la misión tocada pasa por la estrategia");
ok(/data-m\][\s\S]{0,200}missionTap\(b\.dataset\.m, b\.dataset\.arg/.test(APP), "los botones de misión del percorso usan missionTap");
ok(/missionTap\(nm\.kind, nm\.arg, false, w\.week, function \(\) \{ view\.tab = "percorso"; \}\)/.test(APP), "«Seguir» en Oggi también, y cambia de pestaña solo al empezar (cerrar la hoja deja en Oggi)");
ok(/Estrategia\.reflectLine\(state, prevWk\)/.test(APP), "el cierre semanal muestra los 👍/👎");
ok(/id="stratset"/.test(APP) && /Estrategia\.setOff\(state, !sts\.checked\)/.test(APP), "Ajustes las prende y apaga");
ok(/Estrategia\.init\(/.test(APP), "app.js le pasa el estado");
var ENG = fs.readFileSync(path.join(pack.DOCS, "js", "engine.js"), "utf8");
ok(/MODULE_OBJ = \[[^\]]*"strat"/.test(ENG), "state.strat entre los campos de módulo del guardado");

// The groups each language really shows (the missions of its weekPlan).
var SHOWN = {
  it: ["escucha", "oido", "lectura", "escritura", "palabras", "frases", "practica", "dominala", "leccion", "capire", "parla", "falsos"],
  pt: ["escucha", "oido", "lectura", "escritura", "palabras", "frases", "practica", "dominala", "leccion", "capire", "parla", "falsos"],
  de: ["palabras", "practica", "dominala", "leccion", "capire"]
};

pack.ALL.forEach(function (code) {
  var L = code + " · ";
  ok(Boot.langFiles(code).indexOf("lang/" + code + "/estrategia_data.js") >= 0, L + "estrategia_data.js en los archivos del idioma");
  var ctx = pack(code, { upTo: "app.js" });
  var E = ctx.Estrategia, D = ctx.ESTRATEGIA_DATA;
  ok(E && D && D.GROUPS, L + "estrategia.js y estrategia_data.js cargados en el orden de boot.js");
  if (!E || !D) return;
  var groups = Object.keys(E.GROUP).map(function (k) { return E.GROUP[k]; });
  var ids = {};
  Object.keys(D.GROUPS).forEach(function (g) {
    ok(groups.indexOf(g) >= 0, L + "grupo conocido por el núcleo: " + g);
    D.GROUPS[g].forEach(function (s) {
      var W = L + g + "." + s.id + " · ";
      ok(/^[a-z0-9-]+$/.test(s.id || ""), W + "id corto");
      ok(!ids[s.id], W + "id único en el idioma");
      ids[s.id] = 1;
      ok(typeof s.t === "string" && s.t.length >= 40 && s.t.length <= 200, W + "texto de dos líneas como mucho (" + (s.t || "").length + ")");
      ok((s.t.match(/\*/g) || []).length % 2 === 0, W + "cursivas cerradas");
      ok(!/<|>/.test(s.t), W + "sin html");
      var from = s.from || 1, to = s.to || 52;
      ok(from >= 1 && to <= 52 && from <= to, W + "semanas válidas: " + from + "-" + to);
      // Spanish with voseo (the instructions talk to the learner)
      var es = s.t.replace(/\*[^*]*\*/g, "");
      ok(/[áéíóú]/.test(es) || /^[A-Z¿]/.test(s.t), W + "en castellano");
      ok(!/(^|[\s:;,.¿¡(])(aprende|mira|piensa|escúchala|lee|repite|decide|elige|fíjate|di|haz|pon|ten|prueba|busca|tienes|puedes|sabes|quieres)([\s,.:;!?)]|$)/i.test(es),
        W + "en voseo, sin tuteo");
    });
  });
  // every group shown has a strategy every week, without repeating two weeks in a row
  SHOWN[code].forEach(function (g) {
    var kind = Object.keys(E.GROUP).filter(function (k) { return E.GROUP[k] === g; })[0];
    var miss = [], rep = [];
    for (var w = 1; w <= 52; w++) {
      var p = E.pick(w, kind);
      if (!p) miss.push(w);
      else if (w > 1) {
        var q = E.pick(w - 1, kind);
        if (q && q.id === p.id && E.eligible(g, w).length > 1) rep.push(w);
      }
    }
    ok(!miss.length, L + g + ": estrategia todas las semanas (faltan: " + miss.join(", ") + ")");
    ok(!rep.length, L + g + ": no repite dos semanas seguidas (" + rep.join(", ") + ")");
    var seen = {};
    for (var w2 = 1; w2 <= 52; w2++) seen[E.pick(w2, kind).id] = 1;
    ok(Object.keys(seen).length === D.GROUPS[g].length, L + g + ": todas las del grupo salen en el año");
  });
  ok(E.groupOf("radio") === (D.GROUPS.escucha ? "escucha" : null), L + "Radio es del grupo escucha (si hay)");
  ok(E.groupOf("fuera") === null && E.pick(10, "fuera") === null, L + "una misión sin grupo no tiene estrategia");

  /* ------------------------------------------------ una vez, votos, cierre */
  var st = { cards: {} };
  ok(E.shouldShow(st, 10, "vocab", false), L + "palabras, semana 10: aparece");
  ok(!E.shouldShow(st, 10, "vocab", true), L + "no aparece si la misión ya está hecha");
  ok(!E.shouldShow(null, 10, "vocab", false), L + "sin estado, no aparece");
  E.seen(st, 10, "vocab");
  ok(E.shouldShow(st, 10, "vocab", false), L + "vista una vez sin 👍/👎: vuelve una vez más («¿Te sirvió?»)");
  E.seen(st, 10, "vocab");
  ok(!E.shouldShow(st, 10, "vocab", false), L + "vista dos veces esa semana: no vuelve");
  ok(E.shouldShow(st, 11, "vocab", false), L + "la semana siguiente, sí");
  ok(E.shouldShow(st, 10, "play2", false), L + "otro grupo la misma semana, sí");
  var p10 = E.pick(10, "play2");
  var v = E.vote(st, 10, "play2", 1);
  ok(v && v.v === 1 && v.w === 10 && st.strat.votes[p10.id] === v, L + "👍 guardado por estrategia");
  ok(!E.shouldShow(st, 10, "play2", false), L + "votar cuenta como vista, y con voto no vuelve");
  E.vote(st, 10, "play2", -1);
  ok(st.strat.votes[p10.id].v === -1, L + "el último voto cuenta");
  E.vote(st, 10, "lez", 1);
  var wk = ctx.Engine.weekKey(new Date());
  var r = E.weekVotes(st, wk);
  ok(r.up === 1 && r.down === 1 && r.best && r.best.id === E.pick(10, "lez").id && r.best.t === E.pick(10, "lez").t, L + "los votos de esta semana: 👍 1 · 👎 1, con la que sirvió");
  var line = E.reflectLine(st, wk);
  ok(/👍 1/.test(line) && /👎 1/.test(line) && /Te sirvió/.test(line), L + "la línea del cierre: " + line.replace(/<[^>]+>/g, ""));
  ok(/<i lang="[a-z]{2}-[A-Z]{2}">/.test(E.reflectLine(st, wk)) || !/\*/.test(E.pick(10, "lez").t), L + "lo de la lengua, en cursiva con su lang");
  ok(E.reflectLine(st, ctx.Engine.weekKey(new Date(Date.now() - 7 * 864e5))) === "", L + "la semana anterior, sin votos: sin línea");
  // a 👍 to a strategy no longer in the data: no «Ninguna te sirvió»
  var gone = { strat: { votes: { "ya-no-existe": { v: 1, w: 3, at: Date.now() } } } };
  ok(!/Ninguna/.test(E.reflectLine(gone, wk)) && /👍 1/.test(E.reflectLine(gone, wk)), L + "un 👍 a una estrategia borrada no dice «Ninguna te sirvió»");
  ok(E.reflectLine({}, wk) === "" && E.weekVotes({ strat: "roto" }, wk).up === 0, L + "sin votos o con el campo roto: nada");
  E.setOff(st, true);
  ok(!E.shouldShow(st, 12, "vocab", false), L + "apagadas: no aparecen");
  E.setOff(st, false);
  ok(E.shouldShow(st, 12, "vocab", false), L + "prendidas de nuevo: aparecen");
  // the save drops a broken field
  var bad = ctx.Engine.sanitize ? ctx.Engine.sanitize({ strat: "roto" }) : null;
  if (bad) ok(!("strat" in bad) || bad.strat == null, L + "el guardado descarta un state.strat roto");
  var good = ctx.Engine.sanitize ? ctx.Engine.sanitize({ strat: { seen: { "3:palabras": 1 }, votes: {} } }) : null;
  if (good) ok(good.strat && good.strat.seen["3:palabras"] === 1, L + "y conserva uno sano");
  // without a browser, before() just goes on
  var went = 0;
  E.init({ state: function () { return { strat: { off: true } }; } });
  E.before(10, "vocab", false, function () { went++; });
  ok(went === 1, L + "apagadas: before() sigue de largo a la misión");
});

T.done();
