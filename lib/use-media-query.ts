"use client";

import { useSyncExternalStore } from "react";

/**
 * A media query as state, with a server snapshot that says "no".
 *
 * `useSyncExternalStore` rather than `useEffect` + `useState` so the first client render already
 * knows the answer: a rail that mounts horizontal and flips to stacked one frame later is a
 * visible jump on every phone.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (notify) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", notify);
      return () => list.removeEventListener("change", notify);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
