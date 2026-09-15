import type { Locale } from "@/i18n/routing";

/** A value that exists once per locale. Content files use it for prose. */
export type Localized<T> = Record<Locale, T>;

export function pick<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}
