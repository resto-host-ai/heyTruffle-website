"use client";

import { useEffect, useRef } from "react";

// Length of one call sequence (last beat ends ~3.4s) plus how long the
// finished card holds before it plays again.
const SEQUENCE_MS = 3400;
const HOLD_MS = 10000;
const CYCLE_MS = SEQUENCE_MS + HOLD_MS;

/**
 * Wraps one AiHostStory block and drives its two animated parts, marked with
 * data-story inside the block. Each part sits paused at frame 0 until it's
 * [data-playing] (see the `[data-story]` rules in globals.css).
 *
 * - "copy" (eyebrow, title, description) plays once, the first time it
 *   peeks into view, and then stays put.
 * - "card" (the mock call) starts as soon as it peeks in, holds its finished
 *   state for 10s, then replays. Scrolled away it just pauses where it is —
 *   it never rewinds to blank — and picks up again on the way back.
 */
export default function StoryReplay({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const copy = root.querySelector<HTMLElement>('[data-story="copy"]');
    const card = root.querySelector<HTMLElement>('[data-story="card"]');

    // Card loop bookkeeping: time played in the current cycle.
    let elapsed = 0;
    let since = 0;
    let timer = 0;
    const restart = () => {
      card?.getAnimations({ subtree: true }).forEach((a) => {
        a.currentTime = 0;
      });
      elapsed = 0;
      since = performance.now();
      timer = window.setTimeout(restart, CYCLE_MS);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (el === copy) {
            if (!entry.isIntersecting) continue;
            el.dataset.playing = "";
            io.unobserve(el);
          } else if (el === card) {
            if (entry.isIntersecting) {
              el.dataset.playing = "";
              since = performance.now();
              timer = window.setTimeout(restart, CYCLE_MS - elapsed);
            } else if ("playing" in el.dataset) {
              delete el.dataset.playing;
              elapsed += performance.now() - since;
              clearTimeout(timer);
            }
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    if (copy) io.observe(copy);
    if (card) io.observe(card);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <article ref={ref} className={`story-block ${className ?? ""}`}>
      {children}
    </article>
  );
}
