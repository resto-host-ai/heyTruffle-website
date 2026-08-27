"use client";

import { useEffect } from "react";

// Microsoft Clarity — same account as the RestoHost site (project "resto-host").
// Session recordings + heatmaps. Initialized once from the root layout so it
// runs on every route, via the official @microsoft/clarity npm package
// (https://www.npmjs.com/package/@microsoft/clarity) rather than the
// hand-rolled inline snippet — the ID is supplied via env so it can be
// rotated without a code change and verified against .env directly.
const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

export default function ClarityInit() {
  useEffect(() => {
    // Without an ID Clarity.init would throw — skip it entirely rather than
    // load a broken tracker.
    if (!CLARITY_PROJECT_ID) return;

    // Deferred to idle, and the package is pulled in by dynamic import so it
    // isn't part of the initial bundle either. Two things were wrong with
    // calling init() straight from this effect: it ran the moment hydration
    // finished — the busiest moment on the main thread — and it fetched
    // clarity.js (25 KiB) in competition with the hero paint. Clarity records
    // the session either way; what it does not need is to be the reason the
    // first interaction feels slow.
    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      void import("@microsoft/clarity").then((m) => {
        if (!cancelled) m.default.init(CLARITY_PROJECT_ID);
      });
    };

    // requestIdleCallback is unavailable on Safari < 17, which is a real slice
    // of this site's traffic (restaurant owners on iPhones) — without the
    // setTimeout fallback analytics would simply stop reporting there.
    if (typeof requestIdleCallback === "function") {
      // The timeout is the point of the option: on a page that never goes
      // properly idle the callback would otherwise be deferred indefinitely.
      const handle = requestIdleCallback(start, { timeout: 4000 });
      return () => {
        cancelled = true;
        cancelIdleCallback(handle);
      };
    }

    const timer = setTimeout(start, 2500);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  return null;
}
