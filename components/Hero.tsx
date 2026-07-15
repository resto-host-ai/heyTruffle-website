"use client";

import Image from "next/image";
import { useState } from "react";
import DemoAssistant from "@/components/DemoAssistant";
import HeroBackground from "@/components/HeroBackground";

export default function Hero() {
  const [query, setQuery] = useState("");
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <section className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden py-28 sm:py-24">
      {/* Animated gradient background (Figma living-gradient) */}
      <HeroBackground />

      {/* Bottom fade into the #251F21 of the next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-[5] h-56 bg-gradient-to-b from-transparent to-[#251f21]"
      />


      {/* Content */}
      <div className="flex flex-col items-center gap-8 px-6 text-center text-cream">
        {/* Icon */}
        <Image
          src="/images/icono.svg"
          alt="heytruffle"
          width={105}
          height={96}
          priority
          unoptimized
          className="h-16 w-auto sm:h-[72px]"
        />

        {/* Headline */}
        <h1 className="max-w-[1100px] font-serif text-[52px] font-bold! leading-[110%] tracking-tight text-cream sm:text-[72px] lg:text-[92px]">
          You operate the restaurant.
          <br />
          We operate the phones.
        </h1>

        {/* Subtitle */}
        <p className="font-body w-full max-w-[1000px] text-xl font-normal leading-[140%] text-cream/85 sm:h-[100px] sm:text-[26px]">
          A fully managed service that answers every call for your restaurants:
          every reservation booked, every order taken, every catering inquiry
          handled.
        </p>

        {/* Search + primary CTA */}
        <form
          className="mt-2 flex h-[64px] w-full max-w-[559px] items-center overflow-hidden rounded-[73.26px] border border-white/40 bg-[#f6f3ec]/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_12px_34px_rgba(0,0,0,0.18)] backdrop-blur-lg sm:h-[74px]"
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
            className="flex h-full shrink-0 items-center justify-center gap-2 rounded-full bg-brand-orange px-6 font-body text-[20px] font-bold leading-[110%] text-[#f6f3ec] transition-all duration-300 hover:bg-[linear-gradient(180deg,#f5a24a_0%,#e07a12_45%,#b85400_100%)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_12px_34px_rgba(239,114,0,0.55)] sm:gap-4 sm:px-[44px]"
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

        {/* Secondary CTA */}
        <a
          href="mailto:info@heytruffle.com"
          className="mt-6 flex h-[64px] items-center justify-center rounded-full bg-[#1c1917]/85 px-9 text-[20px] font-semibold text-cream shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-[linear-gradient(180deg,#8b9cd6_0%,#6076bd_50%,#3f5490_100%)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_12px_34px_rgba(79,84,144,0.55)]"
        >
          Talk to our team
        </a>
      </div>

      <DemoAssistant
        open={demoOpen}
        initialQuery={query}
        onClose={() => setDemoOpen(false)}
      />
    </section>
  );
}
