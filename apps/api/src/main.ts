import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module.ts';
import { CONFIG, type Config } from './config/config.ts';

const app = await NestFactory.create(AppModule);
await app.listen(app.get<Config>(CONFIG).PORT);
