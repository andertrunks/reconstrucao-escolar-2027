"""MAT-EST-045: independent recomputation with Python standard library."""
from pathlib import Path
from statistics import mean
from math import sqrt,isclose
import csv
p=Path(__file__).resolve().parent
with (p/'dados-ficticios-trimestrais.csv').open(encoding='utf-8',newline='') as f:
    y=[int(r['observado_unidades']) for r in csv.DictReader(f)]
assert y==[90,107,128,105,111,124,150,127,129,145,171,144]
train,test=y[:8],y[8:]
b=(train[3]-train[0])/3
adjusted=[train[i]-i*b for i in range(4)]
c=mean(adjusted)
s=[v-c for v in adjusted]
level=c+3*b
assert (level,b,s)==(115,5,[-10,2,18,-10])
trace=[]
for t in range(5,9):
    oldlevel,oldtrend=level,b
    lag=s[t-5]
    prior=oldlevel+oldtrend+lag
    level=.3*(train[t-1]-lag)+.7*(oldlevel+oldtrend)
    b=.2*(level-oldlevel)+.8*oldtrend
    snew=.2*(train[t-1]-oldlevel-oldtrend)+.8*lag
    s.append(snew)
    trace.append((t,prior,level,b,snew))
forecast=[level+h*b+s[3+h] for h in range(1,5)]
snaive=train[4:8]
shift=mean(train[i+4]-train[i] for i in range(4))
sdrift=[v+shift for v in snaive]
def mae(pred):return mean(abs(a-v) for a,v in zip(test,pred))
def rmse(pred):return sqrt(mean((a-v)**2 for a,v in zip(test,pred)))
assert isclose(level,135.6511392) and isclose(b,5.14139264)
assert isclose(forecast[0],130.99253184) and isclose(forecast[3],146.60209856)
assert isclose(mae(forecast),2.05582944) and isclose(rmse(forecast),2.1050797593402897)
assert isclose(mae(sdrift),1.75) and isclose(rmse(sdrift),2.179449471770337)
assert mae(sdrift)<mae(forecast) and rmse(forecast)<rmse(sdrift)
print('MAT-EST-045: cálculos reproduzíveis APROVADOS')
for name,pr in [('Holt-Winters aditivo',forecast),('Sazonal ingênuo',snaive),('Deslocamento sazonal',sdrift)]:
    print(name,'previsões',*[round(v,6) for v in pr],'MAE',round(mae(pr),6),'RMSE',round(rmse(pr),6))
