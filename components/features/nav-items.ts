/**
 * A nav entry is a route *and* a panel: on the home it scrolls the rail, anywhere else it
 * navigates. Keeping both on one object is what stops the two lists from drifting apart.
 */
export type NavItem = {
  href: "/" | "/work" | "/open-source" | "/about" | "/contact";
  label: string;
  /** Index of the matching panel on the home rail. */
  panel: number;
};
