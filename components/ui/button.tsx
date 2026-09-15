import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { ArrowIcon } from "./arrow-icon";

type Variant = "primary" | "ghost";

const BASE =
  "inline-flex h-12 items-center justify-center gap-2.5 rounded-full px-6 text-sm font-medium tracking-[0.01em] transition-colors";

const VARIANT: Record<Variant, string> = {
  primary: "bg-fg text-bg hover:bg-white",
  ghost: "border border-line-strong text-fg hover:border-fg",
};

type LinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  arrow?: boolean;
};

export function ButtonLink({ variant = "primary", arrow, className, children, ...props }: LinkProps) {
  return (
    <Link className={cn(BASE, VARIANT[variant], className)} {...props}>
      {children}
      {arrow ? <ArrowIcon /> : null}
    </Link>
  );
}

type ButtonProps = ComponentProps<"button"> & { variant?: Variant; arrow?: boolean };

export function Button({ variant = "primary", arrow, className, children, ...props }: ButtonProps) {
  return (
    <button className={cn(BASE, VARIANT[variant], "disabled:opacity-60", className)} {...props}>
      {children}
      {arrow ? <ArrowIcon /> : null}
    </button>
  );
}
