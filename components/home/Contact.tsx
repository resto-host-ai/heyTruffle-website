"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { NOISE } from "@/lib/noise";

type FormState = {
  name: string;
  phone: string;
  email: string;
  restaurant: string;
  honeypot: string;
};

const INITIAL: FormState = {
  name: "",
  phone: "",
  email: "",
  restaurant: "",
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
      className="relative scroll-mt-24 overflow-clip bg-[#251f21] py-10 md:py-16"
    >
      {/* Warm radial glow, echoing the brand gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 70% at 50% 0%, rgba(181,63,196,0.22) 0%, rgba(239,114,0,0.08) 45%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20 md:opacity-30 md:mix-blend-overlay"
        style={{ backgroundImage: NOISE }}
      />

      <div className="relative mx-auto max-w-[1080px] px-6 md:px-10">
        <div
          data-mobile-motion="rise"
          className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1fr_1.05fr]"
        >
          <div className="reveal reveal-up">
            <p className="text-xs uppercase tracking-[0.2em] text-cream/60">
              Get in touch
            </p>
            <h2 className="mt-5 font-serif text-4xl leading-tight text-cream md:text-5xl">
              Let&rsquo;s unlock your{" "}
              <span className="text-[#d592f3]">missed revenue.</span>
            </h2>
            <p className="font-body mt-6 max-w-md text-base leading-relaxed text-cream/70 md:text-lg">
              Enter your details to schedule a free consultation and see how much
              in sales you&rsquo;re leaving on the table.
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            className="reveal reveal-up rounded-[28px] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm md:p-8"
            style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}
          >
            {status === "submitted" ? (
              <SubmittedState />
            ) : (
              <>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field
                    label="Name"
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={(v) => update("name", v)}
                    required
                  />
                  <Field
                    label="Phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={form.phone}
                    onChange={(v) => update("phone", v)}
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
                    placeholder="Joe's Pizza"
                    value={form.restaurant}
                    onChange={(v) => update("restaurant", v)}
                    required
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
                  className="mt-7 w-full rounded-full bg-gradient-to-r from-[#b53fc4] to-[#ef7200] py-3.5 text-sm font-bold text-white transition-[scale,opacity] duration-[160ms] ease-[var(--ease-out-strong)] hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "submitting" ? "Sending…" : "Submit →"}
                </button>

                <p className="mt-6 text-center text-xs text-cream/50">
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
              </>
            )}
          </form>
        </div>
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
      <span className="mb-2 block text-[10px] uppercase tracking-[0.16em] text-cream/60">
        {label}
        {required && <span className="ml-1 text-brand-orange">*</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/15 bg-white/10 px-3.5 py-3 text-sm text-cream outline-none transition-colors placeholder:text-cream/40 focus:border-[#d592f3] focus:bg-white/15"
      />
    </label>
  );
}

function SubmittedState() {
  return (
    <div className="py-6 text-center">
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
      <p className="text-sm leading-relaxed text-cream/70">
        A member of our team will reach out within 24 hours to schedule your free
        consultation.
      </p>
    </div>
  );
}
