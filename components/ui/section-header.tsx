import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = { title: string; glyph?: string; action?: ReactNode; className?: string; as?: "h1" | "h2" };

/** "SERVIÇOS ✱": display title with an acid glyph, optional action on the right. */
export function SectionHeader({ title, glyph = "✱", action, className, as: Tag = "h2" }: Props) {
  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      <Tag className="flex items-center gap-3.5 text-h2 text-paper-100">
        {title}
        <span aria-hidden="true" className="font-sans font-extrabold text-acid-500">
          {glyph}
        </span>
      </Tag>
      {action}
    </div>
  );
}
