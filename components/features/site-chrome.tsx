"use client";

import { useEffect, useId, useState } from "react";
import { TargetLink } from "@/components/ui/target-link";
import { cn } from "@/lib/cn";
import { goToPanel } from "@/lib/rail-bus";
import type { Target } from "@/lib/urls";
import { A11yPanel } from "./a11y-panel";
import { LocaleSwitch } from "./locale-switch";
import type { NavItem } from "./nav-items";

type Props = {
  home: boolean;
  role: string;
  github: string;
  githubUrl: string;
  email: string;
  emailUrl: string;
  brand: string;
  brandTarget: Target;
  open: string;
  items: NavItem[];
  menuLabel: string;
  closeLabel: string;
};
export function SiteChrome({
  home,
  role,
  github,
  githubUrl,
  email,
  emailUrl,
  brand,
  brandTarget,
  open,
  items,
  menuLabel,
  closeLabel,
}: Props) {
  return (
    <header className={cn("z-30", home ? "contents" : "sticky top-0 z-30")}>
      <div
        className={cn(
          "bg-ink px-bar text-paper flex h-[30px] items-center justify-between gap-4 text-[0.625rem] font-medium tracking-[0.14em] uppercase",
          home && "fixed inset-x-0 top-0 z-30",
        )}
      >
        <span className="truncate">{role}</span>
        <div className="flex shrink-0 items-center gap-3.5">
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            data-bar="optional"
            className="text-paper hover:text-paper/70"
          >
            {github}
          </a>
          <span aria-hidden="true" data-bar="optional" className="opacity-40">
            |
          </span>
          <a href={emailUrl} data-bar="optional" className="text-paper hover:text-paper/70">
            {email}
          </a>
          <span aria-hidden="true" data-bar="optional" className="opacity-40">
            |
          </span>
          <A11yPanel />
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
          home
            ? "fixed inset-x-0 top-[30px] z-30 text-white mix-blend-difference"
            : "border-ink/12 bg-paper text-ink border-b",
        )}
      >
        <div data-nav="full" className="min-w-0 gap-[clamp(14px,2.4vw,36px)]">
          {items.map((item) => (
            <NavLink key={item.key} item={item} home={home} />
          ))}
        </div>

        <MobileMenu items={items} menuLabel={menuLabel} closeLabel={closeLabel} home={home} />

        <TargetLink
          to={brandTarget}
          onClick={
            home
              ? (event) => {
                  event.preventDefault();
                  goToPanel(0);
                }
              : undefined
          }
          className="justify-self-center text-[clamp(16px,1.8vw,24px)] font-medium tracking-[0.22em] whitespace-nowrap"
        >
          {brand}
        </TargetLink>

        <div data-nav="full" className="items-center justify-end gap-2.5">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
          <span className="whitespace-nowrap">{open}</span>
        </div>
      </nav>
    </header>
  );
}
function NavLink({ item, home }: { item: NavItem; home: boolean }) {
  if (home) {
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
    <TargetLink to={item.target} className="hover:text-muted whitespace-nowrap">
      {item.label}
    </TargetLink>
  );
}
function MobileMenu({
  items,
  menuLabel,
  closeLabel,
  home,
}: {
  items: NavItem[];
  menuLabel: string;
  closeLabel: string;
  home: boolean;
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
    <div data-nav="compact">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? closeLabel : menuLabel}
        onClick={() => setOpen((value) => !value)}
        className="flex h-11 w-11 -translate-x-3 items-center justify-center text-[1.125rem]"
      >
        <span aria-hidden="true">{open ? "✕" : "☰"}</span>
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="bg-paper px-edge text-ink fixed inset-x-0 top-[94px] bottom-0 z-40 flex flex-col gap-6 pt-10 mix-blend-normal"
      >
        {items.map((item) =>
          home ? (
            <button
              key={item.key}
              type="button"
              onClick={() => {
                setOpen(false);
                goToPanel(item.panel);
              }}
              className="text-left text-[1.375rem] font-medium tracking-[0.08em] uppercase"
            >
              {item.label}
            </button>
          ) : (
            <TargetLink
              key={item.key}
              to={item.target}
              onClick={() => setOpen(false)}
              className="text-[1.375rem] font-medium tracking-[0.08em] uppercase"
            >
              {item.label}
            </TargetLink>
          ),
        )}
      </div>
    </div>
  );
}
