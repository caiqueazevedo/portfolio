import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <section>
      <Container className="flex flex-col items-start gap-6 py-section lg:py-40">
        <p className="font-serif text-hero">404</p>
        <p className="text-lead text-muted">{t("title")}</p>
        <ButtonLink href="/" variant="ghost">
          {t("back")}
        </ButtonLink>
      </Container>
    </section>
  );
}
