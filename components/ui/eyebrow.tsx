import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export function Eyebrow({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn("text-eyebrow font-medium tracking-[0.18em] text-muted uppercase", className)}
      {...props}
    />
  );
}
