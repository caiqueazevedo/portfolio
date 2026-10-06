import type { ReactNode } from "react";
import type { PanelId } from "@/content/panels";
import { cn } from "@/lib/cn";

const TONE = {
  mist: "bg-mist text-ink",
  paper: "bg-paper text-ink",
  ink: "bg-ink text-paper",
} as const;
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
        "relative min-h-[100svh] w-full min-w-0 flex-none md:h-[100svh] md:w-screen md:overflow-hidden",
        TONE[tone],
        className,
      )}
    >
      {children}
    </section>
  );
}
export const PANEL_PAD = "px-edge pt-[calc(94px+5vh)] pb-[calc(56px+4vh)]";
export const PANEL_PAD_TIGHT = "px-edge pt-[calc(94px+4vh)] pb-[calc(56px+3vh)]";
