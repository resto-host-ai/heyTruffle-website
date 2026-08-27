import Image from "next/image";
import { BookDemoButton } from "@/components/ui/BookDemoButton";
import HeroBackground from "@/components/home/HeroBackground";
import HeroSearch from "@/components/home/HeroSearch";

/**
 * Hero — a Server Component, deliberately. It used to be a Client Component
 * because of the search box, which meant the LCP element (the headline) sat
 * inside a hydration boundary and could not settle until React had walked the
 * whole hero. The interactive part now lives in HeroSearch; everything here is
 * static markup that ships as HTML and stays that way.
 */
export default function Hero() {
  // Mobile paddings/type are compressed so the whole stack (logo →
  // "Talk to our team") fits a ~660px svh phone viewport with browser
  // chrome visible — the secondary CTA was falling below the fold.
  return (
    <section className="relative isolate flex min-h-[100vh] h-auto w-full items-center justify-center overflow-hidden pb-12 pt-24 desk-tall:pt-32 desk-tall:pb-16 desk-short:items-center-safe desk-short:pt-28 desk-short:pb-12">
      {/* Animated gradient background (Figma living-gradient) */}
      <HeroBackground />

      {/* Bottom fade into the shared ink canvas of the next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-[5] h-56 bg-gradient-to-b from-transparent to-ink"
      />


      {/* Content */}
      <div className="flex flex-col items-center gap-5 px-6 text-center text-cream desk-tall:gap-6 desk-short:gap-4">
        {/* Logo — the page's single H1. Its accessible name (the image alt)
            carries the brand + primary keyword. */}
        <h1 className="m-0 leading-none">
          <Image
            src="/images/icono.svg"
            alt="heytruffle — voice AI for restaurants"
            width={105}
            height={96}
            loading="eager"
            unoptimized
            className="h-12 w-auto sm:h-[60px]"
          />
        </h1>

        {/* Headline — demoted from <h1> to <p> so the logo stays the only H1.
            Sized against the RestoHost scale (h1 caps at 88px there); Gowun
            Batang reads heavier than a sans at the same px, so this sits a
            step below it. */}
        <p className="max-w-[1000px] font-serif text-[38px] font-bold! leading-[110%] tracking-tight text-cream sm:text-[60px] lg:text-[76px]">
          You operate the restaurant.
          <br />
          We operate the phones.
        </p>

        {/* Subtitle — RestoHost sets body copy at 18px max; 20px keeps a bit
            more presence without the 26px that read as oversized. */}
        <p className="font-body w-full max-w-[860px] text-[16px] font-normal leading-[145%] text-cream/85 sm:text-[20px] desk-tall:h-[80px]">
          A fully managed service that answers every call for your restaurants:
          every reservation booked, every order taken, every catering inquiry
          handled.
        </p>

        {/* CTAs — desktop shows the search bar; mobile shows stacked buttons */}
        {/* Extra top margin on top of the parent gap sets the copy apart from
            the CTAs, matching RestoHost's 36px mobile / 48px desktop. Uses the
            desk-* variants rather than sm: so a short desktop (MacBook 14")
            stays compressed instead of both rules matching at ≥640px. */}
        <div className="mt-3 flex w-full max-w-[500px] flex-col items-stretch gap-3 desk-tall:mt-6 desk-tall:gap-5 desk-short:mt-4 desk-short:gap-4 sm:max-w-[720px] sm:flex-row sm:items-center">
          {/* Search + primary CTA. Shown at every width: the search box is the
              hero's main gesture, so mobile keeps it rather than falling back
              to a plain button. Results drop down inline, in the page, right
              below the bar — no modal takeover. */}
          <HeroSearch />

          {/* Secondary CTA — auto width at every size so it reads as the
              quieter of the two actions, the way it does on desktop. */}
          <BookDemoButton className="mt-1 flex h-[50px] w-auto shrink-0 items-center justify-center self-center rounded-full border border-white/40 bg-[#f6f3ec]/10 px-8 text-[16px] font-semibold text-cream shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_12px_34px_rgba(0,0,0,0.18)] backdrop-blur-lg transition-all duration-300 sm:mt-0 sm:h-[54px] sm:self-auto hover:bg-[#f6f3ec]/20">
            Talk to our team
          </BookDemoButton>
        </div>

        {/* Tertiary escape hatch — skips both CTAs above (no restaurant to
            type, no team to talk to yet) and drops straight into the demo
            app's own generic walkthrough. */}
        <p className="font-body text-[14px] font-medium text-cream/70 underline underline-offset-2 transition-colors hover:text-cream">
          Free to try. No sign-up. Under 30 seconds.
        </p>
      </div>
    </section>
  );
}
