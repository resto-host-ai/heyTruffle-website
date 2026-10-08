"use client";

import { useState } from "react";

/**
 * OperatorFaq — "What operators ask us before they sign." (Figma "Landing 2").
 * The objections we hear on sales calls, each with who raised it, opening
 * into our answer. One open at a time.
 */

// Copy as written in the Figma — keep it verbatim.
const QUESTIONS: { q: string[]; who: string; a: React.ReactNode }[] = [
  {
    q: ["I'm scared it'll", "sound like a robot"],
    who: "Owner, 5 location group",
    a: (
      <>
        It will not. The voice is chosen by you, it speaks your menu and your
        tone, and plenty of callers finish the conversation without realizing
        they were not talking to your host. Hear one yourself: call{" "}
        <a href="tel:+14702007963" className="text-brand-orange hover:underline">
          +1 (470) 200-7963.
        </a>{" "}
        <strong className="font-semibold">
          Then we build yours, and it does not go on your line until you have
          called it and signed off.
        </strong>
      </>
    ),
  },
  {
    q: ["We're a people business.", "The phone is our first", "impression."],
    who: "Owner, restaurant group, 30 locations.",
    a: (
      <>
        So is ours. Most voice AI is one system with your name on it.
        heytruffle is built for your restaurant: your live menu from your POS,
        your hours, your policies and your tone. It confirms every order back to
        the caller, and when it is not sure it hands the call to your team
        instead of guessing.
      </>
    ),
  },
  {
    q: ["We don't have time to", "babysit another system."],
    who: "COO, 4 locations, 3 more opening",
    a: (
      <>
        <strong className="font-semibold">You will not have to.</strong> We are
        not software you maintain, we are a team that works inside your
        operation. Two customer success managers assigned to your brand, who
        know your locations and your managers and answer when you write. They
        update your menu, your hours and your policies, review real calls every
        week, and send you a report and sit down with you every month.
      </>
    ),
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
          Communly ask questions before we go live.
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
                    {/* "+" closed, "−" open: the vertical stroke folds away */}
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M10 3v14"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        className={`origin-center transition-transform [transform-box:fill-box] duration-300 ${isOpen ? "scale-y-0" : ""}`}
                      />
                      <path d="M3 10h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
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
                    <p className="max-w-[680px] pb-8 pl-[30px] text-[16px] leading-[1.5] text-ink md:max-w-[calc(680*var(--fx))] md:pb-[calc(44*var(--fx))] md:pl-[calc(46*var(--fx))] md:text-[calc(20*var(--fx))]">
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
