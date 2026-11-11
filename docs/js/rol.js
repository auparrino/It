/*
 * «🧩 Qué es cada palabra»: el papel de cada palabra en la oración.
 *
 * Dos capas, porque no se pueden saber con la misma certeza:
 *
 * 1. La CLASE de cada palabra (artículo, sustantivo, verbo, preposición…)
 *    sale de los datos del curso, sin internet: el banco de palabras
 *    (sustantivos con su plural, adjetivos con sus cuatro formas, palabras
 *    gramaticales con su categoría), el conjugador (todas las formas de
 *    cada verbo) y las reglas del idioma (artículos, contracciones,
 *    pronombres átonos).  Una palabra que puede ser dos cosas se decide solo
 *    con lo que es seguro (después de un artículo va un nombre, no un verbo
 *    conjugado); si no, se dicen las dos («artículo o pronombre»).  Lo que
 *    no está en los datos queda sin rótulo: nunca se adivina.
 *
 * 2. La FUNCIÓN (sujeto, verbo, objeto directo, objeto indirecto,
 *    complemento…) no se deduce con reglas simples: en «Mi piace il caffè»
 *    el sujeto es «il caffè», no «mi».  Se pide a la IA con la clave del
 *    alumno (ia.js), a pedido, y se muestra rotulada como generada.  La
 *    respuesta se valida: cada grupo tiene que estar en la oración, en
 *    orden, y su función en la lista cerrada de FUNCIONES.
 *
 * Sin DOM (se prueba en node: tools/lib/test_rol.js); app.js dibuja.
 */
(function (root) {
  "use strict";

  var IDX = null;   // forma → { clase: 1 }
  var CLITICS = {}; // the unstressed pronouns of the language (mi, ti, lo…)
  var VERBS = null; // the bank's verbs, taught to the conjugator the first time they are needed

  // clase → [nombre, abreviatura]
  var CLASES = {
    art: ["artículo", "art."], sus: ["sustantivo", "sust."], adj: ["adjetivo", "adj."], ver: ["verbo", "verbo"],
    pro: ["pronombre", "pron."], prep: ["preposición", "prep."], contr: ["preposición + artículo", "prep.+art."],
    conj: ["conjunción", "conj."], adv: ["adverbio", "adv."], num: ["numeral", "num."],
    int: ["interrogativo", "interr."], cuant: ["cuantificador", "cuant."]
  };
  var ORDEN = ["art", "contr", "prep", "pro", "ver", "sus", "adj", "adv", "conj", "num", "int", "cuant"];

  // the category the bank gives to a grammar word → class (by its start: the
  // labels are in the language of each package)
  function ofCategory(cat) {
    var c = String(cat || "").toLowerCase();
    if (/^prep/.test(c)) return "prep";
    if (/^contra/.test(c)) return "contr";
    if (/^con[gj]/.test(c)) return "conj";
    if (/^a[vd]v/.test(c)) return "adv";
    if (/^pron/.test(c)) return "pro";
    if (/^num/.test(c)) return "num";
    if (/^interr/.test(c)) return "int";
    if (/^quant|^cuant/.test(c)) return "cuant";
    if (/^tempo/.test(c)) return "adv";   // ieri, oggi, amanhã (the phrases of several words are left out)
    return "";   // the expressions are a mixed bag: no label
  }

  function add(form, cls) {
    if (!form || !cls) return;
    String(form).split(/\s*[\/,]\s*/).forEach(function (f) {
      f = f.trim().toLowerCase();
      if (!f || /\s/.test(f) || /[()]/.test(f)) return;
      (IDX[f] = IDX[f] || {})[cls] = 1;
    });
  }

  /* bank: the compiled bank of the language (nouns, adjectives, words).
     The rest comes from the package already loaded (Desglose, LANG). */
  function load(bank) {
    IDX = {};
    bank = bank || {};
    (bank.nouns || []).forEach(function (n) { add(n[0], "sus"); add(n[2], "sus"); });
    (bank.adjectives || []).forEach(function (a) { for (var i = 0; i < 4; i++) add(a[i], "adj"); });
    (bank.words || []).forEach(function (w) { add(w[0], ofCategory(w[2])); });
    VERBS = (bank.verbs || []).slice();
    var D = root.Desglose, L = root.LANG, R = (L && L.rules && L.rules.desglose) || {};
    if (D && D.contrs) Object.keys(D.contrs()).forEach(function (f) { add(f, "contr"); });
    if (D && D.arts) {
      var A = D.arts();
      Object.keys(A).forEach(function (f) {
        if (A[f] === 2) add(f, "prep");
        else if (!(IDX[f] && IDX[f].contr)) add(f, "art");
      });
    }
    CLITICS = {};
    Object.keys(R.clitics || {}).forEach(function (f) { add(f, "pro"); CLITICS[f] = 1; });
    return api;
  }
  function loaded() { return !!IDX; }

  function verbForm(w) {
    var D = root.Desglose;
    if (VERBS && D && D.learn) {
      // the bank's regular verbs: the conjugator learns them, once (portare → porto, porti…)
      VERBS.forEach(function (v) { try { D.learn(v[0], v[1]); } catch (e) { /* un verbo que no se deja conjugar */ } });
      VERBS = null;
    }
    var F = D && D.forms ? D.forms() : null;
    return !!(F && F[w] && F[w].length) || !!(root.Conj && root.Conj.list && root.Conj.list().indexOf(w) >= 0);
  }
  function classesOf(w) {
    var set = {}, k;
    var hit = IDX[w];
    for (k in hit) set[k] = 1;
    if (verbForm(w)) set.ver = 1;
    return set;
  }
  function keys(set) { return ORDEN.filter(function (k) { return set[k]; }); }

  var LETTER = "A-Za-zÀ-ÖØ-öø-ÿ";
  var TOKEN = new RegExp("[" + LETTER + "]+'|[" + LETTER + "]+(?:-[" + LETTER + "]+)*|[^" + LETTER + "]+", "g");
  var WORD = new RegExp("^[" + LETTER + "]");

  /* The sentence in pieces: [{ t, cls, amb }] for words (cls null when the
     data do not know; amb: the two classes it can be) and { t, sep: true }
     for what is between them. */
  function clases(text) {
    if (!IDX) return [];
    var toks = String(text || "").match(TOKEN) || [];
    var out = toks.map(function (t) {
      if (!WORD.test(t)) return { t: t, sep: true };
      return { t: t, set: classesOf(t.toLowerCase()) };
    });
    var words = out.filter(function (o) { return !o.sep; });
    words.forEach(function (o, i) {
      var ks = keys(o.set), prev = words[i - 1], next = words[i + 1];
      var nextKs = next ? keys(next.set) : [];
      var has = function (list, k) { return list.indexOf(k) >= 0; };
      // a contraction is not also a plain preposition (al, nel, no, pelo)
      if (has(ks, "contr")) ks = ks.filter(function (k) { return k !== "prep"; });
      var nextNominal = has(nextKs, "sus") || has(nextKs, "contr") || (has(nextKs, "art") && !has(nextKs, "pro"));
      // Words the bank files under one class and that do other jobs too: no
      // label where the other job is likely.  An interrogative outside a
      // question (che, come, quando as a link); an adverb or a pronoun right
      // before a noun (dopo cena: a preposition; questo libro, mio padre: a
      // determiner).
      if (ks.length === 1 && ks[0] === "int" && String(text).indexOf("?") < 0) ks = [];
      if (ks.length === 1 && ks[0] === "adv" && nextNominal) ks = [];
      if (ks.length === 1 && ks[0] === "pro" && nextNominal && !has(nextKs, "ver") && !(o.t.toLowerCase() in CLITICS)) ks = [];
      if (ks.length > 1) {
        // an article or a pronoun (lo, la, le…): what follows decides, when it is clear
        if (has(ks, "art") && has(ks, "pro")) {
          var nominal = has(nextKs, "sus") || has(nextKs, "adj"), verbal = has(nextKs, "ver");
          if (nominal && !verbal) ks = ["art"];
          else if (verbal && !nominal) ks = ["pro"];
          else ks = ["art", "pro"];
        }
        // a noun or a verb form (porto, lavoro): after a sure article or a
        // preposition with article, a noun
        else if (has(ks, "ver") && (has(ks, "sus") || has(ks, "adj"))) {
          var p = prev && prev.cls;
          if (p === "art" || p === "contr" || p === "num" || p === "prep") ks = ks.filter(function (k) { return k !== "ver"; });
        }
      }
      o.cls = ks.length === 1 ? ks[0] : null;
      o.amb = ks.length === 2 ? ks : null;
    });
    return out.map(function (o) { return o.sep ? o : { t: o.t, cls: o.cls, amb: o.amb }; });
  }
  // enough is known to be worth showing: three words or more, half with a class
  function useful(parts) {
    var w = parts.filter(function (p) { return !p.sep; });
    var known = w.filter(function (p) { return p.cls || p.amb; }).length;
    return w.length >= 3 && known * 2 >= w.length;
  }
  function nombre(cls) { return CLASES[cls] ? CLASES[cls][0] : ""; }
  function corto(cls) { return CLASES[cls] ? CLASES[cls][1] : ""; }

  /* ------------------------------------------------- la función, con la IA */

  var FUNCIONES = ["sujeto", "verbo", "objeto directo", "objeto indirecto", "atributo",
    "complemento de lugar", "complemento de tiempo", "complemento de modo", "complemento de compañía",
    "complemento de causa", "complemento de fin", "complemento con preposición", "negación", "nexo", "vocativo", "otro"];

  function prompt(text, langName) {
    return "Sos profesor de " + (langName || "idiomas") + " para un hispanohablante rioplatense. Analizá la FUNCIÓN SINTÁCTICA de cada parte de esta oración:\n\n" +
      text + "\n\n" +
      "Dividila en grupos de palabras seguidas (un grupo = las palabras que cumplen juntas una función: «il caffè», «a Roma», «ho mangiato»). " +
      "Todas las palabras de la oración tienen que quedar en algún grupo, en el mismo orden y copiadas tal cual. " +
      "Para cada grupo decí su función, que tiene que ser EXACTAMENTE una de: " + FUNCIONES.join(", ") + ". " +
      "Ojo con los verbos como «gustar» (piacere, gostar, gefallen): lo que gusta es el sujeto y la persona es el objeto indirecto. " +
      "Un pronombre átono pegado o delante del verbo va en su propio grupo con su función. " +
      "En «porque», una frase corta en castellano que diga cómo se reconoce (concordancia, preposición, posición). " +
      "Si el sujeto no está escrito, ponelo en «sujeto_tacito» (por ejemplo «io»); si está, dejalo vacío.\n" +
      'Respondé SOLO con JSON: {"grupos":[{"texto":"…","funcion":"…","porque":"…"}],"sujeto_tacito":""}';
  }
  function norm(s) { return String(s || "").toLowerCase().replace(/[^a-zà-öø-ÿ]+/g, " ").trim(); }
  /* What the model answered, checked: every group is in the sentence, in
     order, and together they cover its words.  null when it does not hold. */
  function parse(data, text) {
    var gs = data && Array.isArray(data.grupos) ? data.grupos : null;
    if (!gs || !gs.length) return null;
    var hay = norm(text), at = 0, out = [], covered = 0;
    for (var i = 0; i < gs.length; i++) {
      var t = norm(gs[i] && gs[i].texto);
      if (!t) continue;
      var k = hay.indexOf(t, at);
      if (k < 0) return null;
      at = k + t.length;
      covered += t.split(" ").length;
      var f = String((gs[i].funcion || "")).toLowerCase().trim();
      out.push({ texto: String(gs[i].texto).trim().slice(0, 120), funcion: FUNCIONES.indexOf(f) >= 0 ? f : "otro",
                 porque: String(gs[i].porque || "").trim().slice(0, 200) });
    }
    var total = hay ? hay.split(" ").length : 0;
    if (!out.length || covered < total * 0.8) return null;
    return { grupos: out, tacito: String(data.sujeto_tacito || "").trim().slice(0, 30) };
  }
  // the colour family of a function (css: .rol-f-<familia>)
  function familia(f) {
    return f === "sujeto" ? "suj" : f === "verbo" ? "ver" : f === "objeto directo" ? "od" : f === "objeto indirecto" ? "oi" :
      f === "atributo" ? "atr" : /^complemento/.test(f) ? "comp" : "otro";
  }

  var api = { load: load, loaded: loaded, clases: clases, useful: useful, nombre: nombre, corto: corto, CLASES: CLASES,
    FUNCIONES: FUNCIONES, prompt: prompt, parse: parse, familia: familia, _reset: function () { IDX = null; } };
  if (typeof module === "object" && module.exports) module.exports = api;
  root.Rol = api;
})(typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : this);
