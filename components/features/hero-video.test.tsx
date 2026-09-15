import { render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { HeroVideo } from "./hero-video";

const sources = { webm: "/media/hero.webm", mp4: "/media/hero.mp4", poster: "/media/hero-poster.jpg" };

function mockReducedMotion(matches: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockReturnValue({
      matches,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }),
  );
}

afterEach(() => vi.unstubAllGlobals());

describe("HeroVideo", () => {
  it("renders only the poster when the viewer prefers reduced motion", () => {
    mockReducedMotion(true);
    const { container } = render(<HeroVideo sources={sources} label="bg" />);
    expect(container.querySelector("video")).toBeNull();
    expect(container.querySelector("img")).toHaveAttribute("src", sources.poster);
  });

  it("renders the looping video otherwise", () => {
    mockReducedMotion(false);
    const { container } = render(<HeroVideo sources={sources} label="bg" />);
    const video = container.querySelector("video");
    expect(video).not.toBeNull();
    expect(video).toHaveAttribute("poster", sources.poster);
    expect(container.querySelector('source[type="video/webm"]')).toHaveAttribute("src", sources.webm);
  });
});
