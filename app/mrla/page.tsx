import type { Metadata } from "next";
import Image from "next/image";

/* MRLA wording rule: the word "partner" must not appear anywhere in this
   page's copy, headings or alt text — MRLA reserves that word for their
   endorsed partners, and heytruffle is on the Basic membership. Use "Proud
   Member" / "MRLA members" instead. (It's fine inside the Calendly UTM
   params below — those aren't visible copy, and the values were supplied by
   marketing alongside the link itself.) */
const CALENDLY_URL =
  "https://calendly.com/d/dtqn-973-ryc/discover-heytruffle?utm_source=MRLA&utm_medium=partner&utm_campaign=discover_heytruffle";

const DESCRIPTION =
  "heytruffle is here to grow your top line and bring in extra revenue with a fully managed AI Concierge. Exclusive offering for Michigan Restaurant and Lodging Association members.";

export const metadata: Metadata = {
  title: "heytruffle for MRLA members | AI Concierge for restaurant groups",
  description: DESCRIPTION,
  alternates: { canonical: "/mrla/" },
  openGraph: {
    title: "heytruffle for MRLA members",
    description: DESCRIPTION,
    url: "https://heytruffle.ai/mrla/",
  },
};

const OFFER_ITEMS = [
  {
    strong: "50% off the setup fee",
    rest: "when you start with heytruffle",
  },
  {
    strong: "A free consultation call",
    rest: "with our team to review your phone coverage",
  },
];

const CAPABILITIES = [
  {
    title: "Reservations",
    desc: "New bookings, changes and cancellations, synced with the system you already use.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3.5" y="5" width="17" height="15.5" rx="3.5" />
        <path d="M3.5 9.8h17" />
        <path d="M8 3.2v3.4M16 3.2v3.4" />
      </svg>
    ),
  },
  {
    title: "Orders",
    desc: "Pickup and delivery orders taken over the phone and sent straight to your POS.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6.3 8h11.4l-1 11a2.3 2.3 0 0 1-2.3 2.1H9.6A2.3 2.3 0 0 1 7.3 19L6.3 8Z" />
        <path d="M9 8V6.3a3 3 0 0 1 6 0V8" />
      </svg>
    ),
  },
  {
    title: "Catering and private events",
    desc: "Large party and event inquiries captured with the details your team needs to follow up.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M12 4c.9 4.6 2.7 6.4 7 7-4.3.6-6.1 2.4-7 7-.9-4.6-2.7-6.4-7-7 4.3-.6 6.1-2.4 7-7Z"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    ),
  },
];

const MANAGED = [
  {
    n: "01",
    title: "Built for multi location groups",
    desc: "Designed for groups running several locations, with consistency across all of them.",
  },
  {
    n: "02",
    title: "Two customer success managers",
    desc: "A named team that knows your brand, your menu and how you like things handled.",
  },
  {
    n: "03",
    title: "Monitored around the clock",
    desc: "A human team reviews calls and tunes your AI Concierge every week, weekends included.",
  },
  {
    n: "04",
    title: "A monthly report meeting",
    desc: "ROI analysis and metrics, reviewed together, so you see what the phone line is producing.",
  },
];

const COMPAT_ROWS = [
  {
    category: "Reservations",
    logos: [
      { src: "/images/integrations/opentable.svg", alt: "OpenTable" },
      { src: "/images/integrations/resy.svg", alt: "Resy" },
      { src: "/images/integrations/sevenrooms.svg", alt: "SevenRooms" },
    ],
  },
  {
    category: "All major POS",
    logos: [
      { src: "/images/integrations/toast.svg", alt: "Toast" },
      { src: "/images/integrations/square.svg", alt: "Square" },
      { src: "/images/integrations/olo.svg", alt: "Olo" },
    ],
  },
  {
    category: "Delivery",
    logos: [
      { src: "/images/integrations/uber-eats.svg", alt: "Uber Eats" },
      { src: "/images/integrations/grubhub.svg", alt: "Grubhub" },
    ],
  },
];

const STATS = [
  { num: "12", lbl: "locations covered at Rreal Tacos" },
  { num: "20,000+", lbl: "calls handled per month" },
  { num: "14,000", lbl: "guests seated per month" },
] as const;

// Subset of the brands referenced in the source mockup that we already have
// logo assets for in this repo (same set TrustedBy.tsx draws from). A few
// names from the mockup (Happea's, Think Hospitality, El Club de la
// Milanesa, La Presa, Papi's Cuban Grill, Milo's Butterfingers, Sophie's
// Cuban) have no logo asset here yet — add them under public/images once
// we have one.
const CLIENT_LOGOS = [
  { src: "/images/logo_kyu.webp", alt: "KYU" },
  { src: "/images/kyochonlogo.webp", alt: "Kyochon" },
  { src: "/images/logo_baires.webp", alt: "Baires Grill" },
  { src: "/images/logo_rreal.webp", alt: "Rreal Tacos" },
  { src: "/images/mangotropicallogo.webp", alt: "Mango's Tropical Cafe" },
  { src: "/images/nacho.webp", alt: "Nacho Daddy" },
];

export default function MrlaPage() {
  return (
    <main className="mt-[80px] flex-1 bg-cream">
      {/* ---- Hero ---- */}
      <section className="pb-16 pt-16 md:pb-20 md:pt-24">
        <div className="mx-auto max-w-[1080px] px-6 md:px-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-brand-orange px-3 py-1.5 font-body text-[11px] font-bold uppercase tracking-[0.1em] text-white">
              For MRLA members
            </span>
            <span className="font-body text-xs font-bold uppercase tracking-[0.12em] text-[#251f21]/50">
              Michigan Restaurant and Lodging Association
            </span>
          </div>

          <h1 className="mt-6 max-w-[15ch] font-serif text-4xl leading-tight text-[#251f21] md:text-6xl">
            What if you could grow your{" "}
            <span className="text-brand-orange">top line</span> just by
            answering the phone?
          </h1>

          <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-[#251f21]/70 md:text-xl">
            heytruffle is here to grow your top line and bring in extra
            revenue with a fully managed AI Concierge. It picks up the phone
            for you, takes your orders, books your reservations, and handles
            your catering inquiries.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-brand-orange px-8 py-4 font-body text-base font-bold text-white transition-opacity hover:opacity-90"
            >
              Book a demo
            </a>
            <span className="text-sm text-[#251f21]/50">
              MRLA members get 50% off the setup fee.
            </span>
          </div>
        </div>
      </section>

      {/* ---- Member bar ---- */}
      <section className="border-y border-[#251f21]/10 py-6">
        <div className="mx-auto flex max-w-[1080px] flex-wrap items-center gap-6 px-6 md:px-10">
          <div className="flex shrink-0 items-center rounded-2xl border border-[#251f21]/10 bg-white px-3.5 py-2.5">
            <Image
              src="/images/mrla-badge.png"
              alt="Proud Member of the Michigan Restaurant and Lodging Association"
              width={294}
              height={435}
              unoptimized
              className="h-[76px] w-auto"
            />
          </div>
          <p className="max-w-[64ch] text-[15px] leading-relaxed text-[#251f21]/70">
            heytruffle is a Proud Member of the Michigan Restaurant and
            Lodging Association. Michigan operators get a dedicated offering
            and a direct line to our founding team.
          </p>
        </div>
      </section>

      {/* ---- Offer ---- */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-[1080px] px-6 md:px-10">
          <div className="flex flex-wrap items-center justify-between gap-8 rounded-3xl border border-[#251f21]/10 bg-white p-9">
            <div>
              <span className="font-body text-xs font-bold uppercase tracking-[0.12em] text-[#251f21]/50">
                MRLA members receive
              </span>
              <ul className="mt-4 grid gap-3">
                {OFFER_ITEMS.map((item) => (
                  <li key={item.strong} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3"
                      >
                        <path d="M4 12.5l5.5 5.5L20 7" />
                      </svg>
                    </span>
                    <span className="text-[17px] text-[#251f21]/75">
                      <b className="font-semibold text-[#251f21]">
                        {item.strong}
                      </b>{" "}
                      {item.rest}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-full bg-brand-orange px-8 py-4 font-body text-base font-bold text-white transition-opacity hover:opacity-90"
            >
              Claim the offer
            </a>
          </div>
        </div>
      </section>

      {/* ---- Capabilities ---- */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-[1080px] px-6 md:px-10">
          <span className="font-body text-xs font-bold uppercase tracking-[0.12em] text-[#251f21]/50">
            What your AI Concierge handles
          </span>
          <h2 className="mt-2.5 max-w-[22ch] font-serif text-3xl text-[#251f21] md:text-4xl">
            Every call your team cannot always catch
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {CAPABILITIES.map((cap) => (
              <div
                key={cap.title}
                className="rounded-3xl border border-[#251f21]/10 bg-white p-6"
              >
                <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange">
                  <span className="h-[21px] w-[21px]">{cap.icon}</span>
                </div>
                <h3 className="mt-4 font-body text-lg font-semibold text-[#251f21]">
                  {cap.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#251f21]/55">
                  {cap.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Managed service ---- */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-[1080px] px-6 md:px-10">
          <div className="rounded-3xl bg-[#251f21] p-9 text-cream md:p-12">
            <span className="font-body text-xs font-bold uppercase tracking-[0.12em] text-cream/40">
              Service, not software
            </span>
            <h2 className="mt-2.5 max-w-[24ch] font-serif text-3xl text-cream md:text-4xl">
              You operate the restaurant. We operate the phones.
            </h2>

            <div className="mt-10 grid gap-x-10 gap-y-6 md:grid-cols-2">
              {MANAGED.map((item) => (
                <div key={item.n} className="flex gap-3.5">
                  <span className="shrink-0 pt-1 font-body text-[13px] font-bold text-brand-orange">
                    {item.n}
                  </span>
                  <div>
                    <h3 className="font-body text-[17px] font-semibold text-cream">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-cream/50">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---- Compatible with ---- */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-[1080px] px-6 md:px-10">
          <span className="font-body text-xs font-bold uppercase tracking-[0.12em] text-[#251f21]/50">
            Compatible with
          </span>
          <h2 className="mt-2.5 font-serif text-3xl text-[#251f21] md:text-4xl">
            It works alongside the tools you already run
          </h2>

          <div className="mt-8 divide-y divide-[#251f21]/10">
            {COMPAT_ROWS.map((row) => (
              <div
                key={row.category}
                className="flex flex-wrap items-center gap-7 py-5"
              >
                <span className="w-full font-body text-xs font-bold uppercase tracking-[0.12em] text-[#251f21]/50 md:w-[170px] md:shrink-0">
                  {row.category}
                </span>
                <div className="flex flex-wrap items-center gap-7">
                  {row.logos.map((logo) => (
                    <Image
                      key={logo.alt}
                      src={logo.src}
                      alt={logo.alt}
                      width={100}
                      height={22}
                      className="h-[22px] w-auto opacity-80"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Proof ---- */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-[1080px] px-6 md:px-10">
          <div className="grid gap-5 md:grid-cols-3">
            {STATS.map((s) => (
              <div
                key={s.lbl}
                className="rounded-3xl border border-[#251f21]/10 bg-white p-6 text-center"
              >
                <p className="font-serif text-4xl text-brand-orange">
                  {s.num}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#251f21]/55">
                  {s.lbl}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-14 text-center font-body text-xs font-bold uppercase tracking-[0.12em] text-[#251f21]/50">
            Trusted by 400+ brands
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-9">
            {CLIENT_LOGOS.map((logo) => (
              <Image
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={26}
                unoptimized
                className="h-[26px] w-auto opacity-70"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ---- Final CTA ---- */}
      <section className="py-20 text-center md:py-28">
        <div className="mx-auto max-w-[1080px] px-6 md:px-10">
          <h2 className="mx-auto max-w-[24ch] font-serif text-3xl text-[#251f21] md:text-4xl">
            Let your team focus on the guests in front of them
          </h2>
          <p className="mx-auto mt-4 max-w-[56ch] text-lg text-[#251f21]/70">
            Book a 30 minute call with our team. We will walk through your
            phone volume, what you are missing, and what a fully managed AI
            Concierge would look like for your group.
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-full bg-brand-orange px-8 py-4 font-body text-base font-bold text-white transition-opacity hover:opacity-90"
          >
            Book a demo
          </a>
          <p className="mt-4 text-sm text-[#251f21]/50">
            50% off the setup fee for MRLA members.
          </p>
        </div>
      </section>
    </main>
  );
}
