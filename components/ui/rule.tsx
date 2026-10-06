import { cn } from "@/lib/cn";
export function Rule({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn("block h-px w-10 bg-current", className)} />;
}
