import { describe, expect, it } from "vitest";
import { breadcrumbJsonLd, localizedAlternates } from "./seo";

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

describe("breadcrumbJsonLd", () => {
  it("numbers a two-level trail from one", () => {
    expect(breadcrumbJsonLd("pt", [{ label: "Início", path: "/" }, { label: "Cases" }])).toEqual({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Início",
          item: "https://www.caiqueazevedo.com.br/pt",
        },
        { "@type": "ListItem", position: 2, name: "Cases" },
      ],
    });
  });

  it("carries the locale prefix into every absolute URL", () => {
    const trail = breadcrumbJsonLd("en", [
      { label: "Home", path: "/" },
      { label: "Cases", path: "/work" },
      { label: "ZenID", path: "/work/zenid" },
    ]);
    expect(trail.itemListElement.map((i) => i.item)).toEqual([
      "https://www.caiqueazevedo.com.br/en",
      "https://www.caiqueazevedo.com.br/en/work",
      "https://www.caiqueazevedo.com.br/en/work/zenid",
    ]);
  });

  it("leaves out item on a crumb that has no path", () => {
    const [first] = breadcrumbJsonLd("pt", [{ label: "404" }]).itemListElement;
    expect(first).not.toHaveProperty("item");
    expect(first.position).toBe(1);
  });
});
