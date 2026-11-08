import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { ExperimentCard } from "@/components/features/experiment-card";
import { PageBreadcrumb } from "@/components/features/page-breadcrumb";
import { Container } from "@/components/ui/container";
import { IconButtonLink } from "@/components/ui/icon-button";
import { Rule } from "@/components/ui/rule";
import { experiments } from "@/content/experiments";
import { site } from "@/content/site";
import { routing } from "@/i18n/routing";
import { localizedAlternates } from "@/lib/seo";

export function generateStaticParams() {
  return experiments.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/open-source/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const experiment = experiments.find((e) => e.slug === slug);
  if (!experiment || !hasLocale(routing.locales, locale)) return {};
  return {
    metadataBase: new URL(site.openSource.url),
    title: experiment.title,
    description: experiment.summary[locale],
    alternates: localizedAlternates(locale, `/${slug}`),
  };
}

export default async function ExperimentPage({
  params,
}: PageProps<"/[locale]/open-source/[slug]">) {
  const { slug } = await params;
  const index = experiments.findIndex((e) => e.slug === slug);
  if (index < 0) notFound();
  const experiment = experiments[index];
  const next = experiments[(index + 1) % experiments.length];
  const t = await getTranslations("openSource");
  const locale = await getLocale();

  return (
    <>
      <section className="bg-mist px-edge relative flex flex-col gap-7 pt-[calc(94px+6vh)] pb-[clamp(40px,8vh,96px)]">
        <PageBreadcrumb section="openSource" leaf={experiment.title} />
        <div className="flex flex-col gap-3.5">
          <span className="kicker">
            {String(index + 1).padStart(2, "0")} — {experiment.tags[0]}
          </span>
          <Rule />
        </div>
        <h1 className="max-w-[16ch] text-[clamp(44px,8vw,140px)] leading-[0.88] font-medium tracking-[-0.01em] break-words hyphens-auto">
          {experiment.title}
        </h1>
        <p className="text-strong max-w-[520px] text-[clamp(0.9375rem,1.4vw,1.1875rem)] leading-[1.55] text-pretty">
          {experiment.summary[locale]}
        </p>
        <ul className="flex flex-wrap gap-2">
          {experiment.tags.map((tag) => (
            <li key={tag}>
              <span className="border-ink/14 text-muted border px-2.5 py-1 text-[0.6875rem] tracking-[0.12em] uppercase">
                {tag}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <ExperimentCard experiment={experiment} />

      <section className="border-ink/14 border-t">
        <Container className="flex items-center justify-between gap-4 py-7">
          <span className="label text-muted">
            {t("next")}: {next.title}
          </span>
          <IconButtonLink href={`/${next.slug}`} label={`${t("next")}: ${next.title}`} />
        </Container>
      </section>
    </>
  );
}
