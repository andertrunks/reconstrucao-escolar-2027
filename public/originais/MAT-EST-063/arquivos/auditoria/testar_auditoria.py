#!/usr/bin/env python3
"""Testes de integridade e semântica do pacote fictício MAT-EST-054."""
import csv
import hashlib
import json
import subprocess
import sys
from pathlib import Path
from xml.etree import ElementTree as ET
ROOT=Path(__file__).resolve().parent.parent
OLD=ROOT.parent/'MAT-EST-053'
DATA=ROOT/'dados'
META=json.loads((ROOT/'metadados.json').read_text(encoding='utf-8'))
REPORT=json.loads((ROOT/'relatorios/relatorio-auditoria.json').read_text(encoding='utf-8'))
checks=[]
def check(name,condition):
    if not condition:raise AssertionError(name)
    checks.append(name)
def sha(x):return hashlib.sha256(x.read_bytes()).hexdigest()

def getv(cut,policy):return next(x for x in REPORT['exemplo_V'] if x['corte']==cut and x['politica']==policy)

inherited=[x.relative_to(ROOT) for x in DATA.glob('*') if x.is_file()]+[Path('protocolo-herdado-MAT-EST-049.json'),Path('plano-avaliacao-MAT-EST-051.json')]
check('19 inherited data/policy files exist',len(inherited)==19)
check('all 19 inherited files byte-identical',all((ROOT/p).read_bytes()==(OLD/p).read_bytes() for p in inherited))
check('original frozen protocol unchanged',sha(ROOT/'protocolo-herdado-MAT-EST-049.json')==sha(OLD/'protocolo-herdado-MAT-EST-049.json'))
check('plan not activated', 'não executado' in json.dumps(json.loads((ROOT/'checkpoint-editorial.json').read_text(encoding='utf-8')),ensure_ascii=False))
check('main data five rows', REPORT['serie_principal']['n_pares']==5 and REPORT['serie_principal']['alvos']==['t18','t19','t20','t21','t22'])
check('main sums', REPORT['serie_principal']['somas']=={'B_abs':'88.00','B_cost':'256.00','C_abs':'41.80','C_cost':'74.60'})
check('main means',REPORT['serie_principal']['medias']=={'B_abs':'17.60','B_cost':'51.20','C_abs':'8.36','C_cost':'14.92'})
check('guard failure remains', REPORT['serie_principal']['deterioracao_t19']=='19.20' and REPORT['serie_principal']['guarda_violada'] and 'não promover' in REPORT['serie_principal']['decisao'])
check('V has six snapshots',len(REPORT['exemplo_V'])==6)
check('V L11 both pending',getv('L11','AS_KNOWN')['n_alvos']==0 and getv('L11','VALIDATED_AS_OF')['metricas'] is None)
check('V L12 preliminary present',getv('L12','AS_KNOWN')['metricas']['B']['erro']=='-2.00' and getv('L12','AS_KNOWN')['metricas']['C']['erro_absoluto']=='3.00')
check('V L12 validated pending',getv('L12','VALIDATED_AS_OF')['n_alvos']==0)
check('V L13 corrected scores',getv('L13','VALIDATED_AS_OF')['metricas']['B']['custo_3_1']=='6.00' and getv('L13','VALIDATED_AS_OF')['metricas']['C']['erro_absoluto']=='1.00')
check('V v2 references v1',list(csv.DictReader((DATA/'EXEMPLO-V-versoes.csv').open(encoding='utf-8')))[0]['quality']=='preliminar' and list(csv.DictReader((DATA/'EXEMPLO-V-versoes.csv').open(encoding='utf-8')))[1]['corrects_id']=='MAT-EST-053-V-OBS-v1')
check('Z seven digest-chain events',REPORT['exemplo_Z']['verificacao_cadeia']['eventos']==7 and len(REPORT['exemplo_Z']['verificacao_cadeia']['hash_final'])==64)
check('Z costs 3 then 9', [x['custo'] for x in REPORT['exemplo_Z']['avaliacoes']]==['3.00','9.00'])
check('Z/V not included in main n', REPORT['exemplo_Z']['n_alvos_distintos']==1 and all(x['namespace']=='EXEMPLO-V-ISOLADO' for x in REPORT['exemplo_V']))
check('no main t23–t25 observation',not any(x in REPORT['serie_principal']['alvos'] for x in ['t23','t24','t25']) and META['estadoDaSerie']['t23_t25']=='sem observações ou emissões autenticadas')
check('script provenance includes hash of own bytes',REPORT['proveniencia_SHA256']['auditoria/recalcular_relatorios.py']==sha(ROOT/'auditoria/recalcular_relatorios.py'))
check('all hashed audit sources match',all(sha(ROOT/p)==h for p,h in REPORT['proveniencia_SHA256'].items()))
check('standalone deterministic verify',subprocess.run([sys.executable,str(ROOT/'auditoria/recalcular_relatorios.py'),'--verify'],cwd=ROOT,capture_output=True,text=True).returncode==0)
ex=json.loads((ROOT/'exercicios.json').read_text(encoding='utf-8')); g=json.loads((ROOT/'gabarito-comentado.json').read_text(encoding='utf-8'))
ids=[x['id'] for x in ex]
check('36 unique exercise IDs',len(ids)==36 and len(set(ids))==36 and all(x.startswith('MAT-EST-054-EX-') for x in ids))
check('exercise groups ten/ten/ten/six', [sum(x['grupo']==group for x in ex) for group in ['APR','CON','VES','RET']]==[10,10,10,6])
check('all exercises authorial',all(x['origem']=='autoral' for x in ex))
check('answer IDs match exactly',ids==[x['id'] for x in g] and all(x['resolucao'] and x['motivosDeErro'] for x in g))
check('six accessible SVGs',len(list((ROOT/'assets').glob('*.svg')))==6 and all((lambda z: z.find('{http://www.w3.org/2000/svg}title') is not None and z.find('{http://www.w3.org/2000/svg}desc') is not None)(ET.parse(ROOT/item['src']).getroot()) for item in META['visuais']))
lesson=(ROOT/META['aulaMarkdown']).read_text(encoding='utf-8')
check('all six figures referenced with explanations',all(item['src'] in lesson for item in META['visuais']) and lesson.count('Texto alternativo:')==6 and lesson.count('Conclusão pronunciável:')==6)
check('complete local HTML and illustrative PNG',(ROOT/'previa-local.html').exists() and (ROOT/'previa-local.png').stat().st_size>5000)
check('checkpoint next lesson and no progress',json.loads((ROOT/'checkpoint-editorial.json').read_text(encoding='utf-8'))['proximo_topico_editorial']=='MAT-EST-055' and 'não iniciado' in META['progressoIndividual'])
check('video not claimed fully verified','pendente' in META['video']['statusVerificacao'] and 'não pôde ser aberta' in META['video']['statusVerificacao'])
check('report CSV all namespaces isolated',set(row['namespace'] for row in csv.DictReader((ROOT/'relatorios/conciliacao-de-versoes.csv').open(encoding='utf-8')))=={'EXEMPLO-V-ISOLADO','EXEMPLO-Z-ISOLADO','SERIE-PRINCIPAL-FICTICIA'})
print('PASSOU',len(checks),'/',len(checks),'testes locais')
for x in checks:print('OK:',x)
