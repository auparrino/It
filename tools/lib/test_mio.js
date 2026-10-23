/* «Corregí tu propia frase» (docs/js/errores.js, mio), en cada idioma:
   - un error anotado con una oración entera (lo escrito y su corrección:
     una respuesta escrita, Parla, la rúbrica del tramo) deja una ficha
     «own:mio:…» en state.own (Engine.enqueue) que vence en dos o tres días,
     con la oración tal cual, «hay 1 error», la categoría y la corrección;
   - un texto (Scrivi, el dictogloss, el tramo, Escritura plus): la oración
     del error con la corrección aplicada (Errores.splice: sin repetir la
     palabra que la corrección ya trae), solo si se sabe la corrección de
     todo lo marcado en esa oración;
   - nada con una palabra suelta, sin corrección, con lo mismo, con una
     oración que cambia entera, ni con o.noMio (la propia ficha fallada);
   - el repaso: Drills la arma (Reglas.ownItem), con tope por día
     (MIO_A_DAY), la Clínica no la adelanta (Reglas.ownRecent) y al
     contestarla se reprograma (FSRS); tope de fichas (MIO_MAX);
   - los ganchos de app.js: la ficha fallada no crea otra, el prompt con la
     categoría como única pista en el segundo intento, la caja con la frase.
   Run: node tools/lib/test_mio.js */
"use strict";
var fs = require("fs"), path = require("path");
var pack = require("./pack.js");
var T = require("./testkit.js")("es"), ok = T.ok, eq = T.eq;
var DAY = 864e5;

var APP = fs.readFileSync(path.join(pack.DOCS, "js", "app.js"), "utf8");
ok(/var noMio = !cur \|\| !!\(cur\.mio \|\| cur\.nomio \|\| cur\.options \|\| cur\.type === "fixerr"/.test(APP) &&
   /E\.record\(state, err, \{ noMio: noMio \}\)/.test(APP),
   "app.js: ni la ficha propia fallada, ni una opción elegida, ni un hueco, ni «Trova l'errore» crean ficha");
ok(/if \(it\.mio && verdict === "sbagliato"\)/.test(APP) && /mioPrompt\(it\)/.test(APP), "app.js: el primer fallo da la pista (la categoría)");
ok(/function mioPrompt\(it\)[\s\S]{0,400}Pista: /.test(APP), "app.js: la pista es la categoría");
ok(/\(it\.mio \? esc\(it\.stem\) : ""\)/.test(APP), "app.js: la caja trae la frase para corregirla");
ok(/!round\.tried && d\.cat && !it\.mio\) recordError/.test(APP), "app.js: fallar la ficha propia no anota otro error");
var DR = fs.readFileSync(path.join(pack.DOCS, "js", "drills.js"), "utf8");
ok(/own:mio:"\) === 0 && \+\+mio > MIO_A_DAY/.test(DR), "drills.js: tope por día");

// splice: the correction in its place, without repeating what it takes in
(function () {
  var E = require(path.join(pack.DOCS, "js", "errores.js"));
  var sp = function (s, bad, good) { return E.splice(s, s.indexOf(bad), bad.length, good); };
  eq(sp("Eu gosto café de manhã.", "gosto", "gosto de café"), "Eu gosto de café de manhã.", "splice: la palabra que la corrección ya trae");
  eq(sp("Io ho andato a casa dopo.", "ho andato", "sono andato"), "Io sono andato a casa dopo.", "splice: el auxiliar");
  eq(sp("Ich habe nach Hause gegangen.", "habe", "bin"), "Ich bin nach Hause gegangen.", "splice: alemán");
  eq(sp("Vou a o cinema.", "a o", "ao"), "Vou ao cinema.", "splice: la contracción");
  eq(sp("Eu falo com ela muito.", " muito", ""), "Eu falo com ela.", "splice: lo que sobra");
  eq(E.diffSpans("Sono stato lavorando tutto il giorno", "Ho lavorato tutto il giorno"), 1, "diffSpans: un lugar");
  eq(E.diffSpans("a b c d e", "a x c y e"), 2, "diffSpans: dos lugares");
})();

var SAMPLES = {
  it: { pair: ["Sono stato lavorando tutto il giorno.", "Ho lavorato tutto il giorno.", "ausiliare"],
        text: "Io ho andato a casa dopo. La casa è bella.", fixed: "Io sono andato a casa dopo." },
  pt: { pair: ["Eu gosto café de manhã.", "Eu gosto de café de manhã.", "gostar"],
        text: "Eu gosto café de manhã. A casa é bonita.", fixed: "Eu gosto de café de manhã." },
  de: { pair: ["Ich habe nach Hause gegangen.", "Ich bin nach Hause gegangen.", "ia"] }
};

pack.ALL.forEach(function (code) {
  var L = code + " · ", S = SAMPLES[code];
  if (!S) return;
  var full = pack.LANGS.indexOf(code) >= 0;
  var ctx = pack(code), Er = ctx.Errores, E = ctx.Engine, R = ctx.Reglas, D = ctx.Drills;
  ok(!!Er && !!Er.mioAdd, L + "carga Errores con mio");
  if (!Er || !Er.mioAdd) return;
  var now = Date.now();

  /* ------------------------------------------- una oración y su corrección */
  var st = E.blankSave();
  var err = Er.make({ cat: S.pair[2], mal: S.pair[0], bien: S.pair[1], regla: "la regla", fuente: "ia" });
  var row = Er.record(st, err);
  ok(!!row, L + "el error queda en el registro");
  var ids = Er.mioIds(st);
  eq(ids.length, 1, L + "una ficha mio");
  var id = ids[0], own = st.own[id], card = st.cards[id];
  ok(id.indexOf("own:mio:") === 0, L + "el id es own:mio:…");
  ok(own && own.it.mio === 1 && own.it.type === "typed" && own.it.src === "mio", L + "una ficha escrita, marcada mio");
  eq(own.it.stem, S.pair[0], L + "la oración tal cual");
  eq(own.it.answer, S.pair[1], L + "la corrección guardada");
  ok(/hay 1 error$/.test(own.it.prompt), L + "«hay 1 error»: " + own.it.prompt);
  ok(!!own.it.l, L + "la categoría para la pista (" + own.it.l + ")");
  ok(card && card.reps === 0 && card.due - now >= 2 * DAY - 6e4 && card.due - now <= 3 * DAY + 6e4,
     L + "vence en dos o tres días (" + ((card.due - now) / DAY).toFixed(2) + ")");
  ok(own.it.retryAs && own.it.retryAs.type === "choice" && own.it.retryAs.options.indexOf(S.pair[0]) >= 0 &&
     own.it.retryAs.nomio === 1, L + "la vuelta más fácil: elegir entre la tuya y la corregida");
  // the same sentence again: the same card, not a second one
  Er.record(st, Er.make({ cat: S.pair[2], mal: S.pair[0], bien: S.pair[1], fuente: "ia" }));
  eq(Er.mioIds(st).length, 1, L + "la misma oración no duplica la ficha");

  // only the order changes: one error, not two
  var so = E.blankSave();
  Er.mioAdd(so, { frase: "Gestern ich bin ins Kino gegangen.", bien: "Gestern bin ich ins Kino gegangen.", cat: S.pair[2] });
  var oi = Er.mioIds(so).map(function (k) { return so.own[k].it; })[0];
  ok(oi && /hay 1 error$/.test(oi.prompt), L + "solo el orden: «hay 1 error» (" + (oi && oi.prompt) + ")");

  /* ------------------------------------------------------------ cuándo no */
  var s2 = E.blankSave();
  Er.record(s2, Er.make({ cat: S.pair[2], mal: "ho", bien: "sono", fuente: "reglas" }));
  Er.record(s2, Er.make({ cat: S.pair[2], mal: S.pair[0], bien: null, fuente: "ia" }));
  Er.record(s2, Er.make({ cat: S.pair[2], mal: S.pair[0], bien: S.pair[0], fuente: "ia" }));
  Er.record(s2, Er.make({ cat: S.pair[2], mal: S.pair[0], bien: S.pair[1], fuente: "ia" }), { noMio: true });
  Er.record(s2, Er.make({ cat: S.pair[2], mal: "uno due tre quattro cinque sei", bien: "a b c d e f g", fuente: "ia" }));
  Er.record(s2, Er.make({ cat: S.pair[2], mal: "uno due tre", bien: "uno | due | tres", fuente: "ia" }));
  Er.record(s2, Er.make({ cat: S.pair[2], mal: "uno ___ due tre", bien: "uno x due tres", fuente: "ia" }));
  eq(Er.mioIds(s2).length, 0, L + "ni palabra suelta, ni sin corrección, ni lo mismo, ni noMio, ni otra oración, ni huecos");
  // «🙋 Mi respuesta es válida»: the row goes, and its sentence does not come back
  var s2b = E.blankSave();
  var rowB = Er.record(s2b, Er.make({ cat: S.pair[2], mal: S.pair[0], bien: S.pair[1], fuente: "ia" }));
  eq(Er.mioIds(s2b).length, 1, L + "la ficha, antes de deshacer");
  Er.unrecord(s2b, rowB);
  eq(Er.mioIds(s2b).length, 0, L + "deshacer el error borra la ficha propia");
  ok(!s2b.cards[rowB.m], L + "y su tarjeta");
  ok(s2.errLog.length >= 4, L + "el registro anota igual");

  /* ---------------------------------------------------- un texto corregido */
  if (S.text && ctx.Scrivi) {
    var s3 = E.blankSave();
    var r = ctx.Scrivi.check(S.text, 20);
    var rows = Er.recordFindings(s3, r.findings, S.text, {});
    ok(rows.length >= 1, L + "Scrivi encuentra el error del texto");
    var mine = Er.mioIds(s3).map(function (k) { return s3.own[k].it; });
    var hit = mine.filter(function (x) { return x.answer === S.fixed; })[0];
    ok(!!hit, L + "la oración del texto vuelve con la corrección aplicada: " + JSON.stringify(mine.map(function (x) { return x.answer; })));
    ok(hit && hit.stem !== hit.answer && S.text.indexOf(hit.stem) === 0, L + "tal cual la escribiste");
    // the place of the fix: a short word that is also inside other words
    // and in another sentence goes where the checker saw it, never inside «casa»
    var s3b = E.blankSave(), tx = "Ela canta a canção da casa. Eu vou a o cinema.";
    Er.recordFindings(s3b, [{ cat: S.pair[2], bad: "a o", good: "ao", msg: "x", why: "la contracción" }], tx, {});
    var gotB = Er.mioIds(s3b).map(function (k) { return s3b.own[k].it; });
    eq(gotB.length, 1, L + "una ficha, en la oración del error");
    eq(gotB[0] && gotB[0].answer, "Eu vou ao cinema.", L + "la corrección en su lugar");
    var s3c = E.blankSave();
    Er.recordFindings(s3c, [{ cat: S.pair[2], bad: "a", good: "à", msg: "x" }], tx, {});
    eq(Er.mioIds(s3c).length, 0, L + "una palabra que está en dos lugares, sin saber cuál: no hay ficha");
    // a fix without a correction: that sentence makes no card
    var s4 = E.blankSave();
    Er.recordFindings(s4, [{ cat: S.pair[2], bad: S.text.split(" ")[1], good: null, msg: "algo" }], S.text, {});
    eq(Er.mioIds(s4).length, 0, L + "sin la corrección de todo lo marcado, no hay ficha");
  }

  /* ---------------------------------------------------------- el repaso */
  if (full) {
    var course = pack.data(code, "course.json");
    var map = D.itemsById(course);
    var s5 = E.blankSave();
    for (var i = 0; i < 6; i++) {
      Er.mioAdd(s5, { frase: S.pair[0].replace(/\.$/, "") + " " + i + ".", bien: S.pair[1].replace(/\.$/, "") + " " + i + ".",
                      cat: S.pair[2], now: now - 4 * DAY });
    }
    eq(Er.mioIds(s5).length, 6, L + "seis fichas propias");
    var rv = D.buildReview(course, s5, 20, { map: map });
    var mioRv = rv.filter(function (x) { return x.mio; });
    eq(mioRv.length, 3, L + "el repaso del día trae tres como mucho (tope)");
    ok(mioRv.every(function (x) { return x.type === "typed" && x.stem && x.answer; }), L + "con su oración y su corrección");
    ok(R.ownRecent(s5, 10).every(function (x) { return !x.mio; }), L + "la Clínica no las adelanta");
    var it0 = mioRv[0];
    R.afterAnswer(s5, it0, 2, { kind: "review", now: now });
    var c0 = s5.cards[it0.id];
    ok(c0.reps >= 1 && c0.due > now + DAY, L + "corregida, se espacia (FSRS): vuelve en " + ((c0.due - now) / DAY).toFixed(1) + " días");
    eq(D.dueCount(course, s5, map), 3, L + "lo que vence hoy, con tope");
  }

  /* ---------------------------------------------------------------- tope */
  var s6 = E.blankSave();
  for (var j = 0; j < Er.MIO_MAX + 5; j++) {
    Er.mioAdd(s6, { frase: "uno due tre " + j, bien: "uno dos tre " + j, cat: "x", now: now + j });
  }
  eq(Er.mioIds(s6).length, Er.MIO_MAX, L + "como mucho " + Er.MIO_MAX + " fichas propias");
  ok(!s6.own["own:mio:" + Er.hash("uno due tre 0")] && !s6.cards["own:mio:" + Er.hash("uno due tre 0")], L + "se van las más viejas, con su ficha");
});

T.done();
