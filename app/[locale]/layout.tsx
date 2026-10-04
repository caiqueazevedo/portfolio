import type { Metadata } from "next";
import { Jost } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Nav } from "@/components/features/nav";
import { site } from "@/content/site";
import { LANG_TAG, routing } from "@/i18n/routing";
import { localizedAlternates } from "@/lib/seo";
import "../globals.css";

/** One family for the whole site; weights 300–700 cover display, body and labels. */
const jost = Jost({ subsets: ["latin"], variable: "--font-jost", display: "swap" });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(site.url),
    title: { default: t("title"), template: `%s — ${site.name}` },
    description: t("description"),
    alternates: localizedAlternates(locale, "/"),
    openGraph: { type: "website", siteName: site.name, locale: LANG_TAG[locale].replace("-", "_") },
  };
}

/**
 * The shell: the two fixed bars, and whatever the route puts under them.
 *
 * No `<main>` or footer here on purpose. The home is a full-screen rail that ends in its own
 * contact panel, and the scrolling pages add both themselves — wrapping everything in a column
 * with a footer would leave the rail with a 56px strip of nothing below it.
 */
export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <html lang={LANG_TAG[locale]} className={`${jost.variable} h-full`}>
      <body className="min-h-full">
        <NextIntlClientProvider>
          <Nav />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
