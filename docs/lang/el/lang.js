/*
 * Δρόμος C1 — el paquete griego (griego moderno): configuración e interfaz.
 *
 * window.LANG lo lee el núcleo (docs/js/*.js): la marca, la voz, el prefijo
 * de guardado, dónde están los datos y todos los textos de la interfaz que
 * dependen de la lengua.  rules.js (LANG.rules) le agrega lo suyo después.
 * Lo que se ve está en griego y en castellano rioplatense, con las islas
 * del Egeo de fondo (el tema: theme.css).  El curso arranca con la primera
 * temporada (13 semanas, de A1 a A2) y el paquete todavía no trae todos los
 * módulos (Boot.LANGS.el dice qué archivos le faltan).
 *
 * Lo propio del griego: otro alfabeto.  Los botones que hay que entender
 * desde el primer día (seguir, comprobar) van en castellano; lo griego
 * aparece donde acompaña un ícono o una traducción.  El teclado de la app
 * trae la distribución griega (kbRows) y, con teclado físico, las letras
 * latinas se convierten solas (kbMap, kbDead: js/teclado.js).
 */
(function (root) {
  "use strict";

  // Las interferencias del español que se fosilizan en griego.
  var GREÑOL = [["genero", "el género no es el del castellano: το πρόβλημα, η θάλασσα, ο καφές"],
                ["articulo", "los nombres propios llevan artículo: ο Νίκος, η Μαρία, η Ελλάδα"],
                ["acusativo", "el acusativo cambia el artículo: βλέπω τον Νίκο, θέλω έναν καφέ"],
                ["tilde", "el acento se escribe siempre: καλημέρα, ευχαριστώ"],
                ["aspecto", "después de να y θα va el otro tema del verbo: θέλω να αγοράσω"],
                ["negacion", "δεν con el indicativo, μην después de να"],
                ["ortografia", "cinco maneras de escribir «i»: η, ι, υ, ει, οι"],
                ["falso_amigo", "falsos amigos: η εμπάθεια (rencor), ο ιδιώτης (particular), η σκάλα (escalera)"]];

  // Latin key → Greek letter: the standard Greek layout, for a physical
  // keyboard that has no Greek (teclado.js converts while typing).
  var KB_MAP = { q: ";", w: "ς", e: "ε", r: "ρ", t: "τ", y: "υ", u: "θ", i: "ι", o: "ο", p: "π",
                 a: "α", s: "σ", d: "δ", f: "φ", g: "γ", h: "η", j: "ξ", k: "κ", l: "λ",
                 z: "ζ", x: "χ", c: "ψ", v: "ω", b: "β", n: "ν", m: "μ",
                 "á": "ά", "é": "έ", "í": "ί", "ó": "ό", "ý": "ύ", "?": ";" };
  // The accent key of the Greek layout (;), or the acute of a Spanish keyboard: then a vowel.
  var KB_DEAD = { on: [";", "´", "Dead"],
                  to: { "α": "ά", "ε": "έ", "η": "ή", "ι": "ί", "ο": "ό", "υ": "ύ", "ω": "ώ",
                        "Α": "Ά", "Ε": "Έ", "Η": "Ή", "Ι": "Ί", "Ο": "Ό", "Υ": "Ύ", "Ω": "Ώ" } };

  var LANG = {
    code: "el",
    name: "Ελληνικά",
    brand: "Δρόμος C1",
    tts: "el-GR",
    voiceRe: /^el/i,              // any Greek voice
    voicePrefer: /^el[-_]gr/i,
    storage: "dromosc1",          // dromosc1.save.v1, dromosc1.pending.v1…: never change
    base: "lang/el/",
    lt: "el-GR",                  // LanguageTool
    lingualibre: { q: "Q36510", code: "ell", tag: "ell" },
    themeColor: { light: "#a9d8ee", dark: "#0c2238" },
    hyphenWords: false,
    // The letters of a word of this language (the core's default is Latin).
    letters: "a-zà-ÿ\u0370-\u03ff\u1f00-\u1fff",
    // …and the ones that are only its own: what is read aloud (app.js sayOnly)
    ownLetters: "\u0370-\u03ff\u1f00-\u1fff",

    /* Spanish or Greek?  The alphabet says it: anything with a Greek letter
       is Greek, the rest is Spanish (app.js spanishText). */
    spanish: {
      sure: /^[^\u0370-\u03ff\u1f00-\u1fff]*$/,
      notEs: /[\u0370-\u03ff\u1f00-\u1fff]/,
      unknownEs: /./,
      word: /[a-zà-ÿ\u0370-\u03ff\u1f00-\u1fff]+/g,
      es: "", target: "", both: "",
      askTarget: /(en|al) griego/i
    },

    // A gap answer never glues to its neighbour in Greek.
    glue: function () { return null; },

    hlStop: { "ο": 1, "η": 1, "το": 1, "οι": 1, "τα": 1, "τον": 1, "την": 1, "του": 1, "της": 1, "ένας": 1, "μία": 1, "μια": 1, "ένα": 1,
              "και": 1, "είναι": 1, "εγώ": 1, "εσύ": 1, "δεν": 1, "σε": 1, "στο": 1, "στην": 1, "στον": 1, "με": 1, "από": 1, "για": 1, "να": 1, "θα": 1 },

    realVoiceSkip: {},
    pairBar: null,

    // Fallback groups (there is no diagnosis module for Greek yet).
    diagGroups: {
      generic: { lexico: 1, faltante: 1, sobrante: 1, tipeo: 1, vuoto: 1 },
      lexical: { lexico: 1, espanol: 1, falso_amigo: 1, vuoto: 1 },
      slips: { tilde: 1, tipeo: 1 },
      unrecorded: { tipeo: 1, vuoto: 1 }
    },

    interlang: {
      title: "📓 Cuaderno de greñol",
      blurb: "Las interferencias del español que se fosilizan. Verde: catorce días sin ese error.",
      list: function () { return (root.Diagnosi && root.Diagnosi.GRENOL) || GREÑOL; }
    },

    refNames: {},

    why: [["viaje", "⛵ Viajar por las islas"], ["vivir", "🏠 Vivir en Grecia o en Chipre"], ["trabajo", "💼 Trabajo"],
          ["estudio", "🎓 Estudiar allá"], ["familia", "👨‍👩‍👧 Familia y raíces"], ["cultura", "🎭 Música, cine, libros, historia"],
          ["certificado", "📜 El Πιστοποιητικό Ελληνομάθειας"]],

    /* The exam, after the Πιστοποιητικό Ελληνομάθειας of the Centre for the
       Greek Language (there is no Greek exam yet: esame_data.js is missing,
       the core does not offer it). */
    exam: {
      prove: [["ascolto", "Κατανόηση προφορικού λόγου", "🎧"], ["lettura", "Κατανόηση γραπτού λόγου", "📖"], ["strutture", "Γραμματική", "🧩"],
              ["lessico", "Λεξιλόγιο", "📚"], ["scrittura", "Παραγωγή γραπτού λόγου", "✍️"]],
      abilities: { ascolto: "Ακρόαση", lettura: "Ανάγνωση", strutture: "Γραμματική", produzione: "Γραφή" },
      rubric: [["thema", "Το θέμα"], ["synochi", "Συνοχή"], ["lexilogio", "Λεξιλόγιο"], ["grammatiki", "Γραμματική"]],
      kinds: { argomentativo: "Κείμενο γνώμης", formale: "Επίσημο μήνυμα", email: "Μήνυμα σε φίλο", other: "Γράμμα" },
      genres: {},
      optional: ["strutture", "lessico"],
      ricName: "Ανασύνθεση",
      provaToast: function (id, name) { return "Εξέταση: " + name; },
      byAbility: "Por habilidad",
      missionSub: "Al estilo del Πιστοποιητικό Ελληνομάθειας.",
      lead: "Pruebas al estilo del Πιστοποιητικό Ελληνομάθειας.",
      sub: { ascolto: "", lettura: "", strutture: "", lessico: "", scrittura: "" },
      final: "Τελική εξέταση", levelC1: "Επίπεδο Γ1", passed: "Πέρασες την εξέταση.",
      deliver: "Entregar", transcript: "La transcripción",
      vfHelp: "verdadera o falsa", vf: "Σωστό ή λάθος", yes: "σωστό", no: "λάθος",
      writing: "Γραφή"
    },

    /* The shareable card: the Aegean sky and sea, a whitewashed village on
       the caldera with a blue dome, and a meander along the bottom. */
    card: {
      file: "dromos-c1-",
      frame: function (g, W, H) {
        var grad = g.createLinearGradient(0, 0, 0, H); grad.addColorStop(0, "#8fcbea"); grad.addColorStop(0.55, "#d9effa"); grad.addColorStop(1, "#1f6fb5");
        g.fillStyle = grad; g.fillRect(0, 0, W, H);
        // the sea
        g.fillStyle = "#1560a8"; g.fillRect(0, H * 0.72, W, H * 0.28);
        // the white houses on the cliff, stepped
        g.fillStyle = "#ffffff";
        [[0.04, 0.6, 0.12, 0.2], [0.14, 0.52, 0.1, 0.28], [0.22, 0.58, 0.12, 0.22], [0.72, 0.56, 0.12, 0.24], [0.82, 0.5, 0.1, 0.3], [0.9, 0.6, 0.1, 0.2]]
          .forEach(function (r) { g.fillRect(r[0] * W, r[1] * H, r[2] * W, r[3] * H); });
        // a blue dome with its cross
        g.fillStyle = "#1560a8"; g.beginPath(); g.arc(0.19 * W, 0.52 * H, 0.04 * W, Math.PI, 0); g.fill();
        g.fillRect(0.19 * W - 1.5, 0.52 * H - 0.04 * W - 12, 3, 12); g.fillRect(0.19 * W - 5, 0.52 * H - 0.04 * W - 9, 10, 3);
        // the meander (greca) along the bottom edge
        g.fillStyle = "#ffffff"; g.fillRect(0, H - 24, W, 24);
        g.strokeStyle = "#1560a8"; g.lineWidth = 3;
        for (var x = 4; x < W; x += 24) {
          g.beginPath(); g.moveTo(x, H - 4); g.lineTo(x, H - 20); g.lineTo(x + 16, H - 20); g.lineTo(x + 16, H - 9);
          g.lineTo(x + 7, H - 9); g.lineTo(x + 7, H - 14); g.stroke();
        }
        // the card: lime white with a blue edge and a blue header
        g.fillStyle = "#fffefb"; g.fillRect(40, 36, W - 80, H - 110);
        g.strokeStyle = "#1560a8"; g.lineWidth = 6; g.strokeRect(40, 36, W - 80, H - 110);
        g.fillStyle = "#1560a8"; g.fillRect(40, 36, W - 80, 44);
      },
      head: { y: 66, color: "#ffffff" },
      text: "#14283c", muted: "#55667a",
      rank: { font: "bold 56px Georgia, serif", y: 150 },
      lines: [200, 240, 276]
    },

    // Confetti: the blue of the domes, the bougainvillea, the sun, the olive, and a ferry, an olive, an amphora.
    confetti: { bits: ["⛵", "🫒", "🏺", "🐙", "🌊", "🏛️"], n: 30, ms: 2900,
                colors: ["--mar", "--mar-claro", "--sol", "--mata", "--ceu", "--coral", "--bugan"], fallback: "#1560a8" },

    ui: {
      langEs: "griego",
      wordAdj: "griega",
      tabs: [["oggi", "☀️", "Σήμερα"], ["percorso", "🧭", "Δρόμος"], ["io", "👤", "Εγώ"]],
      // Still no readings: only the training of every week (app.js allMaterialCard).
      allTabs: [["frasi", "⛵", "Εξάσκηση"]],
      allDesc: { frasi: "la práctica de todas las semanas: palabras, repaso y lo que ya viste" },
      today: "Σήμερα", train: "Εξάσκηση", read: "Διάβασμα", me: "Εγώ",
      path: "Ο Δρόμος", pathEl: "el Δρόμος", pathAl: "al Δρόμος", pathTu: "tu Δρόμος",
      // The logo is a street plate of the islands: white letters on Aegean blue.
      plate: { cls: "placa", sup: "p-sup", main: "p-rua" },
      logo: "Δρόμος C1", level: "Nivel",
      week: "Semana", weekLow: "semana", romanWeeks: false,
      of: " de ",
      cheer: { last: "¡La última! Η τελευταία!", almost: "¡Casi! Σχεδόν!", half: "¡Mitad de camino!" },
      hello: function (h) { return h < 12 ? "Καλημέρα! ☀️" : h < 20 ? "Καλησπέρα! ⛵" : "Καλησπέρα! 🌙"; },
      pausaUna: "un διάλειμμα",
      pausaBtn: "<b>Διάλειμμα</b><small>el recreo: 3 minutos con lo de tu semana</small>",
      daily: "Desafío del día", dailyWon: "🎯 Desafío del día ganado. Μπράβο!",
      review: "Repaso", reviewEl: "el repaso", micro: "Repaso 2 min",
      words: "Λέξεις", wordsFreq: "Palabras frecuentes",
      wordOrNot: "¿Palabra o no?", wordYes: "✓ Palabra", wordNo: "✗ No existe",
      lampo: "Αστραπή", lampoEl: "La Αστραπή",
      boss: "jefe", Boss: "Jefe",
      pathLead: "Griego moderno desde el alfabeto, semana a semana. Cada semana tiene <b>3 estrellas</b>: " +
        "jugar la lección, superar la semana y dominarla.",
      fraseDay: "Η λέξη της ημέρας · la palabra del día",
      calendarGreen: "verde",
      ponte: "Del español al griego con reglas.",
      falsi: "Falsos amigos", capire: "Entender",
      suoni: "Sonidos", suoniSub: "Las cinco «i», δ y ντ, γ y γκ, θ, χ: ¿cuál escuchaste?",
      tr: "Traducí", gap: "Conjugá en contexto", err: "Encontrá el error",
      forme: "Formas", formeSub: "Artículos, plurales y casos.",
      formeMission: "Artículos, plurales y casos, generados del banco.",
      scenes: "Frases",
      stories: "Historias de la semana", easyListen: "Escucha tranquila",
      series: { flood: "Πλημμύρα", settimana: "Η εβδομάδα", main: "Ο Μαρτίν στην Ελλάδα" },
      karaoke: "Leer y escuchar",
      theoryBack: "← a la semana", theory: "Teoría · semana ",
      right: ["Σωστά!", "Μπράβο!", "Τέλεια!"], wasThis: "Era así:",
      next: "Seguir →", check: "Comprobar",
      inLang: "στα ελληνικά… (en griego)",
      // the accented vowels, in their own row on top of the app's keyboard
      // (teclado.js puts there the keys that are not in the rows) and in
      // the row of accents of every exercise
      keys: ["ά", "έ", "ή", "ί", "ό", "ύ", "ώ", "ϊ", "ϋ"],
      // the Greek layout, as on a phone
      kbRows: ["ςερτυθιοπ", "ασδφγηξκλ", "ζχψωβνμ"],
      // the question mark of Greek, next to the space bar
      kbQuestion: ";",
      // with a mouse too: the learner's keyboard has no Greek letters
      kbAlways: true,
      kbMap: KB_MAP, kbDead: KB_DEAD,
      giusto: ["Σωστά!", "Μπράβο!", "Τέλεια!", "Πολύ καλά!", "Ωραία!", "Έτσι!"],
      quasi: "¡Casi! Σχεδόν: un detalle.",
      sbagliato: ["Δεν πειράζει. Era así:", "No pasa nada. Era así:", "Tranqui, era así:"],
      keywordEx: "«η σκάλα» → escalera, no escala",
      pausa: "Διάλειμμα", sfida: "Desafío", examC1: "Examen C1",
      perfectWeek: "¡Semana perfecta! Τέλεια!",
      great: "🏆 Άριστα! ¡Excelente!", good: "👏 Μπράβο! ¡Muy bien!",
      chal: "Desafíos", chalLead: "Desafíos extra de la semana: cada uno es una ronda corta, con corrección. ",
      scrivi: "Γράψε", parla: "Μίλα", storia: "Historia", storiaOf: "de la semana", storiaArea: "Historia de la semana",
      metaEx: "«En seis meses pido un φραπέ en Naxos sin pensar»",
      freqNote: "Palabras por frecuencia: las 2.000 más frecuentes cubren más del 80 % de lo que se dice. ",
      exportFile: "dromos-c1-copia-", icsFile: "griego-diario.ics", icsId: "EL",
      icsSummary: "☕ Διάλειμμα: 3 minutos de griego", icsAlarm: "Πάμε! 3 minutos de griego",
      dgNotes: "Σάββατο… φίλοι… ευτυχώς…", dgText: "Reconstruí el texto…",
      parlaIn: "Γράψε στα ελληνικά…", send: "Enviar", hi: "Γεια σου! Τι κάνεις;", ok: "Entendido.",
      scriviIn: "Γράψε εδώ, στα ελληνικά…",
      switchTo: "Cambiar a Italiano 🇮🇹", switchCode: "it",
      // The first season is there, not every module yet: the first start
      // says what a week brings (inicio.js) and gives no date for C1.
      partial: {
        pace: "Por ahora está la primera temporada: 13 semanas, del alfabeto al nivel A2. Con 20 minutos, 5 días por semana, la terminás en tres meses. El resto del camino hasta C1 está en construcción.",
        path: "las 13 semanas de la primera temporada, del alfabeto a A2 (el resto, en construcción); cada semana trae sus palabras, sus misiones y más práctica.",
        weekSteps: "<li>☕ el διάλειμμα (el recreo) y el repaso</li>"
      }
    }
  };

  root.LANG = LANG;
})(typeof window !== "undefined" ? window : globalThis);
