"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

/**
 * Silent looping background footage for the Home hero, sitting under a navy overlay.
 * - The poster frame paints first and the footage loads only after the page is idle, so it never delays the main content.
 * - Playback starts from JS (muted, inline), and not at all when the visitor prefers reduced motion.
 * - A pause control satisfies WCAG 2.2.2 for moving content that runs longer than five seconds.
 */
export function HeroVideo({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Respect data-saver: keep the poster frame.
    if ((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData) return;

    // Start only once the page has loaded and the browser is idle, so decoding never competes with first paint.
    let idle: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const start = () =>
      video.play().then(
        () => setPlaying(true),
        () => setPlaying(false),
      );
    const schedule = () => {
      if ("requestIdleCallback" in window) idle = window.requestIdleCallback(start, { timeout: 2500 });
      else timer = setTimeout(start, 1200);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      window.removeEventListener("load", schedule);
      if (idle !== undefined) window.cancelIdleCallback(idle);
      if (timer) clearTimeout(timer);
    };
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(
        () => setPlaying(true),
        () => setPlaying(false),
      );
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <video
        ref={ref}
        aria-hidden
        tabIndex={-1}
        muted
        loop
        playsInline
        preload="none"
        poster="/video/hero-clinic-poster.webp"
        className={`pointer-events-none absolute inset-0 -z-20 size-full object-cover object-[38%_30%] ${className}`}
      >
        <source src="/video/hero-clinic.webm" type="video/webm" />
        <source src="/video/hero-clinic.mp4" type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={toggle}
        className="absolute right-4 bottom-20 z-10 inline-flex items-center gap-2 rounded-full bg-navy/60 px-3 py-2 text-xs font-semibold text-white/85 ring-1 ring-inset ring-white/25 backdrop-blur-sm transition-colors hover:text-white md:right-8 md:bottom-28"
      >
        {playing ? <Pause aria-hidden className="size-3.5" /> : <Play aria-hidden className="size-3.5" />}
        <span>{playing ? "Pause video" : "Play video"}</span>
      </button>
    </>
  );
}
