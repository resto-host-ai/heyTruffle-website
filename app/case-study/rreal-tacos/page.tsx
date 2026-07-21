import type { Metadata } from "next";
import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { NOISE } from "@/lib/noise";
import HearItLive from "@/components/HearItLive";
import HostsDemo from "@/components/HostsDemo";
import CaseStudies from "@/components/CaseStudies";
import DemoSearchBar from "@/components/DemoSearchBar";

export const metadata: Metadata = {
  title: "Rreal Tacos — Case Study — heytruffle",
  description:
    "How Rreal Tacos captured 100% of demand across 12 Atlanta locations with HeyTruffle — every reservation, order and catering call answered.",
  alternates: { canonical: "/case-study/rreal-tacos/" },
};

const HERO_TAGS = ["Latin", "Reservations", "Atlanta", "12 locations"];

const HERO_STATS = [
  { value: "19K+", label: "Calls handled" },
  { value: "520+", label: "Host hours saved" },
  { value: "14K+", label: "Guest seated" },
];

const MEASURED = [
  { value: "5.513", label: "Calls recovered", color: "#943e72" },
  { value: "4.398", label: "SMS messages sent", color: "#3773d7" },
  { value: "552", label: "Host hours saved", color: "#ef7200" },
  { value: "54%", label: "Calls fully resolved", color: "#2f3d7c" },
];

const STORY_POINTS = [
  "We saw large parties calling one location while nearby Rreal Tacos had room to spare.",
  "So we built a flow just for them: when a location is full, Nacho offers a table at the two closest Rreal Tacos, under 10 minutes away.",
  "Two out of three groups say yes, keeping every large party inside the brand.",
];

const STORY_STATS = [
  {
    value: "+68%",
    label: "of large parties were willing to relocate within a 10 minute radius.",
  },
  {
    value: "+200",
    label:
      "large party reservations placed every month at nearby locations.",
  },
];

const STORY_MATH = [
  { value: "~200", label: "bookings per month", op: "x" },
  { value: "11.6", label: "average guests per booking", op: "x" },
  { value: "$30", label: "average spend per guest", op: "=" },
];

const IMPACT = [
  { v: "~152", l: "Large-party bookings" },
  { v: "11.6", l: "Average guests per booking" },
  { v: "$30", l: "Average spend per guest" },
];

const RELATED = [
  {
    name: "Mojitos",
    location: "Miami",
    value: "4.000",
    metric: "Calls recovered in one month.",
    desc: "Reservations, orders and catering that would have gone unanswered.",
    image: "/images/mojitos.webp",
    bg: "#f4efe3",
    bgIdle: "#cfcabf",
    accent: "#ef7200",
  },
  {
    name: "Baires Grill",
    location: "Miami",
    value: "4x",
    metric: "A normal night, in a single evening.",
    desc: "Every call answered while the team stayed on the floor.",
    image: "/images/case-baires.webp",
    bg: "#eae6dc",
    bgIdle: "#c8c5bf",
    accent: "#a05fc4",
  },
];

function ChevronLeft() {
  return (
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
      className="shrink-0"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

export default function RrealTacosCaseStudy() {
  return (
    <main className="bg-cream">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#251f21] pb-16 pt-28 text-cream md:pt-32">
        {/* Background photo + dark filter + orange glow from the right */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <Image
            src="/images/fondo_casestudy.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#251f21]/78" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(55% 85% at 100% 45%, rgba(239,114,0,0.55) 0%, rgba(239,114,0,0.12) 34%, transparent 62%)",
            }}
          />
        </div>

        <div className="relative mx-auto flex w-full max-w-[1536px] flex-1 flex-col px-6 md:px-10">
          <Link
            href="/case-study"
            className="inline-flex items-center gap-2 font-body text-[20px] font-normal leading-[110%] text-cream/90 transition-opacity hover:opacity-70"
          >
            <ChevronLeft />
            Case studies <span className="text-cream/50">/</span> Rreal Tacos
          </Link>

          <div className="flex flex-1 flex-col items-center justify-center py-12">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {HERO_TAGS.map((tag, i) => (
                <span
                  key={tag}
                  className="flex items-center gap-6 font-body text-[20px] font-normal leading-[110%] text-cream"
                >
                  {tag}
                  {i < HERO_TAGS.length - 1 && (
                    <span className="h-1.5 w-1.5 rounded-full bg-cream/60" />
                  )}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-center">
              <Image
                src="/images/rreal_logo.png"
                alt="Rreal Tacos"
                width={237}
                height={236}
                className="h-[150px] w-auto md:h-[200px]"
              />
            </div>

            <h1 className="mx-auto mt-10 max-w-[760px] text-center font-body text-[32px] font-normal! leading-[120%] md:text-[40px]">
              From missed calls to{" "}
              <span className="text-brand-orange">captured demand.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-[826px] text-center font-body text-[20px] font-normal leading-[140%] text-cream md:text-[26px]">
              Rreal Tacos receives thousands of calls every month, from
              reservations and pickup orders to catering inquiries and
              large-party bookings.
            </p>
            <p className="mx-auto mt-6 max-w-[826px] text-center font-body text-[20px] font-normal leading-[140%] text-cream md:text-[26px]">
              With heytruffle answering every call, their team stays focused on
              the floor while demand gets captured automatically.
            </p>
          </div>

          {/* Hero stats bar */}
          <div className="mx-auto grid w-full max-w-[900px] grid-cols-3 divide-x divide-cream/25">
            {HERO_STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center px-4">
                <p className="font-body text-[44px] font-normal leading-[110%] md:text-[64px]">
                  {s.value}
                </p>
                <p className="mt-1 text-center font-body text-[16px] font-normal leading-[130%] text-cream/90 md:text-[20px]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature story · Large parties ────────────────── */}
      <section className="relative bg-cream pb-24 pt-24 md:pb-32 md:pt-32">
        <div className="mx-auto max-w-[1536px] px-6 md:px-10">
          <div
            className="relative overflow-hidden rounded-[36px] px-8 py-12 md:rounded-[48px] md:px-16 md:py-16"
            style={{
              background: [
                "radial-gradient(75% 130% at 100% 40%, rgba(239,114,0,0.55) 0%, rgba(239,114,0,0.14) 34%, transparent 66%)",
                "linear-gradient(180deg, #221c1e 0%, #1a1517 100%)",
              ].join(", "),
            }}
          >
            {/* Grain overlay */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
              style={{ backgroundImage: NOISE }}
            />

            <div className="relative grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
              {/* Left — story */}
              <div>
                <p className="font-body text-[18px] font-normal uppercase leading-[140%] text-[#D592F3] md:text-[26px]">
                  Feature story · Large parties
                </p>
                <h2 className="mt-4 font-serif text-[44px] font-bold! leading-[110%] text-[#F9FAFB] md:text-[64px]">
                  One brand, every table.
                </h2>
                <p className="mt-5 max-w-[560px] font-body text-[18px] font-normal leading-[140%] text-[#F9FAFB] md:text-[26px]">
                  Large party demand runs high at Rreal Tacos, often more than a
                  single location can seat.
                </p>

                <ol className="mt-10 flex flex-col gap-6">
                  {STORY_POINTS.map((point, i) => (
                    <li key={point} className="flex items-start gap-4">
                      <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-orange/50 bg-brand-orange/10 font-body text-[18px] font-normal leading-none text-brand-orange">
                        {i + 1}
                      </span>
                      <p className="max-w-[560px] font-body text-[18px] font-normal leading-[140%] text-[#F9FAFB] md:text-[26px]">
                        {point}
                      </p>
                    </li>
                  ))}
                </ol>

                {/* Supporting stats */}
                <div className="mt-12 grid grid-cols-2 gap-6 sm:gap-8">
                  {STORY_STATS.map((s) => (
                    <div key={s.value}>
                      <p
                        className="font-body text-[56px] font-normal leading-[110%] md:text-[72px]"
                        style={{
                          backgroundImage:
                            "linear-gradient(180deg, #D592F3 0%, #EF7200 100%)",
                          WebkitBackgroundClip: "text",
                          backgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {s.value}
                      </p>
                      <p className="mt-2 max-w-[240px] font-body text-[18px] font-normal leading-[140%] text-[#F9FAFB]/90 md:text-[20px]">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — glass math card + audio */}
              <div className="flex flex-col gap-8">
                <div
                  className="relative overflow-hidden rounded-[32px] border border-white/15 bg-white/[0.05] px-8 py-12 text-center backdrop-blur-xl md:px-10 md:py-14 lg:text-left"
                  style={{
                    boxShadow:
                      "inset 0 1px 1px rgba(255,255,255,0.18), 0 24px 60px rgba(0,0,0,0.35)",
                  }}
                >
                  {STORY_MATH.map((m) => (
                    <div key={m.label}>
                      <p className="font-body text-[52px] font-normal leading-[110%] text-[#F6F3EC] md:text-[64px]">
                        {m.value}
                      </p>
                      <p className="font-body text-[18px] font-normal leading-[140%] text-[#F6F3EC]/90 md:text-[20px]">
                        {m.label}
                      </p>
                      <p className="my-3 font-body text-[22px] font-normal leading-none text-[#F6F3EC]/70 md:text-[28px]">
                        {m.op}
                      </p>
                    </div>
                  ))}

                  <p
                    className="font-body text-[52px] font-normal leading-[110%] md:text-[64px]"
                    style={{
                      backgroundImage:
                        "linear-gradient(85deg, #3773D7 1.02%, #EF7200 38.22%, #D592F3 98.98%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    ~$69,600
                  </p>
                  <p className="mx-auto mt-1 max-w-[280px] font-body text-[18px] font-normal leading-[140%] text-[#F6F3EC]/90 md:text-[20px] lg:mx-0">
                    recovered every month, from this feature alone
                  </p>
                </div>

                <div className="flex flex-col items-center gap-4 text-center lg:flex-row lg:flex-wrap lg:justify-end lg:text-left">
                  <HearItLive src="/images/largeparties.mp3" />
                  <p className="max-w-[220px] font-body text-[16px] font-normal leading-[130%] text-[#F9FAFB]/70 lg:max-w-[160px]">
                    Listen to a real large-party booking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Hear the conversations ───────────────────────── */}
      <section className="relative bg-cream py-24 text-[#251f21] md:py-32">
        <div className="mx-auto max-w-[1536px] px-6 md:px-10">
          <h2 className="mx-auto max-w-[840px] text-center font-serif text-[40px] font-bold! leading-[110%] text-brand-orange md:text-[52px] lg:text-[64px]">
            Hear the conversations behind the results.
          </h2>
          <div className="mt-14">
            <HostsDemo soloHostId="nacho" />
          </div>
        </div>
      </section>

      {/* ── No assumptions. Just the math. ───────────────── */}
      <section className="relative bg-cream pb-24 text-[#251f21] md:pb-32">
        <div className="mx-auto max-w-[1536px] px-6 md:px-10">
          <h2 className="text-center font-serif text-[40px] font-bold! leading-[110%] md:text-[52px] lg:text-[64px]">
            No assumptions.
            <br />
            Just the math.
          </h2>

          {/* Measured results — text on the left, four metric cards on the right */}
          <div className="mt-12 grid grid-cols-2 gap-4 sm:mt-16 sm:gap-5 lg:grid-cols-[minmax(0,1.15fr)_repeat(4,minmax(0,1fr))] lg:items-center">
            <div className="col-span-2 lg:col-span-1">
              <p className="font-body text-[28px] font-normal! leading-[120%] md:text-[40px]">
                Measured results
              </p>
              <p className="mt-4 max-w-[420px] font-body text-[20px] font-normal leading-[140%] md:text-[26px]">
                These are the numbers we can stand behind. Every metric comes
                directly from Rreal Tacos&apos; call data for May 2026.
              </p>
            </div>
            {MEASURED.map((m) => (
              <div
                key={m.label}
                className="flex h-[150px] flex-col justify-center rounded-[25px] border border-transparent [background:linear-gradient(#f6f3ec,#f6f3ec)_padding-box,linear-gradient(180deg,#ffffff_0%,rgba(37,31,33,0.06)_45%,rgba(37,31,33,0.28)_100%)_border-box] p-5 shadow-[0_14px_34px_rgba(0,0,0,0.06)] sm:h-[202px] md:p-8"
              >
                <p
                  className="font-body text-[40px] font-normal leading-[110%] sm:text-[56px] md:text-[72px]"
                  style={{ color: m.color }}
                >
                  {m.value}
                </p>
                <p className="mt-1 font-body text-[15px] font-normal leading-[130%] sm:mt-2 sm:text-[22px] md:text-[26px]">
                  {m.label}
                </p>
              </div>
            ))}
          </div>

          {/* Estimated business impact */}
          <div className="mt-16">
            <p className="font-body text-[28px] font-normal! leading-[120%] md:text-[40px]">
              Estimated business impact
            </p>
            <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-stretch">
              {/* Math card */}
              <div className="flex flex-1 flex-col gap-4 rounded-[25px] border border-transparent [background:linear-gradient(#f1eee6,#f1eee6)_padding-box,linear-gradient(180deg,#ffffff_0%,rgba(37,31,33,0.06)_45%,rgba(37,31,33,0.28)_100%)_border-box] p-7 shadow-[0_10px_30px_rgba(0,0,0,0.04)] md:flex-row md:flex-nowrap md:items-center md:justify-between md:gap-4 md:p-12">
                {IMPACT.map((item, i, arr) => (
                  <Fragment key={item.l}>
                    <div className="flex items-center gap-4">
                      <p className="w-[104px] shrink-0 font-body text-[48px] font-normal leading-[100%] md:w-auto md:text-[64px]">
                        {item.v}
                      </p>
                      <p className="max-w-[150px] font-body text-[18px] font-normal leading-[120%] md:max-w-[120px]">
                        {item.l}
                      </p>
                    </div>
                    {i < arr.length - 1 && (
                      <span className="self-center font-body text-[28px] font-normal leading-none text-[#251f21]/50 md:self-auto md:text-[36px]">
                        ×
                      </span>
                    )}
                  </Fragment>
                ))}
              </div>

              {/* Equals */}
              <div className="hidden items-center justify-center lg:flex">
                <span className="font-body text-[40px] font-normal leading-none">
                  =
                </span>
              </div>

              {/* Result card */}
              <div
                className="relative flex flex-col items-start gap-3 overflow-hidden rounded-[25px] p-7 text-cream shadow-[0_18px_44px_rgba(0,0,0,0.25)] md:flex-row md:items-center md:gap-5 md:p-10 lg:w-[34%]"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, #12162c 0%, #21306a 55%, #3454b0 100%)",
                }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
                  style={{ backgroundImage: NOISE }}
                />
                <p className="relative font-body text-[52px] font-normal leading-[100%] md:text-[64px]">
                  ~$52.900
                </p>
                <p className="relative font-body text-[18px] font-normal leading-[130%] text-cream/90 md:max-w-[180px]">
                  Estimated assisted revenue in May only from Large-Party
                  reservations
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Shared background across the closing three sections ── */}
      <div className="relative overflow-hidden bg-[#251f21]">
        <Image
          src="/images/fondo_seccionfinal.webp"
          alt=""
          fill
          quality={90}
          sizes="100vw"
          className="scale-105 object-cover"
        />

        <div className="relative">
          {/* ── In their own words ───────────────────────────── */}
          <section className="relative overflow-hidden py-24 text-cream md:py-32">
        <div className="mx-auto max-w-[1536px] px-6 md:px-10">
          <h2 className="text-center font-serif text-[40px] font-bold! leading-[110%] md:text-[52px] lg:text-[64px]">
            In their own words.
          </h2>
          <p className="mx-auto mt-5 max-w-[974px] text-center font-body text-[20px] font-normal leading-[140%] text-cream md:text-[26px]">
            The impact of HeyTruffle goes beyond answered calls.
          </p>

          <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-start">
            {/* Portrait with a cream gradient rising from the bottom and the
                name overlaid on top */}
            <div className="relative min-h-[420px] overflow-hidden rounded-[25px] md:min-h-[600px]">
              <Image
                src="/images/rrealceo.png"
                alt="Miguel Hernandez"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(246,243,236,0) 45%, rgba(246,243,236,0.85) 78%, #f6f3ec 100%)",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">
                <p className="font-body text-[28px] font-bold leading-[120%] text-[#251f21] md:text-[40px]">
                  Miguel Hernandez
                </p>
                <p className="mt-1 font-body text-[20px] font-normal leading-[140%] text-[#251f21] md:text-[26px]">
                  C.O.O &amp; Co-Owner at Rreal Tacos
                </p>
              </div>
            </div>

            <div>
              <p className="font-serif text-[36px] font-bold! leading-[110%] md:text-[52px] lg:text-[64px]">
                &ldquo;Our staff <span className="text-[#d592f3]">finally</span>{" "}
                focuses on guests,
              </p>
              <p className="mt-6 font-body text-[20px] font-normal italic leading-[140%] text-cream md:text-[26px]">
                before HeyTruffle, our hosts were constantly pulled away from the
                floor to answer the phone. During busy shifts, that meant guests
                waiting, missed calls, or both. Now every caller gets an answer,
                and our team can stay focused on what matters most: delivering a
                great experience in the restaurant. It has become part of our
                daily operation.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related case studies (home carousel style) ───── */}
      <CaseStudies
        heading="Related case studies"
        subtitle={null}
        showCta={false}
        cases={RELATED}
        transparent
      />

      {/* ── Final CTA ────────────────────────────────────── */}
      <section className="relative pb-28 text-cream">
        <div className="mx-auto max-w-[1536px] px-6 md:px-10">
        <div
          className="relative flex w-full flex-col items-center overflow-hidden rounded-[40px] px-6 py-20 text-center md:rounded-[67px] md:px-10 md:py-28"
          style={{
            background: [
              "radial-gradient(75% 95% at -8% 82%, rgba(239,114,0,0.5) 0%, rgba(239,114,0,0.12) 42%, transparent 68%)",
              "linear-gradient(180deg, #1a1620 0%, #201a1e 100%)",
            ].join(", "),
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
            style={{ backgroundImage: NOISE }}
          />

          <div className="relative flex w-full flex-col items-center">
            <h2 className="mx-auto max-w-[972px] font-serif text-[40px] font-bold! leading-[110%] md:text-[52px] lg:text-[64px]">
              Hear what heytruffle would capture for your restaurant.
            </h2>

            <div className="mt-10 flex w-full justify-center">
              <DemoSearchBar />
            </div>

            <a
              href="mailto:info@heytruffle.com"
              className="mt-10 inline-flex items-center justify-center rounded-full bg-cream px-9 py-5 font-body text-[20px] font-bold leading-[110%] text-[#251f21] transition-all duration-300 hover:bg-[linear-gradient(180deg,#8b9cd6_0%,#6076bd_50%,#3f5490_100%)] hover:text-cream hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_12px_34px_rgba(79,84,144,0.55)]"
            >
              Talk to our team
            </a>
            <p className="mt-6 font-body text-[20px] font-normal leading-[110%] text-cream/80">
              Backed by real people.
            </p>
          </div>
        </div>
        </div>
      </section>
        </div>
      </div>
    </main>
  );
}
