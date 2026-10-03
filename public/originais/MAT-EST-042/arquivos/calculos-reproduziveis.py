"""MAT-EST-042: cálculos autorais e reproduzíveis, biblioteca padrão Python."""
from pathlib import Path
from statistics import mean
import math, csv
with (Path(__file__).parent/'dados-ficticios-referencia.csv').open(encoding='utf-8-sig', newline='') as f:
    linhas=list(csv.DictReader(f))
y=[int(r['observado_atendimentos']) for r in linhas]
assert y==[80,100,120,100,90,110,130,100]
bar=mean(y); z=[v-bar for v in y]; den=sum(v*v for v in z)
rho=lambda k:sum(z[t]*z[t-k] for t in range(k,len(z)))/den
assert bar==103.75 and den==1787.5
assert math.isclose(rho(1),-1/1144)
assert math.isclose(rho(2),-321/572)
ytrue=y[4:]; mov3=[mean(y[t-3:t]) for t in range(4,8)]
naive=[y[t-1] for t in range(4,8)]
mae=lambda p:mean(abs(a-b) for a,b in zip(ytrue,p))
rmse=lambda p:math.sqrt(mean((a-b)**2 for a,b in zip(ytrue,p)))
assert math.isclose(mae(mov3),95/6)
assert mae(naive)==20 and mae([100]*4)==12.5
assert math.isclose(rmse(mov3),math.sqrt(2975)/3)
e=[1,1,1,-1,-1,-1]
assert sum(e[t]*e[t-1] for t in range(1,6))/sum(a*a for a in e)==0.5
print('ACF',round(rho(1),6),round(rho(2),6))
print('MAE rolling3',round(mae(mov3),6),'RMSE',round(rmse(mov3),6))
print('baselines',mae(naive),mae([100]*4))
print('residual ACF1',0.5)
