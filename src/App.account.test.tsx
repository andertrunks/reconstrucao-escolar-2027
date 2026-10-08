// @vitest-environment jsdom
import {act} from 'react';
import {createRoot,type Root} from 'react-dom/client';
import {afterEach,beforeEach,describe,expect,it,vi} from 'vitest';
import type {StudyState} from './model';
import {emptyState} from './study';
import type {LoadedStudy} from './storage';

const runtime=vi.hoisted(()=>({listener:null as null|((event:string,session:{user:{id:string}}|null)=>void),update:null as null|((fn:(s:StudyState)=>StudyState)=>void)}));
vi.mock('./storage',()=>({loadStudy:vi.fn(),saveStudy:vi.fn(),syncPendingCache:vi.fn()}));
vi.mock('./cloud',async original=>({...await original<typeof import('./cloud')>(),getCloudClient:()=>({auth:{onAuthStateChange:(callback:typeof runtime.listener)=>{runtime.listener=callback;return {data:{subscription:{unsubscribe:vi.fn()}}};}}})}));
vi.mock('./CloudAccountBar',()=>({default:()=>null}));
vi.mock('./Diagnostic',()=>({default:({state,update}:{state:StudyState;update:NonNullable<typeof runtime.update>})=>{
 runtime.update=update;return <div data-testid="diagnostic"><p>{state.answers.PRIVATE??'empty'}</p><button onClick={()=>update(s=>({...s,answers:{PRIVATE:'A edit'}}))}>edit</button></div>;
}}));
import {loadStudy,saveStudy} from './storage';
import App from './App';
let root:Root,container:HTMLDivElement;
const snapshot=(owner:string,value?:string):LoadedStudy=>({owner,state:{...emptyState(),answers:value?{PRIVATE:value}:{}}});
const deferred=<T,>()=>{let resolve!:(value:T)=>void;const promise=new Promise<T>(r=>{resolve=r;});return {promise,resolve};};
beforeEach(()=>{
 vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT',true);vi.spyOn(window,'scrollTo').mockImplementation(()=>{});
 vi.mocked(loadStudy).mockReset();vi.mocked(saveStudy).mockReset();
 location.hash='diagnostico';container=document.createElement('div');document.body.append(container);root=createRoot(container);
});
afterEach(async()=>{await act(async()=>root.unmount());container.remove();vi.restoreAllMocks();});
async function render(){await act(async()=>{root.render(<App/>);});await act(async()=>{await new Promise(r=>setTimeout(r,0));});}
const text=()=>container.querySelector('[data-testid="diagnostic"]')?.textContent;

describe('interface e gerações de conta (DOM isolado, sem nuvem real)',()=>{
 it('ignora resultado de gravação A depois de carregar B',async()=>{
  vi.mocked(loadStudy).mockResolvedValueOnce(snapshot('A','A secret'));
  const saving=deferred<StudyState>();vi.mocked(saveStudy).mockReturnValueOnce(saving.promise);
  await render();expect(text()).toContain('A secret');
  await act(async()=>{container.querySelector<HTMLButtonElement>('[data-testid="diagnostic"] button')!.click();});
  expect(vi.mocked(saveStudy).mock.calls[0][1]).toBe('A');
  vi.mocked(loadStudy).mockResolvedValueOnce(snapshot('B'));
  await act(async()=>runtime.listener?.('SIGNED_IN',{user:{id:'B'}}));
  expect(text()).toContain('empty');
  await act(async()=>saving.resolve(snapshot('A','A late').state));
  expect(text()).toContain('empty');expect(container.textContent).not.toContain('A late');
 });
 it('descarta carregamento A que termina depois do carregamento B',async()=>{
  const loading=deferred<LoadedStudy>();vi.mocked(loadStudy).mockReturnValueOnce(loading.promise);
  await render();expect(container.textContent).toContain('Carregando seu percurso');
  vi.mocked(loadStudy).mockResolvedValueOnce(snapshot('B','B own'));
  await act(async()=>runtime.listener?.('SIGNED_IN',{user:{id:'B'}}));
  await act(async()=>loading.resolve(snapshot('A','A private')));
  expect(text()).toContain('B own');expect(container.textContent).not.toContain('A private');
 });
 it('callback antigo não importa dados da conta anterior na conta nova',async()=>{
  vi.mocked(loadStudy).mockResolvedValueOnce(snapshot('A'));await render();const oldUpdate=runtime.update;
  vi.mocked(loadStudy).mockResolvedValueOnce(snapshot('B'));
  await act(async()=>runtime.listener?.('SIGNED_IN',{user:{id:'B'}}));
  await act(async()=>oldUpdate?.(s=>({...s,answers:{PRIVATE:'A delayed import'}})));
  expect(saveStudy).not.toHaveBeenCalled();expect(text()).toContain('empty');
 });
});
