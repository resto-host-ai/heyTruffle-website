import DemoSearchBar from "@/components/demo/DemoSearchBar";
import { BookDemoButton } from "@/components/ui/BookDemoButton";

/** Rounded CTA card between the tiers and the ROI calculator — reuses the
 *  same search-to-demo flow as the home hero (DemoSearchBar), just with its
 *  own copy and a warm-to-cool gradient card instead of the hero's full
 *  living-gradient background. */
export default function PricingPilotBanner() {
  return (
    <section className="pt-16 ">
      <div className="mx-auto max-w-[1180px] px-6 lg:px-[73px]">
        <div
          className="relative overflow-hidden rounded-[40px] px-5 py-14 text-center sm:px-6 md:px-10 md:py-20"
          style={{
            background:
              "radial-gradient(120% 140% at 0% 0%, rgba(239,114,0,0.55) 0%, transparent 55%), linear-gradient(135deg, #251f21 0%, #1c1917 45%, #171a30 100%)",
          }}
        >
          <h2 className="font-serif text-[24px] font-bold! leading-[110%] text-cream md:text-[38px] lg:text-[44px]">
            Start with a 90 day pilot<span className="text-brand-orange">.</span>
          </h2>
          {/* Shorter on phones — the card's own horizontal padding plus the
              page's already eats into the width the search pill has to work
              with below, so the copy stays terse there instead of also
              fighting the pill for room vertically. */}
          <p className="mx-auto mt-4 max-w-[520px] font-body text-[12px] leading-relaxed text-cream/75 sm:hidden">
            We build an AI Concierge for your restaurant.
          </p>
          <p className="mx-auto mt-4 hidden max-w-[520px] font-body text-[16px] leading-relaxed text-cream/75 sm:block">
            We build an AI Concierge for your restaurant, trained on your
            menu, your hours, and your policies.
          </p>

          {/* -mx-5 cancels the card's own px-5 below sm, so the pill gets the
              exact same width budget the home hero's identical search bar
              gets (page padding only) — otherwise the card's padding stacks
              on top of the page's, and "Search for your restaurant" truncates
              mid-word once the "Build your AI" pill claims its share. Cancels
              back out at sm+, where the card's wider padding leaves enough
              room regardless. */}
          <div className="mx-auto mt-8 w-full sm:max-w-[640px]">
            <div className=" flex flex-col items-stretch gap-3 sm:mx-0 sm:flex-row sm:items-center sm:justify-center ">
              <DemoSearchBar ctaLabel="Build your AI" />
              <BookDemoButton className="flex h-[54px] shrink-0 items-center justify-center  max-w-60 m-auto rounded-full bg-white/15 px-7 font-body text-[15px] font-semibold text-cream transition-colors hover:bg-white/25 sm:h-[58px]">
                Talk to our team
              </BookDemoButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
