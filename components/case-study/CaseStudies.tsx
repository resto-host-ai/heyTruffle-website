"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { formatValue } from "@/lib/format";

type Case = {
  name: string;
  location?: string;
  value: string | number;
  metric: string;
  desc: string;
  image?: string;
  /** Testimonial clip shown instead of the still, same asset as Testimonials. */
  vimeoId?: string;
  posterUrl?: string;
  bg: string; // active / centered
  bgIdle: string; // dimmed when off to the side
  accent: string;
};

const CASES: Case[] = [
  {
    name: "Rreal tacos",
    location: "Atlanta, 12 locations",
    value: 5513,
    metric: "Calls recovered in one month.",
    desc: "Reservations, orders and catering that would have gone unanswered.",
    image: "/images/case-rreal.webp",
    vimeoId: "1163753938",
    posterUrl: "/testimonials/rreal-poster.webp",
    bg: "#f4efe3",
    bgIdle: "#cfcabf",
    accent: "#ef7200",
  },
  {
    name: "Mojitos",
    value: "4x",
    metric: "A normal night, in a single evening.",
    desc: "Every call answered while the team stayed on the floor.",
    image: "/images/mojitos.webp",
    vimeoId: "1163755952",
    // Luis Fernandez's Mojitos still — the "lima" in the filename is a
    // historical misnomer, the asset itself is the Mojitos testimonial.
    posterUrl: "/testimonials/lima-poster.webp",
    bg: "#eae6dc",
    bgIdle: "#c8c5bf",
    accent: "#a05fc4",
  },
];

/* Carousel geometry lives in CSS custom properties (--basis / --peek) set on
   the track with responsive classes, because it differs per breakpoint: on
   phones the active card takes the full width (no peek); from md the card is
   76% of the track with the neighbours peeking in at both edges, --peek being
   the leftover per side: (100 − basis) / 2. */
const GAP = 24; // px (matches gap-6)

export default function CaseStudies({
  heading = "Success you can measure.",
  subtitle = "From independent restaurants to multi-location groups, these are the outcomes our partners are seeing.",
  showCta = true,
  cases = CASES,
  transparent = false,
}: {
  heading?: string;
  subtitle?: string | null;
  showCta?: boolean;
  cases?: Case[];
  transparent?: boolean;
} = {}) {
  const [index, setIndex] = useState(0);
  /* Which case study's clip is playing, by name. Cleared whenever the carousel
     moves so a video never keeps running off-screen. */
  const [playingId, setPlayingId] = useState<string | null>(null);
  const goTo = (updater: (i: number) => number) => {
    setPlayingId(null);
    setIndex(updater);
  };
  const prev = () => goTo((i) => (i - 1 + cases.length) % cases.length);
  const next = () => goTo((i) => (i + 1) % cases.length);

  /* Touch swipe (arrows are hidden on phones). The track follows the finger
     live via dragX, then a ±50px threshold on release commits the move — the
     same goTo the arrows use, so a playing video still stops. Vertical intent
     is ignored so page scrolling over the card keeps working. */
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const [dragX, setDragX] = useState(0);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchMove = (e: React.TouchEvent) => {
    const start = touchStart.current;
    if (!start) return;
    const dx = e.touches[0].clientX - start.x;
    const dy = e.touches[0].clientY - start.y;
    if (Math.abs(dx) > Math.abs(dy)) setDragX(dx);
  };
  const onTouchEnd = () => {
    touchStart.current = null;
    setDragX(0);
    if (dragX < -50) next();
    else if (dragX > 50) prev();
  };

  return (
    <section
      className={`relative overflow-hidden py-10 md:py-16 ${
        transparent ? "" : "bg-[#251f21]"
      }`}
    >
      {/* warm ambient glow on the left */}
      {!transparent && (
        <div
          aria-hidden
          /* Already a radial gradient — the extra 120px blur on top only
             costs (a big filtered layer); phones skip the blur, md+ keeps it. */
          className="pointer-events-none absolute -left-40 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full opacity-70 md:blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(239,114,0,0.45) 0%, rgba(213,146,243,0.22) 45%, transparent 72%)",
          }}
        />
      )}

      <div className="relative mx-auto w-full px-6 lg:px-[73px]">
        <h2 className="reveal reveal-up text-center font-serif text-[30px] font-bold! leading-[110%] text-cream md:text-[38px] lg:text-[44px]">
          {heading}
        </h2>
        {subtitle && (
          <p className="reveal reveal-up font-body mx-auto mt-4 max-w-2xl text-center text-[16px] font-normal leading-[145%] text-cream md:text-[18px]" style={{ "--reveal-delay": "0.08s" } as React.CSSProperties}>
            {subtitle}
          </p>
        )}

        {/* Carousel */}
        {/* Capped width: at full container width the card ran ~1780px across
            for 400px tall (4.4:1), which read as a stretched band rather than a
            card. 1200px puts it near 3:1 and leaves the video panel close to
            3:2. */}
        <div
          data-mobile-motion="scale"
          className="relative mx-auto mt-10 max-w-[1450px]"
        >
          {/* soft glow behind the active card, in its accent colour */}
          <div
            aria-hidden
            /* md+ only: a viewport-wide blurred layer that re-rasterizes on
               every accent-colour transition is pure tile pressure on iOS. */
            className="pointer-events-none absolute -inset-4 hidden rounded-[36px] opacity-30 blur-3xl transition-colors duration-500 md:block"
            style={{ backgroundColor: cases[index].accent }}
          />
          {/* No overflow-hidden here: the peeking neighbours must run past this
              wrapper to the viewport edge, where the section root (which does
              clip) cuts them — like the reference design. */}
          <div
            className="relative touch-pan-y"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
          <div
            className={`flex gap-6 ease-out [--basis:100%] [--peek:0%] md:[--basis:76%] md:[--peek:12%] ${
              dragX ? "" : "transition-transform duration-500"
            }`}
            style={{
              transform: `translateX(calc(var(--peek) - ${index} * (var(--basis) + ${GAP}px) + ${dragX}px))`,
            }}
          >
            {cases.map((c, i) => (
              <article
                key={c.name}
                /* The card was already dimmed via bgIdle; the opacity I added on top
                   also faded the drop shadow, which left a pale halo around the
                   peeking card. Dimming stays with bgIdle, and only the active
                   card casts a shadow. */
                className={`relative flex w-full shrink-0 grow-0 basis-[var(--basis)] flex-col overflow-hidden rounded-[28px] transition-[background-color,box-shadow] duration-500 ease-out md:h-[clamp(330px,calc(28.93vw-42.2px),420px)] md:flex-row md:transform-gpu ${
                  i === index ? "shadow-[0_18px_36px_-12px_rgba(0,0,0,0.55)]" : ""
                }`}
                style={{ backgroundColor: i === index ? c.bg : c.bgIdle }}
              >
                {/* Text */}
                {/* flex-1 on phones: the track's default align-items stretch equalises
                    both cards to the tallest one, and the media panel's height is
                    fixed by its aspect ratio — so any surplus used to surface as a
                    bare strip of card background under the video. Letting the text
                    block grow absorbs that surplus instead (it's justify-center, so
                    it just gains breathing room). md is a row layout with a fixed
                    card height, so it opts out. */}
                <div className="relative z-10 flex flex-1 flex-col justify-center p-6 md:w-1/2 md:flex-none md:p-10">
                  <h3 className="font-body text-[22px] font-normal! leading-[120%] text-[#251f21] md:text-[28px]">
                    {c.name}
                  </h3>
                  {c.location && (
                    <p className="mt-1 font-body text-[15px] font-normal leading-[120%] text-[#251f21]/70 md:text-[16px]">
                      {c.location}
                    </p>
                  )}
                  <p
                    className="mt-4 font-body text-[48px] font-normal leading-[110%] md:mt-8 md:text-[64px] lg:text-[80px]"
                    style={{ color: c.accent }}
                  >
                    {formatValue(c.value)}
                  </p>
                  <p
                    className="mt-3 font-body text-[16px] font-normal leading-[125%] md:mt-4 md:text-[18px]"
                    style={{ color: c.accent }}
                  >
                    {c.metric}
                  </p>
                  <p className="mt-3 max-w-md font-body text-[16px] font-normal leading-[145%] text-[#251f21]/80 md:text-[18px]">
                    {c.desc}
                  </p>
                </div>

                {/* Image (or an accent gradient when a photo isn't available),
                    pinned top-to-bottom so it always fills the card */}
                {c.vimeoId ? (
                  <div className="relative aspect-[2328/1772] w-full overflow-hidden md:absolute md:inset-y-0 md:right-0 md:aspect-auto md:h-auto md:w-1/2 md:flex-none">
                    {playingId === c.name ? (
                      <iframe
                        src={`https://player.vimeo.com/video/${c.vimeoId}?autoplay=1&title=0&byline=0&portrait=0&dnt=1`}
                        title={`${c.name} testimonial`}
                        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                        allowFullScreen
                        className="absolute inset-0 h-full w-full border-0"
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => setPlayingId(c.name)}
                        aria-label={`Play the ${c.name} testimonial`}
                        className="group/play absolute inset-0 block h-full w-full border-0 p-0"
                      >
                        <Image
                          src={c.posterUrl ?? c.image!}
                          alt=""
                          fill
                          quality={75}
                          sizes="(max-width: 768px) 90vw, 45vw"
                          className="object-cover object-left"
                        />
                        {/* Play affordance only — the poster already carries
                            the quote and attribution. */}
                        <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover/play:scale-110">
                          {/* Nudged right: a right-pointing triangle's centroid
                              sits ~2.6px left of its bounding-box centre, so
                              centring the box leaves it looking off. */}
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
                ) : c.image ? (
                  <div className="relative aspect-[2328/1772] w-full overflow-hidden md:absolute md:inset-y-0 md:right-0 md:aspect-auto md:h-auto md:w-1/2 md:flex-none">
                    <Image
                      src={c.image}
                      alt={c.name}
                      fill
                      quality={75}
                      sizes="(max-width: 768px) 90vw, 45vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className="relative aspect-[2328/1772] w-full overflow-hidden md:absolute md:inset-y-0 md:right-0 md:aspect-auto md:h-auto md:w-1/2 md:flex-none"
                    style={{
                      backgroundImage: `radial-gradient(120% 120% at 65% 25%, ${c.accent} 0%, #2a2224 60%, #1e1a1c 100%)`,
                    }}
                  />
                )}
              </article>
            ))}
          </div>
          </div>
        </div>

        {/* Controls — prev arrow, dots, next arrow */}
        <div className="mt-8 flex items-center justify-center gap-5">
          <button
            type="button"
            aria-label="Previous case study"
            onClick={prev}
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-cream/25 text-cream transition-[border-color,background-color,scale] duration-[140ms] ease-[var(--ease-out-strong)] hover:border-cream/50 hover:bg-cream/10 active:scale-95 md:flex"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <div className="flex gap-2.5">
            {cases.map((c, i) => (
              <button
                key={c.name}
                type="button"
                aria-label={`Show ${c.name}`}
                aria-current={i === index}
                onClick={() => goTo(() => i)}
                className={`h-2.5 w-2.5 rounded-full transition-[background-color,scale] duration-[140ms] ease-[var(--ease-out-strong)] active:scale-95 ${
                  i === index
                    ? "bg-brand-orange"
                    : "bg-cream/25 hover:bg-cream/40"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Next case study"
            onClick={next}
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-cream/25 text-cream transition-[border-color,background-color,scale] duration-[140ms] ease-[var(--ease-out-strong)] hover:border-cream/50 hover:bg-cream/10 active:scale-95 md:flex"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* CTA */}
        {showCta && (
          <div className="mt-12 flex justify-center">
            <Link
              href="/case-study/"
              className="inline-flex h-[50px] items-center justify-center gap-2.5 rounded-full border border-transparent bg-brand-orange px-8 font-body text-[16px] font-bold leading-[110%] text-cream transition-all duration-300 hover:[background:linear-gradient(180deg,#ae6a31_0%,#8f501e_100%)_padding-box,linear-gradient(180deg,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0.12)_45%,rgba(255,255,255,0.04)_100%)_border-box] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_18px_44px_rgba(0,0,0,0.28)]"
            >
              See all case studies
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
