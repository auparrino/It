# Segment «Io non ho paura» (Ammaniti, 2001) into the common format:
#   [{title, intro_s, chapters:[{title, sub, paras:[{s:[[id,text]]}]}]}]
#
#   python3 -I segmentar_ammaniti.py EPUB_DIR SCRATCH      -> SCRATCH/work_paura/book.json
#
# The ePub this was written for is a conversion from print: every printed
# line is its own <p>, words are hyphenated at the line end, chapters are a
# bare «1.», «2.»… line, «E'» stands for «È», «Si» for «Sì», and the closing
# quote of a line of dialogue is lost when it ends the paragraph (or when the
# next line of dialogue follows on the same line). This rebuilds the
# paragraphs and the quotes («…») before cutting sentences.
import re, sys, html, os, json, glob

EPUB, S = sys.argv[1], sys.argv[2]
FULL = 40          # a printed line shorter than this that ends in punctuation ends its paragraph

def clean(x):
    x = re.sub(r'<br\s*/?>', ' ', x)
    return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', '', x))).strip()

def sents(p):
    abbr = r'(?:S|s|ss|cap|pag|p|sec|vol|ecc|cfr|Dr|Sig|fr|ca|lib|n|op|art)'
    q = re.sub(r'\b(' + abbr + r')\.(?=\s)', lambda m: m.group(1) + '․', p)
    q = re.sub(r'\b([A-Z])\.(?=\s?[A-Z])', lambda m: m.group(1) + '․', q)
    q = re.sub(r'(\d)\.(?=\d)', lambda m: m.group(1) + '․', q)
    parts = re.findall(r'.+?(?:[.!?…]+(?:[»«"”’)\]]+)?(?=\s+[«"“(\[—–A-ZÀ-ÖØ-Ý0-9])|$)', q)
    res = []
    for s in (x.strip().replace('․', '.') for x in parts if x.strip()):
        if res and not re.search(r'[A-Za-zÀ-ÿ]{2,}', s): res[-1] += ' ' + s
        else: res.append(s)
    return res

def quotes(p):
    """Straight quotes to «», closing the ones the conversion lost."""
    out, open_ = [], False
    for i, ch in enumerate(p):
        if ch != '"': out.append(ch); continue
        before = p[i - 1] if i else ' '
        after = p[i + 1] if i + 1 < len(p) else ' '
        opening = (before in ' («' or i == 0) and after not in ' ,.;:!?»)'
        if opening:
            if open_:                       # a new line of dialogue: close the previous one
                while out and out[-1] == ' ': out.pop()
                out.append('» ')
            out.append('«'); open_ = True
        elif open_: out.append('»'); open_ = False
        else: out.append('»')               # a stray closing quote; leave it as one
    s = ''.join(out).rstrip()
    if open_: s += '»'
    return s

def fix(p):
    p = re.sub(r'\s*\|+:?\s*', ' ', p)                    # page-break debris
    p = re.sub(r'\s+[;,]$', '', p); p = re.sub(r'^[.;,]\s+', '', p)
    p = re.sub(r"(^|[\s«\"(])E'(?=[\s,.;:!?]|$)", r'\1È', p)
    p = re.sub(r'\bSi(?=[.,!?])', 'Sì', p)
    p = p.replace('...', '…').replace('. . .', '…')
    p = re.sub(r'…(?=[A-Za-zÀ-ÿ«"])', '… ', p)
    return quotes(p)

lines = []
for f in sorted(glob.glob(os.path.join(EPUB, 'index_split_*.xhtml'))):
    t = open(f, encoding='utf-8').read()
    lines += [clean(m.group(1)) for m in re.finditer(r'(?s)<p\b[^>]*>(.*?)</p>', t)]
lines = [l for l in lines if l]
if lines and lines[-1].rstrip('.') == 'FINE': lines.pop()

book = [{'title': 'Io non ho paura', 'intro_s': [], 'chapters': []}]
chap, para = None, ''
def end_para():
    global para
    if para.strip() and chap is not None: chap['paras'].append({'q': False, 't': fix(para.strip())})
    para = ''
for i, l in enumerate(lines):
    m = re.fullmatch(r'(\d{1,2})\.', l)
    if m:
        end_para()
        chap = {'title': 'Capitolo ' + m.group(1), 'sub': '', 'paras': []}
        book[0]['chapters'].append(chap)
        continue
    if para.endswith('-') and re.search(r'[a-zà-ÿ]-$', para) and re.match(r'[a-zà-ÿ]', l):
        para = para[:-1] + l
    else:
        para = (para + ' ' + l) if para else l
    nxt = lines[i + 1] if i + 1 < len(lines) else ''
    ends = re.search(r'[.!?…:;"»)]$', l)
    if (ends and len(l) < FULL) or (ends and nxt[:1] in '"«' and re.search(r'[.!?…:]["»]?$', l)):
        end_para()
end_para()

n = words = 0
for c in book[0]['chapters']:
    for p in c['paras']:
        p['s'] = []
        for s in sents(p['t']):
            n += 1; p['s'].append(['s%05d' % n, s]); words += len(s.split())
        del p['t']
os.makedirs(os.path.join(S, 'work_paura'), exist_ok=True)
json.dump(book, open(os.path.join(S, 'work_paura', 'book.json'), 'w', encoding='utf-8'), ensure_ascii=False)
print('paura sentences', n, 'words', words, 'chapters', len(book[0]['chapters']),
      'paragraphs', sum(len(c['paras']) for c in book[0]['chapters']))
