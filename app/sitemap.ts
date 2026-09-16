import type { MetadataRoute } from "next";
import { experiments } from "@/content/experiments";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { LANG_TAG, routing } from "@/i18n/routing";

const ROUTES = [
  "",
  "/work",
  "/open-source",
  "/about",
  "/contact",
  ...projects.map((p) => `/work/${p.slug}`),
  ...experiments.map((e) => `/open-source/${e.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({
    url: `${site.url}/${routing.defaultLocale}${path}`,
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(routing.locales.map((l) => [LANG_TAG[l], `${site.url}/${l}${path}`])),
    },
  }));
}
