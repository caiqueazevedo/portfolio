import type { ProjectStatus } from "@/content/projects";
import { cn } from "@/lib/cn";
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
export function StatusBadge({ status, className }: { status: ProjectStatus; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "bg-paper pointer-events-none flex h-[26px] w-[26px] items-center justify-center rounded-full",
        className,
      )}
    >
      <StatusDot status={status} size={7} />
    </span>
  );
}
