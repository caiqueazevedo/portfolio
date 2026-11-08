import { getTranslations } from "next-intl/server";
import { Nav } from "@/components/features/nav";
import { PageBreadcrumb } from "@/components/features/page-breadcrumb";
import { ButtonLink } from "@/components/ui/button";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <>
      <Nav />
      <section className="bg-mist px-edge relative flex min-h-svh flex-col items-start justify-center gap-7 pt-[94px]">
        <PageBreadcrumb leaf="404" />
        <h1 className="text-[clamp(72px,18vw,280px)] leading-[0.8] font-medium">404</h1>
        <p className="text-[clamp(16px,2vw,24px)] font-medium tracking-[0.04em] uppercase">
          {t("title")}
        </p>
        <ButtonLink href="/">{t("back")}</ButtonLink>
      </section>
    </>
  );
}
