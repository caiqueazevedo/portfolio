import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/features/contact-form";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { site } from "@/content/site";
import { routing } from "@/i18n/routing";
import { localizedAlternates } from "@/lib/seo";

// Cloudflare's always-passing test key; the real site key comes from the environment.
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("metaTitle"), description: t("metaDescription"), alternates: localizedAlternates(locale, "/contact") };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");
  const tf = await getTranslations("footer");

  return (
    <section>
      <Container className="grid grid-cols-1 gap-12 pt-16 pb-section sm:pt-20 lg:grid-cols-12 lg:gap-8 lg:pt-28">
        <div className="flex min-w-0 flex-col gap-6 lg:col-span-5">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <Heading as="h1" size="display" start={t("titleStart")} accent={t("titleAccent")} className="max-w-[14ch]" />
          <p className="max-w-[30rem] text-lead font-light text-fg-soft">{t("lead")}</p>
          <div className="mt-4 flex flex-col gap-2 border-t border-line pt-6">
            <p className="text-tag tracking-[0.14em] text-muted uppercase">{t("channels")}</p>
            <a href={`mailto:${site.email}`} className="text-base break-all transition-colors hover:text-accent">
              {site.email}
            </a>
            <a href={site.github} target="_blank" rel="me noopener" className="text-base transition-colors hover:text-accent">
              {tf("github")} ↗
            </a>
            {site.linkedin ? (
              <a href={site.linkedin} target="_blank" rel="me noopener" className="text-base transition-colors hover:text-accent">
                {tf("linkedin")} ↗
              </a>
            ) : null}
          </div>
        </div>
        <div className="relative min-w-0 lg:col-span-6 lg:col-start-7">
          <ContactForm siteKey={TURNSTILE_SITE_KEY} />
        </div>
      </Container>
    </section>
  );
}
