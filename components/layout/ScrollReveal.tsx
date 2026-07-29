"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const MOBILE_QUERY = "(max-width: 767.98px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const MOTION_EASING = "cubic-bezier(0.23, 1, 0.32, 1)";

function parseDelay(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return 0;
  const parsed = Number.parseFloat(trimmed);
  if (!Number.isFinite(parsed)) return 0;
  return Math.min(trimmed.endsWith("ms") ? parsed : parsed * 1000, 120);
}

function mobileKeyframes(kind: string | undefined): Keyframe[] {
  if (kind === "fade") {
    return [{ opacity: 0.78 }, { opacity: 1 }];
  }
  if (kind === "scale") {
    return [
      { opacity: 0.84, transform: "scale(0.985)" },
      { opacity: 1, transform: "scale(1)" },
    ];
  }
  return [
    { opacity: 0.84, transform: "translateY(12px)" },
    { opacity: 1, transform: "translateY(0)" },
  ];
}

/**
 * Adds `.is-visible` to any `.reveal` element as it scrolls into view, driving
 * the desktop fade/slide-in defined in globals.css.
 *
 * Mobile uses a separate fail-safe enhancement: content is always rendered in
 * its final state, then WAAPI adds a short one-shot flourish near the viewport.
 * If IntersectionObserver is delayed during iOS kinetic scrolling, the
 * animation is skipped or arrives late without ever hiding the content.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    // Reveals are VISIBLE until this class lands (globals.css) — content
    // never waits on JS. Stamping it here and marking the in-view elements
    // .is-visible below happen in the same synchronous pass, so nothing on
    // screen ever flashes out. Without IntersectionObserver we bail before
    // this line and everything simply stays visible.
    //
    // Below 768px the CSS ignores js-ready/.is-visible entirely (reveals are
    // a desktop-only enhancement — iOS kinetic scroll outruns observer
    // delivery). The observer still runs on phones on purpose: classes keep
    // accumulating, so rotating a phone past 768px mid-session behaves like
    // desktop from that point on with no re-scan needed.
    document.documentElement.classList.add("js-ready");

    const revealEls = document.querySelectorAll<HTMLElement>(
      ".reveal:not(.is-visible)",
    );

    let revealObserver: IntersectionObserver | null = null;
    if (revealEls.length > 0) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver?.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
      );

      // Reveal anything already in view synchronously (the observer's first
      // callback is async and can lag), and observe the rest for scroll.
      const vh = window.innerHeight;
      revealEls.forEach((el) => {
        if (el.getBoundingClientRect().top < vh * 0.9) {
          el.classList.add("is-visible");
        } else {
          revealObserver?.observe(el);
        }
      });
    }

    const mobile = window.matchMedia(MOBILE_QUERY);
    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);
    const activeAnimations = new Set<Animation>();
    let mobileObserver: IntersectionObserver | null = null;

    if (mobile.matches && !reducedMotion.matches) {
      const motionEls = document.querySelectorAll<HTMLElement>(
        ".reveal, [data-mobile-motion]",
      );

      mobileObserver = new IntersectionObserver(
        (entries) => {
          const viewportHeight = window.innerHeight;

          for (const entry of entries) {
            if (!entry.isIntersecting) continue;

            const el = entry.target as HTMLElement;
            mobileObserver?.unobserve(el);
            el.dataset.mobileMotionDone = "true";

            // WebKit may deliver observers after a fast flick has already
            // carried the target deep into the viewport. In that case an
            // entrance would visibly jump backwards, so keep the final state.
            if (
              entry.boundingClientRect.bottom <= 0 ||
              entry.boundingClientRect.top < viewportHeight * 0.55
            ) {
              continue;
            }

            const cssDelay = getComputedStyle(el).getPropertyValue(
              "--reveal-delay",
            );
            const explicitDelay = el.dataset.mobileMotionDelay ?? "";
            const animation = el.animate(
              mobileKeyframes(el.dataset.mobileMotion),
              {
                duration: 440,
                delay: parseDelay(explicitDelay || cssDelay),
                easing: MOTION_EASING,
                fill: "none",
              },
            );

            activeAnimations.add(animation);
            animation.finished
              .catch(() => undefined)
              .finally(() => {
                activeAnimations.delete(animation);
                // The element's base CSS is already the final state. Cancel
                // the finished effect so WebKit can release its layer.
                animation.cancel();
              });
          }
        },
        { threshold: 0.01, rootMargin: "0px 0px 10% 0px" },
      );

      motionEls.forEach((el) => {
        if (el.dataset.mobileMotionDone !== "true") {
          mobileObserver?.observe(el);
        }
      });
    }

    return () => {
      revealObserver?.disconnect();
      mobileObserver?.disconnect();
      activeAnimations.forEach((animation) => animation.cancel());
      activeAnimations.clear();
    };
  }, [pathname]);

  return null;
}
