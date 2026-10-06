import { media } from "@/content/media";
import { projects, type Project, type ProjectStatus } from "@/content/projects";
import type { Locale } from "@/i18n/routing";
export type CaseView = {
  slug: string;
  name: string;

  number: string;
  tag: string;
  status: ProjectStatus;
  statusLabel: string;

  short: string;
  summary: string;
  stackLine: string;
  cover: string | null;
  href: string;
};
export function shortOf(headline: string): string {
  const [, rest] = headline.split(": ");
  return rest ?? headline;
}

export const padNumber = (index: number): string => String(index + 1).padStart(2, "0");

export function caseViews(
  locale: Locale,
  statusLabels: Record<ProjectStatus, string>,
  list: readonly Project[] = projects,
): CaseView[] {
  return list.map((project, index) => ({
    slug: project.slug,
    name: project.name,
    number: padNumber(index),
    tag: project.tags[locale][0] ?? "",
    status: project.status,
    statusLabel: statusLabels[project.status],
    short: shortOf(project.headline[locale]),
    summary: project.summary[locale],
    stackLine: project.stack.join(" · "),
    cover: media.covers[project.cover] ?? null,
    href: `/work/${project.slug}`,
  }));
}
export const INDEX_THRESHOLD = 8;

export const wantsIndex = (count: number): boolean => count > INDEX_THRESHOLD;
export const indexRows = (count: number): number => Math.max(1, Math.ceil(count / 3));
