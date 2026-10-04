import { describe, expect, it } from "vitest";
import { caseViews, indexRows, padNumber, shortOf, wantsIndex } from "./case-view";

const labels = { production: "Em produção", active: "Em desenvolvimento", paused: "Pausado" };

describe("shortOf", () => {
  it("drops the project's own name from its headline", () => {
    expect(shortOf("ZenID: um login que é seu, não alugado.")).toBe("um login que é seu, não alugado.");
  });

  it("keeps a headline that has no colon in it", () => {
    expect(shortOf("Um login que é seu.")).toBe("Um login que é seu.");
  });
});

describe("padNumber", () => {
  it("numbers by position, from 01", () => {
    expect(padNumber(0)).toBe("01");
    expect(padNumber(11)).toBe("12");
  });
});

describe("caseViews", () => {
  it("resolves one locale into flat strings a client component can take", () => {
    const [first] = caseViews("pt", labels);
    expect(first).toMatchObject({ number: "01", href: `/work/${first!.slug}` });
    expect(first!.statusLabel).toBe(labels[first!.status]);
    expect(first!.stackLine).toContain(" · ");
  });

  it("gives every case a number of its own", () => {
    const numbers = caseViews("en", labels).map((view) => view.number);
    expect(new Set(numbers).size).toBe(numbers.length);
  });
});

describe("the layout switch", () => {
  it("keeps cards up to eight and turns the index on past that", () => {
    expect(wantsIndex(6)).toBe(false);
    expect(wantsIndex(8)).toBe(false);
    expect(wantsIndex(9)).toBe(true);
  });

  it("fills three columns top to bottom", () => {
    expect(indexRows(27)).toBe(9);
    expect(indexRows(10)).toBe(4);
    expect(indexRows(0)).toBe(1);
  });
});
