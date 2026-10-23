/* La mediación (docs/js/mediacion.js) en el navegador, en los idiomas con
   Radio, a 390×844:
   - después de entregar el episodio de la semana 6 aparece «Tu amiga no
     entendió», plegado; se abre, una respuesta sin datos no pasa, la
     versión modelo pasa, queda en state.mediacion y suma xp;
   - el resultado de la lectura ep4 (una de las que traen la tarea) también
     lo trae, y el de una lectura sin tarea no;
   - sin errores de la página y sin desborde horizontal.
     NODE_PATH=/opt/node-tools/node_modules node tools/lib/smoke_mediacion.js
     LANGS=it,pt   SHOTS=dir (capturas)   DARK=1 (modo oscuro) */
"use strict";
const { chromium } = require("playwright");
const { spawn } = require("child_process");
const fs = require("fs"), path = require("path");

function chromiumPath() {
  const base = "/opt/pw-browsers";
  try {
    const dir = fs.readdirSync(base).filter(d => /^chromium-\d+$/.test(d)).sort().pop();
    return dir && ["chrome-linux", "chrome-linux64"].map(d => path.join(base, dir, d, "chrome")).filter(f => fs.existsSync(f))[0];
  } catch (e) { return undefined; }
}

(async () => {
  const port = +(process.env.PORT || 8767), shots = process.env.SHOTS || "";
  const langs = (process.env.LANGS || "it,pt").split(",");
  if (shots) fs.mkdirSync(shots, { recursive: true });
  const srv = spawn("python3", ["-m", "http.server", String(port)], { cwd: path.join(__dirname, "..", "..", "docs"), stdio: "ignore" });
  await new Promise(r => setTimeout(r, 1200));
  const browser = await chromium.launch().catch(() => chromium.launch({ executablePath: chromiumPath() }));
  const errors = [], base = "http://localhost:" + port + "/";
  const note = (s) => console.log("· " + s);
  const snap = async (page, name) => { if (shots) await page.screenshot({ path: path.join(shots, name + ".png"), fullPage: true }); };
  const overflow = (page) => page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);

  for (const code of langs) {
    const fail = (m) => errors.push(code + ": " + m);
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true,
                                           colorScheme: process.env.DARK ? "dark" : "light" });
    const page = await ctx.newPage();
    page.on("pageerror", e => errors.push(code + ": pageerror: " + e.message));
    await page.goto(base + "?test&lang=" + code, { waitUntil: "networkidle" });
    await page.waitForFunction(() => window.__test && window.__test.state && window.Mediacion && window.Tramo, null, { timeout: 20000 });
    // fast: the guard against double taps does not swallow the test's clicks
    await page.evaluate(() => { const s = window.__test.state(); s.unlocked = Math.max(s.unlocked, 14); delete s.radio; delete s.mediacion; window.__test.fast = true; });

    // the Radio, week 6: deliver, and the block appears
    await page.evaluate(() => window.Tramo.open("rad", 6, "leggi"));
    await page.waitForSelector("#trdeliver", { timeout: 5000 });
    if (await page.$("#med")) fail("la mediación aparece antes de entregar");
    const ep = await page.evaluate(() => window.Radio.episode(6));
    await page.evaluate((e) => {
      e.questions.forEach((q, i) => {
        const r = Array.from(document.querySelectorAll('input[name="tq' + i + '"]')).find((x) => x.value === q[2]);
        if (r) r.checked = true;
      });
    }, ep);
    await page.click("#trdeliver");
    await page.waitForSelector("#med", { timeout: 4000 }).catch(() => fail("después de entregar no aparece la mediación"));
    if (!(await page.$("#med"))) { await ctx.close(); continue; }
    if (await page.$eval("#med", (d) => d.open)) fail("la mediación no empieza plegada");
    await page.click("#med summary");
    await page.waitForTimeout(200);
    if ((await page.getAttribute("#medtext", "lang")) !== "es") fail("la caja no es lang=es");
    if (await page.getAttribute("#medtext", "data-kb")) fail("la caja lleva el teclado de la app");
    await page.fill("#medtext", "No sé, no entendí nada de lo que dijeron.");
    await page.click("#medcheck");
    await page.waitForTimeout(200);
    const out1 = await page.textContent("#medout");
    if (!/Le faltan datos/.test(out1)) fail("sin datos no dice que faltan: " + out1.slice(0, 120));
    const xp0 = await page.evaluate(() => window.__test.state().xp);
    const model = await page.evaluate(() => window.Mediacion.task("radio:6").modelo);
    await page.fill("#medtext", model);
    if (!/palabras/.test(await page.textContent("#medcount"))) fail("el contador no cuenta");
    await page.click("#medcheck");
    await page.waitForTimeout(250);
    const out2 = await page.textContent("#medout");
    if (!/Se entiende/.test(out2)) fail("el modelo no pasa: " + out2.slice(0, 160));
    const rec = await page.evaluate(() => (window.__test.state().mediacion || {})["radio:6"]);
    if (!rec || !rec.ok) fail("no quedó en state.mediacion: " + JSON.stringify(rec));
    const xp1 = await page.evaluate(() => window.__test.state().xp);
    if (!(xp1 > xp0)) fail("no sumó xp (" + xp0 + " → " + xp1 + ")");
    if (await overflow(page)) fail("la pantalla de la radio desborda a lo ancho");
    note(code + " · radio 6: «" + (await page.textContent("#med summary")).trim().replace(/\s+/g, " ") + "»");
    await page.$eval("#medout", (e) => e.scrollIntoView());
    await snap(page, code + "-mediacion-radio");

    // a reading with the task, and one without
    await page.evaluate(() => window.__test.start("lettura", "ep4", 11));
    for (let k = 0; k < 40 && (await page.evaluate(() => window.__test.screen())) === "gioco"; k++) {
      await page.evaluate(() => window.__test.solve());
      await page.waitForTimeout(60);
    }
    if ((await page.evaluate(() => window.__test.screen())) !== "risultato") fail("la lectura no llegó al resultado");
    else {
      if (!(await page.$("#med"))) fail("el resultado de la lectura ep4 no trae la mediación");
      else {
        await page.click("#med summary");
        await page.fill("#medtext", await page.evaluate(() => window.Mediacion.task("lettura:ep4").modelo));
        await page.click("#medcheck");
        await page.waitForTimeout(200);
        if (!/Se entiende/.test(await page.textContent("#medout"))) fail("el modelo de la lectura no pasa");
        if (await overflow(page)) fail("el resultado de la lectura desborda a lo ancho");
        await snap(page, code + "-mediacion-lectura");
        note(code + " · lectura ep4: la mediación está y corrige");
      }
    }
    await page.evaluate(() => window.__test.start("lettura", "ep1", 1));
    for (let k = 0; k < 40 && (await page.evaluate(() => window.__test.screen())) === "gioco"; k++) {
      await page.evaluate(() => window.__test.solve());
      await page.waitForTimeout(60);
    }
    if ((await page.evaluate(() => window.__test.screen())) === "risultato" && await page.$("#med")) fail("una lectura sin tarea muestra la mediación");
    await ctx.close();
  }
  await browser.close();
  srv.kill();
  if (errors.length) { errors.forEach(e => console.log("FAIL " + e)); process.exit(1); }
  console.log("✓ smoke_mediacion: " + langs.join(", "));
})().catch(e => { console.error(e); process.exit(1); });
