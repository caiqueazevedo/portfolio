import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("px-gutter w-full min-w-0", className)} {...props} />;
}
