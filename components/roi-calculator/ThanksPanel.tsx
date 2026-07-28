import Link from "next/link";
import { ProgressBar } from "./ProgressBar";

export function ThanksPanel({ firstName }: { firstName: string }) {
  return (
    <div className="overflow-hidden rounded-[36px] bg-[#f6f3ec] shadow-2xl">
      <ProgressBar value={1} />
      <div className="px-6 pb-14 pt-12 md:px-16">
        <div
          aria-hidden
          className="mx-auto mb-5 grid h-[60px] w-[60px] place-items-center rounded-full bg-gradient-to-br from-[#b53fc4] to-[#ef7200] shadow-[0_16px_40px_-12px_rgba(181,63,196,0.5)]"
        >
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
            <path
              d="M5 12.5 L10 17.5 L19 7.5"
              stroke="white"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="mx-auto mb-3.5 max-w-[720px] text-center font-serif text-3xl leading-tight text-[#251f21] md:text-4xl">
          Thanks{firstName ? `, ${firstName}` : ""}.
        </h2>
        <p className="mx-auto max-w-[540px] text-center text-[15px] text-[#251f21]/60">
          We&rsquo;ve received your details and will email you the full
          breakdown shortly.
        </p>
        <div className="mt-7 text-center">
          <Link
            href="/"
            className="inline-block rounded-full bg-[#1c1917] px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-black"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
