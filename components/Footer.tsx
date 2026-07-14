import Link from "next/link";
import Image from "next/image";

const COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "ROI Calculator", href: "/roi-calculator" },
      { label: "Testimonials", href: "/testimonials" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Case Studies", href: "/case-study" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "mailto:info@heytruffle.com" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-[#e9e7e3] pt-20 text-[#251f21]">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-12 text-center md:grid-cols-[2fr_1fr_1fr_1fr_1.2fr] md:gap-8 md:text-left">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" aria-label="heytruffle home">
              {/* Logo asset is cream — darken it for the light background */}
              <Image
                src="/images/heytruffle-logo.svg"
                alt="heytruffle"
                width={177}
                height={40}
                unoptimized
                className="h-9 w-auto brightness-0 opacity-90"
              />
            </Link>
            <p className="mt-8 max-w-[15rem] text-sm leading-relaxed text-[#251f21]/70">
              A fully managed voice AI service that answers every call for your
              restaurant.
            </p>
            <div className="mt-8 flex justify-center gap-3 md:justify-start">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="heytruffle on LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#251f21]/20 text-[#251f21]/70 transition-colors hover:border-[#251f21]/50 hover:text-[#251f21]"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1V24h-4v-8.5c0-2.03-.04-4.65-2.83-4.65-2.84 0-3.27 2.21-3.27 4.5V24H8V8z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="heytruffle on Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#251f21]/20 text-[#251f21]/70 transition-colors hover:border-[#251f21]/50 hover:text-[#251f21]"
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4.5" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#251f21]/45">
                {col.heading}
              </h3>
              <ul className="mt-6 space-y-4">
                {col.links.map(({ label, href }) => (
                  <li key={label}>
                    {href.startsWith("mailto:") ? (
                      <a
                        href={href}
                        className="text-sm text-[#251f21]/80 transition-colors hover:text-[#251f21]"
                      >
                        {label}
                      </a>
                    ) : (
                      <Link
                        href={href}
                        className="text-sm text-[#251f21]/80 transition-colors hover:text-[#251f21]"
                      >
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#251f21]/45">
              Contact
            </h3>
            <ul className="mt-6 space-y-4">
              <li>
                <a
                  href="tel:+14044822738"
                  className="flex items-center justify-center gap-2.5 text-sm text-[#251f21]/80 transition-colors hover:text-[#251f21] md:justify-start"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                    className="shrink-0"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  +1 (404) 482-2738
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@heytruffle.com"
                  className="flex items-center justify-center gap-2.5 text-sm text-[#251f21]/80 transition-colors hover:text-[#251f21] md:justify-start"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                    className="shrink-0"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m2 7 10 6 10-6" />
                  </svg>
                  info@heytruffle.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 border-t border-[#251f21]/15 py-8">
          <p className="text-center text-sm text-[#251f21]/55 md:text-left">
            © 2026 HeyTruffle. All rights reserved.
          </p>
        </div>
      </div>

      {/* Resto Experience bar */}
      <div className="w-full bg-white px-6 py-4">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-3 md:flex-row md:justify-between md:gap-0 md:px-4">
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

          <div
            className="flex flex-col items-center gap-1 text-center text-[13px] leading-[20px] text-[#5c5c5c] md:flex-row md:gap-4 md:text-[14px] md:leading-[30px]"
            style={{
              fontFamily:
                "var(--font-montserrat), 'Montserrat', system-ui, sans-serif",
            }}
          >
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
