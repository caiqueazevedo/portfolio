"use client";

import type { ReactNode } from "react";
import { buttonClass } from "@/components/ui/button";
import { goToPanel } from "@/lib/rail-bus";
export function PanelLink({
  panel,
  variant = "rule",
  className,
  children,
}: {
  panel: number;
  variant?: "solid" | "rule";
  className?: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => goToPanel(panel)}
      className={buttonClass(variant, className)}
    >
      {children}
    </button>
  );
}
