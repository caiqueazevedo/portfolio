import { describe, expect, it } from "vitest";
import { localePath, openSourceUrl, wwwUrl } from "./urls";

describe("localePath", () => {
  it("collapses the root into the bare locale", () => {
    expect(localePath("pt", "/")).toBe("/pt");
  });

  it("keeps a nested path after the locale", () => {
    expect(localePath("en", "/work/zenid")).toBe("/en/work/zenid");
  });
});

describe("wwwUrl", () => {
  it("points at the marketing host", () => {
    expect(wwwUrl("pt", "/contact")).toBe("https://www.caiqueazevedo.com.br/pt/contact");
  });
});

describe("openSourceUrl", () => {
  it("drops the section segment on the subdomain", () => {
    expect(openSourceUrl("pt")).toBe("https://open-source.caiqueazevedo.com.br/pt");
  });

  it("serves an experiment straight off the locale root", () => {
    expect(openSourceUrl("en", "pixel-sort")).toBe(
      "https://open-source.caiqueazevedo.com.br/en/pixel-sort",
    );
  });
});
