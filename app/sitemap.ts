import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { experiments } from "@/content/experiments";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { LANG_TAG, routing } from "@/i18n/routing";

const WWW_ROUTES = ["", "/work", "/about", "/contact", ...projects.map((p) => `/work/${p.slug}`)];

const OPEN_SOURCE_ROUTES = ["", ...experiments.map((e) => `/${e.slug}`)];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = (await headers()).get("host");
  const onOpenSource = host === site.openSource.host;
  const base = onOpenSource ? site.openSource.url : site.url;
  const routes = onOpenSource ? OPEN_SOURCE_ROUTES : WWW_ROUTES;

  return routes.map((path) => ({
    url: `${base}/${routing.defaultLocale}${path}`,
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [LANG_TAG[l], `${base}/${l}${path}`]),
      ),
    },
  }));
}
