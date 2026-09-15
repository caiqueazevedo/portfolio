import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { IconButtonLink } from "@/components/ui/icon-button";
import { Photo } from "@/components/ui/photo";
import { Sticker } from "@/components/ui/sticker";
import { Tag } from "@/components/ui/tag";
import { media } from "@/content/media";
import { findProject, projects } from "@/content/projects";
import { routing } from "@/i18n/routing";
import { localizedAlternates } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/work/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = findProject(slug);
  if (!project || !hasLocale(routing.locales, locale)) return {};
  return {
    title: project.name,
    description: project.summary[locale],
    alternates: localizedAlternates(locale, `/work/${slug}`),
  };
}

const hostOf = (url: string) => new URL(url).host;

export default async function CasePage({ params }: PageProps<"/[locale]/work/[slug]">) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();

  const locale = await getLocale();
  const t = await getTranslations("case");
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const number = String(index + 1).padStart(2, "0");
  const cover = media.covers[`${project.cover}-wide`] ?? media.covers[project.cover] ?? null;
  const link = project.liveUrl
    ? { label: t("live"), href: project.liveUrl }
    : project.repoUrl
      ? { label: t("repo"), href: project.repoUrl }
      : null;

  return (
    <article>
      <section className="grain relative">
        <Container className="pt-12 pb-8">
          <span className="font-mono text-[14px] text-acid-500">
            {number} / {project.tags[locale][0]}
          </span>
          <h1 className="mt-2 max-w-[16ch] text-[clamp(44px,8vw,110px)] text-paper-100">{project.headline[locale]}</h1>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {project.tags[locale].map((tag, i) => (
              <li key={tag}>
                <Tag active={i === 0}>{tag}</Tag>
              </li>
            ))}
            <li>
              <Tag>{t(`status.${project.status}`)}</Tag>
            </li>
          </ul>
        </Container>
        <div className="absolute top-10 right-gutter hidden lg:block">
          <Sticker color="acid" marker rotate={3}>
            case {project.years}
          </Sticker>
        </div>
      </section>

      <section className="grid grid-cols-1 border-t-2 border-ink-700 lg:grid-cols-[2fr_1fr]">
        <Photo src={cover} alt="" label={t("hero")} ratio="16/9" priority className="lg:aspect-auto lg:min-h-[420px] lg:border-r-2 lg:border-ink-700" />
        <div className="flex min-w-0 flex-col gap-5 px-gutter py-9 lg:px-8">
          <div>
            <span className="label text-acid-500">{t("role")}</span>
            <div className="text-[16px] font-extrabold">{project.role[locale]}</div>
          </div>
          <div>
            <span className="label text-acid-500">{t("year")}</span>
            <div className="font-mono text-[15px]">{project.years}</div>
          </div>
          <div>
            <span className="label text-acid-500">{t("stack")}</span>
            <div className="text-[14px] text-ink-300">{project.stack.join(", ")}</div>
          </div>
          <div>
            <span className="label text-acid-500">{t("surfaces")}</span>
            <div className="text-[14px] text-ink-300">{project.surfaces[locale]}</div>
          </div>
          {link ? (
            <div>
              <span className="label text-acid-500">{link.label}</span>
              <div className="font-mono text-[14px]">
                <a href={link.href} target="_blank" rel="noopener" className="break-all text-paper-100 hover:text-acid-500">
                  {hostOf(link.href)} ↗
                </a>
              </div>
            </div>
          ) : null}
          <p className="text-[14px] text-ink-300">{project.lead[locale]}</p>
          <ButtonLink href="/contact" className="self-start">
            {t("cta")}
          </ButtonLink>
        </div>
      </section>

      <section className="grid grid-cols-1 border-t-2 border-ink-700 md:grid-cols-3">
        {project.sections.map((s) => (
          <div key={s.heading.en} className="flex min-w-0 flex-col gap-3 border-ink-700 px-gutter py-8 not-last:border-b-2 md:not-last:border-r-2 md:not-last:border-b-0 md:px-7">
            <h2 className="text-h3 text-acid-500">{s.heading[locale]}</h2>
            <p className="text-[14px] leading-relaxed text-ink-300">{s.body[locale]}</p>
          </div>
        ))}
      </section>

      <section className="border-t-2 border-ink-700">
        <Container className="flex items-center justify-between gap-4 py-7">
          <ButtonLink href="/work" variant="ghost" size="sm">
            {t("back")}
          </ButtonLink>
          <div className="flex min-w-0 items-center gap-4">
            <span className="label hidden text-ink-500 sm:inline">
              {t("next")} {next.name}
            </span>
            <IconButtonLink href={`/work/${next.slug}`} label={`${t("nextLabel")}: ${next.name}`} />
          </div>
        </Container>
      </section>
    </article>
  );
}
