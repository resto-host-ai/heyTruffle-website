"use client";

import Image from "next/image";
import { useState } from "react";
import { NOISE } from "@/lib/noise";

// Same testimonial asset CaseStudies.tsx uses for Rreal Tacos.
const VIMEO_ID = "1163753938";
const POSTER_URL = "/testimonials/rreal-poster.webp";

const WE_HANDLE = [
  "Reservations",
  "Private Events",
  "Catering",
  "Large Parties",
  "Pickup",
  "FAQ",
  "Delivery",
];

export default function ResultsSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[#251f21] pb-10 pt-10 md:pb-16 md:pt-18">
      {/* gradiante2.webp background. Mask only from md (offscreen composite
          on iOS — see WhatIsSection); phones use plain gradient fades. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 md:[mask-image:linear-gradient(to_bottom,transparent_0%,#000_24%,#000_78%,transparent_100%)] md:[-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,#000_24%,#000_78%,transparent_100%)]"
      >
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#251f21] to-transparent md:hidden" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#251f21] md:hidden" />
      </div>

      <div className="relative mx-auto w-full px-6 lg:px-[73px]">
        {/* ---- The results speak for themselves ---- */}
        <h2 className="reveal reveal-up text-center font-serif text-[30px] font-bold! leading-[110%] text-cream md:text-[38px] lg:text-[44px]">
          The results speak for themselves.
        </h2>
        <p className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center font-body text-[16px] font-normal leading-[140%] text-cream md:gap-x-6 md:text-[18px]">
          <span>Rreal Tacos</span>
          <span aria-hidden className="text-cream/40">&bull;</span>
          <span>12 locations</span>
          <span aria-hidden className="text-cream/40">&bull;</span>
          <span>May 16 2026</span>
        </p>

        {/* ---- Video + stats grid ---- */}
        <div className="mt-12 flex flex-col gap-4 md:flex-row md:items-stretch">
          {/* Video */}
          <div className="relative w-full overflow-hidden rounded-3xl aspect-[4/3] md:aspect-auto md:w-1/2 md:self-stretch">
            {isPlaying ? (
              <iframe
                src={`https://player.vimeo.com/video/${VIMEO_ID}?autoplay=1&title=0&byline=0&portrait=0&dnt=1`}
                title="Rreal Tacos testimonial"
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                allowFullScreen
                className="absolute inset-0 h-full bg-black w-full border-0"
              />
            ) : (
              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                aria-label="Play the Rreal Tacos testimonial"
                className="group/play absolute inset-0 block h-full w-full border-0 p-0"
              >
                <Image
                  src={POSTER_URL}
                  alt=""
                  fill
                  quality={75}
                  sizes="(min-width: 768px) 35vw, 100vw"
                  className="object-cover"
                />
                <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover/play:scale-110">
                  <svg
                    width="17"
                    height="19"
                    viewBox="0 0 18 20"
                    fill="none"
                    aria-hidden
                    className="translate-x-[2px]"
                  >
                    <path d="M17 10L0.5 19.5V0.5L17 10Z" fill="#251f21" />
                  </svg>
                </span>
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Card 1: Calls recovered */}
            <div className="relative flex min-h-[200px] flex-col overflow-hidden rounded-3xl p-6 md:min-h-[190px] md:p-8"
              style={{ backgroundImage: "linear-gradient(180deg, #251f21 4%, #943e72 115%)" }}
            >
              <div aria-hidden className="pointer-events-none absolute inset-0 opacity-25 md:opacity-40 md:mix-blend-overlay" style={{ backgroundImage: NOISE }} />
              <div className="relative flex h-full flex-col items-center text-center md:items-start md:text-left">
                <h3 className="font-body text-[18px] font-normal! leading-[120%] text-cream md:text-[20px] lg:text-[24px]">
                  Calls recovered
                </h3>
                <p className="mt-4 font-body text-[44px] font-normal leading-[110%] text-cream md:text-[48px] lg:text-[56px] xl:text-[64px]">
                  5,513
                </p>
                <p className="mt-auto max-w-[22rem] pt-6 font-body text-[16px] font-normal leading-[145%] text-cream md:pt-4 md:text-[15px]">
                  Reservations, orders and catering that would have gone unanswered.
                </p>
              </div>
            </div>

            {/* Card 2: Host hours saved */}
            <div className="relative flex min-h-[200px] flex-col overflow-hidden rounded-3xl p-6 md:min-h-[190px] md:p-8"
              style={{ backgroundImage: "linear-gradient(180deg, #251f21 4%, #2f3d7c 115%)" }}
            >
              <div aria-hidden className="pointer-events-none absolute inset-0 opacity-25 md:opacity-40 md:mix-blend-overlay" style={{ backgroundImage: NOISE }} />
              <div className="relative flex h-full flex-col items-center text-center md:items-start md:text-left">
                <h3 className="font-body text-[18px] font-normal! leading-[120%] text-cream md:text-[20px] lg:text-[24px]">
                  Host hours saved
                </h3>
                <p className="mt-4 font-body text-[44px] font-normal leading-[110%] text-cream md:text-[48px] lg:text-[56px] xl:text-[64px]">
                  ~522
                </p>
                <p className="mt-auto max-w-[22rem] pt-6 font-body text-[16px] font-normal leading-[145%] text-cream md:pt-4 md:text-[15px]">
                  Your team back on the floor, not on the phone.
                </p>
              </div>
            </div>

            {/* Card 3: Assisted revenue — full width, number + text side by side on desktop */}
            <div className="relative flex min-h-[200px] flex-col overflow-hidden rounded-3xl p-6 sm:col-span-2 md:min-h-[190px] md:p-8"
              style={{ backgroundImage: "linear-gradient(180deg, #251f21 4%, #ef7200 115%)" }}
            >
              <div aria-hidden className="pointer-events-none absolute inset-0 opacity-25 md:opacity-40 md:mix-blend-overlay" style={{ backgroundImage: NOISE }} />
              <div className="relative flex h-full flex-col items-center text-center md:items-start md:text-left">
                <h3 className="font-body text-[18px] font-normal! leading-[120%] text-cream md:text-[20px] lg:text-[24px]">
                  Assisted revenue
                </h3>
                <div className="mt-4 flex w-full flex-col items-center gap-2 md:flex-row md:items-end md:gap-6">
                  <p className="font-body text-[44px] font-normal leading-[110%] text-cream md:text-[48px] lg:text-[56px] xl:text-[64px]">
                    ~$52,900
                  </p>
                  <p className="max-w-[22rem] font-body text-[16px] font-normal leading-[145%] text-cream md:mb-2 md:max-w-[20rem] md:text-[15px]">
                    Generated in May from large-party reservations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center font-body text-[22px] font-normal leading-[125%] text-cream md:text-[28px]">
          Born inside Rreal Tacos from operators to operators.
        </p>

        <p className="mt-12 text-center font-body text-[13px] font-medium uppercase tracking-[0.15em] text-cream/50">
          We handle
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          {WE_HANDLE.map((item) => (
            <span
              key={item}
              className="rounded-full border border-cream/10 bg-cream/5 px-5 py-2.5 font-body text-[14px] font-semibold text-cream md:text-[15px]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}