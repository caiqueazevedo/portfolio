import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { Cta } from "@/components/features/cta";
import { Container } from "@/components/ui/container";
import { Cover } from "@/components/ui/cover";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
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
      <section>
        <Container className="grid grid-cols-1 gap-10 pt-16 pb-section sm:pt-20 lg:grid-cols-12 lg:gap-8 lg:pt-28">
          <div className="flex min-w-0 flex-col gap-6 lg:col-span-7">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <Heading as="h1" size="display" start={t("titleStart")} accent={t("titleAccent")} className="max-w-[16ch]" />
            <div className="flex max-w-[38rem] flex-col gap-5 text-lead font-light text-fg-soft">
              {bio[locale].map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div className="min-w-0 lg:col-span-4 lg:col-start-9">
            <Cover src={media.portrait} alt={t("portraitAlt")} ratio="4/5" glow="50% 20%" priority />
          </div>
        </Container>
      </section>

      <section className="border-t border-line">
        <Container className="grid grid-cols-1 gap-10 py-section lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Heading start={t("experience")} />
          </div>
          <ol className="flex min-w-0 flex-col lg:col-span-8">
            {experience.map((e, i) => (
              <li key={`${e.company}-${e.start}-${i}`} className="grid grid-cols-1 gap-3 border-t border-line py-7 last:border-b sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6">
                <p className="text-[13px] tracking-[0.04em] text-muted">
                  {e.start} – {e.end ?? t("present")}
                </p>
                <div className="flex min-w-0 flex-col gap-2">
                  <h3 className="text-lg font-medium">
                    {e.role[locale]} <span className="text-muted">· {e.company}</span>
                  </h3>
                  <p className="text-[15px] leading-relaxed text-muted">{e.summary[locale]}</p>
                  <p className="text-[13px] tracking-[0.04em] text-muted/80">{e.stack.join(" · ")}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-t border-line">
        <Container className="grid grid-cols-1 gap-10 py-section lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Heading start={t("stack")} />
          </div>
          <div className="grid min-w-0 grid-cols-1 gap-8 sm:grid-cols-3 lg:col-span-8">
            {stack.map((g) => (
              <div key={g.label.en} className="flex min-w-0 flex-col gap-3">
                <h3 className="text-tag tracking-[0.14em] text-muted uppercase">{g.label[locale]}</h3>
                <ul className="flex flex-col gap-1.5 text-[15px]">
                  {g.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Cta />
    </>
  );
}
