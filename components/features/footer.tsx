import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/content/site";
import { Link } from "@/i18n/navigation";

/**
 * The end of a scrolling page: the same offer the home's last panel makes, in one band.
 *
 * The home does not use it — it ends in the contact panel — so this is the only place the
 * invitation is repeated, and it stays short for that reason.
 */
export async function Footer() {
  const t = await getTranslations("home");
  const contact = await getTranslations("contact");
  const chrome = await getTranslations("chrome");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink px-edge py-[clamp(56px,12vh,140px)] text-paper">
      <div className="flex flex-col gap-[clamp(32px,6vh,72px)]">
        <h2 className="text-[clamp(40px,7vw,120px)] leading-[0.86] font-medium">
          {t("contactTitle1")}
          <br />
          {t("contactTitle2")}
        </h2>

        <div className="grid gap-[clamp(20px,3vw,56px)] border-t border-paper/30 pt-[clamp(20px,4vh,40px)] md:grid-cols-3">
          <div className="flex flex-col gap-2.5">
            <span className="micro opacity-60">{chrome("email")}</span>
            <a href={`mailto:${site.email}`} className="self-start rule-link text-[clamp(15px,1.5vw,22px)]">
              {site.email}
            </a>
          </div>
          <div className="flex flex-col gap-2.5">
            <span className="micro opacity-60">{t("contactCode")}</span>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="self-start rule-link text-[clamp(15px,1.5vw,22px)]"
            >
              {site.github.replace("https://", "")}
            </a>
          </div>
          <div className="flex flex-col items-start gap-2.5">
            <span className="micro opacity-60">{t("contactReply")}</span>
            <ButtonLink href="/contact" className="bg-paper text-ink hover:bg-paper/80 hover:text-ink">
              {contact("formTitle")}
            </ButtonLink>
          </div>
        </div>

        <div className="flex items-center justify-between gap-6 text-[11px] tracking-[0.16em] uppercase opacity-60">
          <span>© {year} {site.name}</span>
          <Link href="/">{t("backToStart")}</Link>
        </div>
      </div>
    </footer>
  );
}
