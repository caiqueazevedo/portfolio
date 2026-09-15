import Image from "next/image";
import { cn } from "@/lib/cn";

type Props = {
  /** Public path of the image, or null for the grey placeholder. */
  src: string | null;
  alt: string;
  /** Caption shown on the placeholder (mono, uppercase). */
  label?: string;
  ratio?: "16/10" | "21/9" | "16/9" | "4/5" | "3/2";
  priority?: boolean;
  className?: string;
};

const RATIO = {
  "16/10": "aspect-[16/10]",
  "21/9": "aspect-[21/9]",
  "16/9": "aspect-video",
  "4/5": "aspect-[4/5]",
  "3/2": "aspect-[3/2]",
} as const;

/** Photos are always black and white with grain. Without a source, the kit's grey placeholder. */
export function Photo({ src, alt, label, ratio = "16/10", priority, className }: Props) {
  return (
    <div
      className={cn("grain bw relative w-full max-w-full overflow-hidden", RATIO[ratio], className)}
      style={src ? undefined : { background: "linear-gradient(155deg,#8a8880 0%,#4a4844 45%,#1c1b18 100%)" }}
      data-testid="photo"
      data-placeholder={src ? undefined : "true"}
    >
      {src ? (
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 60vw, 100vw" priority={priority} className="object-cover" />
      ) : label ? (
        <span className="absolute bottom-3 left-3 font-mono text-[11px] tracking-[0.1em] text-[#cfccc2] uppercase">{label}</span>
      ) : null}
    </div>
  );
}
