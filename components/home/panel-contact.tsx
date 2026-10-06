import { getTranslations } from "next-intl/server";
import { PANEL } from "@/content/panels";
import { site } from "@/content/site";
import { Panel, PANEL_PAD_TIGHT } from "./panel";
import { PanelLink } from "./panel-link";
export async function PanelContact() {
  const t = await getTranslations("home");
  const contact = await getTranslations("contact");
  const chrome = await getTranslations("chrome");
  const year = new Date().getFullYear();

  return (
    <Panel
      id="contact"
      tone="mist"
      className={`${PANEL_PAD_TIGHT} flex flex-col justify-between gap-[4vh]`}
    >
      <div className="flex flex-col gap-[3vh]">
        <span className="kicker">{contact("metaTitle")}</span>
        <h2 className="text-[clamp(48px,min(11vw,20vh),240px)] leading-[0.86] font-medium tracking-[-0.01em]">
          {t("contactTitle1")}
          <br />
          {t("contactTitle2")}
        </h2>
      </div>

      <div className="border-ink grid gap-[clamp(20px,3vw,56px)] border-t pt-[3vh] md:grid-cols-3">
        <div className="flex flex-col gap-2.5">
          <span className="micro">{chrome("email")}</span>
          <a
            href={`mailto:${site.email}`}
            className="rule-link self-start text-[clamp(15px,1.5vw,22px)]"
          >
            {site.email}
          </a>
        </div>
        <div className="flex flex-col gap-2.5">
          <span className="micro">{t("contactCode")}</span>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="rule-link self-start text-[clamp(15px,1.5vw,22px)]"
          >
            {site.github.replace("https://", "")}
          </a>
        </div>
        <div className="flex flex-col gap-2.5">
          <span className="micro">{t("contactReply")}</span>
          <span className="text-[clamp(15px,1.5vw,22px)]">{t("contactReplyValue")}</span>
        </div>
      </div>

      <div className="text-muted flex items-center justify-between gap-6 text-[11px] tracking-[0.16em] uppercase">
        <span>
          © {year} {site.name}
        </span>
        <PanelLink panel={PANEL.intro} variant="rule" className="text-muted border-b-0">
          {t("backToStart")}
        </PanelLink>
      </div>
    </Panel>
  );
}
