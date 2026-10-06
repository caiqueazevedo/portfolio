import { getLocale, getTranslations } from "next-intl/server";
import { Photo } from "@/components/ui/photo";
import { bio, stack } from "@/content/about";
import { media } from "@/content/media";
import { Panel, PANEL_PAD_TIGHT } from "./panel";
const PARAGRAPHS = 2;
export async function PanelAbout() {
  const locale = await getLocale();
  const t = await getTranslations("about");

  return (
    <Panel
      id="about"
      tone="ink"
      className={`${PANEL_PAD_TIGHT} grid gap-[clamp(24px,4vw,80px)] md:grid-cols-[auto_minmax(0,1fr)] md:grid-rows-[minmax(0,1fr)]`}
    >
      <div className="aspect-[3/4] h-full max-h-[40vh] w-full max-w-[38vw] md:max-h-none md:w-auto">
        <Photo src={media.portrait} alt={t("portrait")} label={t("portrait")} ratio="fill" />
      </div>

      <div className="flex min-h-0 min-w-0 flex-col justify-between gap-[3vh]">
        <div className="flex flex-col gap-[2.4vh]">
          <span className="kicker">{t("kicker")}</span>
          <h2 className="text-[clamp(32px,min(5vw,8vh),96px)] leading-[0.92] font-semibold tracking-[0.01em] text-balance">
            {t("title")}
          </h2>
          <div className="grid max-w-[860px] gap-[clamp(16px,2vw,32px)] md:grid-cols-2">
            {bio[locale].slice(0, PARAGRAPHS).map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="text-[clamp(12px,min(1.05vw,2.3vh),15px)] leading-[1.5] text-pretty opacity-80"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="border-paper/30 grid gap-[clamp(16px,2vw,32px)] border-t pt-[3vh] md:grid-cols-3">
          {stack.map((group) => (
            <div key={group.label.en} className="flex flex-col gap-2">
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase">
                {group.label[locale]}
              </span>
              <span className="text-[clamp(12px,min(1vw,2.2vh),14px)] leading-[1.5] text-pretty opacity-70">
                {group.items.join(" · ")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}
