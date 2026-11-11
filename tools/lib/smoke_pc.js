/* La app en la computadora, en el navegador (pantalla ancha, mouse y teclado):
   - las pestañas están arriba, en la cabecera, no en una barra abajo;
   - una ronda entera solo con el teclado: 1-9 eligen la opción o la ficha,
     Backspace saca la última ficha, Enter o Espacio siguen, y en una caja de
     texto Enter manda y, ya corregida, sigue;
   - la corrección sale al costado de la pregunta, sin taparla;
   - la sincronización sola, con un GitHub simulado y dos dispositivos: lo
     que se juega en la computadora sube al terminar la ronda, el celular lo
     trae sin preguntar al volver a la app, y si se avanzó en los dos lados
     sin conexión no se pisa nada (se avisa y elige el alumno).
     NODE_PATH=$(npm root -g) node tools/lib/smoke_pc.js
     SHOTS=dir   capturas */
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

/* GitHub simulado: los gists en memoria, compartidos por los dos dispositivos. */
function fakeGitHub() {
  const gists = {}, calls = [];
  let n = 0, clock = Date.parse("2026-11-11T10:00:00Z");
  const iso = () => { clock += 60000; return new Date(clock).toISOString(); };
  const cors = { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "*" };
  async function handle(route) {
    const req = route.request(), u = new URL(req.url()), m = req.method();
    if (m === "OPTIONS") return route.fulfill({ status: 204, headers: cors });
    calls.push(m + " " + u.pathname);
    const json = (status, body) => route.fulfill({ status, headers: Object.assign({ "content-type": "application/json" }, cors), body: JSON.stringify(body || {}) });
    if (req.headers().authorization !== "Bearer ghp_prueba") return json(401);
    const body = req.postData() ? JSON.parse(req.postData()) : null;
    if (m === "GET" && u.pathname === "/gists") {
      return json(200, Object.values(gists).map(g => ({ id: g.id, updated_at: g.updated_at, files: Object.fromEntries(Object.keys(g.files).map(k => [k, {}])) })));
    }
    if (m === "POST" && u.pathname === "/gists") {
      const g = { id: "g" + (++n), updated_at: iso(), files: body.files };
      gists[g.id] = g;
      return json(201, g);
    }
    const g = gists[(u.pathname.match(/^\/gists\/(\w+)$/) || [])[1]];
    if (!g) return json(404);
    if (m === "PATCH") { Object.assign(g.files, body.files); g.updated_at = iso(); }
    return json(200, g);
  }
  return { handle, gists, calls };
}

(async () => {
  const port = +(process.env.PORT || 8767), shots = process.env.SHOTS || "";
  if (shots) fs.mkdirSync(shots, { recursive: true });
  const srv = spawn("python3", ["-m", "http.server", String(port)], { cwd: path.join(__dirname, "..", "..", "docs"), stdio: "ignore" });
  await new Promise(r => setTimeout(r, 1200));
  const browser = await chromium.launch().catch(() => chromium.launch({ executablePath: chromiumPath() }));
  const errors = [], hub = fakeGitHub();
  const note = (s) => console.log("· " + s);
  const check = (cond, msg) => { if (!cond) errors.push(msg); };

  async function open(name, viewport, token) {
    const ctx = await browser.newContext({ viewport });
    await ctx.route("https://api.github.com/**", hub.handle);
    if (token) await ctx.addInitScript((t) => { try { localStorage.setItem("c1.gist.token", t); } catch (e) { /* */ } }, token);
    const page = await ctx.newPage();
    page.on("pageerror", e => errors.push(name + ": pageerror: " + e.message));
    await page.goto("http://localhost:" + port + "/?test&lang=it", { waitUntil: "networkidle" });
    await page.waitForFunction(() => window.__test && window.__test.state, null, { timeout: 20000 });
    // the first start: from zero
    for (let i = 0; i < 8; i++) {
      if (await page.evaluate(() => window.__test.screen() === "oggi")) break;
      const b = (await page.$("#obzero")) || (await page.$("#app .btn:not(.ghost):not(:disabled)"));
      if (!b) break;
      await b.click().catch(() => {});
      await page.waitForTimeout(500);
    }
    check(await page.evaluate(() => window.__test.screen() === "oggi"), name + ": no llegó a la pantalla de hoy");
    return page;
  }
  const snap = async (page, name) => { if (shots) { await page.waitForTimeout(500); await page.screenshot({ path: path.join(shots, name + ".png") }); } };
  const st = (page) => page.evaluate(() => { const s = window.__test.state(); return { xp: s.xp, cards: Object.keys(s.cards).length, attempts: s.totals.attempts }; });
  const sync = (page) => page.evaluate(() => JSON.parse(localStorage.getItem("laviac1.gist") || "{}"));
  // «back to the app»: what the phone does when it is opened again
  const comeBack = async (page) => { await page.waitForTimeout(5200); await page.evaluate(() => window.dispatchEvent(new Event("online"))); await page.waitForTimeout(1500); };

  /* ---- 1. the layout on a wide screen ---- */
  const pc = await open("pc", { width: 1366, height: 768 }, "ghp_prueba");
  const nav = await pc.evaluate(() => { const r = document.querySelector("#nav").getBoundingClientRect(); return { top: r.top, bottom: r.bottom, h: innerHeight }; });
  check(nav.bottom < 120, "las pestañas no están arriba (bottom " + nav.bottom + ")");
  await pc.click('#nav [data-tab="percorso"]');
  check(await pc.evaluate(() => window.__test.screen() === "percorso"), "la pestaña de arriba no cambia de pantalla");
  await pc.click('#nav [data-tab="oggi"]');
  await snap(pc, "pc-hoy");
  note("pestañas arriba, en la cabecera");

  /* ---- 2. a round with the keyboard only ---- */
  await pc.evaluate(() => window.__test.start("pausa"));
  await pc.waitForTimeout(500);
  const kinds = {};
  let side = null;
  for (let i = 0; i < 60; i++) {
    const it = await pc.evaluate(() => { const x = window.__test.item(); return x && { answer: String(x.answer) }; });
    if (!it) break;
    let k;
    if (await pc.$("#app #next")) { k = "seguir"; await pc.keyboard.press(i % 2 ? "Enter" : "Space"); }
    else if (await pc.$("#app .opt:not(:disabled)")) {
      k = "opción";
      await pc.keyboard.press("1");
      await pc.waitForTimeout(450);
      if (!side && await pc.$(".feedback:not(.prompt)")) {
        side = await pc.evaluate(() => {
          const f = document.querySelector(".feedback:not(.prompt)").getBoundingClientRect(), c = document.querySelector("#app > .card").getBoundingClientRect();
          return { gap: Math.round(f.left - c.right), fits: f.right <= innerWidth && c.left >= 0, fTop: Math.round(f.top) };
        });
        await snap(pc, "pc-correccion");
      }
    }
    else if (await pc.$("#tcheck")) {
      k = "fichas";
      const total = (await pc.$$("#tbank [data-tile]")).length;
      for (let q = 0; q < total; q++) await pc.keyboard.press("1");
      await pc.keyboard.press("Backspace");
      check((await pc.$$("#tbank [data-tile]:not(.used)")).length === 1, "Backspace no devolvió la última ficha");
      await pc.keyboard.press("1");
      await pc.keyboard.press("Enter");
    }
    else if (await pc.$("#reveal")) { k = "tarjeta"; await pc.keyboard.press("Enter"); await pc.waitForTimeout(250); await pc.keyboard.press("3"); }
    else if (await pc.$("#ans")) { k = "escribir"; await pc.keyboard.type(it.answer); await pc.keyboard.press("Enter"); }
    else { errors.push("ronda con teclado: pantalla sin tecla (" + i + ")"); break; }
    kinds[k] = (kinds[k] || 0) + 1;
    await pc.waitForTimeout(430);
  }
  check(await pc.evaluate(() => window.__test.screen() === "risultato"), "la ronda con teclado no llegó al final: " + JSON.stringify(kinds));
  check(!!side && side.gap >= 8 && side.fits, "la corrección no quedó al costado de la pregunta: " + JSON.stringify(side));
  note("ronda entera con el teclado: " + JSON.stringify(kinds) + "; corrección al costado " + JSON.stringify(side));

  // a typed answer: Enter sends, Enter again moves on
  await pc.evaluate(() => window.__test.play([{ id: "pc-1", type: "translate", prompt: "Traducí.", stem: "gracias", answer: "grazie", accept: ["grazie"] },
                                              { id: "pc-2", type: "translate", prompt: "Traducí.", stem: "hola", answer: "ciao", accept: ["ciao"] }], 1));
  await pc.waitForSelector("#ans");
  await pc.waitForTimeout(400);
  await pc.keyboard.type("grazie");
  await pc.keyboard.press("Enter");
  await pc.waitForTimeout(500);
  check(!!(await pc.$("#app #next")), "Enter en la caja no mandó la respuesta");
  await pc.keyboard.press("Enter");
  await pc.waitForTimeout(500);
  check(await pc.evaluate(() => { const x = window.__test.item(); return !!x && x.id === "pc-2"; }), "Enter, con la respuesta corregida, no pasó a la siguiente");
  await pc.keyboard.type("ciao");
  await pc.keyboard.press("Enter");
  await pc.waitForTimeout(500);
  await pc.keyboard.press("Enter");
  await pc.waitForTimeout(600);
  check(await pc.evaluate(() => window.__test.screen() === "risultato"), "la ronda escrita no terminó");
  note("escribir: Enter manda y, corregida, sigue");

  /* ---- 3. the sync, alone ---- */
  await pc.waitForTimeout(6500);                       // two rounds in a row: the second upload waits its turn
  const file = () => { const g = Object.values(hub.gists)[0]; return g && g.files["laviac1.json"] ? JSON.parse(g.files["laviac1.json"].content).save : null; };
  const pc1 = await st(pc);
  check(Object.keys(hub.gists).length === 1, "al terminar la ronda no se creó el gist: " + hub.calls.join(", "));
  check(!!file() && file().xp === pc1.xp, "lo subido no es el progreso de la computadora");
  note("la computadora subió sola su progreso (" + pc1.xp + " xp)");

  const tel = await open("celu", { width: 390, height: 844 }, "ghp_prueba");
  await tel.waitForTimeout(1500);
  const tel1 = await st(tel);
  check(tel1.xp === pc1.xp && tel1.cards === pc1.cards, "el celular no trajo lo de la computadora: " + JSON.stringify(tel1) + " ≠ " + JSON.stringify(pc1));
  check(Object.keys(hub.gists).length === 1, "el celular creó otro gist");
  await snap(tel, "celu-sincronizado");
  note("el celular, con el mismo token, lo trajo sin preguntar");

  // the phone plays; the computer gets it when it comes back
  await tel.evaluate(() => { window.__test.fast = true; window.__test.play([{ id: "tel-1", type: "translate", prompt: "Traducí.", stem: "hola", answer: "ciao", accept: ["ciao"] }], 1); });
  await tel.waitForSelector("#ans");
  await tel.fill("#ans", "ciao");
  await tel.click("#send");
  await tel.waitForTimeout(500);
  await tel.click("#app #next");
  await tel.waitForTimeout(6500);
  const tel2 = await st(tel);
  check(file().xp === tel2.xp && tel2.xp > tel1.xp, "el celular no subió su ronda");
  // on the result screen nothing is replaced under the learner; back in the home screen, it is
  await comeBack(pc);
  check((await st(pc)).xp === pc1.xp, "trajo la copia en medio de la pantalla de resultado");
  await pc.click("#toggi");
  await pc.waitForTimeout(1800);
  const pc2 = await st(pc);
  check(pc2.xp === tel2.xp && pc2.attempts === tel2.attempts, "la computadora no trajo lo del celular: " + JSON.stringify(pc2) + " ≠ " + JSON.stringify(tel2));
  note("ida y vuelta: celular → computadora (" + pc2.xp + " xp)");

  // both play without the other knowing: nothing is overwritten
  await pc.context().setOffline(true);
  await pc.evaluate(() => { const s = window.__test.state(); s.xp += 40; s.totals.attempts += 4; s.savedAt = Date.now(); });
  await tel.evaluate(() => { const s = window.__test.state(); s.xp += 10; s.totals.attempts += 1; s.savedAt = Date.now(); });
  await comeBack(tel);
  await pc.context().setOffline(false);
  await comeBack(pc);
  const pc3 = await st(pc), cloud = file();
  check(pc3.xp === pc2.xp + 40, "el conflicto pisó el progreso de la computadora");
  check(cloud.xp === tel2.xp + 10, "el conflicto pisó la copia de la nube");
  check(!!(await sync(pc)).conflict, "el conflicto no quedó anotado para avisar en Io");
  note("avance en los dos lados sin conexión: no se pisa nada y queda el aviso");

  await browser.close();
  srv.kill();
  if (errors.length) { console.log("ERRORES:\n" + errors.join("\n")); process.exit(1); }
  console.log("smoke_pc: ok");
})().catch(e => { console.error(e); process.exit(1); });
