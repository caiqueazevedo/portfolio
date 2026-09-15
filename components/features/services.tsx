import { getLocale, getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/ui/section-header";
import { services } from "@/content/services";

/** Left column of the home's dense two-column block. */
export async function Services() {
  const t = await getTranslations("services");
  const locale = await getLocale();

  return (
    <div className="min-w-0 px-gutter py-10 md:border-r-2 md:border-ink-700">
      <SectionHeader title={t("title")} glyph="+" />
      <ul className="mt-7 flex flex-col gap-6">
        {services.map((s) => (
          <li key={s.slug} className="flex gap-4">
            <span aria-hidden="true" className="w-8 shrink-0 text-[24px] leading-none font-extrabold text-acid-500">
              {s.glyph}
            </span>
            <div className="min-w-0">
              <h3 className="font-sans text-[14px] leading-tight font-extrabold tracking-[0.04em] uppercase">{s.title[locale]}</h3>
              <p className="mt-1 text-[13px] text-ink-300">{s.description[locale]}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
