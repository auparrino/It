import json,re,sys
chunk,out=sys.argv[1],sys.argv[2]
ids=re.findall(r'^\[(s\d{5})\]',open(chunk,encoding='utf-8').read(),re.M)
try: d=json.load(open(out,encoding='utf-8'))
except Exception as e: print('JSON ROTO:',e); sys.exit(1)
errs=[]
for k in ['resumen','vocab','gramatica','preguntas','s']:
    if k not in d: errs.append('falta el campo '+k)
s=d.get('s',{})
miss=[i for i in ids if i not in s or not str((s.get(i) or {}).get('es','')).strip()]
extra=[i for i in s if i not in ids]
if miss: errs.append('faltan %d oraciones (o su "es"): %s'%(len(miss),' '.join(miss[:40])))
if extra: errs.append('sobran ids que no están en el tramo: '+' '.join(extra[:20]))
for i,v in s.items():
    if not isinstance(v,dict): errs.append(i+' no es un objeto'); continue
    if 'g' in v and not all(isinstance(x,list) and len(x)>=2 for x in v.get('g') or []): errs.append(i+': "g" tiene que ser lista de pares')
if errs: print('\n'.join(errs[:20])); sys.exit(1)
print('OK',len(ids),'oraciones')
