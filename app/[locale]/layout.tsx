import type { Metadata } from "next";
import { Atkinson_Hyperlegible_Next, Jost } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { site } from "@/content/site";
import { LANG_TAG, routing } from "@/i18n/routing";
import { A11Y_BOOT } from "@/lib/a11y";
import { localizedAlternates } from "@/lib/seo";
import "../globals.css";
const jost = Jost({ subsets: ["latin"], variable: "--font-jost", display: "swap" });

// Only visitors who turn on the reading font ever need this one, so it stays out of the preload set.
const readable = Atkinson_Hyperlegible_Next({
  subsets: ["latin"],
  variable: "--font-readable",
  display: "swap",
  preload: false,
});

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
export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // The boot script writes the saved preferences as data-* on <html> before React hydrates, so the
  // server markup and the live element differ there on purpose.
  return (
    <html
      lang={LANG_TAG[locale]}
      className={`${jost.variable} ${readable.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        {/* A fixed string, not user input: it reapplies saved preferences before the first paint. */}
        <script dangerouslySetInnerHTML={{ __html: A11Y_BOOT }} />
      </head>
      <body className="min-h-full">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
