/**
 * How anything outside the rail asks it to move.
 *
 * The nav lives above the rail (it has to, for `mix-blend-mode` to work) and the sheet menu
 * lives in a portal-ish corner of the tree, so neither can hold the rail's state. A window
 * event is the smallest thing that crosses that gap without a context provider wrapping the
 * whole document for one number.
 */
export const RAIL_GO = "rail:go";

export function goToPanel(panel: number): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<number>(RAIL_GO, { detail: panel }));
}

export function onPanelRequest(handler: (panel: number) => void): () => void {
  const listener = (event: Event) => handler((event as CustomEvent<number>).detail);
  window.addEventListener(RAIL_GO, listener);
  return () => window.removeEventListener(RAIL_GO, listener);
}
