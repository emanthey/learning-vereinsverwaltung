import type { Member } from '@learning/member';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { MembersService } from './members.service.ts';
import { ZodValidationPipe } from '../common/zod-validation.pipe.ts';
import {
  createMemberSchema,
  type CreateMember,
} from './create-member.schema.ts';

@Controller('/members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get('')
  findAll(): Member[] {
    return this.membersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Member {
    return this.membersService.findOne(id);
  }

  @Post()
  create(
    @Body(new ZodValidationPipe(createMemberSchema)) data: CreateMember,
  ): Member {
    return this.membersService.create(data);
  }
}
