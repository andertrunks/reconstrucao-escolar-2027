"""MAT-EST-044: calculation checks, using only Python standard library. Run inside package."""
from pathlib import Path
import csv, math, statistics, hashlib
p=Path(__file__).resolve().parent
with (p/'dados-ficticios-trimestrais.csv').open(encoding='utf-8',newline='') as f:
    y=[int(r['observado_unidades']) for r in csv.DictReader(f)]
assert y==[90,107,128,105,111,124,150,127,129,145,171,144]
train,test=y[:8],y[8:]
def ses(x,a):
    levels=[float(x[0])]
    for item in x[1:]: levels.append(a*item+(1-a)*levels[-1])
    return levels
assert ses([100,120,110,130],.5)==[100,110,110,120]
l8=ses(train,.5)[-1]
assert math.isclose(l8,130.2578125)
level,trend=float(train[1]),float(train[1]-train[0])
for value in train[2:]:
    old=level
    level=.4*value+.6*(level+trend)
    trend=.2*(level-old)+.8*trend
holt=[level+h*trend for h in range(1,5)]
models={'last':[train[-1]]*4,'seasonal_naive':train[4:8], 'seasonal_drift':[v+20.5 for v in train[4:8]],'ses':[l8]*4,'holt':holt}
mae=lambda forecast:statistics.mean(abs(y0-f) for y0,f in zip(test,forecast))
rmse=lambda forecast:math.sqrt(statistics.mean((y0-f)**2 for y0,f in zip(test,forecast)))
assert [mae(models[k]) for k in ['last','seasonal_naive','seasonal_drift']]==[20.25,19.25,1.75]
assert math.isclose(mae(models['ses']),17.62109375)
assert math.isclose(mae(models['holt']),19.33260399718401)
assert math.isclose(rmse(models['holt']),23.060926232425615)
l=.4*(111-(-10))+.6*(115+5)
b=.2*(l-115)+.8*5
s=.2*(111-115-5)+.8*(-10)
assert (round(l,3),round(b,3),round(s,3))==(120.4,5.08,-9.8)
print('MAT-EST-044: verificacoes reproduziveis APROVADAS')
for name,pred in models.items():
    print(name,'previsoes=',*[round(v,4) for v in pred],'MAE=',round(mae(pred),6),'RMSE=',round(rmse(pred),6))
