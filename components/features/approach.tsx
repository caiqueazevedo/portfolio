import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { approach } from "@/content/approach";

export async function Approach() {
  const t = await getTranslations("approach");
  const locale = await getLocale();

  return (
    <section className="border-t-2 border-ink-700">
      <Container className="py-10">
        <SectionHeader title={t("title")} glyph="✕" />
        <ol className="mt-7 grid grid-cols-1 gap-0 border-2 border-paper-100 md:grid-cols-3">
          {approach.map((p, i) => (
            <li
              key={p.title.en}
              className="flex min-w-0 flex-col gap-3 border-paper-100 p-6 not-last:border-b-2 md:not-last:border-r-2 md:not-last:border-b-0"
            >
              <span className="font-mono text-[13px] text-acid-500">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-sans text-[15px] leading-[1.2] font-extrabold uppercase">{p.title[locale]}</h3>
              <p className="text-[13px] text-ink-300">{p.body[locale]}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
