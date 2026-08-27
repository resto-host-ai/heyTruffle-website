import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookDemoButton } from "@/components/ui/BookDemoButton";
import FaqList from "@/components/faq/FaqList";
import { FAQS, type Faq } from "@/lib/data/faqs";

const META_DESCRIPTION =
  "Common questions about restaurant voice AI: features, integrations, ROI, reservations, multi-unit deployment, and how heytruffle automates phone operations 24/7.";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — heytruffle",
  description: META_DESCRIPTION,
  alternates: { canonical: "/faq/" },
};

/** Plain-text answer for the FAQPage structured data. */
function answerText(faq: Faq): string {
  return faq.answer;
}

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: answerText(f) },
  })),
};

export default function FaqPage() {
  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />

      {/* ---- Hero ---- */}
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
          <p className="text-xs uppercase tracking-[0.2em] text-cream/70">FAQ</p>
          <h1 className="mt-6 font-serif text-5xl leading-tight text-cream md:text-6xl">
            Questions, <span className="text-[#d592f3]">answered.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[660px] text-base leading-relaxed text-cream/70 md:text-lg">
            The ten things restaurants ask before deploying voice AI: features,
            integrations, ROI, reservations, and how heytruffle handles every
            inbound call.
          </p>
        </div>
      </section>

      {/* ---- FAQ list ---- */}
      <section className="bg-cream">
        <div className="mx-auto max-w-[820px] px-6 py-16 md:px-10 md:py-24">
          <FaqList />
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section className="relative overflow-hidden bg-[#251f21] py-20 md:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(181,63,196,0.28) 0%, rgba(239,114,0,0.16) 50%, transparent 75%)",
          }}
        />
        <div className="relative mx-auto max-w-[720px] px-6 text-center md:px-10">
          <h2 className="font-serif text-3xl text-cream md:text-4xl">
            Still have questions?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-cream/70 md:text-base">
            See heytruffle handle a live call for your restaurant — every
            reservation booked, every order taken.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <BookDemoButton className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#b53fc4] to-[#ef7200] px-7 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90">
              Get a Free Demo
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </BookDemoButton>
            <Link
              href="/roi-calculator"
              className="rounded-full border border-cream/25 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-cream/10"
            >
              Calculate your ROI
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
