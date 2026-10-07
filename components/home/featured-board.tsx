"use client";

import { useState } from "react";
import { Photo } from "@/components/ui/photo";
import { Link } from "@/i18n/navigation";
import type { CaseView } from "@/lib/case-view";

export type FeaturedLabels = {
  title: string;
  openCase: string;
};

export function FeaturedBoard({ items, labels }: { items: CaseView[]; labels: FeaturedLabels }) {
  const [hover, setHover] = useState(0);
  const active = items[Math.min(hover, items.length - 1)]!;
  const total = String(items.length).padStart(2, "0");

  return (
    <div className="grid min-h-0 flex-1 grid-cols-1 gap-[clamp(20px,4vw,72px)] md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
      <div className="relative hidden min-h-0 md:block">
        {items.map((item) => (
          <div
            key={item.slug}
            aria-hidden={item.slug !== active.slug}
            className="absolute inset-0 transition-opacity duration-350"
            style={{ opacity: item.slug === active.slug ? 1 : 0 }}
          >
            <Photo src={item.cover} alt={item.name} label={item.name} ratio="fill" />
          </div>
        ))}
      </div>

      <div className="flex min-h-0 min-w-0 flex-col gap-[3vh]">
        <header className="flex items-baseline justify-between gap-6">
          <span className="kicker">{labels.title}</span>
          <span className="kicker opacity-60" data-testid="featured-counter">
            {active.number} / {total}
          </span>
        </header>

        <ul className="flex min-h-0 flex-1 flex-col justify-center" data-testid="featured-list">
          {items.map((item) => {
            const current = item.slug === active.slug;
            return (
              <li key={item.slug}>
                <Link
                  href={item.href}
                  onMouseEnter={() => setHover(items.indexOf(item))}
                  onFocus={() => setHover(items.indexOf(item))}
                  className={`border-paper/14 grid grid-cols-[32px_minmax(0,1fr)_auto] items-baseline gap-4 border-b py-[min(14px,2vh)] transition-[color,padding] ${
                    current ? "text-paper pl-2.5" : "text-paper/35"
                  }`}
                >
                  <span className="text-[10px] tracking-[0.14em] opacity-60">{item.number}</span>
                  <span className="truncate text-[clamp(20px,2.4vw,34px)] leading-none font-medium tracking-[0.02em] uppercase">
                    {item.name}
                  </span>
                  <span className="text-[10px] tracking-[0.14em] uppercase opacity-60">
                    {item.tag}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex flex-col items-start gap-[2vh] md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="flex min-w-0 flex-col gap-2.5">
            <p className="max-w-[58ch] text-[clamp(13px,min(1.1vw,2.3vh),16px)] leading-[1.55] text-pretty opacity-85">
              {active.summary}
            </p>
            <span className="micro opacity-50">{active.stackLine}</span>
          </div>
          <Link
            href={active.href}
            className="label border-paper/40 hover:bg-paper hover:text-ink inline-flex h-11 flex-none items-center border px-7 transition-colors"
          >
            {labels.openCase}
          </Link>
        </div>
      </div>
    </div>
  );
}
