"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { NOISE } from "@/lib/noise";

type FormState = {
  name: string;
  phone: string;
  email: string;
  company: string;
  role: string;
  partnershipType: string;
  linkedin: string;
  honeypot: string;
};

const INITIAL: FormState = {
  name: "",
  phone: "",
  email: "",
  company: "",
  role: "",
  partnershipType: "",
  linkedin: "",
  honeypot: "",
};

const ROLES = [
  "Founder / Owner",
  "Restaurant Manager",
  "Investor",
  "Technology Partner",
  "Marketing / Agency",
  "Other",
] as const;

export default function Partner() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section id="become-a-partner" className="bg-[#251f21] pb-28 md:pb-36">
        <div className="mx-auto max-w-[1536px] px-6 md:px-10">
          <div className="relative overflow-hidden rounded-[40px] bg-[#1c1917] px-8 py-16 text-center shadow-[0_24px_60px_rgba(0,0,0,0.35)] md:px-14 md:py-24">
            {/* Warm radial glow, echoing the header CTA gradient */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(60% 80% at 50% 20%, rgba(181,63,196,0.32) 0%, rgba(192,85,158,0.18) 35%, rgba(239,114,0,0.1) 65%, transparent 82%)",
              }}
            />
            {/* grain */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
              style={{ backgroundImage: NOISE }}
            />

            <div className="relative">
              <h2 className="mx-auto max-w-[760px] font-serif text-4xl leading-tight text-cream md:text-5xl">
                Partner with <span className="text-[#d592f3]">heytruffle.</span>
              </h2>
              <p className="font-body mx-auto mt-6 max-w-[560px] text-base leading-relaxed text-cream/70 md:text-lg">
                Whether you&rsquo;re inspired by technology, hospitality, or
                simply the future of restaurants, we&rsquo;d love to explore
                new partnerships together.
              </p>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="mt-9 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#b53fc4] to-[#ef7200] px-7 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
              >
                Get In Touch
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  aria-hidden
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {open && <PartnerModal onClose={() => setOpen(false)} />}
    </>
  );
}

function PartnerModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<"idle" | "submitting" | "submitted">(
    "idle"
  );

  const formStartedRef = useRef(false);
  const track = useCallback(
    (event: string, params: Record<string, unknown> = {}) => {
      if (typeof window === "undefined") return;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event,
        form_name: "partner",
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

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    markStarted();
    setForm((p) => ({ ...p, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "Partner", ...form }),
      });
      if (!res.ok) throw new Error(`Submit failed (${res.status})`);
      track("generate_lead");
      setStatus("submitted");
    } catch (err) {
      track("form_error", {
        error: err instanceof Error ? err.message : String(err),
      });
      setStatus("idle");
      alert("Something went wrong. Please try again.");
    }
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Partner with heytruffle"
      onClick={onClose}
      className="fixed inset-0 z-[100] grid h-dvh place-items-center overflow-y-auto bg-[#1c1917]/75 p-4 backdrop-blur-md"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[calc(100dvh-32px)] w-full max-w-[640px] overflow-y-auto rounded-[28px] bg-[#f6f3ec] px-7 py-8 text-[#251f21] shadow-2xl md:px-9"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full border border-[#251f21]/15 text-[#251f21]/60 transition-colors hover:bg-[#251f21]/5 hover:text-[#251f21]"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden
          >
            <path d="M6 6l12 12M18 6l-12 12" />
          </svg>
        </button>

        {status === "submitted" ? (
          <SubmittedState />
        ) : (
          <>
            <h3 className="mb-8 text-center font-serif text-3xl text-[#251f21]">
              Partner with heytruffle
            </h3>

            <form
              onSubmit={onSubmit}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5"
            >
              <Field
                label="Name"
                placeholder="Name"
                value={form.name}
                onChange={(v) => update("name", v)}
                required
              />
              <Field
                label="Phone"
                type="tel"
                placeholder="Phone"
                value={form.phone}
                onChange={(v) => update("phone", v)}
                required
              />
              <Field
                label="Email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(v) => update("email", v)}
                required
              />
              <Field
                label="Company"
                placeholder="Company"
                value={form.company}
                onChange={(v) => update("company", v)}
                required
              />
              <SelectField
                label="Role"
                placeholder="Your role"
                value={form.role}
                onChange={(v) => update("role", v)}
                options={ROLES}
                required
              />
              <Field
                label="Partnership Type"
                placeholder="Tell us what you're looking for"
                value={form.partnershipType}
                onChange={(v) => update("partnershipType", v)}
                required
              />
              <div className="sm:col-span-2">
                <Field
                  label="LinkedIn Profile"
                  type="url"
                  placeholder="Paste your LinkedIn URL"
                  value={form.linkedin}
                  onChange={(v) => update("linkedin", v)}
                />
              </div>

              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={form.honeypot}
                onChange={(e) => update("honeypot", e.target.value)}
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

              <div className="mt-4 flex justify-center sm:col-span-2">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="rounded-full bg-brand-orange px-9 py-3.5 text-sm font-semibold uppercase tracking-[0.06em] text-cream transition-colors hover:bg-[#d96700] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "submitting" ? "Sending…" : "Submit"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function FieldLabel({
  label,
  required,
}: {
  label: string;
  required?: boolean;
}) {
  return (
    <span className="mb-2 block text-sm font-semibold text-[#251f21]">
      {label}
      {required && <span className="ml-1 text-brand-orange">*</span>}
    </span>
  );
}

const inputClasses =
  "w-full rounded-xl border border-[#251f21]/15 bg-white/70 px-3.5 py-2.5 text-sm text-[#251f21] outline-none transition-colors placeholder:text-[#251f21]/40 focus:border-brand-orange focus:bg-white";

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <FieldLabel label={label} required={required} />
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className={inputClasses}
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <FieldLabel label={label} required={required} />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className={`${inputClasses} cursor-pointer appearance-none bg-no-repeat pr-9 ${
          value ? "text-[#251f21]" : "text-[#251f21]/40"
        }`}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23251f21' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M6 9l6 6 6-6'/></svg>\")",
          backgroundPosition: "right 12px center",
          backgroundSize: "14px",
        }}
      >
        <option value="" disabled>
          {placeholder ?? "Select…"}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function SubmittedState() {
  return (
    <div className="px-2 pb-3 pt-6 text-center">
      <div
        aria-hidden
        className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-[#b53fc4] to-[#ef7200] shadow-[0_16px_40px_-12px_rgba(181,63,196,0.6)]"
      >
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
          <path
            d="M5 12.5 L10 17.5 L19 7.5"
            stroke="white"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h3 className="mb-2 font-serif text-2xl text-[#251f21]">
        Thanks — we&rsquo;ll be in touch.
      </h3>
      <p className="text-sm leading-relaxed text-[#251f21]/60">
        We&rsquo;ll review your message and reach out within 24 hours.
      </p>
    </div>
  );
}
