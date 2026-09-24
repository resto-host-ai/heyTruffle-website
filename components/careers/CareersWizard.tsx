"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ROLES, STEPS, type Field, type Role } from "@/lib/data/careers";
import {
  FIELD_ERRORS_ES,
  FIELD_ES,
  ROLES_ES,
  STEPS_ES,
  FIELDS_STEPS_ES,
  UI_ES,
} from "@/lib/data/careers-es";
import {
  isPlausibleFreeText,
  isValidEmail,
  isValidLinkedIn,
  isValidName,
  isValidPhone,
  sanitizeText,
} from "@/lib/validation/careers";

type Lang = "en" | "es";

/** Per-field-key validators for the "fields" steps — keyed by the same `k`
 *  the data file uses for `fullName`, `email`, `phone` and `linkedin`.
 *  Anything not listed here (optional free-text fields like `degree` or
 *  `resumeUrl`, and the select fields) has no shape to enforce beyond "not
 *  blank" / "picked". */
const FIELD_VALIDATORS: Record<string, (v: string) => boolean> = {
  fullName: isValidName,
  email: isValidEmail,
  phone: isValidPhone,
  linkedin: isValidLinkedIn,
};

const FIELD_ERRORS: Record<string, string> = {
  fullName: "Letters only, no numbers or symbols.",
  email: "Enter a real, non-disposable email address.",
  phone: "Enter a valid phone number (digits only, 7-15 of them).",
  linkedin: "Enter your LinkedIn URL or handle.",
};

// Posts to our own API route, never straight to the automation webhook —
// that URL lives server-side only (CAREERS_WEBHOOK_URL, see
// app/api/careers/route.ts), so it never ships in the browser bundle where
// anyone could copy it out of devtools and hit it directly.
const SUBMIT_ENDPOINT = "/api/careers";

type Answers = Record<string, string | string[] | undefined>;

// Every answer key the form can ever produce, derived from STEPS itself so
// it can't drift out of sync with the data file. Used to pad every autosave
// payload out to the same, full shape — see the note on saveProgress below.
const ANSWER_KEYS: string[] = STEPS.flatMap((step) =>
  step.type === "fields"
    ? step.fields.map((f) => f.k)
    : "k" in step
      ? [step.k]
      : [],
);

const CHOICE_KEYS = "ABCDEFGHIJ";

// Dial codes for the phone field's country picker — same country scope as
// VALID_TLDS in lib/validation/careers.ts, so "countries we expect
// applicants from" stays in one place conceptually even though the two
// lists live in different files for different reasons (email TLD allowlist
// vs. a phone UI). Forcing a dial code here (rather than letting people type
// a bare local number) is what fixes the Make -> ClickUp error: ClickUp's
// Phone field rejects a number with no country code.
//
// Keyed by `iso`, not `dial`, for the select's value/state — US and Canada
// both dial "+1", so keying the <select> by the dial digits meant picking
// "Canada" and "US" produced the exact same value; React (and the browser)
// then just kept showing whichever <option> with that value came first in
// the DOM (US), so the dropdown silently snapped back and never actually
// showed Canada as selected. `iso` is unique per entry, so that ambiguity
// can't happen.
// Short acronyms (US, ARG, MEX, CAN, UK), not full country names — the
// common convention for phone country pickers everywhere. Same in both
// languages: these are abbreviations, not translated words.
const DIAL_CODES = [
  { iso: "US", label: "US", labelEs: "US", dial: "+1" },
  { iso: "AR", label: "ARG", labelEs: "ARG", dial: "+54" },
  { iso: "MX", label: "MEX", labelEs: "MEX", dial: "+52" },
  { iso: "CA", label: "CAN", labelEs: "CAN", dial: "+1" },
  { iso: "GB", label: "UK", labelEs: "UK", dial: "+44" },
] as const;

type DialCode = (typeof DIAL_CODES)[number];

// A locally-formatted example number per country, shown as the input's
// placeholder — updates the moment the country picker changes, instead of
// always showing the same (Argentina-shaped) example no matter which
// country is selected.
const PHONE_PLACEHOLDERS: Record<string, string> = {
  US: "404 555 0134",
  AR: "9 11 1234 5678",
  MX: "55 1234 5678",
  CA: "416 555 0134",
  GB: "20 7946 0958",
};

/** Which DIAL_CODES entry a stored phone value ("+54 9 11 2345 6789")
 *  starts with. Longest dial match first (no two dials here are prefixes of
 *  each other, but that stays correct if a future code were), and the first
 *  DIAL_CODES entry with that dial when several share it (US over Canada)
 *  — an unavoidable guess given the value alone doesn't distinguish them;
 *  PhoneField's own iso state (set the moment someone actually picks a
 *  country) is what makes the picker itself unambiguous going forward. */
function guessCountry(value: string): DialCode {
  const v = value.trim();
  if (v.startsWith("+")) {
    const match = DIAL_CODES.filter((c) => v.startsWith(c.dial)).sort(
      (a, b) => b.dial.length - a.dial.length,
    )[0];
    if (match) return match;
  }
  return DIAL_CODES[0];
}

function combinePhone(dial: string, national: string): string {
  return national ? `${dial} ${national}` : "";
}

function PhoneField({
  value,
  onChange,
  lang,
  invalid,
  autoFocus,
}: {
  value: string;
  onChange: (v: string) => void;
  lang: Lang;
  invalid: boolean;
  autoFocus?: boolean;
}) {
  const [iso, setIso] = useState(() => guessCountry(value).iso);
  const country = DIAL_CODES.find((c) => c.iso === iso) ?? DIAL_CODES[0];
  const v = value.trim();
  const national = v.startsWith(country.dial) ? v.slice(country.dial.length).trim() : v.replace(/^\+\S*\s*/, "");

  return (
    <div className="flex gap-2">
      <select
        className={`${inputClass} w-[7.5rem] shrink-0 px-2.5`}
        value={iso}
        onChange={(e) => {
          const next = DIAL_CODES.find((c) => c.iso === e.target.value) ?? DIAL_CODES[0];
          setIso(next.iso);
          onChange(combinePhone(next.dial, national));
        }}
        aria-label={lang === "es" ? UI_ES.countryCode : "Country code"}
      >
        {DIAL_CODES.map((c) => (
          <option key={c.iso} value={c.iso}>
            {lang === "es" ? c.labelEs : c.label} {c.dial}
          </option>
        ))}
      </select>
      <input
        type="tel"
        className={`${inputClass} min-w-0 flex-1 ${invalid ? "!border-[#C95F00]" : ""}`}
        placeholder={PHONE_PLACEHOLDERS[iso]}
        value={national}
        onChange={(e) => onChange(combinePhone(country.dial, sanitizeText(e.target.value)))}
        autoFocus={autoFocus}
        aria-invalid={invalid}
      />
    </div>
  );
}

const CaretIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

type RoleDisplay = { name: string; vac: string; bullets: readonly string[]; ident: string };

// Display-only: role.id/.name stay the English canonical values used for
// selection and the interestedRoles answer (see ANSWER_KEYS / the
// interestedRoles effect below) no matter what this returns.
function roleDisplay(role: Role, lang: Lang): RoleDisplay {
  if (lang !== "es") return role;
  return ROLES_ES[role.id] ?? role;
}

function RoleCard({
  role,
  display,
  lang,
  expanded,
  onToggleExpand,
  selectable,
  selected,
  onToggleSelect,
}: {
  role: Role;
  /** Display text only — role.id/.wide (used for selection and the
   *  interestedRoles answer) always come from `role`, never from here. */
  display: RoleDisplay;
  lang: Lang;
  expanded: boolean;
  onToggleExpand: () => void;
  selectable: boolean;
  selected?: boolean;
  onToggleSelect?: () => void;
}) {
  return (
    <div
      id={role.id}
      className={`overflow-hidden rounded-2xl border-[1.5px] bg-white transition-colors ${role.wide ? "border-dashed border-brand-orange" : "border-[#DCD6CC]"
        } ${selected ? "!border-brand-orange shadow-[0_0_0_3px_rgba(239,114,0,0.12)]" : ""} ${selected && role.wide ? "!border-solid" : ""
        }`}
    >
      <button
        type="button"
        onClick={onToggleExpand}
        className="flex w-full items-center gap-3.5 px-4 py-3.5 text-left transition-colors hover:bg-[#FDF2E5] sm:px-[18px]"
      >
        {selectable && (
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              onToggleSelect?.();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                onToggleSelect?.();
              }
            }}
            aria-label={
              lang === "es" ? UI_ES.markAsInteresting(display.name) : `Mark ${display.name} as interesting`
            }
            aria-pressed={selected}
            className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border-[1.5px] transition-colors ${selected
                ? "border-brand-orange bg-brand-orange"
                : "border-[#DCD6CC] bg-white hover:border-[#B7AFA8]"
              }`}
          >
            {selected && <CheckIcon />}
          </span>
        )}
        <span className="min-w-0 flex-1">
          <span className="block text-[16px] font-semibold leading-[1.3] text-ink">
            {display.name}
          </span>
          <span className="mt-[3px] block text-[12.5px] text-[#6F6668]">{display.vac}</span>
        </span>
        <CaretIcon
          className={`h-5 w-5 shrink-0 text-[#B7AFA8] transition-transform duration-200 ${expanded ? "rotate-180" : ""
            }`}
        />
      </button>
      {/* Always in the DOM — collapsed with a CSS grid-rows trick
          (0fr/1fr + overflow-hidden) instead of conditional rendering, so
          each role's real description is present in the page's HTML for
          search/AI crawlers even though a visitor has to click to see it.
          Accordion content hidden this way (not removed from the DOM) is
          treated as regular indexable content by Google. */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
      >
        <div className="overflow-hidden">
          <div
            aria-hidden={!expanded}
            className="border-t border-[#EDE9E0] px-4 pb-[18px] pt-0.5 sm:px-[18px]"
          >
            <ul className="mt-3.5 flex flex-col gap-[11px]">
              {display.bullets.map((b, i) => (
                <li key={i} className="flex gap-3 text-[14.5px] leading-[1.5] text-[#4A4345]">
                  <span aria-hidden className="mt-2 h-[7px] w-[7px] shrink-0 rounded-full bg-brand-orange" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-[11px] bg-[#FDF2E5] px-[15px] py-[13px] text-[14px] leading-[1.5] text-ink">
              {display.ident}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// No width here on purpose — every call site sets its own (w-full almost
// everywhere, but the phone row needs a fixed-width select + a flexible
// input side by side, and a stray w-full baked into this base class fought
// with that: Tailwind's generated stylesheet order doesn't follow the order
// classes appear in a className string, so "w-full" from here was beating
// "w-[7.5rem]" appended after it and the dial-code select rendered full
// width with the number input squeezed into whatever sliver was left.
const inputClass =
  "rounded-2xl border-[1.5px] border-[#DCD6CC] bg-white px-[15px] py-[13px] font-body text-[15.5px] text-ink outline-none transition-colors focus:border-brand-orange focus:shadow-[0_0_0_3px_rgba(239,114,0,0.12)] placeholder:text-[#B7AFA8]";

function FieldInput({
  field,
  value,
  onChange,
  autoFocus,
  lang,
}: {
  field: Field;
  value: string;
  onChange: (v: string) => void;
  autoFocus?: boolean;
  lang: Lang;
}) {
  const validator = FIELD_VALIDATORS[field.k];
  const invalid = !!validator && value.trim().length > 0 && !validator(value);

  // Display-only translation: the value written to state (and eventually
  // sent to Make/ClickUp) is always the English option string below, never
  // this label — see the file header in lib/data/careers-es.ts.
  const trField = lang === "es" ? FIELD_ES[field.k] : undefined;
  const label = trField?.label ?? field.label;
  const ph = trField?.ph ?? (field.type !== "select" ? field.ph : undefined);
  const note = trField?.note ?? field.note;
  const errorMessage =
    (lang === "es" ? FIELD_ERRORS_ES[field.k] : undefined) ?? FIELD_ERRORS[field.k];

  return (
    <div>
      <label className="mb-[7px] block font-body text-[13.5px] font-semibold text-[#4A4345]">
        {label}
        {field.opt && (
          <span className="font-normal text-[#B7AFA8]">
            {" "}
            {lang === "es" ? UI_ES.optional : "(optional)"}
          </span>
        )}
      </label>
      {field.type === "select" ? (
        <select
          className={`${inputClass} w-full`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoFocus={autoFocus}
        >
          <option value="">{lang === "es" ? UI_ES.chooseAnOption : "Choose an option"}</option>
          {field.options.map((o, i) => (
            <option key={o} value={o}>
              {trField?.options?.[i] ?? o}
            </option>
          ))}
        </select>
      ) : field.k === "phone" ? (
        <PhoneField
          value={value}
          onChange={onChange}
          lang={lang}
          invalid={invalid}
          autoFocus={autoFocus}
        />
      ) : (
        <input
          type={field.type === "email" ? "email" : field.type === "tel" ? "tel" : "text"}
          className={`${inputClass} w-full ${invalid ? "!border-[#C95F00]" : ""}`}
          placeholder={ph}
          value={value}
          onChange={(e) => onChange(sanitizeText(e.target.value))}
          autoFocus={autoFocus}
          aria-invalid={invalid}
        />
      )}
      {invalid && (
        <div className="mt-1.5 text-[13px] font-medium text-[#C95F00]">
          {errorMessage}
        </div>
      )}
      {note && (
        <div className="mt-1.5 rounded-2xl bg-[#FDF2E5] px-4 py-3 text-[13.5px] leading-[1.55] text-[#4A4345]">
          {note}
        </div>
      )}
    </div>
  );
}

/**
 * Multi-step talent-pool application — a faithful port of the standalone
 * mockup, rewired onto the site's own component/token system instead of its
 * raw inline CSS. Runs below the normal site Header; the step content and
 * its own fixed bottom action bar are this component's only job.
 */
export default function CareersWizard() {
  const [sessionId, setSessionId] = useState("");
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [expandedIntro, setExpandedIntro] = useState<Set<number>>(new Set());
  const [expandedRoles, setExpandedRoles] = useState<Set<number>>(new Set());
  const [selectedRoles, setSelectedRoles] = useState<Set<number>>(new Set());
  // Display language only — never affects what's stored in `answers` or
  // sent to Make/ClickUp (see lib/data/careers-es.ts header). Starts in
  // English; a visible toggle lets the applicant switch either way.
  const [lang, setLang] = useState<Lang>("en");
  const lastSaveRef = useRef("");

  // en -> use the English string as-is; es -> use the Spanish one if we
  // have it, else fall back to English rather than showing nothing.
  const tr = useCallback(
    (en: string, es?: string) => (lang === "es" && es ? es : en),
    [lang],
  );

  useEffect(() => {
    try {
      let s = sessionStorage.getItem("tf_careers_session_id");
      if (!s) {
        s = crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;
        sessionStorage.setItem("tf_careers_session_id", s);
      }
      setSessionId(s);
    } catch {
      setSessionId(`${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`);
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [stepIndex]);

  const step = STEPS[stepIndex];

  const saveProgress = useCallback(
    (completed: boolean) => {
      if (!sessionId) return;
      // Every key present on every call, even blank ("") before the user
      // reaches that step — not just whatever's been filled so far. Make's
      // webhook "detect data structure" infers its schema from whichever
      // call it last saw; a sparse early-step payload (just session_id/
      // completed/updated_at) was overwriting the full 17-field schema
      // every time someone opened the form and dropped off before finishing.
      const fullAnswers = Object.fromEntries(
        ANSWER_KEYS.map((k) => [k, answers[k] ?? ""]),
      );
      const payload = {
        session_id: sessionId,
        completed,
        updated_at: new Date().toISOString(),
        ...fullAnswers,
      };
      const json = JSON.stringify(payload);
      if (json === lastSaveRef.current) return;
      lastSaveRef.current = json;
      fetch(SUBMIT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: json,
      }).catch(() => { });
    },
    [sessionId, stepIndex, answers],
  );

  const go = useCallback(() => {
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  }, []);
  const back = useCallback(() => {
    setStepIndex((i) => Math.max(i - 1, 0));
  }, []);

  function setAnswer(k: string, v: string | string[]) {
    setAnswers((a) => ({ ...a, [k]: v }));
  }

  const nextEnabled = useMemo(() => {
    if (step.type === "intro") return true;
    if (step.type === "fields") {
      return step.fields.every((f) => {
        const v = answers[f.k];
        const filled = typeof v === "string" && v.trim().length > 0;
        if (!filled) return !!f.opt;
        const validator = FIELD_VALIDATORS[f.k];
        return validator ? validator(v as string) : true;
      });
    }
    if (step.type === "choice") return typeof answers[step.k] === "string" && !!answers[step.k];
    if (step.type === "line" || step.type === "text") {
      const v = (answers[step.k] as string) || "";
      return isPlausibleFreeText(v, step.min);
    }
    if (step.type === "roles") return selectedRoles.size > 0;
    return true;
  }, [step, answers, selectedRoles]);

  // Enter advances (except while typing in a textarea, and letter shortcuts
  // A-J pick a "choice" option) — same shortcuts the mockup had.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (step.type === "result") return;
      if (e.key === "Enter" && nextEnabled && step.type !== "line" && step.type !== "text") {
        e.preventDefault();
        go();
      }
      if (step.type === "choice") {
        const n = CHOICE_KEYS.indexOf(e.key.toUpperCase());
        if (n >= 0 && n < step.opts.length) {
          const opt = step.opts[n];
          setAnswer(step.k, opt.t);
          setTimeout(go, 260);
        }
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [step, nextEnabled, go]);

  function toggleRoleSelect(n: number, max: number) {
    setSelectedRoles((prev) => {
      const next = new Set(prev);
      if (next.has(n)) {
        next.delete(n);
      } else {
        if (next.size >= max) return prev;
        next.add(n);
      }
      return next;
    });
  }

  useEffect(() => {
    if (step.type === "roles") {
      setAnswer(
        step.k,
        [...selectedRoles].map((n) => ROLES[n].name),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRoles]);

  const progressPct = (stepIndex / (STEPS.length - 1)) * 100;
  const showBack = stepIndex > 0 && step.type !== "result";
  const showBottomNav = step.type !== "result";

  return (
    <div className="relative flex-1 bg-cream">
      {/* Progress rail */}
      <div className="h-[3px] w-full bg-[#EDE9E0]">
        <div
          className="h-full bg-brand-orange transition-[width] duration-[450ms] ease-out"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Language toggle — display only, never touches what's stored in
          `answers` (see the Lang state comment above). Sits above the step
          content so it's reachable from any step, not just the intro. */}
      <div className="flex justify-center px-6 pt-4 sm:px-10">
        <div className="flex w-full max-w-[740px] justify-end">
          <div className="flex overflow-hidden rounded-full border-[1.5px] border-[#DCD6CC] bg-white text-[13px] font-semibold">
            <button
              type="button"
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
              className={`px-3 py-1.5 transition-colors ${lang === "en" ? "bg-brand-orange text-white" : "text-[#6F6668] hover:bg-[#FDF2E5]"}`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang("es")}
              aria-pressed={lang === "es"}
              className={`px-3 py-1.5 transition-colors ${lang === "es" ? "bg-brand-orange text-white" : "text-[#6F6668] hover:bg-[#FDF2E5]"}`}
            >
              ES
            </button>
          </div>
        </div>
      </div>

      <main className="flex justify-center px-6 pb-16 pt-8 sm:px-10">
        <div className="w-full max-w-[740px]">
          {step.type === "intro" && (
            <IntroStep
              lang={lang}
              expandedIntro={expandedIntro}
              setExpandedIntro={setExpandedIntro}
            />
          )}

          {step.type === "fields" && (
            <div>
              {(() => {
                const fieldsKey = step.fields.some((f) => f.k === "fullName")
                  ? "basics"
                  : "finalDetails";
                const trStep = lang === "es" ? FIELDS_STEPS_ES[fieldsKey] : undefined;
                return (
                  <>
                    {step.eyebrow && <Eyebrow text={tr(step.eyebrow, trStep?.eyebrow)} />}
                    <h2 className="mb-2.5 font-serif text-[26px] leading-[1.2] text-ink sm:text-[28px]">
                      {tr(step.title, trStep?.title)}
                    </h2>
                    {step.sub && (
                      <p className="mb-6 max-w-[58ch] text-[16px] text-[#4A4345]">
                        {tr(step.sub, trStep?.sub)}
                      </p>
                    )}
                  </>
                );
              })()}
              <div className="flex flex-col gap-4">
                {step.fields.map((f, idx) => (
                  <FieldInput
                    key={f.k}
                    field={f}
                    value={(answers[f.k] as string) || ""}
                    onChange={(v) => setAnswer(f.k, v)}
                    autoFocus={idx === 0}
                    lang={lang}
                  />
                ))}
              </div>
            </div>
          )}

          {step.type === "choice" && (
            <div>
              <Eyebrow text={tr(step.eyebrow, STEPS_ES[step.k]?.eyebrow)} />
              <h2 className="mb-2.5 font-serif text-[26px] leading-[1.2] text-ink sm:text-[28px]">
                {tr(step.title, STEPS_ES[step.k]?.title)}
              </h2>
              {step.sub && (
                <p className="mb-6 max-w-[58ch] text-[16px] text-[#4A4345]">
                  {tr(step.sub, STEPS_ES[step.k]?.sub)}
                </p>
              )}
              <div className="flex flex-col gap-2.5">
                {step.opts.map((o, n) => {
                  const selected = answers[step.k] === o.t;
                  // Display only — the stored/submitted value is always
                  // o.t (English), set below regardless of `lang`.
                  const optEs = STEPS_ES[step.k]?.opts?.[n];
                  return (
                    <button
                      key={o.t}
                      type="button"
                      onClick={() => {
                        setAnswer(step.k, o.t);
                        setTimeout(go, 260);
                      }}
                      className={`flex w-full items-start gap-3.5 rounded-2xl border-[1.5px] bg-white px-[18px] py-4 text-left font-body text-[15.5px] leading-[1.45] text-ink transition-all hover:-translate-y-px hover:border-[#B7AFA8] hover:shadow-[0_2px_10px_rgba(37,31,33,0.08)] ${selected
                          ? "border-brand-orange bg-[#FDF2E5] shadow-[0_0_0_3px_rgba(239,114,0,0.12)]"
                          : "border-[#DCD6CC]"
                        }`}
                    >
                      <span
                        className={`grid h-6 w-6 shrink-0 place-items-center rounded-lg border text-[12px] font-bold ${selected
                            ? "border-brand-orange bg-brand-orange text-white"
                            : "border-[#DCD6CC] bg-cream text-[#6F6668]"
                          }`}
                      >
                        {CHOICE_KEYS[n]}
                      </span>
                      <span className="flex-1">
                        {tr(o.t, optEs?.t)}
                        {(optEs?.s ?? o.s) && (
                          <small className="mt-[3px] block text-[13.5px] text-[#6F6668]">
                            {tr(o.s ?? "", optEs?.s)}
                          </small>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {(step.type === "line" || step.type === "text") && (
            <div>
              <Eyebrow text={tr(step.eyebrow, STEPS_ES[step.k]?.eyebrow)} />
              <h2 className="mb-2.5 font-serif text-[26px] leading-[1.2] text-ink sm:text-[28px]">
                {tr(step.title, STEPS_ES[step.k]?.title)}
              </h2>
              {step.sub && (
                <p className="mb-6 max-w-[58ch] text-[16px] text-[#4A4345]">
                  {tr(step.sub, STEPS_ES[step.k]?.sub)}
                </p>
              )}
              {step.type === "text" && step.warn && (
                <div className="mb-5 rounded-2xl bg-ink px-[18px] py-[15px] text-[14.5px] leading-[1.5] text-cream">
                  {tr(step.warn, STEPS_ES[step.k]?.warn)}
                </div>
              )}
              <TextAreaField step={step} answers={answers} setAnswer={setAnswer} lang={lang} tr={tr} />
            </div>
          )}

          {step.type === "roles" && (
            <div>
              <Eyebrow text={tr(step.eyebrow, STEPS_ES.interestedRoles?.eyebrow)} />
              <h2 className="mb-2.5 font-serif text-[26px] leading-[1.2] text-ink sm:text-[28px]">
                {tr(step.title, STEPS_ES.interestedRoles?.title)}
              </h2>
              {step.sub && (
                <p className="mb-6 max-w-[58ch] text-[16px] text-[#4A4345]">
                  {tr(step.sub, STEPS_ES.interestedRoles?.sub)}
                </p>
              )}
              <div className="flex flex-col gap-2.5">
                {ROLES.map((role, n) => (
                  <RoleCard
                    key={role.id}
                    role={role}
                    display={roleDisplay(role, lang)}
                    lang={lang}
                    expanded={expandedRoles.has(n)}
                    onToggleExpand={() =>
                      setExpandedRoles((prev) => {
                        const next = new Set(prev);
                        next.has(n) ? next.delete(n) : next.add(n);
                        return next;
                      })
                    }
                    selectable
                    selected={selectedRoles.has(n)}
                    onToggleSelect={() => toggleRoleSelect(n, step.max)}
                  />
                ))}
              </div>
              <div className="mt-3.5 text-[13px] text-[#6F6668]">
                {lang === "es"
                  ? UI_ES.roleSelectedCount(selectedRoles.size, step.max)
                  : `${selectedRoles.size} of ${step.max} selected`}
              </div>
            </div>
          )}

          {step.type === "result" && (
            <ResultStep
              answers={answers}
              selectedRoleNames={[...selectedRoles].map((n) => ROLES[n].name)}
              selectedRoleDisplayNames={[...selectedRoles].map(
                (n) => roleDisplay(ROLES[n], lang).name,
              )}
              openRolePicked={[...selectedRoles].some((n) => ROLES[n].id === "open")}
              sessionId={sessionId}
              saveProgress={saveProgress}
              lang={lang}
            />
          )}

          {/* In normal document flow, right after each step's content —
              NOT position:fixed. A globally-fixed bar stays pinned to the
              viewport bottom no matter how far the page scrolls, which meant
              it could end up floating on top of the site's real footer the
              moment a step's content was shorter than the viewport. Living
              in flow means it can only ever appear where the wizard's own
              content actually ends. */}
          {showBottomNav && (
            <div className="mt-10 flex items-center gap-3.5">
              <button
                type="button"
                onClick={back}
                className={`rounded-[10px] px-2 py-3.5 font-body text-[15px] font-semibold text-[#6F6668] transition-colors hover:text-ink ${showBack ? "visible" : "invisible"
                  }`}
              >
                {lang === "es" ? UI_ES.back : "Back"}
              </button>
              <span className="flex-1" />
              <button
                type="button"
                onClick={go}
                disabled={!nextEnabled}
                className="rounded-[10px] border-[1.5px] border-transparent bg-brand-orange px-[26px] py-3.5 font-body text-[15px] font-semibold text-white transition-colors hover:bg-[#C95F00] disabled:cursor-not-allowed disabled:bg-[#DCD6CC] disabled:text-[#6F6668]"
              >
                {lang === "es"
                  ? step.type === "intro"
                    ? UI_ES.start
                    : UI_ES.continue
                  : step.type === "intro"
                    ? "Start"
                    : "Continue"}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function Eyebrow({ text }: { text: string }) {
  return (
    <div className="mb-3.5 font-body text-[12px] font-semibold uppercase tracking-[0.09em] text-[#6F6668]">
      {text}
    </div>
  );
}

function TextAreaField({
  step,
  answers,
  setAnswer,
  lang,
  tr,
}: {
  step: Extract<(typeof STEPS)[number], { type: "line" | "text" }>;
  answers: Answers;
  setAnswer: (k: string, v: string) => void;
  lang: Lang;
  tr: (en: string, es?: string) => string;
}) {
  const value = (answers[step.k] as string) || "";
  const heightClass =
    step.type === "line"
      ? "min-h-16"
      : step.cls === "big"
        ? "min-h-[140px]"
        : step.cls === "one"
          ? "min-h-16"
          : "min-h-28";
  const overLimit = step.type === "line" && value.length > step.max - 20;

  return (
    <div>
      <textarea
        autoFocus
        value={value}
        maxLength={step.type === "line" ? step.max : undefined}
        placeholder={tr(step.ph ?? "", STEPS_ES[step.k]?.ph)}
        onChange={(e) => setAnswer(step.k, sanitizeText(e.target.value))}
        className={`${inputClass} w-full ${heightClass} resize-y leading-[1.55]`}
      />
      <div className={`mt-1.5 text-right text-[12px] ${overLimit ? "font-semibold text-[#C95F00]" : "text-[#B7AFA8]"}`}>
        {step.type === "line"
          ? `${value.length} / ${step.max}`
          : lang === "es"
            ? UI_ES.charactersCount(value.length)
            : `${value.length} characters`}
      </div>
    </div>
  );
}

function IntroStep({
  lang,
  expandedIntro,
  setExpandedIntro,
}: {
  lang: Lang;
  expandedIntro: Set<number>;
  setExpandedIntro: React.Dispatch<React.SetStateAction<Set<number>>>;
}) {
  return (
    <div>
      <div className="mb-3.5 font-body text-[12px] font-semibold uppercase tracking-[0.09em] text-[#6F6668]">
        {lang === "es" ? "Bolsa de talento" : "Talent pool"}
      </div>
      <h1 className="mb-[22px] font-serif text-[38px] font-bold leading-[1.02] tracking-tight text-ink sm:text-[52px]">
        {lang === "es" ? "Posiciones abiertas en heytruffle" : "Open roles at heytruffle"}
      </h1>
      {lang === "es" ? (
        <>
          <p className="mb-[15px] max-w-[62ch] text-[17px] text-[#4A4345]">
            HeyTruffle es una empresa <strong className="font-semibold text-ink">AI-native</strong>.
            Construimos los agentes conversacionales que atienden el teléfono de cadenas de
            restaurantes en Estados Unidos: reservas, pedidos, catering, eventos. Miles de llamadas
            por semana, en vivo, sin ningún humano del otro lado.
          </p>
          <p className="mb-[15px] max-w-[62ch] text-[17px] text-[#4A4345]">
            Trabajamos con <strong className="font-semibold text-ink">más de 100 restaurantes y cadenas</strong>,
            y estamos integrados con las plataformas más grandes del mercado de EE.UU.:{" "}
            <strong className="font-semibold text-ink">UberEats, OpenTable, Toast</strong>, y otras.
          </p>
          <p className="mb-[15px] max-w-[62ch] text-[17px] text-[#4A4345]">
            Competimos cara a cara con las empresas más grandes del rubro en el mercado de EE.UU.,
            respaldados por inversores estadounidenses, con todo el equipo en Buenos Aires. Es la
            industria más antigua del mundo cruzada con la tecnología más nueva, y todavía está
            abierto quién gana.
          </p>
          <p className="mb-[15px] max-w-[62ch] text-[17px] text-[#4A4345]">
            <strong className="font-semibold text-ink">No hace falta que seas experto en IA para sumarte.</strong>{" "}
            Vas a aprender a usar estas herramientas mucho mejor de lo que las usás hoy, con un
            equipo que está para enseñarte y un negocio que te empuja a mantenerte a la vanguardia.
          </p>

          <div className="mb-6 rounded-2xl bg-ink px-5 py-4 text-[14.5px] leading-[1.5] text-cream">
            <strong className="font-semibold text-white">Y quizás no estás buscando trabajo.</strong>{" "}
            No hay drama, dejanos tus datos igual. Nos encantaría conocerte y tenerte en cuenta, y
            si se abre algo que encaje con vos, te lo mandamos antes de publicarlo.
          </div>

          <h3 className="mb-3 mt-8 font-serif text-[20px] tracking-tight text-ink">Posiciones abiertas</h3>
          <p className="mb-3 text-[13px] text-[#6F6668]">
            Hacé click en cualquiera para leer qué significa el rol de verdad, no solo el título.
          </p>
        </>
      ) : (
        <>
          <p className="mb-[15px] max-w-[62ch] text-[17px] text-[#4A4345]">
            HeyTruffle is an <strong className="font-semibold text-ink">AI-native</strong> company. We
            build the conversational agents that answer the phone for restaurant chains across the
            United States: reservations, orders, catering, events. Thousands of calls a week, live,
            with no human on the other end.
          </p>
          <p className="mb-[15px] max-w-[62ch] text-[17px] text-[#4A4345]">
            We work with <strong className="font-semibold text-ink">more than 100 restaurants and chains</strong>,
            and we&rsquo;re integrated with the biggest platforms in the US market:{" "}
            <strong className="font-semibold text-ink">UberEats, OpenTable, Toast</strong>, and others.
          </p>
          <p className="mb-[15px] max-w-[62ch] text-[17px] text-[#4A4345]">
            We compete head to head with the biggest companies in the space in the US market, backed by
            American investors, with the whole team based in Buenos Aires. It&rsquo;s the oldest
            industry in the world crossed with the newest technology, and it&rsquo;s still an open
            question who wins.
          </p>
          <p className="mb-[15px] max-w-[62ch] text-[17px] text-[#4A4345]">
            <strong className="font-semibold text-ink">You don&rsquo;t need to be an AI expert to join.</strong>{" "}
            You&rsquo;ll learn to use these tools far better than you do today, with a team that&rsquo;s
            here to teach you and a business that pushes you to stay ahead of the curve.
          </p>

          <div className="mb-6 rounded-2xl bg-ink px-5 py-4 text-[14.5px] leading-[1.5] text-cream">
            <strong className="font-semibold text-white">And maybe you&rsquo;re not looking for a job.</strong>{" "}
            That&rsquo;s fine, leave us your details anyway. We&rsquo;d love to meet you and keep you in
            mind, and if something that fits you opens up, we&rsquo;ll send it to you before we post it.
          </div>

          <h3 className="mb-3 mt-8 font-serif text-[20px] tracking-tight text-ink">Open roles</h3>
          <p className="mb-3 text-[13px] text-[#6F6668]">
            Click any of them to read what the role actually means, not just the title.
          </p>
        </>
      )}
      <div className="flex flex-col gap-2.5">
        {ROLES.map((role, n) => (
          <RoleCard
            key={role.id}
            role={role}
            display={roleDisplay(role, lang)}
            lang={lang}
            expanded={expandedIntro.has(n)}
            onToggleExpand={() =>
              setExpandedIntro((prev) => {
                const next = new Set(prev);
                next.has(n) ? next.delete(n) : next.add(n);
                return next;
              })
            }
            selectable={false}
          />
        ))}
      </div>

      {lang === "es" ? (
        <>
          <p className="mb-0 mt-6 max-w-[62ch] text-[17px] text-[#4A4345]">
            No te vamos a pedir que elijas uno y armes un CV a medida. Las preguntas son sobre en
            qué sos bueno y cómo trabajás, porque a esta altura eso dice mucho más que tu último
            título. Si leyendo tus respuestas pensamos que encajás mejor en otro lado, te lo
            vamos a decir.
          </p>
          <div className="mt-4 rounded-2xl bg-[#FDF2E5] px-5 py-4 text-[14.5px] leading-[1.55] text-[#4A4345]">
            <strong className="font-semibold text-ink">Casi todo se puede aprender.</strong> Lo que
            no se puede enseñar es la ambición, la vara con la que te medís vos mismo, y las ganas
            de meterte en algo difícil sin manual. Si tenés eso, vas a aprender el resto acá, con
            un equipo que está para enseñarte.
          </div>
          <div className="mt-4 text-[13px] text-[#6F6668]">5 minutos · 9 preguntas · CV opcional</div>
        </>
      ) : (
        <>
          <p className="mb-0 mt-6 max-w-[62ch] text-[17px] text-[#4A4345]">
            We&rsquo;re not going to ask you to pick one and tailor a resume to it. The questions are
            about what you&rsquo;re good at and how you work, because at this point that says a lot
            more than your last title. If reading your answers we think you&rsquo;re a better fit
            somewhere else, we&rsquo;ll tell you.
          </p>
          <div className="mt-4 rounded-2xl bg-[#FDF2E5] px-5 py-4 text-[14.5px] leading-[1.55] text-[#4A4345]">
            <strong className="font-semibold text-ink">Almost everything can be learned.</strong> What
            can&rsquo;t be taught is ambition, the standard you hold yourself to, and the drive to take
            on something hard with no manual. If you&rsquo;ve got that, you&rsquo;ll learn the rest
            here, with a team that&rsquo;s here to teach you.
          </div>
          <div className="mt-4 text-[13px] text-[#6F6668]">5 minutes · 9 questions · resume optional</div>
        </>
      )}
    </div>
  );
}

function ResultStep({
  answers,
  selectedRoleNames,
  selectedRoleDisplayNames,
  openRolePicked,
  sessionId,
  saveProgress,
  lang,
}: {
  answers: Answers;
  /** English canonical names — unused for display, kept only because the
   *  prop existed before; selectedRoleDisplayNames is what actually
   *  renders. */
  selectedRoleNames: string[];
  selectedRoleDisplayNames: string[];
  openRolePicked: boolean;
  sessionId: string;
  saveProgress: (completed: boolean) => void;
  lang: Lang;
}) {
  const firstName = ((answers.fullName as string) || "").split(" ")[0] || "";
  const stillStudying = answers.studies === "I still have more than a semester left";
  const cantCommute = answers.officeAvailability === "I can't make it two days a week";

  useEffect(() => {
    saveProgress(true);
    // Fire once, when the result step mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-[0_2px_10px_rgba(37,31,33,0.08)] sm:p-[34px]">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1"
        style={{ background: "linear-gradient(90deg,#3773D7 9%,#EF7200 54%,#D592F3 95%)" }}
      />
      <span className="mb-4 inline-block rounded-full bg-[#FCE7D2] px-3.5 py-1.5 font-body text-[12.5px] font-semibold uppercase tracking-[0.04em] text-[#C95F00]">
        {lang === "es" ? "Recibido" : "Received"}
      </span>
      <h2 className="mb-0 font-serif text-[26px] leading-[1.2] text-ink sm:text-[28px]">
        {lang === "es" ? "Gracias" : "Thanks"}
        {firstName ? `, ${firstName}` : ""}.
      </h2>
      {lang === "es" ? (
        <p className="mb-0 mt-2.5 max-w-[62ch] text-[16px] text-[#4A4345]">
          Vamos a leer todo, no lo vamos a ojear. Las respuestas que miramos más de cerca son en
          qué sos realmente bueno y qué construiste con IA.
        </p>
      ) : (
        <p className="mb-0 mt-2.5 max-w-[62ch] text-[16px] text-[#4A4345]">
          We&rsquo;re going to read the whole thing, not skim it. The answers we look at most closely
          are what you&rsquo;re really good at and what you&rsquo;ve built with AI.
        </p>
      )}
      <div className="my-[26px] h-px bg-[#EDE9E0]" />
      <div className="mb-1 font-body text-[12px] font-semibold uppercase tracking-[0.08em] text-[#6F6668]">
        {lang === "es" ? "Lo que elegiste" : "What you selected"}
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {selectedRoleDisplayNames.map((name) => (
          <span key={name} className="rounded-full border border-[#DCD6CC] bg-cream px-[15px] py-[7px] text-[14px] text-ink">
            {name}
          </span>
        ))}
      </div>

      {openRolePicked && (
        <>
          <div className="my-[26px] h-px bg-[#EDE9E0]" />
          <div className="rounded-2xl bg-[#FDF2E5] px-5 py-4 text-[14.5px] leading-[1.55] text-[#4A4345]">
            {lang === "es" ? (
              <>
                <strong className="font-semibold text-ink">Elegiste el rol abierto.</strong> Lucas,
                el fundador, los lee personalmente, y si hay algo ahí vas a hablar con él aunque el
                rol todavía no exista. Si hacés el caso y los números cierran, lo creamos.
              </>
            ) : (
              <>
                <strong className="font-semibold text-ink">You picked the open role.</strong> Lucas, the
                founder, reads those himself, and if there&rsquo;s something there you&rsquo;ll talk to
                him even if the role doesn&rsquo;t exist yet. If you make the case and the numbers work,
                we&rsquo;ll create it.
              </>
            )}
          </div>
        </>
      )}
      {cantCommute && (
        <>
          <div className="my-[26px] h-px bg-[#EDE9E0]" />
          <div className="rounded-2xl bg-[#FDF2E5] px-5 py-4 text-[14.5px] leading-[1.55] text-[#4A4345]">
            {lang === "es" ? (
              <>
                <strong className="font-semibold text-ink">Sobre la oficina.</strong> Los dos días a
                la semana en Béccar son un requisito para todos los roles, así que esto no va a
                funcionar por ahora. Te lo decimos ahora para no hacerte perder el tiempo. Si tu
                situación cambia, escribinos y retomamos.
              </>
            ) : (
              <>
                <strong className="font-semibold text-ink">About the office.</strong> The two days a
                week in Béccar are required for every role, so this isn&rsquo;t going to work right
                now. We&rsquo;re telling you now so we don&rsquo;t waste your time. If your situation
                changes, write to us and we&rsquo;ll pick this back up.
              </>
            )}
          </div>
        </>
      )}
      {stillStudying && (
        <>
          <div className="my-[26px] h-px bg-[#EDE9E0]" />
          <div className="rounded-2xl bg-[#FDF2E5] px-5 py-4 text-[14.5px] leading-[1.55] text-[#4A4345]">
            {lang === "es" ? (
              <>
                <strong className="font-semibold text-ink">Sobre tus estudios.</strong> Para los
                roles junior empezamos con gente que ya se recibió o está en su último cuatrimestre,
                así que probablemente todavía no sea el momento. Igual guardamos tu perfil:
                escribinos cuando estés terminando y retomamos.
              </>
            ) : (
              <>
                <strong className="font-semibold text-ink">About your studies.</strong> For junior roles
                we start with people who&rsquo;ve already graduated or are in their last semester, so
                this probably isn&rsquo;t the moment yet. We&rsquo;re keeping your profile either way:
                write to us when you&rsquo;re finishing up and we&rsquo;ll pick this back up.
              </>
            )}
          </div>
        </>
      )}

      <div className="my-[26px] h-px bg-[#EDE9E0]" />
      {lang === "es" ? (
        <p className="mb-0 max-w-[62ch] text-[15px] text-[#4A4345]">
          Si hay un fit, alguien del equipo se va a comunicar. Y si hoy no hay un rol que encaje,
          quedás en la bolsa: volvemos cuando se abra uno, con una fecha real, no un &ldquo;te
          avisamos&rdquo;.
        </p>
      ) : (
        <p className="mb-0 max-w-[62ch] text-[15px] text-[#4A4345]">
          If there&rsquo;s a fit, someone from the team will reach out. And if there&rsquo;s no role
          that fits today, you stay in the pool: we&rsquo;ll come back when one opens, with an actual
          date, not just a &ldquo;we&rsquo;ll let you know.&rdquo;
        </p>
      )}
    </div>
  );
}
