"use client";

import { useEffect, useRef, useState } from "react";

// One call sequence (the longest card, Orders, finishes its last piece at
// ~7s) plus how long the finished card holds before it plays again.
const SEQUENCE_MS = 7100;
const HOLD_MS = 10000;
const CYCLE_MS = SEQUENCE_MS + HOLD_MS;

export type StoryStep = {
  id: string;
  tab: string;
  copy: React.ReactNode;
  card: React.ReactNode;
};

/**
 * StoryScroller — the scroll story behind AiHostStory.
 *
 * Desktop: the whole scene is pinned. The section is one screen tall per
 * step; while you scroll through it, copy and card stay put in a sticky,
 * viewport-centred stage — always level with each other — and scrolling only
 * advances which step is showing: its copy fades up, its card fades in and
 * plays its call, the tabs follow along (and jump to a step when clicked).
 *
 * Mobile: each step's card sits right under its copy, as in the mobile frame.
 *
 * Animations are CSS (keyframes in globals.css); everything inside a
 * [data-story] element stays paused at frame 0 until it's [data-playing].
 */
export default function StoryScroller({ steps }: { steps: StoryStep[] }) {
  const [active, setActive] = useState(0);
  const markerRefs = useRef<(HTMLDivElement | null)[]>([]);

  // One invisible, screen-tall marker per step; whichever crosses the middle
  // of the viewport is the active step.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    markerRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const goTo = (i: number) => {
    const marker = markerRefs.current[i];
    if (!marker) return;
    window.scrollTo({ top: marker.getBoundingClientRect().top + window.scrollY, behavior: "smooth" });
  };

  return (
    <>
      {/* Mobile — copy, then its card, per step */}
      <div className="flex flex-col gap-24 md:hidden">
        {steps.map((s) => (
          <div key={s.id}>
            <CopyReveal>{s.copy}</CopyReveal>
            <div className="relative mt-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-10 -left-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(239,114,0,0.45),transparent_70%)] blur-2xl"
              />
              <CardLoop>{s.card}</CardLoop>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop — pinned scene */}
      <div className="relative hidden md:block" style={{ height: `${steps.length * 100}vh` }}>
        <div aria-hidden className="absolute inset-0 flex flex-col">
          {steps.map((s, i) => (
            <div
              key={s.id}
              ref={(el) => {
                markerRefs.current[i] = el;
              }}
              data-step={i}
              className="h-screen"
            />
          ))}
        </div>

        <div className="sticky top-0 flex h-screen items-center">
          <div className="grid w-full grid-cols-[1fr_minmax(0,calc(620*var(--fx)))] items-center gap-[calc(64*var(--fx))]">
            {/* Copy — all steps stacked in one cell; only the active one shows */}
            <div className="grid items-center">
              {steps.map((s, i) => (
                <div
                  key={s.id}
                  aria-hidden={i !== active}
                  className={`[grid-area:1/1] transition-opacity duration-500 ${
                    i === active ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                >
                  <CopyReveal active={i === active}>{s.copy}</CopyReveal>
                </div>
              ))}
            </div>

            {/* Card — tabs float above it so the card itself is what lines up
                with the copy */}
            <div className="relative">
              <div className="absolute inset-x-0 bottom-full flex justify-center gap-[calc(8*var(--fx))] pb-[calc(20*var(--fx))]">
                {steps.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={i === active}
                    className={`rounded-full px-[calc(20*var(--fx))] py-[calc(10*var(--fx))] text-[calc(14*var(--fx))] transition-colors duration-300 ${
                      i === active
                        ? "bg-brand-orange text-cream"
                        : "bg-white/10 text-cream/70 hover:bg-white/15"
                    }`}
                  >
                    {s.tab}
                  </button>
                ))}
              </div>
              <div className="grid items-center">
                {steps.map((s, i) => (
                  <div
                    key={s.id}
                    aria-hidden={i !== active}
                    className={`[grid-area:1/1] transition-opacity duration-500 ${
                      i === active ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
                  >
                    <CardLoop active={i === active}>{s.card}</CardLoop>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * Plays its copy's entrance when it's on screen. Without `active` (mobile) it
 * plays once and stays; with it (the desktop stack) it replays each time its
 * step becomes the active one.
 */
function CopyReveal({ active, children }: { active?: boolean; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: "0px 0px -8% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const playing = (active ?? true) && visible;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (playing) {
      el.dataset.playing = "";
    } else if (active === false) {
      // Rewind so it fades up again next time its step comes round.
      delete el.dataset.playing;
      el.getAnimations({ subtree: true }).forEach((a) => {
        a.currentTime = 0;
      });
    }
  }, [playing, active]);

  return (
    <div ref={ref} data-story="copy">
      {children}
    </div>
  );
}

/**
 * Plays a call card while it's both active and on screen: the sequence runs,
 * the finished card holds 10s, then it replays. Scrolled away it pauses
 * where it is; deactivated (another step took over) it rewinds, so it starts
 * fresh next time it's shown.
 */
function CardLoop({ active = true, children }: { active?: boolean; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const elapsed = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: "0px 0px -8% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const rewind = () => {
    ref.current?.getAnimations({ subtree: true }).forEach((a) => {
      a.currentTime = 0;
    });
    elapsed.current = 0;
  };

  // Deactivated: back to frame 0 for the next time it's shown.
  useEffect(() => {
    if (!active) rewind();
  }, [active]);

  const playing = active && visible;
  useEffect(() => {
    const el = ref.current;
    if (!el || !playing) return;
    el.dataset.playing = "";
    let since = performance.now();
    let timer = 0;
    const loop = () => {
      rewind();
      since = performance.now();
      timer = window.setTimeout(loop, CYCLE_MS);
    };
    timer = window.setTimeout(loop, CYCLE_MS - elapsed.current);
    return () => {
      clearTimeout(timer);
      delete el.dataset.playing;
      elapsed.current += performance.now() - since;
    };
  }, [playing]);

  return (
    <div ref={ref} data-story="card" className="relative">
      {children}
    </div>
  );
}
