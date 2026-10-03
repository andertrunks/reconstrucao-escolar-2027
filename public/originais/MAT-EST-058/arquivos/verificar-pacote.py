#!/usr/bin/env python3
from pathlib import Path
from decimal import Decimal as D
import csv,json,hashlib,zipfile,xml.etree.ElementTree as ET,re
R=Path(__file__).resolve().parent
n=0
def ck(ok,msg):
 global n
 assert ok,msg
 n+=1;print('PASS:',msg)
def hashfile(p):return hashlib.sha256(p.read_bytes()).hexdigest()
old=json.loads((R/'governanca/hashes-herdados.json').read_text(encoding='utf8'))['hashes_sha256']
ck(len(old)==23 and all(hashfile(R/k)==v for k,v in old.items()),'23 preserved base assets SHA256 exactly')
zp=R/'historico/MAT-EST-057-pacote-integracao.zip'
with zipfile.ZipFile(zp) as z:
 ck(z.testzip() is None,'previous ZIP testzip integrity')
 ck(len(z.namelist())==57,'full previous archive with 57 files')
 ck(z.read('checkpoint-editorial.json')==(R/'historico/checkpoint-MAT-EST-057.json').read_bytes(),'previous checkpoint byte-identical')
 ck(z.read('metadados.json')==(R/'historico/metadados-MAT-EST-057.json').read_bytes(),'previous metadata byte-identical')
 ck(all(z.read(k)==(R/k).read_bytes() for k in old),'23 historical bases identical to prior ZIP')
 ck(all(z.read(x)==(R/x).read_bytes() for x in ['sandbox/SANDBOX-057-cartoes.csv','sandbox/SANDBOX-057-desvios.jsonl','sandbox/SANDBOX-057-resumo-metricas.json','dados/coortes-matriz-editorial-MAT-EST-057.csv']),'sandbox and cohort base not overwritten')
pr=json.loads((R/'protocolo-herdado-MAT-EST-049.json').read_text());su=json.loads((R/'protocolo-sucessor/MAT-EST-056-PROT-SUC-v1.json').read_text())
ck(pr['id']=='MAT-EST-049-PROT-v1' and pr['estado_atual'].startswith('nao_promover'),'historical nonpromotion unchanged')
ck(su['id']=='MAT-EST-056-PROT-SUC-v1' and su['estado']=='rascunho_editorial_local' and su['public_registry']['status']=='não submetido','proposed protocol only, not registered')
ck(su['new_forecast_emissions']==su['new_target_observations']==su['human_authorisations']==0,'zero new events or authorisations')
pp=list(csv.DictReader((R/'dados/comparacao-emparelhada-t18-t22.csv').open()))
ck(len(pp)==5 and D(pp[1]['piora_modulo_desafiante'])==D('19.2') and D('19.2')>10,'historical t19 guard breach remains 19.2 > 10')
ck(sum(D(x['modulo_base']) for x in pp)/5==D('17.6') and sum(D(x['modulo_desafiante']) for x in pp)/5==D('8.36'),'original MAEs exact')
ck(sum(D(x['custo_base']) for x in pp)/5==D('51.2') and sum(D(x['custo_desafiante']) for x in pp)/5==D('14.92'),'original costs exact')
co=list(csv.DictReader((R/'dados/coortes-matriz-editorial-MAT-EST-057.csv').open()))
ck(len(co)==16 and sum(x['evaluated_pair_count']=='1' for x in co)==5 and all(x['observed_status']=='not_observed' for x in co[5:]),'historical five; all future/quarantine not observed')
cart=list(csv.DictReader((R/'sandbox/SANDBOX-057-cartoes.csv').open()))
ck(len(cart)==8 and len({x['case_id'] for x in cart})==8 and {x['sandbox'] for x in cart}=={'SANDBOX-057'},'eight unique independent sandbox cards')
valid=[x for x in cart if x['inclusion_status_at_cut']=='eligible_demo']
ck(len(valid)==2 and len(cart)-len(valid)==6,'two valid six pending')
b=[D(x['error_base_if_eligible']) for x in valid];c=[D(x['error_challenger_if_eligible']) for x in valid]
cost=lambda e:D(3)*max(e,D(0))+max(-e,D(0))
ck(b==[D(4),D(-2)] and c==[D(3),D(-5)],'signed errors unchanged')
ck(sum(map(abs,b))/2==3 and sum(map(abs,c))/2==4,'sandbox MAEs three and four')
ck(sum(map(cost,b))/2==sum(map(cost,c))/2==7,'sandbox average costs both seven')
ck([abs(y)-abs(x) for x,y in zip(b,c)]==[D(-1),D(3)],'correct per-pair error differences')
rp=json.loads((R/'relatorios/MAT-EST-058-leitura-critica-SANDBOX-057.json').read_text())
ck(rp['denominador_planejado']==8 and rp['avaliaveis_demonstrativos']==2 and rp['pendentes']==6 and rp['completude_pct']=='25','report keeps both denominators')
ck(rp['resultado_exclusao_pos_resultado_S02_nao_valido_como_primario']['MAE_B']=='4' and rp['resultado_exclusao_pos_resultado_S02_nao_valido_como_primario']['MAE_C']=='3','posthoc select correctly labelled')
ck(rp['condicional_sem_fato_novo']['MAE_B']==['0.75','8.25'] and rp['condicional_sem_fato_novo']['MAE_C']==['1','8.5'],'conditional bounds per model')
ck(rp['condicional_sem_fato_novo']['media_pareada_C_menos_B']==['-7.25','7.75'],'conditional difference bounds')
ck(rp['coorte_confirmatoria_t26_t33']['mae'] is None and rp['observacoes_fabricadas_t23_t33']==0,'no successor result fabricated')
hyp=list(csv.DictReader((R/'relatorios/MAT-EST-058-fotografias-e-contrafactuais.csv').open()))
ck(len(hyp)==6 and all('hipótese' in x['escopo'] or 'não' in x['escopo'] or 'apenas' in x['escopo'] or 'seleção' in x['escopo'] for x in hyp),'clearly scoped original, exploratory and hypothetical rows')
q=json.loads((R/'exercicios.json').read_text());g=json.loads((R/'gabarito-comentado.json').read_text())
ids=[x['id'] for x in q]
ck(len(q)==len(g)==36 and len(set(ids))==36 and set(ids)=={x['id'] for x in g},'36 unique items with separate matched answer key')
ck({k:sum(x['camada']==k for x in q) for k in ['APR','CON','VES','RET']}=={'APR':10,'CON':10,'VES':10,'RET':6},'10/10/10/6 differentiated levels')
ck(all(x['origem']=='autoral' and x['id'].startswith('MAT-EST-058-EX-') for x in q),'all 36 new identifiers with authored origin')
ck(all(len(x['resolucao'])>90 and len(x['devolutiva'])>20 and x['motivosDeErro'] for x in g),'each answer contains explanation and error category')
md=next(R.glob('MAT-EST-058-*.md')).read_text(encoding='utf8')
svgs=list((R/'assets').glob('*.svg'))
ck(len(svgs)==6 and all(ET.parse(p).getroot().find('{http://www.w3.org/2000/svg}desc') is not None for p in svgs),'six semantically described valid SVG files')
ck(all('assets/'+x.name in md for x in svgs) and len(svgs)==6,'all six figures referenced in lesson')
ck(all(f'**Figura {i}' in md for i in range(1,7)) and md.count('Conclusão por áudio')==6,'captions and audio conclusions for all figures')
ck('**Resumo pronunciável:**' in md and '**Revisão espaçada somente após tentativa real:**' in md,'audio summary and conditional spaced review')
html=(R/'previa-local.html').read_text(encoding='utf8')
ck('<main id="conteudo">' in html and 'lang="pt-BR"' in html and 'focus-visible' in html and (R/'previa-local.png').stat().st_size>10000,'semantic HTML and illustration exist')
ck('MAT-EST-058-EX-APR-01' not in html and 'Resolução comentada:' not in html,'answer key is not embedded in preview')
meta=json.loads((R/'metadados.json').read_text());cp=json.loads((R/'checkpoint-editorial.json').read_text())
ck(meta['id']=='MAT-EST-058' and meta['questoesAutorais']==36 and meta['questoesOficiais']==0 and len(meta['visuais'])==6,'metadata consistent')
ck(cp['ultimo_pacote_editorial_concluido']=='MAT-EST-058' and cp['proximo_topico_editorial']=='MAT-EST-059' and cp['proximo_estado']=='não iniciado','checkpoint advances exactly one step')
ck(meta['progressoIndividualAlterado']==False and 'inalterado' in cp['progresso_individual'],'no personal progress changed')
m={row.split('  ',1)[1]:row.split('  ',1)[0] for row in (R/'manifesto-sha256.txt').read_text().splitlines() if '  ' in row}
ck(len(m)>35 and all((R/x).exists() and hashfile(R/x)==v for x,v in m.items()),'all manifest SHA256 entries valid')
print('TOTAL PASS:',n)
