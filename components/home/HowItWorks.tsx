"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    n: "01",
    title: "We train your AI host.",
    desc: "We learn your menu, hours, policies, tone and integrations in English and Spanish.",
    titleColor: "#f6f3ec",
    circle: "linear-gradient(180deg, #9c5a2a 0%, #3d5c9c 100%)",
    mobileBg: "#EF7300",
  },
  {
    n: "02",
    title: "It answers every call.",
    desc: "It books reservations, takes pickup and delivery orders directly into your POS, and handles catering, large parties and FAQs.",
    titleColor: "#d592f3",
    circle: "linear-gradient(180deg, #8f4a86 0%, #2f3d7c 100%)",
    mobileBg: "#DB8DC3",
  },
  {
    n: "03",
    title: "It knows when to step back.",
    desc: "Some conversations need a human. Your AI host escalates those calls to your team, while we continuously monitor and improve performance every week. You'll never be handed a dashboard to manage.",
    titleColor: "#ef7200",
    circle: "linear-gradient(180deg, #bf6a2e 0%, #3d4a8c 100%)",
    mobileBg: "#534E8B",
  },
];

export default function HowItWorks() {
  const pinRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Mobile: tap a step to expand its description (first open by default).
  /* Single-open accordion: opening a step closes whichever was open.
     Tapping the open one collapses it. */
  const [openStep, setOpenStep] = useState<number | null>(0);
  const toggleStep = (i: number) =>
    setOpenStep((prev) => (prev === i ? null : i));

  // Desktop: the section pins while the three steps reveal one at a time
  // (fade + rise), each fully in before the next begins. Only once all three
  // are shown does the page scroll on. Mobile: normal stacked flow, no pin.
  useEffect(() => {
    const pin = pinRef.current;
    if (!pin) return;

    const OFFSET = 150; // px each step rises into place
    const seg = 1 / STEPS.length; // ordered slice of progress per step
    const clamp = (n: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, n));
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    let raf = 0;
    const update = () => {
      raf = 0;
      const isDesktop = window.innerWidth >= 768;
      if (!isDesktop) {
        STEPS.forEach((_, i) => {
          const el = stepRefs.current[i];
          if (el) {
            el.style.transform = "";
            el.style.opacity = "";
          }
        });
        return;
      }

      // Progress across the pinned scroll distance (0 → 1).
      const total = pin.offsetHeight - window.innerHeight;
      const rect = pin.getBoundingClientRect();
      const p = total > 0 ? clamp(-rect.top / total) : 0;
      // Finish revealing a bit before release so the third is fully shown while
      // still pinned.
      const rp = clamp(p / 0.85);

      STEPS.forEach((_, i) => {
        const el = stepRefs.current[i];
        if (!el) return;
        const localP = clamp((rp - i * seg) / seg);
        el.style.transform = `translateY(${OFFSET * (1 - easeOut(localP))}px)`;
        el.style.opacity = String(localP);
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="how-it-works" className="relative scroll-mt-24 bg-[#251f21]">
      {/* Tall spacer drives the pinned reveal on desktop; auto height on mobile. */}
      <div ref={pinRef} className="md:relative md:h-[190vh]">
        <div className="mx-auto flex w-full flex-col px-6 py-10 md:sticky md:top-0 md:overflow-hidden md:pb-[7vh] md:pt-[13vh] lg:px-[73px]">
          <h2 className="reveal reveal-up text-center font-serif text-[30px] font-bold! leading-[110%] md:text-[38px] lg:text-[44px]">
            <span className="text-cream">Your part takes one form.</span>
            <br />
            <span className="text-[#d592f3]">Ours never stops.</span>
          </h2>
          <p
            className="reveal reveal-up font-body mx-auto mt-4 max-w-[820px] text-center text-[16px] font-normal leading-[145%] text-cream md:text-[18px]"
            style={{ "--reveal-delay": "0.08s" } as React.CSSProperties}
          >
            You fill out one form with your menu, hours and policies{" "}
            <br className="hidden md:inline" />
            so your team can stay focused on running the restaurant.
          </p>

          {/* Mobile: tap-to-expand coloured accordion */}
          <div className="mt-10 flex flex-col gap-4 md:hidden">
            {STEPS.map((step, i) => {
              const open = openStep === i;
              return (
                <div
                  key={step.n}
                  className="overflow-hidden rounded-[28px]"
                  style={{ backgroundColor: step.mobileBg }}
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => toggleStep(i)}
                    className="flex w-full items-center gap-5 px-6 py-6 text-left"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/35 bg-white/10 font-body text-lg font-bold text-cream">
                      {step.n}
                    </span>
                    <span className="font-body text-[24px] font-normal leading-[115%] text-cream">
                      {step.title}
                    </span>
                  </button>
                  <div
                    className="grid transition-[grid-template-rows] duration-300 ease-out"
                    style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 pl-[76px] font-body text-[16px] font-normal leading-[145%] text-cream/90">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop: pinned, one-at-a-time reveal in three columns */}
          <div className="mt-12 hidden gap-16 md:mt-14 md:grid md:grid-cols-3 md:items-start md:gap-2">
            {STEPS.map((step, i) => (
              <div
                key={step.n}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className="flex w-full flex-col items-center text-center will-change-transform md:items-start md:text-left"
              >
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full border border-white/25 text-center text-xl font-bold leading-none text-cream shadow-[inset_0_2px_2px_rgba(255,255,255,0.5),inset_0_-3px_5px_rgba(0,0,0,0.4),0_5px_14px_rgba(0,0,0,0.35)]"
                  style={{ backgroundImage: step.circle }}
                >
                  {step.n}
                </div>
                <h3
                  className="mt-5 mb-2 flex items-start font-body text-[16px] font-normal! leading-[120%] md:text-[18px]"
                  style={{ color: step.titleColor }}
                >
                  {step.title}
                </h3>
                <p className="font-body text-[16px] font-normal leading-[145%] text-cream md:text-[18px]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
