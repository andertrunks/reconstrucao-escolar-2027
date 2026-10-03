#!/usr/bin/env python3
import json, pathlib
p=pathlib.Path(__file__).resolve().parent
registry=json.loads((p/'MAT-EST-065-dicionario-indicadores.json').read_text(encoding='utf-8'))['registros']
vals={x['id']:x for x in registry}
assert len(vals)==11
def estimate(n,d):
    return None if n is None or d is None or d==0 else n/d
assert estimate(2,8)==.25 and estimate(6,2)==3 and estimate(8,2)==4 and estimate(14,2)==7
assert estimate(None,0) is None and estimate(0,0) is None
# Separate, concrete validator against the supplied fixture payload, not just its expected label.
def classify(case):
    v=case['input']
    kind=case['classe']
    if kind in ('controle_correto','denominador_trocado'):
        expected=estimate(v['sum_abs_B'],v['evaluable'])
        return 'accept_local_fixture' if v['reported_MAE_B']==expected and v['scope']=='sandbox' and v['real_incident_rate'] is None else 'reject_mae_denominator'
    if kind=='nulo_como_zero':
        return 'reject_nonestimable_as_zero' if v['future_evaluable']==0 and v['future_MAE'] is not None else 'accept_local_fixture'
    if kind=='generalizacao_fixture':
        return 'reject_scope_extrapolation' if v['tested']==v['detected']==6 and 'incidentes reais' in v['claim'] else 'accept_local_fixture'
    if kind=='execucao_vs_eficacia':
        return 'reject_category_error' if v['actions_local']==6 and v['actions_total']==7 and 'eficácia operacional' in v['claim'] else 'accept_local_fixture'
    if kind=='unidade_trocada':
        return 'reject_unit' if v['MAE_B']==3 and v['unit']!='unidades' else 'accept_local_fixture'
    if kind=='serie_temporal_inventada':
        return 'reject_unobserved_trend' if v['snapshots']<2 and 'tendência' in v['claim'] else 'accept_local_fixture'
    raise AssertionError('fixture not recognized')
cases=json.loads((p/'MAT-EST-065-fixtures-negativas.json').read_text(encoding='utf-8'))['casos']
assert len(cases)==7
results=[{'id':c['id'],'expected':c['expected'],'actual':classify(c)} for c in cases]
assert all(x['actual']==x['expected'] for x in results), results
print('PASS: 11 fichas; cálculos; 7 fixtures realmente classificadas (1 aceita, 6 rejeitadas); nulos preservados. Testes locais.')
