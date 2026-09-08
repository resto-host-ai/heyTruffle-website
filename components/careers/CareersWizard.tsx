"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ROLES, STEPS, type Field, type Role } from "@/lib/data/careers";
import {
  isPlausibleFreeText,
  isValidEmail,
  isValidLinkedIn,
  isValidName,
  isValidPhone,
  sanitizeText,
} from "@/lib/validation/careers";

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

const CHOICE_KEYS = "ABCDEFGHIJ";

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

function RoleCard({
  role,
  expanded,
  onToggleExpand,
  selectable,
  selected,
  onToggleSelect,
}: {
  role: Role;
  expanded: boolean;
  onToggleExpand: () => void;
  selectable: boolean;
  selected?: boolean;
  onToggleSelect?: () => void;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border-[1.5px] bg-white transition-colors ${
        role.wide ? "border-dashed border-brand-orange" : "border-[#DCD6CC]"
      } ${selected ? "!border-brand-orange shadow-[0_0_0_3px_rgba(239,114,0,0.12)]" : ""} ${
        selected && role.wide ? "!border-solid" : ""
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
            aria-label={`Mark ${role.name} as interesting`}
            aria-pressed={selected}
            className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border-[1.5px] transition-colors ${
              selected
                ? "border-brand-orange bg-brand-orange"
                : "border-[#DCD6CC] bg-white hover:border-[#B7AFA8]"
            }`}
          >
            {selected && <CheckIcon />}
          </span>
        )}
        <span className="min-w-0 flex-1">
          <span className="block text-[16px] font-semibold leading-[1.3] text-ink">
            {role.name}
          </span>
          <span className="mt-[3px] block text-[12.5px] text-[#6F6668]">{role.vac}</span>
        </span>
        <CaretIcon
          className={`h-5 w-5 shrink-0 text-[#B7AFA8] transition-transform duration-200 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>
      {expanded && (
        <div className="border-t border-[#EDE9E0] px-4 pb-[18px] pt-0.5 sm:px-[18px]">
          <ul className="mt-3.5 flex flex-col gap-[11px]">
            {role.bullets.map((b, i) => (
              <li key={i} className="flex gap-3 text-[14.5px] leading-[1.5] text-[#4A4345]">
                <span aria-hidden className="mt-2 h-[7px] w-[7px] shrink-0 rounded-full bg-brand-orange" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 rounded-[11px] bg-[#FDF2E5] px-[15px] py-[13px] text-[14px] leading-[1.5] text-ink">
            {role.ident}
          </div>
        </div>
      )}
    </div>
  );
}

const inputClass =
  "w-full rounded-2xl border-[1.5px] border-[#DCD6CC] bg-white px-[15px] py-[13px] font-body text-[15.5px] text-ink outline-none transition-colors focus:border-brand-orange focus:shadow-[0_0_0_3px_rgba(239,114,0,0.12)] placeholder:text-[#B7AFA8]";

function FieldInput({
  field,
  value,
  onChange,
  autoFocus,
}: {
  field: Field;
  value: string;
  onChange: (v: string) => void;
  autoFocus?: boolean;
}) {
  const validator = FIELD_VALIDATORS[field.k];
  const invalid = !!validator && value.trim().length > 0 && !validator(value);

  return (
    <div>
      <label className="mb-[7px] block font-body text-[13.5px] font-semibold text-[#4A4345]">
        {field.label}
        {field.opt && <span className="font-normal text-[#B7AFA8]"> (optional)</span>}
      </label>
      {field.type === "select" ? (
        <select
          className={inputClass}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoFocus={autoFocus}
        >
          <option value="">Choose an option</option>
          {field.options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={field.type === "email" ? "email" : field.type === "tel" ? "tel" : "text"}
          className={`${inputClass} ${invalid ? "!border-[#C95F00]" : ""}`}
          placeholder={field.ph}
          value={value}
          onChange={(e) => onChange(sanitizeText(e.target.value))}
          autoFocus={autoFocus}
          aria-invalid={invalid}
        />
      )}
      {invalid && (
        <div className="mt-1.5 text-[13px] font-medium text-[#C95F00]">
          {FIELD_ERRORS[field.k]}
        </div>
      )}
      {field.note && (
        <div className="mt-1.5 rounded-2xl bg-[#FDF2E5] px-4 py-3 text-[13.5px] leading-[1.55] text-[#4A4345]">
          {field.note}
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
  const lastSaveRef = useRef("");

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
      const payload = {
        session_id: sessionId,
        completed,
        updated_at: new Date().toISOString(),
        ...answers,
      };
      const json = JSON.stringify(payload);
      if (json === lastSaveRef.current) return;
      lastSaveRef.current = json;
      fetch(SUBMIT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: json,
      }).catch(() => {});
    },
    [sessionId, stepIndex, answers],
  );

  useEffect(() => {
    if (step.type !== "intro" && step.type !== "result") saveProgress(false);
    // Only re-run when the step actually changes, matching the original
    // "save on advance" behavior rather than saving on every keystroke.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepIndex]);

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

      <main className="flex justify-center px-6 pb-16 pt-8 sm:px-10">
        <div className="w-full max-w-[740px]">
          {step.type === "intro" && (
            <IntroStep
              expandedIntro={expandedIntro}
              setExpandedIntro={setExpandedIntro}
            />
          )}

          {step.type === "fields" && (
            <div>
              {step.eyebrow && <Eyebrow text={step.eyebrow} />}
              <h2 className="mb-2.5 font-serif text-[26px] leading-[1.2] text-ink sm:text-[28px]">
                {step.title}
              </h2>
              {step.sub && <p className="mb-6 max-w-[58ch] text-[16px] text-[#4A4345]">{step.sub}</p>}
              <div className="flex flex-col gap-4">
                {step.fields.map((f, idx) => (
                  <FieldInput
                    key={f.k}
                    field={f}
                    value={(answers[f.k] as string) || ""}
                    onChange={(v) => setAnswer(f.k, v)}
                    autoFocus={idx === 0}
                  />
                ))}
              </div>
            </div>
          )}

          {step.type === "choice" && (
            <div>
              <Eyebrow text={step.eyebrow} />
              <h2 className="mb-2.5 font-serif text-[26px] leading-[1.2] text-ink sm:text-[28px]">
                {step.title}
              </h2>
              {step.sub && <p className="mb-6 max-w-[58ch] text-[16px] text-[#4A4345]">{step.sub}</p>}
              <div className="flex flex-col gap-2.5">
                {step.opts.map((o, n) => {
                  const selected = answers[step.k] === o.t;
                  return (
                    <button
                      key={o.t}
                      type="button"
                      onClick={() => {
                        setAnswer(step.k, o.t);
                        setTimeout(go, 260);
                      }}
                      className={`flex w-full items-start gap-3.5 rounded-2xl border-[1.5px] bg-white px-[18px] py-4 text-left font-body text-[15.5px] leading-[1.45] text-ink transition-all hover:-translate-y-px hover:border-[#B7AFA8] hover:shadow-[0_2px_10px_rgba(37,31,33,0.08)] ${
                        selected
                          ? "border-brand-orange bg-[#FDF2E5] shadow-[0_0_0_3px_rgba(239,114,0,0.12)]"
                          : "border-[#DCD6CC]"
                      }`}
                    >
                      <span
                        className={`grid h-6 w-6 shrink-0 place-items-center rounded-lg border text-[12px] font-bold ${
                          selected
                            ? "border-brand-orange bg-brand-orange text-white"
                            : "border-[#DCD6CC] bg-cream text-[#6F6668]"
                        }`}
                      >
                        {CHOICE_KEYS[n]}
                      </span>
                      <span className="flex-1">
                        {o.t}
                        {o.s && <small className="mt-[3px] block text-[13.5px] text-[#6F6668]">{o.s}</small>}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {(step.type === "line" || step.type === "text") && (
            <div>
              <Eyebrow text={step.eyebrow} />
              <h2 className="mb-2.5 font-serif text-[26px] leading-[1.2] text-ink sm:text-[28px]">
                {step.title}
              </h2>
              {step.sub && <p className="mb-6 max-w-[58ch] text-[16px] text-[#4A4345]">{step.sub}</p>}
              {step.type === "text" && step.warn && (
                <div className="mb-5 rounded-2xl bg-ink px-[18px] py-[15px] text-[14.5px] leading-[1.5] text-cream">
                  {step.warn}
                </div>
              )}
              <TextAreaField step={step} answers={answers} setAnswer={setAnswer} />
            </div>
          )}

          {step.type === "roles" && (
            <div>
              <Eyebrow text={step.eyebrow} />
              <h2 className="mb-2.5 font-serif text-[26px] leading-[1.2] text-ink sm:text-[28px]">
                {step.title}
              </h2>
              {step.sub && <p className="mb-6 max-w-[58ch] text-[16px] text-[#4A4345]">{step.sub}</p>}
              <div className="flex flex-col gap-2.5">
                {ROLES.map((role, n) => (
                  <RoleCard
                    key={role.id}
                    role={role}
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
                {selectedRoles.size} of {step.max} selected
              </div>
            </div>
          )}

          {step.type === "result" && (
            <ResultStep
              answers={answers}
              selectedRoleNames={[...selectedRoles].map((n) => ROLES[n].name)}
              openRolePicked={[...selectedRoles].some((n) => ROLES[n].id === "open")}
              sessionId={sessionId}
              saveProgress={saveProgress}
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
                className={`rounded-[10px] px-2 py-3.5 font-body text-[15px] font-semibold text-[#6F6668] transition-colors hover:text-ink ${
                  showBack ? "visible" : "invisible"
                }`}
              >
                Back
              </button>
              <span className="flex-1" />
              <button
                type="button"
                onClick={go}
                disabled={!nextEnabled}
                className="rounded-[10px] border-[1.5px] border-transparent bg-brand-orange px-[26px] py-3.5 font-body text-[15px] font-semibold text-white transition-colors hover:bg-[#C95F00] disabled:cursor-not-allowed disabled:bg-[#DCD6CC] disabled:text-[#6F6668]"
              >
                {step.type === "intro" ? "Start" : "Continue"}
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
}: {
  step: Extract<(typeof STEPS)[number], { type: "line" | "text" }>;
  answers: Answers;
  setAnswer: (k: string, v: string) => void;
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
        placeholder={step.ph}
        onChange={(e) => setAnswer(step.k, sanitizeText(e.target.value))}
        className={`${inputClass} ${heightClass} resize-y leading-[1.55]`}
      />
      <div className={`mt-1.5 text-right text-[12px] ${overLimit ? "font-semibold text-[#C95F00]" : "text-[#B7AFA8]"}`}>
        {step.type === "line" ? `${value.length} / ${step.max}` : `${value.length} characters`}
      </div>
    </div>
  );
}

function IntroStep({
  expandedIntro,
  setExpandedIntro,
}: {
  expandedIntro: Set<number>;
  setExpandedIntro: React.Dispatch<React.SetStateAction<Set<number>>>;
}) {
  return (
    <div>
      <div className="mb-3.5 font-body text-[12px] font-semibold uppercase tracking-[0.09em] text-[#6F6668]">
        Talent pool
      </div>
      <h1 className="mb-[22px] font-serif text-[38px] font-bold leading-[1.02] tracking-tight text-ink sm:text-[52px]">
        Open roles at heytruffle
      </h1>
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
      <div className="flex flex-col gap-2.5">
        {ROLES.map((role, n) => (
          <RoleCard
            key={role.id}
            role={role}
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
    </div>
  );
}

function ResultStep({
  answers,
  selectedRoleNames,
  openRolePicked,
  sessionId,
  saveProgress,
}: {
  answers: Answers;
  selectedRoleNames: string[];
  openRolePicked: boolean;
  sessionId: string;
  saveProgress: (completed: boolean) => void;
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
        Received
      </span>
      <h2 className="mb-0 font-serif text-[26px] leading-[1.2] text-ink sm:text-[28px]">
        Thanks{firstName ? `, ${firstName}` : ""}.
      </h2>
      <p className="mb-0 mt-2.5 max-w-[62ch] text-[16px] text-[#4A4345]">
        We&rsquo;re going to read the whole thing, not skim it. The answers we look at most closely
        are what you&rsquo;re really good at and what you&rsquo;ve built with AI.
      </p>
      <div className="my-[26px] h-px bg-[#EDE9E0]" />
      <div className="mb-1 font-body text-[12px] font-semibold uppercase tracking-[0.08em] text-[#6F6668]">
        What you selected
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {selectedRoleNames.map((name) => (
          <span key={name} className="rounded-full border border-[#DCD6CC] bg-cream px-[15px] py-[7px] text-[14px] text-ink">
            {name}
          </span>
        ))}
      </div>

      {openRolePicked && (
        <>
          <div className="my-[26px] h-px bg-[#EDE9E0]" />
          <div className="rounded-2xl bg-[#FDF2E5] px-5 py-4 text-[14.5px] leading-[1.55] text-[#4A4345]">
            <strong className="font-semibold text-ink">You picked the open role.</strong> Lucas, the
            founder, reads those himself, and if there&rsquo;s something there you&rsquo;ll talk to
            him even if the role doesn&rsquo;t exist yet. If you make the case and the numbers work,
            we&rsquo;ll create it.
          </div>
        </>
      )}
      {cantCommute && (
        <>
          <div className="my-[26px] h-px bg-[#EDE9E0]" />
          <div className="rounded-2xl bg-[#FDF2E5] px-5 py-4 text-[14.5px] leading-[1.55] text-[#4A4345]">
            <strong className="font-semibold text-ink">About the office.</strong> The two days a
            week in Béccar are required for every role, so this isn&rsquo;t going to work right
            now. We&rsquo;re telling you now so we don&rsquo;t waste your time. If your situation
            changes, write to us and we&rsquo;ll pick this back up.
          </div>
        </>
      )}
      {stillStudying && (
        <>
          <div className="my-[26px] h-px bg-[#EDE9E0]" />
          <div className="rounded-2xl bg-[#FDF2E5] px-5 py-4 text-[14.5px] leading-[1.55] text-[#4A4345]">
            <strong className="font-semibold text-ink">About your studies.</strong> For junior roles
            we start with people who&rsquo;ve already graduated or are in their last semester, so
            this probably isn&rsquo;t the moment yet. We&rsquo;re keeping your profile either way:
            write to us when you&rsquo;re finishing up and we&rsquo;ll pick this back up.
          </div>
        </>
      )}

      <div className="my-[26px] h-px bg-[#EDE9E0]" />
      <p className="mb-0 max-w-[62ch] text-[15px] text-[#4A4345]">
        If there&rsquo;s a fit, someone from the team will reach out. And if there&rsquo;s no role
        that fits today, you stay in the pool: we&rsquo;ll come back when one opens, with an actual
        date, not just a &ldquo;we&rsquo;ll let you know.&rdquo;
      </p>
    </div>
  );
}
