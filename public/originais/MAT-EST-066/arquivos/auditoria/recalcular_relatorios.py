#!/usr/bin/env python3
"""Recalcular auditoria didática MAT-EST-054 sem pacotes externos.

Não certifica emissões reais, não lê valores futuros da série principal e não altera os
arquivos herdados. Execute na raiz de MAT-EST-054:
  python auditoria/recalcular_relatorios.py
  python auditoria/recalcular_relatorios.py --verify
"""
import argparse
import csv
import hashlib
import io
import json
from decimal import Decimal
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / 'dados'
OUT = ROOT / 'relatorios'


def sha(p):
    return hashlib.sha256(p.read_bytes()).hexdigest()


def num(x):
    return Decimal(str(x))


def fmt(x):
    return format(x.quantize(Decimal('0.01')), 'f')


def cost(error):
    return Decimal(3) * max(error, Decimal(0)) + max(-error, Decimal(0))


def csv_rows(name):
    with (DATA / name).open(encoding='utf-8-sig', newline='') as f:
        return list(csv.DictReader(f))


def events(name):
    return [json.loads(x) for x in (DATA / name).read_text(encoding='utf-8').splitlines() if x.strip()]


def inspect_chain(rows):
    prev = 'GENESIS-SIMULATED'
    for n, event in enumerate(rows, 1):
        assert event['seq'] == n and event['previous_digest'] == prev, 'cadeia ou ordem inválida'
        digest = event['digest']
        body = dict(event)
        body.pop('digest')
        raw = json.dumps(body, sort_keys=True, ensure_ascii=False, separators=(',', ':')).encode('utf-8')
        assert hashlib.sha256(raw).hexdigest() == digest, 'digest divergente'
        prev = digest
    return {'eventos': len(rows), 'hash_final': prev, 'alcance': 'somente integridade relativa ao arquivo de referência; não autentica tempo ou autor'}


def report_main():
    rows = csv_rows('comparacao-emparelhada-t18-t22.csv')
    assert [r['alvo'] for r in rows] == ['t18','t19','t20','t21','t22']
    sums = {'B_abs': Decimal(0), 'C_abs': Decimal(0), 'B_cost': Decimal(0), 'C_cost': Decimal(0)}
    checked = []
    for r in rows:
        y, b, c = map(num, (r['observado'], r['base'], r['desafiante']))
        eb, ec = y-b, y-c
        ab, ac = abs(eb), abs(ec)
        cb, cc = cost(eb), cost(ec)
        for k, v in [('erro_base',eb),('erro_desafiante',ec),('modulo_base',ab),('modulo_desafiante',ac),('custo_base',cb),('custo_desafiante',cc),('piora_modulo_desafiante',ac-ab)]:
            assert num(r[k]) == v, f'{r["alvo"]}: coluna {k} divergiu'
        sums['B_abs'] += ab; sums['C_abs'] += ac
        sums['B_cost'] += cb; sums['C_cost'] += cc
        checked.append({'pair_id':r['id'], 'alvo':r['alvo'], 'erro_B':fmt(eb), 'erro_C':fmt(ec), 'modulo_B':fmt(ab), 'modulo_C':fmt(ac), 'custo_B':fmt(cb), 'custo_C':fmt(cc), 'deterioracao_local_C_menos_B':fmt(ac-ab)})
    n = len(rows)
    assert n == 5 and sums == {'B_abs':num(88),'C_abs':num('41.8'),'B_cost':num(256),'C_cost':num('74.6')}
    assert checked[1]['deterioracao_local_C_menos_B'] == '19.20'
    return {'namespace':'SERIE-PRINCIPAL-FICTICIA', 'simulation_only':True, 'alvos':[r['alvo'] for r in rows], 'n_pares':n, 'planejados':8, 'somas':{k:fmt(v) for k,v in sums.items()}, 'medias':{k:fmt(v/n) for k,v in sums.items()}, 'deterioracao_t19':'19.20', 'guarda_maxima':'10.00', 'guarda_violada': True, 'decisao':'não promover sob MAT-EST-049-PROT-v1', 'linhas':checked}


def report_v():
    forecasts = events('EXEMPLO-V-eventos.jsonl')
    pred = {x['model']:(x['id'],num(x['value'])) for x in forecasts if x['kind']=='forecast_toy'}
    assert pred.keys() == {'B','C'} and pred['B'][1] == 42 and pred['C'][1] == 43
    obs = csv_rows('EXEMPLO-V-versoes.csv')
    assert len(obs)==2 and obs[1]['corrects_id']==obs[0]['observation_id']
    cuts = {'L11':11,'L12':12,'L13':13}
    reports=[]
    for cut,t in cuts.items():
        avail = [r for r in obs if int(r['logical_release'][1:]) <= t]
        for policy in ('AS_KNOWN','VALIDATED_AS_OF'):
            candidate = [r for r in avail if policy == 'AS_KNOWN' or r['quality']=='validado']
            if not candidate:
                reports.append({'namespace':'EXEMPLO-V-ISOLADO','corte':cut,'politica':policy,'status':'pendente','n_alvos':0,'metricas':None, 'observacao_id':None,'nota':'não imputar zero nem usar versões posteriores'})
                continue
            ob = candidate[-1]
            val = num(ob['value'])
            metrics={}
            for model,(pid,forecast) in sorted(pred.items()):
                e = val - forecast
                metrics[model]={'previsao_id':pid,'previsao':fmt(forecast),'erro':fmt(e),'erro_absoluto':fmt(abs(e)),'custo_3_1':fmt(cost(e))}
            reports.append({'namespace':'EXEMPLO-V-ISOLADO','corte':cut,'politica':policy,'status':'preliminar' if ob['quality']=='preliminar' else 'validado','n_alvos':1,'metricas':metrics,'observacao_id':ob['observation_id'],'valor_observado':fmt(val),'natureza':'recálculo local, não emissão ou relatório histórico autenticado'})
    return reports


def report_z():
    rows=events('ensaio-eventos-EXEMPLO-Z.jsonl')
    chain=inspect_chain(rows)
    assert len(rows)==7
    assert rows[0]['payload']['forecast']==29
    assert rows[2]['payload']['observed_value']==30 and rows[4]['payload']['observed_value']==32
    pre = num(rows[2]['payload']['observed_value']) - num(rows[0]['payload']['forecast'])
    final = num(rows[4]['payload']['observed_value']) - num(rows[0]['payload']['forecast'])
    assert pre == 1 and final == 3 and cost(pre)==3 and cost(final)==9
    return {'namespace':'EXEMPLO-Z-ISOLADO','simulation_only':True,'verificacao_cadeia':chain,'avaliacoes':[{'corte':'L4','observacao_event_id':rows[2]['event_id'],'avaliacao_event_id':rows[3]['event_id'],'status':'preliminar_não_final','erro':fmt(pre),'custo':fmt(cost(pre))},{'corte':'L6','observacao_event_id':rows[4]['event_id'],'avaliacao_event_id':rows[5]['event_id'],'status':'retificado_validado','erro':fmt(final),'custo':fmt(cost(final))}],'n_alvos_distintos':1}


def construct():
    input_names = ['comparacao-emparelhada-t18-t22.csv','EXEMPLO-V-eventos.jsonl','EXEMPLO-V-versoes.csv','EXEMPLO-V-reavaliacao.csv','ensaio-eventos-EXEMPLO-Z.jsonl','politicas-de-vintage.json']
    provenance = {f'dados/{name}':sha(DATA/name) for name in input_names}
    provenance['protocolo-herdado-MAT-EST-049.json']=sha(ROOT/'protocolo-herdado-MAT-EST-049.json')
    provenance['plano-avaliacao-MAT-EST-051.json']=sha(ROOT/'plano-avaliacao-MAT-EST-051.json')
    provenance['auditoria/recalcular_relatorios.py']=sha(Path(__file__))
    main, v, z = report_main(), report_v(), report_z()
    summary={'id':'MAT-EST-054-AUDIT-v1','simulation_only':True,'regra_corte':'versão disponível até o corte; qualificação explícita; nenhum dado futuro como insumo da previsão','proveniencia_SHA256':provenance,'serie_principal':main,'exemplo_V':v,'exemplo_Z':z,'restricoes':['Namespaces isolados: Z e V não aumentam n=5 de 8 da série','Não há observações t23–t25','Snapshots de avaliação recalculados são didáticos, não timestamps certificados','SHA-256 não certifica origem, veracidade ou data passada','A falha t19 permanece irrevogável no protocolo congelado']}
    json_text = json.dumps(summary, ensure_ascii=False, sort_keys=True, indent=2)+'\n'
    output=io.StringIO(newline='')
    writer=csv.writer(output,lineterminator='\n')
    writer.writerow(['namespace','corte','politica','observacao_id','estado','n_alvos','erro_B','MAE_B','custo_B','erro_C','MAE_C','custo_C','observacao_documentada'])
    for entry in v:
        metrics=entry['metricas'] or {}
        writer.writerow(['EXEMPLO-V-ISOLADO',entry['corte'],entry['politica'],entry['observacao_id'] or '',entry['status'],entry['n_alvos'], metrics.get('B',{}).get('erro',''),metrics.get('B',{}).get('erro_absoluto',''),metrics.get('B',{}).get('custo_3_1',''),metrics.get('C',{}).get('erro',''),metrics.get('C',{}).get('erro_absoluto',''),metrics.get('C',{}).get('custo_3_1',''),entry.get('valor_observado','')])
    writer.writerow(['SERIE-PRINCIPAL-FICTICIA','t22','MAT-EST-049-PROT-v1','conjunto t18–t22','simulação editorial',5,'',main['medias']['B_abs'],main['medias']['B_cost'],'',main['medias']['C_abs'],main['medias']['C_cost'],'não extrapolar para t23–t25'])
    for entry in z['avaliacoes']:
        writer.writerow(['EXEMPLO-Z-ISOLADO',entry['corte'],'AS_KNOWN' if entry['corte']=='L4' else 'VALIDATED_AS_OF',entry['observacao_event_id'],entry['status'],1,entry['erro'],str(abs(num(entry['erro']))),entry['custo'],'','','','única previsão 29, não modelo B/C'])
    return {'relatorio-auditoria.json':json_text.encode('utf-8'),'conciliacao-de-versoes.csv':output.getvalue().encode('utf-8')}


def main():
    p=argparse.ArgumentParser();p.add_argument('--verify',action='store_true',help='comparar saída byte a byte sem escrever')
    a=p.parse_args(); generated=construct()
    if not a.verify: OUT.mkdir(exist_ok=True)
    for name,blob in generated.items():
        path=OUT/name
        if a.verify: assert path.read_bytes()==blob, f'{name}: divergência byte a byte'
        else: path.write_bytes(blob)
    print('OK:', 'verificação de reprodução' if a.verify else 'relatórios gerados',len(generated),'arquivos; seis snapshots V, um principal e duas avaliações Z')

if __name__=='__main__': main()
