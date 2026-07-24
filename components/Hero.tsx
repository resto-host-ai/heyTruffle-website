"use client";

import Image from "next/image";
import { useState } from "react";
import DemoAssistant from "@/components/DemoAssistant";
import HeroBackground from "@/components/HeroBackground";

export default function Hero() {
  const [query, setQuery] = useState("");
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <section className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden pb-20 pt-32 desk-tall:pb-16 desk-short:items-center-safe desk-short:pt-28 desk-short:pb-12">
      {/* Animated gradient background (Figma living-gradient) */}
      <HeroBackground />

      {/* Bottom fade into the #251F21 of the next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-[5] h-56 bg-gradient-to-b from-transparent to-[#251f21]"
      />


      {/* Content */}
      <div className="flex flex-col items-center gap-8 px-6 text-center text-cream desk-short:gap-5">
        {/* Logo — the page's single H1. Its accessible name (the image alt)
            carries the brand + primary keyword. */}
        <h1 className="m-0 leading-none">
          <Image
            src="/images/icono.svg"
            alt="heytruffle — voice AI for restaurants"
            width={105}
            height={96}
            priority
            unoptimized
            className="h-16 w-auto sm:h-[72px]"
          />
        </h1>

        {/* Headline — demoted from <h1> to <p> so the logo stays the only H1.
            Visual styling is unchanged. */}
        <p className="max-w-[1100px] font-serif text-[52px] font-bold! leading-[110%] tracking-tight text-cream sm:text-[72px] lg:text-[92px]">
          You operate the restaurant.
          <br />
          We operate the phones.
        </p>

        {/* Subtitle */}
        <p className="font-body w-full max-w-[1000px] text-xl font-normal leading-[140%] text-cream/85 sm:text-[26px] desk-tall:h-[100px]">
          A fully managed service that answers every call for your restaurants:
          every reservation booked, every order taken, every catering inquiry
          handled.
        </p>

        {/* CTAs — desktop shows the search bar; mobile shows stacked buttons */}
        <div className="mt-2 flex w-full max-w-[559px] flex-col items-stretch gap-3 desk-tall:gap-6 desk-short:gap-5">
          {/* Search + primary CTA (desktop only) */}
          <form
            className="hidden h-[64px] w-full items-center overflow-hidden rounded-[73.26px] border border-white/40 bg-[#f6f3ec]/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_12px_34px_rgba(0,0,0,0.18)] backdrop-blur-lg sm:flex sm:h-[74px]"
            onSubmit={(e) => {
              e.preventDefault();
              setDemoOpen(true);
            }}
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for your restaurant"
              aria-label="Search for your restaurant"
              className="h-full min-w-0 flex-1 bg-transparent pl-6 pr-3 font-body text-[20px] font-normal leading-[110%] text-[#251f21] outline-none placeholder:text-[#251f21] sm:pl-[38px] sm:pr-4"
            />
            <button
              type="submit"
              className="flex h-full shrink-0 items-center justify-center gap-2 rounded-full bg-brand-orange px-6 font-body text-[20px] font-bold leading-[110%] text-[#f6f3ec] transition-all duration-300 btn-grad btn-grad-orange hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_12px_34px_rgba(239,114,0,0.55)] sm:gap-4 sm:px-[44px]"
            >
              Live Demo
              <svg
                width="13"
                height="27"
                viewBox="0 0 19 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
                className="shrink-0"
              >
                <path d="M3 4l13 16-13 16" />
              </svg>
            </button>
          </form>

          {/* Primary CTA (mobile only) */}
          <button
            type="button"
            onClick={() => setDemoOpen(true)}
            className="flex h-[64px] w-full items-center justify-center rounded-full bg-brand-orange font-body text-[20px] font-bold leading-[110%] text-cream transition-all duration-300 btn-grad btn-grad-orange hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_12px_34px_rgba(239,114,0,0.55)] sm:hidden"
          >
            Live Demo
          </button>

          {/* Secondary CTA */}
          <a
            href="mailto:info@heytruffle.com"
            className="flex h-[64px] w-full items-center justify-center self-center rounded-full bg-[#1c1917]/85 px-9 text-[20px] font-semibold text-cream shadow-lg backdrop-blur-md transition-all duration-300 btn-grad btn-grad-blue hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_12px_34px_rgba(79,84,144,0.55)] sm:w-auto"
          >
            Talk to our team
          </a>
        </div>
      </div>

      <DemoAssistant
        open={demoOpen}
        initialQuery={query}
        onClose={() => setDemoOpen(false)}
      />
    </section>
  );
}
