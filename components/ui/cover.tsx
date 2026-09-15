import Image from "next/image";
import { cn } from "@/lib/cn";

type Props = {
  /** Public path of the generated image, or null for the placeholder. */
  src: string | null;
  alt: string;
  ratio?: "16/10" | "21/9" | "16/9" | "4/5";
  /** Glow anchor for the placeholder, e.g. "30% 70%". */
  glow?: string;
  priority?: boolean;
  className?: string;
};

const RATIO = {
  "16/10": "aspect-[16/10]",
  "21/9": "aspect-[21/9]",
  "16/9": "aspect-video",
  "4/5": "aspect-[4/5]",
} as const;

export function Cover({ src, alt, ratio = "16/10", glow = "30% 70%", priority, className }: Props) {
  return (
    <div
      className={cn("relative w-full max-w-full overflow-hidden bg-surface-2", RATIO[ratio], className)}
      data-testid="cover"
      data-placeholder={src ? undefined : "true"}
    >
      {src ? (
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 60vw, 100vw" priority={priority} className="object-cover" />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(ellipse 65% 60% at ${glow}, rgb(210 178 122 / 0.16), transparent 70%)`,
          }}
        >
          <div className="grain" />
        </div>
      )}
    </div>
  );
}
