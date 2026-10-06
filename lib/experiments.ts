export type SourceView = {
  id: "html" | "css" | "js";
  lang: "html" | "css" | "javascript";
  code: string;
};

const STYLE = /<style[^>]*>([\s\S]*?)<\/style>/gi;
const SCRIPT = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;

function dedent(block: string): string {
  const lines = block.replace(/^\n+|\s+$/g, "").split("\n");
  const indent = Math.min(...lines.filter((l) => l.trim()).map((l) => l.match(/^ */)![0].length));
  return lines.map((l) => l.slice(indent)).join("\n");
}

export function splitSource(source: string): SourceView[] {
  const css = [...source.matchAll(STYLE)].map((m) => dedent(m[1])).join("\n\n");
  const js = [...source.matchAll(SCRIPT)].map((m) => dedent(m[1])).join("\n\n");
  const html = source
    .replace(STYLE, "<style>/* see CSS tab */</style>")
    .replace(SCRIPT, "<script>/* see JS tab */</script>")
    .trim();
  const views: SourceView[] = [{ id: "html", lang: "html", code: html }];
  if (css) views.push({ id: "css", lang: "css", code: css });
  if (js) views.push({ id: "js", lang: "javascript", code: js });
  return views;
}

export function countLines(source: string): number {
  return source.split("\n").length;
}
