import {openDB} from 'idb';
import type {StudyState} from './model';
import {emptyState,validateBackup} from './study';
const db=openDB('reconstrucao-escolar',1,{upgrade(db){db.createObjectStore('study');}});
export async function loadStudy():Promise<StudyState>{const v=await(await db).get('study','current');return v?validateBackup(v):emptyState();}
export async function saveStudy(state:StudyState){await(await db).put('study',state,'current');}
