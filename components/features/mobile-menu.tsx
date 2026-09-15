"use client";

import { useEffect, useId, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { LocaleSwitch } from "./locale-switch";
import type { NavItem } from "./nav-items";

type Props = { items: NavItem[]; openLabel: string; closeLabel: string; badge: string };

export function MobileMenu({ items, openLabel, closeLabel, badge }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 w-11 items-center justify-center border-2 border-paper-100 text-[20px] font-extrabold text-paper-100"
      >
        <span aria-hidden="true">{open ? "✕" : "☰"}</span>
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="fixed inset-x-0 top-[72px] bottom-0 z-40 flex flex-col border-t-2 border-ink-700 bg-ink-950 px-gutter pt-6 pb-8"
      >
        <nav className="flex flex-col border-2 border-paper-100">
          {items.map((item, i) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "px-5 py-4 font-display text-[28px] uppercase",
                  i > 0 && "border-t-2 border-paper-100",
                  active ? "bg-acid-500 text-ink-950" : "text-paper-100",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-6 flex items-center justify-between gap-4">
          <Badge color="blue" pulse>
            {badge}
          </Badge>
          <LocaleSwitch />
        </div>
      </div>
    </div>
  );
}
