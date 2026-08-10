import Image from "next/image";
import Link from "next/link";
import { BookDemoButton } from "@/components/ui/BookDemoButton";
import {
  CHOOSE_US_CHIPS,
  COMPETITORS,
  type CompetitorProfile,
} from "@/lib/data/compare";

const STATS = [
  { num: "20,000+", lbl: "calls handled every month across the group" },
  { num: "14,085", lbl: "guests seated in a typical month" },
  { num: "Every week", lbl: "our team reviews calls and tunes the AI Concierge" },
] as const;

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="h-4 w-4 shrink-0"
    >
      <path d="M5 12.5 10 17.5 19 7.5" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="shrink-0 text-[#251f21]/40 transition-transform duration-300 group-open:rotate-180"
      width="18"
      height="18"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/** Shared template every /compare/[slug] page renders from — see
 *  lib/data/compare.ts for the content that varies per competitor. */
export default function CompetitorCompare({
  competitor,
}: {
  competitor: CompetitorProfile;
}) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: competitor.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const others = COMPETITORS.filter((c) => c.slug !== competitor.slug);

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
          <p className="text-xs uppercase tracking-[0.2em] text-cream/70">
            heytruffle vs {competitor.name}
          </p>
          <h1 className="mt-6 font-serif text-5xl leading-tight text-cream md:text-6xl">
            heytruffle <span className="text-brand-orange italic">vs</span>{" "}
            <span className="text-brand-purple">{competitor.name}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[660px] text-base leading-relaxed text-cream/70 md:text-lg">
            {competitor.heroTagline}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <BookDemoButton className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#b53fc4] to-[#ef7200] px-7 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90">
              Book a demo
            </BookDemoButton>
            <a
              href="#choose"
              className="rounded-full border border-cream/25 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-cream/10"
            >
              Which one fits you
            </a>
          </div>
        </div>
      </section>

      {/* ---- The one difference ---- */}
      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-[960px] px-6 md:px-10">
          <div className="mx-auto max-w-[600px] text-center">
            <h2 className="font-serif text-3xl text-[#251f21] md:text-4xl">
              The one difference that matters
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#251f21]/60 md:text-base">
              Same job, two models. This is the split everything else follows
              from.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <div className="rounded-[26px] bg-[#251f21] p-9 text-cream">
              <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-brand-orange">
                heytruffle
              </p>
              <p className="mt-3 font-serif text-4xl">Service</p>
              <p className="mt-4 text-base leading-relaxed text-cream/80">
                Our team sets it up, listens to real calls, and tunes it for
                you every week.
              </p>
            </div>
            <div className="rounded-[26px] bg-white p-9 shadow-[0_2px_10px_rgba(37,31,33,0.08)]">
              <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#251f21]/50">
                {competitor.name}
              </p>
              <p className="mt-3 font-serif text-4xl text-[#251f21]">
                {competitor.otherModelLabel}
              </p>
              <p className="mt-4 text-base leading-relaxed text-[#251f21]/70">
                {competitor.otherModelDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Which one should you choose ---- */}
      <section id="choose" className="scroll-mt-24 bg-cream pb-16 md:pb-24">
        <div className="mx-auto max-w-[1000px] px-6 md:px-10">
          <div className="mx-auto max-w-[600px] text-center">
            <h2 className="font-serif text-3xl text-[#251f21] md:text-4xl">
              Which one should you choose
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#251f21]/60 md:text-base">
              The most useful comparison is fit. Here is the honest read,
              both ways.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <div className="rounded-[26px] bg-gradient-to-b from-[#241d20] to-[#191214] p-8 text-cream">
              <div className="mb-5 flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-orange" />
                <h3 className="font-serif text-2xl">Choose heytruffle if</h3>
              </div>
              <ul>
                {CHOOSE_US_CHIPS.map((chip, i) => (
                  <li
                    key={chip}
                    className={`flex items-start gap-3.5 py-3 text-[15px] leading-snug text-cream/90 ${
                      i > 0 ? "border-t border-white/10" : ""
                    }`}
                  >
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-orange/20 text-brand-orange">
                      <CheckIcon />
                    </span>
                    <span>{chip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[26px] bg-white p-8 shadow-[0_2px_10px_rgba(37,31,33,0.08)]">
              <div className="mb-5 flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#251f21]/30" />
                <h3 className="font-serif text-2xl text-[#251f21]">
                  {competitor.name} may fit you better if
                </h3>
              </div>
              <ul>
                {competitor.chooseThemChips.map((chip, i) => (
                  <li
                    key={chip}
                    className={`flex items-start gap-3.5 py-3 text-[15px] leading-snug text-[#251f21]/75 ${
                      i > 0 ? "border-t border-[#251f21]/10" : ""
                    }`}
                  >
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange">
                      <CheckIcon />
                    </span>
                    <span>{chip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-[560px] text-center text-sm leading-relaxed text-[#251f21]/55">
            Different operations, different tools. If {competitor.name} is
            the better fit, that is the right call. We built heytruffle for
            the groups that want hospitality handled for them.
          </p>
        </div>
      </section>

      {/* ---- Side by side ---- */}
      <section id="compare" className="scroll-mt-24 bg-cream pb-16 md:pb-24">
        <div className="mx-auto max-w-[1000px] px-6 md:px-10">
          <div className="mx-auto max-w-[600px] text-center">
            <h2 className="font-serif text-3xl text-[#251f21] md:text-4xl">
              Side by side
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#251f21]/60 md:text-base">
              A fair read of where they differ. Verify anything you rely on
              with each vendor.
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-3xl bg-white shadow-[0_2px_10px_rgba(37,31,33,0.08)]">
            <div className="hidden grid-cols-[200px_1fr_1fr] bg-[#251f21] text-cream md:grid">
              <div className="px-6 py-4 text-sm font-semibold">&nbsp;</div>
              <div className="px-6 py-4 text-sm font-semibold">
                <span className="text-brand-orange">heytruffle</span>
              </div>
              <div className="px-6 py-4 text-sm font-semibold">
                {competitor.name}
              </div>
            </div>
            {competitor.table.map((row, i) => (
              <div
                key={row.dim}
                className={`grid grid-cols-1 md:grid-cols-[200px_1fr_1fr] ${
                  i > 0 ? "border-t border-[#251f21]/10" : ""
                }`}
              >
                <div className="bg-[#fbfaf6] px-6 py-4 text-sm font-semibold text-[#251f21] md:bg-[#fbfaf6]">
                  {row.dim}
                </div>
                <div className="bg-brand-orange/[0.06] px-6 py-3.5 text-[15px] font-medium leading-snug text-[#251f21]">
                  {row.ours}
                </div>
                <div className="px-6 py-3.5 text-[15px] leading-snug text-[#251f21]/75">
                  {row.theirs}
                </div>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-[820px] text-center text-[13px] italic leading-relaxed text-[#251f21]/55">
            {competitor.tableNote}
          </p>
        </div>
      </section>

      {/* ---- Proof ---- */}
      <section className="bg-[#191214] py-16 text-cream md:py-24">
        <div className="mx-auto max-w-[1000px] px-6 text-center md:px-10">
          <h2 className="font-serif text-3xl md:text-4xl">
            Built inside a real operation, at scale
          </h2>
          <p className="mx-auto mt-3 max-w-[600px] text-sm leading-relaxed text-cream/60 md:text-base">
            heytruffle grew inside Rreal Tacos, a 12 location group in
            Georgia. These are that group’s own numbers, in a typical month.
          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {STATS.map((s, i) => (
              <div
                key={s.lbl}
                className="rounded-[22px] p-8"
                style={{
                  background:
                    i === 0
                      ? "linear-gradient(135deg,#ef7200,#9a4a02)"
                      : i === 1
                        ? "linear-gradient(135deg,#8a3b8f,#4a2e66)"
                        : "linear-gradient(135deg,#3b62d9,#23306b)",
                }}
              >
                <p className="font-serif text-4xl text-white">{s.num}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/90">
                  {s.lbl}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-[13px] text-cream/50">
            Figures reflect one client, Rreal Tacos. Your results depend on
            your volume and operation.
          </p>
        </div>
      </section>

      {/* ---- Who each one is for ---- */}
      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-[1000px] px-6 md:px-10">
          <div className="mx-auto max-w-[600px] text-center">
            <h2 className="font-serif text-3xl text-[#251f21] md:text-4xl">
              Who each one is for
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#251f21]/60 md:text-base">
              Said plainly.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <div className="rounded-[24px] bg-[#251f21] p-8 text-cream">
              <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-brand-orange">
                heytruffle is best for
              </span>
              <h3 className="mt-3 font-serif text-2xl">
                The group that wants it handled
              </h3>
              <p className="mt-3 text-base leading-relaxed text-cream/80">
                You run a US restaurant group, you care about hospitality,
                and you want the phone handled as a service, tuned every
                week, personalized to your brand.
              </p>
            </div>
            <div className="rounded-[24px] bg-white p-8 shadow-[0_2px_10px_rgba(37,31,33,0.08)]">
              <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#251f21]/50">
                {competitor.name} is best for
              </span>
              <h3 className="mt-3 font-serif text-2xl text-[#251f21]">
                {competitor.whoThemTitle}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-[#251f21]/70">
                {competitor.whoThemDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section className="bg-cream pb-16 md:pb-24">
        <div className="mx-auto max-w-[820px] px-6 md:px-10">
          <h2 className="text-center font-serif text-3xl text-[#251f21] md:text-4xl">
            Questions operators ask
          </h2>
          <div className="mt-10 overflow-hidden rounded-3xl border border-[#251f21]/10 bg-white/60">
            {competitor.faqs.map((faq, i) => (
              <details
                key={faq.q}
                className={`group ${
                  i > 0 ? "border-t border-[#251f21]/10" : ""
                }`}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-6 py-5 transition-colors hover:bg-[#251f21]/[0.03] md:px-8 [&::-webkit-details-marker]:hidden">
                  <span className="flex-1 text-base font-medium leading-snug text-[#251f21] md:text-lg">
                    {faq.q}
                  </span>
                  <ChevronIcon />
                </summary>
                <div className="px-6 pb-6 md:px-8">
                  <p className="text-[15px] leading-relaxed text-[#251f21]/70 md:text-base">
                    {faq.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
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
            You operate the restaurant. We operate the phones.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-cream/70 md:text-base">
            See heytruffle handle a live call, tuned for your brand.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <BookDemoButton className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#b53fc4] to-[#ef7200] px-7 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90">
              Book a demo
            </BookDemoButton>
          </div>

          {others.length > 0 && (
            <p className="mt-10 text-[13px] text-cream/50">
              See also:{" "}
              {others.map((c, i) => (
                <span key={c.slug}>
                  <Link
                    href={`/compare/${c.slug}`}
                    className="underline underline-offset-2 hover:text-cream"
                  >
                    heytruffle vs {c.name}
                  </Link>
                  {i < others.length - 1 ? " · " : ""}
                </span>
              ))}
            </p>
          )}
        </div>
      </section>

      <p className="bg-[#251f21] pb-8 text-center text-[12px] text-cream/40">
        {competitor.disclaimer}
      </p>
    </main>
  );
}
