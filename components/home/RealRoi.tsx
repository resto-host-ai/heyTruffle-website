/**
 * RealRoi — closes the AI host story: how little it takes for the AI
 * Concierge to pay for itself in a month (Figma "Landing 2").
 *
 * Mobile first: a compact row of three figures with their labels. From md
 * the title moves to the left and each figure grows into a large number
 * with its icon, label and "covers your AI Concierge" line.
 */

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden className="h-full w-full">
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M4 10h16M8 3v4M16 3v4" strokeLinecap="round" />
    </svg>
  );
}

function GuestsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-full w-full">
      <circle cx="12" cy="8" r="2.6" />
      <circle cx="5.5" cy="10" r="2.1" />
      <circle cx="18.5" cy="10" r="2.1" />
      <path d="M7.6 17.5c.4-2.6 2.2-4.2 4.4-4.2s4 1.6 4.4 4.2z" />
      <path d="M1.8 18c.3-2 1.7-3.3 3.7-3.3 1 0 1.8.3 2.4.8-.6.7-1 1.6-1.2 2.5z" />
      <path d="M22.2 18c-.3-2-1.7-3.3-3.7-3.3-1 0-1.8.3-2.4.8.6.7 1 1.6 1.2 2.5z" />
    </svg>
  );
}

function TakeoutIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden className="h-full w-full">
      <path d="M3 14h13M4 17h11M3.5 20h12" strokeLinecap="round" />
      <path d="M3.5 11.5C4 8.5 6.3 7 9.5 7s5.5 1.5 6 4.5z" strokeLinejoin="round" />
      <path d="M17 20l1.6-13H21" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17.2 9.5H21" strokeLinecap="round" />
    </svg>
  );
}

const FIGURES = [
  { n: "1", label: "private event", Icon: CalendarIcon },
  { n: "5", label: "reservations", Icon: GuestsIcon },
  { n: "10", label: "orders", Icon: TakeoutIcon },
];

export default function RealRoi() {
  return (
    <section className="relative z-10 w-full overflow-clip px-5 pb-20 pt-14 font-body md:pb-[calc(128*var(--fx))] md:pt-[calc(56*var(--fx))] lg:px-[73px]">
      {/* Warm orange glow coming in from the right edge, as in the Figma */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-[70%] [mask-image:linear-gradient(to_bottom,transparent,#000_25%,#000_75%,transparent)] bg-[radial-gradient(farthest-side_at_100%_60%,rgba(239,114,0,0.45),rgba(148,62,114,0.12)_55%,transparent)]"
      />
      <div className="mx-auto flex flex-col md:max-w-[calc(1330*var(--fx))] gap-5 rounded-[20px] bg-cream px-5 py-6 text-ink md:flex-row md:items-center md:gap-[calc(40*var(--fx))] md:rounded-[calc(24*var(--fx))] md:px-[calc(44*var(--fx))] md:py-[calc(48*var(--fx))] lg:gap-[calc(64*var(--fx))]">
        {/* Title */}
        <div className="shrink-0">
          <p className="text-[13px] uppercase tracking-[0.12em] text-[#6F6668] md:text-[calc(12*var(--fx))] md:font-semibold md:tracking-[0.04em]">
            Real ROI<span className="hidden md:inline">.</span>
          </p>
          <h2 className="mt-2 font-serif text-[24px] font-normal! leading-[1.1] md:max-w-[calc(190*var(--fx))] md:text-[calc(26*var(--fx))]">
            What covers a full month?
          </h2>
        </div>

        {/* Figures, joined by "or" */}
        <div className="flex flex-1 items-start justify-between gap-2 md:items-center md:justify-around md:gap-[calc(24*var(--fx))]">
          {FIGURES.map(({ n, label, Icon }, i) => (
            <div key={label} className="contents">
              {i > 0 && (
                <span className="mt-3 shrink-0 text-[13px] text-ink/40 md:mt-0 md:text-[calc(22*var(--fx))] md:font-semibold">
                  or
                </span>
              )}
              <div className="flex flex-col items-center text-center">
                <div className="flex items-end gap-1.5 md:gap-[calc(12*var(--fx))]">
                  <span className="font-serif text-[30px] leading-none text-brand-orange md:text-[calc(112*var(--fx))] md:leading-[0.8]">
                    {n}
                  </span>
                  {/* Mobile: icon beside the number. Desktop: icon above the label. */}
                  <span className="mb-1.5 h-4 w-4 md:hidden">
                    <Icon />
                  </span>
                  <span className="hidden flex-col items-start md:flex md:gap-[calc(8*var(--fx))]">
                    <span className="h-[calc(32*var(--fx))] w-[calc(32*var(--fx))]">
                      <Icon />
                    </span>
                    <span className="text-[calc(24*var(--fx))] font-semibold leading-none">{label}</span>
                  </span>
                </div>
                <span className="mt-2 whitespace-nowrap text-[14px] font-semibold md:hidden">{label}</span>
                <span className="hidden md:mt-[calc(12*var(--fx))] md:block md:text-[calc(19*var(--fx))]">covers your AI Concierge</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
