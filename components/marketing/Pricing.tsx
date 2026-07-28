import { BookDemoButton } from "@/components/ui/BookDemoButton";

type Tier = {
  id: string;
  name: string;
  price: string;
  cadence?: string;
  description: string;
  badge?: string;
  features: readonly string[];
  cta: string;
  featured: boolean;
};

const TIERS: readonly Tier[] = [
  {
    id: "standard",
    name: "Standard",
    price: "$299",
    cadence: "/mo",
    description: "For single locations getting started.",
    features: [
      "Fully managed AI host for your brand",
      "Reservations, orders and FAQs, 24/7",
      "Human monitoring + weekly tuning",
      "Bilingual EN / ES",
    ],
    cta: "Get a Free Demo",
    featured: false,
  },
  {
    id: "executive",
    name: "Executive",
    price: "$499",
    cadence: "/mo",
    badge: "Most popular",
    description: "For growing multi-location groups.",
    features: [
      "Everything in Standard, plus:",
      "Catering and private events",
      "POS + reservation integrations",
      "Call reporting and outcomes",
    ],
    cta: "Get a Free Demo",
    featured: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    description: "For large restaurant groups.",
    features: [
      "Everything in Executive, plus:",
      "Multi-location rollout",
      "Dedicated account team",
      "Custom integrations + reporting",
    ],
    cta: "Talk to our team",
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-24 bg-transparent py-24 md:py-32">
      <div className="mx-auto w-full px-6 lg:px-[73px]">
        <div className="mx-auto mb-12 max-w-[680px] text-center">
          <p className="font-body text-[13px] font-bold uppercase tracking-[0.2em] text-brand-orange">
            Pricing
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-[#251f21] md:text-5xl">
            Pricing that scales with you.
          </h2>
        </div>

        <div className="grid  grid-cols-1 gap-9 md:grid-cols-3 md:items-stretch">
          {TIERS.map((tier) => (
            <TierCard key={tier.id} tier={tier} />
          ))}
        </div>

        <p className="mt-11 flex items-center justify-center gap-2.5 text-center font-body text-base text-[#251f21]/80">
          <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange" />
          Start with a 90-day pilot.
        </p>
      </div>
    </section>
  );
}

function TierCard({ tier }: { tier: Tier }) {
  return (
    <div
      className={ +
        tier.featured
          ? "relative flex h-full flex-col rounded-3xl border-2 border-brand-orange p-8 [background:linear-gradient(180deg,rgba(239,114,0,0.18)_0%,rgba(26,19,21,0)_60%),#241d1f]"
          : "flex h-full flex-col rounded-3xl border border-white/10 bg-[#241d1f] p-8"
      }
    >
      {tier.badge && (
        <div className="absolute -top-[15px] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand-orange px-4 py-1.5 font-body text-xs font-bold text-white">
          {tier.badge}
        </div>
      )}

      <h3 className="font-body text-[17px] font-semibold text-cream">{tier.name}</h3>

      <div className="mb-3 mt-3.5 flex items-baseline leading-none">
        <span className="font-serif text-[44px] text-white">{tier.price}</span>
        {tier.cadence && (
          <span className="ml-1.5 font-body text-[15px] text-cream/60">{tier.cadence}</span>
        )}
      </div>

      <p className="font-body text-sm text-cream/60">{tier.description}</p>

      <div className="my-5 h-px bg-white/10" />

      <ul className="mb-6 flex-1 space-y-2">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-center gap-3 font-body text-[13.5px] leading-snug text-cream/90">
            <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange" />
            {feature}
          </li>
        ))}
      </ul>

      <BookDemoButton
        className={
          tier.featured
            ? "w-full mt-10 rounded-[10px] bg-brand-orange py-3.5 font-body text-[15px] font-semibold text-white transition-colors hover:bg-[#c95f00]"
            : "w-full rounded-[10px] border-[1.5px] border-white/30 py-3.5 font-body text-[15px] font-semibold text-cream transition-colors hover:border-cream"
        }
      >
        {tier.cta}
      </BookDemoButton>
    </div>
  );
}
