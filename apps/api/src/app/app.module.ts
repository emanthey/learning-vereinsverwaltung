import { Module } from '@nestjs/common';
import { AppController } from './app.controller.ts';
import { AppService } from './app.service.ts';
import { MembersModule } from '../members/members.module.ts';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [MembersModule],
})
export class AppModule {}
