import { site } from "@/content/site";
import type { Locale } from "@/i18n/routing";

const SPLIT_HOSTS = process.env.NODE_ENV === "production";

export function localePath(locale: string, path: string) {
  return `/${locale}${path === "/" ? "" : path}`;
}

export type Target = { url: string; link: string | null };

export function wwwPath(locale: Locale, path: string): Target {
  return { url: `${site.url}${localePath(locale, path)}`, link: path };
}

export function wwwHome(locale: Locale): Target {
  return { url: `${site.url}${localePath(locale, "/")}`, link: SPLIT_HOSTS ? null : "/" };
}

export function openSourceTarget(locale: Locale, slug?: string): Target {
  const tail = slug ? `/${slug}` : "";
  return {
    url: `${site.openSource.url}${localePath(locale, tail || "/")}`,
    link: SPLIT_HOSTS ? null : `/open-source${tail}`,
  };
}
