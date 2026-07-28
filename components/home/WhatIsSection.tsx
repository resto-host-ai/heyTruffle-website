"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import HostsDemo from "@/components/demo/HostsDemo";

const STATEMENTS = [
  "Not a software.",
  "Not self-service.",
  "Not replacing your host.",
];

// Per-pill resolved-state gradient. Applied as a crossfading overlay (not a
// class swap) so the color change scrubs smoothly with scroll instead of
// snapping — background-image can't be interpolated by a CSS transition, so
// the only way to make the color change itself visible is to fade an overlay
// in on top of the base fill.
const RESOLVED_BG = [
  "linear-gradient(180deg,#654027 0%,#61485f 100%)",
  "linear-gradient(180deg,#594666 0%,#334061 100%)",
  "linear-gradient(180deg,#5c391d 0%,#2b2222 100%)",
];

// Positive statement each pill resolves into.
const REVEAL = ["A service.", "Fully managed.", "Freeing them."];

export default function WhatIsSection() {
  const pinRef = useRef<HTMLDivElement>(null);
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const negRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const strikeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const posRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Desktop: the section pins while each pill resolves in turn, driven
  // directly by scroll position (not a timer) — scrolling further always
  // means more resolved, scrolling back undoes it. Mobile: pills render
  // already resolved, no scrub.
  useEffect(() => {
    const pin = pinRef.current;
    if (!pin) return;

    const seg = 1 / STATEMENTS.length;
    const clamp = (n: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, n));

    let raf = 0;
    const update = () => {
      raf = 0;
      const isDesktop = window.innerWidth >= 768;
      if (!isDesktop) {
        STATEMENTS.forEach((_, i) => {
          if (negRefs.current[i]) negRefs.current[i]!.style.opacity = "";
          if (strikeRefs.current[i]) strikeRefs.current[i]!.style.clipPath = "";
          if (posRefs.current[i]) posRefs.current[i]!.style.opacity = "";
          if (bgRefs.current[i]) bgRefs.current[i]!.style.opacity = "";
        });
        return;
      }

      const total = pin.offsetHeight - window.innerHeight;
      const rect = pin.getBoundingClientRect();
      const p = total > 0 ? clamp(-rect.top / total) : 0;
      // Finish resolving a bit before release so the third is fully in while
      // still pinned.
      const rp = clamp(p / 0.9);

      STATEMENTS.forEach((_, i) => {
        const localP = clamp((rp - i * seg) / seg);
        // First half of this pill's segment: the strike wipes across the
        // negative phrase. Second half: it fades out as the positive
        // phrase and the resolved background fade in — all keyed off the
        // same scroll-derived progress, nothing timer-based.
        const strikeP = clamp(localP / 0.5);
        const revealP = clamp((localP - 0.5) / 0.5);

        if (strikeRefs.current[i]) {
          strikeRefs.current[i]!.style.clipPath = `inset(0 ${100 - strikeP * 100}% 0 0)`;
        }
        if (negRefs.current[i]) negRefs.current[i]!.style.opacity = String(1 - revealP);
        if (posRefs.current[i]) posRefs.current[i]!.style.opacity = String(revealP);
        if (bgRefs.current[i]) bgRefs.current[i]!.style.opacity = String(revealP);
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative bg-[#251f21] pb-16 pt-28 md:pb-20 md:pt-40">
      <div className="relative mx-auto flex w-full flex-col items-center px-6 lg:px-[73px]">
        {/* Tall spacer drives the pinned scrub on desktop; auto height (no
            pin) on mobile, where the pills just render already resolved. */}
        <div ref={pinRef} className="w-full md:relative md:h-[180vh]">
          <div className="relative flex w-full flex-col items-center md:sticky md:top-0 md:h-screen md:justify-center">
            {/* background_gradient.webp, sized to this pinned viewport-tall
                area specifically — not the whole section, whose height is
                dominated by the tall scroll spacer above and would push the
                mask's visible band away from the content it's meant to sit
                behind. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, #000 30%, #000 80%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, #000 30%, #000 80%, transparent 100%)",
              }}
            >
              <Image
                src="/images/background_gradient.webp"
                alt=""
                fill
                loading="lazy"
                quality={100}
                sizes="100vw"
                className="object-cover"
              />
            </div>

            {/* Top fade so the section blends smoothly into the #251F21
                above it */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-[#251f21] via-[#251f21]/70 to-transparent"
            />

            <p className="reveal reveal-up relative text-center font-body text-[20px] font-normal uppercase leading-[110%] text-cream">
              What is Hey Truffle?
            </p>

            <div className="mt-16 flex w-full max-w-[941px] flex-col gap-14 p-10">
              {STATEMENTS.map((text, i) => (
                <div
                  key={text}
                  className="relative flex h-[92px] items-center justify-center overflow-hidden rounded-full border border-white/40 [background:linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.04)_50%,rgba(255,255,255,0.05)_100%)] shadow-[0_10px_30px_rgba(0,0,0,0.22)] backdrop-blur-lg md:h-[119px]"
                >
                  {/* Resolved-color overlay — crossfades in on top of the
                      base fill as the scroll-derived progress advances, so
                      the color change itself is what makes the resolve
                      visible, not just the text swap. */}
                  <div
                    ref={(el) => {
                      bgRefs.current[i] = el;
                    }}
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-full opacity-100 shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_18px_44px_rgba(0,0,0,0.28)] md:opacity-0"
                    style={{ backgroundImage: RESOLVED_BG[i] }}
                  />

                  {/* Negative statement — purely the transition, not the
                      final meaning, so it's hidden from assistive tech. Only
                      the positive statement below is announced. */}
                  <span
                    ref={(el) => {
                      negRefs.current[i] = el;
                    }}
                    aria-hidden
                    className="relative inline-block whitespace-nowrap font-serif text-[26px] font-bold leading-[110%] text-cream opacity-0 min-[480px]:text-[36px] sm:text-[44px] md:opacity-100 lg:text-[64px]"
                  >
                    {text}
                    {/* Same word with a real strikethrough, overlaid exactly
                        on top and wiped in left-to-right, tied to scroll
                        progress — so the line always tracks the glyphs and
                        never overshoots into the pill. */}
                    <span
                      ref={(el) => {
                        strikeRefs.current[i] = el;
                      }}
                      className="pointer-events-none absolute inset-0 line-through decoration-2 md:decoration-[3px]"
                      style={{ clipPath: "inset(0 100% 0 0)" }}
                    >
                      {text}
                    </span>
                  </span>

                  {/* Positive statement the pill resolves into — the only
                      copy a screen reader announces, and what's left
                      showing once the section is fully scrolled past. */}
                  <span
                    ref={(el) => {
                      posRefs.current[i] = el;
                    }}
                    className="pointer-events-none absolute inset-0 flex items-center justify-center whitespace-nowrap font-serif text-[26px] font-bold leading-[110%] text-cream opacity-100 min-[480px]:text-[36px] sm:text-[44px] md:opacity-0 lg:text-[64px]"
                  >
                    {REVEAL[i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="reveal reveal-up font-body mt-12 max-w-3xl text-center text-[26px] font-normal leading-[140%] text-cream">
          Most voice AI hands you software to set up and maintain.
          <br />
          We run it for you, so you get the result, not the homework.
        </p>

        {/* Meet the hosts — interactive voice demo card */}
        <HostsDemo />
      </div>
    </section>
  );
}
