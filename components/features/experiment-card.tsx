import { readFile } from "node:fs/promises";
import path from "node:path";
import { getLocale, getTranslations } from "next-intl/server";
import { codeToHtml } from "shiki";
import { Tag } from "@/components/ui/tag";
import type { Experiment } from "@/content/experiments";
import { countLines, splitSource } from "@/lib/experiments";
import { CodePanel, type HighlightedView } from "./code-panel";

const LABEL = { html: "HTML", css: "CSS", js: "JS" } as const;

/** Server component: reads the demo from public/, highlights at build time, embeds it live. */
export async function ExperimentCard({ experiment, index }: { experiment: Experiment; index: number }) {
  const t = await getTranslations("openSource");
  const locale = await getLocale();
  const demoPath = `/experiments/${experiment.slug}/index.html`;
  const source = await readFile(path.join(process.cwd(), "public", demoPath), "utf8");

  const views: HighlightedView[] = await Promise.all(
    splitSource(source).map(async (v) => ({
      id: v.id,
      label: LABEL[v.id],
      code: v.code,
      lines: countLines(v.code),
      html: await codeToHtml(v.code, { lang: v.lang, theme: "vesper" }),
    })),
  );

  return (
    <article className="border-t-2 border-ink-700">
      <div className="grid grid-cols-1 gap-8 px-gutter py-10 lg:grid-cols-[3fr_2fr] lg:gap-8">
        <div className="flex min-w-0 flex-col gap-5">
          <header className="flex flex-col gap-3">
            <span className="font-mono text-[13px] text-acid-500">
              {String(index + 1).padStart(2, "0")} / {experiment.tags[0]}
            </span>
            <h2 className="text-[clamp(34px,4.5vw,56px)] text-paper-100">{experiment.title}</h2>
            <p className="max-w-[52ch] text-[15px] text-ink-300">{experiment.summary[locale]}</p>
            <ul className="flex flex-wrap gap-2">
              {experiment.tags.map((tag) => (
                <li key={tag}>
                  <Tag>{tag}</Tag>
                </li>
              ))}
            </ul>
          </header>

          <div className="relative min-w-0 border-2 border-paper-100 shadow-hard-acid">
            <iframe
              src={demoPath}
              title={`${experiment.title} — ${t("liveDemo")}`}
              loading="lazy"
              className="block w-full"
              style={{ height: `min(${experiment.height}px, 80vh)`, background: experiment.background }}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={demoPath}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 border-2 border-paper-100 px-4 py-2.5 font-condensed text-[13px] font-bold tracking-[0.1em] text-paper-100 uppercase transition-all duration-[120ms] hover:bg-paper-100 hover:text-ink-950"
            >
              {t("fullscreen")} ↗
            </a>
            {experiment.sourceUrl ? (
              <a
                href={experiment.sourceUrl}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 border-2 border-paper-100 px-4 py-2.5 font-condensed text-[13px] font-bold tracking-[0.1em] text-paper-100 uppercase transition-all duration-[120ms] hover:bg-paper-100 hover:text-ink-950"
              >
                GitHub ↗
              </a>
            ) : null}
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
          <CodePanel views={views} copyLabel={t("copy")} copiedLabel={t("copied")} linesLabel={t("lines")} />
          <p className="text-[13px] leading-relaxed text-ink-300">
            <span className="label mr-2 text-acid-500">{t("how")}</span>
            {experiment.technique[locale]}
          </p>
        </div>
      </div>
    </article>
  );
}
