#!/usr/bin/env python3
"""MAT-EST-039 — exemplos EXATOS didáticos, sem pacotes externos.
Não executar como teste individual do estudante; apenas cálculos de referência.
"""
from collections import Counter
from itertools import combinations, product
from statistics import mean, pstdev
from math import comb
x=(2,4,6,8)
bootstrap_means=sorted(mean(v) for v in product(x,repeat=len(x)))
assert len(bootstrap_means)==256
print('media bootstrap',mean(bootstrap_means),'DP',pstdev(bootstrap_means))
print('percentis empiricos ilustrativos',bootstrap_means[6],bootstrap_means[249])
pool=(2,4,6,8,10,12)
diffs=[]
for ids in combinations(range(6),3):
    a=[pool[i] for i in ids]
    b=[pool[j] for j in range(6) if j not in ids]
    diffs.append(mean(a)-mean(b))
observed=-6
extremes=sum(abs(d)>=abs(observed)-1e-12 for d in diffs)
print('permutacoes',len(diffs),'extremos',extremes,'p_exato',extremes/len(diffs))
assert len(diffs)==comb(6,3)==20 and extremes==2
