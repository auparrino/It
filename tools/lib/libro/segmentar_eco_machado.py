# Segment rosa / bras into the common format: [{title, intro_s, chapters:[{title, sub, paras:[{q, s:[[id,text]]}]}]}]
import re,sys,html,os,json
which=sys.argv[1]; S=sys.argv[2]
def clean(x):
    x=re.sub(r'(?s)<sup\b.*?</sup>','',x); x=re.sub(r'<br\s*/?>',' ',x)
    return re.sub(r'\s+',' ',html.unescape(re.sub(r'<[^>]+>','',x))).strip()
ABBR={'it':r'(?:S|s|ss|cap|pag|p|sec|vol|ecc|cfr|Dr|Sig|fr|ca|lib|n|op|art)','pt':r'(?:D|Dr|Sr|Sra|V|S|Exa|Exma|Revma|cap|pág|p|Mme|Mlle|vol|etc|Ilmo|Exmo|Pe|Fr|n|lib|art|cf)'}
def sents(p,lang):
    q=re.sub(r'\b('+ABBR[lang]+r')\.(?=\s)',lambda m:m.group(1)+'․',p)
    q=re.sub(r'\b([A-Z])\.(?=\s?[A-Z])',lambda m:m.group(1)+'․',q)
    q=re.sub(r'(\d)\.(?=\d)',lambda m:m.group(1)+'․',q)
    q=q.replace('. . .','…')
    parts=re.findall(r'.+?(?:[.!?…]+(?:[»«"”’)\]]+)?(?=\s+[«"“(\[—–A-ZÀ-ÖØ-Ý0-9])|$)',q)
    out=[s.strip().replace('․','.') for s in parts if s.strip()]
    res=[]
    for s in out:
        if res and not re.search(r'[A-Za-zÀ-ÿ]{2,}',s): res[-1]+=' '+s
        else: res.append(s)
    return res
book=[]
if which=='rosa':
    lang='it'; D=os.path.join(S,'epub_rosa/x/OEBPS/Text')
    files=['_0050_testo_%02d.xhtml'%i for i in list(range(0,2))+[3]+list(range(5,61)) if i not in (12,21,29,39,46,56,59)]
    cur=None
    for f in files:
        t=open(os.path.join(D,f),encoding='utf-8').read(); body=t[t.find('<body'):]
        heads=[(m.group(2),clean(m.group(3))) for m in re.finditer(r'(?s)<h([12])\b[^>]*class="([^"]*)"[^>]*>(.*?)</h\1>',body)]
        num=[h for c,h in heads if c=='num-capitolo']; tit=[h for c,h in heads if c.startswith('titolo')]
        sub=' '.join(h for c,h in heads if c in('trama','sottotitolo'))
        part=num[0] if num else ('Prologo' if f.endswith('_03.xhtml') else 'Ultimo folio' if f.endswith('_60.xhtml') else 'Introduzione')
        if not cur or cur['title']!=part:
            cur={'title':part,'intro_s':[],'chapters':[]}; book.append(cur)
        ch={'title':(tit[0].capitalize() if tit else part) if num else (tit[0] if tit else part),'sub':sub,'paras':[]}
        for m in re.finditer(r'(?s)<p\b[^>]*>(.*?)</p>',body):
            tx=clean(m.group(1))
            if tx: ch['paras'].append({'q':False,'t':tx})
        if f.endswith('_03.xhtml') or f.endswith('_60.xhtml'): ch['title']=part
        cur['chapters'].append(ch)
else:
    lang='pt'; D=os.path.join(S,'epub_bras/x/text')
    files=['part%04d.html'%i for i in range(6,169)]
    cur={'title':'Memórias póstumas de Brás Cubas','intro_s':[],'chapters':[]}; book.append(cur)
    for f in files:
        t=open(os.path.join(D,f),encoding='utf-8').read(); body=t[t.find('<body'):]
        h=re.search(r'(?s)<h1\b[^>]*>(.*?)</h1>',body)
        title=clean(h.group(1)) if h else ''
        if h:
            sc=re.search(r'(?s)<small class="sc">(.*?)</small>',h.group(1))
            if sc: title=clean(sc.group(1))+'. '+clean(h.group(1).replace(sc.group(0),''))
        ch={'title':title or 'Dedicatória','sub':'','paras':[]}
        for m in re.finditer(r'(?s)<p\b([^>]*)>(.*?)</p>',body):
            if 'class="bio"' in m.group(1): continue
            tx=clean(m.group(2))
            if tx and re.search(r'[A-Za-zÀ-ÿ]',tx): ch['paras'].append({'q':False,'t':tx})
        cur['chapters'].append(ch)
n=0; words=0
for b in book:
    for c in b['chapters']:
        for p in c['paras']:
            p['s']=[]
            for s in sents(p['t'],lang): n+=1; p['s'].append(['s%05d'%n,s]); words+=len(s.split())
            del p['t']
json.dump(book,open(os.path.join(S,'work_'+which,'book.json'),'w'),ensure_ascii=False)
print(which,'sentences',n,'words',words)
for b in book: print(' ',b['title'],len(b['chapters']),[c['title'][:25] for c in b['chapters']][:4])
