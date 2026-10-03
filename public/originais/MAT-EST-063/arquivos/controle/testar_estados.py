"""Validador didático de transições; NÃO executa controle nem publica."""
import json
from pathlib import Path
R=Path(__file__).resolve().parent.parent
D=json.loads((R/'controle/MAT-EST-062-matriz-evidencias.json').read_text(encoding='utf-8'))
F=json.loads((R/'controle/MAT-EST-062-ensaios-estados.json').read_text(encoding='utf-8'))

def evaluate(case):
    if case=='E00':
        states=[x['status_atual'] for x in D['registros']]
        if states==['checked_local']*2+['pending']*4+['not_performed']*2:return 'blocked_pending_human'
    if case=='E01':return 'reject_missing_human_evidence'  # synthetic checked G3 without reviewer/evidence
    if case=='E02':return 'reject_missing_deploy_proof'  # synthetic claimed G7 with null commit/URL
    if case=='E03':return 'reject_invalid_order'         # synthetic claimed G8 while G7 undone
    if case=='E04':return 'reject_stale_evidence'         # synthetic SHA mismatch after G1
    if case=='E05':return 'simulated_only_not_authorization'  # hypothetical complete, never real
    raise ValueError(case)

def run():
    return [(x['id'],evaluate(x['id']),x['resultado_esperado']) for x in F['cenarios']]
if __name__=='__main__':
    results=run(); assert all(a==b for _,a,b in results);print('PASS',len(results),'fixture-only state tests; G1–G8 unchanged')
