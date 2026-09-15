"use client";

import { useSyncExternalStore } from "react";
import type { HeroVideo as HeroVideoSources } from "@/content/media";

type Props = { sources: HeroVideoSources; label: string };

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

const readsReduced = () => window.matchMedia(QUERY).matches;
// Server snapshot: assume reduced so the HTML never references the video bytes.
const serverReduced = () => true;

/**
 * Background loop. Viewers who asked for reduced motion get the poster only,
 * and the video bytes are never requested for them.
 */
export function HeroVideo({ sources, label }: Props) {
  const reduced = useSyncExternalStore(subscribe, readsReduced, serverReduced);

  if (reduced) {
    // eslint-disable-next-line @next/next/no-img-element -- decorative poster, sized by CSS
    return <img src={sources.poster} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />;
  }

  return (
    <video
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={sources.poster}
      disablePictureInPicture
      aria-label={label}
    >
      <source src={sources.webm} type="video/webm" />
      <source src={sources.mp4} type="video/mp4" />
    </video>
  );
}
