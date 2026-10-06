import { getTranslations } from "next-intl/server";
import { site } from "@/content/site";
import { PANEL } from "@/content/panels";
import { SiteChrome } from "./site-chrome";
import type { NavItem } from "./nav-items";
export async function Nav() {
  const t = await getTranslations("nav");
  const chrome = await getTranslations("chrome");

  const items: NavItem[] = [
    { href: "/work", label: t("work"), panel: PANEL.cases },
    { href: "/open-source", label: t("openSource"), panel: PANEL.openSource },
    { href: "/about", label: t("about"), panel: PANEL.about },
    { href: "/contact", label: t("contact"), panel: PANEL.contact },
  ];

  return (
    <SiteChrome
      role={chrome("role")}
      github={chrome("github")}
      githubUrl={site.github}
      email={chrome("email")}
      emailUrl={`mailto:${site.email}`}
      brand={site.name}
      open={t("open")}
      items={items}
      menuLabel={t("menu")}
      closeLabel={t("close")}
    />
  );
}
