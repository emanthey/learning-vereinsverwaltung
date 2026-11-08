import { z } from 'zod';

export const neuesMitgliedSchema = z.object({
  vorname: z.string().min(1),
  nachname: z.string().min(1),
  email: z.email().optional(),
  status: z.enum(['aktiv', 'passiv', 'ausgetreten']),
  eintrittsdatum: z.iso.date().transform((s) => new Date(s)),
});

export type NeuesMitglied = z.infer<typeof neuesMitgliedSchema>;
