/*
 * La Via C1 — el paquete italiano: configuración e interfaz.
 *
 * window.LANG lo lee el núcleo (docs/js/*.js): la marca, la voz, el prefijo
 * de guardado, dónde están los datos y todos los textos de la interfaz que
 * dependen de la lengua.  rules.js (LANG.rules) y los *_data.js le agregan
 * lo suyo después.  Lo que se ve está en italiano y en castellano
 * rioplatense, como siempre en La Via C1.
 */
(function (root) {
  "use strict";

  var LANG = {
    code: "it",
    name: "Italiano",
    brand: "La Via C1",
    tts: "it-IT",
    voiceRe: /^it/i,            // the phone's voices for this language
    voicePrefer: null,          // no preferred variant: the phone's order
    storage: "laviac1",         // laviac1.save.v1, laviac1.pending.v1…: never change
    base: "lang/it/",
    lt: "it",                   // LanguageTool
    lingualibre: { q: "Q652", code: "ita", tag: "ita" },
    themeColor: { light: "#7dbdf0", dark: "#12356a" },
    hyphenWords: false,         // «-» is not part of a word (it is in Portuguese: chama-se)

    /* Spanish or Italian?  What is read aloud after an answer is only the
       language studied: a Spanish gloss or option is never read with the
       Italian voice (app.js spanishText). */
    spanish: {
      sure: /[ñ¿¡áíóú]/i,       // Spanish for sure
      notEs: null,              // the language studied for sure
      unknownEs: /[xyj]|[sd]$/, // an unknown word spelled like this is Spanish (reflexiva, sujeto, ustedes)
      word: /[a-zàèéìòù]+/g,
      es: "el los las y es que por para muy pero yo hay cuando como donde de en usted ustedes nada " +
          "algo bien tambien todo ella ellos nosotros este esta ni",
      target: "io lui lei noi voi loro li gli ne ci vi ce ve il i di da in e ed ma che chi non è sono sei ho hai ha " +
              "allo alla ai agli alle della dei degli delle nel nella dal dalla sul sulla come perché anche più già " +
              "molto bene fa sta qui là sì mai sempre ancora tutto tutti niente",
      both: "la lo le los un una uno a me te se si con su mi tu no o al del per va poco cosa solo " +
            "casa mano foto madre gente radio moda amore ora pasta idea",
      // «¿Qué es «un mattone» en italiano?» asks for Italian, not a meaning
      askTarget: /(en|al) italiano/i
    },

    /* A gap answer that glues to its neighbour: an elided one (l’, dell’)
       joins the next word, l’amica; un po’ is truncated, not elided. */
    glue: function (a) { return /[’']$/.test(a) && !/\bpo[’']$/.test(a) ? "next" : null; },

    // Lesson highlighting: grammar words that are never marked.
    hlStop: { la: 1, il: 1, lo: 1, le: 1, i: 1, gli: 1, un: 1, una: 1, uno: 1, e: 1, di: 1, a: 1, "in": 1, che: 1, non: 1, da: 1, per: 1, con: 1, si: 1, mi: 1, ti: 1 },

    // A pair of Suoni with a real speaker, except these categories (the
    // file name cannot tell pèsca from pésca).
    realVoiceSkip: { vocali: 1 },
    // Double consonants: after the answer, a bar shows the longer sound.
    pairBar: { cat: "geminate", re: /([bcdfglmnprstvz])\1/ },

    // Category groups of the diagnosis (diagnosi.js ids), when Diagnosi
    // does not bring its own (Diagnosi.GROUPS).
    diagGroups: {
      generic: { lessico: 1, parola_mancante: 1, parola_in_piu: 1, refuso: 1, vuoto: 1 },
      lexical: { lessico: 1, parola_spagnola: 1, falso_amico: 1, vuoto: 1 },
      slips: { accento: 1, refuso: 1 },
      unrecorded: { refuso: 1, soggetto: 1, vuoto: 1 },
      tileSkip: { falso_amico: 1, parola_spagnola: 1, lessico: 1 }
    },

    /* Il quaderno dell'itañol (la guía, Della Putta 2011): las interferencias
       que se fosilizan; las claves son categorías de diagnosi.js. */
    interlang: {
      title: "📓 Cuaderno itañol",
      blurb: "Las interferencias del español que se fosilizan (Della Putta). Verde: catorce días sin ese error.",
      list: [["a_personale", "«a» personal: conosco Jorge, no *a Jorge*"], ["doppie", "dobles: nonno / nono"],
             ["accento", "è / e, vocales abiertas y cerradas"], ["ausiliare", "essere / avere"],
             ["participio_accordo", "sono andata: el participio concuerda"], ["ci_ne", "ci y ne"],
             ["articolo", "il / lo, artículo donde el español no lo pone"], ["preposizione_articolata", "nel, sul, dalla"],
             ["congiuntivo", "congiuntivo: penso che sia"], ["falso_amico", "falsos amigos: caldo, burro, salire"],
             ["parola_spagnola", "palabras en español dentro del italiano"]]
    },

    // The books of the week (course.json week.refs keys), when the course brings them.
    refNames: { dummies: "<b>Italian Grammar For Dummies</b>", routledge: "<b>Soluzioni</b> (Routledge)" },

    // Why: the learner's goal, on Hoje / Oggi.
    why: [["viaje", "🧳 Viajar"], ["familia", "👵 Familia, nonni"], ["ciudadania", "🇮🇹 Ciudadanía"], ["trabajo", "💼 Trabajo"],
          ["musica", "🎶 Música, ópera, cine"], ["pareja", "❤️ Pareja, amigos"], ["estudio", "🎓 Estudiar allá"]],

    /* The C1 exam: the provas (their ids are the data keys of
       esame_data.js), the rubric of the written texts (the AI's
       «punteggi»), the kinds of text. */
    exam: {
      prove: [["ascolto", "Ascolto", "🎧"], ["lettura", "Lettura", "📖"], ["strutture", "Strutture", "🧩"], ["lessico", "Lessico", "📚"], ["scrittura", "Scrittura", "✍️"]],
      abilities: { ascolto: "Ascolto", lettura: "Lettura", strutture: "Strutture", produzione: "Produzione" },
      rubric: [["adeguatezza", "adeguatezza"], ["coesione", "coesione"], ["correttezza", "correttezza"], ["lessico", "lessico"]],
      kinds: { argomentativo: "Testo argomentativo", other: "Lettera formale" },
      provaToast: function (id) { return "Prova di " + id; },
      byAbility: "Por abilità",
      missionSub: "Cinco pruebas como en el CILS: ascolto, lettura, strutture, lessico, scrittura. Mínimo 55 % en cada una.",
      lead: "Cinco pruebas, como en el CILS: cada una necesita el <b>55 %</b> y el promedio, el 60 %. Podés hacerlas en el orden que quieras y repetir una.",
      sub: {
        ascolto: "una entrevista larga con dos voces · 8 preguntas y 4 huecos",
        lettura: "un texto de 600 palabras · títulos por párrafo y vero/falso",
        strutture: "20 huecos y transformaciones: preposiciones, congiuntivo, relativos, pasiva…",
        lessico: "12 de formación de palabras y registro",
        scrittura: "un argumentativo de 200 palabras y una carta formal de 120"
      },
      final: "Esame finale", levelC1: "Livello C1", passed: "Esame superato.",
      deliver: "Consegnare", transcript: "La trascrizione",
      vfHelp: "vera o falsa", vf: "Vero o falso", yes: "vero", no: "falso",
      writing: "Produzione scritta"
    },

    /* The shareable card of the week (a canvas): the frame and where the
       lines go. */
    card: {
      file: "la-via-c1-",
      frame: function (g, W, H) {
        var grad = g.createLinearGradient(0, 0, 0, H); grad.addColorStop(0, "#7dbdf0"); grad.addColorStop(1, "#fbf8f1");
        g.fillStyle = grad; g.fillRect(0, 0, W, H);
        g.fillStyle = "#f3ebdb"; g.fillRect(40, 40, W - 80, H - 80);
        g.strokeStyle = "#1f2630"; g.lineWidth = 6; g.strokeRect(40, 40, W - 80, H - 80);
        g.fillStyle = "#1f2630";
      },
      head: { y: 90 },                // the title line, in the frame's color
      text: "#1f2630", muted: "#6b6a66",
      rank: { font: "bold 64px Georgia, serif", y: 170 },
      lines: [230, 275, 320]
    },

    // Confetti: emoji only.
    confetti: { bits: ["🇮🇹", "🍕", "✨", "🎉", "🍝", "⭐", "☕"], n: 16, ms: 1900 },

    ui: {
      langEs: "italiano",            // «en italiano», «tu italiano escrito»
      wordAdj: "italiana",           // «¿Es una palabra italiana?»
      tabs: [["oggi", "🏠", "Oggi"], ["frasi", "🏋️", "Allena"], ["leggi", "📖", "Leggi"], ["percorso", "🗺️", "Percorso"], ["io", "👤", "Io"]],
      today: "Oggi", train: "Allena", read: "Leggi", me: "Io",
      path: "Il percorso", pathEl: "el percorso", pathAl: "al percorso", pathTu: "tu percorso",
      // The logo and the titles are a street sign (a Roman «targa»): «La Via» is the way.
      plate: { cls: "targa", sup: "t-sup", main: "t-via" },
      logo: "Via C1", level: "livello",
      week: "Settimana", weekLow: "settimana", romanWeeks: true,
      of: " di ",
      cheer: { last: "Ultima!", almost: "Ci sei quasi.", half: "A metà." },
      hello: function (h) { return (h < 13 ? "Buongiorno" : h < 19 ? "Buon pomeriggio" : "Buonasera") + "! 👋"; },
      pausaUna: "una pausa caffè",
      pausaBtn: "<b>Pausa caffè</b><small>3 minutos con lo de tu semana</small>",
      daily: "Sfida del giorno", dailyWon: "🎯 Sfida del giorno ganada",
      review: "Ripasso", reviewEl: "el ripasso", micro: "Ripasso 2 min",
      words: "Parole", wordsFreq: "Parole frecuentes",
      wordOrNot: "Parola o no?", wordYes: "✓ Parola", wordNo: "✗ Non è una parola",
      lampo: "Lampo", lampoEl: "Lampo",
      boss: "jefe", Boss: "Jefe",
      pathLead: "De base a C1 en 52 misiones. Cada una tiene <b>3 estrellas</b>: " +
        "jugar la lección, superar la semana y dominarla. Los <b>jefes</b> cierran cada tramo.",
      fraseDay: "Frase del giorno",
      calendarGreen: "Verde fuerte",
      ponte: "Del español al italiano con reglas: -ción → -zione, h- → f-…",
      falsi: "Falsi amici", capire: "Capire",
      suoni: "Suoni", suoniSub: "Dobles, vocales, z, gli: ¿cuál escuchaste? Habla conectada, entonación y dictado.",
      tr: "Traduci", gap: "Coniuga in contesto", err: "Trova l'errore",
      forme: "Forme", formeSub: "Artículos, plurales, preposiciones con artículo y concordancia.",
      formeMission: "Artículos, plurales y preposiciones con artículo, generados del banco.",
      scenes: "Escenas",
      stories: "Storie della settimana", easyListen: "Ascolto facile",
      series: { flood: "Inondazione", settimana: "La settimana", main: "Martín a Bologna" },
      karaoke: "Leggi e ascolta",
      theoryBack: "← alla settimana", theory: "Teoria · settimana ",
      right: ["Esatto!", "Bravo!", "Perfetto!"], wasThis: "Era così:",
      next: "Avanti →", check: "Controlla",
      inLang: "in italiano…",
      keys: ["à", "è", "é", "ì", "ò", "ù", "'"],
      giusto: ["Bravo!", "Perfetto!", "Esatto!", "Benissimo!", "Ottimo!", "Così si fa!"],
      quasi: "Quasi! Ci sei.",
      sbagliato: ["Non fa niente. Era così:", "Capita. Era così:", "Dai, era così:"],
      keywordEx: "«burro» → un burro untado en manteca",
      pausa: "Pausa caffè", sfida: "Sfida", examC1: "Esame C1",
      perfectWeek: "¡Settimana perfetta!",
      great: "🏆 ¡Fantastico!", good: "👏 ¡Molto bene!",
      chal: "Sfide del Maestro", chalLead: "Los desafíos del <b>Soluzioni</b>, ahora con corrección: cada uno es una ronda corta. ",
      scrivi: "Scrivi", parla: "Parla", storia: "Storia", storiaOf: "della settimana", storiaArea: "Storia della settimana",
      metaEx: "«En seis meses pido un café en Nápoles sin pensar»",
      freqNote: "Palabras por frecuencia (KELLY, itWaC): las 2.000 más frecuentes cubren el 86 % de lo que se dice. ",
      exportFile: "italiano-copia-", icsFile: "italiano-diario.ics", icsId: "IT",
      icsSummary: "☕ Pausa caffè: 3 minutos de italiano", icsAlarm: "Andiamo! 3 minutos de italiano",
      dgNotes: "sabato… amici… per fortuna…", dgText: "Ricostruisci il testo…",
      parlaIn: "Scrivi in italiano…", send: "Invia", hi: "Ciao!", ok: "Capisco.",
      scriviIn: "Scrivi qui, in italiano…",
      switchTo: "Cambiar a Português 🇧🇷", switchCode: "pt"
    }
  };

  root.LANG = LANG;
})(typeof window !== "undefined" ? window : globalThis);
