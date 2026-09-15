const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type VerifyResponse = { success: boolean; hostname?: string; "error-codes"?: string[] };

/**
 * Server-side check of a Turnstile token. Tokens are single-use and expire in 5 minutes.
 * `expectedHostname` guards against a token minted for another site.
 */
export async function verifyTurnstile(opts: {
  token: string;
  secret: string;
  remoteIp?: string | null;
  expectedHostname?: string | null;
  fetchImpl?: typeof fetch;
}): Promise<boolean> {
  const body = new URLSearchParams({ secret: opts.secret, response: opts.token });
  if (opts.remoteIp) body.set("remoteip", opts.remoteIp);

  const res = await (opts.fetchImpl ?? fetch)(VERIFY_URL, { method: "POST", body });
  if (!res.ok) return false;
  const data = (await res.json()) as VerifyResponse;
  if (!data.success) return false;
  if (opts.expectedHostname && data.hostname && data.hostname !== opts.expectedHostname) return false;
  return true;
}
