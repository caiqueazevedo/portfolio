import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { featuredProjects } from "@/content/projects";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { CaseCard } from "./case-card";
import { Reveal } from "./reveal";

const GLOWS = ["30% 70%", "70% 30%", "30% 30%"];

export async function FeaturedCases() {
  const t = await getTranslations("cases");
  const locale = await getLocale();
  const [lead, ...rest] = featuredProjects;

  return (
    <section className="border-t border-line">
      <Container className="flex flex-col gap-12 py-section lg:gap-14">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex min-w-0 flex-col gap-5">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <Heading start={t("titleStart")} accent={t("titleAccent")} />
          </div>
          <Link href="/work" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
            {t("all")}
            <ArrowIcon />
          </Link>
        </div>

        <Reveal>
          <CaseCard project={lead} locale={locale} readLabel={t("read")} layout="wide" glow={GLOWS[0]} priority />
        </Reveal>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08} className="min-w-0">
              <CaseCard project={p} locale={locale} readLabel={t("read")} glow={GLOWS[i + 1]} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
