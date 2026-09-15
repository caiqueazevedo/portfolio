import { describe, expect, it } from "vitest";
import { localizedAlternates } from "./seo";

describe("localizedAlternates", () => {
  it("builds canonical and hreflang for the home route", () => {
    expect(localizedAlternates("pt", "/")).toEqual({
      canonical: "/pt",
      languages: { "pt-BR": "/pt", en: "/en", "x-default": "/pt" },
    });
  });

  it("keeps nested paths and points x-default at the default locale", () => {
    expect(localizedAlternates("en", "/work/zenid")).toEqual({
      canonical: "/en/work/zenid",
      languages: { "pt-BR": "/pt/work/zenid", en: "/en/work/zenid", "x-default": "/pt/work/zenid" },
    });
  });
});
