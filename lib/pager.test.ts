import { describe, expect, it } from "vitest";
import {
  activePanel,
  clampLines,
  clampPanel,
  cooldownFrom,
  easeInOutQuart,
  idleWheel,
  LOCK_EXTENSION_MS,
  progress,
  swipeStep,
  wheelStep,
  WHEEL_RESET_MS,
} from "./pager";

const wheel = (overrides: Partial<Parameters<typeof wheelStep>[1]> = {}) => ({
  deltaY: 0,
  deltaX: 0,
  now: 1000,
  animating: false,
  ...overrides,
});

describe("easeInOutQuart", () => {
  it("runs from 0 to 1 without overshooting", () => {
    expect(easeInOutQuart(0)).toBe(0);
    expect(easeInOutQuart(1)).toBe(1);
    expect(easeInOutQuart(0.5)).toBeCloseTo(0.5);
  });

  it("never goes backwards", () => {
    let previous = -1;
    for (let t = 0; t <= 1.0001; t += 0.05) {
      const value = easeInOutQuart(t);
      expect(value).toBeGreaterThanOrEqual(previous);
      previous = value;
    }
  });

  it("clamps a time outside the run instead of flying off", () => {
    expect(easeInOutQuart(-2)).toBe(0);
    expect(easeInOutQuart(9)).toBe(1);
  });
});

describe("clampPanel", () => {
  it("keeps the index inside the rail", () => {
    expect(clampPanel(-3, 8)).toBe(0);
    expect(clampPanel(99, 8)).toBe(7);
    expect(clampPanel(3, 8)).toBe(3);
  });

  it("answers 0 for a rail with no panels", () => {
    expect(clampPanel(2, 0)).toBe(0);
  });
});

describe("wheelStep", () => {
  it("waits for enough travel before turning a page", () => {
    const first = wheelStep(idleWheel(), wheel({ deltaY: 12 }));
    expect(first.step).toBe(0);
    expect(first.state.acc).toBe(12);

    const second = wheelStep(first.state, wheel({ deltaY: 20, now: 1050 }));
    expect(second.step).toBe(1);
    expect(second.state.acc).toBe(0);
  });

  it("goes back when the travel is negative", () => {
    expect(wheelStep(idleWheel(), wheel({ deltaY: -40 })).step).toBe(-1);
  });

  it("forgets travel after a pause, so two nudges are not one page", () => {
    const first = wheelStep(idleWheel(), wheel({ deltaY: 20 }));
    const later = wheelStep(first.state, wheel({ deltaY: 20, now: 1000 + WHEEL_RESET_MS + 1 }));
    expect(later.step).toBe(0);
    expect(later.state.acc).toBe(20);
  });

  it("takes the dominant axis, so a vertical wheel still drives the rail", () => {
    expect(wheelStep(idleWheel(), wheel({ deltaY: 40, deltaX: -5 })).step).toBe(1);
    expect(wheelStep(idleWheel(), wheel({ deltaY: 5, deltaX: -40 })).step).toBe(-1);
  });

  it("swallows the tail of the flick that is already moving the rail", () => {
    // Inertia is a stream with no pause in it, and each event would otherwise turn a page.
    const fired = wheelStep(idleWheel(), wheel({ deltaY: 40 }));
    expect(fired.step).toBe(1);

    const inertia = wheelStep(fired.state, wheel({ deltaY: 38, now: 1030, animating: true }));
    expect(inertia.step).toBe(0);
    expect(inertia.state.lockUntil).toBe(1030 + LOCK_EXTENSION_MS);
  });

  it("lets a second, deliberate gesture through while the rail is still moving", () => {
    // What separates it from inertia is the pause: a hand that scrolled again stopped first.
    const fired = wheelStep(idleWheel(), wheel({ deltaY: 40 }));
    const again = wheelStep(
      fired.state,
      wheel({ deltaY: 40, now: 1000 + WHEEL_RESET_MS + 1, animating: true }),
    );
    expect(again.step).toBe(1);
  });

  it("lets a deliberate gesture through during the cooldown too", () => {
    const cooling = { ...idleWheel(), lastAt: 1000, armed: false, lockUntil: cooldownFrom(1000) };
    const during = wheelStep(cooling, wheel({ deltaY: 40, now: 1100 }));
    expect(during.step).toBe(0);

    const after = wheelStep(cooling, wheel({ deltaY: 40, now: 1000 + WHEEL_RESET_MS + 1 }));
    expect(after.step).toBe(1);
  });

  it("re-arms a gesture that crossed the threshold only once", () => {
    const fired = wheelStep(idleWheel(), wheel({ deltaY: 40 }));
    expect(fired.state.armed).toBe(false);
  });
});

describe("swipeStep", () => {
  it("ignores a touch that barely moved", () => {
    expect(swipeStep(10, 4)).toBe(0);
  });

  it("advances on a swipe left and on a swipe down", () => {
    expect(swipeStep(-120, 0)).toBe(1);
    expect(swipeStep(0, 90)).toBe(1);
  });

  it("goes back on a swipe right", () => {
    expect(swipeStep(120, 0)).toBe(-1);
  });
});

describe("activePanel", () => {
  const offsets = [0, 1000, 2000, 3000];

  it("stays on the panel that fills the screen", () => {
    expect(activePanel(offsets, 0, 1000)).toBe(0);
    expect(activePanel(offsets, 1000, 1000)).toBe(1);
  });

  it("flips once the next panel's edge crosses 45% of the viewport", () => {
    expect(activePanel(offsets, 540, 1000)).toBe(0);
    expect(activePanel(offsets, 560, 1000)).toBe(1);
  });
});

describe("progress", () => {
  it("reports a fraction, and nothing at all for a rail that cannot move", () => {
    expect(progress(250, 1000)).toBe(0.25);
    expect(progress(99, 0)).toBe(0);
    expect(progress(2000, 1000)).toBe(1);
  });
});

describe("clampLines", () => {
  it("fits whole lines in the room left over", () => {
    expect(clampLines(70, 20)).toBe(3);
  });

  it("never asks for less than one line, however tight the box", () => {
    expect(clampLines(4, 20)).toBe(1);
    expect(clampLines(Number.NaN, 20)).toBe(1);
    expect(clampLines(100, 0)).toBe(1);
  });
});
