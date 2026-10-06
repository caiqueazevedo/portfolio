import type { Metadata } from "next";
import { LANG_TAG, routing, type Locale } from "@/i18n/routing";
export function localizedAlternates(locale: Locale, path: string): Metadata["alternates"] {
  const clean = path === "/" ? "" : path;
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[LANG_TAG[l]] = `/${l}${clean}`;
  languages["x-default"] = `/${routing.defaultLocale}${clean}`;
  return { canonical: `/${locale}${clean}`, languages };
}
