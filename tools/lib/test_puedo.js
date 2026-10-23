/* «Ya puedo…» (docs/js/puedo.js, tools/<código>/can.py, tools/lib/puedo.py),
 * en los tres idiomas:
 * - cada una de las 52 semanas trae en course.json `can`: 3 o 4 objetivos
 *   escritos como acciones, cada uno con 1 o 2 ítems de esa semana (la
 *   última, el examen final, puede usar ítems de antes), que se pueden
 *   probar sin escuchar;
 * - las fuentes (tools/<código>/can.py) cubren las 52 semanas y los tres
 *   build_course.py las copian con tools/lib/puedo.py, que descarta con aviso
 *   un id que ya no está en la semana;
 * - al abrir la semana se ven los objetivos; al terminar las misiones, la
 *   tarjeta «¿Ya podés…?» (sí / más o menos / todavía no); «sí» arma la
 *   prueba con los ítems atados, y al terminar queda la calibración;
 * - lo que quedó en «más o menos», «todavía no» o falló vuelve mañana en el
 *   repaso (y por eso entra en «Tus puntos débiles»);
 * - el balance se guarda en state.puedo (el guardado descarta uno roto) y la
 *   Estación lo muestra para sus tres semanas;
 * - el núcleo no nombra ningún idioma; app.js lo llama en la semana, la
 *   ronda, el resultado y la Estación.
 *   Run: node tools/lib/test_puedo.js */
"use strict";
var fs = require("fs"), path = require("path"), cp = require("child_process");
var pack = require("./pack.js");
var Boot = require(path.join(pack.DOCS, "js", "boot.js"));
var T = require("./testkit.js")("es"), ok = T.ok;

var SRC = fs.readFileSync(path.join(pack.DOCS, "js", "puedo.js"), "utf8");
ok(!/italian|portugu|brasil|deutsch|alem/i.test(SRC.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "")), "puedo.js no nombra ningún idioma");
ok(Boot.coreFiles().indexOf("js/puedo.js") >= 0, "el service worker guarda puedo.js");
var ORD = Boot.ORDER.map(function (e) { return e.lang || e.core || e.shared; });
ok(ORD.indexOf("puedo.js") > ORD.indexOf("drills.js") && ORD.indexOf("puedo.js") > ORD.indexOf("estacion.js") &&
   ORD.indexOf("puedo.js") < ORD.indexOf("app.js"), "puedo.js se carga después de drills.js y estacion.js, antes de app.js");
var APP = fs.readFileSync(path.join(pack.DOCS, "js", "app.js"), "utf8");
ok(/Puedo\.introHtml\(w, state\)/.test(APP), "la semana muestra los objetivos al abrirse");
ok(/Puedo\.cardHtml\(w, state, !pendingToAdvance\(w\)\.length\)/.test(APP), "la tarjeta aparece con las misiones hechas");
ok(/kind === "puedo"\) items = window\.Puedo \? Puedo\.items\(course, arg, itemMap\)/.test(APP), "startRound arma la prueba");
ok(/Puedo\.roundDone\(state, round\.arg, round\.log, course\)/.test(APP), "al terminar se guarda si salió");
ok(/Puedo\.resultHtml\(state, course, round\.arg\)/.test(APP), "el resultado muestra la calibración");
ok(/round\.kind === "estacion" && window\.Puedo\) html \+= Puedo\.stationHtml/.test(APP), "la Estación muestra el balance");
ok(/data-puedo/.test(APP) && /Puedo\.answer\(state, course/.test(APP), "los botones guardan la respuesta");
ok(/puedo: "¿Ya podés…\?"/.test(APP), "la ronda tiene nombre (para retomarla)");

// the sources: the 52 weeks of each language, 3 or 4 goals each
pack.ALL.forEach(function (code) {
  var f = path.join(pack.ROOT, "tools", code, "can.py");
  ok(fs.existsSync(f), code + ": tools/" + code + "/can.py existe");
  if (!fs.existsSync(f)) return;
  var py = fs.readFileSync(f, "utf8");
  var weeks = (py.match(/^ {4}(\d+): \[/gm) || []).map(function (m) { return +m.replace(/\D/g, ""); });
  T.eq(weeks, Array.apply(null, Array(52)).map(function (_, i) { return i + 1; }), code + ": can.py tiene las 52 semanas, en orden");
  var BUILD = fs.readFileSync(path.join(pack.ROOT, "tools", code, "build_course.py"), "utf8");
  ok(/puedo\.attach\(course, can\.CAN\)/.test(BUILD), code + ": build_course.py copia los objetivos");
});

// the helper of the builds: a stale id is dropped with a warning
(function () {
  var script = "import sys, json; sys.path.insert(0, " + JSON.stringify(path.join(pack.ROOT, "tools", "lib")) + ")\n" +
    "import puedo\n" +
    "c = {'weeks': [{'week': 1, 'items': ['a', 'b']}, {'week': 2, 'items': ['c']}], 'items': [{'id': x} for x in 'abc']}\n" +
    "p = puedo.attach(c, {1: [('Saludar', ['a', 'z'])], 2: [('Repasar', ['a', 'c'])]})\n" +
    "print(json.dumps({'w': [w.get('can') for w in c['weeks']], 'p': p}))\n";
  var out;
  try { out = JSON.parse(cp.execFileSync("python3", ["-c", script], { encoding: "utf8" })); } catch (e) { out = null; }
  ok(out, "tools/lib/puedo.py corre");
  if (!out) return;
  T.eq(out.w[0], [{ t: "Saludar", items: ["a"] }], "puedo.py descarta el id que no está en la semana");
  T.eq(out.w[1], [{ t: "Repasar", items: ["a", "c"] }], "puedo.py: la última semana puede usar ítems de antes");
  ok(out.p.length === 1 && /semana 1: z/.test(out.p[0]), "puedo.py avisa lo descartado");
})();

var NOTEST = { listen: 1, dictation: 1, coppia: 1, conta: 1, scegli: 1, intonazione: 1, accento: 1, forma: 1 };

pack.ALL.forEach(function (code) {
  var L = code + " · ";
  var ctx = pack(code);
  var P = ctx.Puedo, E = ctx.Engine, Dr = ctx.Drills;
  ok(P && E && Dr, L + "puedo.js cargado");
  if (!P) return;
  ok(E.MODULE_OBJ.indexOf("puedo") >= 0, L + "state.puedo es un campo de módulo del guardado");
  var course = pack.data(code, "course.json");
  var map = Dr.itemsById(course);
  var last = course.weeks.length, first = {};
  course.weeks.forEach(function (w) { (w.items || []).forEach(function (id) { if (!(id in first)) first[id] = w.week; }); });

  // the data: every week, 3 or 4 goals, 1 or 2 items of the week each
  var bad = [];
  course.weeks.forEach(function (w) {
    var cs = P.list(w);
    if (cs.length < 3 || cs.length > 4) bad.push("s" + w.week + ": " + cs.length + " objetivos");
    var texts = {};
    cs.forEach(function (c) {
      if (texts[c.t]) bad.push("s" + w.week + ": objetivo repetido «" + c.t + "»");
      texts[c.t] = 1;
      if (c.t.length > 110 || /^\s|\s$/.test(c.t)) bad.push("s" + w.week + ": texto largo o con espacios «" + c.t + "»");
      if (!c.items || c.items.length < 1 || c.items.length > 2) bad.push("s" + w.week + ": «" + c.t + "» con " + (c.items || []).length + " ítems");
      (c.items || []).forEach(function (id) {
        var it = map[id];
        if (!it) { bad.push("s" + w.week + ": " + id + " no existe"); return; }
        if (NOTEST[it.type]) bad.push("s" + w.week + ": " + id + " es de escuchar");
        var inWeek = (w.items || []).indexOf(id) >= 0;
        if (!inWeek && !(w.week === last && first[id] <= last)) bad.push("s" + w.week + ": " + id + " no es de la semana");
      });
    });
  });
  ok(!bad.length, L + "52 semanas con 3-4 objetivos y sus ítems" + (bad.length ? ": " + bad.slice(0, 5).join(" · ") : ""));
  var nGoals = course.weeks.reduce(function (a, w) { return a + P.list(w).length; }, 0);
  ok(nGoals >= 156, L + nGoals + " objetivos en total" + (nGoals ? "" : " (¿falta regenerar docs/ con npm run build?)"));
  if (!nGoals) return;

  // the week opens: the goals, as a list
  var w20 = course.weeks[19], cs = P.list(w20);
  var st = E.fromRaw({ xp: 0, cards: {} });
  var intro = P.introHtml(w20, st);
  ok(/Al final de la semana vas a poder/.test(intro) && cs.every(function (c) { return intro.indexOf(c.t.replace(/&/g, "&amp;").replace(/</g, "&lt;")) >= 0 || intro.indexOf(c.t) >= 0; }),
     L + "al abrir la semana se ven sus objetivos");
  ok(P.cardHtml(w20, st, false) === "", L + "sin las misiones hechas, no hay tarjeta");
  var card = P.cardHtml(w20, st, true);
  ok(/¿Ya podés…\?/.test(card) && (card.match(/data-puedo="20:\d:(si|medio|no)"/g) || []).length === cs.length * 3, L + "la tarjeta: tres botones por objetivo");

  // «todavía no»: recorded, and its items come back tomorrow
  var r = P.answer(st, course, 20, 1, "no");
  ok(r.test === false && st.puedo[20][1].a === "no", L + "«todavía no» se guarda y no prueba");
  var tomorrow = new Date(Date.now() + 86400000); tomorrow.setHours(4, 0, 0, 0);
  ok(cs[1].items.every(function (id) { return st.cards[id] && st.cards[id].due === tomorrow.getTime(); }), L + "sus ítems vuelven mañana en el repaso");
  var weak = Dr.weakItems(course, course.weeks[25], st, map).map(function (it) { return it.id; });
  ok(cs[1].items.every(function (id) { return weak.indexOf(id) >= 0; }), L + "y entran en «Tus puntos débiles» de la estación");
  ok(/⬜/.test(P.introHtml(w20, st)), L + "la lista de la semana marca lo contestado");

  // «sí»: the test, with the tied items
  r = P.answer(st, course, 20, 0, "si");
  ok(r.test === true && st.puedo[20][0].a === "si" && st.puedo[20][0].ok === null, L + "«sí» pide la prueba");
  var its = P.items(course, "20:0", map);
  T.eq(its.map(function (it) { return it.id; }), cs[0].items, L + "la prueba son los ítems atados");
  ok(!P.items(course, "20:9", map).length && !P.items(course, "x", map).length, L + "un objetivo que no existe no arma prueba");
  var R = E.VERDICT.RIGHT, W = E.VERDICT.WRONG;
  var logOk = cs[0].items.map(function (id) { return { id: id, verdict: R }; }).concat([{ id: "otro", verdict: W }]);
  ok(P.roundDone(st, "20:0", logOk, course).ok === true && st.puedo[20][0].ok === true && st.puedo[20][0].a === "si",
     L + "todo bien en la prueba: salió (lo que no es del objetivo no cuenta)");
  ok(/te salió/.test(P.resultHtml(st, course, "20:0")), L + "calibración: «dijiste que sí y te salió»");
  var logBad = [{ id: cs[0].items[0], verdict: W }, { id: cs[0].items[0], verdict: R, retry: true }];
  var st2 = E.fromRaw({ xp: 0, cards: {} });
  P.answer(st2, course, 20, 0, "si");
  ok(P.roundDone(st2, "20:0", logBad, course).ok === false && st2.puedo[20][0].ok === false, L + "un error en la primera respuesta: no salió");
  ok(/fallaste/.test(P.resultHtml(st2, course, "20:0")), L + "calibración: «dijiste que sí y fallaste»");
  var st4 = E.fromRaw({ xp: 0, cards: {} });
  P.answer(st4, course, 20, 0, "si");
  ok(P.roundDone(st4, "20:0", [{ id: "otro", verdict: W }], course).ok === null && st4.puedo[20][0].ok === null &&
     !/fallaste/.test(P.resultHtml(st4, course, "20:0")), L + "sin ninguno de sus ítems respondido, no hay veredicto");
  ok(cs[0].items.every(function (id) { return st2.cards[id] && st2.cards[id].due <= tomorrow.getTime(); }), L + "lo fallado vuelve mañana");
  ok(/🔁/.test(P.cardHtml(w20, st2, true)), L + "la tarjeta lo muestra");

  // the balance, and the station
  P.answer(st, course, 20, 2, "medio");
  if (cs[3]) P.answer(st, course, 20, 3, "si");
  var b = P.balance(st, course, [20])[0];
  ok(b && b.si === (cs[3] ? 2 : 1) && b.medio === 1 && b.no === 1 && b.ok === 1, L + "el balance de la semana");
  ok(/Tu balance de la semana/.test(P.cardHtml(w20, st, true)), L + "con todo contestado, la tarjeta dice el balance");
  var sh = P.stationHtml(st, course, 22);
  ok(/Lo que dijiste que podés/.test(sh) && /Semana 20/.test(sh) && /sin contestar/.test(sh) && /Para repasar: semana 20/.test(sh),
     L + "la Estación muestra el balance de sus tres semanas");
  ok(/arma este balance/.test(P.stationHtml(E.fromRaw({ xp: 0, cards: {} }), course, 22)), L + "sin respuestas, la Estación explica de dónde sale");

  // the save
  ok(!("puedo" in E.fromRaw({ xp: 1, cards: {}, puedo: "roto" })), L + "un state.puedo roto se descarta");
  ok(E.fromRaw({ xp: 1, cards: {}, puedo: { 20: { 0: { a: "si", ok: true } } } }).puedo[20][0].ok === true, L + "uno bien formado se conserva");
  var st3 = E.fromRaw({ xp: 1, cards: {}, puedo: { 20: "x" } });
  ok(P.answer(st3, course, 20, 0, "medio").test === false && st3.puedo[20][0].a === "medio", L + "una semana rota del guardado se rehace");
  ok(P.answer(st3, course, 20, 0, "quizás").test === false && st3.puedo[20][0].a === "medio", L + "una respuesta desconocida no cambia nada");
});

T.done();
