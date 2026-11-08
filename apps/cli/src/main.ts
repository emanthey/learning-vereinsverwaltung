import { readFile } from 'node:fs/promises';

import type { Member } from '@learning/member';
import { fullName, findFirst, parseMember } from '@learning/member';

function isPassive(m: Member): boolean {
  return m.status === 'passiv';
}

const text = await readFile('data/members.json', 'utf8');
const raw: unknown = JSON.parse(text);

if (!Array.isArray(raw)) {
  throw new Error('JSON ist kein Array');
}

const members: Member[] = [];

for (const entry of raw) {
  try {
    members.push(parseMember(entry));
  } catch (e) {
    console.log(e instanceof Error ? e.message : String(e));
  }
}

const passiveMember = findFirst(members, isPassive);

if (passiveMember !== undefined) {
  console.log(fullName(passiveMember));
} else {
  console.log('Kein passives Mitglied.');
}

for (const member of members) {
  console.log(member.email ?? '(Keine Email)');
}
