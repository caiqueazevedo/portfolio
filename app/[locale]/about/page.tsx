import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo";
import { SectionHeader } from "@/components/ui/section-header";
import { Sticker } from "@/components/ui/sticker";
import { Tag } from "@/components/ui/tag";
import { bio, experience, stack } from "@/content/about";
import { media } from "@/content/media";
import { routing } from "@/i18n/routing";
import { localizedAlternates } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("metaTitle"), description: t("metaDescription"), alternates: localizedAlternates(locale, "/about") };
}

export default async function AboutPage() {
  const t = await getTranslations("about");
  const locale = await getLocale();

  return (
    <>
      <section className="grain relative">
        <Container className="pt-12 pb-8">
          <span className="font-mono text-[14px] text-acid-500">{t("kicker")}</span>
          <h1 className="mt-2 max-w-[14ch] text-[clamp(48px,8vw,110px)] text-paper-100">{t("title")}</h1>
        </Container>
        <div className="absolute top-10 right-gutter hidden lg:block">
          <Sticker color="paper" marker rotate={-2}>
            {t("sticker")}
          </Sticker>
        </div>
      </section>

      <section className="grid grid-cols-1 border-t-2 border-ink-700 lg:grid-cols-[1fr_2fr]">
        <Photo src={media.portrait} alt="" label={t("portrait")} ratio="4/5" priority className="lg:border-r-2 lg:border-ink-700" />
        <div className="flex min-w-0 flex-col gap-5 px-gutter py-9 lg:px-10">
          {bio[locale].map((p, i) => (
            <p key={p} className={i === 0 ? "text-[19px] leading-[1.3] font-extrabold uppercase" : "text-[15px] text-ink-300"}>
              {p}
            </p>
          ))}
        </div>
      </section>

      <section className="border-t-2 border-ink-700">
        <Container className="py-10">
          <SectionHeader title={t("experience")} glyph="→" />
          <ol className="mt-7 flex flex-col border-2 border-paper-100">
            {experience.map((e, i) => (
              <li
                key={`${e.company}-${e.start}-${i}`}
                className="grid grid-cols-1 gap-3 border-paper-100 p-5 not-last:border-b-2 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-6"
              >
                <span className="font-mono text-[13px] text-acid-500">
                  {e.start} – {e.end ?? t("present")}
                </span>
                <div className="flex min-w-0 flex-col gap-2">
                  <h3 className="font-sans text-[15px] leading-[1.2] font-extrabold uppercase">
                    {e.role[locale]} <span className="text-ink-300">· {e.company}</span>
                  </h3>
                  <p className="text-[13px] text-ink-300">{e.summary[locale]}</p>
                  <p className="font-condensed text-[10px] tracking-[0.08em] text-ink-300 uppercase">{e.stack.join(" · ")}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-t-2 border-ink-700">
        <Container className="py-10">
          <SectionHeader title={t("stack")} glyph="✕" />
          <div className="mt-7 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {stack.map((g) => (
              <div key={g.label.en} className="flex min-w-0 flex-col gap-3">
                <span className="label text-acid-500">{g.label[locale]}</span>
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <li key={item}>
                      <Tag>{item}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
