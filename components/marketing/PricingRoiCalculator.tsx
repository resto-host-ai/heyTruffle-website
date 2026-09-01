"use client";

import { useMemo, useState } from "react";

/** Average ticket by segment — same benchmark set as the mockup this was
 *  built from. "custom" reveals a free-entry ticket field instead. */
const SEGMENTS = [
  { id: "qsr", label: "Quick service", ticket: 11 },
  { id: "fastcasual", label: "Fast casual", ticket: 14 },
  { id: "casual", label: "Casual dining", ticket: 28 },
  { id: "fine", label: "Fine dining", ticket: 65 },
  { id: "custom", label: "Custom average ticket", ticket: null },
] as const;

// Executive · Full is the plan most groups land on past a pilot — used to
// price the payback estimate. Enterprise (>10 locations) prices lower per
// location at volume.
const PRICE_PER_LOCATION = 499;
const PRICE_PER_LOCATION_ENTERPRISE = 450;
const ENTERPRISE_THRESHOLD = 10;

// Industry benchmarks: ~30% of calls go unanswered, ~60% of those are for
// something actionable (order/reservation, not e.g. a wrong number), ~70%
// of actionable missed calls convert once answered.
const MISSED_CALL_RATE = 0.3;
const ACTIONABLE_SHARE = 0.6;
const CONVERSION_RATE = 0.7;
// Rough estimate of host time a missed call would otherwise have cost.
const MINUTES_PER_CALL = 2;

// Three regimes, so the card stays legible no matter what someone types:
//  - under $1M: the exact figure — what a real single-to-double-digit
//    location count produces, and what reads as credible.
//  - $1M–$999T: named short-scale units (K/M/B/T) via Intl's own compact
//    notation.
//  - beyond that: named units stop being meaningful ("quadrillion" and up
//    isn't a number anyone reads at a glance), so fall back to the same
//    mantissa-times-ten-to-the-exponent notation a calculator shows on
//    overflow — always short, always legible, no matter how large the
//    input.
const COMPACT_THRESHOLD = 1_000_000;
const SCIENTIFIC_THRESHOLD = 1_000_000_000_000_000; // 1e15

const compactFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});
const compactCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

/** "4.54e+115" — same shape a calculator falls back to once a result no
 *  longer fits its display. Handles Infinity (the actual overflow case once
 *  a chain of huge inputs multiplies past float64's ~1.8e308 range). */
function scientific(n: number): string {
  if (!Number.isFinite(n)) return "∞"; // ∞
  return n.toExponential(2);
}

const currency = (n: number) => {
  const abs = Math.abs(n);
  if (!Number.isFinite(n)) return `$${scientific(n)}`;
  if (abs < COMPACT_THRESHOLD) return `$${Math.round(n).toLocaleString("en-US")}`;
  if (abs < SCIENTIFIC_THRESHOLD) return compactCurrencyFormatter.format(n);
  return `$${scientific(n)}`;
};

const compactNumber = (n: number) => {
  const abs = Math.abs(n);
  if (!Number.isFinite(n)) return scientific(n);
  if (abs < COMPACT_THRESHOLD) return Math.round(n).toLocaleString("en-US");
  if (abs < SCIENTIFIC_THRESHOLD) return compactFormatter.format(n);
  return scientific(n);
};

// Nobody's real restaurant group does e+21 in recovered revenue — someone's
// just seeing what the calculator does. Once a result is deep enough into
// scientific notation to stop being a believable number, swap the headline
// for a joke instead (the real e+xx figure stays underneath in small type,
// so it's still checkable, just not the first thing you read).
const JOKE_TIERS: readonly { max: number; label: string }[] = [
  { max: 1e18, label: "That's a lot." },
  { max: 1e24, label: "More than a lot." },
  { max: 1e33, label: "Okay, now you're just showing off." },
  { max: 1e50, label: "That's more money than exists on Earth." },
  {
    max: 1e80,
    label: "There are ~10⁸⁰ atoms in the observable universe. You beat that.",
  },
  { max: Infinity, label: "The math broke. We respect the hustle." },
];

function funnyLabel(n: number): string | null {
  if (!Number.isFinite(n)) return JOKE_TIERS[JOKE_TIERS.length - 1].label;
  const abs = Math.abs(n);
  if (abs < SCIENTIFIC_THRESHOLD) return null;
  return (JOKE_TIERS.find((t) => abs < t.max) ?? JOKE_TIERS[JOKE_TIERS.length - 1]).label;
}

/** Parses a field's raw text for the live calculation without ever writing
 *  back into the field — clamping/replacing the string mid-type is what was
 *  fighting the browser's own number input and mangling keystrokes (typing
 *  "20" over the default "1" produced "120", "1220", etc). The raw string
 *  is only normalized on blur, once the person is done editing it. No upper
 *  bound: a 500-location group or a 500-call-a-day location is a real
 *  restaurant group, not garbage input — the compact-number formatting
 *  above is what keeps a big result from blowing out the layout, not a cap
 *  on what someone's allowed to type. */
function toNum(raw: string, min: number, fallback: number) {
  const n = Number(raw);
  if (raw.trim() === "" || !Number.isFinite(n)) return fallback;
  return Math.max(min, n);
}

const inputClass =
  "w-full rounded-xl border border-[#251f21]/15 bg-[#f6f3ec] px-4 py-3 font-body text-[15px] font-semibold text-[#251f21] outline-none transition-colors focus:border-brand-orange";
const labelClass =
  "block font-body text-[11px] font-bold uppercase tracking-[0.08em] text-[#251f21]/50";

function NumberField({
  id,
  label,
  hint,
  raw,
  onRawChange,
  min,
}: {
  id: string;
  label: string;
  hint?: string;
  raw: string;
  onRawChange: (raw: string) => void;
  min: number;
}) {
  return (
    <div>
      <label className={labelClass} htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        min={min}
        value={raw}
        onChange={(e) => onRawChange(e.target.value)}
        onBlur={() => onRawChange(String(toNum(raw, min, min)))}
        className={`${inputClass} mt-1.5`}
      />
      {hint && (
        <p className="mt-1 font-body text-[11px] text-[#251f21]/45">{hint}</p>
      )}
    </div>
  );
}

export default function PricingRoiCalculator() {
  const [locationsRaw, setLocationsRaw] = useState("2");
  const [segmentId, setSegmentId] = useState<(typeof SEGMENTS)[number]["id"]>("casual");
  const [ticketRaw, setTicketRaw] = useState("28");
  const [callsRaw, setCallsRaw] = useState("45");
  const [wageRaw, setWageRaw] = useState("15");

  const segment = SEGMENTS.find((s) => s.id === segmentId)!;
  const locations = toNum(locationsRaw, 1, 2);
  const calls = toNum(callsRaw, 1, 45);
  const ticket = segment.ticket ?? toNum(ticketRaw, 1, 28);
  const wage = toNum(wageRaw, 1, 15);

  const results = useMemo(() => {
    const missedPerMonth = locations * calls * 30 * MISSED_CALL_RATE;
    const actionable = missedPerMonth * ACTIONABLE_SHARE;
    const recovered = actionable * CONVERSION_RATE;
    const revenuePerMonth = recovered * ticket;
    const revenuePerYear = revenuePerMonth * 12;
    const hoursSavedYear = ((missedPerMonth * MINUTES_PER_CALL) / 60) * 12;
    // Value of the host time freed up, not the recovered order/reservation
    // revenue itself — a separate number from revenuePerYear on purpose.
    const laborValueYear = hoursSavedYear * wage;

    const pricePerLocation =
      locations > ENTERPRISE_THRESHOLD
        ? PRICE_PER_LOCATION_ENTERPRISE
        : PRICE_PER_LOCATION;
    const monthlyCost = locations * pricePerLocation;
    const paybackMonths =
      revenuePerMonth > 0 ? monthlyCost / revenuePerMonth : null;

    return { revenuePerYear, hoursSavedYear, laborValueYear, paybackMonths };
  }, [locations, calls, ticket, wage]);

  const paybackLabel =
    results.paybackMonths === null || !Number.isFinite(results.paybackMonths)
      ? "—"
      : results.paybackMonths < 1
        ? "<1"
        : results.paybackMonths.toFixed(1);

  const revenueJoke = funnyLabel(results.revenuePerYear);

  const assumptionFields = (
    <>
      <NumberField
        id="roi-calls"
        label="Calls per day, per location"
        hint="Industry average."
        raw={callsRaw}
        onRawChange={setCallsRaw}
        min={1}
      />
      <NumberField
        id="roi-wage"
        label="Host wage ($/hr)"
        raw={wageRaw}
        onRawChange={setWageRaw}
        min={1}
      />
    </>
  );

  return (
    <section id="roi-calculator" className="scroll-mt-24 pb-16 md:pb-24">
      <div className="mx-auto max-w-[1180px] px-6 lg:px-[73px]">
        <div className="mx-auto max-w-[600px] text-center">
          <h2 className="font-serif text-[32px] leading-[110%] text-[#251f21] md:text-[40px]">
            See what heytruffle
            <br />
            recovers for your restaurant
          </h2>
          <p className="mx-auto mt-4 max-w-[460px] font-body text-[15px] leading-relaxed text-[#251f21]/70">
            Every missed call is demand that already exists. Enter a few
            numbers and we&rsquo;ll show you what&rsquo;s on the table.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-[820px] gap-8 rounded-3xl bg-white p-8 shadow-[0_2px_10px_rgba(37,31,33,0.08)] md:grid-cols-2 md:p-10">
          {/* ---- Inputs ---- */}
          <div className="flex flex-col gap-4">
            <NumberField
              id="roi-locations"
              label="Number of locations"
              raw={locationsRaw}
              onRawChange={setLocationsRaw}
              min={1}
            />

            <div>
              <label className={labelClass} htmlFor="roi-segment">
                Restaurant type
              </label>
              <select
                id="roi-segment"
                value={segmentId}
                onChange={(e) =>
                  setSegmentId(e.target.value as (typeof SEGMENTS)[number]["id"])
                }
                className={`${inputClass} mt-1.5`}
              >
                {SEGMENTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {segment.ticket === null && (
              <NumberField
                id="roi-ticket"
                label="Average ticket ($)"
                raw={ticketRaw}
                onRawChange={setTicketRaw}
                min={1}
              />
            )}

            {/* Secondary assumptions — always visible from md up; collapsed
                behind a toggle on phones so the card doesn't run long. */}
            <div className="hidden flex-col gap-4 md:flex">{assumptionFields}</div>

            <details className="group md:hidden">
              <summary className="cursor-pointer list-none font-body text-[13px] font-semibold text-brand-orange underline underline-offset-2 [&::-webkit-details-marker]:hidden">
                <span className="group-open:hidden">Adjust assumptions</span>
                <span className="hidden group-open:inline">Hide assumptions</span>
              </summary>
              <div className="mt-4 flex flex-col gap-4">{assumptionFields}</div>
            </details>
          </div>

          {/* ---- Results ---- */}
          <div className="flex flex-col justify-center overflow-hidden rounded-2xl bg-[#f6f3ec] p-7">
            {revenueJoke ? (
              <>
                <p className="font-serif text-[26px] leading-[115%] text-brand-orange md:text-[30px]">
                  {revenueJoke}
                </p>
                <p className="mt-1.5 font-mono text-[11px] text-[#251f21]/40">
                  {currency(results.revenuePerYear)} / year, for the record
                </p>
              </>
            ) : (
              <p className="truncate font-serif text-[40px] leading-none text-brand-orange md:text-[44px]">
                {currency(results.revenuePerYear)}
              </p>
            )}
            <p className="mt-2 font-body text-[13px] font-semibold text-[#251f21]/70">
              Estimated demand recovered per year
            </p>

            <div className="mt-6 flex flex-col gap-2 border-t border-[#251f21]/10 pt-5">
              <div className="flex gap-2 items-baseline">
                <p className="font-body text-[18px] font-bold text-[#251f21]">
                  {compactNumber(results.hoursSavedYear)}
                </p>
                <p className="mt-0.5 font-body text-[11px] text-[#251f21]/50">
                  Host hours freed / year
                </p>
              </div>

              <div className="flex gap-2 items-baseline">
                <p className="font-body text-[18px] font-bold text-[#251f21]">
                  {currency(results.laborValueYear)}
                </p>
                <p className="mt-0.5 font-body text-[11px] text-[#251f21]/50">
                  Value of that time, at your host wage
                </p>
              </div>
              
              <div className="flex gap-2 items-baseline">
                <p className="font-body text-[18px] font-bold text-[#251f21]">
                  {paybackLabel}
                </p>
                <p className="mt-0.5 font-body text-[11px] text-[#251f21]/50">
                  Payback (months)
                </p>
              </div>
            </div>

            <p className="mt-5 font-body text-[11px] leading-relaxed text-[#251f21]/45">
              *Estimates use industry benchmarks for missed-call rate (~30%),
              actionable share (~60%) and conversion (~70%).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
