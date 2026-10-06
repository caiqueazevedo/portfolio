import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { experiments } from "@/content/experiments";
import { Panel, PANEL_PAD_TIGHT } from "./panel";
const SHOWN = 6;
export async function PanelOpenSource() {
  const t = await getTranslations("home");
  const section = await getTranslations("openSource");

  const newest = [...experiments]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, SHOWN);

  return (
    <Panel
      id="openSource"
      tone="paper"
      className={`${PANEL_PAD_TIGHT} flex flex-col justify-between gap-[3vh]`}
    >
      <div className="grid items-end gap-[clamp(24px,4vw,80px)] md:grid-cols-[1.2fr_1fr]">
        <div className="flex flex-col gap-[3vh]">
          <span className="kicker">{section("kicker")}</span>
          <h2 className="text-[clamp(44px,min(8.5vw,12vh),160px)] leading-[0.9] font-semibold tracking-[0.01em]">
            {t("openSourceTitle1")}
            <br />
            {t("openSourceTitle2")}
          </h2>
        </div>
        <p className="max-w-[420px] text-[clamp(15px,1.3vw,19px)] leading-[1.55] text-pretty">
          {section("lead")}
        </p>
      </div>

      <div className="flex flex-col gap-[3vh]">
        <ul className="border-ink grid gap-x-[clamp(16px,2vw,36px)] border-t sm:grid-cols-2 lg:grid-cols-3">
          {newest.map((experiment) => (
            <li key={experiment.slug}>
              <Link
                href={`/open-source/${experiment.slug}`}
                className="border-ink/14 text-muted hover:text-ink grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2.5 border-b py-[min(12px,1.6vh)] transition-[color,padding] hover:pl-2.5"
              >
                <span className="truncate text-[clamp(11px,min(1vw,2.1vh),14px)] font-medium tracking-[0.08em] uppercase">
                  {experiment.title}
                </span>
                <span className="text-faint text-[10px] tracking-[0.14em]">
                  {section(`filters.${experiment.category}`)}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-baseline justify-between gap-6">
          <span className="kicker text-muted">
            {t("openSourceCount", { count: experiments.length })}
          </span>
          <Link href="/open-source" className="label rule-link">
            {t("openSourceCta")}
          </Link>
        </div>
      </div>
    </Panel>
  );
}
