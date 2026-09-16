import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ExperimentCard } from "@/components/features/experiment-card";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { IconButtonLink } from "@/components/ui/icon-button";
import { experiments } from "@/content/experiments";
import { routing } from "@/i18n/routing";
import { localizedAlternates } from "@/lib/seo";

export function generateStaticParams() {
  return experiments.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/open-source/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const experiment = experiments.find((e) => e.slug === slug);
  if (!experiment || !hasLocale(routing.locales, locale)) return {};
  return {
    title: experiment.title,
    description: experiment.summary[locale],
    alternates: localizedAlternates(locale, `/open-source/${slug}`),
  };
}

export default async function ExperimentPage({ params }: PageProps<"/[locale]/open-source/[slug]">) {
  const { slug } = await params;
  const index = experiments.findIndex((e) => e.slug === slug);
  if (index < 0) notFound();
  const experiment = experiments[index];
  const next = experiments[(index + 1) % experiments.length];
  const t = await getTranslations("openSource");

  return (
    <>
      <Container className="pt-8">
        <ButtonLink href="/open-source" variant="ghost" size="sm">
          {t("back")}
        </ButtonLink>
      </Container>
      <div className="mt-6">
        <ExperimentCard experiment={experiment} index={index} />
      </div>
      <section className="border-t-2 border-ink-700">
        <Container className="flex items-center justify-between gap-4 py-7">
          <span className="label text-ink-500">
            {t("next")}: {next.title}
          </span>
          <IconButtonLink href={`/open-source/${next.slug}`} label={`${t("next")}: ${next.title}`} />
        </Container>
      </section>
    </>
  );
}
