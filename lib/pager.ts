export const WHEEL_THRESHOLD = 25;
export const WHEEL_RESET_MS = 200;
export const COOLDOWN_MS = 220;
export const LOCK_EXTENSION_MS = 120;
export const SWIPE_THRESHOLD = 40;
export const TRANSITION_MS = 760;
export const EXIT_RATIO = 0.8;
export const ACTIVE_AT = 0.45;
export function easeInOutQuart(t: number): number {
  const clamped = Math.min(1, Math.max(0, t));
  return clamped < 0.5 ? 8 * clamped ** 4 : 1 - Math.pow(-2 * clamped + 2, 4) / 2;
}

export function clampPanel(index: number, count: number): number {
  if (count <= 0) return 0;
  return Math.min(count - 1, Math.max(0, index));
}

export type WheelState = {
  acc: number;
  lastAt: number;
  lockUntil: number;
  armed: boolean;
};

export const idleWheel = (): WheelState => ({ acc: 0, lastAt: 0, lockUntil: 0, armed: true });

export type WheelEventish = {
  deltaY: number;
  deltaX: number;
  now: number;

  animating: boolean;
};
export function wheelStep(
  state: WheelState,
  { deltaY, deltaX, now, animating }: WheelEventish,
): { state: WheelState; step: -1 | 0 | 1 } {
  const fresh = now - state.lastAt > WHEEL_RESET_MS;
  const armed = fresh || state.armed;

  if (!armed && (animating || now < state.lockUntil)) {
    return {
      state: { ...state, lastAt: now, lockUntil: Math.max(state.lockUntil, now + LOCK_EXTENSION_MS) },
      step: 0,
    };
  }

  const delta = Math.abs(deltaY) > Math.abs(deltaX) ? deltaY : deltaX;
  const acc = (fresh ? 0 : state.acc) + delta;

  if (Math.abs(acc) <= WHEEL_THRESHOLD) {
    return { state: { ...state, acc, lastAt: now, armed }, step: 0 };
  }
  return { state: { acc: 0, lastAt: now, lockUntil: state.lockUntil, armed: false }, step: acc > 0 ? 1 : -1 };
}

export const cooldownFrom = (now: number): number => now + COOLDOWN_MS;
export function swipeStep(dx: number, dy: number): -1 | 0 | 1 {
  const travel = Math.abs(dx) > Math.abs(dy) ? -dx : dy;
  if (Math.abs(travel) <= SWIPE_THRESHOLD) return 0;
  return travel > 0 ? 1 : -1;
}
export function activePanel(
  offsets: readonly number[],
  scrollLeft: number,
  viewport: number,
): number {
  let active = 0;
  offsets.forEach((offset, index) => {
    if (offset <= scrollLeft + viewport * ACTIVE_AT) active = index;
  });
  return active;
}
export function progress(scrollLeft: number, max: number): number {
  if (max <= 0) return 0;
  return Math.min(1, Math.max(0, scrollLeft / max));
}
export function clampLines(room: number, lineHeight: number): number {
  if (!Number.isFinite(room) || !Number.isFinite(lineHeight) || lineHeight <= 0) return 1;
  return Math.max(1, Math.floor(room / lineHeight));
}
