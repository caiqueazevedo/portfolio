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
    <nav aria-label={t("label")} className={cn("flex items-center font-mono text-[13px]", className)}>
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 ? <span aria-hidden="true" className="px-1.5 text-ink-500">/</span> : null}
          <Link
            href={pathname}
            locale={l}
            hrefLang={l}
            aria-current={l === locale ? "true" : undefined}
            aria-label={t(l)}
            className={cn("uppercase transition-colors hover:text-acid-500", l === locale ? "text-acid-500" : "text-ink-500")}
          >
            {l}
          </Link>
        </span>
      ))}
    </nav>
  );
}
