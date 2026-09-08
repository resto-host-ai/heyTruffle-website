"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Adds `.is-visible` to any `.reveal` element as it scrolls into view, driving
 * the fade/slide-in defined in globals.css. Re-scans on route change so
 * client-navigated pages animate too.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const desktopMotion = window.matchMedia(
      "(min-width: 768px) and (hover: hover) and (pointer: fine)",
    );
    let io: IntersectionObserver | null = null;

    const syncMotionMode = () => {
      io?.disconnect();
      io = null;

      // Reveals are a desktop enhancement. Avoiding the observer entirely on
      // touch devices reduces main-thread work during iOS kinetic scrolling;
      // CSS leaves every reveal visible in this mode.
      if (!desktopMotion.matches) {
        document.documentElement.classList.remove("js-ready");
        return;
      }

      // Reveals are VISIBLE until this class lands (globals.css) — content
      // never waits on JS. Stamping it here and marking the in-view elements
      // .is-visible below happen in the same synchronous pass, so nothing on
      // screen ever flashes out.
      document.documentElement.classList.add("js-ready");

      const els = document.querySelectorAll<HTMLElement>(
        ".reveal:not(.is-visible)",
      );
      if (els.length === 0) return;

      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io?.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
      );

      // Reveal anything already in view synchronously (the observer's first
      // callback is async and can lag), and observe the rest for scroll.
      // Measure everything before writing classes to avoid repeated layout.
      const vh = window.innerHeight;
      const tops = new Map<HTMLElement, number>();
      els.forEach((el) => tops.set(el, el.getBoundingClientRect().top));
      els.forEach((el) => {
        if (tops.get(el)! < vh * 0.9) {
          el.classList.add("is-visible");
        } else {
          io?.observe(el);
        }
      });
    };

    syncMotionMode();
    desktopMotion.addEventListener("change", syncMotionMode);

    return () => {
      desktopMotion.removeEventListener("change", syncMotionMode);
      io?.disconnect();
    };
  }, [pathname]);

  return null;
}
