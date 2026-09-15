import { getLocale, getTranslations } from "next-intl/server";
import { approach } from "@/content/approach";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";

export async function Approach() {
  const t = await getTranslations("approach");
  const locale = await getLocale();

  return (
    <section className="border-t border-line">
      <Container className="grid grid-cols-1 gap-10 py-section lg:grid-cols-12 lg:gap-8">
        <div className="flex min-w-0 flex-col gap-5 lg:col-span-5">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <Heading start={t("titleStart")} accent={t("titleAccent")} />
        </div>
        <ol className="flex min-w-0 flex-col lg:col-span-6 lg:col-start-7">
          {approach.map((p, i) => (
            <li
              key={p.title.en}
              className="grid grid-cols-[3rem_minmax(0,1fr)] gap-4 border-t border-line py-7 last:border-b"
            >
              <span className="font-serif text-xl text-accent italic">{String(i + 1).padStart(2, "0")}</span>
              <div className="flex min-w-0 flex-col gap-2">
                <h3 className="text-lg font-medium">{p.title[locale]}</h3>
                <p className="text-[15px] leading-relaxed text-muted">{p.body[locale]}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
