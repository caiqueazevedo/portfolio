import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { ExperimentGrid, type GridItem } from "@/components/features/experiment-grid";
import { Container } from "@/components/ui/container";
import { Sticker } from "@/components/ui/sticker";
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

      <section className="border-t-2 border-ink-700">
        <Container>
          <ExperimentGrid items={items} labels={labels} />
        </Container>
      </section>
    </>
  );
}
