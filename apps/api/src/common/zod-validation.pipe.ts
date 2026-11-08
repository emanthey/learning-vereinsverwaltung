import { BadRequestException, type PipeTransform } from '@nestjs/common';
import z from 'zod';

export class ZodValidationPipe<T extends z.ZodType> implements PipeTransform {
  constructor(private readonly schema: T) {}

  transform(value: unknown): z.output<T> {
    const ergebnis = this.schema.safeParse(value);

    if (!ergebnis.success) {
      throw new BadRequestException(z.flattenError(ergebnis.error));
    }

    return ergebnis.data;
  }
}
