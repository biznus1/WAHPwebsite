"use client";

import { useEffect, useRef } from "react";

/**
 * Silent looping footage used as a backdrop (the Home hero, the hub lobby band, the closing audience band).
 * - The poster frame paints first; the footage loads only when it is needed, so it never delays the main content.
 *   `start="idle"` waits for page load and browser idle (above the fold); `start="visible"` plays only while
 *   the video is on screen and pauses when it scrolls away.
 * - Playback starts from JS (muted, inline), and not at all for reduced motion or data saver.
 * - No on-screen pause button (owner's choice, 5 Nov 2026). Visitors who ask for reduced motion never see the
 *   footage move. The hero loops from page load; the other bands play only while they are in view.
 */
export function LoopVideo({
  src,
  start = "idle",
  className = "",
}: {
  /** Path without extension; expects `.webm`, `.mp4` and `-poster.webp` alongside. */
  src: string;
  start?: "idle" | "visible";
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // Some mobile browsers only allow autoplay when the muted attribute itself is present.
    video.muted = true;
    video.setAttribute("muted", "");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if ((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData) return;

    const play = () => video.play().catch(() => {});

    if (start === "visible") {
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) play();
          else video.pause();
        },
        { threshold: 0.25 },
      );
      io.observe(video);
      return () => io.disconnect();
    }

    // Idle start: only once the page has loaded and the browser is idle, so decoding never competes with first paint.
    let idle: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const schedule = () => {
      if ("requestIdleCallback" in window) idle = window.requestIdleCallback(play, { timeout: 2500 });
      else timer = setTimeout(play, 1200);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      window.removeEventListener("load", schedule);
      if (idle !== undefined) window.cancelIdleCallback(idle);
      if (timer) clearTimeout(timer);
    };
  }, [start]);

  return (
    <video
      ref={ref}
      aria-hidden
      tabIndex={-1}
      muted
      loop
      playsInline
      preload="none"
      poster={`${src}-poster.webp`}
      className={`pointer-events-none absolute inset-0 size-full object-cover ${className}`}
    >
      <source src={`${src}.webm`} type="video/webm" />
      <source src={`${src}.mp4`} type="video/mp4" />
    </video>
  );
}
