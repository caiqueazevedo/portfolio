import { getTranslations } from "next-intl/server";
import { site } from "@/content/site";
import { Container } from "@/components/ui/container";

export async function Footer() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col gap-4 py-8 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between sm:py-10">
        <p className="font-serif text-lg text-fg">{site.name}</p>
        <nav className="flex flex-wrap gap-x-7 gap-y-2">
          <a href={site.github} rel="me noopener" target="_blank" className="transition-colors hover:text-fg">
            {t("github")}
          </a>
          {site.linkedin ? (
            <a href={site.linkedin} rel="me noopener" target="_blank" className="transition-colors hover:text-fg">
              {t("linkedin")}
            </a>
          ) : null}
          <a href={`mailto:${site.email}`} className="break-all transition-colors hover:text-fg">
            {site.email}
          </a>
        </nav>
        <p>
          {t("rights", { year })}
          {site.location ? ` · ${site.location}` : ""}
        </p>
      </Container>
    </footer>
  );
}
