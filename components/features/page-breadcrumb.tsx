import { getLocale, getTranslations } from "next-intl/server";
import { openSourceUrl, wwwUrl } from "@/lib/urls";
import { Breadcrumb, type Crumb } from "./breadcrumb";

const OVERLAY = "px-edge absolute inset-x-0 top-[clamp(16px,3vh,28px)] z-10";

type Section = "work" | "openSource" | "about" | "contact";

type Props = { section?: Section; leaf?: string };

export async function PageBreadcrumb({ section, leaf }: Props) {
  const nav = await getTranslations("nav");
  const t = await getTranslations("breadcrumb");
  const locale = await getLocale();

  const sectionHref = (name: Section) =>
    name === "openSource" ? openSourceUrl(locale) : wwwUrl(locale, `/${name}`);

  const items: Crumb[] = [{ label: nav("home"), href: wwwUrl(locale, "/") }];
  if (section) items.push({ label: nav(section), href: sectionHref(section) });
  if (leaf) items.push({ label: leaf });

  return <Breadcrumb items={items} label={t("label")} className={OVERLAY} />;
}
