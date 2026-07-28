"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Brand-film section — the produced spot (public/videos/moment.mp4,
 * 960x720 H.264, subtitles baked in) replaced the scroll-pinned card fan.
 * The video autoplays muted while the section is on screen (browsers block
 * audible autoplay, so sound is opt-in via the volume button), pauses when
 * scrolled away, and exposes just play/pause + mute — no native controls.
 */
export default function MomentSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      ([entry]) => {
        // Don't restart on re-entry once the spot has run to the end —
        // ending on the final frame beats looping a narrative ad.
        if (entry.isIntersecting) {
          if (!video.ended) video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      if (v.ended) v.currentTime = 0;
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  };

  const toggleMuted = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <section className="relative py-20 md:py-32">
      {/* Color glows carried over from the card-fan version: cream on the
          left, orange on the right */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-12%] top-[55%] h-[620px] w-[620px] -translate-y-1/2 rounded-full bg-[#f6f3ec] opacity-[0.12] blur-[130px]" />
        <div className="absolute right-[-10%] top-[62%] h-[620px] w-[620px] -translate-y-1/2 rounded-full bg-[#ef7200] opacity-[0.28] blur-[130px]" />
      </div>

      <div className="relative mx-auto w-full px-6 lg:px-[73px]">
        <h2 className="reveal reveal-up text-center font-serif text-[30px] font-bold! leading-[110%] text-[#ef7200] md:text-[38px] lg:text-[44px]">
          You know this moment.
        </h2>

        <div
          className="reveal reveal-up mx-auto mt-10 w-full max-w-[900px] md:mt-14"
          style={{ "--reveal-delay": "0.14s" } as React.CSSProperties}
        >
          <div className="relative overflow-hidden rounded-[24px] bg-[#251f21] shadow-[0_30px_60px_rgba(0,0,0,0.45)] md:rounded-[36px]">
            <video
              ref={videoRef}
              src="/videos/moment.mp4"
              poster="/images/moment-poster.webp"
              muted
              playsInline
              preload="metadata"
              onPlay={() => {
                setPlaying(true);
                setEnded(false);
              }}
              onPause={() => setPlaying(false)}
              onEnded={() => setEnded(true)}
              className="block aspect-[4/3] w-full object-cover"
            />

            {/* Soft scrim keeps the controls legible over bright frames */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#251f21]/45 to-transparent"
            />

            {/* Play/pause + volume, the only two controls by design. Top-right
                corner: the spot has subtitles baked along the bottom edge, so
                anything anchored down there sits on top of the copy on
                phone-sized cards. */}
            <div className="absolute right-4 top-4 flex items-center gap-2.5 md:right-5 md:top-5">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={playing ? "Pause" : ended ? "Replay" : "Play"}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-[#1c1917]/60 text-cream backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-[#1c1917]/80"
              >
                {playing ? (
                  <svg width="13" height="15" viewBox="0 0 12 14" fill="none" aria-hidden>
                    <rect x="1" width="3.5" height="14" rx="1" fill="currentColor" />
                    <rect x="7.5" width="3.5" height="14" rx="1" fill="currentColor" />
                  </svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden className="translate-x-px">
                    <path d="M3.5 1.5l9 5.5-9 5.5v-11z" fill="currentColor" />
                  </svg>
                )}
              </button>

              <button
                type="button"
                onClick={toggleMuted}
                aria-label={muted ? "Unmute" : "Mute"}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-[#1c1917]/60 text-cream backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-[#1c1917]/80"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M11 5 6.5 9H3v6h3.5L11 19V5z" fill="currentColor" stroke="none" />
                  {muted ? (
                    <path d="m16 9 5 6M21 9l-5 6" />
                  ) : (
                    <>
                      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                      <path d="M18.5 6a9 9 0 0 1 0 12" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
