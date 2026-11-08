import { getLocale, getTranslations } from "next-intl/server";
import { Breadcrumb, type Crumb } from "./breadcrumb";

const SECTION = {
  work: { href: "/work", key: "work" },
  openSource: { href: "/open-source", key: "openSource" },
  about: { href: "/about", key: "about" },
  contact: { href: "/contact", key: "contact" },
} as const;

const OVERLAY = "px-edge absolute inset-x-0 top-[clamp(16px,3vh,28px)] z-10";

type Props = { section?: keyof typeof SECTION; leaf?: string };

export async function PageBreadcrumb({ section, leaf }: Props) {
  const nav = await getTranslations("nav");
  const t = await getTranslations("breadcrumb");
  const locale = await getLocale();

  const items: Crumb[] = [{ label: nav("home"), href: "/" }];
  if (section) items.push({ label: nav(SECTION[section].key), href: SECTION[section].href });
  if (leaf) items.push({ label: leaf });

  return <Breadcrumb items={items} label={t("label")} locale={locale} className={OVERLAY} />;
}
