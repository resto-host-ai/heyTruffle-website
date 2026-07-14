"use client";

import { useEffect, useState } from "react";
import { RESOLUTION, C } from "./constants";
import { Legend } from "./Legend";

export function ResolutionPie({ inView }: { inView: boolean }) {
  const SIZE = 220;
  const cx = SIZE / 2;
  const cy = SIZE / 2;
  const R = 80;
  const labelR = R + 18;

  const [progresses, setProgresses] = useState<number[]>(() => RESOLUTION.map(() => 0));

  useEffect(() => {
    if (!inView) return;
    const rafIds: number[] = [];
    let cumulativeDelay = 200;
    RESOLUTION.forEach((s, idx) => {
      const dur = (s.value / 100) * 1800 + 350;
      const myDelay = cumulativeDelay;
      cumulativeDelay += dur * 0.55;

      const timeoutId = window.setTimeout(() => {
        const startTime = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - startTime) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          setProgresses((prev) => {
            const next = [...prev];
            next[idx] = eased;
            return next;
          });
          if (p < 1) rafIds.push(requestAnimationFrame(tick));
        };
        rafIds.push(requestAnimationFrame(tick));
      }, myDelay);
      rafIds.push(timeoutId);
    });
    return () => rafIds.forEach((id) => {
      cancelAnimationFrame(id);
      window.clearTimeout(id);
    });
  }, [inView]);

  const START_ANGLE_DEG = 150;
  const slices = RESOLUTION.map((s, i) => {
    // Cumulative offset from all prior slices (n is tiny, so O(n²) is fine)
    // — computed purely to avoid mutating a cursor during render.
    const priorExtent = RESOLUTION.slice(0, i).reduce(
      (sum, x) => sum + (x.value / 100) * 360,
      0,
    );
    const startDeg = START_ANGLE_DEG + priorExtent;
    const fullExtent = (s.value / 100) * 360;
    const endDeg = startDeg + fullExtent * progresses[i];
    const finalEnd = startDeg + fullExtent;
    const midDeg = (startDeg + finalEnd) / 2;
    return { ...s, startDeg, endDeg, finalEnd, midDeg, fullExtent };
  });

  function sectorPath(startDeg: number, endDeg: number) {
    const extent = endDeg - startDeg;
    if (extent <= 0) return "";
    if (extent >= 359.99) {
      const sRad = (startDeg * Math.PI) / 180;
      const mRad = ((startDeg + 180) * Math.PI) / 180;
      return [
        `M ${cx} ${cy}`,
        `L ${cx + R * Math.cos(sRad)} ${cy + R * Math.sin(sRad)}`,
        `A ${R} ${R} 0 0 1 ${cx + R * Math.cos(mRad)} ${cy + R * Math.sin(mRad)}`,
        `A ${R} ${R} 0 0 1 ${cx + R * Math.cos(sRad)} ${cy + R * Math.sin(sRad)}`,
        "Z",
      ].join(" ");
    }
    const sRad = (startDeg * Math.PI) / 180;
    const eRad = (endDeg * Math.PI) / 180;
    const x1 = cx + R * Math.cos(sRad);
    const y1 = cy + R * Math.sin(sRad);
    const x2 = cx + R * Math.cos(eRad);
    const y2 = cy + R * Math.sin(eRad);
    const largeArc = extent > 180 ? 1 : 0;
    return `M ${cx} ${cy} L ${x1} ${y1} A ${R} ${R} 0 ${largeArc} 1 ${x2} ${y2} Z`;
  }

  return (
    <div className="flex flex-col items-center">
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <circle cx={cx} cy={cy} r={R} fill="#EEEEE8" />

        {slices.map((s) => (
          <path
            key={s.label}
            d={sectorPath(s.startDeg, s.endDeg)}
            fill={s.color}
          />
        ))}

        {slices.map((s, i) => {
          const angle = (s.midDeg * Math.PI) / 180;
          const x = cx + Math.cos(angle) * labelR;
          const y = cy + Math.sin(angle) * labelR + 4;
          return (
            <text
              key={s.label}
              x={x}
              y={y}
              textAnchor="middle"
              fontSize="12"
              fontWeight="600"
              fill={s.color}
              style={{
                opacity: progresses[i] > 0.7 ? 1 : 0,
                transition: "opacity 0.4s ease",
              }}
            >
              {s.value}%
            </text>
          );
        })}
      </svg>

      <div className="mt-2 flex items-center gap-3 text-[10px]" style={{ color: C.textMute }}>
        <Legend color={C.red}    label="By Pass" />
        <Legend color={C.orange} label="Partially Solved" />
        <Legend color={C.green}  label="Solved" />
      </div>
    </div>
  );
}
