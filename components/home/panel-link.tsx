"use client";

import type { ReactNode } from "react";
import { buttonClass } from "@/components/ui/button";
import { goToPanel } from "@/lib/rail-bus";

/**
 * A button that moves the rail instead of navigating.
 *
 * Inside the home, "Ver cases" means panel 03, not the `/work` route: following the link would
 * throw away the rail the visitor is standing on. The routes still exist for anyone arriving
 * from outside.
 */
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
    <button type="button" onClick={() => goToPanel(panel)} className={buttonClass(variant, className)}>
      {children}
    </button>
  );
}
