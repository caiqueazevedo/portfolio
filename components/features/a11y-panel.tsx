"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useId, useRef, useSyncExternalStore } from "react";
import {
  A11Y_KEY,
  type A11yKey,
  type A11yPrefs,
  applyPrefs,
  nextPrefs,
  parsePrefs,
} from "@/lib/a11y";
import { useMediaQuery } from "@/lib/use-media-query";

const VLIBRAS_APP = "https://vlibras.gov.br/app";
const SIZES = ["100", "115", "130", "150"] as const;

declare global {
  interface Window {
    VLibras?: { Widget: new (app: string) => unknown };
  }
}

function readStored() {
  try {
    return localStorage.getItem(A11Y_KEY);
  } catch {
    return null;
  }
}

function store(prefs: A11yPrefs) {
  try {
    if (Object.keys(prefs).length) localStorage.setItem(A11Y_KEY, JSON.stringify(prefs));
    else localStorage.removeItem(A11Y_KEY);
  } catch {}
}

const EMPTY: A11yPrefs = {};
const listeners = new Set<() => void>();
let snapshot: A11yPrefs | null = null;

function subscribe(notify: () => void) {
  listeners.add(notify);
  return () => {
    listeners.delete(notify);
    if (listeners.size === 0) snapshot = null;
  };
}

function getSnapshot() {
  snapshot ??= parsePrefs(readStored());
  return snapshot;
}

function publish(prefs: A11yPrefs) {
  snapshot = prefs;
  for (const notify of listeners) notify();
}

function createReadingGuide() {
  const bar = document.createElement("div");
  bar.className = "reading-guide";
  bar.setAttribute("aria-hidden", "true");
  const moveTo = (y: number) => bar.style.setProperty("--guide-y", `${y}px`);
  const onPointer = (event: PointerEvent) => moveTo(event.clientY);
  const onFocus = (event: FocusEvent) => {
    const rect = (event.target as Element | null)?.getBoundingClientRect?.();
    if (rect) moveTo(rect.top + rect.height / 2);
  };

  return (on: boolean) => {
    if (on === bar.isConnected) return;
    if (on) {
      moveTo(window.innerHeight / 3);
      document.body.append(bar);
      document.addEventListener("pointermove", onPointer, { passive: true });
      document.addEventListener("focusin", onFocus);
    } else {
      bar.remove();
      document.removeEventListener("pointermove", onPointer);
      document.removeEventListener("focusin", onFocus);
    }
  };
}

function createVlibras() {
  let enabled = false;
  let script: HTMLScriptElement | null = null;
  let before = new Set<Element>();
  let parked: [ParentNode, Element][] = [];
  const nodes = () => [...document.head.children, ...document.body.children];
  const ours = (node: Element) => node.matches?.(".reading-guide");
  const park = () => {
    parked = nodes()
      .filter((node) => !before.has(node) && !ours(node))
      .map((node) => [node.parentNode as ParentNode, node] as [ParentNode, Element]);
    for (const [, node] of parked) node.remove();
  };
  const start = () => {
    if (!script) return;
    script.onload = null;
    script.onerror = null;
    if (window.VLibras) new window.VLibras.Widget(VLIBRAS_APP);
    if (!enabled) park();
  };

  return (on: boolean) => {
    if (on === enabled) return;
    enabled = on;
    if (script?.onload) return;
    if (!on) return park();
    before = new Set(nodes());
    if (script) {
      for (const [parent, node] of parked) parent.appendChild(node);
      parked = [];
      return;
    }
    const box = document.createElement("div");
    box.setAttribute("vw", "");
    box.className = "enabled";
    box.innerHTML = VLIBRAS_MARKUP;
    document.body.append(box);
    script = document.createElement("script");
    script.src = `${VLIBRAS_APP}/vlibras-plugin.js`;
    script.onload = start;
    script.onerror = () => {
      box.remove();
      script?.remove();
      script = null;
    };
    document.body.append(script);
  };
}

const VLIBRAS_MARKUP =
  '<div vw-access-button class="active"></div><div vw-plugin-wrapper><div class="vw-plugin-top-wrapper"></div></div>';

type Toggle = {
  key: Exclude<A11yKey, "text">;
  value: string;
  hint?: "readableHint" | "motionHint" | "guideHint" | "librasHint";
};

const TOGGLES: Toggle[] = [
  { key: "contrast", value: "high" },
  { key: "readable", value: "on", hint: "readableHint" },
  { key: "links", value: "underline" },
  { key: "cursor", value: "big" },
  { key: "motion", value: "off", hint: "motionHint" },
  { key: "guide", value: "on", hint: "guideHint" },
];

const LIBRAS: Toggle = { key: "libras", value: "on", hint: "librasHint" };

export function A11yPanel() {
  const t = useTranslations("a11y");
  const locale = useLocale();
  const systemReduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const prefs = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const sideRef = useRef<{ guide: (on: boolean) => void; libras: (on: boolean) => void } | null>(
    null,
  );
  const id = useId();
  const isPt = locale === "pt";

  useEffect(() => {
    sideRef.current ??= { guide: createReadingGuide(), libras: createVlibras() };
    sideRef.current.guide(prefs.guide === "on");
    sideRef.current.libras(prefs.libras === "on" && isPt);
  }, [prefs, isPt]);

  useEffect(
    () => () => {
      sideRef.current?.guide(false);
      sideRef.current?.libras(false);
    },
    [],
  );

  function commit(next: A11yPrefs) {
    publish(next);
    applyPrefs(document.documentElement, next);
    store(next);
  }

  const toggles = isPt ? [...TOGGLES, LIBRAS] : TOGGLES;
  const checkedOf = (toggle: Toggle) =>
    toggle.key === "motion"
      ? prefs.motion === "off" || (!prefs.motion && systemReduce)
      : prefs[toggle.key] === toggle.value;

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-label={t("open")}
        onClick={() => dialogRef.current?.showModal()}
        className="text-paper hover:text-paper/70 flex items-center gap-1.5"
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="4.5" r="2" fill="currentColor" stroke="none" />
          <path d="M5 8.5l7 1.5 7-1.5M12 10v5l-3.5 6.5M12 15l3.5 6.5" />
        </svg>
        <span className="hidden sm:inline">{t("open")}</span>
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={`${id}-title`}
        className="bg-paper text-ink border-ink m-auto max-h-[min(88svh,760px)] w-[min(92vw,430px)] border p-0 backdrop:bg-black/50"
      >
        <form method="dialog" className="flex flex-col gap-7 p-7 normal-case">
          <div className="flex items-start justify-between gap-4">
            <h2
              id={`${id}-title`}
              className="text-[1.125rem] font-medium tracking-[0.08em] uppercase"
            >
              {t("title")}
            </h2>
            <button
              type="submit"
              aria-label={t("close")}
              className="text-muted hover:text-ink -mt-1 -mr-1 h-9 w-9 text-[1rem] leading-none"
            >
              <span aria-hidden="true">✕</span>
            </button>
          </div>

          <p className="text-muted text-[0.8125rem] leading-relaxed">{t("intro")}</p>

          <fieldset className="flex flex-col">
            <legend className="label text-muted mb-3">{t("textSize")}</legend>
            <div className="grid grid-cols-4 gap-2">
              {SIZES.map((size) => (
                <label
                  key={size}
                  className="border-ink/20 label has-checked:bg-ink has-checked:text-paper has-checked:border-ink has-focus-visible:outline-ink flex h-10 cursor-pointer items-center justify-center border has-focus-visible:outline-2 has-focus-visible:outline-offset-2"
                >
                  <input
                    type="radio"
                    name="text"
                    value={size}
                    checked={(prefs.text || "100") === size}
                    onChange={(event) =>
                      commit(nextPrefs(prefs, "text", event.target.value, true, systemReduce))
                    }
                    className="sr-only"
                  />
                  {size}%
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="flex flex-col gap-4">
            <legend className="sr-only">{t("options")}</legend>
            {toggles.map((toggle) => (
              <div key={toggle.key} className="flex flex-col gap-1.5">
                <label className="flex cursor-pointer items-start gap-3 text-[0.875rem] leading-snug">
                  <input
                    type="checkbox"
                    name={toggle.key}
                    value={toggle.value}
                    checked={checkedOf(toggle)}
                    aria-describedby={toggle.hint ? `${id}-${toggle.key}` : undefined}
                    onChange={(event) =>
                      commit(
                        nextPrefs(
                          prefs,
                          toggle.key,
                          event.target.value,
                          event.target.checked,
                          systemReduce,
                        ),
                      )
                    }
                    className="border-ink/40 checked:bg-ink checked:border-ink mt-0.5 h-4 w-4 flex-none appearance-none border"
                  />
                  {t(toggle.key)}
                </label>
                {toggle.hint ? (
                  <p id={`${id}-${toggle.key}`} className="text-muted pl-7 text-[0.75rem]">
                    {t(toggle.hint)}
                  </p>
                ) : null}
              </div>
            ))}
          </fieldset>

          <div className="border-ink/14 flex items-center justify-between gap-4 border-t pt-5">
            <button
              type="button"
              onClick={() => commit({})}
              className="label text-muted hover:text-ink"
            >
              {t("reset")}
            </button>
            <button type="submit" className="label bg-ink text-paper px-5 py-3">
              {t("close")}
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
