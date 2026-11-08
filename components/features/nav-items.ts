import type { Target } from "@/lib/urls";

export type NavItem = {
  key: string;
  target: Target;
  label: string;

  panel: number;
};
