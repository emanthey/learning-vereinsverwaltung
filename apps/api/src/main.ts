import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module.ts';
import { CONFIG, type Config } from './config/config.ts';
import { TimingInterceptor } from './common/timing.interceptor.ts';

const app = await NestFactory.create(AppModule);

app.useGlobalInterceptors(new TimingInterceptor());

await app.listen(app.get<Config>(CONFIG).PORT);
