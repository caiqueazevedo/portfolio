import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { WorkRow } from "@/components/features/work-row";
import { Container } from "@/components/ui/container";
import { Sticker } from "@/components/ui/sticker";
import { projects } from "@/content/projects";
import { routing } from "@/i18n/routing";
import { localizedAlternates } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/work">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "work" });
  return { title: t("metaTitle"), description: t("metaDescription"), alternates: localizedAlternates(locale, "/work") };
}

export default async function WorkPage() {
  const t = await getTranslations("work");
  const tw = await getTranslations("works");
  const locale = await getLocale();

  return (
    <>
      <section className="grain relative">
        <Container className="pt-12 pb-8">
          <span className="font-mono text-[14px] text-acid-500">{t("kicker")}</span>
          <h1 className="mt-2 max-w-[14ch] text-[clamp(48px,8vw,110px)] text-paper-100">{t("title")}</h1>
          <p className="mt-5 max-w-[440px] text-[15px] text-ink-300">{t("lead")}</p>
        </Container>
        <div className="absolute top-10 right-gutter hidden lg:block">
          <Sticker color="acid" marker rotate={3}>
            {projects.length} cases
          </Sticker>
        </div>
      </section>
      <section className="border-t-2 border-ink-700">
        <Container className="flex flex-col gap-4 py-10">
          {projects.map((p, i) => (
            <WorkRow key={p.slug} project={p} index={i} locale={locale} openLabel={tw("open")} />
          ))}
        </Container>
      </section>
    </>
  );
}
