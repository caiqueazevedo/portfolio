"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export type HighlightedView = {
  id: string;
  label: string;
  html: string;
  code: string;
  lines: number;
};

type Props = {
  views: HighlightedView[];
  copyLabel: string;
  copiedLabel: string;
  linesLabel: string;
};
export function CodePanel({ views, copyLabel, copiedLabel, linesLabel }: Props) {
  const [active, setActive] = useState(views[0]?.id);
  const [copied, setCopied] = useState(false);
  const view = views.find((v) => v.id === active) ?? views[0];

  async function copy() {
    try {
      await navigator.clipboard.writeText(view.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  }

  return (
    <div className="border-ink/14 bg-paper flex min-w-0 flex-col border">
      <div className="border-ink/14 flex items-center justify-between gap-3 border-b">
        <div role="tablist" className="flex">
          {views.map((v, i) => (
            <button
              key={v.id}
              role="tab"
              type="button"
              aria-selected={v.id === view.id}
              onClick={() => setActive(v.id)}
              className={cn(
                "px-4 py-2.5 text-[13px] font-bold tracking-[0.1em] uppercase transition-all duration-200",
                i > 0 && "border-ink/14 border-l",
                v.id === view.id ? "bg-ink text-paper" : "text-ink hover:bg-ink hover:text-paper",
              )}
            >
              {v.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 pr-2">
          <span className="text-muted hidden font-mono text-[11px] sm:inline">
            {view.lines} {linesLabel}
          </span>
          <button
            type="button"
            onClick={copy}
            className={cn(
              "border-2 px-3 py-1.5 text-[12px] font-bold tracking-[0.1em] uppercase transition-all duration-200",
              copied
                ? "border-ink bg-ink text-paper"
                : "border-ink/14 text-ink hover:bg-ink hover:text-paper",
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
