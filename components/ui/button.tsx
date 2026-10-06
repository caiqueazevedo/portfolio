import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
type Variant = "solid" | "rule";

const BASE =
  "inline-flex items-center label select-none transition-colors disabled:pointer-events-none disabled:opacity-40";

const VARIANT: Record<Variant, string> = {
  solid: "h-11 px-7 bg-ink text-paper hover:bg-ink-soft hover:text-paper",
  rule: "rule-link hover:text-muted",
};

export function buttonClass(variant: Variant = "solid", className?: string) {
  return cn(BASE, VARIANT[variant], className);
}

type LinkProps = ComponentProps<typeof Link> & { variant?: Variant };

export function ButtonLink({ variant = "solid", className, ...props }: LinkProps) {
  return <Link className={buttonClass(variant, className)} {...props} />;
}

type ButtonProps = ComponentProps<"button"> & { variant?: Variant };

export function Button({ variant = "solid", className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClass(variant, className)} {...props} />;
}
