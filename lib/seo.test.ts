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
    expect(
      breadcrumbJsonLd([
        { label: "Início", url: "https://www.caiqueazevedo.com.br/pt" },
        { label: "Cases" },
      ]),
    ).toEqual({
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

  it("carries whatever host the crumb was built for", () => {
    const trail = breadcrumbJsonLd([
      { label: "Home", url: "https://www.caiqueazevedo.com.br/en" },
      { label: "Open source", url: "https://open-source.caiqueazevedo.com.br/en" },
      { label: "Pixel sort", url: "https://open-source.caiqueazevedo.com.br/en/pixel-sort" },
    ]);
    expect(trail.itemListElement.map((i) => i.item)).toEqual([
      "https://www.caiqueazevedo.com.br/en",
      "https://open-source.caiqueazevedo.com.br/en",
      "https://open-source.caiqueazevedo.com.br/en/pixel-sort",
    ]);
  });

  it("leaves out item on a crumb that has no url", () => {
    const [first] = breadcrumbJsonLd([{ label: "404" }]).itemListElement;
    expect(first).not.toHaveProperty("item");
    expect(first.position).toBe(1);
  });
});
