import { Photo } from "@/components/ui/photo";
import { media } from "@/content/media";
import type { Project } from "@/content/projects";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

type Props = { project: Project; index: number; locale: Locale; openLabel: string; className?: string };

/** One row of the selected-works list: numbered text block glued to a B&W photo. */
export function WorkRow({ project, index, locale, openLabel, className }: Props) {
  const number = String(index + 1).padStart(2, "0");
  return (
    <Link
      href={`/work/${project.slug}`}
      aria-label={`${openLabel}: ${project.name}`}
      className={cn(
        "group grid min-w-0 grid-cols-1 border-2 border-paper-100 transition-colors duration-[120ms] hover:bg-ink-900 sm:grid-cols-[220px_minmax(0,1fr)]",
        className,
      )}
    >
      <div className="flex min-w-0 flex-col gap-2 border-b-2 border-paper-100 px-5 py-4.5 sm:border-r-2 sm:border-b-0">
        <span className="font-mono text-[13px] text-acid-500">{number}</span>
        <span className="text-[15px] leading-[1.2] font-extrabold uppercase group-hover:text-acid-500">{project.name}</span>
        <ul className="flex flex-wrap gap-1.5">
          {project.tags[locale].map((tag) => (
            <li key={tag} className="font-condensed text-[10px] tracking-[0.08em] text-ink-300 uppercase">
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <Photo src={media.covers[project.cover] ?? null} alt="" label={project.name} ratio="3/2" className="sm:aspect-auto sm:h-[120px]" />
    </Link>
  );
}
