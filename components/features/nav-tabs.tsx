"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import type { NavItem } from "./nav-items";

/** Raw Folio Tabs: one 2px paper frame, items separated by 2px rules, active = acid. */
export function NavTabs({ items, className }: { items: NavItem[]; className?: string }) {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <nav className={cn("border-2 border-paper-100", className)}>
      {items.map((item, i) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "px-5 py-2.5 font-condensed text-[13px] font-bold tracking-[0.1em] uppercase transition-all duration-[120ms]",
              i > 0 && "border-l-2 border-paper-100",
              active ? "bg-acid-500 text-ink-950" : "bg-transparent text-paper-100 hover:bg-paper-100 hover:text-ink-950",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
