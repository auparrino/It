#!/usr/bin/env python3
"""Controlli sugli agenti di fondo e sul server, con un Ollama finto.
   Run: python3 tools/test_agenti.py"""
import datetime as dt
import json
import os
import sys
import tempfile
import threading
import time
import unittest
import urllib.request
from http.server import BaseHTTPRequestHandler, HTTPServer

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import agente  # noqa: E402
import custode  # noqa: E402
import redattore  # noqa: E402
import serve  # noqa: E402

COURSE = agente.load_course()
NOW = int(time.time() * 1000)
DAY = agente.DAY_MS


_ITEMS, _WEEK_OF = agente.item_index(COURSE)


def week_items(n, k):
    return COURSE["weeks"][n - 1]["items"][:k]


def progress(last_days_ago=0, unlocked=21, cards=None, read=None, chal_at=None):
    p = {"unlocked": unlocked, "streak": 4, "cards": cards or {}, "read": read or {},
         "challengeLog": {}}
    if last_days_ago is not None:
        p["lastPlayed"] = agente.today_str(dt.date.today() - dt.timedelta(days=last_days_ago))
    if chal_at:
        p["challengeLog"]["r21-01"] = {"q": 2, "at": chal_at}
    return p


class Fechas(unittest.TestCase):
    def test_today_senza_zeri(self):
        self.assertEqual(agente.today_str(dt.date(2026, 9, 5)), "2026-9-5")

    def test_parse_e_days_away(self):
        self.assertEqual(agente.parse_day("2026-9-5"), dt.date(2026, 9, 5))
        self.assertIsNone(agente.parse_day("boh"))
        self.assertIsNone(agente.days_away({}))
        self.assertEqual(agente.days_away({"lastPlayed": "2026-9-5"}, dt.date(2026, 9, 9)), 4)


class Progresso(unittest.TestCase):
    def test_due_e_deboli(self):
        ids = week_items(21, 4) + week_items(3, 2)
        cards = {
            ids[0]: {"due": NOW - DAY, "ease": 1.5, "reps": 0, "seen": 3},
            ids[1]: {"due": NOW + DAY, "ease": 2.5, "reps": 3, "seen": 3},
            ids[2]: {"due": NOW - 1, "ease": 2.0, "reps": 1, "seen": 2},
            ids[3]: {"due": NOW - 1, "ease": 2.5, "reps": 0, "seen": 2},
            ids[4]: {"due": NOW - 1, "ease": 1.9, "reps": 0, "seen": 1},
            "inesistente": {"due": NOW - 1, "ease": 1.3},
        }
        p = progress(cards=cards)
        self.assertEqual(sorted(agente.due_cards(p, COURSE, NOW)), sorted(ids[:1] + ids[2:5]))
        # Weak cards: ids[0], ids[2], ids[3], ids[4].  An item shared by several
        # weeks counts for the first week that teaches it.
        expect = {}
        for i in (ids[0], ids[2], ids[3], ids[4]):
            expect[_WEEK_OF[i]] = expect.get(_WEEK_OF[i], 0) + 1
        weak = agente.weak_topics(p, COURSE, limit=10)
        self.assertEqual({w: n for w, _, n in weak}, expect)
        self.assertEqual([n for _, _, n in weak], sorted(expect.values(), reverse=True))

    def test_lesson_context(self):
        ctx = agente.lesson_context(COURSE["weeks"][20])
        self.assertTrue(ctx.startswith("Semana 21"))
        self.assertIn("Trampa", ctx)
        self.assertNotIn("*", ctx.split("\n")[-1])

    def test_pick_model_e_json(self):
        self.assertEqual(agente.pick_model(["nomic-embed-text", "llama3.1:8b", "gemma3:12b"]), "gemma3:12b")
        self.assertEqual(agente.pick_model([]), "")
        self.assertEqual(agente.extract_json('ecco ```json\n{"a": 1}\n```')["a"], 1)
        self.assertEqual(agente.extract_json('x {"a": 2} y')["a"], 2)
        with self.assertRaises(ValueError):
            agente.extract_json("niente")


class Custode(unittest.TestCase):
    def kinds(self, p):
        return [x["kind"] for x in p["plan"]]

    def test_inizio(self):
        p = custode.make_plan(progress(last_days_ago=None), COURSE)
        self.assertEqual(p["mode"], "inizio")
        self.assertEqual(self.kinds(p), ["teoria", "round"])

    def test_rientro_e_piccolo(self):
        cards = {i: {"due": NOW - 1, "ease": 2.5, "reps": 1, "seen": 1} for i in week_items(21, 12)}
        p = custode.make_plan(progress(last_days_ago=10, cards=cards), COURSE, now_ms=NOW)
        self.assertEqual(p["mode"], "rientro")
        self.assertEqual(len(p["plan"]), 1)
        self.assertEqual(p["plan"][0]["kind"], "review")
        self.assertEqual(p["plan"][0]["size"], 5)
        self.assertEqual(p["due"], 12)

    def test_rientro_senza_schede(self):
        p = custode.make_plan(progress(last_days_ago=30), COURSE)
        self.assertEqual(self.kinds(p), ["round"])
        self.assertEqual(p["plan"][0]["size"], 5)

    def test_ripresa(self):
        p = custode.make_plan(progress(last_days_ago=4), COURSE)
        self.assertEqual(p["mode"], "ripresa")
        self.assertEqual(self.kinds(p), ["round", "teoria"])
        p = custode.make_plan(progress(last_days_ago=4, read={"21": 1}), COURSE)
        self.assertEqual(self.kinds(p), ["round", "gym"])

    def test_normale(self):
        cards = {i: {"due": NOW - 1, "ease": 2.5, "reps": 1, "seen": 1} for i in week_items(21, 30)}
        p = custode.make_plan(progress(last_days_ago=1, cards=cards, read={"21": 1}), COURSE, now_ms=NOW)
        self.assertEqual(p["mode"], "normale")
        k = self.kinds(p)
        self.assertEqual(k[:2], ["review", "round"])
        self.assertEqual(p["plan"][0]["size"], 15)
        self.assertIn(k[2], ("scrittura", "compagno"))
        self.assertEqual(k[-1], "sfide")
        # a challenge done yesterday: no sfida in the plan
        p = custode.make_plan(progress(last_days_ago=0, read={"21": 1}, chal_at=NOW - DAY), COURSE, now_ms=NOW)
        self.assertNotIn("sfide", self.kinds(p))
        self.assertEqual(p["weekTitle"], "Condizionale presente")

    def test_boss_week_e_fallback(self):
        p = custode.make_plan(progress(last_days_ago=0, unlocked=13, read={"13": 1}), COURSE)
        self.assertTrue(any("Boss" in x["label"] for x in p["plan"]))
        for mode in ("inizio", "rientro", "ripresa", "normale"):
            p["mode"] = mode
            self.assertTrue(custode.fallback_message(p))


class Redattore(unittest.TestCase):
    def test_validate(self):
        v = redattore.validate
        self.assertIsNone(v({"type": "cloze", "prompt": "p", "stem": "senza buco", "answer": "x"}))
        self.assertIsNone(v({"type": "cloze", "prompt": "p", "stem": "Io ___ (andare)", "answer": ""}))
        self.assertIsNone(v({"type": "cloze", "prompt": "p", "stem": "vado: io ___", "answer": "vado"}),
                          "risposta visibile nello stem")
        self.assertIsNone(v({"type": "choice", "prompt": "p", "stem": "Io ___", "answer": "vado",
                             "options": ["vado", "vado"]}), "poche opzioni")
        it = v({"type": "choice", "prompt": "p", "stem": "Io ___ al mare", "answer": "Vado",
                "options": ["vado", "Vado", "vai", "va"], "note": "n"})
        self.assertEqual(it["options"], ["vado", "vai", "va"])
        self.assertEqual(it["answer"], "vado")
        self.assertEqual(it["accept"], ["vado"])
        it = v({"type": "choice", "prompt": "p", "stem": "Io ___", "answer": "vado",
                "options": ["vai", "va"]})
        self.assertIn("vado", it["options"], "la risposta viene aggiunta se manca")

    def test_merge_dedupe_e_id(self):
        week = COURSE["weeks"][20]
        bank = {"items": []}
        raw = [{"type": "cloze", "prompt": "p", "stem": "Io ___ (volere) un caffè", "answer": "vorrei", "note": "n"},
               {"type": "cloze", "prompt": "p", "stem": "io ___ (volere) un caffè", "answer": "vorrei", "note": "n"},
               {"type": "cloze", "prompt": "p", "stem": "rotto", "answer": "x", "note": ""}]
        added = redattore.merge(bank, raw, week, "20260915")
        self.assertEqual(len(added), 1)
        self.assertEqual(added[0]["id"], "m21-20260915-0")
        self.assertEqual(added[0]["src"], "maestro")
        self.assertEqual(added[0]["week"], 21)
        self.assertEqual(redattore.merge(bank, raw, week, "20260916"), [], "niente doppioni")


# ------------------------------------------------------------ server + proxy

class FakeOllama(BaseHTTPRequestHandler):
    def _json(self, code, payload):
        b = json.dumps(payload).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(b)))
        self.end_headers()
        self.wfile.write(b)

    def do_GET(self):
        self._json(200, {"models": [{"name": "qwen2.5:14b"}]})

    def do_POST(self):
        body = json.loads(self.rfile.read(int(self.headers["Content-Length"])))
        if body.get("model") == "nope":
            return self._json(404, {"error": "model 'nope' not found"})
        self._json(200, {"message": {"role": "assistant",
                                     "content": json.dumps({"echo": body["messages"][-1]["content"]})}})

    def log_message(self, *a):
        pass


class Server(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.fake = HTTPServer(("127.0.0.1", 0), FakeOllama)
        threading.Thread(target=cls.fake.serve_forever, daemon=True).start()
        cls.tmp = tempfile.mkdtemp()
        cls.progress = os.path.join(cls.tmp, "progress.json")
        cls.srv = serve.make_server(0, "127.0.0.1:%d" % cls.fake.server_port, cls.progress)
        threading.Thread(target=cls.srv.serve_forever, daemon=True).start()
        cls.base = "http://127.0.0.1:%d" % cls.srv.server_port

    @classmethod
    def tearDownClass(cls):
        cls.srv.shutdown()
        cls.srv.server_close()
        cls.fake.shutdown()
        cls.fake.server_close()

    def req(self, path, data=None, method=None):
        r = urllib.request.Request(self.base + path, data=data, method=method,
                                   headers={"Content-Type": "application/json"} if data else {})
        try:
            with urllib.request.urlopen(r, timeout=5) as resp:
                return resp.status, resp.read()
        except urllib.error.HTTPError as e:
            return e.code, e.read()

    def test_static(self):
        code, body = self.req("/index.html")
        self.assertEqual(code, 200)
        self.assertIn(b"tutor.js", body)

    def test_progress_roundtrip(self):
        code, _ = self.req("/progress")
        self.assertEqual(code, 404)
        code, body = self.req("/progress", data=b'{"xp": 7, "savedAt": 3}', method="PUT")
        self.assertEqual(code, 200)
        self.assertEqual(json.loads(body)["savedAt"], 3)
        code, body = self.req("/progress")
        self.assertEqual(json.loads(body)["xp"], 7)
        self.assertEqual(agente.load_progress(self.progress)["xp"], 7)
        code, _ = self.req("/progress", data=b"[1,2]", method="PUT")
        self.assertEqual(code, 400)
        code, _ = self.req("/progress", data=b"{bad", method="POST")
        self.assertEqual(code, 400)

    def test_proxy(self):
        code, body = self.req("/ollama/api/tags")
        self.assertEqual(code, 200)
        self.assertEqual(json.loads(body)["models"][0]["name"], "qwen2.5:14b")
        code, body = self.req("/ollama/api/chat",
                              data=json.dumps({"model": "m", "messages": [{"role": "user", "content": "ciao"}]}).encode())
        self.assertEqual(code, 200)
        self.assertEqual(json.loads(json.loads(body)["message"]["content"])["echo"], "ciao")
        code, body = self.req("/ollama/api/chat",
                              data=json.dumps({"model": "nope", "messages": [{"role": "user", "content": "x"}]}).encode())
        self.assertEqual(code, 404, "gli errori di Ollama passano intatti")
        self.assertIn(b"not found", body)

    def test_proxy_senza_ollama(self):
        srv = serve.make_server(0, "127.0.0.1:1", self.progress)
        threading.Thread(target=srv.serve_forever, daemon=True).start()
        try:
            r = urllib.request.Request("http://127.0.0.1:%d/ollama/api/tags" % srv.server_port)
            with self.assertRaises(urllib.error.HTTPError) as cm:
                urllib.request.urlopen(r, timeout=5)
            self.assertEqual(cm.exception.code, 502)
            self.assertIn("ollama serve", json.loads(cm.exception.read())["hint"])
        finally:
            srv.shutdown()
            srv.server_close()
            # restore the class-level handler config the other tests rely on
            serve.Handler.ollama = serve.normalise_ollama("127.0.0.1:%d" % self.fake.server_port)
            serve.Handler.progress_path = self.progress

    def test_agente_chat_contro_il_finto(self):
        host = "127.0.0.1:%d" % self.fake.server_port
        self.assertEqual(agente.list_models(host), ["qwen2.5:14b"])
        out = agente.chat([{"role": "user", "content": "prova"}], host=host)
        self.assertEqual(agente.extract_json(out)["echo"], "prova")


if __name__ == "__main__":
    unittest.main(verbosity=1)
