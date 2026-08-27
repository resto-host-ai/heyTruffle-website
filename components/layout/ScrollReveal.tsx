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
    //
    // Measure everything BEFORE touching a single class. Doing both in one
    // pass looks tidier but interleaves a layout read with a layout write on
    // every iteration, and the .js-ready stamp above has just invalidated
    // style for the whole document — so each getBoundingClientRect() has to
    // flush recalc and layout again from scratch. Lighthouse measured 45 ms of
    // forced reflow attributed to this effect. Split in two, the same work
    // costs one layout: the reads all resolve against a single clean pass,
    // then the writes go out together with nothing reading in between.
    const vh = window.innerHeight;
    const tops = new Map<HTMLElement, number>();
    els.forEach((el) => tops.set(el, el.getBoundingClientRect().top));
    els.forEach((el) => {
      if (tops.get(el)! < vh * 0.9) {
        el.classList.add("is-visible");
      } else {
        io.observe(el);
      }
    });
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
