"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";

type FormState = {
  name: string;
  phone: string;
  email: string;
  restaurant: string;
  text: string;
  honeypot: string;
};

const INITIAL: FormState = {
  name: "",
  phone: "",
  email: "",
  restaurant: "",
  text: "",
  honeypot: "",
};

export default function Contact() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<"idle" | "submitting" | "submitted">(
    "idle"
  );

  const formStartedRef = useRef(false);
  const track = useCallback(
    (event: string, params: Record<string, unknown> = {}) => {
      if (typeof window === "undefined") return;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event, form_name: "contact", ...params });
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
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "contact", ...form }),
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

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden bg-ink px-5 py-16 font-body text-cream md:py-[calc(110*var(--fx))] lg:px-[73px]"
    >
      <div className="mx-auto flex max-w-[1610px] flex-col gap-10 md:max-w-[calc(1610*var(--fx))] lg:flex-row lg:items-start lg:justify-between lg:gap-[calc(80*var(--fx))]">
        {/* Copy */}
        <div className="reveal reveal-up lg:max-w-[calc(660*var(--fx))]">
          <p className="text-[14px] md:text-[calc(16*var(--fx))]">Get in touch</p>
          <h2 className="mt-4 font-serif text-[38px] font-normal! leading-[1.12] md:mt-[calc(20*var(--fx))] md:text-[calc(64*var(--fx))] lg:whitespace-nowrap">
            Let&rsquo;s unlock <br /> your missed revenue.
          </h2>
          <p className="mt-5 max-w-md text-[16px] leading-[1.6] text-cream/90 md:mt-[calc(32*var(--fx))] md:max-w-[calc(500*var(--fx))] md:text-[calc(22*var(--fx))]">
            Enter your details to schedule a free consultation and see how much
            in sales you&rsquo;re leaving on the table.
          </p>
        </div>

        {/* Form card */}
        <form
          onSubmit={onSubmit}
          className="reveal reveal-up w-full rounded-[22px] border border-white/10 bg-[#4A4345] p-6 lg:w-[calc(850*var(--fx))] lg:shrink-0 md:rounded-[calc(28*var(--fx))] md:p-[calc(58*var(--fx))]"
          style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}
        >
          {status === "submitted" ? (
            <SubmittedState />
          ) : (
            <div className="flex flex-col">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-x-[calc(34*var(--fx))] md:gap-y-[calc(28*var(--fx))]">
                <Field
                  label="Name"
                  placeholder="Jane Smith"
                  value={form.name}
                  onChange={(v) => update("name", v)}
                  required
                />
                <Field
                  label="Email"
                  type="email"
                  placeholder="jane@restaurant.com"
                  value={form.email}
                  onChange={(v) => update("email", v)}
                  required
                />
                <Field
                  label="Restaurant Name"
                  placeholder="Jane's Pizza"
                  value={form.restaurant}
                  onChange={(v) => update("restaurant", v)}
                  required
                />
                <Field
                  label="Phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={form.phone}
                  onChange={(v) => update("phone", v)}
                />
                <Field
                  className="sm:col-span-2"
                  multiline
                  rows={4}
                  label="Ask us anything, or tell us a bit about your restaurant."
                  placeholder="Reservations, catering, how many locations. Whatever's on your mind."
                  value={form.text}
                  onChange={(v) => update("text", v)}
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
                  width: 1,
                  height: 1,
                  overflow: "hidden",
                  opacity: 0,
                  pointerEvents: "none",
                }}
              />

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-7 h-14 w-full rounded-full bg-brand-orange text-[16px] font-semibold text-cream transition-colors hover:bg-[#C95F00] disabled:cursor-not-allowed disabled:opacity-70 md:mt-[calc(36*var(--fx))] md:h-[calc(72*var(--fx))] md:text-[calc(18*var(--fx))]"
              >
                {status === "submitting" ? "Sending…" : "Send message"}
              </button>

              <p className="mt-5 text-center text-[12px] text-cream/50 md:text-[calc(13*var(--fx))]">
                By submitting, you agree to our{" "}
                <Link
                  href="/privacy-policy"
                  className="underline underline-offset-2 transition-colors hover:text-cream"
                >
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link
                  href="/terms-of-service"
                  className="underline underline-offset-2 transition-colors hover:text-cream"
                >
                  Terms of Service
                </Link>
                .
              </p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
  className,
  multiline,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  /** Grid placement (e.g. "sm:col-span-2") for the field's wrapping label. */
  className?: string;
  /** Renders a <textarea> instead of <input> — for free-text fields that need more than one line. */
  multiline?: boolean;
  /** Minimum visible line count for a multiline field. */
  rows?: number;
}) {
  const fieldClassName =
    "w-full rounded-xl border border-transparent bg-[#E8E6E3] px-4 text-[15px] text-ink outline-none transition-colors placeholder:text-ink/45 focus:border-brand-orange focus:bg-white md:rounded-[calc(14*var(--fx))] md:px-[calc(20*var(--fx))] md:text-[calc(16*var(--fx))]";

  return (
    <label className={`block ${className ?? ""}`}>
      <span className="mb-2 block text-[14px] text-cream md:mb-[calc(12*var(--fx))] md:text-[calc(16*var(--fx))]">
        {label}
        {required && <span className="ml-1 text-brand-orange">*</span>}
      </span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          placeholder={placeholder}
          rows={rows}
          className={`${fieldClassName} resize-none py-3 md:h-[calc(197*var(--fx))] md:py-[calc(16*var(--fx))]`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          placeholder={placeholder}
          className={`${fieldClassName} h-12 md:h-[calc(62*var(--fx))]`}
        />
      )}
    </label>
  );
}

function SubmittedState() {
  return (
    <div className="py-6 text-center  flex-1">
      <div
        aria-hidden
        className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-[#b53fc4] to-[#ef7200] shadow-[0_16px_40px_-12px_rgba(181,63,196,0.6)]"
      >
        <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
          <path
            d="M5 12.5 L10 17.5 L19 7.5"
            stroke="white"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h3 className="mb-2 font-serif text-2xl text-cream">
        Thanks, we&rsquo;ll be in touch.
      </h3>
      <p className="text-sm mt-4 leading-relaxed text-cream/70">
        A member of our team will reach out within 24 hours to schedule your free
        consultation.
      </p>
    </div>
  );
}
