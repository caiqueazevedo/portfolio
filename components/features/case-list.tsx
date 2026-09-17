"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { buttonClass } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import type { ProjectStatus } from "@/content/projects";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { CasePoster, type PosterTone } from "./case-poster";

export type CaseItem = {
  slug: string;
  name: string;
  number: string;
  summary: string;
  status: ProjectStatus;
  kind: string;
  years: string;
  role: string;
  surfaces: string;
  stack: string[];
  liveUrl: string | null;
  repoUrl: string | null;
  cover: string | null;
  featured: boolean;
  tone: PosterTone;
};

export type CaseLabels = {
  filter: string;
  all: string;
  open: string;
  live: string;
  repo: string;
  role: string;
  year: string;
  surfaces: string;
  featured: string;
  others: string;
  empty: string;
  /** Template with a {count} placeholder; functions cannot cross to the client. */
  count: string;
  status: Record<ProjectStatus, string>;
};

const ORDER: ProjectStatus[] = ["production", "active", "paused"];

const BADGE: Record<ProjectStatus, { color: "acid" | "blue" | "paper"; pulse: boolean }> = {
  production: { color: "acid", pulse: true },
  active: { color: "blue", pulse: false },
  paused: { color: "paper", pulse: false },
};

const CHIP =
  "inline-flex cursor-pointer items-center gap-1.5 border-2 px-3 py-1.5 font-condensed text-[12px] font-bold tracking-[0.1em] uppercase transition-all duration-[120ms] has-focus-visible:outline-2 has-focus-visible:outline-acid-500";

/* The whole card is one link (the title's ::after covers it); external links sit above it. */
const STRETCH = "after:absolute after:inset-0 after:content-['']";
const LIFT =
  "transition-[transform,box-shadow,border-color] duration-[120ms] ease-snap hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-acid-500 hover:shadow-hard-lg-acid has-focus-visible:border-acid-500";

const host = (url: string) => new URL(url).host;

function StatusBadge({ status, label }: { status: ProjectStatus; label: string }) {
  return (
    <Badge color={BADGE[status].color} pulse={BADGE[status].pulse} className="px-2.5 py-1 text-[11px]">
      {label}
    </Badge>
  );
}

function ExternalLinks({ item, labels }: { item: CaseItem; labels: CaseLabels }) {
  const links = [
    item.liveUrl ? { href: item.liveUrl, label: labels.live } : null,
    item.repoUrl ? { href: item.repoUrl, label: labels.repo } : null,
  ].filter((l): l is { href: string; label: string } => l !== null);
  if (!links.length) return null;
  // Only the links rise above the card link; the gaps around them still open the case.
  return (
    <ul className="pointer-events-none relative z-10 flex flex-wrap gap-x-4 gap-y-1">
      {links.map((l) => (
        <li key={l.href}>
          <a
            href={l.href}
            target="_blank"
            rel="noopener"
            className="pointer-events-auto font-mono text-[12px] text-paper-100 underline decoration-ink-500 underline-offset-4 hover:text-acid-500 hover:decoration-acid-500"
          >
            <span className="text-ink-500">{l.label}:</span> {host(l.href)} ↗
          </a>
        </li>
      ))}
    </ul>
  );
}

function CaseFeature({ item, labels, flip }: { item: CaseItem; labels: CaseLabels; flip: boolean }) {
  return (
    <article className={cn("group relative grid min-w-0 grid-cols-1 border-2 border-paper-100 bg-ink-950 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]", LIFT)}>
      <div className={cn("min-w-0 border-b-2 border-inherit lg:border-b-0", flip ? "lg:order-2 lg:border-l-2" : "lg:border-r-2")}>
        <CasePoster name={item.name} number={item.number} year={item.years} caption={item.kind} tone={item.tone} src={item.cover} className="lg:aspect-auto lg:h-full lg:min-h-[380px]" />
      </div>
      <div className="flex min-w-0 flex-col gap-5 p-6 lg:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-[13px] text-acid-500">{item.number}</span>
          <StatusBadge status={item.status} label={labels.status[item.status]} />
          <span className="label text-ink-300">{item.kind}</span>
        </div>
        <h3 className="text-[clamp(40px,5vw,68px)] leading-[0.88] text-paper-100">
          <Link href={`/work/${item.slug}`} className={cn(STRETCH, "outline-none group-hover:text-acid-500")}>
            {item.name}
          </Link>
        </h3>
        <p className="text-[15px] leading-relaxed text-ink-300">{item.summary}</p>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-3 border-t-2 border-ink-700 pt-4 sm:grid-cols-3">
          <div className="col-span-2 min-w-0 sm:col-span-1">
            <dt className="label text-acid-500">{labels.role}</dt>
            <dd className="text-[14px] font-bold">{item.role}</dd>
          </div>
          <div className="min-w-0">
            <dt className="label text-acid-500">{labels.year}</dt>
            <dd className="font-mono text-[14px]">{item.years}</dd>
          </div>
          <div className="min-w-0">
            <dt className="label text-acid-500">{labels.surfaces}</dt>
            <dd className="text-[14px]">{item.surfaces}</dd>
          </div>
        </dl>
        <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
          {item.stack.map((s) => (
            <li key={s}>
              <Tag className="px-2 py-1 text-[10px]">{s}</Tag>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-1">
          <ExternalLinks item={item} labels={labels} />
          <span aria-hidden="true" className={buttonClass("primary", "sm", "pointer-events-none ml-auto")}>
            {labels.open} →
          </span>
        </div>
      </div>
    </article>
  );
}

function CaseCard({ item, labels }: { item: CaseItem; labels: CaseLabels }) {
  const shown = item.stack.slice(0, 3);
  return (
    <article className={cn("group relative flex min-w-0 flex-col border-2 border-paper-100 bg-ink-950", LIFT)}>
      <CasePoster name={item.name} number={item.number} year={item.years} caption={item.kind} tone={item.tone} src={item.cover} className="border-b-2 border-inherit" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-[13px] text-acid-500">{item.number}</span>
          <StatusBadge status={item.status} label={labels.status[item.status]} />
        </div>
        <h3 className="text-[30px] leading-[0.9] text-paper-100">
          <Link href={`/work/${item.slug}`} className={cn(STRETCH, "outline-none group-hover:text-acid-500")}>
            {item.name}
          </Link>
        </h3>
        <p className="line-clamp-3 text-[13px] leading-relaxed text-ink-300">{item.summary}</p>
        <p className="font-mono text-[12px] text-ink-500">
          {item.years} · {item.surfaces}
        </p>
        <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
          {shown.map((s) => (
            <li key={s}>
              <Tag className="px-2 py-1 text-[10px]">{s}</Tag>
            </li>
          ))}
          {item.stack.length > shown.length ? (
            <li className="self-center font-mono text-[11px] text-ink-500">+{item.stack.length - shown.length}</li>
          ) : null}
        </ul>
        <div className="mt-auto pt-2">
          <ExternalLinks item={item} labels={labels} />
        </div>
      </div>
    </article>
  );
}

export function CaseList({ items, labels }: { items: CaseItem[]; labels: CaseLabels }) {
  // Multi-select: an empty set means no filter.
  const [picked, setPicked] = useState<Set<ProjectStatus>>(new Set());
  const statuses = ORDER.filter((s) => items.some((i) => i.status === s));

  const toggle = (s: ProjectStatus) =>
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s); else next.add(s);
      return next;
    });

  const shown = useMemo(() => items.filter((i) => picked.size === 0 || picked.has(i.status)), [items, picked]);
  const featured = shown.filter((i) => i.featured);
  const others = shown.filter((i) => !i.featured);

  return (
    <>
      <div className="flex flex-col gap-4 border-b-2 border-ink-700 py-5 md:flex-row md:items-center md:justify-between">
        <fieldset className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-3">
          <legend className="sr-only">{labels.filter}</legend>
          <span aria-hidden="true" className="label text-ink-500">{labels.filter}</span>
          <div className="flex flex-wrap gap-2">
            {statuses.map((s) => (
              <label key={s} className={cn(CHIP, picked.has(s) ? "border-acid-500 bg-acid-500 text-ink-950" : "border-paper-100 text-paper-100 hover:bg-paper-100 hover:text-ink-950")}>
                <input type="checkbox" className="sr-only" checked={picked.has(s)} onChange={() => toggle(s)} />
                <span aria-hidden="true" className="font-mono text-[11px]">{picked.has(s) ? "✕" : "+"}</span>
                {labels.status[s]}
              </label>
            ))}
            {picked.size > 0 ? (
              <button type="button" onClick={() => setPicked(new Set())} className="px-2 font-condensed text-[12px] font-bold tracking-[0.1em] text-ink-500 uppercase hover:text-paper-100">
                {labels.all}
              </button>
            ) : null}
          </div>
        </fieldset>
        <span className="font-mono text-[12px] text-ink-500" aria-live="polite">
          {labels.count.replace("{count}", String(shown.length))}
        </span>
      </div>

      {shown.length === 0 ? <p className="py-10 text-[15px] text-ink-300">{labels.empty}</p> : null}

      {featured.length ? (
        <section aria-labelledby="cases-featured" className="flex flex-col gap-8 py-10">
          <h2 id="cases-featured" className="label text-acid-500">
            ✱ {labels.featured}
          </h2>
          {featured.map((item, i) => (
            <CaseFeature key={item.slug} item={item} labels={labels} flip={i % 2 === 1} />
          ))}
        </section>
      ) : null}

      {others.length ? (
        <section aria-labelledby="cases-others" className="flex flex-col gap-6 border-t-2 border-ink-700 py-10">
          <h2 id="cases-others" className="text-h2 text-paper-100">
            {labels.others}
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {others.map((item) => (
              <CaseCard key={item.slug} item={item} labels={labels} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
