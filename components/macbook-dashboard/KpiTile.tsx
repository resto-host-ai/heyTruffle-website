"use client";

import { C } from "./constants";

export function KpiTile({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className="rounded-xl px-3.5 py-2.5"
      style={{
        background: highlight
          ? "linear-gradient(135deg, #FFEFF6, #FCE0D2)"
          : C.tileBg,
        border: highlight
          ? "1px solid rgba(165,58,130,0.20)"
          : `1px solid ${C.border}`,
      }}
    >
      <div className="mono text-[9.5px] uppercase" style={{ color: C.textMute, letterSpacing: "0.06em" }}>
        {label}
      </div>
      <div
        className="mt-1 text-[22px] font-semibold tracking-tight tabular-nums"
        style={{ color: C.text }}
      >
        {value}
      </div>
    </div>
  );
}
