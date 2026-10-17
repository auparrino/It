/* El cliente de IA del núcleo (docs/js/ia.js), con fetch simulado:
   - Gemini va primero salvo que el alumno elija Groq;
   - el razonamiento se apaga con la escalera none → minimal → low, y el
     escalón que anduvo se recuerda por modelo (no se vuelve a pagar el 400);
   - la respuesta de a poco (stream) se muestra mientras llega y se lee el
     JSON al final; el campo parcial se extrae bien con escapes;
   - con dos claves y `hedge`, si el primero no empieza a tiempo responde el
     segundo y el primero se cancela.
   Run: node tools/lib/test_ia.js */
"use strict";
var pack = require("./pack.js");
var ctx = pack("it", { upTo: "diagnosi.js" });
ctx.TextDecoder = TextDecoder;
ctx.TextEncoder = TextEncoder;
ctx.AbortController = AbortController;
var IA = ctx.IA;

var fails = 0, checks = 0;
function ok(c, what) { checks++; if (!c) { fails++; console.log("FAIL " + what); } }

function memStore() {
  var mem = {};
  ctx.localStorage = { getItem: function (k) { return k in mem ? mem[k] : null; }, setItem: function (k, v) { mem[k] = String(v); } };
  return mem;
}
function jsonResp(status, body) {
  return Promise.resolve({ ok: status === 200, status: status, json: function () { return Promise.resolve(body); },
                           text: function () { return Promise.resolve(JSON.stringify(body || {})); } });
}
function reply(txt) { return { choices: [{ message: { content: txt } }] }; }
function modelsList(url) {
  if (/googleapis/.test(url)) return { data: [{ id: "models/gemini-2.5-flash" }, { id: "models/gemini-2.0-flash" }] };
  return { data: [{ id: "moonshotai/kimi-k2-instruct" }, { id: "llama-3.1-8b-instant" }] };
}
// Un cuerpo que llega de a pedazos, como text/event-stream.
function sseBody(chunks, delay) {
  var enc = new TextEncoder(), i = 0;
  return { getReader: function () {
    return { read: function () {
      return new Promise(function (res) {
        setTimeout(function () {
          if (i >= chunks.length) return res({ done: true });
          var c = chunks[i++];
          res({ done: false, value: enc.encode("data: " + JSON.stringify({ choices: [{ delta: { content: c } }] }) + "\n\n" + (i === chunks.length ? "data: [DONE]\n\n" : "")) });
        }, delay || 1);
      });
    }, cancel: function () {} };
  } };
}

var CASES = [];
function test(name, fn) { CASES.push([name, fn]); }
function run() {
  var c = CASES.shift();
  if (!c) { console.log("\n" + (fails ? "FALLAN " + fails : "0 errores") + " · " + checks + " chequeos (cliente de IA)"); process.exit(fails ? 1 : 0); }
  c[1](function () { run(); });
}

test("Gemini primero por defecto; Groq si el alumno lo elige", function (next) {
  var mem = memStore(), calls = [];
  ctx.fetch = function (url, opt) {
    if (/\/models$/.test(url)) return jsonResp(200, modelsList(url));
    calls.push(JSON.parse(opt.body).model);
    return jsonResp(200, reply('{"a":1}'));
  };
  IA.llm("p", { groq: "g", gemini: "m" }, function (e, d, meta) {
    ok(!e && d.a === 1 && meta.id === "gemini" && calls[0] === "gemini-2.5-flash", "Gemini primero: " + calls.join(","));
    IA.setOrder("groq");
    ok(mem["laviac1.ia.first"] === "groq", "el orden queda guardado con el prefijo del idioma");
    calls.length = 0;
    IA.llm("p", { groq: "g", gemini: "m" }, function (e2, d2, meta2) {
      ok(!e2 && meta2.id === "groq" && /kimi/.test(calls[0]), "Groq primero si se elige: " + calls.join(","));
      next();
    });
  });
});

test("Gemini saturado: espera y otra vuelta, sin caer en Groq para corregir", function (next) {
  memStore();
  IA.retryWaits([5, 5]);
  var calls = [];
  ctx.fetch = function (url, opt) {
    if (/\/models$/.test(url)) return jsonResp(200, modelsList(url));
    var b = JSON.parse(opt.body);
    calls.push(b.model);
    return calls.length <= 2 ? jsonResp(503, {}) : jsonResp(200, reply('{"ok":3}'));
  };
  IA.llm("p", { groq: "g", gemini: "m" }, function (e, d, meta) {
    ok(!e && d.ok === 3 && meta.id === "gemini" && calls.length === 3 && !calls.some(function (m) { return /kimi|llama/.test(m); }),
       "segunda vuelta con Gemini: " + calls.join(","));
    calls.length = 0;
    ctx.fetch = function (url, opt) {
      if (/\/models$/.test(url)) return jsonResp(200, modelsList(url));
      calls.push(JSON.parse(opt.body).model);
      return jsonResp(503, {});
    };
    IA.llm("p", { groq: "g", gemini: "m" }, function (e2) {
      ok(e2 && /saturado/.test(e2.message) && calls.length === 6 && !calls.some(function (m) { return /kimi|llama/.test(m); }),
         "todo saturado: tres vueltas y error, sin Groq: " + calls.join(","));
      calls.length = 0;
      ctx.fetch = function (url, opt) {
        if (/\/models$/.test(url)) return jsonResp(200, modelsList(url));
        calls.push(JSON.parse(opt.body).model);
        return jsonResp(404, {});
      };
      IA.llm("p", { gemini: "m" }, function (e3) {
        ok(e3 && calls.length === 2, "un 404 no se reintenta: " + calls.join(","));
        IA.retryWaits([2000, 5000]);
        next();
      });
    });
  });
});

test("razonamiento apagado: none → minimal, y el escalón queda recordado", function (next) {
  memStore();
  var effs = [];
  ctx.fetch = function (url, opt) {
    if (/\/models$/.test(url)) return jsonResp(200, modelsList(url));
    var b = JSON.parse(opt.body);
    effs.push(b.reasoning_effort || "-");
    if (b.reasoning_effort === "none") return jsonResp(400, { error: { message: "reasoning_effort 'none' is not supported for this model" } });
    return jsonResp(200, reply('{"ok":true}'));
  };
  IA.llm("p", { gemini: "m" }, function (e, d) {
    ok(!e && d.ok && effs.join(",") === "none,minimal", "escalera: " + effs.join(","));
    effs.length = 0;
    IA.llm("p", { gemini: "m" }, function (e2) {
      ok(!e2 && effs.join(",") === "minimal", "la segunda vez va directo a minimal: " + effs.join(","));
      next();
    });
  });
});

test("un 400 por el modo JSON no apaga el razonamiento", function (next) {
  memStore();
  var bodies = [];
  ctx.fetch = function (url, opt) {
    if (/\/models$/.test(url)) return jsonResp(200, modelsList(url));
    var b = JSON.parse(opt.body);
    bodies.push(b);
    if (b.response_format) return jsonResp(400, { error: { message: "response_format json_object not supported" } });
    return jsonResp(200, reply('```json\n{"ok":2}\n```'));
  };
  IA.llm("p", { gemini: "m" }, function (e, d) {
    ok(!e && d.ok === 2 && bodies.length === 2 && bodies[1].reasoning_effort === "none" && !bodies[1].response_format,
       "sin modo JSON pero con el razonamiento apagado: " + JSON.stringify(bodies.map(function (b) { return [b.reasoning_effort, !!b.response_format]; })));
    next();
  });
});

test("de a poco: el turno se muestra mientras llega", function (next) {
  memStore();
  var seen = [];
  ctx.fetch = function (url, opt) {
    if (/\/models$/.test(url)) return jsonResp(200, modelsList(url));
    var b = JSON.parse(opt.body);
    ok(b.stream === true && !b.response_format, "pide stream sin modo JSON");
    return Promise.resolve({ ok: true, status: 200, body: sseBody(['{"risposta": "Ciao', ', come', ' stai?", "recast": "", ', '"fine": false}']) });
  };
  IA.llm("p", { gemini: "m" }, function (e, d, meta) {
    ok(!e && d.risposta === "Ciao, come stai?" && d.fine === false, "JSON final: " + JSON.stringify(d) + (e ? e.message : ""));
    ok(seen.length >= 2 && seen[0] === "Ciao" && seen[seen.length - 1] === "Ciao, come stai?", "texto parcial: " + JSON.stringify(seen));
    ok(meta && meta.first >= 0 && meta.ms >= meta.first, "mide el primer fragmento y el total");
    next();
  }, { stream: function (raw) { var f = IA.partialField(raw, "risposta"); if (f && (!seen.length || seen[seen.length - 1] !== f.text)) seen.push(f.text); } });
});

test("campo parcial con escapes", function (next) {
  var f = IA.partialField('{"risposta": "Dice \\"sì\\"\\ne va', "risposta");
  ok(f && f.text === 'Dice "sì"\ne va' && !f.closed, "escapes: " + JSON.stringify(f));
  var g = IA.partialField('{"x":1,"risposta":"fin"}', "risposta");
  ok(g && g.text === "fin" && g.closed, "cerrado");
  ok(IA.partialField('{"x":1', "risposta") === null, "sin el campo todavía");
  next();
});

test("carrera: Gemini tarda en empezar, Groq responde y Gemini se cancela", function (next) {
  memStore();
  var aborted = false, streamed = [];
  ctx.fetch = function (url, opt) {
    if (/\/models$/.test(url)) return jsonResp(200, modelsList(url));
    if (/googleapis/.test(url)) {
      return new Promise(function (res, rej) {
        if (opt.signal) opt.signal.addEventListener("abort", function () { aborted = true; rej(new Error("AbortError")); });
        setTimeout(function () { res({ ok: true, status: 200, body: sseBody(['{"risposta": "tardi"}']) }); }, 400);
      });
    }
    return Promise.resolve({ ok: true, status: 200, body: sseBody(['{"risposta": "pronto"', "}"]) });
  };
  IA.llm("p", { groq: "g", gemini: "m" }, function (e, d, meta) {
    ok(!e && d.risposta === "pronto" && meta.id === "groq", "gana el que empezó: " + JSON.stringify(d) + (e ? e.message : ""));
    ok(streamed.every(function (s) { return s.indexOf("tardi") < 0; }), "la pantalla muestra solo al ganador");
    setTimeout(function () { ok(aborted, "el lento se cancela"); next(); }, 30);
  }, { stream: function (raw) { streamed.push(raw); }, hedge: 50 });
});

test("sin clave", function (next) {
  IA.llm("p", {}, function (e) { ok(e && /sin clave/.test(e.message), "error claro"); next(); });
});

run();
