import type { Metadata } from "next";
import Image from "next/image";
import { RoiCalculatorForm } from "@/components/roi-calculator";

export const metadata: Metadata = {
  title: "ROI Calculator — heytruffle",
  description:
    "Calculate your monthly upside in seconds. Find out what revenue you're leaving on the table every time a call goes unanswered.",
  alternates: { canonical: "/roi-calculator/" },
};

export default function RoiCalculatorPage() {
  return (
    <main className="flex-1">
      <section className="relative overflow-hidden bg-[#251f21] pb-24 pt-32 md:pb-32 md:pt-40">
        {/* Same faded gradient backdrop as the home's dark sections */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            maskImage:
              "linear-gradient(to bottom, #000 0%, #000 70%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 0%, #000 70%, transparent 100%)",
          }}
        >
          <Image
            src="/images/background_gradient.webp"
            alt=""
            fill
            loading="eager"
            fetchPriority="low"
            quality={90}
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="relative mx-auto max-w-[1280px] px-6 md:px-10">
          <div className="mx-auto mb-12 max-w-[760px] text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-cream/70">
              Free ROI estimate
            </p>
            <h1 className="mt-6 font-serif text-4xl leading-tight text-cream md:text-6xl">
              Calculate your monthly upside{" "}
              <span className="text-[#d592f3]">in seconds.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/70 md:text-lg">
              Find out what revenue you&rsquo;re leaving on the table every
              time a call goes unanswered.
            </p>
          </div>

          <div className="mx-auto max-w-[960px]">
            <RoiCalculatorForm />
          </div>
        </div>
      </section>
    </main>
  );
}
