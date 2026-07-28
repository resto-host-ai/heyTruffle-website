"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import HostsDemo from "./HostsDemo";

const STATEMENTS = [
  "Not a software.",
  "Not self-service.",
  "Not replacing your host.",
];

// Per-pill resolved-state gradient (the fill it settles into once the
// positive statement takes over). Full literal strings so Tailwind detects
// them.
const RESOLVED_BG = [
  "[background:linear-gradient(180deg,#654027_0%,#61485f_100%)_padding-box,linear-gradient(180deg,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0.12)_45%,rgba(255,255,255,0.04)_100%)_border-box] shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_18px_44px_rgba(0,0,0,0.28)]",
  "[background:linear-gradient(180deg,#594666_0%,#334061_100%)_padding-box,linear-gradient(180deg,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0.12)_45%,rgba(255,255,255,0.04)_100%)_border-box] shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_18px_44px_rgba(0,0,0,0.28)]",
  "[background:linear-gradient(180deg,#5c391d_0%,#2b2222_100%)_padding-box,linear-gradient(180deg,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0.12)_45%,rgba(255,255,255,0.04)_100%)_border-box] shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_18px_44px_rgba(0,0,0,0.28)]",
];

// Positive statement each pill resolves into.
const REVEAL = ["A service.", "Fully managed.", "Freeing them."];

// Seconds between one pill starting to resolve and the next — same value
// drives both the strike-through wipe and the text swap, so the whole
// sequence reads at a steady pace regardless of viewport or input type.
const STAGGER_S = 0.6;
const STRIKE_DURATION_S = 0.55;

export default function WhatIsSection() {
  const pillsRef = useRef<HTMLDivElement>(null);
  // Fire once when the section enters the viewport — scroll-triggered, not
  // hover-triggered, so it plays identically on touch, mouse and keyboard.
  const [triggered, setTriggered] = useState(false);
  // Starts false on both server and client so hydration always matches; the
  // effect below corrects it client-side right after mount, same pattern as
  // the isMobile sync this replaces.
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduceMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  useEffect(() => {
    const el = pillsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          io.disconnect();
        }
      },
      { threshold: 0.5, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#251f21] pb-16 pt-28 md:pb-20 md:pt-40">
      {/* background_gradient.webp, faded at the top so it blends into the
          #251F21 base instead of showing a hard cropped edge */}
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

      {/* Top fade so the section blends smoothly into the #251F21 above it */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-[#251f21] via-[#251f21]/70 to-transparent"
      />

      <div className="relative mx-auto flex w-full flex-col items-center px-6 lg:px-[73px]">
        <p className="reveal reveal-up text-center font-body text-[20px] font-normal uppercase leading-[110%] text-cream">
          What is Hey Truffle?
        </p>

        <div
          ref={pillsRef}
          className="mt-16 flex w-full max-w-[941px] flex-col gap-14"
        >
          {STATEMENTS.map((text, i) => {
            // Reduced motion: skip the wipe/stagger entirely and land on the
            // final resolved state immediately.
            const strikeDelay = reduceMotion ? 0 : i * STAGGER_S;
            const revealDelay = reduceMotion ? 0 : i * STAGGER_S + STRIKE_DURATION_S;
            const resolved = triggered;

            return (
              <div
                key={text}
                className={`relative flex h-[92px] items-center justify-center rounded-full border border-white/40 [background:linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.04)_50%,rgba(255,255,255,0.05)_100%)] shadow-[0_10px_30px_rgba(0,0,0,0.22)] backdrop-blur-lg transition-all duration-300 md:h-[119px] ${
                  resolved ? RESOLVED_BG[i] : ""
                }`}
                style={
                  resolved
                    ? { transitionDelay: `${revealDelay}s` }
                    : undefined
                }
              >
                {/* Negative statement — purely the transition, not the
                    final meaning, so it's hidden from assistive tech. Only
                    the positive statement below is announced. */}
                <span
                  aria-hidden
                  className="relative inline-block whitespace-nowrap font-serif text-[26px] font-bold leading-[110%] text-cream transition-opacity duration-300 min-[480px]:text-[36px] sm:text-[44px] lg:text-[64px]"
                  style={
                    resolved
                      ? { opacity: 0, transitionDelay: `${revealDelay}s` }
                      : undefined
                  }
                >
                  {text}
                  {/* Same word with a real strikethrough, overlaid exactly on
                      top and wiped in left-to-right — so the line always
                      tracks the glyphs and never overshoots into the pill. */}
                  <span
                    className="pointer-events-none absolute inset-0 line-through decoration-2 md:decoration-[3px]"
                    style={{
                      clipPath: resolved ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
                      transition: `clip-path ${STRIKE_DURATION_S}s cubic-bezier(0.65, 0, 0.35, 1) ${strikeDelay}s`,
                    }}
                  >
                    {text}
                  </span>
                </span>

                {/* Positive statement the pill resolves into — the only copy
                    a screen reader announces, and the state that persists
                    once the scroll-triggered animation finishes. */}
                <span
                  className="pointer-events-none absolute inset-0 flex items-center justify-center whitespace-nowrap font-serif text-[26px] font-bold leading-[110%] text-cream opacity-0 transition-opacity duration-300 min-[480px]:text-[36px] sm:text-[44px] lg:text-[64px]"
                  style={
                    resolved
                      ? { opacity: 1, transitionDelay: `${revealDelay}s` }
                      : undefined
                  }
                >
                  {REVEAL[i]}
                </span>
              </div>
            );
          })}
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
