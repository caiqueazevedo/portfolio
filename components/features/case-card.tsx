import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { media } from "@/content/media";
import type { Project } from "@/content/projects";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { Cover } from "@/components/ui/cover";
import { Tag } from "@/components/ui/tag";
import { cn } from "@/lib/cn";

type Props = {
  project: Project;
  locale: Locale;
  readLabel: string;
  /** "wide" puts the cover beside the text on large screens. */
  layout?: "stack" | "wide";
  glow?: string;
  priority?: boolean;
};

export function CaseCard({ project, locale, readLabel, layout = "stack", glow, priority }: Props) {
  const wide = layout === "wide";
  return (
    <article
      className={cn("group grid min-w-0 grid-cols-1 gap-5", wide && "lg:grid-cols-12 lg:items-center lg:gap-8")}
    >
      <Link href={`/work/${project.slug}`} className={cn("block min-w-0", wide && "lg:col-span-7")} tabIndex={-1} aria-hidden="true">
        <Cover
          src={media.covers[project.cover] ?? null}
          alt=""
          glow={glow}
          priority={priority}
          className="transition-transform duration-700 ease-out group-hover:scale-[1.015]"
        />
      </Link>
      <div className={cn("flex min-w-0 flex-col gap-4", wide && "lg:col-span-5 lg:pl-6")}>
        <ul className="flex flex-wrap gap-2">
          {project.tags[locale].map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
        <h3 className={cn("font-serif", wide ? "text-title" : "text-subtitle")}>
          <Link href={`/work/${project.slug}`} className="transition-colors hover:text-accent">
            {project.name}
          </Link>
        </h3>
        <p className={cn("leading-relaxed text-fg-soft", wide ? "text-[17px] font-light" : "text-base text-muted")}>
          {project.summary[locale]}
        </p>
        <p className="text-[13px] tracking-[0.04em] text-muted">{project.stack.join(" · ")}</p>
        <Link
          href={`/work/${project.slug}`}
          className="mt-1 inline-flex items-center gap-2 text-sm transition-colors hover:text-accent"
        >
          {readLabel}
          <ArrowIcon />
        </Link>
      </div>
    </article>
  );
}
