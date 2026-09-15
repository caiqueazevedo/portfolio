import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Props = ComponentProps<"span"> & { active?: boolean };

export function Tag({ active, className, ...props }: Props) {
  return (
    <span
      className={cn(
        "inline-block border-2 px-3 py-1.5 font-condensed text-[12px] font-bold tracking-[0.1em] uppercase transition-all duration-[120ms]",
        active ? "border-acid-500 bg-acid-500 text-ink-950" : "border-ink-700 bg-transparent text-paper-100",
        className,
      )}
      data-active={active || undefined}
      {...props}
    />
  );
}
