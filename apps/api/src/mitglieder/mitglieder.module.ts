import { Module } from '@nestjs/common';
import { MitgliederController } from './mitglieder.controller.ts';
import { MitgliederService } from './mitglieder.service.ts';

@Module({
  controllers: [MitgliederController],
  providers: [MitgliederService],
})
export class MitgliederModule {}
