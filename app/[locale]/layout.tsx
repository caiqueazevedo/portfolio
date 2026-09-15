import type { Metadata } from "next";
import { Anton, Archivo, Archivo_Narrow, Permanent_Marker, Space_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Footer } from "@/components/features/footer";
import { Nav } from "@/components/features/nav";
import { site } from "@/content/site";
import { LANG_TAG, routing } from "@/i18n/routing";
import { localizedAlternates } from "@/lib/seo";
import "../globals.css";

const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton", display: "swap" });
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap" });
const archivoNarrow = Archivo_Narrow({ subsets: ["latin"], variable: "--font-archivo-narrow", display: "swap" });
const marker = Permanent_Marker({ subsets: ["latin"], weight: "400", variable: "--font-marker-face", display: "swap" });
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-space-mono", display: "swap" });

const FONT_VARS = [anton, archivo, archivoNarrow, marker, spaceMono].map((f) => f.variable).join(" ");

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

  return (
    <html lang={LANG_TAG[locale]} className={`${FONT_VARS} h-full`}>
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider>
          <Nav />
          <main className="flex min-w-0 flex-1 flex-col">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
