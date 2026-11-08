"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(notify: () => void) {
  const list = window.matchMedia(QUERY);
  list.addEventListener("change", notify);
  const observer = new MutationObserver(notify);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-motion"],
  });
  return () => {
    list.removeEventListener("change", notify);
    observer.disconnect();
  };
}

// An explicit "on" from the accessibility panel has to beat the system preference, not just match it.
function read() {
  const motion = document.documentElement.dataset.motion;
  if (motion === "off") return true;
  if (motion === "on") return false;
  return window.matchMedia(QUERY).matches;
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, read, () => false);
}
