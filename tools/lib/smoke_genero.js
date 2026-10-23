/* El color del género en el navegador (Signalgrammatik, alemán):
   - Palabras de la semana: «der Tisch» con el artículo en azul y su forma;
   - la lección de la semana 3: la tabla «Palabra | Artículo» y los
     ejemplos pintados, en claro y en oscuro con colores distintos;
   - la corrección: «Der Sonne scheint» → el aviso «es die Sonne» en rojo;
   - italiano y portugués: nada pintado, sin errores.
     NODE_PATH=$(npm root -g) node tools/lib/smoke_genero.js
     SHOTS=dir   capturas a 390×844 */
"use strict";
let chromium;
try { chromium = require("playwright").chromium; } catch (e) { chromium = require("/opt/node-tools/node_modules/playwright").chromium; }
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
  if (shots) fs.mkdirSync(shots, { recursive: true });
  const srv = spawn("python3", ["-m", "http.server", String(port)], { cwd: path.join(__dirname, "..", "..", "docs"), stdio: "ignore" });
  await new Promise(r => setTimeout(r, 1200));
  const browser = await chromium.launch().catch(() => chromium.launch({ executablePath: chromiumPath() }));
  const errors = [], base = "http://localhost:" + port + "/";
  const note = (s) => console.log("· " + s);

  async function open(code, scheme) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, colorScheme: scheme || "light" });
    // a learner past the first start, with week 4 open
    const key = { de: "wegc1", it: "laviac1", pt: "rumoc1" }[code] + ".save.v1";
    await ctx.addInitScript(([k]) => { try { if (!localStorage.getItem(k)) localStorage.setItem(k, JSON.stringify({ xp: 50, unlocked: 4, cards: {}, onboard: { at: 1 } })); } catch (e) { /* */ } }, [key]);
    const page = await ctx.newPage();
    page.on("pageerror", e => errors.push(code + ": pageerror: " + e.message));
    await page.goto(base + "?test&lang=" + code, { waitUntil: "networkidle" });
    await page.waitForFunction(() => window.__test && window.__test.state && window.__test.plan, null, { timeout: 20000 });
    await page.evaluate(() => { window.__test.state().silent = true; });
    return page;
  }
  // the week's page: Path, then the week's dot
  async function week(page, n) {
    await page.click('[data-tab="percorso"]');
    await page.waitForSelector('[data-week="' + n + '"]', { timeout: 5000 });
    await page.click('[data-week="' + n + '"]');
    await page.waitForSelector(".wwords", { timeout: 5000 });
  }

  for (const scheme of ["light", "dark"]) {
    const page = await open("de", scheme);
    await week(page, 3);
    const w = await page.evaluate(() => {
      const s = document.querySelector(".wwords .gen");
      return { n: document.querySelectorAll(".wwords .gen").length, first: s && s.textContent, cls: s && s.className,
               color: s && getComputedStyle(s).color, mark: s && getComputedStyle(s, "::before").content,
               label: (document.querySelector(".wwords [data-say]") || {}).getAttribute ? document.querySelector(".wwords [data-say]").getAttribute("data-say") : "" };
    });
    note("de " + scheme + ": Palabras de la semana: " + w.n + " artículos pintados; el primero «" + w.first + "» " + w.cls + " " + w.color + " " + w.mark);
    if (w.n < 8) errors.push("de: pocas palabras pintadas en la semana 3 (" + w.n + ")");
    if (!/gen-m mk/.test(w.cls || "") || w.first !== "der") errors.push("de: der Tisch no salió en azul con forma: " + w.cls);
    if (!/25A0|■/.test(w.mark || "")) errors.push("de: falta la forma ■ del masculino: " + w.mark);
    if (/<span/.test(w.label)) errors.push("de: el atributo data-say quedó pintado");
    if (shots) { await page.evaluate(() => document.querySelector(".wwords").scrollIntoView()); await page.waitForTimeout(600); await page.screenshot({ path: path.join(shots, "de-" + scheme + "-palabras.png") }); }
    // colors per gender (computed), different in light and dark
    const colors = await page.evaluate(() => ["m", "f", "n", "pl"].map(g => {
      const s = document.createElement("span"); s.className = "gen gen-" + g; s.textContent = "x"; document.body.appendChild(s);
      const c = getComputedStyle(s).color; s.remove(); return c;
    }));
    note("de " + scheme + ": colores " + colors.join(" · "));
    if (new Set(colors).size !== 4) errors.push("de " + scheme + ": los cuatro géneros no tienen cuatro colores: " + colors);
    if (scheme === "light" && colors[0] !== "rgb(26, 90, 158)") errors.push("de: el azul de der en claro: " + colors[0]);
    if (scheme === "dark" && colors[0] !== "rgb(130, 189, 245)") errors.push("de: el azul de der en oscuro: " + colors[0]);

    // the whole theory of week 3: the gender table and the examples
    await page.click("#teo");
    await page.waitForSelector(".blk", { timeout: 5000 });
    const t = await page.evaluate(() => ({
      cells: Array.from(document.querySelectorAll("table.gram td.gen-c")).map(td => td.className.replace("gen-c ", "") + ":" + td.textContent.trim()).slice(0, 6),
      th: Array.from(document.querySelectorAll("table.gram th.gen-c")).length,
      spans: document.querySelectorAll(".blk .gen").length,
      sonne: Array.from(document.querySelectorAll(".blk .gen")).filter(s => /Sonne/.test((s.nextSibling || {}).textContent || "") || /Sonne/.test((s.parentNode.nextSibling || {}).textContent || "")).map(s => s.className)[0] || ""
    }));
    note("de " + scheme + ": la teoría: " + t.spans + " artículos, celdas " + t.cells.join(", ") + "; die Sonne: " + t.sonne);
    if (t.spans < 20) errors.push("de: pocos artículos pintados en la teoría (" + t.spans + ")");
    if (t.cells.slice(0, 3).join() !== "gen-m:der,gen-m:der,gen-m:der") errors.push("de: la columna Artículo no va en el color de cada palabra: " + t.cells);
    if (!/gen-f/.test(t.sonne)) errors.push("de: die Sonne no salió en rojo: " + t.sonne);
    if (shots) { await page.evaluate(() => document.querySelector("table.gram").scrollIntoView()); await page.waitForTimeout(600); await page.screenshot({ path: path.join(shots, "de-" + scheme + "-tabla.png") }); }
    await page.close();
  }

  // the correction: «Der Sonne scheint» → es die Sonne
  {
    const page = await open("de");
    await page.evaluate(() => window.__test.play([{ id: "gen-1", type: "translate", prompt: "Traducí al alemán", stem: "El sol brilla.",
      answer: "Die Sonne scheint.", accept: ["Die Sonne scheint."] }], 3));
    await page.waitForSelector("#ans", { timeout: 5000 });
    await page.fill("#ans", "Der Sonne scheint.");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(400);
    // a «Ver la respuesta» or a second try may come first: give up to see the sheet
    for (let k = 0; k < 3 && !(await page.$("#fb .feedback .verdict")); k++) {
      const b = await page.$("#reveal") || await page.$("#giveup");
      if (b) await b.click(); else { await page.keyboard.press("Enter"); }
      await page.waitForTimeout(400);
    }
    const fb = await page.evaluate(() => {
      const n = document.querySelector("#fb .gen-note");
      return { note: n ? n.textContent : "", sol: Array.from(document.querySelectorAll("#fb .sol .gen")).map(s => s.className + ":" + s.textContent),
               fb: (document.querySelector("#fb") || {}).innerText || "" };
    });
    note("de: la corrección: «" + fb.note + "» · la solución: " + fb.sol.join(", "));
    if (!/es ●?\s*Die Sonne \(femenino\), no «Der Sonne»/.test(fb.note.replace(/\s+/g, " "))) errors.push("de: falta el aviso de género: «" + fb.note + "» / " + fb.fb.slice(0, 200));
    if (!fb.sol.some(s => /gen-f/.test(s))) errors.push("de: la solución no pinta Die en rojo: " + fb.sol);
    if (shots) await page.screenshot({ path: path.join(shots, "de-correccion.png") });
    await page.close();
  }

  // Italian and Portuguese: nothing painted
  for (const code of ["it", "pt"]) {
    const page = await open(code);
    await week(page, 3);
    await page.click("#teo").catch(() => {});
    await page.waitForTimeout(300);
    const n = await page.evaluate(() => document.querySelectorAll(".gen, .gen-c").length);
    note(code + ": " + n + " marcas de género");
    if (n) errors.push(code + ": se pintó el género (" + n + ")");
    await page.close();
  }

  await browser.close();
  srv.kill();
  if (errors.length) { console.log("\nERRORES:\n" + errors.join("\n")); process.exit(1); }
  console.log("\nsmoke del color del género: ok");
})().catch(e => { console.error(e); process.exit(1); });
