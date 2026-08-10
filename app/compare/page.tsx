import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { COMPETITORS } from "@/lib/data/compare";

export const metadata: Metadata = {
  title: "Compare heytruffle — AI phone answering alternatives",
  description:
    "See how heytruffle's fully managed AI Concierge compares to Slang AI, Loman AI and TableVoice for restaurant phone answering.",
  alternates: { canonical: "/compare/" },
};

export default function ComparisonsHub() {
  return (
    <main className="flex-1">
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
            loading="eager"
            fetchPriority="low"
            quality={90}
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="relative mx-auto max-w-[820px] px-6 text-center md:px-10">
          <p className="text-xs uppercase tracking-[0.2em] text-cream/70">
            Compare
          </p>
          <h1 className="mt-6 font-serif text-5xl leading-tight text-cream md:text-6xl">
            heytruffle <span className="text-brand-purple">vs</span> the rest.
          </h1>
          <p className="mx-auto mt-6 max-w-[660px] text-base leading-relaxed text-cream/70 md:text-lg">
            An honest, side by side read of how heytruffle’s fully managed AI
            Concierge compares to the other AI phone answering options
            restaurants ask us about.
          </p>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto grid max-w-[1000px] gap-5 px-6 md:grid-cols-3 md:px-10">
          {COMPETITORS.map((c) => (
            <Link
              key={c.slug}
              href={`/compare/${c.slug}`}
              className="group flex flex-col gap-3.5 rounded-3xl bg-white p-8 shadow-[0_2px_10px_rgba(37,31,33,0.08)] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_34px_rgba(37,31,33,0.14)]"
            >
              <p className="font-serif text-2xl text-[#251f21]">
                heytruffle <span className="italic text-brand-orange">vs</span>{" "}
                {c.name}
              </p>
              <p className="flex-1 text-[15px] leading-relaxed text-[#251f21]/70">
                {c.heroTagline}
              </p>
              <span className="text-sm font-semibold text-brand-orange">
                Compare →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
