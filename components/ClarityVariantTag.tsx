"use client";

import { useEffect } from "react";

/** Tags the session with which hero CTA variant it saw, so Clarity
 *  recordings can be filtered by `cta_variant` in the dashboard — independent
 *  of the smart events, which stayed bound to the old "Hear it live" text
 *  after the copy changed and now double-count the same clicks under two
 *  names. */
export function ClarityVariantTag({ variant }: { variant: "A" | "B" }) {
  useEffect(() => {
    document.documentElement.dataset.ctaVariant = variant;
    if (typeof window.clarity === "function") {
      window.clarity("set", "cta_variant", variant);
    }

    return () => {
      if (document.documentElement.dataset.ctaVariant === variant) {
        delete document.documentElement.dataset.ctaVariant;
      }
    };
  }, [variant]);

  return null;
}

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
  }
}
