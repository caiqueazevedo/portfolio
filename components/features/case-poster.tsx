import { Photo } from "@/components/ui/photo";
import { cn } from "@/lib/cn";

export type PosterTone = "acid" | "paper" | "blue";

const TONE: Record<PosterTone, { box: string; stroke: string; tag: string }> = {
  acid: { box: "bg-acid-500 text-ink-950", stroke: "#0e0e0c", tag: "bg-ink-950 text-acid-500" },
  paper: { box: "bg-paper-100 text-ink-950", stroke: "#0e0e0c", tag: "bg-acid-500 text-ink-950" },
  blue: { box: "bg-blue-500 text-white", stroke: "#ffffff", tag: "bg-paper-100 text-ink-950" },
};

type Props = {
  name: string;
  number: string;
  year: string;
  /** Short label on the corner tag, e.g. the project's kind. */
  caption: string;
  tone: PosterTone;
  /** A real cover wins over the generated poster. */
  src: string | null;
  priority?: boolean;
  className?: string;
};

/**
 * Cover for a case. Until a photo exists, a typographic poster: the name set huge,
 * once filled and once outlined, cropped by the frame. Sized in container units so
 * the same poster works on a wide feature block and on a small card.
 */
export function CasePoster({ name, number, year, caption, tone, src, priority, className }: Props) {
  if (src) return <Photo src={src} alt="" label={name} ratio="16/10" priority={priority} className={className} />;

  const t = TONE[tone];
  // Long names shrink so at least most of the first word stays in frame.
  const size = `${Math.min(34, 200 / Math.max(name.length, 4))}cqw`;
  const word = "absolute left-[-3%] block font-display leading-[0.82] whitespace-nowrap uppercase transition-transform duration-[120ms] ease-snap";

  return (
    <div
      aria-hidden="true"
      data-testid="case-poster"
      className={cn("@container grain relative aspect-[16/10] w-full overflow-hidden", t.box, className)}
    >
      <span className={cn(word, "top-[16%] -rotate-6 group-hover:-translate-x-3")} style={{ fontSize: size }}>
        {name}
      </span>
      <span
        className={cn(word, "top-[50%] -rotate-6 text-transparent group-hover:translate-x-3")}
        style={{ fontSize: size, WebkitTextStroke: `2px ${t.stroke}` }}
      >
        {name}
      </span>
      <span className="absolute top-3 left-3 font-mono text-[11px] tracking-[0.1em] uppercase">
        case {number} / {year}
      </span>
      <span className={cn("absolute right-3 bottom-3 px-2.5 py-1 font-condensed text-[11px] font-bold tracking-[0.12em] uppercase", t.tag)}>
        {caption}
      </span>
    </div>
  );
}
