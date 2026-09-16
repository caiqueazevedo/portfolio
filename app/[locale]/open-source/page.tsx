import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { ExperimentPreview } from "@/components/features/experiment-preview";
import { Container } from "@/components/ui/container";
import { Sticker } from "@/components/ui/sticker";
import { Tag } from "@/components/ui/tag";
import { experiments } from "@/content/experiments";
import { Link } from "@/i18n/navigation";
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
  const locale = await getLocale();

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
        <Container className="grid grid-cols-1 gap-6 py-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {experiments.map((e, i) => {
            const href = `/open-source/${e.slug}`;
            return (
              <article key={e.slug} className="flex min-w-0 flex-col gap-4">
                <ExperimentPreview slug={e.slug} title={e.title} href={href} hint={t("hover")} />
                <div className="flex min-w-0 flex-col gap-2">
                  <span className="font-mono text-[13px] text-acid-500">
                    {String(i + 1).padStart(2, "0")} / {e.tags[0]}
                  </span>
                  <h2 className="text-[26px]">
                    <Link href={href} className="text-paper-100 transition-colors hover:text-acid-500">
                      {e.title}
                    </Link>
                  </h2>
                  <p className="text-[13px] text-ink-300">{e.summary[locale]}</p>
                  <div className="flex items-center justify-between gap-3 pt-1">
                    <ul className="flex flex-wrap gap-1.5">
                      {e.tags.slice(1).map((tag) => (
                        <li key={tag}>
                          <Tag className="px-2 py-1 text-[10px]">{tag}</Tag>
                        </li>
                      ))}
                    </ul>
                    <Link href={href} className="shrink-0 font-condensed text-[13px] font-bold tracking-[0.1em] text-acid-500 uppercase hover:text-white">
                      {t("open")}
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </Container>
      </section>
    </>
  );
}
