/**
 * The home's panels, in order.
 *
 * One list, read by the rail (which renders them), the nav (which jumps to them) and the
 * footer (which names the one you are on). The order is the site: inserting a panel here moves
 * everything that points at it, instead of leaving a nav button aiming at the wrong screen.
 */
export const PANELS = [
  "intro",
  "featured",
  "cases",
  "services",
  "about",
  "approach",
  "openSource",
  "contact",
] as const;

export type PanelId = (typeof PANELS)[number];

/** Index by name, so nothing counts panels by hand. */
export const PANEL = Object.fromEntries(PANELS.map((id, index) => [id, index])) as Record<
  PanelId,
  number
>;
