import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Rule } from "./rule";
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
