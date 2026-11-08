import { z } from 'zod';

export const configSchema = z.object({
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  CLUB_NAME: z.string().min(1),
});

export type Config = z.infer<typeof configSchema>;

export const CONFIG = Symbol('CONFIG');

export function loadConfig(env: NodeJS.ProcessEnv): Config {
  const result = configSchema.safeParse(env);

  if (!result.success) {
    throw new Error(
      'Ungueltige Konfiguration:\n' + z.prettifyError(result.error),
    );
  }

  return result.data;
}
