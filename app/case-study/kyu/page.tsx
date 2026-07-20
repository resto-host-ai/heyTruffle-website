import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { NOISE } from "@/lib/noise";
import SuccessStats from "@/components/SuccessStats";
import HostsDemo from "@/components/HostsDemo";
import CaseStudies from "@/components/CaseStudies";
import DemoSearchBar from "@/components/DemoSearchBar";

export const metadata: Metadata = {
  title: "KYU — Case Study — heytruffle",
  description:
    "How KYU resolved 1,964 calls — every single one — across Miami, NYC and Las Vegas with HeyTruffle, without passing one to the floor.",
  alternates: { canonical: "/case-study/kyu/" },
};

const HERO_TAGS = [
  "Asian-inspired",
  "Reservations",
  "Miami, NYC & Las Vegas",
  "3 locations",
];

const HERO_STATS = [
  { value: "100%", label: "Calls resolved" },
  { value: "88+", label: "Host hours saved" },
  { value: "131", label: "Simultaneous calls" },
];

const SUCCESS_STATS = [
  { value: "1.964", title: "Calls handled", desc: "Answered in March" },
  {
    value: "100%",
    title: "Resolved by AI",
    desc: "Every call closed by the AI.",
  },
  {
    value: "131",
    title: "Simultaneous calls",
    desc: "Absorbed at once",
  },
  {
    value: "41%",
    title: "Reservations share",
    desc: "Most frequent call type, handled by AI.",
  },
  {
    value: "793",
    title: "SMS sent",
    desc: "Mostly support forms and reservations",
  },
  {
    value: "88",
    title: "Host hours saved",
    desc: "Returned to the floor in March.",
  },
];

const MEASURED = [
  { value: "1.964", label: "Calls handled", color: "#943e72" },
  { value: "793", label: "SMS sent", color: "#3773d7" },
  { value: "100%", label: "Resolved by AI", color: "#ef7200" },
  { value: "88", label: "Host hours saved", color: "#2f3d7c" },
];

const IMPACT = [
  { v: "200", l: "Reservation and large party links" },
  { v: "70%", l: "Conversion" },
  { v: "3x$80", l: "Average spend per party of three" },
];

const CAPABILITIES = [
  {
    title: "Revenue\nAutomation",
    flat: "Revenue Automation",
    img: "/images/card1.png",
    accent: "#ef7200",
    stat: "$33.600 Recovered",
    statDesc: "Assisted reservation revenue.",
  },
  {
    title: "Operational\nEfficiency",
    flat: "Operational Efficiency",
    img: "/images/card2.png",
    accent: "#3773d7",
    stat: "100% Resolution",
    statDesc: "Every inbound call resolved end to end.",
  },
  {
    title: "Buying\nback time",
    flat: "Buying back time",
    img: "/images/card3.png",
    accent: "#2f3d7c",
    stat: "393 Host hours",
    statDesc: "Freed across four months.",
  },
  {
    title: "Data &\nReporting",
    flat: "Data & Reporting",
    img: "/images/card4.png",
    accent: "#d592f3",
    stat: "88% of SMS",
    statDesc: "For reservation modifications and changes.",
  },
];

const RELATED = [
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
    name: "Mojitos",
    location: "Miami",
    value: "4.000",
    metric: "Calls recovered in one month.",
    desc: "Reservations, orders and catering that would have gone unanswered.",
    image: "/images/mojitos.webp",
    bg: "#eae6dc",
    bgIdle: "#c8c5bf",
    accent: "#943e72",
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

export default function KyuCaseStudy() {
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
            Case studies <span className="text-cream/50">/</span> KYU
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
                src="/images/kyulogo.png"
                alt="KYU"
                width={237}
                height={236}
                className="h-[150px] w-auto md:h-[200px]"
              />
            </div>

            <h1 className="mx-auto mt-10 max-w-[760px] text-center font-body text-[32px] font-normal! leading-[120%] md:text-[40px]">
              <span className="text-brand-orange">131 calls at once.</span> Every
              one resolved.
            </h1>

            <p className="mx-auto mt-6 max-w-[826px] text-center font-body text-[20px] font-normal leading-[140%] text-cream md:text-[26px]">
              KYU runs on reservations, large parties, and guests calling right
              at the rush.
            </p>
            <p className="mx-auto mt-6 max-w-[826px] text-center font-body text-[20px] font-normal leading-[140%] text-cream md:text-[26px]">
              Heytruffle answers every one and resolves it without passing a
              single call to the floor, even when the phones all ring together.
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

      {/* ── Success you can measure ──────────────────────── */}
      <SuccessStats
        results={SUCCESS_STATS}
        intro="Here's what changed after KYU stopped letting calls go unanswered. Every metric below comes directly from KYU's operations during March 2026."
      />

      {/* ── What capturing 100% of demand looks like ─────── */}
      <section className="relative bg-cream pb-24 pt-24 text-[#251f21] md:pb-32 md:pt-32">
        <div className="mx-auto max-w-[1536px] px-6 md:px-10">
          <h2 className="mx-auto max-w-[720px] text-center font-serif text-[40px] font-bold! leading-[110%] md:text-[52px] lg:text-[64px]">
            What capturing 100% of demand looks like.
          </h2>

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {CAPABILITIES.map((c) => (
              <div
                key={c.title}
                className="group relative min-h-[240px] overflow-hidden rounded-[25px] shadow-[0_18px_44px_rgba(0,0,0,0.06)] md:h-[308.1px] md:min-h-0"
              >
                <Image
                  src={c.img}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    backgroundImage: `linear-gradient(180deg, #f4f2ed 0%, ${c.accent} 66%)`,
                  }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-[0.55] mix-blend-overlay"
                  style={{ backgroundImage: NOISE }}
                />

                <p className="relative whitespace-pre-line p-8 font-body text-[40px] font-normal leading-[110%] text-[#251f21] transition-opacity duration-300 group-hover:opacity-0 md:p-10 md:text-[58px]">
                  {c.title}
                </p>

                <div className="absolute inset-0 flex flex-col justify-between p-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:p-10">
                  <p className="font-body text-[28px] font-normal leading-[110%] text-[#251f21] md:text-[40px]">
                    {c.flat}
                  </p>
                  <div>
                    <p className="font-body text-[40px] font-normal leading-[110%] text-cream md:text-[58px]">
                      {c.stat}
                    </p>
                    <p className="mt-2 font-body text-[18px] font-normal leading-[130%] text-cream/90 md:text-[20px]">
                      {c.statDesc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
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
          <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.15fr)_repeat(4,minmax(0,1fr))] lg:items-center">
            <div className="sm:col-span-2 lg:col-span-1">
              <p className="font-body text-[28px] font-normal! leading-[120%] md:text-[40px]">
                Measured results
              </p>
              <p className="mt-4 max-w-[420px] font-body text-[20px] font-normal leading-[140%] md:text-[26px]">
                These are the numbers we can stand behind. Every metric comes
                directly from KYU&apos;s call data for March 2026.
              </p>
            </div>
            {MEASURED.map((m) => (
              <div
                key={m.label}
                className="flex h-[202px] flex-col justify-center rounded-[25px] border border-transparent [background:linear-gradient(#f6f3ec,#f6f3ec)_padding-box,linear-gradient(180deg,#ffffff_0%,rgba(37,31,33,0.06)_45%,rgba(37,31,33,0.28)_100%)_border-box] p-6 shadow-[0_14px_34px_rgba(0,0,0,0.06)] md:p-8"
              >
                <p
                  className="font-body text-[56px] font-normal leading-[110%] md:text-[72px]"
                  style={{ color: m.color }}
                >
                  {m.value}
                </p>
                <p className="mt-2 font-body text-[22px] font-normal leading-[130%] md:text-[26px]">
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
              <div className="flex flex-1 flex-wrap items-center gap-x-4 gap-y-8 rounded-[25px] border border-transparent [background:linear-gradient(#f1eee6,#f1eee6)_padding-box,linear-gradient(180deg,#ffffff_0%,rgba(37,31,33,0.06)_45%,rgba(37,31,33,0.28)_100%)_border-box] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)] md:flex-nowrap md:justify-between md:p-12">
                {IMPACT.map((item, i, arr) => (
                  <div key={item.l} className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <p className="font-body text-[52px] font-normal leading-[100%] md:text-[64px]">
                        {item.v}
                      </p>
                      <p className="max-w-[120px] font-body text-[18px] font-normal leading-[120%]">
                        {item.l}
                      </p>
                    </div>
                    {i < arr.length - 1 && (
                      <span className="font-body text-[28px] font-normal leading-none md:text-[36px]">
                        ×
                      </span>
                    )}
                  </div>
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
                className="relative flex items-center gap-5 overflow-hidden rounded-[25px] p-8 text-cream shadow-[0_18px_44px_rgba(0,0,0,0.25)] md:p-10 lg:w-[34%]"
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
                  ~$33,600
                </p>
                <p className="relative max-w-[180px] font-body text-[18px] font-normal leading-[130%] text-cream/90">
                  Estimated assisted revenue in May.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Shared background across the closing two sections ── */}
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
