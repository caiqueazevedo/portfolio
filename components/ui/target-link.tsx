import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";
import type { Target } from "@/lib/urls";

type Props = Omit<ComponentProps<"a">, "href" | "target"> & { to: Target };

export function TargetLink({ to, ...props }: Props) {
  if (to.link === null) return <a href={to.url} {...props} />;
  return <Link href={to.link} {...props} />;
}
