import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { LANG_TAG, routing } from "@/i18n/routing";

const ROUTES = ["", "/work", "/about", "/contact", ...projects.map((p) => `/work/${p.slug}`)];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({
    url: `${site.url}/${routing.defaultLocale}${path}`,
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(routing.locales.map((l) => [LANG_TAG[l], `${site.url}/${l}${path}`])),
    },
  }));
}
