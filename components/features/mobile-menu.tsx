"use client";

import { useEffect, useId, useState } from "react";
import { Link } from "@/i18n/navigation";
import type { NavItem } from "./nav-items";
import { LocaleSwitch } from "./locale-switch";

type Props = { items: NavItem[]; cta: NavItem; openLabel: string; closeLabel: string };

export function MobileMenu({ items, cta, openLabel, closeLabel }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

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
        className="-mr-2 flex h-11 w-11 items-center justify-center text-fg"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 8h18M3 16h18" />}
        </svg>
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="fixed inset-x-0 top-[72px] bottom-0 z-40 flex flex-col gap-2 border-t border-line bg-bg px-gutter pt-8 pb-10"
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className="font-serif text-subtitle py-3 text-fg"
          >
            {item.label}
          </Link>
        ))}
        <Link
          href={cta.href}
          onClick={() => setOpen(false)}
          className="mt-6 inline-flex h-13 items-center justify-center rounded-full bg-fg text-sm font-medium text-bg"
        >
          {cta.label}
        </Link>
        <LocaleSwitch className="mt-auto" />
      </div>
    </div>
  );
}
