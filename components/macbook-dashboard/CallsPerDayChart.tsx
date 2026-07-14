"use client";

import { CALLS_PER_DAY, C } from "./constants";

export function CallsPerDayChart({ inView }: { inView: boolean }) {
  const W = 320, H = 130, PAD = { l: 28, r: 8, t: 14, b: 22 };
  const max = 130;
  const stepX = (W - PAD.l - PAD.r) / (CALLS_PER_DAY.length - 1);
  const baseY = PAD.t + (H - PAD.t - PAD.b);

  const points = CALLS_PER_DAY.map((v, i) => ({
    x: PAD.l + i * stepX,
    y: baseY - (v / max) * (H - PAD.t - PAD.b),
  }));

  const lineD = points
    .map((p, i, arr) => {
      if (i === 0) return `M ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
      const p0 = arr[i - 2] ?? arr[i - 1];
      const p1 = arr[i - 1];
      const p2 = p;
      const p3 = arr[i + 1] ?? p;
      const tension = 6;
      const cp1x = p1.x + (p2.x - p0.x) / tension;
      const cp1y = p1.y + (p2.y - p0.y) / tension;
      const cp2x = p2.x - (p3.x - p1.x) / tension;
      const cp2y = p2.y - (p3.y - p1.y) / tension;
      return `C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(
        1
      )} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    })
    .join(" ");

  const lastX = points[points.length - 1].x;
  const areaD = `${lineD} L ${lastX.toFixed(1)} ${baseY} L ${PAD.l} ${baseY} Z`;

  const yTicks = [0, 30, 60, 90, 120];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 140 }}>
      <defs>
        <linearGradient id="cpd-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={C.magentaLine} stopOpacity="0.22" />
          <stop offset="100%" stopColor={C.magentaLine} stopOpacity="0" />
        </linearGradient>
      </defs>
      {yTicks.map((t) => {
        const y = baseY - (t / max) * (H - PAD.t - PAD.b);
        return (
          <g key={t}>
            <line x1={PAD.l} x2={W - PAD.r} y1={y} y2={y} stroke="rgba(0,0,0,0.06)" />
            <text x={PAD.l - 4} y={y + 3} textAnchor="end" fontSize="7.5" fill={C.textDim}>
              {t}
            </text>
          </g>
        );
      })}
      <path
        d={areaD}
        fill="url(#cpd-fill)"
        style={{
          opacity: inView ? 1 : 0,
          transition: "opacity 0.8s ease 1.2s",
        }}
      />
      <path
        d={lineD}
        pathLength="1"
        fill="none"
        stroke={C.magentaLine}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: 1,
          strokeDashoffset: inView ? 0 : 1,
          transition:
            "stroke-dashoffset 2.4s cubic-bezier(0.2, 0.8, 0.2, 1) 0.2s",
        }}
      />
      <circle
        cx={points[points.length - 1].x}
        cy={points[points.length - 1].y}
        r="2.4"
        fill={C.magentaLine}
        style={{
          opacity: inView ? 1 : 0,
          transition: "opacity 0.3s ease 2.4s",
        }}
      />
      <circle
        cx={points[points.length - 1].x}
        cy={points[points.length - 1].y}
        r="4.5"
        fill={C.magentaLine}
        opacity="0.18"
        style={{
          opacity: inView ? 0.18 : 0,
          transition: "opacity 0.3s ease 2.4s",
        }}
      />
      {[1, 9, 17, 25, 30].map((d) => {
        const idx = d - 1;
        const x = PAD.l + idx * stepX;
        return (
          <text key={d} x={x} y={H - 6} textAnchor="middle" fontSize="7.5" fill={C.textDim}>
            {d}
          </text>
        );
      })}
      <text x={W / 2} y={H - 1} textAnchor="middle" fontSize="7" fill={C.textDim}>
        Day
      </text>
    </svg>
  );
}
