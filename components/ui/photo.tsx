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

  label?: string;
  ratio?: keyof typeof RATIO;
  priority?: boolean;
  className?: string;
};
export function Photo({ src, alt, label, ratio = "16/10", priority, className }: Props) {
  return (
    <div
      data-testid="photo"
      data-placeholder={src ? undefined : "true"}
      className={cn(
        "bg-mist relative w-full max-w-full overflow-hidden",
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
        <span className="micro text-faint absolute bottom-3 left-3">{label ?? alt}</span>
      )}
    </div>
  );
}
