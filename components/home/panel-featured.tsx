import { getLocale, getTranslations } from "next-intl/server";
import { caseViews } from "@/lib/case-view";
import { FeaturedBoard } from "./featured-board";
import { Panel, PANEL_PAD } from "./panel";

export async function PanelFeatured() {
  const locale = await getLocale();
  const t = await getTranslations("home");
  const status = await getTranslations("case.status");

  const items = caseViews(locale, {
    production: status("production"),
    active: status("active"),
    paused: status("paused"),
  });

  return (
    <Panel id="featured" tone="ink" className={`${PANEL_PAD} flex flex-col`}>
      <FeaturedBoard
        items={items}
        labels={{ title: t("featuredTitle"), openCase: t("openCase") }}
      />
    </Panel>
  );
}
