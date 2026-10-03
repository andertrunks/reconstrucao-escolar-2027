"""MAT-EST-043. Código autoral; executar no diretório do pacote, apenas biblioteca padrão."""
from pathlib import Path
import csv,math,statistics,hashlib
folder=Path(__file__).resolve().parent
with (folder/'dados-ficticios-trimestrais.csv').open(encoding='utf-8',newline='') as f:
    rows=list(csv.DictReader(f))
y=[int(r['observado_unidades']) for r in rows]
t=[int(r['tendencia_conhecida_por_construcao']) for r in rows]
s=[int(r['sazonalidade_conhecida_por_construcao']) for r in rows]
r=[int(r['restante_conhecido_por_construcao']) for r in rows]
assert y==[T+S+R for T,S,R in zip(t,s,r)]
assert y==[90,107,128,105,111,124,150,127,129,145,171,144]
d4=[y[i]-y[i-4] for i in range(4,12)];assert d4==[21,17,22,22,18,21,21,17]
train=y[:8];test=y[8:]
snaive=train[4:8];naive=[train[-1]]*4
step=statistics.mean(train[i+4]-train[i] for i in range(4))
drift=[v+step for v in train[4:8]]
mae=lambda p:statistics.mean(abs(a-b) for a,b in zip(test,p))
rmse=lambda p:math.sqrt(statistics.mean((a-b)**2 for a,b in zip(test,p)))
assert step==20.5 and drift==[131.5,144.5,170.5,147.5]
assert mae(snaive)==19.25 and mae(naive)==20.25 and mae(drift)==1.75
assert math.isclose(rmse(snaive),math.sqrt(1495)/2)
assert math.isclose(rmse(naive),math.sqrt(2553)/2)
assert math.isclose(rmse(drift),math.sqrt(19)/2)
center=(statistics.mean(y[:4])+statistics.mean(y[1:5]))/2
assert center==110.125
print('T+S+R: 12 identidades corretas')
print('diferencas_sazonais:',d4)
print('MAE:',mae(snaive),mae(naive),mae(drift))
print('RMSE:',round(rmse(snaive),6),round(rmse(naive),6),round(rmse(drift),6))
print('media_centrada_periodo_3:',center)
