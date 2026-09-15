import { describe, expect, it, vi } from "vitest";
import { verifyTurnstile } from "./turnstile";

function fetchReturning(status: number, json: unknown) {
  return vi.fn().mockResolvedValue({ ok: status < 400, json: async () => json }) as unknown as typeof fetch;
}

describe("verifyTurnstile", () => {
  it("posts secret, token and ip to siteverify and accepts a success", async () => {
    const fetchImpl = fetchReturning(200, { success: true, hostname: "www.caiqueazevedo.com.br" });
    const ok = await verifyTurnstile({ token: "tok", secret: "sec", remoteIp: "1.2.3.4", fetchImpl });
    expect(ok).toBe(true);
    const [url, init] = (fetchImpl as unknown as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(url).toContain("challenges.cloudflare.com");
    const body = init.body as URLSearchParams;
    expect(body.get("secret")).toBe("sec");
    expect(body.get("response")).toBe("tok");
    expect(body.get("remoteip")).toBe("1.2.3.4");
  });

  it("rejects when Cloudflare says no", async () => {
    const fetchImpl = fetchReturning(200, { success: false, "error-codes": ["invalid-input-response"] });
    expect(await verifyTurnstile({ token: "tok", secret: "sec", fetchImpl })).toBe(false);
  });

  it("rejects a token minted for another hostname", async () => {
    const fetchImpl = fetchReturning(200, { success: true, hostname: "evil.example" });
    expect(
      await verifyTurnstile({ token: "tok", secret: "sec", expectedHostname: "www.caiqueazevedo.com.br", fetchImpl }),
    ).toBe(false);
  });

  it("rejects on a non-2xx from siteverify", async () => {
    const fetchImpl = fetchReturning(500, {});
    expect(await verifyTurnstile({ token: "tok", secret: "sec", fetchImpl })).toBe(false);
  });
});
