import {
  Injectable,
  Logger,
  type CallHandler,
  type ExecutionContext,
  type NestInterceptor,
} from '@nestjs/common';
import { finalize, type Observable } from 'rxjs';

@Injectable()
export class TimingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(TimingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    // 1. vorher: läuft, bevor der Controller dran ist
    const start = performance.now();

    const request = context
      .switchToHttp()
      .getRequest<{ method: string; url: string }>();

    // 2. next.handle() startet den Rest: Pipe, Controller
    return next.handle().pipe(
      // 3. nachher: läuft, wenn die Antwort da ist
      finalize(() => {
        const end = performance.now();
        const ms = (end - start).toFixed(1);

        this.logger.log(`${request.method} ${request.url} ${ms} ms`);
      }),
    );
  }
}
