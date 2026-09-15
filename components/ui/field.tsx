import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/* Raw Folio Input/Textarea: ink-900 fill, 2px ink-700 border, acid border + hard acid
   shadow on focus, danger on error. */
const CONTROL =
  "w-full min-w-0 border-2 border-ink-700 bg-ink-900 px-3.5 py-3 font-sans text-[15px] text-paper-100 outline-none transition-[border-color,box-shadow] duration-[120ms] placeholder:text-ink-500 focus:border-acid-500 focus:shadow-focus-acid aria-invalid:border-danger";

type FieldProps = { id: string; label: string; error?: boolean; children: React.ReactNode; className?: string };

export function Field({ id, label, error, children, className }: FieldProps) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-2", className)}>
      <label htmlFor={id} className={cn("label", error ? "text-danger" : "text-paper-100")}>
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
