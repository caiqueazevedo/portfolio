import type { ComponentProps, ElementType } from "react";
import { cn } from "@/lib/cn";

type Props = ComponentProps<"h2"> & {
  as?: ElementType;
  /** Plain part of the heading. */
  start: string;
  /** Italic bronze ending, the one accent the design allows. */
  accent?: string;
  size?: "hero" | "display" | "title" | "subtitle";
};

const SIZE = {
  hero: "text-hero",
  display: "text-display",
  title: "text-title",
  subtitle: "text-subtitle",
} as const;

export function Heading({ as, start, accent, size = "title", className, ...props }: Props) {
  const Tag = as ?? "h2";
  return (
    <Tag className={cn("font-serif text-balance", SIZE[size], className)} {...props}>
      {start}
      {accent ? (
        <>
          {" "}
          <em className="text-accent italic">{accent}</em>
        </>
      ) : null}
    </Tag>
  );
}
