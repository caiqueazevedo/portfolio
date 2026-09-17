import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { CaseList, type CaseItem, type CaseLabels } from "@/components/features/case-list";
import type { PosterTone } from "@/components/features/case-poster";
import { Container } from "@/components/ui/container";
import { StatBlock } from "@/components/ui/stat-block";
import { Sticker } from "@/components/ui/sticker";
import { media } from "@/content/media";
import { projects } from "@/content/projects";
import { routing } from "@/i18n/routing";
import { localizedAlternates } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/work">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "work" });
  return { title: t("metaTitle"), description: t("metaDescription"), alternates: localizedAlternates(locale, "/work") };
}

const TONES: PosterTone[] = ["acid", "paper", "blue"];

/* Two columns on phones (second row gets a top rule), four in a row from md up. */
const STAT_CELL = [
  "border-r-2 pr-4 md:pr-6",
  "pl-4 md:border-r-2 md:px-6",
  "border-t-2 border-r-2 pr-4 md:border-t-0 md:px-6",
  "border-t-2 pl-4 md:border-t-0 md:pl-6",
];

export default async function WorkPage() {
  const t = await getTranslations("work");
  const tc = await getTranslations("case");
  const tw = await getTranslations("works");
  const locale = await getLocale();

  const items: CaseItem[] = projects.map((p, i) => ({
    slug: p.slug,
    name: p.name,
    number: String(i + 1).padStart(2, "0"),
    summary: p.summary[locale],
    status: p.status,
    kind: p.tags[locale][0],
    years: p.years,
    role: p.role[locale],
    surfaces: p.surfaces[locale],
    stack: p.stack,
    liveUrl: p.liveUrl,
    repoUrl: p.repoUrl,
    cover: media.covers[p.cover] ?? null,
    featured: p.featured,
    tone: TONES[i % TONES.length],
  }));

  const labels: CaseLabels = {
    filter: t("filter"),
    all: t("all"),
    open: tw("open"),
    live: tc("live"),
    repo: tc("repo"),
    role: tc("role"),
    year: tc("year"),
    surfaces: tc("surfaces"),
    featured: t("featured"),
    others: t("others"),
    empty: t("empty"),
    count: t.raw("count"),
    status: { production: tc("status.production"), active: tc("status.active"), paused: tc("status.paused") },
  };

  // Surfaces are written "Web · API · Android"; count the distinct ones across all cases.
  const surfaces = new Set(projects.flatMap((p) => p.surfaces.en.split("·").map((s) => s.trim())));
  const stats = [
    { value: projects.filter((p) => p.status === "production").length, label: t("stats.production") },
    { value: projects.length, label: t("stats.systems") },
    { value: new Set(projects.flatMap((p) => p.stack)).size, label: t("stats.techs") },
    { value: surfaces.size, label: t("stats.surfaces") },
  ];

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
            {projects.length} cases
          </Sticker>
        </div>
      </section>
      <section className="border-y-2 border-ink-700">
        <Container className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <StatBlock
              key={s.label}
              value={String(s.value).padStart(2, "0")}
              label={s.label}
              className={`border-ink-700 py-6 md:py-8 ${STAT_CELL[i]}`}
            />
          ))}
        </Container>
      </section>
      <section>
        <Container>
          <CaseList items={items} labels={labels} />
        </Container>
      </section>
    </>
  );
}
