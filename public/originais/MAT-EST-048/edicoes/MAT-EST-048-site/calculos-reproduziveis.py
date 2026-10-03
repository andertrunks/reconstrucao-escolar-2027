"""MAT-EST-048: auditoria independente com biblioteca padrão e CSV de origem herdado.
Não há operações externas nem teste prospectivo verdadeiro: chegadas t13..18 são inventadas.
"""
from pathlib import Path
from statistics import mean
from math import sqrt,isclose
import csv
p=Path(__file__).resolve().parent
with (p/'dados-ficticios-trimestrais.csv').open(encoding='utf-8',newline='') as f:
 initial=[int(r['observado_unidades']) for r in csv.DictReader(f)]
with (p/'cenario-ficticio-t13-t18.csv').open(encoding='utf-8',newline='') as f:
 imagined=[int(r['observado_unidades']) for r in csv.DictReader(f)]
assert initial==[90,107,128,105,111,124,150,127,129,145,171,144]
assert imagined==[151,168,190,176,181,201]
def pred(x,h=1):
 b=(x[3]-x[0])/3
 first=mean(x[j]-j*b for j in range(4))
 season=[x[j]-j*b-first for j in range(4)]
 level=first+3*b
 for j in range(4,len(x)):
  oldlevel,oldtrend=level,b
  lag=season[j-4]
  level=.3*(x[j]-lag)+.7*(oldlevel+oldtrend)
  b=.2*(level-oldlevel)+.8*oldtrend
  season.append(.2*(x[j]-oldlevel-oldtrend)+.8*lag)
 return level+h*b+season[len(x)+h-5]
x=initial[:];records=[]
for i,obs in enumerate(imagined):
 issued=pred(x);origin=len(x);error=obs-issued
 records.append((origin,origin+1,issued,error));x.append(obs)
assert len(records)==6 and all(a<b for a,b,_,_ in records)
with (p/'registro-emissoes-simuladas.csv').open(encoding='utf-8',newline='') as f: frozen=list(csv.DictReader(f))
with (p/'registro-chegadas-simuladas.csv').open(encoding='utf-8',newline='') as f: arrived=list(csv.DictReader(f))
for i,(origin,target,prediction,error) in enumerate(records):
 assert int(frozen[i]['origem'])==origin and int(frozen[i]['alvo'])==target
 assert int(frozen[i]['emissaoOrdem'])<int(arrived[i]['chegadaOrdem'])
 assert frozen[i]['observadoNestaEmissao']=='NAO_DISPONIVEL'
 assert isclose(float(frozen[i]['previsaoUnidades']),prediction,abs_tol=1e-10)
 assert isclose(error,int(arrived[i]['observadoUnidades'])-prediction)
for a,b in ((0,3),(3,6)):
 e=[row[3] for row in records[a:b]]
 print('bloco',a,b,'MAE',round(mean(abs(k) for k in e),9),'média_assinada',round(mean(e),9))
assert sum(abs(row[3])>4 for row in records[:3])==0
assert sum(abs(row[3])>4 for row in records[3:])==3
assert isclose(pred(x,1),float(list(csv.DictReader((p/'emissoes-pendentes-simuladas.csv').open(encoding='utf-8')))[0]['previsao_unidades']),abs_tol=1e-10)
print('MAT-EST-048: APROVADA, sequência simulada íntegra, seis emissões auditáveis, dois alvos sem observado.')
