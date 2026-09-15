import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { CaseCard } from "@/components/features/case-card";
import { Cta } from "@/components/features/cta";
import { Reveal } from "@/components/features/reveal";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { projects } from "@/content/projects";
import { routing } from "@/i18n/routing";
import { localizedAlternates } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/work">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "work" });
  return { title: t("metaTitle"), description: t("metaDescription"), alternates: localizedAlternates(locale, "/work") };
}

const GLOWS = ["30% 70%", "70% 30%", "30% 30%", "70% 70%", "50% 20%", "20% 50%"];

export default async function WorkPage() {
  const t = await getTranslations("work");
  const tc = await getTranslations("cases");
  const locale = await getLocale();

  return (
    <>
      <section>
        <Container className="flex flex-col gap-5 pt-16 pb-12 sm:pt-20 lg:pt-28 lg:pb-16">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <Heading as="h1" size="display" start={t("titleStart")} accent={t("titleAccent")} className="max-w-[18ch]" />
          <p className="max-w-[36rem] text-lead font-light text-fg-soft">{t("lead")}</p>
        </Container>
      </section>
      <section>
        <Container className="grid grid-cols-1 gap-12 pb-section md:grid-cols-2 md:gap-x-8 md:gap-y-14">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.08} className="min-w-0">
              <CaseCard project={p} locale={locale} readLabel={tc("read")} glow={GLOWS[i]} priority={i < 2} />
            </Reveal>
          ))}
        </Container>
      </section>
      <Cta />
    </>
  );
}
