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
const CATEGORIES: Array<Category | "all"> = ["all", "filter", "typography", "collage"];

export type GridLabels = {
  category: string;
  sort: string;
  all: string;
  filter: string;
  typography: string;
  collage: string;
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

const SEG_BTN =
  "px-3.5 py-2 font-condensed text-[12px] font-bold tracking-[0.1em] uppercase transition-all duration-[120ms] aria-pressed:bg-acid-500 aria-pressed:text-ink-950 hover:not-aria-pressed:bg-paper-100 hover:not-aria-pressed:text-ink-950";

export function ExperimentGrid({ items, labels }: { items: GridItem[]; labels: GridLabels }) {
  const [sort, setSort] = useState<Sort>("newest");
  const [category, setCategory] = useState<Category | "all">("all");

  const shown = useMemo(() => {
    const list = items.filter((i) => category === "all" || i.category === category);
    const by: Record<Sort, (a: GridItem, b: GridItem) => number> = {
      az: (a, b) => a.title.localeCompare(b.title),
      za: (a, b) => b.title.localeCompare(a.title),
      newest: (a, b) => b.createdAt.localeCompare(a.createdAt),
      oldest: (a, b) => a.createdAt.localeCompare(b.createdAt),
    };
    return [...list].sort(by[sort]);
  }, [items, sort, category]);

  return (
    <>
      <div className="flex flex-col gap-4 border-b-2 border-ink-700 py-5 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-3">
          <span className="label text-ink-500">{labels.category}</span>
          <div role="group" aria-label={labels.category} className="flex max-w-full overflow-x-auto border-2 border-paper-100">
            {CATEGORIES.map((c, i) => (
              <button
                key={c}
                type="button"
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
                className={cn(SEG_BTN, i > 0 && "border-l-2 border-paper-100")}
              >
                {labels[c]}
              </button>
            ))}
          </div>
        </div>
        <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-3">
          <span className="label text-ink-500">{labels.sort}</span>
          <div role="group" aria-label={labels.sort} className="flex max-w-full overflow-x-auto border-2 border-paper-100">
            {SORTS.map((s, i) => (
              <button
                key={s}
                type="button"
                aria-pressed={sort === s}
                onClick={() => setSort(s)}
                className={cn(SEG_BTN, i > 0 && "border-l-2 border-paper-100")}
              >
                {labels[s]}
              </button>
            ))}
          </div>
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
