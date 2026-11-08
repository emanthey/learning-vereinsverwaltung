import type { Member, MemberStatus } from './member.ts';

function isStatus(x: unknown): x is MemberStatus {
  return x === 'aktiv' || x === 'passiv' || x === 'ausgetreten';
}

export function parseMember(input: unknown): Member {
  if (typeof input !== 'object' || input === null) {
    throw new Error('Eintrag ist kein Objekt');
  }

  if (!('id' in input) || typeof input.id !== 'number') {
    throw new Error('id fehlt oder ist keine Zahl');
  }
  if (!('firstName' in input) || typeof input.firstName !== 'string') {
    throw new Error('firstName fehlt oder ist kein String');
  }
  if (!('lastName' in input) || typeof input.lastName !== 'string') {
    throw new Error('lastName fehlt oder ist kein String');
  }
  if (!('status' in input) || !isStatus(input.status)) {
    throw new Error('status muss aktiv|passiv|ausgetreten sein');
  }

  // email ist optional: Fehlen ist erlaubt, falscher Typ nicht
  let email: string | undefined;
  if ('email' in input) {
    if (typeof input.email !== 'string') {
      throw new Error('email ist kein String');
    }
    email = input.email;
  }

  // JSON kennt kein Date: erst String prüfen, dann umwandeln, dann Gültigkeit prüfen
  if (!('joinedAt' in input) || typeof input.joinedAt !== 'string') {
    throw new Error('joinedAt fehlt oder ist kein String');
  }
  const joinedAt = new Date(input.joinedAt);
  if (Number.isNaN(joinedAt.getTime())) {
    throw new Error(`joinedAt ist kein gültiges Datum: ${input.joinedAt}`);
  }

  return {
    id: input.id,
    firstName: input.firstName,
    lastName: input.lastName,
    status: input.status,
    email,
    joinedAt,
  };
}
