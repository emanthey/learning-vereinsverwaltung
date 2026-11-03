import type { Mitglied, MitgliedStatus } from './mitglied.ts';

function istStatus(x: unknown): x is MitgliedStatus {
  return x === 'aktiv' || x === 'passiv' || x === 'ausgetreten';
}

export function parseMitglied(input: unknown): Mitglied {
  if (typeof input !== 'object' || input === null) {
    throw new Error('Eintrag ist kein Objekt');
  }

  if (!('id' in input) || typeof input.id !== 'number') {
    throw new Error('id fehlt oder ist keine Zahl');
  }
  if (!('vorname' in input) || typeof input.vorname !== 'string') {
    throw new Error('Vorname fehlt oder ist kein String');
  }
  if (!('nachname' in input) || typeof input.nachname !== 'string') {
    throw new Error('Nachname fehlt oder ist kein String');
  }
  if (!('status' in input) || !istStatus(input.status)) {
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
  if (
    !('eintrittsdatum' in input) ||
    typeof input.eintrittsdatum !== 'string'
  ) {
    throw new Error('eintrittsdatum fehlt oder ist kein String');
  }
  const eintrittsdatum = new Date(input.eintrittsdatum);
  if (Number.isNaN(eintrittsdatum.getTime())) {
    throw new Error(
      `eintrittsdatum ist kein gültiges Datum: ${input.eintrittsdatum}`,
    );
  }

  return {
    id: input.id,
    vorname: input.vorname,
    nachname: input.nachname,
    status: input.status,
    email,
    eintrittsdatum,
  };
}
