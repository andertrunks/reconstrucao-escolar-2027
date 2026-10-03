from pathlib import Path
from decimal import Decimal as D
import csv,json,hashlib,re,sys
ROOT=Path(__file__).resolve().parents[1]
def load(path):return json.loads((ROOT/path).read_text(encoding='utf8'))
def h(path):return hashlib.sha256((ROOT/path).read_bytes()).hexdigest()
def evaluate(recipe,source,metrics):
 errors=[]
 def require(ok,code):
  if not ok:errors.append(code)
 for path,digest in source['upstream_sha256'].items(): require(h(path)==digest,'UPSTREAM_HASH_DIVERGENT:'+path)
 require(recipe['source_hash']==source['upstream_sha256']['sandbox/SANDBOX-057-cartoes.csv'],'REPORT_SOURCE_HASH_DIVERGENT')
 require(recipe['source_case_count']==metrics['planned'],'PLANNED_COUNT_MISMATCH')
 require(recipe['denominator']==metrics['eligible'],'DENOMINATOR_MISMATCH')
 for field in ('MAE_B','MAE_C','cost_B','cost_C'):
  val=metrics[{'MAE_B':'MAE_B_units','MAE_C':'MAE_C_units','cost_B':'mean_cost_B_points','cost_C':'mean_cost_C_points'}[field]]
  require(recipe[field]==val,'METRIC_MISMATCH:'+field)
 require(recipe['successor_MAE'] is None,'NOT_ESTIMABLE_MUST_BE_NULL')
 require(recipe['unit_MAE']=='unidades' and recipe['unit_cost']=='pontos','UNIT_MISMATCH')
 require(recipe['bar_axis_min']==0,'BAR_AXIS_ZERO_REQUIRED')
 require(bool(recipe['alt'].strip()) and 'dois de oito' in recipe['alt'].lower(),'ALT_INSUFFICIENT')
 require(bool(recipe['caption'].strip()) and 'corte A' in recipe['caption'],'CAPTION_MISSING_CONTEXT')
 require('aprovad' not in recipe['interpretation'].lower() and 'promovid' not in recipe['interpretation'].lower(),'DECISION_UNSUPPORTED')
 return errors

def audit():
 src=load('auditoria/MAT-EST-060-fonte-congelada.json'); rows=list(csv.DictReader((ROOT/'sandbox/SANDBOX-057-cartoes.csv').open(encoding='utf8',newline='')))
 eligible=[x for x in rows if x['inclusion_status_at_cut']=='eligible_demo']
 b=[D(x['error_base_if_eligible']) for x in eligible]; c=[D(x['error_challenger_if_eligible']) for x in eligible]
 cost=lambda x: 3*max(x,D(0))+max(-x,D(0))
 metrics={'planned':len(rows),'eligible':len(eligible),'pending':len(rows)-len(eligible),'MAE_B_units':float(sum(map(abs,b))/len(b)),'MAE_C_units':float(sum(map(abs,c))/len(c)),'mean_cost_B_points':float(sum(map(cost,b))/len(b)),'mean_cost_C_points':float(sum(map(cost,c))/len(c))}
 records=load('auditoria/MAT-EST-060-fixtures-didaticos.json')['recipes']; out=[]
 for recipe in records:
  errors=evaluate(recipe,src,metrics)
  result='APTO_EM_TESTES_AUTOMATICOS' if not errors else 'REPROVADO'
  out.append({'id':recipe['id'],'case':recipe['case'],'expected':recipe['expected'],'result':result,'check_codes':errors,'matches_expected':result==recipe['expected']})
 return {'id':'MAT-EST-060-DEMO-AUDIT-v1','type':'verificação local de cenários didáticos, sem publicação e sem teste assistivo manual','sources':src['upstream_sha256'],'metrics':metrics,'automated_checks':out,'all_expected':all(x['matches_expected'] for x in out),'manual_gates_pending':['leitura em voz alta real no Edge','leitor de tela real','zoom e reflow em navegador real','reprodução completa do vídeo','aprovação editorial humana','integração e publicação']}
if __name__=='__main__':
 result=audit();print(json.dumps(result,ensure_ascii=False,indent=2));sys.exit(0 if result['all_expected'] else 1)
