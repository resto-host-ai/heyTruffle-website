"use client";

import { useEffect, useRef } from "react";

type Stat = { value: string; title: string; desc: string };

const DEFAULT_RESULTS: Stat[] = [
  {
    value: "5,513",
    title: "Calls recovered",
    desc: "Reservations, orders and catering that would have gone unanswered.",
  },
  {
    value: "~522",
    title: "Host hours saved",
    desc: "Your team back on the floor, not the phone.",
  },
  {
    value: "84%",
    title: "Calls resolved",
    desc: "Of calls fully resolved by heytruffle's AI host.",
  },
  { value: "100%", title: "AI resolution", desc: "3 months sustained." },
  {
    value: "131",
    title: "Simultaneous calls",
    desc: "Simultaneous calls absorbed.",
  },
  { value: "5,823", title: "Calls handled", desc: "Zero escalations." },
];

const DEFAULT_INTRO =
  "Here's what changed after Rreal Tacos stopped letting calls go unanswered. Every metric below comes directly from their operations during May 2026.";

export default function SuccessStats({
  intro = DEFAULT_INTRO,
  results = DEFAULT_RESULTS,
}: {
  intro?: string;
  results?: Stat[];
} = {}) {
  const pinRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rows = [results.slice(0, 3), results.slice(3)];

  // Desktop: the section pins while scrolling; the first row of stats rises
  // from below into place, then the second row rises. Mobile: normal flow.
  useEffect(() => {
    const pin = pinRef.current;
    if (!pin) return;

    const OFFSET = 150; // px each row rises into place
    const clamp = (n: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, n));
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    let raf = 0;
    const update = () => {
      raf = 0;
      const refs = rowRefs.current;
      const n = refs.length || 1;
      const seg = 1 / n; // ordered slice of progress per row

      const isDesktop = window.innerWidth >= 768;
      if (!isDesktop) {
        refs.forEach((el) => {
          if (el) {
            el.style.transform = "";
            el.style.opacity = "";
          }
        });
        return;
      }

      const total = pin.offsetHeight - window.innerHeight;
      const rect = pin.getBoundingClientRect();
      const p = total > 0 ? clamp(-rect.top / total) : 0;
      const rp = clamp(p / 0.85); // finish before release

      refs.forEach((el, i) => {
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
    <section className="relative bg-cream text-[#251f21]">
      <div ref={pinRef} className="md:relative md:h-[220vh]">
        <div className="relative mx-auto flex w-full flex-col px-6 py-24 md:sticky md:top-0 md:h-screen md:justify-center lg:px-[73px] md:py-0">
          {/* Animated living-gradient background: orange + magenta on the left,
              blue on the right, drifting constantly like the home hero. */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 -z-10 h-full w-screen -translate-x-1/2 overflow-hidden"
          >
            <div
              className="stat-blob stat-b1 absolute left-[-6%] top-[6%] h-[540px] w-[540px] rounded-full blur-[130px]"
              style={{ backgroundColor: "#ef7200", opacity: 0.3 }}
            />
            <div
              className="stat-blob stat-b2 absolute left-[4%] top-[42%] h-[520px] w-[520px] rounded-full blur-[130px]"
              style={{ backgroundColor: "#d592f3", opacity: 0.28 }}
            />
            <div
              className="stat-blob stat-b3 absolute right-[-6%] top-[16%] h-[580px] w-[580px] rounded-full blur-[140px]"
              style={{ backgroundColor: "#3773d7", opacity: 0.28 }}
            />
            {/* Fade the blobs back into cream at the bottom edge */}
            <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-cream" />
          </div>

          <h2 className="text-center font-serif text-[30px] font-bold! leading-[110%] md:text-[38px] lg:text-[44px]">
            Success you can measure.
          </h2>
          <p className="mx-auto mt-6 max-w-[980px] text-center font-body text-[16px] font-normal leading-[145%] md:text-[18px]">
            {intro}
          </p>

          <div className="mx-auto mt-16 max-w-[1120px] space-y-16">
            {rows.map((row, i) => (
              <div
                key={i}
                ref={(el) => {
                  rowRefs.current[i] = el;
                }}
                className="grid grid-cols-1 gap-x-16 gap-y-14 will-change-transform sm:grid-cols-2 lg:grid-cols-3"
              >
                {row.map((r) => (
                  <div key={r.title} className="text-left">
                    <p className="border-b border-[#251f21]/25 pb-3 font-body text-[16px] font-bold leading-[145%] md:text-[18px]">
                      {r.title}
                    </p>
                    <p className="mt-6 font-body text-[64px] font-normal leading-[110%] md:text-[72px]">
                      {r.value}
                    </p>
                    <p className="mt-4 font-body text-[20px] font-normal leading-[120%] text-[#251f21]/70">
                      {r.desc}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
