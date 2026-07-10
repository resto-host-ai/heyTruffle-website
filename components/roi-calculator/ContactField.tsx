"use client";

export function ContactField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  autoFocus,
  onEnter,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  autoFocus?: boolean;
  onEnter: () => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.16em] text-[#251f21]/55">
        {label}
        <span aria-hidden className="ml-1 text-brand-orange">
          *
        </span>
      </span>
      <input
        type={type}
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onEnter();
          }
        }}
        placeholder={placeholder}
        required
        className="w-full border-0 border-b-2 border-[#251f21]/15 bg-transparent py-3 text-[17px] font-semibold text-[#251f21] outline-none transition-colors placeholder:font-normal placeholder:text-[#251f21]/35 focus:border-brand-orange"
      />
    </label>
  );
}
