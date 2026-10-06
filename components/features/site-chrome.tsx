"use client";

import { useEffect, useId, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { goToPanel } from "@/lib/rail-bus";
import { LocaleSwitch } from "./locale-switch";
import type { NavItem } from "./nav-items";

type Props = {
  role: string;
  github: string;
  githubUrl: string;
  email: string;
  emailUrl: string;
  brand: string;
  open: string;
  items: NavItem[];
  menuLabel: string;
  closeLabel: string;
};
export function SiteChrome({
  role,
  github,
  githubUrl,
  email,
  emailUrl,
  brand,
  open,
  items,
  menuLabel,
  closeLabel,
}: Props) {
  const pathname = usePathname();
  const onHome = pathname === "/";

  return (
    <header className={cn("z-30", onHome ? "contents" : "sticky top-0 z-30")}>
      <div
        className={cn(
          "bg-ink px-bar text-paper flex h-[30px] items-center justify-between gap-4 text-[10px] font-medium tracking-[0.14em] uppercase",
          onHome && "fixed inset-x-0 top-0 z-30",
        )}
      >
        <span className="truncate">{role}</span>
        <div className="flex shrink-0 items-center gap-3.5">
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="text-paper hover:text-paper/70"
          >
            {github}
          </a>
          <span aria-hidden="true" className="opacity-40">
            |
          </span>
          <a href={emailUrl} className="text-paper hover:text-paper/70">
            {email}
          </a>
          <span aria-hidden="true" className="opacity-40">
            |
          </span>
          <LocaleSwitch />
        </div>
      </div>

      <nav
        aria-label={brand}
        className={cn(
          "px-bar label grid h-16 grid-cols-[1fr_auto_1fr] items-center",
          onHome
            ? "fixed inset-x-0 top-[30px] z-30 text-white mix-blend-difference"
            : "border-ink/12 bg-paper text-ink border-b",
        )}
      >
        <div className="hidden min-w-0 gap-[clamp(14px,2.4vw,36px)] md:flex">
          {items.map((item) => (
            <NavLink key={item.href} item={item} onHome={onHome} />
          ))}
        </div>

        <MobileMenu items={items} menuLabel={menuLabel} closeLabel={closeLabel} onHome={onHome} />

        <Link
          href="/"
          onClick={
            onHome
              ? (event) => {
                  event.preventDefault();
                  goToPanel(0);
                }
              : undefined
          }
          className="justify-self-center text-[clamp(16px,1.8vw,24px)] font-medium tracking-[0.22em] whitespace-nowrap"
        >
          {brand}
        </Link>

        <div className="hidden items-center justify-end gap-2.5 md:flex">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
          <span className="whitespace-nowrap">{open}</span>
        </div>
      </nav>
    </header>
  );
}
function NavLink({ item, onHome }: { item: NavItem; onHome: boolean }) {
  if (onHome) {
    return (
      <button
        type="button"
        onClick={() => goToPanel(item.panel)}
        className="label cursor-pointer whitespace-nowrap hover:opacity-70"
      >
        {item.label}
      </button>
    );
  }
  return (
    <Link href={item.href} className="hover:text-muted whitespace-nowrap">
      {item.label}
    </Link>
  );
}
function MobileMenu({
  items,
  menuLabel,
  closeLabel,
  onHome,
}: {
  items: NavItem[];
  menuLabel: string;
  closeLabel: string;
  onHome: boolean;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? closeLabel : menuLabel}
        onClick={() => setOpen((value) => !value)}
        className="flex h-11 w-11 -translate-x-3 items-center justify-center text-[18px]"
      >
        <span aria-hidden="true">{open ? "✕" : "☰"}</span>
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="bg-paper px-edge text-ink fixed inset-x-0 top-[94px] bottom-0 z-40 flex flex-col gap-6 pt-10 mix-blend-normal"
      >
        {items.map((item) =>
          onHome ? (
            <button
              key={item.href}
              type="button"
              onClick={() => {
                setOpen(false);
                goToPanel(item.panel);
              }}
              className="text-left text-[22px] font-medium tracking-[0.08em] uppercase"
            >
              {item.label}
            </button>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-[22px] font-medium tracking-[0.08em] uppercase"
            >
              {item.label}
            </Link>
          ),
        )}
      </div>
    </div>
  );
}
