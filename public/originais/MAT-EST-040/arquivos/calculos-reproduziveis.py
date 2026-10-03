# MAT-EST-040 — cálculo reprodutível sem dependências externas
import itertools, statistics, math, csv, pathlib, collections
x=[2,4,6,8];means=sorted(sum(t)/4 for t in itertools.product(x,repeat=4))
mu=statistics.mean(means); v=statistics.mean((m-mu)**2 for m in means);se=math.sqrt(v)
assert len(means)==256 and abs(mu-5)<1e-12 and abs(v-1.25)<1e-12
assert (means[6],means[249])==(3,7)
a=[2,4,6];b=[8,10,12];pooled=a+b;diff=statistics.mean(a)-statistics.mean(b)
vals=[]
for ix in itertools.combinations(range(6),3):
 aa=[pooled[i] for i in ix];bb=[pooled[i] for i in range(6) if i not in ix]
 vals.append(statistics.mean(aa)-statistics.mean(bb))
assert len(vals)==20 and sum(abs(q)>=abs(diff)-1e-12 for q in vals)==2
pairs=[5,5,5,-20]; reps=sorted(statistics.mean(t) for t in itertools.product(pairs,repeat=4))
assert len(reps)==256 and (reps[6],reps[249])==(-13.75,5)
p=pathlib.Path(__file__).with_name('dados-ficticios-referencia.csv')
with p.open(encoding='utf-8-sig',newline='') as f: rows=[row for row in csv.DictReader(f) if row['particao']=='teste']
aerr=[abs(int(r['observado_atendimentos'])-int(r['previsao_A_atendimentos'])) for r in rows]
berr=[abs(int(r['observado_atendimentos'])-int(r['previsao_B_atendimentos'])) for r in rows]
assert aerr==[5,5,5,5] and berr==[0,0,0,25]
print('BOOTSTRAP 256; centro=5; erro-padrão=',se,'percentis=',(means[6],means[249]))
print('PERMUTAÇÃO 20; extremos=2; p=',2/20)
print('PAREADO MAE A=',statistics.mean(aerr),'MAE B=',statistics.mean(berr),'percentis=',(reps[6],reps[249]))
