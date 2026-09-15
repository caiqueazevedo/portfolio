"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export type HighlightedView = { id: string; label: string; html: string; code: string; lines: number };

type Props = { views: HighlightedView[]; copyLabel: string; copiedLabel: string; linesLabel: string };

/** Tabs over pre-highlighted source, with a copy button. Highlighting happens at build time. */
export function CodePanel({ views, copyLabel, copiedLabel, linesLabel }: Props) {
  const [active, setActive] = useState(views[0]?.id);
  const [copied, setCopied] = useState(false);
  const view = views.find((v) => v.id === active) ?? views[0];

  async function copy() {
    try {
      await navigator.clipboard.writeText(view.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable: the code is selectable anyway */
    }
  }

  return (
    <div className="flex min-w-0 flex-col border-2 border-paper-100 bg-ink-900">
      <div className="flex items-center justify-between gap-3 border-b-2 border-paper-100">
        <div role="tablist" className="flex">
          {views.map((v, i) => (
            <button
              key={v.id}
              role="tab"
              type="button"
              aria-selected={v.id === view.id}
              onClick={() => setActive(v.id)}
              className={cn(
                "px-4 py-2.5 font-condensed text-[13px] font-bold tracking-[0.1em] uppercase transition-all duration-[120ms]",
                i > 0 && "border-l-2 border-paper-100",
                v.id === view.id ? "bg-acid-500 text-ink-950" : "text-paper-100 hover:bg-paper-100 hover:text-ink-950",
              )}
            >
              {v.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 pr-2">
          <span className="hidden font-mono text-[11px] text-ink-500 sm:inline">
            {view.lines} {linesLabel}
          </span>
          <button
            type="button"
            onClick={copy}
            className={cn(
              "border-2 px-3 py-1.5 font-condensed text-[12px] font-bold tracking-[0.1em] uppercase transition-all duration-[120ms]",
              copied ? "border-acid-500 bg-acid-500 text-ink-950" : "border-paper-100 text-paper-100 hover:bg-paper-100 hover:text-ink-950",
            )}
          >
            {copied ? copiedLabel : copyLabel}
          </button>
        </div>
      </div>
      <div
        role="tabpanel"
        className="code-panel max-h-[560px] min-w-0 overflow-auto p-4 font-mono text-[12.5px] leading-[1.6] lg:max-h-[640px]"
        dangerouslySetInnerHTML={{ __html: view.html }}
      />
    </div>
  );
}
