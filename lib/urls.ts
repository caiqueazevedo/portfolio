import { site } from "@/content/site";
import type { Locale } from "@/i18n/routing";

// Only a production deployment actually has two hosts. Everywhere else — dev, tests, the
// workerd preview — a single origin serves both, so a link that names a host leaves it.
const SPLIT_HOSTS = process.env.NODE_ENV === "production";

export function localePath(locale: string, path: string) {
  return `/${locale}${path === "/" ? "" : path}`;
}

/**
 * Where a page lives. `url` is canonical and absolute, for metadata and JSON-LD. `link` is
 * the path to hand `Link` while the current origin serves that page, and null when the link
 * has to cross hosts and give up the client-side transition.
 */
export type Target = { url: string; link: string | null };

/**
 * A page on www, reachable from either host by its path alone: the open-source host
 * redirects those paths over (see `next.config.ts`).
 */
export function wwwPath(locale: Locale, path: string): Target {
  return { url: `${site.url}${localePath(locale, path)}`, link: path };
}

/** The www home. The open-source host serves its own root, so this one always crosses. */
export function wwwHome(locale: Locale): Target {
  return { url: `${site.url}${localePath(locale, "/")}`, link: SPLIT_HOSTS ? null : "/" };
}

/** An experiment, or the list. The subdomain drops the `/open-source` segment. */
export function openSourceTarget(locale: Locale, slug?: string): Target {
  const tail = slug ? `/${slug}` : "";
  return {
    url: `${site.openSource.url}${localePath(locale, tail || "/")}`,
    link: SPLIT_HOSTS ? null : `/open-source${tail}`,
  };
}
