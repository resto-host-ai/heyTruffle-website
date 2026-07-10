"use client";

export function NavBar({
  step,
  total,
  onBack,
  onNext,
  nextLabel,
  nextDisabled,
  showNext,
}: {
  step: number;
  total: number;
  onBack: () => void;
  onNext: () => void;
  nextLabel: string;
  nextDisabled: boolean;
  showNext: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-[#251f21]/10 bg-[#251f21]/[0.035] px-6 py-5 md:px-10">
      <button
        type="button"
        onClick={onBack}
        disabled={step === 0}
        aria-label="Previous question"
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[13px] text-[#251f21]/60 transition-colors hover:bg-[#251f21]/5 hover:text-[#251f21] disabled:cursor-not-allowed disabled:opacity-30"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          aria-hidden
        >
          <path d="M19 12H5M11 6l-6 6 6 6" />
        </svg>
        Back
      </button>

      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#251f21]/55">
        {step + 1} / {total}
      </span>

      {showNext ? (
        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled}
          className="rounded-full bg-brand-orange px-6 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-[#d96700] disabled:pointer-events-none disabled:opacity-50"
        >
          {nextLabel}
        </button>
      ) : (
        <span className="w-24" aria-hidden />
      )}
    </div>
  );
}
