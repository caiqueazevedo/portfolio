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
