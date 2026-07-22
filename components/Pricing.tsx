import { BookDemoButton } from "@/components/BookDemoButton";

type Tier = {
  id: string;
  name: string;
  price: string;
  cadence: string;
  badge?: string;
  features: readonly string[];
  cta: string;
  featured: boolean;
};

const TIERS: readonly Tier[] = [
  {
    id: "standard",
    name: "Standard Plan",
    price: "$299",
    cadence: "/month per location",
    features: [
      "24/7 availability",
      "Pre-set voice and host agent",
      "Multilingual support",
      "Performance insights",
      "Concierge bypass",
    ],
    cta: "Get Started",
    featured: false,
  },
  {
    id: "executive",
    name: "Executive Plan",
    price: "$499",
    cadence: "/month per location",
    badge: "Best Value",
    features: [
      "Everything in Standard +",
      "100% customized host agent",
      "Reservations management",
      "Conversation summaries",
      "Dedicated Customer Success Manager",
    ],
    cta: "Book a demo",
    featured: true,
  },
  {
    id: "enterprise",
    name: "Enterprise Plan",
    price: "Contact sales",
    cadence: "for pricing",
    features: [
      "Tailored AI host solutions for chains with 25+ locations",
      "Verticalized AI across all restaurant operations",
    ],
    cta: "Contact sales",
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-24 bg-[#251f21] py-24 md:py-32">
      <div className="mx-auto w-full px-6 lg:px-[73px]">
        <div className="mx-auto mb-14 max-w-[680px] text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-cream/60">
            Our pricing
          </p>
          <h2 className="mt-5 font-serif text-4xl leading-tight text-cream md:text-5xl">
            Choose the right plan{" "}
            <span className="text-[#d592f3]">for you.</span>
          </h2>
          <p className="font-body mx-auto mt-5 max-w-md text-base leading-relaxed text-cream/70 md:text-lg">
            No matter your restaurant type or size, there&rsquo;s a plan for you.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:items-stretch md:gap-7">
          {TIERS.map((tier) => (
            <TierCard key={tier.id} tier={tier} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TierCard({ tier }: { tier: Tier }) {
  if (tier.featured) {
    return (
      <div className="relative rounded-[30px] bg-gradient-to-br from-[#b53fc4] to-[#ef7200] p-[1.5px] shadow-[0_24px_60px_-24px_rgba(181,63,196,0.55)]">
        {tier.badge && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#b53fc4] to-[#ef7200] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-lg">
            {tier.badge}
          </div>
        )}
        <TierInner tier={tier} />
      </div>
    );
  }
  return (
    <div className="rounded-[30px] border border-white/10 bg-white/[0.03]">
      <TierInner tier={tier} />
    </div>
  );
}

function TierInner({ tier }: { tier: Tier }) {
  return (
    <div className="flex h-full min-h-[480px] flex-col rounded-[calc(30px-2px)] bg-[#1c1917] p-7 md:p-8">
      <h3 className="text-xl font-medium tracking-tight text-cream">
        {tier.name}
      </h3>

      <div className="mt-6 flex items-baseline gap-1.5">
        <span
          className={`text-5xl font-light leading-none tracking-tight ${
            tier.id === "enterprise" ? "text-3xl" : ""
          } ${tier.featured ? "text-[#d592f3]" : "text-cream"}`}
        >
          {tier.price}
        </span>
        <span className="text-sm text-cream/60">{tier.cadence}</span>
      </div>

      <ul className="mb-8 mt-7 flex-1 space-y-3">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm leading-snug text-cream/85">
            <CheckIcon featured={tier.featured} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <BookDemoButton
        className={
          tier.featured
            ? "w-full rounded-full bg-gradient-to-r from-[#b53fc4] to-[#ef7200] py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
            : "w-full rounded-full border border-white/20 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-white/5"
        }
      >
        {tier.cta}
      </BookDemoButton>
    </div>
  );
}

function CheckIcon({ featured }: { featured: boolean }) {
  return (
    <span
      aria-hidden
      className={`mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full ${
        featured
          ? "bg-gradient-to-br from-[#b53fc4] to-[#ef7200]"
          : "border border-[#d592f3]/30 bg-[#d592f3]/10"
      }`}
    >
      <svg viewBox="0 0 12 12" width="10" height="10" fill="none">
        <path
          d="M2.5 6.2 L4.8 8.5 L9.5 3.5"
          stroke={featured ? "white" : "#d592f3"}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
