import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "blue";
type Size = "sm" | "md" | "lg";

/* Raw Folio Button: condensed uppercase, 2px border, hard shadow that lifts on hover
   (-2px, 7px shadow) and collapses on press (3px, no shadow). */
const BASE =
  "inline-flex items-center gap-2 font-condensed font-bold uppercase tracking-[0.1em] leading-none border-2 border-ink-950 select-none transition-[transform,box-shadow,background-color,color] duration-[120ms] ease-snap active:translate-x-[3px] active:translate-y-[3px] active:shadow-none disabled:pointer-events-none disabled:opacity-40";

const SIZE: Record<Size, string> = {
  sm: "text-[12px] px-3.5 py-2",
  md: "text-[14px] px-5 py-3",
  lg: "text-[16px] px-7 py-4",
};

const VARIANT: Record<Variant, string> = {
  primary: "bg-acid-500 text-ink-950 shadow-hard-paper hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg-paper",
  secondary: "bg-paper-100 text-ink-950 shadow-hard-acid hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg-acid",
  ghost: "bg-transparent text-paper-100 border-paper-100 hover:bg-paper-100 hover:text-ink-950",
  blue: "bg-blue-500 text-white shadow-hard-paper hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg-paper",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(BASE, SIZE[size], VARIANT[variant], className);
}

type LinkProps = ComponentProps<typeof Link> & { variant?: Variant; size?: Size };

export function ButtonLink({ variant = "primary", size = "md", className, ...props }: LinkProps) {
  return <Link className={buttonClass(variant, size, className)} {...props} />;
}

type ButtonProps = ComponentProps<"button"> & { variant?: Variant; size?: Size };

export function Button({ variant = "primary", size = "md", className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClass(variant, size, className)} {...props} />;
}
