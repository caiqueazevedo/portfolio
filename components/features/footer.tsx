import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Sticker } from "@/components/ui/sticker";
import { site } from "@/content/site";

/** The site's closing call: "VAMOS CRIAR / ALGO REAL." with contact and links. */
export async function Footer() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-ink-700">
      <Container className="grid grid-cols-1 gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:gap-10">
        <div className="min-w-0">
          <h2 className="text-[clamp(44px,6vw,64px)] text-paper-100">{t("ctaLine1")}</h2>
          <h2 className="text-[clamp(44px,6vw,64px)] text-acid-500">{t("ctaLine2")}</h2>
        </div>
        <div className="flex min-w-0 flex-col items-start gap-2.5">
          <span className="label text-acid-500">{t("talk")}</span>
          <a href={`mailto:${site.email}`} className="break-all text-acid-500 hover:text-white">
            {site.email}
          </a>
          <ButtonLink href="/contact" variant="ghost" size="sm" className="mt-1">
            {t("form")}
          </ButtonLink>
        </div>
        <div className="flex min-w-0 flex-col items-start gap-2.5">
          <span className="label text-acid-500">{t("social")}</span>
          <div className="flex flex-wrap gap-3.5 font-condensed text-[13px] tracking-[0.1em] uppercase">
            <a href={site.github} target="_blank" rel="me noopener" className="text-acid-500 hover:text-white">
              {t("github")}
            </a>
            {site.linkedin ? (
              <a href={site.linkedin} target="_blank" rel="me noopener" className="text-acid-500 hover:text-white">
                {t("linkedin")}
              </a>
            ) : null}
          </div>
          <Sticker color="paper" marker rotate={-2} className="mt-3">
            {t("sticker")}
          </Sticker>
        </div>
      </Container>
      <Container className="flex items-center justify-between border-t-2 border-ink-700 py-4 font-mono text-[12px] text-ink-500">
        <span>{t("rights", { year })}</span>
        {site.location ? <span>{site.location}</span> : null}
      </Container>
    </footer>
  );
}
