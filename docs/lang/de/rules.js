/*
 * Weg C1 — las reglas del alemán que usa el núcleo (LANG.rules): la
 * corrección, el guardado, los rangos y las medallas, los distractores de
 * los ejercicios, las trampas de las lecciones y el banco.
 *
 * El curso tiene sus 52 semanas, pero el paquete no trae todavía
 * conjugador, diagnóstico ni banco alemanes; lo que el núcleo les pide a
 * esas piezas queda acá con lo justo, para que crezca cuando lleguen.
 */
(function (root) {
  "use strict";

  var LANG = root.LANG = root.LANG || {};

  function isObj(v) { return !!v && typeof v === "object" && !Array.isArray(v); }

  /* ------------------------------------------------------ guardado */

  // El temario nace en su versión 1: si algún día se reordenan las semanas,
  // la migración de las partidas viejas va acá.
  function migrateSyllabus(s) {
    if (isObj(s) && !s.syllabusV) s.syllabusV = 1;
    return s;
  }

  /* ------------------------------------------------------ distractores */

  // Plurals a learner makes: the -s of Spanish (Tisch → Tischs), -e and
  // -en mixed up, the umlaut forgotten (Bruder → Bruders, Brüder → Bruder).
  function pluralTraps(w) {
    var out = [];
    if (/[äöü]/.test(w)) out.push(w.replace("ä", "a").replace("ö", "o").replace("ü", "u"));
    if (/e$/.test(w)) out.push(w + "s", w + "n");
    else if (/en$/.test(w)) out.push(w.replace(/en$/, "e"), w.replace(/en$/, "s"));
    else if (/er$/.test(w)) out.push(w + "s", w + "n");
    else out.push(w + "s", w + "e", w + "en");
    return out.filter(function (x) { return x !== w; });
  }

  // German has no glued pronouns (chama-se): nothing to vary.
  function glued() { return []; }

  // The word in the stem: left unchanged, or with the plurals a learner
  // makes; the answer without its umlaut or with ss for ß.
  function shapes(ans, low, base, push) {
    if (base && base.toLowerCase() !== low) { push(base); pluralTraps(base.toLowerCase()).forEach(push); }
    var bare = low.replace(/ä/g, "a").replace(/ö/g, "o").replace(/ü/g, "u");
    if (bare !== low) push(bare);
    if (/ß/.test(low)) push(low.replace(/ß/g, "ss"));
  }

  /* ------------------------------------------------------ trampas */

  /* Trap versions of a right sentence: the errors a Spanish speaker makes
     in German — the article of the Spanish gender (die Mond, der Sonne),
     the indefinite and kein without the -e or with it, the forms of sein
     and haben mixed up, the verb ending of another person, the umlaut and
     the ß lost, and Spanish words inside.
     week: the traps test only what has been taught by then (articles from
     week 3, the accusative from week 4). */
  var ART = { der: ["die", "das"], die: ["der", "das"], das: ["der", "die"] };
  var INDEF = { ein: "eine", eine: "ein", kein: "keine", keine: "kein", einen: "ein", keinen: "kein" };
  var SEIN = { bin: "bist", bist: "ist", ist: "sind", sind: "ist", seid: "sind" };
  var HABEN = { habe: "hat", hast: "habt", hat: "habe", haben: "hat", habt: "hast" };
  var SPAN = { und: "y", ist: "es", ich: "yo", nicht: "no", sehr: "muy", gut: "bueno", heute: "hoy", hier: "aquí",
               danke: "gracias", bitte: "por favor", ja: "sí", nein: "no", mit: "con", aber: "pero" };
  var UML = /[äöü]/;

  /* One word of the sentence (c: see lezione.js traps).  safe: only the
     changes that are always an error (umlaut, ß, Spanish word, the
     indefinite with the wrong -e before a noun of the lesson). */
  function trapWord(c) {
    var low = c.low, i = c.i, toks = c.toks, week = c.week, safe = c.safe, rnd = c.rnd, put = c.put;
    var next = (toks[i + 1] || "").replace(/[^A-Za-zÄÖÜäöüß]/g, "");
    var nounNext = !!next && /^[A-ZÄÖÜ]/.test(next);
    if (week >= 3 && ART[low] && nounNext && !safe) put(ART[low][Math.floor(rnd() * 2)]);
    if (week >= 3 && INDEF[low] && nounNext && !safe) put(INDEF[low]);
    if (week >= 4 && (low === "einen" || low === "keinen") && nounNext) put(low.replace(/en$/, ""));
    if (!safe && SEIN[low]) put(SEIN[low]);
    if (!safe && week >= 4 && HABEN[low]) put(HABEN[low]);
    if (SPAN[low]) put(SPAN[low]);
    if (UML.test(low)) put(low.replace("ä", "a").replace("ö", "o").replace("ü", "u"));
    if (/ß/.test(low)) put(low.replace("ß", "ss"));
    // the verb ending of another person (wohnst → wohnt, lerne → lernt)
    if (!safe && i > 0 && low.length > 4) {
      if (/st$/.test(low)) put(low.replace(/st$/, "t"));
      else if (/[^e]t$/.test(low) && /^(du|er|sie|es|ihr)$/i.test(toks[i - 1] || "")) put(low.replace(/t$/, "st"));
    }
  }

  /* ------------------------------------------------------ banco */

  function defArt(word, g, plural) { return plural ? "die" : g === "m" ? "der" : g === "f" ? "die" : "das"; }
  function indefArt(word, g, plural) { return plural ? "" : g === "f" ? "eine" : "ein"; }

  // The words without umlaut that are other forms: «er fahrt» is «ihr fahrt», not a slip.
  var UMLAUT_GRAMMAR = {};
  ("schon zahlen mochte mochtest mochten hatte hattest hatten wurde wurdest wurden konnte konnten musste mussten " +
   "durfte durften fahrt fahrst schlaft schlafst lauft laufst tragt tragst wascht waschst halt haltst lasst " +
   "bruder vater mutter tochter apfel garten mantel vogel ofen boden laden fruh zuruck").split(" ")
    .forEach(function (w) { UMLAUT_GRAMMAR[w] = 1; });
  // The closed words: articles, possessives, pronouns, sein and haben.
  var CLOSED = {};
  ("der die das den dem des ein eine einen einem einer eines kein keine keinen keinem keiner " +
   "mein meine meinen meinem dein deine deinen deinem ich du er sie es wir ihr mich dich mir dir ihn ihm uns euch " +
   "bin bist ist sind seid sein habe hast hat haben habt").split(" ").forEach(function (w) { CLOSED[w] = 1; });
  // What is left after the common stem when the difference is an ending.
  var ENDING = /^(|e|en|er|es|em|n|s|st|t|et|est|te|ten)$/;

  /* ------------------------------------------------------ el color del género */

  /* Signalgrammatik (Schritte, Menschen): der azul, das verde, die rojo y
     el plural amarillo, siempre el mismo color, con una forma además del
     color (■ ▲ ● ◆) para quien no distingue los colores.  El color es el
     del sustantivo, no el del artículo: «mit der Mutter» va en rojo (die
     Mutter), «die Zimmer» en amarillo (el plural de das Zimmer).  Lo que
     no se sabe no se pinta: solo los sustantivos de las palabras de la
     semana y de las tablas de las lecciones (learn), sus plurales y sus
     compuestos (der Handschuh, como der Schuh).  El núcleo lo usa en
     Palabras de la semana, la lección y la devolución (app.js genderPaint),
     y el aviso «es die Sonne» en la corrección (notice). */
  var G_LABEL = { m: "masculino", f: "femenino", n: "neutro", pl: "plural" };
  var G_MARK = { m: "■", n: "▲", f: "●", pl: "◆" };   // ■ ▲ ● ◆
  // The genders an article can go with (any case).
  var G_ART = { der: ["m", "f", "pl"], die: ["f", "pl"], das: ["n"], den: ["m", "pl"], dem: ["m", "n"], des: ["m", "n"],
                ein: ["m", "n"], eine: ["f"], einen: ["m"], einem: ["m", "n"], einer: ["f"], eines: ["m", "n"],
                kein: ["m", "n"], keine: ["f", "pl"], keinen: ["m", "pl"], keinem: ["m", "n"], keiner: ["f", "pl"], keines: ["m", "n"] };
  // The gender a learner means with the article (nominative and accusative).
  var G_MEANT = { der: ["m"], die: ["f", "pl"], das: ["n"], den: ["m", "pl"], ein: ["m", "n"], eine: ["f"], einen: ["m"],
                  kein: ["m", "n"], keine: ["f", "pl"], keinen: ["m", "pl"] };
  // Only plural (die Eltern) or a plural with a Spanish gloss in singular.
  var G_PL_ONLY = { Eltern: 1, Geschwister: 1, Leute: 1, Ferien: 1, Großeltern: 1, Lebensmittel: 1, Kosten: 1 };
  var G_LEX = {};
  var G_NOUN = "[A-ZÄÖÜ][a-zäöüßé]*(?:-[A-ZÄÖÜ]?[a-zäöüßé]+)*";   // é: das Café
  // article, the adjectives between (der kleine, alte Tisch), the noun
  var G_RE = new RegExp("(^|[^A-Za-zÄÖÜäöüß])([DdEeKk][a-z]{1,5})([ \\u00a0]+)((?:[a-zäöüß]+(?:e|en|er|es|em),?[ \\u00a0]+){0,2})(" +
                        G_NOUN + ")(?![A-Za-zÄÖÜäöüßé])", "g");
  var G_ONE = new RegExp("^(der|die|das)\\s+(" + G_NOUN + ")$");

  // capitalized but not a noun: «das Ihre», «das Sie»
  var G_PRON = /^(Sie|Ihr|Ihre|Ihren|Ihrem|Ihrer|Ihres|Euer|Eure|Ich|Du|Er|Es|Wir)$/;
  // a determiner among the «adjectives»: the article is that one (das keine gute Idee)
  var G_DET = /(^|[ ,\u00a0])((k?ein|[mds]ein|ihr|unser|eur)(e|en|er|es|em)|(dies|jen|jed|manch|welch)(e|en|er|es|em))[ ,\u00a0]/i;

  function gAllows(art, g) { return (G_ART[art] || []).indexOf(g) >= 0; }
  function gFold(w) { return w.replace(/ä/g, "a").replace(/ö/g, "o").replace(/ü/g, "u").replace(/Ä/g, "A").replace(/Ö/g, "O").replace(/Ü/g, "U"); }
  function gCap(w) { return w.charAt(0).toUpperCase() + w.slice(1); }

  function gAdd(art, noun, plural) {
    if (!noun || G_LEX[noun]) return;
    G_LEX[noun] = plural || G_PL_ONLY[noun] ? "pl" : art === "der" ? "m" : art === "die" ? "f" : "n";
  }
  function gAddEntry(text, gloss) {
    String(text || "").split(/\s+\/\s+/).forEach(function (one) {
      var m = G_ONE.exec(one.trim());
      if (m) gAdd(m[1], m[2], m[1] === "die" && /^(los|las)\s/.test(String(gloss || "")));
    });
  }

  /* The nouns of the course: the words of every week and the gender
     tables of the lessons («Tisch | der | la mesa»). */
  function gLearn(course) {
    ((course && course.weeks) || []).forEach(function (w) {
      (w.vocab || []).forEach(function (v) { gAddEntry(v[0], v[1]); });
      (((w.lesson || {}).blocks) || []).forEach(function (b) {
        var t = b.table;
        // only the lists of words with their article («Palabra | Artículo»)
        if (!t || !/^(palabra|sustantivo)$/i.test(String((t.head || [])[0] || "").trim()) ||
            !(t.head || []).some(function (h) { return /art[ií]culo|g[ée]nero/i.test(h); })) return;
        (t.rows || []).forEach(function (r) {
          var cells = r.map(function (c) { return String(c || "").replace(/\*/g, "").trim(); });
          var art = cells.filter(function (c) { return /^(der|die|das)$/.test(c); })[0];
          var noun = cells.filter(function (c) { return new RegExp("^" + G_NOUN + "$").test(c) && c.length > 1; })[0];
          if (art && noun) gAdd(art, noun);
        });
      });
    });
    return Object.keys(G_LEX).length;
  }

  // A noun of the course: { g, form } (form: the plural or another case of it).
  function gLookup(noun, deep) {
    if (G_LEX[noun]) return { g: G_LEX[noun], lemma: noun, form: false };
    var tries = [noun, gFold(noun)], ends = ["nen", "ern", "en", "n", "er", "e", "s", "es"];
    for (var i = 0; i < tries.length; i++) {
      for (var k = 0; k < ends.length; k++) {
        var e = ends[k], w = tries[i];
        if (w.length > e.length + 2 && w.slice(-e.length) === e) {
          var base = w.slice(0, -e.length);
          if (G_LEX[base] && G_LEX[base] !== "pl") return { g: G_LEX[base], lemma: base, form: true, end: e };
        }
      }
      if (i === 1 && tries[1] !== noun && G_LEX[tries[1]] && G_LEX[tries[1]] !== "pl") return { g: G_LEX[tries[1]], lemma: tries[1], form: true, end: "" };
    }
    // a compound takes the gender of its last part (der Handschuh: der Schuh)
    if (!deep) {
      for (var j = 3; j <= noun.length - 3; j++) {
        var tail = gCap(noun.slice(j));
        if (/^[a-zäöüß]/.test(noun.charAt(j))) { var r = gLookup(tail, true); if (r) return r; }
      }
    }
    return null;
  }

  /* The gender of «art noun», or null when it is not known or the article
     does not fit the noun (die Tisch: no color, it is wrong). */
  function gOf(art, noun) {
    art = String(art || "").toLowerCase();
    if (!G_ART[art]) return null;
    var x = gLookup(noun);
    // an unknown noun after «das» is neuter, but not a pronoun (Ist das Ihre Wohnung?)
    if (!x) return art === "das" && !G_PRON.test(noun) ? "n" : null;
    if (x.g === "pl") return gAllows(art, "pl") ? "pl" : null;
    if (!x.form) {
      if (gAllows(art, x.g)) return x.g;
      // die Zimmer: the plural of das Zimmer (only the nouns whose plural has no ending)
      return x.g !== "f" && /(er|el|en|chen|lein)$/.test(noun) && gAllows(art, "pl") ? "pl" : null;
    }
    // a form of the noun: den Kollegen (n-Deklination) is singular
    var weak = x.g === "m" && /e$/.test(x.lemma) && (x.end === "n" || x.end === "en");
    if (weak && gAllows(art, "m")) return "m";
    if (gAllows(art, "pl")) return "pl";
    return gAllows(art, x.g) ? x.g : null;
  }

  /* The articles of a text with the gender of their noun:
     [{ at, len, art, g, adj, noun }]. */
  function gMarks(text) {
    var out = [], m;
    G_RE.lastIndex = 0;
    while ((m = G_RE.exec(String(text || "")))) {
      var art = m[2], g = gOf(art, m[5]);
      // a determiner in between: the «das» is a pronoun (dass das keine gute Idee ist)
      if (g && G_DET.test(m[4])) g = null;
      // «das» guessed for an unknown noun: not with words in between (das letzte Woche
      // reparierte Auto) nor after a comma (das Auto, das Peter fährt: a relative)
      if (g && !gLookup(m[5]) && (m[4] || /,[ \u00a0]*$/.test(String(text).slice(0, m.index + m[1].length)))) g = null;
      if (g) out.push({ at: m.index + m[1].length, len: art.length, art: art, g: g, adj: m[4], noun: m[5] });
      // not an article (Kaffee, Er): look again right after that word
      G_RE.lastIndex = g ? m.index + m[0].length : m.index + m[1].length + art.length;
    }
    return out;
  }

  function gSpan(doc, art, g, mark) {
    var s = doc.createElement("span");
    s.className = "gen gen-" + g + (mark ? " mk" : "");
    s.setAttribute("title", G_LABEL[g]);
    s.textContent = art;
    return s;
  }
  // The gender a table header or a row label names (Masculino, Femenino, Plural, der Balkon).
  function gHead(text) {
    var t = String(text || "").replace(/[*()]/g, "").trim();
    // «Masculino», «Femenino», «Neutro», «Plural», «Nom. masc.», «Dativ plural»
    // only the gender, maybe after a case: not «Neutro o formal» (the register)
    // nor «citar (plural)» (the verb)
    var h = /^(?:(?:un|nom|nominativ|nominativo|akk|akkusativ|acusativo|dat|dativ|dativo|gen|genitiv|genitivo)\.?\s+)?(masc|masculino|maskulin|maskulinum|fem|femenino|feminin|femininum|neutr|neutro|neutrum|plural)\.?$/i.exec(t);
    if (h) return { mas: "m", fem: "f", neu: "n", plu: "pl" }[h[1].toLowerCase().slice(0, 3)];
    var m = G_ONE.exec(t);
    return m ? gOf(m[1], m[2]) : null;
  }
  var G_BLOCK = /^(P|LI|TD|TH|DIV|H1|H2|H3|H4|SECTION|UL|OL|TABLE|TR|DETAILS|SUMMARY|BUTTON|BR)$/;
  var G_SKIP = /^(SCRIPT|STYLE|TEXTAREA|INPUT|SELECT|OPTION)$/;

  /* Paint a piece of the page (an element already in the document): the
     columns and rows of the tables that name a gender, then every article
     followed by a noun of the course.  mark: the form beside the color
     (■ ▲ ● ◆), for the word lists and the correction.  Painting twice
     changes nothing. */
  function gPaint(el, opts) {
    if (!el || !el.ownerDocument) return 0;
    opts = opts || {};
    var doc = el.ownerDocument, n = 0;
    // tables: a column (Masculino | Femenino…) or a row that names a gender
    Array.prototype.forEach.call(el.querySelectorAll("table"), function (t) {
      var heads = Array.prototype.map.call(t.querySelectorAll("thead th"), function (th) { return gHead(th.textContent); });
      var artCol = Array.prototype.some.call(t.querySelectorAll("thead th"), function (th) { return /art[ií]culo|g[ée]nero/i.test(th.textContent); });
      Array.prototype.forEach.call(t.querySelectorAll("tbody tr"), function (tr) {
        var cells = tr.children, rowG = cells.length ? gHead(cells[0].textContent) : null;
        for (var k = 0; k < cells.length; k++) {
          // the plural row of a masculine column (die Kollegen): the row says it
          var g = heads[k] && k > 0 && rowG === "pl" ? "pl" : heads[k] || (k > 0 ? rowG : null);
          if (!g && artCol && /^(der|die|das)$/.test(cells[k].textContent.trim())) g = { der: "m", die: "f", das: "n" }[cells[k].textContent.trim()];
          if (g && !/\bgen-/.test(cells[k].className)) { cells[k].className += (cells[k].className ? " " : "") + "gen-c gen-" + g; n++; }
        }
      });
      Array.prototype.forEach.call(t.querySelectorAll("thead th"), function (th, k) {
        if (heads[k] && !/\bgen-/.test(th.className)) th.className += (th.className ? " " : "") + "gen-c gen-" + heads[k];
      });
    });
    // the rows of a long table shown as cards (app.js renderTableCards)
    Array.prototype.forEach.call(el.querySelectorAll(".rowcard"), function (rc) {
      var h = rc.querySelector(".rc-h"), rowG = h ? gHead(h.textContent) : null;
      Array.prototype.forEach.call(rc.querySelectorAll(".rc-line"), function (ln) {
        var k = ln.querySelector(".rc-k"), v = ln.querySelector(".rc-v");
        var kg = k && gHead(k.textContent), g = kg && rowG === "pl" ? "pl" : kg || rowG;
        if (g && v && !/\bgen-/.test(v.className)) { v.className += " gen-c gen-" + g; n++; }
      });
    });
    // the text: the nodes in order, a line break between blocks
    var nodes = [], text = "", lastBlock = null, lastParent = null;
    (function walk(node) {
      for (var c = node.firstChild; c; c = c.nextSibling) {
        if (c.nodeType === 3) {
          var b = c.parentNode;
          while (b && b !== el && !G_BLOCK.test(b.nodeName)) b = b.parentNode;
          if (b !== lastBlock) { text += "\n"; lastBlock = b; }
          // two inline tags glued (<b>der Tisch</b><small>la mesa</small>): not one word
          else if (/[A-Za-zÄÖÜäöüß]$/.test(text) && /^[A-Za-zÄÖÜäöüß]/.test(c.nodeValue) && c.parentNode !== lastParent) text += "\u0001";
          lastParent = c.parentNode;
          nodes.push({ node: c, at: text.length });
          text += c.nodeValue;
        } else if (c.nodeType === 1 && !G_SKIP.test(c.nodeName) && !/\bgen\b/.test(c.getAttribute("class") || "")) {
          if (G_BLOCK.test(c.nodeName)) lastBlock = null;
          walk(c);
        }
      }
    })(el);
    var marks = gMarks(text);
    // from the end, so that splitting a node leaves the earlier offsets right
    for (var i = marks.length - 1; i >= 0; i--) {
      var mk = marks[i];
      for (var j = nodes.length - 1; j >= 0; j--) {
        var nd = nodes[j];
        if (nd.at > mk.at) continue;
        var off = mk.at - nd.at;
        if (off + mk.len > nd.node.nodeValue.length) break;   // split by a tag: leave it
        var mid = nd.node.splitText(off);
        mid.splitText(mk.len);
        mid.parentNode.replaceChild(gSpan(doc, mid.nodeValue, mk.g, opts.mark), mid);
        n++;
        break;
      }
    }
    return n;
  }

  /* «der Sonne» where «die Sonne» was due: the warning of the correction
     (only when the article says another gender, not another case:
     «ein Tisch» for «einen Tisch» is the accusative, not the gender). */
  function gNotice(given, want) {
    var g0 = String(given || ""), out = null;
    gMarks(want).some(function (w) {
      var m = new RegExp("(^|[^A-Za-zÄÖÜäöüß])" + w.noun + "(?![A-Za-zÄÖÜäöüß])", "i").exec(g0);
      if (!m) return false;
      // the nearest article before the noun, at most two words (adjectives) away
      var before = g0.slice(0, m.index + m[1].length).match(/[A-Za-zÄÖÜäöüß]+/g) || [], said = null;
      for (var k = before.length - 1; k >= 0 && k >= before.length - 3; k--) {
        if (G_ART[before[k].toLowerCase()]) { said = before[k]; break; }
        // only adjectives in between (mit Frau after «den Mann»: not its article)
        if (!/^[a-zäöüß]+(e|en|er|es|em)$/.test(before[k])) break;
      }
      if (!said) return false;
      var low = said.toLowerCase(), due = w.art.toLowerCase();
      if (low === due || !G_MEANT[low] || G_MEANT[low].indexOf(w.g) >= 0) return false;
      // what was written, adjectives included: «eine kleinen Bruder»
      out = { said: before.slice(k).join(" ") + " " + g0.substr(m.index + m[1].length, w.noun.length), art: w.art, adj: w.adj, noun: w.noun, g: w.g };
      return true;
    });
    return out;
  }
  function gEsc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function gNoticeHtml(given, want) {
    var x = gNotice(given, want);
    if (!x) return "";
    return '<div class="note gen-note">Ojo con el género: es <b lang="de-DE"><span class="gen gen-' + x.g + ' mk" title="' + G_LABEL[x.g] + '">' +
      gEsc(x.art) + "</span> " + gEsc(x.adj + x.noun) + "</b> (" + G_LABEL[x.g] + '), no «<span lang="de-DE">' + gEsc(x.said) + "</span>».</div>";
  }

  /* The genders that deceive (trampas.js, «Trampas del castellano»): the
     words of the week whose Spanish gloss has the other gender (der Mond
     → la luna, die Hose → el pantalón).  Only der ↔ la and die ↔ el, and
     only when every gloss agrees (die Uhr: el reloj; la hora, out); the
     neuter has no Spanish twin, it would be every das. */
  function gTraps(course) {
    var out = [], seen = {};
    ((course && course.weeks) || []).forEach(function (w) {
      (w.vocab || []).forEach(function (v) {
        var m = G_ONE.exec(String(v[0] || "").trim());
        if (!m || m[1] === "das" || seen[m[2]] || G_PL_ONLY[m[2]]) return;
        var arts = String(v[1] || "").split(/[;,]/).map(function (s) { return (/^\s*(el|la)\s/.exec(s) || [])[1]; });
        if (!arts[0] || arts.some(function (a) { return a && a !== arts[0]; })) return;
        if ((arts[0] === "el") === (m[1] === "der")) return;
        seen[m[2]] = 1;
        var gl = String(v[1]).split(/[;,]/)[0].trim();
        out.push({ week: w.week, art: m[1], noun: m[2], g: m[1] === "der" ? "m" : "f", es: String(v[1]), ex: v[2] || "",
                   note: "«" + gl + "» es " + (arts[0] === "el" ? "masculino" : "femenino") + " en castellano, pero *" + m[1] + " " + m[2] +
                     "* es " + (m[1] === "der" ? "masculino" : "femenino") + "." });
      });
    });
    return out;
  }

  var GENDER = { learn: gLearn, add: gAdd, of: gOf, lookup: gLookup, marks: gMarks, paint: gPaint, head: gHead,
                 notice: gNotice, noticeHtml: gNoticeHtml, LABEL: G_LABEL, MARK: G_MARK,
                 traps: gTraps, ARTS: ["der", "die", "das"],
                 size: function () { return Object.keys(G_LEX).length; } };

  LANG.rules = {
    /* Corrección (engine.js grade).  Las diéresis cuentan (schon ≠ schön):
       la que falta es «casi»; una en otro lugar es otra palabra
       (strictMarks).  Las mayúsculas no cuentan (la corrección no las mira:
       las notas lo recuerdan). */
    grade: {
      strictMarks: true, graveIsGrammar: false, hyphen: false,
      // ss for ß (heisse, Strasse) is «casi»: the spelling of Switzerland.
      fold: function (s) { return s.replace(/ß/g, "ss"); },
      // A missing umlaut that leaves another real word is grammar, not a slip:
      // the plural, the verb that changes its vowel, the Konjunktiv.
      markIsGrammar: function (given) { return !!UMLAUT_GRAMMAR[given]; },
      // An article, a pronoun, sein/haben or an ending is grammar, not a typo.
      typoIsGrammar: function (given, want) {
        if (CLOSED[given] || CLOSED[want]) return true;
        var i = 0;
        while (i < given.length && i < want.length && given[i] === want[i]) i++;
        var a = given.slice(i), b = want.slice(i);
        // a lost e before n is a typo (Morgn for Morgen), not an ending
        if ((a === "n" && b === "en") || (a === "en" && b === "n")) return false;
        return i >= 3 && ENDING.test(a) && ENDING.test(b);
      }
    },

    // The color of the gender (Signalgrammatik): app.js genderPaint.
    gender: GENDER,

    // The umlaut is not a tilde (devolucion.js slipText).
    slip: { falta_tilde: "lleva diéresis", sobra_tilde: "va sin diéresis", otra_tilde: "lleva otra diéresis" },

    save: {
      blank: { syllabusV: 1 },
      syllabus: migrateSyllabus
    },

    /* Los rangos: del turista que llega a Múnich al bávaro de toda la vida. */
    ranks: [
      [1, "Tourist"], [3, "Gast"], [6, "Besucher"],
      [10, "Nachbar"], [14, "Stammgast"], [18, "Plaudertasche"],
      [23, "Kenner"], [28, "Dichter"], [34, "Münchner"], [40, "Urbayer"]
    ],

    /* Las medallas: nombres en alemán, descripción en castellano.  Los id
       son los de la app de italiano (quedan en las partidas guardadas). */
    badges: {
      "primo-passo": ["Erster Schritt", "Contestá tu primera pregunta."],
      centurione: ["Volltreffer", "100 respuestas correctas."],
      mille: ["Tausendundeins", "1000 respuestas correctas."],
      settimana: ["Sieben Tage", "Racha de 7 días."],
      mese: ["Dreißig Tage", "Racha de 30 días."],
      a2: ["Niveau A2", "Vencé al jefe de la semana 13."],
      b1: ["Niveau B1", "Vencé al jefe de la semana 26."],
      b2: ["Niveau B2", "Vencé al jefe de la semana 39."],
      c1: ["Niveau C1", "Superá el examen final."],
      congiuntivo: ["Konjunktiv-Meister", "Vencé al jefe de la semana 39 sin perder vidas."],
      sfidante: ["Herausforderer", "50 desafíos resueltos."],
      studioso: ["Fleißig", "Leé la teoría de 10 semanas."],
      erudito: ["Gelehrt", "Leé la teoría de las 52 semanas."],
      penna: ["Erster Satz", "Escribí de memoria tu primera frase."],
      scrittore: ["Schriftsteller", "100 frases escritas de memoria."],
      fulmine: ["Blitz", "20 aciertos en un Blitz de 60 segundos."],
      frasario: ["Gesprächig", "100 frases de conversación aprendidas."],
      lettore: ["Leser", "Terminá 5 lecturas."],
      bologna: ["Applaus in Berlin", "Terminá la historia de Martín in Berlin."],
      umanista: ["Humanist", "Leé las 10 lecturas de cultura."],
      ponte: ["Brücke", "50 cognados pasados al alemán."],
      perfetta: ["Perfekte Woche", "Completá todas las misiones de una semana."],
      "dieci-perfette": ["Zehn perfekte", "Diez semanas con todas las misiones."],
      equilibrio: ["Vier Saiten", "Un día con las cuatro destrezas: input, output, forma y fluidez."],
      cinquecento: ["Fünfhundert Wörter", "500 palabras practicadas."],
      giornaliera: ["Tagesheld", "Diez desafíos del día ganados."],
      costante: ["Beständig", "Cumplí la meta diaria 5 días."]
    },

    text: {
      howSay: "¿Cómo se dice en alemán?",
      translateQ: "¿Cuál es la traducción al alemán?",
      translateTo: "Traducí al alemán",
      findError: "Encontrá el error: tocá la palabra que está mal",
      nounWithArt: "Escribilo en alemán, con el artículo (der, die, das)",
      verbInf: "Escribí el infinitivo en alemán"
    },

    // No German dictionary yet (no diagnosis module): null.
    isWord: function () { return null; },

    /* Las personas: ich, du, er/sie/es, wir, ihr, sie/Sie.  La tercera rota
       entre er, sie y es; el plural de cortesía (Sie) va con la tercera del
       plural. */
    persons: {
      labels: ["ich", "du", "er", "wir", "ihr", "sie"],
      third: [["er", "sie", "es"], ["sie", "Sie"]],
      weighted: [0, 0, 1, 1, 2, 2, 2, 3, 3, 4, 5, 5],
      skip: [],
      impersonal: { 2: "es", 5: "sie" },
      imperative: ["ich", "du", "Sie", "wir", "ihr", "Sie"]
    },

    conj: {
      imperativeForms: function (im) {
        return [null, im.du || null, im.Sie || null, im.wir || null, im.ihr || null, im.Sie || null];
      },
      extraLabels: { imperativo: "Imperativ", gerundio: "Partizip I", participio: "Partizip II" },
      // An infinitive in parentheses in a stem («Du ___ (spielen)»).
      infRe: /\(([a-zäöüß]+(?:en|ern|eln))\)/i,
      // An infinitive in the word list of the week.
      verbRe: /(en|ern|eln)$/
    },

    /* Distractors that test the rule, not the eye (drills.js wordVariants). */
    distract: {
      artSg: ["der", "die", "das", "ein", "eine"],
      artPl: ["die", "keine"],
      prepArt: { in: ["im", "in der", "ins"], an: ["am", "an der", "ans"], zu: ["zum", "zur"], von: ["vom", "von der"] },
      classes: [
        ["wer", "was", "wie", "wo", "woher", "wohin", "wann", "warum", "welche", "welcher", "welches", "wie viel"],
        ["in", "an", "auf", "aus", "bei", "mit", "nach", "von", "zu", "für", "um", "über"],
        ["der", "die", "das", "den", "dem", "des"],
        ["ein", "eine", "einen", "einem", "einer"],
        ["kein", "keine", "keinen", "keinem", "keiner"],
        ["ich", "du", "er", "sie", "es", "wir", "ihr", "Sie"],
        ["mich", "dich", "ihn", "uns", "euch"],
        ["mir", "dir", "ihm", "ihr", "uns", "euch", "ihnen", "Ihnen"],
        ["mein", "meine", "dein", "deine", "sein", "seine", "ihr", "ihre", "unser", "unsere", "euer", "eure"],
        ["und", "oder", "aber", "denn", "sondern", "weil", "dass", "wenn", "als", "ob"],
        ["nicht", "kein", "nie", "nichts", "niemand"],
        ["viel", "viele", "wenig", "wenige", "sehr", "zu", "genug", "mehr"],
        ["immer", "nie", "oft", "manchmal", "jetzt", "heute", "morgen", "gestern", "schon", "noch", "bald", "später"],
        ["bin", "bist", "ist", "sind", "seid"], ["habe", "hast", "hat", "haben", "habt"],
        ["gut", "besser", "am besten"], ["schlecht", "schlechter"]
      ],
      minLen: 1,
      glued: glued,
      // In parentheses only a noun (capital) or an infinitive: «(ella)»,
      // «(tomar)» are Spanish glosses, not the word to transform.
      baseRe: [/([A-Za-zÄÖÜäöüß]+)\s*→/i, /\(([A-ZÄÖÜ][a-zäöüß]+|[a-zäöüß]+(?:en|ern|eln))\)/],
      // «(mamá)», «(Argentina)»: a Spanish gloss is not the word to transform.
      glossRe: { test: function (w) {
        return /[ñ¿¡áéíóú]/.test(w) || (" " + LANG.spanish.es + " ").indexOf(" " + w.toLowerCase() + " ") >= 0 ||
          /(ción|dad|ar|ir|ina|ana)$/i.test(w);
      } },
      shapes: shapes,
      pluralTraps: pluralTraps
    },

    vocab: {
      adj: [/(ig|lich|isch|bar|sam|los|voll)$/],
      article: /^(der|die|das)\s+/
    },

    // No phrase scenes yet (frasi_data.js is missing): every scene in week 52.
    sceneWeek: {},

    traps: {
      tokenRe: /^([«„"(¿¡]*)([A-Za-zÄÖÜäöüßÀ-ÿ]+(?:-[A-Za-zÄÖÜäöüß]+)*)([.,;:!?»“")…]*)$/,
      word: trapWord
    },

    classes: [["sein", "haben", "werden", "machen", "gehen", "kommen"],
              ["der", "die", "das", "ein", "eine", "kein", "keine"],
              ["in", "an", "auf", "aus", "bei", "mit", "nach", "von", "zu", "für"],
              ["im", "am", "zum", "zur", "vom", "ins", "ans"],
              ["ich", "du", "er", "sie", "es", "wir", "ihr", "Sie"],
              ["mich", "dich", "ihn", "mir", "dir", "ihm", "uns", "euch"],
              ["der", "die", "das", "welcher", "welche"],
              ["mein", "meine", "dein", "deine", "sein", "seine", "ihr", "ihre"],
              ["sehr", "viel", "mehr", "weniger", "gut", "gern"],
              ["Präsens", "Perfekt", "Präteritum", "Futur", "Konjunktiv II", "Imperativ", "Passiv"]],

    banca: {
      // La última semana de A1, A2, B1 y B2 en el temario (tools/de/TEMARIO.md).
      levels: [10, 20, 32, 42],
      verbPair: ["sein", "haben"],
      verbPairTags: ["sein", "haben", "presente"],
      clitics: ["mich", "dich", "ihn", "sie", "es", "uns", "euch"],
      defArt: defArt,
      indefArt: indefArt,
      pluralGender: function (n) { return n[1]; },
      withArt: function (art, word) { return art + " " + word; },
      invariable: "No cambia en plural.",
      verbNote: function (n) { return n[6] || ""; },
      artOptions: function () { return ["der", "die", "das"]; },
      artWhy: function (word, g) {
        return g === "m" ? "Masculino: der." : g === "f" ? "Femenino: die." : "Neutro: das.";
      },
      countable: function (n) { return !/(solo|sólo|siempre|se usa) (en |en el )?singular|no tiene plural|sin plural/i.test(n[6] || ""); },
      pluralNote: function (n) { return n[6] || ""; },
      // German has no compulsory article contractions to drill at A1.
      preps: [],
      contr: {},
      indefPreps: {},
      CRASE_WEEK: 99,
      prepFor: function (prep) { return [prep, false]; },
      prepNote: function (prep, art, ans) { return "*" + prep + " " + art + "* = *" + ans + "*."; },
      prepAccept: function (prep, art, ans) { return [ans]; },
      genericAdj: ["neu", "alt", "schön", "groß", "klein", "weiß", "rot", "schwarz", "gelb", "grün", "blau",
                   "teuer", "billig", "modern", "sauber", "schmutzig", "berühmt", "lang", "kurz", "schwer", "leicht",
                   "bequem", "einfach", "komisch", "perfekt", "voll", "leer", "warm", "kalt"],
      concrete: { casa: 1, haus: 1, essen: 1, kleidung: 1, reise: 1, stadt: 1, schule: 1 },
      special: function (n) { return !!n[6]; },
      kinds: ["art", "art", "pl", "agr"],
      // The subject is never left out in German.
      subject: /^(Ich|Du|Er|Sie|Es|Wir|Ihr) (.+)$/,
      subjectKeep: /./,
      cure: {
        genero: { tags: ["genero", "articulos"], err: ["genero"], forms: "art" },
        articulo: { tags: ["articulos"], err: ["articulo", "genero"], forms: "art" },
        plural: { tags: ["plurales"], err: ["plural"], forms: "pl" },
        acusativo: { tags: ["acusativo"], err: ["acusativo", "articulo"] },
        orden: { tags: ["orden"], err: ["orden"] },
        umlaut: { err: ["ortografia"], vocab: true },
        espanol: { tags: ["lexico"], err: ["espanol", "falso_amigo"], vocab: true },
        falso_amigo: { tags: ["falsos_amigos"], err: ["falso_amigo", "espanol"], vocab: true },
        persona: { tags: ["presente"], err: ["persona"] }
      }
    }
  };
})(typeof window !== "undefined" ? window : globalThis);
