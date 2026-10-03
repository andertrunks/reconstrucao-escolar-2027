from pathlib import Path
import unittest, json, csv, hashlib, re
from xml.etree import ElementTree as ET
from decimal import Decimal
R=Path(__file__).resolve().parent.parent
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
class TestPacote055(unittest.TestCase):
 def test_01_inherited_files(self):
  j=json.loads((R/'governanca'/'hashes-herdados.json').read_text());self.assertEqual(len(j['hashes_sha256']),23)
  for p,h in j['hashes_sha256'].items():self.assertEqual(sha(R/p),h,p)
 def test_02_historical_protocol(self):
  p=json.loads((R/'protocolo-herdado-MAT-EST-049.json').read_text());self.assertEqual(p['id'],'MAT-EST-049-PROT-v1');self.assertEqual(p['estado_atual'],'nao_promover: apenas 5 pares e quebra de guarda em t19')
 def test_03_derived(self):
  with (R/'dados/comparacao-emparelhada-t18-t22.csv').open(newline='',encoding='utf-8') as fh: data=list(csv.DictReader(fh))
  self.assertEqual(len(data),5)
  D=lambda x:Decimal(x)
  avg=lambda k:sum(D(v[k]) for v in data)/len(data)
  self.assertEqual((avg('modulo_base'),avg('modulo_desafiante'),avg('custo_base'),avg('custo_desafiante')),(D('17.6'),D('8.36'),D('51.2'),D('14.92')))
  self.assertEqual(max(D(v['piora_modulo_desafiante']) for v in data),D('19.2'))
 def test_04_no_future_observations(self):
  j=json.loads((R/'checkpoint-editorial.json').read_text());self.assertIn('sem observado',j['historico']);self.assertIn('não promover C',j['protocolo'])
 def test_05_questions_unique_separate(self):
  ex=json.loads((R/'exercicios.json').read_text());ans=json.loads((R/'gabarito-comentado.json').read_text());self.assertEqual(len(ex),36);self.assertEqual(len(ans),36)
  self.assertEqual({x['id'] for x in ex},{x['id'] for x in ans});self.assertEqual(len(set(x['id'] for x in ex)),36)
  self.assertEqual({g:sum(x['camada']==g for x in ex) for g in ['APR','CON','VES','RET']},{'APR':10,'CON':10,'VES':10,'RET':6})
  self.assertTrue(all('resolucao' not in e and 'resposta' not in e for e in ex))
  self.assertTrue(all(x['resolucao'] and x['motivosDeErro'] for x in ans))
  self.assertTrue(all(e['origem']=='autoral' for e in ex))
 def test_06_md_exercises(self):
  ex=(R/'exercicios.md').read_text();ga=(R/'gabarito-comentado.md').read_text();self.assertEqual(len(re.findall(r'^### MAT-EST-055-EX-',ex,re.M)),36);self.assertEqual(len(re.findall(r'^### MAT-EST-055-EX-',ga,re.M)),36)
 def test_07_svg_accessible(self):
  lesson=next(R.glob('MAT-EST-055-*.md')).read_text();files=list((R/'assets').glob('*.svg'));self.assertEqual(len(files),6)
  for p in files:
   t=ET.parse(p).getroot();ns='{http://www.w3.org/2000/svg}';self.assertTrue(t.find(ns+'title').text);self.assertTrue(t.find(ns+'desc').text);self.assertIn('assets/'+p.name,lesson)
  self.assertEqual(len(re.findall(r'\*\*Figura [1-6] ',lesson)),6)
 def test_08_governance_chain(self):
  lines=[json.loads(x) for x in (R/'governanca/trilha-exemplo.jsonl').read_text().splitlines()];self.assertEqual(len(lines),5);prev='GENESIS-DIDATICA'
  for i,e in enumerate(lines,1):
   self.assertEqual(e['ordem_logica'],'G'+str(i));self.assertEqual(e['anterior_sha256'],prev);self.assertFalse(e['ato_operacional']);self.assertFalse(e['autenticacao_temporal']);d=e.pop('sha256');self.assertEqual(hashlib.sha256(json.dumps(e,sort_keys=True,ensure_ascii=False,separators=(',',':')).encode()).hexdigest(),d);prev=d
 def test_09_memo_no_signature(self):
  j=json.loads((R/'governanca/parecer-didatico.json').read_text());self.assertIn('Não promover',j['conclusao_didatica']);self.assertIn('sem aprovação real',j['verificacao_portas']['aprovacao_humana_e_rollback']);self.assertEqual(j['evidencias']['pares_validos_sinteticos'],5)
 def test_10_html_preview(self):
  h=(R/'previa-local.html').read_text();self.assertIn('lang="pt-BR"',h);self.assertIn('id="aula"',h);self.assertEqual(h.count('<img '),6);self.assertNotIn('MAT-EST-055-EX-APR-01',h)
 def test_11_metadata_checkpoint(self):
  m=json.loads((R/'metadados.json').read_text());c=json.loads((R/'checkpoint-editorial.json').read_text());self.assertEqual((m['id'],m['anterior'],m['proximoTopico'],c['proximo_topico_editorial']),('MAT-EST-055','MAT-EST-054','MAT-EST-056','MAT-EST-056'));self.assertFalse(m['progressoIndividualAlterado'])
 def test_12_no_mixed_namespaces(self):
  j=json.loads((R/'governanca/parecer-didatico.json').read_text());self.assertIn('não inserir no denominador',j['casos_isolados']['V']);self.assertIn('não inserir no denominador',j['casos_isolados']['Z'])
 def test_13_png(self):
  p=R/'previa-local.png';self.assertGreater(p.stat().st_size,10000);self.assertEqual(p.read_bytes()[:8],b'\x89PNG\r\n\x1a\n')
 def test_14_no_prior_approval(self):
  m=json.loads((R/'metadados.json').read_text());self.assertIn('reprodução integral não realizada',m['video']['verificacao']);self.assertIn('não publicado',m['estadoEditorial'])
 def test_15_copies_separate(self):
  self.assertTrue((R/'auditoria/recalcular_relatorios.py').exists());self.assertTrue((R/'plano-avaliacao-MAT-EST-051.json').exists())
if __name__=='__main__':unittest.main(verbosity=2)
