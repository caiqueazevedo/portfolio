import { site } from "@/content/site";
import type { Locale } from "@/i18n/routing";

export function localePath(locale: string, path: string) {
  return `/${locale}${path === "/" ? "" : path}`;
}

export function wwwUrl(locale: Locale, path: string) {
  return `${site.url}${localePath(locale, path)}`;
}

export function openSourceUrl(locale: Locale, slug?: string) {
  return `${site.openSource.url}${localePath(locale, slug ? `/${slug}` : "/")}`;
}
