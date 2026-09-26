/* Prueba de humo en el navegador de la app entera, con sus dos idiomas
   (opcional, no corre en npm test).  Para cada idioma (italiano, portugués):
   el selector inicial, Oggi/Hoje, una pausa, Suoni/Sons, una lectura con
   karaoke, el camino y la semana 1, una lección, el dictogloss, Io/Eu, el
   examen C1, «Parola o no? / Palavra ou não?», el cambio de idioma desde el
   perfil y la vuelta; después, que quien ya estudiaba italiano entra directo
   sin selector, y que el service worker guarda el núcleo y el paquete
   elegido.  Falla si hay errores de JavaScript en la consola o si la app
   pide un archivo que no existe (las rutas viejas docs/data/…, audio/cv/…).

   Requiere Playwright:  NODE_PATH=$(npm root -g) node tools/pt/smoke_browser.js
   Variables opcionales:
     SHOTS=ruta  guarda capturas a 390 px de ancho, en claro y en oscuro
     LANGS=it,pt los idiomas a probar (por defecto los dos)
     PORT=8765   puerto del servidor local */
const { chromium } = require("playwright");
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

function chromiumPath() {
  const base = "/opt/pw-browsers";
  try {
    const dir = fs.readdirSync(base).filter(d => /^chromium-\d+$/.test(d)).sort().pop();
    const exe = dir && path.join(base, dir, "chrome-linux", "chrome");
    return exe && fs.existsSync(exe) ? exe : undefined;
  } catch (e) { return undefined; }
}

// What each language calls things (the first tab, the profile), to check that
// the right package is on screen.
const NAMES = { it: { today: "Oggi", me: "Io", other: "pt" }, pt: { today: "Hoje", me: "Eu", other: "it" } };

(async () => {
  const port = +(process.env.PORT || 8765);
  const docs = path.join(__dirname, "..", "..", "docs");
  const shots = process.env.SHOTS || "";
  const langs = (process.env.LANGS || "it,pt").split(",");
  if (shots) fs.mkdirSync(shots, { recursive: true });
  const srv = spawn("python3", ["-m", "http.server", String(port)], { cwd: docs, stdio: "ignore" });
  await new Promise(r => setTimeout(r, 1200));
  const browser = await chromium.launch({ executablePath: chromiumPath() }).catch(() => chromium.launch());
  const errors = global.errors = [];
  const seen = global.seen = [];
  const note = (s) => { seen.push(s); };
  const base = "http://localhost:" + port + "/";

  async function newPage(scheme, init) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: scheme });
    if (init) await ctx.addInitScript(init);
    const page = await ctx.newPage();
    page.on("pageerror", e => errors.push("pageerror: " + e.message));
    // a network failure towards an outside host (Commons, without internet) is
    // not a bug: the app falls back to the phone's voice
    page.on("console", m => { if (m.type() === "error" && !/Failed to load resource: net::ERR_/.test(m.text())) errors.push("console: " + m.text()); });
    page.on("response", r => { if (r.url().startsWith(base) && r.status() >= 400) errors.push("HTTP " + r.status() + " " + r.url().slice(base.length)); });
    return page;
  }
  const snap = async (page, name, full) => {
    if (!shots) return;
    await page.waitForTimeout(450);
    await page.screenshot({ path: path.join(shots, name + ".png"), fullPage: !!full });
  };
  const tabs = async (page) => (await page.$$eval("#nav button", els => els.map(e => e.textContent.trim()))).join(" ");

  for (const code of langs) {
    const N = NAMES[code], P = (n) => code + "-" + n;
    const page = await newPage("light"); global.lastPage = page;
    // the first visit: the language picker
    await page.goto(base + "?test", { waitUntil: "networkidle" });
    await page.waitForSelector(".pick-lang[data-lang='" + code + "']", { timeout: 10000 });
    await snap(page, "selector-claro");
    await page.click(".pick-lang[data-lang='" + code + "']");
    await page.waitForSelector("#pausa", { timeout: 20000 });
    const h = await page.getAttribute("html", "data-lang");
    if (h !== code) errors.push(code + ": html data-lang = " + h);
    if (!(await tabs(page)).includes(N.today)) errors.push(code + ": las pestañas no son del idioma: " + (await tabs(page)));
    note(code + " · " + N.today + ": " + (await page.textContent("h1")).trim() + " · pestañas: " + (await tabs(page)));
    await snap(page, P("hoy-claro"), true);

    // a pausa: answer the items whatever they are
    await page.click("#pausa");
    await page.waitForSelector(".card", { timeout: 5000 });
    for (let i = 0; i < 6; i++) {
      const it = await page.evaluate(() => window.__test && window.__test.item());
      if (!it) break;
      if (i === 1) await snap(page, P("ronda-claro"));
      if (await page.$("#next")) { await page.click("#next"); await page.waitForTimeout(350); continue; }
      if (it.options && await page.$("[data-opt]")) {
        try { await page.click("[data-opt] >> nth=0", { timeout: 2000 }); } catch (e) { /* re-rendered */ }
      } else if (await page.$("#ans")) { await page.fill("#ans", it.answer); await page.click("#send"); }
      else if (await page.$("#wans")) { await page.fill("#wans", it.answer); await page.click("#wsend"); }
      else if (await page.$("#tcheck")) { const n = (await page.$$("[data-tile]")).length; for (let k = 0; k < n; k++) { try { await page.click("#tbank [data-tile] >> nth=0", { timeout: 1500 }); } catch (e) { break; } } await page.click("#tcheck"); }
      else if (await page.$("#reveal")) { await page.click("#reveal"); await page.click("[data-fq='2']"); }
      else break;
      await page.waitForTimeout(400);
      if (i === 0) await snap(page, P("feedback-claro"));
      if (await page.$("#next")) { await page.click("#next"); await page.waitForTimeout(400); }
    }
    note(code + " · pausa jugada");
    if (await page.$("#quit")) { await page.click("#quit"); await page.waitForTimeout(300); }

    // The correction: a wrong option and a wrong typed answer (the bank's
    // translations, week 15).  A wrong option is never «Casi»; the sheet
    // says the right form before the why, is read aloud (aria-live) and
    // leaves the focus on «Siguiente»; a sentence in Spanish is not «Casi»;
    // «Tus errores» keeps the why of each error.
    await page.evaluate(() => { const s = window.__test.state(); s.unlocked = Math.max(s.unlocked || 1, 15); window.__test.fast = true; window.__test.start("b-tr", null, 15); });
    await page.waitForTimeout(400);
    let sawChoice = false, sawTyped = false;
    for (let i = 0; i < 12 && !(sawChoice && sawTyped); i++) {
      const it = await page.evaluate(() => { const x = window.__test.item(); return x && JSON.parse(JSON.stringify(x)); });
      if (!it) break;
      if (!sawChoice && await page.$("[data-opt]")) {
        const opts = await page.$$eval("[data-opt]", els => els.map(e => e.textContent));
        const k = opts.findIndex(o => o.trim().toLowerCase() !== String(it.answer).trim().toLowerCase());
        await page.click("[data-opt] >> nth=" + k);
        await page.waitForSelector("#fb .feedback");
        const fb = await page.evaluate(() => {
          const box = document.querySelector("#fb .feedback"), all = Array.from(box.querySelectorAll(".sol, .diag, .diff"));
          return { cls: box.className, live: document.querySelector("#fb").getAttribute("aria-live"),
                   focus: document.activeElement && document.activeElement.id,
                   solFirst: all.length > 0 && all[0].classList.contains("sol") };
        });
        if (/quasi/.test(fb.cls)) errors.push(code + ": una opción equivocada salió «Casi» (" + opts[k] + ")");
        if (fb.live !== "polite") errors.push(code + ": la devolución sin aria-live");
        if (fb.focus !== "next") errors.push(code + ": el foco después de responder está en «" + fb.focus + "», no en «Siguiente»");
        if (!fb.solFirst) errors.push(code + ": la devolución no empieza por la forma correcta");
        await snap(page, P("correccion-opcion"));
        note(code + " · corrección de una opción: " + fb.cls);
        sawChoice = true;
      } else if (!sawTyped && await page.$("#ans") && it.type === "translate") {
        await page.fill("#ans", it.stem); await page.click("#send");
        await page.waitForSelector("#fb .feedback");
        const v = await page.textContent("#fb .verdict");
        if (/Casi/.test(v)) errors.push(code + ": una respuesta en español salió «" + v.trim() + "»");
        await snap(page, P("correccion-prompt"));
        note(code + " · respuesta en español: " + v.trim());
        if (await page.$("#giveup")) await page.click("#giveup");
        sawTyped = true;
      } else if (await page.$("[data-opt]")) await page.click("[data-opt] >> nth=0");
      else if (await page.$("#ans")) { await page.fill("#ans", it.answer.replace(/\s*\|\s*/g, " ")); await page.click("#send"); }
      else if (await page.$("#wans")) { await page.fill("#wans", it.answer); await page.click("#wsend"); }
      await page.waitForTimeout(300);
      if (await page.$("#next")) { await page.click("#next"); await page.waitForTimeout(300); }
    }
    if (!sawChoice) note(code + " · (sin opción equivocada que probar en la ronda)");
    if (await page.$("#quit")) { await page.click("#quit"); await page.waitForTimeout(300); }

    // The right answers: brief by default, more when it helps.  A trap
    // dodged is named; another accepted form shows as the answer and brings
    // the main one; a quick right answer on a known item folds the rule in
    // one line and has no «Palabra por palabra»; never «También: …»; and
    // «Siguiente» stays in sight at 390 px.
    const RIGHT = { it: [["trampa", "g2-gd-01", null, false], ["variante", "d14-007", "quindi", false], ["conocida", "d11-013", null, true]],
                    pt: [["trampa", "s1-01-41", null, false], ["variante", "s1-02-28", "há", false], ["conocida", "s1-01-03", null, true]] }[code];
    for (const [kind, id, typed, seen] of RIGHT) {
      await page.evaluate(([id, seen]) => {
        const s = window.__test.state();
        if (seen) s.cards[id] = { ok: 3, s: 20, d: 4, due: Date.now() + 1e9, last: Date.now() - 20 * 86400000, reps: 3 }; else delete s.cards[id];
        window.__test.play([id]);
      }, [id, seen]);
      await page.waitForTimeout(300);
      const it = await page.evaluate(() => { const x = window.__test.item(); return x && JSON.parse(JSON.stringify(x)); });
      if (!it || it.id !== id) { errors.push(code + ": correcta «" + kind + "»: no está el ítem " + id); continue; }
      if (it.options) {
        const opts = await page.$$eval("[data-opt]", els => els.map(e => e.textContent.trim()));
        await page.click("[data-opt] >> nth=" + opts.indexOf(String(it.answer).trim()));
      } else { await page.fill("#ans", typed || it.answer); await page.click("#send"); }
      await page.waitForSelector("#fb .feedback.giusto", { timeout: 4000 }).catch(() => {});
      await page.waitForTimeout(600);   // the sheet slides in
      const fb = await page.evaluate(() => {
        const box = document.querySelector("#fb .feedback"), nx = document.querySelector("#next");
        const r = nx ? nx.getBoundingClientRect() : null;
        return { cls: box ? box.className : "", text: box ? box.innerText : "", sol: box && box.querySelector(".sol") ? box.querySelector(".sol").textContent.trim() : "",
                 trap: !!(box && box.querySelector(".diag.trap")), also: !!(box && box.querySelector(".note.also")),
                 whyOk: !!(box && box.querySelector("details.why-ok")), desglose: !!(box && box.querySelector(".desglose")),
                 nextIn: !!r && r.top >= 0 && r.bottom <= innerHeight };
      });
      if (!/giusto/.test(fb.cls)) errors.push(code + ": correcta «" + kind + "» no salió bien: " + fb.cls);
      if (/También:/.test(fb.text)) errors.push(code + ": correcta «" + kind + "» con «También: …»");
      if (!fb.nextIn) errors.push(code + ": correcta «" + kind + "»: «Siguiente» fuera de la pantalla");
      if (kind === "trampa" && !fb.trap) errors.push(code + ": el garden path acertado no dice «Esquivaste la trampa»");
      if (kind === "variante" && (!fb.also || fb.sol !== typed)) errors.push(code + ": otra forma aceptada: sin «También se dice» o la respuesta no es la suya (" + fb.sol + ")");
      if (kind === "conocida" && (!fb.whyOk || fb.desglose)) errors.push(code + ": una conocida rápida: el porqué no está plegado o hay desglose");
      await snap(page, P("correcta-" + kind));
      note(code + " · correcta «" + kind + "»: " + fb.text.replace(/\s+/g, " ").slice(0, 120));
      if (await page.$("#quit")) { await page.click("#quit"); await page.waitForTimeout(300); }
    }
    await page.click("[data-tab='io']");
    await page.waitForSelector("#retention");
    const elog = await page.$$eval("ul.errlog li", els => els.map(e => e.textContent.replace(/\s+/g, " ").trim()));
    if (!elog.length) errors.push(code + ": «Tus errores» sin la lista de los últimos");
    note(code + " · últimos errores: " + elog.slice(0, 2).join(" / "));

    // Allena / Treino → Suoni / Sons
    await page.click("[data-tab='frasi']");
    await page.waitForSelector(".labs");
    await snap(page, P("entrenar-claro"), true);
    if (await page.$("[data-lab='suoni']")) {
      await page.click("[data-lab='suoni']");
      await page.waitForSelector(".bigplay, .options", { timeout: 5000 });
      const it2 = await page.evaluate(() => window.__test.item());
      note(code + " · sonidos: " + it2.type + " / " + it2.say);
      if (await page.$("[data-opt]")) { await page.click("[data-opt] >> nth=0"); await page.waitForTimeout(400); }
      await snap(page, P("sonidos-claro"));
      note(code + " · sonidos respondido: " + (await page.$("#fb .feedback") ? "con devolución" : "sin devolución"));
      await page.click("#quit");
    } else errors.push(code + ": no hay Suoni/Sons en entrenar");

    // Leggi / Ler → the first open reading, with karaoke
    await page.click("[data-tab='leggi']");
    await page.waitForSelector(".eps");
    await snap(page, P("leer-claro"));
    const ep = await page.$("[data-ep]:not([disabled])");
    if (ep) {
      await ep.click();
      await page.waitForSelector("#karplay");
      await snap(page, P("lectura-claro"));
      await page.click("#karplay");
      await page.waitForTimeout(300);
      note(code + " · lectura: " + (await page.textContent("#karplay")).trim());
    } else errors.push(code + ": ninguna lectura abierta");

    // the path → week 1, its lesson
    await page.click("[data-tab='percorso']");
    await page.waitForSelector(".path");
    await snap(page, P("camino-claro"));
    await page.click("[data-week='1']");
    await page.waitForSelector(".missions");
    await snap(page, P("semana1-claro"), true);
    note(code + " · misiones de la semana 1: " + (await page.$$eval(".mission b", els => els.map(e => e.textContent))).join(" | "));
    if (await page.$("[data-m='lez']")) {
      // a toast or the gloss box can cover the button for a moment: click it directly
      await page.$eval("[data-m='lez']", b => b.click());
      await page.waitForSelector(".lescard");
      await page.click("#lesnext"); await page.waitForTimeout(300);
      await snap(page, P("leccion-claro"));
      note(code + " · lección abierta");
      await page.click("#lesquit");
    } else errors.push(code + ": la semana 1 no tiene lección");
    // the dictogloss of week 2
    await page.evaluate(() => { const s = window.__test.state(); s.unlocked = 2; });
    await page.click("[data-tab='percorso']"); await page.click("[data-week='2']");
    if (await page.$("[data-m='dictogloss']")) { await page.click("[data-m='dictogloss']"); await page.waitForSelector("#dgplay"); note(code + " · dictogloss ok"); }

    // Io / Eu, with the button to the other language
    await page.click("[data-tab='io']");
    await page.waitForSelector("#retention");
    const h1 = (await page.textContent("h1")).trim();
    if (h1 !== N.me) errors.push(code + ": el perfil se llama «" + h1 + "»");
    if (!(await page.$("#switchlang"))) errors.push(code + ": falta el botón para cambiar de idioma");
    note(code + " · " + h1 + ": " + (await page.$$eval("h2", els => els.map(e => e.textContent.trim()))).join(" | "));
    await snap(page, P("perfil-claro"));

    // the C1 exam of week 52
    await page.evaluate(() => { const s = window.__test.state(); s.unlocked = 52; });
    await page.click("[data-tab='percorso']");
    await page.waitForTimeout(500);
    await page.click("[data-week='52']");
    await page.waitForSelector("[data-m='play']", { state: "attached" });
    for (let k = 0; k < 4 && !(await page.$("[data-prova='ascolto']")); k++) { await page.click("[data-m='play']"); await page.waitForTimeout(600); }
    if (await page.$("[data-prova='lettura']")) {
      await snap(page, P("examen-claro"));
      await page.click("[data-prova='lettura']");
      await page.waitForSelector("#econsegna3");
      note(code + " · examen: lectura ok");
      await page.click("#eback2");
      await page.click("[data-prova='strutture']");
      await page.waitForTimeout(500);
      const it3 = await page.evaluate(() => window.__test.item());
      note(code + " · examen: estructuras " + (it3 && it3.id));
      if (await page.$("#quit")) { await page.click("#quit"); await page.waitForTimeout(300); }
    } else errors.push(code + ": el examen C1 no abrió");

    // «Parola o no? / Palavra ou não?»
    await page.evaluate(() => { const s = window.__test.state(); for (let i = 0; i < 40; i++) s.cards["v:w" + i] = { ok: 3, s: 5, d: 5, due: Date.now() + 1e9, last: Date.now() }; });
    await page.click("[data-tab='oggi']");
    if (await page.$("#lampoparole")) { await page.click("#lampoparole"); await page.waitForSelector("[data-lopt]"); note(code + " · ¿palabra o no?: " + (await page.textContent(".stem")).trim()); await page.click("#lquit"); }

    // the service worker keeps the core and this package
    const sw = await page.evaluate(async (c) => {
      if (!navigator.serviceWorker) return "sin service worker";
      await navigator.serviceWorker.ready;
      for (let k = 0; k < 40; k++) {
        const keys = await caches.keys();
        const v = keys.filter(x => /^c1-v/.test(x))[0];
        if (v) {
          const cache = await caches.open(v);
          const core = await cache.match("js/app.js"), pk = await cache.match("lang/" + c + "/data/course.json");
          if (core && pk) return "ok: " + keys.join(", ");
        }
        await new Promise(r => setTimeout(r, 500));
      }
      return "incompleto: " + (await caches.keys()).join(", ");
    }, code);
    note(code + " · service worker: " + sw);
    if (!/^ok/.test(sw)) errors.push(code + ": service worker " + sw);

    // switch to the other language from the profile, and back (the switch
    // reloads without ?test: the progress is read from the save itself)
    const key = { it: "laviac1.save.v1", pt: "rumoc1.save.v1" }[code];
    const saved = () => page.evaluate((k) => { const s = JSON.parse(localStorage.getItem(k) || "{}"); return [s.xp, s.unlocked]; }, key);
    await page.click("[data-tab='io']");
    const before = await saved();
    await page.waitForSelector("#switchlang");
    await page.click("#switchlang");
    await page.waitForSelector("#pausa", { timeout: 20000 });
    const other = NAMES[N.other];
    if (!(await tabs(page)).includes(other.today)) errors.push(code + " → " + N.other + ": el cambio de idioma no cambió las pestañas: " + (await tabs(page)));
    note(code + " → " + N.other + ": " + (await tabs(page)));
    await snap(page, P("cambiado-claro"));
    await page.click("[data-tab='io']");
    await page.waitForSelector("#switchlang");
    await page.click("#switchlang");
    await page.waitForSelector("#pausa", { timeout: 20000 });
    const back = await saved();
    if (!(await tabs(page)).includes(N.today) || JSON.stringify(back) !== JSON.stringify(before)) errors.push(code + ": al volver no está el progreso: " + before + " → " + back);
    note(code + " · vuelta con el progreso intacto (xp, semana: " + back + ")");
    await page.context().close();

    // the dark theme
    if (shots) {
      const dark = await newPage("dark", "localStorage.setItem('c1.lang', '" + code + "')");
      await dark.goto(base + "?test", { waitUntil: "networkidle" });
      await dark.waitForSelector("#pausa", { timeout: 20000 });
      await snap(dark, P("hoy-oscuro"), true);
      await dark.click("[data-tab='percorso']"); await dark.waitForSelector(".path");
      await snap(dark, P("camino-oscuro"));
      await dark.click("[data-week='1']"); await dark.waitForSelector(".missions");
      await snap(dark, P("semana1-oscuro"));
      await dark.click("[data-tab='oggi']"); await dark.waitForSelector("#pausa");
      await dark.click("#pausa"); await dark.waitForSelector(".card");
      await snap(dark, P("ronda-oscuro"));
      await dark.context().close();
    }
  }

  // Who already studied Italian (La Via C1 before the two languages) goes
  // straight in, without the picker, and keeps the progress.
  const legacy = await newPage("light", "if (!localStorage.getItem('laviac1.save.v1')) localStorage.setItem('laviac1.save.v1', JSON.stringify({ xp: 1234, unlocked: 3, cards: {} }))");
  await legacy.goto(base + "?test", { waitUntil: "networkidle" });
  await legacy.waitForSelector("#pausa", { timeout: 20000 });
  const lx = await legacy.evaluate(() => [document.documentElement.getAttribute("data-lang"), window.__test.state().xp, localStorage.getItem("c1.lang")]);
  if (lx[0] !== "it" || lx[1] !== 1234) errors.push("quien ya estudiaba italiano: " + JSON.stringify(lx));
  note("quien ya estudiaba italiano entra directo: " + JSON.stringify(lx));
  if (shots) {
    const dp = await newPage("dark");
    await dp.goto(base + "?test", { waitUntil: "networkidle" });
    await dp.waitForSelector(".pick-lang");
    await snap(dp, "selector-oscuro");
  }

  console.log(seen.join("\n"));
  console.log(errors.length ? "ERRORS:\n" + errors.join("\n") : "sin errores de JavaScript");
  await browser.close();
  srv.kill();
  process.exit(errors.length ? 1 : 0);
})().catch(async e => {
  // Where it got stuck: the text on screen and, with SHOTS, a capture.
  try {
    if (global.lastPage) {
      console.log("pantalla:", (await global.lastPage.textContent("#app")).replace(/\s+/g, " ").slice(0, 300));
      if (process.env.SHOTS) await global.lastPage.screenshot({ path: require("path").join(process.env.SHOTS, "fallo.png") });
    }
  } catch (x) { /* la página ya no está */ }
  console.log("SMOKE FAIL", e.message.split("\n")[0]); console.log((global.seen || []).join("\n")); console.log((global.errors || []).join("\n")); process.exit(2); });
