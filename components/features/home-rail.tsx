"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  activePanel,
  clampPanel,
  cooldownFrom,
  easeInOutQuart,
  EXIT_RATIO,
  idleWheel,
  progress,
  swipeStep,
  TRANSITION_MS,
  wheelStep,
  type WheelState,
} from "@/lib/pager";
import { onPanelRequest } from "@/lib/rail-bus";
import { useMediaQuery } from "@/lib/use-media-query";

type Labels = {
  /** Panel names, in rail order. */
  names: string[];
  scroll: string;
  prev: string;
  next: string;
};

/**
 * The home: full-screen panels on a horizontal rail, one gesture per panel.
 *
 * The rail is `overflow: hidden` and moved only by writing `scrollLeft`, so the user never
 * lands between two panels — a half-scrolled screen is the one state this layout has no design
 * for. All the deciding (is this gesture a page turn?) lives in `lib/pager`, where it can be
 * tested; what is left here is the DOM.
 *
 * Below `md` the whole mechanism steps aside: the panels stack and the document scrolls as any
 * page does. A 100vh pager on a phone, with the browser's URL bar eating the viewport, cuts
 * text off — and the design's floor is 924x540.
 */
export function HomeRail({ labels, children }: { labels: Labels; children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);
  const [panel, setPanel] = useState(0);

  const stacked = useMediaQuery("(max-width: 767px)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  // Mutable scratch the gesture machine owns: none of it belongs in a render.
  const wheel = useRef<WheelState>(idleWheel());
  const animating = useRef(false);
  const frame = useRef(0);
  const touch = useRef<{ x: number; y: number } | null>(null);

  const panels = useCallback(
    () => Array.from(track.current?.querySelectorAll<HTMLElement>("[data-panel]") ?? []),
    [],
  );

  const paint = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (fill.current) fill.current.style.width = `${progress(el.scrollLeft, max) * 100}%`;
    const offsets = panels().map((section) => section.offsetLeft);
    const index = activePanel(offsets, el.scrollLeft, el.clientWidth);
    if (!animating.current) setPanel(index);
  }, [panels]);

  const go = useCallback(
    (next: number) => {
      const el = track.current;
      const sections = panels();
      if (!el || animating.current || sections.length === 0) return;

      const to = clampPanel(next, sections.length);
      if (to === panel) return;

      if (stacked) {
        // `scrollIntoView` is missing in jsdom, and a stacked rail still has to change panels there.
        sections[to]?.scrollIntoView?.({ behavior: reduced ? "auto" : "smooth" });
        setPanel(to);
        return;
      }

      const target = sections[to]!;
      setPanel(to);

      if (reduced) {
        el.scrollLeft = target.offsetLeft;
        paint();
        return;
      }

      const direction = to > panel ? 1 : -1;
      const from = sections[panel];
      // The children, not the panels: a panel is a flat background, and what reads as motion
      // is the type and images inside it leaving and arriving on a stagger.
      //
      // `transform`, never the `translate` property: Tailwind v4 centres with `translate`
      // (`-translate-x-1/2`), so animating that one wipes the centring for the length of the
      // animation and the hero word and the cutout jump sideways before snapping back.
      for (const [index, child] of [...(from?.children ?? [])].entries()) {
        // Optional: the Web Animations API is absent in jsdom, and the panel change must not
        // depend on the decoration arriving.
        (child as HTMLElement).animate?.(
          [
            { transform: "translateX(0)", opacity: 1 },
            { transform: `translateX(${-direction * 18}vw)`, opacity: 0.2 },
          ],
          { duration: TRANSITION_MS * EXIT_RATIO, easing: "cubic-bezier(.7,0,.3,1)", delay: index * 30 },
        );
      }
      for (const [index, child] of [...target.children].entries()) {
        (child as HTMLElement).animate?.(
          [
            { transform: `translateX(${direction * 24}vw)`, opacity: 0 },
            { transform: "translateX(0)", opacity: 1 },
          ],
          {
            duration: TRANSITION_MS,
            easing: "cubic-bezier(.16,1,.3,1)",
            delay: 180 + index * 70,
            fill: "backwards",
          },
        );
      }

      const startX = el.scrollLeft;
      const endX = target.offsetLeft;
      const startedAt = performance.now();
      animating.current = true;

      const arrive = () => {
        el.scrollLeft = endX;
        animating.current = false;
        wheel.current = { ...wheel.current, lockUntil: cooldownFrom(performance.now()) };
        paint();
      };

      // A tab in the background stops serving frames, and a rail that was mid-flight when the
      // user switched away would come back locked forever. The timer is the way out.
      const guard = window.setTimeout(arrive, TRANSITION_MS + 120);

      const step = (now: number) => {
        const t = Math.min(1, (now - startedAt) / TRANSITION_MS);
        el.scrollLeft = startX + (endX - startX) * easeInOutQuart(t);
        paint();
        if (t < 1) {
          frame.current = requestAnimationFrame(step);
          return;
        }
        window.clearTimeout(guard);
        arrive();
      };
      frame.current = requestAnimationFrame(step);
    },
    [paint, panel, panels, reduced, stacked],
  );

  // The nav and the sheet menu live above the rail, so they ask through the window.
  useEffect(() => onPanelRequest(go), [go]);

  // Only on unmount: the listener effect below re-runs on every panel change, and cancelling
  // there would kill the transition it had just started.
  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  useEffect(() => {
    const el = track.current;
    if (!el || stacked) return;

    const onWheel = (event: WheelEvent) => {
      // Always: the document must not scroll under a rail that is already handling the gesture.
      event.preventDefault();
      const result = wheelStep(wheel.current, {
        deltaY: event.deltaY,
        deltaX: event.deltaX,
        now: performance.now(),
        animating: animating.current,
      });
      wheel.current = result.state;
      if (result.step !== 0) go(panel + result.step);
    };

    const onTouchStart = (event: TouchEvent) => {
      const point = event.touches[0];
      touch.current = point ? { x: point.clientX, y: point.clientY } : null;
    };
    const onTouchEnd = (event: TouchEvent) => {
      const start = touch.current;
      const point = event.changedTouches[0];
      touch.current = null;
      if (!start || !point) return;
      const step = swipeStep(point.clientX - start.x, point.clientY - start.y);
      if (step !== 0) go(panel + step);
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "PageDown") {
        event.preventDefault();
        go(panel + 1);
      }
      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        go(panel - 1);
      }
    };

    const onResize = () => {
      const section = panels()[panel];
      if (section && !animating.current) el.scrollLeft = section.offsetLeft;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("scroll", paint, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("scroll", paint);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [go, paint, panel, panels, stacked]);

  return (
    <>
      <div
        ref={track}
        data-rail={stacked ? "stacked" : "horizontal"}
        className={
          stacked
            ? "flex w-full min-w-0 flex-col"
            : "fixed inset-0 flex overflow-hidden overscroll-contain [touch-action:none]"
        }
      >
        {children}
      </div>

      {stacked ? null : (
        <div className="fixed inset-x-0 bottom-0 z-30 grid h-14 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-[clamp(16px,3vw,40px)] px-bar text-[11px] font-medium tracking-[0.16em] text-white uppercase mix-blend-difference">
          <span className="min-w-[150px]" data-testid="rail-label">
            {String(panel + 1).padStart(2, "0")} — {labels.names[panel]}
          </span>
          <div className="relative h-px bg-white/30">
            <div ref={fill} className="absolute top-[-0.5px] left-0 h-0.5 w-0 bg-white" />
          </div>
          <div className="flex items-center gap-[18px]">
            <span className="hidden sm:inline">{labels.scroll}</span>
            <button
              type="button"
              aria-label={labels.prev}
              onClick={() => go(panel - 1)}
              className="h-8 w-8 rounded-full border border-white text-white"
            >
              ←
            </button>
            <button
              type="button"
              aria-label={labels.next}
              onClick={() => go(panel + 1)}
              className="h-8 w-8 rounded-full border border-white text-white"
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
