"use client";

import { useInView, useEntryCountUp } from "./hooks";
import { C } from "./constants";
import { KpiTile } from "./KpiTile";
import { ChartCard } from "./ChartCard";
import { Legend } from "./Legend";
import { ResolutionPie } from "./ResolutionPie";
import { ConversionsList } from "./ConversionsList";
import { ConversionsChart } from "./ConversationsChart";
import { CallsPerDayChart } from "./CallsPerDayChart";
import { CallsPerHourChart } from "./CallsPerHourChart";

export function MacbookDashboard() {
  const [rootRef, inView] = useInView<HTMLDivElement>();

  const calls     = useEntryCountUp(2089,  1900, inView);
  const recovered = useEntryCountUp(336,   1800, inView);
  const booked    = useEntryCountUp(86,    1500, inView);
  const err       = useEntryCountUp(14650, 2000, inView);

  const fmt = (n: number) => n.toLocaleString();

  return (
    <div ref={rootRef} className="relative mx-auto w-full max-w-[1080px]">
      <div
        className="relative overflow-hidden"
        style={{
          background: C.pageBg,
          borderRadius: 18,
          border: "1px solid rgba(20,10,30,0.08)",
          boxShadow:
            "0 1px 0 rgba(255,255,255,0.7) inset, 0 4px 12px rgba(20,10,30,0.04), 0 40px 80px -30px rgba(20,10,30,0.18)",
        }}
      >
        <div
          className="flex items-center justify-between border-b px-5 py-3.5"
          style={{ borderColor: C.borderSoft }}
        >
          <div>
            <div className="text-[14px] font-semibold" style={{ color: C.text }}>
              Monthly Overview
            </div>
            <div className="mono mt-0.5 text-[10px]" style={{ color: C.textMute, letterSpacing: "0.04em" }}>
              All locations · Last 30 days
            </div>
          </div>
          <div className="flex gap-1">
            {["7d", "30d", "90d"].map((p, i) => (
              <button
                key={p}
                type="button"
                tabIndex={-1}
                aria-hidden="true"
                className="rounded px-2 py-1 text-[10.5px]"
                style={{
                  background: i === 1 ? C.text : "transparent",
                  color: i === 1 ? "#fff" : C.textMute,
                  border: `1px solid ${i === 1 ? "transparent" : C.border}`,
                  cursor: "default",
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 lg:p-5">
          <div className="mb-3 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
            <KpiTile label="Total Calls"         value={fmt(calls)} />
            <KpiTile label="Recovered Calls"     value={fmt(recovered)} highlight />
            <KpiTile label="Reservations Booked" value={fmt(booked)} />
            <KpiTile label="Revenue Recovered"   value={`$${fmt(err)}`} />
          </div>

          <div className="mb-3 grid grid-cols-1 gap-2.5 lg:[grid-template-columns:300px_1fr]">
            <ChartCard title="Global Resolution Rate (RR)">
              <ResolutionPie inView={inView} />
            </ChartCard>
            <ChartCard title="Monthly Conversions">
              <div
                className="mb-1 flex items-center justify-end gap-3 text-[9.5px]"
                style={{ color: C.textMute }}
              >
                <Legend color={C.afterHours} label="After Hours" />
                <Legend color={C.magenta}    label="Operating Hours" />
              </div>
              <div className="hidden md:block">
                <ConversionsChart inView={inView} />
              </div>
              <div className="block md:hidden">
                <ConversionsList inView={inView} />
              </div>
            </ChartCard>
          </div>

          <div className="hidden gap-2.5 md:grid md:grid-cols-2">
            <ChartCard title="Calls per Day">
              <CallsPerDayChart inView={inView} />
            </ChartCard>
            <ChartCard title="Calls per Hour">
              <CallsPerHourChart inView={inView} />
            </ChartCard>
          </div>
        </div>
      </div>

    </div>
  );
}
