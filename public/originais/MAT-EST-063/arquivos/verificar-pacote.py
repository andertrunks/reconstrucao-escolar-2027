from pathlib import Path
import hashlib,json,zipfile,csv,xml.etree.ElementTree as ET
R=Path(__file__).resolve().parent
checks=[]
def check(v,msg):
 checks.append(msg)
 if not v:raise AssertionError(msg)
def h(p):return hashlib.sha256(p.read_bytes()).hexdigest()
meta=json.loads((R/'metadados.json').read_text(encoding='utf8'))
cp=json.loads((R/'checkpoint-editorial.json').read_text(encoding='utf8'))
check(meta['id']=='MAT-EST-063' and meta['proximoTopico']=='MAT-EST-064','metadata / next')
check(cp['ultimo_pacote_editorial_concluido']=='MAT-EST-063' and cp['proximo_topico_editorial']=='MAT-EST-064','checkpoint')
for key in ['publicacaoSite','sincronizacaoDrive','sincronizacaoGithub','testeManualEdge','revisaoHumanaReal','reproducaoVideoIntegral','progressoIndividualAlterado','estudoRegistrado']:
 check(meta[key] is False, 'no invented '+key)
inv=json.loads((R/'governanca/hashes-herdados.json').read_text(encoding='utf8'))['hashes_sha256']
check(len(inv)==23,'23 immutable source entries')
for f,d in inv.items():check((R/f).is_file() and h(R/f)==d,'inherited '+f)
prev=R/'historico/MAT-EST-062-pacote-integracao.zip'
check(h(prev)==cp['sha256_pacote_anterior'],'identical previous ZIP SHA')
with zipfile.ZipFile(prev) as z:check(z.testzip() is None and len(z.namelist())==62,'previous ZIP intact 62 members')
g=json.loads((R/'controle/MAT-EST-062-matriz-evidencias.json').read_text(encoding='utf8'))
check([x['status_atual'] for x in g['registros']]==['checked_local']*2+['pending']*4+['not_performed']*2,'G1 G8 unchanged')
check(all(x['responsavel_real'] is None and x['evidencia_adicional'] is None for x in g['registros']),'no false reviewer')
p=json.loads((R/'controle/MAT-EST-062-plano-pos-deploy.json').read_text(encoding='utf8'))
check(len(p['itens'])==10 and all(x['status']=='not_performed' for x in p['itens']),'P01 P10 unchanged')
q=json.loads((R/'exercicios.json').read_text(encoding='utf8'));a=json.loads((R/'gabarito-comentado.json').read_text(encoding='utf8'))
ids=[x['id'] for x in q];check(len(ids)==36 and len(set(ids))==36,'36 unique exercises')
check(ids==[x['id'] for x in a],'matching answer IDs')
for cat,n in [('APR',10),('CON',10),('VES',10),('RET',6)]:check(sum(x['camada']==cat for x in q)==n,'layer '+cat)
for x in q:check(x['origem']=='autoral' and x['id'].startswith('MAT-EST-063-EX-') and len(x['enunciado'])>40,'question '+x['id'])
for x in a:check(len(x['resposta_e_resolucao'])>80 and x['motivoProvavelDeErro'],'explanation '+x['id'])
check(len(meta['visuais'])==6,'6 figures')
NS='{http://www.w3.org/2000/svg}'
for fig in meta['visuais']:
 node=ET.parse(R/fig['src']).getroot()
 check(node.find(NS+'title') is not None and node.find(NS+'desc') is not None and node.find(NS+'title').text and node.find(NS+'desc').text and fig['alt'],'svg alt '+fig['src'])
check(ET.parse(R/'previa-ilustrativa.svg').getroot().find(NS+'desc') is not None,'preview svg description')
check((R/'previa-local.png').stat().st_size>10000 and '<html' in (R/'previa-local.html').read_text(),'visual previews')
fi=json.loads((R/'incidentes/MAT-EST-063-fixtures-incidentes.json').read_text(encoding='utf8'))['receitas']
check(len(fi)==7 and fi[0]['obtido']=='pass_local_fixture' and all(x['obtido'].startswith('reject_') for x in fi[1:]),'7 synthetic fixtures')
check(all(x['incidente_real'] is False for x in fi),'fixtures not claimed incidents')
ret=json.loads((R/'incidentes/MAT-EST-063-reteste-demonstrativo.json').read_text(encoding='utf8'))
check(ret['antes']['resultado']=='reject_denominator' and ret['depois']['resultado']=='pass_local_fixture','I01 corrected only')
check(ret['verificacoes']['regressao_baseline']=='pass_local_fixture' and all(x.startswith('reject_') for x in ret['verificacoes']['demais_mutacoes'].values()),'baseline and negatives preserved')
inc=json.loads((R/'incidentes/MAT-EST-063-caderno-sintetico.json').read_text(encoding='utf8'))
check(len(inc['tickets'])==6 and all(x['estado']=='simulado' and x['responsavel_real'] is None for x in inc['tickets']),'synthetic tickets only')
with (R/'sandbox/SANDBOX-057-cartoes.csv').open(encoding='utf8') as f:rows=list(csv.DictReader(f))
check(len(rows)==8 and sum(x['inclusion_status_at_cut']=='eligible_demo' for x in rows)==2,'sandbox 2 of 8')
maeB=sum(abs(float(x['error_base_if_eligible'])) for x in rows if x['inclusion_status_at_cut']=='eligible_demo')/2
maeC=sum(abs(float(x['error_challenger_if_eligible'])) for x in rows if x['inclusion_status_at_cut']=='eligible_demo')/2
check(maeB==3 and maeC==4,'MAE B3 C4 recomputed')
panel=json.loads((R/'relatorios/MAT-EST-059-painel-dados.json').read_text())
check(panel['historico']['guarda_t19']==19.2 and panel['historico']['promocao_C'] is False and panel['sucessor']['pares']==0 and panel['sucessor']['MAE'] is None,'historical and successor status')
lesson=(R/meta['aulaMarkdown']).read_text(encoding='utf8')
for i in range(1,7):check(f'assets/{i:02d}-' in lesson and f'**Figura {i}.**' in lesson,'caption figure '+str(i))
check('não houve publicação' in lesson.lower() or 'sem publicação' in lesson.lower(),'no fictional deployment')
manifest=(R/'manifesto-sha256.txt').read_text(encoding='utf8').splitlines()
seen=set()
for line in manifest:
 dig,name=line.split('  ',1);check(name not in seen,'unique manifest '+name);seen.add(name);check(h(R/name)==dig,'sha '+name)
report=json.loads((R/'relatorio-integridade.json').read_text())
check(report['all_passed'] is True and report['previous_zip_sha256']==h(prev),'report matches source')
archive=R.parent/'MAT-EST-063-pacote-integracao.zip'
if archive.exists():
 with zipfile.ZipFile(archive) as z:
  check(z.testzip() is None,'zip CRC')
  files={x.relative_to(R).as_posix() for x in R.rglob('*') if x.is_file() and '__pycache__' not in x.parts}
  check(set(z.namelist())==files,'all file members exactly')
  for name in z.namelist():check(z.read(name)==(R/name).read_bytes(),'zip equality '+name)
print(f'PASS {len(checks)} checks; {len([x for x in R.rglob("*") if x.is_file() and "__pycache__" not in x.parts])} package files; 36 questions; 23 invariant files; 7 fixtures')
