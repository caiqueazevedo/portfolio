"use client";

import { useEffect, useRef, useState } from "react";
import { Photo } from "@/components/ui/photo";
import { StatusBadge, StatusDot } from "@/components/ui/status-dot";
import { Link } from "@/i18n/navigation";
import type { CaseView } from "@/lib/case-view";
import { indexRows, wantsIndex } from "@/lib/case-view";
import { clampLines } from "@/lib/pager";

export type CasesLabels = {
  title: string;
  hint: string;
  openCase: string;
  stack: string;
};
export function CasesBoard({ items, labels }: { items: CaseView[]; labels: CasesLabels }) {
  const indexMode = wantsIndex(items.length);
  return indexMode ? <CaseIndex items={items} labels={labels} /> : <CaseCards items={items} />;
}

function CaseCards({ items }: { items: CaseView[] }) {
  return (
    <div
      data-testid="case-cards"
      className="grid min-h-0 flex-1 grid-cols-2 gap-[clamp(14px,1.4vw,22px)] md:flex"
    >
      {items.map((item) => (
        <Link
          key={item.slug}
          href={item.href}
          className="flex h-full min-w-0 flex-1 flex-col gap-3.5 hover:opacity-85"
        >
          <div className="relative min-h-0 flex-1">
            <Photo src={item.cover} alt={item.name} label={item.name} ratio="fill" />
            <StatusBadge status={item.status} className="absolute top-2.5 right-2.5" />
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <div className="flex min-w-0 flex-col gap-1">
              <span className="truncate text-[clamp(11px,1vw,14px)] font-medium tracking-[0.08em] uppercase">
                {item.name}
              </span>
              <span className="text-muted text-[12px] tracking-[0.04em]">
                {item.tag} · {item.statusLabel}
              </span>
            </div>
            <span className="text-muted text-[11px] tracking-[0.14em]">{item.number}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

function CaseIndex({ items, labels }: { items: CaseView[]; labels: CasesLabels }) {
  const [hover, setHover] = useState(0);
  const active = items[Math.min(hover, items.length - 1)]!;

  return (
    <div
      data-testid="case-index"
      className="grid min-h-0 flex-1 gap-[clamp(20px,3vw,56px)] md:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)]"
    >
      <div
        data-testid="case-index-list"
        className="border-ink grid min-h-0 grid-cols-1 border-t sm:grid-cols-2 md:grid-flow-col md:grid-cols-3 md:gap-x-[clamp(16px,2vw,36px)]"
        style={{ gridTemplateRows: `repeat(${indexRows(items.length)}, minmax(0, 1fr))` }}
      >
        {items.map((item, index) => (
          <Link
            key={item.slug}
            href={item.href}
            onMouseEnter={() => setHover(index)}
            onFocus={() => setHover(index)}
            className={`border-ink/14 grid min-h-0 grid-cols-[28px_minmax(0,1fr)_auto] items-center gap-2.5 border-b transition-[color,padding] duration-250 ${
              index === hover ? "text-ink pl-2.5" : "text-muted"
            }`}
          >
            <span className="text-faint text-[10px] tracking-[0.14em]">{item.number}</span>
            <span className="truncate text-[clamp(11px,min(1vw,2.1vh),14px)] font-medium tracking-[0.08em] uppercase">
              {item.name}
            </span>
            <StatusDot status={item.status} />
          </Link>
        ))}
      </div>

      <CaseDetail items={items} active={active} labels={labels} />
    </div>
  );
}
function CaseDetail({
  items,
  active,
  labels,
}: {
  items: CaseView[];
  active: CaseView;
  labels: CasesLabels;
}) {
  const summary = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const paragraph = summary.current;
    const box = paragraph?.parentElement;
    if (!paragraph || !box) return;

    const fit = () => {
      const lineHeight = Number.parseFloat(getComputedStyle(paragraph).lineHeight) || 20;
      const siblings = [...box.children].filter((child) => child !== paragraph);
      const used = siblings.reduce(
        (total, child) => total + (child as HTMLElement).offsetHeight,
        0,
      );
      const gap = Number.parseFloat(getComputedStyle(box).rowGap) || 0;
      const room = box.clientHeight - used - gap * box.children.length;
      const lines = clampLines(room, lineHeight);
      paragraph.style.webkitLineClamp = String(lines);
      paragraph.style.maxHeight = `${lines * lineHeight}px`;
    };

    fit();
    window.addEventListener("resize", fit);

    const settle = window.setTimeout(fit, 300);
    return () => {
      window.removeEventListener("resize", fit);
      window.clearTimeout(settle);
    };
  }, [active.slug]);

  return (
    <div
      data-testid="case-detail"
      className="hidden min-h-0 flex-col gap-[min(16px,2.4vh)] md:flex"
    >
      <div className="bg-mist relative h-[24%] min-h-[48px] flex-none">
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

      <div className="flex min-h-0 flex-1 flex-col gap-[min(12px,1.8vh)] overflow-hidden">
        <div className="flex items-baseline justify-between gap-3">
          <span className="min-w-0 text-[clamp(14px,min(1.4vw,3vh),20px)] font-medium tracking-[0.08em] uppercase">
            {active.name}
          </span>
          <span className="text-faint flex-none text-[10px] tracking-[0.14em]">
            {active.number}
          </span>
        </div>
        <div className="text-muted flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase">
          <StatusDot status={active.status} />
          {active.tag} · {active.statusLabel}
        </div>
        <p
          ref={summary}
          className="text-strong m-0 [display:-webkit-box] flex-none overflow-hidden text-[clamp(12px,min(1vw,2.2vh),15px)] leading-[1.55] text-pretty [-webkit-box-orient:vertical] [-webkit-line-clamp:3]"
        >
          {active.summary}
        </p>
        <div className="border-ink/14 flex flex-col gap-1 border-t pt-[min(10px,1.5vh)]">
          <span className="micro">{labels.stack}</span>
          <span className="text-muted text-[12px] leading-[1.4]">{active.stackLine}</span>
        </div>
      </div>

      <Link href={active.href} className="label rule-link flex-none self-start">
        {labels.openCase}
      </Link>
    </div>
  );
}
