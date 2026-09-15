import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";

export async function Cta() {
  const t = await getTranslations("cta");

  return (
    <section className="relative overflow-hidden border-t border-line">
      <div aria-hidden="true" className="absolute inset-0 glow-[50%_100%]">
        <div className="grain" />
      </div>
      <Container className="relative flex flex-col items-center gap-6 py-section text-center lg:py-32">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <Heading size="display" start={t("titleStart")} accent={t("titleAccent")} className="max-w-[20ch]" />
        <p className="text-lead text-muted">{t("lead")}</p>
        <ButtonLink href="/contact" arrow className="mt-2">
          {t("button")}
        </ButtonLink>
      </Container>
    </section>
  );
}
