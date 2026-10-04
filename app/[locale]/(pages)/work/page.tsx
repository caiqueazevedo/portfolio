import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { Photo } from "@/components/ui/photo";
import { Rule } from "@/components/ui/rule";
import { StatusDot } from "@/components/ui/status-dot";
import { projects } from "@/content/projects";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { caseViews } from "@/lib/case-view";
import { localizedAlternates } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/work">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "work" });
  return { title: t("metaTitle"), description: t("metaDescription"), alternates: localizedAlternates(locale, "/work") };
}

/**
 * The case list as a page.
 *
 * Same list the home's third panel shows, read the other way: one case per row, full width,
 * as long as the list gets. The panel has to fit a screen; this one does not, and the row is
 * what a list of thirty projects wants to be.
 */
export default async function WorkPage() {
  const t = await getTranslations("work");
  const caseT = await getTranslations("case");
  const home = await getTranslations("home");
  const locale = await getLocale();

  const items = caseViews(locale, {
    production: caseT("status.production"),
    active: caseT("status.active"),
    paused: caseT("status.paused"),
  });

  // Surfaces are written "Web · API · Android"; count the distinct ones across all cases.
  const surfaces = new Set(projects.flatMap((p) => p.surfaces.en.split("·").map((s) => s.trim())));
  const stats = [
    { value: projects.filter((p) => p.status === "production").length, label: t("stats.production") },
    { value: projects.length, label: t("stats.systems") },
    { value: new Set(projects.flatMap((p) => p.stack)).size, label: t("stats.techs") },
    { value: surfaces.size, label: t("stats.surfaces") },
  ];

  return (
    <>
      <section className="flex flex-col gap-7 bg-mist px-edge pt-[calc(94px+6vh)] pb-[clamp(40px,8vh,96px)]">
        <div className="flex flex-col gap-3.5">
          <span className="kicker">{t("kicker")}</span>
          <Rule />
        </div>
        <h1 className="max-w-[16ch] text-[clamp(44px,8vw,140px)] leading-[0.88] font-medium tracking-[-0.01em]">
          {t("title")}
        </h1>
        <p className="max-w-[520px] text-[clamp(15px,1.4vw,19px)] leading-[1.55] text-pretty text-strong">
          {t("lead")}
        </p>
      </section>

      <section className="grid grid-cols-2 gap-6 border-t border-ink px-edge py-8 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1.5">
            <span className="text-[clamp(28px,3vw,44px)] leading-none font-light">
              {String(stat.value).padStart(2, "0")}
            </span>
            <span className="micro text-muted">{stat.label}</span>
          </div>
        ))}
      </section>

      <ul className="flex flex-col px-edge pb-[clamp(56px,10vh,120px)]">
        {items.map((item) => (
          <li key={item.slug}>
            <Link
              href={item.href}
              className="grid grid-cols-[48px_minmax(0,1fr)] items-center gap-5 border-t border-ink/14 py-7 transition-[padding] hover:pl-2.5 md:grid-cols-[48px_minmax(0,2fr)_minmax(0,2fr)_160px]"
            >
              <span className="text-[11px] tracking-[0.14em] text-faint">{item.number}</span>
              <span className="flex min-w-0 flex-col gap-1.5">
                <span className="text-[clamp(20px,2.6vw,34px)] leading-none font-medium tracking-[0.02em] uppercase">
                  {item.name}
                </span>
                <span className="flex items-center gap-2 text-[11px] tracking-[0.12em] text-muted uppercase">
                  <StatusDot status={item.status} />
                  {item.tag} · {item.statusLabel}
                </span>
              </span>
              <span className="hidden max-w-[52ch] text-[14px] leading-[1.55] text-pretty text-body md:block">
                {item.short}
              </span>
              <span className="label hidden justify-self-end rule-link md:inline-flex">
                {home("openCase")}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <section className="grid grid-cols-1 gap-px bg-ink/14 md:grid-cols-3">
        {items.slice(0, 3).map((item) => (
          <Link key={item.slug} href={item.href} className="flex flex-col gap-3.5 bg-paper p-6 hover:opacity-85">
            <Photo src={item.cover} alt={item.name} label={item.name} ratio="4/5" />
            <span className="text-[clamp(11px,1vw,14px)] font-medium tracking-[0.08em] uppercase">
              {item.name}
            </span>
          </Link>
        ))}
      </section>
    </>
  );
}
