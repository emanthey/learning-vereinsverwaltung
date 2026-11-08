import { Module } from '@nestjs/common';
import { AppController } from './app.controller.ts';
import { AppService } from './app.service.ts';
import { MitgliederModule } from '../mitglieder/mitglieder.module.ts';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [MitgliederModule],
})
export class AppModule {}
