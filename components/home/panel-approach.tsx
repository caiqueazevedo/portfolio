import { getLocale, getTranslations } from "next-intl/server";
import { approach } from "@/content/approach";
import { Panel, PANEL_PAD_TIGHT } from "./panel";
export async function PanelApproach() {
  const locale = await getLocale();
  const t = await getTranslations("home");
  const section = await getTranslations("approach");

  return (
    <Panel
      id="approach"
      tone="paper"
      className={`${PANEL_PAD_TIGHT} flex flex-col justify-between gap-[3vh]`}
    >
      <div className="flex flex-col gap-[3vh]">
        <span className="kicker">{section("title")}</span>
        <h2 className="text-[clamp(44px,min(8.5vw,12vh),160px)] leading-[0.9] font-semibold tracking-[0.01em]">
          {t("approachTitle1")}
          <br />
          {t("approachTitle2")}
        </h2>
      </div>

      <div className="grid gap-[clamp(20px,3vw,56px)] md:grid-cols-3">
        {approach.map((principle, index) => (
          <div
            key={principle.title.en}
            className="border-ink flex flex-col gap-[min(16px,2vh)] border-t pt-[2.4vh]"
          >
            <span className="text-[clamp(28px,min(4vw,6vh),64px)] leading-none font-light">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-[13px] leading-[1.4] font-semibold tracking-[0.12em] uppercase">
              {principle.title[locale]}
            </h3>
            <p className="text-body text-[clamp(12px,min(1.05vw,2.3vh),15px)] leading-[1.5] text-pretty">
              {principle.body[locale]}
            </p>
          </div>
        ))}
      </div>
    </Panel>
  );
}
