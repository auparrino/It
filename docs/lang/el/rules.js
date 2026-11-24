/*
 * Δρόμος C1 — las reglas del griego moderno que usa el núcleo (LANG.rules):
 * la corrección, cómo suena una palabra escrita (la ayuda de lectura de las
 * primeras semanas), el guardado, los rangos y las medallas, los
 * distractores de los ejercicios, las trampas de las lecciones y el banco.
 *
 * El paquete no trae todavía conjugador, diagnóstico ni banco griegos; lo
 * que el núcleo les pide a esas piezas queda acá con lo justo, para que
 * crezca cuando lleguen.
 */
(function (root) {
  "use strict";

  var LANG = root.LANG = root.LANG || {};

  function isObj(v) { return !!v && typeof v === "object" && !Array.isArray(v); }

  /* ------------------------------------------------------ guardado */

  function migrateSyllabus(s) {
    if (isObj(s) && !s.syllabusV) s.syllabusV = 1;
    return s;
  }

  /* ------------------------------------------------------ cómo suena */

  /* Una palabra griega escrita con las letras del castellano, para leerla
     las primeras semanas: «καλημέρα» → «kaliméra».  La tilde va donde va el
     acento griego (que marca la sílaba fuerte, como la nuestra).  Las
     convenciones son las de la lección 1: γ = g suave (la de «lago»; «y»
     delante de e, i), δ = d suave (la de «nada»), θ = «th» (la z de
     Madrid), χ = j, ζ = z con zumbido, β = v, y los dígrafos (ου = u,
     αι = e, ει = οι = i, μπ = b, ντ = d, γκ = g, αυ/ευ = av/af, ev/ef). */
  var ACUTE = { a: "á", e: "é", i: "í", o: "ó", u: "ú" };
  var VOWEL = { "α": "a", "ε": "e", "η": "i", "ι": "i", "ο": "o", "υ": "i", "ω": "o" };
  var CONS = { "β": "v", "γ": "g", "δ": "d", "ζ": "z", "θ": "th", "κ": "k", "λ": "l", "μ": "m", "ν": "n", "ξ": "x",
               "π": "p", "ρ": "r", "σ": "s", "ς": "s", "τ": "t", "φ": "f", "χ": "j", "ψ": "ps" };
  var VOICELESS = { "θ": 1, "κ": 1, "ξ": 1, "π": 1, "σ": 1, "ς": 1, "τ": 1, "φ": 1, "χ": 1, "ψ": 1 };
  // one letter, split: the base, whether it carries the accent, whether a diaeresis
  function parts(ch) {
    var d = ch.normalize("NFD");
    return { b: d[0], acc: d.indexOf("\u0301") > 0, dia: d.indexOf("\u0308") > 0 };
  }
  function soundWord(word) {
    var cs = Array.prototype.map.call(word.toLowerCase().normalize("NFC"), parts), out = "", n = cs.length;
    for (var i = 0; i < n; i++) {
      var c = cs[i], nx = cs[i + 1], b = c.b, nb = nx && !nx.dia ? nx.b : "";
      var two = b + nb, acc = c.acc || (nx && nx.acc && !nx.dia), v = null, skip = 0;
      // vowel digraphs (never when the second letter has a diaeresis: «αϊ» is a-i)
      // (nor when the first one carries the accent: «τσάι» is tsá-i)
      if (c.acc) { /* no digraph */ }
      else if (two === "ου") { v = "u"; skip = 1; }
      else if (two === "αι") { v = "e"; skip = 1; }
      else if (two === "ει" || two === "οι" || two === "υι") { v = "i"; skip = 1; }
      if ((two === "αυ" || two === "ευ" || two === "ηυ") && !c.acc) {
        // αυ / ευ: «av», «ev» before a vowel or a voiced consonant; «af», «ef» before a voiceless one or at the end
        var after = cs[i + 2] ? cs[i + 2].b : "";
        out += (nx.acc ? ACUTE[VOWEL[b]] : VOWEL[b]) + (!after || VOICELESS[after] ? "f" : "v");
        i++; continue;
      }
      if (v) { out += acc ? ACUTE[v] : v; i += skip; continue; }
      if (VOWEL[b]) { v = VOWEL[b]; out += c.acc ? ACUTE[v] : v; continue; }
      // consonant digraphs
      // μπ, ντ, γκ: b, d, g at the start; inside the word, with a light nasal
      // (πέντε → pénde), except in words that also start with it (μπαμπάς → babás)
      if (two === "μπ" || two === "ντ" || two === "γκ") {
        var plain = { "μπ": "b", "ντ": "d", "γκ": "g" }[two], nasal = { "μπ": "mb", "ντ": "nd", "γκ": "ng" }[two];
        out += i === 0 || (n > 1 && cs[0].b + cs[1].b === two) ? plain : nasal; i++; continue;
      }
      if (two === "γγ") { out += "ng"; i++; continue; }
      if (two === "γχ") { out += "nj"; i++; continue; }
      if (two === "τσ" || two === "τς") { out += "ts"; i++; continue; }
      if (two === "τζ") { out += "dz"; i++; continue; }
      if (b === nb && CONS[b]) { continue; }                      // double consonant: one sound
      if (b === "γ") {
        // γι / γει / γυ + vowel, unstressed: the i is only a «y» (γιατί → yatí, γεια → ya)
        var len = two === "γε" && cs[i + 2] && cs[i + 2].b === "ι" && !cs[i + 2].dia ? 2 : (nb === "ι" || nb === "υ" || nb === "η") ? 1 : 0;
        var stressed = len && (cs[i + 1].acc || (len === 2 && cs[i + 2].acc));
        if (len && !stressed && cs[i + 1 + len] && VOWEL[cs[i + 1 + len].b]) { out += "y"; i += len; continue; }
        // before the sounds e, i: «y» (γέρος → yéros, γυναίκα → yinéka)
        var third = cs[i + 2] && !cs[i + 2].dia ? cs[i + 2].b : "";
        var front = nb === "ε" || nb === "ι" || nb === "η" || nb === "υ" || ((nb === "α" || nb === "ο") && third === "ι");
        out += front ? "y" : "g"; continue;
      }
      if (b === "σ" && (nb === "β" || nb === "γ" || nb === "δ" || nb === "μ")) { out += "z"; continue; }   // σμ = zm (κόσμος)
      if (CONS[b]) { out += CONS[b]; continue; }
      out += word[i] || "";
    }
    return out;
  }
  // The few words that are not said as they are written.
  var SOUND_AS = { "συγγνώμη": "signómi" };
  function sound(text) {
    return String(text == null ? "" : text).replace(/[\u0370-\u03ff\u1f00-\u1fff]+/g, function (w) {
      return SOUND_AS[w.toLowerCase()] || soundWord(w);
    }).replace(/;/g, "?");
  }

  /* ------------------------------------------------------ distractores */

  // Plurals a learner makes: the -s of Spanish, the singular left as it is.
  function pluralTraps(w) {
    var out = [w + "ς"];
    if (/ος$/.test(w)) out.push(w.replace(/ος$/, "ες"), w.replace(/ος$/, "α"));
    else if (/α$/.test(w)) out.push(w.replace(/α$/, "ας"), w.replace(/α$/, "οι"));
    else if (/η$/.test(w)) out.push(w.replace(/η$/, "ης"), w.replace(/η$/, "οι"));
    else if (/ο$/.test(w)) out.push(w.replace(/ο$/, "οι"), w.replace(/ο$/, "ες"));
    else if (/ι$/.test(w)) out.push(w + "α", w.replace(/ι$/, "ες"));
    return out.filter(function (x) { return x !== w; });
  }
  function glued() { return []; }

  function strip(s) { return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").normalize("NFC"); }

  // The word in the stem, left unchanged or with a learner's plural; the
  // answer without its accent.
  function shapes(ans, low, base, push) {
    if (base && base.toLowerCase() !== low) { push(base); pluralTraps(base.toLowerCase()).forEach(push); }
    var bare = strip(low);
    if (bare !== low) push(bare);
  }

  /* ------------------------------------------------------ trampas */

  /* Trap versions of a right sentence: the errors a Spanish speaker makes
     in Greek — the article of another gender or without its case, the
     forms of είμαι and έχω of another person, the accent lost, the
     negation of Spanish.  week: only what has been taught by then (the
     articles from week 3, the accusative from week 5). */
  var ART = { "ο": ["η", "το"], "η": ["ο", "το"], "το": ["ο", "η"] };
  var ACC = { "τον": "ο", "την": "η", "έναν": "ένας" };
  var INDEF = { "ένας": ["μία", "ένα"], "μία": ["ένας", "ένα"], "μια": ["ένας", "ένα"], "ένα": ["ένας", "μία"] };
  var EIMAI = { "είμαι": "είσαι", "είσαι": "είναι", "είμαστε": "είστε", "είστε": "είμαστε" };
  var ECHO = { "έχω": "έχει", "έχεις": "έχω", "έχει": "έχω", "έχουμε": "έχετε", "έχετε": "έχουμε", "έχουν": "έχει" };
  var GREEK = "\u0370-\u03ff\u1f00-\u1fff";

  function trapWord(c) {
    var low = c.low, i = c.i, toks = c.toks, week = c.week, safe = c.safe, rnd = c.rnd, put = c.put;
    var next = (toks[i + 1] || "").replace(new RegExp("[^" + GREEK + "]", "g"), "");
    if (week >= 3 && ART[low] && next && !safe) put(ART[low][Math.floor(rnd() * 2)]);
    if (week >= 3 && INDEF[low] && next && !safe) put(INDEF[low][Math.floor(rnd() * 2)]);
    if (week >= 5 && ACC[low] && next && !safe) put(ACC[low]);
    if (!safe && EIMAI[low]) put(EIMAI[low]);
    if (!safe && week >= 4 && ECHO[low]) put(ECHO[low]);
    // the accent lost: always an error (every word of two syllables has one)
    if (strip(low) !== low && low.length > 3) put(strip(low));
    if (low === "δεν" && !safe) put("όχι");
  }

  /* ------------------------------------------------------ banco */

  function defArt(word, g, plural) { return plural ? (g === "n" ? "τα" : "οι") : g === "m" ? "ο" : g === "f" ? "η" : "το"; }
  function indefArt(word, g, plural) { return plural ? "" : g === "m" ? "ένας" : g === "f" ? "μία" : "ένα"; }

  // The closed words: articles, pronouns, είμαι and έχω.  A slip on them is grammar.
  var CLOSED = {};
  ("ο η το οι τα τον την του της των τους τις ένας μία μια ένα έναν ενός μιας " +
   "εγώ εσύ αυτός αυτή αυτό εμείς εσείς αυτοί αυτές αυτά με σε μου σου μας σας " +
   "είμαι είσαι είναι είμαστε είστε έχω έχεις έχει έχουμε έχετε έχουν δεν μην να θα")
    .split(" ").forEach(function (w) { CLOSED[w] = 1; });
  // What is left after the common stem when the difference is an ending.
  var ENDING = /^(|ς|ν|ω|ώ|ει|εις|α|ας|ες|ε|η|ης|ο|ος|ου|οι|ων|ους|ουμε|ετε|ουν|άω|άς|άει|άμε|άτε|άνε|αμε|ατε|αν|ι|ια)$/;

  LANG.rules = {
    /* Corrección (engine.js grade).  El acento cuenta (πότε ≠ ποτέ): el que
       falta es «casi»; uno en otra sílaba es otra palabra (strictMarks).
       Las mayúsculas no cuentan.  La sigma final (ς) y la otra (σ) son la
       misma letra, y el signo de pregunta griego (;) vale como «?». */
    grade: {
      strictMarks: true, graveIsGrammar: false, hyphen: false,
      norm: function (s) { return s.replace(/ς/g, "σ").replace(/\u037e/g, ";").replace(/\?/g, ";").replace(/\u00b5/g, "μ"); },
      typoIsGrammar: function (given, want) {
        if (CLOSED[given] || CLOSED[want]) return true;
        var i = 0;
        while (i < given.length && i < want.length && given[i] === want[i]) i++;
        return i >= 3 && ENDING.test(given.slice(i)) && ENDING.test(want.slice(i));
      }
    },

    /* La ayuda de lectura (app.js): debajo de una palabra griega, cómo
       suena, hasta la semana «until» (después el alumno ya lee solo; se
       apaga antes desde el perfil). */
    sound: { of: sound, until: 4 },

    slip: { falta_tilde: "lleva acento escrito", sobra_tilde: "va sin acento", otra_tilde: "el acento va en otra sílaba" },

    save: {
      blank: { syllabusV: 1 },
      syllabus: migrateSyllabus
    },

    /* Los rangos: del turista que baja del ferry al isleño de toda la vida. */
    ranks: [
      [1, "Τουρίστας"], [3, "Ταξιδιώτης"], [6, "Επισκέπτης"],
      [10, "Γείτονας"], [14, "Θαμώνας"], [18, "Φίλος"],
      [23, "Γνώστης"], [28, "Ποιητής"], [34, "Νησιώτης"], [40, "Οδυσσέας"]
    ],

    /* Las medallas: nombres en griego, descripción en castellano.  Los id
       son los de la app de italiano (quedan en las partidas guardadas). */
    badges: {
      "primo-passo": ["Πρώτο βήμα", "Contestá tu primera pregunta."],
      centurione: ["Εκατό", "100 respuestas correctas."],
      mille: ["Χίλια και ένα", "1000 respuestas correctas."],
      settimana: ["Επτά μέρες", "Racha de 7 días."],
      mese: ["Τριάντα μέρες", "Racha de 30 días."],
      a2: ["Επίπεδο Α2", "Terminá la semana 13."],
      b1: ["Επίπεδο Β1", "Vencé al jefe de la semana 26."],
      b2: ["Επίπεδο Β2", "Vencé al jefe de la semana 39."],
      c1: ["Επίπεδο Γ1", "Superá el examen final."],
      congiuntivo: ["Μάστορας", "Vencé al jefe de la semana 39 sin perder vidas."],
      sfidante: ["Αθλητής", "50 desafíos resueltos."],
      studioso: ["Μελετηρός", "Leé la teoría de 10 semanas."],
      erudito: ["Σοφός", "Leé la teoría de todas las semanas."],
      penna: ["Πρώτη πρόταση", "Escribí de memoria tu primera frase."],
      scrittore: ["Συγγραφέας", "100 frases escritas de memoria."],
      fulmine: ["Αστραπή", "20 aciertos en una Αστραπή de 60 segundos."],
      frasario: ["Ομιλητικός", "100 frases de conversación aprendidas."],
      lettore: ["Αναγνώστης", "Terminá 5 lecturas."],
      bologna: ["Χειροκρότημα", "Terminá la historia de Martín en Grecia."],
      umanista: ["Ουμανιστής", "Leé las 10 lecturas de cultura."],
      ponte: ["Γέφυρα", "50 cognados pasados al griego."],
      perfetta: ["Τέλεια εβδομάδα", "Completá todas las misiones de una semana."],
      "dieci-perfette": ["Δέκα τέλειες", "Diez semanas con todas las misiones."],
      equilibrio: ["Τέσσερις χορδές", "Un día con las cuatro destrezas: input, output, forma y fluidez."],
      cinquecento: ["Πεντακόσιες λέξεις", "500 palabras practicadas."],
      giornaliera: ["Ήρωας της ημέρας", "Diez desafíos del día ganados."],
      costante: ["Σταθερός", "Cumplí la meta diaria 5 días."]
    },

    text: {
      howSay: "¿Cómo se dice en griego?",
      translateQ: "¿Cuál es la traducción al griego?",
      translateTo: "Traducí al griego",
      findError: "Encontrá el error: tocá la palabra que está mal",
      nounWithArt: "Escribilo en griego, con el artículo (ο, η, το)",
      verbInf: "Escribí el verbo en griego (la forma de «yo»)"
    },

    isWord: function () { return null; },

    /* Las personas: εγώ, εσύ, αυτός/αυτή/αυτό, εμείς, εσείς, αυτοί/αυτές/αυτά. */
    persons: {
      labels: ["εγώ", "εσύ", "αυτός", "εμείς", "εσείς", "αυτοί"],
      third: [["αυτός", "αυτή", "αυτό"], ["αυτοί", "αυτές", "αυτά"]],
      weighted: [0, 0, 1, 1, 2, 2, 2, 3, 3, 4, 5, 5],
      skip: [],
      impersonal: { 2: "αυτό", 5: "αυτά" },
      imperative: ["εγώ", "εσύ", "αυτός", "εμείς", "εσείς", "αυτοί"]
    },

    conj: {
      imperativeForms: function (im) {
        return [null, im.esy || null, null, null, im.eseis || null, null];
      },
      extraLabels: { imperativo: "Προστακτική", gerundio: "Γερούνδιο", participio: "Μετοχή" },
      infRe: /\(([\u0370-\u03ff\u1f00-\u1fff]+(?:ω|ώ|μαι))\)/i,
      verbRe: /(ω|ώ|μαι)$/
    },

    /* Distractors that test the rule, not the eye (drills.js wordVariants). */
    distract: {
      artSg: ["ο", "η", "το", "ένας", "μία", "ένα"],
      artPl: ["οι", "τα"],
      prepArt: { "σε": ["στον", "στην", "στο", "στους", "στις", "στα"] },
      classes: [
        ["τι", "ποιος", "πού", "πώς", "πότε", "γιατί", "πόσο", "πόσα"],
        ["σε", "από", "με", "για", "χωρίς", "μέχρι", "προς", "μετά"],
        ["ο", "η", "το", "οι", "τα"],
        ["τον", "την", "το", "τους", "τις", "τα"],
        ["στον", "στην", "στο", "στους", "στις", "στα"],
        ["ένας", "μία", "ένα", "έναν"],
        ["εγώ", "εσύ", "αυτός", "αυτή", "εμείς", "εσείς", "αυτοί"],
        ["μου", "σου", "του", "της", "μας", "σας", "τους"],
        ["και", "ή", "αλλά", "γιατί", "όταν", "αν", "ότι"],
        ["δεν", "μην", "όχι", "ποτέ", "τίποτα", "κανένας"],
        ["πολύ", "λίγο", "αρκετά", "πιο", "πάρα πολύ"],
        ["πάντα", "ποτέ", "συχνά", "μερικές φορές", "τώρα", "σήμερα", "αύριο", "χθες", "ήδη", "ακόμα", "μετά"],
        ["είμαι", "είσαι", "είναι", "είμαστε", "είστε"], ["έχω", "έχεις", "έχει", "έχουμε", "έχετε", "έχουν"],
        ["εδώ", "εκεί", "κοντά", "μακριά", "δίπλα", "απέναντι"]
      ],
      minLen: 1,
      glued: glued,
      baseRe: [/([\u0370-\u03ff\u1f00-\u1fff]+)\s*→/i, /\(([\u0370-\u03ff\u1f00-\u1fff]+)\)/],
      glossRe: { test: function (w) { return !/[\u0370-\u03ff\u1f00-\u1fff]/.test(w); } },
      shapes: shapes,
      pluralTraps: pluralTraps
    },

    vocab: {
      adj: [/(ος|ός|ικός|ινός|ής|ύς)$/],
      article: /^(ο|η|το|οι|τα)\s+/
    },

    sceneWeek: {},

    traps: {
      tokenRe: /^([«"(]*)([A-Za-zÀ-ÿ\u0370-\u03ff\u1f00-\u1fff]+(?:-[\u0370-\u03ff\u1f00-\u1fff]+)*)([.,;:!?»")…·]*)$/,
      word: trapWord
    },

    classes: [["είμαι", "έχω", "κάνω", "πάω", "θέλω", "μπορώ"],
              ["ο", "η", "το", "ένας", "μία", "ένα"],
              ["σε", "από", "με", "για", "χωρίς"],
              ["στον", "στην", "στο", "στους", "στις", "στα"],
              ["εγώ", "εσύ", "αυτός", "αυτή", "εμείς", "εσείς", "αυτοί"],
              ["με", "σε", "τον", "την", "το", "μας", "σας", "τους"],
              ["μου", "σου", "του", "της", "μας", "σας", "τους"],
              ["πολύ", "λίγο", "πιο", "καλά", "ωραία"],
              ["Ενεστώτας", "Αόριστος", "Μέλλοντας", "Υποτακτική", "Προστακτική", "Παρατατικός"]],

    banca: {
      levels: [10, 20, 32, 42],
      verbPair: ["είμαι", "έχω"],
      verbPairTags: ["είμαι", "έχω", "presente"],
      clitics: ["με", "σε", "τον", "την", "το", "μας", "σας", "τους"],
      defArt: defArt,
      indefArt: indefArt,
      pluralGender: function (n) { return n[1]; },
      withArt: function (art, word) { return art + " " + word; },
      invariable: "No cambia en plural.",
      verbNote: function (n) { return n[6] || ""; },
      artOptions: function () { return ["ο", "η", "το"]; },
      artWhy: function (word, g) {
        return g === "m" ? "Masculino: ο." : g === "f" ? "Femenino: η." : "Neutro: το.";
      },
      countable: function (n) { return !/(solo|sólo|siempre|se usa) (en |en el )?singular|no tiene plural|sin plural/i.test(n[6] || ""); },
      pluralNote: function (n) { return n[6] || ""; },
      preps: [],
      contr: {},
      indefPreps: {},
      CRASE_WEEK: 99,
      prepFor: function (prep) { return [prep, false]; },
      prepNote: function (prep, art, ans) { return "*" + prep + " " + art + "* = *" + ans + "*."; },
      prepAccept: function (prep, art, ans) { return [ans]; },
      genericAdj: ["καινούριος", "παλιός", "ωραίος", "μεγάλος", "μικρός", "άσπρος", "κόκκινος", "μαύρος", "κίτρινος", "πράσινος",
                   "ακριβός", "φτηνός", "μοντέρνος", "καθαρός", "βρόμικος", "διάσημος", "εύκολος", "δύσκολος", "ζεστός", "κρύος"],
      concrete: { "σπίτι": 1, "φαγητό": 1, "ρούχα": 1, "ταξίδι": 1, "πόλη": 1, "σχολείο": 1 },
      special: function (n) { return !!n[6]; },
      kinds: ["art", "art", "pl", "agr"],
      subject: /^(Εγώ|Εσύ|Αυτός|Αυτή|Εμείς|Εσείς|Αυτοί) (.+)$/,
      subjectKeep: /./,
      cure: {
        genero: { tags: ["genero", "articulos"], err: ["genero"], forms: "art" },
        articulo: { tags: ["articulos"], err: ["articulo", "genero"], forms: "art" },
        plural: { tags: ["plurales"], err: ["plural"], forms: "pl" },
        acusativo: { tags: ["acusativo"], err: ["acusativo", "articulo"] },
        tilde: { err: ["ortografia"], vocab: true },
        espanol: { tags: ["lexico"], err: ["espanol", "falso_amigo"], vocab: true },
        falso_amigo: { tags: ["falsos_amigos"], err: ["falso_amigo", "espanol"], vocab: true },
        persona: { tags: ["presente"], err: ["persona"] }
      }
    }
  };
})(typeof window !== "undefined" ? window : globalThis);
