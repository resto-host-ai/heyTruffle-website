"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Case = {
  name: string;
  location?: string;
  value: string;
  metric: string;
  desc: string;
  image: string;
  bg: string; // active / centered
  bgIdle: string; // dimmed when off to the side
  accent: string;
};

const CASES: Case[] = [
  {
    name: "Rreal tacos",
    location: "Atlanta, 12 locations",
    value: "5.513",
    metric: "Calls recovered in one month.",
    desc: "Reservations, orders and catering that would have gone unanswered.",
    image: "/images/case-rreal.webp",
    bg: "#f4efe3",
    bgIdle: "#cfcabf",
    accent: "#ef7200",
  },
  {
    name: "Baires Grill",
    value: "4x",
    metric: "A normal night, in a single evening.",
    desc: "Every call answered while the team stayed on the floor.",
    image: "/images/case-baires.webp",
    bg: "#eae6dc",
    bgIdle: "#c8c5bf",
    accent: "#a05fc4",
  },
];

// Each card fills the full carousel width — one case study in view at a time,
// no peek of the next. Gap is added on top in the transform.
const BASIS = 100; // %
const GAP = 16; // px (matches gap-4)

export default function CaseStudies() {
  const [index, setIndex] = useState(0);
  const prev = () => setIndex((i) => (i - 1 + CASES.length) % CASES.length);
  const next = () => setIndex((i) => (i + 1) % CASES.length);

  return (
    <section className="relative overflow-hidden bg-[#251f21] py-24 md:py-32">
      {/* warm ambient glow on the left */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full opacity-70 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(239,114,0,0.45) 0%, rgba(213,146,243,0.22) 45%, transparent 72%)",
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-10">
        <h2 className="text-center font-serif text-4xl text-cream md:text-5xl">
          Success you can measure.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-cream/60 md:text-base">
          From independent restaurants to multi-location groups, these are the
          outcomes our partners are seeing.
        </p>

        {/* Carousel */}
        <div className="relative mt-14">
          {/* soft glow behind the active card, in its accent colour */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-4 rounded-[36px] opacity-30 blur-3xl transition-colors duration-500"
            style={{ backgroundColor: CASES[index].accent }}
          />
          <div className="relative overflow-hidden">
          <div
            className="flex gap-4 transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(calc(${-index} * (${BASIS}% + ${GAP}px)))`,
            }}
          >
            {CASES.map((c, i) => (
              <article
                key={c.name}
                className="relative flex w-full shrink-0 grow-0 basis-full flex-col overflow-hidden rounded-[28px] shadow-[0_24px_60px_rgba(0,0,0,0.35)] transition-colors duration-500 ease-out md:min-h-[400px] md:flex-row"
                style={{ backgroundColor: i === index ? c.bg : c.bgIdle }}
              >
                {/* Text */}
                <div className="relative z-10 flex flex-col justify-center p-8 md:w-1/2 md:p-12">
                  <h3 className="text-2xl text-[#251f21] md:text-3xl">
                    {c.name}
                  </h3>
                  {c.location && (
                    <p className="mt-1 text-sm text-[#251f21]/60">
                      {c.location}
                    </p>
                  )}
                  <p
                    className="mt-8 font-light leading-none text-6xl md:mt-10 md:text-8xl"
                    style={{ color: c.accent }}
                  >
                    {c.value}
                  </p>
                  <p
                    className="mt-5 text-xl leading-tight md:text-2xl"
                    style={{ color: c.accent }}
                  >
                    {c.metric}
                  </p>
                  <p className="mt-3 max-w-sm text-sm leading-snug text-[#251f21]/75 md:text-base">
                    {c.desc}
                  </p>
                </div>

                {/* Image — pinned top-to-bottom so it always fills the card (no gaps),
                    with a soft shadow cast onto the text panel */}
                <div className="relative h-52 w-full overflow-hidden md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-1/2 md:rounded-l-[28px] md:shadow-[-18px_0_36px_rgba(0,0,0,0.25)]">
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    quality={100}
                    sizes="(max-width: 768px) 90vw, 45vw"
                    className="scale-[1.03] object-cover"
                  />
                </div>
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
            className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:border-cream/50 hover:bg-cream/10"
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
            {CASES.map((c, i) => (
              <button
                key={c.name}
                type="button"
                aria-label={`Show ${c.name}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
                className={`h-2.5 w-2.5 rounded-full transition-all ${
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
            className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:border-cream/50 hover:bg-cream/10"
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
        <div className="mt-12 flex justify-center">
          <Link
            href="/case-study"
            className="rounded-full bg-brand-orange px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-[#d96700]"
          >
            See all case studies
          </Link>
        </div>
      </div>
    </section>
  );
}
