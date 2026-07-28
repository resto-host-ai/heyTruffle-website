"use client";

import { useEffect, useRef, useState } from "react";

/** Orange "Hear it live" pill that plays a single audio clip in place.
 *  Toggles between a play and pause glyph while the clip runs. */
export default function HearItLive({
  src,
  label = "Hear it live",
}: {
  src: string;
  label?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onPlay = () => setPlaying(true);
    const onStop = () => setPlaying(false);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onStop);
    a.addEventListener("ended", onStop);
    return () => {
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onStop);
      a.removeEventListener("ended", onStop);
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      if (a.ended) a.currentTime = 0;
      void a.play().catch(() => setPlaying(false));
    } else {
      a.pause();
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause the recording" : label}
        className="flex w-full items-center justify-center gap-3 rounded-full bg-brand-orange px-7 py-4 font-body text-[16px] font-bold leading-[110%] text-cream transition-all duration-300 btn-grad btn-grad-orange hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_12px_34px_rgba(239,114,0,0.55)] md:text-[18px] lg:inline-flex lg:w-auto"
      >
        {label}
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-cream/70">
          {playing ? (
            <svg width="12" height="12" viewBox="0 0 12 14" fill="none" aria-hidden>
              <rect x="1" width="3.5" height="14" rx="1" fill="currentColor" />
              <rect x="7.5" width="3.5" height="14" rx="1" fill="currentColor" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M3.5 1.5l9 5.5-9 5.5v-11z" fill="currentColor" />
            </svg>
          )}
        </span>
      </button>
      <audio ref={audioRef} src={src} preload="none" />
    </>
  );
}
