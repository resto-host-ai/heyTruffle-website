import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { NOISE } from "@/lib/noise";
import { BookDemoButton } from "@/components/BookDemoButton";

const DESCRIPTION =
  "How Rreal Tacos recovered 53,900 calls and protected $2.4M in annualized revenue across 12 Atlanta locations with heytruffle's AI voice host, Nacho.";

export const metadata: Metadata = {
  title: "Case Study: Rreal Tacos — heytruffle",
  description: DESCRIPTION,
  alternates: { canonical: "/case-study/" },
};

/** Headline metrics from the 6-month deployment. */
const STATS = [
  {
    title: "Calls answered",
    value: "138K+",
    desc: "Across 12 Atlanta locations in six months.",
    color: "#943e72",
  },
  {
    title: "Calls recovered",
    value: "53,900",
    desc: "Reservations, orders and catering that used to go unanswered.",
    color: "#2f3d7c",
  },
  {
    title: "Revenue protected",
    value: "$2.4M",
    desc: "Annualized — roughly $110K in new revenue every month.",
    color: "#ef7200",
  },
];

/** Before / after the AI host went live. */
const BEFORE_AFTER = [
  { label: "Answer rate", before: "58%", after: "100%" },
  { label: "Missed-call rate", before: "42% avg · 66% peak", after: "0%" },
  { label: "Monthly revenue leak", before: "$290K", after: "+$110K recovered" },
];

/** What was deployed. */
const SOLUTION = [
  {
    n: "01",
    title: "Custom integrations",
    desc: "Nacho plugs straight into OpenTable for reservations and Toast for takeout and delivery — every booking and order lands in the systems the team already runs.",
    titleColor: "#f6f3ec",
    circle: "linear-gradient(180deg, #9c5a2a 0%, #3d5c9c 100%)",
    indent: "md:ml-[6%]",
  },
  {
    n: "02",
    title: "24/7 coverage",
    desc: "Calls are answered after hours, on holidays and during the lunch rush — confirming reservations, handling FAQs and eliminating the missed calls that used to spike to 66%.",
    titleColor: "#d592f3",
    circle: "linear-gradient(180deg, #8f4a86 0%, #2f3d7c 100%)",
    indent: "md:ml-[36%]",
  },
  {
    n: "03",
    title: "Efficient resolution",
    desc: "Nacho resolves 78% of calls autonomously in a bilingual, Tex-Mex tone. Staff only handle the complex 22% that genuinely needs a human.",
    titleColor: "#ef7200",
    circle: "linear-gradient(180deg, #bf6a2e 0%, #3d4a8c 100%)",
    indent: "md:ml-[62%]",
  },
];

const OPERATIONS = [
  { label: "Peak simultaneous calls", value: "78" },
  { label: "Staff hours saved / month", value: "700" },
  { label: "Monthly call volume", value: "~23K" },
  { label: "Autonomous resolution", value: "78%" },
];

const STACK = [
  { label: "Reservations", value: "OpenTable" },
  { label: "POS", value: "Toast" },
  { label: "Infrastructure", value: "heytruffle" },
];

const ROADMAP = [
  "Catering upselling",
  "Loyalty programs",
  "Multilingual inquiries",
  "Predictive staffing",
];

export default function CaseStudyPage() {
  return (
    <main className="flex-1">
      {/* ---- Hero ---- */}
      <section className="relative overflow-hidden bg-[#251f21] pb-20 pt-32 md:pb-28 md:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            maskImage:
              "linear-gradient(to bottom, #000 0%, #000 60%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 0%, #000 60%, transparent 100%)",
          }}
        >
          <Image
            src="/images/background_gradient.webp"
            alt=""
            fill
            priority
            quality={100}
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="relative mx-auto max-w-[900px] px-6 text-center md:px-10">
          <p className="text-xs uppercase tracking-[0.2em] text-cream/70">
            Case Study · Rreal Tacos
          </p>
          <h1 className="mt-6 font-serif text-4xl leading-tight text-cream md:text-6xl">
            Optimizing customer service{" "}
            <span className="text-[#d592f3]">with Nacho.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[640px] text-base leading-relaxed text-cream/70 md:text-lg">
            12 Atlanta locations · $2.4M annualized revenue protected · a
            six-month deployment of heytruffle&rsquo;s bilingual AI voice host.
          </p>

          {/* Headline stats */}
          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {STATS.map((stat) => (
              <div
                key={stat.title}
                className="relative flex min-h-[220px] flex-col overflow-hidden rounded-3xl p-7 text-left md:p-8"
                style={{
                  backgroundImage: `linear-gradient(180deg, #251f21 4%, ${stat.color} 120%)`,
                }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
                  style={{ backgroundImage: NOISE }}
                />
                <div className="relative flex h-full flex-col">
                  <h3 className="text-lg text-cream/95 md:text-xl">
                    {stat.title}
                  </h3>
                  <p className="mt-5 font-light leading-none text-5xl text-cream md:text-6xl">
                    {stat.value}
                  </p>
                  <p className="mt-auto max-w-[16rem] pt-6 text-sm leading-snug text-cream/80">
                    {stat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- The challenge ---- */}
      <section className="bg-cream">
        <div className="mx-auto max-w-[900px] px-6 py-20 md:px-10 md:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
            The challenge
          </p>
          <h2 className="mt-5 max-w-[720px] font-serif text-3xl leading-tight text-[#251f21] md:text-4xl">
            Before AI, nearly half of every call went unanswered.
          </h2>
          <p className="mt-6 max-w-[680px] text-base leading-relaxed text-[#251f21]/75 md:text-lg">
            Across 12 high-volume Atlanta locations, Rreal Tacos was fielding
            roughly 23,000 calls a month — and missing a huge share of them. A
            42% average missed-call rate spiked to 66% during holidays, quietly
            draining lost orders, unbooked reservations and a poor experience
            for guests who simply couldn&rsquo;t get through.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {BEFORE_AFTER.map((row) => (
              <div
                key={row.label}
                className="rounded-2xl border border-[#251f21]/10 bg-white/70 p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#251f21]/45">
                  {row.label}
                </p>
                <p className="mt-4 text-sm text-[#251f21]/50 line-through">
                  {row.before}
                </p>
                <p className="mt-1 text-xl font-semibold text-brand-orange">
                  {row.after}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- The solution ---- */}
      <section className="relative overflow-hidden bg-[#251f21] py-24 md:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 top-1/3 h-[520px] w-[520px] -translate-y-1/2 rounded-full opacity-70 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(239,114,0,0.4) 0%, rgba(213,146,243,0.2) 45%, transparent 72%)",
          }}
        />

        <div className="relative mx-auto max-w-[1280px] px-6 md:px-10">
          <div className="mx-auto max-w-[720px] text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/60">
              The solution
            </p>
            <h2 className="mt-5 font-serif text-4xl leading-tight text-cream md:text-5xl">
              Three capabilities, deployed as one voice host.
            </h2>
          </div>

          <div className="mt-24 flex flex-col gap-24 md:mt-28 md:gap-28">
            {SOLUTION.map((step) => (
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
      </section>

      {/* ---- Meet Nacho ---- */}
      <section className="bg-cream">
        <div className="mx-auto max-w-[1080px] px-6 py-20 md:px-10 md:py-28">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[auto_1fr]">
            <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-b from-[#f4efe3] to-[#e3ddcd] shadow-[0_18px_40px_rgba(0,0,0,0.12)] md:h-48 md:w-48">
              <Image
                src="/images/nacho.svg"
                alt="Nacho, the AI voice host"
                width={120}
                height={120}
                className="h-24 w-24 md:h-28 md:w-28"
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
                Meet the voice host
              </p>
              <h2 className="mt-5 font-serif text-3xl text-[#251f21] md:text-4xl">
                Nacho answers in a bilingual, Tex-Mex tone.
              </h2>
              <p className="mt-5 max-w-[560px] text-base leading-relaxed text-[#251f21]/75">
                Available 24/7 and resolving 78% of calls on his own, Nacho
                sounds like part of the Rreal Tacos team — because he was
                trained to be. English and Spanish, every hour of the day.
              </p>
              <div className="mt-8 flex flex-wrap gap-2.5">
                {["Bilingual", "Tex-Mex tone", "24/7", "78% resolution"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#251f21]/15 bg-white/70 px-4 py-1.5 text-sm text-[#251f21]/80"
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Operational numbers */}
          <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
            {OPERATIONS.map((op) => (
              <div
                key={op.label}
                className="rounded-2xl border border-[#251f21]/10 bg-white/70 p-6 text-center"
              >
                <p className="font-serif text-3xl text-[#251f21] md:text-4xl">
                  {op.value}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.12em] text-[#251f21]/50">
                  {op.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Stack + roadmap ---- */}
      <section className="relative overflow-hidden bg-[#251f21] py-24 md:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, #000 12%, #000 88%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, #000 12%, #000 88%, transparent 100%)",
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

        <div className="relative mx-auto max-w-[1080px] px-6 md:px-10">
          <div className="grid grid-cols-1 gap-14 md:grid-cols-2">
            <div>
              <h2 className="font-serif text-3xl text-cream md:text-4xl">
                Integration stack
              </h2>
              <ul className="mt-8 space-y-4">
                {STACK.map((s) => (
                  <li
                    key={s.label}
                    className="flex items-center justify-between border-b border-cream/15 pb-4"
                  >
                    <span className="text-sm uppercase tracking-[0.15em] text-cream/50">
                      {s.label}
                    </span>
                    <span className="text-lg text-cream">{s.value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-serif text-3xl text-cream md:text-4xl">
                What&rsquo;s next
              </h2>
              <div className="mt-8 flex flex-wrap gap-3">
                {ROADMAP.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-cream/20 px-4 py-2 text-sm text-cream/85"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-20 flex flex-col items-center text-center">
            <h2 className="font-serif text-3xl text-cream md:text-4xl">
              Want results like these?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-cream/70 md:text-base">
              See what heytruffle would recover for your restaurant — every
              call answered, every night.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/roi-calculator"
                className="rounded-full bg-brand-orange px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-[#d96700]"
              >
                Calculate your ROI
              </Link>
              <BookDemoButton className="rounded-full border border-cream/25 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-cream/10">
                Get a free demo
              </BookDemoButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
