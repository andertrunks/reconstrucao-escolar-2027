import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {mediaUrl} from './content-utils';
const plugins=[remarkGfm];
export default function MarkdownContent({text,base}:{text:string;base?:string}){
 return <Markdown remarkPlugins={plugins} components={{h1:({children})=><h3>{children}</h3>,h2:({children})=><h3>{children}</h3>,h3:({children})=><h3>{children}</h3>,h4:({children})=><h3>{children}</h3>,h5:({children})=><h3>{children}</h3>,h6:({children})=><h3>{children}</h3>,img:()=>null,a:({href,children})=><a href={base&&href&&!/^(?:https?:|#|mailto:)/.test(href)?mediaUrl(base+href):href}>{children}</a>,table:({children})=><div className="table-scroll" tabIndex={0} role="region" aria-label="Tabela da aula"><table>{children}</table></div>}}>{text}</Markdown>;
}
