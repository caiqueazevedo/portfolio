import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PaperCard } from "@/components/ui/paper-card";
import { Photo } from "@/components/ui/photo";
import { Sticker } from "@/components/ui/sticker";
import { media } from "@/content/media";

export async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section className="grain relative">
      <Container className="pt-10 pb-16">
        <h1 className="max-w-full text-[clamp(56px,10.5vw,150px)] break-words text-paper-100">{t("title")}</h1>

        <div className="mt-8 grid grid-cols-1 items-start gap-8 md:grid-cols-[1fr_1.1fr_1fr]">
          <div className="flex min-w-0 flex-col items-start gap-4">
            <span aria-hidden="true" className="text-[34px] leading-none font-extrabold text-acid-500">
              ✱
            </span>
            <p className="text-[19px] leading-[1.3] font-extrabold uppercase">{t("statement")}</p>
            <p className="text-[15px] text-ink-300">{t("lead")}</p>
            <ButtonLink href="/contact" size="lg" className="mt-1">
              {t("cta")}
            </ButtonLink>
          </div>

          <Photo src={media.portrait} alt="" label={t("portrait")} ratio="4/5" priority className="max-h-[380px]" />

          <PaperCard color="acid" rotate={1.5} className="md:mt-4" innerClassName="px-8 py-9">
            <div className="font-marker text-[42px] leading-[1.15] text-ink-950">
              {t("paperLine1")}
              <br />
              {t("paperLine2")}
              <br />
              {t("paperLine3")}
            </div>
            <div aria-hidden="true" className="mt-4 h-2 w-[120px] bg-blue-500" />
          </PaperCard>
        </div>
      </Container>

      <div className="absolute top-6 right-gutter hidden lg:block">
        <Sticker color="blue" rotate={-2}>
          {t("sticker")}
        </Sticker>
      </div>
    </section>
  );
}
