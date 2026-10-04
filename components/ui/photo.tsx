import Image from "next/image";
import { cn } from "@/lib/cn";

const RATIO = {
  "16/10": "aspect-[16/10]",
  "21/9": "aspect-[21/9]",
  "16/9": "aspect-video",
  "4/5": "aspect-[4/5]",
  "3/2": "aspect-[3/2]",
  fill: "h-full w-full",
} as const;

type Props = {
  src?: string | null;
  alt: string;
  /** Shown only while there is no image: what the slot is waiting for. */
  label?: string;
  ratio?: keyof typeof RATIO;
  priority?: boolean;
  className?: string;
};

/**
 * Every photo on the site, always black and white.
 *
 * Until the real assets land, the slot is a flat mist rectangle with its caption — not a grey
 * gradient pretending to be a picture. An empty slot that looks like a photo is how a missing
 * asset survives to production.
 */
export function Photo({ src, alt, label, ratio = "16/10", priority, className }: Props) {
  return (
    <div
      data-testid="photo"
      data-placeholder={src ? undefined : "true"}
      className={cn(
        "relative w-full max-w-full overflow-hidden bg-mist",
        src && "bw",
        RATIO[ratio],
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
        />
      ) : (
        <span className="absolute bottom-3 left-3 micro text-faint">{label ?? alt}</span>
      )}
    </div>
  );
}
