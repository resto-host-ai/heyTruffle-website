"use client";

import { useEffect, useRef } from "react";

export function NumberInput({
  value,
  onChange,
  onEnter,
}: {
  value: number | undefined;
  onChange: (n: number | undefined) => void;
  onEnter: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <div className="mx-auto flex max-w-[380px] items-baseline gap-3.5 border-b-2 border-[#251f21]/25 pb-2.5">
      <input
        ref={inputRef}
        type="number"
        inputMode="numeric"
        min={1}
        step={1}
        value={value ?? ""}
        onChange={(e) => {
          const raw = e.target.value;
          if (raw === "") {
            onChange(undefined);
            return;
          }
          const n = Number(raw);
          onChange(Number.isFinite(n) ? n : undefined);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onEnter();
          }
        }}
        placeholder="e.g. 1"
        className="roi-number-input flex-1 border-0 bg-transparent text-4xl font-bold text-[#251f21] outline-none placeholder:font-normal placeholder:text-[#251f21]/30"
      />
      <span className="font-mono text-xs lowercase tracking-wide text-[#251f21]/55">
        locations
      </span>
    </div>
  );
}
