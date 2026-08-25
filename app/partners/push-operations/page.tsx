import type { Metadata } from "next";
import Image from "next/image";
import { BookDemoButton } from "@/components/ui/BookDemoButton";

const DESCRIPTION =
  "heytruffle and Push Operations partner to help multilocation restaurant groups run a calmer operation. Push handles your team. heytruffle handles your phones.";

export const metadata: Metadata = {
  title: "heytruffle and Push Operations Partnership — heytruffle",
  description: DESCRIPTION,
  alternates: { canonical: "/partners/push-operations/" },
  openGraph: {
    title: "heytruffle and Push Operations Partnership",
    description:
      "Push handles your team. heytruffle handles your phones. Two fully managed services for multilocation restaurant groups.",
    url: "https://heytruffle.ai/partners/push-operations/",
  },
};

const META = [
  { k: "Partner", v: "Push Operations" },
  { k: "Category", v: "Workforce management" },
  { k: "Markets served", v: "United States and Canada" },
] as const;

const HEYTRUFFLE_HANDLES = [
  "Reservations and large party bookings",
  "Takeout and delivery orders",
  "Catering and private events",
  "Guest questions, with a hand off to your team when a person should step in",
];

const PUSH_HANDLES = [
  "Hiring and onboarding",
  "Scheduling and time tracking",
  "Payroll across locations",
  "Labor reporting for the whole group",
];

const WHY_TOGETHER = [
  {
    title: "Built for groups",
    desc: "Both services are made for operators running several locations, not for a single room.",
  },
  {
    title: "Managed, not self service",
    desc: "A real team stands behind each one. Your managers get the outcome without learning new software.",
  },
  {
    title: "Time back on the floor",
    desc: "Less time on admin and on hold, more time with the guests already in the dining room.",
  },
];

const STATS = [
  { num: "20,000+", lbl: "calls handled every month by the AI Concierge" },
  { num: "~14,000", lbl: "guests seated in a typical month" },
  { num: "Weekly", lbl: "human review and tuning of the AI Concierge" },
] as const;

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden
      className="shrink-0"
    >
      <circle cx="12" cy="12" r="9" strokeWidth="1.6" />
      <path
        d="M8.5 12.2l2.4 2.4 4.6-4.9"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PushOperationsPartnerPage() {
  return (
    <main className="flex-1">
      {/* ---- Hero ---- */}
      <section className="relative overflow-hidden bg-[#251f21] pb-16 pt-32 md:pb-20 md:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            maskImage:
              "linear-gradient(to bottom, #000 0%, #000 55%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 0%, #000 55%, transparent 100%)",
          }}
        >
          <Image
            src="/images/background_gradient.webp"
            alt=""
            fill
            loading="eager"
            fetchPriority="low"
            quality={90}
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="relative mx-auto max-w-[820px] px-6 text-center md:px-10">
          <p className="text-xs uppercase tracking-[0.2em] text-cream/70">
            Partnership
          </p>

          <div className="mx-auto mt-6 flex items-center justify-center gap-5">
            <Image
              src="/images/heytruffle-logo.svg"
              alt="heytruffle"
              width={160}
              height={40}
              unoptimized
              className="h-8 w-auto"
            />
            <span className="text-xl text-cream/30">&times;</span>
            <Image
              src="/images/pushoperationlogo.png"
              alt="heytruffle"
              width={160}
              height={40}
              unoptimized
              className="h-18 w-auto"
            />
          </div>

          <h1 className="mt-8 font-serif text-4xl leading-tight text-cream md:text-6xl">
            Your team is covered.{" "}
            <span className="text-[#d592f3]">Now your phones are too.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[660px] text-base leading-relaxed text-cream/70 md:text-lg">
            heytruffle and Push Operations are partnering to give
            multilocation restaurant groups two fully managed services that
            work side by side: one behind your schedule and payroll, one
            behind your phone line.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <BookDemoButton className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#b53fc4] to-[#ef7200] px-7 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90">
              Book a demo
            </BookDemoButton>
            <a
              href="https://www.pushoperations.com/partners/heytruffle"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-cream/25 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-cream/10"
            >
              See it on Push
            </a>
          </div>
        </div>
      </section>

      {/* ---- Meta strip ---- */}
      <section className="bg-cream pt-10">
        <div className="mx-auto max-w-[960px] px-6 md:px-10">
          <div className="grid grid-cols-1 divide-y divide-[#251f21]/10 overflow-hidden rounded-3xl bg-white shadow-[0_2px_10px_rgba(37,31,33,0.08)] md:grid-cols-3 md:divide-x md:divide-y-0">
            {META.map(({ k, v }) => (
              <div key={k} className="px-8 py-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#251f21]/50">
                  {k}
                </p>
                <p className="mt-1.5 font-body text-[17px] font-semibold text-[#251f21]">
                  {v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Split: who handles what ---- */}
      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-[960px] px-6 md:px-10">
          <div className="mx-auto max-w-[600px] text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-brand-orange">
              How it breaks down
            </p>
            <h2 className="mt-3 font-serif text-3xl text-[#251f21] md:text-4xl">
              Two operations, one restaurant group.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#251f21]/60 md:text-base">
              Push runs the work that happens before service. heytruffle runs
              the channel that opens during it. Neither hands your managers a
              new dashboard to keep up with.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <div className="rounded-[26px] bg-brand-orange p-9 text-white">
              <p className="font-body text-lg font-bold">heytruffle</p>
              <p className="mt-3 font-serif text-3xl">Your phones</p>
              <ul className="mt-6 space-y-3">
                {HEYTRUFFLE_HANDLES.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] leading-snug">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[26px] bg-[#251f21] p-9 text-cream">
              <p className="font-body text-lg font-bold">
                push<span className="text-brand-orange">.</span>
              </p>
              <p className="mt-3 font-serif text-3xl">Your team</p>
              <ul className="mt-6 space-y-3">
                {PUSH_HANDLES.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] leading-snug text-cream/90">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Why together ---- */}
      <section className="bg-cream pb-16 md:pb-24">
        <div className="mx-auto max-w-[1000px] px-6 md:px-10">
          <div className="mx-auto max-w-[600px] text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-brand-orange">
              Why together
            </p>
            <h2 className="mt-3 font-serif text-3xl text-[#251f21] md:text-4xl">
              The same operator, on both sides of the pass.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {WHY_TOGETHER.map((chip) => (
              <div
                key={chip.title}
                className="rounded-[24px] bg-white p-8 shadow-[0_2px_10px_rgba(37,31,33,0.08)]"
              >
                <h3 className="font-body text-lg font-semibold text-[#251f21]">
                  {chip.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-[#251f21]/60">
                  {chip.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- About Push ---- */}
      <section className="bg-cream pb-16 md:pb-24">
        <div className="mx-auto max-w-[820px] px-6 md:px-10">
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-brand-orange">
            About our partner
          </p>
          <h2 className="mt-3 font-serif text-3xl text-[#251f21] md:text-4xl">
            Push Operations
          </h2>
          <div className="mt-8 rounded-[26px] bg-white p-9 shadow-[0_2px_10px_rgba(37,31,33,0.08)] md:p-11">
            <p className="text-base leading-relaxed text-[#251f21]/75">
              <strong className="font-semibold text-[#251f21]">
                Push Operations is a workforce management platform built for
                restaurants and hospitality groups.
              </strong>{" "}
              It brings hiring, onboarding, scheduling, time tracking and
              payroll into a single system, so managers spend less of the day
              on admin and more of it with their staff and their guests.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#251f21]/75">
              Push and heytruffle serve the same operator: a growing
              restaurant group balancing a tight labor budget against rising
              guest expectations. Push keeps the team scheduled, paid and
              organized across every location. heytruffle keeps the phone
              answered with an AI Concierge trained for the brand and tuned
              by our team every week.
            </p>
          </div>
        </div>
      </section>

      {/* ---- Proof ---- */}
      <section className="bg-[#191214] py-16 text-cream md:py-24">
        <div className="mx-auto max-w-[900px] px-6 md:px-10">
          <div className="flex flex-wrap items-baseline gap-3">
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-brand-orange">
              heytruffle in the real world
            </p>
          </div>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl">
            Built inside a restaurant group, for restaurant groups.
          </h2>

          <div className="mt-10 rounded-[26px] bg-white/[0.04] p-9 md:p-11">
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="font-serif text-2xl">Rreal Tacos</span>
              <span className="text-sm text-cream/50">
                12 locations · Georgia
              </span>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {STATS.map((s) => (
                <div key={s.lbl}>
                  <p className="font-serif text-4xl text-brand-orange">{s.num}</p>
                  <p className="mt-2 text-sm leading-relaxed text-cream/70">
                    {s.lbl}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap items-center justify-between gap-5 border-t border-white/10 pt-7">
              <p className="max-w-[520px] text-sm leading-relaxed text-cream/60">
                Every AI Concierge is trained for the restaurant it answers
                for: its menu, its hours, its policies and the way its team
                speaks.
              </p>
              <BookDemoButton className="shrink-0 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#251f21] transition-opacity hover:opacity-90">
                Hear it live
              </BookDemoButton>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Connect ---- */}
      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-[1000px] px-6 md:px-10">
          <div className="mx-auto max-w-[600px] text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-brand-orange">
              Get started
            </p>
            <h2 className="mt-3 font-serif text-3xl text-[#251f21] md:text-4xl">
              Connect with either team.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <div className="flex flex-col gap-4 rounded-[22px] border border-[#251f21]/10 bg-white p-8">
              <h3 className="font-body text-[17px] font-semibold text-[#251f21]">
                Connect with heytruffle
              </h3>
              <p className="flex-1 text-sm leading-relaxed text-[#251f21]/60">
                Want to hear what an AI Concierge would sound like answering
                for your restaurant? Book a demo and listen to it live.
              </p>
              <BookDemoButton className="self-start rounded-full bg-brand-orange px-6 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90">
                Book a demo
              </BookDemoButton>
            </div>
            <div className="flex flex-col gap-4 rounded-[22px] border border-[#251f21]/10 bg-white p-8">
              <h3 className="font-body text-[17px] font-semibold text-[#251f21]">
                Connect with Push Operations
              </h3>
              <p className="flex-1 text-sm leading-relaxed text-[#251f21]/60">
                Already working with heytruffle and curious how Push handles
                scheduling and payroll across your locations? Their team can
                walk you through it.
              </p>
              <a
                href="https://www.pushoperations.com/partners/heytruffle"
                target="_blank"
                rel="noopener noreferrer"
                className="self-start rounded-full border border-brand-orange px-6 py-2.5 text-sm font-semibold text-brand-orange transition-colors hover:bg-brand-orange/10"
              >
                Visit Push Operations
              </a>
            </div>
            <div className="flex flex-col gap-4 rounded-[22px] border border-[#251f21]/10 bg-white p-8">
              <h3 className="font-body text-[17px] font-semibold text-[#251f21]">
                Questions about the partnership
              </h3>
              <p className="flex-1 text-sm leading-relaxed text-[#251f21]/60">
                Not sure where to start, or want to know how the two work
                together for your group? Write to us directly.
              </p>
              <a
                href="mailto:info@heytruffle.ai"
                className="self-start rounded-full border border-brand-orange px-6 py-2.5 text-sm font-semibold text-brand-orange transition-colors hover:bg-brand-orange/10"
              >
                Contact us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---- CTA band ---- */}
      <section className="relative overflow-hidden bg-[#251f21] py-20 md:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(181,63,196,0.28) 0%, rgba(239,114,0,0.16) 50%, transparent 75%)",
          }}
        />
        <div className="relative mx-auto max-w-[720px] px-6 text-center md:px-10">
          <h2 className="font-serif text-3xl text-cream md:text-4xl">
            You operate the restaurant. We operate the phones.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-cream/70 md:text-base">
            Start with a demo built on your own restaurant.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <BookDemoButton className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#b53fc4] to-[#ef7200] px-7 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90">
              Book a demo
            </BookDemoButton>
          </div>
        </div>
      </section>
    </main>
  );
}
