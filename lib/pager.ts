export const WHEEL_THRESHOLD = 25;
export const WHEEL_RESET_MS = 200;
export const COOLDOWN_MS = 350;
export const LOCK_EXTENSION_MS = 120;
export const SWIPE_THRESHOLD = 40;
export const TRANSITION_MS = 1100;
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
};

export const idleWheel = (): WheelState => ({ acc: 0, lastAt: 0, lockUntil: 0 });

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
