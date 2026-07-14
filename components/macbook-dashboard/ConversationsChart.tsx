"use client";

import { CONVERSIONS, C } from "./constants";

export function ConversionsChart({ inView }: { inView: boolean }) {
  const W = 700, H = 200;
  const PAD = { l: 32, r: 8, t: 8, b: 60 };
  const plotW = W - PAD.l - PAD.r;
  const plotH = H - PAD.t - PAD.b;
  const maxPct = 70;
  const slot = plotW / CONVERSIONS.length;
  const barW = Math.min(38, slot * 0.6);
  const yTicks = [0, 20, 40, 60];
  const baseline = PAD.t + plotH;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 200 }}>
      {yTicks.map((t) => {
        const y = PAD.t + plotH - (t / maxPct) * plotH;
        return (
          <g key={t}>
            <line x1={PAD.l} x2={W - PAD.r} y1={y} y2={y} stroke="rgba(0,0,0,0.06)" />
            <text x={PAD.l - 6} y={y + 3} textAnchor="end" fontSize="9" fill={C.textDim}>
              {t}%
            </text>
          </g>
        );
      })}

      {CONVERSIONS.map((c, i) => {
        const total = c.op + c.ah;
        const x = PAD.l + i * slot + (slot - barW) / 2;
        const totalH = (total / maxPct) * plotH;
        const opH = (c.op / maxPct) * plotH;
        const ahH = (c.ah / maxPct) * plotH;
        const yTopFinal = PAD.t + plotH - totalH;
        const delay = 0.3 + i * 0.11;
        const labelDelay = delay + 0.85;

        return (
          <g key={c.label}>
            <rect
              x={x}
              y={inView ? yTopFinal : baseline}
              width={barW}
              height={inView ? Math.max(0, opH) : 0}
              fill={C.magenta}
              rx={1.5}
              style={{
                transition: `y 1.1s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s, height 1.1s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s`,
              }}
            />
            {c.ah > 0 && (
              <rect
                x={x}
                y={inView ? yTopFinal + opH : baseline}
                width={barW}
                height={inView ? Math.max(0, ahH) : 0}
                fill={C.afterHours}
                style={{
                  transition: `y 1.1s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s, height 1.1s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s`,
                }}
              />
            )}
            <text
              x={x + barW / 2}
              y={yTopFinal - 6}
              textAnchor="middle"
              fontSize="10"
              fill={C.text}
              fontWeight="600"
              style={{
                opacity: inView ? 1 : 0,
                transition: `opacity 0.4s ease ${labelDelay}s`,
              }}
            >
              {total.toFixed(1)}%
            </text>
            <text
              x={x + barW / 2}
              y={H - PAD.b + 14}
              textAnchor="end"
              fontSize="9"
              fill={C.textMute}
              transform={`rotate(-45 ${x + barW / 2} ${H - PAD.b + 14})`}
              style={{
                opacity: inView ? 1 : 0,
                transition: `opacity 0.4s ease ${labelDelay + 0.05}s`,
              }}
            >
              {c.label}
            </text>
          </g>
        );
      })}

      <line x1={PAD.l} x2={W - PAD.r} y1={PAD.t + plotH} y2={PAD.t + plotH} stroke="rgba(0,0,0,0.18)" />
    </svg>
  );
}
