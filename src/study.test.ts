import {describe,it,expect} from 'vitest';
import {emptyState,emptyProgress,canConsolidate,continuation,validateBackup} from './study';
describe('Continuidade e domínio',()=>{
 it('não consolida uma aula aberta ou somente lida',()=>{const p=emptyProgress();p.status='aprendendo';expect(canConsolidate(p)).toBe(false);p.evidence={explained:true,direct:true,application:true,transfer:true,recall:true};expect(canConsolidate(p)).toBe(false);p.correct=1;p.reviews=1;expect(canConsolidate(p)).toBe(true)});
 it('retoma o ponto real e ignora cursor desconhecido',()=>{const s=emptyState();s.answers.a='resposta';expect(continuation(s,['a','b'])).toBe('b');s.cursor='a';expect(continuation(s,['a','b'])).toBe('a');s.cursor='inexistente';expect(continuation(s,['a','b'])).toBe('b')});
 it('rejeita backups que corromperiam respostas e erros',()=>{expect(()=>validateBackup({version:9})).toThrow();const s=emptyState();expect(validateBackup(s)).toEqual(s);expect(()=>validateBackup({...s,answers:{a:{html:'x'}}})).toThrow();expect(()=>validateBackup({...s,errors:[{kind:'inválido'}]})).toThrow()});
});
