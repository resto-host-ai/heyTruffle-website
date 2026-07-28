import Image from "next/image";
import { Fragment, type ReactNode } from "react";

/** One piece of body copy inside a legal section. */
export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "h"; text: string }
  | { type: "note"; lead?: string; text: string };

export type LegalSection = {
  /** Two-digit label shown in the accent chip, e.g. "01". */
  number: string;
  title: string;
  blocks: LegalBlock[];
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  /** Highlighted, purple-accented tail of the title, e.g. "Policy." */
  titleAccent: string;
  intro: string;
  updated: string;
  /** Paragraphs shown before the numbered sections. */
  preamble: LegalBlock[];
  sections: LegalSection[];
};

/** Auto-link email addresses inside otherwise-plain copy. */
function renderText(text: string): ReactNode {
  const parts = text.split(/([\w.+-]+@[\w-]+\.[\w.-]+)/g);
  return parts.map((part, i) =>
    /^[\w.+-]+@[\w-]+\.[\w.-]+$/.test(part) ? (
      <a
        key={i}
        href={`mailto:${part}`}
        className="font-medium text-brand-orange underline decoration-brand-orange/30 underline-offset-2 transition-colors hover:decoration-brand-orange"
      >
        {part}
      </a>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case "h":
      return (
        <h3 className="mt-8 font-serif text-xl text-[#251f21] md:text-2xl">
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p className="mt-4 text-[15px] leading-relaxed text-[#251f21]/75 md:text-base">
          {renderText(block.text)}
        </p>
      );
    case "ul":
      return (
        <ul className="mt-4 space-y-3">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="relative pl-6 text-[15px] leading-relaxed text-[#251f21]/75 md:text-base"
            >
              <span
                aria-hidden
                className="absolute left-0 top-[0.6em] h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#b53fc4] to-[#ef7200]"
              />
              {renderText(item)}
            </li>
          ))}
        </ul>
      );
    case "note":
      return (
        <div className="mt-6 rounded-2xl border border-[#251f21]/10 bg-white/70 p-5 md:p-6">
          <p className="text-[15px] leading-relaxed text-[#251f21]/80 md:text-base">
            {block.lead && (
              <span className="font-semibold text-[#251f21]">
                {block.lead}{" "}
              </span>
            )}
            {renderText(block.text)}
          </p>
        </div>
      );
  }
}

export default function LegalPage({
  eyebrow,
  title,
  titleAccent,
  intro,
  updated,
  preamble,
  sections,
}: LegalPageProps) {
  return (
    <main className="flex-1">
      {/* Hero — same dark treatment as the ROI calculator & testimonials pages */}
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
            {eyebrow}
          </p>
          <h1 className="mt-6 font-serif text-5xl leading-tight text-cream md:text-6xl">
            {title} <span className="text-[#d592f3]">{titleAccent}</span>
          </h1>
          <p className="font-body mx-auto mt-6 max-w-[680px] text-base leading-relaxed text-cream/70 md:text-lg">
            {intro}
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="bg-cream">
        <div className="mx-auto max-w-[820px] px-6 py-16 md:px-10 md:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
            {updated}
          </p>

          <div className="mt-6 border-b border-[#251f21]/10 pb-10">
            {preamble.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>

          {sections.map((section) => (
            <div
              key={section.number}
              className="border-b border-[#251f21]/10 py-10 last:border-b-0"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-sm font-semibold text-brand-orange">
                  {section.number}
                </span>
                <h2 className="font-serif text-2xl text-[#251f21] md:text-3xl">
                  {section.title}
                </h2>
              </div>
              <div className="mt-2 md:pl-10">
                {section.blocks.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
