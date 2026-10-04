import { getTranslations } from "next-intl/server";
import { HomeRail } from "@/components/features/home-rail";
import { PanelAbout } from "@/components/home/panel-about";
import { PanelApproach } from "@/components/home/panel-approach";
import { PanelCases } from "@/components/home/panel-cases";
import { PanelContact } from "@/components/home/panel-contact";
import { PanelFeatured } from "@/components/home/panel-featured";
import { PanelIntro } from "@/components/home/panel-intro";
import { PanelOpenSource } from "@/components/home/panel-open-source";
import { PanelServices } from "@/components/home/panel-services";
import { PANELS } from "@/content/panels";

/**
 * The home is the rail and nothing else.
 *
 * Panels are rendered on the server and handed to the client rail as children, so everything
 * that can be static stays static: the rail only needs to know how many sections there are and
 * where each one starts.
 */
export default async function HomePage() {
  const t = await getTranslations("home");

  return (
    <HomeRail
      labels={{
        names: PANELS.map((id) => t(`panels.${id}`)),
        scroll: t("scroll"),
        prev: t("prev"),
        next: t("next"),
      }}
    >
      <PanelIntro />
      <PanelFeatured />
      <PanelCases />
      <PanelServices />
      <PanelAbout />
      <PanelApproach />
      <PanelOpenSource />
      <PanelContact />
    </HomeRail>
  );
}
