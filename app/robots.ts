import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { site } from "@/content/site";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get("host");
  const base = host === site.openSource.host ? site.openSource.url : site.url;

  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${base}/sitemap.xml`,
  };
}
