export const stats = [
  { key: "production", value: "03" },
  { key: "systems", value: "06" },
  { key: "years", value: "[08]+" },
  { key: "reply", value: "48h" },
] as const;

export type StatKey = (typeof stats)[number]["key"];
