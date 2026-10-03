from pathlib import Path
import json, hashlib, zipfile, csv, xml.etree.ElementTree as ET, importlib.util
R=Path(__file__).resolve().parent;checks=[]
def h(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def check(condition,label):
    checks.append(label)
    if not condition:raise AssertionError(label)
M=json.loads((R/'metadados.json').read_text(encoding='utf8'))
check(M['id']=='MAT-EST-062' and M['proximoTopico']=='MAT-EST-063','metadata and next')
check(not any(M[k] for k in ('publicacaoSite','sincronizacaoDrive','sincronizacaoGithub','testeManualEdge','revisaoHumanaReal','progressoIndividualAlterado','estudoRegistrado','reproducaoVideoIntegral')),'no fabricated outcomes')
cp=json.loads((R/'checkpoint-editorial.json').read_text(encoding='utf8'))
check(cp['ultimo_pacote_editorial_concluido']=='MAT-EST-062' and cp['proximo_topico_editorial']=='MAT-EST-063','checkpoint next step')
inv=json.loads((R/'governanca/hashes-herdados.json').read_text(encoding='utf8'))['hashes_sha256'];check(len(inv)==23,'23 invariant hash entries')
for n,d in inv.items():check((R/n).is_file() and h(R/n)==d,'invariant '+n)
prev=R/'historico/MAT-EST-061-pacote-integracao.zip'
check(h(prev)==cp['sha256_pacote_anterior'],'previous zip hash')
with zipfile.ZipFile(prev) as z:check(z.testzip() is None and len(z.namelist())==68,'previous zip intact 68')
q=json.loads((R/'exercicios.json').read_text(encoding='utf8'));a=json.loads((R/'gabarito-comentado.json').read_text(encoding='utf8'))
ids=[v['id'] for v in q];check(len(ids)==36 and len(ids)==len(set(ids)),'36 unique exercises');check(ids==[x['id'] for x in a],'aligned answer ids')
for k,n in [('APR',10),('CON',10),('VES',10),('RET',6)]:check(sum(x['camada']==k for x in q)==n,'exercise layer '+k)
check(all(x['origem']=='autoral' for x in q),'only authorial')
for x in q:check(x['id'].startswith('MAT-EST-062-EX-') and len(x['enunciado'])>40,'valid item '+x['id'])
for x in a:check(len(x['resposta_e_resolucao'])>60 and x['motivoProvavelDeErro'],'explained answer '+x['id'])
check(len(M['visuais'])==6,'six metadata visuals')
for v in M['visuais']:
    p=R/v['src'];root=ET.parse(p).getroot();ns='{http://www.w3.org/2000/svg}'
    check(bool(root.find(ns+'title') is not None and root.find(ns+'title').text and root.find(ns+'desc') is not None and root.find(ns+'desc').text),'accessible SVG '+p.name)
    check(bool(v['alt'] and 'autoria' in v),'alt and authorship '+p.name)
root=ET.parse(R/'previa-ilustrativa.svg').getroot();check(root.find('{http://www.w3.org/2000/svg}desc') is not None,'preview original visual alt')
ev=json.loads((R/'controle/MAT-EST-062-matriz-evidencias.json').read_text(encoding='utf8'))
old=json.loads((R/'regressao/MAT-EST-061-registro-evidencias.json').read_text(encoding='utf8'))
states=[x['status_atual'] for x in ev['registros']];check(states==['checked_local']*2+['pending']*4+['not_performed']*2,'unchanged gate states')
check([x['id'] for x in ev['registros']]==[x['code'] for x in old['records']],'same gate ids')
check(all(x['responsavel_real'] is None and x['evidencia_adicional'] is None and x['data_execucao_externa'] is None for x in ev['registros']),'no fake human evidence')
check(ev['url_publica'] is None and ev['commit_publicado'] is None and ev['autorizacao_humana'] is None,'no false publication')
post=json.loads((R/'controle/MAT-EST-062-plano-pos-deploy.json').read_text(encoding='utf8'))
check(len(post['itens'])==10 and not post['executado'] and all(x['status']=='not_performed' and x['evidencia_real'] is None for x in post['itens']),'post-deploy remains plan')
with (R/'controle/MAT-EST-062-pendencias.csv').open(encoding='utf8',newline='') as f:rows=list(csv.DictReader(f))
check(len(rows)==6 and [x['gate'] for x in rows]==['G3','G4','G5','G6','G7','G8'],'pending gates')
fixture=json.loads((R/'controle/MAT-EST-062-ensaios-estados.json').read_text(encoding='utf8'))
check(len(fixture['cenarios'])==6 and all(not x['evidencia_real'] for x in fixture['cenarios']),'synthetic fixtures labeled')
spec=importlib.util.spec_from_file_location('states',R/'controle/testar_estados.py');mod=importlib.util.module_from_spec(spec);spec.loader.exec_module(mod)
check(all(out==expected for _,out,expected in mod.run()),'fixture expected results')
panel=json.loads((R/'relatorios/MAT-EST-059-painel-dados.json').read_text(encoding='utf8'))
check(panel['sandbox']['MAE_B']==3 and panel['sandbox']['MAE_C']==4 and panel['sandbox']['avaliaveis']==2 and panel['sandbox']['planejados']==8,'sandbox metrics unchanged')
check(panel['historico']['guarda_t19']==19.2 and panel['historico']['limite_guarda']==10 and panel['historico']['promocao_C'] is False,'guard and original decision')
check(panel['sucessor']['pares']==0 and panel['sucessor']['MAE'] is None,'no fabricated future data')
lesson=(R/M['aulaMarkdown']).read_text(encoding='utf8');check(all(f'assets/{i:02d}-' in lesson for i in range(1,7)),'six figures referenced');check('**Figura 6.**' in lesson and '**Figura 1.**' in lesson,'figure captions')
check('não foi efetuada' in lesson or 'não houve publicação' in lesson,'publication disclaimer')
check((R/'previa-local.html').is_file() and (R/'previa-local.png').stat().st_size>10000,'HTML and PNG previews')
entries=[]
for s in (R/'manifesto-sha256.txt').read_text(encoding='utf8').splitlines():
    dig,n=s.split('  ',1);entries.append(n);check(h(R/n)==dig,'manifest '+n)
check(len(entries)==len(set(entries)),'no duplicate manifest entries')
report=json.loads((R/'relatorio-integridade.json').read_text(encoding='utf8'));check(report['all_passed'] is True,'integrity report status')
check(report['previous_zip_sha256']==h(prev),'report preceding archive identity')
archive=R.parent/'MAT-EST-062-pacote-integracao.zip'
if archive.exists():
    with zipfile.ZipFile(archive) as z:
        check(z.testzip() is None,'ZIP CRC'); names=z.namelist(); actual={p.relative_to(R).as_posix() for p in R.rglob('*') if p.is_file() and '__pycache__' not in p.parts};check(set(names)==actual,'ZIP members exactly all files')
        for n in names:check(z.read(n)==(R/n).read_bytes(),'ZIP member equality '+n)
print('PASS',len(checks),'checks; package files',len([p for p in R.rglob('*') if p.is_file() and '__pycache__' not in p.parts]))
