import { cn } from "@/lib/cn";
import { breadcrumbJsonLd } from "@/lib/seo";

export type Crumb = { label: string; href?: string };

type Props = {
  items: Crumb[];
  label: string;
  className?: string;
};

export function Breadcrumb({ items, label, className }: Props) {
  const jsonLd = breadcrumbJsonLd(items.map((item) => ({ label: item.label, url: item.href })));

  return (
    <>
      <nav aria-label={label} className={cn("flex min-w-0", className)}>
        <ol className="flex min-w-0 flex-wrap items-center gap-x-2.5 gap-y-1">
          {items.map((item, index) => {
            const last = index === items.length - 1;
            return (
              <li
                key={`${item.label}-${index}`}
                className={cn("flex items-center gap-x-2.5", last ? "min-w-0" : "shrink-0")}
              >
                {index > 0 ? (
                  <span aria-hidden="true" className="text-faint">
                    /
                  </span>
                ) : null}
                {item.href && !last ? (
                  <a href={item.href} className="label hover:text-muted whitespace-nowrap">
                    {item.label}
                  </a>
                ) : (
                  <span
                    aria-current={last ? "page" : undefined}
                    className="label text-muted min-w-0 truncate"
                  >
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
