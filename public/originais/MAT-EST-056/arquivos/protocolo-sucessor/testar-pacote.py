#!/usr/bin/env python3
"""Verificações locais de estrutura, proveniência e matemática didática da MAT-EST-056.
Não autentica origem externa, momento real de emissão, pré-registro ou estudo do aluno.
"""
from pathlib import Path
import hashlib,json,csv,re,zipfile,xml.etree.ElementTree as ET
from decimal import Decimal as D
R=Path(__file__).resolve().parents[1]
def digest(path):return hashlib.sha256(path.read_bytes()).hexdigest()
def check(cond, name):
 if not cond:raise AssertionError(name)
 print('PASS:',name)
checks=0
def t(cond,name):
 global checks
 check(cond,name); checks+=1
old=json.loads((R/'governanca/hashes-herdados.json').read_text())['hashes_sha256']
t(len(old)==23, '23 arquivos herdados declarados')
t(all((R/p).is_file() and digest(R/p)==h for p,h in old.items()), '23 arquivos herdados preservados byte a byte')
proto=json.loads((R/'protocolo-herdado-MAT-EST-049.json').read_text())
plan=json.loads((R/'plano-avaliacao-MAT-EST-051.json').read_text())
t(proto['id']=='MAT-EST-049-PROT-v1' and proto['estado_atual'].startswith('nao_promover'), 'Protocolo antigo preserva conclusão')
t(plan['id']=='MAT-EST-051-PLAN-v1' and plan['emissions_created']==0 and plan['observations_created']==0, 'Plano antigo permanece não executado')
pair=list(csv.DictReader((R/'dados/comparacao-emparelhada-t18-t22.csv').open(encoding='utf-8')))
t(len(pair)==5 and [x['alvo'] for x in pair]==[f't{i}' for i in range(18,23)], 'Cinco pares históricos t18–t22 intactos')
t(D(pair[1]['modulo_desafiante'])-D(pair[1]['modulo_base'])==D('19.2') and D('19.2')>10, 'Guarda t19 = 19,2 > 10')
t(sum(D(x['modulo_base']) for x in pair)/5==D('17.6') and sum(D(x['modulo_desafiante']) for x in pair)/5==D('8.36'), 'MAEs herdados exatos')
t(sum(D(x['custo_base']) for x in pair)/5==D('51.2') and sum(D(x['custo_desafiante']) for x in pair)/5==D('14.92'), 'Custos herdados exatos')
t((D('17.60')-D('8.36'))/D('17.60')*100==D('52.500'), 'Redução parcial MAE 52,5%')
t((D('51.20')-D('14.92'))/D('51.20')*100==D('70.85937500'), 'Redução parcial custo 70,859375%')
s=json.loads((R/'protocolo-sucessor/MAT-EST-056-PROT-SUC-v1.json').read_text())
t(s['id']!='MAT-EST-049-PROT-v1' and s['altera_historico'] is False, 'Protocolo sucessor tem ID distinto')
t(s['estado']=='rascunho_editorial_local' and s['public_registry']['status']=='não submetido', 'Sem falso pré-registro externo')
t(s['new_forecast_emissions']==s['new_target_observations']==s['human_authorisations']==0, 'Nenhuma emissão, observação ou autorização inventada')
t(s['alvos_confirmatorios_propostos']==[f't{i}' for i in range(26,34)], 'Oito alvos futuros t26–t33 apenas propostos')
t(s['zona_de_quarentena']==['t23','t24','t25'], 't23–t25 segregados')
t(s['referencia']['id']=='BASE-SNAIVE-v1' and s['desafiante']['id']=='CHAL-SDELTA5-v1', 'Identificadores de modelos mantidos')
t(s['criterios_didaticos_congelaveis_antes_execucao']['piora_local_maxima']==10, 'Nova guarda proposta tem parâmetro expresso')
q=json.loads((R/'exercicios.json').read_text());g=json.loads((R/'gabarito-comentado.json').read_text());ids=[x['id'] for x in q]
t(len(q)==len(g)==36 and len(ids)==len(set(ids)) and {x['id'] for x in g}==set(ids), '36 questões únicas com gabaritos correspondentes')
t(all(x['origem']=='autoral' and x['id'].startswith('MAT-EST-056-EX-') for x in q), 'Questões novas autorais e corretamente prefixadas')
t({c:sum(x['camada']==c for x in q) for c in ['APR','CON','VES','RET']}=={'APR':10,'CON':10,'VES':10,'RET':6}, 'Três camadas e reteste: 10/10/10/6')
t(all(x.get('resolucao') and x.get('motivosDeErro') for x in g), 'Gabaritos comentados e tipos de erro separados')
md=(R/'MAT-EST-056-revisao-controlada-experimentos-temporais-protocolo-sucessor-pre-registro-prevencao-contaminacao.md').read_text()
svg=list((R/'assets').glob('*.svg'))
t(len(svg)==6 and all(ET.parse(p).getroot().find('{http://www.w3.org/2000/svg}desc') is not None for p in svg),'Seis SVGs com descrição semântica')
t(all(('assets/'+p.name) in md for p in svg),'Todos os recursos visuais referenciados na aula')
t(all(re.search(r'Figura '+str(i)+r'\.',md) for i in range(1,7)), 'Seis legendas de figura presentes')
t(len(re.findall(r'\*\*Figura \d\.',md))==6 and md.count('Conclusão por áudio')>=5,'Legendas e explicações pronunciáveis')
t((R/'previa-local.html').exists() and '<main id="conteudo">' in (R/'previa-local.html').read_text() and (R/'previa-local.png').stat().st_size>10000,'Prévias HTML e PNG disponíveis')
meta=json.loads((R/'metadados.json').read_text());cp=json.loads((R/'checkpoint-editorial.json').read_text())
t(meta['id']=='MAT-EST-056' and meta['questoesOficiais']==0 and len(meta['visuais'])==6,'Metadados e origem coerentes')
t(cp['ultimo_pacote_editorial_concluido']=='MAT-EST-056' and cp['proximo_topico_editorial']=='MAT-EST-057','Checkpoint avança exatamente uma etapa')
t(cp['progresso_individual'].startswith('não iniciado') and len(cp['nao_alegar'])>=10,'Progresso não alterado e limites explícitos')
t((R/'historico/MAT-EST-055/checkpoint-editorial.json').exists() and (R/'historico/MAT-EST-055/assets').is_dir(),'Checkpoint anterior e visuais arquivados')
manifest=R/'manifesto-sha256.txt'
if manifest.exists():
 lines=manifest.read_text().splitlines();m={line.split('  ',1)[1]:line.split('  ',1)[0] for line in lines if '  ' in line}
 t(all((R/p).exists() and digest(R/p)==h for p,h in m.items()), 'Manifesto SHA-256 confere para todos os arquivos listados')
print('TOTAL CHECKS:', checks)
