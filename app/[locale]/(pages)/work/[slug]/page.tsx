import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { Rule } from "@/components/ui/rule";
import { Photo } from "@/components/ui/photo";
import { media } from "@/content/media";
import { findProject, projects } from "@/content/projects";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { padNumber, shortOf } from "@/lib/case-view";
import { localizedAlternates } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/work/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = findProject(slug);
  if (!project || !hasLocale(routing.locales, locale)) return {};
  return {
    title: project.name,
    description: project.summary[locale],
    alternates: localizedAlternates(locale, `/work/${slug}`),
  };
}
export default async function CasePage({ params }: PageProps<"/[locale]/work/[slug]">) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();

  const locale = await getLocale();
  const t = await getTranslations("case");
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length]!;
  const number = padNumber(index);
  const cover = media.covers[`${project.cover}-wide`] ?? media.covers[project.cover] ?? null;
  const shot = media.covers[`${project.cover}-shot`] ?? null;

  const meta = [
    { label: t("role"), value: project.role[locale] },
    { label: t("year"), value: project.years },
    { label: t("stack"), value: project.stack.join(" · ") },
    { label: t("surfaces"), value: project.surfaces[locale] },
  ];

  return (
    <article className="bg-paper">
      <div className="border-ink/12 px-bar label flex items-center justify-between gap-6 border-b py-3">
        <Link href="/work">{t("back")}</Link>
        <span className="text-muted text-[10px] tracking-[0.2em]">
          {t("counter", { num: number, total: padNumber(projects.length - 1) })} ·{" "}
          {t(`status.${project.status}`)}
        </span>
        <Link href={`/work/${next.slug}`}>{t("nextShort")}</Link>
      </div>

      <section className="bg-mist grid min-h-[calc(100svh-94px)] grid-cols-1 lg:grid-cols-2">
        <div className="px-edge flex flex-col justify-between gap-12 py-[clamp(32px,6vh,80px)]">
          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-3.5">
              <span className="kicker">
                {t("counter", { num: number, total: padNumber(projects.length - 1) })} —{" "}
                {project.tags[locale][0]}
              </span>
              <Rule />
            </div>
            <h1 className="text-[clamp(52px,8vw,150px)] leading-[0.86] font-medium tracking-[-0.01em] text-balance">
              {project.name}
            </h1>
            <p className="max-w-[520px] text-[clamp(18px,1.8vw,26px)] leading-[1.3] text-pretty">
              {shortOf(project.headline[locale])}
            </p>
          </div>

          <dl className="border-ink grid grid-cols-2 gap-6 border-t pt-6">
            {meta.map((item) => (
              <div key={item.label} className="flex flex-col gap-1.5">
                <dt className="micro">{item.label}</dt>
                <dd className="text-[14px]">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative min-h-[60vh]">
          <Photo src={cover} alt={project.name} label={t("hero")} ratio="fill" priority />
        </div>
      </section>

      <section className="bg-ink px-edge text-paper py-[clamp(56px,12vh,140px)]">
        <p className="max-w-[1100px] text-[clamp(22px,2.8vw,42px)] leading-[1.3] font-light text-pretty">
          {project.lead[locale]}
        </p>
      </section>

      <section className="px-edge flex flex-col py-[clamp(56px,10vh,120px)]">
        {project.sections.map((section, i) => (
          <div
            key={section.heading.en}
            className="border-ink grid grid-cols-1 gap-5 border-t py-10 md:grid-cols-2 md:gap-x-14"
          >
            <div className="flex items-baseline gap-5">
              <span className="text-[clamp(28px,3vw,44px)] leading-none font-light">
                {padNumber(i)}
              </span>
              <h2 className="text-[13px] font-semibold tracking-[0.2em] uppercase">
                {section.heading[locale]}
              </h2>
            </div>
            <p className="text-strong max-w-[640px] text-[clamp(16px,1.3vw,19px)] leading-[1.65] text-pretty">
              {section.body[locale]}
            </p>
          </div>
        ))}
      </section>

      <section className="px-edge flex flex-col gap-8 pb-[clamp(56px,10vh,120px)]">
        <div className="relative aspect-video w-full">
          <Photo src={shot} alt={project.name} label={t("shot")} ratio="fill" />
        </div>
        {project.liveUrl || project.repoUrl ? (
          <div className="flex flex-wrap items-center gap-7">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="label bg-ink text-paper hover:bg-ink-soft hover:text-paper inline-flex h-11 items-center px-7"
              >
                {t("liveLink")}
              </a>
            ) : null}
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="label rule-link"
              >
                {t("repoLink")}
              </a>
            ) : null}
          </div>
        ) : null}
      </section>

      <Link
        href={`/work/${next.slug}`}
        className="bg-ink px-edge text-paper hover:bg-ink-block hover:text-paper flex items-end justify-between gap-8 py-[clamp(56px,12vh,140px)]"
      >
        <span className="flex flex-col gap-5">
          <span className="kicker opacity-60">{t("nextLabel")}</span>
          <span className="text-[clamp(40px,7vw,120px)] leading-[0.86] font-medium uppercase">
            {next.name}
          </span>
        </span>
        <span aria-hidden="true" className="text-[clamp(32px,4vw,64px)] font-light">
          →
        </span>
      </Link>
    </article>
  );
}
