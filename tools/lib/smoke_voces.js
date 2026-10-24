/* Las voces en el navegador (docs/js/voces.js), con un speechSynthesis y un
   Audio de mentira: (1) con la voz del teléfono, en la radio de italiano
   Sara habla con una voz de mujer y Dario con una de hombre; (2) con las
   voces grabadas (Piper, audio_data.js), la radio suena desde los archivos,
   cada hablante con los suyos y en orden; (3) en alemán, sin ninguna voz
   alemana en el teléfono, tocar 🔊 muestra cómo instalarla.
     NODE_PATH=$(npm root -g) node tools/lib/smoke_voces.js */
"use strict";
const { chromium } = require("playwright");
const { spawn } = require("child_process");
const path = require("path");

function fakeVoices(list) {
  return function (list) {
    window.__spoken = []; window.__played = [];
    // an <audio> that «plays» at once and ends a moment later
    window.Audio = function () {
      const a = { src: "", playbackRate: 1, defaultPlaybackRate: 1, onended: null, onerror: null, onplay: null,
        pause() { a.paused = true; },
        play() { a.paused = false; window.__played.push(a.src); if (a.onplay) a.onplay(); setTimeout(() => { if (!a.paused && a.onended) a.onended(); }, 5); return Promise.resolve(); } };
      return a;
    };
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

  // 1. La radio de italiano, semana 6: Sara (mujer) y Dario (hombre), con la voz del teléfono
  {
    const { ctx, page } = await start("it", [["Microsoft Diego Online (Natural) - Italian (Italy)", "it-IT"],
      ["Microsoft Elsa - Italian (Italy)", "it-IT"], ["Microsoft Isabella Online (Natural) - Italian (Italy)", "it-IT"], ["Google US English", "en-US"]]);
    await page.evaluate(() => { window.__test.state().phoneVoice = true; });
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

  // 2. La misma radio con las voces grabadas: los archivos de Sara (f1) y de Dario (m1), en orden
  {
    const { ctx, page } = await start("it", [["Google italiano", "it-IT"]]);
    const r = await page.evaluate(() => {
      window.__played = []; window.__spoken = [];
      const ep = RADIO_DATA.EPISODI.filter(e => e.week === 6)[0];
      Tramo.playScript(ep.turns, { sexes: ep.sexes });
      const want = ep.turns.map(t => "lang/it/" + AUDIO_DATA.dir + Voces.key(t[1], t[0] === "A" ? "f1" : "m1") + ".mp3");
      const have = AUDIO_DATA.have.split(" ").length;
      return { want, have };
    });
    await page.waitForTimeout(1500);
    const played = await page.evaluate(() => window.__played), spoken = await page.evaluate(() => window.__spoken);
    note("radio 6 grabada: " + played.length + " archivos de " + r.want.length + " turnos (" + r.have + " audios en el manifiesto), " + spoken.length + " con la voz del teléfono");
    if (played.join() !== r.want.join()) errors.push("la radio no tocó los archivos de cada hablante en orden: " + played.slice(0, 3).join(", "));
    if (spoken.length) errors.push("con todo grabado, igual usó la voz del teléfono: " + spoken.length);
    // a file that does not exist: the phone's voice, and the turns go on
    await page.evaluate(() => { window.__played = []; window.__spoken = []; window.__test.speak("Questa frase non è registrata.", true); });
    await page.waitForTimeout(200);
    const sp2 = await page.evaluate(() => window.__spoken);
    if (sp2.length !== 1) errors.push("un texto sin grabación no sonó con la voz del teléfono");
    await ctx.close();
  }

  // 3. Alemán sin voz alemana (y con la voz del teléfono): el aviso con las instrucciones
  {
    const { ctx, page } = await start("de", [["Google US English", "en-US"], ["Google español", "es-ES"]]);
    await page.evaluate(() => { window.__test.state().phoneVoice = true; });
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
