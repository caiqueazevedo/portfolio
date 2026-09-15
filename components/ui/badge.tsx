import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Color = "acid" | "blue" | "paper";

const COLOR: Record<Color, string> = {
  acid: "bg-acid-500 text-ink-950",
  blue: "bg-blue-500 text-white",
  paper: "bg-paper-100 text-ink-950",
};

type Props = ComponentProps<"span"> & { color?: Color; pulse?: boolean };

export function Badge({ color = "acid", pulse, className, children, ...props }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 font-condensed text-[12px] font-bold tracking-[0.12em] uppercase",
        COLOR[color],
        className,
      )}
      {...props}
    >
      {pulse ? <span aria-hidden="true" className="h-2 w-2 rounded-pill bg-current animate-pulse-dot" /> : null}
      {children}
    </span>
  );
}
