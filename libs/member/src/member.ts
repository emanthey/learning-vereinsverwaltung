export type MemberStatus = 'aktiv' | 'passiv' | 'ausgetreten';

export interface Member {
  id: number;
  firstName: string;
  lastName: string;
  email?: string;
  status: MemberStatus;
  joinedAt: Date;
}

export function fullName(m: Member): string {
  return `${m.firstName} ${m.lastName}`;
}

export function findFirst<T>(
  list: T[],
  predicate: (x: T) => boolean,
): T | undefined {
  for (const element of list) {
    if (predicate(element)) {
      return element;
    }
  }
  return undefined;
}
