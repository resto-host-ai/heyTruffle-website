"use client";

import Image from "next/image";
import { NOISE } from "@/lib/noise";

const STATS = [
  {
    title: "Calls recovered",
    value: "5,513",
    desc: "Reservations, orders and catering that would have gone unanswered.",
    color: "#943e72",
    wide: false,
  },
  {
    title: "Host hours saved",
    value: "~522",
    desc: "Your team back on the floor, not on the phone.",
    color: "#2f3d7c",
    wide: false,
  },
  {
    title: "Assisted revenue",
    value: "~$52,900",
    desc: "Generate in May from large parties reservations.",
    color: "#ef7200",
    wide: true,
  },
];

export default function ResultsSection() {
  return (
    <section className="relative overflow-hidden bg-[#251f21] pb-28 pt-24 md:pb-40 md:pt-28">
      {/* gradiante2.webp background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, #000 8%, #000 78%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, #000 8%, #000 78%, transparent 100%)",
        }}
      >
        <Image
          src="/images/gradiante2.webp"
          alt=""
          fill
          loading="lazy"
          quality={100}
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="relative mx-auto w-full px-6 lg:px-[73px]">
        {/* ---- The results speak for themselves ---- */}
        <h2 className="reveal reveal-up text-center font-serif text-[40px] font-bold! leading-[110%] text-cream md:text-[52px] lg:text-[64px]">
          The results speak for themselves.
        </h2>
        <p className="mt-8 text-center font-body text-[26px] font-normal leading-[140%] text-cream">
          Rreal Tacos&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;&nbsp;12
          locations&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;&nbsp;May 16 2026
        </p>

        <div className="mt-20 grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.7fr)]">
          {STATS.map((stat) => (
            <div key={stat.title} className="relative">
              <div
                className="relative flex h-full min-h-[240px] flex-col overflow-hidden rounded-3xl p-7 md:h-[470px] md:p-8"
                style={{
                  backgroundImage: `linear-gradient(180deg, #251f21 4%, ${stat.color} 115%)`,
                }}
              >
                {/* grain */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
                  style={{ backgroundImage: NOISE }}
                />
                <div className="relative flex h-full flex-col items-center text-center md:items-start md:text-left">
                  <h3 className="font-body text-[28px] font-normal! leading-[120%] text-cream md:text-[40px]">
                    {stat.title}
                  </h3>
                  <p className="mt-6 font-body text-[64px] font-normal leading-[110%] text-cream md:mt-auto md:text-[clamp(48px,6.6vw,124px)]">
                    {stat.value}
                  </p>
                  <p className="mt-auto max-w-[20rem] pt-8 font-body text-[26px] font-normal leading-[140%] text-cream">
                    {stat.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center font-body text-[28px] font-normal leading-[120%] text-cream md:text-[40px]">
          Born inside Rreal Tacos from operators to operators.
        </p>

      </div>
    </section>
  );
}
