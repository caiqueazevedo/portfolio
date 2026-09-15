import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/features/contact-form";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { StatBlock } from "@/components/ui/stat-block";
import { Sticker } from "@/components/ui/sticker";
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
    <>
      <section className="grain">
        <Container className="grid grid-cols-1 gap-10 py-14 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <div className="min-w-0">
            <h1 className="text-[clamp(48px,7vw,96px)] text-paper-100">
              {t("titleStart")} <span className="text-acid-500">{t("titleAccent")}</span> {t("titleEnd")}
            </h1>
            <p className="mt-5 max-w-[440px] text-[15px] text-ink-300">{t("lead")}</p>
            <div className="mt-9 flex gap-8">
              <StatBlock value={t("statReply")} label={t("statReplyLabel")} />
              <StatBlock value={t("statShipped")} label={t("statShippedLabel")} />
            </div>
            <div className="mt-11">
              <Sticker color="blue" rotate={-2}>
                {t("sticker")}
              </Sticker>
            </div>
          </div>
          <ContactForm siteKey={TURNSTILE_SITE_KEY} title={t("formTitle")} />
        </Container>
      </section>

      <section className="border-t-2 border-ink-700">
        <Container className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-4.5 font-condensed text-[13px] tracking-[0.1em] uppercase">
            <a href={`mailto:${site.email}`} className="break-all text-acid-500 hover:text-white">
              {tf("email")}
            </a>
            <a href={site.github} target="_blank" rel="me noopener" className="text-acid-500 hover:text-white">
              {tf("github")}
            </a>
            {site.linkedin ? (
              <a href={site.linkedin} target="_blank" rel="me noopener" className="text-acid-500 hover:text-white">
                {tf("linkedin")}
              </a>
            ) : null}
          </div>
          <ButtonLink href="/" variant="ghost" size="sm">
            {t("backHome")}
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
