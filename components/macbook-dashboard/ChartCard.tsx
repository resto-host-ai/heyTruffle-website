"use client";

import { C } from "./constants";
import { InfoIcon } from "./InfoIcon";

export function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl p-3.5"
      style={{
        background: C.cardBg,
        border: `1px solid ${C.border}`,
      }}
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="text-[11.5px] font-medium" style={{ color: C.text }}>
          {title}
        </div>
        <InfoIcon />
      </div>
      {children}
    </div>
  );
}
