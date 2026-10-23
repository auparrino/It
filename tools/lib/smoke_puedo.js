/* «Ya puedo…» (docs/js/puedo.js) en Chromium, en cada idioma, a 390×844:
   - una semana abierta muestra sus objetivos al abrirse, sin tarjeta
     mientras faltan misiones;
   - la semana del jefe vencido (misiones hechas) muestra «¿Ya podés…?»;
     «todavía no» se guarda; «sí» abre la prueba con los ítems atados y,
     respondida bien, el resultado dice «te salió» y la tarjeta lo marca ✅;
   - esa semana es también la de la Estación (10-12): su balance aparece;
   - nada se sale a lo ancho.
     NODE_PATH=$(npm root -g) node tools/lib/smoke_puedo.js
     LANGS=it,pt,de   PORT=8779   SHOTS=dir */
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
  const port = +(process.env.PORT || 8779), shots = process.env.SHOTS || "";
  const langs = (process.env.LANGS || Object.keys(Boot.LANGS).join(",")).split(",");
  if (shots) fs.mkdirSync(shots, { recursive: true });
  const srv = spawn("python3", ["-m", "http.server", String(port)], { cwd: path.join(__dirname, "..", "..", "docs"), stdio: "ignore" });
  await new Promise(r => setTimeout(r, 1200));
  const browser = await chromium.launch().catch(() => chromium.launch({ executablePath: chromiumPath() }));
  const errors = [], base = "http://localhost:" + port + "/";
  const note = (s) => console.log("· " + s);
  const snap = async (page, name) => { if (shots) await page.screenshot({ path: path.join(shots, name + ".png"), fullPage: true }); };
  const wide = (page) => page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);

  for (const code of langs) {
    const fail = (s) => errors.push(code + ": " + s);
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    const key = Boot.LANGS[code].storage + ".save.v1";
    await ctx.addInitScript(([k, c]) => {
      if (sessionStorage.getItem("pdseed")) return;
      const read = {}; for (let n = 1; n <= 13; n++) read[n] = Date.now();
      localStorage.setItem("c1.lang", c);
      localStorage.setItem(k, JSON.stringify({ xp: 900, unlocked: 14, cards: {}, read: read, onboard: { step: 3, at: Date.now() },
        weekStats: { 13: { attempts: 40, right: 36, bossPassed: true } } }));
      sessionStorage.setItem("pdseed", "1");
    }, [key, code]);
    const page = await ctx.newPage();
    page.on("pageerror", e => fail("pageerror: " + e.message));
    await page.goto(base + "?test&lang=" + code, { waitUntil: "networkidle" });
    await page.waitForFunction(() => window.__test && window.__test.state && window.Puedo, null, { timeout: 20000 });
    await page.evaluate(() => { window.__test.fast = true; });
    const openWeek = async (n) => {
      await page.click("[data-tab='percorso']").catch(() => {});
      await page.waitForTimeout(300);
      await page.click("[data-week='" + n + "']");
      await page.waitForTimeout(400);
    };

    // a week with missions left: the goals, no card
    await openWeek(12);
    const li12 = await page.$$eval(".puedo-intro li", els => els.length);
    if (li12 < 3 || li12 > 4) fail("la semana 12 muestra " + li12 + " objetivos");
    if (await page.$(".card.puedo")) fail("la semana 12 muestra «¿Ya podés…?» con misiones pendientes");
    await snap(page, code + "-puedo-semana12");

    // the missions of week 13 done: the boss beaten, or (a course without
    // bosses) the lesson read, the words written, Dominala and Capire won
    const left = await page.evaluate(async () => {
      const co = await (await fetch("lang/" + window.LANG.code + "/data/course.json")).json();
      const w = co.weeks[12], s = window.__test.state();
      if (!w.boss) {
        s.read[13] = Date.now();
        s.weekStats[13] = { attempts: 40, right: 30, bossPassed: false, dominated: true, domPct: 90, domBest: 90 };
        (w.vocab || []).forEach(v => { s.cards["v:" + v[0]] = { prod: 1, reps: 2, seen: 2, due: Date.now() + 9e8, s: 10, d: 4 }; });
        ((window.Lab && window.Lab.CAPIRE) || []).filter(c => c.week === 13).forEach(c => {
          s.capirePct = s.capirePct || {}; s.capirePct[c.id] = 100;
          for (let i = 0; i < 80; i++) {
            const k = "capire:" + c.id + ":" + i;
            if (window.Lab.item && window.Lab.item(k)) s.cards[k] = { reps: 1, seen: 1, due: Date.now() + 9e8, s: 10, d: 4 };
          }
        });
      }
      return window.__test.plan(13).filter(x => !x.done && !x.opt).map(x => x.kind + ":" + (x.arg || ""));
    });
    if (left.length) fail("quedan misiones en la semana 13: " + left.join(", "));
    await openWeek(13);
    const nb = await page.$$eval(".card.puedo [data-puedo]", els => els.length);
    const ng = await page.$$eval(".puedo-intro li", els => els.length);
    if (!nb || nb !== ng * 3) fail("la tarjeta tiene " + nb + " botones para " + ng + " objetivos");
    if (!(await page.$(".puedobal"))) fail("la semana 13 (Estación 10-12) no muestra el balance de «Ya puedo»");
    if (await wide(page)) fail("la semana se sale a lo ancho");
    await snap(page, code + "-puedo-tarjeta");
    await page.click("[data-puedo='13:1:no']");
    await page.waitForTimeout(400);
    const no = await page.evaluate(() => (window.__test.state().puedo || {})[13]);
    if (!no || !no[1] || no[1].a !== "no") fail("«todavía no» no se guardó: " + JSON.stringify(no));
    if (!(await page.$("[data-puedo='13:1:no'].on"))) fail("el botón elegido no queda marcado");

    // «sí»: the test
    await page.click("[data-puedo='13:0:si']");
    await page.waitForTimeout(500);
    if ((await page.evaluate(() => window.__test.screen())) !== "gioco") fail("«sí» no abrió la prueba");
    const r0 = await page.evaluate(() => { const r = window.__test.round(); return { kind: r.kind, ids: r.items.map(x => x.id) }; });
    const want = await page.evaluate(async () => {
      const co = await (await fetch("lang/" + window.LANG.code + "/data/course.json")).json();
      return co.weeks[12].can[0].items;
    });
    if (r0.kind !== "puedo" || JSON.stringify(r0.ids.slice(0, want.length)) !== JSON.stringify(want)) fail("la prueba no son los ítems atados: " + JSON.stringify(r0) + " / " + JSON.stringify(want));
    await snap(page, code + "-puedo-prueba");
    for (let i = 0; i < 20; i++) {
      if ((await page.evaluate(() => window.__test.screen())) !== "gioco") break;
      const s = await page.evaluate(() => window.__test.solve());
      if (/^stuck/.test(s)) { fail("la prueba se trabó: " + s); break; }
      await page.waitForTimeout(150);
    }
    await page.waitForSelector(".puedo-cal", { timeout: 5000 }).catch(() => fail("el resultado no muestra la calibración"));
    const cal = await page.textContent(".puedo-cal").catch(() => "");
    if (!/te salió/.test(cal)) fail("la calibración no dice «te salió»: " + cal);
    const si = await page.evaluate(() => window.__test.state().puedo[13][0]);
    if (!si || si.a !== "si" || si.ok !== true) fail("no se guardó la prueba: " + JSON.stringify(si));
    if (await wide(page)) fail("el resultado se sale a lo ancho");
    await snap(page, code + "-puedo-resultado");
    await openWeek(13);
    const marks = await page.$$eval(".card.puedo .puedo-row .small", els => els.map(e => e.textContent));
    if (!/✅/.test(marks[0] || "") || !/⬜/.test(marks[1] || "")) fail("la tarjeta no marca lo contestado: " + JSON.stringify(marks));
    note(code + " · " + ng + " objetivos · «todavía no» guardado · «sí» probado con " + want.length + " ítem(s) y calibrado");
    await ctx.close();
  }
  await browser.close();
  srv.kill();
  if (errors.length) { console.log("\nFALLAS:\n" + errors.map(e => "  - " + e).join("\n")); process.exit(1); }
  console.log("\nsmoke «Ya puedo»: sin fallas");
})().catch(e => { console.error(e); process.exit(1); });
