import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { nachricht: string } {
    return { nachricht: 'Hallo Verein' };
  }
}
