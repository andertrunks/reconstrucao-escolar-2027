"""Render the five diagrams specified verbatim in the EST-001 source.

This materializes existing editorial specifications; it creates no new lesson.
"""
import re
from html import escape

def introductory_visuals(public,source):
    definitions=re.split(r'(?m)^Visual\s+\d+\s*[—–:-]',source)[1:6]
    figures=[]
    for n,d in enumerate(definitions,1):
        title=d.splitlines()[0].strip().rstrip('.')
        def field(label):
            m=re.search(re.escape(label)+r':\s*([^\n]+)',d)
            return m.group(1).strip() if m else title
        alt,observe,conclusion=field('Texto alternativo'),field('O que observar'),field('Conclusão para áudio')
        parts=[]
        def label(x,y,t,size=24):parts.append(f'<text x="{x}" y="{y}" font-size="{size}">{escape(t)}</text>')
        def box(x,y,w,h,t):
            parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="12" fill="#eef5f4" stroke="#204c47" stroke-width="2"/>')
            label(x+16,y+h/2+8,t)
        def line(x,y,a,b):parts.append(f'<path d="M{x} {y} L{a} {b}" fill="none" stroke="#204c47" stroke-width="3" marker-end="url(#arrow)"/>')
        label(36,52,title,30)
        if n==1:
            parts.append('<rect x="40" y="90" width="850" height="430" rx="16" fill="#f5f7f6" stroke="#204c47" stroke-width="3"/>')
            label(60,130,'População: 20 unidades')
            parts.append('<rect x="70" y="150" width="775" height="82" rx="12" fill="#e0f2ec" stroke="#204c47" stroke-width="4"/>')
            for i in range(20):
                x=130+(i%5)*155;y=192+(i//5)*90
                parts.append(f'<circle cx="{x}" cy="{y}" r="28" fill="white" stroke="#204c47" stroke-width="{4 if i<5 else 2}"/>')
                label(x-14,y+8,str(i+1))
            label(50,560,'Amostra: unidades 1 a 5, identificadas pelo contorno.')
        elif n==2:
            label(40,110,'Dados fictícios para ilustrar a matriz.')
            rows=[['Unidade','Meio de transporte','Tempo (minutos)'],['A17','Ônibus','18'],['A18','A pé','12'],['A19','Bicicleta','9']]
            for i,row in enumerate(rows):
                for j,t in enumerate(row):box(40+[0,190,560][j],145+i*80,[190,370,320][j],76,t)
            label(40,510,'Uma linha: uma unidade. Uma coluna: uma variável.')
            label(40,555,'“Tempo” é variável; “18 minutos” é o dado de A17.')
        elif n==3:
            box(350,90,220,60,'Variável')
            line(460,150,250,200);line(460,150,700,200)
            box(100,205,310,60,'Qualitativa');box(540,205,320,60,'Quantitativa')
            for x,parent,t in [(30,250,'Nominal'),(265,250,'Ordinal'),(500,700,'Discreta'),(735,700,'Contínua')]:
                line(parent,265,x+100,320);box(x,325,200,60,t)
            examples=[('Sem ordem','transporte'),('Com ordem','satisfação'),('Contagem','nº de itens'),('Medição','tempo')]
            for i,(a,b) in enumerate(examples):label(35+i*235,440,a,21);label(35+i*235,475,b,21)
            label(40,555,'Classifique o significado da variável, além do código.')
        elif n==4:
            box(275,100,420,70,'Mesma população-alvo')
            line(470,170,240,250);line(470,170,700,250)
            box(60,255,355,80,'Censo');box(530,255,365,80,'Pesquisa amostral')
            label(70,385,'Todas as unidades');label(540,385,'Uma parte selecionada')
            label(70,450,'Mesmo conjunto de interesse explícito nos dois caminhos.')
            label(70,515,'O desenho da coleta e a pergunta continuam necessários.')
        else:
            names=['Pergunta','População','Unidade','Variáveis','Coleta','Dados','Análise','Conclusão limitada']
            positions=[(40,140),(275,140),(510,140),(745,140),(745,370),(510,370),(275,370),(40,370)]
            for i,((x,y),t) in enumerate(zip(positions,names)):
                box(x,y,180,95,t if i<7 else 'Conclusão')
                label(x+10,y+130,f'{i+1}. '+('Limitada' if i==7 else t),18)
                if i:
                    px,py=positions[i-1]
                    if y==py:line(px+(180 if x>px else 0),py+47,x+(0 if x>px else 180),y+47)
                    else:line(px+90,py+95,x+90,y)
            label(40,560,'A análise vem depois da definição e da coleta dos dados.')
        markup=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 600" role="img" aria-labelledby="title desc"><title id="title">{escape(title)}</title><desc id="desc">{escape(alt)}</desc><defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0 0 L0 6 L9 3 Z" fill="#204c47"/></marker></defs><rect width="960" height="600" fill="white"/><g fill="#143b37" font-family="Arial,sans-serif">'+''.join(parts)+'</g></svg>'
        path=public/'media'/'MAT-EST-001'/f'visual-{n:02}.svg';path.parent.mkdir(parents=True,exist_ok=True);path.write_text(markup)
        figures.append({'url':f'media/MAT-EST-001/{path.name}','caption':title,'alt':alt,'observe':observe,'conclusion':conclusion})
    assert len(figures)==5
    return figures
