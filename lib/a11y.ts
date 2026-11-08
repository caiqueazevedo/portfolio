export const A11Y_KEY = "portfolio-a11y";

export const A11Y_OPTIONS = {
  text: ["115", "130", "150"],
  contrast: ["high"],
  readable: ["on"],
  links: ["underline"],
  cursor: ["big"],
  motion: ["off", "on"],
  guide: ["on"],
  libras: ["on"],
} as const;

export type A11yKey = keyof typeof A11Y_OPTIONS;
export type A11yPrefs = Partial<Record<A11yKey, string>>;

export const A11Y_KEYS = Object.keys(A11Y_OPTIONS) as A11yKey[];

export function parsePrefs(raw: string | null): A11yPrefs {
  let data: unknown;
  try {
    data = JSON.parse(raw || "{}");
  } catch {
    return {};
  }
  if (!data || typeof data !== "object") return {};
  const source = data as Record<string, unknown>;
  const prefs: A11yPrefs = {};
  for (const key of A11Y_KEYS) {
    const value = source[key];
    if (typeof value === "string" && (A11Y_OPTIONS[key] as readonly string[]).includes(value)) {
      prefs[key] = value;
    }
  }
  return prefs;
}

/**
 * Turning "pause animations" off has to beat the system's reduced-motion setting, so it stores an
 * explicit "on"; turning it on while the system already reduces motion needs no attribute at all.
 */
export function nextPrefs(
  prefs: A11yPrefs,
  key: A11yKey,
  value: string,
  checked: boolean,
  systemReduce: boolean,
): A11yPrefs {
  let picked: string | undefined = checked ? value : undefined;
  if (key === "motion" && systemReduce) picked = checked ? undefined : "on";
  return parsePrefs(JSON.stringify({ ...prefs, [key]: picked }));
}

export function applyPrefs(root: HTMLElement, prefs: A11yPrefs) {
  for (const key of A11Y_KEYS) {
    const value = prefs[key];
    if (value) root.dataset[key] = value;
    else delete root.dataset[key];
  }
}

// Runs in <head> before the first paint, so a saved preference never flashes the default theme.
export const A11Y_BOOT = `(()=>{try{var p=JSON.parse(localStorage.getItem(${JSON.stringify(
  A11Y_KEY,
)})||"{}"),d=document.documentElement.dataset;for(var k of ${JSON.stringify(
  A11Y_KEYS,
)})if(typeof p[k]==="string"&&/^[a-z0-9]+$/.test(p[k]))d[k]=p[k]}catch(e){}})()`;
