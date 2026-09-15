import { getTranslations } from "next-intl/server";
import { StatBlock } from "@/components/ui/stat-block";
import { stats } from "@/content/stats";

/** Full-bleed acid band with numbers as statements. */
export async function StatsBand() {
  const t = await getTranslations("stats");

  return (
    <section className="grain bg-acid-500">
      <div className="grid grid-cols-2 gap-x-6 gap-y-8 px-gutter py-10 md:flex md:items-center md:justify-between lg:px-14">
        {stats.map((s) => (
          <StatBlock key={s.key} dark value={s.value} label={t(s.key)} />
        ))}
        <span aria-hidden="true" className="hidden text-[56px] leading-none font-extrabold text-ink-950 md:block">
          ↗
        </span>
      </div>
    </section>
  );
}
