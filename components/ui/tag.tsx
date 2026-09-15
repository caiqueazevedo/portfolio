import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export function Tag({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "rounded-full border border-line-strong/70 px-2.5 py-1.5 text-tag tracking-[0.12em] text-muted uppercase",
        className,
      )}
      {...props}
    />
  );
}
