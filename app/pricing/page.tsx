import type { Metadata } from "next";
import Pricing from "@/components/marketing/Pricing";
import PricingRoiCalculator from "@/components/marketing/PricingRoiCalculator";

const META_DESCRIPTION =
  "heytruffle pricing for restaurants: Standard, Executive and Enterprise plans. Fully managed AI phone answering with human oversight, starting at $299/mo.";

export const metadata: Metadata = {
  title: "Pricing — heytruffle",
  description: META_DESCRIPTION,
  alternates: { canonical: "/pricing/" },
};

export default function PricingPage() {
  return (
    <main className="flex-1 bg-[#f6f3ec]">
      {/* ---- Hero ---- */}
      <section className="pb-14 pt-28 md:pb-20 md:pt-36">
        <div className="mx-auto max-w-[720px] px-6 text-center">
          <p className="font-body text-[13px] font-bold uppercase tracking-[0.2em] text-[#251f21]/50">
            Pricing
          </p>
          <h1 className="mt-4 font-serif text-[40px] font-bold! leading-[110%] text-[#251f21] md:text-[52px]">
            Simple pricing<span className="text-brand-orange">.</span>
            <br />
            Full service<span className="text-brand-orange">.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[520px] font-body text-[16px] leading-relaxed text-[#251f21]/70 md:text-[18px]">
            An AI Concierge trained for your brand, monitored by our team and
            improved every week. Hospitality first.
          </p>
        </div>
      </section>

      {/* ---- Tiers ---- */}
      <Pricing />

      {/* ---- ROI calculator ---- */}
      <PricingRoiCalculator />
    </main>
  );
}
