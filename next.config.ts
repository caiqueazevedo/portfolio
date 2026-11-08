import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import { site } from "./content/site";
import { routing } from "./i18n/routing";
initOpenNextCloudflareForDev();

const withNextIntl = createNextIntlPlugin();

const LOCALE = `:locale(${routing.locales.join("|")})`;
const onWww = [{ type: "host" as const, value: site.host }];
const onOpenSource = [{ type: "host" as const, value: site.openSource.host }];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/", destination: `/${routing.defaultLocale}`, permanent: false },
      {
        source: `/${LOCALE}/open-source`,
        has: onWww,
        destination: `${site.openSource.url}/:locale`,
        permanent: true,
      },
      {
        source: `/${LOCALE}/open-source/:slug`,
        has: onWww,
        destination: `${site.openSource.url}/:locale/:slug`,
        permanent: true,
      },
      {
        source: `/${LOCALE}/open-source`,
        has: onOpenSource,
        destination: "/:locale",
        permanent: true,
      },
      {
        source: `/${LOCALE}/open-source/:slug`,
        has: onOpenSource,
        destination: "/:locale/:slug",
        permanent: true,
      },
      {
        source: `/${LOCALE}/:section(work|about|contact)`,
        has: onOpenSource,
        destination: `${site.url}/:locale/:section`,
        permanent: true,
      },
      {
        source: `/${LOCALE}/work/:slug`,
        has: onOpenSource,
        destination: `${site.url}/:locale/work/:slug`,
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: `/${LOCALE}`,
          has: onOpenSource,
          destination: "/:locale/open-source",
        },
        {
          source: `/${LOCALE}/:slug`,
          has: onOpenSource,
          destination: "/:locale/open-source/:slug",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default withNextIntl(nextConfig);
