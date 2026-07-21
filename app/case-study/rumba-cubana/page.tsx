import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { NOISE } from "@/lib/noise";
import HostsDemo from "@/components/HostsDemo";
import CaseStudies from "@/components/CaseStudies";
import DemoSearchBar from "@/components/DemoSearchBar";

export const metadata: Metadata = {
  title: "Rumba Cubana — Case Study — heytruffle",
  description:
    "How Rumba Cubana keeps six New Jersey kitchens covered with HeyTruffle — every call answered, the table booked and the link sent, with the same warm welcome at each.",
  alternates: { canonical: "/case-study/rumba-cubana/" },
};

const HERO_TAGS = ["Cuban", "Reservations", "New Jersey", "6 locations"];

const HERO_STATS = [
  { value: "4k", label: "Calls handled" },
  { value: "153", label: "Reservations booked" },
  { value: "885", label: "Links sent" },
];

const MEASURED = [
  { value: "4.042", label: "Calls handled", color: "#943e72" },
  { value: "885", label: "SMS sent", color: "#3773d7" },
  { value: "35%", label: "Recovered after hours", color: "#ef7200" },
  { value: "55", label: "Host hours saved", color: "#2f3d7c" },
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
    name: "Baires Grill",
    location: "Miami, 9 locations",
    value: "7.520",
    metric: "Calls handled in one month.",
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

export default function RumbaCubanaCaseStudy() {
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
            Case studies <span className="text-cream/50">/</span> Rumba Cubana
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
                src="/images/rumbalogo.png"
                alt="Rumba Cubana"
                width={237}
                height={236}
                className="h-[150px] w-auto md:h-[200px]"
              />
            </div>

            <h1 className="mx-auto mt-10 max-w-[760px] text-center font-body text-[32px] font-normal! leading-[120%] md:text-[40px]">
              Six kitchens,{" "}
              <span className="text-brand-orange">one warm welcome.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-[826px] text-center font-body text-[20px] font-normal leading-[140%] text-cream md:text-[26px]">
              Rumba Cubana fields thousands of calls a month across six New
              Jersey locations, from reservations to pickup orders.
            </p>
            <p className="mx-auto mt-6 max-w-[826px] text-center font-body text-[20px] font-normal leading-[140%] text-cream md:text-[26px]">
              heytruffle answers every one, books the table, and sends the link,
              with the same warm welcome at each.
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

      {/* ── No assumptions. Just the results. ────────────── */}
      <section className="relative bg-cream pb-24 text-[#251f21] md:pb-32">
        <div className="mx-auto max-w-[1536px] px-6 md:px-10">
          <h2 className="text-center font-serif text-[40px] font-bold! leading-[110%] md:text-[52px] lg:text-[64px]">
            No assumptions.
            <br />
            Just the results.
          </h2>

          {/* Measured results — text on the left, four metric cards on the right */}
          <div className="mt-12 grid grid-cols-2 gap-4 sm:mt-16 sm:gap-5 lg:grid-cols-[minmax(0,1.15fr)_repeat(4,minmax(0,1fr))] lg:items-center">
            <div className="col-span-2 lg:col-span-1">
              <p className="font-body text-[28px] font-normal! leading-[120%] md:text-[40px]">
                Measured results
              </p>
              <p className="mt-4 max-w-[420px] font-body text-[20px] font-normal leading-[140%] md:text-[26px]">
                Every metric comes directly from Rumba Cubana&apos;s call data
                for a single month.
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
