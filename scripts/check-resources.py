"""Verify public complementary resources; preserve original editorial bytes.

Uses YouTube's public oEmbed metadata and HTTP checks of institutional pages.
It does not claim full playback, caption, audio or screen-reader verification.
"""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import json,re,urllib.request,urllib.parse,html,sys
ROOT=Path(__file__).resolve().parents[1]
DATE='2026-10-03'
lessons=[(p,json.loads(p.read_text())) for p in sorted((ROOT/'src/content/lessons').glob('*.json'))]
def extra(url,reason):
    return {'title':'Recurso complementar verificado','channel':'','url':url,'duration':'Duração não confirmada','language':'Português','reason':reason,'when':'Após estudar a explicação escrita.','reinforces':[],'checkedAt':''}
for p,l in lessons:
    if l['id'] in ['MAT-EST-039','MAT-EST-040']:
        url='https://www.youtube.com/watch?v=Xz0x-8-cgaQ'
        if not any(v['url']==url for v in l['videos']):
            v=extra(url,'Complemento sobre as ideias de bootstrap, acrescentado após a página indicada da Penn State não responder à conferência.');v['language']='Inglês';l['videos'].append(v)
        note='A página indicada da Penn State retornou HTTP 502. A referência original foi preservada e foi acrescentado um vídeo verificado sobre bootstrap; não foi declarada disponibilidade da página que falhou.'
        if note not in l['publication']['notes']:l['publication']['notes'].append(note)
    if l['id']=='MAT-EST-006':l['videos']=[extra('https://www.youtube.com/watch?v=d965cRsim6I','Link localizado para a indicação de média, moda e mediana da fonte.')]
    if l['id']=='MAT-EST-008':
        l['videos']=[extra('https://www.youtube.com/watch?v=okczT8W1fag','Complemento verificado sobre variância e desvio-padrão populacionais.')]
        note='O link exato da indicação de Professor Ferretto não foi confirmado. Foi acrescentado o recurso de Equaciona com Paulo Pereira, já presente na edição anterior; a indicação original permanece no texto integral.'
        if note not in l['publication']['notes']:l['publication']['notes'].append(note)
    if l['id'] in ['MAT-EST-061','MAT-EST-062','MAT-EST-063','MAT-EST-065']:
        url='https://www.w3.org/WAI/videos/standards-and-benefits/pt-BR'
        if not any(v['url']==url for v in l['videos']):l['videos'].append(extra(url,'Vídeo introdutório da W3C para complementar a leitura sobre avaliação da acessibilidade.'))
urls=sorted({v['url'] for _,l in lessons for v in l['videos']})
report=ROOT/'docs/sources/resources-2026-10-03.json'
cache={c['url']:c for c in json.loads(report.read_text()) if c['checkedAt']==DATE} if report.exists() and '--refresh' not in sys.argv else {}
def check(url):
    if url in cache:return cache[url]
    r={'url':url,'checkedAt':DATE}
    try:
        if 'youtube.com/watch' in url or 'youtu.be/' in url:
            request='https://www.youtube.com/oembed?url='+urllib.parse.quote(url,safe='')+'&format=json'
            with urllib.request.urlopen(request,timeout=35) as response:d=json.load(response)
            r.update({'ok':True,'method':'YouTube oEmbed','title':d['title'],'channel':d['author_name'],'type':'video'})
        else:
            with urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'}),timeout=35) as response:
                body=response.read().decode('utf8',errors='replace');resolved=response.url;status=response.status
            title=re.search(r'<title[^>]*>(.*?)</title>',body,re.S|re.I)
            video=bool(re.search(r'<video\b|<iframe\b|player\.vimeo|youtube\.com/embed|wistia|video\.js',body,re.I))
            if '/WAI/test-evaluate/' in url:video=False
            r.update({'ok':status==200,'method':'HTTP e conteúdo da página institucional','httpStatus':status,'resolvedUrl':resolved,'pageTitle':html.unescape(re.sub('<[^>]+>','',title.group(1))).strip() if title else '', 'type':'video' if video else 'leitura'})
    except Exception as e:r.update({'ok':False,'error':str(e)})
    print(json.dumps(r,ensure_ascii=False),flush=True)
    return r
with ThreadPoolExecutor(max_workers=8) as pool:checks=list(pool.map(check,urls))
lookup={c['url']:c for c in checks}
for p,l in lessons:
    for v in l['videos']:
        c=lookup[v['url']]
        if c['ok']:
            v['checkedAt']=DATE;v['type']=c['type']
            if c.get('title'):v['title']=c['title'];v['channel']=c['channel']
            v['verification']='Disponibilidade '+('e título/canal conferidos pelo YouTube' if c['method']=='YouTube oEmbed' else 'da página institucional conferida')+' em 03/10/2026. Reprodução integral, áudio e legendas não auditados.'
        else:v['verification']='O recurso indicado na fonte não pôde ser confirmado nesta conferência: '+c['error']
    l['video']=l['videos'][0] if l['videos'] else None
    p.write_text(json.dumps(l,ensure_ascii=False,indent=2)+'\n')
report.write_text(json.dumps(checks,ensure_ascii=False,indent=2)+'\n')
assert all(any(lookup[v['url']]['ok'] for v in l['videos']) for _,l in lessons),'Aula sem complemento disponível.'
