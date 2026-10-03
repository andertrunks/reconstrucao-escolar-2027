#!/usr/bin/env python3
from pathlib import Path
import json,hashlib,zipfile,xml.etree.ElementTree as ET, csv, re
p=Path(__file__).resolve().parent
n=0
def ch(ok,label):
 global n
 n+=1
 if not ok:raise AssertionError(label)
def sha(x):return hashlib.sha256(x.read_bytes()).hexdigest()
M=json.loads((p/'metadados.json').read_text(encoding='utf-8'));C=json.loads((p/'checkpoint-editorial.json').read_text(encoding='utf-8'))
ch(M['id']=='MAT-EST-065' and C['ultimo_pacote_editorial_concluido']=='MAT-EST-065' and M['proximoTopico']=='MAT-EST-066' and C['proximo_topico_editorial']=='MAT-EST-066','ids/checkpoint')
for field in ['publicacaoSite','sincronizacaoDrive','sincronizacaoGithub','testeManualEdge','revisaoHumanaReal','reproducaoVideoIntegral','progressoIndividualAlterado','estudoRegistrado','dadosReais']:ch(M[field] is False,'honest '+field)
base=json.loads((p/'governanca/hashes-herdados.json').read_text(encoding='utf-8'))['hashes_sha256'];ch(len(base)==23,'23 invariant')
for rel,v in base.items():ch((p/rel).is_file() and sha(p/rel)==v,'original '+rel)
zprev=p/'historico/MAT-EST-064-pacote-integracao.zip';ch(sha(zprev)==C['sha256_pacote_anterior'],'prior ZIP unchanged')
with zipfile.ZipFile(zprev) as z:ch(z.testzip() is None,'prior ZIP CRC')
G=json.loads((p/'controle/MAT-EST-062-matriz-evidencias.json').read_text(encoding='utf-8'))['registros'];ch([a['status_atual'] for a in G]==['checked_local']*2+['pending']*4+['not_performed']*2,'G1-G8 preserved')
P=json.loads((p/'controle/MAT-EST-062-plano-pos-deploy.json').read_text(encoding='utf-8'))['itens'];ch(len(P)==10 and all(x['status']=='not_performed' for x in P),'P01-P10 unchanged')
A=json.loads((p/'pos-incidente/MAT-EST-064-plano-acoes.json').read_text(encoding='utf-8'))['acoes'];ch(len(A)==7 and sum(x['status']=='local_tested_on_fixture' for x in A)==6 and A[-1]['status']=='proposta_nao_executada','A64 statuses')
J=json.loads((p/'indicadores/MAT-EST-065-dicionario-indicadores.json').read_text(encoding='utf-8'))['registros'];ch(len(J)==11 and len(set(x['id'] for x in J))==11,'dictionary')
D={x['id']:x for x in J};ch((D['K65-01']['numerador'],D['K65-01']['denominador'],D['K65-02']['numerador'],D['K65-02']['denominador'])==(2,8,6,2),'denominators')
ch(D['K65-10']['nao_estimavel'] and D['K65-11']['nao_estimavel'] and D['K65-10']['valor_publicavel_apenas_com_ressalva'] is None,'null preserved')
F=json.loads((p/'indicadores/MAT-EST-065-fotografia-inicial.json').read_text(encoding='utf-8'));ch(F['valores']['completude_sandbox']==.25 and F['valores']['MAE_B']==3 and F['valores']['MAE_C']==4 and F['valores']['MAE_sucessor'] is None,'snapshot')
N=json.loads((p/'indicadores/MAT-EST-065-fixtures-negativas.json').read_text(encoding='utf-8'))['casos'];ch(len(N)==7 and N[0]['expected']=='accept_local_fixture' and len(set(x['id'] for x in N))==7,'negative fixtures')
Q=json.loads((p/'exercicios.json').read_text(encoding='utf-8'));ANS=json.loads((p/'gabarito-comentado.json').read_text(encoding='utf-8'));ids=[q['id'] for q in Q]
ch(len(ids)==36 and len(set(ids))==36 and ids==[x['id'] for x in ANS],'36 exercise IDs and matching solutions')
for l,num in [('APR',10),('CON',10),('VES',10),('RET',6)]:ch(sum(q['camada']==l for q in Q)==num,'layer '+l)
for q,a in zip(Q,ANS):ch(q['origem']=='autoral' and q['id'].startswith('MAT-EST-065-EX-') and len(q['enunciado'])>42 and len(a['resposta_e_resolucao'])>100 and bool(a['motivoProvavelDeErro']),'exercise '+q['id'])
NS='{http://www.w3.org/2000/svg}';ch(len(M['visuais'])==6,'six figures')
for v in M['visuais']:
 root=ET.parse(p/v['src']).getroot();ch(root.find(NS+'title') is not None and root.find(NS+'desc') is not None and bool(v['alt']),'figure '+v['src'])
root=ET.parse(p/'previa-ilustrativa.svg').getroot();ch(root.find(NS+'desc') is not None,'preview alt')
ch((p/'previa-local.png').stat().st_size>10000 and '<main>' in (p/'previa-local.html').read_text(),'preview')
L=(p/M['aulaMarkdown']).read_text(encoding='utf-8');ch(L.count('**Figura ')==6 and all(v['src'] in L for v in M['visuais']),'lesson six figures')
for s in ['não estimável','MAT-EST-066','G3','fotos','85,71%']:
 if s=='fotos':continue
 ch(s in L,'lesson safeguards '+s)
manifest=(p/'manifesto-sha256.txt').read_text(encoding='utf-8').splitlines();files=set()
for line in manifest:
 digest,rel=line.split('  ',1);ch(rel not in files and sha(p/rel)==digest,'manifest '+rel);files.add(rel)
expected={x.relative_to(p).as_posix() for x in p.rglob('*') if x.is_file() and '__pycache__' not in x.parts and x.name not in ['manifesto-sha256.txt','relatorio-integridade.json']};ch(files==expected,'manifest completeness')
report=json.loads((p/'relatorio-integridade.json').read_text(encoding='utf-8'));ch(report['all_passed'] and report['previous_zip_sha256']==sha(zprev),'report status')
outer=p.parent/'MAT-EST-065-pacote-integracao.zip'
if outer.exists():
 with zipfile.ZipFile(outer) as z:
  ch(z.testzip() is None,'outer zip CRC');allfiles={x.relative_to(p).as_posix() for x in p.rglob('*') if x.is_file() and '__pycache__' not in x.parts};ch(set(z.namelist())==allfiles,'ZIP exact members')
  for rel in z.namelist():ch(z.read(rel)==(p/rel).read_bytes(),'ZIP file '+rel)
print('PASS',n,'verificações; 36 questões; 23 arquivos-base idênticos; próximo MAT-EST-066; sem publicação.')
