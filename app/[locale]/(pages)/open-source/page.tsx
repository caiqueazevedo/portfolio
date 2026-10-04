import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { ExperimentGrid, type GridItem } from "@/components/features/experiment-grid";
import { Rule } from "@/components/ui/rule";
import { experiments } from "@/content/experiments";
import { LANG_TAG, routing } from "@/i18n/routing";
import { localizedAlternates } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/open-source">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "openSource" });
  return { title: t("metaTitle"), description: t("metaDescription"), alternates: localizedAlternates(locale, "/open-source") };
}

export default async function OpenSourcePage() {
  const t = await getTranslations("openSource");
  const locale = await getLocale();
  const fmt = new Intl.DateTimeFormat(LANG_TAG[locale], { day: "2-digit", month: "short", year: "numeric" });

  const items: GridItem[] = experiments.map((e) => ({
    slug: e.slug,
    title: e.title,
    summary: e.summary[locale],
    tags: e.tags,
    category: e.category,
    createdAt: e.createdAt,
    dateLabel: fmt.format(new Date(e.createdAt)),
  }));

  const labels = {
    category: t("filters.category"),
    sort: t("filters.sort"),
    all: t("filters.all"),
    images: t("filters.images"),
    typography: t("filters.typography"),
    interaction: t("filters.interaction"),
    data: t("filters.data"),
    security: t("filters.security"),
    media: t("filters.media"),
    kits: t("filters.kits"),
    az: t("filters.az"),
    za: t("filters.za"),
    newest: t("filters.newest"),
    oldest: t("filters.oldest"),
    empty: t("filters.empty"),
    open: t("open"),
    hover: t("hover"),
    count: t.raw("count"),
  };

  return (
    <>
      <section className="flex flex-col gap-7 bg-mist px-edge pt-[calc(94px+6vh)] pb-[clamp(40px,8vh,96px)]">
        <div className="flex flex-col gap-3.5">
          <span className="kicker">{t("kicker")}</span>
          <Rule />
        </div>
        <h1 className="max-w-[16ch] text-[clamp(44px,8vw,140px)] leading-[0.88] font-medium tracking-[-0.01em]">
          {t("title")}
        </h1>
        <p className="max-w-[520px] text-[clamp(15px,1.4vw,19px)] leading-[1.55] text-pretty text-strong">
          {t("lead")}
        </p>
      </section>

      <section className="px-edge pb-[clamp(56px,10vh,120px)]">
        <ExperimentGrid items={items} labels={labels} />
      </section>
    </>
  );
}
