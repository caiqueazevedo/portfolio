import { afterEach, describe, expect, it, vi } from "vitest";
import { localePath, openSourceTarget, wwwHome, wwwPath } from "./urls";

async function inProduction() {
  vi.stubEnv("NODE_ENV", "production");
  vi.resetModules();
  return import("./urls");
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("localePath", () => {
  it("collapses the root into the bare locale", () => {
    expect(localePath("pt", "/")).toBe("/pt");
  });

  it("keeps a nested path after the locale", () => {
    expect(localePath("en", "/work/zenid")).toBe("/en/work/zenid");
  });
});

describe("wwwPath", () => {
  it("keeps the canonical URL on the marketing host", () => {
    expect(wwwPath("pt", "/contact").url).toBe("https://www.caiqueazevedo.com.br/pt/contact");
  });

  it("links by path alone, because the subdomain hands those paths back", () => {
    expect(wwwPath("pt", "/contact").link).toBe("/contact");
    expect(wwwPath("en", "/work").link).toBe("/work");
  });
});

describe("wwwHome", () => {
  it("links to the local root while a single origin serves everything", () => {
    expect(wwwHome("pt")).toEqual({ url: "https://www.caiqueazevedo.com.br/pt", link: "/" });
  });

  it("gives up the client transition in production, where the root is the other host's list", async () => {
    const { wwwHome: split } = await inProduction();
    expect(split("pt")).toEqual({ url: "https://www.caiqueazevedo.com.br/pt", link: null });
  });
});

describe("openSourceTarget", () => {
  it("drops the section segment from the canonical URL", () => {
    expect(openSourceTarget("pt").url).toBe("https://open-source.caiqueazevedo.com.br/pt");
  });

  it("serves an experiment straight off the locale root", () => {
    expect(openSourceTarget("en", "pixel-sort").url).toBe(
      "https://open-source.caiqueazevedo.com.br/en/pixel-sort",
    );
  });

  it("keeps the section in the link while one origin serves both", () => {
    expect(openSourceTarget("pt").link).toBe("/open-source");
    expect(openSourceTarget("en", "pixel-sort").link).toBe("/open-source/pixel-sort");
  });

  it("crosses hosts in production", async () => {
    const { openSourceTarget: split } = await inProduction();
    expect(split("pt").link).toBeNull();
    expect(split("en", "pixel-sort").link).toBeNull();
  });
});
