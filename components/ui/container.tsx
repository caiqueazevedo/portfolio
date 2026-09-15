import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/** Full-bleed page column with the system's 40px gutter (fluid down to 16px). */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("w-full min-w-0 px-gutter", className)} {...props} />;
}
