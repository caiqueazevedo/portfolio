export function ArrowIcon({ direction = "right", size = 16 }: { direction?: "right" | "left"; size?: number }) {
  const d = direction === "right" ? "M5 12h14M13 6l6 6-6 6" : "M19 12H5M11 18l-6-6 6-6";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}
