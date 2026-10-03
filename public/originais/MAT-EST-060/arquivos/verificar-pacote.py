from pathlib import Path
import json,hashlib,zipfile,sys,xml.etree.ElementTree as ET,importlib.util,csv,re
R=Path(__file__).resolve().parent
checks=[]
def check(ok,name):checks.append((bool(ok),name));assert ok,name
def h(p):return hashlib.sha256(p.read_bytes()).hexdigest()
entries=[]
for line in (R/'manifesto-sha256.txt').read_text().splitlines():
 digest,name=line.split('  ',1);entries.append((name,digest));check((R/name).is_file() and h(R/name)==digest,'SHA:'+name)
base=json.loads((R/'governanca/hashes-herdados.json').read_text())['hashes_sha256']
check(len(base)==23,'23 inherited invariants');
for k,v in base.items():check(h(R/k)==v,'Inherited:'+k)
q=json.loads((R/'exercicios.json').read_text());g=json.loads((R/'gabarito-comentado.json').read_text());ids=[x['id'] for x in q]
check(len(ids)==36 and len(set(ids))==36,'36 unique exercises');check([x['id'] for x in g]==ids,'key IDs align');check([sum(x['camada']==k for x in q) for k in ('APR','CON','VES','RET')]==[10,10,10,6],'exercise layers')
for f in (R/'assets').glob('*.svg'):
 x=ET.parse(f).getroot();ns='{http://www.w3.org/2000/svg}';check(bool(x.find(ns+'title').text and x.find(ns+'desc').text),'SVG description '+f.name)
check(len(list((R/'assets').glob('*.svg')))==6,'six SVGS')
spec=importlib.util.spec_from_file_location('local_audit',R/'auditoria/auditar_publicacao.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);o=m.audit();check(o['all_expected'] and len(o['automated_checks'])==9 and sum(x['result']=='REPROVADO' for x in o['automated_checks'])==8,'negative fixture audit')
cp=json.loads((R/'checkpoint-editorial.json').read_text());check(cp['ultimo_pacote_editorial_concluido']=='MAT-EST-060' and cp['proximo_topico_editorial']=='MAT-EST-061','checkpoint')
report=json.loads((R/'relatorio-integridade.json').read_text(encoding='utf8'));check(h(R/'historico/MAT-EST-059-pacote-integracao.zip')==report['previous_zip_sha256'],'previous zip preserved by recorded digest')
if (R.parent/'MAT-EST-059-pacote-integracao.zip').exists():check((R/'historico/MAT-EST-059-pacote-integracao.zip').read_bytes()==(R.parent/'MAT-EST-059-pacote-integracao.zip').read_bytes(),'previous zip compared with mounted source')
archive=R.parent/'MAT-EST-060-pacote-integracao.zip'
if archive.exists():
 with zipfile.ZipFile(archive) as z:
  check(z.testzip() is None,'ZIP CRC');check(set(z.namelist())==set(p.relative_to(R).as_posix() for p in R.rglob('*') if p.is_file()),'ZIP member list');check(all(z.read(n)==(R/n).read_bytes() for n in z.namelist()),'ZIP bytes')
print('PASS',len(checks),'checks; files',len(list(R.rglob('*'))));
