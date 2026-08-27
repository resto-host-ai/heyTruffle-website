import type { Metadata } from "next";
import Pricing from "@/components/marketing/Pricing";
import PricingIncludes from "@/components/marketing/PricingIncludes";
import PricingPilotBanner from "@/components/marketing/PricingPilotBanner";
import PricingRoiCalculator from "@/components/marketing/PricingRoiCalculator";
import CaseStudiesMarquee from "@/components/case-study/CaseStudiesMarquee";
import FaqList from "@/components/faq/FaqList";

const META_DESCRIPTION =
  "heytruffle pricing for restaurants: Standard, Executive and Enterprise plans. Fully managed AI phone answering with human oversight, starting at $299/mo.";

export const metadata: Metadata = {
  title: "Pricing — heytruffle",
  description: META_DESCRIPTION,
  alternates: { canonical: "/pricing/" },
};

export default function PricingPage() {
  return (
    <main className="flex-1 mt-[80px] bg-[#f6f3ec]">
      {/* ---- Hero ---- */}
      <section className="pb-14 pt-28 md:pb-20 md:pt-24">
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

      {/* ---- Case studies ---- */}
      <CaseStudiesMarquee />

      {/* ---- 90-day pilot CTA ---- */}
      <PricingPilotBanner />

      {/* ---- What every plan includes ---- */}
      <PricingIncludes />

      {/* ---- FAQ ---- */}
      <section className="pt-16">
        <div className="mx-auto max-w-[820px] px-6 lg:px-10">
          <div className="mx-auto max-w-[600px] text-center">
            <h2 className="mt-3 font-serif text-3xl text-[#251f21] md:text-4xl">
             Question operator ask us
            </h2>
          </div>
          <div className="mt-12">
            <FaqList />
          </div>
        </div>
      </section>

    </main>
  );
}
