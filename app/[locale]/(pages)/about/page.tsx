import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { Photo } from "@/components/ui/photo";
import { Rule } from "@/components/ui/rule";
import { bio, experience, stack } from "@/content/about";
import { media } from "@/content/media";
import { routing } from "@/i18n/routing";
import { localizedAlternates } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("metaTitle"), description: t("metaDescription"), alternates: localizedAlternates(locale, "/about") };
}

/** The long version of the home's fifth panel: bio in full, career, stack by group. */
export default async function AboutPage() {
  const t = await getTranslations("about");
  const locale = await getLocale();

  return (
    <>
      <section className="grid grid-cols-1 bg-mist lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
        <div className="relative min-h-[50vh]">
          <Photo src={media.portrait} alt={t("portrait")} label={t("portrait")} ratio="fill" priority />
        </div>
        <div className="flex flex-col gap-7 px-edge pt-[calc(94px+5vh)] pb-[clamp(40px,8vh,96px)]">
          <div className="flex flex-col gap-3.5">
            <span className="kicker">{t("kicker")}</span>
            <Rule />
          </div>
          <h1 className="text-[clamp(36px,5.5vw,96px)] leading-[0.92] font-semibold text-balance">
            {t("title")}
          </h1>
          <div className="flex flex-col gap-5">
            {bio[locale].map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="max-w-[60ch] text-[clamp(14px,1.2vw,17px)] leading-[1.6] text-pretty text-strong"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="px-edge py-[clamp(48px,9vh,110px)]">
        <h2 className="kicker">{t("experience")}</h2>
        <ol className="mt-8 flex flex-col">
          {experience.map((item, index) => (
            <li
              key={`${item.company}-${item.start}-${index}`}
              className="grid grid-cols-1 gap-4 border-t border-ink/14 py-8 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-10"
            >
              <span className="micro text-faint">
                {item.start} – {item.end ?? t("present")}
              </span>
              <div className="flex min-w-0 flex-col gap-3">
                <h3 className="text-[clamp(16px,1.6vw,22px)] font-medium tracking-[0.06em] uppercase">
                  {item.role[locale]} <span className="text-muted">· {item.company}</span>
                </h3>
                <p className="max-w-[60ch] text-[14px] leading-[1.6] text-pretty text-body">
                  {item.summary[locale]}
                </p>
                <p className="micro text-faint">{item.stack.join(" · ")}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="px-edge pb-[clamp(56px,10vh,120px)]">
        <h2 className="kicker">{t("stack")}</h2>
        <div className="mt-8 grid grid-cols-1 gap-8 border-t border-ink pt-8 sm:grid-cols-3">
          {stack.map((group) => (
            <div key={group.label.en} className="flex min-w-0 flex-col gap-2.5">
              <span className="micro">{group.label[locale]}</span>
              <span className="text-[14px] leading-[1.6] text-pretty text-muted">
                {group.items.join(" · ")}
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
