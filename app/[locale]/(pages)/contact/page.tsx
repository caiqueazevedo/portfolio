import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/features/contact-form";
import { Rule } from "@/components/ui/rule";
import { site } from "@/content/site";
import { routing } from "@/i18n/routing";
import { localizedAlternates } from "@/lib/seo";
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: localizedAlternates(locale, "/contact"),
  };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");
  const home = await getTranslations("home");
  const chrome = await getTranslations("chrome");

  return (
    <section className="bg-mist px-edge grid grid-cols-1 gap-12 pt-[calc(94px+6vh)] pb-[clamp(56px,10vh,120px)] lg:grid-cols-[1.1fr_1fr] lg:gap-20">
      <div className="flex min-w-0 flex-col gap-7">
        <div className="flex flex-col gap-3.5">
          <span className="kicker">{t("metaTitle")}</span>
          <Rule />
        </div>
        <h1 className="text-[clamp(44px,8vw,140px)] leading-[0.86] font-medium tracking-[-0.01em]">
          {home("contactTitle1")}
          <br />
          {home("contactTitle2")}
        </h1>
        <p className="text-strong max-w-[440px] text-[clamp(15px,1.4vw,19px)] leading-[1.55] text-pretty">
          {t("lead")}
        </p>

        <dl className="border-ink mt-4 grid grid-cols-1 gap-6 border-t pt-7 sm:grid-cols-3">
          <div className="flex flex-col gap-2">
            <dt className="micro text-muted">{chrome("email")}</dt>
            <dd>
              <a href={`mailto:${site.email}`} className="rule-link text-[15px]">
                {site.email}
              </a>
            </dd>
          </div>
          <div className="flex flex-col gap-2">
            <dt className="micro text-muted">{home("contactCode")}</dt>
            <dd>
              <a
                href={site.github}
                target="_blank"
                rel="me noreferrer"
                className="rule-link text-[15px]"
              >
                {site.github.replace("https://", "")}
              </a>
            </dd>
          </div>
          <div className="flex flex-col gap-2">
            <dt className="micro text-muted">{home("contactReply")}</dt>
            <dd className="text-[15px]">{t("statReply")}</dd>
          </div>
        </dl>
      </div>

      <ContactForm siteKey={TURNSTILE_SITE_KEY} title={t("formTitle")} />
    </section>
  );
}
