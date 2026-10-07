import {describe,expect,it} from 'vitest';
import {mergeStudyStates} from './cloud';
import {emptyState} from './study';

function state(updatedAt:string,answers:Record<string,string>){return {...emptyState(),answers,updatedAt};}

describe('mergeStudyStates',()=>{
 it('preserva respostas dos dois dispositivos e prefere o estado mais recente em conflitos',()=>{
  const older=state('2026-10-07T10:00:00.000Z',{A:'1',B:'antiga'});
  const newer=state('2026-10-07T11:00:00.000Z',{B:'nova',C:'3'});
  const merged=mergeStudyStates(older,newer);
  expect(merged.answers).toEqual({A:'1',B:'nova',C:'3'});
  expect(merged.updatedAt).toBe('2026-10-07T11:00:00.000Z');
 });

 it('não deixa um estado vazio recém-criado apagar progresso real',()=>{
  const real=state('2026-10-06T10:00:00.000Z',{A:'respondida'});
  const empty=state('2026-10-07T12:00:00.000Z',{});
  expect(mergeStudyStates(real,empty).answers).toEqual({A:'respondida'});
 });
});
