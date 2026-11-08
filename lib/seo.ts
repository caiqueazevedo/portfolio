import type { Metadata } from "next";
import { site } from "@/content/site";
import { LANG_TAG, routing, type Locale } from "@/i18n/routing";

function localePath(locale: string, path: string) {
  return `/${locale}${path === "/" ? "" : path}`;
}

export function localizedAlternates(locale: Locale, path: string): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[LANG_TAG[l]] = localePath(l, path);
  languages["x-default"] = localePath(routing.defaultLocale, path);
  return { canonical: localePath(locale, path), languages };
}

export type BreadcrumbEntry = { label: string; path?: string };

export function breadcrumbJsonLd(locale: Locale, items: BreadcrumbEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.path ? { item: `${site.url}${localePath(locale, item.path)}` } : {}),
    })),
  };
}
