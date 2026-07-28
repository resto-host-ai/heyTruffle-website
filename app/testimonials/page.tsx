import type { Metadata } from "next";
import Image from "next/image";
import Partner from "@/components/marketing/Partner";
import Testimonials from "@/components/marketing/Testimonials";

const DESCRIPTION =
  "See what restaurant operators say about heytruffle — the fully managed voice AI service that answers 100% of calls, recovers missed revenue, and runs 24/7 across your chain.";

export const metadata: Metadata = {
  title: "Client Testimonials — heytruffle",
  description: DESCRIPTION,
  alternates: { canonical: "/testimonials/" },
};

export default function TestimonialsPage() {
  return (
    <main className="flex-1">
      {/* Hero — same dark treatment as the ROI calculator page */}
      <section className="relative overflow-hidden bg-[#251f21] pb-16 pt-32 md:pb-20 md:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            maskImage:
              "linear-gradient(to bottom, #000 0%, #000 55%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 0%, #000 55%, transparent 100%)",
          }}
        >
          <Image
            src="/images/background_gradient.webp"
            alt=""
            fill
            priority
            quality={100}
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="relative mx-auto max-w-[820px] px-6 text-center md:px-10">
          <p className="text-xs uppercase tracking-[0.2em] text-cream/70">
            Testimonials
          </p>
          <h1 className="mt-6 font-serif text-5xl leading-tight text-cream md:text-6xl">
            Real <span className="text-[#d592f3]">testimonials.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[680px] text-base leading-relaxed text-cream/70 md:text-lg">
            Real stories from restaurant owners and teams who streamlined
            their operations, improved guest experience, and increased
            efficiency with heytruffle.
          </p>
        </div>
      </section>

      <Testimonials />
      <Partner />
    </main>
  );
}
