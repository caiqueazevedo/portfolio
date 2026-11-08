import { getLocale, getTranslations } from "next-intl/server";
import { site } from "@/content/site";
import { PANEL } from "@/content/panels";
import { openSourceTarget, wwwHome, wwwPath } from "@/lib/urls";
import { SiteChrome } from "./site-chrome";
import type { NavItem } from "./nav-items";
export async function Nav({ home = false }: { home?: boolean }) {
  const t = await getTranslations("nav");
  const chrome = await getTranslations("chrome");
  const locale = await getLocale();

  const items: NavItem[] = [
    { key: "work", target: wwwPath(locale, "/work"), label: t("work"), panel: PANEL.cases },
    {
      key: "openSource",
      target: openSourceTarget(locale),
      label: t("openSource"),
      panel: PANEL.openSource,
    },
    { key: "about", target: wwwPath(locale, "/about"), label: t("about"), panel: PANEL.about },
    {
      key: "contact",
      target: wwwPath(locale, "/contact"),
      label: t("contact"),
      panel: PANEL.contact,
    },
  ];

  return (
    <SiteChrome
      home={home}
      role={chrome("role")}
      github={chrome("github")}
      githubUrl={site.github}
      email={chrome("email")}
      emailUrl={`mailto:${site.email}`}
      brand={site.name}
      brandTarget={wwwHome(locale)}
      open={t("open")}
      items={items}
      menuLabel={t("menu")}
      closeLabel={t("close")}
    />
  );
}
