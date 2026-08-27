import Image from "next/image";
import Link from "next/link";
import { CASES, type CaseCard } from "@/lib/data/case-studies";

// Tune the loop speed here — lower is faster. Overrides the shared
// `.marquee` class's own 42s (TrustedBy's logos, TeamSection's photos keep
// their own pace; this row can run at a different one without touching
// them).
const MARQUEE_SPEED_SECONDS = 60;

// Six is enough to feel like a real, varied set without the row reading as
// "the whole client list" — /case-study/ is where someone goes for all of
// them (that's what the CTA below is for).
const DEFAULT_COUNT = 6;

/** Infinite right-scrolling strip of case-study cards — same mechanism as
 *  TrustedBy's logo ticker and TeamSection's photo marquee (.marquee class
 *  in globals.css: translateX(0 → -50%), paused on hover, slowed instead of
 *  stopped under prefers-reduced-motion). The track is `cases` doubled, so
 *  by the time a card scrolls off the left edge, its duplicate is already
 *  queued up at the tail end of the row — there's no snap-back reset, it
 *  reads as the same card cycling back around rather than a hard cut. */
export default function CaseStudiesMarquee({
  heading = "Success you can measure.",
  subtitle = "From independent restaurants to multi-location groups, these are the outcomes our partners are seeing.",
  cases = CASES.slice(0, DEFAULT_COUNT),
}: {
  heading?: string;
  subtitle?: string;
  cases?: CaseCard[];
} = {}) {
  const track = [...cases, ...cases];

  return (
    <section className="relative overflow-hidden bg-ink py-16 md:py-24">
      <div className="relative mx-auto w-full px-6 lg:px-[73px]">
        <h2 className="text-center font-serif text-[30px] font-bold! leading-[110%] text-cream md:text-[38px] lg:text-[44px]">
          {heading}
        </h2>
        <p className="font-body mx-auto mt-4 max-w-2xl text-center text-[16px] font-normal leading-[145%] text-cream md:text-[18px]">
          {subtitle}
        </p>
      </div>

      {/* Full-bleed track — breaks out of the page's max-width container the
          same way TeamSection's photo marquee does. */}
      <div className="group relative mt-12 overflow-hidden md:[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div
          className="marquee flex w-max items-stretch gap-8 px-6 lg:px-[73px]"
          style={{ animationDuration: `${MARQUEE_SPEED_SECONDS}s` }}
        >
          {track.map((c, i) => (
            <Link
              key={`${c.name}-${i}`}
              href={c.slug ? `/case-study/${c.slug}/` : "#"}
              aria-hidden={i >= cases.length}
              tabIndex={i >= cases.length ? -1 : undefined}
              className="group/card relative aspect-[5/3] w-80 shrink-0 overflow-hidden rounded-[25px] bg-[#251f21] shadow-[0_14px_40px_rgba(0,0,0,0.25)] transition-shadow duration-300 hover:shadow-[0_22px_54px_rgba(0,0,0,0.35)] md:w-120"
            >
              {/* Image fills the whole card now — no white footer strip. */}
              <Image
                src={c.image}
                alt={`${c.name} — ${c.cuisine} restaurant in ${c.location}`}
                fill
                loading="lazy"
                sizes="320px"
                className="object-cover transition-transform duration-500 group-hover/card:scale-[1.04]"
              />

              {/* Top scrim, full width — keeps the name legible over any photo. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#251f21]/60 to-transparent"
              />
              <p className="absolute right-4 top-4 max-w-[70%] text-right font-body text-[13px] font-bold uppercase leading-[120%] tracking-[0.08em] text-cream">
                {c.name}
              </p>

              {/* Dark blur, bottom-left corner only — not a full-width scrim
                  like the one up top. A blurred solid shape (cheap: one
                  filter, not a backdrop-blur re-rasterizing the photo under
                  it) tucked past the card's own edges so overflow-hidden
                  clips it to just that corner. */}
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-12 -left-12 h-[65%] w-[80%] rounded-full bg-black/80 blur-2xl"
              />

              {/* Stat + location, white now that they sit on the photo. */}
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-2 p-4">
                
                <p>
                  <span className="font-serif text-[26px] font-bold leading-[110%] text-white">
                    {c.stat}
                  </span>{" "}
                  <span className="font-body text-[14px] font-normal text-white/80">
                    {c.statLabel}
                  </span>
                </p>
                <p className="font-body text-[13px] font-normal leading-[140%] text-white/75">
                  {c.cuisine} · {c.locations}{" "}
                  {c.locations === "1" ? "location" : "locations"} · {c.location}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="relative mx-auto mt-12 flex w-full justify-center px-6 lg:px-[73px]">
        <Link
          href="/case-study/"
          className="inline-flex h-[50px] items-center justify-center gap-2.5 rounded-full border border-transparent bg-brand-orange px-8 font-body text-[16px] font-bold leading-[110%] text-cream transition-all duration-300 hover:[background:linear-gradient(180deg,#ae6a31_0%,#8f501e_100%)_padding-box,linear-gradient(180deg,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0.12)_45%,rgba(255,255,255,0.04)_100%)_border-box] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_18px_44px_rgba(0,0,0,0.28)]"
        >
          See all case studies
        </Link>
      </div>
    </section>
  );
}
