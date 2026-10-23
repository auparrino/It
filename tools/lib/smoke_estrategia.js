/* «💡 Estrategia de la semana» (docs/js/estrategia.js) en el navegador, a
   390×844, en cada idioma:
   - tocar una misión del percorso abre la hoja con la estrategia; 👍 queda
     guardado; «Empezar» cierra la hoja y abre la misión;
   - la misma misión, otra vez esa semana: directo, sin hoja; sin voto, una
     vez más con «¿Te sirvió?»;
   - apagadas en Ajustes: no aparecen; el cierre semanal muestra los votos.
     NODE_PATH=$(npm root -g) node tools/lib/smoke_estrategia.js
     LANGS=it,pt,de   los idiomas (por defecto, todos los de boot.js)
     SHOTS=dir        capturas */
"use strict";
let chromium;
try { chromium = require("playwright").chromium; } catch (e) { chromium = require("/opt/node-tools/node_modules/playwright").chromium; }
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

  for (const code of langs) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    const page = await ctx.newPage();
    page.on("pageerror", e => errors.push(code + ": pageerror: " + e.message));
    await page.goto(base + "?test&lang=" + code, { waitUntil: "networkidle" });
    await page.waitForFunction(() => window.__test && window.__test.state && window.Estrategia, null, { timeout: 20000 });
    const W = 10;
    const click = (sel) => page.evaluate((q) => { const b = document.querySelector(q); if (!b) return false; b.click(); return true; }, sel);
    // a learner in week 10, past the first screens
    await page.evaluate((w) => {
      window.__test.fast = true;   // no double-tap guard between the taps of the test
      const s = window.__test.state();
      s.unlocked = w; s.onboard = { step: 3, at: Date.now() }; s.xp = 500; s.totals.attempts = 300;
      const b = document.querySelector("[data-tab='percorso']"); if (b) b.click();
    }, W);
    await page.waitForTimeout(300);
    if (!(await click('.dot[data-week="' + W + '"]')) && !(await click('[data-week="' + W + '"]'))) { errors.push(code + ": no encontré la semana " + W); continue; }
    await page.waitForTimeout(300);
    // the vocabulary mission (every language has it)
    const sel = '.mission[data-m="vocab"]';
    if (!(await page.$(sel))) { errors.push(code + ": la semana " + W + " no tiene la misión de palabras (" + await page.evaluate(() => window.__test.screen() + " " + Array.from(document.querySelectorAll("[data-m]")).map(b => b.dataset.m).join(",")) + ")"); continue; }
    await page.click(sel);
    await page.waitForTimeout(300);
    const sheet = await page.$("#stratsheet");
    if (!sheet) { errors.push(code + ": tocar la misión no abrió la estrategia"); continue; }
    const txt = await page.$eval("#stratsheet .strat-t", e => e.textContent);
    note(code + ": " + txt);
    const want = await page.evaluate((w) => Estrategia.pick(w, "vocab").t.replace(/\*/g, ""), W);
    if (txt !== want) errors.push(code + ": la hoja no muestra la estrategia de la semana: «" + txt + "»");
    const box = await page.$eval("#stratsheet .strat-sheet", e => { const r = e.getBoundingClientRect(); return { l: r.left, r: r.right, b: r.bottom }; });
    if (box.l < 0 || box.r > 390 || box.b > 845) errors.push(code + ": la hoja se sale de la pantalla " + JSON.stringify(box));
    if (await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)) errors.push(code + ": scroll horizontal con la hoja");
    if (shots) await page.screenshot({ path: path.join(shots, code + "-estrategia.png") });
    await page.click('#stratsheet [data-sv="1"]');
    await page.waitForTimeout(100);
    const v = await page.evaluate((w) => { const s = window.__test.state(); return (s.strat.votes || {})[Estrategia.pick(w, "vocab").id]; }, W);
    if (!v || v.v !== 1) errors.push(code + ": el 👍 no quedó guardado");
    await page.click("#stratgo");
    await page.waitForTimeout(400);
    if (await page.$("#stratsheet")) errors.push(code + ": «Empezar» no cerró la hoja");
    const scr = await page.evaluate(() => window.__test.screen());
    if (scr !== "gioco") errors.push(code + ": «Empezar» no abrió la misión (" + scr + ")");
    // back to the week: the same mission goes straight on
    await page.evaluate((w) => { const b = document.querySelector("[data-tab='percorso']"); if (b) b.click(); }, W);
    await page.waitForTimeout(300);
    await click('.dot[data-week="' + W + '"]') || await click('[data-week="' + W + '"]');
    await page.waitForTimeout(300);
    await page.click(sel);
    await page.waitForTimeout(300);
    if (await page.$("#stratsheet")) errors.push(code + ": la estrategia volvió a aparecer la misma semana");
    const toWeek = async () => {
      await page.evaluate(() => { const b = document.querySelector("[data-tab='percorso']"); if (b) b.click(); });
      await page.waitForTimeout(300);
      await click('.dot[data-week="' + W + '"]');
      await page.waitForTimeout(300);
    };
    // «Superá la semana»: without a vote the first time, it asks «¿Te sirvió?» once more
    const ps = '.mission[data-m="play"]';
    await toWeek();
    if (await page.$(ps)) {
      await page.click(ps); await page.waitForTimeout(300);
      if (!(await page.$("#stratsheet"))) errors.push(code + ": «Superá la semana» sin estrategia");
      else { await page.click("#stratgo"); await page.waitForTimeout(300); }
      await toWeek();
      await page.click(ps); await page.waitForTimeout(300);
      const again = await page.$eval("#stratsheet .strat-vote", e => e.textContent).catch(() => "");
      if (!/¿Te sirvió\?/.test(again)) errors.push(code + ": sin voto, no volvió a preguntar «¿Te sirvió?» (" + again + ")");
      if (shots) await page.screenshot({ path: path.join(shots, code + "-estrategia-2.png") });
      await page.click('#stratsheet [data-sv="-1"]'); await page.waitForTimeout(100);
      await page.click("#stratgo"); await page.waitForTimeout(300);
      await toWeek();
      await page.click(ps); await page.waitForTimeout(300);
      if (await page.$("#stratsheet")) errors.push(code + ": con voto, volvió a aparecer");
    } else errors.push(code + ": la semana no tiene «Superá la semana»");
    // turned off in the settings: Dominala, not seen yet, goes straight on
    await page.evaluate(() => { window.Estrategia.setOff(window.__test.state(), true); });
    await page.evaluate(() => { const b = document.querySelector("[data-tab='percorso']"); if (b) b.click(); });
    await page.waitForTimeout(300);
    await click('.dot[data-week="' + W + '"]') || await click('[data-week="' + W + '"]');
    await page.waitForTimeout(300);
    if (await page.$('.mission[data-m="play2"]:not(.done)')) {
      await page.click('.mission[data-m="play2"]');
      await page.waitForTimeout(300);
      if (await page.$("#stratsheet")) errors.push(code + ": apagadas, igual apareció");
    }
    // the weekly close: the line with the votes of last week
    const line = await page.evaluate(() => {
      const s = window.__test.state(), wk = Engine.weekKey(new Date(Date.now() - 7 * 864e5));
      Object.keys(s.strat.votes).forEach(k => { s.strat.votes[k].at = Date.now() - 7 * 864e5; });
      return Estrategia.reflectLine(s, wk);
    });
    if (!/👍 1/.test(line) || !/👎 1/.test(line)) errors.push(code + ": el cierre no tiene los votos: " + line);
    await ctx.close();
  }
  await browser.close();
  srv.kill();
  if (errors.length) { console.log("FALLAS:\n" + errors.join("\n")); process.exit(1); }
  console.log("ok: la estrategia de la semana en " + langs.join(", "));
})().catch(e => { console.error(e); process.exit(1); });
