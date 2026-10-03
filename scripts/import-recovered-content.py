"""Convert recovered editorial sources without substituting missing lessons.

Usage: python scripts/import-recovered-content.py RECOVERY_DIR ATTACHMENTS_DIR
The source text, exercises, answers, data files and older editions remain available.
"""
from pathlib import Path
import sys, json, re, hashlib, shutil, zipfile, html, xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
REC, ATT = map(lambda s: Path(s).resolve(), sys.argv[1:3])
DOCS = json.loads((REC / 'inventory.json').read_text())
ASSETS = json.loads((REC / 'asset-inventory.json').read_text())
DATE = '2026-10-03'
INVENTORY_URL = 'https://docs.google.com/document/d/1U9F3AOB4RWIAj561pociXGSAC0GX07ZlAY96Gj-g5uU/edit'
PUBLIC = ROOT / 'public'
CONTENT = ROOT / 'src/content'
REPORT = {'date': DATE, 'lessons': [], 'pendingCorrections': [], 'missingPrerequisites': [], 'versions': []}

def write_json(p, value):
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n')

def read_json(p):
    return json.loads(p.read_text(encoding='utf-8-sig'))

def text(v):
    if isinstance(v, list): return '\n\n'.join(map(text, v))
    if isinstance(v, dict): return '\n'.join(str(k) + ': ' + text(x) for k, x in v.items())
    return str(v or '')

def first(obj, *keys, default=None):
    return next((obj[k] for k in keys if obj.get(k) is not None), default)

def source_path(f):
    p = Path(f['local'])
    return p if p.is_absolute() else REC.parent / p

def raw_doc(f):
    return source_path(f).read_text(encoding='utf-8-sig')

def doc_parts(t):
    pattern = r'^\s*(?:#{1,4}\s+)?(?:\*\*)?(MAT-EST-\d{3}-EX-(?:APR|CON|VES|RET)-\d{2})(?:\*\*)?[^\n]*'
    matches = list(re.finditer(pattern, t, re.M))
    result = []
    for i, m in enumerate(matches):
        end = matches[i+1].start() if i+1 < len(matches) else len(t)
        remainder = m.group(0).split(m.group(1), 1)[1].strip(' *—–:-')
        result.append({'id': m.group(1), 'body': (remainder + '\n' + t[m.end():end]).strip()})
    assert len(result) == 36, ('exercise/answer ID count', len(result), t[:90])
    assert len({q['id'] for q in result}) == 36
    return result

def rows(value):
    if isinstance(value, list): return value
    for k in ['questoes', 'correcoes', 'gabarito', 'exercicios', 'itens', 'respostas']:
        if isinstance(value.get(k), list): return value[k]
    raise ValueError(('unrecognized question schema', list(value)))

def split_sections(t, code):
    # Original text is partitioned by offsets. Numbered inner lists are not headings.
    explicit = list(re.finditer(r'^#{2}\s+(.+)$', t, re.M))
    if explicit:
        headings = [(m.start(), m.end(), m.group(1)) for m in explicit]
    else:
        headings, expected = [], 1
        for m in re.finditer(r'^(\d+)\.\s+([^\n]+)$', t, re.M):
            if int(m.group(1)) == expected:
                headings.append((m.start(), m.end(), m.group(0)))
                expected += 1
    boundaries = [0] + [a for a, _, _ in headings] + [len(t)]
    sections = []
    for i, (a, b) in enumerate(zip(boundaries, boundaries[1:])):
        if a == b: continue
        title = 'Apresentação e contexto da fonte' if i == 0 else headings[i-1][2]
        chunk = t[a:b]
        # Keep the source chunk intact, including its original heading.
        sections.append({'id': f'{code}-s{i:03}', 'title': title, 'paragraphs': [],
                         'markdown': chunk, 'sourceStart': a, 'sourceEnd': b})
    assert ''.join(s['markdown'] for s in sections) == t
    return sections

def strip_html(t):
    t = re.sub(r'<style.*?</style>', '', t, flags=re.S)
    t = re.sub(r'</(?:p|h\d)>', '\n', t)
    return html.unescape(re.sub(r'<[^>]*>', '', t)).strip()

def add_file(original, dest):
    dest.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(original, dest)

def visual_from_file(p, relative, caption='', description=''):
    title, desc = caption, description
    if p.suffix == '.svg':
        tree = ET.fromstring(p.read_bytes())
        title = title or tree.findtext('{http://www.w3.org/2000/svg}title') or p.stem
        desc = desc or tree.findtext('{http://www.w3.org/2000/svg}desc') or title
        assert not any(el.tag.split('}')[-1] in ('script','foreignObject') for el in tree.iter())
    return {'url': relative, 'caption': title or p.stem, 'alt': desc or title or p.stem,
            'observe': description or 'Observe os rótulos, a ordem e as relações representadas.',
            'conclusion': description or desc or title or p.stem}

def gallery_visuals(code):
    p = next(ATT.rglob(code + '*galeria*.zip'))
    z = zipfile.ZipFile(p)
    raw = z.read(next(n for n in z.namelist() if n.endswith('.html'))).decode()
    parts = re.split(r'(<img\b[^>]*>)', raw)
    figures = []
    for i in range(1, len(parts), 2):
        src = re.search(r'src="([^"]+)"', parts[i]).group(1)
        preceding = strip_html(parts[i-1]).splitlines()
        following = strip_html(parts[i+1])
        name = f'galeria-{len(figures)+1:02}.png'
        dest = PUBLIC / 'media' / code / name
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(z.read(src))
        context = '\n'.join(preceding)
        headings = re.findall(r'Visual\s+\d+\s*[—–:-]\s*([^\n]+)', context)
        caption = headings[-1] if headings else f'Visual {len(figures)+1}'
        description = following.split('Visual ')[0].strip()
        figure = visual_from_file(dest, f'media/{code}/{name}', caption, description)
        for key, label in [('alt','Texto alternativo'),('observe','O que observar'),('conclusion','Conclusão para áudio')]:
            matches = re.findall(re.escape(label)+r':\s*([^\n]+)', context + '\n' + description, re.I)
            if matches: figure[key] = matches[-1].strip()
        figures.append(figure)
    assert len(figures) == 6
    return figures

def native_visuals(code, folder, lesson_text):
    if code in ('MAT-EST-006','MAT-EST-007','MAT-EST-009'):
        return gallery_visuals(code)
    files = sorted((a for a in ASSETS if a['folderId'] == folder), key=lambda a: a['title'])
    # Resolve duplicate source assets by the current metadata's actual filenames.
    keep = {}
    for a in files: keep.setdefault(a['title'], a)
    figures = []
    for name, a in sorted(keep.items()):
        if code == 'MAT-EST-008' and name.startswith(('01-quadrados','02-variancia','03-mesma')): continue
        p = Path(a['path']);dest = PUBLIC / 'media' / code / name;add_file(p,dest)
        figures.append(visual_from_file(dest, f'media/{code}/{name}'))
    # Native PNG descriptions are preserved in the source's visual section.
    definitions = re.split(r'(?m)^\s*(?:#{1,4}\s*)?Visual\s+\d+\s*[—–:-]', lesson_text)[1:]
    for v, definition in zip(figures, definitions):
        v['caption'] = definition.splitlines()[0].strip()
        for key, labels in [('alt',['Texto alternativo']),('observe',['O que observar','Observe']),('conclusion',['Conclusão para áudio','Conclusão em áudio','Conclusão textual'])]:
            for label in labels:
                match = re.search(re.escape(label)+r':\s*([^\n]+)', definition, re.I)
                if match: v[key] = match.group(1).strip(); break
    return figures

def normalize_visuals(code, directory, metadata):
    vs = metadata.get('visuais', [])
    if (directory/'visuais.json').exists(): vs = read_json(directory/'visuais.json')
    if isinstance(vs, dict): vs = first(vs, 'visuais', 'itens', 'figuras', default=[])
    result = []
    for v in vs:
        if isinstance(v, str): v = {'arquivo': v}
        name = first(v,'arquivo','src','url','caminho')
        if not name: raise ValueError(('visual without file', code, v))
        p = directory / name
        assert p.exists(), (code, name)
        target = PUBLIC / 'media' / code / Path(name).name
        add_file(p, target)
        generated = visual_from_file(target, f'media/{code}/{target.name}')
        generated.update({
            'caption': text(first(v,'legenda','titulo',default=generated['caption'])),
            'alt': text(first(v,'alt','textoAlternativo',default=generated['alt'])),
            'observe': text(first(v,'observe','oQueObservar','o_que_observar',default=generated['observe'])),
            'conclusion': text(first(v,'conclusaoAudio','conclusaoTextual','conclusao_audio','conclusao',default=generated['conclusion']))})
        result.append(generated)
    assert result, ('missing visuals', code)
    return result

def native_metadata(code, files, lesson_text):
    candidates = [f for f in files if 'metadad' in f['title']]
    m = {}
    if candidates:
        f = max(candidates, key=lambda f:f.get('modified') or '')
        raw = raw_doc(f)
        try: m = json.loads(raw[raw.index('{'):raw.rindex('}')+1])
        except (ValueError, json.JSONDecodeError):
            for line in raw.splitlines():
                if ':' in line:
                    k,v = line.split(':',1);m[k.strip()] = v.strip()
    m.setdefault('id', code)
    m.setdefault('titulo', lesson_text.splitlines()[0].lstrip('# ').split(' — ',1)[-1])
    if code == 'MAT-EST-001': m.update({'nivel':2,'preRequisitos':[]})
    return m

def normalized_questions(code, qs, answers, source):
    answer_map = {first(q,'id','questaoId'):q for q in answers}
    assert len(answer_map) == len(answers)
    result = []
    for q in qs:
        ident = q['id'];a = answer_map.get(ident,q)
        statement = text(first(q,'enunciado','body'))
        native = 'body' in a
        if native:
            body = a['body']
            core = re.split(r'(?im)^\s*(?:Motivo|Erro provável|Hipótese|Devolutiva)',body)[0].strip()
            ans = re.search(r'(?im)^\s*(?:Resposta esperada|Resposta(?: e raciocínio)?|Resposta e resolução):\s*(.+)',core)
            answer = ans.group(1).strip() if ans else core
            resolution = body
            reasons = re.findall(r'(?im)^\s*(?:Motivo[^:]*|Erro provável):\s*(.+)',body)
        else:
            resolution = text(first(a,'resolucao','correcaoComentada','resposta_e_resolucao_comentada','resposta_e_resolucao',default=first(q,'resolucao',default='')))
            answer = text(first(a,'resposta','respostaEsperada',default=resolution))
            if not resolution: resolution = answer
            reasons = [text(first(a,'motivoProvavelDeErro','motivoProvavelErro','motivoProvavelDoErroParaInvestigacao','motivosDeErro','motivo_de_erro_provavel','motivoErro','causaProvavel','categoriaErroProvavel','provavelCausaErro',default=first(q,'erroProvavel','tipoErro',default='Não atribuir ao aluno sem examinar sua tentativa.')))]
        assert answer and resolution and statement, (code,ident,'incomplete question')
        layer = re.search(r'-(APR|CON|VES|TRA|RET)-',ident)
        layer = layer.group(1) if layer else {'aprendizagem':'APR','consolidacao':'CON','consolidação':'CON','vestibular':'VES','transferencia':'TRA','transferência':'TRA','reteste':'RET'}.get(q.get('camada') or q.get('grupo'))
        assert layer, (code,ident,q.get('camada'))
        # The integration preserves insufficient historical explanations, flagged for review.
        enough = len(re.findall(r'\w+', re.sub(r'(?im)^Resposta[^:]*:', '',core if native else resolution))) >= 12
        # Pairing and completeness checks do not constitute pedagogical review.
        review = 'pendente'
        item = {'id':ident,'origin':'autoral','subject':'MAT','topics':[code],
                'difficulty':{'APR':'aprendizagem','CON':'consolidação','VES':'vestibular','TRA':'vestibular','RET':'reteste'}[layer],
                'layer':layer,'title':text(q.get('titulo')),'statement':statement,'answer':answer,
                'resolution':resolution,'errorReasons':reasons,'source':source,'reviewStatus':review}
        if q.get('alternativas'): item['alternatives'] = q['alternativas']
        if not enough:
            item['reviewNote'] = 'A fonte traz uma resposta breve. O desenvolvimento da correção precisa de revisão editorial; este item não comprova domínio.'
            REPORT['pendingCorrections'].append(ident)
        result.append(item)
    assert len({q['id'] for q in result}) == len(result)
    if answers: assert {q['id'] for q in result} == set(answer_map), ('pairing',code)
    return result

def video(m, raw, directory=None):
    value = first(m,'videos','video',default=[])
    if directory and (directory/'video.json').exists(): value = read_json(directory/'video.json')
    if isinstance(value,dict): value = [value]
    if isinstance(value,str): value = [{'titulo':value,'url':m.get('videoUrl')}]
    result=[]
    for v in value:
        url = first(v,'url','urlYoutube')
        if not url: continue
        result.append({'title':text(first(v,'titulo','title',default='Vídeo complementar')),
                       'channel':text(first(v,'canal','channel',default='Canal indicado na fonte')),
                       'url':url,'duration':text(first(v,'duracao','duracaoAproximada','duracaoInformada',default='Duração não confirmada')),
                       'language':text(first(v,'idioma','language',default='Português')),
                       'reason':text(first(v,'motivo','reason',default='Reforça o conceito apresentado nesta aula.')),
                       'when':text(first(v,'momento','momentoRecomendado','momento_recomendado','quandoAssistir',default='Depois dos exemplos resolvidos, antes dos exercícios.')),
                       'reinforces':[],'checkedAt':'','verification':'Disponibilidade em conferência; reprodução integral não auditada.'})
    if not result:
        urls = re.findall(r'https://(?:www\.)?(?:youtube\.com/watch\?v=[\w-]+|youtu\.be/[\w-]+)',raw)
        for url in dict.fromkeys(urls):
            result.append({'title':'Vídeo complementar indicado na fonte','channel':'Canal indicado na fonte','url':url,
                           'duration':'Duração não confirmada','language':'Português','reason':'Complementa a explicação escrita.',
                           'when':'Depois dos exemplos resolvidos.','reinforces':[],'checkedAt':'','verification':'Disponibilidade em conferência; reprodução integral não auditada.'})
    return result

topics, question_index, manifests, references = [], [], [], {}
editorial = read_json(CONTENT/'editorial-index.json')

# Resolve the last canonical reconstructed edition, retaining earlier sources separately.
for number in list(range(1,12))+list(range(31,68)):
    code = f'MAT-EST-{number:03}'
    edition_links=[];attachments=[]
    if number <= 11:
        files = [f for f in DOCS if code in f['title']]
        lessons = [f for f in files if 'aula completa' in f['title'].lower() or f['title'].startswith('AULA')]
        chosen = max(lessons,key=lambda f:f.get('modified') or '')
        files = [f for f in files if f['folderId']==chosen['folderId']]
        lesson_text = raw_doc(chosen)
        m = native_metadata(code,files,lesson_text)
        qdoc = max((f for f in files if 'exerc' in f['title'].lower()),key=lambda f:f.get('modified') or '')
        adoc = max((f for f in files if 'gabarito' in f['title'].lower()),key=lambda f:f.get('modified') or '')
        qs, answers = doc_parts(raw_doc(qdoc)), doc_parts(raw_doc(adoc))
        source = {'title':chosen['title'],'url':chosen['url'],'version':'reconstrução editorial v1','checkedAt':DATE}
        if number == 1:
            from recovered_visuals import introductory_visuals
            visuals = introductory_visuals(PUBLIC,lesson_text)
        else:
            visuals = native_visuals(code,chosen['folderId'],lesson_text)
        kind = 'Reconstrução editorial v1; sem identidade binária com a edição histórica.'
        for f in [f for f in DOCS if code in f['title']]:
            p = source_path(f)
            if not p.exists() or not p.stat().st_size: continue
            dest = PUBLIC/'originais'/code/'edicoes'/(f['id']+p.suffix)
            add_file(p,dest)
            edition_links.append({'label':f['title'] + ' · ' + (f.get('modified') or '')[:10],
                                  'url':f'originais/{code}/edicoes/{dest.name}'})
        source_folders={f['folderId'] for f in DOCS if code in f['title']}
        for a in ASSETS:
            if a['folderId'] not in source_folders:continue
            p=Path(a['path']);current=PUBLIC/'media'/code/a['title']
            if current.exists() and current.read_bytes()==p.read_bytes():continue
            rel=Path('originais')/code/'edicoes'/'ativos'/a['id']/a['title']
            add_file(p,PUBLIC/rel)
            edition_links.append({'label':'Visual de outra fonte recuperada · '+a['title'],'url':rel.as_posix()})
        previous = f'MAT-EST-{number-1:03}' if number>1 else None
    else:
        directories = list((REC/'packages').glob(code+'-*'))
        directory = next((p for p in directories if not p.name.endswith('-site')),directories[0])
        m = read_json(directory/('metadados.json' if (directory/'metadados.json').exists() else 'manifest.json'))
        name = first(m,'aulaMarkdown','arquivoMarkdown')
        if not name or not (directory/name).exists(): name = next(directory.glob(code+'*.md')).name
        lesson_text = (directory/name).read_text(encoding='utf-8-sig')
        qs = rows(read_json(directory/'exercicios.json'))
        answers = rows(read_json(directory/'gabarito-comentado.json')) if (directory/'gabarito-comentado.json').exists() else []
        drivefiles = read_json(REC/'package-drive-map.json')
        entry = next((f for f in drivefiles if code in f['title'] and 'integracao' in f['title']),None)
        entry = entry or next((f for f in drivefiles if code in f['title']),None)
        if not entry: entry={'title':'Cumulativo MAT-EST-067 com histórico preservado','url':'https://drive.google.com/file/d/1U08WfoTT3iVSaKp7z6QbX1oDPenvqyGc/view'}
        source={'title':entry['title'],'url':entry['url'],'checkedAt':DATE,'version':'fonte integral recuperada'}
        visuals = normalize_visuals(code,directory,m)
        kind = 'Fonte integral recuperada do pacote editorial; dados fictícios e históricos separados.'
        previous = first(m,'anterior',default=f'MAT-EST-{number-1:03}')
        for p in directory.rglob('*'):
            if not p.is_file() or any(part in ('historico','etapas') for part in p.relative_to(directory).parts):continue
            rel=p.relative_to(directory);dest=PUBLIC/'originais'/code/'arquivos'/rel;add_file(p,dest)
            if p.suffix in ('.csv','.json','.jsonl','.py','.txt'):
                attachments.append({'label':str(rel),'url':f'originais/{code}/arquivos/{rel.as_posix()}'})
        for old in directories:
            if old==directory:continue
            for p in old.rglob('*'):
                if not p.is_file() or any(part in ('historico','etapas') for part in p.relative_to(old).parts):continue
                rel=p.relative_to(old);dest=PUBLIC/'originais'/code/'edicoes'/old.name/rel;add_file(p,dest)
                if p.suffix in ('.md','.json','.csv','.jsonl','.txt','.py'):
                    edition_links.append({'label':'Edição anterior · '+old.name+' · '+str(rel),'url':f'originais/{code}/edicoes/{old.name}/{rel.as_posix()}'})
    original = PUBLIC/'originais'/code/'aula.md';original.parent.mkdir(parents=True,exist_ok=True);original.write_text(lesson_text)
    checksum=hashlib.sha256(original.read_bytes()).hexdigest()
    sections=split_sections(lesson_text,code)
    # Heading level is rendered by the reader; source markdown and offsets stay intact.
    title=text(first(m,'titulo','title',default=lesson_text.splitlines()[0].lstrip('# ').split(' — ',1)[-1]))
    level=first(m,'nivel','level',default=2 if number<8 else 3 if number<12 else 6)
    if isinstance(level,list):level=max(level)
    if isinstance(level,str):level=int(re.search(r'[1-6]',level).group())
    prereq=first(m,'preRequisitos','pre_requisitos','prerequisites',default=[])
    if isinstance(prereq,str):
        ids=re.findall(r'MAT-EST-\d{3}',prereq)
        if ' a ' in prereq and len(ids)==2:ids=[f'MAT-EST-{n:03}' for n in range(int(ids[0][-3:]),int(ids[1][-3:])+1)]
        prereq=ids
    if number in (7,10) and not prereq:prereq=[f'MAT-EST-{n:03}' for n in range(1,number)]
    next_id=first(m,'proximoTopico','proximo_topico','next','proximo',default=f'MAT-EST-{number+1:03}')
    if isinstance(next_id,dict): next_id=first(next_id,'id','codigo')
    if isinstance(next_id,str):
        match=re.search(r'MAT-[A-Z]+-\d{3}',next_id);next_id=match.group(0) if match else None
    normalized=normalized_questions(code,qs,answers,source)
    assert len(normalized)==(48 if number==37 else 36)
    write_json(CONTENT/'questions'/f'{code}.json',normalized)
    summary_keys=('id','origin','subject','topics','difficulty','layer','reviewStatus','source')
    question_index.extend({k:q[k] for k in summary_keys} for q in normalized)
    def select_section(words):
        return next((s['markdown'] for s in sections if any(w in s['title'].lower() for w in words)), '')
    objective=text(first(m,'objetivos',default=select_section(['objetivo'])))
    summary=select_section(['resumo','síntese']) or objective
    audio=select_section(['para ouvir','versão curta','voz alta','áudio']) or summary
    videos=video(m,lesson_text,directory if number>11 else None)
    notes=['A produção e a publicação não registram domínio nem alteram seu progresso.']
    if number>11:notes.append('Aula avançada para consulta. A sequência de fundamentos ainda tem textos integrais a recuperar; confira os pré-requisitos antes de iniciar.')
    notes.append('As referências a publicação pendente no texto original registram o estado da fonte na data de criação.')
    lesson={'id':code,'version':'publicacao-2026-10-03-v1','objective':objective,'prerequisites':prereq,
            'why':select_section(['por que','contexto']),'intuitive':[],'deep':[],'vocabulary':[],
            'examples':[],'visuals':visuals,'applications':first(m,'aplicacoes',default=[]),'connections':[],
            'commonErrors':[],'learning':[q['id'] for q in normalized if q['layer']=='APR'],
            'consolidation':[q['id'] for q in normalized if q['layer']=='CON'],
            'entrance':[q['id'] for q in normalized if q['layer'] in ('VES','TRA')],
            'retest':[q['id'] for q in normalized if q['layer']=='RET'],'solutions':[],
            'summary':summary,'audioVersion':audio,'sections':sections,'sources':[source],
            'previous':previous,'next':next_id,'videos':videos,'video':videos[0] if videos else None,
            'publication':{'kind':kind,'notes':notes,'original':f'originais/{code}/aula.md',
                           'editions':edition_links,'attachments':attachments,'questionCount':len(normalized),
                           'visualCount':len(visuals),'sourceSha256':checksum}}
    topic={'id':code,'title':title,'subject':'MAT','unit':text(first(m,'unidade','unit',default='Estatística')),
           'level':level,'order':number,'description':objective,'prerequisites':prereq,'objectives':[objective],
           'skills':first(m,'habilidadesDesenvolvidas',default=[]),'related':[],
           'applications':lesson['applications'],'exams':first(m,'examesRelacionados','examesRelevantes',default=[]),
           'depth':text(first(m,'profundidadeEsperada',default='Texto integral com explicações, exemplos, exercícios e revisão.')),
           'visuals':visuals,'exercises':[q['id'] for q in normalized],
           'review':{'summary':summary,'intervals':[1,7,30]},'next':next_id,'editorialStatus':'publicado','source':source}
    write_json(CONTENT/'lessons'/f'{code}.json',lesson)
    topics.append(topic)
    REPORT['lessons'].append({'id':code,'title':title,'source':source,'sourceSha256':checksum,
                             'sections':len(sections),'characters':len(lesson_text),'questions':len(normalized),
                             'visuals':len(visuals),'prerequisites':prereq,'kind':kind,'original':lesson['publication']['original']})
    REPORT['versions'].extend(edition_links)

write_json(CONTENT/'topics.json',topics)
catalog_keys=('id','title','subject','unit','level','order','prerequisites','exercises','next','editorialStatus')
write_json(CONTENT/'catalog.json',[dict({k:t[k] for k in catalog_keys},visualCount=len(t['visuals'])) for t in topics])
write_json(CONTENT/'questions.json',question_index)
write_json(ROOT/'docs/sources/publication-2026-10-03.json',REPORT)
write_json(REC/'conversion-report.json',REPORT)
print(json.dumps({'lessons':len(topics),'questions':len(question_index),'visuals':sum(len(t['visuals']) for t in topics),
                  'pendingCorrections':len(REPORT['pendingCorrections'])},ensure_ascii=False))
