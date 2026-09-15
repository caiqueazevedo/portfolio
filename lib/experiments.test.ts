import { describe, expect, it } from "vitest";
import { countLines, splitSource } from "./experiments";

const page = `<!doctype html>
<title>Demo</title>
<style>
  body { margin: 0; }
  .a { color: red; }
</style>
<div class="a">hi</div>
<script src="https://example.com/lib.js"></script>
<script>
  (function () {
    console.log("hi");
  })();
</script>`;

describe("splitSource", () => {
  it("separates markup, styles and inline script, keeping external scripts in the markup", () => {
    const views = splitSource(page);
    expect(views.map((v) => v.id)).toEqual(["html", "css", "js"]);
    const [html, css, js] = views;
    expect(html.code).toContain('<div class="a">hi</div>');
    expect(html.code).toContain('<script src="https://example.com/lib.js"></script>');
    expect(html.code).not.toContain("console.log");
    expect(css.code).toBe("body { margin: 0; }\n.a { color: red; }");
    expect(js.code).toBe('(function () {\n  console.log("hi");\n})();');
  });

  it("omits empty views", () => {
    expect(splitSource("<p>only markup</p>").map((v) => v.id)).toEqual(["html"]);
  });
});

describe("countLines", () => {
  it("counts newline-separated lines", () => {
    expect(countLines("a\nb\nc")).toBe(3);
  });
});
