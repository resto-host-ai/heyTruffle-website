"use client";

import { useEffect } from "react";

// Clarity.tsx defers Clarity.init() itself (requestIdleCallback, up to 4s,
// or a 2.5s setTimeout fallback) — window.clarity doesn't exist as a
// callable queue until that init has actually run. Poll a bit past that
// worst case rather than racing it: the classic Clarity snippet's stub
// queues any call made before the real script finishes downloading, so
// once window.clarity exists as a function, calling setTag is safe even if
// the full script isn't loaded yet.
const POLL_INTERVAL_MS = 250;
const POLL_TIMEOUT_MS = 6000;

/** Tags the session with which hero CTA variant it saw, so Clarity
 *  recordings can be filtered by `cta_variant` in the dashboard — independent
 *  of the smart events, which stayed bound to the old "Hear it live" text
 *  after the copy changed and now double-count the same clicks under two
 *  names. */
export function ClarityVariantTag({ variant }: { variant: "A" | "B" }) {
  useEffect(() => {
    let cancelled = false;
    let elapsed = 0;

    const tryTag = () => {
      if (cancelled) return;
      if (typeof window.clarity === "function") {
        window.clarity("set", "cta_variant", variant);
        return;
      }
      elapsed += POLL_INTERVAL_MS;
      if (elapsed >= POLL_TIMEOUT_MS) return;
      setTimeout(tryTag, POLL_INTERVAL_MS);
    };

    tryTag();
    return () => {
      cancelled = true;
    };
  }, [variant]);

  return null;
}

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
  }
}
