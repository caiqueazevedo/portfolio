import { cn } from "@/lib/cn";

/**
 * The 40x1px dash that closes a kicker.
 *
 * Its own component because it appears at the top-left, bottom-right and inside the case hero,
 * and a stray `h-px w-10 bg-ink` in one of them is how three different dashes happen.
 */
export function Rule({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn("block h-px w-10 bg-current", className)} />;
}
