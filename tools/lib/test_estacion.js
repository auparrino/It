/* «Estación» (docs/js/estacion.js): un repaso cada tres semanas, en los tres
 * idiomas:
 * - las tandas cierran en las semanas 3, 6, 9, 12, 16, 19… (la 3.ª, 6.ª, 9.ª
 *   y 12.ª de cada estación), nunca en un jefe (13, 26, 39, 52);
 * - la misión aparece en la semana siguiente (la 13 también: antes del
 *   jefe), es opcional (no frena el avance) y queda hecha con 60 % en las
 *   primeras respuestas;
 * - la ronda: 15 ítems de esas tres semanas, sin repetir, sin escucha,
 *   alternando semanas, la producción escrita primero y lo fallado antes
 *   que lo sabido; si en esas semanas se abrió un duelo, sus oraciones;
 * - el balance: por semana y por duelo, con semáforo; se guarda en
 *   state.estacion y el guardado descarta uno roto;
 * - el núcleo no nombra ningún idioma; app.js lo llama en la semana, la
 *   ronda y el resultado.
 *   Run: node tools/lib/test_estacion.js */
"use strict";
var fs = require("fs"), path = require("path");
var pack = require("./pack.js");
var Boot = require(path.join(pack.DOCS, "js", "boot.js"));
var T = require("./testkit.js")("es"), ok = T.ok;

var SRC = fs.readFileSync(path.join(pack.DOCS, "js", "estacion.js"), "utf8");
ok(!/italian|portugu|brasil|deutsch|alem/i.test(SRC.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "")), "estacion.js no nombra ningún idioma");
ok(Boot.coreFiles().indexOf("js/estacion.js") >= 0, "el service worker guarda estacion.js");
var ORD = Boot.ORDER.map(function (e) { return e.lang || e.core || e.shared; });
ok(ORD.indexOf("estacion.js") > ORD.indexOf("drills.js") && ORD.indexOf("estacion.js") > ORD.indexOf("duelli.js") &&
   ORD.indexOf("estacion.js") < ORD.indexOf("app.js"), "estacion.js se carga después de drills.js y duelli.js");
var APP = fs.readFileSync(path.join(pack.DOCS, "js", "app.js"), "utf8");
ok((APP.match(/Estacion\.missions\(w, state, course\)\.forEach\(m\)/g) || []).length === 2, "weekPlan llama a Estacion.missions (semana común y semana del jefe)");
ok(/Estacion\.handles\(kind\)\) startRound\("estacion", arg\)/.test(APP), "goMission arranca la ronda de la estación");
ok(/kind === "estacion"\) items = window\.Estacion \? Estacion\.build\(course, arg, state/.test(APP), "startRound arma la ronda");
ok(/Estacion\.roundDone\(state, round\.arg, round\.log, course\)/.test(APP), "al terminar se guarda el balance");
ok(/Estacion\.balanceHtml\(state, round\.arg, course\)/.test(APP), "el resultado muestra el balance");
ok(/estacion: "Estación"/.test(APP), "la ronda tiene nombre (para retomarla)");

var ENDS = [3, 6, 9, 12, 16, 19, 22, 25, 29, 32, 35, 38, 42, 45, 48, 51];
var WRITTEN = { cloze: 1, translate: 1, conjugate: 1, plural: 1, numbers: 1, qa: 1, typed: 1, write: 1, fixerr: 1, garden: 1, combina: 1 };

pack.ALL.forEach(function (code) {
  var L = code + " · ";
  var ctx = pack(code);
  var S = ctx.Estacion, E = ctx.Engine, Dr = ctx.Drills, Du = ctx.Duelli;
  ok(S && E && Dr, L + "estacion.js cargado");
  if (!S) return;
  var course = pack.data(code, "course.json");
  var map = Dr.itemsById(course);
  T.eq(S.ends(course), ENDS, L + "las tandas");
  ok([13, 26, 39, 52].every(function (b) { return S.ends(course).indexOf(b) < 0; }), L + "ninguna tanda cierra en un jefe");
  T.eq(S.forWeek(course, 4), { end: 3, weeks: [1, 2, 3] }, L + "la semana 4 repasa la 1-3");
  ok(S.forWeek(course, 5) === null && S.forWeek(course, 3) === null && S.forWeek(course, 14) === null, L + "las otras semanas no tienen estación");
  ok(S.forWeek(course, 13).end === 12 && S.forWeek(course, 17).end === 16 && S.forWeek(course, 52).end === 51, L + "la 13, la 17 y la 52");

  // the mission: optional, in the week after
  var st = E.fromRaw({ xp: 0, cards: {} });
  var m4 = S.missions(course.weeks[3], st, course);
  ok(m4.length === 1 && m4[0].kind === "estacion" && m4[0].arg === "3" && m4[0].opt === true && !m4[0].done && !m4[0].half, L + "misión opcional de la semana 4");
  ok(/15 minutos/.test(m4[0].sub) && /1 a 3/.test(m4[0].sub), L + "dice cuánto tarda y qué semanas");
  ok(!S.missions(course.weeks[4], st, course).length, L + "la semana 5 no la tiene");
  ok(S.handles("estacion") && !S.handles("duello"), L + "handles");

  ENDS.forEach(function (end) {
    var items = S.build(course, end, st, { map: map });
    var ids = items.map(function (it) { return it.id; });
    ok(items.length === S.SIZE, L + "s" + end + ": " + S.SIZE + " ítems (dio " + items.length + ")");
    ok(ids.every(function (id, i) { return ids.indexOf(id) === i; }), L + "s" + end + ": sin repetir");
    ok(items.every(function (it) { return it.type !== "listen" && it.type !== "dictation"; }), L + "s" + end + ": sin escucha");
    var wkOf = function (it) {
      for (var n = end; n >= end - 2; n--) if ((course.weeks[n - 1].items || []).indexOf(it.id) >= 0) return n;
      return null;
    };
    var bad = items.filter(function (it) { return !/^duel:/.test(it.id) && !wkOf(it); });
    ok(!bad.length, L + "s" + end + ": todo de las semanas " + (end - 2) + "-" + end + (bad.length ? " (" + bad[0].id + ")" : ""));
    var plain = items.filter(function (it) { return !/^duel:/.test(it.id); });
    var wk = {}; plain.forEach(function (it) { wk[wkOf(it)] = 1; });
    ok(Object.keys(wk).length === 3, L + "s" + end + ": de las tres semanas");
    ok(wkOf(plain[0]) !== wkOf(plain[1]) && wkOf(plain[1]) !== wkOf(plain[2]), L + "s" + end + ": intercaladas");
    // written first: the round has as many written as the weeks can give
    var avail = 0;
    [end - 2, end - 1, end].forEach(function (n) {
      (course.weeks[n - 1].items || []).forEach(function (id) { var it = map[id]; if (it && WRITTEN[it.type] && !it.options) avail++; });
    });
    var wr = plain.filter(function (it) { return WRITTEN[it.type] && !it.options; }).length;
    ok(wr >= Math.min(plain.length, avail) - 2, L + "s" + end + ": la producción primero (" + wr + " escritos de " + plain.length + ")");
    var duels = Du && Du.DUELLI ? Du.DUELLI.filter(function (d) { return d.week >= end - 2 && d.week <= end; }) : [];
    var nd = items.filter(function (it) { return /^duel:/.test(it.id); }).length;
    ok(duels.length ? nd >= 1 && nd <= 3 : nd === 0, L + "s" + end + ": duelos " + nd + " (abiertos: " + duels.length + ")");
  });

  // at random, many times: never the same item twice, always interleaved
  var dup = 0, rr;
  for (rr = 0; rr < 20; rr++) ENDS.forEach(function (end) {
    var ids = S.build(course, end, st, { map: map }).map(function (it) { return it.id; });
    if (ids.some(function (id, i) { return ids.indexOf(id) !== i; })) dup++;
  });
  ok(!dup, L + "20 sorteos por tanda sin repetidos (" + dup + ")");

  // a failed item comes back first
  var w2 = course.weeks[1], failed = (w2.items || []).map(function (id) { return map[id]; })
    .filter(function (it) { return it && WRITTEN[it.type] && !it.options; }).slice(-1)[0];
  if (failed) {
    var st2 = E.fromRaw({ xp: 0, cards: {} }), cnt = 0;
    st2.cards[failed.id] = { reps: 0, seen: 3, due: 0, ease: 2.5 };
    for (var r = 0; r < 5; r++) if (S.build(course, 3, st2, { map: map }).some(function (it) { return it.id === failed.id; })) cnt++;
    ok(cnt === 5, L + "lo que fallaste entra siempre (" + cnt + " / 5)");
  }

  // the balance
  var it1 = course.weeks[0].items.map(function (id) { return map[id]; }).filter(Boolean)[0];
  var it3 = course.weeks[2].items.map(function (id) { return map[id]; }).filter(Boolean);
  var R = E.VERDICT.RIGHT, W = E.VERDICT.WRONG, log = [];
  for (var i = 0; i < 5; i++) log.push({ id: it3[i].id, verdict: R });
  log.push({ id: it1.id, verdict: W }, { id: it1.id, verdict: R, retry: true });
  log.push({ id: it3[5].id, verdict: W, fixed: true, old: true });
  var st3 = E.fromRaw({ xp: 0, cards: {} });
  var res = S.roundDone(st3, "3", log, course);
  ok(res.pct === Math.round(6 / 7 * 100), L + "el porcentaje cuenta las primeras respuestas, las reglas viejas y lo corregido por vos (" + res.pct + ")");
  T.eq(res.rows.map(function (x) { return [x.k, x.ok, x.n]; }), [["w:1", 0, 1], ["w:3", 6, 6]], L + "filas por semana");
  ok(st3.estacion[3] && st3.estacion[3].best === res.pct, L + "se guarda en state.estacion");
  var mm = S.missions(course.weeks[3], st3, course)[0];
  ok(mm.done && /Hecha/.test(mm.sub) && /flojo: semana 1/.test(mm.sub), L + "la misión queda hecha y dice qué salió flojo");
  var html = S.balanceHtml(st3, 3, course);
  ok(/🔴/.test(html) && /🟢/.test(html) && /volvé a su lección/.test(html), L + "el balance con semáforo");
  S.roundDone(st3, 3, [{ id: it1.id, verdict: W }, { id: it3[0].id, verdict: W }], course);
  mm = S.missions(course.weeks[3], st3, course)[0];
  ok(mm.done && st3.estacion[3].pct === 0 && st3.estacion[3].best === res.pct, L + "el mejor intento se conserva");
  var st4 = E.fromRaw({ xp: 0, cards: {} });
  S.roundDone(st4, 6, [{ id: it1.id, verdict: W }], course);
  mm = S.missions(course.weeks[6], st4, course)[0];
  ok(!mm.done && mm.half && /Te falta: 60 %/.test(mm.sub), L + "por debajo del 60 %: a medias");
  if (Du && Du.DUELLI && Du.DUELLI.length) {
    var d = Du.DUELLI[0], st5 = E.fromRaw({ xp: 0, cards: {} });
    var rd = S.roundDone(st5, d.week, [{ id: "duel:" + d.id + ":0", verdict: R }, { id: "duel:" + d.id + ":0:cue", verdict: W }], course);
    T.eq(rd.rows.map(function (x) { return x.k; }), ["d:" + d.id], L + "el duelo, en su fila (la pista no cuenta)");
    ok(S.balanceHtml(st5, d.week, course).indexOf("Duelo: ") >= 0, L + "el balance nombra el duelo");
    // «flojo: duelo: imperativo: tu o Lei»: the title keeps its capitals
    var dc = Du.DUELLI.filter(function (x) { return /[A-Z]/.test(x.title) && S.ends(course).indexOf(x.week) >= 0; })[0];
    if (dc) {
      var st6 = E.fromRaw({ xp: 0, cards: {} });
      S.roundDone(st6, dc.week, [{ id: "duel:" + dc.id + ":0", verdict: W }], course);
      var sub6 = S.missions(course.weeks[dc.week], st6, course)[0].sub;
      ok(sub6.indexOf("flojo: duelo: " + dc.title) >= 0, L + "lo flojo conserva las mayúsculas del duelo (" + sub6 + ")");
      ok(S.balanceHtml(st6, dc.week, course).indexOf("Lo flojo: duelo: " + dc.title) >= 0, L + "también en el balance");
    }
  }

  // the save
  ok(E.MODULE_OBJ.indexOf("estacion") >= 0, L + "state.estacion es un campo de módulo del guardado");
  ok(!("estacion" in E.fromRaw({ xp: 1, cards: {}, estacion: "roto" })), L + "un state.estacion roto se descarta");
  ok(E.fromRaw({ xp: 1, cards: {}, estacion: { 3: { pct: 70 } } }).estacion[3].pct === 70, L + "uno bien formado se conserva");
});

T.done();
