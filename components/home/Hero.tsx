import { BookDemoButton } from "@/components/ui/BookDemoButton";
import HeroBackground from "@/components/home/HeroBackground";
import HeroSearch from "@/components/home/HeroSearch";
import HeroHosts from "@/components/home/HeroHosts";
import { getCtaVariant } from "@/lib/cta-variant";
import { ClarityVariantTag } from "@/components/ClarityVariantTag";

/**
 * Hero — a Server Component, deliberately. It used to be a Client Component
 * because of the search box, which meant the LCP element (the headline) sat
 * inside a hydration boundary and could not settle until React had walked the
 * whole hero. The interactive part now lives in HeroSearch; everything here is
 * static markup that ships as HTML and stays that way.
 */
export default async function Hero() {
  const { variant, label } = await getCtaVariant();

  // Mobile paddings/type are compressed so the whole stack (logo →
  // "Talk to our team") fits a ~660px svh phone viewport with browser
  // chrome visible — the secondary CTA was falling below the fold.
  return (
    <section className="relative isolate flex min-h-[100vh] h-auto w-full flex-col items-center overflow-clip">
      {/* Animated gradient background (Figma living-gradient) */}
      <HeroBackground />

      {/* Bottom fade into the shared ink canvas of the next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-[5] h-56 bg-gradient-to-b from-transparent to-ink"
      />


      {/* Content — anchored so the top of the host player peeks
          in at the bottom of the first screen, as in the Figma.
          relative z-10: iOS Safari would sometimes paint the animated
          background layer over unpositioned content on first load, leaving
          only the search bar and player (which have their own layers)
          visible. Its own stacking layer keeps the copy on top. */}
      <div className="relative z-10 flex w-full flex-col items-center justify-end gap-5 px-6 pt-[164px] text-center text-cream desk-tall:gap-6 desk-tall:pt-28 desk-short:gap-4 desk-short:pt-28 md:min-h-[calc(100svh-330px)] md:pt-24">
        {/* Headline — the page's single H1. */}
        <h1 className="m-0 max-w-[1000px] font-serif text-[32px] font-bold! leading-[105%] tracking-tight text-cream sm:max-w-[calc(1000*var(--fx))] sm:text-[calc(72*var(--fx))]">
          Grow sales from <br/> the calls you already get.
        </h1>

        {/* Subtitle */}
        <p className="font-body w-full max-w-[800px] text-[16px] font-normal leading-[150%] text-cream/90 sm:max-w-[calc(800*var(--fx))] sm:text-[calc(20*var(--fx))]">
          A fully managed AI Concierge that books reservations, takes orders
          and handles catering. Trained for your brand, run by our team. 
          Free to try. No sign-up. Under 30 seconds.
        </p>

        {/* Search + primary CTA, with "Talk to our team" beside it.
            Extra top margin on top of the parent gap sets the copy apart from
            the CTAs. Uses the desk-* variants rather than sm: so a short
            desktop (MacBook 14") stays compressed. */}
        <div className="mt-3 flex w-full max-w-[500px] flex-col items-stretch gap-3 desk-tall:mt-6 desk-tall:gap-5 desk-short:mt-4 desk-short:gap-4 sm:max-w-[720px] sm:flex-row sm:items-center">
          {/* Search + primary CTA. Shown at every width: the search box is the
              hero's main gesture, so mobile keeps it rather than falling back
              to a plain button. Results drop down inline, in the page, right
              below the bar — no modal takeover. */}
          <HeroSearch ctaLabel={label} />
        </div>

      </div>

      {/* Host player */}
      <HeroHosts />

      <ClarityVariantTag variant={variant} />
    </section>
  );
}
