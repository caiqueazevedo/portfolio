import { NextResponse, type NextRequest } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { buildContactEmail, type EmailSender } from "@/lib/email";
import { verifyTurnstile } from "@/lib/turnstile";

type Bindings = {
  EMAIL?: EmailSender;
  TURNSTILE_SECRET_KEY?: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
};

/**
 * Cloudflare bindings on Workers (and in `next dev` via initOpenNextCloudflareForDev),
 * with process.env underneath so `.env.local` still works for local secrets.
 */
async function getBindings(): Promise<Bindings> {
  const fromProcess = process.env as unknown as Bindings;
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const { env } = await getCloudflareContext({ async: true });
    return { ...fromProcess, ...(env as unknown as Bindings) };
  } catch {
    return fromProcess;
  }
}

export async function POST(req: NextRequest) {
  const parsed = contactSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  const { turnstileToken, name, email, company, message } = parsed.data;
  const input = { name, email, company, message };

  const env = await getBindings();
  const secret = env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ ok: false, error: "misconfigured" }, { status: 500 });
  }

  const human = await verifyTurnstile({
    token: turnstileToken,
    secret,
    remoteIp: req.headers.get("cf-connecting-ip"),
    expectedHostname: process.env.NODE_ENV === "production" ? req.nextUrl.hostname : null,
  });
  if (!human) {
    return NextResponse.json({ ok: false, error: "captcha" }, { status: 403 });
  }

  const to = env.CONTACT_TO;
  const from = env.CONTACT_FROM;
  if (!env.EMAIL || !to || !from) {
    // Local dev without the email binding: keep the flow testable end to end.
    console.info("[contact] (no email binding) would send:", buildContactEmail(input, { from: from ?? "dev@localhost", to: to ?? "dev@localhost" }));
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    await env.EMAIL.send(buildContactEmail(input, { from, to }));
  } catch (err) {
    // Typically the sending domain is not onboarded yet; never leak the reason to the client.
    console.error("[contact] email send failed:", err instanceof Error ? err.message : err);
    return NextResponse.json({ ok: false, error: "email" }, { status: 502 });
  }
  return NextResponse.json({ ok: true, delivered: true });
}
