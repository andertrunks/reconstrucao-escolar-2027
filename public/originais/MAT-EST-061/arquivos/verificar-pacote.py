from pathlib import Path
import json,hashlib,zipfile,sys,xml.etree.ElementTree as ET,importlib.util,csv,re
R=Path(__file__).resolve().parent;checks=[]
def check(ok,name):checks.append((bool(ok),name));assert ok,name
def h(p):return hashlib.sha256(p.read_bytes()).hexdigest()
entries=[]
for l in (R/'manifesto-sha256.txt').read_text(encoding='utf8').splitlines():
 d,n=l.split('  ',1);entries.append(n);check((R/n).is_file() and h(R/n)==d,'sha:'+n)
inv=json.loads((R/'governanca/hashes-herdados.json').read_text(encoding='utf8'))['hashes_sha256'];check(len(inv)==23,'23 invariants');
for n,d in inv.items():check(h(R/n)==d,'invariant:'+n)
q=json.loads((R/'exercicios.json').read_text());g=json.loads((R/'gabarito-comentado.json').read_text());ids=[v['id'] for v in q];check(len(ids)==36 and len(set(ids))==36,'36 unique questions');check([v['id'] for v in g]==ids,'36 aligned explanations');check([sum(x['camada']==k for x in q) for k in ('APR','CON','VES','RET')]==[10,10,10,6],'layers');check(all(v['origem']=='autoral' for v in q),'only authorial')
svgs=list((R/'assets').glob('*.svg'));check(len(svgs)==6,'six SVGs')
for f in svgs:
 x=ET.parse(f).getroot();ns='{http://www.w3.org/2000/svg}';check(bool(x.find(ns+'title').text and x.find(ns+'desc').text),'SVG title and desc:'+f.name)
cp=json.loads((R/'checkpoint-editorial.json').read_text());check(cp['ultimo_pacote_editorial_concluido']=='MAT-EST-061' and cp['proximo_topico_editorial']=='MAT-EST-062','checkpoint')
ev=json.loads((R/'regressao/MAT-EST-061-registro-evidencias.json').read_text());states=[e['status'] for e in ev['records']];check(states==['checked_local']*2+['pending']*4+['not_performed']*2,'honest evidence states');check(ev['public_url'] is None and ev['github_commit'] is None,'no fake public evidence')
r=json.loads((R/'regressao/MAT-EST-061-resultado-regressao.json').read_text());check(len(r['results'])==6 and all(x['as_expected'] for x in r['results']),'regressions expected');check(sum(x['actual']=='REPROVADO' for x in r['results'])==5,'five mutations rejected')
restore=json.loads((R/'regressao/MAT-EST-061-ensaio-restauracao.json').read_text());check(restore['result']=='PASSOU_APENAS_EM_STAGING_LOCAL' and not restore['performed_live_rollback'],'restore only locally')
check(h(R/'historico/MAT-EST-060-pacote-integracao.zip')==restore['baseline_sha256'],'previous exact hash');
if (R.parent/'MAT-EST-060-pacote-integracao.zip').exists():check((R/'historico/MAT-EST-060-pacote-integracao.zip').read_bytes()==(R.parent/'MAT-EST-060-pacote-integracao.zip').read_bytes(),'previous exact bytes')
report=json.loads((R/'relatorio-integridade.json').read_text());check(report['previous_zip_sha256']==restore['baseline_sha256'],'integrity previous hash')
archive=R.parent/'MAT-EST-061-pacote-integracao.zip'
if archive.exists():
 with zipfile.ZipFile(archive) as z:
  check(z.testzip() is None,'ZIP CRC'); check(set(z.namelist())==set(p.relative_to(R).as_posix() for p in R.rglob('*') if p.is_file() and '__pycache__' not in p.parts),'ZIP entries');check(all(z.read(n)==(R/n).read_bytes() for n in z.namelist()),'ZIP member bytes')
print('PASS',len(checks),'checks; package files',len([p for p in R.rglob('*') if p.is_file()]))
