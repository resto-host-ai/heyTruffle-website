import Link from "next/link";
import Image from "next/image";
import { INTEGRATIONS } from "@/lib/integrations";
import { BookDemoButton } from "@/components/BookDemoButton";

/** Primary nav, mirroring the header (plus the Blog). */
const NAV = [
  { label: "Case Studies", href: "/case-study" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About", href: "/#about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

const linkClass =
  "font-body text-[18px] font-normal leading-[130%] text-[#251f21]/70 transition-colors hover:text-brand-orange";

const headingClass =
  "font-body text-[13px] font-semibold uppercase tracking-[0.18em] text-[#251f21]/50";

export default function Footer() {
  return (
    <footer className="bg-cream text-[#251f21]">
      <div className="mx-auto max-w-[1536px] px-6 py-16 md:px-10 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Link href="/" aria-label="heytruffle home" className="inline-block">
              {/* Logo asset is cream — darken it for the light background */}
              <Image
                src="/images/heytruffle-logo.svg"
                alt="heytruffle"
                width={177}
                height={40}
                unoptimized
                className="h-9 w-auto brightness-0"
              />
            </Link>

            <p className="mt-8 max-w-[340px] font-body text-[20px] font-normal leading-[130%] text-[#251f21]">
              AI-Driven Voice Restaurant Assistants for Seamless Customer
              Interaction
            </p>
          </div>

          {/* Navigate */}
          <nav aria-label="Footer navigation">
            <p className={headingClass}>Navigate</p>
            <ul className="mt-5 space-y-3.5">
              {NAV.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <BookDemoButton
                  className={`${linkClass} text-left`}
                  ariaLabel="Book a demo"
                >
                  Book a demo
                </BookDemoButton>
              </li>
            </ul>
          </nav>

          {/* Integrations */}
          <nav aria-label="Integrations">
            <p className={headingClass}>Integrations</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3.5">
              {INTEGRATIONS.map((i) => (
                <li key={i.slug}>
                  <Link href={`/integrations/${i.slug}`} className={linkClass}>
                    {i.brand}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 h-px w-full bg-[#251f21]/15" />

        <p className="mt-6 font-body text-[20px] font-normal leading-[110%] text-[#251f21]">
          © 2026 heytruffle. All rights reserved.
        </p>
      </div>

      {/* Resto Experience bar */}
      <div className="w-full bg-white">
        <div className="mx-auto flex max-w-[1536px] flex-col items-center gap-3 px-6 py-4 md:flex-row md:justify-between md:gap-0 md:px-10">
          <a
            href="https://restoexp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center transition-opacity hover:opacity-80"
          >
            <Image
              src="/images/restoexplogo.webp"
              alt="Resto Experience"
              width={500}
              height={59}
              className="h-auto w-[240px] lg:w-[307px]"
            />
          </a>

          <div className="flex flex-col items-center gap-1 text-center text-[13px] leading-[20px] text-[#5c5c5c] md:flex-row md:gap-4 md:text-[14px] md:leading-[30px]">
            <span>Restaurant Marketing, Content &amp; Web Design</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2"
              height="40"
              viewBox="0 0 2 40"
              fill="none"
              className="hidden md:block"
              aria-hidden
            >
              <rect width="2" height="40" fill="url(#resto-divider)" />
              <defs>
                <radialGradient
                  id="resto-divider"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(1 20) rotate(90) scale(20 1)"
                >
                  <stop stopColor="#7C7C7C" stopOpacity="0.486275" />
                  <stop offset="1" stopColor="#7C7C7C" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
            <span>2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
