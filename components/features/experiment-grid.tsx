"use client";

import { useMemo, useState } from "react";
import { Tag } from "@/components/ui/tag";
import type { Category } from "@/content/experiments";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { ExperimentPreview } from "./experiment-preview";

export type GridItem = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  category: Category;
  createdAt: string;
  dateLabel: string;
};

type Sort = "az" | "za" | "newest" | "oldest";
const SORTS: Sort[] = ["az", "za", "newest", "oldest"];
const CATEGORIES: Category[] = ["kits", "images", "typography", "interaction", "data", "security", "media"];

export type GridLabels = {
  category: string;
  sort: string;
  all: string;
  images: string;
  typography: string;
  interaction: string;
  data: string;
  security: string;
  media: string;
  kits: string;
  az: string;
  za: string;
  newest: string;
  oldest: string;
  empty: string;
  open: string;
  hover: string;
  /** ICU-style template with a {count} placeholder; functions cannot cross to the client. */
  count: string;
};

/* Toggle chip: a checkbox styled as a Raw Folio tag; several can be on at once. */
const CHIP =
  "inline-flex cursor-pointer items-center gap-1.5 border-2 px-3 py-1.5 font-condensed text-[12px] font-bold tracking-[0.1em] uppercase transition-all duration-[120ms] has-focus-visible:outline-2 has-focus-visible:outline-acid-500";

export function ExperimentGrid({ items, labels }: { items: GridItem[]; labels: GridLabels }) {
  const [sort, setSort] = useState<Sort>("newest");
  // Multi-select: an empty set means no filter (everything shows).
  const [categories, setCategories] = useState<Set<Category>>(new Set());

  const toggle = (c: Category) =>
    setCategories((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c); else next.add(c);
      return next;
    });

  const shown = useMemo(() => {
    const list = items.filter((i) => categories.size === 0 || categories.has(i.category));
    const by: Record<Sort, (a: GridItem, b: GridItem) => number> = {
      az: (a, b) => a.title.localeCompare(b.title),
      za: (a, b) => b.title.localeCompare(a.title),
      newest: (a, b) => b.createdAt.localeCompare(a.createdAt),
      oldest: (a, b) => a.createdAt.localeCompare(b.createdAt),
    };
    return [...list].sort(by[sort]);
  }, [items, sort, categories]);

  return (
    <>
      <div className="flex flex-col gap-4 border-b-2 border-ink-700 py-5 md:flex-row md:items-center md:justify-between">
        <fieldset className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-3">
          <legend className="sr-only">{labels.category}</legend>
          <span aria-hidden="true" className="label text-ink-500">{labels.category}</span>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <label key={c} className={cn(CHIP, categories.has(c) ? "border-acid-500 bg-acid-500 text-ink-950" : "border-paper-100 text-paper-100 hover:bg-paper-100 hover:text-ink-950")}>
                <input type="checkbox" className="sr-only" checked={categories.has(c)} onChange={() => toggle(c)} />
                <span aria-hidden="true" className="font-mono text-[11px]">{categories.has(c) ? "✕" : "+"}</span>
                {labels[c]}
              </label>
            ))}
            {categories.size > 0 ? (
              <button type="button" onClick={() => setCategories(new Set())} className="px-2 font-condensed text-[12px] font-bold tracking-[0.1em] text-ink-500 uppercase hover:text-paper-100">
                {labels.all}
              </button>
            ) : null}
          </div>
        </fieldset>
        <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-3">
          <label htmlFor="experiments-sort" className="label text-ink-500">{labels.sort}</label>
          <select
            id="experiments-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="border-2 border-paper-100 bg-ink-950 px-3 py-2 font-condensed text-[12px] font-bold tracking-[0.1em] text-paper-100 uppercase outline-none focus-visible:border-acid-500"
          >
            {SORTS.map((s) => (
              <option key={s} value={s}>{labels[s]}</option>
            ))}
          </select>
          <span className="font-mono text-[12px] text-ink-500" aria-live="polite">
            {labels.count.replace("{count}", String(shown.length))}
          </span>
        </div>
      </div>

      {shown.length === 0 ? (
        <p className="py-10 text-[15px] text-ink-300">{labels.empty}</p>
      ) : (
        <div className="grid grid-cols-1 gap-5 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {shown.map((e) => {
            const href = `/open-source/${e.slug}`;
            return (
              <article key={e.slug} className="flex min-w-0 flex-col gap-4" data-category={e.category}>
                <ExperimentPreview slug={e.slug} title={e.title} href={href} hint={labels.hover} />
                <div className="flex min-w-0 flex-col gap-2">
                  <span className="flex justify-between gap-3 font-mono text-[12px] text-acid-500">
                    <span>{labels[e.category]}</span>
                    <time dateTime={e.createdAt} className="text-ink-500">
                      {e.dateLabel}
                    </time>
                  </span>
                  <h2 className="text-[22px]">
                    <Link href={href} className="text-paper-100 transition-colors hover:text-acid-500">
                      {e.title}
                    </Link>
                  </h2>
                  <p className="text-[13px] text-ink-300">{e.summary}</p>
                  <div className="flex items-center justify-between gap-3 pt-1">
                    <ul className="flex flex-wrap gap-1.5">
                      {e.tags.slice(0, 2).map((tag) => (
                        <li key={tag}>
                          <Tag className="px-2 py-1 text-[10px]">{tag}</Tag>
                        </li>
                      ))}
                    </ul>
                    <Link href={href} className="shrink-0 font-condensed text-[13px] font-bold tracking-[0.1em] text-acid-500 uppercase hover:text-white">
                      {labels.open}
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}
