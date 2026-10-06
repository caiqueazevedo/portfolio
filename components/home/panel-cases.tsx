import { getLocale, getTranslations } from "next-intl/server";
import { caseViews, wantsIndex } from "@/lib/case-view";
import { CasesBoard } from "./cases-board";
import { Panel, PANEL_PAD } from "./panel";
export async function PanelCases() {
  const locale = await getLocale();
  const t = await getTranslations("home");
  const caseT = await getTranslations("case");
  const status = await getTranslations("case.status");

  const items = caseViews(locale, {
    production: status("production"),
    active: status("active"),
    paused: status("paused"),
  });
  const hint = wantsIndex(items.length)
    ? t("casesHintIndex", { count: items.length })
    : t("casesHintCards");

  return (
    <Panel id="cases" tone="paper" className={`${PANEL_PAD} flex flex-col gap-[4vh]`}>
      <header className="flex items-baseline justify-between gap-10">
        <h2 className="text-[clamp(22px,2.4vw,32px)] font-medium tracking-[0.02em]">
          {t("casesTitle")}
        </h2>
        <span className="label rule-link">{hint}</span>
      </header>

      <CasesBoard
        items={items}
        labels={{ title: t("casesTitle"), hint, openCase: t("openCase"), stack: caseT("stack") }}
      />
    </Panel>
  );
}
