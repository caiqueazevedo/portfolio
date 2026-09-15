import { getTranslations } from "next-intl/server";
import { media } from "@/content/media";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { HeroVideo } from "./hero-video";

export async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0">
        {media.heroVideo ? (
          <HeroVideo sources={media.heroVideo} label={t("videoLabel")} />
        ) : (
          <div className="absolute inset-0 glow-[70%_40%]" />
        )}
        <div className="grain" />
        <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/40 to-bg/20" />
      </div>

      <Container className="relative grid grid-cols-1 items-end gap-10 py-20 sm:py-24 lg:grid-cols-12 lg:gap-8 lg:py-32">
        <div className="flex min-w-0 flex-col gap-6 lg:col-span-10 lg:gap-7">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <Heading as="h1" size="hero" start={t("titleStart")} accent={t("titleAccent")} className="max-w-[22ch]" />
          <p className="max-w-[38rem] text-lead font-light text-fg-soft">{t("lead")}</p>
          <div className="mt-2 flex flex-col gap-3 xs:flex-row">
            <ButtonLink href="/contact" arrow>
              {t("primary")}
            </ButtonLink>
            <ButtonLink href="/work" variant="ghost">
              {t("secondary")}
            </ButtonLink>
          </div>
        </div>
        <div className="flex min-w-0 flex-col gap-2 border-t border-line pt-6 lg:col-span-2 lg:items-end lg:border-0 lg:pt-0 lg:text-right">
          <Eyebrow>{t("liveLabel")}</Eyebrow>
          <p className="font-serif text-xl leading-tight">ZenID · Pulse · Aetherion</p>
          <p className="text-sm text-muted">{t("availability")}</p>
        </div>
      </Container>
    </section>
  );
}
