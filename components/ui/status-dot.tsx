import type { ProjectStatus } from "@/content/projects";
import { cn } from "@/lib/cn";

/** The one place a status becomes a colour. */
export const STATUS_COLOR: Record<ProjectStatus, string> = {
  production: "bg-production",
  active: "bg-active",
  paused: "bg-paused",
};

type Props = { status: ProjectStatus; size?: number; className?: string };

export function StatusDot({ status, size = 6, className }: Props) {
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size }}
      className={cn("inline-block shrink-0 rounded-full", STATUS_COLOR[status], className)}
    />
  );
}

/** The dot inside a paper disc, as the case cards wear it over an image. */
export function StatusBadge({ status, className }: { status: ProjectStatus; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none flex h-[26px] w-[26px] items-center justify-center rounded-full bg-paper",
        className,
      )}
    >
      <StatusDot status={status} size={7} />
    </span>
  );
}
