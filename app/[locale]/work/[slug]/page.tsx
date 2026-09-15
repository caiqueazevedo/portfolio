import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { Reveal } from "@/components/features/reveal";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { Container } from "@/components/ui/container";
import { Cover } from "@/components/ui/cover";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Tag } from "@/components/ui/tag";
import { media } from "@/content/media";
import { findProject, projects } from "@/content/projects";
import { Link } from "@/i18n/navigation";
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

function hostOf(url: string) {
  return new URL(url).host;
}

export default async function CasePage({ params }: PageProps<"/[locale]/work/[slug]">) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();

  const locale = await getLocale();
  const t = await getTranslations("case");
  const ts = await getTranslations("cases");
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const cover = media.covers[`${project.cover}-wide`] ?? media.covers[project.cover] ?? null;

  const meta = [
    { label: t("role"), value: project.role[locale] },
    { label: t("stack"), value: project.stack.join(" · ") },
    { label: t("surfaces"), value: project.surfaces[locale] },
    project.liveUrl
      ? { label: t("live"), value: hostOf(project.liveUrl), href: project.liveUrl }
      : project.repoUrl
        ? { label: t("repo"), value: hostOf(project.repoUrl), href: project.repoUrl }
        : null,
  ].filter((m): m is NonNullable<typeof m> => m !== null);

  return (
    <article>
      <Container className="flex flex-col gap-6 pt-12 pb-10 sm:pt-16 lg:pt-20 lg:pb-14">
        <Link href="/work" className="inline-flex items-center gap-2 text-[13px] text-muted transition-colors hover:text-fg">
          <ArrowIcon direction="left" size={14} />
          {t("back")}
        </Link>
        <ul className="flex flex-wrap gap-2">
          {project.tags[locale].map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
          <li>
            <Tag>{project.years}</Tag>
          </li>
        </ul>
        <h1 className="max-w-[18ch] font-serif text-hero text-balance">{project.headline[locale]}</h1>
        <p className="max-w-[44rem] text-lead font-light text-fg-soft">{project.lead[locale]}</p>
      </Container>

      <Container>
        <Cover src={cover} alt="" ratio="21/9" glow="35% 60%" priority />
      </Container>

      <Container>
        <dl className="grid grid-cols-1 gap-6 border-b border-line py-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {meta.map((m) => (
            <div key={m.label} className="min-w-0">
              <dt className="text-tag tracking-[0.14em] text-muted uppercase">{m.label}</dt>
              <dd className="mt-1.5 text-[15px] break-words">
                {"href" in m && m.href ? (
                  <a href={m.href} target="_blank" rel="noopener" className="transition-colors hover:text-accent">
                    {m.value} ↗
                  </a>
                ) : (
                  m.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Container>

      <Container className="grid grid-cols-1 gap-10 py-section lg:grid-cols-12 lg:gap-8">
        <nav aria-label={project.name} className="hidden lg:col-span-3 lg:block">
          <ol className="sticky top-24 flex flex-col gap-3 text-[13px] text-muted">
            {project.sections.map((s) => (
              <li key={s.heading.en}>
                <a href={`#${s.heading.en.toLowerCase()}`} className="transition-colors hover:text-fg">
                  {s.heading[locale]}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="flex min-w-0 flex-col gap-14 lg:col-span-7 lg:col-start-5 lg:gap-18">
          {project.sections.map((s) => (
            <Reveal key={s.heading.en}>
              <section id={s.heading.en.toLowerCase()} className="flex flex-col gap-4">
                <h2 className="font-serif text-subtitle">{s.heading[locale]}</h2>
                <p className="text-[17px] leading-[1.7] font-light text-fg-soft sm:text-lg">{s.body[locale]}</p>
              </section>
            </Reveal>
          ))}
        </div>
      </Container>

      <section className="border-t border-line">
        <Container className="flex flex-col gap-6 py-section sm:flex-row sm:items-end sm:justify-between">
          <div className="flex min-w-0 flex-col gap-4">
            <Eyebrow>{t("next")}</Eyebrow>
            <p className="font-serif text-display leading-none">{next.name}</p>
            <p className="text-sm text-muted">{ts(`status.${next.status}`)}</p>
          </div>
          <Link href={`/work/${next.slug}`} className="inline-flex items-center gap-2 text-sm transition-colors hover:text-accent">
            {t("read")}
            <ArrowIcon />
          </Link>
        </Container>
      </section>
    </article>
  );
}
