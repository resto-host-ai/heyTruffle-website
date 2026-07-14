"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Mobile: stacked full-width cards (readable text). md+: original scattered
// absolute layout (mdPos is md-prefixed so it only kicks in from md up).
const CARDS = [
  {
    src: "/images/img1.webp",
    alt: "A party of six just walked in, no reservation.",
    mdPos: "md:left-[0%] md:top-0 md:w-[48%] md:z-10",
    align: "self-start",
  },
  {
    src: "/images/img2.webp",
    alt: "The kitchen is calling for table 12.",
    mdPos: "md:left-[26%] md:top-[38%] md:w-[48%] md:z-20",
    align: "self-end",
  },
  {
    src: "/images/img3.webp",
    alt: "And the phone is ringing. Again.",
    mdPos: "md:left-[51%] md:top-[62%] md:w-[50%] md:z-30",
    align: "self-center",
  },
];

export default function MomentSection() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden pb-8 pt-8 md:pb-12 md:pt-10">
      {/* Color glows: cream on the left, orange on the right */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-12%] top-[55%] h-[620px] w-[620px] -translate-y-1/2 rounded-full bg-[#f6f3ec] opacity-[0.12] blur-[130px]" />
        <div className="absolute right-[-10%] top-[62%] h-[620px] w-[620px] -translate-y-1/2 rounded-full bg-[#ef7200] opacity-[0.28] blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-6">
        <h2 className="text-center font-serif text-4xl text-[#ef7200] md:text-5xl lg:text-6xl">
          You know this moment.
        </h2>
        <p className="mt-3 text-center text-sm text-cream/70">Friday 7:48 pm</p>

        {/* Cards — stacked & large on mobile, scattered on md+.
            Thrown up from below as they scroll in. */}
        <div
          ref={cardsRef}
          className="relative mx-auto mt-12 flex w-full max-w-[1040px] flex-col items-center gap-7 md:block md:aspect-[104/98] md:gap-0"
        >
          {CARDS.map((card, i) => (
            <div
              key={card.src}
              className={`aspect-[2784/2011] w-[90%] max-w-[460px] will-change-transform md:absolute md:max-w-none ${card.align} ${card.mdPos}`}
              style={{
                transform: shown
                  ? "translateY(0) scale(1)"
                  : "translateY(160px) scale(0.94)",
                opacity: shown ? 1 : 0,
                transition: `transform 1s cubic-bezier(0.16, 1, 0.3, 1) ${
                  i * 0.16
                }s, opacity 0.7s ease-out ${i * 0.16}s`,
              }}
            >
              <Image
                src={card.src}
                alt={card.alt}
                fill
                sizes="(max-width: 1040px) 50vw, 520px"
                className="object-contain"
              />
            </div>
          ))}
        </div>

        <p className="mt-14 text-center text-sm text-cream/70">
          Your host can be on the floor, or on the phone.{" "}
          <span className="font-bold text-cream">Not both.</span>
        </p>
      </div>
    </section>
  );
}
