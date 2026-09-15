import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  color?: "paper" | "acid";
  /** Degrees, -3 to 3. */
  rotate?: number;
  className?: string;
  innerClassName?: string;
};

/** Torn paper block with fibre texture and a shadow that follows the tear. */
export function PaperCard({ children, color = "paper", rotate = 0, className, innerClassName }: Props) {
  return (
    <div className={cn("drop-hard", className)} style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}>
      <div
        className={cn(
          "paper-tex torn p-7 text-ink-950",
          color === "acid" ? "bg-acid-500" : "bg-paper-50",
          innerClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
