"use client";

import { CALLS_PER_HOUR, C } from "./constants";

export function CallsPerHourChart({ inView }: { inView: boolean }) {
  const W = 320, H = 130, PAD = { l: 28, r: 8, t: 8, b: 22 };
  const max = Math.max(...CALLS_PER_HOUR) * 1.05;
  const slot = (W - PAD.l - PAD.r) / CALLS_PER_HOUR.length;
  const barW = slot * 0.7;
  const yTicks = [0, 60, 120, 180, 240];
  const baseline = PAD.t + (H - PAD.t - PAD.b);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 140 }}>
      {yTicks.map((t) => {
        const y = PAD.t + (H - PAD.t - PAD.b) - (t / max) * (H - PAD.t - PAD.b);
        return (
          <g key={t}>
            <line x1={PAD.l} x2={W - PAD.r} y1={y} y2={y} stroke="rgba(0,0,0,0.06)" />
            <text x={PAD.l - 4} y={y + 3} textAnchor="end" fontSize="7.5" fill={C.textDim}>
              {t}
            </text>
          </g>
        );
      })}
      {CALLS_PER_HOUR.map((v, i) => {
        const x = PAD.l + i * slot + (slot - barW) / 2;
        const finalH = (v / max) * (H - PAD.t - PAD.b);
        const finalY = PAD.t + (H - PAD.t - PAD.b) - finalH;
        const delay = 0.1 + i * 0.04;
        return (
          <rect
            key={i}
            x={x}
            y={inView ? finalY : baseline}
            width={barW}
            height={inView ? Math.max(0, finalH) : 0}
            fill={C.magenta}
            rx={1}
            style={{
              transition: `y 0.95s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s, height 0.95s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s`,
            }}
          />
        );
      })}
      {[1, 6, 9, 12, 15, 18, 21, 23].map((hr) => {
        const x = PAD.l + hr * slot + slot / 2;
        return (
          <text key={hr} x={x} y={H - 6} textAnchor="middle" fontSize="7" fill={C.textDim}>
            {String(hr).padStart(2, "0")}:00
          </text>
        );
      })}
    </svg>
  );
}
