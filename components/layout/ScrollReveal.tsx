"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const DESKTOP_QUERY = "(min-width: 768px)";

/**
 * Adds `.is-visible` to any `.reveal` element as it scrolls into view, driving
 * the desktop fade/slide-in defined in globals.css.
 *
 * Mobile does not use this observer. Its explicit `[data-mobile-motion]`
 * moments are driven directly by the CSS view timeline, so motion stays in
 * sync with the user's finger instead of waiting for a main-thread callback.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const desktop = window.matchMedia(DESKTOP_QUERY);
    let revealObserver: IntersectionObserver | null = null;

    const setupDesktopReveals = () => {
      revealObserver?.disconnect();
      revealObserver = null;

      // Phones stay entirely outside the JavaScript reveal path. Removing the
      // class also guarantees every `.reveal` remains visible if the viewport
      // crosses the breakpoint while the page is open.
      if (!desktop.matches || typeof IntersectionObserver === "undefined") {
        root.classList.remove("js-ready");
        return;
      }

      root.classList.add("js-ready");
      const revealEls = document.querySelectorAll<HTMLElement>(
        ".reveal:not(.is-visible)",
      );
      if (revealEls.length === 0) return;

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
    };

    setupDesktopReveals();
    desktop.addEventListener("change", setupDesktopReveals);

    return () => {
      revealObserver?.disconnect();
      desktop.removeEventListener("change", setupDesktopReveals);
    };
  }, [pathname]);

  return null;
}
