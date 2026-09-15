import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <section className="grain">
      <Container className="flex flex-col items-start gap-6 py-section lg:py-40">
        <h1 className="text-hero text-paper-100">
          404<span className="text-acid-500">.</span>
        </h1>
        <p className="text-[19px] font-extrabold uppercase">{t("title")}</p>
        <ButtonLink href="/" variant="ghost">
          {t("back")}
        </ButtonLink>
      </Container>
    </section>
  );
}
