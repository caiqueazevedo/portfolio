import { getLocale, getTranslations } from "next-intl/server";
import { IconButtonLink } from "@/components/ui/icon-button";
import { SectionHeader } from "@/components/ui/section-header";
import { featuredProjects } from "@/content/projects";
import { WorkRow } from "./work-row";

/** Right column of the home's dense two-column block. */
export async function SelectedWorks() {
  const t = await getTranslations("works");
  const locale = await getLocale();

  return (
    <div className="min-w-0 px-gutter py-10">
      <SectionHeader
        title={t("title")}
        glyph="✱"
        action={<IconButtonLink href="/work" variant="ghost" label={t("all")} />}
      />
      <div className="mt-7 flex flex-col gap-4">
        {featuredProjects.map((p, i) => (
          <WorkRow key={p.slug} project={p} index={i} locale={locale} openLabel={t("open")} />
        ))}
      </div>
    </div>
  );
}
