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
export const PANEL = Object.fromEntries(PANELS.map((id, index) => [id, index])) as Record<
  PanelId,
  number
>;
