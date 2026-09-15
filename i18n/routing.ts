import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt", "en"],
  defaultLocale: "pt",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

/** BCP 47 tag for `<html lang>` and hreflang. */
export const LANG_TAG: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en",
};
