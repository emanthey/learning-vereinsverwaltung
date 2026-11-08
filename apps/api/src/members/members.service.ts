import { Injectable, NotFoundException } from '@nestjs/common';
import type { Member } from '@learning/member';
import type { CreateMember } from './create-member.schema.ts';

@Injectable()
export class MembersService {
  private readonly members: Member[] = [
    {
      id: 1,
      firstName: 'Eddie',
      lastName: 'Eddieson',
      status: 'aktiv',
      joinedAt: new Date('2019-01-01'),
    },
    {
      id: 2,
      firstName: 'Friedrich',
      lastName: 'Friedrichson',
      status: 'aktiv',
      joinedAt: new Date('2000-01-01'),
    },
  ];

  findAll(): Member[] {
    return this.members;
  }

  findOne(id: number): Member {
    for (const m of this.members) {
      if (m.id === id) {
        return m;
      }
    }

    throw new NotFoundException();
  }

  private getNextId(): number {
    let currentId = 0;

    for (const m of this.members) {
      if (m.id > currentId) {
        currentId = m.id;
      }
    }

    return currentId + 1;
  }

  create(data: CreateMember): Member {
    const newMember: Member = {
      id: this.getNextId(),
      ...data,
    };

    this.members.push(newMember);
    return newMember;
  }
}
