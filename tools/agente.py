"""Lo que comparten los agentes de fondo (custode.py, redattore.py).

Leen progress.json (lo escribe tools/serve.py cada vez que jugás) y
docs/data/course.json, y hablan con Ollama por HTTP.  Solo biblioteca estándar.
"""
import datetime as dt
import json
import os
import re
import time
import urllib.error
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCS = os.path.join(ROOT, "docs")
COURSE_PATH = os.path.join(DOCS, "data", "course.json")
PROGRESS_PATH = os.path.join(ROOT, "progress.json")
OLLAMA = os.environ.get("OLLAMA_HOST", "http://127.0.0.1:11434")

DAY_MS = 86400000


# ------------------------------------------------------------------ archivos

def load_json(path, default=None):
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except (OSError, ValueError):
        return default


def save_json(path, data):
    tmp = path + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=1)
    os.replace(tmp, path)


def load_course(path=COURSE_PATH):
    c = load_json(path)
    if not c:
        raise SystemExit("no encuentro el curso en %s (¿corriste build_course.py?)" % path)
    return c


def load_progress(path=PROGRESS_PATH):
    return load_json(path, {}) or {}


# --------------------------------------------------------------------- fechas

def today_str(d=None):
    """Mismo formato que Engine.today() en el navegador: 2026-9-5, sin ceros."""
    d = d or dt.date.today()
    return "%d-%d-%d" % (d.year, d.month, d.day)


def parse_day(s):
    if not s:
        return None
    try:
        y, m, d = [int(x) for x in str(s).split("-")]
        return dt.date(y, m, d)
    except (ValueError, TypeError):
        return None


def days_away(progress, today=None):
    """Días desde la última vez que jugó; None si nunca jugó."""
    last = parse_day(progress.get("lastPlayed"))
    if not last:
        return None
    return max(0, ((today or dt.date.today()) - last).days)


# ------------------------------------------------------------------- progreso

def item_index(course):
    """id -> item, y id -> semana que lo contiene."""
    items = {it["id"]: it for it in course.get("items", [])}
    week_of = {}
    for w in course.get("weeks", []):
        for iid in w.get("items", []):
            week_of.setdefault(iid, w["week"])
    return items, week_of


def due_cards(progress, course, now_ms=None):
    now_ms = now_ms or int(time.time() * 1000)
    items, _ = item_index(course)
    return [iid for iid, c in (progress.get("cards") or {}).items()
            if iid in items and c.get("due") and c["due"] <= now_ms]


def weak_topics(progress, course, limit=3):
    """Semanas donde más se tropieza, por las fichas del SRS.

    Una ficha es débil si su facilidad bajó (ease < 2.2) o si se vio varias
    veces sin sostener una racha (reps == 0 y seen >= 2).  Devuelve
    [(semana, título, n_fichas)] ordenado por n descendente.
    """
    items, week_of = item_index(course)
    titles = {w["week"]: w["title"] for w in course.get("weeks", [])}
    count = {}
    for iid, c in (progress.get("cards") or {}).items():
        if iid not in items:
            continue
        weak = c.get("ease", 2.5) < 2.2 or (c.get("reps", 0) == 0 and c.get("seen", 0) >= 2)
        if not weak:
            continue
        w = week_of.get(iid) or items[iid].get("week")
        if w:
            count[w] = count.get(w, 0) + 1
    ranked = sorted(count.items(), key=lambda kv: (-kv[1], kv[0]))
    return [(w, titles.get(w, "settimana %d" % w), n) for w, n in ranked[:limit]]


def current_week(progress, course):
    n = int(progress.get("unlocked") or 1)
    n = max(1, min(len(course.get("weeks", [])) or 52, n))
    return course["weeks"][n - 1]


def lesson_context(week, limit=2000):
    """Mismo resumen que Tutor.weekContext en el navegador."""
    lines = ["Semana %d (%s): %s" % (week["week"], week.get("level", ""), week["title"]),
             "Foco: " + week.get("focus", "")]
    lines += ["- " + k for k in week.get("keys", [])]
    for b in (week.get("lesson") or {}).get("blocks", []):
        if b.get("warn"):
            lines.append("Trampa (%s): %s" % (b.get("h", ""), b["warn"].replace("*", "")))
        if b.get("tip"):
            lines.append("Atajo (%s): %s" % (b.get("h", ""), b["tip"].replace("*", "")))
    return "\n".join(lines)[:limit]


# --------------------------------------------------------------------- ollama

def _host(host):
    host = (host or OLLAMA).strip().rstrip("/")
    return host if host.startswith("http") else "http://" + host


def list_models(host=None, timeout=10):
    req = urllib.request.Request(_host(host) + "/api/tags")
    with urllib.request.urlopen(req, timeout=timeout) as r:
        data = json.loads(r.read().decode("utf-8"))
    return [m["name"] for m in data.get("models", [])]


_PREFS = [r"qwen.*(14|32)b", r"gemma.*(12|27)b", r"qwen", r"gemma", r"llama3", r"mistral", r"."]


def pick_model(models):
    for p in _PREFS:
        for m in models:
            if re.search(p, m, re.I) and "embed" not in m.lower():
                return m
    return ""


def chat(messages, model=None, schema=None, temperature=0.3, host=None, timeout=600):
    """Una llamada a /api/chat sin streaming; devuelve el texto de la respuesta."""
    if not model:
        model = pick_model(list_models(host))
        if not model:
            raise RuntimeError("Ollama no tiene modelos: `ollama pull qwen2.5:14b`")
    body = {"model": model, "messages": messages, "stream": False,
            "options": {"temperature": temperature}}
    if schema:
        body["format"] = schema
    req = urllib.request.Request(
        _host(host) + "/api/chat", data=json.dumps(body).encode("utf-8"),
        headers={"Content-Type": "application/json"}, method="POST")
    with urllib.request.urlopen(req, timeout=timeout) as r:
        data = json.loads(r.read().decode("utf-8"))
    return (data.get("message") or {}).get("content", "")


def extract_json(text):
    """Los modelos chicos a veces envuelven el JSON en prosa o en ```."""
    t = text.strip()
    try:
        return json.loads(t)
    except ValueError:
        pass
    m = re.search(r"```(?:json)?\s*([\s\S]*?)```", t, re.I)
    if m:
        try:
            return json.loads(m.group(1).strip())
        except ValueError:
            pass
    a, b = t.find("{"), t.rfind("}")
    if a >= 0 and b > a:
        return json.loads(t[a:b + 1])
    raise ValueError("el modelo no devolvió JSON")


PERSONA = ("Sos Il Maestro, un profesor de italiano para hispanohablantes rioplatenses. "
           "Explicás en español, tuteando con «vos», breve y concreto. Cuando corregís, "
           "señalás la interferencia del castellano si la hay. Nunca inventás reglas.")
