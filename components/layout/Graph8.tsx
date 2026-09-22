"use client";

import { useEffect } from "react";

/**
 * graph8 — event tracking (https://events.flow.graph8.com/p.js). Same
 * bounded-idle pattern as Clarity.tsx / Reb2b.tsx: the vendor snippet is a
 * plain `<script async src=... data-write-key=...>`, so there's no inline
 * bootstrapping code to defer — what's deferred is *inserting* the tag at
 * all, so it doesn't compete with the hero paint on load. The write key is
 * "public" per graph8's own docs (safe to ship client-side, same trust level
 * as Clarity's project ID or Reb2b's key), so it's a NEXT_PUBLIC_ env var.
 */
const GRAPH8_WRITE_KEY = process.env.NEXT_PUBLIC_GRAPH8_WRITE_KEY;
const GRAPH8_SRC = "https://events.flow.graph8.com/p.js";

export default function Graph8() {
  useEffect(() => {
    if (!GRAPH8_WRITE_KEY) return;

    let cancelled = false;
    let idleHandle: number | null = null;
    const start = () => {
      if (cancelled) return;
      const el = document.createElement("script");
      el.async = true;
      el.src = GRAPH8_SRC;
      el.dataset.writeKey = GRAPH8_WRITE_KEY;
      document.body.appendChild(el);
    };

    const isTouch = window.matchMedia(
      "(max-width: 767px), (hover: none) and (pointer: coarse)",
    ).matches;
    const minimumDelay = isTouch ? 15000 : 4000;
    const timer = window.setTimeout(() => {
      if (typeof requestIdleCallback === "function") {
        idleHandle = requestIdleCallback(start, { timeout: 10000 });
      } else {
        start();
      }
    }, minimumDelay);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      if (idleHandle !== null && typeof cancelIdleCallback === "function") {
        cancelIdleCallback(idleHandle);
      }
    };
  }, []);

  return null;
}
