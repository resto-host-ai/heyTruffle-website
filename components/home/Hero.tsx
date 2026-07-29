"use client";

import Image from "next/image";
import { useState } from "react";
import { BookDemoButton } from "@/components/ui/BookDemoButton";
import DemoAssistant from "@/components/demo/DemoAssistant";
import HeroBackground from "@/components/home/HeroBackground";

/* .btn-grad (globals.css) sits outside every @layer, so its transition-*
   declarations outrank ANY transition utility on these buttons (utilities
   live in @layer utilities) — the `transition-all duration-300` classes they
   carried were dead code. Inline style is the one declaration that outranks
   un-layered CSS, so the full list lives here: the existing gradient + shadow
   hover (btn-grad's own curve, capped at 300ms) plus press feedback on the
   native `scale` property (what Tailwind v4 scale-* utilities animate) at
   160ms. Compositor-safe: gradient props + shadow already transitioned
   before; `scale` is the only newly animated property. */
const BTN_GRAD_PRESS_TRANSITION = [
  "--btn-g1 300ms cubic-bezier(0.2, 0.8, 0.2, 1)",
  "--btn-g2 300ms cubic-bezier(0.2, 0.8, 0.2, 1)",
  "--btn-g3 300ms cubic-bezier(0.2, 0.8, 0.2, 1)",
  "box-shadow 300ms cubic-bezier(0.2, 0.8, 0.2, 1)",
  "scale 160ms var(--ease-out-strong)",
].join(", ");

export default function Hero() {
  const [query, setQuery] = useState("");
  const [demoOpen, setDemoOpen] = useState(false);

  // Mobile paddings/type are compressed so the whole stack (logo →
  // "Talk to our team") fits a ~660px svh phone viewport with browser
  // chrome visible — the secondary CTA was falling below the fold.
  return (
    <section className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden pb-12 pt-24 desk-tall:pt-32 desk-tall:pb-16 desk-short:items-center-safe desk-short:pt-28 desk-short:pb-12">
      {/* Animated gradient background (Figma living-gradient) */}
      <HeroBackground />

      {/* Bottom fade into the #251F21 of the next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-[5] h-56 bg-gradient-to-b from-transparent to-[#251f21]"
      />


      {/* Content */}
      <div className="flex flex-col items-center gap-5 px-6 text-center text-cream desk-tall:gap-6 desk-short:gap-4">
        {/* Logo — the page's single H1. Its accessible name (the image alt)
            carries the brand + primary keyword. */}
        {/* .enter = one-shot load entrance (@starting-style, no JS/observers)
            with a soft 40ms stagger down the stack — the page's only "hello"
            moment, safe on phones by construction. */}
        <h1 className="enter m-0 leading-none">
          <Image
            src="/images/icono.svg"
            alt="heytruffle — voice AI for restaurants"
            width={105}
            height={96}
            priority
            unoptimized
            className="h-12 w-auto sm:h-[60px]"
          />
        </h1>

        {/* Headline — demoted from <h1> to <p> so the logo stays the only H1.
            Sized against the RestoHost scale (h1 caps at 88px there); Gowun
            Batang reads heavier than a sans at the same px, so this sits a
            step below it. */}
        <p
          className="enter max-w-[1000px] font-serif text-[38px] font-bold! leading-[110%] tracking-tight text-cream sm:text-[60px] lg:text-[76px]"
          style={{ "--enter-delay": "0.04s" } as React.CSSProperties}
        >
          You operate the restaurant.
          <br />
          We operate the phones.
        </p>

        {/* Subtitle — RestoHost sets body copy at 18px max; 20px keeps a bit
            more presence without the 26px that read as oversized. */}
        <p
          className="enter font-body w-full max-w-[860px] text-[16px] font-normal leading-[145%] text-cream/85 sm:text-[20px] desk-tall:h-[80px]"
          style={{ "--enter-delay": "0.08s" } as React.CSSProperties}
        >
          A fully managed service that answers every call for your restaurants:
          every reservation booked, every order taken, every catering inquiry
          handled.
        </p>

        {/* CTAs — desktop shows the search bar; mobile shows stacked buttons */}
        {/* Extra top margin on top of the parent gap sets the copy apart from
            the CTAs, matching RestoHost's 36px mobile / 48px desktop. Uses the
            desk-* variants rather than sm: so a short desktop (MacBook 14")
            stays compressed instead of both rules matching at ≥640px. */}
        <div
          className="enter mt-3 flex w-full max-w-[500px] flex-col items-stretch gap-3 desk-tall:mt-6 desk-tall:gap-5 desk-short:mt-4 desk-short:gap-4"
          style={{ "--enter-delay": "0.12s" } as React.CSSProperties}
        >
          {/* Search + primary CTA. Shown at every width: the search box is the
              hero's main gesture, so mobile keeps it rather than falling back
              to a plain button. */}
          <form
            className="flex h-[54px] w-full items-center overflow-hidden rounded-[73.26px] border border-white/40 bg-[#f6f3ec]/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_12px_34px_rgba(0,0,0,0.18)] backdrop-blur-lg sm:h-[58px]"
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
              className="h-full min-w-0 flex-1 bg-transparent pl-5 pr-2 font-body text-[15px] font-normal leading-[110%] text-[#251f21] outline-none placeholder:text-[#251f21] sm:pl-7 sm:pr-4 sm:text-[16px]"
            />
            <button
              type="submit"
              className="flex h-full shrink-0 items-center justify-center gap-1.5 rounded-full bg-brand-orange px-4 font-body text-[15px] font-bold leading-[110%] text-[#f6f3ec] btn-grad btn-grad-orange active:scale-[0.98] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_12px_34px_rgba(239,114,0,0.55)] sm:gap-3 sm:px-8 sm:text-[16px]"
              style={{ transition: BTN_GRAD_PRESS_TRANSITION }}
            >
              Hear it live
              <svg
                width="8"
                height="17"
                viewBox="0 0 19 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
                /* Optical nudge: "Hear it live" has no descenders, so its
                   visual mass sits above the centre of the line box. From sm
                   up the text box (17.6px) is taller than the chevron (17px)
                   and centring it geometrically reads as ~1px low. */
                className="shrink-0 sm:-translate-y-px"
              >
                <path d="M3 4l13 16-13 16" />
              </svg>
            </button>
          </form>

          {/* Secondary CTA — auto width at every size so it reads as the
              quieter of the two actions, the way it does on desktop. */}
          <BookDemoButton
            className="mt-1 flex h-[50px] w-auto items-center justify-center self-center rounded-full bg-[#1c1917]/85 px-8 text-[16px] font-semibold text-cream shadow-lg backdrop-blur-md btn-grad btn-grad-blue sm:mt-4 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_12px_34px_rgba(79,84,144,0.55)]"
            style={{ transition: BTN_GRAD_PRESS_TRANSITION }}
          >
            Talk to our team
          </BookDemoButton>
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
