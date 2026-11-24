/* El griego en el navegador (docs/lang/el/: la primera temporada, sin
   todos los módulos todavía).  Elige Ελληνικά en el selector, pasa el primer
   arranque, recorre Σήμερα, el Δρόμος, la semana 1 con su lección y su
   ronda, la pausa, el repaso y Εγώ, y cambia de idioma y vuelve: ningún
   error de la página, ningún archivo pedido que no exista.  Además, lo
   propio del griego: el teclado de la app con la distribución griega
   (también con mouse), el teclado físico que convierte las letras latinas
   y la tecla del acento, y la ayuda de lectura («cómo suena»).
     NODE_PATH=$(npm root -g) node tools/lib/smoke_griego.js
     SHOTS=dir   capturas a 390×844 */
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
  const port = +(process.env.PORT || 8768), shots = process.env.SHOTS || "";
  if (shots) fs.mkdirSync(shots, { recursive: true });
  const srv = spawn("python3", ["-m", "http.server", String(port)], { cwd: path.join(__dirname, "..", "..", "docs"), stdio: "ignore" });
  await new Promise(r => setTimeout(r, 1200));
  const browser = await chromium.launch().catch(() => chromium.launch({ executablePath: chromiumPath() }));
  const errors = [], base = "http://localhost:" + port + "/";
  const note = (s) => console.log("· " + s);
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  page.on("pageerror", e => errors.push("pageerror: " + e.message + " @ " + String(e.stack || "").split("\n").slice(1, 3).join(" ")));
  page.on("console", m => { if (m.type() === "error" && !/Failed to load resource: net::ERR_/.test(m.text())) errors.push("console: " + m.text()); });
  page.on("response", r => { if (r.url().startsWith(base) && r.status() >= 400) errors.push("HTTP " + r.status() + " " + r.url().slice(base.length)); });
  const snap = async (name, full) => { if (!shots) return; await page.waitForTimeout(400); await page.screenshot({ path: path.join(shots, "el-" + name + ".png"), fullPage: !!full }); };
  const text = async () => (await page.textContent("#app")).replace(/\s+/g, " ");
  // answer what is on screen, right, until the round ends
  async function play(max) {
    let n = 0;
    for (let i = 0; i < max; i++) {
      await page.waitForTimeout(350);
      if (await page.$("#next")) { await page.click("#next"); continue; }
      const it = await page.evaluate(() => window.__test.item());
      if (!it) break;
      if (await page.$("[data-opt]")) {
        const k = await page.$$eval("[data-opt]", (bs, a) => bs.findIndex(b => b.textContent.trim() === a), it.answer);
        await page.click("[data-opt] >> nth=" + Math.max(0, k)).catch(() => {});
      } else if (await page.$("#ans")) { await page.fill("#ans", it.answer); await page.click("#send"); }
      else if (await page.$("#wans")) { await page.fill("#wans", it.answer); await page.click("#wsend"); }
      else break;
      n++;
    }
    return n;
  }

  await page.goto(base + "?test", { waitUntil: "networkidle" });
  await page.waitForSelector(".pick-lang[data-lang='el']", { timeout: 10000 });
  await snap("selector");
  await page.click(".pick-lang[data-lang='el']");
  // the first start, as a learner from zero
  await page.waitForSelector("#obnext", { timeout: 20000 });
  await page.click("[data-obwhy] >> nth=0");
  await page.click("[data-obmin='15']");
  await page.click("#obnext");
  await page.waitForSelector("#obzero, #obtest", { timeout: 5000 });
  if (await page.$("#obzero")) await page.click("#obzero"); else { await page.click("#obtest"); await page.waitForSelector("#ubskip"); await page.click("#ubskip"); }
  await page.waitForSelector("#obgo", { timeout: 5000 });
  await page.click("#obgo");
  await page.waitForTimeout(800);
  if ((await page.getAttribute("html", "data-lang")) !== "el") errors.push("html data-lang no es el");
  const h1 = (await page.textContent("h1")).trim();
  note("Σήμερα: " + h1 + " · pestañas: " + (await page.$$eval("#nav button", b => b.map(x => x.textContent.trim()).join(" "))));
  if (!/Καλημέρα|Καλησπέρα/.test(h1) && !/semana/i.test(await text())) errors.push("Σήμερα no saluda en griego: " + h1);
  await snap("simera", true);

  // the week 1: its missions, a lesson, its round
  const plan = await page.evaluate(() => window.__test.plan(1));
  note("semana 1: " + plan.map(m => m.kind).join(", "));
  if (!plan.some(m => m.kind === "lez") || !plan.some(m => m.kind === "play")) errors.push("la semana 1 no tiene lección o ronda: " + JSON.stringify(plan.map(m => m.kind)));
  await page.evaluate(() => window.__test.mission("lez", "0", 1));
  await page.waitForTimeout(500);
  await snap("leccion");
  let steps = 0;
  for (let i = 0; i < 40; i++) {
    const q = await page.$("[data-lq]:not([disabled])");
    if (q) { await q.click(); await page.waitForTimeout(250); }
    const nx = await page.$("#lesnext, #lesnext2");
    if (!nx) break;
    await page.waitForTimeout(250);
    await nx.click(); steps++;
    await page.waitForTimeout(250);
  }
  note("lección 1: " + steps + " pasos" + (/Lección|lista|completa/i.test(await text()) ? ", terminada" : ""));
  await page.evaluate(() => window.__test.mission("play", null, 1));
  await page.waitForTimeout(500);
  await snap("ronda");
  const n = await play(30);
  note("ronda de la semana 1: " + n + " respuestas");
  if (n < 5) errors.push("la ronda de la semana 1 respondió solo " + n);
  // the pause and the review
  await page.evaluate(() => window.__test.start("pausa"));
  await page.waitForTimeout(500);
  const ids = await page.evaluate(() => (window.__test.round() || { items: [] }).items.map(x => x.id || ""));
  note("pausa: " + ids.length + " ítems");

  // Silent mode: the rounds of week 1 (which has listening items) bring
  // nothing to listen to, and keep their size.
  await page.evaluate(() => { window.__test.state().silent = true; });
  let ear = 0, total = 0, loud = 0;
  for (let k = 0; k < 6; k++) {
    for (const kind of ["round", "pausa"]) {
      await page.evaluate(([kd]) => window.__test.start(kd, null, 1), [kind]);
      await page.waitForTimeout(150);
      const its = await page.evaluate(() => (window.__test.round() || { items: [] }).items.map(x => [x.type, !!x.dettato, !!x.audio]));
      total += its.length;
      ear += its.filter(t => /^(listen|dictation|coppia|conta|scegli|intonazione|accento|forma)$/.test(t[0]) || t[1] || t[2]).length;
    }
  }
  await page.evaluate(() => { window.__test.state().silent = false; });
  for (let k = 0; k < 6; k++) {
    await page.evaluate(() => window.__test.start("round", null, 1));
    await page.waitForTimeout(150);
    loud += await page.evaluate(() => (window.__test.round() || { items: [] }).items.filter(x => x.type === "listen").length);
  }
  note("modo silencioso: " + total + " ítems, " + ear + " de escuchar (sin él: " + loud + " de escuchar en 6 rondas)");
  if (ear) errors.push("modo silencioso: quedaron " + ear + " ejercicios de escuchar");
  if (!loud) errors.push("sin modo silencioso la semana 1 no trajo ejercicios de escuchar: la prueba no prueba nada");
  await page.evaluate(() => window.__test.start("pausa"));   // back to the pause, as before
  await page.waitForTimeout(300);
  if (ids.some(id => /^(frase|lab|lettura|b:|suoni)/.test(id))) errors.push("la pausa trae cosas que no son del griego: " + ids.join(","));
  await play(40);
  /* ---- lo propio del griego ---- */
  // the keyboard of the app, with a mouse too (this browser has no touch
  // screen): the Greek layout, the accented vowels, the Greek question mark
  await page.evaluate(() => window.__test.play(["el01-026"], 1));     // «Copiá con el teclado griego: νερό»
  await page.waitForSelector("#ans", { timeout: 5000 });
  await page.click("#ans");
  await page.waitForTimeout(400);
  const keys = await page.evaluate(() => {
    const p = document.querySelector("#kbapp");
    return p && !p.hidden ? Array.from(p.querySelectorAll("[data-k]")).map(b => b.getAttribute("data-k")) : [];
  });
  if (keys.join("").indexOf("ςερτυθιοπ") < 0 || keys.indexOf("ά") < 0 || keys.indexOf(";") < 0 || keys.indexOf("?") >= 0)
    errors.push("el teclado de la app no es el griego (o no aparece con mouse): " + keys.join(""));
  for (const k of ["ν", "ε", "ρ", "ό"]) await page.click('#kbapp [data-k="' + k + '"]');
  let val = await page.inputValue("#ans");
  if (val !== "νερό") errors.push("el teclado de la app escribió «" + val + "» por «νερό»");
  await snap("teclado");
  // the physical keyboard: Latin keys write the Greek letter of that place,
  // «;» and then a vowel the accented one, «w» the final sigma
  await page.fill("#ans", "");
  await page.focus("#ans");
  for (const k of ["n", "e", "r", ";", "o", " ", "k", "a", "f", ";", "e", "w"]) await page.keyboard.press(k === " " ? "Space" : k);
  val = await page.inputValue("#ans");
  if (val !== "νερό καφές") errors.push("el teclado físico escribió «" + val + "» por «νερό καφές»");
  note("teclado: en pantalla (" + keys.filter(k => k.length === 1).length + " teclas) y físico «" + val + "»");
  // the reading aid: how the answer sounds, under the correction
  await page.fill("#ans", "νερό");
  await page.click("#send");
  await page.waitForSelector("#next", { timeout: 5000 });
  const aid = await page.$$eval("#fb .suena", els => els.map(e => e.textContent).join(" "));
  if (!/«neró»/.test(aid)) errors.push("la corrección no muestra cómo suena: «" + aid + "»");
  await snap("correccion");
  await page.click("#next");
  // …and on the card of a new word
  await page.evaluate(() => window.__test.mission("vocab", null, 1));
  await page.waitForTimeout(500);
  const card = await page.$$eval(".card.intro .suena", els => els.map(e => e.textContent).join(" "));
  if (!/«[a-záéíóú ]+»/.test(card)) errors.push("la tarjeta de palabra nueva no muestra cómo suena: «" + card + "»");
  note("ayuda de lectura: " + aid + " · " + card);
  await snap("palabra");
  await play(40);
  // without accent: «casi»; a Latin answer: wrong
  const g = await page.evaluate(() => {
    const E = window.Engine, it = { answer: "καλημέρα", accept: ["καλημέρα"] };
    return [E.grade("καλημερα", it), E.grade("kalimera", it), E.grade("Καλημέρα!", it)].join(",");
  });
  if (g !== "quasi,sbagliato,giusto") errors.push("la corrección del griego: " + g);

  // Εγώ: the profile, the language switch
  await page.evaluate(() => { location.hash = ""; });
  await page.click("#nav button >> nth=2").catch(() => {});
  await page.waitForTimeout(600);
  await snap("ego", true);
  const ich = await text();
  if (!/Cambiar a/.test(ich)) errors.push("Εγώ no ofrece cambiar de idioma");
  note("Εγώ: " + (await page.$$eval("[data-switchlang]", b => b.map(x => x.textContent.trim()).join(" | "))));
  // to Italian and back: each keeps its progress
  const xp = await page.evaluate(() => window.__test.state().xp);
  await page.click("[data-switchlang='it']");
  await page.waitForTimeout(2500);
  if ((await page.getAttribute("html", "data-lang")) !== "it") errors.push("no cambió al italiano");
  await page.goto(base + "?test&lang=el", { waitUntil: "networkidle" });
  await page.waitForFunction(() => window.__test && window.__test.state, null, { timeout: 15000 });
  const xp2 = await page.evaluate(() => window.__test.state().xp);
  if (xp2 !== xp || !xp) errors.push("el griego no conservó su progreso: " + xp + " → " + xp2);
  note("de vuelta al griego: " + xp2 + " xp");

  console.log(errors.length ? "\nERRORES:\n" + errors.join("\n") : "\nsin errores · griego");
  await browser.close(); srv.kill();
  process.exit(errors.length ? 1 : 0);
})();
