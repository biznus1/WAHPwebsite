"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

/**
 * Silent looping footage used as a backdrop (the Home hero, the hub lobby band).
 * - The poster frame paints first; the footage loads only when it is needed, so it never delays the main content.
 *   `start="idle"` waits for page load and browser idle (above the fold); `start="visible"` plays only while
 *   the video is on screen and pauses when it scrolls away.
 * - Playback starts from JS (muted, inline), and not at all for reduced motion or data saver.
 * - A pause control satisfies WCAG 2.2.2 for moving content that runs longer than five seconds.
 */
export function LoopVideo({
  src,
  start = "idle",
  className = "",
  controlClassName = "",
  controlTone = "dark",
}: {
  /** Path without extension; expects `.webm`, `.mp4` and `-poster.webp` alongside. */
  src: string;
  start?: "idle" | "visible";
  className?: string;
  controlClassName?: string;
  controlTone?: "dark" | "light";
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  // Once the visitor pauses, scrolling never restarts the video.
  const userPaused = useRef(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // Some mobile browsers only allow autoplay when the muted attribute itself is present.
    video.muted = true;
    video.setAttribute("muted", "");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if ((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData) return;

    const play = () =>
      video.play().then(
        () => setPlaying(true),
        () => setPlaying(false),
      );

    if (start === "visible") {
      const io = new IntersectionObserver(
        ([entry]) => {
          if (userPaused.current) return;
          if (entry.isIntersecting) play();
          else {
            video.pause();
            setPlaying(false);
          }
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

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      video.play().then(
        () => setPlaying(true),
        () => setPlaying(false),
      );
    } else {
      userPaused.current = true;
      video.pause();
      setPlaying(false);
    }
  };

  const tone =
    controlTone === "light"
      ? "bg-white/85 text-navy ring-navy/15 hover:bg-white"
      : "bg-navy/60 text-white/85 ring-white/25 hover:text-white";

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
        poster={`${src}-poster.webp`}
        className={`pointer-events-none absolute inset-0 size-full object-cover ${className}`}
      >
        <source src={`${src}.webm`} type="video/webm" />
        <source src={`${src}.mp4`} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={toggle}
        className={`absolute z-10 inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold ring-1 ring-inset backdrop-blur-sm transition-colors ${tone} ${controlClassName}`}
      >
        {playing ? <Pause aria-hidden className="size-3.5" /> : <Play aria-hidden className="size-3.5" />}
        <span>{playing ? "Pause video" : "Play video"}</span>
      </button>
    </>
  );
}
