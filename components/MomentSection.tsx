"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type CardState = { x: number; y: number; rot: number; op: number };

const CARDS: {
  src: string;
  alt: string;
  z: number;
  /** Progress window [start, end] over which the card animates to `final`. */
  range: [number, number];
  enter: CardState;
  final: CardState;
}[] = [
  {
    src: "/images/img1.webp",
    alt: "A party of six just walked in, no reservation.",
    z: 10,
    range: [0.1, 1],
    enter: { x: 0, y: 0, rot: 0, op: 1 },
    final: { x: -300, y: -24, rot: -10, op: 1 },
  },
  {
    src: "/images/img2.webp",
    alt: "The kitchen is calling for table 12.",
    z: 20,
    range: [0.1, 0.55],
    enter: { x: 30, y: 560, rot: 10, op: 0 },
    final: { x: 0, y: 6, rot: -3, op: 1 },
  },
  {
    src: "/images/img3.webp",
    alt: "And the phone is ringing. Again.",
    z: 30,
    range: [0.5, 0.92],
    enter: { x: 90, y: 600, rot: 16, op: 0 },
    final: { x: 300, y: 28, rot: 8, op: 1 },
  },
];

const clamp = (n: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, n));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function MomentSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const section = sectionRef.current;
      if (!section) return;

      // Desktop only: pin + stack. On mobile the cards just stack in flow.
      const isDesktop = window.innerWidth >= 768;

      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const p = total > 0 ? clamp(-rect.top / total) : 0;

      CARDS.forEach((card, i) => {
        const el = cardRefs.current[i];
        if (!el) return;
        if (!isDesktop) {
          el.style.transform = "";
          el.style.opacity = "";
          return;
        }
        const [r0, r1] = card.range;
        const t = easeOut(clamp((p - r0) / (r1 - r0)));
        const x = lerp(card.enter.x, card.final.x, t);
        const y = lerp(card.enter.y, card.final.y, t);
        const rot = lerp(card.enter.rot, card.final.rot, t);
        const op = lerp(card.enter.op, card.final.op, t);
        el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${rot}deg)`;
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
    <section ref={sectionRef} className="relative pb-8 pt-8 md:h-[320vh] md:pb-0 md:pt-0">
      {/* Pinned viewport (desktop). Normal flow on mobile.
          overflow-hidden clips the fanned cards + glows to the viewport. */}
      <div className="relative md:sticky md:top-0 md:h-screen md:overflow-hidden">
        {/* Color glows: cream on the left, orange on the right */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-12%] top-[55%] h-[620px] w-[620px] -translate-y-1/2 rounded-full bg-[#f6f3ec] opacity-[0.12] blur-[130px]" />
          <div className="absolute right-[-10%] top-[62%] h-[620px] w-[620px] -translate-y-1/2 rounded-full bg-[#ef7200] opacity-[0.28] blur-[130px]" />
        </div>

        <div className="relative mx-auto flex h-full max-w-[1280px] flex-col px-6">
          <div className="pt-4 md:pt-24">
            <h2 className="reveal reveal-up text-center font-serif text-4xl text-[#ef7200] md:text-5xl lg:text-6xl">
              You know this moment.
            </h2>
            <p
              className="reveal reveal-up mt-3 text-center text-sm text-cream/70"
              style={{ "--reveal-delay": "0.08s" } as React.CSSProperties}
            >
              Friday 7:48 pm
            </p>
          </div>

          {/* Cards: absolute + scroll-stacked on md; stacked in flow on mobile. */}
          <div className="relative mt-12 flex flex-1 flex-col items-center gap-7 md:mt-0 md:block">
            {CARDS.map((card, i) => (
              <div
                key={card.src}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                style={{ zIndex: card.z }}
                className="aspect-[2784/2011] w-[90%] max-w-[480px] will-change-transform md:absolute md:left-1/2 md:top-1/2 md:w-[620px] md:max-w-none lg:w-[680px]"
              >
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 768px) 90vw, 680px"
                  className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Closing line — appears as the pinned scroll releases on desktop */}
      <div className="relative mx-auto max-w-[1280px] px-6 pb-4 md:absolute md:inset-x-0 md:bottom-14">
        <p className="reveal reveal-up text-center text-sm text-cream/70">
          Your host can be on the floor, or on the phone.{" "}
          <span className="font-bold text-cream">Not both.</span>
        </p>
      </div>
    </section>
  );
}
