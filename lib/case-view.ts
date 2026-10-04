import { media } from "@/content/media";
import { projects, type Project, type ProjectStatus } from "@/content/projects";
import type { Locale } from "@/i18n/routing";

/**
 * A project, resolved for one locale and flattened to strings.
 *
 * Built on the server and handed to the client panels as plain data: a `Localized<T>` and a
 * `t` function cannot cross that boundary, and resolving them in two places is how a card and
 * its detail pane end up disagreeing about the same project.
 */
export type CaseView = {
  slug: string;
  name: string;
  /** Position in the list, 1-based and padded: the site numbers cases by order, not by id. */
  number: string;
  tag: string;
  status: ProjectStatus;
  statusLabel: string;
  /** The headline's second half — the part that is not the project's own name. */
  short: string;
  summary: string;
  stackLine: string;
  cover: string | null;
  href: string;
};

/**
 * The short line under a project's name.
 *
 * Headlines read "ZenID: um login que é seu" — the name is already set in type beside it, so
 * repeating it would be the same word twice. A headline with no colon stands on its own.
 */
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

/**
 * Past eight cases the list stops being a row of cards and becomes an index.
 *
 * Six cards fill a screen; twelve would each be a stamp. The index was designed for the site
 * this becomes at thirty projects, and the switch is automatic so nobody has to remember.
 */
export const INDEX_THRESHOLD = 8;

export const wantsIndex = (count: number): boolean => count > INDEX_THRESHOLD;

/** Rows per column when the index runs in three columns, filling top to bottom. */
export const indexRows = (count: number): number => Math.max(1, Math.ceil(count / 3));
