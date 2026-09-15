import { getLocale, getTranslations } from "next-intl/server";
import { services } from "@/content/services";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Reveal } from "./reveal";

export async function ServiceGrid() {
  const t = await getTranslations("services");
  const locale = await getLocale();

  return (
    <section id="services" className="border-t border-line">
      <Container className="grid grid-cols-1 gap-10 py-section lg:grid-cols-12 lg:gap-8">
        <div className="flex min-w-0 flex-col gap-5 lg:col-span-4">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <Heading start={t("titleStart")} accent={t("titleAccent")} />
          <p className="max-w-[22rem] text-base leading-relaxed text-muted">{t("lead")}</p>
        </div>
        <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:col-span-8">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.06} className="min-w-0">
              <article className="flex h-full flex-col gap-3 border border-line bg-surface p-6 sm:p-8">
                <h3 className="font-serif text-card">{s.title[locale]}</h3>
                <p className="text-[15px] leading-relaxed text-muted">{s.description[locale]}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
