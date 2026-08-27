import Link from "next/link";
import { BookDemoButton } from "@/components/ui/BookDemoButton";

/** Closing nudge at the bottom of pricing, after the FAQ — for whoever read
 *  this far and still isn't sure which tier fits. Points at the ROI
 *  calculator further up this same page instead of repeating its content. */
export default function PricingUndecidedCta() {
  return (
    <section className="pb-16 md:pb-24">
      <div className="mx-auto max-w-[1180px] px-6 lg:px-[73px]">
        <div className="rounded-[40px] bg-[#251f21] px-6 py-14 text-center md:px-10 md:py-20">
          <h2 className="font-serif text-[30px] font-bold! leading-[110%] text-cream md:text-[38px] lg:text-[44px]">
            Not sure which plan fits
          </h2>
          <p className="mx-auto mt-4 max-w-[480px] font-body text-[15px] leading-relaxed text-cream/75 md:text-[16px]">
            Run the numbers for your locations, or scope it with our team on a
            20 minute call.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="#roi-calculator"
              className="flex h-[54px] items-center justify-center rounded-full bg-brand-orange px-7 font-body text-[15px] font-semibold text-cream transition-all duration-300 btn-grad btn-grad-orange hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_12px_34px_rgba(239,114,0,0.55)] sm:h-[58px]"
            >
              Calculate your ROI
            </Link>
            <BookDemoButton className="flex h-[54px] items-center justify-center rounded-full bg-white/15 px-7 font-body text-[15px] font-semibold text-cream transition-colors hover:bg-white/25 sm:h-[58px]">
              Talk to our team
            </BookDemoButton>
          </div>
        </div>
      </div>
    </section>
  );
}
