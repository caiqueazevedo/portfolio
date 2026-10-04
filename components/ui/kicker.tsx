import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Rule } from "./rule";

/**
 * A section's name, in the widest tracking the system has, over a 40px dash.
 *
 * The dash is part of the mark, not decoration: without it the kicker reads as a stray line of
 * small caps floating in the corner.
 */
export function Kicker({
  children,
  rule = false,
  className,
}: {
  children: ReactNode;
  rule?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3.5", className)}>
      <span className="kicker">{children}</span>
      {rule ? <Rule /> : null}
    </div>
  );
}
