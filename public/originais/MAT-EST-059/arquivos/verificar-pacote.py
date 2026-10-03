#!/usr/bin/env python3
from pathlib import Path
from decimal import Decimal as D
import csv,json,hashlib,zipfile,xml.etree.ElementTree as ET,re
R=Path(__file__).resolve().parent;n=0
def ck(ok,msg):
 global n
 assert ok,msg
 n+=1;print('PASS:',msg)
def hs(p):return hashlib.sha256(p.read_bytes()).hexdigest()
old=json.loads((R/'governanca/hashes-herdados.json').read_text())['hashes_sha256']
ck(len(old)==23,'23 base invariants listed')
ck(all(hs(R/p)==d for p,d in old.items()),'23 base inherited files byte-identical SHA256')
pz=R/'historico/MAT-EST-058-pacote-integracao.zip'
with zipfile.ZipFile(pz) as z:
 ck(z.testzip() is None,'whole previous ZIP integrity')
 ck(z.read('checkpoint-editorial.json')==(R/'historico/checkpoint-MAT-EST-058.json').read_bytes(),'previous checkpoint exact copy')
 ck(z.read('metadados.json')==(R/'historico/metadados-MAT-EST-058.json').read_bytes(),'previous metadata exact copy')
 ck(all(z.read(p)==(R/p).read_bytes() for p in old),'base files exactly match previous zip')
 for p in ['sandbox/SANDBOX-057-cartoes.csv','sandbox/SANDBOX-057-desvios.jsonl','sandbox/SANDBOX-057-resumo-metricas.json','protocolo-sucessor/MAT-EST-056-PROT-SUC-v1.json','relatorios/MAT-EST-058-leitura-critica-SANDBOX-057.json']:
  ck(z.read(p)==(R/p).read_bytes(),f'{p} exact copy')
pr=json.loads((R/'protocolo-herdado-MAT-EST-049.json').read_text())
su=json.loads((R/'protocolo-sucessor/MAT-EST-056-PROT-SUC-v1.json').read_text())
ck(pr['id']=='MAT-EST-049-PROT-v1' and pr['estado_atual'].startswith('nao_promover'),'historical protocol unchanged and nonpromotion')
ck(su['id']=='MAT-EST-056-PROT-SUC-v1' and su['estado']=='rascunho_editorial_local','successor remains local draft')
ck(su['new_forecast_emissions']==su['new_target_observations']==su['human_authorisations']==0,'no new successor data and approvals')
pp=list(csv.DictReader((R/'dados/comparacao-emparelhada-t18-t22.csv').open()))
ck(len(pp)==5 and D(pp[1]['piora_modulo_desafiante'])==D('19.2')>10,'five historical pairs and t19 guard violation retained')
ck(sum(D(x['modulo_base']) for x in pp)/5==D('17.6') and sum(D(x['modulo_desafiante']) for x in pp)/5==D('8.36'),'historical MAEs exact')
ck(sum(D(x['custo_base']) for x in pp)/5==D('51.2') and sum(D(x['custo_desafiante']) for x in pp)/5==D('14.92'),'historical costs exact')
cart=list(csv.DictReader((R/'sandbox/SANDBOX-057-cartoes.csv').open()))
valid=[x for x in cart if x['inclusion_status_at_cut']=='eligible_demo']
ck(len(cart)==8 and len(valid)==2 and len(cart)-len(valid)==6,'sandbox 8 cards 2 eligible 6 missing')
b=[D(x['error_base_if_eligible']) for x in valid];c=[D(x['error_challenger_if_eligible']) for x in valid]
ck(b==[4,-2] and c==[3,-5],'original signed error arrays')
ck(sum(map(abs,b))/2==3 and sum(map(abs,c))/2==4,'sandbox MAE exact')
cost=lambda e:D(3)*max(e,D(0))+max(-e,D(0))
ck(sum(map(cost,b))/2==sum(map(cost,c))/2==7,'sandbox cost means exact')
ck([abs(y)-abs(x) for x,y in zip(b,c)]==[-1,3],'paired differences unchanged')
report=json.loads((R/'relatorios/MAT-EST-059-painel-dados.json').read_text())
ck(report['sandbox']['MAE_B']==3 and report['sandbox']['MAE_C']==4 and report['sandbox']['media_diferencas']==1,'derived display values exact')
ck(report['sandbox']['limites_M_10']['MAE_B']==[.75,8.25] and report['sandbox']['limites_M_10']['MAE_C']==[1,8.5],'hypothetical intervals exact')
ck(report['sandbox']['limites_M_10']['diferenca_C_menos_B']==[-7.25,7.75] and report['sandbox']['limites_M_10']['premissa_nao_validada'],'conditional difference with warning')
ck(report['sucessor']['MAE'] is None and report['sucessor']['emissoes']==report['sucessor']['observados']==0,'successor metrics null, no fabricated data')
claims=json.loads((R/'relatorios/MAT-EST-059-matriz-afirmacoes-fontes-limites.json').read_text())
ck(len(claims['afirmacoes'])==10 and len({x['id'] for x in claims['afirmacoes']})==10,'10 unique auditable claim IDs')
ck(all((R/x['origem']).exists() and x['limite'] and x['derivacao'] for x in claims['afirmacoes']),'claim matrix has existing source and limitation')
rows=list(csv.DictReader((R/'relatorios/MAT-EST-059-quadro-escopos.csv').open()))
ck(len(rows)==4 and rows[2]['n_avaliavel']=='0' and not rows[2]['MAE_B_unidade'],'scope table keeps successor metric blank not 0')
Q=json.loads((R/'exercicios.json').read_text());G=json.loads((R/'gabarito-comentado.json').read_text());ids=[x['id'] for x in Q]
ck(len(Q)==len(G)==len(set(ids))==36 and set(ids)=={x['id'] for x in G},'36 distinct exercises, matched separate answer IDs')
ck({k:sum(x['camada']==k for x in Q) for k in ['APR','CON','VES','RET']}=={'APR':10,'CON':10,'VES':10,'RET':6},'10/10/10/6 question layers')
ck(all(x['origem']=='autoral' and x['id'].startswith('MAT-EST-059-EX-') for x in Q),'new IDs and authored origin')
ck(all(len(x['resolucao'])>100 and x['motivosDeErro'] and x['devolutiva'] for x in G),'commented resolutions and error categories')
lesson=(R/'MAT-EST-059-comunicacao-comparativa-desempenho-temporal-graficos-honestos-incerteza-condicional-relatorio-executivo-verificavel.md').read_text()
svgs=list((R/'assets').glob('*.svg'))
ck(len(svgs)==6 and all(ET.parse(x).getroot().find('{http://www.w3.org/2000/svg}desc') is not None for x in svgs),'6 accessible SVGs are XML valid with description')
ck(all('assets/'+x.name in lesson for x in svgs),'all SVGs referenced from article')
ck(all(f'**Figura {i}' in lesson for i in range(1,7)) and lesson.count('Conclusão por áudio')==6,'six numbered audio-complete captions')
ck('**Resumo pronunciável:**' in lesson and '**Revisão espaçada somente após tentativa real:**' in lesson,'audio summary and spaced review conditioned on real attempt')
ck('t23–t25' in lesson and 't26–t33' in lesson and 'não estimável' in lesson,'no future target confused with observations')
ck('não são intervalos de confiança' in lesson.lower() and 'hipotético' in lesson,'limits not presented as confidence statements')
ht=(R/'previa-local.html').read_text();ck('<main id="conteudo">' in ht and 'lang="pt-BR"' in ht and 'focus-visible' in ht and (R/'previa-local.png').stat().st_size>10000,'semantic accessible HTML plus illustrative preview')
ck('MAT-EST-059-EX-APR-01' not in ht and 'Gabarito comentado separado' not in ht,'answer key not leaked into HTML article')
meta=json.loads((R/'metadados.json').read_text());cp=json.loads((R/'checkpoint-editorial.json').read_text())
ck(meta['id']=='MAT-EST-059' and meta['questoesAutorais']==36 and meta['questoesOficiais']==0 and len(meta['visuais'])==6,'metadata consistent')
ck(cp['ultimo_pacote_editorial_concluido']=='MAT-EST-059' and cp['proximo_topico_editorial']=='MAT-EST-060' and cp['proximo_estado']=='não iniciado','checkpoint exactly one step')
ck(meta['progressoIndividualAlterado']==False and 'inalterado' in cp['progresso_individual'],'user progress untouched')
m={x.split('  ',1)[1]:x.split('  ',1)[0] for x in (R/'manifesto-sha256.txt').read_text().splitlines() if '  ' in x}
ck(len(m)>40 and all((R/k).exists() and hs(R/k)==v for k,v in m.items()),'whole manifest SHA-256 verified')
print('TOTAL PASS:',n)
