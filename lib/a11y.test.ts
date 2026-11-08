import { afterEach, describe, expect, it } from "vitest";
import { A11Y_BOOT, applyPrefs, nextPrefs, parsePrefs } from "./a11y";

afterEach(() => {
  document.documentElement.removeAttribute("data-contrast");
  document.documentElement.removeAttribute("data-text");
  document.documentElement.removeAttribute("data-motion");
});

describe("parsePrefs", () => {
  it("keeps only known keys with values from the allowed list", () => {
    const raw = JSON.stringify({ text: "130", contrast: "high", theme: "dark", links: "dotted" });
    expect(parsePrefs(raw)).toEqual({ text: "130", contrast: "high" });
  });

  it("returns nothing for broken or non-object payloads", () => {
    expect(parsePrefs(null)).toEqual({});
    expect(parsePrefs("{ nope")).toEqual({});
    expect(parsePrefs("[1,2]")).toEqual({});
    expect(parsePrefs('"text"')).toEqual({});
  });

  it("drops values of the wrong type", () => {
    expect(parsePrefs(JSON.stringify({ text: 130, contrast: true }))).toEqual({});
  });
});

describe("nextPrefs", () => {
  it("stores the value when checked and clears it when unchecked", () => {
    expect(nextPrefs({}, "contrast", "high", true, false)).toEqual({ contrast: "high" });
    expect(nextPrefs({ contrast: "high" }, "contrast", "high", false, false)).toEqual({});
  });

  it("stores motion off when the system does not already reduce motion", () => {
    expect(nextPrefs({}, "motion", "off", true, false)).toEqual({ motion: "off" });
  });

  it("needs no attribute to pause animations the system already pauses", () => {
    expect(nextPrefs({}, "motion", "off", true, true)).toEqual({});
  });

  it("stores an explicit motion on so the visitor can beat the system setting", () => {
    expect(nextPrefs({}, "motion", "off", false, true)).toEqual({ motion: "on" });
  });

  it("clears motion when unchecked and the system is not reducing motion", () => {
    expect(nextPrefs({ motion: "off" }, "motion", "off", false, false)).toEqual({});
  });

  it("leaves the other preferences alone", () => {
    expect(nextPrefs({ text: "150" }, "cursor", "big", true, false)).toEqual({
      text: "150",
      cursor: "big",
    });
  });
});

describe("applyPrefs", () => {
  it("writes the preferences it has and removes the ones it does not", () => {
    const root = document.documentElement;
    applyPrefs(root, { text: "150", contrast: "high" });
    expect(root.dataset.text).toBe("150");
    expect(root.dataset.contrast).toBe("high");

    applyPrefs(root, { text: "115" });
    expect(root.dataset.text).toBe("115");
    expect(root.dataset.contrast).toBeUndefined();
  });
});

describe("A11Y_BOOT", () => {
  it("applies stored preferences to the document element", () => {
    localStorage.setItem("portfolio-a11y", JSON.stringify({ contrast: "high", text: "130" }));
    new Function(A11Y_BOOT)();
    expect(document.documentElement.dataset.contrast).toBe("high");
    expect(document.documentElement.dataset.text).toBe("130");
    localStorage.clear();
  });

  it("survives a corrupted payload", () => {
    localStorage.setItem("portfolio-a11y", "{ broken");
    expect(() => new Function(A11Y_BOOT)()).not.toThrow();
    expect(document.documentElement.dataset.contrast).toBeUndefined();
    localStorage.clear();
  });
});
