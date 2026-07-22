"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import HostsDemo from "./HostsDemo";

const STATEMENTS = [
  "Not a software.",
  "Not self-service.",
  "Not replacing your host.",
];

// Per-pill active gradient (empty string = keep the solid #4c4749 fill). The
// second (border-box) layer keeps the same top-lit gradient stroke as the base
// so only the fill swaps. Full literal strings so Tailwind detects them.
// Desktop reveals on hover (md:hover); mobile toggles the same look on tap.
const HOVER_BG = [
  "md:hover:[background:linear-gradient(180deg,#654027_0%,#61485f_100%)_padding-box,linear-gradient(180deg,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0.12)_45%,rgba(255,255,255,0.04)_100%)_border-box] md:hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_18px_44px_rgba(0,0,0,0.28)]",
  "md:hover:[background:linear-gradient(180deg,#594666_0%,#334061_100%)_padding-box,linear-gradient(180deg,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0.12)_45%,rgba(255,255,255,0.04)_100%)_border-box] md:hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_18px_44px_rgba(0,0,0,0.28)]",
  "md:hover:[background:linear-gradient(180deg,#5c391d_0%,#2b2222_100%)_padding-box,linear-gradient(180deg,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0.12)_45%,rgba(255,255,255,0.04)_100%)_border-box] md:hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_18px_44px_rgba(0,0,0,0.28)]",
];

// Same gradients without a variant prefix — applied on mobile when a pill is
// tapped open.
const ACTIVE_BG = [
  "[background:linear-gradient(180deg,#654027_0%,#61485f_100%)_padding-box,linear-gradient(180deg,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0.12)_45%,rgba(255,255,255,0.04)_100%)_border-box] shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_18px_44px_rgba(0,0,0,0.28)]",
  "[background:linear-gradient(180deg,#594666_0%,#334061_100%)_padding-box,linear-gradient(180deg,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0.12)_45%,rgba(255,255,255,0.04)_100%)_border-box] shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_18px_44px_rgba(0,0,0,0.28)]",
  "[background:linear-gradient(180deg,#5c391d_0%,#2b2222_100%)_padding-box,linear-gradient(180deg,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0.12)_45%,rgba(255,255,255,0.04)_100%)_border-box] shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_18px_44px_rgba(0,0,0,0.28)]",
];

// Positive statement revealed on hover (empty string = no text swap).
const REVEAL = ["A service.", "Fully managed.", "Freeing them."];

export default function WhatIsSection() {
  const pillsRef = useRef<HTMLDivElement>(null);
  const [struck, setStruck] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [revealed, setRevealed] = useState<number[]>([]);

  // On mobile the positive phrase is revealed by tapping instead of hovering.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const toggle = (i: number) =>
    setRevealed((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i],
    );

  useEffect(() => {
    const el = pillsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStruck(true);
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
            const canReveal = !!REVEAL[i];
            const open = canReveal && isMobile && revealed.includes(i);
            return (
            <div
              key={text}
              onClick={canReveal && isMobile ? () => toggle(i) : undefined}
              role={canReveal && isMobile ? "button" : undefined}
              aria-pressed={canReveal && isMobile ? open : undefined}
              className={`group relative flex h-[92px] items-center justify-center rounded-full border border-transparent [background:linear-gradient(#4c4749,#4c4749)_padding-box,linear-gradient(180deg,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0.12)_45%,rgba(255,255,255,0.04)_100%)_border-box] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_12px_34px_rgba(0,0,0,0.18)] backdrop-blur-lg transition-all duration-300 md:h-[119px] ${
                canReveal && isMobile ? "cursor-pointer" : ""
              } ${open ? ACTIVE_BG[i] : HOVER_BG[i]}`}
            >
              <span
                className={`relative inline-block whitespace-nowrap font-serif text-[26px] font-bold leading-[110%] text-cream transition-opacity duration-300 min-[480px]:text-[36px] sm:text-[44px] lg:text-[64px] ${
                  canReveal ? (open ? "opacity-0" : "md:group-hover:opacity-0") : ""
                }`}
              >
                {text}
                {/* Same word with a real strikethrough, overlaid exactly on
                    top and wiped in left-to-right — so the line always tracks
                    the glyphs and never overshoots into the pill. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 line-through decoration-2 md:decoration-[3px]"
                  style={{
                    clipPath: struck ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
                    transition: `clip-path 0.55s cubic-bezier(0.65, 0, 0.35, 1) ${
                      i * 0.18
                    }s`,
                  }}
                >
                  {text}
                </span>
              </span>
              {/* Positive statement revealed on hover (desktop) / tap (mobile). */}
              {REVEAL[i] && (
                <span
                  className={`pointer-events-none absolute inset-0 flex items-center justify-center whitespace-nowrap font-serif text-[26px] font-bold leading-[110%] text-cream transition-opacity duration-300 min-[480px]:text-[36px] sm:text-[44px] lg:text-[64px] ${
                    open ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"
                  }`}
                >
                  {REVEAL[i]}
                </span>
              )}
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
