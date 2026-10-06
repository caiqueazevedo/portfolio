import { afterEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { HomeRail } from "./home-rail";
import { goToPanel } from "@/lib/rail-bus";

const labels = {
  names: ["Início", "Cases", "Contato"],
  scroll: "Role",
  prev: "Anterior",
  next: "Próximo",
};
function media(matches: (query: string) => boolean) {
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: matches(query),
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
}
const desktop = () => media((query) => query.includes("min-width"));
const phone = () => media((query) => query.includes("max-width"));
function laidOut() {
  const result = render(
    <HomeRail labels={labels}>
      <section data-panel="">
        <p>um</p>
      </section>
      <section data-panel="">
        <p>dois</p>
      </section>
      <section data-panel="">
        <p>três</p>
      </section>
    </HomeRail>,
  );

  const sections = [...document.querySelectorAll<HTMLElement>("[data-panel]")];
  sections.forEach((section, index) => {
    Object.defineProperty(section, "offsetLeft", { value: index * 1000, configurable: true });
  });

  const rail = sections[0]!.parentElement!;
  let scrollLeft = 0;
  Object.defineProperty(rail, "scrollLeft", {
    get: () => scrollLeft,
    set: (value: number) => {
      scrollLeft = value;
    },
    configurable: true,
  });
  Object.defineProperty(rail, "clientWidth", { value: 1000, configurable: true });
  Object.defineProperty(rail, "scrollWidth", { value: 3000, configurable: true });

  return result;
}
const settle = async () => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 2600));
  });
};

afterEach(() => vi.unstubAllGlobals());

describe("the rail on a desktop", () => {
  it("names the panel it is on", () => {
    desktop();
    laidOut();
    expect(screen.getByTestId("rail-label")).toHaveTextContent("01 — Início");
  });

  it("moves with the arrow keys, and a second key re-aims it mid-flight", async () => {
    desktop();
    laidOut();

    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(screen.getByTestId("rail-label")).toHaveTextContent("02 — Cases");

    // The transition takes most of a second; a key pressed inside it used to be dropped,
    // which reads as a rail that ignores you.
    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(screen.getByTestId("rail-label")).toHaveTextContent("03 — Contato");

    await settle();

    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(screen.getByTestId("rail-label")).toHaveTextContent("02 — Cases");
  });

  it("stops at the ends instead of running off the rail", () => {
    desktop();
    laidOut();
    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(screen.getByTestId("rail-label")).toHaveTextContent("01 — Início");
  });

  it("lands exactly on the panel it was sent to", async () => {
    desktop();
    laidOut();

    act(() => goToPanel(2));

    await waitFor(
      () => expect(screen.getByTestId("rail-label")).toHaveTextContent("03 — Contato"),
      {
        timeout: 4000,
      },
    );
  });

  it("answers the nav, which lives outside it", () => {
    desktop();
    laidOut();

    act(() => goToPanel(1));
    expect(screen.getByTestId("rail-label")).toHaveTextContent("02 — Cases");
  });
});

describe("the rail on a phone", () => {
  it("stacks, and drops the footer that steers it", () => {
    phone();
    laidOut();

    expect(screen.getByText("um").closest("[data-rail]")).toHaveAttribute("data-rail", "stacked");
    expect(screen.queryByTestId("rail-label")).not.toBeInTheDocument();
  });
});
