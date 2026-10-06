import type { ContactPayload } from "./contact-schema";
export type EmailSender = {
  send(message: {
    from: string;
    to: string;
    subject: string;
    text: string;
    replyTo?: string;
  }): Promise<void>;
};

export function buildContactEmail(
  input: Omit<ContactPayload, "turnstileToken" | "website">,
  opts: { from: string; to: string },
) {
  const company = input.company ? ` (${input.company})` : "";
  return {
    from: opts.from,
    to: opts.to,
    replyTo: input.email,
    subject: `[site] ${input.name}${company}`,
    text: [
      `Nome: ${input.name}`,
      `E-mail: ${input.email}`,
      `Empresa: ${input.company || "-"}`,
      "",
      input.message,
    ].join("\n"),
  };
}
