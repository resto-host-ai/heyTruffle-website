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

    const els = document.querySelectorAll<HTMLElement>(
      ".reveal:not(.is-visible)",
    );
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    // Reveal anything already in view synchronously (the observer's first
    // callback is async and can lag), and observe the rest for scroll.
    const vh = window.innerHeight;
    els.forEach((el) => {
      if (el.getBoundingClientRect().top < vh * 0.9) {
        el.classList.add("is-visible");
      } else {
        io.observe(el);
      }
    });
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
