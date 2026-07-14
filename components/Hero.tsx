"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden py-28 sm:py-24">
      {/* Static gradient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="/images/hero-gradiants2.webp"
          alt=""
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Bottom fade into the #251F21 of the next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-[5] h-48 bg-gradient-to-b from-transparent to-[#251f21]"
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
        <h1 className="font-serif text-5xl font-normal leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          You operate the restaurant.
          <br />
          We operate the phones.
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-base leading-relaxed text-cream/85 sm:text-lg">
          A fully managed service that answers every call for your restaurants:
          every reservation booked, every order taken, every catering inquiry
          closed.
        </p>

        {/* Search + primary CTA */}
        <form
          className="mt-2 flex h-[56px] w-full max-w-[559px] items-center overflow-hidden rounded-full border border-white/40 bg-[#f6f3ec]/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_12px_34px_rgba(0,0,0,0.18)] backdrop-blur-lg sm:h-[64px]"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            placeholder="Search for your restaurant"
            aria-label="Search for your restaurant"
            className="h-full min-w-0 flex-1 bg-transparent pl-6 pr-3 text-base leading-[1.1] text-[#251f21] outline-none placeholder:text-[#251f21] sm:pl-[38px] sm:pr-4 sm:text-[20px]"
          />
          <button
            type="submit"
            className="flex h-full shrink-0 items-center justify-center gap-2 rounded-full bg-brand-orange px-6 text-base font-bold leading-[1.1] text-[#f6f3ec] transition-colors hover:bg-[#d96700] sm:gap-4 sm:px-[44px] sm:text-[20px]"
          >
            Try HeyTruffle
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
          className="mt-6 flex h-[64px] items-center justify-center rounded-full bg-[#1c1917]/85 px-9 text-[20px] font-semibold text-cream shadow-lg backdrop-blur-md transition-colors hover:bg-[#1c1917]"
        >
          Talk to our team
        </a>
      </div>
    </section>
  );
}
