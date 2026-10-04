"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";

/** Same route, other language. Links so it works without JS and is crawlable. */
export function LocaleSwitch({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("locale");

  return (
    <nav aria-label={t("label")} className={cn("flex items-center gap-1.5", className)}>
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1.5">
          {i > 0 ? (
            <span aria-hidden="true" className="opacity-40">
              /
            </span>
          ) : null}
          <Link
            href={pathname}
            locale={l}
            hrefLang={l}
            aria-current={l === locale ? "true" : undefined}
            aria-label={t(l)}
            className={cn("uppercase", l === locale ? "opacity-100" : "opacity-50 hover:opacity-100")}
          >
            {l}
          </Link>
        </span>
      ))}
    </nav>
  );
}
