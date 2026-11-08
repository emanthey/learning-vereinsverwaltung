import { z } from 'zod';

export const createMemberSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.email().optional(),
  status: z.enum(['aktiv', 'passiv', 'ausgetreten']),
  joinedAt: z.iso.date().transform((s) => new Date(s)),
});

export type CreateMember = z.infer<typeof createMemberSchema>;
