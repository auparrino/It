/*
 * Errores: el modelo de error común (auditoría 3.0, C9 y P1).
 *
 * Todo lo que corrige (las respuestas cerradas, Scrivi con sus reglas,
 * LanguageTool y la IA, el dictogloss, la tarea del tramo, Escritura plus,
 * la revisión final de Parla) arma el mismo objeto y lo anota con
 * Errores.record, así «Tus errores», la Clínica y el repaso leen lo mismo:
 *
 *   { cat,        la categoría (la del diagnóstico del idioma)
 *     nivel,      "incorrecto" | "desliz" | "poco_natural" | "aceptable"
 *     registro,   null | "formal" | "informal" (el que pedía la consigna)
 *     mal, bien,  lo escrito y la corrección mínima (bien: null si no se
 *                 sabe, "" si lo escrito sobra)
 *     pista, regla, contraste,   las capas de la explicación
 *     fuente,     "reglas" | "lt" | "ia" | "alumno"
 *     seguro,     true para las reglas propias (0 falsas alarmas medidas)
 *     label }     el nombre de la categoría para mostrar
 *
 * Lo aceptable y lo poco natural no son errores: no se anotan.  Las
 * categorías que la Clínica no conoce (lo que LanguageTool llama
 * «grammatica», lo que la IA no supo clasificar) quedan en el registro con
 * su porqué pero fuera del puntaje (state.errs).
 *
 * Además, lo común a la corrección con IA: el nivel de una respuesta en los
 * dos idiomas (level), la capa de la explicación según cuántas veces el
 * alumno ya vio la categoría (depth, P6), el caché de explicaciones y de
 * correcciones por oración (cache*), y el contexto del curso para los
 * pedidos (courseCtx, promptCtx).
 *
 * En state: errs {cat: {n, fixed, last}} y errLog [{cat, g, e, at, l, x,
 * p, c, v, r, f, s, k}] (g: lo escrito, e: la corrección, l: el nombre,
 * x: el porqué, p: la pista, c: el contraste, v: el nivel, r: el registro,
 * f: la fuente, s: segura, k: cuenta para la Clínica).
 */
(function (root) {
  "use strict";

  function Dg() { return root.Diagnosi || null; }
  function LG() { return root.LANG || {}; }
  function groups() { var D = Dg(); return (D && D.GROUPS) || LG().diagGroups || {}; }
  function str(x, n) { return x == null ? "" : String(x).replace(/\s+/g, " ").trim().slice(0, n || 280); }
  function strip(s) { return String(s == null ? "" : s).replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1"); }

  /* ------------------------------------------------------------ niveles
     El portugués dice "ok" | "ok_note" | "close" | "wrong"; el italiano
     "correcto" | "aceptable" | "poco_natural" | "desliz" | "incorrecto".
     Para la interfaz: "ok", "note" (vale, con una nota), "slip" (casi) o
     "wrong".  Sin level, lo dice el verdict. */
  var NOTE_LV = { ok_note: 1, aceptable: 1, poco_natural: 1 };
  var OK_LV = { ok: 1, correcto: 1 };
  var SLIP_LV = { close: 1, desliz: 1 };
  var WRONG_LV = { wrong: 1, incorrecto: 1 };
  function level(d) {
    if (!d) return "wrong";
    var L = d.level;
    if (L && NOTE_LV[L]) return "note";
    if (L && OK_LV[L]) return d.note && d.verdict === "giusto" ? "note" : "ok";
    if (L && SLIP_LV[L]) return "slip";
    if (L && WRONG_LV[L]) return "wrong";
    return d.verdict === "giusto" ? (d.note ? "note" : "ok") : d.verdict === "quasi" ? "slip" : "wrong";
  }
  // The level of P1 (the one the error log keeps).
  function nivel(d) {
    if (d && d.level === "poco_natural") return "poco_natural";
    var l = level(d);
    return l === "ok" || l === "note" ? "aceptable" : l === "slip" ? "desliz" : "incorrecto";
  }
  /* What «✓ Vale» says: the note of the diagnosis and, when it was correct
     but not natural, the natural version («más natural: …»). */
  function noteOf(d) {
    if (!d) return "";
    var n = str(d.note, 400), nat = str(d.natural, 200);
    if (d.level === "poco_natural" && nat) return "Más natural: *" + nat + "*." + (n ? " " + n : "");
    return n;
  }

  /* ------------------------------------------------- categorías y capas */

  // What LanguageTool and the AI call it, when the Clínica has no remedy for it.
  var OUT = { grammatica: 1, ia: 1, lt: 1, estilo: 1, stile: 1, puntuacion: 1, puntuazione: 1,
              mayusculas: 1, maiuscole: 1, registro_ia: 1 };
  var ALIAS = { lessico: "lessico", lexico: "lexico" };
  function unrecorded(cat) { var G = groups(); return !!(G.unrecorded && G.unrecorded[cat]); }
  // The category of the Clínica for this one, or null (kept out of the score).
  function clinicCat(cat) {
    if (!cat || OUT[cat] || unrecorded(cat)) return null;
    if (ALIAS[cat]) cat = ALIAS[cat];
    var D = Dg(), L = D && D.LABEL;
    if (L && !L[cat]) return null;
    return cat;
  }
  function label(cat) {
    var D = Dg(), S = root.Scrivi;
    return (D && D.LABEL && D.LABEL[cat]) || (S && S.AI_TYPES && S.AI_TYPES[cat]) || cat || "";
  }
  // The explanation in layers of a category: {regla, es, ej} (porque_data.js).
  function capa(cat) {
    var D = Dg();
    if (D && typeof D.capa === "function") { try { var c = D.capa(cat); if (c) return c; } catch (e) { /* */ } }
    var P = root.PORQUE_DATA;
    return (P && P.capas && P.capas[cat]) || null;
  }
  var ES_MENTION = /español|castellano|«[^»]+»|como en |a diferencia/i;

  /* How much to explain (P6), by how many times the learner has met this
     category (state.errs[cat].n, already counting this one): the first time,
     the rule and the contrast with Spanish; from the fifth, only the hint and
     a link to the rule; in between, the explanation of the moment. */
  function depth(state, cat) {
    var e = state && state.errs && state.errs[cat], n = e ? +e.n || 0 : 0;
    return n <= 1 ? "first" : n >= 5 ? "brief" : "normal";
  }
  // The lines to add to an explanation the first time: the rule and the contrast, if missing.
  function firstLayer(cat, explain) {
    var c = capa(cat), x = String(explain || ""), add = [];
    if (!c) return add;
    if (c.regla && x.indexOf(strip(c.regla).slice(0, 40)) < 0 && x.indexOf(c.regla.slice(0, 40)) < 0) add.push(c.regla);
    if (c.es && !ES_MENTION.test(x) && x.indexOf(c.es.slice(0, 40)) < 0) add.push(c.es);
    return add;
  }

  /* ------------------------------------------------------------ el objeto */

  function make(o) {
    o = o || {};
    var fuente = o.fuente || "reglas";
    return {
      cat: o.cat || null,
      nivel: o.nivel || "incorrecto",
      registro: o.registro || null,
      mal: str(o.mal, 120),
      bien: o.bien == null ? null : str(o.bien, 120),
      pista: str(o.pista, 280),
      regla: str(o.regla, 400),
      contraste: str(o.contraste, 280),
      fuente: fuente,
      seguro: o.seguro != null ? !!o.seguro : fuente === "reglas",
      label: str(o.label || label(o.cat), 60)
    };
  }

  // From the diagnosis of a closed answer (Diagnosi.diagnose / explainChoice).
  function fromDiag(d, given, o) {
    o = o || {};
    if (!d || !d.cat) return null;
    var c = capa(d.cat), x = String(d.explain || "");
    return make({ cat: d.cat, nivel: o.nivel || nivel(d), registro: o.registro, mal: given, bien: o.bien != null ? o.bien : d.target,
                  pista: d.hint, regla: x || d.hint, contraste: c && c.es && !ES_MENTION.test(x) ? c.es : "",
                  fuente: o.fuente || "reglas", seguro: o.seguro, label: d.label || label(d.cat) });
  }

  // The first *form* after the colon of a message («La forma es: *andrò*»): the correction, when the finding does not say it.
  function guessGood(msg, bad) {
    var segs = [], re = /\*([^*]+)\*/g, m, b = String(bad || "").toLowerCase();
    while ((m = re.exec(msg))) if (m[1].toLowerCase() !== b && !/^-|…|\+/.test(m[1])) segs.push({ x: m[1], at: m.index });
    if (!segs.length) return null;
    var colon = String(msg).indexOf(":"), after = segs.filter(function (q) { return q.at > colon; })[0];
    return (after || segs[segs.length - 1]).x;
  }
  /* From a finding of Scrivi (local rules, LanguageTool or the AI): the
     fields bad / good / why when the checker gives them; if not, what was
     written is taken from the text and the correction from the message. */
  function fromFinding(f, text, o) {
    o = o || {};
    if (!f || !f.cat) return null;
    var bad = f.bad;
    if (bad == null && text != null && root.Scrivi && root.Scrivi.toks && f.i >= 0) {
      var tk = root.Scrivi.toks(text), a = tk[f.i], z = tk[Math.min(tk.length - 1, f.i + (f.n || 1) - 1)];
      bad = a && z && a.at != null && z.at != null ? String(text).replace(/[’‘`´]/g, "'").slice(a.at, z.at + (z.len || 0)) : (a && a.o) || "";
    }
    var good = f.good !== undefined ? f.good : guessGood(f.msg || "", bad);
    var fuente = f.ai ? "ia" : f.lt ? "lt" : o.fuente || "reglas";
    var lv = f.level === "poco_natural" || f.soft ? "poco_natural" : SLIP_LV[f.level] ? "desliz" : NOTE_LV[f.level] ? "aceptable" : "incorrecto";
    var why = f.why || f.msg || "";
    var c = capa(f.cat);
    return make({ cat: f.cat, nivel: lv, registro: o.registro, mal: bad, bien: good, pista: "", regla: why,
                  contraste: c && c.es && !ES_MENTION.test(why) ? c.es : "", fuente: fuente,
                  seguro: fuente === "reglas", label: label(f.cat) });
  }
  // A row [what was written, the correction, the note, the type] (Parla, the rubric of the tramo).
  function fromRow(mal, bien, nota, tipo, o) {
    o = o || {};
    var cat = String(tipo || "").trim().toLowerCase() || "ia";
    var S = root.Scrivi;
    if (S && S.AI_TYPES && !S.AI_TYPES[cat] && !(Dg() && Dg().LABEL && Dg().LABEL[cat])) cat = "ia";
    return make({ cat: cat, nivel: cat === "estilo" || cat === "stile" ? "poco_natural" : "incorrecto", registro: o.registro,
                  mal: mal, bien: bien, regla: nota, fuente: o.fuente || "ia", seguro: false, label: label(cat) });
  }

  /* Anota el error: cuenta en state.errs si la Clínica lo conoce, y queda en
     el registro (los últimos 60) con lo escrito, la corrección y el porqué.
     Lo aceptable no se anota; lo que no se registra (el tipeo) tampoco.
     Devuelve la fila del registro (para deshacerla: unrecord).  Si lo
     escrito y la corrección son una oración entera, la oración vuelve en
     dos o tres días para corregirla (mio, abajo); o.noMio: no. */
  function record(state, err, o) {
    if (!state || !err || !err.cat) return null;
    if (err.nivel === "aceptable" || err.nivel === "poco_natural") return null;
    if (unrecorded(err.cat)) return null;
    var cc = clinicCat(err.cat);
    if (!state.errs) state.errs = {};
    if (!state.errLog) state.errLog = [];
    if (cc) {
      var e = state.errs[cc] || (state.errs[cc] = { n: 0, fixed: 0, last: 0 });
      e.n++;
      e.last = Date.now();
    }
    var row = { cat: cc || err.cat, g: str(err.mal, 80), e: err.bien == null ? "" : str(err.bien, 80), at: Date.now(),
                l: str(err.label, 60), x: str(err.regla || err.pista, 280), k: cc ? 1 : 0 };
    if (err.bien === "") row.d = 1;               // lo escrito sobra
    if (err.pista && err.pista !== err.regla) row.p = str(err.pista, 200);
    if (err.contraste) row.c = str(err.contraste, 200);
    if (err.nivel && err.nivel !== "incorrecto") row.v = err.nivel;
    if (err.registro) row.r = err.registro;
    if (err.fuente && err.fuente !== "reglas") row.f = err.fuente;
    if (!err.seguro) row.s = 0;
    state.errLog.unshift(row);
    state.errLog = state.errLog.slice(0, 60);
    // (make cuts at 120: a longer sentence would come back cut)
    if (!(o && o.noMio) && err.bien && err.mal.length < 120 && err.bien.length < 120 &&
        mioAdd(state, { frase: err.mal, bien: err.bien, cat: row.cat, l: row.l, x: row.x })) row.m = MIO + hash(normText(err.mal));
    return row;
  }
  // Undo a record (the learner says the answer was valid: P5).
  function unrecord(state, row) {
    if (!state || !row) return;
    var i = (state.errLog || []).indexOf(row);
    if (i >= 0) state.errLog.splice(i, 1);
    if (row.k && state.errs && state.errs[row.cat]) state.errs[row.cat].n = Math.max(0, state.errs[row.cat].n - 1);
    // it was valid: the sentence does not come back to be «corrected»
    if (row.m && state.own && state.own[row.m]) {
      delete state.own[row.m];
      if (state.cards && state.cards[row.m] && !state.cards[row.m].reps) delete state.cards[row.m];
    }
  }
  // Several findings of a text at once (Scrivi, dictogloss, tramo, Escritura plus).
  function recordFindings(state, findings, text, o) {
    var out = [], fixes = [], S = root.Scrivi, tk = null;
    (findings || []).forEach(function (f) {
      if (!f || f.soft || f.minor) return;
      var err = fromFinding(f, text, o);
      if (!err) return;
      var r = record(state, err, { noMio: true });
      if (r) out.push(r);
      // every mistake of the sentence is fixed in it, the ones the profile
      // leaves out (a typo) too; what is fine (aceptable) is not a fix
      if (err.nivel === "aceptable" || err.nivel === "poco_natural") return;
      var at = null;
      if (text != null && S && S.toks && f.i >= 0) {
        try { tk = tk || S.toks(text); } catch (e) { tk = []; }
        if (tk[f.i] && tk[f.i].at != null) at = tk[f.i].at;
      }
      fixes.push({ err: err, row: r, at: at });
    });
    if (!(o && o.noMio)) mioFromText(state, text, fixes);
    return out;
  }

  /* ------------------------------------- «Corregí tu propia frase» (mio)
     Tu oración con el error, tal cual la escribiste, vuelve al repaso en
     dos o tres días: «hay 1 error», la categoría como pista en el segundo
     intento, y se corrige escribiendo (contra la corrección guardada).  Es
     una ficha de Engine.enqueue («own:mio:…», en state.own), así el repaso
     la arma y la programa como las demás; drills.js le pone un tope por día
     y la Clínica no la adelanta (Reglas.ownRecent).  Sale de una oración
     entera escrita y corregida (las respuestas escritas, Parla, la rúbrica
     del tramo) o de las oraciones de un texto con sus correcciones
     aplicadas (Scrivi, el dictogloss, la tarea del tramo, Escritura plus),
     solo cuando se sabe la corrección de todo lo que se marcó en ella. */
  var MIO = "own:mio:", MIO_MAX = 40, MIO_MIN_WORDS = 3, MIO_MAX_WORDS = 30, MIO_MAX_SPANS = 3;
  function words(s) { return normText(s).replace(/[.,;:!?¡¿«»"()]/g, " ").split(/\s+/).filter(Boolean); }
  /* How many places differ between two sentences (runs of words that are
     not in their longest common subsequence, on either side). */
  function align(a, b) {
    var x = words(a), y = words(b), n = x.length, m = y.length, i, j;
    var L = [];
    for (i = 0; i <= n; i++) { L.push([]); for (j = 0; j <= m; j++) L[i].push(0); }
    for (i = n - 1; i >= 0; i--) for (j = m - 1; j >= 0; j--) L[i][j] = x[i] === y[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
    var spans = 0, open = false;
    i = 0; j = 0;
    while (i < n || j < m) {
      if (i < n && j < m && x[i] === y[j]) { open = false; i++; j++; continue; }
      if (!open) { spans++; open = true; }
      if (j >= m || (i < n && L[i + 1][j] >= L[i][j + 1])) i++; else j++;
    }
    return { spans: spans, common: L[0][0], n: n, m: m };
  }
  function diffSpans(a, b) { return align(a, b).spans; }
  function sameWords(a, b) { return words(a).sort().join(" ") === words(b).sort().join(" "); }
  function mioDue(now) {
    var d = new Date(now + 2 * 864e5);
    d.setHours(4, 0, 0, 0);
    if (d.getTime() < now + 2 * 864e5) d.setDate(d.getDate() + 1);     // two to three days
    return d.getTime();
  }
  function mioIds(state) {
    return Object.keys((state && state.own) || {}).filter(function (k) { return k.indexOf(MIO) === 0; });
  }
  function mioPrompt(n) { return "Corregí tu frase: hay " + n + (n === 1 ? " error" : " errores"); }
  /* o: { frase (lo escrito), bien (la corrección), cat, l (el nombre),
     x (el porqué), n (cuántos errores: si no, los cuenta), now }.
     → la ficha o null (no es una oración, no hay corrección, cambia demasiado). */
  function mioAdd(state, o) {
    var Eg = root.Engine;
    if (!state || !o || !Eg || !Eg.enqueue) return null;
    var frase = str(o.frase, 240), bien = str(o.bien, 240);
    if (!frase || !bien || String(o.frase).length > 240 || String(o.bien).length > 240) return null;
    // blanks («___», «a | b»): pieces of an exercise, not a sentence of yours
    if (/_{3,}|\|/.test(frase + " " + bien)) return null;
    var nw = words(frase).length;
    if (nw < MIO_MIN_WORDS || nw > MIO_MAX_WORDS || words(bien).length < MIO_MIN_WORDS) return null;
    if (normText(frase) === normText(bien)) return null;
    // your sentence with an error, not another sentence: at most three
    // places change and at least half of the words stay
    var al = align(frase, bien), n = o.n || (sameWords(frase, bien) ? 1 : al.spans);   // only the order: one error
    if (!al.spans || al.spans > MIO_MAX_SPANS || al.common * 2 < Math.min(al.n, al.m)) return null;
    var now = o.now || Date.now(), id = MIO + hash(normText(frase));
    // a cap: the oldest of the learner's sentences make room
    var ids = mioIds(state).filter(function (k) { return k !== id; });
    if (ids.length >= MIO_MAX) {
      ids.sort(function (a, b) { return state.own[a].at - state.own[b].at; }).slice(0, ids.length - MIO_MAX + 1)
        .forEach(function (k) { delete state.own[k]; if (state.cards) delete state.cards[k]; });
    }
    var lbl = str(o.l || label(o.cat), 60);
    return Eg.enqueue(state, id, {
      src: "mio", type: "typed", mio: 1, prompt: mioPrompt(n), stem: frase, answer: bien, accept: [bien],
      cat: o.cat || "", l: lbl, n: n, note: str(o.x, 280), from: "Tu frase",
      // the easier second pass: which of the two is right
      retryAs: { id: id, src: "mio", type: "choice", nomio: 1, prompt: "Tu frase y la corregida: ¿cuál está bien?",
                 options: Math.random() < 0.5 ? [frase, bien] : [bien, frase], answer: bien, accept: [bien], note: str(o.x, 280) }
    }, { src: "mio", due: mioDue(now), now: now });
  }
  /* Put good in place of the piece of s at..at+len.  A correction that
     takes in a neighbour word («gosto» → «gosto de café») does not repeat
     it: the words it shares with what follows (or precedes) are dropped. */
  function splice(s, at, len, good) {
    var pre = s.slice(0, at), post = s.slice(at + len), g = String(good);
    var gw = g.split(/\s+/).filter(Boolean), k, i;
    var key = function (w) { return normText(w).replace(/[.,;:!?¡¿«»"()]/g, ""); };
    var lead = (/^\s*/.exec(post) || [""])[0], pWords = post.slice(lead.length).split(/\s+/).filter(Boolean);
    for (k = Math.min(gw.length - 1, pWords.length); k > 0; k--) {
      var same = true;
      for (i = 0; i < k; i++) if (key(gw[gw.length - k + i]) !== key(pWords[i]) || !key(pWords[i])) same = false;
      if (same) {
        // the punctuation glued to the last shared word stays
        var tail = (/[.,;:!?»")]+$/.exec(pWords[k - 1]) || [""])[0];
        post = tail + (pWords.length > k ? " " + pWords.slice(k).join(" ") : "");
        break;
      }
    }
    var bw = pre.replace(/\s+$/, "").split(/\s+/).filter(Boolean);
    for (k = Math.min(gw.length - 1, bw.length); k > 0; k--) {
      var same2 = true;
      for (i = 0; i < k; i++) if (key(gw[i]) !== key(bw[bw.length - k + i]) || !key(gw[i])) same2 = false;
      if (same2) { pre = bw.slice(0, bw.length - k).join(" ") + (bw.length > k ? " " : ""); break; }
    }
    return (pre + g + post).replace(/\s{2,}/g, " ").replace(/\s+([.,;:!?])/g, "$1").trim();
  }
  /* The fixes of a text, sentence by sentence (only when every fix in it
     is known).  Each fix goes where the checker saw it (f.at, the offset in
     the text); without it, where its words are, as whole words, if that
     place is the only one.  A fix that cannot be placed makes no card: its
     sentence is not known, so none of the text is sure. */
  var WL = "A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u024f";
  function placeOf(src, bad, at) {
    if (at != null && src.slice(at, at + bad.length) === bad) return at;
    var esc = bad.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    var re = new RegExp("(^|[^" + WL + "'])(" + esc + ")(?![" + WL + "])", "g"), m, found = [];
    while ((m = re.exec(src))) { found.push(m.index + m[1].length); re.lastIndex = m.index + m[0].length; }
    return found.length === 1 ? found[0] : -1;
  }
  function mioFromText(state, text, fixes) {
    if (!text || !fixes || !fixes.length) return 0;
    var src = String(text).replace(/[’‘`´]/g, "'"), by = {}, made = 0, lost = false;
    var ss = sentences(src);
    fixes.forEach(function (f) {
      var bad = String(f.err.mal || ""), at = bad ? placeOf(src, bad, f.at) : -1;
      for (var i = 0; at >= 0 && i < ss.length; i++) {
        if (at >= ss[i].at && at + bad.length <= ss[i].at + ss[i].s.length) {
          (by[i] = by[i] || []).push({ f: f, rel: at - ss[i].at });
          return;
        }
      }
      lost = true;
    });
    if (lost) return 0;
    Object.keys(by).forEach(function (k) {
      var s = ss[+k].s, fixed = s, okAll = true, cat = null, l = "", x = "", shift = 0, end = -1;
      by[k].sort(function (p, q) { return p.rel - q.rel; }).forEach(function (p) {
        var bad = String(p.f.err.mal), good = p.f.err.bien, pos = p.rel + shift;
        // two fixes on the same words, or the place moved: not sure
        if (!okAll || good == null || p.rel < end || fixed.slice(pos, pos + bad.length) !== bad) { okAll = false; return; }
        var before = fixed.length;
        fixed = splice(fixed, pos, bad.length, good);
        shift += fixed.length - before;
        end = p.rel + bad.length;
        if (!cat && p.f.row) { cat = p.f.row.cat; l = p.f.row.l; x = p.f.row.x; }
      });
      if (!okAll || !cat) return;
      if (mioAdd(state, { frase: s, bien: fixed, cat: cat, l: l, x: x, n: by[k].length })) made++;
    });
    return made;
  }
  function isMio(id) { return String(id || "").indexOf(MIO) === 0; }

  /* ------------------------------------------------------------- el caché
     Lo que la IA ya explicó o corrigió, por hash de (idioma, tipo, ítem,
     respuesta normalizada) o de (idioma, semana, oración): la misma pregunta
     no se vuelve a pagar.  En localStorage, con tope; se exporta junto con
     «Correcciones para revisar». */
  var CACHE_MAX = 240;
  function hash(s) {
    var h = 5381, h2 = 52711;
    s = String(s);
    for (var i = 0; i < s.length; i++) { var c = s.charCodeAt(i); h = ((h << 5) + h + c) | 0; h2 = ((h2 << 5) + h2 ^ c) | 0; }
    return (h >>> 0).toString(36) + (h2 >>> 0).toString(36);
  }
  function normText(s) {
    return String(s == null ? "" : s).normalize("NFC").replace(/[’‘`´]/g, "'").toLowerCase().replace(/\s+/g, " ")
      .replace(/^[\s.,;:!?¡¿«»"]+|[\s.,;:!?¡¿«»"]+$/g, "");
  }
  function storeKey() { return (LG().storage || "c1") + ".ia.cache"; }
  var MEM = null;
  function cacheLoad() {
    if (MEM) return MEM;
    try { MEM = JSON.parse(root.localStorage.getItem(storeKey()) || "{}") || {}; } catch (e) { MEM = {}; }
    if (typeof MEM !== "object" || Array.isArray(MEM)) MEM = {};
    return MEM;
  }
  function cacheSave() {
    var m = cacheLoad(), ks = Object.keys(m);
    if (ks.length > CACHE_MAX) {
      ks.sort(function (a, b) { return (m[a].at || 0) - (m[b].at || 0); });
      ks.slice(0, ks.length - CACHE_MAX).forEach(function (k) { delete m[k]; });
    }
    try { root.localStorage.setItem(storeKey(), JSON.stringify(m)); } catch (e) { /* lleno o bloqueado: vale en memoria */ }
  }
  function cacheId(kind, parts) {
    return kind + ":" + hash([LG().code || ""].concat((parts || []).map(normText)).join("\u0001"));
  }
  function cacheGet(kind, parts) {
    var m = cacheLoad(), x = m[cacheId(kind, parts)];
    return x ? x.v : null;
  }
  // desc: what it was about, readable in the export («item · given»).
  function cacheSet(kind, parts, value, desc) {
    var m = cacheLoad();
    m[cacheId(kind, parts)] = { v: value, at: Date.now(), t: kind, q: str(desc, 200) };
    cacheSave();
  }
  function cacheAll() {
    var m = cacheLoad();
    return Object.keys(m).map(function (k) { return { id: k, kind: m[k].t, at: m[k].at, q: m[k].q, v: m[k].v }; })
      .sort(function (a, b) { return b.at - a.at; });
  }
  function cacheClear() { MEM = {}; cacheSave(); }
  function cacheReset() { MEM = null; }   // tests: read localStorage again

  // The sentences of a text, each with where it starts.
  function sentences(text) {
    var out = [], re = /[^.!?\n]+[.!?]*/g, m, src = String(text || "");
    while ((m = re.exec(src))) { var s = m[0].trim(); if (/[A-Za-zÀ-ÿ]/.test(s)) out.push({ s: s, at: m.index + m[0].indexOf(s) }); }
    return out;
  }

  /* -------------------------------------------- el curso, para la IA
     Lo que el pedido tiene que saber del alumno: la semana y el nivel, la
     gramática vista hasta ahí, las estructuras y categorías de la semana,
     sus tres categorías flojas y lo que ya marcó la app (seguro). */
  function levelOfWeek(w) { return w <= 8 ? "A1" : w <= 18 ? "A2" : w <= 30 ? "B1" : w <= 42 ? "B2" : "C1"; }
  function courseCtx(course, state, week, extra) {
    week = Math.max(1, Math.min(52, +week || 1));
    var weeks = (course && course.weeks) || [], w = weeks[week - 1] || {};
    var C = root.Conj, TL = (C && C.TENSE_LABELS) || {};
    var titles = weeks.slice(0, week).filter(function (x) { return x && !x.boss && x.title; }).map(function (x) { return x.title; });
    var tenses = (w.known || w.tenses || []).map(function (t) { return strip(TL[t] || t).replace(/\s*\(.*?\)/g, ""); });
    var B = root.Banca, weak = B && B.weakest ? B.weakest(state || {}, 3).map(function (x) { return x.cat; }) : [];
    var S = root.Scrivi, task = S && S.TASKS ? S.TASKS[week] : null;
    var P = root.PORQUE_DATA, D = Dg(), wc = [];
    if (P && P.weeks && D && D.LABEL) Object.keys(P.weeks).forEach(function (k) { if (P.weeks[k] === week && D.LABEL[k]) wc.push(k); });
    var o = { week: week, of: weeks.length || 52, level: w.level || levelOfWeek(week), grammar: titles.slice(-14), tenses: tenses,
              weak: weak, weekCats: wc, structs: task && task.use ? task.use.map(function (u) { return u[2]; }) : [] };
    Object.keys(extra || {}).forEach(function (k) { o[k] = extra[k]; });
    return o;
  }
  function promptCtx(c) {
    if (!c) return "";
    if (typeof c === "string") return c;
    var lines = [];
    if (c.week) lines.push("El alumno está en la semana " + c.week + " de " + (c.of || 52) + " (nivel " + (c.level || levelOfWeek(c.week)) + ").");
    if (c.grammar && c.grammar.length) lines.push("Gramática vista hasta ahora (las últimas lecciones): " + c.grammar.join("; ") + ".");
    if (c.tenses && c.tenses.length) lines.push("Tiempos verbales que ya conoce: " + c.tenses.join(", ") + ". No uses nombres de tiempos que todavía no vio: describilos con palabras simples.");
    if (c.structs && c.structs.length) lines.push("Lo que practica esta semana: " + c.structs.join("; ") + ".");
    if (c.weekCats && c.weekCats.length) lines.push("Categorías de error de esta semana: " + c.weekCats.map(label).join(", ") + ".");
    if (c.weak && c.weak.length) lines.push("Sus categorías más flojas (se equivoca seguido): " + c.weak.map(label).join(", ") + ".");
    if (c.cat) lines.push("Categoría del error según la app: " + label(c.cat) + ".");
    if (c.appSaid) lines.push("Lo que le mostró la app (es la corrección de reglas revisadas): " + strip(c.appSaid).slice(0, 500));
    if (c.local && c.local.length) {
      lines.push("Marcas SEGURAS del corrector propio de la app (reglas revisadas, sin falsas alarmas medidas): tomalas como ciertas y no las repitas:");
      c.local.slice(0, 12).forEach(function (m) { lines.push("- " + m); });
    }
    lines.push("Cuando sirva, contrastá con el español rioplatense (qué se dice distinto y por qué).");
    return lines.join("\n");
  }
  // A local finding as evidence: «mal» → «bien»: por qué.
  function evidenceLine(f) {
    var bad = f.bad != null ? f.bad : "", good = f.good;
    var why = strip(f.why || f.msg || "").slice(0, 160);
    return (bad ? "«" + bad + "»" + (good != null ? " → «" + (good === "" ? "(se borra)" : good) + "»" : "") + ": " : "") + why;
  }
  // Focused correction (Bitchener y Knoch; Sheen): in A1-A2, first the week's and the weak categories.
  function focusCats(c) {
    if (!c || !c.week || c.week > 18) return null;
    var out = (c.weekCats || []).concat(c.weak || []);
    return out.filter(function (x, i) { return out.indexOf(x) === i; });
  }

  var api = {
    level: level, nivel: nivel, noteOf: noteOf,
    clinicCat: clinicCat, label: label, capa: capa, depth: depth, firstLayer: firstLayer,
    make: make, fromDiag: fromDiag, fromFinding: fromFinding, fromRow: fromRow, guessGood: guessGood,
    record: record, unrecord: unrecord, recordFindings: recordFindings,
    mioAdd: mioAdd, mioFromText: mioFromText, mioIds: mioIds, isMio: isMio, mioDue: mioDue,
    diffSpans: diffSpans, splice: splice, MIO: MIO, MIO_MAX: MIO_MAX,
    hash: hash, normText: normText, cacheGet: cacheGet, cacheSet: cacheSet, cacheAll: cacheAll, cacheClear: cacheClear,
    cacheReset: cacheReset, CACHE_MAX: CACHE_MAX, sentences: sentences,
    courseCtx: courseCtx, promptCtx: promptCtx, evidenceLine: evidenceLine, focusCats: focusCats, levelOfWeek: levelOfWeek
  };
  if (typeof module === "object" && module.exports) module.exports = api;
  root.Errores = api;
})(typeof window !== "undefined" ? window : globalThis);
