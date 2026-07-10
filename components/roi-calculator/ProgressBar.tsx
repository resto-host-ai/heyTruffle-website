"use client";

export function ProgressBar({ value }: { value: number }) {
  return (
    <div
      className="relative h-1 overflow-hidden bg-[#251f21]/10"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value * 100)}
    >
      <div
        className="h-full rounded-r-full bg-gradient-to-r from-[#b53fc4] to-[#ef7200] transition-[width] duration-500 ease-out"
        style={{ width: `${Math.min(100, value * 100)}%` }}
      />
    </div>
  );
}
