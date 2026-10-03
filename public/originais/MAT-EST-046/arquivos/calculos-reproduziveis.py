"""MAT-EST-046: independent evaluation from inherited CSV; standard library only."""
from pathlib import Path
from statistics import mean
from math import sqrt,isclose
import csv
p=Path(__file__).resolve().parent
with (p/'dados-ficticios-trimestrais.csv').open(encoding='utf-8',newline='') as f:
    y=[int(r['observado_unidades']) for r in csv.DictReader(f)]
assert y==[90,107,128,105,111,124,150,127,129,145,171,144]
records=[]
for origin in (8,9,10):
    values=y[:origin]
    trend=(values[3]-values[0])/3
    detrended=[values[j]-j*trend for j in range(4)]
    center=mean(detrended)
    seasonal=[z-center for z in detrended]
    level=center+3*trend
    for idx in range(4,origin):
        oldlevel,oldtrend=level,trend
        lag=seasonal[idx-4]
        level=.3*(values[idx]-lag)+.7*(oldlevel+oldtrend)
        trend=.2*(level-oldlevel)+.8*oldtrend
        newseason=.2*(values[idx]-oldlevel-oldtrend)+.8*lag
        seasonal.append(newseason)
    annual=mean(values[j]-values[j-4] for j in range(4,origin))
    for horizon in (1,2):
        future=y[origin+horizon-1]
        hw=level+horizon*trend+seasonal[origin+horizon-5]
        naive=values[origin+horizon-5]
        shift=naive+annual
        records.append((origin,horizon,future,hw,naive,shift))
def score(name,horizon):
    vals=[r[2]-r[{'hw':3,'na':4,'shift':5}[name]] for r in records if r[1]==horizon]
    return mean(abs(e) for e in vals),sqrt(mean(e*e for e in vals))
assert len(records)==6
assert isclose(records[0][3],130.99253184)
assert isclose(records[2][3],146.5446130176)
assert isclose(records[4][3],168.240313060864)
assert isclose(score('hw',1)[0],2.0989439322453336)
assert isclose(score('hw',2)[0],1.8208321807359766)
assert isclose(score('shift',1)[0],1.4444444444444475)
assert isclose(score('na',1)[0],20.0)
interval=[]
for row in records:
    half=2 if row[1]==1 else 3
    interval.append(abs(row[2]-row[3])<=half)
assert sum(interval[::2])==2 and sum(interval[1::2])==3
print('MAT-EST-046: recomputação independente APROVADA; 6 tarefas de previsão; cobertura apenas descritiva 2/3 e 3/3.')
for model in ('hw','na','shift'):
    for horizon in (1,2):
        mae,rmse=score(model,horizon)
        print(model,'h=',horizon,'MAE=',round(mae,6),'RMSE=',round(rmse,6))
