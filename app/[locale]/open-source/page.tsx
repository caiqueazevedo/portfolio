import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ExperimentCard } from "@/components/features/experiment-card";
import { Container } from "@/components/ui/container";
import { Sticker } from "@/components/ui/sticker";
import { experiments } from "@/content/experiments";
import { routing } from "@/i18n/routing";
import { localizedAlternates } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/open-source">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "openSource" });
  return { title: t("metaTitle"), description: t("metaDescription"), alternates: localizedAlternates(locale, "/open-source") };
}

export default async function OpenSourcePage() {
  const t = await getTranslations("openSource");

  return (
    <>
      <section className="grain relative">
        <Container className="pt-12 pb-8">
          <span className="font-mono text-[14px] text-acid-500">{t("kicker")}</span>
          <h1 className="mt-2 max-w-[14ch] text-[clamp(48px,8vw,110px)] text-paper-100">{t("title")}</h1>
          <p className="mt-5 max-w-[480px] text-[15px] text-ink-300">{t("lead")}</p>
        </Container>
        <div className="absolute top-10 right-gutter hidden lg:block">
          <Sticker color="acid" marker rotate={3}>
            {t("sticker")}
          </Sticker>
        </div>
      </section>
      {experiments.map((e, i) => (
        <ExperimentCard key={e.slug} experiment={e} index={i} />
      ))}
    </>
  );
}
