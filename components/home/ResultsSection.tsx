import Image from "next/image";
import { NOISE } from "@/lib/noise";

const STATS = [
  {
    title: "Calls recovered",
    value: "5,513",
    desc: "Reservations, orders and catering that would have gone unanswered.",
    color: "#943e72",
  },
  {
    title: "Host hours saved",
    value: "~522",
    desc: "Your team back on the floor, not on the phone.",
    color: "#2f3d7c",
  },
  {
    title: "Assisted revenue",
    value: "~$52,900",
    desc: "Generated in May from large-party reservations.",
    color: "#ef7200",
  },
];

export default function ResultsSection() {
  return (
    <section className="relative overflow-hidden bg-[#251f21] pb-10 pt-10 md:pb-16 md:pt-18">
      {/* gradiante2.webp background. Mask only from md (offscreen composite
          on iOS — see WhatIsSection); phones use plain gradient fades. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 md:[mask-image:linear-gradient(to_bottom,transparent_0%,#000_8%,#000_78%,transparent_100%)] md:[-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,#000_8%,#000_78%,transparent_100%)]"
      >
        <Image
          src="/images/gradiante2.webp"
          alt=""
          fill
          loading="lazy"
          quality={90}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#251f21] to-transparent md:hidden" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#251f21] md:hidden" />
      </div>

      <div className="relative mx-auto w-full px-6 lg:px-[73px]">
        {/* ---- The results speak for themselves ---- */}
        <h2 className="reveal reveal-up text-center font-serif text-[30px] font-bold! leading-[110%] text-cream md:text-[38px] lg:text-[44px]">
          The results speak for themselves.
        </h2>
        {/* Flex + gap rather than runs of &nbsp;: the entities never break,
            so on a narrow screen the line used to overflow instead of wrap. */}
        <p className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center font-body text-[16px] font-normal leading-[140%] text-cream md:gap-x-6 md:text-[18px]">
          <span>Rreal Tacos</span>
          <span aria-hidden className="text-cream/40">&bull;</span>
          <span>12 locations</span>
          <span aria-hidden className="text-cream/40">&bull;</span>
          <span>May 16 2026</span>
        </p>

        <div
          data-mobile-motion="rise"
          className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.7fr)]"
        >
          {STATS.map((stat) => (
            <div key={stat.title} className="relative">
              <div
                className="relative flex h-full min-h-[190px] flex-col overflow-hidden rounded-3xl p-6 md:h-[290px] md:p-7"
                style={{
                  backgroundImage: `linear-gradient(180deg, #251f21 4%, ${stat.color} 115%)`,
                }}
              >
                {/* grain */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-25 md:opacity-40 md:mix-blend-overlay"
                  style={{ backgroundImage: NOISE }}
                />
                <div className="relative flex h-full flex-col items-center text-center md:items-start md:text-left">
                  <h3 className="font-body text-[16px] font-normal! leading-[120%] text-cream md:text-[18px]">
                    {stat.title}
                  </h3>
                  <p className="mt-5 font-body text-[46px] font-normal leading-[110%] text-cream md:mt-auto md:text-[clamp(40px,4.8vw,88px)]">
                    {stat.value}
                  </p>
                  <p className="mt-auto max-w-[20rem] pt-6 font-body text-[16px] font-normal leading-[145%] text-cream md:text-[18px]">
                    {stat.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center font-body text-[22px] font-normal leading-[125%] text-cream md:text-[28px]">
          Born inside Rreal Tacos from operators to operators.
        </p>

      </div>
    </section>
  );
}
