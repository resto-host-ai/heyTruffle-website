"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { NOISE } from "@/lib/noise";

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
      className="relative scroll-mt-24 overflow-hidden bg-black py-10 md:py-16 "
    >
      {/* Warm radial glow, echoing the brand gradient */}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20 md:opacity-30 md:mix-blend-overlay"
        style={{ backgroundImage: NOISE }}
      />

      <div className="
        relative max-w-4/5 mx-auto
        min-h-100 h-auto
         
        flex flex-col lg:flex-row gap-6  justify-between text-white">

        <div className="reveal reveal-up max-w-160">
          <p className="text-xs uppercase tracking-[0.2em]">
            Get in touch
          </p>
          <h2 className="mt-5 font-serif text-5xl leading-tight md:2xl lg:text-4xl">
            Let&rsquo;s unlock <br /> your missed revenue.
          </h2>
          <p className="font-body mt-6 max-w-md text-base leading-relaxed  md:text-lg">
            Enter your details to schedule a free consultation and see how much in sales you&rsquo;re leaving on the table.

          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className=" 
            h-auto  
            w-full 
            lg:min-w-80 lg:w-auto
            xl:w-full xl:max-w-130
            2xl:max-w-160
            flex items-start 
            rounded-[28px] border border-white/10 bg-white/10 p-7 backdrop-blur-sm "
          style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}
        >
          {status === "submitted" ? (
            <SubmittedState />
          ) : (
            // <SubmittedState />
            <div className="gap-4 flex flex-col
            w-full
            justify-between  ">
              <div className=" h-3/4 
                grid grid-cols-1 gap-4
                lg:grid-cols-2
                ">
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
                <Field
                  className="lg:col-span-2"
                  multiline
                  rows={4}
                  label="Ask us anything, or tell us a bit about your restaurant."
                  placeholder="Joe's PizzaReservations, catering, how many locations. Whatever's on your mind."
                  value={form.text}
                  onChange={(v) => update("text", v)}
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

              <div >

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-7 w-full rounded-full bg-[#ef7200] py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70
                  justify-self-end
                  "
                >
                  {status === "submitting" ? "Sending…" : "Send message"}
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
              </div>
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
  /** Grid placement (e.g. "lg:col-span-2") for the field's wrapping label. */
  className?: string;
  /** Renders a <textarea> instead of <input> — for free-text fields that need more than one line. */
  multiline?: boolean;
  /** Minimum visible line count for a multiline field. */
  rows?: number;
}) {
  const fieldClassName = `w-full rounded-xl border border-white/15 px-3.5 py-3 text-sm text-black outline-none transition-colors placeholder:text-white/50 focus:border-brand-orange focus:placeholder:text-black/60 ${
    value ? "bg-white" : "bg-white/15 focus:bg-white"
  }`;

  return (
    <label className={`block ${className ?? ""}`}>
      <span className="mb-2 block text-[10px] uppercase tracking-[0.16em] text-cream/60">
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
          className={`${fieldClassName} resize-none`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          placeholder={placeholder}
          className={fieldClassName}
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
