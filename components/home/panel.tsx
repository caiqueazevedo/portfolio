import type { ReactNode } from "react";
import type { PanelId } from "@/content/panels";
import { cn } from "@/lib/cn";

const TONE = {
  mist: "bg-mist text-ink",
  paper: "bg-paper text-ink",
  ink: "bg-ink text-paper",
} as const;

/**
 * One screen of the home.
 *
 * Every panel is exactly one viewport and never scrolls: the rail moves, the content does not.
 * That is also the constraint the type scale is built around — `min(Xvw, Yvh)` everywhere, so a
 * short window shrinks the display type instead of pushing a line out of sight.
 *
 * Below `md` the same section becomes an ordinary stacked block with a minimum height, because
 * a phone cannot honour "fits in one screen" and "says something" at once.
 */
export function Panel({
  id,
  tone,
  className,
  children,
}: {
  id: PanelId;
  tone: keyof typeof TONE;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      data-panel=""
      id={`panel-${id}`}
      className={cn(
        "relative w-full min-w-0 flex-none min-h-[100svh] md:h-[100svh] md:w-screen md:overflow-hidden",
        TONE[tone],
        className,
      )}
    >
      {children}
    </section>
  );
}

/** Top padding clears the 94px of fixed chrome; bottom clears the 56px rail footer. */
export const PANEL_PAD = "px-edge pt-[calc(94px+5vh)] pb-[calc(56px+4vh)]";
export const PANEL_PAD_TIGHT = "px-edge pt-[calc(94px+4vh)] pb-[calc(56px+3vh)]";
