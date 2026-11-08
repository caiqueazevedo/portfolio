import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useReducedMotion } from "./use-reduced-motion";

function media(reduce: boolean) {
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: reduce && query.includes("prefers-reduced-motion"),
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
}

// Unmount first: a hook still mounted would read matchMedia after the stub is gone.
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  document.documentElement.removeAttribute("data-motion");
});

describe("useReducedMotion", () => {
  it("follows the system when the visitor has not chosen", () => {
    media(true);
    expect(renderHook(() => useReducedMotion()).result.current).toBe(true);

    media(false);
    expect(renderHook(() => useReducedMotion()).result.current).toBe(false);
  });

  it("lets an explicit on beat a system that reduces motion", () => {
    media(true);
    document.documentElement.dataset.motion = "on";
    expect(renderHook(() => useReducedMotion()).result.current).toBe(false);
  });

  it("reduces motion on request even when the system does not ask for it", () => {
    media(false);
    document.documentElement.dataset.motion = "off";
    expect(renderHook(() => useReducedMotion()).result.current).toBe(true);
  });

  it("reacts to the attribute changing after mount", async () => {
    media(false);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);

    await act(async () => {
      document.documentElement.dataset.motion = "off";
      await Promise.resolve();
    });
    expect(result.current).toBe(true);
  });
});
