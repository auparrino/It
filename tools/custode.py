#!/usr/bin/env python3
"""Il Custode: el agente que te trae de vuelta.

Mira progress.json, calcula cuánto hace que no jugás y arma el plan del día en
docs/data/oggi.json, que el juego muestra arriba del percorso.  La regla es
simple y es la contraria a la de la culpa: cuanto más faltaste, más chico es
el plan.  Volver tiene que costar tres preguntas, no una hora.

    python3 tools/custode.py            # escribe docs/data/oggi.json
    python3 tools/custode.py --notify   # además avisa por el sistema
    python3 tools/custode.py --no-llm   # sin Ollama, mensaje de plantilla

Programalo una vez por día (cron, launchd, Programador de tareas): ver README.
"""
import argparse
import datetime as dt
import os
import random
import shutil
import subprocess
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import agente  # noqa: E402

OUT_PATH = os.path.join(agente.DOCS, "data", "oggi.json")
GIORNI = ["lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato", "domenica"]


def make_plan(progress, course, today=None, now_ms=None):
    """Plan puro, sin red: {date, mode, daysAway, plan[], weak[], week}."""
    today = today or dt.date.today()
    away = agente.days_away(progress, today)
    due = len(agente.due_cards(progress, course, now_ms))
    week = agente.current_week(progress, course)
    n = week["week"]
    weak = agente.weak_topics(progress, course, limit=3)
    read = (progress.get("read") or {}).get(str(n)) or (progress.get("read") or {}).get(n)
    plan = []

    if away is None:
        mode = "inizio"
        plan.append(dict(kind="teoria", week=n, label="Leer la teoría de la semana 1"))
        plan.append(dict(kind="round", week=n, size=8, label="Primera ronda (8 preguntas)"))
    elif away >= 7:
        mode = "rientro"
        # One tiny thing.  Re-entry has to be almost free.
        if due:
            plan.append(dict(kind="review", size=min(5, due), label="Solo %d fichas" % min(5, due)))
        else:
            plan.append(dict(kind="round", week=n, size=5, label="Solo 5 preguntas"))
    elif away >= 3:
        mode = "ripresa"
        if due:
            plan.append(dict(kind="review", size=min(8, due), label="Repaso corto (%d)" % min(8, due)))
        else:
            plan.append(dict(kind="round", week=n, size=8, label="Ronda corta (8)"))
        if week.get("lesson") and not read:
            plan.append(dict(kind="teoria", week=n, label="Releer la teoría"))
        else:
            plan.append(dict(kind="gym", week=n, size=8, label="Gimnasio (8 verbos)"))
    else:
        mode = "normale"
        if due:
            plan.append(dict(kind="review", size=min(15, due), label="Repaso (%d fichas)" % min(15, due)))
        if week.get("lesson") and not read:
            plan.append(dict(kind="teoria", week=n, label="Teoría de la semana %d" % n))
        plan.append(dict(kind="round", week=n,
                         label=("Boss de la semana %d" if week.get("boss") else "Ronda de la semana %d") % n))
        # Production every day, alternating writing and conversation.
        if today.toordinal() % 2:
            plan.append(dict(kind="scrittura", week=n, label="Escribir 5 frases"))
        else:
            plan.append(dict(kind="compagno", week=n, label="Charlar con il Compagno"))
        # A Soluzioni challenge if none was done in the last week.
        last_chal = max([c.get("at", 0) for c in (progress.get("challengeLog") or {}).values()] or [0])
        now = now_ms or int(dt.datetime.now().timestamp() * 1000)
        if week.get("challenges") and now - last_chal > 7 * agente.DAY_MS:
            plan.append(dict(kind="sfide", week=n, label="Una sfida del Soluzioni"))

    return dict(date=agente.today_str(today), mode=mode, daysAway=away, due=due,
                week=n, weekTitle=week["title"], streak=progress.get("streak", 0),
                plan=plan, weak=[t for _, t, _ in weak],
                title="Oggi, %s %d" % (GIORNI[today.weekday()], today.day))


FALLBACK = {
    "inizio": ["Primer día. Nada de heroísmos: leé la teoría y jugá una ronda corta. Cominciamo."],
    "rientro": ["Pasaron %(away)d días. No importa. Hoy son %(n)s y listo; el resto vuelve solo. Piano piano.",
                "Volver cuesta tres minutos, no una hora. Hacé lo de hoy y cerrá la app. Bentornato."],
    "ripresa": ["Unos días afuera. Repaso corto para desempolvar y seguimos. Andiamo.",
                "Ni castigo ni maratón: dos cosas chicas hoy y la racha vuelve a arrancar."],
    "normale": ["Racha de %(streak)d. Hoy: repaso, la ronda de «%(title)s» y un poco de producción. Forza.",
                "Semana %(week)d, «%(title)s». El plan de hoy entra en 20 minutos. Dai."],
}


def fallback_message(p):
    first = p["plan"][0]["label"].lower() if p["plan"] else "unas preguntas"
    tpl = random.choice(FALLBACK[p["mode"]])
    return tpl % dict(away=p["daysAway"] or 0, n=first, streak=p["streak"],
                      title=p["weekTitle"], week=p["week"])


def llm_message(p, model=None, host=None):
    weak = ", ".join(p["weak"]) if p["weak"] else "nada en particular"
    plan = "; ".join(x["label"] for x in p["plan"])
    msgs = [
        {"role": "system", "content": agente.PERSONA},
        {"role": "user", "content":
            "Escribí el mensaje del día para el estudiante. Datos: hace %s días que no juega "
            "(None = primer día); racha %d; semana %d «%s»; temas flojos: %s; plan de hoy: %s.\n"
            "Reglas: dos o tres frases en español rioplatense, sin culpa ni sermón, tono de "
            "amigo que entrena con vos. Si faltó muchos días, insistí en que el plan es "
            "chico a propósito. Mencioná una cosa del plan. Cerrá con una expresión corta en "
            "italiano. Sin emojis, sin encabezados, solo el mensaje."
            % (p["daysAway"], p["streak"], p["week"], p["weekTitle"], weak, plan)},
    ]
    text = agente.chat(msgs, model=model, host=host, temperature=0.8, timeout=180).strip()
    return text[:600] if text else None


def notify(title, body):
    """Aviso del sistema, si hay con qué.  Best effort."""
    try:
        if shutil.which("notify-send"):
            subprocess.run(["notify-send", title, body], check=False)
        elif shutil.which("osascript"):
            subprocess.run(["osascript", "-e",
                            'display notification "%s" with title "%s"'
                            % (body.replace('"', "'"), title)], check=False)
        elif shutil.which("powershell"):
            ps = ("[reflection.assembly]::loadwithpartialname('System.Windows.Forms');"
                  "$n=New-Object System.Windows.Forms.NotifyIcon;"
                  "$n.Icon=[System.Drawing.SystemIcons]::Information;$n.Visible=$true;"
                  "$n.ShowBalloonTip(10000,'%s','%s',[System.Windows.Forms.ToolTipIcon]::None)"
                  % (title.replace("'", ""), body.replace("'", "")))
            subprocess.run(["powershell", "-NoProfile", "-Command", ps], check=False)
    except OSError:
        pass


def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("--progress", default=agente.PROGRESS_PATH)
    ap.add_argument("--course", default=agente.COURSE_PATH)
    ap.add_argument("--out", default=OUT_PATH)
    ap.add_argument("--model", default=os.environ.get("MAESTRO_MODEL"))
    ap.add_argument("--ollama", default=agente.OLLAMA)
    ap.add_argument("--no-llm", action="store_true", help="mensaje de plantilla, sin Ollama")
    ap.add_argument("--notify", action="store_true", help="aviso del sistema")
    a = ap.parse_args()

    course = agente.load_course(a.course)
    progress = agente.load_progress(a.progress)
    p = make_plan(progress, course)

    msg = None
    if not a.no_llm:
        try:
            msg = llm_message(p, model=a.model, host=a.ollama)
        except Exception as e:  # sin Ollama el custode igual cumple
            print("(Ollama no disponible: %s)" % e, file=sys.stderr)
    p["message"] = msg or fallback_message(p)
    p["generatedAt"] = dt.datetime.now().isoformat(timespec="seconds")

    agente.save_json(a.out, p)
    print("%s · %s · %d días fuera · %d fichas vencidas" %
          (p["title"], p["mode"], p["daysAway"] or 0, p["due"]))
    print(p["message"])
    for x in p["plan"]:
        print("  -", x["label"])
    if a.notify:
        notify("La Via C1 — " + p["title"], p["message"])


if __name__ == "__main__":
    main()
