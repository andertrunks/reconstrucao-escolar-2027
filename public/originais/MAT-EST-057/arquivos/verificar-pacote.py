#!/usr/bin/env python3
from pathlib import Path
import csv,hashlib,json,zipfile,re,xml.etree.ElementTree as ET
from decimal import Decimal as D
R=Path(__file__).resolve().parent
check_count=0
def ck(c,s):
 global check_count
 assert c,s
 check_count+=1;print('PASS',s)
def digest(p):return hashlib.sha256(p.read_bytes()).hexdigest()
old=json.loads((R/'governanca/hashes-herdados.json').read_text())['hashes_sha256']
ck(len(old)==23 and all(digest(R/p)==v for p,v in old.items()),'23 inherited SHA-256 bytes intact')
p=R/'historico/MAT-EST-056-pacote-integracao.zip'
ck(p.exists() and zipfile.ZipFile(p).testzip() is None and len(zipfile.ZipFile(p).namelist())==71,'full previous 71-file archive preserved')
with zipfile.ZipFile(p) as z:
 ck(z.read('checkpoint-editorial.json')==(R/'historico/checkpoint-MAT-EST-056.json').read_bytes(),'prior checkpoint exact byte copy')
 ck(z.read('metadados.json')==(R/'historico/metadados-MAT-EST-056.json').read_bytes(),'prior metadata exact byte copy')
 ck(all(z.read(path)==(R/path).read_bytes() for path in old),'all 23 inherited files equal prior ZIP contents')
proto=json.loads((R/'protocolo-herdado-MAT-EST-049.json').read_text());suc=json.loads((R/'protocolo-sucessor/MAT-EST-056-PROT-SUC-v1.json').read_text());plan=json.loads((R/'plano-avaliacao-MAT-EST-051.json').read_text())
ck(proto['id']=='MAT-EST-049-PROT-v1' and proto['estado_atual'].startswith('nao_promover'),'old protocol nonpromotion preserved')
ck(suc['estado']=='rascunho_editorial_local' and suc['public_registry']['status']=='não submetido','successor unregistered draft')
ck(suc['new_forecast_emissions']==suc['new_target_observations']==suc['human_authorisations']==0,'zero future forecast/observed/approvals')
ck(plan['emissions_created']==plan['observations_created']==0,'051 plan unexecuted')
pp=list(csv.DictReader((R/'dados/comparacao-emparelhada-t18-t22.csv').open()))
ck(len(pp)==5 and D(pp[1]['piora_modulo_desafiante'])==D('19.2') and D('19.2')>10,'five historical pairs and breached guard')
ck(sum(D(x['modulo_base']) for x in pp)/5==D('17.6') and sum(D(x['modulo_desafiante']) for x in pp)/5==D('8.36'),'inherited MAEs exact')
ck(sum(D(x['custo_base']) for x in pp)/5==D('51.2') and sum(D(x['custo_desafiante']) for x in pp)/5==D('14.92'),'inherited costs exact')
co=list(csv.DictReader((R/'dados/coortes-matriz-editorial-MAT-EST-057.csv').open()))
ck(len(co)==16 and [x['target'] for x in co[-8:]]==[f't{i}' for i in range(26,34)],'16 rows: 5 old, 3 quarantined, 8 future')
ck(all(x['observed_status']=='not_observed' and x['evaluated_pair_count']=='0' for x in co[-11:]),'no new observations or future pairs')
cart=list(csv.DictReader((R/'sandbox/SANDBOX-057-cartoes.csv').open()))
ck(len(cart)==8 and len({x['case_id'] for x in cart})==8 and all(x['sandbox']=='SANDBOX-057' and not x['planned_slot'].startswith('t') for x in cart),'sandbox isolated with eight unique fictional cases')
valid=[x for x in cart if x['inclusion_status_at_cut']=='eligible_demo']
ck(len(valid)==2 and len(cart)-len(valid)==6,'two demonstration pairs and six pending')
b=[D(x['error_base_if_eligible']) for x in valid];c=[D(x['error_challenger_if_eligible']) for x in valid];cost=lambda e:D(3)*max(e,D(0))+max(-e,D(0))
ck(sum(map(abs,b))/2==D('3') and sum(map(abs,c))/2==D('4'),'sandbox MAEs 3 and 4')
ck(sum(map(cost,b))/2==sum(map(cost,c))/2==D('7'),'sandbox mean costs both 7')
ck(D(cart[1]['error_challenger_if_eligible']).__abs__()-D(cart[1]['error_base_if_eligible']).__abs__()==D('3'),'S02 local deterioration 3')
metrics=json.loads((R/'sandbox/SANDBOX-057-resumo-metricas.json').read_text())
ck(metrics['MAE_coorte_confirmatoria_real'] is None and metrics['observacoes_t23_t33_criadas']==0 and metrics['emissoes_t23_t33_criadas']==0,'no real future metrics fabricated')
ck(metrics['intervalos_condicionais_se_limite_didatico_M=10_para_6_pendentes']['base']==['0.75','8.25'] and metrics['intervalos_condicionais_se_limite_didatico_M=10_para_6_pendentes']['desafiante']==['1','8.5'],'conditional hypothetical error bounds correct')
dev=[json.loads(x) for x in (R/'sandbox/SANDBOX-057-desvios.jsonl').read_text().splitlines()]
ck(len(dev)==5 and len({x['id'] for x in dev})==5 and all(x['status']=='illustrative_only' for x in dev),'five clearly hypothetical deviation notices')
q=json.loads((R/'exercicios.json').read_text());g=json.loads((R/'gabarito-comentado.json').read_text());ids=[x['id'] for x in q]
ck(len(q)==len(g)==36 and len(set(ids))==36 and {x['id'] for x in g}==set(ids),'36 unique exercises and separate matched answers')
ck({k:sum(x['camada']==k for x in q) for k in ['APR','CON','VES','RET']}=={'APR':10,'CON':10,'VES':10,'RET':6},'exercise distribution 10/10/10/6')
ck(all(x['origem']=='autoral' and x['id'].startswith('MAT-EST-057-EX-') for x in q),'all new IDs and authored origin')
ck(all(x['resolucao'] and x['motivosDeErro'] for x in g),'answers explain reasoning and error types')
md=next(R.glob('MAT-EST-057-*.md')).read_text()
svg=list((R/'assets').glob('*.svg'))
ck(len(svg)==6 and all(ET.parse(x).getroot().find('{http://www.w3.org/2000/svg}desc') is not None for x in svg),'six semantic valid SVG')
ck(all(f'assets/{x.name}' in md for x in svg) and all(f'Figura {i}.' in md for i in range(1,7)),'six figures linked/captioned in lesson')
ck(md.count('Conclusão por áudio')==6 and '**Resumo pronunciável:**' in md,'audio descriptions and summary')
html=(R/'previa-local.html').read_text()
ck('<main id="conteudo">' in html and 'lang="pt-BR"' in html and 'a:focus-visible' in html and (R/'previa-local.png').stat().st_size>10000,'accessible local preview and PNG exists')
ck('### MAT-EST-057-EX-APR-01' not in html and '<strong>Resolução comentada:' not in html,'no answer key embedded in preview')
meta=json.loads((R/'metadados.json').read_text());cp=json.loads((R/'checkpoint-editorial.json').read_text())
ck(meta['id']=='MAT-EST-057' and meta['questoesAutorais']==36 and meta['questoesOficiais']==0 and len(meta['visuais'])==6,'metadata consistent')
ck(cp['ultimo_pacote_editorial_concluido']=='MAT-EST-057' and cp['proximo_topico_editorial']=='MAT-EST-058' and cp['proximo_estado']=='não iniciado','exact one-step checkpoint')
ck(meta['progressoIndividualAlterado'] is False and 'não iniciado' in cp['progresso_individual'],'personal progress unchanged')
m={line.split('  ',1)[1]:line.split('  ',1)[0] for line in (R/'manifesto-sha256.txt').read_text().splitlines() if '  ' in line}
ck(all((R/k).exists() and digest(R/k)==v for k,v in m.items()),'local SHA-256 manifest fully valid')
print('TOTAL PASS:',check_count)
