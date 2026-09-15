import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Color = "blue" | "acid" | "paper";

const COLOR: Record<Color, string> = {
  blue: "bg-blue-500 text-white",
  acid: "bg-acid-500 text-ink-950",
  paper: "bg-paper-50 text-ink-950",
};

type Props = {
  children: ReactNode;
  color?: Color;
  /** Degrees, -3 to 3. */
  rotate?: number;
  /** Graffiti marker face, lowercase. */
  marker?: boolean;
  className?: string;
};

/** Torn paper label, slightly askew, with a hard drop shadow that follows the tear. */
export function Sticker({ children, color = "blue", rotate = -2, marker, className }: Props) {
  return (
    <span className={cn("inline-block drop-hard-sm", className)} style={{ transform: `rotate(${rotate}deg)` }}>
      <span
        className={cn(
          "paper-tex torn inline-block px-5 py-3",
          marker
            ? "font-marker text-[22px] leading-tight lowercase"
            : "font-condensed text-[14px] font-bold tracking-[0.1em] uppercase",
          COLOR[color],
        )}
      >
        {children}
      </span>
    </span>
  );
}
