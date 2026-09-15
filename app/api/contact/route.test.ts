import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/turnstile", () => ({ verifyTurnstile: vi.fn() }));
vi.mock("@opennextjs/cloudflare", () => ({
  getCloudflareContext: vi.fn().mockRejectedValue(new Error("not on workers")),
}));

import { verifyTurnstile } from "@/lib/turnstile";
import { POST } from "./route";

const valid = {
  name: "Ana Souza",
  email: "ana@example.com",
  company: "",
  message: "Preciso de um app pra minha loja, com login e catálogo.",
  turnstileToken: "tok",
};

function post(body: unknown) {
  return POST(new NextRequest("http://localhost/api/contact", { method: "POST", body: JSON.stringify(body) }));
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    process.env.TURNSTILE_SECRET_KEY = "secret";
    vi.mocked(verifyTurnstile).mockResolvedValue(true);
  });
  afterEach(() => {
    delete process.env.TURNSTILE_SECRET_KEY;
    vi.clearAllMocks();
  });

  it("rejects an invalid payload with 400", async () => {
    const res = await post({ ...valid, email: "not-an-email" });
    expect(res.status).toBe(400);
  });

  it("rejects a filled honeypot with 400", async () => {
    const res = await post({ ...valid, website: "http://spam" });
    expect(res.status).toBe(400);
  });

  it("returns 403 when the Turnstile token fails", async () => {
    vi.mocked(verifyTurnstile).mockResolvedValue(false);
    const res = await post(valid);
    expect(res.status).toBe(403);
  });

  it("returns 500 when the secret is missing", async () => {
    delete process.env.TURNSTILE_SECRET_KEY;
    const res = await post(valid);
    expect(res.status).toBe(500);
  });

  it("accepts a valid submission without an email binding in dev", async () => {
    const info = vi.spyOn(console, "info").mockImplementation(() => {});
    const res = await post(valid);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true, delivered: false });
    expect(info).toHaveBeenCalled();
    info.mockRestore();
  });
});
