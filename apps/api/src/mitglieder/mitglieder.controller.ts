import type { Mitglied } from '@learning/mitglied';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { MitgliederService } from './mitglieder.service.ts';
import { ZodValidationPipe } from '../common/zod-validation.pipe.ts';
import {
  neuesMitgliedSchema,
  type NeuesMitglied,
} from './neues-mitglied.schema.ts';

@Controller('/mitglieder')
export class MitgliederController {
  constructor(private readonly mitgliederService: MitgliederService) {}

  @Get('')
  getAllMitglieder(): Mitglied[] {
    return this.mitgliederService.findeAlle();
  }

  @Get(':id')
  getOneMitglied(@Param('id', ParseIntPipe) id: number): Mitglied {
    return this.mitgliederService.findeEins(id);
  }

  @Post()
  postOneMitglied(
    @Body(new ZodValidationPipe(neuesMitgliedSchema)) daten: NeuesMitglied,
  ): Mitglied {
    return this.mitgliederService.anlegen(daten);
  }
}
