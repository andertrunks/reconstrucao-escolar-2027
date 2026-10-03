"""MAT-EST-047: independent standard-library recalculation from unmodified inherited CSV."""
from pathlib import Path
from statistics import mean
from math import sqrt,isclose
import csv
p=Path(__file__).resolve().parent
with (p/'dados-ficticios-trimestrais.csv').open(encoding='utf-8',newline='') as f:
    y=[int(z['observado_unidades']) for z in csv.DictReader(f)]
assert y==[90,107,128,105,111,124,150,127,129,145,171,144]
records=[]
for origin in (8,9,10):
    x=y[:origin]
    slope=(x[3]-x[0])/3
    adjusted=[x[j]-j*slope for j in range(4)]
    base=mean(adjusted)
    seasons=[v-base for v in adjusted]
    level=base+3*slope
    for j in range(4,origin):
        ol,ob=level,slope
        lag=seasons[j-4]
        level=.3*(x[j]-lag)+.7*(ol+ob)
        slope=.2*(level-ol)+.8*ob
        seasons.append(.2*(x[j]-ol-ob)+.8*lag)
    for h in (1,2):
        point=level+h*slope+seasons[origin+h-5]
        actual=y[origin+h-1]
        err=actual-point
        record={'origin':origin,'h':h,'forecast':point,'error':err,'actual':actual}
        for label,delta in [('A',2 if h==1 else 3),('B',3 if h==1 else 4)]:
            outside=max(0,abs(err)-delta)
            record[label]={'inside':outside==0,'score':2*delta+10*outside,'width':2*delta}
        records.append(record)
assert len(records)==6
assert isclose(records[0]['forecast'],130.99253184)
assert isclose(records[4]['forecast'],168.240313060864)
for h,exp in [(1,2.0989439322453336),(2,1.8208321807359766)]:
    rr=[r for r in records if r['h']==h]
    assert isclose(mean(abs(r['error']) for r in rr),exp)
    print('h=',h,'signed mean=',round(mean(r['error'] for r in rr),9),'MAE=',round(exp,9))
assert [sum(r[label]['inside'] for r in records if r['h']==h) for label,h in [('A',1),('A',2),('B',1),('B',2)]]==[2,3,3,3]
assert isclose(mean(r['A']['score'] for r in records),6.26614489856,rel_tol=1e-8)
assert isclose(mean(r['B']['score'] for r in records),7.0)
print('MAT-EST-047: recomputação independente APROVADA — 6 tarefas; A=5/6, B=6/6 sem alegação de cobertura nominal.')
