import {readFile} from 'node:fs/promises';

import type {Mitglied} from './mitglied.ts';
import {vollerName, findeErstes} from './mitglied.ts';
import { parseMitglied } from './parse.ts';

function istPassiv(m: Mitglied): boolean {
  return m.status === 'passiv';
}

const text = await readFile('data/mitglieder.json', 'utf8');
const roh: unknown = JSON.parse(text);

if(!Array.isArray(roh)) {
  throw new Error('JSON ist kein Array');
}

const mitglieder: Mitglied[] = [];

for (const eintrag of roh) {
  try {
    mitglieder.push(parseMitglied(eintrag));
  } catch (e) {
    console.log(e instanceof Error ? e.message : String(e));
  }
}

const passivesMitglied = findeErstes(mitglieder, istPassiv);

if(passivesMitglied !== undefined) {
  console.log(vollerName(passivesMitglied));
} else {
  console.log('Kein passives Mitglied.');
}

for(const mitglied of mitglieder) {
  console.log(mitglied.email ?? '(Keine Email)');
}
