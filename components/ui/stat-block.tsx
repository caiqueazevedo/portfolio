import { cn } from "@/lib/cn";

type Props = { value: string; label: string; dark?: boolean; className?: string };

/** Giant display number over a condensed label. `dark` for use on the acid band. */
export function StatBlock({ value, label, dark, className }: Props) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-1", dark ? "text-ink-950" : "text-paper-100", className)}>
      <span className="font-display text-[44px] leading-[0.95] uppercase sm:text-[56px]">{value}</span>
      <span className="label">{label}</span>
    </div>
  );
}
