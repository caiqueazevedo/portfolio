import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/content/site";
import { Link } from "@/i18n/navigation";
export async function Footer() {
  const t = await getTranslations("home");
  const contact = await getTranslations("contact");
  const chrome = await getTranslations("chrome");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink px-edge text-paper py-[clamp(56px,12vh,140px)]">
      <div className="flex flex-col gap-[clamp(32px,6vh,72px)]">
        <h2 className="text-[clamp(40px,7vw,120px)] leading-[0.86] font-medium">
          {t("contactTitle1")}
          <br />
          {t("contactTitle2")}
        </h2>

        <div className="border-paper/30 grid gap-[clamp(20px,3vw,56px)] border-t pt-[clamp(20px,4vh,40px)] md:grid-cols-3">
          <div className="flex flex-col gap-2.5">
            <span className="micro opacity-60">{chrome("email")}</span>
            <a
              href={`mailto:${site.email}`}
              className="rule-link self-start text-[clamp(15px,1.5vw,22px)]"
            >
              {site.email}
            </a>
          </div>
          <div className="flex flex-col gap-2.5">
            <span className="micro opacity-60">{t("contactCode")}</span>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="rule-link self-start text-[clamp(15px,1.5vw,22px)]"
            >
              {site.github.replace("https://", "")}
            </a>
          </div>
          <div className="flex flex-col items-start gap-2.5">
            <span className="micro opacity-60">{t("contactReply")}</span>
            <ButtonLink
              href="/contact"
              className="bg-paper text-ink hover:bg-paper/80 hover:text-ink"
            >
              {contact("formTitle")}
            </ButtonLink>
          </div>
        </div>

        <div className="flex items-center justify-between gap-6 text-[11px] tracking-[0.16em] uppercase opacity-60">
          <span>
            © {year} {site.name}
          </span>
          <Link href="/">{t("backToStart")}</Link>
        </div>
      </div>
    </footer>
  );
}
