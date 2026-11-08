import { Inject, Injectable } from '@nestjs/common';
import { CONFIG, type Config } from '../config/config.ts';

@Injectable()
export class AppService {
  constructor(@Inject(CONFIG) private readonly config: Config) {}

  getHello(): { message: string } {
    return { message: `Hallo ${this.config.CLUB_NAME}` };
  }
}
