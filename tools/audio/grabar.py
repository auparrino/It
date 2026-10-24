# -*- coding: utf-8 -*-
"""Los audios grabados con Piper (TTS neuronal, corre local): la radio, el
tramo, los diálogos del examen, las escenas de trabajo y los ejercicios de
escuchar y de dictado del curso, para que no dependan de la voz del teléfono.

    python3 -m venv /tmp/piper && /tmp/piper/bin/pip install piper-tts
    /tmp/piper/bin/python tools/audio/grabar.py [it pt de] [--solo-listar]

Las voces se bajan solas a PIPER_VOICES (por defecto ~/.cache/piper-voices)
desde huggingface.co/rhasspy/piper-voices.  Necesita ffmpeg.

Cada audio es docs/lang/<código>/audio/piper/<clave>.mp3 (MP3 mono de 32
kbps): la clave sale del texto y de la voz (Voces.key de docs/js/voces.js,
la misma cuenta).  Un hablante de un diálogo tiene su lugar: su género y su
orden entre los de ese género («f1», «f2», «m1»…: Voces.slots, con el
«sexes» de los datos); una frase suelta, ninguno («»).  El manifiesto
docs/lang/<código>/audio_data.js (window.AUDIO_DATA) dice qué claves hay; la
app (speak en app.js) toca el archivo si está y si no usa la voz del
teléfono.  Por eso, si cambia un texto, la app sigue andando: ese turno
vuelve a la voz del teléfono hasta que se corra este script de nuevo.

Solo se generan los audios que faltan; los que ya no corresponden a ningún
texto se borran.  Ni el build ni el CI lo corren (no tienen Piper):
tools/lib/test_audio.js controla que el manifiesto y los archivos coincidan
y avisa cuántos textos esperan su audio.
"""
import json
import os
import subprocess
import sys
import tempfile
import unicodedata
import urllib.request
import wave

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
DOCS = os.path.join(ROOT, "docs")
HF = "https://huggingface.co/rhasspy/piper-voices/resolve/main/"
CACHE = os.environ.get("PIPER_VOICES", os.path.expanduser("~/.cache/piper-voices"))

# Las voces de Piper por idioma y lugar: (modelo, altura).  Piper no tiene
# voz de mujer en portugués de Brasil: las mujeres usan otra voz de hombre,
# un poco más aguda, para que por lo menos se distingan.  Las licencias (para
# los créditos de la app) van en CREDITS.
VOICES = {
    "it": {"": ("it_IT-paola-medium", 1.0),
           "f1": ("it_IT-paola-medium", 1.0), "f2": ("it_IT-serena-medium", 1.0), "f3": ("it_IT-paola-medium", 1.1),
           "m1": ("it_IT-riccardo-x_low", 1.0), "m2": ("it_IT-riccardo-x_low", 0.92), "m3": ("it_IT-riccardo-x_low", 1.08)},
    "pt": {"": ("pt_BR-faber-medium", 1.0),
           "m1": ("pt_BR-faber-medium", 1.0), "m2": ("pt_BR-cadu-medium", 1.0), "m3": ("pt_BR-jeff-medium", 1.0),
           "f1": ("pt_BR-jeff-medium", 1.12), "f2": ("pt_BR-cadu-medium", 1.12), "f3": ("pt_BR-faber-medium", 1.12)},
    "de": {"": ("de_DE-thorsten-medium", 1.0),
           "m1": ("de_DE-thorsten-medium", 1.0), "m2": ("de_DE-thorsten-medium", 0.92), "m3": ("de_DE-thorsten-medium", 1.08),
           "f1": ("de_DE-kerstin-low", 1.0), "f2": ("de_DE-kerstin-low", 1.1), "f3": ("de_DE-kerstin-low", 0.94)},
}
CREDITS = {
    "it_IT-paola-medium": "Paola (Piper, datos CC0)",
    "it_IT-serena-medium": "Serena (Piper, datos CC BY 4.0, committa/serena-synthetic-it)",
    "it_IT-riccardo-x_low": "Riccardo (Piper, datos M-AILABS)",
    "pt_BR-faber-medium": "Faber (Piper, CC0)",
    "pt_BR-cadu-medium": "Cadu (Piper, CC0)",
    "pt_BR-jeff-medium": "Jeff (Piper, CC0)",
    "de_DE-thorsten-medium": "Thorsten (Piper, Thorsten-Voice, CC0)",
    "de_DE-kerstin-low": "Kerstin (Piper, CC0)",
}


# --------------------------------------------------------------- la clave
def norm(text):
    s = str(text if text is not None else "")
    while "_" in s:
        s = s.replace("_", " ")
    s = unicodedata.normalize("NFC", s)
    return " ".join(s.split())


def _fnv(s, h):
    for u in _utf16(s):
        h ^= u
        h = (h * 16777619) & 0xFFFFFFFF
    return "%08x" % h


def _utf16(s):
    b = s.encode("utf-16-le")
    return [b[i] | (b[i + 1] << 8) for i in range(0, len(b), 2)]


def key(text, slot=""):
    s = (slot or "") + "|" + norm(text)
    return _fnv(s, 2166136261) + _fnv(s, 3735928559)


def slots(sexes, n):
    seen, out = {"f": 0, "m": 0}, []
    sexes = sexes or []
    for k in range(max(n, len(sexes))):
        s = sexes[k] if k < len(sexes) and sexes[k] in ("f", "m") else ("f" if k % 2 else "m")
        seen[s] += 1
        out.append(s + str(seen[s]))
    return out


# ---------------------------------------------------------- qué se graba
def _who(letter):
    c = ord(str(letter or "A")[0]) - 65
    return c if 0 <= c < 26 else 0


def _dialog(jobs, turns, sexes):
    n = max([_who(t[0]) for t in turns] + [0]) + 1
    sl = slots(sexes, n)
    for t in turns:
        jobs.append((sl[_who(t[0])], t[1]))


def _mono(jobs, text, voice):
    slot = "f1" if voice == 1 else "m1"
    for p in (text if isinstance(text, list) else str(text or "").split("\n")):
        if str(p).strip():
            jobs.append((slot, p))


def _js(path, expr):
    """Un dato de un .js de docs/lang (window.X) como JSON, con node."""
    code = ("global.window={};global.self=window;require(%s);process.stdout.write(JSON.stringify(%s)||'null')"
            % (json.dumps(path), expr))
    out = subprocess.run(["node", "-e", code], capture_output=True, text=True, check=True).stdout
    return json.loads(out)


def _walk_dialogs(jobs, o):
    """Los diálogos (turns + sexes) y los monólogos (voice + text) de un dato."""
    if isinstance(o, list):
        for x in o:
            _walk_dialogs(jobs, x)
    elif isinstance(o, dict):
        if isinstance(o.get("turns"), list) and o["turns"] and isinstance(o["turns"][0], list):
            _dialog(jobs, o["turns"], o.get("sexes"))
        elif o.get("voice") in (0, 1) and o.get("text"):
            _mono(jobs, o["text"], o["voice"])
        for k, v in o.items():
            if k not in ("turns", "text"):
                _walk_dialogs(jobs, v)


def collect(lang):
    jobs = []
    for sub in ("radio", "tramo"):
        d = os.path.join(ROOT, "tools", lang, sub)
        if os.path.isdir(d):
            for fn in sorted(os.listdir(d)):
                if fn.startswith("w") and fn.endswith(".json"):
                    _walk_dialogs(jobs, json.load(open(os.path.join(d, fn), encoding="utf-8")))
    es = os.path.join(DOCS, "lang", lang, "esame_data.js")
    if os.path.exists(es):
        _walk_dialogs(jobs, _js(es, "window.EsameData"))
    tr = os.path.join(DOCS, "lang", lang, "trabajo_data.js")
    if os.path.exists(tr):
        t = _js(tr, "window.TRABAJO_DATA")
        sx = t.get("sexes") or {}
        for s in t.get("SCENES", []):
            seen = []
            for d in s.get("dialogo", []):
                if d[0] not in seen:
                    seen.append(d[0])
            sl = slots([sx.get(n) for n in seen], len(seen))
            for d in s.get("dialogo", []):
                jobs.append((sl[seen.index(d[0])], d[1]))
    course = json.load(open(os.path.join(DOCS, "lang", lang, "data", "course.json"), encoding="utf-8"))
    for it in course.get("items", []):
        if it.get("type") == "listen" and not it.get("parts"):
            jobs.append(("", it.get("stem")))
        elif it.get("type") == "dictation":
            jobs.append(("", it.get("answer")))
    out, seen = [], set()
    for slot, text in jobs:
        t = norm(text)
        k = key(t, slot)
        if t and k not in seen:
            seen.add(k)
            out.append((k, slot, t))
    return out


# ---------------------------------------------------------------- Piper
_loaded = {}


def voice(name):
    if name not in _loaded:
        from piper import PiperVoice
        os.makedirs(CACHE, exist_ok=True)
        lang, rest = name.split("-", 1)
        spk, q = rest.rsplit("-", 1)
        for ext in (".onnx", ".onnx.json"):
            p = os.path.join(CACHE, name + ext)
            if not os.path.exists(p):
                url = HF + "%s/%s/%s/%s/%s%s" % (lang.split("_")[0], lang, spk, q, name, ext)
                print("bajando", url)
                urllib.request.urlretrieve(url, p)
        _loaded[name] = PiperVoice.load(os.path.join(CACHE, name + ".onnx"))
    return _loaded[name]


def render(slot_voice, text, out):
    name, pitch = slot_voice
    v = voice(name)
    with tempfile.NamedTemporaryFile(suffix=".wav") as tmp:
        with wave.open(tmp.name, "wb") as w:
            v.synthesize_wav(text, w)
        sr = v.config.sample_rate
        af = "apad=pad_dur=0.25"
        if pitch != 1.0:
            af = "asetrate=%d,aresample=%d,atempo=%.4f,%s" % (int(sr * pitch), sr, 1 / pitch, af)
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", tmp.name, "-af", af,
                        "-ac", "1", "-ar", "22050", "-b:a", "32k", out], check=True)


def manifest(lang, keys, used):
    path = os.path.join(DOCS, "lang", lang, "audio_data.js")
    keys = sorted(keys)
    lines = [
        "/*",
        " * Los audios grabados con Piper (TTS neuronal): " + str(len(keys)) + " archivos en",
        " * audio/piper/<clave>.mp3.  Lo escribe tools/audio/grabar.py; no editar a mano.",
        " * app.js (speak) toca el archivo de la clave (Voces.key) si está, y si no",
        " * usa la voz del teléfono.  credits: las voces, para el perfil.",
        " */",
        "window.AUDIO_DATA = {",
        '  dir: "audio/piper/",',
        "  credits: " + json.dumps([CREDITS[v] for v in sorted(used)], ensure_ascii=False) + ",",
        '  have: "' + " ".join(keys) + '"',
        "};",
        "",
    ]
    open(path, "w", encoding="utf-8").write("\n".join(lines))


def main(args):
    langs = [a for a in args if a in VOICES] or list(VOICES)
    only_list = "--solo-listar" in args
    for lang in langs:
        jobs = collect(lang)
        d = os.path.join(DOCS, "lang", lang, "audio", "piper")
        os.makedirs(d, exist_ok=True)
        have = {f[:-4] for f in os.listdir(d) if f.endswith(".mp3")}
        todo = [j for j in jobs if j[0] not in have]
        print("%s: %d textos, %d ya grabados, %d por grabar" % (lang, len(jobs), len(jobs) - len(todo), len(todo)))
        if only_list:
            continue
        for i, (k, slot, text) in enumerate(todo):
            render(VOICES[lang][slot if slot in VOICES[lang] else ""], text, os.path.join(d, k + ".mp3"))
            if (i + 1) % 100 == 0:
                print("  %s: %d / %d" % (lang, i + 1, len(todo)))
        keep = {j[0] for j in jobs}
        for k in have - keep:
            os.remove(os.path.join(d, k + ".mp3"))
        used = {VOICES[lang][s if s in VOICES[lang] else ""][0] for _, s, _ in jobs}
        manifest(lang, keep, used)


if __name__ == "__main__":
    main(sys.argv[1:])
