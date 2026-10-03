#!/usr/bin/env python3
from pathlib import Path
import json,hashlib,zipfile,xml.etree.ElementTree as ET,re,csv,collections,sys
p=Path(__file__).resolve().parent
n=0
def check(ok,label):
 global n;n+=1
 if not ok:raise AssertionError(label)
def sha(path):return hashlib.sha256(path.read_bytes()).hexdigest()
def J(path):return json.loads((p/path).read_text(encoding='utf-8'))
m=J('metadados.json');c=J('checkpoint-editorial.json');check(m['id']=='MAT-EST-066' and c['ultimo_pacote_editorial_concluido']=='MAT-EST-066','lesson checkpoint')
check(m['proximoTopico']=='MAT-EST-067' and c['proximo_estado']=='não iniciado','next topic')
for key in ['publicacaoSite','sincronizacaoDrive','sincronizacaoGithub','testeManualEdge','revisaoHumanaReal','reproducaoVideoIntegral','progressoIndividualAlterado','estudoRegistrado','dadosReais']:
 check(m[key] is False,'truth flags '+key)
for key in ['publicação','sincronização','Edge','observações novas']:
 check(key in (p/'LEIA-ME-INTEGRACAO.md').read_text(encoding='utf-8'),'disclosure '+key)
base=J('governanca/hashes-herdados.json')['hashes_sha256'];check(len(base)==23,'23 invariant files')
for f,h in base.items():check((p/f).is_file() and sha(p/f)==h,'historical hash '+f)
prev=p/'historico/MAT-EST-065-pacote-integracao.zip';check(sha(prev)==c['sha256_pacote_anterior'],'previous zip sha')
with zipfile.ZipFile(prev) as z:check(z.testzip() is None and len(z.namelist())==74,'previous zip fully copied')
g=J('controle/MAT-EST-062-matriz-evidencias.json')['registros'];check([r['status_atual'] for r in g]==['checked_local']*2+['pending']*4+['not_performed']*2,'G status')
pp=J('controle/MAT-EST-062-plano-pos-deploy.json')['itens'];check(len(pp)==10 and all(r['status']=='not_performed' for r in pp),'post deploy not performed')
a=J('pos-incidente/MAT-EST-064-plano-acoes.json')['acoes'];check(len(a)==7 and sum(r['status']=='local_tested_on_fixture' for r in a)==6 and a[-1]['status']=='proposta_nao_executada','actions only local')
k=J('indicadores/MAT-EST-065-dicionario-indicadores.json')['registros'];check(len(k)==11,'11 dictionary cards')
snap=J('indicadores/MAT-EST-065-fotografia-inicial.json')['valores'];check(snap['completude_sandbox']==.25 and snap['MAE_B']==3 and snap['MAE_C']==4 and snap['MAE_sucessor'] is None,'K65 snapshot')
trans=J('transferencia/TRANSFER-066-cartoes.json');v=trans['cartoes'];check(len(v)==4 and [x['id'] for x in v]==['R01','R02','R03','R04'],'transfer IDs')
check([x['status'] for x in v]==['avaliavel','avaliavel','pendente','pendente'],'transfer pending')
for x in v[2:]:
 for f in ['observado','previsao_B','previsao_C','erro_B','erro_C']:check(x[f] is None,'no fabricated future '+x['id']+f)
for x in v[:2]:check(x['erro_B']==x['observado']-x['previsao_B'] and x['erro_C']==x['observado']-x['previsao_C'],'error signed '+x['id'])
known=v[:2];mae=lambda mod:sum(abs(x['erro_'+mod]) for x in known)/len(known)
cost=lambda e:3*max(e,0)+max(-e,0)
costmean=lambda mod:sum(cost(x['erro_'+mod]) for x in known)/len(known)
z=J('transferencia/TRANSFER-066-contas.json');check(mae('B')==z['MAE_B']==2.5 and mae('C')==z['MAE_C']==1,'transfer MAE')
check(costmean('B')==z['custo_B']==4.5 and costmean('C')==z['custo_C']==2,'transfer costs')
check(z['completude']==len(known)/len(v)==0.5 and z['media_diferencas']==-1.5,'transfer completion and paired')
with (p/'dados/comparacao-emparelhada-t18-t22.csv').open(encoding='utf-8',newline='') as f:r=list(csv.DictReader(f))
check(len(r)==5,'five historical pairs')
for mod,mae_exp,cost_exp in [('base',17.60,51.20),('desafiante',8.36,14.92)]:
 check(round(sum(float(x['modulo_'+mod]) for x in r)/5,2)==mae_exp,'historical MAE '+mod)
 check(round(sum(float(x['custo_'+mod]) for x in r)/5,2)==cost_exp,'historical cost '+mod)
check(float(r[1]['piora_modulo_desafiante'])==19.2,'historical guard')
qs=J('exercicios.json');ans=J('gabarito-comentado.json');ids=[x['id'] for x in qs]
check(len(ids)==len(set(ids))==36,'36 IDs')
check(ids==[x['id'] for x in ans],'answers same IDs')
for layer,num in [('APR',10),('CON',10),('VES',10),('RET',6)]:check(sum(x['camada']==layer for x in qs)==num,'layer '+layer)
for q,a in zip(qs,ans):
 check(q['origem']=='autoral' and q['id'].startswith('MAT-EST-066-EX-') and len(q['enunciado'])>=70,'question metadata '+q['id'])
 check(len(a['resposta_e_resolucao'])>=85 and bool(a['motivoProvavelDeErro']),'solution depth '+q['id'])
 check(q['id'] in (p/'exercicios.md').read_text(encoding='utf-8') and a['id'] in (p/'gabarito-comentado.md').read_text(encoding='utf-8'),'markdown IDs '+q['id'])
assert len(m['visuais'])==6
for fig in m['visuais']:
 root=ET.parse(p/fig['src']).getroot();ns='{http://www.w3.org/2000/svg}'
 check(root.find(ns+'title') is not None and root.find(ns+'desc') is not None,'accessible SVG '+fig['src'])
 check(len(fig['alt'])>50 and len(fig['conclusaoAudio'])>20,'visual prose '+fig['src'])
 check(fig['src'] in (p/m['aulaMarkdown']).read_text(encoding='utf-8'),'visible figure '+fig['src'])
L=(p/m['aulaMarkdown']).read_text(encoding='utf-8')
for marker in ['TRANSFER-066','MAT-EST-067','não estimável','G3','t19','**Figura 6.**','https://www.youtube.com/watch?v=E91bGT9BjYk','\\frac','\\sum']:
 check(marker in L,'lesson '+marker)
check('\x0c' not in L and '\t' not in L,'latex preserved without control characters')
page=(p/'previa-local.html').read_text(encoding='utf-8')
check('<main id="inicio">' in page and '<html lang="pt-BR">' in page and 'exercicios.md' in page,'semantic html')
check((p/'previa-local.png').stat().st_size>10000,'preview PNG')
ET.parse(p/'previa-ilustrativa.svg');check(len(m['fontes'])>=3,'sources')
manifest=(p/'manifesto-sha256.txt').read_text(encoding='utf-8').splitlines();names=set()
for entry in manifest:
 h,rel=entry.split('  ',1);check(rel not in names and sha(p/rel)==h,'manifest item '+rel);names.add(rel)
expected={x.relative_to(p).as_posix() for x in p.rglob('*') if x.is_file() and '__pycache__' not in x.parts and x.name not in ('manifesto-sha256.txt','relatorio-integridade.json')}
check(names==expected,'manifest all other files')
report=J('relatorio-integridade.json');check(report['all_passed'] and report['previous_zip_sha256']==sha(prev),'report integrity')
outer=p.parent/'MAT-EST-066-pacote-integracao.zip'
if outer.exists():
 with zipfile.ZipFile(outer) as z:
  check(z.testzip() is None,'outer CRC');allfiles={x.relative_to(p).as_posix() for x in p.rglob('*') if x.is_file() and '__pycache__' not in x.parts};check(set(z.namelist())==allfiles,'outer exact membership')
  for name in z.namelist():check(z.read(name)==(p/name).read_bytes(),'outer identity '+name)
print('PASS',n,'verificações; 36 exercícios autorais; 23 históricos idênticos; próximo MAT-EST-067; somente pacote local.')
