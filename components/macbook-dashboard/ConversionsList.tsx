"use client";

import { CONVERSIONS, C } from "./constants";

export function ConversionsList({ inView }: { inView: boolean }) {
  const top = CONVERSIONS.slice(0, 5);
  const max = Math.max(...top.map((c) => c.op + c.ah));
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        paddingTop: 6,
      }}
    >
      {top.map((c, i) => {
        const total = c.op + c.ah;
        const totalPct = (total / max) * 100;
        const opPct = (c.op / max) * 100;
        const ahPct = (c.ah / max) * 100;
        const delay = 0.25 + i * 0.08;
        return (
          <div
            key={c.label}
            style={{ display: "flex", flexDirection: "column", gap: 4 }}
          >
            <div
              className="flex items-center justify-between"
              style={{ fontSize: 10.5 }}
            >
              <span style={{ color: C.text, letterSpacing: "0.04em" }}>
                {c.label}
              </span>
              <span style={{ color: C.textMute, fontWeight: 600 }}>
                {total.toFixed(1)}%
              </span>
            </div>
            <div
              style={{
                position: "relative",
                width: "100%",
                height: 8,
                borderRadius: 999,
                background: "rgba(0,0,0,0.06)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  width: inView ? `${opPct}%` : "0%",
                  background: C.magenta,
                  borderRadius: 999,
                  transition: `width 1s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s`,
                }}
              />
              {c.ah > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: inView ? `${opPct}%` : "0%",
                    width: inView ? `${ahPct}%` : "0%",
                    background: C.afterHours,
                    transition: `left 1s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s, width 1s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s`,
                  }}
                />
              )}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  width: inView ? `${totalPct}%` : "0%",
                  borderRadius: 999,
                  pointerEvents: "none",
                  transition: `width 1s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
