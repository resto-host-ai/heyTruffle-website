"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

/**
 * OperatorStories — "Trusted by operators" (Figma "Landing 2"): featured case
 * study cards — testimonial video on the left, the headline result and who
 * said it on the right — over the ink canvas washing into celeste at the
 * bottom, then the link to every case study.
 *
 * With more than one story it becomes a swipeable row, full bleed, with the
 * current card centred and the next one peeking in (as in the Figma); dots
 * under it let mouse users move between cards.
 */

type Story = {
  id: string;
  /** Headline split around the highlighted figure */
  headline: [string, string, string];
  person: string;
  role: string;
  image: string;
  /** Extra classes for the still — e.g. to crop text baked into a poster */
  imageClassName?: string;
  youtubeId: string;
  /** Case study page; omitted when there isn't one yet (no "Learn More") */
  href?: string;
};

const STORIES: Story[] = [
  {
    id: "rreal-tacos",
    headline: ["How Rreal Tacos recovered ", "$350k", " they didn’t know they were losing"],
    person: "Miguel Hernandez",
    role: "COO and Owner at Rreal Tacos",
    image: "/images/rrealceo.webp",
    youtubeId: "SQpBZlyokbo",
    href: "/case-study/rreal-tacos/",
  },
  {
    id: "mojitos",
    headline: ["How Mojitos recovered ", "4,000 calls", " in a single month"],
    person: "Luis Fernandez",
    role: "Owner & Operator at Mojitos",
    image: "/testimonials/lima-poster.webp",
    // The poster has the quote and logo printed along its bottom; scaling
    // from the top crops that band out so it doesn't fight the card's own
    // "Play the video" caption.
    imageClassName: "origin-top scale-[1.45] object-top",
    youtubeId: "IBsApAVXPCo"
  },
];

function StoryCard({ story }: { story: Story }) {
  const [playing, setPlaying] = useState(false);
  return (
    <article className="flex w-full shrink-0 snap-center flex-col overflow-hidden rounded-[20px] bg-cream shadow-[0_24px_60px_rgba(0,0,0,0.3)] md:flex-row md:rounded-[calc(24*var(--fx))] md:bg-white">
      {/* Video */}
      <div className="relative aspect-[5/3] w-full shrink-0 overflow-hidden bg-ink md:aspect-auto md:min-h-[calc(517*var(--fx))] md:w-[calc(647*var(--fx))]">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${story.youtubeId}?autoplay=1&modestbranding=1&rel=0&playsinline=1`}
            title={`${story.person} testimonial`}
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media; clipboard-write"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play the video: ${story.person}`}
            className="group absolute inset-0 block h-full w-full"
          >
            <Image
              src={story.image}
              alt=""
              fill
              quality={75}
              sizes="(max-width: 767px) 100vw, 650px"
              className={`object-cover ${story.imageClassName ?? ""}`}
            />
            {/* Keeps the caption legible over a bright photo */}
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 hidden h-1/3 bg-gradient-to-t from-black/50 to-transparent md:block"
            />
            <span className="absolute bottom-5 left-5 hidden font-body text-[15px] text-white md:block md:bottom-[calc(44*var(--fx))] md:left-[calc(46*var(--fx))] md:text-[calc(18*var(--fx))]">
              Play the video
            </span>
            <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-500 bg-ink/60 backdrop-blur-sm transition-transform duration-300 group-hover:scale-105 md:bottom-[calc(40*var(--fx))] md:left-auto md:right-[calc(40*var(--fx))] md:top-auto md:translate-x-0 md:translate-y-0 md:h-[calc(68*var(--fx))] md:w-[calc(68*var(--fx))]">
              <svg viewBox="0 0 18 20" aria-hidden className="h-4 w-[14px] translate-x-[2px] fill-white md:h-5 md:w-[18px]">
                <path d="M17 10L0.5 19.5V0.5L17 10Z" />
              </svg>
            </span>
          </button>
        )}
      </div>

      {/* Result */}
      <div className="flex flex-1 flex-col justify-between gap-5 border p-5 font-body text-ink md:gap-8 md:px-[calc(60*var(--fx))] md:pb-[calc(36*var(--fx))] md:pt-[calc(50*var(--fx))]">
        <h3 className="font-serif text-[24px] font-normal! leading-[1.25] md:font-body md:text-[calc(44*var(--fx))] md:font-medium! md:leading-[1.2]">
          {story.headline[0]}
          <span className="md:text-brand-orange">{story.headline[1]}</span>
          {story.headline[2]}
        </h3>
        <div className="border-t border-ink/25 pt-4 md:border-ink/40 md:pt-[calc(40*var(--fx))]">
          {/* Mobile: who said it, then Learn More under it. Desktop: side by side. */}
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
            <div className="text-[14px] leading-snug md:text-[calc(18*var(--fx))]">
              <p>{story.person}</p>
              <p className="text-ink/60">{story.role}</p>
            </div>
            {story.href && (
              <Link
                href={story.href}
                className="flex shrink-0 items-center gap-2 text-[15px] font-bold transition-colors hover:text-brand-orange md:gap-3 md:text-[calc(22*var(--fx))]"
              >
                Learn More
                <svg width="10" height="16" viewBox="0 0 10 16" fill="none" aria-hidden>
                  <path d="M2 2l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function OperatorStories() {
  const several = STORIES.length > 1;
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const cards = () => Array.from(trackRef.current?.children ?? []) as HTMLElement[];
  // Centre card i in the track.
  const goTo = (i: number) => {
    const track = trackRef.current;
    const card = cards()[i];
    if (!track || !card) return;
    track.scrollTo({
      left: card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2,
      behavior: "smooth",
    });
  };
  // Whichever card sits closest to the track's centre is the active one.
  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const mid = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    cards().forEach((c, i) => {
      const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
      const bd = Math.abs(cards()[best].offsetLeft + cards()[best].offsetWidth / 2 - mid);
      if (d < bd) best = i;
    });
    setActive(best);
  };

  return (
    <section className="relative w-full overflow-x-clip px-5 pb-20 pt-16 font-body text-cream md:pb-[calc(112*var(--fx))] md:pt-[calc(96*var(--fx))] lg:px-[73px]">
      {/* Celeste wash rising from the bottom edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-[#3164c4] via-[#3164c4]/45 to-transparent"
      />

      <div className="relative mx-auto md:max-w-[calc(1353*var(--fx))]">
        <h2 className="text-center font-serif text-[36px] font-normal! leading-[1.1] md:text-[calc(70*var(--fx))]">
          Trusted by operatores
        </h2>

        <p className="block md:hidden mx-auto mt-4 max-w-[680px] text-center text-[16px] leading-[1.45] text-cream/90 md:mt-[calc(24*var(--fx))] md:max-w-[calc(700*var(--fx))] md:text-[calc(24*var(--fx))]">
          From independent restaurants
          to multi-location groups.
        </p>
        <p className="hidden md:block mx-auto mt-4 max-w-[680px] text-center text-[16px] leading-[1.45] text-cream/90 md:mt-[calc(24*var(--fx))] md:max-w-[calc(700*var(--fx))] md:text-[calc(24*var(--fx))]">
          From independent restaurants to multi-location groups, these are the outcomes our locations are seeing.
        </p>

        {several ? (
          <>
            {/* Full-bleed track: each card is the Figma width (or the screen
                minus gutters on phones), padded so the first and last can
                centre, with the neighbour peeking in at the edge. */}
            <div
              ref={trackRef}
              onScroll={onScroll}
              className="relative left-1/2 mt-10 flex w-screen -translate-x-1/2 snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--edge)] [scrollbar-width:none] md:mt-[calc(70*var(--fx))] md:gap-[calc(40*var(--fx))] [&::-webkit-scrollbar]:hidden [&>article]:w-[var(--card)]"
              style={
                {
                  "--card": "min(calc(1353 * var(--fx)), calc(100vw - 40px))",
                  "--edge": "calc((100vw - var(--card)) / 2)",
                } as React.CSSProperties
              }
            >
              {STORIES.map((s) => (
                <StoryCard key={s.id} story={s} />
              ))}
            </div>
            <div className="mt-6 flex justify-center gap-2.5 md:mt-[calc(32*var(--fx))]">
              {STORIES.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Show the ${s.person} story`}
                  aria-current={i === active}
                  className={`h-2.5 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-cream" : "w-2.5 bg-cream/35 hover:bg-cream/60"
                    }`}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="mt-10 md:mt-[calc(70*var(--fx))]">
            {STORIES.map((s) => (
              <StoryCard key={s.id} story={s} />
            ))}
          </div>
        )}

        <div className="mt-12 flex justify-center md:mt-[calc(60*var(--fx))]">
          <Link
            href="/case-study/"
            className="inline-flex h-[56px] items-center rounded-full bg-brand-orange px-10 text-[18px] font-bold text-cream transition-colors hover:bg-[#C95F00] md:h-[calc(74*var(--fx))] md:px-[calc(44*var(--fx))] md:text-[calc(20*var(--fx))]"
          >
            See all case studies
          </Link>
        </div>
      </div>
    </section>
  );
}
