"use client";

export function letter(i: number) {
  return String.fromCharCode(65 + i);
}

export function OptionCard({
  letter: l,
  label,
  big,
  sublabel,
  selected,
  onSelect,
}: {
  letter: string;
  label?: string;
  big?: string;
  sublabel?: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`relative flex min-h-[130px] flex-col items-center justify-center gap-2.5 rounded-3xl border-[1.5px] px-4 pb-4 pt-7 text-center transition-all duration-200 md:min-h-[160px] ${
        selected
          ? "border-brand-orange bg-[#fff6ec] shadow-[0_0_0_3px_rgba(239,114,0,0.16),0_16px_36px_-16px_rgba(239,114,0,0.4)]"
          : "border-[#251f21]/10 bg-[#fdfbf5] hover:-translate-y-0.5 hover:border-[#251f21]/25 hover:shadow-[0_12px_28px_-16px_rgba(37,31,33,0.3)]"
      }`}
    >
      <span
        className={`absolute left-3 top-3 grid h-[22px] w-[22px] place-items-center rounded-full border font-mono text-[10px] font-bold ${
          selected
            ? "border-transparent bg-gradient-to-br from-[#b53fc4] to-[#ef7200] text-white"
            : "border-[#251f21]/20 bg-[#f6f3ec] text-[#251f21]/50"
        }`}
      >
        {l}
      </span>
      {big ? (
        <span className="font-serif text-3xl leading-none text-[#251f21] md:text-4xl">
          {big}
        </span>
      ) : (
        <span className="max-w-[12ch] text-base font-semibold text-[#251f21]">
          {label}
        </span>
      )}
      {sublabel && (
        <span className="font-mono text-xs tracking-wide text-[#251f21]/50">
          {sublabel}
        </span>
      )}
    </button>
  );
}
