import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";
import type { Target } from "@/lib/urls";

// "target" is also an anchor attribute, so it has to leave before the prop of the same name
// can take its place — intersecting the two would resolve to `string & Target`, which is nothing.
type Props = Omit<ComponentProps<"a">, "href" | "target"> & { to: Target };

/** Renders a `Target` as a client-side `Link` when it can, and as a plain anchor when it crosses hosts. */
export function TargetLink({ to, ...props }: Props) {
  if (to.link === null) return <a href={to.url} {...props} />;
  return <Link href={to.link} {...props} />;
}
