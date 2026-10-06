import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Rule } from "@/components/ui/rule";
import { PANEL } from "@/content/panels";
import { projects } from "@/content/projects";
import { Panel } from "./panel";
import { PanelLink } from "./panel-link";
export async function PanelIntro() {
  const t = await getTranslations("home");
  const year = new Date().getFullYear();

  return (
    <Panel
      id="intro"
      tone="mist"
      className="px-edge flex flex-col justify-between gap-10 pt-[calc(94px+6vh)] pb-[calc(56px+5vh)] md:block md:p-0"
    >
      <div className="md:left-edge z-2 flex flex-col gap-3.5 md:absolute md:top-[calc(94px+6vh)]">
        <span className="kicker">
          {t("statement1")}
          <br />
          {t("statement2")}
          <br />
          {t("statement3")}
        </span>
        <Rule />
      </div>

      <h1 className="text-center text-[22vw] leading-[0.8] font-medium tracking-[-0.01em] whitespace-nowrap select-none md:absolute md:inset-x-0 md:top-[calc(50%+2vh)] md:-translate-y-1/2 md:text-[min(24vw,46vh)]">
        {t("word")}
      </h1>

      <span
        aria-hidden="true"
        className="pointer-events-none z-1 hidden md:absolute md:bottom-[calc(56px+1.5vh)] md:left-1/2 md:block md:h-[calc((100vh-154px-4vh)*0.035)] md:w-[calc((100vh-154px-4vh)*0.5)] md:-translate-x-[46%] md:rounded-[50%]"
        style={{
          background: "radial-gradient(closest-side, rgba(17,17,17,.32), rgba(17,17,17,0))",
        }}
      />

      <Image
        src="/media/hero-cutout.png"
        alt={t("portrait")}
        width={883}
        height={1855}
        priority
        sizes="(min-width: 768px) 40vw, 70vw"
        className="pointer-events-none z-1 mx-auto h-[46vh] w-auto select-none md:absolute md:bottom-[calc(56px+2vh)] md:left-1/2 md:mx-0 md:h-[calc(100vh-94px-56px-4vh)] md:-translate-x-1/2"
      />

      <div className="md:left-edge z-2 flex flex-wrap items-center gap-7 md:absolute md:bottom-[calc(56px+5vh)]">
        <PanelLink panel={PANEL.cases} variant="solid">
          {t("ctaCases")}
        </PanelLink>
        <PanelLink panel={PANEL.about} variant="rule">
          {t("ctaAbout")}
        </PanelLink>
      </div>

      <div className="md:right-edge z-2 flex flex-col items-end gap-3 md:absolute md:bottom-[calc(56px+5vh)]">
        <span className="kicker text-right">
          {t("metaLabel")}
          <br />
          {t("metaSystems", { count: String(projects.length).padStart(2, "0") })}
          <br />
          {year}
        </span>
        <Rule />
      </div>
    </Panel>
  );
}
