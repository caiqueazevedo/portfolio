/**
 * The horizontal pager's arithmetic, apart from the DOM.
 *
 * The home does not scroll freely: every gesture is a decision to move one panel or stay put.
 * That decision is the part worth testing — once it is made, moving the rail is three lines of
 * `scrollLeft`. Numbers come from the design prototype, not from taste.
 */

/** Accumulated wheel travel, in pixels, that commits to a panel change. */
export const WHEEL_THRESHOLD = 25;

/**
 * Quiet time after which the accumulator forgets what it had.
 *
 * A trackpad sends a stream of tiny deltas; a mouse sends a few big ones. Without a reset, two
 * unrelated nudges a second apart would add up to a page turn nobody asked for.
 */
export const WHEEL_RESET_MS = 200;

/**
 * How long the rail ignores the wheel after arriving.
 *
 * Trackpad inertia keeps firing events long after the finger left. Without the cooldown — and
 * without extending it while the events keep coming — one flick skips three panels.
 */
export const COOLDOWN_MS = 350;
export const LOCK_EXTENSION_MS = 120;

/** How far a touch has to travel before it counts as a swipe. */
export const SWIPE_THRESHOLD = 40;

/** The panel transition, and the share of it the outgoing panel's children get. */
export const TRANSITION_MS = 1100;
export const EXIT_RATIO = 0.8;

/**
 * Fraction of the viewport a panel's left edge must cross to count as the current one.
 *
 * Measured from the rail's own scroll position, so the footer label and the progress bar agree
 * with what fills the screen rather than with where the animation started.
 */
export const ACTIVE_AT = 0.45;

/** easeInOutQuart — slow start, fast middle, long settle. */
export function easeInOutQuart(t: number): number {
  const clamped = Math.min(1, Math.max(0, t));
  return clamped < 0.5 ? 8 * clamped ** 4 : 1 - Math.pow(-2 * clamped + 2, 4) / 2;
}

export function clampPanel(index: number, count: number): number {
  if (count <= 0) return 0;
  return Math.min(count - 1, Math.max(0, index));
}

export type WheelState = {
  /** Travel since the last reset or commit. */
  acc: number;
  /** When the last wheel event arrived. */
  lastAt: number;
  /** Until when gestures are ignored. */
  lockUntil: number;
};

export const idleWheel = (): WheelState => ({ acc: 0, lastAt: 0, lockUntil: 0 });

export type WheelEventish = {
  deltaY: number;
  deltaX: number;
  now: number;
  /** True while the rail is mid-flight. */
  animating: boolean;
};

/**
 * What one wheel event does: a direction to travel, or nothing.
 *
 * The dominant axis wins, so a vertical wheel drives horizontal travel (what the design asks
 * for) while a trackpad's sideways swipe still works.
 */
export function wheelStep(
  state: WheelState,
  { deltaY, deltaX, now, animating }: WheelEventish,
): { state: WheelState; step: -1 | 0 | 1 } {
  if (animating || now < state.lockUntil) {
    return {
      state: { ...state, lockUntil: Math.max(state.lockUntil, now + LOCK_EXTENSION_MS) },
      step: 0,
    };
  }

  const delta = Math.abs(deltaY) > Math.abs(deltaX) ? deltaY : deltaX;
  const carried = now - state.lastAt > WHEEL_RESET_MS ? 0 : state.acc;
  const acc = carried + delta;

  if (Math.abs(acc) <= WHEEL_THRESHOLD) {
    return { state: { ...state, acc, lastAt: now }, step: 0 };
  }
  return { state: { ...state, acc: 0, lastAt: now }, step: acc > 0 ? 1 : -1 };
}

/** Where the lock sits once a transition finishes. */
export const cooldownFrom = (now: number): number => now + COOLDOWN_MS;

/**
 * A finished touch, as a direction.
 *
 * Swiping left (negative dx) moves forward, which is how a page of film reads; a downward
 * swipe does too, because on a phone the panels are stacked and the thumb expects it.
 */
export function swipeStep(dx: number, dy: number): -1 | 0 | 1 {
  const travel = Math.abs(dx) > Math.abs(dy) ? -dx : dy;
  if (Math.abs(travel) <= SWIPE_THRESHOLD) return 0;
  return travel > 0 ? 1 : -1;
}

/** The last panel whose left edge has crossed `ACTIVE_AT` of the viewport. */
export function activePanel(offsets: readonly number[], scrollLeft: number, viewport: number): number {
  let active = 0;
  offsets.forEach((offset, index) => {
    if (offset <= scrollLeft + viewport * ACTIVE_AT) active = index;
  });
  return active;
}

/** How far along the rail is, 0 to 1. */
export function progress(scrollLeft: number, max: number): number {
  if (max <= 0) return 0;
  return Math.min(1, Math.max(0, scrollLeft / max));
}

/**
 * How many lines of a paragraph fit in the room left over.
 *
 * The case index's description has to end on a whole line: half a line of text under a hard
 * clip reads as a rendering bug, not as an ellipsis.
 */
export function clampLines(room: number, lineHeight: number): number {
  if (!Number.isFinite(room) || !Number.isFinite(lineHeight) || lineHeight <= 0) return 1;
  return Math.max(1, Math.floor(room / lineHeight));
}
