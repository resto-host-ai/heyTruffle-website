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

    // Deferred until the page has settled, and the package is pulled in by
    // dynamic import so it
    // isn't part of the initial bundle either. Two things were wrong with
    // calling init() straight from this effect: it ran the moment hydration
    // finished — the busiest moment on the main thread — and it fetched
    // clarity.js (25 KiB) in competition with the hero paint. Clarity records
    // the session either way; what it does not need is to be the reason the
    // first interaction feels slow.
    let cancelled = false;
    let idleHandle: number | null = null;
    const start = () => {
      if (cancelled) return;
      void import("@microsoft/clarity").then((m) => {
        if (cancelled) return;
        m.default.init(CLARITY_PROJECT_ID);

        const variant = document.documentElement.dataset.ctaVariant;
        if (variant && typeof window.clarity === "function") {
          window.clarity("set", "cta_variant", variant);
        }
      });
    };

    // On touch devices, don't inject analytics while the visitor is still
    // doing the first scroll through a graphics-heavy landing page. Safari's
    // fallback still runs it later, rather than dropping analytics entirely.
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
