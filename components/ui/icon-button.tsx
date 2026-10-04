import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "paper";

const BASE = "inline-flex h-11 w-11 shrink-0 items-center justify-center border-2 text-[22px] font-extrabold leading-none transition-all duration-200";

const VARIANT: Record<Variant, string> = {
  primary: "bg-ink text-paper border-ink hover:-rotate-6 hover:scale-[1.06]",
  ghost: "bg-transparent text-ink border-ink/14 hover:bg-ink hover:text-paper",
  paper: "bg-ink text-paper border-ink hover:-rotate-6 hover:scale-[1.06]",
};

type Props = ComponentProps<typeof Link> & { glyph?: string; variant?: Variant; label: string };

/** Square glyph button (→ by default), rendered as a link. */
export function IconButtonLink({ glyph = "→", variant = "primary", label, className, ...props }: Props) {
  return (
    <Link aria-label={label} className={cn(BASE, VARIANT[variant], className)} {...props}>
      <span aria-hidden="true">{glyph}</span>
    </Link>
  );
}
