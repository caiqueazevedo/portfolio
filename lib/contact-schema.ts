import { z } from "zod";

/** Shared by the form (client) and the route handler (server). */
export const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().max(200),
  company: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().min(20).max(4000),
  /** Honeypot: humans never see it, so it must stay empty. */
  website: z.string().max(0).optional().default(""),
  turnstileToken: z.string().min(1),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactPayload = z.output<typeof contactSchema>;
