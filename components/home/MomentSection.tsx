"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type CardState = { x: number; y: number; rot: number; op: number };

/* Card geometry from Figma (node 1:363 and siblings): a 663x452 frame with a
   36px radius, the photo sitting at 60% opacity behind the copy. The photos
   ship pre-cropped to this exact ratio, so object-cover has nothing left to
   trim. Copy is real text rather than baked into the export — the cards are
   rotated and scaled at runtime, and rasterised type resamples badly through
   a transform (which is what made the previous exports look soft). */
const CARD_W = 663;
const CARD_H = 452;

const CARDS: {
  src: string;
  /** Rendered as real text over the photo; also serves as the image's alt. */
  copy: React.ReactNode;
  alt: string;
  /** Text column width, as a share of the card — matches the Figma text box. */
  textWidth: string;
  z: number;
  /** Progress window [start, end] over which the card animates to `final`. */
  range: [number, number];
  /** Desktop fans the cards out horizontally. */
  enter: CardState;
  final: CardState;
  /** Mobile stacks them straight on top of each other (no horizontal fan). */
  mEnter: CardState;
  mFinal: CardState;
}[] = [
  {
    src: "/images/moment-1.webp",
    alt: "A busy restaurant dining room at peak service",
    copy: (
      <>
        A party of six just walked in,{" "}
        <span className="font-bold">no reservation.</span>
      </>
    ),
    textWidth: "74.7%",
    z: 10,
    range: [0.1, 1],
    enter: { x: 0, y: 0, rot: 0, op: 1 },
    final: { x: -300, y: -49, rot: -10, op: 1 },
    mEnter: { x: 0, y: -90, rot: 0, op: 1 },
    mFinal: { x: 0, y: -124, rot: -5, op: 1 },
  },
  {
    src: "/images/moment-2.webp",
    alt: "Kitchen staff working through a dinner rush",
    copy: (
      <>
        The <span className="font-bold">kitchen is calling</span> for table 12.
      </>
    ),
    textWidth: "61.2%",
    z: 20,
    range: [0.1, 0.55],
    enter: { x: 30, y: 560, rot: 10, op: 0 },
    final: { x: 0, y: -19, rot: -3, op: 1 },
    mEnter: { x: 0, y: 330, rot: 8, op: 0 },
    mFinal: { x: 0, y: -90, rot: 3, op: 1 },
  },
  {
    src: "/images/moment-3.webp",
    alt: "Guests at a candlelit table while a phone rings",
    copy: (
      <>
        And the phone is ringing.
        <br />
        <span className="font-bold">Again.</span>
      </>
    ),
    textWidth: "74.7%",
    z: 30,
    range: [0.5, 0.92],
    enter: { x: 90, y: 600, rot: 16, op: 0 },
    final: { x: 300, y: 3, rot: 8, op: 1 },
    mEnter: { x: 0, y: 350, rot: 12, op: 0 },
    mFinal: { x: 0, y: -56, rot: -4, op: 1 },
  },
];

const clamp = (n: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, n));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// Horizontal / vertical extent (px) the fanned-out cards need on desktop at
// full size — leftmost card edge to rightmost, and top edge to bottom, plus
// breathing room. Used to scale the whole fan down so it never spills past the
// header's content width or climbs over the "Friday 7:48 pm" line. FAN_H is
// deliberately larger than the raw fan height: on short viewports (MacBook 14",
// zoomed-in laptops) it makes the fan shrink and drop sooner so it always
// clears the headline instead of overlapping it. Tall screens stay at scale 1.
const FAN_W = 1320;
const FAN_H = 660;

export default function MomentSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsWrapRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const section = sectionRef.current;
      if (!section) return;

      // Same pin + scroll-stack on every breakpoint; only the card
      // trajectories differ (desktop fans out, mobile stacks straight up).
      const isDesktop = window.innerWidth >= 768;

      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const p = total > 0 ? clamp(-rect.top / total) : 0;

      // Scale the whole desktop fan so it fits within its container — both the
      // header content width and the height of the space below the headline.
      // Mobile cards are full-width by design, so they stay at scale 1.
      const wrap = cardsWrapRef.current;
      const s =
        isDesktop && wrap
          ? clamp(
              Math.min(wrap.clientWidth / FAN_W, wrap.clientHeight / FAN_H),
              0.5,
              1,
            )
          : 1;

      CARDS.forEach((card, i) => {
        const el = cardRefs.current[i];
        if (!el) return;
        const enter = isDesktop ? card.enter : card.mEnter;
        const final = isDesktop ? card.final : card.mFinal;
        const [r0, r1] = card.range;
        const t = easeOut(clamp((p - r0) / (r1 - r0)));
        const x = lerp(enter.x, final.x, t) * s;
        const y = lerp(enter.y, final.y, t) * s;
        const rot = lerp(enter.rot, final.rot, t);
        const op = lerp(enter.op, final.op, t);
        el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${rot}deg) scale(${s})`;
        el.style.opacity = String(op);
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[280vh] md:h-[320vh]">
      {/* Pinned viewport. overflow-hidden clips the fanned/stacked cards +
          glows to the viewport. */}
      <div className="relative sticky top-0 h-screen overflow-hidden">
        {/* Color glows: cream on the left, orange on the right */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-12%] top-[55%] h-[620px] w-[620px] -translate-y-1/2 rounded-full bg-[#f6f3ec] opacity-[0.12] blur-[130px]" />
          <div className="absolute right-[-10%] top-[62%] h-[620px] w-[620px] -translate-y-1/2 rounded-full bg-[#ef7200] opacity-[0.28] blur-[130px]" />
        </div>

        {/* Bottom fade so the glows melt into #251F21 before the section ends
            (avoids a hard clipped edge against the next section) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-[#251f21]"
        />

        <div className="relative mx-auto flex h-full w-full flex-col px-6 lg:px-[73px]">
          <div className="pt-28 md:pt-28">
            <h2 className="reveal reveal-up text-center font-serif text-[30px] font-bold! leading-[110%] text-[#ef7200] md:text-[38px] lg:text-[44px]">
              You know this moment.
            </h2>
            <p
              className="reveal reveal-up mt-3 text-center font-body text-[16px] font-normal leading-[145%] md:text-[18px] text-cream"
              style={{ "--reveal-delay": "0.08s" } as React.CSSProperties}
            >
              Friday 7:48 pm
            </p>
          </div>

          {/* Cards: absolute + scroll-stacked at every breakpoint. The fan is
              scaled in JS to fit this box, so it never exceeds the header
              content width or overlaps the headline above. */}
          <div ref={cardsWrapRef} className="relative flex-1">
            {CARDS.map((card, i) => (
              <div
                key={card.src}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                style={{
                  zIndex: card.z,
                  aspectRatio: `${CARD_W} / ${CARD_H}`,
                  // Pre-hydration state, matching the JS enter state (op is the
                  // same on both trajectories): without it the server render
                  // shows all three cards uncentred and stacked askew until the
                  // bundle arrives.
                  transform: "translate(-50%, -50%)",
                  opacity: card.mEnter.op,
                }}
                /* @container so the copy can be sized in cqw and stay in
                   proportion to the card at every breakpoint, the way it is in
                   Figma (40px of type on a 663px card). */
                className="@container absolute left-1/2 top-1/2 w-full overflow-hidden rounded-[36px] bg-[#251f21] shadow-[0_30px_60px_rgba(0,0,0,0.45)] will-change-transform md:w-[620px] md:max-w-none lg:w-[680px]"
              >
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 680px"
                  className="object-cover opacity-60 blur-[1px]"
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <p
                    style={{ maxWidth: card.textWidth }}
                    className="text-center font-body text-[6.03cqw] leading-[1.2] text-cream [text-shadow:0_2px_4px_rgba(0,0,0,0.4)]"
                  >
                    {card.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Closing line — appears as the pinned scroll releases */}
      <div className="absolute inset-x-0 bottom-6 mx-auto w-full px-6 lg:px-[73px]">
        <p className="reveal reveal-up text-center font-body text-[22px] font-normal leading-[130%] md:text-[28px] text-cream">
          Your host can be on the floor, or on the phone.{" "}
          <span className="font-bold text-cream">Not both.</span>
        </p>
      </div>
    </section>
  );
}
