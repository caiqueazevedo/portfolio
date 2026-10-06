import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { splitSource } from "@/lib/experiments";
import { experiments } from "./experiments";

const source = (slug: string) =>
  readFileSync(join(process.cwd(), "public", "experiments", slug, "index.html"), "utf8");

describe("experiments registry", () => {
  it("has unique slugs", () => {
    const slugs = experiments.map((e) => e.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
  it.each(experiments.map((e) => e.slug))(
    "%s splits into markup, styles and a script that parses",
    (slug) => {
      const views = splitSource(source(slug));
      expect(views.map((v) => v.id)).toEqual(["html", "css", "js"]);
      const js = views.find((v) => v.id === "js")!.code;
      expect(() => new Function(js)).not.toThrow();
    },
  );

  it.each(experiments.map((e) => e.slug))("%s supports the listing's card mode", (slug) => {
    const page = source(slug);
    expect(page).toContain("has('card')");
    expect(page).toContain("experiment:open");
  });
});
