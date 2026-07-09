import Image from "next/image";
import { NOISE } from "@/lib/noise";

const STATS = [
  {
    title: "Calls recovered",
    value: "5.513",
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
    value: "~$52.900",
    desc: "Generate in May from large parties reservations.",
    color: "#ef7200",
    wide: true,
  },
];

const STEPS = [
  {
    n: "01",
    title: "We train your AI host.",
    desc: "We learn your menu, hours, policies, tone and integrations in English and Spanish.",
    titleColor: "#f6f3ec",
    circle: "linear-gradient(180deg, #9c5a2a 0%, #3d5c9c 100%)",
    indent: "md:ml-[6%]",
  },
  {
    n: "02",
    title: "It answers every call.",
    desc: "It books reservations, takes pickup and delivery orders directly into your POS, and handles catering, large parties and FAQs.",
    titleColor: "#d592f3",
    circle: "linear-gradient(180deg, #8f4a86 0%, #2f3d7c 100%)",
    indent: "md:ml-[36%]",
  },
  {
    n: "03",
    title: "It knows when to step back.",
    desc: "Some conversations need a human. Your AI host escalates those calls to your team, while we continuously monitor and improve performance every week.",
    titleColor: "#ef7200",
    circle: "linear-gradient(180deg, #bf6a2e 0%, #3d4a8c 100%)",
    indent: "md:ml-[62%]",
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
          maskImage: "linear-gradient(to bottom, transparent 0%, #000 8%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, #000 8%)",
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

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-10">
        {/* ---- The results speak for themselves ---- */}
        <h2 className="text-center font-serif text-4xl text-cream md:text-5xl">
          The results speak for themselves.
        </h2>
        <p className="mt-4 text-center text-sm text-cream/60">
          Rreal Tacos&nbsp;&nbsp;•&nbsp;&nbsp;12 locations&nbsp;&nbsp;•&nbsp;&nbsp;May
          16 2026
        </p>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr_1.7fr]">
          {STATS.map((stat) => (
            <div
              key={stat.title}
              className="relative flex min-h-[240px] flex-col overflow-hidden rounded-3xl p-7 md:min-h-[300px] md:p-8"
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
              <div className="relative flex h-full flex-col">
                <h3 className="text-xl text-cream/95 md:text-2xl">{stat.title}</h3>
                <p className="mt-6 font-light leading-none text-cream text-6xl md:text-7xl">
                  {stat.value}
                </p>
                <p className="mt-auto max-w-[16rem] pt-8 text-sm leading-snug text-cream/80">
                  {stat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-base text-cream/85">
          Born inside Rreal Tacos from operators to operators.
        </p>

        {/* ---- Getting started is simple ---- */}
        <div className="mt-40 md:mt-56">
          <h2 className="text-center font-serif text-4xl leading-tight md:text-5xl">
            <span className="text-cream">Getting started is simple.</span>
            <br />
            <span className="text-[#d592f3]">We handle the hard part.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-center text-sm leading-relaxed text-cream/70 md:text-base">
            We take care of the setup, the training and the ongoing improvements
            so your team can stay focused on running the restaurant.
          </p>

          <div className="mt-24 flex flex-col gap-24 md:mt-32 md:gap-28">
            {STEPS.map((step) => (
              <div key={step.n} className={`max-w-sm ${step.indent}`}>
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-sm font-bold text-cream shadow-[inset_0_2px_2px_rgba(255,255,255,0.5),inset_0_-3px_5px_rgba(0,0,0,0.4),0_5px_14px_rgba(0,0,0,0.35)]"
                  style={{ backgroundImage: step.circle }}
                >
                  {step.n}
                </div>
                <h3
                  className="mt-5 text-2xl md:text-3xl"
                  style={{ color: step.titleColor }}
                >
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/70">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
