/* «Lo esencial de la semana» (docs/js/esencial.js) en Chromium, como celular
   (390×844), en cada idioma: con la lección de la semana 5 leída, la semana
   ofrece la tarjeta; se juega tapada (hueco → ficha), «Comprobar» da el
   puntaje, la hoja de repaso muestra las respuestas con «teoría →» (que abre
   Mi gramática) y queda guardada; la semana de una Estación ofrece sus tres
   semanas; nada se sale de la pantalla a lo ancho.
     NODE_PATH=$(npm root -g) node tools/lib/smoke_esencial.js
     LANGS=it,pt,de   SHOTS=dir (capturas) */
"use strict";
const { chromium } = require("playwright");
const { spawn } = require("child_process");
const fs = require("fs"), path = require("path");
const Boot = require("../../docs/js/boot.js");

function chromiumPath() {
  const base = "/opt/pw-browsers";
  try {
    const dir = fs.readdirSync(base).filter(d => /^chromium-\d+$/.test(d)).sort().pop();
    return dir && ["chrome-linux", "chrome-linux64"].map(d => path.join(base, dir, d, "chrome")).filter(f => fs.existsSync(f))[0];
  } catch (e) { return undefined; }
}

(async () => {
  const port = +(process.env.PORT || 8771), shots = process.env.SHOTS || "";
  const langs = (process.env.LANGS || Object.keys(Boot.LANGS).join(",")).split(",");
  if (shots) fs.mkdirSync(shots, { recursive: true });
  const srv = spawn("python3", ["-m", "http.server", String(port)], { cwd: path.join(__dirname, "..", "..", "docs"), stdio: "ignore" });
  await new Promise(r => setTimeout(r, 1200));
  const browser = await chromium.launch().catch(() => chromium.launch({ executablePath: chromiumPath() }));
  const errors = [], base = "http://localhost:" + port + "/";
  const note = (s) => console.log("· " + s);
  const snap = async (page, name) => { if (shots) await page.waitForTimeout(900); if (shots) await page.screenshot({ path: path.join(shots, name + ".png"), fullPage: true }); };
  const wide = (page) => page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);

  for (const code of langs) {
    const fail = (m) => errors.push(code + ": " + m);
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    // a learner past the first start, in week 7 with the lessons 1-6 read
    const key = Boot.LANGS[code].storage + ".save.v1";
    await ctx.addInitScript(([k, c]) => {
      if (sessionStorage.getItem("esseed")) return;
      const read = {}; for (let n = 1; n <= 6; n++) read[n] = Date.now();
      localStorage.setItem("c1.lang", c);
      localStorage.setItem(k, JSON.stringify({ xp: 500, unlocked: 7, cards: {}, read: read, onboard: { step: 3, at: Date.now() } }));
      sessionStorage.setItem("esseed", "1");
    }, [key, code]);
    const page = await ctx.newPage();
    page.on("pageerror", e => fail("pageerror: " + e.message));
    await page.goto(base + "?test&lang=" + code, { waitUntil: "networkidle" });
    await page.waitForFunction(() => window.__test && window.__test.state && window.Esencial, null, { timeout: 20000 });
    // taps in a row, without the guard against a double tap (the gap, then its chip)
    await page.evaluate(() => { window.__test.fast = true; });
    await page.click("[data-tab='percorso']").catch(() => {});
    await page.waitForTimeout(300);
    await page.click("[data-week='5']");
    await page.waitForSelector("[data-esencial='5']", { timeout: 5000 }).catch(() => fail("la semana 5 no ofrece «Lo esencial»"));
    if (!(await page.$("[data-esencial='5']"))) { await ctx.close(); continue; }
    await page.$eval("[data-esencial='5']", b => b.click());
    await page.waitForSelector("[data-esg]", { timeout: 5000 }).catch(() => fail("no se abre el juego"));
    const n = await page.$$eval("[data-esg]", els => els.length);
    if (n < 8 || n > 10) fail("la tarjeta tiene " + n + " huecos");
    await snap(page, code + "-esencial-juego");
    if (await wide(page)) fail("el juego se sale a lo ancho");
    // fill each gap with its answer: gap k, then the chip with that text
    const ans = await page.evaluate(async (c) => {
      const co = await (await fetch("lang/" + c + "/data/course.json")).json();
      window.__course = co;
      return window.Esencial.card(co.weeks[window.Esencial.current().week - 1]).lines.map(l => l.answer);
    }, code);
    if (!ans) { fail("no se pudieron leer las respuestas"); await ctx.close(); continue; }
    for (let k = 0; k < ans.length; k++) {
      await page.click("[data-esg='" + k + "']");
      const bi = await page.$$eval("[data-esb]", (els, a) => { const e = els.find(x => x.textContent === a && !x.disabled); return e ? e.getAttribute("data-esb") : null; }, ans[k]);
      if (bi == null) { fail("no está la ficha «" + ans[k] + "»"); break; }
      await page.click("[data-esb='" + bi + "']");
    }
    // one mistake: swap the first two
    await page.click("[data-esg='0']"); await page.click("[data-esg='1']");
    const b0 = await page.$$eval("[data-esb]", (els, a) => els.find(x => x.textContent === a).getAttribute("data-esb"), ans[1]);
    const b1 = await page.$$eval("[data-esb]", (els, a) => els.find(x => x.textContent === a).getAttribute("data-esb"), ans[0]);
    await page.click("[data-esg='0']"); await page.click("[data-esb='" + b0 + "']");
    await page.click("[data-esg='1']"); await page.click("[data-esb='" + b1 + "']");
    if (await page.$eval("#escheck", b => b.disabled)) { fail("«Comprobar» sigue apagado con todo lleno: " + JSON.stringify(await page.evaluate(() => window.Esencial.current().fill))); await ctx.close(); continue; }
    await page.click("#escheck");
    await page.waitForSelector(".scorebig", { timeout: 4000 }).catch(() => fail("«Comprobar» no da el puntaje"));
    const score = (await page.textContent(".scorebig b")).trim();
    if (score !== (n - 2) + "/" + n) fail("el puntaje es " + score + ", no " + (n - 2) + "/" + n);
    if ((await page.$$eval(".esgap.wrong", els => els.length)) !== 2) fail("no marca los dos huecos mal");
    await snap(page, code + "-esencial-resultado");
    const saved = await page.evaluate(() => window.__test.state().esencial && window.__test.state().esencial[5]);
    if (!saved || saved.ok !== n - 2) fail("no se guardó el resultado: " + JSON.stringify(saved));
    await page.click("#essheet");
    await page.waitForSelector(".esen.sheet", { timeout: 4000 }).catch(() => fail("no aparece la hoja de repaso"));
    const sheet = await page.evaluate(() => ({ ans: document.querySelectorAll(".esans").length, teo: document.querySelectorAll(".esen [data-ref-gram]").length }));
    if (sheet.ans !== n) fail("la hoja muestra " + sheet.ans + " respuestas");
    if (!sheet.teo) fail("la hoja no tiene enlaces a la teoría");
    if (await wide(page)) fail("la hoja se sale a lo ancho");
    await snap(page, code + "-esencial-hoja");
    note(code + " · esencial: " + n + " huecos, " + score + ", hoja con " + sheet.teo + " enlaces a la teoría");
    await page.click(".esen [data-ref-gram]");
    await page.waitForTimeout(600);
    if (!(await page.$("[data-refblock]"))) fail("«teoría →» no abre Mi gramática");
    // back to the week: now the sheet
    await page.click("[data-tab='percorso']").catch(() => {});
    await page.waitForTimeout(300);
    await page.click("[data-week='5']");
    await page.waitForTimeout(300);
    const label = await page.$eval("[data-esencial='5']", b => b.textContent).catch(() => "");
    if (!/hoja de repaso/.test(label)) fail("jugada, la semana no la ofrece como hoja de repaso: " + label);
    // the station's week: its three weeks
    const sw = await page.evaluate(() => { const c = window.__course; const e = window.Estacion.ends(c)[0]; return e + 1; });
    await page.evaluate((w) => { const s = window.__test.state(); s.unlocked = Math.max(s.unlocked, w); for (let k = 1; k < w; k++) s.read[k] = Date.now(); }, sw);
    await page.click("[data-tab='percorso']").catch(() => {});
    await page.waitForTimeout(300);
    await page.click("[data-week='" + sw + "']");
    await page.waitForTimeout(300);
    const st = await page.$$eval(".esstation [data-esencial]", els => els.length).catch(() => 0);
    if (st !== 3) fail("la semana " + sw + " (Estación) ofrece " + st + " tarjetas, no 3");
    else note(code + " · Estación de la semana " + sw + ": las tres tarjetas");
    await ctx.close();
  }
  await browser.close();
  srv.kill();
  if (errors.length) { console.log("\nFALLAS:\n" + errors.join("\n")); process.exit(1); }
  console.log("\nsmoke esencial: ok");
})().catch(e => { console.error(e); process.exit(1); });
