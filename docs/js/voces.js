/*
 * Las voces del teléfono: cuál suena mejor y quién habla con cuál.
 *
 *   Voces.gender(voz)            "f", "m" o null: por el nombre de la voz
 *                                (las de Google, Microsoft, Apple y las que
 *                                dicen Female / Male en su nombre)
 *   Voces.score(voz)             cuanto más alto, mejor: Natural, Neural,
 *                                Online, Enhanced, Premium y Google primero;
 *                                las voces de juguete de Apple (Eddy, Flo…),
 *                                al final
 *   Voces.sort(voces, prefer)    la variante preferida primero (LANG.voicePrefer:
 *                                pt-BR antes que pt-PT), después la calidad y
 *                                después las locales
 *   Voces.cast(voces, sexes, n)  a cada hablante de un diálogo, {vi, pitch}:
 *                                una voz de su género, distinta de la de los
 *                                otros; si no hay una de su género, otra voz
 *                                con la altura corrida hacia ese género; si
 *                                hay una sola voz, la misma con otra altura
 *
 * app.js (speak, pickVoice) y tramo.js (playScript) lo usan con la lista de
 * voces de la lengua.  Los datos dicen el género de cada hablante: «sexes»
 * junto a «speakers» en tools/<l>/radio, tools/<l>/tramo y esame_data.js.
 * Test: tools/lib/test_voces.js.
 */
(function (root) {
  "use strict";

  // Voice names by gender.  Microsoft (Edge, Windows), Apple (Safari, iOS,
  // macOS) and Google, for German, Italian and Portuguese, and the generic
  // words.  Lower case, a word of the name.
  var FEMALE = ("katja amala hedda seraphina ingrid leni elke louisa maja tanja klarissa gisela kerstin " +
                "anna petra helena marlene vicki " +
                "elsa isabella lucia palmira pierina fabiola fiamma imelda irma " +
                "alice federica paola emma " +
                "francisca thalita maria leticia manuela brenda elza giovanna leila yara " +
                "luciana joana catarina raquel " +
                "flo grandma sandy shelley " +
                "female woman frau weiblich femminile donna feminina feminino mulher").split(" ");
  var MALE = ("conrad killian stefan florian jonas jan kasper ralf bernd christoph klaus " +
              "markus yannick martin " +
              "diego cosimo giuseppe benigno calimero gianni lisandro rinaldo " +
              "luca " +
              "antonio daniel donato fabio humberto julio nicolau valerio " +
              "felipe duarte " +
              "eddy grandpa reed rocko " +
              "male man mann männlich maschile uomo masculina masculino homem").split(" ");
  var F = {}, M = {};
  FEMALE.forEach(function (w) { F[w] = 1; });
  MALE.forEach(function (w) { M[w] = 1; });

  function words(v) {
    return String((v && v.name) || "").toLowerCase().split(/[^a-zà-ÿß]+/).filter(Boolean);
  }
  // Whole names: Chrome's Google voices say only the language.
  var NAMED = { "google deutsch": "f", "google italiano": "f", "google português do brasil": "f" };
  function gender(v) {
    var named = NAMED[String((v && v.name) || "").toLowerCase().trim()];
    if (named) return named;
    var ws = words(v), f = 0, m = 0;
    ws.forEach(function (w) { if (F[w]) f++; if (M[w]) m++; });
    return f && !m ? "f" : m && !f ? "m" : null;
  }

  var GOOD = /\b(natural|neural|online|enhanced|premium|wavenet|studio)\b|\(natural\)|\(enhanced\)|\(premium\)/i;
  var TOY = /\b(eddy|flo|grandma|grandpa|reed|rocko|sandy|shelley|albert|bad news|bahh|bells|boing|bubbles|cellos|good news|jester|organ|superstar|trinoids|whisper|wobble|zarvox|fred|junior|kathy|ralph)\b/i;
  function score(v) {
    var n = String((v && v.name) || ""), s = 0;
    if (GOOD.test(n)) s += 2;
    if (/^google\b|\bgoogle\b/i.test(n)) s += 1;
    if (TOY.test(n)) s -= 3;
    if (/\bcompact\b/i.test(n)) s -= 1;
    return s;
  }

  function sort(list, prefer) {
    return list.map(function (v, i) { return { v: v, i: i }; }).sort(function (a, b) {
      var pa = prefer && !prefer.test(a.v.lang) ? 1 : 0, pb = prefer && !prefer.test(b.v.lang) ? 1 : 0;
      return pa - pb || score(b.v) - score(a.v) ||
        (b.v.localService ? 1 : 0) - (a.v.localService ? 1 : 0) || a.i - b.i;
    }).map(function (x) { return x.v; });
  }

  // The pitch that moves a voice toward a gender: a little for a voice of
  // unknown gender, more for one of the other gender.
  var NUDGE = { f: { unknown: 1.1, other: 1.25 }, m: { unknown: 0.88, other: 0.75 } };

  /* sexes: ["f", "m", …] (or missing: nobody's gender is known); n: how
     many speakers (A, B, C…).  voices: the language's voices, best first.
     Returns [{vi, pitch}] in the order of the speakers. */
  function cast(voices, sexes, n) {
    voices = voices || [];
    sexes = sexes || [];
    n = Math.max(n || 0, sexes.length, 1);
    var used = {}, out = [];
    for (var k = 0; k < n; k++) {
      var want = sexes[k] === "f" || sexes[k] === "m" ? sexes[k] : null, pick = -1, i;
      // 1. a voice of that gender not used yet; 2. one of unknown gender;
      // 3. any voice not used yet; 4. the voice of the speaker before.
      for (i = 0; i < voices.length && pick < 0; i++) if (!used[i] && want && gender(voices[i]) === want) pick = i;
      for (i = 0; i < voices.length && pick < 0; i++) if (!used[i] && !gender(voices[i])) pick = i;
      for (i = 0; i < voices.length && pick < 0; i++) if (!used[i]) pick = i;
      // all used: the first of that gender, or the first one
      for (i = 0; i < voices.length && pick < 0; i++) if (want && gender(voices[i]) === want) pick = i;
      if (pick < 0) pick = 0;
      var g = voices.length ? gender(voices[pick]) : null, pitch = 1;
      if (want && g !== want) pitch = NUDGE[want][g ? "other" : "unknown"];
      // the same voice as someone before: another pitch, so they are told apart
      var again = out.filter(function (o) { return o.vi === pick; });
      if (again.length) {
        if (!want) pitch = [1.12, 0.88, 1.25, 0.8][(again.length - 1) % 4];
        while (out.some(function (o) { return o.vi === pick && Math.abs(o.pitch - pitch) < 0.12; })) {
          pitch = Math.round((pitch + (want === "m" ? -0.13 : 0.13)) * 100) / 100;
        }
      }
      used[pick] = 1;
      out.push({ vi: pick, pitch: pitch });
    }
    return out;
  }

  // The speakers of a script: "A" → 0, "B" → 1, "C" → 2.
  function who(letter) { var c = String(letter || "A").charCodeAt(0) - 65; return c >= 0 && c < 26 ? c : 0; }

  /* The recorded voices (tools/audio/grabar.py): each speaker of a dialogue
     has a slot, its gender and its place among those of that gender (the
     second woman is "f2"); a sentence outside a dialogue has none ("").
     key(text, slot) names the file: the same text and the same slot always
     give the same name, here and in the script. */
  function slots(sexes, n) {
    var seen = { f: 0, m: 0 }, out = [];
    for (var k = 0; k < Math.max(n || 0, (sexes || []).length); k++) {
      var s = (sexes || [])[k] === "f" || (sexes || [])[k] === "m" ? sexes[k] : (k % 2 ? "f" : "m");
      out.push(s + (++seen[s]));
    }
    return out;
  }
  function norm(text) {
    var s = String(text == null ? "" : text).replace(/_+/g, " ");
    if (s.normalize) s = s.normalize("NFC");
    return s.replace(/\s+/g, " ").trim();
  }
  function fnv(s, h) {
    for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
    return ("0000000" + h.toString(16)).slice(-8);
  }
  function key(text, slot) {
    var s = (slot || "") + "|" + norm(text);
    return fnv(s, 2166136261) + fnv(s, 3735928559);
  }

  var Voces = { gender: gender, score: score, sort: sort, cast: cast, who: who, slots: slots, norm: norm, key: key };
  if (typeof module !== "undefined" && module.exports) module.exports = Voces;
  root.Voces = Voces;
})(typeof window !== "undefined" ? window : this);
