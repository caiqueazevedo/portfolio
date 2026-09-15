import { describe, expect, it } from "vitest";
import { buildContactEmail } from "./email";

describe("buildContactEmail", () => {
  it("addresses the mail to the inbox and replies to the visitor", () => {
    const mail = buildContactEmail(
      { name: "Ana", email: "ana@example.com", company: "Acme", message: "Preciso de um app." },
      { from: "site@caiqueazevedo.com.br", to: "inbox@example.com" },
    );
    expect(mail.to).toBe("inbox@example.com");
    expect(mail.replyTo).toBe("ana@example.com");
    expect(mail.subject).toBe("[site] Ana (Acme)");
    expect(mail.text).toContain("Preciso de um app.");
  });

  it("omits the company suffix when empty", () => {
    const mail = buildContactEmail(
      { name: "Ana", email: "ana@example.com", company: "", message: "Oi, tudo bem por aí?" },
      { from: "a@b.c", to: "d@e.f" },
    );
    expect(mail.subject).toBe("[site] Ana");
  });
});
