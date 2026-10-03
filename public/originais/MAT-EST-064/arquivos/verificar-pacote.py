from pathlib import Path
import json,hashlib,zipfile,csv,xml.etree.ElementTree as ET
R=Path(__file__).resolve().parent
checks=[]
def ch(cond,msg):
 checks.append(msg)
 if not cond:raise AssertionError(msg)
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
M=json.loads((R/'metadados.json').read_text());C=json.loads((R/'checkpoint-editorial.json').read_text())
ch(M['id']=='MAT-EST-064' and M['proximoTopico']=='MAT-EST-065' and C['proximo_topico_editorial']=='MAT-EST-065','metadata/checkpoint')
for v in ['publicacaoSite','sincronizacaoDrive','sincronizacaoGithub','testeManualEdge','revisaoHumanaReal','reproducaoVideoIntegral','progressoIndividualAlterado','estudoRegistrado','dadosReais']:ch(M[v] is False,'honest '+v)
inv=json.loads((R/'governanca/hashes-herdados.json').read_text())['hashes_sha256'];ch(len(inv)==23,'23 source files')
for rel,d in inv.items():ch((R/rel).is_file() and sha(R/rel)==d,'source '+rel)
prev=R/'historico/MAT-EST-063-pacote-integracao.zip';ch(sha(prev)==C['sha256_pacote_anterior'],'previous ZIP SHA')
with zipfile.ZipFile(prev) as z:ch(z.testzip() is None and len(z.namelist())==65,'previous ZIP 65 members')
g=json.loads((R/'controle/MAT-EST-062-matriz-evidencias.json').read_text())['registros'];ch([x['status_atual'] for x in g]==['checked_local']*2+['pending']*4+['not_performed']*2,'G1-G8')
P=json.loads((R/'controle/MAT-EST-062-plano-pos-deploy.json').read_text())['itens'];ch(len(P)==10 and all(x['status']=='not_performed' for x in P),'P01-P10')
q=json.loads((R/'exercicios.json').read_text());a=json.loads((R/'gabarito-comentado.json').read_text());ids=[x['id'] for x in q]
ch(len(ids)==len(set(ids))==len(a)==36,'36 unique exercises');ch(ids==[x['id'] for x in a],'matching answer ids')
for k,n in [('APR',10),('CON',10),('VES',10),('RET',6)]:ch(sum(x['camada']==k for x in q)==n,'layer '+k)
for x in q:ch(x['origem']=='autoral' and x['id'].startswith('MAT-EST-064-EX-') and len(x['enunciado'])>30,'question '+x['id'])
for x in a:ch(len(x['resposta_e_resolucao'])>70 and bool(x['motivoProvavelDeErro']),'answer '+x['id'])
NS='{http://www.w3.org/2000/svg}';ch(len(M['visuais'])==6,'six figures')
for f in M['visuais']:
 root=ET.parse(R/f['src']).getroot();ch(root.find(NS+'title') is not None and root.find(NS+'desc') is not None and bool(f['alt']),'semantic '+f['src'])
ch(ET.parse(R/'previa-ilustrativa.svg').getroot().find(NS+'desc') is not None,'preview described')
ch((R/'previa-local.png').stat().st_size>12000 and '<main>' in (R/'previa-local.html').read_text(),'preview files')
H=json.loads((R/'pos-incidente/MAT-EST-064-hipoteses-causais.json').read_text());ch(H['causas_reais_confirmadas']==0 and len(H['hipoteses'])==6,'six hypothetical mechanisms')
A=json.loads((R/'pos-incidente/MAT-EST-064-plano-acoes.json').read_text())['acoes'];ch(len(A)==7 and all(x['responsavel_real'] is None and not x['aplicada_no_site'] for x in A),'no invented owners/actions')
ch(all(x['status']=='local_tested_on_fixture' for x in A[:6]) and A[6]['status']=='proposta_nao_executada','action states')
F=json.loads((R/'incidentes/MAT-EST-063-fixtures-incidentes.json').read_text())['receitas'];E=json.loads((R/'pos-incidente/MAT-EST-064-ensaio-controles.json').read_text())
ch(len(F)==len(E['resultados'])==7 and all(x['pass'] for x in E['resultados']),'fixture outcomes')
ch(E['resultados'][0]['actual']=='pass_local_fixture' and all(x['actual'].startswith('reject_') for x in E['resultados'][1:]),'expected negative cases')
ret=json.loads((R/'incidentes/MAT-EST-063-reteste-demonstrativo.json').read_text());ch(ret['depois']['resultado']=='pass_local_fixture' and not ret['publicacao'],'I01 retest local only')
metrics=json.loads((R/'pos-incidente/MAT-EST-064-contas-didaticas.json').read_text());ch(metrics['MAE_B']==3 and metrics['MAE_C']==4 and metrics['completude']==.25 and metrics['valor_mutado_I01']==.75 and metrics['subestimacao_relativa_do_correto']==.75,'arithmetic')
panel=json.loads((R/'relatorios/MAT-EST-059-painel-dados.json').read_text());ch(panel['historico']['guarda_t19']==19.2 and panel['historico']['promocao_C'] is False and panel['sucessor']['pares']==0 and panel['sucessor']['MAE'] is None,'old result unchanged')
L=(R/M['aulaMarkdown']).read_text()
for i in range(1,7):ch(f'assets/{i:02d}-' in L and f'**Figura {i}.**' in L,'figure '+str(i))
for word in ['não comprova','sem publicação','G3','MAT-EST-065']:ch(word in L,'lesson safeguards '+word)
manifest=(R/'manifesto-sha256.txt').read_text().splitlines();seen=set()
for line in manifest:
 d,rel=line.split('  ',1);ch(rel not in seen,'unique manifest '+rel);seen.add(rel);ch(sha(R/rel)==d,'hash '+rel)
rep=json.loads((R/'relatorio-integridade.json').read_text());ch(rep['all_passed'] and rep['previous_zip_sha256']==sha(prev),'report')
zip_path=R.parent/'MAT-EST-064-pacote-integracao.zip'
if zip_path.exists():
 with zipfile.ZipFile(zip_path) as z:
  ch(z.testzip() is None,'ZIP CRC');fs={p.relative_to(R).as_posix() for p in R.rglob('*') if p.is_file() and '__pycache__' not in p.parts};ch(set(z.namelist())==fs,'exact members')
  for name in z.namelist():ch(z.read(name)==(R/name).read_bytes(),'byte equality '+name)
print('PASS',len(checks),'checks;',len([p for p in R.rglob('*') if p.is_file() and '__pycache__' not in p.parts]),'files; 36 exercises; 23 invariant; 7 fixture results; next MAT-EST-065')
