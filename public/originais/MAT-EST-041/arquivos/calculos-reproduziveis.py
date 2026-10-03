"""MAT-EST-041 — demonstrações inteiramente autorais, sem dependências externas."""
from itertools import product, chain
from statistics import mean, pstdev
from math import sqrt
import csv
from pathlib import Path

clusters = [3, 7, 11]
replicas = [mean(t) for t in product(clusters, repeat=3)]
assert len(replicas) == 27
assert abs(pstdev(replicas) - sqrt(32/9)) < 1e-12

serie = [2, 4, 6, 8, 10, 12]
blocos = [serie[i:i+2] for i in range(len(serie)-1)]
medias = [mean(chain.from_iterable(blocos[j] for j in escolhas))
          for escolhas in product(range(len(blocos)), repeat=3)]
assert len(medias) == 125
assert abs(mean(medias) - 7) < 1e-12
assert abs(pstdev(medias) - sqrt(8/3)) < 1e-12

with (Path(__file__).parent/'dados-ficticios-referencia.csv').open(encoding='utf-8-sig', newline='') as f:
    dados = list(csv.DictReader(f))
y = [int(r['observado_atendimentos']) for r in dados]
y_teste = y[4:8]
prev_ultimo = [y[t-1] for t in range(4, 8)]
mae = lambda a, p: mean(abs(x-z) for x,z in zip(a,p))
assert mae(y_teste, prev_ultimo) == 20
assert mae(y_teste, [100]*4) == 12.5
print('clusters: 27; EP=', round(pstdev(replicas),6))
print('blocos: 125; EP ilustrativo=', round(pstdev(medias),6))
print('origem móvel, MAE=',mae(y_teste,prev_ultimo))
print('ATENÇÃO: a série didática cresce; não inferir cobertura do bootstrap de blocos.')
