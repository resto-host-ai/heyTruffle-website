"use client";

import { useCallback, useRef, useState } from "react";
import { CardGrid } from "./CardGrid";
import { ContactFields } from "./ContactFields";
import { NavBar } from "./NavBar";
import { NumberInput } from "./NumberInput";
import { letter, OptionCard } from "./OptionCard";
import { ProgressBar } from "./ProgressBar";
import { QuestionStep } from "./QuestionStep";
import { ThanksPanel } from "./ThanksPanel";
import {
  CALLS_LABELS,
  CALL_TOPIC_LABELS,
  INITIAL,
  REGION_LABELS,
  SPEND_LABELS,
  TOTAL_STEPS,
  TURNAROUND_LABELS,
  type CallsBucket,
  type CallTopic,
  type FormState,
  type Region,
  type SpendBucket,
  type TurnaroundBucket,
} from "./types";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function RoiCalculatorForm() {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<
    "editing" | "submitting" | "done" | "error"
  >("editing");

  const formStartedRef = useRef(false);
  const track = useCallback(
    (event: string, params: Record<string, unknown> = {}) => {
      if (typeof window === "undefined") return;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event,
        form_name: "roi_calculator",
        ...params,
      });
    },
    []
  );
  const markStarted = useCallback(() => {
    if (formStartedRef.current) return;
    formStartedRef.current = true;
    track("form_start");
  }, [track]);

  const next = useCallback(() => {
    markStarted();
    setStep((s) => {
      const newStep = Math.min(TOTAL_STEPS - 1, s + 1);
      if (newStep !== s) {
        track("form_step_advance", { step_number: newStep + 1 });
      }
      return newStep;
    });
  }, [markStarted, track]);
  const back = useCallback(() => setStep((s) => Math.max(0, s - 1)), []);

  function selectAndAdvance<K extends keyof FormState>(
    key: K,
    value: FormState[K]
  ) {
    setState((p) => ({ ...p, [key]: value }));
    window.setTimeout(() => next(), 240);
  }

  const canContinueLocations =
    typeof state.locations === "number" && state.locations >= 1;
  const canSubmit =
    state.firstName.trim().length > 0 &&
    /.+@.+\..+/.test(state.email) &&
    state.company.trim().length > 0;

  async function submit() {
    if (
      !state.region ||
      !state.locations ||
      !state.turnaround ||
      !state.callTopic ||
      !state.callsPerDay ||
      !state.spendPerGuest ||
      !canSubmit
    ) {
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "roi-calculator",
          name: state.firstName,
          firstName: state.firstName,
          email: state.email,
          company: state.company,
          region: REGION_LABELS[state.region],
          locations: String(state.locations),
          turnaround: TURNAROUND_LABELS[state.turnaround],
          callTopic: CALL_TOPIC_LABELS[state.callTopic],
          callsPerDay: CALLS_LABELS[state.callsPerDay],
          spendPerGuest: SPEND_LABELS[state.spendPerGuest],
          /* Raw enum keys for the backend ROI calculation. Sent
             ALONGSIDE the display labels above (which the team inbox +
             automation rely on) — never instead of them. */
          roiInputs: {
            region: state.region,
            locations: state.locations,
            turnaround: state.turnaround,
            callTopic: state.callTopic,
            callsPerDay: state.callsPerDay,
            spendPerGuest: state.spendPerGuest,
          },
          honeypot: state.honeypot,
        }),
      });
      if (!res.ok) throw new Error(`Submit failed (${res.status})`);
      track("generate_lead");
      setStatus("done");
    } catch (err) {
      track("form_error", {
        error: err instanceof Error ? err.message : String(err),
      });
      setStatus("error");
    }
  }

  if (status === "done") {
    return <ThanksPanel firstName={state.firstName} />;
  }

  return (
    <div className="overflow-hidden rounded-[36px] bg-[#f6f3ec] shadow-2xl">
      <ProgressBar value={(step + 1) / TOTAL_STEPS} />

      <div className="roi-fade px-6 pb-8 pt-12 md:px-12 md:pt-14" key={step}>
        {step === 0 && (
          <QuestionStep
            index={1}
            total={TOTAL_STEPS}
            title="Where is your restaurant located?"
          >
            <CardGrid columns={4}>
              {(
                [
                  ["us-northeast", "Northeast"],
                  ["us-midwest", "Midwest"],
                  ["us-west", "West"],
                  ["us-south", "South"],
                ] as const
              ).map(([value, label], i) => (
                <OptionCard
                  key={value}
                  letter={letter(i)}
                  label={label}
                  sublabel="US region"
                  selected={state.region === value}
                  onSelect={() => selectAndAdvance("region", value as Region)}
                />
              ))}
            </CardGrid>
          </QuestionStep>
        )}

        {step === 1 && (
          <QuestionStep
            index={2}
            total={TOTAL_STEPS}
            title="How many locations do you operate?"
          >
            <NumberInput
              value={state.locations}
              onChange={(v) => setState((p) => ({ ...p, locations: v }))}
              onEnter={() => {
                if (canContinueLocations) next();
              }}
            />
          </QuestionStep>
        )}

        {step === 2 && (
          <QuestionStep
            index={3}
            total={TOTAL_STEPS}
            title="Average table turnaround time"
          >
            <CardGrid columns={3}>
              {(["30-60", "60-90", "90+"] as TurnaroundBucket[]).map((v, i) => (
                <OptionCard
                  key={v}
                  letter={letter(i)}
                  big={TURNAROUND_LABELS[v]}
                  sublabel={v === "90+" ? "Slower turn" : "Per table"}
                  selected={state.turnaround === v}
                  onSelect={() => selectAndAdvance("turnaround", v)}
                />
              ))}
            </CardGrid>
          </QuestionStep>
        )}

        {step === 3 && (
          <QuestionStep
            index={4}
            total={TOTAL_STEPS}
            title="What are most of your phone calls about?"
          >
            <CardGrid columns={4}>
              {(
                [
                  ["orders", "Orders"],
                  ["reservations", "Reservations"],
                  ["hours", "Operating hours"],
                  ["waitlist", "Waitlist"],
                ] as const
              ).map(([value, label], i) => (
                <OptionCard
                  key={value}
                  letter={letter(i)}
                  label={label}
                  selected={state.callTopic === value}
                  onSelect={() =>
                    selectAndAdvance("callTopic", value as CallTopic)
                  }
                />
              ))}
            </CardGrid>
          </QuestionStep>
        )}

        {step === 4 && (
          <QuestionStep
            index={5}
            total={TOTAL_STEPS}
            title="How many calls do you get per day?"
            subtitle="An estimated number between weekdays and weekends."
          >
            <CardGrid columns={4}>
              {(["0-20", "20-50", "50-100", "100+"] as CallsBucket[]).map(
                (v, i) => (
                  <OptionCard
                    key={v}
                    letter={letter(i)}
                    big={v}
                    sublabel="calls"
                    selected={state.callsPerDay === v}
                    onSelect={() => selectAndAdvance("callsPerDay", v)}
                  />
                )
              )}
            </CardGrid>
          </QuestionStep>
        )}

        {step === 5 && (
          <QuestionStep
            index={6}
            total={TOTAL_STEPS}
            title="Average spend per guest?"
          >
            <CardGrid columns={3}>
              {(["25-40", "40-70", "70+"] as SpendBucket[]).map((v, i) => (
                <OptionCard
                  key={v}
                  letter={letter(i)}
                  big={SPEND_LABELS[v]}
                  sublabel="per guest"
                  selected={state.spendPerGuest === v}
                  onSelect={() => selectAndAdvance("spendPerGuest", v)}
                />
              ))}
            </CardGrid>
          </QuestionStep>
        )}

        {step === 6 && (
          <QuestionStep
            index={7}
            total={TOTAL_STEPS}
            title="Get your personalized report"
            subtitle="We'll email you the full breakdown + tips."
          >
            <ContactFields state={state} setState={setState} onEnter={submit} />
          </QuestionStep>
        )}
      </div>

      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={state.honeypot}
        onChange={(e) => setState((p) => ({ ...p, honeypot: e.target.value }))}
        style={{
          position: "absolute",
          left: "-10000px",
          top: "auto",
          width: 1,
          height: 1,
          overflow: "hidden",
          opacity: 0,
          pointerEvents: "none",
        }}
      />

      <NavBar
        step={step}
        total={TOTAL_STEPS}
        onBack={back}
        onNext={() => {
          if (step === 1) {
            if (canContinueLocations) next();
            return;
          }
          if (step === 6) {
            submit();
            return;
          }
          next();
        }}
        nextLabel={
          step === 6
            ? status === "submitting"
              ? "Sending…"
              : "Send →"
            : "Continue →"
        }
        nextDisabled={
          (step === 1 && !canContinueLocations) ||
          (step === 6 && (!canSubmit || status === "submitting"))
        }
        showNext={step === 1 || step === 6}
      />

      {status === "error" && (
        <p
          role="alert"
          className="border-t border-[#251f21]/10 px-6 py-4 text-center text-[13px] text-brand-orange"
        >
          Something went wrong sending your submission. Please try again.
        </p>
      )}
    </div>
  );
}
