"use client";

import { useState } from "react";

/**
 * OperatorFaq — "What operators ask us before they sign." (Figma "Landing 2").
 * The objections we hear on sales calls, each with who raised it, opening
 * into our answer. One open at a time.
 */

const QUESTIONS = [
  {
    q: ["I'm scared it'll", "sound like a robot"],
    who: "Owner, 5 location group",
    a: "It won't. Your AI Concierge is trained on your menu, your policies and your brand's voice, and it talks the way your best host does — warm, natural, and in English or Spanish. Our team listens to real calls every week and keeps tuning it, so it only gets better.",
  },
  {
    q: ["We're a people business.", "The phone is our first", "impression."],
    who: "Owner, restaurant group, 30 locations.",
    a: "That's exactly why we answer every call, on the first ring, at every location — even on your busiest Friday. Guests get a consistent, hospitable welcome, and anything that needs a person is handed straight to your team.",
  },
  {
    q: ["We don't have time to", "babysit another system."],
    who: "COO, 4 locations, 3 more opening",
    a: "You won't have to. heytruffle is a fully managed service: we set it up, connect it to the systems you already run, and our team monitors and improves it every week. New locations go live without adding work to yours.",
  },
];

export default function OperatorFaq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative w-full overflow-hidden bg-white px-5 pb-8 pt-20 font-body text-ink md:pb-[calc(40*var(--fx))] md:pt-[calc(112*var(--fx))] lg:px-[73px]">
      {/* Soft lilac / blue light at the edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 -left-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(213,146,243,0.35),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-80 top-1/4 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(55,115,215,0.28),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-[1000px]">
        <h2 className="text-center font-serif text-[36px] font-normal! leading-[1.12] md:text-[calc(64*var(--fx))]">
          What operators ask us
          <br />
          <span className="text-brand-orange">before they sign.</span>
        </h2>
        <p className="mt-4 text-center text-[16px] md:mt-[calc(32*var(--fx))] md:text-[calc(22*var(--fx))]">
          Commonly asked questions before we go live.
        </p>

        <ul className="mt-12 md:mt-[calc(70*var(--fx))]">
          {QUESTIONS.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.who}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  className="flex w-full items-center justify-between gap-6 py-8 text-left md:py-[calc(44*var(--fx))]"
                >
                  <span className="flex gap-3 md:gap-[calc(20*var(--fx))]">
                    <span aria-hidden className="font-serif text-[32px] leading-[0.9] text-brand-orange md:text-[calc(44*var(--fx))]">
                      &ldquo;
                    </span>
                    <span>
                      <span className="block font-serif text-[26px] leading-[1.15] md:text-[calc(40*var(--fx))]">
                        {item.q.map((line, j) => (
                          <span key={j} className="md:block">
                            {line}
                            {j < item.q.length - 1 ? " " : ""}
                          </span>
                        ))}
                      </span>
                      <span className="mt-3 block text-[15px] text-ink/70 md:mt-[calc(18*var(--fx))] md:text-[calc(20*var(--fx))]">
                        {item.who}
                      </span>
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-brand-orange shadow-[0_4px_14px_rgba(37,31,33,0.16)] md:h-[calc(56*var(--fx))] md:w-[calc(56*var(--fx))]"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      className={`transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                    >
                      <path d="M10 3v14M3 10h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>

                {/* Answer — grid-rows trick animates height without measuring */}
                <div
                  id={`faq-answer-${i}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[820px] pb-8 pl-[30px] text-[16px] leading-[1.55] text-ink/80 md:pb-[calc(44*var(--fx))] md:pl-[calc(46*var(--fx))] md:text-[calc(20*var(--fx))]">
                      {item.a}
                    </p>
                  </div>
                </div>
                {/* Divider, inset from the quote marks and the button as in the Figma */}
                <div aria-hidden className="h-px bg-ink/25 md:mx-[calc(70*var(--fx))]" />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
