/* La grilla de Scrivi (docs/js/grilla.js) en el navegador, en italiano y portugués:
   - en la semana 20, la pantalla de Scrivi muestra la grilla de 4 filas (en
     portugués, con enunciador, interlocutor, propósito y género) y las 4
     casillas de la autoevaluación; en la 10, no;
   - el botón muestra el texto de nota alta y el de nota baja, y lo oculta;
   - una casilla marcada queda en state.grilla y vuelve marcada;
   - al revisar, la devolución puntúa las 4 filas;
   - sin errores en la página ni scroll horizontal a 390 px.
     NODE_PATH=/opt/node-tools/node_modules node tools/lib/smoke_grilla.js
     LANGS=it,pt  SHOTS=dir (capturas a 390×844) */
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
  const port = +(process.env.PORT || 8771), shots = process.env.SHOTS || "";
  const langs = (process.env.LANGS || "it,pt").split(",");
  if (shots) fs.mkdirSync(shots, { recursive: true });
  const srv = spawn("python3", ["-m", "http.server", String(port)], { cwd: path.join(__dirname, "..", "..", "docs"), stdio: "ignore" });
  await new Promise(r => setTimeout(r, 1200));
  const browser = await chromium.launch().catch(() => chromium.launch({ executablePath: chromiumPath() }));
  const errors = [], base = "http://localhost:" + port + "/";
  const note = (s) => console.log("· " + s);

  for (const code of langs) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    const page = await ctx.newPage();
    page.on("pageerror", e => errors.push(code + ": pageerror: " + e.message));
    await page.goto(base + "?test&lang=" + code, { waitUntil: "networkidle" });
    await page.waitForFunction(() => window.__test && window.__test.state && window.Grilla, null, { timeout: 20000 });
    await page.evaluate(() => { window.__test.fast = true; });

    await page.evaluate(() => window.__test.mission("scrivi", null, 10));
    await page.waitForSelector("#stext", { timeout: 5000 });
    if (await page.$("#grilla")) errors.push(code + ": la grilla aparece en la semana 10");

    await page.evaluate(() => window.__test.mission("scrivi", null, 20));
    await page.waitForSelector("#grilla", { timeout: 5000 });
    const rows = await page.$$eval("#grilla ol.gr-rows > li", ls => ls.length);
    if (rows !== 4) errors.push(code + ": la grilla tiene " + rows + " filas");
    const ctxRows = await page.$$eval("#grilla ul.gr-ctx li", ls => ls.length);
    if (code === "pt" && ctxRows !== 4) errors.push(code + ": faltan enunciador/interlocutor/propósito/género (" + ctxRows + ")");
    const boxes = await page.$$eval("[data-grself]", bs => bs.length);
    if (boxes !== 4) errors.push(code + ": la autoevaluación tiene " + boxes + " casillas");
    note(code + ": grilla de " + rows + " filas, " + ctxRows + " de adecuación, " + boxes + " casillas");

    await page.click("#grsamp");
    const samples = await page.$$eval("#grsampout .gr-sample", ss => ss.map(s => s.querySelectorAll(".gr-notes li").length));
    if (samples.length !== 2 || samples.some(n => n < 2 || n > 3)) errors.push(code + ": los textos de muestra no están bien: " + JSON.stringify(samples));
    if (shots) await page.screenshot({ path: path.join(shots, code + "-grilla.png"), fullPage: true });
    await page.click("#grsamp");
    if (await page.$("#grsampout .gr-sample")) errors.push(code + ": el botón no oculta los textos");

    await page.check('[data-grself="0"]');
    await page.check('[data-grself="2"]');
    const saved = await page.evaluate(() => (window.__test.state().grilla || {})[20]);
    if (!saved || !saved.s[0] || saved.s[1] || !saved.s[2]) errors.push(code + ": la autoevaluación no se guardó: " + JSON.stringify(saved));

    const sample = await page.evaluate(() => window.GRILLA_DATA.samples[0].lo.t);
    await page.fill("#stext", sample);
    await page.evaluate(() => { try { localStorage.removeItem("c1.claude.key"); } catch (e) { /* */ } });
    await page.click("#scheck");
    await page.waitForSelector("#sgrid .grres", { timeout: 5000 });
    const res = await page.$$eval("#sgrid ul.gr-res li", ls => ls.map(l => l.textContent));
    if (res.length !== 4) errors.push(code + ": la devolución tiene " + res.length + " filas");
    if (!res.some(t => /vos: ✓/.test(t))) errors.push(code + ": la devolución no muestra lo que marcaste");
    note(code + ": devolución — " + res.map(t => t.split("\n")[0].slice(0, 40)).join(" | "));
    const wide = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    if (wide) errors.push(code + ": scroll horizontal a 390 px");
    if (shots) await page.screenshot({ path: path.join(shots, code + "-grilla-devolucion.png"), fullPage: true });

    // reopened: the boxes come back ticked
    await page.evaluate(() => window.__test.mission("scrivi", null, 20));
    await page.waitForSelector("#grilla", { timeout: 5000 });
    const back = await page.$$eval("[data-grself]", bs => bs.map(b => b.checked));
    if (!back[0] || back[1] || !back[2]) errors.push(code + ": las casillas no volvieron marcadas: " + JSON.stringify(back));
    await ctx.close();
  }

  await browser.close();
  srv.kill();
  if (errors.length) { console.log("FALLAS:\n  " + errors.join("\n  ")); process.exit(1); }
  console.log("✓ la grilla anda en " + langs.join(", "));
})().catch(e => { console.error(e); process.exit(1); });
