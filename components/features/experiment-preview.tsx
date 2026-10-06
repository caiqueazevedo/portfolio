"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

type Props = { slug: string; title: string; href: string; hint: string; className?: string };
export function ExperimentPreview({ slug, title, href, hint, className }: Props) {
  const router = useRouter();
  const box = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.some((e) => e.isIntersecting) && (setVisible(true), io.disconnect()),
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin || e.source !== frame.current?.contentWindow) return;
      if (e.data?.type === "experiment:open") router.push(href);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [href, router]);

  return (
    <div
      ref={box}
      className={cn(
        "group border-ink/14 bg-paper relative aspect-[4/5] w-full min-w-0 overflow-hidden border",
        className,
      )}
    >
      {visible ? (
        <iframe
          ref={frame}
          src={`/experiments/${slug}/index.html?card=1`}
          title={title}
          loading="lazy"
          className="absolute inset-0 h-full w-full"
        />
      ) : null}
      <span
        aria-hidden="true"
        className="bg-ink/85 text-ink pointer-events-none absolute right-2 bottom-2 px-2 py-1 font-mono text-[10px] tracking-[0.1em] uppercase opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      >
        {hint}
      </span>
    </div>
  );
}
