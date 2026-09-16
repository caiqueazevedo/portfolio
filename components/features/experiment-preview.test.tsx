import { act, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ExperimentPreview } from "./experiment-preview";

const push = vi.fn();
vi.mock("@/i18n/navigation", () => ({ useRouter: () => ({ push }) }));

// jsdom has no IntersectionObserver: report every target as visible right away.
class IO {
  constructor(private cb: IntersectionObserverCallback) {}
  observe() {
    this.cb([{ isIntersecting: true } as IntersectionObserverEntry], this as unknown as IntersectionObserver);
  }
  disconnect() {}
}

describe("ExperimentPreview", () => {
  beforeEach(() => {
    push.mockClear();
    vi.stubGlobal("IntersectionObserver", IO);
  });

  it("mounts the demo in card mode and navigates when the frame asks to open", () => {
    render(<ExperimentPreview slug="pixel-sort" title="Pixel Sort" href="/open-source/pixel-sort" hint="hover" />);
    const frame = screen.getByTitle("Pixel Sort") as HTMLIFrameElement;
    expect(frame).toHaveAttribute("src", "/experiments/pixel-sort/index.html?card=1");

    act(() => {
      window.dispatchEvent(
        new MessageEvent("message", { data: { type: "experiment:open" }, origin: window.location.origin, source: frame.contentWindow }),
      );
    });
    expect(push).toHaveBeenCalledWith("/open-source/pixel-sort");
  });

  it("ignores messages from other windows", () => {
    render(<ExperimentPreview slug="pixel-sort" title="Pixel Sort" href="/open-source/pixel-sort" hint="hover" />);
    act(() => {
      window.dispatchEvent(new MessageEvent("message", { data: { type: "experiment:open" }, origin: window.location.origin, source: window }));
    });
    expect(push).not.toHaveBeenCalled();
  });
});
