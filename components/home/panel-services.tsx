import { getLocale, getTranslations } from "next-intl/server";
import { services } from "@/content/services";
import { Panel, PANEL_PAD_TIGHT } from "./panel";

/** 04 — what I sell, in the client's words rather than in stack names. */
export async function PanelServices() {
  const locale = await getLocale();
  const t = await getTranslations("home");
  const nav = await getTranslations("services");
  const hero = await getTranslations("hero");

  return (
    <Panel id="services" tone="mist" className={`${PANEL_PAD_TIGHT} flex flex-col justify-between gap-[3vh]`}>
      <div className="grid items-end gap-[clamp(24px,4vw,80px)] md:grid-cols-[1.2fr_1fr]">
        <div className="flex flex-col gap-[3vh]">
          <span className="kicker">{nav("title")}</span>
          <h2 className="text-[clamp(44px,min(8.5vw,12vh),160px)] leading-[0.9] font-semibold tracking-[0.01em]">
            {t("servicesTitle1")}
            <br />
            {t("servicesTitle2")}
          </h2>
        </div>
        <p className="max-w-[420px] text-[clamp(15px,1.3vw,19px)] leading-[1.55] text-pretty">
          {hero("lead")}
        </p>
      </div>

      <div className="grid gap-[clamp(16px,2.4vw,40px)] border-t border-ink pt-[3vh] sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <div key={service.slug} className="flex items-start gap-4">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-ink text-[16px] font-light"
            >
              {service.glyph}
            </span>
            <div className="flex min-w-0 flex-col gap-2">
              <h3 className="text-[12px] font-semibold tracking-[0.12em] uppercase">
                {service.title[locale]}
              </h3>
              <p className="text-[clamp(12px,min(1vw,2.2vh),14px)] leading-[1.5] text-pretty text-body">
                {service.description[locale]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}
