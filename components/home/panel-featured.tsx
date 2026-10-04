import { getLocale, getTranslations } from "next-intl/server";
import { Photo } from "@/components/ui/photo";
import { Link } from "@/i18n/navigation";
import { projects } from "@/content/projects";
import { caseViews } from "@/lib/case-view";
import { Panel, PANEL_PAD } from "./panel";

/** Three at most: the grid is three columns, and a fourth card wraps into the rail footer. */
const SHOWN = 3;

/**
 * 02 — what is in production.
 *
 * The counter is derived rather than written: "03 / 06" stops being true the day a seventh
 * project lands, and a number that lies about the list beside it is worse than no number.
 */
export async function PanelFeatured() {
  const locale = await getLocale();
  const t = await getTranslations("home");
  const status = await getTranslations("case.status");

  const views = caseViews(locale, {
    production: status("production"),
    active: status("active"),
    paused: status("paused"),
  });
  const shown = views.filter((view) => view.status === "production").slice(0, SHOWN);

  return (
    <Panel id="featured" tone="ink" className={`${PANEL_PAD} flex flex-col gap-[4vh]`}>
      <header className="flex items-baseline justify-between gap-6">
        <span className="kicker">{t("featuredTitle")}</span>
        <span className="kicker opacity-60">
          {String(shown.length).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </span>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-[clamp(20px,3vw,48px)] md:grid-cols-3">
        {shown.map((view) => (
          <article key={view.slug} className="flex min-h-0 items-center gap-[clamp(14px,1.6vw,24px)]">
            <Link href={view.href} className="block aspect-[4/5] h-full max-h-[52vh] w-[40%] max-w-[55%] flex-none">
              <Photo src={view.cover} alt={view.name} label={view.name} ratio="fill" />
            </Link>
            <div className="flex min-w-0 flex-col gap-3 pb-1.5">
              <span className="text-[11px] tracking-[0.2em] uppercase opacity-55">
                {view.number} — {view.tag}
              </span>
              <span className="text-[clamp(16px,1.5vw,22px)] font-medium tracking-[0.08em] uppercase">
                {view.name}
              </span>
              <span className="max-w-[220px] text-[13px] leading-[1.5] text-pretty opacity-75">
                {view.short}
              </span>
              <Link href={view.href} className="label mt-1.5 self-start rule-link">
                {t("openCase")}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}
