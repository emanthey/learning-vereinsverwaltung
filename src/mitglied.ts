export type MitgliedStatus = 'aktiv' | 'passiv' | 'ausgetreten';

export interface Mitglied {
  id: number,
  vorname: string,
  nachname: string,
  email?: string,
  status: MitgliedStatus,
  eintrittsdatum: Date
}

export function vollerName(m: Mitglied): string {
  return `${m.vorname} ${m.nachname}`;
}

export function findeErstes<T>(liste: T[], bedingung: (x: T) => boolean): T | undefined {
  for (const element of liste) {
    if(bedingung(element)) {
      return element;
    }
  }
  return undefined;
}
