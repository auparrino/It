#!/usr/bin/env python3
"""Servidor local de La Via C1 con los agentes de Ollama.

    python3 tools/serve.py            # http://localhost:8000

Hace tres cosas, todas sin dependencias fuera de la biblioteca estándar:

  1. sirve la carpeta docs/ como cualquier servidor estático;
  2. reenvía /ollama/... a tu Ollama local (por defecto http://127.0.0.1:11434),
     así el navegador nunca choca con CORS ni hay que tocar OLLAMA_ORIGINS;
  3. guarda el progreso del juego en progress.json (GET/PUT /progress), para
     que los agentes de fondo (custode.py, redattore.py) puedan leerlo.

Variables de entorno: OLLAMA_HOST (URL de Ollama), PORT.
"""
import argparse
import json
import os
import sys
import urllib.error
import urllib.request
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCS = os.path.join(ROOT, "docs")
DEFAULT_PROGRESS = os.path.join(ROOT, "progress.json")
DEFAULT_OLLAMA = os.environ.get("OLLAMA_HOST", "http://127.0.0.1:11434")


def normalise_ollama(url: str) -> str:
    url = url.strip().rstrip("/")
    if not url.startswith("http"):
        url = "http://" + url
    return url


class Handler(SimpleHTTPRequestHandler):
    ollama = normalise_ollama(DEFAULT_OLLAMA)
    progress_path = DEFAULT_PROGRESS
    # Las respuestas de un modelo local pueden tardar; un minuto es poco para
    # un 14B en CPU, así que damos margen de sobra.
    timeout = 600

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DOCS, **kwargs)

    # ------------------------------------------------------------ utilidades
    def _send_json(self, code: int, payload) -> None:
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def _read_body(self) -> bytes:
        n = int(self.headers.get("Content-Length") or 0)
        return self.rfile.read(n) if n else b""

    def end_headers(self):
        # Los JSON de datos cambian de noche a la mañana (oggi.json,
        # bank_maestro.json): que el navegador no los cachee.
        if self.path.endswith(".json"):
            self.send_header("Cache-Control", "no-store")
        super().end_headers()

    # ------------------------------------------------------------- progreso
    def _progress_get(self) -> None:
        try:
            with open(self.progress_path, "r", encoding="utf-8") as f:
                data = json.load(f)
        except FileNotFoundError:
            self._send_json(404, {"error": "sin progreso guardado"})
            return
        except (OSError, ValueError) as e:
            self._send_json(500, {"error": str(e)})
            return
        self._send_json(200, data)

    def _progress_put(self) -> None:
        try:
            data = json.loads(self._read_body().decode("utf-8") or "{}")
        except ValueError as e:
            self._send_json(400, {"error": "JSON inválido: %s" % e})
            return
        if not isinstance(data, dict):
            self._send_json(400, {"error": "se esperaba un objeto"})
            return
        tmp = self.progress_path + ".tmp"
        try:
            with open(tmp, "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=1)
            os.replace(tmp, self.progress_path)
        except OSError as e:
            self._send_json(500, {"error": str(e)})
            return
        self._send_json(200, {"ok": True, "savedAt": data.get("savedAt")})

    # --------------------------------------------------------------- ollama
    def _proxy(self, method: str) -> None:
        target = self.ollama + self.path[len("/ollama"):]
        body = self._read_body() if method in ("POST", "PUT") else None
        req = urllib.request.Request(target, data=body, method=method)
        ctype = self.headers.get("Content-Type")
        if ctype:
            req.add_header("Content-Type", ctype)
        try:
            with urllib.request.urlopen(req, timeout=self.timeout) as r:
                payload = r.read()
                self.send_response(r.status)
                self.send_header("Content-Type",
                                 r.headers.get("Content-Type", "application/json"))
                self.send_header("Content-Length", str(len(payload)))
                self.send_header("Cache-Control", "no-store")
                self.end_headers()
                self.wfile.write(payload)
        except urllib.error.HTTPError as e:
            payload = e.read()
            self.send_response(e.code)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(payload)))
            self.end_headers()
            self.wfile.write(payload)
        except (urllib.error.URLError, OSError) as e:
            self._send_json(502, {
                "error": "no pude hablar con Ollama en %s: %s" % (self.ollama, e),
                "hint": "¿está corriendo `ollama serve`?"
            })

    # --------------------------------------------------------------- rutas
    def do_GET(self):
        if self.path == "/progress":
            return self._progress_get()
        if self.path.startswith("/ollama/"):
            return self._proxy("GET")
        return super().do_GET()

    def do_POST(self):
        if self.path == "/progress":
            return self._progress_put()
        if self.path.startswith("/ollama/"):
            return self._proxy("POST")
        self._send_json(404, {"error": "ruta desconocida"})

    def do_PUT(self):
        if self.path == "/progress":
            return self._progress_put()
        if self.path.startswith("/ollama/"):
            return self._proxy("PUT")
        self._send_json(404, {"error": "ruta desconocida"})

    def log_message(self, fmt, *args):
        # Silenciar el ruido de los archivos estáticos; dejar lo interesante.
        if self.path.startswith("/ollama") or self.path == "/progress":
            sys.stderr.write("%s - %s\n" % (self.address_string(), fmt % args))


def make_server(port: int, ollama: str, progress: str) -> ThreadingHTTPServer:
    Handler.ollama = normalise_ollama(ollama)
    Handler.progress_path = progress
    return ThreadingHTTPServer(("127.0.0.1", port), Handler)


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("--port", type=int, default=int(os.environ.get("PORT", 8000)))
    ap.add_argument("--ollama", default=DEFAULT_OLLAMA,
                    help="URL de Ollama (default: %(default)s)")
    ap.add_argument("--progress", default=DEFAULT_PROGRESS,
                    help="archivo donde se guarda el progreso")
    a = ap.parse_args()
    srv = make_server(a.port, a.ollama, a.progress)
    print("La Via C1  →  http://localhost:%d" % a.port)
    print("Ollama     →  %s" % Handler.ollama)
    print("Progreso   →  %s" % a.progress)
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        print("\nciao.")


if __name__ == "__main__":
    main()
