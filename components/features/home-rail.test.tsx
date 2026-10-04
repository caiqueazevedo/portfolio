import { afterEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { HomeRail } from "./home-rail";
import { goToPanel } from "@/lib/rail-bus";

const labels = { names: ["Início", "Cases", "Contato"], scroll: "Role", prev: "Anterior", next: "Próximo" };

/** jsdom has no `matchMedia`; every query answers whatever the test says it should. */
function media(matches: (query: string) => boolean) {
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: matches(query),
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
}

/** Only width queries match: a desktop whose owner has not asked for reduced motion. */
const desktop = () => media((query) => query.includes("min-width"));
const phone = () => media((query) => query.includes("max-width"));

/**
 * jsdom lays nothing out: every `offsetLeft` is 0 and `scrollLeft` never keeps what it is
 * given, so the rail would believe the last panel was always the one on screen. This gives it
 * the geometry of a 1000px window, which is what the arithmetic is really being tested against.
 */
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

/** The transition is 1100ms; under a loaded test runner the frames arrive later than that. */
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

  it("moves with the arrow keys, and is deaf while it travels", async () => {
    desktop();
    laidOut();

    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(screen.getByTestId("rail-label")).toHaveTextContent("02 — Cases");

    // Mid-flight it ignores input on purpose: trackpad inertia would skip three panels.
    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(screen.getByTestId("rail-label")).toHaveTextContent("02 — Cases");

    await settle();

    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(screen.getByTestId("rail-label")).toHaveTextContent("01 — Início");
  });

  it("stops at the ends instead of running off the rail", () => {
    desktop();
    laidOut();
    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(screen.getByTestId("rail-label")).toHaveTextContent("01 — Início");
  });

  it("lands exactly on the panel it was sent to", async () => {
    // Not "near enough": half a panel on screen is a state this layout has no design for.
    desktop();
    laidOut();

    act(() => goToPanel(2));

    await waitFor(() => expect(screen.getByTestId("rail-label")).toHaveTextContent("03 — Contato"), {
      timeout: 4000,
    });
  });

  it("answers the nav, which lives outside it", () => {
    // The nav is `mix-blend-mode: difference` over the rail, so it cannot hold the rail's
    // state; it asks through the window instead.
    desktop();
    laidOut();

    act(() => goToPanel(1));
    expect(screen.getByTestId("rail-label")).toHaveTextContent("02 — Cases");
  });
});

describe("the rail on a phone", () => {
  it("stacks, and drops the footer that steers it", () => {
    // A 100vh pager with a browser URL bar eating the viewport cuts panels in half.
    phone();
    laidOut();

    expect(screen.getByText("um").closest("[data-rail]")).toHaveAttribute("data-rail", "stacked");
    expect(screen.queryByTestId("rail-label")).not.toBeInTheDocument();
  });
});
