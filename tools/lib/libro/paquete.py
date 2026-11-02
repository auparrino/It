"""Arma el paquete de un libro para la Lectura guiada (docs/js/libro.js).

    python3 tools/lib/libro/paquete.py WORK META.json SALIDA.json

WORK es la carpeta de trabajo de un libro: book.json (el texto partido en
partes, capítulos, párrafos y oraciones numeradas, lo arman segmentar_*.py
desde el ePub del alumno), chunks.json (los tramos) y out/cNNN.json (la
explicación de cada tramo, que escriben los agentes con INSTRUCCIONES.md).
META.json: {id, lang, title, author, year, credit}.

El paquete lleva el texto del libro: es para el teléfono del alumno, no
para el repositorio ni para la app publicada.
"""
import json, os, sys

def main(work, meta_path, dest):
    book = json.load(open(os.path.join(work, 'book.json'), encoding='utf-8'))
    chunks = json.load(open(os.path.join(work, 'chunks.json'), encoding='utf-8'))
    meta = json.load(open(meta_path, encoding='utf-8'))
    # every sentence, in order, with its part, chapter and paragraph
    seq = []
    pi = 0
    for B in book:
        for ss in B.get('intro_s', []):
            pi += 1
            for s in ss: seq.append((B['title'], 'Vorspann' if meta['lang'] == 'de' else B['title'], '', pi, s))
        for c in B['chapters']:
            for p in c['paras']:
                pi += 1
                for s in p['s']: seq.append((B['title'], c['title'], c.get('sub', ''), pi, s))
    where = {x[4][0]: x for x in seq}
    S, tramos, parts, missing = {}, [], [], []
    for k, ch in enumerate(chunks):
        out_path = os.path.join(work, 'out', ch['id'] + '.json')
        out = json.load(open(out_path, encoding='utf-8')) if os.path.exists(out_path) else {}
        if not out: missing.append(ch['id'])
        ex = out.get('s', {})
        p, last_ch, last_p = [], None, None
        for sid in ch['ids']:
            part, chap, sub, para, s = where[sid]
            if chap != last_ch:
                p.append({'h': chap, 'sub': sub}); last_ch = chap; last_p = None
            if para != last_p:
                p.append([]); last_p = para
            p[-1].append(sid)
            e = ex.get(sid, {})
            S[sid] = {'t': s[1], 'es': e.get('es', ''), 'g': e.get('g') or [], 'n': e.get('n', ''),
                      'std': e.get('std', ''), 'lit': e.get('lit', '')}
            S[sid] = {kk: v for kk, v in S[sid].items() if v not in ('', [], None) or kk in ('t', 'es')}
        part = where[ch['ids'][0]][0]
        tramos.append({'id': ch['id'], 'part': part, 'p': p, 'resumen': out.get('resumen', ''), 'contexto': out.get('contexto', ''),
                       'vocab': out.get('vocab', []), 'gramatica': out.get('gramatica', []), 'preguntas': out.get('preguntas', [])})
        if not parts or parts[-1]['t'] != part: parts.append({'t': part, 'tr': []})
        parts[-1]['tr'].append(k)
    pack = dict(app='c1-libro', v=1, parts=parts, tramos=tramos, s=S, **meta)
    with open(dest, 'w', encoding='utf-8') as f: json.dump(pack, f, ensure_ascii=False, separators=(',', ':'))
    print('%s: %d tramos, %d oraciones, %.1f MB%s' % (meta['id'], len(tramos), len(S), os.path.getsize(dest) / 1e6,
          ('  ⚠️ sin explicar: ' + ' '.join(missing)) if missing else ''))

if __name__ == '__main__':
    main(*sys.argv[1:4])
