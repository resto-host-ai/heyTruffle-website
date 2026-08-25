"use client";

import { BookDemoButton } from "@/components/ui/BookDemoButton";

type Tier = {
  id: string;
  name: string;
  price: string;
  cadence?: string;
  tagline: string;
  features: readonly string[];
  cta?: string;
  /** Dark card in the middle of the row — the rest are light. */
  featured: boolean;
};

const TIERS: readonly Tier[] = [
  {
    id: "standard",
    name: "Standard",
    price: "$299",
    cadence: "/mo",
    tagline: "Phones handled, no integrations.",
    features: [
      "AI Concierge built and trained for your brand on your menu, hours, and policies",
      "Reservations by SMS link, FAQs, hours and directions",
      "Human escalation and routing",
      "Weekly tuning, monthly analysis",
      "Bilingual EN / ES",
    ],
    featured: false,
  },
  {
    id: "executive-one",
    name: "Executive",
    price: "$399",
    cadence: "/mo",
    tagline: "For takeout or reservation driven restaurants.",
    features: [
      "Includes everything in standard plus:",
      "One live integration",
      "Orders written into your POS",
      "Reservations written into your book",
      "Real time availability and party rules",
      "24/7 priority support",
    ],
    cta: "Start your pilot",
    featured: true,
  },
  {
    id: "executive-full",
    name: "Executive · full",
    price: "$499",
    cadence: "/mo",
    tagline: "For full service restaurants at volume.",
    features: [
      "Includes everything in executive plus:",
      "Full operation in one line.",
      "Order taking and reservations",
      "Catering and private events routing",
      "Real time wait times",
      "Dedicated CSM team with weekly call review, analytics and tuning by our team",
    ],
    cta: "Start your pilot",
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-24 bg-[#f6f3ec] pb-16 md:pb-24">
      <div className="mx-auto w-full max-w-[1180px] px-6 lg:px-[73px]">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:items-stretch">
          {TIERS.map((tier) => (
            <TierCard key={tier.id} tier={tier} />
          ))}
        </div>

        {/* ---- Enterprise — full-width band below the three tiers ---- */}
        <div className="mt-5 flex flex-col items-start gap-6 rounded-3xl bg-white p-8 shadow-[0_2px_10px_rgba(37,31,33,0.08)] md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <p className="font-body text-[17px] font-semibold text-[#251f21]">
              Enterprise
            </p>
            <p className="mt-1 font-body text-[14px] font-medium italic text-brand-orange">
              Volume pricing for multilocation groups.
            </p>
            <p className="mt-2 font-serif text-[32px] leading-none text-[#251f21] md:text-[38px]">
              Contact us
            </p>
          </div>
          <BookDemoButton className="w-full shrink-0 rounded-full border-[1.5px] border-[#251f21]/25 px-8 py-3.5 font-body text-[15px] font-semibold text-[#251f21] transition-colors hover:border-[#251f21] md:w-auto">
            Talk to our team
          </BookDemoButton>
        </div>

        <p className="mt-10 flex items-center justify-center gap-2.5 text-center font-body text-[15px] italic text-[#251f21]/70">
          <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange" />
          Start with a 90-day pilot.
        </p>
      </div>
    </section>
  );
}

function FeatureList({ tier }: { tier: Tier }) {
  return (
    <ul className="space-y-2.5">
      {tier.features.map((feature) => (
        <li
          key={feature}
          className={`flex items-start gap-3 font-body text-[13.5px] leading-snug ${
            tier.featured ? "text-cream/90" : "text-[#251f21]/75"
          }`}
        >
          <span
            aria-hidden
            className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange"
          />
          {feature}
        </li>
      ))}
    </ul>
  );
}

function TierCard({ tier }: { tier: Tier }) {
  return (
    <div
      className={
        tier.featured
          ? "flex h-full flex-col rounded-3xl bg-[#1c1917] p-8"
          : "flex h-full flex-col rounded-3xl bg-white p-8 shadow-[0_2px_10px_rgba(37,31,33,0.08)]"
      }
    >
      <h3
        className={`font-body text-[17px] font-semibold ${
          tier.featured ? "text-cream" : "text-[#251f21]"
        }`}
      >
        {tier.name}
      </h3>
      <p className="mt-1.5 font-body text-[13px] font-medium italic text-brand-orange">
        {tier.tagline}
      </p>

      <div className="mb-4 mt-4 flex items-baseline leading-none">
        <span
          className={`font-serif text-[36px] ${
            tier.featured ? "text-white" : "text-[#251f21]"
          }`}
        >
          {tier.price}
        </span>
        {tier.cadence && (
          <span
            className={`ml-1.5 font-body text-[14px] ${
              tier.featured ? "text-cream/60" : "text-[#251f21]/50"
            }`}
          >
            {tier.cadence}
          </span>
        )}
      </div>

      <div
        className={`mb-5 h-px ${tier.featured ? "bg-white/10" : "bg-[#251f21]/10"}`}
      />

      {/* Full list, always visible from md up. */}
      <div className="hidden flex-1 md:block">
        <FeatureList tier={tier} />
      </div>

      {/* Collapsed behind "More information" below md — keeps the stacked
          mobile cards short; same content, no separate copy to maintain. */}
      <details className="group flex-1 md:hidden">
        <summary
          className={`cursor-pointer list-none font-body text-[13px] font-medium underline underline-offset-2 [&::-webkit-details-marker]:hidden ${
            tier.featured ? "text-cream/80" : "text-[#251f21]/70"
          }`}
        >
          <span className="group-open:hidden">More information</span>
          <span className="hidden group-open:inline">Show less</span>
        </summary>
        <div className="mt-4">
          <FeatureList tier={tier} />
        </div>
      </details>

      {tier.cta && (
        <BookDemoButton
          className={
            tier.featured
              ? "mt-8 w-full rounded-full border-[1.5px] border-white/30 py-3.5 font-body text-[15px] font-semibold text-cream transition-colors hover:border-cream"
              : "mt-8 w-full rounded-full border-[1.5px] border-[#251f21]/25 py-3.5 font-body text-[15px] font-semibold text-[#251f21] transition-colors hover:border-[#251f21]"
          }
        >
          {tier.cta}
        </BookDemoButton>
      )}
    </div>
  );
}
