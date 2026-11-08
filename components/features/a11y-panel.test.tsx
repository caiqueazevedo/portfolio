import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, describe, expect, it, vi } from "vitest";
import en from "@/messages/en.json";
import pt from "@/messages/pt.json";
import { A11yPanel } from "./a11y-panel";

function media(reduce = false) {
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: reduce && query.includes("prefers-reduced-motion"),
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
}

function setup(locale: "pt" | "en" = "pt", reduce = false) {
  media(reduce);
  render(
    <NextIntlClientProvider locale={locale} messages={locale === "pt" ? pt : en}>
      <A11yPanel />
    </NextIntlClientProvider>,
  );
  return userEvent.setup();
}

const root = () => document.documentElement;

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  localStorage.clear();
  for (const key of ["text", "contrast", "readable", "links", "cursor", "motion", "guide"]) {
    root().removeAttribute(`data-${key}`);
  }
  document.querySelector(".reading-guide")?.remove();
});

describe("A11yPanel", () => {
  it("opens the dialog from the trigger", async () => {
    const user = setup();
    expect(screen.getByRole("dialog", { hidden: true })).not.toBeVisible();

    await user.click(screen.getByRole("button", { name: pt.a11y.open }));
    expect(screen.getByRole("dialog")).toBeVisible();
  });

  it("writes a toggled option to the document and to storage", async () => {
    const user = setup();
    await user.click(screen.getByRole("button", { name: pt.a11y.open }));
    await user.click(screen.getByRole("checkbox", { name: pt.a11y.contrast }));

    expect(root().dataset.contrast).toBe("high");
    expect(JSON.parse(localStorage.getItem("portfolio-a11y") ?? "{}")).toEqual({
      contrast: "high",
    });
  });

  it("scales the text from the size choices", async () => {
    const user = setup();
    await user.click(screen.getByRole("button", { name: pt.a11y.open }));
    await user.click(screen.getByRole("radio", { name: "150%" }));

    expect(root().dataset.text).toBe("150");
  });

  it("clears every preference on reset", async () => {
    const user = setup();
    await user.click(screen.getByRole("button", { name: pt.a11y.open }));
    await user.click(screen.getByRole("checkbox", { name: pt.a11y.contrast }));
    await user.click(screen.getByRole("button", { name: pt.a11y.reset }));

    expect(root().dataset.contrast).toBeUndefined();
    expect(localStorage.getItem("portfolio-a11y")).toBeNull();
  });

  it("attaches and detaches the reading guide", async () => {
    const user = setup();
    await user.click(screen.getByRole("button", { name: pt.a11y.open }));

    await user.click(screen.getByRole("checkbox", { name: pt.a11y.guide }));
    expect(document.querySelector(".reading-guide")).not.toBeNull();

    await user.click(screen.getByRole("checkbox", { name: pt.a11y.guide }));
    expect(document.querySelector(".reading-guide")).toBeNull();
  });

  it("checks pause animations when the system already reduces motion", async () => {
    const user = setup("pt", true);
    await user.click(screen.getByRole("button", { name: pt.a11y.open }));

    const motion = screen.getByRole("checkbox", { name: pt.a11y.motion });
    expect(motion).toBeChecked();

    await user.click(motion);
    expect(root().dataset.motion).toBe("on");
  });

  it("offers Libras in Portuguese only", async () => {
    const user = setup("pt");
    await user.click(screen.getByRole("button", { name: pt.a11y.open }));
    expect(screen.getByRole("checkbox", { name: pt.a11y.libras })).toBeInTheDocument();
  });

  it("leaves Libras out of the English panel", async () => {
    const user = setup("en");
    await user.click(screen.getByRole("button", { name: en.a11y.open }));
    expect(screen.getAllByRole("checkbox")).toHaveLength(6);
  });
});
