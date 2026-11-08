import { Injectable, NotFoundException } from '@nestjs/common';
import type { Mitglied } from '@learning/mitglied';

@Injectable()
export class MitgliederService {
  private readonly mitglieder: Mitglied[] = [
    {
      id: 1,
      vorname: 'Eddie',
      nachname: 'Eddieson',
      status: 'aktiv',
      eintrittsdatum: new Date('2019-01-01'),
    },
    {
      id: 2,
      vorname: 'Friedrich',
      nachname: 'Friedrichson',
      status: 'aktiv',
      eintrittsdatum: new Date('2000-01-01'),
    },
  ];

  findeAlle(): Mitglied[] {
    return this.mitglieder;
  }

  findeEins(id: number): Mitglied {
    for (const m of this.mitglieder) {
      if (m.id === id) {
        return m;
      }
    }

    throw new NotFoundException();
  }
}
