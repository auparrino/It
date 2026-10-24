/* Las voces en el navegador (docs/js/voces.js), con un speechSynthesis de
   mentira: (1) en la radio de italiano, Sara habla con una voz de mujer y
   Dario con una de hombre; (2) en alemán, sin ninguna voz alemana en el
   teléfono, tocar 🔊 muestra cómo instalarla.
     NODE_PATH=$(npm root -g) node tools/lib/smoke_voces.js */
"use strict";
const { chromium } = require("playwright");
const { spawn } = require("child_process");
const path = require("path");

function fakeVoices(list) {
  return function (list) {
    window.__spoken = [];
    window.SpeechSynthesisUtterance = function (t) { this.text = t; };
    const vs = list.map(v => ({ name: v[0], lang: v[1], localService: true, default: false, voiceURI: v[0] }));
    Object.defineProperty(window, "speechSynthesis", { configurable: true, value: {
      getVoices: () => vs, cancel() {}, pause() {}, resume() {}, speaking: false, onvoiceschanged: null,
      speak: u => {
        window.__spoken.push({ text: u.text, voice: u.voice && u.voice.name, pitch: u.pitch || 1 });
        // no voice for the language: the engine fails, as Android does
        setTimeout(() => { if (!u.voice && u.onerror) u.onerror({ error: "language-unavailable" }); else if (u.onend) u.onend({}); }, 5);
      } } });
  };
}

(async () => {
  const port = +(process.env.PORT || 8769), errors = [], note = s => console.log("· " + s);
  const srv = spawn("python3", ["-m", "http.server", String(port)], { cwd: path.join(__dirname, "..", "..", "docs"), stdio: "ignore" });
  await new Promise(r => setTimeout(r, 1200));
  const browser = await chromium.launch();
  const base = "http://localhost:" + port + "/?test";

  async function start(lang, voices) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    await ctx.addInitScript(fakeVoices(), voices);
    const page = await ctx.newPage();
    page.on("pageerror", e => errors.push(lang + " pageerror: " + e.message));
    await page.goto(base, { waitUntil: "networkidle" });
    await page.click(".pick-lang[data-lang='" + lang + "']");
    await page.waitForSelector("#obnext", { timeout: 20000 });
    await page.click("[data-obwhy] >> nth=0"); await page.click("[data-obmin='15']"); await page.click("#obnext");
    await page.waitForSelector("#obzero, #obtest", { timeout: 5000 });
    if (await page.$("#obzero")) await page.click("#obzero"); else { await page.click("#obtest"); await page.waitForSelector("#ubskip"); await page.click("#ubskip"); }
    await page.waitForSelector("#obgo"); await page.click("#obgo"); await page.waitForTimeout(600);
    return { ctx, page };
  }

  // 1. La radio de italiano, semana 6: Sara (mujer) y Dario (hombre)
  {
    const { ctx, page } = await start("it", [["Microsoft Diego Online (Natural) - Italian (Italy)", "it-IT"],
      ["Microsoft Elsa - Italian (Italy)", "it-IT"], ["Microsoft Isabella Online (Natural) - Italian (Italy)", "it-IT"], ["Google US English", "en-US"]]);
    const ep = await page.evaluate(() => (window.RADIO_DATA.EPISODI || []).filter(e => e.week === 6)[0]);
    if (!ep || (ep.sexes || []).join() !== "f,m") errors.push("la radio 6 no trae sexes f,m: " + JSON.stringify(ep && ep.sexes));
    await page.evaluate(() => { window.__spoken = []; Tramo.playScript(RADIO_DATA.EPISODI.filter(e => e.week === 6)[0].turns, { sexes: ["f", "m"] }); });
    await page.waitForTimeout(800);
    const sp = await page.evaluate(() => window.__spoken);
    const a = sp.filter((x, i) => ep.turns[i] && ep.turns[i][0] === "A"), b = sp.filter((x, i) => ep.turns[i] && ep.turns[i][0] === "B");
    note("radio 6: Sara → " + (a[0] || {}).voice + ", Dario → " + (b[0] || {}).voice + " (" + sp.length + " turnos)");
    if (sp.length < ep.turns.length) errors.push("no sonaron todos los turnos: " + sp.length + "/" + ep.turns.length);
    if (!a.length || a.some(x => !/Isabella|Elsa/.test(x.voice))) errors.push("Sara no habla con voz de mujer: " + JSON.stringify(a[0]));
    if (!b.length || b.some(x => !/Diego/.test(x.voice))) errors.push("Dario no habla con voz de hombre: " + JSON.stringify(b[0]));
    if (a[0] && !/Natural/.test(a[0].voice)) errors.push("Sara no tiene la mejor voz de mujer (Natural): " + a[0].voice);
    await ctx.close();
  }

  // 2. Alemán sin voz alemana: el aviso con las instrucciones
  {
    const { ctx, page } = await start("de", [["Google US English", "en-US"], ["Google español", "es-ES"]]);
    await page.evaluate(() => window.__test.mission("play", null, 1)); await page.waitForTimeout(600);
    let shown = false;
    for (let i = 0; i < 12 && !shown; i++) {
      const b = await page.$("#play1, #sayit, [data-say]");
      if (b) await b.click().catch(() => {});
      await page.waitForTimeout(300);
      shown = !!(await page.$("#novoice"));
      if (!shown) {
        const it = await page.evaluate(() => window.__test.item());
        if (!it) break;
        if (await page.$("[data-opt]")) await page.click("[data-opt] >> nth=0").catch(() => {});
        else if (await page.$("#ans")) { await page.fill("#ans", it.answer); await page.click("#send"); }
        if (await page.$("#next")) await page.click("#next");
      }
    }
    const txt = shown ? await page.textContent("#novoice") : "";
    note("alemán sin voz: " + (shown ? "aviso «" + txt.slice(0, 70) + "…»" : "sin aviso"));
    if (!shown) errors.push("en alemán sin voz alemana no apareció el aviso");
    else if (!/alemán/.test(txt) || !/Texto a voz/.test(txt)) errors.push("el aviso no dice alemán o no explica Texto a voz: " + txt);
    if (shown) { await page.click("#novoiceok"); if (await page.$("#novoice")) errors.push("«Entendido» no cierra el aviso"); }
    await ctx.close();
  }

  await browser.close(); srv.kill();
  if (errors.length) { console.log("ERRORES:\n" + errors.join("\n")); process.exit(1); }
  console.log("smoke voces: ok");
})();
