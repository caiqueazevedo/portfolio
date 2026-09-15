import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";
import { LocaleSwitch } from "./locale-switch";
import { MobileMenu } from "./mobile-menu";
import { NavTabs } from "./nav-tabs";
import type { NavItem } from "./nav-items";

export async function Nav() {
  const t = await getTranslations("nav");
  const items: NavItem[] = [
    { href: "/", label: t("home") },
    { href: "/work", label: t("work") },
    { href: "/open-source", label: t("openSource") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];
  const year = new Date().getFullYear();

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink-700 bg-ink-950">
      <Container className="flex min-h-[72px] items-center justify-between gap-4 py-3 md:py-5">
        <Link href="/" className="flex min-w-0 flex-col">
          <span className="label text-paper-100">{t("roleLine1")}</span>
          <span className="label text-ink-500">{t("roleLine2")}</span>
        </Link>

        <NavTabs items={items} className="hidden md:flex" />

        <div className="hidden items-center gap-4 md:flex">
          <Badge color="blue" pulse>
            {t("open")}
          </Badge>
          <span className="font-mono text-[13px] text-acid-500">{year}</span>
          <LocaleSwitch />
        </div>

        <MobileMenu items={items} openLabel={t("menu")} closeLabel={t("close")} badge={t("open")} />
      </Container>
    </header>
  );
}
