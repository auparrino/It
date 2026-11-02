import re,sys,html,os,json
d=sys.argv[1]; outdir=sys.argv[2]
opf=open(os.path.join(d,'content.opf'),encoding='utf-8').read()
man={}
for m in re.finditer(r'<item\b[^>]*>',opf):
    a=m.group(0); i=re.search(r'id="([^"]+)"',a); h=re.search(r'href="([^"]+)"',a)
    if i and h: man[i.group(1)]=html.unescape(h.group(1))
spine=re.findall(r'idref="([^"]+)"',opf)
files=[man[s] for s in spine if man[s].endswith('.html')]
files=[f for f in files if re.search(r'split_0(0[1-9]|[1-7]\d|8[0-3])\.html',f)]
BUCH=['ERSTES','ZWEITES','DRITTES','VIERTES','FÜNFTES','SECHSTES','SIEBENTES','ACHTES','NEUNTES']
ABBR=r'(?:z|B|d|h|u|a|o|v|s|Dr|Nr|Str|St|Hr|Fr|Frl|bzw|ca|usw|etc|vgl|Jh|Abt|Pf|Mk|Co|Tel|Pl|geb|gest|Febr|Jan|Aug|Sept|Okt|Nov|Dez|Prof|evtl|ff|resp|Bd|Kap|S|Abs|Art|Nachf|Ges|Fa|Wwe|Ing|Kom|Kriminalkom|Reg|Ass|Mill|Mio|Pfg|RM|Mittw|Sonnt|Sonnab|Montg|Dienst|Donnerst|Freit|ehem|zw|ev|kath|Ch|M|E|G|K|L|P|W|X|Y|A|C|F|H|I|J|N|O|Q|R|T|U|V|Z)'
def sents(p):
    p=re.sub(r'\s+',' ',p).strip()
    # protect abbreviations and numbers like 9. Febr, 1. September
    q=re.sub(r'\b('+ABBR+r')\.',lambda m:m.group(1)+'․',p)
    q=re.sub(r'(\d)\.(?=\s?[A-Za-zÄÖÜäöü\d])',lambda m:m.group(1)+'․',q)
    parts=re.findall(r'.+?(?:[.!?…]+(?:[»«"”’)\]]+)?(?=\s+[»«"„(\[A-ZÄÖÜ0-9–-])|$)',q)
    out=[s.strip().replace('․','.') for s in parts if s.strip()]
    # merge tiny fragments
    res=[]
    for s in out:
        if res and len(s.split())<=1 and not re.search(r'[A-Za-zÄÖÜäöüß]{3,}',s): res[-1]+=' '+s
        else: res.append(s)
    return res
book=[]; cur_buch=None; cur_ch=None
def text(x): 
    x=re.sub(r'<br\s*/?>',' ',x); return html.unescape(re.sub(r'<[^>]+>','',x)).strip()
for f in files:
    t=open(os.path.join(d,f),encoding='utf-8').read()
    body=t[t.find('<body'):]
    for m in re.finditer(r'(?s)<(p|blockquote)\b([^>]*)>(.*?)</\1>',body):
        tag,attr,inner=m.groups(); tx=text(inner)
        if not tx: continue
        bold='class="bold"' in inner and tag=='p' and len(tx)<200 and re.fullmatch(r'(?s)\s*(<[^>]+>\s*)*<span class="bold">.*',inner) is not None
        if bold and tx.split()[0] in BUCH and tx.endswith('BUCH'):
            cur_buch={'title':tx.title().replace('Buch','Buch'),'intro':[],'chapters':[]}; book.append(cur_buch); cur_ch=None; continue
        if cur_buch is None:
            cur_buch={'title':'Vorspruch','intro':[],'chapters':[]}; book.append(cur_buch)
        if tag=='blockquote' and cur_ch is None:
            cur_buch['intro'].append(tx); continue
        if bold:
            cur_ch={'title':tx,'paras':[]}; cur_buch['chapters'].append(cur_ch); continue
        if cur_ch is None:
            cur_ch={'title':'(Vorspruch)' if cur_buch['title']=='Vorspruch' else '(Beginn)','paras':[]}; cur_buch['chapters'].append(cur_ch)
        cur_ch['paras'].append({'q':tag=='blockquote','t':tx})
# number sentences
n=0; tot=0
for bi,b in enumerate(book):
    b['intro_s']=[]
    for p in b['intro']:
        ss=[]
        for s in sents(p): n+=1; ss.append(['s%05d'%n,s])
        b['intro_s'].append(ss)
    for ci,c in enumerate(b['chapters']):
        for p in c['paras']:
            p['s']=[]
            for s in sents(p['t']): n+=1; p['s'].append(['s%05d'%n,s]); tot+=len(s.split())
            del p['t']
    del b['intro']
json.dump(book,open(os.path.join(outdir,'book.json'),'w'),ensure_ascii=False)
print('sentences',n,'words',tot)
for b in book:
    print(b['title'],len(b['chapters']),[ (c['title'][:30],sum(len(p['s']) for p in c['paras'])) for c in b['chapters']][:3])
