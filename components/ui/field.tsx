import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Form controls, editorial: no fill, no radius, one hairline under the text.
 *
 * The underline is the control. A boxed input would be the only rounded-corner-free rectangle
 * on a site built entirely out of 1px rules, and it would read as a form pasted in from
 * somewhere else.
 */
const CONTROL =
  "w-full min-w-0 border-0 border-b border-ink/30 bg-transparent px-0 py-2.5 text-[15px] text-ink outline-none transition-colors placeholder:text-faint focus:border-ink aria-invalid:border-danger";

type FieldProps = { id: string; label: string; error?: boolean; children: ReactNode; className?: string };

export function Field({ id, label, error, children, className }: FieldProps) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-2", className)}>
      <label htmlFor={id} className={cn("micro", error ? "text-danger" : "text-muted")}>
        {label}
      </label>
      {children}
    </div>
  );
}

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(CONTROL, className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cn(CONTROL, "resize-y", className)} {...props} />;
}
