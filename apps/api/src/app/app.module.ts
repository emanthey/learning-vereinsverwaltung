import { Module } from '@nestjs/common';
import { AppController } from './app.controller.ts';
import { AppService } from './app.service.ts';
import { MembersModule } from '../members/members.module.ts';
import { CONFIG, loadConfig } from '../config/config.ts';

@Module({
  controllers: [AppController],
  providers: [
    AppService,
    { provide: CONFIG, useFactory: () => loadConfig(process.env) },
  ],
  imports: [MembersModule],
})
export class AppModule {}
