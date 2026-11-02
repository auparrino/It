import json,sys,os
S=sys.argv[1]; MAXW=1500; MAXS=120
for key,lang in [('bal','de'),('rosa','it'),('bras','pt')]:
    W=os.path.join(S,'work_'+key); b=json.load(open(W+'/book.json'))
    os.makedirs(W+'/chunks',exist_ok=True); os.makedirs(W+'/out',exist_ok=True)
    chunks=[]; cur=None; w=0
    def flush():
        global cur
    seq=[]
    for B in b:
        if B.get('intro_s'):
            for ss in B['intro_s']:
                for s in ss: seq.append((B['title'],'Vorspann / introducción de '+B['title'],'',s))
        for c in B['chapters']:
            for p in c['paras']:
                for s in p['s']: seq.append((B['title'],c['title'],c.get('sub',''),s))
    for part,chap,sub,s in seq:
        n=len(s[1].split())
        newpart = cur is not None and cur['part']!=part and w>600
        newch = cur is not None and chap!=cur['chs'][-1][0] and w>MAXW*0.8
        if cur is None or w+n>MAXW*1.15 or len(cur['s'])>=MAXS or newpart or newch:
            if cur is None or not (w<300 and not newpart):
                cur={'id':'c%03d'%(len(chunks)+1),'part':part,'chs':[],'s':[]}; chunks.append(cur); w=0
        if not cur['chs'] or cur['chs'][-1][0]!=chap: cur['chs'].append([chap,sub,s[0]])
        cur['s'].append(s); w+=n
    allS=[s for B in b for ss in B.get('intro_s',[]) for s in ss]+[s for B in b for c in B['chapters'] for p in c['paras'] for s in p['s']]
    for i,c in enumerate(chunks):
        first=c['s'][0][0]; idx=[x[0] for x in allS].index(first)
        prev=allS[max(0,idx-3):idx]
        with open(W+'/chunks/%s.txt'%c['id'],'w') as f:
            f.write('PARTE: %s\n'%c['part'])
            if prev: f.write('\nCONTEXTO (oraciones anteriores, NO las expliques):\n'+'\n'.join(p[1] for p in prev)+'\n')
            f.write('\nORACIONES A EXPLICAR (%d):\n'%len(c['s']))
            starts={x[2]:x for x in c['chs']}
            for s in c['s']:
                if s[0] in starts: f.write('\n=== CAPÍTULO: %s%s ===\n'%(starts[s[0]][0],(' — '+starts[s[0]][1]) if starts[s[0]][1] else ''))
                f.write('[%s] %s\n'%(s[0],s[1]))
    json.dump([{k:v for k,v in c.items() if k!='s'}|{'ids':[s[0] for s in c['s']]} for c in chunks],open(W+'/chunks.json','w'),ensure_ascii=False)
    print(key,len(chunks),'chunks', max(len(c['s']) for c in chunks), max(sum(len(x[1].split()) for x in c['s']) for c in chunks))
