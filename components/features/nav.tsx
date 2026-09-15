import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { site } from "@/content/site";
import { Container } from "@/components/ui/container";
import { LocaleSwitch } from "./locale-switch";
import { MobileMenu } from "./mobile-menu";
import type { NavItem } from "./nav-items";

export async function Nav() {
  const t = await getTranslations("nav");
  const items: NavItem[] = [
    { href: "/work", label: t("work") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];
  const cta: NavItem = { href: "/contact", label: t("cta") };

  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-bg/80 backdrop-blur-md">
      <Container className="flex h-[72px] items-center justify-between gap-6">
        <Link href="/" aria-label={t("home")} className="font-serif text-xl whitespace-nowrap">
          {site.name}
        </Link>
        <nav className="hidden items-center gap-9 text-sm text-muted md:flex">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-fg">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-5 md:flex">
          <LocaleSwitch />
          <Link
            href={cta.href}
            className="inline-flex h-10 items-center rounded-full border border-line-strong px-4.5 text-[13px] font-medium transition-colors hover:border-fg"
          >
            {cta.label}
          </Link>
        </div>
        <MobileMenu items={items} cta={cta} openLabel={t("menu")} closeLabel={t("close")} />
      </Container>
    </header>
  );
}
